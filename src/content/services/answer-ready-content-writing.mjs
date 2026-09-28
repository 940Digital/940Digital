export default {
  lead: [
    'Content written and formatted so search engines and AI assistants can pull it out and quote it, for businesses in Denton and DFW.',
    'When a system answers a question by quoting a source, it lifts a passage. If your best explanation is spread across four paragraphs with the point at the end, there is nothing to lift.',
    'Answer-ready content is defined by its shape: the answer first, the detail after, specifics throughout.',
  ],
  includedTitle: 'The rules this follows',
  included: [
    { h: 'The answer in the first two sentences', p: 'A passage that makes sense on its own, without needing the heading or the paragraph before it. That is the unit these systems extract, so it has to survive being removed from its context.' },
    { h: 'One question per section', p: 'A heading that states a real question and a section that answers only that. Sections covering three things at once do not get quoted for any of them.' },
    { h: 'Specifics over hedging', p: 'Numbers, ranges, materials, timescales, conditions. "It depends" is often true and it is never quotable. Where it genuinely depends, the page says what it depends on.' },
    { h: 'Plain structure', p: 'Real headings in order, short paragraphs, proper lists. Layout that looks like structure but is not, which is common in page builders, reads as one undifferentiated block to a machine.' },
    { h: 'In the page source', p: 'Text present in the served HTML rather than inserted by a script afterwards. Most AI crawlers do not run JavaScript, so content that appears only after scripts run is invisible to them.' },
  ],
  extra: {
    title: 'Is this just writing well?',
    paras: [
      'Largely, yes, and that is worth being honest about rather than dressing it up. Answering the question first, being specific and structuring a page properly were good practice long before anything extracted passages automatically.',
      'What has changed is the cost of not doing it. Content that buries its point used to be merely annoying; now it is skipped entirely by the systems deciding who gets quoted.',
      'So if you would rather think of this as writing your service pages properly and not buy it as a separate thing, I will not argue. It is available separately because some businesses have a site full of content that needs restructuring rather than replacing.',
    ],
  },
  differs: [
    'This is defined by format: content shaped so it can be extracted. <a href="/seo/seo-content-writing">SEO content writing</a> is defined by target search. The same page often wants both, and they are different briefs.',
    '<a href="/seo/ai-overview-optimization">AI Overview optimization</a> is the wider service including the technical and off-site work. This is specifically the writing deliverable inside it.',
  ],
  cost: 'quote',
  costNote: 'Priced per page. Restructuring existing content is usually cheaper than writing new, and I will tell you which you need after looking.',
  faqs: [
    { q: 'Can you restructure what I already have?', a: 'Often that is exactly the right job. A lot of sites have decent information arranged in an order nothing can extract from. Reordering is cheaper than rewriting.' },
    { q: 'Does this hurt readability for people?', a: 'The opposite, generally. Answering the question first is better for a human skimming on a phone too. If a formatting rule ever made a page worse to read, the rule loses.' },
    { q: 'How is this different from an FAQ section?', a: 'An FAQ is one format this can take. The approach applies to the whole page rather than a block at the bottom, and a page consisting only of questions is usually avoiding writing the explanation.' },
    { q: 'Should I add FAQ schema to it?', a: 'No. Google stopped showing FAQ rich results in May 2026, so the markup earns nothing now. The visible questions are still worth having; the markup is not.' },
  ],
  cta: 'Write something worth quoting',
};
