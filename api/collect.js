// First-party proxy for the tracking beacon. The tracker posts here (same
// origin as the tracked site) instead of directly to Supabase, since a raw
// backend domain in a beacon URL is exactly what generic tracker-blocklists
// are built to catch — this endpoint is indistinguishable from any other
// first-party API call.
const UPSTREAM_URL = "https://yyfeymmjdlewvdxrzggn.supabase.co/functions/v1/collect";

// Server-side UA sniffing — harder to spoof than trusting client JS to
// self-report, since this reads the header the browser/bot actually sent.
const BOT_UA_REGEX =
  /bot|crawl|spider|slurp|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|curl|wget|python-requests|python-urllib|go-http-client|okhttp|axios|node-fetch|headlesschrome|phantomjs|selenium|puppeteer|playwright|ahrefsbot|semrushbot|mj12bot|dotbot|blexbot|yandexbot|baiduspider|sogou|duckduckbot|bingpreview|adsbot|apis-google|mediapartners-google/i;

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
    const userAgent = (req.headers["user-agent"] || "").slice(0, 300);
    const isBot = BOT_UA_REGEX.test(userAgent);
    const body = { ...req.body, user_agent: userAgent, is_bot: isBot };

    const upstream = await fetch(UPSTREAM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await upstream.text();
    res.status(upstream.status).setHeader("Content-Type", "application/json").send(text);
  } catch (err) {
    res.status(502).json({ error: "proxy error" });
  }
};
