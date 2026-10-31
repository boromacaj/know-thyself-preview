import { axisForDimension, opposingDimension, } from '../../semantics/semanticTaxonomy.js?v=d9f39e7';
import { distinctPillarsOf } from './evidenceIndependence.js?v=d9f39e7';
import { roundWeight } from './weighting.js?v=d9f39e7';
export const THEME_DEFINITIONS = [
    /* ------------------------------------------------ how a person operates -- */
    {
        id: 'deep-internal-processing',
        label: 'Deep internal processing',
        facet: 'style',
        dimensions: ['introspective', 'analytical', 'private'],
        domains: ['inner-world', 'decision-making', 'core-identity'],
    },
    {
        id: 'independent-direction',
        label: 'Independent direction',
        facet: 'style',
        dimensions: ['independent', 'assertive'],
        domains: ['core-identity', 'work-career', 'social-style'],
    },
    {
        id: 'relational-orientation',
        label: 'Relational orientation',
        facet: 'style',
        dimensions: ['collaborative', 'receptive'],
        domains: ['relationships', 'social-style', 'work-career'],
    },
    {
        id: 'structured-method',
        label: 'Structured method',
        facet: 'style',
        dimensions: ['structured', 'practical', 'persistent'],
        domains: ['work-career', 'money-material', 'decision-making'],
    },
    {
        id: 'flexible-improvisation',
        label: 'Flexible improvisation',
        facet: 'style',
        dimensions: ['adaptable', 'novelty-seeking'],
        domains: ['growth', 'energy-pace', 'work-career'],
    },
    {
        id: 'emotional-permeability',
        label: 'Emotional permeability',
        facet: 'style',
        /* emotionally-expressive belongs here rather than under outward-expression,
           which is about language. Without it this dimension fed no theme at all and
           its evidence vanished silently at the clustering stage - the exact failure
           the closed taxonomy's header warns about. A test now catches a recurrence. */
        dimensions: ['emotionally-sensitive', 'intuitive', 'emotionally-expressive'],
        domains: ['inner-world', 'relationships', 'stress-shadow'],
    },
    {
        id: 'emotional-containment',
        label: 'Emotional containment',
        facet: 'style',
        dimensions: ['emotionally-contained'],
        domains: ['inner-world', 'stress-shadow', 'relationships'],
    },
    {
        id: 'outward-expression',
        label: 'Outward expression',
        facet: 'style',
        dimensions: ['communicative', 'outwardly-engaged'],
        domains: ['communication', 'social-style'],
    },
    {
        id: 'risk-appetite',
        label: 'Appetite for risk',
        facet: 'style',
        dimensions: ['risk-oriented'],
        domains: ['money-material', 'work-career', 'growth'],
    },
    {
        id: 'careful-consolidation',
        label: 'Careful consolidation',
        facet: 'style',
        dimensions: ['cautious', 'stability-seeking'],
        domains: ['money-material', 'stress-shadow', 'decision-making'],
    },
    {
        id: 'conceptual-abstraction',
        label: 'Conceptual abstraction',
        facet: 'style',
        dimensions: ['conceptual'],
        domains: ['inner-world', 'creativity', 'communication'],
    },
    {
        id: 'steady-endurance',
        label: 'Steady endurance',
        facet: 'style',
        dimensions: ['persistent'],
        domains: ['energy-pace', 'work-career'],
    },
    {
        id: 'social-visibility',
        label: 'Social visibility',
        facet: 'style',
        dimensions: ['social'],
        domains: ['social-style', 'relationships', 'communication'],
    },
    /* ----------------------------------------- what a person appears to be for -- */
    /*
     * `creative` sits here rather than among the operating styles, and the theme
     * keeps its id so the authored commentary and every test that names it still
     * find it. Making something that was not there is not a method a person
     * applies to a task - it is a thing they are drawn to do - and pairing it with
     * `self-expression` stops the model reporting two near-identical themes for
     * one appetite.
     */
    {
        id: 'creative-generation',
        label: 'Making and expressing',
        facet: 'drive',
        dimensions: ['creative', 'self-expression'],
        domains: ['creativity', 'work-career', 'communication'],
    },
    {
        id: 'mastery-and-depth',
        label: 'Mastery and depth',
        facet: 'drive',
        dimensions: ['mastery'],
        domains: ['work-career', 'growth'],
    },
    {
        id: 'results-and-ambition',
        label: 'Results and ambition',
        facet: 'drive',
        dimensions: ['achievement'],
        domains: ['work-career', 'money-material'],
    },
    {
        id: 'being-recognised',
        label: 'Being seen for it',
        facet: 'drive',
        dimensions: ['recognition'],
        domains: ['social-style', 'work-career'],
    },
    {
        id: 'meaning-and-purpose',
        label: 'Meaning and purpose',
        facet: 'drive',
        dimensions: ['meaning'],
        domains: ['inner-world', 'growth'],
    },
    {
        id: 'closeness-and-belonging',
        label: 'Closeness and belonging',
        facet: 'drive',
        dimensions: ['belonging'],
        domains: ['relationships', 'social-style'],
    },
    {
        id: 'room-to-move',
        label: 'Room to move',
        facet: 'drive',
        dimensions: ['freedom'],
        domains: ['work-career', 'growth', 'energy-pace'],
    },
    {
        id: 'looking-after',
        label: 'Looking after things',
        facet: 'drive',
        dimensions: ['care'],
        domains: ['relationships', 'inner-world'],
    },
    {
        id: 'wanting-to-understand',
        label: 'Wanting to understand',
        facet: 'drive',
        dimensions: ['understanding'],
        domains: ['inner-world', 'growth', 'communication'],
    },
    {
        id: 'form-and-craft',
        label: 'Form and craft',
        facet: 'drive',
        dimensions: ['beauty'],
        domains: ['creativity', 'inner-world'],
    },
];
/* ------------------------------------------------------------- thresholds -- */
/** Below this a theme is noise and never reaches the output as a finding. */
export const THEME_REPORTING_FLOOR = 0.5;
/** Weight needed before `moderate` is even considered. */
export const MODERATE_WEIGHT = 1.2;
/** Weight needed before `strong` is even considered. */
export const STRONG_WEIGHT = 2.5;
/**
 * Distinct pillars required for `strong`. THREE, not two.
 *
 * This is the anti-Barnum lever. Two systems agreeing is common and often
 * shallow; three separate traditions landing on the same theme is the point at
 * which the project is willing to call something a strong pattern - and even
 * then only as convergence between symbol systems, never as a fact about the
 * person.
 */
