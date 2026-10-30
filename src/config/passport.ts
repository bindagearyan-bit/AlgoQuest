import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export const configurePassport = (): void => {
  // Google OAuth Strategy
  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          callbackURL: env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
        },
        (_accessToken, _refreshToken, profile, done) => {
          return done(null, profile);
        }
      )
    );
    logger.info('✅ Google OAuth strategy configured');
  } else {
    logger.warn('⚠️  Google OAuth not configured (missing credentials)');
  }

  // GitHub OAuth Strategy
  if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: env.GITHUB_CLIENT_ID,
          clientSecret: env.GITHUB_CLIENT_SECRET,
          callbackURL: env.GITHUB_CALLBACK_URL || 'http://localhost:3000/api/auth/github/callback',
        },
        (_accessToken: string, _refreshToken: string, profile: object, done: (err: null, profile: object) => void) => {
          return done(null, profile);
        }
      )
    );
    logger.info('✅ GitHub OAuth strategy configured');
  } else {
    logger.warn('⚠️  GitHub OAuth not configured (missing credentials)');
  }
};
