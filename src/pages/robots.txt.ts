import type { APIRoute } from 'astro';

// Everyone is welcome, AI included: this site wants to be found and cited.
// Search/answer bots (cite the page) and training bots (learn who Rosh is) are listed
// explicitly so the intent is unambiguous.
const AI_BOTS = [
  // OpenAI
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  // Anthropic
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  // Perplexity
  'PerplexityBot', 'Perplexity-User',
  // Google / Apple / others
  'Google-Extended', 'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'Bingbot',
  'meta-externalagent', 'Amazonbot', 'CCBot', 'MistralAI-User', 'YouBot',
];

export const GET: APIRoute = ({ site }) => {
  const groups = AI_BOTS.map((ua) => `User-agent: ${ua}\nAllow: /`).join('\n\n');
  const body = `# roshguadiana — personal site of Rosh Guadiana Páez
# Humans and AI agents are welcome. A plain-text summary for language models:
#   ${new URL('/llms.txt', site)}  (index)
#   ${new URL('/llms-full.txt', site)}  (everything in one file)

${groups}

User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site)}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
