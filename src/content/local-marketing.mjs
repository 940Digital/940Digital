/**
 * /local-marketing, the Marketing agency hub.
 *
 * Local SEO and AI search optimization (GEO) were merged into the SEO silo on
 * 2026-09-27, so this hub is now cleanly about presence on the platforms
 * themselves: the Google profile, reviews, Bing, and Apple Maps. It no longer
 * overlaps /seo at all, and it targets an agency-choice query ("who do I hire")
 * rather than a ranking problem ("how do I rank").
 */
export const body = (parts) => String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">Local marketing</p>
        <h1>Local marketing for Denton and DFW businesses</h1>
        <p>Most people decide whether to call you before they ever reach your website. They read your Google listing, scan your reviews, and look at your photos. That is the part of your marketing that does the most work and gets the least&nbsp;attention.</p>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>What this covers</h2>
          <p>Local marketing, for small businesses in Denton, Denton County, and the Dallas-Fort Worth metroplex, means the profiles and listings that represent you on the platforms customers actually use. Your Google Business Profile first, then your reviews, then Bing Places and Apple Maps for the people who never open Google at all.</p>
          <p>The work is unglamorous and it compounds. Correct categories, correct hours, real photos, replies to every review, and the same name and phone number everywhere so nothing contradicts anything else.</p>
          <p>Every engagement starts with a free consult and a look at what your listings say about you today.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow eyebrow--accent">Services</p>
          <h2>What I handle</h2>
        </div>
        <div class="svc-groups reveal">
` + parts.hubServices + `
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>Why hire one person for this</h2>
          <p>You are not getting an account manager who relays your questions to someone else. You get a direct line to the person doing the work, which for this kind of marketing matters more than it sounds. When Google suspends a listing or a bad review lands on a Friday, you need an answer, not a ticket number.</p>
          <p>I take on a small number of clients at a time for exactly that reason.</p>
          <h2>How this differs from SEO</h2>
          <p>This is about the platforms. <a href="/seo">Search engine optimization</a> is about ranking, including ranking in Maps. If your listing is accurate but you are still invisible, that is a ranking problem and it lives on the SEO side. If your listing has the wrong hours and no photos, start here.</p>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">Find out what your listing says about&nbsp;you</h2>
        <p class="reveal">Book a free consult. I will look at your profile with you and tell you what a customer sees before they&nbsp;call.</p>
        <a href="/contact" class="btn btn-primary btn-lg reveal">Book a free consult</a>
      </div>
    </section>`;
