# Questions I need answered before writing these pages

Date: 2026-09-27

## How to use this

Answer inline, right under each question. Partial answers are fine: any page still holding a `TODO(owen)` ships `noindex`, out of the sitemap, and unlinked, so you can fill gaps later without blocking the rest.

Three dimensions repeat across all 45 pages (have you actually delivered it, how long it takes, what it costs). Asking those 45 times each would be 135 near-identical questions, so they live in one table in section 2. Sections 3 to 6 are the genuinely page-specific questions.

**The single most important thing in this document is column 2 of the table in section 2.** I will not write a page that implies you have delivered a service you have not. Where the answer is "no", the page describes what the work is and what you would do, the proof section becomes a `TODO(owen)`, and nothing on it claims a track record.

---

## 1. Site-wide facts

These fill the `TODO(owen)` placeholders in the business-entity schema and settle two existing-page questions.

1. **Postal code** for Denton that you want in `PostalAddress`. No street address will be published, as you are a service-area business.
2. **Your LinkedIn URL**, for `founder.sameAs`.
3. **Your Google Business Profile Maps URL** (the share link from the profile), for `sameAs`. This one matters more than the others: it is the explicit link between the site entity and the profile.
4. **Any other social profiles** you want in `sameAs`. If there are none, say none and I will omit the property rather than leave it empty.
5. **Your hours exactly as they appear on the GBP.** If the profile is set to "open 24 hours" or has no hours because it is a service-area business, tell me that instead and I will omit `openingHoursSpecification`.
6. **Service area, exactly as the GBP lists it.** The prompt says Denton, Denton County, and the DFW metroplex. If the profile actually lists specific cities, I need that list verbatim, because `areaServed` disagreeing with the profile is worse than a vaguer `areaServed`.
7. **Phone number.** The GBP has `+1-940-977-6253`. It appears nowhere on the website right now. Pick one:
   - (a) Add it visibly to the footer and `/contact`, and put it in schema. This is what I recommend. NAP consistency between profile and landing page is a genuine local ranking factor, and schema should describe visible content.
   - (b) Keep it off the site, and leave it out of schema too.
   - (c) Put it in schema only. I can do this, and I would rather you chose (a) or (b).
8. **`numberOfEmployees: 1`** is currently in your schema on three pages. Keep, or drop? Dropping it is not hiding anything, and "direct line to the person building it" is a stronger frame than a headcount of one. Your call.
9. **`/about`** lists "Hosting & Maintenance" in the founder card's expertise list. Smallest honest fix is "Website Maintenance". Approve, or give me different wording?
10. **Analytics tool name.** The Website analytics setup page will be vendor-neutral and will not mention Google Analytics. Do you want your own tool named on that page, and if so, what is it called publicly?
11. **Email address in schema** is `940digital@gmail.com` while the visible address is injected by JavaScript. Fine to keep as is?
12. **Anything on the GBP that is not in the 45-service list**, or any service in the list that is no longer on the profile. The whole build assumes the list is exactly the profile.

---

## 2. The one table that unblocks the most

Rows for "Local SEO" and "AI search optimization (GEO)" were removed on 2026-09-27 when those services came off the profile. Numbering is left as-is so any answers you have already written still line up.

For each service: **have you delivered it for a paying client?** (`yes` / `no` / `part of a build`), **typical turnaround**, and **what it costs** (a plan name, a dollar figure, or `quote`).

If a whole block is the same answer, write it once at the top of the block and I will apply it down the column.

