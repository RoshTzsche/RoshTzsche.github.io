---
title: "Visibilidad para IA, parte 1: cómo leen la web los crawlers y los agentes"
date: 2026-11-21
shelf: science
tags: [ia, seo, crawlers, agentes, llms.txt]
summary: "Antes de optimizar nada: cómo llega una página a una respuesta de ChatGPT, Claude o Perplexity, cómo la 'ven' los agentes que navegan solos, y cómo vamos a medir si los cambios funcionan. Serie en progreso."
---

*Serie en progreso.* Quiero que al preguntar "¿quién es Rosh Guadiana Páez?" — en Google o a una IA — la respuesta salga de esta web. Antes de tocar nada, toca entender cómo funcionan estos sistemas, y decidir **cómo vamos a comprobar** que un cambio sirve, en vez de creer recetas de SEO.

## 1. Tres maneras en que una IA "sabe" algo de una web

**a) Memoria del entrenamiento.** El modelo leyó una copia de la web antes de su fecha de corte. Bots como GPTBot, ClaudeBot o CCBot recolectan ese material. Lo que aprendió así no cita fuentes y puede estar desactualizado.

**b) Búsqueda en el momento (RAG).** Cuando la pregunta necesita datos actuales, el modelo hace *recuperación aumentada*: reformula la pregunta en varias búsquedas, consulta un índice, elige algunas páginas, las lee y responde citándolas. El índice **no siempre es propio**: ChatGPT se apoya en buena medida en el de Bing (un análisis de Seer Interactive encontró que el 87 % de sus citas coincidían con los primeros resultados de Bing), Gemini usa el de Google y Perplexity tiene su propio crawler. Un estudio de RESONEO sobre 1,200 respuestas de ChatGPT distinguió tres capas: un índice para descubrir páginas, una caché con copias completas de las que ya leyó, y unas pocas que abre en vivo.

**c) Visita a pedido del usuario.** Si alguien pega un enlace o pide "revisa esta página", un fetcher (ChatGPT-User, Claude-User, Perplexity-User) la descarga en ese momento.

En a), b) y c), **el bot descarga el HTML y no ejecuta JavaScript**. Vercel analizó cientos de millones de visitas y no encontró renderizado de JS en los bots de OpenAI, Anthropic, Meta, ByteDance ni Perplexity; Gemini (vía Googlebot) y Applebot sí lo hacen. Es decir: para la mayoría, lo que no está en el HTML inicial no existe.

## 2. Los agentes que navegan como personas

Aparte de los crawlers están los **agentes de navegador**: sistemas que abren un navegador real, hacen clic y escriben por el usuario. Esos sí ejecutan JavaScript, porque usan un navegador completo. Para entender la página usan tres representaciones, y cada vez más las combinan:

- **Capturas de pantalla** que interpreta un modelo de visión. Es lo más caro y ambiguo: un botón es un rectángulo de píxeles.
- **El HTML / DOM** crudo.
- **El árbol de accesibilidad**: la versión resumida que el navegador construye para lectores de pantalla, con el *rol*, *nombre* y *estado* de cada elemento. Herramientas como Playwright MCP o browser-use lo usan como vista principal porque es barato y poco ambiguo.

Consecuencia práctica: **la accesibilidad ya no es solo para personas**. Botones reales (`<button>`), enlaces reales (`<a href>`), encabezados en orden y textos alternativos son lo que un agente "lee". Dato de contexto: en junio de 2026 Cloudflare midió que el tráfico automatizado ya superaba al humano en páginas HTML, alrededor de 57 % contra 43 %.

## 3. La cadena completa (y dónde se puede romper)

```
descubrir URL → permiso (robots.txt) → descargar HTML → indexar → recuperar para una pregunta → leer → citar
```

Cada flecha es un punto de falla distinto, y cada uno se comprueba de otra manera. Por eso el plan de abajo mide **cada eslabón por separado**.

## 4. Cómo vamos a comprobar qué funciona

