import { shortestAngularDeltaDeg } from './angles.js';
import type {
  BodyPosition,
  ChartComputation,
  HouseCusp,
  ValidationDiff,
  ValidationReport,
  ValidationTolerance
} from './types.js';

const defaultTolerance: ValidationTolerance = {
  longitudeDeg: 0.00001,
  latitudeDeg: 0.00001,
  declinationDeg: 0.00001,
  distanceAu: 0.000001,
  houseCuspDeg: 1
};

function addNumericDiff(
  diffs: ValidationDiff[],
  path: string,
  expected: number | undefined,
  actual: number | undefined,
  tolerance: number,
  angular = false
): void {
  if (expected === undefined && actual === undefined) return;

  if (expected === undefined || actual === undefined) {
    diffs.push({ path, expected: expected ?? null, actual: actual ?? null, status: 'fail' });
    return;
  }

  const delta = angular ? shortestAngularDeltaDeg(expected, actual) : Math.abs(expected - actual);
  diffs.push({
    path,
    expected,
    actual,
    delta,
    tolerance,
    status: delta <= tolerance ? 'pass' : 'fail'
  });
}

function addBooleanDiff(
  diffs: ValidationDiff[],
  path: string,
  expected: boolean | undefined,
  actual: boolean | undefined
): void {
  if (expected === undefined && actual === undefined) return;
  diffs.push({
    path,
    expected: expected ?? null,
    actual: actual ?? null,
    status: expected === actual ? 'pass' : 'fail'
  });
}

function byBody(items: BodyPosition[]): Map<string, BodyPosition> {
  return new Map(items.map((item) => [item.body, item]));
}

function byHouse(items: HouseCusp[]): Map<number, HouseCusp> {
  return new Map(items.map((item) => [item.house, item]));
}

export function validateChartComputation(
  caseId: string,
  expected: ChartComputation,
  actual: ChartComputation,
  tolerance: Partial<ValidationTolerance> = {}
): ValidationReport {
  const t = { ...defaultTolerance, ...tolerance };
  const diffs: ValidationDiff[] = [];

  const expectedPositions = byBody(expected.positions);
  const actualPositions = byBody(actual.positions);

  for (const [body, expectedPosition] of expectedPositions) {
    const actualPosition = actualPositions.get(body);
    if (!actualPosition) {
      diffs.push({ path: `positions.${body}`, expected: 'present', actual: 'missing', status: 'fail' });
      continue;
    }

    addNumericDiff(
      diffs,
      `positions.${body}.longitudeDeg`,
      expectedPosition.longitudeDeg,
      actualPosition.longitudeDeg,
      t.longitudeDeg,
      true
    );
    addNumericDiff(
      diffs,
      `positions.${body}.latitudeDeg`,
      expectedPosition.latitudeDeg,
      actualPosition.latitudeDeg,
      t.latitudeDeg ?? t.longitudeDeg
    );
    addNumericDiff(
      diffs,
      `positions.${body}.declinationDeg`,
      expectedPosition.declinationDeg,
      actualPosition.declinationDeg,
      t.declinationDeg ?? t.longitudeDeg
    );
    addNumericDiff(
      diffs,
      `positions.${body}.distanceAu`,
      expectedPosition.distanceAu,
      actualPosition.distanceAu,
      t.distanceAu ?? 0.000001
    );
    addBooleanDiff(diffs, `positions.${body}.retrograde`, expectedPosition.retrograde, actualPosition.retrograde);
  }

  const expectedCusps = byHouse(expected.houseCusps);
  const actualCusps = byHouse(actual.houseCusps);

  for (const [house, expectedCusp] of expectedCusps) {
    const actualCusp = actualCusps.get(house);
    if (!actualCusp) {
      diffs.push({ path: `houseCusps.${house}`, expected: 'present', actual: 'missing', status: 'fail' });
      continue;
    }
    addNumericDiff(
      diffs,
      `houseCusps.${house}.longitudeDeg`,
      expectedCusp.longitudeDeg,
      actualCusp.longitudeDeg,
      t.houseCuspDeg,
      true
    );
  }

  return {
    caseId,
    status: diffs.every((diff) => diff.status === 'pass') ? 'pass' : 'fail',
    diffs
  };
}

export function summarizeReports(reports: ValidationReport[]): string {
  const pass = reports.filter((report) => report.status === 'pass').length;
  const fail = reports.length - pass;
  const failedPaths = reports
    .flatMap((report) => report.diffs.filter((diff) => diff.status === 'fail').map((diff) => `${report.caseId}:${diff.path}`))
    .slice(0, 20);

  return JSON.stringify({ total: reports.length, pass, fail, failedPaths }, null, 2);
}