| # | Service | Delivered? | Turnaround | Cost or plan |
| --- | --- | --- | --- | --- |
| 1 | website design | | | |
| 2 | Website Maintenance | | | |
| 3 | Website redesign | | | |
| 4 | Landing page design | | | |
| 5 | Ecommerce website design | | | |
| 6 | UX/UI design | | | |
| 7 | Website speed optimization | | | |
| 8 | Website copywriting | | | |
| 9 | Website migration | | | |
| 10 | Conversion rate optimization | | | |
| 11 | Service area page design | | | |
| 12 | Online booking setup | | | |
| 13 | Search engine optimization | | | |
| 14 | SEO audit | | | |
| 15 | Technical SEO | | | |
| 16 | On-page SEO | | | |
| 17 | Link building | | | |
| 18 | Citation building | | | |
| 19 | Local listings cleanup | | | |
| 20 | Schema markup | | | |
| 21 | Blog writing | | | |
| 22 | SEO content writing | | | |
| 23 | Rank tracking and geo-grid reports | | | |
| 24 | Competitor analysis | | | |
| 25 | Google Search Console setup | | | |
| 26 | Website analytics setup | | | |
| 27 | AI Overview optimization | | | |
| 28 | AI citation building | | | |
| 29 | AI search visibility audit | | | |
| 30 | Answer-ready content writing | | | |
| 33 | Google Business Profile setup | | | |
| 34 | Google Business Profile optimization | | | |
| 35 | Google Business Profile management | | | |
| 36 | Review generation strategy | | | |
| 37 | Review response management | | | |
| 38 | Bing Places listing setup | | | |
| 39 | Apple Maps listing setup | | | |
| 40 | SEO consulting | | | |
| 41 | Marketing strategy | | | |
| 42 | Website strategy session | | | |
| 43 | Google Business Profile training | | | |
| 44 | SEO training for business owners | | | |
| 45 | Photo and video strategy | | | |

### Proof, one decision

Your brief named two usable clients: JC Landscaping and Gunnar Galvan Mobile Detailing. But `/work` already publicly features four, including Glory Unveiled by Bailey Elaine (Dallas, wedding planning) and Lilylynne Photography (Denton, photography). Both are live, both are yours, and both are already on your own site.

**Q13. Can I use Glory Unveiled and Lilylynne as proof on service pages too?** If yes, that roughly doubles my pool and gets real proof onto the copywriting, booking, gallery, and landing-page pages instead of a `TODO`. If there is a reason to keep them to `/work` only, tell me and I will.

**Q14. Are there any client results you can state as fact?** A ranking that moved, a call volume that changed, a review count that grew, anything you can point at. One verifiable number would do more for these 48 pages than anything else in this document. If there are none yet, say none and every page will argue from method rather than results.

---

## 3. Website designer pages

### `/` homepage, website design
1. Approve the H1 change? Proposed: **"Website design for small businesses in Denton and DFW"**, with the rotating word moving out of the `<h1>` into a visual-only element so the animation is untouched.
2. What is the honest answer to "how long does a website take", from first call to live?
3. What do you need from a client before you can start, concretely? The list of things you ask for.
4. The demo is your strongest differentiator and it is underexplained. When in the process does the demo exist, and how complete is it? Is it the real site or a first pass?
5. Anything you will not build, or a client you are not a fit for? A clear "not for you" line does more for conversion than another benefit.

### Website Maintenance `/services/website-maintenance`
6. What does a maintenance month actually contain when nothing is wrong? Do you check anything on a schedule, or is it reactive until a client asks?
7. Turnaround on a content change request. New hours, new photo, new service: same day, this week, what?
8. What is explicitly not covered, so a client knows where the line is?
9. "Analytics" is in the GBP description for this service. What does a client actually receive, and how often?

### Website redesign `/services/website-redesign`
10. Have you redesigned a site that already had rankings, and did they hold?
11. What is the first thing you do before touching anything, so nothing gets lost?
12. Most common reason a client comes to you for a redesign rather than a new build?
13. What do you do when the old site's content is bad but it is what is ranking?

### Landing page design `/services/landing-page-design`
14. Who has actually bought this, and what was the page for?
15. Do you build these standalone, or only for existing clients? Can someone buy one page and nothing else?
16. Does a landing page get indexed, or is it ads-only traffic? This changes the page's SEO section.

### Ecommerce website design `/services/ecommerce-website-design`
17. Have you built a store? If not, would you take one on, and what platform would you reach for?
18. Payments and checkout: what do you set up, and what does the client handle?
19. Is there a size of catalogue past which this is not for you?

