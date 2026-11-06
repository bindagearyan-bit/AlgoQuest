import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/response';

export class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.signup(req.body);
      return sendSuccess(res, result, 201);
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      return sendSuccess(res, result, 200);
    } catch (err: any) {
      return sendError(res, err.message, 401);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return sendError(res, 'Refresh token required', 400);
      }
      const result = await authService.refresh(refreshToken);
      return sendSuccess(res, result, 200);
    } catch (err: any) {
      return sendError(res, 'Invalid refresh token', 401);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    // In stateless JWT or cookie clearance
    return sendSuccess(res, { message: 'Logged out successfully' }, 200);
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, 'Unauthorized', 401);
      }
      const user = await authService.getMe(req.user.userId);
      return sendSuccess(res, user, 200);
    } catch (err: any) {
      return sendError(res, err.message, 404);
    }
  }
}

export const authController = new AuthController();

