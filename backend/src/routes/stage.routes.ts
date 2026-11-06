import { Router } from 'express';
import { stageController } from '../controllers/stage.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

router.use(authGuard);

router.post('/complete', stageController.completeStage);

export default router;

