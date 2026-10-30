import { Response, NextFunction } from 'express';
import { gamificationService } from './gamification.service';
import { successResponse } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/authGuard';

export class GamificationController {
  async addXp(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const result = await gamificationService.addXp(userId, req.body);
      res.status(200).json(successResponse(result, 'XP added successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getStreak(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const streak = await gamificationService.getStreak(userId);
      res.status(200).json(successResponse(streak));
    } catch (error) {
      next(error);
    }
  }

  async updateStreak(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const result = await gamificationService.updateStreak(userId, req.body);
      res.status(200).json(successResponse(result, result.message));
    } catch (error) {
      next(error);
    }
  }
}

export const gamificationController = new GamificationController();
