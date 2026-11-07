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

import { LEVEL_1_DATA } from './curriculumLevel1';
import { LEVEL_2_DATA } from './curriculumLevel2';
import { LEVEL_3_DATA } from './curriculumLevel3';
import { LEVEL_4_DATA } from './curriculumLevel4';
import { LEVEL_5_DATA } from './curriculumLevel5';
import { LEVEL_6_DATA } from './curriculumLevel6';

export { LEVEL_1_DATA, LEVEL_2_DATA, LEVEL_3_DATA, LEVEL_4_DATA, LEVEL_5_DATA, LEVEL_6_DATA };

export const CURRICULUM_CATALOG: LevelDefinition[] = [
  LEVEL_1_DATA,
  LEVEL_2_DATA,
  LEVEL_3_DATA,
  LEVEL_4_DATA,
  LEVEL_5_DATA,
  LEVEL_6_DATA,
];

// Helper utilities
export function getSublevelById(id: number): SublevelDefinition | undefined {
  for (const lvl of CURRICULUM_CATALOG) {
    const found = lvl.sublevels.find((s) => s.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getAllSublevels(): SublevelDefinition[] {
  const all: SublevelDefinition[] = [];
  for (const lvl of CURRICULUM_CATALOG) {
    all.push(...lvl.sublevels);
  }
  return all;
}
