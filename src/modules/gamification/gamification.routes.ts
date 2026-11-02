import { Router, RequestHandler } from 'express';
import { gamificationController } from './gamification.controller';
import { authGuard } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import { addXpSchema, updateStreakSchema } from './gamification.validation';

const router = Router();

// All gamification routes require authentication
router.post('/xp/add', authGuard as RequestHandler, validate(addXpSchema), gamificationController.addXp.bind(gamificationController) as RequestHandler);
router.get('/streak', authGuard as RequestHandler, gamificationController.getStreak.bind(gamificationController) as RequestHandler);
router.post(
  '/streak/update',
  authGuard as RequestHandler,
  validate(updateStreakSchema),
  gamificationController.updateStreak.bind(gamificationController) as RequestHandler
);

export default router;
