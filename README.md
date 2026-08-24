# Local Service & Contractor Website Template

A modern, production-ready Astro website template built for local service businesses — contractors, HVAC, lawn care, roofing, plumbing, electricians, and any other trade or home service company.

**Built by [The Lead Venture](https://theleadventure.com)**

---

## What's Included

- **Complete page set** — Home, About, Services, Service Areas, Pricing, Contact, Blog, Privacy Policy, Terms of Service, Thank You, 404
- **CRO-optimized homepage** — Hero with inline quote form, trust bar, services grid, how it works, stats counter, testimonials, before/after gallery, FAQ, and CTA
- **SEO-ready** — Schema.org LocalBusiness, AggregateRating, Service, and FAQPage structured data
- **Scroll animations** — AOS (Animate On Scroll) with Astro View Transitions
- **Sticky mobile call bar** — Fixed bottom bar with Call Now + Free Quote buttons (mobile only)
- **Before/after gallery** — Swap in real project photos with one line of code
- **Content Collections** — Add services and service areas as Markdown files
- **Single config file** — All business info (name, phone, address, reviews, etc.) in `src/config/business.ts`
- **Cloudflare Web Analytics** — Set `CF_ANALYTICS_TOKEN` env var and done
- **llms.txt** — AI crawler-friendly site description
- **Tailwind CSS v4** — Custom navy + orange design system, easy to retheme

---

## Quick Start

```bash
npm install
npm run dev
```

---

## Customization

### 1. Fill in your business info

Edit `src/config/business.ts` — this is the single source of truth for every page:

```ts
export const business = {
  name: "Your Business Name",
  tagline: "...",
  phone: "(555) 555-5555",
  city: "Your City",
  state: "ST",
  // ...
};
```

### 2. Add your services

Create a Markdown file in `src/content/services/`:

```md
---
title: "Roof Replacement"
urlSlug: "roof-replacement"
shortDesc: "Full residential roof replacement with lifetime warranty."
icon: "lucide:home"
order: 1
---

## What's Included
...
```

### 3. Add service areas

Create a Markdown file in `src/content/locations/`:

```md
---
city: "Columbus"
state: "OH"
urlSlug: "columbus-oh"
order: 1
---
```

### 4. Add real before/after photos

In `src/components/beforeafter.astro`, replace the placeholder divs with:

```html
<img src="/images/before-project-1.jpg" alt="Before" class="w-full h-full object-cover" />
```

Place photos in `public/images/`.

### 5. Wire up Cloudflare Analytics

Set `CF_ANALYTICS_TOKEN` in your Cloudflare Pages environment variables (Settings → Environment Variables). Get your token from [dash.cloudflare.com](https://dash.cloudflare.com) → Web Analytics. No code changes needed — the analytics script loads automatically when the variable is set, and is omitted entirely when it isn't.

### 6. Update the site URL

In `astro.config.mjs`, set `site` to your domain.

---

## Tech Stack

- [Astro 5](https://astro.build) — Static site generator
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first CSS
- [AOS](https://michalsnik.github.io/aos/) — Scroll animations
- [Lucide Icons](https://lucide.dev) — via astro-icon + @iconify-json/lucide
- [web3forms](https://web3forms.com) — Contact form (free tier, no backend needed)
- [Cloudflare Pages](https://pages.cloudflare.com) — Recommended hosting

---

## Deploy

```bash
npm run build
```

Output goes to `dist/`. Deploy to Cloudflare Pages, Netlify, or Vercel.

---

## Built by The Lead Venture

[theleadventure.com](https://theleadventure.com) — We build lead generation websites for local service businesses.
