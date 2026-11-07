import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import roadmapRoutes from './roadmap.routes';
import stageRoutes from './stage.routes';
import gamificationRoutes from './gamification.routes';
import onboardingRoutes from './onboarding.routes';
import judge0Routes from './judge0.routes';
import badgeRoutes from './badge.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/roadmap', roadmapRoutes);
router.use('/stage', stageRoutes);
router.use('/gamification', gamificationRoutes);
router.use('/onboarding', onboardingRoutes);
router.use('/judge0', judge0Routes);
router.use('/badges', badgeRoutes);

export default router;

