import { Router } from 'express';
import { userController } from './user.controller';
import { authGuard } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import { updateProfileSchema } from './user.validation';

const router = Router();

// All user routes require authentication
router.use(authGuard);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get authenticated user's profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: User profile }
 *       401: { description: Unauthorized }
 */
router.get('/profile', userController.getProfile.bind(userController));

/**
 * @swagger
 * /user/profile:
 *   put:
 *     tags: [User]
 *     summary: Update user profile
 *     security: [{ bearerAuth: [] }]
 */
router.put(
  '/profile',
  validate(updateProfileSchema),
  userController.updateProfile.bind(userController)
);

/**
 * @swagger
 * /user/progress:
 *   get:
 *     tags: [User]
 *     summary: Get user's learning progress
 *     security: [{ bearerAuth: [] }]
 */
router.get('/progress', userController.getUserProgress.bind(userController));

export default router;
