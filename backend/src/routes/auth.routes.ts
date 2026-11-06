import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authGuard } from '../middlewares/authGuard';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

const signupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    username: z.string().min(3).max(20),
    password: z.string().min(6),
    selectedLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authGuard, authController.me);

export default router;

