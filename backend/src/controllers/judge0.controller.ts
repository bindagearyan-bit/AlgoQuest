import { Request, Response, NextFunction } from 'express';
import { judge0Service } from '../services/judge0.service';
import { sendSuccess, sendError } from '../utils/response';

export class Judge0Controller {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const { problemId, language, sourceCode } = req.body;
      if (!problemId || !language || !sourceCode) {
        return sendError(res, 'problemId, language, and sourceCode are required', 400);
      }

      const result = await judge0Service.executeCode(
        userId,
        parseInt(problemId, 10),
        language,
        sourceCode
      );

      return sendSuccess(res, result, 200);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }
}

export const judge0Controller = new Judge0Controller();

