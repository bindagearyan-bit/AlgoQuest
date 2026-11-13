import { Router } from 'express';
import { judge0Controller } from '../controllers/judge0.controller';
import { authGuard } from '../middlewares/authGuard';

const router = Router();

// Languages catalog can be queried without auth
router.get('/languages', judge0Controller.getLanguages);

router.use(authGuard);

router.post('/run', judge0Controller.run);
router.post('/execute', judge0Controller.execute);
router.post('/submit', judge0Controller.execute);
router.get('/submissions/me', judge0Controller.getMySubmissions);
router.get('/submissions/:id', judge0Controller.getSubmissionById);

export default router;
