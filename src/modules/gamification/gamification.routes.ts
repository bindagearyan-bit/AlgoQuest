import { Router } from 'express';
import { gamificationController } from './gamification.controller';
import { authGuard } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import { addXpSchema, updateStreakSchema } from './gamification.validation';

const router = Router();

// All gamification routes require authentication
router.use(authGuard);

/**
 * @swagger
 * /xp/add:
 *   post:
 *     tags: [Gamification]
 *     summary: Add XP to user and recalculate league
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount: { type: integer, minimum: 1 }
 *               reason: { type: string }
 */
router.post('/xp/add', validate(addXpSchema), gamificationController.addXp.bind(gamificationController));

/**
 * @swagger
 * /streak:
 *   get:
 *     tags: [Gamification]
 *     summary: Get current streak status
 *     security: [{ bearerAuth: [] }]
 */
router.get('/streak', gamificationController.getStreak.bind(gamificationController));

/**
 * @swagger
 * /streak/update:
 *   post:
 *     tags: [Gamification]
 *     summary: Update streak for daily activity
 *     security: [{ bearerAuth: [] }]
 */
router.post(
  '/streak/update',
  validate(updateStreakSchema),
  gamificationController.updateStreak.bind(gamificationController)
);

export default router;
