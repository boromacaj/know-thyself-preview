import { tarotCardDetailText } from './detail/tarotCardDetail.js?v=53c0693';
import { READER_CARDS } from './reader/readerCards.js?v=53c0693';
import { TAROT_REVERSED_ASKS_EN, TAROT_REVERSED_STAKES_EN, TAROT_RISKS_EN } from './reader/readerReversedStakesEn.js?v=53c0693';
import { TAROT_CARD_VOICE_EN } from './tarotCardVoiceEn.js?v=53c0693';
import { buildTarotCardTitles, TAROT_TITLE_LEXICON_EN } from './tarotCardTitles.js?v=53c0693';
import { choose, inline, upperFirst } from './tarotDiscourseEn.js?v=53c0693';
import { restates } from './tarotCoherenceEn.js?v=53c0693';
import { kindOf, kindParagraph, metaLineOf, RANK_NAME } from './tarotCardKindEn.js?v=53c0693';
import { auditReadingText } from '../question/questionEpistemics.js?v=53c0693';
const TITLES = buildTarotCardTitles(TAROT_TITLE_LEXICON_EN);
export const cardNameOf = (cardId) => TITLES[cardId] ?? cardId;
const titleOf = (cardId, orientation) => (orientation === 'reversed' ? `${cardNameOf(cardId)} reversed` : cardNameOf(cardId));
/** What a card puts forward in a place, as a bare noun phrase: its stake upright, what it amounts to reversed. */
export const stakeOf = (cardId, orientation) => (orientation === 'reversed' ? TAROT_REVERSED_STAKES_EN[cardId] : READER_CARDS[cardId].en.stake);
/** What a card asks of a person, as a phrase that follows "is" or "asks you". */
export const askOf = (cardId, orientation) => (orientation === 'reversed' ? TAROT_REVERSED_ASKS_EN[cardId] : TAROT_CARD_VOICE_EN[cardId].asks);
/** The one question the card poses, written to be asked of oneself. */
export const questionOf = (cardId) => READER_CARDS[cardId].en.question;
/** What deserves attention when the card's harder side shows, as a phrase that completes "The risk is ...". */
export const riskOf = (cardId) => TAROT_RISKS_EN[cardId];
/**
 * WHAT A PLACE ASKS OF THE CARD IN IT, SAID IN FULL.
 *
 * Every frame names the position and says what the place is for before it says what the card puts there, so a reader never has to work out why a card
 * matters where it is. The stake is a bare noun phrase after a colon and the ask a verb phrase after "is", the two forms the Reader's phrases are written in.
 */
