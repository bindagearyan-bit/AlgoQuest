import { Request, Response, NextFunction } from 'express';
import { RoadmapService } from '../services/roadmap.service';
import { sendSuccess } from '../utils/response';

export class RoadmapController {
  static async getLevels(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const levels = await RoadmapService.getLevelsTree(userId);
      sendSuccess(res, levels, 'Roadmap levels fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getSublevel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const sublevelId = parseInt(req.params.id, 10);
      const detail = await RoadmapService.getSublevelDetail(sublevelId, userId);
      sendSuccess(res, detail, 'Sublevel details fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getStage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const sublevelId = parseInt(req.params.id, 10);
      const stageNumber = parseInt(req.params.stageNumber, 10);
      const stage = await RoadmapService.getStageContent(sublevelId, stageNumber, userId);
      sendSuccess(res, stage, 'Stage content fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
