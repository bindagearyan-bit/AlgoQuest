import { Router } from 'express';
import { gamificationController } from '../controllers/gamification.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

router.post('/heart/consume', authGuard, gamificationController.consumeHeart);
router.post('/heart/refill', authGuard, gamificationController.refillHearts);
router.get('/leaderboard', gamificationController.getLeaderboard);
router.get('/badges', authGuard, gamificationController.getBadges);

export default router;

