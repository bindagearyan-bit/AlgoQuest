import { Router } from 'express';
import { contentController } from './content.controller';
import { authGuard, optionalAuth } from '../../middleware/authGuard';

const router = Router();

/**
 * @swagger
 * /levels:
 *   get:
 *     tags: [Content]
 *     summary: Get all levels with lock/unlock status
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of levels with sublevels }
 */
router.get('/levels', optionalAuth, contentController.getLevels.bind(contentController));

/**
 * @swagger
 * /sublevels/{id}:
 *   get:
 *     tags: [Content]
 *     summary: Get sublevel details with stages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 */
router.get(
  '/sublevels/:id',
  optionalAuth,
  contentController.getSublevel.bind(contentController)
);

/**
 * @swagger
 * /sublevels/{sublevelId}/problems:
 *   get:
 *     tags: [Content]
 *     summary: Get problems for a sublevel
 */
router.get(
  '/sublevels/:sublevelId/problems',
  authGuard,
  contentController.getProblems.bind(contentController)
);

/**
 * @swagger
 * /problems/{id}:
 *   get:
 *     tags: [Content]
 *     summary: Get problem details with visible test cases
 */
router.get(
  '/problems/:id',
  authGuard,
  contentController.getProblem.bind(contentController)
);

export default router;
