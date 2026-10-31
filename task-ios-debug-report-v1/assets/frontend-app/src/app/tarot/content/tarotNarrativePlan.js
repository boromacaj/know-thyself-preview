import { getTarotSemantics, TAROT_CONTENT_VERSION } from './tarotSemantics.js?v=b5ef5ed';
import { classifyTarotPair, } from './tarotRelations.js?v=b5ef5ed';
import { orientedSemantics } from './tarotOrientation.js?v=b5ef5ed';
import { INTENSITY_RANK } from './tarotSemanticTypes.js?v=b5ef5ed';
export const TAROT_ENERGY_ROLES = [
    'sets-something-beginning', 'sustains-an-effort', 'holds-still', 'stands-at-full-extent',
    'is-mid-transition', 'is-being-broken-into', 'is-letting-go', 'is-coming-together',
];
export const TAROT_FACTOR_ROLES = [
    'reinforces', 'amplifies', 'softens', 'interrupts', 'redirects', 'steadies', 'exposes',
    'answers', 'pulls-against', 'carries-on', 'loosens',
];
export const TAROT_GUIDANCE_ROLES = [
    'continue', 'redirect', 'let-go', 'moderate', 'meet-it', 'wait', 'choose', 'integrate',
    'attend-to-it',
];
export const TAROT_STRUCTURAL_MODIFIERS = [
    'major-heavy', 'all-major', 'no-major', 'one-suit', 'suit-weighted', 'court-heavy',
    'ace-present', 'all-court',
];
export const TAROT_ARC_TYPES = [
    'continuation', 'escalation', 'interruption', 'breakdown-to-recovery',
    'expansion-to-limit', 'stasis-to-movement', 'conflict-to-integration',
    'opening-to-choice', 'holding-to-release', 'uncertainty-to-clarity',
    'stability-to-disruption', 'redirection',
];
export const TAROT_JUMPER_RELATIONS = [
    'reinforces', 'complicates', 'exposes', 'redirects', 'settles', 'accompanies',
];
export const ENERGY_ROLE = {
    beginning: 'sets-something-beginning',
    development: 'sustains-an-effort',
    stasis: 'holds-still',
    culmination: 'stands-at-full-extent',
    transition: 'is-mid-transition',
    interruption: 'is-being-broken-into',
    release: 'is-letting-go',
    integration: 'is-coming-together',
};
export const FACTOR_ROLE = {
    reinforcement: 'reinforces',
    escalation: 'amplifies',
    softening: 'softens',
    interruption: 'interrupts',
    redirection: 'redirects',
    stabilisation: 'steadies',
    exposure: 'exposes',
    answer: 'answers',
    contrast: 'pulls-against',
    continuation: 'carries-on',
    release: 'loosens',
    integration: 'reinforces',
};
export const GUIDANCE_ROLE = {
    initiate: 'continue',
    act: 'continue',
    respond: 'attend-to-it',
    wait: 'wait',
    choose: 'choose',
    endure: 'meet-it',
    observe: 'attend-to-it',
    release: 'let-go',
    integrate: 'integrate',
    tend: 'moderate',
};
const SALIENCE_RANK = {
    defining: 2, notable: 1, quiet: 0,
};
/**
 * WHICH RELATIONSHIP THE READING IS BUILT AROUND.
 *
 * Energy->Factor is preferred when it carries real weight, because that is the
 * pair a reader meets first and the one the spread's opening depends on. The
 * outer pair wins only when it is genuinely louder - which happens when the
 * first and last card answer each other across a middle that does little.
 * Ties break toward the adjacent pair, so the choice is deterministic.
 */
