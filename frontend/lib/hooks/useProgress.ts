import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user';

export function useProgress() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => userApi.getProgress(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    progress: data,
    activeProgress: data?.activeProgress,
    allProgress: data?.allProgress || [],
    isLoading,
    error,
    refetch,
  };
}

