# SEO page map: 48 pages, 45 services

Status: proposal, awaiting approval. Nothing below is built yet.
Date: 2026-09-27

Format note: I used one labelled block per page rather than table rows. Eight columns of prose in a markdown table is unreadable at this width, and the differentiator sentence is the most important column.

**Reading the anti-cannibalization check:** every page names its nearest sibling and states in one sentence how its intent differs. Where I judged the gap too narrow to ship on my own call, the block is marked **RISK** and the pair is argued out in section 7 of `seo-rebuild-plan.md`.

**Titles:** all are under 60 characters (verified by script). Seven service names are long enough that the name plus `Denton, TX` fills the title with no room for a differentiator. Those are marked **[name-only title]** and they keep the GBP name intact, which I judged more important than a tagline.

**Character-count deviations I need approved:** two titles drop part of the GBP name to fit. Both are flagged inline as **[title shortens the GBP name]**. The full name still appears in the H1 and the opening paragraph of each page. If you would rather keep the full name in the title and lose the differentiator, say so.

---

# A. Website designer (primary category)
Hub: `/` (homepage) · Directory: `/services`

### `/`
- **Service (GBP):** website design
- **Primary keyword:** website designer denton tx
- **Title:** `Website Designer Denton, TX | Web Design & SEO | 940Digital`
- **H1:** Website design for small businesses in Denton and DFW
- **Meta:** I build custom websites for small businesses in Denton and DFW. Fast, mobile-friendly, and structured so customers and Google both understand what you do.
- **Nearest sibling:** `/services/website-redesign`
- **Differs:** This page is for someone who needs a site built, where there is either nothing to preserve or nothing worth preserving; the redesign page is for someone who already ranks and is afraid of losing it.
- **Note:** This is the GBP landing page. It carries the primary-category keyword in the title, and per Sterling Sky it names and links every one of the 45 services on the profile.

### `/services`
- **Service (GBP):** none. Navigation only.
- **Primary keyword:** none, deliberately. This page targets no query.
- **Title:** `All Services | 940Digital, Denton TX`
- **H1:** Everything I do, in one list
- **Meta:** Every service 940Digital offers, grouped by what it does: website design, SEO and AI search, local marketing and Google Business Profile work, and consulting.
- **Nearest sibling:** `/`
- **Differs:** A directory, not an argument. It exists so there is one crawlable URL that links all 45 services, and its title and H1 deliberately avoid "website design" so it cannot compete with the homepage for the primary keyword.

### `/services/website-maintenance`
- **Service (GBP):** Website Maintenance
- **Primary keyword:** website maintenance denton tx
- **Title:** `Website Maintenance Denton, TX | Hosting Included`
- **H1:** Website maintenance for Denton and DFW businesses
- **Meta:** Ongoing upkeep that keeps your site running the way it did on launch day. Covers speed, content updates, analytics, hosting, and catching issues early.
- **Nearest sibling:** `/services/website-speed-optimization`
- **Differs:** Maintenance is the recurring relationship that keeps a healthy site healthy; speed optimization is a one-time engagement that fixes a site which is already slow.
- **Note:** Hosting is named here as an included feature of every plan. There is no hosting service page and no hosting heading.

### `/services/website-redesign`
- **Service (GBP):** Website redesign
- **Primary keyword:** website redesign denton tx
- **Title:** `Website Redesign Denton, TX | Keep Your Rankings`
- **H1:** Website redesigns that do not cost you your rankings
- **Meta:** Turn a dated or slow site into a modern one without losing the rankings you already have. Includes redirect mapping, rewritten content, and mobile-first layout.
- **Nearest sibling:** `/services/website-migration`
- **Differs:** A redesign changes what the site is: new design, new structure, new copy. A migration changes only where it lives, and the whole point is that nothing visible changes.

### `/services/landing-page-design`
- **Service (GBP):** Landing page design
- **Primary keyword:** landing page design denton tx
- **Title:** `Landing Page Design Denton, TX | One Page, One Goal`
- **H1:** Landing pages built for one goal
- **Meta:** A single focused page built for one goal, like booking a call or requesting a quote. Useful for ads, a promotion, or a service you want more of.
- **Nearest sibling:** `/services/conversion-rate-optimization`
- **Differs:** A landing page is a new page built from nothing for one conversion; CRO is surgery on pages that already exist and already get traffic.

