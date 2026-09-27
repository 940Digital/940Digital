/**
 * /services, the directory. All 45 GBP services grouped by the four profile
 * categories, each with its profile description.
 *
 * This page deliberately targets no keyword. Its title and H1 avoid "website
 * design" so it cannot compete with the homepage for the primary category
 * keyword. It exists so there is one crawlable URL linking every service.
 */
export const body = (parts) => String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">All services</p>
        <h1>Everything I do, in one list</h1>
        <p>Forty-five services across four areas. Same person on all of them, which is the point: the site, the search work, and your Google profile get built to fit each&nbsp;other.</p>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="svc-index svc-index--detail reveal">
` + parts.serviceIndexDetail + `
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">Not sure which of these you&nbsp;need?</h2>
        <p class="reveal">That is what the free consult is for. Tell me what is not working and I will tell you which of these would actually move the&nbsp;needle.</p>
        <a href="/contact" class="btn btn-primary btn-lg reveal">Book a free consult</a>
      </div>
    </section>`;
