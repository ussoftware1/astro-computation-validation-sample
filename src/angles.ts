export function normalizeAngle(deg: number): number {
  const normalized = deg % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

export function shortestAngularDeltaDeg(a: number, b: number): number {
  const delta = Math.abs(normalizeAngle(a) - normalizeAngle(b));
  return delta > 180 ? 360 - delta : delta;
}

export function angularSeparationDeg(a: number, b: number): number {
  return shortestAngularDeltaDeg(a, b);
}

export function roundDeg(value: number, digits = 6): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
