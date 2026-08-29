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
      `${profile.terminology[2]} and ${profile.terminology[3]} are real costs — track them or your COGS number is fiction`,
      `Target 40-55% COGS on a ${trade.name.toLowerCase()} job, which usually means ${profile.crewHourlyCost >= 60 ? "keeping loaded labor cost disciplined" : "keeping fuel, materials, and disposal costs tracked job by job"}`,
      `${profile.commercialExample} changes your LTGP math by an order of magnitude over a one-off job`,
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
      { type: "paragraph", text: `${profile.terminology[0]} and ${profile.terminology[4]} both matter less here than the gap above — you can afford 30-50% of LTGP to win ${profile.commercialExample}, which usually means outbidding every competitor still pricing off the first invoice.` },

      { type: "heading", text: "Customer Financed Acquisition (CFA)" },
      { type: "paragraph", text: `A new customer pays up front for a ${profile.avgJobLabel}; roughly half of that comes back as Gross Profit; that profit buys the next customer. ${profile.terminology[3]} work is exactly the kind of job that shortens this loop, since a fast payback beats a bigger job that takes months to pay for itself.` },

      { type: "heading", text: "Why Premium Clients Get Premium Service" },
      { type: "paragraph", text: profile.crewNote },

      { type: "heading", text: "Where High-Tier Clients Actually Come From" },
      { type: "paragraph", text: `${profile.commonObjection.objection} ${profile.commonObjection.response}` },
      {
        type: "bullets",
        items: [
          profile.commercialExample,
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
      `${profile.commercialExample} is worth far more over time than the first invoice suggests`,
      profile.toolMention,
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
      profile.toolMention,
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

      { type: "heading", text: "Referrals & Strategic Partnerships" },
      { type: "paragraph", text: `A simple per-referral cash incentive, promoted after every closed job, usually gets this moving on its own.` },
      {
        type: "bullets",
        items: [
          `Property managers who need ongoing ${profile.recurringServiceLabel} across a whole portfolio`,
          `${profile.commercialExample}, approached directly instead of waiting on an RFP`,
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
      { label: "Month 4+ — Scale", items: ["Review cost-per-lead by channel monthly", "Cut what isn't converting", `Double down on ${profile.topChannel.split(":")[0].toLowerCase()} once it's proven`] },
    ],
    checklist: (trade, profile) => [
      "Google Business Profile fully optimized with 50+ photos",
      "Automated review request system live",
      `Service pages show a real ${profile.avgJobLabel} price range`,
      "Call tracking implemented",
      `First campaign live on ${profile.topChannel.split(":")[0].toLowerCase()}`,
      "Referral program launched and promoted",
      `At least one ${profile.commercialExample}-type partner contacted`,
      "Cost per lead tracked by channel",
    ],
    keyTakeaways: (trade, profile) => [
      profile.topChannel,
      `Target cost-per-lead around 10-15% of a ${fmt(profile.avgJobValue)} ${profile.avgJobLabel}`,
      "Referrals close far better than cold leads and cost a fraction as much — build a system for asking",
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
      profile.toolMention,
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
          profile.toolMention,
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
      profile.toolMention,
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
          profile.toolMention,
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
      profile.seasonalNote,
      profile.toolMention,
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

      { type: "heading", text: "The Leave-Behind & Follow-Up" },
      { type: "paragraph", text: `A one-page leave-behind — before/after photos, testimonials, credentials — makes a small operation look established. For anyone who doesn't sign on the spot, follow-up through ${profile.topChannel.split(":")[0].toLowerCase()} over the next week closes a real share of "I need to think about it" leads that would otherwise go cold.` },
    ],
    implementationPlan: (trade, profile) => [
      { label: "Week 1 — Fix Your Appearance", items: ["Get magnetic signs or a wrap for the vehicle", "Order branded shirts", "Put together a leave-behind packet", `Photograph the crew and ${profile.terminology[3]}`] },
      { label: "Week 2 — Confirmation System", items: [`Set up confirmation texts ahead of the ${profile.avgJobLabel} visit`, "Add a 2-hour reminder", "Add an arrival text with a photo"] },
      { label: "Week 3 — Master the Presentation", items: [`Write the Process script for a ${profile.avgJobLabel}`, `Gather Proof: licensing, ${profile.terminology[2]}, real reviews`, "Practice presenting seated at a table"] },
      { label: "Week 4 — Objection Handling", items: [`Script a response to "${profile.commonObjection.objection.replace(/"/g, "")}"`, "Write out the next 4 most common objections", profile.differentiator] },
    ],
    checklist: (trade, profile) => [
      "Vehicle and team look professional on arrival",
      "Confirmation text sequence automated",
      `Process → Proof → Price script written for a ${profile.avgJobLabel}`,
      `Good / Better / Best pricing built with a real ${profile.terminology[5]} add-on`,
      `Response ready for "${profile.commonObjection.objection.replace(/"/g, "")}"`,
      `${profile.topChannel.split(":")[0]}-based follow-up sequence in place for non-closes`,
      "Close rate and average ticket tracked weekly",
    ],
    keyTakeaways: (trade, profile) => [
      `A high close rate on a ${profile.avgJobLabel} is often a sign of leaving money on the table, not great salesmanship`,
      "Process, then Proof, then Price — in that order — builds enough value that the price lands as reasonable",
      `Three price options beat one — most customers pick the ${profile.recurringServiceLabel}-adjacent middle tier`,
      profile.differentiator,
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
