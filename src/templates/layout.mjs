/**
 * Page assembly and the shared service-listing components.
 *
 * Linking rule, enforced here rather than trusted to the author: a service is
 * NAMED in every listing (the GBP landing page has to mention all 45 services)
 * but only LINKED when its page is published. Draft pages render as plain text,
 * so no listing can ever point at a TODO page or a 404.
 */
import { SITE } from '../data/site.mjs';
import { CATEGORIES, CATEGORY_HUB, CATEGORY_LABEL, byUrl, servicesByCategory, childrenOf } from '../data/services.mjs';
import { GROUPS } from '../data/groups.mjs';
import * as chrome from './chrome.mjs';
import * as schema from './schema.mjs';

const { esc } = chrome;

/** Breadcrumb trail for a page. Web design services go Home > Services > X. */
export function trailFor(page) {
  if (page.url === '/') return [{ label: 'Home', href: '/' }];
  const home = { label: 'Home', href: '/' };
  if (page.role !== 'service') return [home, { label: page.h1.split(':')[0], href: page.url, short: true }];
  const hubUrl = page.hub;
  const mid =
    hubUrl === '/'
      ? { label: 'Services', href: '/services' }
      : { label: CATEGORY_LABEL[page.gbpCategory], href: hubUrl };
  return [home, mid, { label: page.name, href: page.url }];
}

/** Trail using the short page label for hubs and the directory. */
function cleanTrail(page) {
  if (page.url === '/') return [{ label: 'Home', href: '/' }];
  if (page.role === 'service') return trailFor(page);
  const labels = { '/services': 'All services', '/seo': 'SEO & AI search', '/local-marketing': 'Local marketing', '/consulting': 'Consulting' };
  return [{ label: 'Home', href: '/' }, { label: labels[page.url] || page.h1, href: page.url }];
}

/**
 * The "Everything I do" index: all 43 profile services grouped by the four GBP
 * categories. Used on the homepage, because the GBP landing page should mention
 * every service on the profile (Sterling Sky).
 *
 * Laid out as an editorial index, not a card grid: a fixed label column on the
 * left naming the category, and the services flowing in balanced CSS columns on
 * the right. CSS columns balance themselves, so the wildly different category
 * sizes (12 / 18 / 7 / 6) cannot leave a stranded item the way a grid does.
 */
export function serviceIndexBlock() {
  return CATEGORIES.map((cat, i) => {
    const hub = CATEGORY_HUB[cat];
    const services = servicesByCategory(cat);
    const items = services
      .map((s) => {
        const label = esc(s.name);
        return s.published
          ? `            <li><a href="${s.url}">${label}</a></li>`
          : `            <li><span class="svc-soon">${label}</span></li>`;
      })
      .join('\n');
    return `        <div class="svc-row">
          <div class="svc-row-label">
            <span class="svc-row-num">${String(i + 1).padStart(2, '0')}</span>
            <h3><a href="${hub}">${esc(CATEGORY_LABEL[cat])}</a></h3>
            <p class="svc-row-count">${services.length} service${services.length === 1 ? '' : 's'}</p>
          </div>
          <ul class="svc-row-items">
${items}
          </ul>
        </div>`;
  }).join('\n');
}

/**
 * The /services directory: the same 43 services with their profile
 * descriptions. Deliberately a different skeleton from the homepage index, so
 * the two pages do not read as the same block twice.
 */
export function serviceDirectoryBlock() {
  return CATEGORIES.map((cat) => {
    const hub = CATEGORY_HUB[cat];
    const hubPage = byUrl(hub);
    const services = servicesByCategory(cat);
    const items = services
      .map((s) => {
        const label = esc(s.name);
        const name = s.published
          ? `<a href="${s.url}">${label}</a>`
          : `<span class="svc-soon">${label}</span>`;
        const desc = s.gbpDescription ? esc(s.gbpDescription) : esc(byUrl(s.url)?.meta || '');
        return `            <div class="dir-item">
              <dt>${name}</dt>
              <dd>${desc}</dd>
            </div>`;
      })
      .join('\n');
    return `        <section class="dir-cat">
          <header class="dir-cat-head">
            <h2><a href="${hub}">${esc(cat)}</a></h2>
            <p>${esc(hubPage ? hubPage.meta : '')}</p>
          </header>
          <dl class="dir-list">
${items}
          </dl>
        </section>`;
  }).join('\n');
}

/**
 * A hub's services, grouped by job and rendered as rows.
 *
 * Rows rather than a card grid on purpose: a responsive grid of 7 items leaves
 * a lone card stranded on the last row at some breakpoint. Rows never do, at
 * any width, for any count.
 *
 * `feature` renders one named group with more weight (larger type, a lead
 * paragraph), which gives the page a hierarchy instead of N identical blocks.
 */
export function hubGroupedList(hubUrl, { feature = null } = {}) {
  const groups = GROUPS[hubUrl] || [];
  return groups
    .map(([label, urls], gi) => {
      const isFeature = feature === label;
      const rows = urls
        .map((u, i) => {
          const p = byUrl(u);
          if (!p) return '';
          const name = esc(p.name);
          const title = p.status === 'published'
            ? `<a href="${p.url}">${name}<span class="svc-arrow" aria-hidden="true">&#8594;</span></a>`
            : `<span class="svc-soon">${name}</span><span class="svc-soon-tag">page in progress</span>`;
          return `            <li class="svc-item">
              <span class="svc-item-num">${String(i + 1).padStart(2, '0')}</span>
              <div class="svc-item-body">
                <h4>${title}</h4>
                <p>${esc(p.gbpDescription || p.meta)}</p>
              </div>
            </li>`;
        })
        .join('\n');
      return `        <section class="svc-group${isFeature ? ' svc-group--feature' : ''}">
          <header class="svc-group-head">
            <span class="svc-group-index" aria-hidden="true">${String(gi + 1).padStart(2, '0')}</span>
            <h3>${esc(label)}</h3>
          </header>
          <ul class="svc-items">
${rows}
          </ul>
        </section>`;
    })
    .join('\n');
}

/** Assemble a complete HTML document. */
export function page({ page: p, body, schemaBlocks, robots }) {
  const trail = cleanTrail(p);
  const blocks = schemaBlocks || defaultSchema(p, trail);
  const isDraft = p.status === 'draft';
  const robotsValue = robots || (isDraft ? 'noindex, follow' : 'index, follow');
  return `<!DOCTYPE html>
<!-- Generated by scripts/build-pages.mjs from src/. Do not edit by hand: run \`npm run build\`. -->
<html lang="en">
<head>
${chrome.head({ page: p, schema: schema.render(blocks), robots: robotsValue })}
</head>
<body>

${chrome.nav(p.url)}

${p.role === 'service' ? chrome.breadcrumbTrail(trail) + '\n\n' : ''}  <main>
${body}
  </main>

${chrome.footer()}

${chrome.tracker()}
</body>
</html>
`;
}

function defaultSchema(p, trail) {
  const blocks = [];
  if (p.url === '/') {
    blocks.push(schema.businessEntity(), schema.founderEntity());
  } else {
    blocks.push(schema.businessReference());
  }
  if (p.covers && p.covers.length) blocks.push(...schema.serviceBlocks(p));
  blocks.push(schema.breadcrumbs(p, trail));
  return blocks;
}

export { chrome, schema, SITE };
