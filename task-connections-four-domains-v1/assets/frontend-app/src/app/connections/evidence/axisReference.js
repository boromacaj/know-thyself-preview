/*
 * THE REFERENCE EVERY AXIS STANCE IS MEASURED AGAINST.
 *
 * Derived, not chosen: the mean and spread of each axis lean, and of each drive's counted weight, over the forty reference birth moments the theme base rates use
 * (tests/fixtures/themeReferencePopulation.fixture.mjs). It exists because the knowledge base speaks more often to some poles than to others, so a raw lean says little until it
 * is set beside what a typical chart does. tests/connectionsAxisReference.test.mjs re-derives it on every run and fails, printing the replacement, when the knowledge base has
 * moved it; frontend-app/scripts/connections/deriveAxisReference.mjs writes this file.
 */
export const AXIS_REFERENCE = {
    'inner-focus': { meanLean: -0.49, sdLean: 0.2427 },
    'reasoning': { meanLean: -0.1979, sdLean: 0.4042 },
    'autonomy': { meanLean: -0.0219, sdLean: 0.3151 },
    'structure': { meanLean: -0.1156, sdLean: 0.2705 },
    'risk': { meanLean: 0.1313, sdLean: 0.2705 },
    'emotional-expression': { meanLean: -0.678, sdLean: 0.4564 },
    'visibility': { meanLean: -0.0707, sdLean: 0.4783 },
    'change': { meanLean: -0.0085, sdLean: 0.3192 },
    'initiative': { meanLean: -0.3395, sdLean: 0.2128 },
    'abstraction': { meanLean: -0.0795, sdLean: 0.2761 },
};
export const DRIVE_REFERENCE = {
    'mastery': { mean: 1.6783, sd: 0.7272 },
    'achievement': { mean: 1.2773, sd: 0.4813 },
    'recognition': { mean: 0.9262, sd: 0.6246 },
    'meaning': { mean: 1.718, sd: 0.744 },
    'belonging': { mean: 0.8206, sd: 0.6895 },
    'freedom': { mean: 1.431, sd: 0.6601 },
    'care': { mean: 1.2048, sd: 0.5029 },
    'understanding': { mean: 0.9351, sd: 0.4526 },
    'self-expression': { mean: 0.9336, sd: 0.6967 },
    'beauty': { mean: 0.5486, sd: 0.4526 },
    'creative': { mean: 1.5438, sd: 0.8055 },
    'persistent': { mean: 4.338, sd: 1.2373 },
    'emotionally-sensitive': { mean: 3.1001, sd: 1.2892 },
    'communicative': { mean: 2.1249, sd: 1.2178 },
};
