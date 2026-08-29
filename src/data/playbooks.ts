import type { Trade, TradeSlug } from "./trades";
import type { TradeJobProfile } from "./trade-job-profiles";

export type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "example"; title: string; lines: string[] }
  | { type: "formula"; text: string };

export interface ImplementationStep {
  label: string;
  items: string[];
}

export interface PlaybookTopic {
  slug: string;
  title: string;
  icon: string;
  tagline: (trade: Trade, profile: TradeJobProfile) => string;
  tldrSummary: (trade: Trade, profile: TradeJobProfile) => string;
  tldrBullets: (trade: Trade, profile: TradeJobProfile) => string[];
  tldrBottomLine: (trade: Trade, profile: TradeJobProfile) => string;
  intro: (trade: Trade, profile: TradeJobProfile) => Block[];
  sections: (trade: Trade, profile: TradeJobProfile) => Block[];
  implementationPlan: (trade: Trade, profile: TradeJobProfile) => ImplementationStep[];
  checklist: (trade: Trade, profile: TradeJobProfile) => string[];
  keyTakeaways: (trade: Trade, profile: TradeJobProfile) => string[];
}

export const playbookSlugs = [
  "revenue-maximization",
  "lead-generation",
  "lead-nurture",
  "appointment-setting-qualification",
  "sales",
  "landing-pages-offers",
  "fulfillment",
  "upsell",
  "ascension",
  "retention",
  "operations",
  "business-leverage-financing",
  "content-marketing-social-media",
  "ai-powered-marketing",
] as const;

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

