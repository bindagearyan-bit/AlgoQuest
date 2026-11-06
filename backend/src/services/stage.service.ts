import prisma from '../config/prisma';

const XP_MAP: Record<string, number> = {
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
  async completeStage(userId: string, sublevelId: number, stageNumber: number) {
    const stage = await prisma.stage.findUnique({
      where: {
        sublevelId_stageNumber: {
          sublevelId,
          stageNumber,
        },
      },
      include: {
        sublevel: true,
      },
    });

    if (!stage) {
      throw new Error('Stage not found');
    }

    let progress = await prisma.userProgress.findUnique({
      where: {
        userId_sublevelId: {
          userId,
          sublevelId,
        },
      },
    });

    if (!progress) {
      // Create progress if missing
      progress = await prisma.userProgress.create({
        data: {
          userId,
          sublevelId,
          currentStage: 1,
          isCompleted: false,
        },
      });
    }

    // Verify progression
    if (stageNumber > progress.currentStage && !progress.isCompleted) {
      throw new Error(`Cannot skip stages. You must complete stage ${progress.currentStage} first.`);
    }

    // Calculate XP
    const xpGained = XP_MAP[stage.stageType] || 10;

    // Update user streak & XP
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const now = new Date();
    let newStreak = user.streakCount;
    if (user.lastActiveDate) {
      const lastActive = new Date(user.lastActiveDate);
      const diffHours = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
      if (diffHours >= 20 && diffHours <= 48) {
        newStreak += 1;
      } else if (diffHours > 48) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpGained },
        streakCount: newStreak,
        longestStreak: Math.max(user.longestStreak, newStreak),
        lastActiveDate: now,
      },
    });

    // Advance progress
    let nextStageNumber = stageNumber + 1;
    let nextSublevelUnlocked: number | null = null;
    let isSublevelCompleted = progress.isCompleted;

    if (stageNumber >= 8) {
      // Completed Stage 8 (Boss) -> Mark Sublevel complete & unlock next
      isSublevelCompleted = true;
      await prisma.userProgress.update({
        where: { id: progress.id },
        data: {
          isCompleted: true,
          currentStage: 8,
        },
      });

      // Find next sublevel
      const nextSublevel = await prisma.sublevel.findFirst({
        where: {
          OR: [
            { levelId: stage.sublevel.levelId, orderIndex: { gt: stage.sublevel.orderIndex } },
            { levelId: { gt: stage.sublevel.levelId } },
          ],
        },
        orderBy: [{ levelId: 'asc' }, { orderIndex: 'asc' }],
      });

      if (nextSublevel) {
        nextSublevelUnlocked = nextSublevel.id;
        // create or find progress for next sublevel
        await prisma.userProgress.upsert({
          where: {
            userId_sublevelId: {
              userId,
              sublevelId: nextSublevel.id,
            },
          },
          update: {},
          create: {
            userId,
            sublevelId: nextSublevel.id,
            currentStage: 1,
            isCompleted: false,
          },
        });
      }
    } else {
      // Advance to next stage if this was the current stage
      if (stageNumber === progress.currentStage) {
        await prisma.userProgress.update({
          where: { id: progress.id },
          data: {
            currentStage: nextStageNumber,
          },
        });
      }
    }

    return {
      success: true,
      stageNumber,
      stageType: stage.stageType,
      xpGained,
      totalXp: updatedUser.xp,
      streakCount: updatedUser.streakCount,
      hearts: updatedUser.hearts,
      nextStageNumber: stageNumber < 8 ? nextStageNumber : null,
      isSublevelCompleted,
      nextSublevelUnlocked,
    };
  }
}

export const stageService = new StageService();

