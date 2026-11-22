import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

/**
 * Standard user claims payload embedded within access and refresh JWTs.
 */
export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
}

/**
 * Signs a short-lived access token for stateless API authentication.
 */
export const signAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRY as any,
  };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};

export const signRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRY as any,
  };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};

