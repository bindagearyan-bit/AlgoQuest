import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmap.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

router.get('/levels', authGuard, RoadmapController.getLevels);
router.get('/sublevel/:id', authGuard, RoadmapController.getSublevel);
router.get('/sublevel/:id/stage/:stageNumber', authGuard, RoadmapController.getStage);

export default router;
