import prisma from '../config/prisma';

export class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        achievements: true,
        progress: {
          include: {
            sublevel: {
              include: { level: true },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async updateProfile(userId: string, data: { username?: string; avatar?: string; selectedLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' }) {
    if (data.username) {
      const existing = await prisma.user.findFirst({
        where: {
          username: data.username,
          NOT: { id: userId },
        },
      });
      if (existing) {
        throw new Error('Username already taken');
      }
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
    });

    // If selectedLevel changed to BEGINNER, make sure progress exists
    if (data.selectedLevel === 'BEGINNER') {
      const hasProgress = await prisma.userProgress.findFirst({
        where: { userId },
      });
      if (!hasProgress) {
        const firstSublevel = await prisma.sublevel.findFirst({
          orderBy: { id: 'asc' },
        });
        if (firstSublevel) {
          await prisma.userProgress.create({
            data: {
              userId,
              sublevelId: firstSublevel.id,
              currentStage: 1,
              isCompleted: false,
            },
          });
        }
      }
    }

    const { passwordHash, ...safeUser } = updated;
    return safeUser;
  }

  async getProgress(userId: string) {
    let progressList = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        sublevel: {
          include: { level: true },
        },
      },
      orderBy: { sublevelId: 'asc' },
    });

    // Fallback if user has no progress yet
    if (progressList.length === 0) {
      const firstSublevel = await prisma.sublevel.findFirst({
        orderBy: { id: 'asc' },
        include: { level: true },
      });
      if (firstSublevel) {
        const initial = await prisma.userProgress.create({
          data: {
            userId,
            sublevelId: firstSublevel.id,
            currentStage: 1,
            isCompleted: false,
          },
          include: {
            sublevel: {
              include: { level: true },
            },
          },
        });
        progressList = [initial];
      }
    }

    const activeProgress = progressList.find((p) => !p.isCompleted) || progressList[progressList.length - 1];

    return {
      activeProgress,
      allProgress: progressList,
    };
  }

  async getStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        achievements: true,
        progress: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const totalSublevels = await prisma.sublevel.count();
    const completedCount = user.progress.filter((p) => p.isCompleted).length;
    const completionPercentage = totalSublevels > 0 ? Math.round((completedCount / totalSublevels) * 100) : 0;

    return {
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      xp: user.xp,
      hearts: user.hearts,
      maxHearts: user.maxHearts,
      gems: user.gems,
      streakCount: user.streakCount,
      longestStreak: user.longestStreak,
      currentLeague: user.currentLeague,
      badgesCount: user.achievements.length,
      achievements: user.achievements,
      completionPercentage,
      completedSublevels: completedCount,
      totalSublevels,
    };
  }
}

export const userService = new UserService();

