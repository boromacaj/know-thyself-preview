import { newKindLedger, SUIT_NAME, kindOf } from './tarotCardKindEn.js';
import { askOf, cardNameOf, composeCardSection, questionOf, riskOf, stakeOf } from './tarotCardSectionEn.js';
import { choose, inline, lowerMidArticle, upperFirst } from './tarotDiscourseEn.js';
import { reversalClarification } from './tarotCoherenceEn.js';
import { isReversed, presentAndShaping, sentenceBetween, title as titleOfPlace, TAROT_VOICE_EN, } from './tarotVoiceEn.js';
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
const DIMENSION = {
    direction: 'the stage they are at',
    movement: 'which way they lean',
    focus: 'whether they look inward or outward',
    stance: 'how they treat the people around them',
    stability: 'how settled they are',
    agency: 'what they ask of you',
};
const PLACE_INDEX = { energy: 0, factor: 1, guidance: 2 };
const MODIFIER = {
    'all-major': 'All three cards are Major Arcana, which points to larger themes rather than small events.',
    'major-heavy': 'Two of the three are Major Arcana, which points to something larger than the details of the moment.',
    'all-court': 'All three are court cards, so this is less about events and more about stances: ways of carrying a thing rather than the thing itself.',
    'court-heavy': 'Two court cards put the emphasis on how something is being carried rather than on what it is.',
    'ace-present': 'An Ace is among the cards, which adds a sense of something beginning.',
};
/** Where the cards differ most, named by what the difference is about. Said only for a pair the plan found at odds. */
function tensionSentence(plan) {
    const pair = plan.tension;
    if (!pair || pair.salience === 'quiet' || pair.opposing.length === 0)
        return '';
    const about = DIMENSION[pair.opposing[0]];
    if (!about)
        return '';
    const [from, to] = [PLACE_INDEX[pair.from], PLACE_INDEX[pair.to]];
    if (from === undefined || to === undefined)
        return '';
    return `Where the cards differ most is in ${about}: ${inline(titleOfPlace(plan, from))} and ${inline(titleOfPlace(plan, to))} do not agree on it.`;
}
function structureSentences(plan) {
    const out = [];
    const tension = tensionSentence(plan);
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
        const line = MODIFIER[modifier];
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
        : presentAndShaping(plan).replace(/^What is most present is/, 'The first two cards describe one situation from two sides: what is most present is');
    /* what the third card does to what they made, then the question it raises */
    const inner = sentenceBetween(plan, 1, 2, { use: 'plain', subject: 'name', forceStakes: true });
    const outer = sentenceBetween(plan, 0, 2, { use: 'plain', subject: 'name', forceStakes: true });
    /* A second sentence that says the same kind of thing as the first ("steadies the ground ... brings steadier ground") is left out: the third card then speaks for itself. */
    const opener = (text) => text.split(' ')[0] ?? '';
    const fresh = (candidate) => (candidate.pair.relation === between.pair.relation || (between.text !== '' && opener(candidate.text) === opener(between.text) && opener(candidate.text) !== 'The') ? '' : candidate.text);
    const relation = fresh(inner) !== '' ? fresh(inner) : fresh(outer);
    const question = choose([
        `Set against the first two, the question the third card raises is: ${questionOf(plan.cardIds[2])}`,
        `What the third card asks of the first two is this: ${questionOf(plan.cardIds[2])}`,
        `The question to hold against everything before it is: ${questionOf(plan.cardIds[2])}`,
    ], `${seed}|question`);
    const guidance = relation !== ''
        ? `${relation} ${question}`
        : `The third card does not change the picture so much as say what to do with it: ${g}. ${question}`;
    const paragraphs = [story, guidance];
    const structure = structureSentences(plan);
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
export function takeawayFor(plan) {
    const seed = plan.cardIds.join('|');
    const [first, last] = [askOf(plan.cardIds[0], plan.energy.card.orientation), askOf(plan.cardIds[2], plan.guidance.card.orientation)];
    const factorName = inline(titleOfPlace(plan, 1));
    const risk = riskOf(plan.cardIds[1]);
    const bare = plainAsk;
    /* An ask that already holds a comma or an "and" is said as a sentence of its own: chained with more "and"s it stops being readable. */
    const compound = /,| and |\bthen\b/.test(first) || /,| and |\bthen\b/.test(last);
    /* An ask that says "then" itself cannot be introduced by "Then". */
    const saysThen = /\bthen\b/i.test(first) || /\bthen\b/i.test(last);
    return lowerMidArticle(choose(compound ? [
        ...(saysThen ? [] : [`${imperative(first)}. Then ${bare(last)}. With ${factorName}, keep an eye on ${risk}.`]),
        `${imperative(first)}. After that, ${bare(last)}. With ${factorName}, watch for ${risk}.`,
    ] : [
        `${imperative(first)}. Then ${bare(last)}. With ${factorName}, keep an eye on ${risk}.`,
        `${imperative(first)}, and then ${bare(last)}. The thing to watch with ${factorName} is ${risk}.`,
        `First, ${bare(first)}; after that, ${bare(last)}. With ${factorName}, watch for ${risk}.`,
    ], `${seed}|takeaway`));
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
        takeaway: { title: 'What to take from this', text: takeawayFor(plan) },
    };
}