### `/services/ecommerce-website-design`
- **Service (GBP):** Ecommerce website design
- **Primary keyword:** ecommerce website design denton tx
- **Title:** `Ecommerce Website Design Denton, TX | Local Stores`
- **H1:** Ecommerce websites for local businesses that sell products
- **Meta:** Online stores for local businesses that sell products. Clear product pages, simple checkout, and setup for local pickup or shipping in the DFW area.
- **Nearest sibling:** `/`
- **Differs:** The homepage sells a site whose job is to produce a phone call or a quote request. This page is for a business where the transaction happens on the site, which changes the build entirely.

### `/services/ux-ui-design`
- **Service (GBP):** UX/UI design
- **Primary keyword:** ux ui design denton tx
- **Title:** `UX/UI Design Denton, TX | Layout That Converts`
- **H1:** UX and UI design for local service websites
- **Meta:** Layout and navigation planned so visitors find what they need and get in touch faster. The structural work behind a site that turns traffic into calls.
- **Nearest sibling:** `/services/conversion-rate-optimization`
- **Differs:** UX and UI is the design decision made before anything ships: where things go and how someone moves through the site. CRO is the measured change made after, based on what visitors actually did.

### `/services/website-speed-optimization`
- **Service (GBP):** Website speed optimization
- **Primary keyword:** website speed optimization denton tx
- **Title:** `Website Speed Optimization Denton, TX | Faster Pages`
- **H1:** Website speed optimization for Denton and DFW businesses
- **Meta:** Fix the heavy images, bloated code, and slow hosting that keep your pages from loading. Faster pages hold visitors and support better search rankings.
- **Nearest sibling:** `/seo/technical-seo` (cross-hub, the one permitted cross-link)
- **Differs:** Speed work has one metric and one deliverable: how long the page takes to load. Technical SEO is the wider set of things that stop Google reading a site at all, of which speed is one item.

### `/services/website-copywriting`
- **Service (GBP):** Website copywriting
- **Primary keyword:** website copywriting denton tx
- **Title:** `Website Copywriting Denton, TX | Written in Your Voice`
- **H1:** Website copy that sounds like you and sells
- **Meta:** Website copy that explains what you do, who you help, and why someone should pick you. Written in your voice, for the customers you actually want.
- **Nearest sibling:** `/seo/seo-content-writing` (cross-hub)
- **Differs:** Copywriting is the voice and the argument on your core pages, written for the person reading. SEO content writing is service and location page content built around a target query.

### `/services/website-migration`
- **Service (GBP):** Website migration
- **Primary keyword:** website migration denton tx
- **Title:** `Website Migration Denton, TX | No Lost Traffic`
- **H1:** Website migrations without lost pages or traffic
- **Meta:** Move your site to a new platform or host without breaking pages or losing search traffic. Includes redirect mapping and a full check after the move.
- **Nearest sibling:** `/services/website-redesign`
- **Differs:** Same site, new address. Nothing about the design or the content changes, which is exactly what makes a migration succeed or fail.

### `/services/conversion-rate-optimization`
- **Service (GBP):** Conversion rate optimization
- **Primary keyword:** conversion rate optimization denton tx
- **Title:** `Conversion Rate Optimization Denton, TX | More Leads`
- **H1:** Conversion rate optimization for local service businesses
- **Meta:** Changes that turn more of the visitors you already have into leads: clearer calls to action, better forms, trust signals, and tested page layouts.
- **Nearest sibling:** `/services/ux-ui-design`
- **Differs:** CRO needs existing traffic to work on and is measured against a before number. UX and UI design is the planning that happens before there is anything to measure.

