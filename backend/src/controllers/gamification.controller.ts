import { Request, Response, NextFunction } from 'express';
import { gamificationService } from '../services/gamification.service';
import { sendSuccess, sendError } from '../utils/response';

export class GamificationController {
  async consumeHeart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const result = await gamificationService.consumeHeart(userId);
      return sendSuccess(res, result, 200);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }

  async refillHearts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const result = await gamificationService.refillHearts(userId);
      return sendSuccess(res, result, 200);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }

  async getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const league = (req.query.league as string) || 'BRONZE';
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;

      const leaderboard = await gamificationService.getLeaderboard(league, limit);
      return sendSuccess(res, leaderboard, 200);
    } catch (err: any) {
      return sendError(res, err.message, 500);
    }
  }

  async getBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const badges = await gamificationService.getBadges(userId);
      return sendSuccess(res, badges, 200);
    } catch (err: any) {
      return sendError(res, err.message, 500);
    }
  }
}

export const gamificationController = new GamificationController();

