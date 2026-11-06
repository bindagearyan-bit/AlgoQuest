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
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query v5)
- **Forms & Validation:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Code Editor:** Monaco Editor
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js 18+ with TypeScript
- **Framework:** Express.js (Modular MVC)
- **Database & ORM:** PostgreSQL + Prisma ORM
- **Cache & Rate Limiting:** Redis
- **Auth:** JWT (Access + Refresh tokens) + bcryptjs
- **Code Execution:** Judge0 Engine

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

