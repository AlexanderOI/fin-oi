# fin-oi — Architecture

## Overview

Personal-finance mobile app: register and categorize income/expenses, view per-period summaries, and manage custom categories. **Monorepo** with a **NestJS** backend and a **React Native (Expo)** mobile frontend.

---

## Monorepo Layout

```
fin-oi/
├── apps/
│   ├── api/          # Backend (NestJS + Fastify + PostgreSQL)
│   └── mobile/       # Mobile App (Expo + React Native)
├── packages/
│   ├── typescript-config/   # shared tsconfigs
│   └── eslint-config/       # shared ESLint configs (unused by the apps — see below)
├── turbo.json              # Turborepo config
├── pnpm-workspace.yaml     # pnpm workspace
└── package.json            # root scripts (dev, build, lint)
```

**Task runner**: Turborepo fans out `dev`, `build`, `lint`, and `check-types` across workspaces. Note: `check-types` is a no-op in practice — see `AGENTS.md`.

> The two apps use their **own** local ESLint flat configs (`apps/api/eslint.config.mjs`, `apps/mobile/eslint.config.js`); the shared `@repo/eslint-config` package is not consumed by them.

---

## API (`apps/api`)

### Stack
- **Runtime**: Node.js ≥20, TypeScript 6
- **Framework**: NestJS 11 with Fastify adapter (`@nestjs/platform-fastify`)
- **Builder**: SWC (fast compilation; all `nest` scripts use `-b swc`)
- **ORM**: Drizzle ORM + `node-postgres` (PostgreSQL)
- **Auth**: JWT (access + refresh tokens), Passport JWT adapters
- **Validation**: `class-validator` + `class-transformer` via a global `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`)
- **Docs**: Swagger/OpenAPI served at `/api`
- **File upload**: `@fastify/multipart`, `@nest-lab/fastify-multer`, and `sharp` for image optimization
- **Cloudinary**: official SDK for image storage

### Directory Structure

```
src/
├── main.ts                      # Entry point: bootstrap, CORS, Swagger, global ValidationPipe
├── app.module.ts                # Root module
├── app.controller.ts            # Health check (GET /)
├── app.service.ts
├── types.ts                     # Global types (UserAuth, FastifyRequest extension)
│
├── auth/                        # Authentication module
│   ├── auth.module.ts
│   ├── auth.controller.ts       # register, login, refresh, check-user-data
│   ├── auth.service.ts          # Auth logic (bcrypt hashing, JWT)
│   ├── decorators/
│   │   ├── auth.decorator.ts    # @Auth() → UseGuards(AuthGuardJwt)
│   │   └── user.decorator.ts    # @User() → extracts request.user
│   ├── guards/
│   │   ├── auth.guard.ts        # Validates accessToken (Bearer scheme)
│   │   └── refresh.guard.ts     # Validates refreshToken (Refresh scheme)
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   └── interfaces/
│       └── user-payload.interface.ts
│
├── drizzle/                     # Database layer (global)
│   ├── drizzle.module.ts        # @Global, exports DrizzleService
│   ├── drizzle.service.ts       # PG pool + drizzle client
│   └── schema.ts                # Full schema (tables + relations)
│
├── features/                    # Feature modules
│   ├── users/
│   │   ├── user.module.ts
│   │   ├── user.controller.ts   # update, delete, upload-avatar
│   │   ├── user.service.ts
│   │   ├── dto/update-user.dto.ts
│   │   └── interfaces/user-response.ts
│   ├── transactions/
│   │   ├── transactions.module.ts
│   │   ├── transactions.controller.ts   # CRUD + filters
│   │   ├── transactions.service.ts      # Logic with joins to categories
│   │   ├── dto/
│   │   │   ├── create-transaction.dto.ts
│   │   │   ├── update-transaction.dto.ts
│   │   │   └── find-transactions-query.dto.ts
│   │   └── entities/transaction.entity.ts
│   └── categories/
│       ├── categories.module.ts
│       ├── categories.controller.ts     # CRUD
│       ├── categories.service.ts
│       └── dto/
│           ├── create-category.dto.ts
│           └── update-category.dto.ts
│
├── cloudinary/                  # Image service
│   ├── cloudinary.module.ts
│   ├── cloudinary.service.ts    # Upload + sharp optimization
│   └── config/multer.config.ts  # File limits and filters
│
├── seeder/                      # Data seeder (dev only)
│   ├── seeder.module.ts
│   ├── seeder.controller.ts     # GET /seeder (development only)
│   ├── seeder.service.ts
│   └── data/
│       ├── user.data.ts
│       └── category.data.ts
│
└── docs/swagger.json            # Generated OpenAPI doc (regenerated on dev boot)
```

