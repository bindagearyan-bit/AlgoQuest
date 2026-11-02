import { Router, RequestHandler } from 'express';
import { userController } from './user.controller';
import { authGuard } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import { updateProfileSchema } from './user.validation';

const router = Router();

router.use(authGuard as RequestHandler);

router.get('/profile', userController.getProfile.bind(userController) as RequestHandler);
router.put('/profile', validate(updateProfileSchema), userController.updateProfile.bind(userController) as RequestHandler);
router.get('/progress', userController.getUserProgress.bind(userController) as RequestHandler);

export default router;
