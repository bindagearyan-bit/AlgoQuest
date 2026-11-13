import prisma from '../config/prisma';
import {
  memoryUsers,
  memoryGameSessions,
  memoryUserBadges,
  saveStateToDisk,
} from './auth.service';
import { getPixelBadgeByTitle } from '../data/pixelBadgeCatalog';

export interface RecordSessionInput {
  userId: string;
  score: number;
  timeElapsed: number;
  moves: number;
}

export class ArcadeService {
  private async safeDb<T>(op: () => Promise<T>): Promise<T> {
    return Promise.race([
      op(),
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 1200))
    ]);
  }

  async recordMemoryMatchSession(input: RecordSessionInput) {
    const { userId, score, timeElapsed, moves } = input;
    const gameType = 'MEMORY_MATCH_DS_ICONS';

    // 1. Calculate XP according to specification:
    // Participation XP: +10 XP for completing
    // Victory XP: +25 XP for finishing under 60 seconds
    const xpEarned = timeElapsed < 60 ? 25 : 10;
    const isPerfectGame = moves <= 12;

    let newBadgeUnlocked: any = null;
    let createdSession: any = null;

    // 2. Database attempt with fast timeout fallback
    try {
      createdSession = await this.safeDb(() =>
        prisma.gameSession.create({
          data: {
            userId,
            gameType,
            score,
            timeElapsed,
            moves,
            xpEarned,
          },
        })
      );

      // Update user XP
      await this.safeDb(() =>
        prisma.user.update({
          where: { id: userId },
          data: {
            xp: { increment: xpEarned },
          },
        })
      );

      // Perfect Game Badge: Memory Maestro
      if (isPerfectGame) {
        const badgeMeta = getPixelBadgeByTitle('Memory Maestro');
        if (badgeMeta) {
          let dbBadge = await this.safeDb(() =>
            prisma.badge.findFirst({
              where: { title: 'Memory Maestro' },
            })
          );

          if (!dbBadge) {
            dbBadge = await this.safeDb(() =>
              prisma.badge.create({
                data: {
                  title: badgeMeta.title,
                  description: badgeMeta.description,
                  iconSvg: badgeMeta.iconSvg,
                  xpReward: badgeMeta.xpReward,
                  tier: badgeMeta.tier,
                  sublevelId: badgeMeta.sublevelId,
                },
              })
            );
          }

          const existingUserBadge = await this.safeDb(() =>
            prisma.userBadge.findUnique({
              where: {
                userId_badgeId: {
                  userId,
                  badgeId: (dbBadge as any).id,
                },
              },
            })
          );

          if (!existingUserBadge) {
            const unlocked: any = await this.safeDb(() =>
              prisma.userBadge.create({
                data: {
                  userId,
                  badgeId: (dbBadge as any).id,
                },
              })
            );
            newBadgeUnlocked = {
              id: unlocked.id,
              title: badgeMeta.title,
              description: badgeMeta.description,
              iconSvg: badgeMeta.iconSvg,
              tier: badgeMeta.tier,
            };
          }
        }
      }
    } catch {
      // 3. Resilient Offline Memory Fallback
      createdSession = {
        id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        userId,
        gameType,
        score,
        timeElapsed,
        moves,
        xpEarned,
        completedAt: new Date(),
      };

      const userSessions = memoryGameSessions.get(userId) || [];
      userSessions.push(createdSession);
      memoryGameSessions.set(userId, userSessions);

      // Increment user XP in memory
      const user = memoryUsers.get(userId);
      if (user) {
        user.xp = (user.xp || 0) + xpEarned;
        memoryUsers.set(userId, user);
      }

      // Check badge in memory
      if (isPerfectGame) {
        const userBadges = memoryUserBadges.get(userId) || [];
        const alreadyHasBadge = userBadges.some(
          (b: any) => b.title === 'Memory Maestro' || b.sublevelId === 901
        );

        if (!alreadyHasBadge) {
          const badgeMeta = getPixelBadgeByTitle('Memory Maestro');
          if (badgeMeta) {
            const newBadge = {
              id: `ub_${Date.now()}`,
              userId,
              badgeId: 'badge_memory_maestro',
              sublevelId: 901,
              title: badgeMeta.title,
              description: badgeMeta.description,
              iconSvg: badgeMeta.iconSvg,
              tier: badgeMeta.tier,
              earnedAt: new Date(),
            };
            userBadges.push(newBadge);
            memoryUserBadges.set(userId, userBadges);
            newBadgeUnlocked = newBadge;
          }
        }
      }

      saveStateToDisk();
    }

    const stats = await this.getUserStats(userId, gameType);

    const badgeMeta = isPerfectGame ? getPixelBadgeByTitle('Memory Maestro') : null;

    return {
      session: createdSession,
      xpEarned,
      isPerfectGame,
      newBadgeUnlocked,
      badge: badgeMeta ? {
        title: badgeMeta.title,
        description: badgeMeta.description,
        iconSvg: badgeMeta.iconSvg,
        tier: badgeMeta.tier,
        isNew: !!newBadgeUnlocked,
      } : null,
      stats,
    };
  }

  async getLeaderboard(gameType = 'MEMORY_MATCH_DS_ICONS', limit = 10) {
    try {
      const topSessions: any = await this.safeDb(() =>
        prisma.gameSession.findMany({
          where: { gameType },
          orderBy: [
            { score: 'desc' },
            { timeElapsed: 'asc' },
          ],
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
                currentLeague: true,
              },
            },
          },
        })
      );

      if (topSessions && Array.isArray(topSessions) && topSessions.length > 0) {
        return topSessions.map((s: any, idx: number) => ({
          rank: idx + 1,
          id: s.id,
          username: s.user?.username || 'Hero',
          avatar: s.user?.avatar || 'default_avatar.png',
          league: s.user?.currentLeague || 'BRONZE',
          score: s.score,
          timeElapsed: s.timeElapsed,
          moves: s.moves,
          completedAt: s.completedAt,
        }));
      }
    } catch {
      // Offline fallback
    }

    // Memory store fallback
    const allSessions: any[] = [];
    for (const [userId, sessions] of memoryGameSessions.entries()) {
      const u = memoryUsers.get(userId);
      for (const s of sessions) {
        if (s.gameType === gameType) {
          allSessions.push({
            ...s,
            username: u?.username || 'Hero',
            avatar: u?.avatar || 'default_avatar.png',
            league: u?.currentLeague || 'BRONZE',
          });
        }
      }
    }

    allSessions.sort((a, b) => b.score - a.score || a.timeElapsed - b.timeElapsed);

    return allSessions.slice(0, limit).map((s, idx) => ({
      rank: idx + 1,
      id: s.id,
      username: s.username,
      avatar: s.avatar,
      league: s.league,
      score: s.score,
      timeElapsed: s.timeElapsed,
      moves: s.moves,
      completedAt: s.completedAt,
    }));
  }

  async getUserStats(userId: string, gameType = 'MEMORY_MATCH_DS_ICONS') {
    try {
      const dbSessions: any = await this.safeDb(() =>
        prisma.gameSession.findMany({
          where: { userId, gameType },
          orderBy: { score: 'desc' },
        })
      );

      if (dbSessions && Array.isArray(dbSessions) && dbSessions.length > 0) {
        const bestScore = dbSessions[0].score;
        const bestTime = Math.min(...dbSessions.map((s: any) => s.timeElapsed));
        const bestMoves = Math.min(...dbSessions.map((s: any) => s.moves));
        return {
          bestScore,
          bestTime,
          bestMoves,
          timesPlayed: dbSessions.length,
        };
      }
    } catch {
      // Offline fallback
    }

    const sessions = (memoryGameSessions.get(userId) || []).filter(
      (s: any) => s.gameType === gameType
    );

    if (sessions.length > 0) {
      const bestScore = Math.max(...sessions.map((s: any) => s.score));
      const bestTime = Math.min(...sessions.map((s: any) => s.timeElapsed));
      const bestMoves = Math.min(...sessions.map((s: any) => s.moves));
      return {
        bestScore,
        bestTime,
        bestMoves,
        timesPlayed: sessions.length,
      };
    }

    return {
      bestScore: 0,
      bestTime: 0,
      bestMoves: 0,
      timesPlayed: 0,
    };
  }
}

export const arcadeService = new ArcadeService();
