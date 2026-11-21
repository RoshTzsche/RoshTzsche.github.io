---
title: "Plantilla: partida comentada (Morphy, la Partida de la Ópera)"
date: 2026-11-20
shelf: chess
tags: [plantilla]
summary: "Ejemplo de cómo escribir una partida comentada: pega el PGN en el campo pgn y comenta debajo."
draft: true
pgn: |
  [Event "Paris Opera"]
  [White "Paul Morphy"]
  [Black "Duke Karl / Count Isouard"]
  [Result "1-0"]

  1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7
  8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7
  14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0
---

Esta es una **plantilla** (es borrador, solo se ve con `npm run dev`). Para escribir tus propias partidas:

1. Copia este archivo con otro nombre, por ejemplo `mi-india-de-rey.md`.
2. Pega tu partida en el campo `pgn` (desde Lichess: *Compartir → PGN*).
3. Comenta aquí abajo en Markdown y quita `draft: true`.

**Jugada 10. Nxb5!** — Morphy entrega una pieza para abrir líneas contra el rey que no ha enrocado.
