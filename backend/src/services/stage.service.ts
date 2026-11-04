import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/errorHandler';
import { UserService } from './user.service';
import { League, StageType } from '@prisma/client';

export const STAGE_XP_REWARDS: Record<StageType, number> = {
  THEORY: 10,
  VISUALIZATION: 10,
  DRY_RUN: 15,
  GUIDED_CODE: 20,
  EASY_PROBLEM: 30,
  MEDIUM_PROBLEM: 50,
  QUIZ: 25,
  BOSS: 100,
};

export class StageService {
  /**
   * Completes a stage in the 8-stage sequence, calculates XP, updates hearts/streak,
   * handles sublevel completion, and unlocks next stage/sublevel.
   */
  static async completeStage(userId: string, sublevelId: number, stageNumber: number) {
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

    if (!stage) throw new AppError('Stage not found', 404);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new AppError('User not found', 404);

    // Compute active hearts
    const currentHearts = UserService.calculateHearts(user);

    // Coding stages require at least 1 heart
    const isCodingStage =
      stage.stageType === StageType.EASY_PROBLEM ||
      stage.stageType === StageType.MEDIUM_PROBLEM ||
      stage.stageType === StageType.BOSS;
    if (isCodingStage && currentHearts <= 0) {
      throw new AppError('You have 0 hearts. Wait for regeneration or refill with gems.', 403);
    }

    // Get or initialize UserProgress
    let progress = await prisma.userProgress.findUnique({
      where: {
        userId_sublevelId: {
          userId,
          sublevelId,
        },
      },
    });

    if (!progress) {
      // Allow Level 1 Sublevel 1 or valid prerequisite
      const isL1S1 = stage.sublevel.level.orderIndex === 1 && stage.sublevel.orderIndex === 1;
      let allowed = isL1S1;
      if (!allowed && stage.sublevel.prerequisiteSublevelId) {
        const prereq = await prisma.userProgress.findUnique({
          where: {
            userId_sublevelId: {
              userId,
              sublevelId: stage.sublevel.prerequisiteSublevelId,
            },
          },
        });
        if (prereq?.isCompleted) allowed = true;
      }

      if (!allowed) {
        throw new AppError('Sublevel is locked. Complete prerequisite stages first.', 403);
      }

      progress = await prisma.userProgress.create({
        data: {
          userId,
          sublevelId,
          currentStage: 1,
          isCompleted: false,
          confidenceScore: 100,
        },
      });
    }

    // Progression rule: Cannot skip stages. E.g. Cannot complete stage 6 without stages 1-5.
    if (!progress.isCompleted && stageNumber > progress.currentStage) {
      throw new AppError(
        `Cannot attempt Stage ${stageNumber} without completing Stage ${progress.currentStage} first.`,
        400
      );
    }

    // Calculate XP reward
    const xpReward = STAGE_XP_REWARDS[stage.stageType] || 10;
    const newTotalXp = user.xp + xpReward;

    // League advancement calculation
    let newLeague = user.currentLeague;
    if (newTotalXp >= 3000) newLeague = League.DIAMOND;
    else if (newTotalXp >= 1500) newLeague = League.GOLD;
    else if (newTotalXp >= 500) newLeague = League.SILVER;
    else newLeague = League.BRONZE;

    // Advance Stage or Sublevel
    const isBossStage = stageNumber === 8;
    let nextSublevelUnlocked: any = null;

    if (isBossStage) {
      // Mark current sublevel completed
      await prisma.userProgress.update({
        where: { id: progress.id },
        data: {
          currentStage: 8,
          isCompleted: true,
          confidenceScore: Math.min(100, progress.confidenceScore + 5),
        },
      });

      // Find next consecutive sublevel
      const nextInSameLevel = await prisma.sublevel.findFirst({
        where: {
          levelId: stage.sublevel.levelId,
          orderIndex: stage.sublevel.orderIndex + 1,
        },
      });

      if (nextInSameLevel) {
        nextSublevelUnlocked = await prisma.userProgress.upsert({
          where: {
            userId_sublevelId: {
              userId,
              sublevelId: nextInSameLevel.id,
            },
          },
          update: {},
          create: {
            userId,
            sublevelId: nextInSameLevel.id,
            currentStage: 1,
            isCompleted: false,
            confidenceScore: 100,
          },
        });
      } else {
        // Next Level's first sublevel
        const nextLevel = await prisma.level.findFirst({
          where: {
            orderIndex: stage.sublevel.level.orderIndex + 1,
          },
          include: {
            sublevels: {
              orderBy: { orderIndex: 'asc' },
              take: 1,
            },
          },
        });

        if (nextLevel && nextLevel.sublevels.length > 0) {
          nextSublevelUnlocked = await prisma.userProgress.upsert({
            where: {
              userId_sublevelId: {
                userId,
                sublevelId: nextLevel.sublevels[0].id,
              },
            },
            update: {},
            create: {
              userId,
              sublevelId: nextLevel.sublevels[0].id,
              currentStage: 1,
              isCompleted: false,
              confidenceScore: 100,
            },
          });
        }
      }
    } else {
      // Advance to next stage within sublevel if not already ahead
      const nextStageNumber = Math.max(progress.currentStage, stageNumber + 1);
      await prisma.userProgress.update({
        where: { id: progress.id },
        data: {
          currentStage: nextStageNumber,
        },
      });
    }

    // Update user stats and streak
    await UserService.updateActivityAndStreak(userId);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: newTotalXp,
        currentLeague: newLeague,
        gems: isBossStage ? { increment: 20 } : undefined, // Bonus gems for boss victory
      },
    });

    return {
      stageCompleted: {
        sublevelId,
        stageNumber,
        stageType: stage.stageType,
        title: stage.title,
      },
      rewards: {
        xpGained: xpReward,
        gemsGained: isBossStage ? 20 : 0,
        totalXp: updatedUser.xp,
        currentLeague: updatedUser.currentLeague,
      },
      progress: {
        sublevelCompleted: isBossStage,
        nextStageNumber: isBossStage ? 8 : stageNumber + 1,
        nextSublevelUnlocked: nextSublevelUnlocked ? nextSublevelUnlocked.sublevelId : null,
      },
    };
  }
}
