import { prisma } from '../../config/database';
import { NotFoundError } from '../../utils/errors';
import { UpdateProfileInput } from './user.validation';

export class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        xp: true,
        gems: true,
        hearts: true,
        streakCount: true,
        lastActive: true,
        league: true,
        selectedLevel: true,
        oauthProvider: true,
        createdAt: true,
        streak: {
          select: {
            currentStreak: true,
            longestStreak: true,
            freezeCount: true,
            lastCompletedDate: true,
          },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User not found');

    const updated = await prisma.user.update({
      where: { id: userId },
      data: input,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        xp: true,
        gems: true,
        hearts: true,
        streakCount: true,
        league: true,
        selectedLevel: true,
        updatedAt: true,
      },
    });

    return updated;
  }

  async getUserProgress(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User not found');

    const progress = await prisma.userProgress.findMany({
      where: { userId },
      include: {
        level: {
          select: { id: true, name: true, icon: true, orderIndex: true },
        },
        sublevel: {
          select: { id: true, name: true, orderIndex: true },
        },
      },
      orderBy: [
        { level: { orderIndex: 'asc' } },
        { sublevel: { orderIndex: 'asc' } },
      ],
    });

    // Group by level
    const progressByLevel = progress.reduce(
      (acc, p) => {
        const levelKey = p.levelId;
        if (!acc[levelKey]) {
          acc[levelKey] = {
            level: p.level,
            sublevels: [],
            completedSublevels: 0,
          };
        }
        acc[levelKey].sublevels.push({
          sublevel: p.sublevel,
          currentStage: p.currentStage,
          confidenceScore: p.confidenceScore,
          status: p.status,
          completedAt: p.completedAt,
        });
        if (p.status === 'COMPLETED') {
          acc[levelKey].completedSublevels++;
        }
        return acc;
      },
      {} as Record<string, {
        level: { id: string; name: string; icon: string | null; orderIndex: number };
        sublevels: Array<{
          sublevel: { id: string; name: string; orderIndex: number };
          currentStage: number;
          confidenceScore: number;
          status: string;
          completedAt: Date | null;
        }>;
        completedSublevels: number;
      }>
    );

    const totalCompleted = progress.filter((p) => p.status === 'COMPLETED').length;
    const totalInProgress = progress.filter((p) => p.status === 'IN_PROGRESS').length;

    return {
      summary: {
        totalSublevels: progress.length,
        completed: totalCompleted,
        inProgress: totalInProgress,
        xp: user.xp,
        league: user.league,
      },
      levels: Object.values(progressByLevel),
    };
  }
}

export const userService = new UserService();
