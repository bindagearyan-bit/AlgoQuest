import { Router } from 'express';
import { z } from 'zod';
import { OnboardingController } from '../controllers/onboarding.controller';
import { authGuard } from '../middlewares/authGuard';
import { validateBody } from '../middlewares/validate';

const router = Router();

const placementSubmitSchema = z.object({
  answers: z.union([
    z.array(z.number().int()),
    z.record(z.string(), z.number().int()),
  ]),
});

router.get('/placement-quiz', OnboardingController.getPlacementQuiz);
router.post(
  '/placement-quiz/submit',
  authGuard,
  validateBody(placementSubmitSchema),
  OnboardingController.submitPlacementQuiz
);

export default router;
