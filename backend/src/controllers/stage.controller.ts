import { Request, Response, NextFunction } from 'express';
import { stageService } from '../services/stage.service';
import { sendSuccess, sendError } from '../utils/response';

export class StageController {
  async completeStage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const { sublevelId, stageNumber } = req.body;
      if (!sublevelId || !stageNumber) {
        return sendError(res, 'sublevelId and stageNumber are required', 400);
      }

      const result = await stageService.completeStage(
        userId,
        parseInt(sublevelId, 10),
        parseInt(stageNumber, 10)
      );
      return sendSuccess(res, result, 200);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }
}

export const stageController = new StageController();

