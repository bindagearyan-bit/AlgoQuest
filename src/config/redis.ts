import { createClient, RedisClientType } from 'redis';
import { env } from './env';
import { logger } from '../utils/logger';

let redisClient: RedisClientType;

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    redisClient = createClient({
      url: env.REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis: Max reconnection attempts reached');
            return new Error('Max reconnection attempts reached');
          }
          return Math.min(retries * 100, 3000);
        },
      },
    }) as RedisClientType;

    redisClient.on('error', (err) => logger.error('Redis client error:', err));
    redisClient.on('connect', () => logger.info('Redis client connected'));
    redisClient.on('reconnecting', () => logger.warn('Redis client reconnecting...'));
    redisClient.on('ready', () => logger.info('✅ Redis client ready'));
  }
  return redisClient;
};

export const connectRedis = async (): Promise<void> => {
  try {
    const client = getRedisClient();
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    throw error;
  }
};

export const disconnectRedis = async (): Promise<void> => {
  const client = getRedisClient();
  if (client.isOpen) {
    await client.disconnect();
    logger.info('Redis disconnected');
  }
};

// Helper methods
export const redisSet = async (key: string, value: string, ttlSeconds?: number): Promise<void> => {
  const client = getRedisClient();
  if (ttlSeconds) {
    await client.setEx(key, ttlSeconds, value);
  } else {
    await client.set(key, value);
  }
};

export const redisGet = async (key: string): Promise<string | null> => {
  const client = getRedisClient();
  return client.get(key);
};

export const redisDel = async (key: string): Promise<void> => {
  const client = getRedisClient();
  await client.del(key);
};

export const redisExists = async (key: string): Promise<boolean> => {
  const client = getRedisClient();
  const result = await client.exists(key);
  return result === 1;
};
