import prisma from '../config/prisma';

export interface SublevelItem {
  id: number;
  levelId: number;
  title: string;
  orderIndex: number;
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  concepts?: string;
  status?: 'LOCKED' | 'UNLOCKED' | 'COMPLETED';
  currentStage?: number;
  stagesCount?: number;
  stages?: any[];
}

export interface LevelItem {
  id: number;
  title: string;
  orderIndex: number;
  icon: string;
  description: string;
  sublevels: SublevelItem[];
}

export const MOCK_LEVELS: LevelItem[] = [
  {
    id: 1,
    title: 'Level 1: Foundations Island (Beginner Village) — Basics of Data Structures',
    orderIndex: 1,
    icon: '🏡',
    description: 'Unit 1: Data structure fundamentals, ADTs, linear vs non-linear classifications, Big-O asymptotic analysis.',
    sublevels: [
      { id: 1, levelId: 1, orderIndex: 1, title: 'Concept & Need of Data Structures', tier: 'BEGINNER', concepts: 'What is a DS, why we need it, real-world analogies', status: 'UNLOCKED', currentStage: 1, stagesCount: 8 },
      { id: 2, levelId: 1, orderIndex: 2, title: 'Abstract Data Types (ADTs)', tier: 'BEGINNER', concepts: 'ADT definition, interface vs implementation', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 3, levelId: 1, orderIndex: 3, title: 'Types of Data Structures', tier: 'BEGINNER', concepts: 'Linear vs Non-Linear, Primitive vs Non-Primitive', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 4, levelId: 1, orderIndex: 4, title: 'Operations on Data Structures', tier: 'BEGINNER', concepts: 'Insert, Delete, Search, Update, Traverse, Sort', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 5, levelId: 1, orderIndex: 5, title: 'Time Complexity & Big-O Notation', tier: 'INTERMEDIATE', concepts: 'Big-O, Big-Omega, Big-Theta, growth rates', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 6, levelId: 1, orderIndex: 6, title: 'Space Complexity Analysis', tier: 'INTERMEDIATE', concepts: 'Auxiliary space vs input space, recursion stack', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 7, levelId: 1, orderIndex: 7, title: 'BOSS: Foundations Guardian', tier: 'ADVANCED', concepts: 'Comprehensive Unit 1 Master Challenge', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
  {
    id: 2,
    title: 'Level 2: Searching & Sorting Citadel (Central Castle) — Searching & Sorting',
    orderIndex: 2,
    icon: '🏰',
    description: 'Unit 2: Linear & Binary search, hashing collision resolution, O(N^2) comparison sorts, Merge Sort, Quick Sort, and Radix/Tim Sort.',
    sublevels: [
      { id: 11, levelId: 2, orderIndex: 1, title: 'Linear Search', tier: 'BEGINNER', concepts: 'Sequential scan, best/worst case, implementation', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 12, levelId: 2, orderIndex: 2, title: 'Binary Search (Iterative & Recursive)', tier: 'BEGINNER', concepts: 'Divide and conquer, sorted prerequisite, mid calculation', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 13, levelId: 2, orderIndex: 3, title: 'Sentinel Search & Fibonacci Search', tier: 'INTERMEDIATE', concepts: 'Boundary elimination, golden ratio division', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 14, levelId: 2, orderIndex: 4, title: 'Hashing & Collision Resolution', tier: 'INTERMEDIATE', concepts: 'Hash functions, chaining, open addressing (linear, quadratic)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 15, levelId: 2, orderIndex: 5, title: 'Bubble, Selection & Insertion Sort', tier: 'BEGINNER', concepts: 'Elementary O(N^2) sorts, stability, adaptive nature', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 16, levelId: 2, orderIndex: 6, title: 'Merge Sort', tier: 'INTERMEDIATE', concepts: 'Divide-and-conquer, 2-way merge, recursion tree', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 17, levelId: 2, orderIndex: 7, title: 'Quick Sort', tier: 'INTERMEDIATE', concepts: 'Pivot selection, Lomuto vs Hoare partition, worst case', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 18, levelId: 2, orderIndex: 8, title: 'Radix Sort, Tim Sort & Shell Sort', tier: 'ADVANCED', concepts: 'Non-comparison sorts, gap sequences, hybrid sorting', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 19, levelId: 2, orderIndex: 9, title: 'BOSS: Sort Master Trial', tier: 'ADVANCED', concepts: 'Comprehensive Unit 2 Master Challenge', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
  {
    id: 3,
    title: 'Level 3: Stacks & Queues Sanctuary (Sky Windmills) — Stacks & Queues',
    orderIndex: 3,
    icon: '🍃',
    description: 'Unit 3: LIFO stacks, overflow/underflow, bracket balancing, infix to postfix shunting yard, FIFO queues, circular buffers, and priority queues.',
    sublevels: [
      { id: 21, levelId: 3, orderIndex: 1, title: 'Stack Definition & Array Representation', tier: 'BEGINNER', concepts: 'LIFO principle, top pointer, fixed-size buffer', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 22, levelId: 3, orderIndex: 2, title: 'Stack ADT & Overflow/Underflow Conditions', tier: 'BEGINNER', concepts: 'push(), pop(), peek(), isEmpty(), isFull()', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 23, levelId: 3, orderIndex: 3, title: 'Stack Applications: Reversing a List & Parentheses Matching', tier: 'INTERMEDIATE', concepts: 'Balanced brackets validation, string reversal', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 24, levelId: 3, orderIndex: 4, title: 'Polish Notation: Infix to Postfix & Evaluation', tier: 'ADVANCED', concepts: 'Operator precedence, shunting-yard, postfix eval', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 25, levelId: 3, orderIndex: 5, title: 'Queue Definition & Array Representation', tier: 'BEGINNER', concepts: 'FIFO principle, front and rear pointers', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 26, levelId: 3, orderIndex: 6, title: 'Queue ADT & Operations', tier: 'BEGINNER', concepts: 'enqueue(), dequeue(), front(), isEmpty()', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 27, levelId: 3, orderIndex: 7, title: 'Linear Queue vs Circular Queue', tier: 'INTERMEDIATE', concepts: 'False overflow problem, modulo arithmetic wrapping', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 28, levelId: 3, orderIndex: 8, title: 'Priority Queue & Deque (Double-Ended Queue)', tier: 'ADVANCED', concepts: 'Min/max priority, insertion order, double-ended operations', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 29, levelId: 3, orderIndex: 9, title: 'BOSS: Fortress Keeper', tier: 'ADVANCED', concepts: 'Comprehensive Unit 3 Master Challenge', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
  {
    id: 4,
    title: 'Level 4: Linked Structures Labyrinth (Stone Ruins) — Linked Lists',
    orderIndex: 4,
    icon: '⛓️',
    description: 'Unit 4: Dynamic node linking, singly/doubly/circular lists, dynamic storage allocation, XOR linked lists, unrolled lists, and skip lists.',
    sublevels: [
      { id: 31, levelId: 4, orderIndex: 1, title: 'Linked List Terminologies & Memory Structure', tier: 'BEGINNER', concepts: 'Nodes, pointers, dynamic memory allocation vs arrays', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 32, levelId: 4, orderIndex: 2, title: 'Singly Linked List: Insertion, Deletion & Traversal', tier: 'BEGINNER', concepts: 'Head pointer, insert at head/tail/pos, delete node', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 33, levelId: 4, orderIndex: 3, title: 'Doubly Linked List Operations', tier: 'INTERMEDIATE', concepts: 'prev and next pointers, bidirectional traversal', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 34, levelId: 4, orderIndex: 4, title: 'Circular Linked List Operations', tier: 'INTERMEDIATE', concepts: 'Last node points to head, circular traversal', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 35, levelId: 4, orderIndex: 5, title: 'Linked Representation of Stack & Queue', tier: 'INTERMEDIATE', concepts: 'Dynamic stack with push/pop at head, queue with head/tail', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 36, levelId: 4, orderIndex: 6, title: 'Dynamic Storage Management', tier: 'ADVANCED', concepts: 'Free list, memory allocation algorithms (first-fit, best-fit)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 37, levelId: 4, orderIndex: 7, title: 'Memory Efficient Doubly Linked List (XOR Linked List)', tier: 'ADVANCED', concepts: 'XOR of addresses, bitwise pointer arithmetic', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 38, levelId: 4, orderIndex: 8, title: 'Unrolled Linked List', tier: 'ADVANCED', concepts: 'Array of elements inside each node, cache locality', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 39, levelId: 4, orderIndex: 9, title: 'Skip List', tier: 'ADVANCED', concepts: 'Multi-level forward pointers, O(log N) search', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 40, levelId: 4, orderIndex: 10, title: 'BOSS: Chain Breaker', tier: 'ADVANCED', concepts: 'Comprehensive Unit 4 Master Challenge', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
  {
    id: 5,
    title: 'Level 5: Arboretum of Trees (Ancient Canopy) — Trees',
    orderIndex: 5,
    icon: '🌲',
    description: 'Unit 5: Non-linear hierarchical trees, inorder/preorder/postorder traversals, BST operations, AVL balance factors, B/B+ trees, heaps, and heap sort.',
    sublevels: [
      { id: 41, levelId: 5, orderIndex: 1, title: 'Tree Terminologies & Traversals Concept', tier: 'BEGINNER', concepts: 'Root, edge, parent, child, leaf, depth, height, degree', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 42, levelId: 5, orderIndex: 2, title: 'Types of Trees', tier: 'BEGINNER', concepts: 'Binary tree, strictly binary, complete, full, skewed', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 43, levelId: 5, orderIndex: 3, title: 'Recursive Traversals: Inorder, Preorder, Postorder', tier: 'INTERMEDIATE', concepts: 'Traversal orders, recursion call stack', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 44, levelId: 5, orderIndex: 4, title: 'Binary Search Trees (BST): Insertion, Deletion, Search', tier: 'INTERMEDIATE', concepts: 'BST property, min/max finding, deletion (3 cases)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 45, levelId: 5, orderIndex: 5, title: 'Expression Trees', tier: 'INTERMEDIATE', concepts: 'Construction from postfix, evaluation via postorder', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 46, levelId: 5, orderIndex: 6, title: 'AVL Trees: Rotations & Balancing', tier: 'ADVANCED', concepts: 'Balance factor, LL, RR, LR, RL rotations', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 47, levelId: 5, orderIndex: 7, title: 'B-Tree & B+ Tree Concepts', tier: 'ADVANCED', concepts: 'Multi-way search trees, disk-optimized nodes, range queries', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 48, levelId: 5, orderIndex: 8, title: 'Heaps: Max-Heap & Min-Heap Operations', tier: 'ADVANCED', concepts: 'Complete binary tree in array, heapify up/down', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 49, levelId: 5, orderIndex: 9, title: 'Heap Sort Algorithm', tier: 'ADVANCED', concepts: 'Build max-heap, repeated extract-max, in-place O(N log N)', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 50, levelId: 5, orderIndex: 10, title: 'BOSS: Forest Ancient', tier: 'ADVANCED', concepts: 'Comprehensive Unit 5 Master Challenge', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
  {
    id: 6,
    title: 'Level 6: Graph Glacier & Sparse Matrices (Frozen Peaks) — Graphs',
    orderIndex: 6,
    icon: '❄️',
    description: 'Unit 6: Graph theory, adjacency representations, BFS/DFS traversals, and memory-efficient sparse matrix representations and transpose.',
    sublevels: [
      { id: 51, levelId: 6, orderIndex: 1, title: 'Graph Theory Basics & Terminologies', tier: 'BEGINNER', concepts: 'Vertices, edges, directed vs undirected, weighted, cyclic', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 52, levelId: 6, orderIndex: 2, title: 'Storage Representation: Adjacency Matrix & Adjacency List', tier: 'INTERMEDIATE', concepts: '2D matrix vs array of linked lists, space/time trade-offs', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 53, levelId: 6, orderIndex: 3, title: 'Basic Graph Manipulation: Add/Remove Vertex & Edge', tier: 'INTERMEDIATE', concepts: 'Dynamic graph operations, degree calculation', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 54, levelId: 6, orderIndex: 4, title: 'Breadth-First Search (BFS) Traversal', tier: 'ADVANCED', concepts: 'Queue-based traversal, shortest path in unweighted graph', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 55, levelId: 6, orderIndex: 5, title: 'Depth-First Search (DFS) Traversal', tier: 'ADVANCED', concepts: 'Stack/recursion traversal, cycle detection, connected components', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 56, levelId: 6, orderIndex: 6, title: 'Introduction to Sparse Matrix', tier: 'ADVANCED', concepts: 'Definition, memory wastage in dense representation', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 57, levelId: 6, orderIndex: 7, title: 'Sparse Matrix Linked Representation', tier: 'ADVANCED', concepts: 'Row-column header nodes, multi-linked list of triplets', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 58, levelId: 6, orderIndex: 8, title: 'Transpose of Sparse Matrix', tier: 'ADVANCED', concepts: 'Fast transpose algorithm, row-major to column-major', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
      { id: 59, levelId: 6, orderIndex: 9, title: 'BOSS: Glacier Oracle', tier: 'ADVANCED', concepts: 'Comprehensive Unit 6 Master Challenge', status: 'LOCKED', currentStage: 1, stagesCount: 8 },
    ],
  },
];

// Flat lookup map of all 54 sublevels
const ALL_SUBLEVELS_MAP = new Map<number, SublevelItem>();
MOCK_LEVELS.forEach((lvl) => {
  lvl.sublevels.forEach((sub) => {
    ALL_SUBLEVELS_MAP.set(sub.id, sub);
  });
});

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
              tier: (sub as any).tier || 'BEGINNER',
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
            tier: (sublevel as any).tier || 'BEGINNER',
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

    // High fidelity offline fallback from MOCK_LEVELS
    const mockSub = ALL_SUBLEVELS_MAP.get(sublevelId) || {
      id: sublevelId,
      levelId: 1,
      orderIndex: 1,
      title: 'Concept & Need of Data Structures',
      tier: 'BEGINNER' as const,
      concepts: 'What is a DS, why we need it, real-world analogies',
    };

    const mockLvl = MOCK_LEVELS.find((l) => l.id === mockSub.levelId) || MOCK_LEVELS[0];

    const STAGE_TYPES = [
      'THEORY',
      'VISUALIZATION',
      'DRY_RUN',
      'GUIDED_CODE',
      'EASY_PROBLEM',
      'MEDIUM_PROBLEM',
      'QUIZ',
      'BOSS',
    ];

    const STAGE_TITLES = [
      `Theory: ${mockSub.title} Fundamentals`,
      `Visualization: ${mockSub.title} Dungeon Debugger`,
      `Dry Run: Step-by-Step Trace of ${mockSub.title}`,
      `Guided Code: Implement ${mockSub.title}`,
      `Easy Challenge: ${mockSub.title} Core Task`,
      `Medium Challenge: Optimized ${mockSub.title}`,
      `Stage Quiz: Mastery Test on ${mockSub.title}`,
      `Boss Fight: Conquering ${mockSub.title}`,
    ];

    const stages = STAGE_TYPES.map((type, idx) => ({
      id: idx + 1,
      stageNumber: idx + 1,
      stageType: type,
      title: STAGE_TITLES[idx],
      status: idx === 0 ? ('UNLOCKED' as const) : ('LOCKED' as const),
    }));

    return {
      sublevel: {
        id: mockSub.id,
        title: mockSub.title,
        orderIndex: mockSub.orderIndex,
        tier: mockSub.tier,
        level: { id: mockLvl.id, title: mockLvl.title, orderIndex: mockLvl.orderIndex, icon: mockLvl.icon },
      },
      currentStage: 1,
      isCompleted: false,
      stages,
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

      if (stage && stage.contentJson) {
        const content = stage.contentJson as any;
        if (stage.stageType === 'VISUALIZATION' && (!content.steps || content.steps.length <= 1)) {
          content.initialArray = [10, 20, 30, 40, 50, 60, 70, 80];
          content.steps = [
            { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: `Initialize execution for ${stage.title}. Left=0 (10), Right=7 (80). Target key=50.`, codeLine: 'int left = 0, right = arr.length - 1;' },
            { activeIndices: [3], pointerLeft: 0, pointerRight: 7, action: 'Calculate midpoint: mid = (0 + 7) / 2 = 3. arr[3] = 40. Compare with target 50.', codeLine: 'int mid = left + (right - left) / 2;' },
            { activeIndices: [4, 7], pointerLeft: 4, pointerRight: 7, action: 'arr[3] = 40 < 50. Target is in upper half! Advance left = mid + 1 = 4.', codeLine: 'if (arr[mid] < target) left = mid + 1;' },
            { activeIndices: [5], pointerLeft: 4, pointerRight: 7, action: 'Calculate next midpoint: mid = (4 + 7) / 2 = 5. arr[5] = 60. Compare with target 50.', codeLine: 'mid = left + (right - left) / 2;' },
            { activeIndices: [4, 4], pointerLeft: 4, pointerRight: 4, action: 'arr[5] = 60 > 50. Target is smaller! Decrement right = mid - 1 = 4.', codeLine: 'else right = mid - 1;' },
            { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: 'Evaluating remaining element: mid = (4 + 4) / 2 = 4. arr[4] = 50. MATCH IDENTIFIED!', codeLine: 'if (arr[mid] == target) return mid;' },
            { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: 'Success! Element 50 verified in dataset under algorithmic invariant.', codeLine: '// Operation complete with O(log N) efficiency' },
          ];
        }
        return stage;
      }
    } catch (e) {
      // Fallback
    }

    const mockSub = ALL_SUBLEVELS_MAP.get(sublevelId) || {
      id: sublevelId,
      levelId: 1,
      orderIndex: 1,
      title: 'Concept & Need of Data Structures',
      tier: 'BEGINNER' as const,
      concepts: 'What is a DS, why we need it, real-world analogies',
    };

    const stageType =
      stageNumber === 1
        ? 'THEORY'
        : stageNumber === 2
        ? 'VISUALIZATION'
        : stageNumber === 3
        ? 'DRY_RUN'
        : stageNumber === 4
        ? 'GUIDED_CODE'
        : stageNumber === 5
        ? 'EASY_PROBLEM'
        : stageNumber === 6
        ? 'MEDIUM_PROBLEM'
        : stageNumber === 7
        ? 'QUIZ'
        : 'BOSS';

    const stageTitles = [
      `Theory: ${mockSub.title} Fundamentals`,
      `Visualization: ${mockSub.title} Dungeon Debugger`,
      `Dry Run: Step-by-Step Trace of ${mockSub.title}`,
      `Guided Code: Implement ${mockSub.title}`,
      `Easy Challenge: ${mockSub.title} Core Task`,
      `Medium Challenge: Optimized ${mockSub.title}`,
      `Stage Quiz: Mastery Test on ${mockSub.title}`,
      `Boss Fight: Conquering ${mockSub.title}`,
    ];

    let contentJson: any = {};

    if (stageType === 'THEORY') {
      contentJson = {
        eli5: `In algorithmic quests, "${mockSub.title}" is a cornerstone data structure topic. Concept focus: ${mockSub.concepts}.`,
        keyTakeaways: [
          `Key concept: ${mockSub.concepts}.`,
          'Ensures deterministic state transitions across all computational boundaries.',
          'Conserves CPU cycles and minimizes memory footprint according to syllabus requirements.',
        ],
        codeSnippet: `// Canonical Pattern for ${mockSub.title}\n// Concept: ${mockSub.concepts}\nfunction executeOperation(dataset, target) {\n    let left = 0, right = dataset.length - 1;\n    while (left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if (dataset[mid] === target) return mid;\n        if (dataset[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
        timeComplexity: 'O(log N) to O(N)',
        spaceComplexity: 'O(1) auxiliary',
      };
    } else if (stageType === 'VISUALIZATION') {
      contentJson = {
        initialArray: [10, 20, 30, 40, 50, 60, 70, 80],
        steps: [
          { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: `Initialize execution for ${mockSub.title}. Left=0 (10), Right=7 (80). Target key=50.`, codeLine: 'int left = 0, right = arr.length - 1;' },
          { activeIndices: [3], pointerLeft: 0, pointerRight: 7, action: 'Calculate midpoint: mid = (0 + 7) / 2 = 3. arr[3] = 40. Compare with target 50.', codeLine: 'int mid = left + (right - left) / 2;' },
          { activeIndices: [4, 7], pointerLeft: 4, pointerRight: 7, action: 'arr[3] = 40 < 50. Target is in upper half! Advance left = mid + 1 = 4.', codeLine: 'if (arr[mid] < target) left = mid + 1;' },
          { activeIndices: [5], pointerLeft: 4, pointerRight: 7, action: 'Calculate next midpoint: mid = (4 + 7) / 2 = 5. arr[5] = 60. Compare with target 50.', codeLine: 'mid = left + (right - left) / 2;' },
          { activeIndices: [4, 4], pointerLeft: 4, pointerRight: 4, action: 'arr[5] = 60 > 50. Target is smaller! Decrement right = mid - 1 = 4.', codeLine: 'else right = mid - 1;' },
          { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: 'Evaluating remaining element: mid = (4 + 4) / 2 = 4. arr[4] = 50. MATCH IDENTIFIED!', codeLine: 'if (arr[mid] == target) return mid;' },
          { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: `Success! Element 50 verified in dataset under ${mockSub.title} invariant.`, codeLine: '// Operation complete with O(log N) efficiency' },
        ],
      };
    } else if (stageType === 'DRY_RUN') {
      contentJson = {
        code: `function traceOperation(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
        traceRows: [
          { iteration: 1, left: 0, right: 7, arrLeft: 10, arrRight: 80, sum: 40, action: 'mid=3 (40) < target(50) -> left = mid + 1 (4)' },
          { iteration: 2, left: 4, right: 7, arrLeft: 50, arrRight: 80, sum: 60, action: 'mid=5 (60) > target(50) -> right = mid - 1 (4)' },
          { iteration: 3, left: 4, right: 4, arrLeft: 50, arrRight: 50, sum: 50, action: 'mid=4 (50) === target(50) -> TARGET FOUND AT INDEX 4' },
        ],
      };
    } else if (stageType === 'GUIDED_CODE') {
      contentJson = {
        prompt: `Implement the algorithmic solution for ${mockSub.title} by filling in the missing pointer updates and boundary checks.`,
        starterCode: {
          python: `def solve(arr: list[int], target: int) -> int:\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            # FILL_BLANK: advance left boundary\n            left = mid + 1\n        else:\n            # FILL_BLANK: decrement right boundary\n            right = mid - 1\n    return -1`,
          cpp: `#include <vector>\nusing namespace std;\n\nint solve(vector<int>& arr, int target) {\n    int left = 0, right = arr.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
          java: `public class Solution {\n    public int solve(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`,
          c: `#include <stdlib.h>\n\nint solve(int* arr, int n, int target) {\n    int left = 0, right = n - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
        },
      };
    } else if (stageType === 'QUIZ') {
      contentJson = {
        questions: [
          {
            id: 1,
            question: `In ${mockSub.title}, which asymptotic notation represents the upper bound?`,
            options: ['Big-O (O)', 'Big-Omega (Ω)', 'Big-Theta (Θ)', 'Little-o (o)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: `What is the key principle behind: "${mockSub.concepts}"?`,
            options: [
              'Optimal memory and time trade-off invariant',
              'Randomized memory allocation with no bounds',
              'Strict quadratic slowdown requirement',
              'Unbounded recursive call allocations',
            ],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: `What is the optimal complexity guarantee for standard operations in ${mockSub.title}?`,
            options: ['O(log N) or O(N)', 'O(N!)', 'O(2^N)', 'O(N^3)'],
            correctAnswer: 0,
          },
        ],
      };
    } else {
      contentJson = {
        problemTitle: `${stageType === 'BOSS' ? '👑 BOSS TRIAL' : stageType}: ${mockSub.title}`,
        description: `Implement the optimal solution for ${mockSub.title}. Your implementation must handle edge cases according to the syllabus requirements: ${mockSub.concepts}.`,
        starterCode: {
          python: `class Solution:\n    def solve(self, nums: list[int], target: int) -> list[int]:\n        # Implement ${mockSub.title} solution\n        return [0, 1]`,
          cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        // Implement ${mockSub.title} solution\n        return {0, 1};\n    }\n};`,
          java: `class Solution {\n    public int[] solve(int[] nums, int target) {\n        // Implement ${mockSub.title} solution\n        return new int[]{0, 1};\n    }\n}`,
          c: `int* solve(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = (int*)malloc(2 * sizeof(int));\n    res[0] = 0; res[1] = 1;\n    return res;\n}`,
        },
        testCases: [
          { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
          { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
          { input: '[3, 3], 6', expectedOutput: '[0, 1]' },
        ],
      };
    }

    return {
      id: stageNumber,
      sublevelId,
      stageNumber,
      stageType,
      title: stageTitles[stageNumber - 1],
      contentJson,
    };
  }
}

export const roadmapService = new RoadmapService();