export const STRONG_PILLAR_REQUIREMENT = 3;
export const MODERATE_PILLAR_REQUIREMENT = 2;
/** Counter-weight above this share of support marks the theme as contested. */
export const CONTESTED_COUNTER_RATIO = 0.5;
/**
 * THE SALIENCE FLOOR - what it takes to be worth a reader's attention.
 *
 * Salience, unlike the support ladder, does not ask how many systems agree
 * before it asks anything else. The floor is therefore the only thing standing
 * between a rich taxonomy and a portrait where everybody is creative, deep,
 * driven and sensitive, so it is set where a theme has to be carried by
 * something real: a defining source, or several lighter ones, in at least one
 * tradition. Measured across the QA matrix it admits eight to fourteen themes
 * per profile out of twenty-three, and it leaves most profiles without most
 * drives - which is the honest result.
 */
export const SALIENCE_FLOOR = 0.6;
/* How much each extra agreeing tradition is worth. Sub-linear on purpose: a
   second system is a real corroboration, a fourth is worth less than the first
   one was, and none of them should be able to outrank a theme that is simply
   central to a chart. */
const PILLAR_STEP = 0.25;
/* How much a defining or strong source inside one tradition is worth. This is
   the "strong pillar theme" lever: a Life Path, a Day Master or a Type carrying
   a theme alone is a different finding from four slight sources doing it. */
const DEPTH_BY_STRENGTH = {
    defining: 0.25,
    strong: 0.125,
    moderate: 0,
    slight: 0,
};
/* The most a theme can be discounted for being argued against. Not 1: a
   contested theme is still a finding, and the tension model is where the
   argument gets read properly. */
const MAX_COUNTER_PENALTY = 0.6;
const ALL_PILLARS = ['numerology', 'astrology', 'bazi', 'human-design'];
/**
 * Build every theme from the weighted evidence.
 *
 * Suppressed evidence (weight 0) is kept in supportingEvidence for provenance but
 * cannot make a pillar count: a pillar that contributed nothing usable is not a
 * supporting pillar, and letting it count would let a no-birth-time profile
 * reach `strong` on evidence that was explicitly refused.
 */
