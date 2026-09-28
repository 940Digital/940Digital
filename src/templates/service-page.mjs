/**
 * Renders a service page from a structured content module.
 *
 * The chrome and section order are shared; every word of prose is hand-written
 * per page in src/content/services/<slug>.mjs. That is the point: there is no
 * slot that says "insert service name here", so the pages cannot become 41
 * copies of one another with a word swapped.
 *
 * Sections are optional. A narrow service with little to say renders short
 * rather than padded, which is the instruction: length follows substance.
 *
 * @typedef {Object} ServiceContent
 * @property {string[]} lead        Answer-first opening. Must stand alone when quoted.
 * @property {{h:string,p:string}[]} [included]  Concrete deliverables.
 * @property {string} [includedTitle]
 * @property {{title:string, paras:string[]}} [extra]  One page-specific block.
 * @property {{h:string,p:string}[]} [steps]     What actually happens, in order.
 * @property {string[]} [differs]   How this differs from its nearest sibling. Omit
 *   where the page's own service list already makes the distinction obvious.
 * @property {'plan'|'quote'} [cost]
 * @property {string} [costNote]
 * @property {{q:string,a:string}[]} faqs
 * @property {string} [limit]       An honest "you may not need this" line.
 */
import { PLANS, planIncluding } from '../data/plans.mjs';
import { isPublished, byUrl } from '../data/services.mjs';

