# AlgoQuest 🎮⚔️

**AlgoQuest** is a production-grade, full-stack, retro pixel-art Data Structures & Algorithms (DSA) learning platform inspired by university syllabi, 16-bit RPG overworlds, and gamified Duolingo-style progression.

---

## 🌐 Live Production Deployments

AlgoQuest is deployed live on Vercel with dedicated production frontend and backend microservices:

| Service | Live Production URL | Description |
| :--- | :--- | :--- |
| **Frontend Web App** | [https://algoquest-dsa.vercel.app](https://algoquest-dsa.vercel.app) | Next.js 14 App Router, Monaco Editor, Zustand, Framer Motion |
| **Backend REST API** | [https://algoquest-api.vercel.app](https://algoquest-api.vercel.app) | Express, Prisma ORM, Judge0 Client, JWT Session Layer |
| **API Health Check** | [https://algoquest-api.vercel.app/health](https://algoquest-api.vercel.app/health) | Live service status & timestamp ping |

---

## 🌟 Key Features & Architectural Modules

### 1. 🗺️ Syllabus-Driven Curriculum (6 Units • 54 Sublevels)

Structured directly from university Data Structures syllabi and segmented across **3 Adaptive Difficulty Tiers** (`🟢 BEGINNER`, `🟡 INTERMEDIATE`, `🔴 ADVANCED`):

- **Unit 1: Basics of Data Structures (Level 1: Foundations Island)**
  - 1.1: Concept & Need of Data Structures `🟢 Beginner` • `THEORETICAL`
  - 1.2: Abstract Data Types (ADTs) `🟢 Beginner` • `THEORETICAL`
  - 1.3: Types of Data Structures (Linear vs Non-Linear) `🟢 Beginner` • `THEORETICAL`
  - 1.4: Operations on Data Structures `🟢 Beginner` • `THEORETICAL`
  - 1.5: Time Complexity & Big-O Notation `🟡 Intermediate` • `HYBRID`
  - 1.6: Space Complexity Analysis `🟡 Intermediate` • `HYBRID`
  - 1.7: BOSS: Foundations Guardian `🔴 Advanced` • `HYBRID`

- **Unit 2: Searching & Sorting (Level 2: Searching & Sorting Citadel)**
  - 2.1: Linear Search `🟢 Beginner` • `CODE_BASED`
  - 2.2: Binary Search (Iterative & Recursive) `🟢 Beginner` • `CODE_BASED`
  - 2.3: Sentinel Search & Fibonacci Search `🟡 Intermediate` • `CODE_BASED`
  - 2.4: Hashing & Collision Resolution `🟡 Intermediate` • `CODE_BASED`
  - 2.5: Bubble, Selection & Insertion Sort `🟢 Beginner` • `CODE_BASED`
  - 2.6: Merge Sort `🟡 Intermediate` • `CODE_BASED`
  - 2.7: Quick Sort `🟡 Intermediate` • `CODE_BASED`
  - 2.8: Radix Sort, Tim Sort & Shell Sort `🔴 Advanced` • `CODE_BASED`
  - 2.9: BOSS: Sort Master Trial `🔴 Advanced` • `CODE_BASED`

- **Unit 3: Stacks & Queues (Level 3: Stacks & Queues Sanctuary)**
  - 3.1: Stack Definition & Array Representation `🟢 Beginner` • `CODE_BASED`
  - 3.2: Stack ADT & Overflow/Underflow Conditions `🟢 Beginner` • `HYBRID`
  - 3.3: Stack Applications: Reversing a List & Parentheses Matching `🟡 Intermediate` • `CODE_BASED`
  - 3.4: Polish Notation: Infix to Postfix & Evaluation `🔴 Advanced` • `CODE_BASED`
  - 3.5: Queue Definition & Array Representation `🟢 Beginner` • `CODE_BASED`
  - 3.6: Queue ADT & Operations `🟢 Beginner` • `HYBRID`
  - 3.7: Linear Queue vs Circular Queue `🟡 Intermediate` • `CODE_BASED`
  - 3.8: Priority Queue & Deque (Double-Ended Queue) `🔴 Advanced` • `CODE_BASED`
  - 3.9: BOSS: Fortress Keeper `🔴 Advanced` • `CODE_BASED`

- **Unit 4: Linked Lists (Level 4: Linked Structures Labyrinth)**
  - 4.1: Linked List Terminologies & Memory Structure `🟢 Beginner` • `THEORETICAL`
  - 4.2: Singly Linked List: Insertion, Deletion & Traversal `🟢 Beginner` • `CODE_BASED`
  - 4.3: Doubly Linked List Operations `🟡 Intermediate` • `CODE_BASED`
  - 4.4: Circular Linked List Operations `🟡 Intermediate` • `CODE_BASED`
  - 4.5: Linked Representation of Stack & Queue `🟡 Intermediate` • `CODE_BASED`
  - 4.6: Dynamic Storage Management `🔴 Advanced` • `THEORETICAL`
  - 4.7: Memory Efficient Doubly Linked List (XOR Linked List) `🔴 Advanced` • `HYBRID`
  - 4.8: Unrolled Linked List `🔴 Advanced` • `HYBRID`
  - 4.9: Skip List `🔴 Advanced` • `HYBRID`
  - 4.10: BOSS: Chain Breaker `🔴 Advanced` • `CODE_BASED`

- **Unit 5: Trees (Level 5: Arboretum of Trees)**
  - 5.1: Tree Terminologies & Traversals Concept `🟢 Beginner` • `THEORETICAL`
  - 5.2: Types of Trees `🟢 Beginner` • `THEORETICAL`
  - 5.3: Recursive Traversals: Inorder, Preorder, Postorder `🟡 Intermediate` • `CODE_BASED`
  - 5.4: Binary Search Trees (BST): Insertion, Deletion, Search `🟡 Intermediate` • `CODE_BASED`
  - 5.5: Expression Trees `🟡 Intermediate` • `HYBRID`
  - 5.6: AVL Trees: Rotations & Balancing `🔴 Advanced` • `CODE_BASED`
  - 5.7: B-Tree & B+ Tree Concepts `🔴 Advanced` • `THEORETICAL`
  - 5.8: Heaps: Max-Heap & Min-Heap Operations `🔴 Advanced` • `CODE_BASED`
  - 5.9: Heap Sort Algorithm `🔴 Advanced` • `CODE_BASED`
  - 5.10: BOSS: Forest Ancient `🔴 Advanced` • `CODE_BASED`

- **Unit 6: Graphs & Sparse Matrices (Level 6: Graph Glacier & Frozen Peaks)**
  - 6.1: Graph Theory Basics & Terminologies `🟢 Beginner` • `THEORETICAL`
  - 6.2: Storage Representation: Adjacency Matrix & Adjacency List `🟡 Intermediate` • `CODE_BASED`
  - 6.3: Basic Graph Manipulation: Add/Remove Vertex & Edge `🟡 Intermediate` • `CODE_BASED`
  - 6.4: Breadth-First Search (BFS) Traversal `🔴 Advanced` • `CODE_BASED`
  - 6.5: Depth-First Search (DFS) Traversal `🔴 Advanced` • `CODE_BASED`
  - 6.6: Introduction to Sparse Matrix `🔴 Advanced` • `THEORETICAL`
  - 6.7: Sparse Matrix Linked Representation `🔴 Advanced` • `HYBRID`
  - 6.8: Transpose of Sparse Matrix `🔴 Advanced` • `CODE_BASED`
  - 6.9: BOSS: Glacier Oracle `🔴 Advanced` • `CODE_BASED`

---

### 2. ⚡ Judge0 Code Compiler Integration

AlgoQuest features a native cloud compiler engine powered by Judge0:

- **Supported Languages (Locked):**
  - **C** (Judge0 ID 50, Monaco `c`)
  - **C++** (Judge0 ID 54, Monaco `cpp`)
  - **Java** (Judge0 ID 62, Monaco `java`)
  - **Python 3** (Judge0 ID 71, Monaco `python`)
- **Unscored Run Code (`POST /api/v1/judge0/run`):**
  - Executes student code against public sample test cases.
  - Zero heart consumption, zero XP change — safe for unlimited student experimentation.
  - Returns formatted `stdout`, `stderr`, runtime milliseconds, memory usage, and execution status.
- **Scored Submit Code (`POST /api/v1/judge0/execute`):**
  - Executes against hidden and public test cases.
  - Heart Gate: Consumes 1 heart upon failure; blocked if user has 0 hearts (practice run remains available).
  - On full pass: Awards stage XP (+20 guided, +30 easy, +50 medium, +100 boss), advances user progress, and persists a `Submission` audit row.
  - Redacts sensitive hidden test cases on failure to maintain academic integrity.
- **Rate Limiting:**
  - Enforced per-user rate limiting: max **20 runs/minute** and **10 submits/minute** (returns HTTP 429 when exceeded).
- **Graceful Sandbox Fallback:**
  - Automated local evaluation fallback prevents downtime or external API outages from halting student quest progress.

---

### 3. 📈 Vercel Analytics Integration

- Installed and configured `@vercel/analytics` globally in `frontend/app/layout.tsx`.
- Real-time privacy-friendly metrics for active users, geographic reach, route transitions, and quest retention directly visible in the Vercel Dashboard.

---

### 4. 🧠 Adaptive Stage Engine

Sublevels dynamically scale their stage progression based on topic nature, eliminating unnecessary coding boilerplates for pure theory topics while preserving rigorous evaluation:

- **`THEORETICAL` (3 Stages):**
  `THEORY → QUIZ → MINI_BOSS`
- **`HYBRID` (5 Stages):**
  `THEORY → VISUALIZATION → DRY_RUN → QUIZ → BOSS`
- **`CODE_BASED` (8 Stages):**
  `THEORY → VISUALIZATION → DRY_RUN → GUIDED_CODE → EASY_PROBLEM → MEDIUM_PROBLEM → QUIZ → BOSS`

Dynamic progress meters reflect the exact stage denominator (`STAGE X OF 3`, `STAGE X OF 5`, or `STAGE X OF 8`), and stage buttons dynamically switch between `ENTER QUEST ▶` (initial) and `CONTINUE STAGE X ▶` (in-progress).

---

### 5. 🏅 16-Bit Pixel-Art Badge & Certificate System

Every completed sublevel awards a unique, hand-crafted **16-Bit Pixel-Art Medal of Honor**:

- **54 Unique Blocky Pixel-Art Sprites (`pixelBadgeCatalog`):** Crisp SVG `<rect>` sprites (`shape-rendering="crispEdges"`) — one custom relic/artifact per curriculum topic (scrolls, magnifying glasses, balance scales, linked chains, AVL trees, DFS torches, boss crowns, and more).
- **Arcade Octagonal Casings & CRT Aesthetics:** Stepped pixel-art octagonal bezels with subtle CRT vertical scanlines, 3D tilt hover physics, and `'Press Start 2P'` / `'Pixelify Sans'` typography:
  - 🟢 **Beginner**: Meadow Mint (`#7FFFD4` / `#6FCF97`) with emerald radiance.
  - 🟡 **Intermediate**: Sunset Gold (`#FFD93D` / `#FF8F00`) with golden flares.
  - 🔴 **Advanced / Boss**: Dungeon Neon (`#FF2FD4` / `#00F0FF`) with cyber-crimson glow.
  - 🔒 **Locked**: Deep Navy (`#1B2A4A`) silhouette casing with blocky pixel padlock.
- **RPG Quest Complete Celebration Modal:** Completing the final stage triggers a deep navy & gold modal (`QUEST COMPLETE!`), 8-bit sparkle bursts, floating pixel badge reveal, **+500 Bonus XP**, and `[ EQUIP TO PROFILE ]` / `[ SHARE CERTIFICATE ]` actions.
- **Profile Showcase Grid:** Filter all 54 medals across `ALL (54)`, `EARNED`, and `LOCKED`.
- **Verifiable Certificates:** Clicking any earned medal opens the **Official Certificate of Mastery** with unique verification IDs (`AQ-CERT-XX-XXXX`) and one-click portfolio sharing.

---

### 6. 🕹️ AlgoQuest Arcade & "Memory Match: DS Icons" Mini-Game

- **No-Code Cognitive Break Activity:** A retro Game Boy Advance / SNES style memory card matching mini-game located at `/arcade/memory-match` designed to reinforce core Data Structure vocabulary without writing code.
- **6 Hand-Crafted 16-Bit Pixel Card Pairs (12 Cards):**
  - `ARRAY`: Contiguous horizontal bar with indexed memory blocks `[1][2][3][4][5]`.
  - `STACK`: LIFO plate tower with glowing top plate and push/pop direction arrow.
  - `QUEUE`: FIFO queue with 4 pixel character sprites and directional dequeuing arrow.
  - `LINKED LIST`: Dynamic pointer chains `[A] → [B] → [C]`.
  - `TREE`: Hierarchical binary tree with root, branches, and leaf nodes.
  - `GRAPH`: Non-linear network of vertices connected by undirected pixel edges.
- **Dual-Engine 8-Bit Audio:** Synthesized instant Web Audio API chip square waves + PCM audio fallbacks for card flips, match chimes, error buzzers, and victory fanfares with persistent mute toggle.
- **Scoring & Rewards:** Time and moves bonus scoring, +10 Participation XP, +25 Victory XP for finishing under 60 seconds, and the exclusive **Memory Maestro** pixel badge for completing the game in ≤12 moves.
- **Arcade Tavern Hub & Dashboard Widget:** Complete `/arcade` showcase with personal best tracking, top 10 player leaderboard, and 1-click "Quick Break" launcher directly from the main dashboard.

---

### 7. 🎯 Locked Tier Expedition & Automatic Graduation Engine

- **Tier Selection at Login & Signup:** When creating an account or logging in, heroes choose their active expedition tier (`🟢 BEGINNER`, `🟡 INTERMEDIATE`, `🔴 ADVANCED`) with a single click.
- **Locked World Map View:** The World Map (`/roadmap`) is strictly locked to the hero's selected tier. Manual tier filters are removed so learners embark on an immersive, distraction-free syllabus path tailored to their exact level across all 6 Units.
- **Progress Milestone Tracking:** Live progress indicators track sectors conquered vs total sectors in the active tier (e.g. `0 / 16 BEGINNER SECTORS CLEARED`).
- **Sequential Unlocking:** The first sector of the hero's tier unlocks automatically; subsequent sectors unlock sequentially as previous sectors are conquered.
- **Automatic Tier Graduation:** Once a hero conquers all sectors of their active tier (e.g. completing all Beginner topics across all 6 Units):
  - **Auto-Promotion:** The engine automatically graduates the account to the next tier (`BEGINNER` → `INTERMEDIATE` → `ADVANCED`).
  - **Graduation Bonus:** Grants an immediate **+100 Gems Bonus 💎**.
  - **Celebration Modal:** Triggers the animated **Tier Promotion Modal** with confetti, golden trophy, and direct launch into the newly unlocked sector map.

---

### 8. 🎨 Overworld Parchment Theme & Mobile Viewport Containment

- **Unified Overworld Parchment Design:** Synchronized across `TheoryStage`, `DryRunStage`, `QuizStage`, and `ProblemStage` using warm parchment surfaces (`variant="parchment"`), deep navy pixel borders (`#1B2A4A`), gold rings (`#FFD93D`), and sky highlights (`#EAF4FC`) matching the sunlit pixel Biome & Skyline backdrops.
- **100% Seamless Pastel Gradient:** Replaced dull gray `bg-slate-50` with continuous pastel sunset gradients (`linear-gradient(180deg, #F3C8DD 0%, #C7D3F5 45%, #FCE4C8 100%)`) across all layouts.
- **Mobile Viewport Lock:**
  - Viewport metadata locked (`width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`).
  - Strict `width: 100%`, `max-width: 100vw`, and `overflow-x: hidden` constraints eliminate right-edge horizontal overflow and blank whitespace on mobile screens (`360px+`).
  - Responsive header widgets with collapsible hamburger drawer (`Menu` / `X`) for seamless mobile navigation.

---

### 9. 🛡️ Resilient Dual-Mode Architecture & Offline Hero Cache

- **Next.js Reverse Proxy:** Client-side API calls route via `/api/v1` and proxy through `frontend/next.config.js` rewrites to `https://algoquest-api.vercel.app/api/v1/:path*` (or local backend in development).
- **Guaranteed Signup & Auth Integrity:** Offline disk-persisted cache in `backend/src/services/auth.service.ts` ensures accounts, sessions, progress, and badges persist even during transient external database connection limits.
- **Zero Registration Downtime:** Anyone creating a new account or logging in is guaranteed a successful `HTTP 201 / 200` response with valid JWT access and refresh tokens.

---

## 🚀 Architecture & Tech Stack

```
algoquest/
├── frontend/          # Next.js 14 App Router, TypeScript, Tailwind CSS, Monaco Editor, Zustand, TanStack Query
├── backend/           # Node.js, TypeScript, Express, Prisma ORM, Judge0 Service, Jest
├── scripts/           # Pixel badge generators, curriculum generators, sound synthesis
├── adapters/          # Multi-agent configuration adapters
├── .agent/            # GSD & workflow automation definitions
├── .agents/           # Specialized agent roles & skills
├── .gsd/              # Planning/execution templates & architecture specs
├── .gitignore
└── README.md
```

### Frontend Stack

- **Framework:** Next.js 14+ (App Router)
- **Editor:** Monaco Editor (`@monaco-editor/react`) for C, C++, Java, Python
- **Analytics:** `@vercel/analytics`
- **Styling:** Tailwind CSS (Custom 16-bit retro pixel design system tokens)
- **State Management:** Zustand (`useUserStore`, `useStageStore`)
- **Data Fetching:** TanStack Query (React Query v5) with live cache invalidation
- **Animations:** Framer Motion (page transitions, XP counters, confetti)
- **Fonts:** `Press Start 2P`, `Pixelify Sans`, `Nunito`, `Fira Code`
- **Icons:** Lucide React

### Backend Stack

- **Runtime:** Node.js 18+ with TypeScript (strict mode)
- **Framework:** Express.js (Modular MVC architecture)
- **Database & ORM:** PostgreSQL + Prisma ORM (6 Units, 54 Sublevels, Badges & Submissions models)
- **Execution Engine:** Judge0 Cloud API + deterministic sandbox fallback
- **Testing:** Jest + Supertest (unit & integration test suites)
- **Auth:** JWT Access + Refresh tokens with bcryptjs password hashing

---

## 🔑 Pre-Configured Demo Hero Account

Log in immediately without registration:

- **Email / Username:** `bindagearyan@gmail.com` _(or `aryan`)_
- **Password:** `password123`

---

## 🕹 Quickstart & Local Setup

### 1. Backend Server

```bash
cd backend
npm install
npm run build
npm test
npm run dev
```

### 2. Frontend Application

```bash
cd frontend
npm install
npm run build
npm run dev
```

### 3. Deploying to Vercel

```bash
# Deploy Backend API
cd backend
npx vercel --prod --yes

# Deploy Frontend Web App
cd ../frontend
npx vercel --prod --yes
```

---

*Master DSA through Quests — Built for engineering students and retro game enthusiasts.*
