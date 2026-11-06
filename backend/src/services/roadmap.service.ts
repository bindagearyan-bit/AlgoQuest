import prisma from '../config/prisma';

const MOCK_LEVELS = [
  {
    id: 1,
    title: 'Foundations & Core Mechanics',
    orderIndex: 1,
    icon: '⚔️',
    sublevels: [
      { id: 1, levelId: 1, title: 'Asymptotic Analysis & Big-O', orderIndex: 1, status: 'UNLOCKED', currentStage: 1, stagesCount: 8 },
      { id: 2, levelId: 1, title: 'Static & Dynamic Arrays', orderIndex: 2, status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 3, levelId: 1, title: 'Dual Pointers Mechanics', orderIndex: 3, status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 4, levelId: 1, title: 'Sliding Window Patterns', orderIndex: 4, status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
  {
    id: 2,
    title: 'Linear Data Structures',
    orderIndex: 2,
    icon: '🛡️',
    sublevels: [
      { id: 11, levelId: 2, title: 'Singly Linked Lists', orderIndex: 1, status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 12, levelId: 2, title: 'Stack Protocol & Monotonic Stacks', orderIndex: 2, status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
  {
    id: 3,
    title: 'Hierarchical & Non-Linear Trees',
    orderIndex: 3,
    icon: '🌲',
    sublevels: [
      { id: 21, levelId: 3, title: 'Binary Tree Traversal Invariant', orderIndex: 1, status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 22, levelId: 3, title: 'Binary Search Trees (BST)', orderIndex: 2, status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
];

export class RoadmapService {
  async getLevels(userId?: string) {
    try {
      const levels = await prisma.level.findMany({
        orderBy: { orderIndex: 'asc' },
        include: {
          sublevels: {
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
          const sublevels = lvl.sublevels.map((sub, index) => {
            const userProgress = userProgressMap.get(sub.id);
            const isFirst = lvl.orderIndex === 1 && index === 0;

            let status: 'LOCKED' | 'UNLOCKED' | 'COMPLETED' = 'LOCKED';
            if (userProgress?.isCompleted) {
              status = 'COMPLETED';
            } else if (isFirst || userProgress || previousSublevelCompleted) {
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
            sublevels,
          };
        });
      }
    } catch (e) {
      // Fallback for offline development or testing without live DB
    }

    return MOCK_LEVELS;
  }

  async getSublevel(sublevelId: number, userId?: string) {
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
            level: sublevel.level,
          },
          currentStage,
          isCompleted,
          stages: stagesWithStatus,
        };
      }
    } catch (e) {
      // Fallback for offline dev
    }

    return {
      sublevel: {
        id: sublevelId,
        title: 'Asymptotic Analysis & Big-O',
        orderIndex: 1,
        level: { id: 1, title: 'Foundations & Core Mechanics', orderIndex: 1, icon: '⚔️' },
      },
      currentStage: 1,
      isCompleted: false,
      stages: [
        { id: 1, stageNumber: 1, stageType: 'THEORY', title: 'Theory: Big-O Bounds', status: 'UNLOCKED' },
        { id: 2, stageNumber: 2, stageType: 'VISUALIZATION', title: 'Visualization: Growth Curves', status: 'LOCKED' },
        { id: 3, stageNumber: 3, stageType: 'DRY_RUN', title: 'Dry Run: Loop Counting', status: 'LOCKED' },
        { id: 4, stageNumber: 4, stageType: 'GUIDED_CODE', title: 'Guided Example: Binary Search', status: 'LOCKED' },
        { id: 5, stageNumber: 5, stageType: 'EASY_PROBLEM', title: 'Easy: Constant vs Linear', status: 'LOCKED' },
        { id: 6, stageNumber: 6, stageType: 'MEDIUM_PROBLEM', title: 'Medium: Logarithmic Scaling', status: 'LOCKED' },
        { id: 7, stageNumber: 7, stageType: 'QUIZ', title: 'Stage Quiz: Big-O Mastery', status: 'LOCKED' },
        { id: 8, stageNumber: 8, stageType: 'BOSS', title: 'Boss: Master Theorem Gauntlet', status: 'LOCKED' },
      ],
    };
  }

  async getStage(sublevelId: number, stageNumber: number, userId?: string) {
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

      if (stage) {
        return stage;
      }
    } catch (e) {
      // Fallback
    }

    return {
      id: stageNumber,
      sublevelId,
      stageNumber,
      stageType: stageNumber === 1 ? 'THEORY' : stageNumber === 2 ? 'VISUALIZATION' : 'DRY_RUN',
      title: `Stage ${stageNumber}: Fundamental Concepts`,
      contentJson: {
        eli5: 'Welcome to this quest stage! Here we explore time complexity and memory mechanics.',
        keyTakeaways: ['O(1) is instant', 'O(log N) cuts in half', 'O(N) touches each element once'],
        codeSnippet: 'int n = arr.length;\nfor (int i = 0; i < n; i++) {\n    // O(N) loop\n}',
        initialArray: [10, 20, 30, 40, 50],
        steps: [
          { activeIndices: [0, 4], pointerLeft: 0, pointerRight: 4, action: 'Inspect boundaries', codeLine: 'int left = 0, right = 4;' },
        ],
      },
    };
  }
}

export const roadmapService = new RoadmapService();
