import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import roadmapRoutes from './roadmap.routes';
import stageRoutes from './stage.routes';
import gamificationRoutes from './gamification.routes';
import onboardingRoutes from './onboarding.routes';
import { GamificationController } from '../controllers/gamification.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

// Sub-routers
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/roadmap', roadmapRoutes);
router.use('/stage', stageRoutes);
router.use('/gamification', gamificationRoutes);
router.use('/onboarding', onboardingRoutes);

// Direct shortcut endpoints specified in prompt:
// /api/v1/heart/consume, /api/v1/heart/refill, /api/v1/leaderboard, /api/v1/badges
router.post('/heart/consume', authGuard, GamificationController.consumeHeart);
router.post('/heart/refill', authGuard, GamificationController.refillHearts);
router.get('/leaderboard', GamificationController.getLeaderboard);
router.get('/badges', authGuard, GamificationController.getBadges);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
