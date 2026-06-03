# Portfolio Summary - Astrology Computation Validation Sample

This repository demonstrates a validation-first approach for astrology computation software where accuracy, determinism, and reproducible acceptance tests matter as much as UI delivery.

## Scope demonstrated

- TypeScript contracts for normalized birth input, chart configuration, planetary positions, house cusps, and aspects.
- Backend-oriented ephemeris adapter boundary, so React remains a renderer and computation stays isolated.
- Configurable aspect-grid logic with major and minor aspects and per-aspect orb handling.
- Tolerance-based validation helpers for longitude, latitude, declination, distance, retrograde flags, and house cusps.
- Fixture-based test structure that can be replaced with Swiss Ephemeris native output and cross-validation data from AstroSeek and Astrodienst.

## Validation approach

The intended reference hierarchy is Swiss Ephemeris native output as the primary source, cross-checked against AstroSeek and Astrodienst using the exact same birth data. Accepted cases should be serialized as versioned fixtures and checked with clear expected values, actual values, deltas, and tolerance thresholds.

The first diagnostic milestone should reproduce the reported non-determinism using fixed inputs and repeated runs across UTC conversion, IANA time zone handling, ephemeris path/version, cache behavior, WASM/native behavior, and Deno cold/warm execution.

## Architecture preference

The safest architecture is to preserve the backend-compute/frontend-render split. The existing WASM wrapper should be kept only if it proves deterministic under the validation harness. If divergence continues, Swiss computation should move behind a controlled native service with a narrow API and full fixture-based regression coverage.

## NDA-safe note

This is a technical sample. It does not contain proprietary client code, real birth data, licensed ephemeris files, or commercial secrets.
