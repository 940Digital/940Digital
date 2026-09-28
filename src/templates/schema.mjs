/**
 * JSON-LD builders. Entity clarity, not rich results.
 *
 * Deliberately NOT emitted anywhere:
 *   - FAQPage. Google stopped showing FAQ rich results on 2026-05-07, so it
 *     earns nothing and is one more block to keep in sync with visible copy.
 *     The visible <details> FAQs stay; only the markup is gone.
 *   - AggregateRating / Review for 940Digital itself. Google ignores
 *     self-serving review markup on LocalBusiness and it risks a manual action.
 *   - Any property describing content that is not visible on the page.
 */
import { SITE } from '../data/site.mjs';
import { CATEGORIES, serviceIndex } from '../data/services.mjs';
import { PLANS } from '../data/plans.mjs';

const BUSINESS_ID = `${SITE.origin}/#business`;
const FOUNDER_ID = `${SITE.origin}/#owen`;

const abs = (url) => (url === '/' ? `${SITE.origin}/` : `${SITE.origin}${url}`);

/** Drop null/undefined/empty so unanswered TODOs omit the property entirely. */
function prune(obj) {
  if (Array.isArray(obj)) return obj.map(prune).filter((v) => v != null);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const p = prune(v);
      if (p == null) continue;
      if (Array.isArray(p) && p.length === 0) continue;
      if (typeof p === 'object' && !Array.isArray(p) && Object.keys(p).length === 0) continue;
      out[k] = p;
    }
    return Object.keys(out).length ? out : null;
  }
  return obj;
}

function areaServed() {
  return SITE.areaServed.map((a) => ({ '@type': a.type, name: a.name }));
}

/**
 * One parent OfferCatalog with a child catalog per GBP category, each listing
 * the exact service names. Generated, so it cannot drift from the profile.
 */
function offerCatalog() {
  const index = serviceIndex();
  return {
    '@type': 'OfferCatalog',
    name: '940Digital services',
    itemListElement: CATEGORIES.map((cat) => ({
      '@type': 'OfferCatalog',
      name: cat,
      itemListElement: index
        .filter((s) => s.gbpCategory === cat)
        .map((s) => ({
          '@type': 'Offer',
          itemOffered: prune({
            '@type': 'Service',
            name: s.name,
            /* Only link a service whose page is actually published. A draft has
               no file on disk, so emitting its url would point Google at a 404. */
            url: s.published ? abs(s.url) : null,
          }),
        })),
    })),
  };
}

/** The site-wide business entity. Emitted in full on the homepage only. */
export function businessEntity() {
  const sameAs = [SITE.sameAs.googleMaps, ...(SITE.sameAs.others || [])].filter(Boolean);
  return prune({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: SITE.name,
    slogan: SITE.slogan,
    url: `${SITE.origin}/`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    /* Derived from the parsed pricing page. Hand-typing this is how a schema
       price range ends up contradicting the page it describes. */
    priceRange: priceRange(),
    /* Kept as-is pending question 8 in docs/service-page-questions.md. Owen has
       not decided whether to keep a headcount of one on the profile entity, so
       the existing behaviour stands rather than me deciding for him. */
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 1 },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: areaServed(),
    sameAs: sameAs.length ? sameAs : null,
    openingHoursSpecification: SITE.hours,
    founder: { '@id': FOUNDER_ID },
    hasOfferCatalog: offerCatalog(),
  });
}

/** The founder. Fixes the dangling #owen reference every page used to carry. */
export function founderEntity() {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: SITE.founder.name,
    jobTitle: SITE.founder.jobTitle,
    worksFor: { '@id': BUSINESS_ID },
    sameAs: SITE.founder.linkedIn ? [SITE.founder.linkedIn] : null,
  });
}

/** A lightweight reference for non-homepage pages. Full entity lives on /. */
export function businessReference() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: SITE.name,
    url: `${SITE.origin}/`,
  };
}

/** One Service block per GBP service the page carries. */
export function serviceBlocks(page) {
  return page.covers.map((name) =>
    prune({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      serviceType: name,
      description: page.meta,
      url: abs(page.url),
      provider: { '@id': BUSINESS_ID },
      areaServed: areaServed(),
    })
  );
}

/** Home > Hub > Service. Web design services use Home > Services > Service. */
export function breadcrumbs(page, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.label,
      item: abs(t.href),
    })),
  };
}

/**
 * JSON-LD is emitted compactly. Pretty-printing the 45-service offer catalog
 * nearly doubled it (19KB vs 10KB) and pushed the homepage's First Contentful
 * Paint from 0.97 to 0.57 in Lighthouse. Machines read this, not people.
 */
export function render(blocks) {
  return blocks
    .filter(Boolean)
    .map((b) => `  <script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join('\n');
}

/** Setup-fee range across all published plans, read from /pricing. */
function priceRange() {
  const fees = PLANS.map((p) => Number(String(p.setup).replace(/[^0-9]/g, ''))).filter(Boolean);
  if (!fees.length) return null;
  const lo = Math.min(...fees), hi = Math.max(...fees);
  return lo === hi ? `$${lo}` : `$${lo}-$${hi}`;
}
