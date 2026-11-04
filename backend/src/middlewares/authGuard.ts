import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, JwtPayload } from '../utils/jwt';
import { redisClient } from '../config/redis';
import { sendError } from '../utils/response';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      token?: string;
    }
  }
}

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, 'Authentication token missing or invalid format', 401);
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      sendError(res, 'Bearer token is missing', 401);
      return;
    }

    // Check blacklist in Redis
    const isBlacklisted = await redisClient.isTokenBlacklisted(token);
    if (isBlacklisted) {
      sendError(res, 'Token has been revoked or session expired', 401);
      return;
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    req.token = token;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      sendError(res, 'Token has expired', 401);
      return;
    }
    sendError(res, 'Invalid token authorization', 401);
  }
};
