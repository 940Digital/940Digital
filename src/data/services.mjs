/**
 * The 43 Google Business Profile services and the 46 pages that carry them.
 * SINGLE SOURCE OF TRUTH. Nav, the /services directory, hub listings, the
 * homepage service list, breadcrumbs, schema, internal links, and sitemap.xml
 * are all generated from this file. No service name is typed anywhere else.
 *
 * GENERATED from docs/seo-page-map.md on 2026-09-27, then maintained here.
 * Service names are diffed against src/data/gbp-services.json by
 * scripts/check-seo.mjs, which fails the build on any mismatch.
 *
 * status: 'published' renders an indexable page in the sitemap.
 *         'draft' renders nothing, is excluded from the sitemap, and is named
 *         but not linked in listings. Service pages stay draft until Owen
 *         answers docs/service-page-questions.md, because the copy depends on
 *         facts only he has.
 *
 * covers: the GBP service names this one page is the landing page for.
 *
 *         2026-09-27: Owen removed "Local SEO" and "AI search optimization
 *         (GEO)" from the profile so the services list matches the site
 *         exactly. Every service now has exactly one page, one to one. 43
 *         services across 46 pages; the three extras are /services (a
 *         directory) and the /local-marketing and /consulting hubs, which
 *         carry no named profile service of their own.
 */

/**
 * @typedef {Object} Page
 * @property {string} url                Root-absolute, no trailing slash.
 * @property {string} [serviceAnchor]    Display-only fragment for links that
 *   point at this page AS a service. The homepage doubles as the website design
 *   page, so a bare "/" drops the reader at the top of a hero about everything.
 *   Never used for canonical, schema or sitemap URLs.
 * @property {string} slug               Output path without .html.
 * @property {'homepage'|'hub'|'directory'|'service'} role
 * @property {string|null} name          Primary GBP service name, verbatim.
 * @property {string[]} covers           All GBP service names this page owns.
 * @property {string[]} alsoCovers       Secondary names beyond `name`.
 * @property {string|null} gbpCategory
 * @property {string|null} hub           Parent hub URL, for breadcrumbs.
 * @property {string|null} primaryKeyword
 * @property {string} title
 * @property {string} h1
 * @property {string} meta
 * @property {string|null} nearestSibling
 * @property {string|null} gbpDescription
 * @property {'published'|'draft'} status
 */

export const CATEGORIES = [
  "Website designer",
  "Internet marketing service",
  "Marketing agency",
  "Marketing consultant"
];

/**
 * The GBP category each service name belongs to, from the profile itself.
 * A page's own `gbpCategory` is where the page sits in the site hierarchy,
 * which is NOT always the service's category: /seo carries Local SEO, and
 * /seo/ai-overview-optimization carries AI search optimization (GEO), and both
 * of those services are Marketing agency on the profile. Schema and the
 * directory must group by THIS map so they match the profile.
 */
export const SERVICE_CATEGORY = {
  "website design": "Website designer",
  "Website Maintenance": "Website designer",
  "Website redesign": "Website designer",
  "Landing page design": "Website designer",
  "Ecommerce website design": "Website designer",
  "UX/UI design": "Website designer",
  "Website speed optimization": "Website designer",
  "Website copywriting": "Website designer",
  "Website migration": "Website designer",
  "Conversion rate optimization": "Website designer",
  "Service area page design": "Website designer",
  "Online booking setup": "Website designer",
  "Search engine optimization": "Internet marketing service",
  "SEO audit": "Internet marketing service",
  "Technical SEO": "Internet marketing service",
  "On-page SEO": "Internet marketing service",
  "Link building": "Internet marketing service",
  "Citation building": "Internet marketing service",
  "Local listings cleanup": "Internet marketing service",
  "Schema markup": "Internet marketing service",
  "Blog writing": "Internet marketing service",
  "SEO content writing": "Internet marketing service",
  "Rank tracking and geo-grid reports": "Internet marketing service",
  "Competitor analysis": "Internet marketing service",
  "Google Search Console setup": "Internet marketing service",
  "Website analytics setup": "Internet marketing service",
  "AI Overview optimization": "Internet marketing service",
  "AI citation building": "Internet marketing service",
  "AI search visibility audit": "Internet marketing service",
  "Answer-ready content writing": "Internet marketing service",
  "Google Business Profile setup": "Marketing agency",
  "Google Business Profile optimization": "Marketing agency",
  "Google Business Profile management": "Marketing agency",
  "Review generation strategy": "Marketing agency",
  "Review response management": "Marketing agency",
  "Bing Places listing setup": "Marketing agency",
  "Apple Maps listing setup": "Marketing agency",
  "SEO consulting": "Marketing consultant",
  "Marketing strategy": "Marketing consultant",
  "Website strategy session": "Marketing consultant",
  "Google Business Profile training": "Marketing consultant",
  "SEO training for business owners": "Marketing consultant",
  "Photo and video strategy": "Marketing consultant"
};

export const PRIMARY_CATEGORY = "Website designer";

/** Hub URL for each GBP category. */
export const CATEGORY_HUB = {
  "Website designer": "/",
  "Internet marketing service": "/seo",
  "Marketing agency": "/local-marketing",
  "Marketing consultant": "/consulting"
};

