/**
 * THE TAROT MODEL.
 *
 * Tarot is not a calculation in this product and this file is where that is
 * made structural rather than promised. Nothing here takes a birth date, a
 * name, a profile, a chart or a number from any other pillar, because there is
 * no field on any of these types that could carry one. A Tarot spread is a
 * random draw that was made once and then kept; the honesty of that claim is
 * enforced by the shape of the data, not by a comment.
 *
 * WHAT A CARD IS HERE. An identity and nothing else. The deck carries no
 * meanings, no prose, no artwork and no localized names - only stable ids that
 * a stored draw can be re-read through years later, after the titles have been
 * translated, the artwork has been replaced and the interpretations have been
 * written. Changing any of those must never invalidate a draw somebody already
 * has, which is only possible if the draw never stored them.
 */
/* ------------------------------------------------------------------ deck -- */
/**
 * THE DECK'S IDENTITY, AND WHY IT IS VERSIONED.
 *
 * A stored spread names the deck it was drawn from. A later version of this app
 * may add reversals, a second artwork set or a different metadata shape, and a
 * draw made today has to stay interpretable when it does. The id says WHICH
 * deck; the schema version says which SHAPE that deck's records were written
 * in. They move independently: new artwork is a new deck id, a new field is a
 * new schema version.
 */
export const TAROT_DECK_ID = 'rws-v1';
export const TAROT_DECK_SCHEMA_VERSION = 1;
export const TAROT_SUITS = ['wands', 'cups', 'swords', 'pentacles'];
/**
 * The fourteen ranks of a suit, in canonical order. Ace through Ten, then the
 * four court cards - which is the Rider-Waite-Smith ordering and the reason a
 * suit is fourteen cards rather than thirteen.
 */
export const TAROT_RANKS = [
    'ace', 'two', 'three', 'four', 'five', 'six', 'seven',
    'eight', 'nine', 'ten', 'page', 'knight', 'queen', 'king',
];
/** The court, kept as its own set because a composer will want to count them. */
export const TAROT_COURT_RANKS = ['page', 'knight', 'queen', 'king'];
/**
 * V1 draws upright only, and the type still has two members.
 *
 * The alternative - a boolean, or no field at all - would mean that the day
 * reversals arrive, every record written before then is ambiguous rather than
 * merely upright. An explicit value costs one string per card and removes a
 * migration.
 */
export const TAROT_ORIENTATIONS = ['upright', 'reversed'];
/* ---------------------------------------------------------------- spread -- */
/**
 * THE THREE POSITIONS, AS MACHINE IDS.
 *
 * Persisted, so they are ids and not labels. The order is the reading order and
 * is part of the spread's identity: a stored draw whose positions were shuffled
 * would be a different reading of the same three cards.
 */
export const TAROT_POSITIONS = ['energy', 'factor', 'guidance'];
export const TAROT_SPREAD_ID = 'three-card-daily-v1';
/**
 * WHAT EACH POSITION IS FOR - the interpretation contract, not a prediction.
 *
 * These describe the ROLE a card plays in the spread so that a future composer
 * has something to compose against. They are deliberately about symbolic tone
 * and stance rather than about events: nothing here says what will happen, and
 * no content written against these keys may.
 *
 *   energy    the dominant symbolic tone entering the reading
 *   factor    something shaping, complicating or influencing that tone
 *   guidance  the symbolic direction or stance the spread offers
 */
export const TAROT_POSITION_ROLE = {
    energy: 'tarot.position.energy.role',
    factor: 'tarot.position.factor.role',
    guidance: 'tarot.position.guidance.role',
};
/**
 * The one failure the engine refuses to work around.
 *
 * Every other problem here has a safe answer. This one does not: without a
 * cryptographic source there is no honest draw to make, and the alternative -
 * falling back to a predictable generator - would turn "random" into a claim
 * the product could not support. It throws, and the caller decides what to
 * show.
 */
export class TarotCryptoUnavailableError extends Error {
    code = 'crypto-unavailable';
    constructor(detail = 'No cryptographically secure random source is available.') {
        super(detail);
        this.name = 'TarotCryptoUnavailableError';
    }
}
