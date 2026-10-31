import { newKindLedger, SUIT_NAME, kindOf } from './tarotCardKindEn.js';
import { askOf, cardNameOf, composeCardSection, questionOf, riskOf, stakeOf } from './tarotCardSectionEn.js';
import { choose, inline, lowerMidArticle, upperFirst } from './tarotDiscourseEn.js';
import { reversalClarification } from './tarotCoherenceEn.js';
import { movementFamily } from './tarotRelations.js';
import { isReversed, sentenceBetween, title as titleOfPlace, TAROT_VOICE_EN, } from './tarotVoiceEn.js';
export const DAILY_POSITIONS = [
    { id: 'energy', name: 'Energy', fn: 'energy' },
    { id: 'factor', name: 'Factor', fn: 'driver' },
    { id: 'guidance', name: 'Guidance', fn: 'response' },
];
const PLACES = [0, 1, 2];
/* ------------------------------------------------------------- synthesis -- */
/**
 * THE SYNTHESIS RELATES THE CARDS; IT DOES NOT DEFINE THEM AGAIN.
 *
 * Three things can honestly be said about three cards that none of them says alone, and each is said only when the plan found it:
 *
 *   what the second card does to the first - the engine's own pair sentence, which asserts only what the relation classifier established; where it has nothing to
 *       assert (about three pairs in five) the sentence says only what the positions say: what is most present and what shapes it. A weak relation is never narrated.
 *   what the third card does to what those made - the same, between the third card and the second or the first, followed by the question the third card poses.
 *   where the cards differ most, and what the three share in structure - the plan's tension pair named by what it is about, and the suit, Major and court
 *       patterns of the spread.
 *
 * Every part is built from the cards in play, so a different card in any position changes the text.
 */
/**
 * WHAT EACH SIDE OF A DIFFERENCE DOES, said of the card. The relation classifier finds a pair at odds on four dimensions only (tarotRelations.ts,
 * opposingDimensions), and each of them has exactly two poles; the card's own oriented semantics say which pole it stands at. "Where the cards differ most is
 * in which way they lean: X and Y do not agree on it" named the dimension and left the reader to guess what the disagreement was; this says it.
 */
const POLE = {
    movement: (card) => ({ outward: 'pushes toward action', inward: 'draws back' }[movementFamily(card.movement)] ?? null),
    /* "Looks outward" and "turns inward" were said of cards whose own meaning gives no such direction (the Star outward, the Ace of Wands inward), so a difference in focus is not stated. */
    focus: () => null,
    stability: (card) => (card.stability === 'stable' ? 'holds steady' : card.stability === 'volatile' ? 'stays unsettled' : null),
    stance: (card) => (card.relational === 'joining' ? 'moves toward other people' : card.relational === 'separating' ? 'keeps its distance from them' : null),
};
const PLACE_INDEX = { energy: 0, factor: 1, guidance: 2 };
const MODIFIER = {
    'all-major': 'All three cards are Major Arcana, which points to larger themes rather than small events.',
    'major-heavy': 'Two of the three are Major Arcana, which points to something larger than the details of the moment.',
    'all-court': 'All three are court cards, so this is less about events and more about stances: ways of carrying a thing rather than the thing itself.',
    'court-heavy': 'Two court cards put the emphasis on how something is being carried rather than on what it is.',
};
/**
 * Where the cards differ most, said as what each of the two does. Said only for a pair the plan found at odds, and not for a pair whose contrast the synthesis has
 * just said in its own words ("The Sun is pushing outward while the Hermit is drawing in"): the same opposition twice is one point made twice.
 */
