import { INTENSITY_RANK, } from './tarotSemanticTypes.js';
export const TAROT_PAIR_RELATIONS = [
    'interruption', 'stabilisation', 'escalation', 'softening', 'reinforcement',
    'redirection', 'release', 'integration', 'exposure', 'answer', 'contrast', 'continuation',
];
/*
 * Movement families, and the fact that only TWO of them are opposites.
 *
 * Outward and inward genuinely pull against each other. Steadying does not
 * oppose either - a settling card after a pushing one calms it, and after a
 * withdrawing one firms it up. An early version treated every mismatched pair
 * as `contrast` and it swallowed 39% of all relations, which is what a fallback
 * doing the work of a taxonomy looks like. Opposition is now asserted only
 * where there is opposition.
 */
const OUTWARD = ['expanding', 'disrupting'];
const STEADYING = ['stabilising', 'resolving'];
const INWARD = ['contracting', 'suspended'];
const family = (movement) => (OUTWARD.includes(movement) ? 'outward'
    : STEADYING.includes(movement) ? 'steadying'
        : INWARD.includes(movement) ? 'inward' : 'turning');
/** The family a movement belongs to, for readers that compare more cards than one pair. */
export const movementFamily = family;
/** Direction as a rough stage, so "carries it on" can be recognised. */
const STAGE = {
    beginning: 0, development: 1, culmination: 2, integration: 2,
    transition: 1, interruption: 1, release: 2, stasis: 0,
};
const HOLDS_ON = (card) => card.direction === 'stasis' || card.movement === 'contracting'
    || card.relational === 'joining' || card.relational === 'protecting';
const LETS_GO = (card) => card.direction === 'release' || card.agency === 'release';
const IS_DIVIDED = (card) => card.relational === 'competing' || card.relational === 'separating'
    || card.direction === 'interruption';
const BRINGS_TOGETHER = (card) => card.direction === 'integration' || card.agency === 'integrate'
    || (card.relational === 'cooperating' && card.movement !== 'disrupting');
const LEAVES_OPEN = (card) => card.stability === 'suspended' || card.temporal === 'uncertain';
const CLOSES = (card) => card.movement === 'resolving'
    || (card.stability === 'stable' && (card.direction === 'culmination' || card.direction === 'integration'));
function sharedDimensions(a, b) {
    const shared = [];
    if (a.direction === b.direction)
        shared.push('direction');
    if (family(a.movement) === family(b.movement))
        shared.push('movement');
    if (a.focus === b.focus)
        shared.push('focus');
    if (a.relational === b.relational)
        shared.push('stance');
    if (a.stability === b.stability)
        shared.push('stability');
    if (a.agency === b.agency)
        shared.push('agency');
    return shared;
}
function opposingDimensions(a, b) {
    const opposing = [];
    const fa = family(a.movement);
    const fb = family(b.movement);
    if ((fa === 'outward' && fb === 'inward') || (fa === 'inward' && fb === 'outward'))
        opposing.push('movement');
    if (a.focus !== 'mixed' && b.focus !== 'mixed' && a.focus !== b.focus)
        opposing.push('focus');
    if ((a.stability === 'stable' && b.stability === 'volatile')
        || (a.stability === 'volatile' && b.stability === 'stable'))
        opposing.push('stability');
    if ((a.relational === 'joining' && b.relational === 'separating')
        || (a.relational === 'separating' && b.relational === 'joining'))
        opposing.push('stance');
    return opposing;
}
/**
 * How loudly a relation should be read.
 *
 * `defining` where the two cards genuinely act on each other - a break, a
 * settling, an answer - or where both are strong. `quiet` where both are low
 * and nothing much passes between them. This is what stops every pair being
 * reported as significant, and it is never shown as a number.
 */
function salienceOf(relation, a, b) {
    const force = INTENSITY_RANK[a.intensity] + INTENSITY_RANK[b.intensity];
    const ACTING = [
        'interruption', 'stabilisation', 'release', 'integration', 'answer', 'exposure', 'escalation',
    ];
    if (ACTING.includes(relation) && force >= 2)
        return 'defining';
    if (ACTING.includes(relation))
        return 'notable';
    if (force >= 4)
        return 'notable';
    if (force <= 1)
        return 'quiet';
    return 'notable';
}
/*
 * THE SEMANTIC REFINEMENT.
 *
 * The movement families above are coarse on purpose: "outward" holds a card that BUILDS (expanding) and a card that BREAKS
 * (disrupting), and "inward" holds a card that WITHDRAWS and a card that ENDS (contracting, releasing). Compared only by
 * family, The Tower (disrupting) and Death (contracting) are "opposed movement", which says they pull against each other
 * when both are the same kind of event: something coming apart. That is the diagnostic case for this whole section.
 *
 * What a card does to what is there is one of four things, and the refinement reads them:
 *   PUSHES       builds or starts something: expanding, and an agency that acts or initiates
 *   HOLDS        keeps something as it is, or draws in: contracting or suspended, not ending anything
 *   DISSOLVES    ends or breaks what is there: disrupting, or contracting while releasing and transforming
 *   (settles and turns are the families already above)
 * and a CONTRAST is only asserted between a card that pushes and one that holds or dissolves, and only when a second,
 * independent dimension agrees (one acts and the other does not, or one looks out and the other in). Two cards that both
 * dissolve compound each other; a break followed by a pause is a settling; an ending followed by a beginning is a continuation.
 *
 * The refinement is opt-in (`semantic: true`). The daily reading keeps the original rules, because its text is pinned
 * and must not change under it; the question Reader asks for the refined ones.
 */
const DISSOLVES = (card) => card.movement === 'disrupting'
    || (card.movement === 'contracting' && card.agency === 'release' && (card.stability === 'transforming' || card.stability === 'volatile'));
