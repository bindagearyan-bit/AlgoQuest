import { Request, Response } from 'express';
import { arcadeService } from '../services/arcade.service';
import { sendSuccess, sendError } from '../utils/response';

export class ArcadeController {
  async completeMemoryMatch(req: Request, res: Response) {
    try {
      const userId = req.user?.userId || req.body.userId || 'user_default_aryan';
      const { score, timeElapsed, moves } = req.body;

      if (typeof score !== 'number' || typeof timeElapsed !== 'number' || typeof moves !== 'number') {
        return sendError(res, 'Invalid request body: score, timeElapsed, and moves are required numbers.', 400);
      }

      const result = await arcadeService.recordMemoryMatchSession({
        userId,
        score: Math.max(0, Math.floor(score)),
        timeElapsed: Math.max(0, Math.floor(timeElapsed)),
        moves: Math.max(0, Math.floor(moves)),
      });

      return sendSuccess(res, result, 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to record arcade session.', 500);
    }
  }

  async getLeaderboard(req: Request, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const gameType = (req.query.gameType as string) || 'MEMORY_MATCH_DS_ICONS';
      const leaderboard = await arcadeService.getLeaderboard(gameType, limit);
      return sendSuccess(res, leaderboard);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to retrieve arcade leaderboard.', 500);
    }
  }

  async getUserStats(req: Request, res: Response) {
    try {
      const userId = req.user?.userId || (req.query.userId as string) || 'user_default_aryan';
      const gameType = (req.query.gameType as string) || 'MEMORY_MATCH_DS_ICONS';
      const stats = await arcadeService.getUserStats(userId, gameType);
      return sendSuccess(res, stats);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to retrieve user arcade stats.', 500);
    }
  }
}

export const arcadeController = new ArcadeController();
