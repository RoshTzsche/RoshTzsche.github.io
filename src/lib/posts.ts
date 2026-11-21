import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Post = CollectionEntry<'writing'>;

// id looks like "es/my-post" (folder = language)
export const langOf = (p: Post) => p.id.split('/')[0] as Lang;
export const slugOf = (p: Post) => p.id.split('/').slice(1).join('/');

const visible = (p: Post) => import.meta.env.DEV || !p.data.draft;

export async function allPosts(): Promise<Post[]> {
  return (await getCollection('writing', visible)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
}

export async function postsIn(lang: Lang): Promise<Post[]> {
  return (await allPosts()).filter((p) => langOf(p) === lang);
}

export const postUrl = (p: Post) => `/${langOf(p)}/writing/${slugOf(p)}/`;

export const readingMinutes = (body = '') =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
