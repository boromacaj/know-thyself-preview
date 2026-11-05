/**
 * WHAT THE READER HAS TO SAY, AND HOW IT MEANS TO SAY IT.
 *
 * Three things are kept apart, on purpose:
 *
 *   INTERPRETATION  what this spread means: which kind of line each card reads through, what
 *                   the dominant structure is, which cards contradict and which agree, what
 *                   the most important thing the spread says is, and what it may not be
 *                   taken to say. Decided from the plan and nothing else.
 *   DELIVERY        how that already-established meaning is put to a person: what to open
 *                   on, how heavy a hand the reading takes, how direct it may be, whether it
 *                   earns a closing question. Decided from the interpretation.
 *   LANGUAGE        the sentences. Not here: the voices render what these two decide.
 *
 * Delivery never invents a Tarot claim. It can only choose among things the plan already
 * found, which is why this file reads no card and holds no prose.
 *
 * Deterministic: the same plan always gives the same interpretation, and the variant numbers
 * that vary a reading's wording are derived from the cards, never from a clock or a random
 * source, so a reading opened twice is the same reading.
 */
/* ---------------------------------------------------------------- places -- */
/**
 * The kind of line a card reads through, for each kind of place. `focus` reads two: one card has to say
 * where things stand and what it asks, since there is nothing else in the reading to say the second.
 */
export const LINE_GROUPS_OF = {
    focus: ['state', 'response'],
    state: ['state'],
    origin: ['origin'],
    driver: ['driver'],
    response: ['response'],
    direction: ['direction'],
    option: ['direction'],
    criterion: ['state'],
    other: ['other'],
    meeting: ['state'],
    embodied: ['state'],
    mental: ['state'],
    meaning: ['driver'],
    supporting: ['state'],
    resisting: ['state'],
};
/* ------------------------------------------------------------------ seed -- */
/** FNV-1a over the cards, their orientations and the spread: a stable number, never a clock. */
export function readingSeed(plan) {
    const text = `${plan.spread.id}|${plan.cards.map((entry) => `${entry.cardId}:${entry.orientation}`).join('|')}`;
    let hash = 0x811c9dc5;
    for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash >>> 0;
}
/** One of `count` variants for a clause, spread so that two clauses of one reading rarely share a number. */
export const variantOf = (seed, salt, count) => {
    let value = (seed ^ Math.imul(salt + 1, 0x9e3779b1)) >>> 0;
    value ^= value >>> 15;
    value = Math.imul(value, 0x85ebca6b) >>> 0;
    value = (value ^ (value >>> 13)) >>> 0;
    return value % count;
};
/* ------------------------------------------------------------ interpretation -- */
/**
 * A CONTRADICTION IS A CONTRAST, NOT A DIFFERENCE.
 *
 * Two cards that differ in a dimension or two are simply two cards; saying they "disagree" would be
 * the Reader inventing a conflict. The relation the pair classifier calls `contrast` - one pulling
 * against the other - is the only one the Reader names as a contradiction.
 */
