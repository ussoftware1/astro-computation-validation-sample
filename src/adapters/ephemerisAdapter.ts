import type { BirthInput, ChartComputation, ChartConfig } from '../types.js';

export interface EphemerisAdapter {
  name: string;
  computeNatalChart(input: BirthInput, config: ChartConfig): Promise<ChartComputation>;
}

export class FixtureEphemerisAdapter implements EphemerisAdapter {
  public readonly name = 'fixture-adapter';

  public constructor(private readonly fixture: ChartComputation) {}

  public async computeNatalChart(input: BirthInput, config: ChartConfig): Promise<ChartComputation> {
    return {
      ...this.fixture,
      input,
      config
    };
  }
}

export class SwissEphemerisAdapterBoundary implements EphemerisAdapter {
  public readonly name = 'swiss-ephemeris-boundary';

  public async computeNatalChart(_input: BirthInput, _config: ChartConfig): Promise<ChartComputation> {
    throw new Error(
      'Adapter boundary only. Wire this to licensed Swiss Ephemeris native/WASM output inside the client codebase.'
    );
  }
}
