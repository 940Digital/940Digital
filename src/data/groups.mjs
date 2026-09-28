/**
 * Sub-groups within each hub, by the job the buyer is trying to do.
 *
 * These exist for two reasons, and the second one matters as much as the first.
 *
 * 1. Navigation. A flat list of 17 services is not scannable. "Fixing your
 *    site" and "Knowing if it worked" tell someone where to look.
 *
 * 2. Layout. Services render as ROWS inside a group, not as cards in a
 *    responsive grid. A grid of 7 items strands a lone item on the last row at
 *    some breakpoint, which reads as sloppy. Rows cannot strand at any width.
 *
 * scripts/check-seo.mjs fails the build if any service is missing from a group,
 * listed twice, or listed under the wrong hub.
 */
export const GROUPS = {
  '/': [
    ['New builds', ['/services/ecommerce-website-design','/services/landing-page-design','/services/service-area-page-design']],
    ['Replacing what you have', ['/services/website-redesign','/services/website-migration']],
    ['Getting more from the traffic you have', ['/services/conversion-rate-optimization','/services/ux-ui-design']],
    ['Words and bookings', ['/services/website-copywriting','/services/online-booking-setup']],
    ['Keeping it fast and current', ['/services/website-speed-optimization','/services/website-maintenance']],
  ],
  '/seo': [
    ['AI search', ['/seo/ai-overview-optimization','/seo/ai-citation-building','/seo/ai-search-visibility-audit','/seo/answer-ready-content-writing']],
    ['Finding out what is wrong', ['/seo/seo-audit','/seo/competitor-analysis']],
    ['Fixing your site', ['/seo/technical-seo','/seo/on-page-seo','/seo/schema-markup']],
    ['Writing', ['/seo/seo-content-writing','/seo/blog-writing']],
    ['Off your site', ['/seo/link-building','/seo/citation-building','/seo/local-listings-cleanup']],
    ['Knowing if it worked', ['/seo/rank-tracking','/seo/google-search-console-setup','/seo/website-analytics-setup']],
  ],
  '/local-marketing': [
    ['Your Google Business Profile', ['/local-marketing/google-business-profile-setup','/local-marketing/google-business-profile-optimization','/local-marketing/google-business-profile-management']],
    ['Your reviews', ['/local-marketing/review-generation-strategy','/local-marketing/review-response-management']],
    ['The other maps', ['/local-marketing/bing-places-listing-setup','/local-marketing/apple-maps-listing-setup']],
  ],
  '/consulting': [
    ['Advice on your situation', ['/consulting/seo-consulting','/consulting/marketing-strategy']],
    ['Planning sessions', ['/consulting/website-strategy-session','/consulting/photo-and-video-strategy']],
    ['Learning to run it yourself', ['/consulting/google-business-profile-training','/consulting/seo-training']],
  ],
};
