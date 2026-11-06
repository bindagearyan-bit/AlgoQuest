import api from './axios';

export const roadmapApi = {
  getLevels: async () => {
    const res = await api.get('/roadmap/levels');
    return res.data?.data;
  },

  getSublevel: async (sublevelId: number) => {
    const res = await api.get(`/roadmap/sublevel/${sublevelId}`);
    return res.data?.data;
  },

  getStage: async (sublevelId: number, stageNumber: number) => {
    const res = await api.get(`/roadmap/sublevel/${sublevelId}/stage/${stageNumber}`);
    return res.data?.data;
  },
};

