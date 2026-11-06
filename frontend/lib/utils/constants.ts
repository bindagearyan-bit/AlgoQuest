export const XP_REWARDS = {
  THEORY: 10,
  VISUALIZATION: 10,
  DRY_RUN: 15,
  GUIDED_CODE: 20,
  EASY_PROBLEM: 30,
  MEDIUM_PROBLEM: 50,
  QUIZ: 25,
  BOSS: 100,
} as const;

export const LEAGUES = ['BRONZE', 'SILVER', 'GOLD', 'DIAMOND'] as const;

export const STAGE_TYPE_LABELS = {
  THEORY: 'ELI5 Theory',
  VISUALIZATION: 'Dungeon Debugger',
  DRY_RUN: 'Trace Table',
  GUIDED_CODE: 'Guided Example',
  EASY_PROBLEM: 'Warmup Quest',
  MEDIUM_PROBLEM: 'Core Battle',
  QUIZ: 'Mastery Quiz',
  BOSS: 'Boss Dungeon',
} as const;

