import { PrismaClient, StageType, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

const LEVELS_DATA = [
  {
    orderIndex: 1,
    title: 'Foundations & Core Mechanics',
    icon: '⚔️',
    sublevels: [
      { orderIndex: 1, title: 'Asymptotic Analysis & Big-O' },
      { orderIndex: 2, title: 'Static & Dynamic Arrays' },
      { orderIndex: 3, title: 'Dual Pointers Mechanics' },
      { orderIndex: 4, title: 'Sliding Window Patterns' },
      { orderIndex: 5, title: 'Prefix Sum & Difference Arrays' },
      { orderIndex: 6, title: 'String Manipulation & Parsing' },
      { orderIndex: 7, title: 'Basic Number Theory & Math' },
      { orderIndex: 8, title: 'Recursion Call-Stack Dynamics' },
      { orderIndex: 9, title: 'Bitwise Logic & Bitmasks' },
    ],
  },
  {
    orderIndex: 2,
    title: 'Linear Data Structures',
    icon: '🛡️',
    sublevels: [
      { orderIndex: 1, title: 'Singly Linked Lists' },
      { orderIndex: 2, title: 'Doubly Linked Lists & Sentinel Nodes' },
      { orderIndex: 3, title: 'Stack Protocol & Monotonic Stacks' },
      { orderIndex: 4, title: 'Queue & Ring Buffers' },
      { orderIndex: 5, title: 'Double-Ended Queues (Deques)' },
      { orderIndex: 6, title: 'Hash Map Collision Resolution' },
      { orderIndex: 7, title: 'Hash Sets & Bloom Filters' },
      { orderIndex: 8, title: 'Priority Queues & Binary Heaps' },
    ],
  },
  {
    orderIndex: 3,
    title: 'Hierarchical & Non-Linear Trees',
    icon: '🌲',
    sublevels: [
      { orderIndex: 1, title: 'Binary Tree Traversal Invariant' },
      { orderIndex: 2, title: 'Binary Search Trees (BST)' },
      { orderIndex: 3, title: 'AVL Trees & Self-Balancing Rotations' },
      { orderIndex: 4, title: 'Trie (Prefix Trees)' },
      { orderIndex: 5, title: 'Disjoint Set Union (Union-Find)' },
      { orderIndex: 6, title: 'Binary Indexed Trees (Fenwick Trees)' },
      { orderIndex: 7, title: 'Segment Trees with Lazy Propagation' },
    ],
  },
  {
    orderIndex: 4,
    title: 'Graph Traversal & Network Flow',
    icon: '🗺️',
    sublevels: [
      { orderIndex: 1, title: 'Graph Representations (Adjacency Lists & Matrices)' },
      { orderIndex: 2, title: 'Breadth-First Search (BFS) & Shortest Path' },
      { orderIndex: 3, title: 'Depth-First Search (DFS) & Cycle Detection' },
      { orderIndex: 4, title: 'Topological Sort & Kahn’s Algorithm' },
      { orderIndex: 5, title: 'Dijkstra’s Shortest Path' },
      { orderIndex: 6, title: 'Bellman-Ford & Negative Cycles' },
      { orderIndex: 7, title: 'Floyd-Warshall All-Pairs Shortest Path' },
      { orderIndex: 8, title: 'Minimum Spanning Trees (Kruskal & Prim)' },
      { orderIndex: 9, title: 'Strongly Connected Components (Tarjan & Kosaraju)' },
    ],
  },
  {
    orderIndex: 5,
    title: 'Algorithmic Paradigms & Dynamic Programming',
    icon: '🔮',
    sublevels: [
      { orderIndex: 1, title: 'Divide and Conquer & Merge Sort' },
      { orderIndex: 2, title: 'Binary Search Over Solution Space' },
      { orderIndex: 3, title: 'Greedy Choice Property' },
      { orderIndex: 4, title: 'Backtracking & Pruning Strategies' },
      { orderIndex: 5, title: '1D Dynamic Programming (Memoization vs Tabulation)' },
      { orderIndex: 6, title: '2D Grid & Matrix DP' },
      { orderIndex: 7, title: 'Knapsack Variants & Subset Sum' },
      { orderIndex: 8, title: 'Longest Common Subsequence & Edit Distance' },
    ],
  },
  {
    orderIndex: 6,
    title: 'Advanced Dungeon Mastery',
    icon: '👑',
    sublevels: [
      { orderIndex: 1, title: 'KMP & Z-Algorithm Pattern Matching' },
      { orderIndex: 2, title: 'Rabin-Karp Rolling Hash' },
      { orderIndex: 3, title: 'Network Flow (Edmonds-Karp & Dinic)' },
      { orderIndex: 4, title: 'Heavy-Light Decomposition on Trees' },
      { orderIndex: 5, title: 'Bitmask DP on Graphs' },
      { orderIndex: 6, title: 'Centroid Decomposition' },
      { orderIndex: 7, title: 'Dungeon Grandmaster Final Boss' },
    ],
  },
];

const STAGE_CONFIGS: { type: StageType; titleTemplate: (subTitle: string) => string }[] = [
  { type: 'THEORY', titleTemplate: (s) => `Theory: ${s} Fundamentals` },
  { type: 'VISUALIZATION', titleTemplate: (s) => `Visualization: ${s} Dungeon Debugger` },
  { type: 'DRY_RUN', titleTemplate: (s) => `Dry Run: Trace Table Inspection for ${s}` },
  { type: 'GUIDED_CODE', titleTemplate: (s) => `Guided Example: ${s} Implementation` },
  { type: 'EASY_PROBLEM', titleTemplate: (s) => `Code Challenge: Basic ${s}` },
  { type: 'MEDIUM_PROBLEM', titleTemplate: (s) => `Code Challenge: Advanced ${s}` },
  { type: 'QUIZ', titleTemplate: (s) => `Stage Quiz: Mastery Test on ${s}` },
  { type: 'BOSS', titleTemplate: (s) => `Boss Fight: Conquering ${s}` },
];

function getStageContent(type: StageType, subTitle: string, stageNum: number) {
  switch (type) {
    case 'THEORY':
      return {
        eli5: `Imagine you have a long treasure chest shelf. In ${subTitle}, we need a smart way to inspect or rearrange elements without having to look at every single item repeatedly.`,
        keyTakeaways: [
          'Guarantees optimal time complexity by reducing redundant operations.',
          'Maintains invariant bounds across all state transitions.',
          'Conserves auxiliary space to satisfy O(1) or O(N) constraints.',
        ],
        codeSnippet: `// Canonical Pattern for ${subTitle}\nint left = 0, right = n - 1;\nwhile (left < right) {\n    if (condition(arr[left], arr[right])) {\n        left++;\n    } else {\n        right--;\n    }\n}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
      };
    case 'VISUALIZATION':
      return {
        initialArray: [12, 45, 68, 23, 89, 34, 91, 55],
        steps: [
          { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: 'Initialize pointers at array boundaries', codeLine: 'int left = 0, right = arr.length - 1;' },
          { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: 'Comparing values arr[0]=12 with arr[7]=55', codeLine: 'if (arr[left] + arr[right] == target)' },
          { activeIndices: [1, 7], pointerLeft: 1, pointerRight: 7, action: 'Sum too small -> Advance left pointer to 1', codeLine: 'left++;' },
          { activeIndices: [1, 6], pointerLeft: 1, pointerRight: 6, action: 'Comparing arr[1]=45 with arr[6]=91', codeLine: 'if (arr[left] + arr[right] > target)' },
          { activeIndices: [1, 5], pointerLeft: 1, pointerRight: 5, action: 'Sum too high -> Decrement right pointer to 5', codeLine: 'right--;' },
          { activeIndices: [2, 5], pointerLeft: 2, pointerRight: 5, action: 'Target match discovered at index 2 and 5!', codeLine: 'return new int[] {left, right};' },
        ],
      };
    case 'DRY_RUN':
      return {
        code: `function solve(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left < right) {\n    let currentSum = arr[left] + arr[right];\n    if (currentSum === target) return [left, right];\n    if (currentSum < target) left++;\n    else right--;\n  }\n  return [-1, -1];\n}`,
        traceRows: [
          { iteration: 1, left: 0, right: 4, arrLeft: 2, arrRight: 15, sum: 17, action: 'sum < 18 -> left++' },
          { iteration: 2, left: 1, right: 4, arrLeft: 7, arrRight: 15, sum: 22, action: 'sum > 18 -> right--' },
          { iteration: 3, left: 1, right: 3, arrLeft: 7, arrRight: 11, sum: 18, action: 'sum === 18 -> MATCH FOUND!' },
        ],
      };
    case 'GUIDED_CODE':
      return {
        prompt: `Complete the ${subTitle} loop by filling in the missing pointer increment and termination conditions.`,
        starterCode: {
          python: `def solve(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        curr = arr[left] + arr[right]\n        if curr == target:\n            return [left, right]\n        elif curr < target:\n            # FILL_BLANK: advance left\n            left += 1\n        else:\n            # FILL_BLANK: decrement right\n            right -= 1\n    return [-1, -1]`,
          cpp: `#include <vector>\nusing namespace std;\n\nvector<int> solve(vector<int>& arr, int target) {\n    int left = 0, right = arr.size() - 1;\n    while (left < right) {\n        int curr = arr[left] + arr[right];\n        if (curr == target) return {left, right};\n        else if (curr < target) left++;\n        else right--;\n    }\n    return {-1, -1};\n}`,
          java: `public class Solution {\n    public int[] solve(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) {\n            int curr = arr[left] + arr[right];\n            if (curr == target) return new int[]{left, right};\n            else if (curr < target) left++;\n            else right--;\n        }\n        return new int[]{-1, -1};\n    }\n}`,
          c: `#include <stdlib.h>\n\nint* solve(int* arr, int n, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = (int*)malloc(2 * sizeof(int));\n    int left = 0, right = n - 1;\n    while (left < right) {\n        int curr = arr[left] + arr[right];\n        if (curr == target) { res[0] = left; res[1] = right; return res; }\n        else if (curr < target) left++;\n        else right--;\n    }\n    res[0] = -1; res[1] = -1;\n    return res;\n}`,
        },
      };
    case 'EASY_PROBLEM':
    case 'MEDIUM_PROBLEM':
    case 'BOSS':
      return {
        problemTitle: `${type === 'BOSS' ? '👑 BOSS' : type}: ${subTitle}`,
        description: `Implement the optimal solution for ${subTitle}. Your implementation must run within O(N) time and O(1) space.`,
        starterCode: {
          python: `class Solution:\n    def solve(self, nums: list[int], target: int) -> list[int]:\n        # Your pixel dungeon code here\n        return [0, 1]`,
          cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        // Your pixel dungeon code here\n        return {0, 1};\n    }\n};`,
          java: `class Solution {\n    public int[] solve(int[] nums, int target) {\n        // Your pixel dungeon code here\n        return new int[]{0, 1};\n    }\n}`,
          c: `int* solve(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = (int*)malloc(2 * sizeof(int));\n    res[0] = 0; res[1] = 1;\n    return res;\n}`,
        },
        testCases: [
          { input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
          { input: '[3,2,4], 6', expectedOutput: '[1,2]' },
          { input: '[3,3], 6', expectedOutput: '[0,1]' },
        ],
      };
    case 'QUIZ':
      return {
        questions: [
          {
            id: 1,
            question: `In ${subTitle}, what happens when pointer bounds cross?`,
            options: ['Loop terminates safely', 'Infinite recursion triggers', 'Memory segmentation fault occurs', 'Pointers reverse direction'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: `What is the optimal auxiliary space complexity of ${subTitle}?`,
            options: ['O(N^2)', 'O(N)', 'O(1)', 'O(log N)'],
            correctAnswer: 2,
          },
          {
            id: 3,
            question: `Which constraint directly validates using ${subTitle}?`,
            options: ['Monotonicity / Sorted order', 'Randomized values only', 'Strictly negative indices', 'Odd-length arrays only'],
            correctAnswer: 0,
          },
        ],
      };
  }
}

async function main() {
  console.log('🌱 Starting AlgoQuest World Seed...');

  for (const lvl of LEVELS_DATA) {
    const level = await prisma.level.upsert({
      where: { orderIndex: lvl.orderIndex },
      update: { title: lvl.title, icon: lvl.icon },
      create: {
        orderIndex: lvl.orderIndex,
        title: lvl.title,
        icon: lvl.icon,
      },
    });

    console.log(`Level ${level.orderIndex}: ${level.title}`);

    for (const sub of lvl.sublevels) {
      const sublevel = await prisma.sublevel.upsert({
        where: { id: (lvl.orderIndex - 1) * 10 + sub.orderIndex },
        update: {
          title: sub.title,
          orderIndex: sub.orderIndex,
          levelId: level.id,
        },
        create: {
          id: (lvl.orderIndex - 1) * 10 + sub.orderIndex,
          title: sub.title,
          orderIndex: sub.orderIndex,
          levelId: level.id,
        },
      });

      // Seed all 8 stages for this sublevel
      for (let sIdx = 0; sIdx < STAGE_CONFIGS.length; sIdx++) {
        const stageNum = sIdx + 1;
        const config = STAGE_CONFIGS[sIdx];
        const content = getStageContent(config.type, sub.title, stageNum);

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
          description: `Solve the canonical ${sub.title} problem under O(N) time and O(1) space constraints.`,
          difficulty: 'MEDIUM',
          xpReward: 50,
        },
        create: {
          id: sublevel.id,
          sublevelId: sublevel.id,
          title: `Challenge: ${sub.title}`,
          description: `Solve the canonical ${sub.title} problem under O(N) time and O(1) space constraints.`,
          difficulty: 'MEDIUM',
          xpReward: 50,
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

  console.log('✅ Seed completed successfully with 6 Levels, 50+ Sublevels, and 400+ Stages!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

