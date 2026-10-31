/**
 * GUIDED TAROT - THE VOCABULARY.
 *
 * A guided reading starts from two CHOICES, never from text: a life area and, inside it, one intention. Both are stable,
 * language-independent ids defined in application code (guidedCatalog.ts); nothing a person types, no stored string and no
 * label decides which area or intention a reading is about. What a person SEES (labels, hints, places, sentences) is
 * localized content that hangs off those ids.
 *
 * An intention is not a label. It is a small SEMANTIC DEFINITION the interpretation layer reads:
 *
 *   what the reading explores        `explores`, `category`, `guidance`, `temporal`
 *   what kind of reflection fits     `reflection`
 *   what the places mean             `spreadId` + `places` (a label and one sentence for each place)
 *   what practical takeaway fits     `practical` and the four `takeaway` sentences
 *   which claims the cards must not  `forbids`, enforced by the audit (guidedAudit.ts)
 *
 * Everything here is language-free except the `LocalizedText` values, so English and Slovak cannot reach different
 * conclusions about one intention.
 */
export const GUIDED_AREA_IDS = [
    'relationships', 'work-career', 'finances-stability', 'personal-growth',
    'life-changes', 'home-moving', 'travel-experiences',
];
/** The kind of reflection an intention invites. Decides nothing about the cards; it states what the person is doing with them. */
export const REFLECTION_KINDS = [
    /** Take stock of how something stands. */
    'orient',
    /** Look at what strains, and why it keeps going. */
    'untangle',
    /** Find what already supports. */
    'resource',
    /** Bring something overlooked into view. */
    'notice',
    /** Hold two pulls side by side. */
    'weigh',
    /** Follow something back to where it comes from. */
    'trace',
    /** Look at what could be put down. */
    'release',
    /** Find a next move that is small enough to take. */
    'step',
    /** Ask what a thing means to the person. */
    'meaning',
];
/** The kind of practical thing the closing may offer. */
export const PRACTICAL_KINDS = ['observe', 'try', 'ask', 'put-down', 'steady', 'prepare', 'name'];
/**
 * What a reading of this intention may never say. Each one is enforced twice: the closed set of sentences the content layer
 * can write is written against it, and the audit (guidedAudit.ts) fails any composed text that matches its patterns.
 */
export const FORBIDDEN_CLAIMS = [
    /** An event or an outcome stated as going to happen. */
    'predict-outcome',
    /** What another person privately thinks, feels, intends or does. */
    'other-person-mind',
    /** An investment, a purchase, a sale, a bet, an amount or a financial verdict. */
    'financial-advice',
    /** A diagnosis, a treatment, or a reading of someone's mental health. */
    'health-claim',
    /** A legal conclusion. */
    'legal-claim',
    /** An instruction to quit, leave, move, end or commit. */
    'life-directive',
    /** Fate, destiny, "meant to be", a message from the universe. */
    'fate-claim',
];
/** The practical sentence that closes a reading, chosen by what the answering card asks of the person. */
export const TAKEAWAY_GROUPS = ['act', 'ease', 'face', 'weave'];
/** continue/redirect/choose act; let-go/moderate/wait ease; meet-it/attend-to-it face; integrate weaves. */
export const TAKEAWAY_GROUP_OF = {
    continue: 'act', redirect: 'act', choose: 'act',
    'let-go': 'ease', moderate: 'ease', wait: 'ease',
    'meet-it': 'face', 'attend-to-it': 'face',
    integrate: 'weave',
};
export const pickText = (text, locale) => text[locale];
