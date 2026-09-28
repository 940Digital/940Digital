#!/usr/bin/env node
/**
 * The guard. Exits non-zero on any violation so it can gate a commit.
 *
 * Run: npm run check
 *
 * Checks, in the order Owen specified them:
 *  1. Service names match the profile character for character.
 *  2. A page containing TODO(owen) is noindex.
 *  3. A page containing TODO(owen) is out of sitemap.xml.
 *  4. A page containing TODO(owen) is not linked from nav, a hub, the
 *     directory, or the homepage list.
 *  5. No two published pages share a primary keyword.
 *  6. No published page is an orphan.
 *  7. Every internal href resolves to a real file.
 *  8. Every page has a self-referencing canonical, and every service page a
 *     Service block and a BreadcrumbList.
 * Plus: no WordPress, no hosting service heading, no FAQPage, no Google
 * Analytics, no em dashes, and titles/metas within length budget.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/data/site.mjs';
import { PAGES, serviceIndex, childrenOf } from '../src/data/services.mjs';
import { GROUPS } from '../src/data/groups.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const fail = [];
const warn = [];
const err = (check, msg) => fail.push(`[${check}] ${msg}`);

/* Walk for .html output, including the nested service pages under /services,
   /seo, /local-marketing and /consulting. Source and tooling directories are
   skipped: they hold templates, not published pages. */
const SKIP = new Set(['node_modules', 'src', 'scripts', 'docs', 'api', 'css', 'js', 'img', '.git', '.vercel', '.claude']);
function findHtml(dir = '', out = []) {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
    const rel = dir ? `${dir}/${e.name}` : e.name;
    if (e.isDirectory()) findHtml(rel, out);
    else if (e.name.endsWith('.html')) out.push(rel);
  }
  return out;
}
const htmlFiles = findHtml();
const read = (f) => readFileSync(join(ROOT, f), 'utf8');
const docs = new Map(htmlFiles.map((f) => [f, read(f)]));

const fileFor = (url) => (url === '/' ? 'index.html' : `${url.replace(/^\//, '')}.html`);
const urlFor = (f) => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''));

/* ---------- 1. names match the profile, character for character ---------- */
{
  const canon = JSON.parse(read('src/data/gbp-services.json'));
  const canonNames = canon.services.map((s) => s.name);
  const ours = serviceIndex().map((s) => s.name);
  for (const n of canonNames) if (!ours.includes(n)) err('names', `missing from services.mjs: "${n}"`);
  for (const n of ours) if (!canonNames.includes(n)) err('names', `not on the profile: "${n}"`);
  if (ours.length !== canonNames.length)
    err('names', `count mismatch: ${ours.length} in services.mjs vs ${canonNames.length} on the profile`);
  const dupes = ours.filter((n, i) => ours.indexOf(n) !== i);
  if (dupes.length) err('names', `service claimed by two pages: ${[...new Set(dupes)].join(', ')}`);
  for (const [name, cat] of Object.entries(
    Object.fromEntries(canon.services.map((s) => [s.name, s.gbpCategory]))
  )) {
    const mine = serviceIndex().find((s) => s.name === name);
    if (mine && mine.gbpCategory !== cat)
      err('names', `"${name}" category is "${mine.gbpCategory}", profile says "${cat}"`);
  }
}

/* ---------- every service sits in exactly one hub group ---------- */
for (const [hub, groups] of Object.entries(GROUPS)) {
  const grouped = groups.flatMap(([, urls]) => urls);
  const actual = childrenOf(hub).map((p) => p.url);
  for (const u of actual) if (!grouped.includes(u)) err('grouping', `${u} is a child of ${hub} but is in no group`);
  for (const u of grouped) if (!actual.includes(u)) err('grouping', `${u} is grouped under ${hub} but is not its child`);
  const dupes = grouped.filter((u, i) => grouped.indexOf(u) !== i);
  for (const u of new Set(dupes)) err('grouping', `${u} appears in more than one group`);
}
for (const hub of ['/', '/seo', '/local-marketing', '/consulting'])
  if (!GROUPS[hub]) err('grouping', `${hub} has no groups defined`);

/* Group labels are navigation, not prose. A label written as a sentence reads
   as padding beside the service names under it. */
for (const [hub, groups] of Object.entries(GROUPS))
  for (const [label] of groups)
    if (label.length > 24) err('grouping', `group label "${label}" on ${hub} is ${label.length} chars; labels are short noun phrases, max 24`);

