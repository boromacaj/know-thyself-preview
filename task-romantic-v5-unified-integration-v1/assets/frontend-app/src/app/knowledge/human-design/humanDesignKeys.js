/**
 * DETERMINISTIC KEYS FOR HUMAN DESIGN.
 *
 * The brief requires that knowledge ids map deterministically to actual engine
 * values. The Human Design engine emits display strings - 'Manifesting
 * Generator', 'Emotional / Solar Plexus', 'Respond, then inform' - and this file
 * is the single place those become knowledge keys.
 *
 * The rule is mechanical: lower-case, drop everything that is not a letter, a
 * digit or a space, collapse whitespace, join with hyphens. It is applied by
 * normaliseKey() rather than by a lookup table, so a value the engine adds later
 * gets a key automatically instead of silently missing one.
 *
 * The exhaustive Record types below are the safety net. If the engine's union
 * types gain a member, these stop compiling, which is the point: a new Type or
 * Authority must not reach the reader with no interpretation behind it.
 */
export function normaliseKey(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .replace(/\s+/g, '-');
}
export const TYPE_KEYS = {
    'Manifesting Generator': 'manifesting-generator',
    Generator: 'generator',
    Manifestor: 'manifestor',
    Projector: 'projector',
    Reflector: 'reflector',
};
export const STRATEGY_KEYS = {
    'Respond, then inform': 'respond-then-inform',
    Respond: 'respond',
    'Inform before acting': 'inform-before-acting',
    'Wait for recognition and invitation': 'wait-for-recognition-and-invitation',
    'Wait through a lunar cycle': 'wait-through-a-lunar-cycle',
};
export const AUTHORITY_KEYS = {
    'Emotional / Solar Plexus': 'emotional-solar-plexus',
    Sacral: 'sacral',
    Splenic: 'splenic',
    'Ego Manifested': 'ego-manifested',
    'Ego Projected': 'ego-projected',
    'Self-Projected': 'self-projected',
    'Mental / Environmental': 'mental-environmental',
    Lunar: 'lunar',
};
export const DEFINITION_KEYS = {
    'No Definition': 'no-definition',
    'Single Definition': 'single-definition',
    'Split Definition': 'split-definition',
    'Triple Split Definition': 'triple-split-definition',
    'Quadruple Split Definition': 'quadruple-split-definition',
    'Multiple Split Definition': 'multiple-split-definition',
};
export const CENTER_KEYS = {
    head: 'head',
    ajna: 'ajna',
    throat: 'throat',
    g: 'g',
    ego: 'ego',
    solarPlexus: 'solar-plexus',
    sacral: 'sacral',
    spleen: 'spleen',
    root: 'root',
};
/** Profiles are written the way the engine and every practitioner writes them. */
export function profileKey(personality, design) {
    return `${personality}/${design}`;
}
export const ALL_PROFILE_KEYS = [
    '1/3', '1/4',
    '2/4', '2/5',
    '3/5', '3/6',
    '4/6', '4/1',
    '5/1', '5/2',
    '6/2', '6/3',
];
