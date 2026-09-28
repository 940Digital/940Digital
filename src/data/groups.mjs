/**
 * Sub-groups within each hub, by the job the buyer is trying to do.
 *
 * These exist for two reasons, and the second one matters as much as the first.
 *
 * 1. Navigation. A flat list of 17 services is not scannable. "Troubleshooting"
 *    and "Reporting" tell someone where to look at a glance.
 *
 *    Labels are short noun phrases. They are navigation rather than prose, and
 *    a label written as a sentence ("Finding out what is wrong") reads as
 *    padding next to the service names underneath it. scripts/check-seo.mjs
 *    enforces a length limit so this does not creep back.
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
    ['New builds', ['/services/website-design','/services/ecommerce-website-design','/services/landing-page-design','/services/service-area-page-design']],
    ['Rebuilds and moves', ['/services/website-redesign','/services/website-migration']],
    ['Conversion', ['/services/conversion-rate-optimization','/services/ux-ui-design']],
    ['Copy and booking', ['/services/website-copywriting','/services/online-booking-setup']],
    ['Upkeep', ['/services/website-speed-optimization','/services/website-maintenance']],
  ],
  '/seo': [
    ['AI search', ['/seo/ai-overview-optimization','/seo/ai-citation-building','/seo/ai-search-visibility-audit','/seo/answer-ready-content-writing']],
    ['Troubleshooting', ['/seo/seo-audit','/seo/competitor-analysis']],
    ['On-site fixes', ['/seo/technical-seo','/seo/on-page-seo','/seo/schema-markup']],
    ['Content', ['/seo/seo-content-writing','/seo/blog-writing']],
    ['Links and listings', ['/seo/link-building','/seo/citation-building','/seo/local-listings-cleanup']],
    ['Reporting', ['/seo/rank-tracking','/seo/google-search-console-setup','/seo/website-analytics-setup']],
  ],
  '/local-marketing': [
    ['Google Business Profile', ['/local-marketing/google-business-profile-setup','/local-marketing/google-business-profile-optimization','/local-marketing/google-business-profile-management']],
    ['Reviews', ['/local-marketing/review-generation-strategy','/local-marketing/review-response-management']],
    ['Bing and Apple Maps', ['/local-marketing/bing-places-listing-setup','/local-marketing/apple-maps-listing-setup']],
  ],
  '/consulting': [
    ['Advice', ['/consulting/seo-consulting','/consulting/marketing-strategy']],
    ['Planning', ['/consulting/website-strategy-session','/consulting/photo-and-video-strategy']],
    ['Training', ['/consulting/google-business-profile-training','/consulting/seo-training']],
  ],
};
