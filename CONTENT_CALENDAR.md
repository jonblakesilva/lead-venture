# Blog Content & Keyword Calendar

Audience: home-service business owners (roofers, HVAC, plumbers, electricians, lawn care, tree service, landscapers, painters, remodelers, general contractors, junk removal, pest control) searching for help growing their business — the same audience as the Growth Playbooks. This is **not** homeowner-facing content.

## Keyword strategy

1. **Don't fight for head terms.** "HVAC marketing" and "roofing leads" are dominated by ServiceTitan, Housecall Pro, Angi, and Jobber's content teams. We can't out-rank them on volume. Go long-tail and question-based instead — specific enough that a contractor's exact problem is in the title.
2. **Answer the objection or the "how" behind a playbook, don't just restate it.** Every post below maps to a Growth Playbook topic/trade combo so it can link straight to the deeper page and pass authority both ways (blog → playbook → trade page → pricing/contact).
3. **Prioritize "vs" and comparison content.** Bottom-funnel searches like "ServiceTitan vs Jobber" or "best CRM for [trade]" convert far better than top-of-funnel "tips" posts, and there's real search volume with less content saturation than the generic tips space.
4. **Write toward a decision, not just information.** Every post should end with a clear next step (a relevant playbook, the revenue-leak calculator, or a free audit CTA) — informational content that doesn't route anywhere is wasted traffic.
5. **Reuse the trade-specific voice data already built for the playbooks** (`src/data/trade-job-profiles.ts` — terminology, objections, seasonal patterns) so blog posts that reference a specific trade sound native, not generic.

## 18 posts, prioritized

| # | Title | Primary keyword | Intent | Links to |
|---|---|---|---|---|
| 1 | Missed Call Text-Back: What It Is and Why It Recovers 20-30% of "Lost" Leads | missed call text back for contractors | Informational → product | Lead Generation, Appointment Setting playbooks |
| 2 | ServiceTitan vs. HighLevel-Based Platforms: What Actually Matters for a Small Contractor | servicetitan vs highlevel | Comparison, bottom-funnel | Pricing, Partners |
| 3 | How Much Should a Roofing Company Spend on Marketing? (A Real Budget Breakdown) | roofing marketing budget | Informational, high intent | Revenue Maximization playbook (roofing) |
| 4 | The HVAC Maintenance Agreement Script That Actually Gets Signed | hvac maintenance agreement script | Informational, tactical | Ascension, Retention playbooks (hvac) |
| 5 | Why "I'll Think About It" Is Costing You 40% of Your Estimates | how to handle i need to think about it objection contractor | Informational, tactical | Sales playbook |
| 6 | Best CRM for Plumbers in 2026: What to Actually Look For | best crm for plumbers | Comparison, bottom-funnel | Partners, Pricing |
| 7 | How to Respond to a Bad Google Review as a Contractor (With Templates) | how to respond to negative google review contractor | Informational, tactical | Fulfillment, Retention playbooks |
| 8 | The Real Cost of a Slow Website for a Home Service Business | website speed home service business | Informational | Products page |
| 9 | Storm-Chasing Roofers: How to Win Insurance-Claim Jobs Without Burning Your Reputation | roofing storm lead generation | Trade-specific, tactical | Lead Generation, Sales playbooks (roofing) |
| 10 | How Much Does It Cost to Get a New Customer? A Plain-English CAC Guide for Contractors | how to calculate customer acquisition cost contractor | Informational, feeds glossary | Revenue Maximization, Financing playbooks |
| 11 | Lawn Care Route Density: The One Number Most Owners Never Calculate | lawn care route density | Trade-specific, tactical | Operations playbook (lawn-care) |
| 12 | Why Quarterly Pest Control Plans Are More Profitable Than One-Time Treatments | pest control recurring revenue | Trade-specific | Ascension, Retention playbooks (pest-control) |
| 13 | 5 Signs Your General Contracting Business Has an Operations Problem, Not a Leads Problem | general contractor scaling problems | Informational, diagnostic | Operations playbook (general-contractors) |
| 14 | How to Build a Google Business Profile That Actually Ranks (2026 Update) | google business profile optimization checklist | Informational (updates existing post's angle for GBP algorithm changes) | Lead Generation playbook |
| 15 | The Good/Better/Best Pricing Structure for Home Service Estimates (With Real Numbers) | good better best pricing contractor | Tactical, template-driven | Sales, Upsell playbooks |
| 16 | AI Tools for Contractors: What's Actually Worth Using in 2026 | ai tools for contractors | Informational, trend-driven | AI-Powered Marketing playbook |
| 17 | Junk Removal B2B: How to Land Recurring Property Management Contracts | junk removal property management contracts | Trade-specific, tactical | Ascension playbook (junk-removal) |
| 18 | Why Your Remodeling Leads Aren't Closing (It's Usually Not the Price) | why remodeling leads dont close | Informational, diagnostic | Sales playbook (remodeling) |

**Suggested cadence:** 2 posts/month covers this list in 9 months. If publishing capacity allows, front-load #1, #2, #6, #10 first — they're the highest commercial intent and the most linkable from existing pages.

## Other programmatic SEO opportunities (beyond the playbooks)

- **Comparison pages** (`/compare/[competitor]`): "The Lead Venture vs. ServiceTitan," "vs. Jobber," "vs. Housecall Pro," "vs. hiring an in-house marketer." High commercial intent, low competition for a small agency, and a natural place to be honest about tradeoffs (which builds trust more than a generic sales page).
- **A glossary** (`/glossary/[term]`): short, genuinely useful definitions for terms already used across the playbooks — CAC, LTGP, CFA, BANT, speed-to-lead, missed-call-text-back. Cheap to build (reuses playbook copy), captures long-tail "what is ___" searches, and every entry can link back to the playbook that goes deeper.
- **Trade-specific calculator pages**, extending the existing revenue-leak-calculator pattern: a "[trade] profit margin calculator" or "[trade] customer lifetime value calculator" per trade, pre-seeded with that trade's `avgJobValue`/`crewHourlyCost` from `trade-job-profiles.ts` as defaults. Calculators tend to earn backlinks and have very high time-on-page.
- **"Best [tool] for [trade]" pages**: e.g. "Best CRM for HVAC Companies," "Best Scheduling Software for Landscapers." Bottom-funnel, and a legitimate place to mention HighLevel-based tooling as one strong option among real alternatives (credibility requires actually being fair to competitors here).

## Notes

- Every new post should get an internal link from the *most relevant* playbook page(s) in the table above (add a "Related reading" block), not just from the blog index — that's where the actual SEO lift comes from given the playbooks already have the page count.
- Keep author byline and category/tags consistent with the existing 3 posts' frontmatter schema (see `src/content/blog/*.md`) so nothing breaks the blog index/category filtering.
