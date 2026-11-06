import request from 'supertest';
import app from '../src/app';
import { signAccessToken } from '../src/utils/jwt';

describe('Stage & Progression Endpoints Integration Tests', () => {
  const dummyToken = signAccessToken({
    userId: 'test-user-id-123',
    email: 'test@algoquest.dev',
    username: 'PixelKnight',
  });

  it('GET /api/v1/roadmap/levels should return levels list', async () => {
    const res = await request(app)
      .get('/api/v1/roadmap/levels');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/v1/stage/complete should reject unauthenticated request', async () => {
    const res = await request(app)
      .post('/api/v1/stage/complete')
      .send({ sublevelId: 1, stageNumber: 1 });

    expect(res.status).toBe(401);
  });

  it('POST /api/v1/stage/complete should validate required body parameters', async () => {
    const res = await request(app)
      .post('/api/v1/stage/complete')
      .set('Authorization', `Bearer ${dummyToken}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/v1/roadmap/sublevel/abc should return 400 for invalid ID', async () => {
    const res = await request(app)
      .get('/api/v1/roadmap/sublevel/invalid-id');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

