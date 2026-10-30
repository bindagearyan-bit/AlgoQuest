import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { UnauthorizedError } from './errors';

export interface TokenPayload {
  userId: string;
  email: string;
  type: 'access' | 'refresh';
}

export const generateAccessToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email, type: 'access' } as TokenPayload,
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as SignOptions
  );
};

export const generateRefreshToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email, type: 'refresh' } as TokenPayload,
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as SignOptions
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
    if (payload.type !== 'access') {
      throw new UnauthorizedError('Invalid token type');
    }
    return payload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Access token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid access token');
    }
    throw error;
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
    if (payload.type !== 'refresh') {
      throw new UnauthorizedError('Invalid token type');
    }
    return payload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Refresh token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid refresh token');
    }
    throw error;
  }
};

export const generateTokenPair = (userId: string, email: string) => ({
  accessToken: generateAccessToken(userId, email),
  refreshToken: generateRefreshToken(userId, email),
});
