import { DRIVE_DIMENSIONS, SEMANTIC_AXES, UNIPOLAR_DIMENSIONS, } from '../../semantics/semanticTaxonomy.js?v=53c0693';
import { AXIS_REFERENCE, DRIVE_REFERENCE } from './axisReference.js?v=53c0693';
/** Below this much counted weight on an axis, the evidence is too thin to place anyone on it. */
export const AXIS_MASS_FLOOR = 0.6;
/** |z| from which a stance is clear / slight. */
export const CLEAR_Z = 0.8;
export const SLIGHT_Z = 0.4;
/** Both poles at least this heavy, and the lighter at least this share of the heavier, and the axis is mixed. */
export const MIXED_POLE_FLOOR = 0.8;
export const MIXED_POLE_SHARE = 0.6;
/** A drive is notable from this z and this much weight. */
export const DRIVE_NOTABLE_Z = 0.8;
export const DRIVE_WEIGHT_FLOOR = 0.5;
const round = (value, places = 3) => {
    const factor = 10 ** places;
    return Math.round(value * factor) / factor;
};
const countable = (item) => item.evidence.methodology !== 'suppressed' && item.countedWeight > 0;
const heaviest = (items, limit) => ([...items].sort((a, b) => b.countedWeight - a.countedWeight || (a.evidence.id < b.evidence.id ? -1 : 1)).slice(0, limit));
const distinct = (values) => [...new Set(values)];
export function personEvidenceOf(synthesis) {
    const byDimension = new Map();
    for (const item of synthesis.evidence) {
        if (!countable(item))
            continue;
        const list = byDimension.get(item.evidence.dimension);
        if (list)
            list.push(item);
        else
            byDimension.set(item.evidence.dimension, [item]);
    }
    const weightOf = (dimension) => (byDimension.get(dimension) ?? []).reduce((sum, item) => sum + item.countedWeight, 0);
    const axes = {};
    for (const axis of SEMANTIC_AXES) {
        const [first, second] = axis.poles;
        const weightA = weightOf(first);
        const weightB = weightOf(second);
        const mass = weightA + weightB;
        const reference = AXIS_REFERENCE[axis.id];
        const lean = mass > 0 ? (weightB - weightA) / mass : 0;
        const enough = mass >= AXIS_MASS_FLOOR;
        const z = enough ? (lean - reference.meanLean) / reference.sdLean : 0;
        const size = Math.abs(z);
        const strength = !enough ? 'unknown' : size >= CLEAR_Z ? 'clear' : size >= SLIGHT_Z ? 'slight' : 'middle';
        const pole = enough && strength !== 'middle' ? (z < 0 ? first : second) : null;
        const heavy = Math.max(weightA, weightB);
        const light = Math.min(weightA, weightB);
        const mixed = light >= MIXED_POLE_FLOOR && light / heavy >= MIXED_POLE_SHARE;
        const leaning = pole ? (byDimension.get(pole) ?? []) : [...(byDimension.get(first) ?? []), ...(byDimension.get(second) ?? [])];
        axes[axis.id] = {
            axis: axis.id,
            weightA: round(weightA),
            weightB: round(weightB),
            mass: round(mass),
            lean: round(lean),
            z: round(z),
            pole,
            strength,
            mixed,
            timeSensitive: leaning.some((item) => item.evidence.methodology === 'time-sensitive'),
            independentRoots: distinct(leaning.map((item) => item.evidence.independenceGroup)).length,
            pillars: distinct(leaning.map((item) => item.evidence.pillar)).sort(),
            evidenceIds: heaviest(leaning, 4).map((item) => item.evidence.id),
            facts: heaviest(leaning, 4).map((item) => item.evidence.fact),
        };
    }
    const drives = [...DRIVE_DIMENSIONS, ...UNIPOLAR_DIMENSIONS].map((dimension) => {
        const items = byDimension.get(dimension) ?? [];
        const weight = weightOf(dimension);
        const reference = DRIVE_REFERENCE[dimension];
        const z = reference ? (weight - reference.mean) / reference.sd : 0;
        return {
            dimension,
            weight: round(weight),
            z: round(z),
            notable: weight >= DRIVE_WEIGHT_FLOOR && z >= DRIVE_NOTABLE_Z,
            pillars: distinct(items.map((item) => item.evidence.pillar)).sort(),
            evidenceIds: heaviest(items, 3).map((item) => item.evidence.id),
            facts: heaviest(items, 3).map((item) => item.evidence.fact),
        };
    }).sort((a, b) => b.z - a.z || (a.dimension < b.dimension ? -1 : 1));
    return {
        birthTimePrecision: synthesis.coverage.birthTimePrecision,
        pillarsPresent: synthesis.coverage.pillarsPresent,
        pillarsMissing: synthesis.coverage.pillarsMissing,
        evidenceCount: synthesis.coverage.evidenceCount,
        axes,
        drives,
        synthesisModelVersion: synthesis.modelVersion,
    };
}
export function deriveReference(syntheses) {
    const axisLeans = {};
    const driveWeights = {};
    for (const synthesis of syntheses) {
        const sums = new Map();
        for (const item of synthesis.evidence) {
            if (!countable(item))
                continue;
            sums.set(item.evidence.dimension, (sums.get(item.evidence.dimension) ?? 0) + item.countedWeight);
        }
        for (const axis of SEMANTIC_AXES) {
            const a = sums.get(axis.poles[0]) ?? 0;
            const b = sums.get(axis.poles[1]) ?? 0;
            const mass = a + b;
            (axisLeans[axis.id] ??= []).push(mass > 0 ? (b - a) / mass : 0);
        }
        for (const dimension of [...DRIVE_DIMENSIONS, ...UNIPOLAR_DIMENSIONS])
            (driveWeights[dimension] ??= []).push(sums.get(dimension) ?? 0);
    }
    const stats = (values) => {
        const mean = values.reduce((s, v) => s + v, 0) / values.length;
        const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
        return { mean: round(mean, 4), sd: Math.max(round(Math.sqrt(variance), 4), 0.05) };
    };
    return {
        axes: Object.fromEntries(Object.entries(axisLeans).map(([id, values]) => {
            const { mean, sd } = stats(values);
            return [id, { meanLean: mean, sdLean: sd }];
        })),
        drives: Object.fromEntries(Object.entries(driveWeights).map(([id, values]) => [id, stats(values)])),
    };
}
