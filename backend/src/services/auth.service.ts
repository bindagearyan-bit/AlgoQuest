import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

// Resilient memory store when PostgreSQL server is offline locally
export const memoryUsers = new Map<string, any>();
export const memoryProgress = new Map<string, any[]>();

export class AuthService {
  async signup(data: { email: string; username: string; password: string; selectedLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' }) {
    let existing: any = null;
    let isDbAvailable = true;

    try {
      existing = await prisma.user.findFirst({
        where: {
          OR: [{ email: data.email }, { username: data.username }],
        },
      });
    } catch (e) {
      isDbAvailable = false;
      // Database offline -> fallback to in-memory store
      for (const u of memoryUsers.values()) {
        if (u.email === data.email || u.username === data.username) {
          existing = u;
          break;
        }
      }
    }

    if (existing) {
      if (existing.email === data.email) {
        throw new Error('Email is already registered');
      }
      throw new Error('Username is already taken');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const selectedLevel = data.selectedLevel || 'BEGINNER';

    let user: any = null;

    if (isDbAvailable) {
      try {
        user = await prisma.user.create({
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
      } catch {
        isDbAvailable = false;
      }
    }

    if (!isDbAvailable || !user) {
      const id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      user = {
        id,
        email: data.email,
        username: data.username,
        passwordHash,
        avatar: 'default_avatar.png',
        selectedLevel,
        xp: 0,
        gems: 100,
        hearts: 5,
        maxHearts: 5,
        streakCount: 0,
        longestStreak: 0,
        currentLeague: 'BRONZE',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryUsers.set(id, user);

      // Setup initial progress in memory
      memoryProgress.set(id, [
        {
          id: `prog_1`,
          userId: id,
          sublevelId: 1,
          currentStage: 1,
          isCompleted: false,
          sublevel: {
            id: 1,
            title: 'Asymptotic Analysis & Big-O',
            level: { id: 1, title: 'Foundations & Core Mechanics' },
          },
        },
      ]);
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
    let user: any = null;

    try {
      user = await prisma.user.findUnique({
        where: { email: data.email },
      });
    } catch {
      for (const u of memoryUsers.values()) {
        if (u.email === data.email) {
          user = u;
          break;
        }
      }
    }

    if (!user) {
      // Check in memory users
      for (const u of memoryUsers.values()) {
        if (u.email === data.email) {
          user = u;
          break;
        }
      }
    }

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
    let user: any = null;

    try {
      user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
    } catch {
      user = memoryUsers.get(decoded.userId);
    }

    if (!user) {
      user = memoryUsers.get(decoded.userId);
    }

    if (!user) {
      throw new Error('User not found');
    }

    const payload = { userId: user.id, email: user.email, username: user.username };
    const newAccessToken = signAccessToken(payload);
    return { accessToken: newAccessToken };
  }

  async getMe(userId: string) {
    try {
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

      if (user) {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
      }
    } catch {
      // Memory fallback
    }

    const memUser = memoryUsers.get(userId);
    if (!memUser) {
      // Create a default demo user if not found
      return {
        id: userId,
        email: 'hero@algoquest.dev',
        username: 'PixelKnight',
        avatar: 'default_avatar.png',
        xp: 0,
        gems: 100,
        hearts: 5,
        maxHearts: 5,
        streakCount: 0,
        longestStreak: 0,
        selectedLevel: 'BEGINNER',
        currentLeague: 'BRONZE',
        progress: memoryProgress.get(userId) || [],
      };
    }

    const { passwordHash, ...safeMemUser } = memUser;
    return {
      ...safeMemUser,
      progress: memoryProgress.get(userId) || [],
    };
  }
}

export const authService = new AuthService();
