import type { ChartConfig } from './types.js';

export const defaultAspectOrbs: Record<string, number> = {
  conjunction: 8,
  opposition: 8,
  trine: 7,
  square: 7,
  sextile: 5,
  quincunx: 3,
  semisextile: 2,
  semisquare: 2,
  sesquisquare: 2
};

export const defaultChartConfig: ChartConfig = {
  zodiac: 'tropical',
  ayanamsa: 'none',
  houseSystem: 'placidus',
  includeMinorAspects: true,
  aspectOrbs: defaultAspectOrbs
};

export function mergeChartConfig(
  userDefault: ChartConfig,
  chartOverride?: Partial<ChartConfig>
): ChartConfig {
  if (!chartOverride) return userDefault;

  return {
    ...userDefault,
    ...chartOverride,
    aspectOrbs: {
      ...userDefault.aspectOrbs,
      ...(chartOverride.aspectOrbs ?? {})
    }
  };
}
