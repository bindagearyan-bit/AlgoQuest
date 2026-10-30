import createApp from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';
import { connectRedis, disconnectRedis } from './config/redis';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Connect to Redis
    await connectRedis();

    const app = createApp();

    const server = app.listen(env.PORT, () => {
      logger.info(`
╔════════════════════════════════════╗
║        🚀 AlgoQuest API            ║
╠════════════════════════════════════╣
║  Environment: ${env.NODE_ENV.padEnd(20)}║
║  Port:        ${String(env.PORT).padEnd(20)}║
║  Docs:        /api/docs${' '.repeat(12)}║
╚════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} received — shutting down gracefully...`);
      server.close(async () => {
        await disconnectDatabase();
        await disconnectRedis();
        logger.info('Server shut down cleanly');
        process.exit(0);
      });

      // Force shutdown after 10s
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Promise Rejection:', reason);
    });

    process.on('uncaughtException', (err) => {
      logger.error('Uncaught Exception:', err);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
