import { Request, Response } from 'express';
import { arcadeService } from '../services/arcade.service';
import { sendSuccess, sendError } from '../utils/response';

export class ArcadeController {
  // GET /api/v1/arcade/escape-room/today
  async getTodayDungeon(req: Request, res: Response) {
    try {
      const userId = req.user?.userId || (req.query.userId as string) || undefined;
      const data = await arcadeService.getTodayDungeon(userId);
      return sendSuccess(res, data);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to fetch today’s dungeon.', 500);
    }
  }

  // GET /api/v1/arcade/escape-room/practice/:date
  async getPracticeDungeon(req: Request, res: Response) {
    try {
      const dateString = req.params.date;
      if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return sendError(res, 'Valid date string in YYYY-MM-DD format is required.', 400);
      }
      const data = await arcadeService.getPracticeDungeon(dateString);
      return sendSuccess(res, data);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to generate practice dungeon.', 500);
    }
  }

  // POST /api/v1/arcade/escape-room/submit
  async submitEscapeRun(req: Request, res: Response) {
    try {
      const userId = req.user?.userId || req.body.userId || 'user_default_aryan';
      const { timeElapsed, livesRemaining, roomsCleared, isPractice, dateString } = req.body;

      if (typeof timeElapsed !== 'number' || typeof livesRemaining !== 'number' || typeof roomsCleared !== 'number') {
        return sendError(res, 'timeElapsed, livesRemaining, and roomsCleared must be numbers.', 400);
      }

      const result = await arcadeService.submitEscapeRun({
        userId,
        timeElapsed,
        livesRemaining,
        roomsCleared,
        isPractice: !!isPractice,
        dateString,
      });

      return sendSuccess(res, result, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to record escape room run.', 500);
    }
  }

  // GET /api/v1/arcade/escape-room/leaderboard
  async getDailyLeaderboard(req: Request, res: Response) {
    try {
      const date = (req.query.date as string) || undefined;
      const flawlessOnly = req.query.flawless === 'true';
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;

      const leaderboard = await arcadeService.getDailyLeaderboard(date, flawlessOnly, limit);
      return sendSuccess(res, leaderboard);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to retrieve daily leaderboard.', 500);
    }
  }

  // GET /api/v1/arcade/escape-room/streak
  async getUserStreakInfo(req: Request, res: Response) {
    try {
      const userId = req.user?.userId || (req.query.userId as string) || 'user_default_aryan';
      const streakInfo = await arcadeService.getUserStreakInfo(userId);
      return sendSuccess(res, streakInfo);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to retrieve streak information.', 500);
    }
  }

  // GET /api/v1/arcade/escape-room/calendar
  async getUserCalendar(req: Request, res: Response) {
    try {
      const userId = req.user?.userId || (req.query.userId as string) || 'user_default_aryan';
      const now = new Date();
      const year = req.query.year ? parseInt(req.query.year as string, 10) : now.getUTCFullYear();
      const month = req.query.month ? parseInt(req.query.month as string, 10) : now.getUTCMonth() + 1;

      const calendar = await arcadeService.getUserCalendar(userId, year, month);
      return sendSuccess(res, calendar);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to retrieve escape calendar.', 500);
    }
  }
}

export const arcadeController = new ArcadeController();
