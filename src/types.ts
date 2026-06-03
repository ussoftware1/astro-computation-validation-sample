export type ZodiacMode = 'tropical' | 'sidereal';

export type HouseSystem =
  | 'placidus'
  | 'koch'
  | 'whole-sign'
  | 'equal'
  | 'porphyry'
  | 'regiomontanus';

export type Ayanamsa =
  | 'none'
  | 'lahiri'
  | 'fagan-bradley'
  | 'raman'
  | 'krishnamurti';

export interface BirthInput {
  id: string;
  label: string;
  isoLocalDateTime: string;
  timeZone: string;
  latitude: number;
  longitude: number;
}

export interface ChartConfig {
  zodiac: ZodiacMode;
  ayanamsa: Ayanamsa;
  houseSystem: HouseSystem;
  aspectOrbs: Record<string, number>;
  includeMinorAspects: boolean;
}

export interface BodyPosition {
  body: string;
  longitudeDeg: number;
  latitudeDeg?: number;
  declinationDeg?: number;
  distanceAu?: number;
  retrograde?: boolean;
}

export interface HouseCusp {
  house: number;
  longitudeDeg: number;
}

export interface ChartComputation {
  input: BirthInput;
  config: ChartConfig;
  julianDayUt: number;
  positions: BodyPosition[];
  houseCusps: HouseCusp[];
  ascendantDeg?: number;
  mcDeg?: number;
}

export interface AspectDefinition {
  name: string;
  angleDeg: number;
  defaultOrbDeg: number;
  family: 'major' | 'minor';
}

export interface ComputedAspect {
  bodyA: string;
  bodyB: string;
  aspect: string;
  exactAngleDeg: number;
  actualSeparationDeg: number;
  orbDeg: number;
}

export interface ValidationTolerance {
  longitudeDeg: number;
  latitudeDeg?: number;
  declinationDeg?: number;
  distanceAu?: number;
  houseCuspDeg: number;
}

export interface ValidationDiff {
  path: string;
  expected: number | boolean | string | null;
  actual: number | boolean | string | null;
  delta?: number;
  tolerance?: number;
  status: 'pass' | 'fail';
}

export interface ValidationReport {
  caseId: string;
  status: 'pass' | 'fail';
  diffs: ValidationDiff[];
}
