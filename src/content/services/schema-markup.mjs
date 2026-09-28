export default {
  lead: [
    'Structured data that tells search engines your business type, services and service area in a format they read without guessing, for businesses in Denton and DFW.',
    'Schema is a block of machine-readable description added to a page. A human sees nothing. A search engine stops inferring what your business is from your prose and gets told directly.',
    'It is not a ranking factor in itself. It is about being understood correctly, which matters more now that AI systems are summarising businesses rather than just listing them.',
  ],
  includedTitle: 'What gets marked up',
  included: [
    { h: 'The business itself', p: 'Type, name, phone, service area and founder, described once and referenced from every page so the site describes one consistent entity rather than repeating slightly different versions.' },
    { h: 'Your services', p: 'Each service named in a structured catalogue, matching what your Google Business Profile says. Where the two disagree, you are asking search engines to pick.' },
    { h: 'Service area', p: 'Stated explicitly, which matters for a business with no public storefront. Otherwise the only location signal is wherever your address appears to be.' },
    { h: 'Breadcrumbs', p: 'So search engines understand where a page sits in the site rather than treating every page as equally central.' },
  ],
  extra: {
    title: 'What I will not mark up',
    paras: [
      'No review or rating markup for your own business on your own site. Google ignores self-serving review markup on a local business and it can attract a manual penalty. Reviews belong on your Google profile where they are verifiable.',
      'No FAQ markup either. Google stopped showing FAQ rich results in May 2026, so it now earns nothing and is one more block to keep in sync with the visible page.',
      'And nothing describing content that is not visible on the page. Marking up something a visitor cannot see is against the guidelines regardless of whether it is technically accurate.',
    ],
  },
  differs: [
    'Schema is one specific deliverable: a machine-readable description added to the page. <a href="/seo/technical-seo">Technical SEO</a> is the broader set of crawl and index fixes that determine whether the page is read at all.',
    'It also supports <a href="/seo/ai-overview-optimization">AI Overview optimization</a>, because systems summarising your business benefit from being told what it is rather than inferring it.',
  ],
  limit: 'On a site I built this is already in place and there is nothing to sell you. This exists for sites built elsewhere, and for sites where a plugin added schema that is wrong or contradicts the page.',
  cost: 'quote',
  faqs: [
    { q: 'Will this get me stars in search results?', a: 'Not for your own business reviews, no. That is the thing most people want from schema and it is the thing that does not work this way. What it does is make your business correctly understood, which matters increasingly for AI answers.' },
    { q: 'My plugin already adds schema. Is that enough?', a: 'Sometimes, and it is worth checking. Automatically generated schema is often generic, occasionally contradicts the visible page, and sometimes describes a business type that is not yours.' },
    { q: 'How do you know it is right?', a: 'It gets validated against the Schema.org validator and Google\'s Rich Results Test before it is called done. Invalid schema is usually ignored rather than penalised, which means broken markup can sit there for years achieving nothing.' },
    { q: 'Does it need updating?', a: 'When your services, phone number or service area change. On a site I maintain it is generated from one source, so it cannot drift out of step with the rest of the site.' },
  ],
  cta: 'Be understood correctly',
};
