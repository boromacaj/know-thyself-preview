export const TAROT_REVERSAL_MODES = [
    'diminished', 'blocked', 'excessive', 'internalised', 'exposed', 'unchanged',
];
/* ------------------------------------------------------------ mode choice -- */
const OUTWARD = ['expanding', 'disrupting'];
/**
 * THE ONE CURATED EXCEPTION, AND ITS CITATION.
 *
 * Waite on the Four of Wands reversed: "The meaning remains unaltered; it is
 * prosperity, increase, felicity, beauty, embellishment." He says it of no other
 * card. Deriving `unchanged` from structure would be inventing a rule to reach
 * one case; recording the one case he states is cheaper and more honest.
 *
 * A second entry here needs a quotation as direct as that one.
 */
const MODE_OVERRIDES = {
    'wands-four': 'unchanged',
};
/**
 * Which alteration a card's reversal takes, from the card's own structure.
 *
 * An ORDERED list, most specific first, like the arc rules. The order is the
 * design and the content audit reports how the six distribute, so a collapse
 * would be visible rather than quietly shipped.
 */
const MODE_RULES = [
    {
        mode: 'excessive',
        because: 'already at full extent and pushing hard, so reversal overdoes it',
        test: (card) => card.direction === 'culmination' && card.intensity === 'strong',
    },
    {
        mode: 'exposed',
        because: 'the card acts inwardly, so reversal brings it out',
        test: (card) => card.focus === 'internal',
    },
    {
        mode: 'internalised',
        because: 'the card pushes outward, so reversal turns that inward',
        test: (card) => card.focus === 'external' && OUTWARD.includes(card.movement),
    },
    {
        mode: 'blocked',
        because: 'the card is going somewhere, so reversal is it not arriving',
        test: (card) => OUTWARD.includes(card.movement)
            || card.direction === 'beginning' || card.direction === 'transition',
    },
    {
        mode: 'excessive',
        because: 'a strong steady card overdone becomes rigid',
        test: (card) => card.intensity === 'strong' && card.stability === 'stable',
    },
    {
        /* The fallback is `diminished` because it is the pattern Waite states
           explicitly and most often - "the same in a lesser degree" - so an
           unclassified card lands on the best-attested reading rather than on a
           guess. */
        mode: 'diminished',
        because: 'nothing more specific applies; the same thing at lower volume',
        test: () => true,
    },
];
export function reversalModeFor(card) {
    const override = MODE_OVERRIDES[card.id];
    if (override) {
        return {
            mode: override,
            because: 'Waite states the meaning is unaltered reversed',
            via: 'override',
        };
    }
    const index = MODE_RULES.findIndex((candidate) => candidate.test(card));
    const rule = MODE_RULES[index];
    /* The last rule tests true for everything, so `index` is never -1 and the
       branch below is unreachable; it is kept because a future edit to the table
       could make it reachable, and a silent `undefined` mode would be worse than
       a documented default. `assertReversalRulesAreTotal` proves it is dead. */
    if (!rule)
        return { mode: 'diminished', because: 'no rule matched', via: 'default' };
    return {
        mode: rule.mode,
        because: rule.because,
        via: index === MODE_RULES.length - 1 ? 'default' : 'rule',
    };
}
/**
 * The rule table is TOTAL: every card matches some rule.
 *
 * Checked over the whole deck rather than asserted, so the unreachable branch in
 * `reversalModeFor` stays provably unreachable. Called by the tests and the
 * audit; not by production, which does not need to pay for it per draw.
 */
export function assertReversalRulesAreTotal(cards) {
    for (const card of cards) {
        if (!MODE_RULES.some((candidate) => candidate.test(card))) {
            throw new Error(`No reversal rule matches ${card.id}; the rule table is not total.`);
        }
    }
}
/* ------------------------------------------------------------- transforms -- */
const INTENSITY_DOWN = {
    strong: 'moderate', moderate: 'low', low: 'low',
};
const INTENSITY_UP = {
    low: 'moderate', moderate: 'strong', strong: 'strong',
};
/** Expanding reversed is not contracting; it is expanding with less behind it. */
const MOVEMENT_DIMINISHED = {
    expanding: 'stabilising', disrupting: 'redirecting',
};
/** Over-stabilising is rigidity, which is held rather than steady. */
const MOVEMENT_EXCESSIVE = {
    stabilising: 'suspended', resolving: 'suspended',
};
const MOVEMENT_INWARD = {
    expanding: 'contracting', disrupting: 'contracting',
};
const MOVEMENT_OUTWARD = {
    contracting: 'expanding', suspended: 'expanding',
};
/**
 * THE TRANSFORM, PER MODE.
 *
 * Each one changes the dimensions the mode is actually about, and leaves the rest
 * alone. That matters more than it looks: a transform that rewrote every field
 * would erase the card, and a reversed Hermit would stop being a Hermit. What
 * survives is the card; what changes is how its movement is going.
 *
 * `agency` is changed deliberately in four of the six modes, because the
 * narrative plan derives the Guidance invitation from it. A blocked card asks you
 * to wait; an excessive one asks you to moderate. That is how a reversal reaches
 * the reading's closing advice without any voice knowing about reversals.
 */
