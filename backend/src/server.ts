import app from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';
import { redisClient } from './config/redis';
import { logger } from './utils/logger';

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`==================================================`);
  logger.info(`🚀 AlgoQuest Backend Engine running on port ${PORT}`);
  logger.info(`🌍 Environment: ${env.NODE_ENV}`);
  logger.info(`⚡ API base url: http://localhost:${PORT}/api/v1`);
  logger.info(`==================================================`);
});

// Graceful Shutdown
const handleShutdown = async (signal: string) => {
  logger.info(`${signal} received. Initiating graceful shutdown...`);

  server.close(async () => {
    logger.info('HTTP server closed.');

    try {
      await prisma.$disconnect();
      logger.info('Prisma disconnected.');
    } catch (e) {
      logger.error('Error disconnecting Prisma:', e);
    }

    try {
      await redisClient.disconnect();
      logger.info('Redis client disconnected.');
    } catch (e) {
      logger.error('Error disconnecting Redis:', e);
    }

    process.exit(0);
  });

  // Force exit after 10s if open connections remain
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default server;
