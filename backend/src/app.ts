import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { env } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { rateLimiter } from './middlewares/rateLimiter';

const app: Express = express();

app.use(cors({
  origin: [env.FRONTEND_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// All API v1 routes
app.use('/api/v1', routes);

// Global centralized error handler
app.use(errorHandler);

export default app;

