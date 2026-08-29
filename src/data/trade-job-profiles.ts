import type { TradeSlug } from "./trades";

export interface TradeJobProfile {
  /** The trade slug this profile belongs to (matches TradeSlug / tradeData key) */
  slug: TradeSlug;
  /** Typical mid-tier job used in worked examples */
  avgJobLabel: string;
  avgJobValue: number;
  /** A smaller, common job type + price range */
  lowJob: { label: string; low: number; high: number };
  /** A larger, high-ticket job type + price range */
  highJob: { label: string; low: number; high: number };
  /** What a "commercial" / high-tier recurring client looks like for this trade */
  commercialExample: string;
  commercialAnnualValue: number;
  /** Loaded hourly crew cost used in COGS breakdowns */
  crewHourlyCost: number;
  /** Recurring/repeat service naming for retention & ascension content */
  recurringServiceLabel: string;
  /** 4-6 jargon/terminology words natural to this trade, for use throughout copy */
  terminology: string[];
  /** 1-2 sentences on this trade's seasonal demand pattern */
  seasonalNote: string;
  /** 1-2 sentences on the single highest-leverage marketing channel/tactic for this trade */
  topChannel: string;
  /** A realistic, trade-specific price objection and how to answer it */
  commonObjection: { objection: string; response: string };
  /** A short, illustrative field anecdote in this trade's own terms (archetypal, not a specific named client) */
  warStory: string;
  /** A real category of software/tool relevant to this trade */
  toolMention: string;
  /** An operational nuance specific to this trade's crew, equipment, or fieldwork */
  crewNote: string;
  /** What separates a top performer from an average one in this trade */
  differentiator: string;
  /** The single best-performing visual content format for this trade (drone, time-lapse, before/after, etc.) */
  visualContentIdea: string;
}

