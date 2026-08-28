// ─── Business Configuration ───────────────────────────────────────────────────
// Update this file once per client site. Every page, schema, and component
// reads from here — you should not need to change business details anywhere else.

export const business = {
  // ── Identity ──
  name: "The Lead Venture",
  tagline: "Automate your leads, fill your calendar, and get more 5-star reviews.",
  niche: "Contracting & Home Services Marketing",
  industry: "Digital Marketing Services",
  website: "https://theleadventure.com",
  yearFounded: 2020,
  licenseNumber: "",

  // ── Contact ──
  phone: "+1 (419) 548-5543",
  phoneRaw: "14195485543",
  email: "mail@theleadventure.com",
  address: {
    streetAddress: "Canton, OH",
    addressLocality: "Canton",
    addressRegion: "OH",
    postalCode: "44702",
    addressCountry: "US",
  },

  // ── Location ──
  city: "Canton",
  state: "OH",
  zip: "44702",
  serviceRadius: "Ohio and surrounding markets",
  serviceAreas: [
    "Canton, OH",
    "Akron, OH",
    "Massillon, OH",
    "Youngstown, OH",
    "Cleveland, OH",
    "Ohio",
  ],
  lat: 40.7989,
  lng: -81.3784,

  // ── Google ──
  placeId: "",

  // ── Social ──
  socials: {
    facebook: "",
    instagram: "",
    google: "",
    nextdoor: "",
  },

  // ── Trust / SEO signals ──
  reviewCount: 200,
  rating: "4.9",
  guaranteeText: "Done-for-you growth system",
  businessHours: {
    Monday: "09:00-17:00",
    Tuesday: "09:00-17:00",
    Wednesday: "09:00-17:00",
    Thursday: "09:00-17:00",
    Friday: "09:00-17:00",
    Saturday: "Closed",
    Sunday: "Closed",
  },

  // ── SEO / content keywords ──
  keywords: [
    "contractor marketing",
    "home services marketing",
    "local SEO for contractors",
    "website design for contractors",
    "AI receptionist for contractors",
    "review generation for contractors",
    "lead generation for home services",
    "digital marketing agency for trades",
  ],

  // ── Quick-stats (homepage stat band) ──
  stats: {
    jobsCompleted: 500,
    yearsInBusiness: 5,
    satisfactionRate: 98,
    citiesServed: 12,
  },

  // ── Services (short list for footer quick-links) ──
  primaryServices: [
    "Modern Website",
    "5-Star Review System",
    "Missed Call Text Back",
    "Local SEO",
    "AI Receptionist",
    "Re-Marketing Campaigns",
  ],
};
