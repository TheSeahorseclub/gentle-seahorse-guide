# Google Play — Production Submission Guide (Seahorse Club)

Every screen, field, and button in the current Play Console UI, in order.
**Organization account** → publish straight to Production (no closed-testing gate).

| Field | Value |
|---|---|
| App name | Seahorse Club |
| Package | `com.seahorseclub.app` |
| Version | 1.0 · versionCode 1 |
| Account type | Organization |
| Signed AAB | `android/app/build/outputs/bundle/release/app-release.aab` ✅ |
| Privacy policy | `https://theseahorseclub.com/privacy-policy` ✅ live |
| Terms of service | `https://theseahorseclub.com/terms-of-service` ✅ live |
| Account deletion | `https://app.theseahorseclub.com/delete-account` ✅ live |

---

## ⚠️ Fix before you start

**Blocker 1 — Account-deletion URL** — ✅ **RESOLVED.** Live at
`https://app.theseahorseclub.com/delete-account` (real SPA route). Use it in Phase 5.

**Blocker 2 — Broken privacy link in app (still open).**
`src/pages/DeleteAccountRequest.tsx` links to `https://theseahorseclub.com/privacy`, which 404s
(marketing site only has `/privacy-policy`). Fix the href to
`https://theseahorseclub.com/privacy-policy` before you rebuild — reviewers tap these links.

---

## Phase 0 — Pre-flight assets

All files already exist in the repo; upload from `screenshots/`.

| Asset | Play requirement | File | OK? |
|---|---|---|---|
| App icon | 512×512 PNG | `screenshots/app_icon_512x512.png` | ✅ |
| Feature graphic | 1024×500 | `screenshots/feature_graphic_1024x500.png` | ✅ |
| Phone screenshots | 2–8, ≥320px | `screenshots/01_screen.png … 06_screen.png` (1080×2400) | ✅ 6 |
| Release bundle | signed `.aab` | `android/app/build/outputs/bundle/release/app-release.aab` | ✅ signed |
| Privacy policy | public URL | `theseahorseclub.com/privacy-policy` | ✅ |
| Deletion URL | public URL | `app.theseahorseclub.com/delete-account` | ✅ |

**Reviewer login — prepare now.** App is behind auth; Google's reviewer can't test without an
account. Create a working demo login (email + password) with a child already onboarded and, if
possible, premium granted. Pasted in Phase 4 → **App access**.

---

## Phase 1 — Open the app

1. Go to <https://play.google.com/console>, sign in with the organization account.
2. On **All apps**, click **Seahorse Club**.
3. Land on **Dashboard**. The **Set up your app** card lists every task with a status dot.

**Nav model:** left sidebar groups tasks under **Test and release**, **Monetize**, **Grow**, and
**Policy and programs**. Store listing → **Grow**; declarations → **Policy and programs → App
content**; the build → **Test and release → Production**.

---

## Phase 2 — Main store listing

`Grow → Store presence → Main store listing`

1. **App name** (≤30) — `Seahorse Club`
2. **Short description** (≤80):

   ```
   Track baby sleep, feeding & development with gentle, science-based insights.
   ```

3. **Full description** (≤4000):

   ```
   Seahorse Club helps parents of babies aged 0–3 understand their child's development — calmly, without the guesswork.

   Log five simple daily signals — sleep, crying, feeding, interaction and transitions — in seconds. Seahorse Club turns them into clear trends and gentle, neurodevelopment-informed insights so you can see how your baby is really doing over time.

   WHAT'S INSIDE
   • Daily signal tracker — five quick taps, no spreadsheets
   • Personalised insights and sleep analysis based on your baby's age
   • Weekly micro-lessons grounded in early-childhood neuroscience
   • Milestone reflections week by week
   • Clinical PDF export to share with your pediatrician or health visitor
   • Multi-caregiver support — invite a partner or grandparent

   Seahorse Club Pro unlocks full history, advanced trends and unlimited exports.

   Your data stays private. You can export or delete it at any time.

   Built by parents, guided by science. Seahorse Club is a supportive companion — not a substitute for professional medical advice.
   ```

4. **App icon** — Upload → `app_icon_512x512.png`
5. **Feature graphic** — Upload → `feature_graphic_1024x500.png`
6. **Phone screenshots** — upload `01_screen.png` … `06_screen.png`, drag to order.
7. Leave tablet/Chromebook empty unless supported.
8. **Save**.

> **Metadata = same rule Apple hit you on.** No "test"/"demo"/placeholder text. Real UI only.
> Don't mention other platforms ("also on iOS") — Google rejects cross-promotion in listings.

---

## Phase 3 — Store settings

`Grow → Store presence → Store settings`

1. **App category** → **Parenting** (App type = Apps, not Games).
2. **Tags** → Manage tags → add *Parenting*, *Health*, *Baby*.
3. **Contact details** → email `info@theseahorseclub.com`, phone `+447543137777`, website `https://theseahorseclub.com`.
4. **Save**.

---

## Phase 4 — App content (policy declarations)

`Policy and programs → App content` — each item opens its own form.

