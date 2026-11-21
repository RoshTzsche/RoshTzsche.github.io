# Cómo ser visible para buscadores **y** agentes de IA (noviembre 2026)

Notas de investigación para esta web. La idea: que al buscar "Rosh Guadiana Páez" en Google, ChatGPT, Claude o Perplexity, la respuesta salga de aquí.

## 1. Lo que más pesa: el HTML tiene que traer el contenido

Los crawlers de IA más importantes **no ejecutan JavaScript**. El estudio de Vercel/MERJ no encontró renderizado de JS en OpenAI (OAI-SearchBot, ChatGPT-User, GPTBot), Anthropic (ClaudeBot), Meta, ByteDance ni Perplexity. Las excepciones son Gemini (usa la infraestructura de Googlebot) y Applebot. Un experimento de Search Engine Land con enlaces inyectados por JS vio que GPTBot, ClaudeBot, Bingbot y PerplexityBot no descubrieron **ninguna** de esas páginas.

**Qué hicimos:**
- Astro genera HTML estático: todo el texto está en el HTML, sin depender de JS.
- La raíz `/` antes era una redirección por JavaScript (para un bot de IA, una página vacía). **Ahora sirve la portada completa en inglés como HTML** y solo los navegadores en español se redirigen a `/es/`.
- Las animaciones (atractor, EEG) son decoración; ningún dato importante vive solo en JS.

## 2. robots.txt: dejar pasar a los bots de IA, explícitamente

Hay tres tipos de bot de IA, y conviene distinguirlos:

| Tipo | Ejemplos | Para qué |
|---|---|---|
| Búsqueda / citación | OAI-SearchBot, Claude-SearchBot, PerplexityBot | Indexan páginas para citarlas en respuestas |
| Petición del usuario | ChatGPT-User, Claude-User, Perplexity-User | Visitan una página porque alguien lo pidió |
| Entrenamiento | GPTBot, ClaudeBot, Google-Extended, CCBot | Datos para entrenar modelos |

Para un sitio personal que quiere ser conocido, **ser la fuente citada en una respuesta de IA es la nueva primera página**. Por eso aquí se permiten los tres tipos (incluido entrenamiento: que los modelos futuros "sepan" quién eres). `Google-Extended` no es un crawler aparte: solo controla el uso para Gemini y no afecta al ranking en Google. `anthropic-ai` y `Claude-Web` están obsoletos.

**Qué hicimos:** `/robots.txt` lista cada bot con `Allow: /`, apunta al sitemap y a `llms.txt`.

## 3. Datos estructurados (schema.org)

- `ProfilePage` con `mainEntity: Person` en la portada. Google la define para páginas cuyo foco es una sola persona afiliada al sitio, como un "Sobre mí".
- `Person` con `name`, `alternateName` (con y sin acento, y el usuario RoshTzsche), `affiliation` (UDLAP), `identifier` (ORCID) y **`sameAs`** a GitHub, LinkedIn, ORCID, Lichess y Chess.com. `sameAs` es lo que permite a buscadores y modelos unir todos tus perfiles en una sola entidad.
- `BlogPosting` en cada entrada, con autor enlazado a la misma `Person`.

## 4. llms.txt: barato, pero sin esperar milagros

`/llms.txt` es una propuesta de Jeremy Howard (septiembre de 2024): un índice en Markdown de "qué leer primero". La evidencia de 2026 es poco alentadora:
- Ahrefs analizó 137 mil sitios: **el 97 % de los archivos llms.txt no recibió ninguna petición** en mayo de 2026. Los que más los leen son **agentes de programación** (Claude Code fue de los principales) y crawlers de entrenamiento, no los bots de búsqueda que generan citas.
- Google dijo en mayo de 2026 que no hace falta para aparecer en sus funciones de IA.
- Un estudio de 10 sitios (Search Engine Land): 2 subieron su tráfico de IA, 8 no cambiaron.

**Qué hicimos (cuesta casi nada):** `/llms.txt` (índice), `/llms-full.txt` (todo el perfil, proyectos y entradas en un archivo) y cada entrada en Markdown puro (`/en/writing/<slug>.md`), enlazado con `<link rel="alternate" type="text/markdown">`.

## 5. SEO clásico que sigue mandando

- `<title>` con tu nombre completo y contexto, `meta description`, `canonical`.
- `hreflang` es/en/x-default y sitemap con alternativas por idioma.
- Contenido real y específico: proyectos con nombres, premios, fechas, instituciones. Los modelos citan hechos concretos.

## 6. Lo que tienes que hacer tú (lo que más mueve la aguja)

1. **Google Search Console** (search.google.com/search-console): agrega la propiedad `https://roshtzsche.github.io/`, verifícala (pásame la etiqueta `google-site-verification` y la pongo) y envía `sitemap.xml`. Haz lo mismo en **Bing Webmaster Tools**, porque ChatGPT search usa el índice de Bing.
2. **Enlaces hacia tu web desde todos tus perfiles:** en el campo *Website* de GitHub, LinkedIn, ORCID, Instagram, Lichess y Chess.com, y en tu README de GitHub y tu CV. Son las señales más fuertes de que esta web eres tú.
3. **Dominio propio** (`roshguadiana.dev`): coincide exactamente con tu nombre.
4. **Escribir.** Cada entrada con tu nombre, en dos idiomas, es otra puerta de entrada.
5. **Paciencia:** indexar y posicionar lleva semanas. LinkedIn o GitHub pueden salir arriba al principio; con los enlaces cruzados, tu web pasa a ser la referencia.

## Fuentes

- Vercel — *The rise of the AI crawler*: https://vercel.com/blog/the-rise-of-the-ai-crawler
- Search Engine Land — enlaces por JavaScript invisibles para la búsqueda con IA: https://searchengineland.com/javascript-links-pages-invisible-ai-search-485228
- Ahrefs — *We analyzed 137K sites: 97% of llms.txt files never get read*: https://ahrefs.com/blog/llmstxt-study/
- Search Engine Journal — resumen del estudio de Ahrefs: https://searchenginejournal.com/97-of-llms-txt-files-got-no-requests-ahrefs-data-shows/579478
- Flavio Copes — *robots.txt in the age of AI crawlers*: https://flaviocopes.com/robots-txt-ai-crawlers/
- Search Engine Journal — lista de user-agents de IA: https://www.searchenginejournal.com/ai-crawler-user-agents-list/558130/
- Google — datos estructurados ProfilePage: https://developers.google.com/search/docs/appearance/structured-data/profile-page
