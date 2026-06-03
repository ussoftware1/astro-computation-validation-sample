# Astrology Computation Validation Evidence Pack

NDA-safe sample repository prepared for a production-bound astrology platform that needs React/TypeScript delivery discipline, backend computational validation, and milestone-based acceptance testing.

This repository is not a copy of any proprietary client system and does not include licensed Swiss Ephemeris files. It is a compact demonstration of the validation architecture, data contracts, configuration model, aspect-grid logic, and acceptance-report style I would use after codebase access.

## Why this is relevant

The target project requires validation of existing computational features against Swiss Ephemeris native output, cross-checking against AstroSeek and Astrodienst, strict tolerance thresholds, user-level configuration, natal/aspect validation, dashboard work, a full SVG natal wheel rebuild, and a persistent multi-panel relationship workspace.

This sample focuses on the highest-risk part of that project: deterministic computation and repeatable validation. The same pattern can be extended across natal, transit, progression, return, relationship, asteroid, eclipse, lunar event, and specialist point features.

## What is included

- TypeScript domain contracts for birth input, chart configuration, planetary positions, house cusps, and aspects.
- A configurable aspect engine supporting major and minor aspects with per-aspect orbs.
- Validation helpers for angular positions, house cusps, retrograde flags, and tolerance-based diff reporting.
- An ephemeris adapter boundary that keeps computation on the backend while the frontend remains a renderer.
- Sample fixture-based test scaffolding showing how reference cases are compared.
- Milestone bid structure and validation approach documents suitable for linking in a proposal.

## What is intentionally not included

- Swiss Ephemeris binary data files or proprietary ephemeris resources.
- Client source code.
- Real client birth data.
- Any claim that this sample is a shipped commercial astrology product.

## Suggested architecture for the target project

My preferred approach is to vendor the Swiss Ephemeris C library or use a controlled native service, keep the current Deno edge-function split where possible, and isolate computation behind a stable adapter contract. If the current WASM layer is causing non-determinism, I would first reproduce it with fixed UTC inputs, fixed ephemeris path, disabled caching, and repeated runs before deciding whether to replace it.

## Repository layout

```text
src/
  adapters/ephemerisAdapter.ts
  angles.ts
  aspects.ts
  config.ts
  types.ts
  validation.ts
  runner.ts
tests/
  validation.test.ts
data/
  reference_cases.sample.json
docs/
  validation_strategy.md
  architecture_decision.md
  milestone_bid_structure.md
  proposal_link_text.md
  upload_instructions.md
```

## How to run after upload

```bash
npm install
npm test
```

The included fixture tests use sample deterministic data only. In the real project, the fixture set should be replaced with Swiss Ephemeris native output and cross-validation exports from AstroSeek and Astrodienst for the exact same birth data.

## Positioning note for proposals

Use this link as a technical sample or pre-award evidence pack, not as a false past-production portfolio claim. A clean sentence is:

"I prepared an NDA-safe computational validation sample showing the TypeScript contracts, ephemeris adapter boundary, tolerance-based test harness, and milestone validation plan I would apply to your Swiss Ephemeris-based astrology platform."
