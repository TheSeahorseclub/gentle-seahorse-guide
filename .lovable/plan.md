# Content Organization System

Build a dynamic, age-stage based content hub powered by the existing `app_content` table (extended) plus admin CMS, so new content can be added without releases.

## 1. Database changes

Extend `app_content` with structured age + section fields (replacing the free-text `age_group` and `category`):

- `age_stage` (text, enum-like) — one of:
  `pregnancy | newborn | 1-3m | 3-6m | 6-9m | 9-12m | 12-18m | 18-24m | 2-3y`
- `section` (text, enum-like) — one of:
  `development | feeding | sleep | wellbeing | milestones | health | activities | expert | videos`
- `body` (text) — long-form content (markdown)
- `image_url` (text, nullable) — hero image
- `week_recommended` (int[], nullable) — list of weeks (0–156) where this should appear as "recommended for this week"
- `is_published` (bool, default true)
- Indexes on `(age_stage, section)` and `is_published`

Backfill existing rows by mapping current `age_group` strings best-effort to the new `age_stage`. Keep old columns for now (non-breaking).

RLS stays the same (free vs premium gating already exists).

## 2. Age-stage helper

New `src/utils/ageStages.ts`:
- Map `ageMonths` → current stage id + label
- Ordered list of all 9 stages (id, label, minMonths, maxMonths, weeks)
- `getCurrentWeek(ageMonths)` for "recommended this week"

## 3. Content hook

New `src/hooks/useContent.ts`:
- `useContent({ stage, section })` → TanStack Query against `app_content` filtered by published + stage + section
- `useRecommendedThisWeek(currentWeek)` → rows where `week_recommended` contains current week

## 4. User-facing Content Hub

New page `src/pages/Content.tsx` at route `/content`:

- **Header**: Baby name + current stage badge
- **Progress timeline**: horizontal stage strip (9 dots/pills), current stage highlighted, tap to jump
- **Recommended for this week**: horizontal card carousel at top
- **Section grid**: 9 section cards (icon + name + count). Tap → drills to filtered list
- **Stage switcher**: pill row at top lets parent override to browse any stage
- **Content list view** `src/pages/ContentSection.tsx` at `/content/:stage/:section`: lists items, tap → detail
- **Content detail** `src/pages/ContentDetail.tsx` at `/content/item/:id`: renders title, image, body (markdown), premium gate via existing `PremiumGate`

Add a "Content" entry to the mobile bottom nav (or Home shortcut card if nav is full).

## 5. Admin CMS

Extend `src/pages/admin/AdminContent.tsx`:
- New form fields: `age_stage` (select, 9 options), `section` (select, 9 options), `body` (textarea), `image_url`, `week_recommended` (comma-separated weeks)
- Filters: by stage, by section, by access level (existing)
- Table columns updated to show stage + section badges
- Edit (not only create+delete) — add an Edit dialog reusing the form

Admins can fully manage content here — no app release needed for new entries.

## 6. UX / design

- Clean, calm aesthetic matching existing app (white + baby-blue, Quicksand/Nunito)
- Section cards use soft pastel tints per section for quick scanning
- Empty states: "No content yet for this stage — check back soon"
- Mobile-first; section grid 2-col on phones, 3-col on tablet

## Technical notes

- Reuse `useCurrentChild` for `ageMonths`
- Reuse `usePremiumAccess` + `PremiumGate` for premium content
- Markdown rendering via `react-markdown` (add dep)
- All filtering done client-side after the per-stage fetch (small per-stage payload)
- `week_recommended` as Postgres `int[]` queried with `cs` (contains) operator
- Route additions wired in `src/App.tsx` under `RequireAuth`

## Out of scope (future)

- Push notifications for new weekly recommendations
- Per-user read/unread tracking (could reuse `content_views` later)
- Bulk import / CSV upload in admin