export const tradeJobProfiles: Record<TradeSlug, TradeJobProfile> = {
  roofing: {
    slug: "roofing",
    avgJobLabel: "roof repair",
    avgJobValue: 1800,
    lowJob: { label: "minor leak repair", low: 400, high: 900 },
    highJob: { label: "full roof replacement", low: 8000, high: 16000 },
    commercialExample: "a property management company with a 40-unit portfolio",
    commercialAnnualValue: 28000,
    crewHourlyCost: 65,
    recurringServiceLabel: "annual roof inspection",
    terminology: ["tear-off", "decking", "ice-and-water shield", "storm chasing", "shingle squares", "ridge vent"],
    seasonalNote:
      "Demand spikes hard in the 48 hours after a hailstorm or high-wind event, then goes quiet in the dead of winter in most climates — the roofers who win are ready to move fast right after a storm and have a real plan for the slow months instead of just riding them out.",
    topChannel:
      "Storm-tracking and rapid-response advertising outperforms everything else: the roofer who shows up in someone's search or mailbox within a day or two of a hailstorm captures the insurance-claim job before a competitor even gets a truck out there.",
    commonObjection: {
      objection: "\"My insurance adjuster already gave me a number — why is your quote different?\"",
      response:
        "Walk them through supplement documentation: adjusters miss code-required items like ice-and-water shield and proper ventilation more often than homeowners realize, and a detailed inspection report justifying a supplement is routine, not a red flag.",
    },
    warStory:
      "A homeowner assumed a small attic stain meant a simple patch — a full inspection found compromised decking under three layers of old shingles, the kind of thing that turns a $600 call into a $9,000 tear-off, and a customer who's relieved you caught it before the next storm did.",
    toolMention: "aerial measurement tools like EagleView or Hover for instant, accurate roof measurements without climbing a ladder for every estimate",
    crewNote: "Visible crew safety gear — harnesses, roof jacks, OSHA-compliant fall protection — isn't just a compliance checkbox; it's one of the first things a homeowner researching a $12,000 replacement notices.",
    differentiator: "The roofers who win high-ticket replacements over cheaper competitors are the ones who document everything — drone photos, moisture readings, a written scope — so the homeowner sees exactly what they're paying for.",
    visualContentIdea: "A drone flyover of a finished roof, shot from an angle no ladder photo can match, shows off clean tear-off lines and proper ridge-vent work in a way that stops the scroll on someone's phone.",
  },
  hvac: {
    slug: "hvac",
    avgJobLabel: "AC repair",
    avgJobValue: 650,
    lowJob: { label: "diagnostic + minor repair", low: 150, high: 450 },
    highJob: { label: "full system replacement", low: 5000, high: 11000 },
    commercialExample: "a commercial property with rooftop units under a service contract",
    commercialAnnualValue: 22000,
    crewHourlyCost: 70,
    recurringServiceLabel: "seasonal maintenance tune-up",
    terminology: ["SEER rating", "no-heat call", "refrigerant charge", "ductwork", "load calculation", "static pressure"],
    seasonalNote:
      "Business runs in two hard peaks — AC failures in the first heat wave of summer, no-heat emergencies in the first cold snap of winter — with slower shoulder seasons in between that are the best window to sell maintenance agreements before the next peak hits.",
    topChannel:
      "Maintenance agreements are the highest-leverage channel in HVAC: a customer on a spring/fall tune-up plan calls you first when a system fails, instead of googling \"AC repair near me\" and taking whoever answers.",
    commonObjection: {
      objection: "\"Can't you just fix it instead of replacing the whole system?\"",
      response:
        "Be straight about the math: a 15+ year-old system with a failing compressor often costs more to keep patching over a year than a new, higher-SEER system costs to finance, and the new system stops the recurring service calls entirely.",
    },
    warStory:
      "A customer wanted \"just a recharge\" on a system that was clearly leaking refrigerant — recharging without finding the leak first would have meant the same 2 AM no-cool call again within weeks, and walking them through why the leak search mattered turned a $150 visit into trust that led to a full system replacement two years later.",
    toolMention: "smart thermostats and remote diagnostic tools that let a tech see error codes before ever driving to the property",
    crewNote: "Techs need real EPA 608 refrigerant-handling certification — it's a legal requirement, and calling it out explicitly on the website is a trust signal most competitors skip.",
    differentiator: "The HVAC companies that grow fastest treat every repair call as a maintenance-agreement pitch, not just a one-off fix — that's where the recurring revenue actually comes from.",
    visualContentIdea: "A quick video of a rusted, failing unit getting hauled out next to the clean new install proves the old system was really failing — no drone needed, just proof a homeowner can point to when a neighbor asks.",
  },
  electrical: {
    slug: "electrical",
    avgJobLabel: "panel upgrade",
    avgJobValue: 2400,
    lowJob: { label: "fixture or outlet install", low: 150, high: 400 },
    highJob: { label: "full home rewire", low: 6000, high: 15000 },
    commercialExample: "a commercial building on a quarterly electrical safety contract",
    commercialAnnualValue: 18000,
    crewHourlyCost: 75,
    recurringServiceLabel: "annual safety inspection",
    terminology: ["panel amperage", "arc-fault protection", "code compliance", "load center", "GFCI", "rough-in"],
    seasonalNote:
      "Demand is steadier year-round than most trades, with a bump around the holidays for lighting and generator installs ahead of winter storms, and again in spring/summer for outdoor and smart-home upgrades.",
    topChannel:
      "Trust signals do more work here than in almost any other trade — licensing, insurance, and a clean safety record need to be front and center, because homeowners are inviting someone into their electrical panel, not just their yard.",
    commonObjection: {
      objection: "\"Another electrician quoted less for the same panel upgrade.\"",
      response:
        "Ask what amperage and brand of panel they quoted, and whether permits and inspection were included — a lowball quote on electrical work is one of the more common ways corners get cut, and it's worth saying so plainly.",
    },
    warStory:
      "A routine outlet-install call turned into finding aluminum wiring from a 1970s renovation that hadn't been touched since — the kind of hidden hazard that turns a $200 job into a safety conversation the homeowner is genuinely grateful to have had, even at a higher price.",
    toolMention: "thermal imaging cameras to spot overheating connections and failing breakers before they become a fire risk, not just after",
    crewNote: "Every job that touches the panel should end with a photo of the completed, labeled panel — cheap proof of professionalism a homeowner remembers and a competitor rarely bothers to provide.",
    differentiator: "The electricians who consistently win rewiring and panel-upgrade jobs over cheaper bids are the ones who explain code requirements in plain language instead of just quoting a number.",
    visualContentIdea: "A close-up video comparing an old, overloaded panel to the clean, labeled replacement is this trade's version of a drone shot — it's the one piece of footage that actually explains why the upgrade mattered.",
  },
  plumbing: {
    slug: "plumbing",
    avgJobLabel: "water heater replacement",
    avgJobValue: 1600,
    lowJob: { label: "drain clearing", low: 150, high: 350 },
    highJob: { label: "full repipe", low: 4000, high: 9000 },
    commercialExample: "a property management company managing multiple rental units",
    commercialAnnualValue: 20000,
    crewHourlyCost: 65,
    recurringServiceLabel: "annual plumbing inspection",
    terminology: ["trenchless repair", "video camera inspection", "hydro-jetting", "water heater flush", "main line", "backflow prevention"],
    seasonalNote:
      "Frozen and burst pipes drive a hard winter spike in cold climates, while water heater failures and slow drains stay fairly constant year-round — the emergency side of the business is highly seasonal even when the routine side isn't.",
    topChannel:
      "Speed-to-lead on emergency search traffic is everything — someone with water actively leaking is calling the first plumber who picks up or texts back, not comparison shopping.",
    commonObjection: {
      objection: "\"$150 just to look at a slow drain seems like a lot.\"",
      response:
        "Explain what the visit actually includes — diagnosis, a camera inspection if needed, and a real quote before any work starts — and that it protects the customer from a phone-quote guess that turns into a much bigger bill on-site.",
    },
    warStory:
      "A customer called about one slow drain — a video camera inspection found root intrusion collapsing the main line thirty feet out, the kind of problem that would have kept coming back every few months until it was actually diagnosed instead of just cleared.",
    toolMention: "video inspection cameras that let a customer see the actual problem inside their pipe on a screen, rather than just taking your word for it",
    crewNote: "Trucks stocked for same-visit completion — common parts, a range of water heater sizes — turn a \"we'll have to come back\" job into a same-day close far more often.",
    differentiator: "The plumbers who build the biggest referral base are the ones who show the customer the problem — camera footage, a clear photo — instead of just describing it.",
    visualContentIdea: "A short video of a corroded, leaking water heater next to its brand-new replacement tells the whole story in ten seconds — exactly the kind of before-and-after a homeowner shares with a neighbor who's been putting off the same fix.",
  },
  "lawn-care": {
    slug: "lawn-care",
    avgJobLabel: "seasonal cleanup",
    avgJobValue: 450,
    lowJob: { label: "one-time mow", low: 50, high: 100 },
    highJob: { label: "full property renovation (aeration, seeding, mulch)", low: 2000, high: 6000 },
    commercialExample: "an HOA with 100+ homes on a weekly service contract",
    commercialAnnualValue: 35000,
    crewHourlyCost: 45,
    recurringServiceLabel: "weekly mowing route",
    terminology: ["route density", "aeration and overseeding", "grub treatment", "mowing height", "growing season", "fertilization program"],
    seasonalNote:
      "Revenue is heavily seasonal in most climates — a growing-season peak from spring through fall and a hard drop in winter — which makes off-season services like leaf removal, snow, or holiday lighting important for smoothing cash flow.",
    topChannel:
      "Route density beats almost every other lever: a targeted offer to the five houses next to an existing customer is cheaper to win and cheaper to service than a lead ten miles away, because it's added to a route you're already driving.",
    commonObjection: {
      objection: "\"A guy down the street will mow for $10 less.\"",
      response:
        "Reframe around reliability and consistency — insurance, a real schedule that doesn't skip weeks, and a crew that shows up whether or not the \"guy with a truck\" feels like it that day.",
    },
    warStory:
      "A customer switched from a cash-only neighbor kid to a real service after three skipped weeks in the peak of growing season — the lesson being that reliability, not price, is usually what actually loses lawn-care customers to a competitor.",
    toolMention: "route-optimization software that clusters same-day stops geographically instead of crews crisscrossing town",
    crewNote: "Mowing-height and blade-sharpness standards are invisible to most customers day-to-day, but a scalped or torn-looking lawn is one of the fastest ways to lose a client who won't necessarily tell you why they left.",
    differentiator: "The lawn care companies that scale past a one-truck operation are the ones who sell the annual program — mowing plus aeration, fertilization, and fall cleanup — instead of re-selling a single mow every single week.",
    visualContentIdea: "A drone flyover comparing an overgrown yard to the same property right after a seasonal cleanup is some of the easiest content in the trade to get shared — the transformation reads instantly, even to someone just scrolling past.",
  },
  "tree-service": {
    slug: "tree-service",
    avgJobLabel: "tree removal",
    avgJobValue: 2000,
    lowJob: { label: "pruning / trim", low: 300, high: 700 },
    highJob: { label: "large removal with crane", low: 5000, high: 12000 },
    commercialExample: "a municipality or HOA with a standing tree-maintenance contract",
    commercialAnnualValue: 25000,
    crewHourlyCost: 50,
    recurringServiceLabel: "annual pruning visit",
    terminology: ["canopy thinning", "storm damage mitigation", "stump grinding", "crown reduction", "rigging", "ISA arborist certification"],
    seasonalNote:
      "Storm season creates sudden, urgent demand spikes, while late fall through winter dormancy is prime time for planned pruning and removals that don't have to compete with peak-season pricing.",
    topChannel:
      "Fast response after a wind or ice storm wins the most valuable jobs of the year — homeowners with a tree on their roof or blocking their driveway call whoever can show up today, and storm removals often lead to referral relationships with adjusters and roofers.",
    commonObjection: {
      objection: "\"$2,000 seems like a lot to remove one tree.\"",
      response:
        "Break down what's actually included — insurance in case of property damage, ISA-certified climbers, equipment like a crane or chipper truck, and cleanup and hauling — most homeowners are pricing the labor, not the liability and equipment behind it.",
    },
    warStory:
      "A homeowner wanted \"just the leaning branch\" trimmed — a proper canopy assessment found the whole tree had root damage from recent construction and was a genuine hazard, which turned a $300 call into a $2,400 removal the homeowner was glad to have caught before the next storm.",
    toolMention: "aerial bucket trucks and professional rigging equipment that let a crew safely remove large limbs over a house or power line instead of just climbing with a chainsaw and hoping",
    crewNote: "Proof of liability insurance and ISA arborist certification, shown clearly before the crew ever shows up, is one of the biggest differentiators in a trade where a mistake can mean real property damage.",
    differentiator: "The tree services that command premium prices are the ones with visible certifications, real insurance, and a fast, organized response to storm damage — not just the biggest chainsaw.",
    visualContentIdea: "A drone shot of a full canopy removal, or a dangerous limb coming down near a roofline, is the kind of dramatic, real footage that gets shared far and wide — it shows the skill and the risk in a way words never could.",
  },
  landscaping: {
    slug: "landscaping",
    avgJobLabel: "landscape refresh",
    avgJobValue: 3500,
    lowJob: { label: "seasonal bed cleanup", low: 300, high: 800 },
    highJob: { label: "design-build hardscape project", low: 10000, high: 40000 },
    commercialExample: "a commercial property on a monthly grounds-maintenance contract",
    commercialAnnualValue: 30000,
    crewHourlyCost: 55,
    recurringServiceLabel: "quarterly maintenance visit",
    terminology: ["hardscape", "design-build", "irrigation zoning", "softscape", "grading and drainage", "outdoor living space"],
    seasonalNote:
      "Design consultations and contract signings cluster in late winter and early spring as homeowners plan for the season, while installation work runs through spring, summer, and early fall.",
    topChannel:
      "Hardscape and outdoor-living renders sell harder than any written estimate — a homeowner staring at a patio-and-fire-pit rendering of their own backyard closes faster than one reading a scope of work.",
    commonObjection: {
      objection: "\"$15,000 for a patio and fire pit feels high.\"",
      response:
        "The grading and drainage work under a hardscape installation never shows up in the final photo, but skip it and the patio heaves within two winters — that's the twenty-year difference between a design-build crew and a paver installer working off a level and a prayer.",
    },
    warStory:
      "A client wanted to skip the drainage plan to save money on a hardscape install — six months later, a neighbor's yard installed by a competitor who skipped the same step had standing water pooling against the softscape beds after every storm, which became the exact pitch that closed the next three estimates.",
    toolMention: "3D rendering software that shows a homeowner their own backyard with the hardscape and softscape already installed, before a single shovel goes in the ground",
    crewNote: "A hardscape install shot at golden hour, cleared of hoses and wheelbarrows, sells the next five estimates harder than any lead the ad budget will buy.",
    differentiator: "The landscaping companies winning the highest-budget hardscape jobs are the ones pitching a full outdoor-living transformation, not a paver count and a mulch quote.",
    visualContentIdea: "A drone flyover of a finished hardscape install, showing the whole layout at once, is one of the best-performing content formats in the trade — it's the one angle a homeowner standing in their own yard never actually gets to see.",
  },
  painting: {
    slug: "painting",
    avgJobLabel: "exterior repaint",
    avgJobValue: 3800,
    lowJob: { label: "single interior room", low: 400, high: 900 },
    highJob: { label: "full exterior repaint", low: 4500, high: 9500 },
    commercialExample: "a multi-unit apartment complex on a rotating repaint contract",
    commercialAnnualValue: 32000,
    crewHourlyCost: 55,
    recurringServiceLabel: "annual touch-up visit",
    terminology: ["cut-in", "prep work", "two-coat system", "caulking and sealing", "sheen level", "spray vs. brush-and-roll"],
    seasonalNote:
      "Exterior work is tightly seasonal — spring through fall in most climates — which makes interior work the natural way to fill winter months when exterior jobs aren't weather-viable.",
    topChannel:
      "Before/after photography is the single best-converting content in this trade — a dramatic transformation photo, posted consistently, sells the outcome far better than any description of paint quality or process.",
    commonObjection: {
      objection: "\"Another painter quoted a third less for the same exterior job.\"",
      response:
        "Ask what prep work is included — scraping, sanding, caulking, and priming are most of what determines whether a paint job lasts three years or twelve, and a much lower bid is almost always cutting prep time, not using cheaper paint.",
    },
    warStory:
      "A homeowner wanted to skip prep and \"just get a fresh coat on\" a peeling exterior — explaining that new paint over unprepped, peeling paint fails within a year turned a smaller quick job into the full prep-and-paint job that actually held up, and a customer who came back for the interior the next spring.",
    toolMention: "color-visualization apps that let a homeowner preview a color on their actual house before committing",
    crewNote: "Drop cloths, careful masking, and daily cleanup are what actually gets remembered and photographed for reviews — customers rarely comment on paint brand, but they always notice a spotless job site.",
    differentiator: "The painting companies that get repeat and referral business are the ones who treat prep work as the product, not an invisible cost to minimize.",
    visualContentIdea: "A slow video walk-around of a freshly painted exterior, shot in good afternoon light, sells the next job harder than any drone footage — color and finish are what close estimates, and video shows both far better than a static photo.",
  },
  remodeling: {
    slug: "remodeling",
    avgJobLabel: "bathroom remodel",
    avgJobValue: 12000,
    lowJob: { label: "bathroom refresh", low: 5000, high: 10000 },
    highJob: { label: "kitchen remodel / home addition", low: 25000, high: 80000 },
    commercialExample: "a property investor doing recurring unit renovations",
    commercialAnnualValue: 60000,
    crewHourlyCost: 70,
    recurringServiceLabel: "annual maintenance walkthrough",
    terminology: ["scope revision", "kitchen/bath teardown sequencing", "permit and inspection", "final walkthrough list", "tile-and-fixture sequencing", "selections (fixtures and finishes)"],
    seasonalNote:
      "Demand is less weather-driven than most trades but still bumps in spring as homeowners plan projects around tax refunds and the summer selling season, with a slower stretch around the holidays.",
    topChannel:
      "One crew running both the design work and the teardown-to-finish build, instead of handing a client off between a separate architect and contractor, shortens the sales cycle and justifies charging more than either one alone.",
    commonObjection: {
      objection: "\"$12,000 for a bathroom remodel is way more than I expected.\"",
      response:
        "A bathroom gut involves a plumber, an electrician, a tile setter, and two inspections before the vanity ever goes in — the sticker shock almost always comes from picturing it as one trade's invoice instead of four.",
    },
    warStory:
      "A client wanted to skip the permit on a bathroom gut to save a week — walking through the resale disclosure risk and the insurance gap on unpermitted plumbing turned that conversation into the same client insisting on pulling permits for every phase of the kitchen job that followed.",
    toolMention: "walkthrough rendering software that puts a client inside their future kitchen or bathroom, tile and fixtures already selected, before demo day",
    crewNote: "A signed change-order sheet before the sledgehammer comes out is what prevents the single most common source of remodeling disputes — scope creep nobody wrote down.",
    differentiator: "The remodelers winning the highest-budget kitchen and bath jobs over cheaper bids are pitching a finished selections package, not a demo-to-drywall bid number.",
    visualContentIdea: "A time-lapse compressing a full bathroom remodel — demo to finished tile — into thirty seconds is some of the most-shared content in the trade, because it shows a transformation nobody actually gets to watch happen in real time.",
  },
  "general-contractors": {
    slug: "general-contractors",
    avgJobLabel: "renovation project",
    avgJobValue: 15000,
    lowJob: { label: "small repair project", low: 1000, high: 3000 },
    highJob: { label: "full renovation or build-out", low: 20000, high: 100000 },
    commercialExample: "a commercial buildout client with repeat projects",
    commercialAnnualValue: 80000,
    crewHourlyCost: 70,
    recurringServiceLabel: "annual property assessment",
    terminology: ["subcontractor coordination", "change order", "punch list", "scope of work", "draw schedule", "lien waiver"],
    seasonalNote:
      "Larger projects run year-round, but new project starts tend to cluster in spring and summer, when weather cooperates for the exterior and site-work phases most projects depend on early.",
    topChannel:
      "Referral relationships with real estate agents, architects, and past clients typically outperform paid ads for larger projects — trust matters more on a $50,000+ project than it does for a $300 repair.",
    commonObjection: {
      objection: "\"Why does your bid have so many line items compared to the other contractor?\"",
      response:
        "A detailed, itemized bid protects the client from change-order surprises later — a vague one-line bid usually means the gaps get discovered, and billed, mid-project instead of upfront.",
    },
    warStory:
      "A client accepted a suspiciously low bid from another contractor for a home addition — it came back to them mid-project as change orders that more than doubled the original price, exactly the pattern a detailed, itemized bid up front is designed to prevent.",
    toolMention: "project management software that gives clients real-time visibility into schedule, budget, and photos instead of a weekly phone update",
    crewNote: "Clear subcontractor scheduling and a real draw schedule tied to milestones, not just time elapsed, are what keep a multi-trade project from stalling on one missed handoff.",
    differentiator: "The general contractors who win the biggest projects over cheaper bids are the ones with organized, transparent communication — clients are really buying certainty the project won't blow up midway through.",
    visualContentIdea: "A time-lapse or before-and-after of a full renovation, especially anything structural, builds more credibility than a portfolio page ever will — it's proof of scope, not just a finished photo.",
  },
  "junk-removal": {
    slug: "junk-removal",
    avgJobLabel: "full truckload pickup",
    avgJobValue: 400,
    lowJob: { label: "single item pickup", low: 75, high: 150 },
    highJob: { label: "full estate or property cleanout", low: 1500, high: 4000 },
    commercialExample: "a property management company with recurring cleanout needs",
    commercialAnnualValue: 15000,
    crewHourlyCost: 45,
    recurringServiceLabel: "recurring monthly pickup",
    terminology: ["load-based pricing", "donation diversion", "same-day haul", "cubic-yard estimate", "heavy-item surcharge", "dump run"],
    seasonalNote:
      "Spring cleaning and moving season, late spring through early fall, drive the busiest stretch, with a secondary bump around the holidays as people clear out space for new purchases.",
    topChannel:
      "Speed wins this trade more than almost any other — same-day availability and a fast text-back on a photo quote consistently beat a cheaper competitor who can't show up until next week.",
    commonObjection: {
      objection: "\"Why is a full truckload so much more than I expected?\"",
      response:
        "Break down what's included — labor to load everything, dump and disposal fees, and donation drop-off for usable items — most people price \"a truck\" without realizing disposal fees alone can be a meaningful chunk of the job.",
    },
    warStory:
      "A property manager needed an estate cleanout done same-day before a new tenant moved in — being the one company that could actually show up that afternoon, not next week, turned into a standing relationship covering every turnover cleanout at that property since.",
    toolMention: "photo-quote and dispatch software that lets a customer text a picture and get a real price in minutes instead of waiting for an in-person estimate",
    crewNote: "Sorting for donation and recycling on-site, not just dumping everything, is a small extra step that shows up directly in reviews and repeat business from environmentally-conscious customers.",
    differentiator: "The junk removal companies that build recurring B2B revenue are the ones who proactively reach out to property managers and real estate agents instead of waiting for one-off residential calls.",
    visualContentIdea: "A before-and-after video of a packed garage or property turned completely empty is some of the most satisfying, shareable content in the trade — the payoff is immediate and needs almost no explanation.",
  },
  "pest-control": {
    slug: "pest-control",
    avgJobLabel: "initial pest treatment",
    avgJobValue: 350,
    lowJob: { label: "one-time spray", low: 100, high: 200 },
    highJob: { label: "termite treatment", low: 1200, high: 3000 },
    commercialExample: "a commercial property on a quarterly pest management contract",
    commercialAnnualValue: 16000,
    crewHourlyCost: 45,
    recurringServiceLabel: "quarterly maintenance visit",
    terminology: ["integrated pest management (IPM)", "quarterly treatment", "termite bond", "perimeter treatment", "baiting system", "exclusion work"],
    seasonalNote:
      "Spring and summer bring the heaviest call volume as insect activity peaks, while the recurring-contract side of the business — quarterly plans — is what keeps revenue steady through the slower fall and winter months.",
    topChannel:
      "Converting one-time treatments into quarterly maintenance plans is the single highest-leverage move in this trade — recurring plan revenue is what actually smooths out the seasonal spike in one-time calls.",
    commonObjection: {
      objection: "\"Can't I just buy spray from the hardware store myself?\"",
      response:
        "Explain the difference between surface spray and integrated pest management — professional-grade product targeting the source and entry points instead of just what's visible, plus a follow-up plan if it comes back.",
    },
    warStory:
      "A customer with a recurring ant problem had tried store-bought spray for months — a proper inspection found the actual entry point behind an exterior wall, and a quarterly plan, not a one-time spray, was what actually kept it from coming back, which became the exact story used to sell every ant-problem prospect since.",
    toolMention: "treatment-tracking software that documents exactly what was applied, where, and when, for compliance and for showing the customer a real service history",
    crewNote: "A technician who explains what they're doing and why, room by room, converts one-time spray customers into quarterly plan customers far more often than one who just sprays and leaves.",
    differentiator: "The pest control companies with the best margins are the ones with the highest percentage of revenue on recurring quarterly plans, not one-time treatments.",
    visualContentIdea: "A short video of an actual inspection find — a nest, termite damage, a rodent entry point — justifies a treatment far better than any sales pitch, because it's proof of the problem instead of just a claim about it.",
  },
};
