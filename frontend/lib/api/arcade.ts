import api from './axios';

export interface MemoryMatchSubmission {
  score: number;
  timeElapsed: number;
  moves: number;
}

export interface ArcadeSessionResponse {
  session: any;
  xpEarned: number;
  isPerfectGame: boolean;
  newBadgeUnlocked?: any;
  badge?: any;
  stats: {
    bestScore: number;
    bestTime: number;
    bestMoves: number;
    timesPlayed: number;
  };
}

export const arcadeApi = {
  async saveMemoryMatchSession(data: MemoryMatchSubmission): Promise<ArcadeSessionResponse> {
    const res = await api.post('/arcade/memory-match/complete', data);
    return res.data?.data;
  },

  async getMemoryMatchLeaderboard(limit = 10) {
    const res = await api.get(`/arcade/memory-match/leaderboard?limit=${limit}`);
    return res.data?.data || [];
  },

  async getMemoryMatchStats() {
    const res = await api.get('/arcade/memory-match/stats');
    return res.data?.data || { bestScore: 0, bestTime: 0, bestMoves: 0, timesPlayed: 0 };
  },
};
