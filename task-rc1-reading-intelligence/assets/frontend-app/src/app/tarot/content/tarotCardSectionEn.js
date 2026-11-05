import { tarotCardDetailText } from './detail/tarotCardDetail.js?v=8ca9351';
import { READER_CARDS } from './reader/readerCards.js?v=8ca9351';
import { areaStakeOf } from './reader/readerAreaStakesEn.js?v=8ca9351';
import { areaReadingOf } from './reader/readerAreaReadingsEn.js?v=8ca9351';
import { TAROT_REVERSED_ASKS_EN, TAROT_REVERSED_STAKES_EN, TAROT_RISKS_EN } from './reader/readerReversedStakesEn.js?v=8ca9351';
import { TAROT_CARD_VOICE_EN } from './tarotCardVoiceEn.js?v=8ca9351';
import { buildTarotCardTitles, TAROT_TITLE_LEXICON_EN } from './tarotCardTitles.js?v=8ca9351';
import { choose, inline, numberOf, upperFirst } from './tarotDiscourseEn.js?v=8ca9351';
import { restates } from './tarotCoherenceEn.js?v=8ca9351';
import { kindOf, kindParagraph, metaLineOf, RANK_NAME } from './tarotCardKindEn.js?v=8ca9351';
import { auditReadingText } from '../question/questionEpistemics.js?v=8ca9351';
const TITLES = buildTarotCardTitles(TAROT_TITLE_LEXICON_EN);
export const cardNameOf = (cardId) => TITLES[cardId] ?? cardId;
const titleOf = (cardId, orientation) => (orientation === 'reversed' ? `${cardNameOf(cardId)} reversed` : cardNameOf(cardId));
/** What a card puts forward in a place, as a bare noun phrase: its stake upright, what it amounts to reversed; read for the question's area where the card has a reading for it. */
export const stakeOf = (cardId, orientation, area, place) => areaStakeOf(cardId, orientation, area, place) ?? (orientation === 'reversed' ? TAROT_REVERSED_STAKES_EN[cardId] : READER_CARDS[cardId].en.stake);
/** What a card asks of a person, as a phrase that follows "is" or "asks you"; what it asks in the question's area where the card has a reading for it (readerAreaReadingsEn.ts). */
export const askOf = (cardId, orientation, area, place) => areaReadingOf(cardId, orientation, area, place)?.ask ?? (orientation === 'reversed' ? TAROT_REVERSED_ASKS_EN[cardId] : TAROT_CARD_VOICE_EN[cardId].asks);
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
/** An ask without its "to", as an instruction that follows a colon. */
const bareAsk = (ask) => ask.replace(/^to\s+/i, '').replace(/\.$/, '').replace(/ and to /g, ' and ');
const FRAMES = {
    energy: ({ pos, name, stake }, v) => [
        `In the ${pos} position, ${name} shows what is most present right now: ${stake}.`,
        `As the ${pos} card, ${name} stands for what is most present right now: ${stake}.`,
        `${upperFirst(name)} sits in the ${pos} position, which is about what is most present right now: ${stake}.`,
    ][v % 3],
    state: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows where things actually stand: ${stake}.`,
    origin: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what has shaped this and is still carried into it: ${stake}.`,
    driver: ({ pos, name, stake }, v) => [
        `In the ${pos} position, ${name} points to what is shaping the situation from underneath: ${stake}.`,
        `As the ${pos} card, ${name} stands for what shapes the situation from underneath: ${stake}.`,
        `${upperFirst(name)} sits in the ${pos} position, which is about what works beneath the surface: ${stake}.`,
    ][v % 3],
    response: ({ pos, name, ask }, v) => (/^to /i.test(ask) ? [
        `In the ${pos} position, ${name} suggests that what helps here is ${ask}.`,
        `As the ${pos} card, ${name} offers a way forward: ${bareAsk(ask)}.`,
        `${upperFirst(name)} in the ${pos} position points to what would help: ${bareAsk(ask)}.`,
    ][v % 3] : `In the ${pos} position, ${name} suggests that what helps here is ${ask}.`),
    direction: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows where this tends if the present pattern continues: ${stake}.`,
    option: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what this path holds: ${stake}.`,
    criterion: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what the choice really turns on: ${stake}.`,
    other: ({ pos, name, stake }) => `In the ${pos} position, ${name} describes the other side's part as ${stake}. That is a posture, not a claim about what the other side privately thinks or feels.`,
    meeting: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what lies between you: ${stake}.`,
    /* "Bodily" is the place's own word for a question about oneself or about nothing in particular; a question about work or about a bond is shown in what is done. */
    embodied: ({ pos, name, stake, area }) => (area === 'work' || area === 'relationships'
        ? `In the ${pos} position, ${name} shows how this appears in practice, in what is actually done: ${stake}.`
        : `In the ${pos} position, ${name} shows how this appears in practical, bodily terms: ${stake}.`),
    mental: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows how this is held in thought and feeling: ${stake}.`,
    meaning: ({ pos, name, stake }) => `In the ${pos} position, ${name} points to what this is about underneath: ${stake}.`,
    supporting: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what supports this: ${stake}.`,
    resisting: ({ pos, name, stake }) => `In the ${pos} position, ${name} shows what works against it: ${stake}.`,
    focus: ({ name, stake, ask }) => `${upperFirst(name)} is the single card for your question. It points to ${stake}, and what it asks of you is ${ask}.`,
};
/**
 * WHAT THE PLACE DOES WITH A CARD WHOSE AREA MEANING HAS JUST BEEN SAID.
 *
 * Read for an area, the card's meaning sentence already says what it puts forward there ("Between people it is closeness held in place by need ...");
 * the position then says only what the place makes of it, so the same thing is not said twice in a row. A place that gives advice still says what the
 * card asks there: that is not what it puts forward.
 */
const FRAMES_SAID = {
    energy: ({ pos, name }) => `In the ${pos} position, ${name} shows what is most present right now.`,
    state: ({ pos, name }) => `In the ${pos} position, ${name} shows where things actually stand.`,
    origin: ({ pos, name }) => `In the ${pos} position, ${name} shows what has shaped this and is still carried into it.`,
    driver: ({ pos, name }) => `In the ${pos} position, ${name} points to what shapes the situation from underneath.`,
    direction: ({ pos, name }) => `In the ${pos} position, ${name} shows where this tends if the present pattern continues.`,
    option: ({ pos, name }) => `In the ${pos} position, ${name} shows what this path holds.`,
    criterion: ({ pos, name }) => `In the ${pos} position, ${name} shows what the choice really turns on.`,
    other: ({ pos, name }) => `In the ${pos} position, ${name} describes the other side's part in these terms. That is a posture, not a claim about what the other side privately thinks or feels.`,
    meeting: ({ pos, name }) => `In the ${pos} position, ${name} shows what lies between you.`,
    embodied: ({ pos, name, area }) => (area === 'work' || area === 'relationships'
        ? `In the ${pos} position, ${name} shows how this appears in practice, in what is actually done.`
        : `In the ${pos} position, ${name} shows how this appears in practical, bodily terms.`),
    mental: ({ pos, name }) => `In the ${pos} position, ${name} shows how this is held in thought and feeling.`,
    meaning: ({ pos, name }) => `In the ${pos} position, ${name} points to what this is about underneath.`,
    supporting: ({ pos, name }) => `In the ${pos} position, ${name} shows what supports this.`,
    resisting: ({ pos, name }) => `In the ${pos} position, ${name} shows what works against it.`,
    focus: ({ name, ask }) => `${upperFirst(name)} is the single card for your question, and what it asks of you is ${ask}.`,
};
/** Whether the card's meaning paragraph is its reading for the question's area (and so has said what it puts forward there). */
export const readForArea = (cardId, orientation, area, place) => !!area && areaReadingOf(cardId, orientation, area, place) !== null;
/** The sentence about the position and what the card puts in it. The name sits mid-sentence ("the Tower"). */
export function positionSentence(position, cardId, orientation, area) {
    const title = titleOf(cardId, orientation);
    if (position.fn !== 'response' && readForArea(cardId, orientation, area, position.fn)) {
        if (position.gloss && position.fn !== 'other' && position.fn !== 'focus')
            return `In the ${position.name} position, ${inline(title)} ${position.gloss}.`;
        return FRAMES_SAID[position.fn]({
            pos: position.name, name: position.fn === 'focus' ? title : inline(title), stake: '', ask: askOf(cardId, orientation, area, position.fn), area,
        });
    }
    /* A place whose function alone would say something slightly off (the visible problem, your own part) says what the card does there in its own words. */
    if (position.gloss && position.fn !== 'response' && position.fn !== 'other' && position.fn !== 'focus') {
        return `In the ${position.name} position, ${inline(title)} ${position.gloss}: ${stakeOf(cardId, orientation, area, position.fn)}.`;
    }
    /* The place's wording is one of three, picked by the card and the place (never a clock), so the frame is not the same sentence in every reading. */
    return FRAMES[position.fn]({
        pos: position.name,
        name: position.fn === 'focus' ? title : inline(title),
        stake: stakeOf(cardId, orientation, area, position.fn),
        ask: askOf(cardId, orientation, area, position.fn),
        area,
    }, numberOf(`${cardId}|${orientation}|${position.id}|frame`));
}
/**
 * WHY IT MATTERS, AS THE CARD'S OWN STRENGTH AND COST.
 *
 * An upright card is given at its best and at its worst, in its own phrases; a reversed card in the risk it carries, because its stake already says what it
 * amounts to turned round. Three wordings, picked by the card and the place, so the same sentence is not under every card of a reading.
 */
