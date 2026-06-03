import { describe, expect, it } from 'vitest';
import referenceCases from '../data/reference_cases.sample.json' assert { type: 'json' };
import { computeAspects } from '../src/aspects.js';
import { defaultChartConfig } from '../src/config.js';
import { validateChartComputation } from '../src/validation.js';
import type { ChartComputation } from '../src/types.js';

describe('validation harness sample', () => {
  it('passes a deterministic fixture against itself', () => {
    const fixture = referenceCases[0] as ChartComputation;
    const report = validateChartComputation(fixture.input.id, fixture, fixture);
    expect(report.status).toBe('pass');
  });

  it('detects longitude differences above tolerance', () => {
    const expected = referenceCases[0] as ChartComputation;
    const actual: ChartComputation = {
      ...expected,
      positions: expected.positions.map((position) =>
        position.body === 'Sun' ? { ...position, longitudeDeg: position.longitudeDeg + 0.01 } : position
      )
    };

    const report = validateChartComputation(expected.input.id, expected, actual, { longitudeDeg: 0.00001 });
    expect(report.status).toBe('fail');
    expect(report.diffs.some((diff) => diff.path === 'positions.Sun.longitudeDeg' && diff.status === 'fail')).toBe(true);
  });

  it('computes configurable aspects', () => {
    const aspects = computeAspects(
      [
        { body: 'A', longitudeDeg: 10 },
        { body: 'B', longitudeDeg: 70 },
        { body: 'C', longitudeDeg: 190 }
      ],
      defaultChartConfig
    );

    expect(aspects.map((aspect) => aspect.aspect)).toContain('sextile');
    expect(aspects.map((aspect) => aspect.aspect)).toContain('opposition');
  });
});
