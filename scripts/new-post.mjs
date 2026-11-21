#!/usr/bin/env node
// Create a new post and open it in your editor.
//
//   npm run new -- "Mi título"                 -> science shelf, Spanish
//   npm run new -- "Mi partida" --shelf chess
//   npm run new -- "My title" --lang en
//
// Creates src/content/writing/<lang>/<slug>.md (as a draft) and
// public/media/<slug>/ for its images, then opens $EDITOR (nvim by default).
import { mkdir, writeFile, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args.splice(i, 2)[1] : def; };
const lang = opt('lang', 'es');
const shelf = opt('shelf', 'science');
const title = args.join(' ').trim();
if (!title) { console.error('Uso: npm run new -- "Título de la entrada" [--shelf science|chess|personal] [--lang es|en]'); process.exit(1); }

const slug = title.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const file = `src/content/writing/${lang}/${slug}.md`;
const media = `public/media/${slug}`;
const today = new Date().toISOString().slice(0, 10);

try { await access(file); console.error(`Ya existe: ${file}`); process.exit(1); } catch {}
await mkdir(`src/content/writing/${lang}`, { recursive: true });
await mkdir(media, { recursive: true });
await writeFile(file, `---
title: "${title.replace(/"/g, '\\"')}"
date: ${today}
shelf: ${shelf}
tags: []
summary: ""
draft: true
---

Escribe aquí. Matemáticas en línea: $x(t-\\tau)$. En bloque:

$$
\\Phi(t) = \\big(x(t),\\, x(t-\\tau)\\big)
$$

Imágenes: guárdalas en ${media}/ y úsalas así:

![Descripción de la imagen](/media/${slug}/figura-1.webp)
${shelf === 'chess' ? '\n<!-- Para una partida, añade en la cabecera:\npgn: |\n  1. e4 e5 2. Nf3 ...\n-->\n' : ''}`);

console.log(`✓ ${file}\n✓ ${media}/  (pon aquí las imágenes)\n  Vista previa: npm run dev  →  http://localhost:4321/${lang}/writing/${slug}/`);
const editor = process.env.EDITOR || 'nvim';
spawn(editor, [file], { stdio: 'inherit' });
