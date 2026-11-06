import { Router } from 'express';
import { onboardingController } from '../controllers/onboarding.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

router.get('/placement-quiz', onboardingController.getPlacementQuiz);
router.post('/placement-quiz/submit', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authGuard(req, res, next);
  }
  return next();
}, onboardingController.submitPlacementQuiz);

export default router;

