import { Request, Response, NextFunction } from 'express';
import { GamificationService } from '../services/gamification.service';
import { sendSuccess } from '../utils/response';

export class GamificationController {
  static async consumeHeart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const result = await GamificationService.consumeHeart(userId);
      sendSuccess(res, result, 'Heart consumed');
    } catch (error) {
      next(error);
    }
  }

  static async refillHearts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const result = await GamificationService.refillHearts(userId);
      sendSuccess(res, result, 'Hearts refilled successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getLeaderboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const league = req.query.league as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;
      const leaderboard = await GamificationService.getLeaderboard(league, limit);
      sendSuccess(res, leaderboard, 'Leaderboard fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getBadges(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const badges = await GamificationService.getUserBadges(userId);
      sendSuccess(res, badges, 'User badges fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
