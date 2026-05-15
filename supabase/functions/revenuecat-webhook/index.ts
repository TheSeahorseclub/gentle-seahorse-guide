import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const WEBHOOK_SECRET = Deno.env.get('REVENUECAT_WEBHOOK_SECRET') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

// Maps RevenueCat event type → user_subscriptions fields
function mapEvent(event: any): {
  entitlement_status: string;
  plan: string;
  status: string;
  payment_provider: string | null;
  billing_cycle: string | null;
} | null {
  const store = event.store === 'APP_STORE' ? 'apple' : 'google';
  const cycle = event.period_type === 'ANNUAL' ? 'yearly' : 'monthly';

  switch (event.type) {
    case 'INITIAL_PURCHASE':
    case 'RENEWAL':
    case 'UNCANCELLATION':
      return { entitlement_status: 'active', plan: 'premium', status: 'active', payment_provider: store, billing_cycle: cycle };
    case 'CANCELLATION':
      return { entitlement_status: 'active', plan: 'premium', status: 'cancelled', payment_provider: store, billing_cycle: cycle };
    case 'EXPIRATION':
      return { entitlement_status: 'none', plan: 'free', status: 'active', payment_provider: null, billing_cycle: null };
    case 'BILLING_ISSUE':
      return { entitlement_status: 'active', plan: 'premium', status: 'active', payment_provider: store, billing_cycle: cycle };
    default:
      return null;
  }
}

serve(async (req: Request) => {
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

  const body = await req.text();

  const payload = JSON.parse(body);
  const event = payload.event;
  const userId = event.app_user_id; // set to Supabase user.id during RC logIn

  const fields = mapEvent(event);
  if (!fields) {
    return new Response('Event ignored', { status: 200 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const { error } = await supabase.from('user_subscriptions').upsert(
    { user_id: userId, platform: 'mobile', ...fields },
    { onConflict: 'user_id' },
  );

  if (error) {
    console.error('DB upsert error:', error);
    return new Response('DB error', { status: 500 });
  }

  return new Response('OK', { status: 200 });
});
