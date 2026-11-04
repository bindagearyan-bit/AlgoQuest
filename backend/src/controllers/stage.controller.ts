import { Request, Response, NextFunction } from 'express';
import { StageService } from '../services/stage.service';
import { sendSuccess } from '../utils/response';

export class StageController {
  static async completeStage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { sublevelId, stageNumber } = req.body;
      const result = await StageService.completeStage(userId, Number(sublevelId), Number(stageNumber));
      sendSuccess(res, result, 'Stage completed successfully');
    } catch (error) {
      next(error);
    }
  }
}
