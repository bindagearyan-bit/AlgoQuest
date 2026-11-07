import prisma from '../config/prisma';
import { memoryUsers, memoryProgress, memoryBadges, memoryUserBadges } from './auth.service';
import { getSublevelById, SublevelType } from '../data/curriculumCatalog';

const XP_MAP: Record<string, number> = {
  THEORY: 10,
  VISUALIZATION: 10,
  DRY_RUN: 15,
  GUIDED_CODE: 20,
  EASY_PROBLEM: 30,
  MEDIUM_PROBLEM: 50,
  QUIZ: 25,
  BOSS: 100,
  MINI_BOSS: 60,
};

function getMaxStageForType(type?: SublevelType | string): number {
  switch (type) {
    case 'THEORETICAL':
      return 3;
    case 'HYBRID':
      return 5;
    case 'CODE_BASED':
    default:
      return 8;
  }
}

export class StageService {
  async completeStage(userId: string, sublevelId: number, stageNumber: number) {
    const sublevelDef = getSublevelById(sublevelId);
    const sublevelType: SublevelType = (sublevelDef?.sublevelType as SublevelType) || 'CODE_BASED';
    const maxStage = getMaxStageForType(sublevelType);

    let stage: any = null;
    let xpGained = 10;

    let isDbAvailable = true;
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
      isDbAvailable = false;
    }

    const isSublevelCompleted = stageNumber >= maxStage;
    let badgeAwarded: any = null;
    let bonusXp = 0;

    // Check Badge awarding on completion
    if (isSublevelCompleted && sublevelDef?.badge) {
      bonusXp = sublevelDef.badge.xpReward || 500;
      badgeAwarded = {
        title: sublevelDef.badge.title,
        description: sublevelDef.badge.description,
        iconSvg: sublevelDef.badge.iconSvg,
        xpReward: bonusXp,
      };
    }

    const totalXpToAdd = xpGained + bonusXp;

    // 1. Try Prisma Database Update (only if DB connection did not fail)
    if (isDbAvailable) {
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
            xp: { increment: totalXpToAdd },
            streakCount: Math.max(1, user.streakCount),
          },
        });

        const nextStageNumber = stageNumber < maxStage ? stageNumber + 1 : null;
        let updatedProgress = progress;

        if (isSublevelCompleted) {
          updatedProgress = await prisma.userProgress.update({
            where: { id: progress.id },
            data: { isCompleted: true, currentStage: maxStage },
          });

          // Award Badge in DB
          if (badgeAwarded) {
            try {
              let badge = await prisma.badge.findFirst({
                where: { sublevelId },
              });
              if (!badge) {
                badge = await prisma.badge.create({
                  data: {
                    title: badgeAwarded.title,
                    description: badgeAwarded.description,
                    iconSvg: badgeAwarded.iconSvg,
                    xpReward: badgeAwarded.xpReward,
                    tier: (sublevelDef?.tier as any) || 'BEGINNER',
                    sublevelId,
                  },
                });
              }
              const existingUserBadge = await prisma.userBadge.findUnique({
                where: { userId_badgeId: { userId, badgeId: badge.id } },
              });
              if (!existingUserBadge) {
                await prisma.userBadge.create({
                  data: { userId, badgeId: badge.id },
                });
              }
            } catch {
              // Ignore badge duplicate or DB error
            }
          }
        } else if (stageNumber === progress.currentStage) {
          updatedProgress = await prisma.userProgress.update({
            where: { id: progress.id },
            data: { currentStage: stageNumber + 1 },
          });
        }

        return {
          success: true,
          stageNumber,
          stageType: stage?.stageType || 'THEORY',
          sublevelType,
          maxStage,
          xpGained,
          bonusXp,
          totalXp: updatedUser.xp,
          streakCount: updatedUser.streakCount,
          hearts: updatedUser.hearts,
          nextStageNumber,
          isSublevelCompleted,
          nextSublevelUnlocked: isSublevelCompleted ? sublevelId + 1 : null,
          badgeAwarded,
          progress: {
            id: updatedProgress.id,
            userId: updatedProgress.userId,
            sublevelId: updatedProgress.sublevelId,
            currentStage: updatedProgress.currentStage,
            isCompleted: updatedProgress.isCompleted,
            maxStage,
            sublevelType,
          },
        };
      }
    } catch {
      // Database offline -> Seamless fallback to memory store
    }
  }

    // 2. Memory Store Update (Offline Resilient)
    const memUser = memoryUsers.get(userId) || {
      id: userId,
      xp: 0,
      streakCount: 1,
      hearts: 5,
    };
    memUser.xp = (memUser.xp || 0) + totalXpToAdd;
    memUser.streakCount = Math.max(1, memUser.streakCount || 1);
    memoryUsers.set(userId, memUser);

    const progs = memoryProgress.get(userId) || [];
    let p = progs.find((item: any) => item.sublevelId === sublevelId);
    if (!p) {
      p = {
        id: `prog_${userId}_${sublevelId}`,
        userId,
        sublevelId,
        currentStage: 1,
        isCompleted: false,
      };
      progs.push(p);
    }

    if (isSublevelCompleted) {
      p.isCompleted = true;
      p.currentStage = maxStage;

      // Record Badge in memory
      if (badgeAwarded) {
        const uBadges = memoryUserBadges.get(userId) || [];
        if (!uBadges.some((b: any) => b.sublevelId === sublevelId)) {
          uBadges.push({
            id: `ub_${userId}_${sublevelId}`,
            userId,
            sublevelId,
            earnedAt: new Date(),
            badge: badgeAwarded,
          });
          memoryUserBadges.set(userId, uBadges);
        }
      }
    } else if (stageNumber === p.currentStage) {
      p.currentStage = stageNumber + 1;
    }
    memoryProgress.set(userId, progs);

    const nextStageNumber = stageNumber < maxStage ? stageNumber + 1 : null;

    return {
      success: true,
      stageNumber,
      stageType: stage?.stageType || (stageNumber === 1 ? 'THEORY' : 'VISUALIZATION'),
      sublevelType,
      maxStage,
      xpGained,
      bonusXp,
      totalXp: memUser.xp,
      streakCount: memUser.streakCount,
      hearts: memUser.hearts,
      nextStageNumber,
      isSublevelCompleted,
      nextSublevelUnlocked: isSublevelCompleted ? sublevelId + 1 : null,
      badgeAwarded,
      progress: {
        id: p.id || `prog_${userId}_${sublevelId}`,
        userId,
        sublevelId,
        currentStage: p.currentStage,
        isCompleted: p.isCompleted,
        maxStage,
        sublevelType,
      },
    };
  }
}

export const stageService = new StageService();
