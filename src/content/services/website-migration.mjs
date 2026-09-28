export default {
  lead: [
    'Moving your site to a new platform or host without breaking pages or losing search traffic, for businesses in Denton and DFW.',
    'A migration is the same site at a new address. That sounds simpler than a rebuild and in one sense it is, but it carries a specific risk: everything Google knows about your site is tied to URLs, and moving is exactly when URLs change.',
    'Done properly a visitor should not be able to tell it happened.',
  ],
  includedTitle: 'What moving involves',
  included: [
    { h: 'A full inventory first', p: 'Every URL on the current site written down before anything moves, along with which ones matter. Nothing else in the process works without this.' },
    { h: 'Redirect mapping', p: 'Old URL to new URL, one by one, using permanent redirects. The shortcut of pointing everything at the homepage is the single most common way a migration loses traffic.' },
    { h: 'Everything else that points at you', p: 'Email, DNS, certificates, and anything hard-wired to the old host. A move that takes the site across and leaves the email broken is not a finished job.' },
    { h: 'A verification pass afterwards', p: 'Redirects tested, indexing watched, and search traffic monitored for the weeks where a problem would actually surface.' },
  ],
  steps: [
    { h: 'Inventory and plan', p: 'Map what exists, decide where each URL lands, and agree what is being dropped deliberately rather than by accident.' },
    { h: 'Move and test', p: 'Stand the site up at the new host and check it fully before anything public points at it.' },
    { h: 'Cut over', p: 'Switch DNS once the new copy is verified. Done this way the visible downtime is usually nil; what varies is how long DNS takes to propagate everywhere.' },
    { h: 'Watch', p: 'The window where a migration fails is the fortnight afterwards, not the day of. That is when indexing and traffic get checked.' },
  ],
  differs: [
    'A migration changes where the site lives while everything visible stays the same. A <a href="/services/website-redesign">website redesign</a> changes what the site is. The two get confused constantly, and doing both at once is how businesses lose rankings without being able to identify the cause.',
    'If you want both, they are better done in sequence than together, precisely so that a problem can be traced to one or the other.',
  ],
  limit: 'If you are moving because the current site is bad, moving it will not fix that. You would be paying to relocate the problem. In that case a redesign is the honest recommendation.',
  cost: 'quote',
  costNote: 'Quoted after looking at the current setup. What moves the number is how many URLs exist and how much the current host has locked in.',
  faqs: [
    { q: 'Will the site go down?', a: 'The plan is that it does not. The new copy is built and verified before anything public points at it, so the switch is a DNS change rather than a period of nothing. DNS propagation can take up to a couple of days globally, during which visitors reach one copy or the other rather than an error.' },
    { q: 'Will I lose search rankings?', a: 'Not if redirects are mapped properly. Expect some fluctuation for a few weeks while Google recrawls and processes the redirects; expect real loss only if URLs change without redirects, which is what the process prevents.' },
    { q: 'Can you move my email too?', a: 'Email usually lives with DNS, so it has to be part of the plan whether or not it is part of the reason for moving. Raise it on the consult, because it is the thing most often forgotten until it breaks.' },
    { q: 'Is there a platform you will not move a site to?', a: 'I will tell you honestly if I think the destination is a bad idea or if I am not the right person to run it. Better before than halfway through.' },
  ],
  cta: 'Move without losing anything',
};