export const playbookTopics: Record<string, PlaybookTopic> = {
  "revenue-maximization": {
    slug: "revenue-maximization",
    title: "Revenue Maximization",
    icon: "lucide:trending-up",
    tagline: (trade) => `Master the financial levers that turn your ${trade.name.toLowerCase()} business into a cash-generating machine.`,
    tldrSummary: () =>
      "The real money isn't in getting more customers — it's in maximizing profit from existing customers and using that cash flow to fuel growth. This playbook teaches the Customer Financed Acquisition (CFA) framework for scaling without investors.",
    tldrBullets: (trade, profile) => [
      "Customer Financed Acquisition (CFA): use upfront payments from new customers to pay for their own acquisition cost — enables \"unlimited\" growth",
      "Know your numbers: calculate Lifetime Gross Profit (LTGP), Cost to Acquire a Customer (CAC), and payback period",
      "COGS/Profit benchmarks: target 40-55% COGS, 45-60% Gross Profit, 10-20% Net Profit",
      `High-tier clients pay more and value more: focus on ${profile.commercialExample} and other recurring, high-value accounts`,
      "Obligation to excellence: charge premium prices and deliver premium service — clients who pay more demand (and deserve) more",
    ],
    tldrBottomLine: (trade) =>
      `Calculate your LTGP and CAC, implement offers structured so the upfront payment covers your acquisition cost, and target high-tier clients. CFA lets you scale rapidly without outside capital by making sure each new ${trade.name.toLowerCase()} customer pays for their own acquisition.`,
    intro: (trade) => [
      { type: "paragraph", text: `Most ${trade.name.toLowerCase()} owners focus on getting more jobs. That's backwards.` },
      { type: "paragraph", text: "The real money isn't in getting more customers — it's in maximizing the profit from every customer you already have, and using that cash flow to fuel unstoppable growth." },
      { type: "paragraph", text: "This playbook teaches the exact financial framework used to scale service businesses to seven and eight figures without taking a single dollar from outside investors. It's called Customer Financed Acquisition (CFA), and it's the secret to \"unlimited\" growth." },
      { type: "heading", text: "The Core Problem: Most Owners Are Broke (Even When They're Busy)" },
      { type: "paragraph", text: `You're booked out weeks in advance. Your crews are working 60-hour weeks. You're billing tens of thousands a month. But at the end of the month, there's no money left.` },
      { type: "paragraph", text: "Why? Because you don't understand your numbers." },
      {
        type: "bullets",
        items: [
          "You don't know how much profit you make per job",
          "You don't know how much it costs to acquire a customer",
          "You don't know how much a customer is worth over their lifetime",
          "You don't know if you're making money or just breaking even",
        ],
      },
      { type: "paragraph", text: "The result: you're working 80 hours a week to make less than you'd make salaried somewhere else. This playbook fixes that." },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Financial Levers That Control Your Business" },
      { type: "paragraph", text: "There are five numbers that control your entire business. If you don't know them, you're flying blind." },
      {
        type: "bullets",
        items: [
          "Cost of Goods Sold (COGS) — what it costs to deliver the service",
          "Gross Profit — revenue minus COGS",
          "Net Profit — Gross Profit minus overhead",
          "Cost to Acquire a Customer (CAC) — what you spend to get a new customer",
          "Lifetime Gross Profit (LTGP) — total profit a customer generates over their lifetime",
        ],
      },

      { type: "heading", text: "1. Cost of Goods Sold (COGS): What It Actually Costs to Do the Job" },
      { type: "paragraph", text: `COGS is the direct cost to deliver the service. For a ${trade.name.toLowerCase()} business, COGS includes crew labor and payroll taxes, equipment fuel and maintenance, disposal or material costs, and subcontractors. It does not include office rent, marketing, insurance, your own salary, or administrative staff.` },
      {
        type: "example",
        title: `Example: you bid a ${fmt(profile.avgJobValue)} ${profile.avgJobLabel} job`,
        lines: [
          `Labor: ${fmt(Math.round(profile.avgJobValue * 0.24))} (crew hours at a ${fmt(profile.crewHourlyCost)}/hour loaded cost)`,
          `Materials/equipment: ${fmt(Math.round(profile.avgJobValue * 0.12))} (fuel, materials, wear on equipment)`,
          `Disposal/subcontractors: ${fmt(Math.round(profile.avgJobValue * 0.14))}`,
          `Total COGS: ${fmt(Math.round(profile.avgJobValue * 0.5))} — Gross Profit: ${fmt(Math.round(profile.avgJobValue * 0.5))} (50% margin)`,
        ],
      },
      { type: "paragraph", text: "Industry benchmark: 40-55% COGS. If yours is above 60%, you're either undercharging, inefficient, or taking jobs that aren't actually profitable." },

      { type: "heading", text: "2. Gross Profit: The Money Left After You Do the Work" },
      { type: "formula", text: "Gross Profit = Revenue − COGS" },
      { type: "paragraph", text: "This is the money left to pay for rent, insurance, marketing, admin staff, your salary, and profit. Industry benchmark: 45-60% Gross Profit Margin. Below 40% and you're in trouble." },

      { type: "heading", text: "3. Net Profit: The Money You Actually Keep" },
      { type: "formula", text: "Net Profit = Gross Profit − Overhead" },
      { type: "paragraph", text: "Overhead includes rent, insurance, marketing, admin salaries, software subscriptions, and your bookkeeper or accountant. Industry benchmark: 10-20% Net Profit Margin. Below 10% and you're barely surviving; above 20% and you're printing money." },

      { type: "heading", text: "4. Cost to Acquire a Customer (CAC)" },
      { type: "formula", text: "CAC = Total Marketing Spend ÷ Number of New Customers" },
      {
        type: "example",
        title: "Example",
        lines: [
          "You spend $3,000/month on ads",
          "You get 30 new customers",
          "CAC = $3,000 ÷ 30 = $100 per customer",
        ],
      },
      { type: "paragraph", text: `Your CAC should be roughly 10-20% of your average job value. For a ${fmt(profile.avgJobValue)} job, that's a target CAC of ${fmt(Math.round(profile.avgJobValue * 0.1))}–${fmt(Math.round(profile.avgJobValue * 0.2))}. Above that and you're either overspending on marketing or your close rate is too low.` },

      { type: "heading", text: "5. Lifetime Gross Profit (LTGP): The Most Important Number in Your Business" },
      { type: "formula", text: "LTGP = (Average Job Value × Gross Profit Margin) × Number of Jobs Over Lifetime" },
      {
        type: "example",
        title: "Residential / one-off customer",
        lines: [
          `Average job value: ${fmt(profile.avgJobValue)}, 50% margin = ${fmt(Math.round(profile.avgJobValue * 0.5))} Gross Profit per job`,
          `2-3 jobs over the relationship = LTGP of roughly ${fmt(Math.round(profile.avgJobValue * 0.5 * 2.5))}`,
        ],
      },
      {
        type: "example",
        title: `Commercial / recurring client — ${profile.commercialExample}`,
        lines: [
          `Annual contract value: ${fmt(profile.commercialAnnualValue)}, 50% margin = ${fmt(Math.round(profile.commercialAnnualValue * 0.5))} Gross Profit per year`,
          `Over a 5-year relationship = LTGP of roughly ${fmt(Math.round(profile.commercialAnnualValue * 0.5 * 5))}`,
        ],
      },
      { type: "paragraph", text: "You can afford to spend up to 30-50% of LTGP to acquire a customer. Once you know a commercial account is worth that much over its lifetime, you can afford to outbid every competitor to win it — because you're not optimizing for the first sale, you're optimizing for the lifetime value." },

      { type: "heading", text: "The Customer Financed Acquisition (CFA) Framework" },
      { type: "paragraph", text: "This is the secret to \"unlimited\" growth without outside capital: use the cash flow generated from existing customers to pay for the acquisition of new customers." },
      {
        type: "bullets",
        items: [
          `Initial sale: you spend a modest amount on marketing to acquire a customer`,
          `Immediate ROI: the customer pays upfront for a ${profile.avgJobLabel}`,
          "Gross Profit: you keep roughly half as margin",
          "Reinvestment: you put that profit back into marketing to acquire more customers",
          "Repeat: each new round of customers funds the next — this is exponential growth",
        ],
      },
      { type: "paragraph", text: "The three levers of CFA are: lowering your CAC (better targeting, higher close rate, more referrals), raising your LTGP (recurring contracts, upsells, higher prices), and shortening your payback period (structuring offers so the upfront payment covers your CAC immediately)." },

      { type: "heading", text: "The Obligation to Service Clients at the Highest Level" },
      { type: "paragraph", text: "People who pay more value the service more — they have skin in the game. A low-paying, one-off customer complains, asks for discounts, and never refers anyone. A high-paying, recurring client appreciates the expertise, pays on time, leaves 5-star reviews, and refers new business." },
      { type: "paragraph", text: "When someone pays you a premium, you have an obligation to service them at the highest level: show up on time, communicate proactively, do the job right the first time, follow up afterward, and treat their property like it's your own. They're not just buying a job — they're buying peace of mind. Deliver that, and they become a customer for life." },

      { type: "heading", text: "Finding High-Tier Clients" },
      { type: "paragraph", text: `Not all customers are created equal. Low-tier customers are price shoppers looking for a one-time job. High-tier customers are value buyers with recurring needs — think ${profile.commercialExample}, HOAs, property management companies, and high-end residential clients.` },
      {
        type: "bullets",
        items: [
          "Commercial properties and property management companies",
          "HOAs with 100+ homes",
          "Municipal or institutional contracts",
          "High-end residential clients",
          "Direct mail, LinkedIn outreach, RFP bidding, and networking events (Chamber of Commerce, BNI) are the fastest ways to reach them",
        ],
      },
    ],
    implementationPlan: () => [
      { label: "Week 1 — Calculate Your Numbers", items: ["Track COGS for 30 days", "Calculate Gross Profit Margin and Net Profit Margin", "Calculate CAC", "Calculate LTGP for a typical residential vs. commercial client"] },
      { label: "Weeks 2-3 — Optimize Your Offer", items: ["Test a 10-20% price increase on new customers", "Add a recurring maintenance offer", "Build in a standard upsell at every job"] },
      { label: "Weeks 4-5 — Lower Your CAC", items: ["Improve ad targeting", "Tighten your sales/close process", "Ask every customer for a referral"] },
      { label: "Week 6+ — Reinvest Profits", items: ["Reinvest roughly 50% of Gross Profit into marketing", "Track payback period", "Scale spend once payback period is under 3 months"] },
      { label: "Ongoing — Target High-Tier Clients", items: ["Identify 10 commercial or recurring-contract prospects in your area", "Send direct mail + outreach", "Bid on institutional/municipal contracts", "Network at local business events"] },
    ],
    checklist: () => [
      "Calculated COGS for the last 30 days",
      "Calculated Gross Profit Margin and Net Profit Margin",
      "Calculated CAC",
      "Calculated LTGP for residential vs. commercial clients",
      "Tested a 10-20% price increase",
      "Added a recurring/maintenance offer",
      "Lowered CAC by 20%",
      "Reinvesting profit into marketing on a set schedule",
      "Actively targeting high-tier commercial clients",
    ],
    keyTakeaways: (trade) => [
      "Know your numbers: COGS, Gross Profit, Net Profit, CAC, LTGP",
      "Customer Financed Acquisition: use customer cash flow to pay for new customer acquisition",
      "Structure offers so the upfront payment covers your acquisition cost",
      `High-tier clients are worth far more than one-off residential jobs — for a ${trade.name.toLowerCase()} business, that usually means recurring commercial or contract work`,
      "Obligation to service: people who pay more value the service more — deliver accordingly",
    ],
  },

  "lead-generation": {
    slug: "lead-generation",
    title: "Lead Generation",
    icon: "lucide:target",
    tagline: (trade) => `The complete system for filling your ${trade.name.toLowerCase()} pipeline — Google, paid ads, referrals, and everything in between.`,
    tldrSummary: () =>
      "Lead generation mastery is what separates thriving service businesses from struggling ones. Most owners guess at marketing. This playbook gives you the actual channels, in priority order, and how to measure each one.",
    tldrBullets: (trade) => [
      "Google Business Profile optimization is priority #1 — most leads start with a local search",
      `Paid ads targeting homeowners generate $3-7 in return for every $1 spent when done correctly for a ${trade.name.toLowerCase()} business`,
      "SEO and content marketing build long-term organic traffic that doesn't disappear when you stop paying for it",
      "Referral programs turn happy customers into your best salespeople — referred customers close at roughly double the rate of cold leads",
      "Track cost per lead, conversion rate, and ROI by channel, and double down on whatever is actually working",
    ],
    tldrBottomLine: () =>
      "Optimize your Google Business Profile, launch one paid ad campaign, and set up a referral program — in that order, over the next 30 days.",
    intro: (trade) => [
      { type: "paragraph", text: `The customer journey for almost every ${trade.name.toLowerCase()} job starts the same way: a Google search or a recommendation from someone they trust. Businesses that dominate both of those moments get the calls. Businesses that don't, don't.` },
      { type: "heading", text: "Foundation: Your Digital Presence" },
      { type: "paragraph", text: "Before spending a dollar on ads, your Google Business Profile and website need to be in shape — otherwise you're paying to send traffic to a leaky bucket." },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Google Business Profile Mastery" },
      {
        type: "bullets",
        items: [
          "Every category filled in — primary and secondary, not just one",
          "50+ real job photos, uploaded weekly across categories: before/after, team, equipment, completed work",
          "A review generation system: request within 2-3 days of job completion, respond to every review within 24 hours",
          "A weekly posting cadence — a service spotlight, a seasonal tip, a project showcase",
        ],
      },
      { type: "paragraph", text: "This alone generates a meaningful share of inbound calls for most local service businesses, because it directly controls whether you show up in the map pack at the exact moment someone is ready to hire." },

      { type: "heading", text: "Website Conversion" },
      { type: "paragraph", text: `A well-optimized site can generate 30-50 qualified leads a month from organic search alone. Each service page needs a clear headline, a process overview, safety/trust signals, transparent pricing ranges, and a strong call to action — plus location-specific pages if you serve multiple areas.` },

      { type: "heading", text: "Paid Advertising" },
      { type: "paragraph", text: `${trade.name} searches are high-intent — someone searching "emergency ${profile.avgJobLabel} near me" wants to book today, not browse.` },
      {
        type: "example",
        title: "Google Ads structure",
        lines: [
          "40% budget on emergency/urgent-need campaigns",
          "35% on your core, highest-margin service",
          "25% on secondary services",
          `Target cost-per-lead of 10-15% of your average job value (${fmt(Math.round(profile.avgJobValue * 0.1))}–${fmt(Math.round(profile.avgJobValue * 0.15))} for a ${fmt(profile.avgJobValue)} job)`,
        ],
      },
      { type: "paragraph", text: "Facebook and Instagram ads work best targeting a 15-mile radius, homeowners aged 35-65, using before/after content and lookalike audiences built from your past customers. Third-party lead platforms (Thumbtack, Angi, Yelp Ads) can supplement volume, but response speed is everything — the first business to respond wins the job roughly 75% of the time." },

      { type: "heading", text: "Referral Programs & Strategic Partnerships" },
      { type: "paragraph", text: "Referred customers close at 60-70% versus 30-40% for cold leads, and they cost you a fraction of your paid CAC. A simple $100-per-referral cash incentive, promoted after every completed job, is usually enough to get it moving." },
      {
        type: "bullets",
        items: [
          `Partner with property managers who need ongoing ${profile.recurringServiceLabel} across their portfolio`,
          "Partner with real estate agents who need fast turnarounds before a listing goes live",
          "Partner with complementary trades who see the same customers but don't compete with you",
        ],
      },

      { type: "heading", text: "Offline Channels Still Work" },
      { type: "paragraph", text: "Vehicle wraps generate tens of thousands of impressions per vehicle per year for the cost of a one-time wrap. Yard signs left at every job (with permission) turn every completed project into free local advertising. Direct mail targeted at storm-affected areas or high-value neighborhoods routinely gets a 1-3% response rate." },
    ],
    implementationPlan: () => [
      { label: "Month 1 — Foundation", items: ["Fully optimize your Google Business Profile", "Set up an automated review request system", "Audit your website's service pages and mobile experience", "Implement call tracking"] },
      { label: "Month 2 — Paid Advertising", items: ["Launch a Google Ads campaign on your highest-intent service", "Set up conversion tracking", "Test 3-5 ad variations", "Optimize based on the first month of data"] },
      { label: "Month 3 — Social & Referrals", items: ["Launch Facebook/Instagram campaigns", "Build a custom audience from past customers", "Launch a formal referral program", "Identify and contact 5-10 potential referral partners"] },
      { label: "Month 4+ — Optimize & Scale", items: ["Review cost-per-lead and ROI by channel monthly", "Cut or fix underperforming channels", "Double budget on the channel with the best ROI", "Add offline channels (vehicle wrap, yard signs, direct mail) once digital is dialed in"] },
    ],
    checklist: () => [
      "Google Business Profile fully optimized with 50+ photos",
      "Automated review request system live",
      "Website service pages reviewed for conversion",
      "Call tracking implemented",
      "First paid ad campaign launched and tracked",
      "Referral program launched and promoted",
      "At least 3 referral/strategic partnerships in motion",
      "Cost per lead tracked by channel",
    ],
    keyTakeaways: (trade) => [
      "Your Google Business Profile is the highest-leverage, lowest-cost lead source available — treat it as an active asset, not a set-and-forget listing",
      `Paid ads should target a cost-per-lead around 10-15% of your average ${trade.name.toLowerCase()} job value`,
      "Referrals close at roughly double the rate of cold leads and cost far less — build a system for asking, don't rely on it happening naturally",
      "Track every channel's cost per lead and conversion rate, and reinvest in whatever is actually converting, not whatever feels most active",
    ],
  },

  "lead-nurture": {
    slug: "lead-nurture",
    title: "Lead Nurture",
    icon: "lucide:mail",
    tagline: () => "Turn a 30% close rate into 60%+ with a real follow-up system instead of hoping people call back.",
    tldrSummary: () =>
      "Most leads don't buy on the first touch. Businesses that follow up systematically close at double the rate of businesses that follow up once and give up.",
    tldrBullets: (trade) => [
      "Speed matters: contact leads within 5 minutes — response time is the single biggest predictor of conversion",
      "Use a multi-channel approach: email, text, and phone, not just one",
      "A 7-14 day automated sequence that educates and builds trust outperforms a single hard sales pitch",
      `Share genuinely useful ${trade.name.toLowerCase()} tips and seasonal advice, not just sales pitches — value-first content builds trust before the ask`,
      "A CRM is essential — track every interaction and never let a lead go silent",
    ],
    tldrBottomLine: () => "Set a 5-minute response standard, build a 7-touch follow-up sequence across email/text/phone, and put it in a CRM so nothing falls through the cracks.",
    intro: () => [
      { type: "paragraph", text: "Industry average close rate on inbound leads is 30-40%. Businesses with a real nurture system routinely hit 60-75% — not because they're better at selling, but because they simply don't let leads go cold." },
      { type: "heading", text: "Understanding the Three Buyer Types" },
      {
        type: "bullets",
        items: [
          "The Researcher (~40% of leads) — weeks-to-months timeline, needs education, not pressure",
          "The Comparison Shopper (~35%) — decides in 7-14 days, needs differentiation from competitors",
          "The Urgent Buyer (~25%) — decides in 24-48 hours, needs reassurance you're available and reliable",
        ],
      },
    ],
    sections: () => [
      { type: "heading", text: "The 7-Touch Follow-Up Framework" },
      { type: "paragraph", text: "5-7 touches spread over 14 days is the proven sweet spot — enough to stay top of mind without becoming annoying." },
      {
        type: "bullets",
        items: [
          "Day 0 (within 5 minutes): immediate acknowledgment — a quick email plus a phone call",
          "Day 1: a value-added follow-up relevant to what they asked about",
          "Day 3: social proof — a relevant case study or before/after",
          "Day 5: a short personal video message",
          "Day 7: a limited-time offer (a discount, a free add-on, or priority scheduling)",
          "Day 10: one more value touch, no sales pressure",
          "Day 14: a soft final attempt before moving to long-term nurture",
        ],
      },

      { type: "heading", text: "Multi-Channel Communication" },
      { type: "paragraph", text: "Text messages get roughly a 98% open rate versus about 20% for email, which makes texting the fastest way to get a response — but email is still where longer-term nurture content lives. Direct mail is worth the cost for your highest-value leads." },
      { type: "paragraph", text: "Phone scripts should open with a clear introduction, ask a handful of qualifying questions, and move straight to scheduling. Prepare responses in advance for the most common pushback: \"still getting other quotes,\" \"need to think about it,\" and \"what's your price.\"" },

      { type: "heading", text: "CRM and Automation" },
      { type: "paragraph", text: "A CRM should handle lead capture, automated follow-up sequences, task reminders, communication tracking, and pipeline stages (New Lead → Contacted → Estimate Scheduled → Estimate Delivered → Negotiating). Without this, follow-up depends entirely on someone remembering — and someone always forgets." },

      { type: "heading", text: "Advanced Nurture Tactics" },
      {
        type: "bullets",
        items: [
          "Retargeting ads to anyone who visited your site or engaged with a form but didn't convert",
          "A personalized video follow-up after every estimate, not just a written proposal",
          "Seasonal reactivation campaigns for leads that went cold months ago",
          "A referral ask even for leads who didn't convert — they may know someone who's a better fit right now",
        ],
      },
    ],
    implementationPlan: () => [
      { label: "Week 1 — Foundation", items: ["Set up a CRM or lead management system", "Create email templates for the 7-touch sequence", "Write phone scripts for common scenarios", "Set up automated first-response emails"] },
      { label: "Week 2 — Content", items: ["Write out a year of educational follow-up content", "Create 2-3 case studies with before/after proof", "Record a short video introduction", "Design a direct mail piece for high-value leads"] },
      { label: "Week 3 — Automation", items: ["Configure the automated sequence in your CRM", "Set up text templates", "Create manual task reminders as a backstop", "Test the full sequence with a dummy lead"] },
      { label: "Week 4 — Team & Ongoing", items: ["Train the team on phone scripts and response-time standards", "Assign clear follow-up ownership", "Review metrics weekly", "Refine scripts based on what's actually working"] },
    ],
    checklist: () => [
      "5-minute response standard in place",
      "7-touch follow-up sequence built across email, text, and phone",
      "CRM tracking every lead interaction",
      "Phone scripts written for common objections",
      "At least 2 case studies ready to send as proof",
      "Retargeting ads live for site visitors who didn't convert",
      "Weekly metrics review scheduled",
    ],
    keyTakeaways: () => [
      "Speed to first contact is the single biggest lever — 5 minutes or less",
      "One touch is not a follow-up system; plan for 5-7 touches across 14 days",
      "Text for speed, email for depth, phone for the close",
      "A CRM isn't optional once you're running more than a handful of leads a week",
    ],
  },

  "appointment-setting-qualification": {
    slug: "appointment-setting-qualification",
    title: "Appointment Setting & Qualification",
    icon: "lucide:calendar-check",
    tagline: () => "Stop losing 40-60% of leads to slow response, weak qualification, and no-shows.",
    tldrSummary: () =>
      "The appointment is where revenue is made or lost. Most service businesses lose the majority of their leads before an estimate ever happens — not on price, on process.",
    tldrBullets: () => [
      "Speed to lead wins: contacting leads within 5 minutes produces roughly 9x higher conversion than waiting 30+ minutes",
      "Qualify before you quote — use a simple framework (Budget, Authority, Need, Timeline) to spot serious buyers",
      "Confirm, remind, confirm again — a multi-touch confirmation sequence cuts no-shows by 60%+",
      "Script for consistency — a written phone script builds confidence across your whole team, not just your best closer",
      "Automate the workflow in a CRM so no lead is relying on someone's memory",
    ],
    tldrBottomLine: () => "Most local service businesses lose 40-60% of their leads to slow response, poor qualification, and no-shows. This is the system that fixes all three.",
    intro: () => [
      { type: "paragraph", text: "Leads contacted within 5 minutes convert roughly 9x more often than leads contacted after 30 minutes, and about 78% of buyers go with whichever company responds first. After 10 minutes, your odds drop by roughly 400%." },
    ],
    sections: (trade) => [
      { type: "heading", text: "The Complete Call Workflow" },
      {
        type: "bullets",
        items: [
          "Step 1 (0-5 min): initial contact — acknowledge the lead immediately",
          "Step 2 (5-10 min): qualification — a handful of targeted questions",
          "Step 3 (2-3 min): appointment setting — offer two specific time slots, never open-ended \"whenever works\"",
          "Step 4 (automated): confirmation and follow-up — immediate SMS, an email with a calendar invite, a 24-hour reminder, and a 2-hour reminder",
        ],
      },

      { type: "heading", text: "Qualifying With BANT" },
      { type: "paragraph", text: `Ask enough to know whether this is a real, fundable, urgent need before you invest time on an estimate.` },
      {
        type: "bullets",
        items: [
          "Budget — do they have a realistic sense of what this kind of work costs?",
          "Authority — are you talking to the actual decision-maker?",
          "Need — what specifically prompted the call, and how serious is it?",
          `Timeline — are they trying to get this done this week, or just pricing it out for someday?`,
        ],
      },
      { type: "paragraph", text: "Score it simply: 4-for-4 is a hot lead you book immediately, 3-for-4 is warm and worth booking within 24 hours, 2 or fewer goes into a longer nurture sequence instead of an on-site visit." },

      { type: "heading", text: "No-Show Prevention" },
      { type: "paragraph", text: "A multi-touch confirmation sequence — an immediate text, a reminder the day before with a calendar invite, and a final reminder two hours out — is the single highest-leverage fix for no-shows. Offering a narrow arrival window and sending a photo of who's showing up both meaningfully improve show rates too." },

      { type: "heading", text: "Objection Handling on the Phone" },
      { type: "paragraph", text: `The most common pushback before an appointment is even booked: "I need to get other quotes," "I just want ballpark pricing over the phone," and "I need to talk to my spouse first." Each deserves a prepared, calm response rather than an improvised one — write these out in advance and practice them.` },

      { type: "heading", text: "Tracking the Full Funnel" },
      {
        type: "example",
        title: "How the numbers stack up",
        lines: [
          "100 leads → 70 contacted (70% contact rate)",
          "70 contacted → 42 appointments set (60% set rate)",
          "42 set → 34 showed up (80% show rate)",
          "34 showed → roughly 14 became jobs (40% close rate on the estimate)",
          "Overall: about 14% lead-to-sale — and every stage in this chain is a place a fixable process failure quietly costs you money",
        ],
      },
    ],
    implementationPlan: () => [
      { label: "Week 1 — Foundation", items: ["Document your current appointment-setting process", "Calculate baseline contact rate, set rate, and show rate", "Set up call recording if you don't have it", "Write down your phone scripts"] },
      { label: "Week 2 — Scripts & Training", items: ["Customize scripts for your business and services", "Train the team on the scripts", "Practice the most common objections out loud", "Start a short daily practice routine"] },
      { label: "Week 3 — Automation", items: ["Set up lead routing in your CRM", "Configure instant SMS alerts for new leads", "Build the confirmation sequence (SMS + email)", "Test the whole workflow end to end"] },
      { label: "Week 4+ — Optimize", items: ["Review call recordings weekly", "Adjust scripts based on real conversations", "Track KPIs monthly", "Refresh training quarterly"] },
    ],
    checklist: () => [
      "5-minute response standard in place and tracked",
      "BANT qualification questions written down",
      "Two-option scheduling used instead of open-ended asks",
      "Multi-touch confirmation sequence automated",
      "Objection scripts written for the top 3-5 pushbacks",
      "Contact rate, set rate, and show rate tracked monthly",
    ],
    keyTakeaways: (trade) => [
      "Speed to lead is the highest-leverage fix available — 5 minutes or bust",
      "Qualify before you quote so you're spending on-site time on real buyers",
      `A written, practiced phone script makes every team member perform like your best closer, not just the ${trade.name.toLowerCase()} owner`,
      "No-show prevention is a confirmation-sequence problem, not a customer-reliability problem",
    ],
  },

  sales: {
    slug: "sales",
    title: "Sales",
    icon: "lucide:handshake",
    tagline: (trade) => `The on-site sales system that doubles your average ticket without losing the job — built for ${trade.name.toLowerCase()} estimates.`,
    tldrSummary: () =>
      "If you're closing 60-85% of your estimates, you're undercharging. The right close rate at premium pricing is 30-45% — and a real sales process gets you there without feeling pushy.",
    tldrBullets: (trade, profile) => [
      "First impressions win jobs — show up looking like a real, insured company, not a guy with a truck",
      `Sell the outcome, not the service: homeowners are buying safety and peace of mind, not just "${profile.avgJobLabel}"`,
      "A Good / Better / Best pricing structure increases average ticket by 40%+ on its own",
      "\"I need to think about it\" almost always means you didn't build enough value before showing the price",
      `Bottom line: a real sales process can move your close rate from an unprofitable 70-80% down to a profitable 30-45% at higher prices`,
    ],
    tldrBottomLine: () => "Master the on-site process, offer three price tiers instead of one number, and practice objection handling until it's second nature.",
    intro: (trade, profile) => [
      {
        type: "example",
        title: "The math that changes everything",
        lines: [
          `Close 80% of jobs at ${fmt(profile.avgJobValue)} — roughly 8 of 10 estimates become jobs, but margins get squeezed to hit that rate`,
          `Close 35% of jobs at ${fmt(Math.round(profile.avgJobValue * 1.6))} — fewer jobs, but at a real margin, total profit ends up higher`,
        ],
      },
      { type: "paragraph", text: "The goal isn't the highest close rate — it's the highest profit. That usually means closing 30-45% of estimates at prices that actually reflect the value of the work." },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Before You Even Leave for the Estimate" },
      { type: "paragraph", text: "Look like a professional business, not a guy who happened to answer the phone: a branded shirt, a clean and marked vehicle, a clipboard or tablet, and a business card. Then confirm the appointment — a 24-hour text, a 2-hour reminder, and a \"here's what I look like\" text right before arrival cuts no-shows dramatically." },

      { type: "heading", text: "The Process → Proof → Price Framework" },
      {
        type: "bullets",
        items: [
          "PROCESS — walk them through exactly what you'll do, step by step, so nothing feels uncertain",
          "PROOF — years in business, insurance, licensing, before/after photos, and real reviews, shown before you ever mention price",
          "PRICE — state it clearly once, then stop talking. The first person to speak after the price is stated usually loses leverage",
        ],
      },
      { type: "paragraph", text: "Present sitting down at a table, not standing on the driveway — it changes the psychology from a transaction to a decision being made calmly." },

      { type: "heading", text: "Good / Better / Best Pricing" },
      {
        type: "example",
        title: `Example: a ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}`,
        lines: [
          `Good — ${fmt(profile.avgJobValue)} (the core job, done right)`,
          `Better — ${fmt(Math.round(profile.avgJobValue * 1.3))} (core job + one meaningful add-on)`,
          `Best — ${fmt(Math.round(profile.avgJobValue * 1.75))} (core job + add-ons + a warranty or priority service)`,
        ],
      },
      { type: "paragraph", text: "Most customers pick the middle option when given three real choices — which raises your average ticket without you ever having to \"upsell\" anyone." },

      { type: "heading", text: "Handling Objections" },
      { type: "paragraph", text: "Use a simple four-step pattern on any pushback: identify the real objection, isolate it (\"if we can solve that, is there anything else stopping you?\"), ask a question that gets them talking, then address what they actually said. A price-match or satisfaction guarantee removes most of the risk they're worried about, which often dissolves the objection before you even have to argue the price." },

      { type: "heading", text: "The Leave-Behind & Follow-Up" },
      { type: "paragraph", text: "A simple one-page leave-behind — a summary, a few before/after photos, testimonials, and your credentials — costs almost nothing and makes a small operation look established. For anyone who doesn't sign on the spot, a structured follow-up over the next week (a text, a call, a testimonial, a gentle urgency nudge) closes a meaningful share of \"I need to think about it\" leads that would otherwise just go cold." },
    ],
    implementationPlan: () => [
      { label: "Week 1 — Fix Your Appearance", items: ["Get magnetic signs or a wrap for your vehicle", "Order branded shirts", "Put together a leave-behind packet", "Take a few professional photos of your team and equipment"] },
      { label: "Week 2 — Confirmation System", items: ["Set up 24-hour confirmation texts", "Set up 2-hour reminder texts", "Set up an arrival text with a photo"] },
      { label: "Week 3 — Master the Presentation", items: ["Write your Process script", "Gather your Proof materials", "Practice presenting seated at a table", "Role-play with a teammate"] },
      { label: "Week 4 — Objection Handling", items: ["Write out your top 5 objections", "Script responses using identify → isolate → question → address", "Practice until it feels natural", "Consider a satisfaction or price-match guarantee"] },
    ],
    checklist: () => [
      "Vehicle and team look professional on arrival",
      "Confirmation text sequence automated",
      "Process → Proof → Price script written and practiced",
      "Good / Better / Best pricing built for your top services",
      "Objection responses scripted for the top 3-5 pushbacks",
      "A structured 5-7 day follow-up sequence in place for non-closes",
      "Close rate and average ticket tracked weekly",
    ],
    keyTakeaways: () => [
      "A high close rate is often a sign you're leaving money on the table, not a sign of great salesmanship",
      "Presenting Process, then Proof, then Price — in that order — builds enough value that the price lands as reasonable",
      "Three price options beat one — most customers pick the middle",
      "\"I need to think about it\" is a signal to ask a better question, not to walk away",
    ],
  },

  "landing-pages-offers": {
    slug: "landing-pages-offers",
    title: "Landing Pages & Offers",
    icon: "lucide:layout",
    tagline: () => "Most service businesses use one generic page for all their traffic. Platform-specific pages and real offers convert 3-5x better.",
    tldrSummary: () =>
      "Facebook traffic and Google traffic need completely different landing pages. Facebook is an interruption — it needs a story and trust-building. Google is intent — it needs speed and a clear next step. And your offer matters more than your design.",
    tldrBullets: (trade) => [
      "Facebook needs storytelling and heavy social proof; Google needs speed and a direct answer to the search",
      "A great offer on an ugly page beats a weak offer on a beautiful page, every time",
      "Funnel hacking — studying what competitors are already running — saves months of guessing",
      `Local, service-plus-city landing pages rank faster and convert better than one generic ${trade.name.toLowerCase()} page`,
      "Urgency + scarcity + a real guarantee is the combination that actually moves people to act",
    ],
    tldrBottomLine: () => "Build one platform-specific landing page with a real, named offer this week — most businesses are still sending every visitor to the same generic homepage.",
    intro: () => [
      { type: "paragraph", text: "A landing page isn't your homepage. It has one job: get this specific visitor, who arrived from this specific ad or search, to take one specific action." },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Facebook vs. Google: Two Different Jobs" },
      { type: "paragraph", text: "Facebook traffic is cold and interrupted mid-scroll — it needs education, trust, and a story before it will convert, which means a longer page with heavy social proof (10+ testimonials, before/after photos, a clear FAQ). Google PPC traffic already typed the exact problem into a search bar — it needs a short, fast page that matches the search intent immediately, with a clear price range and a single obvious next step." },

      { type: "heading", text: "The Anatomy of an Irresistible Offer" },
      { type: "paragraph", text: "Formula: Core Service + a Unique Name + Bonuses + Urgency/Scarcity + a Guarantee." },
      {
        type: "example",
        title: "Stacking value on a core job",
        lines: [
          `Core service: ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}`,
          `Bonus 1: a free follow-up inspection (${fmt(Math.round(profile.avgJobValue * 0.1))} value)`,
          `Bonus 2: 10% off the next service (${fmt(Math.round(profile.avgJobValue * 0.1))} value)`,
          `Total stacked value: ${fmt(Math.round(profile.avgJobValue * 1.2))} — investment: ${fmt(profile.avgJobValue)}`,
        ],
      },
      { type: "paragraph", text: "Real scarcity works (\"only 10 spots this month\"); fake scarcity gets noticed and erodes trust fast. A strong guarantee — a satisfaction guarantee, a price match, or an honesty guarantee (\"if we recommend work you don't need, we'll pay you back\") — removes the risk that's actually stopping people from booking." },

      { type: "heading", text: "Funnel Hacking: Study What's Already Working" },
      { type: "paragraph", text: "Meta's Ad Library and Google's Ads Transparency Center let you see exactly what competitors — including ones in other cities who aren't your direct competition — are currently running. Look at their ad copy, their offer structure, and their landing pages, and adapt the pattern to your own brand rather than copying it outright." },

      { type: "heading", text: "Local Landing Pages for SEO" },
      { type: "paragraph", text: `Service-plus-city pages (e.g. "${trade.name} in Canton, OH") tend to rank faster and convert meaningfully better than one generic services page, because they match exactly what someone nearby is searching for. Start with your home city plus 3-5 neighboring areas — that's usually enough to meaningfully expand your local footprint.` },

      { type: "heading", text: "Common Landing Page Mistakes" },
      {
        type: "bullets",
        items: [
          "Too many options or links pulling attention away from the one action you want",
          "No real social proof — a page with zero testimonials or photos reads as unproven",
          "A weak or generic offer with nothing to actually respond to",
          "Slow load times, especially on mobile, where most local searches happen",
          "A page that isn't obviously readable and clickable on a phone",
        ],
      },
    ],
    implementationPlan: () => [
      { label: "Days 1-2 — Choose & Research", items: ["Pick one page type to start: emergency, seasonal offer, or a core service", "Pull 5 competitor examples from Meta Ad Library and Google Ads Transparency Center", "Note what's working across all of them"] },
      { label: "Days 3-4 — Build the Offer & Copy", items: ["Name the offer using the formula", "Stack in 1-2 real bonuses", "Add genuine urgency and a guarantee", "Write the headline, proof section, and FAQ"] },
      { label: "Days 5-6 — Design & Mobile", items: ["Build the page (a template tool is fine to start)", "Add photos, testimonials, and trust badges", "Test thoroughly on a phone", "Confirm click-to-call works"] },
      { label: "Day 7 — Launch & Track", items: ["Connect the page to your domain", "Set up analytics and conversion tracking", "Send a small amount of test traffic", "Monitor conversion rate and iterate"] },
    ],
    checklist: () => [
      "Separate landing pages exist for Facebook traffic vs. Google traffic",
      "Offer is named and includes at least one bonus",
      "A real guarantee is stated clearly",
      "Genuine urgency or scarcity is present (not fabricated)",
      "Page has been checked against 3-5 competitor pages",
      "At least one local service-plus-city page is live",
      "Page loads fast and works cleanly on mobile",
    ],
    keyTakeaways: () => [
      "Match the page to the traffic source — Facebook needs a story, Google needs speed",
      "The offer does more work than the design — build it deliberately using the stacking formula",
      "Don't guess at what converts — study what competitors are already running",
      "Local, service-plus-city pages outperform one generic page for both SEO and conversion",
    ],
  },

  fulfillment: {
    slug: "fulfillment",
    title: "Fulfillment",
    icon: "lucide:clipboard-check",
    tagline: (trade) => `Turn every ${trade.name.toLowerCase()} job into a 5-star review and a referral, not just a completed invoice.`,
    tldrSummary: () =>
      "How a job is delivered determines whether it turns into a review, a referral, and a repeat customer — or just a one-time transaction. Small, consistent touches matter more than most owners realize.",
    tldrBullets: () => [
      "Confirm the appointment 24-48 hours out so nothing is a surprise on either side",
      "Visible safety protocols and a professional appearance build trust the moment you arrive",
      "A few small \"wow factor\" touches at the end of a job cost almost nothing and get remembered",
      "Following up within 24 hours after the job is when you win the review, not weeks later",
      "A recorded testimonial captured right after the final walk-through is worth more than any ad you'll run",
    ],
    tldrBottomLine: () => "Build a simple pre-job, on-site, and post-job checklist — most of what separates a 5-star review from silence is process, not luck.",
    intro: () => [
      { type: "paragraph", text: "Three promises should hold on every job: safety first, always; professional execution; and exceeding what the customer expected, even in small ways." },
    ],
    sections: (trade) => [
      { type: "heading", text: "Pre-Job: Setting Up for Success" },
      { type: "paragraph", text: "A quick confirmation call 24-48 hours before arrival — confirming scope, timing, and access — prevents the majority of on-site surprises. Match crew skill to job complexity, and make sure equipment and materials are checked off the night before, not scrambled together that morning." },

      { type: "heading", text: "On-Site: Delivering Exceptional Service" },
      {
        type: "bullets",
        items: [
          "Park considerately and arrive in clean, branded gear",
          "Do a quick property walk-through with the customer before starting so expectations are shared",
          "Keep safety visible — cones, signage, PPE — it builds trust even for people who never ask about it",
          "Protect the property proactively rather than cleaning up damage after the fact",
          "Leave the site cleaner than you found it — the \"white glove\" standard is what gets photographed and shared",
        ],
      },

      { type: "heading", text: "The Magic Question" },
      { type: "paragraph", text: "Before you leave, ask: \"On a scale of 1 to 10, how would you rate your experience today?\" If it's not a 9 or 10, ask what would have made it one — and fix it on the spot if you possibly can. This single habit catches small dissatisfaction before it becomes a bad review." },

      { type: "heading", text: "Post-Job Follow-Up & Reviews" },
      { type: "paragraph", text: "A same-day text and a 48-hour quality check are what actually generate reviews — waiting a week and hoping someone remembers to leave one rarely works. Send a direct link, ask specifically, and respond to every review you get within 24 hours, good or bad." },

      { type: "heading", text: "Capturing Video Testimonials" },
      { type: "paragraph", text: "The best moment to ask for a video testimonial is right after the final walk-through, while satisfaction is highest. A short phone-recorded clip answering a few simple questions — was there any hesitation before booking, how did the estimate process feel, what was the work itself like, how do they feel now — produces genuinely useful marketing material, and it directly answers the objections future customers are silently having." },

      { type: "heading", text: "Service Recovery" },
      { type: "paragraph", text: "When something does go wrong: acknowledge it within an hour, take ownership without excuses, offer a real solution, and follow through completely. A well-handled complaint often turns into a more loyal customer than one who never had a problem at all." },
    ],
    implementationPlan: () => [
      { label: "Week 1 — Document the Process", items: ["Write down your current pre-job, on-site, and post-job steps", "Identify the gaps", "Build simple checklists for each stage"] },
      { label: "Week 2 — Train the Team", items: ["Walk the crew through the new checklists", "Practice the \"magic question\" out loud", "Reinforce safety and cleanup standards"] },
      { label: "Week 3 — Systemize Follow-Up", items: ["Set up same-day text/email templates", "Build a 48-hour quality-check step", "Create a direct review-request link"] },
      { label: "Week 4 — Launch & Refine", items: ["Run the full process on every job", "Collect crew and customer feedback", "Track review rate and average rating", "Adjust based on what's actually landing"] },
    ],
    checklist: () => [
      "Pre-job confirmation call happening 24-48 hours out",
      "On-site safety visibly maintained on every job",
      "The \"magic question\" asked before leaving every site",
      "Same-day follow-up text or email sent",
      "48-hour quality check in place",
      "Direct review link sent to every satisfied customer",
      "At least one video testimonial captured per month",
    ],
    keyTakeaways: (trade) => [
      "Fulfillment is a process, not a personality trait — checklists produce consistency even when the crew changes",
      "Small, low-cost touches (a clean site, a quick check-in question) drive reviews more than the quality of the work alone",
      "The 24-48 hour window after a job is when review requests actually convert",
      `A ${trade.name.toLowerCase()} job well delivered is marketing content, not just completed work — capture it while satisfaction is highest`,
    ],
  },

  upsell: {
    slug: "upsell",
    title: "Upsell",
    icon: "lucide:arrow-up-circle",
    tagline: (trade) => `Increase your average ${trade.name.toLowerCase()} ticket 30-50% by solving problems customers can't see for themselves.`,
    tldrSummary: () =>
      "A 20% increase in average ticket is a 20% revenue increase without acquiring a single new customer. The businesses that do this well aren't being pushy — they're catching things a homeowner would never think to ask about.",
    tldrBullets: (trade) => [
      `Adopt a trusted-advisor mindset: you're not "selling more," you're identifying problems the customer can't see`,
      "Walk the whole property, not just the specific thing they called about",
      `Use the "while we're here" technique to bundle related work into the same trip`,
      `Offer a recurring plan (${trade.name === "Lawn Care & Mowing" ? "a seasonal route" : "an annual or seasonal maintenance visit"}) so revenue isn't one-and-done`,
      "Train the crew, not just the salesperson, to spot and report additional opportunities",
    ],
    tldrBottomLine: () => "Build a property-walk checklist, train the team to notice (not just execute), and offer Good/Better/Best on every estimate.",
    intro: (trade, profile) => [
      {
        type: "example",
        title: "Piecemeal vs. comprehensive care",
        lines: [
          `Piecemeal: ${fmt(profile.lowJob.low)} now for the obvious issue, then ${fmt(Math.round(profile.avgJobValue * 2))} later once a related problem gets worse`,
          `Comprehensive: ${fmt(Math.round(profile.avgJobValue * 1.3))} upfront that catches everything at once — less total spend, and one visit instead of two or three`,
        ],
      },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Identifying Opportunities" },
      { type: "paragraph", text: "During the initial estimate, walk the whole property — not just the specific spot the customer mentioned — and document what you see with photos and notes. During the job itself, train crews to notice and flag additional needs, and give the crew leader authority to mention a same-visit add-on (\"while we're already set up here, we can also handle X for $Y\") rather than waiting for a callback." },

      { type: "heading", text: "The Good / Better / Best Approach" },
      {
        type: "example",
        title: `Example estimate for a ${profile.avgJobLabel}`,
        lines: [
          `Good — ${fmt(profile.avgJobValue)} (the core job)`,
          `Better — ${fmt(Math.round(profile.avgJobValue * 1.25))} (core job + one related fix)`,
          `Best — ${fmt(Math.round(profile.avgJobValue * 1.6))} (core job + related fix + a preventive add-on)`,
        ],
      },

      { type: "heading", text: "Bundling and Packages" },
      { type: "paragraph", text: `A packaged offer — combining an inspection, the core service, and a preventive add-on at a slight discount off buying them separately — increases both average ticket and the odds of ongoing, ${profile.recurringServiceLabel}-style repeat business.` },

      { type: "heading", text: "Education-Based Selling" },
      { type: "paragraph", text: "Explain the problem, the consequence of ignoring it, and the solution — in that order. People rarely resist a fix once they understand what happens if it's skipped. A quick, real example (\"we saw the same issue at a property two streets over — it turned into a much bigger repair by spring\") does more than any hard sell." },

      { type: "heading", text: "Training and Incentives" },
      { type: "paragraph", text: "Give crews simple language for flagging opportunities, and consider a small commission (5-10%) on upsold work to make it worth their attention. A monthly recognition for whoever spots the most value for customers reinforces the behavior without turning it into constant pressure." },

      { type: "heading", text: "Handling Pushback" },
      { type: "paragraph", text: "\"That's too expensive,\" \"I'll think about it,\" and \"I'll just do it myself\" are the three most common objections — each is best met by reconnecting to the actual consequence of not doing it, not by simply discounting the price." },
    ],
    implementationPlan: () => [
      { label: "Week 1 — Assessment", items: ["Review your current average ticket size", "Identify commonly missed upsell opportunities", "Build a property-walk checklist"] },
      { label: "Week 2 — Training", items: ["Train the team on comprehensive property assessments", "Practice the \"while we're here\" script", "Role-play common objections"] },
      { label: "Week 3 — Systems", items: ["Build Good/Better/Best pricing templates", "Create 1-2 bundled service packages", "Set up simple upsell tracking"] },
      { label: "Week 4+ — Launch & Optimize", items: ["Use it on every estimate", "Track results weekly", "Refine messaging based on what's actually landing", "Consider a small incentive for the team"] },
    ],
    checklist: () => [
      "Property-walk checklist used on every estimate",
      "Crew trained to flag additional opportunities",
      "Good/Better/Best pricing built for top services",
      "At least one bundled package created",
      "Objection responses scripted",
      "Average ticket tracked monthly",
    ],
    keyTakeaways: (trade, profile) => [
      "A full property walk catches revenue a narrow \"just the one thing they called about\" visit misses",
      "Three price options consistently raise average ticket more than one number ever will",
      `Bundled, recurring offers (like a ${profile.recurringServiceLabel}) turn one-off jobs into ongoing ${trade.name.toLowerCase()} revenue`,
      "The crew on-site is your best opportunity source — train them to notice, not just execute",
    ],
  },

  ascension: {
    slug: "ascension",
    title: "Ascension",
    icon: "lucide:trending-up",
    tagline: (trade) => `Move customers up a real value ladder, and evolve your ${trade.name.toLowerCase()} business from a job shop into a sellable company.`,
    tldrSummary: () =>
      "Ascension means two things: moving individual customers to higher-value tiers of service, and evolving the business itself toward higher sophistication — commercial work, recurring contracts, and eventually a company someone would actually want to buy.",
    tldrBullets: (trade) => [
      "Build a value ladder: start with a low-commitment entry point and guide customers toward higher-value, recurring services",
      "Offer real service tiers — Standard, Premium, and a VIP/concierge level — not just one flat price for everyone",
      "Evolve the business itself: from residential to commercial, from one-off labor to recurring contracts",
      `Premium service tiers (property care programs, priority contracts) can run ${fmt(5000)}–${fmt(50000)}+ a year per account`,
      "Businesses built on recurring revenue and real management systems sell for meaningfully higher multiples than owner-dependent ones",
    ],
    tldrBottomLine: () => "Build a clear value ladder, launch a premium tier for your best customers, and start developing commercial or recurring-contract offerings deliberately rather than by accident.",
    intro: () => [
      { type: "paragraph", text: "Most service businesses have an accidental value ladder — some customers happen to spend more, but there's no deliberate path guiding them there. A designed ladder converts far more of your existing base into higher-value, recurring relationships." },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Value Ladder" },
      {
        type: "bullets",
        items: [
          `Free entry point — an estimate, assessment, or useful piece of content, $0`,
          `First transaction — a one-time or emergency job, roughly ${fmt(profile.lowJob.low)}–${fmt(profile.highJob.high)}`,
          `Recurring service — a seasonal or maintenance package, ${fmt(Math.round(profile.avgJobValue * 1.5))}–${fmt(Math.round(profile.avgJobValue * 3))}/year`,
          `Comprehensive care — an annual plan bundling several services, ${fmt(Math.round(profile.commercialAnnualValue * 0.3))}+/year`,
          `Premium / concierge — priority access and a dedicated point of contact for your best clients, ${fmt(Math.round(profile.commercialAnnualValue * 0.5))}–${fmt(profile.commercialAnnualValue)}+/year`,
          "Consulting or advisory — expert assessments, insurance/legal work, or specialized projects billed at a premium",
        ],
      },

      { type: "heading", text: "Moving Customers Up" },
      { type: "paragraph", text: "The best moments to offer the next tier are right after exceptional service, when you spot an additional need during a job, at renewal time, and around life changes (a new home, a property sale, storm damage). Introduce the next tier, back it with social proof, offer a low-risk trial or discount, and address hesitation directly." },

      { type: "heading", text: "Premium Service Tiers" },
      { type: "paragraph", text: `A simple three-tier structure works well: Standard (your normal service and scheduling), Premium (priority scheduling, an annual assessment, a modest membership fee and discount), and VIP/Concierge (24/7 priority response, quarterly check-ins, direct access to you, at a meaningfully higher annual rate). Even a small share of customers moving into Premium changes your revenue mix significantly.` },

      { type: "heading", text: "Business Ascension" },
      { type: "paragraph", text: `Beyond individual customers, the business itself can ascend: from purely residential toward ${profile.commercialExample}s and other recurring commercial accounts, from one-off labor toward diversified complementary services, and eventually toward a genuinely sellable company.` },
      { type: "paragraph", text: "Commercial accounts run on thinner margins than residential work but bring real predictability — property managers, HOAs, and institutional clients pay on net-30/60 terms but commit to standing contracts, which smooths out seasonal swings most residential-only businesses struggle with." },

      { type: "heading", text: "Building a Sellable Business" },
      { type: "paragraph", text: "The factors that drive a real valuation: systematized operations that don't depend entirely on the owner, recurring revenue, a diversified customer base with no single account over 10-15% of revenue, a real management layer, and clean financials. Owner-operated businesses with none of that typically sell for 2-4x EBITDA; systematized businesses with a management team and recurring revenue can reach 6-8x." },
    ],
    implementationPlan: () => [
      { label: "Quarter 1 — Customer Ascension Foundation", items: ["Map your current value ladder", "Define 2-3 real service tiers", "Create ascension offers and pricing", "Identify customers ready to move up"] },
      { label: "Quarter 2 — Launch Premium Tiers", items: ["Introduce premium tiers to existing customers", "Train the team on ascension conversations", "Track ascension rate"] },
      { label: "Quarter 3 — Business Expansion Planning", items: ["Assess readiness for commercial or geographic expansion", "Identify 10 target commercial accounts", "Build a simple expansion plan"] },
      { label: "Quarter 4+ — Execute & Scale", items: ["Launch the expansion", "Build out management infrastructure as volume grows", "Revisit pricing and tiers annually based on data"] },
    ],
    checklist: () => [
      "Value ladder mapped from entry point to premium tier",
      "At least 2 real service tiers defined and priced",
      "Ascension conversation trained across the team",
      "10 target commercial or recurring-contract accounts identified",
      "Recurring revenue tracked as a percentage of total revenue",
      "Customer concentration checked (no single account over 10-15% of revenue)",
    ],
    keyTakeaways: (trade) => [
      "A designed value ladder converts far more existing customers into higher-value relationships than hoping it happens naturally",
      "Premium tiers don't need to be complicated — priority access and a dedicated point of contact go a long way",
      `Commercial and recurring-contract work smooths out the seasonality most ${trade.name.toLowerCase()} businesses struggle with`,
      "Systematized, recurring-revenue businesses are worth meaningfully more than owner-dependent ones, whether or not you ever plan to sell",
    ],
  },

  retention: {
    slug: "retention",
    title: "Retention",
    icon: "lucide:repeat",
    tagline: (trade) => `Repeat ${trade.name.toLowerCase()} customers are worth 3-6x more than one-time buyers — and cost far less to keep than new ones cost to acquire.`,
    tldrSummary: () =>
      "Acquiring a new customer typically costs 5-7x more than keeping an existing one. A modest improvement in retention rate compounds into a large increase in long-term profit.",
    tldrBullets: (trade, profile) => [
      `Repeat customers are worth roughly ${fmt(Math.round(profile.avgJobValue * 3))}-${fmt(Math.round(profile.avgJobValue * 6))} in lifetime value versus ${fmt(profile.avgJobValue)} for a one-time buyer`,
      "Seasonal stay-in-touch campaigns (email/text) keep you top of mind between jobs",
      "A simple loyalty structure — a discount or an annual plan — gives customers a reason to stay rather than shop around next time",
      "A referral incentive turns happy repeat customers into a low-cost acquisition channel",
      "Following up 6-12 months after a job, before they've thought to call you, is what actually drives the next booking",
    ],
    tldrBottomLine: () => "Build a customer database, set up seasonal follow-up campaigns, and launch a simple maintenance plan or referral program — retention is mostly a systems problem, not a relationship-luck problem.",
    intro: (trade, profile) => [
      {
        type: "example",
        title: "Why retention rate matters so much",
        lines: [
          "Starting from 100 new customers a year at a 30% retention rate (industry average), year-5 revenue is meaningfully lower than the same starting point at a 60% retention rate (top performers)",
          "Doubling retention from 30% to 60% can increase year-5 revenue by well over half, from the exact same new-customer acquisition effort",
        ],
      },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Foundation: Retention-Worthy Service" },
      { type: "paragraph", text: "Retention starts with the moments that actually shape how a customer remembers you: the first job experience, how quickly and gracefully any problem gets resolved, and small unexpected touches that cost little but get remembered." },

      { type: "heading", text: "Maintenance and Service Plans" },
      {
        type: "example",
        title: "A simple two-tier plan structure",
        lines: [
          `Basic — an annual check-in plus priority scheduling and a small discount, roughly ${fmt(Math.round(profile.avgJobValue * 0.25))}–${fmt(Math.round(profile.avgJobValue * 0.4))}/year`,
          `Premium — more frequent visits, a bigger discount, and priority emergency response, roughly ${fmt(Math.round(profile.avgJobValue * 0.6))}–${fmt(Math.round(profile.avgJobValue * 1.2))}/year`,
        ],
      },

      { type: "heading", text: "Communication Cadence" },
      { type: "paragraph", text: "A short post-service follow-up sequence — a quality check within days, a thank-you and review request within a week, then check-ins at 3, 6, and 12 months — keeps the relationship active without being intrusive. Seasonal reminders tied to the actual calendar (spring prep, storm season, winter maintenance) tend to land as genuinely useful rather than salesy." },

      { type: "heading", text: "Loyalty and Referral Rewards" },
      { type: "paragraph", text: "A simple points system or a tiered membership (based on lifetime spend, with better discounts and priority at higher tiers) gives customers a reason to keep choosing you specifically. A straightforward referral credit — for both the referrer and the new customer — turns your best customers into an acquisition channel that costs a fraction of paid ads." },

      { type: "heading", text: "Proactive Win-Back" },
      { type: "paragraph", text: "Watch for the early signs of an at-risk customer: declining engagement, an unresolved service issue, or a life change like moving or selling the property. A short win-back sequence — a \"we miss you\" message, a real offer, and a direct \"what could we have done better\" ask — recovers a meaningful share of customers who were simply drifting, not lost for good." },
    ],
    implementationPlan: () => [
      { label: "Month 1 — Foundation", items: ["Audit your current retention rate", "Implement a post-service follow-up sequence", "Build a proper customer database"] },
      { label: "Month 2 — Communication", items: ["Launch a seasonal communication calendar", "Set up email/text automation", "Start requesting reviews systematically"] },
      { label: "Month 3 — Programs", items: ["Launch a maintenance plan offering", "Create a referral incentive", "Segment customers by value and engagement"] },
      { label: "Month 4+ — Optimize", items: ["Analyze retention data for trends", "Launch a win-back campaign for at-risk customers", "Consider a tiered loyalty structure for top customers"] },
    ],
    checklist: () => [
      "Customer database with service history in place",
      "Post-service follow-up sequence automated",
      "Seasonal communication calendar built",
      "At least one maintenance/service plan offered",
      "Referral incentive live and promoted",
      "Win-back sequence built for at-risk customers",
      "Retention rate tracked annually",
    ],
    keyTakeaways: (trade) => [
      "Retention is dramatically cheaper than acquisition — a modest improvement compounds into significant long-term revenue",
      "Systematic follow-up, not memory or luck, is what actually keeps customers coming back",
      "A maintenance plan converts one-time jobs into predictable recurring revenue",
      `Referrals from happy, repeat ${trade.name.toLowerCase()} customers close far better and cost far less than paid acquisition`,
    ],
  },

  operations: {
    slug: "operations",
    title: "Operations",
    icon: "lucide:settings",
    tagline: (trade) => `Crew, equipment, scheduling, and cash flow — the operational backbone that lets a ${trade.name.toLowerCase()} business scale without falling apart.`,
    tldrSummary: () =>
      "Growth doesn't fail because of a lack of leads — it fails because operations can't keep up with them. Crew management, equipment maintenance, smart scheduling, and real financial tracking are what let a business scale profitably instead of just getting busier and less profitable.",
    tldrBullets: (trade, profile) => [
      "Crew management is everything: hire for attitude, train for skill, and build a real career path so good people stay",
      "Preventive equipment maintenance prevents the disasters that quietly eat a whole month's profit",
      "Smart scheduling — clustering jobs geographically and prioritizing by margin — recovers hours of lost drive time every week",
      `Know your true cost per hour (loaded at roughly ${fmt(profile.crewHourlyCost)}/hour for a ${trade.name.toLowerCase()} crew) so every job is priced to actually make money`,
      "Track cash flow weekly, not just profit monthly — a profitable month can still leave you cash-short",
    ],
    tldrBottomLine: () => "Fix crew hiring and training first, then equipment maintenance, then scheduling efficiency, then the financial tracking that ties it all together.",
    intro: () => [
      { type: "paragraph", text: "Most owners chase more leads when the business is actually straining at the seams operationally. More leads on top of an inefficient operation just means more chaos, not more profit." },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Crew Management" },
      { type: "paragraph", text: "Hire for attitude and coachability — technical skill can be trained, work ethic and reliability are much harder to install after the fact. A structured onboarding (safety and orientation in week one, hands-on shadowing for the first month, real skill development over the next quarter) sets the tone for everything that follows." },
      { type: "paragraph", text: "Regular one-on-ones with a real career path — ground crew to lead, lead to supervisor — reduce the turnover that quietly costs far more than most owners realize once you account for hiring and retraining. A simple weekly toolbox talk plus monthly skills workshops keep standards from slipping." },

      { type: "heading", text: "Equipment: Maximizing Uptime" },
      { type: "paragraph", text: "A quick daily pre-use inspection catches small issues before they become a truck or a major piece of equipment down for a week. Track a real replacement schedule — when repair costs consistently exceed a meaningful share of replacement cost, it's time to replace, not keep patching." },

      { type: "heading", text: "Scheduling for Profit, Not Just Fullness" },
      { type: "paragraph", text: "A fully booked schedule isn't the same as a profitable one. Prioritize jobs by a combination of margin and geographic proximity — a cluster of closer, higher-margin jobs almost always beats a scattered set of lower-margin ones, even if the total revenue looks similar on paper." },
      {
        type: "example",
        title: "Same day, two different schedules",
        lines: [
          `Option A — geographically clustered, prioritized by margin: higher total profit for the day`,
          `Option B — same total jobs, but scattered and unprioritized: meaningfully lower profit from extra drive time and lower-margin jobs eating the schedule`,
        ],
      },
      { type: "paragraph", text: "Watch your booking window too — customers who book 6+ weeks out cancel at a much higher rate than those booked within 2-3 weeks. Build in a bit of flexible capacity for slower stretches rather than pushing everyone out to a distant date." },

      { type: "heading", text: "The Numbers That Matter" },
      {
        type: "formula",
        text: "Billable Rate = (Labor + Equipment + Overhead per hour) × (1 + target margin)",
      },
      {
        type: "example",
        title: "Cost-plus pricing worked out",
        lines: [
          `Loaded labor: ${fmt(profile.crewHourlyCost)}/hour`,
          `Equipment + overhead: roughly ${fmt(Math.round(profile.crewHourlyCost * 0.5))}/hour`,
          `Total cost: ${fmt(Math.round(profile.crewHourlyCost * 1.5))}/hour — at a 25% margin, billable rate should be roughly ${fmt(Math.round(profile.crewHourlyCost * 1.5 * 1.25))}/hour`,
        ],
      },
      { type: "paragraph", text: "Track revenue per crew, revenue per billable hour, and utilization rate (target 70-85% billable). If those numbers aren't visible weekly, problems compound for months before anyone notices." },

      { type: "heading", text: "Cash Flow Management" },
      { type: "paragraph", text: "A business can be profitable on paper and still run out of cash if payment terms and job costs are mismatched — deposits on larger jobs, prompt invoicing, and a disciplined follow-up cadence on anything unpaid past 7-14 days keep this from becoming a real problem. Keep 2-3 months of operating expenses in reserve if at all possible." },
    ],
    implementationPlan: () => [
      { label: "Month 1 — Assessment", items: ["Document current processes end to end", "Identify the biggest pain points", "Benchmark your key numbers (utilization, revenue per crew, margin)"] },
      { label: "Month 2 — Quick Wins", items: ["Fix the easiest, highest-impact inefficiencies", "Start tracking key metrics weekly", "Establish a regular team meeting cadence"] },
      { label: "Month 3 — Systems", items: ["Evaluate scheduling/CRM software if you don't have it", "Implement a preventive maintenance schedule", "Set a weekly financial reporting habit"] },
      { label: "Month 4+ — Scale", items: ["Refine processes based on real data", "Build out a management layer as volume grows", "Revisit pricing against your true cost per hour"] },
    ],
    checklist: () => [
      "Structured onboarding process in place",
      "Regular one-on-ones and a career path defined",
      "Daily equipment inspection habit in place",
      "Jobs scheduled by margin + geography, not just availability",
      "True cost per hour calculated and pricing checked against it",
      "Cash flow reviewed weekly, not just monthly",
      "2-3 months of operating reserve targeted",
    ],
    keyTakeaways: (trade) => [
      "Operational capacity, not lead volume, is usually the real constraint on growth",
      "Hire for attitude and build a real training and career path — turnover is more expensive than most owners realize",
      "Schedule by margin and geography, not just by whoever called first",
      `Know your true loaded cost per hour so every ${trade.name.toLowerCase()} job is priced to actually make money, not just stay busy`,
    ],
  },

  "business-leverage-financing": {
    slug: "business-leverage-financing",
    title: "Business Leverage & Financing",
    icon: "lucide:landmark",
    tagline: (trade) => `How to use strategic debt to scale a ${trade.name.toLowerCase()} business faster — without the cash flow trap that sinks fast-growing companies.`,
    tldrSummary: () =>
      "Debt used well is a growth tool. Debt used carelessly is how profitable, busy companies go under. This is the difference between the two, and the specific ways smart leverage — customer-financed growth, equipment financing, and working capital — actually work.",
    tldrBullets: (trade, profile) => [
      "Customer Financed Acquisition (CFA): use the cash from new customers to pay for acquiring the next ones — enables growth without outside capital",
      "Aim for a payback period under 30 days: structure offers so the upfront payment covers your acquisition cost",
      "Equipment financing works when the asset pays for itself — buy income-generating equipment with debt, then pay it off with the revenue it generates",
      "Debt is a tool, not a burden, when used on assets that generate more than the payment",
      "Understand the difference between profit and cash flow — a profitable month can still leave you cash-short if timing is off",
    ],
    tldrBottomLine: () => "Calculate your CAC, LTGP, and payback period; structure offers to hit a sub-30-day payback; and only finance equipment that clearly pays for itself.",
    intro: () => [
      { type: "paragraph", text: "This is the same Customer Financed Acquisition framework used to scale service businesses without ever raising outside capital: use the cash flow from customers you already have to fund acquiring the next ones." },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Three Levers of CFA" },
      { type: "paragraph", text: `Lever 1 — Cost to Acquire a Customer (CAC): total marketing spend divided by customers acquired. Target CAC under 20% of your average job value — for a ${fmt(profile.avgJobValue)} job, that's roughly ${fmt(Math.round(profile.avgJobValue * 0.2))} or less.` },
      { type: "paragraph", text: "Lever 2 — Lifetime Gross Profit (LTGP): total profit a customer generates over the relationship, not just the first job. Target LTGP at least 5x your CAC." },
      { type: "paragraph", text: "Lever 3 — Payback Period: CAC divided by average monthly profit per customer. The goal is under 30 days, ideally instant — meaning the first payment alone covers what it cost to acquire that customer." },

      { type: "heading", text: "CFA in Action" },
      {
        type: "example",
        title: "A simple CFA loop",
        lines: [
          `Spend on marketing to acquire a batch of customers at a modest CAC per customer`,
          `Those customers pay upfront for a ${profile.avgJobLabel}, generating real gross profit`,
          "Reinvest that profit into acquiring the next batch",
          "Repeat — this compounds without ever needing outside capital, as long as the payback period stays short",
        ],
      },
      { type: "paragraph", text: "Ways to shorten payback: collect a meaningful deposit upfront, lead with your highest-ticket services, offer a same-visit upsell at the estimate, or offer third-party financing so the customer pays nothing upfront while you still get paid in full immediately." },

      { type: "heading", text: "Equipment Financing" },
      { type: "paragraph", text: `Financing makes sense when the asset clearly pays for itself: it replaces a recurring cost (subcontracting, renting) or unlocks new revenue, and the monthly payment is comfortably less than the extra profit it generates.` },
      {
        type: "example",
        title: "Worked example",
        lines: [
          "A piece of equipment financed with a modest down payment and a 4-5 year term",
          "Replaces a recurring rental or subcontractor cost each month",
          "Net monthly profit after the loan payment comfortably exceeds the down payment within a matter of months",
        ],
      },

      { type: "heading", text: "Working Capital & Cash Flow" },
      { type: "paragraph", text: "A working capital loan makes sense for bridging a real, known gap — payroll during a slow season, or the gap between finishing a job and getting paid on it. It's a bad idea when it's covering an ongoing loss rather than a timing gap. The core trap: profit and cash flow are not the same thing. A big month of booked, profitable work can still leave you cash-short if customer payment terms lag behind what you owe your crew and suppliers." },
      { type: "paragraph", text: "A rolling 13-week cash flow forecast — cash in, cash out, and running balance — catches this before it becomes an emergency." },

      { type: "heading", text: "Using Debt Safely" },
      {
        type: "bullets",
        items: [
          "Only borrow for assets that generate income, not for covering an ongoing shortfall",
          "Make sure the asset's return clearly covers the payment, with margin to spare",
          "Keep 2-3 months of cash reserve on hand",
          "Cap total debt at roughly 30% of annual revenue",
          "Have a concrete repayment plan before you borrow, not after",
        ],
      },
    ],
    implementationPlan: () => [
      { label: "Weeks 1-2 — Foundation", items: ["Calculate your current CAC, LTGP, and payback period", "Build a 13-week cash flow forecast", "Identify equipment or marketing investments that would clearly pay for themselves"] },
      { label: "Weeks 3-4 — CFA Implementation", items: ["Structure one offer to hit a sub-30-day payback (deposit, financing option, or upsell)", "Test it on one marketing channel", "Track CAC and payback period closely"] },
      { label: "Weeks 5-8 — Equipment Financing", items: ["Identify equipment that would clearly pay for itself", "Run the ROI math before applying", "Finance and track the actual revenue impact"] },
      { label: "Ongoing — Scale Safely", items: ["Reinvest profit into acquisition using the CFA model", "Keep debt-to-revenue under 30%", "Maintain a 2-3 month cash reserve at all times"] },
    ],
    checklist: () => [
      "CAC, LTGP, and payback period calculated",
      "13-week cash flow forecast built and maintained",
      "At least one offer structured for sub-30-day payback",
      "Equipment financing decisions run through a clear ROI check first",
      "Debt-to-revenue ratio tracked and kept under 30%",
      "2-3 month cash reserve maintained",
    ],
    keyTakeaways: (trade) => [
      "Customer Financed Acquisition lets a business scale using its own cash flow instead of outside capital",
      "A sub-30-day payback period is the real goal — the faster you're repaid, the faster you can reinvest",
      "Finance equipment only when the numbers clearly show it pays for itself",
      "Profit and cash flow are different things — a rolling cash flow forecast catches the gap before it becomes a crisis",
    ],
  },

  "content-marketing-social-media": {
    slug: "content-marketing-social-media",
    title: "Content Marketing & Social Media",
    icon: "lucide:megaphone",
    tagline: (trade) => `The exact content mix, posting schedule, and engagement tactics that turn organic social into real ${trade.name.toLowerCase()} leads.`,
    tldrSummary: () =>
      "Content marketing is the most underused lead channel for local service businesses. Facebook and Instagram alone can generate 20-50 qualified leads a month organically, for the cost of a phone and some consistency.",
    tldrBullets: (trade) => [
      "Facebook and Instagram should get the majority of your content effort for a local service business — they're built for local targeting and visual proof",
      "Video content gets far more engagement than photos — before/afters, educational clips, and behind-the-scenes footage all perform well",
      "An \"Engage + DM\" habit (friend-request and message anyone who engages, with a personalized offer) turns passive followers into booked jobs",
      "Consistency beats perfection — a smartphone video posted 3-5x a week beats a polished video posted once a month",
      "Different platforms need different content — what works on TikTok falls flat on LinkedIn, and vice versa",
    ],
    tldrBottomLine: () => "Put 80% of your content effort into Facebook and Instagram, post consistently with a real mix of before/afters, education, and behind-the-scenes, and actively engage rather than just posting and waiting.",
    intro: () => [
      { type: "paragraph", text: "Facebook and Instagram outperform every other platform for local service businesses because of local targeting, the visual nature of before/after work, an older homeowner demographic, and genuinely useful business tools." },
    ],
    sections: (trade) => [
      { type: "heading", text: "The Content Mix" },
      {
        type: "bullets",
        items: [
          "Before/after photos or carousels — roughly twice a week",
          "Educational content (a tip, a common mistake, a seasonal reminder) — roughly twice a week",
          "Behind-the-scenes video from an actual job — about once a week",
          "Customer testimonials — about once a week",
          "Seasonal or promotional posts — as relevant",
        ],
      },
      { type: "paragraph", text: "A simple 5-3-2 rule keeps the mix healthy: for every 10 posts, roughly 5 educational, 3 promotional, and 2 personal/behind-the-scenes." },

      { type: "heading", text: "The 3-Shot Video Framework" },
      { type: "paragraph", text: "Hook in the first 3 seconds, deliver real value for the next 20-50 seconds, then a clear call to action in the last 5-10 seconds. This structure works across Reels, TikTok, and YouTube Shorts with only minor tweaks." },

      { type: "heading", text: "The \"Engage + DM\" Strategy" },
      { type: "paragraph", text: "Friend-request or follow-back everyone who meaningfully engages with your content, then send a short, personalized direct message — not a hard pitch, just a genuine offer relevant to what they engaged with. This consistently converts a real share of engaged followers into booked estimates, at essentially zero ad cost." },

      { type: "heading", text: "Platform Notes" },
      { type: "paragraph", text: "YouTube works well for longer project walkthroughs and educational content that keeps generating views long after posting. TikTok rewards fast, satisfying, or dramatic clips more than polish. LinkedIn is worth a modest, separate effort if you're pursuing commercial or property-management clients — case studies and industry insight land better there than anywhere else." },

      { type: "heading", text: "Tracking What Actually Works" },
      { type: "paragraph", text: "Track leads generated by platform, not just likes and follower count — a unique phone number or a simple \"how did you hear about us\" question at booking tells you which platform is actually producing revenue, not just engagement." },
    ],
    implementationPlan: () => [
      { label: "Week 1 — Foundation", items: ["Set up or clean up profiles on Facebook, Instagram, and YouTube", "Optimize bios with phone number, website, and location", "Build a simple content calendar"] },
      { label: "Week 2 — Content Batch", items: ["Record 10-15 short videos from current jobs", "Take 50+ photos across categories", "Write out a week of captions in advance"] },
      { label: "Week 3 — Engagement", items: ["Start the Engage + DM habit daily", "Join relevant local community groups and contribute genuinely", "Respond to every comment and DM within 24 hours"] },
      { label: "Week 4+ — Optimize", items: ["Review what content actually drove leads", "Double down on the best-performing formats", "Keep a consistent 3-5x/week posting cadence going forward"] },
    ],
    checklist: () => [
      "Business profiles set up and optimized on Facebook, Instagram, and YouTube",
      "Content calendar built with a real content mix",
      "At least 10 videos and 50 photos in a content bank",
      "Engage + DM habit running daily",
      "Leads tracked by platform, not just engagement",
      "Posting consistently 3-5x/week"
    ],
    keyTakeaways: (trade) => [
      "Facebook and Instagram deserve the majority of a local service business's content effort",
      "Video consistently outperforms static photos for engagement and trust-building",
      "Engage + DM turns passive followers into booked jobs — it's the step most businesses skip",
      "Consistency beats production value — post 3-5x a week with a phone rather than once a month with a crew",
    ],
  },

  "ai-powered-marketing": {
    slug: "ai-powered-marketing",
    title: "AI-Powered Marketing",
    icon: "lucide:sparkles",
    tagline: (trade) => `Use AI to 10x your ${trade.name.toLowerCase()} marketing output without a marketing team.`,
    tldrSummary: () =>
      "AI tools let a small operator produce the volume of content and follow-up that used to require a whole marketing department — ad copy, blog posts, social captions, and instant lead responses, all in a fraction of the time.",
    tldrBullets: (trade) => [
      "AI content creation: draft blog posts, social captions, email sequences, and ad copy in minutes instead of hours",
      "AI lead response: automated chat and email follow-up can respond to a new lead in under a minute, any time of day",
      "AI image generation: create marketing visuals and social graphics without a designer",
      "AI ad testing: generate and test many ad variations at once, and let the data pick the winner",
      "Bottom line: this can realistically cut weekly marketing time from 15-20 hours down to 1-2, while producing more content than before",
    ],
    tldrBottomLine: () => "Start with a written knowledge base about your business, learn to prompt well, and use AI for content creation and instant lead response first — those two alone save the most time.",
    intro: (trade) => [
      { type: "paragraph", text: `Competitors are already using AI to post more often, run more ad variations, and follow up faster than a small ${trade.name.toLowerCase()} business can do by hand. The gap isn't which specific tool you use — tools change every few months — it's whether you've built the underlying skill of using them well.` },
    ],
    sections: (trade) => [
      { type: "heading", text: "The Prompting Framework" },
      { type: "paragraph", text: "Every good AI prompt has three parts: Context (who you are — company name, location, credentials, specialization, target customer, brand voice), a Specific Task (exactly what you want and how long it should be), and Constraints (tone, what must be included, what to avoid). A vague prompt gets a vague, generic result; a specific one gets something close to usable on the first try." },

      { type: "heading", text: "Building a Knowledge Base" },
      { type: "paragraph", text: `Write up a simple reference document once: company information, your specific ${trade.name.toLowerCase()} expertise and common local issues, your ideal customer profile, your brand voice, and your best proof points (testimonials, credentials, before/afters). Paste relevant pieces of this into every AI prompt so the output actually sounds like your business, not a generic template.` },

      { type: "heading", text: "Where AI Saves the Most Time" },
      {
        type: "bullets",
        items: [
          "Blog posts and educational content — drafted in minutes, then lightly edited rather than written from scratch",
          "Social captions and a month of content ideas — generated in one sitting instead of daily scrambling",
          "Ad copy variations — testing 5-10 headlines at once instead of guessing at one",
          "Instant lead response — a chatbot or auto-responder that engages a new lead within a minute, even after hours",
          "Follow-up email sequences — personalized at scale instead of one generic template for everyone",
        ],
      },

      { type: "heading", text: "Common Mistakes" },
      {
        type: "bullets",
        items: [
          "Publishing AI output without editing it — always give it a real human pass",
          "Giving too little context and expecting a great result anyway",
          "Expecting a perfect result on the first try instead of iterating",
          "Ignoring your own brand voice and letting everything sound generic",
          "Never testing or measuring what the content actually produces",
        ],
      },
    ],
    implementationPlan: () => [
      { label: "Week 1 — Foundation", items: ["Write your business knowledge base document", "Pick one or two AI tools to start with", "Practice the prompting framework on 10 real prompts", "Generate a month of social content"] },
      { label: "Week 2 — Advertising", items: ["Generate several ad variations for your top service", "Write a few Google ad headline/description sets", "Draft landing page copy for your top 2-3 services"] },
      { label: "Week 3 — Content Marketing", items: ["Draft 3-4 blog posts and publish them", "Write out a season of email content", "Build an FAQ section for your website"] },
      { label: "Week 4 — Automation", items: ["Build a short lead nurture sequence and load it into your CRM", "Write SMS follow-up templates", "Set up basic review-response templates"] },
    ],
    checklist: () => [
      "Written knowledge base document exists",
      "Comfortable with the Context / Task / Constraints prompting framework",
      "A month of social content generated in advance",
      "At least one ad campaign has AI-generated variations being tested",
      "3+ blog posts published using AI as a first draft",
      "An automated first-response message live for new leads",
      "Everything published gets a human edit pass before going live",
    ],
    keyTakeaways: (trade) => [
      "The specific AI tool matters less than the underlying skill of prompting well with real context",
      "A written knowledge base is what makes AI output sound like your business instead of a generic template",
      "Instant AI-assisted lead response is one of the highest-leverage use cases — it directly improves speed to lead",
      "Always edit AI output before it goes out — it's a fast first draft, not a finished, ready-to-publish piece",
    ],
  },
};
