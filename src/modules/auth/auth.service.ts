import bcrypt from 'bcryptjs';
import { prisma } from '../../config/database';
import { redisSet, redisExists, redisDel } from '../../config/redis';
import { generateTokenPair, verifyRefreshToken } from '../../utils/jwt';
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} from '../../utils/errors';
import { SignupInput, LoginInput } from './auth.validation';
import { OAuthProvider } from '@prisma/client';

const BCRYPT_ROUNDS = 12;
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60; // 7 days in seconds

const sanitizeUser = (user: {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  xp: number;
  gems: number;
  hearts: number;
  streakCount: number;
  league: string;
  createdAt: Date;
}) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  xp: user.xp,
  gems: user.gems,
  hearts: user.hearts,
  streakCount: user.streakCount,
  league: user.league,
  createdAt: user.createdAt,
});

export class AuthService {
  async signup(input: SignupInput) {
    const { name, email, password } = input;

    // Check for existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictError('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        oauthProvider: OAuthProvider.LOCAL,
        streak: { create: {} },
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        xp: true,
        gems: true,
        hearts: true,
        streakCount: true,
        league: true,
        createdAt: true,
      },
    });

    const tokens = generateTokenPair(user.id, user.email);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return { user: sanitizeUser(user), tokens };
  }

  async login(input: LoginInput) {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        oauthProvider: true,
        avatar: true,
        xp: true,
        gems: true,
        hearts: true,
        streakCount: true,
        league: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.oauthProvider !== OAuthProvider.LOCAL || !user.passwordHash) {
      throw new UnauthorizedError(
        `This account uses ${user.oauthProvider.toLowerCase()} authentication. Please sign in with ${user.oauthProvider.toLowerCase()}.`
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Update lastActive
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() },
    });

    const tokens = generateTokenPair(user.id, user.email);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, tokens };
  }

  async refreshToken(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    // Check if token is blacklisted
    const isBlacklisted = await redisExists(`blacklist:${refreshToken}`);
    if (isBlacklisted) {
      throw new UnauthorizedError('Token has been revoked');
    }

    // Check if refresh token exists in store
    const storedToken = await this.getStoredRefreshToken(payload.userId);
    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Rotate tokens
    await this.blacklistRefreshToken(refreshToken);
    const tokens = generateTokenPair(user.id, user.email);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken: string) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      await this.blacklistRefreshToken(refreshToken);
      await redisDel(`refresh:${payload.userId}`);
    } catch {
      // Even if token is invalid, logout succeeds
    }
  }

  async handleOAuthCallback(
    provider: OAuthProvider,
    oauthId: string,
    email: string,
    name: string,
    avatar?: string
  ) {
    let user = await prisma.user.findFirst({
      where: { OR: [{ oauthId, oauthProvider: provider }, { email }] },
      select: {
        id: true, name: true, email: true, avatar: true,
        xp: true, gems: true, hearts: true, streakCount: true,
        league: true, createdAt: true,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          oauthProvider: provider,
          oauthId,
          avatar,
          streak: { create: {} },
        },
        select: {
          id: true, name: true, email: true, avatar: true,
          xp: true, gems: true, hearts: true, streakCount: true,
          league: true, createdAt: true,
        },
      });
    } else {
      // Update OAuth info if logging in via OAuth on existing account
      await prisma.user.update({
        where: { id: user.id },
        data: { oauthId, oauthProvider: provider, lastActive: new Date() },
      });
    }

    const tokens = generateTokenPair(user.id, user.email);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return { user: sanitizeUser(user), tokens };
  }

  private async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await redisSet(`refresh:${userId}`, refreshToken, REFRESH_TOKEN_TTL);
  }

  private async getStoredRefreshToken(userId: string): Promise<string | null> {
    const { redisGet } = await import('../../config/redis');
    return redisGet(`refresh:${userId}`);
  }

  private async blacklistRefreshToken(refreshToken: string): Promise<void> {
    await redisSet(`blacklist:${refreshToken}`, '1', REFRESH_TOKEN_TTL);
  }
}

export const authService = new AuthService();
