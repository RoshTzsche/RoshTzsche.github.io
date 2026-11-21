import type { APIRoute } from 'astro';
import { allPosts, langOf, slugOf, type Post } from '../../../lib/posts';

// Raw Markdown of every post (e.g. /en/writing/my-post.md) for agents and scrapers.
export async function getStaticPaths() {
  return (await allPosts())
    .filter((p) => !p.data.draft)
    .map((post) => ({ params: { lang: langOf(post), slug: slugOf(post) }, props: { post } }));
}

export const GET: APIRoute = ({ props, site }) => {
  const { post } = props as { post: Post };
  const d = post.data;
  const url = new URL(`/${langOf(post)}/writing/${slugOf(post)}/`, site).href;
  const md = `# ${d.title}\n\n> ${d.summary}\n\nAuthor: Rosh Guadiana Páez · ${d.date.toISOString().slice(0, 10)} · ${url}\n\n${post.body ?? ''}\n`;
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
