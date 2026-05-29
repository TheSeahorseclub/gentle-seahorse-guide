import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const log = (step: string, details?: unknown) =>
  console.log(
    `[DELETE-ACCOUNT] ${step}${details ? ` - ${JSON.stringify(details)}` : ""}`
  );

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);
    if (userError || !userData.user)
      throw new Error("Authentication failed");

    const userId = userData.user.id;
    log("Authenticated", { userId });

    // Find families this user owns
    const { data: ownedFamilies } = await supabase
      .from("families")
      .select("id")
      .eq("owner_user_id", userId);

    const ownedFamilyIds = (ownedFamilies ?? []).map((f) => f.id);
    log("Owned families", { count: ownedFamilyIds.length });

    if (ownedFamilyIds.length > 0) {
      // Get all children in owned families
      const { data: children } = await supabase
        .from("children")
        .select("id")
        .in("family_id", ownedFamilyIds);

      const childIds = (children ?? []).map((c) => c.id);
      log("Children to delete", { count: childIds.length });

      // Delete leaf tables referencing children
      if (childIds.length > 0) {
        await supabase.from("child_caregivers").delete().in("child_id", childIds);
        log("Deleted child_caregivers");
      }

      // Delete leaf tables referencing families
      await supabase.from("signal_entries").delete().in("family_id", ownedFamilyIds);
      await supabase.from("sleep_logs").delete().in("family_id", ownedFamilyIds);
      await supabase.from("wake_windows").delete().in("family_id", ownedFamilyIds);
      await supabase.from("daily_insights").delete().in("family_id", ownedFamilyIds);
      log("Deleted family-scoped data");

      // Delete children
      await supabase.from("children").delete().in("family_id", ownedFamilyIds);
      log("Deleted children");

      // Delete family memberships
      await supabase.from("family_members").delete().in("family_id", ownedFamilyIds);
      log("Deleted family_members");

      // Delete families
      await supabase.from("families").delete().in("id", ownedFamilyIds);
      log("Deleted families");
    } else {
      // Caregiver-only: remove just their membership rows
      const { data: memberRows } = await supabase
        .from("family_members")
        .select("family_id")
        .eq("user_id", userId);

      const memberFamilyIds = (memberRows ?? []).map((r) => r.family_id);

      if (memberFamilyIds.length > 0) {
        await supabase
          .from("child_caregivers")
          .delete()
          .eq("user_id", userId);
      }

      await supabase.from("family_members").delete().eq("user_id", userId);
      log("Removed caregiver memberships");
    }

    // User-scoped tables (always delete regardless of role)
    await supabase.from("content_views").delete().eq("user_id", userId);
    await supabase.from("user_subscriptions").delete().eq("user_id", userId);
    await supabase.from("user_roles").delete().eq("user_id", userId);
    await supabase.from("profiles").delete().eq("user_id", userId);
    log("Deleted user-scoped records");

    // Delete auth user — must be last
    const { error: deleteAuthError } =
      await supabase.auth.admin.deleteUser(userId);
    if (deleteAuthError) throw new Error(`Auth delete failed: ${deleteAuthError.message}`);
    log("Auth user deleted");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    log("Error", { message });
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
