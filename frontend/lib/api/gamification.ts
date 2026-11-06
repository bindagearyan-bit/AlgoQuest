import api from './axios';

export const gamificationApi = {
  consumeHeart: async () => {
    const res = await api.post('/gamification/heart/consume');
    return res.data?.data;
  },

  refillHeart: async () => {
    const res = await api.post('/gamification/heart/refill');
    return res.data?.data;
  },

  getLeaderboard: async (league = 'BRONZE') => {
    const res = await api.get(`/gamification/leaderboard?league=${league}`);
    return res.data?.data;
  },

  getBadges: async () => {
    const res = await api.get('/gamification/badges');
    return res.data?.data;
  },
};

