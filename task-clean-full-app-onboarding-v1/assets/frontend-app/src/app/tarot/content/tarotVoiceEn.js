import { TAROT_CARD_VOICE_EN } from './tarotCardVoiceEn.js?v=f9ab0a6';
import { buildTarotCardTitles, TAROT_TITLE_LEXICON_EN } from './tarotCardTitles.js?v=f9ab0a6';
import { choose, HOLDS_ITS_OWN_CONNECTIVE, inline, LONG_PAIR, lowerMidArticle, relationSentence, relationWeight, shiftsFocus, stagesSentence } from './tarotDiscourseEn.js?v=f9ab0a6';
import { addsNothingTo, carriesARelation, claimedPair, claimOf, restates, reversalClarification, stanceOf } from './tarotCoherenceEn.js?v=f9ab0a6';
import { READER_CARDS } from './reader/readerCards.js?v=f9ab0a6';
import { fillReaderLine } from './reader/tarotCardReader.js?v=f9ab0a6';
import { reversedLineEn } from './reader/reversedLinesEn.js?v=f9ab0a6';
import { TAROT_REVERSED_NOTES_EN } from './reader/readerReversedNotesEn.js?v=f9ab0a6';
import { TAROT_REVERSED_ASKS_EN, TAROT_REVERSED_STAKES_EN, TAROT_RISKS_EN } from './reader/readerReversedStakesEn.js?v=f9ab0a6';
import { classifyTarotPair } from './tarotRelations.js?v=f9ab0a6';
import { orientedAt, upperFirst, } from './tarotVoice.js?v=f9ab0a6';
/**
 * THE TAROT READING IN ENGLISH.
 *
 * Evocative is allowed; fortune-telling is not. Every sentence below describes a
 * symbolic dynamic and what it might be worth noticing - never an event, never a
 * fact about somebody the reader cannot see, never a promise.
 *
 * Nothing here says "will". The reading offers a way of looking at a day, and
 * the closing line says so once rather than hedging every sentence.
 *
 * EVERY TABLE IS KEYED ON SOMETHING THE PLAN DECIDED. There is no sentence here
 * that appears because a paragraph looked short - each one renders a specific
 * finding, so a reading is exactly as long as it has things to say.
 *
 * NOTHING HERE NAMES A RELATION. The plan knows that two cards "reinforce" or "contrast"; a person would not say so. The
 * relation between two cards is turned into what it means for those two cards (tarotDiscourseEn.ts) and the reading says
 * that. The plan's own classification is left exactly as it was, because the Slovak voice reads it; the English voice asks
 * the refined classifier about the same two cards, the one the question Reader already uses, so that two endings are not
 * reported as opposites.
 */
const MODIFIER_LINE = {
    'all-major': 'All three cards are Major Arcana, which the tradition reads as a wider frame than a day - less about what is on today and more about what the day belongs to.',
    'major-heavy': 'Two of the three are Major Arcana, which the tradition reads as larger themes rather than events of the day.',
    'one-suit': 'All three come from one suit, which tends to narrow a reading to a single register rather than spreading it across several.',
    'all-court': 'All three are court cards, which reads less as events and more as stances - ways of carrying a thing rather than the thing itself.',
    'court-heavy': 'Two court cards put the emphasis on how something is being carried rather than on what it is.',
};
/**
 * HOW STEADY THE OPENING IS.
 *
 * Something that can turn and something that will stay as it is put the other two cards to completely different use.
 * Each line names its own subject ("This"): it follows a full sentence about the card, so a bare "It" could be any noun in that sentence.
 *
 * NO LINE HERE SAYS HOW LONG, OR PREDICTS THAT ANYTHING WILL STAY. The semantic model knows that a card is steady or unsteady; it has no clock, so "within
 * hours", "by the end of the day", "tonight" and "not likely to shift much" were claims nothing in the plan supported. A steady card is described as a
 * present condition - and says WHAT is settled, in the card's own phrase - and only where the card is upright: three of the six reversal modes leave the
 * upright card's stability untouched, so a reversed card would otherwise inherit "steady" from the face it was turned away from. Where a card does not
 * hold, the line says what the other two cards ARE to it - the second says what shapes it, the last what it points towards - not that they "matter" or
 * are "more than commentary".
 */
