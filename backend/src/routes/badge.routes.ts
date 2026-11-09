import { Router } from 'express';
import { badgeController } from '../controllers/badge.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

// Public / optional auth: all badges
router.get('/all', badgeController.getAllBadges);

// Protected: earned badges for user
router.get('/earned', authGuard, badgeController.getEarnedBadges);

// Public / Shareable: certificate payload for badge
router.get('/:id/share', badgeController.getSharePayload);

export default router;

