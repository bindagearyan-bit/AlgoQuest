import { Router } from 'express';
import { z } from 'zod';
import { UserController } from '../controllers/user.controller';
import { authGuard } from '../middlewares/authGuard';
import { validateBody } from '../middlewares/validate';

const router = Router();

const updateProfileSchema = z.object({
  avatar: z.string().optional(),
  username: z.string().min(3).max(30).optional(),
});

router.get('/profile', authGuard, UserController.getProfile);
router.patch('/profile', authGuard, validateBody(updateProfileSchema), UserController.updateProfile);

export default router;