const STEADY_PRESENT = [
    (thing) => `What looks settled here is ${thing}.`,
    (thing) => `${upperFirst(thing)} is the settled part of this.`,
    (thing) => `The settled part of this is ${thing}.`,
];
const STABILITY_LINE = {
    volatile: [
        'This is not steady: it can turn, and the card that follows says what is shaping that.',
        'This does not hold one shape: what it turns into depends on what shapes it and on what the last card points towards.',
        'This does not hold one shape, and the other two cards bear on what it turns into.',
    ],
    suspended: [
        'This is held rather than moving, which can be a state in its own right and not only a delay.',
        'This is on hold, and the holding may be doing something rather than merely passing time.',
    ],
    transforming: [
        'This is already changing as it goes; what is true of it now is partly provisional.',
        'This is mid-change; whatever is true of it now is partly provisional.',
    ],
};
export const cardTitles = buildTarotCardTitles(TAROT_TITLE_LEXICON_EN);
/**
 * REVERSAL.
 *
 * A reversal here is an ALTERED card, not a spoiled one: Waite's reversed Wheel of Fortune is "increase, abundance,
 * superfluity", his reversed Empress is "light, truth, public rejoicings", and nine of his reversed entries are more
 * favourable than the upright. What the alteration IS differs card by card, so the reading says it with the card's own
 * sentence (readerReversedNotesEn.ts) and the generic mode line below is only a fallback for a card that has none.
 */
const REVERSAL_LINE = {
    diminished: 'Reversed, this tends to arrive with less force behind it, or with something in the way.',
    blocked: 'Reversed, the thing is present and not getting through: stalled rather than absent.',
    excessive: 'Reversed, the same quality can be carried past the point where it was useful.',
    internalised: 'Reversed, it tends to happen privately, with no outward outlet.',
    exposed: 'Reversed, what this card usually keeps to itself can be visible.',
    unchanged: 'Reversed, this one reads much as it does upright; turning it round alters little.',
};
const ORIENTATION_VOICE_EN = {
    /** "Queen of Swords reversed": the way a person names the card. */
    title: (cardTitle, orientation) => (orientation === 'reversed' ? `${cardTitle} reversed` : cardTitle),
    /* A card's dynamic is left as it is; what the reversal does is said once, in the card's own sentence. */
    dynamic: (upright) => upright,
    /* A tag stands where there is no sentence for the reversal to live in, so it carries the word itself. */
    tag: (upright, mode) => (mode === 'unchanged' ? upright : `${upright}, reversed`),
    modeLine: REVERSAL_LINE,
    /* English says that a reversal means something only where a reader would otherwise misread it, and that needs the cards, not a count:
       see reversalClarification (tarotCoherenceEn.ts). A count alone is never a reason to explain reversal. */
    spreadNote: () => null,
};
/** What an accepted Jumper does to the arc. Keyed on the plan's own finding. */
const JUMPER_RELATION_LINE = {
    reinforces: 'It leans the same way as the three already do; it reads as confirmation rather than as news.',
    complicates: 'It cuts against the line the three make, which is most of why it is worth having.',
    exposes: 'It brings into the open something the three were keeping inward.',
    redirects: 'It turns the line the three were on.',
    settles: 'It closes something the three had left open.',
    accompanies: 'It neither pushes the spread nor opposes it; it sits alongside and keeps its own counsel.',
};
const JUMPER_VOICE_EN = {
    sectionTitle: 'The card that jumped',
    relationLine: JUMPER_RELATION_LINE,
    render: (plan) => {
        const jumper = plan.jumper;
        if (!jumper)
            return '';
        const reversed = jumper.card.orientation === 'reversed';
        const named = ORIENTATION_VOICE_EN.title(cardTitles[jumper.cardId], jumper.card.orientation);
        const stake = reversed ? TAROT_REVERSED_STAKES_EN[jumper.cardId] : READER_CARDS[jumper.cardId].en.stake;
        const asks = reversed ? TAROT_REVERSED_ASKS_EN[jumper.cardId] : TAROT_CARD_VOICE_EN[jumper.cardId].asks;
        const note = reversed ? ` ${TAROT_REVERSED_NOTES_EN[jumper.cardId]}` : '';
        return `${named} left the deck during the shuffle, before any of the three were chosen, `
            + `and you kept it. It stands for ${stake}.${note} ${JUMPER_RELATION_LINE[jumper.relation]} `
            + `Read it as context around the three rather than as a fourth position: it asks you ${asks}.`;
    },
};
const PLACES = ['energy', 'factor', 'guidance'];
/* The daily spread names its places in the section headings, so a sentence about two cards does not need to say where each sits. */
const WHERE = ['', '', ''];
/** The card's title, with "reversed" when it is. */
export const title = (plan, which) => ORIENTATION_VOICE_EN.title(cardTitles[plan.cardIds[which]], orientedAt(plan, which).orientation);
export const isReversed = (plan, which) => orientedAt(plan, which).orientation === 'reversed';
const stabilityLine = (plan) => {
    const stability = plan.energy.card.stability;
    /* Steady is said of what is steady, as a present condition, and only of an upright card: a reversed one has not earned it (see STABILITY_LINE). */
    if (stability === 'stable')
        return isReversed(plan, 0) ? '' : choose(STEADY_PRESENT, `steady${plan.cardIds[0]}`)(thingOf(plan, 0));
    const options = STABILITY_LINE[stability];
    return options ? choose(options, `stability${plan.cardIds[0]}`) : '';
};
/** What the card puts forward in this reading, as a bare noun phrase: its stake upright, what it amounts to reversed - never the upright one first. */
export const thingOf = (plan, which) => (isReversed(plan, which) ? TAROT_REVERSED_STAKES_EN[plan.cardIds[which]] : READER_CARDS[plan.cardIds[which]].en.stake);
/** What the card asks of the person, as a verb phrase that follows "asks you": "to say the clear thing kindly". It stands on its own: no pronoun waits for an antecedent. */
export const asksOf = (plan, which) => (isReversed(plan, which) ? TAROT_REVERSED_ASKS_EN[plan.cardIds[which]] : TAROT_CARD_VOICE_EN[plan.cardIds[which]].asks);
/**
 * THE CARD READ IN ITS PLACE, in the Reader's own authored sentences.
 *
 * The daily reading says what a card means in the same words the question Reader does: one authored sentence for a kind of place, never
 * a sentence assembled from the card's loose phrases. A reversed card has its own (reversedLinesEn.ts). The reader lines were written for
 * places in a spread ("in the underlying place"); the daily reading has none, so that phrase is dropped where it appears.
 */
