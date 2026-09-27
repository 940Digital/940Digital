/**
 * Body content for /pricing. Extracted verbatim from the
 * hand-written pricing.html on 2026-09-27, with internal links converted to
 * root-absolute paths. Chrome (head, nav, footer, schema) is generated.
 */
export const body = String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">Pricing</p>
        <h1>What you'll actually&nbsp;pay</h1>
        <p>Small business website pricing, flat-rate setup, flat monthly fee. You see everything upfront. No hourly billing, no scope-creep&nbsp;invoices.</p>
      </div>
    </section>

    <section class="section pricing-section">
      <div class="container">
        <div class="pricing-grid">

          <!-- BASIC -->
          <div class="price-card reveal reveal-scale reveal-delay-1">
            <div class="price-tier">Basic</div>
            <div class="price-amount">
              <span class="dollar">$20</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$200 one-time setup fee</p>
            <ul class="price-features">
              <li>4-page website</li>
              <li>Custom design, no templates</li>
              <li>Mobile responsive</li>
              <li>Contact form</li>
              <li>Photo gallery</li>
              <li>Hosting included</li>
            </ul>
            <a href="/contact" class="btn btn-ghost--dark">Get started</a>
          </div>

          <!-- PLUS -->
          <div class="price-card featured reveal reveal-scale reveal-delay-2">
            <span class="price-badge">Most popular</span>
            <div class="price-tier">Plus</div>
            <div class="price-amount">
              <span class="dollar">$40</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$400 one-time setup fee</p>
            <ul class="price-features">
              <li>Up to 10 pages</li>
              <li>Everything in Basic</li>
              <li>On-page SEO basics</li>
              <li>Service-specific landing pages</li>
              <li>Google Business Profile setup &amp; management</li>
              <li>Priority support</li>
            </ul>
            <a href="/contact" class="btn btn-primary">Get started</a>
          </div>

          <!-- PRO -->
          <div class="price-card reveal reveal-scale reveal-delay-3">
            <div class="price-tier">Pro</div>
            <div class="price-amount">
              <span class="dollar">$80</span>
              <span class="period">/month</span>
            </div>
            <p class="price-setup">$800 one-time setup fee</p>
            <ul class="price-features">
              <li>Up to 13 pages</li>
              <li>Everything in Plus</li>
              <li>Advanced SEO strategy and consulting</li>
              <li>Analytics &amp; monthly reporting</li>
              <li>Priority support &amp; maintenance</li>
              <li>Hands-on account management</li>
            </ul>
            <a href="/contact" class="btn btn-ghost--dark">Get started</a>
          </div>

        </div>

        <div style="text-align:center; margin-top:clamp(2.5rem,5vh,4rem)" class="reveal">
          <p style="color:var(--brown-muted); font-size:0.95rem; max-width:52ch; margin:0 auto">Every plan includes hosting, maintenance, and ongoing updates. No hidden fees. If your needs don't fit a tier, <a href="/contact" style="color:var(--blue-accent)">reach out</a>, and I'll put together something that&nbsp;does.</p>
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
