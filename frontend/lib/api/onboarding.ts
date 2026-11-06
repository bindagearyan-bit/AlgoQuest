import api from './axios';

export const onboardingApi = {
  getPlacementQuiz: async () => {
    const res = await api.get('/onboarding/placement-quiz');
    return res.data?.data;
  },

  submitPlacementQuiz: async (answers: { questionId: number; selectedOption: number }[]) => {
    const res = await api.post('/onboarding/placement-quiz/submit', { answers });
    return res.data?.data;
  },
};

