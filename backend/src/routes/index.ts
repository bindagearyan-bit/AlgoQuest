import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import roadmapRoutes from './roadmap.routes';
import stageRoutes from './stage.routes';
import gamificationRoutes from './gamification.routes';
import onboardingRoutes from './onboarding.routes';
import judge0Routes from './judge0.routes';
import badgeRoutes from './badge.routes';
import arcadeRoutes from './arcade.routes';
import { judge0Controller } from '../controllers/judge0.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/roadmap', roadmapRoutes);
router.use('/stage', stageRoutes);
router.use('/gamification', gamificationRoutes);
router.use('/onboarding', onboardingRoutes);
router.use('/judge0', judge0Routes);
router.use('/badges', badgeRoutes);
router.use('/arcade', arcadeRoutes);

// Direct top-level submissions history
router.get('/submissions/me', authGuard, judge0Controller.getMySubmissions);
router.get('/submissions/:id', authGuard, judge0Controller.getSubmissionById);

export default router;
