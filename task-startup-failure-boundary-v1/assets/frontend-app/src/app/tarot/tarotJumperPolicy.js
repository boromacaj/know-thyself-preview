import { secureRandomInt } from './tarotRandom.js?v=2ea79e9';
/** No jumper, ever. A real possible product answer and the default test fixture. */
export const TAROT_JUMPER_NEVER = {
    id: 'never',
    provisional: false,
    maxJumpers: 0,
    jumperCountFor: () => 0,
    rejectedFate: 'selectable',
    acceptedFate: 'reserved',
};
/** Always exactly one. Not a product answer; exists so tests can force the branch. */
export const TAROT_JUMPER_ALWAYS_ONE = {
    id: 'always-one',
    provisional: true,
    maxJumpers: 1,
    jumperCountFor: () => 1,
    rejectedFate: 'selectable',
    acceptedFate: 'reserved',
};
/** One jumper with probability `1 / oneIn`, never more. */
export function occasionalJumperPolicy(oneIn, options = {}) {
    if (!Number.isInteger(oneIn) || oneIn < 1) {
        throw new RangeError(`A jumper denominator must be a positive integer, received ${oneIn}`);
    }
    return {
        id: options.id ?? `jumper-one-in-${oneIn}`,
        provisional: options.provisional ?? true,
        maxJumpers: 1,
        jumperCountFor: (random) => (secureRandomInt(oneIn, random) === 0 ? 1 : 0),
        rejectedFate: options.rejectedFate ?? 'selectable',
        acceptedFate: options.acceptedFate ?? 'reserved',
    };
}
/**
 * TEMPORARY - NOT A PRODUCT DECISION.
 *
 * One in four days, at most one jumper. Chosen only so the feature can be
 * reached in review without being the normal case. Not from any source, not
 * approved, listed as open in TAROT_REVERSALS_AND_JUMPER_RESEARCH.md §7.
 *
 * V1 caps at one jumper. That cap is also NOT a decision - practice documents
 * one, several, and "make a whole spread out of them". It is here because a
 * single jumper is the only variant whose interpretation this milestone builds,
 * and `maxJumpers` is the field to raise when that changes.
 */
export const TAROT_JUMPER_POLICY_DEVELOPMENT = occasionalJumperPolicy(4, {
    id: 'development-one-in-4',
    provisional: true,
    rejectedFate: 'selectable',
    acceptedFate: 'reserved',
});
/** The policy the product uses today. Replace when the decision is made. */
export const DEFAULT_TAROT_JUMPER_POLICY = TAROT_JUMPER_POLICY_DEVELOPMENT;