function tensionSentence(plan, narrated) {
    const pair = plan.tension;
    if (!pair || pair.salience === 'quiet' || pair.opposing.length === 0)
        return '';
    const pole = POLE[pair.opposing[0]];
    if (!pole)
        return '';
    const [from, to] = [PLACE_INDEX[pair.from], PLACE_INDEX[pair.to]];
    if (from === undefined || to === undefined)
        return '';
    if (narrated.some((said) => said.relation === 'contrast' && ((said.from === from && said.to === to) || (said.from === to && said.to === from))))
        return '';
    const cards = [plan.energy.card, plan.factor.card, plan.guidance.card];
    /* A contrast already said between two of the cards, and a gap that shares one of them: two different contrasts back to back read as a quarrel the reading cannot settle.
       Where the other two cards lean the same way the reading says so (one card against the rest); otherwise the gap is not stated a second time. */
    const overlap = narrated.find((said) => said.relation === 'contrast' && [said.from, said.to].some((place) => place === from || place === to));
    if (overlap) {
        if (pair.opposing[0] !== 'movement')
            return '';
        const common = [overlap.from, overlap.to].find((place) => place === from || place === to);
        if (common === undefined)
            return '';
        const [otherSaid, otherGap] = [overlap.from === common ? overlap.to : overlap.from, from === common ? to : from];
        if (movementFamily(cards[otherSaid].movement) !== movementFamily(cards[otherGap].movement))
            return '';
        return `${titleOfPlace(plan, otherGap)} leans the same way as ${inline(titleOfPlace(plan, otherSaid))}, so ${inline(titleOfPlace(plan, common))} is the card that pulls against the rest.`;
    }
    const [a, b] = [pole(cards[from]), pole(cards[to])];
    if (a === null || b === null || a === b)
        return '';
    return `The widest gap is between ${inline(titleOfPlace(plan, from))}, which ${a}, and ${inline(titleOfPlace(plan, to))}, which ${b}.`;
}
/** The Ace is named, and what it changes depends on the way it was drawn: an upright Ace adds a beginning; a reversed one is still the card of beginnings, so what it shows goes wrong at the start. */
function aceSentence(plan) {
    const placed = PLACES.filter((place) => kindOf(plan.cardIds[place])?.rank === 'ace');
    if (placed.length === 0)
        return '';
    const list = (names) => (names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);
    const upright = placed.filter((place) => !isReversed(plan, place)).map((place) => cardNameOf(plan.cardIds[place]));
    const reversed = placed.filter((place) => isReversed(plan, place)).map((place) => cardNameOf(plan.cardIds[place]));
    const parts = [];
    if (upright.length > 0)
        parts.push(`${list(upright)} ${upright.length === 1 ? 'adds' : 'add'} a note of something beginning.`);
    if (reversed.length > 0)
        parts.push(`${list(reversed)} ${reversed.length === 1 ? 'is' : 'are'} the ${reversed.length === 1 ? 'card' : 'cards'} of beginnings, so the trouble ${reversed.length === 1 ? 'it shows lies' : 'they show lies'} in how something starts.`);
    return parts.join(' ');
}
function structureSentences(plan, narrated) {
    const out = [];
    const tension = tensionSentence(plan, narrated);
    if (tension)
        out.push(tension);
    const suits = plan.cardIds.map((id) => kindOf(id)?.suit ?? null);
    const counts = new Map();
    for (const suit of suits)
        if (suit)
            counts.set(suit, (counts.get(suit) ?? 0) + 1);
    const top = [...counts.entries()].sort((x, y) => y[1] - x[1])[0];
    if (plan.modifiers.includes('one-suit') && top && plan.modifiers.includes('all-court')) {
        /* One suit and all courts is one sentence: said as two it opens "All three" twice running. */
        out.push(`All three are court cards from ${SUIT_NAME[top[0]]}, so the picture stays within one area of life and is less about events than about stances: ways of carrying a thing rather than the thing itself.`);
    }
    else if (plan.modifiers.includes('one-suit') && top) {
        out.push(`All three cards come from ${SUIT_NAME[top[0]]}, so the picture stays within one area of life rather than spreading across several.`);
    }
    else if (plan.modifiers.includes('suit-weighted') && top && top[1] >= 2) {
        out.push(`Two of the three cards come from ${SUIT_NAME[top[0]]}, so that area keeps coming back.`);
    }
    const saidWithSuit = plan.modifiers.includes('one-suit') && plan.modifiers.includes('all-court');
    for (const modifier of plan.modifiers) {
        const line = modifier === 'ace-present' ? aceSentence(plan) : MODIFIER[modifier];
        if (line && !(saidWithSuit && modifier === 'all-court')) {
            out.push(line);
            break;
        }
    }
    const clarification = reversalClarification(PLACES.map((place) => ({ id: plan.cardIds[place], name: cardNameOf(plan.cardIds[place]), reversed: isReversed(plan, place) })));
    if (clarification)
        out.push(clarification);
    return out;
}
export function synthesisFor(plan) {
    const seed = plan.cardIds.join('|');
    const g = stakeOf(plan.cardIds[2], plan.guidance.card.orientation);
    /* what the second card does to the first */
    const between = sentenceBetween(plan, 0, 1, { use: 'plain', subject: 'name', forceStakes: true });
    const story = between.text !== ''
        ? between.text
        /* No relation between the first two was established, and each card's phrase has just been said in its own section: the pair is named and placed, not quoted a second time. */
        : (() => {
            const [a, b] = [titleOfPlace(plan, 0), inline(titleOfPlace(plan, 1))];
            return choose([
                `${a} and ${b} belong together: the first is what is most present, the second what shapes it.`,
                `${a} names what is most present and ${b} what lies beneath it, so the two are read as one situation.`,
                `The first two cards are best read as a pair, ${inline(a)} on the surface and ${b} underneath.`,
                `Read together, ${inline(a)} shows the situation and ${b} the ground it stands on.`,
                `${a} and ${b} describe one situation from two sides.`,
            ], `${seed}|story`);
        })();
    /* what the third card does to what they made, then the question it raises */
    const inner = sentenceBetween(plan, 1, 2, { use: 'plain', subject: 'name', forceStakes: true });
    const outer = sentenceBetween(plan, 0, 2, { use: 'plain', subject: 'name', forceStakes: true });
    /* A second sentence that says the same kind of thing as the first ("steadies the ground ... brings steadier ground") is left out: the third card then speaks for itself. */
    const opener = (text) => text.split(' ')[0] ?? '';
    const fresh = (candidate) => (candidate.pair.relation === between.pair.relation || (between.text !== '' && opener(candidate.text) === opener(between.text) && opener(candidate.text) !== 'The') ? '' : candidate.text);
    let relation = fresh(inner) !== '' ? fresh(inner) : fresh(outer);
    /* A relation sentence that quotes the middle card's phrase right after the first paragraph has just quoted it says that phrase twice running: it points back instead. */
    const middle = stakeOf(plan.cardIds[1], plan.factor.card.orientation);
    if (relation !== '' && story.includes(middle) && relation.includes(middle)) {
        relation = relation.replace(new RegExp(`^(After|Against) ${middle.replace(/[.*+?^${}()|[]\]/g, '\$&')}`), 'Against that');
    }
    const narrated = [
        ...(between.text !== '' ? [{ from: 0, to: 1, relation: between.pair.relation }] : []),
        ...(fresh(inner) !== '' ? [{ from: 1, to: 2, relation: inner.pair.relation }]
            : fresh(outer) !== '' ? [{ from: 0, to: 2, relation: outer.pair.relation }] : []),
    ];
    const q = questionOf(plan.cardIds[2]);
    const question = choose([
        `Set against the first two, the question the third card raises is: ${q}`,
        `What the third card asks of the first two is this: ${q}`,
        `The question to hold against everything before it is: ${q}`,
        `Where the first two cards describe, the third asks: ${q}`,
        `Hold this question beside the first two cards: ${q}`,
        `Against the first two cards, the third asks: ${q}`,
    ], `${seed}|question`);
    const thirdReversed = plan.guidance.card.orientation === 'reversed';
    const turn = choose(thirdReversed ? [
        `The third card does not change the picture so much as say what to do with it, by showing what to avoid: ${g}.`,
        `The third card speaks to what to do by naming what would not help: ${g}.`,
    ] : [
        `The third card does not change the picture so much as say what to do with it: ${g}.`,
        `The third card turns from description to direction: ${g}.`,
        `With the third card the reading moves from what is happening to what to do about it: ${g}.`,
        `The third card is the one that points forward: ${g}.`,
    ], `${seed}|turn`);
    const guidance = relation !== ''
        ? `${relation} ${question}`
        : `${turn} ${question}`;
    const paragraphs = [story, guidance];
    const structure = structureSentences(plan, narrated);
    if (structure.length > 0)
        paragraphs.push(structure.join(' '));
    /* The pair sentences are built from titles that open a sentence; a Major named in the middle of one is "the Hermit", not "The Hermit". */
    return paragraphs.map(lowerMidArticle);
}
/** An ask is written as an infinitive ("to go ..., and to know ..."); said as an instruction, the second "to" goes with the first. */
const plainAsk = (ask) => ask.replace(/^to\s+/i, '').replace(/\.$/, '').replace(/ and to /g, ' and ');
const imperative = (ask) => upperFirst(plainAsk(ask));
/**
 * WHAT TO TAKE FROM THE READING: WHAT EACH OF THE THREE CARDS ASKS, IN ORDER.
 *
 * The first card's ask is where to start, the third card's is where to put the effort, and the middle card is the thing to keep an eye on. All three are the cards' own
 * phrases (every card has an ask upright and reversed, and a risk), so the takeaway comes from the cards and is not general advice, and changing any one card changes it.
 */
