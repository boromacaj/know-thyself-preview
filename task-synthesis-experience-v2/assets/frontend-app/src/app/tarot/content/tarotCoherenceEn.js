import { relationSentence } from './tarotDiscourseEn.js?v=53c0693';
/**
 * Whether the sentence for this pair claims a break or a clash. A pair that is classified as one but that the reading has nothing to say about
 * (every frame silent) claims nothing: the reading never says it, so the opening is not contradicted by it.
 */
export function claimOf(pair, a, b) {
    if (pair.relation !== 'interruption' && pair.relation !== 'contrast')
        return null;
    const said = relationSentence(pair, a, b, { forceStakes: true }) !== '' || relationSentence(pair, a, b, { use: 'names' }) !== '';
    if (!said)
        return null;
    return pair.relation === 'interruption' ? 'interrupts' : 'clashes';
}
/** The arcs that say the spread is ONE line: the two that a break or a clash would contradict. */
const CONTINUITY_ARCS = new Set(['continuation', 'escalation']);
export const claimsContinuity = (arc) => CONTINUITY_ARCS.has(arc);
export function stanceOf(arc, claims) {
    if (!claimsContinuity(arc))
        return 'interrupted';
    const interrupts = claims.some((entry) => entry.claim === 'interrupts');
    const clashes = claims.some((entry) => entry.claim === 'clashes');
    if (interrupts && clashes)
        return 'mixed';
    if (interrupts)
        return 'qualified';
    if (clashes)
        return 'contradictory';
    return 'continuous';
}
/** The pair that stands for a kind of claim: the one between neighbours before the one that skips a card, and earlier before later. */
export function claimedPair(claims, kind) {
    return [...claims]
        .filter((entry) => entry.claim === kind)
        .sort((x, y) => (x.to - x.from) - (y.to - y.from) || x.from - y.from)[0] ?? null;
}
/* ------------------------------------------------------------- proposition -- */
/**
 * WHEN TWO PHRASES SAY THE SAME THING.
 *
 * A reversed card has a stake ("an ending resisted or rushed so that the change is never fully felt") and a risk ("clinging to what is ending, or
 * cutting it away so quickly that the loss is never felt"). For some cards the second only says the first again, with other words, and a paragraph
 * that said both read as one thought told twice. This is a proposition key, not a similarity engine: two phrases state the same proposition when
 * they share two or more content stems. It is deliberately blunt, and a test pins which of the 78 cards it finds.
 */
const FUNCTION_WORDS = new Set(('a an the of to and or in on at is are was were be been it its that this these those with for from as by into than so not no never '
    + 'what which who whose when while where more most less only too one has have had do does did them they their there then very').split(' '));
const stemOf = (word) => word.replace(/(ing|ed|es|s|ly)$/, '');
export function contentStems(text) {
    return new Set(text.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/)
        .filter((word) => word.length > 2 && !FUNCTION_WORDS.has(word))
        .map(stemOf)
        .filter((stem) => stem.length > 2));
}
/** Whether `later` states again what `earlier` has already said. */
export function restates(earlier, later) {
    const known = contentStems(earlier);
    let shared = 0;
    for (const stem of contentStems(later))
        if (known.has(stem))
            shared += 1;
    return shared >= 2;
}
/**
 * WHEN A SECOND CARD ADDS NOTHING TO THE FIRST.
 *
 * The short reading carries what the middle card shapes. It may leave the middle card out only when what it puts forward is, in effect, what the first card
 * already said: three shared content stems. Two is not enough - "a beginning taken before the proof arrives" and "an impulse arriving before it has a shape"
 * share two and are different things - and across the 24,024 ordered pairs of stakes only two pairs (the Devil reversed and the Four of Pentacles reversed,
 * "a hold that either loosens ...") reach three. Anything less, and the middle card is said.
 */
export function addsNothingTo(first, second) {
    const known = contentStems(first);
    let shared = 0;
    for (const stem of contentStems(second))
        if (known.has(stem))
            shared += 1;
    return shared >= 3;
}
/**
 * WHEN A PHRASE ALREADY CARRIES THE RELATION A FRAME IS ABOUT TO ADD.
 *
 * A composed sentence that joins two of the cards' phrases with a relation ("..., shaped by Y", "..., and what shapes it is Y") collides when one of the phrases
 * already holds that relation ("skilled work shaped by shared standards"): "X shaped by Z, shaped by Y". The frame is then split into two sentences, which
 * is the one fallback; nothing is reworded and no card's phrase is touched. Only the relation words the composition contract itself adds are guarded
 * ("shaped by" and "what shapes it") together with the other relations a stake can carry; repeated words as such are ordinary English and are left alone.
 */
const CARRIES_A_RELATION = /\b(?:shaped|driven|held|kept|built|guided|limited|strained|supported)\s+(?:by|on)\b|\bshapes\b/i;
export const carriesARelation = (...phrases) => phrases.some((phrase) => CARRIES_A_RELATION.test(phrase));
/**
 * THE CARDS WHOSE UPRIGHT FACE IS AN ORDEAL: a fall, an ending, a bondage, a wound, a collapse, something to be borne.
 *
 * They are the ones a reader most expects "reversed" to mean "relieved" for, or "worse" for, and the reading does neither: it says what the
 * reversal does to them. The list is authored on purpose. The semantic model's own notion of a strained card (unsettled, breaking, enduring)
 * covers a third of the deck, and a clarification on a third of the deck is the fingerprint this exists to remove.
 */
export const ORDEAL_CARDS = new Set([
    'major-tower', 'major-devil', 'major-death', 'swords-three', 'swords-eight', 'swords-nine', 'swords-ten', 'pentacles-five', 'wands-ten', 'cups-five',
]);
export const isHardUpright = (id) => ORDEAL_CARDS.has(id);
const COUNT_WORD = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const inlineName = (name) => name.replace(/^The /, 'the ');
const listNames = (names) => (names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);
/** The sentence a reversal has earned in this reading, or '' when the reversed cards speak for themselves. */
export function reversalClarification(cases) {
    const reversed = cases.filter((entry) => entry.reversed);
    if (reversed.length === 0)
        return '';
    if (cases.length >= 2 && reversed.length === cases.length) {
        const everyone = cases.length === 2 ? 'Both' : `All ${(COUNT_WORD[cases.length] ?? String(cases.length)).toLowerCase()}`;
        return `${everyone} came out reversed, so each card is read by what it amounts to reversed, and none by its upright meaning.`;
    }
    const hard = reversed.filter((entry) => isHardUpright(entry.id));
    if (hard.length > 0) {
        const names = listNames(hard.map((entry) => inlineName(entry.name)));
        return hard.length === 1
            ? `Reversing ${names} does not make it lighter or heavier by itself: it changes what the difficulty is about.`
            : `Reversing ${names} does not make them lighter or heavier by themselves: it changes what the difficulty is about.`;
    }
    return '';
}
