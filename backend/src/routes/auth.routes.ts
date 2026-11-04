import { Router } from 'express';
import { z } from 'zod';
import { AuthController } from '../controllers/auth.controller';
import { authGuard } from '../middlewares/authGuard';
import { validateBody } from '../middlewares/validate';
import { authRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

const signupSchema = z.object({
  email: z.string().email('Valid email is required'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  selectedLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

router.post('/signup', authRateLimiter, validateBody(signupSchema), AuthController.signup);
router.post('/login', authRateLimiter, validateBody(loginSchema), AuthController.login);
router.post('/refresh-token', validateBody(refreshSchema), AuthController.refreshToken);
router.post('/logout', authGuard, AuthController.logout);
router.get('/me', authGuard, AuthController.getMe);

export default router;
