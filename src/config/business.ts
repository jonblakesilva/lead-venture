// ─── Business Configuration ───────────────────────────────────────────────────
// Update this file once per client site. Every page, schema, and component
// reads from here — you should not need to change business details anywhere else.

export const business = {
  // ── Identity ──
  name: "Your Business Name",
  tagline: "Professional service you can count on — done right the first time.",
  niche: "Home Services",          // e.g. "HVAC", "Roofing", "Plumbing", "Lawn Care"
  yearFounded: 2010,               // used in "X years in business" stats
  licenseNumber: "LIC-000000",     // show on About / footer (set "" to hide)

  // ── Contact ──
  phone: "(555) 555-5555",
  phoneRaw: "5555555555",          // digits only — used in tel: links
  email: "hello@yourbusiness.com",

  // ── Location ──
  // Service-area businesses often have no public street address.
  // Fill city/state/zip for local SEO without exposing a home address.
  city: "Your City",
  state: "ST",
  zip: "00000",
  serviceRadius: "30 mile radius", // e.g. "50 miles", "metro area"

  // ── Google ──
  // placeId: get it from Google Maps → Share → copy the Place ID, or use
  //   https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
  // Enable "Places API (New)" and "Maps Embed API" in Google Cloud Console.
  // Set GOOGLE_PLACES_API_KEY and PUBLIC_GOOGLE_MAPS_KEY in Cloudflare env vars.
  placeId: "",      // e.g. "ChIJN1t_tDeuEmsRUsoyG83frY4"

  // ── Social ──
  socials: {
    facebook:  "",   // full URL: https://facebook.com/yourbusiness
    instagram: "",   // full URL: https://instagram.com/yourbusiness
    google:    "",   // Google Business Profile URL (for review link CTA)
    nextdoor:  "",   // Nextdoor business page URL
  },

  // ── Trust / SEO signals ──
  reviewCount: 200,           // shown in hero and trust bar ("200+ reviews")
  rating: "4.9",              // shown as "Rated 4.9/5"
  guaranteeText: "100% Satisfaction Guaranteed",

  // ── Quick-stats (homepage stat band) ──
  stats: {
    jobsCompleted:    500,   // e.g. 500+ jobs completed
    yearsInBusiness:  15,    // override or calculate from yearFounded
    satisfactionRate: 98,    // percentage
    citiesServed:     12,    // number of cities/towns in service area
  },

  // ── Services (short list for footer quick-links) ──
  // Full service pages live in src/content/services/ — this is just for the footer.
  primaryServices: [
    "Service One",
    "Service Two",
    "Service Three",
    "Service Four",
    "Service Five",
    "Emergency Service",
  ],
};
