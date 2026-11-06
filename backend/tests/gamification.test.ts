import request from 'supertest';
import app from '../src/app';
import { signAccessToken } from '../src/utils/jwt';

describe('Gamification Endpoints Integration Tests', () => {
  const dummyToken = signAccessToken({
    userId: 'test-user-id-123',
    email: 'test@algoquest.dev',
    username: 'PixelKnight',
  });

  it('GET /api/v1/gamification/leaderboard should return ranked leaderboard', async () => {
    const res = await request(app)
      .get('/api/v1/gamification/leaderboard?league=BRONZE');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/v1/gamification/heart/consume should require authentication', async () => {
    const res = await request(app)
      .post('/api/v1/gamification/heart/consume');

    expect(res.status).toBe(401);
  });

  it('POST /api/v1/gamification/heart/refill should require authentication', async () => {
    const res = await request(app)
      .post('/api/v1/gamification/heart/refill');

    expect(res.status).toBe(401);
  });

  it('GET /api/v1/onboarding/placement-quiz should return 10 placement questions without answers', async () => {
    const res = await request(app)
      .get('/api/v1/onboarding/placement-quiz');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.questions).toHaveLength(10);
    expect(res.body.data.questions[0].correctAnswer).toBeUndefined();
  });
});

