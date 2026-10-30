import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { errorResponse } from '../utils/response';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Known operational errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json(errorResponse(err.message, err.errors));
    return;
  }

  // Zod validation errors (fallback)
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({ field: e.path.join('.'), message: e.message }));
    res.status(400).json(errorResponse('Validation failed', errors));
    return;
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const fields = (err.meta?.target as string[]) || [];
      res.status(409).json(errorResponse(`${fields.join(', ')} already exists`));
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json(errorResponse('Record not found'));
      return;
    }
    if (err.code === 'P2003') {
      res.status(400).json(errorResponse('Related record not found'));
      return;
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json(errorResponse('Invalid data provided'));
    return;
  }

  // JWT errors (already handled in authGuard, but fallback)
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json(errorResponse('Invalid token'));
    return;
  }
  if (err.name === 'TokenExpiredError') {
    res.status(401).json(errorResponse('Token expired'));
    return;
  }

  // Generic server error
  const message =
    process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;

  res.status(500).json(errorResponse(message));
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json(errorResponse(`Route ${req.method} ${req.path} not found`));
};
