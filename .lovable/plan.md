
# Fix: Update Database Paths to Match Actual Storage Files

## Problem
Videos from cycles 5-12 may fail because the database paths don't match the actual filenames in storage. Supabase Storage is case-sensitive.

## Solution
Update the database `video_path` entries to match the **exact** filenames in your storage bucket.

## Steps

1. **Verify actual filenames in storage**
   - Check your storage bucket to confirm the exact casing of each video file
   - Example: Is it `module5.mp4` or `Module5.mp4`?

2. **Update database paths to match storage**
   - Once we know the correct casing, update the `content_videos` table to use the exact paths

## What You Need to Do

Please confirm the **exact** filenames in your storage for cycles 5-12:
- Are they lowercase like `module5.mp4`, `module6.mp4`, etc.?
- Or Title Case like `Module5.mp4`, `Module6.mp4`, etc.?

Once confirmed, I'll update the database to match exactly.

---

## Technical Note
The storage URL is correctly configured to use:
```
https://pybzakbvislqmveosmcz.supabase.co/storage/v1/object/public/videos/{video_path}
```

The issue is purely a path/filename casing mismatch between database records and actual storage files.
