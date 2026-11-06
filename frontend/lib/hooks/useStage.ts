import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roadmapApi } from '../api/roadmap';
import { stageApi } from '../api/stage';
import { useUserStore } from '../store/userStore';

export function useStage(sublevelId: number, stageNumber: number) {
  const queryClient = useQueryClient();
  const { updateXP } = useUserStore();

  const stageQuery = useQuery({
    queryKey: ['stage', sublevelId, stageNumber],
    queryFn: () => roadmapApi.getStage(sublevelId, stageNumber),
    enabled: !isNaN(sublevelId) && !isNaN(stageNumber),
  });

  const completeMutation = useMutation({
    mutationFn: () => stageApi.completeStage(sublevelId, stageNumber),
    onSuccess: (data) => {
      if (data?.totalXp !== undefined) {
        updateXP(data.totalXp);
      }
      queryClient.invalidateQueries({ queryKey: ['sublevel', sublevelId] });
      queryClient.invalidateQueries({ queryKey: ['levels'] });
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    },
  });

  return {
    stage: stageQuery.data,
    isLoading: stageQuery.isLoading,
    isError: stageQuery.isError,
    error: stageQuery.error,
    completeStage: completeMutation.mutateAsync,
    isCompleting: completeMutation.isPending,
    completionResult: completeMutation.data,
  };
}

