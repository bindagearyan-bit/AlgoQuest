# AlgoQuest 🎮⚔️

**AlgoQuest** is a full-stack, retro pixel-art Data Structures & Algorithms (DSA) learning platform inspired by 16-bit RPG overworlds and gamified Duolingo-style progression.

---

## 🌟 Key Features

1. **🗺️ World Map (Curriculum Progression View)**
   - Structured curriculum organized into **6 Biome Sectors** spanning Foundations to Advanced Algorithms:
     - **Level 1: Foundations Island (Beginner Village):** Complexity, Big-O, Arrays, Two-Pointer, Prefix Sum, Recursion.
     - **Level 2: Linear Structures Citadel (Central Castle):** Linked Lists, Sentinels, Stacks, Queues, Deque, Hashing, Heaps.
     - **Level 3: Non-Linear Floating Isles (Sky Windmills):** Binary Trees, BST, Self-Balancing AVL Trees, Tries, Disjoint Sets, Segment Trees.
     - **Level 4: Graph Glacier Fortress (Snow Mountain):** BFS, DFS, Shortest Paths, Topological Sort, Dijkstra, Bellman-Ford, MST.
     - **Level 5: Inferno Volcano Keep (Lava Realm):** Binary Search over answer space, Greedy, Backtracking, 1D/2D Dynamic Programming.
     - **Level 6: Skyward Sanctuary (Celestial Spire):** KMP, Rabin-Karp, Network Max-Flow, Bitmask DP, and Grandmaster Final Boss.
   - Clean, high-readability responsive List View displaying status tags (`CONQUERED`, `ACTIVE EXPEDITION`, `SEALED`), stage counts, and one-click entry into active sublevels.

2. **⚔️ 8-Stage Dungeon Gauntlet**
   Every topic is mastered through an 8-stage interactive pipeline:
   - **Stage 1 (Theory):** ELI5 conceptual mechanics, key invariants, time/space complexity bounds.
   - **Stage 2 (Visualization):** Interactive step-by-step memory buffer visualizer (e.g. 8-step dual-pointer convergence with neon RAM highlights).
   - **Stage 3 (Dry Run):** Trace table inspection stepping through iteration loops and variable states without compiling.
   - **Stage 4 (Guided Code):** Fill-in-the-blank code implementation with real-time test bench validation.
   - **Stage 5 (Easy Problem):** LeetCode-style starter code challenge with unit test evaluation.
   - **Stage 6 (Medium Problem):** Algorithmic problem with edge case constraints and complexity benchmarks.
   - **Stage 7 (Stage Quiz):** Multiple-choice conceptual mastery check with heart stake penalties.
   - **Stage 8 (Boss Gauntlet):** Epic battle against the sector boss in the dark obsidian arena.

3. **💻 Code Execution & Visual Debugger**
   - **Editor:** Monaco Editor (VS Code engine) styled as a retro pixel terminal.
   - **Languages:** C, C++, Java, and Python with live execution benchmarks.
   - **Synchronized Debugger Console:** Displays active code lines, memory buffers, and action logs.

4. **🛡️ Resilient Offline Architecture**
   - Seamless dual-mode database engine: connects to PostgreSQL via Prisma ORM when available, and automatically falls back to an in-memory cache when offline with zero downtime.
   - Instant authentication and progression tracking without database connection failures.
   - Pre-configured hero profile ready out-of-the-box (`aryan` / `bindagearyan@gmail.com`).

---

## 🚀 Architecture

```
algoquest/
├── frontend/          # Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand, TanStack Query
├── backend/           # Node.js, TypeScript, Express, Prisma ORM, Redis, Judge0
├── .gitignore
└── README.md
```

### Frontend Stack
- **Framework:** Next.js 14+ (App Router, Server & Client Components)
- **Styling:** Tailwind CSS (Custom retro pixel tokens and 16-bit color palettes)
- **State Management:** Zustand (`useUserStore`, `useStageStore`)
- **Data Fetching:** TanStack Query (React Query v5) with live caching and optimistic updates
- **Forms & Validation:** React Hook Form + Zod
- **Animations:** Framer Motion (page transitions, XP counters, confetti bursts)
- **Fonts:** `Press Start 2P`, `Pixelify Sans`, `Nunito`
- **Icons:** Lucide React

### Backend Stack
- **Runtime:** Node.js 18+ with TypeScript (strict mode)
- **Framework:** Express.js (Modular MVC: Routes → Controllers → Services → Prisma)
- **Database & ORM:** PostgreSQL + Prisma ORM (6 Levels, 50+ Sublevels, 400+ Stages)
- **Cache & Rate Limiting:** Redis with in-memory fallback
- **Auth:** JWT Access (15m) + Refresh (7d) tokens with bcryptjs hashing
- **Execution:** Judge0 Code Engine

---

## 🔗 Live Application URLs

* **Home / Landing Page:** [http://localhost:3000](http://localhost:3000)
* **World Map (List View):** [http://localhost:3000/roadmap](http://localhost:3000/roadmap)
* **Main Dashboard:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
* **Login Page:** [http://localhost:3000/login](http://localhost:3000/login)
* **Signup Page:** [http://localhost:3000/signup](http://localhost:3000/signup)
* **Adventurer Leaderboard:** [http://localhost:3000/leaderboard](http://localhost:3000/leaderboard)
* **Stage Visualizer:** [http://localhost:3000/sublevel/1/stage/2](http://localhost:3000/sublevel/1/stage/2)
* **Backend Health Check:** [http://localhost:5000/health](http://localhost:5000/health)

---

## 🔑 Pre-Configured Demo Hero Account

Log in immediately without registration:
- **Email / Username:** `bindagearyan@gmail.com` *(or `aryan`)*
- **Password:** `password123`

---

## 🕹 Quickstart & Local Setup

### 1. Backend Server
```bash
cd backend
npm install
npm run build
npm run dev
```
Backend API will start on `http://localhost:5000`.

### 2. Frontend Server
```bash
cd frontend
npm install
npm run build
npm start
```
Frontend Web App will be live on `http://localhost:3000`.
