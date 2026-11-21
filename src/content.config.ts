import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every post lives in src/content/writing/<lang>/<slug>.md
// The same <slug> in es/ and en/ is the same post in two languages.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    shelf: z.enum(['science', 'chess', 'personal']),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    pgn: z.string().optional(),           // chess posts: the game in PGN
    translatedFrom: z.enum(['es', 'en']).optional(),
    reviewed: z.boolean().default(true),  // false = AI translation not yet reviewed
    draft: z.boolean().default(false),    // drafts only show with `npm run dev`
  }),
});

export const collections = { writing };