/** Human label for each hub, used in nav and breadcrumbs. */
export const CATEGORY_LABEL = {
  'Website designer': 'Website design',
  'Internet marketing service': 'SEO & AI search',
  'Marketing agency': 'Local marketing',
  'Marketing consultant': 'Consulting',
};

/** @type {Page[]} */
export const PAGES = [
  {
    "url": "/",
    "name": null,
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "website designer denton tx",
    "title": "Website Designer Denton, TX | Web Design & SEO | 940Digital",
    "h1": "Website design for small businesses in Denton and DFW",
    "meta": "I build custom websites for small businesses in Denton and DFW. Fast, mobile-friendly, and structured so customers and Google both understand what you do.",
    "nearestSibling": "/services/website-redesign",
    "role": "homepage",
    "hub": null,
    "gbpDescription": "A full professional custom website built around your business, not a template. Fast, mobile-friendly, and structured so both customers and Google understand what you do and where. Every project starts with a working demo you can see before committing to anything.",
    "covers": [],
    "status": "published",
    "slug": "index"
  },
  {
    "url": "/services/website-design",
    "name": "website design",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "website design denton tx",
    "title": "Website Design Denton, TX | See It Before You Pay",
    "h1": "Website design for small businesses in Denton and DFW",
    "meta": "Custom websites for small businesses in Denton and DFW. Built around your business, structured to be found, and you see a working demo before you pay anything.",
    "nearestSibling": "/services/website-redesign",
    "role": "service",
    "hub": "/",
    "gbpDescription": "A full professional custom website built around your business, not a template. Fast, mobile-friendly, and structured so both customers and Google understand what you do and where. Every project starts with a working demo you can see before committing to anything.",
    "covers": [
      "website design"
    ],
    "status": "published",
    "slug": "services/website-design"
  },
  {
    "url": "/services",
    "name": null,
    "alsoCovers": [],
    "gbpCategory": null,
    "primaryKeyword": null,
    "title": "All Services | 940Digital, Denton TX",
    "h1": "Everything I do, in one list",
    "meta": "Every service 940Digital offers, grouped by what it does: website design, SEO and AI search, local marketing and Google Business Profile work, and consulting.",
    "nearestSibling": "/",
    "role": "directory",
    "hub": null,
    "gbpDescription": null,
    "covers": [],
    "status": "published",
    "slug": "services"
  },
  {
    "url": "/services/website-maintenance",
    "name": "Website Maintenance",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "website maintenance denton tx",
    "title": "Website Maintenance Denton, TX | Hosting Included",
    "h1": "Website maintenance for Denton and DFW businesses",
    "meta": "Ongoing upkeep that keeps your site running the way it did on launch day. Covers speed, content updates, analytics, hosting, and catching issues early.",
    "nearestSibling": "/services/website-speed-optimization",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Ongoing upkeep to keep your site running the way it did on launch day. Covers analytics, speed, content updates, hosting, and catching issues before they cost you visitors. Pairs with SEO and GBP work so the site keeps performing without added effort on your end.",
    "covers": [
      "Website Maintenance"
    ],
    "status": "draft",
    "slug": "services/website-maintenance"
  },
  {
    "url": "/services/website-redesign",
    "name": "Website redesign",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "website redesign denton tx",
    "title": "Website Redesign Denton, TX | Keep Your Rankings",
    "h1": "Website redesigns that do not cost you your rankings",
    "meta": "Turn a dated or slow site into a modern one without losing the rankings you already have. Includes redirect mapping, rewritten content, and mobile-first layout.",
    "nearestSibling": "/services/website-migration",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Turn a dated or slow site into a modern one without losing the rankings you already have. Includes redirect mapping, rewritten content, and a mobile-first layout.",
    "covers": [
      "Website redesign"
    ],
    "status": "draft",
    "slug": "services/website-redesign"
  },
  {
    "url": "/services/landing-page-design",
    "name": "Landing page design",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "landing page design denton tx",
    "title": "Landing Page Design Denton, TX | One Page, One Goal",
    "h1": "Landing pages built for one goal",
    "meta": "A single focused page built for one goal, like booking a call or requesting a quote. Useful for ads, a promotion, or a service you want more of.",
    "nearestSibling": "/services/conversion-rate-optimization",
    "role": "service",
    "hub": "/",
    "gbpDescription": "A single focused page built for one goal, like booking a call or requesting a quote. Useful for ads, promotions, or a service you want more of.",
    "covers": [
      "Landing page design"
    ],
    "status": "draft",
    "slug": "services/landing-page-design"
  },
  {
    "url": "/services/ecommerce-website-design",
    "name": "Ecommerce website design",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "ecommerce website design denton tx",
    "title": "Ecommerce Website Design Denton, TX | Local Stores",
    "h1": "Ecommerce websites for local businesses that sell products",
    "meta": "Online stores for local businesses that sell products. Clear product pages, simple checkout, and setup for local pickup or shipping in the DFW area.",
    "nearestSibling": "/",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Online stores for local businesses that sell products. Clear product pages, simple checkout, and setup for local pickup or shipping.",
    "covers": [
      "Ecommerce website design"
    ],
    "status": "draft",
    "slug": "services/ecommerce-website-design"
  },
  {
    "url": "/services/ux-ui-design",
    "name": "UX/UI design",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "ux ui design denton tx",
    "title": "UX/UI Design Denton, TX | Layout That Converts",
    "h1": "UX and UI design for local service websites",
    "meta": "Layout and navigation planned so visitors find what they need and get in touch faster. The structural work behind a site that turns traffic into calls.",
    "nearestSibling": "/services/conversion-rate-optimization",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Layout and navigation tactically planned to keep your leads hooked on the page, so visitors find what they need and get in touch faster.",
    "covers": [
      "UX/UI design"
    ],
    "status": "draft",
    "slug": "services/ux-ui-design"
  },
  {
    "url": "/services/website-speed-optimization",
    "name": "Website speed optimization",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "website speed optimization denton tx",
    "title": "Website Speed Optimization Denton, TX | Faster Pages",
    "h1": "Website speed optimization for Denton and DFW businesses",
    "meta": "Fix the heavy images, bloated code, and slow hosting that keep your pages from loading. Faster pages hold visitors and support better search rankings.",
    "nearestSibling": "/seo/technical-seo",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Fix the heavy images, bloated code, and slow hosting that keep pages from loading. Faster pages hold visitors and support better rankings.",
    "covers": [
      "Website speed optimization"
    ],
    "status": "draft",
    "slug": "services/website-speed-optimization"
  },
  {
    "url": "/services/website-copywriting",
    "name": "Website copywriting",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "website copywriting denton tx",
    "title": "Website Copywriting Denton, TX | Written in Your Voice",
    "h1": "Website copy that sounds like you and sells",
    "meta": "Website copy that explains what you do, who you help, and why someone should pick you. Written in your voice, for the customers you actually want.",
    "nearestSibling": "/seo/seo-content-writing",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Website copy that explains what you do, who you help, and why someone should pick you. Written in your voice, for your customers.",
    "covers": [
      "Website copywriting"
    ],
    "status": "draft",
    "slug": "services/website-copywriting"
  },
  {
    "url": "/services/website-migration",
    "name": "Website migration",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "website migration denton tx",
    "title": "Website Migration Denton, TX | No Lost Traffic",
    "h1": "Website migrations without lost pages or traffic",
    "meta": "Move your site to a new platform or host without breaking pages or losing search traffic. Includes redirect mapping and a full check after the move.",
    "nearestSibling": "/services/website-redesign",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Move your site to a new platform or host without breaking pages or losing search traffic. Includes redirect mapping and a check after the move.",
    "covers": [
      "Website migration"
    ],
    "status": "draft",
    "slug": "services/website-migration"
  },
  {
    "url": "/services/conversion-rate-optimization",
    "name": "Conversion rate optimization",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "conversion rate optimization denton tx",
    "title": "Conversion Rate Optimization Denton, TX | More Leads",
    "h1": "Conversion rate optimization for local service businesses",
    "meta": "Changes that turn more of the visitors you already have into leads: clearer calls to action, better forms, trust signals, and tested page layouts.",
    "nearestSibling": "/services/ux-ui-design",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Changes that turn more of the visitors you already have into leads: clearer calls to action, better forms, trust signals, and tested layouts.",
    "covers": [
      "Conversion rate optimization"
    ],
    "status": "draft",
    "slug": "services/conversion-rate-optimization"
  },
  {
    "url": "/services/service-area-page-design",
    "name": "Service area page design",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "service area page design",
    "title": "Service Area Page Design Denton, TX | Real Local Detail",
    "h1": "Service area pages built on real local detail",
    "meta": "A page for each town you genuinely serve, built on real local detail so customers and Google both see you work there. No swapped-city templates.",
    "nearestSibling": "/seo/seo-content-writing",
    "role": "service",
    "hub": "/",
    "gbpDescription": "A page for each town you serve, with real local detail, so customers in those areas and Google can both see that you work there.",
    "covers": [
      "Service area page design"
    ],
    "status": "draft",
    "slug": "services/service-area-page-design"
  },
  {
    "url": "/services/online-booking-setup",
    "name": "Online booking setup",
    "alsoCovers": [],
    "gbpCategory": "Website designer",
    "primaryKeyword": "online booking setup denton tx",
    "title": "Online Booking Setup Denton, TX | Book From Your Site",
    "h1": "Online booking, straight from your website",
    "meta": "Let customers book a call, a consult, or a job straight from your site. Connects to your calendar so you stop trading voicemails to find a time.",
    "nearestSibling": "/services/landing-page-design",
    "role": "service",
    "hub": "/",
    "gbpDescription": "Let customers book a call, a consult, or a job straight from your site. Connects to your calendar so you stop trading voicemails just to find a time that works.",
    "covers": [
      "Online booking setup"
    ],
    "status": "draft",
    "slug": "services/online-booking-setup"
  },
  {
    "url": "/seo",
    "name": "Search engine optimization",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "seo denton tx",
    "title": "SEO & Internet Marketing Denton, TX | 940Digital",
    "h1": "Search engine optimization for Denton and DFW businesses",
    "meta": "Search engine optimization and AI search for Denton and DFW businesses. Built on clean pages, useful content, and credibility search engines can verify.",
    "nearestSibling": "/local-marketing",
    "role": "hub",
    "hub": null,
    "gbpDescription": "Improve how your site ranks for the searches that bring paying customers. Built on clean pages, useful content, and real credibility.",
    "covers": [
      "Search engine optimization"
    ],
    "status": "published",
    "slug": "seo"
  },
  {
    "url": "/seo/seo-audit",
    "name": "SEO audit",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "seo audit denton tx",
    "title": "SEO Audit Denton, TX | Plain-English Fix List",
    "h1": "SEO audits for Denton and DFW businesses",
    "meta": "A plain-English review of what is holding your site back, with a prioritized fix list covering technical issues, content gaps, and local ranking signals.",
    "nearestSibling": "/seo/competitor-analysis",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "A plain-English review of what is holding your site back, with a prioritized fix list covering technical issues, content gaps, and local signals.",
    "covers": [
      "SEO audit"
    ],
    "status": "draft",
    "slug": "seo/seo-audit"
  },
  {
    "url": "/seo/technical-seo",
    "name": "Technical SEO",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "technical seo denton tx",
    "title": "Technical SEO Denton, TX | Fix What Blocks Google",
    "h1": "Technical SEO: making your site readable to Google",
    "meta": "Fix what stops Google reading your site properly: indexing errors, broken links, duplicate pages, slow pages, and problems that only show up on mobile.",
    "nearestSibling": "/seo/on-page-seo",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Fix what stops Google reading your site properly: indexing errors, broken links, duplicate pages, slow pages, and mobile problems.",
    "covers": [
      "Technical SEO"
    ],
    "status": "draft",
    "slug": "seo/technical-seo"
  },
  {
    "url": "/seo/on-page-seo",
    "name": "On-page SEO",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "on page seo denton tx",
    "title": "On-Page SEO Denton, TX | Page-Level Targeting",
    "h1": "On-page SEO, one page at a time",
    "meta": "Tune each page's title, headings, content, and internal links so search engines can tell what that page is about and which town it serves. Done page by page.",
    "nearestSibling": "/seo/seo-content-writing",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Tune each page's titles, headings, content, and internal links so Google can tell what the page is about and which town it serves.",
    "covers": [
      "On-page SEO"
    ],
    "status": "draft",
    "slug": "seo/on-page-seo"
  },
  {
    "url": "/seo/link-building",
    "name": "Link building",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "link building denton tx",
    "title": "Link Building Denton, TX | Real Local Links Only",
    "h1": "Link building from real local sites",
    "meta": "Earn links from real local sites: chambers, sponsorships, partners, and local news coverage. No link schemes and no paid networks that put your site at risk.",
    "nearestSibling": "/seo/citation-building",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Earn links from real local sites: chambers, sponsorships, partners, and local news. No link schemes that put your site at risk.",
    "covers": [
      "Link building"
    ],
    "status": "draft",
    "slug": "seo/link-building"
  },
  {
    "url": "/seo/citation-building",
    "name": "Citation building",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "citation building denton tx",
    "title": "Citation Building Denton, TX | Consistent NAP",
    "h1": "Citation building: your details right everywhere",
    "meta": "Get your name, address, and phone listed correctly on the directories that count, so search engines and customers see the same details everywhere.",
    "nearestSibling": "/seo/local-listings-cleanup",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Get your name, address, and phone listed correctly on the directories that count, so Google and customers see the same details everywhere.",
    "covers": [
      "Citation building"
    ],
    "status": "draft",
    "slug": "seo/citation-building"
  },
  {
    "url": "/seo/local-listings-cleanup",
    "name": "Local listings cleanup",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "local listings cleanup",
    "title": "Local Listings Cleanup Denton, TX | Fix Bad Data",
    "h1": "Local listings cleanup: killing the wrong information",
    "meta": "Track down the duplicate and incorrect listings, old phone numbers, and dead addresses that confuse customers and undercut your local rankings.",
    "nearestSibling": "/seo/citation-building",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Track down the wrong and duplicate listings, old phone numbers and addresses, that confuse customers and undercut your local rankings.",
    "covers": [
      "Local listings cleanup"
    ],
    "status": "draft",
    "slug": "seo/local-listings-cleanup"
  },
  {
    "url": "/seo/schema-markup",
    "name": "Schema markup",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "schema markup denton tx",
    "title": "Schema Markup Denton, TX | Structured Data Done Right",
    "h1": "Schema markup for local business websites",
    "meta": "Structured data that tells search engines your business type, services, and service area in a format they read without guessing. Built to match your site.",
    "nearestSibling": "/seo/technical-seo",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Structured data that tells search engines your business type, services, service area, and reviews in a format they read without guessing.",
    "covers": [
      "Schema markup"
    ],
    "status": "draft",
    "slug": "seo/schema-markup"
  },
  {
    "url": "/seo/blog-writing",
    "name": "Blog writing",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "blog writing denton tx",
    "title": "Blog Writing Denton, TX | Answers Before They Buy",
    "h1": "Blog posts that answer pre-purchase questions",
    "meta": "Articles that answer the questions customers ask before they buy. Written for people first, and planned around the topics that actually bring in work.",
    "nearestSibling": "/seo/seo-content-writing",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Articles that answer the questions customers ask before they buy. Written for people first, and planned around what brings in work.",
    "covers": [
      "Blog writing"
    ],
    "status": "draft",
    "slug": "seo/blog-writing"
  },
  {
    "url": "/seo/seo-content-writing",
    "name": "SEO content writing",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "seo content writing denton tx",
    "title": "SEO Content Writing Denton, TX | Specific, Not Filler",
    "h1": "SEO content writing for service and location pages",
    "meta": "Service and location page content that is specific, accurate, and built to rank, using real detail from your business instead of filler and keyword padding.",
    "nearestSibling": "/seo/blog-writing",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Service and location page content that is specific, accurate, and built to rank, using real detail from your business instead of filler.",
    "covers": [
      "SEO content writing"
    ],
    "status": "draft",
    "slug": "seo/seo-content-writing"
  },
  {
    "url": "/seo/rank-tracking",
    "name": "Rank tracking and geo-grid reports",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "geo grid rank tracking denton tx",
    "title": "Rank Tracking and Geo-Grid Reports Denton, TX",
    "h1": "Rank tracking and geo-grid reports across your service area",
    "meta": "See where you rank across your whole service area on Google Maps, not just at your own address, in monthly reports that show exactly what moved.",
    "nearestSibling": "/seo/google-search-console-setup",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "See where you rank across your whole service area on Google Maps, not just at your own address, in monthly reports that show what moved.",
    "covers": [
      "Rank tracking and geo-grid reports"
    ],
    "status": "draft",
    "slug": "seo/rank-tracking"
  },
  {
    "url": "/seo/competitor-analysis",
    "name": "Competitor analysis",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "competitor analysis denton tx",
    "title": "Competitor Analysis Denton, TX | Close the Gap",
    "h1": "Competitor analysis for local search and Maps",
    "meta": "Find out why a specific competitor outranks you in Maps and search, and get a plan to close the gap on their categories, content, reviews, and links.",
    "nearestSibling": "/seo/seo-audit",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Find out why competitors outrank you in Maps and search, and get a plan to close the gap on their categories, content, and links.",
    "covers": [
      "Competitor analysis"
    ],
    "status": "draft",
    "slug": "seo/competitor-analysis"
  },
  {
    "url": "/seo/google-search-console-setup",
    "name": "Google Search Console setup",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "google search console setup denton tx",
    "title": "Google Search Console Setup Denton, TX | See Your Data",
    "h1": "Google Search Console setup and your first read of it",
    "meta": "Connect your site to Google Search Console so you can see what you show up for, fix indexing problems, and catch issues before they cost you traffic.",
    "nearestSibling": "/seo/website-analytics-setup",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Connect your site to Search Console so you can see what you show up for, fix indexing problems, and catch issues early.",
    "covers": [
      "Google Search Console setup"
    ],
    "status": "draft",
    "slug": "seo/google-search-console-setup"
  },
  {
    "url": "/seo/website-analytics-setup",
    "name": "Website analytics setup",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "website analytics setup denton tx",
    "title": "Website Analytics Setup Denton, TX | Numbers You Use",
    "h1": "Website analytics setup for Denton and DFW businesses",
    "meta": "See where your visitors come from and which pages turn them into calls and form fills, reported in plain numbers you can act on instead of a dashboard.",
    "nearestSibling": "/seo/google-search-console-setup",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "See where your visitors come from and which pages turn them into calls and form fills, reported in plain numbers you can act on instead of a dashboard you never open.",
    "covers": [
      "Website analytics setup"
    ],
    "status": "draft",
    "slug": "seo/website-analytics-setup"
  },
  {
    "url": "/seo/ai-overview-optimization",
    "name": "AI Overview optimization",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "ai overview optimization",
    "title": "AI Overview Optimization Denton, TX | GEO & AEO",
    "h1": "AI Overview optimization, also called GEO and AEO",
    "meta": "Get your pages cited in Google's AI Overviews and by tools like ChatGPT and Perplexity. Also called GEO or AEO: same work, three different names.",
    "nearestSibling": "/seo/ai-search-visibility-audit",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Get your pages picked up in Google's AI Overviews and cited by ChatGPT and other AI tools. Also called generative engine optimization (GEO) or answer engine optimization (AEO): same goal, different name.",
    "covers": [
      "AI Overview optimization"
    ],
    "status": "draft",
    "slug": "seo/ai-overview-optimization"
  },
  {
    "url": "/seo/ai-citation-building",
    "name": "AI citation building",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "ai citation building",
    "title": "AI Citation Building Denton, TX | Get Named by AI",
    "h1": "AI citation building: the sources AI tools read",
    "meta": "Earn the mentions and links AI tools actually pull from, so your business gets named when someone asks ChatGPT or Perplexity for a recommendation.",
    "nearestSibling": "/seo/citation-building",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Earn the mentions and links AI tools actually pull from, so your business gets named when people ask ChatGPT, Perplexity, or Gemini for recommendations in your industry.",
    "covers": [
      "AI citation building"
    ],
    "status": "draft",
    "slug": "seo/ai-citation-building"
  },
  {
    "url": "/seo/ai-search-visibility-audit",
    "name": "AI search visibility audit",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "ai search visibility audit",
    "title": "AI Search Visibility Audit Denton, TX | Where You Rank",
    "h1": "AI search visibility audits for local businesses",
    "meta": "Find out whether your business shows up when people ask AI tools what you do, see who is beating you there, and get a fix list ranked by what moves first.",
    "nearestSibling": "/seo/seo-audit",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Find out whether your business shows up when people ask AI tools what you do, see who is beating you there, and get a fix-it plan ranked by what moves the needle fastest.",
    "covers": [
      "AI search visibility audit"
    ],
    "status": "draft",
    "slug": "seo/ai-search-visibility-audit"
  },
  {
    "url": "/seo/answer-ready-content-writing",
    "name": "Answer-ready content writing",
    "alsoCovers": [],
    "gbpCategory": "Internet marketing service",
    "primaryKeyword": "answer ready content writing",
    "title": "Answer-Ready Content Writing Denton, TX | Quotable",
    "h1": "Answer-ready content, written to be quoted",
    "meta": "Content written and formatted so AI assistants and search engines can pull out and quote it: direct answers up front, real specifics, nothing to wade through.",
    "nearestSibling": "/seo/seo-content-writing",
    "role": "service",
    "hub": "/seo",
    "gbpDescription": "Content written and formatted so AI assistants and search engines can pull it out and quote it directly: clear direct answers up front, real specifics, no fluff to wade through.",
    "covers": [
      "Answer-ready content writing"
    ],
    "status": "draft",
    "slug": "seo/answer-ready-content-writing"
  },
  {
    "url": "/local-marketing",
    "name": null,
    "alsoCovers": [],
    "gbpCategory": "Marketing agency",
    "primaryKeyword": "local marketing agency denton tx",
    "title": "Local Marketing Agency Denton, TX | 940Digital",
    "h1": "Local marketing for Denton and DFW businesses",
    "meta": "Local marketing for Denton and DFW businesses: Google Business Profile, reviews, listings, local SEO, and getting recommended by AI search tools.",
    "nearestSibling": "/seo",
    "role": "hub",
    "hub": null,
    "gbpDescription": null,
    "covers": [],
    "status": "published",
    "slug": "local-marketing"
  },
  {
    "url": "/local-marketing/google-business-profile-setup",
    "name": "Google Business Profile setup",
    "alsoCovers": [],
    "gbpCategory": "Marketing agency",
    "primaryKeyword": "google business profile setup denton tx",
    "title": "Google Business Profile Setup Denton, TX | Day One",
    "h1": "Google Business Profile setup, done right the first time",
    "meta": "Build your Google Business Profile right from day one: the correct categories, services, service area, hours, photos, and a description that follows the rules.",
    "nearestSibling": "/local-marketing/google-business-profile-optimization",
    "role": "service",
    "hub": "/local-marketing",
    "gbpDescription": "Build your profile correctly from day one: the right categories, services, service area, hours, photos, and a description that follows Google's rules.",
    "covers": [
      "Google Business Profile setup"
    ],
    "status": "draft",
    "slug": "local-marketing/google-business-profile-setup"
  },
  {
    "url": "/local-marketing/google-business-profile-optimization",
    "name": "Google Business Profile optimization",
    "alsoCovers": [],
    "gbpCategory": "Marketing agency",
    "primaryKeyword": "google business profile optimization",
    "title": "Google Business Profile Optimization Denton, TX",
    "h1": "Google Business Profile optimization for existing profiles",
    "meta": "Fill out an existing Google Business Profile properly, with the right categories, services, photos, and attributes, so it shows up for more local searches.",
    "nearestSibling": "/local-marketing/google-business-profile-setup",
    "role": "service",
    "hub": "/local-marketing",
    "gbpDescription": "Fill out an existing profile properly, with the right categories, services, descriptions, photos, and attributes, so it shows up for more local searches.",
    "covers": [
      "Google Business Profile optimization"
    ],
    "status": "draft",
    "slug": "local-marketing/google-business-profile-optimization"
  },
  {
    "url": "/local-marketing/google-business-profile-management",
    "name": "Google Business Profile management",
    "alsoCovers": [],
    "gbpCategory": "Marketing agency",
    "primaryKeyword": "google business profile management denton tx",
    "title": "Google Business Profile Management Denton, TX",
    "h1": "Monthly Google Business Profile management",
    "meta": "Monthly care for your Google Business Profile: posts, photos, service updates, questions and answers, review replies, and watching for unwanted edits.",
    "nearestSibling": "/local-marketing/google-business-profile-optimization",
    "role": "service",
    "hub": "/local-marketing",
    "gbpDescription": "Monthly care for your profile: posts, photos, service updates, questions and answers, review replies, and watching for unwanted edits.",
    "covers": [
      "Google Business Profile management"
    ],
    "status": "draft",
    "slug": "local-marketing/google-business-profile-management"
  },
  {
    "url": "/local-marketing/review-generation-strategy",
    "name": "Review generation strategy",
    "alsoCovers": [],
    "gbpCategory": "Marketing agency",
    "primaryKeyword": "review generation strategy",
    "title": "Review Generation Strategy Denton, TX | Policy-Safe",
    "h1": "A review generation strategy that stays inside Google's rules",
    "meta": "A simple system for asking happy customers for reviews at the right moment, with text and email templates that stay inside Google's review policies.",
    "nearestSibling": "/local-marketing/review-response-management",
    "role": "service",
    "hub": "/local-marketing",
    "gbpDescription": "A simple system for asking happy customers for reviews at the right moment, with text and email templates that stay inside Google's review policies.",
    "covers": [
      "Review generation strategy"
    ],
    "status": "draft",
    "slug": "local-marketing/review-generation-strategy"
  },
  {
    "url": "/local-marketing/review-response-management",
    "name": "Review response management",
    "alsoCovers": [],
    "gbpCategory": "Marketing agency",
    "primaryKeyword": "review response management",
    "title": "Review Response Management Denton, TX | Every Review",
    "h1": "Review responses that win over the next customer",
    "meta": "Replies to your reviews, good and bad, that show future customers how you handle people and keep your Google Business Profile active every month.",
    "nearestSibling": "/local-marketing/review-generation-strategy",
    "role": "service",
    "hub": "/local-marketing",
    "gbpDescription": "Replies to your reviews, good and bad, that show future customers how you handle people and keep the profile active.",
    "covers": [
      "Review response management"
    ],
    "status": "draft",
    "slug": "local-marketing/review-response-management"
  },
  {
    "url": "/local-marketing/bing-places-listing-setup",
    "name": "Bing Places listing setup",
    "alsoCovers": [],
    "gbpCategory": "Marketing agency",
    "primaryKeyword": "bing places listing setup",
    "title": "Bing Places Listing Setup Denton, TX | Bing & Copilot",
    "h1": "Bing Places listing setup for Denton businesses",
    "meta": "Claim and verify your listing on Bing Places so you show up in Bing search and maps, on Windows devices, and in the AI assistants that pull from Bing.",
    "nearestSibling": "/local-marketing/apple-maps-listing-setup",
    "role": "service",
    "hub": "/local-marketing",
    "gbpDescription": "Claim and verify your listing on Bing Places so you show up in Bing search and maps, including on Windows devices and in the AI assistants that pull local results from Bing.",
    "covers": [
      "Bing Places listing setup"
    ],
    "status": "draft",
    "slug": "local-marketing/bing-places-listing-setup"
  },
  {
    "url": "/local-marketing/apple-maps-listing-setup",
    "name": "Apple Maps listing setup",
    "alsoCovers": [],
    "gbpCategory": "Marketing agency",
    "primaryKeyword": "apple maps listing setup",
    "title": "Apple Maps Listing Setup Denton, TX | Siri & iPhone",
    "h1": "Apple Maps listing setup via Apple Business Connect",
    "meta": "Set up and verify your business on Apple Business Connect so iPhone users find you in Apple Maps, Siri, and Spotlight with the right hours and photos.",
    "nearestSibling": "/local-marketing/bing-places-listing-setup",
    "role": "service",
    "hub": "/local-marketing",
    "gbpDescription": "Set up and verify your business on Apple Business Connect so iPhone users find you in Apple Maps, Siri, and Spotlight, with the right hours, photos, and contact details.",
    "covers": [
      "Apple Maps listing setup"
    ],
    "status": "draft",
    "slug": "local-marketing/apple-maps-listing-setup"
  },
  {
    "url": "/consulting",
    "name": null,
    "alsoCovers": [],
    "gbpCategory": "Marketing consultant",
    "primaryKeyword": "marketing consultant denton tx",
    "title": "Marketing Consultant Denton, TX | 940Digital",
    "h1": "Marketing consulting for Denton and DFW owners",
    "meta": "One-on-one marketing and SEO consulting for owner-operated businesses in Denton and DFW. Straight answers and a plan you can act on yourself.",
    "nearestSibling": "/consulting/seo-consulting",
    "role": "hub",
    "hub": null,
    "gbpDescription": null,
    "covers": [],
    "status": "published",
    "slug": "consulting"
  },
  {
    "url": "/consulting/seo-consulting",
    "name": "SEO consulting",
    "alsoCovers": [],
    "gbpCategory": "Marketing consultant",
    "primaryKeyword": "seo consulting denton tx",
    "title": "SEO Consulting Denton, TX | Straight Answers",
    "h1": "SEO consulting from the person doing the work",
    "meta": "One-on-one advice from the person doing the work. Straight answers about your rankings, your site, and your Google profile, plus a plan you can act on.",
    "nearestSibling": "/consulting/marketing-strategy",
    "role": "service",
    "hub": "/consulting",
    "gbpDescription": "One-on-one advice from the person doing the work. Straight answers about your rankings, your site, and your Google profile, plus a plan you can act on.",
    "covers": [
      "SEO consulting"
    ],
    "status": "draft",
    "slug": "consulting/seo-consulting"
  },
  {
    "url": "/consulting/marketing-strategy",
    "name": "Marketing strategy",
    "alsoCovers": [],
    "gbpCategory": "Marketing consultant",
    "primaryKeyword": "marketing strategy consultant denton tx",
    "title": "Marketing Strategy Denton, TX | Where to Spend",
    "h1": "Marketing strategy for owner-operated businesses",
    "meta": "Help deciding where to put your marketing time and money, based on what actually brings in customers for owner-operated local businesses in Denton and DFW.",
    "nearestSibling": "/consulting/seo-consulting",
    "role": "service",
    "hub": "/consulting",
    "gbpDescription": "Help deciding where to put your marketing time and money, based on what brings in customers for owner-operated local businesses.",
    "covers": [
      "Marketing strategy"
    ],
    "status": "draft",
    "slug": "consulting/marketing-strategy"
  },
  {
    "url": "/consulting/website-strategy-session",
    "name": "Website strategy session",
    "alsoCovers": [],
    "gbpCategory": "Marketing consultant",
    "primaryKeyword": "website strategy session",
    "title": "Website Strategy Session Denton, TX | Plan First",
    "h1": "A website strategy session before you build",
    "meta": "A working session to plan your pages, services, and site structure before you build or rebuild, so the site serves customers and search engines both.",
    "nearestSibling": "/consulting/marketing-strategy",
    "role": "service",
    "hub": "/consulting",
    "gbpDescription": "A working session to plan your pages, services, and site structure before you build or rebuild, so it serves customers and search engines both.",
    "covers": [
      "Website strategy session"
    ],
    "status": "draft",
    "slug": "consulting/website-strategy-session"
  },
  {
    "url": "/consulting/google-business-profile-training",
    "name": "Google Business Profile training",
    "alsoCovers": [],
    "gbpCategory": "Marketing consultant",
    "primaryKeyword": "google business profile training",
    "title": "Google Business Profile Training Denton, TX",
    "h1": "Google Business Profile training: run it yourself",
    "meta": "Learn to run your own Google Business Profile: posting, replying to reviews, adding services and photos, and avoiding the changes that trigger suspensions.",
    "nearestSibling": "/local-marketing/google-business-profile-management",
    "role": "service",
    "hub": "/consulting",
    "gbpDescription": "Learn to run your own profile: posting, replying to reviews, adding services and photos, and avoiding the changes that trigger suspensions.",
    "covers": [
      "Google Business Profile training"
    ],
    "status": "draft",
    "slug": "consulting/google-business-profile-training"
  },
  {
    "url": "/consulting/seo-training",
    "name": "SEO training for business owners",
    "alsoCovers": [],
    "gbpCategory": "Marketing consultant",
    "primaryKeyword": "seo training for business owners",
    "title": "SEO Training for Business Owners Denton, TX",
    "h1": "SEO training for business owners and their staff",
    "meta": "Practical training for owners or staff who want to handle basic SEO in-house, from writing service pages to tracking what actually moved the needle.",
    "nearestSibling": "/consulting/seo-consulting",
    "role": "service",
    "hub": "/consulting",
    "gbpDescription": "Practical training for owners or staff who want to handle basic SEO in-house, from writing service pages to tracking what moved.",
    "covers": [
      "SEO training for business owners"
    ],
    "status": "draft",
    "slug": "consulting/seo-training"
  },
  {
    "url": "/consulting/photo-and-video-strategy",
    "name": "Photo and video strategy",
    "alsoCovers": [],
    "gbpCategory": "Marketing consultant",
    "primaryKeyword": "photo and video strategy for business",
    "title": "Photo and Video Strategy Denton, TX | What to Shoot",
    "h1": "Photo and video strategy for your profile and site",
    "meta": "What to photograph and film for your profile and website so customers see real work and real people, shot at the angle your business looks best from.",
    "nearestSibling": "/local-marketing/google-business-profile-management",
    "role": "service",
    "hub": "/consulting",
    "gbpDescription": "What to photograph and film for your profile and website so customers see real work and real people at the angle your business shines best.",
    "covers": [
      "Photo and video strategy"
    ],
    "status": "draft",
    "slug": "consulting/photo-and-video-strategy"
  }
];

