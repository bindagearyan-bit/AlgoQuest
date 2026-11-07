import { PrismaClient, StageType, Tier, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

export interface SublevelConfig {
  orderIndex: number;
  subId: number;
  title: string;
  tier: Tier;
  concepts: string;
}

export interface LevelConfig {
  orderIndex: number;
  title: string;
  icon: string;
  description: string;
  sublevels: SublevelConfig[];
}

export const CURRICULUM_DATA: LevelConfig[] = [
  {
    orderIndex: 1,
    title: 'Level 1: Foundations Island (Beginner Village) — Basics of Data Structures',
    icon: '🏡',
    description: 'Unit 1: Data structure fundamentals, ADTs, linear vs non-linear classifications, Big-O asymptotic analysis.',
    sublevels: [
      { orderIndex: 1, subId: 1, title: 'Concept & Need of Data Structures', tier: Tier.BEGINNER, concepts: 'What is a DS, why we need it, real-world analogies' },
      { orderIndex: 2, subId: 2, title: 'Abstract Data Types (ADTs)', tier: Tier.BEGINNER, concepts: 'ADT definition, interface vs implementation' },
      { orderIndex: 3, subId: 3, title: 'Types of Data Structures', tier: Tier.BEGINNER, concepts: 'Linear vs Non-Linear, Primitive vs Non-Primitive' },
      { orderIndex: 4, subId: 4, title: 'Operations on Data Structures', tier: Tier.BEGINNER, concepts: 'Insert, Delete, Search, Update, Traverse, Sort' },
      { orderIndex: 5, subId: 5, title: 'Time Complexity & Big-O Notation', tier: Tier.INTERMEDIATE, concepts: 'Big-O, Big-Omega, Big-Theta, growth rates' },
      { orderIndex: 6, subId: 6, title: 'Space Complexity Analysis', tier: Tier.INTERMEDIATE, concepts: 'Auxiliary space vs input space, recursion stack' },
      { orderIndex: 7, subId: 7, title: 'BOSS: Foundations Guardian', tier: Tier.ADVANCED, concepts: 'Comprehensive Unit 1 Master Challenge' },
    ],
  },
  {
    orderIndex: 2,
    title: 'Level 2: Searching & Sorting Citadel (Central Castle) — Searching & Sorting',
    icon: '🏰',
    description: 'Unit 2: Linear & Binary search, hashing collision resolution, O(N^2) comparison sorts, Merge Sort, Quick Sort, and Radix/Tim Sort.',
    sublevels: [
      { orderIndex: 1, subId: 11, title: 'Linear Search', tier: Tier.BEGINNER, concepts: 'Sequential scan, best/worst case, implementation' },
      { orderIndex: 2, subId: 12, title: 'Binary Search (Iterative & Recursive)', tier: Tier.BEGINNER, concepts: 'Divide and conquer, sorted prerequisite, mid calculation' },
      { orderIndex: 3, subId: 13, title: 'Sentinel Search & Fibonacci Search', tier: Tier.INTERMEDIATE, concepts: 'Boundary elimination, golden ratio division' },
      { orderIndex: 4, subId: 14, title: 'Hashing & Collision Resolution', tier: Tier.INTERMEDIATE, concepts: 'Hash functions, chaining, open addressing (linear, quadratic)' },
      { orderIndex: 5, subId: 15, title: 'Bubble, Selection & Insertion Sort', tier: Tier.BEGINNER, concepts: 'Elementary O(N^2) sorts, stability, adaptive nature' },
      { orderIndex: 6, subId: 16, title: 'Merge Sort', tier: Tier.INTERMEDIATE, concepts: 'Divide-and-conquer, 2-way merge, recursion tree' },
      { orderIndex: 7, subId: 17, title: 'Quick Sort', tier: Tier.INTERMEDIATE, concepts: 'Pivot selection, Lomuto vs Hoare partition, worst case' },
      { orderIndex: 8, subId: 18, title: 'Radix Sort, Tim Sort & Shell Sort', tier: Tier.ADVANCED, concepts: 'Non-comparison sorts, gap sequences, hybrid sorting' },
      { orderIndex: 9, subId: 19, title: 'BOSS: Sort Master Trial', tier: Tier.ADVANCED, concepts: 'Comprehensive Unit 2 Master Challenge' },
    ],
  },
  {
    orderIndex: 3,
    title: 'Level 3: Stacks & Queues Sanctuary (Sky Windmills) — Stacks & Queues',
    icon: '🍃',
    description: 'Unit 3: LIFO stacks, overflow/underflow, bracket balancing, infix to postfix shunting yard, FIFO queues, circular buffers, and priority queues.',
    sublevels: [
      { orderIndex: 1, subId: 21, title: 'Stack Definition & Array Representation', tier: Tier.BEGINNER, concepts: 'LIFO principle, top pointer, fixed-size buffer' },
      { orderIndex: 2, subId: 22, title: 'Stack ADT & Overflow/Underflow Conditions', tier: Tier.BEGINNER, concepts: 'push(), pop(), peek(), isEmpty(), isFull()' },
      { orderIndex: 3, subId: 23, title: 'Stack Applications: Reversing a List & Parentheses Matching', tier: Tier.INTERMEDIATE, concepts: 'Balanced brackets validation, string reversal' },
      { orderIndex: 4, subId: 24, title: 'Polish Notation: Infix to Postfix & Evaluation', tier: Tier.ADVANCED, concepts: 'Operator precedence, shunting-yard, postfix eval' },
      { orderIndex: 5, subId: 25, title: 'Queue Definition & Array Representation', tier: Tier.BEGINNER, concepts: 'FIFO principle, front and rear pointers' },
      { orderIndex: 6, subId: 26, title: 'Queue ADT & Operations', tier: Tier.BEGINNER, concepts: 'enqueue(), dequeue(), front(), isEmpty()' },
      { orderIndex: 7, subId: 27, title: 'Linear Queue vs Circular Queue', tier: Tier.INTERMEDIATE, concepts: 'False overflow problem, modulo arithmetic wrapping' },
      { orderIndex: 8, subId: 28, title: 'Priority Queue & Deque (Double-Ended Queue)', tier: Tier.ADVANCED, concepts: 'Min/max priority, insertion order, double-ended operations' },
      { orderIndex: 9, subId: 29, title: 'BOSS: Fortress Keeper', tier: Tier.ADVANCED, concepts: 'Comprehensive Unit 3 Master Challenge' },
    ],
  },
  {
    orderIndex: 4,
    title: 'Level 4: Linked Structures Labyrinth (Stone Ruins) — Linked Lists',
    icon: '⛓️',
    description: 'Unit 4: Dynamic node linking, singly/doubly/circular lists, dynamic storage allocation, XOR linked lists, unrolled lists, and skip lists.',
    sublevels: [
      { orderIndex: 1, subId: 31, title: 'Linked List Terminologies & Memory Structure', tier: Tier.BEGINNER, concepts: 'Nodes, pointers, dynamic memory allocation vs arrays' },
      { orderIndex: 2, subId: 32, title: 'Singly Linked List: Insertion, Deletion & Traversal', tier: Tier.BEGINNER, concepts: 'Head pointer, insert at head/tail/pos, delete node' },
      { orderIndex: 3, subId: 33, title: 'Doubly Linked List Operations', tier: Tier.INTERMEDIATE, concepts: 'prev and next pointers, bidirectional traversal' },
      { orderIndex: 4, subId: 34, title: 'Circular Linked List Operations', tier: Tier.INTERMEDIATE, concepts: 'Last node points to head, circular traversal' },
      { orderIndex: 5, subId: 35, title: 'Linked Representation of Stack & Queue', tier: Tier.INTERMEDIATE, concepts: 'Dynamic stack with push/pop at head, queue with head/tail' },
      { orderIndex: 6, subId: 36, title: 'Dynamic Storage Management', tier: Tier.ADVANCED, concepts: 'Free list, memory allocation algorithms (first-fit, best-fit)' },
      { orderIndex: 7, subId: 37, title: 'Memory Efficient Doubly Linked List (XOR Linked List)', tier: Tier.ADVANCED, concepts: 'XOR of addresses, bitwise pointer arithmetic' },
      { orderIndex: 8, subId: 38, title: 'Unrolled Linked List', tier: Tier.ADVANCED, concepts: 'Array of elements inside each node, cache locality' },
      { orderIndex: 9, subId: 39, title: 'Skip List', tier: Tier.ADVANCED, concepts: 'Multi-level forward pointers, O(log N) search' },
      { orderIndex: 10, subId: 40, title: 'BOSS: Chain Breaker', tier: Tier.ADVANCED, concepts: 'Comprehensive Unit 4 Master Challenge' },
    ],
  },
  {
    orderIndex: 5,
    title: 'Level 5: Arboretum of Trees (Ancient Canopy) — Trees',
    icon: '🌲',
    description: 'Unit 5: Non-linear hierarchical trees, inorder/preorder/postorder traversals, BST operations, AVL balance factors, B/B+ trees, heaps, and heap sort.',
    sublevels: [
      { orderIndex: 1, subId: 41, title: 'Tree Terminologies & Traversals Concept', tier: Tier.BEGINNER, concepts: 'Root, edge, parent, child, leaf, depth, height, degree' },
      { orderIndex: 2, subId: 42, title: 'Types of Trees', tier: Tier.BEGINNER, concepts: 'Binary tree, strictly binary, complete, full, skewed' },
      { orderIndex: 3, subId: 43, title: 'Recursive Traversals: Inorder, Preorder, Postorder', tier: Tier.INTERMEDIATE, concepts: 'Traversal orders, recursion call stack' },
      { orderIndex: 4, subId: 44, title: 'Binary Search Trees (BST): Insertion, Deletion, Search', tier: Tier.INTERMEDIATE, concepts: 'BST property, min/max finding, deletion (3 cases)' },
      { orderIndex: 5, subId: 45, title: 'Expression Trees', tier: Tier.INTERMEDIATE, concepts: 'Construction from postfix, evaluation via postorder' },
      { orderIndex: 6, subId: 46, title: 'AVL Trees: Rotations & Balancing', tier: Tier.ADVANCED, concepts: 'Balance factor, LL, RR, LR, RL rotations' },
      { orderIndex: 7, subId: 47, title: 'B-Tree & B+ Tree Concepts', tier: Tier.ADVANCED, concepts: 'Multi-way search trees, disk-optimized nodes, range queries' },
      { orderIndex: 8, subId: 48, title: 'Heaps: Max-Heap & Min-Heap Operations', tier: Tier.ADVANCED, concepts: 'Complete binary tree in array, heapify up/down' },
      { orderIndex: 9, subId: 49, title: 'Heap Sort Algorithm', tier: Tier.ADVANCED, concepts: 'Build max-heap, repeated extract-max, in-place O(N log N)' },
      { orderIndex: 10, subId: 50, title: 'BOSS: Forest Ancient', tier: Tier.ADVANCED, concepts: 'Comprehensive Unit 5 Master Challenge' },
    ],
  },
  {
    orderIndex: 6,
    title: 'Level 6: Graph Glacier & Sparse Matrices (Frozen Peaks) — Graphs',
    icon: '❄️',
    description: 'Unit 6: Graph theory, adjacency representations, BFS/DFS traversals, and memory-efficient sparse matrix representations and transpose.',
    sublevels: [
      { orderIndex: 1, subId: 51, title: 'Graph Theory Basics & Terminologies', tier: Tier.BEGINNER, concepts: 'Vertices, edges, directed vs undirected, weighted, cyclic' },
      { orderIndex: 2, subId: 52, title: 'Storage Representation: Adjacency Matrix & Adjacency List', tier: Tier.INTERMEDIATE, concepts: '2D matrix vs array of linked lists, space/time trade-offs' },
      { orderIndex: 3, subId: 53, title: 'Basic Graph Manipulation: Add/Remove Vertex & Edge', tier: Tier.INTERMEDIATE, concepts: 'Dynamic graph operations, degree calculation' },
      { orderIndex: 4, subId: 54, title: 'Breadth-First Search (BFS) Traversal', tier: Tier.ADVANCED, concepts: 'Queue-based traversal, shortest path in unweighted graph' },
      { orderIndex: 5, subId: 55, title: 'Depth-First Search (DFS) Traversal', tier: Tier.ADVANCED, concepts: 'Stack/recursion traversal, cycle detection, connected components' },
      { orderIndex: 6, subId: 56, title: 'Introduction to Sparse Matrix', tier: Tier.ADVANCED, concepts: 'Definition, memory wastage in dense representation' },
      { orderIndex: 7, subId: 57, title: 'Sparse Matrix Linked Representation', tier: Tier.ADVANCED, concepts: 'Row-column header nodes, multi-linked list of triplets' },
      { orderIndex: 8, subId: 58, title: 'Transpose of Sparse Matrix', tier: Tier.ADVANCED, concepts: 'Fast transpose algorithm, row-major to column-major' },
      { orderIndex: 9, subId: 59, title: 'BOSS: Glacier Oracle', tier: Tier.ADVANCED, concepts: 'Comprehensive Unit 6 Master Challenge' },
    ],
  },
];

const STAGE_CONFIGS: { type: StageType; titleTemplate: (subTitle: string) => string }[] = [
  { type: 'THEORY', titleTemplate: (s) => `Theory: ${s} Fundamentals` },
  { type: 'VISUALIZATION', titleTemplate: (s) => `Visualization: ${s} Dungeon Debugger` },
  { type: 'DRY_RUN', titleTemplate: (s) => `Dry Run: Step-by-Step Trace of ${s}` },
  { type: 'GUIDED_CODE', titleTemplate: (s) => `Guided Code: Implement ${s}` },
  { type: 'EASY_PROBLEM', titleTemplate: (s) => `Easy Challenge: ${s} Core Task` },
  { type: 'MEDIUM_PROBLEM', titleTemplate: (s) => `Medium Challenge: Optimized ${s}` },
  { type: 'QUIZ', titleTemplate: (s) => `Stage Quiz: Mastery Test on ${s}` },
  { type: 'BOSS', titleTemplate: (s) => `Boss Fight: Conquering ${s}` },
];

export function getStageContent(type: StageType, subTitle: string, stageNum: number, concepts: string = '') {
  switch (type) {
    case 'THEORY':
      return {
        eli5: `In algorithmic quests, "${subTitle}" represents a foundational data structure pillar. Concept focus: ${concepts || 'Optimal representation and invariants.'}.`,
        keyTakeaways: [
          `Key concept: ${concepts || 'Ensures strict algorithmic guarantees.'}`,
          'Maintains deterministic state transitions across all computational boundaries.',
          'Conserves CPU cycles and minimizes memory footprint according to syllabus standards.',
        ],
        codeSnippet: `// Canonical Pattern for ${subTitle}\n// Concept: ${concepts}\nfunction executeOperation(dataset, target) {\n    let left = 0, right = dataset.length - 1;\n    while (left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if (dataset[mid] === target) return mid;\n        if (dataset[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
        timeComplexity: 'O(log N) to O(N)',
        spaceComplexity: 'O(1) auxiliary',
      };
    case 'VISUALIZATION':
      return {
        initialArray: [10, 20, 30, 40, 50, 60, 70, 80],
        steps: [
          { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: `Initialize execution for ${subTitle}. Left pointer=0 (10), Right pointer=7 (80). Target key=50.`, codeLine: 'int left = 0, right = arr.length - 1;' },
          { activeIndices: [3], pointerLeft: 0, pointerRight: 7, action: 'Calculate midpoint: mid = (0 + 7) / 2 = 3. arr[3] = 40. Compare with target 50.', codeLine: 'int mid = left + (right - left) / 2;' },
          { activeIndices: [4, 7], pointerLeft: 4, pointerRight: 7, action: 'arr[3] = 40 < 50. Target is in upper half! Advance left = mid + 1 = 4.', codeLine: 'if (arr[mid] < target) left = mid + 1;' },
          { activeIndices: [5], pointerLeft: 4, pointerRight: 7, action: 'Calculate next midpoint: mid = (4 + 7) / 2 = 5. arr[5] = 60. Compare with target 50.', codeLine: 'mid = left + (right - left) / 2;' },
          { activeIndices: [4, 4], pointerLeft: 4, pointerRight: 4, action: 'arr[5] = 60 > 50. Target is smaller! Decrement right = mid - 1 = 4.', codeLine: 'else right = mid - 1;' },
          { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: 'Evaluating remaining element: mid = (4 + 4) / 2 = 4. arr[4] = 50. MATCH IDENTIFIED!', codeLine: 'if (arr[mid] == target) return mid;' },
          { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: `Success! Element 50 verified in dataset under ${subTitle} invariant.`, codeLine: '// Operation complete with O(log N) efficiency' },
        ],
      };
    case 'DRY_RUN':
      return {
        code: `function traceOperation(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
        traceRows: [
          { iteration: 1, left: 0, right: 7, arrLeft: 10, arrRight: 80, sum: 40, action: 'mid=3 (40) < target(50) -> left = mid + 1 (4)' },
          { iteration: 2, left: 4, right: 7, arrLeft: 50, arrRight: 80, sum: 60, action: 'mid=5 (60) > target(50) -> right = mid - 1 (4)' },
          { iteration: 3, left: 4, right: 4, arrLeft: 50, arrRight: 50, sum: 50, action: 'mid=4 (50) === target(50) -> TARGET FOUND AT INDEX 4' },
        ],
      };
    case 'GUIDED_CODE':
      return {
        prompt: `Implement the algorithmic solution for ${subTitle} by filling in the missing pointer updates and boundary checks.`,
        starterCode: {
          python: `def solve(arr: list[int], target: int) -> int:\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            # FILL_BLANK: advance left boundary\n            left = mid + 1\n        else:\n            # FILL_BLANK: decrement right boundary\n            right = mid - 1\n    return -1`,
          cpp: `#include <vector>\nusing namespace std;\n\nint solve(vector<int>& arr, int target) {\n    int left = 0, right = arr.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
          java: `public class Solution {\n    public int solve(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            else if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`,
          c: `#include <stdlib.h>\n\nint solve(int* arr, int n, int target) {\n    int left = 0, right = n - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
        },
      };
    case 'EASY_PROBLEM':
    case 'MEDIUM_PROBLEM':
    case 'BOSS':
      return {
        problemTitle: `${type === 'BOSS' ? '👑 BOSS TRIAL' : type}: ${subTitle}`,
        description: `Implement the optimal solution for ${subTitle}. Your implementation must handle edge cases according to the syllabus requirements: ${concepts}.`,
        starterCode: {
          python: `class Solution:\n    def solve(self, nums: list[int], target: int) -> list[int]:\n        # Implement ${subTitle} solution\n        return [0, 1]`,
          cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        // Implement ${subTitle} solution\n        return {0, 1};\n    }\n};`,
          java: `class Solution {\n    public int[] solve(int[] nums, int target) {\n        // Implement ${subTitle} solution\n        return new int[]{0, 1};\n    }\n}`,
          c: `int* solve(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = (int*)malloc(2 * sizeof(int));\n    res[0] = 0; res[1] = 1;\n    return res;\n}`,
        },
        testCases: [
          { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
          { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
          { input: '[3, 3], 6', expectedOutput: '[0, 1]' },
        ],
      };
    case 'QUIZ':
      return {
        questions: [
          {
            id: 1,
            question: `In ${subTitle}, which asymptotic notation represents the upper bound?`,
            options: ['Big-O (O)', 'Big-Omega (Ω)', 'Big-Theta (Θ)', 'Little-o (o)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: `What is the key principle behind: "${concepts || subTitle}"?`,
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
            question: `What is the optimal complexity guarantee for standard operations in ${subTitle}?`,
            options: ['O(log N) or O(N)', 'O(N!)', 'O(2^N)', 'O(N^3)'],
            correctAnswer: 0,
          },
        ],
      };
  }
}

async function main() {
  console.log('🌱 Starting AlgoQuest University Syllabus Curriculum Seed...');

  for (const lvl of CURRICULUM_DATA) {
    const level = await prisma.level.upsert({
      where: { orderIndex: lvl.orderIndex },
      update: { title: lvl.title, icon: lvl.icon },
      create: {
        orderIndex: lvl.orderIndex,
        title: lvl.title,
        icon: lvl.icon,
      },
    });

    console.log(`Level ${level.orderIndex}: ${level.title} (${lvl.sublevels.length} Sublevels)`);

    for (const sub of lvl.sublevels) {
      const sublevel = await prisma.sublevel.upsert({
        where: { id: sub.subId },
        update: {
          title: sub.title,
          orderIndex: sub.orderIndex,
          tier: sub.tier,
          levelId: level.id,
        },
        create: {
          id: sub.subId,
          title: sub.title,
          orderIndex: sub.orderIndex,
          tier: sub.tier,
          levelId: level.id,
        },
      });

      // Seed all 8 stages for this sublevel
      for (let sIdx = 0; sIdx < STAGE_CONFIGS.length; sIdx++) {
        const stageNum = sIdx + 1;
        const config = STAGE_CONFIGS[sIdx];
        const content = getStageContent(config.type, sub.title, stageNum, sub.concepts);

        await prisma.stage.upsert({
          where: {
            sublevelId_stageNumber: {
              sublevelId: sublevel.id,
              stageNumber: stageNum,
            },
          },
          update: {
            stageType: config.type,
            title: config.titleTemplate(sub.title),
            contentJson: content as any,
          },
          create: {
            sublevelId: sublevel.id,
            stageNumber: stageNum,
            stageType: config.type,
            title: config.titleTemplate(sub.title),
            contentJson: content as any,
          },
        });
      }

      // Seed Problem with TestCases for Easy, Medium, and Boss stages
      const problem = await prisma.problem.upsert({
        where: { id: sublevel.id },
        update: {
          title: `Challenge: ${sub.title}`,
          description: `Solve the canonical ${sub.title} problem under optimal time and space constraints: ${sub.concepts}.`,
          difficulty: sub.tier === Tier.ADVANCED ? Difficulty.HARD : sub.tier === Tier.INTERMEDIATE ? Difficulty.MEDIUM : Difficulty.EASY,
          xpReward: sub.tier === Tier.ADVANCED ? 80 : sub.tier === Tier.INTERMEDIATE ? 50 : 30,
        },
        create: {
          id: sublevel.id,
          sublevelId: sublevel.id,
          title: `Challenge: ${sub.title}`,
          description: `Solve the canonical ${sub.title} problem under optimal time and space constraints: ${sub.concepts}.`,
          difficulty: sub.tier === Tier.ADVANCED ? Difficulty.HARD : sub.tier === Tier.INTERMEDIATE ? Difficulty.MEDIUM : Difficulty.EASY,
          xpReward: sub.tier === Tier.ADVANCED ? 80 : sub.tier === Tier.INTERMEDIATE ? 50 : 30,
          starterCode: {
            python: 'class Solution:\n    def solve(self, nums, target):\n        return [0, 1]',
            cpp: '#include <vector>\nusing namespace std;\nclass Solution { public: vector<int> solve(vector<int>& n, int t) { return {0,1}; } };',
            java: 'class Solution { public int[] solve(int[] n, int t) { return new int[]{0,1}; } }',
            c: 'int* solve(int* n, int s, int t, int* r) { *r = 2; int* a = malloc(8); a[0]=0; a[1]=1; return a; }',
          },
        },
      });

      await prisma.testCase.deleteMany({ where: { problemId: problem.id } });
      await prisma.testCase.createMany({
        data: [
          { problemId: problem.id, input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]', isHidden: false },
          { problemId: problem.id, input: '[3, 2, 4], 6', expectedOutput: '[1, 2]', isHidden: false },
          { problemId: problem.id, input: '[1, 5, 8, 12, 19], 20', expectedOutput: '[0, 4]', isHidden: true },
        ],
      });
    }
  }

  console.log('✅ Seed completed successfully with 6 Units, 54 Sublevels, and 432 Stages!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
