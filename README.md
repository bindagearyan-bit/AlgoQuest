# AlgoQuest Backend API 🚀

A production-grade REST API for **AlgoQuest** — a gamified, Duolingo-style Data Structures & Algorithms (DSA) learning platform designed to take developers from fundamentals to mastery through interactive stages, visual lessons, and gamified incentives.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-teal.svg)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-Cache-red.svg)](https://redis.io/)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen.svg)]()

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js (v18+) |
| **Language** | TypeScript (v5.7) with strict type-checking |
| **Framework** | Express.js (v5.x) |
| **Database** | PostgreSQL + Prisma ORM (v5.22) |
| **Cache & Sessions** | Redis |
| **Authentication** | JWT (Access & Refresh tokens) + Passport OAuth (Google & GitHub) |
| **Validation** | Zod (v4.x) schema validation |
| **Logging** | Winston structured JSON logger |
| **Testing** | Jest + Supertest (unit & API integration tests) |
| **API Documentation** | Swagger / OpenAPI 3.0 via `swagger-ui-express` |

---

## Project Structure

```
algoquest/
├── prisma/
│   ├── schema.prisma       # Prisma relational database schema
│   └── seed.ts             # Database seeder (sample levels, problems, demo user)
├── src/
│   ├── @types/             # Ambient type augmentations
│   ├── config/             # Database, Redis, Environment, Passport, and Swagger configs
│   │   ├── database.ts
│   │   ├── env.ts
│   │   ├── passport.ts
│   │   ├── redis.ts
│   │   └── swagger.ts
│   ├── middleware/         # Security, auth, validation, and error middlewares
│   │   ├── authGuard.ts    # JWT verification & optional auth middleware
│   │   ├── errorHandler.ts # Global error handling (Zod, Prisma, AppError)
│   │   ├── rateLimiter.ts  # Express rate limiters
│   │   └── validate.ts     # Zod request payload validator
│   ├── modules/
│   │   ├── auth/           # Signup, login, token refresh, logout, OAuth
│   │   ├── user/           # User profile management and progress
│   │   ├── content/        # Levels, sublevels, stages, problems, test cases
│   │   └── gamification/   # XP progression, leagues, streaks
│   ├── utils/              # Helper utilities
│   │   ├── errors.ts       # Typed application error classes
│   │   ├── jwt.ts          # Access & refresh token signing and verification
│   │   ├── logger.ts       # Winston logger setup
│   │   └── response.ts     # Standardized JSON response formatters
│   ├── __tests__/          # Automated test suites
│   │   └── auth.test.ts    # Auth endpoints & health check integration tests
│   ├── app.ts              # Express application factory & middleware pipeline
│   └── server.ts           # Server bootstrap and graceful shutdown handler
├── jest.config.ts          # Jest test configuration
├── package.json            # Scripts & dependencies
├── tsconfig.json           # TypeScript configuration
└── .env.example            # Environment variables template
```

---

## Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: v14 or higher
- **Redis**: v6 or higher

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/bindagearyan-bit/AlgoQuest.git
cd AlgoQuest
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and provide your database and secret credentials:

```bash
cp .env.example .env
```

Key environment configurations:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/algoquest?schema=public"
REDIS_URL="redis://localhost:6379"

JWT_ACCESS_SECRET="your-super-secret-access-token-key-min-16-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-token-key-min-16-chars"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

FRONTEND_URL="http://localhost:3000"
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173"
```

### 3. Database Migration & Seeding

Generate the Prisma client, apply database migrations, and seed initial topics and problems:

```bash
# Generate Prisma client
npm run prisma:generate

# Apply migrations
npm run prisma:migrate

# Seed database with initial levels, sublevels, and problems
npm run prisma:seed
```

### 4. Run Development Server

```bash
npm run dev
```

- API Base URL: `http://localhost:3000`
- Swagger UI Docs: `http://localhost:3000/api/docs`
- Health Endpoint: `http://localhost:3000/health`

---

## API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/signup` | Public | Register new user account with email & password |
| `POST` | `/login` | Public | Authenticate user credentials and return JWT tokens |
| `POST` | `/refresh-token` | Public | Exchange valid refresh token for a new access token |
| `POST` | `/logout` | Public | Invalidate refresh token in Redis |
| `GET` | `/google` | Public | Initiate Google OAuth 2.0 flow |
| `GET` | `/google/callback` | Public | Google OAuth callback handler |
| `GET` | `/github` | Public | Initiate GitHub OAuth 2.0 flow |
| `GET` | `/github/callback` | Public | GitHub OAuth callback handler |

### 👤 User Profile & Progress (`/api/user`)

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/profile` | Bearer JWT | Fetch current authenticated user's profile |
| `PUT` | `/profile` | Bearer JWT | Update user name, avatar, or learning level |
| `GET` | `/progress` | Bearer JWT | Retrieve user learning progress and completion status |

### 📚 Learning Content (`/api`)

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/levels` | Optional JWT | List all DSA levels with lock/unlock status per user |
| `GET` | `/sublevels/:id` | Optional JWT | Get sublevel details including all structured stages |
| `GET` | `/sublevels/:sublevelId/problems` | Bearer JWT | List practice problems within a sublevel |
| `GET` | `/problems/:id` | Bearer JWT | Fetch problem description, starter code, and sample test cases |

### 🏆 Gamification & Streaks (`/api`)

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/xp/add` | Bearer JWT | Award XP and automatically recalculate league tier |
| `GET` | `/streak` | Bearer JWT | Get current daily streak and freeze status |
| `POST` | `/streak/update` | Bearer JWT | Record daily practice activity and maintain streak |

### 🩺 System & Docs

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/health` | Public | Service health status, uptime, and environment check |
| `GET` | `/api/docs` | Public | Interactive Swagger OpenAPI documentation UI |

---

## Standard API Response Format

### Success Response (`200 / 201`)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx1234567890",
      "email": "student@algoquest.dev",
      "name": "Algo Explorer",
      "xp": 150,
      "league": "BRONZE"
    }
  },
  "message": "Operation completed successfully"
}
```

### Error Response (`400 / 401 / 404 / 409 / 500`)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must be at least 8 characters and contain at least one uppercase letter and one number"
    }
  ]
}
```

---

## Available NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `ts-node-dev ...` | Start development server with live reloading |
| `npm run build` | `tsc -p tsconfig.json` | Type-check and compile TypeScript to `dist/` |
| `npm start` | `node dist/server.js` | Run compiled production build |
| `npm test` | `jest --passWithNoTests` | Run automated Jest test suites |
| `npm run test:watch` | `jest --watch` | Run Jest tests in interactive watch mode |
| `npm run test:coverage` | `jest --coverage` | Generate code test coverage report |
| `npm run prisma:generate` | `prisma generate` | Generate Prisma ORM client |
| `npm run prisma:migrate` | `prisma migrate dev` | Run database migrations in development |
| `npm run prisma:seed` | `ts-node prisma/seed.ts` | Seed database with initial course data |
| `npm run db:reset` | `prisma migrate reset` | Reset database and re-seed sample data |

---

## Demo Credentials

Upon running `npm run prisma:seed`, a default demo user is created for immediate testing:

- **Email**: `demo@algoquest.dev`
- **Password**: `Test@1234`

---

## License

This project is licensed under the ISC License.
