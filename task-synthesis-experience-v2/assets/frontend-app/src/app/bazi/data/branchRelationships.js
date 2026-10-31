/** Six Clashes (六冲) — branches exactly six positions apart. Structural fact, undisputed. */
export const BRANCH_SIX_CLASHES = [
    [0, 6], // Zi - Wu
    [1, 7], // Chou - Wei
    [2, 8], // Yin - Shen
    [3, 9], // Mao - You
    [4, 10], // Chen - Xu
    [5, 11], // Si - Hai
];
/** Six Harmonies (六合) — paired branches with a commonly-cited resulting element. Zi-Chou is
 *  Earth (the more common attribution used here). Wu-Wei has no consistently agreed resulting
 *  element across sources, so it is left `null` rather than guessed. Transformation into the
 *  resulting element is never asserted, only the structural pairing. */
export const BRANCH_SIX_HARMONIES = [
    { pair: [0, 1], resultingElement: 'Earth' }, // Zi - Chou
    { pair: [2, 11], resultingElement: 'Wood' }, // Yin - Hai
    { pair: [3, 10], resultingElement: 'Fire' }, // Mao - Xu
    { pair: [4, 9], resultingElement: 'Metal' }, // Chen - You
    { pair: [5, 8], resultingElement: 'Water' }, // Si - Shen
    { pair: [6, 7], resultingElement: null }, // Wu - Wei
];
/** Three Harmonies (三合) — trios that form a full elemental "bureau" when all three branches
 *  are present; any two of the three is a recognized partial combination. */
export const BRANCH_THREE_HARMONIES = [
    { trio: [8, 0, 4], resultingElement: 'Water' }, // Shen - Zi - Chen
    { trio: [11, 3, 7], resultingElement: 'Wood' }, // Hai - Mao - Wei
    { trio: [2, 6, 10], resultingElement: 'Fire' }, // Yin - Wu - Xu
    { trio: [5, 9, 1], resultingElement: 'Metal' }, // Si - You - Chou
];
/** Six Harms (六害) — a standard, structurally fixed pairing table. */
export const BRANCH_SIX_HARMS = [
    [0, 7], // Zi - Wei
    [1, 6], // Chou - Wu
    [2, 5], // Yin - Si
    [3, 4], // Mao - Chen
    [8, 11], // Shen - Hai
    [9, 10], // You - Xu
];
/** Three Punishments (三刑) trios; any two present is a recognized partial punishment. */
export const BRANCH_THREE_PUNISHMENT_GROUPS = [
    { trio: [2, 5, 8], label: 'Punishment of ungratefulness (Yin-Si-Shen)' },
    { trio: [1, 10, 7], label: 'Punishment of relying on power (Chou-Xu-Wei)' },
];
/** Mutual (pair, not trio) punishment: Zi-Mao, "punishment of impropriety". */
export const BRANCH_MUTUAL_PUNISHMENT = [0, 3];
/** Self-punishment branches: recognized only when the same branch appears in two different
 *  pillars (Chen-Chen, Wu-Wu, You-You, Hai-Hai). */
export const BRANCH_SELF_PUNISHMENT_INDEXES = [4, 6, 9, 11];
