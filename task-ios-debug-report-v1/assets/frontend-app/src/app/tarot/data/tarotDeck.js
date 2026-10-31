import { TAROT_DECK_ID, TAROT_DECK_SCHEMA_VERSION, TAROT_RANKS, TAROT_SUITS, } from '../tarotTypes.js?v=b5ef5ed';
/**
 * THE 78-CARD RIDER-WAITE-SMITH DECK, AS IDENTITIES.
 *
 * Twenty-two Major Arcana numbered 0-21, and fifty-six Minor across four suits
 * of fourteen. Nothing in this file is interpretation: it is the list of things
 * that can be drawn, with a stable id each.
 *
 * THE NUMBERING IS RIDER-WAITE-SMITH AND THAT IS A CHOICE.
 *
 *   VIII  Strength
 *   XI    Justice
 *
 * The older Marseille ordering has these the other way round - Justice at VIII
 * and Strength at XI - and Waite swapped them deliberately, for reasons to do
 * with the zodiacal attributions the Golden Dawn used. Both orderings are in
 * print and a deck that mixes them is simply wrong, so the convention is named
 * here, asserted in the tests and written down in the contract doc. A future
 * Marseille deck would be a different `deckId`, never a renumbering of this one.
 *
 * WHAT IS DELIBERATELY ABSENT. Meanings, keywords, upright/reversed prose,
 * elemental or astrological attributions, and artwork. Those need research and
 * editorial work that has not happened, and inventing them here - or copying
 * them from a guidebook - would put unsourced or someone else's content into
 * the product under the appearance of reference data. `meaningKey` and
 * `artworkKey` name where they will go.
 */
/** The Major Arcana in canonical order. The index IS the card's number. */
const MAJOR_ARCANA = [
    { slug: 'fool', name: 'The Fool' },
    { slug: 'magician', name: 'The Magician' },
    { slug: 'high-priestess', name: 'The High Priestess' },
    { slug: 'empress', name: 'The Empress' },
    { slug: 'emperor', name: 'The Emperor' },
    { slug: 'hierophant', name: 'The Hierophant' },
    { slug: 'lovers', name: 'The Lovers' },
    { slug: 'chariot', name: 'The Chariot' },
    /* VIII - Rider-Waite-Smith. Marseille puts Justice here. */
    { slug: 'strength', name: 'Strength' },
    { slug: 'hermit', name: 'The Hermit' },
    { slug: 'wheel-of-fortune', name: 'Wheel of Fortune' },
    /* XI - Rider-Waite-Smith. Marseille puts Strength here. */
    { slug: 'justice', name: 'Justice' },
    { slug: 'hanged-man', name: 'The Hanged Man' },
    { slug: 'death', name: 'Death' },
    { slug: 'temperance', name: 'Temperance' },
    { slug: 'devil', name: 'The Devil' },
    { slug: 'tower', name: 'The Tower' },
    { slug: 'star', name: 'The Star' },
    { slug: 'moon', name: 'The Moon' },
    { slug: 'sun', name: 'The Sun' },
    { slug: 'judgement', name: 'Judgement' },
    { slug: 'world', name: 'The World' },
];
/** How a rank is written in a card's canonical name. */
const RANK_NAME = {
    ace: 'Ace', two: 'Two', three: 'Three', four: 'Four', five: 'Five',
    six: 'Six', seven: 'Seven', eight: 'Eight', nine: 'Nine', ten: 'Ten',
    page: 'Page', knight: 'Knight', queen: 'Queen', king: 'King',
};
const SUIT_NAME = {
    wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles',
};
/**
 * Every key is derived from the id and never typed by hand.
 *
 * A dictionary key that has to be kept in step with an id by hand is a key that
 * will eventually disagree with it, and the disagreement would show up as a
 * missing string months later. Deriving them means a card has exactly one thing
 * that can be wrong: its id.
 */
const titleKeyFor = (id) => `tarot.card.${id}.title`;
const meaningKeyFor = (id) => `tarot.card.${id}.meaning`;
const artworkKeyFor = (id) => `tarot.art.${TAROT_DECK_ID}.${id}`;
/** Both orientations are what the DECK supports. V1's draw uses only the first. */
const BOTH_ORIENTATIONS = ['upright', 'reversed'];
function majorCard(index, slug, name) {
    const id = `major-${slug}`;
    return {
        id,
        arcana: 'major',
        canonicalName: name,
        titleKey: titleKeyFor(id),
        meaningKey: meaningKeyFor(id),
        artworkKey: artworkKeyFor(id),
        majorNumber: index,
        orientationCapability: BOTH_ORIENTATIONS,
    };
}
function minorCard(suit, rank) {
    const id = `${suit}-${rank}`;
    return {
        id,
        arcana: 'minor',
        canonicalName: `${RANK_NAME[rank]} of ${SUIT_NAME[suit]}`,
        titleKey: titleKeyFor(id),
        meaningKey: meaningKeyFor(id),
        artworkKey: artworkKeyFor(id),
        suit,
        rank,
        orientationCapability: BOTH_ORIENTATIONS,
    };
}
/**
 * The deck, in canonical order: the twenty-two Major, then each suit Ace to
 * King. The order is the deck's own and is NOT the order anything is drawn in -
 * a draw shuffles, and a stored spread records ids rather than positions in
 * this array.
 */
export const TAROT_DECK = Object.freeze([
    ...MAJOR_ARCANA.map((entry, index) => majorCard(index, entry.slug, entry.name)),
    ...TAROT_SUITS.flatMap((suit) => TAROT_RANKS.map((rank) => minorCard(suit, rank))),
]);
const BY_ID = new Map(TAROT_DECK.map((card) => [card.id, card]));
/** The card, or null for an id this deck does not contain. Never throws on bad input. */
export function getTarotCard(cardId) {
    return BY_ID.get(cardId) ?? null;
}
export function isKnownTarotCardId(cardId) {
    return BY_ID.has(cardId);
}
/** The whole deck. Frozen, so a caller cannot reorder the shared array. */
export function getTarotDeck() {
    return TAROT_DECK;
}
export const TAROT_DECK_IDENTITY = Object.freeze({
    deckId: TAROT_DECK_ID,
    deckSchemaVersion: TAROT_DECK_SCHEMA_VERSION,
    cardCount: TAROT_DECK.length,
});
