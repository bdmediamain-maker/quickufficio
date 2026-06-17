import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * Content Collections — Astro 6 Content Layer API.
 * Schema Zod-validated, riferimento brief §3 e §5.8.
 *
 * NB: In Fase 1 le collection sono vuote — i file MDX/JSON arrivano in Fase 2.
 * I loader puntano a `src/content/{collection}/` ma tollerano dir vuote.
 */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    author: z.string().default('Sergio'),
    category: z.enum(['Hotel', 'Ristoranti', 'Hardware', 'Marketing Ho.Re.Ca', 'Normative']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    category: z.enum([
      'POS Desktop',
      'Palmari',
      'Stampanti',
      'Kitchen monitor',
      'Pager',
      'Kiosk',
      'Serrature',
      'Lettori presenze',
      'Tablet',
    ]),
    brand: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    shortDescription: z.string(),
    specs: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    featured: z.boolean().default(false),
    available: z.boolean().default(true),
  }),
});

const modules = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/modules' }),
  schema: z.object({
    title: z.string(),
    sector: z.enum(['Hotel', 'Ristoranti', 'Bar', 'Pizzerie']),
    group: z.string(),
    icon: z.string(),
    shortDescription: z.string(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  loader: file('./src/content/testimonials/index.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    business: z.string(),
    location: z.string(),
    quote: z.string(),
    extendedQuote: z.string().optional(),
    avatar: z.string().optional(),
    photo: z.string().optional(),
    verified: z.boolean().default(false),
    featured: z.boolean().default(false),
    sectors: z
      .array(z.enum(['Hotel', 'Ristoranti', 'Bar', 'Pizzerie', 'B&B', 'Villaggi']))
      .default([]),
  }),
});

export const collections = {
  blog,
  products,
  modules,
  testimonials,
};
