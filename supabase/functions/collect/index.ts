import { createClient } from "jsr:@supabase/supabase-js@2";

// Source of the Supabase edge function `collect` (project yyfeymmjdlewvdxrzggn).
// Deploy from this file; it is the only copy under version control.

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(supabaseUrl, serviceRoleKey);

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

const EVENT_TYPES = new Set([
  "lead_submit",
  "social_click",
  "page_view",
  "bot_blocked",
  "outbound_click",
  "file_download",
  "video_play",
  "site_search",
  "form_start",
  "js_error",
  "not_found",
  "custom",
]);
const SOCIAL_PLATFORMS = new Set(["instagram", "facebook", "twitter", "linkedin", "tiktok", "youtube", "pinterest"]);
const LEAD_TARGETS_MAX_LEN = 100;
const USER_AGENT_MAX_LEN = 300;

// A session has to actually stay open at least this long to count as a real
// human visit -- anything shorter (or that never sends session_end at all,
// which looks identical to an instant bounce once it's an hour stale) reads
// as noise, not a visitor.
const MIN_HUMAN_SECONDS = 5;
const ABANDONED_SESSION_MS = 60 * 60 * 1000;

// On a small local-business marketing site, a tab that stays continuously
// "visible" (per the tracker's visibilitychange logic, which already stops
// the clock when a tab is backgrounded) for longer than this is not a real
// visitor reading the page -- it's a monitoring/preview/scraping process
// that holds the connection open. Observed real engaged sessions on this
// site top out well under an hour; observed bot sessions ran 8-15+ hours.
const REALISTIC_MAX_SECONDS = 60 * 60;

// This endpoint cannot be authenticated: it is a beacon, and site_id travels
// in a script tag on every page of the tracked site, so it is public by
// construction. Anyone can therefore post traffic for any site. These are the
// numbers we report to clients and bill against, so cap how fast a single site
// can accumulate sessions. A real local-business site never approaches this;
// a script trying to inflate the figures hits it immediately.
const MAX_NEW_SESSIONS_PER_MINUTE = 40;

// Per-session ceilings for the richer data. A person reading a small site never
// gets near these; a script hammering the endpoint does.
const MAX_PAGEVIEWS_PER_SESSION = 200;
const MAX_EVENTS_PER_SESSION = 300;

// Form sends recorded by a site's own server (action form_submission). Far
// above what a small business receives; a leaked key cannot flood the figures.
const MAX_FORM_SUBMISSIONS_PER_HOUR = 30;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function clip(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}

function clipPath(v: unknown): string | null {
  const t = clip(v, 300);
  if (!t) return null;
  return t.startsWith("/") ? t : "/" + t;
}

function int(v: unknown, min: number, max: number): number | null {
  if (typeof v !== "number" || !Number.isFinite(v)) return null;
  return Math.max(min, Math.min(max, Math.round(v)));
}

function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time compare of two hex strings of equal length. */
function sameHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const SEARCH_HOSTS = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|baidu|yandex|brave|startpage|ask|aol|qwant)\./;
const AI_HOSTS = /(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|phind\.com|poe\.com)$/;
const SOCIAL_HOSTS = /(^|\.)(facebook|instagram|twitter|x|linkedin|tiktok|youtube|pinterest|reddit|threads|nextdoor|t|lnkd)\.(com|in|co)$/;

// One channel label per session, from the same signals Google Analytics uses
// (UTM medium, ad click ids, then the referring host).
function classifyChannel(
  medium: string | null,
  source: string | null,
  clickType: string | null,
  refHost: string | null,
  ownHost: string | null,
): string {
  const m = (medium ?? "").toLowerCase();
  const s = (source ?? "").toLowerCase();
  if (m === "qr" || s === "qr" || s.startsWith("qr_")) return "QR Code";
  if (/^(cpc|ppc|paidsearch|paid-search|paid_search)$/.test(m) || clickType === "gclid" || clickType === "msclkid") {
    return "Paid Search";
  }
  if (/paid/.test(m) && /social/.test(m)) return "Paid Social";
  if (/^(email|e-mail|newsletter)$/.test(m)) return "Email";
  if (/^(social|social-network|sm|social_media)$/.test(m)) return "Social";
  if (m === "organic") return "Organic Search";
  if (/^(display|cpm|banner)$/.test(m)) return "Display";
  if (m || s) {
    if (refHost && AI_HOSTS.test(refHost) && !m) return "AI Assistant";
    return "Campaign";
  }
  if (!refHost || (ownHost && (refHost === ownHost || refHost.endsWith("." + ownHost)))) {
    return clickType === "fbclid" ? "Social" : "Direct";
  }
  if (AI_HOSTS.test(refHost)) return "AI Assistant";
  if (SEARCH_HOSTS.test(refHost)) return "Organic Search";
  if (SOCIAL_HOSTS.test(refHost)) return "Social";
  return "Referral";
}

