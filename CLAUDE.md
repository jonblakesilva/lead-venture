## Images

All images must be WebP. No JPEGs or PNGs committed to the repo.

**Standard pipeline:**
1. Generate with Gemini API (model: `gemini-3-pro-image` via `generateContent`)
2. Convert to WebP with Pillow: max 1200px wide, quality 82, `method=6`
3. Save to `public/images/` with descriptive SEO filenames: `{business}-{subject}-{context}.webp`
4. Always set meaningful `alt` text describing subject, service, and city

**Before/after section** (`src/components/beforeafter.astro`):
- Set `before`/`after` fields in the `projects` array to `/images/*.webp` paths
- Leave as empty string `""` to show the gradient placeholder

**Service pages** (`src/content/services/*.md`):
- Add optional `image: { src: "/images/*.webp", alt: "..." }` to frontmatter
- The `[slug].astro` page renders it as a full-width hero below the dark header

**Blog posts** (`src/content/blog/*.md`):
- `image.src` must be a local `/images/*.webp` path, not an external URL
- Blog hero images: 1200px wide is ideal (displayed at full viewport width at `h-64 md:h-80 lg:h-96`)

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
