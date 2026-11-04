import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/prisma';
import bcrypt from 'bcryptjs';

jest.mock('../src/config/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    sublevel: {
      findFirst: jest.fn(),
    },
    userProgress: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
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

describe('Auth Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: 'user-uuid-1234',
    email: 'test@algoquest.io',
    username: 'pixelknight',
    passwordHash: '',
    xp: 0,
    gems: 100,
    hearts: 5,
    maxHearts: 5,
    streakCount: 0,
    longestStreak: 0,
    selectedLevel: 'BEGINNER',
    currentLeague: 'BRONZE',
    updatedAt: new Date(),
    progress: [],
    achievements: [],
  };

  beforeAll(async () => {
    mockUser.passwordHash = await bcrypt.hash('secret123', 10);
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should fail if email is invalid', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'invalid-email',
          username: 'pixelknight',
          password: 'secretPassword123',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should successfully register a BEGINNER user and return access & refresh tokens', async () => {
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // check email
        .mockResolvedValueOnce(null) // check username
        .mockResolvedValueOnce(mockUser); // getUserProfile

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (prisma.sublevel.findFirst as jest.Mock).mockResolvedValue({ id: 1 });
      (prisma.userProgress.create as jest.Mock).mockResolvedValue({ id: 'prog-1' });

      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@algoquest.io',
          username: 'pixelknight',
          password: 'secretPassword123',
          selectedLevel: 'BEGINNER',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.body.data).toHaveProperty('refreshToken');
      expect(res.body.data.user.email).toBe('test@algoquest.io');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should reject invalid password', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@algoquest.io',
          password: 'wrongPassword',
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should authenticate user and return tokens', async () => {
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(mockUser) // findByEmail
        .mockResolvedValueOnce(mockUser) // updateActivityAndStreak find
        .mockResolvedValueOnce(mockUser); // getUserProfile

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@algoquest.io',
          password: 'secret123',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.body.data).toHaveProperty('refreshToken');
    });
  });

  describe('Protected Routes & Logout', () => {
    it('should return 401 when accessing /me without token', async () => {
      const res = await request(app).get('/api/v1/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return user profile when valid bearer token is provided', async () => {
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValueOnce(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@algoquest.io',
          password: 'secret123',
        });

      const token = loginRes.body.data.accessToken;

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const meRes = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(meRes.status).toBe(200);
      expect(meRes.body.success).toBe(true);
      expect(meRes.body.data.username).toBe('pixelknight');
    });
  });
});
