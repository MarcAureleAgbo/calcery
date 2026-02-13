import { defineCollection, z } from 'astro:content';

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
    slug: z.string().optional(),
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
        code: z.ZodIssueCode.custom,
        message: 'Either "pubDate" or "date" must be provided.',
      });
    }
  });

const blogCollection = defineCollection({
  type: 'content',
  schema: sharedBlogSchema,
});

const blogEnCollection = defineCollection({
  type: 'content',
  schema: sharedBlogSchema,
});

export const collections = {
  blog: blogCollection,
  blogEn: blogEnCollection,
};
