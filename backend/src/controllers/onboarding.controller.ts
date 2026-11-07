import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { memoryUsers, memoryProgress } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/response';

const PLACEMENT_QUESTIONS = [
  {
    id: 1,
    question: "What is the time complexity of searching an element in a balanced Binary Search Tree?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctAnswer: 1,
    difficulty: "EASY",
  },
  {
    id: 2,
    question: "Which data structure follows the LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Priority Queue", "Hash Table"],
    correctAnswer: 1,
    difficulty: "EASY",
  },
  {
    id: 3,
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(N log N)", "O(N)", "O(N^2)", "O(log N)"],
    correctAnswer: 2,
    difficulty: "EASY",
  },
  {
    id: 4,
    question: "In Two Pointer technique, when searching for a pair in a sorted array that sums to target, if sum < target, what do you do?",
    options: ["Decrement left pointer", "Increment right pointer", "Increment left pointer", "Reset both pointers"],
    correctAnswer: 2,
    difficulty: "MEDIUM",
  },
  {
    id: 5,
    question: "Which algorithm finds the shortest path in a weighted graph with non-negative edge weights?",
    options: ["Breadth First Search", "Dijkstra's Algorithm", "Kruskal's Algorithm", "Depth First Search"],
    correctAnswer: 1,
    difficulty: "MEDIUM",
  },
  {
    id: 6,
    question: "What is the space complexity of an in-place array reversal algorithm?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"],
    correctAnswer: 0,
    difficulty: "EASY",
  },
  {
    id: 7,
    question: "Which data structure uses disjoint-set operations to find connected components efficiently?",
    options: ["AVL Tree", "Segment Tree", "Union-Find (DSU)", "Suffix Automaton"],
    correctAnswer: 2,
    difficulty: "MEDIUM",
  },
  {
    id: 8,
    question: "What algorithmic paradigm does the 0/1 Knapsack problem typically use for an optimal solution?",
    options: ["Greedy approach", "Dynamic Programming", "Divide and Conquer", "Backtracking only"],
    correctAnswer: 1,
    difficulty: "MEDIUM",
  },
  {
    id: 9,
    question: "Which string matching algorithm runs in O(N + M) time using a prefix function (pi table)?",
    options: ["Rabin-Karp", "Knuth-Morris-Pratt (KMP)", "Boyer-Moore", "Aho-Corasick"],
    correctAnswer: 1,
    difficulty: "HARD",
  },
  {
    id: 10,
    question: "In Segment Trees, what is the time complexity of a range sum query and point update?",
    options: ["O(N) and O(1)", "O(log N) and O(log N)", "O(1) and O(N)", "O(N log N) and O(log N)"],
    correctAnswer: 1,
    difficulty: "HARD",
  },
];

export class OnboardingController {
  async getPlacementQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const sanitized = PLACEMENT_QUESTIONS.map(({ correctAnswer, ...q }) => q);
      return sendSuccess(res, { questions: sanitized, total: sanitized.length }, 200);
    } catch (err: any) {
      return sendError(res, err.message, 500);
    }
  }

  async submitPlacementQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { answers } = req.body;

      if (!Array.isArray(answers)) {
        return sendError(res, 'Answers array required', 400);
      }

      let score = 0;
      PLACEMENT_QUESTIONS.forEach((q) => {
        const userAns = answers.find((a: any) => a.questionId === q.id);
        if (userAns && userAns.selectedOption === q.correctAnswer) {
          score += 1;
        }
      });

      let recommendedLevel = 'BEGINNER';
      let targetLevelOrder = 1;

      if (score >= 8) {
        recommendedLevel = 'ADVANCED';
        targetLevelOrder = 4;
      } else if (score >= 4) {
        recommendedLevel = 'INTERMEDIATE';
        targetLevelOrder = 2;
      }

      let levelTitle =
        targetLevelOrder === 4
          ? 'Level 4: Linked Structures Labyrinth (Stone Ruins) — Linked Lists'
          : targetLevelOrder === 2
          ? 'Level 2: Searching & Sorting Citadel (Central Castle) — Searching & Sorting'
          : 'Level 1: Foundations Island (Beginner Village) — Basics of Data Structures';

      let targetSublevelId = (targetLevelOrder - 1) * 10 + 1;

      if (userId) {
        try {
          await prisma.quizAttempt.create({
            data: {
              userId,
              quizId: 999,
              score,
              isPassed: score >= 4,
            },
          });

          await prisma.user.update({
            where: { id: userId },
            data: { selectedLevel: recommendedLevel as any },
          });

          await prisma.userProgress.upsert({
            where: { userId_sublevelId: { userId, sublevelId: targetSublevelId } },
            update: {},
            create: {
              userId,
              sublevelId: targetSublevelId,
              currentStage: 1,
              isCompleted: false,
            },
          });
        } catch {
          // Memory fallback
          const memUser = memoryUsers.get(userId);
          if (memUser) {
            memUser.selectedLevel = recommendedLevel;
            memoryUsers.set(userId, memUser);
          }
          const progs = memoryProgress.get(userId) || [];
          if (!progs.some((p: any) => p.sublevelId === targetSublevelId)) {
            progs.push({
              id: `prog_${targetSublevelId}`,
              userId,
              sublevelId: targetSublevelId,
              currentStage: 1,
              isCompleted: false,
              sublevel: {
                id: targetSublevelId,
                title: levelTitle,
                level: { id: targetLevelOrder, title: levelTitle },
              },
            });
            memoryProgress.set(userId, progs);
          }
        }
      }

      return sendSuccess(
        res,
        {
          score,
          total: PLACEMENT_QUESTIONS.length,
          recommendedLevel,
          levelTitle,
          sublevelId: targetSublevelId,
        },
        200
      );
    } catch (err: any) {
      return sendError(res, err.message, 400);
    }
  }
}

export const onboardingController = new OnboardingController();
