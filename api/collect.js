// First-party proxy for the tracking beacon. The tracker posts here (same
// origin as the tracked site) instead of directly to Supabase, since a raw
// backend domain in a beacon URL is exactly what generic tracker-blocklists
// are built to catch. This endpoint is indistinguishable from any other
// first-party API call.
const UPSTREAM_URL = "https://yyfeymmjdlewvdxrzggn.supabase.co/functions/v1/collect";

// Server-side UA sniffing, harder to spoof than trusting client JS to
// self-report, since this reads the header the browser/bot actually sent.
const BOT_UA_REGEX =
  /bot|crawl|spider|slurp|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|curl|wget|python-requests|python-urllib|go-http-client|okhttp|axios|node-fetch|headlesschrome|phantomjs|selenium|puppeteer|playwright|ahrefsbot|semrushbot|mj12bot|dotbot|blexbot|yandexbot|baiduspider|sogou|duckduckbot|bingpreview|adsbot|apis-google|mediapartners-google/i;

// Real browsers haven't shipped a UA with a bare "Edge/<version>" token since
// legacy EdgeHTML was discontinued (~2020); modern Chromium Edge always
// says "Edg/". Seeing "Edge/" paired with a current Chrome token is a
// self-contradictory, spoofed UA (observed repeatedly from scripted clients).
const FAKE_UA_REGEX = /\bedge\/\d/i;

// Referrers that are never a real visitor: traffic from Vercel's own
// deployment/preview tooling (build screenshots, health checks) hitting the
// production URL, not a person clicking a link.
const BOT_REFERRER_HOSTS = new Set(["vercel.com"]);

function isBotReferrer(referrer) {
  if (typeof referrer !== "string" || !referrer) return false;
  try {
    return BOT_REFERRER_HOSTS.has(new URL(referrer).hostname.replace(/^www\./, ""));
  } catch {
    return false;
  }
}

module.exports = async function handler(req, res) {
  // navigator.sendBeacon() - the tracker's primary send path - always makes
  // cross-origin requests with credentials mode "include" (not something
  // the caller can opt out of, per the Beacon spec), and browsers now
  // reject a wildcard Access-Control-Allow-Origin whenever credentials are
  // included. That silently broke every beacon from every tracked site
  // other than 940digital.com itself (same-origin, so CORS never applied
  // there) - the OPTIONS preflight kept succeeding, masking the failure,
  // while the actual POST was rejected client-side before it ever reached
  // this handler. Reflecting the real Origin instead of "*" satisfies that
  // check; this endpoint has no cookies/auth of its own to protect, so
  // there's nothing sensitive being exposed by allowing credentials here.
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Vary", "Origin");
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
    const webdriverFlag = req.body && req.body.webdriver === true;
    const isBot =
      BOT_UA_REGEX.test(userAgent) ||
      FAKE_UA_REGEX.test(userAgent) ||
      webdriverFlag ||
      isBotReferrer(req.body && req.body.referrer);
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
