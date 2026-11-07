import { Request, Response } from 'express';
import { badgeService } from '../services/badge.service';
import { sendSuccess, sendError } from '../utils/response';

export class BadgeController {
  async getAllBadges(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      const badges = await badgeService.getAllBadges(userId);
      return sendSuccess(res, badges, 200);
    } catch (e: any) {
      return sendError(res, e.message || 'Failed to fetch badges', 500);
    }
  }

  async getEarnedBadges(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return sendError(res, 'Unauthorized', 401);
      }
      const badges = await badgeService.getEarnedBadges(userId);
      return sendSuccess(res, badges, 200);
    } catch (e: any) {
      return sendError(res, e.message || 'Failed to fetch earned badges', 500);
    }
  }

  async getSharePayload(req: Request, res: Response) {
    try {
      const badgeId = parseInt(req.params.id, 10);
      if (isNaN(badgeId)) {
        return sendError(res, 'Invalid badge ID', 400);
      }
      const userId = (req as any).user?.userId;
      const payload = await badgeService.getSharePayload(badgeId, userId);
      return sendSuccess(res, payload, 200);
    } catch (e: any) {
      return sendError(res, e.message || 'Failed to generate share payload', 404);
    }
  }
}

export const badgeController = new BadgeController();
