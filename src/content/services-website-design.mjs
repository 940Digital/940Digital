/**
 * /services/website-design
 *
 * Written from facts already established on the site: the demo-before-you-pay
 * process (homepage timeline and FAQ), the custom-not-template position and
 * inclusions (the old /services web design block), the four live client builds
 * (/work), and the plans parsed from /pricing.
 *
 * Deliberately absent, because Owen has not answered them and inventing them
 * would be making promises for him: turnaround time, what he needs from a
 * client to start, and who he will not take on. Questions 2, 3 and 5 in
 * docs/service-page-questions.md. The page is honest without them; it is
 * stronger with them.
 */
export const body = (parts) => String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">Website design</p>
        <h1>Website design for small businesses in Denton and DFW</h1>
        <p>A custom site built around how your business actually works, structured so customers and search engines both understand what you do and where you do&nbsp;it.</p>
      </div>
    </section>

    <!-- Answer-first. Written to stand on its own when an AI assistant quotes
         it, so it repeats the what, the who and the where. -->
    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>What this is</h2>
          <p>I design and build custom websites for small businesses in Denton, Denton County, and the Dallas-Fort Worth metroplex. Every site is built for one specific business rather than assembled from a template, and every project starts with a working demo you can click through before you pay anything.</p>
          <p>That last part is the thing worth reading twice. You are not approving a picture of a website. You get a real site, at a real address, that you can open on your phone and show to someone, and you decide from there.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">What you get</p>
          <h2>What is included in every&nbsp;build</h2>
        </div>
        <div class="svc-groups reveal">
          <section class="svc-group">
            <header class="svc-group-head">
              <span class="svc-group-index" aria-hidden="true">01</span>
              <h3>The site itself</h3>
            </header>
            <ul class="svc-items">
              <li class="svc-item"><span class="svc-item-num">01</span><div class="svc-item-body">
                <h4>Custom design</h4>
                <p>No templates and no themes. The layout follows what your business needs to say, in the order a customer needs to hear it.</p></div></li>
              <li class="svc-item"><span class="svc-item-num">02</span><div class="svc-item-body">
                <h4>Mobile first</h4>
                <p>Built for the phone before the desktop, because that is where most of your visitors will be standing in a driveway looking you up.</p></div></li>
              <li class="svc-item"><span class="svc-item-num">03</span><div class="svc-item-body">
                <h4>Contact and quote flows</h4>
                <p>A form that works, goes somewhere you will actually see it, and asks for what you need to quote the job.</p></div></li>
            </ul>
          </section>

          <section class="svc-group">
            <header class="svc-group-head">
              <span class="svc-group-index" aria-hidden="true">02</span>
              <h3>Built to be found</h3>
            </header>
            <ul class="svc-items">
              <li class="svc-item"><span class="svc-item-num">01</span><div class="svc-item-body">
                <h4>SEO foundations from day one</h4>
                <p>Clean markup, a proper heading structure, fast load times, and page titles written for your market rather than left as placeholders. Retrofitting this later costs more than doing it now.</p></div></li>
              <li class="svc-item"><span class="svc-item-num">02</span><div class="svc-item-body">
                <h4>Structured data</h4>
                <p>Your business type, services, and service area described in a format search engines read without guessing. ` + parts.link('/seo/schema-markup', 'Schema markup') + ` is part of the build, not an upsell.</p></div></li>
              <li class="svc-item"><span class="svc-item-num">03</span><div class="svc-item-body">
                <h4>Readable to AI assistants</h4>
                <p>Content that lives in the page source rather than being drawn in afterwards by a script, because most AI crawlers do not run JavaScript. If your site is invisible to them, you are invisible when someone asks one for a recommendation.</p></div></li>
            </ul>
          </section>

          <section class="svc-group">
            <header class="svc-group-head">
              <span class="svc-group-index" aria-hidden="true">03</span>
              <h3>After it launches</h3>
            </header>
            <ul class="svc-items">
              <li class="svc-item"><span class="svc-item-num">01</span><div class="svc-item-body">
                <h4>Hosting is included</h4>
                <p>Every plan includes hosting and ongoing upkeep. There is no separate IT bill, and no invoice when your hours change or you want a new photo up.</p></div></li>
              <li class="svc-item"><span class="svc-item-num">02</span><div class="svc-item-body">
                <h4>A direct line</h4>
                <p>You message the person who built it. Not a ticket queue and not an account manager who relays it to someone else. Ongoing upkeep is covered under ` + parts.link('/services/website-maintenance', 'website maintenance') + `.</p></div></li>
            </ul>
          </section>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">How it runs</p>
          <h2>Three steps, and you see the site in step&nbsp;two</h2>
        </div>
        <div class="timeline">
          <div class="timeline-step reveal reveal-delay-1">
            <div class="timeline-dot">01</div>
            <h3>Book a free consult</h3>
            <p>Tell me about the business. What you do, who you want calling, and what is not working about how you look online right now.</p>
          </div>
          <div class="timeline-step reveal reveal-delay-2">
            <div class="timeline-dot">02</div>
            <h3>See it built</h3>
            <p>I design and build a working version before you pay. No mockups and no wireframe presentation. A real site you can click through, on a real address.</p>
          </div>
          <div class="timeline-step reveal reveal-delay-3">
            <div class="timeline-dot">03</div>
            <h3>Launch and grow</h3>
            <p>Go live on your domain, with hosting and updates handled. From there it can grow into <a href="/seo">search work</a> and <a href="/local-marketing">your Google profile</a> when you are ready.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">Proof</p>
          <h2>Four builds, live right&nbsp;now</h2>
          <p>Every one of these started as a demo the owner clicked through before paying for&nbsp;anything.</p>
        </div>
        <div class="portfolio-grid">