### `/services/service-area-page-design`
- **Service (GBP):** Service area page design
- **Primary keyword:** service area page design
- **Title:** `Service Area Page Design Denton, TX | Real Local Detail`
- **H1:** Service area pages built on real local detail
- **Meta:** A page for each town you genuinely serve, built on real local detail so customers and Google both see you work there. No swapped-city templates.
- **Nearest sibling:** `/seo/seo-content-writing` (cross-hub)
- **Differs:** This page is about one specific page type and one specific line I will not cross: a town page only gets built for a town you actually work in, with detail that could not be copy-pasted to another town. SEO content writing is the broader writing service.
- **Note:** Primary keyword has no city attached on purpose. Someone searching this phrase is a business owner or a marketer, and the query is not geo-modified.

### `/services/online-booking-setup`
- **Service (GBP):** Online booking setup
- **Primary keyword:** online booking setup denton tx
- **Title:** `Online Booking Setup Denton, TX | Book From Your Site`
- **H1:** Online booking, straight from your website
- **Meta:** Let customers book a call, a consult, or a job straight from your site. Connects to your calendar so you stop trading voicemails to find a time.
- **Nearest sibling:** `/services/landing-page-design`
- **Differs:** Booking setup is a working integration wired to your calendar. A landing page is a page. One is plumbing, the other is persuasion.

---

# B. Internet marketing service
Hub: `/seo`

### `/seo`
- **Service (GBP):** Search engine optimization
- **Primary keyword:** seo denton tx
- **Title:** `SEO & Internet Marketing Denton, TX | 940Digital`
- **H1:** Search engine optimization for Denton and DFW businesses
- **Meta:** Search engine optimization and AI search for Denton and DFW businesses. Built on clean pages, useful content, and credibility search engines can verify.
- **Also covers (GBP):** Local SEO
- **Nearest sibling:** `/local-marketing`
- **Differs:** **MERGED, per Owen 2026-09-27.** This one page now owns the entire SEO query space: organic rankings across the site *and* the map pack, Maps, and profile-driven local ranking. `/local-marketing/local-seo` is not being built. The nearest sibling is now the local marketing hub, which targets an agency-choice query ("who do I hire") rather than a ranking problem ("how do I rank"), so there is nothing left competing here.
- **Note:** The AI search group (four pages) gets real placement near the top of this hub, above the traditional on-page and technical group. AI search is a main service line and burying it would misrepresent that.

### `/seo/seo-audit`
- **Service (GBP):** SEO audit
- **Primary keyword:** seo audit denton tx
- **Title:** `SEO Audit Denton, TX | Plain-English Fix List`
- **H1:** SEO audits for Denton and DFW businesses
- **Meta:** A plain-English review of what is holding your site back, with a prioritized fix list covering technical issues, content gaps, and local ranking signals.
- **Nearest sibling:** `/seo/competitor-analysis`
- **Differs:** An audit looks inward at your own site and answers "what is broken here". Competitor analysis looks outward at one named rival and answers "why are they above me".

### `/seo/technical-seo`
- **Service (GBP):** Technical SEO
- **Primary keyword:** technical seo denton tx
- **Title:** `Technical SEO Denton, TX | Fix What Blocks Google`
- **H1:** Technical SEO: making your site readable to Google
- **Meta:** Fix what stops Google reading your site properly: indexing errors, broken links, duplicate pages, slow pages, and problems that only show up on mobile.
- **Nearest sibling:** `/seo/on-page-seo`
- **Differs:** Technical SEO is site-wide plumbing: crawling, indexing, duplication, and speed. On-page SEO is per-page editorial work on titles, headings, and content.

### `/seo/on-page-seo`
- **Service (GBP):** On-page SEO
- **Primary keyword:** on page seo denton tx
- **Title:** `On-Page SEO Denton, TX | Page-Level Targeting`
- **H1:** On-page SEO, one page at a time
- **Meta:** Tune each page's title, headings, content, and internal links so search engines can tell what that page is about and which town it serves. Done page by page.
- **Nearest sibling:** `/seo/seo-content-writing`
- **Differs:** On-page SEO works with the content you already have: retitling, restructuring, relinking. Content writing produces new content that did not exist before.

