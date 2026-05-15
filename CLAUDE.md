# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start Vite dev server (http://localhost:5173)
npm run build        # production build
npm run lint         # ESLint
npm run test         # run all tests once (Vitest)
npm run test:watch   # Vitest in watch mode
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.ts
```

## Stack

- **React 18 + Vite + TypeScript** — SPA, no SSR
- **Supabase** — auth, database (Postgres), edge functions, storage
- **TanStack Query** — all server state; avoid local state for remote data
- **Zustand** (`src/store/appStore.ts`) — persisted local state (learning progress, fallback profile)
- **React Router v6** — client-side routing
- **shadcn/ui + Radix UI + Tailwind CSS** — UI components; components live in `src/components/ui/`

## Architecture

### Auth + routing flow

`AuthContext` wraps the whole app and exposes `{ user, session, loading, signOut }`. Route guards work in two layers:

1. `RequireAuth` — redirects to `/auth` if no Supabase session.
2. `AppRoutes` checks `useCurrentChild()` — if no child exists, user is redirected to `/welcome` (onboarding). Only after onboarding do main app routes become accessible.

Admin routes (`/admin/*`) add a third layer: `AdminGuard` checks the `has_role` Supabase RPC before rendering.

### Data model (key tables)

- `family_members` — links users to a family (`family_id`, `role`: owner/caregiver/viewer)
- `children` — child record (`id`, `name`, `age_months`, `family_id`)
- `user_subscriptions` — subscription state (`plan`, `entitlement_status`, `platform`, `payment_provider`, `export_days_limit`)
- `profiles` — user metadata (role field drives admin access via `has_role` RPC)
- `app_content` / `content_videos` — CMS-managed lesson content with `access_level` gating

`useCurrentChild()` is the central hook — it fetches family membership then the first child. Many other hooks depend on it.

### Premium / subscription

`usePremiumAccess()` reads `user_subscriptions` and exposes `{ isPremium, isFree, plan, entitlement, platform }`. Features gate on `isPremium`. `useSubscription()` provides `exportDaysLimit` for the export page. Stripe checkout/portal go through edge functions `create-checkout` and `customer-portal`. Mobile IAP is handled by `apple-iap-validate` and `google-play-validate`.

### Signal tracking

"Signals" are 5 daily observations: `sleep`, `crying`, `feeding`, `interaction`, `transitions`. Each has a categorical value (e.g. sleep: `restful | unsettled | mixed`). These are stored in Supabase (not only Zustand). `useSignalAnalytics` aggregates them over a rolling period. The `sleep-analysis` edge function takes `{ child_id, age_months }` and returns sleep predictions/tips.

### Content / learning

`src/data/weeklyContent.ts` is a large static data file defining all `MonthContent → WeekContent` for the micro-lessons curriculum (neurodevelopmental content). This drives `MicroLessons` and `WeeklyReflection` pages. Content videos are stored in Supabase Storage; paths in the `content_videos` table must match storage filenames exactly (case-sensitive).

### Export / PDF

`src/utils/generateClinicalPdf.ts` uses `jspdf` + `jspdf-autotable` to produce a clinical PDF report. It receives data from `useSignalAnalytics`, `useClinicalSleepData`, and `useCurrentChild`.

### Supabase integration

- Client: `src/integrations/supabase/client.ts` — reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from env
- Types: `src/integrations/supabase/types.ts` — auto-generated; do not edit manually
- Edge functions: `supabase/functions/` — Deno runtime

Required `.env` variables:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

### Path alias

`@/` resolves to `src/` (configured in both `vite.config.ts` and `vitest.config.ts`).

### Testing

Tests live in `src/**/*.{test,spec}.{ts,tsx}` with jsdom environment. Setup file: `src/test/setup.ts`.
