/* ---------------------------------------------------------------- intent -- */
/**
 * What the question is mainly about. A primary label for choosing a spread, not
 * a box the question has to fit: `secondaryCategories` carries the domain
 * flavour (a career question that asks what to do is `action-guidance` first and
 * `career` second).
 */
export const INTENT_CATEGORIES = [
    'temporal-outlook', 'action-guidance', 'problem-blockage', 'relationship',
    'binary-decision', 'general-reflection', 'self-development', 'career',
    'creativity', 'emotional', 'spiritual', 'open',
];
export const TEMPORAL_ORIENTATIONS = ['past', 'present', 'future', 'timeless'];
export const RELATIONSHIP_TYPES = ['romantic', 'family', 'friend', 'work', 'other'];
/** What the person wants out of the reading, as far as the wording says. */
export const DESIRED_GUIDANCE = [
    'understand', 'decide', 'act', 'foresee', 'reflect', 'unblock',
    'blind-spot', 'resources', 'single-focus',
];
/**
 * Subjects a card reading has no standing to settle. Each one is a policy input,
 * not a verdict about the person: see questionSafety.ts.
 */
export const SENSITIVITY_FLAGS = [
    'self-harm', 'distress', 'medical', 'medical-treatment', 'pregnancy',
    'death', 'legal', 'financial', 'accusation', 'paranoia',
];
/* ---------------------------------------------------------------- spread -- */
/**
 * WHAT A POSITION DOES IN THE ARGUMENT.
 *
 * Fifteen functions, because the voice and the plan read a card differently
 * depending on what its place is FOR. The same Tower says one thing as "where it
 * is going" and another as "what it comes from"; a position function is what
 * makes that difference structural instead of decorative.
 */
export const POSITION_FUNCTIONS = [
    'focus', 'state', 'origin', 'driver', 'response', 'direction', 'option',
    'criterion', 'other', 'meeting', 'embodied', 'mental', 'meaning',
    'supporting', 'resisting',
];
/**
 * HOW THE CARDS ARE READ TOGETHER.
 *
 *   single              one card; nothing to relate it to
 *   sequence            positions in order, each acting on the next
 *   self-other-meeting  two sides and what is between them
 *   options-criterion   two paths and the factor the choice turns on
 *   layers              parallel layers read for balance, not for sequence
 */
export const SYNTHESIS_STRATEGIES = [
    'single', 'sequence', 'self-other-meeting', 'options-criterion', 'layers',
];