function selectPrimaryPair(pairs) {
    const ordered = [...pairs].sort((left, right) => {
        const bySalience = SALIENCE_RANK[right.salience] - SALIENCE_RANK[left.salience];
        if (bySalience !== 0)
            return bySalience;
        /* Adjacent before outer: energy-factor, factor-guidance, then energy-guidance. */
        const rank = (pair) => (pair.from === 'energy' && pair.to === 'factor' ? 0
            : pair.from === 'factor' ? 1 : 2);
        return rank(left) - rank(right);
    });
    return ordered[0];
}
export const ARC_RULES = [
    {
        arc: 'breakdown-to-recovery',
        basis: 'something gives way early and the last card settles it',
        test: (e, f, g, ef, fg) => (e.movement === 'disrupting' || f.movement === 'disrupting' || ef.relation === 'interruption')
            && (fg.relation === 'stabilisation' || g.movement === 'stabilising' || g.movement === 'resolving'),
    },
    {
        arc: 'conflict-to-integration',
        basis: 'division early, and the last card brings it together',
        test: (e, f, g) => (e.relational === 'competing' || e.relational === 'separating'
            || f.relational === 'competing' || f.relational === 'separating')
            && (g.direction === 'integration' || g.agency === 'integrate'),
    },
    {
        arc: 'uncertainty-to-clarity',
        basis: 'the spread opens unsettled and closes settled',
        test: (e, f, g) => (e.stability === 'suspended' || e.temporal === 'uncertain')
            && g.stability === 'stable' && g.movement !== 'disrupting',
    },
    {
        arc: 'holding-to-release',
        basis: 'something held at the start is let go at the end',
        test: (e, f, g) => (e.direction === 'stasis' || e.movement === 'contracting' || e.relational === 'joining')
            && (g.direction === 'release' || g.agency === 'release'),
    },
    {
        arc: 'stasis-to-movement',
        basis: 'a still start and a moving close',
        test: (e, f, g) => (e.direction === 'stasis' || e.movement === 'suspended')
            && (g.movement === 'expanding' || g.agency === 'act' || g.agency === 'initiate'),
    },
    {
        arc: 'stability-to-disruption',
        basis: 'a settled start and a disrupting close',
        test: (e, f, g) => e.stability === 'stable' && g.movement === 'disrupting',
    },
    {
        arc: 'expansion-to-limit',
        basis: 'it opens out and then meets an edge',
        test: (e, f, g) => (e.movement === 'expanding' || f.movement === 'expanding')
            && (g.movement === 'contracting' || (g.direction === 'culmination' && g.intensity === 'strong')),
    },
    {
        arc: 'opening-to-choice',
        basis: 'the spread ends on a decision',
        test: (e, f, g) => g.agency === 'choose',
    },
    {
        arc: 'interruption',
        basis: 'the middle card breaks into the first and nothing settles it',
        test: (e, f, g, ef) => ef.relation === 'interruption',
    },
    /* Two ways in, and they are not the same finding, so they do not share a
       basis line. The review set and the audit read arcBasis, and a basis that
       claimed a rising ladder where only one step escalated would send a human
       reviewer looking for something that is not there. */
    {
        arc: 'escalation',
        basis: 'intensity rises from the first card to the last',
        test: (e, f, g) => INTENSITY_RANK[g.intensity] > INTENSITY_RANK[e.intensity]
            && INTENSITY_RANK[f.intensity] >= INTENSITY_RANK[e.intensity],
    },
    {
        arc: 'escalation',
        basis: 'one step of the spread escalates into the next',
        test: (e, f, g, ef, fg) => ef.relation === 'escalation' || fg.relation === 'escalation',
    },
    {
        arc: 'redirection',
        basis: 'the course turns partway through',
        test: (e, f, g, ef, fg) => ef.relation === 'redirection' || fg.relation === 'redirection',
    },
    {
        arc: 'continuation',
        basis: 'the three carry one line forward',
        test: () => true,
    },
];
function modifiersFor(cards, ids) {
    const modifiers = [];
    const majors = ids.filter((id) => id.startsWith('major-')).length;
    if (majors === 3)
        modifiers.push('all-major');
    else if (majors === 2)
        modifiers.push('major-heavy');
    else if (majors === 0)
        modifiers.push('no-major');
    const suits = ids
        .filter((id) => !id.startsWith('major-'))
        .map((id) => id.split('-')[0]);
    const counts = new Map();
    for (const suit of suits)
        counts.set(suit, (counts.get(suit) ?? 0) + 1);
    const top = [...counts.values()].sort((a, b) => b - a)[0] ?? 0;
    if (top === 3)
        modifiers.push('one-suit');
    else if (top === 2)
        modifiers.push('suit-weighted');
    const COURT = ['page', 'knight', 'queen', 'king'];
    const courts = ids.filter((id) => COURT.includes(id.split('-')[1] ?? '')).length;
    if (courts === 3)
        modifiers.push('all-court');
    else if (courts === 2)
        modifiers.push('court-heavy');
    if (ids.some((id) => id.endsWith('-ace')))
        modifiers.push('ace-present');
    return modifiers;
}
/** The plan, or null when a card in the spread has no model at this content version. */
/**
 * Reduce the jumper's two relations to the one word the reading will use.
 *
 * Ordered, most specific first, like every other classifier here. Opposition and
 * exposure outrank agreement because they are the more informative findings - a
 * jumper that complicates the spread is worth a sentence, one that agrees with it
 * is nearly implied by its being there.
 */
