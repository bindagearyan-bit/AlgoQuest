import { LevelDefinition } from './curriculumTypes';

export const LEVEL_1_DATA: LevelDefinition = {
  id: 1,
  orderIndex: 1,
  title: 'Level 1: Foundations Island (Beginner Village) — Basics of Data Structures',
  icon: '🏡',
  description: 'Unit 1: Data structure fundamentals, ADTs, linear vs non-linear classifications, Big-O asymptotic analysis.',
  sublevels: [
    {
      id: 1,
      levelId: 1,
      orderIndex: 1,
      title: 'Concept & Need of Data Structures',
      tier: 'BEGINNER',
      sublevelType: 'THEORETICAL',
      concepts: 'What is a DS, why we need it, real-world analogies, memory efficiency',
      badge: {
        title: 'Foundations Initiate',
        description: 'Mastered the conceptual essence and real-world necessity of data organization.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD700" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Think of data structures like kitchen organizers. Without cutlery trays and spice racks, finding ingredients takes forever. A Data Structure organizes data in RAM so software runs at warp speed.',
          keyTakeaways: [
            'A Data Structure is a specialized format for organizing, processing, retrieving, and storing data.',
            'Reduces computational complexity from brute-force O(N) or O(N^2) down to O(1) or O(log N).',
            'Ensures memory safety, cache locality, and predictable resource usage.',
          ],
          codeSnippet: `// Concept: Raw unstructured data vs structured record\nstruct InventoryItem {\n    int id;\n    char name[32];\n    int quantity;\n}; // Structured representation in memory`,
          timeComplexity: 'O(1) to O(N) access',
          spaceComplexity: 'O(N) total memory',
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Why do we need data structures in modern computing?',
              options: ['To manage memory and enable rapid data retrieval', 'To increase CPU temperature', 'To eliminate the need for memory entirely', 'To make files permanently larger'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Which real-world analogy best represents a LIFO (Last-In-First-Out) structure?',
              options: ['A stack of dinner plates', 'A cafeteria checkout queue', 'A dictionary index', 'A highway toll booth'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What is the primary difference between data types and data structures?',
              options: [
                'Data types define values and basic operations; data structures organize multiple data items and relationships',
                'Data types are only used in hardware; data structures are only in browsers',
                'They are identical synonyms',
                'Data structures can only store text',
              ],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Mini-Boss: Memory Architecture Verification',
          description: 'Evaluate the theoretical efficiency of linear vs non-linear data structures for high-frequency trading where lookups must happen in sub-microsecond time.',
          starterCode: {
            python: `def solve_architecture_choice(requirements: list[str]) -> str:\n    # Return 'ARRAY' or 'LINKED_LIST' or 'HASH_MAP'\n    return 'HASH_MAP'`,
            cpp: `#include <string>\n#include <vector>\nusing namespace std;\nstring solveArchitectureChoice(const vector<string>& requirements) {\n    return "HASH_MAP";\n}`,
            java: `import java.util.*;\npublic class Solution {\n    public String solveArchitectureChoice(List<String> requirements) {\n        return "HASH_MAP";\n    }\n}`,
            c: `#include <string.h>\nconst char* solveArchitectureChoice(int reqCount) {\n    return "HASH_MAP";\n}`,
          },
          testCases: [
            { input: '["O(1) lookup", "Fixed keys"]', expectedOutput: 'HASH_MAP' },
            { input: '["Sequential scan", "Contiguous RAM"]', expectedOutput: 'ARRAY' },
          ],
        },
      },
    },
    {
      id: 2,
      levelId: 1,
      orderIndex: 2,
      title: 'Abstract Data Types (ADTs)',
      tier: 'BEGINNER',
      sublevelType: 'THEORETICAL',
      concepts: 'ADT definition, interface vs implementation, encapsulation',
      badge: {
        title: 'Interface Architect',
        description: 'Distinguished the clean boundary between abstract specifications and underlying implementations.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#7FFFD4" d="M4 4h16v4H4zm0 6h16v4H4zm0 6h16v4H4z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'An ADT is like a car steering wheel and gas pedal. You know WHAT they do (steer, accelerate) without having to know HOW the fuel injection and pistons work inside the engine.',
          keyTakeaways: [
            'An ADT defines mathematical behaviors and operations without prescribing implementation details.',
            'Examples: List ADT, Stack ADT, Queue ADT, Map ADT.',
            'Encapsulation allows swapping array-based engines with linked-list engines seamlessly.',
          ],
          codeSnippet: `// Interface (ADT Contract)\ninterface StackADT<T> {\n    void push(T item);\n    T pop();\n    T peek();\n    boolean isEmpty();\n}`,
          timeComplexity: 'Implementation dependent',
          spaceComplexity: 'Implementation dependent',
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What does ADT stand for?',
              options: ['Abstract Data Type', 'Array Dynamic Table', 'Algorithmic Data Transformation', 'Automated Direct Trace'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the key principle enforced by an ADT?',
              options: ['Separation of interface from implementation', 'Mandatory use of recursion', 'Fixed-size memory allocation', 'Execution in constant time always'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Which of the following can be used to implement the List ADT?',
              options: ['Both Arrays and Linked Lists', 'Only single global variables', 'Only SSD disk blocks', 'Only hardware registers'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Mini-Boss: ADT Contract Validator',
          description: 'Validate whether an implementation strictly adheres to the Stack ADT contract (LIFO invariant).',
          starterCode: {
            python: `def validate_stack_contract(ops: list[str], vals: list[int]) -> bool:\n    # Verify LIFO ordering\n    return True`,
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\nbool validateStackContract(const vector<string>& ops, const vector<int>& vals) {\n    return true;\n}`,
            java: `import java.util.*;\npublic class Solution {\n    public boolean validateStackContract(List<String> ops, List<Integer> vals) {\n        return true;\n    }\n}`,
            c: `int validateStackContract(int n) {\n    return 1;\n}`,
          },
          testCases: [
            { input: '["push", "push", "pop"], [1, 2, 2]', expectedOutput: 'true' },
            { input: '["push", "push", "pop"], [1, 2, 1]', expectedOutput: 'false' },
          ],
        },
      },
    },
    {
      id: 3,
      levelId: 1,
      orderIndex: 3,
      title: 'Types of Data Structures',
      tier: 'BEGINNER',
      sublevelType: 'THEORETICAL',
      concepts: 'Linear vs Non-Linear, Primitive vs Non-Primitive',
      badge: {
        title: 'Taxonomy Scholar',
        description: 'Classified every algorithmic species from primitive integers to hierarchical multi-graphs.',
        iconSvg: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#8B7FD9"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Linear structures are like beads on a single string (Arrays, Linked Lists). Non-linear structures branch out like trees in a forest or road networks in a city (Trees, Graphs).',
          keyTakeaways: [
            'Primitive: int, float, char, boolean, pointers.',
            'Non-Primitive Linear: Arrays, Linked Lists, Stacks, Queues (elements sequentially adjacent).',
            'Non-Primitive Non-Linear: Trees, Graphs, Heaps, Hash Tables (hierarchical or interconnected).',
          ],
          codeSnippet: `// Linear: elements accessed sequentially\nint arr[5] = {10, 20, 30, 40, 50};\n\n// Non-Linear: hierarchical parent-child pointers\nstruct TreeNode {\n    int val;\n    struct TreeNode* left;\n    struct TreeNode* right;\n};`,
          timeComplexity: 'Linear O(N) vs Branching O(log N)',
          spaceComplexity: 'Contiguous vs Pointer overhead',
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Which of the following is a non-linear data structure?',
              options: ['Binary Tree', 'Singly Linked List', 'Array', 'Queue'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Which characteristic defines a linear data structure?',
              options: ['Each element has a unique predecessor and successor (except ends)', 'Elements can have multiple parents', 'Elements form a closed cycle always', 'Data is stored on hard drive only'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Which is a primitive data type?',
              options: ['int', 'Stack', 'Graph', 'Doubly Linked List'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Mini-Boss: Taxonomy Classifier',
          description: 'Classify data structure names into LINEAR or NON_LINEAR categories.',
          starterCode: {
            python: `def classify_structure(ds_name: str) -> str:\n    linear = {'array', 'stack', 'queue', 'linked_list'}\n    return 'LINEAR' if ds_name.lower() in linear else 'NON_LINEAR'`,
            cpp: `#include <string>\nusing namespace std;\nstring classifyStructure(string name) {\n    if (name == "tree" || name == "graph") return "NON_LINEAR";\n    return "LINEAR";\n}`,
            java: `public class Solution {\n    public String classifyStructure(String name) {\n        return (name.equals("tree") || name.equals("graph")) ? "NON_LINEAR" : "LINEAR";\n    }\n}`,
            c: `#include <string.h>\nconst char* classifyStructure(const char* name) {\n    if (strcmp(name, "tree") == 0) return "NON_LINEAR";\n    return "LINEAR";\n}`,
          },
          testCases: [
            { input: '"stack"', expectedOutput: 'LINEAR' },
            { input: '"tree"', expectedOutput: 'NON_LINEAR' },
            { input: '"graph"', expectedOutput: 'NON_LINEAR' },
          ],
        },
      },
    },
    {
      id: 4,
      levelId: 1,
      orderIndex: 4,
      title: 'Operations on Data Structures',
      tier: 'BEGINNER',
      sublevelType: 'HYBRID',
      concepts: 'Insert, Delete, Search, Update, Traverse, Sort',
      badge: {
        title: 'Operation Artisan',
        description: 'Harnessed the universal CRUD operations governing all in-memory datasets.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FF6FA0" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Every data structure in existence supports 6 fundamental spells: Insert, Delete, Search, Update, Traverse, and Sort. The difference between structures is how fast each spell casts!',
          keyTakeaways: [
            'Insertion: Adding a new item at head, tail, or arbitrary index.',
            'Deletion: Removing an item and reclaiming space or shifting neighbours.',
            'Traversal: Visiting every element exactly once (e.g. for printing or summing).',
            'Search & Update: Locating an element by key and modifying its payload.',
          ],
          codeSnippet: `// Array Traversal & Update\nfor (int i = 0; i < n; i++) {\n    if (arr[i] == target) {\n        arr[i] = newValue; // Update\n        break;\n    }\n}`,
          timeComplexity: 'O(1) to O(N)',
          spaceComplexity: 'O(1) auxiliary',
        },
        visualization: {
          initialArray: [14, 28, 42, 56, 70, 84],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 5, action: 'Step 1: Begin Traversal at index 0. Current value: 14.', codeLine: 'for (int i = 0; i < n; i++)' },
            { activeIndices: [1], pointerLeft: 1, pointerRight: 5, action: 'Step 2: Advance to index 1. Current value: 28.', codeLine: 'i = 1;' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 5, action: 'Step 3: Found search target 42 at index 2! Initiating Update to 99.', codeLine: 'if (arr[i] == target) arr[i] = 99;' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 5, action: 'Step 4: Update committed: arr[2] is now 99.', codeLine: 'arr[2] = 99;' },
            { activeIndices: [3, 4, 5], pointerLeft: 3, pointerRight: 5, action: 'Step 5: Resume Traversal through remaining elements [56, 70, 84].', codeLine: '// Traversal complete' },
            { activeIndices: [0, 1, 2, 3, 4, 5], pointerLeft: 0, pointerRight: 5, action: 'Step 6: Operation cycle finished successfully.', codeLine: 'return true;' },
          ],
        },
        dryRun: {
          code: `function traverseAndUpdate(arr, target, newVal) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      arr[i] = newVal;\n      return i;\n    }\n  }\n  return -1;\n}`,
          traceRows: [
            { iteration: 1, i: 0, arrI: 14, target: 42, action: '14 != 42 -> continue' },
            { iteration: 2, i: 1, arrI: 28, target: 42, action: '28 != 42 -> continue' },
            { iteration: 3, i: 2, arrI: 42, target: 42, action: 'MATCH! arr[2]=99 -> return 2' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What is the time complexity of deleting an element at index 0 in a standard array of size N?',
              options: ['O(N) because all remaining elements shift left', 'O(1) instant', 'O(log N)', 'O(N^2)'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Which operation visits every element in a data structure exactly once?',
              options: ['Traversal', 'Sorting', 'Linear Search', 'Binary Partition'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'What happens when inserting into a fixed-size array that is already full?',
              options: ['Array Overflow condition', 'Automatic infinite expansion', 'Index resets to zero silently', 'Element vanishes'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss: Array CRUD Dispatcher',
          description: 'Implement an in-place array updater that deletes the first instance of target and shifts remaining elements left.',
          starterCode: {
            python: `class Solution:\n    def delete_and_shift(self, nums: list[int], val: int) -> int:\n        if val not in nums: return len(nums)\n        idx = nums.index(val)\n        for i in range(idx, len(nums) - 1):\n            nums[i] = nums[i+1]\n        nums.pop()\n        return len(nums)`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int deleteAndShift(vector<int>& nums, int val) {\n        int k = 0;\n        for (int x : nums) if (x != val) nums[k++] = x;\n        return k;\n    }\n};`,
            java: `class Solution {\n    public int deleteAndShift(int[] nums, int val) {\n        int k = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] != val) nums[k++] = nums[i];\n        }\n        return k;\n    }\n}`,
            c: `int deleteAndShift(int* nums, int numsSize, int val) {\n    int k = 0;\n    for (int i = 0; i < numsSize; i++) {\n        if (nums[i] != val) nums[k++] = nums[i];\n    }\n    return k;\n}`,
          },
          testCases: [
            { input: '[3, 2, 2, 3], 3', expectedOutput: '2' },
            { input: '[0, 1, 2, 2, 3, 0, 4, 2], 2', expectedOutput: '5' },
          ],
        },
      },
    },
    {
      id: 5,
      levelId: 1,
      orderIndex: 5,
      title: 'Time Complexity & Big-O Notation',
      tier: 'INTERMEDIATE',
      sublevelType: 'HYBRID',
      concepts: 'Big-O, Big-Omega, Big-Theta, growth rates, worst-case bounds',
      badge: {
        title: 'Asymptotic Master',
        description: 'Calculated mathematical bounds on algorithmic runtime across all orders of growth.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD93D" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Big-O is like planning a journey. O(1) is teleporting instantly. O(N) is walking one step per mile. O(N^2) is shaking hands with every single person in a stadium before leaving.',
          keyTakeaways: [
            'Big-O (O): Upper bound (worst-case runtime guarantee).',
            'Big-Omega (Ω): Lower bound (best-case scenario).',
            'Big-Theta (Θ): Tight bound (best and worst cases scale at identical rate).',
            'Hierarchy: O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!).',
          ],
          codeSnippet: `// O(N^2) nested loop vs O(N) single loop\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        // Executes n * n times = O(N^2)\n    }\n}`,
          timeComplexity: 'Mathematical order of growth',
          spaceComplexity: 'Auxiliary memory bounds',
        },
        visualization: {
          initialArray: [1, 2, 4, 8, 16, 32, 64, 128],
          steps: [
            { activeIndices: [0], pointerLeft: 0, pointerRight: 7, action: 'O(1) Step: Instant array index lookup arr[0]. 1 operation.', codeLine: 'val = arr[0]; // O(1)' },
            { activeIndices: [0, 1, 2, 3], pointerLeft: 0, pointerRight: 3, action: 'O(log N) Step: Binary halving reduces 8 elements down to 4 in 1 step.', codeLine: 'high = mid - 1; // O(log N)' },
            { activeIndices: [0, 1, 2, 3, 4, 5, 6, 7], pointerLeft: 0, pointerRight: 7, action: 'O(N) Step: Linear scan visits all 8 items sequentially.', codeLine: 'for (int i = 0; i < N; i++) // O(N)' },
            { activeIndices: [0, 7], pointerLeft: 0, pointerRight: 7, action: 'O(N^2) Step: Comparing all pairs requires 8 x 8 = 64 operations.', codeLine: 'for (i..) for (j..) // O(N^2)' },
            { activeIndices: [3, 4], pointerLeft: 3, pointerRight: 4, action: 'Evaluation complete: Asymptotic growth curve validated.', codeLine: '// Bounds verified' },
          ],
        },
        dryRun: {
          code: `function computeGrowth(n) {\n  let count = 0;\n  for (let i = 1; i <= n; i *= 2) {\n    count++;\n  }\n  return count;\n}`,
          traceRows: [
            { iteration: 1, i: 1, n: 16, count: 1, action: 'i doubled to 2' },
            { iteration: 2, i: 2, n: 16, count: 2, action: 'i doubled to 4' },
            { iteration: 3, i: 4, n: 16, count: 3, action: 'i doubled to 8' },
            { iteration: 4, i: 8, n: 16, count: 4, action: 'i doubled to 16' },
            { iteration: 5, i: 16, n: 16, count: 5, action: 'i doubled to 32 (>16) -> loop stops. O(log N)!' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What is the time complexity of a loop that halves N in each step (while n > 0: n = n // 2)?',
              options: ['O(log N)', 'O(N)', 'O(1)', 'O(N^2)'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'Which notation represents the tight asymptotic bound?',
              options: ['Big-Theta (Θ)', 'Big-O (O)', 'Big-Omega (Ω)', 'Little-o (o)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'If algorithm A is O(N log N) and algorithm B is O(N^2), which is faster for large N?',
              options: ['Algorithm A', 'Algorithm B', 'They are identical', 'Depends on font size'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss: Asymptotic Comparator',
          description: 'Given code structure descriptors, compute the worst-case time complexity polynomial.',
          starterCode: {
            python: `class Solution:\n    def classify_complexity(self, loop_type: str, nested_depth: int) -> str:\n        if loop_type == "halving": return "O(log N)"\n        if nested_depth == 1: return "O(N)"\n        if nested_depth == 2: return "O(N^2)"\n        return "O(1)"`,
            cpp: `#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    string classifyComplexity(string loopType, int depth) {\n        if (loopType == "halving") return "O(log N)";\n        if (depth == 1) return "O(N)";\n        if (depth == 2) return "O(N^2)";\n        return "O(1)";\n    }\n};`,
            java: `class Solution {\n    public String classifyComplexity(String loopType, int depth) {\n        if (loopType.equals("halving")) return "O(log N)";\n        if (depth == 1) return "O(N)";\n        if (depth == 2) return "O(N^2)";\n        return "O(1)";\n    }\n}`,
            c: `#include <string.h>\nconst char* classifyComplexity(const char* loopType, int depth) {\n    if (strcmp(loopType, "halving") == 0) return "O(log N)";\n    if (depth == 1) return "O(N)";\n    if (depth == 2) return "O(N^2)";\n    return "O(1)";\n}`,
          },
          testCases: [
            { input: '"linear", 1', expectedOutput: 'O(N)' },
            { input: '"halving", 1', expectedOutput: 'O(log N)' },
            { input: '"linear", 2', expectedOutput: 'O(N^2)' },
          ],
        },
      },
    },
    {
      id: 6,
      levelId: 1,
      orderIndex: 6,
      title: 'Space Complexity Analysis',
      tier: 'INTERMEDIATE',
      sublevelType: 'HYBRID',
      concepts: 'Auxiliary space vs input space, call stack overhead, memory leaks',
      badge: {
        title: 'Memory Guardian',
        description: 'Calculated exact memory footprint, preventing heap overflow and recursion stack exhaustion.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#00F0FF" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm4-4H6v-2h10v2zm0-4H6V7h10v2z"/></svg>',
        xpReward: 500,
      },
      stages: {
        theory: {
          eli5: 'Space complexity measures extra memory your program borrows while working. An algorithm modifying an array in-place uses O(1) auxiliary space, while allocating a duplicate array takes O(N) space.',
          keyTakeaways: [
            'Total Space = Input Space + Auxiliary Space (working memory).',
            'Recursion call stack contributes O(D) auxiliary space where D is recursion depth.',
            'In-place algorithms achieve O(1) auxiliary space by reusing input buffers.',
          ],
          codeSnippet: `// O(1) auxiliary space (in-place swap)\nvoid reverse(int* arr, int n) {\n    int l = 0, r = n - 1;\n    while (l < r) {\n        int temp = arr[l]; arr[l++] = arr[r]; arr[r--] = temp;\n    }\n}`,
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1) in-place',
        },
        visualization: {
          initialArray: [10, 20, 30, 40, 50],
          steps: [
            { activeIndices: [0, 4], pointerLeft: 0, pointerRight: 4, action: 'In-place reversal: Left=0, Right=4. Single integer temp variable allocated in RAM (O(1)).', codeLine: 'int temp = arr[l];' },
            { activeIndices: [0, 4], pointerLeft: 0, pointerRight: 4, action: 'Swap arr[0]=10 and arr[4]=50 without allocating a new array.', codeLine: 'arr[l] = arr[r]; arr[r] = temp;' },
            { activeIndices: [1, 3], pointerLeft: 1, pointerRight: 3, action: 'Move pointers inward to index 1 and 3. Memory usage remains constant O(1).', codeLine: 'l++; r--;' },
            { activeIndices: [1, 3], pointerLeft: 1, pointerRight: 3, action: 'Swap arr[1]=20 and arr[3]=40.', codeLine: 'swap(arr[1], arr[3]);' },
            { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: 'Pointers meet at index 2. Array reversed in-place with zero auxiliary heap allocations!', codeLine: '// Done: O(1) space' },
          ],
        },
        dryRun: {
          code: `function fibRecursion(n) {\n  if (n <= 1) return n;\n  return fibRecursion(n - 1) + fibRecursion(n - 2);\n}`,
          traceRows: [
            { iteration: 1, call: 'fib(4)', stackDepth: 1, action: 'Calls fib(3)' },
            { iteration: 2, call: 'fib(3)', stackDepth: 2, action: 'Calls fib(2)' },
            { iteration: 3, call: 'fib(2)', stackDepth: 3, action: 'Calls fib(1)' },
            { iteration: 4, call: 'fib(1)', stackDepth: 4, action: 'Returns 1. Max stack depth = 4 = O(N) auxiliary space!' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'What is auxiliary space?',
              options: ['Extra space or temporary memory used by the algorithm excluding input size', 'The total size of the hard drive', 'The space taken by the compiler', 'The memory used by the operating system kernel'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'A recursive algorithm has a call tree of depth N. What is its auxiliary space complexity on the call stack?',
              options: ['O(N)', 'O(1)', 'O(N^2)', 'O(log N)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Which of the following sorts is strictly in-place with O(1) auxiliary space?',
              options: ['Heap Sort', 'Standard Merge Sort (array)', 'External Sort', 'Out-of-place Counting Sort'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss: In-Place Memory Optimizer',
          description: 'Reverse an array strictly in-place with O(1) auxiliary space.',
          starterCode: {
            python: `class Solution:\n    def reverse_in_place(self, nums: list[int]) -> list[int]:\n        l, r = 0, len(nums) - 1\n        while l < r:\n            nums[l], nums[r] = nums[r], nums[l]\n            l += 1\n            r -= 1\n        return nums`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> reverseInPlace(vector<int>& nums) {\n        int l = 0, r = nums.size() - 1;\n        while (l < r) swap(nums[l++], nums[r--]);\n        return nums;\n    }\n};`,
            java: `class Solution {\n    public int[] reverseInPlace(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int t = nums[l]; nums[l] = nums[r]; nums[r] = t;\n            l++; r--;\n        }\n        return nums;\n    }\n}`,
            c: `int* reverseInPlace(int* nums, int numsSize) {\n    int l = 0, r = numsSize - 1;\n    while (l < r) {\n        int t = nums[l]; nums[l] = nums[r]; nums[r] = t;\n        l++; r--;\n    }\n    return nums;\n}`,
          },
          testCases: [
            { input: '[1, 2, 3, 4, 5]', expectedOutput: '[5, 4, 3, 2, 1]' },
            { input: '[10, 20]', expectedOutput: '[20, 10]' },
          ],
        },
      },
    },
    {
      id: 7,
      levelId: 1,
      orderIndex: 7,
      title: 'BOSS: Foundations Guardian',
      tier: 'ADVANCED',
      sublevelType: 'HYBRID',
      concepts: 'Comprehensive Unit 1 Master Challenge: asymptotic bounds, ADT invariants, in-place data transformations',
      badge: {
        title: 'Foundations Guardian Slayer',
        description: 'Conquered the Unit 1 final boss trial, proving supreme mastery over computational foundations.',
        iconSvg: '<svg viewBox="0 0 24 24"><path fill="#E040FB" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>',
        xpReward: 1000,
      },
      stages: {
        theory: {
          eli5: 'The Foundations Guardian tests your ability to synthesize Big-O analysis, in-place memory management, and ADT contracts into a unified optimal solution.',
          keyTakeaways: [
            'Combines asymptotic efficiency with strict O(1) auxiliary space constraints.',
            'Validates both worst-case and average-case performance.',
            'The rite of passage before unsealing the Searching & Sorting Citadel.',
          ],
          codeSnippet: `// Unit 1 Capstone: Two-pointer in-place deduplication\nint removeDuplicates(int* nums, int n) {\n    if (n == 0) return 0;\n    int k = 1;\n    for (int i = 1; i < n; i++) {\n        if (nums[i] != nums[i - 1]) nums[k++] = nums[i];\n    }\n    return k;\n}`,
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1)',
        },
        visualization: {
          initialArray: [1, 1, 2, 2, 3, 4, 4, 5],
          steps: [
            { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Boss Arena Stage 1: Inspect first duplicate pair [1, 1]. Slow pointer k=1.', codeLine: 'if (nums[i] != nums[i-1])' },
            { activeIndices: [1, 2], pointerLeft: 1, pointerRight: 2, action: 'Found unique element 2! Copying to nums[1]. k advances to 2.', codeLine: 'nums[k++] = nums[i];' },
            { activeIndices: [3, 4], pointerLeft: 2, pointerRight: 4, action: 'Found unique element 3! Copying to nums[2]. k advances to 3.', codeLine: 'nums[k++] = nums[i];' },
            { activeIndices: [5, 6], pointerLeft: 3, pointerRight: 6, action: 'Found unique element 4! Copying to nums[3]. k advances to 4.', codeLine: 'nums[k++] = nums[i];' },
            { activeIndices: [6, 7], pointerLeft: 4, pointerRight: 7, action: 'Found unique element 5! Copying to nums[4]. k advances to 5.', codeLine: 'nums[k++] = nums[i];' },
            { activeIndices: [0, 1, 2, 3, 4], pointerLeft: 0, pointerRight: 4, action: 'Guardian Defeated! Deduplicated array [1, 2, 3, 4, 5] produced in O(N) time and O(1) space.', codeLine: 'return k;' },
          ],
        },
        dryRun: {
          code: `function removeDups(arr) {\n  let k = 1;\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] !== arr[i-1]) arr[k++] = arr[i];\n  }\n  return k;\n}`,
          traceRows: [
            { iteration: 1, i: 1, arrI: 1, prev: 1, k: 1, action: 'duplicate -> skip' },
            { iteration: 2, i: 2, arrI: 2, prev: 1, k: 2, action: 'unique -> arr[1]=2, k=2' },
            { iteration: 3, i: 3, arrI: 2, prev: 2, k: 2, action: 'duplicate -> skip' },
            { iteration: 4, i: 4, arrI: 3, prev: 2, k: 3, action: 'unique -> arr[2]=3, k=3' },
          ],
        },
        quiz: {
          questions: [
            {
              id: 1,
              question: 'Which invariant makes the two-pointer deduplication run in O(N) time?',
              options: ['The array is sorted, so duplicates are contiguous', 'Randomized hashing is utilized', 'Elements are negative only', 'It uses recursion'],
              correctAnswer: 0,
            },
            {
              id: 2,
              question: 'What is the auxiliary space complexity of two-pointer deduplication?',
              options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
              correctAnswer: 0,
            },
            {
              id: 3,
              question: 'Upon defeating the Foundations Guardian, what Citadel is unlocked next?',
              options: ['Level 2: Searching & Sorting Citadel', 'Level 6: Graph Glacier', 'The End Credits', 'Level 5: Inferno Keep'],
              correctAnswer: 0,
            },
          ],
        },
        boss: {
          title: 'Boss Battle: Foundations Guardian Gauntlet',
          description: 'Defeat the Guardian by removing duplicates from a sorted array in-place, returning the count of unique elements.',
          starterCode: {
            python: `class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        if not nums: return 0\n        k = 1\n        for i in range(1, len(nums)):\n            if nums[i] != nums[i - 1]:\n                nums[k] = nums[i]\n                k += 1\n        return k`,
            cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        int k = 1;\n        for (int i = 1; i < nums.size(); i++) {\n            if (nums[i] != nums[i - 1]) nums[k++] = nums[i];\n        }\n        return k;\n    }\n};`,
            java: `class Solution {\n    public int removeDuplicates(int[] nums) {\n        if (nums.length == 0) return 0;\n        int k = 1;\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] != nums[i - 1]) nums[k++] = nums[i];\n        }\n        return k;\n    }\n}`,
            c: `int removeDuplicates(int* nums, int numsSize) {\n    if (numsSize == 0) return 0;\n    int k = 1;\n    for (int i = 1; i < numsSize; i++) {\n        if (nums[i] != nums[i - 1]) nums[k++] = nums[i];\n    }\n    return k;\n}`,
          },
          testCases: [
            { input: '[1, 1, 2]', expectedOutput: '2' },
            { input: '[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]', expectedOutput: '5' },
            { input: '[1, 2, 3]', expectedOutput: '3' },
          ],
        },
      },
    },
  ],
};

