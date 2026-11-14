import api from './axios';

export interface EscapeRunSubmission {
  timeElapsed: number;
  livesRemaining: number;
  roomsCleared: number;
  isPractice?: boolean;
  dateString?: string;
}

export interface EscapeRunResult {
  success: boolean;
  isVictory: boolean;
  isFlawless: boolean;
  roomsCleared: number;
  timeElapsed: number;
  livesRemaining: number;
  xpBreakdown: {
    baseXP: number;
    timeBonus: number;
    flawlessBonus: number;
    speedrunnerBonus: number;
    totalXpEarned: number;
  };
  streak: {
    current: number;
    longest: number;
  };
  dailyBadge?: {
    title: string;
    description: string;
    tier: string;
    xpReward: number;
    iconSvg: string;
  };
  milestoneUnlocked?: {
    days: number;
    title: string;
    description: string;
    badgeTitle?: string;
    bonusXp?: number;
    bonusGems?: number;
  };
  luckyChestReward?: {
    title: string;
    description: string;
    bonusXp: number;
    bonusGems: number;
  };
  shareCard?: {
    username: string;
    date: string;
    timeElapsed: number;
    livesRemaining: number;
    isFlawless: boolean;
    roomsCleared: number;
    streak: number;
  };
  alreadyPlayed?: boolean;
  message?: string;
}

export const arcadeApi = {
  // Get Today's Dungeon & Status
  async getTodayDungeon() {
    const res = await api.get('/arcade/escape-room/today');
    return res.data?.data;
  },

  // Get Past Dungeon for Practice Mode
  async getPracticeDungeon(dateString: string) {
    const res = await api.get(`/arcade/escape-room/practice/${dateString}`);
    return res.data?.data;
  },

  // Submit Scored or Practice Run
  async submitEscapeRun(data: EscapeRunSubmission): Promise<EscapeRunResult> {
    const res = await api.post('/arcade/escape-room/submit', data);
    return res.data?.data;
  },

  // Get Daily Leaderboard
  async getDailyLeaderboard(date?: string, flawlessOnly = false, limit = 100) {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (flawlessOnly) params.append('flawless', 'true');
    params.append('limit', limit.toString());

    const res = await api.get(`/arcade/escape-room/leaderboard?${params.toString()}`);
    return res.data?.data;
  },

  // Get User Streak & Milestones
  async getUserStreakInfo() {
    const res = await api.get('/arcade/escape-room/streak');
    return res.data?.data;
  },

  // Get Escape Calendar
  async getUserCalendar(year?: number, month?: number) {
    const params = new URLSearchParams();
    if (year) params.append('year', year.toString());
    if (month) params.append('month', month.toString());

    const res = await api.get(`/arcade/escape-room/calendar?${params.toString()}`);
    return res.data?.data;
  },
};
