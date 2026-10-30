import { prisma } from '../../config/database';
import { NotFoundError } from '../../utils/errors';
import { AddXpInput, UpdateStreakInput } from './gamification.validation';
import { League } from '@prisma/client';

// XP thresholds for each league
const LEAGUE_THRESHOLDS: Record<League, number> = {
  BRONZE: 0,
  SILVER: 500,
  GOLD: 1500,
  PLATINUM: 4000,
  DIAMOND: 10000,
};

const getLeagueForXp = (xp: number): League => {
  if (xp >= LEAGUE_THRESHOLDS.DIAMOND) return League.DIAMOND;
  if (xp >= LEAGUE_THRESHOLDS.PLATINUM) return League.PLATINUM;
  if (xp >= LEAGUE_THRESHOLDS.GOLD) return League.GOLD;
  if (xp >= LEAGUE_THRESHOLDS.SILVER) return League.SILVER;
  return League.BRONZE;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isYesterday = (date: Date, today: Date): boolean => {
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

export class GamificationService {
  async addXp(userId: string, input: AddXpInput) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, xp: true, league: true },
    });

    if (!user) throw new NotFoundError('User not found');

    const newXp = user.xp + input.amount;
    const newLeague = getLeagueForXp(newXp);
    const leagueChanged = newLeague !== user.league;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { xp: newXp, league: newLeague },
      select: {
        id: true,
        xp: true,
        league: true,
        gems: true,
      },
    });

    return {
      xp: updated.xp,
      xpGained: input.amount,
      league: updated.league,
      leagueChanged,
      ...(leagueChanged && {
        previousLeague: user.league,
        nextLeagueThreshold:
          newLeague !== League.DIAMOND
            ? LEAGUE_THRESHOLDS[
                Object.keys(LEAGUE_THRESHOLDS)[
                  Object.keys(LEAGUE_THRESHOLDS).indexOf(newLeague) + 1
                ] as League
              ]
            : null,
      }),
    };
  }

  async getStreak(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) throw new NotFoundError('User not found');

    const streak = await prisma.streak.findUnique({
      where: { userId },
    });

    if (!streak) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        freezeCount: 0,
        lastCompletedDate: null,
        streakStatus: 'INACTIVE',
      };
    }

    const today = new Date();
    let streakStatus = 'ACTIVE';

    if (!streak.lastCompletedDate) {
      streakStatus = 'INACTIVE';
    } else if (isSameDay(streak.lastCompletedDate, today)) {
      streakStatus = 'COMPLETED_TODAY';
    } else if (isYesterday(streak.lastCompletedDate, today)) {
      streakStatus = 'ACTIVE';
    } else {
      streakStatus = 'BROKEN';
    }

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      freezeCount: streak.freezeCount,
      lastCompletedDate: streak.lastCompletedDate,
      streakStatus,
      canFreeze: streak.freezeCount > 0 && streakStatus === 'BROKEN',
    };
  }

  async updateStreak(userId: string, input: UpdateStreakInput) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User not found');

    const today = new Date();

    let streak = await prisma.streak.findUnique({ where: { userId } });

    if (!streak) {
      streak = await prisma.streak.create({
        data: { userId, currentStreak: 1, longestStreak: 1, lastCompletedDate: today },
      });
      await prisma.user.update({ where: { id: userId }, data: { streakCount: 1 } });
      return { streak, message: '🔥 Streak started!', streakAction: 'STARTED' };
    }

    // Already completed today
    if (streak.lastCompletedDate && isSameDay(streak.lastCompletedDate, today)) {
      return { streak, message: 'Already completed today', streakAction: 'ALREADY_DONE' };
    }

    let newStreak = streak.currentStreak;
    let streakAction = 'CONTINUED';
    let message = '';

    if (!streak.lastCompletedDate || isYesterday(streak.lastCompletedDate, today)) {
      // Continue streak
      newStreak = streak.currentStreak + 1;
      message = `🔥 ${newStreak} day streak!`;
      streakAction = 'CONTINUED';
    } else {
      // Streak broken - check for freeze
      if (input.useFreeze && streak.freezeCount > 0) {
        newStreak = streak.currentStreak; // Preserve streak
        streakAction = 'FREEZE_USED';
        message = '🧊 Streak freeze used!';
        await prisma.streak.update({
          where: { userId },
          data: { freezeCount: { decrement: 1 } },
        });
      } else {
        newStreak = 1; // Reset streak
        message = '💔 Streak broken. Starting fresh!';
        streakAction = 'RESET';
      }
    }

    const newLongest = Math.max(newStreak, streak.longestStreak);

    const updated = await prisma.streak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastCompletedDate: today,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { streakCount: newStreak, lastActive: today },
    });

    return { streak: updated, message, streakAction };
  }
}

export const gamificationService = new GamificationService();
