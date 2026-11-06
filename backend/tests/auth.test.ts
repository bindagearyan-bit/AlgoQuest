import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/prisma';

describe('Auth Endpoints Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /api/v1/auth/signup should validate request body', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('POST /api/v1/auth/login should reject empty credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: '' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/v1/auth/me should reject request without token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Missing or invalid Bearer token');
  });

  it('POST /api/v1/auth/logout should return success', async () => {
    const res = await request(app)
      .post('/api/v1/auth/logout');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