/* ---------- derived helpers. Everything else reads through these. ---------- */

export const published = () => PAGES.filter(p => p.status === 'published');
export const drafts = () => PAGES.filter(p => p.status === 'draft');
export const byUrl = (url) => PAGES.find(p => p.url === url) || null;
export const isPublished = (url) => (byUrl(url)?.status === 'published');

/** Every page in a category, in map order, hub first. */
export const inCategory = (cat) =>
  PAGES.filter(p => p.gbpCategory === cat && p.role !== 'directory');

/** Service pages under a hub, excluding the hub itself. */
export const childrenOf = (hubUrl) =>
  PAGES.filter(p => p.role === 'service' && p.hub === hubUrl);

/** All 45 GBP service names with the page that carries each one. */
export const serviceIndex = () =>
  PAGES.flatMap(p => p.covers.map(name => ({
    name,
    gbpCategory: SERVICE_CATEGORY[name],
    url: p.url,
    published: p.status === 'published',
    gbpDescription: p.name === name ? p.gbpDescription : null,
  })));

/** The 45 service names grouped by their profile category, in profile order. */
export const servicesByCategory = (cat) =>
  serviceIndex().filter(s => s.gbpCategory === cat);

/** Href to use when linking to a page as a service. Display only. */
export const linkTo = (urlOrPage) => {
  const p = typeof urlOrPage === 'string' ? byUrl(urlOrPage) : urlOrPage;
  if (!p) return typeof urlOrPage === 'string' ? urlOrPage : '#';
  return p.url + (p.serviceAnchor || '');
};
