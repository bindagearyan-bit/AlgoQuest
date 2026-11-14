import request from 'supertest';
import app from '../src/app';
import { signAccessToken } from '../src/utils/jwt';

describe('Daily Algorithm Escape Room Endpoints Integration Tests', () => {
  const dummyToken = signAccessToken({
    userId: 'test-escape-user-999',
    email: 'escapist@algoquest.dev',
    username: 'DungeonMaster',
  });

  it('GET /api/v1/arcade/escape-room/today should return today’s 10-room dungeon', async () => {
    const res = await request(app)
      .get('/api/v1/arcade/escape-room/today')
      .set('Authorization', `Bearer ${dummyToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.dungeon).toBeDefined();
    expect(res.body.data.dungeon.rooms).toHaveLength(10);
    expect(res.body.data.expiresInSeconds).toBeGreaterThan(0);
    expect(res.body.data.dungeon.rooms[0].visualType).toBe('ARRAY_TILES');
    expect(res.body.data.dungeon.rooms[4].isCheckpoint).toBe(true);
  });

  it('POST /api/v1/arcade/escape-room/submit should reject invalid request body', async () => {
    const res = await request(app)
      .post('/api/v1/arcade/escape-room/submit')
      .set('Authorization', `Bearer ${dummyToken}`)
      .send({ timeElapsed: 'invalid' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/arcade/escape-room/submit should record scored victory run and award XP + badge', async () => {
    const res = await request(app)
      .post('/api/v1/arcade/escape-room/submit')
      .set('Authorization', `Bearer ${dummyToken}`)
      .send({
        timeElapsed: 75,
        livesRemaining: 5,
        roomsCleared: 10,
        isPractice: false,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.isVictory).toBe(true);
    expect(res.body.data.isFlawless).toBe(true);
    expect(res.body.data.xpBreakdown.totalXpEarned).toBeGreaterThan(200); // 50 base + (180-75)*2 + 150 flawless + 75 speedrunner
    expect(res.body.data.dailyBadge).toBeDefined();
    expect(res.body.data.dailyBadge.title).toContain('Escapist of');
    expect(res.body.data.streak.current).toBeGreaterThanOrEqual(1);
  }, 15000);

  it('GET /api/v1/arcade/escape-room/leaderboard should return ranked leaderboard', async () => {
    const res = await request(app).get('/api/v1/arcade/escape-room/leaderboard');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/v1/arcade/escape-room/streak should return user streak and next milestone', async () => {
    const res = await request(app)
      .get('/api/v1/arcade/escape-room/streak')
      .set('Authorization', `Bearer ${dummyToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.currentStreak).toBeDefined();
    expect(res.body.data.nextMilestone).toBeDefined();
  });

  it('GET /api/v1/arcade/escape-room/practice/:date should generate past date dungeon', async () => {
    const res = await request(app).get('/api/v1/arcade/escape-room/practice/2026-11-01');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.isPractice).toBe(true);
    expect(res.body.data.dungeon.rooms).toHaveLength(10);
  });

  it('GET /api/v1/arcade/escape-room/calendar should return monthly grid data', async () => {
    const res = await request(app)
      .get('/api/v1/arcade/escape-room/calendar?year=2026&month=11')
      .set('Authorization', `Bearer ${dummyToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.days.length).toBe(30);
  });
});
