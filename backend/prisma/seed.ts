import { PrismaClient, StageType, Difficulty, SkillLevel, League } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const LEVELS_DATA = [
  {
    title: 'Foundations & Algorithmic Thinking',
    orderIndex: 1,
    icon: 'terminal',
    sublevels: [
      'Time & Space Complexity (Big-O)',
      'Static & Dynamic Arrays',
      'Two-Pointer Technique',
      'Sliding Window Mechanics',
      'Prefix & Suffix Techniques',
      'String Manipulation & Encoding',
      'Basic Math & Number Theory',
      'Recursion Foundations',
      'Bit Manipulation Fundamentals',
    ],
  },
  {
    title: 'Linear Data Structures',
    orderIndex: 2,
    icon: 'linear_scale',
    sublevels: [
      'Singly Linked Lists',
      'Doubly Linked Lists',
      'Fast & Slow Pointers (Cycle Detection)',
      'Stack Architecture & Monotonic Stacks',
      'Queue & Circular Buffer',
      'Double-Ended Queue (Deque)',
      'Hash Tables & Collision Resolution',
      'Priority Queue & Binary Heap',
    ],
  },
  {
    title: 'Non-Linear Data Structures & Trees',
    orderIndex: 3,
    icon: 'account_tree',
    sublevels: [
      'Binary Tree Properties & Representation',
      'Tree Traversals (DFS: In/Pre/Post)',
      'Breadth-First Search (Level Order)',
      'Binary Search Trees (BST) & Validation',
      'Self-Balancing Trees (AVL & Red-Black)',
      'Trie (Prefix Tree) Construction',
      'Disjoint-Set Union (DSU / Union-Find)',
      'Segment Tree & Range Queries',
      'Binary Indexed Tree (Fenwick Tree)',
    ],
  },
  {
    title: 'Graph Algorithms',
    orderIndex: 4,
    icon: 'hub',
    sublevels: [
      'Graph Representations (Matrix & Adjacency List)',
      'Breadth-First Search (Shortest Path in Unweighted)',
      'Depth-First Search & Cycle Detection',
      'Topological Sorting (Kahn & DFS)',
      'Dijkstra Single-Source Shortest Path',
      'Bellman-Ford & Negative Cycles',
      'Floyd-Warshall All-Pairs Shortest Path',
      'Minimum Spanning Tree (Kruskal & Prim)',
      'Strongly Connected Components (Kosaraju & Tarjan)',
    ],
  },
  {
    title: 'Algorithmic Paradigms & Optimization',
    orderIndex: 5,
    icon: 'psychology',
    sublevels: [
      'Comparison & Non-Comparison Sorting',
      'Binary Search & Search Space Reduction',
      'Greedy Algorithms & Interval Scheduling',
      'Divide and Conquer Master Theorem',
      'Backtracking & State Space Tree Search',
      '1D Dynamic Programming (Fibonacci & Climbers)',
      '2D Dynamic Programming (Grid Paths & LCS)',
      '0/1 Knapsack & Unbounded Knapsack',
      'Bitmask Dynamic Programming',
    ],
  },
  {
    title: 'Advanced Algorithms & System Concepts',
    orderIndex: 6,
    icon: 'auto_awesome',
    sublevels: [
      'String Matching: KMP & Z-Algorithm',
      'Rabin-Karp Rolling Hash',
      'Network Flow: Ford-Fulkerson & Edmonds-Karp',
      'Dinic Algorithm for Maximum Bipartite Matching',
      'Convex Hull & Computational Geometry',
      'Heavy-Light Decomposition on Trees',
      'Centroid Decomposition',
      'Square Root Decomposition & Mo Algorithm',
    ],
  },
];

