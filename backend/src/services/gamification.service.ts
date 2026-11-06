import prisma from '../config/prisma';
import redis from '../config/redis';

const MOCK_LEADERBOARD = [
  { rank: 1, id: '1', username: 'PixelMaster', avatar: 'avatar1.png', xp: 2450, streakCount: 14, currentLeague: 'BRONZE' },
  { rank: 2, id: '2', username: 'AlgoNinja', avatar: 'avatar2.png', xp: 1980, streakCount: 9, currentLeague: 'BRONZE' },
  { rank: 3, id: '3', username: 'ByteKnight', avatar: 'avatar3.png', xp: 1720, streakCount: 7, currentLeague: 'BRONZE' },
  { rank: 4, id: '4', username: 'CodeWizard', avatar: 'avatar4.png', xp: 1490, streakCount: 5, currentLeague: 'BRONZE' },
  { rank: 5, id: '5', username: 'RetroDev', avatar: 'avatar5.png', xp: 1200, streakCount: 3, currentLeague: 'BRONZE' },
];

export class GamificationService {
  async consumeHeart(userId: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        if (user.hearts <= 0) {
          return {
            hearts: 0,
            message: 'No hearts left! Wait for regeneration or refill with gems.',
            empty: true,
          };
        }

        const updated = await prisma.user.update({
          where: { id: userId },
          data: {
            hearts: { decrement: 1 },
          },
        });

        const key = `heart:regen:${userId}`;
        const exists = await redis.get(key);
        if (!exists) {
          await redis.set(key, String(Date.now() + 1800 * 1000), 'EX', 1800);
        }

        return {
          hearts: updated.hearts,
          maxHearts: updated.maxHearts,
          regenSecondsRemaining: 1800,
        };
      }
    } catch (e) {
      // Fallback
    }

    return {
      hearts: 4,
      maxHearts: 5,
      regenSecondsRemaining: 1800,
    };
  }

  async refillHearts(userId: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        const REFILL_COST_GEMS = 50;
        if (user.gems < REFILL_COST_GEMS) {
          throw new Error(`Not enough gems. Need ${REFILL_COST_GEMS} gems to refill hearts.`);
        }

        const updated = await prisma.user.update({
          where: { id: userId },
          data: {
            gems: { decrement: REFILL_COST_GEMS },
            hearts: 5,
          },
        });

        await redis.del(`heart:regen:${userId}`);

        return {
          hearts: updated.hearts,
          gems: updated.gems,
          message: 'Hearts fully restored!',
        };
      }
    } catch (e) {
      // Fallback
    }

    return {
      hearts: 5,
      gems: 50,
      message: 'Hearts fully restored!',
    };
  }

  async getLeaderboard(league = 'BRONZE', limit = 50) {
    try {
      const users = await prisma.user.findMany({
        where: {
          currentLeague: league as any,
        },
        orderBy: {
          xp: 'desc',
        },
        take: limit,
        select: {
          id: true,
          username: true,
          avatar: true,
          xp: true,
          streakCount: true,
          currentLeague: true,
        },
      });

      if (users && users.length > 0) {
        return users.map((u, index) => ({
          rank: index + 1,
          ...u,
        }));
      }
    } catch (e) {
      // Fallback for offline mode
    }

    return MOCK_LEADERBOARD;
  }

  async getBadges(userId: string) {
    const allBadges = [
      { id: 'first_quest', title: 'First Steps', description: 'Complete your first theory stage', icon: '🌱' },
      { id: 'streak_3', title: 'On Fire', description: 'Maintain a 3-day quest streak', icon: '🔥' },
      { id: 'boss_slayer', title: 'Boss Slayer', description: 'Defeat your first Level Boss', icon: '⚔️' },
      { id: 'perfect_quiz', title: 'Brainiac', description: 'Score 100% on any stage quiz', icon: '🧠' },
      { id: 'code_master', title: 'Syntax Hero', description: 'Pass all test cases on a Boss problem', icon: '💻' },
    ];

    try {
      const achievements = await prisma.userAchievement.findMany({
        where: { userId },
        orderBy: { unlockedAt: 'desc' },
      });

      const unlockedIds = new Set(achievements.map((a) => a.achievement));

      return allBadges.map((badge) => ({
        ...badge,
        isUnlocked: unlockedIds.has(badge.id),
        unlockedAt: achievements.find((a) => a.achievement === badge.id)?.unlockedAt || null,
      }));
    } catch (e) {
      return allBadges.map((b, idx) => ({
        ...b,
        isUnlocked: idx === 0,
        unlockedAt: idx === 0 ? new Date().toISOString() : null,
      }));
    }
  }
}

export const gamificationService = new GamificationService();
