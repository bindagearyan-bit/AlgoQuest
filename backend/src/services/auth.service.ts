import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { redisClient } from '../config/redis';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../middlewares/errorHandler';
import { UserService } from './user.service';
import { SkillLevel } from '@prisma/client';

export interface SignupDto {
  email: string;
  username: string;
  password: string;
  selectedLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

export interface LoginDto {
  email: string;
  password: string;
}

export class AuthService {
  static async signup(dto: SignupDto) {
    const existingEmail = await prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existingEmail) {
      throw new AppError('An account with this email already exists', 409);
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existingUsername) {
      throw new AppError('Username is already taken', 409);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const selectedLevel: SkillLevel = (dto.selectedLevel as SkillLevel) || SkillLevel.BEGINNER;

    const user = await prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        username: dto.username,
        passwordHash,
        selectedLevel,
        xp: 0,
        gems: 100,
        hearts: 5,
        maxHearts: 5,
        streakCount: 0,
        longestStreak: 0,
      },
    });

    // If BEGINNER: Auto-initialize UserProgress row pointing to Level 1, Sublevel 1, Stage 1
    if (selectedLevel === SkillLevel.BEGINNER) {
      const firstSublevel = await prisma.sublevel.findFirst({
        where: { level: { orderIndex: 1 }, orderIndex: 1 },
      });

      if (firstSublevel) {
        await prisma.userProgress.create({
          data: {
            userId: user.id,
            sublevelId: firstSublevel.id,
            currentStage: 1,
            isCompleted: false,
            confidenceScore: 100,
          },
        });
      }
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      selectedLevel: user.selectedLevel,
    };

    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);

    const fullProfile = await UserService.getUserProfile(user.id);

    return {
      user: fullProfile,
      accessToken,
      refreshToken,
    };
  }

  static async login(dto: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new AppError('Invalid email or password credentials', 401);
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid email or password credentials', 401);
    }

    // Update activity and streak on login
    await UserService.updateActivityAndStreak(user.id);

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      selectedLevel: user.selectedLevel,
    };

    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);

    const fullProfile = await UserService.getUserProfile(user.id);

    return {
      user: fullProfile,
      accessToken,
      refreshToken,
    };
  }

  static async refresh(refreshToken: string) {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        username: user.username,
        selectedLevel: user.selectedLevel,
      };

      const newAccessToken = signAccessToken(tokenPayload);
      return { accessToken: newAccessToken };
    } catch (err: any) {
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }

  static async logout(token: string) {
    // 15 minutes TTL blacklist
    await redisClient.blacklistToken(token, 15 * 60);
    return { message: 'Successfully logged out and session revoked' };
  }

  static async getMe(userId: string) {
    return await UserService.getUserProfile(userId);
  }
}
