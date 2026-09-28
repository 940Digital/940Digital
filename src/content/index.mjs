/**
 * Body content for /. Extracted verbatim from the
 * hand-written index.html on 2026-09-27, with internal links converted to
 * root-absolute paths. Chrome (head, nav, footer, schema) is generated.
 */
const TEMPLATE = String.raw`    <!-- HERO -->
    <section class="hero">
      <canvas class="hero-canvas" id="heroCanvas" aria-hidden="true"></canvas>
      <div class="container">
        <div class="hero-inner">
          <p class="hero-eyebrow">Visibility, Credibility, Growth</p>
          <p class="hero-headline" aria-hidden="true"><span>I build</span> <span class="cycle-word" id="cycleWord">Presence</span></p>
          <h1 class="hero-h1">Website design for small businesses in Denton and DFW</h1>
          <div class="hero-actions">
            <a href="/contact" class="btn btn-primary btn-lg">Book a free consult</a>
            <a href="/work" class="btn btn-ghost btn-lg">See my portfolio</a>
          </div>
        </div>
      </div>
    </section>

    <!-- THE DIFFERENCE: comparison layout -->
    <section class="section compare-section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">The difference</p>
          <h2>Why&nbsp;us?</h2>
          <p>I help you attract and convert more customers by building trust with Google, AI search bots, and the people who need you. That means a premium website, SEO, GEO, and a Google Business Profile, all built to make your business look like the best option the moment someone finds&nbsp;you.</p>
        </div>
        <div style="text-align:center; margin-top:clamp(2rem,4vh,3rem)" class="reveal">
          <a href="/work" class="btn btn-ghost--dark">See my portfolio</a>
        </div>
      </div>
    </section>

    <!-- SERVICES: normal flow, no pin, scroll through like a regular section -->
    <section class="section services-section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow">What I build</p>
          <h2>Services</h2>
          <p>Every service tied to one goal: more revenue for your business.</p>
        </div>
        <div class="services-bento">

          <div class="bento-feature reveal reveal-scale">
            <div class="bento-feature-copy">
              <p class="bento-feature-tag">Where every project starts</p>
              <h3>Website design</h3>
              <p>Fast, mobile-first sites built around your business, not stretched to fit a template. Every page earns its place, and hosting and website maintenance are included in every plan.</p>
              <a href="/contact" class="btn btn-primary">Book a free consult</a>
            </div>
            <div class="bento-feature-visual" aria-hidden="true">
              <div class="browser-frame" style="width:100%">
                <div class="browser-frame-bar">
                  <span class="browser-frame-dot"></span><span class="browser-frame-dot"></span><span class="browser-frame-dot"></span>
                  <span class="browser-frame-url">yourbusiness.com</span>
                </div>
                <div class="mock-page">
                  <div class="mock-nav"><span></span><span></span><span></span></div>
                  <div class="mock-hero-line mock-hero-line--wide"></div>
                  <div class="mock-hero-line mock-hero-line--mid"></div>
                  <div class="mock-btn"></div>
                  <div class="mock-cards"><span></span><span></span><span></span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bento-support">
            <a href="/seo" class="bento-card bento-card--link reveal reveal-scale reveal-delay-1">
              <span class="bento-card-index">01</span>
              <h3>SEO &amp; AI search</h3>
              <p>Get found when someone searches for what you do, and get named when they ask an AI assistant instead. Both run on the same&nbsp;foundation.</p>
              <span class="bento-card-link">Explore SEO &amp; AI search &#8599;</span>
            </a>

            <a href="/local-marketing" class="bento-card bento-card--link reveal reveal-scale reveal-delay-2">
              <span class="bento-card-index">02</span>
              <h3>Local marketing</h3>
              <p>Your Google Business Profile, your reviews, and your listings on Bing and Apple Maps, kept accurate so nearby customers find the right&nbsp;details.</p>
              <span class="bento-card-link">Explore local marketing &#8599;</span>
            </a>

            <a href="/consulting" class="bento-card bento-card--link reveal reveal-scale reveal-delay-3">
              <span class="bento-card-index">03</span>
              <h3>Consulting</h3>
              <p>Rather handle it yourself? Straight answers and training from the person who does the work, so you can run it in&nbsp;house.</p>
              <span class="bento-card-link">Explore consulting &#8599;</span>
            </a>
          </div>

        </div>
        <div style="text-align:center; margin-top:clamp(2rem,4vh,3rem)" class="reveal">
          <a href="/services" class="btn btn-ghost">See all services</a>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="section how-section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow">Getting started</p>
          <h2>Our&nbsp;Process</h2>
        </div>
        <div class="timeline">
          <div class="timeline-step reveal reveal-delay-1">
            <div class="timeline-dot">01</div>
            <h3>Book a free consult</h3>
            <p>Tell me about your business. I'll listen and figure out what will actually move the needle for you.</p>
          </div>
          <div class="timeline-step reveal reveal-delay-2">
            <div class="timeline-dot">02</div>
            <h3>See your site built</h3>
            <p>I design and build a working version before you pay. No mockups, no wireframe presentations. Just a real site you can click through.</p>
          </div>
          <div class="timeline-step reveal reveal-delay-3">
            <div class="timeline-dot">03</div>
            <h3>Launch and grow</h3>
            <p>Go live with a site that's fast, findable, and built to bring in leads from day one. It's built to make your business look like the best option in your&nbsp;market.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EVERYTHING I DO: names and links all 45 GBP services, grouped by the
         four profile categories. This is the Google Business Profile landing
         page, so every service on the profile is mentioned here. Generated from
         src/data/services.mjs, so it cannot drift from the profile. -->
    <section class="section svc-index-section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow">Everything I do</p>
          <h2>The full list</h2>
          <p>Four areas, one person doing the work. Pick a heading to see how that side of it fits together, or go straight to the thing you came&nbsp;for.</p>
        </div>
        <div class="svc-index reveal">
<!--@SERVICE_INDEX-->
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section faq-section" style="background:var(--sand)">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow">Questions</p>
          <h2>What people ask before they&nbsp;start</h2>
        </div>
        <div class="faq-list">
          <details class="faq-item">
            <summary>Do you offer a free demo or trial?</summary>
            <p>Yes. I build a working version of your site before you commit to anything. If it's not what you want, you walk away.</p>
          </details>
          <details class="faq-item">
            <summary>What is the monthly bill for?</summary>
            <p>Hosting and updates are included in every plan. If something needs to change (new hours, a new service, a new photo), I handle it.</p>
          </details>
          <details class="faq-item">
            <summary>Can you customize a plan to fit my business?</summary>
            <p><a href="/contact">Reach out</a> and tell me what you need. I'll put together something that fits instead of forcing you into a plan that doesn't.</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">Ready to stop losing leads to a&nbsp;bad&nbsp;site?</h2>
        <p class="reveal">Book a free consult. No pitch deck, no pressure. Just a conversation about what your business needs.</p>
        <a href="/contact" class="btn btn-primary btn-lg reveal">Book a free consult</a>
      </div>
    </section>`;

export const body = (parts) => TEMPLATE.replace("<!--@SERVICE_INDEX-->", parts.serviceIndex);
