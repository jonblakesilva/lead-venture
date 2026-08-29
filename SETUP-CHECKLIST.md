# Site Setup Checklist

Take a fresh clone of this template from start to launch-ready. Work top to bottom — earlier steps populate data that later steps depend on.

---

## 1. Business Info (`src/config/business.ts`)

This is the single source of truth. Every page, schema, and meta tag derives from it.

### Required fields

- [ ] `name` — Business name (nav, page titles, all schema, OG tags, footer)
- [ ] `tagline` — One-line description (hero subheadline, schema `description`)
- [ ] `niche` — Service category, e.g. `"Tree Service"` or `"HVAC"` (page `<title>` tags, meta descriptions)
- [ ] `yearFounded` — Founding year as a number (About page, schema `foundingDate`)
- [ ] `phone` — Formatted: `"(419) 555-1234"` (CTAs, footer, schema `telephone`)
- [ ] `phoneRaw` — Digits only: `"4195551234"` (all `tel:` and `sms:` links)
- [ ] `email` — Contact email (footer, schema `email`, Terms of Service)
- [ ] `city` — Primary city (page titles, descriptions, schema `addressLocality`)
- [ ] `state` — Two-letter state code, e.g. `"OH"` (page titles, descriptions, schema `addressRegion`)
- [ ] `zip` — ZIP code (schema `postalCode`)
- [ ] `serviceRadius` — Coverage description, e.g. `"25-30 mile radius"` (service area pages, FAQs)
- [ ] `lat` / `lng` — City-center coordinates (Google Maps embed on service pages)
- [ ] `reviewCount` — Customer review count shown in hero trust bar
- [ ] `rating` — Star rating string, e.g. `"4.9"` (hero, schema `aggregateRating`)
- [ ] `guaranteeText` — Short guarantee text, e.g. `"100% Satisfaction Guaranteed"` (sidebar cards, service pages)
- [ ] `stats.jobsCompleted` — Jobs counter in homepage stat band
- [ ] `stats.yearsInBusiness` — Years-in-business counter
- [ ] `stats.satisfactionRate` — Satisfaction percentage
- [ ] `stats.citiesServed` — Cities-served counter
- [ ] `primaryServices` — Array of 6 short service names for footer quick-links (should match your real service slugs after step 4)

### Optional fields

- [ ] `licenseNumber` — Contractor license or cert number; set to `""` to hide it everywhere (About page, service-area sidebar, Terms of Service)
- [ ] `placeId` — Google Maps Place ID; enables live Google Reviews and precise map pin; requires Places API (New) in Google Cloud Console
- [ ] `socials.facebook` / `instagram` / `google` / `nextdoor` — Full profile URLs; the schema `sameAs` array is auto-populated from non-empty values only; safe to leave any blank

---

## 2. Site Configuration (`astro.config.mjs`)

- [ ] Set `site:` to the real production domain, e.g. `site: "https://mysite.com"`. This single value drives **every** canonical URL, OG URL, sitemap entry, and the robots.txt sitemap link. A wrong domain here breaks SEO sitewide.

---

## 3. Environment Variables

Set in Cloudflare Pages → Settings → Environment Variables (or in a local `.env` file for development).

