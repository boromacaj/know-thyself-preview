import { getTarotCard } from '../data/tarotDeck.js';
import { TAROT_COURT_RANKS, TAROT_RANKS, TAROT_SUITS, } from '../tarotTypes.js';
export const SUIT_ELEMENT = {
    wands: 'fire', cups: 'water', swords: 'air', pentacles: 'earth',
};
export const NUMBER_SIGNALS = [
    'seed', 'pairing', 'development', 'structure', 'disruption', 'adjustment',
    'assessment', 'momentum', 'culmination', 'completion',
];
const isCourt = (card) => card.rank !== undefined && TAROT_COURT_RANKS.includes(card.rank);
/** Ace to Ten as 1 to 10; null for a Major or a court card. */
export function numericRank(card) {
    if (card.arcana !== 'minor' || !card.rank)
        return null;
    const index = TAROT_RANKS.indexOf(card.rank);
    return index >= 0 && index <= 9 ? index + 1 : null;
}
export function numberSignalOf(card) {
    const value = numericRank(card);
    return value === null ? null : NUMBER_SIGNALS[value - 1];
}
function densityOf(majors, total) {
    if (majors === 0)
        return 'none';
    /* One card that happens to be Major is not "all Major" in any sense a reader would want said. */
    if (total === 1)
        return 'single';
    if (majors === total)
        return 'all';
    if (majors * 2 > total)
        return 'most';
    if (majors * 2 === total)
        return 'half';
    return majors === 1 ? 'single' : 'some';
}
const ELEMENT_RELATION = {
    'fire|fire': 'reinforcing', 'water|water': 'reinforcing', 'air|air': 'reinforcing', 'earth|earth': 'reinforcing',
    'air|fire': 'reinforcing',
    'earth|water': 'nourishing',
    'fire|water': 'tension',
    'air|earth': 'tension',
};
const relationKey = (a, b) => [a, b].sort().join('|');
const ELEMENT_ORDER = ['tension', 'nourishing', 'reinforcing'];
/**
 * How the cards' elements sit together: at most two findings, the most informative
 * kinds first. Fire with water or air with earth pull against each other; water
 * with earth nourishes; fire with air, or two of one element, reinforce. Fire
 * with earth and water with air are left unsaid on purpose - the tradition says
 * little about them, and a finding with nothing to say is padding.
 */
function elementFindings(cards) {
    const found = [];
    for (let i = 0; i < cards.length; i += 1) {
        for (let j = i + 1; j < cards.length; j += 1) {
            const a = cards[i].suit;
            const b = cards[j].suit;
            if (!a || !b)
                continue;
            const left = SUIT_ELEMENT[a];
            const right = SUIT_ELEMENT[b];
            const kind = ELEMENT_RELATION[relationKey(left, right)];
            if (kind)
                found.push({ kind, elements: [left, right], indexes: [i, j] });
        }
    }
    const seenKinds = new Set();
    const chosen = [];
    for (const kind of ELEMENT_ORDER) {
        for (const finding of found.filter((entry) => entry.kind === kind)) {
            const key = `${finding.kind}:${relationKey(...finding.elements)}`;
            if (seenKinds.has(key) || chosen.length >= 2)
                continue;
            seenKinds.add(key);
            chosen.push(finding);
        }
    }
    return chosen;
}
/** Consecutive numbers, in position order, ascending or descending: three in a row, or two when only two numbered cards exist. */
function numberRunOf(cards) {
    const values = cards.map(numericRank);
    const numbered = values.filter((value) => value !== null).length;
    const needed = numbered >= 3 ? 3 : 2;
    for (const direction of ['ascending', 'descending']) {
        const step = direction === 'ascending' ? 1 : -1;
        let run = [];
        for (let index = 0; index < values.length; index += 1) {
            const value = values[index];
            const last = run.length > 0 ? values[run[run.length - 1]] : null;
            if (value !== null && (run.length === 0 || (last !== null && value === last + step))) {
                run.push(index);
            }
            else {
                if (run.length >= needed)
                    return { direction, indexes: run };
                run = value !== null ? [index] : [];
            }
        }
        if (run.length >= needed)
            return { direction, indexes: run };
    }
    return null;
}
export function readPatterns(cardIds, oriented) {
    const cards = [];
    for (const id of cardIds) {
        const card = getTarotCard(id);
        if (!card)
            return null;
        cards.push(card);
    }
    const total = cards.length;
    const majorCount = cards.filter((card) => card.arcana === 'major').length;
    const minors = cards.filter((card) => card.arcana === 'minor');
    const suitCounts = Object.fromEntries(TAROT_SUITS.map((suit) => [suit, cards.filter((card) => card.suit === suit).length]));
    const ranked = TAROT_SUITS.map((suit) => ({ suit, count: suitCounts[suit] })).sort((a, b) => b.count - a.count);
    const dominantSuit = ranked[0].count >= 2 && ranked[0].count > ranked[1].count ? ranked[0].suit : null;
    /* An absent suit means something only when there are enough Minor cards for it to be a choice the draw made. */
    const absentSuits = minors.length >= 4 ? TAROT_SUITS.filter((suit) => suitCounts[suit] === 0) : [];
    const byRank = new Map();
    cards.forEach((card, index) => {
        if (card.arcana === 'minor' && card.rank)
            byRank.set(card.rank, [...(byRank.get(card.rank) ?? []), index]);
    });
    const repeatedRanks = [...byRank.entries()]
        .filter(([, indexes]) => indexes.length >= 2)
        .map(([rank, indexes]) => ({ rank, indexes }))
        .sort((a, b) => b.indexes.length - a.indexes.length || a.indexes[0] - b.indexes[0]);
    const courtIndexes = cards.flatMap((card, index) => (isCourt(card) ? [index] : []));
    const courtLevel = courtIndexes.length === 0 ? 'none'
        : courtIndexes.length === total && total > 1 ? 'all'
            : courtIndexes.length >= 2 ? 'several' : 'one';
    const themeCount = new Map();
    for (const card of oriented)
        for (const theme of new Set(card.themes))
            themeCount.set(theme, (themeCount.get(theme) ?? 0) + 1);
    const themeEchoes = [...themeCount.entries()].filter(([, count]) => count >= 2).map(([theme]) => theme).sort();
    return {
        total,
        majorCount,
        majorDensity: densityOf(majorCount, total),
        minorCount: minors.length,
        suitCounts,
        dominantSuit,
        absentSuits,
        repeatedRanks,
        numberRun: numberRunOf(cards),
        courtIndexes,
        courtLevel,
        elements: elementFindings(cards),
        themeEchoes,
        reversedCount: oriented.filter((card) => card.orientation === 'reversed').length,
    };
}
