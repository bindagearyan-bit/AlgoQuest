import api from './axios';

export interface SupportedLanguage {
  id: number;
  name: string;
  monacoId: string;
  defaultLabel: string;
}

export interface RunCodeParams {
  code: string;
  languageId: number | string;
  problemId?: number;
  stdin?: string;
}

export interface SubmitCodeParams {
  code: string;
  languageId: number | string;
  problemId?: number;
  sublevelId?: number;
  stageNumber?: number;
}

export const judge0Api = {
  getLanguages: async (): Promise<SupportedLanguage[]> => {
    const res = await api.get('/judge0/languages');
    return res.data?.data?.languages || [];
  },

  runCode: async (params: RunCodeParams) => {
    const res = await api.post('/judge0/run', params);
    return res.data?.data;
  },

  submitCode: async (params: SubmitCodeParams) => {
    const res = await api.post('/judge0/execute', params);
    return res.data?.data;
  },

  // Backward compatible executeCode
  executeCode: async (problemId: number, language: string, sourceCode: string) => {
    const res = await api.post('/judge0/execute', { problemId, language, sourceCode });
    return res.data?.data;
  },

  getMySubmissions: async () => {
    const res = await api.get('/judge0/submissions/me');
    return res.data?.data?.submissions || [];
  },

  getSubmissionById: async (id: string) => {
    const res = await api.get(`/judge0/submissions/${id}`);
    return res.data?.data?.submission;
  },
};