const FRAMES = {
    energy: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what is most present in this situation right now: ${stake}.`,
    state: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows where things actually stand: ${stake}.`,
    origin: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what has shaped this and is still carried into it: ${stake}.`,
    driver: ({ pos, name, stake }) => `In the ${pos} position, ${name} points to what is shaping the situation from underneath: ${stake}.`,
    response: ({ pos, name, ask }) => `In the ${pos} position, ${name} suggests that what helps here is ${ask}.`,
    direction: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows where this tends if the present pattern continues: ${stake}.`,
    option: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what this path holds: ${stake}.`,
    criterion: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what the choice really turns on: ${stake}.`,
    other: ({ pos, name, stake }) => `In the ${pos} position, ${name} describes the other side's part as ${stake}. That is a posture, not a claim about what they privately think or feel.`,
    meeting: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what lies between you: ${stake}.`,
    embodied: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows how this appears in practical, bodily terms: ${stake}.`,
    mental: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows how this is held in thought and feeling: ${stake}.`,
    meaning: ({ pos, name, stake }) => `In the ${pos} position, ${name} points to what this is about underneath: ${stake}.`,
    supporting: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what supports this: ${stake}.`,
    resisting: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what works against it: ${stake}.`,
    focus: ({ name, stake, ask }) => `${upperFirst(name)} is the single card for your question. It points to ${stake}, and what it asks of you is ${ask}.`,
};
/** The sentence about the position and what the card puts in it. The name sits mid-sentence ("the Tower"). */
export function positionSentence(position, cardId, orientation) {
    const title = titleOf(cardId, orientation);
    /* A place whose function alone would say something slightly off (the visible problem, your own part) says what the card does there in its own words. */
    if (position.gloss && position.fn !== 'response' && position.fn !== 'other' && position.fn !== 'focus') {
        return `In the ${position.name} position, ${inline(title)} ${position.gloss}: ${stakeOf(cardId, orientation)}.`;
    }
    return FRAMES[position.fn]({
        pos: position.name,
        name: position.fn === 'focus' ? title : inline(title),
        stake: stakeOf(cardId, orientation),
        ask: askOf(cardId, orientation),
    });
}
/**
 * WHY IT MATTERS, AS THE CARD'S OWN STRENGTH AND COST.
 *
 * An upright card is given at its best and at its worst, in its own phrases; a reversed card in the risk it carries, because its stake already says what it
 * amounts to turned round. Three wordings, picked by the card and the place, so the same sentence is not under every card of a reading.
 */
export function worthSentence(position, cardId, orientation) {
    const seed = `${cardId}|${orientation}|${position.id}|worth`;
    if (orientation === 'reversed') {
        const risk = riskOf(cardId);
        return choose([`The risk is ${risk}.`, `What deserves attention is ${risk}.`, `Watch for ${risk}.`], seed);
    }
    const voice = TAROT_CARD_VOICE_EN[cardId];
    return choose([
        `At its best this ${voice.constructive}; the thing to watch is that it ${voice.difficult}.`,
        `The useful side is that it ${voice.constructive}; the cost is that it ${voice.difficult}.`,
        `Done well, this ${voice.constructive}. Done badly, it ${voice.difficult}.`,
    ], seed);
}
/* ------------------------------------------------------------- the court -- */
/**
 * HOW A COURT CARD IS READ IN A PLACE.
 *
 * A court card is not automatically a person. In a place for the other side it may be one; in a place for your own part it is a quality of yours; in a place
 * for guidance it is a way of acting you can take up; elsewhere it is a way something is being carried out.
 */
function courtSentence(position, rank, seed, said) {
    const say = (variants) => {
        const fresh = variants.filter((variant) => !said.has(variant));
        const chosen = choose(fresh.length > 0 ? fresh : variants, seed);
        said.add(chosen);
        return chosen;
    };
    if (position.fn === 'other') {
        return say([
            `The ${rank} may stand for a person, a role or simply a way of acting; the cards do not say which.`,
            `Whether the ${rank} is someone, a role or only a manner of behaving, the cards leave open.`,
        ]);
    }
    if (position.id === 'self') {
        return say([
            `Here the ${rank} stands for something in you, not for another person.`,
            `The ${rank} is better read here as a quality in you than as anyone else.`,
        ]);
    }
    if (position.fn === 'response') {
        return say([
            `As guidance, the ${rank} describes a way of acting you can take up, not a person you need to find.`,
            `Read as guidance, the ${rank} is a manner you can adopt rather than someone to look for.`,
        ]);
    }
    return say([
        `Here the ${rank} reads as a way of acting rather than as a particular person.`,
        `In this place the ${rank} describes how something is done, not who does it.`,
        `The ${rank} is best taken here as a manner of acting rather than as someone to identify.`,
    ]);
}
/* ------------------------------------------------------------ the section -- */
/**
 * WHAT THE CARD IS, AND WHAT THE WAY UP CHANGES: the card's own detail paragraph upright; its essence and then what reversal does when reversed.
 *
 * A card's detail paragraph was written for the card dialog, which is not held to what a reading must never say. Where one holds a phrase the epistemic audit forbids (the two
 * Ten of Pentacles paragraphs, which name wealth and inheritance as what the card is about), the card is said from its essence instead and, reversed, from what it amounts to
 * reversed. The audit stays the one definition of "forbidden"; no card's text is edited.
 */
function meaningParagraph(cardId, orientation) {
    const detail = tarotCardDetailText(cardId, orientation) ?? '';
    const essence = READER_CARDS[cardId].en.essence;
    const usable = detail !== '' && auditReadingText(detail, 'en').length === 0;
    if (orientation === 'upright')
        return usable ? detail : essence;
    return (usable ? `${essence} ${detail}` : `${essence} Reversed, the strain in all of that comes to the front, not the support it gives.`).replace(/\s+/g, ' ').trim();
}
/** One card's full section. `ledger` records what has already been explained, so a later card does not say it again. */
export function composeCardSection(input, ledger) {
    const { position, cardId, orientation } = input;
    const title = titleOf(cardId, orientation);
    const meaning = meaningParagraph(cardId, orientation);
    const kind = kindOf(cardId);
    const first = kindParagraph(cardId, cardNameOf(cardId), ledger, meaning);
    const rank = kind?.family === 'court' && kind.rank ? RANK_NAME[kind.rank].toLowerCase() : null;
    const placed = positionSentence(position, cardId, orientation);
    const worth = worthSentence(position, cardId, orientation);
    const application = [
        placed,
        rank === null ? '' : courtSentence(position, rank, `${cardId}|${position.id}|court`, ledger.courtSaid),
        /* A sentence about what to watch for that only says the one before it again (a reversed card whose ask and risk are the same thought) is left out. */
        restates(placed, worth) ? '' : worth,
    ].filter((part) => part.length > 0).join(' ');
    const paragraphs = [first, meaning, application].filter((part) => part.length > 0);
    return {
        positionId: position.id,
        positionName: position.name,
        cardId,
        cardName: cardNameOf(cardId),
        orientation,
        title,
        meta: metaLineOf(cardId),
        paragraphs,
        text: paragraphs.join('\n\n'),
    };
}
