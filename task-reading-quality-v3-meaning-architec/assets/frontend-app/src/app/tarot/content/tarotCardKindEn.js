import { getTarotCard } from '../data/tarotDeck.js';
import { choose } from './tarotDiscourseEn.js';
export function kindOf(cardId) {
    const card = getTarotCard(cardId);
    if (!card)
        return null;
    if (card.arcana === 'major')
        return { family: 'major', suit: null, rank: null, majorNumber: card.majorNumber ?? null };
    const court = card.rank === 'page' || card.rank === 'knight' || card.rank === 'queen' || card.rank === 'king';
    return { family: court ? 'court' : 'minor', suit: card.suit ?? null, rank: card.rank ?? null, majorNumber: null };
}
const ROMAN = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
function roman(value) {
    if (value === 0)
        return '0';
    let rest = value;
    let out = '';
    for (const [size, glyph] of ROMAN)
        while (rest >= size) {
            out += glyph;
            rest -= size;
        }
    return out;
}
export const SUIT_NAME = { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' };
/** Each suit as what it is about, in the words a person would use. */
const SUIT_GLOSS = {
    cups: 'the suit of feeling, relationships, receptivity and imagination',
    swords: 'the suit of thinking, communication, decisions and conflict',
    wands: 'the suit of drive, initiative, desire and creative momentum',
    pentacles: 'the suit of work, resources, the body and what is built to last',
};
/** The one word a repeated suit is said to be about. */
const SUIT_AREA = {
    cups: 'feeling and connection', swords: 'thought and decision', wands: 'drive and initiative', pentacles: 'practical life and what lasts',
};
export const RANK_NAME = {
    ace: 'Ace', two: 'Two', three: 'Three', four: 'Four', five: 'Five', six: 'Six', seven: 'Seven', eight: 'Eight', nine: 'Nine', ten: 'Ten',
    page: 'Page', knight: 'Knight', queen: 'Queen', king: 'King',
};
const ARTICLE = {
    ace: 'an', two: 'a', three: 'a', four: 'a', five: 'a', six: 'a', seven: 'a', eight: 'an', nine: 'a', ten: 'a', page: 'a', knight: 'a', queen: 'a', king: 'a',
};
/** What a number means in the life of a suit, as a clause that follows "As a Four,". The same for every suit; the suit says what it is a stage OF. */
const NUMBER_STAGE = {
    ace: 'it marks a beginning: potential that has not yet taken shape.',
    two: 'it concerns a first balance or a choice between two things: it is no longer a single impulse.',
    three: 'it concerns the first result of a union or an effort.',
    four: 'it concerns consolidation: holding, resting on or guarding what has been built, sometimes more tightly than is useful.',
    five: 'it concerns strain and adjustment: the point where things stop being smooth and something has to be faced.',
    six: 'it concerns recovery and exchange: things moving back towards balance, with something given and something received.',
    seven: 'it concerns a test: a position or an effort being checked, defended or doubted.',
    eight: 'it concerns effort in motion: work or change gathering pace.',
    nine: 'it is close to completion: much has been gained or endured, with a last stretch and sometimes a cost.',
    ten: 'it is the end of a cycle: something fully built, and sometimes weighed down by being so.',
    page: 'it is the early stage of its suit: curiosity, a message, a first attempt, a quality that is still forming.',
    knight: 'it is its suit in motion: pursuit, commitment to a direction and the manner in which that movement is carried out.',
    queen: 'it is its suit held from within: a mature, inward and relational way of handling that area.',
    king: 'it is its suit held outwardly: mastery, responsibility and steering that area for others as well as for yourself.',
};
/** The compact line under a card's name: "Minor Arcana · Cups · Court card: Page", "Major Arcana · XVI". Information, not a table. */
export function metaLineOf(cardId) {
    const kind = kindOf(cardId);
    if (!kind)
        return '';
    if (kind.family === 'major')
        return kind.majorNumber === null ? 'Major Arcana' : `Major Arcana · ${roman(kind.majorNumber)}`;
    const suit = kind.suit ? SUIT_NAME[kind.suit] : '';
    const rank = kind.rank ? RANK_NAME[kind.rank] : '';
    return kind.family === 'court' ? `Minor Arcana · ${suit} · Court card: ${rank}` : `Minor Arcana · ${suit} · ${rank}`;
}
export function newKindLedger(cardIds) {
    return {
        majorsTotal: cardIds.filter((id) => kindOf(id)?.family === 'major').length,
        majorsSeen: 0, minorsSeen: 0, courtsSeen: 0, suits: new Map(), ranks: new Map(), courtSaid: new Set(), worthUsed: new Set(), risksSaid: new Set(),
    };
}
const listNames = (names) => (names.length <= 1 ? (names[0] ?? '') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);
/**
 * A paragraph that already says what the RANK is ("As a Page it is curious", "Knights go after what they want"): then the rank clause would only say it again.
 * The card's own name in a paragraph ("The Knight of Swords goes after the point") does not say what a Knight is, so it does not count.
 */
const mentionsRank = (rank, paragraph) => {
    const name = RANK_NAME[rank];
    const mentions = new RegExp(`\\bAs an? ${name}\\b|\\b${name}s (?:are|go|tend|move|act|stand)\\b`, 'i');
    return mentions.test(paragraph);
};
/**
 * THE FIRST PARAGRAPH OF A CARD: WHAT KIND OF CARD IT IS.
 *
 * `name` is the card's title as a sentence subject ("The Tower", "Page of Cups"); `meaning` is the paragraph that follows, which the rank clause is
 * dropped in front of when that paragraph already says it.
 */
export function kindParagraph(cardId, name, ledger, meaning) {
    const kind = kindOf(cardId);
    if (!kind)
        return '';
    if (kind.family === 'major') {
        ledger.majorsSeen += 1;
        if (ledger.majorsSeen === 1) {
            /* Said once per reading, in one of four wordings picked by the card, so the definition is not the same paragraph at the head of every reading. */
            return choose([
                `${name} is one of the Major Arcana, the 22 cards that stand outside the four suits. They usually point to something larger than a passing mood: a turning point, an inner process or a pattern in how things are going.`,
                `${name} is a Major Arcana card. These 22 cards, outside the four suits, tend to mark a turning point or a larger pattern rather than a passing mood.`,
                `${name} belongs to the Major Arcana, the cards that speak of life-wide themes more than of day-to-day matters: a turning point, an inner process, a pattern.`,
                `${name} is among the 22 Major Arcana, which stand apart from the four suits and usually concern something bigger than the day: a turning point or a pattern in how things go.`,
            ], `${cardId}|major-lead`);
        }
        /* A second or third Major says nothing a reader can use: the line under its name already says "Major Arcana", and what two or three of them weigh is the synthesis's to say. */
        return '';
    }
    const suit = kind.suit;
    const suitName = SUIT_NAME[suit];
    const earlier = ledger.suits.get(suit) ?? [];
    ledger.suits.set(suit, [...earlier, name]);
    const rank = kind.rank;
    const sameRank = ledger.ranks.get(rank) ?? [];
    ledger.ranks.set(rank, [...sameRank, name]);
    /* A rank is explained once; a second card of the same rank only says that it is at the same stage of a different suit. */
    /* A stage said of every suit alike is made to fit the two cards it fits badly: the Three of Swords is a hard first result, the Ten of Swords an ending carried as far as it goes. */
    const stage = suit === 'swords' && rank === 'three' ? 'it concerns the first result of a union or an effort, here a hard one.'
        : suit === 'swords' && rank === 'ten' ? 'it is the end of a cycle, here a hard one: something carried as far as it can go.'
            : NUMBER_STAGE[rank];
    const rankClause = mentionsRank(rank, meaning) ? ''
        : sameRank.length > 0
            ? ` Like ${listNames(sameRank)}, it is ${ARTICLE[rank]} ${RANK_NAME[rank]}: the same stage, in a different suit.`
            : ` As ${ARTICLE[rank]} ${RANK_NAME[rank]}, ${stage}`;
    if (kind.family === 'court') {
        ledger.courtsSeen += 1;
        const first = ledger.courtsSeen === 1;
        const lead = earlier.length > 0
            ? `${name} comes from ${suitName} as well, like ${listNames(earlier)}, so the picture keeps returning to ${SUIT_AREA[suit]}.`
            : first
                ? `${name} is a court card from ${suitName}, ${SUIT_GLOSS[suit]}.`
                : `${name} is another court card, this time from ${suitName}, ${SUIT_GLOSS[suit]}.`;
        const courtNote = first ? ' Court cards describe a person, a role, a part of you or simply a way of acting, rather than an event.' : '';
        return `${lead}${courtNote}${rankClause}`;
    }
    ledger.minorsSeen += 1;
    if (earlier.length > 0) {
        return `${name} comes from ${suitName} as well, like ${listNames(earlier)}, so the picture keeps returning to ${SUIT_AREA[suit]}.${rankClause}`;
    }
    if (ledger.minorsSeen === 1) {
        /* Said once per reading, in one of three wordings picked by the card, so that it is not the same sentence at the head of every reading. */
        const lead = choose([
            `${name} is a Minor Arcana card, so it tends to describe concrete, everyday matters rather than a life-wide theme.`,
            `${name} is one of the Minor Arcana, which deal more with everyday matters than with life-wide themes.`,
            `${name} is among the Minor Arcana, the cards of day-to-day matters.`,
            `${name} is a Minor Arcana card, one of the cards that speak to concrete matters more than to life-wide themes.`,
        ], `${cardId}|minor-lead`);
        return `${lead} It belongs to ${suitName}, ${SUIT_GLOSS[suit]}.${rankClause}`;
    }
    /* The second and third Minor card of a reading: the opener changes with the card, so six readings do not each begin a card with "is a Minor Arcana card from". */
    const later = choose([
        `${name} is a Minor Arcana card from ${suitName}, ${SUIT_GLOSS[suit]}.`,
        `${name} comes from ${suitName}, ${SUIT_GLOSS[suit]}.`,
        `${name} is part of ${suitName}, ${SUIT_GLOSS[suit]}.`,
        `${name} belongs to ${suitName}, ${SUIT_GLOSS[suit]}.`,
    ], `${cardId}|minor-later`);
    return `${later}${rankClause}`;
}
