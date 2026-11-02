import { Request, Response, NextFunction, RequestHandler } from 'express';
import { authGuard, optionalAuth } from '../../middleware/authGuard';
import { contentController } from './content.controller';
import { Router } from 'express';

const router = Router();

router.get('/levels', optionalAuth as RequestHandler, contentController.getLevels.bind(contentController) as RequestHandler);
router.get('/sublevels/:id', optionalAuth as RequestHandler, contentController.getSublevel.bind(contentController) as RequestHandler);
router.get('/sublevels/:sublevelId/problems', authGuard as RequestHandler, contentController.getProblems.bind(contentController) as RequestHandler);
router.get('/problems/:id', authGuard as RequestHandler, contentController.getProblem.bind(contentController) as RequestHandler);

export default router;
