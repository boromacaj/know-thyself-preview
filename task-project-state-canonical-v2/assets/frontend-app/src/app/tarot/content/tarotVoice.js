/** The oriented model for a position, so a voice can read its mode. */
export function orientedAt(plan, which) {
    return [plan.energy.card, plan.factor.card, plan.guidance.card][which];
}
/**
 * A card's fragments as they should read in the orientation it was drawn in.
 *
 * Upright returns the fragments untouched. Reversed qualifies `dynamic` and
 * `tag` and leaves `constructive`, `difficult` and `asks` alone - deliberately:
 * those three are already reached differently, because the transform changed the
 * card's agency and therefore the Guidance role the invitation is keyed on. Adding
 * a frame to them as well would say the same thing twice.
 *
 * Wrapping the lookup rather than changing every call site means a voice's
 * sections did not have to learn about orientation at all.
 */
export function orientedCardVoice(base, card, frames) {
    if (!card.reversalMode)
        return base;
    return {
        ...base,
        dynamic: frames.dynamic(base.dynamic, card.reversalMode),
        tag: frames.tag(base.tag, card.reversalMode),
    };
}
/** How many of the three positions came out reversed. */
export function reversedCount(plan) {
    return [plan.energy.card, plan.factor.card, plan.guidance.card]
        .filter((card) => card.orientation === 'reversed').length;
}
export const TAROT_READING_SECTION_IDS = [
    'opening', 'energy', 'factor', 'guidance', 'jumper', 'in-short',
];
/** Join a list the way prose does. */
export function listPhrase(items, and) {
    if (items.length === 0)
        return '';
    if (items.length === 1)
        return items[0];
    return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
}
export const upperFirst = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text);
