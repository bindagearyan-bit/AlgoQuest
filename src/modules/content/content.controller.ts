import { Response, NextFunction } from 'express';
import { contentService } from './content.service';
import { successResponse } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/authGuard';

export class ContentController {
  async getLevels(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      const levels = await contentService.getLevels(userId);
      res.status(200).json(successResponse(levels));
    } catch (error) {
      next(error);
    }
  }

  async getSublevel(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const userId = req.user?.userId;
      const sublevel = await contentService.getSublevel(id, userId);
      res.status(200).json(successResponse(sublevel));
    } catch (error) {
      next(error);
    }
  }

  async getProblems(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const sublevelId = String(req.params.sublevelId);
      const problems = await contentService.getProblems(sublevelId);
      res.status(200).json(successResponse(problems));
    } catch (error) {
      next(error);
    }
  }

  async getProblem(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const problem = await contentService.getProblem(id);
      res.status(200).json(successResponse(problem));
    } catch (error) {
      next(error);
    }
  }
}

export const contentController = new ContentController();
