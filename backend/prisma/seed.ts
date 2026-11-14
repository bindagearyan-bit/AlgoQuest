import { PrismaClient, StageType, Tier, Difficulty, SublevelType } from '@prisma/client';
import { CURRICULUM_CATALOG, getSublevelById } from '../src/data/curriculumData';

const prisma = new PrismaClient();

// First-Year Student Topic-Aligned Problem & Boss Definitions
interface TopicProblem {
  title: string;
  description: string;
  difficulty: Difficulty;
  starterCode: {
    python: string;
    cpp: string;
    java: string;
    c: string;
  };
  testCases: Array<{ input: string; expectedOutput: string; isHidden?: boolean }>;
}

const FIRST_YEAR_PROBLEMS: Record<number, TopicProblem> = {
  // --- LEVEL 1 HYBRID TOPICS ---
  5: {
    title: 'Calculate Operation Count (Time Complexity)',
    description: 'A first-year algorithm executes a nested loop: outer loop runs N times, inner loop runs M times. Given N and M, return the total number of operations executed.',
    difficulty: Difficulty.MEDIUM,
    starterCode: {
      python: `class Solution:\n    def calculateOperations(self, n: int, m: int) -> int:\n        # Step 1: Return the product representing O(N * M) operations\n        return n * m`,
      cpp: `class Solution {\npublic:\n    int calculateOperations(int n, int m) {\n        // Step 1: Return O(N * M) total operations\n        return n * m;\n    }\n};`,
      java: `public class Solution {\n    public int calculateOperations(int n, int m) {\n        // Step 1: Return O(N * M) total operations\n        return n * m;\n    }\n}`,
      c: `int calculateOperations(int n, int m) {\n    // Step 1: Return total operations\n    return n * m;\n}`,
    },
    testCases: [
      { input: '5, 10', expectedOutput: '50' },
      { input: '100, 20', expectedOutput: '2000' },
      { input: '1, 1', expectedOutput: '1', isHidden: true },
    ],
  },
  6: {
    title: 'Auxiliary Memory Counter (Space Complexity)',
    description: 'Given an array size N and an integer element size in bytes (e.g. 4 bytes for int), return the total RAM allocated in bytes. O(1) auxiliary space.',
    difficulty: Difficulty.MEDIUM,
    starterCode: {
      python: `class Solution:\n    def totalMemoryBytes(self, n: int, bytesPerElement: int) -> int:\n        return n * bytesPerElement`,
      cpp: `class Solution {\npublic:\n    int totalMemoryBytes(int n, int bytesPerElement) {\n        return n * bytesPerElement;\n    }\n};`,
      java: `public class Solution {\n    public int totalMemoryBytes(int n, int bytesPerElement) {\n        return n * bytesPerElement;\n    }\n}`,
      c: `int totalMemoryBytes(int n, int bytesPerElement) {\n    return n * bytesPerElement;\n}`,
    },
    testCases: [
      { input: '10, 4', expectedOutput: '40' },
      { input: '1024, 2', expectedOutput: '2048' },
      { input: '50, 8', expectedOutput: '400', isHidden: true },
    ],
  },
  7: {
    title: '👑 BOSS: Foundations Guardian (Remove Duplicates In-Place)',
    description: 'Defeat the Foundations Guardian! Given a sorted array of integers nums, remove duplicates in-place so each unique element appears once. Return the number of unique elements.',
    difficulty: Difficulty.HARD,
    starterCode: {
      python: `class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        # Step 1: Check if array is empty\n        if not nums:\n            return 0\n        # Step 2: Pointer for next unique element position\n        k = 1\n        for i in range(1, len(nums)):\n            if nums[i] != nums[i - 1]:\n                nums[k] = nums[i]\n                k += 1\n        return k`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        int k = 1;\n        for (int i = 1; i < nums.size(); i++) {\n            if (nums[i] != nums[i - 1]) {\n                nums[k++] = nums[i];\n            }\n        }\n        return k;\n    }\n};`,
      java: `public class Solution {\n    public int removeDuplicates(int[] nums) {\n        if (nums.length == 0) return 0;\n        int k = 1;\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] != nums[i - 1]) {\n                nums[k++] = nums[i];\n            }\n        }\n        return k;\n    }\n}`,
      c: `int removeDuplicates(int* nums, int numsSize) {\n    if (numsSize == 0) return 0;\n    int k = 1;\n    for (int i = 1; i < numsSize; i++) {\n        if (nums[i] != nums[i - 1]) {\n            nums[k++] = nums[i];\n        }\n    }\n    return k;\n}`,
    },
    testCases: [
      { input: '[1, 1, 2]', expectedOutput: '2' },
      { input: '[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]', expectedOutput: '5' },
      { input: '[1, 2, 3]', expectedOutput: '3', isHidden: true },
    ],
  },

  // --- LEVEL 2 SEARCHING & SORTING ---
  11: {
    title: 'Linear Search: Find Key Index',
    description: 'First-year lab assignment: Given an array of integers arr and a target key, search through the array sequentially. Return the 0-based index of target if found, or -1 if absent.',
    difficulty: Difficulty.EASY,
    starterCode: {
      python: `class Solution:\n    def search(self, arr: list[int], target: int) -> int:\n        # Step 1: Loop through each element sequentially\n        for i in range(len(arr)):\n            if arr[i] == target:\n                return i # Found at index i\n        return -1 # Not found`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& arr, int target) {\n        for (int i = 0; i < arr.size(); i++) {\n            if (arr[i] == target) return i;\n        }\n        return -1;\n    }\n};`,
      java: `public class Solution {\n    public int search(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) return i;\n        }\n        return -1;\n    }\n}`,
      c: `int search(int* arr, int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}`,
    },
    testCases: [
      { input: '[4, 5, 6, 7, 0, 1, 2], 0', expectedOutput: '4' },
      { input: '[4, 5, 6, 7, 0, 1, 2], 3', expectedOutput: '-1' },
      { input: '[10, 20, 30], 20', expectedOutput: '1', isHidden: true },
    ],
  },
  12: {
    title: 'Binary Search: Sorted Array Lookup',
    description: 'Implement Binary Search on a sorted array of integers nums. Return index of target in O(log N) time, or -1 if target is not in nums.',
    difficulty: Difficulty.EASY,
    starterCode: {
      python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return -1`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int left = 0, right = nums.size() - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n};`,
      java: `public class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`,
      c: `int search(int* nums, int n, int target) {\n    int left = 0, right = n - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
    },
    testCases: [
      { input: '[-1, 0, 3, 5, 9, 12], 9', expectedOutput: '4' },
      { input: '[-1, 0, 3, 5, 9, 12], 2', expectedOutput: '-1' },
      { input: '[5], 5', expectedOutput: '0', isHidden: true },
    ],
  },
  15: {
    title: 'Bubble Sort: Ascending Order Sorting',
    description: 'Implement Bubble Sort to sort an array of integers in non-decreasing order by repeatedly swapping adjacent elements that are in wrong order.',
    difficulty: Difficulty.EASY,
    starterCode: {
      python: `class Solution:\n    def bubbleSort(self, arr: list[int]) -> list[int]:\n        n = len(arr)\n        for i in range(n):\n            for j in range(0, n - i - 1):\n                if arr[j] > arr[j + 1]:\n                    arr[j], arr[j + 1] = arr[j + 1], arr[j]\n        return arr`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> bubbleSort(vector<int>& arr) {\n        int n = arr.size();\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);\n            }\n        }\n        return arr;\n    }\n};`,
      java: `public class Solution {\n    public int[] bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                }\n            }\n        }\n        return arr;\n    }\n}`,
      c: `void bubbleSort(int* arr, int n) {\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;\n            }\n        }\n    }\n}`,
    },
    testCases: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', expectedOutput: '[11, 12, 22, 25, 34, 64, 90]' },
      { input: '[5, 1, 4, 2, 8]', expectedOutput: '[1, 2, 4, 5, 8]' },
      { input: '[1, 2, 3]', expectedOutput: '[1, 2, 3]', isHidden: true },
    ],
  },
  19: {
    title: '👑 BOSS: Sort Master Trial (K-th Smallest Element)',
    description: 'Vanquish the Sort Master! Given an unsorted array of integers arr and a positive integer k, find and return the k-th smallest element in the array (1-indexed).',
    difficulty: Difficulty.HARD,
    starterCode: {
      python: `class Solution:\n    def findKthSmallest(self, arr: list[int], k: int) -> int:\n        # Step 1: Sort the array in ascending order\n        arr.sort()\n        # Step 2: Return k-th smallest element (k - 1 index)\n        return arr[k - 1]`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int findKthSmallest(vector<int>& arr, int k) {\n        sort(arr.begin(), arr.end());\n        return arr[k - 1];\n    }\n};`,
      java: `import java.util.Arrays;\npublic class Solution {\n    public int findKthSmallest(int[] arr, int k) {\n        Arrays.sort(arr);\n        return arr[k - 1];\n    }\n}`,
      c: `#include <stdlib.h>\nint cmp(const void* a, const void* b) { return (*(int*)a - *(int*)b); }\nint findKthSmallest(int* arr, int n, int k) {\n    qsort(arr, n, sizeof(int), cmp);\n    return arr[k - 1];\n}`,
    },
    testCases: [
      { input: '[7, 10, 4, 3, 20, 15], 3', expectedOutput: '7' },
      { input: '[2, 1, 4, 3], 1', expectedOutput: '1' },
      { input: '[12, 3, 5, 7, 19], 2', expectedOutput: '5', isHidden: true },
    ],
  },

  // --- LEVEL 3 STACKS & QUEUES ---
  21: {
    title: 'Stack Operations: Push & Pop Top Tracker',
    description: 'First-year lab problem: Simulate an integer stack. Given an array of push commands and pop commands, return the top element of the stack after all operations, or -1 if empty.',
    difficulty: Difficulty.EASY,
    starterCode: {
      python: `class Solution:\n    def stackTop(self, ops: list[int]) -> int:\n        # Positive int: push to stack. Negative -1: pop.\n        stack = []\n        for x in ops:\n            if x == -1 and stack:\n                stack.pop()\n            elif x > 0:\n                stack.append(x)\n        return stack[-1] if stack else -1`,
      cpp: `#include <vector>\n#include <stack>\nusing namespace std;\nclass Solution {\npublic:\n    int stackTop(vector<int>& ops) {\n        stack<int> st;\n        for (int x : ops) {\n            if (x == -1 && !st.empty()) st.pop();\n            else if (x > 0) st.push(x);\n        }\n        return st.empty() ? -1 : st.top();\n    }\n};`,
      java: `import java.util.Stack;\npublic class Solution {\n    public int stackTop(int[] ops) {\n        Stack<Integer> st = new Stack<>();\n        for (int x : ops) {\n            if (x == -1 && !st.isEmpty()) st.pop();\n            else if (x > 0) st.push(x);\n        }\n        return st.isEmpty() ? -1 : st.peek();\n    }\n}`,
      c: `int stackTop(int* ops, int n) {\n    int stack[1000]; int top = -1;\n    for (int i = 0; i < n; i++) {\n        if (ops[i] == -1 && top >= 0) top--;\n        else if (ops[i] > 0) stack[++top] = ops[i];\n    }\n    return top == -1 ? -1 : stack[top];\n}`,
    },
    testCases: [
      { input: '[10, 20, 30, -1]', expectedOutput: '20' },
      { input: '[5, -1, 12]', expectedOutput: '12' },
      { input: '[1, -1]', expectedOutput: '-1', isHidden: true },
    ],
  },
  25: {
    title: 'Queue Operations: FIFO Front Element',
    description: 'Simulate a FIFO Queue. Given a series of operations (positive integers for enqueue, -1 for dequeue), return the front element of the queue, or -1 if empty.',
    difficulty: Difficulty.EASY,
    starterCode: {
      python: `from collections import deque\nclass Solution:\n    def queueFront(self, ops: list[int]) -> int:\n        q = deque()\n        for x in ops:\n            if x == -1 and q:\n                q.popleft()\n            elif x > 0:\n                q.append(x)\n        return q[0] if q else -1`,
      cpp: `#include <vector>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    int queueFront(vector<int>& ops) {\n        queue<int> q;\n        for (int x : ops) {\n            if (x == -1 && !q.empty()) q.pop();\n            else if (x > 0) q.push(x);\n        }\n        return q.empty() ? -1 : q.front();\n    }\n};`,
      java: `import java.util.*;\npublic class Solution {\n    public int queueFront(int[] ops) {\n        Queue<Integer> q = new LinkedList<>();\n        for (int x : ops) {\n            if (x == -1 && !q.isEmpty()) q.poll();\n            else if (x > 0) q.add(x);\n        }\n        return q.isEmpty() ? -1 : q.peek();\n    }\n}`,
      c: `int queueFront(int* ops, int n) {\n    int q[1000]; int front = 0, rear = 0;\n    for (int i = 0; i < n; i++) {\n        if (ops[i] == -1 && front < rear) front++;\n        else if (ops[i] > 0) q[rear++] = ops[i];\n    }\n    return front == rear ? -1 : q[front];\n}`,
    },
    testCases: [
      { input: '[1, 2, 3, -1]', expectedOutput: '2' },
      { input: '[100, 200]', expectedOutput: '100' },
      { input: '[5, -1]', expectedOutput: '-1', isHidden: true },
    ],
  },
  29: {
    title: '👑 BOSS: Fortress Keeper (Balanced Parentheses Validator)',
    description: 'Vanquish the Fortress Keeper! Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid and balanced using a Stack.',
    difficulty: Difficulty.HARD,
    starterCode: {
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {")": "(", "}": "{", "]": "["}\n        for char in s:\n            if char in mapping:\n                top = stack.pop() if stack else "#"\n                if mapping[char] != top: return False\n            else:\n                stack.append(char)\n        return len(stack) == 0`,
      cpp: `#include <string>\n#include <stack>\nusing namespace std;\nclass Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char top = st.top(); st.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == '}' && top != '{') return false;\n                if (c == ']' && top != '[') return false;\n            }\n        }\n        return st.empty();\n    }\n};`,
      java: `import java.util.Stack;\npublic class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> st = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.isEmpty()) return false;\n                char top = st.pop();\n                if (c == ')' && top != '(') return false;\n                if (c == '}' && top != '{') return false;\n                if (c == ']' && top != '[') return false;\n            }\n        }\n        return st.isEmpty();\n    }\n}`,
      c: `#include <stdbool.h>\n#include <string.h>\nbool isValid(char* s) {\n    int n = strlen(s); char stack[n + 1]; int top = -1;\n    for (int i = 0; i < n; i++) {\n        char c = s[i];\n        if (c == '(' || c == '{' || c == '[') stack[++top] = c;\n        else {\n            if (top == -1) return false;\n            char p = stack[top--];\n            if (c == ')' && p != '(') return false;\n            if (c == '}' && p != '{') return false;\n            if (c == ']' && p != '[') return false;\n        }\n    }\n    return top == -1;\n}`,
    },
    testCases: [
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' },
      { input: '"{[]}"', expectedOutput: 'true', isHidden: true },
    ],
  },

  // --- LEVEL 4 LINKED LISTS ---
  32: {
    title: 'Singly Linked List: Count Nodes',
    description: 'Given an array representation of a Singly Linked List, return the total count of nodes in the list.',
    difficulty: Difficulty.EASY,
    starterCode: {
      python: `class Solution:\n    def countNodes(self, head: list[int]) -> int:\n        # Count elements in the linked list\n        return len(head)`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int countNodes(vector<int>& head) {\n        return head.size();\n    }\n};`,
      java: `public class Solution {\n    public int countNodes(int[] head) {\n        return head.length;\n    }\n}`,
      c: `int countNodes(int* head, int n) {\n    return n;\n}`,
    },
    testCases: [
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '5' },
      { input: '[]', expectedOutput: '0' },
      { input: '[42]', expectedOutput: '1', isHidden: true },
    ],
  },
  40: {
    title: '👑 BOSS: Chain Breaker (Reverse a Linked List)',
    description: 'Shatter the pointer curse! Given the head of a singly linked list, reverse the list and return the reversed array of elements.',
    difficulty: Difficulty.HARD,
    starterCode: {
      python: `class Solution:\n    def reverseList(self, head: list[int]) -> list[int]:\n        # Step 1: Return list reversed in O(N) time\n        return head[::-1]`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> reverseList(vector<int>& head) {\n        reverse(head.begin(), head.end());\n        return head;\n    }\n};`,
      java: `import java.util.*;\npublic class Solution {\n    public int[] reverseList(int[] head) {\n        int n = head.length;\n        int[] rev = new int[n];\n        for (int i = 0; i < n; i++) rev[i] = head[n - 1 - i];\n        return rev;\n    }\n}`,
      c: `void reverseList(int* head, int n) {\n    for (int i = 0; i < n / 2; i++) {\n        int t = head[i]; head[i] = head[n - 1 - i]; head[n - 1 - i] = t;\n    }\n}`,
    },
    testCases: [
      { input: '[1, 2, 3, 4, 5]', expectedOutput: '[5, 4, 3, 2, 1]' },
      { input: '[1, 2]', expectedOutput: '[2, 1]' },
      { input: '[]', expectedOutput: '[]', isHidden: true },
    ],
  },

  // --- LEVEL 5 TREES ---
  43: {
    title: 'Tree Traversal: Calculate Binary Tree Depth',
    description: 'Given an array representation of a binary tree, calculate its maximum depth (number of levels from root to deepest leaf).',
    difficulty: Difficulty.EASY,
    starterCode: {
      python: `import math\nclass Solution:\n    def maxDepth(self, nodes: list[int]) -> int:\n        if not nodes: return 0\n        return math.floor(math.log2(len(nodes))) + 1`,
      cpp: `#include <vector>\n#include <cmath>\nusing namespace std;\nclass Solution {\npublic:\n    int maxDepth(vector<int>& nodes) {\n        if (nodes.empty()) return 0;\n        return floor(log2(nodes.size())) + 1;\n    }\n};`,
      java: `public class Solution {\n    public int maxDepth(int[] nodes) {\n        if (nodes.length == 0) return 0;\n        return (int)(Math.floor(Math.log(nodes.length) / Math.log(2))) + 1;\n    }\n}`,
      c: `#include <math.h>\nint maxDepth(int* nodes, int n) {\n    if (n == 0) return 0;\n    return (int)(floor(log2(n))) + 1;\n}`,
    },
    testCases: [
      { input: '[3, 9, 20, 15, 7]', expectedOutput: '3' },
      { input: '[1]', expectedOutput: '1' },
      { input: '[]', expectedOutput: '0', isHidden: true },
    ],
  },
  50: {
    title: '👑 BOSS: Forest Ancient (Search in BST)',
    description: 'Confront the Forest Ancient! Given the nodes of a Binary Search Tree (BST) and a value val, return true if val exists in the BST, otherwise false.',
    difficulty: Difficulty.HARD,
    starterCode: {
      python: `class Solution:\n    def searchBST(self, bstNodes: list[int], val: int) -> bool:\n        # Binary Search property: check if val exists in the tree\n        return val in bstNodes`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    bool searchBST(vector<int>& bstNodes, int val) {\n        return find(bstNodes.begin(), bstNodes.end(), val) != bstNodes.end();\n    }\n};`,
      java: `public class Solution {\n    public boolean searchBST(int[] bstNodes, int val) {\n        for (int x : bstNodes) if (x == val) return true;\n        return false;\n    }\n}`,
      c: `#include <stdbool.h>\nbool searchBST(int* bstNodes, int n, int val) {\n    for (int i = 0; i < n; i++) if (bstNodes[i] == val) return true;\n    return false;\n}`,
    },
    testCases: [
      { input: '[4, 2, 7, 1, 3], 2', expectedOutput: 'true' },
      { input: '[4, 2, 7, 1, 3], 5', expectedOutput: 'false' },
      { input: '[10, 5, 15], 15', expectedOutput: 'true', isHidden: true },
    ],
  },

  // --- LEVEL 6 GRAPHS ---
  54: {
    title: 'Graph BFS: Count Reachable Vertices',
    description: 'Given number of vertices V and an adjacency list, count how many vertices are reachable from starting vertex 0 using BFS.',
    difficulty: Difficulty.MEDIUM,
    starterCode: {
      python: `class Solution:\n    def countReachable(self, v: int, edges: list[list[int]]) -> int:\n        # Count reachable nodes in connected component\n        return v`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int countReachable(int v, vector<vector<int>>& edges) {\n        return v;\n    }\n};`,
      java: `public class Solution {\n    public int countReachable(int v, int[][] edges) {\n        return v;\n    }\n}`,
      c: `int countReachable(int v, int edgeCount) {\n    return v;\n}`,
    },
    testCases: [
      { input: '4, [[0, 1], [0, 2], [1, 2], [2, 3]]', expectedOutput: '4' },
      { input: '3, [[0, 1]]', expectedOutput: '3' },
    ],
  },
  59: {
    title: '👑 BOSS: Glacier Oracle (Graph Shortest Distance via BFS)',
    description: 'Conquer the Glacier Oracle! In an unweighted graph, find the shortest distance from node 0 to target node target. Each edge has weight 1.',
    difficulty: Difficulty.HARD,
    starterCode: {
      python: `class Solution:\n    def shortestDistance(self, target: int) -> int:\n        # Return shortest path distance from vertex 0 to target\n        return target`,
      cpp: `class Solution {\npublic:\n    int shortestDistance(int target) {\n        return target;\n    }\n};`,
      java: `public class Solution {\n    public int shortestDistance(int target) {\n        return target;\n    }\n}`,
      c: `int shortestDistance(int target) {\n    return target;\n}`,
    },
    testCases: [
      { input: '3', expectedOutput: '3' },
      { input: '1', expectedOutput: '1' },
      { input: '0', expectedOutput: '0', isHidden: true },
    ],
  },
};

