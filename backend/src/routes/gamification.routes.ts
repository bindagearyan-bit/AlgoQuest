import { Router } from 'express';
import { GamificationController } from '../controllers/gamification.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

router.post('/heart/consume', authGuard, GamificationController.consumeHeart);
router.post('/heart/refill', authGuard, GamificationController.refillHearts);
router.get('/leaderboard', GamificationController.getLeaderboard);
router.get('/badges', authGuard, GamificationController.getBadges);

export default router;
