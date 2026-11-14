import prisma from '../config/prisma';
import { memoryUsers, memoryUserBadges, saveStateToDisk } from './auth.service';
import { generateDailyDungeon, DailyDungeon } from '../utils/dailyDungeonGenerator';
import { createDailyEscapeBadge, getPixelBadgeByTitle } from '../data/pixelBadgeCatalog';

// In-memory fallback stores for offline/resilient mode
export const memoryDailyRuns = new Map<string, any[]>(); // userId -> DailyEscapeRun[]

export interface SubmitEscapeRunInput {
  userId: string;
  dateString?: string;
  timeElapsed: number;
  livesRemaining: number;
  roomsCleared: number;
  isPractice?: boolean;
}

function getTodayUtcString(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterdayUtcString(todayStr: string): string {
  const d = new Date(todayStr + 'T00:00:00.000Z');
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().split('T')[0];
}

function getSecondsUntilMidnightUtc(): number {
  const now = new Date();
  const nextMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return Math.max(0, Math.floor((nextMidnight.getTime() - now.getTime()) / 1000));
}

export class ArcadeService {
  private async safeDb<T>(op: () => Promise<T>): Promise<T> {
    return Promise.race([
      op(),
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1500)),
    ]);
  }

  // 1. Fetch Today's Dungeon & Status
  async getTodayDungeon(userId?: string) {
    const todayUtc = getTodayUtcString();
    const dungeon = generateDailyDungeon(todayUtc);
    const expiresInSeconds = getSecondsUntilMidnightUtc();

    let hasPlayedToday = false;
    let todayRun: any = null;

    if (userId) {
      try {
        todayRun = await this.safeDb(() =>
          prisma.dailyEscapeRun.findFirst({
            where: {
              userId,
              dateString: todayUtc,
              isPractice: false,
            },
          })
        );
        if (todayRun) {
          hasPlayedToday = true;
        }
      } catch {
        const memRuns = memoryDailyRuns.get(userId) || [];
        todayRun = memRuns.find((r) => r.dateString === todayUtc && !r.isPractice) || null;
        if (todayRun) hasPlayedToday = true;
      }
    }

    return {
      dateString: todayUtc,
      formattedDate: dungeon.formattedDate,
      dungeon,
      hasPlayedToday,
      todayRun,
      expiresInSeconds,
      serverTimeUtc: new Date().toISOString(),
    };
  }

  // 2. Fetch Past Dungeon for Practice Mode (Unscored)
  async getPracticeDungeon(dateString: string) {
    const dungeon = generateDailyDungeon(dateString);
    return {
      dateString,
      formattedDate: dungeon.formattedDate,
      dungeon,
      isPractice: true,
    };
  }

  // 3. Submit Scored or Practice Run
  async submitEscapeRun(input: SubmitEscapeRunInput) {
    const {
      userId,
      dateString = getTodayUtcString(),
      timeElapsed,
      livesRemaining,
      roomsCleared,
      isPractice = false,
    } = input;

    const todayUtc = getTodayUtcString();
    const isToday = dateString === todayUtc;
    const clampedTime = Math.max(1, Math.min(180, Math.floor(timeElapsed)));
    const clampedLives = Math.max(0, Math.min(5, Math.floor(livesRemaining)));
    const clampedRooms = Math.max(1, Math.min(10, Math.floor(roomsCleared)));
    const isVictory = clampedRooms === 10 && clampedLives > 0;
    const isFlawless = isVictory && clampedLives === 5;

    // A. Practice Mode Handling
    if (isPractice || !isToday) {
      return {
        isPractice: true,
        success: true,
        isVictory,
        roomsCleared: clampedRooms,
        timeElapsed: clampedTime,
        livesRemaining: clampedLives,
        xpEarned: 0,
        message: 'Practice run finished! (Unscored — no XP, streak, or badge awarded).',
      };
    }

    // B. Check if user already completed a scored run today
    let existingRun: any = null;
    try {
      existingRun = await this.safeDb(() =>
        prisma.dailyEscapeRun.findFirst({
          where: { userId, dateString: todayUtc, isPractice: false },
        })
      );
    } catch {
      const memRuns = memoryDailyRuns.get(userId) || [];
      existingRun = memRuns.find((r) => r.dateString === todayUtc && !r.isPractice) || null;
    }

    if (existingRun) {
      return {
        alreadyPlayed: true,
        success: true,
        run: existingRun,
        message: 'You have already completed your daily scored run for today! Try Practice Mode.',
      };
    }

    // C. Calculate XP Breakdown
    let baseXP = isVictory ? 50 : 15; // Base victory (+50) or participation (+15)
    let timeBonus = isVictory ? Math.max(0, (180 - clampedTime) * 2) : 0;
    let flawlessBonus = isFlawless ? 150 : 0;
    let speedrunnerBonus = isVictory && clampedTime <= 90 ? 75 : 0;
    let totalXpEarned = baseXP + timeBonus + flawlessBonus + speedrunnerBonus;

    // D. Fetch user for streak calculation
    let currentStreak = 0;
    let longestStreak = 0;
    let gemsToAdd = 0;
    let milestoneUnlocked: any = null;
    let luckyChestReward: any = null;

    let dbUser: any = null;
    let isDbUser = false;
    try {
      const found = await this.safeDb(() => prisma.user.findUnique({ where: { id: userId } }));
      if (found) {
        dbUser = found;
        isDbUser = true;
      }
    } catch {
      // DB error
    }
    if (!dbUser) {
      dbUser = memoryUsers.get(userId) || {
        id: userId,
        xp: 0,
        gems: 100,
        dailyEscapeStreak: 0,
        longestEscapeStreak: 0,
        lastEscapeDate: null,
      };
    }

    if (dbUser) {
      currentStreak = dbUser.dailyEscapeStreak || 0;
      longestStreak = dbUser.longestEscapeStreak || 0;
      const lastDate = dbUser.lastEscapeDate;
      const yesterdayUtc = getYesterdayUtcString(todayUtc);

      if (isVictory) {
        if (lastDate === yesterdayUtc) {
          currentStreak += 1;
        } else if (lastDate === todayUtc) {
          // already today
        } else {
          currentStreak = 1;
        }
        longestStreak = Math.max(longestStreak, currentStreak);

        // Check Streak Milestones
        if (currentStreak === 3) {
          milestoneUnlocked = {
            days: 3,
            title: '3-Day Escape Streak!',
            description: '+50 Bonus XP awarded for 3 days of dungeon survival!',
            bonusXp: 50,
          };
          totalXpEarned += 50;
        } else if (currentStreak === 7) {
          milestoneUnlocked = {
            days: 7,
            title: 'Week Survivor!',
            description: '+25 Gems & Exclusive "Week Survivor" Badge awarded!',
            badgeTitle: 'Week Survivor',
            bonusGems: 25,
          };
          gemsToAdd += 25;
        } else if (currentStreak === 14) {
          milestoneUnlocked = {
            days: 14,
            title: 'Fortnight Conqueror!',
            description: '+100 Gems & Pixel Emoji Frame unlocked!',
            bonusGems: 100,
          };
          gemsToAdd += 100;
        } else if (currentStreak === 30) {
          milestoneUnlocked = {
            days: 30,
            title: 'Dungeon Legend!',
            description: '+250 XP, Animated Avatar Frame & "Dungeon Legend" Badge!',
            badgeTitle: 'Dungeon Legend',
            bonusXp: 250,
          };
          totalXpEarned += 250;
        } else if (currentStreak === 100) {
          milestoneUnlocked = {
            days: 100,
            title: 'Immortal Escapist!',
            description: 'Supreme Legend! Custom Username Color & "Immortal Escapist" Badge!',
            badgeTitle: 'Immortal Escapist',
            bonusXp: 1000,
          };
          totalXpEarned += 1000;
        }

        // Check Lucky Chest (every 5th streak: 5, 10, 15, 20...)
        if (currentStreak > 0 && currentStreak % 5 === 0) {
          const chestXp = Math.floor(Math.random() * 150) + 50; // 50 to 200 XP
          const chestGems = Math.floor(Math.random() * 40) + 10; // 10 to 50 gems
          luckyChestReward = {
            title: 'Lucky Dungeon Chest!',
            description: `Consecutive Day ${currentStreak} bonus loot unlocked!`,
            bonusXp: chestXp,
            bonusGems: chestGems,
          };
          totalXpEarned += chestXp;
          gemsToAdd += chestGems;
        }
      }
    }

    // E. Generate & Award Date-Stamped Daily Badge
    let dailyBadge: any = null;
    if (isVictory) {
      dailyBadge = createDailyEscapeBadge(todayUtc, isFlawless);
    }

    // F. Persist Run to Database (with memory fallback)
    let savedRun: any = null;
    if (isDbUser) {
      try {
        savedRun = await this.safeDb(() =>
          prisma.dailyEscapeRun.create({
            data: {
              userId,
              dateString: todayUtc,
              timeElapsed: clampedTime,
              livesRemaining: clampedLives,
              isFlawless,
              isPractice: false,
              xpEarned: totalXpEarned,
              roomsCleared: clampedRooms,
            },
          })
        );

        // Update User XP, Gems, Streak
        await this.safeDb(() =>
          prisma.user.update({
            where: { id: userId },
            data: {
              xp: { increment: totalXpEarned },
              gems: { increment: gemsToAdd },
              dailyEscapeStreak: currentStreak,
              longestEscapeStreak: longestStreak,
              lastEscapeDate: isVictory ? todayUtc : dbUser?.lastEscapeDate,
            },
          })
        );

        // Award Milestone Badge if unlocked
        if (milestoneUnlocked?.badgeTitle) {
          const mBadgeMeta = getPixelBadgeByTitle(milestoneUnlocked.badgeTitle);
          if (mBadgeMeta) {
            let bRecord = await this.safeDb(() =>
              prisma.badge.findFirst({ where: { title: mBadgeMeta.title } })
            );
            if (!bRecord) {
              bRecord = await this.safeDb(() =>
                prisma.badge.create({
                  data: {
                    title: mBadgeMeta.title,
                    description: mBadgeMeta.description,
                    iconSvg: mBadgeMeta.iconSvg,
                    tier: mBadgeMeta.tier,
                    xpReward: mBadgeMeta.xpReward,
                    sublevelId: mBadgeMeta.sublevelId,
                  },
                })
              );
            }
            await this.safeDb(() =>
              prisma.userBadge.upsert({
                where: { userId_badgeId: { userId, badgeId: (bRecord as any).id } },
                update: {},
                create: { userId, badgeId: (bRecord as any).id },
              })
            );
          }
        }
      } catch {
        savedRun = null;
      }
    }

    if (!savedRun) {
      // Memory Store Fallback
      savedRun = {
        id: `run_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        userId,
        dateString: todayUtc,
        timeElapsed: clampedTime,
        livesRemaining: clampedLives,
        isFlawless,
        isPractice: false,
        xpEarned: totalXpEarned,
        roomsCleared: clampedRooms,
        completedAt: new Date(),
      };

      const userRuns = memoryDailyRuns.get(userId) || [];
      userRuns.push(savedRun);
      memoryDailyRuns.set(userId, userRuns);

      const memU = memoryUsers.get(userId);
      if (memU) {
        memU.xp = (memU.xp || 0) + totalXpEarned;
        memU.gems = (memU.gems || 0) + gemsToAdd;
        memU.dailyEscapeStreak = currentStreak;
        memU.longestEscapeStreak = longestStreak;
        if (isVictory) memU.lastEscapeDate = todayUtc;
        memoryUsers.set(userId, memU);
      }

      if (dailyBadge) {
        const uBadges = memoryUserBadges.get(userId) || [];
        uBadges.push({
          id: `daily_${Date.now()}`,
          userId,
          badgeId: `daily_${todayUtc}`,
          title: dailyBadge.title,
          description: dailyBadge.description,
          iconSvg: dailyBadge.iconSvg,
          tier: dailyBadge.tier,
          earnedAt: new Date(),
        });
        memoryUserBadges.set(userId, uBadges);
      }

      saveStateToDisk();
    }

    return {
      success: true,
      isVictory,
      isFlawless,
      roomsCleared: clampedRooms,
      timeElapsed: clampedTime,
      livesRemaining: clampedLives,
      xpBreakdown: {
        baseXP,
        timeBonus,
        flawlessBonus,
        speedrunnerBonus,
        totalXpEarned,
      },
      streak: {
        current: currentStreak,
        longest: longestStreak,
      },
      dailyBadge,
      milestoneUnlocked,
      luckyChestReward,
      shareCard: {
        username: dbUser?.username || 'Hero',
        date: todayUtc,
        timeElapsed: clampedTime,
        livesRemaining: clampedLives,
        isFlawless,
        roomsCleared: clampedRooms,
        streak: currentStreak,
      },
    };
  }

  // 4. Global Leaderboard for a Specific Date
  async getDailyLeaderboard(dateStr = getTodayUtcString(), flawlessOnly = false, limit = 100) {
    try {
      const whereClause: any = {
        dateString: dateStr,
        isPractice: false,
        roomsCleared: 10,
      };
      if (flawlessOnly) {
        whereClause.isFlawless = true;
      }

      const topRuns: any = await this.safeDb(() =>
        prisma.dailyEscapeRun.findMany({
          where: whereClause,
          orderBy: [{ timeElapsed: 'asc' }, { livesRemaining: 'desc' }, { completedAt: 'asc' }],
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
                currentLeague: true,
                dailyEscapeStreak: true,
              },
            },
          },
        })
      );

      if (topRuns && Array.isArray(topRuns) && topRuns.length > 0) {
        return topRuns.map((r: any, idx: number) => ({
          rank: idx + 1,
          id: r.id,
          username: r.user?.username || 'Hero',
          avatar: r.user?.avatar || 'default_avatar.png',
          league: r.user?.currentLeague || 'BRONZE',
          streak: r.user?.dailyEscapeStreak || 1,
          timeElapsed: r.timeElapsed,
          livesRemaining: r.livesRemaining,
          isFlawless: r.isFlawless,
          completedAt: r.completedAt,
        }));
      }
    } catch {
      // Offline fallback
    }

    // Memory Store Fallback
    const matching: any[] = [];
    for (const [uid, runs] of memoryDailyRuns.entries()) {
      const u = memoryUsers.get(uid);
      for (const r of runs) {
        if (r.dateString === dateStr && !r.isPractice && r.roomsCleared === 10) {
          if (!flawlessOnly || r.isFlawless) {
            matching.push({
              id: r.id,
              username: u?.username || 'Hero',
              avatar: u?.avatar || 'default_avatar.png',
              league: u?.currentLeague || 'BRONZE',
              streak: u?.dailyEscapeStreak || 1,
              timeElapsed: r.timeElapsed,
              livesRemaining: r.livesRemaining,
              isFlawless: r.isFlawless,
              completedAt: r.completedAt,
            });
          }
        }
      }
    }

    matching.sort((a, b) => a.timeElapsed - b.timeElapsed || b.livesRemaining - a.livesRemaining);

    return matching.slice(0, limit).map((r, idx) => ({
      rank: idx + 1,
      ...r,
    }));
  }

  // 5. User Streak & Milestones Info
  async getUserStreakInfo(userId: string) {
    const todayUtc = getTodayUtcString();
    let user: any = null;
    try {
      user = await this.safeDb(() => prisma.user.findUnique({ where: { id: userId } }));
    } catch {
      // DB error
    }
    if (!user) {
      user = memoryUsers.get(userId);
    }

    const currentStreak = user?.dailyEscapeStreak || 0;
    const longestStreak = user?.longestEscapeStreak || 0;
    const lastDate = user?.lastEscapeDate || null;
    const hasEscapedToday = lastDate === todayUtc;

    // Determine next milestone
    let nextMilestone = { targetDays: 3, reward: '+50 XP', daysLeft: Math.max(1, 3 - currentStreak) };
    if (currentStreak >= 30) {
      nextMilestone = { targetDays: 100, reward: 'Immortal Escapist Badge & Custom Name Color', daysLeft: Math.max(1, 100 - currentStreak) };
    } else if (currentStreak >= 14) {
      nextMilestone = { targetDays: 30, reward: 'Dungeon Legend Badge & Animated Frame', daysLeft: Math.max(1, 30 - currentStreak) };
    } else if (currentStreak >= 7) {
      nextMilestone = { targetDays: 14, reward: '+100 Gems & Special Emoji Frame', daysLeft: Math.max(1, 14 - currentStreak) };
    } else if (currentStreak >= 3) {
      nextMilestone = { targetDays: 7, reward: 'Week Survivor Badge & +25 Gems', daysLeft: Math.max(1, 7 - currentStreak) };
    }

    return {
      currentStreak,
      longestStreak,
      lastEscapeDate: lastDate,
      hasEscapedToday,
      nextMilestone,
    };
  }

  // 6. Escape Calendar for Given Year & Month
  async getUserCalendar(userId: string, year: number, month: number) {
    const todayUtc = getTodayUtcString();
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

    let userRuns: any[] = [];
    try {
      userRuns = await this.safeDb(() =>
        prisma.dailyEscapeRun.findMany({
          where: {
            userId,
            dateString: {
              startsWith: `${year}-${month.toString().padStart(2, '0')}`,
            },
            isPractice: false,
          },
        })
      );
    } catch {
      const allRuns = memoryDailyRuns.get(userId) || [];
      const prefix = `${year}-${month.toString().padStart(2, '0')}`;
      userRuns = allRuns.filter((r) => r.dateString.startsWith(prefix) && !r.isPractice);
    }

    const runMap = new Map<string, any>();
    userRuns.forEach((r) => runMap.set(r.dateString, r));

    const days: any[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const isPast = dateStr < todayUtc;
      const isToday = dateStr === todayUtc;
      const isFuture = dateStr > todayUtc;

      const run = runMap.get(dateStr);

      let status: 'FLAWLESS' | 'CLEARED' | 'MISSED' | 'TODAY_PENDING' | 'FUTURE_LOCKED' = 'FUTURE_LOCKED';

      if (run) {
        status = run.isFlawless ? 'FLAWLESS' : 'CLEARED';
      } else if (isToday) {
        status = 'TODAY_PENDING';
      } else if (isPast) {
        status = 'MISSED';
      } else {
        status = 'FUTURE_LOCKED';
      }

      days.push({
        day,
        dateString: dateStr,
        status,
        run: run
          ? {
              timeElapsed: run.timeElapsed,
              livesRemaining: run.livesRemaining,
              isFlawless: run.isFlawless,
            }
          : null,
      });
    }

    return {
      year,
      month,
      days,
    };
  }
}

export const arcadeService = new ArcadeService();