export const isContradiction = (edge) => edge.reading.relation === 'contrast' && edge.reading.salience !== 'quiet';
/** The relations in which a last card changes how what came before can be approached. */
const LATE_TURN = new Set([
    'redirection', 'release', 'answer', 'stabilisation', 'integration', 'exposure',
]);
const edgeBetween = (plan, from, to) => plan.edges.find((edge) => edge.from === from && edge.to === to);
function toneOf(plan) {
    const strained = plan.cards.filter((entry) => entry.strained).length;
    const heavyHitters = plan.cards.filter((entry) => entry.strained && entry.card.intensity === 'strong').length;
    const tensions = plan.synthesis.tensions.filter(isContradiction).length;
    /* Heavy is two strong cards under strain, or a spread in which every card is. One difficult card among several is not a heavy reading. */
    if (heavyHitters >= 2 || (strained === plan.cards.length && strained >= 3))
        return 'heavy';
    if (tensions > 0 && strained >= 1)
        return 'tense';
    if (tensions > 0)
        return 'conflicted';
    if (strained === 0)
        return 'light';
    return 'steady';
}
function insightOf(plan) {
    const s = plan.synthesis;
    const count = plan.cards.length;
    const last = count - 1;
    if (s.strategy === 'single' || count === 1)
        return { kind: 'single', focus: [0], relation: null };
    if (s.strategy === 'self-other-meeting' && s.meeting)
        return { kind: 'self-other', focus: [0, 1, 2], relation: s.meeting.selfOther.reading.relation };
    if (s.strategy === 'options-criterion' && s.contrast)
        return { kind: s.contrast.kind === 'forces' ? 'forces' : 'options', focus: [0, 1, 2], relation: s.contrast.edge.reading.relation };
    if (s.strategy === 'layers' && s.layers)
        return { kind: 'layers', focus: [0, 1, 2], relation: null };
    /* A sequence. The spread that is a problem, its cause and its answer has a shape of its own. */
    if (plan.spread.id === 'problem-cause-solution' && count === 3)
        return { kind: 'ladder-problem', focus: [0, 1, 2], relation: null };
    const lastEdge = edgeBetween(plan, last - 1, last);
    const firstEdge = edgeBetween(plan, 0, 1);
    const notable = (edge) => !!edge && edge.reading.salience !== 'quiet';
    /* The advice meeting the situation head on is a contradiction, and the contradiction is the finding. */
    if (plan.spread.id === 'situation-action-outcome' && notable(firstEdge) && firstEdge.reading.relation === 'contrast') {
        return { kind: 'gap', focus: [0, 1, last], relation: firstEdge.reading.relation };
    }
    if (notable(lastEdge) && LATE_TURN.has(lastEdge.reading.relation)) {
        return { kind: 'late-turn', focus: [0, last - 1, last], relation: lastEdge.reading.relation };
    }
    const tension = s.tensions.find(isContradiction);
    if (tension) {
        /* The card that is not one of the two in contradiction still has a place in what the spread concludes: the last, or failing that the first. */
        const rest = [last, 0, ...plan.cards.map((entry) => entry.index)].find((index) => index !== tension.from && index !== tension.to);
        return { kind: 'gap', focus: rest === undefined ? [tension.from, tension.to] : [tension.from, tension.to, rest], relation: tension.reading.relation };
    }
    if (s.reinforcement && s.tensions.length === 0 && plan.edges.every((edge) => edge.reading.opposing.length === 0)) {
        return { kind: 'consistent', focus: count <= 3 ? plan.cards.map((entry) => entry.index) : [0, last], relation: s.reinforcement.reading.relation };
    }
    if (plan.spread.id === 'situation-action-outcome' && count === 3)
        return { kind: 'ladder-situation', focus: [0, 1, 2], relation: null };
    if (count === 3)
        return { kind: 'ladder-sequence', focus: [0, 1, 2], relation: null };
    return { kind: 'plain', focus: [0, last], relation: null };
}
function prohibitionsOf(plan, uncertainties) {
    const out = ['verdict'];
    if (uncertainties.includes('other-person'))
        out.push('private-thoughts');
    if (uncertainties.includes('direction'))
        out.push('event-prediction');
    if (uncertainties.includes('court-identity'))
        out.push('person-identified');
    if (uncertainties.includes('assumption'))
        out.push('assumption-as-fact');
    for (const flag of plan.safety.flags)
        out.push(flag);
    return out;
}
export function interpretReading(plan) {
    const uncertainties = [];
    if (plan.cards.some((entry) => entry.fn === 'other'))
        uncertainties.push('other-person');
    if (plan.cards.some((entry) => entry.fn === 'direction' || entry.fn === 'option'))
        uncertainties.push('direction');
    if (plan.cards.some((entry) => entry.courtFraming === 'person-or-role'))
        uncertainties.push('court-identity');
    if (plan.question.form === 'yes-no')
        uncertainties.push('yes-no');
    if (plan.safety.flags.includes('accusation') || plan.safety.flags.includes('paranoia'))
        uncertainties.push('assumption');
    return {
        groups: plan.cards.map((entry) => LINE_GROUPS_OF[entry.fn]),
        tone: toneOf(plan),
        insight: insightOf(plan),
        contradictions: plan.synthesis.tensions.filter(isContradiction),
        reinforcing: plan.synthesis.reinforcement ? [plan.synthesis.reinforcement] : [],
        uncertainties,
        prohibited: prohibitionsOf(plan, uncertainties),
    };
}
/* ---------------------------------------------------------------- delivery -- */
function openingOf(plan, interpretation) {
    const count = plan.cards.length;
    const plain = { focus: 'plain', a: 0, b: Math.max(0, count - 1) };
    if (count < 3 || plan.safety.level !== 'standard')
        return plain;
    const last = count - 1;
    const lastEdge = edgeBetween(plan, last - 1, last);
    const sequence = plan.synthesis.strategy === 'sequence';
    if (sequence && lastEdge && lastEdge.reading.salience === 'defining' && LATE_TURN.has(lastEdge.reading.relation)) {
        return { focus: 'late-turn', a: lastEdge.from, b: lastEdge.to };
    }
    const tension = interpretation.contradictions[0];
    if (tension && tension.reading.salience === 'defining')
        return { focus: 'contradiction', a: tension.from, b: tension.to };
    if (plan.patterns.majorDensity === 'all' || plan.patterns.majorDensity === 'most')
        return { focus: 'weight', a: 0, b: last };
    if (interpretation.contradictions.length === 0 && plan.edges.length >= 3
        && plan.edges.every((edge) => edge.reading.opposing.length === 0 && edge.reading.shared.length >= 1))
        return { focus: 'consistent', a: 0, b: last };
    if (plan.synthesis.layers?.even)
        return { focus: 'even', a: 0, b: last };
    return plain;
}
/** A closing question is earned by a reading that has a real tension or a real choice in it, and by nothing else. */
function reflectionOf(plan, interpretation) {
    if (plan.safety.level !== 'standard')
        return null;
    const s = plan.synthesis;
    /* One card has no tension to resolve; the question it poses is the whole of what is left to say. */
    if (plan.cards.length < 2)
        return 0;
    const earned = interpretation.contradictions.length > 0
        || s.strategy === 'options-criterion'
        || interpretation.insight.kind === 'late-turn'
        || interpretation.insight.kind === 'ladder-problem';
    if (!earned)
        return null;
    if (s.responseIndex !== null)
        return s.responseIndex;
    return plan.cards.length - 1;
}
function shapeOf(plan, interpretation, seed) {
    const present = [];
    if (interpretation.contradictions.length > 0)
        present.push('tension-first');
    /* A yes-or-no question is read as an "if" - except by the spreads built for exactly that question, where it would be every reading. */
    const askedAsYesNo = plan.question.form === 'yes-no' && plan.spread.strategy !== 'options-criterion' && plan.spread.id !== 'support-resistance-key';
    if (plan.patterns.reversedCount > 0 || askedAsYesNo)
        present.push('conditional');
    if (plan.synthesis.flow && (plan.synthesis.flow.agency || plan.synthesis.flow.focus))
        present.push('progression');
    present.push('direct');
    return present[variantOf(seed, 77, present.length)];
}
export function planDelivery(plan, interpretation) {
    const tone = interpretation.tone;
    const emotionalWeight = tone === 'heavy' ? 'heavy' : tone === 'tense' || tone === 'conflicted' ? 'moderate' : 'light';
    const consistentStructure = interpretation.contradictions.length === 0 && interpretation.insight.kind === 'consistent';
    const seed = readingSeed(plan);
    return {
        shape: shapeOf(plan, interpretation, seed),
        lead: variantOf(seed, 98, 4),
        opening: openingOf(plan, interpretation),
        tone,
        directness: consistentStructure || interpretation.contradictions.some((edge) => edge.reading.salience === 'defining') ? 'plain' : 'measured',
        emotionalWeight,
        metaphorAllowance: emotionalWeight !== 'heavy' && plan.safety.level === 'standard',
        reflection: reflectionOf(plan, interpretation),
        seed,
    };
}
