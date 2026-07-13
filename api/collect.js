// First-party proxy for the tracking beacon. The tracker posts here (same
// origin as the tracked site) instead of directly to Supabase, since a raw
// backend domain in a beacon URL is exactly what generic tracker-blocklists
// are built to catch — this endpoint is indistinguishable from any other
// first-party API call.
const UPSTREAM_URL = "https://vcivhrzdvwkqebevplgs.supabase.co/functions/v1/collect";

module.exports = async function handler(req, res) {
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

  try {
    const upstream = await fetch(UPSTREAM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const text = await upstream.text();
    res.status(upstream.status).setHeader("Content-Type", "application/json").send(text);
  } catch (err) {
    res.status(502).json({ error: "proxy error" });
  }
};
