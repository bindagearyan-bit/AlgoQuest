import prisma from '../config/prisma';
import { memoryUsers, memoryProgress } from './auth.service';
import {
  CURRICULUM_CATALOG,
  getSublevelById,
  getAllSublevels,
  SublevelDefinition,
  LevelDefinition,
  SublevelType,
} from '../data/curriculumCatalog';

export interface SublevelItem {
  id: number;
  levelId: number;
  title: string;
  orderIndex: number;
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  sublevelType?: SublevelType;
  concepts?: string;
  status?: 'LOCKED' | 'UNLOCKED' | 'COMPLETED';
  currentStage?: number;
  stagesCount?: number;
  stages?: any[];
  badge?: any;
}

export interface LevelItem {
  id: number;
  title: string;
  orderIndex: number;
  icon: string;
  description: string;
  sublevels: SublevelItem[];
}

function getStagesCountForType(sublevelType?: SublevelType | string): number {
  switch (sublevelType) {
    case 'THEORETICAL':
      return 3;
    case 'HYBRID':
      return 5;
    case 'CODE_BASED':
    default:
      return 8;
  }
}

function buildAdaptiveStagesList(subDef: SublevelDefinition, currentStage: number, isCompleted: boolean) {
  const type = subDef.sublevelType || 'CODE_BASED';

  let stageSequence: { type: string; title: string }[] = [];

  if (type === 'THEORETICAL') {
    stageSequence = [
      { type: 'THEORY', title: `Theory: ${subDef.title}` },
      { type: 'QUIZ', title: `Quiz: ${subDef.title} Knowledge Check` },
      { type: 'BOSS', title: subDef.stages.boss.title || `Mini-Boss: ${subDef.title}` },
    ];
  } else if (type === 'HYBRID') {
    stageSequence = [
      { type: 'THEORY', title: `Theory: ${subDef.title}` },
      { type: 'VISUALIZATION', title: `Visualization: ${subDef.title}` },
      { type: 'DRY_RUN', title: `Dry Run: ${subDef.title}` },
      { type: 'QUIZ', title: `Quiz: ${subDef.title} Mastery` },
      { type: 'BOSS', title: subDef.stages.boss.title || `Boss: ${subDef.title}` },
    ];
  } else {
    // CODE_BASED: Full 8 stages
    stageSequence = [
      { type: 'THEORY', title: `Theory: ${subDef.title} Fundamentals` },
      { type: 'VISUALIZATION', title: `Visualization: ${subDef.title} Dungeon Debugger` },
      { type: 'DRY_RUN', title: `Dry Run: Step-by-Step Trace of ${subDef.title}` },
      { type: 'GUIDED_CODE', title: `Guided Code: Implement ${subDef.title}` },
      { type: 'EASY_PROBLEM', title: subDef.stages.easyProblem?.title || `Easy Challenge: ${subDef.title}` },
      { type: 'MEDIUM_PROBLEM', title: subDef.stages.mediumProblem?.title || `Medium Challenge: ${subDef.title}` },
      { type: 'QUIZ', title: `Stage Quiz: Mastery Test on ${subDef.title}` },
      { type: 'BOSS', title: subDef.stages.boss.title || `Boss Fight: Conquering ${subDef.title}` },
    ];
  }

  return stageSequence.map((s, idx) => {
    const stageNum = idx + 1;
    let status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' = 'LOCKED';
    if (isCompleted || stageNum < currentStage) {
      status = 'COMPLETED';
    } else if (stageNum === currentStage) {
      status = 'UNLOCKED';
    } else {
      status = 'LOCKED';
    }

    return {
      id: stageNum,
      stageNumber: stageNum,
      stageType: s.type,
      title: s.title,
      status,
    };
  });
}