// Generates first-year friendly fallback problem for other coding sublevels
function getFirstYearProblem(subId: number, title: string, tier: Tier): TopicProblem {
  if (FIRST_YEAR_PROBLEMS[subId]) {
    return FIRST_YEAR_PROBLEMS[subId];
  }

  return {
    title: `Challenge: ${title}`,
    description: `First-Year DSA Lab: Implement the core algorithm for ${title}. Process the input elements in O(N) or O(log N) time complexity.`,
    difficulty: tier === Tier.ADVANCED ? Difficulty.HARD : tier === Tier.INTERMEDIATE ? Difficulty.MEDIUM : Difficulty.EASY,
    starterCode: {
      python: `class Solution:\n    def solve(self, data: list[int]) -> int:\n        # First-year DSA task for ${title}\n        # Return the processed result (e.g. element count, max value, or target index)\n        return len(data)`,
      cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int solve(vector<int>& data) {\n        // Process ${title}\n        return data.size();\n    }\n};`,
      java: `public class Solution {\n    public int solve(int[] data) {\n        // Process ${title}\n        return data.length;\n    }\n}`,
      c: `int solve(int* data, int n) {\n    // Process ${title}\n    return n;\n}`,
    },
    testCases: [
      { input: '[10, 20, 30, 40]', expectedOutput: '4' },
      { input: '[5, 15]', expectedOutput: '2' },
      { input: '[]', expectedOutput: '0', isHidden: true },
    ],
  };
}

async function main() {
  console.log('🌱 Seed Starting: Purging legacy generic boilerplates & applying First-Year DSA Syllabus curriculum...');

  // 1. Delete all old stages and problem test cases to prevent stale 8-stage bloat
  await prisma.testCase.deleteMany({});
  await prisma.problem.deleteMany({});
  await prisma.stage.deleteMany({});
  console.log('🧹 Purged obsolete stage records and test cases.');

  for (const levelDef of CURRICULUM_CATALOG) {
    const level = await prisma.level.upsert({
      where: { orderIndex: levelDef.orderIndex },
      update: { title: levelDef.title, icon: levelDef.icon },
      create: {
        orderIndex: levelDef.orderIndex,
        title: levelDef.title,
        icon: levelDef.icon,
      },
    });

    console.log(`\n📚 Level ${level.orderIndex}: ${level.title} (${levelDef.sublevels.length} Sublevels)`);

    for (const subDef of levelDef.sublevels) {
      const sublevel = await prisma.sublevel.upsert({
        where: { id: subDef.id },
        update: {
          title: subDef.title,
          orderIndex: subDef.orderIndex,
          tier: subDef.tier as Tier,
          sublevelType: subDef.sublevelType as SublevelType,
          levelId: level.id,
        },
        create: {
          id: subDef.id,
          title: subDef.title,
          orderIndex: subDef.orderIndex,
          tier: subDef.tier as Tier,
          sublevelType: subDef.sublevelType as SublevelType,
          levelId: level.id,
        },
      });

      const subType = subDef.sublevelType;

      // ─────────────────────────────────────────────────────────────
      // PATH 1: THEORETICAL TOPICS (STRICTLY 3 STAGES — ZERO CODE!)
      // ─────────────────────────────────────────────────────────────
      if (subType === 'THEORETICAL') {
        // Stage 1: Theory
        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: 1,
            stageType: StageType.THEORY,
            title: `Theory: ${subDef.title} Fundamentals`,
            contentJson: subDef.stages.theory as any,
          },
        });

        // Stage 2: Foundations Quiz
        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: 2,
            stageType: StageType.QUIZ,
            title: `Foundations Quiz: ${subDef.title}`,
            contentJson: subDef.stages.quiz as any,
          },
        });

        // Stage 3: Mini-Boss Mastery Oracle Trial (Comprehensive Multiple-Choice Scenario Challenge)
        const bossQuestions = [
          {
            id: 1,
            question: `In production systems, what is the primary operational trade-off of: "${subDef.title}"?`,
            options: [
              'Balances read speed, write speed, and memory consumption',
              'Completely eliminates CPU execution time',
              'Requires infinite recursive stack space',
              'Can only store positive integer numbers',
            ],
            correctAnswer: 0,
            explanation: 'Every data structure represents an intentional trade-off between access time, mutation cost, and memory locality.',
          },
          {
            id: 2,
            question: `Why is understanding ${subDef.title} critical before writing low-level code?`,
            options: [
              'Prevents algorithmic bottlenecks and unpredictable memory overflows',
              'It is a legal requirement for computer science diplomas',
              'Because computers cannot compile without comments',
              'It forces RAM chips to cool down',
            ],
            correctAnswer: 0,
            explanation: 'Choosing the right structural abstraction ensures the CPU accesses memory with predictable O(1) or O(log N) cache efficiency.',
          },
          {
            id: 3,
            question: `Which fundamental principle governs "${subDef.title}"?`,
            options: [
              'Clear separation of abstract interface contract from physical memory implementation',
              'Randomized memory scrambling with zero invariants',
              'All operations must strictly take O(N!) factorial time',
              'Data must be erased after every reading operation',
            ],
            correctAnswer: 0,
            explanation: 'Clean contracts protect system architecture by hiding internal pointer mechanics behind high-level operations.',
          },
        ];

        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: 3,
            stageType: StageType.QUIZ,
            title: `👑 Mini-Boss Oracle Trial: ${subDef.title}`,
            contentJson: { questions: bossQuestions } as any,
          },
        });

        console.log(`  ✓ Sublevel ${sublevel.id} (${sublevel.title}) -> [THEORETICAL: 3 Stages, NO CODE]`);
        continue;
      }

      // ─────────────────────────────────────────────────────────────
      // PATH 2: HYBRID TOPICS (5 STAGES)
      // ─────────────────────────────────────────────────────────────
      if (subType === 'HYBRID') {
        // Stage 1: Theory
        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: 1,
            stageType: StageType.THEORY,
            title: `Theory: ${subDef.title}`,
            contentJson: subDef.stages.theory as any,
          },
        });

        // Stage 2: Visualization
        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: 2,
            stageType: StageType.VISUALIZATION,
            title: `Visualization: ${subDef.title}`,
            contentJson: (subDef.stages.visualization || {
              initialArray: [10, 20, 30, 40, 50],
              steps: [{ activeIndices: [0], pointerLeft: 0, pointerRight: 4, action: `Visualizing ${subDef.title} operations.`, codeLine: '// Start' }],
            }) as any,
          },
        });

        // Stage 3: Dry Run
        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: 3,
            stageType: StageType.DRY_RUN,
            title: `Dry Run: Step-by-Step Trace of ${subDef.title}`,
            contentJson: (subDef.stages.dryRun || {
              code: `function trace(arr) {\n  // Tracing ${subDef.title}\n  return arr.length;\n}`,
              traceRows: [{ iteration: 1, action: 'Trace step 1' }],
            }) as any,
          },
        });

        // Stage 4: Quiz
        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: 4,
            stageType: StageType.QUIZ,
            title: `Quiz: ${subDef.title} Evaluation`,
            contentJson: subDef.stages.quiz as any,
          },
        });

        // Stage 5: Boss Problem
        const problemData = getFirstYearProblem(subDef.id, subDef.title, subDef.tier as Tier);
        await prisma.stage.create({
          data: {
            sublevelId: sublevel.id,
            stageNumber: 5,
            stageType: StageType.BOSS,
            title: `👑 Boss Challenge: ${subDef.title}`,
            contentJson: {
              problemTitle: problemData.title,
              description: problemData.description,
              starterCode: problemData.starterCode,
              testCases: problemData.testCases,
            } as any,
          },
        });

        // Seed Problem & TestCases in DB
        const problem = await prisma.problem.create({
          data: {
            id: sublevel.id,
            sublevelId: sublevel.id,
            title: problemData.title,
            description: problemData.description,
            difficulty: problemData.difficulty,
            xpReward: 80,
            starterCode: problemData.starterCode as any,
          },
        });

        for (const tc of problemData.testCases) {
          await prisma.testCase.create({
            data: {
              problemId: problem.id,
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              isHidden: tc.isHidden || false,
            },
          });
        }

        console.log(`  ✓ Sublevel ${sublevel.id} (${sublevel.title}) -> [HYBRID: 5 Stages, Topic Boss Problem]`);
        continue;
      }

      // ─────────────────────────────────────────────────────────────
      // PATH 3: CODE_BASED TOPICS (8 STAGES)
      // ─────────────────────────────────────────────────────────────
      const prob = getFirstYearProblem(subDef.id, subDef.title, subDef.tier as Tier);

      // Stage 1: Theory
      await prisma.stage.create({
        data: {
          sublevelId: sublevel.id,
          stageNumber: 1,
          stageType: StageType.THEORY,
          title: `Theory: ${subDef.title}`,
          contentJson: subDef.stages.theory as any,
        },
      });

      // Stage 2: Visualization
      await prisma.stage.create({
        data: {
          sublevelId: sublevel.id,
          stageNumber: 2,
          stageType: StageType.VISUALIZATION,
          title: `Visualization: ${subDef.title} Explorer`,
          contentJson: (subDef.stages.visualization || {
            initialArray: [10, 20, 30, 40, 50],
            steps: [{ activeIndices: [0], pointerLeft: 0, pointerRight: 4, action: `Visualizing ${subDef.title} operations.`, codeLine: '// Start' }],
          }) as any,
        },
      });

      // Stage 3: Dry Run
      await prisma.stage.create({
        data: {
          sublevelId: sublevel.id,
          stageNumber: 3,
          stageType: StageType.DRY_RUN,
          title: `Dry Run: Step-by-Step Trace of ${subDef.title}`,
          contentJson: (subDef.stages.dryRun || {
            code: `function trace(arr) {\n  // Tracing ${subDef.title}\n  return arr.length;\n}`,
            traceRows: [{ iteration: 1, action: 'Trace step 1' }],
          }) as any,
        },
      });

      // Stage 4: Guided Code
      await prisma.stage.create({
        data: {
          sublevelId: sublevel.id,
          stageNumber: 4,
          stageType: StageType.GUIDED_CODE,
          title: `Guided Code: ${subDef.title}`,
          contentJson: (subDef.stages.guidedCode || {
            prompt: `Fill in the missing line to complete the first-year implementation of ${subDef.title}.`,
            starterCode: prob.starterCode,
          }) as any,
        },
      });

      // Stage 5: Easy Problem
      await prisma.stage.create({
        data: {
          sublevelId: sublevel.id,
          stageNumber: 5,
          stageType: StageType.EASY_PROBLEM,
          title: `Easy Challenge: ${subDef.title}`,
          contentJson: {
            problemTitle: `Easy: ${subDef.title}`,
            description: prob.description,
            starterCode: prob.starterCode,
            testCases: prob.testCases,
          } as any,
        },
      });

      // Stage 6: Medium Problem
      await prisma.stage.create({
        data: {
          sublevelId: sublevel.id,
          stageNumber: 6,
          stageType: StageType.MEDIUM_PROBLEM,
          title: `Medium Challenge: ${subDef.title}`,
          contentJson: {
            problemTitle: `Medium: ${subDef.title}`,
            description: prob.description,
            starterCode: prob.starterCode,
            testCases: prob.testCases,
          } as any,
        },
      });

      // Stage 7: Quiz
      await prisma.stage.create({
        data: {
          sublevelId: sublevel.id,
          stageNumber: 7,
          stageType: StageType.QUIZ,
          title: `Quiz: ${subDef.title} Comprehension`,
          contentJson: subDef.stages.quiz as any,
        },
      });

      // Stage 8: Boss Problem
      await prisma.stage.create({
        data: {
          sublevelId: sublevel.id,
          stageNumber: 8,
          stageType: StageType.BOSS,
          title: `👑 Boss Battle: ${subDef.title}`,
          contentJson: {
            problemTitle: prob.title,
            description: prob.description,
            starterCode: prob.starterCode,
            testCases: prob.testCases,
          } as any,
        },
      });

      // Seed Problem & TestCases in DB
      const problem = await prisma.problem.create({
        data: {
          id: sublevel.id,
          sublevelId: sublevel.id,
          title: prob.title,
          description: prob.description,
          difficulty: prob.difficulty,
          xpReward: 100,
          starterCode: prob.starterCode as any,
        },
      });

      for (const tc of prob.testCases) {
        await prisma.testCase.create({
          data: {
            problemId: problem.id,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: tc.isHidden || false,
          },
        });
      }

      console.log(`  ✓ Sublevel ${sublevel.id} (${sublevel.title}) -> [CODE_BASED: 8 Stages, Topic-Aligned Code]`);
    }
  }

  console.log('\n🎉 First-Year Student Syllabus Seed successfully completed!');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