### UX/UI design `/services/ux-ui-design`
20. Is this something a client buys separately, or is it always inside a build? If it is never standalone, the page has to say so plainly.
21. Name one specific layout or navigation decision you have made that you believe got a client more calls, and why.
22. Do you produce anything a client can look at (wireframes, flows), or does it show up as the built demo?

### Website speed optimization `/services/website-speed-optimization`
23. What do you measure, and what do you consider a pass?
24. Most common cause of slowness in the sites you have seen?
25. What can you not fix without moving the site, and how do you handle that conversation?

### Website copywriting `/services/website-copywriting`
26. How do you capture someone's voice? What do you ask them, and is there an interview?
27. Do you write everything, or do you edit what the client sends?
28. JC Landscaping and Gunnar Galvan both have written copy. Whose words are those, yours or theirs? I need this right before I use either as proof here.

### Website migration `/services/website-migration`
29. Have you moved a site? From what, to what? (The FoundIt migration work is a different business and stays out of this. I am asking about 940Digital.)
30. What platforms do you move sites off, and is there one you will not touch?
31. What is the downtime, realistically?

### Conversion rate optimization `/services/conversion-rate-optimization`
32. Do you have enough traffic on any client site to have actually tested a change? If not, this page has to be about informed changes rather than testing, and I need to know that.
33. What is the first thing you look at on a site that gets visitors but no calls?
34. How long before a client should expect to know whether a change worked?

### Service area page design `/services/service-area-page-design`
35. What counts as "real local detail" in your build? Give me the actual things you put on a town page.
36. Have you built these for anyone? Which towns?
37. How do you decide how many town pages a client gets? This matters because the honest answer, "only the towns you really serve", is the page's whole argument.
38. What do you say to a client who asks for 40 town pages?

### Online booking setup `/services/online-booking-setup`
39. What do you connect it to? Which calendar and which booking tool?
40. Gunnar Galvan has a booking flow. Is that the same thing this service describes, or something simpler?
41. Does the client need an account with anything, or a paid subscription?

---

## 4. Internet marketing service pages

### `/seo` hub, Search engine optimization
42. ~~Approve the split with Local SEO?~~ **Settled 2026-09-27.** `/seo` owns the whole SEO query space including the map pack, and Local SEO came off the profile. No answer needed.
43. What does an SEO engagement with you actually look like month to month?
44. Is SEO ever sold on its own, or only alongside a site you built? The plan tiers suggest the latter and the page has to be honest either way.
45. What do you tell someone who asks how long SEO takes?

### SEO audit `/seo/seo-audit`
46. What does the client receive? A document, a call, a spreadsheet, a video?
47. How long does the audit take from payment to delivery?
48. Is it free as part of a consult, or paid? The homepage already promises a free consult, so the line between the two needs to be clear.
49. How many items does a typical audit surface, roughly? A real number makes this page concrete.

### Technical SEO `/seo/technical-seo`
50. What do you use to find technical problems?
51. Most common technical issue on the small business sites you have looked at?
52. Do you fix them, or report them for someone else to fix?

### On-page SEO `/seo/on-page-seo`
53. What is your process for one page, start to finish?
54. Do you work through a whole site, or a set number of priority pages?

### Link building `/seo/link-building`
55. Have you built a link for a client? How?
56. Which Denton and DFW opportunities do you actually go after? Chamber, sponsorships, local news, supplier pages: name the real ones.
57. How many links is a realistic month, and do you promise a number? I would rather promise nothing than a count.

### Citation building `/seo/citation-building`
58. Which directories do you submit to? The named list is what makes this page credible.
59. Do you use a service or aggregator, or is it manual?
60. Is this a one-time job or recurring?

### Local listings cleanup `/seo/local-listings-cleanup`
61. Have you cleaned up a listing mess? What was wrong?
62. How do you find the bad listings?
63. What can you not fix, for example a duplicate you do not control?

### Schema markup `/seo/schema-markup`
64. Which schema types do you implement for a typical local business?
65. Do you validate, and with what?
66. Is schema included in every build, or an add-on? If it is standard, this page should say so rather than sell it twice.