export function clusterThemes(evidence) {
    const byDimension = new Map();
    for (const item of evidence) {
        const bucket = byDimension.get(item.evidence.dimension);
        if (bucket)
            bucket.push(item);
        else
            byDimension.set(item.evidence.dimension, [item]);
    }
    /* A pillar that put no usable weight into the whole set said nothing anywhere,
       which is a different state from saying nothing about one theme. */
    const available = new Set(evidence.filter((item) => item.countedWeight > 0).map((item) => item.evidence.pillar));
    return THEME_DEFINITIONS.map((definition) => {
        const supporting = definition.dimensions.flatMap((d) => byDimension.get(d) ?? []);
        /* Counter-evidence is whatever argues the opposite pole of any axis this
           theme stands on. Attaching it to the theme means a narrative composer
           physically cannot present the theme without seeing what contradicts it.
    
           A unipolar dimension - every drive, and four of the styles - has no
           opposite, so it collects no counter-evidence and none can be invented for
           it. Silence about a drive is silence, never opposition. */
        const counterDimensions = new Set();
        const themeAxes = new Set();
        for (const dimension of definition.dimensions) {
            const opposite = opposingDimension(dimension);
            if (opposite)
                counterDimensions.add(opposite);
            const axis = axisForDimension(dimension);
            if (axis)
                themeAxes.add(axis.id);
        }
        const counter = [...counterDimensions].flatMap((d) => byDimension.get(d) ?? []);
        const supportWeight = roundWeight(sum(supporting));
        const counterWeight = roundWeight(sum(counter));
        /* Only evidence that actually carried weight can nominate its pillar. */
        const effective = supporting.filter((item) => item.countedWeight > 0);
        const contributingPillars = distinctPillarsOf(effective);
        const distinctPillars = contributingPillars.length;
        const contestedByCounter = supportWeight > 0
            && counterWeight / supportWeight > CONTESTED_COUNTER_RATIO;
        const support = classifySupport(supportWeight, distinctPillars, supportWeight, counterWeight);
        const timeSensitive = effective.some((item) => item.evidence.methodology === 'time-sensitive');
        const unresolvedTensions = contestedByCounter ? [...themeAxes].sort() : [];
        const peakStrength = peakStrengthOf(effective);
        return {
            id: definition.id,
            label: definition.label,
            facet: definition.facet,
            dimensions: definition.dimensions,
            supportingEvidence: sortEvidence(supporting),
            counterEvidence: sortEvidence(counter),
            supportWeight,
            counterWeight,
            distinctPillars,
            contributingPillars,
            support,
            kind: themeKind(distinctPillars),
            salience: salienceOf({
                supportWeight,
                counterWeight,
                distinctPillars,
                peakStrength,
                dimensions: definition.dimensions.length,
            }),
            peakStrength,
            stances: stancesFor(effective, counter, available),
            treatCautiously: distinctPillars <= 1 || timeSensitive || contestedByCounter,
            unresolvedTensions,
        };
    });
}
/**
 * HOW MANY TRADITIONS, SAID AS A KIND RATHER THAN AS A RANK.
 *
 * The old model had one ladder, and being carried by a single system sat below
 * `weak` on it - so a theme central to one tradition ranked beneath a thin theme
 * four traditions mentioned in passing. That is the lowest-common-denominator
 * portrait the rebuild exists to end. The count is still reported, as a KIND: it
 * describes what sort of finding this is, and salience decides what it is worth.
 */
function themeKind(distinctPillars) {
    if (distinctPillars >= STRONG_PILLAR_REQUIREMENT)
        return 'convergent';
    if (distinctPillars === MODERATE_PILLAR_REQUIREMENT)
        return 'reinforced';
    return 'pillar-signature';
}
const STRENGTH_ORDER = ['defining', 'strong', 'moderate', 'slight'];
function peakStrengthOf(items) {
    let best = null;
    for (const item of items) {
        const strength = item.evidence.strength;
        if (!best || STRENGTH_ORDER.indexOf(strength) < STRENGTH_ORDER.indexOf(best))
            best = strength;
    }
    return best;
}
/**
 * HOW MUCH THIS THEME IS WORTH, IN ONE INSPECTABLE NUMBER.
 *
 *   concentration  the weight behind it, divided by the spread of dimensions it
 *                  covers. Without this a three-dimension theme beats a
 *                  one-dimension theme on arithmetic alone, and the wide themes
 *                  would win every profile forever.
 *   pillars        sub-linear credit for independent agreement.
 *   depth          credit for being carried by a source its own tradition treats
 *                  as central, which is what "strong in one system" means.
 *   counter        a discount for evidence arguing the other way, capped, since
 *                  a contested theme is still a finding.
 *
 * Every factor is reported on the theme, so any ranking can be reproduced by
 * hand from the numbers the model already publishes.
 */
