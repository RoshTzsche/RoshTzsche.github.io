# roshguadiana.dev

Web personal de **Rosh Guadiana Páez**: proyectos, investigación y escritos.
Hecha con [Astro](https://astro.build), publicada en GitHub Pages, en español e inglés, con dos modos: **terminal** y **papel** (tecla `D`).

## Correr en local

```bash
npm install
npm run dev        # http://localhost:4321  (muestra también los borradores)
npm run build      # genera dist/ como en producción
```

## Escribir una entrada

1. Crea `src/content/writing/es/mi-entrada.md` (en inglés: `.../en/mi-entrada.md`).
2. Cabecera:

   ```markdown
   ---
   title: "Título"
   date: 2026-11-25
   shelf: science          # science | chess | personal
   tags: [eeg, dinámica]
   summary: "Una o dos frases."
   draft: true             # quítalo para publicar
   ---
   ```

3. Escribe en Markdown. Matemáticas con LaTeX: `$x(t)$` en línea, `$$ ... $$` en bloque. Notas al pie con `[^1]`.
4. `git add . && git commit -m "Nueva entrada" && git push`.

El **mismo nombre de archivo** en `es/` y `en/` es la misma entrada en dos idiomas.

### Traducción automática

Al hacer push de una entrada que solo existe en un idioma (y sin `draft: true`), la Action **Translate posts** la traduce con Groq (o Gemini) y abre un **pull request** con la otra versión. Revísalo, corrige lo que haga falta y haz merge. La versión traducida muestra la nota *"Traducido con IA"*; cambia `reviewed: false` a `true` cuando la hayas revisado.

En local: `GROQ_API_KEY=... npm run translate` (o `-- ruta/al/archivo.md` para una sola).

**Configuración (una sola vez), en el repo → Settings:**
- *Secrets and variables → Actions → New repository secret*: `GROQ_API_KEY` (de console.groq.com) y/o `GEMINI_API_KEY` (de aistudio.google.com).
- Opcional, en *Variables*: `GROQ_MODEL` o `GEMINI_MODEL` para cambiar de modelo.
- *Actions → General → Workflow permissions*: marca **Allow GitHub Actions to create and approve pull requests**.

### Partidas de ajedrez

Usa `shelf: chess` y pega la partida en el campo `pgn` (ver `src/content/writing/es/plantilla-partida.md`). Se muestra con un tablero interactivo.

## Editar el resto

| Qué | Dónde |
|---|---|
| Proyectos, distinciones, competencias | `src/data/projects.ts` |
| Textos de la interfaz (ES/EN) | `src/i18n/ui.ts` |
| Colores y tipografías de cada modo | `src/styles/global.css` |
| Repertorio de ajedrez, usuarios | `src/pages/[lang]/chess.astro` |
| CV | `public/cv.pdf` |

## Deploy

La Action **Deploy** construye y publica en cada push a `main`, y una vez al día (para actualizar los ratings de ajedrez).
Para usar un dominio propio: añade `public/CNAME` con el dominio, cambia `site` en `astro.config.mjs` y configúralo en *Settings → Pages*.
