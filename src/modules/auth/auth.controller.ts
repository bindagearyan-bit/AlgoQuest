import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { successResponse } from '../../utils/response';
import { env } from '../../config/env';
import { OAuthProvider } from '@prisma/client';

export class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.signup(req.body);
      res.status(201).json(successResponse(result, 'Account created successfully'));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(successResponse(result, 'Login successful'));
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      res.status(200).json(successResponse(tokens, 'Tokens refreshed'));
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      res.status(200).json(successResponse(null, 'Logged out successfully'));
    } catch (error) {
      next(error);
    }
  }

  googleCallback(req: Request, res: Response, next: NextFunction): void {
    try {
      const profile = req.user as {
        id: string;
        emails?: Array<{ value: string }>;
        displayName: string;
        photos?: Array<{ value: string }>;
      };

      authService
        .handleOAuthCallback(
          OAuthProvider.GOOGLE,
          profile.id,
          profile.emails?.[0]?.value || '',
          profile.displayName,
          profile.photos?.[0]?.value
        )
        .then(({ tokens }) => {
          const redirectUrl = `${env.FRONTEND_URL}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
          res.redirect(redirectUrl);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }

  githubCallback(req: Request, res: Response, next: NextFunction): void {
    try {
      const profile = req.user as {
        id: string;
        emails?: Array<{ value: string }>;
        displayName: string;
        photos?: Array<{ value: string }>;
      };

      authService
        .handleOAuthCallback(
          OAuthProvider.GITHUB,
          profile.id,
          profile.emails?.[0]?.value || '',
          profile.displayName || `github_${profile.id}`,
          profile.photos?.[0]?.value
        )
        .then(({ tokens }) => {
          const redirectUrl = `${env.FRONTEND_URL}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
          res.redirect(redirectUrl);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
