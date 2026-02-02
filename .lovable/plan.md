

# Investigation Report: Video Playback Inconsistency

## Problem Summary

After thorough investigation, I found **all videos are currently failing to play** in the app. The browser shows `net::ERR_ABORTED` errors for all video requests.

## Root Cause Identified

The app is using **two different Supabase projects**:

| Purpose | Project ID | URL |
|---------|-----------|-----|
| App/Database (current) | `fvyoomsgkmzurpkhyqnq` | `https://fvyoomsgkmzurpkhyqnq.supabase.co` |
| Video Storage (external) | `pybzakbvislqmveosmcz` | `https://pybzakbvislqmveosmcz.supabase.co` |

The video URLs are pointing to the external storage (`pybzakbvislqmveosmcz`), which is **hardcoded** in `src/hooks/useContentVideos.ts`:

```text
const supabaseUrl = 'https://pybzakbvislqmveosmcz.supabase.co';
```

## Why Videos Are Failing

The external storage bucket at `pybzakbvislqmveosmcz` is either:

1. **Not accessible anymore** - The bucket may have been deleted, made private, or the project deactivated
2. **CORS restrictions** - Cross-origin requests from your app domain may be blocked
3. **Files don't exist** - The video files may have been removed from storage

## Current Storage Status

| Storage Location | Status |
|-----------------|--------|
| Current project (`fvyoomsgkmzurpkhyqnq`) | **Empty** - No video files exist |
| External project (`pybzakbvislqmveosmcz`) | **Unreachable** - Requests getting aborted |

---

## Recommended Solution

### Option A: Upload Videos to Current Project (Recommended)

Move all video files to the current project's storage bucket.

**Steps:**

1. **Create videos bucket** (if needed) in current project
2. **Upload all video files** to the current storage with matching folder structure:
   - `cycle-1/module1.mp4`
   - `cycle-1/module1L2.mp4`
   - `cycle-2/module2L2.mp4`
   - ... (all 25 videos)
3. **Update the code** to use the correct Supabase URL:
   ```typescript
   // Change from hardcoded external URL
   const supabaseUrl = 'https://pybzakbvislqmveosmcz.supabase.co';
   
   // To using environment variable (current project)
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   ```

### Option B: Fix External Storage Access

If videos still exist in the external project:

1. **Verify bucket is public** in the external project
2. **Check CORS settings** allow requests from your app domain
3. **Verify files exist** with correct paths and casing

---

## Immediate Code Fix Required

Once videos are accessible, update `src/hooks/useContentVideos.ts`:

```typescript
export const getVideoPublicUrl = (videoPath: string): string | null => {
  if (!videoPath) return null;
  
  // Use environment variable instead of hardcoded URL
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/videos/${videoPath}`;
};
```

---

## Action Required From You

Before I can implement the fix:

1. **Do you have access to the external project** (`pybzakbvislqmveosmcz`) where videos are stored?
2. **Do you have the video files** available to upload to the current project?
3. **Which option do you prefer** - migrate videos to current project (A) or fix external storage access (B)?

---

## Technical Details

### Database Records (25 videos across 12 cycles)

| Cycle | Videos | Paths |
|-------|--------|-------|
| 1 | 3 | `cycle-1/module1.mp4`, `module1L2.mp4`, `module1L3.mp4` |
| 2 | 2 | `cycle-2/module2L2.mp4`, `module2L3.mp4` |
| 3 | 2 | `cycle-3/module3.mp4`, `module3L2.mp4` |
| 4 | 2 | `cycle-4/module4.mp4`, `module4L2.mp4` |
| 5-12 | 2 each | Title-cased paths (e.g., `cycle-5/Module5.mp4`) |

### Network Error Details

All video requests return:
- **Error:** `net::ERR_ABORTED`
- **URL Pattern:** `https://pybzakbvislqmveosmcz.supabase.co/storage/v1/object/public/videos/{path}`

