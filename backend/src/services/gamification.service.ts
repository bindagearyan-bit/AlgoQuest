import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';
import { UserService } from './user.service';
import { League } from '@prisma/client';

export class GamificationService {
  /**
   * Deducts 1 heart on an incorrect stage/problem attempt.
   */
  static async consumeHeart(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new AppError('User not found', 404);

    const computedHearts = UserService.calculateHearts(user);
    if (computedHearts <= 0) {
      throw new AppError('No hearts remaining. Wait for regeneration or refill with gems.', 400);
    }

    const newHearts = Math.max(0, computedHearts - 1);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        hearts: newHearts,
      },
    });

    return {
      remainingHearts: updatedUser.hearts,
      maxHearts: updatedUser.maxHearts,
      canContinue: updatedUser.hearts > 0,
      nextRegenMinutes: updatedUser.hearts < updatedUser.maxHearts ? 30 : 0,
    };
  }

  /**
   * Refills all hearts to 5 in exchange for 50 Gems.
   */
  static async refillHearts(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new AppError('User not found', 404);

    const HEART_REFILL_COST = 50;
    if (user.gems < HEART_REFILL_COST) {
      throw new AppError(
        `Insufficient gems. Heart refill costs ${HEART_REFILL_COST} gems, but you have ${user.gems}.`,
        400
      );
    }

    const currentHearts = UserService.calculateHearts(user);
    if (currentHearts >= user.maxHearts) {
      throw new AppError('Your hearts are already full.', 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        hearts: user.maxHearts,
        gems: { decrement: HEART_REFILL_COST },
      },
    });

    return {
      hearts: updatedUser.hearts,
      maxHearts: updatedUser.maxHearts,
      gems: updatedUser.gems,
      message: 'Hearts fully restored!',
    };
  }

  /**
   * Leaderboard ranked by XP, filtered optionally by league.
   */
  static async getLeaderboard(league?: string, limit: number = 50) {
    const validLeague = league && Object.values(League).includes(league.toUpperCase() as League)
      ? (league.toUpperCase() as League)
      : undefined;

    const users = await prisma.user.findMany({
      where: validLeague ? { currentLeague: validLeague } : {},
      orderBy: { xp: 'desc' },
      take: Math.min(100, Math.max(1, limit)),
      select: {
        id: true,
        username: true,
        avatar: true,
        xp: true,
        currentLeague: true,
        streakCount: true,
      },
    });

    const ranked = users.map((u, index) => ({
      rank: index + 1,
      ...u,
    }));

    return ranked;
  }

  /**
   * Unlocked badges/achievements for a user.
   */
  static async getUserBadges(userId: string) {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId },
      orderBy: { unlockedAt: 'desc' },
    });

    return achievements;
  }
}
