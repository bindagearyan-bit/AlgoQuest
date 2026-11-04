import { Router } from 'express';
import { z } from 'zod';
import { StageController } from '../controllers/stage.controller';
import { authGuard } from '../middlewares/authGuard';
import { validateBody } from '../middlewares/validate';

const router = Router();

const completeStageSchema = z.object({
  sublevelId: z.number().int().positive('Sublevel ID must be positive'),
  stageNumber: z.number().int().min(1).max(8, 'Stage number must be between 1 and 8'),
});

router.post('/complete', authGuard, validateBody(completeStageSchema), StageController.completeStage);

export default router;
