import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';

export class UserService {
  /**
   * Calculates regenerated hearts dynamically (1 heart per 30 mins, max 5).
   */
  static calculateHearts(user: { hearts: number; maxHearts: number; updatedAt: Date }): number {
    if (user.hearts >= user.maxHearts) {
      return user.maxHearts;
    }
    const now = new Date().getTime();
    const lastUpdate = new Date(user.updatedAt).getTime();
    const elapsedMinutes = Math.floor((now - lastUpdate) / (1000 * 60));
    const regenCount = Math.floor(elapsedMinutes / 30);
    return Math.min(user.maxHearts, user.hearts + regenCount);
  }

  /**
   * Updates user streak based on activity date:
   * - Today: maintain streak.
   * - Yesterday: streak + 1.
   * - > 48 hours: reset streak to 1.
   */
  static async updateActivityAndStreak(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new AppError('User not found', 404);

    const now = new Date();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

    let newStreak = user.streakCount;

    if (!lastActive) {
      newStreak = 1;
    } else {
      const isSameDay =
        now.getFullYear() === lastActive.getFullYear() &&
        now.getMonth() === lastActive.getMonth() &&
        now.getDate() === lastActive.getDate();

      if (!isSameDay) {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const isYesterday =
          yesterday.getFullYear() === lastActive.getFullYear() &&
          yesterday.getMonth() === lastActive.getMonth() &&
          yesterday.getDate() === lastActive.getDate();

        if (isYesterday) {
          newStreak += 1;
        } else {
          // More than 48h / missed a day
          newStreak = 1;
        }
      }
    }

    const longestStreak = Math.max(user.longestStreak, newStreak);

    // Sync computed hearts if regenerated
    const computedHearts = this.calculateHearts(user);

    return await prisma.user.update({
      where: { id: userId },
      data: {
        lastActiveDate: now,
        streakCount: newStreak,
        longestStreak,
        hearts: computedHearts,
      },
    });
  }

  /**
   * Retrieves full profile with progress, achievements, and computed stats.
   */
  static async getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        progress: {
          include: {
            sublevel: {
              include: {
                level: true,
              },
            },
          },
          orderBy: { sublevelId: 'asc' },
        },
        achievements: true,
      },
    });

    if (!user) throw new AppError('User not found', 404);

    const computedHearts = this.calculateHearts(user);
    if (computedHearts !== user.hearts) {
      await prisma.user.update({
        where: { id: userId },
        data: { hearts: computedHearts },
      });
      user.hearts = computedHearts;
    }

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