| # | Qué medimos | Cómo | Estado |
|---|---|---|---|
| E1 | ¿Un bot sin JavaScript ve el contenido? | Descargar la página sin ejecutar JS y buscar nombre, bio, proyectos y premios | ✅ Hecho (abajo) |
| E2 | ¿Los datos estructurados son válidos? | [Rich Results Test](https://search.google.com/test/rich-results) y [validator.schema.org](https://validator.schema.org) deben detectar `ProfilePage` y `Person` | Pendiente |
| E3 | ¿Google y Bing la indexan? | Search Console (inspección de URL) y Bing Webmaster Tools; buscar `site:roshtzsche.github.io` | Pendiente |
| E4 | ¿Las IAs me encuentran y me citan? | Cada dos semanas, preguntar lo mismo a ChatGPT, Claude, Perplexity y Gemini y anotar respuesta y fuentes | Línea base pendiente |
| E5 | ¿Qué bots visitan y qué leen (¿alguien lee `llms.txt`?) | Registros del servidor. GitHub Pages no los da; con dominio propio detrás de Cloudflare se ven los bots de IA | Requiere dominio |

La regla: **un cambio a la vez, medición antes y después**. Con un solo sitio no hay grupo de control, así que lo honesto es comparar contra la línea base y anotar todo con fecha.

### E1 — resultado (21 nov 2026)

Descargué la raíz como lo haría un crawler, sin ejecutar JavaScript. Ahí están el título ("Rosh Guadiana Páez — Biomedical Engineering · UDLAP"), el H1 con mi nombre, la bio, los 10 proyectos, los premios y las competencias. **Antes de este cambio, la raíz era una redirección por JavaScript: para estos bots, una página casi vacía.** El lector que usé convierte la página a texto y descarta los `<script>`, así que no sirve para revisar el JSON-LD: eso lo cubre E2.

Para repetirlo desde una terminal, con la cabecera de un bot:

```bash
curl -s -A "GPTBot" https://roshtzsche.github.io/ | grep -o "Gota Poblana" | head -1
curl -s -A "ClaudeBot" https://roshtzsche.github.io/ | grep -o '"@type":"ProfilePage"'
```

### E4 — protocolo para la línea base

Pregunta fija, en sesión nueva y con búsqueda web activada: *"¿Quién es Rosh Guadiana Páez?"*. Por cada IA se anota la fecha, si me identifica correctamente, qué fuentes cita y si aparece esta web. Se repite cada dos semanas.

## 5. Lo que ya está aplicado (hipótesis por verificar)

Lo aplicado se basa en lo de arriba; cada punto se confirmará o descartará con E1–E5:

- **HTML estático completo** (Astro), incluida la raíz. Confirmado por E1.
- **`robots.txt` que permite explícitamente** a los bots de búsqueda, de usuario y de entrenamiento: para un sitio personal, ser la fuente citada es la nueva primera página.
- **Datos estructurados:** `ProfilePage` + `Person`, con `sameAs` hacia GitHub, LinkedIn, ORCID, Lichess y Chess.com, para que los buscadores unan mis perfiles en una sola entidad. Cada entrada lleva `BlogPosting`. Pendiente de E2.
- **`llms.txt`, `llms-full.txt` y cada entrada en Markdown.** Expectativa baja: Ahrefs vio que el 97 % de los `llms.txt` no recibió ni una petición en mayo de 2026, y que quienes sí los leen son sobre todo agentes de programación. Cuesta casi nada; E5 dirá si alguien lo usa aquí.
- **Sitemap con `hreflang`**, títulos y descripciones con mi nombre completo.

## Próximas partes

- **Parte 2:** resultados de E2 y E3 (validación e indexación).
- **Parte 3:** línea base de E4 (qué responden hoy las IAs).
- **Parte 4:** dominio propio y registros de bots (E5).

## Fuentes

- [Vercel — *The rise of the AI crawler*](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- [Search Engine Land — enlaces por JavaScript invisibles para la búsqueda con IA](https://searchengineland.com/javascript-links-pages-invisible-ai-search-485228)
- [Search Engine Land — dentro del sistema de recuperación de ChatGPT (RESONEO)](https://searchengineland.com/chatgpt-retrieval-stack-index-cache-pages-485036)
- [Surfer — cómo eligen fuentes los buscadores con IA](https://surferseo.com/blog/how-do-ai-engines-choose-sources/)
- [Ahrefs — RAG explicado](https://ahrefs.com/blog/retrieval-augmented-generation/)
- [web.dev — *Build agent-friendly websites*](https://web.dev/articles/ai-agent-site-ux)
- [Search Engine Journal — el árbol de accesibilidad es como los agentes leen tu sitio](https://www.searchenginejournal.com/the-accessibility-tree-is-how-ai-agents-read-your-site-its-breaking/578171/)
- [Ahrefs — 97 % de los llms.txt nunca se leen](https://ahrefs.com/blog/llmstxt-study/)
- [Flavio Copes — *robots.txt in the age of AI crawlers*](https://flaviocopes.com/robots-txt-ai-crawlers/)
- [Google — datos estructurados ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
