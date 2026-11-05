/**
 * THE CANONICAL SEMANTIC TAXONOMY
 * ===============================
 *
 * ONE vocabulary, shared by the knowledge layer and the synthesis layer. It
 * lives here — in a neutral module that neither owns — precisely so that neither
 * can quietly grow its own dialect. Before this file existed there were two
 * lists: `knowledge/semanticDimensions.ts` (fifteen signed dimensions) and
 * `synthesis/foundation/semanticTaxonomy.ts` (ten bipolar axes plus four
 * unipolar). They overlapped by about two thirds and disagreed about the rest,
 * which would have made every convergence measurement across them meaningless.
 * See docs/architecture/INTERPRETATION_AND_SYNTHESIS_ARCHITECTURE.md for the
 * merge table.
 *
 * WHY BIPOLAR AXES RATHER THAN A FLAT TAG LIST
 * --------------------------------------------
 * A flat list of adjectives makes two things impossible. First, it invites
 * near-duplicates - 'disciplined', 'structured', 'orderly', 'methodical' would
 * all appear and each be counted as separate support for the same idea, which is
 * double-counting wearing a thesaurus. Second, it gives contradiction detection
 * nothing to work with: you cannot tell that 'independent' and 'collaborative'
 * are in tension unless the model knows they are two ends of one axis.
 *
 * So the taxonomy is ten BIPOLAR AXES plus four UNIPOLAR dimensions. An axis has
 * two opposed poles and evidence lands on one of them. Tension detection then
 * falls out of the structure: it is an axis with real weight on both ends.
 *
 * WHY SOME DIMENSIONS ARE UNIPOLAR
 * --------------------------------
 * Not every quality has an honest opposite. The absence of evidence for
 * creativity is not evidence of being uncreative - it usually just means no
 * symbol in the chart happened to speak to it. Forcing a 'non-creative' pole
 * would manufacture negative claims out of silence. These four are recorded only
 * in the positive direction, and their absence says nothing.
 *
 * This is the rule that the fifteen-dimension knowledge model got wrong. It
 * allowed a signed weight on every dimension, including ones with no honest
 * opposite, so `sensitivity: -0.4` had to mean something and there was nothing
 * for it to mean. Those sites were re-authored during the merge onto poles that
 * actually exist.
 *
 * DELIBERATE OMISSIONS
 * --------------------
 * 'leadership' is not a dimension. It is not a primitive - it reads as the
 * convergence of `assertive` and `independent`, and the domain layer derives it
 * there. Keeping it would let one underlying idea be counted twice.
 * 'disciplined' folds into `structured`, 'spontaneous' into `adaptable`,
 * 'reserved' into `private`, 'relational' into `collaborative`, and 'expressive'
 * splits into `emotionally-expressive` and `communicative`, which are genuinely
 * different things: one is about affect, the other about language.
 *
 * The taxonomy is CLOSED. Neither authored knowledge nor an adapter may invent a
 * dimension; the type system refuses anything not listed here. Growing it is a
 * deliberate act that requires revisiting the clustering table, because a new
 * dimension that no theme consumes is evidence that vanishes.
 */
export const SEMANTIC_AXES = [
    {
        id: 'inner-focus',
        label: 'Inner focus',
        poles: ['introspective', 'outwardly-engaged'],
        coexistenceIsOrdinary: true,
    },
    {
        id: 'reasoning',
        label: 'Reasoning mode',
        poles: ['analytical', 'intuitive'],
        coexistenceIsOrdinary: true,
    },
    {
        id: 'autonomy',
        label: 'Autonomy',
        poles: ['independent', 'collaborative'],
        coexistenceIsOrdinary: false,
    },
    {
        id: 'structure',
        label: 'Structure',
        poles: ['structured', 'adaptable'],
        coexistenceIsOrdinary: false,
    },
    {
        id: 'risk',
        label: 'Risk posture',
        poles: ['cautious', 'risk-oriented'],
        coexistenceIsOrdinary: false,
    },
    {
        id: 'emotional-expression',
        label: 'Emotional expression',
        poles: ['emotionally-expressive', 'emotionally-contained'],
        coexistenceIsOrdinary: false,
    },
    {
        id: 'visibility',
        label: 'Visibility',
        poles: ['private', 'social'],
        coexistenceIsOrdinary: true,
    },
    {
        id: 'change',
        label: 'Appetite for change',
        poles: ['stability-seeking', 'novelty-seeking'],
        coexistenceIsOrdinary: false,
    },
    {
        id: 'initiative',
        label: 'Initiative',
        poles: ['assertive', 'receptive'],
        coexistenceIsOrdinary: true,
    },
    {
        id: 'abstraction',
        label: 'Abstraction',
        poles: ['practical', 'conceptual'],
        coexistenceIsOrdinary: true,
    },
];
/** Style dimensions with no honest opposite; silence about them means nothing. */
export const UNIPOLAR_DIMENSIONS = [
    'creative',
    'persistent',
    'emotionally-sensitive',
    'communicative',
];
/**
 * WHAT A PERSON APPEARS TO BE FOR.
 *
 * Ten, deliberately - enough to tell a craftsman from an organiser from someone
 * who needs to be understood, and few enough that no two of them are the same
 * idea in different words. Each one has to be something all four traditions can
 * genuinely speak to: a Ten God family, a numerology number's core want, a
 * planet's function, a Human Design channel's purpose.
 */
