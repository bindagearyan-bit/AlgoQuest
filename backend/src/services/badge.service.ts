import prisma from '../config/prisma';
import { memoryUserBadges } from './auth.service';
import { getAllSublevels } from '../data/curriculumCatalog';

export class BadgeService {
  async getAllBadges(userId?: string) {
    const allSubs = getAllSublevels();
    let earnedBadgesMap = new Map<number, any>();

    // 1. Try DB
    if (userId) {
      try {
        const userBadges = await prisma.userBadge.findMany({
          where: { userId },
          include: { badge: true },
        });
        userBadges.forEach((ub) => {
          if (ub.badge.sublevelId) {
            earnedBadgesMap.set(ub.badge.sublevelId, ub);
          }
        });
      } catch {
        // Fallback to memory
        const memBadges = memoryUserBadges.get(userId) || [];
        memBadges.forEach((ub: any) => {
          earnedBadgesMap.set(ub.sublevelId, ub);
        });
      }
    }

    return allSubs.map((sub) => {
      const earned = earnedBadgesMap.get(sub.id);
      return {
        id: sub.id,
        sublevelId: sub.id,
        levelId: sub.levelId,
        title: sub.badge.title,
        description: sub.badge.description,
        iconSvg: sub.badge.iconSvg,
        xpReward: sub.badge.xpReward,
        tier: sub.tier,
        isEarned: !!earned,
        earnedAt: earned ? earned.earnedAt : null,
      };
    });
  }

  async getEarnedBadges(userId: string) {
    try {
      const userBadges = await prisma.userBadge.findMany({
        where: { userId },
        include: { badge: true },
        orderBy: { earnedAt: 'desc' },
      });

      if (userBadges && userBadges.length > 0) {
        return userBadges.map((ub) => ({
          id: ub.id,
          badgeId: ub.badgeId,
          title: ub.badge.title,
          description: ub.badge.description,
          iconSvg: ub.badge.iconSvg,
          xpReward: ub.badge.xpReward,
          tier: ub.badge.tier,
          sublevelId: ub.badge.sublevelId,
          earnedAt: ub.earnedAt,
        }));
      }
    } catch {
      // Offline fallback
    }

    const memBadges = memoryUserBadges.get(userId) || [];
    return memBadges.map((ub: any) => ({
      id: ub.id,
      title: ub.badge.title,
      description: ub.badge.description,
      iconSvg: ub.badge.iconSvg,
      xpReward: ub.badge.xpReward,
      tier: 'BEGINNER',
      sublevelId: ub.sublevelId,
      earnedAt: ub.earnedAt,
    }));
  }

  async getSharePayload(badgeId: number, userId?: string) {
    const allSubs = getAllSublevels();
    const sub = allSubs.find((s) => s.id === badgeId);

    if (!sub) {
      throw new Error('Badge not found in curriculum');
    }

    return {
      badge: {
        id: sub.id,
        title: sub.badge.title,
        description: sub.badge.description,
        iconSvg: sub.badge.iconSvg,
        xpReward: sub.badge.xpReward,
        tier: sub.tier,
      },
      sublevelTitle: sub.title,
      certificateCode: `AQ-CERT-${sub.id}-${Date.now().toString(36).toUpperCase()}`,
      issuedAt: new Date().toISOString(),
      shareUrl: `https://algoquest.dev/verify/badge/${sub.id}`,
    };
  }
}

export const badgeService = new BadgeService();