const esc = (s) =>
  String(s).replace(/&(?!(?:[a-zA-Z]+|#\d+);|<)/g, '&amp;');

/** Allows inline anchors written by hand in the content modules. */
const rich = (s) => String(s);

/**
 * Demotes any internal link whose target is not published to plain text.
 *
 * Content modules are written with the cross-links the page should eventually
 * have. This means a page can reference a sibling that has not been built yet
 * without ever shipping a link to a URL with no file behind it, and the link
 * appears on its own the moment that sibling publishes. No hand-maintained
 * list of what currently exists.
 */
function resolveLinks(html) {
  return html.replace(/<a href="(\/[^"#?]*)"[^>]*>([\s\S]*?)<\/a>/g, (whole, href, text) => {
    if (href === '/' || href === '/contact' || href === '/pricing' || href === '/work' || href === '/about') return whole;
    if (byUrl(href) && !isPublished(href)) return text;
    return whole;
  });
}

export function renderService(page, content, parts) {
  const out = [];

  out.push(`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">${esc(page.name)}</p>
        <h1>${esc(page.h1)}</h1>
        <p>${rich(content.lead[0])}</p>
      </div>
    </section>`);

  /* Answer-first block. Written to stand on its own when an AI assistant or a
     search result quotes it, so it repeats the what, the who and the where. */
  const restOfLead = content.lead.slice(1);
  if (restOfLead.length) {
    out.push(`    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>What this is</h2>
${restOfLead.map((p) => `          <p>${rich(p)}</p>`).join('\n')}
        </div>
      </div>
    </section>`);
  }

  if (content.included && content.included.length) {
    out.push(`    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">What you get</p>
          <h2>${esc(content.includedTitle || "What's included")}</h2>
        </div>
        <ul class="svc-items svc-items--wide reveal">
${content.included
  .map(
    (it, i) => `          <li class="svc-item">
            <span class="svc-item-num">${String(i + 1).padStart(2, '0')}</span>
            <div class="svc-item-body">
              <h3>${esc(it.h)}</h3>
              <p>${rich(it.p)}</p>
            </div>
          </li>`
  )
  .join('\n')}
        </ul>
      </div>
    </section>`);
  }

  if (content.steps && content.steps.length) {
    out.push(`    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">How it runs</p>
          <h2>What actually happens</h2>
        </div>
        <div class="timeline">
${content.steps
  .map(
    (s, i) => `          <div class="timeline-step reveal reveal-delay-${i + 1}">
            <div class="timeline-dot">${String(i + 1).padStart(2, '0')}</div>
            <h3>${esc(s.h)}</h3>
            <p>${rich(s.p)}</p>
          </div>`
  )
  .join('\n')}
        </div>
      </div>
    </section>`);
  }

  if (content.extra) {
    out.push(`    <section class="section">
      <div class="container">
        <div class="prose reveal">
          <h2>${esc(content.extra.title)}</h2>
${content.extra.paras.map((p) => `          <p>${rich(p)}</p>`).join('\n')}
        </div>
      </div>
    </section>`);
  }

  if (parts.proofFor && parts.proofFor(page.url)) {
    out.push(`    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">Proof</p>
          <h2>Where this is already&nbsp;live</h2>
        </div>
        <div class="portfolio-grid">
${parts.proofFor(page.url)}
        </div>
      </div>
    </section>`);
  }

  /* Cost. Plan-covered services name the plan and link /pricing; everything
     else says it is quoted after a free consult. No figure is ever typed here:
     PLANS is parsed from the pricing page at build time. */
  out.push(`    <section class="section${parts.proofFor && parts.proofFor(page.url) ? '' : ' section--sand'}"${parts.proofFor && parts.proofFor(page.url) ? '' : ' style="background:var(--sand)"'}>
      <div class="container">
        <div class="prose reveal">
          <h2>What it costs</h2>
          ${costBlock(content, page)}
        </div>
      </div>
    </section>`);

  /* Optional. On a page whose own service list already shows the sibling, a
     paragraph explaining the difference restates what the reader can see. It
     earns its place only where two services are genuinely confusable. */
  if ((content.differs && content.differs.length) || content.limit) {
    out.push(`    <section class="section">
      <div class="container">
        <div class="prose reveal">
          <h2>${esc(content.differsTitle || 'How this differs')}</h2>
${(content.differs || []).map((p) => `          <p>${rich(p)}</p>`).join('\n')}
${content.limit ? `          <p class="svc-limit">${rich(content.limit)}</p>` : ''}
        </div>
      </div>
    </section>`);
  }

  out.push(`    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow">Questions</p>
          <h2>What people ask</h2>
        </div>
        <div class="faq-list">
${content.faqs
  .map(
    (f) => `          <details class="faq-item">
            <summary>${esc(f.q)}</summary>
            <p>${rich(f.a)}</p>
          </details>`
  )
  .join('\n')}
        </div>
      </div>
    </section>`);

  out.push(`    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">${esc(content.cta || 'Start with a free consult')}</h2>
        <p class="reveal">${rich(content.ctaSub || 'Tell me what is going on and I will tell you whether this is what you actually need. No pitch deck and no pressure.')}</p>
        <a href="/contact" class="btn btn-primary btn-lg reveal">Book a free consult</a>
      </div>
    </section>`);

  return resolveLinks(out.join('\n\n'));
}

function costBlock(content, page) {
  if (content.cost === 'plan') {
    const plan = content.planPhrase ? planIncluding(content.planPhrase) : null;
    if (plan) {
      return `<p>This is included in the <strong>${esc(plan.tier)}</strong> plan, alongside everything in the tiers below it. Setup is ${esc(plan.setup)} and the plan runs ${esc(plan.monthly)}${esc(plan.period)}. The full breakdown is on the <a href="/pricing">pricing page</a>.</p>
          ${content.costNote ? `<p>${rich(content.costNote)}</p>` : ''}`;
    }
  }
  if (content.cost === 'included') {
    return `<p>Included in every plan. There is no separate charge for it and no add-on to opt into. See the <a href="/pricing">pricing page</a> for what each tier covers.</p>
          ${content.costNote ? `<p>${rich(content.costNote)}</p>` : ''}`;
  }
  return `<p>Quoted after a free consult, because what it takes depends entirely on what you already have. ${esc(
    'Book a call, I will tell you what is involved, and you get a number before anything starts.'
  )} If you are already on a plan, this may fold into it: the tiers are on the <a href="/pricing">pricing page</a>.</p>
          ${content.costNote ? `<p>${rich(content.costNote)}</p>` : ''}`;
}
