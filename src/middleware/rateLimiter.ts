import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import { errorResponse } from '../utils/response';

export const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorResponse('Too many requests, please try again later'),
  handler: (_req, res, _next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: env.AUTH_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorResponse('Too many auth attempts, please try again in 15 minutes'),
  handler: (_req, res, _next, options) => {
    res.status(options.statusCode).json(options.message);
  },
  skipSuccessfulRequests: true,
});

export const strictRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorResponse('Rate limit exceeded'),
  handler: (_req, res, _next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});
