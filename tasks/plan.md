# Plan: Delete Account (Apple App Store Compliance)

## Context

Apple App Store Guideline 5.1.1 requires any app supporting account creation to also support account deletion. No delete-account flow exists. Must be implemented before iOS submission.

## Data deletion scope

When a user deletes their account, cascade must cover (in FK-safe order):

| Table | Linked via |
|---|---|
| `signal_entries` | `family_id` → `families` |
| `sleep_logs` | `family_id` → `families` |
| `wake_windows` | `family_id` → `families` |
| `daily_insights` | `family_id` → `families` |
| `content_views` | `user_id` |
| `child_caregivers` | `child_id` → `children` |
| `children` | `family_id` → `families` |
| `family_members` | `family_id` → `families` |
| `families` | owned by user |
| `user_subscriptions` | `user_id` |
| `user_roles` | `user_id` |
| `profiles` | `user_id` |
| Auth user | Supabase admin API |

## Architecture

```
Settings.tsx
  └─ DeleteAccountButton (new component)
       └─ confirmation dialog (type "DELETE" to confirm)
            └─ calls supabase edge fn: delete-account
                 └─ service_role client
                      ├─ delete all user data (FK order)
                      └─ auth.admin.deleteUser(userId)
  └─ signOut() + navigate('/auth')
```

## Dependency graph

```
Task 1: Edge function (delete-account)
  → no deps, self-contained Deno function

Task 2: DeleteAccountButton component
  → depends on: edge function URL known, supabase client pattern

Task 3: Wire into Settings.tsx
  → depends on: Task 2 complete
```

## Assumptions

1. User owns exactly one family (owner role). Family + all children deleted.
2. If user is caregiver (not owner), only their `family_members` row and `child_caregivers` rows are deleted; family/children remain.
3. Subscription cancellation not needed server-side — Apple/Google handle that. We just delete our DB record.
4. No grace period / soft delete required for App Store review compliance.
5. Edge function uses `SUPABASE_SERVICE_ROLE_KEY` env var (already present per existing functions).

---

## Task 1 — Edge function: `delete-account`

**Goal:** Deno edge function that authenticates the caller, deletes all their data, then deletes the auth user.

**Acceptance criteria:**
- Validates JWT via `auth.getUser(token)` — rejects unauthenticated callers
- Deletes rows in FK-safe order (leaf tables first)
- Handles `families` owned by user; skips family deletion if user is only a member
- Deletes auth user via `auth.admin.deleteUser(userId)`
- Returns `{ success: true }` on success, structured error on failure
- CORS preflight handled

**Verification:** Deploy to local Supabase or staging; call with valid JWT; confirm all rows gone; confirm auth user deleted.

---

## Task 2 — Component: `DeleteAccountButton`

**Goal:** Self-contained component with confirmation dialog requiring user to type "DELETE".

**Acceptance criteria:**
- Shows destructive-red button "Delete Account"
- Opens modal/dialog on click
- Dialog warns: all data permanently deleted, cannot be undone
- Input requires exact string "DELETE" (case-sensitive) before confirm button enables
- Confirm button calls `delete-account` edge function with user's JWT
- Shows loading spinner during request
- On success: calls `signOut()` then navigates to `/auth`
- On error: shows toast with error message, dialog stays open

**Verification:** Manual UI test — confirm button disabled until "DELETE" typed; happy path signs out; error path shows toast.

---

## Task 3 — Wire into Settings.tsx

**Goal:** Add `DeleteAccountButton` to Settings page in a "Danger zone" section below Sign out.

**Acceptance criteria:**
- "Danger zone" card appears below Sign out button
- Uses red/destructive color treatment to signal severity
- Component renders correctly in both light and dark themes

**Verification:** Visual check in dev server; confirm placement and styling.

---

## Checkpoint

After all 3 tasks: end-to-end test with a real test account on staging. Confirm:
1. Account deletion flow completes
2. Supabase auth user no longer exists
3. App redirects to `/auth`
4. Re-login with same credentials fails (user gone)
