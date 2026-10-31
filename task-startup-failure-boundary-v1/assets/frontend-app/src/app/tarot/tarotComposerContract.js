import { getTarotCard } from './data/tarotDeck.js?v=2ea79e9';
import { TAROT_COURT_RANKS, TAROT_POSITIONS, TAROT_POSITION_ROLE, TAROT_RANKS, TAROT_SUITS, } from './tarotTypes.js?v=2ea79e9';
/** The pairs a three-card spread is read through, in the order a reading takes them. */
const PAIRS = [
    ['energy', 'factor'],
    ['factor', 'guidance'],
    ['energy', 'guidance'],
];
/** Ace..Ten as 1..10; the court has no place in a numeric run. */
function numericRank(card) {
    if (card.arcana !== 'minor' || !card.rank)
        return null;
    const index = TAROT_RANKS.indexOf(card.rank);
    return index >= 0 && index <= 9 ? index + 1 : null;
}
const isCourt = (card) => card.rank !== undefined && TAROT_COURT_RANKS.includes(card.rank);
function pairRelation(from, to, a, b) {
    const bothMajor = a.arcana === 'major' && b.arcana === 'major';
    const bothMinor = a.arcana === 'minor' && b.arcana === 'minor';
    const gap = bothMajor && a.majorNumber !== undefined && b.majorNumber !== undefined
        ? Math.abs(a.majorNumber - b.majorNumber)
        : null;
    return {
        from,
        to,
        relationKey: `tarot.relation.${from}-${to}`,
        cardIds: [a.id, b.id],
        bothMajor,
        bothMinor,
        mixedArcana: a.arcana !== b.arcana,
        sharedSuit: bothMinor && a.suit === b.suit && a.suit ? a.suit : null,
        sharedRank: bothMinor && a.rank === b.rank && a.rank ? a.rank : null,
        bothCourt: isCourt(a) && isCourt(b),
        majorNumberGap: gap,
        consecutiveMajors: gap === 1,
    };
}
function buildArc(cards) {
    const suitCounts = Object.fromEntries(TAROT_SUITS.map((suit) => [suit, cards.filter((card) => card.suit === suit).length]));
    const ranked = TAROT_SUITS
        .map((suit) => ({ suit, count: suitCounts[suit] }))
        .sort((left, right) => right.count - left.count);
    /* "Dominant" means strictly more than the next suit - a 1-1-1 spread has no
       leader, and calling one of them dominant would be an invention. */
    const dominantSuit = ranked[0].count > 0 && ranked[0].count > ranked[1].count
        ? ranked[0].suit : null;
    const numbers = cards.map(numericRank);
    let rankTrend = null;
    if (numbers.every((value) => value !== null)) {
        const ascending = numbers[0] < numbers[1] && numbers[1] < numbers[2];
        const descending = numbers[0] > numbers[1] && numbers[1] > numbers[2];
        rankTrend = ascending ? 'ascending' : descending ? 'descending' : 'mixed';
    }
    const majorNumbers = cards
        .filter((card) => card.arcana === 'major' && card.majorNumber !== undefined)
        .map((card) => card.majorNumber)
        .sort((left, right) => left - right);
    return {
        cardIds: [cards[0].id, cards[1].id, cards[2].id],
        majorCount: cards.filter((card) => card.arcana === 'major').length,
        minorCount: cards.filter((card) => card.arcana === 'minor').length,
        suitCounts,
        dominantSuit,
        allSameSuit: dominantSuit !== null && suitCounts[dominantSuit] === cards.length,
        courtCount: cards.filter(isCourt).length,
        aceCount: cards.filter((card) => card.rank === 'ace').length,
        majorNumbers,
        rankTrend,
        arcKey: 'tarot.arc.three-card',
    };
}
/**
 * The composer's input for a spread, or null when the spread names a card this
 * deck does not hold - which a validated spread never does, but this function
 * is reachable from a caller holding an older record and must not throw.
 */
export function buildTarotComposerInput(spread) {
    const byPosition = new Map(spread.cards.map((card) => [card.position, card]));
    const positions = [];
    const cards = [];
    for (const position of TAROT_POSITIONS) {
        const drawn = byPosition.get(position);
        if (!drawn)
            return null;
        const card = getTarotCard(drawn.cardId);
        if (!card)
            return null;
        cards.push(card);
        positions.push({
            position,
            roleKey: TAROT_POSITION_ROLE[position],
            card,
            orientation: drawn.orientation,
            meaningKey: card.meaningKey,
            positionMeaningKey: `tarot.card.${card.id}.in.${position}`,
        });
    }
    const byId = new Map(TAROT_POSITIONS.map((position, index) => [position, cards[index]]));
    const pairs = PAIRS.map(([from, to]) => pairRelation(from, to, byId.get(from), byId.get(to)));
    return {
        spreadId: spread.spreadId,
        deck: { id: spread.deckId, schemaVersion: spread.deckSchemaVersion },
        localDate: spread.localDate,
        drawnAt: spread.drawnAt,
        timeZone: spread.timeZone,
        positions,
        pairs,
        arc: buildArc(cards),
    };
}