const cardLine = (plan, which, group) => {
    const id = plan.cardIds[which];
    if (isReversed(plan, which))
        return reversedLineEn(group, title(plan, which), id);
    const template = READER_CARDS[id].en.lines[group]
        .replace(/^\{card\} in the underlying place /, 'Underneath this, {mid} ')
        .replace(' in the underlying place', '');
    return fillReaderLine(template, title(plan, which), 'en');
};
export const discourseCard = (plan, which) => ({
    name: title(plan, which),
    thing: thingOf(plan, which),
    where: WHERE[which],
    semantics: orientedAt(plan, which),
    reversed: isReversed(plan, which),
});
/** What the pair means, said for the two cards in these places. The refined classifier decides the relation. */
export function sentenceBetween(plan, from, to, options = {}) {
    const pair = classifyTarotPair(PLACES[from], PLACES[to], orientedAt(plan, from), orientedAt(plan, to), { semantic: true });
    return { text: relationSentence({ relation: pair.relation, opposing: pair.opposing, basis: pair.basis, salience: pair.salience }, discourseCard(plan, from), discourseCard(plan, to), options), pair };
}
/**
 * WHAT THE PAIRS OF THIS SPREAD CLAIM ABOUT ITS STRUCTURE.
 *
 * The same refined classifier the short reading and the sections use, over the three pairs, so that the opening cannot say of the spread
 * what a sentence below it denies (tarotCoherenceEn.ts).
 */