### `/seo/link-building`
- **Service (GBP):** Link building
- **Primary keyword:** link building denton tx
- **Title:** `Link Building Denton, TX | Real Local Links Only`
- **H1:** Link building from real local sites
- **Meta:** Earn links from real local sites: chambers, sponsorships, partners, and local news coverage. No link schemes and no paid networks that put your site at risk.
- **Nearest sibling:** `/seo/citation-building`
- **Differs:** A link is an editorial endorsement from another website that passes authority. A citation is a directory record of your name, address, and phone. Different mechanism, different purpose.

### `/seo/citation-building`
- **Service (GBP):** Citation building
- **Primary keyword:** citation building denton tx
- **Title:** `Citation Building Denton, TX | Consistent NAP`
- **H1:** Citation building: your details right everywhere
- **Meta:** Get your name, address, and phone listed correctly on the directories that count, so search engines and customers see the same details everywhere.
- **Nearest sibling:** `/seo/local-listings-cleanup`
- **Differs:** Citation building creates listings that do not exist yet. Cleanup fixes and removes listings that already exist and are wrong.

### `/seo/local-listings-cleanup`
- **Service (GBP):** Local listings cleanup
- **Primary keyword:** local listings cleanup
- **Title:** `Local Listings Cleanup Denton, TX | Fix Bad Data`
- **H1:** Local listings cleanup: killing the wrong information
- **Meta:** Track down the duplicate and incorrect listings, old phone numbers, and dead addresses that confuse customers and undercut your local rankings.
- **Nearest sibling:** `/seo/citation-building`
- **Differs:** This is a subtraction job. The deliverable is fewer, correct records, usually after a business moved, changed numbers, or was listed by someone else years ago.

### `/seo/schema-markup`
- **Service (GBP):** Schema markup
- **Primary keyword:** schema markup denton tx
- **Title:** `Schema Markup Denton, TX | Structured Data Done Right`
- **H1:** Schema markup for local business websites
- **Meta:** Structured data that tells search engines your business type, services, and service area in a format they read without guessing. Built to match your site.
- **Nearest sibling:** `/seo/technical-seo`
- **Differs:** Schema is one specific deliverable, a machine-readable description of your business added to the page. Technical SEO is the broader set of crawl and index fixes.

### `/seo/blog-writing`
- **Service (GBP):** Blog writing
- **Primary keyword:** blog writing denton tx
- **Title:** `Blog Writing Denton, TX | Answers Before They Buy`
- **H1:** Blog posts that answer pre-purchase questions
- **Meta:** Articles that answer the questions customers ask before they buy. Written for people first, and planned around the topics that actually bring in work.
- **Nearest sibling:** `/seo/seo-content-writing`
- **Differs:** A blog post answers a question someone has before they are ready to hire. A service page closes someone who already is. Different reader, different job.

### `/seo/seo-content-writing`
- **Service (GBP):** SEO content writing
- **Primary keyword:** seo content writing denton tx
- **Title:** `SEO Content Writing Denton, TX | Specific, Not Filler`
- **H1:** SEO content writing for service and location pages
- **Meta:** Service and location page content that is specific, accurate, and built to rank, using real detail from your business instead of filler and keyword padding.
- **Nearest sibling:** `/seo/blog-writing`
- **Differs:** This is money-page content: the service and location pages that have to rank and convert. Blog writing is informational content that feeds them.

### `/seo/rank-tracking`
- **Service (GBP):** Rank tracking and geo-grid reports
- **Primary keyword:** geo grid rank tracking denton tx
- **Title:** `Rank Tracking and Geo-Grid Reports Denton, TX` **[name-only title]**
- **H1:** Rank tracking and geo-grid reports across your service area
- **Meta:** See where you rank across your whole service area on Google Maps, not just at your own address, in monthly reports that show exactly what moved.
- **Nearest sibling:** `/seo/google-search-console-setup`
- **Differs:** Rank tracking answers "where do I show up, and from which parts of town". Search Console answers "what queries am I appearing for at all, and is Google able to index me".

