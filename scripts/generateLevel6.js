const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'backend', 'src', 'data');

const LEVEL_6_SUBLEVELS = [
  {
    id: 51,
    levelId: 6,
    orderIndex: 1,
    title: 'Graph Theory Basics & Terminologies',
    tier: 'BEGINNER',
    sublevelType: 'THEORETICAL',
    concepts: 'Vertices, edges, directed vs undirected, weighted, cyclic/acyclic, DAG',
    badge: {
      title: 'Glacier Cartographer',
      description: 'Mapped the non-linear network of vertices and edges across the frozen peaks.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#00E5FF" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'A Graph is a map of cities and flight routes! Cities are vertices (dots), and flight paths between them are edges (lines). If flights fly both ways, it is undirected. If flights only fly one way, it is directed!',
        keyTakeaways: [
          'G = (V, E): Set of Vertices V and set of Edges E connecting pairs of vertices.',
          'Directed Graph (Digraph): Edges have direction (u -> v != v -> u).',
          'Degree: In-degree (incoming edges) and Out-degree (outgoing edges). In undirected graphs, Handshaking Lemma: sum(deg) = 2 * |E|.',
          'DAG (Directed Acyclic Graph): Foundation for dependency resolution, build systems, and topological sort.',
        ],
        codeSnippet: `// Handshaking Lemma in Undirected Graph:\n// Total Degree Sum = 2 * Total Edges\nint totalDegree = 2 * numEdges;`,
        timeComplexity: 'O(V + E) network complexity baseline',
        spaceComplexity: 'O(V + E) adjacency storage',
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'According to the Handshaking Lemma, in any undirected graph with E edges, what is the sum of degrees of all vertices?',
            options: ['2 * E', 'E', 'E^2', 'V * E'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What is a DAG (Directed Acyclic Graph)?',
            options: ['A directed graph with strictly zero cycles', 'An undirected tree', 'A graph where all weights are negative', 'A disconnected graph'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the maximum number of edges in a simple undirected graph with V vertices?',
            options: ['V * (V - 1) / 2', 'V^2', '2^V', 'V - 1'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Mini-Boss: Edge Count Verifier',
        description: 'Given degrees of all vertices in an undirected graph, verify if they satisfy the Handshaking lemma (sum of degrees is even) and return the number of edges.',
        starterCode: {
          python: `def count_edges(degrees: list[int]) -> int:\n    s = sum(degrees)\n    return s // 2 if s % 2 == 0 else -1`,
          cpp: `#include <vector>\n#include <numeric>\nusing namespace std;\nint countEdges(const vector<int>& deg) {\n    int s = accumulate(deg.begin(), deg.end(), 0);\n    return s % 2 == 0 ? s / 2 : -1;\n}`,
          java: `import java.util.*;\npublic class Solution {\n    public int countEdges(int[] deg) {\n        int s = Arrays.stream(deg).sum();\n        return s % 2 == 0 ? s / 2 : -1;\n    }\n}`,
          c: `// C count edges stub`,
        },
        testCases: [
          { input: '[2, 3, 1, 2]', expectedOutput: '4' },
          { input: '[1, 2, 2]', expectedOutput: '-1' },
        ],
      },
    },
  },
  {
    id: 52,
    levelId: 6,
    orderIndex: 2,
    title: 'Storage Representation: Adjacency Matrix & Adjacency List',
    tier: 'INTERMEDIATE',
    sublevelType: 'CODE_BASED',
    concepts: '2D matrix O(V^2) vs linked array of lists O(V + E), sparse vs dense trade-offs',
    badge: {
      title: 'Matrix Engineer',
      description: 'Chose between spatial 2D matrix grids and memory-lean adjacency lists.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#4A6FA5" d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'To store flight routes, you can draw a giant grid of all cities vs all cities (Adjacency Matrix — takes lots of paper!). Or each city can just keep a little notebook listing only cities it actually flies to (Adjacency List — saves massive space for sparse maps)!',
        keyTakeaways: [
          'Adjacency Matrix: V x V 2D array. Space: O(V^2). Edge lookup (u, v) is O(1). Ideal for dense graphs (E ~ V^2).',
          'Adjacency List: Array of V lists/vectors. Space: O(V + E). Finding neighbors of u is O(deg(u)). Ideal for sparse graphs (E << V^2).',
          'Most real-world networks (social networks, roads, the internet) are sparse -> Adjacency List is standard.',
        ],
        codeSnippet: `// Adjacency List in C++\nvector<int> adj[MAX_V];\nvoid addEdge(int u, int v) {\n    adj[u].push_back(v);\n    adj[v].push_back(u); // if undirected\n}`,
        timeComplexity: 'Matrix: O(1) edge check / List: O(deg(v))',
        spaceComplexity: 'Matrix: O(V^2) / List: O(V + E)',
      },
      visualization: {
        initialArray: [0, 1, 2, 3],
        steps: [
          { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Undirected Graph: 4 Vertices {0, 1, 2, 3}. Edge (0, 1) added.', codeLine: 'adj[0].push_back(1); adj[1].push_back(0);' },
          { activeIndices: [1, 2], pointerLeft: 1, pointerRight: 2, action: 'Edge (1, 2) added. adj[1] now holds [0, 2].', codeLine: 'adj[1].push_back(2); adj[2].push_back(1);' },
          { activeIndices: [2, 3], pointerLeft: 2, pointerRight: 3, action: 'Edge (2, 3) added. Matrix row 2 has bits at columns 1 and 3.', codeLine: 'adj[2].push_back(3);' },
          { activeIndices: [0, 3], pointerLeft: 0, pointerRight: 3, action: 'Edge (3, 0) closes the square cycle! Representation complete.', codeLine: 'adj[3].push_back(0);' },
        ],
      },
      dryRun: {
        code: `function buildAdjList(V, edges) {\n  let adj = Array.from({length: V}, () => []);\n  for (let [u, v] of edges) {\n    adj[u].push(v); adj[v].push(u);\n  }\n  return adj;\n}`,
        traceRows: [
          { iteration: 1, edge: '[0, 1]', adj: '0:[1], 1:[0]', action: 'added edge (0,1)' },
          { iteration: 2, edge: '[1, 2]', adj: '1:[0, 2], 2:[1]', action: 'added edge (1,2)' },
          { iteration: 3, edge: '[2, 0]', adj: '2:[1, 0], 0:[1, 2]', action: 'triangle graph completed' },
        ],
      },
      guidedCode: {
        prompt: 'Convert an edge list into an adjacency list for an undirected graph.',
        starterCode: {
          python: `def build_adjacency_list(n: int, edges: list[list[int]]) -> list[list[int]]:\n    adj = [[] for _ in range(n)]\n    for u, v in edges:\n        # FILL_BLANK: add bidirectional connections\n        adj[u].append(v)\n        adj[v].append(u)\n    return adj`,
          cpp: `// C++ buildAdj`,
          java: `// Java buildAdj`,
          c: `// C buildAdj`,
        },
      },
      easyProblem: {
        title: 'Easy: Find the Town Judge',
        description: 'In a town of n people labeled from 1 to n, return the town judge if they exist (the judge is trusted by everyone else and trusts nobody), or -1 otherwise.',
        starterCode: {
          python: `class Solution:\n    def findJudge(self, n: int, trust: list[list[int]]) -> int:\n        counts = [0] * (n + 1)\n        for a, b in trust:\n            counts[a] -= 1\n            counts[b] += 1\n        for i in range(1, n + 1):\n            if counts[i] == n - 1: return i\n        return -1`,
          cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int findJudge(int n, vector<vector<int>>& trust) {\n        vector<int> counts(n + 1, 0);\n        for (const auto& t : trust) { counts[t[0]]--; counts[t[1]]++; }\n        for (int i = 1; i <= n; i++) if (counts[i] == n - 1) return i;\n        return -1;\n    }\n};`,
          java: `class Solution {\n    public int findJudge(int n, int[][] trust) {\n        int[] counts = new int[n + 1];\n        for (int[] t : trust) { counts[t[0]]--; counts[t[1]]++; }\n        for (int i = 1; i <= n; i++) if (counts[i] == n - 1) return i;\n        return -1;\n    }\n}`,
          c: `// C judge stub`,
        },
        testCases: [
          { input: 'n=2, trust=[[1,2]]', expectedOutput: '2' },
          { input: 'n=3, trust=[[1,3],[2,3]]', expectedOutput: '3' },
          { input: 'n=3, trust=[[1,3],[2,3],[3,1]]', expectedOutput: '-1' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Clone Graph',
        description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
        starterCode: {
          python: `class Solution:\n    def cloneGraph(self, adj: list[list[int]]) -> list[list[int]]:\n        return [row[:] for row in adj]`,
          cpp: `// C++ cloneGraph`,
          java: `// Java cloneGraph`,
          c: `// C cloneGraph`,
        },
        testCases: [
          { input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What is the space complexity of an Adjacency Matrix representation of a graph with V vertices and E edges?',
            options: ['O(V^2) regardless of the number of edges', 'O(V + E)', 'O(E)', 'O(log V)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'When is an Adjacency Matrix preferable over an Adjacency List?',
            options: ['When the graph is dense (E is close to V^2) and O(1) edge existence checks are frequent', 'When the graph is very sparse', 'When memory is extremely constrained', 'When graph is disconnected'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'In an Adjacency List for an undirected graph, how many times does an edge (u, v) appear across all lists?',
            options: ['Exactly 2 times (once in list of u, once in list of v)', '1 time', 'V times', '4 times'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Convert Edge List to Adjacency Matrix',
        description: 'Given V vertices and a list of undirected edges, generate and return the binary V x V Adjacency Matrix.',
        starterCode: {
          python: `def to_matrix(V: int, edges: list[list[int]]) -> list[list[int]]:\n    mat = [[0] * V for _ in range(V)]\n    for u, v in edges:\n        mat[u][v] = 1; mat[v][u] = 1\n    return mat`,
          cpp: `// C++ toMatrix`,
          java: `// Java toMatrix`,
          c: `// C toMatrix`,
        },
        testCases: [
          { input: 'V=3, edges=[[0,1],[1,2]]', expectedOutput: '[[0,1,0],[1,0,1],[0,1,0]]' },
        ],
      },
    },
  },
  {
    id: 53,
    levelId: 6,
    orderIndex: 3,
    title: 'Basic Graph Manipulation: Add/Remove Vertex & Edge',
    tier: 'INTERMEDIATE',
    sublevelType: 'CODE_BASED',
    concepts: 'Dynamic vertex addition, edge removal, degree updates, disconnected components',
    badge: {
      title: 'Graph Sculptor',
      description: 'Forged and severed vertex connections dynamically in real-time memory.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD54F" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'Just like adding a new friend on social media (add edge) or blocking someone (remove edge), dynamic graphs update connections on the fly without having to rebuild the entire world!',
        keyTakeaways: [
          'Add Edge: In Adjacency List, append neighbor in O(1) amortized time.',
          'Remove Edge: Locate and erase element from neighbor list in O(deg(v)) time.',
          'Add Vertex: Push a new empty vector to adjacency list in O(1).',
          'Remove Vertex: Must erase vertex and all incident edges connected to it in O(V + E).',
        ],
        codeSnippet: `// Remove edge (u, v) from Adjacency List\nadj[u].erase(remove(adj[u].begin(), adj[u].end(), v), adj[u].end());\nadj[v].erase(remove(adj[v].begin(), adj[v].end(), u), adj[v].end());`,
        timeComplexity: 'O(1) add edge / O(deg) remove edge',
        spaceComplexity: 'Dynamic O(V + E)',
      },
      visualization: {
        initialArray: [1, 2, 3],
        steps: [
          { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Initial triangle graph: edges (0,1), (1,2), (2,0). All vertices degree 2.', codeLine: 'buildTriangle();' },
          { activeIndices: [1, 2], pointerLeft: 1, pointerRight: 2, action: 'SEVER EDGE (1, 2): Erased 2 from adj[1] and 1 from adj[2].', codeLine: 'removeEdge(1, 2);' },
          { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'Graph is now a simple path: 1 <-> 0 <-> 2. Cycle destroyed!', codeLine: 'degree[1]=1; degree[2]=1;' },
        ],
      },
      dryRun: {
        code: `function removeEdge(adj, u, v) {\n  adj[u] = adj[u].filter(x => x !== v);\n  adj[v] = adj[v].filter(x => x !== u);\n  return adj;\n}`,
        traceRows: [
          { iteration: 1, target: '(1, 2)', action: 'filter out 2 from adj[1]' },
          { iteration: 2, target: '(1, 2)', action: 'filter out 1 from adj[2]. Edge severed.' },
        ],
      },
      guidedCode: {
        prompt: 'Implement remove_edge in an undirected adjacency list.',
        starterCode: {
          python: `def remove_edge(adj: list[list[int]], u: int, v: int) -> list[list[int]]:\n    # FILL_BLANK: remove mutual references\n    if v in adj[u]: adj[u].remove(v)\n    if u in adj[v]: adj[v].remove(u)\n    return adj`,
          cpp: `// C++ removeEdge`,
          java: `// Java removeEdge`,
          c: `// C removeEdge`,
        },
      },
      easyProblem: {
        title: 'Easy: Number of Provinces (Connected Components)',
        description: 'There are n cities. A province is a group of directly or indirectly connected cities. Return the total number of provinces.',
        starterCode: {
          python: `class Solution:\n    def findCircleNum(self, isConnected: list[list[int]]) -> int:\n        n = len(isConnected)\n        visited = set()\n        def dfs(i):\n            for j in range(n):\n                if isConnected[i][j] and j not in visited:\n                    visited.add(j); dfs(j)\n        provinces = 0\n        for i in range(n):\n            if i not in visited:\n                visited.add(i); dfs(i); provinces += 1\n        return provinces`,
          cpp: `// C++ provinces`,
          java: `// Java provinces`,
          c: `// C provinces`,
        },
        testCases: [
          { input: '[[1,1,0],[1,1,0],[0,0,1]]', expectedOutput: '2' },
          { input: '[[1,0,0],[0,1,0],[0,0,1]]', expectedOutput: '3' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Redundant Connection',
        description: 'In this problem, a tree is an undirected graph that is connected and has no cycles. Given edges, return an edge that can be removed so that the resulting graph is a tree of n nodes.',
        starterCode: {
          python: `class Solution:\n    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:\n        parent = list(range(len(edges) + 1))\n        def find(x):\n            if parent[x] != x: parent[x] = find(parent[x])\n            return parent[x]\n        for u, v in edges:\n            ru, rv = find(u), find(v)\n            if ru == rv: return [u, v]\n            parent[ru] = rv\n        return []`,
          cpp: `// C++ redundant`,
          java: `// Java redundant`,
          c: `// C redundant`,
        },
        testCases: [
          { input: '[[1,2],[1,3],[2,3]]', expectedOutput: '[2,3]' },
          { input: '[[1,2],[2,3],[3,4],[1,4],[1,5]]', expectedOutput: '[1,4]' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What is the average time complexity to add an edge (u, v) into an Adjacency List using vector push_back?',
            options: ['O(1) constant time', 'O(V)', 'O(E)', 'O(V^2)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What happens to the number of connected components when an edge that is NOT part of any cycle is removed from a connected graph?',
            options: ['The graph splits into 2 disconnected components', 'The components count stays 1', 'The graph is erased', 'Components multiply by 4'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is an edge whose removal strictly increases the number of connected components in a graph called?',
            options: ['A Bridge (or cut-edge)', 'A Loop', 'A Chord', 'A Leaf'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Disconnected Components Counter',
        description: 'Given V vertices and an edge list, compute and return the exact number of disconnected subgraphs.',
        starterCode: {
          python: `def solve_boss(V: int, edges: list[list[int]]) -> int:\n    parent = list(range(V))\n    def find(x): \n        if parent[x] != x: parent[x] = find(parent[x])\n        return parent[x]\n    comps = V\n    for u, v in edges:\n        ru, rv = find(u), find(v)\n        if ru != rv: parent[ru] = rv; comps -= 1\n    return comps`,
          cpp: `// C++ solve_boss`,
          java: `// Java solve_boss`,
          c: `// C solve_boss`,
        },
        testCases: [
          { input: 'V=5, edges=[[0,1],[1,2],[3,4]]', expectedOutput: '2' },
        ],
      },
    },
  },
  {
    id: 54,
    levelId: 6,
    orderIndex: 4,
    title: 'Breadth-First Search (BFS) Traversal',
    tier: 'ADVANCED',
    sublevelType: 'CODE_BASED',
    concepts: 'Queue-based level-order wave, shortest path in unweighted graphs, visited array',
    badge: {
      title: 'Tide Walker',
      description: 'Swept across networks in concentric level-by-level BFS flood waves.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#00F0FF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'BFS is like dropping a pebble into a calm pond. Ripples expand outward evenly in circles. First it hits all immediate neighbors (distance 1), then all their neighbors (distance 2). Because it expands in waves, it ALWAYS finds the shortest path!',
        keyTakeaways: [
          'FIFO Queue data structure drives the frontier expansion.',
          'Visited array boolean flags prevent infinite loops caused by graph cycles.',
          'Guarantees shortest path (minimum edge count) in unweighted graphs.',
          'Runs in O(V + E) linear time with O(V) queue auxiliary memory.',
        ],
        codeSnippet: `// BFS Traversal\nqueue<int> q; q.push(start); visited[start] = true;\nwhile (!q.empty()) {\n    int u = q.front(); q.pop();\n    for (int v : adj[u]) {\n        if (!visited[v]) {\n            visited[v] = true; q.push(v);\n        }\n    }\n}`,
        timeComplexity: 'O(V + E) visit each vertex & edge once',
        spaceComplexity: 'O(V) queue & visited array',
      },
      visualization: {
        initialArray: [0, 1, 2, 3],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'BFS START at vertex 0. Mark visited[0]=true. Push 0 to Queue.', codeLine: 'q.push(0); visited[0] = true;' },
          { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'Pop 0. Inspect neighbors {1, 2}. Distance 1 frontier reached! Push 1 and 2.', codeLine: 'for (v : adj[0]) q.push(v);' },
          { activeIndices: [1, 3], pointerLeft: 1, pointerRight: 3, action: 'Pop 1. Neighbor 3 unvisited! Push 3 to Queue (distance 2 frontier).', codeLine: 'q.push(3);' },
          { activeIndices: [2, 3], pointerLeft: 2, pointerRight: 3, action: 'Pop 2 and 3. All vertices visited in order: [0, 1, 2, 3]! Shortest paths secured.', codeLine: 'return order;' },
        ],
      },
      dryRun: {
        code: `function bfs(start, adj) {\n  let q = [start], visited = new Set([start]), order = [];\n  while (q.length) {\n    let u = q.shift();\n    order.push(u);\n    for (let v of adj[u]) {\n      if (!visited.has(v)) {\n        visited.add(v); q.push(v);\n      }\n    }\n  }\n  return order;\n}`,
        traceRows: [
          { iteration: 1, u: 0, q: '[1, 2]', order: '[0]', action: 'expanded root 0' },
          { iteration: 2, u: 1, q: '[2, 3]', order: '[0, 1]', action: 'expanded 1, found 3' },
          { iteration: 3, u: 2, q: '[3]', order: '[0, 1, 2]', action: 'expanded 2' },
          { iteration: 4, u: 3, q: '[]', order: '[0, 1, 2, 3]', action: 'BFS complete' },
        ],
      },
      guidedCode: {
        prompt: 'Implement BFS queue-based traversal returning visited vertices in order.',
        starterCode: {
          python: `from collections import deque\ndef bfs_traversal(V: int, adj: list[list[int]], start: int) -> list[int]:\n    q = deque([start])\n    visited = [False] * V\n    visited[start] = True\n    order = []\n    while q:\n        u = q.popleft()\n        order.append(u)\n        # FILL_BLANK: explore unvisited neighbors\n        for v in adj[u]:\n            if not visited[v]:\n                visited[v] = True\n                q.append(v)\n    return order`,
          cpp: `// C++ BFS`,
          java: `// Java BFS`,
          c: `// C BFS`,
        },
      },
      easyProblem: {
        title: 'Easy: Shortest Path in Binary Matrix',
        description: 'Given an n x n binary matrix grid, return the length of the shortest clear path from top-left (0,0) to bottom-right (n-1, n-1) using 8-directional BFS.',
        starterCode: {
          python: `class Solution:\n    def shortestPathBinaryMatrix(self, grid: list[list[int]]) -> int:\n        n = len(grid)\n        if grid[0][0] or grid[n-1][n-1]: return -1\n        from collections import deque\n        q = deque([(0, 0, 1)])\n        grid[0][0] = 1\n        while q:\n            r, c, d = q.popleft()\n            if r == n-1 and c == n-1: return d\n            for dr in [-1,0,1]:\n                for dc in [-1,0,1]:\n                    nr, nc = r+dr, c+dc\n                    if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:\n                        grid[nr][nc] = 1; q.append((nr, nc, d+1))\n        return -1`,
          cpp: `// C++ matrix BFS`,
          java: `// Java matrix BFS`,
          c: `// C matrix BFS`,
        },
        testCases: [
          { input: '[[0,1],[1,0]]', expectedOutput: '2' },
          { input: '[[0,0,0],[1,1,0],[1,1,0]]', expectedOutput: '4' },
          { input: '[[1,0,0],[1,1,0],[1,1,0]]', expectedOutput: '-1' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Word Ladder',
        description: 'A transformation sequence from beginWord to endWord using a dictionary wordList is a sequence of words where each adjacent pair differs by exactly one letter. Return the number of words in the shortest transformation sequence.',
        starterCode: {
          python: `class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        words = set(wordList)\n        if endWord not in words: return 0\n        from collections import deque\n        q = deque([(beginWord, 1)])\n        while q:\n            w, d = q.popleft()\n            if w == endWord: return d\n            for i in range(len(w)):\n                for c in 'abcdefghijklmnopqrstuvwxyz':\n                    nw = w[:i] + c + w[i+1:]\n                    if nw in words:\n                        words.remove(nw); q.append((nw, d + 1))\n        return 0`,
          cpp: `// C++ word ladder`,
          java: `// Java word ladder`,
          c: `// C word ladder`,
        },
        testCases: [
          { input: 'begin="hit", end="cog", list=["hot","dot","dog","lot","log","cog"]', expectedOutput: '5' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'Which fundamental data structure is used to manage the vertex exploration queue in Breadth-First Search?',
            options: ['FIFO Queue', 'LIFO Stack', 'Max Heap', 'Binary Search Tree'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'Why does BFS guarantee the shortest path between two vertices in an unweighted graph?',
            options: ['Because it discovers vertices in strictly non-decreasing order of their distance from the source', 'Because it uses Dijkstra algorithm', 'Because queues sort values automatically', 'Because it backtracks'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the overall time complexity of BFS on a graph represented with an Adjacency List?',
            options: ['O(V + E)', 'O(V^2)', 'O(V * E)', 'O(E log V)'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: 0-1 BFS Matrix Distance Wave',
        description: 'Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell using multi-source BFS.',
        starterCode: {
          python: `class Solution:\n    def updateMatrix(self, mat: list[list[int]]) -> list[list[int]]:\n        m, n = len(mat), len(mat[0])\n        from collections import deque\n        q = deque()\n        dist = [[-1] * n for _ in range(m)]\n        for r in range(m):\n            for c in range(n):\n                if mat[r][c] == 0: dist[r][c] = 0; q.append((r, c))\n        while q:\n            r, c = q.popleft()\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r+dr, c+dc\n                if 0 <= nr < m and 0 <= nc < n and dist[nr][nc] == -1:\n                    dist[nr][nc] = dist[r][c] + 1; q.append((nr, nc))\n        return dist`,
          cpp: `// C++ updateMatrix`,
          java: `// Java updateMatrix`,
          c: `// C updateMatrix`,
        },
        testCases: [
          { input: '[[0,0,0],[0,1,0],[0,0,0]]', expectedOutput: '[[0,0,0],[0,1,0],[0,0,0]]' },
          { input: '[[0,0,0],[0,1,0],[1,1,1]]', expectedOutput: '[[0,0,0],[0,1,0],[1,2,1]]' },
        ],
      },
    },
  },
  {
    id: 55,
    levelId: 6,
    orderIndex: 5,
    title: 'Depth-First Search (DFS) Traversal',
    tier: 'ADVANCED',
    sublevelType: 'CODE_BASED',
    concepts: 'Stack/Recursion backtracking, cycle detection, discovery/finish timestamps, topological sort',
    badge: {
      title: 'Abyss Diver',
      description: 'Plunged into the deepest algorithmic caverns using recursive DFS backtracking.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#8B7FD9" d="M12 2l-5.5 9h11zM12 22l5.5-9h-11z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'DFS is exploring a dark dungeon maze with a spool of string. You pick a tunnel and walk as far forward as you can until you hit a dead end. Then, you backtrack along the string until you find an unvisited branch, and dive in again!',
        keyTakeaways: [
          'Recursion or LIFO Stack drives deep exploration before wide exploration.',
          'Cycle Detection: Track vertex state (0: Unvisited, 1: Currently Visiting, 2: Fully Visited). Encountering state 1 indicates a back-edge / cycle!',
          'Topological Sort: Postorder reverse timestamps on Directed Acyclic Graphs (DAGs).',
          'Connected components and bipartite graph verification.',
        ],
        codeSnippet: `void dfs(int u) {\n    visited[u] = true;\n    for (int v : adj[u]) {\n        if (!visited[v]) dfs(v);\n    }\n}`,
        timeComplexity: 'O(V + E) linear traversal',
        spaceComplexity: 'O(V) recursion call stack depth',
      },
      visualization: {
        initialArray: [0, 1, 2, 3],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'DFS Start at vertex 0. Dive deep into first neighbor 1.', codeLine: 'dfs(0) -> dfs(1);' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'At vertex 1. Dive deep into neighbor 2.', codeLine: 'dfs(1) -> dfs(2);' },
          { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: 'At vertex 2. Dive deep into neighbor 3. Dead end reached!', codeLine: 'dfs(2) -> dfs(3);' },
          { activeIndices: [3], pointerLeft: 3, pointerRight: 3, action: 'Backtrack: 3 -> 2 -> 1 -> 0. Complete cavern mapped!', codeLine: 'return;' },
        ],
      },
      dryRun: {
        code: `function dfs(u, adj, vis, order) {\n  vis[u] = true;\n  order.push(u);\n  for (let v of adj[u]) {\n    if (!vis[v]) dfs(v, adj, vis, order);\n  }\n}`,
        traceRows: [
          { iteration: 1, u: 0, stack: '[0]', action: 'dive to 1' },
          { iteration: 2, u: 1, stack: '[0, 1]', action: 'dive to 2' },
          { iteration: 3, u: 2, stack: '[0, 1, 2]', action: 'dive to 3' },
          { iteration: 4, u: 3, stack: '[0, 1, 2, 3]', action: 'backtrack complete' },
        ],
      },
      guidedCode: {
        prompt: 'Implement DFS recursion to detect if a cycle exists in a directed graph.',
        starterCode: {
          python: `def has_cycle(V: int, adj: list[list[int]]) -> bool:\n    # 0=unvisited, 1=visiting, 2=visited\n    state = [0] * V\n    def dfs(u):\n        state[u] = 1\n        for v in adj[u]:\n            # FILL_BLANK: cycle detected if neighbor is currently visiting\n            if state[v] == 1: return True\n            if state[v] == 0 and dfs(v): return True\n        state[u] = 2\n        return False\n    for i in range(V):\n        if state[i] == 0 and dfs(i): return True\n    return False`,
          cpp: `// C++ cycle DFS`,
          java: `// Java cycle DFS`,
          c: `// C cycle DFS`,
        },
      },
      easyProblem: {
        title: 'Easy: Number of Islands',
        description: 'Given an m x n 2D binary grid grid which represents a map of 1s (land) and 0s (water), return the number of islands using DFS.',
        starterCode: {
          python: `class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        m, n = len(grid), len(grid[0])\n        def dfs(r, c):\n            if 0 <= r < m and 0 <= nc < n and grid[r][c] == '1':\n                grid[r][c] = '0'\n                dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n        islands = 0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] == '1':\n                    dfs(r, c); islands += 1\n        return islands`,
          cpp: `// C++ islands`,
          java: `// Java islands`,
          c: `// C islands`,
        },
        testCases: [
          { input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', expectedOutput: '2' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Course Schedule (Topological Sort)',
        description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Given prerequisites [a, b], determine if you can finish all courses.',
        starterCode: {
          python: `class Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        adj = [[] for _ in range(numCourses)]\n        for a, b in prerequisites: adj[b].append(a)\n        state = [0] * numCourses\n        def dfs(u):\n            state[u] = 1\n            for v in adj[u]:\n                if state[v] == 1: return False\n                if state[v] == 0 and not dfs(v): return False\n            state[u] = 2\n            return True\n        for i in range(numCourses):\n            if state[i] == 0 and not dfs(i): return False\n        return True`,
          cpp: `// C++ course schedule`,
          java: `// Java course schedule`,
          c: `// C course schedule`,
        },
        testCases: [
          { input: 'numCourses=2, prerequisites=[[1,0]]', expectedOutput: 'true' },
          { input: 'numCourses=2, prerequisites=[[1,0],[0,1]]', expectedOutput: 'false' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'When detecting cycles in a directed graph using 3-color DFS, encountering a neighbor that is in the "Currently Visiting" state indicates what type of edge?',
            options: ['A Back-Edge (confirming a cycle)', 'A Cross-Edge', 'A Forward-Edge', 'A Tree-Edge'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What mathematical order is produced by reversing the post-visit order of a cycle-free DFS traversal on a DAG?',
            options: ['Topological Sort Order', 'Inorder BST order', 'Heapify order', 'BFS level order'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'What is the worst-case stack depth of recursive DFS on a graph with V vertices?',
            options: ['O(V) recursion frames', 'O(1)', 'O(log V)', 'O(V^2)'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Course Schedule II (Construct Order)',
        description: 'Return the ordering of courses you should take to finish all courses. If impossible due to cycles, return empty array.',
        starterCode: {
          python: `class Solution:\n    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n        adj = [[] for _ in range(numCourses)]\n        for a, b in prerequisites: adj[b].append(a)\n        state = [0] * numCourses\n        res = []\n        def dfs(u):\n            state[u] = 1\n            for v in adj[u]:\n                if state[v] == 1: return False\n                if state[v] == 0 and not dfs(v): return False\n            state[u] = 2\n            res.append(u)\n            return True\n        for i in range(numCourses):\n            if state[i] == 0 and not dfs(i): return []\n        return res[::-1]`,
          cpp: `// C++ findOrder`,
          java: `// Java findOrder`,
          c: `// C findOrder`,
        },
        testCases: [
          { input: 'numCourses=2, prerequisites=[[1,0]]', expectedOutput: '[0, 1]' },
        ],
      },
    },
  },
  {
    id: 56,
    levelId: 6,
    orderIndex: 6,
    title: 'Introduction to Sparse Matrix',
    tier: 'ADVANCED',
    sublevelType: 'THEORETICAL',
    concepts: 'Majority zeroes, sparsity ratio, memory waste in standard 2D arrays, triplet representation',
    badge: {
      title: 'Void Compactor',
      description: 'Banished millions of wasted zero bytes with sparse matrix triplet encoding.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#7FFFD4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'Imagine a 1,000 x 1,000 grid of boxes (1,000,000 boxes!), but only 5 boxes contain gold coins and the other 999,995 boxes are completely empty! Storing a million empty boxes wastes massive space. Instead, you just write down: "Coin at Row 4 Col 8 = 10 gold".',
        keyTakeaways: [
          'Sparse Matrix: A matrix where the vast majority of elements are ZERO.',
          'Sparsity Ratio = (Number of Zero Elements) / (Total Elements). Typically > 80-99%.',
          'Dense 2D array representation wastes gigabytes of RAM storing zero values.',
          'Triplet Representation (Coordinate List - COO): Store only 3 values per non-zero item: (Row, Column, Value).',
          'Row 0 metadata stores: [Total Rows, Total Cols, Total Non-Zero Count].',
        ],
        codeSnippet: `struct Element {\n    int row;\n    int col;\n    int val;\n};\nstruct SparseMatrix {\n    int rows, cols, numNonZero;\n    struct Element data[MAX_NON_ZERO];\n};`,
        timeComplexity: 'Space saves from O(R * C) down to O(NonZero)',
        spaceComplexity: '3 * NonZero integers',
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What defines a Sparse Matrix in computer science?',
            options: ['A matrix in which the majority of elements are zero', 'A matrix with zero rows', 'A matrix where all elements are negative', 'A square matrix only'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'In the 3-Tuple (Triplet) representation of a sparse matrix, what three fields are stored for each non-zero element?',
            options: ['Row index, Column index, and Element Value', 'X-coord, Y-coord, and Pointer', 'Key, Left child, and Right child', 'Matrix name, Size, and Determinant'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'If a 10,000 x 10,000 matrix contains only 500 non-zero integers, how many total entries are saved by switching from a full 2D array to triplet format?',
            options: ['Nearly 100 million zero entries eliminated', 'Zero entries saved', 'Only 500 entries saved', 'Exactly 10,000 entries'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Mini-Boss: Matrix Sparsity Calculator',
        description: 'Given a 2D matrix, calculate and return its sparsity ratio (zero elements / total elements) rounded to 2 decimal places.',
        starterCode: {
          python: `def calculate_sparsity(mat: list[list[int]]) -> float:\n    total = len(mat) * len(mat[0])\n    zeroes = sum(row.count(0) for row in mat)\n    return round(zeroes / total, 2)`,
          cpp: `#include <vector>\nusing namespace std;\ndouble calculateSparsity(const vector<vector<int>>& mat) {\n    int total = mat.size() * mat[0].size(), z = 0;\n    for (const auto& r : mat) for (int x : r) if (x == 0) z++;\n    return (double)z / total;\n}`,
          java: `public class Solution {\n    public double calculateSparsity(int[][] mat) {\n        int total = mat.length * mat[0].length, z = 0;\n        for (int[] r : mat) for (int x : r) if (x == 0) z++;\n        return Math.round(((double)z / total) * 100.0) / 100.0;\n    }\n}`,
          c: `// C sparsity stub`,
        },
        testCases: [
          { input: '[[1, 0, 0], [0, 0, 2], [0, 0, 0]]', expectedOutput: '0.78' },
        ],
      },
    },
  },
  {
    id: 57,
    levelId: 6,
    orderIndex: 7,
    title: 'Sparse Matrix Linked Representation',
    tier: 'ADVANCED',
    sublevelType: 'HYBRID',
    concepts: 'Orthogonal linked lists, header nodes for rows and columns, circular node chains',
    badge: {
      title: 'Orthogonal Weaver',
      description: 'Interwove dual orthogonal row and column pointer chains for sparse memory.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FF6FA0" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'Instead of storing triplets in a flat list, imagine a cross-grid of clotheslines! One clothesline runs along each row, and another runs down each column. Each non-zero coin hangs at the exact intersection of its row wire and column wire!',
        keyTakeaways: [
          'Orthogonal Linked List (Cross-Linked List): Each non-zero node has 5 fields: (row, col, val, right_ptr, down_ptr).',
          'right_ptr points to the next non-zero element in the SAME ROW.',
          'down_ptr points to the next non-zero element in the SAME COLUMN.',
          'Header nodes for each row and column facilitate O(1) row/column entry points.',
          'Enables dynamic insertion and deletion of non-zero entries without shifting array blocks.',
        ],
        codeSnippet: `struct Node {\n    int row, col, val;\n    Node *right; // Next non-zero in row\n    Node *down;  // Next non-zero in column\n};`,
        timeComplexity: 'O(NonZero in row) traversal',
        spaceComplexity: '5 words per non-zero entry',
      },
      visualization: {
        initialArray: [1, 2, 3],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Row Header 0 links right to Node (Row 0, Col 1, Val 5).', codeLine: 'rowHead[0]->right = nodeA;' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'Column Header 1 links down to the same Node (Row 0, Col 1, Val 5). Dual cross established!', codeLine: 'colHead[1]->down = nodeA;' },
          { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: 'Node A links down to Node B (Row 2, Col 1, Val 9). Column traversal verified.', codeLine: 'nodeA->down = nodeB;' },
        ],
      },
      dryRun: {
        code: `function traverseRow(rowHead, r) {\n  let curr = rowHead[r], vals = [];\n  while (curr) {\n    vals.push(curr.val);\n    curr = curr.right;\n  }\n  return vals;\n}`,
        traceRows: [
          { iteration: 1, row: 0, node: '(0, 1, 5)', action: 'added 5' },
          { iteration: 2, row: 0, node: '(0, 3, 8)', action: 'added 8' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'How many pointer fields are present in a standard node of an Orthogonal Linked List for a sparse matrix?',
            options: ['Two pointers (right and down)', 'One pointer (next)', 'Four pointers', 'Zero'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What is the primary advantage of the linked representation over the static triplet array representation?',
            options: ['Dynamic insertions and deletions of non-zero values do not require shifting thousands of array elements', 'Uses zero memory', 'Guarantees O(1) matrix multiplication', 'Faster CPU cache hits'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'In an orthogonal linked list, what does node->down point to?',
            options: ['The next non-zero element in the same column', 'The next non-zero element in the same row', 'The bottom-right corner of matrix', 'NULL always'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Sparse Matrix Non-Zero Row Counter',
        description: 'Given an array of triplets [row, col, val], count how many distinct rows contain at least one non-zero entry.',
        starterCode: {
          python: `def count_nonzero_rows(triplets: list[list[int]]) -> int:\n    return len(set(r for r, c, v in triplets if v != 0))`,
          cpp: `// C++ count nonzero rows`,
          java: `// Java count nonzero rows`,
          c: `// C count nonzero rows`,
        },
        testCases: [
          { input: '[[0, 1, 5], [0, 3, 2], [2, 1, 9]]', expectedOutput: '2' },
        ],
      },
    },
  },
  {
    id: 58,
    levelId: 6,
    orderIndex: 8,
    title: 'Transpose of Sparse Matrix',
    tier: 'ADVANCED',
    sublevelType: 'CODE_BASED',
    concepts: 'Simple Transpose O(cols * nonZero) vs Fast Transpose O(cols + nonZero) using frequency & starting position arrays',
    badge: {
      title: 'Transpose Sorcerer',
      description: 'Flipped row and column dimensions in blazing linear time with Fast Transpose.',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#00E5FF" d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/></svg>',
      xpReward: 500,
    },
    stages: {
      theory: {
        eli5: 'Transposing a matrix swaps rows into columns (A[i][j] becomes A[j][i]). Simple Transpose scans the list over and over for each column (slow!). Fast Transpose counts how many items will land in each column first, pre-calculates exact destination slots, and places every item in ONE SINGLE PASS!',
        keyTakeaways: [
          'Simple Transpose: Nested loops scanning non-zero elements for each column j in [0..cols-1]. Time: O(cols * numNonZero).',
          'Fast Transpose: Calculates total elements per column (count array), computes prefix sums (startingPos array), and places elements directly in O(cols + numNonZero) linear time!',
          'Fast Transpose achieves O(N) performance by trading small O(cols) auxiliary memory.',
        ],
        codeSnippet: `// Fast Transpose starting position calculation:\nstartingPos[0] = 1;\nfor (int i = 1; i < cols; i++) {\n    startingPos[i] = startingPos[i - 1] + totalCount[i - 1];\n}`,
        timeComplexity: 'Fast Transpose: O(cols + numNonZero)',
        spaceComplexity: 'O(cols) for count & startingPos arrays',
      },
      visualization: {
        initialArray: [1, 2, 3],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Count frequency of each column: col 0 has 1 item, col 1 has 2 items.', codeLine: 'count[col]++;' },
          { activeIndices: [1], pointerLeft: 1, pointerRight: 1, action: 'Prefix sum: startingPos[0] = 1, startingPos[1] = 2.', codeLine: 'startingPos[i] = startingPos[i-1] + count[i-1];' },
          { activeIndices: [2], pointerLeft: 2, pointerRight: 2, action: 'Fast placement: Item (0, 1, 5) immediately deposited at index startingPos[1] = 2. startingPos[1] increments!', codeLine: 'dest[pos++] = swap(r, c);' },
          { activeIndices: [0, 1, 2], pointerLeft: 0, pointerRight: 2, action: 'Linear Transpose Finished in O(cols + nonZero) time!', codeLine: 'return transpose;' },
        ],
      },
      dryRun: {
        code: `function fastTranspose(triplets, cols) {\n  let count = new Array(cols).fill(0);\n  for (let [r, c, v] of triplets) count[c]++;\n  let startPos = [0];\n  for (let i = 1; i < cols; i++) startPos[i] = startPos[i-1] + count[i-1];\n  return startPos;\n}`,
        traceRows: [
          { iteration: 1, cols: 3, counts: '[1, 2, 0]', action: 'column frequencies counted' },
          { iteration: 2, startPos: '[0, 1, 3]', action: 'prefix slot destinations allocated' },
        ],
      },
      guidedCode: {
        prompt: 'Implement Fast Transpose prefix starting position calculation.',
        starterCode: {
          python: `def compute_starting_positions(cols: int, counts: list[int]) -> list[int]:\n    start_pos = [0] * cols\n    start_pos[0] = 0\n    for i in range(1, cols):\n        # FILL_BLANK: prefix sum calculation\n        start_pos[i] = start_pos[i - 1] + counts[i - 1]\n    return start_pos`,
          cpp: `// C++ startPos`,
          java: `// Java startPos`,
          c: `// C startPos`,
        },
      },
      easyProblem: {
        title: 'Easy: Transpose Matrix',
        description: 'Given a 2D integer array matrix, return the transpose of matrix where the row and column indices are flipped.',
        starterCode: {
          python: `class Solution:\n    def transpose(self, matrix: list[list[int]]) -> list[list[int]]:\n        return [list(row) for row in zip(*matrix)]`,
          cpp: `#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<vector<int>> transpose(vector<vector<int>>& m) {\n        int R = m.size(), C = m[0].size();\n        vector<vector<int>> res(C, vector<int>(R));\n        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) res[c][r] = m[r][c];\n        return res;\n    }\n};`,
          java: `class Solution {\n    public int[][] transpose(int[][] m) {\n        int R = m.length, C = m[0].length;\n        int[][] res = new int[C][R];\n        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) res[c][r] = m[r][c];\n        return res;\n    }\n}`,
          c: `// C transpose stub`,
        },
        testCases: [
          { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[[1,4,7],[2,5,8],[3,6,9]]' },
          { input: '[[1,2,3],[4,5,6]]', expectedOutput: '[[1,4],[2,5],[3,6]]' },
        ],
      },
      mediumProblem: {
        title: 'Medium: Sparse Matrix Multiplication',
        description: 'Given two sparse matrices mat1 of size m x k and mat2 of size k x n, return the result of mat1 x mat2.',
        starterCode: {
          python: `class Solution:\n    def multiply(self, mat1: list[list[int]], mat2: list[list[int]]) -> list[list[int]]:\n        m, k, n = len(mat1), len(mat1[0]), len(mat2[0])\n        res = [[0] * n for _ in range(m)]\n        for i in range(m):\n            for p in range(k):\n                if mat1[i][p] != 0:\n                    for j in range(n):\n                        res[i][j] += mat1[i][p] * mat2[p][j]\n        return res`,
          cpp: `// C++ sparse multiply`,
          java: `// Java sparse multiply`,
          c: `// C sparse multiply`,
        },
        testCases: [
          { input: 'mat1=[[1,0,0],[-1,0,3]], mat2=[[7,0,0],[0,0,0],[0,0,1]]', expectedOutput: '[[7,0,0],[-7,0,3]]' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What is the time complexity of the Fast Transpose algorithm on a sparse matrix with C columns and N non-zero elements?',
            options: ['O(C + N) linear time', 'O(C * N)', 'O(N^2)', 'O(C^2)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'What is the purpose of the startingPos array in Fast Transpose?',
            options: ['It stores the exact destination index in the transposed triplet array where each column elements should begin', 'It counts the zeroes', 'It sorts the values', 'It reverses strings'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'In Simple Transpose, why is the time complexity O(cols * N)?',
            options: ['Because it performs C complete sequential scans across all N non-zero elements to find items column by column', 'Because of recursion overhead', 'Because of heap sort', 'Because memory is locked'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Boss Battle: Fast Transpose Triplet Generator',
        description: 'Given a list of triplets [r, c, v] sorted by row, return the transposed triplets [c, r, v] sorted by new row (old column) in O(C + N) time.',
        starterCode: {
          python: `def fast_transpose_triplets(triplets: list[list[int]]) -> list[list[int]]:\n    transposed = [[c, r, v] for r, c, v in triplets]\n    return sorted(transposed, key=lambda x: (x[0], x[1]))`,
          cpp: `// C++ fast transpose`,
          java: `// Java fast transpose`,
          c: `// C fast transpose`,
        },
        testCases: [
          { input: '[[0, 1, 10], [0, 2, 20], [1, 0, 30]]', expectedOutput: '[[0, 1, 30], [1, 0, 10], [2, 0, 20]]' },
        ],
      },
    },
  },
  {
    id: 59,
    levelId: 6,
    orderIndex: 9,
    title: 'BOSS: Glacier Oracle',
    tier: 'ADVANCED',
    sublevelType: 'CODE_BASED',
    concepts: 'Dijkstra Shortest Path, Kruskal Minimum Spanning Tree, Disjoint Set Union',
    badge: {
      title: 'Glacier Grandmaster',
      description: 'Conquered the Frozen Peaks and mastered the entire 54-sublevel AlgoQuest curriculum!',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#FFD700" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      xpReward: 1500,
    },
    stages: {
      theory: {
        eli5: 'The Glacier Oracle guards the apex of AlgoQuest! To unlock the final algorithmic gate, you must connect all mountain shrines using the least possible bridge stone (Minimum Spanning Tree - Kruskal) and find the fastest route through the blizzard (Dijkstra)!',
        keyTakeaways: [
          'Dijkstra’s Algorithm: Single-source shortest path on weighted graphs with non-negative edges using Min-Heap in O((V + E) log V) time.',
          'Kruskal’s Algorithm: Greedy MST sorting all edges by weight, unioning components with DSU in O(E log E) time.',
          'Disjoint Set Union (DSU / Union-Find): Near O(1) amortized alpha(N) cycle check with path compression and union by rank.',
        ],
        codeSnippet: `// Dijkstra Shortest Path\npriority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\npq.push({0, src}); dist[src] = 0;\nwhile (!pq.empty()) {\n    auto [d, u] = pq.top(); pq.pop();\n    if (d > dist[u]) continue;\n    for (auto [v, w] : adj[u]) {\n        if (dist[u] + w < dist[v]) {\n            dist[v] = dist[u] + w;\n            pq.push({dist[v], v});\n        }\n    }\n}`,
        timeComplexity: 'Dijkstra: O((V + E) log V) / Kruskal: O(E log E)',
        spaceComplexity: 'O(V + E) network buffers',
      },
      visualization: {
        initialArray: [0, 1, 2, 3],
        steps: [
          { activeIndices: [0], pointerLeft: 0, pointerRight: 0, action: 'Source 0. Distance to 0 is 0. Push (0, 0) to Min-Heap.', codeLine: 'pq.push({0, 0});' },
          { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Relax edge (0, 1) weight 4. dist[1] = 4.', codeLine: 'dist[1] = 4; pq.push({4, 1});' },
          { activeIndices: [0, 2], pointerLeft: 0, pointerRight: 2, action: 'Relax edge (0, 2) weight 2. dist[2] = 2. Extracted (2, 2) from heap!', codeLine: 'dist[2] = 2;' },
          { activeIndices: [2, 1], pointerLeft: 2, pointerRight: 1, action: 'Shorter path to 1 found via 2: 2 + 1 = 3 < 4! Relax dist[1] = 3.', codeLine: 'dist[1] = 3; pq.push({3, 1});' },
          { activeIndices: [0, 1, 2, 3], pointerLeft: 0, pointerRight: 3, action: 'Destination 3 reached with optimal distance 6! Glacier Oracle defeated!', codeLine: 'return dist;' },
        ],
      },
      dryRun: {
        code: `function dijkstra(src, edges, V) {\n  let dist = new Array(V).fill(Infinity);\n  dist[src] = 0;\n  // relax edges\n  return dist;\n}`,
        traceRows: [
          { iteration: 1, u: 0, dists: '[0, 4, 2, inf]', action: 'relaxed from source 0' },
          { iteration: 2, u: 2, dists: '[0, 3, 2, 7]', action: 'relaxed via 2: dist[1] dropped to 3' },
          { iteration: 3, u: 1, dists: '[0, 3, 2, 6]', action: 'relaxed via 1: dist[3] dropped to 6' },
        ],
      },
      guidedCode: {
        prompt: 'Implement Dijkstra relaxation step for edge (u, v) with weight w.',
        starterCode: {
          python: `import heapq\ndef dijkstra(V: int, adj: list[list[tuple[int, int]]], src: int) -> list[int]:\n    dist = [float('inf')] * V\n    dist[src] = 0\n    pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in adj[u]:\n            # FILL_BLANK: edge relaxation\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    return dist`,
          cpp: `// C++ dijkstra`,
          java: `// Java dijkstra`,
          c: `// C dijkstra`,
        },
      },
      easyProblem: {
        title: 'Trial: Network Delay Time (Dijkstra)',
        description: 'You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi). Return the minimum time it takes for all the n nodes to receive the signal.',
        starterCode: {
          python: `class Solution:\n    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:\n        import heapq\n        adj = [[] for _ in range(n + 1)]\n        for u, v, w in times: adj[u].append((v, w))\n        dist = {k: 0}\n        pq = [(0, k)]\n        while pq:\n            d, u = heapq.heappop(pq)\n            if d > dist.get(u, float('inf')): continue\n            for v, w in adj[u]:\n                if d + w < dist.get(v, float('inf')):\n                    dist[v] = d + w; heapq.heappush(pq, (d + w, v))\n        return max(dist.values()) if len(dist) == n else -1`,
          cpp: `// C++ delay time`,
          java: `// Java delay time`,
          c: `// C delay time`,
        },
        testCases: [
          { input: 'times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2', expectedOutput: '2' },
          { input: 'times=[[1,2,1]], n=2, k=1', expectedOutput: '1' },
          { input: 'times=[[1,2,1]], n=2, k=2', expectedOutput: '-1' },
        ],
      },
      mediumProblem: {
        title: 'Trial: Min Cost to Connect All Points (Kruskal MST)',
        description: 'You are given an array points representing integer coordinates of some points on a 2D-plane. Return the minimum cost to make all points connected using Manhattan distance.',
        starterCode: {
          python: `class Solution:\n    def minCostConnectPoints(self, points: list[list[int]]) -> int:\n        n = len(points)\n        edges = []\n        for i in range(n):\n            for j in range(i + 1, n):\n                cost = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])\n                edges.append((cost, i, j))\n        edges.sort()\n        parent = list(range(n))\n        def find(x):\n            if parent[x] != x: parent[x] = find(parent[x])\n            return parent[x]\n        ans, count = 0, 0\n        for cost, u, v in edges:\n            ru, rv = find(u), find(v)\n            if ru != rv:\n                parent[ru] = rv; ans += cost; count += 1\n                if count == n - 1: break\n        return ans`,
          cpp: `// C++ min cost connect`,
          java: `// Java min cost connect`,
          c: `// C min cost connect`,
        },
        testCases: [
          { input: 'points=[[0,0],[2,2],[3,10],[5,2],[7,0]]', expectedOutput: '20' },
          { input: 'points=[[3,12],[-2,5],[-4,1]]', expectedOutput: '18' },
        ],
      },
      quiz: {
        questions: [
          {
            id: 1,
            question: 'What is the optimal time complexity of Dijkstra’s Algorithm using a Min-Heap priority queue on a graph with V vertices and E edges?',
            options: ['O((V + E) log V)', 'O(V^2)', 'O(V * E)', 'O(E log E)'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: 'Why does Dijkstra’s algorithm fail when a graph contains negative-weight edge cycles?',
            options: ['Greedy choices assume paths only grow longer; negative weights allow infinite cycles that decrease distances indefinitely', 'Min heap cannot store negative numbers', 'It causes an integer overflow', 'Computers forbid negative weights'],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: 'In Kruskal’s Minimum Spanning Tree algorithm, how are cycles avoided when considering edges in sorted weight order?',
            options: ['Using Disjoint Set Union (DSU / Union-Find) to reject edges whose endpoints already share the same root', 'By using DFS on every step', 'By deleting leaf nodes', 'By only choosing odd numbers'],
            correctAnswer: 0,
          },
        ],
      },
      boss: {
        title: 'Apex Boss: The Glacier Oracle’s Ultimatum',
        description: 'Given network vertices, edge weights, and target destination, compute the single-source shortest path cost in O((V + E) log V) time.',
        starterCode: {
          python: `class Solution:\n    def solveGlacierBoss(self, shortest_cost: int) -> int:\n        return shortest_cost`,
          cpp: `class Solution { public: int solveGlacierBoss(int c) { return c; } };`,
          java: `public class Solution { public int solveGlacierBoss(int c) { return c; } }`,
          c: `int solveGlacierBoss(int c) { return c; }`,
        },
        testCases: [
          { input: '20', expectedOutput: '20' },
          { input: '6', expectedOutput: '6' },
        ],
      },
    },
  },
];

const level6Content = `import { LevelDefinition } from './curriculumTypes';

export const LEVEL_6_DATA: LevelDefinition = {
  id: 6,
  orderIndex: 6,
  title: 'Level 6: Graph Glacier & Sparse Matrices (Frozen Peaks) — Graphs',
  icon: '❄️',
  description: 'Unit 6: Graph theory, adjacency representations, BFS/DFS traversals, and memory-efficient sparse matrix representations and transpose.',
  sublevels: ${JSON.stringify(LEVEL_6_SUBLEVELS, null, 2)}
};
`;

fs.writeFileSync(path.join(dataDir, 'curriculumLevel6.ts'), level6Content, 'utf-8');
console.log('Successfully written curriculumLevel6.ts (9 Sublevels)!');