` + parts.proofCards + `
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">Cost</p>
          <h2>What a build&nbsp;costs</h2>
          <p>Flat setup fee, flat monthly. Everything below is on the <a href="/pricing">pricing page</a> in&nbsp;full.</p>
        </div>
        <div class="plan-strip reveal">
` + parts.planStrip + `
        </div>
        <p class="plan-note reveal">If none of these fit, <a href="/contact">say so on the consult</a> and I will put together something that does.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="prose reveal">
          <h2>How this differs from a redesign</h2>
          <p>This page is for a business with nothing online yet, or with something so dated that there is nothing worth keeping. If you already have a site that ranks and brings in work, do not start from scratch: a ` + parts.link('/services/website-redesign', 'website redesign') + ` replaces the site while protecting the rankings you already have, which is a different job with different risks.</p>
          <p>If the site is fine and only needs to move somewhere else, that is a ` + parts.link('/services/website-migration', 'website migration') + `.</p>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow">Questions</p>
          <h2>What people ask before they&nbsp;start</h2>
        </div>
        <div class="faq-list">
          <details class="faq-item">
            <summary>Do I have to pay before I see anything?</summary>
            <p>No. I build a working version of your site first. If it is not what you wanted, you walk away and you owe nothing.</p>
          </details>
          <details class="faq-item">
            <summary>Do you use templates?</summary>
            <p>No. Every site is designed for the specific business. A template can be made to look fine, but it forces your business into a structure that was designed around someone else's, and it usually shows in the places that matter.</p>
          </details>
          <details class="faq-item">
            <summary>What happens after the site goes live?</summary>
            <p>Hosting and updates are included in every plan. When your hours change, a service gets added, or you have new photos from a job, you message me and it is handled. There is no separate bill for it.</p>
          </details>
          <details class="faq-item">
            <summary>How many pages do I get?</summary>
            <p>It depends on the plan, and the page counts are listed on the <a href="/pricing">pricing page</a>. If you outgrow the one you start on, you move up rather than rebuilding.</p>
          </details>
          <details class="faq-item">
            <summary>Will the site help me show up on Google?</summary>
            <p>The foundations are built in: clean structure, fast pages, structured data, and titles written for your market. That is what makes ranking possible. Actually competing for the searches that bring customers is ongoing work, and that is <a href="/seo">search engine optimization</a>.</p>
          </details>
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
