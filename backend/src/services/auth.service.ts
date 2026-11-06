import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

export class AuthService {
  async signup(data: { email: string; username: string; password: string; selectedLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' }) {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existing) {
      if (existing.email === data.email) {
        throw new Error('Email is already registered');
      }
      throw new Error('Username is already taken');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const selectedLevel = data.selectedLevel || 'BEGINNER';

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash,
        selectedLevel,
        xp: 0,
        gems: 100,
        hearts: 5,
        maxHearts: 5,
        streakCount: 0,
        longestStreak: 0,
        currentLeague: 'BRONZE',
      },
    });

    // Auto-create initial progress if beginner
    if (selectedLevel === 'BEGINNER') {
      const firstSublevel = await prisma.sublevel.findFirst({
        orderBy: { id: 'asc' },
      });
      if (firstSublevel) {
        await prisma.userProgress.create({
          data: {
            userId: user.id,
            sublevelId: firstSublevel.id,
            currentStage: 1,
            isCompleted: false,
          },
        });
      }
    }

    const payload = { userId: user.id, email: user.email, username: user.username };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        xp: user.xp,
        gems: user.gems,
        hearts: user.hearts,
        streakCount: user.streakCount,
        selectedLevel: user.selectedLevel,
        currentLeague: user.currentLeague,
        requiresPlacementQuiz: selectedLevel !== 'BEGINNER',
      },
      accessToken,
      refreshToken,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const payload = { userId: user.id, email: user.email, username: user.username };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        xp: user.xp,
        gems: user.gems,
        hearts: user.hearts,
        streakCount: user.streakCount,
        selectedLevel: user.selectedLevel,
        currentLeague: user.currentLeague,
      },
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const payload = { userId: user.id, email: user.email, username: user.username };
    const newAccessToken = signAccessToken(payload);
    return { accessToken: newAccessToken };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        progress: {
          include: {
            sublevel: {
              include: { level: true },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}

export const authService = new AuthService();

