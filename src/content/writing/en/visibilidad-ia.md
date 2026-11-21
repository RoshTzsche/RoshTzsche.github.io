---
title: "AI visibility, part 1: how crawlers and agents read the web"
date: 2026-11-21
shelf: science
tags: [ai, seo, crawlers, agents, llms.txt]
summary: "Before optimising anything: how a page ends up in a ChatGPT, Claude or Perplexity answer, how autonomous browsing agents 'see' it, and how we'll measure whether changes work. Series in progress."
translatedFrom: es
reviewed: false
---

*Series in progress.* I want the answer to "who is Rosh Guadiana Páez?" — on Google or from an AI — to come from this site. Before changing anything, it's worth understanding how these systems work, and deciding **how we'll check** that a change helps, instead of trusting SEO recipes.

## 1. Three ways an AI "knows" something about a website

**a) Training memory.** The model read a copy of the web before its cutoff. Bots such as GPTBot, ClaudeBot or CCBot collect that material. What it learned this way carries no citations and may be outdated.

**b) Search at answer time (RAG).** When the question needs current facts, the model does *retrieval-augmented generation*: it rewrites the question into several searches, queries an index, picks some pages, reads them and answers citing them. The index **isn't always its own**: ChatGPT relies heavily on Bing's (a Seer Interactive analysis found 87% of its citations matched Bing's top results), Gemini uses Google's and Perplexity runs its own crawler. A RESONEO study of 1,200 ChatGPT answers found three layers: an index for discovering pages, a cache with full copies of pages already read, and a few pages opened live.

**c) On-demand visits.** If someone pastes a link or asks "check this page", a fetcher (ChatGPT-User, Claude-User, Perplexity-User) downloads it right then.

In a), b) and c), **the bot downloads the HTML and does not run JavaScript**. Vercel analysed hundreds of millions of visits and found no JS rendering from the OpenAI, Anthropic, Meta, ByteDance or Perplexity bots; Gemini (through Googlebot) and Applebot do render it. In other words: for most of them, whatever isn't in the initial HTML doesn't exist.

## 2. Agents that browse like people

Separate from crawlers are **browser agents**: systems that open a real browser, click and type on the user's behalf. These do run JavaScript, because they use a full browser. To understand the page they use three representations, increasingly combined:

- **Screenshots** read by a vision model. The most expensive and ambiguous option: a button is just a rectangle of pixels.
- The raw **HTML / DOM**.
- The **accessibility tree**: the summary the browser builds for screen readers, with each element's *role*, *name* and *state*. Tools such as Playwright MCP or browser-use rely on it as their main view because it is cheap and unambiguous.

Practical consequence: **accessibility is no longer just for people**. Real buttons (`<button>`), real links (`<a href>`), headings in order and alt text are what an agent "reads". For context: in June 2026 Cloudflare measured automated traffic overtaking human traffic on HTML pages, roughly 57% against 43%.

## 3. The full chain (and where it can break)

```
discover URL → permission (robots.txt) → download HTML → index → retrieve for a question → read → cite
```

Each arrow is a different failure point, and each is checked a different way. That's why the plan below measures **each link separately**.

## 4. How we'll check what works

| # | What we measure | How | Status |
|---|---|---|---|
| E1 | Does a bot without JavaScript see the content? | Download the page without running JS and look for name, bio, projects and awards | ✅ Done (below) |
| E2 | Is the structured data valid? | [Rich Results Test](https://search.google.com/test/rich-results) and [validator.schema.org](https://validator.schema.org) should detect `ProfilePage` and `Person` | Pending |
| E3 | Do Google and Bing index it? | Search Console (URL inspection) and Bing Webmaster Tools; search `site:roshtzsche.github.io` | Pending |
| E4 | Do AIs find and cite me? | Every two weeks, ask ChatGPT, Claude, Perplexity and Gemini the same question and record the answer and sources | Baseline pending |
| E5 | Which bots visit and what do they read (does anyone read `llms.txt`?) | Server logs. GitHub Pages doesn't provide them; with a custom domain behind Cloudflare the AI bots become visible | Needs domain |

The rule: **one change at a time, measured before and after**. With a single site there's no control group, so the honest approach is to compare against the baseline and date every observation.

### E1 — result (21 Nov 2026)

I downloaded the root the way a crawler would, without running JavaScript. The title ("Rosh Guadiana Páez — Biomedical Engineering · UDLAP"), the H1 with my name, the bio, all 10 projects, the awards and the competitions are there. **Before this change the root was a JavaScript redirect: to these bots, a nearly empty page.** The reader I used converts the page to text and drops `<script>` tags, so it can't check the JSON-LD: E2 covers that.

To repeat it from a terminal, with a bot's user agent:

```bash
curl -s -A "GPTBot" https://roshtzsche.github.io/ | grep -o "Gota Poblana" | head -1
curl -s -A "ClaudeBot" https://roshtzsche.github.io/ | grep -o '"@type":"ProfilePage"'
```

### E4 — baseline protocol

A fixed question, in a fresh session with web search on: *"Who is Rosh Guadiana Páez?"*. For each AI, record the date, whether it identifies me correctly, which sources it cites and whether this site appears. Repeat every two weeks.

## 5. What's already in place (hypotheses to verify)

What's in place is based on the above; each point will be confirmed or discarded by E1–E5:

- **Complete static HTML** (Astro), including the root. Confirmed by E1.
- **A `robots.txt` that explicitly allows** search, user and training bots: for a personal site, being the cited source is the new first page.
- **Structured data:** `ProfilePage` + `Person`, with `sameAs` pointing to GitHub, LinkedIn, ORCID, Lichess and Chess.com, so search engines merge my profiles into a single entity. Every post carries `BlogPosting`. Pending E2.
- **`llms.txt`, `llms-full.txt` and every post as Markdown.** Low expectations: Ahrefs found that 97% of `llms.txt` files received not a single request in May 2026, and that the few readers are mostly coding agents. It costs almost nothing; E5 will tell whether anyone uses it here.
- **A sitemap with `hreflang`**, and titles and descriptions with my full name.

## Coming next

- **Part 2:** results of E2 and E3 (validation and indexing).
- **Part 3:** E4 baseline (what AIs answer today).
- **Part 4:** custom domain and bot logs (E5).

## Sources

- [Vercel — *The rise of the AI crawler*](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- [Search Engine Land — JavaScript links invisible to AI search](https://searchengineland.com/javascript-links-pages-invisible-ai-search-485228)
- [Search Engine Land — inside ChatGPT's retrieval stack (RESONEO)](https://searchengineland.com/chatgpt-retrieval-stack-index-cache-pages-485036)
- [Surfer — how AI engines choose sources](https://surferseo.com/blog/how-do-ai-engines-choose-sources/)
- [Ahrefs — RAG explained](https://ahrefs.com/blog/retrieval-augmented-generation/)
- [web.dev — *Build agent-friendly websites*](https://web.dev/articles/ai-agent-site-ux)
- [Search Engine Journal — the accessibility tree is how AI agents read your site](https://www.searchenginejournal.com/the-accessibility-tree-is-how-ai-agents-read-your-site-its-breaking/578171/)
- [Ahrefs — 97% of llms.txt files never get read](https://ahrefs.com/blog/llmstxt-study/)
- [Flavio Copes — *robots.txt in the age of AI crawlers*](https://flaviocopes.com/robots-txt-ai-crawlers/)
- [Google — ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
