// Verifies the ALTCHA proof-of-work + honeypot before sending via Resend.
// A failed check logs a bot_blocked event through the existing analytics
// pipeline so the dashboard's "Bots Stopped" stat reflects real activity.
import { verifySolution } from "altcha-lib/v1";

const HMAC_KEY = process.env.ALTCHA_HMAC_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = "no-reply@940digital.com";
const RESEND_TO = "940digital@gmail.com";
const COLLECT_URL = "https://www.940digital.com/api/collect";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Cold pitches arrive by hand, so the bot checks never see them: link sellers,
// guest-post offers, white-label offers. They are delivered like any other
// message. They only get a subject tag, so one Gmail filter can sort them, and
// a flag in analytics, so they stop counting as leads.
// Each pattern is specific to selling a service to an agency. A plain "SEO"
// mention is not one, because real prospects ask about SEO.
const PITCH_PATTERNS = [
  ["backlinks", /\bback[- ]?links?\b/i],
  ["link building", /\blink[- ]?building\b/i],
  ["guest posts", /\bguest[- ]?(post|blog|article)s?\b/i],
  ["sponsored posts", /\bsponsored (post|content|article)s?\b/i],
  ["dofollow", /\bdo-?follow\b/i],
  ["domain authority", /\b(domain|site) authority\b|\b(DA|DR)\s?[:\-]?\s?\d{2}\b/],
  ["white label", /\bwhite[- ]?label(ed|ing)?\b/i],
  ["agency outreach", /\b(my|our) (team|company|agency)( and i)? (work|works|partner|partners|support|supports|help|helps)\b[^.]{0,40}\bagenc(y|ies)\b/i],
  ["rank promise", /\b(rank|get) (your|ur) (site|website|business) (on|to|in) (the )?(first|1st|top)\b|first page of google/i],
];

function pitchReasons(...fields) {
  const text = fields.filter(Boolean).join("\n");
  return PITCH_PATTERNS.filter(([, re]) => re.test(text)).map(([label]) => label);
}

async function logSolicitation(siteId, sessionId, reasons) {
  if (!siteId || !sessionId || !UUID_RE.test(siteId) || !UUID_RE.test(sessionId)) return;
  try {
    await fetch(COLLECT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "event",
        site_id: siteId,
        session_id: sessionId,
        event_type: "custom",
        event_target: "lead_solicitation",
        event_props: { reason: reasons.join(", ") },
      }),
    });
  } catch {
    // best-effort logging only
  }
}

async function logBotBlocked(siteId, sessionId) {
  if (!siteId || !sessionId || !UUID_RE.test(siteId) || !UUID_RE.test(sessionId)) return;
  try {
    await fetch(COLLECT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "event", site_id: siteId, session_id: sessionId, event_type: "bot_blocked" }),
    });
  } catch {
    // best-effort logging only
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  const body = req.body || {};
  const { name, business, email, service, message, altcha, website, site_id, session_id } = body;

  // Honeypot: real users never see or fill this field.
  if (website) {
    await logBotBlocked(site_id, session_id);
    res.status(400).json({ error: "submission rejected" });
    return;
  }

  if (!name || !email || !altcha) {
    res.status(400).json({ error: "missing required fields" });
    return;
  }

  let verified = false;
  try {
    verified = await verifySolution(altcha, HMAC_KEY, true);
  } catch {
    verified = false;
  }

  if (!verified) {
    await logBotBlocked(site_id, session_id);
    res.status(400).json({ error: "verification failed" });
    return;
  }

  const reasons = pitchReasons(message, business, name);
  const isPitch = reasons.length > 0;

  const html = `
    ${isPitch ? `<p><strong>Likely a cold pitch</strong> (matched: ${escapeHtml(reasons.join(", "))}). Delivered anyway.</p>` : ""}
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Business:</strong> ${escapeHtml(business || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Interested in:</strong> ${escapeHtml(service || "-")}</p>
    <p><strong>Message:</strong><br>${escapeHtml(message || "-").replace(/\n/g, "<br>")}</p>
  `;

  try {
    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: RESEND_TO,
        reply_to: email,
        subject: `${isPitch ? "[Likely pitch] " : ""}New contact form submission from ${name}`,
        html,
      }),
    });
    if (!upstream.ok) {
      res.status(502).json({ error: "delivery failed" });
      return;
    }
    if (isPitch) await logSolicitation(site_id, session_id, reasons);
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: "delivery failed" });
  }
}
