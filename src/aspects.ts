import { angularSeparationDeg } from './angles.js';
import type { AspectDefinition, BodyPosition, ChartConfig, ComputedAspect } from './types.js';

export const aspectDefinitions: AspectDefinition[] = [
  { name: 'conjunction', angleDeg: 0, defaultOrbDeg: 8, family: 'major' },
  { name: 'opposition', angleDeg: 180, defaultOrbDeg: 8, family: 'major' },
  { name: 'trine', angleDeg: 120, defaultOrbDeg: 7, family: 'major' },
  { name: 'square', angleDeg: 90, defaultOrbDeg: 7, family: 'major' },
  { name: 'sextile', angleDeg: 60, defaultOrbDeg: 5, family: 'major' },
  { name: 'quincunx', angleDeg: 150, defaultOrbDeg: 3, family: 'minor' },
  { name: 'semisextile', angleDeg: 30, defaultOrbDeg: 2, family: 'minor' },
  { name: 'semisquare', angleDeg: 45, defaultOrbDeg: 2, family: 'minor' },
  { name: 'sesquisquare', angleDeg: 135, defaultOrbDeg: 2, family: 'minor' }
];

export function computeAspects(positions: BodyPosition[], config: ChartConfig): ComputedAspect[] {
  const enabledDefinitions = aspectDefinitions.filter(
    (definition) => definition.family === 'major' || config.includeMinorAspects
  );

  const aspects: ComputedAspect[] = [];

  for (let i = 0; i < positions.length; i += 1) {
    for (let j = i + 1; j < positions.length; j += 1) {
      const a = positions[i];
      const b = positions[j];
      if (!a || !b) continue;

      const separation = angularSeparationDeg(a.longitudeDeg, b.longitudeDeg);

      for (const definition of enabledDefinitions) {
        const configuredOrb = config.aspectOrbs[definition.name] ?? definition.defaultOrbDeg;
        const orb = Math.abs(separation - definition.angleDeg);
        if (orb <= configuredOrb) {
          aspects.push({
            bodyA: a.body,
            bodyB: b.body,
            aspect: definition.name,
            exactAngleDeg: definition.angleDeg,
            actualSeparationDeg: separation,
            orbDeg: orb
          });
        }
      }
    }
  }

  return aspects.sort((x, y) => x.bodyA.localeCompare(y.bodyA) || x.bodyB.localeCompare(y.bodyB));
}
