import prisma from '../config/prisma';
import { memoryUsers, memoryProgress } from './auth.service';

export class UserService {
  async getProfile(userId: string) {
    try {
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

      if (user) {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
      }
    } catch {
      // Memory fallback
    }

    const memUser = memoryUsers.get(userId) || {
      id: userId,
      username: 'PixelKnight',
      email: 'hero@algoquest.dev',
      avatar: 'default_avatar.png',
      xp: 0,
      hearts: 5,
      maxHearts: 5,
      gems: 100,
      streakCount: 0,
      longestStreak: 0,
      currentLeague: 'BRONZE',
    };

    return {
      ...memUser,
      achievements: [],
      progress: memoryProgress.get(userId) || [],
    };
  }

  async updateProfile(userId: string, data: { username?: string; avatar?: string; selectedLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' }) {
    try {
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

      const { passwordHash, ...safeUser } = updated;
      return safeUser;
    } catch {
      // Memory fallback
      const memUser = memoryUsers.get(userId) || { id: userId, username: 'PixelKnight' };
      const updatedMem = { ...memUser, ...data };
      memoryUsers.set(userId, updatedMem);
      return updatedMem;
    }
  }

  async getProgress(userId: string) {
    try {
      let progressList = await prisma.userProgress.findMany({
        where: { userId },
        include: {
          sublevel: {
            include: { level: true },
          },
        },
        orderBy: { sublevelId: 'asc' },
      });

      if (progressList && progressList.length > 0) {
        const activeProgress = progressList.find((p) => !p.isCompleted) || progressList[progressList.length - 1];
        return {
          activeProgress,
          allProgress: progressList,
        };
      }
    } catch {
      // Memory fallback
    }

    let memProg = memoryProgress.get(userId);
    if (!memProg || memProg.length === 0) {
      memProg = [
        {
          id: `prog_1`,
          userId,
          sublevelId: 1,
          currentStage: 1,
          isCompleted: false,
          sublevel: {
            id: 1,
            title: 'Asymptotic Analysis & Big-O',
            level: { id: 1, title: 'Foundations & Core Mechanics' },
          },
        },
      ];
      memoryProgress.set(userId, memProg);
    }

    const activeProgress = memProg.find((p: any) => !p.isCompleted) || memProg[memProg.length - 1];
    return {
      activeProgress,
      allProgress: memProg,
    };
  }

  async getStats(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          achievements: true,
          progress: true,
        },
      });

      if (user) {
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
    } catch {
      // Memory fallback
    }

    const memUser = memoryUsers.get(userId) || {
      id: userId,
      username: 'PixelKnight',
      avatar: 'default_avatar.png',
      xp: 0,
      hearts: 5,
      maxHearts: 5,
      gems: 100,
      streakCount: 0,
      longestStreak: 0,
      currentLeague: 'BRONZE',
    };

    return {
      userId: memUser.id,
      username: memUser.username,
      avatar: memUser.avatar,
      xp: memUser.xp,
      hearts: memUser.hearts,
      maxHearts: memUser.maxHearts,
      gems: memUser.gems,
      streakCount: memUser.streakCount,
      longestStreak: memUser.longestStreak,
      currentLeague: memUser.currentLeague,
      badgesCount: 1,
      achievements: [{ id: 'first_quest', title: 'First Steps', icon: '🌱' }],
      completionPercentage: 0,
      completedSublevels: 0,
      totalSublevels: 50,
    };
  }
}

export const userService = new UserService();