export function worthSentence(position, cardId, orientation, used) {
    const seed = `${cardId}|${orientation}|${position.id}|worth`;
    /* One frame is not used twice in one reading: a later card takes the next wording, so three cards do not each say "Done well ... Done badly". */
    const pickFree = (options, family) => {
        const start = numberOf(seed) % options.length;
        for (let step = 0; step < options.length; step += 1) {
            const index = (start + step) % options.length;
            const key = `${family}${index}`;
            if (!used || !used.has(key)) {
                used?.add(key);
                return options[index];
            }
        }
        return options[start];
    };
    if (orientation === 'reversed') {
        const risk = riskOf(cardId);
        return pickFree([`The risk is ${risk}.`, `The thing to guard against is ${risk}.`, `Watch for ${risk}.`], 'r');
    }
    const voice = TAROT_CARD_VOICE_EN[cardId];
    return pickFree([
        `At its best this ${voice.constructive}; the thing to watch is that it ${voice.difficult}.`,
        `The useful side is that it ${voice.constructive}; the cost is that it ${voice.difficult}.`,
        `Done well, this ${voice.constructive}. Done badly, it ${voice.difficult}.`,
        `When it goes well, this ${voice.constructive}. When it does not, it ${voice.difficult}.`,
        `Its strength is that it ${voice.constructive}; its weakness is that it ${voice.difficult}.`,
    ], 'u');
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
/**
 * READ FOR THE QUESTION'S AREA, where the card has a reading for it: the card's own one-line essence (so it stays the card a reader knows), then where its
 * weight falls in that area (readerAreaReadingsEn.ts), in place of the detail paragraph that was written to hold for any question. The area lines open
 * on a few plain words ("In work it is"); a later card of the same reading takes another opener, so three cards do not each begin alike.
 */
const OPENERS = {
    work: { match: /^In work it is /, variants: ['In work it is ', 'At work it is ', 'Read for work, it is '] },
    relationships: { match: /^Between people it is /, variants: ['Between people it is ', 'In a relationship it is ', 'Read for a relationship, it is '] },
    self: { match: /^For yourself it is /, variants: ['For yourself it is ', 'Turned toward yourself, it is ', 'In your own life it is '] },
};
function areaMeaning(cardId, area, meaning, openers) {
    const { match, variants } = OPENERS[area];
    if (!match.test(meaning))
        return meaning;
    const start = numberOf(`${cardId}|${area}|opener`) % variants.length;
    const free = [0, 1, 2].map((step) => variants[(start + step) % variants.length]).find((variant) => !openers.has(variant)) ?? variants[start];
    openers.add(free);
    return meaning.replace(match, free);
}
function meaningParagraph(cardId, orientation, area, place, openers) {
    const reading = area ? areaReadingOf(cardId, orientation, area, place) : null;
    if (area && reading)
        return `${READER_CARDS[cardId].en.essence} ${areaMeaning(cardId, area, reading.meaning, openers ?? new Set())}`;
    const detail = tarotCardDetailText(cardId, orientation) ?? '';
    const essence = READER_CARDS[cardId].en.essence;
    const usable = detail !== '' && auditReadingText(detail, 'en').length === 0;
    if (orientation === 'upright')
        return usable ? detail : essence;
    return (usable ? `${essence} ${detail}` : `${essence} Reversed, the strain in all of that comes to the front, not the support it gives.`).replace(/\s+/g, ' ').trim();
}
/** The card's own best and worst, or its reversed risk, worded in the terms of a workplace or of money ("an offer", "funds or backing"). */
const WORK_WORDED = /\b(?:the work|lets work|rather than working|instead of working|an offer|offers?|funds|backing|colleagues?|the job|career)\b/;
/** Whether a card read for an area other than work, through its own reading for that area, would then name its strength and cost as work. */
function offArea(cardId, orientation, area, place) {
    if (!area || area === 'work' || areaStakeOf(cardId, orientation, area, place) === null)
        return false;
    const voice = TAROT_CARD_VOICE_EN[cardId];
    const words = orientation === 'reversed' ? [riskOf(cardId)] : [voice.constructive, voice.difficult];
    return words.some((phrase) => WORK_WORDED.test(phrase));
}
/** One card's full section. `ledger` records what has already been explained, so a later card does not say it again. */
export function composeCardSection(input, ledger) {
    const { position, cardId, orientation, area, areas } = input;
    const title = titleOf(cardId, orientation);
    const both = !area && areas ? areas.filter((each) => areaReadingOf(cardId, orientation, each, position.fn) !== null) : [];
    const meaning = both.length > 0
        ? [READER_CARDS[cardId].en.essence, ...both.map((each) => areaMeaning(cardId, each, areaReadingOf(cardId, orientation, each, position.fn).meaning, ledger.openers))].join(' ')
        : meaningParagraph(cardId, orientation, area, position.fn, ledger.openers);
    const kind = kindOf(cardId);
    const first = kindParagraph(cardId, cardNameOf(cardId), ledger, meaning);
    const rank = kind?.family === 'court' && kind.rank ? RANK_NAME[kind.rank].toLowerCase() : null;
    const placed = positionSentence(position, cardId, orientation, area);
    /* A card read for a relationship or for oneself does not then name its best and worst in the terms of a workplace ("gets the work delivered"): its area reading has said what it shows there. */
    const worth = offArea(cardId, orientation, area, position.fn) ? '' : worthSentence(position, cardId, orientation, ledger.worthUsed);
    if (orientation === 'reversed' && worth !== '' && !restates(placed, worth))
        ledger.risksSaid.add(cardId);
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
