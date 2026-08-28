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

const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    excerpt: z.string(), // one/two sentence summary for listing cards + meta description
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('The Lead Venture Team'),
    category: z.string(), // e.g. "Local SEO", "Reviews & Reputation", "Lead Generation"
    image: z.string().optional(), // hero/listing image (hotlinked)
    tags: z.array(z.string()).default([]),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'case-studies': caseStudiesCollection,
  'blog': blogCollection,
};
