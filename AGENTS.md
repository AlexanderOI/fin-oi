# AGENTS.md

Notes for agents working in this repo. The root `README.md` is leftover Turborepo-starter boilerplate and is **wrong** (it mentions `web`/`docs` apps that don't exist) — trust `docs/ARCHITECTURE.md` (Spanish) and the config files instead.

## Repo shape

- pnpm workspace (pnpm@11.9.0, Node ≥20). Workspaces: `apps/*`, `packages/*`.
- Two real apps: `apps/api` (NestJS + Fastify + SWC + Drizzle + PostgreSQL) and `apps/mobile` (Expo SDK 56 + React Native + Expo Router + NativeWind 5).
- `packages/` only holds shared `@repo/typescript-config` and `@repo/eslint-config`; `@repo/eslint-config` exports `base`/`next-js`/`react-internal` but the API and mobile apps use their **own** local ESLint flat configs, not `@repo/eslint-config`.
- Turborepo coordinates `build`, `dev`, `lint`, `check-types` across workspaces.

## Common commands

Run from repo root unless noted. Run scripts in a package with `pnpm --filter <pkg> <script>` or from inside that dir.

- `pnpm dev` — turbo dev across all workspaces (API watch + Expo). API only: `pnpm --filter api dev` (Nest watch via SWC); mobile only: `pnpm --filter mobile dev` (`expo start`).
- `pnpm build` / `pnpm lint` — turbo fan-out.
- `pnpm format` — prettier on `**/*.{ts,tsx,md}`.
- API tests: `pnpm --filter api test` (jest, picks up `**/*.spec.ts` under `src/`). Single test: `pnpm --filter api test -- <pattern>` or `jest --testPathPattern=...`.
- API DB (Drizzle, requires `DATABASE_URL`): `db:generate`, `db:migrate`, `db:push`, `db:studio` — run inside `apps/api`. Schema lives at `apps/api/src/drizzle/schema.ts`, migrations at `apps/api/drizzle/migrations`.
- Mobile: `pnpm --filter mobile dev:android` boots a specific emulator AVD `Medium_Phone_API_36.0` (hardcoded in the script — change in `package.json` if your AVD differs).

## Gotchas

- `pnpm check-types` (root `turbo run check-types`) is effectively a no-op: no workspace defines a `check-types` script, so Turbo reports no tasks ran. **Do not rely on it as a typecheck gate.** Type-check by running `tsc --noEmit` in `apps/api` or `apps/mobile` directly.
- `apps/api` `test:e2e` script points at `test/jest-e2e.json`, but there is **no `test/` directory** — it will fail until you create one. Unit tests live next to source as `*.spec.ts`.
- Path aliases differ between apps and are easy to invert:
  - API: `@/*` → `./src/*` (i.e. `apps/api/src/*`)
  - Mobile: `@/*` → `./*` (workspace root of `apps/mobile`, not `src`)
- `.npmrc` sets `node-linker=hoisted`. Required for React Native / NativeWind compatibility — do not switch to isolated without testing mobile build.
- `turbo.json` `build` outputs are configured as `.next/**` (Next.js leftover); the real build outputs are `apps/api/dist` and Expo/Metro bundling. Not harmful, but don't infer a Next.js app from it.
- API env loading: `@nestjs/config` loads `apps/api/.env` at runtime, but `drizzle-kit` does **not** auto-load `.env` — when running `db:*` scripts, export `DATABASE_URL` in your shell or use a tool that loads `.env` first. `drizzle.config.ts` reads `process.env.DATABASE_URL!`.
- Mobile env is exposed via `EXPO_PUBLIC_*` vars (Expo public env, inlined at build time). `config/env.ts` reads `EXPO_PUBLIC_API_URL` (default `http://localhost:8000`); update `apps/mobile/.env` to point at your API/ngrok URL.
- New API endpoints need Swagger wiring; `src/main.ts` regenerates `src/docs/swagger.json` only when `ENV=development` (it `mkdirSync`s `src/docs` and writes the file at boot).

## Env setup

- API: copy `apps/api/.env.example` → `apps/api/.env`. Required: `DATABASE_URL`, `JWT_SECRET_ACCESS`, `JWT_SECRET_REFRESH`, `PORT`, `ENV`, `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET`.
- Mobile: create `apps/mobile/.env` with at least `EXPO_PUBLIC_API_URL`.

## Conventions

- Commits: free-form; history uses conventional-ish prefixes (`feat:`, `fix:`, `refactor:`, `chore:`) with optional scope (`feat(mobile):`) but there is no enforced convention or CI.
- No CI workflows, no pre-commit hooks, no automation — nothing runs lint/tests on push; you must run them yourself.
- API feature modules live under `apps/api/src/features/<feature>/` (module + controller + service + `dto/`). Mobile features live under `apps/mobile/features/<feature>/` (`actions/` or `services/` for HTTP, `hooks/` wrapping React Query, `store/` only for auth via Zustand). See `docs/ARCHITECTURE.md` for the full layout and data flow.
- No AGENTS/CLAUDE/cursorrules existed prior; this file is the canonical agent guide.