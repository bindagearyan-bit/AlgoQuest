import { prisma } from '../../config/database';
import { NotFoundError } from '../../utils/errors';

export class ContentService {
  async getLevels(userId?: string) {
    const levels = await prisma.level.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        sublevels: {
          orderBy: { orderIndex: 'asc' },
          select: {
            id: true,
            name: true,
            description: true,
            orderIndex: true,
            prerequisiteSublevelId: true,
            _count: { select: { stages: true, problems: true } },
          },
        },
      },
    });

    if (!userId) {
      return levels.map((level) => ({
        ...level,
        sublevels: level.sublevels.map((s) => ({
          ...s,
          lockStatus: s.orderIndex === 1 ? 'UNLOCKED' : 'LOCKED',
          userProgress: null,
        })),
      }));
    }

    // Get user progress for all sublevels
    const userProgress = await prisma.userProgress.findMany({
      where: { userId },
      select: {
        sublevelId: true,
        status: true,
        currentStage: true,
        confidenceScore: true,
      },
    });

    const progressMap = new Map(userProgress.map((p) => [p.sublevelId, p]));

    return levels.map((level) => {
      const enrichedSublevels = level.sublevels.map((sublevel) => {
        const progress = progressMap.get(sublevel.id);
        let lockStatus = 'LOCKED';

        if (sublevel.orderIndex === 1) {
          lockStatus = 'UNLOCKED';
        } else if (sublevel.prerequisiteSublevelId) {
          const prereqProgress = progressMap.get(sublevel.prerequisiteSublevelId);
          if (prereqProgress?.status === 'COMPLETED') {
            lockStatus = 'UNLOCKED';
          }
        }

        if (progress?.status === 'COMPLETED') {
          lockStatus = 'COMPLETED';
        } else if (progress?.status === 'IN_PROGRESS') {
          lockStatus = 'IN_PROGRESS';
        }

        return {
          ...sublevel,
          lockStatus,
          userProgress: progress || null,
        };
      });

      // Calculate level completion
      const totalSublevels = enrichedSublevels.length;
      const completedSublevels = enrichedSublevels.filter(
        (s) => s.lockStatus === 'COMPLETED'
      ).length;

      return {
        ...level,
        sublevels: enrichedSublevels,
        progress: {
          total: totalSublevels,
          completed: completedSublevels,
          percentage: totalSublevels > 0 ? Math.round((completedSublevels / totalSublevels) * 100) : 0,
        },
      };
    });
  }

  async getSublevel(sublevelId: string, userId?: string) {
    const sublevel = await prisma.sublevel.findUnique({
      where: { id: sublevelId },
      include: {
        level: { select: { id: true, name: true, icon: true } },
        stages: {
          orderBy: { stageNumber: 'asc' },
          select: {
            id: true,
            stageNumber: true,
            stageType: true,
            contentId: true,
            title: true,
          },
        },
        problems: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            xpReward: true,
            tags: true,
            _count: { select: { testCases: true } },
          },
        },
        _count: { select: { stages: true, problems: true } },
      },
    });

    if (!sublevel) {
      throw new NotFoundError('Sublevel not found');
    }

    let userProgress = null;
    if (userId) {
      userProgress = await prisma.userProgress.findUnique({
        where: { userId_sublevelId: { userId, sublevelId } },
        select: {
          currentStage: true,
          status: true,
          confidenceScore: true,
          completedAt: true,
        },
      });
    }

    return { ...sublevel, userProgress };
  }

  async getProblems(sublevelId: string) {
    const sublevel = await prisma.sublevel.findUnique({ where: { id: sublevelId } });
    if (!sublevel) throw new NotFoundError('Sublevel not found');

    const problems = await prisma.problem.findMany({
      where: { sublevelId },
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        constraints: true,
        xpReward: true,
        hints: true,
        tags: true,
        _count: { select: { testCases: true, submissions: true } },
      },
    });

    return problems;
  }

  async getProblem(problemId: string) {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        testCases: {
          where: { isHidden: false },
          select: {
            id: true,
            input: true,
            expectedOutput: true,
            explanation: true,
          },
        },
        sublevel: {
          select: { id: true, name: true },
        },
      },
    });

    if (!problem) throw new NotFoundError('Problem not found');
    return problem;
  }
}

export const contentService = new ContentService();