function jumperRelationFor(toEnergy, toGuidance) {
    const both = [toEnergy.relation, toGuidance.relation];
    if (both.includes('exposure')) {
        return { relation: 'exposes', basis: 'the jumper brings an inward part of the spread out' };
    }
    if (both.includes('interruption') || both.includes('contrast')) {
        return { relation: 'complicates', basis: 'the jumper acts against the spread' };
    }
    if (both.includes('redirection')) {
        return { relation: 'redirects', basis: 'the jumper turns the line the spread was on' };
    }
    if (both.includes('stabilisation') || both.includes('answer')
        || both.includes('integration') || both.includes('release')) {
        return { relation: 'settles', basis: 'the jumper closes or loosens something the spread held' };
    }
    if (both.includes('escalation') || both.includes('softening')) {
        return { relation: 'reinforces', basis: 'the jumper pushes the same way, louder or quieter' };
    }
    /* reinforcement and continuation reach here, and that is the point: both are
       defined as moving WITH the spread without acting on it. */
    return { relation: 'accompanies', basis: 'the jumper moves alongside without acting on the spread' };
}
export function planTarotNarrative(spread, jumper) {
    const byPosition = new Map(spread.cards.map((card) => [card.position, card]));
    const order = ['energy', 'factor', 'guidance'];
    const drawn = order.map((position) => byPosition.get(position));
    if (drawn.some((card) => card === undefined))
        return null;
    const ids = drawn.map((card) => card.cardId);
    /*
     * ORIENT FIRST, THEN DO EVERYTHING ELSE.
     *
     * Each card is transformed for the orientation it was drawn in before any
     * relation, arc or role is computed. The alternative - carrying orientation
     * alongside and checking for it in each rule - would mean every rule in this
     * file growing an upright/reversed branch, and the four orientation
     * combinations across 6,006 ordered pairs becoming 24,024 cases to author.
     * Transforming the input instead costs nothing downstream.
     */
    const upright = ids.map((id) => getTarotSemantics(id));
    if (upright.some((card) => card === null))
        return null;
    const cards = upright.map((card, index) => orientedSemantics(card, drawn[index].orientation));
    const [energy, factor, guidance] = cards;
    const [energyId, factorId, guidanceId] = ids;
    const pairs = [
        classifyTarotPair('energy', 'factor', energy, factor),
        classifyTarotPair('factor', 'guidance', factor, guidance),
        classifyTarotPair('energy', 'guidance', energy, guidance),
    ];
    const [ef, fg] = pairs;
    const primaryPair = selectPrimaryPair(pairs);
    /* A second relationship earns a sentence only when it is not the primary one
       and still carries weight of its own. */
    const secondaryPair = [...pairs]
        .filter((pair) => pair !== primaryPair && pair.salience !== 'quiet')
        .sort((left, right) => SALIENCE_RANK[right.salience] - SALIENCE_RANK[left.salience])[0] ?? null;
    /* One relation, said once. The opening always states the primary; the other
       two sections stay silent rather than repeat a relation already on the page. */
    const alreadySaid = new Set([primaryPair.relation]);
    const factorMention = secondaryPair && !alreadySaid.has(secondaryPair.relation)
        ? secondaryPair : null;
    if (factorMention)
        alreadySaid.add(factorMention.relation);
    const guidanceMention = !alreadySaid.has(fg.relation) ? fg : null;
    const rule = ARC_RULES.find((candidate) => candidate.test(energy, factor, guidance, ef, fg));
    /* The last rule always matches, so this is total; the fallback is defensive. */
    const arc = rule?.arc ?? 'continuation';
    const arcBasis = rule?.basis ?? 'no rule matched';
    const agreeing = [...pairs]
        .filter((pair) => pair.shared.length >= 2 && pair.opposing.length === 0)
        .sort((left, right) => right.shared.length - left.shared.length)[0] ?? null;
    const disagreeing = [...pairs]
        .filter((pair) => pair.opposing.length > 0)
        .sort((left, right) => right.opposing.length - left.opposing.length)[0] ?? null;
    /*
     * WHOSE COST THE READING NAMES. The strongest card that is actually strained -
     * unsettled, pushing hard, or bearing something. A spread of three quiet
     * settled cards names no cost, because inventing one would be writing a
     * difficulty into a reading that does not have one.
     */
    const strained = [energy, factor, guidance]
        .filter((card) => card.stability === 'volatile' || card.movement === 'disrupting'
        || card.movement === 'contracting' || card.agency === 'endure')
        .sort((left, right) => INTENSITY_RANK[right.intensity] - INTENSITY_RANK[left.intensity]);
    const cost = strained[0] ?? null;
    /*
     * THE ARC TEMPERS THE INVITATION, AND THIS IS WHERE.
     *
     * A card whose own agency says "act" renders as "keep going with it" - which
     * is incoherent when the shape of the spread is a course that has just turned.
     * You cannot be invited to continue along a line that changed partway. So on a
     * redirection arc, an active Guidance card reads as changing the line rather
     * than pressing on along it.
     *
     * Every other arc leaves the card's own agency alone. The review set found the
     * redirect invitation unreachable across all 456,456 spreads, which is what an
     * unwritten rule looks like from the outside.
     */
    const ownRole = GUIDANCE_ROLE[guidance.agency];
    const guidanceRole = arc === 'redirection' && ownRole === 'continue' ? 'redirect' : ownRole;
    /*
     * THE JUMPER IS CLASSIFIED, NOT DESCRIBED.
     *
     * Against the opening card and against the closing one, with classifyTarotPair -
     * the function the three positions already use. A jumper whose contribution was
     * authored separately would be exactly the encyclopedia output this layer exists
     * to avoid; one that goes through the same classifier has a relationship for the
     * same reason every other pair does.
     *
     * Both comparisons are made in the energy->guidance direction because the jumper
     * is the thing acting: it arrived after the deck was committed and is being read
     * against a spread that is already there.
     */
    let jumperPlan = null;
    if (jumper) {
        const base = getTarotSemantics(jumper.cardId);
        if (base) {
            const card = orientedSemantics(base, jumper.orientation);
            const toEnergy = classifyTarotPair('energy', 'guidance', card, energy);
            const toGuidance = classifyTarotPair('energy', 'guidance', card, guidance);
            const { relation, basis } = jumperRelationFor(toEnergy, toGuidance);
            jumperPlan = { cardId: jumper.cardId, card, relation, basis, toEnergy, toGuidance };
        }
    }
    return {
        contentVersion: TAROT_CONTENT_VERSION,
        cardIds: [energyId, factorId, guidanceId],
        energy: { card: energy, role: ENERGY_ROLE[energy.direction] },
        factor: { card: factor, role: FACTOR_ROLE[ef.relation] },
        guidance: { card: guidance, role: guidanceRole },
        pairs,
        primaryPair,
        secondaryPair,
        namedRelations: {
            opening: primaryPair,
            factor: factorMention,
            guidance: guidanceMention,
        },
        arc,
        arcBasis,
        reinforcement: agreeing,
        tension: disagreeing,
        modifiers: modifiersFor([energy, factor, guidance], [energyId, factorId, guidanceId]),
        cost,
        jumper: jumperPlan,
        closing: guidanceRole,
    };
}