const PAIRS = [[0, 1], [1, 2], [0, 2]];
export function structuralClaimsOf(plan) {
    return PAIRS.flatMap(([from, to]) => {
        const pair = classifyTarotPair(PLACES[from], PLACES[to], orientedAt(plan, from), orientedAt(plan, to), { semantic: true });
        const claim = claimOf({ relation: pair.relation, opposing: pair.opposing, basis: pair.basis, salience: pair.salience }, discourseCard(plan, from), discourseCard(plan, to));
        return claim === null ? [] : [{ claim, from, to }];
    });
}
export const structuralStanceOf = (plan) => stanceOf(plan.arc, structuralClaimsOf(plan));
/**
 * THE SHAPE OF THE SPREAD, SAID WITH WHAT HAS THAT SHAPE.
 *
 * The plan classifies the movement of three cards ("an unsettled beginning that settles", "a still start that ends in movement"), and that is metadata:
 * said to a reader it names a shape and not what is unsettled, what settles or what starts moving. The classification stays inside the plan (the Slovak
 * voice reads it). The English opening says the movement with the cards' own phrases - what the first card puts forward, what the middle card carries it
 * through, what the last arrives at - so the noun is always the cards' and the shape needs no label. Where the three phrases cannot be strung with "from",
 * "through" and "to" (one holds its own "or", "to" or comma) they are said in order, one after another, and nothing is claimed about how they join.
 *
 * A build keeps its own sentence: it says from what to what and that force gathers, and never of a spread with a reversed card, because "gaining force" is
 * not true of a stall or a collapse.
 */
/** A phrase that cannot be strung between "from", "through" and "to": it holds its own comma, "or" or "to". */
const STRING_BREAKS = /,| or | to /;
/**
 * WHAT A CARD IS DOING, FOR THE OPENING: its own noun phrase, except where that phrase carries "attention", the word the directional pass banned as a stand-in
 * for what is attended to ("attention fixed on what was lost"); that card is then said by its stake.
 */
