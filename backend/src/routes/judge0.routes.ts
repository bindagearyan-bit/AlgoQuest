import { Router } from 'express';
import { judge0Controller } from '../controllers/judge0.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

router.use(authGuard);

router.post('/execute', judge0Controller.execute);

export default router;

