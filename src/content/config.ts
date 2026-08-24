// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string().default('The Lead Venture'),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const teamCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

const servicesCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(), // e.g. "Lawn Mowing"
    urlSlug: z.string(), // e.g. "lawn-mowing" — used in the URL
    shortDesc: z.string(), // used on the services listing/cards + meta description
    icon: z.string().optional(), // icon name from astro-icon (bx/uil sets)
    order: z.number().default(0), // controls listing order
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
  }),
});

const locationsCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().default(false),
    city: z.string(), // e.g. "Toledo"
    state: z.string(), // e.g. "OH"
    urlSlug: z.string(), // e.g. "toledo-oh" — used in the URL
    shortDesc: z.string().optional(), // optional local blurb, meta description fallback
    order: z.number().default(0),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
  'team': teamCollection,
  'services': servicesCollection,
  'locations': locationsCollection,
};