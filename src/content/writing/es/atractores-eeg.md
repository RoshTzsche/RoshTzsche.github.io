---
title: "Reconstruir atractores a partir de un solo canal de EEG"
date: 2026-11-21
shelf: science
tags: [eeg, sistemas dinámicos, takens]
summary: "Un electrodo, una serie de tiempo — y una geometría completa escondida dentro. Un paseo por el teorema de Takens y lo que nos deja ver del cerebro."
draft: true
---

Un electrodo de EEG registra un solo número por instante: un voltaje. El cerebro que lo produce es cualquier cosa menos unidimensional. El teorema de embedding de Takens[^takens] dice que, bajo condiciones suaves, apilar copias retrasadas de esa única señal recupera una forma equivalente al atractor oculto del sistema.

## La idea en una línea

Dada una serie $x(t)$, construimos vectores con un retardo $\tau$ y una dimensión $m$:

$$
\Phi(t) = \big(x(t),\ x(t-\tau),\ \dots,\ x(t-(m-1)\tau)\big)
$$

Si $m > 2d$, donde $d$ es la dimensión del atractor, $\Phi$ es genéricamente un embedding: la curva que dibuja conserva la dinámica del sistema original.

## Elegir $\tau$ y $m$

Dos números deciden si la imagen sale bien:

- **El retardo $\tau$.** Si es muy pequeño, todas las coordenadas repiten la misma información; si es muy grande, se olvidan entre sí. Una elección común es el primer mínimo de la información mutua promedio[^ami].
- **La dimensión $m$.** Se sube hasta que desaparecen los *falsos vecinos cercanos*: puntos que parecían cerca solo porque la proyección era demasiado plana.

## Qué sigue

En [eeg_phase_space](https://github.com/RoshTzsche/eeg_phase_space) implementé ambas heurísticas sobre EEG real, junto con filtrado pasabanda y potencia espectral por Welch. En la próxima nota: qué cambia en el atractor entre ojos abiertos y cerrados.

[^takens]: F. Takens, "Detecting strange attractors in turbulence", *Lecture Notes in Mathematics* 898, 1981.
[^ami]: A. M. Fraser y H. L. Swinney, "Independent coordinates for strange attractors from mutual information", *Physical Review A* 33, 1986.