const HOLDS = (card) => !DISSOLVES(card) && (card.movement === 'contracting' || card.movement === 'suspended');
const ACTS = (card) => card.agency === 'initiate' || card.agency === 'act';
const PUSHES = (card) => card.movement === 'expanding' && ACTS(card);
/** The second, independent dimension that has to agree before two cards are said to pull against each other. */
const CORROBORATED = (a, b) => ACTS(a) !== ACTS(b) || (a.focus !== 'mixed' && b.focus !== 'mixed' && a.focus !== b.focus);
const SEMANTIC_CONTRAST = (a, b) => ((PUSHES(a) && (HOLDS(b) || DISSOLVES(b))) || ((HOLDS(a) || DISSOLVES(a)) && PUSHES(b))) && CORROBORATED(a, b);
const ENDS = (card) => DISSOLVES(card) || (card.direction === 'culmination' && card.agency === 'release');
function semanticPair(a, b) {
    const fa = family(a.movement);
    const fb = family(b.movement);
    if (DISSOLVES(a) && DISSOLVES(b)) {
        return INTENSITY_RANK[b.intensity] >= INTENSITY_RANK[a.intensity]
            ? { relation: 'escalation', basis: 'semantic: both break up what is there, and the second not less' }
            : { relation: 'softening', basis: 'semantic: both break up what is there, and the second less' };
    }
    if (a.direction === b.direction && fa === fb)
        return { relation: 'reinforcement', basis: 'semantic: the same stage, moving the same way' };
    if (DISSOLVES(a) && HOLDS(b))
        return { relation: 'stabilisation', basis: 'semantic: a break, then a pause' };
    if ((a.stability === 'volatile' || a.stability === 'transforming') && b.stability === 'stable' && b.movement !== 'disrupting') {
        return { relation: 'stabilisation', basis: 'semantic: a unsteady, b stable and not breaking anything' };
    }
    if (ENDS(a) && b.direction === 'beginning' && !DISSOLVES(b))
        return { relation: 'continuation', basis: 'semantic: a ends, b begins on the cleared ground' };
    if (LEAVES_OPEN(a) && b.stability === 'stable' && b.movement === 'stabilising')
        return { relation: 'answer', basis: 'semantic: a left open, b settles it' };
    return null;
}
/**
 * What B does to A. Ordered rules, first match wins - see the header for why
 * the order is the design rather than an implementation detail.
 */
export function classifyTarotPair(from, to, a, b, options = {}) {
    const fa = family(a.movement);
    const fb = family(b.movement);
    const strongerOrEqual = INTENSITY_RANK[b.intensity] >= INTENSITY_RANK[a.intensity];
    const semantic = options.semantic === true;
    const refined = semantic ? semanticPair(a, b) : null;
    let relation;
    let basis;
    if (refined) {
        relation = refined.relation;
        basis = refined.basis;
    }
    else if (LEAVES_OPEN(a) && CLOSES(b)) {
        relation = 'answer';
        basis = 'a left open, b closes';
    }
    else if (a.stability === 'volatile' && fb === 'steadying') {
        relation = 'stabilisation';
        basis = 'a volatile, b settles';
    }
    else if (a.stability === 'stable' && b.movement === 'disrupting') {
        relation = 'interruption';
        basis = 'a settled, b disrupts';
    }
    else if (HOLDS_ON(a) && LETS_GO(b)) {
        relation = 'release';
        basis = 'a holds on, b lets go';
    }
    else if (IS_DIVIDED(a) && BRINGS_TOGETHER(b)) {
        relation = 'integration';
        basis = 'a divided, b brings together';
    }
    else if (a.focus === 'internal' && b.focus !== 'internal'
        && (b.relational === 'exposing' || b.movement === 'disrupting' || b.direction === 'culmination')) {
        relation = 'exposure';
        basis = 'a inward, b brings it into the open';
    }
    else if (fb === 'turning') {
        relation = 'redirection';
        basis = 'b turns the course';
    }
    else if (semantic ? SEMANTIC_CONTRAST(a, b) : ((fa === 'outward' && fb === 'inward') || (fa === 'inward' && fb === 'outward'))) {
        /* The only genuine opposition. Asserted here and nowhere else. */
        relation = 'contrast';
        basis = 'opposed movement';
    }
    else if (fa === 'outward' && fb === 'steadying') {
        relation = 'softening';
        basis = 'a pushes, b calms it';
    }
    else if (fa === fb && fa === 'outward' && strongerOrEqual
        && INTENSITY_RANK[b.intensity] >= 1) {
        relation = 'escalation';
        basis = 'both push, b not weaker';
    }
    else if (fa === fb && INTENSITY_RANK[b.intensity] < INTENSITY_RANK[a.intensity]) {
        relation = 'softening';
        basis = 'same movement, b quieter';
    }
    else if (fa === fb) {
        relation = 'reinforcement';
        basis = 'same movement family';
    }
    else if (fa === 'inward' && fb === 'steadying') {
        relation = 'reinforcement';
        basis = 'both quiet, b firms it up';
    }
    else if (STAGE[b.direction] > STAGE[a.direction]) {
        relation = 'continuation';
        basis = 'b carries the stage on';
    }
    else {
        /* Neutral by design. Two cards that neither agree nor oppose simply follow
           one another, and saying "contrast" here would assert a conflict the
           spread does not contain. */
        relation = 'continuation';
        basis = 'one follows the other without opposing it';
    }
    return {
        from,
        to,
        relation,
        salience: salienceOf(relation, a, b),
        shared: sharedDimensions(a, b),
        opposing: opposingDimensions(a, b),
        basis,
    };
}
