import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/prisma';
import { signAccessToken } from '../src/utils/jwt';

jest.mock('../src/config/prisma', () => ({
  prisma: {
    stage: {
      findUnique: jest.fn(),
    },
    sublevel: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
    level: {
      findFirst: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    userProgress: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      upsert: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}));

jest.mock('../src/config/redis', () => ({
  redisClient: {
    isTokenBlacklisted: jest.fn().mockResolvedValue(false),
    blacklistToken: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
  },
  redis: {
    isTokenBlacklisted: jest.fn().mockResolvedValue(false),
    blacklistToken: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('Stage Progression & Gamification Integration Tests', () => {
  const authToken = signAccessToken({
    userId: 'user-prog-999',
    email: 'adventurer@algoquest.io',
    username: 'adventurer',
  });

  const mockUser = {
    id: 'user-prog-999',
    email: 'adventurer@algoquest.io',
    username: 'adventurer',
    xp: 100,
    gems: 100,
    hearts: 5,
    maxHearts: 5,
    streakCount: 2,
    longestStreak: 5,
    currentLeague: 'BRONZE',
    lastActiveDate: new Date(),
    updatedAt: new Date(),
  };

  const mockStage1 = {
    id: 1,
    sublevelId: 10,
    stageNumber: 1,
    stageType: 'THEORY',
    title: 'Complexity & Big-O Overview',
    sublevel: {
      id: 10,
      levelId: 1,
      orderIndex: 1,
      level: { id: 1, orderIndex: 1 },
    },
  };

  const mockStage6 = {
    id: 6,
    sublevelId: 10,
    stageNumber: 6,
    stageType: 'MEDIUM_PROBLEM',
    title: 'Two Pointer Medium Challenge',
    sublevel: {
      id: 10,
      levelId: 1,
      orderIndex: 1,
      level: { id: 1, orderIndex: 1 },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Stage Progression Rules', () => {
    it('should reject skipping stages (e.g. attempting Stage 6 when currentStage is 1)', async () => {
      (prisma.stage.findUnique as jest.Mock).mockResolvedValue(mockStage6);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue({
        id: 'prog-1',
        userId: 'user-prog-999',
        sublevelId: 10,
        currentStage: 1,
        isCompleted: false,
      });

      const res = await request(app)
        .post('/api/v1/stage/complete')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          sublevelId: 10,
          stageNumber: 6,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Cannot attempt Stage 6 without completing Stage 1 first');
    });

    it('should successfully complete Stage 1, award XP and advance to Stage 2', async () => {
      (prisma.stage.findUnique as jest.Mock).mockResolvedValue(mockStage1);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.userProgress.findUnique as jest.Mock).mockResolvedValue({
        id: 'prog-1',
        userId: 'user-prog-999',
        sublevelId: 10,
        currentStage: 1,
        isCompleted: false,
      });
      (prisma.userProgress.update as jest.Mock).mockResolvedValue({
        id: 'prog-1',
        currentStage: 2,
      });
      (prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        xp: 110,
      });

      const res = await request(app)
        .post('/api/v1/stage/complete')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          sublevelId: 10,
          stageNumber: 1,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.rewards.xpGained).toBe(10);
      expect(res.body.data.progress.nextStageNumber).toBe(2);
    });
  });

  describe('Hearts & Health System', () => {
    it('should deduct 1 heart on /heart/consume', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        hearts: 4,
      });
      (prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        hearts: 3,
      });

      const res = await request(app)
        .post('/api/v1/heart/consume')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.remainingHearts).toBe(3);
    });

    it('should refill hearts to 5 for 50 gems on /heart/refill', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        hearts: 1,
        gems: 100,
      });
      (prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        hearts: 5,
        gems: 50,
      });

      const res = await request(app)
        .post('/api/v1/heart/refill')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.hearts).toBe(5);
      expect(res.body.data.gems).toBe(50);
    });

    it('should reject heart refill if user does not have enough gems', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        hearts: 1,
        gems: 30, // less than 50
      });

      const res = await request(app)
        .post('/api/v1/heart/refill')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Insufficient gems');
    });
  });
});
