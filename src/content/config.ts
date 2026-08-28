// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const caseStudiesCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(), // full case study headline
    urlSlug: z.string(), // e.g. "seo-case-study" — used in /proof/[urlSlug]
    badge: z.string(), // category label, e.g. "SEO & Growth Case Study"
    excerpt: z.string(), // one/two sentence summary for listing cards + meta description
    image: z.string().optional(), // listing/hero image (hotlinked)
    order: z.number().default(0), // controls listing order
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'case-studies': caseStudiesCollection,
};
