/**
 * Written descriptions of the four Google Business Profile categories, for the
 * /services directory.
 *
 * The directory sells the four categories and then lists the service names
 * under each. Per-service descriptions live on the category's own hub page,
 * where someone has already chosen a direction and wants the detail. Repeating
 * all 43 descriptions here made the page a wall of undifferentiated text.
 *
 * No invented facts. Everything below is either already claimed elsewhere on
 * the site (the free consult, the working demo, hosting included in every plan)
 * or is a description of what the category covers.
 */

/** @typedef {{lead: string, body: string[]}} CategoryCopy */

/** @type {Record<string, CategoryCopy>} */
export const CATEGORY_COPY = {
  'Website designer': {
    lead: 'The primary category on my profile, and where most projects start.',
    body: [
      'I build custom websites for small businesses in Denton, Denton County, and the wider Dallas-Fort Worth metroplex. No templates, no page builders, and nothing stretched to fit a layout that was designed around a different business.',
      'This group covers building a site from nothing, replacing one you already have without losing the rankings that come with it, moving one between hosts or platforms, and the smaller jobs that make an existing site do more work: speed, layout, copy, bookings.',
      'Hosting and website maintenance are included in every plan, so none of this arrives with a separate IT bill. Every project starts with a working demo you can click through before you commit to anything.',
    ],
  },
  'Internet marketing service': {
    lead: 'Getting found, in all three places people now search.',
    body: [
      'Google results, Google Maps, and the AI assistants that increasingly answer a question before anyone clicks anything. This group covers the whole search side of the work for businesses in Denton and DFW.',
      'That means finding out what is holding a site back, fixing what stops Google reading it properly, writing content that earns its rankings, building the links and listings that make a business credible, and reporting plainly on what actually moved.',
      'The AI search group inside this category is a main service line rather than an add-on. It is the part of search changing fastest, and it is the part most local businesses have no plan for.',
    ],
  },
  'Marketing agency': {
    lead: 'The profiles people read before they ever reach your website.',
    body: [
      'Most customers decide whether to call you while looking at your Google listing. Your hours, your photos, your reviews, and whether any of it looks like it was updated this decade. That is the part of your marketing doing the most work and getting the least attention.',
      'This group keeps those profiles accurate and active. Google Business Profile first, since it carries the most weight, then Bing Places and Apple Maps for the people who never open Google at all.',
      'The work is unglamorous and it compounds. Correct categories, real photos, a reply under every review, and the same name and phone number everywhere so nothing contradicts anything else.',
    ],
  },
  'Marketing consultant': {
    lead: 'For owners who would rather understand this than hand it over.',
    body: [
      'Everything in this group sells my time instead of my execution. You get straight answers about your own situation and a plan you or your staff can act on, from the person who does the work rather than an account manager relaying it.',
      'Some of it is advice on a decision you are stuck on. Some of it is planning a site or a shoot before anyone builds anything. Some of it is teaching you to run your own Google profile so you stop paying someone else to post photos.',
      'Every conversation still starts with a free consult. If a short call answers your question, that is the end of it and you owe nothing.',
    ],
  },
};
