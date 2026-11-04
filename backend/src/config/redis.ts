import Redis from 'ioredis';
import { env } from './env';

class RedisService {
  private client: Redis | null = null;
  private isConnected: boolean = false;

  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      try {
        this.client = new Redis(env.REDIS_URL, {
          lazyConnect: true,
          maxRetriesPerRequest: 1,
          retryStrategy(times) {
            if (times > 3) {
              return null; // stop retrying after 3 attempts
            }
            return Math.min(times * 100, 1000);
          },
        });

        this.client.on('connect', () => {
          this.isConnected = true;
          console.log('⚡ Connected to Redis successfully');
        });

        this.client.on('error', (err) => {
          this.isConnected = false;
          // Silent fallback in development if local Redis is absent
          if (process.env.NODE_ENV === 'development') {
            // log once without crashing app
          }
        });

        this.client.connect().catch(() => {
          // graceful handle if redis server is offline
        });
      } catch (err) {
        this.client = null;
      }
    }
  }

  public getClient(): Redis | null {
    return this.client;
  }

  public async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    if (!this.client || !this.isConnected) return;
    try {
      if (expireSeconds) {
        await this.client.set(key, value, 'EX', expireSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch {
      // silent fallback
    }
  }

  public async get(key: string): Promise<string | null> {
    if (!this.client || !this.isConnected) return null;
    try {
      return await this.client.get(key);
    } catch {
      return null;
    }
  }

  public async del(key: string): Promise<void> {
    if (!this.client || !this.isConnected) return;
    try {
      await this.client.del(key);
    } catch {
      // silent fallback
    }
  }

  public async isBlacklisted(token: string): Promise<boolean> {
    if (!this.client || !this.isConnected) return false;
    try {
      const result = await this.client.get(`blacklist:${token}`);
      return result !== null;
    } catch {
      return false;
    }
  }

  public async blacklistToken(token: string, expiresInSeconds: number): Promise<void> {
    if (!this.client || !this.isConnected) return;
    try {
      await this.client.set(`blacklist:${token}`, 'true', 'EX', expiresInSeconds);
    } catch {
      // silent fallback
    }
  }
}

export const redis = new RedisService();
export default redis;