### `/seo/competitor-analysis`
- **Service (GBP):** Competitor analysis
- **Primary keyword:** competitor analysis denton tx
- **Title:** `Competitor Analysis Denton, TX | Close the Gap`
- **H1:** Competitor analysis for local search and Maps
- **Meta:** Find out why a specific competitor outranks you in Maps and search, and get a plan to close the gap on their categories, content, reviews, and links.
- **Nearest sibling:** `/seo/seo-audit`
- **Differs:** This starts with a name. You point at the business beating you and I work backwards from their profile, their pages, and their links. An audit starts with your site and no comparison.

### `/seo/google-search-console-setup`
- **Service (GBP):** Google Search Console setup
- **Primary keyword:** google search console setup denton tx
- **Title:** `Google Search Console Setup Denton, TX | See Your Data`
- **H1:** Google Search Console setup and your first read of it
- **Meta:** Connect your site to Google Search Console so you can see what you show up for, fix indexing problems, and catch issues before they cost you traffic.
- **Nearest sibling:** `/seo/website-analytics-setup`
- **Differs:** Search Console shows what happens in Google before the click: impressions, queries, and indexing health. Analytics shows what happens after the click, on your site.

### `/seo/website-analytics-setup`
- **Service (GBP):** Website analytics setup
- **Primary keyword:** website analytics setup denton tx
- **Title:** `Website Analytics Setup Denton, TX | Numbers You Use`
- **H1:** Website analytics setup for Denton and DFW businesses
- **Meta:** See where your visitors come from and which pages turn them into calls and form fills, reported in plain numbers you can act on instead of a dashboard.
- **Nearest sibling:** `/seo/google-search-console-setup`
- **Differs:** Analytics is about visitor behaviour on your site: source, path, and what they did. Search Console is about your presence inside Google's index.
- **Note:** Vendor-neutral throughout. Google Analytics is not mentioned. There is a `TODO(owen)` for whether you want your own analytics tool named.

### `/seo/ai-overview-optimization`
- **Service (GBP):** AI Overview optimization
- **Primary keyword:** ai overview optimization
- **Title:** `AI Overview Optimization Denton, TX | GEO & AEO`
- **H1:** AI Overview optimization, also called GEO and AEO
- **Meta:** Get your pages cited in Google's AI Overviews and by tools like ChatGPT and Perplexity. Also called GEO or AEO: same work, three different names.
- **Also covers (GBP):** AI search optimization (GEO)
- **Nearest sibling:** `/seo/ai-search-visibility-audit`
- **Differs:** **MERGED, per Owen 2026-09-27.** This is now the single page for the whole discipline, covering both your **pages** being cited as a source and your **business** being recommended by name. `/local-marketing/ai-search-optimization` is not being built. It owns the GEO and AEO terminology explainer. Its nearest sibling is now the visibility audit, which diagnoses where you stand today while this page is the work that changes it.

### `/seo/ai-citation-building`
- **Service (GBP):** AI citation building
- **Primary keyword:** ai citation building
- **Title:** `AI Citation Building Denton, TX | Get Named by AI`
- **H1:** AI citation building: the sources AI tools read
- **Meta:** Earn the mentions and links AI tools actually pull from, so your business gets named when someone asks ChatGPT or Perplexity for a recommendation.
- **Nearest sibling:** `/seo/citation-building`
- **Differs:** Ordinary citation building targets directories that feed Google's local index. This targets the specific sources large language models were trained on and retrieve from, which is a different and much shorter list.

### `/seo/ai-search-visibility-audit`
- **Service (GBP):** AI search visibility audit
- **Primary keyword:** ai search visibility audit
- **Title:** `AI Search Visibility Audit Denton, TX | Where You Rank`
- **H1:** AI search visibility audits for local businesses
- **Meta:** Find out whether your business shows up when people ask AI tools what you do, see who is beating you there, and get a fix list ranked by what moves first.
- **Nearest sibling:** `/seo/seo-audit`
- **Differs:** Same diagnostic shape, entirely different surface. An SEO audit reads your site and Google's index. This one reads what ChatGPT, Perplexity, Gemini, and AI Overviews actually say when asked about your industry in your area.

