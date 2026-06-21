import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqEntrySchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const sharedBlogSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['fr', 'en']).optional(),
    draft: z.boolean().default(false),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    faq: z.array(faqEntrySchema).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.pubDate && !value.date) {
      ctx.addIssue({
        code: 'custom',
        message: 'Either "pubDate" or "date" must be provided.',
      });
    }
  });

const blogCollection = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: sharedBlogSchema,
});

const blogEnCollection = defineCollection({
  loader: glob({ base: './src/content/blogEn', pattern: '**/*.{md,mdx}' }),
  schema: sharedBlogSchema,
});

export const collections = {
  blog: blogCollection,
  blogEn: blogEnCollection,
};
