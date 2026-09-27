/**
 * /consulting, the Marketing consultant hub.
 *
 * Everything under this hub sells time rather than execution, and the hub is
 * where that line gets drawn against the free consult offered site-wide.
 *
 * The exact terms of that line are a TODO: questions 132 to 134 in
 * docs/service-page-questions.md. Until Owen answers, this page describes the
 * distinction in principle and does not state prices, session lengths, or
 * formats, because inventing any of those would be making a promise for him.
 */
export const body = (parts) => String.raw`    <section class="page-hero">
      <div class="container">
        <p class="hero-eyebrow">Consulting</p>
        <h1>Marketing consulting for Denton and DFW owners</h1>
        <p>Some owners do not want to hand this over. They want to understand it, make the call themselves, and keep it in&nbsp;house. That is a legitimate way to run a business and it is what this side of the work is&nbsp;for.</p>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>What consulting means here</h2>
          <p>I advise owner-operated businesses in Denton, Denton County, and the Dallas-Fort Worth metroplex on their websites, their search visibility, and their Google Business Profile. You get straight answers about your specific situation and a plan you or your staff can act on, from the person who does this work rather than someone reading from a playbook.</p>
          <p>Every conversation still starts with a free consult. If a short call answers your question, that is the end of it and you owe nothing.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <p class="eyebrow" style="color:var(--blue-accent)">Services</p>
          <h2>What you can bring me</h2>
        </div>
        <ul class="hub-svc-list reveal">
` + parts.hubServices + `
        </ul>
      </div>
    </section>

    <section class="section" style="background:var(--sand)">
      <div class="container">
        <div class="prose reveal">
          <h2>Advice or execution</h2>
          <p>If you would rather I just did the work, that is the rest of the site: <a href="/">website design</a>, <a href="/seo">SEO and AI search</a>, and <a href="/local-marketing">local marketing</a>. Nothing here is a prerequisite for any of that, and hiring me to advise you does not commit you to hiring me to build anything.</p>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">Bring me a&nbsp;question</h2>
        <p class="reveal">Book a free consult. Tell me what you are trying to decide and I will tell you what I would do and&nbsp;why.</p>
        <a href="/contact" class="btn btn-primary btn-lg reveal">Book a free consult</a>
      </div>
    </section>`;