/* ---------- collect every internal link that appears in a listing ---------- */
const listedLinks = new Set();
for (const [f, html] of docs) {
  for (const m of html.matchAll(/<a[^>]+href="(\/[^"#?]*)"/g)) listedLinks.add(m[1]);
}

const sitemap = existsSync(join(ROOT, 'sitemap.xml')) ? read('sitemap.xml') : '';

/* ---------- 2, 3, 4. the TODO guard ---------- */
for (const [f, html] of docs) {
  const url = urlFor(f);
  if (!/TODO\(owen\)/.test(html)) continue;
  if (!/name="robots" content="noindex/.test(html))
    err('todo', `${f} contains TODO(owen) but is indexable`);
  if (sitemap.includes(`${SITE.origin}${url === '/' ? '/' : url}<`))
    err('todo', `${f} contains TODO(owen) but is in sitemap.xml`);
  if (listedLinks.has(url)) err('todo', `${f} contains TODO(owen) but is linked from another page`);
}

/* draft pages must never be linked or in the sitemap either */
for (const p of PAGES) {
  if (p.status !== 'draft') continue;
  if (listedLinks.has(p.url)) err('draft', `${p.url} is a draft but is linked from another page`);
  if (sitemap.includes(`${SITE.origin}${p.url}<`)) err('draft', `${p.url} is a draft but is in sitemap.xml`);
  if (existsSync(join(ROOT, fileFor(p.url))))
    err('draft', `${p.url} is a draft but ${fileFor(p.url)} exists on disk`);
}

/* ---------- 5. no two published pages share a primary keyword ---------- */
{
  const seen = new Map();
  for (const p of PAGES) {
    if (p.status !== 'published' || !p.primaryKeyword) continue;
    const k = p.primaryKeyword.toLowerCase().trim();
    if (seen.has(k)) err('keyword', `"${k}" is targeted by both ${seen.get(k)} and ${p.url}`);
    seen.set(k, p.url);
  }
}

/* ---------- 6. orphan check ---------- */
for (const p of PAGES) {
  if (p.status !== 'published' || p.url === '/') continue;
  const file = fileFor(p.url);
  let inbound = 0;
  for (const [f, html] of docs) {
    if (f === file) continue;
    if (new RegExp(`<a[^>]+href="${p.url}"`).test(html)) inbound++;
  }
  if (inbound === 0) err('orphan', `${p.url} has no inbound link from any other page`);
}

/* ---------- 7. every internal href resolves ---------- */
{
  const assets = new Set();
  const walk = (dir, prefix = '') => {
    for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      if (e.isDirectory()) walk(join(dir, e.name), `${prefix}${e.name}/`);
      else assets.add(`/${prefix}${e.name}`);
    }
  };
  for (const d of ['css', 'js', 'img']) if (existsSync(join(ROOT, d))) walk(d, `${d}/`);

  for (const [f, html] of docs) {
    for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      const target = m[1].split(/[?#]/)[0];
      if (target === '/') continue;
      if (target.startsWith('/api/')) continue;
      if (assets.has(target)) continue;
      if (docs.has(target.replace(/^\//, '') + '.html')) continue;
      if (target === '/sitemap.xml' || target === '/robots.txt') continue;
      err('link', `${f} links to ${target}, which does not resolve to a file`);
    }
    /* relative internal links break every nested page: ban them outright */
    for (const m of html.matchAll(/(?:href|src)="(?!https?:|\/|#|mailto:|tel:|data:)([^"]+)"/g)) {
      err('relative-link', `${f} has a relative path "${m[1]}". Use a root-absolute path.`);
    }
  }
}

/* ---------- 8. canonical, Service, BreadcrumbList ---------- */
for (const [f, html] of docs) {
  const url = urlFor(f);
  const p = PAGES.find((x) => x.url === url);
  const expected = url === '/' ? `${SITE.origin}/` : `${SITE.origin}${url}`;
  if (f === 'card.html') continue;
  if (!html.includes(`<link rel="canonical" href="${expected}">`))
    err('canonical', `${f} is missing a self-referencing canonical for ${expected}`);
  if (!/"@type":\s*"BreadcrumbList"/.test(html)) err('schema', `${f} has no BreadcrumbList`);
  if (p && p.covers.length && !/"@type":\s*"Service"/.test(html))
    err('schema', `${f} carries a GBP service but has no Service block`);
}

/* ---------- content rules ---------- */
for (const [f, html] of docs) {
  if (/wordpress/i.test(html)) err('rule', `${f} mentions WordPress`);
  if (/"@type":\s*"FAQPage"/.test(html)) err('rule', `${f} has FAQPage schema (Google dropped FAQ rich results 2026-05-07)`);
  if (/Google Analytics/.test(html)) err('rule', `${f} mentions Google Analytics`);
  if (/<h[1-6][^>]*>[^<]*Hosting\s*(&amp;|&|and)\s*Maintenance/i.test(html))
    err('rule', `${f} has a "Hosting & Maintenance" heading. Hosting is a plan feature, not a service.`);
  if (html.includes('—')) err('rule', `${f} contains an em dash`);
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (f !== 'card.html' && h1s.length !== 1) err('rule', `${f} has ${h1s.length} h1 elements, expected 1`);
  const decodeEnt = (t) => t.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  const title = decodeEnt((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  if (title.length > 60) warn.push(`${f} title is ${title.length} chars: "${title}"`);
  const meta = decodeEnt((html.match(/name="description" content="([^"]*)"/) || [])[1] || '');
  if (meta && (meta.length < 120 || meta.length > 165))
    warn.push(`${f} meta description is ${meta.length} chars (want 140-160)`);
  /* the h1 must not simply restate the title tag */
  const h1text = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const plain = h1text.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
  if (plain && title.toLowerCase().startsWith(plain.toLowerCase()) && plain.length > 20)
    err('rule', `${f} h1 duplicates the title tag`);
}

/* ---------- the GBP landing page must mention every service ---------- */
{
  const home = docs.get('index.html') || '';
  const decoded = home.replace(/&amp;/g, '&');
  for (const s of serviceIndex()) {
    if (!decoded.includes(s.name)) err('gbp-landing', `homepage does not mention "${s.name}"`);
  }
}

/* ---------- report ---------- */
console.log(`checked ${docs.size} html files, ${PAGES.length} mapped pages, ${serviceIndex().length} services\n`);
if (warn.length) {
  console.log(`${warn.length} warning(s):`);
  for (const w of warn) console.log(`  ! ${w}`);
  console.log('');
}
if (fail.length) {
  console.log(`${fail.length} FAILURE(S):`);
  for (const f of fail) console.log(`  x ${f}`);
  process.exit(1);
}
console.log('all checks passed');
