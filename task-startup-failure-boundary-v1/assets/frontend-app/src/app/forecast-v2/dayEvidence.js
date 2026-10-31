import { CORROBORATION_FACTOR } from '../synthesis/foundation/evidenceIndependence.js?v=2ea79e9';
/*
 * HOW MUCH A DAY ACTUALLY LEANS ON SOMETHING, WITHOUT COUNTING ANYTHING TWICE.
 *
 * The natal synthesis already holds the rule this file applies to a day, and it is
 * reused rather than reinvented: inside one independence group, the heaviest member
 * making a claim counts in full and every further member counts at
 * CORROBORATION_FACTOR (0.15); and only a DIFFERENT PILLAR is a second witness.
 * Three Uranus aspects are one Uranus. Personal Year, Month and Day are one
 * numerology cycle. Four astrology facts do not outvote one numerology fact by
 * being four.
 *
 * THREE LEVELS, EACH ONE A WAY TO COUNT TOO MUCH
 *
 *   1. FACT -> GROUP   several facts of one influence: the heaviest counts, the
 *                      rest at 0.15. (Three aspects from one transit.)
 *   2. GROUP -> PILLAR several influences of one pillar pressing the same way:
 *                      the strongest in full, the second at 0.5, any further at
 *                      0.25. Mercury and Venus agreeing is reinforcement within
 *                      astrology, not two independent systems - so a pillar with
 *                      many things to say cannot win by volume.
 *   3. PILLAR -> WITNESS a claim has a real second witness only when two pillars
 *                      each carry it with weight of their own (WITNESS_FLOOR).
 *
 * The numbers are a ranking aid for choosing what a day says. They are never
 * shown, and every claim keeps the groups behind it (see dayPlan) so "why is it
 * telling me this" never needs a re-run.
 *
 * ONE COUNTING RULE FOR EVERYTHING. Poles, rising feelings and quieter feelings
 * all go through `combine`, so there is no path on which something is counted
 * differently from the rest.
 */
export const FACT_WEIGHT = { slight: 0.4, moderate: 0.7, strong: 1 };
export const EFFECT_WEIGHT = { primary: 1, secondary: 0.6 };
export const RELIABILITY_FACTOR = { high: 1, medium: 0.85, low: 0.6 };
/** Within one pillar: strongest influence in full, then half, then a quarter. */
export const PILLAR_STEPS = [1, 0.5, 0.25];
/** A pillar must carry a claim with at least this much weight to count as a witness for it. */
export const WITNESS_FLOOR = 0.4;
const round = (value) => Math.round(value * 1000) / 1000;
export function combine(entries) {
    const byGroup = new Map();
    for (const entry of entries) {
        if (entry.raw <= 0)
            continue;
        const bucket = byGroup.get(entry.group) ?? { pillar: entry.pillar, members: [] };
        bucket.members.push({ id: entry.id, raw: entry.raw });
        byGroup.set(entry.group, bucket);
    }
    const shares = [];
    for (const [group, bucket] of byGroup) {
        /* Heaviest first; equal weights fall back to the id so two runs cannot disagree about who represents the group. */
        const ordered = [...bucket.members].sort((left, right) => right.raw - left.raw || left.id.localeCompare(right.id));
        const weight = ordered.reduce((total, member, index) => total + member.raw * (index === 0 ? 1 : CORROBORATION_FACTOR), 0);
        shares.push({ group, pillar: bucket.pillar, weight: round(weight), counted: 0, factIds: ordered.map((member) => member.id) });
    }
    const counted = [];
    const pillars = [...new Set(shares.map((share) => share.pillar))].sort();
    const pillarTotals = new Map();
    for (const pillar of pillars) {
        const own = shares
            .filter((share) => share.pillar === pillar)
            .sort((left, right) => right.weight - left.weight || left.group.localeCompare(right.group));
        own.forEach((share, index) => {
            const value = round(share.weight * PILLAR_STEPS[Math.min(index, PILLAR_STEPS.length - 1)]);
            counted.push({ ...share, counted: value });
            pillarTotals.set(pillar, (pillarTotals.get(pillar) ?? 0) + value);
        });
    }
    return {
        total: round([...pillarTotals.values()].reduce((sum, value) => sum + value, 0)),
        groups: counted.sort((left, right) => right.counted - left.counted || left.group.localeCompare(right.group)),
        pillars,
        witnesses: [...pillarTotals.values()].filter((value) => value >= WITNESS_FLOOR).length,
    };
}
/** What one fact presses on one pole, before any discount. */
export function rawPoleWeight(fact, pole) {
    const effect = fact.effects.find((entry) => entry.pole === pole);
    if (!effect)
        return 0;
    return FACT_WEIGHT[fact.strength] * EFFECT_WEIGHT[effect.weight] * RELIABILITY_FACTOR[fact.reliability];
}
export function poleSupport(facts, pole) {
    return {
        pole,
        ...combine(facts.map((fact) => ({
            id: fact.id, group: fact.independenceGroup, pillar: fact.pillar, raw: rawPoleWeight(fact, pole),
        }))),
    };
}
/** How much a set of facts brings one feeling forward, or makes one harder to reach. */
export function feelingSupport(facts, kind, feeling) {
    return combine(facts
        .filter((fact) => fact.emotions[kind].includes(feeling))
        .map((fact) => ({
        id: fact.id,
        group: fact.independenceGroup,
        pillar: fact.pillar,
        raw: FACT_WEIGHT[fact.strength] * RELIABILITY_FACTOR[fact.reliability],
    })));
}
