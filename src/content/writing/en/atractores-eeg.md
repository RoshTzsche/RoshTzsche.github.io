---
title: "Reconstructing attractors from a single EEG channel"
date: 2026-11-21
shelf: science
tags: [eeg, dynamical systems, takens]
summary: "One electrode, one time series — and yet a whole geometry hiding inside it. A walk through Takens' theorem and what it lets us see in the brain."
translatedFrom: es
reviewed: false
draft: true
---

An EEG electrode records a single number per instant: a voltage. The brain producing it is anything but one-dimensional. Takens' embedding theorem[^takens] says that, under mild conditions, stacking delayed copies of that one signal recovers a shape equivalent to the system's hidden attractor.

## The idea in one line

Given a series $x(t)$, we build vectors with a delay $\tau$ and a dimension $m$:

$$
\Phi(t) = \big(x(t),\ x(t-\tau),\ \dots,\ x(t-(m-1)\tau)\big)
$$

If $m > 2d$, where $d$ is the dimension of the attractor, $\Phi$ is generically an embedding: the curve it draws preserves the dynamics of the original system.

## Choosing $\tau$ and $m$

Two numbers decide whether the picture comes out right:

- **The delay $\tau$.** Too small and every coordinate repeats the same information; too large and they forget each other. A common choice is the first minimum of the average mutual information[^ami].
- **The dimension $m$.** Increase it until the *false nearest neighbours* disappear: points that looked close only because the projection was too flat.

## What's next

In [eeg_phase_space](https://github.com/RoshTzsche/eeg_phase_space) I implemented both heuristics on real EEG, together with band-pass filtering and Welch spectral power. In the next note: what changes in the attractor between eyes open and eyes closed.

[^takens]: F. Takens, "Detecting strange attractors in turbulence", *Lecture Notes in Mathematics* 898, 1981.
[^ami]: A. M. Fraser and H. L. Swinney, "Independent coordinates for strange attractors from mutual information", *Physical Review A* 33, 1986.
