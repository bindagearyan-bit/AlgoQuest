import api from './axios';

export const judge0Api = {
  executeCode: async (problemId: number, language: string, sourceCode: string) => {
    const res = await api.post('/judge0/execute', { problemId, language, sourceCode });
    return res.data?.data;
  },
};

