import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const server = app.listen(env.PORT, () => {
  logger.info(`AlgoQuest Backend API running on http://localhost:${env.PORT}`);
  logger.info(`Environment: ${env.NODE_ENV}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});