1. **Privacy policy** → `https://theseahorseclub.com/privacy-policy` → Save.
2. **App access** → **All or some functionality is restricted**. Add demo login:

   ```
   Name: Reviewer login
   Username: review@theseahorseclub.com
   Password: (your test password)
   Notes: A child profile is pre-onboarded. Sign in on the auth screen to reach the full app; all tracking, insights and lessons are then accessible.
   ```

3. **Ads** → *No, my app does not contain ads* → Save.
4. **Content rating** → Start questionnaire. Email `info@theseahorseclub.com`; category
   **Reference, News, or Educational**; answer **No** to all violence/sexual/drugs/gambling/profanity → Submit → Save.
5. **Target audience and content** → age group **18 and over** only.
   - Do **not** tick under-18 bands (triggers Families policy + Teacher-Approved review).
   - "Could your store listing unintentionally appeal to children?" → **No**. → Save.
6. **Data safety** → Phase 5.
7. **Health apps** → if prompted, describe as general parenting/wellness tracker, **not** a medical
   device; no diagnosis. → Save.
8. **Government apps** → No. **Financial features** → No. **News app** → No.

> **Children's-data caution:** you log data *about* babies, entered by adults. Keep target audience
> 18+ and be consistent in Data safety. A child audience triggers a much stricter review track.

---

## Phase 5 — Data safety form

`Policy and programs → App content → Data safety → Start`

1. **Overview** → Next.
2. **Data collection and security:**
   - Collect/share required user data? → **Yes**
   - All data encrypted in transit? → **Yes** (Supabase HTTPS)
   - Way to request data deletion? → **Yes** → paste
     `https://app.theseahorseclub.com/delete-account` and confirm in-app path (Settings → Delete account).
3. **Data types** — tick what the app actually collects:

   | Data type | Collected | Purpose | Required? |
   |---|---|---|---|
   | Name | Yes | Account management, App functionality | Required |
   | Email address | Yes | Account management | Required |
   | Health & fitness (child sleep/development logs) | Yes | App functionality | Required |
   | App interactions (signals logged) | Yes | App functionality, Analytics | Required |
   | Crash logs / diagnostics | If used | App functionality | Optional |
   | Purchase history (subscriptions) | Yes | App functionality | Optional |

4. **Data usage and handling** → for each ticked type click **Start**; set *Collected* (not shared
   unless you truly share), purpose, and deletion option.
5. Review **Store listing preview** (public — keep truthful).
6. **Save** → **Submit**.

> **Verify against reality.** Confirm against actual SDKs (RevenueCat, Supabase, analytics).
> Under-declaring is a policy strike. If nothing is truly *shared* with third parties, mark all
> *Collected* only.

---

## Phase 6 — Pricing & countries

1. App is **Free** (money via in-app subscriptions). Confirm **Free** — can't switch to paid later.
2. Country availability set on the production release (Phase 7) → **Add countries / regions** → Select all or pick markets.

> **Subscriptions (after approval):** Premium runs through RevenueCat (entitlement
> `The Seahorse Club Pro`). Create matching products under `Monetize → Products → Subscriptions` and
> link in RevenueCat, or purchases fail in production. Not required to pass review.

---

## Phase 7 — Create the production release

`Test and release → Production → Create new release`

1. **Production** → **Create new release** (top right).
2. **Play App Signing** — first release: choose **Use Google-generated key**. Your
   `seahorse-release-key.jks` stays the *upload* key; Google holds the app-signing key.
3. **App bundles** → Upload →

   ```
   android/app/build/outputs/bundle/release/app-release.aab
   ```

   Wait for processing (version `1 (1.0)` appears).
4. **Release name** — auto `1 (1.0)`, leave it.
5. **Release notes** (inside `<en-US>`):

   ```
   First release of Seahorse Club — track your baby's sleep, feeding and development with gentle, science-based daily insights, weekly micro-lessons and clinical PDF export.
   ```

6. **Save as draft** → **Next**.
7. Resolve any **Errors** (warnings OK). Common: target API level — confirm `targetSdkVersion` meets current minimum.
8. Rollout **100%** → **Start rollout to Production** → confirm.

> Starting rollout stages the release; it doesn't publish yet. Changes collect under **Changes ready
> to send for review** — actual submit is Phase 8.

---

## Phase 8 — Send for review

`Publishing overview` (left nav, near top)

1. Open **Publishing overview** — lists all pending changes.
2. Confirm **no red errors** and no "action required".
3. Click **Send changes for review**.

> **Timeline:** usually a few days; first app on a new account up to ~7 days. Status: *In review* →
> *Approved / Published*. Rejections land in **Inbox** with the cited policy.

---

## Phase 9 — After submit

1. Watch **Publishing overview** and **Inbox**.
2. Every future upload needs a higher `versionCode` — bump `1 → 2` in `android/app/build.gradle`, rebuild, repeat Phases 7–8.
3. Create + link subscription products (Phase 6 note) so Pro works.
4. Keep `seahorse-release-key.jks` + password safe — lose it and you can't ship updates.

---

*Reflects Play Console UI as of July 2026 · com.seahorseclub.app*
