import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

router.use(authGuard);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/progress', userController.getProgress);
router.get('/stats', userController.getStats);

export default router;