function parseUserAgent(ua: string | null) {
  const u = (ua ?? "").toLowerCase();
  if (!u) return { device: null, browser: null, os: null };
  const device = /ipad|tablet|kindle|silk/.test(u) || (/android/.test(u) && !/mobile/.test(u))
    ? "tablet"
    : /mobi|iphone|ipod|android/.test(u)
    ? "mobile"
    : "desktop";
  const browser = /edg(e|a|ios)?\//.test(u)
    ? "Edge"
    : /opr\/|opera/.test(u)
    ? "Opera"
    : /samsungbrowser/.test(u)
    ? "Samsung Internet"
    : /firefox|fxios/.test(u)
    ? "Firefox"
    : /chrome|crios/.test(u)
    ? "Chrome"
    : /safari/.test(u)
    ? "Safari"
    : "Other";
  const os = /iphone|ipad|ipod/.test(u)
    ? "iOS"
    : /android/.test(u)
    ? "Android"
    : /windows/.test(u)
    ? "Windows"
    : /mac os x|macintosh/.test(u)
    ? "macOS"
    : /cros/.test(u)
    ? "ChromeOS"
    : /linux/.test(u)
    ? "Linux"
    : "Other";
  return { device, browser, os };
}

/**
 * A form send recorded by the tracked site's own server after delivery
 * succeeded (for example after Resend accepted the email). Unlike the
 * browser's lead_submit beacon it does not depend on the visitor's browser
 * running the tracker, so blocked trackers and early exits still count.
 * Authenticated with a per-site key sent in the x-940-form-key header; only
 * its SHA-256 is stored (site_form_keys). Stores no personal details.
 */
