/**
 * Body content for /contact. Extracted verbatim from the
 * hand-written contact.html on 2026-09-27, with internal links converted to
 * root-absolute paths. Chrome (head, nav, footer, schema) is generated.
 */
export const body = String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">Contact</p>
        <h1>Let's talk about your&nbsp;business</h1>
        <p>No pitch deck, no pressure. Tell me what you need and I'll figure out the right next step&nbsp;together.</p>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="contact-grid">

          <div class="contact-info reveal reveal-side-left">
            <h2>Get in touch</h2>
            <p>Whether you need a new site, want to improve an existing one, or just want to talk through what's possible, I'm here. Reach out however works best for&nbsp;you.</p>

            <div class="contact-detail">
              <div class="contact-detail-icon">
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.1 9.9a16 16 0 006 6l1.26-1.26a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div>
                <div style="font-size:0.8rem; color:var(--brown-muted); font-weight:500; margin-bottom:0.1rem">Phone</div>
                <a href="tel:+1-940-977-6253">(940) 977-6253</a>
              </div>
            </div>

            <div class="contact-detail">
              <div class="contact-detail-icon">
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div style="font-size:0.8rem; color:var(--brown-muted); font-weight:500; margin-bottom:0.1rem">Email</div>
                <a href="#" data-email>loading...</a>
              </div>
            </div>

            <div class="contact-detail">
              <div class="contact-detail-icon">
                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div style="font-size:0.8rem; color:var(--brown-muted); font-weight:500; margin-bottom:0.1rem">Service area</div>
                <span>Dallas-Fort Worth metroplex (DFW), Denton, and surrounding areas</span>
              </div>
            </div>

            <div style="margin-top:2rem; padding-top:1.5rem; border-top:1px solid rgba(0,0,0,.08)">
              <h3 style="font-size:1rem; margin-bottom:0.5rem; color:var(--charcoal-text)">What happens next?</h3>
              <p style="font-size:0.9rem; color:var(--brown-muted)">I'll try to get back to you within one business day. If there's a fit, I'll schedule a quick call to understand your business and scope the project. No&nbsp;obligation.</p>
            </div>
          </div>

          <form class="contact-form reveal reveal-side-right" id="contactForm">
            <div class="form-group">
              <label for="name">Your name</label>
              <input type="text" id="name" name="name" required autocomplete="name">
            </div>
            <div class="form-group">
              <label for="business">Business name</label>
              <input type="text" id="business" name="business" autocomplete="organization">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required autocomplete="email">
            </div>
            <div class="form-group">
              <label for="service">What are you interested in?</label>
              <select id="service" name="service">
                <option value="">Select one</option>
                <option value="website">New website</option>
                <option value="redesign">Website redesign</option>
                <option value="seo">SEO</option>
                <option value="maintenance">Website maintenance</option>
                <option value="full">Full package</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Tell me about your project</label>
              <textarea id="message" name="message" placeholder="What does your business do? What's your biggest challenge with your current site or online presence?"></textarea>
            </div>

            <div class="hp-field" aria-hidden="true">
              <label for="website">Leave this field empty</label>
              <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
            </div>

            <altcha-widget challenge="/api/altcha-challenge" name="altcha" hidelogo></altcha-widget>

            <button type="submit" class="btn btn-primary">Send message</button>
            <p class="form-msg" id="contactFormMsg"></p>
          </form>

        </div>
      </div>
    </section>`;
