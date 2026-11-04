import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { sendSuccess } from '../utils/response';

export const PLACEMENT_QUESTIONS = [
  {
    id: 1,
    question: 'What is the time complexity of searching an element in a balanced Binary Search Tree?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    difficulty: 'EASY',
    topic: 'Trees',
  },
  {
    id: 2,
    question: 'Which data structure follows the Last-In-First-Out (LIFO) principle?',
    options: ['Queue', 'Stack', 'Array', 'Heap'],
    correctAnswer: 1,
    difficulty: 'EASY',
    topic: 'Linear Structures',
  },
  {
    id: 3,
    question: 'What is the worst-case time complexity of QuickSort?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
    correctAnswer: 2,
    difficulty: 'EASY',
    topic: 'Sorting',
  },
  {
    id: 4,
    question: 'Which algorithm is used to find the shortest path in a weighted graph with non-negative edge weights?',
    options: ['Kruskal', 'Prim', "Dijkstra's", 'Floyd-Warshall'],
    correctAnswer: 2,
    difficulty: 'MEDIUM',
    topic: 'Graphs',
  },
  {
    id: 5,
    question: 'In Dynamic Programming, what two key properties must a problem have?',
    options: [
      'Greedy choice & Independence',
      'Optimal substructure & Overlapping subproblems',
      'Divide and conquer & Memoization',
      'Recursion & Sorting',
    ],
    correctAnswer: 1,
    difficulty: 'MEDIUM',
    topic: 'DP',
  },
  {
    id: 6,
    question: 'What is the auxiliary space complexity of standard recursive merge sort on an array of size n?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correctAnswer: 2,
    difficulty: 'MEDIUM',
    topic: 'Divide & Conquer',
  },
  {
    id: 7,
    question: 'Which data structure is ideal for implementing LRU (Least Recently Used) Cache?',
    options: [
      'Array and Stack',
      'Doubly Linked List and Hash Map',
      'Binary Search Tree and Queue',
      'Max Heap and Stack',
    ],
    correctAnswer: 1,
    difficulty: 'MEDIUM',
    topic: 'Data Structures',
  },
  {
    id: 8,
    question: 'What technique can determine if a linked list contains a cycle using O(1) space?',
    options: [
      'DFS recursion',
      'Hash set of visited nodes',
      "Floyd's Tortoise and Hare algorithm",
      'Binary Search',
    ],
    correctAnswer: 2,
    difficulty: 'MEDIUM',
    topic: 'Linked Lists',
  },
  {
    id: 9,
    question: 'What is the time complexity of the Knuth-Morris-Pratt (KMP) string pattern matching algorithm?',
    options: ['O(m * n)', 'O(m + n)', 'O(n log m)', 'O(m^2)'],
    correctAnswer: 1,
    difficulty: 'HARD',
    topic: 'Strings',
  },
  {
    id: 10,
    question: 'In Disjoint-Set Union (DSU), what is the near-linear amortized time complexity per operation with union-by-rank and path compression?',
    options: ['O(log n)', 'O(α(n))', 'O(1)', 'O(n)'],
    correctAnswer: 1,
    difficulty: 'HARD',
    topic: 'Advanced Trees',
  },
];

export class OnboardingController {
  static getPlacementQuiz(req: Request, res: Response): void {
    // Return questions without the correctAnswer field
    const sanitizedQuestions = PLACEMENT_QUESTIONS.map(({ correctAnswer, ...q }) => q);
    sendSuccess(res, sanitizedQuestions, 'Placement diagnostic quiz questions');
  }

  static async submitPlacementQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { answers } = req.body; // e.g. { "1": 1, "2": 1, ... } or array of chosen indices

      let score = 0;
      PLACEMENT_QUESTIONS.forEach((q) => {
        const userAnswer = Array.isArray(answers) ? answers[q.id - 1] : answers[q.id];
        if (userAnswer === q.correctAnswer) {
          score += 1;
        }
      });

      // Determine level recommendation
      let recommendedLevelOrder = 1;
      let skillPath: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' = 'BEGINNER';

      if (score >= 8) {
        recommendedLevelOrder = 4; // Level 4 Graphs & Advanced
        skillPath = 'ADVANCED';
      } else if (score >= 4) {
        recommendedLevelOrder = 2; // Level 2 Linear Structures
        skillPath = 'INTERMEDIATE';
      } else {
        recommendedLevelOrder = 1;
        skillPath = 'BEGINNER';
      }

      // Find the target level and first sublevel
      const targetLevel = await prisma.level.findFirst({
        where: { orderIndex: recommendedLevelOrder },
        include: {
          sublevels: {
            orderBy: { orderIndex: 'asc' },
            take: 1,
          },
        },
      });

      const placedSublevel = targetLevel?.sublevels[0];

      if (placedSublevel) {
        // Initialize UserProgress for the placed sublevel
        await prisma.userProgress.upsert({
          where: {
            userId_sublevelId: {
              userId,
              sublevelId: placedSublevel.id,
            },
          },
          update: {},
          create: {
            userId,
            sublevelId: placedSublevel.id,
            currentStage: 1,
            isCompleted: false,
            confidenceScore: 100,
          },
        });
      }

      // Save quiz attempt
      await prisma.quizAttempt.create({
        data: {
          userId,
          quizId: 101, // Diagnostic placement quiz ID
          score,
          isPassed: score >= 4,
        },
      });

      // Update user's selected skill level
      await prisma.user.update({
        where: { id: userId },
        data: { selectedLevel: skillPath },
      });

      sendSuccess(res, {
        score,
        totalQuestions: PLACEMENT_QUESTIONS.length,
        placedSkillLevel: skillPath,
        recommendedLevel: {
          id: targetLevel?.id,
          orderIndex: targetLevel?.orderIndex,
          title: targetLevel?.title,
        },
        placedSublevel: placedSublevel
          ? {
              id: placedSublevel.id,
              title: placedSublevel.title,
              stageNumber: 1,
            }
          : null,
      }, 'Placement quiz evaluated successfully');
    } catch (error) {
      next(error);
    }
  }
}
