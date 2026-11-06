import api from './axios';
import Cookies from 'js-cookie';

export const authApi = {
  signup: async (data: { email: string; username: string; password: string; selectedLevel?: string }) => {
    const res = await api.post('/auth/signup', data);
    if (res.data?.data?.accessToken) {
      Cookies.set('access_token', res.data.data.accessToken, { expires: 1 });
      Cookies.set('refresh_token', res.data.data.refreshToken, { expires: 7 });
    }
    return res.data;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await api.post('/auth/login', data);
    if (res.data?.data?.accessToken) {
      Cookies.set('access_token', res.data.data.accessToken, { expires: 1 });
      Cookies.set('refresh_token', res.data.data.refreshToken, { expires: 7 });
    }
    return res.data;
  },

  logout: async () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    try {
      await api.post('/auth/logout');
    } catch {}
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data?.data;
  },
};