async function recordFormSubmission(req: Request, body: Record<string, unknown>): Promise<Response> {
  const siteId = typeof body.site_id === "string" && UUID_RE.test(body.site_id) ? body.site_id : null;
  const key = req.headers.get("x-940-form-key") ?? "";
  if (!siteId || !key) return json({ error: "missing site or key" }, 400);

  const { data: keyRow } = await admin.from("site_form_keys").select("key_sha256").eq("site_id", siteId).maybeSingle();
  if (!keyRow || !sameHex(await sha256Hex(key), String(keyRow.key_sha256))) {
    return json({ error: "not authorized" }, 401);
  }

  const { count: recent } = await admin
    .from("form_submissions")
    .select("id", { count: "exact", head: true })
    .eq("site_id", siteId)
    .gte("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString());
  if ((recent ?? 0) >= MAX_FORM_SUBMISSIONS_PER_HOUR) return json({ error: "rate limited" }, 429);

  // Keep the browser's tracker session only if it really belongs to this site.
  let sessionId: string | null = null;
  if (typeof body.session_id === "string" && UUID_RE.test(body.session_id)) {
    const { data: session } = await admin
      .from("sessions")
      .select("id")
      .eq("id", body.session_id)
      .eq("site_id", siteId)
      .maybeSingle();
    sessionId = session ? body.session_id : null;
  }

  const { error } = await admin.from("form_submissions").insert({
    site_id: siteId,
    session_id: sessionId,
    form: clip(body.form, 100) ?? "form",
    path: clipPath(body.path),
  });
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, linked: sessionId !== null });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return json({ error: "method not allowed" }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }

  if (body.action === "form_submission") return recordFormSubmission(req, body);

  const { action, site_id, session_id } = body as {
    action?: string;
    site_id?: string;
    session_id?: string;
  };

  if (!action || !site_id || !session_id || !UUID_RE.test(site_id) || !UUID_RE.test(session_id)) {
    return json({ error: "missing or malformed required fields" }, 400);
  }

  const { data: site } = await admin
    .from("sites")
    .select("id, domain")
    .eq("id", site_id)
    .maybeSingle();

  if (!site) {
    return json({ error: "unknown site" }, 404);
  }

  if (action === "session_start") {
    const { count: recent } = await admin
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("site_id", site_id)
      .gte("session_start", new Date(Date.now() - 60_000).toISOString());

    if ((recent ?? 0) >= MAX_NEW_SESSIONS_PER_MINUTE) {
      return json({ error: "rate limited" }, 429);
    }

    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null;
    const userAgent = typeof body.user_agent === "string" ? body.user_agent.slice(0, USER_AGENT_MAX_LEN) : null;
    const isBot = typeof body.is_bot === "boolean" ? body.is_bot : false;

    const visitorId = typeof body.visitor_id === "string" && UUID_RE.test(body.visitor_id) ? body.visitor_id : null;
    let isReturning: boolean | null = null;
    if (visitorId) {
      const { count: prior } = await admin
        .from("sessions")
        .select("id", { count: "exact", head: true })
        .eq("site_id", site_id)
        .eq("visitor_id", visitorId);
      isReturning = (prior ?? 0) > 0;
    }

    const utmSource = clip(body.utm_source, 100);
    const utmMedium = clip(body.utm_medium, 100);
    const clickType = ["gclid", "fbclid", "msclkid", "ttclid", "li_fat_id"].includes(String(body.click_id_type))
      ? String(body.click_id_type)
      : null;
    const ownHost = hostOf("https://" + String(site.domain ?? ""));
    const channel = classifyChannel(utmMedium, utmSource, clickType, hostOf(referrer), ownHost);
    const ua = parseUserAgent(userAgent);
    const country = clip(body.geo_country, 2)?.toUpperCase() ?? null;

    const { error } = await admin.from("sessions").insert({
      id: session_id,
      site_id,
      referrer,
      user_agent: userAgent,
      is_bot: isBot,
      visitor_id: visitorId,
      is_returning: isReturning,
      landing_page: clipPath(body.landing_page),
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: clip(body.utm_campaign, 150),
      utm_term: clip(body.utm_term, 150),
      utm_content: clip(body.utm_content, 150),
      click_id_type: clickType,
      channel,
      device_type: ua.device,
      browser: ua.browser,
      os: ua.os,
      screen_w: int(body.screen_w, 0, 20000),
      screen_h: int(body.screen_h, 0, 20000),
      language: clip(body.language, 20),
      timezone: clip(body.timezone, 60),
      country,
      region: clip(body.geo_region, 80),
      city: clip(body.geo_city, 100),
    });
    if (error) return json({ error: error.message }, 500);

    // Opportunistic cleanup: sessions for this site that never sent a
    // session_end and are old enough that they never will (tab was killed,
    // or it was a script that didn't stick around) are indistinguishable
    // from noise -- fold them into bots so they stop inflating visitor counts.
    admin
      .from("sessions")
      .update({ is_bot: true })
      .eq("site_id", site_id)
      .eq("is_bot", false)
      .is("duration_seconds", null)
      .lt("session_start", new Date(Date.now() - ABANDONED_SESSION_MS).toISOString())
      .then(() => {});

    return json({ ok: true });
  }

  if (action === "session_end") {
    const duration = typeof body.duration_seconds === "number" ? Math.max(0, Math.min(86400, Math.floor(body.duration_seconds))) : null;
    const isBounce = typeof body.is_bounce === "boolean" ? body.is_bounce : null;

    const { data: existing } = await admin
      .from("sessions")
      .select("is_bot")
      .eq("id", session_id)
      .eq("site_id", site_id)
      .maybeSingle();

    const tooShort = duration !== null && duration < MIN_HUMAN_SECONDS;
    const tooLong = duration !== null && duration > REALISTIC_MAX_SECONDS;
    const isBot = Boolean(existing?.is_bot) || tooShort || tooLong;

    const { error } = await admin
      .from("sessions")
      .update({ session_end: new Date().toISOString(), duration_seconds: duration, is_bounce: isBounce, is_bot: isBot })
      .eq("id", session_id)
      .eq("site_id", site_id);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "pageview") {
    const pvId = typeof body.pv_id === "string" && UUID_RE.test(body.pv_id) ? body.pv_id : null;
    const path = clipPath(body.path);
    if (!pvId || !path) return json({ error: "missing pv_id or path" }, 400);

    const { data: session } = await admin
      .from("sessions")
      .select("id")
      .eq("id", session_id)
      .eq("site_id", site_id)
      .maybeSingle();
    if (!session) return json({ error: "unknown session" }, 404);

    const { count } = await admin
      .from("pageviews")
      .select("id", { count: "exact", head: true })
      .eq("session_id", session_id);
    if ((count ?? 0) >= MAX_PAGEVIEWS_PER_SESSION) return json({ error: "rate limited" }, 429);

    const { error } = await admin.from("pageviews").insert({
      id: pvId,
      session_id,
      site_id,
      path,
      title: clip(body.title, 200),
      prev_path: clipPath(body.prev_path),
    });
    if (error && !/duplicate key/.test(error.message)) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "pageview_end") {
    const pvId = typeof body.pv_id === "string" && UUID_RE.test(body.pv_id) ? body.pv_id : null;
    if (!pvId) return json({ error: "missing pv_id" }, 400);

    const patch: Record<string, number | null> = {};
    const scroll = int(body.scroll_pct, 0, 100);
    const engaged = int(body.engaged_seconds, 0, 86400);
    const lcp = int(body.lcp_ms, 0, 120000);
    const fcp = int(body.fcp_ms, 0, 120000);
    const ttfb = int(body.ttfb_ms, 0, 120000);
    const inp = int(body.inp_ms, 0, 120000);
    const cls = typeof body.cls === "number" && Number.isFinite(body.cls) ? Math.max(0, Math.min(10, body.cls)) : null;
    if (scroll !== null) patch.scroll_pct = scroll;
    if (engaged !== null) patch.engaged_seconds = engaged;
    if (lcp !== null) patch.lcp_ms = lcp;
    if (fcp !== null) patch.fcp_ms = fcp;
    if (ttfb !== null) patch.ttfb_ms = ttfb;
    if (inp !== null) patch.inp_ms = inp;
    if (cls !== null) patch.cls = cls;
    if (Object.keys(patch).length === 0) return json({ ok: true });

    const { error } = await admin
      .from("pageviews")
      .update(patch)
      .eq("id", pvId)
      .eq("session_id", session_id)
      .eq("site_id", site_id);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "event") {
    const eventType = typeof body.event_type === "string" ? body.event_type : "";
    if (!EVENT_TYPES.has(eventType)) {
      return json({ error: "invalid event_type" }, 400);
    }

    // An event used to be accepted for any session_id at all, so a lead could
    // be recorded without a visit ever happening. Lead follow-through is the
    // number clients care about most, so make an event prove it belongs to a
    // session this site actually has.
    const { data: session } = await admin
      .from("sessions")
      .select("id")
      .eq("id", session_id)
      .eq("site_id", site_id)
      .maybeSingle();

    if (!session) {
      return json({ error: "unknown session" }, 404);
    }

    const eventTarget = typeof body.event_target === "string" ? body.event_target.slice(0, LEAD_TARGETS_MAX_LEN) : null;

    if (eventType === "social_click") {
      if (!eventTarget || !SOCIAL_PLATFORMS.has(eventTarget)) {
        return json({ error: "invalid event_target for social_click" }, 400);
      }
    }

    // Lead events keep their old, uncapped behavior: they are rare and are the
    // numbers that matter most. Everything else is capped per session.
    if (eventType !== "lead_submit") {
      const { count } = await admin
        .from("events")
        .select("id", { count: "exact", head: true })
        .eq("session_id", session_id);
      if ((count ?? 0) >= MAX_EVENTS_PER_SESSION) return json({ error: "rate limited" }, 429);
    }

    // Custom event props: a small flat object only, so the column cannot be
    // used to stash arbitrary payloads.
    let props: Record<string, string | number | boolean> | null = null;
    if (body.event_props && typeof body.event_props === "object" && !Array.isArray(body.event_props)) {
      const out: Record<string, string | number | boolean> = {};
      for (const [k, v] of Object.entries(body.event_props as Record<string, unknown>).slice(0, 10)) {
        if (typeof v === "string") out[k.slice(0, 40)] = v.slice(0, 200);
        else if (typeof v === "number" && Number.isFinite(v)) out[k.slice(0, 40)] = v;
        else if (typeof v === "boolean") out[k.slice(0, 40)] = v;
      }
      if (Object.keys(out).length) props = out;
    }
    const value = typeof body.event_value === "number" && Number.isFinite(body.event_value)
      ? Math.max(-1e9, Math.min(1e9, body.event_value))
      : null;

    const { error } = await admin.from("events").insert({
      session_id,
      site_id,
      event_type: eventType,
      event_target: eventTarget,
      event_value: value,
      event_props: props,
      path: clipPath(body.path),
    });
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: "unknown action" }, 400);
});
