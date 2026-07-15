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

  // Honeypot — real users never see or fill this field.
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

  const html = `
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
        subject: `New contact form submission from ${name}`,
        html,
      }),
    });
    if (!upstream.ok) {
      res.status(502).json({ error: "delivery failed" });
      return;
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: "delivery failed" });
  }
}
