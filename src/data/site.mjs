/**
 * Site-wide facts. Single source of truth for the business entity, nav, and
 * footer. Every page's schema and chrome is generated from this file, so the
 * ProfessionalService block can no longer drift between pages the way the
 * hand-copied version did.
 *
 * TODO(owen) markers here are site-wide: they are answered in
 * docs/service-page-questions.md section 1. They do not gate any page's
 * publication (the guard only blocks on TODOs in page content), but the
 * schema property is omitted entirely rather than emitted empty.
 */

/** @typedef {{label: string, href: string, cta?: boolean, children?: NavItem[]}} NavItem */

export const SITE = {
  name: '940Digital',
  origin: 'https://www.940digital.com',
  slogan: 'Visibility, Credibility, Growth',
  description:
    '940Digital builds websites, SEO, and AI search visibility for small businesses in the Dallas-Fort Worth metroplex and Denton, Texas.',
  email: '940digital@gmail.com',

  /* Matches the Google Business Profile character for character. Owen approved
     showing it on the site 2026-09-27, so it now appears in the footer and on
     /contact as well as in schema. */
  phone: '+1-940-977-6253',
  phoneDisplay: '(940) 977-6253',

  priceRange: '$200-$800',

  /* Service-area business. No street address is published anywhere. */
  address: {
    locality: 'Denton',
    region: 'TX',
    postalCode: null, // TODO(owen): Denton postal code for PostalAddress
    country: 'US',
  },

  areaServed: [
    { type: 'City', name: 'Denton, Texas' },
    { type: 'AdministrativeArea', name: 'Denton County, Texas' },
    { type: 'AdministrativeArea', name: 'Dallas-Fort Worth Metroplex, Texas' },
  ],

  founder: {
    name: 'Owen Leiter',
    jobTitle: 'Founder',
    linkedIn: null, // TODO(owen): LinkedIn profile URL
  },

  /* GBP Maps share link plus any social profiles. The Maps URL matters most:
     it is the explicit link between this site's entity and the profile. */
  sameAs: {
    googleMaps: null, // TODO(owen): Google Business Profile Maps share URL
    others: [], // TODO(owen): other social profiles, or confirm there are none
  },

  hours: null, // TODO(owen): hours exactly as the GBP lists them, or confirm none

  analyticsTrackerName: null, // TODO(owen): public name of the analytics tool, if you want it named

  /* Tracker, unchanged from the existing pages. */
  trackerSrc: 'https://www.940digital.com/tracker.js',
  trackerSiteId: '496da1ce-3717-434d-865b-c61ef8f15c4e',

  fonts:
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap',
};

/** @type {NavItem[]} */
export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Website design', href: '/services/website-design' },
      { label: 'SEO & AI search', href: '/seo' },
      { label: 'Local marketing', href: '/local-marketing' },
      { label: 'Consulting', href: '/consulting' },
      { label: 'All services', href: '/services' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Portfolio', href: '/work' },
  { label: 'Get a quote', href: '/contact', cta: true },
];

export const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Website design', href: '/services/website-design' },
  { label: 'SEO & AI search', href: '/seo' },
  { label: 'Local marketing', href: '/local-marketing' },
  { label: 'Consulting', href: '/consulting' },
  { label: 'All services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICE_AREA_LINE =
  'Currently serving the Dallas-Fort Worth metroplex (DFW), Denton, and surrounding areas';

/**
 * Real, live client work. Only these four may be cited as proof, and only on
 * pages where the work genuinely demonstrates the service. Owen approved all
 * four for use on service pages 2026-09-27 (previously /work only).
 * No results or metrics are recorded here because none have been verified:
 * see question 14 in docs/service-page-questions.md.
 */
export const CLIENTS = {
  jcLandscaping: {
    name: 'JC Landscaping',
    url: 'https://www.jcarpenterlandscaping.com/',
    location: 'Denton County, TX',
    trade: 'Landscaping and hardscaping',
    note: 'In business since 1989. Full site with a services overview, a project gallery, and a free-estimate form.',
    demonstrates: ['/', '/services/website-copywriting', '/services/service-area-page-design'],
  },
  gunnarGalvan: {
    name: 'Gunnar Galvan Mobile Detailing',
    url: 'https://www.gunnargalvanmobiledetailing.com/',
    location: 'Frisco, TX',
    trade: 'Mobile car detailing',
    note: 'Package-based pricing, clear service breakdowns, and a booking flow.',
    demonstrates: ['/', '/services/online-booking-setup', '/services/landing-page-design'],
  },
  gloryUnveiled: {
    name: 'Glory Unveiled by Bailey Elaine',
    url: 'https://gloryunveiledevents.com',
    location: 'Dallas, TX',
    trade: 'Wedding planning and coordination',
    note: 'Service packages, a photo gallery, and an inquiry form built to book calls.',
    demonstrates: ['/', '/services/website-copywriting', '/services/landing-page-design'],
  },
  lilylynne: {
    name: 'Lilylynne Photography',
    url: 'https://lilylynnephotography.com/',
    location: 'Denton, TX',
    trade: 'Family and portrait photography',
    note: 'Full gallery and an inquiry flow built to book sessions.',
    demonstrates: ['/', '/consulting/photo-and-video-strategy'],
  },
};
