import prisma from '../config/prisma';
import { memoryUsers, memoryProgress } from './auth.service';

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
    let stage: any = null;
    let xpGained = 10;

    try {
      stage = await prisma.stage.findUnique({
        where: {
          sublevelId_stageNumber: {
            sublevelId,
            stageNumber,
          },
        },
        include: { sublevel: true },
      });
      if (stage) {
        xpGained = XP_MAP[stage.stageType] || 10;
      }
    } catch {
      // Offline fallback
    }

    // Try database update
    try {
      let progress = await prisma.userProgress.findUnique({
        where: { userId_sublevelId: { userId, sublevelId } },
      });

      if (!progress) {
        progress = await prisma.userProgress.create({
          data: { userId, sublevelId, currentStage: 1, isCompleted: false },
        });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            xp: { increment: xpGained },
            streakCount: Math.max(1, user.streakCount),
          },
        });

        const nextStageNumber = stageNumber < 8 ? stageNumber + 1 : null;
        if (stageNumber >= 8) {
          await prisma.userProgress.update({
            where: { id: progress.id },
            data: { isCompleted: true, currentStage: 8 },
          });
        } else if (stageNumber === progress.currentStage) {
          await prisma.userProgress.update({
            where: { id: progress.id },
            data: { currentStage: stageNumber + 1 },
          });
        }

        return {
          success: true,
          stageNumber,
          stageType: stage?.stageType || 'THEORY',
          xpGained,
          totalXp: updatedUser.xp,
          streakCount: updatedUser.streakCount,
          hearts: updatedUser.hearts,
          nextStageNumber,
          isSublevelCompleted: stageNumber >= 8,
          nextSublevelUnlocked: stageNumber >= 8 ? sublevelId + 1 : null,
        };
      }
    } catch {
      // Memory fallback
    }

    // Memory Store Update
    const memUser = memoryUsers.get(userId) || {
      id: userId,
      xp: 0,
      streakCount: 1,
      hearts: 5,
    };
    memUser.xp = (memUser.xp || 0) + xpGained;
    memUser.streakCount = Math.max(1, memUser.streakCount || 1);
    memoryUsers.set(userId, memUser);

    const progs = memoryProgress.get(userId) || [];
    let p = progs.find((item: any) => item.sublevelId === sublevelId);
    if (!p) {
      p = { sublevelId, currentStage: 1, isCompleted: false };
      progs.push(p);
    }

    if (stageNumber >= 8) {
      p.isCompleted = true;
      p.currentStage = 8;
    } else if (stageNumber === p.currentStage) {
      p.currentStage = stageNumber + 1;
    }
    memoryProgress.set(userId, progs);

    return {
      success: true,
      stageNumber,
      stageType: stage?.stageType || (stageNumber === 1 ? 'THEORY' : 'VISUALIZATION'),
      xpGained,
      totalXp: memUser.xp,
      streakCount: memUser.streakCount,
      hearts: memUser.hearts,
      nextStageNumber: stageNumber < 8 ? stageNumber + 1 : null,
      isSublevelCompleted: stageNumber >= 8,
      nextSublevelUnlocked: stageNumber >= 8 ? sublevelId + 1 : null,
    };
  }
}

export const stageService = new StageService();
