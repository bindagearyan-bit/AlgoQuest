import prisma from '../config/prisma';
import { memoryUsers, memoryProgress, memoryBadges, memoryUserBadges } from './auth.service';
import { getSublevelById, getAllSublevels, SublevelType } from '../data/curriculumCatalog';

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

    let tierPromoted: {
      fromTier: string;
      toTier: string;
      title: string;
      message: string;
      bonusGems: number;
    } | null = null;

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
        const userTier = (user.selectedLevel || 'BEGINNER') as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
        const allTierSublevels = getAllSublevels().filter((s) => s.tier === userTier);

        const nextStageNumber = stageNumber < maxStage ? stageNumber + 1 : null;
        let updatedProgress = progress;

        if (isSublevelCompleted) {
          updatedProgress = await prisma.userProgress.update({
            where: { id: progress.id },
            data: { isCompleted: true, currentStage: maxStage },
          });

          // Check Tier Graduation
          const completedList = await prisma.userProgress.findMany({
            where: { userId, isCompleted: true },
            select: { sublevelId: true },
          });
          const completedSublevelIds = new Set(completedList.map((item) => item.sublevelId));
          completedSublevelIds.add(sublevelId);

          const hasCompletedAllInTier =
            allTierSublevels.length > 0 && allTierSublevels.every((s) => completedSublevelIds.has(s.id));

          if (hasCompletedAllInTier) {
            let nextTier: 'INTERMEDIATE' | 'ADVANCED' | null = null;
            if (userTier === 'BEGINNER') nextTier = 'INTERMEDIATE';
            else if (userTier === 'INTERMEDIATE') nextTier = 'ADVANCED';

            if (nextTier) {
              await prisma.user.update({
                where: { id: userId },
                data: {
                  selectedLevel: nextTier,
                  gems: { increment: 100 },
                },
              });

              tierPromoted = {
                fromTier: userTier,
                toTier: nextTier,
                title: `Graduated to ${nextTier} Tier!`,
                message: `Congratulations Hero! You have conquered all ${userTier} sectors across the realm. The ${nextTier} expedition is now unlocked (+100 💎 bonus)!`,
                bonusGems: 100,
              };
            }
          }

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

        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            xp: { increment: totalXpToAdd },
            streakCount: Math.max(1, user.streakCount),
          },
        });

        let nextSublevelUnlocked: number | null = null;
        if (isSublevelCompleted) {
          const currentIndex = allTierSublevels.findIndex((s) => s.id === sublevelId);
          if (currentIndex !== -1 && currentIndex < allTierSublevels.length - 1) {
            nextSublevelUnlocked = allTierSublevels[currentIndex + 1].id;
          } else if (tierPromoted) {
            const promotedTier = tierPromoted.toTier;
            const nextTierSubs = getAllSublevels().filter((s) => s.tier === promotedTier);
            nextSublevelUnlocked = nextTierSubs[0]?.id || null;
          }
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
          nextSublevelUnlocked,
          badgeAwarded,
          tierPromoted,
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
      gems: 100,
      selectedLevel: 'BEGINNER',
    };
    memUser.xp = (memUser.xp || 0) + totalXpToAdd;
    memUser.streakCount = Math.max(1, memUser.streakCount || 1);

    const userTier = (memUser.selectedLevel || 'BEGINNER') as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    const allTierSublevels = getAllSublevels().filter((s) => s.tier === userTier);

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

      // Check Tier Graduation in memory
      const completedSublevelIds = new Set(
        progs.filter((item: any) => item.isCompleted).map((item: any) => item.sublevelId)
      );
      completedSublevelIds.add(sublevelId);

      const hasCompletedAllInTier =
        allTierSublevels.length > 0 && allTierSublevels.every((s) => completedSublevelIds.has(s.id));

      if (hasCompletedAllInTier) {
        let nextTier: 'INTERMEDIATE' | 'ADVANCED' | null = null;
        if (userTier === 'BEGINNER') nextTier = 'INTERMEDIATE';
        else if (userTier === 'INTERMEDIATE') nextTier = 'ADVANCED';

        if (nextTier) {
          memUser.selectedLevel = nextTier;
          memUser.gems = (memUser.gems || 0) + 100;

          tierPromoted = {
            fromTier: userTier,
            toTier: nextTier,
            title: `Graduated to ${nextTier} Tier!`,
            message: `Congratulations Hero! You have conquered all ${userTier} sectors across the realm. The ${nextTier} expedition is now unlocked (+100 💎 bonus)!`,
            bonusGems: 100,
          };
        }
      }

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

    memoryUsers.set(userId, memUser);
    memoryProgress.set(userId, progs);

    const nextStageNumber = stageNumber < maxStage ? stageNumber + 1 : null;

    let nextSublevelUnlocked: number | null = null;
    if (isSublevelCompleted) {
      const currentIndex = allTierSublevels.findIndex((s) => s.id === sublevelId);
      if (currentIndex !== -1 && currentIndex < allTierSublevels.length - 1) {
        nextSublevelUnlocked = allTierSublevels[currentIndex + 1].id;
      } else if (tierPromoted) {
        const promotedTier = tierPromoted.toTier;
        const nextTierSubs = getAllSublevels().filter((s) => s.tier === promotedTier);
        nextSublevelUnlocked = nextTierSubs[0]?.id || null;
      }
    }

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
      nextSublevelUnlocked,
      badgeAwarded,
      tierPromoted,
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