### Data Model (PostgreSQL)

```
User
├── id: text (PK, UUID via crypto.randomUUID())
├── name: text (nullable)
├── avatar: text (nullable)
├── username: text (unique, notNull)
├── email: text (unique, notNull)
├── password: text (notNull, bcrypt hash)
├── createdAt: timestamp (notNull, defaultNow)
└── updatedAt: timestamp (notNull, defaultNow, $onUpdate)

Category
├── id: text (PK, UUID auto)
├── userId: text (FK → User, notNull)
├── name: text (notNull)
├── color: text (nullable)
├── icon: text (nullable)
└── isDefault: boolean (default false, notNull)

Transaction
├── id: text (PK, UUID auto)
├── userId: text (FK → User, notNull)
├── amount: doublePrecision (notNull)
├── type: text (notNull; "income" | "expense")
├── categoryId: text (FK → Category, nullable)
├── description: text (nullable)
├── date: timestamp (notNull)
├── createdAt: timestamp (notNull, defaultNow)
└── updatedAt: timestamp (notNull, defaultNow, $onUpdate)

Notification
├── id: text (PK, UUID auto)
├── title: text (notNull)
├── description: text (notNull)
├── link: text (nullable)
├── read: boolean (default false, notNull)
├── userId: text (FK → User, notNull)
├── createdAt: timestamp (notNull, defaultNow)
└── updatedAt: timestamp (notNull, defaultNow, $onUpdate)
```

Relations:
- User 1→N Transaction, Notification, Category
- Category 1→N Transaction, N→1 User
- Transaction N→1 User, N→1 Category
- Notification N→1 User

> The `type` column is plain `text`, **not** a Postgres enum — values are enforced at the app layer.

### API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/` | No | Health check |
| POST | `/auth/register` | No | Register |
| POST | `/auth/login` | No | Login → user + accessToken + refreshToken |
| POST | `/auth/refresh` | Refresh | Refresh tokens |
| GET | `/auth/check-user-data` | No | Check username/email availability |
| GET | `/transactions` | Bearer | List (filters: period, categoryId, dates) |
| GET | `/transactions/summary` | Bearer | Balance, total income and total expense |
| GET | `/transactions/categories/summary` | Bearer | Expense totals per category (with icon/color/percentage) |
| POST | `/transactions` | Bearer | Create |
| GET | `/transactions/:id` | Bearer | Get one |
| PATCH | `/transactions/:id` | Bearer | Update |
| DELETE | `/transactions/:id` | Bearer | Delete |
| GET | `/categories` | Bearer | List user's categories |
| POST | `/categories` | Bearer | Create category |
| GET | `/categories/:id` | Bearer | Get category |
| PATCH | `/categories/:id` | Bearer | Update category |
| DELETE | `/categories/:id` | Bearer | Delete category |
| PATCH | `/users` | Bearer | Update profile |
| DELETE | `/users` | Bearer | Delete account |
| POST | `/users/upload-avatar` | Bearer | Upload avatar (Cloudinary) |
| GET | `/seeder` | No | Seed data (development only) |