### `/seo/answer-ready-content-writing`
- **Service (GBP):** Answer-ready content writing
- **Primary keyword:** answer ready content writing
- **Title:** `Answer-Ready Content Writing Denton, TX | Quotable`
- **H1:** Answer-ready content, written to be quoted
- **Meta:** Content written and formatted so AI assistants and search engines can pull out and quote it: direct answers up front, real specifics, nothing to wade through.
- **Nearest sibling:** `/seo/seo-content-writing`
- **Differs:** This is the writing deliverable inside the AI search group. It is defined by format, an answer that stands alone in the first two sentences. SEO content writing is defined by target query.

---

# C. Marketing agency
Hub: `/local-marketing`

### `/local-marketing`
- **Service (GBP):** none. Category hub.
- **Primary keyword:** local marketing agency denton tx
- **Title:** `Local Marketing Agency Denton, TX | 940Digital`
- **H1:** Local marketing for Denton and DFW businesses
- **Meta:** Local marketing for Denton and DFW businesses: Google Business Profile, reviews, listings, local SEO, and getting recommended by AI search tools.
- **Nearest sibling:** `/seo`
- **Differs:** The hub answers "who do I hire for all of this", an agency-choice query. `/seo` answers "how do I rank", a ranking problem. No other page in the map targets an agency-choice query.
- **Note:** With Local SEO and AI search optimization merged into the SEO silo, this hub is now cleanly about your presence on the platforms themselves: the Google profile, reviews, Bing, and Apple Maps. That is a more coherent hub than it was in the first draft, and it no longer overlaps `/seo` at all.



### `/local-marketing/google-business-profile-setup`
- **Service (GBP):** Google Business Profile setup
- **Primary keyword:** google business profile setup denton tx
- **Title:** `Google Business Profile Setup Denton, TX | Day One`
- **H1:** Google Business Profile setup, done right the first time
- **Meta:** Build your Google Business Profile right from day one: the correct categories, services, service area, hours, photos, and a description that follows the rules.
- **Nearest sibling:** `/local-marketing/google-business-profile-optimization`
- **Differs:** **RISK.** Setup means there is no profile yet, or it was never claimed. The work is creation and verification. Optimization means a profile exists and has to be assessed and repaired without triggering a review.

### `/local-marketing/google-business-profile-optimization`
- **Service (GBP):** Google Business Profile optimization
- **Primary keyword:** google business profile optimization
- **Title:** `Google Business Profile Optimization Denton, TX` **[name-only title]**
- **H1:** Google Business Profile optimization for existing profiles
- **Meta:** Fill out an existing Google Business Profile properly, with the right categories, services, photos, and attributes, so it shows up for more local searches.
- **Nearest sibling:** `/local-marketing/google-business-profile-setup`
- **Differs:** **RISK.** A one-time overhaul of a profile that already exists. The distinguishing content is what setup cannot have: auditing what is already wrong, and the suspension risk of editing a live listing.

### `/local-marketing/google-business-profile-management`
- **Service (GBP):** Google Business Profile management
- **Primary keyword:** google business profile management denton tx
- **Title:** `Google Business Profile Management Denton, TX` **[name-only title]**
- **H1:** Monthly Google Business Profile management
- **Meta:** Monthly care for your Google Business Profile: posts, photos, service updates, questions and answers, review replies, and watching for unwanted edits.
- **Nearest sibling:** `/local-marketing/google-business-profile-optimization`
- **Differs:** Optimization is a project with an end date. Management is a recurring monthly commitment, and the thing it protects against is a profile going stale or being edited by someone else.

### `/local-marketing/review-generation-strategy`
- **Service (GBP):** Review generation strategy
- **Primary keyword:** review generation strategy
- **Title:** `Review Generation Strategy Denton, TX | Policy-Safe`
- **H1:** A review generation strategy that stays inside Google's rules
- **Meta:** A simple system for asking happy customers for reviews at the right moment, with text and email templates that stay inside Google's review policies.
- **Nearest sibling:** `/local-marketing/review-response-management`
- **Differs:** Generation is about getting reviews written in the first place: timing, wording, and a repeatable ask. Response management is about what happens after one arrives.

