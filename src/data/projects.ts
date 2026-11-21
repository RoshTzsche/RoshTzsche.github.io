// To add a project: copy one object, change the fields. Text goes in both languages.
type L = { es: string; en: string };
export type Area = 'biomed' | 'ai' | 'hardware' | 'web';
export type Project = {
  repo: string;          // repository name on github.com/RoshTzsche
  stack: string;         // short "language · library" line
  title: L;
  body: L;
  foot?: L;              // event / context line
  award?: L;             // shown highlighted
  links?: { label: L; href: string }[];
  hook: L;               // one short line: what it is, in plain words
  areas: Area[];         // used by the filter chips
  // Image: drop a file named <repo>.webp / .jpg / .png / .gif into public/projects/
  // and it shows up automatically. Optional alt text:
  imageAlt?: L;
};

const gh = (repo: string) => `https://github.com/RoshTzsche/${repo}`;
export const repoUrl = gh;

export const featured: Project[] = [
  {
    repo: 'eeg_phase_space',
    hook: { es: 'Ver la geometría oculta de una señal cerebral', en: 'Seeing the hidden geometry of a brain signal' },
    areas: ['biomed', 'ai'],
    stack: 'Python · NumPy · SciPy · Dash',
    title: { es: 'Reconstrucción del espacio de fases en EEG', en: 'EEG Phase-Space Reconstruction' },
    body: {
      es: 'Dashboard interactivo que reconstruye espacios de estados por coordenadas de retardo a partir de EEG, con selección de τ por información mutua y dimensión por falsos vecinos cercanos.',
      en: 'Interactive dashboard that rebuilds delay-coordinate state spaces from EEG, with mutual-information delay selection and false-nearest-neighbour embedding.',
    },
    foot: { es: 'presentado en MUTVI 4', en: 'presented at MUTVI 4' },
  },
  {
    repo: 'mars_walker',
    hook: { es: 'Caminar por Marte antes de ir', en: 'Walking on Mars before going there' },
    areas: ['web'],
    stack: 'JavaScript · Three.js · Vite',
    title: { es: 'MarsWalker', en: 'MarsWalker' },
    body: {
      es: 'Simulador 3D en el navegador de misiones tripuladas en el cráter Jezero, con rutas planeadas por pendiente, oxígeno del traje y fisiología de la tripulación sobre datos HiRISE.',
      en: 'Browser 3D simulator of crewed missions in Jezero Crater, planning routes from slope, suit oxygen use and crew physiology on HiRISE elevation data.',
    },
    award: {
      es: '★ Mayor Innovación Tecnológica — NASA Space Apps Puebla 2026',
      en: '★ Greatest Technological Innovation — NASA Space Apps Puebla 2026',
    },
  },
  {
    repo: 'mova',
    hook: { es: 'Manejar una silla de ruedas con la cara', en: 'Driving a wheelchair with your face' },
    areas: ['biomed', 'ai', 'hardware'],
    stack: 'Python · MediaPipe · serial',
    title: { es: 'MOVA — silla de ruedas por gestos faciales', en: 'MOVA — facial-gesture wheelchair' },
    body: {
      es: 'Landmarks de MediaPipe y pose de la cabeza controlan una silla de ruedas por USB serial, con calibración por usuario y confirmación temporal para ignorar movimientos accidentales.',
      en: 'MediaPipe landmarks and head pose drive a wheelchair over USB serial, with per-user calibration and temporal confirmation to ignore accidental moves.',
    },
    foot: { es: 'Sillódromo 2026, INAOE', en: 'Sillódromo 2026, INAOE' },
  },
  {
    repo: 'gota_poblana',
    hook: { es: 'Agua más segura, una gota de ácido a la vez', en: 'Safer water, one drop of acid at a time' },
    areas: ['hardware'],
    stack: 'C++ · ESP32-S3 · Flutter · MQTT',
    title: { es: 'Gota Poblana', en: 'Gota Poblana' },
    body: {
      es: 'Control adaptativo de pH para cloración de agua con ESP32-S3: medición compensada en temperatura, pulsos que se ajustan a la respuesta de cada dosis y app Flutter por MQTT.',
      en: 'ESP32-S3 adaptive pH control for water chlorination: temperature-compensated sensing, pulse sizing learned from each dose, Flutter app over MQTT.',
    },
    award: { es: '★ 2.º lugar — Hackatón Puebla 2026', en: '★ 2nd place — Hackatón Puebla 2026' },
  },
  {
    repo: 'fruticebada',
    hook: { es: 'Predecir la cosecha desde el espacio', en: 'Predicting the harvest from space' },
    areas: ['ai', 'web'],
    stack: 'Python · scikit-learn · SHAP · Node',
    title: { es: 'Fruticebada', en: 'Fruticebada' },
    body: {
      es: 'Modelo de rendimiento de cebada en 197 parcelas con datos satelitales, climáticos y de terreno (MAE 0.37 t/ha), con un mapa de parcelas explicado con SHAP. Capitán del equipo.',
      en: 'Barley-yield model over 197 parcels from satellite, climate and terrain features (MAE 0.37 t/ha), with a SHAP-explained parcel map. Team captain.',
    },
    foot: { es: 'FIRA AgroCebada', en: 'FIRA AgroCebada' },
    links: [
      { label: { es: 'demo en vivo', en: 'live demo' }, href: 'https://frutiloopsfira.onrender.com' },
      { label: { es: 'video', en: 'video' }, href: 'https://youtu.be/c9INRT8lh7A' },
    ],
  },
  {
    repo: 'ojo_de_halcon',
    hook: { es: 'Táctica de fútbol en tiempo real', en: 'Football tactics in real time' },
    areas: ['ai', 'web'],
    stack: 'Swift · SwiftUI',
    title: { es: 'Ojo de Halcón', en: 'Ojo de Halcón' },
    body: {
      es: 'App en SwiftUI que analiza en tiempo real a jugadores de fútbol y convierte su movimiento en insights tácticos, con una pantalla de analista complementaria.',
      en: 'SwiftUI app that analyses football players in real time and turns their movement into tactical insights, with a companion analyst screen.',
    },
    award: {
      es: '★ 2.º lugar nacional — Swift Social Change Makers Enactus 2025',
      en: '★ 2nd place national — Swift Social Change Makers Enactus 2025',
    },
  },
];

