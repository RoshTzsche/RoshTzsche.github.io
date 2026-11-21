#!/usr/bin/env node
// Translates posts that exist in only one language (es <-> en) with Groq or Gemini.
//
//   npm run translate                       -> every post missing its twin (drafts skipped)
//   npm run translate -- path/to/post.md    -> (re)translate that file only
//
// Env: GROQ_API_KEY or GEMINI_API_KEY (provider picked automatically, or force with
// TRANSLATE_PROVIDER=groq|gemini). Optional GROQ_MODEL / GEMINI_MODEL.
import { readdir, readFile, writeFile, mkdir, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = 'src/content/writing';
const LANGS = ['es', 'en'];
const NAMES = { es: 'Spanish (Mexico)', en: 'English' };

const provider =
  process.env.TRANSLATE_PROVIDER ||
  (process.env.GROQ_API_KEY ? 'groq' : process.env.GEMINI_API_KEY ? 'gemini' : null);
if (!provider) {
  console.error('Set GROQ_API_KEY or GEMINI_API_KEY.');
  process.exit(1);
}
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const systemPrompt = (from, to) => `You translate posts for a personal blog about biomedical engineering, mathematics, AI and chess, written by a Mexican student.
Translate the Markdown file from ${NAMES[from]} to ${NAMES[to]}.
Rules:
- Return ONLY the complete translated file. No commentary, no code fences around it.
- Keep the YAML front matter between the --- lines. Translate only the values of title, summary and tags. Copy every other key and value exactly (date, shelf, draft, pgn, etc.).
- Never change LaTeX math ($...$ and $$...$$), code blocks, inline code, URLs, footnote labels like [^name], HTML tags or PGN chess notation.
- Keep the Markdown structure identical: same headings, lists, links, emphasis and paragraph breaks.
- Use precise technical vocabulary. Keep the author's voice: clear, curious, first person.`;

async function callGroq(system, text) {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.2,
      messages: [{ role: 'system', content: system }, { role: 'user', content: text }],
    }),
  });
  if (!r.ok) throw new Error(`Groq ${r.status}: ${await r.text()}`);
  return (await r.json()).choices[0].message.content;
}

async function callGemini(system, text) {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text }] }],
        generationConfig: { temperature: 0.2 },
      }),
    }
  );
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${await r.text()}`);
  const j = await r.json();
  return (j.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? '').join('');
}

const isDraft = (src) => /^draft:\s*true\s*$/m.test(src.split(/^---\s*$/m)[1] ?? '');
const count = (s, re) => (s.match(re) || []).length;

function finish(out, from) {
  const s = out.trim().replace(/^```(?:markdown|md)?\s*\n/, '').replace(/\n```\s*$/, '');
  const m = s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('Model output does not start with front matter');
  const fm = m[1]
    .split('\n')
    .filter((l) => !/^(translatedFrom|reviewed):/.test(l))
    .concat([`translatedFrom: ${from}`, 'reviewed: false'])
    .join('\n');
  return `---\n${fm}\n---\n${m[2].replace(/^\n?/, '\n')}`;
}

async function translateFile(file) {
  const from = path.basename(path.dirname(file));
  const to = from === 'es' ? 'en' : 'es';
  const src = await readFile(file, 'utf8');
  const system = systemPrompt(from, to);
  const raw = provider === 'groq' ? await callGroq(system, src) : await callGemini(system, src);
  const out = finish(raw, from);

  // sanity checks: math and links should survive untouched
  for (const [name, re] of [['$$ blocks', /\$\$/g], ['links', /\]\(/g], ['footnotes', /\[\^/g]]) {
    if (count(src, re) !== count(out, re)) console.warn(`⚠ ${file}: number of ${name} changed — review carefully.`);
  }
  const dest = path.join(ROOT, to, path.basename(file));
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, out.endsWith('\n') ? out : out + '\n');
  console.log(`✓ ${file} → ${dest} (${provider})`);
  return dest;
}

async function main() {
  const explicit = process.argv.slice(2);
  let todo = explicit;
  if (!explicit.length) {
    todo = [];
    for (const lang of LANGS) {
      const dir = path.join(ROOT, lang);
      if (!existsSync(dir)) continue;
      for (const f of await readdir(dir)) {
        if (!f.endsWith('.md')) continue;
        const other = path.join(ROOT, lang === 'es' ? 'en' : 'es', f);
        const file = path.join(dir, f);
        if (existsSync(other)) continue;
        if (isDraft(await readFile(file, 'utf8'))) continue;
        todo.push(file);
      }
    }
  }
  if (!todo.length) { console.log('Nothing to translate.'); return; }
  const created = [];
  for (const f of todo) created.push(await translateFile(f));
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `created=${created.join(' ')}\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
