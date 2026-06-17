import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      sku: z.string(),
      category: z.enum(['Cabling', 'Connectors', 'Fiber', 'Switching', 'Surveillance', 'Access']),
      tagline: z.string(),
      image: image().optional(),
      specs: z.array(z.object({ label: z.string(), value: z.string() })),
      standard: z.string(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      plate: z.string(),
      summary: z.string(),
      capabilities: z.array(z.string()),
      image: image().optional(),
      order: z.number().default(99),
    }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      client: z.string(),
      industry: z.string(),
      challenge: z.string(),
      outcome: z.string(),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })),
      image: image().optional(),
      order: z.number().default(99),
    }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      author: z.string(),
      excerpt: z.string(),
      cover: image().optional(),
    }),
});

export const collections = { products, solutions, caseStudies, insights };
