/** How load-bearing a source is inside its own system, as a number. */
const STRENGTH_SCORE = {
    defining: 1, strong: 0.75, moderate: 0.5, slight: 0.25,
};
const PILLAR_ORDER = ['numerology', 'astrology', 'bazi', 'human-design'];
/** Facts worth naming in one sentence. More than four stops being a sentence. */
const MAX_FACTS_PER_SIDE = 4;
/**
 * EVIDENCE PURITY: the reading may only NAME what the model actually counted.
 *
 * WHAT THIS FIXES. selectFacts takes the heaviest item per pillar, and it took
 * it without asking whether the item counted for anything. On a profile with no
 * birth time, every Human Design row is `methodology: 'suppressed'` with
 * `countedWeight: 0` - the model's way of saying it could not read them - and
 * the per-pillar rule then picked the best of those zeros as "the Human Design
 * fact" and put it in the prose. So the Human Design screen said, correctly,
 * that its mechanics are suppressed because the birth time is estimated, and
 * the portrait beside it cited Self-Projected authority, channel 7-31, Single
 * Definition and Profile 3/5 as evidence. The model never claimed any of it;
 * the sentence did.
 *
 * Measured on the unknown-time QA profile: 31 zero-weight rows, 24 of them
 * Human Design, five of which reached the prose.
 *
 * DELIBERATELY NARROW. This removes exactly two things - evidence the engines
 * marked `suppressed`, and evidence whose counted weight is exactly zero - and
 * nothing else. It is not a ranking change and not a threshold: a genuinely
 * light result still counts, still ranks, and can still be named. A theme that
 * loses every fact this way keeps its weight and its place; it simply stops
 * naming a source it was never entitled to name.
 *
 * It is also not the reverted mapping audit, which removed AUTHORED TAGS from
 * the evidence set before weighing and changed which themes appeared. Nothing
 * here touches the model: the evidence, the weights and the themes are exactly
 * what they were, and only the citation step is filtered.
 */
const narratable = (items) => items.filter((item) => item.evidence.methodology !== 'suppressed' && item.countedWeight > 0);
/**
 * Choose which results to name.
 *
 * One per pillar first, heaviest within each; then the heaviest of what is
 * left. Deduplicated by source entity, so `Sun in Virgo` is named once however
 * many of a theme's dimensions it speaks to.
 */
function selectFacts(items) {
    const byEntity = new Map();
    for (const item of narratable(items)) {
        const key = `${item.evidence.pillar}:${item.evidence.sourceEntity}`;
        const existing = byEntity.get(key);
        if (!existing || item.countedWeight > existing.countedWeight)
            byEntity.set(key, item);
    }
    const unique = [...byEntity.values()].sort((a, b) => (b.countedWeight - a.countedWeight
        || a.evidence.id.localeCompare(b.evidence.id)));
    const chosen = [];
    for (const pillar of PILLAR_ORDER) {
        const best = unique.find((item) => item.evidence.pillar === pillar);
        if (best)
            chosen.push(best);
    }
    chosen.sort((a, b) => b.countedWeight - a.countedWeight);
    for (const item of unique) {
        if (chosen.length >= MAX_FACTS_PER_SIDE)
            break;
        if (!chosen.includes(item))
            chosen.push(item);
    }
    return chosen.slice(0, MAX_FACTS_PER_SIDE).map((item) => item.evidence);
}
const pillarsOf = (items) => PILLAR_ORDER.filter((pillar) => items.some((item) => item.pillar === pillar));
/** The mean source authority of the results a side names, in [0.25, 1]. */
const authorityOf = (facts) => (facts.length === 0 ? 0
    : facts.reduce((total, fact) => total + (STRENGTH_SCORE[fact.strength] ?? 0.5), 0) / facts.length);
function sideFrom(dimension, items, weight, distinctPillars) {
    const facts = selectFacts(items);
    return { dimension, facts, pillars: pillarsOf(facts), weight, distinctPillars };
}
/**
 * The theme's leading dimension - the one its heaviest evidence sits on.
 *
 * A theme clusters two or three dimensions and its label already names the
 * cluster; this is for the sentence that has to say what the results agree
 * ABOUT, which needs one dimension rather than a cluster name.
 */
function leadingDimension(theme) {
    const weightByDimension = new Map();
    for (const item of theme.supportingEvidence) {
        const dimension = item.evidence.dimension;
        weightByDimension.set(dimension, (weightByDimension.get(dimension) ?? 0) + item.countedWeight);
    }
    let leader = theme.dimensions[0];
    let best = -1;
    for (const [dimension, weight] of weightByDimension) {
        if (weight > best) {
            best = weight;
            leader = dimension;
        }
    }
    return leader;
}
/**
 * WHAT MAKES A FINDING WORTH LEADING WITH.
 *
 * Four things the model already knows, weighted and documented so the ranking
 * can be argued with rather than tuned by feel:
 *
 *   authority   how central the named results are inside their own systems. A
 *               Life Path and a Sun sign carry a reading; an Attitude number
 *               and a slight aspect do not.
 *   spread      how many of the four independent systems carry it. Four systems
 *               arriving separately at one description is the single most
 *               interesting thing this app can report.
 *   sharpness   convergence: how little of the chart argues the other way.
 *               tension: how close to evenly matched the two sides are, which
 *               is what separates a real pull from a lopsided preference.
 *   kind        a true tension outranks a convergence at equal everything else.
 *               A profile that contradicts itself in a well-supported way is
 *               more specific than one that agrees with itself.
 */
