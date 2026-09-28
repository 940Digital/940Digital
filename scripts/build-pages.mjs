/**
 * Renders every page from src/ into committed .html files at the repo root.
 *
 * Output is committed deliberately. Vercel keeps serving plain static files
 * with no build command, so a build failure can never take the site down, and
 * the diff of what actually ships is reviewable.
 *
 * card.html is NOT generated. It is a bespoke QR landing page with a pre-nav
 * overlay, its own tracker call carrying a tag parameter, and its own scripts.
 * It is noindex, absent from the sitemap, and unlinked from nav, so routing it
 * through here would add risk for no SEO benefit. Its links were converted to
 * absolute paths by hand.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, byUrl, childrenOf, serviceIndex, isPublished } from '../src/data/services.mjs';
import * as layout from '../src/templates/layout.mjs';
import { CLIENTS } from '../src/data/site.mjs';
import { PLANS } from '../src/data/plans.mjs';
import { renderService } from '../src/templates/service-page.mjs';
import { existsSync } from 'node:fs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Spelled-out counts, generated so copy cannot drift from the data. */
const WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
  'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const spell = (n) => {
  if (n <= 20) return WORDS[n];
  const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const t = Math.floor(n / 10), o = n % 10;
  return o ? `${tens[t]}-${WORDS[o]}` : tens[t];
};
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const esc = (t) => String(t).replace(/&(?!(?:[a-zA-Z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');

/** Portfolio cards for a service page, from the four real client builds. */
function proofCards(urlsFilter) {
  return Object.values(CLIENTS)
    .filter((c) => !urlsFilter || c.demonstrates.includes(urlsFilter))
    .map((c, i) => `          <a href="${c.url}" target="_blank" rel="noopener" class="portfolio-card reveal reveal-scale reveal-delay-${(i % 3) + 1}">
            <div class="portfolio-card-body">
              <div class="portfolio-card-tag">${esc(c.trade)}</div>
              <h3>${esc(c.name)}</h3>
              <p>${esc(c.location)}. ${esc(c.note)}</p>
              <span class="portfolio-card-link">Visit site &#8599;</span>
            </div>
          </a>`)
    .join('\n');
}

/** Plan summary, rendered from the parsed /pricing data. Never hand-typed. */
function planStrip() {
  return PLANS.map((p) => `          <div class="plan${p.featured ? ' plan--featured' : ''}">
            <p class="plan-tier">${esc(p.tier)}</p>
            <p class="plan-price"><span>${esc(p.monthly)}</span>${esc(p.period)}</p>
            <p class="plan-setup">${esc(p.setup)}</p>
            <p class="plan-pages">${esc(p.features[0])}</p>
          </div>`).join('\n');
}

const sharedParts = {
  serviceIndex: layout.serviceIndexBlock(),
  serviceDirectory: layout.serviceDirectoryBlock(),
  serviceCount: cap(spell(serviceIndex().length)),
  /* Link only to a published page. A draft renders as plain text, so no page
     can ever link to a URL that has no file. These upgrade themselves the
     moment the target is published. */
  link: (url, text) => (isPublished(url) ? `<a href="${url}">${text}</a>` : text),
  proofCards: proofCards(),
  /* Client proof, only where a build genuinely demonstrates the service. Pages
     with no genuinely relevant client simply omit the section: an absent proof
     block is honest, an invented one is not. */
  proofFor: (url) => {
    const cards = proofCards(url);
    return cards.length ? cards : null;
  },
  planStrip: planStrip(),
};

/**
 * `hubServices` is per-page: each hub lists its own children, grouped by job.
 * Building it once globally silently rendered the string "undefined" inside the
 * <ul> on /local-marketing and /consulting. Resolve it against the page instead.
 *
 * /seo features its AI search group, because AI search is a main service line
 * and a flat run of six equal groups would bury it.
 */
const FEATURE_GROUP = { '/seo': 'AI search' };

function partsFor(url) {
  return {
    ...sharedParts,
    hubServices: layout.hubGroupedList(url, { feature: FEATURE_GROUP[url] || null }),
    hubCount: cap(spell(childrenOf(url).length)),
  };
}

/** Pages that carry hand-written bodies in src/content/. */
const CONTENT_PAGES = [
  {
    url: '/', mod: 'index', out: 'index.html',
    ogTitle: '940Digital | Visibility, Credibility, Growth',
    ogDescription: 'Websites, SEO, and AI search visibility that grow your business. Serving the Dallas-Fort Worth metroplex (DFW), Denton, and surrounding areas.',
  },
  {
    url: '/services', mod: 'services', out: 'services.html',
    ogTitle: 'All services | 940Digital',
    ogDescription: 'Every service 940Digital offers across website design, SEO and AI search, local marketing, and consulting, for small businesses in Dallas-Fort Worth and Denton.',
  },
  { url: '/services/website-design', mod: 'services-website-design', out: 'services/website-design.html' },
  { url: '/seo', mod: 'seo', out: 'seo.html' },
  { url: '/local-marketing', mod: 'local-marketing', out: 'local-marketing.html' },
  { url: '/consulting', mod: 'consulting', out: 'consulting.html' },
];

/**
 * Pages outside the service map that still need generated chrome so the nav,
 * footer, and business schema stay in sync with everything else.
 */
const STATIC_PAGES = [
  {
    url: '/about', mod: 'about', out: 'about.html', robots: 'index, follow',
    title: 'About | 940Digital | Owen Leiter, Denton, TX',
    meta: '940Digital is a personal, senior-level digital marketing partner founded by Owen Leiter, serving small businesses in the Dallas-Fort Worth metroplex and Denton, Texas.',
    ogTitle: 'About | 940Digital',
    ogDescription: 'A personal, senior-level digital marketing partner for small businesses. Founded by Owen Leiter, serving Dallas-Fort Worth and Denton, Texas.',
    h1: 'About',
  },
  {
    url: '/pricing', mod: 'pricing', out: 'pricing.html', robots: 'index, follow',
    title: 'Pricing | 940Digital | Website Pricing in Denton, TX',
    meta: '940Digital website pricing: Basic $200 setup, Plus $400, Pro $800. Flat-rate plans for small businesses in Dallas-Fort Worth and Denton, Texas.',
    ogTitle: 'Pricing | 940Digital',
    ogDescription: 'Transparent website pricing for small businesses. No hidden fees, no hourly billing surprises.',
    h1: 'Pricing',
  },
  {
    /* Title and meta unchanged from the hand-written page. Owen's brief says not
       to restructure /work beyond adding internal links. */
    url: '/work', mod: 'work', out: 'work.html', robots: 'index, follow',
    title: 'Portfolio | 940Digital | Website Portfolio, Denton, TX',
    meta: '940Digital portfolio: websites built for small businesses in the Dallas-Fort Worth metroplex and Denton, Texas.',
    ogTitle: 'Portfolio | 940Digital',
    ogDescription: "See the sites I've built for small businesses in Dallas-Fort Worth and Denton, Texas.",
    h1: 'Portfolio',
  },
  {
    url: '/contact', mod: 'contact', out: 'contact.html', robots: 'index, follow',
    title: 'Contact | 940Digital | Denton, TX Web Design & SEO',
    meta: 'Book a free consult with 940Digital. Call (940) 977-6253 or send a message about your website, SEO, or Google Business Profile in Denton and DFW.',
    ogTitle: 'Contact | 940Digital',
    ogDescription: 'Book a free consult. No pitch deck, no pressure. Just a conversation about what your business needs.',
    h1: 'Contact',
    extraHead: `  <link rel="stylesheet" href="/css/altcha.css">
  <style>
    altcha-widget {
      --altcha-color-base: var(--white, #fff);
      --altcha-color-border: #ddd6c9;
      --altcha-color-text: var(--charcoal-text, #2B2E33);
      --altcha-color-border-focus: var(--blue-accent, #3194E0);
      --altcha-border-radius: var(--radius, 6px);
      --altcha-max-width: 100%;
    }
  </style>`,
    extraBodyFrom: 'contact',
  },
  {
    /* Unchanged. Already noindex and out of the sitemap; out of scope. */
    url: '/blog', mod: 'blog', out: 'blog.html', robots: 'noindex, nofollow',
    title: 'Blog | 940Digital | Websites & SEO for Small Businesses',
    meta: 'Straight-talk notes on websites, SEO, and getting found online, written for small businesses in the Dallas-Fort Worth metroplex and Denton, Texas.',
    ogTitle: 'Blog | 940Digital',
    ogDescription: 'Straight-talk notes on websites, SEO, and getting found online, written for small businesses.',
    h1: 'Blog',
  },
];

let written = 0;
const manifest = [];

for (const spec of [...CONTENT_PAGES, ...STATIC_PAGES]) {
  const mod = await import(`../src/content/${spec.mod}.mjs`);
  const body = typeof mod.body === 'function' ? mod.body(partsFor(spec.url)) : mod.body;

  const mapped = byUrl(spec.url);
  const page = mapped ? { ...mapped, ogTitle: spec.ogTitle, ogDescription: spec.ogDescription } : {
    url: spec.url,
    slug: spec.out.replace(/\.html$/, ''),
    role: 'static',
    name: null,
    covers: [],
    alsoCovers: [],
    gbpCategory: null,
    hub: null,
    primaryKeyword: null,
    title: spec.title,
    h1: spec.h1,
    meta: spec.meta,
    nearestSibling: null,
    gbpDescription: null,
    status: spec.robots.startsWith('noindex') ? 'draft' : 'published',
    ogTitle: spec.ogTitle,
    ogDescription: spec.ogDescription,
  };

  let html = layout.page({ page, body, robots: spec.robots });

  if (spec.extraHead) html = html.replace('</head>', spec.extraHead + '\n</head>');
  if (spec.extraBodyFrom) {
    const extra = await import(`../src/content/${spec.extraBodyFrom}-scripts.mjs`);
    html = html.replace('</body>', extra.scripts + '\n</body>');
  }

  if (/(^|>)\s*undefined\s*(<|$)/m.test(html) || html.includes('[object Object]')) {
    throw new Error(`${spec.out}: a template part was missing (rendered "undefined"). Check partsFor().`);
  }

  mkdirSync(dirname(join(ROOT, spec.out)), { recursive: true });
  writeFileSync(join(ROOT, spec.out), html);
  const emitted = html.match(/name="robots" content="([^"]*)"/)[1];
  manifest.push({ url: spec.url, out: spec.out, bytes: html.length, robots: emitted });
  written++;
}

/* Service pages driven by a structured content module in src/content/services.
   A page without a module stays a draft and writes no file at all. */
let serviceCount = 0;
for (const p of PAGES) {
  if (p.role !== 'service' || p.status !== 'published') continue;
  const slug = p.url.split('/').pop();
  const modPath = new URL(`../src/content/services/${slug}.mjs`, import.meta.url);
  if (!existsSync(modPath)) continue;
  const content = (await import(modPath.href)).default;
  const body = renderService(p, content, partsFor(p.url));
  const html = layout.page({ page: p, body });
  const out = `${p.slug}.html`;
  mkdirSync(dirname(join(ROOT, out)), { recursive: true });
  writeFileSync(join(ROOT, out), html);
  manifest.push({ url: p.url, out, bytes: html.length, robots: html.match(/name="robots" content="([^"]*)"/)[1] });
  serviceCount++;
}

const draftServices = PAGES.filter((p) => p.role === 'service' && p.status === 'draft');

console.log(`built ${written + serviceCount} pages (${serviceCount} service pages)`);
for (const m of manifest) {
  console.log(`  ${m.out.padEnd(22)} ${String(m.bytes).padStart(6)}b  ${m.robots}`);
}
console.log(`\n${draftServices.length} service pages held as drafts (no file written, waiting on answers)`);
