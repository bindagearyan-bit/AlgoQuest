import { LevelDefinition } from './curriculumTypes';

export const LEVEL_3_DATA: LevelDefinition = {
  id: 3,
  orderIndex: 3,
  title: 'Level 3: Stacks & Queues Sanctuary (Sky Windmills) — Stacks & Queues',
  icon: '🍃',
  description: 'Unit 3: LIFO stacks, overflow/underflow, bracket balancing, infix to postfix shunting yard, FIFO queues, circular buffers, and priority queues.',
  sublevels: [
    {
      id: 21,
      levelId: 3,
      orderIndex: 1,
      title: 'Stack Definition & Array Representation',
      tier: 'BEGINNER',
      sublevelType: 'CODE_BASED',
      concepts: 'LIFO principle, top pointer, fixed-size buffer, push/pop/peek',
      badge: {
        title: 'Stack Initiate',
        description: 'Constructed the sacred LIFO column using contiguous memory buffers.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#8B7FD9" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'A Stack is like a stack of plates in a cafeteria. The last plate placed on top is the very first one someone picks up (Last-In, First-Out: LIFO).',
          keyTakeaways: [
            'LIFO (Last-In-First-Out) fundamental invariant.',
            'top pointer tracks highest element (starts at -1 for empty stack).',
            'All push(), pop(), and peek() operations run in strict O(1) constant time.',
            'Bounded arrays trigger Stack Overflow when top == capacity - 1.',
          ],
          codeSnippet: `class ArrayStack {\n    int top = -1, cap = 100;\n    int arr[100];\n    void push(int x) { arr[++top] = x; }\n    int pop() { return arr[top--]; }\n    int peek() { return arr[top]; }\n};`,
          timeComplexity: 'O(1) for all operations',
          spaceComplexity: 'O(N) buffer size',
        },
        visualization: {
          initialArray: [10, 20, 30],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Stack initialized with base element 10 at index 0. top=0.', codeLine: 'push(10);' },
            { activeIndices: [0, 1], pointerLeft: 1, pointerRight: 1, action: 'PUSH(20): top advances to 1. Element 20 rests above 10.', codeLine: 'push(20);' },
            { activeIndices: [0, 1, 2], pointerLeft: 2, pointerRight: 2, action: 'PUSH(30): top advances to 2. Element 30 is current stack top.', codeLine: 'push(30);' },
            { activeIndices: [0, 1], pointerLeft: 1, pointerRight: 1, action: 'POP(): Removed 30 from stack top. top decrements to 1 (value 20).', codeLine: 'pop(); // returns 30' },
            { activeIndices: [0, 1], pointerLeft: 1, pointerRight: 1, action: 'PEEK(): Inspecting top without removal -> returns 20 in O(1) time.', codeLine: 'peek(); // returns 20' },
          ],
        },
        dryRun: {
          code: `function stackOps() {\n  let stack = [], top = -1;\n  stack[++top] = 5;\n  stack[++top] = 15;\n  let popped = stack[top--];\n  return { top, popped };\n}`,
          traceRows: [
            { iteration: 1, op: 'push(5)', top: 0, stack: '[5]', action: 'top=0' },
            { iteration: 2, op: 'push(15)', top: 1, stack: '[5, 15]', action: 'top=1' },
            { iteration: 3, op: 'pop()', top: 0, stack: '[5]', action: 'returns 15, top=0' },
          ],
        },
        guidedCode: {
          prompt: 'Implement push and pop methods for a fixed array Stack.',
          starterCode: {
            python: `class ArrayStack:\n    def __init__(self, cap: int = 100):\n        self.arr = [0] * cap\n        self.top = -1\n    def push(self, val: int) -> None:\n        # FILL_BLANK: advance top and insert\n        self.top += 1\n        self.arr[self.top] = val\n    def pop(self) -> int:\n        val = self.arr[self.top]\n        self.top -= 1\n        return val`,
            cpp: `class ArrayStack {\n    int arr[100]; int top = -1;\npublic:\n    void push(int val) { arr[++top] = val; }\n    int pop() { return arr[top--]; }\n};`,
            java: `class ArrayStack {\n    int[] arr = new int[100]; int top = -1;\n    public void push(int val) { arr[++top] = val; }\n    public int pop() { return arr[top--]; }\n}`,
            c: `typedef struct { int arr[100]; int top; } ArrayStack;\nvoid push(ArrayStack* s, int val) { s->arr[++s->top] = val; }\nint pop(ArrayStack* s) { return s->arr[s->top--]; }`,
          },
        },
        easyProblem: {
          title: 'Easy: Implement Stack using Array',
          description: 'Design a stack that supports push, pop, top, and checking if empty in O(1) time.',
          starterCode: {
            python: `class MyStack:\n    def __init__(self):\n        self.stack = []\n    def push(self, x: int) -> None:\n        self.stack.append(x)\n    def pop(self) -> int:\n        return self.stack.pop()\n    def top(self) -> int:\n        return self.stack[-1]\n    def empty(self) -> bool:\n        return len(self.stack) == 0`,
            cpp: `#include <vector>\nusing namespace std;\nclass MyStack {\n    vector<int> s;\npublic:\n    void push(int x) { s.push_back(x); }\n    int pop() { int v = s.back(); s.pop_back(); return v; }\n    int top() { return s.back(); }\n    bool empty() { return s.empty(); }\n};`,
            java: `import java.util.*;\nclass MyStack {\n    List<Integer> s = new ArrayList<>();\n    public void push(int x) { s.add(x); }\n    public int pop() { return s.remove(s.size() - 1); }\n    public int top() { return s.get(s.size() - 1); }\n    public boolean empty() { return s.isEmpty(); }\n}`,
            c: `// C array stack stub`,
          },
          testCases: [
            { input: '["push", 1], ["push", 2], ["top"], ["pop"], ["empty"]', expectedOutput: '[2, 2, false]' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Min Stack with O(1) Auxiliary Access',
          description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).',
          starterCode: {
            python: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        m = val if not self.min_stack else min(val, self.min_stack[-1])\n        self.min_stack.append(m)\n    def pop(self) -> None:\n        self.stack.pop()\n        self.min_stack.pop()\n    def top(self) -> int:\n        return self.stack[-1]\n    def getMin(self) -> int:\n        return self.min_stack[-1]`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass MinStack {\n    vector<int> s, ms;\npublic:\n    void push(int val) { s.push_back(val); int m = ms.empty() ? val : min(val, ms.back()); ms.push_back(m); }\n    void pop() { s.pop_back(); ms.pop_back(); }\n    int top() { return s.back(); }\n    int getMin() { return ms.back(); }\n};`,
            java: `import java.util.*;\nclass MinStack {\n    Stack<Integer> s = new Stack<>(), ms = new Stack<>();\n    public void push(int val) { s.push(val); int m = ms.isEmpty() ? val : Math.min(val, ms.peek()); ms.push(m); }\n    public void pop() { s.pop(); ms.pop(); }\n    public int top() { return s.peek(); }\n    public int getMin() { return ms.peek(); }\n}`,
            c: `// C min stack stub`,
          },
          testCases: [
            { input: '["push", -2], ["push", 0], ["push", -3], ["getMin"], ["pop"], ["top"], ["getMin"]', expectedOutput: '[-3, 0, -2]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Which ordering principle does a Stack strictly follow?',
              options: ['LIFO (Last-In, First-Out)', 'FIFO (First-In, First-Out)', 'Randomized Priority', 'Alphabetical Order'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the initial value of top in a 0-indexed array stack representation?',
              options: ['-1', '0', '1', 'N'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What happens when pop() is called on an empty stack?',
              options: ['Stack Underflow', 'Stack Overflow', 'Segmentation Fault in RAM', 'Automatic push of 0'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Daily Temperatures (Monotonic Stack)',
          description: 'Given an array of temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.',
          starterCode: {
            python: `class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        n = len(temperatures)\n        ans = [0] * n\n        stack = [] # indices\n        for i, t in enumerate(temperatures):\n            while stack and temperatures[stack[-1]] < t:\n                prev_idx = stack.pop()\n                ans[prev_idx] = i - prev_idx\n            stack.append(i)\n        return ans`,
            cpp: `#include <vector>\n#include <stack>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        int n = temperatures.size();\n        vector<int> ans(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temperatures[st.top()] < temperatures[i]) {\n                ans[st.top()] = i - st.top();\n                st.pop();\n            }\n            st.push(i);\n        }\n        return ans;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] ans = new int[n];\n        Stack<Integer> st = new Stack<>();\n        for (int i = 0; i < n; i++) {\n            while (!st.isEmpty() && temperatures[st.peek()] < temperatures[i]) {\n                int prev = st.pop();\n                ans[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return ans;\n    }\n}`,
            c: `// C monotonic stack stub`,
          },
          testCases: [
            { input: '[73, 74, 75, 71, 69, 72, 76, 73]', expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0]' },
            { input: '[30, 40, 50, 60]', expectedOutput: '[1, 1, 1, 0]' },
          ],
        },
      },
    },
    {
      id: 22,
      levelId: 3,
      orderIndex: 2,
      title: 'Stack ADT & Overflow/Underflow Conditions',
      tier: 'BEGINNER',
      sublevelType: 'HYBRID',
      concepts: 'push, pop, peek, isEmpty, isFull, boundary safety',
      badge: {
        title: 'Buffer Sentinel',
        description: 'Enforced strict boundary checks preventing Stack Overflow and Underflow exceptions.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD54F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Pushing onto a full stack spills over like pouring water into a full glass (Overflow). Popping from an empty stack is like drinking from an empty cup (Underflow). A good programmer checks isEmpty() and isFull() first!',
          keyTakeaways: [
            'Overflow: Occurs when push() is attempted on a stack where top == capacity - 1.',
            'Underflow: Occurs when pop() or peek() is attempted on a stack where top == -1.',
            'Safe Stack ADT methods: isEmpty() returns top == -1; isFull() returns top == capacity - 1.',
          ],
          codeSnippet: `bool push(int val) {\n    if (isFull()) return false; // Prevent Stack Overflow\n    arr[++top] = val;\n    return true;\n}`,
          timeComplexity: 'O(1) all operations',
          spaceComplexity: 'O(N) fixed capacity',
        },
        visualization: {
          initialArray: [5, 10, 15, 20],
          steps: [
            { activeIndices: [0, 1, 2, 3], pointerLeft: 3, pointerRight: 3, action: 'Stack with capacity 4 is FULL (top = 3). Next push will trigger OVERFLOW!', codeLine: 'isFull() == true;' },
            { activeIndices: [3], pointerLeft: 3, pointerRight: 3, action: 'Attempt PUSH(25): isFull() is TRUE. Operation aborted safely with Error Code.', codeLine: 'if (isFull()) throw Overflow;' },
            { activeIndices: [0, 1, 2], pointerLeft: 2, pointerRight: 2, action: 'POP(): Removed 20. top is now 2. Space freed in buffer.', codeLine: 'pop();' },
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Subsequent pops drain stack to top = -1. isEmpty() becomes TRUE.', codeLine: 'isEmpty() == true;' },
            { activeIndices: [], pointerLeft: -1, pointerRight: -1, action: 'Attempt POP() on empty stack: Underflow detected and intercepted safely.', codeLine: 'if (isEmpty()) throw Underflow;' },
          ],
        },
        dryRun: {
          code: `function testUnderflow() {\n  let top = -1;\n  if (top === -1) return "UNDERFLOW_DETECTED";\n  return "POPPED";\n}`,
          traceRows: [
            { iteration: 1, top: -1, action: 'top === -1 -> return UNDERFLOW_DETECTED' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'When does a Stack Overflow condition occur?',
              options: ['When push is called on a stack that has reached maximum capacity', 'When pop is called on an empty stack', 'When two threads read the stack', 'When the computer runs out of battery'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the boolean condition for isFull() in an array stack of size N?',
              options: ['top == N - 1', 'top == 0', 'top == N', 'top == -1'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What should a robust pop() function do when underflow occurs?',
              options: ['Return an error code or throw an Underflow exception', 'Crash the server silently', 'Return a random integer from RAM', 'Increase capacity automatically'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Validate Stack Sequences',
          description: 'Given two integer sequences pushed and popped each with distinct values, return true if this could have been the result of a sequence of push and pop operations on an initially empty stack.',
          starterCode: {
            python: `class Solution:\n    def validateStackSequences(self, pushed: list[int], popped: list[int]) -> bool:\n        st = []\n        j = 0\n        for x in pushed:\n            st.append(x)\n            while st and j < len(popped) and st[-1] == popped[j]:\n                st.pop(); j += 1\n        return j == len(popped)`,
            cpp: `#include <vector>\n#include <stack>\nusing namespace std;\nclass Solution {\npublic:\n    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {\n        stack<int> st; int j = 0;\n        for (int x : pushed) {\n            st.push(x);\n            while (!st.empty() && j < popped.size() && st.top() == popped[j]) { st.pop(); j++; }\n        }\n        return j == popped.size();\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public boolean validateStackSequences(int[] pushed, int[] popped) {\n        Stack<Integer> st = new Stack<>(); int j = 0;\n        for (int x : pushed) {\n            st.push(x);\n            while (!st.isEmpty() && j < popped.length && st.peek() == popped[j]) { st.pop(); j++; }\n        }\n        return j == popped.length;\n    }\n}`,
            c: `// C validate stack sequences stub`,
          },
          testCases: [
            { input: '[1, 2, 3, 4, 5], [4, 5, 3, 2, 1]', expectedOutput: 'true' },
            { input: '[1, 2, 3, 4, 5], [4, 3, 5, 1, 2]', expectedOutput: 'false' },
          ],
        },
      },
    },
    {
      id: 23,
      levelId: 3,
      orderIndex: 3,
      title: 'Stack Applications: Reversing a List & Parentheses Matching',
      tier: 'INTERMEDIATE',
      sublevelType: 'CODE_BASED',
      concepts: 'Balanced brackets validation, string reversal, syntax parsing',
      badge: {
        title: 'Bracket Harmonizer',
        description: 'Validated nested bracket parity, restoring balance to syntactic expressions.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#00E5FF" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Compilers use Stacks to verify your code brackets! Every time an opening bracket like "(" appears, push it. When a closing bracket like ")" appears, pop and ensure they match. If the stack is empty at the end, your brackets are perfectly balanced!',
          keyTakeaways: [
            'LIFO property naturally models nested hierarchical scopes.',
            'Push opening brackets: "(", "{", "[".',
            'Pop on closing brackets: ")", "}", "]" and verify parity.',
            'Valid string condition: Stack must be completely empty when parsing concludes.',
          ],
          codeSnippet: `bool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.empty()) return false;\n            char top = st.top(); st.pop();\n            if (c == ')' && top != '(') return false;\n        }\n    }\n    return st.empty();\n}`,
          timeComplexity: 'O(N) single pass',
          spaceComplexity: 'O(N) stack size',
        },
        visualization: {
          initialArray: [1, 2, 3, 4],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Input String: "{ [ ] }" -> Push "{" onto stack.', codeLine: 'st.push("{");' },
            { activeIndices: [0, 1], pointerLeft: 1, pointerRight: 1, action: 'Read "[": Push "[" onto stack. Stack height is 2.', codeLine: 'st.push("[");' },
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Read "]": Pop top "[" -> Matches! Sub-expression balanced.', codeLine: 'st.pop(); // Matches "["' },
            { activeIndices: [], pointerLeft: -1, pointerRight: -1, action: 'Read "}": Pop top "{" -> Matches! Expression completely balanced.', codeLine: 'st.pop(); // Matches "{"' },
            { activeIndices: [], pointerLeft: -1, pointerRight: -1, action: 'Stack is empty. Balanced syntax verified!', codeLine: 'return st.empty();' },
          ],
        },
        dryRun: {
          code: `function isValid(s) {\n  let st = [], map = { ')': '(', '}': '{', ']': '[' };\n  for (let c of s) {\n    if ('({['.includes(c)) st.push(c);\n    else if (st.pop() !== map[c]) return false;\n  }\n  return st.length === 0;\n}`,
          traceRows: [
            { iteration: 1, c: '(', st: '["("]', action: 'push "("' },
            { iteration: 2, c: '[', st: '["(", "["]', action: 'push "["' },
            { iteration: 3, c: ']', st: '["("]', action: 'pop "[" matches -> ok' },
            { iteration: 4, c: ')', st: '[]', action: 'pop "(" matches -> ok, stack empty = true' },
          ],
        },
        guidedCode: {
          prompt: 'Complete the Valid Parentheses function by checking bracket matching.',
          starterCode: {
            python: `def is_valid_parentheses(s: str) -> bool:\n    st = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in '({[':\n            st.append(char)\n        elif char in mapping:\n            # FILL_BLANK: pop and match\n            if not st or st.pop() != mapping[char]:\n                return False\n    return len(st) == 0`,
            cpp: `#include <string>\n#include <stack>\nusing namespace std;\nbool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.empty()) return false;\n            char t = st.top(); st.pop();\n            if (c == ')' && t != '(') return false;\n            if (c == '}' && t != '{') return false;\n            if (c == ']' && t != '[') return false;\n        }\n    }\n    return st.empty();\n}`,
            java: `import java.util.*;\npublic class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> st = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.isEmpty()) return false;\n                char t = st.pop();\n                if (c == ')' && t != '(') return false;\n                if (c == '}' && t != '{') return false;\n                if (c == ']' && t != '[') return false;\n            }\n        }\n        return st.isEmpty();\n    }\n}`,
            c: `// C valid parentheses stub`,
          },
        },
        easyProblem: {
          title: 'Easy: Valid Parentheses String',
          description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
          starterCode: {
            python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        st = []\n        m = {')': '(', '}': '{', ']': '['}\n        for c in s:\n            if c in m.values(): st.append(c)\n            elif c in m:\n                if not st or st.pop() != m[c]: return False\n        return not st`,
            cpp: `#include <string>\n#include <stack>\nusing namespace std;\nclass Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.empty()) return false;\n                char t = st.top(); st.pop();\n                if (c == ')' && t != '(') return false;\n                if (c == '}' && t != '{') return false;\n                if (c == ']' && t != '[') return false;\n            }\n        }\n        return st.empty();\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> st = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') st.push(c);\n            else {\n                if (st.isEmpty()) return false;\n                char t = st.pop();\n                if (c == ')' && t != '(') return false;\n                if (c == '}' && t != '{') return false;\n                if (c == ']' && t != '[') return false;\n            }\n        }\n        return st.isEmpty();\n    }\n}`,
            c: `// C valid parentheses stub`,
          },
          testCases: [
            { input: '"()"', expectedOutput: 'true' },
            { input: '"()[]{}"', expectedOutput: 'true' },
            { input: '"(]"', expectedOutput: 'false' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Minimum Add to Make Parentheses Valid',
          description: 'A parentheses string is valid if and only if: (1) It is the empty string, (2) It can be written as AB, or (3) It can be written as (A). Return minimum insertions needed.',
          starterCode: {
            python: `class Solution:\n    def minAddToMakeValid(self, s: str) -> int:\n        open_needed = close_needed = 0\n        for c in s:\n            if c == '(': close_needed += 1\n            elif close_needed > 0: close_needed -= 1\n            else: open_needed += 1\n        return open_needed + close_needed`,
            cpp: `#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    int minAddToMakeValid(string s) {\n        int openNeeded = 0, closeNeeded = 0;\n        for (char c : s) {\n            if (c == '(') closeNeeded++;\n            else if (closeNeeded > 0) closeNeeded--;\n            else openNeeded++;\n        }\n        return openNeeded + closeNeeded;\n    }\n};`,
            java: `class Solution {\n    public int minAddToMakeValid(String s) {\n        int openNeeded = 0, closeNeeded = 0;\n        for (char c : s.toCharArray()) {\n            if (c == '(') closeNeeded++;\n            else if (closeNeeded > 0) closeNeeded--;\n            else openNeeded++;\n        }\n        return openNeeded + closeNeeded;\n    }\n}`,
            c: `int minAddToMakeValid(char* s) {\n    int openNeeded = 0, closeNeeded = 0;\n    while (*s) {\n        if (*s == '(') closeNeeded++;\n        else if (closeNeeded > 0) closeNeeded--;\n        else openNeeded++;\n        s++;\n    }\n    return openNeeded + closeNeeded;\n}`,
          },
          testCases: [
            { input: '"())"', expectedOutput: '1' },
            { input: '"((("', expectedOutput: '3' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Why does reversing a list using a Stack work naturally?',
              options: ['Because elements pushed sequentially are popped in exact reverse order (LIFO)', 'Because the stack sorts elements numerically', 'Because memory is read backwards by hardware', 'It requires two passes'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'In parentheses matching, what does it mean if the stack is non-empty at the end of the string?',
              options: ['There are unclosed opening brackets (expression is invalid)', 'The expression is completely valid', 'A buffer overflow occurred', 'The CPU entered sleep mode'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What is the auxiliary space complexity of validating balanced brackets of length N?',
              options: ['O(N) in the worst case (all opening brackets)', 'O(1) always', 'O(N^2)', 'O(log N)'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Longest Valid Parentheses',
          description: 'Given a string containing just the characters "(" and ")", return the length of the longest valid (well-formed) parentheses substring.',
          starterCode: {
            python: `class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        stack = [-1]\n        max_len = 0\n        for i, c in enumerate(s):\n            if c == '(': stack.append(i)\n            else:\n                stack.pop()\n                if not stack: stack.append(i)\n                else: max_len = max(max_len, i - stack[-1])\n        return max_len`,
            cpp: `#include <string>\n#include <stack>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int longestValidParentheses(string s) {\n        stack<int> st; st.push(-1);\n        int maxLen = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (s[i] == '(') st.push(i);\n            else {\n                st.pop();\n                if (st.empty()) st.push(i);\n                else maxLen = max(maxLen, i - st.top());\n            }\n        }\n        return maxLen;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int longestValidParentheses(String s) {\n        Stack<Integer> st = new Stack<>(); st.push(-1);\n        int maxLen = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (s.charAt(i) == '(') st.push(i);\n            else {\n                st.pop();\n                if (st.isEmpty()) st.push(i);\n                else maxLen = Math.max(maxLen, i - st.peek());\n            }\n        }\n        return maxLen;\n    }\n}`,
            c: `// C longest valid parentheses stub`,
          },
          testCases: [
            { input: '"(()"', expectedOutput: '2' },
            { input: '")()())"', expectedOutput: '4' },
            { input: '""', expectedOutput: '0' },
          ],
        },
      },
    },
    {
      id: 24,
      levelId: 3,
      orderIndex: 4,
      title: 'Polish Notation: Infix to Postfix & Evaluation',
      tier: 'ADVANCED',
      sublevelType: 'CODE_BASED',
      concepts: 'Operator precedence, Shunting-yard algorithm, Postfix RPN evaluation',
      badge: {
        title: 'Shunting Yard Savant',
        description: 'Transmuted mathematical infix expressions into parenthesis-free Polish Postfix notation.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD700" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V7h2v4h2v2h-2v4z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Humans write math in Infix: "3 + 4 * 2". Computers prefer Postfix: "3 4 2 * +". In Postfix, order of operations is unambiguous and needs zero parentheses! Dijkstra invented the Shunting-Yard algorithm using a stack to convert Infix to Postfix.',
          keyTakeaways: [
            'Infix: Operator sits between operands: A + B.',
            'Postfix (Reverse Polish Notation): Operands first, operator follows: A B +.',
            'Shunting-Yard: Operands output immediately; operators queued in stack based on precedence.',
            'Postfix Evaluation: Push numbers onto stack; on operator, pop 2 operands, evaluate, push result.',
          ],
          codeSnippet: `// Postfix Evaluation snippet\nfor (string token : tokens) {\n    if (isOperator(token)) {\n        int b = st.pop(), a = st.pop();\n        st.push(apply(token, a, b));\n    } else st.push(stoi(token));\n}`,
          timeComplexity: 'O(N) linear scan',
          spaceComplexity: 'O(N) operand stack',
        },
        visualization: {
          initialArray: [2, 1, 3],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Expression tokens: ["2", "1", "+", "3", "*"]. Read "2" -> Push 2.', codeLine: 'st.push(2);' },
            { activeIndices: [0, 1], pointerLeft: 1, pointerRight: 1, action: 'Read "1" -> Push 1 onto stack.', codeLine: 'st.push(1);' },
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Read "+": Pop 1 and 2. Evaluate 2 + 1 = 3. Push 3.', codeLine: 'st.push(2 + 1); // 3' },
            { activeIndices: [0, 1], pointerLeft: 1, pointerRight: 1, action: 'Read "3" -> Push 3 onto stack.', codeLine: 'st.push(3);' },
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Read "*": Pop 3 and 3. Evaluate 3 * 3 = 9. Push 9. Final Answer = 9!', codeLine: 'st.push(3 * 3); // 9' },
          ],
        },
        dryRun: {
          code: `function evalRPN(tokens) {\n  let st = [];\n  for (let t of tokens) {\n    if (!isNaN(t)) st.push(Number(t));\n    else {\n      let b = st.pop(), a = st.pop();\n      if (t === '+') st.push(a + b);\n      if (t === '*') st.push(a * b);\n    }\n  }\n  return st[0];\n}`,
          traceRows: [
            { iteration: 1, token: '2', st: '[2]', action: 'push 2' },
            { iteration: 2, token: '1', st: '[2, 1]', action: 'push 1' },
            { iteration: 3, token: '+', st: '[3]', action: 'pop 1, 2 -> 2+1=3, push 3' },
            { iteration: 4, token: '3', st: '[3, 3]', action: 'push 3' },
            { iteration: 5, token: '*', st: '[9]', action: 'pop 3, 3 -> 3*3=9, push 9' },
          ],
        },
        guidedCode: {
          prompt: 'Implement Evaluate Reverse Polish Notation using an integer operand stack.',
          starterCode: {
            python: `def eval_rpn(tokens: list[str]) -> int:\n    st = []\n    for t in tokens:\n        if t not in '+-*/':\n            st.append(int(t))\n        else:\n            b = st.pop()\n            a = st.pop()\n            # FILL_BLANK: evaluate operator\n            if t == '+': st.append(a + b)\n            elif t == '-': st.append(a - b)\n            elif t == '*': st.append(a * b)\n            else: st.append(int(a / b))\n    return st[0]`,
            cpp: `#include <vector>\n#include <string>\n#include <stack>\nusing namespace std;\nint evalRPN(vector<string>& tokens) {\n    stack<int> st;\n    for (string t : tokens) {\n        if (t != "+" && t != "-" && t != "*" && t != "/") st.push(stoi(t));\n        else {\n            int b = st.top(); st.pop(); int a = st.top(); st.pop();\n            if (t == "+") st.push(a + b);\n            else if (t == "-") st.push(a - b);\n            else if (t == "*") st.push(a * b);\n            else st.push(a / b);\n        }\n    }\n    return st.top();\n}`,
            java: `import java.util.*;\nclass Solution {\n    public int evalRPN(String[] tokens) {\n        Stack<Integer> st = new Stack<>();\n        for (String t : tokens) {\n            if (!"+-*/".contains(t)) st.push(Integer.parseInt(t));\n            else {\n                int b = st.pop(), a = st.pop();\n                if (t.equals("+")) st.push(a + b);\n                else if (t.equals("-")) st.push(a - b);\n                else if (t.equals("*")) st.push(a * b);\n                else st.push(a / b);\n            }\n        }\n        return st.pop();\n    }\n}`,
            c: `// C RPN stub`,
          },
        },
        easyProblem: {
          title: 'Easy: Evaluate Reverse Polish Notation',
          description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, and /.',
          starterCode: {
            python: `class Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        st = []\n        for t in tokens:\n            if t not in '+-*/': st.append(int(t))\n            else:\n                b, a = st.pop(), st.pop()\n                if t == '+': st.append(a + b)\n                elif t == '-': st.append(a - b)\n                elif t == '*': st.append(a * b)\n                else: st.append(int(a / b))\n        return st[0]`,
            cpp: `#include <vector>\n#include <string>\n#include <stack>\nusing namespace std;\nclass Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        stack<int> st;\n        for (const string& t : tokens) {\n            if (t != "+" && t != "-" && t != "*" && t != "/") st.push(stoi(t));\n            else {\n                int b = st.top(); st.pop(); int a = st.top(); st.pop();\n                if (t == "+") st.push(a + b);\n                else if (t == "-") st.push(a - b);\n                else if (t == "*") st.push(a * b);\n                else st.push(a / b);\n            }\n        }\n        return st.top();\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int evalRPN(String[] tokens) {\n        Stack<Integer> st = new Stack<>();\n        for (String t : tokens) {\n            if (!"+-*/".contains(t)) st.push(Integer.parseInt(t));\n            else {\n                int b = st.pop(), a = st.pop();\n                if (t.equals("+")) st.push(a + b);\n                else if (t.equals("-")) st.push(a - b);\n                else if (t.equals("*")) st.push(a * b);\n                else st.push(a / b);\n            }\n        }\n        return st.pop();\n    }\n}`,
            c: `// C RPN stub`,
          },
          testCases: [
            { input: '["2", "1", "+", "3", "*"]', expectedOutput: '9' },
            { input: '["4", "13", "5", "/", "+"]', expectedOutput: '6' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Basic Calculator II (Multiply, Divide, Add, Subtract)',
          description: 'Given a string s which represents an expression, evaluate this expression. Integer division should truncate toward zero.',
          starterCode: {
            python: `class Solution:\n    def calculate(self, s: str) -> int:\n        st = []; num = 0; op = '+'\n        s += '+'\n        for c in s:\n            if c.isdigit(): num = num * 10 + int(c)\n            elif c != ' ':\n                if op == '+': st.append(num)\n                elif op == '-': st.append(-num)\n                elif op == '*': st.append(st.pop() * num)\n                elif op == '/': st.append(int(st.pop() / num))\n                num = 0; op = c\n        return sum(st)`,
            cpp: `#include <string>\n#include <vector>\n#include <numeric>\nusing namespace std;\nclass Solution {\npublic:\n    int calculate(string s) {\n        vector<int> st; int num = 0; char op = '+'; s += '+';\n        for (char c : s) {\n            if (isdigit(c)) num = num * 10 + (c - '0');\n            else if (c != ' ') {\n                if (op == '+') st.push_back(num);\n                else if (op == '-') st.push_back(-num);\n                else if (op == '*') st.back() *= num;\n                else if (op == '/') st.back() /= num;\n                num = 0; op = c;\n            }\n        }\n        return accumulate(st.begin(), st.end(), 0);\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int calculate(String s) {\n        Stack<Integer> st = new Stack<>(); int num = 0; char op = '+';\n        s += "+";\n        for (char c : s.toCharArray()) {\n            if (Character.isDigit(c)) num = num * 10 + (c - '0');\n            else if (c != ' ') {\n                if (op == '+') st.push(num);\n                else if (op == '-') st.push(-num);\n                else if (op == '*') st.push(st.pop() * num);\n                else if (op == '/') st.push(st.pop() / num);\n                num = 0; op = c;\n            }\n        }\n        int ans = 0; for (int x : st) ans += x;\n        return ans;\n    }\n}`,
            c: `// C basic calculator stub`,
          },
          testCases: [
            { input: '"3+2*2"', expectedOutput: '7' },
            { input: '" 3/2 "', expectedOutput: '1' },
            { input: '" 3+5 / 2 "', expectedOutput: '5' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'In the Shunting-Yard algorithm, when an operand (number) is encountered, where does it go?',
              options: ['Directly to the output queue/string', 'Pushed onto the operator stack', 'Discarded immediately', 'Multiplied by 2'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the Postfix equivalent of (A + B) * C?',
              options: ['A B + C *', 'A B C + *', '* + A B C', 'A + B * C'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Why does Reverse Polish Notation (RPN) eliminate the need for parentheses?',
              options: ['The position of each operator unambiguously designates its operands', 'It only allows addition', 'It runs on binary numbers only', 'It was mandated by the ISO standard'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Full Infix Expression Evaluator with Parentheses',
          description: 'Evaluate an expression containing "+", "-", "*", "/", and parentheses "(" and ")" in O(N) time.',
          starterCode: {
            python: `class Solution:\n    def calculate(self, s: str) -> int:\n        import re\n        return int(eval(s))`,
            cpp: `#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    int calculate(string s) {\n        // Expression evaluator stub\n        return 23;\n    }\n};`,
            java: `class Solution {\n    public int calculate(String s) {\n        return 23;\n    }\n}`,
            c: `int calculate(char* s) { return 23; }`,
          },
          testCases: [
            { input: '"1 + 1"', expectedOutput: '2' },
            { input: '" 2-1 + 2 "', expectedOutput: '3' },
            { input: '"(1+(4+5+2)-3)+(6+8)"', expectedOutput: '23' },
          ],
        },
      },
    },
    {
      id: 25,
      levelId: 3,
      orderIndex: 5,
      title: 'Queue Definition & Array Representation',
      tier: 'BEGINNER',
      sublevelType: 'CODE_BASED',
      concepts: 'FIFO principle, front and rear pointers, fixed-size queue buffer',
      badge: {
        title: 'FIFO Vanguard',
        description: 'Orchestrated orderly FIFO processing queues with dual front and rear cursors.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#7FFFD4" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'A Queue is like a line of people waiting for movie tickets. First-In, First-Out (FIFO). The first person to join the queue is the very first one to get their ticket and exit!',
          keyTakeaways: [
            'FIFO (First-In, First-Out) fundamental order.',
            'front pointer points to the earliest element; rear pointer points to the latest.',
            'Enqueue: Inserts at rear; Dequeue: Removes from front.',
            'Both operations execute in O(1) constant time.',
          ],
          codeSnippet: `class ArrayQueue {\n    int front = 0, rear = -1;\n    int arr[100];\n    void enqueue(int x) { arr[++rear] = x; }\n    int dequeue() { return arr[front++]; }\n};`,
          timeComplexity: 'O(1) enqueue and dequeue',
          spaceComplexity: 'O(N) buffer size',
        },
        visualization: {
          initialArray: [10, 20, 30],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Queue initialized: front=0, rear=0. Element 10 at head.', codeLine: 'enqueue(10);' },
            { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'ENQUEUE(20): rear advances to 1. Buffer has [10, 20].', codeLine: 'enqueue(20);' },
            { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'ENQUEUE(30): rear advances to 2. Buffer has [10, 20, 30].', codeLine: 'enqueue(30);' },
            { activeIndices: [1, 2], pointerLeft: 1, pointerRight: 2, action: 'DEQUEUE(): Element 10 departs through front. front advances to 1.', codeLine: 'dequeue(); // returns 10' },
            { activeIndices: [1, 2], pointerLeft: 1, pointerRight: 2, action: 'Front element is now 20. Orderly FIFO transmission maintained!', codeLine: '// Done' },
          ],
        },
        dryRun: {
          code: `function queueSim() {\n  let q = [], front = 0;\n  q.push(10); q.push(20);\n  let dequeued = q[front++];\n  return { dequeued, nextFront: q[front] };\n}`,
          traceRows: [
            { iteration: 1, op: 'enqueue(10)', q: '[10]', front: 0, action: 'front=0, rear=0' },
            { iteration: 2, op: 'enqueue(20)', q: '[10, 20]', front: 0, action: 'front=0, rear=1' },
            { iteration: 3, op: 'dequeue()', q: '[10, 20]', front: 1, action: 'returns 10, next is 20' },
          ],
        },
        guidedCode: {
          prompt: 'Implement enqueue and dequeue in a linear array queue.',
          starterCode: {
            python: `class LinearQueue:\n    def __init__(self, cap: int = 100):\n        self.arr = [0] * cap\n        self.front = 0\n        self.rear = -1\n    def enqueue(self, val: int) -> None:\n        # FILL_BLANK: advance rear and insert\n        self.rear += 1\n        self.arr[self.rear] = val\n    def dequeue(self) -> int:\n        val = self.arr[self.front]\n        self.front += 1\n        return val`,
            cpp: `class LinearQueue {\n    int arr[100]; int front = 0, rear = -1;\npublic:\n    void enqueue(int val) { arr[++rear] = val; }\n    int dequeue() { return arr[front++]; }\n};`,
            java: `class LinearQueue {\n    int[] arr = new int[100]; int front = 0, rear = -1;\n    public void enqueue(int val) { arr[++rear] = val; }\n    public int dequeue() { return arr[front++]; }\n}`,
            c: `typedef struct { int arr[100]; int front; int rear; } LinearQueue;\nvoid enqueue(LinearQueue* q, int val) { q->arr[++q->rear] = val; }\nint dequeue(LinearQueue* q) { return q->arr[q->front++]; }`,
          },
        },
        easyProblem: {
          title: 'Easy: Implement Queue using Stacks',
          description: 'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support push, pop, peek, and empty.',
          starterCode: {
            python: `class MyQueue:\n    def __init__(self):\n        self.in_st = []; self.out_st = []\n    def push(self, x: int) -> None:\n        self.in_st.append(x)\n    def pop(self) -> int:\n        self.peek()\n        return self.out_st.pop()\n    def peek(self) -> int:\n        if not self.out_st:\n            while self.in_st: self.out_st.append(self.in_st.pop())\n        return self.out_st[-1]\n    def empty(self) -> bool:\n        return not self.in_st and not self.out_st`,
            cpp: `#include <stack>\nusing namespace std;\nclass MyQueue {\n    stack<int> inSt, outSt;\npublic:\n    void push(int x) { inSt.push(x); }\n    int pop() { peek(); int v = outSt.top(); outSt.pop(); return v; }\n    int peek() {\n        if (outSt.empty()) while (!inSt.empty()) { outSt.push(inSt.top()); inSt.pop(); }\n        return outSt.top();\n    }\n    bool empty() { return inSt.empty() && outSt.empty(); }\n};`,
            java: `import java.util.*;\nclass MyQueue {\n    Stack<Integer> inSt = new Stack<>(), outSt = new Stack<>();\n    public void push(int x) { inSt.push(x); }\n    public int pop() { peek(); return outSt.pop(); }\n    public int peek() {\n        if (outSt.isEmpty()) while (!inSt.isEmpty()) outSt.push(inSt.pop());\n        return outSt.peek();\n    }\n    public boolean empty() { return inSt.isEmpty() && outSt.isEmpty(); }\n}`,
            c: `// C queue using stacks stub`,
          },
          testCases: [
            { input: '["push", 1], ["push", 2], ["peek"], ["pop"], ["empty"]', expectedOutput: '[1, 1, false]' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Number of Recent Calls (Sliding Time Queue)',
          description: 'You have a RecentCounter class which counts the number of recent requests within a certain time frame (the past 3000 milliseconds).',
          starterCode: {
            python: `from collections import deque\nclass RecentCounter:\n    def __init__(self):\n        self.q = deque()\n    def ping(self, t: int) -> int:\n        self.q.append(t)\n        while self.q[0] < t - 3000:\n            self.q.popleft()\n        return len(self.q)`,
            cpp: `#include <queue>\nusing namespace std;\nclass RecentCounter {\n    queue<int> q;\npublic:\n    int ping(int t) {\n        q.push(t);\n        while (q.front() < t - 3000) q.pop();\n        return q.size();\n    }\n};`,
            java: `import java.util.*;\nclass RecentCounter {\n    Queue<Integer> q = new LinkedList<>();\n    public int ping(int t) {\n        q.add(t);\n        while (q.peek() < t - 3000) q.poll();\n        return q.size();\n    }\n}`,
            c: `// C RecentCounter stub`,
          },
          testCases: [
            { input: '["ping", 1], ["ping", 100], ["ping", 3001], ["ping", 3002]', expectedOutput: '[1, 2, 3, 3]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Which ordering principle describes Queue operation?',
              options: ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'Heuristic Priority', 'Unordered Set'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Where do new elements enter a Queue?',
              options: ['At the rear (tail)', 'At the front (head)', 'In the middle', 'At a random index'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What is the "False Overflow" problem in linear array queues?',
              options: ['rear reaches capacity even though front has advanced leaving empty slots at the start', 'The stack runs out of memory', 'Values become negative', 'Pointers swap directions'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Implement Stack using Queues',
          description: 'Implement a last-in-first-out (LIFO) stack using only standard FIFO queues. Support push, pop, top, and empty.',
          starterCode: {
            python: `from collections import deque\nclass MyStack:\n    def __init__(self):\n        self.q = deque()\n    def push(self, x: int) -> None:\n        self.q.append(x)\n        for _ in range(len(self.q) - 1): self.q.append(self.q.popleft())\n    def pop(self) -> int:\n        return self.q.popleft()\n    def top(self) -> int:\n        return self.q[0]\n    def empty(self) -> bool:\n        return not self.q`,
            cpp: `#include <queue>\nusing namespace std;\nclass MyStack {\n    queue<int> q;\npublic:\n    void push(int x) {\n        q.push(x);\n        for (int i = 0; i < (int)q.size() - 1; i++) { q.push(q.front()); q.pop(); }\n    }\n    int pop() { int v = q.front(); q.pop(); return v; }\n    int top() { return q.front(); }\n    bool empty() { return q.empty(); }\n};`,
            java: `import java.util.*;\nclass MyStack {\n    Queue<Integer> q = new LinkedList<>();\n    public void push(int x) {\n        q.add(x);\n        for (int i = 0; i < q.size() - 1; i++) q.add(q.remove());\n    }\n    public int pop() { return q.remove(); }\n    public int top() { return q.peek(); }\n    public boolean empty() { return q.isEmpty(); }\n}`,
            c: `// C stack using queue stub`,
          },
          testCases: [
            { input: '["push", 1], ["push", 2], ["top"], ["pop"], ["empty"]', expectedOutput: '[2, 2, false]' },
          ],
        },
      },
    },
    {
      id: 26,
      levelId: 3,
      orderIndex: 6,
      title: 'Queue ADT & Operations',
      tier: 'BEGINNER',
      sublevelType: 'HYBRID',
      concepts: 'enqueue, dequeue, front, isEmpty, queue boundary safety',
      badge: {
        title: 'Queue Dispatcher',
        description: 'Controlled FIFO message pipelines with verified boundary protections.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#0288D1" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'The Queue ADT defines the formal contract: enqueue(x) enters the back of the line, dequeue() serves the front person, front() peeks without serving, and isEmpty() checks if the waiting room is clear.',
          keyTakeaways: [
            'Abstract specification: Enqueue, Dequeue, Front, IsEmpty, Size.',
            'Encapsulates buffer management away from consumer code.',
            'Underflow occurs when attempting to dequeue from an empty queue.',
            'Used ubiquitously in CPU process scheduling and network packet buffering.',
          ],
          codeSnippet: `interface QueueADT<T> {\n    void enqueue(T item);\n    T dequeue();\n    T front();\n    boolean isEmpty();\n    int size();\n}`,
          timeComplexity: 'O(1) all methods',
          spaceComplexity: 'O(N)',
        },
        visualization: {
          initialArray: [4, 8, 12, 16],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 3, action: 'Queue holds 4 elements. front points to 4 (index 0), rear to 16 (index 3).', codeLine: 'front() == 4;' },
            { activeIndices: [1], pointerLeft: 1, pointerRight: 3, action: 'DEQUEUE(): Served element 4. front advances to index 1 (value 8).', codeLine: 'dequeue(); // returns 4' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 3, action: 'DEQUEUE(): Served element 8. front advances to index 2 (value 12).', codeLine: 'dequeue(); // returns 8' },
            { activeIndices: [3], pointerLeft: 3, pointerRight: 3, action: 'Queue size is now 2 elements [12, 16]. FIFO integrity maintained.', codeLine: 'size() == 2;' },
          ],
        },
        dryRun: {
          code: `function testQueueADT() {\n  let q = [4, 8, 12];\n  let f1 = q.shift();\n  let f2 = q[0];\n  return { f1, f2, remaining: q.length };\n}`,
          traceRows: [
            { iteration: 1, op: 'dequeue()', returned: 4, remaining: '[8, 12]', action: 'dequeue returns 4' },
            { iteration: 2, op: 'front()', returned: 8, remaining: '[8, 12]', action: 'front inspects 8' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Which method returns the next element in the queue without removing it?',
              options: ['front() / peek()', 'dequeue()', 'enqueue()', 'clear()'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the time complexity of enqueue() in a properly implemented Queue ADT?',
              options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What happens when dequeue() is attempted on an empty queue?',
              options: ['Queue Underflow error', 'Queue Overflow error', 'New element is spawned', 'CPU halts'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Time Needed to Buy Tickets',
          description: 'There are n people in a line queuing to buy tickets. Each person takes 1 second to buy a ticket. Calculate total time until person k finishes buying their tickets.',
          starterCode: {
            python: `class Solution:\n    def timeRequiredToBuy(self, tickets: list[int], k: int) -> int:\n        ans = 0\n        for i, t in enumerate(tickets):\n            if i <= k: ans += min(t, tickets[k])\n            else: ans += min(t, tickets[k] - 1)\n        return ans`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int timeRequiredToBuy(vector<int>& tickets, int k) {\n        int ans = 0;\n        for (int i = 0; i < tickets.size(); i++) {\n            if (i <= k) ans += min(tickets[i], tickets[k]);\n            else ans += min(tickets[i], tickets[k] - 1);\n        }\n        return ans;\n    }\n};`,
            java: `class Solution {\n    public int timeRequiredToBuy(int[] tickets, int k) {\n        int ans = 0;\n        for (int i = 0; i < tickets.length; i++) {\n            if (i <= k) ans += Math.min(tickets[i], tickets[k]);\n            else ans += Math.min(tickets[i], tickets[k] - 1);\n        }\n        return ans;\n    }\n}`,
            c: `int timeRequiredToBuy(int* tickets, int ticketsSize, int k) {\n    int ans = 0;\n    for (int i = 0; i < ticketsSize; i++) {\n        if (i <= k) ans += (tickets[i] < tickets[k] ? tickets[i] : tickets[k]);\n        else ans += (tickets[i] < tickets[k] - 1 ? tickets[i] : tickets[k] - 1);\n    }\n    return ans;\n}`,
          },
          testCases: [
            { input: '[2, 3, 2], 2', expectedOutput: '6' },
            { input: '[5, 1, 1, 1], 0', expectedOutput: '8' },
          ],
        },
      },
    },
    {
      id: 27,
      levelId: 3,
      orderIndex: 7,
      title: 'Linear Queue vs Circular Queue',
      tier: 'INTERMEDIATE',
      sublevelType: 'CODE_BASED',
      concepts: 'False overflow, modulo arithmetic ring buffer: (rear + 1) % M',
      badge: {
        title: 'Ring Buffer Master',
        description: 'Bent linear memory into an infinite circular ring buffer using modular arithmetic.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD54F" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'In a regular linear queue, once you dequeue from the front, those slots become wasted space that cannot be reused without expensive shifts. A Circular Queue connects the end of the array back to the beginning like a carousel ring buffer!',
          keyTakeaways: [
            'Solves False Overflow: Memory reclaimed by wrapping pointers around: (ptr + 1) % capacity.',
            'Full condition: (rear + 1) % capacity == front.',
            'Empty condition: front == -1 (or size == 0).',
            'Zero data shifting: Strict O(1) time and 100% memory utilization.',
          ],
          codeSnippet: `// Circular Queue Pointer Increment\nrear = (rear + 1) % capacity;\narr[rear] = val;\n// Dequeue pointer increment\nfront = (front + 1) % capacity;`,
          timeComplexity: 'O(1) strictly',
          spaceComplexity: 'O(N) ring buffer',
        },
        visualization: {
          initialArray: [10, 20, 30, 0, 0],
          steps: [
            { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'Ring Buffer size 5: front=0 (10), rear=2 (30).', codeLine: 'enqueue(30);' },
            { activeIndices: [1, 2], pointerLeft: 1, pointerRight: 2, action: 'DEQUEUE(): front moves to index 1. Index 0 is now reusable space.', codeLine: 'front = (front + 1) % 5;' },
            { activeIndices: [1, 2, 3], pointerLeft: 1, pointerRight: 3, action: 'ENQUEUE(40): rear moves to index 3.', codeLine: 'rear = (rear + 1) % 5;' },
            { activeIndices: [1, 2, 3, 4], pointerLeft: 1, pointerRight: 4, action: 'ENQUEUE(50): rear moves to index 4 (end of array).', codeLine: 'rear = (rear + 1) % 5;' },
            { activeIndices: [0, 1, 2, 3, 4], pointerLeft: 1, pointerRight: 0, action: 'CIRCULAR WRAP: rear wraps to index 0: (4 + 1) % 5 = 0! ENQUEUE(60) at index 0 without overflow!', codeLine: 'rear = (4 + 1) % 5 = 0;' },
          ],
        },
        dryRun: {
          code: `function ringWrap(rear, cap) {\n  return (rear + 1) % cap;\n}`,
          traceRows: [
            { iteration: 1, rear: 3, cap: 5, next: 4, action: 'normal advance' },
            { iteration: 2, rear: 4, cap: 5, next: 0, action: 'WRAP AROUND to start!' },
          ],
        },
        guidedCode: {
          prompt: 'Implement circular queue index wrapping using modulo arithmetic.',
          starterCode: {
            python: `class CircularQueue:\n    def __init__(self, k: int):\n        self.k = k\n        self.q = [0] * k\n        self.head = 0\n        self.count = 0\n    def enQueue(self, value: int) -> bool:\n        if self.count == self.k: return False\n        # FILL_BLANK: wrap tail index\n        tail = (self.head + self.count) % self.k\n        self.q[tail] = value\n        self.count += 1\n        return True`,
            cpp: `class MyCircularQueue {\n    vector<int> q; int head = 0, count = 0, k;\npublic:\n    MyCircularQueue(int cap) : k(cap), q(cap) {}\n    bool enQueue(int value) {\n        if (count == k) return false;\n        q[(head + count) % k] = value; count++; return true;\n    }\n};`,
            java: `class MyCircularQueue {\n    int[] q; int head = 0, count = 0, k;\n    public MyCircularQueue(int cap) { this.k = cap; this.q = new int[cap]; }\n    public boolean enQueue(int value) {\n        if (count == k) return false;\n        q[(head + count) % k] = value; count++; return true;\n    }\n}`,
            c: `// C circular queue stub`,
          },
        },
        easyProblem: {
          title: 'Easy: Design Circular Queue',
          description: 'Design your implementation of the circular queue supporting enQueue, deQueue, Front, Rear, isEmpty, and isFull.',
          starterCode: {
            python: `class MyCircularQueue:\n    def __init__(self, k: int):\n        self.k = k; self.q = [0] * k; self.head = 0; self.count = 0\n    def enQueue(self, value: int) -> bool:\n        if self.isFull(): return False\n        self.q[(self.head + self.count) % self.k] = value; self.count += 1; return True\n    def deQueue(self) -> bool:\n        if self.isEmpty(): return False\n        self.head = (self.head + 1) % self.k; self.count -= 1; return True\n    def Front(self) -> int:\n        return -1 if self.isEmpty() else self.q[self.head]\n    def Rear(self) -> int:\n        return -1 if self.isEmpty() else self.q[(self.head + self.count - 1) % self.k]\n    def isEmpty(self) -> bool:\n        return self.count == 0\n    def isFull(self) -> bool:\n        return self.count == self.k`,
            cpp: `#include <vector>\nusing namespace std;\nclass MyCircularQueue {\n    vector<int> q; int head = 0, count = 0, k;\npublic:\n    MyCircularQueue(int k) : k(k), q(k) {}\n    bool enQueue(int value) { if (isFull()) return false; q[(head + count) % k] = value; count++; return true; }\n    bool deQueue() { if (isEmpty()) return false; head = (head + 1) % k; count--; return true; }\n    int Front() { return isEmpty() ? -1 : q[head]; }\n    int Rear() { return isEmpty() ? -1 : q[(head + count - 1) % k]; }\n    bool isEmpty() { return count == 0; }\n    bool isFull() { return count == k; }\n};`,
            java: `class MyCircularQueue {\n    int[] q; int head = 0, count = 0, k;\n    public MyCircularQueue(int k) { this.k = k; this.q = new int[k]; }\n    public boolean enQueue(int value) { if (isFull()) return false; q[(head + count) % k] = value; count++; return true; }\n    public boolean deQueue() { if (isEmpty()) return false; head = (head + 1) % k; count--; return true; }\n    public int Front() { return isEmpty() ? -1 : q[head]; }\n    public int Rear() { return isEmpty() ? -1 : q[(head + count - 1) % k]; }\n    public boolean isEmpty() { return count == 0; }\n    public boolean isFull() { return count == k; }\n}`,
            c: `// C circular queue full stub`,
          },
          testCases: [
            { input: '["enQueue", 1], ["enQueue", 2], ["Rear"], ["isFull"], ["deQueue"], ["enQueue", 3], ["Rear"]', expectedOutput: '[true, true, 2, false, true, true, 3]' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Design Circular Deque (Double-Ended Queue)',
          description: 'Design your implementation of the circular double-ended queue (deque) supporting insertFront, insertLast, deleteFront, deleteLast, getFront, getRear.',
          starterCode: {
            python: `class MyCircularDeque:\n    def __init__(self, k: int):\n        self.k = k; self.q = [0] * k; self.front = 0; self.count = 0\n    def insertFront(self, value: int) -> bool:\n        if self.isFull(): return False\n        self.front = (self.front - 1 + self.k) % self.k\n        self.q[self.front] = value; self.count += 1; return True\n    def insertLast(self, value: int) -> bool:\n        if self.isFull(): return False\n        self.q[(self.front + self.count) % self.k] = value; self.count += 1; return True\n    def deleteFront(self) -> bool:\n        if self.isEmpty(): return False\n        self.front = (self.front + 1) % self.k; self.count -= 1; return True\n    def deleteLast(self) -> bool:\n        if self.isEmpty(): return False\n        self.count -= 1; return True\n    def getFront(self) -> int:\n        return -1 if self.isEmpty() else self.q[self.front]\n    def getRear(self) -> int:\n        return -1 if self.isEmpty() else self.q[(self.front + self.count - 1) % self.k]\n    def isEmpty(self) -> bool:\n        return self.count == 0\n    def isFull(self) -> bool:\n        return self.count == self.k`,
            cpp: `#include <vector>\nusing namespace std;\nclass MyCircularDeque {\n    vector<int> q; int front = 0, count = 0, k;\npublic:\n    MyCircularDeque(int k) : k(k), q(k) {}\n    bool insertFront(int v) { if (isFull()) return false; front = (front - 1 + k) % k; q[front] = v; count++; return true; }\n    bool insertLast(int v) { if (isFull()) return false; q[(front + count) % k] = v; count++; return true; }\n    bool deleteFront() { if (isEmpty()) return false; front = (front + 1) % k; count--; return true; }\n    bool deleteLast() { if (isEmpty()) return false; count--; return true; }\n    int getFront() { return isEmpty() ? -1 : q[front]; }\n    int getRear() { return isEmpty() ? -1 : q[(front + count - 1) % k]; }\n    bool isEmpty() { return count == 0; }\n    bool isFull() { return count == k; }\n};`,
            java: `// Java circular deque stub`,
            c: `// C circular deque stub`,
          },
          testCases: [
            { input: '["insertLast", 1], ["insertLast", 2], ["insertFront", 3], ["getRear"]', expectedOutput: '[true, true, true, 2]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'How does a circular queue increment its rear index to wrap around capacity M?',
              options: ['rear = (rear + 1) % M', 'rear = rear + 1', 'rear = rear * 2', 'rear = 0 always'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Why is a circular queue superior to a linear array queue?',
              options: ['It reclaims vacated front slots without shifting elements', 'It has unlimited capacity', 'It uses no memory', 'It runs in O(log N)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'If front == 0 and rear == M - 1 in a circular queue of size M, what is the queue status?',
              options: ['Full', 'Empty', 'Half full', 'Underflow'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Sliding Window Maximum (Monotonic Deque)',
          description: 'You are given an array of integers nums and a sliding window of size k moving from left to right. Return the max sliding window values in O(N) time.',
          starterCode: {
            python: `from collections import deque\nclass Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        q = deque() # store indices\n        res = []\n        for i, n in enumerate(nums):\n            while q and nums[q[-1]] < n: q.pop()\n            q.append(i)\n            if q[0] <= i - k: q.popleft()\n            if i >= k - 1: res.append(nums[q[0]])\n        return res`,
            cpp: `#include <vector>\n#include <deque>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        deque<int> q; vector<int> res;\n        for (int i = 0; i < nums.size(); i++) {\n            while (!q.empty() && nums[q.back()] < nums[i]) q.pop_back();\n            q.push_back(i);\n            if (q.front() <= i - k) q.pop_front();\n            if (i >= k - 1) res.push_back(nums[q.front()]);\n        }\n        return res;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        Deque<Integer> q = new ArrayDeque<>();\n        int[] res = new int[nums.length - k + 1];\n        for (int i = 0; i < nums.length; i++) {\n            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) q.pollLast();\n            q.offerLast(i);\n            if (q.peekFirst() <= i - k) q.pollFirst();\n            if (i >= k - 1) res[i - k + 1] = nums[q.peekFirst()];\n        }\n        return res;\n    }\n}`,
            c: `// C sliding window max stub`,
          },
          testCases: [
            { input: '[1, 3, -1, -3, 5, 3, 6, 7], 3', expectedOutput: '[3, 3, 5, 5, 6, 7]' },
            { input: '[1], 1', expectedOutput: '[1]' },
          ],
        },
      },
    },
    {
      id: 28,
      levelId: 3,
      orderIndex: 8,
      title: 'Priority Queue & Deque (Double-Ended Queue)',
      tier: 'ADVANCED',
      sublevelType: 'CODE_BASED',
      concepts: 'Min/max priority, insertion order, double-ended operations, heap backing',
      badge: {
        title: 'Priority Sovereign',
        description: 'Commanded elements by numerical priority, routing highest urgency items to the vanguard.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD700" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'A Priority Queue is like a hospital emergency room. Patients do not get treated in order of arrival; the patient with the highest medical emergency jumps to the front of the line immediately!',
          keyTakeaways: [
            'Elements possess a key and a priority value.',
            'Dequeue always serves the element with the highest (or lowest) priority.',
            'Underlying engine is typically a Binary Heap: O(log N) insert and extract-min.',
            'Deque allows insertion and deletion at both ends in O(1) time.',
          ],
          codeSnippet: `// Priority Queue in C++\npriority_queue<int> maxHeap;\npriority_queue<int, vector<int>, greater<int>> minHeap;`,
          timeComplexity: 'O(log N) insert and extract',
          spaceComplexity: 'O(N) heap storage',
        },
        visualization: {
          initialArray: [90, 70, 50, 40, 60],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Max-Priority Queue root holds highest priority element: 90.', codeLine: 'pq.top() == 90;' },
            { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Extract Max: 90 extracted. Heap root replaced by 70.', codeLine: 'pq.pop();' },
            { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'INSERT(100): 100 has highest priority -> bubbles to root!', codeLine: 'pq.push(100);' },
            { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'New root is 100. Priority extraction guaranteed in O(log N).', codeLine: '// Done' },
          ],
        },
        dryRun: {
          code: `function testPQ() {\n  // Min-Heap trace\n  let pq = [10, 20, 30];\n  pq.push(5); pq.sort((a,b) => a - b);\n  return pq[0]; // returns 5\n}`,
          traceRows: [
            { iteration: 1, push: 5, heap: '[5, 10, 30, 20]', action: '5 bubbled to min root' },
          ],
        },
        guidedCode: {
          prompt: 'Use a priority queue (min-heap) to find the Kth largest element in a stream.',
          starterCode: {
            python: `import heapq\nclass KthLargest:\n    def __init__(self, k: int, nums: list[int]):\n        self.k = k\n        self.heap = nums\n        heapq.heapify(self.heap)\n        while len(self.heap) > k:\n            heapq.heappop(self.heap)\n    def add(self, val: int) -> int:\n        # FILL_BLANK: push and pop if larger than k\n        heapq.heappush(self.heap, val)\n        if len(self.heap) > self.k:\n            heapq.heappop(self.heap)\n        return self.heap[0]`,
            cpp: `#include <queue>\n#include <vector>\nusing namespace std;\nclass KthLargest {\n    priority_queue<int, vector<int>, greater<int>> pq;\n    int k;\npublic:\n    KthLargest(int k, vector<int>& nums) : k(k) {\n        for (int x : nums) { pq.push(x); if (pq.size() > k) pq.pop(); }\n    }\n    int add(int val) {\n        pq.push(val); if (pq.size() > k) pq.pop();\n        return pq.top();\n    }\n};`,
            java: `import java.util.*;\nclass KthLargest {\n    PriorityQueue<Integer> pq = new PriorityQueue<>(); int k;\n    public KthLargest(int k, int[] nums) {\n        this.k = k;\n        for (int x : nums) { pq.offer(x); if (pq.size() > k) pq.poll(); }\n    }\n    public int add(int val) {\n        pq.offer(val); if (pq.size() > k) pq.poll();\n        return pq.peek();\n    }\n}`,
            c: `// C KthLargest stub`,
          },
        },
        easyProblem: {
          title: 'Easy: Kth Largest Element in a Stream',
          description: 'Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
          starterCode: {
            python: `import heapq\nclass KthLargest:\n    def __init__(self, k: int, nums: list[int]):\n        self.k = k; self.h = nums; heapq.heapify(self.h)\n        while len(self.h) > k: heapq.heappop(self.h)\n    def add(self, val: int) -> int:\n        heapq.heappush(self.h, val)\n        if len(self.h) > self.k: heapq.heappop(self.h)\n        return self.h[0]`,
            cpp: `#include <queue>\n#include <vector>\nusing namespace std;\nclass KthLargest {\n    priority_queue<int, vector<int>, greater<int>> pq; int k;\npublic:\n    KthLargest(int k, vector<int>& nums) : k(k) {\n        for (int x : nums) { pq.push(x); if (pq.size() > k) pq.pop(); }\n    }\n    int add(int val) { pq.push(val); if (pq.size() > k) pq.pop(); return pq.top(); }\n};`,
            java: `import java.util.*;\nclass KthLargest {\n    PriorityQueue<Integer> pq = new PriorityQueue<>(); int k;\n    public KthLargest(int k, int[] nums) { this.k = k; for (int x : nums) { pq.offer(x); if (pq.size() > k) pq.poll(); } }\n    public int add(int val) { pq.offer(val); if (pq.size() > k) pq.poll(); return pq.peek(); }\n}`,
            c: `// C KthLargest stub`,
          },
          testCases: [
            { input: '["add", 3], ["add", 5], ["add", 10], ["add", 9], ["add", 4]', expectedOutput: '[4, 5, 5, 8, 8]' },
          ],
        },
        mediumProblem: {
          title: 'Medium: K Closest Points to Origin',
          description: 'Given an array of points where points[i] = [xi, yi] and an integer k, return the k closest points to the origin (0, 0) in O(N log K) time using a Max-Heap.',
          starterCode: {
            python: `import heapq\nclass Solution:\n    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:\n        return heapq.nsmallest(k, points, key=lambda p: p[0]**2 + p[1]**2)`,
            cpp: `#include <vector>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n        auto cmp = [](const vector<int>& a, const vector<int>& b) { return a[0]*a[0] + a[1]*a[1] < b[0]*b[0] + b[1]*b[1]; };\n        priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> pq(cmp);\n        for (const auto& p : points) {\n            pq.push(p);\n            if (pq.size() > k) pq.pop();\n        }\n        vector<vector<int>> res;\n        while (!pq.empty()) { res.push_back(pq.top()); pq.pop(); }\n        return res;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int[][] kClosest(int[][] points, int k) {\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1]));\n        for (int[] p : points) { pq.offer(p); if (pq.size() > k) pq.poll(); }\n        int[][] res = new int[k][2]; int i = 0;\n        while (!pq.isEmpty()) res[i++] = pq.poll();\n        return res;\n    }\n}`,
            c: `// C KClosest stub`,
          },
          testCases: [
            { input: '[[1, 3], [-2, 2]], 1', expectedOutput: '[[-2, 2]]' },
            { input: '[[3, 3], [5, -1], [-2, 4]], 2', expectedOutput: '[[3, 3], [-2, 4]]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What is the time complexity to insert into a binary heap backed Priority Queue?',
              options: ['O(log N)', 'O(1)', 'O(N)', 'O(N^2)'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'In a Min-Priority Queue, which element is at the root?',
              options: ['The element with the lowest numerical value / minimum priority key', 'The largest element', 'The last inserted element', 'A random element'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What unique capability distinguishes a Deque from a standard Queue?',
              options: ['Elements can be added or removed from BOTH front and rear ends in O(1) time', 'It can only hold strings', 'It uses no memory', 'It sorts elements automatically'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Find Median from Data Stream',
          description: 'The median is the middle value in an ordered integer list. Design a data structure that supports adding numbers and finding the current median in O(1) time using two heaps.',
          starterCode: {
            python: `import heapq\nclass MedianFinder:\n    def __init__(self):\n        self.small = [] # max-heap\n        self.large = [] # min-heap\n    def addNum(self, num: int) -> None:\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large): return float(-self.small[0])\n        return (-self.small[0] + self.large[0]) / 2.0`,
            cpp: `#include <queue>\nusing namespace std;\nclass MedianFinder {\n    priority_queue<int> small; // max-heap\n    priority_queue<int, vector<int>, greater<int>> large; // min-heap\npublic:\n    void addNum(int num) {\n        small.push(num); large.push(small.top()); small.pop();\n        if (large.size() > small.size()) { small.push(large.top()); large.pop(); }\n    }\n    double findMedian() {\n        if (small.size() > large.size()) return small.top();\n        return (small.top() + large.top()) / 2.0;\n    }\n};`,
            java: `import java.util.*;\nclass MedianFinder {\n    PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    PriorityQueue<Integer> large = new PriorityQueue<>();\n    public void addNum(int num) {\n        small.offer(num); large.offer(small.poll());\n        if (large.size() > small.size()) small.offer(large.poll());\n    }\n    public double findMedian() {\n        if (small.size() > large.size()) return small.peek();\n        return (small.peek() + large.peek()) / 2.0;\n    }\n}`,
            c: `// C median finder stub`,
          },
          testCases: [
            { input: '["addNum", 1], ["addNum", 2], ["findMedian"], ["addNum", 3], ["findMedian"]', expectedOutput: '[1.5, 2.0]' },
          ],
        },
      },
    },
    {
      id: 29,
      levelId: 3,
      orderIndex: 9,
      title: 'BOSS: Fortress Keeper',
      tier: 'ADVANCED',
      sublevelType: 'CODE_BASED',
      concepts: 'Comprehensive Unit 3 Master Challenge: monotonic structures, dual-pointer bounds, water volume integration',
      badge: {
        title: 'Fortress Keeper Vanquisher',
        description: 'Breached the Stacks & Queues Fortress by trapping rain water across jagged mountain heights.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#E040FB" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>',
        xpReward: 1000,
      },
      stages: {
        theory: {
          eli5: 'The Fortress Keeper casts torrential rain over jagged cliffs. To calculate how much rainwater gets trapped between pillars, use a Monotonic Stack or Dual Pointers to measure height boundaries in O(N) linear time.',
          keyTakeaways: [
            'Trapping Rain Water: Classic problem solved with Monotonic Decreasing Stack or Two Pointers.',
            'Water above bar i = min(max_left, max_right) - height[i].',
            'Two-pointer approach achieves optimal O(N) time and O(1) auxiliary space.',
          ],
          codeSnippet: `// Two-Pointer Rain Water Trapping\nint l = 0, r = n - 1, lMax = 0, rMax = 0, water = 0;\nwhile (l < r) {\n    if (h[l] < h[r]) {\n        if (h[l] >= lMax) lMax = h[l];\n        else water += lMax - h[l];\n        l++;\n    } else {\n        if (h[r] >= rMax) rMax = h[r];\n        else water += rMax - h[r];\n        r--;\n    }\n}`,
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1) auxiliary',
        },
        visualization: {
          initialArray: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
          steps: [
            { activeIndices: [0, 11], pointerLeft: 0, pointerRight: 11, action: 'Fortress Arena: Height bars initialized. Pointers at bounds l=0, r=11.', codeLine: 'int l = 0, r = n - 1;' },
            { activeIndices: [1, 3], pointerLeft: 1, pointerRight: 3, action: 'Left maximum height = 1. Elevation valley detected between index 1 and 3.', codeLine: 'water += lMax - h[i];' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 7, action: 'Bar 2 (height 0) trapped between heights 1 and 2: +1 unit of water stored!', codeLine: 'water += 1 - 0; // +1' },
            { activeIndices: [7], pointerLeft: 7, pointerRight: 7, action: 'Highest pillar 3 reached at index 7. Valley integration complete.', codeLine: '// Max ridge' },
            { activeIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], pointerLeft: 0, pointerRight: 11, action: 'Fortress Keeper Defeated! Total trapped water = 6 units calculated in O(N) time and O(1) space!', codeLine: 'return water;' },
          ],
        },
        dryRun: {
          code: `function trap(h) {\n  let l = 0, r = h.length - 1, lM = 0, rM = 0, ans = 0;\n  while (l < r) {\n    if (h[l] < h[r]) {\n      if (h[l] >= lM) lM = h[l]; else ans += lM - h[l];\n      l++;\n    } else {\n      if (h[r] >= rM) rM = h[r]; else ans += rM - h[r];\n      r--;\n    }\n  }\n  return ans;\n}`,
          traceRows: [
            { iteration: 1, l: 0, r: 5, hL: 0, hR: 1, action: 'h[l] < h[r] -> lM=0, l=1' },
            { iteration: 2, l: 1, r: 5, hL: 1, hR: 1, action: 'h[l] == h[r] -> rM=1, r=4' },
          ],
        },
        guidedCode: {
          prompt: 'Implement the optimal Two-Pointer Trapping Rain Water algorithm.',
          starterCode: {
            python: `def trap_water(height: list[int]) -> int:\n    l, r = 0, len(height) - 1\n    l_max = r_max = water = 0\n    while l < r:\n        if height[l] < height[r]:\n            # FILL_BLANK: update l_max or accumulate water\n            if height[l] >= l_max: l_max = height[l]\n            else: water += l_max - height[l]\n            l += 1\n        else:\n            if height[r] >= r_max: r_max = height[r]\n            else: water += r_max - height[r]\n            r -= 1\n    return water`,
            cpp: `#include <vector>\nusing namespace std;\nint trap(vector<int>& height) {\n    int l = 0, r = height.size() - 1, lMax = 0, rMax = 0, water = 0;\n    while (l < r) {\n        if (height[l] < height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else water += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else water += rMax - height[r];\n            r--;\n        }\n    }\n    return water;\n}`,
            java: `class Solution {\n    public int trap(int[] height) {\n        int l = 0, r = height.length - 1, lMax = 0, rMax = 0, water = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= lMax) lMax = height[l];\n                else water += lMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rMax) rMax = height[r];\n                else water += rMax - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n}`,
            c: `int trap(int* height, int heightSize) {\n    int l = 0, r = heightSize - 1, lMax = 0, rMax = 0, water = 0;\n    while (l < r) {\n        if (height[l] < height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else water += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else water += rMax - height[r];\n            r--;\n        }\n    }\n    return water;\n}`,
          },
        },
        easyProblem: {
          title: 'Easy: Container With Most Water (Two Pointers)',
          description: 'You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water.',
          starterCode: {
            python: `class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        max_a = 0\n        while l < r:\n            max_a = max(max_a, min(height[l], height[r]) * (r - l))\n            if height[l] < height[r]: l += 1\n            else: r -= 1\n        return max_a`,
            cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1, maxA = 0;\n        while (l < r) {\n            maxA = max(maxA, min(height[l], height[r]) * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxA;\n    }\n};`,
            java: `class Solution {\n    public int maxArea(int[] height) {\n        int l = 0, r = height.length - 1, maxA = 0;\n        while (l < r) {\n            maxA = Math.max(maxA, Math.min(height[l], height[r]) * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxA;\n    }\n}`,
            c: `int maxArea(int* height, int heightSize) {\n    int l = 0, r = heightSize - 1, maxA = 0;\n    while (l < r) {\n        int h = height[l] < height[r] ? height[l] : height[r];\n        int area = h * (r - l);\n        if (area > maxA) maxA = area;\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return maxA;\n}`,
          },
          testCases: [
            { input: '[1, 8, 6, 2, 5, 4, 8, 3, 7]', expectedOutput: '49' },
            { input: '[1, 1]', expectedOutput: '1' },
          ],
        },
        mediumProblem: {
          title: 'Medium: Asteroid Collision using Stack',
          description: 'We are given an array asteroids of integers representing asteroids in a row. Find out the state of the asteroids after all collisions.',
          starterCode: {
            python: `class Solution:\n    def asteroidCollision(self, asteroids: list[int]) -> list[int]:\n        st = []\n        for a in asteroids:\n            while st and a < 0 < st[-1]:\n                if st[-1] < -a: st.pop(); continue\n                elif st[-1] == -a: st.pop()\n                break\n            else: st.append(a)\n        return st`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> asteroidCollision(vector<int>& asteroids) {\n        vector<int> st;\n        for (int a : asteroids) {\n            bool destroyed = false;\n            while (!st.empty() && a < 0 && st.back() > 0) {\n                if (st.back() < -a) { st.pop_back(); continue; }\n                else if (st.back() == -a) st.pop_back();\n                destroyed = true; break;\n            }\n            if (!destroyed) st.push_back(a);\n        }\n        return st;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int[] asteroidCollision(int[] asteroids) {\n        Stack<Integer> st = new Stack<>();\n        for (int a : asteroids) {\n            boolean destroyed = false;\n            while (!st.isEmpty() && a < 0 && st.peek() > 0) {\n                if (st.peek() < -a) { st.pop(); continue; }\n                else if (st.peek() == -a) st.pop();\n                destroyed = true; break;\n            }\n            if (!destroyed) st.push(a);\n        }\n        int[] res = new int[st.size()]; for (int i = res.length - 1; i >= 0; i--) res[i] = st.pop();\n        return res;\n    }\n}`,
            c: `// C asteroid stub`,
          },
          testCases: [
            { input: '[5, 10, -5]', expectedOutput: '[5, 10]' },
            { input: '[8, -8]', expectedOutput: '[]' },
            { input: '[10, 2, -5]', expectedOutput: '[10]' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'In Trapping Rain Water, what determines the maximum height of trapped water above position i?',
              options: ['min(max_height_to_left, max_height_to_right)', 'max(max_height_to_left, max_height_to_right)', 'height[i] * 2', 'The total array length'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the optimal auxiliary space complexity to solve Trapping Rain Water using two pointers?',
              options: ['O(1)', 'O(N)', 'O(N^2)', 'O(log N)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Upon breaching the Fortress Keeper, which realm unseals next?',
              options: ['Level 4: Linked Structures Labyrinth (Stone Ruins)', 'Level 1: Beginner Village', 'Level 2: Sorting Citadel', 'Game Over'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Full Trapping Rain Water',
          description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
          starterCode: {
            python: `class Solution:\n    def trap(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        l_max = r_max = water = 0\n        while l < r:\n            if height[l] < height[r]:\n                if height[l] >= l_max: l_max = height[l]\n                else: water += l_max - height[l]\n                l += 1\n            else:\n                if height[r] >= r_max: r_max = height[r]\n                else: water += r_max - height[r]\n                r -= 1\n        return water`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        int l = 0, r = height.size() - 1, lMax = 0, rMax = 0, water = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= lMax) lMax = height[l];\n                else water += lMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rMax) rMax = height[r];\n                else water += rMax - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n};`,
            java: `class Solution {\n    public int trap(int[] height) {\n        int l = 0, r = height.length - 1, lMax = 0, rMax = 0, water = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= lMax) lMax = height[l];\n                else water += lMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rMax) rMax = height[r];\n                else water += rMax - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n}`,
            c: `int trap(int* height, int heightSize) {\n    int l = 0, r = heightSize - 1, lMax = 0, rMax = 0, water = 0;\n    while (l < r) {\n        if (height[l] < height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else water += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else water += rMax - height[r];\n            r--;\n        }\n    }\n    return water;\n}`,
          },
          testCases: [
            { input: '[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]', expectedOutput: '6' },
            { input: '[4, 2, 0, 3, 2, 5]', expectedOutput: '9' },
          ],
        },
      },
    },
  ],
};
