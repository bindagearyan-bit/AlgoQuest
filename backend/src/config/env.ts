import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/algoquest'),
  DIRECT_URL: z.string().optional(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_ACCESS_SECRET: z.string().min(16).default('algoquest_jwt_super_secret_access_key_12345'),
  JWT_REFRESH_SECRET: z.string().min(16).default('algoquest_jwt_super_secret_refresh_key_12345'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  PORT: z.coerce.number().default(5000),
  FRONTEND_ORIGIN: z.string().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  JUDGE0_API_URL: z.string().default('https://judge0-ce.p.rapidapi.com'),
  JUDGE0_API_KEY: z.string().default('dummy_key'),
  JUDGE0_API_HOST: z.string().default('judge0-ce.p.rapidapi.com'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format());
  // in development/test fallback gracefully
}

export const env = parsed.success ? parsed.data : envSchema.parse({
  ...process.env,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/algoquest',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'algoquest_jwt_super_secret_access_key_12345',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'algoquest_jwt_super_secret_refresh_key_12345',
});

