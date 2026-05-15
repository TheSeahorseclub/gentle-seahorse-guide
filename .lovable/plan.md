## Debug RevenueCat 401

Add temporary logs to `supabase/functions/revenuecat-webhook/index.ts` before the auth check to capture:
- whether `REVENUECAT_WEBHOOK_SECRET` is loaded (length only, never the value)
- Authorization header presence, whether it has the `Bearer ` prefix
- token length and whether it matches the secret length

Then deploy, trigger a RevenueCat webhook, fetch the function logs, and identify which condition fails (env missing, header missing, prefix mismatch, value mismatch).

After diagnosis, apply the real fix (e.g. accept raw token without `Bearer`, trim whitespace, or update RC config) and remove the diagnostic logs.

### Code change

```ts
const authHeader = req.headers.get('Authorization') ?? '';
const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

console.log('auth-debug', {
  secret_loaded: WEBHOOK_SECRET.length > 0,
  secret_len: WEBHOOK_SECRET.length,
  header_present: authHeader.length > 0,
  header_has_bearer: authHeader.startsWith('Bearer '),
  token_len: token.length,
  lengths_match: token.length === WEBHOOK_SECRET.length,
});

if (!WEBHOOK_SECRET || token !== WEBHOOK_SECRET) {
  return new Response('Unauthorized', { status: 401 });
}
```

No DB or schema changes.
