import { Request, Response, NextFunction } from 'express';
import redis from '../config/redis';
import { sendError } from '../utils/response';

export const rateLimiter = (maxRequests = 100, windowSeconds = 60) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      const key = `ratelimit:${ip}`;
      const current = await redis.get(key);

      if (current && parseInt(current, 10) >= maxRequests) {
        return sendError(res, 'Too many requests. Please slow down.', 429);
      }

      if (current) {
        await redis.set(key, String(parseInt(current, 10) + 1), 'EX', windowSeconds);
      } else {
        await redis.set(key, '1', 'EX', windowSeconds);
      }

      return next();
    } catch {
      return next();
    }
  };
};

