import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';
import { sendError } from '../utils/response';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication required. Missing or invalid Bearer token.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return sendError(res, 'Invalid or expired access token.', 401);
  }
};

