import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const blogEnCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  blogEn: blogEnCollection,
};