### `/local-marketing/review-response-management`
- **Service (GBP):** Review response management
- **Primary keyword:** review response management
- **Title:** `Review Response Management Denton, TX | Every Review`
- **H1:** Review responses that win over the next customer
- **Meta:** Replies to your reviews, good and bad, that show future customers how you handle people and keep your Google Business Profile active every month.
- **Nearest sibling:** `/local-marketing/review-generation-strategy`
- **Differs:** The audience for a review reply is not the reviewer. It is the next person reading. That reframe is what this page is about, and generation strategy never touches it.

### `/local-marketing/bing-places-listing-setup`
- **Service (GBP):** Bing Places listing setup
- **Primary keyword:** bing places listing setup
- **Title:** `Bing Places Listing Setup Denton, TX | Bing & Copilot`
- **H1:** Bing Places listing setup for Denton businesses
- **Meta:** Claim and verify your listing on Bing Places so you show up in Bing search and maps, on Windows devices, and in the AI assistants that pull from Bing.
- **Nearest sibling:** `/local-marketing/apple-maps-listing-setup`
- **Differs:** One platform each. The reason to care about Bing is Windows default search and the AI assistants that source local results from it. That reason has nothing to do with Apple's.

### `/local-marketing/apple-maps-listing-setup`
- **Service (GBP):** Apple Maps listing setup
- **Primary keyword:** apple maps listing setup
- **Title:** `Apple Maps Listing Setup Denton, TX | Siri & iPhone`
- **H1:** Apple Maps listing setup via Apple Business Connect
- **Meta:** Set up and verify your business on Apple Business Connect so iPhone users find you in Apple Maps, Siri, and Spotlight with the right hours and photos.
- **Nearest sibling:** `/local-marketing/bing-places-listing-setup`
- **Differs:** The reason to care here is iPhone share and the three places Apple surfaces a business: Maps, Siri, and Spotlight. Different platform, different tool (Apple Business Connect), different verification process.

---

# D. Marketing consultant
Hub: `/consulting`

### `/consulting`
- **Service (GBP):** none. Category hub.
- **Primary keyword:** marketing consultant denton tx
- **Title:** `Marketing Consultant Denton, TX | 940Digital`
- **H1:** Marketing consulting for Denton and DFW owners
- **Meta:** One-on-one marketing and SEO consulting for owner-operated businesses in Denton and DFW. Straight answers and a plan you can act on yourself.
- **Nearest sibling:** `/consulting/seo-consulting`
- **Differs:** The hub is for someone who wants advice and has not decided what about. Its children are each a specific subject. Everything under this hub sells my time rather than my execution, and the hub is where that distinction gets made.

### `/consulting/seo-consulting`
- **Service (GBP):** SEO consulting
- **Primary keyword:** seo consulting denton tx
- **Title:** `SEO Consulting Denton, TX | Straight Answers`
- **H1:** SEO consulting from the person doing the work
- **Meta:** One-on-one advice from the person doing the work. Straight answers about your rankings, your site, and your Google profile, plus a plan you can act on.
- **Nearest sibling:** `/consulting/marketing-strategy`
- **Differs:** SEO consulting is one channel in depth: rankings, the site, the profile. Marketing strategy is the level above, deciding whether SEO is even where your next dollar should go.
- **Note:** Also close to `/seo`. The split is that `/seo` sells the work done for you, and this sells the advice so you or your team can do it. Named in the plan doc, section 7.

### `/consulting/marketing-strategy`
- **Service (GBP):** Marketing strategy
- **Primary keyword:** marketing strategy consultant denton tx
- **Title:** `Marketing Strategy Denton, TX | Where to Spend`
- **H1:** Marketing strategy for owner-operated businesses
- **Meta:** Help deciding where to put your marketing time and money, based on what actually brings in customers for owner-operated local businesses in Denton and DFW.
- **Nearest sibling:** `/consulting/seo-consulting`
- **Differs:** This page is channel-agnostic and it is allowed to conclude that you should not spend on SEO this quarter. That honesty is the page's entire value, and it is what separates it from every other page on this site.

