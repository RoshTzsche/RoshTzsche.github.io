// The three big project showcases at the top of the projects section.
// Media lives in public/projects/showcase/<repo>-hero.(webp|mp4) and <repo>-1..3.webp.
// Every fact here comes from the project's own README.
type L = { es: string; en: string };

export type Showcase = {
  repo: string;
  href: string;          // code
  kicker: L;             // event · place
  award: L;
  title: string;
  hook: L;
  hero: { src: string; video?: string; alt: L; tall?: boolean };
  gallery: { src: string; alt: L }[];
  stats: { value: string; label: L }[];
  problem: L;
  built: L;
  result: L;
  links: { label: L; href: string }[];
  stack: string[];
};

const m = (f: string) => `/projects/showcase/${f}`;

export const showcase: Showcase[] = [
  {
    repo: 'mars_walker',
    href: 'https://github.com/RoshTzsche/mars_walker',
    kicker: { es: 'NASA Space Apps Challenge 2026 · Puebla', en: 'NASA Space Apps Challenge 2026 · Puebla' },
    award: { es: 'Mayor Innovación Tecnológica', en: 'Greatest Technological Innovation' },
    title: 'MarsWalker',
    hook: { es: 'Caminar por Marte antes de ir.', en: 'Walking on Mars before going there.' },
    hero: { src: m('mars_walker-hero.webp'), alt: { es: 'Cabina de la nave frente a Marte, pantalla de inicio de MarsWalker', en: 'Spacecraft cockpit facing Mars, MarsWalker start screen' } },
    gallery: [
      { src: m('mars_walker-1.webp'), alt: { es: 'Descenso en cápsula con paracaídas sobre el cráter Jezero', en: 'Parachute capsule descent over Jezero Crater' } },
      { src: m('mars_walker-2.webp'), alt: { es: 'Hábitat NS-02 desplegado sobre el terreno real', en: 'NS-02 habitat deployed on the real terrain' } },
      { src: m('mars_walker-3.webp'), alt: { es: 'Vista orbital de Marte', en: 'Orbital view of Mars' } },
    ],
    stats: [
      { value: '5', label: { es: 'capas de datos de NASA y USGS', en: 'NASA and USGS data layers' } },
      { value: '17', label: { es: 'modelos matemáticos', en: 'mathematical models' } },
      { value: '1 m/px', label: { es: 'terreno HiRISE de Jezero', en: 'HiRISE terrain of Jezero' } },
    ],
    problem: {
      es: 'Un mapa orbital de Marte no le dice a un astronauta a pie si la cresta de enfrente supera la pendiente segura, ni cuánto oxígeno le costará llegar. Y con hasta 22 minutos de retraso por señal, tampoco puede preguntarle a la Tierra.',
      en: "An orbital map of Mars can't tell an astronaut on foot whether the ridge ahead is too steep, or how much oxygen it will cost to get there. With up to 22 minutes of signal delay, they can't ask Earth either.",
    },
    built: {
      es: 'Un planificador de misiones y simulador de caminatas en 3D sobre el cráter Jezero. En el tablero orbital combinas elevación, pendiente, riesgo, mineralogía e inercia térmica, configuras a la tripulación y obtienes rutas que respetan los límites del traje y la fisiología. Después bajas en cápsula y recorres el terreno real en primera persona.',
      en: 'A 3D mission planner and EVA simulator for Jezero Crater. The orbital dashboard combines elevation, slope, hazard, mineralogy and thermal inertia, lets you configure the crew, and plans routes within suit and physiology limits. Then you land by capsule and walk the real terrain in first person.',
    },
    result: {
      es: 'Premio a la Mayor Innovación Tecnológica en el NASA Space Apps Challenge 2026, sede Puebla (UDLAP), con el equipo Cabezones de la NASA.',
      en: 'Greatest Technological Innovation award at NASA Space Apps Challenge 2026, Puebla (UDLAP), with team Cabezones de la NASA.',
    },
    links: [
      { label: { es: 'Probar la app', en: 'Try the app' }, href: 'https://cabezones-de-la-nasa.github.io/MarsWalker/' },
      { label: { es: 'Ver el video', en: 'Watch the video' }, href: 'https://www.youtube.com/watch?v=eoZ0J0Kj09E' },
    ],
    stack: ['JavaScript', 'Three.js', 'Vite', 'HiRISE · CTX · CRISM · THEMIS'],
  },
  {
    repo: 'gota_poblana',
    href: 'https://github.com/RoshTzsche/gota_poblana',
    kicker: { es: 'Hackatón Puebla 2026 · Reto Agua', en: 'Hackatón Puebla 2026 · Water challenge' },
    award: { es: '2.º lugar', en: '2nd place' },
    title: 'Gota Poblana',
    hook: { es: 'Hacemos que el cloro funcione.', en: 'Making chlorine actually work.' },
    hero: { src: m('gota_poblana-hero.webp'), alt: { es: 'Gota Poblana: equipo y app', en: 'Gota Poblana: device and app' } },
    gallery: [
      { src: m('gota_poblana-1.webp'), alt: { es: 'Maqueta con tanque, sonda de pH y bomba', en: 'Prototype with tank, pH probe and pump' } },
      { src: m('gota_poblana-2.webp'), alt: { es: 'Electrónica: ESP32-S3 en la plataforma XIDE', en: 'Electronics: ESP32-S3 on the XIDE platform' } },
      { src: m('gota_poblana-3.webp'), alt: { es: 'Eficacia del cloro según el pH', en: 'Chlorine effectiveness versus pH' } },
    ],
    stats: [
      { value: '92% → 3%', label: { es: 'cloro que desinfecta, de pH 6.5 a pH 9', en: 'chlorine that disinfects, pH 6.5 vs pH 9' } },
      { value: '1.5 s', label: { es: 'pulso máximo de ácido, con corte independiente', en: 'max acid pulse, with an independent cut-off' } },
      { value: '0', label: { es: 'internet necesario', en: 'internet needed' } },
    ],
    problem: {
      es: 'El mismo cloro desinfecta muy distinto según el pH: a 6.5 el 92 % está en su forma activa; a 9, solo el 3 %. Bajar el pH ayuda, pero solo se puede añadir ácido: pasarse no tiene vuelta atrás y cada agua responde distinto.',
      en: 'The same chlorine disinfects very differently depending on pH: at 6.5, 92% is in its active form; at 9, only 3%. Lowering pH helps, but you can only add acid: overshooting is irreversible, and every water responds differently.',
    },
    built: {
      es: 'Un equipo con ESP32-S3 que mide, decide y dosifica sin internet: da pulsos pequeños de ácido, espera a que mezcle, vuelve a medir y aprende cuánto mueve cada mililitro. La app Flutter lo supervisa por MQTT, pero los límites de seguridad viven en el equipo y la app no puede saltárselos.',
      en: "An ESP32-S3 device that measures, decides and doses with no internet: small acid pulses, wait for mixing, measure again, and learn how much each millilitre moves the pH. The Flutter app supervises over MQTT, but the safety limits live on the device and the app can't bypass them.",
    },
    result: {
      es: '2.º lugar en el Hackatón Puebla 2026, reto Agua, con el equipo Pulse.',
      en: '2nd place at Hackatón Puebla 2026, water challenge, with team Pulse.',
    },
    links: [],
    stack: ['C++', 'ESP32-S3', 'Flutter', 'MQTT'],
  },
  {
    repo: 'mova',
    href: 'https://github.com/RoshTzsche/mova',
    kicker: { es: 'Sillódromo 2026 · INAOE', en: 'Sillódromo 2026 · INAOE' },
    award: { es: 'Probada en pista', en: 'Tested on the course' },
    title: 'MOVA',
    hook: { es: 'Manejar una silla de ruedas con la cara.', en: 'Driving a wheelchair with your face.' },
    hero: {
      src: m('mova-hero.webp'),
      video: m('mova-hero.mp4'),
      tall: true,
      alt: { es: 'MOVA en el recorrido del Sillódromo 2026', en: 'MOVA on the Sillódromo 2026 course' },
    },
    gallery: [
      { src: m('mova-1.webp'), alt: { es: 'Menú principal: mover la cabeza y sostener', en: 'Main menu: move your head and hold' } },
      { src: m('mova-2.webp'), alt: { es: 'Conducción con la cámara frontal', en: 'Driving with the front camera' } },
      { src: m('mova-3.webp'), alt: { es: 'Interacciones: órdenes para Alexa', en: 'Interactions: commands for Alexa' } },
    ],
    stats: [
      { value: '4', label: { es: 'señales del rostro: cabeza, cejas, ojos y boca', en: 'face signals: head, brows, eyes and mouth' } },
      { value: '2', label: { es: 'cámaras: gestos al frente, vista al retroceder', en: 'cameras: gestures in front, view when reversing' } },
      { value: '6', label: { es: 'puntos para estimar la pose de la cabeza', en: 'points to estimate head pose' } },
    ],
    problem: {
      es: 'Para quien no puede usar las manos, un joystick no sirve. La silla tiene que entender intenciones con lo que sí se puede mover, sin confundir un gesto casual con una orden.',
      en: "For someone who can't use their hands, a joystick is useless. The chair has to read intent from what they can move, without mistaking a casual gesture for a command.",
    },
    built: {
      es: 'Una cámara y MediaPipe siguen el rostro: el giro de la cabeza elige la dirección, levantar las cejas cambia de página y abrir la boca detiene la silla. Cada usuario calibra su postura de reposo y los gestos deben sostenerse un momento antes de contar. También da voz: reproduce órdenes para Alexa y frases de comunicación.',
      en: 'A camera and MediaPipe track the face: turning the head picks a direction, raising the brows changes page, and opening the mouth stops the chair. Each user calibrates their resting pose, and gestures must be held briefly before they count. It also gives a voice: it plays commands for Alexa and communication phrases.',
    },
    result: {
      es: 'Recorrió la pista del Sillódromo 2026 en el INAOE, controlada solo con gestos.',
      en: 'Drove the Sillódromo 2026 course at INAOE, controlled by gestures alone.',
    },
    links: [],
    stack: ['Python', 'MediaPipe', 'OpenCV', 'Arduino'],
  },
];
