import { Router } from 'express';
import { roadmapController } from '../controllers/roadmap.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

// Optional auth so guest can preview levels, but authenticated gets personalized status
router.get('/levels', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authGuard(req, res, next);
  }
  return next();
}, roadmapController.getLevels);

router.get('/sublevel/:id', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authGuard(req, res, next);
  }
  return next();
}, roadmapController.getSublevel);

router.get('/sublevel/:id/stage/:n', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authGuard(req, res, next);
  }
  return next();
}, roadmapController.getStage);

export default router;