export class RoadmapService {
  async getLevels(userId?: string) {
    // 0. Resolve active tier for this user
    let activeTier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' = 'BEGINNER';
    let isDbAvailable = true;

    if (userId) {
      try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user?.selectedLevel) {
          activeTier = user.selectedLevel as any;
        }
      } catch {
        isDbAvailable = false;
        const memUser = memoryUsers.get(userId) || memoryUsers.get('user_default_aryan');
        if (memUser?.selectedLevel) {
          activeTier = memUser.selectedLevel;
        }
      }
    } else {
      const defaultUser = memoryUsers.get('user_default_aryan');
      if (defaultUser?.selectedLevel) {
        activeTier = defaultUser.selectedLevel;
      }
    }

    // 1. Try Prisma DB
    if (isDbAvailable) {
      try {
        const levels = await prisma.level.findMany({
          orderBy: { orderIndex: 'asc' },
          include: {
            sublevels: {
              where: { tier: activeTier },
              orderBy: { orderIndex: 'asc' },
              include: {
                stages: {
                  select: {
                    id: true,
                    stageNumber: true,
                    stageType: true,
                    title: true,
                  },
                  orderBy: { stageNumber: 'asc' },
                },
              },
            },
          },
        });

        if (levels && levels.length > 0) {
          let userProgressMap = new Map<number, { currentStage: number; isCompleted: boolean }>();
          if (userId) {
            const progress = await prisma.userProgress.findMany({
              where: { userId },
            });
            progress.forEach((p) => {
              userProgressMap.set(p.sublevelId, {
                currentStage: p.currentStage,
                isCompleted: p.isCompleted,
              });
            });
          }

          let previousSublevelCompleted = true;

          return levels.map((lvl) => {
            const tierSublevels = lvl.sublevels.filter((sub: any) => (sub.tier || 'BEGINNER') === activeTier);
            const sublevels = tierSublevels.map((sub) => {
              const userProgress = userProgressMap.get(sub.id);

              let status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' = 'LOCKED';
              if (userProgress?.isCompleted) {
                status = 'COMPLETED';
              } else if (userProgress || previousSublevelCompleted) {
                status = 'UNLOCKED';
              } else {
                status = 'LOCKED';
              }

              previousSublevelCompleted = userProgress?.isCompleted ?? false;

              return {
                id: sub.id,
                levelId: sub.levelId,
                title: sub.title,
                orderIndex: sub.orderIndex,
                tier: (sub as any).tier || activeTier,
                sublevelType: (sub as any).sublevelType || 'CODE_BASED',
                status,
                currentStage: userProgress ? userProgress.currentStage : 1,
                stagesCount: sub.stages.length,
                stages: sub.stages,
              };
            });

            return {
              id: lvl.id,
              title: lvl.title,
              orderIndex: lvl.orderIndex,
              icon: lvl.icon,
              description: (lvl as any).description || '',
              sublevels,
            };
          });
        }
      } catch {
        // Offline fallback
      }
    }

    // 2. High-fidelity Offline Curriculum Catalog with Memory Progress
    const progs = (userId ? memoryProgress.get(userId) : null) || memoryProgress.get('user_default_aryan') || [];
    const progressMap = new Map<number, { currentStage: number; isCompleted: boolean }>();
    for (const p of progs) {
      progressMap.set(p.sublevelId, {
        currentStage: p.currentStage,
        isCompleted: p.isCompleted,
      });
    }

    let previousSublevelCompleted = true;

    return CURRICULUM_CATALOG.map((lvl) => {
      const tierSublevels = lvl.sublevels.filter((sub) => sub.tier === activeTier);
      const sublevels = tierSublevels.map((sub) => {
        const uProg = progressMap.get(sub.id);

        let status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' = 'LOCKED';
        if (uProg?.isCompleted) {
          status = 'COMPLETED';
        } else if (uProg || previousSublevelCompleted) {
          status = 'UNLOCKED';
        } else {
          status = 'LOCKED';
        }

        previousSublevelCompleted = uProg?.isCompleted ?? false;

        const maxStage = getStagesCountForType(sub.sublevelType);
        const currentStage = uProg ? uProg.currentStage : 1;

        return {
          id: sub.id,
          levelId: lvl.id,
          title: sub.title,
          orderIndex: sub.orderIndex,
          tier: sub.tier,
          sublevelType: sub.sublevelType,
          concepts: sub.concepts,
          status,
          currentStage,
          stagesCount: maxStage,
          badge: sub.badge,
        };
      });

      return {
        id: lvl.id,
        title: lvl.title,
        orderIndex: lvl.orderIndex,
        icon: lvl.icon,
        description: lvl.description,
        sublevels,
      };
    });
  }

  async getSublevel(sublevelId: number, userId?: string) {
    // 1. Try Prisma DB
    try {
      const sublevel = await prisma.sublevel.findUnique({
        where: { id: sublevelId },
        include: {
          level: true,
          stages: {
            orderBy: { stageNumber: 'asc' },
          },
        },
      });

      if (sublevel) {
        let currentStage = 1;
        let isCompleted = false;

        if (userId) {
          const progress = await prisma.userProgress.findUnique({
            where: {
              userId_sublevelId: {
                userId,
                sublevelId,
              },
            },
          });
          if (progress) {
            currentStage = progress.currentStage;
            isCompleted = progress.isCompleted;
          }
        }

        const stagesWithStatus = sublevel.stages.map((stage) => {
          let status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' = 'LOCKED';
          if (isCompleted || stage.stageNumber < currentStage) {
            status = 'COMPLETED';
          } else if (stage.stageNumber === currentStage) {
            status = 'UNLOCKED';
          } else {
            status = 'LOCKED';
          }

          return {
            ...stage,
            status,
          };
        });

        return {
          sublevel: {
            id: sublevel.id,
            title: sublevel.title,
            orderIndex: sublevel.orderIndex,
            tier: (sublevel as any).tier || 'BEGINNER',
            sublevelType: (sublevel as any).sublevelType || 'CODE_BASED',
            level: sublevel.level,
          },
          currentStage,
          isCompleted,
          stages: stagesWithStatus,
        };
      }
    } catch {
      // Offline fallback
    }

    // 2. High fidelity offline fallback from CURRICULUM_CATALOG
    const subDef = getSublevelById(sublevelId) || CURRICULUM_CATALOG[0].sublevels[0];
    const lvlDef = CURRICULUM_CATALOG.find((l) => l.id === subDef.levelId) || CURRICULUM_CATALOG[0];

    const progs = (userId ? memoryProgress.get(userId) : null) || memoryProgress.get('user_default_aryan') || [];
    const userProg = progs.find((p: any) => p.sublevelId === sublevelId);

    const currentStage = userProg ? userProg.currentStage : 1;
    const isCompleted = userProg ? userProg.isCompleted : false;

    const stages = buildAdaptiveStagesList(subDef, currentStage, isCompleted);

    return {
      sublevel: {
        id: subDef.id,
        title: subDef.title,
        orderIndex: subDef.orderIndex,
        tier: subDef.tier,
        sublevelType: subDef.sublevelType,
        badge: subDef.badge,
        level: {
          id: lvlDef.id,
          title: lvlDef.title,
          orderIndex: lvlDef.orderIndex,
          icon: lvlDef.icon,
          description: lvlDef.description,
        },
      },
      currentStage,
      isCompleted,
      stages,
    };
  }

  async getStage(sublevelId: number, stageNumber: number, userId?: string) {
    // 1. Try DB
    try {
      const stage = await prisma.stage.findUnique({
        where: {
          sublevelId_stageNumber: {
            sublevelId,
            stageNumber,
          },
        },
        include: {
          sublevel: {
            include: { level: true },
          },
        },
      });

      if (stage && stage.contentJson) {
        return stage;
      }
    } catch {
      // Offline fallback
    }

    // 2. High fidelity offline lookup from CURRICULUM_CATALOG
    const subDef = getSublevelById(sublevelId) || CURRICULUM_CATALOG[0].sublevels[0];
    const lvlDef = CURRICULUM_CATALOG.find((l) => l.id === subDef.levelId) || CURRICULUM_CATALOG[0];

    const type = subDef.sublevelType || 'CODE_BASED';

    // Map stageNumber to stageType based on sublevelType
    let stageType = 'THEORY';
    let stageTitle = `Stage ${stageNumber}: ${subDef.title}`;
    let contentJson: any = {};

    if (type === 'THEORETICAL') {
      if (stageNumber === 1) {
        stageType = 'THEORY';
        stageTitle = `Theory: ${subDef.title}`;
        contentJson = subDef.stages.theory;
      } else if (stageNumber === 2) {
        stageType = 'QUIZ';
        stageTitle = `Quiz: ${subDef.title}`;
        contentJson = subDef.stages.quiz;
      } else {
        stageType = 'BOSS';
        stageTitle = subDef.stages.boss.title;
        contentJson = subDef.stages.boss;
      }
    } else if (type === 'HYBRID') {
      if (stageNumber === 1) {
        stageType = 'THEORY';
        stageTitle = `Theory: ${subDef.title}`;
        contentJson = subDef.stages.theory;
      } else if (stageNumber === 2) {
        stageType = 'VISUALIZATION';
        stageTitle = `Visualization: ${subDef.title}`;
        contentJson = subDef.stages.visualization || {
          initialArray: [10, 20, 30, 40],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: `Initialize ${subDef.title}`, codeLine: '// Start' },
            { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: `Processing ${subDef.title}`, codeLine: '// Step' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: `Advancing ${subDef.title}`, codeLine: '// Step' },
            { activeIndices: [3], pointerLeft: 3, pointerRight: 3, action: `Complete ${subDef.title}`, codeLine: '// Done' },
          ],
        };
      } else if (stageNumber === 3) {
        stageType = 'DRY_RUN';
        stageTitle = `Dry Run: ${subDef.title}`;
        contentJson = subDef.stages.dryRun || {
          code: `function run() {\n  return "${subDef.title}";\n}`,
          traceRows: [{ iteration: 1, action: 'Trace step' }],
        };
      } else if (stageNumber === 4) {
        stageType = 'QUIZ';
        stageTitle = `Quiz: ${subDef.title}`;
        contentJson = subDef.stages.quiz;
      } else {
        stageType = 'BOSS';
        stageTitle = subDef.stages.boss.title;
        contentJson = subDef.stages.boss;
      }
    } else {
      // CODE_BASED: 8 stages
      switch (stageNumber) {
        case 1:
          stageType = 'THEORY';
          stageTitle = `Theory: ${subDef.title}`;
          contentJson = subDef.stages.theory;
          break;
        case 2:
          stageType = 'VISUALIZATION';
          stageTitle = `Visualization: ${subDef.title}`;
          contentJson = subDef.stages.visualization || {
            initialArray: [10, 20, 30, 40],
            steps: [
              { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: `Initialize ${subDef.title}`, codeLine: '// Start' },
              { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: `Processing ${subDef.title}`, codeLine: '// Step' },
              { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: `Advancing ${subDef.title}`, codeLine: '// Step' },
              { activeIndices: [3], pointerLeft: 3, pointerRight: 3, action: `Complete ${subDef.title}`, codeLine: '// Done' },
            ],
          };
          break;
        case 3:
          stageType = 'DRY_RUN';
          stageTitle = `Dry Run: ${subDef.title}`;
          contentJson = subDef.stages.dryRun || {
            code: `function run() {\n  return "${subDef.title}";\n}`,
            traceRows: [{ iteration: 1, action: 'Trace step' }],
          };
          break;
        case 4:
          stageType = 'GUIDED_CODE';
          stageTitle = `Guided Code: ${subDef.title}`;
          contentJson = subDef.stages.guidedCode;
          break;
        case 5:
          stageType = 'EASY_PROBLEM';
          stageTitle = subDef.stages.easyProblem?.title || `Easy: ${subDef.title}`;
          contentJson = subDef.stages.easyProblem;
          break;
        case 6:
          stageType = 'MEDIUM_PROBLEM';
          stageTitle = subDef.stages.mediumProblem?.title || `Medium: ${subDef.title}`;
          contentJson = subDef.stages.mediumProblem;
          break;
        case 7:
          stageType = 'QUIZ';
          stageTitle = `Quiz: ${subDef.title}`;
          contentJson = subDef.stages.quiz;
          break;
        case 8:
        default:
          stageType = 'BOSS';
          stageTitle = subDef.stages.boss.title;
          contentJson = subDef.stages.boss;
          break;
      }
    }

    return {
      id: stageNumber,
      sublevelId,
      stageNumber,
      stageType,
      title: stageTitle,
      contentJson,
      sublevel: {
        id: subDef.id,
        title: subDef.title,
        orderIndex: subDef.orderIndex,
        tier: subDef.tier,
        sublevelType: subDef.sublevelType,
        level: {
          id: lvlDef.id,
          title: lvlDef.title,
          orderIndex: lvlDef.orderIndex,
          icon: lvlDef.icon,
        },
      },
    };
  }
}

export const roadmapService = new RoadmapService();
