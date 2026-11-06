import api from './axios';

export const stageApi = {
  completeStage: async (sublevelId: number, stageNumber: number) => {
    const res = await api.post('/stage/complete', { sublevelId, stageNumber });
    return res.data?.data;
  },
};

