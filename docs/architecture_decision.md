# Architecture Decision Note

## Preferred option

Use Swiss Ephemeris through a controlled backend adapter. The adapter can call a vendored C build, a native sidecar, or an existing WASM wrapper if it proves deterministic under the validation harness. The frontend should not own astronomical computation. It should request computed chart data and render it.

## Why

The target product already has a clean split: backend computation through Deno edge functions and frontend rendering through React/TypeScript. Preserving that split reduces UI risk while isolating the non-determinism issue in one computational boundary.

## Adapter contract

The adapter should accept:

- Birth input: local date/time, IANA time zone, latitude, longitude.
- Chart configuration: zodiac, ayanamsa, house system, aspect-orb profile, default chart preferences.
- Feature request: natal, transit, progression, return, relationship, asteroid, eclipse, lunar event, or specialist body/point.

The adapter should return:

- Julian day UT used for computation.
- Body positions.
- Retrograde flags.
- Declinations and distances where available.
- House cusps, Ascendant, MC, IC, Descendant.
- Computed aspects or raw positions for frontend aspect-table generation, depending on final architecture.

## Replacement rule

Do not replace the existing WASM wrapper blindly. First prove where the non-determinism comes from. If the wrapper is stable after fixed timezone handling and ephemeris-path control, keep it. If it continues to diverge, move Swiss computation into a native service with a narrow API and comprehensive fixtures.

## Lovable / Supabase fit

- Keep UI in React 19 + TypeScript with TanStack Router, Zustand, Tailwind v4, and Vite.
- Keep persistence in Supabase Postgres.
- Keep lightweight orchestration in Deno edge functions.
- Move only the fragile ephemeris computation into a specialized adapter if needed.
