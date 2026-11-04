import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';

export class RoadmapService {
  /**
   * Returns complete hierarchy of 6 Levels and all Sublevels with dynamic status
   * (LOCKED, UNLOCKED, COMPLETED) tailored to the requesting user.
   */
  static async getLevelsTree(userId: string) {
    const [levels, userProgressList] = await Promise.all([
      prisma.level.findMany({
        orderBy: { orderIndex: 'asc' },
        include: {
          sublevels: {
            orderBy: { orderIndex: 'asc' },
            include: {
              stages: {
                orderBy: { stageNumber: 'asc' },
                select: {
                  id: true,
                  stageNumber: true,
                  stageType: true,
                  title: true,
                },
              },
            },
          },
        },
      }),
      prisma.userProgress.findMany({
        where: { userId },
      }),
    ]);

    const progressMap = new Map<number, (typeof userProgressList)[0]>();
    userProgressList.forEach((up) => {
      progressMap.set(up.sublevelId, up);
    });

    const evaluatedLevels = levels.map((lvl) => {
      let anyUnlocked = false;
      let allCompleted = lvl.sublevels.length > 0;

      const sublevelsWithStatus = lvl.sublevels.map((sub) => {
        const up = progressMap.get(sub.id);
        let status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' = 'LOCKED';
        let currentStage = 1;

        if (up) {
          currentStage = up.currentStage;
          if (up.isCompleted) {
            status = 'COMPLETED';
          } else {
            status = 'UNLOCKED';
          }
        } else {
          // If first sublevel in level 1, default UNLOCKED
          if (lvl.orderIndex === 1 && sub.orderIndex === 1) {
            status = 'UNLOCKED';
          } else if (sub.prerequisiteSublevelId) {
            const prereqProgress = progressMap.get(sub.prerequisiteSublevelId);
            if (prereqProgress?.isCompleted) {
              status = 'UNLOCKED';
            }
          }
        }

        if (status === 'UNLOCKED' || status === 'COMPLETED') {
          anyUnlocked = true;
        }
        if (status !== 'COMPLETED') {
          allCompleted = false;
        }

        return {
          id: sub.id,
          title: sub.title,
          orderIndex: sub.orderIndex,
          prerequisiteSublevelId: sub.prerequisiteSublevelId,
          status,
          currentStage,
          totalStages: sub.stages.length,
          stages: sub.stages,
        };
      });

      const levelStatus: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' =
        allCompleted ? 'COMPLETED' : anyUnlocked ? 'UNLOCKED' : 'LOCKED';

      return {
        id: lvl.id,
        title: lvl.title,
        orderIndex: lvl.orderIndex,
        icon: lvl.icon,
        status: levelStatus,
        sublevels: sublevelsWithStatus,
      };
    });

    return evaluatedLevels;
  }

  /**
   * Retrieves single sublevel details, stages, and user's progress.
   */
  static async getSublevelDetail(sublevelId: number, userId: string) {
    const sublevel = await prisma.sublevel.findUnique({
      where: { id: sublevelId },
      include: {
        level: true,
        stages: {
          orderBy: { stageNumber: 'asc' },
        },
        problems: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            xpReward: true,
          },
        },
      },
    });

    if (!sublevel) throw new AppError('Sublevel not found', 404);

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_sublevelId: {
          userId,
          sublevelId,
        },
      },
    });

    let status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' = 'LOCKED';
    let currentStage = 1;

    if (progress) {
      currentStage = progress.currentStage;
      status = progress.isCompleted ? 'COMPLETED' : 'UNLOCKED';
    } else if (sublevel.level.orderIndex === 1 && sublevel.orderIndex === 1) {
      status = 'UNLOCKED';
    } else if (sublevel.prerequisiteSublevelId) {
      const prereq = await prisma.userProgress.findUnique({
        where: {
          userId_sublevelId: {
            userId,
            sublevelId: sublevel.prerequisiteSublevelId,
          },
        },
      });
      if (prereq?.isCompleted) {
        status = 'UNLOCKED';
      }
    }

    return {
      sublevel,
      status,
      currentStage,
      isCompleted: progress?.isCompleted || false,
    };
  }

  /**
   * Retrieves a specific stage's content, validating that the user is not attempting
   * to access a stage beyond their current unlocked stage.
   */
  static async getStageContent(sublevelId: number, stageNumber: number, userId: string) {
    if (stageNumber < 1 || stageNumber > 8) {
      throw new AppError('Stage number must be between 1 and 8', 400);
    }

    const stage = await prisma.stage.findUnique({
      where: {
        sublevelId_stageNumber: {
          sublevelId,
          stageNumber,
        },
      },
      include: {
        sublevel: {
          include: {
            level: true,
          },
        },
      },
    });

    if (!stage) throw new AppError('Stage content not found', 404);

    // Verify stage lock
    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_sublevelId: {
          userId,
          sublevelId,
        },
      },
    });

    // Check if sublevel is unlocked
    const isLevel1Sublevel1 = stage.sublevel.level.orderIndex === 1 && stage.sublevel.orderIndex === 1;

    if (!progress && !isLevel1Sublevel1) {
      // Check prerequisite
      if (stage.sublevel.prerequisiteSublevelId) {
        const prereq = await prisma.userProgress.findUnique({
          where: {
            userId_sublevelId: {
              userId,
              sublevelId: stage.sublevel.prerequisiteSublevelId,
            },
          },
        });
        if (!prereq?.isCompleted) {
          throw new AppError('This sublevel is locked. Complete previous sublevels first.', 403);
        }
      } else {
        throw new AppError('This sublevel is locked.', 403);
      }
    }

    // Check stage lock within sublevel
    if (progress && !progress.isCompleted && stageNumber > progress.currentStage) {
      throw new AppError(
        `Stage ${stageNumber} is locked. You must complete Stage ${progress.currentStage} first.`,
        403
      );
    }

    return stage;
  }
}
