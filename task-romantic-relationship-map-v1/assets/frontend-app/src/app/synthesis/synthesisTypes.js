/**
 * First-version schema for the Cross-Pillar Synthesis (fifth pillar). This layer is
 * built entirely on top of the already-computed export/crossPillarSignals.ts +
 * crossPillarCandidates.ts + semanticGuardrails.ts data (never a second parallel
 * calculation of pillar output) — see synthesisProfileBuilder.ts for the assembly.
 */
export const SYNTHESIS_SCHEMA_VERSION = 'cross-pillar-synthesis-v0.1';
export const LIFE_AREA_IDS = [
    'personal-life',
    'relationships-intimacy',
    'work-career',
    'decision-making',
    'communication',
    'stress-recovery',
    'growth-direction',
];
export function findEvidence(profile, ids) {
    const byId = new Map(profile.evidenceIndex.map((entry) => [entry.id, entry]));
    return ids.map((id) => byId.get(id)).filter((entry) => Boolean(entry));
}
