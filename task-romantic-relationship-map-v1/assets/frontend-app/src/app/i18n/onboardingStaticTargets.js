export const STATIC_ONBOARDING_TARGETS = [
    /* Earth */
    { kind: 'attr', selector: '#earth-map', attribute: 'aria-label', key: 'onb.earth.aria' },
    /* Birthplace search: poetic question above Earth; actionable placeholder inside input. */
    { kind: 'text', selector: '#place-story-prompt', key: 'onb.search.question' },
    { kind: 'attr', selector: '#interaction-dock', attribute: 'aria-label', key: 'onb.birthplace.aria' },
    { kind: 'attr', selector: '#place-results', attribute: 'aria-label', key: 'onb.suggestions.aria' },
    { kind: 'text', selector: 'label[for="place-query"]', key: 'onb.search.aria' },
    { kind: 'attr', selector: '#place-query', attribute: 'placeholder', key: 'onb.search.placeholder' },
    { kind: 'attr', selector: '.place-search .search-submit', attribute: 'aria-label', key: 'onb.search.submit' },
    /* The incarnation phrase, on black, before the warp is seen */
    { kind: 'text', selector: '#incarnation-phrase', key: 'onb.intro.incarnation' },
    /* Birthplace card */
    { kind: 'text', selector: '.birthplace-copy > p:first-child', key: 'onb.birthplace.label' },
    { kind: 'text', selector: '#change-place', key: 'onb.birthplace.change' },
    { kind: 'text', selector: '#confirm-place', key: 'onb.birthplace.confirm' },
    /* Vessel */
    { kind: 'text', selector: '.vessel-kicker', key: 'onb.vessel.kicker' },
    { kind: 'text', selector: '#vessel-title', key: 'onb.vessel.title' },
    { kind: 'text', selector: '.vessel-question', key: 'onb.vessel.question' },
    { kind: 'text', selector: '#vessel-orbit-instructions', key: 'onb.vessel.orbitInstructions' },
    { kind: 'attr', selector: '#vessel-orbit', attribute: 'aria-label', key: 'onb.vessel.aria' },
    { kind: 'text', selector: '[data-vessel="male"] .vessel-label', key: 'onb.vessel.male' },
    { kind: 'text', selector: '[data-vessel="female"] .vessel-label', key: 'onb.vessel.female' },
    { kind: 'text', selector: '[data-vessel="nonbinary"] .vessel-label', key: 'onb.vessel.nonbinary' },
    { kind: 'text', selector: '#vessel-undefined', key: 'onb.vessel.ratherNotDefine' },
    { kind: 'text', selector: '#confirm-vessel', key: 'onb.vessel.confirm' },
];
/**
 * Elements whose label the flow rewrites as state changes.
 *
 * They are localised once, at first paint. Re-applying them on a language switch
 * would put "Confirm birthplace" back on a button that already says "Birthplace
 * confirmed"; from first paint onward their owning module sets them via `t()`.
 */
export const STATEFUL_SELECTORS = new Set([
    '#change-place',
    '#confirm-place',
    '#confirm-vessel',
]);