export const lab: Project[] = [
  {
    repo: 'ppg_pulse_monitor',
    hook: { es: 'El pulso, del sensor a la pantalla', en: 'A heartbeat, from sensor to screen' },
    areas: ['biomed', 'hardware'],
    stack: 'C · PIC · analog design',
    title: { es: 'Monitor de pulso PPG', en: 'PPG pulse monitor' },
    body: {
      es: 'Front-end analógico de fotopletismografía y firmware PIC: muestreo ADC, detección de picos con histéresis y BPM en una pantalla OLED I2C.',
      en: 'Analog photoplethysmography front-end and PIC firmware: ADC sampling, hysteresis peak detection and BPM on an I2C OLED.',
    },
  },
  {
    repo: 'ct_neuro_viewer',
    hook: { es: 'Ver dentro del cráneo en unidades Hounsfield', en: 'Looking inside the skull in Hounsfield units' },
    areas: ['biomed'],
    stack: 'Python · DICOM · Tkinter',
    title: { es: 'Visor de neuroimagen CT', en: 'CT neuroimaging viewer' },
    body: {
      es: 'De series DICOM a volúmenes en unidades Hounsfield, con tres vistas ortogonales, proyecciones MIP y exportación desidentificada.',
      en: 'DICOM series to Hounsfield-unit volumes, three orthogonal views, MIP projections and de-identified export.',
    },
    foot: { es: 'UDLAP ExpoCEM', en: 'UDLAP ExpoCEM' },
  },
  {
    repo: 'metagenomics_kraken',
    hook: { es: 'Qué come un acocil, leído en su ADN', en: 'What a crayfish eats, read from DNA' },
    areas: ['biomed'],
    stack: 'Python · R · Bash',
    title: { es: 'Metagenómica de la dieta del acocil', en: 'Crayfish diet metagenomics' },
    body: {
      es: 'Bases de datos Kraken2 personalizadas, anotación funcional con eggNOG y detección de resistencias con Abricate, hasta un PCoA de Bray–Curtis.',
      en: 'Custom Kraken2 databases, functional annotation with eggNOG and AMR screening with Abricate, ending in Bray–Curtis PCoA.',
    },
    links: [
      { label: { es: 'kraken', en: 'kraken' }, href: gh('metagenomics_kraken') },
      { label: { es: 'eggnog', en: 'eggnog' }, href: gh('metagenomics_eggnog') },
      { label: { es: 'abricate', en: 'abricate' }, href: gh('metagenomics_abricate') },
    ],
  },
  {
    repo: 'biomedical_showcase',
    hook: { es: 'Algoritmos sobre datos clínicos reales', en: 'Algorithms on real clinical data' },
    areas: ['biomed', 'ai'],
    stack: 'Jupyter · NumPy · scikit-learn',
    title: { es: 'Biomedical showcase', en: 'Biomedical showcase' },
    body: {
      es: 'Notebooks que aplican procesamiento de señales, visión por computadora y aprendizaje automático a datos clínicos reales.',
      en: 'Notebooks applying signal processing, computer vision and machine learning to real clinical data.',
    },
  },
];

export const distinctions = [
  { href: '#p-mars_walker', tag: 'NASA SPACE APPS 2026', es: 'Mayor Innovación Tecnológica, Puebla', en: 'Greatest Technological Innovation, Puebla' },
  { href: '#p-gota_poblana', tag: 'HACKATÓN PUEBLA 2026', es: '2.º lugar — Gota Poblana', en: '2nd place — Gota Poblana' },
  { href: '#p-ojo_de_halcon', tag: 'ENACTUS 2025', es: '2.º lugar nacional, IA para impacto social', en: '2nd place national, AI for social impact' },
  { href: '#math', tag: 'UDLAP', es: 'Programa de Honores · Promedio 9.6 · Putnam 2026', en: 'Honors Program · GPA 9.6 · Putnam 2026' },
  { href: 'https://www.youtube.com/@stemudlap', tag: 'EQUIPO STEM UDLAP', es: 'Equipo representativo · co-host ocasional del podcast STEMpire', en: 'Representative Team · occasional co-host, STEMpire podcast' },
];

export const competitions = [
  { title: 'Putnam 2026', es: 'Representante de la UDLAP', en: 'UDLAP representative' },
  { title: 'OMUM 2026', es: 'Olimpiada Mexicana Universitaria de Matemáticas', en: 'Mexican University Math Olympiad' },
  { title: { es: 'Olimpiada de Física 2023', en: 'Physics Olympiad 2023' }, es: 'Delegación de Durango, etapa nacional', en: 'Durango state delegation, national round' },
  { title: { es: 'XXXI Olimpiada de Química', en: 'XXXI Chemistry Olympiad' }, es: 'Medalla de bronce nacional', en: 'National bronze medal' },
];