export function salienceOf(input) {
    if (input.supportWeight <= 0)
        return 0;
    const concentration = input.supportWeight / Math.sqrt(Math.max(1, input.dimensions));
    const pillars = 1 + PILLAR_STEP * Math.max(0, input.distinctPillars - 1);
    const depth = 1 + (input.peakStrength ? DEPTH_BY_STRENGTH[input.peakStrength] : 0);
    const counter = 1 - Math.min(MAX_COUNTER_PENALTY, MAX_COUNTER_PENALTY * (input.counterWeight / input.supportWeight));
    return roundWeight(concentration * pillars * depth * counter);
}
/**
 * WHERE EACH TRADITION STANDS ON THIS THEME - INCLUDING SAYING NOTHING.
 *
 * Four states, and the difference between the last two is the one that was
 * missing. A system with no symbol bearing on creativity has not voted against
 * creativity; a system whose evidence was refused for want of a birth time has
 * not voted at all. Treating either as opposition is how a theme supported by
 * two traditions and untouched by two gets read as a 2-2 split.
 */
function stancesFor(supporting, counter, available) {
    return ALL_PILLARS.map((pillar) => {
        const forWeight = roundWeight(sum(supporting.filter((item) => item.evidence.pillar === pillar)));
        const againstWeight = roundWeight(sum(counter.filter((item) => item.evidence.pillar === pillar && item.countedWeight > 0)));
        if (!available.has(pillar)) {
            return { pillar, stance: 'unavailable', supportWeight: 0, counterWeight: 0 };
        }
        const stance = forWeight > 0 && againstWeight > 0 ? 'both'
            : forWeight > 0 ? 'supports'
                : againstWeight > 0 ? 'opposes'
                    : 'silent';
        return { pillar, stance, supportWeight: forWeight, counterWeight: againstWeight };
    });
}
/**
 * Classify a theme's support, then let the counter-evidence pull it back down.
 *
 * THE CEILING IS THE POINT.
 *
 * Support weight alone answers "how much argues FOR this?", and on a rich
 * profile the answer is usually "quite a lot" for most themes - the four systems
 * between them say something about nearly everything. Left there, almost every
 * theme reaches `strong` and the label stops carrying information, which is the
 * Barnum failure arriving through the back door rather than through the prose.
 *
 * So the counter-weight sets a ceiling:
 *
 *   counter >= support            the profile argues against this at least as
 *                                 hard as for it. It is at most `weak`, and the
 *                                 tension model is where it should be read.
 *   counter > half of support     genuinely contested. At most `moderate`.
 *
 * This ladder is still computed and still reported, because it answers a real
 * question - how much cross-system agreement is there? - and Technical details
 * shows it. What it no longer does is decide the order of the reading.
 */
function classifySupport(weight, pillars, supportWeight, counterWeight) {
    if (weight < THEME_REPORTING_FLOOR)
        return 'insufficient';
    /* One system saying something is reportable, but it is never a cross-pillar
       pattern no matter how heavy that one system's evidence is. */
    if (pillars <= 1)
        return 'single-system';
    const base = pillars >= STRONG_PILLAR_REQUIREMENT && weight >= STRONG_WEIGHT ? 'strong'
        : pillars >= MODERATE_PILLAR_REQUIREMENT && weight >= MODERATE_WEIGHT ? 'moderate'
            : 'weak';
    if (supportWeight <= 0)
        return base;
    const ratio = counterWeight / supportWeight;
    if (ratio >= 1)
        return 'weak';
    if (ratio > CONTESTED_COUNTER_RATIO && base === 'strong')
        return 'moderate';
    return base;
}
function sum(items) {
    return items.reduce((total, item) => total + item.countedWeight, 0);
}
/** Heaviest first, id as tie-break, so output ordering is fully deterministic. */
function sortEvidence(items) {
    return [...items].sort((a, b) => (b.countedWeight - a.countedWeight || a.evidence.id.localeCompare(b.evidence.id)));
}