### Blog writing `/seo/blog-writing`
67. Have you written posts for a client? Your own blog is a "coming soon" page, which someone may notice, so I need to know what to lean on.
68. How do you pick topics?
69. How many posts a month, and is it a retainer?
70. Who is credited as the author, you or the client?

### SEO content writing `/seo/seo-content-writing`
71. How is this priced? Per page, per project, inside a plan?
72. How do you get the real detail out of a client that keeps this from being filler?
73. Where does AI sit in your writing process? You should have a position on this on the page, given what you sell. I will write whatever you tell me and I will not dodge it.

### Rank tracking and geo-grid reports `/seo/rank-tracking`
74. What tool produces the geo-grid? This page is hard to make credible without naming it.
75. What does the monthly report look like, and how does a client receive it?
76. How many keywords and how big a grid?
77. Is this only in the Pro plan's "Analytics & monthly reporting", or can it be bought alone?

### Competitor analysis `/seo/competitor-analysis`
78. What do you compare? The actual checklist.
79. Deliverable and turnaround?
80. How many competitors in one engagement?

### Google Search Console setup `/seo/google-search-console-setup`
81. Is this included in every build? If yes, say so on the page.
82. What do you show the client after it is connected, and do you keep watching it?
83. How long does the setup take? If it is an hour, the page should be short and say so.

### Website analytics setup `/seo/website-analytics-setup`
84. Name the tool publicly, or keep it unnamed? (Same as Q10.)
85. What does a client see, and where do they see it?
86. Does the client get a login, or do they only get your report?
87. Is privacy or cookie-consent a selling point here? If your tracker does not use cookies or collect personal data, that is a real differentiator worth stating, and I need you to confirm it is true before I write it.

### AI Overview optimization `/seo/ai-overview-optimization`
88. ~~Approve this page owning the GEO and AEO explainer?~~ **Settled 2026-09-27.** It is the only AI search optimization page now, and AI search optimization (GEO) came off the profile. No answer needed.
89. What do you actually do that is different from ordinary SEO? Be concrete. This page will be the most scrutinised on the site and generic AI-era language will sink it.
90. Have you got a client cited in an AI Overview or named by ChatGPT? If yes, that is the most valuable proof you own right now.
91. How do you check whether it worked?

### AI citation building `/seo/ai-citation-building`
92. Which sources do you target, specifically? Naming them is the whole page.
93. How is this different in practice from your ordinary citation work? If the overlap is large, say so, because a reader comparing the two pages will notice.

### AI search visibility audit `/seo/ai-search-visibility-audit`
94. Which AI tools do you check, and how? Do you run a set of prompts?
95. What does the client receive?
96. Is it free as a lead-in, or paid?
97. Can you show me one real before-and-after, even for your own business?

### Answer-ready content writing `/seo/answer-ready-content-writing`
98. What does "answer-ready" mean as a rule you follow? The specific formatting rules.
99. Is this a separate service or how you write everything now? If it is the latter, this page needs to justify existing as its own service, and I would rather know now.

---

## 5. Marketing agency pages

### `/local-marketing` hub
100. This hub has no service of its own and has to hold "local marketing agency Denton" on positioning. What is the 100-word version of why someone hires you for local marketing rather than a Dallas agency?
101. Do you want to be found as an "agency" at all? You are one person, and my read of your positioning is that "direct line to the person building it" beats agency framing. The hub can target the query while the copy makes the one-person thing an advantage. Confirm that is the tone you want.

### Google Business Profile setup `/local-marketing/google-business-profile-setup`
109. How many profiles have you set up from scratch?
110. How long does verification take now, and what forms does it take? Video verification changes what a client should expect.
111. What do you need from the client to start?
112. Most common mistake you see in a self-set-up profile?

### Google Business Profile optimization `/local-marketing/google-business-profile-optimization`
113. What is on your optimization checklist for an existing profile?
114. Which changes carry suspension risk, and how do you handle them? This is the content that separates this page from the setup page, so I want the real answer.
115. One-time fee, or inside a plan?

