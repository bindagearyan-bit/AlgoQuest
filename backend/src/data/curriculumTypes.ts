export type SublevelType = 'THEORETICAL' | 'HYBRID' | 'CODE_BASED';
export type Tier = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface CodeLanguageTemplates {
  python: string;
  cpp: string;
  java: string;
  c: string;
}

export interface TestCaseData {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface QuestionData {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TraceRowData {
  iteration: number;
  [key: string]: any;
  action?: string;
}

export interface VisualizationStepData {
  activeIndices: number[];
  pointerLeft: number;
  pointerRight: number;
  action: string;
  codeLine: string;
}

export interface SublevelDefinition {
  id: number;
  levelId: number;
  orderIndex: number;
  title: string;
  tier: Tier;
  sublevelType: SublevelType;
  concepts: string;
  badge: {
    title: string;
    description: string;
    iconSvg: string;
    xpReward: number;
  };
  stages: {
    theory: {
      eli5: string;
      keyTakeaways: string[];
      codeSnippet: string;
      timeComplexity: string;
      spaceComplexity: string;
    };
    visualization?: {
      initialArray: number[];
      steps: VisualizationStepData[];
    };
    dryRun?: {
      code: string;
      traceRows: TraceRowData[];
    };
    guidedCode?: {
      prompt: string;
      starterCode: CodeLanguageTemplates;
    };
    easyProblem?: {
      title: string;
      description: string;
      starterCode: CodeLanguageTemplates;
      testCases: TestCaseData[];
    };
    mediumProblem?: {
      title: string;
      description: string;
      starterCode: CodeLanguageTemplates;
      testCases: TestCaseData[];
    };
    quiz: {
      questions: QuestionData[];
    };
    boss: {
      title: string;
      description: string;
      starterCode: CodeLanguageTemplates;
      testCases: TestCaseData[];
    };
  };
}

export interface LevelDefinition {
  id: number;
  orderIndex: number;
  title: string;
  icon: string;
  description: string;
  sublevels: SublevelDefinition[];
}

export function getMaxStagesForType(type: SublevelType): number {
  switch (type) {
    case 'THEORETICAL':
      return 3;
    case 'HYBRID':
      return 5;
    case 'CODE_BASED':
      return 8;
  }
}
