import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user';
import { authApi } from '../api/auth';
import { useUserStore } from '../store/userStore';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export function useUser() {
  const { user, setUser, updateXP, updateHearts, updateGems, updateStreak } = useUserStore();
  const token = Cookies.get('access_token');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const me = await authApi.getMe();
        return me;
      } catch (e) {
        return null;
      }
    },
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return {
    user: user || data,
    isLoading,
    isError,
    refetch,
    updateXP,
    updateHearts,
    updateGems,
    updateStreak,
  };
}

