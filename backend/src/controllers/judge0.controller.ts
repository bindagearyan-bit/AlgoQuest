import { Request, Response, NextFunction } from 'express';
import { judge0Service } from '../services/judge0.service';
import { sendSuccess, sendError } from '../utils/response';

export class Judge0Controller {
  getLanguages(req: Request, res: Response) {
    const languages = judge0Service.getLanguages();
    return sendSuccess(res, { languages }, 200);
  }

  async run(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const { code, languageId, problemId, stdin } = req.body;
      if (!code || languageId === undefined) {
        return sendError(res, 'code and languageId are required', 400);
      }

      const result = await judge0Service.runCode({
        userId,
        code,
        languageId,
        problemId: problemId ? parseInt(String(problemId), 10) : undefined,
        stdin,
      });

      return sendSuccess(res, result, 200);
    } catch (err: any) {
      const status = err.statusCode || 400;
      return sendError(res, err.message, status);
    }
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const { code, sourceCode, languageId, language, problemId, stageId, sublevelId, stageNumber } = req.body;
      const finalCode = code || sourceCode;
      const finalLang = languageId !== undefined ? languageId : language;

      if (!finalCode || finalLang === undefined) {
        return sendError(res, 'code and languageId are required', 400);
      }

      const result = await judge0Service.submitCode({
        userId,
        code: finalCode,
        languageId: finalLang,
        problemId: problemId ? parseInt(String(problemId), 10) : undefined,
        sublevelId: sublevelId ? parseInt(String(sublevelId), 10) : undefined,
        stageNumber: stageNumber ? parseInt(String(stageNumber), 10) : undefined,
      });

      return sendSuccess(res, result, 200);
    } catch (err: any) {
      const status = err.statusCode || 400;
      return sendError(res, err.message, status);
    }
  }

  async getMySubmissions(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendError(res, 'Unauthorized', 401);

      const submissions = await judge0Service.getUserSubmissions(userId);
      return sendSuccess(res, { submissions }, 200);
    } catch (err: any) {
      return sendError(res, err.message, 500);
    }
  }

  async getSubmissionById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const sub = await judge0Service.getSubmissionById(id);
      if (!sub) return sendError(res, 'Submission not found', 404);
      return sendSuccess(res, { submission: sub }, 200);
    } catch (err: any) {
      return sendError(res, err.message, 500);
    }
  }
}

export const judge0Controller = new Judge0Controller();