Server binds `0.0.0.0:${PORT || 8000}`; CORS is `origin: '*'`.

### Authentication

- **Register**: validates duplicates (username, email), bcrypt-hashes password (10 rounds).
- **Login**: verifies credentials, returns `user` + `backendTokens` (accessToken 1h, refreshToken 7d, plus an `expiresIn` timestamp).
- **Refresh**: protected by `RefreshGuardJwt` — expects `Authorization: Refresh <token>`.
- **Guards**: `AuthGuardJwt` extracts the Bearer token and verifies with `JWT_SECRET_ACCESS`; `RefreshGuardJwt` uses `JWT_SECRET_REFRESH`.
- **`@Auth()` decorator**: aliases `UseGuards(AuthGuardJwt)`; applicable to controllers or routes.
- **`@User()` decorator**: extracts `request.user` typed as `UserAuth`.

### Environment Variables

```
DATABASE_URL=postgresql://...
JWT_SECRET_ACCESS=...
JWT_SECRET_REFRESH=...
PORT=8000
ENV=development
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

See `apps/api/.env.example`. `@nestjs/config` loads `.env` at runtime; `drizzle-kit` does **not** auto-load it (see `AGENTS.md`).

---

## Mobile App (`apps/mobile`)

### Stack
- **Framework**: React Native 0.85 + Expo SDK 56
- **Routing**: Expo Router (file-based, Next.js App Router style)
- **Styling**: NativeWind 5 (Tailwind CSS v4 for React Native) + `tailwind-merge` + `clsx`
- **Global state**: Zustand persisted to AsyncStorage
- **Server state**: TanStack React Query v5
- **Forms**: React Hook Form + Zod + `@hookform/resolvers`
- **HTTP**: Axios with interceptors
- **Icons**: `@expo/vector-icons` (Ionicons)
- **UI extras**: `sonner-native` (toasts), `react-native-modal`, `react-native-gesture-handler`, `react-native-reanimated`

### Directory Structure

```
app/                              # Expo Router (file-based routing)
├── _layout.tsx                   # Root layout: QueryClientProvider, SafeArea, GestureHandler, auth check
├── (auth)/                       # Auth route group
│   ├── _layout.tsx               # Redirects to (app) if already authenticated
│   ├── login.tsx
│   └── register.tsx
└── (app)/                        # Protected route group (auth required)
    ├── _layout.tsx               # Bottom tabs (Home, Transactions, Summary, Settings)
    ├── index.tsx                 # Dashboard: balance, expenses by category, recent transactions
    ├── transactions/
    │   ├── _layout.tsx
    │   ├── index.tsx             # List with filters (period, category)
    │   └── new/index.tsx         # New transaction form
    ├── summary/
    │   ├── _layout.tsx
    │   └── index.tsx
    └── settings/
        ├── _layout.tsx
        ├── index.tsx             # General settings
        └── category/             # Category management

features/                         # Feature-first modules
├── auth/
│   ├── store/auth.store.ts       # Zustand store (persisted)
│   ├── hooks/useAuth.ts          # Auth hook (login, register, logout, refresh)
│   ├── services/auth.service.ts  # HTTP calls to /auth
│   └── components/               # header, input-container, auth-icon
├── transactions/
│   ├── actions/transaction.action.ts   # HTTP calls to /transactions
│   ├── hooks/
│   │   ├── use-transactions.ts         # useQuery for listing
│   │   └── use-transaction.ts          # useQuery + useMutation for single-item CRUD
│   ├── components/               # transaction-card, transaction-list, filter-container, etc.
│   └── interfaces/               # transaction.interface.ts, category.interfaces.ts
├── dashboard/
│   ├── components/chart-circular.tsx
│   └── interface/data.interface.ts
├── summary/
│   ├── bar-chart.tsx
│   └── category-ranking-Item.tsx
├── setting/
│   ├── services/category.services.ts    # HTTP calls to /categories
│   ├── hooks/use-category-query.tsx      # React Query for categories
│   ├── components/category/             # category-form, color-icon, icon-render
│   ├── interfaces/category.interface.ts
│   └── constants/categories.ts
└── users/
    └── interfaces/user.interface.ts

