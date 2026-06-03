# Validation Strategy

## Reference hierarchy

1. Primary reference: Swiss Ephemeris native output generated in a controlled environment.
2. Cross-validation: AstroSeek and Astrodienst exports for the exact same birth inputs.
3. Internal regression set: saved JSON fixtures for every accepted case, versioned in the test suite.

## Test case design

The first validation package should contain at least ten reference cases covering:

- Time zone edge cases, including daylight-saving transitions and ambiguous local times.
- Northern, southern, eastern, and western hemispheres.
- High-latitude births where house systems can behave differently.
- Tropical and sidereal modes.
- Placidus, Koch, Whole Sign, Equal, Porphyry, and Regiomontanus houses.
- Retrograde and direct motion flags.
- True and mean nodes.

## Tolerances

- Planetary longitude: 0.00001 degree unless the client agrees to a different tolerance per body or feature.
- Declination and latitude: 0.00001 degree when source data is available.
- Distance: 0.000001 AU unless the client accepts body-specific tolerances.
- House cusps: exact integer-degree agreement where that is the agreed acceptance rule; otherwise store the precise Swiss output and compare by a defined degree tolerance.

## Non-determinism audit

For the existing inconsistent-position bug, I would first freeze the input and run repeated calculations under a matrix:

- Local time vs UTC conversion path.
- IANA time zone resolution and DST handling.
- Ephemeris file path and version.
- WASM/native adapter choice.
- Cache enabled vs disabled.
- Deno edge cold start vs warm execution.
- Frontend-triggered recompute vs backend-only recompute.

The output should be a root-cause report, a fix, and a test that fails before the fix and passes after the fix.

## Acceptance reporting

Each milestone gets a validation report with:

- Number of cases run.
- Number passed and failed.
- Failed paths, expected values, actual values, deltas, and tolerances.
- Screenshot or exported artifact where visual acceptance is involved.
- Notes on any cases requiring founder acceptance or reference-data clarification.
