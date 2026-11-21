// Timeline ("trayectoria"), oldest first.
// date: 'YYYY-MM-DD', 'YYYY-MM' or 'YYYY' (only what is known). `when` overrides the label
// (e.g. "verano"). Items with year null go to "More" at the end.
type L = { es: string; en: string };
export type Kind = 'milestone' | 'award' | 'hackathon' | 'competition' | 'class' | 'talk' | 'workshop' | 'podcast' | 'host' | 'staff';
export type Item = { date: string | null; when?: L; kind: Kind; title: L; where: L; href?: string; hrefLabel?: L };

export const kinds: Record<Kind, L> = {
  milestone: { es: 'inicio', en: 'start' },
  award: { es: 'premio', en: 'award' },
  hackathon: { es: 'hackatón', en: 'hackathon' },
  competition: { es: 'competencia', en: 'competition' },
  class: { es: 'clase', en: 'class' },
  talk: { es: 'ponencia', en: 'talk' },
  workshop: { es: 'taller', en: 'workshop' },
  podcast: { es: 'podcast', en: 'podcast' },
  host: { es: 'conducción', en: 'host' },
  staff: { es: 'staff', en: 'staff' },
};

const summer = { es: 'verano', en: 'summer' };

export const items: Item[] = [
  // ---- 2024 ----
  { date: '2025-07', when: summer, kind: 'workshop', title: { es: 'Taller de ADN y biología estructural', en: 'DNA and structural biology workshop' }, where: { es: 'Verano STEM UDLAP', en: 'Verano STEM UDLAP' } },
  { date: '2024-08', kind: 'milestone', title: { es: 'Empiezo Ingeniería Biomédica en la UDLAP', en: 'I start Biomedical Engineering at UDLAP' }, where: { es: 'Equipo Representativo STEM', en: 'STEM Representative Team' } },
  { date: '2024-10', kind: 'hackathon', title: { es: 'Mi primer NASA Space Apps Challenge — ExoSky', en: 'My first NASA Space Apps Challenge — ExoSky' }, where: { es: 'Exoplanetas y mecánica celeste', en: 'Exoplanets and celestial mechanics' } },
  { date: '2024-11-09', kind: 'workshop', title: { es: 'Taller de divulgación', en: 'Outreach workshop' }, where: { es: 'Noche de las Estrellas', en: 'Noche de las Estrellas' } },
  { date: '2024-11', when: { es: 'nov–dic', en: 'nov–dec' }, kind: 'hackathon', title: { es: 'Swift Student Challenge', en: 'Swift Student Challenge' }, where: { es: 'Apps en Swift', en: 'Swift apps' } },
  // ---- 2025 ----
  { date: '2025-05', kind: 'talk', title: { es: 'Visor DICOM con mapeo en unidades Hounsfield', en: 'DICOM viewer with Hounsfield-unit mapping' }, where: { es: 'UDLAP ExpoCEM', en: 'UDLAP ExpoCEM' }, href: 'https://github.com/RoshTzsche/ct_neuro_viewer' },
  { date: '2025-06-25', when: { es: '25–27 jun', en: 'jun 25–27' }, kind: 'staff', title: { es: 'Staff — 1.ª Conferencia Mexicana de Robots Inteligentes', en: 'Staff — 1st Mexican Conference on Intelligent Robots' }, where: { es: 'MEXCIR, Ciudad de México', en: 'MEXCIR, Mexico City' } },
  { date: '2026-07', when: summer, kind: 'workshop', title: { es: 'Taller de computación cuántica', en: 'Quantum computing workshop' }, where: { es: 'Verano STEM UDLAP', en: 'Verano STEM UDLAP' } },
  { date: '2025-09', when: { es: '2025', en: '2025' }, kind: 'award', title: { es: '2.º lugar nacional — Ojo de Halcón', en: '2nd place national — Ojo de Halcón' }, where: { es: 'Swift Changemakers Hackathon (Enactus)', en: 'Swift Changemakers Hackathon (Enactus)' }, href: 'https://github.com/RoshTzsche/ojo_de_halcon' },
  { date: '2025-10', kind: 'hackathon', title: { es: 'NASA Space Apps — Asteroid-DB', en: 'NASA Space Apps — Asteroid-DB' }, where: { es: 'Reto Meteor Madness', en: 'Meteor Madness challenge' }, href: 'https://github.com/RoshTzsche/asteroid_db' },
  { date: '2025-11-03', when: { es: '3–7 nov', en: 'nov 3–7' }, kind: 'staff', title: { es: 'Staff — 16.ª Conferencia Internacional de Micro Vehículos Aéreos', en: 'Staff — 16th International Micro Air Vehicle Conference' }, where: { es: 'IMAV, San Andrés Cholula', en: 'IMAV, San Andrés Cholula' } },
  { date: '2025-11-29', kind: 'workshop', title: { es: 'Taller de divulgación', en: 'Outreach workshop' }, where: { es: 'Noche de las Estrellas', en: 'Noche de las Estrellas' } },
  // ---- 2026 ----
  { date: '2026-05-12', kind: 'talk', title: { es: 'La forma de la consciencia: reconstrucción topológica de dinámica neural con el teorema de Takens', en: 'The shape of consciousness: topological reconstruction of neural dynamics with Takens’ theorem' }, where: { es: 'MUTVI 4', en: 'MUTVI 4' }, href: 'https://www.youtube.com/watch?v=H2ynSl1nyjo', hrefLabel: { es: 'ver video', en: 'watch video' } },
  { date: '2026-06', kind: 'class', title: { es: 'Lógica, conjuntos y Gödel — ciclo de 7 clases', en: 'Logic, sets and Gödel — 7-lecture series' }, where: { es: 'Para compañeros de la UDLAP', en: 'For fellow UDLAP students' }, href: 'https://github.com/RoshTzsche/logic_lectures', hrefLabel: { es: 'notas', en: 'notes' } },
  { date: '2026-09', kind: 'competition', title: { es: 'MOVA — silla de ruedas por gestos faciales', en: 'MOVA — facial-gesture wheelchair' }, where: { es: 'Sillódromo 2026, INAOE', en: 'Sillódromo 2026, INAOE' }, href: 'https://github.com/RoshTzsche/mova' },
  { date: '2026-11', kind: 'award', title: { es: 'Mayor Innovación Tecnológica — MarsWalker', en: 'Greatest Technological Innovation — MarsWalker' }, where: { es: 'NASA Space Apps Challenge, Puebla', en: 'NASA Space Apps Challenge, Puebla' }, href: 'https://github.com/RoshTzsche/mars_walker' },
  { date: '2026-11', kind: 'award', title: { es: '2.º lugar — Gota Poblana', en: '2nd place — Gota Poblana' }, where: { es: 'Hackatón Puebla, Instituto Tecnológico de Puebla', en: 'Hackatón Puebla, Instituto Tecnológico de Puebla' }, href: 'https://github.com/RoshTzsche/gota_poblana' },
  // ---- dates to confirm ----
  { date: null, kind: 'host', title: { es: 'Maestro de ceremonias de 4 seminarios', en: 'Master of ceremonies, 4 seminars' }, where: { es: 'STEMLink Seminars 2026, UDLAP', en: 'STEMLink Seminars 2026, UDLAP' } },
  { date: null, kind: 'competition', title: { es: 'Fruticebada — capitán del equipo', en: 'Fruticebada — team captain' }, where: { es: 'FIRA AgroCebada 2026', en: 'FIRA AgroCebada 2026' }, href: 'https://frutiloopsfira.onrender.com' },
  { date: null, kind: 'workshop', title: { es: 'Talleres de computación cuántica', en: 'Quantum computing workshops' }, where: { es: 'Digital Makerspace y FESTEM', en: 'Digital Makerspace and FESTEM' } },
  { date: null, kind: 'talk', title: { es: 'Charlas de Core ML y SwiftUI', en: 'Core ML and SwiftUI talks' }, where: { es: 'UDLAP', en: 'UDLAP' } },
  { date: null, kind: 'podcast', title: { es: 'Co-host ocasional', en: 'Occasional co-host' }, where: { es: 'STEMpire, Equipo Representativo STEM UDLAP', en: 'STEMpire, UDLAP STEM Representative Team' }, href: 'https://www.youtube.com/@stemudlap' },
];

const MONTHS = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
};
export function whenLabel(it: Item, lang: 'es' | 'en') {
  if (it.when) return it.when[lang];
  if (!it.date) return '';
  const [, m, d] = it.date.split('-');
  if (!m) return '';
  const mon = MONTHS[lang][Number(m) - 1];
  return d ? (lang === 'es' ? `${Number(d)} ${mon}` : `${mon} ${Number(d)}`) : mon;
}
