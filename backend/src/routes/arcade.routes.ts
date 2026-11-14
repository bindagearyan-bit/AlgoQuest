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

// Daily Algorithm Escape Room Endpoints
router.get('/escape-room/today', (req, res) => arcadeController.getTodayDungeon(req, res));
router.get('/escape-room/practice/:date', (req, res) => arcadeController.getPracticeDungeon(req, res));
router.post('/escape-room/submit', (req, res) => arcadeController.submitEscapeRun(req, res));
router.get('/escape-room/leaderboard', (req, res) => arcadeController.getDailyLeaderboard(req, res));
router.get('/escape-room/streak', (req, res) => arcadeController.getUserStreakInfo(req, res));
router.get('/escape-room/calendar', (req, res) => arcadeController.getUserCalendar(req, res));

export default router;
