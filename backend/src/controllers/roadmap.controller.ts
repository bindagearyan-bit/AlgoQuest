import { Request, Response, NextFunction } from 'express';
import { roadmapService } from '../services/roadmap.service';
import { sendSuccess, sendError } from '../utils/response';

export class RoadmapController {
  async getLevels(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const levels = await roadmapService.getLevels(userId);
      return sendSuccess(res, levels, 200);
    } catch (err: any) {
      return sendError(res, err.message, 500);
    }
  }

  async getSublevel(req: Request, res: Response, next: NextFunction) {
    try {
      const sublevelId = parseInt(req.params.id, 10);
      const userId = req.user?.userId;
      if (isNaN(sublevelId)) return sendError(res, 'Invalid sublevel ID', 400);

      const data = await roadmapService.getSublevel(sublevelId, userId);
      return sendSuccess(res, data, 200);
    } catch (err: any) {
      return sendError(res, err.message, 404);
    }
  }

  async getStage(req: Request, res: Response, next: NextFunction) {
    try {
      const sublevelId = parseInt(req.params.id, 10);
      const stageNumber = parseInt(req.params.n, 10);
      const userId = req.user?.userId;

      if (isNaN(sublevelId) || isNaN(stageNumber)) {
        return sendError(res, 'Invalid sublevel or stage number', 400);
      }

      const stage = await roadmapService.getStage(sublevelId, stageNumber, userId);
      return sendSuccess(res, stage, 200);
    } catch (err: any) {
      return sendError(res, err.message, 404);
    }
  }
}

export const roadmapController = new RoadmapController();

