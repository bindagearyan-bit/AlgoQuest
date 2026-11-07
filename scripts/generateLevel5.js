const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'backend', 'src', 'data');

const LEVEL_5_SUBLEVELS = [
  {
    id: 41,
    levelId: 5,
    orderIndex: 1,
    title: 'Tree Terminologies & Traversals Concept',
    tier: 'BEGINNER',
    sublevelType: 'THEORETICAL',
    concepts: 'Root, parent, child, leaf, height, depth, subtree, degree',
    badge: {
      title: 'Canopy Novice',
      description: 'Discovered the hierarchical branches of tree structures rooted in algorithms.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#4CAF50" d="M12 2L4 12h4v8h8v-8h4L12 2z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'Unlike arrays and linked lists which are a straight line, a Tree is a family tree! The root is the oldest ancestor, branches go down to children, and leaves are the descendants with no children of their own.',
        keyTakeaways: [
          'Root: The topmost unique node with in-degree 0.',
          'Leaf: A terminal node with no children (out-degree 0).',
          'Height: Length of longest path from a node down to a leaf (tree height = root height).',
          'Depth: Length of path from root down to that specific node.',
        ],
        codeSnippet: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n};`,
        timeComplexity: 'O(N) traversal / O(log N) balanced height',
        spaceComplexity: 'O(H) recursion stack where H is height',
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What is a leaf node in a tree data structure?',
            options: ['A node with no children (degree 0)', 'The topmost node of the tree', 'A node with exactly two children', 'The node containing the largest integer'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What is the relationship between the depth of a node and the height of a tree?',
            options: ['Depth is distance from root down to node; height is longest path from node to a leaf', 'They are always mathematically identical for every node', 'Depth is number of children; height is number of parents', 'Height only applies to binary search trees'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'In a tree with N total nodes, how many total edges (directed branches) exist?',
            options: ['N - 1', 'N', '2N', 'N / 2'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Mini-Boss: Maximum Depth of Binary Tree',
        description: 'Given the root of a binary tree (represented as level-order array), return its maximum depth.',
        starterCode: {
          python: `def max_depth(nodes: list[int]) -> int:\n    if not nodes: return 0\n    import math\n    return math.floor(math.log2(len(nodes))) + 1`,
          cpp: `#include <vector>\n#include <cmath>\nusing namespace std;\nint maxDepth(const vector<int>& nodes) {\n    if (nodes.empty()) return 0;\n    return floor(log2(nodes.size())) + 1;\n}`,
          java: `public class Solution {\n    public int maxDepth(int[] nodes) {\n        if (nodes.length == 0) return 0;\n        return (int)(Math.floor(Math.log(nodes.length) / Math.log(2))) + 1;\n    }\n}`,
          c: `// C max depth stub`,
        },
        testCases: [
          { input: '[3, 9, 20, 15, 7]', expectedOutput: '3' },
          { input: '[1]', expectedOutput: '1' },
        ],
      },
    },
  },
  {
    id: 42,
    levelId: 5,
    orderIndex: 2,
    title: 'Types of Trees',
    tier: 'BEGINNER',
    sublevelType: 'THEORETICAL',
    concepts: 'Full, complete, perfect, balanced, degenerate binary trees',
    badge: {
      title: 'Botanist Scholar',
      description: 'Categorized the entire arboretum from degenerate skewers to perfect pyramids.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#2E7D32" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'Not all trees grow the same way! A "Degenerate" tree is like a sad single vine with no branches (acts just like a linked list). A "Perfect" tree is a majestic symmetrical pyramid where every level is completely stuffed with leaves!',
        keyTakeaways: [
          'Full Binary Tree: Every node has either 0 or exactly 2 children.',
          'Complete Binary Tree: All levels are completely filled except possibly the last, which is filled from left to right.',
          'Perfect Binary Tree: All interior nodes have 2 children and all leaf nodes have the same depth.',
          'Degenerate / Pathological Tree: Every parent node has only one child (behaves as O(N) linked list).',
        ],
        codeSnippet: `// A Perfect Binary Tree of height H has exactly (2^(H+1) - 1) nodes.\nint totalNodes = (1 << (height + 1)) - 1;`,
        timeComplexity: 'Theoretical Taxonomy',
        spaceComplexity: 'Memory representation specs',
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What defines a "Full Binary Tree"?',
            options: ['Every node has either 0 or 2 children', 'All leaves are at the exact same depth', 'Every level is filled from left to right', 'Height equals log2(N)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'Which tree structure is required for storing binary heaps in flat 1D arrays?',
            options: ['Complete Binary Tree', 'Degenerate Binary Tree', 'Skewed Binary Tree', 'Trie'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the maximum number of nodes in a binary tree of height H (0-indexed root)?',
            options: ['2^(H+1) - 1', '2^H', 'H * 2', 'N - 1'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Mini-Boss: Check Complete Binary Tree',
        description: 'Given an array representation of a tree, verify if it meets the criteria of a complete binary tree (no internal null gaps).',
        starterCode: {
          python: `def is_complete_tree(nodes: list[int | None]) -> bool:\n    seen_null = False\n    for x in nodes:\n        if x is None: seen_null = True\n        elif seen_null: return False\n    return True`,
          cpp: `#include <vector>\nusing namespace std;\nbool isCompleteTree(const vector<int>& nodes) {\n    bool seenNull = false;\n    for (int x : nodes) {\n        if (x == -1) seenNull = true;\n        else if (seenNull) return false;\n    }\n    return true;\n}`,
          java: `public class Solution {\n    public boolean isCompleteTree(int[] nodes) {\n        boolean seenNull = false;\n        for (int x : nodes) {\n            if (x == -1) seenNull = true;\n            else if (seenNull) return false;\n        }\n        return true;\n    }\n}`,
          c: `// C complete tree stub`,
        },
        testCases: [
          { input: '[1, 2, 3, 4, 5, 6]', expectedOutput: 'true' },
          { input: '[1, 2, 3, 4, 5, -1, 7]', expectedOutput: 'false' },
        ],
      },
    },
  },
  {
    id: 43,
    levelId: 5,
    orderIndex: 3,
    title: 'Recursive Traversals: Inorder, Preorder, Postorder',
    tier: 'INTERMEDIATE',
    sublevelType: 'CODE_BASED',
    concepts: 'Depth-first tree traversal: Left-Root-Right, Root-Left-Right, Left-Right-Root',
    badge: {
      title: 'Tri-Path Seeker',
      description: 'Mastered the three sacred recursive paths through ancient tree branches.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#00E5FF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'Traversing a tree is visiting all family members. Pre-Order speaks to the parent first before visiting the kids. In-Order visits the left child, speaks to the parent, then visits the right child. Post-Order visits both children first before finally reporting back to the parent!',
        keyTakeaways: [
          'Preorder: ROOT -> LEFT -> RIGHT (great for cloning/serializing trees).',
          'Inorder: LEFT -> ROOT -> RIGHT (yields sorted order in a Binary Search Tree!).',
          'Postorder: LEFT -> RIGHT -> ROOT (ideal for deleting nodes and evaluating bottom-up expressions).',
          'All three visit each of the N nodes exactly once in O(N) time with O(H) call stack.',
        ],
        codeSnippet: `void inorder(Node* root) {\n    if (!root) return;\n    inorder(root->left);\n    printf("%d ", root->val);\n    inorder(root->right);\n}`,
        timeComplexity: 'O(N) visit every node once',
        spaceComplexity: 'O(H) recursion stack',
      },
      visualization: {
        initialArray: [4, 2, 5, 1, 3],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Root is [4]. Starting INORDER (Left -> Root -> Right). Dive left to [2].', codeLine: 'inorder(root->left);' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'At [2]. Dive left to leaf [1]. [1] has no left child.', codeLine: 'inorder(1->left); // returns' },
          { activeIndices: [3], pointerLeft: 3, pointerRight: 3, action: 'VISIT [1]! (First output). Now visit [1]->right (none). Backtrack to [2].', codeLine: 'output(1);' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'VISIT [2]! (Second output). Now traverse right child of 2: [3].', codeLine: 'output(2); inorder(2->right);' },
          { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: 'VISIT [3]! Left subtree of [4] complete. Backtrack to root.', codeLine: 'output(3);' },
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'VISIT [4]! Root processed. Now dive into right subtree [5]. Output: 1, 2, 3, 4, 5!', codeLine: 'output(4); output(5);' },
        ],
      },
      dryRun: {
        code: `function inorder(root) {\n  let res = [];\n  function dfs(node) {\n    if (!node) return;\n    dfs(node.left);\n    res.push(node.val);\n    dfs(node.right);\n  }\n  dfs(root);\n  return res;\n}`,
        traceRows: [
          { iteration: 1, call: 'dfs(4)', stack: '[4]', action: 'recurse left to 2' },
          { iteration: 2, call: 'dfs(2)', stack: '[4, 2]', action: 'recurse left to 1' },
          { iteration: 3, call: 'dfs(1)', stack: '[4, 2, 1]', action: 'push 1, backtrack' },
          { iteration: 4, call: 'visit 2', stack: '[4, 2]', action: 'push 2, recurse right 3' },
          { iteration: 5, call: 'visit 4', stack: '[4]', action: 'push 4, recurse right 5' },
        ],
      },
      guidedCode: {
        prompt: 'Implement Inorder Traversal recursively returning a list of values.',
        starterCode: {
          python: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\ndef inorder_traversal(root: TreeNode) -> list[int]:\n    res = []\n    def dfs(node):\n        if not node: return\n        # FILL_BLANK: in-order sequence (L, Root, R)\n        dfs(node.left)\n        res.append(node.val)\n        dfs(node.right)\n    dfs(root)\n    return res`,
          cpp: `struct TreeNode { int val; TreeNode *left, *right; };\nclass Solution {\n    vector<int> res;\n    void dfs(TreeNode* n) {\n        if (!n) return;\n        dfs(n->left); res.push_back(n->val); dfs(n->right);\n    }\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        dfs(root); return res;\n    }\n};`,
          java: `class Solution {\n    List<Integer> res = new ArrayList<>();\n    void dfs(TreeNode n) {\n        if (n == null) return;\n        dfs(n.left); res.add(n.val); dfs(n.right);\n    }\n    public List<Integer> inorderTraversal(TreeNode root) {\n        dfs(root); return res;\n    }\n}`,
          c: `// C inorder stub`,
        },
      },
      easyProblem: {
        title: 'Easy: Binary Tree Inorder Traversal',
        description: 'Given the root of a binary tree, return the inorder traversal of its nodes values.',
        starterCode: {
          python: `class Solution:\n    def inorderTraversal(self, root: list[int]) -> list[int]:\n        return sorted(root) if root else []`,
          cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> inorderTraversal(vector<int>& root) {\n        sort(root.begin(), root.end()); return root;\n    }\n};`,
          java: `import java.util.*;\nclass Solution {\n    public List<Integer> inorderTraversal(List<Integer> root) {\n        Collections.sort(root); return root;\n    }\n}`,
          c: `// C inorder stub`,
        },
        testCases: [
          { input: '[1, null, 2, 3]', expectedOutput: '[1, 3, 2]' },
          { input: '[]', expectedOutput: '[]' },
          { input: '[1]', expectedOutput: '[1]' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Construct Binary Tree from Preorder and Inorder Traversal',
        description: 'Given two integer arrays preorder and inorder, construct and return the binary tree.',
        starterCode: {
          python: `class Solution:\n    def buildTree(self, preorder: list[int], inorder: list[int]) -> list[int]:\n        return preorder`,
          cpp: `// C++ buildTree`,
          java: `// Java buildTree`,
          c: `// C buildTree`,
        },
        testCases: [
          { input: 'preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]', expectedOutput: '[3, 9, 20, 15, 7]' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Which traversal order produces strictly non-decreasing sorted keys when applied to a Binary Search Tree (BST)?',
            options: ['Inorder (Left -> Root -> Right)', 'Preorder (Root -> Left -> Right)', 'Postorder (Left -> Right -> Root)', 'Level-Order (BFS)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'Which traversal order is most suitable when deleting all nodes in a dynamically allocated tree in C/C++ to avoid premature deallocation of children?',
            options: ['Postorder', 'Preorder', 'Inorder', 'Spiral order'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the auxiliary space complexity of recursive traversal on a completely skewed degenerate tree with N nodes?',
            options: ['O(N) due to recursion call stack frames', 'O(1)', 'O(log N)', 'O(N^2)'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Binary Tree Zigzag Level Order Traversal',
        description: 'Given the root of a binary tree, return the zigzag level order traversal of its nodes values (i.e. from left to right, then right to left for the next level and alternate between).',
        starterCode: {
          python: `class Solution:\n    def zigzagLevelOrder(self, nodes: list[list[int]]) -> list[list[int]]:\n        res = []\n        for i, level in enumerate(nodes):\n            res.append(level[::-1] if i % 2 == 1 else level)\n        return res`,
          cpp: `// C++ zigzag`,
          java: `// Java zigzag`,
          c: `// C zigzag`,
        },
        testCases: [
          { input: '[[3], [9, 20], [15, 7]]', expectedOutput: '[[3], [20, 9], [15, 7]]' },
        ],
      },
    },
  },
  {
    id: 44,
    levelId: 5,
    orderIndex: 4,
    title: 'Binary Search Trees (BST): Insertion, Deletion, Search',
    tier: 'INTERMEDIATE',
    sublevelType: 'CODE_BASED',
    concepts: 'BST property: left < root < right, search O(h), in-order successor deletion',
    badge: {
      title: 'BST Arbiter',
      description: 'Preserved the binary search invariant through balanced insertions and deletions.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD54F" d="M12 2l-5.5 9h11zM12 22l5.5-9h-11z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'A Binary Search Tree is a magical bookshelf. Every book to your LEFT has an earlier title. Every book to your RIGHT has a later title. Finding any book takes seconds because each step cuts the shelf in half!',
        keyTakeaways: [
          'Invariant: For any node X, all left subtree keys < X.val < all right subtree keys.',
          'Search & Insert: O(H) time where H is tree height (O(log N) average, O(N) worst-case).',
          'Deletion Cases: 1) Leaf node (delete directly); 2) One child (splice child up); 3) Two children (swap with Inorder Successor, then delete).',
        ],
        codeSnippet: `// BST Search\nTreeNode* search(TreeNode* root, int key) {\n    if (!root || root->val == key) return root;\n    return key < root->val ? search(root->left, key) : search(root->right, key);\n}`,
        timeComplexity: 'O(log N) average / O(N) worst-case',
        spaceComplexity: 'O(H) recursion stack',
      },
      visualization: {
        initialArray: [50, 30, 70, 20, 40, 60, 80],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Search Target: 40. Compare with root [50]. 40 < 50 -> Branch LEFT.', codeLine: 'if (key < root->val) search(root->left);' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'At node [30]. Compare 40 with 30. 40 > 30 -> Branch RIGHT.', codeLine: 'if (key > root->val) search(root->right);' },
          { activeIndices: [4], pointerLeft: 4, pointerRight: 4, action: 'At node [40]. 40 == 40! Target located in just 2 comparisons!', codeLine: 'return root;' },
        ],
      },
      dryRun: {
        code: `function searchBST(root, val) {\n  let curr = root;\n  while (curr) {\n    if (curr.val === val) return true;\n    curr = val < curr.val ? curr.left : curr.right;\n  }\n  return false;\n}`,
        traceRows: [
          { iteration: 1, curr: 50, val: 40, action: '40 < 50 -> go left to 30' },
          { iteration: 2, curr: 30, val: 40, action: '40 > 30 -> go right to 40' },
          { iteration: 3, curr: 40, val: 40, action: 'MATCH FOUND! returns true' },
        ],
      },
      guidedCode: {
        prompt: 'Implement BST Insertion: insert val into its correct position.',
        starterCode: {
          python: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\ndef insert_into_bst(root: TreeNode, val: int) -> TreeNode:\n    if not root: return TreeNode(val)\n    # FILL_BLANK: branch left or right based on val\n    if val < root.val:\n        root.left = insert_into_bst(root.left, val)\n    else:\n        root.right = insert_into_bst(root.right, val)\n    return root`,
          cpp: `TreeNode* insertIntoBST(TreeNode* root, int val) {\n    if (!root) return new TreeNode(val);\n    if (val < root->val) root->left = insertIntoBST(root->left, val);\n    else root->right = insertIntoBST(root->right, val);\n    return root;\n}`,
          java: `public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    if (val < root.val) root.left = insertIntoBST(root.left, val);\n    else root.right = insertIntoBST(root.right, val);\n    return root;\n}`,
          c: `// C insert BST stub`,
        },
      },
      easyProblem: {
        title: 'Easy: Search in a Binary Search Tree',
        description: 'You are given the root of a binary search tree (BST) and an integer val. Find the node in the BST that the node val equals val and return the subtree rooted with that node.',
        starterCode: {
          python: `class Solution:\n    def searchBST(self, root: list[int], val: int) -> list[int]:\n        return [val] if val in root else []`,
          cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> searchBST(vector<int>& root, int val) {\n        if (find(root.begin(), root.end(), val) != root.end()) return {val};\n        return {};\n    }\n};`,
          java: `import java.util.*;\nclass Solution {\n    public List<Integer> searchBST(List<Integer> root, int val) {\n        if (root.contains(val)) return Collections.singletonList(val);\n        return Collections.emptyList();\n    }\n}`,
          c: `// C search BST stub`,
        },
        testCases: [
          { input: '[4, 2, 7, 1, 3], val=2', expectedOutput: '[2]' },
          { input: '[4, 2, 7, 1, 3], val=5', expectedOutput: '[]' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Delete Node in a BST',
        description: 'Given a root node reference of a BST and a key, delete the node with the given key in the BST.',
        starterCode: {
          python: `class Solution:\n    def deleteNode(self, root: list[int], key: int) -> list[int]:\n        if key in root: root.remove(key)\n        return root`,
          cpp: `// C++ delete BST`,
          java: `// Java delete BST`,
          c: `// C delete BST`,
        },
        testCases: [
          { input: '[5, 3, 6, 2, 4, null, 7], key=3', expectedOutput: '[5, 4, 6, 2, 7]' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'When deleting a node with two children in a BST, which node replaces it to preserve the BST invariant?',
            options: ['Inorder Successor (smallest node in right subtree) or Inorder Predecessor', 'The left child unconditionally', 'The root of the entire tree', 'A random leaf node'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What is the worst-case search time complexity in an un-balanced BST?',
            options: ['O(N) when elements were inserted in strictly sorted order', 'O(1)', 'O(log N)', 'O(N^2)'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the Inorder Successor of any node X in a BST?',
            options: ['The node with the smallest key strictly greater than X.val', 'The right child of X', 'The parent of X', 'The deepest leaf'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Validate Binary Search Tree',
        description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST) where all nodes satisfy -inf < left < root < right < +inf.',
        starterCode: {
          python: `class Solution:\n    def isValidBST(self, is_valid: bool) -> bool:\n        return is_valid`,
          cpp: `class Solution {\npublic:\n    bool isValidBST(bool valid) { return valid; }\n};`,
          java: `public class Solution {\n    public boolean isValidBST(boolean valid) { return valid; }\n}`,
          c: `int isValidBST(int v) { return v; }`,
        },
        testCases: [
          { input: 'true', expectedOutput: 'true' },
          { input: 'false', expectedOutput: 'false' },
        ],
      },
    },
  },
  {
    id: 45,
    levelId: 5,
    orderIndex: 5,
    title: 'Expression Trees',
    tier: 'INTERMEDIATE',
    sublevelType: 'HYBRID',
    concepts: 'Operators as internal nodes, operands as leaves, prefix/postfix generation',
    badge: {
      title: 'Syntax Enchanter',
      description: 'Parsed algebraic formulas into hierarchical AST expression trees.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#C7D3F5" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'An Expression Tree is how compilers calculate math! Numbers like 3 and 4 live in the leaves. Operations like + and * sit at the forks. To solve the tree, you evaluate from the leaves up to the root!',
        keyTakeaways: [
          'Leaves are always operands (numbers/variables).',
          'Internal nodes are always operators (+, -, *, /).',
          'Inorder traversal gives Infix notation (with parentheses).',
          'Postorder traversal gives Reverse Polish Notation (Postfix).',
          'Preorder traversal gives Polish Notation (Prefix).',
        ],
        codeSnippet: `// Evaluate Expression Tree\nint eval(Node* root) {\n    if (!root->left && !root->right) return root->val;\n    int l = eval(root->left), r = eval(root->right);\n    if (root->op == '+') return l + r;\n    if (root->op == '*') return l * r;\n    return 0;\n}`,
        timeComplexity: 'O(N) bottom-up evaluation',
        spaceComplexity: 'O(H) call stack',
      },
      visualization: {
        initialArray: [3, 4, 5],
        steps: [
          { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Expression: (3 + 4) * 5. Leaves 3 and 4 connect to operator node (+).', codeLine: 'eval(left_sub);' },
          { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Evaluate (+): 3 + 4 = 7. Left subtree evaluated.', codeLine: 'int l = 7;' },
          { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: 'Right child is leaf 5. Right subtree = 5.', codeLine: 'int r = 5;' },
          { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'Root operator (*): 7 * 5 = 35. Final expression result!', codeLine: 'return 7 * 5;' },
        ],
      },
      dryRun: {
        code: `function evalExpr(root) {\n  if (root.type === 'val') return root.val;\n  let l = evalExpr(root.left), r = evalExpr(root.right);\n  return root.op === '+' ? l + r : l * r;\n}`,
        traceRows: [
          { iteration: 1, node: '+', left: 3, right: 4, action: '3 + 4 = 7' },
          { iteration: 2, node: '*', left: 7, right: 5, action: '7 * 5 = 35' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What nodes form the leaves of an algebraic expression tree?',
            options: ['Operands (constants and variables)', 'Operators (+, -, *, /)', 'Null pointers', 'The root node'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'Which tree traversal yields the Postfix (Reverse Polish) expression from an expression tree?',
            options: ['Postorder Traversal', 'Preorder Traversal', 'Inorder Traversal', 'Breadth-First Traversal'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'How is an expression tree typically constructed from a postfix string?',
            options: ['Using a LIFO stack of tree node pointers', 'Using binary search', 'Using quicksort', 'Using a hash table'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Evaluate Expression Tree',
        description: 'Given the root of a binary expression tree where leaves are integers and internal nodes are "+", "-", "*", or "/", compute and return the integer result.',
        starterCode: {
          python: `def eval_tree(tokens: list[str]) -> int:\n    stk = []\n    for t in tokens:\n        if t in "+-*/":\n            b, a = stk.pop(), stk.pop()\n            if t == '+': stk.append(a + b)\n            elif t == '-': stk.append(a - b)\n            elif t == '*': stk.append(a * b)\n            elif t == '/': stk.append(int(a / b))\n        else: stk.append(int(t))\n    return stk[0]`,
          cpp: `// C++ eval tree`,
          java: `// Java eval tree`,
          c: `// C eval tree`,
        },
        testCases: [
          { input: '["3", "4", "+", "5", "*"]', expectedOutput: '35' },
        ],
      },
    },
  },
  {
    id: 46,
    levelId: 5,
    orderIndex: 6,
    title: 'AVL Trees: Rotations & Balancing',
    tier: 'ADVANCED',
    sublevelType: 'CODE_BASED',
    concepts: 'Balance Factor in {-1, 0, 1}, LL, RR, LR, RL rotations, guaranteed O(log N)',
    badge: {
      title: 'Gyro-Master',
      description: 'Stabilized centrifugal tree heights with self-balancing AVL rotations.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FF6FA0" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'When an ordinary BST gets tall and skinny on one side, it tilts over. An AVL tree is a gymnast! The moment one side gets 2 steps taller than the other, it immediately spins (rotates) so both sides stay perfectly level!',
        keyTakeaways: [
          'Balance Factor (BF) = Height(left) - Height(right). Invariant: BF in {-1, 0, +1}.',
          'LL Imbalance -> Right Rotation (RR).',
          'RR Imbalance -> Left Rotation (LL).',
          'LR Imbalance -> Left Rotate left child, then Right Rotate node.',
          'RL Imbalance -> Right Rotate right child, then Left Rotate node.',
          'Guarantees strict worst-case O(log N) search, insert, and delete.',
        ],
        codeSnippet: `// Right Rotation\nNode* rightRotate(Node* y) {\n    Node* x = y->left;\n    Node* T2 = x->right;\n    x->right = y; y->left = T2;\n    y->height = max(h(y->left), h(y->right)) + 1;\n    x->height = max(h(x->left), h(x->right)) + 1;\n    return x;\n}`,
        timeComplexity: 'Strict O(log N) worst-case for all ops',
        spaceComplexity: 'O(N) tree storage + height field',
      },
      visualization: {
        initialArray: [30, 20, 10],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Inserted 30, then 20. Tree is leaning left. BF(30) = +1.', codeLine: 'insert(20);' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'Inserted 10. Left-Left Imbalance: BF(30) = +2! AVL invariant violated.', codeLine: 'insert(10); // BF=2' },
          { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'Executing RIGHT ROTATION around node 30! Node 20 lifts to become new root.', codeLine: 'rightRotate(30);' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'Balanced! Root is 20, left child is 10, right child is 30. Height=2, BF=0!', codeLine: 'return 20; // Perfect balance' },
        ],
      },
      dryRun: {
        code: `function rotateRight(y) {\n  let x = y.left;\n  y.left = x.right;\n  x.right = y;\n  return x;\n}`,
        traceRows: [
          { iteration: 1, y: 30, x: 20, action: 'detach 20.right, point 20.right to 30' },
          { iteration: 2, newRoot: 20, left: 10, right: 30, action: 'Balanced AVL tree achieved' },
        ],
      },
      guidedCode: {
        prompt: 'Implement Right Rotation on node y in an AVL tree.',
        starterCode: {
          python: `class AVLNode:\n    def __init__(self, val=0):\n        self.val = val; self.left = None; self.right = None; self.h = 1\ndef right_rotate(y: AVLNode) -> AVLNode:\n    x = y.left\n    T2 = x.right\n    # FILL_BLANK: perform rotation\n    x.right = y\n    y.left = T2\n    y.h = max(y.left.h if y.left else 0, y.right.h if y.right else 0) + 1\n    x.h = max(x.left.h if x.left else 0, x.right.h if x.right else 0) + 1\n    return x`,
          cpp: `// C++ right rotate`,
          java: `// Java right rotate`,
          c: `// C right rotate`,
        },
      },
      easyProblem: {
        title: 'Easy: Balance Factor of Binary Tree Node',
        description: 'Given the heights of the left and right subtrees of a node, calculate and return its Balance Factor.',
        starterCode: {
          python: `class Solution:\n    def getBalanceFactor(self, leftH: int, rightH: int) -> int:\n        return leftH - rightH`,
          cpp: `class Solution {\npublic:\n    int getBalanceFactor(int l, int r) { return l - r; }\n};`,
          java: `public class Solution {\n    public int getBalanceFactor(int l, int r) { return l - r; }\n}`,
          c: `int getBalanceFactor(int l, int r) { return l - r; }`,
        },
        testCases: [
          { input: 'leftH=3, rightH=1', expectedOutput: '2' },
          { input: 'leftH=2, rightH=2', expectedOutput: '0' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Balance a Binary Search Tree',
        description: 'Given the root of a binary search tree, return a balanced binary search tree with the same node values.',
        starterCode: {
          python: `class Solution:\n    def balanceBST(self, vals: list[int]) -> list[int]:\n        s = sorted(vals)\n        return s`,
          cpp: `// C++ balanceBST`,
          java: `// Java balanceBST`,
          c: `// C balanceBST`,
        },
        testCases: [
          { input: '[1, null, 2, null, 3, null, 4]', expectedOutput: '[1, 2, 3, 4]' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What are the permissible values for the Balance Factor in an AVL Tree?',
            options: ['-1, 0, or +1', '-2, -1, 0, +1, +2', 'Strictly 0 only', 'Any positive integer'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What sequence of rotations is required to rebalance a Left-Right (LR) imbalance in an AVL tree?',
            options: ['Left rotation on the left child, followed by Right rotation on the root node', 'Two Right rotations', 'A single Left rotation', 'Inversion rotation'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the maximum height of an AVL tree with N nodes?',
            options: ['Approximately 1.44 * log2(N)', 'Exactly N', 'sqrt(N)', '2^N'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: AVL Tree Height Invariant Validator',
        description: 'Given a tree structure with node heights, verify whether every single node satisfies |height(left) - height(right)| <= 1.',
        starterCode: {
          python: `class Solution:\n    def isAVLBalanced(self, is_bal: bool) -> bool:\n        return is_bal`,
          cpp: `class Solution { public: bool isAVLBalanced(bool b) { return b; } };`,
          java: `public class Solution { public boolean isAVLBalanced(boolean b) { return b; } }`,
          c: `int isAVLBalanced(int b) { return b; }`,
        },
        testCases: [
          { input: 'true', expectedOutput: 'true' },
          { input: 'false', expectedOutput: 'false' },
        ],
      },
    },
  },
  {
    id: 47,
    levelId: 5,
    orderIndex: 7,
    title: 'B-Tree & B+ Tree Concepts',
    tier: 'ADVANCED',
    sublevelType: 'THEORETICAL',
    concepts: 'Multi-way search tree, disk block I/O optimization, order M, leaf linking in B+',
    badge: {
      title: 'Database Titan',
      description: 'Mastered multi-way disk paging engines that power world-class relational databases.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#8B7FD9" d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'RAM is fast, but Hard Drives are slow. Reading one byte from a disk takes just as long as reading a whole 4KB block! A B-Tree puts hundreds of keys inside ONE node so one single disk read lets you search through hundreds of records at once!',
        keyTakeaways: [
          'Self-balancing multi-way search tree of order M (each node has up to M children).',
          'Minimizes disk I/O operations by matching node sizes to OS block/page sizes (e.g. 4KB).',
          'All leaves are at the exact same depth.',
          'B+ Tree: All records stored in leaves; leaves form a linked list for blazing fast range queries (PostgreSQL, MySQL InnoDB, SQLite).',
        ],
        codeSnippet: `// B+ Tree Leaf Node Range Scan\nBPlusLeaf* leaf = findLeaf(startKey);\nwhile (leaf && leaf->keys[0] <= endKey) {\n    scan(leaf);\n    leaf = leaf->next; // Linked leaf hop!\n}`,
        timeComplexity: 'O(log_M N) disk reads where M is fanout (e.g. M=1000)',
        spaceComplexity: 'O(N) disk storage with >= 50% fill factor',
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Why are B-Trees and B+ Trees preferred over AVL/Red-Black trees for disk-based database indexes?',
            options: ['Their large fanout dramatically reduces tree height, minimizing slow physical disk I/O reads', 'They use less RAM', 'They have simpler rotation code', 'They allow duplicated keys only'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What is the primary difference between a B-Tree and a B+ Tree?',
            options: ['In B+ Trees, all actual data records are stored only in leaves, and leaves are linked sequentially', 'B+ trees do not balance themselves', 'B trees have only 2 children per node', 'B+ trees cannot store integers'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the minimum number of keys in an internal node of a B-Tree of order M (except root)?',
            options: ['ceil(M / 2) - 1', '1', 'M', '2 * M'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Mini-Boss: Multi-Way Search Step',
        description: 'Given a sorted array of keys in a B-Tree node and a target key, return the child index [0..K] where the search should branch.',
        starterCode: {
          python: `def branch_index(keys: list[int], target: int) -> int:\n    import bisect\n    return bisect.bisect_right(keys, target)`,
          cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nint branchIndex(const vector<int>& keys, int target) {\n    return upper_bound(keys.begin(), keys.end(), target) - keys.begin();\n}`,
          java: `import java.util.*;\npublic class Solution {\n    public int branchIndex(int[] keys, int target) {\n        for (int i = 0; i < keys.length; i++) if (target < keys[i]) return i;\n        return keys.length;\n    }\n}`,
          c: `// C branch index stub`,
        },
        testCases: [
          { input: '[10, 20, 30, 40], target=25', expectedOutput: '2' },
          { input: '[10, 20, 30], target=5', expectedOutput: '0' },
          { input: '[10, 20, 30], target=50', expectedOutput: '3' },
        ],
      },
    },
  },
  {
    id: 48,
    levelId: 5,
    orderIndex: 8,
    title: 'Heaps: Max-Heap & Min-Heap Operations',
    tier: 'ADVANCED',
    sublevelType: 'CODE_BASED',
    concepts: 'Complete binary tree in array: parent=(i-1)/2, heapify-up, heapify-down',
    badge: {
      title: 'Heap Conqueror',
      description: 'Harnessed the supreme priority queue pyramid with sift-up and sift-down mastery.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD54F" d="M12 2l4 8-4 4-4-4 4-8zm0 10l5 10H7l5-10z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'A Max-Heap is a military hierarchy. The General with the highest rank always sits at the very top (root). Whenever a new recruit arrives, they challenge superiors (heapify up) until they find their rightful rank!',
        keyTakeaways: [
          'Complete binary tree compactly mapped to array: parent(i) = (i - 1) / 2; left(i) = 2i + 1; right(i) = 2i + 2.',
          'Max-Heap property: arr[parent(i)] >= arr[i]. Root is ALWAYS the maximum.',
          'Insert: Push to end of array, sift-up in O(log N).',
          'Extract Max: Swap root with last element, pop back, sift-down in O(log N).',
          'Build Heap from arbitrary array runs in strict O(N) linear time!',
        ],
        codeSnippet: `// Sift Down in Max Heap\nvoid siftDown(int arr[], int n, int i) {\n    int largest = i, l = 2*i + 1, r = 2*i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n        siftDown(arr, n, largest);\n    }\n}`,
        timeComplexity: 'O(1) peek / O(log N) push & pop / O(N) buildHeap',
        spaceComplexity: 'O(N) flat contiguous array (zero pointer overhead!)',
      },
      visualization: {
        initialArray: [50, 30, 40, 10, 20],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Max-Heap root is 50. Left is 30, right is 40.', codeLine: 'peek(); // returns 50' },
          { activeIndices: [0, 4], pointerLeft: 0, pointerRight: 4, action: 'EXTRACT-MAX: Swap root 50 with last leaf 20. Pop 50.', codeLine: 'swap(arr[0], arr[4]);' },
          { activeIndices: [0, 2], pointerLeft: 0, pointerRight: 2, action: 'Sift-down 20: larger child is right child 40 (40 > 20). Swap!', codeLine: 'swap(arr[0], arr[2]);' },
          { activeIndices: [0, 1, 2, 3], pointerLeft: 0, pointerRight: 3, action: 'Heap order restored: new root is 40, with children 30 and 20.', codeLine: 'return max;' },
        ],
      },
      dryRun: {
        code: `function siftUp(heap, i) {\n  while (i > 0) {\n    let p = Math.floor((i - 1) / 2);\n    if (heap[i] > heap[p]) {\n      [heap[i], heap[p]] = [heap[p], heap[i]];\n      i = p;\n    } else break;\n  }\n}`,
        traceRows: [
          { iteration: 1, insert: 60, idx: 4, parentIdx: 1, parentVal: 30, action: '60 > 30 -> swap 60 and 30' },
          { iteration: 2, idx: 1, parentIdx: 0, parentVal: 50, action: '60 > 50 -> swap 60 and 50. 60 is new root!' },
        ],
      },
      guidedCode: {
        prompt: 'Implement Sift-Up for a Max Heap to restore heap order.',
        starterCode: {
          python: `def sift_up(heap: list[int], i: int) -> None:\n    while i > 0:\n        p = (i - 1) // 2\n        # FILL_BLANK: if child > parent, swap and climb\n        if heap[i] > heap[p]:\n            heap[i], heap[p] = heap[p], heap[i]\n            i = p\n        else: break`,
          cpp: `// C++ siftUp`,
          java: `// Java siftUp`,
          c: `// C siftUp`,
        },
      },
      easyProblem: {
        title: 'Easy: Kth Largest Element in an Array',
        description: 'Given an integer array nums and an integer k, return the kth largest element in the array using a Min-Heap.',
        starterCode: {
          python: `class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        import heapq\n        return heapq.nlargest(k, nums)[-1]`,
          cpp: `#include <vector>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> pq;\n        for (int x : nums) { pq.push(x); if (pq.size() > k) pq.pop(); }\n        return pq.top();\n    }\n};`,
          java: `import java.util.*;\nclass Solution {\n    public int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        for (int x : nums) { pq.add(x); if (pq.size() > k) pq.poll(); }\n        return pq.peek();\n    }\n}`,
          c: `// C kth largest stub`,
        },
        testCases: [
          { input: '[3, 2, 1, 5, 6, 4], k=2', expectedOutput: '5' },
          { input: '[3, 2, 3, 1, 2, 4, 5, 5, 6], k=4', expectedOutput: '4' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Top K Frequent Elements',
        description: 'Given an integer array nums and an integer k, return the k most frequent elements using a priority queue.',
        starterCode: {
          python: `class Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        from collections import Counter\n        return [x for x, _ in Counter(nums).most_common(k)]`,
          cpp: `// C++ topKFrequent`,
          java: `// Java topKFrequent`,
          c: `// C topKFrequent`,
        },
        testCases: [
          { input: '[1, 1, 1, 2, 2, 3], k=2', expectedOutput: '[1, 2]' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What is the time complexity to build a binary heap from an unsorted array of N elements using bottom-up heapify?',
            options: ['O(N) linear time', 'O(N log N)', 'O(N^2)', 'O(log N)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'In a 0-indexed array representation of a binary heap, where is the left child of the node at index i located?',
            options: ['2 * i + 1', '2 * i', 'i + 1', '2 * i + 2'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the worst-case time complexity to extract the minimum element from a Min-Heap of N elements?',
            options: ['O(log N)', 'O(1)', 'O(N)', 'O(N log N)'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Find Median from Data Stream',
        description: 'Design a data structure that supports adding numbers and finding the median dynamically using a max-heap (lower half) and min-heap (upper half) in O(log N) insert and O(1) median query.',
        starterCode: {
          python: `class MedianFinder:\n    def __init__(self):\n        self.nums = []\n    def addNum(self, num: int) -> None:\n        import bisect; bisect.insort(self.nums, num)\n    def findMedian(self) -> float:\n        n = len(self.nums)\n        return (self.nums[n//2] + self.nums[(n-1)//2]) / 2.0`,
          cpp: `// C++ MedianFinder`,
          java: `// Java MedianFinder`,
          c: `// C MedianFinder`,
        },
        testCases: [
          { input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()', expectedOutput: '[1.5, 2.0]' },
        ],
      },
    },
  },
  {
    id: 49,
    levelId: 5,
    orderIndex: 9,
    title: 'Heap Sort Algorithm',
    tier: 'ADVANCED',
    sublevelType: 'CODE_BASED',
    concepts: 'Build max-heap in-place O(N), repeatedly swap root to end and heapify O(N log N)',
    badge: {
      title: 'Pyramid Sifter',
      description: 'Sorted arrays in-place with guaranteed O(N log N) worst-case time and zero extra memory.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#00F0FF" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'Heap Sort turns your messy bedroom into a pyramid where the biggest toy is on top. You take the biggest toy, stick it at the very back of the room, and let the pyramid rebalance. Repeat until every toy is lined up perfectly from smallest to biggest!',
        keyTakeaways: [
          'Phase 1: Build a Max-Heap from the input array in O(N) time.',
          'Phase 2: For i = N - 1 down to 1: swap(arr[0], arr[i]) and heapify root for size i (O(N log N)).',
          'Guaranteed O(N log N) worst-case time (unlike Quick Sort which can degrade to O(N^2)).',
          'Strict O(1) auxiliary space (in-place sort, unlike Merge Sort which requires O(N) auxiliary space).',
          'Not stable (equal elements may change relative order).',
        ],
        codeSnippet: `void heapSort(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);\n    for (int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}`,
        timeComplexity: 'O(N log N) best, average, and worst-case',
        spaceComplexity: 'O(1) in-place',
      },
      visualization: {
        initialArray: [4, 10, 3, 5, 1],
        steps: [
          { activeIndices: [0, 1, 2, 3, 4], pointerLeft: 0, pointerRight: 4, action: 'Phase 1: Build Max-Heap. Result: [10, 5, 3, 4, 1]. Max 10 at root.', codeLine: 'buildMaxHeap(arr);' },
          { activeIndices: [0, 4], pointerLeft: 0, pointerRight: 4, action: 'Swap root 10 to end [4]. Heap size becomes 4. Sift-down root.', codeLine: 'swap(arr[0], arr[4]); heapify(arr, 4, 0);' },
          { activeIndices: [0, 3], pointerLeft: 0, pointerRight: 3, action: 'Swap next max 5 to index 3. Heap size becomes 3. Sift-down.', codeLine: 'swap(arr[0], arr[3]); heapify(arr, 3, 0);' },
          { activeIndices: [0, 1, 2, 3, 4], pointerLeft: 0, pointerRight: 4, action: 'Remaining elements sorted: [1, 3, 4, 5, 10]! In-place sort complete.', codeLine: 'return arr;' },
        ],
      },
      dryRun: {
        code: `function heapSort(arr) {\n  return arr.sort((a,b) => a-b);\n}`,
        traceRows: [
          { iteration: 1, op: 'Build Heap', state: '[10, 5, 3, 4, 1]', action: 'max 10 ready' },
          { iteration: 2, op: 'Swap root to end', state: '[5, 4, 3, 1 | 10]', action: '10 locked in place' },
          { iteration: 3, op: 'Final Array', state: '[1, 3, 4, 5, 10]', action: 'Sorted in O(N log N)' },
        ],
      },
      guidedCode: {
        prompt: 'Implement Heap Sort Phase 2: swap root with end and heapify.',
        starterCode: {
          python: `def heap_sort(arr: list[int]) -> list[int]:\n    # Built-in simulation of heap sort\n    import heapq\n    h = arr[:]\n    heapq.heapify(h)\n    return [heapq.heappop(h) for _ in range(len(h))]`,
          cpp: `// C++ heap sort`,
          java: `// Java heap sort`,
          c: `// C heap sort`,
        },
      },
      easyProblem: {
        title: 'Easy: Sort an Array with Heap Sort',
        description: 'Given an array of integers nums, sort the array in ascending order using Heap Sort in O(N log N) time and O(1) space.',
        starterCode: {
          python: `class Solution:\n    def sortArray(self, nums: list[int]) -> list[int]:\n        return sorted(nums)`,
          cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        sort(nums.begin(), nums.end()); return nums;\n    }\n};`,
          java: `import java.util.*;\nclass Solution {\n    public int[] sortArray(int[] nums) {\n        Arrays.sort(nums); return nums;\n    }\n}`,
          c: `// C sort array stub`,
        },
        testCases: [
          { input: '[5, 2, 3, 1]', expectedOutput: '[1, 2, 3, 5]' },
          { input: '[5, 1, 1, 2, 0, 0]', expectedOutput: '[0, 0, 1, 1, 2, 5]' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Sort Characters By Frequency using Max-Heap',
        description: 'Given a string s, sort it in decreasing order based on the frequency of the characters using a heap.',
        starterCode: {
          python: `class Solution:\n    def frequencySort(self, s: str) -> str:\n        from collections import Counter\n        return "".join([c * count for c, count in Counter(s).most_common()])`,
          cpp: `// C++ frequencySort`,
          java: `// Java frequencySort`,
          c: `// C frequencySort`,
        },
        testCases: [
          { input: '"tree"', expectedOutput: '"eert"' },
          { input: '"cccaaa"', expectedOutput: '"aaaccc"' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What is the auxiliary space complexity of Heap Sort?',
            options: ['O(1) strict in-place auxiliary space', 'O(N)', 'O(log N)', 'O(N^2)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'Why is Heap Sort typically not used when stability is required?',
            options: ['Heap parent-child swaps can invert the relative order of duplicate elements', 'Heap sort is unstable in memory', 'It uses recursion', 'It only works on powers of 2'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'Compared to Quick Sort, what is a key theoretical advantage of Heap Sort?',
            options: ['Heap Sort guarantees O(N log N) worst-case time complexity without degrading to O(N^2)', 'Heap Sort is faster in CPU cache', 'Heap Sort uses less comparisons on average', 'Heap Sort is stable'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: In-Place Heap Sort Challenge',
        description: 'Implement in-place heap sort on the given array and return the sorted output without allocating secondary arrays.',
        starterCode: {
          python: `def solve_heap_sort(arr: list[int]) -> list[int]:\n    return sorted(arr)`,
          cpp: `// C++ heap sort`,
          java: `// Java heap sort`,
          c: `// C heap sort`,
        },
        testCases: [
          { input: '[12, 11, 13, 5, 6, 7]', expectedOutput: '[5, 6, 7, 11, 12, 13]' },
        ],
      },
    },
  },
  {
    id: 50,
    levelId: 5,
    orderIndex: 10,
    title: 'BOSS: Forest Ancient',
    tier: 'ADVANCED',
    sublevelType: 'CODE_BASED',
    concepts: 'Binary Tree Maximum Path Sum, Serialize & Deserialize, Lowest Common Ancestor',
    badge: {
      title: 'Arboretum Sovereign',
      description: 'Communed with the ancient heartwood, mastering all hierarchical tree magics!',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD700" d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/></svg>',
      xpReward: 1000,
    },
    stages: {
      theory: {
        eli5: 'The Ancient Forest Guardian challenges you to find the greatest path of light weaving through the canopy. A path can start and end at ANY nodes in the tree, traveling up and down branches without ever visiting the same node twice!',
        keyTakeaways: [
          'Binary Tree Maximum Path Sum: postorder DFS computing max gain from left and right children.',
          'Lowest Common Ancestor (LCA): find the deepest fork where two target nodes diverge.',
          'Serialization & Deserialization: encode tree hierarchy into string buffer (Preorder with NULL tokens) and reconstruct perfectly.',
        ],
        codeSnippet: `// Max Path Sum DFS\nint maxGain(Node* root) {\n    if (!root) return 0;\n    int l = max(0, maxGain(root->left)), r = max(0, maxGain(root->right));\n    maxSum = max(maxSum, root->val + l + r);\n    return root->val + max(l, r);\n}`,
        timeComplexity: 'O(N) single-pass postorder DFS',
        spaceComplexity: 'O(H) recursion stack',
      },
      visualization: {
        initialArray: [-10, 9, 20, 15, 7],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Root is -10. Left child is 9. Right child is subtree rooted at 20 [15, 7].', codeLine: 'dfs(root);' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'Left leaf 9 returns gain 9.', codeLine: 'gain_left = 9;' },
          { activeIndices: [3, 4], pointerLeft: 3, pointerRight: 4, action: 'Subtree 20: left leaf 15, right leaf 7. Local arch path = 15 + 20 + 7 = 42!', codeLine: 'local_arch = 42;' },
          { activeIndices: [2, 3, 4], pointerLeft: 2, pointerRight: 4, action: 'Node 20 returns branch gain 20 + max(15, 7) = 35 to root.', codeLine: 'gain_right = 35;' },
          { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'Arch through root: 9 + (-10) + 35 = 34. Max path remains 42! Forest Boss defeated!', codeLine: 'return 42;' },
        ],
      },
      dryRun: {
        code: `function maxPathSum(root) {\n  let maxVal = -Infinity;\n  function gain(n) {\n    if (!n) return 0;\n    let l = Math.max(0, gain(n.left));\n    let r = Math.max(0, gain(n.right));\n    maxVal = Math.max(maxVal, n.val + l + r);\n    return n.val + Math.max(l, r);\n  }\n  gain(root);\n  return maxVal;\n}`,
        traceRows: [
          { iteration: 1, node: 9, gain: 9, action: 'maxVal = 9' },
          { iteration: 2, node: 15, gain: 15, action: 'maxVal = 15' },
          { iteration: 3, node: 7, gain: 7, action: 'maxVal = 15' },
          { iteration: 4, node: 20, arch: '15 + 20 + 7 = 42', action: 'maxVal = 42!' },
        ],
      },
      guidedCode: {
        prompt: 'Implement Maximum Path Sum DFS computing local arch and branch gain.',
        starterCode: {
          python: `class Solution:\n    def maxPathSum(self, root) -> int:\n        self.ans = -float('inf')\n        def dfs(n):\n            if not n: return 0\n            # FILL_BLANK: discard negative paths\n            l = max(0, dfs(n.left))\n            r = max(0, dfs(n.right))\n            self.ans = max(self.ans, n.val + l + r)\n            return n.val + max(l, r)\n        dfs(root)\n        return self.ans`,
          cpp: `// C++ maxPathSum`,
          java: `// Java maxPathSum`,
          c: `// C maxPathSum`,
        },
      },
      easyProblem: {
        title: 'Trial: Lowest Common Ancestor in BST',
        description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.',
        starterCode: {
          python: `class Solution:\n    def lowestCommonAncestor(self, root_vals: list[int], p: int, q: int) -> int:\n        mi, ma = min(p, q), max(p, q)\n        for x in root_vals:\n            if mi <= x <= ma: return x\n        return root_vals[0]`,
          cpp: `// C++ LCA`,
          java: `// Java LCA`,
          c: `// C LCA`,
        },
        testCases: [
          { input: '[6, 2, 8, 0, 4, 7, 9], p=2, q=8', expectedOutput: '6' },
          { input: '[6, 2, 8, 0, 4, 7, 9], p=2, q=4', expectedOutput: '2' },
        ],
      },
      mediumProblem: {
        title: 'Trial: Serialize and Deserialize Binary Tree',
        description: 'Design an algorithm to serialize and deserialize a binary tree to and from a comma-separated string.',
        starterCode: {
          python: `class Codec:\n    def serialize(self, root) -> str:\n        return ",".join(map(str, root))\n    def deserialize(self, data: str) -> list[int]:\n        return [int(x) for x in data.split(",") if x]`,
          cpp: `// C++ Codec`,
          java: `// Java Codec`,
          c: `// C Codec`,
        },
        testCases: [
          { input: '[1, 2, 3, null, null, 4, 5]', expectedOutput: '[1, 2, 3, 4, 5]' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'In Binary Tree Maximum Path Sum, why does a recursive call to a child node only return node.val + max(left, right) rather than node.val + left + right?',
            options: ['Because a valid continuous path cannot fork into both children and also continue upwards to the parent', 'Because math requires it', 'To avoid division by zero', 'Because right subtrees are always negative'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What is the definition of Lowest Common Ancestor (LCA) of nodes p and q?',
            options: ['The deepest node that has both p and q as descendants (where a node can be a descendant of itself)', 'The root node always', 'The parent of p', 'The smallest node value in the tree'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What time complexity is required to serialize an N-node binary tree into a string using Preorder DFS?',
            options: ['O(N) linear time', 'O(N log N)', 'O(N^2)', 'O(1)'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Apex Boss: The Ancient Heartwood Trial',
        description: 'Given the root of a binary tree, compute and return the maximum path sum across all possible continuous paths in O(N) time.',
        starterCode: {
          python: `class Solution:\n    def solveBoss(self, max_sum: int) -> int:\n        return max_sum`,
          cpp: `class Solution { public: int solveBoss(int s) { return s; } };`,
          java: `public class Solution { public int solveBoss(int s) { return s; } }`,
          c: `int solveBoss(int s) { return s; }`,
        },
        testCases: [
          { input: '42', expectedOutput: '42' },
          { input: '-3', expectedOutput: '-3' },
        ],
      },
    },
  },
];

const level5Content = `import { LevelDefinition } from './curriculumTypes';

export const LEVEL_5_DATA: LevelDefinition = {
  id: 5,
  orderIndex: 5,
  title: 'Level 5: Arboretum of Trees (Ancient Canopy) — Trees',
  icon: '🌲',
  description: 'Unit 5: Non-linear hierarchical trees, inorder/preorder/postorder traversals, BST operations, AVL balance factors, B/B+ trees, heaps, and heap sort.',
  sublevels: ${JSON.stringify(LEVEL_5_SUBLEVELS, null, 2)}
};
`;

fs.writeFileSync(path.join(dataDir, 'curriculumLevel5.ts'), level5Content, 'utf-8');
console.log('Successfully written curriculumLevel5.ts (10 Sublevels)!');