const arcPhrase = (plan, index) => {
    const dynamic = TAROT_CARD_VOICE_EN[plan.cardIds[index]].dynamic;
    /* "being out in it with help nearby" has an "it" with nothing before it to be, and "attention fixed on what was lost" is the stand-in the directional pass banned:
       such a card is said by its stake. A participle that is not a noun phrase ("hemmed in by something that would loosen") is given its "being". */
    if (/\battention\b|\bit\b/i.test(dynamic))
        return thingOf(plan, index);
    return /^[a-z]+ed\s/.test(dynamic) ? `being ${dynamic}` : dynamic;
};
const ARC_LEADS_ORDERED = ['Read in order, the three', 'Taken in order, the three', 'In sequence, the three'];
function arcSentence(plan, named) {
    /* What each card is doing, in the card's own noun phrase ("something finished and cleared away"), which is not the stake the short reading and the pair
       sentences quote - the opening and the short reading are two different sayings - and not the paragraph's own authored line. A reversed card is named, not
       quoted: its paragraph says what it amounts to reversed as its first claim, and the opening that said it too would be the same proposition in two sections. */
    const [first, middle, last] = [0, 1, 2].map((index) => (isReversed(plan, index) ? title(plan, index) : arcPhrase(plan, index)));
    const anyReversed = [0, 1, 2].some((index) => isReversed(plan, index));
    /* A reversed card is named in the sentence itself, so the opening does not also list the three names before it. */
    const seed = plan.cardIds.join('|');
    const lead = anyReversed ? choose(ARC_LEADS_ORDERED, `${seed}|lead`) : named;
    const fitsTwo = first.length + last.length <= LONG_PAIR && !HOLDS_ITS_OWN_CONNECTIVE.test(`${first} ${last}`);
    if (plan.arc === 'escalation' && !anyReversed && fitsTwo)
        return `${lead} move from ${first} to ${last}, gaining force on the way.`;
    const strung = !STRING_BREAKS.test(`${first} ${middle} ${last}`) && first.length + middle.length + last.length <= 200;
    if (!strung)
        return anyReversed ? `${lead} are: ${first}; then ${middle}; then ${last}.` : `${lead} come in this order: ${first}; then ${middle}; then ${last}.`;
    const verb = plan.arc === 'continuation' || plan.arc === 'escalation' ? choose(['carry on', 'continue', 'run on'], `${seed}|verb`) : choose(['go', 'move', 'pass'], `${seed}|verb`);
    return `${lead} ${verb} from ${first}, through ${middle}, to ${last}.`;
}
/** The opening's account of the spread: the movement of the three cards, unless a sentence of the reading breaks into it or clashes with it. */
function structureSentence(plan, lead) {
    const claims = structuralClaimsOf(plan);
    const stance = stanceOf(plan.arc, claims);
    const name = (index) => title(plan, index);
    const breaks = claimedPair(claims, 'interrupts');
    const clashes = claimedPair(claims, 'clashes');
    const cuts = breaks === null ? '' : `${name(breaks.to)} cuts across ${inline(name(breaks.from))}`;
    const strain = clashes === null ? '' : `${inline(name(clashes.from))} and ${inline(name(clashes.to))} do not sit easily together`;
    switch (stance) {
        case 'qualified': return `${lead} mostly run one way, but ${cuts}. The break matters more than the stretch around it.`;
        case 'contradictory': return `${lead} do not make one smooth line: ${strain}.`;
        case 'mixed': return `${lead} do not run as one smooth line: ${cuts}, and ${strain}.`;
        default: return arcSentence(plan, lead);
    }
}
/** What deserves attention, said as a proposition about the situation and anchored to the card it comes from. */
const riskSentence = (name, cardId, seed) => {
    const risk = TAROT_RISKS_EN[cardId];
    return choose([
        `With ${inline(name)}, the risk is ${risk}.`,
        `The risk with ${inline(name)} is ${risk}.`,
    ], `${cardId}|${seed}|risk`);
};
/** How the third card stands to the first two, said only where the relation asserts something concrete; '' otherwise. */
function guidanceSaying(plan, subject = 'it') {
    if (isReversed(plan, 2))
        return { text: '', edge: null };
    const inner = sentenceBetween(plan, 1, 2, { use: 'plain', subject });
    const outer = sentenceBetween(plan, 0, 2, { use: 'plain', subject });
    const CLEAR = new Set(['answer', 'release', 'integration', 'exposure', 'contrast']);
    /* A change of what matters between the second and third cards is the clearest thing to say about how the way through stands to what came before. */
    const innerShifts = shiftsFocus(inner.pair, discourseCard(plan, 1), discourseCard(plan, 2));
    if (innerShifts)
        return { text: inner.text, edge: [1, 2] };
    if (CLEAR.has(outer.pair.relation))
        return { text: outer.text, edge: outer.text === '' ? null : [0, 2] };
    if (CLEAR.has(inner.pair.relation))
        return { text: inner.text, edge: inner.text === '' ? null : [1, 2] };
    return { text: '', edge: null };
}
export const guidanceRelation = (plan, subject = 'it') => guidanceSaying(plan, subject).text;
/**
 * WHAT IS PRESENT, AND WHAT SHAPES IT, IN ONE SENTENCE.
 *
 * Said from the positions, so it needs no relation between the two cards to claim anything: the first card is what is most present, the second is what
 * shapes it. A summary that has no relation to say still says what shapes the situation - dropping the middle card whenever the pair was silent was how
 * the short reading came to be the first card plus the advice. Where the middle card only says again what the first said, it is left out, and that is
 * the whole of the exception.
 */
