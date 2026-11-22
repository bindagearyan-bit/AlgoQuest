import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { env } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { rateLimiter } from './middlewares/rateLimiter';

const app: Express = express();

// Express middleware pipeline configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsers with payload bounds & security rate limiting
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter());

// Operational health check probe
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// All API routes (supporting both /api/v1 and /api)
app.use('/api/v1', routes);
app.use('/api', routes);

// Global centralized error handler
app.use(errorHandler);

export default app;