- [ ] `CF_ANALYTICS_TOKEN` — Cloudflare Web Analytics beacon token. The script is omitted entirely when this isn't set — no placeholder script ever loads.
- [ ] `PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4 Measurement ID (e.g. `G-XXXXXXX`) from GA4 → Admin → Data Streams. The gtag script is omitted entirely when this isn't set. Also add the same property to Google Search Console (via the GA4 integration or a separate DNS/HTML verification) so you can submit the sitemap and see search query data.
- [ ] `PUBLIC_GOOGLE_MAPS_KEY` — Maps Embed API key. Required for the service area and service page map embeds. **Must** have domain restrictions configured in Google Cloud Console before going live.
- [ ] `GOOGLE_PLACES_API_KEY` — Server-side only (no `PUBLIC_` prefix, never exposed to the browser). Required for live Google Reviews via the Places API. Only needed if `business.placeId` is set.

---

## 4. Content Collections

### Services (`src/content/services/`)

- [ ] Replace all four placeholder files (`service-one.md`, `service-two.md`, `service-three.md`, `emergency-service.md`) with real services
- [ ] Each file's frontmatter drives the nav, service pages, and `ServiceSchema` JSON-LD:
  - `title` — Display name, e.g. `"Tree Removal"`
  - `urlSlug` — URL path, e.g. `"tree-removal"` → `/services/tree-removal`
  - `shortDesc` — One-sentence meta description and service card subtext
  - `icon` — Lucide icon name, e.g. `"lucide:tree-pine"`
  - `order` — Integer sort order for nav and listing pages
- [ ] Rename each file to match its real slug
- [ ] Replace all `<!-- CUSTOMIZE -->` placeholder body content with real, specific copy
- [ ] Update `business.primaryServices` (step 1) to match the new service titles

### Locations (`src/content/locations/`)

- [ ] Replace `primary-city.md`, `nearby-city.md`, `third-city.md` with real service-area cities
- [ ] Each file's frontmatter drives service-area pages and schema `areaServed`:
  - `city` — City name
  - `state` — Two-letter state code
  - `urlSlug` — URL path, e.g. `"toledo-oh"` → `/service-areas/toledo-oh`
  - `order` — Integer sort order
  - `shortDesc` (optional) — City-specific meta description; falls back to a generated one
- [ ] Write unique, city-specific body content — duplicate boilerplate across location pages hurts local SEO

### Blog (`src/content/blog/`)

- [ ] Delete `kitchensink.mdx` (component demo, not for publication)
- [ ] Replace or keep the four template blog posts; all `image.src` paths must be local `/images/*.webp` files (no external URLs)

### Team (`src/content/team/`)

- [ ] Update or remove default team member files if the team section is used anywhere on the site

---

## 5. Trust & Credibility

- [ ] **Testimonials** (`src/components/testimonials.astro`) — Replace the three default entries ("Sarah M.", "David R.", "Jennifer L.") with real customer quotes. Attribute to real first names + last initial, include their city. For live Google Reviews, configure `placeId` + `GOOGLE_PLACES_API_KEY` instead.
- [ ] **About page** (`src/pages/about.astro`) — Two placeholders marked with `<!-- CUSTOMIZE -->` comments:
  1. Replace the founding story paragraph with real narrative
  2. Add a personal owner detail or remove the paragraph entirely
- [ ] **Proof page** (`src/pages/proof.astro`) — Replace default review excerpts, platform review-count links (Google, Yelp, etc.), and certification/badge list. All tagged with `// CUSTOMIZE` comments.
- [ ] **Stats accuracy** — Confirm `jobsCompleted`, `yearsInBusiness`, `satisfactionRate`, and `citiesServed` in `business.ts` reflect real numbers before launch.

---

## 6. Page-Specific Content

Each of these pages contains `// CUSTOMIZE` or `<!-- CUSTOMIZE -->` comments. Review before launch:

- [ ] **`src/pages/gallery.astro`** — Update trust badge labels, process step descriptions, FAQ questions/answers, gallery job photos, and service category filter labels (all tagged `// CUSTOMIZE`)
- [ ] **`src/pages/offers.astro`** — Edit or remove default offer cards; add real seasonal promotions or first-time discounts
- [ ] **`src/pages/financing.astro`** — Update financing options to reflect what the business actually offers; add real lender name and required disclosure language, or remove the page and its nav link entirely
- [ ] **`src/pages/privacy.astro`** — Set `effectiveDate` and `lastUpdated` to real dates
- [ ] **`src/pages/terms.astro`** — Set `effectiveDate`, `lastUpdated`, the guarantee window (`[X days]`), and the late-cancellation fee policy; all tagged `// CUSTOMIZE`
- [ ] **Tools** — Review if the interactive calculators apply to this niche; if yes, customize:
  - `src/pages/tools/cost-estimator.astro` — Update service labels, pricing tiers, and the `BASE_RATE_PER_1000` pricing formula
  - `src/pages/tools/savings-calculator.astro` — Update niche labels and price values
  - `src/pages/tools/timeline-estimator.astro` — Update service types and duration estimates
  - If not applicable, remove the tool pages and any nav links pointing to `/tools`

---

## 7. Media

- [ ] Replace `public/opengraph.jpg` with a branded 1200×630 image (site-wide social share preview — appears on every page that lacks its own OG image)
- [ ] Replace `public/favicon.svg` with the client's favicon
- [ ] Add hero image(s) and update any references in `src/components/hero.astro`
- [ ] Add real before/after project photos in `src/components/beforeafter.astro` (set `before` and `after` fields in the `projects` array to `/images/*.webp` paths; leave as `""` for the gradient placeholder)
- [ ] Add service hero images: set `image: { src: "/images/...", alt: "..." }` in service frontmatter
- [ ] Add blog hero images: 1200px-wide WebP, referenced via local `/images/*.webp` paths (not external URLs)
- [ ] **All images must be WebP** — see `CLAUDE.md` for the generation + conversion pipeline. No JPEGs or PNGs.
- [ ] Confirm all `alt` text is specific and descriptive — no generic "photo" or "image" placeholders

---

## 8. AI/Search Optimization Files

- [ ] **`public/llms.txt`** — Update all placeholder values (business name, services, service area, contact info, trust signals). Remove the `/pricing` line if the site has no pricing page (the line is marked with a `# CUSTOMIZE` comment).
- [ ] **`robots.txt`** — Generated dynamically from `site:` in `astro.config.mjs`; no separate edits needed as long as step 2 is done. Confirm the Sitemap URL is correct after build by checking `dist/robots.txt`.

---

## 9. Pre-Launch Verification

- [ ] Run `npm run build` and confirm zero errors or type-check warnings
- [ ] Run `npm run check-placeholders` against the build output and confirm zero matches
- [ ] Manually click every navbar and footer link on the built site in `dist/` to catch any broken links or missing pages
- [ ] View-source at least 3–4 pages and confirm canonical tags point to the correct production domain
- [ ] Confirm the Google Maps embeds load (requires `PUBLIC_GOOGLE_MAPS_KEY` to be set)
- [ ] Submit `https://yourdomain.com/sitemap-index.xml` to Google Search Console after DNS goes live
- [ ] Verify `PUBLIC_GOOGLE_MAPS_KEY` has domain restrictions set in Google Cloud Console before the site is public