function distinctivenessOf(input) {
    const spread = input.distinctPillars / 4;
    const base = (0.35 * input.authority) + (0.30 * spread) + (0.25 * input.sharpness);
    const kindBonus = input.isTension ? (input.bothCorroborated ? 0.10 : 0.04) : 0;
    return Number((base + kindBonus).toFixed(4));
}
/** Every convergence worth naming, most distinctive first. */
export function convergenceInteractions(source) {
    const reportable = source.themes.filter((theme) => (theme.distinctPillars >= 2
        && theme.counterWeight <= theme.supportWeight
        && (theme.support === 'strong' || theme.support === 'moderate' || theme.support === 'weak')));
    return reportable.map((theme) => {
        const side = sideFrom(leadingDimension(theme), theme.supportingEvidence, theme.supportWeight, theme.distinctPillars);
        /* How little of the chart argues the other way, in [0, 1]. */
        const sharpness = theme.supportWeight <= 0 ? 0
            : Math.max(0, 1 - (theme.counterWeight / theme.supportWeight));
        return {
            id: `theme-${theme.id}`,
            kind: 'convergence',
            label: theme.label,
            sides: [side],
            themeId: theme.id,
            support: theme.support,
            treatCautiously: theme.treatCautiously,
            distinctiveness: distinctivenessOf({
                authority: authorityOf(side.facts),
                distinctPillars: theme.distinctPillars,
                sharpness,
                isTension: false,
                bothCorroborated: false,
            }),
        };
    }).sort((a, b) => b.distinctiveness - a.distinctiveness || a.id.localeCompare(b.id));
}
/** Every tension worth naming, most distinctive first. Heavier side leads. */
export function tensionInteractions(source) {
    const reportable = source.tensions.filter((tension) => tension.kind !== 'weak-conflict');
    return reportable.map((tension) => {
        const [heavier, lighter] = tension.poleA.weight >= tension.poleB.weight
            ? [tension.poleA, tension.poleB] : [tension.poleB, tension.poleA];
        /* A result can genuinely argue both ways - a Day Master that is weak in
           season speaks to structure AND to adaptability - and the weighting counts
           it on both poles, correctly. Naming it on both sides of a split reads as
           a bug rather than as nuance, so the lighter side names only what the
           heavier side did not, unless that would leave it with nothing to name. */
        const heavierSide = sideFrom(heavier.dimension, heavier.evidence, heavier.weight, heavier.distinctPillars);
        const named = new Set(heavierSide.facts.map((fact) => `${fact.pillar}:${fact.sourceEntity}`));
        const lighterOnly = lighter.evidence.filter((item) => !named.has(`${item.evidence.pillar}:${item.evidence.sourceEntity}`));
        const lighterSide = sideFrom(lighter.dimension, lighterOnly.length > 0 ? lighterOnly : lighter.evidence, lighter.weight, lighter.distinctPillars);
        const sides = [heavierSide, lighterSide];
        const bothCorroborated = heavier.distinctPillars >= 2 && lighter.distinctPillars >= 2;
        const authority = (authorityOf(sides[0].facts) + authorityOf(sides[1].facts)) / 2;
        return {
            id: `tension-${tension.axis}`,
            kind: 'tension',
            label: tension.label,
            sides,
            axis: tension.axis,
            tensionKind: tension.kind,
            /* An even split by COUNT is what a reader sees; the model's dominantPole
               is by weight, and the two disagree often enough to matter. */
            evenlySplit: heavier.distinctPillars === lighter.distinctPillars,
            bothCorroborated,
            treatCautiously: false,
            distinctiveness: distinctivenessOf({
                authority,
                /* A tension is only as corroborated as its WEAKER side. Taking the
                   larger count would rank "four systems against one" alongside "three
                   against three", and the first is one tradition dissenting while the
                   second is a profile genuinely pulled both ways. */
                distinctPillars: Math.min(heavier.distinctPillars, lighter.distinctPillars),
                /* Balance IS the sharpness of a tension: 1.0 is a dead heat. */
                sharpness: tension.balance,
                isTension: true,
                bothCorroborated,
            }),
        };
    }).sort((a, b) => b.distinctiveness - a.distinctiveness || a.id.localeCompare(b.id));
}
/**
 * The finding the portrait opens on.
 *
 * The most distinctive of everything available, whether that is a tension or a
 * convergence - the scoring already prefers a well-supported tension, because
 * a profile that pulls against itself in a corroborated way says more about one
 * person than a profile that agrees with itself.
 */
export function leadInteraction(source) {
    const all = [...tensionInteractions(source), ...convergenceInteractions(source)]
        .sort((a, b) => b.distinctiveness - a.distinctiveness || a.id.localeCompare(b.id));
    return all[0] ?? null;
}
