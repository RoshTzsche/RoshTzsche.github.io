import katex from 'katex';

// Renders $...$ (inline) and $$...$$ (display) inside a plain string to KaTeX HTML.
// Use with set:html. Strings come from this repo (ui.ts, data, front matter).
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function tex(input: string): string {
  return input
    .split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g)
    .map((part) => {
      if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4)
        return katex.renderToString(part.slice(2, -2), { displayMode: true, throwOnError: false });
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2)
        return katex.renderToString(part.slice(1, -1), { throwOnError: false });
      return esc(part);
    })
    .join('');
}
