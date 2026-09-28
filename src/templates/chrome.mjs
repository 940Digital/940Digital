/**
 * Shared page chrome: head, nav, footer, tracker.
 *
 * Every internal href and asset path here is ROOT-ABSOLUTE. The old pages used
 * relative paths (href="services", href="css/style.css"), which resolve
 * correctly only from the site root. From /seo/seo-audit they would resolve to
 * /seo/services and /seo/css/style.css, so nested pages would ship with a
 * broken nav, no stylesheet, and no JavaScript. Do not reintroduce a relative
 * path in this file.
 */
import { SITE, NAV, FOOTER_LINKS, SERVICE_AREA_LINE } from '../data/site.mjs';
import { isPublished } from '../data/services.mjs';

const esc = (s) =>
  String(s).replace(/&(?!(?:[a-zA-Z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

export function head({ page, schema, canonical, robots }) {
  const url = canonical || (page.url === '/' ? `${SITE.origin}/` : `${SITE.origin}${page.url}`);
  /* Social copy stays distinct from the title tag. The title tag is written for
     search results and carries the keyword; og/twitter are written for a human
     looking at a shared card. Falling back to the title flattens both. */
  const ogTitle = page.ogTitle || page.title;
  const ogDesc = page.ogDescription || page.meta;
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${escAttr(page.meta)}">
  <meta property="og:title" content="${escAttr(ogTitle)}">
  <meta property="og:description" content="${escAttr(ogDesc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escAttr(ogTitle)}">
  <meta name="twitter:description" content="${escAttr(ogDesc)}">
  <meta name="robots" content="${robots}">
  <link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
  <link rel="canonical" href="${url}">
  <link rel="stylesheet" href="/css/style.css">
${schema}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${SITE.fonts}" rel="stylesheet">`;
}

/**
 * The wordmark. `small` reproduces the footer's original inline sizing
 * (1.3rem / 1.5rem); the nav uses the stylesheet's default size.
 */
const wordmark = ({ style = '', small = false, indent = 6 } = {}) => {
  const pad = ' '.repeat(indent);
  const num = small ? ' style="font-size:1.3rem"' : '';
  const script = small ? ' style="font-size:1.5rem"' : '';
  return `<a href="/" class="wordmark"${style ? ` style="${style}"` : ''}>
${pad}  <span class="wm-num"${num}>940</span><span class="wm-script"${script}>Digital</span>
${pad}</a>`;
};

/**
 * Nav. "Services" is a group: the three category hubs plus the full directory.
 * Not all 45. Rendered as a real <ul> so it works without JavaScript (CSS
 * hover and :focus-within open it on desktop, and the mobile menu shows the
 * children inline).
 */
export function nav(currentUrl) {
  const items = NAV.map((item) => {
    const active = item.href === currentUrl ? ' active' : '';
    if (item.cta) {
      return `        <a href="${item.href}" class="btn btn-primary nav-cta">${esc(item.label)}</a>`;
    }
    if (!item.children) {
      return `        <a href="${item.href}" class="nav-link${active}">${esc(item.label)}</a>`;
    }
    const kids = item.children
      .filter((c) => isPublished(c.href))
      .map(
        (c) =>
          `            <li><a href="${c.href}${c.anchor || ''}"${c.href === currentUrl ? ' class="active"' : ''}>${esc(c.label)}</a></li>`
      )
      .join('\n');
    const groupActive = item.children.some((c) => c.href === currentUrl) ? ' active' : active;
    return `        <div class="nav-group">
          <a href="${item.href}" class="nav-link nav-group-trigger${groupActive}" aria-haspopup="true" aria-expanded="false">${esc(item.label)}<span class="nav-group-caret" aria-hidden="true"></span></a>
          <ul class="nav-group-menu">
${kids}
          </ul>
        </div>`;
  }).join('\n');

  return `  <nav class="nav" id="nav">
    <div class="nav-inner container">
      ${wordmark({ indent: 6 })}
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-menu">
${items}
      </div>
    </div>
  </nav>`;
}

/** Visible breadcrumb trail. Paired with BreadcrumbList schema. */
export function breadcrumbTrail(trail) {
  if (!trail || trail.length < 2) return '';
  const items = trail
    .map((t, i) => {
      const last = i === trail.length - 1;
      return last
        ? `      <li aria-current="page">${esc(t.label)}</li>`
        : `      <li><a href="${t.href}">${esc(t.label)}</a></li>`;
    })
    .join('\n');
  return `  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="container">
${items}
    </ol>
  </nav>`;
}

export function footer() {
  const links = FOOTER_LINKS.filter((l) => isPublished(l.href) || l.href === '/about' || l.href === '/pricing' || l.href === '/contact')
    .map((l) => `          <a href="${l.href}${l.anchor || ''}">${esc(l.label)}</a>`)
    .join('\n');
  return `  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-left">
          ${wordmark({ style: 'margin-bottom:.25rem', small: true, indent: 10 })}
          <a class="footer-phone" href="tel:${SITE.phone}">${esc(SITE.phoneDisplay)}</a>
          <span class="footer-copy">&copy; <span data-year></span> ${esc(SITE.name)}. All rights reserved.</span>
          <span class="footer-area">${esc(SERVICE_AREA_LINE)}</span>
        </div>
        <div class="footer-links">
${links}
        </div>
      </div>
    </div>
  </footer>`;
}

export function tracker() {
  return `  <script src="/js/main.js"></script>
  <script>(function(d,s,src,site){var e=d.createElement(s);e.async=true;e.src=src+'?site='+site;d.head.appendChild(e);})(document,'script','${SITE.trackerSrc}','${SITE.trackerSiteId}');</script>`;
}

export { esc, escAttr };
