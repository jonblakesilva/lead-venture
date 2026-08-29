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
    tagline: (trade, profile) => `${profile.differentiator} This playbook is the math behind how they get there.`,
    tldrSummary: (trade, profile) =>
      `${profile.warStory} That's the difference between a busy ${trade.name.toLowerCase()} operation and a profitable one — and it comes down to five numbers, not luck.`,
    tldrBullets: (trade, profile) => [
      `Customer Financed Acquisition: a ${profile.avgJobLabel} paid up front should cover what it cost to win that customer, funding the next one without a loan`,
      `Real costs like ${profile.terminology[2]} and ${profile.terminology[3]} — track them or your COGS number is fiction`,
      `Target 40-55% COGS on a ${trade.name.toLowerCase()} job, which usually means ${profile.crewHourlyCost >= 60 ? "keeping loaded labor cost disciplined" : "keeping fuel, materials, and disposal costs tracked job by job"}`,
      `Landing ${profile.commercialExample} changes your LTGP math by an order of magnitude over a one-off job`,
      profile.differentiator,
    ],
    tldrBottomLine: (trade, profile) =>
      `Calculate LTGP and CAC for both a ${profile.lowJob.label} and a ${profile.highJob.label}, then go after ${profile.commercialExample}-type accounts once you know what they're actually worth over time — that's how a ${trade.name.toLowerCase()} business scales without outside capital.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `${profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1)}. That's the kind of investment that actually pays for itself — most others don't, and most ${trade.name.toLowerCase()} owners can't tell the difference without doing the math first.` },
      { type: "heading", text: "Busy Isn't the Same as Profitable" },
      { type: "paragraph", text: `${profile.seasonalNote} A crew running flat-out and a bank account that's always thinner than it should be is the most common complaint in this trade — and it's almost never a leads problem.` },
      {
        type: "bullets",
        items: [
          `Not knowing the real margin on a ${profile.avgJobLabel} versus a ${profile.highJob.label}`,
          `Not knowing what it actually costs to win a customer through ${profile.topChannel.split(":")[0].toLowerCase()}`,
          `Not knowing what ${profile.commercialExample} is worth compared to a one-off residential job`,
          `Pricing a ${profile.terminology[5]} job off what feels competitive instead of what the numbers actually say`,
        ],
      },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: `What Actually Moves the Needle in ${trade.name}` },
      {
        type: "bullets",
        items: [
          `COGS — ${profile.terminology[0]} and ${profile.terminology[1]}-related cost on a real job`,
          `Gross and Net Profit — what's left after ${profile.terminology[2]} and after overhead`,
          `CAC — what a customer through ${profile.topChannel.split(":")[0].toLowerCase()} costs to win`,
          `LTGP — what a customer is worth once a ${profile.recurringServiceLabel} is in the mix, not just the first invoice`,
        ],
      },

      { type: "heading", text: "COGS: What a Job Really Costs" },
      { type: "paragraph", text: `COGS is crew labor, ${profile.terminology[0]}-related materials or equipment wear, and disposal or subcontractor cost. ${profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1)} usually pays for itself just by making that number easier to track job to job.` },
      {
        type: "example",
        title: `A ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}`,
        lines: [
          `Labor: ${fmt(Math.round(profile.avgJobValue * 0.24))} (crew hours at a ${fmt(profile.crewHourlyCost)}/hour loaded cost)`,
          `Materials/equipment: ${fmt(Math.round(profile.avgJobValue * 0.12))}`,
          `Disposal/subcontractors: ${fmt(Math.round(profile.avgJobValue * 0.14))}`,
          `Total COGS: ${fmt(Math.round(profile.avgJobValue * 0.5))} — Gross Profit: ${fmt(Math.round(profile.avgJobValue * 0.5))} (50% margin)`,
        ],
      },

      { type: "heading", text: "Gross Profit and Net Profit" },
      { type: "formula", text: "Gross Profit = Revenue − COGS" },
      { type: "formula", text: "Net Profit = Gross Profit − Overhead" },
      { type: "paragraph", text: `Overhead is rent, insurance, marketing, admin payroll, and whatever ${profile.terminology[2]}-adjacent software or licensing your ${trade.name.toLowerCase()} operation runs on. Most ${trade.name.toLowerCase()} businesses land in the 45-60% Gross / 10-20% Net range once COGS is under control — below 10% net, even a fully booked season isn't actually funding growth, it's just funding payroll.` },

      { type: "heading", text: "CAC: What a Customer Actually Costs You" },
      { type: "formula", text: "CAC = Total Marketing Spend ÷ Number of New Customers" },
      { type: "paragraph", text: `For a ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}, target CAC of ${fmt(Math.round(profile.avgJobValue * 0.1))}–${fmt(Math.round(profile.avgJobValue * 0.2))}. ${profile.topChannel}` },

      { type: "heading", text: "LTGP: The Number That Changes How You Bid" },
      { type: "formula", text: "LTGP = (Average Job Value × Gross Margin) × Number of Jobs Over the Relationship" },
      {
        type: "example",
        title: "One-off residential customer",
        lines: [
          `${fmt(profile.avgJobValue)} at 50% margin = ${fmt(Math.round(profile.avgJobValue * 0.5))} Gross Profit`,
          `2-3 jobs ≈ ${fmt(Math.round(profile.avgJobValue * 0.5 * 2.5))} LTGP`,
        ],
      },
      {
        type: "example",
        title: profile.commercialExample,
        lines: [
          `${fmt(profile.commercialAnnualValue)}/year at 50% margin = ${fmt(Math.round(profile.commercialAnnualValue * 0.5))} Gross Profit/year`,
          `5 years ≈ ${fmt(Math.round(profile.commercialAnnualValue * 0.5 * 5))} LTGP`,
        ],
      },
      { type: "paragraph", text: `${profile.terminology[0].charAt(0).toUpperCase() + profile.terminology[0].slice(1)} and ${profile.terminology[4]} both matter less here than the gap above — you can afford 30-50% of LTGP to win ${profile.commercialExample}, which usually means outbidding every competitor still pricing off the first invoice.` },

      { type: "heading", text: "Customer Financed Acquisition (CFA)" },
      { type: "paragraph", text: `A new customer pays up front for a ${profile.avgJobLabel}; roughly half of that comes back as Gross Profit; that profit buys the next customer. ${profile.terminology[3]} work is exactly the kind of job that shortens this loop, since a fast payback beats a bigger job that takes months to pay for itself.` },

      { type: "heading", text: "Why Premium Clients Get Premium Service" },
      { type: "paragraph", text: profile.crewNote },

      { type: "heading", text: "Where High-Tier Clients Actually Come From" },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response}` },
      {
        type: "bullets",
        items: [
          profile.commercialExample.charAt(0).toUpperCase() + profile.commercialExample.slice(1),
          `Standing ${profile.terminology[4]}-adjacent contracts instead of one-off bidding`,
          profile.differentiator,
          profile.topChannel,
        ],
      },
    ],
    implementationPlan: (trade, profile) => [
      { label: `Week 1 — Cost a Real ${profile.avgJobLabel}`, items: [`Pull labor, ${profile.terminology[1]}, and disposal cost on 10 recent jobs`, "Turn that into real Gross and Net margins", "Calculate CAC from actual spend, not a guess", `LTGP: one-off job vs. ${profile.commercialExample}`] },
      { label: "Weeks 2-3 — Fix the Offer", items: ["Test a 10-20% price increase", `Roll out a ${profile.recurringServiceLabel}`, `Bundle in one ${profile.terminology[4]}-related add-on as a standard upsell`] },
      { label: "Weeks 4-5 — Bring CAC Down", items: [`Tighten ${profile.topChannel.split(":")[0].toLowerCase()} targeting`, `Fix the objection around "${profile.commonObjection.objection.replace(/"/g, "")}" before it costs you the job`, "Ask every closed job for a referral"] },
      { label: "Week 6+ — Reinvest", items: [`Put roughly half of Gross Profit back into ${profile.topChannel.split(":")[0].toLowerCase()}`, "Track payback monthly", "Scale once payback is under 3 months"] },
      { label: `Ongoing — Win ${profile.commercialExample}`, items: [`Build a list of 10 real prospects`, `${profile.crewNote}`, "Bid against LTGP, not the first invoice"] },
    ],
    checklist: (trade, profile) => [
      `Real COGS calculated on actual ${profile.avgJobLabel} jobs`,
      `Gross and Net margin calculated, with ${profile.terminology[2]} costed in`,
      "CAC calculated from actual spend",
      `LTGP calculated: one-off vs. ${profile.commercialExample}`,
      "Tested a 10-20% price increase",
      `Rolled out a ${profile.recurringServiceLabel}`,
      `CAC brought down through ${profile.topChannel.split(":")[0].toLowerCase()}`,
      `Ready with an answer to "${profile.commonObjection.objection.replace(/"/g, "")}"`,
      `Actively pursuing ${profile.commercialExample}`,
    ],
    keyTakeaways: (trade, profile) => [
      `For a ${trade.name.toLowerCase()} business, COGS, Gross Profit, CAC, and LTGP on a real ${profile.avgJobLabel} beat gut-feel pricing every time`,
      `A ${profile.avgJobLabel} paid up front should fund winning the next customer, not just cover the job`,
      profile.differentiator,
      `Landing ${profile.commercialExample} is worth far more over time than the first invoice suggests`,
      profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
    ],
  },

  "lead-generation": {
    slug: "lead-generation",
    title: "Lead Generation",
    icon: "lucide:target",
    tagline: (trade, profile) => profile.topChannel,
    tldrSummary: (trade, profile) =>
      `${profile.differentiator} That's not luck — it's whichever channel actually fits how ${trade.name.toLowerCase()} customers search and decide, run consistently instead of guessed at.`,
    tldrBullets: (trade, profile) => [
      profile.topChannel,
      `${profile.seasonalNote}`,
      `Target cost-per-lead at 10-15% of a ${fmt(profile.avgJobValue)} ${profile.avgJobLabel} — ${fmt(Math.round(profile.avgJobValue * 0.1))}–${fmt(Math.round(profile.avgJobValue * 0.15))}`,
      `Referrals close far better than cold leads and cost a fraction of paid ${profile.topChannel.split(":")[0].toLowerCase()}`,
      `A drone or live-video post from a real ${profile.avgJobLabel} job, followed by a DM to everyone who engages, turns online attention into actual conversations`,
      `Local Facebook group ads, direct mail around a finished ${profile.avgJobLabel}, and CTV are worth testing — most ${trade.name.toLowerCase()} companies never try them, so there's less competition for attention`,
      profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
    ],
    tldrBottomLine: (trade, profile) =>
      `Get the channel behind "${profile.topChannel.split(":")[0]}" dialed in first, then layer paid ads and a referral system on top — in that order, over the next 30 days.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: profile.warStory },
      { type: "heading", text: "Where This Trade's Customers Actually Start Looking" },
      { type: "paragraph", text: `${profile.topChannel} Everything else in this playbook is secondary to getting that one channel right first.` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Google Business Profile" },
      {
        type: "bullets",
        items: [
          "Every category filled in, not just one",
          `50+ real ${profile.terminology[0]}-related job photos, uploaded weekly: before/after, crew, equipment, finished work`,
          "Reviews requested within 2-3 days of completion, every review answered within 24 hours",
          `A weekly post — a ${profile.terminology[1]} tip, a seasonal reminder, a finished job`,
        ],
      },
      { type: "paragraph", text: `${profile.seasonalNote}` },

      { type: "heading", text: "Website Conversion" },
      { type: "paragraph", text: `Each service page needs a clear headline, a process overview, ${profile.terminology[2]}-level trust signals, a real price range, and one obvious call to action — plus a page per area if you cover more than one.` },

      { type: "heading", text: "Paid Advertising" },
      { type: "paragraph", text: `"${profile.avgJobLabel} near me" is a ready-to-book search, not a browsing one.` },
      {
        type: "example",
        title: "Budget split",
        lines: [
          "40% on urgent/emergency-intent campaigns",
          "35% on your core, highest-margin service",
          "25% on everything else",
          `Target cost-per-lead: ${fmt(Math.round(profile.avgJobValue * 0.1))}–${fmt(Math.round(profile.avgJobValue * 0.15))} for a ${fmt(profile.avgJobValue)} job`,
        ],
      },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response}` },

      { type: "heading", text: "Content That Turns Engagement Into Leads" },
      { type: "paragraph", text: profile.visualContentIdea },
      {
        type: "bullets",
        items: [
          `A Live video from an active ${profile.avgJobLabel} job — customer's OK first — shows real ${profile.terminology[0]} in progress, the kind of proof a static photo can't match.`,
          `Engaged with a post like that? DM a quick thank-you, then ask softly: "Not sure if you know anyone who needs ${profile.avgJobLabel} work, but we're running [current offer] right now." That's the whole pitch for a ${trade.name.toLowerCase()} lead — nothing pushier.`,
        ],
      },

      { type: "heading", text: `Channels Most ${trade.name}${profile.slug === "general-contractors" ? "" : " Companies"} Never Try` },
      {
        type: "bullets",
        items: [
          `Local Facebook groups — neighborhood pages, town boards — reach a hyper-local ${trade.name.toLowerCase()} audience for a fraction of a standard ad, and a ${profile.recurringServiceLabel} offer posted there lands differently than the same pitch in a cold ad.`,
          `Direct mail to the streets around your last ${profile.terminology[2]} job works because a fresh ${profile.avgJobLabel} is its own billboard — the neighbors already saw the trucks.`,
          `CTV ads on local news apps and streaming services now reach ${trade.name} customers researching ${profile.terminology[3]} at the neighborhood level, for what used to be national-brand-only money.`,
        ],
      },

      { type: "heading", text: "Referrals & Strategic Partnerships" },
      { type: "paragraph", text: `A simple per-referral cash incentive, promoted after every closed job, usually gets this moving on its own.` },
      {
        type: "bullets",
        items: [
          `Property managers who need ongoing ${profile.recurringServiceLabel} across a whole portfolio`,
          `${profile.commercialExample.charAt(0).toUpperCase() + profile.commercialExample.slice(1)}, approached directly instead of waiting on an RFP`,
          "Complementary trades who see the same customers without competing for the same job",
        ],
      },

      { type: "heading", text: "What Else Actually Works Here" },
      { type: "paragraph", text: profile.crewNote },
      { type: "paragraph", text: profile.differentiator },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Month 1 — Foundation", items: ["Fully optimize the Google Business Profile", "Automate review requests", `Audit service pages for a real ${profile.avgJobLabel} price range and mobile speed`, "Set up call tracking"] },
      { label: "Month 2 — Paid", items: [`Launch one campaign on ${profile.topChannel.split(":")[0].toLowerCase()}`, "Set up conversion tracking", "Test 3-5 ad variations", `Have an answer ready for "${profile.commonObjection.objection.replace(/"/g, "")}"`] },
      { label: "Month 3 — Referrals", items: [`Launch a referral program built around ${profile.recurringServiceLabel} customers`, "Contact 5-10 potential partners", `Reach out to ${profile.commercialExample} directly`] },
      { label: "Month 4+ — Scale", items: ["Review cost-per-lead by channel monthly", "Cut what isn't converting", `Double down on ${profile.topChannel.split(":")[0].toLowerCase()} once it's proven`, `Post one drone or live-video piece from a real ${profile.avgJobLabel} job and DM everyone who engages with it`, "Test one under-used channel: local Facebook group ads, direct mail, or CTV"] },
    ],
    checklist: (trade, profile) => [
      "Google Business Profile fully optimized with 50+ photos",
      "Automated review request system live",
      `Service pages show a real ${profile.avgJobLabel} price range`,
      "Call tracking implemented",
      `First campaign live on ${profile.topChannel.split(":")[0].toLowerCase()}`,
      "Referral program launched and promoted",
      "Drone footage or a live-video job walkthrough posted, with a DM sent to everyone who engaged",
      "At least one under-used channel tested: local Facebook group ads, direct mail, or CTV",
      `At least one ${profile.commercialExample}-type partner contacted`,
      "Cost per lead tracked by channel",
    ],
    keyTakeaways: (trade, profile) => [
      profile.topChannel,
      `Target cost-per-lead around 10-15% of a ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}`,
      "Referrals close far better than cold leads and cost a fraction as much — build a system for asking",
      `Every like, comment, or share on a drone or live-video post is a warm DM waiting to happen — don't let it just sit there`,
      "Local Facebook group ads, direct mail, and CTV are worth testing precisely because most competitors never do",
      profile.differentiator,
    ],
  },

  "lead-nurture": {
    slug: "lead-nurture",
    title: "Lead Nurture",
    icon: "lucide:mail",
    tagline: (trade, profile) => `${profile.differentiator} A follow-up system built around a real ${profile.avgJobLabel} does most of that work.`,
    tldrSummary: (trade, profile) =>
      `${profile.warStory} Most "lost" leads on a ${profile.avgJobLabel} weren't lost on price — they just went cold waiting on a callback.`,
    tldrBullets: (trade, profile) => [
      "Speed matters: contact leads within 5 minutes — response time is the single biggest predictor of conversion",
      "Use email, text, and phone together, not just whichever one you happen to prefer",
      profile.topChannel,
      `Share real ${profile.terminology[0]} and ${profile.terminology[1]} know-how, not just sales pitches — value first, ask second`,
      profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
    ],
    tldrBottomLine: (trade, profile) =>
      `Set a 5-minute response standard, build a 7-touch sequence across email/text/phone that's actually about ${profile.terminology[2]}, and put it in a CRM so nothing on a ${profile.avgJobLabel} falls through the cracks.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: profile.crewNote },
      { type: "heading", text: "Three Kinds of Buyers, Same Trade" },
      {
        type: "bullets",
        items: [
          `The Researcher — weeks out from a ${profile.highJob.label}, wants education, not pressure`,
          `The Comparison Shopper — decides in 7-14 days, wants to know why you and not the next ${trade.name.toLowerCase()} company quoting the same ${profile.terminology[2]}`,
          `The Urgent Buyer — needs a ${profile.lowJob.label} handled now and just wants proof you'll actually show up`,
        ],
      },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "A 7-Touch Sequence That Fits This Trade" },
      {
        type: "bullets",
        items: [
          "Day 0 (within 5 minutes): a quick text plus a call, not just an auto-reply",
          `Day 1: something genuinely useful about ${profile.terminology[3]}, tied to what they asked about`,
          `Day 3: proof — a ${profile.terminology[4]} before/after or a quick story like the one above`,
          `Day 5: a short personal video about their specific ${profile.avgJobLabel}, not a template`,
          `Day 7: a real, limited-time offer on the ${profile.avgJobLabel}`,
          `Day 10: one more ${profile.terminology[5]} tip, no pitch attached`,
          "Day 14: a last soft check-in before moving to long-term nurture",
        ],
      },

      { type: "heading", text: "Channel Mix" },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response}` },

      { type: "heading", text: "CRM and Automation" },
      { type: "paragraph", text: `A CRM needs to capture the lead, run the sequence automatically, and move it through real stages — New → Contacted → ${profile.highJob.label.charAt(0).toUpperCase() + profile.highJob.label.slice(1)} Scheduled → Quoted → Won/Lost. ${profile.seasonalNote}` },

      { type: "heading", text: "Beyond the Basic Sequence" },
      {
        type: "bullets",
        items: [
          `Retargeting ads for anyone who looked at the ${profile.avgJobLabel} page and didn't fill out the form`,
          `A short video after every ${profile.avgJobLabel} estimate, not just a written number`,
          profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
          "A referral ask even from leads who didn't book — they may know someone who's a better fit right now",
        ],
      },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Week 1 — Foundation", items: ["Set up a CRM if you don't have one", "Write the 7-touch email/text templates", `Script a response to "${profile.commonObjection.objection.replace(/"/g, "")}"`, "Turn on automated first-response texts"] },
      { label: "Week 2 — Content", items: [`Write a year of ${profile.terminology[0]} follow-up content`, `Pull together 2-3 real ${profile.terminology[4]} proof pieces`, "Record a short video introduction"] },
      { label: "Week 3 — Automation", items: [`Build the sequence around a real ${profile.avgJobLabel} inquiry`, `Set up text templates using ${profile.terminology[1]} language, not generic copy`, "Test it end to end with a dummy lead"] },
      { label: "Week 4 — Team", items: ["Train the team on the response-time standard", "Assign clear follow-up ownership", profile.crewNote, profile.differentiator] },
    ],
    checklist: (trade, profile) => [
      "5-minute response standard in place",
      "7-touch sequence built across email, text, and phone",
      "CRM tracking every lead interaction",
      `Response ready for "${profile.commonObjection.objection.replace(/"/g, "")}"`,
      `2-3 real ${profile.terminology[4]} proof pieces ready to send`,
      `Retargeting live for ${profile.avgJobLabel} page visitors who didn't convert`,
      "Weekly review of what's actually converting",
    ],
    keyTakeaways: (trade, profile) => [
      "Speed to first contact is the single biggest lever — 5 minutes or less",
      "One touch isn't a system; plan for 5-7 touches across 14 days",
      profile.topChannel,
      profile.differentiator,
    ],
  },

  "appointment-setting-qualification": {
    slug: "appointment-setting-qualification",
    title: "Appointment Setting & Qualification",
    icon: "lucide:calendar-check",
    tagline: (trade, profile) => `Stop losing ${profile.avgJobLabel} leads to slow response, weak qualification, and no-shows.`,
    tldrSummary: (trade, profile) =>
      `${profile.warStory} The appointment itself is where a ${trade.name.toLowerCase()} lead is actually won or lost — usually well before an estimate happens.`,
    tldrBullets: (trade, profile) => [
      `Speed to lead wins on a ${profile.avgJobLabel} — contact within 5 minutes converts roughly 9x higher than waiting half an hour`,
      `Qualify before you quote — a quick Budget/Authority/Need/Timeline check catches whether it's a real ${profile.terminology[0]} need before you drive out for it`,
      profile.topChannel,
      profile.differentiator,
      profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
    ],
    tldrBottomLine: (trade, profile) =>
      `Most ${trade.name.toLowerCase()} businesses lose 40-60% of leads between the first call and the appointment — fix speed first, then qualification, then confirmations, and that loss rate drops fast whether the lead is a ${profile.lowJob.label} or ${profile.commercialExample}.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response} That's the qualification conversation happening before a truck ever gets sent out — and getting it right decides whether the appointment is worth keeping.` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Call Workflow" },
      {
        type: "bullets",
        items: [
          `0-5 min: acknowledge the ${profile.avgJobLabel} lead, don't let it sit`,
          `5-10 min: a few real questions about the ${profile.terminology[0]} or ${profile.terminology[1]} involved`,
          `2-3 min: two specific time slots, never "whenever works"`,
          `Automated: text, calendar invite, a reminder, a final nudge before a ${profile.highJob.label}`,
        ],
      },

      { type: "heading", text: "Qualifying Before You Drive Out" },
      {
        type: "bullets",
        items: [
          `Budget — a realistic sense of what a ${profile.avgJobLabel} costs`,
          `Authority — the decision-maker, not someone pricing it out for a ${profile.commercialExample}`,
          `Need — closer to a ${profile.lowJob.label} or a ${profile.highJob.label}?`,
          `Timeline — this week, or "someday" into nurture`,
        ],
      },

      { type: "heading", text: "No-Show Prevention" },
      { type: "paragraph", text: profile.crewNote },

      { type: "heading", text: "Objection Handling on the Phone" },
      { type: "paragraph", text: `"I just want ballpark pricing over the phone" is the most common pushback before a ${profile.avgJobLabel} appointment is even booked — a real range instead of a hard number keeps the conversation moving toward booking instead of stalling on a guess.` },

      { type: "heading", text: "Tracking the Funnel" },
      {
        type: "example",
        title: `A ${profile.avgJobLabel} funnel, stage by stage`,
        lines: [
          `Contacted → Set → Showed → Won, each stage roughly 60-80% of the one before it`,
          `A ${profile.terminology[2]} job that stalls usually stalls at one specific stage, not randomly`,
          profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
        ],
      },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Week 1 — Foundation", items: [`Document the current ${profile.avgJobLabel} process end to end`, "Calculate baseline contact, set, and show rates", "Set up call recording", `Write a script for "${profile.commonObjection.objection.replace(/"/g, "")}"`] },
      { label: "Week 2 — Scripts & Training", items: [`Customize scripts around ${profile.terminology[3]} and ${profile.terminology[4]}`, "Train the team on them", "Practice the top objections out loud", "Run a short daily practice routine"] },
      { label: "Week 3 — Automation", items: ["Route leads instantly in the CRM", "Turn on instant SMS alerts", `Build the confirmation sequence around a real ${profile.recurringServiceLabel}`, profile.differentiator] },
      { label: "Week 4+ — Optimize", items: ["Review call recordings weekly", "Adjust scripts from real conversations", profile.crewNote, "Refresh training quarterly"] },
    ],
    checklist: (trade, profile) => [
      "5-minute response standard tracked",
      `BANT questions written for a real ${profile.avgJobLabel}`,
      "Two-option scheduling used instead of open-ended asks",
      "Multi-touch confirmation sequence automated",
      `Script ready for "${profile.commonObjection.objection.replace(/"/g, "")}"`,
      `Contact, set, and show rate tracked for ${profile.terminology[5]}-type jobs`,
    ],
    keyTakeaways: (trade, profile) => [
      "Speed to lead is the highest-leverage fix available — 5 minutes or bust",
      `Qualify before quoting so on-site time goes to real ${profile.avgJobLabel} buyers`,
      profile.differentiator,
      "No-show prevention is a confirmation-sequence problem, not a customer-reliability problem",
    ],
  },

  sales: {
    slug: "sales",
    title: "Sales",
    icon: "lucide:handshake",
    tagline: (trade, profile) => `${profile.differentiator} That's a sales process, not luck.`,
    tldrSummary: (trade, profile) =>
      `If you're closing 60-85% of ${profile.avgJobLabel} estimates, you're undercharging. The right rate at real pricing is 30-45%, and ${profile.commercialExample} pays enough that it's worth pricing to that standard, not the lowest bid in the room.`,
    tldrBullets: (trade, profile) => [
      `First impressions matter: showing up looking like a real, insured ${trade.name.toLowerCase()} company beats a guy with a truck every time`,
      `Sell the outcome, not the ${profile.terminology[0]}: customers are buying peace of mind, not just the job itself`,
      "A Good / Better / Best structure raises average ticket 40%+ on its own",
      `Same-day booking, both decision-makers at the table, and a direct ask for the ${profile.avgJobLabel} sale can push a one-call close rate to 50-60%`,
      profile.seasonalNote,
      profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
    ],
    tldrBottomLine: (trade, profile) =>
      `Master the on-site process for a ${profile.avgJobLabel}, offer three price tiers instead of one number, and have "${profile.commonObjection.objection.replace(/"/g, "")}" scripted before it comes up.`,
    intro: (trade, profile) => [
      {
        type: "example",
        title: "The math that changes everything",
        lines: [
          `Close 80% at ${fmt(profile.avgJobValue)} — margins get squeezed to hit that rate`,
          `Close 35% at ${fmt(Math.round(profile.avgJobValue * 1.6))} — fewer jobs, but total profit ends up higher`,
        ],
      },
      { type: "paragraph", text: `The goal isn't the highest close rate on a ${profile.avgJobLabel} — it's the highest profit, which usually means closing 30-45% of estimates at prices that reflect the ${profile.terminology[1]} actually involved. ${profile.warStory}` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Before You Even Leave for the Estimate" },
      { type: "paragraph", text: profile.crewNote },

      { type: "heading", text: "Process → Proof → Price" },
      {
        type: "bullets",
        items: [
          `PROCESS — walk through the ${profile.terminology[2]} step by step so nothing feels uncertain`,
          `PROOF — insurance, licensing, ${profile.terminology[1]} photos, real reviews, shown before price ever comes up`,
          `PRICE — state the ${profile.avgJobLabel} number once, then stop talking`,
        ],
      },

      { type: "heading", text: "Good / Better / Best" },
      {
        type: "example",
        title: `A ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}`,
        lines: [
          `Good — ${fmt(profile.avgJobValue)}, the core ${profile.terminology[4]} work`,
          `Better — ${fmt(Math.round(profile.avgJobValue * 1.3))}, plus one add-on tied to ${profile.terminology[5]}`,
          `Best — ${fmt(Math.round(profile.avgJobValue * 1.75))}, plus a warranty or priority ${profile.recurringServiceLabel}`,
        ],
      },
      { type: "paragraph", text: `Most customers pick the middle option on a ${profile.avgJobLabel} when given three real choices — average ticket goes up without ever "upselling" anyone.` },

      { type: "heading", text: "Handling Objections" },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response}` },

      { type: "heading", text: "Same-Day Close: Book Fast, Close at the Table" },
      { type: "paragraph", text: `Speed matters before the ${profile.avgJobLabel} appointment ever happens — respond to a new lead in well under a minute if you can. Only book same-day or next-day for a ${profile.terminology[0]} problem; every extra day gives a homeowner more time to call someone else.` },
      {
        type: "bullets",
        items: [
          `Get both decision-makers at the table for the ${profile.terminology[3]} conversation. A ${fmt(profile.avgJobValue)} ${profile.avgJobLabel} rarely gets approved by half a household — if only one spouse is home, it's usually worth rescheduling rather than pitching to an empty chair.`,
          `Run the full Process → Proof → Price presentation seated at the table, not standing in a doorway discussing the ${profile.terminology[1]} — then ask directly for the sale. "Does this make sense to move forward with the ${profile.avgJobLabel} today?" beats hinting and hoping they bring it up first.`,
          `A one-call close rate of 50-60% on ${profile.avgJobLabel} leads is realistic with this process run consistently on every ${profile.terminology[4]} estimate — most ${trade.name.toLowerCase()} businesses lose leads to slow follow-up long before their pitch is ever the actual problem.`,
        ],
      },

      { type: "heading", text: "The Deal Isn't Dead When They Say No" },
      { type: "paragraph", text: `When a homeowner says "let me think about it," most ${trade.name.toLowerCase()} companies just stop. That's exactly where a real follow-up system pays for itself — the same system that can turn a "no" on a ${profile.avgJobLabel} today into a booked ${profile.recurringServiceLabel} down the road, and it's why a one-page leave-behind still matters even on a visit that doesn't close.` },
      {
        type: "bullets",
        items: [
          `Follow up through ${profile.topChannel.split(":")[0].toLowerCase()} — 10+ touches over the following weeks is normal, not excessive, for a ${profile.avgJobLabel} that hasn't closed yet.`,
          `Send a friend or follow request on social media, and actually like and comment on what they post. It's the difference between "some ${trade.name.toLowerCase()} guy who quoted us" and someone they remember by name.`,
          `Ask for a referral anyway, even on a no — a homeowner who didn't buy a ${profile.avgJobLabel} today may still know a neighbor who needs one right now, and it's an ask most ${trade.name.toLowerCase()} crews skip constantly.`,
        ],
      },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Week 1 — Fix Your Appearance", items: ["Get magnetic signs or a wrap for the vehicle", "Order branded shirts", "Put together a leave-behind packet", `Photograph the crew and ${profile.terminology[3]}`] },
      { label: "Week 2 — Confirmation System", items: [`Set up confirmation texts ahead of the ${profile.avgJobLabel} visit`, "Add a 2-hour reminder", "Add an arrival text with a photo", `Build a rule to only book ${profile.avgJobLabel} appointments same-day or next-day`] },
      { label: "Week 3 — Master the Presentation", items: [`Write the Process script for a ${profile.avgJobLabel}`, `Gather Proof: licensing, ${profile.terminology[2]}, real reviews`, `Practice presenting a ${profile.avgJobLabel} seated at the table with both decision-makers`, `Practice asking directly for the ${profile.avgJobLabel} sale instead of hinting`] },
      { label: "Week 4 — Objection Handling & Follow-Up", items: [`Script a response to "${profile.commonObjection.objection.replace(/"/g, "")}"`, "Write out the next 4 most common objections", `Build a 10-touch follow-up sequence through ${profile.topChannel.split(":")[0].toLowerCase()} for anyone who doesn't close`, `Add a referral ask to every ${profile.avgJobLabel} follow-up, win or lose`] },
    ],
    checklist: (trade, profile) => [
      "Vehicle and team look professional on arrival",
      "Confirmation text sequence automated",
      `Rule in place to only book ${profile.avgJobLabel} appointments same-day or next-day`,
      `Process → Proof → Price script written for a ${profile.avgJobLabel}`,
      `Good / Better / Best pricing built with a real ${profile.terminology[5]} add-on`,
      `Response ready for "${profile.commonObjection.objection.replace(/"/g, "")}"`,
      `10+ touch ${profile.topChannel.split(":")[0]}-based follow-up sequence in place for non-closes`,
      `Referral ask built into every ${profile.avgJobLabel} follow-up, win or lose`,
      "Close rate and average ticket tracked weekly",
    ],
    keyTakeaways: (trade, profile) => [
      `A high close rate on a ${profile.avgJobLabel} is often a sign of leaving money on the table, not great salesmanship`,
      "Process, then Proof, then Price — in that order — builds enough value that the price lands as reasonable",
      `Three price options beat one — most customers pick the ${profile.recurringServiceLabel}-adjacent middle tier`,
      `Same-day booking for a ${profile.avgJobLabel}, both decision-makers at the table, and a direct ask for the sale are what actually drive a 50-60% one-call close rate`,
      `A no on a ${profile.avgJobLabel} today isn't the end — 10+ follow-up touches and a referral ask turn a cold ${trade.name.toLowerCase()} lead into next month's job or someone else's`,
      profile.differentiator,
    ],
  },

  "landing-pages-offers": {
    slug: "landing-pages-offers",
    title: "Landing Pages & Offers",
    icon: "lucide:layout",
    tagline: (trade, profile) => `One generic page for all your traffic is costing you jobs. ${profile.differentiator}`,
    tldrSummary: (trade, profile) =>
      `Facebook traffic and Google traffic need different pages for a ${profile.avgJobLabel}. ${profile.commonObjection.objection} A page that answers that before they even ask converts far better than a generic homepage.`,
    tldrBullets: (trade, profile) => [
      `Facebook needs a story and heavy ${profile.terminology[4]} proof; Google needs speed and a direct answer to "${profile.avgJobLabel} near me"`,
      profile.warStory,
      `Funnel hacking around ${profile.commercialExample}-style competitors saves months of guessing`,
      `Local, service-plus-city pages for a ${profile.avgJobLabel} rank and convert better than one generic ${trade.name.toLowerCase()} page`,
      profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
    ],
    tldrBottomLine: (trade, profile) =>
      `Build one platform-specific page for a real, named ${profile.avgJobLabel} offer this week — most ${trade.name.toLowerCase()} businesses are still sending every visitor to the same generic homepage.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `A landing page isn't a homepage. Its only job is getting this specific visitor, who searched for a ${profile.avgJobLabel} or clicked a specific ad, to take one specific action — not to explain the whole ${trade.name.toLowerCase()} business the way a homepage does.` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Facebook vs. Google: Two Different Jobs" },
      { type: "paragraph", text: `Facebook traffic is cold and interrupted mid-scroll — it needs a story and heavy proof: before/after ${profile.terminology[0]} photos, real reviews, a clear FAQ. Google traffic already typed the ${profile.avgJobLabel} problem into a search bar — it needs a short, fast page with a real price range and one obvious next step, not a story.` },

      { type: "heading", text: "The Anatomy of an Irresistible Offer" },
      { type: "paragraph", text: `Formula: Core Service + a Unique Name + Bonuses + Urgency/Scarcity + a Guarantee. ${profile.commonObjection.response}` },
      {
        type: "example",
        title: `Stacking value on a ${profile.avgJobLabel}`,
        lines: [
          `Core service: ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}`,
          `Bonus 1: a free follow-up ${profile.terminology[1]} check (${fmt(Math.round(profile.avgJobValue * 0.1))} value)`,
          `Bonus 2: 10% off a ${profile.recurringServiceLabel}`,
          `Total stacked value: ${fmt(Math.round(profile.avgJobValue * 1.2))} — investment: ${fmt(profile.avgJobValue)}`,
        ],
      },

      { type: "heading", text: "Funnel Hacking" },
      { type: "paragraph", text: `Meta's Ad Library and Google's Ads Transparency Center show what ${trade.name.toLowerCase()} competitors elsewhere are running for a ${profile.avgJobLabel} right now — including ${profile.commercialExample}-focused campaigns worth studying even from a non-competing city.` },

      { type: "heading", text: "Local Landing Pages for SEO" },
      { type: "paragraph", text: `${profile.seasonalNote} A page built around "${trade.name} in [City]" ranks faster than one generic services page because it matches exactly what someone nearby is searching for during that window.` },

      { type: "heading", text: "Common Mistakes" },
      {
        type: "bullets",
        items: [
          "Too many links pulling attention away from the one action wanted",
          `No real proof — zero ${profile.terminology[2]} photos or reviews reads as unproven`,
          `A weak, unnamed offer with nothing specific to a ${profile.lowJob.label} or ${profile.highJob.label} to respond to`,
          `Slow load times on the exact device someone's searching "${profile.avgJobLabel} near me" from`,
          profile.crewNote,
        ],
      },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Days 1-2 — Research", items: [`Pick one page type: emergency, seasonal offer, or the core ${profile.avgJobLabel}`, "Pull 5 competitor examples from Meta Ad Library and Google Ads Transparency Center", `Note what ${profile.commercialExample}-focused competitors are doing differently`] },
      { label: "Days 3-4 — Offer & Copy", items: ["Name the offer using the stacking formula", `Add 1-2 real bonuses tied to ${profile.terminology[3]}`, "Add genuine urgency and a real guarantee", "Write the headline, proof section, and FAQ"] },
      { label: "Days 5-6 — Design & Mobile", items: [`Build the page around the ${profile.avgJobLabel} offer`, "Add photos, testimonials, and trust badges", "Test thoroughly on a phone", "Confirm click-to-call works"] },
      { label: "Day 7 — Launch", items: ["Connect the page to the domain", "Set up conversion tracking", `Send traffic through ${profile.topChannel.split(":")[0].toLowerCase()}`, profile.differentiator] },
    ],
    checklist: (trade, profile) => [
      "Separate pages exist for Facebook traffic vs. Google traffic",
      `Offer is named and built around a real ${profile.avgJobLabel}`,
      "A real guarantee is stated clearly",
      "Genuine urgency or scarcity is present, not fabricated",
      `Page has been checked against real ${profile.commercialExample}-focused competitor pages`,
      "At least one local service-plus-city page is live",
      "Page loads fast and works cleanly on mobile",
    ],
    keyTakeaways: (trade, profile) => [
      "Match the page to the traffic source — Facebook needs a story, Google needs speed",
      `The offer on a ${profile.avgJobLabel} does more work than the design — build it deliberately`,
      profile.differentiator,
      "Local, service-plus-city pages outperform one generic page for both SEO and conversion",
    ],
  },

  fulfillment: {
    slug: "fulfillment",
    title: "Fulfillment",
    icon: "lucide:clipboard-check",
    tagline: (trade, profile) => `Turn every ${profile.avgJobLabel} into a 5-star review and a referral, not just a completed invoice.`,
    tldrSummary: (trade, profile) =>
      `${profile.crewNote} That's what actually determines whether a ${profile.avgJobLabel} turns into a review and a repeat customer, or just a one-time transaction.`,
    tldrBullets: (trade, profile) => [
      "Confirm the appointment 24-48 hours out so nothing is a surprise on either side",
      profile.differentiator,
      profile.warStory,
      "Following up within 24 hours after the job is when you win the review, not weeks later",
      "A recorded testimonial right after the final walk-through beats any ad",
    ],
    tldrBottomLine: (trade, profile) =>
      `Build a simple pre-job, on-site, and post-job checklist for a ${profile.avgJobLabel} — most of what separates a 5-star review from silence is process, not luck.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `Three promises hold on every ${profile.avgJobLabel}: safety first, professional execution, and exceeding what the customer expected in small ways. ${profile.seasonalNote}` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Pre-Job: Setting Up for Success" },
      { type: "paragraph", text: `A quick confirmation call 24-48 hours out — confirming ${profile.terminology[0]}, timing, and access — prevents most on-site surprises on a ${profile.avgJobLabel}. ${profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1)}` },

      { type: "heading", text: "On-Site: Delivering Exceptional Service" },
      {
        type: "bullets",
        items: [
          `Arrive in clean, branded gear, not just whatever's in the ${profile.terminology[3]} truck that day`,
          `A quick walk-through before starting so expectations on the ${profile.avgJobLabel} are shared`,
          `Keep ${profile.terminology[1]}-related safety visible — it builds trust even from people who never ask about it`,
          `Protect the property proactively — ${profile.crewNote.charAt(0).toLowerCase() + profile.crewNote.slice(1)}`,
          `Leave the site cleaner than found — that's what gets photographed for a ${profile.terminology[4]} review`,
        ],
      },

      { type: "heading", text: "The Magic Question" },
      { type: "paragraph", text: `Before leaving a ${profile.avgJobLabel}, ask: "1 to 10, how was today?" Anything under a 9 gets a fix on the spot if possible — ${profile.differentiator.charAt(0).toLowerCase() + profile.differentiator.slice(1)}` },

      { type: "heading", text: "Post-Job Follow-Up & Reviews" },
      { type: "paragraph", text: `A same-day text and a 48-hour check generate reviews on a ${profile.avgJobLabel} — waiting a week rarely works. ${profile.commonObjection.objection} ${profile.commonObjection.response}` },

      { type: "heading", text: "Capturing Video Testimonials" },
      { type: "paragraph", text: `Ask for a video right after the ${profile.avgJobLabel} walk-through, while satisfaction is highest — was there hesitation before booking, how did the estimate feel, how do they feel now. That answers the exact ${profile.terminology[2]} objections future customers are silently having, better than any ad about ${profile.terminology[5]} ever could.` },

      { type: "heading", text: "Service Recovery" },
      { type: "paragraph", text: `When a ${profile.avgJobLabel} goes wrong: acknowledge it within an hour, own it without excuses, offer a real fix, and follow through completely. A well-handled complaint on a ${profile.commercialExample} account often builds more loyalty than a job that never had a problem.` },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Week 1 — Document the Process", items: [`Write down the current pre-job, on-site, and post-job steps for a ${profile.avgJobLabel}`, "Identify the gaps", "Build simple checklists per stage"] },
      { label: "Week 2 — Train the Team", items: ["Walk the crew through the new checklists", "Practice the magic question out loud", profile.crewNote] },
      { label: "Week 3 — Systemize Follow-Up", items: [`Set up same-day text/email templates for a ${profile.avgJobLabel}`, "Build a 48-hour quality-check step", "Create a direct review-request link"] },
      { label: "Week 4 — Launch & Refine", items: ["Run the full process on every job", "Collect crew and customer feedback", profile.topChannel] },
    ],
    checklist: (trade, profile) => [
      "Pre-job confirmation call happening 24-48 hours out",
      "On-site safety visibly maintained on every job",
      "The magic question asked before leaving every site",
      "Same-day follow-up text or email sent",
      "48-hour quality check in place",
      `Direct review link sent to every satisfied ${profile.avgJobLabel} customer`,
      `At least one video testimonial captured per month from a real ${profile.highJob.label}`,
    ],
    keyTakeaways: (trade, profile) => [
      "Fulfillment is a process, not a personality trait — checklists hold up even when the crew changes",
      "Small, low-cost touches drive reviews more than the quality of the work alone",
      "The 24-48 hour window after a job is when review requests actually convert",
      profile.differentiator,
    ],
  },

  upsell: {
    slug: "upsell",
    title: "Upsell",
    icon: "lucide:arrow-up-circle",
    tagline: (trade, profile) => `Increase average ticket 30-50% on a ${profile.avgJobLabel} by catching what the customer can't see for themselves.`,
    tldrSummary: (trade, profile) =>
      `A 20% increase in average ticket is a 20% revenue increase without a single new customer. ${profile.warStory}`,
    tldrBullets: (trade, profile) => [
      `Adopt a trusted-advisor mindset on every ${profile.avgJobLabel}: not "selling more," identifying what the customer can't see`,
      profile.crewNote,
      `Use "while we're here" to bundle related ${profile.terminology[0]} work into the same trip`,
      `Offer a ${profile.recurringServiceLabel} so revenue isn't one-and-done`,
      profile.differentiator,
    ],
    tldrBottomLine: (trade, profile) =>
      `Build a property-walk checklist for a ${profile.avgJobLabel}, train the team to notice, and offer Good/Better/Best on every estimate.`,
    intro: (trade, profile) => [
      {
        type: "example",
        title: "Piecemeal vs. comprehensive care",
        lines: [
          `Piecemeal: ${fmt(profile.lowJob.low)} now for the obvious issue, then ${fmt(Math.round(profile.avgJobValue * 2))} later once a related problem gets worse`,
          `Comprehensive: ${fmt(Math.round(profile.avgJobValue * 1.3))} upfront that catches everything at once — one visit instead of two or three`,
        ],
      },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Identifying Opportunities" },
      { type: "paragraph", text: `Walk the whole property during the estimate, not just the ${profile.terminology[1]} spot mentioned on the call — document it with photos. ${profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1)} On the job itself, give the crew leader authority to mention a same-visit add-on rather than waiting for a callback.` },

      { type: "heading", text: "The Good / Better / Best Approach" },
      {
        type: "example",
        title: `A ${profile.avgJobLabel} estimate`,
        lines: [
          `Good — ${fmt(profile.avgJobValue)} (the core job)`,
          `Better — ${fmt(Math.round(profile.avgJobValue * 1.25))} (core job + one related fix)`,
          `Best — ${fmt(Math.round(profile.avgJobValue * 1.6))} (core job + a preventive add-on)`,
        ],
      },

      { type: "heading", text: "Bundling and Packages" },
      { type: "paragraph", text: `A packaged offer — inspection, core service, preventive add-on at a slight discount off buying separately — raises average ticket and the odds of ongoing ${profile.recurringServiceLabel}-style business, the same logic that makes ${profile.commercialExample} worth pursuing in the first place.` },

      { type: "heading", text: "Education-Based Selling" },
      { type: "paragraph", text: `Explain the problem, the consequence of ignoring it, then the solution — people rarely resist once they understand what happens if it's skipped. ${profile.differentiator}` },

      { type: "heading", text: "Training and Incentives" },
      { type: "paragraph", text: `Give crews simple language for flagging ${profile.terminology[2]} opportunities, and consider a small commission on upsold work to make it worth their attention. ${profile.topChannel}` },

      { type: "heading", text: "Handling Pushback" },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response} That's the same reframe that works on "I'll just do it myself" or "I'll think about it" — reconnect to the actual consequence of skipping it.` },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Week 1 — Assessment", items: [`Review current average ticket on a ${profile.avgJobLabel}`, `Identify commonly missed ${profile.terminology[4]} opportunities`, "Build a property-walk checklist"] },
      { label: "Week 2 — Training", items: ["Train the team on full property assessments", `Practice the "while we're here" script for ${profile.terminology[3]}`, "Role-play common objections"] },
      { label: "Week 3 — Systems", items: ["Build Good/Better/Best pricing templates", `Create a bundled ${profile.recurringServiceLabel} package`, "Set up simple upsell tracking"] },
      { label: "Week 4+ — Launch", items: ["Use it on every estimate", "Track results weekly", profile.seasonalNote] },
    ],
    checklist: (trade, profile) => [
      "Property-walk checklist used on every estimate",
      "Crew trained to flag additional opportunities",
      `Good/Better/Best pricing built for a ${profile.avgJobLabel}`,
      `At least one bundled ${profile.recurringServiceLabel} package created`,
      `Response ready for "${profile.commonObjection.objection.replace(/"/g, "")}"`,
      "Average ticket tracked monthly",
    ],
    keyTakeaways: (trade, profile) => [
      "A full property walk catches revenue a narrow, single-issue visit misses",
      "Three price options consistently raise average ticket more than one number ever will",
      `A ${profile.recurringServiceLabel} turns one-off jobs into ongoing ${trade.name.toLowerCase()} revenue`,
      profile.differentiator,
    ],
  },

  ascension: {
    slug: "ascension",
    title: "Ascension",
    icon: "lucide:trending-up",
    tagline: (trade, profile) => `Move customers up a real value ladder, and evolve a ${trade.name.toLowerCase()} job shop into something built on ${profile.recurringServiceLabel}s.`,
    tldrSummary: (trade, profile) =>
      `Ascension means two things: moving customers to higher-value tiers, and evolving the business itself toward ${profile.commercialExample}-style sophistication. ${profile.differentiator}`,
    tldrBullets: (trade, profile) => [
      "Build a value ladder: a low-commitment entry point that guides customers toward higher-value, recurring work",
      "Offer real tiers — Standard, Premium, VIP — not one flat price for everyone",
      `Evolve the business itself toward ${profile.commercialExample}, not just bigger residential jobs`,
      `Premium tiers built around a ${profile.recurringServiceLabel} can run ${fmt(5000)}–${fmt(50000)}+ a year per account`,
      profile.crewNote,
    ],
    tldrBottomLine: (trade, profile) =>
      `Build a clear value ladder, launch a premium tier for the best customers, and start developing ${profile.commercialExample}-style offerings deliberately rather than by accident.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `Most ${trade.name.toLowerCase()} businesses have an accidental value ladder — some customers happen to spend more, with no deliberate path guiding them there. ${profile.warStory}` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Value Ladder" },
      {
        type: "bullets",
        items: [
          `Free entry point — an estimate or a useful ${profile.terminology[0]} tip, $0`,
          `First transaction — a ${profile.lowJob.label} to a ${profile.highJob.label}, roughly ${fmt(profile.lowJob.low)}–${fmt(profile.highJob.high)}`,
          `Recurring service — a ${profile.recurringServiceLabel}, ${fmt(Math.round(profile.avgJobValue * 1.5))}–${fmt(Math.round(profile.avgJobValue * 3))}/year`,
          `Comprehensive care — an annual plan bundling several services, ${fmt(Math.round(profile.commercialAnnualValue * 0.3))}+/year`,
          `Premium / concierge — priority access for the best clients, ${fmt(Math.round(profile.commercialAnnualValue * 0.5))}–${fmt(profile.commercialAnnualValue)}+/year`,
          `Advisory — expert ${profile.terminology[1]} assessments billed at a premium`,
        ],
      },

      { type: "heading", text: "Moving Customers Up" },
      { type: "paragraph", text: `The best moments to offer the next ${profile.avgJobLabel} tier: right after exceptional service, when a related ${profile.terminology[2]} need turns up mid-job, and at renewal time. ${profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1)}` },

      { type: "heading", text: "Premium Service Tiers" },
      { type: "paragraph", text: `A three-tier structure works well for a ${profile.avgJobLabel}-based business: Standard (normal service), Premium (priority scheduling, an annual ${profile.terminology[3]} assessment), and VIP (24/7 response, direct access). ${profile.crewNote}` },

      { type: "heading", text: "Business Ascension" },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response} That same shift — from one-off labor toward ${profile.commercialExample} — is what business ascension actually looks like.` },
      { type: "paragraph", text: `${profile.commercialExample.charAt(0).toUpperCase() + profile.commercialExample.slice(1)}-type accounts run on thinner margins than residential work but bring real predictability. ${profile.seasonalNote}` },

      { type: "heading", text: "Building a Sellable Business" },
      { type: "paragraph", text: `Valuation drivers for a ${profile.avgJobLabel}-based company: operations that don't depend on the owner, recurring revenue, no single account over 10-15% of revenue, and clean financials. ${profile.differentiator}` },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Quarter 1 — Foundation", items: ["Map the current value ladder", "Define 2-3 real service tiers", `Price a ${profile.recurringServiceLabel} tier`, "Identify customers ready to move up"] },
      { label: "Quarter 2 — Launch Premium", items: [`Introduce premium ${profile.terminology[4]} tiers to existing customers`, "Train the team on ascension conversations", "Track ascension rate"] },
      { label: "Quarter 3 — Business Expansion", items: [`Assess readiness for ${profile.commercialExample}-style work`, "Identify 10 target accounts", profile.topChannel] },
      { label: "Quarter 4+ — Execute", items: ["Launch the expansion", "Build management infrastructure as volume grows", "Revisit pricing annually"] },
    ],
    checklist: (trade, profile) => [
      "Value ladder mapped from entry point to premium tier",
      "At least 2 real service tiers defined and priced",
      "Ascension conversation trained across the team",
      `10 ${profile.commercialExample}-type accounts identified`,
      `Recurring revenue from a ${profile.recurringServiceLabel} tracked as a share of total`,
      "Customer concentration checked (no single account over 10-15% of revenue)",
    ],
    keyTakeaways: (trade, profile) => [
      "A designed value ladder converts far more existing customers than hoping it happens naturally",
      "Premium tiers don't need to be complicated — priority access and direct contact go a long way",
      `Work like ${profile.commercialExample} smooths out the seasonality most ${trade.name.toLowerCase()} businesses struggle with`,
      "Systematized, recurring-revenue businesses are worth meaningfully more, sale or no sale",
    ],
  },

  retention: {
    slug: "retention",
    title: "Retention",
    icon: "lucide:repeat",
    tagline: (trade, profile) => `Repeat ${profile.avgJobLabel} customers are worth 3-6x more than one-time buyers, and cost far less to keep than new ones cost to acquire.`,
    tldrSummary: (trade, profile) =>
      `Acquiring a new customer typically costs 5-7x more than keeping one. ${profile.warStory}`,
    tldrBullets: (trade, profile) => [
      `Repeat customers are worth roughly ${fmt(Math.round(profile.avgJobValue * 3))}-${fmt(Math.round(profile.avgJobValue * 6))} in lifetime value versus ${fmt(profile.avgJobValue)} for a one-time buyer`,
      profile.seasonalNote,
      `A ${profile.recurringServiceLabel} gives customers a reason to stay rather than shop around next time`,
      "A referral incentive turns happy repeat customers into a low-cost acquisition channel",
      profile.differentiator,
    ],
    tldrBottomLine: (trade, profile) =>
      `Build a customer database, set up seasonal follow-up tied to ${profile.terminology[0]}, and launch a ${profile.recurringServiceLabel} or referral program — retention is a systems problem, not luck.`,
    intro: (trade, profile) => [
      {
        type: "example",
        title: "Why retention rate matters so much",
        lines: [
          `Starting from 100 new ${profile.avgJobLabel} customers a year at a 30% retention rate, year-5 revenue is meaningfully lower than the same start at 60%`,
          "Doubling retention from 30% to 60% can increase year-5 revenue by well over half, from the same acquisition effort",
        ],
      },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Foundation: Retention-Worthy Service" },
      { type: "paragraph", text: profile.crewNote },

      { type: "heading", text: "Maintenance and Service Plans" },
      {
        type: "example",
        title: "A simple two-tier plan structure",
        lines: [
          `Basic — an annual ${profile.terminology[4]} check-in plus priority scheduling, roughly ${fmt(Math.round(profile.avgJobValue * 0.25))}–${fmt(Math.round(profile.avgJobValue * 0.4))}/year`,
          `Premium — more frequent visits and priority emergency response, roughly ${fmt(Math.round(profile.avgJobValue * 0.6))}–${fmt(Math.round(profile.avgJobValue * 1.2))}/year`,
        ],
      },

      { type: "heading", text: "Communication Cadence" },
      { type: "paragraph", text: `A short post-${profile.avgJobLabel} sequence — a quality check within days, a review request within a week, check-ins at 3, 6, and 12 months — keeps the relationship active.` },

      { type: "heading", text: "Loyalty and Referral Rewards" },
      { type: "paragraph", text: `A tiered membership based on lifetime spend gives customers a reason to keep choosing this ${trade.name.toLowerCase()} company specifically over a ${profile.terminology[3]} competitor. ${profile.topChannel}` },

      { type: "heading", text: "Proactive Win-Back" },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response} The same directness works on an at-risk customer who's gone quiet — a real offer and a "what could we have done better" ask recovers people who were just drifting, not lost for good.` },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Month 1 — Foundation", items: ["Audit the current retention rate", "Implement a post-service follow-up sequence", "Build a proper customer database"] },
      { label: "Month 2 — Communication", items: [`Launch a ${profile.terminology[1]}-timed communication calendar`, "Set up email/text automation", "Start requesting reviews systematically"] },
      { label: "Month 3 — Programs", items: [`Launch a ${profile.recurringServiceLabel}`, "Create a referral incentive", "Segment customers by value"] },
      { label: "Month 4+ — Optimize", items: [`Analyze retention data for real ${profile.avgJobLabel} trends`, "Launch a win-back campaign", profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1)] },
    ],
    checklist: (trade, profile) => [
      "Customer database with service history in place",
      `Post-${profile.avgJobLabel} follow-up sequence automated`,
      `A ${profile.terminology[2]}-timed communication calendar built`,
      `A ${profile.recurringServiceLabel} offered`,
      "Referral incentive live and promoted",
      "Win-back sequence built for at-risk customers",
      "Retention rate tracked annually",
    ],
    keyTakeaways: (trade, profile) => [
      "Retention is dramatically cheaper than acquisition — a modest improvement compounds fast",
      "Systematic follow-up, not memory or luck, is what actually keeps customers coming back",
      `A ${profile.recurringServiceLabel} converts one-time jobs into predictable recurring revenue`,
      profile.differentiator,
    ],
  },

  operations: {
    slug: "operations",
    title: "Operations",
    icon: "lucide:settings",
    tagline: (trade, profile) => `Crew, equipment, scheduling, and cash flow — the backbone that lets a ${trade.name.toLowerCase()} business handle a ${profile.avgJobLabel} without falling apart.`,
    tldrSummary: (trade, profile) =>
      `Growth doesn't fail from too few leads — it fails when operations can't keep up with them. ${profile.crewNote}`,
    tldrBullets: (trade, profile) => [
      "Crew management is everything: hire for attitude, train for skill, build a real career path",
      profile.differentiator,
      "Smart scheduling — clustering jobs geographically and by margin — recovers hours of drive time every week",
      `True loaded cost per hour runs around ${fmt(profile.crewHourlyCost)} for a ${trade.name.toLowerCase()} crew, so pricing without that number is a guess`,
      "Track cash flow weekly, not just profit monthly — a profitable month can still leave you cash-short",
    ],
    tldrBottomLine: (trade, profile) =>
      `Fix crew hiring first, then ${profile.terminology[0]}-related equipment maintenance, then scheduling, then the ${fmt(profile.crewHourlyCost)}/hour math that ties it together.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `Most owners chase more leads when the business is straining operationally on a ${profile.avgJobLabel}. More leads on top of that just means more chaos, not more profit.` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "Crew Management" },
      { type: "paragraph", text: `Hire for attitude — technical skill trains, reliability doesn't. A structured onboarding (safety in week one, shadowing the first month, real ${profile.terminology[1]} skill development after that) sets the tone.` },
      { type: "paragraph", text: `Regular one-on-ones with a real path from ground crew toward a lead role, aimed at eventually handling ${profile.commercialExample}, cut the turnover that costs more than most owners realize.` },

      { type: "heading", text: "Equipment: Maximizing Uptime" },
      { type: "paragraph", text: `A daily pre-use check catches small ${profile.terminology[2]} issues before a truck or a major piece of equipment goes down for a week. ${profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1)}` },

      { type: "heading", text: "Scheduling for Profit, Not Just Fullness" },
      { type: "paragraph", text: `A fully booked schedule isn't a profitable one. A cluster of closer, higher-margin ${profile.avgJobLabel} jobs beats a scattered set of lower-margin ones, even at similar total revenue. ${profile.differentiator}` },
      {
        type: "example",
        title: `Same day, two ${profile.avgJobLabel} schedules`,
        lines: [
          "Option A — geographically clustered, prioritized by margin: higher total profit",
          `Option B — same jobs, scattered across town: meaningfully lower profit from ${profile.terminology[3]}-related drive time`,
        ],
      },
      { type: "paragraph", text: profile.seasonalNote },

      { type: "heading", text: "The Numbers That Matter" },
      {
        type: "formula",
        text: "Billable Rate = (Labor + Equipment + Overhead per hour) × (1 + target margin)",
      },
      {
        type: "example",
        title: `Cost-plus pricing for a ${trade.name.toLowerCase()} crew`,
        lines: [
          `Loaded labor: ${fmt(profile.crewHourlyCost)}/hour, mostly ${profile.terminology[4]}-related`,
          `Equipment + overhead: roughly ${fmt(Math.round(profile.crewHourlyCost * 0.5))}/hour`,
          `At a 25% margin: roughly ${fmt(Math.round(profile.crewHourlyCost * 1.5 * 1.25))}/hour billable`,
        ],
      },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response} ${profile.topChannel}` },

      { type: "heading", text: "Cash Flow Management" },
      { type: "paragraph", text: `A business can be profitable on paper and still run out of cash if a ${profile.avgJobLabel}'s payment terms lag the crew's payroll. ${profile.warStory}` },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Month 1 — Assessment", items: [`Document the current ${profile.avgJobLabel} process end to end`, `Identify the biggest ${profile.terminology[0]}-related pain points`, "Benchmark utilization, revenue per crew, margin"] },
      { label: "Month 2 — Quick Wins", items: [`Fix the easiest, highest-impact ${profile.terminology[1]} inefficiencies`, "Start tracking key metrics weekly", profile.crewNote] },
      { label: "Month 3 — Systems", items: ["Evaluate scheduling/CRM software", `Implement preventive ${profile.terminology[2]} maintenance`, "Set a weekly financial reporting habit"] },
      { label: "Month 4+ — Scale", items: [`Refine ${profile.terminology[4]} processes based on real data`, `Build toward ${profile.commercialExample} as volume grows`, `Revisit pricing against the real ${fmt(profile.crewHourlyCost)}/hour cost`] },
    ],
    checklist: (trade, profile) => [
      "Structured onboarding process in place",
      `A path toward ${profile.commercialExample} work defined for good crew`,
      "Daily equipment inspection habit in place",
      `Jobs scheduled by margin + geography for a ${profile.avgJobLabel}`,
      `True cost per hour (${fmt(profile.crewHourlyCost)}) calculated and pricing checked against it`,
      "Cash flow reviewed weekly, not just monthly",
      "2-3 months of operating reserve targeted",
    ],
    keyTakeaways: (trade, profile) => [
      "Operational capacity, not lead volume, is usually the real constraint on growth",
      "Hire for attitude and build a real career path — turnover is more expensive than most owners realize",
      "Schedule by margin and geography, not just by whoever called first",
      profile.differentiator,
    ],
  },

  "business-leverage-financing": {
    slug: "business-leverage-financing",
    title: "Business Leverage & Financing",
    icon: "lucide:landmark",
    tagline: (trade, profile) => `Strategic debt scales a ${profile.avgJobLabel}-based business faster — without the cash flow trap that sinks fast-growing companies.`,
    tldrSummary: (trade, profile) =>
      `Debt used well is a growth tool; used carelessly it's how busy companies go under. ${profile.warStory}`,
    tldrBullets: (trade, profile) => [
      `Customer Financed Acquisition: cash from a new ${profile.avgJobLabel} customer pays for winning the next one — growth without outside capital`,
      "Aim for a payback period under 30 days: structure offers so the upfront payment covers acquisition cost",
      `Equipment financing works when the ${profile.terminology[0]} asset pays for itself, not because a loan happened to be available`,
      profile.differentiator,
      "Profit and cash flow are different things — a profitable month can still leave you cash-short if timing is off",
    ],
    tldrBottomLine: (trade, profile) =>
      `Calculate CAC, LTGP, and payback period for a ${profile.avgJobLabel}; structure offers to hit a sub-30-day payback; and only finance equipment that clearly pays for itself.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `The same Customer Financed Acquisition framework used to scale a ${trade.name.toLowerCase()} business without raising capital: use cash flow from a ${profile.lowJob.label} customer to fund winning the next one.` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Three Levers of CFA" },
      { type: "paragraph", text: `Lever 1 — CAC: target under 20% of a ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}, roughly ${fmt(Math.round(profile.avgJobValue * 0.2))} or less.` },
      { type: "paragraph", text: `Lever 2 — LTGP: total profit over the relationship, not just the first ${profile.terminology[1]} job. Target at least 5x CAC.` },
      { type: "paragraph", text: `Lever 3 — Payback Period: under 30 days, ideally instant. ${profile.differentiator}` },

      { type: "heading", text: "CFA in Action" },
      {
        type: "example",
        title: "A simple CFA loop",
        lines: [
          `Spend on ${profile.topChannel.split(":")[0].toLowerCase()} to acquire a batch of customers at a modest CAC`,
          `Those customers pay upfront for a ${profile.avgJobLabel}, generating real gross profit`,
          "Reinvest that profit into the next batch — this compounds without outside capital",
        ],
      },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response}` },
      { type: "paragraph", text: `Ways to shorten payback on a ${profile.avgJobLabel}: a meaningful deposit upfront, leading with the ${profile.highJob.label}, or a same-visit upsell at the estimate.` },

      { type: "heading", text: "Equipment Financing" },
      { type: "paragraph", text: `Financing makes sense when the ${profile.terminology[2]} asset clearly pays for itself — it replaces a recurring rental or subcontractor cost, and the monthly payment is comfortably less than the extra profit it generates. ${profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1)}` },
      {
        type: "example",
        title: `Financing a real ${profile.terminology[3]} asset`,
        lines: [
          "A modest down payment over a 4-5 year term",
          "Replaces a recurring rental or subcontractor cost each month",
          "Net monthly profit after the payment exceeds the down payment within months",
        ],
      },

      { type: "heading", text: "Working Capital & Cash Flow" },
      { type: "paragraph", text: `${profile.seasonalNote} A working capital loan makes sense for bridging that real gap, or the gap between finishing a ${profile.highJob.label} and getting paid — not for covering an ongoing loss.` },
      { type: "paragraph", text: `A rolling 13-week cash flow forecast — cash in, cash out, running balance — catches this before it becomes an emergency on a ${profile.avgJobLabel} business.` },

      { type: "heading", text: "Using Debt Safely" },
      {
        type: "bullets",
        items: [
          `Only borrow for ${profile.terminology[3]} assets that generate income, not to cover an ongoing shortfall`,
          `Make sure the asset's return clearly covers the payment on a ${profile.avgJobLabel}-driven business, with margin to spare`,
          "Keep 2-3 months of cash reserve on hand",
          "Cap total debt at roughly 30% of annual revenue",
          profile.differentiator,
        ],
      },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Weeks 1-2 — Foundation", items: [`Calculate current CAC, LTGP, and payback period for a ${profile.avgJobLabel}`, "Build a 13-week cash flow forecast", `Identify ${profile.terminology[4]} equipment that would clearly pay for itself`] },
      { label: "Weeks 3-4 — CFA", items: ["Structure one offer to hit a sub-30-day payback", `Test it through ${profile.topChannel.split(":")[0].toLowerCase()}`, "Track CAC and payback closely"] },
      { label: "Weeks 5-8 — Equipment", items: [`Identify ${profile.terminology[5]} equipment worth financing`, "Run the ROI math before applying", "Finance and track the real revenue impact"] },
      { label: "Ongoing — Scale Safely", items: ["Reinvest profit into acquisition using CFA", "Keep debt-to-revenue under 30%", profile.crewNote] },
    ],
    checklist: (trade, profile) => [
      `CAC, LTGP, and payback period calculated for a ${profile.avgJobLabel}`,
      "13-week cash flow forecast built and maintained",
      "At least one offer structured for sub-30-day payback",
      `Equipment financing run through a clear ROI check for ${profile.terminology[2]} assets`,
      "Debt-to-revenue ratio tracked and kept under 30%",
      "2-3 month cash reserve maintained",
    ],
    keyTakeaways: (trade, profile) => [
      "Customer Financed Acquisition scales a business using its own cash flow instead of outside capital",
      "A sub-30-day payback period is the real goal — the faster repaid, the faster reinvested",
      "Finance equipment only when the numbers clearly show it pays for itself",
      profile.differentiator,
    ],
  },

  "content-marketing-social-media": {
    slug: "content-marketing-social-media",
    title: "Content Marketing & Social Media",
    icon: "lucide:megaphone",
    tagline: (trade, profile) => `The content mix and engagement tactics that turn organic social into real ${profile.avgJobLabel} leads.`,
    tldrSummary: (trade, profile) =>
      `Content marketing is the most underused lead channel in this trade. ${profile.warStory}`,
    tldrBullets: (trade, profile) => [
      "Facebook and Instagram should get the majority of content effort — they're built for local targeting and visual proof",
      `Video content on ${profile.terminology[0]} work gets far more engagement than photos alone`,
      "An \"Engage + DM\" habit turns passive followers into booked estimates",
      profile.differentiator,
      profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
    ],
    tldrBottomLine: (trade, profile) =>
      `Put 80% of content effort into Facebook and Instagram, post a real mix built around ${profile.terminology[1]} and ${profile.terminology[2]}, and actively engage rather than just posting and waiting.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `Facebook and Instagram outperform every other platform here because of local targeting and the visual nature of ${profile.terminology[3]} work — an older homeowner demographic and genuinely useful business tools do the rest.` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Content Mix" },
      {
        type: "bullets",
        items: [
          `Before/after ${profile.terminology[4]} photos or carousels — twice a week`,
          `Educational content — a ${profile.terminology[5]} tip or seasonal reminder — twice a week`,
          `Behind-the-scenes video from a real ${profile.avgJobLabel} — about once a week`,
          "Customer testimonials — about once a week",
          profile.seasonalNote,
        ],
      },

      { type: "heading", text: "The 3-Shot Video Framework" },
      { type: "paragraph", text: `Hook in the first 3 seconds with the ${profile.avgJobLabel} problem, deliver real value on ${profile.terminology[0]} for 20-50 seconds, then a clear call to action. Works across Reels, TikTok, and YouTube Shorts with minor tweaks.` },

      { type: "heading", text: "The \"Engage + DM\" Strategy" },
      { type: "paragraph", text: `Follow back everyone who meaningfully engages, then send a short, personalized message about their ${profile.terminology[1]} question — not a pitch, a genuine offer. ${profile.commonObjection.objection} ${profile.commonObjection.response}` },

      { type: "heading", text: "Platform Notes" },
      { type: "paragraph", text: `YouTube works for longer ${profile.avgJobLabel} walkthroughs. TikTok rewards fast, satisfying clips over polish. LinkedIn is worth a modest effort for pursuing ${profile.commercialExample} — case studies land better there than anywhere else. ${profile.crewNote}` },

      { type: "heading", text: "Tracking What Actually Works" },
      { type: "paragraph", text: `Track leads by platform, not just likes — a unique phone number or a simple "how did you hear about us" question tells you which platform actually produces a ${profile.avgJobLabel} booking, not just engagement. ${profile.topChannel}` },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Week 1 — Foundation", items: ["Set up or clean up profiles on Facebook, Instagram, and YouTube", `Optimize bios with phone number and service area for ${profile.avgJobLabel} searches`, `Build a content calendar around ${profile.terminology[2]}`] },
      { label: "Week 2 — Content Batch", items: [`Record 10-15 short videos from current ${profile.avgJobLabel} jobs`, "Take 50+ photos across categories", "Write a week of captions in advance"] },
      { label: "Week 3 — Engagement", items: ["Start the Engage + DM habit daily", `Join local ${profile.terminology[0]} community groups and contribute genuinely`, "Respond to every comment and DM within 24 hours"] },
      { label: "Week 4+ — Optimize", items: ["Review what content actually drove leads", "Double down on the best-performing formats", profile.crewNote] },
    ],
    checklist: (trade, profile) => [
      "Business profiles set up and optimized on Facebook, Instagram, and YouTube",
      "Content calendar built with a real content mix",
      `At least 10 videos and 50 photos from real ${profile.avgJobLabel} jobs`,
      "Engage + DM habit running daily",
      "Leads tracked by platform, not just engagement",
      "Posting consistently 3-5x/week",
    ],
    keyTakeaways: (trade, profile) => [
      "Facebook and Instagram deserve the majority of content effort for this trade",
      "Video consistently outperforms static photos for engagement and trust-building",
      "Engage + DM turns passive followers into booked jobs — most businesses skip this step",
      profile.differentiator,
    ],
  },

  "ai-powered-marketing": {
    slug: "ai-powered-marketing",
    title: "AI-Powered Marketing",
    icon: "lucide:sparkles",
    tagline: (trade, profile) => `Use AI to 10x ${profile.avgJobLabel} marketing output without hiring a marketing team.`,
    tldrSummary: (trade, profile) =>
      `AI tools let a small operator produce the content and follow-up volume that used to require a department. ${profile.warStory}`,
    tldrBullets: (trade, profile) => [
      `AI content creation: draft ${profile.terminology[0]}-focused blog posts, captions, and ad copy in minutes`,
      `AI lead response: automated follow-up can answer a new ${profile.avgJobLabel} inquiry in under a minute, any time of day`,
      profile.toolMention.charAt(0).toUpperCase() + profile.toolMention.slice(1),
      "AI ad testing: generate and test many variations at once, let the data pick the winner",
      profile.differentiator,
    ],
    tldrBottomLine: (trade, profile) =>
      `Start with a written knowledge base about ${profile.terminology[1]} specifics, learn to prompt well, and use AI for content creation and instant ${profile.avgJobLabel} lead response first.`,
    intro: (trade, profile) => [
      { type: "paragraph", text: `Competitors are already using AI to post more often and follow up faster than a small ${trade.name.toLowerCase()} business can by hand. ${profile.crewNote}` },
    ],
    sections: (trade, profile) => [
      { type: "heading", text: "The Prompting Framework" },
      { type: "paragraph", text: `Every good prompt has three parts: Context (company, credentials, ${profile.terminology[2]} specialization, brand voice), a Specific Task, and Constraints (tone, what to include). A vague prompt gets a generic result on a ${profile.avgJobLabel} post; a specific one is usable on the first try.` },

      { type: "heading", text: "Building a Knowledge Base" },
      { type: "paragraph", text: `Write a reference document once: company info, ${profile.terminology[3]} expertise and common local issues, ${profile.commercialExample} as an ideal customer profile, and real proof points. ${profile.commonObjection.objection} ${profile.commonObjection.response}` },

      { type: "heading", text: "Where AI Saves the Most Time" },
      {
        type: "bullets",
        items: [
          `Blog posts on ${profile.terminology[4]} topics — drafted in minutes, lightly edited rather than written from scratch`,
          `Social captions and a month of ${profile.terminology[0]} content ideas generated in one sitting`,
          `Ad copy testing 5-10 ${profile.avgJobLabel} headlines instead of guessing at one`,
          `Instant response to a ${profile.avgJobLabel} inquiry, even after hours`,
          profile.crewNote,
        ],
      },

      { type: "heading", text: "Common Mistakes" },
      {
        type: "bullets",
        items: [
          "Publishing AI output without a real human pass",
          `Giving too little ${profile.terminology[5]} context and expecting a great result anyway`,
          `Expecting a perfect ${profile.avgJobLabel} post on the first try instead of iterating`,
          "Letting everything sound generic instead of like this specific business",
          profile.topChannel,
        ],
      },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Week 1 — Foundation", items: ["Write the business knowledge base document", "Pick one or two AI tools to start with", `Practice the prompting framework on 10 real ${profile.avgJobLabel} prompts`] },
      { label: "Week 2 — Advertising", items: [`Generate ad variations for the top ${profile.avgJobLabel} service`, "Write Google ad headline/description sets", "Draft landing page copy for the top 2-3 services"] },
      { label: "Week 3 — Content Marketing", items: ["Draft 3-4 blog posts and publish them", "Write a season of email content", "Build an FAQ section for the website"] },
      { label: "Week 4 — Automation", items: ["Build a short lead nurture sequence in the CRM", "Write SMS follow-up templates", profile.crewNote] },
    ],
    checklist: (trade, profile) => [
      "Written knowledge base document exists",
      "Comfortable with the Context / Task / Constraints prompting framework",
      "A month of social content generated in advance",
      "At least one ad campaign has AI-generated variations being tested",
      `3+ blog posts on ${profile.terminology[0]} topics published using AI as a first draft`,
      `An automated first-response message live for new ${profile.avgJobLabel} leads`,
      "Everything published gets a human edit pass before going live",
    ],
    keyTakeaways: (trade, profile) => [
      "The specific AI tool matters less than the underlying skill of prompting well with real context",
      "A written knowledge base is what makes AI output sound like this business, not a generic template",
      "Instant AI-assisted lead response is one of the highest-leverage use cases here",
      profile.differentiator,
    ],
  },
};
