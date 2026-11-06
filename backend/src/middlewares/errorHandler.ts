import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message, { stack: err.stack, path: req.path });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return sendError(res, message, statusCode, err.errors || []);
};