const STAGE_CONFIGS: { type: StageType; titleSuffix: string; order: number }[] = [
  { type: StageType.THEORY, titleSuffix: 'Concept & Intuition (ELI5)', order: 1 },
  { type: StageType.VISUALIZATION, titleSuffix: 'Interactive Visual Arena', order: 2 },
  { type: StageType.DRY_RUN, titleSuffix: 'Step-by-Step Code Walkthrough', order: 3 },
  { type: StageType.GUIDED_CODE, titleSuffix: 'Guided Implementation & Boilerplate', order: 4 },
  { type: StageType.EASY_PROBLEM, titleSuffix: 'Practice Challenge (Easy)', order: 5 },
  { type: StageType.MEDIUM_PROBLEM, titleSuffix: 'Algorithmic Quest (Medium)', order: 6 },
  { type: StageType.QUIZ, titleSuffix: 'Concept Mastery Assessment', order: 7 },
  { type: StageType.BOSS, titleSuffix: 'Chamber Boss Encounter', order: 8 },
];

function generateStageContent(type: StageType, title: string, sublevelTitle: string) {
  switch (type) {
    case StageType.THEORY:
      return {
        summary: `Understand core principles and runtime invariants for ${sublevelTitle}.`,
        markdown: `# ${title}\n\nWelcome to **${sublevelTitle}**. In this stage, you build high-level mental models and practical intuition before diving into code.\n\n### Key Principles\n- Predict asymptotic behavior\n- Identify edge cases\n- Optimize memory bottlenecks`,
        tips: ['Focus on edge cases with empty or 1-element input', 'Analyze pointer mutations'],
      };
    case StageType.VISUALIZATION:
      return {
        animationType: 'pointer-traversal',
        stateNodes: [4, 8, 15, 16, 23, 42],
        pointers: [{ name: 'left', index: 0 }, { name: 'right', index: 5 }],
        instructions: `Manipulate pointers across the memory tape to witness invariant preservation in ${sublevelTitle}.`,
      };
    case StageType.DRY_RUN:
      return {
        codeSnippet: `function solve(arr) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    let temp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = temp;\n    left++; right--;\n  }\n  return arr;\n}`,
        traceSteps: [
          { step: 1, left: 0, right: 5, action: 'Swap indices 0 and 5' },
          { step: 2, left: 1, right: 4, action: 'Swap indices 1 and 4' },
          { step: 3, left: 2, right: 3, action: 'Swap indices 2 and 3' },
        ],
      };
    case StageType.GUIDED_CODE:
      return {
        instructions: `Fill in the missing pointer increment logic to achieve O(N) linear runtime.`,
        templates: {
          python: `def solve(nums):\n    # TODO: Implement two-pointer boundary check\n    pass`,
          cpp: `void solve(vector<int>& nums) {\n    // TODO: Complete in-place transformation\n}`,
          java: `public void solve(int[] nums) {\n    // TODO: Write linear traversal\n}`,
        },
      };
    case StageType.EASY_PROBLEM:
    case StageType.MEDIUM_PROBLEM:
      return {
        problemStatement: `Implement optimal solution for ${sublevelTitle}.`,
        constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
        examples: [
          { input: '[1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
        ],
      };
    case StageType.QUIZ:
      return {
        questions: [
          {
            question: `What is the auxiliary space complexity required for optimal ${sublevelTitle}?`,
            options: ['O(1) Constant Auxiliary Space', 'O(N) Linear Buffer', 'O(N log N) Heap Space', 'O(N^2) Matrix Space'],
            answerIndex: 0,
          },
        ],
      };
    case StageType.BOSS:
      return {
        bossName: `Overlord of ${sublevelTitle}`,
        healthPoints: 1000,
        timeLimitSeconds: 1800,
        problemTitle: `Grand Chamber: ${sublevelTitle}`,
        description: `Construct the optimal memory-bounded algorithm under strict execution bounds.`,
      };
  }
}

async function main() {
  console.log('🌱 Starting comprehensive database seed for AlgoQuest Engine...');

  // Clean existing seed data
  await prisma.testCase.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.problem.deleteMany({});
  await prisma.stage.deleteMany({});
  await prisma.userProgress.deleteMany({});
  await prisma.sublevel.deleteMany({});
  await prisma.level.deleteMany({});
  await prisma.userAchievement.deleteMany({});
  await prisma.quizAttempt.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🧹 Cleaned existing tables.');

  // Create demo user
  const passwordHash = await bcrypt.hash('Password123!', 10);
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@algoquest.dev',
      username: 'algo_master',
      passwordHash,
      xp: 350,
      gems: 100,
      hearts: 5,
      streakCount: 3,
      longestStreak: 5,
      selectedLevel: SkillLevel.BEGINNER,
      currentLeague: League.BRONZE,
      lastActiveDate: new Date(),
    },
  });
  console.log(`👤 Created Demo User: ${demoUser.email} (ID: ${demoUser.id})`);

  let firstSublevelId: number | null = null;
  let totalSublevels = 0;
  let totalStages = 0;

  for (const levelData of LEVELS_DATA) {
    const level = await prisma.level.create({
      data: {
        title: levelData.title,
        orderIndex: levelData.orderIndex,
        icon: levelData.icon,
      },
    });

    let prevSublevelId: number | null = null;

    for (let sIdx = 0; sIdx < levelData.sublevels.length; sIdx++) {
      const subTitle = levelData.sublevels[sIdx];
      const sublevel = await prisma.sublevel.create({
        data: {
          levelId: level.id,
          title: subTitle,
          orderIndex: sIdx + 1,
          prerequisiteSublevelId: prevSublevelId,
        },
      });

      if (!firstSublevelId) {
        firstSublevelId = sublevel.id;
      }
      prevSublevelId = sublevel.id;
      totalSublevels++;

      // Create 8 stages for each sublevel
      for (const stageCfg of STAGE_CONFIGS) {
        const stageTitle = `${subTitle} - ${stageCfg.titleSuffix}`;
        const content = generateStageContent(stageCfg.type, stageTitle, subTitle);

        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: stageCfg.order,
            stageType: stageCfg.type,
            title: stageTitle,
            contentJson: content,
          },
        });
        totalStages++;
      }

      // Create standard practice problem for this sublevel
      const problem = await prisma.problem.create({
        data: {
          sublevelId: sublevel.id,
          title: `${subTitle} Benchmark`,
          description: `Given a sequence of integers, return the optimal output using ${subTitle}.`,
          difficulty: sIdx % 3 === 0 ? Difficulty.EASY : sIdx % 3 === 1 ? Difficulty.MEDIUM : Difficulty.HARD,
          xpReward: 30 + (sIdx % 3) * 20,
          starterCode: {
            python: 'def solve(nums):\n    # Write your solution here\n    return nums',
            cpp: '#include <vector>\nusing namespace std;\nvector<int> solve(vector<int>& nums) {\n    return nums;\n}',
            java: 'class Solution {\n    public int[] solve(int[] nums) {\n        return nums;\n    }\n}',
          },
        },
      });

      // Create test cases
      await prisma.testCase.createMany({
        data: [
          { problemId: problem.id, input: '[1, 2, 3]', expectedOutput: '[3, 2, 1]', isHidden: false },
          { problemId: problem.id, input: '[]', expectedOutput: '[]', isHidden: false },
          { problemId: problem.id, input: '[42, -5, 100, 0]', expectedOutput: '[0, 100, -5, 42]', isHidden: true },
        ],
      });
    }

    console.log(`✅ Level ${levelData.orderIndex}: ${levelData.title} populated with ${levelData.sublevels.length} sublevels.`);
  }

  // Set initial UserProgress for Demo User
  if (firstSublevelId) {
    await prisma.userProgress.create({
      data: {
        userId: demoUser.id,
        sublevelId: firstSublevelId,
        currentStage: 2,
        isCompleted: false,
        confidenceScore: 100,
      },
    });
  }

  console.log('🎉 Seeding successfully finished!');
  console.log(`📊 Total: 6 Levels, ${totalSublevels} Sublevels, ${totalStages} Stages created.`);
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

