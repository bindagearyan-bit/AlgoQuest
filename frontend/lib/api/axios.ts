import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: typeof window !== 'undefined' ? '/api/v1' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'),
  withCredentials: true,
});

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/refresh-token`,
            { refreshToken }
          );
          if (res.data?.success && res.data.data?.accessToken) {
            const newAccess = res.data.data.accessToken;
            Cookies.set('access_token', newAccess, { expires: 1 });
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return api(originalRequest);
          }
        } catch (refreshErr) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

