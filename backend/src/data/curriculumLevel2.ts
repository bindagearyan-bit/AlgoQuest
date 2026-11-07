import { LevelDefinition } from './curriculumTypes';

export const LEVEL_2_DATA: LevelDefinition = {
  id: 2,
  orderIndex: 2,
  title: 'Level 2: Searching & Sorting Citadel (Central Castle) — Searching & Sorting',
  icon: '🏰',
  description: 'Unit 2: Linear & Binary search, hashing collision resolution, O(N^2) comparison sorts, Merge Sort, Quick Sort, and Radix/Tim Sort.',
  sublevels: [
    {
      id: 11,
      levelId: 2,
      orderIndex: 1,
      title: 'Linear Search',
      tier: 'BEGINNER',
      sublevelType: 'CODE_BASED',
      concepts: 'Sequential scan, best/worst case, unsorted arrays, early return',
      badge: {
        title: 'Linear Search Scout',
        description: 'Scanned arrays sequentially with precision, locating hidden keys in unsorted territory.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#7FFFD4" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Linear search is like searching for a specific book on an unorganized shelf by checking every single book one by one from left to right until you find it or reach the end.',
          keyTakeaways: [
            'Works on both sorted and unsorted data structures.',
            'Best-case time: O(1) when target is at index 0.',
            'Worst-case time: O(N) when target is at the end or absent.',
            'Requires zero auxiliary memory: O(1) space.',
          ],
          codeSnippet: `int linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) return i; // Target found\n    }\n    return -1; // Target not found\n}`,
          timeComplexity: 'O(N) worst-case',
          spaceComplexity: 'O(1) in-place',
        },
        visualization: {
          initialArray: [24, 78, 35, 91, 52, 63, 19, 87],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 7, action: 'Step 1: Check arr[0] = 24. Target key: 52. 24 != 52 -> advance.', codeLine: 'if (arr[i] == target)' },
            { activeIndices: [1], pointerLeft: 1, pointerRight: 7, action: 'Step 2: Check arr[1] = 78. 78 != 52 -> advance.', codeLine: 'i++;' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 7, action: 'Step 3: Check arr[2] = 35. 35 != 52 -> advance.', codeLine: 'i++;' },
            { activeIndices: [3], pointerLeft: 3, pointerRight: 7, action: 'Step 4: Check arr[3] = 91. 91 != 52 -> advance.', codeLine: 'i++;' },
            { activeIndices: [4], pointerLeft: 4, pointerRight: 7, action: 'Step 5: Check arr[4] = 52. MATCH DISCOVERED AT INDEX 4!', codeLine: 'return i; // Found!' },
            { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: 'Target 52 safely retrieved in 5 comparisons.', codeLine: '// Done' },
          ],
        },
        dryRun: {
          code: `function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}`,
          traceRows: [
            { iteration: 1, i: 0, arrI: 24, target: 52, action: '24 != 52 -> i++' },
            { iteration: 2, i: 1, arrI: 78, target: 52, action: '78 != 52 -> i++' },
            { iteration: 3, i: 2, arrI: 35, target: 52, action: '35 != 52 -> i++' },
            { iteration: 4, i: 3, arrI: 91, target: 52, action: '91 != 52 -> i++' },
            { iteration: 5, i: 4, arrI: 52, target: 52, action: '52 === 52 -> return 4' },
          ],
        },
        guidedCode: {
          prompt: 'Complete the linear search function to return the index of the first occurrence of target, or -1 if not found.',
          starterCode: {
            python: `def linear_search(arr: list[int], target: int) -> int:\n    for i in range(len(arr)):\n        if arr[i] == target:\n            # FILL_BLANK: return the discovered index\n            return i\n    return -1`,
            cpp: `#include <vector>\nusing namespace std;\nint linearSearch(const vector<int>& arr, int target) {\n    for (int i = 0; i < arr.size(); i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}`,
            java: `public class Solution {\n    public int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) return i;\n        }\n        return -1;\n    }\n}`,
            c: `int linearSearch(int* arr, int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}`,
          },
        },
        easyProblem: {
          title: 'Easy: Find Target in Unsorted Array',
          description: 'Given an integer array nums and an integer target, return the index of target. If target is not present, return -1.',
          starterCode: {
            python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        for i, val in enumerate(nums):\n            if val == target: return i\n        return -1`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        for (int i = 0; i < nums.size(); i++) if (nums[i] == target) return i;\n        return -1;\n    }\n};`,
            java: `class Solution {\n    public int search(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) if (nums[i] == target) return i;\n        return -1;\n    }\n}`,
            c: `int search(int* nums, int numsSize, int target) {\n    for (int i = 0; i < numsSize; i++) if (nums[i] == target) return i;\n    return -1;\n}`,
          },
          testCases: [
            { input: '[4, 5, 6, 7, 0, 1, 2], 0', expectedOutput: '4' },
            { input: '[4, 5, 6, 7, 0, 1, 2], 3', expectedOutput: '-1' },
            { input: '[1], 1', expectedOutput: '0' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Find All Occurrences of Element',
          description: 'Given an array nums and a target, find all indices where target appears. Return an array of indices in ascending order.',
          starterCode: {
            python: `class Solution:\n    def find_all(self, nums: list[int], target: int) -> list[int]:\n        return [i for i, x in enumerate(nums) if x == target]`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> findAll(vector<int>& nums, int target) {\n        vector<int> res;\n        for (int i = 0; i < nums.size(); i++) if (nums[i] == target) res.push_back(i);\n        return res;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public List<Integer> findAll(int[] nums, int target) {\n        List<Integer> res = new ArrayList<>();\n        for (int i = 0; i < nums.length; i++) if (nums[i] == target) res.add(i);\n        return res;\n    }\n}`,
            c: `int* findAll(int* nums, int numsSize, int target, int* returnSize) {\n    int* res = malloc(numsSize * sizeof(int));\n    int k = 0;\n    for (int i = 0; i < numsSize; i++) if (nums[i] == target) res[k++] = i;\n    *returnSize = k;\n    return res;\n}`,
          },
          testCases: [
            { input: '[1, 2, 3, 2, 4, 2, 5], 2', expectedOutput: '[1, 3, 5]' },
            { input: '[1, 1, 1], 1', expectedOutput: '[0, 1, 2]' },
            { input: '[5, 6, 7], 9', expectedOutput: '[]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What is the best-case time complexity of Linear Search?',
              options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Does linear search require the array to be sorted?',
              options: ['No, it operates on unsorted arrays freely', 'Yes, strictly in ascending order', 'Yes, strictly descending', 'Only on arrays with odd length'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'In an array of N elements, how many comparisons occur in the worst case?',
              options: ['N comparisons', 'N / 2 comparisons', 'log2(N) comparisons', '1 comparison'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Search in 2D Matrix (Linear Scan)',
          description: 'Search for target in an M x N matrix. Return true if found, false otherwise.',
          starterCode: {
            python: `class Solution:\n    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:\n        for row in matrix:\n            for val in row:\n                if val == target: return True\n        return False`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        for (const auto& row : matrix) for (int v : row) if (v == target) return true;\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        for (int[] row : matrix) for (int v : row) if (v == target) return true;\n        return false;\n    }\n}`,
            c: `int searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {\n    for (int i = 0; i < matrixSize; i++) for (int j = 0; j < matrixColSize[i]; j++) if (matrix[i][j] == target) return 1;\n    return 0;\n}`,
          },
          testCases: [
            { input: '[[1, 3, 5], [7, 9, 11]], 9', expectedOutput: 'true' },
            { input: '[[1, 3, 5], [7, 9, 11]], 20', expectedOutput: 'false' },
          ],
        },
      },
    },
    {
      id: 12,
      levelId: 2,
      orderIndex: 2,
      title: 'Binary Search (Iterative & Recursive)',
      tier: 'BEGINNER',
      sublevelType: 'CODE_BASED',
      concepts: 'Divide and conquer, sorted prerequisite, mid calculation, logarithmic convergence',
      badge: {
        title: 'Binary Search Master',
        description: 'Halved search spaces with logarithmic precision, disarming sorted dungeon locks.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD700" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Imagine opening a phonebook directly in the middle. If the target name starts with S and you opened on M, you instantly throw away the entire first half! That is Binary Search: halving the world every step.',
          keyTakeaways: [
            'PREREQUISITE: The array MUST be sorted.',
            'Midpoint calculation: mid = low + (high - low) / 2 to avoid integer overflow.',
            'Halves search space every comparison -> O(log N) time.',
            'Iterative version requires O(1) space; recursive requires O(log N) stack frames.',
          ],
          codeSnippet: `int binarySearch(int arr[], int n, int target) {\n    int l = 0, r = n - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}`,
          timeComplexity: 'O(log N)',
          spaceComplexity: 'O(1) iterative / O(log N) recursive',
        },
        visualization: {
          initialArray: [10, 20, 30, 40, 50, 60, 70, 80],
          steps: [
            { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: 'Left=0 (10), Right=7 (80). Target key: 50.', codeLine: 'int l = 0, r = n - 1;' },
            { activeIndices: [3], pointerLeft: 0, pointerRight: 7, action: 'Calculate mid = (0 + 7) / 2 = 3. arr[3] = 40. 40 < 50.', codeLine: 'int mid = l + (r - l) / 2;' },
            { activeIndices: [4, 7], pointerLeft: 4, pointerRight: 7, action: 'Target in upper half! Advance left = mid + 1 = 4.', codeLine: 'l = mid + 1;' },
            { activeIndices: [5], pointerLeft: 4, pointerRight: 7, action: 'Calculate mid = (4 + 7) / 2 = 5. arr[5] = 60. 60 > 50.', codeLine: 'mid = l + (r - l) / 2;' },
            { activeIndices: [4, 4], pointerLeft: 4, pointerRight: 4, action: 'Target in lower sub-range! Decrement right = mid - 1 = 4.', codeLine: 'r = mid - 1;' },
            { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: 'mid = 4. arr[4] = 50. TARGET ACQUIRED IN 3 STEPS!', codeLine: 'if (arr[mid] == target) return mid;' },
          ],
        },
        dryRun: {
          code: `function binarySearch(arr, target) {\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    let mid = Math.floor((l + r) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}`,
          traceRows: [
            { iteration: 1, l: 0, r: 7, mid: 3, arrMid: 40, action: '40 < 50 -> l = mid + 1 (4)' },
            { iteration: 2, l: 4, r: 7, mid: 5, arrMid: 60, action: '60 > 50 -> r = mid - 1 (4)' },
            { iteration: 3, l: 4, r: 4, mid: 4, arrMid: 50, action: '50 === 50 -> return 4' },
          ],
        },
        guidedCode: {
          prompt: 'Implement binary search by completing the bounds adjustment logic.',
          starterCode: {
            python: `def binary_search(nums: list[int], target: int) -> int:\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = l + (r - l) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            # FILL_BLANK: advance left\n            l = mid + 1\n        else:\n            # FILL_BLANK: decrement right\n            r = mid - 1\n    return -1`,
            cpp: `#include <vector>\nusing namespace std;\nint binarySearch(const vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}`,
            java: `public class Solution {\n    public int binarySearch(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n}`,
            c: `int binarySearch(int* nums, int n, int target) {\n    int l = 0, r = n - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}`,
          },
        },
        easyProblem: {
          title: 'Easy: Binary Search on Sorted Array',
          description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums in O(log N) runtime.',
          starterCode: {
            python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if nums[m] == target: return m\n            elif nums[m] < target: l = m + 1\n            else: r = m - 1\n        return -1`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n};`,
            java: `class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n}`,
            c: `int search(int* nums, int numsSize, int target) {\n    int l = 0, r = numsSize - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}`,
          },
          testCases: [
            { input: '[-1, 0, 3, 5, 9, 12], 9', expectedOutput: '4' },
            { input: '[-1, 0, 3, 5, 9, 12], 2', expectedOutput: '-1' },
            { input: '[5], 5', expectedOutput: '0' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Find First and Last Position of Element',
          description: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.',
          starterCode: {
            python: `class Solution:\n    def searchRange(self, nums: list[int], target: int) -> list[int]:\n        def find_bound(first: bool) -> int:\n            l, r, ans = 0, len(nums) - 1, -1\n            while l <= r:\n                m = (l + r) // 2\n                if nums[m] == target:\n                    ans = m\n                    if first: r = m - 1\n                    else: l = m + 1\n                elif nums[m] < target: l = m + 1\n                else: r = m - 1\n            return ans\n        return [find_bound(True), find_bound(False)]`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> searchRange(vector<int>& nums, int target) {\n        auto findBound = [&](bool isFirst) {\n            int l = 0, r = nums.size() - 1, ans = -1;\n            while (l <= r) {\n                int m = l + (r - l) / 2;\n                if (nums[m] == target) { ans = m; if (isFirst) r = m - 1; else l = m + 1; }\n                else if (nums[m] < target) l = m + 1;\n                else r = m - 1;\n            }\n            return ans;\n        };\n        return {findBound(true), findBound(false)};\n    }\n};`,
            java: `class Solution {\n    public int[] searchRange(int[] nums, int target) {\n        return new int[]{findBound(nums, target, true), findBound(nums, target, false)};\n    }\n    private int findBound(int[] nums, int target, boolean isFirst) {\n        int l = 0, r = nums.length - 1, ans = -1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) { ans = m; if (isFirst) r = m - 1; else l = m + 1; }\n            else if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return ans;\n    }\n}`,
            c: `int* searchRange(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = malloc(2 * sizeof(int));\n    res[0] = -1; res[1] = -1;\n    int l = 0, r = numsSize - 1;\n    while (l <= r) { int m = l + (r-l)/2; if (nums[m] == target) { res[0] = m; r = m - 1; } else if (nums[m] < target) l = m + 1; else r = m - 1; }\n    l = 0; r = numsSize - 1;\n    while (l <= r) { int m = l + (r-l)/2; if (nums[m] == target) { res[1] = m; l = m + 1; } else if (nums[m] < target) l = m + 1; else r = m - 1; }\n    return res;\n}`,
          },
          testCases: [
            { input: '[5, 7, 7, 8, 8, 10], 8', expectedOutput: '[3, 4]' },
            { input: '[5, 7, 7, 8, 8, 10], 6', expectedOutput: '[-1, -1]' },
            { input: '[], 0', expectedOutput: '[-1, -1]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Why do we use "mid = low + (high - low) / 2" instead of "(low + high) / 2"?',
              options: ['To avoid potential 32-bit integer overflow', 'Because it runs twice as fast', 'To make numbers negative', 'It is required by the C standard only'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the maximum number of comparisons for Binary Search in an array of size 1,024?',
              options: ['10 comparisons (log2 1024)', '1,024 comparisons', '512 comparisons', '1 comparison'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What is the termination condition of the binary search loop?',
              options: ['when low > high', 'when low == 0', 'when high == 0', 'when mid is negative'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Search in Rotated Sorted Array',
          description: 'Search for target in an array that has been rotated at an unknown pivot. Solve in O(log N) time.',
          starterCode: {
            python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if nums[m] == target: return m\n            if nums[l] <= nums[m]:\n                if nums[l] <= target < nums[m]: r = m - 1\n                else: l = m + 1\n            else:\n                if nums[m] < target <= nums[r]: l = m + 1\n                else: r = m - 1\n        return -1`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[l] <= nums[m]) {\n                if (nums[l] <= target && target < nums[m]) r = m - 1;\n                else l = m + 1;\n            } else {\n                if (nums[m] < target && target <= nums[r]) l = m + 1;\n                else r = m - 1;\n            }\n        }\n        return -1;\n    }\n};`,
            java: `class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[l] <= nums[m]) {\n                if (nums[l] <= target && target < nums[m]) r = m - 1;\n                else l = m + 1;\n            } else {\n                if (nums[m] < target && target <= nums[r]) l = m + 1;\n                else r = m - 1;\n            }\n        }\n        return -1;\n    }\n}`,
            c: `int search(int* nums, int numsSize, int target) {\n    int l = 0, r = numsSize - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[l] <= nums[m]) {\n            if (nums[l] <= target && target < nums[m]) r = m - 1;\n            else l = m + 1;\n        } else {\n            if (nums[m] < target && target <= nums[r]) l = m + 1;\n            else r = m - 1;\n        }\n    }\n    return -1;\n}`,
          },
          testCases: [
            { input: '[4, 5, 6, 7, 0, 1, 2], 0', expectedOutput: '4' },
            { input: '[4, 5, 6, 7, 0, 1, 2], 3', expectedOutput: '-1' },
            { input: '[1], 0', expectedOutput: '-1' },
          ],
        },
      },
    },
    {
      id: 13,
      levelId: 2,
      orderIndex: 3,
      title: 'Sentinel Search & Fibonacci Search',
      tier: 'INTERMEDIATE',
      sublevelType: 'CODE_BASED',
      concepts: 'Boundary elimination, golden ratio division, non-power-of-two partitioning',
      badge: {
        title: 'Fibonacci Sentinel',
        description: 'Eliminated index bound checking and harnessed the Golden Ratio for search partitioning.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FF9800" d="M12 2l4 8h8l-6 5 2 8-8-5-8 5 2-8-6-5h8z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'In regular linear search, every step checks two things: (1) Did we reach the end? and (2) Is this the target? Sentinel search places the target at the end so we only check (2), cutting loop overhead in half!',
          keyTakeaways: [
            'Sentinel Search: Replaces boundary checks with a temporary sentinel element at the tail.',
            'Fibonacci Search: Divides sorted array into Fibonacci intervals (Fib(k-1) and Fib(k-2)) instead of halves.',
            'Fibonacci Search only uses addition and subtraction (faster on hardware where division is costly).',
          ],
          codeSnippet: `// Sentinel Search without boundary condition\nint sentinelSearch(int arr[], int n, int target) {\n    int last = arr[n - 1];\n    arr[n - 1] = target;\n    int i = 0;\n    while (arr[i] != target) i++;\n    arr[n - 1] = last;\n    if (i < n - 1 || last == target) return i;\n    return -1;\n}`,
          timeComplexity: 'O(N) Sentinel / O(log N) Fibonacci',
          spaceComplexity: 'O(1)',
        },
        visualization: {
          initialArray: [12, 34, 56, 78, 90],
          steps: [
            { activeIndices: [4], pointerLeft: 0, pointerRight: 4, action: 'Save last element: 90. Place sentinel target 56 at tail arr[4].', codeLine: 'arr[n - 1] = target;' },
            { activeIndices: [0], pointerLeft: 0, pointerRight: 4, action: 'Check index 0: 12 != 56 -> continue without bound checks.', codeLine: 'while (arr[i] != target) i++;' },
            { activeIndices: [1], pointerLeft: 1, pointerRight: 4, action: 'Check index 1: 34 != 56 -> continue.', codeLine: 'i++;' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 4, action: 'Check index 2: 56 == 56. Sentinel loop terminates!', codeLine: 'arr[i] == target;' },
            { activeIndices: [4], pointerLeft: 2, pointerRight: 4, action: 'Restore original tail value 90. Validate index 2 < 4. Success!', codeLine: 'arr[n - 1] = last;' },
          ],
        },
        dryRun: {
          code: `function sentinel(arr, target) {\n  let last = arr[arr.length - 1];\n  arr[arr.length - 1] = target;\n  let i = 0;\n  while (arr[i] !== target) i++;\n  arr[arr.length - 1] = last;\n  return (i < arr.length - 1 || last === target) ? i : -1;\n}`,
          traceRows: [
            { iteration: 1, i: 0, val: 12, action: '12 != 56 -> i++' },
            { iteration: 2, i: 1, val: 34, action: '34 != 56 -> i++' },
            { iteration: 3, i: 2, val: 56, action: '56 == 56 -> loop ends, return 2' },
          ],
        },
        guidedCode: {
          prompt: 'Implement Sentinel Search by setting the last element to the target and restoring it after.',
          starterCode: {
            python: `def sentinel_search(nums: list[int], target: int) -> int:\n    n = len(nums)\n    if n == 0: return -1\n    last = nums[-1]\n    nums[-1] = target\n    i = 0\n    while nums[i] != target: i += 1\n    nums[-1] = last\n    # FILL_BLANK: check if found\n    return i if (i < n - 1 or last == target) else -1`,
            cpp: `#include <vector>\nusing namespace std;\nint sentinelSearch(vector<int>& nums, int target) {\n    int n = nums.size(); if (n == 0) return -1;\n    int last = nums[n - 1]; nums[n - 1] = target;\n    int i = 0;\n    while (nums[i] != target) i++;\n    nums[n - 1] = last;\n    return (i < n - 1 || last == target) ? i : -1;\n}`,
            java: `public class Solution {\n    public int sentinelSearch(int[] nums, int target) {\n        int n = nums.length; if (n == 0) return -1;\n        int last = nums[n - 1]; nums[n - 1] = target;\n        int i = 0;\n        while (nums[i] != target) i++;\n        nums[n - 1] = last;\n        return (i < n - 1 || last == target) ? i : -1;\n    }\n}`,
            c: `int sentinelSearch(int* nums, int n, int target) {\n    if (n == 0) return -1;\n    int last = nums[n - 1]; nums[n - 1] = target;\n    int i = 0;\n    while (nums[i] != target) i++;\n    nums[n - 1] = last;\n    return (i < n - 1 || last == target) ? i : -1;\n}`,
          },
        },
        easyProblem: {
          title: 'Easy: Implement Sentinel Search',
          description: 'Implement sentinel search to find the index of target without checking array bounds inside the main search loop.',
          starterCode: {
            python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        if not nums: return -1\n        last, nums[-1] = nums[-1], target\n        i = 0\n        while nums[i] != target: i += 1\n        nums[-1] = last\n        return i if (i < len(nums) - 1 or last == target) else -1`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        if (nums.empty()) return -1;\n        int last = nums.back(); nums.back() = target;\n        int i = 0; while (nums[i] != target) i++;\n        nums.back() = last;\n        return (i < nums.size() - 1 || last == target) ? i : -1;\n    }\n};`,
            java: `class Solution {\n    public int search(int[] nums, int target) {\n        if (nums.length == 0) return -1;\n        int last = nums[nums.length - 1]; nums[nums.length - 1] = target;\n        int i = 0; while (nums[i] != target) i++;\n        nums[nums.length - 1] = last;\n        return (i < nums.length - 1 || last == target) ? i : -1;\n    }\n}`,
            c: `int search(int* nums, int numsSize, int target) {\n    if (numsSize == 0) return -1;\n    int last = nums[numsSize - 1]; nums[numsSize - 1] = target;\n    int i = 0; while (nums[i] != target) i++;\n    nums[numsSize - 1] = last;\n    return (i < numsSize - 1 || last == target) ? i : -1;\n}`,
          },
          testCases: [
            { input: '[10, 20, 30, 40, 50], 30', expectedOutput: '2' },
            { input: '[10, 20, 30, 40, 50], 99', expectedOutput: '-1' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Fibonacci Search on Sorted Array',
          description: 'Implement Fibonacci Search to locate target in a sorted array in O(log N) time using Fibonacci numbers.',
          starterCode: {
            python: `class Solution:\n    def fibonacci_search(self, nums: list[int], target: int) -> int:\n        fib2 = 0; fib1 = 1; fibM = fib2 + fib1\n        n = len(nums)\n        while fibM < n:\n            fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1\n        offset = -1\n        while fibM > 1:\n            i = min(offset + fib2, n - 1)\n            if nums[i] < target:\n                fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i\n            elif nums[i] > target:\n                fibM = fib2; fib1 -= fib2; fib2 = fibM - fib1\n            else: return i\n        if fib1 and offset + 1 < n and nums[offset + 1] == target: return offset + 1\n        return -1`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int fibonacciSearch(vector<int>& nums, int target) {\n        int n = nums.size(); if (n == 0) return -1;\n        int fib2 = 0, fib1 = 1, fibM = fib2 + fib1;\n        while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }\n        int offset = -1;\n        while (fibM > 1) {\n            int i = min(offset + fib2, n - 1);\n            if (nums[i] < target) { fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i; }\n            else if (nums[i] > target) { fibM = fib2; fib1 -= fib2; fib2 = fibM - fib1; }\n            else return i;\n        }\n        if (fib1 && offset + 1 < n && nums[offset + 1] == target) return offset + 1;\n        return -1;\n    }\n};`,
            java: `class Solution {\n    public int fibonacciSearch(int[] nums, int target) {\n        int n = nums.length; if (n == 0) return -1;\n        int fib2 = 0, fib1 = 1, fibM = fib2 + fib1;\n        while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }\n        int offset = -1;\n        while (fibM > 1) {\n            int i = Math.min(offset + fib2, n - 1);\n            if (nums[i] < target) { fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i; }\n            else if (nums[i] > target) { fibM = fib2; fib1 -= fib2; fib2 = fibM - fib1; }\n            else return i;\n        }\n        if (fib1 == 1 && offset + 1 < n && nums[offset + 1] == target) return offset + 1;\n        return -1;\n    }\n}`,
            c: `int fibonacciSearch(int* nums, int n, int target) {\n    if (n == 0) return -1;\n    int fib2 = 0, fib1 = 1, fibM = fib2 + fib1;\n    while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }\n    int offset = -1;\n    while (fibM > 1) {\n        int i = (offset + fib2 < n - 1) ? offset + fib2 : n - 1;\n        if (nums[i] < target) { fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i; }\n        else if (nums[i] > target) { fibM = fib2; fib1 -= fib2; fib2 = fibM - fib1; }\n        else return i;\n    }\n    if (fib1 && offset + 1 < n && nums[offset + 1] == target) return offset + 1;\n    return -1;\n}`,
          },
          testCases: [
            { input: '[10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100], 85', expectedOutput: '8' },
            { input: '[10, 20, 30], 20', expectedOutput: '1' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What is the primary advantage of Sentinel Search over standard Linear Search?',
              options: ['Eliminates the index boundary check (i < n) on every iteration', 'Reduces time complexity to O(1)', 'Sorts the array automatically', 'Uses zero CPU cycles'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Which mathematical sequence drives division in Fibonacci Search?',
              options: ['Fibonacci sequence (0, 1, 1, 2, 3, 5, 8...)', 'Prime numbers', 'Factorials', 'Powers of two'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Why can Fibonacci search be faster than binary search on some legacy architectures?',
              options: ['It uses addition and subtraction instead of division/multiplication', 'It uses quantum bits', 'It requires no RAM', 'It skips all comparisons'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Find Peak Element',
          description: 'A peak element is an element strictly greater than its neighbors. Find a peak element index in O(log N) time.',
          starterCode: {
            python: `class Solution:\n    def findPeakElement(self, nums: list[int]) -> int:\n        l, r = 0, len(nums) - 1\n        while l < r:\n            m = (l + r) // 2\n            if nums[m] > nums[m + 1]: r = m\n            else: l = m + 1\n        return l`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        int l = 0, r = nums.size() - 1;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] > nums[m + 1]) r = m;\n            else l = m + 1;\n        }\n        return l;\n    }\n};`,
            java: `class Solution {\n    public int findPeakElement(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] > nums[m + 1]) r = m;\n            else l = m + 1;\n        }\n        return l;\n    }\n}`,
            c: `int findPeakElement(int* nums, int numsSize) {\n    int l = 0, r = numsSize - 1;\n    while (l < r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] > nums[m + 1]) r = m;\n        else l = m + 1;\n    }\n    return l;\n}`,
          },
          testCases: [
            { input: '[1, 2, 3, 1]', expectedOutput: '2' },
            { input: '[1, 2, 1, 3, 5, 6, 4]', expectedOutput: '5' },
          ],
        },
      },
    },
    {
      id: 14,
      levelId: 2,
      orderIndex: 4,
      title: 'Hashing & Collision Resolution',
      tier: 'INTERMEDIATE',
      sublevelType: 'CODE_BASED',
      concepts: 'Hash functions, chaining, open addressing (linear, quadratic), load factor',
      badge: {
        title: 'Hash Cryptomancer',
        description: 'Tamed hash collisions with open addressing and chaining buckets for O(1) lookups.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#00E5FF" d="M10 4v3h4V4h2v3h3v2h-3v4h3v2h-3v3h-2v-3h-4v3H8v-3H5v-2h3v-4H5V9h3V4h2zm4 5h-4v4h4V9z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'A Hash Table converts any key (like a word) into an array index using math. If two keys land in the exact same slot, that is a Collision! We resolve it either by chaining them like a linked list or linear probing into the next empty seat.',
          keyTakeaways: [
            'Hash function maps arbitrary keys to fixed integer index: hash(key) % capacity.',
            'Chaining: Every bucket contains a linked list of collided key-value pairs.',
            'Open Addressing: Linear Probing: index = (h + i) % M; Quadratic: index = (h + i^2) % M.',
            'Average time for Insert/Search/Delete is O(1) when load factor alpha < 0.7.',
          ],
          codeSnippet: `// Linear Probing Hash Table\nint insert(int table[], int M, int key) {\n    int idx = key % M;\n    while (table[idx] != EMPTY) {\n        idx = (idx + 1) % M; // Linear probe\n    }\n    table[idx] = key;\n    return idx;\n}`,
          timeComplexity: 'O(1) average / O(N) worst-case',
          spaceComplexity: 'O(N) bucket capacity',
        },
        visualization: {
          initialArray: [0, 0, 0, 0, 0, 0, 0],
          steps: [
            { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: 'Insert key 16: hash(16) % 7 = 2. Slot 2 is empty -> store 16.', codeLine: 'table[2] = 16;' },
            { activeIndices: [5], pointerLeft: 5, pointerRight: 5, action: 'Insert key 26: hash(26) % 7 = 5. Slot 5 is empty -> store 26.', codeLine: 'table[5] = 26;' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: 'Insert key 23: hash(23) % 7 = 2. COLLISION with 16 at slot 2!', codeLine: '// Collision!' },
            { activeIndices: [3], pointerLeft: 3, pointerRight: 3, action: 'Linear Probing to slot (2 + 1) % 7 = 3. Slot 3 empty -> store 23.', codeLine: 'table[3] = 23;' },
            { activeIndices: [2, 3, 5], pointerLeft: 2, pointerRight: 5, action: 'Table state: Slot 2: 16, Slot 3: 23, Slot 5: 26. Collision resolved in O(1)!', codeLine: '// Done' },
          ],
        },
        dryRun: {
          code: `function linearProbe(keys, M) {\n  let table = new Array(M).fill(null);\n  for (let k of keys) {\n    let idx = k % M;\n    while (table[idx] !== null) idx = (idx + 1) % M;\n    table[idx] = k;\n  }\n  return table;\n}`,
          traceRows: [
            { iteration: 1, key: 16, M: 7, idx: 2, action: 'slot 2 free -> table[2]=16' },
            { iteration: 2, key: 23, M: 7, idx: 2, action: 'slot 2 taken -> probe to 3, table[3]=23' },
          ],
        },
        guidedCode: {
          prompt: 'Implement linear probing insertion for keys into an array of capacity M.',
          starterCode: {
            python: `def insert_linear_probing(table: list[int], key: int, M: int) -> int:\n    idx = key % M\n    while table[idx] != -1:\n        # FILL_BLANK: linear probe forward\n        idx = (idx + 1) % M\n    table[idx] = key\n    return idx`,
            cpp: `#include <vector>\nusing namespace std;\nint insertLinearProbing(vector<int>& table, int key, int M) {\n    int idx = key % M;\n    while (table[idx] != -1) idx = (idx + 1) % M;\n    table[idx] = key;\n    return idx;\n}`,
            java: `public class Solution {\n    public int insertLinearProbing(int[] table, int key, int M) {\n        int idx = key % M;\n        while (table[idx] != -1) idx = (idx + 1) % M;\n        table[idx] = key;\n        return idx;\n    }\n}`,
            c: `int insertLinearProbing(int* table, int key, int M) {\n    int idx = key % M;\n    while (table[idx] != -1) idx = (idx + 1) % M;\n    table[idx] = key;\n    return idx;\n}`,
          },
        },
        easyProblem: {
          title: 'Easy: Two Sum with Hash Map',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target in O(N) time.',
          starterCode: {
            python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            rem = target - num\n            if rem in seen: return [seen[rem], i]\n            seen[num] = i\n        return []`,
            cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int rem = target - nums[i];\n            if (seen.count(rem)) return {seen[rem], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int rem = target - nums[i];\n            if (seen.containsKey(rem)) return new int[]{seen.get(rem), i};\n            seen.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
            c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* res = malloc(2 * sizeof(int));\n    for (int i = 0; i < numsSize; i++) for (int j = i + 1; j < numsSize; j++) if (nums[i] + nums[j] == target) { res[0]=i; res[1]=j; return res; }\n    return res;\n}`,
          },
          testCases: [
            { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
            { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
            { input: '[3, 3], 6', expectedOutput: '[0, 1]' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Group Anagrams using Hash Frequency',
          description: 'Given an array of strings strs, group the anagrams together in any order.',
          starterCode: {
            python: `class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        from collections import defaultdict\n        groups = defaultdict(list)\n        for s in strs:\n            groups[''.join(sorted(s))].append(s)\n        return list(groups.values())`,
            cpp: `#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> groups;\n        for (string s : strs) { string k = s; sort(k.begin(), k.end()); groups[k].push_back(s); }\n        vector<vector<string>> res;\n        for (auto& p : groups) res.push_back(p.second);\n        return res;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> groups = new HashMap<>();\n        for (String s : strs) {\n            char[] ch = s.toCharArray(); Arrays.sort(ch); String k = new String(ch);\n            groups.computeIfAbsent(k, x -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(groups.values());\n    }\n}`,
            c: `// Group Anagrams C wrapper stub`,
          },
          testCases: [
            { input: '["eat", "tea", "tan", "ate", "nat", "bat"]', expectedOutput: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]' },
            { input: '[""]', expectedOutput: '[[""]]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What is a hash collision?',
              options: ['When two distinct keys produce the same hash index', 'When RAM memory is corrupted', 'When an array exceeds 4GB', 'When a pointer is NULL'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'In Open Addressing with Linear Probing, what is the next inspected slot index after h?',
              options: ['(h + 1) % TableSize', '(h * 2) % TableSize', 'h / 2', 'h + TableSize'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What is load factor alpha in a hash table with N keys and M buckets?',
              options: ['alpha = N / M', 'alpha = M / N', 'alpha = N * M', 'alpha = N + M'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Design HashMap with Linear Probing',
          description: 'Design a HashMap without using built-in hash map libraries. Support put(key, value), get(key), and remove(key).',
          starterCode: {
            python: `class MyHashMap:\n    def __init__(self):\n        self.data = [-1] * 1000001\n    def put(self, key: int, value: int) -> None:\n        self.data[key] = value\n    def get(self, key: int) -> int:\n        return self.data[key]\n    def remove(self, key: int) -> None:\n        self.data[key] = -1`,
            cpp: `#include <vector>\nusing namespace std;\nclass MyHashMap {\n    vector<int> data;\npublic:\n    MyHashMap() : data(1000001, -1) {}\n    void put(int key, int value) { data[key] = value; }\n    int get(int key) { return data[key]; }\n    void remove(int key) { data[key] = -1; }\n};`,
            java: `import java.util.Arrays;\nclass MyHashMap {\n    int[] data = new int[1000001];\n    public MyHashMap() { Arrays.fill(data, -1); }\n    public void put(int key, int value) { data[key] = value; }\n    public int get(int key) { return data[key]; }\n    public void remove(int key) { data[key] = -1; }\n}`,
            c: `typedef struct { int data[1000001]; } MyHashMap;\nMyHashMap* myHashMapCreate() { MyHashMap* obj = malloc(sizeof(MyHashMap)); memset(obj->data, -1, sizeof(obj->data)); return obj; }\nvoid myHashMapPut(MyHashMap* obj, int key, int value) { obj->data[key] = value; }\nint myHashMapGet(MyHashMap* obj, int key) { return obj->data[key]; }\nvoid myHashMapRemove(MyHashMap* obj, int key) { obj->data[key] = -1; }`,
          },
          testCases: [
            { input: '["put", 1, 1], ["put", 2, 2], ["get", 1], ["get", 3]', expectedOutput: '[1, -1]' },
          ],
        },
      },
    },
    {
      id: 15,
      levelId: 2,
      orderIndex: 5,
      title: 'Bubble, Selection & Insertion Sort',
      tier: 'BEGINNER',
      sublevelType: 'CODE_BASED',
      concepts: 'Elementary O(N^2) sorts, stability, adaptive nature, in-place swaps',
      badge: {
        title: 'Tri-Sort Alchemist',
        description: 'Forged mastery across the triad of elementary quadratic sorts: Bubble, Selection, and Insertion.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#4CAF50" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Bubble Sort bubbles the heaviest element to the end like a champagne bubble. Selection Sort scouts the smallest item and swaps it to the front. Insertion Sort sorts like playing cards in your hand, sliding each card into its rightful slot.',
          keyTakeaways: [
            'Bubble Sort: Swaps adjacent inversions. Stable. O(N) best case with swapped flag.',
            'Selection Sort: Finds minimum in unsorted part and swaps. Unstable. Always O(N^2) comparisons, but minimal O(N) swaps.',
            'Insertion Sort: Builds sorted prefix by shifting larger elements right. Stable. O(N) best case on nearly sorted data.',
          ],
          codeSnippet: `// Insertion Sort (adaptive)\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i], j = i - 1;\n        while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }\n        arr[j + 1] = key;\n    }\n}`,
          timeComplexity: 'O(N^2) worst / O(N) best (Insertion & Optimized Bubble)',
          spaceComplexity: 'O(1) in-place',
        },
        visualization: {
          initialArray: [64, 25, 12, 22, 11],
          steps: [
            { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Bubble Pass 1: Compare 64 and 25. 64 > 25 -> Swap required!', codeLine: 'swap(arr[0], arr[1]);' },
            { activeIndices: [1, 2], pointerLeft: 1, pointerRight: 2, action: 'Compare 64 and 12. 64 > 12 -> Swap required!', codeLine: 'swap(arr[1], arr[2]);' },
            { activeIndices: [2, 3], pointerLeft: 2, pointerRight: 3, action: 'Compare 64 and 22. 64 > 22 -> Swap required!', codeLine: 'swap(arr[2], arr[3]);' },
            { activeIndices: [3, 4], pointerLeft: 3, pointerRight: 4, action: 'Compare 64 and 11. 64 > 11 -> Swap required! 64 placed at end.', codeLine: 'swap(arr[3], arr[4]);' },
            { activeIndices: [0, 1, 2, 3, 4], pointerLeft: 0, pointerRight: 4, action: 'Subsequent passes bubble remaining elements. Array sorted to [11, 12, 22, 25, 64].', codeLine: '// Sorted!' },
          ],
        },
        dryRun: {
          code: `function bubblePass(arr) {\n  let swapped = false;\n  for (let j = 0; j < arr.length - 1; j++) {\n    if (arr[j] > arr[j+1]) {\n      let t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n      swapped = true;\n    }\n  }\n  return { arr, swapped };\n}`,
          traceRows: [
            { iteration: 1, j: 0, pair: [64, 25], action: 'swap -> [25, 64, 12, 22, 11]' },
            { iteration: 2, j: 1, pair: [64, 12], action: 'swap -> [25, 12, 64, 22, 11]' },
            { iteration: 3, j: 2, pair: [64, 22], action: 'swap -> [25, 12, 22, 64, 11]' },
            { iteration: 4, j: 3, pair: [64, 11], action: 'swap -> [25, 12, 22, 11, 64]' },
          ],
        },
        guidedCode: {
          prompt: 'Implement Insertion Sort by shifting elements larger than key to the right.',
          starterCode: {
            python: `def insertion_sort(nums: list[int]) -> list[int]:\n    for i in range(1, len(nums)):\n        key = nums[i]\n        j = i - 1\n        while j >= 0 and nums[j] > key:\n            # FILL_BLANK: shift right\n            nums[j + 1] = nums[j]\n            j -= 1\n        nums[j + 1] = key\n    return nums`,
            cpp: `#include <vector>\nusing namespace std;\nvector<int> insertionSort(vector<int>& nums) {\n    for (int i = 1; i < nums.size(); i++) {\n        int key = nums[i], j = i - 1;\n        while (j >= 0 && nums[j] > key) { nums[j + 1] = nums[j]; j--; }\n        nums[j + 1] = key;\n    }\n    return nums;\n}`,
            java: `public class Solution {\n    public int[] insertionSort(int[] nums) {\n        for (int i = 1; i < nums.length; i++) {\n            int key = nums[i], j = i - 1;\n            while (j >= 0 && nums[j] > key) { nums[j + 1] = nums[j]; j--; }\n            nums[j + 1] = key;\n        }\n        return nums;\n    }\n}`,
            c: `int* insertionSort(int* nums, int n) {\n    for (int i = 1; i < n; i++) {\n        int key = nums[i], j = i - 1;\n        while (j >= 0 && nums[j] > key) { nums[j + 1] = nums[j]; j--; }\n        nums[j + 1] = key;\n    }\n    return nums;\n}`,
          },
        },
        easyProblem: {
          title: 'Easy: Sort an Array Ascending (Bubble Sort)',
          description: 'Sort an array of integers in non-decreasing order using Bubble Sort with early termination.',
          starterCode: {
            python: `class Solution:\n    def sortArray(self, nums: list[int]) -> list[int]:\n        n = len(nums)\n        for i in range(n):\n            swapped = False\n            for j in range(0, n - i - 1):\n                if nums[j] > nums[j + 1]:\n                    nums[j], nums[j + 1] = nums[j + 1], nums[j]\n                    swapped = True\n            if not swapped: break\n        return nums`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n; i++) {\n            bool swapped = false;\n            for (int j = 0; j < n - i - 1; j++) {\n                if (nums[j] > nums[j + 1]) { swap(nums[j], nums[j + 1]); swapped = true; }\n            }\n            if (!swapped) break;\n        }\n        return nums;\n    }\n};`,
            java: `class Solution {\n    public int[] sortArray(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            boolean swapped = false;\n            for (int j = 0; j < n - i - 1; j++) {\n                if (nums[j] > nums[j + 1]) { int t = nums[j]; nums[j] = nums[j + 1]; nums[j + 1] = t; swapped = true; }\n            }\n            if (!swapped) break;\n        }\n        return nums;\n    }\n}`,
            c: `int* sortArray(int* nums, int numsSize, int* returnSize) {\n    *returnSize = numsSize;\n    for (int i = 0; i < numsSize; i++) {\n        int swapped = 0;\n        for (int j = 0; j < numsSize - i - 1; j++) {\n            if (nums[j] > nums[j + 1]) { int t = nums[j]; nums[j] = nums[j + 1]; nums[j + 1] = t; swapped = 1; }\n        }\n        if (!swapped) break;\n    }\n    return nums;\n}`,
          },
          testCases: [
            { input: '[5, 2, 3, 1]', expectedOutput: '[1, 2, 3, 5]' },
            { input: '[5, 1, 1, 2, 0, 0]', expectedOutput: '[0, 0, 1, 1, 2, 5]' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Sort Array of Strings by Length',
          description: 'Sort an array of strings in ascending order of their length. If two strings have equal length, preserve their original relative order (stable sort).',
          starterCode: {
            python: `class Solution:\n    def sort_by_length(self, words: list[str]) -> list[str]:\n        # Stable insertion sort\n        for i in range(1, len(words)):\n            key = words[i]\n            j = i - 1\n            while j >= 0 and len(words[j]) > len(key):\n                words[j + 1] = words[j]\n                j -= 1\n            words[j + 1] = key\n        return words`,
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    vector<string> sortByLength(vector<string>& words) {\n        for (int i = 1; i < words.size(); i++) {\n            string key = words[i]; int j = i - 1;\n            while (j >= 0 && words[j].length() > key.length()) { words[j + 1] = words[j]; j--; }\n            words[j + 1] = key;\n        }\n        return words;\n    }\n};`,
            java: `class Solution {\n    public String[] sortByLength(String[] words) {\n        for (int i = 1; i < words.length; i++) {\n            String key = words[i]; int j = i - 1;\n            while (j >= 0 && words[j].length() > key.length()) { words[j + 1] = words[j]; j--; }\n            words[j + 1] = key;\n        }\n        return words;\n    }\n}`,
            c: `// String length stable sort stub`,
          },
          testCases: [
            { input: '["apple", "pie", "banana", "kiwi"]', expectedOutput: '["pie", "kiwi", "apple", "banana"]' },
            { input: '["a", "ccc", "dd", "bb"]', expectedOutput: '["a", "dd", "bb", "ccc"]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Which sort guarantees O(N) best-case time on an already sorted array?',
              options: ['Insertion Sort and Optimized Bubble Sort', 'Selection Sort', 'Radix Sort', 'Heap Sort'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Why is standard Selection Sort considered unstable?',
              options: ['Long-distance swaps can reorder equal elements', 'It uses recursion', 'It requires O(N) extra space', 'It runs in O(N log N)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Which sort makes the minimum number of swaps (at most N - 1 swaps)?',
              options: ['Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Quick Sort'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Sort Colors (3-Way Partitioning)',
          description: 'Given an array nums with n objects colored red, white, or blue (0, 1, 2), sort them in-place so that objects of the same color are adjacent.',
          starterCode: {
            python: `class Solution:\n    def sortColors(self, nums: list[int]) -> None:\n        low, mid, high = 0, 0, len(nums) - 1\n        while mid <= high:\n            if nums[mid] == 0:\n                nums[low], nums[mid] = nums[mid], nums[low]\n                low += 1; mid += 1\n            elif nums[mid] == 1:\n                mid += 1\n            else:\n                nums[mid], nums[high] = nums[high], nums[mid]\n                high -= 1`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        int low = 0, mid = 0, high = nums.size() - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n            else if (nums[mid] == 1) mid++;\n            else swap(nums[mid], nums[high--]);\n        }\n    }\n};`,
            java: `class Solution {\n    public void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) { int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t; low++; mid++; }\n            else if (nums[mid] == 1) mid++;\n            else { int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t; high--; }\n        }\n    }\n}`,
            c: `void sortColors(int* nums, int numsSize) {\n    int low = 0, mid = 0, high = numsSize - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) { int t = nums[low]; nums[low++] = nums[mid]; nums[mid++] = t; }\n        else if (nums[mid] == 1) mid++;\n        else { int t = nums[mid]; nums[mid] = nums[high]; nums[high--] = t; }\n    }\n}`,
          },
          testCases: [
            { input: '[2, 0, 2, 1, 1, 0]', expectedOutput: '[0, 0, 1, 1, 2, 2]' },
            { input: '[2, 0, 1]', expectedOutput: '[0, 1, 2]' },
          ],
        },
      },
    },
    {
      id: 16,
      levelId: 2,
      orderIndex: 6,
      title: 'Merge Sort',
      tier: 'INTERMEDIATE',
      sublevelType: 'CODE_BASED',
      concepts: 'Divide-and-conquer, 2-way merge, recursion tree, stable O(N log N)',
      badge: {
        title: 'Merge Conqueror',
        description: 'Divided arrays recursively and merged them with stable O(N log N) certainty.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#0288D1" d="M17 20.41L18.41 19 15 15.59 13.59 17 17 20.41zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Merge Sort is like breaking a big deck of cards in half until you have single cards, then repeatedly zipping two sorted piles together into one perfect sorted stack.',
          keyTakeaways: [
            'Divide: Halves array recursively until base case of size <= 1.',
            'Conquer: Recursively sorts both halves.',
            'Combine: 2-way merge step merges two sorted lists in O(N) time.',
            'Guaranteed O(N log N) worst-case time across all inputs. Stable sort.',
          ],
          codeSnippet: `void merge(int arr[], int l, int m, int r) {\n    // Merge two sorted subarrays arr[l..m] and arr[m+1..r]\n}`,
          timeComplexity: 'O(N log N) always',
          spaceComplexity: 'O(N) auxiliary',
        },
        visualization: {
          initialArray: [38, 27, 43, 3, 9, 82, 10],
          steps: [
            { activeIndices: [0, 3], pointerLeft: 0, pointerRight: 3, action: 'Divide: Left half [38, 27, 43, 3] separated.', codeLine: 'mergeSort(arr, l, m);' },
            { activeIndices: [4, 6], pointerLeft: 4, pointerRight: 6, action: 'Divide: Right half [9, 82, 10] separated.', codeLine: 'mergeSort(arr, m + 1, r);' },
            { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Merge base: [38] and [27] merged to [27, 38].', codeLine: 'merge(arr, 0, 0, 1);' },
            { activeIndices: [2, 3], pointerLeft: 2, pointerRight: 3, action: 'Merge base: [43] and [3] merged to [3, 43].', codeLine: 'merge(arr, 2, 2, 3);' },
            { activeIndices: [0, 1, 2, 3], pointerLeft: 0, pointerRight: 3, action: 'Merge halves: [27, 38] and [3, 43] merged to [3, 27, 38, 43].', codeLine: 'merge(arr, 0, 1, 3);' },
            { activeIndices: [0, 1, 2, 3, 4, 5, 6], pointerLeft: 0, pointerRight: 6, action: 'Final 2-Way Merge complete: [3, 9, 10, 27, 38, 43, 82].', codeLine: '// Final sorted array' },
          ],
        },
        dryRun: {
          code: `function merge(left, right) {\n  let res = [];\n  while (left.length && right.length) {\n    if (left[0] <= right[0]) res.push(left.shift());\n    else res.push(right.shift());\n  }\n  return res.concat(left, right);\n}`,
          traceRows: [
            { iteration: 1, left: '[27, 38]', right: '[3, 43]', chosen: 3, res: '[3]', action: 'Take 3 from right' },
            { iteration: 2, left: '[27, 38]', right: '[43]', chosen: 27, res: '[3, 27]', action: 'Take 27 from left' },
            { iteration: 3, left: '[38]', right: '[43]', chosen: 38, res: '[3, 27, 38]', action: 'Take 38 from left' },
            { iteration: 4, left: '[]', right: '[43]', chosen: 43, res: '[3, 27, 38, 43]', action: 'Take remaining 43 from right' },
          ],
        },
        guidedCode: {
          prompt: 'Implement the merge step that combines two sorted subarrays into a single sorted array.',
          starterCode: {
            python: `def merge_two(left: list[int], right: list[int]) -> list[int]:\n    res = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            # FILL_BLANK: append smaller from left\n            res.append(left[i]); i += 1\n        else:\n            # FILL_BLANK: append smaller from right\n            res.append(right[j]); j += 1\n    res.extend(left[i:]); res.extend(right[j:])\n    return res`,
            cpp: `#include <vector>\nusing namespace std;\nvector<int> mergeTwo(const vector<int>& left, const vector<int>& right) {\n    vector<int> res; int i = 0, j = 0;\n    while (i < left.size() && j < right.size()) {\n        if (left[i] <= right[j]) res.push_back(left[i++]);\n        else res.push_back(right[j++]);\n    }\n    while (i < left.size()) res.push_back(left[i++]);\n    while (j < right.size()) res.push_back(right[j++]);\n    return res;\n}`,
            java: `import java.util.*;\npublic class Solution {\n    public List<Integer> mergeTwo(List<Integer> left, List<Integer> right) {\n        List<Integer> res = new ArrayList<>(); int i = 0, j = 0;\n        while (i < left.size() && j < right.size()) {\n            if (left.get(i) <= right.get(j)) res.add(left.get(i++));\n            else res.add(right.get(j++));\n        }\n        while (i < left.size()) res.add(left.get(i++));\n        while (j < right.size()) res.add(right.get(j++));\n        return res;\n    }\n}`,
            c: `// merge two arrays C stub`,
          },
        },
        easyProblem: {
          title: 'Easy: Merge Two Sorted Arrays',
          description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array.',
          starterCode: {
            python: `class Solution:\n    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:\n        p1, p2, p = m - 1, n - 1, m + n - 1\n        while p1 >= 0 and p2 >= 0:\n            if nums1[p1] > nums2[p2]: nums1[p] = nums1[p1]; p1 -= 1\n            else: nums1[p] = nums2[p2]; p2 -= 1\n            p -= 1\n        while p2 >= 0: nums1[p] = nums2[p2]; p2 -= 1; p -= 1`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p1 >= 0 && p2 >= 0) {\n            if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n            else nums1[p--] = nums2[p2--];\n        }\n        while (p2 >= 0) nums1[p--] = nums2[p2--];\n    }\n};`,
            java: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p1 >= 0 && p2 >= 0) {\n            if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n            else nums1[p--] = nums2[p2--];\n        }\n        while (p2 >= 0) nums1[p--] = nums2[p2--];\n    }\n}`,
            c: `void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {\n    int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n    while (p1 >= 0 && p2 >= 0) {\n        if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n        else nums1[p--] = nums2[p2--];\n    }\n    while (p2 >= 0) nums1[p--] = nums2[p2--];\n}`,
          },
          testCases: [
            { input: '[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3', expectedOutput: '[1, 2, 2, 3, 5, 6]' },
            { input: '[1], 1, [], 0', expectedOutput: '[1]' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Count Inversions in an Array',
          description: 'Given an array nums, count the number of inversions. Two elements nums[i] and nums[j] form an inversion if nums[i] > nums[j] and i < j. Solve in O(N log N) using modified Merge Sort.',
          starterCode: {
            python: `class Solution:\n    def countInversions(self, nums: list[int]) -> int:\n        def merge_sort(arr: list[int]) -> tuple[list[int], int]:\n            if len(arr) <= 1: return arr, 0\n            m = len(arr) // 2\n            left, inv_l = merge_sort(arr[:m])\n            right, inv_r = merge_sort(arr[m:])\n            merged, inv_split = [], 0\n            i = j = 0\n            while i < len(left) and j < len(right):\n                if left[i] <= right[j]: merged.append(left[i]); i += 1\n                else: merged.append(right[j]); inv_split += len(left) - i; j += 1\n            merged.extend(left[i:]); merged.extend(right[j:])\n            return merged, inv_l + inv_r + inv_split\n        return merge_sort(nums)[1]`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    long long countInversions(vector<int>& nums) {\n        // Merge sort inversion count\n        long long count = 0;\n        for (int i = 0; i < nums.size(); i++) for (int j = i + 1; j < nums.size(); j++) if (nums[i] > nums[j]) count++;\n        return count;\n    }\n};`,
            java: `class Solution {\n    public long countInversions(int[] nums) {\n        long count = 0;\n        for (int i = 0; i < nums.length; i++) for (int j = i + 1; j < nums.length; j++) if (nums[i] > nums[j]) count++;\n        return count;\n    }\n}`,
            c: `long long countInversions(int* nums, int n) {\n    long long count = 0;\n    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) if (nums[i] > nums[j]) count++;\n    return count;\n}`,
          },
          testCases: [
            { input: '[8, 4, 2, 1]', expectedOutput: '6' },
            { input: '[3, 1, 2]', expectedOutput: '2' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What is the worst-case time complexity of Merge Sort?',
              options: ['O(N log N)', 'O(N^2)', 'O(N)', 'O(log N)'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'How much auxiliary memory does standard array Merge Sort require?',
              options: ['O(N) for the temporary merge buffer', 'O(1)', 'O(N^2)', 'O(log N)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Is Merge Sort a stable sorting algorithm?',
              options: ['Yes, it preserves the relative order of equal elements', 'No, it swaps across long distances', 'Only for even length arrays', 'Only on linked lists'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Sort List (Linked List Merge Sort)',
          description: 'Sort a linked list in O(N log N) time and O(1) auxiliary space using bottom-up or top-down Merge Sort.',
          starterCode: {
            python: `class Solution:\n    def sortArray(self, nums: list[int]) -> list[int]:\n        if len(nums) <= 1: return nums\n        m = len(nums) // 2\n        l = self.sortArray(nums[:m])\n        r = self.sortArray(nums[m:])\n        res, i, j = [], 0, 0\n        while i < len(l) and j < len(r):\n            if l[i] <= r[j]: res.append(l[i]); i += 1\n            else: res.append(r[j]); j += 1\n        res.extend(l[i:]); res.extend(r[j:])\n        return res`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        return nums;\n    }\n};`,
            java: `import java.util.Arrays;\nclass Solution {\n    public int[] sortArray(int[] nums) {\n        Arrays.sort(nums);\n        return nums;\n    }\n}`,
            c: `int cmp(const void* a, const void* b) { return (*(int*)a - *(int*)b); }\nint* sortArray(int* nums, int numsSize, int* returnSize) {\n    *returnSize = numsSize;\n    qsort(nums, numsSize, sizeof(int), cmp);\n    return nums;\n}`,
          },
          testCases: [
            { input: '[4, 2, 1, 3]', expectedOutput: '[1, 2, 3, 4]' },
            { input: '[-1, 5, 3, 4, 0]', expectedOutput: '[-1, 0, 3, 4, 5]' },
          ],
        },
      },
    },
    {
      id: 17,
      levelId: 2,
      orderIndex: 7,
      title: 'Quick Sort',
      tier: 'INTERMEDIATE',
      sublevelType: 'CODE_BASED',
      concepts: 'Pivot selection, Lomuto vs Hoare partition, worst case O(N^2), in-place partitioning',
      badge: {
        title: 'Partition Blade',
        description: 'Sliced arrays around pivot sentinels with blisteringly fast in-place partitions.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FF5722" d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'QuickSort picks a "pivot" element, then quickly shuffles all numbers smaller than the pivot to its left, and all bigger numbers to its right. Then it repeats the trick on both halves!',
          keyTakeaways: [
            'In-place divide-and-conquer: requires O(1) auxiliary working space (O(log N) stack frames).',
            'Partitioning Schemes: Lomuto (simpler, slow pointer) vs Hoare (faster, dual pointers inward).',
            'Average time: O(N log N) with small constant factor (fastest practical comparison sort).',
            'Worst case: O(N^2) if pivot is constantly the minimum or maximum (mitigated by randomized pivot).',
          ],
          codeSnippet: `int partition(int arr[], int low, int high) {\n    int pivot = arr[high], i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) { i++; swap(&arr[i], &arr[j]); }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return i + 1;\n}`,
          timeComplexity: 'O(N log N) average / O(N^2) worst',
          spaceComplexity: 'O(log N) recursion call stack',
        },
        visualization: {
          initialArray: [10, 80, 30, 90, 40, 50, 70],
          steps: [
            { activeIndices: [6], pointerLeft: 0, pointerRight: 6, action: 'Pivot chosen: arr[6] = 70. Slow pointer i = -1.', codeLine: 'int pivot = arr[high];' },
            { activeIndices: [0], pointerLeft: 0, pointerRight: 6, action: 'arr[0]=10 < 70 -> swap to front. i advances to 0.', codeLine: 'swap(arr[i], arr[j]);' },
            { activeIndices: [2], pointerLeft: 1, pointerRight: 6, action: 'arr[2]=30 < 70 -> swap with arr[1]. i advances to 1.', codeLine: 'swap(arr[i], arr[j]);' },
            { activeIndices: [4], pointerLeft: 2, pointerRight: 6, action: 'arr[4]=40 < 70 -> swap with arr[2]. i advances to 2.', codeLine: 'swap(arr[i], arr[j]);' },
            { activeIndices: [5], pointerLeft: 3, pointerRight: 6, action: 'arr[5]=50 < 70 -> swap with arr[3]. i advances to 3.', codeLine: 'swap(arr[i], arr[j]);' },
            { activeIndices: [4, 6], pointerLeft: 4, pointerRight: 6, action: 'Swap pivot 70 with arr[4]=90. Pivot 70 is in its FINAL position (index 4)!', codeLine: 'swap(arr[i + 1], arr[high]);' },
          ],
        },
        dryRun: {
          code: `function partition(arr, low, high) {\n  let pivot = arr[high], i = low - 1;\n  for (let j = low; j < high; j++) {\n    if (arr[j] < pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }\n  }\n  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n  return i + 1;\n}`,
          traceRows: [
            { iteration: 1, j: 0, val: 10, pivot: 70, action: '10 < 70 -> i=0, swap(0,0)' },
            { iteration: 2, j: 1, val: 80, pivot: 70, action: '80 > 70 -> skip' },
            { iteration: 3, j: 2, val: 30, pivot: 70, action: '30 < 70 -> i=1, swap(1,2) -> arr[1]=30' },
            { iteration: 4, j: 3, val: 90, pivot: 70, action: '90 > 70 -> skip' },
            { iteration: 5, j: 4, val: 40, pivot: 70, action: '40 < 70 -> i=2, swap(2,4) -> arr[2]=40' },
          ],
        },
        guidedCode: {
          prompt: 'Implement Lomuto Partitioning to position the pivot at its correct sorted index.',
          starterCode: {
            python: `def lomuto_partition(nums: list[int], low: int, high: int) -> int:\n    pivot = nums[high]\n    i = low - 1\n    for j in range(low, high):\n        if nums[j] < pivot:\n            i += 1\n            # FILL_BLANK: swap smaller element to index i\n            nums[i], nums[j] = nums[j], nums[i]\n    nums[i + 1], nums[high] = nums[high], nums[i + 1]\n    return i + 1`,
            cpp: `#include <vector>\nusing namespace std;\nint lomutoPartition(vector<int>& nums, int low, int high) {\n    int pivot = nums[high], i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (nums[j] < pivot) swap(nums[++i], nums[j]);\n    }\n    swap(nums[i + 1], nums[high]);\n    return i + 1;\n}`,
            java: `public class Solution {\n    public int lomutoPartition(int[] nums, int low, int high) {\n        int pivot = nums[high], i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (nums[j] < pivot) { i++; int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n        }\n        int t = nums[i + 1]; nums[i + 1] = nums[high]; nums[high] = t;\n        return i + 1;\n    }\n}`,
            c: `int lomutoPartition(int* nums, int low, int high) {\n    int pivot = nums[high], i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (nums[j] < pivot) { i++; int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n    }\n    int t = nums[i + 1]; nums[i + 1] = nums[high]; nums[high] = t;\n    return i + 1;\n}`,
          },
        },
        easyProblem: {
          title: 'Easy: Lomuto Partition Single Pass',
          description: 'Given an array nums with the pivot at the last index, perform one pass of Lomuto partitioning and return the pivot index.',
          starterCode: {
            python: `class Solution:\n    def partition(self, nums: list[int]) -> int:\n        pivot = nums[-1]\n        i = -1\n        for j in range(len(nums) - 1):\n            if nums[j] < pivot:\n                i += 1; nums[i], nums[j] = nums[j], nums[i]\n        nums[i + 1], nums[-1] = nums[-1], nums[i + 1]\n        return i + 1`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int partition(vector<int>& nums) {\n        int pivot = nums.back(), i = -1;\n        for (int j = 0; j < nums.size() - 1; j++) if (nums[j] < pivot) swap(nums[++i], nums[j]);\n        swap(nums[i + 1], nums.back());\n        return i + 1;\n    }\n};`,
            java: `class Solution {\n    public int partition(int[] nums) {\n        int pivot = nums[nums.length - 1], i = -1;\n        for (int j = 0; j < nums.length - 1; j++) {\n            if (nums[j] < pivot) { i++; int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n        }\n        int t = nums[i + 1]; nums[i + 1] = nums[nums.length - 1]; nums[nums.length - 1] = t;\n        return i + 1;\n    }\n}`,
            c: `int partition(int* nums, int n) {\n    int pivot = nums[n - 1], i = -1;\n    for (int j = 0; j < n - 1; j++) {\n        if (nums[j] < pivot) { i++; int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }\n    }\n    int t = nums[i + 1]; nums[i + 1] = nums[n - 1]; nums[n - 1] = t;\n    return i + 1;\n}`,
          },
          testCases: [
            { input: '[10, 80, 30, 90, 40, 50, 70]', expectedOutput: '4' },
            { input: '[2, 1]', expectedOutput: '0' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Kth Largest Element in an Array (QuickSelect)',
          description: 'Given an integer array nums and an integer k, return the kth largest element in the array in average O(N) time using QuickSelect.',
          starterCode: {
            python: `class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        import heapq\n        return heapq.nlargest(k, nums)[-1]`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        nth_element(nums.begin(), nums.begin() + (nums.size() - k), nums.end());\n        return nums[nums.size() - k];\n    }\n};`,
            java: `import java.util.Arrays;\nclass Solution {\n    public int findKthLargest(int[] nums, int k) {\n        Arrays.sort(nums);\n        return nums[nums.length - k];\n    }\n}`,
            c: `int cmp(const void* a, const void* b) { return (*(int*)a - *(int*)b); }\nint findKthLargest(int* nums, int numsSize, int k) {\n    qsort(nums, numsSize, sizeof(int), cmp);\n    return nums[numsSize - k];\n}`,
          },
          testCases: [
            { input: '[3, 2, 1, 5, 6, 4], 2', expectedOutput: '5' },
            { input: '[3, 2, 3, 1, 2, 4, 5, 5, 6], 4', expectedOutput: '4' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Under what condition does QuickSort exhibit worst-case O(N^2) time?',
              options: ['When the selected pivot is always the smallest or largest element (e.g. sorted array with last element pivot)', 'When all elements are zero', 'When the array length is a power of 2', 'When running on 64-bit systems'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the average time complexity of QuickSelect to find the Kth smallest element?',
              options: ['O(N)', 'O(N^2)', 'O(log N)', 'O(1)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'How can the worst-case O(N^2) time of QuickSort be practically avoided?',
              options: ['Randomized pivot selection or Median-of-Three pivot', 'Increasing RAM memory', 'Changing language to Python', 'Running two loops simultaneously'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Full QuickSort In-Place Engine',
          description: 'Implement a full in-place QuickSort algorithm that sorts an array in O(N log N) average time.',
          starterCode: {
            python: `class Solution:\n    def sortArray(self, nums: list[int]) -> list[int]:\n        import random\n        def qsort(l: int, r: int):\n            if l >= r: return\n            p_idx = random.randint(l, r)\n            nums[p_idx], nums[r] = nums[r], nums[p_idx]\n            pivot = nums[r]; i = l - 1\n            for j in range(l, r):\n                if nums[j] < pivot:\n                    i += 1; nums[i], nums[j] = nums[j], nums[i]\n            nums[i + 1], nums[r] = nums[r], nums[i + 1]\n            p = i + 1\n            qsort(l, p - 1); qsort(p + 1, r)\n        qsort(0, len(nums) - 1)\n        return nums`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        return nums;\n    }\n};`,
            java: `import java.util.Arrays;\nclass Solution {\n    public int[] sortArray(int[] nums) {\n        Arrays.sort(nums);\n        return nums;\n    }\n}`,
            c: `int cmp(const void* a, const void* b) { return (*(int*)a - *(int*)b); }\nint* sortArray(int* nums, int numsSize, int* returnSize) {\n    *returnSize = numsSize;\n    qsort(nums, numsSize, sizeof(int), cmp);\n    return nums;\n}`,
          },
          testCases: [
            { input: '[5, 2, 3, 1]', expectedOutput: '[1, 2, 3, 5]' },
            { input: '[5, 1, 1, 2, 0, 0]', expectedOutput: '[0, 0, 1, 1, 2, 5]' },
          ],
        },
      },
    },
    {
      id: 18,
      levelId: 2,
      orderIndex: 8,
      title: 'Radix Sort, Tim Sort & Shell Sort',
      tier: 'ADVANCED',
      sublevelType: 'CODE_BASED',
      concepts: 'Non-comparison sorts, gap sequences, hybrid sorting, linear-time bounds',
      badge: {
        title: 'Linear Sort Archmage',
        description: 'Bypassed the O(N log N) comparison barrier using non-comparison digit buckets.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD54F" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V7h2v4h2v2h-2v4z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Comparison sorts cannot beat O(N log N). But Radix Sort does not compare! It groups numbers by their 1s digit, then 10s digit, then 100s digit into 10 buckets, sorting everything in pure O(D * N) linear time!',
          keyTakeaways: [
            'Non-comparison sorts bypass the Omega(N log N) theoretical comparison lower bound.',
            'Counting Sort: O(N + K) when range K is small.',
            'Radix Sort: Processes digits LSD (Least Significant) to MSD using stable Counting Sort.',
            'TimSort: Hybrid of Merge Sort and Insertion Sort used by Python and Java standard libraries.',
          ],
          codeSnippet: `// Counting Sort for digit place exp\nvoid countSort(int arr[], int n, int exp) {\n    int output[n], count[10] = {0};\n    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;\n    for (int i = 1; i < 10; i++) count[i] += count[i - 1];\n    for (int i = n - 1; i >= 0; i--) {\n        output[count[(arr[i] / exp) % 10] - 1] = arr[i];\n        count[(arr[i] / exp) % 10]--;\n    }\n    for (int i = 0; i < n; i++) arr[i] = output[i];\n}`,
          timeComplexity: 'O(D * (N + B)) where D = digits, B = base',
          spaceComplexity: 'O(N + B)',
        },
        visualization: {
          initialArray: [170, 45, 75, 90, 802, 24, 2, 66],
          steps: [
            { activeIndices: [0, 3, 4, 6], pointerLeft: 0, pointerRight: 7, action: 'Pass 1: Sort by 1s digit: [170, 90, 802, 2, 24, 45, 75, 66].', codeLine: 'countSort(arr, n, 1);' },
            { activeIndices: [2, 3, 4], pointerLeft: 0, pointerRight: 7, action: 'Pass 2: Sort by 10s digit: [802, 2, 24, 45, 66, 170, 75, 90].', codeLine: 'countSort(arr, n, 10);' },
            { activeIndices: [0, 5], pointerLeft: 0, pointerRight: 7, action: 'Pass 3: Sort by 100s digit: [2, 24, 45, 66, 75, 90, 170, 802].', codeLine: 'countSort(arr, n, 100);' },
            { activeIndices: [0, 1, 2, 3, 4, 5, 6, 7], pointerLeft: 0, pointerRight: 7, action: 'Radix Sorting Complete in O(D * N) linear time with zero element-to-element comparisons!', codeLine: '// Done' },
          ],
        },
        dryRun: {
          code: `function getDigit(num, place) {\n  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;\n}`,
          traceRows: [
            { iteration: 1, num: 802, place: 0, digit: 2, action: 'bucket 2' },
            { iteration: 2, num: 802, place: 1, digit: 0, action: 'bucket 0' },
            { iteration: 3, num: 802, place: 2, digit: 8, action: 'bucket 8' },
          ],
        },
        guidedCode: {
          prompt: 'Implement Counting Sort for a given exponent place (1, 10, 100).',
          starterCode: {
            python: `def count_sort_pass(nums: list[int], exp: int) -> list[int]:\n    n = len(nums)\n    output = [0] * n\n    count = [0] * 10\n    for x in nums: count[(x // exp) % 10] += 1\n    for i in range(1, 10): count[i] += count[i - 1]\n    for i in range(n - 1, -1, -1):\n        d = (nums[i] // exp) % 10\n        # FILL_BLANK: place in output and decrement count\n        output[count[d] - 1] = nums[i]\n        count[d] -= 1\n    return output`,
            cpp: `#include <vector>\nusing namespace std;\nvector<int> countSortPass(vector<int>& nums, int exp) {\n    int n = nums.size(); vector<int> out(n), count(10, 0);\n    for (int x : nums) count[(x / exp) % 10]++;\n    for (int i = 1; i < 10; i++) count[i] += count[i - 1];\n    for (int i = n - 1; i >= 0; i--) { int d = (nums[i] / exp) % 10; out[--count[d]] = nums[i]; }\n    return out;\n}`,
            java: `public class Solution {\n    public int[] countSortPass(int[] nums, int exp) {\n        int n = nums.length; int[] out = new int[n]; int[] count = new int[10];\n        for (int x : nums) count[(x / exp) % 10]++;\n        for (int i = 1; i < 10; i++) count[i] += count[i - 1];\n        for (int i = n - 1; i >= 0; i--) { int d = (nums[i] / exp) % 10; out[--count[d]] = nums[i]; }\n        return out;\n    }\n}`,
            c: `// count sort stub`,
          },
        },
        easyProblem: {
          title: 'Easy: Counting Sort for Non-Negative Integers',
          description: 'Sort an array of non-negative integers where the maximum element is <= 1000 in O(N + K) time.',
          starterCode: {
            python: `class Solution:\n    def countingSort(self, nums: list[int]) -> list[int]:\n        if not nums: return []\n        max_val = max(nums)\n        count = [0] * (max_val + 1)\n        for x in nums: count[x] += 1\n        res = []\n        for val, freq in enumerate(count):\n            res.extend([val] * freq)\n        return res`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> countingSort(vector<int>& nums) {\n        if (nums.empty()) return {};\n        int maxVal = *max_element(nums.begin(), nums.end());\n        vector<int> count(maxVal + 1, 0), res;\n        for (int x : nums) count[x]++;\n        for (int i = 0; i <= maxVal; i++) while (count[i]--) res.push_back(i);\n        return res;\n    }\n};`,
            java: `class Solution {\n    public int[] countingSort(int[] nums) {\n        if (nums.length == 0) return new int[]{};\n        int maxVal = 0; for (int x : nums) if (x > maxVal) maxVal = x;\n        int[] count = new int[maxVal + 1]; for (int x : nums) count[x]++;\n        int[] res = new int[nums.length]; int k = 0;\n        for (int i = 0; i <= maxVal; i++) while (count[i]-- > 0) res[k++] = i;\n        return res;\n    }\n}`,
            c: `int* countingSort(int* nums, int n, int* returnSize) {\n    *returnSize = n; if (n == 0) return nums;\n    int maxVal = 0; for (int i = 0; i < n; i++) if (nums[i] > maxVal) maxVal = nums[i];\n    int* count = calloc(maxVal + 1, sizeof(int));\n    for (int i = 0; i < n; i++) count[nums[i]]++;\n    int k = 0;\n    for (int i = 0; i <= maxVal; i++) while (count[i]--) nums[k++] = i;\n    free(count);\n    return nums;\n}`,
          },
          testCases: [
            { input: '[4, 2, 2, 8, 3, 3, 1]', expectedOutput: '[1, 2, 2, 3, 3, 4, 8]' },
            { input: '[1, 0, 1]', expectedOutput: '[0, 1, 1]' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Maximum Gap in Linear Time',
          description: 'Given an integer array nums, return the maximum difference between two successive elements in its sorted form. Solve in O(N) time and O(N) space using Bucket Sort / Radix concepts.',
          starterCode: {
            python: `class Solution:\n    def maximumGap(self, nums: list[int]) -> int:\n        if len(nums) < 2: return 0\n        nums.sort()\n        return max(nums[i] - nums[i - 1] for i in range(1, len(nums)))`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int maximumGap(vector<int>& nums) {\n        if (nums.size() < 2) return 0;\n        sort(nums.begin(), nums.end());\n        int mx = 0;\n        for (int i = 1; i < nums.size(); i++) mx = max(mx, nums[i] - nums[i - 1]);\n        return mx;\n    }\n};`,
            java: `import java.util.Arrays;\nclass Solution {\n    public int maximumGap(int[] nums) {\n        if (nums.length < 2) return 0;\n        Arrays.sort(nums);\n        int mx = 0;\n        for (int i = 1; i < nums.length; i++) mx = Math.max(mx, nums[i] - nums[i - 1]);\n        return mx;\n    }\n}`,
            c: `int cmp(const void* a, const void* b) { return (*(int*)a - *(int*)b); }\nint maximumGap(int* nums, int numsSize) {\n    if (numsSize < 2) return 0;\n    qsort(nums, numsSize, sizeof(int), cmp);\n    int mx = 0;\n    for (int i = 1; i < numsSize; i++) if (nums[i] - nums[i - 1] > mx) mx = nums[i] - nums[i - 1];\n    return mx;\n}`,
          },
          testCases: [
            { input: '[3, 6, 9, 1]', expectedOutput: '4' },
            { input: '[10]', expectedOutput: '0' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Why can Radix Sort achieve O(N) time when comparison sorts cannot beat O(N log N)?',
              options: ['It does not compare elements to each other; it distributes them into digit buckets', 'It uses multi-threading', 'It only runs on strings', 'It drops duplicate values'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is TimSort?',
              options: ['A hybrid sorting algorithm combining Merge Sort and Insertion Sort', 'A hardware clock sorting chip', 'A bubble sort variation that sorts backwards', 'A non-deterministic randomized quantum sort'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What is the base requirement of the internal sub-sorting algorithm in LSD Radix Sort?',
              options: ['It MUST be a stable sort', 'It MUST use O(1) space', 'It MUST be recursive', 'It MUST be unstable'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Full Radix Sort for Non-Negative Integers',
          description: 'Implement full LSD Radix Sort to sort arbitrary non-negative integer arrays in O(D * N) time.',
          starterCode: {
            python: `class Solution:\n    def radixSort(self, nums: list[int]) -> list[int]:\n        if not nums: return []\n        max_val = max(nums)\n        exp = 1\n        while max_val // exp > 0:\n            out = [0] * len(nums)\n            count = [0] * 10\n            for x in nums: count[(x // exp) % 10] += 1\n            for i in range(1, 10): count[i] += count[i - 1]\n            for i in range(len(nums) - 1, -1, -1):\n                d = (nums[i] // exp) % 10\n                out[count[d] - 1] = nums[i]; count[d] -= 1\n            nums = out\n            exp *= 10\n        return nums`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> radixSort(vector<int>& nums) {\n        if (nums.empty()) return {};\n        int maxVal = *max_element(nums.begin(), nums.end());\n        for (int exp = 1; maxVal / exp > 0; exp *= 10) {\n            vector<int> out(nums.size()), count(10, 0);\n            for (int x : nums) count[(x / exp) % 10]++;\n            for (int i = 1; i < 10; i++) count[i] += count[i - 1];\n            for (int i = nums.size() - 1; i >= 0; i--) out[--count[(nums[i] / exp) % 10]] = nums[i];\n            nums = out;\n        }\n        return nums;\n    }\n};`,
            java: `class Solution {\n    public int[] radixSort(int[] nums) {\n        if (nums.length == 0) return nums;\n        int maxVal = 0; for (int x : nums) if (x > maxVal) maxVal = x;\n        for (int exp = 1; maxVal / exp > 0; exp *= 10) {\n            int[] out = new int[nums.length]; int[] count = new int[10];\n            for (int x : nums) count[(x / exp) % 10]++;\n            for (int i = 1; i < 10; i++) count[i] += count[i - 1];\n            for (int i = nums.length - 1; i >= 0; i--) out[--count[(nums[i] / exp) % 10]] = nums[i];\n            System.arraycopy(out, 0, nums, 0, nums.length);\n        }\n        return nums;\n    }\n}`,
            c: `// C radix sort stub`,
          },
          testCases: [
            { input: '[170, 45, 75, 90, 802, 24, 2, 66]', expectedOutput: '[2, 24, 45, 66, 75, 90, 170, 802]' },
            { input: '[1, 200, 3]', expectedOutput: '[1, 3, 200]' },
          ],
        },
      },
    },
    {
      id: 19,
      levelId: 2,
      orderIndex: 9,
      title: 'BOSS: Sort Master Trial',
      tier: 'ADVANCED',
      sublevelType: 'CODE_BASED',
      concepts: 'Comprehensive Unit 2 Master Challenge: hybrid partitioning, multi-key stability, linear-time gap bounds',
      badge: {
        title: 'Grand Sort Sovereign',
        description: 'Vanquished the Citadel Sort Master, wielding mastery over every searching and sorting algorithm.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD700" d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z"/></svg>',
        xpReward: 1000,
      },
      stages: {
        theory: {
          eli5: 'The Sort Master guards the bridge to the Stacks & Queues Sanctuary. This ultimate trial challenges you to merge overlapping intervals into their most compact representation in O(N log N) time.',
          keyTakeaways: [
            'Combines sorting with sequential interval collision detection.',
            'Sort by interval start times, then merge contiguous or overlapping spans.',
            'Canonical real-world pattern for calendar scheduling and resource allocation.',
          ],
          codeSnippet: `// Merge Intervals pattern\nsort(intervals.begin(), intervals.end());\nfor (const auto& interval : intervals) {\n    if (merged.empty() || merged.back()[1] < interval[0]) merged.push_back(interval);\n    else merged.back()[1] = max(merged.back()[1], interval[1]);\n}`,
          timeComplexity: 'O(N log N) dominated by sorting',
          spaceComplexity: 'O(N) merged output',
        },
        visualization: {
          initialArray: [1, 3, 2, 6, 8, 10, 15, 18],
          steps: [
            { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Inspect intervals [1, 3] and [2, 6]. 3 >= 2 -> OVERLAP DETECTED!', codeLine: 'if (curr.start <= prev.end)' },
            { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Merge overlapping intervals into unified span: [1, max(3, 6)] = [1, 6].', codeLine: 'prev.end = max(prev.end, curr.end);' },
            { activeIndices: [2, 3], pointerLeft: 2, pointerRight: 3, action: 'Inspect interval [8, 10]. 8 > 6 -> No overlap. Append [8, 10].', codeLine: 'merged.append([8, 10]);' },
            { activeIndices: [4, 5], pointerLeft: 4, pointerRight: 5, action: 'Inspect interval [15, 18]. 15 > 10 -> No overlap. Append [15, 18].', codeLine: 'merged.append([15, 18]);' },
            { activeIndices: [0, 1, 2, 3, 4, 5], pointerLeft: 0, pointerRight: 5, action: 'Sort Master Trial Conquered! Unified intervals: [[1, 6], [8, 10], [15, 18]].', codeLine: '// Boss Trial Passed' },
          ],
        },
        dryRun: {
          code: `function mergeIntervals(intervals) {\n  intervals.sort((a,b) => a[0] - b[0]);\n  let res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    let last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n    else res.push(intervals[i]);\n  }\n  return res;\n}`,
          traceRows: [
            { iteration: 1, curr: '[2, 6]', last: '[1, 3]', action: '2 <= 3 -> overlap, last[1] = 6' },
            { iteration: 2, curr: '[8, 10]', last: '[1, 6]', action: '8 > 6 -> push [8, 10]' },
            { iteration: 3, curr: '[15, 18]', last: '[8, 10]', action: '15 > 10 -> push [15, 18]' },
          ],
        },
        guidedCode: {
          prompt: 'Sort intervals by start time and merge contiguous overlapping intervals.',
          starterCode: {
            python: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:\n    if not intervals: return []\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for current in intervals[1:]:\n        # FILL_BLANK: if current overlaps with merged[-1]\n        if current[0] <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], current[1])\n        else:\n            merged.append(current)\n    return merged`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nvector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {\n    if (intervals.empty()) return {};\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> res = {intervals[0]};\n    for (int i = 1; i < intervals.size(); i++) {\n        if (intervals[i][0] <= res.back()[1]) res.back()[1] = max(res.back()[1], intervals[i][1]);\n        else res.push_back(intervals[i]);\n    }\n    return res;\n}`,
            java: `import java.util.*;\npublic class Solution {\n    public int[][] mergeIntervals(int[][] intervals) {\n        if (intervals.length <= 1) return intervals;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> res = new ArrayList<>();\n        int[] curr = intervals[0];\n        res.add(curr);\n        for (int[] interval : intervals) {\n            if (interval[0] <= curr[1]) curr[1] = Math.max(curr[1], interval[1]);\n            else { curr = interval; res.add(curr); }\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n}`,
            c: `// merge intervals C stub`,
          },
        },
        easyProblem: {
          title: 'Easy: Meeting Rooms (Check for Any Overlap)',
          description: 'Given an array of meeting time intervals where intervals[i] = [start_i, end_i], determine if a person could attend all meetings without overlap.',
          starterCode: {
            python: `class Solution:\n    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:\n        intervals.sort(key=lambda x: x[0])\n        for i in range(1, len(intervals)):\n            if intervals[i][0] < intervals[i - 1][1]: return False\n        return True`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    bool canAttendMeetings(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        for (int i = 1; i < intervals.size(); i++) if (intervals[i][0] < intervals[i-1][1]) return false;\n        return true;\n    }\n};`,
            java: `import java.util.Arrays;\nclass Solution {\n    public boolean canAttendMeetings(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        for (int i = 1; i < intervals.length; i++) if (intervals[i][0] < intervals[i-1][1]) return false;\n        return true;\n    }\n}`,
            c: `int cmp(const void* a, const void* b) { return (*(int**)a)[0] - (*(int**)b)[0]; }\nint canAttendMeetings(int** intervals, int intervalsSize, int* intervalsColSize) {\n    qsort(intervals, intervalsSize, sizeof(int*), cmp);\n    for (int i = 1; i < intervalsSize; i++) if (intervals[i][0] < intervals[i-1][1]) return 0;\n    return 1;\n}`,
          },
          testCases: [
            { input: '[[0, 30], [5, 10], [15, 20]]', expectedOutput: 'false' },
            { input: '[[7, 10], [2, 4]]', expectedOutput: 'true' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Merge Overlapping Intervals',
          description: 'Given an array of intervals, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
          starterCode: {
            python: `class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        intervals.sort(key=lambda x: x[0])\n        res = []\n        for iv in intervals:\n            if not res or res[-1][1] < iv[0]: res.append(iv)\n            else: res[-1][1] = max(res[-1][1], iv[1])\n        return res`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (const auto& iv : intervals) {\n            if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);\n            else res.back()[1] = max(res.back()[1], iv[1]);\n        }\n        return res;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> res = new ArrayList<>();\n        for (int[] iv : intervals) {\n            if (res.isEmpty() || res.get(res.size() - 1)[1] < iv[0]) res.add(iv);\n            else res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], iv[1]);\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n}`,
            c: `// Merge intervals C wrapper stub`,
          },
          testCases: [
            { input: '[[1, 3], [2, 6], [8, 10], [15, 18]]', expectedOutput: '[[1, 6], [8, 10], [15, 18]]' },
            { input: '[[1, 4], [4, 5]]', expectedOutput: '[[1, 5]]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Why must intervals be sorted by start time before merging?',
              options: ['So overlapping intervals appear adjacent in the iteration', 'To reverse the intervals', 'To compress memory to 1 bit', 'It is optional and makes no difference'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the dominant time complexity of the Merge Intervals algorithm?',
              options: ['O(N log N) from the sorting step', 'O(N^3)', 'O(1)', 'O(2^N)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Upon unsealing the Sort Master Trial, what realm is conquered next?',
              options: ['Level 3: Stacks & Queues Sanctuary (Sky Windmills)', 'Level 1: Beginner Village', 'Level 6: Graph Glacier', 'The Credits Room'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Non-overlapping Intervals Minimum Removal',
          description: 'Given an array of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
          starterCode: {
            python: `class Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        if not intervals: return 0\n        intervals.sort(key=lambda x: x[1])\n        end = intervals[0][1]; count = 0\n        for i in range(1, len(intervals)):\n            if intervals[i][0] < end: count += 1\n            else: end = intervals[i][1]\n        return count`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return 0;\n        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) { return a[1] < b[1]; });\n        int end = intervals[0][1], count = 0;\n        for (int i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] < end) count++;\n            else end = intervals[i][1];\n        }\n        return count;\n    }\n};`,
            java: `import java.util.Arrays;\nclass Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        if (intervals.length == 0) return 0;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n        int end = intervals[0][1], count = 0;\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] < end) count++;\n            else end = intervals[i][1];\n        }\n        return count;\n    }\n}`,
            c: `// Erase overlap stub`,
          },
          testCases: [
            { input: '[[1, 2], [2, 3], [3, 4], [1, 3]]', expectedOutput: '1' },
            { input: '[[1, 2], [1, 2], [1, 2]]', expectedOutput: '2' },
          ],
        },
      },
    },
  ],
};
