/**
 * /services/website-design
 *
 * The Website designer category hub, and the landing page for the "website
 * design" GBP service. Structured to match the other three category hubs
 * exactly: hero, what this is, the services, a short closing block, CTA.
 *
 * Stripped back on Owen's instruction ("just make this the same as all the
 * other category pages for now, I don't want any of those extra sections, just
 * tell them what we do"). The inclusions list, the process timeline, the
 * portfolio row, the plan strip and the FAQ block were removed. The substance
 * that mattered is folded into the closing prose instead of sitting in five
 * separate sections.
 *
 * Worth knowing if this gets revisited: as the money page for the primary
 * category it can carry more depth than a hub normally would. The removed
 * sections are in git history rather than gone.
 */
export const body = (parts) => String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">Website design</p>
        <h1>Website design for small businesses in Denton and DFW</h1>
        <p>A custom site built around how your business actually works, structured so customers and search engines both understand what you do and where you do&nbsp;it.</p>
      </div>
    </section>

    <!-- Answer-first. Written to stand on its own when an AI assistant or a
         search result quotes it, so it repeats the what, the who and the where. -->
    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>What this is</h2>
          <p>I design and build custom websites for small businesses in Denton, Denton County, and the Dallas-Fort Worth metroplex. Every site is built for one specific business rather than assembled from a template, and every project starts with a working demo you can click through before you pay anything.</p>
          <p>That last part is the thing worth reading twice. You are not approving a picture of a website. You get a real site, at a real address, that you can open on your phone and show to someone, and you decide from there.</p>
        </div>
      </div>
    </section>

    <!-- The twelve Website designer services from the Google Business Profile,
         grouped by job. Same arrangement as /seo, /local-marketing and
         /consulting. -->
    <section class="section svc-section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">Services</p>
          <h2>What I build</h2>
          <p>Everything on this side of the work, grouped by what you are trying to&nbsp;do.</p>
        </div>
        <div class="svc-groups reveal">
` + parts.hubServices + `
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>How a build runs</h2>
          <p>You book a free consult and tell me about the business. I design and build a working version before you pay for anything. If it is not what you wanted you walk away, and if it is, it goes live on your domain.</p>
          <p>Every site is custom, mobile-first, and built with the search foundations already in place: clean structure, fast pages, structured data, and content that lives in the page source so AI crawlers can read it rather than seeing an empty page.</p>
          <h2>What is included</h2>
          <p>Hosting and website maintenance are part of every plan, so there is no separate IT bill and no invoice when your hours change or you want a new photo up. The tiers and what each one covers are on the <a href="/pricing">pricing page</a>.</p>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">See your site before you pay for&nbsp;it</h2>
        <p class="reveal">Book a free consult. I will build a working version, and you decide from&nbsp;there.</p>
        <a href="/contact" class="btn btn-primary btn-lg reveal">Book a free consult</a>
      </div>
    </section>`;
