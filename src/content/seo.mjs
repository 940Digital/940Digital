/**
 * /seo, the Internet marketing service hub. Also the landing page for two GBP
 * services: "Search engine optimization" and "Local SEO".
 *
 * Owen merged Local SEO into this page on 2026-09-27 rather than build
 * /local-marketing/local-seo, because "SEO Denton" and "local SEO Denton" are
 * effectively the same query for a local agency and two pages would have
 * competed. So this page has to cover both organic and the map pack, and it is
 * the only page on the site that argues either.
 *
 * The AI search group sits above the traditional SEO group on purpose. AI
 * search is a main service line and burying it would misrepresent that.
 */
export const body = (parts) => String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">SEO &amp; AI search</p>
        <h1>Search engine optimization for Denton and DFW businesses</h1>
        <p>Two things have to happen before a stranger hires you. They have to find you, and then they have to believe you. Search engine optimization is how I handle the first one, across Google's results, the map pack, and now the AI answers that increasingly sit above&nbsp;both.</p>
      </div>
    </section>

    <!-- Answer-first: this block is written to stand alone when an AI assistant
         quotes it, so it repeats the who and where rather than relying on the
         hero above it. -->
    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>What SEO means here</h2>
          <p>I do search engine optimization for small businesses in Denton, Denton County, and the wider Dallas-Fort Worth metroplex. That covers two jobs that people often split apart and I do not: ranking your website for the searches that bring paying customers, and ranking your business in Google Maps and the local three-pack when someone nearby searches for what you do.</p>
          <p>Those two jobs share a foundation. Clean pages that Google can read, content that answers a real question, and credibility it can verify somewhere other than your own website. Get that right and both sides move. Skip it and no amount of tactics holds.</p>
          <p>Every engagement starts with a free consult and a look at where you actually stand today, before anyone talks about a plan.</p>
        </div>
      </div>
    </section>

    <!-- Services, grouped by the job the buyer is trying to do. The AI search
         group is featured and sits first: it is a main service line and a flat
         run of six equal groups would bury it. -->
    <section class="section svc-section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">Services</p>
          <h2>` + parts.hubCount + ` ways this gets&nbsp;done</h2>
          <p>Grouped by what you are actually trying to fix. Start with whichever one describes your&nbsp;problem.</p>
        </div>
        <div class="svc-groups reveal">
` + parts.hubServices + `
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="prose reveal">
          <h2>How this differs from local marketing</h2>
          <p>This page is about ranking: your pages in search results, your business in Maps, and your name in AI answers. My <a href="/local-marketing">local marketing</a> work is about the platforms themselves, keeping your Google Business Profile, your reviews, and your Bing and Apple Maps listings accurate and active. The two feed each other, and they are not the same job.</p>
          <p>If you would rather learn to do this yourself than hire it out, that is what <a href="/consulting">consulting</a> is for.</p>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">Find out where you actually&nbsp;stand</h2>
        <p class="reveal">Book a free consult. I will tell you what is holding you back before you spend anything, including if the answer is that SEO is not your problem right&nbsp;now.</p>
        <a href="/contact" class="btn btn-primary btn-lg reveal">Book a free consult</a>
      </div>
    </section>`;
