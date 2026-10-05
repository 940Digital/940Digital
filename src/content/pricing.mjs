/**
 * Body content for /pricing. Extracted verbatim from the
 * hand-written pricing.html on 2026-09-27, with internal links converted to
 * root-absolute paths. Chrome (head, nav, footer, schema) is generated.
 */
export const body = String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">Pricing</p>
        <h1>What you'll actually&nbsp;pay</h1>
        <p>Flat-rate setup, flat monthly fee, and everything visible upfront. No hourly billing and no scope-creep&nbsp;invoices.</p>
      </div>
    </section>

    <section class="section pricing-section" id="websites">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">Websites</p>
          <h2>Website plans</h2>
          <p>Flat setup fee, flat monthly. Hosting and maintenance are in every tier, so there is no separate IT bill and no invoice when something needs&nbsp;changing.</p>
        </div>
        <div class="pricing-grid" data-family="Websites">

          <!-- PLUS -->
          <div class="price-card reveal reveal-scale reveal-delay-1">
            <div class="price-tier">Plus</div>
            <div class="price-amount">
              <span class="dollar">$80</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$800 one-time setup fee</p>
            <ul class="price-features">
              <li>Up to 10 pages</li>
              <li>Custom design, no templates</li>
              <li>Mobile responsive, with a contact form and photo gallery</li>
              <li>On-page SEO basics</li>
              <li>Service-specific landing pages</li>
              <li>Google Business Profile setup &amp; management</li>
              <li>Hosting and maintenance included</li>
              <li>Priority support</li>
            </ul>
            <a href="/contact" class="btn btn-ghost--dark">Get started</a>
          </div>

          <!-- PRO -->
          <div class="price-card featured reveal reveal-scale reveal-delay-2">
            <span class="price-badge">Recommended</span>
            <div class="price-tier">Pro</div>
            <div class="price-amount">
              <span class="dollar">$160</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$1,600 one-time setup fee</p>
            <ul class="price-features">
              <li>Up to 13 pages</li>
              <li>Everything in Plus</li>
              <li>Advanced SEO strategy and consulting</li>
              <li>Analytics &amp; monthly reporting</li>
              <li>Priority support &amp; maintenance</li>
              <li>Hands-on account management</li>
            </ul>
            <a href="/contact" class="btn btn-primary">Get started</a>
          </div>

          <!-- CUSTOM: quoted rather than fixed, so it carries no monthly figure. -->
          <div class="price-card price-card--quoted reveal reveal-scale reveal-delay-3" data-quoted="true">
            <div class="price-tier">Custom</div>
            <div class="price-amount">
              <span class="price-prefix">From</span>
              <span class="dollar">$800</span>
            </div>
            <p class="price-setup">setup. Monthly quoted with the project.</p>
            <ul class="price-features">
              <li>Anything the other tiers do not cover</li>
              <li>Online store, product pages and checkout</li>
              <li>Service area pages for every town you cover</li>
              <li>A Google profile per location, managed</li>
              <li>Per-location tracking and reporting</li>
              <li>Scoped and quoted after a free consult</li>
            </ul>
            <a href="/contact" class="btn btn-ghost--dark">Talk it through</a>
          </div>

        </div>

        <div style="text-align:center; margin-top:clamp(2.5rem,5vh,4rem)" class="reveal">
          <p style="color:var(--brown-muted); font-size:0.95rem; max-width:56ch; margin:0 auto">Replacing an existing site runs on these same plans. A rebuild is the same work as a new build, so it is not priced separately. If none of these fit, <a href="/contact" class="link-accent">reach out</a> and I will put together something that&nbsp;does.</p>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">Not sure which plan fits?</h2>
        <p class="reveal">Book a free consult and I'll figure out the right scope together. No commitment, no&nbsp;pressure.</p>
        <a href="/contact" class="btn btn-primary btn-lg reveal">Book a free consult</a>
      </div>
    </section>`;
