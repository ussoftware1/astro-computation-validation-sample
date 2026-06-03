import { FixtureEphemerisAdapter } from './adapters/ephemerisAdapter.js';
import { validateChartComputation, summarizeReports } from './validation.js';
import type { ChartComputation } from './types.js';

export async function runFixtureValidation(referenceCases: ChartComputation[]): Promise<string> {
  const reports = [];

  for (const referenceCase of referenceCases) {
    const adapter = new FixtureEphemerisAdapter(referenceCase);
    const actual = await adapter.computeNatalChart(referenceCase.input, referenceCase.config);
    reports.push(validateChartComputation(referenceCase.input.id, referenceCase, actual));
  }

  return summarizeReports(reports);
}
