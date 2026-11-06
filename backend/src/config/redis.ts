import Redis from 'ioredis';
import { env } from './env';
import { logger } from '../utils/logger';

// In-memory fallback map if Redis is unavailable
const memoryFallback = new Map<string, { value: string; expiry?: number }>();

class FallbackRedis {
  private client: Redis | null = null;
  private isConnected = false;

  constructor() {
    try {
      this.client = new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: 1,
        retryStrategy: () => null, // don't infinitely retry if down
        lazyConnect: true,
      });

      this.client.connect().then(() => {
        this.isConnected = true;
        logger.info('Connected to Redis');
      }).catch(() => {
        this.isConnected = false;
        logger.warn('Redis unavailable, using memory fallback');
      });

      this.client.on('error', () => {
        this.isConnected = false;
      });
    } catch {
      this.isConnected = false;
    }
  }

  async get(key: string): Promise<string | null> {
    if (this.isConnected && this.client) {
      try {
        return await this.client.get(key);
      } catch {
        this.isConnected = false;
      }
    }
    const item = memoryFallback.get(key);
    if (!item) return null;
    if (item.expiry && item.expiry < Date.now()) {
      memoryFallback.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: string, mode?: string, duration?: number): Promise<'OK'> {
    if (this.isConnected && this.client) {
      try {
        if (mode === 'EX' && duration) {
          await this.client.set(key, value, 'EX', duration);
        } else {
          await this.client.set(key, value);
        }
        return 'OK';
      } catch {
        this.isConnected = false;
      }
    }
    const expiry = (mode === 'EX' && duration) ? Date.now() + duration * 1000 : undefined;
    memoryFallback.set(key, { value, expiry });
    return 'OK';
  }

  async del(key: string): Promise<number> {
    if (this.isConnected && this.client) {
      try {
        return await this.client.del(key);
      } catch {
        this.isConnected = false;
      }
    }
    const existed = memoryFallback.has(key);
    memoryFallback.delete(key);
    return existed ? 1 : 0;
  }
}

export const redis = new FallbackRedis();
export const redisClient = redis;
export default redis;