export function presentAndShaping(plan) {
    const [present, shaping] = [thingOf(plan, 0), thingOf(plan, 1)];
    if (addsNothingTo(present, shaping))
        return `What is most present is ${present}.`;
    /* Two sentences when the two phrases are long, or when one already holds the relation the one-sentence frames add ("skilled work shaped by shared standards, shaped by ..."). */
    if (present.length + shaping.length > 150 || carriesARelation(present, shaping))
        return `What is most present is ${present}. What shapes it is ${shaping}.`;
    return choose([
        `What is most present is ${present}, and what shapes it is ${shaping}.`,
        `What is most present is ${present}, shaped by ${shaping}.`,
        `What is most present is ${present}, and it is shaped by ${shaping}.`,
    ], `${plan.cardIds.join('|')}|present`);
}
const EN_SECTIONS = {
    opening: (plan) => {
        const base = [0, 1, 2].map((i) => cardTitles[plan.cardIds[i]]);
        /* A reversal is explained only where it would be misread (tarotCoherenceEn.ts); an ordinary reversed card is simply read as itself. */
        const note = reversalClarification([0, 1, 2].map((i) => ({
            id: plan.cardIds[i], name: cardTitles[plan.cardIds[i]], reversed: isReversed(plan, i),
        })));
        return [
            structureSentence(plan, `Read together, ${upperFirst(base[0])}, ${base[1]} and ${base[2]}`),
            note,
            ...plan.modifiers.map((entry) => MODIFIER_LINE[entry]).filter(Boolean),
        ].filter(Boolean).join(' ');
    },
    /** The first card, read as the place things stand, and how steady that is. */
    energy: (plan) => `${cardLine(plan, 0, 'state')} ${stabilityLine(plan)}`,
    /** What the first card becomes with the second, where the pair has something to say, then what the second says is underneath. */
    factor: (plan) => {
        const relation = sentenceBetween(plan, 0, 1).text;
        const line = cardLine(plan, 1, 'driver');
        const name = title(plan, 1);
        /* The sentence before is about this card, so the line that follows it does not name it again. */
        const continued = relation.startsWith(name);
        return `${relation}${relation === '' ? '' : ' '}${continued && line.startsWith(name) ? `It${line.slice(name.length)}` : continued ? line.replace(`Underneath this, ${inline(name)} `, 'Underneath this, it ') : line}`;
    },
    /** The third card as the way through, and, where the pair says something, how it stands to what came before. */
    guidance: (plan) => {
        const id = plan.cardIds[2];
        const line = cardLine(plan, 2, 'response');
        if (isReversed(plan, 2)) {
            /* The reversed card is the guidance as itself: its own useful move, what it points to, and what to watch - not the upright advice, then a correction. */
            const stake = TAROT_REVERSED_STAKES_EN[id];
            /* A risk that only says the stake again is left out: the same proposition twice in two sentences is one thought told twice. */
            const risk = restates(stake, TAROT_RISKS_EN[id]) ? '' : ` ${riskSentence(title(plan, 2), id, 'guidance')}`;
            return `${line} Reversed, it points to ${stake}.${risk}`;
        }
        const relation = guidanceRelation(plan);
        return relation === '' ? line : `${line} ${relation}`;
    },
    /**
     * A compact reading: what is present TOGETHER WITH what shapes it, how a strong relation reaches the way through, what the last card asks, and what to watch.
     *
     * The first two cards are said in one sentence and the middle card is never left out for want of a relation to say: where the pair asserts something
     * concrete that is the sentence, and where it asserts nothing the position itself is what is claimed - the middle card is "what shapes it" - so the
     * summary changes when the middle card changes. The one exception is a middle card that only says again what the first has said (addsNothingTo).
     */
    inShort: (plan) => {
        /* The factor section has said how the first two cards stand; the short reading never says the same sentence twice, and never says the same pair again in other words. */
        const said = sentenceBetween(plan, 0, 1).text;
        const guiding = guidanceSaying(plan, 'name');
        const guided = guiding.text;
        const wording = (from, to, keep = () => true) => ['short', 'short-b', 'short-c', 'short-d', 'short-e', 'short-f', 'short-g', 'short-h']
            .map((salt) => sentenceBetween(plan, from, to, { salt, forceStakes: true }).text).find((candidate) => candidate !== said && candidate !== guided && candidate !== '' && keep(candidate))
            ?? [sentenceBetween(plan, from, to, { use: 'names', salt: 'short' }).text].find((candidate) => keep(candidate)) ?? '';
        const worthOf = (from, to) => {
            const pair = classifyTarotPair(PLACES[from], PLACES[to], orientedAt(plan, from), orientedAt(plan, to), { semantic: true });
            /* A pair that skips the middle card says a little less about the day than two that are next to each other. */
            return relationWeight(pair, discourseCard(plan, from), discourseCard(plan, to)) - (to - from > 1 ? 1 : 0);
        };
        /* Three cards at a beginning, a stretch of work and a culmination are the movement of the day, and say more than any one pair. */
        const stages = stagesSentence([0, 1, 2].map((index) => discourseCard(plan, index)));
        const [present, shaping] = [thingOf(plan, 0), thingOf(plan, 1)];
        const middleName = cardTitles[plan.cardIds[1]];
        /* The most informative thing the cards say to one another, as before: a change of focus, a break, a release, an answer, a contrast. */
        let carrier = stages;
        let reach = '';
        /* A middle card that only says again what the first card said is left out, and that is the whole of the exception: no pair sentence is built on it either,
           because such a sentence would quote the same proposition twice. */
        if (carrier === null && addsNothingTo(present, shaping))
            carrier = `What is most present is ${present}.`;
        else if (carrier === null) {
            let weight = 0;
            let chosen = null;
            for (const edge of [[1, 2], [0, 1], [0, 2]]) {
                const worth = worthOf(edge[0], edge[1]);
                if (worth <= weight)
                    continue;
                /* A pair that has the middle card in it only counts if the sentence says that card (or what it puts forward): a wording that leaves it out is not the middle card's. */
                const skipsMiddle = edge[0] === 0 && edge[1] === 2;
                const text = wording(edge[0], edge[1], (candidate) => skipsMiddle || candidate.includes(shaping) || candidate.includes(middleName) || candidate.includes(inline(middleName)));
                if (text === '' || text === said || text === guided)
                    continue;
                carrier = text;
                chosen = edge;
                weight = worth;
            }
            /* Whatever pair was chosen, the summary must still carry the first card, the middle card and the way through: the pair that skips a card gets that card said
               beside it, and with no pair to say, the positions say it (the first card is what is most present, the middle card is what shapes it). */
            if (chosen === null)
                carrier = presentAndShaping(plan);
            else if (chosen[0] === 1)
                carrier = `What is most present is ${present}. ${carrier}`;
            else if (chosen[0] === 0 && chosen[1] === 2 && !addsNothingTo(present, shaping) && !carrier.includes(shaping))
                reach = `What shapes it is ${shaping}.`;
        }
        const movement = [carrier, reach].filter(Boolean).join(' ');
        const advice = `As guidance, ${title(plan, 2)} asks you ${asksOf(plan, 2)}.`;
        const cost = plan.cost;
        const costIndex = cost ? plan.cardIds.findIndex((id) => id === cost.id) : -1;
        /* The guidance card's own risk is said in the guidance section when it is reversed; it is not said again here. */
        /* ...nor is a risk said after the card's own stake has just been quoted in the movement above, when the risk only says that stake again. */
        const restated = cost !== null && costIndex >= 0 && isReversed(plan, costIndex)
            && restates(TAROT_REVERSED_STAKES_EN[cost.id], TAROT_RISKS_EN[cost.id])
            && movement.includes(TAROT_REVERSED_STAKES_EN[cost.id]);
        const watch = cost && costIndex >= 0 && !(isReversed(plan, 2) && costIndex === 2) && !restated
            ? ` ${riskSentence(title(plan, costIndex), cost.id, 'short')}`
            : '';
        return `${movement} ${advice}${watch}`;
    },
};
/** Every section goes through one pass that lowers a Major's "The" where a title lands inside a sentence. */
const tidy = (section) => (plan) => lowerMidArticle(section(plan));
export const TAROT_VOICE_EN = {
    cards: TAROT_CARD_VOICE_EN,
    cardTitles,
    orientation: ORIENTATION_VOICE_EN,
    jumper: JUMPER_VOICE_EN,
    jumperSection: (plan) => lowerMidArticle(JUMPER_VOICE_EN.render(plan)),
    sectionTitles: {
        opening: 'The shape of it',
        energy: 'What is most present',
        factor: 'What is shaping it',
        guidance: 'What it points towards',
        jumper: 'The card that jumped',
        'in-short': 'In short',
    },
    opening: tidy(EN_SECTIONS.opening),
    energy: tidy(EN_SECTIONS.energy),
    factor: tidy(EN_SECTIONS.factor),
    guidance: tidy(EN_SECTIONS.guidance),
    inShort: tidy(EN_SECTIONS.inShort),
};
