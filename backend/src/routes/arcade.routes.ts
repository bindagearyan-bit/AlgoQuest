import { Router, Request, Response, NextFunction } from 'express';
import { arcadeController } from '../controllers/arcade.controller';
import { verifyAccessToken } from '../utils/jwt';

const router = Router();

// Middleware to populate req.user if Bearer token present, but don't hard block guest/demo users
const flexibleAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);
      req.user = decoded;
    }
  } catch {
    // Continue with guest/fallback
  }
  next();
};

router.use(flexibleAuth);

// POST /api/v1/arcade/memory-match/complete
router.post('/memory-match/complete', (req, res) => arcadeController.completeMemoryMatch(req, res));

// GET /api/v1/arcade/memory-match/leaderboard
router.get('/memory-match/leaderboard', (req, res) => arcadeController.getLeaderboard(req, res));

// GET /api/v1/arcade/memory-match/stats
router.get('/memory-match/stats', (req, res) => arcadeController.getUserStats(req, res));

export default router;

