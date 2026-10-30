# AlgoQuest Backend API 🚀

A production-grade REST API for **AlgoQuest** — a gamified DSA (Data Structures & Algorithms) learning platform.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis |
| Auth | JWT (Access + Refresh) + OAuth (Google/GitHub) |
| Validation | Zod |
| Logging | Winston |
| Testing | Jest + Supertest |
| Docs | Swagger/OpenAPI |

---

## Project Structure

```
src/
├── config/           # db, redis, env, passport, swagger
├── modules/
│   ├── auth/         # controller, service, routes, validation
│   ├── user/         # profile & progress
│   ├── content/      # levels, sublevels, stages, problems
│   └── gamification/ # xp, streaks, hearts, gems
├── middleware/        # authGuard, errorHandler, rateLimiter, validate
├── utils/            # logger, errors, response, jwt
├── __tests__/        # Jest unit tests
├── app.ts            # Express app factory
└── server.ts         # Entry point
prisma/
├── schema.prisma     # Database schema
└── seed.ts           # Seed data
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### 1. Clone and install

```bash
git clone https://github.com/bindagearyan-bit/AlgoQuest.git
cd AlgoQuest
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your database URL, Redis URL, JWT secrets
```

### 3. Database setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed with sample data
npm run prisma:seed
```

### 4. Start development server

```bash
npm run dev
```

Server runs at `http://localhost:3000`
API docs at `http://localhost:3000/api/docs`

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register new user |
| POST | `/login` | Login with email/password |
| POST | `/refresh-token` | Refresh access token |
| POST | `/logout` | Invalidate refresh token |
| GET | `/google` | Google OAuth |
| GET | `/github` | GitHub OAuth |

### User (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get authenticated user profile |
| PUT | `/profile` | Update profile |
| GET | `/progress` | Get learning progress |

### Content (`/api`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/levels` | All levels with lock/unlock status |
| GET | `/sublevels/:id` | Sublevel detail with stages |
| GET | `/sublevels/:id/problems` | Problems in sublevel |
| GET | `/problems/:id` | Problem detail |

### Gamification (`/api`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/xp/add` | Add XP, recalculate league |
| GET | `/streak` | Get streak status |
| POST | `/streak/update` | Update daily streak |

---

## Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

---

## Testing

```bash
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report
```

---

## Demo Credentials

After seeding, a demo user is available:
- **Email:** `demo@algoquest.dev`
- **Password:** `Test@1234`

---

## Environment Variables

See `.env.example` for all required variables. Key ones:

```env
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."
JWT_ACCESS_SECRET=<min 16 chars>
JWT_REFRESH_SECRET=<min 16 chars>
```
