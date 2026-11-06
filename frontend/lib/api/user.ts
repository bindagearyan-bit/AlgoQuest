import api from './axios';

export const userApi = {
  getProfile: async () => {
    const res = await api.get('/user/profile');
    return res.data?.data;
  },

  updateProfile: async (data: { username?: string; avatar?: string; selectedLevel?: string }) => {
    const res = await api.put('/user/profile', data);
    return res.data?.data;
  },

  getProgress: async () => {
    const res = await api.get('/user/progress');
    return res.data?.data;
  },

  getStats: async () => {
    const res = await api.get('/user/stats');
    return res.data?.data;
  },
};

