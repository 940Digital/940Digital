/**
 * Plan data, parsed from src/content/pricing.mjs at build time.
 *
 * Service pages must state cost using only what /pricing actually says. Parsing
 * the pricing page rather than restating its numbers means a price change in
 * one place cannot leave a stale figure on a service page. Nothing here is
 * hand-typed.
 */
import { body as pricingBody } from '../content/pricing.mjs';

const html = typeof pricingBody === 'function' ? pricingBody({}) : pricingBody;

function parsePlans() {
  const cards = [...html.matchAll(/<div class="price-card[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g)];
  const blocks = html.split('<div class="price-card').slice(1);
  return blocks.map((b) => {
    const tier = (b.match(/<div class="price-tier">([^<]+)<\/div>/) || [])[1] || null;
    /* A quoted tier carries a setup floor and no fixed monthly, so the headline
       figure means the opposite of what it means on the fixed tiers. */
    const quoted = /data-quoted="true"/.test(b);
    const headline = (b.match(/<span class="dollar">([^<]+)<\/span>/) || [])[1] || null;
    const monthly = quoted ? null : headline;
    const period = quoted ? null : ((b.match(/<span class="period">([^<]+)<\/span>/) || [])[1] || null);
    const setup = quoted
      ? (headline ? `from ${headline} setup` : null)
      : ((b.match(/<p class="price-setup">([^<]+)<\/p>/) || [])[1] || null);
    const featureBlock = (b.match(/<ul class="price-features">([\s\S]*?)<\/ul>/) || [])[1] || '';
    const features = [...featureBlock.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim()
    );
    const featured = b.startsWith(' featured');
    return { tier, monthly, period, setup, features, featured, quoted };
  }).filter((p) => p.tier);
}

export const PLANS = parsePlans();

/** The plan whose features mention a given phrase, or null. */
export const planIncluding = (phrase) =>
  PLANS.find((p) => p.features.some((f) => f.toLowerCase().includes(phrase.toLowerCase()))) || null;

/** A feature line every plan shares, verified across all of them. */
export const sharedFeature = (phrase) =>
  PLANS.length > 0 && PLANS.every((p) => p.features.some((f) => f.toLowerCase().includes(phrase.toLowerCase())));