components/                       # Shared components
├── ui/                           # button, card, form, input, modal, skeleton, etc.
└── common/                       # app-safe-area-view, icon-card, modal-delete, screen-header

lib/                              # Utilities
├── api-client.ts                 # Axios instance + request interceptor
├── cn.ts                         # clsx + tailwind-merge
├── format-date.tsx
└── format-number.ts

hooks/                            # Global hooks
├── useColorScheme.ts
├── useColorScheme.web.ts
└── useThemeColor.ts

constants/Colors.ts
config/env.ts                     # Env vars (EXPO_PUBLIC_API_URL, etc.)
global.css                        # NativeWind global styles
```

### Feature Architecture

Each feature under `features/` follows a consistent layout:

| Folder | Purpose |
|--------|---------|
| `actions/` | Pure functions calling the API (some features use `services/` instead) |
| `services/` | Direct HTTP calls via `apiClient` |
| `hooks/` | Custom hooks wrapping React Query or business logic |
| `store/` | Global state via Zustand (only `auth` so far) |
| `components/` | UI components specific to the feature |
| `interfaces/` | TypeScript types for the feature |

### Data Flow

```
Screen (app/)
  └── hook (features/*/hooks/)
       ├── React Query (caching, loading, error states)
       │    └── action/service (features/*/actions/ or services/)
       │         └── apiClient (lib/api-client.ts)
       │              ├── Axios request interceptor → adds Bearer token
       │              └── API (apps/api)
       └── Zustand store (features/auth/store/)
            └── AsyncStorage (persistence)
```

### Mobile Authentication

1. **Login**: calls `POST /auth/login`, stores user + tokens in the Zustand store (persisted to AsyncStorage).
2. **Each request**: the Axios request interceptor reads `accessToken` via `useAuthStore.getState()` (not the hook — safe to call outside React) and sets `Authorization: Bearer <token>`.
3. **App start**: the root layout checks `expiresIn`; if expired it attempts refresh via `POST /auth/refresh` (using the refreshToken); on failure it logs out.
4. **Route protection**:
   - `(auth)/_layout.tsx` redirects to `(app)` if `user` exists.
   - `(app)/_layout.tsx` redirects to `(auth)/login` if `user` does not exist.

### HTTP Services

- **apiClient**: Axios instance with `baseURL` from `config/env.ts`. Only a **request** interceptor is registered (adds the Bearer token) — there is no response/401 interceptor; refresh-on-401 is handled by the root layout, not Axios.
- Each feature exposes modular services (e.g. `auth/services/auth.service.ts`, `transactions/actions/transaction.action.ts`).

---

## Development Tools

| Tool | Use |
|------|-----|
| pnpm | Package manager (workspaces) |
| Turborepo | Task runner (build, dev, lint) |
| SWC | Fast NestJS compilation |
| Expo CLI | Mobile dev (iOS, Android, Web) |
| Drizzle Kit | Migrations, push, studio |
| ESLint + Prettier | Code quality |
| Jest | Unit tests (API) |

---

## Conventions

- **Path aliases**: `@/*` → `./src/*` in the API; `@/*` → `./*` in mobile (workspace root, not `src`). Easy to invert — see `AGENTS.md`.
- **API**: NestJS feature modules with DTOs, controllers, and services.
- **Mobile**: feature-first, file-based routing via Expo Router, React Query for data fetching, Zustand only for auth state.
- **DB**: Drizzle ORM with typed schema; versioned migrations under `drizzle/migrations`.
- **Commits**: conventional-ish prefixes (`feat:`, `fix:`, `refactor:`, `chore:`) with optional scope (`feat(mobile):`); no enforced convention or CI.