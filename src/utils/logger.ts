import winston from 'winston';
import { env } from '../config/env';

const { combine, timestamp, colorize, printf, json, errors } = winston.format;

const devFormat = combine(
  errors({ stack: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  colorize({ all: true }),
  printf(({ level, message, timestamp, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] ${level}: ${stack || message}${metaStr}`;
  })
);

const prodFormat = combine(
  errors({ stack: true }),
  timestamp(),
  json()
);

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: env.isProduction ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console(),
    ...(env.isProduction
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
  exceptionHandlers: [new winston.transports.Console()],
  rejectionHandlers: [new winston.transports.Console()],
});
