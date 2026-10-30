import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ======= LEVELS =======
  const level1 = await prisma.level.upsert({
    where: { id: 'level-arrays-fundamentals' },
    update: {},
    create: {
      id: 'level-arrays-fundamentals',
      name: 'Arrays & Fundamentals',
      orderIndex: 1,
      icon: '📚',
      description: 'Master the basics of arrays and fundamental data structures',
    },
  });

  const level2 = await prisma.level.upsert({
    where: { id: 'level-linked-lists' },
    update: {},
    create: {
      id: 'level-linked-lists',
      name: 'Linked Lists',
      orderIndex: 2,
      icon: '🔗',
      description: 'Understand singly, doubly, and circular linked lists',
    },
  });

  console.log('✅ Levels created');

  // ======= SUBLEVELS =======
  const sublevel1 = await prisma.sublevel.upsert({
    where: { id: 'sublevel-array-basics' },
    update: {},
    create: {
      id: 'sublevel-array-basics',
      levelId: level1.id,
      name: 'Array Basics',
      description: 'Introduction to arrays: indexing, traversal, and basic operations',
      orderIndex: 1,
    },
  });

  const sublevel2 = await prisma.sublevel.upsert({
    where: { id: 'sublevel-array-patterns' },
    update: {},
    create: {
      id: 'sublevel-array-patterns',
      levelId: level1.id,
      name: 'Two Pointers & Sliding Window',
      description: 'Master the two-pointer technique and sliding window pattern',
      orderIndex: 2,
      prerequisiteSublevelId: sublevel1.id,
    },
  });

  const sublevel3 = await prisma.sublevel.upsert({
    where: { id: 'sublevel-linked-basics' },
    update: {},
    create: {
      id: 'sublevel-linked-basics',
      levelId: level2.id,
      name: 'Linked List Fundamentals',
      description: 'Nodes, pointers, traversal, insertion and deletion',
      orderIndex: 1,
    },
  });

  console.log('✅ Sublevels created');

  // ======= STAGES =======
  await prisma.stage.createMany({
    data: [
      { sublevelId: sublevel1.id, stageNumber: 1, stageType: 'LESSON', title: 'What is an Array?' },
      { sublevelId: sublevel1.id, stageNumber: 2, stageType: 'QUIZ', title: 'Array Indexing Quiz' },
      { sublevelId: sublevel1.id, stageNumber: 3, stageType: 'CODING_CHALLENGE', title: 'Two Sum Challenge' },
      { sublevelId: sublevel2.id, stageNumber: 1, stageType: 'LESSON', title: 'Two Pointer Technique' },
      { sublevelId: sublevel2.id, stageNumber: 2, stageType: 'CODING_CHALLENGE', title: 'Container With Most Water' },
      { sublevelId: sublevel3.id, stageNumber: 1, stageType: 'LESSON', title: 'Nodes and Pointers' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Stages created');

  // ======= PROBLEMS =======
  const problem1 = await prisma.problem.create({
    data: {
      sublevelId: sublevel1.id,
      title: 'Two Sum',
      description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\``,
      difficulty: 'EASY',
      constraints: `- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
      xpReward: 50,
      hints: ['Try using a hash map to store complements', 'For each element, check if target - element exists in the map'],
      tags: ['array', 'hash-table'],
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem1.id, input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isHidden: false },
      { problemId: problem1.id, input: '[3,2,4]\n6', expectedOutput: '[1,2]', isHidden: false },
      { problemId: problem1.id, input: '[3,3]\n6', expectedOutput: '[0,1]', isHidden: true },
      { problemId: problem1.id, input: '[1,2,3,4,5]\n9', expectedOutput: '[3,4]', isHidden: true },
    ],
  });

  const problem2 = await prisma.problem.create({
    data: {
      sublevelId: sublevel1.id,
      title: 'Best Time to Buy and Sell Stock',
      description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the i-th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

**Example:**
\`\`\`
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
\`\`\``,
      difficulty: 'EASY',
      constraints: '- 1 <= prices.length <= 10^5\n- 0 <= prices[i] <= 10^4',
      xpReward: 50,
      hints: ['Track the minimum price seen so far', 'Update max profit at each step'],
      tags: ['array', 'dynamic-programming'],
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem2.id, input: '[7,1,5,3,6,4]', expectedOutput: '5', isHidden: false },
      { problemId: problem2.id, input: '[7,6,4,3,1]', expectedOutput: '0', isHidden: false },
    ],
  });

  const problem3 = await prisma.problem.create({
    data: {
      sublevelId: sublevel2.id,
      title: 'Container With Most Water',
      description: `You are given an integer array \`height\` of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Example:**
\`\`\`
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
\`\`\``,
      difficulty: 'MEDIUM',
      constraints: 'n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4',
      xpReward: 100,
      hints: ['Use two pointers from both ends', 'Move the pointer with the smaller height inward'],
      tags: ['array', 'two-pointers', 'greedy'],
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem3.id, input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49', isHidden: false },
      { problemId: problem3.id, input: '[1,1]', expectedOutput: '1', isHidden: false },
    ],
  });

  const problem4 = await prisma.problem.create({
    data: {
      sublevelId: sublevel2.id,
      title: 'Longest Substring Without Repeating Characters',
      description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

**Example:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\``,
      difficulty: 'MEDIUM',
      constraints: '0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.',
      xpReward: 100,
      hints: ['Sliding window approach', 'Use a set to track characters in current window'],
      tags: ['string', 'sliding-window', 'hash-table'],
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem4.id, input: '"abcabcbb"', expectedOutput: '3', isHidden: false },
      { problemId: problem4.id, input: '"bbbbb"', expectedOutput: '1', isHidden: false },
      { problemId: problem4.id, input: '"pwwkew"', expectedOutput: '3', isHidden: true },
    ],
  });

  const problem5 = await prisma.problem.create({
    data: {
      sublevelId: sublevel3.id,
      title: 'Reverse Linked List',
      description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.

**Example:**
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\``,
      difficulty: 'EASY',
      constraints: 'The number of nodes in the list is the range [0, 5000].\n-5000 <= Node.val <= 5000',
      xpReward: 50,
      hints: ['Use three pointers: prev, curr, next', 'Iterative or recursive approach both work'],
      tags: ['linked-list', 'recursion'],
    },
  });

  await prisma.testCase.createMany({
    data: [
      { problemId: problem5.id, input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', isHidden: false },
      { problemId: problem5.id, input: '[1,2]', expectedOutput: '[2,1]', isHidden: false },
      { problemId: problem5.id, input: '[]', expectedOutput: '[]', isHidden: true },
    ],
  });

  console.log('✅ Problems and test cases created');

  // ======= SAMPLE USER =======
  const hashedPassword = await bcrypt.hash('Test@1234', 12);
  await prisma.user.upsert({
    where: { email: 'demo@algoquest.dev' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@algoquest.dev',
      passwordHash: hashedPassword,
      xp: 150,
      gems: 50,
      hearts: 5,
      streakCount: 3,
      streak: {
        create: {
          currentStreak: 3,
          longestStreak: 7,
          freezeCount: 1,
        },
      },
    },
  });

  console.log('✅ Demo user created (email: demo@algoquest.dev, password: Test@1234)');
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
