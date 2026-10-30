// Mock external dependencies before any imports
jest.mock('../../config/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    streak: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
  connectDatabase: jest.fn(),
}));

jest.mock('../../config/redis', () => ({
  connectRedis: jest.fn(),
  disconnectRedis: jest.fn(),
  redisGet: jest.fn(),
  redisSet: jest.fn(),
  redisDel: jest.fn(),
  redisExists: jest.fn(),
  getRedisClient: jest.fn(),
}));

import request from 'supertest';
import createApp from '../../app';
import { prisma } from '../../config/database';
import { redisSet, redisExists } from '../../config/redis';
import bcrypt from 'bcryptjs';

const app = createApp();

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockRedisSet = redisSet as jest.MockedFunction<typeof redisSet>;
const mockRedisExists = redisExists as jest.MockedFunction<typeof redisExists>;

describe('Auth Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRedisSet.mockResolvedValue(undefined);
    mockRedisExists.mockResolvedValue(false);
  });

  // ==================
  // POST /api/auth/signup
  // ==================
  describe('POST /api/auth/signup', () => {
    const validPayload = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'Test@1234',
    };

    it('should create a new user and return tokens', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (mockPrisma.user.create as jest.Mock).mockResolvedValueOnce({
        id: 'user-uuid-1',
        name: validPayload.name,
        email: validPayload.email,
        avatar: null,
        xp: 0,
        gems: 0,
        hearts: 5,
        streakCount: 0,
        league: 'BRONZE',
        createdAt: new Date(),
      });

      const res = await request(app).post('/api/auth/signup').send(validPayload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('tokens');
      expect(res.body.data.tokens).toHaveProperty('accessToken');
      expect(res.body.data.tokens).toHaveProperty('refreshToken');
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data.user).not.toHaveProperty('passwordHash');
      expect(res.body.data.user.email).toBe(validPayload.email);
    });

    it('should return 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'test@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty('errors');
    });

    it('should return 400 for invalid email', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        name: 'Test',
        email: 'not-an-email',
        password: 'Test@1234',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for weak password', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        name: 'Test',
        email: 'test@example.com',
        password: 'weak',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return 409 if email already exists', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'existing-user',
        email: validPayload.email,
      });

      const res = await request(app).post('/api/auth/signup').send(validPayload);

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already exists');
    });
  });

  // ==================
  // POST /api/auth/login
  // ==================
  describe('POST /api/auth/login', () => {
    const validCredentials = {
      email: 'testuser@example.com',
      password: 'Test@1234',
    };

    it('should login successfully with valid credentials', async () => {
      const hashedPassword = await bcrypt.hash(validCredentials.password, 10);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user-uuid-1',
        name: 'Test User',
        email: validCredentials.email,
        passwordHash: hashedPassword,
        oauthProvider: 'LOCAL',
        avatar: null,
        xp: 0,
        gems: 0,
        hearts: 5,
        streakCount: 0,
        league: 'BRONZE',
        createdAt: new Date(),
      });

      (mockPrisma.user.update as jest.Mock).mockResolvedValueOnce({});

      const res = await request(app).post('/api/auth/login').send(validCredentials);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('tokens');
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data.user).not.toHaveProperty('passwordHash');
    });

    it('should return 401 for invalid password', async () => {
      const hashedPassword = await bcrypt.hash('correct_password', 10);

      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'user-uuid-1',
        email: validCredentials.email,
        passwordHash: hashedPassword,
        oauthProvider: 'LOCAL',
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ ...validCredentials, password: 'wrong_password' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 401 for non-existent user', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send(validCredentials);

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for missing email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'Test@1234' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // ==================
  // Health Check
  // ==================
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('healthy');
    });
  });

  // ==================
  // 404 Handler
  // ==================
  describe('Unknown routes', () => {
    it('should return 404 for undefined routes', async () => {
      const res = await request(app).get('/api/nonexistent');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