export const DRIVE_DIMENSIONS = [
    'mastery',
    'achievement',
    'recognition',
    'meaning',
    'belonging',
    'freedom',
    'care',
    'understanding',
    'self-expression',
    'beauty',
];
/**
 * What each dimension means, for maintainers only.
 *
 * NEVER RENDERED TO A READER. These are join keys that let four incompatible
 * vocabularies be compared; nobody wants to be told they scored 0.7 on
 * introspective. A test asserts these words do not leak into authored prose.
 */
export const DIMENSION_NOTES = {
    introspective: 'Turns inward to process.',
    'outwardly-engaged': 'Processes outward, in company or in motion.',
    analytical: 'Reaches conclusions by taking things apart.',
    intuitive: 'Knows before it can say why.',
    independent: 'Sets its own terms.',
    collaborative: 'Organised around other people; needs a shared frame to move.',
    structured: 'Wants form, sequence and a finished edge.',
    adaptable: 'Changes shape to fit conditions.',
    cautious: 'Sizes the downside first.',
    'risk-oriented': 'Comfortable with exposure.',
    'emotionally-expressive': 'Feeling is available and shows.',
    'emotionally-contained': 'Feeling is held, checked, and released deliberately.',
    private: 'Works out of view and reports only the result.',
    social: 'Operates in company and is energised by it.',
    'stability-seeking': 'Values the reliable and the continuous.',
    'novelty-seeking': 'Pulled toward the untried.',
    assertive: 'Moves first and takes the decision.',
    receptive: 'Waits for the situation to declare itself, then responds.',
    practical: 'Trusts what can be handled and measured.',
    conceptual: 'Works in models and abstractions.',
    creative: 'Makes something that was not there.',
    persistent: 'Keeps going past the point where the interest ran out.',
    'emotionally-sensitive': 'Registers small changes in the emotional field.',
    communicative: 'Needs to put it into words.',
    /* Drives. Read as "is drawn toward", never as "is good at". */
    mastery: 'Wants to be genuinely good at something, and will go deep to get there.',
    achievement: 'Wants the result: something built, won, earned or finished.',
    recognition: 'Wants the contribution seen and credited.',
    meaning: 'Needs the larger point of the thing, not only the thing.',
    belonging: 'Wants to be part of something and close to particular people.',
    freedom: 'Needs room to move, and resists being held to a shape somebody else set.',
    care: 'Is drawn to looking after people, work or things that need it.',
    understanding: 'Wants to know why, for its own sake.',
    'self-expression': 'Needs what is inside to reach a form other people can meet.',
    beauty: 'Is drawn to form, craft and things being right to the senses.',
};
const AXIS_BY_DIMENSION = new Map();
for (const axis of SEMANTIC_AXES) {
    AXIS_BY_DIMENSION.set(axis.poles[0], axis);
    AXIS_BY_DIMENSION.set(axis.poles[1], axis);
}
/** The axis a dimension belongs to, or null when it is unipolar. */
export function axisForDimension(dimension) {
    return AXIS_BY_DIMENSION.get(dimension) ?? null;
}
/** The opposing pole, or null when the dimension is unipolar. */
export function opposingDimension(dimension) {
    const axis = AXIS_BY_DIMENSION.get(dimension);
    if (!axis)
        return null;
    return axis.poles[0] === dimension ? axis.poles[1] : axis.poles[0];
}
/** Every dimension in the closed vocabulary: axes, unipolar style, then drives. */
export const ALL_DIMENSIONS = [
    ...SEMANTIC_AXES.flatMap((axis) => [axis.poles[0], axis.poles[1]]),
    ...UNIPOLAR_DIMENSIONS,
    ...DRIVE_DIMENSIONS,
];
export function isUnipolar(dimension) {
    return !AXIS_BY_DIMENSION.has(dimension);
}
const DRIVE_SET = new Set(DRIVE_DIMENSIONS);
/** Which family a dimension belongs to: how someone operates, or what drives them. */
export function dimensionFamily(dimension) {
    return DRIVE_SET.has(dimension) ? 'drive' : 'style';
}