### Google Business Profile management `/local-marketing/google-business-profile-management`
116. What happens in a managed month? Posts, photos, replies: how many, how often?
117. This is in the Plus plan as "Google Business Profile setup & management". Can it be bought without a website plan?
118. Have you caught a bad third-party edit or a suspension on a client profile?

### Review generation strategy `/local-marketing/review-generation-strategy`
119. What does the client actually receive? Templates, a QR code, a link, a written process?
120. What is the right moment to ask, in your view, and why?
121. Has a client's review count grown under your system? By how much, over how long?
122. Where is the policy line you will not cross? Google's rules on incentives and review gating are specific and naming them builds trust.

### Review response management `/local-marketing/review-response-management`
123. Do you write replies and send them for approval, or post directly?
124. How do you handle a review that is unfair or a customer you never served?
125. Turnaround on a new review arriving?

### Bing Places listing setup `/local-marketing/bing-places-listing-setup`
126. Have you done one? Can you import from Google, or is it manual?
127. Which AI assistants pull local results from Bing, as far as you know? I will only write what you can stand behind.
128. Is this a standalone sale or a bundle item?

### Apple Maps listing setup `/local-marketing/apple-maps-listing-setup`
129. Have you used Apple Business Connect? How does verification work?
130. What can you do on Apple that you cannot on Google, or the reverse?
131. Standalone or bundle?

---

## 6. Marketing consultant pages

### `/consulting` hub
132. Do you actually want to sell consulting, or is this hub here because the GBP category exists? An honest answer shapes how hard these six pages push. It is fine for them to be modest pages that exist for category coverage.
133. What do you charge for your time? Hourly, per session, or free-as-a-consult? Right now the whole site says "free consult", and six pages selling paid advice sit awkwardly next to that unless the line is drawn clearly.
134. Where is the line between the free consult and paid consulting?

### SEO consulting `/consulting/seo-consulting`
135. Has anyone paid you for advice without buying the work?
136. What does a session look like? Length, format, what they leave with.
137. Do you follow up, or is it one and done?

### Marketing strategy `/consulting/marketing-strategy`
138. Are you comfortable advising on channels outside your own services, including telling someone not to spend on SEO? That willingness is this page's value and I do not want to claim it if it is not true.
139. What does the client leave with?
140. What have you actually advised someone on, outside web and SEO?

### Website strategy session `/consulting/website-strategy-session`
141. Is this different from your free consult? If not, this page should not exist and I would rather cut it than pad it.
142. What is the deliverable? A page list, a sitemap, a keyword map?
143. Would someone buy this and then not have you build the site? Are you fine with that?

### Google Business Profile training `/consulting/google-business-profile-training`
144. Live session, recorded, or a written guide?
145. How long, and what does it cover?
146. Have you trained anyone?

### SEO training for business owners `/consulting/seo-training`
147. Who is this for, the owner or an employee?
148. Format and length?
149. What can someone realistically do themselves after it, and what should they still not touch?

### Photo and video strategy `/consulting/photo-and-video-strategy`
150. Confirm you do not shoot, and that the deliverable is strategy only. The page has to be unambiguous, because someone searching this will often want a photographer.
151. What is on your shot list for a local service business?
152. Lilylynne Photography is a photography client. Is there any relationship worth mentioning here, or does that muddy it?
153. Would you ever refer a shoot out? Naming that you can point people to someone would make this page more useful than a strategy-only page usually is.

---

## 7. Two things I would change on the GBP itself

Noting these now since you asked for GBP recommendations in the final report. Neither blocks the build.

**Done 2026-09-27:** "Local SEO" and "AI search optimization (GEO)" were removed from the profile so its services list matches the site one to one. Remaining suggestions:

154. **"Rank tracking and geo-grid reports"** is the only service name on the profile written as a phrase with "and" rather than a term someone would search. It is also the one name too long for a clean title tag. If you ever revise the profile, "Geo-grid rank tracking" or "Rank tracking" would search better. I am not changing the site name unless you change the profile first, because they have to match.
155. Nothing else. The profile's remaining 43 services each map to exactly one page.
