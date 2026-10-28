/**
 * Body content for 404.html. Vercel serves this file with a real 404 status
 * for any path that does not resolve, so every link here is root-absolute.
 */
export const body = String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">404</p>
        <h1>That page isn't&nbsp;here</h1>
        <p>The link may be out of date, or the address may have a typo. Here is where most people are headed.</p>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>Try one of these</h2>
          <ul>
            <li><a href="/services/website-design">Website design</a></li>
            <li><a href="/seo">SEO &amp; AI search</a></li>
            <li><a href="/local-marketing">Local marketing</a></li>
            <li><a href="/consulting">Consulting</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/services">All services</a></li>
          </ul>
        </div>
        <div style="text-align:center; margin-top:clamp(2rem,4vh,3rem)" class="reveal">
          <a href="/" class="btn btn-primary btn-lg">Back to the homepage</a>
        </div>
      </div>
    </section>`;
