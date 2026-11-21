import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// When you buy the domain, change `site` to 'https://roshguadiana.dev'
// and add public/CNAME with that domain.
export default defineConfig({
  site: 'https://roshtzsche.github.io',
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