export function takeawayFor(plan, riskSaid = false) {
    const seed = plan.cardIds.join('|');
    const [first, last] = [askOf(plan.cardIds[0], plan.energy.card.orientation), askOf(plan.cardIds[2], plan.guidance.card.orientation)];
    const factorName = inline(titleOfPlace(plan, 1));
    const risk = riskOf(plan.cardIds[1]);
    const bare = plainAsk;
    /* An ask that already holds a comma or an "and" is said as a sentence of its own: chained with more "and"s it stops being readable. */
    const compound = /,| and |then/.test(first) || /,| and |then/.test(last);
    /* An ask that says "then" itself cannot be introduced by "Then". */
    const saysThen = /then/i.test(first) || /then/i.test(last);
    /* The risk of the middle card is said once: a reversed card has just said it in its own paragraph, and the takeaway then points back to it instead of saying the same line a second time. */
    const watch = (variant) => (riskSaid ? '' : [
        ` With ${factorName}, keep an eye on ${risk}.`,
        ` The thing to watch with ${factorName} is ${risk}.`,
        ` With ${factorName}, watch for ${risk}.`,
    ][variant]);
    const bodies = compound ? [
        ...(saysThen ? [] : [`${imperative(first)}. Then ${bare(last)}.${watch(0)}`]),
        `${imperative(first)}. After that, ${bare(last)}.${watch(2)}`,
        `Start with this: ${bare(first)}. After that, ${bare(last)}.${watch(1)}`,
    ] : [
        `${imperative(first)}. Then ${bare(last)}.${watch(0)}`,
        `${imperative(first)}, and then ${bare(last)}.${watch(1)}`,
        `First, ${bare(first)}; after that, ${bare(last)}.${watch(2)}`,
        `Start with this: ${bare(first)}. Then ${bare(last)}.${watch(1)}`,
    ];
    return lowerMidArticle(choose(bodies, `${seed}|takeaway`));
}
/* ------------------------------------------------------------ the reading -- */
export function composeCardFirstDaily(plan) {
    const ledger = newKindLedger(plan.cardIds);
    const cards = PLACES.map((place) => composeCardSection({
        position: DAILY_POSITIONS[place],
        cardId: plan.cardIds[place],
        orientation: [plan.energy.card, plan.factor.card, plan.guidance.card][place].orientation,
    }, ledger));
    return {
        title: 'Your Tarot Reading',
        path: DAILY_POSITIONS.map((position) => position.name).join(' → '),
        cards,
        jumper: plan.jumper ? { title: TAROT_VOICE_EN.jumper.sectionTitle, text: TAROT_VOICE_EN.jumperSection(plan).replace(/\s+/g, ' ').trim() } : null,
        synthesis: { title: 'What these cards mean together', paragraphs: synthesisFor(plan) },
        takeaway: { title: 'What to take from this', text: takeawayFor(plan, ledger.risksSaid.has(plan.cardIds[1])) },
    };
}
