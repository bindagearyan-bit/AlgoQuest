import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { configurePassport } from './config/passport';
import { globalRateLimiter } from './middleware/rateLimiter';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

// Route imports
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import contentRoutes from './modules/content/content.routes';
import gamificationRoutes from './modules/gamification/gamification.routes';

const createApp = (): Application => {
  const app = express();

  // =====================
  // Security Middleware
  // =====================
  app.use(
    helmet({
      contentSecurityPolicy: env.isProduction,
      crossOriginEmbedderPolicy: env.isProduction,
    })
  );

  // CORS Configuration
  const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS blocked: ${origin}`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // =====================
  // Body Parsing
  // =====================
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());

  // =====================
  // Rate Limiting
  // =====================
  app.use('/api/', globalRateLimiter);

  // =====================
  // Passport OAuth
  // =====================
  configurePassport();
  app.use(passport.initialize());

  // =====================
  // API Documentation
  // =====================
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'AlgoQuest API Docs',
    })
  );

  // =====================
  // Health Check
  // =====================
  app.get('/health', (_req, res) => {
    res.status(200).json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.NODE_ENV,
      },
    });
  });

  // =====================
  // API Routes
  // =====================
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api', contentRoutes);
  app.use('/api', gamificationRoutes);

  // =====================
  // Error Handling
  // =====================
  app.use(notFoundHandler);
  app.use(errorHandler);

  logger.info(`📚 API Docs available at http://localhost:${env.PORT}/api/docs`);

  return app;
};

export default createApp;
