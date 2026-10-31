import { DRIVE_DIMENSIONS, SEMANTIC_AXES } from '../../semantics/semanticTaxonomy.js';
import { pairSignaturesOf } from './pairSignatures.js';
/** The two families of shared inputs: the sky at the birth moment, and the civil birth date. */
export const FAMILY_OF = {
    astrology: 'sky', 'human-design': 'sky', bazi: 'calendar', numerology: 'calendar',
};
export function corroborationOf(pillars) {
    if (pillars.length <= 1)
        return 'single-source';
    const families = new Set(pillars.map((pillar) => FAMILY_OF[pillar]));
    return families.size >= 2 ? 'firm' : 'supported';
}
const STRENGTH_RANK = { clear: 3, slight: 2, middle: 1, unknown: 0 };
const relationStrength = (a, b) => {
    const weakest = Math.min(STRENGTH_RANK[a.strength], STRENGTH_RANK[b.strength]);
    const strongest = Math.max(STRENGTH_RANK[a.strength], STRENGTH_RANK[b.strength]);
    if (weakest >= 3)
        return 'strong';
    if (weakest >= 2 || (strongest >= 3 && weakest >= 1))
        return 'moderate';
    return 'faint';
};
/** The weaker of the two people's corroboration decides the pair's: a relation is only as firm as its thinner side. */
const weaker = (x, y) => {
    const order = ['single-source', 'supported', 'firm'];
    return order[Math.min(order.indexOf(x), order.indexOf(y))];
};
export function axisRelationOf(a, b) {
    const base = { axis: a.axis, stanceA: a, stanceB: b, poleA: a.pole, poleB: b.pole, hedged: a.mixed || b.mixed, timeSensitive: a.timeSensitive || b.timeSensitive };
    const corroboration = (poleSide) => {
        const sides = poleSide === 'a' ? [a] : poleSide === 'b' ? [b] : [a, b];
        return sides.map((side) => corroborationOf(side.pillars)).reduce(weaker);
    };
    if (a.strength === 'unknown' || b.strength === 'unknown') {
        return { ...base, kind: 'unreadable', strength: 'faint', corroboration: 'single-source' };
    }
    if (a.pole && b.pole) {
        return {
            ...base,
            kind: a.pole === b.pole ? 'shared' : 'opposed',
            strength: relationStrength(a, b),
            corroboration: corroboration('both'),
        };
    }
    if (a.pole || b.pole) {
        return { ...base, kind: 'one-sided', strength: relationStrength(a, b), corroboration: corroboration(a.pole ? 'a' : 'b') };
    }
    return { ...base, kind: 'quiet', strength: 'faint', corroboration: 'single-source' };
}
/* ------------------------------------------------------------------ drives -- */
/** Drives that pull in different directions inside a relationship: the closeness / room pair and the people / results pair. */
const DRIVES_THAT_PULL_APART = [
    ['freedom', 'belonging'],
    ['achievement', 'care'],
    ['recognition', 'understanding'],
];
const pullsApart = (x, y) => DRIVES_THAT_PULL_APART.some(([p, q]) => (p === x && q === y) || (p === y && q === x));
const NOTABLE_DRIVES_PER_PERSON = 3;
export function driveRelationsOf(a, b) {
    const isDrive = (stance) => DRIVE_DIMENSIONS.includes(stance.dimension);
    const topA = a.drives.filter((drive) => isDrive(drive) && drive.notable).slice(0, NOTABLE_DRIVES_PER_PERSON);
    const topB = b.drives.filter((drive) => isDrive(drive) && drive.notable).slice(0, NOTABLE_DRIVES_PER_PERSON);
    const out = [];
    const used = new Set();
    for (const x of topA) {
        for (const y of topB) {
            const key = `${x.dimension}~${y.dimension}`;
            if (used.has(key))
                continue;
            used.add(key);
            const kind = x.dimension === y.dimension ? 'shared-drive' : pullsApart(x.dimension, y.dimension) ? 'drives-pull-apart' : null;
            if (!kind)
                continue;
            const strong = Math.min(x.z, y.z) >= 1.4;
            out.push({ kind, a: x.dimension, b: y.dimension, strength: strong ? 'strong' : Math.min(x.z, y.z) >= 1.0 ? 'moderate' : 'faint', pillarsA: x.pillars, pillarsB: y.pillars });
        }
    }
    /* Where nothing is shared and nothing pulls apart, the lead drive of each is still a fact about the pair: they are drawn to different things. */
    if (out.length === 0 && topA[0] && topB[0] && topA[0].dimension !== topB[0].dimension) {
        out.push({ kind: 'different-drives', a: topA[0].dimension, b: topB[0].dimension, strength: 'moderate', pillarsA: topA[0].pillars, pillarsB: topB[0].pillars });
    }
    const rank = { 'drives-pull-apart': 0, 'shared-drive': 1, 'different-drives': 2 };
    return out.sort((p, q) => rank[p.kind] - rank[q.kind] || (p.a < q.a ? -1 : 1));
}
/* -------------------------------------------------------------------- pair -- */
export function pairEvidenceOf(a, b, factsA, factsB) {
    const axes = {};
    for (const axis of SEMANTIC_AXES)
        axes[axis.id] = axisRelationOf(a.axes[axis.id], b.axes[axis.id]);
    const signatures = factsA && factsB ? pairSignaturesOf(factsA, factsB) : [];
    const missing = [
        ...a.pillarsMissing.map((pillar) => ({ side: 'a', pillar })),
        ...b.pillarsMissing.map((pillar) => ({ side: 'b', pillar })),
    ];
    return {
        axes,
        drives: driveRelationsOf(a, b),
        signatures,
        coverage: {
            unreadableAxes: SEMANTIC_AXES.filter((axis) => axes[axis.id].kind === 'unreadable').map((axis) => axis.id),
            timeSensitiveAxes: SEMANTIC_AXES.filter((axis) => axes[axis.id].timeSensitive && axes[axis.id].kind !== 'quiet').map((axis) => axis.id),
            signatureSystems: [...new Set(signatures.map((signature) => signature.system))].sort(),
            missingPillars: missing,
            birthTime: { a: a.birthTimePrecision, b: b.birthTimePrecision },
        },
    };
}
