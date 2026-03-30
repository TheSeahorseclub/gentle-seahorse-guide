import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Not authenticated");

    const { child_id, age_months } = await req.json();
    if (!child_id) throw new Error("child_id is required");

    // Fetch last 30 days of sleep logs
    const since = new Date(Date.now() - 30 * 86400000)
      .toISOString()
      .split("T")[0];

    const { data: sleepLogs } = await supabase
      .from("sleep_logs")
      .select("log_date, time_started, time_ended, duration_minutes, sleep_quality")
      .eq("child_id", child_id)
      .gte("log_date", since)
      .order("log_date", { ascending: false });

    const { data: wakeLogs } = await supabase
      .from("wake_windows")
      .select("log_date, time_started, time_ended, duration_minutes, activity")
      .eq("child_id", child_id)
      .gte("log_date", since)
      .order("log_date", { ascending: false });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `You are a paediatric sleep specialist AI assistant. Analyse the following baby sleep data and provide actionable predictions and recommendations.

Baby age: ${age_months} months

Sleep logs (last 30 days):
${JSON.stringify(sleepLogs ?? [], null, 2)}

Wake windows (last 30 days):
${JSON.stringify(wakeLogs ?? [], null, 2)}

Based on this data, respond with a valid JSON object (no markdown, no code fences) with these fields:
{
  "idealWakeWindow": "recommended wake window duration for this age in minutes",
  "predictedNextWake": "estimated next wake time based on recent patterns (HH:MM format or null if not enough data)",
  "napRecommendation": "how many naps per day and average duration",
  "sleepRegression": "whether sleep regression signs are present and which type (true/false and explanation)",
  "averageTotalSleep": "average total sleep hours per day from the data",
  "trend": "improving / stable / declining",
  "insights": ["array of 3-5 short personalised insights about this baby's sleep patterns"],
  "tips": ["array of 2-3 actionable tips for the caregivers"]
}`;

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "user", content: prompt }],
          stream: false,
        }),
      }
    );

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      throw new Error("AI gateway error");
    }

    const aiResult = await aiResponse.json();
    const rawContent = aiResult.choices?.[0]?.message?.content ?? "{}";

    // Strip potential markdown code fences
    const cleaned = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let analysis;
    try {
      analysis = JSON.parse(cleaned);
    } catch {
      analysis = { error: "Could not parse AI response", raw: cleaned };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sleep-analysis error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
