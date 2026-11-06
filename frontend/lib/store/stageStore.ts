import { create } from 'zustand';

interface StageState {
  currentSublevelId: number | null;
  currentStageNumber: number | null;
  activeLanguage: 'c' | 'cpp' | 'java' | 'python';
  codeByLanguage: Record<string, string>;
  quizAnswers: Record<number, number>;
  setStage: (sublevelId: number, stageNumber: number) => void;
  setLanguage: (lang: 'c' | 'cpp' | 'java' | 'python') => void;
  setCode: (lang: string, code: string) => void;
  setQuizAnswer: (questionId: number, selectedOption: number) => void;
  resetStageState: () => void;
}

export const useStageStore = create<StageState>((set) => ({
  currentSublevelId: null,
  currentStageNumber: null,
  activeLanguage: 'python',
  codeByLanguage: {},
  quizAnswers: {},
  setStage: (currentSublevelId, currentStageNumber) =>
    set({ currentSublevelId, currentStageNumber }),
  setLanguage: (activeLanguage) => set({ activeLanguage }),
  setCode: (lang, code) =>
    set((state) => ({
      codeByLanguage: { ...state.codeByLanguage, [lang]: code },
    })),
  setQuizAnswer: (questionId, selectedOption) =>
    set((state) => ({
      quizAnswers: { ...state.quizAnswers, [questionId]: selectedOption },
    })),
  resetStageState: () =>
    set({
      quizAnswers: {},
      codeByLanguage: {},
    }),
}));

