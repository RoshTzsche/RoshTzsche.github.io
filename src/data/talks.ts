// Talks, classes and outreach. `year: null` = date still to confirm (shown under "More").
type L = { es: string; en: string };
export type Kind = 'class' | 'talk' | 'workshop' | 'podcast' | 'host' | 'staff';
export type Talk = { year: number | null; kind: Kind; title: L; where: L; href?: string };

export const kinds: Record<Kind, L> = {
  class: { es: 'clase', en: 'class' },
  talk: { es: 'ponencia', en: 'talk' },
  workshop: { es: 'taller', en: 'workshop' },
  podcast: { es: 'podcast', en: 'podcast' },
  host: { es: 'conducción', en: 'host' },
  staff: { es: 'staff', en: 'staff' },
};

export const talks: Talk[] = [
  { year: 2026, kind: 'class', title: { es: 'Lógica, conjuntos y Gödel — ciclo de 7 clases', en: 'Logic, sets and Gödel — 7-lecture series' }, where: { es: 'Para compañeros de la UDLAP · verano', en: 'For fellow UDLAP students · summer' }, href: 'https://github.com/RoshTzsche/logic_lectures' },
  { year: 2026, kind: 'class', title: { es: 'Computación cuántica', en: 'Quantum computing' }, where: { es: 'Verano STEM UDLAP', en: 'Verano STEM UDLAP' } },
  { year: 2026, kind: 'host', title: { es: 'Maestro de ceremonias de 4 seminarios', en: 'Master of ceremonies, 4 seminars' }, where: { es: 'STEMLink Seminars, UDLAP', en: 'STEMLink Seminars, UDLAP' } },
  { year: 2025, kind: 'class', title: { es: 'Biología estructural y fundamentos del ADN', en: 'Structural biology and DNA fundamentals' }, where: { es: 'Verano STEM UDLAP', en: 'Verano STEM UDLAP' } },
  { year: 2025, kind: 'workshop', title: { es: 'Taller de divulgación científica', en: 'Science outreach workshop' }, where: { es: 'Noche de las Estrellas', en: 'Noche de las Estrellas' } },
  { year: 2025, kind: 'staff', title: { es: 'Staff — 1.ª Conferencia Mexicana de Robots Inteligentes', en: 'Staff — 1st Mexican Conference on Intelligent Robots' }, where: { es: 'MEXCIR, Puebla', en: 'MEXCIR, Puebla' } },
  { year: 2025, kind: 'staff', title: { es: 'Staff — 16.ª Conferencia Internacional de Micro Vehículos Aéreos', en: 'Staff — 16th International Micro-Air Vehicle Conference' }, where: { es: 'IMAV, Puebla', en: 'IMAV, Puebla' } },
  { year: 2024, kind: 'workshop', title: { es: 'Taller de divulgación científica', en: 'Science outreach workshop' }, where: { es: 'Noche de las Estrellas', en: 'Noche de las Estrellas' } },
  { year: null, kind: 'talk', title: { es: 'Reconstrucción del espacio de fases en señales de EEG', en: 'Phase-space reconstruction of EEG signals' }, where: { es: 'MUTVI 4', en: 'MUTVI 4' }, href: 'https://github.com/RoshTzsche/eeg_phase_space' },
  { year: null, kind: 'talk', title: { es: 'Visor DICOM con mapeo en unidades Hounsfield', en: 'DICOM viewer with Hounsfield-unit mapping' }, where: { es: 'UDLAP ExpoCEM', en: 'UDLAP ExpoCEM' }, href: 'https://github.com/RoshTzsche/ct_neuro_viewer' },
  { year: null, kind: 'workshop', title: { es: 'Talleres de computación cuántica', en: 'Quantum computing workshops' }, where: { es: 'Digital Makerspace y FESTEM', en: 'Digital Makerspace and FESTEM' } },
  { year: null, kind: 'talk', title: { es: 'Charlas de Core ML y SwiftUI', en: 'Core ML and SwiftUI talks' }, where: { es: 'UDLAP', en: 'UDLAP' } },
  { year: null, kind: 'podcast', title: { es: 'Co-host ocasional', en: 'Occasional co-host' }, where: { es: 'STEMpire, Equipo Representativo STEM UDLAP', en: 'STEMpire, UDLAP STEM Representative Team' }, href: 'https://www.youtube.com/@stemudlap' },
];
