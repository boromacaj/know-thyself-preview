import { secureRandomInt } from './tarotRandom.js?v=d9f39e7';
/** Everything upright. A real possible product answer, and the default test fixture. */
export const TAROT_ORIENTATION_ALL_UPRIGHT = {
    id: 'all-upright',
    provisional: false,
    orientationFor: () => 'upright',
};
/** Everything reversed. Not a product answer; exists so tests can force the extreme. */
export const TAROT_ORIENTATION_ALL_REVERSED = {
    id: 'all-reversed',
    provisional: true,
    orientationFor: () => 'reversed',
};
/**
 * Reversed with probability `1 / oneIn`, decided independently per card.
 *
 * Expressed as a denominator rather than a float because that is how the
 * decision will be made - "about one in four" is a sentence somebody can agree
 * to, and 0.25 invites a later argument about whether 0.23 was meant.
 */
export function proportionalOrientationPolicy(oneIn, options = {}) {
    if (!Number.isInteger(oneIn) || oneIn < 1) {
        throw new RangeError(`An orientation denominator must be a positive integer, received ${oneIn}`);
    }
    return {
        id: options.id ?? `reversed-one-in-${oneIn}`,
        provisional: options.provisional ?? true,
        orientationFor: (_context, random) => (secureRandomInt(oneIn, random) === 0 ? 'reversed' : 'upright'),
    };
}
/**
 * TEMPORARY - NOT A PRODUCT DECISION.
 *
 * One in three, chosen only because the feature cannot be exercised or reviewed
 * at zero and would be unreadable at one. It is NOT derived from any source, it
 * has NOT been approved, and it is listed as an open decision in
 * TAROT_REVERSALS_AND_JUMPER_RESEARCH.md §7.
 *
 * `provisional: true` travels with it into every committed deck, so a stored
 * record made under this value can be found later.
 */
export const TAROT_ORIENTATION_POLICY_DEVELOPMENT = proportionalOrientationPolicy(3, { id: 'development-one-in-3', provisional: true });
/** The policy the product uses today. Replace when the decision is made. */
export const DEFAULT_TAROT_ORIENTATION_POLICY = TAROT_ORIENTATION_POLICY_DEVELOPMENT;
