---
title: "Being visible to search engines and AI agents"
date: 2026-11-21
shelf: science
tags: [ai, seo, crawlers, llms.txt]
summary: "What actually works so Google, ChatGPT, Claude and Perplexity find and cite a personal website — and what is pure myth. Work in progress."
translatedFrom: es
reviewed: false
---

*Living note: I keep extending it as I research.* The goal: when someone searches "Rosh Guadiana Páez" on Google, ChatGPT, Claude or Perplexity, the answer should come from here.

## 1. What matters most: the HTML must carry the content

The most important AI crawlers **do not execute JavaScript**. The Vercel/MERJ study found no JS rendering from OpenAI (OAI-SearchBot, ChatGPT-User, GPTBot), Anthropic (ClaudeBot), Meta, ByteDance or Perplexity. The exceptions are Gemini (which uses Googlebot's infrastructure) and Applebot. A Search Engine Land experiment with JS-injected links saw GPTBot, ClaudeBot, Bingbot and PerplexityBot discover **none** of those pages.

**What we did:**
- Astro generates static HTML: all the text is in the HTML, with no dependence on JS.
- The root `/` used to be a JavaScript redirect (to an AI bot, an empty page). **It now serves the full English home page as HTML**, and only Spanish-language browsers are redirected to `/es/`.
- The animations (attractor, EEG) are decoration; no important information lives only in JS.

## 2. robots.txt: let AI bots in, explicitly

There are three kinds of AI bots, and it helps to tell them apart:

| Type | Examples | Purpose |
|---|---|---|
| Search / citation | OAI-SearchBot, Claude-SearchBot, PerplexityBot | Index pages to cite them in answers |
| User request | ChatGPT-User, Claude-User, Perplexity-User | Visit a page because someone asked |
| Training | GPTBot, ClaudeBot, Google-Extended, CCBot | Data for training models |

For a personal site that wants to be known, **being the cited source in an AI answer is the new first page**. That's why all three types are allowed here (training included: so future models "know" who I am). `Google-Extended` is not a separate crawler: it only controls use for Gemini and does not affect Google ranking. `anthropic-ai` and `Claude-Web` are deprecated.

**What we did:** `/robots.txt` lists each bot with `Allow: /` and points to the sitemap and to `llms.txt`.

## 3. Structured data (schema.org)

- `ProfilePage` with `mainEntity: Person` on the home page. Google defines it for pages focused on a single person affiliated with the site, such as an "About me".
- `Person` with `name`, `alternateName` (with and without the accent, plus the username RoshTzsche), `affiliation` (UDLAP), `identifier` (ORCID) and **`sameAs`** pointing to GitHub, LinkedIn, ORCID, Lichess and Chess.com. `sameAs` is what lets search engines and models merge all my profiles into a single entity.
- `BlogPosting` on every post, with the author linked to the same `Person`.

## 4. llms.txt: cheap, but don't expect miracles

`/llms.txt` is a proposal by Jeremy Howard (September 2024): a Markdown index of "what to read first". The 2026 evidence is not encouraging:
- Ahrefs analysed 137K sites: **97% of llms.txt files received no requests at all** in May 2026. The main readers are **coding agents** (Claude Code was among the top) and training crawlers, not the search bots that produce citations.
- Google said in May 2026 that it isn't needed to appear in its AI features.
- A 10-site study (Search Engine Land): 2 saw their AI traffic grow, 8 saw no change.

**What we did (it costs almost nothing):** `/llms.txt` (index), `/llms-full.txt` (the whole profile, projects and posts in one file) and every post as plain Markdown (`/en/writing/<slug>.md`), linked with `<link rel="alternate" type="text/markdown">`.

## 5. Classic SEO still rules

- A `<title>` with my full name and context, `meta description`, `canonical`.
- `hreflang` es/en/x-default and a sitemap with per-language alternates.
- Real, specific content: projects with names, awards, dates, institutions. Models cite concrete facts.

## 6. What's left to do (what moves the needle most)

1. **Google Search Console** (search.google.com/search-console): add the property `https://roshtzsche.github.io/`, verify it with the `google-site-verification` tag and submit `sitemap.xml`. Do the same in **Bing Webmaster Tools**, because ChatGPT search uses Bing's index.
2. **Links to my site from all my profiles:** in the *Website* field on GitHub, LinkedIn, ORCID, Instagram, Lichess and Chess.com, and in my GitHub README and my CV. These are the strongest signals that this site is me.
3. **A custom domain** (`roshguadiana.dev`): it matches my name exactly.
4. **Write.** Every post with my name, in two languages, is another way in.
5. **Patience:** indexing and ranking take weeks. LinkedIn or GitHub may rank higher at first; with the cross-links, my site becomes the reference.

## Sources

- [Vercel — *The rise of the AI crawler*](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- [Search Engine Land — JavaScript links invisible to AI search](https://searchengineland.com/javascript-links-pages-invisible-ai-search-485228)
- [Ahrefs — *We analyzed 137K sites: 97% of llms.txt files never get read*](https://ahrefs.com/blog/llmstxt-study/)
- [Search Engine Journal — summary of the Ahrefs study](https://searchenginejournal.com/97-of-llms-txt-files-got-no-requests-ahrefs-data-shows/579478)
- [Flavio Copes — *robots.txt in the age of AI crawlers*](https://flaviocopes.com/robots-txt-ai-crawlers/)
- [Search Engine Journal — AI user-agent list](https://www.searchenginejournal.com/ai-crawler-user-agents-list/558130/)
- [Google — ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
