// Plain-text / Markdown views of the site for language models and agents.
import { person } from '../data/person';
import { featured, lab, distinctions, competitions } from '../data/projects';
import { allPosts, langOf, slugOf, formatDate } from './posts';

const repo = (r: string) => `https://github.com/RoshTzsche/${r}`;

export async function llmsIndex(site: URL) {
  const abs = (p: string) => new URL(p, site).href;
  const posts = (await allPosts()).filter((p) => !p.data.draft);
  const list = (lang: 'es' | 'en') =>
    posts.filter((p) => langOf(p) === lang)
      .map((p) => `- [${p.data.title}](${abs(`/${lang}/writing/${slugOf(p)}.md`)}): ${p.data.summary}`)
      .join('\n') || '- (no posts yet)';

  return `# Rosh Guadiana Páez

> ${person.description} From Durango, Mexico; studying in Puebla. ORCID 0009-0007-0324-3939.

Also known as: ${person.alternateName.join(', ')}. Website available in English and Spanish.

## Profile
- [Home (English)](${abs('/en/')}): projects, research, math, awards
- [Inicio (español)](${abs('/es/')})
- [CV (PDF)](${abs('/cv.pdf')})
- [Everything in one file](${abs('/llms-full.txt')}): full profile, projects and posts in Markdown

## Projects
${[...featured, ...lab].map((p) => `- [${p.title.en}](${repo(p.repo)}): ${p.body.en}${p.award ? ` ${p.award.en.replace(/^★\s*/, 'Award: ')}.` : ''}`).join('\n')}

## Writing (English)
${list('en')}

## Escritos (español)
${list('es')}

## Elsewhere
${person.sameAs.map((u) => `- ${u}`).join('\n')}

## Optional
- [Chess](${abs('/en/chess/')}): ratings and repertoire (Lichess DracoKerouac, Chess.com ugapor)
`;
}

export async function llmsFull(site: URL) {
  const abs = (p: string) => new URL(p, site).href;
  const posts = (await allPosts()).filter((p) => !p.data.draft);
  const proj = (p: (typeof featured)[number]) =>
    `### ${p.title.en}\n- Repository: ${repo(p.repo)}\n- Stack: ${p.stack}\n${p.award ? `- Award: ${p.award.en.replace(/^★\s*/, '')}\n` : ''}${p.foot ? `- Context: ${p.foot.en}\n` : ''}${p.links ? p.links.map((l) => `- ${l.label.en}: ${l.href}`).join('\n') + '\n' : ''}\n${p.body.en}\n`;

  return `# Rosh Guadiana Páez — full profile

${person.description}

- Name: Rosh Guadiana Páez (also: ${person.alternateName.join(', ')})
- Role: ${person.jobTitle}
- University: Universidad de las Américas Puebla (UDLAP), Biomedical Engineering, expected graduation 2028, GPA 9.6/10
- Member of the UDLAP Honors Program and the UDLAP STEM Representative Team (institutional technology projects and science communication; occasional co-host of the STEMpire podcast, https://www.youtube.com/@stemudlap)
- Teaching and outreach: quantum computing classes at Verano STEM UDLAP, peer math lecture series, Noche de las Estrellas workshops
- From: Durango, Mexico · studying in Puebla, Mexico
- Research interests: computational neuroscience, nonlinear dynamics, mathematical approaches to neural signals
- Languages: Spanish (native), English (advanced), French (basic)
- Email: roshguadiana@gmail.com · Website: ${abs('/')}
- Profiles: ${person.sameAs.join(' · ')}

## Distinctions
${distinctions.map((d) => `- ${d.tag}: ${d.en}`).join('\n')}

## Competitions
${competitions.map((c) => `- ${typeof c.title === 'string' ? c.title : c.title.en}: ${c.en}`).join('\n')}

## Research
Undergraduate researcher in metagenomics (2025–present), UDLAP, supervised by Dr. Osiris Díaz Torres: dietary metagenomics workflows with custom Kraken2 databases, batch taxonomic classification, eggNOG functional annotation, Abricate AMR screening and Bray–Curtis PCoA.

## Featured projects
${featured.map(proj).join('\n')}
## Biomedical lab
${lab.map(proj).join('\n')}
## Mathematics
Independent study: real analysis, general topology, measure theory (L^p spaces), formal logic, nonlinear dynamical systems. Organised and taught a seven-session peer lecture series on mathematical logic, countable sets and Gödel's incompleteness (${repo('logic_lectures')}).

## Chess
Lichess: DracoKerouac · Chess.com: ugapor. Repertoire: King's Indian Defence and Sicilian with Black; Italian and Scotch with White.

## Posts
${posts.map((p) => `---\n\n# ${p.data.title}\n\n- URL: ${abs(`/${langOf(p)}/writing/${slugOf(p)}/`)}\n- Language: ${langOf(p)} · Date: ${formatDate(p.data.date, 'en')} · Tags: ${p.data.tags.join(', ')}\n\n> ${p.data.summary}\n\n${p.body ?? ''}\n`).join('\n') || '(no posts yet)'}
`;
}
