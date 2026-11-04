import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { prisma } from '../config/prisma';
import { sendSuccess } from '../utils/response';

export class UserController {
  static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const profile = await UserService.getUserProfile(userId);
      sendSuccess(res, profile, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { avatar, username } = req.body;

      const updated = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(avatar ? { avatar } : {}),
          ...(username ? { username } : {}),
        },
        select: {
          id: true,
          email: true,
          username: true,
          avatar: true,
          xp: true,
          gems: true,
          hearts: true,
          currentLeague: true,
          streakCount: true,
        },
      });

      sendSuccess(res, updated, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }
}
