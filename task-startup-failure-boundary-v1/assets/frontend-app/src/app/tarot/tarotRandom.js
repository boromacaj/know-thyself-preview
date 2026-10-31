import { TarotCryptoUnavailableError } from './tarotTypes.js?v=2ea79e9';
const UINT32_RANGE = 2 ** 32;
/**
 * The production source. Constructed per draw, and throws immediately when the
 * environment cannot provide WebCrypto, so the failure surfaces at the point of
 * the draw rather than as a strange spread later.
 */
export function webCryptoRandomSource() {
    const source = globalThis.crypto;
    if (!source || typeof source.getRandomValues !== 'function') {
        throw new TarotCryptoUnavailableError('crypto.getRandomValues is unavailable; refusing to draw with a predictable generator.');
    }
    /* One reused buffer: allocating per call would be noise, and the value is
       copied out before the next call can overwrite it. */
    const buffer = new Uint32Array(1);
    return {
        nextUint32: () => {
            source.getRandomValues(buffer);
            return buffer[0];
        },
    };
}
/**
 * How many rejections are tolerated before the source is declared broken.
 *
 * Rejection sampling discards a vanishing slice of the range - for a 78-card
 * deck, 22 values out of 4,294,967,296, so the chance of even ten consecutive
 * rejections is far below one in a trillion. A run of a thousand is therefore
 * not bad luck; it is a source that is stuck, and looping forever on it would
 * hang the caller with no explanation. The bound turns that into an error.
 */
const MAX_REJECTIONS = 1000;
/**
 * A uniform integer in [0, maxExclusive), with NO MODULO BIAS.
 *
 * The naive `next() % n` is not uniform whenever n does not divide 2^32: the
 * first `2^32 mod n` values become fractionally more likely than the rest.
 * For a 78-card deck the skew is tiny, and it is still a real thumb on the
 * scale of a draw the product promises is fair, so it is removed rather than
 * tolerated.
 *
 * The fix is rejection sampling: take the largest multiple of n that fits in
 * the 32-bit range and discard anything at or above it. What remains divides
 * exactly, so the modulo is uniform.
 */
export function secureRandomInt(maxExclusive, source) {
    if (!Number.isInteger(maxExclusive) || maxExclusive < 1) {
        throw new RangeError(`secureRandomInt needs a positive integer bound, received ${maxExclusive}`);
    }
    /* One possibility needs no randomness, and would make the limit the whole
       range - correct, but it is clearer to answer directly. */
    if (maxExclusive === 1)
        return 0;
    const limit = Math.floor(UINT32_RANGE / maxExclusive) * maxExclusive;
    for (let attempt = 0; attempt < MAX_REJECTIONS; attempt += 1) {
        const value = source.nextUint32();
        if (!Number.isInteger(value) || value < 0 || value >= UINT32_RANGE) {
            throw new TarotCryptoUnavailableError(`The random source produced ${value}, which is not a uint32.`);
        }
        if (value < limit)
            return value % maxExclusive;
    }
    throw new TarotCryptoUnavailableError('The random source rejected every value; it is not producing a usable range.');
}
/**
 * `count` distinct items, drawn without replacement.
 *
 * A partial Fisher-Yates: at each step choose from the part of the pool that
 * has not been drawn yet and swap the choice into place. Distinctness is
 * structural - a card is moved out of the drawable region the moment it is
 * taken - rather than something checked afterwards, so there is no retry loop
 * and no way for the same card to appear twice in one spread.
 *
 * The caller's array is never mutated.
 */
export function drawDistinct(items, count, source) {
    if (!Number.isInteger(count) || count < 0) {
        throw new RangeError(`drawDistinct needs a non-negative count, received ${count}`);
    }
    if (count > items.length) {
        throw new RangeError(`Cannot draw ${count} distinct items from ${items.length}.`);
    }
    const pool = [...items];
    const drawn = [];
    for (let taken = 0; taken < count; taken += 1) {
        const remaining = pool.length - taken;
        const chosen = taken + secureRandomInt(remaining, source);
        const swap = pool[taken];
        pool[taken] = pool[chosen];
        pool[chosen] = swap;
        drawn.push(pool[taken]);
    }
    return drawn;
}
