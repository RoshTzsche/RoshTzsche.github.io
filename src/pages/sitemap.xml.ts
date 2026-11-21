import type { APIRoute } from 'astro';
import { allPosts, langOf, slugOf } from '../lib/posts';

// Every page in both languages, with hreflang alternates so Google pairs them.
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const pairs: { es?: string; en?: string; lastmod?: string }[] = [
    { es: '/es/', en: '/en/' },
    { es: '/es/writing/', en: '/en/writing/' },
    { es: '/es/chess/', en: '/en/chess/' },
  ];
  const bySlug = new Map<string, { es?: string; en?: string; lastmod?: string }>();
  for (const p of await allPosts()) {
    if (p.data.draft) continue;
    const e = bySlug.get(slugOf(p)) ?? {};
    e[langOf(p)] = `/${langOf(p)}/writing/${slugOf(p)}/`;
    e.lastmod = p.data.date.toISOString().slice(0, 10);
    bySlug.set(slugOf(p), e);
  }
  pairs.push(...bySlug.values());

  const urls = pairs.flatMap((pair) =>
    (['es', 'en'] as const)
      .filter((l) => pair[l])
      .map((l) => {
        const alts = (['es', 'en'] as const)
          .filter((x) => pair[x])
          .map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${abs(pair[x]!)}"/>`)
          .join('\n');
        return `  <url>\n    <loc>${abs(pair[l]!)}</loc>\n${pair.lastmod ? `    <lastmod>${pair.lastmod}</lastmod>\n` : ''}${alts}\n  </url>`;
      })
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