### `/consulting/website-strategy-session`
- **Service (GBP):** Website strategy session
- **Primary keyword:** website strategy session
- **Title:** `Website Strategy Session Denton, TX | Plan First`
- **H1:** A website strategy session before you build
- **Meta:** A working session to plan your pages, services, and site structure before you build or rebuild, so the site serves customers and search engines both.
- **Nearest sibling:** `/consulting/marketing-strategy`
- **Differs:** One session, one deliverable, one subject: the page and URL structure of a specific site that has not been built yet. Marketing strategy is broader and does not produce a sitemap.

### `/consulting/google-business-profile-training`
- **Service (GBP):** Google Business Profile training
- **Primary keyword:** google business profile training
- **Title:** `Google Business Profile Training Denton, TX` **[name-only title]**
- **H1:** Google Business Profile training: run it yourself
- **Meta:** Learn to run your own Google Business Profile: posting, replying to reviews, adding services and photos, and avoiding the changes that trigger suspensions.
- **Nearest sibling:** `/local-marketing/google-business-profile-management` (cross-hub)
- **Differs:** Same subject, opposite delivery. Management means I do it every month. Training means you do it and I make sure you do not get suspended doing it.

### `/consulting/seo-training`
- **Service (GBP):** SEO training for business owners
- **Primary keyword:** seo training for business owners
- **Title:** `SEO Training for Business Owners Denton, TX` **[name-only title]**
- **H1:** SEO training for business owners and their staff
- **Meta:** Practical training for owners or staff who want to handle basic SEO in-house, from writing service pages to tracking what actually moved the needle.
- **Nearest sibling:** `/consulting/seo-consulting`
- **Differs:** Consulting answers your questions about your situation. Training teaches a repeatable skill so the next question does not need me. The deliverable is competence rather than a recommendation.

### `/consulting/photo-and-video-strategy`
- **Service (GBP):** Photo and video strategy
- **Primary keyword:** photo and video strategy for business
- **Title:** `Photo and Video Strategy Denton, TX | What to Shoot`
- **H1:** Photo and video strategy for your profile and site
- **Meta:** What to photograph and film for your profile and website so customers see real work and real people, shot at the angle your business looks best from.
- **Nearest sibling:** `/local-marketing/google-business-profile-management` (cross-hub)
- **Differs:** This is a shot list and a plan, not a shoot and not an upload schedule. It tells you what to capture and why each one earns its place. Profile management is what happens to those files afterwards.
- **Note:** I do not photograph or film. This page has to be unambiguous that the deliverable is strategy. Flagged as a question.

---

# Summary counts

Revised 2026-09-27 after Owen's decisions: the two risky pairs are merged, so the map is now **46 pages covering 45 services**. Two pages each carry two GBP services, the same pattern the homepage already uses for "website design".

| Category | GBP services | Pages |
| --- | --- | --- |
| Website designer (primary) | 12 | 1 homepage + 11 service pages |
| Internet marketing service | 18 | 1 hub (also the Search engine optimization and Local SEO page) + 17 service pages |
| Marketing agency | 9 | 1 hub + 7 service pages |
| Marketing consultant | 6 | 1 hub + 6 service pages |
| Directory | 0 | `/services` |
| **Total** | **45** | **46** |

Pages carrying two services each:

| URL | GBP services covered |
| --- | --- |
| `/` | website design |
| `/seo` | Search engine optimization **and** Local SEO |
| `/seo/ai-overview-optimization` | AI Overview optimization **and** AI search optimization (GEO) |

Not built, per Owen: `/local-marketing/local-seo` and `/local-marketing/ai-search-optimization`. Neither URL has ever existed, so no redirect is needed. Both are absent from the data module rather than marked draft, so nothing links to them and nothing can accidentally publish them.

No two published pages share a primary keyword. `scripts/check-seo.mjs` enforces this on every build.

Also deliberately not created: `/web-design` and `/services/website-design`, both 301 to `/`. There is no hosting page, no hosting hub, and no "Hosting & Maintenance" heading anywhere in the map.
