import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user';

export function useProgress() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => userApi.getProgress(),
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