const TRANSFORMS = {
    /* "The same in a lesser degree." The thing itself is untouched - direction,
       focus and agency all stay - and only its force comes down. That is the most
       literal reading of the one pattern Waite states outright. */
    diminished: (card) => {
        const intensity = INTENSITY_DOWN[card.intensity];
        const movement = MOVEMENT_DIMINISHED[card.movement] ?? card.movement;
        if (intensity !== card.intensity || movement !== card.movement)
            return { intensity, movement };
        /*
         * ALREADY AS QUIET AS THE SCALE GOES.
         *
         * Six cards are low intensity with a movement that has no quieter form, so
         * the obvious transform is a no-op - and a reversal that alters nothing
         * structurally is invisible to the pair classifier and the arc engine, which
         * would leave the reading differing only in the sentence that names it. The
         * lesser degree then shows on the one dimension still free to move: the same
         * thing, less certain to arrive.
         *
         * The Four of Wands is the only card whose reversal is meant to change
         * nothing, and it is 'unchanged', not 'diminished'.
         */
        return { intensity, movement, temporal: 'uncertain' };
    },
    /* "Inertia, sleep, lethargy, petrifaction" (Death reversed); "Inertia, fixity,
       stagnation" (the World reversed). The movement stops without the card
       changing what it is about. */
    blocked: (card) => ({
        direction: 'stasis',
        movement: 'suspended',
        stability: 'suspended',
        temporal: 'uncertain',
        agency: 'wait',
        intensity: card.intensity,
    }),
    /* "Despotism, abuse of power" (Strength reversed); "superfluity" (the Wheel);
       "the side of excess in physical enjoyment" (Three of Cups). Pushed to full
       extent and no longer steady. */
    excessive: (card) => ({
        direction: 'culmination',
        intensity: INTENSITY_UP[card.intensity],
        stability: 'volatile',
        movement: MOVEMENT_EXCESSIVE[card.movement] ?? card.movement,
        agency: 'tend',
    }),
    /* "internal dispute, stingings of conscience" (Eight of Wands reversed). The
       same energy, with nowhere outward to go. */
    internalised: (card) => ({
        focus: 'internal',
        relational: 'solitary',
        movement: MOVEMENT_INWARD[card.movement] ?? card.movement,
        agency: 'observe',
    }),
    /* "Declaration, confession, publicity" (Six of Swords reversed). The inward
       thing is out where it can be seen. */
    exposed: (card) => ({
        focus: 'external',
        relational: 'exposing',
        movement: MOVEMENT_OUTWARD[card.movement] ?? card.movement,
        agency: 'endure',
    }),
    /* "The meaning remains unaltered." Nothing moves. */
    unchanged: () => ({}),
};
/**
 * A card as it should be read in this orientation.
 *
 * Upright returns the model unchanged, with `reversalMode: null` - there is no
 * alteration, so there is nothing to name and nothing to transform.
 *
 * `themes` and `provenance` travel through untouched. A reversal is a different
 * expression of the same card, not a different card, and rewriting its
 * provenance would claim a source for something derived.
 */
export function orientedSemantics(card, orientation) {
    if (orientation === 'upright') {
        return { ...card, orientation: 'upright', reversalMode: null };
    }
    const { mode } = reversalModeFor(card);
    const patch = TRANSFORMS[mode](card);
    return { ...card, ...patch, orientation: 'reversed', reversalMode: mode };
}
/**
 * Whether reversing this card actually changes its structure.
 *
 * False for `unchanged`, and - worth knowing - false for a card whose transform
 * happens to be a no-op on its particular values, such as a diminished card that
 * is already at low intensity with a movement the table does not remap. The audit
 * reports how many cards those are, because a reversal that changes nothing
 * structurally must still be DISCLOSED in the reading rather than silently
 * reading as upright.
 */
export function reversalAltersStructure(card) {
    const reversed = orientedSemantics(card, 'reversed');
    return ['direction', 'agency', 'movement', 'temporal', 'stability', 'focus',
        'relational', 'intensity']
        .some((dimension) => reversed[dimension] !== card[dimension]);
}
