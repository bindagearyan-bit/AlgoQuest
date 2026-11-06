# AlgoQuest 🎮⚔️

AlgoQuest is a gamified, retro pixel-art Data Structures & Algorithms (DSA) learning platform inspired by Duolingo-style progression.

## 🚀 Architecture

```
algoquest/
├── frontend/          # Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand, TanStack Query
├── backend/           # Node.js, TypeScript, Express, Prisma ORM, Redis, Judge0
├── .gitignore
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router, Server & Client Components)
- **Styling:** Tailwind CSS (Custom Pixel Design System tokens)
- **State Management:** Zustand (`useUserStore`, `useStageStore`)
- **Data Fetching:** TanStack Query (React Query v5) with live polling and cache invalidation
- **Forms & Validation:** React Hook Form + Zod
- **Animations:** Framer Motion (XP counters, heart deductions, confetti bursts)
- **Code Editor:** Monaco Editor (VS Code Engine) with C, C++, Java, Python support
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js 18+ with TypeScript (strict mode)
- **Framework:** Express.js (Modular MVC: Routes → Controllers → Services → Prisma)
- **Database & ORM:** PostgreSQL + Prisma ORM (6 Levels, 50+ Sublevels, 400+ Stages)
- **Cache & Rate Limiting:** Redis with resilient in-memory fallback
- **Auth:** JWT Access (15m) + Refresh (7d) tokens with bcryptjs hashing
- **Code Execution:** Judge0 Engine

## 🔗 Integrated Endpoints & Flow

All 20 frontend pages communicate dynamically with the `/api/v1` backend engine:
1. `POST /api/v1/auth/signup` & `POST /api/v1/auth/login` — Authentication with automatic JWT cookie storage
2. `GET /api/v1/auth/me` & `GET /api/v1/user/stats` — Real-time hydration of TopNavBar (Hearts, XP, Streak, Gems)
3. `GET /api/v1/roadmap/levels` & `GET /api/v1/roadmap/sublevel/:id` — Sequential unlocking logic and visual stage roadmap
4. `POST /api/v1/stage/complete` — XP rewards calculation and automated next-stage unlocking
5. `POST /api/v1/gamification/heart/consume` — Real-time heart penalty deduction upon incorrect quiz answers
6. `POST /api/v1/judge0/execute` — Multi-language algorithmic evaluation against unit test cases

## 🕹 Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to start your quest!
