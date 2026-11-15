# AlgoQuest 🎮⚔️

**AlgoQuest** is a production-grade, full-stack, retro pixel-art Data Structures & Algorithms (DSA) learning platform inspired by university syllabi, 16-bit RPG overworlds, and gamified Duolingo-style progression.

---

## 🌐 Live Production Deployments

AlgoQuest is deployed live on Vercel with dedicated production frontend and backend microservices connected to Supabase PostgreSQL:

| Service | Live Production URL | Description |
| :--- | :--- | :--- |
| **Frontend Web App** | [https://algoquest-dsa.vercel.app](https://algoquest-dsa.vercel.app) | Next.js 14 App Router, Monaco Editor, Zustand, Framer Motion |
| **Daily Escape Room** | [https://algoquest-dsa.vercel.app/arcade/escape-room](https://algoquest-dsa.vercel.app/arcade/escape-room) | Flagship 10-room procedural daily dungeon with global sync |
| **Arcade Tavern Hub** | [https://algoquest-dsa.vercel.app/arcade](https://algoquest-dsa.vercel.app/arcade) | Arcade hub with daily streak flame, calendar & top 100 leaderboard |
| **Backend REST API** | [https://algoquest-api.vercel.app](https://algoquest-api.vercel.app) | Express, Prisma ORM, Judge0 Client, Supabase Pooler, JWT Session Layer |
| **API Health Check** | [https://algoquest-api.vercel.app/health](https://algoquest-api.vercel.app/health) | Live service status & timestamp ping |

---

## 🌟 Key Features & Architectural Modules

### 1. 🗺️ Syllabus-Driven Curriculum (6 Units • 54 Sublevels)

Structured directly from standard first-year engineering and university Data Structures syllabi, organized across **3 Adaptive Difficulty Tiers** (`🟢 BEGINNER`, `🟡 INTERMEDIATE`, `🔴 ADVANCED`):

- **Unit 1: Basics of Data Structures (Level 1: Foundations Island)**
  - 1.1: Concept & Need of Data Structures `🟢 Beginner` • `THEORETICAL (3 Stages — No Code)`
  - 1.2: Abstract Data Types (ADTs) `🟢 Beginner` • `THEORETICAL (3 Stages — No Code)`
  - 1.3: Types of Data Structures (Linear vs Non-Linear) `🟢 Beginner` • `THEORETICAL (3 Stages — No Code)`
  - 1.4: Operations on Data Structures `🟢 Beginner` • `HYBRID`
  - 1.5: Time Complexity & Big-O Notation `🟡 Intermediate` • `HYBRID`
  - 1.6: Space Complexity Analysis `🟡 Intermediate` • `HYBRID`
  - 1.7: BOSS: Foundations Guardian (Time & Space Analysis) `🔴 Advanced` • `HYBRID`

- **Unit 2: Searching & Sorting (Level 2: Searching & Sorting Citadel)**
  - 2.1: Linear Search `🟢 Beginner` • `CODE_BASED`
  - 2.2: Binary Search (Iterative & Recursive) `🟢 Beginner` • `CODE_BASED`
  - 2.3: Sentinel Search & Fibonacci Search `🟡 Intermediate` • `CODE_BASED`
  - 2.4: Hashing & Collision Resolution `🟡 Intermediate` • `CODE_BASED`
  - 2.5: Bubble, Selection & Insertion Sort `🟢 Beginner` • `CODE_BASED`
  - 2.6: Merge Sort `🟡 Intermediate` • `CODE_BASED`
  - 2.7: Quick Sort `🟡 Intermediate` • `CODE_BASED`
  - 2.8: Radix Sort, Tim Sort & Shell Sort `🔴 Advanced` • `CODE_BASED`
  - 2.9: BOSS: Sort Master Trial ($k$-th Smallest Element Challenge) `🔴 Advanced` • `CODE_BASED`

- **Unit 3: Stacks & Queues (Level 3: Stacks & Queues Sanctuary)**
  - 3.1: Stack Definition & Array Representation (Push/Pop/Peek) `🟢 Beginner` • `CODE_BASED`
  - 3.2: Stack ADT & Overflow/Underflow Conditions `🟢 Beginner` • `HYBRID`
  - 3.3: Stack Applications: Reversing a List & Parentheses Matching `🟡 Intermediate` • `CODE_BASED`
  - 3.4: Polish Notation: Infix to Postfix & Evaluation `🔴 Advanced` • `CODE_BASED`
  - 3.5: Queue Definition & Array Representation (Front/Rear Indices) `🟢 Beginner` • `CODE_BASED`
  - 3.6: Queue ADT & Operations `🟢 Beginner` • `HYBRID`
  - 3.7: Linear Queue vs Circular Queue `🟡 Intermediate` • `CODE_BASED`
  - 3.8: Priority Queue & Deque (Double-Ended Queue) `🔴 Advanced` • `CODE_BASED`
  - 3.9: BOSS: Fortress Keeper (Balanced Parentheses Validation `{[()]}`) `🔴 Advanced` • `CODE_BASED`

- **Unit 4: Linked Lists (Level 4: Linked Structures Labyrinth)**
  - 4.1: Linked List Terminologies & Memory Structure `🟢 Beginner` • `THEORETICAL (3 Stages — No Code)`
  - 4.2: Singly Linked List: Insertion, Deletion & Traversal `🟢 Beginner` • `CODE_BASED`
  - 4.3: Doubly Linked List Operations `🟡 Intermediate` • `CODE_BASED`
  - 4.4: Circular Linked List Operations `🟡 Intermediate` • `CODE_BASED`
  - 4.5: Linked Representation of Stack & Queue `🟡 Intermediate` • `CODE_BASED`
  - 4.6: Dynamic Storage Management `🔴 Advanced` • `THEORETICAL (3 Stages — No Code)`
  - 4.7: Memory Efficient Doubly Linked List (XOR Linked List) `🔴 Advanced` • `HYBRID`
  - 4.8: Unrolled Linked List `🔴 Advanced` • `HYBRID`
  - 4.9: Skip List `🔴 Advanced` • `HYBRID`
  - 4.10: BOSS: Chain Breaker (In-Place Iterative List Reversal) `🔴 Advanced` • `CODE_BASED`

- **Unit 5: Trees (Level 5: Arboretum of Trees)**
  - 5.1: Tree Terminologies & Traversals Concept `🟢 Beginner` • `THEORETICAL (3 Stages — No Code)`
  - 5.2: Types of Trees `🟢 Beginner` • `THEORETICAL (3 Stages — No Code)`
  - 5.3: Recursive Traversals: Inorder, Preorder, Postorder `🟡 Intermediate` • `CODE_BASED`
  - 5.4: Binary Search Trees (BST): Insertion, Deletion, Search `🟡 Intermediate` • `CODE_BASED`
  - 5.5: Expression Trees `🟡 Intermediate` • `HYBRID`
  - 5.6: AVL Trees: Rotations & Balancing `🔴 Advanced` • `CODE_BASED`
  - 5.7: B-Tree & B+ Tree Concepts `🔴 Advanced` • `THEORETICAL (3 Stages — No Code)`
  - 5.8: Heaps: Max-Heap & Min-Heap Operations `🔴 Advanced` • `CODE_BASED`
  - 5.9: Heap Sort Algorithm `🔴 Advanced` • `CODE_BASED`
  - 5.10: BOSS: Forest Ancient (BST Node Search & Validation) `🔴 Advanced` • `CODE_BASED`

- **Unit 6: Graphs & Sparse Matrices (Level 6: Graph Glacier & Frozen Peaks)**
  - 6.1: Graph Theory Basics & Terminologies `🟢 Beginner` • `THEORETICAL (3 Stages — No Code)`
  - 6.2: Storage Representation: Adjacency Matrix & Adjacency List `🟡 Intermediate` • `CODE_BASED`
  - 6.3: Basic Graph Manipulation: Add/Remove Vertex & Edge `🟡 Intermediate` • `CODE_BASED`
  - 6.4: Breadth-First Search (BFS) Traversal `🔴 Advanced` • `CODE_BASED`
  - 6.5: Depth-First Search (DFS) Traversal `🔴 Advanced` • `CODE_BASED`
  - 6.6: Introduction to Sparse Matrix `🔴 Advanced` • `THEORETICAL (3 Stages — No Code)`
  - 6.7: Sparse Matrix Linked Representation `🔴 Advanced` • `HYBRID`
  - 6.8: Transpose of Sparse Matrix `🔴 Advanced` • `CODE_BASED`
  - 6.9: BOSS: Glacier Oracle (BFS Shortest Distance Traversal) `🔴 Advanced` • `CODE_BASED`

---

### 2. 🎓 First-Year Student DSA Architecture & Topic-Accurate Boss Battles

- **Eliminated Generic Boilerplates:** Completely purged generic Two-Sum loops across all topics, replacing them with textbook-canonical challenges tailored to each DSA concept.
- **First-Year Friendly Starter Templates:** Every coding stage provides clean starter code in **C, C++, Java, and Python** with clear `// TODO` step-by-step guidance, standard signatures, and readable naming conventions.
- **Pure No-Code Experience for Theoretical Sublevels:**
  - All purely theoretical topics (Sublevels 1, 2, 3, 31, 36, 41, 42, 47, 51, 56) are strictly capped at 3 stages:
    `Stage 1: Theory` $\rightarrow$ `Stage 2: Foundations Quiz` $\rightarrow$ `Stage 3: 👑 Mini-Boss Oracle Trial`.
  - **Zero code editor / compiler:** Stage 3 launches an interactive conceptual challenge instead of opening Monaco Editor or Judge0.

---

### 3. 🗄️ Supabase Cloud PostgreSQL Database

- **Dual-Connection Architecture:**
  - **Transaction Mode Pooler (`DATABASE_URL`):** Connects to AWS Singapore (`aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`) for fast, connection-pooled query execution in serverless runtimes.
  - **Session Mode Direct (`DIRECT_URL`):** Connects to port `5432` for Prisma migrations and schema synchronization (`prisma db push`).
- **Live Models & Data Integrity:**
  - `User`: native PostgreSQL UUIDs, experience points, gems, hearts, streak counts, and daily escape room progress (`dailyEscapeStreak`, `longestEscapeStreak`, `lastEscapeDate`).
  - `Level` & `Sublevel`: full 6-unit curriculum definitions with tier requirements and sublevel types.
  - `Stage`, `Problem`, `TestCase`: topic-accurate starters, sample inputs, and hidden test cases.
  - `UserProgress`, `Submission`, `Badge`, `UserBadge`: complete gamification state audit trail.
  - `DailyEscapeRun`: scoped daily completion logs with time elapsed, lives remaining, and flawless verification.
- **Failover Memory Store:** Built-in in-memory fallback layer ensures registration, sessions, and guest trials stay 100% operational even during transient database maintenance.

---

### 4. 🕹️ AlgoQuest Arcade — Flagship "Daily Algorithm Escape Room"

The arcade has been completely upgraded: the legacy Memory Match game was fully replaced with the **Daily Algorithm Escape Room** — an engaging 10-room procedurally generated dungeon:

- **Deterministic Date-Seeded Dungeon Engine:** Generated procedurally every day at 00:00 UTC (`/arcade/escape-room`). All players worldwide attempt the exact same daily dungeon seeded from the UTC date string (`YYYY-MM-DD`) via a deterministic Mulberry32 PRNG. Zero AI, zero external APIs, zero LLM costs.
- **10 First-Year Friendly Procedural Rooms (Zero Typing, 1-2 Tap Logic):**
  1. `Room 1 — Array Indexing Hall`: 4 themed pixel floor tiles (`[0]` to `[3]`). Learner steps on `Items[X]`.
  2. `Room 2 — Boundary Spike Pit`: Learner identifies the invalid index triggering `IndexOutOfBounds` for array length $N$.
  3. `Room 3 — Stack Rune Pillar (LIFO)`: Interactive vertical pillar where player pops runes until the target rune is on top.
  4. `Room 4 — Stack Overflow / Underflow Trap`: Choose `[POP BRICK]` or `[PUSH BRICK]` to prevent memory overflow/underflow under capacity limits.
  5. `Room 5 — Queue Dungeon Gate (FIFO) — CHECKPOINT ROOM`: Identify the first queued adventurer to exit. **Triggers Checkpoint save!**
  6. `Room 6 — Loop Counter Bridge`: Determine exact plank traversal count from Fira Code loop snippets (`for (int i = 0; i < N; i++)`).
  7. `Room 7 — If-Else Gate`: Evaluate branching depth logic to unlock the RED or GREEN door.
  8. `Room 8 — Linked List Chain`: Identify where the tail node's next pointer terminates (`NULL`).
  9. `Room 9 — Recursion Portal`: Step through the true base case portal to escape infinite call stack recursion.
  10. `Room 10 — Final Boss Logic Vault`: Insert 3 collected dungeon keys in the vault's required sequence to escape.
- **Gameplay & Retention Rules:**
  - **180-Second Timer & 5 Room Lives:** Visual HUD with color-shifting timer bar, 5 pixel hearts, and collected keys tray.
  - **Global Hearts Independence:** Fully playable at 0 main-app hearts (uses independent Room Lives).
  - **Checkpoint Respawn:** Clearing Room 5 saves a checkpoint; later failures at Room 6+ offer a respawn with 2 bonus checkpoint lives.
  - **Daily Streaks & Milestones:** Daily streak increments upon clearing Room 10. Milestone modals award rewards at 3, 7, 14, 30, and 100 days (`Week Survivor`, `Dungeon Legend`, `Immortal Escapist`).
  - **Lucky Chest:** Every 5th consecutive daily completion unlocks a randomized loot drop (+50–200 XP, +10–50 Gems).
  - **Date-Stamped Daily Badges:** Permanent unique badges minted per date (`Escapist of [Date]`), with a gold-tier variant for flawless runs (all 5 lives intact).
  - **Escape Calendar & Practice Mode:** Monthly pixel grid displaying past statuses. Tap any past date to launch unlimited unscored Practice runs.
  - **Top 100 Daily Global Leaderboard:** Date-scoped global leaderboard with a dedicated "Flawless Only" filter.
  - **1-Click Share Card:** HTML5 Canvas pixel share card export with time, lives, rank, streak, and `#AlgoQuestDaily` tag.
  - **Pure Web Audio API 8-Bit Chiptune Synthesizer (`dungeonAudio.ts`):** Authentic square/triangle wave sound effects for correct chimes, wrong buzzes, door creaks, checkpoint jingles, victory fanfares, and defeat synths with persistent mute control.

---

### 5. ⚡ Judge0 Code Compiler Integration

AlgoQuest features a cloud compiler engine powered by Judge0:

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

### 6. 📈 Vercel Analytics Integration

- Installed and configured `@vercel/analytics` globally in `frontend/app/layout.tsx`.
- Real-time privacy-friendly metrics for active users, geographic reach, route transitions, and quest retention directly visible in the Vercel Dashboard.

---

### 7. 🧠 Adaptive Stage Engine

Sublevels dynamically scale their stage progression based on topic nature, eliminating unnecessary coding boilerplates for pure theory topics while preserving rigorous evaluation:

- **`THEORETICAL` (3 Stages):**
  `THEORY → QUIZ → MINI_BOSS`
- **`HYBRID` (5 Stages):**
  `THEORY → VISUALIZATION → DRY_RUN → QUIZ → BOSS`
- **`CODE_BASED` (8 Stages):**
  `THEORY → VISUALIZATION → DRY_RUN → GUIDED_CODE → EASY_PROBLEM → MEDIUM_PROBLEM → QUIZ → BOSS`

Dynamic progress meters reflect the exact stage denominator (`STAGE X OF 3`, `STAGE X OF 5`, or `STAGE X OF 8`), and stage buttons dynamically switch between `ENTER QUEST ▶` (initial) and `CONTINUE STAGE X ▶` (in-progress).

---

### 8. 🏅 16-Bit Pixel-Art Badge & Certificate System

Every completed sublevel awards a unique, hand-crafted **16-Bit Pixel-Art Medal of Honor**:

- **54 Unique Blocky Pixel-Art Sprites (`pixelBadgeCatalog`):** Crisp SVG `<rect>` sprites (`shape-rendering="crispEdges"`) — one custom relic/artifact per curriculum topic.
- **Arcade Octagonal Casings & CRT Aesthetics:** Stepped pixel-art octagonal bezels with subtle CRT vertical scanlines, 3D tilt hover physics, and `'Press Start 2P'` / `'Pixelify Sans'` typography:
  - 🟢 **Beginner**: Meadow Mint (`#7FFFD4` / `#6FCF97`) with emerald radiance.
  - 🟡 **Intermediate**: Sunset Gold (`#FFD93D` / `#FF8F00`) with golden flares.
  - 🔴 **Advanced / Boss**: Dungeon Neon (`#FF2FD4` / `#00F0FF`) with cyber-crimson glow.
  - 🔒 **Locked**: Deep Navy (`#1B2A4A`) silhouette casing with blocky pixel padlock.
- **RPG Quest Complete Celebration Modal:** Completing the final stage triggers a deep navy & gold modal (`QUEST COMPLETE!`), 8-bit sparkle bursts, floating pixel badge reveal, **+500 Bonus XP**, and `[ EQUIP TO PROFILE ]` / `[ SHARE CERTIFICATE ]` actions.
- **Profile Showcase Grid:** Filter all medals across `ALL`, `EARNED`, and `LOCKED`.
- **Verifiable Certificates:** Clicking any earned medal opens the **Official Certificate of Mastery** with unique verification IDs (`AQ-CERT-XX-XXXX`) and one-click portfolio sharing.

---

### 9. 🎯 Locked Tier Expedition & Automatic Graduation Engine

- **Tier Selection at Login & Signup:** When creating an account or logging in, heroes choose their active expedition tier (`🟢 BEGINNER`, `🟡 INTERMEDIATE`, `🔴 ADVANCED`) with a single click.
- **Locked World Map View:** The World Map (`/roadmap`) is strictly locked to the hero's selected tier. Manual tier filters are removed so learners embark on an immersive, distraction-free syllabus path tailored to their exact level across all 6 Units.
- **Progress Milestone Tracking:** Live progress indicators track sectors conquered vs total sectors in the active tier.
- **Sequential Unlocking:** The first sector of the hero's tier unlocks automatically; subsequent sectors unlock sequentially as previous sectors are conquered.
- **Automatic Tier Graduation:** Once a hero conquers all sectors of their active tier:
  - **Auto-Promotion:** The engine automatically graduates the account to the next tier (`BEGINNER` → `INTERMEDIATE` → `ADVANCED`).
  - **Graduation Bonus:** Grants an immediate **+100 Gems Bonus 💎**.
  - **Celebration Modal:** Triggers the animated **Tier Promotion Modal** with confetti, golden trophy, and direct launch into the newly unlocked sector map.

---

### 10. 🎨 Overworld Parchment Theme & Mobile Viewport Containment

- **Unified Overworld Parchment Design:** Synchronized across `TheoryStage`, `DryRunStage`, `QuizStage`, and `ProblemStage` using warm parchment surfaces (`variant="parchment"`), deep navy pixel borders (`#1B2A4A`), gold rings (`#FFD93D`), and sky highlights (`#EAF4FC`).
- **100% Seamless Pastel Gradient:** Continuous pastel sunset gradients (`linear-gradient(180deg, #F3C8DD 0%, #C7D3F5 45%, #FCE4C8 100%)`) across all layouts.
- **Mobile Viewport Lock:**
  - Viewport metadata locked (`width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no`).
  - Strict `width: 100%`, `max-width: 100vw`, and `overflow-x: hidden` constraints eliminate right-edge horizontal overflow on mobile screens (`360px+`).
  - Responsive header widgets with collapsible hamburger drawer (`Menu` / `X`) for seamless mobile navigation.

---

## 🚀 Architecture & Tech Stack

```
algoquest/
├── frontend/          # Next.js 14 App Router, TypeScript, Tailwind CSS, Monaco Editor, Zustand, TanStack Query
│   ├── app/           # App Router pages ((dashboard), (auth), arcade/escape-room, roadmap, sublevel, profile)
│   ├── components/    # Pixel UI components, 10-room escape engine, stages, visualizers, gamification modals
│   ├── lib/           # Web Audio synthesizer, Judge0 API client, Supabase auth layer, pixel badge catalog
│   └── public/        # Pixel art illustrations, backgrounds, and retro sprites
├── backend/           # Node.js, TypeScript, Express, Prisma ORM, Judge0 Service, Jest
│   ├── src/           # Controllers, routes, services, middleware, deterministic dungeon generator
│   ├── prisma/        # Supabase PostgreSQL schema, migrations & syllabus seed data
│   └── tests/         # Supertest & Jest integration test suites (20/20 passing)
├── scripts/           # Pixel badge generators, sound synthesis scripts
├── adapters/          # Multi-agent configuration adapters
├── .agent/            # GSD & workflow automation definitions
├── .agents/           # Specialized agent roles & skills
├── .gsd/              # Planning/execution templates & architecture specs
└── README.md
```

### Frontend Stack

- **Framework:** Next.js 14+ (App Router)
- **Editor:** Monaco Editor (`@monaco-editor/react`) for C, C++, Java, Python
- **Analytics:** `@vercel/analytics`
- **Audio:** Native Web Audio API 8-Bit Chiptune Synthesizer (`dungeonAudio.ts`)
- **Styling:** Tailwind CSS (Custom 16-bit retro pixel design system tokens)
- **State Management:** Zustand (`useUserStore`, `useStageStore`)
- **Data Fetching:** TanStack Query (React Query v5) with live cache invalidation
- **Animations:** Framer Motion (page transitions, XP counters, confetti)
- **Fonts:** `Press Start 2P`, `Pixelify Sans`, `Nunito`, `Fira Code`
- **Icons:** Lucide React

### Backend Stack

- **Runtime:** Node.js 18+ with TypeScript (strict mode)
- **Framework:** Express.js (Modular MVC architecture)
- **Database & ORM:** Supabase PostgreSQL + Prisma ORM (Pooled + Direct connections, 54 Sublevels, Badges, DailyEscapeRun, Submissions)
- **Execution Engine:** Judge0 Cloud API + deterministic sandbox fallback
- **Dungeon Engine:** Deterministic Date-Seeded Mulberry32 PRNG (Global UTC reset)
- **Testing:** Jest + Supertest (20 integration tests across Auth, Stages, Arcade, Gamification)
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
npm run prisma:generate
npm run prisma:push
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
# Deploy Backend API to production
cd backend
npx vercel --prod --yes

# Deploy Frontend Web App to production
cd ../frontend
npx vercel --prod --yes
```

---

*Master DSA through Quests — Built for engineering students and retro game enthusiasts.*

