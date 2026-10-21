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
        <div class="pricing-grid pricing-grid--2x2" data-family="Websites">

          <!-- BASIC -->
          <div class="price-card reveal reveal-scale reveal-delay-1">
            <h3 class="price-tier">Basic</h3>
            <div class="price-amount">
              <span class="dollar">$50</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$200 one-time setup fee</p>
            <ul class="price-features">
              <li>Up to 3 pages</li>
              <li>Custom design, no templates</li>
              <li>Mobile responsive, with a contact form</li>
              <li>Hosting and maintenance included</li>
              <li>Standard support</li>
            </ul>
            <a href="/contact" class="btn btn-ghost--dark">Get started</a>
          </div>

          <!-- STARTER -->
          <div class="price-card reveal reveal-scale reveal-delay-2">
            <h3 class="price-tier">Starter</h3>
            <div class="price-amount">
              <span class="dollar">$100</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$600 one-time setup fee</p>
            <ul class="price-features">
              <li>Up to 8 pages</li>
              <li>Everything in Basic</li>
              <li>Photo gallery</li>
              <li>On-page SEO basics</li>
              <li>Service-specific landing pages</li>
              <li>Standard support</li>
            </ul>
            <a href="/contact" class="btn btn-ghost--dark">Get started</a>
          </div>

          <!-- PRO -->
          <div class="price-card featured reveal reveal-scale reveal-delay-1">
            <span class="price-badge">Recommended</span>
            <h3 class="price-tier">Pro</h3>
            <div class="price-amount">
              <span class="dollar">$200</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$1,500 one-time setup fee</p>
            <ul class="price-features">
              <li>Up to 60 pages, mostly dedicated service pages</li>
              <li>Everything in Starter</li>
              <li>Advanced SEO strategy and consulting</li>
              <li>Google Business Profile setup and management</li>
              <li>Basic backlink strategy</li>
              <li>Analytics &amp; monthly reporting</li>
              <li>Priority support &amp; maintenance</li>
              <li>Hands-on account management</li>
            </ul>
            <a href="/contact" class="btn btn-primary">Get started</a>
          </div>

          <!-- EXPERT -->
          <div class="price-card reveal reveal-scale reveal-delay-2">
            <h3 class="price-tier">Expert</h3>
            <div class="price-amount">
              <span class="dollar">$650</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$2,800 one-time setup fee</p>
            <ul class="price-features">
              <li>Everything in Pro</li>
              <li>Service area pages for every town you cover</li>
              <li>Advanced backlink strategy</li>
            </ul>
            <a href="/contact" class="btn btn-ghost--dark">Get started</a>
          </div>

          <!-- CUSTOM: quoted per project. No base fee and no monthly figure, so no
               dollar amount appears on this card at all. Spans both columns and
               lays out side by side on desktop. The inner wrappers must not start
               with "price-card": plans.mjs splits cards on that string. -->
          <div class="price-card price-card--quoted price-card--wide reveal reveal-scale reveal-delay-1" data-quoted="true">
            <div class="price-wide-head">
              <h3 class="price-tier">Custom</h3>
              <div class="price-amount">
                <span class="dollar">Quoted</span>
              </div>
              <p class="price-setup">No base fee. Setup and monthly priced to the project.</p>
            </div>
            <div class="price-wide-body">
              <ul class="price-features">
                <li>Anything the other plans do not cover</li>
                <li>Online store, product pages and checkout</li>
                <li>Multiple locations, with a managed Google profile per location</li>
                <li>Per-location tracking and reporting</li>
                <li>Scoped and quoted after a free consult</li>
              </ul>
              <a href="/contact" class="btn btn-ghost--dark">Talk it through</a>
            </div>
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
