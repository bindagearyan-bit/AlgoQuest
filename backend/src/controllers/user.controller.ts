import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { sendSuccess, sendError } from '../utils/response';

export class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);
      const profile = await userService.getProfile(userId);
      return sendSuccess(res, profile, 200);
    } catch (err: any) {
      return sendError(res, err.message, 404);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);
      const updated = await userService.updateProfile(userId, req.body);
      return sendSuccess(res, updated, 200);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }

  async getProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);
      const progress = await userService.getProgress(userId);
      return sendSuccess(res, progress, 200);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);
      const stats = await userService.getStats(userId);
      return sendSuccess(res, stats, 200);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }
}

export const userController = new UserController();

