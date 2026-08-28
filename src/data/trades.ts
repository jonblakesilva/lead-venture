export interface Trade {
  name: string;
  icon: string;
  highlightWord: string;
  heroSub: string;
  stats: { value: string; label: string }[];
  benefits: { icon: string; title: string; desc: string }[];
}

export const tradeSlugs = [
  "roofing",
  "hvac",
  "electrical",
  "plumbing",
  "lawn-care",
  "tree-service",
  "landscaping",
  "painting",
  "remodeling",
  "general-contractors",
  "junk-removal",
  "pest-control",
] as const;

export type TradeSlug = (typeof tradeSlugs)[number];

export const tradeData: Record<TradeSlug, Trade> = {
  roofing: {
    name: "Roofing",
    icon: "lucide:home",
    highlightWord: "Roofing",
    heroSub: "Get more roof replacements and repairs with our all-in-one growth platform built specifically for roofers.",
    stats: [
      { value: "82%", label: "of homeowners research roofers online before calling" },
      { value: "3x", label: "more leads with a modern, fast-loading website" },
      { value: "5-Star", label: "reviews are the #1 deciding factor for high-ticket jobs" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "More High-Ticket Jobs", desc: "Position your roofing company as the premium choice in your market with a professional online presence." },
      { icon: "lucide:check-circle-2", title: "Automated Review Requests", desc: "Get more 5-star reviews from happy homeowners automatically after every completed roof." },
      { icon: "lucide:users", title: "Never Miss a Storm Lead", desc: "Our Missed Call Text-Back ensures you capture every frantic homeowner calling after a storm." },
      { icon: "lucide:arrow-right", title: "Re-Marketing Campaigns", desc: "Easily reach out to past repair customers when it's time for a full replacement." },
    ],
  },
  hvac: {
    name: "HVAC",
    icon: "lucide:wind",
    highlightWord: "HVAC",
    heroSub: "Keep your techs busy year-round with predictable lead flow and automated follow-ups.",
    stats: [
      { value: "78%", label: "of emergency HVAC calls go to the first company that answers" },
      { value: "65%", label: "of customers will sign a maintenance agreement if asked" },
      { value: "24/7", label: "lead capture is essential for heating/cooling emergencies" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Dominate Emergency Calls", desc: "Missed Call Text-Back means you never lose an emergency install to a competitor because you were on the other line." },
      { icon: "lucide:check-circle-2", title: "Maintenance Memberships", desc: "Use our SMS campaigns to remind past customers about seasonal tune-ups and sell more agreements." },
      { icon: "lucide:users", title: "Tech-Friendly Mobile App", desc: "Your techs can request reviews right from the driveway while the customer is thrilled with the cold air." },
      { icon: "lucide:arrow-right", title: "Local SEO Supremacy", desc: "Rank higher when homeowners furiously search 'AC repair near me' in the middle of July." },
    ],
  },
  electrical: {
    name: "Electrical",
    icon: "lucide:zap",
    highlightWord: "Electrical",
    heroSub: "Spark more growth with a system designed to capture leads and build trust in your local market.",
    stats: [
      { value: "89%", label: "of customers check reviews before hiring an electrician" },
      { value: "4.5+", label: "star rating is required for most homeowners to trust you" },
      { value: "60%", label: "increase in repeat business with automated follow-ups" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Build Instant Trust", desc: "Showcase your licensing, insurance, and 5-star reviews prominently to win high-value rewiring jobs." },
      { icon: "lucide:check-circle-2", title: "Capture Every Lead", desc: "Whether it's a panel upgrade or a simple fixture install, never miss an inquiry with instant text responses." },
      { icon: "lucide:users", title: "Effortless Communication", desc: "Manage all customer messages, questions, and quote requests from one simple inbox." },
      { icon: "lucide:arrow-right", title: "Stay Top of Mind", desc: "Send targeted campaigns for seasonal safety inspections or smart home upgrades." },
    ],
  },
  plumbing: {
    name: "Plumbing",
    icon: "lucide:droplet",
    highlightWord: "Plumbing",
    heroSub: "Stop the leaks in your sales funnel and dominate local emergency plumbing searches.",
    stats: [
      { value: "85%", label: "of plumbing searches are urgent 'near me' queries" },
      { value: "1st", label: "to respond wins the job 78% of the time" },
      { value: "90%", label: "of consumers read local reviews before calling a plumber" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Win Emergency Jobs", desc: "Our Missed Call Text-Back engages panicked homeowners instantly, stopping them from calling the next plumber on Google." },
      { icon: "lucide:check-circle-2", title: "Rank in the Map Pack", desc: "Local SEO optimization ensures you show up when a pipe bursts at 2 AM." },
      { icon: "lucide:users", title: "Job-Site Review Generation", desc: "Easily text a review link the moment the drain is cleared and the customer is relieved." },
      { icon: "lucide:arrow-right", title: "Water Heater Campaigns", desc: "Automatically follow up with past customers when their water heaters are nearing the end of their lifespan." },
    ],
  },
  "lawn-care": {
    name: "Lawn Care & Mowing",
    icon: "lucide:scissors",
    highlightWord: "Lawn Care",
    heroSub: "Grow your route density and automate your customer communication.",
    stats: [
      { value: "70%", label: "of lawn care customers want text message communication" },
      { value: "5x", label: "more likely to retain customers with regular updates" },
      { value: "80%", label: "of new business comes from local neighborhood visibility" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Increase Route Density", desc: "Use targeted campaigns to offer specials to neighbors of your current clients." },
      { icon: "lucide:check-circle-2", title: "Automated Upsells", desc: "Easily text your mowing list about aeration, overseeding, or fall cleanups with one click." },
      { icon: "lucide:users", title: "Seamless Communication", desc: "Handle weather delays and schedule changes instantly via mass SMS." },
      { icon: "lucide:arrow-right", title: "Collect Reviews on Autopilot", desc: "Build a massive review moat that makes you the obvious choice in your service area." },
    ],
  },
  "tree-service": {
    name: "Tree Service",
    icon: "lucide:tree-pine",
    highlightWord: "Tree Service",
    heroSub: "Branch out and secure more high-ticket removals and pruning jobs.",
    stats: [
      { value: "88%", label: "of homeowners want proof of insurance on your website" },
      { value: "3x", label: "higher conversion rate with professional before/after galleries" },
      { value: "75%", label: "of emergency storm jobs go to the fastest responder" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Showcase Your Expertise", desc: "A modern website that perfectly displays your heavy equipment, safety record, and massive takedowns." },
      { icon: "lucide:check-circle-2", title: "Dominate Storm Season", desc: "Missed Call Text-Back ensures you capture leads when high winds hit and the phone is ringing off the hook." },
      { icon: "lucide:users", title: "High-Ticket Trust", desc: "Automated review requests build the 5-star reputation needed to close $5k+ removal jobs." },
      { icon: "lucide:arrow-right", title: "Seasonal Campaigns", desc: "Remind past customers about winter pruning or deep root fertilization." },
    ],
  },
  landscaping: {
    name: "Landscaping",
    icon: "lucide:sun",
    highlightWord: "Landscaping",
    heroSub: "Turn more design-build leads into profitable outdoor living projects.",
    stats: [
      { value: "94%", label: "of first impressions are based on your website's visual design" },
      { value: "68%", label: "of consumers are willing to pay more for a company with great reviews" },
      { value: "2x", label: "more leads with clear, built-in quote request forms" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Stunning Portfolios", desc: "We build websites that make your hardscaping and outdoor living projects look irresistible." },
      { icon: "lucide:check-circle-2", title: "Streamlined Lead Capture", desc: "Qualify leads before you drive out to the property with smart intake forms." },
      { icon: "lucide:users", title: "Client Communication", desc: "Keep homeowners updated on project timelines via text right from the mobile app." },
      { icon: "lucide:arrow-right", title: "Referral Engine", desc: "Automated follow-ups to turn thrilled clients into your best referral sources." },
    ],
  },
  painting: {
    name: "Painting",
    icon: "lucide:paintbrush",
    highlightWord: "Painting",
    heroSub: "Color your market with a dominant online presence and automated lead follow-up.",
    stats: [
      { value: "81%", label: "of customers check Google Maps before hiring a painter" },
      { value: "73%", label: "of leads are lost due to slow response times" },
      { value: "4x", label: "more likely to close a quote if you follow up within 5 minutes" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Instant Quote Follow-ups", desc: "Never let a hot lead cool down. Automate your follow-ups after sending an estimate." },
      { icon: "lucide:check-circle-2", title: "Visual Proof", desc: "A fast, modern website that beautifully showcases your interior and exterior transformations." },
      { icon: "lucide:users", title: "Review Generation", desc: "Automatically ask for a review the moment the tape comes off and the customer is amazed." },
      { icon: "lucide:arrow-right", title: "Re-Engage Past Clients", desc: "Send an email campaign to past interior clients offering exterior specials in the spring." },
    ],
  },
  remodeling: {
    name: "Remodeling",
    icon: "lucide:hammer",
    highlightWord: "Remodeling",
    heroSub: "Build a pipeline of high-budget kitchen, bath, and home addition projects.",
    stats: [
      { value: "92%", label: "of homeowners research extensively before a major remodel" },
      { value: "85%", label: "trust online reviews as much as personal recommendations" },
      { value: "3x", label: "higher close rate with professional, consistent communication" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Premium Brand Positioning", desc: "A website that reflects the high quality of your craftsmanship and justifies your pricing." },
      { icon: "lucide:check-circle-2", title: "Lead Qualification", desc: "Filter out tire-kickers with smart forms that ask for budget ranges and project timelines." },
      { icon: "lucide:users", title: "Project Milestone Updates", desc: "Use the mobile app to easily text clients updates and photos from the job site." },
      { icon: "lucide:arrow-right", title: "Reputation Management", desc: "Build a fortress of 5-star reviews that makes you the safest choice for a $50k+ project." },
    ],
  },
  "general-contractors": {
    name: "General Contractors",
    icon: "lucide:wrench",
    highlightWord: "General Contractors",
    heroSub: "Streamline your lead flow and manage client communication from anywhere.",
    stats: [
      { value: "88%", label: "of clients demand transparency and fast communication" },
      { value: "70%", label: "of GC leads come from local search and reviews" },
      { value: "5x", label: "return on investment from basic local SEO optimization" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Centralized Communication", desc: "Keep all client texts, emails, and calls in one unified inbox so nothing falls through the cracks." },
      { icon: "lucide:check-circle-2", title: "Professional Web Presence", desc: "Showcase your versatility, licensing, and completed projects to build immediate authority." },
      { icon: "lucide:users", title: "Automated Review Collection", desc: "Consistently gather reviews across all project types to boost your overall Google ranking." },
      { icon: "lucide:arrow-right", title: "Missed Call Protection", desc: "When you're busy on a job site, the system automatically texts back new inquiries to capture the lead." },
    ],
  },
  "junk-removal": {
    name: "Junk Removal",
    icon: "lucide:truck",
    highlightWord: "Junk Removal",
    heroSub: "Haul in more jobs with a system built for speed and local visibility.",
    stats: [
      { value: "82%", label: "of junk removal searches are immediate need ('near me')" },
      { value: "1st", label: "responder wins the job the vast majority of the time" },
      { value: "90%", label: "of consumers check reviews to ensure you are legitimate" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Lightning Fast Responses", desc: "Missed Call Text-Back is a game-changer. If you're driving the truck, the system texts the lead instantly." },
      { icon: "lucide:check-circle-2", title: "Local Map Pack Dominance", desc: "Optimize your Google Business Profile to show up first when people need clutter gone now." },
      { icon: "lucide:users", title: "Frictionless Booking", desc: "Mobile-optimized websites with clear 'Text us a photo for a quote' calls to action." },
      { icon: "lucide:arrow-right", title: "B2B Campaigns", desc: "Easily run campaigns targeting local property managers and real estate agents for recurring work." },
    ],
  },
  "pest-control": {
    name: "Pest Control",
    icon: "lucide:shield-alert",
    highlightWord: "Pest Control",
    heroSub: "Exterminate the competition with automated marketing and instant lead response.",
    stats: [
      { value: "79%", label: "of pest control searches result in a phone call" },
      { value: "65%", label: "of revenue comes from recurring maintenance plans" },
      { value: "88%", label: "of customers read reviews before letting someone in their home" },
    ],
    benefits: [
      { icon: "lucide:trending-up", title: "Capture Panicked Leads", desc: "When someone sees a roach, they want help NOW. Missed Call Text-Back ensures you get the job even if you miss the call." },
      { icon: "lucide:check-circle-2", title: "Sell More Subscriptions", desc: "Use automated campaigns to upsell one-time spray customers into quarterly maintenance plans." },
      { icon: "lucide:users", title: "Build Unshakable Trust", desc: "Automate review requests to show new customers you are safe, reliable, and effective." },
      { icon: "lucide:arrow-right", title: "Seasonal Promos", desc: "One-click text campaigns for mosquito season, termite inspections, or rodent control." },
    ],
  },
};
