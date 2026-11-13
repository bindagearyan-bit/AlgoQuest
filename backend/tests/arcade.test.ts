import request from 'supertest';
import app from '../src/app';
import { signAccessToken } from '../src/utils/jwt';

describe('Arcade Memory Match Endpoints Integration Tests', () => {
  const dummyToken = signAccessToken({
    userId: 'test-user-id-123',
    email: 'test@algoquest.dev',
    username: 'PixelKnight',
  });

  it('GET /api/v1/arcade/memory-match/leaderboard should return 200 with an array', async () => {
    const res = await request(app).get('/api/v1/arcade/memory-match/leaderboard');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/v1/arcade/memory-match/complete should reject missing body fields', async () => {
    const res = await request(app)
      .post('/api/v1/arcade/memory-match/complete')
      .set('Authorization', `Bearer ${dummyToken}`)
      .send({ score: 'invalid' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/arcade/memory-match/complete should record session and award XP', async () => {
    const res = await request(app)
      .post('/api/v1/arcade/memory-match/complete')
      .set('Authorization', `Bearer ${dummyToken}`)
      .send({
        score: 750,
        timeElapsed: 45,
        moves: 11,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.session).toBeDefined();
    expect(res.body.data.session.score).toBe(750);
    expect(res.body.data.xpEarned).toBe(25); // < 60s victory bonus
    expect(res.body.data.isPerfectGame).toBe(true); // <= 12 moves
    expect(res.body.data.badge).toBeDefined();
    expect(res.body.data.badge.title).toBe('Memory Maestro');
  }, 15000);

  it('GET /api/v1/arcade/memory-match/stats should return personal bests', async () => {
    const res = await request(app)
      .get('/api/v1/arcade/memory-match/stats')
      .set('Authorization', `Bearer ${dummyToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.timesPlayed).toBeGreaterThanOrEqual(1);
    expect(res.body.data.bestScore).toBeGreaterThanOrEqual(750);
  });
});
