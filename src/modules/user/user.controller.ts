import { Response, NextFunction } from 'express';
import { userService } from './user.service';
import { successResponse } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/authGuard';

export class UserController {
  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const profile = await userService.getProfile(userId);
      res.status(200).json(successResponse(profile));
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const updated = await userService.updateProfile(userId, req.body);
      res.status(200).json(successResponse(updated, 'Profile updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getUserProgress(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const progress = await userService.getUserProgress(userId);
      res.status(200).json(successResponse(progress));
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
