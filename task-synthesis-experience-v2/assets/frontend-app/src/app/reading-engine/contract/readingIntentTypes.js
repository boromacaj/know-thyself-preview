/**
 * THE READING INTENT: WHAT A READING MEANS, DECIDED BEFORE ANY LANGUAGE SAYS IT.
 *
 * A reading is produced in two halves. The INTELLIGENCE half decides what the reading means: which facts were calculated, what the tradition says about them, what matters most
 * here, how the meanings relate and what may not be said. The REALIZATION half says it. This file is the boundary between them, and nothing on this side of the boundary is a
 * sentence: a proposition is a closed FRAME with typed SLOTS, never a paragraph. Words belong to a renderer (today the deterministic one that already ships).
 *
 * It is not a new idea in this repository. It generalises what already exists, piece by piece:
 *   - Forecast `DayStory`'s `Proposition` and per-sentence claim ledger (forecast-v2/dayStory.ts) -> proposition ids, basis, what a claim may say
 *   - the Connections evidence envelope (connections/contract) -> roots, adequacy, language-free rule, `mustNotMean`
 *   - Tarot's `QuestionReadingPlan` / `ReaderInterpretation` / `SynthesisTrace` -> per-place facts, relations, uncertainty, prohibitions
 *   - the pillar narrative plans (`*NarrativePlan`) -> claims decided before language
 * Phase 1 adds no doctrine and no wording. It gives those pieces one shape that can be validated, hashed, traced and handed to either kind of renderer.
 *
 * TWO KINDS OF CERTAINTY, KEPT APART. A calculation can be exact while its interpretation is a symbolic reading. `calculation` says how firmly the INPUTS and the structure are
 * known (the card that was drawn, the way up, the place); `interpretation` says what KIND of claim is made about the person from them and the strongest wording it may ever
 * be given. The first never raises the second: a determined draw does not make a symbolic reading a fact, and agreement between two symbolic systems is not confirmation of a
 * trait (see `Convergence`: `empiricallyConfirmed` is the literal type `false`).
 */
export const READING_INTENT_CONTRACT_VERSION = 'reading-intent/1.0.0';
/**
 * 1.1.0 = 1.0.0 plus `context.question.focus`: what the person wants to know about the matter, as the closed value the canonical question analysis found (or null when the wording
 * does not say). It is purely additive, so a 1.1.0 digest differs from the 1.0.0 digest of the same reading, and ONLY for a question that has a standard reading: the daily and the
 * support-first intents are unchanged and stay 1.0.0, and every intent built for the frozen evidence is built at 1.0.0 on request, so its digest is reproducible. An intent
 * carries the lowest version that can express it.
 */
export const READING_INTENT_CONTRACT_VERSION_1_1 = 'reading-intent/1.1.0';
export const READING_INTENT_CONTRACT_VERSIONS = [READING_INTENT_CONTRACT_VERSION, READING_INTENT_CONTRACT_VERSION_1_1];
/* ------------------------------------------------------------------ identity -- */
export const PILLAR_IDS = ['tarot', 'astrology', 'numerology', 'bazi', 'human-design', 'forecast', 'cross-pillar', 'connections'];
/**
 * TWO DIFFERENT QUESTIONS, TWO TABLES. "May an intent carry this kind?" is a question about the SCHEMA; "can the engine build one?" is a question about CAPABILITY. They are
 * answered separately so that vocabulary can never be read as a promise.
 *
 * SCHEMA_READING_KINDS_BY_PILLAR is the closed vocabulary of reading kinds the contract has a name for. A name here says nothing about whether anything builds it: Tarot's four
 * kinds are named because the contract was designed around the Tarot Reader's structures (and the frozen Tarot evidence of earlier phases is expressed in them), not because a
 * Tarot adapter exists.
 *
 * IMPLEMENTED_READING_KINDS_BY_PILLAR is the capability table. A kind is listed here only when an adapter that builds it and the fixtures that pin its digests exist in the same
 * change. A pillar with no adapter has an empty list. In the foundation baseline Tarot's list was EMPTY: the Tarot adapter was a separate, later change, and that change (and only that
 * change) moves its kinds across.
 *
 * (The Tarot adapter, `reading-engine/tarot`, is that change: its four kinds are implemented from here on. `tarot-support-first` is implemented as a NO-READING case: the intent it builds
 * carries the policy's notice and a withheld "no reading" notice, and `tarotReadingStatus` answers `none`.)
 *
 * The validator requires BOTH: a kind the schema does not name is `KIND`, a kind the schema names but nothing builds is `KIND_NOT_IMPLEMENTED`. `isImplementedReadingKind` and
 * `hasReadingAdapter` are the questions a caller asks before routing a reading to the engine; the schema table is never that question.
 */
export const SCHEMA_READING_KINDS_BY_PILLAR = {
    tarot: ['tarot-daily', 'tarot-question', 'tarot-single-card', 'tarot-support-first'],
    astrology: ['astrology-natal'], numerology: ['numerology-natal'], bazi: ['bazi-natal'], 'human-design': ['human-design-natal'], forecast: ['forecast-year', 'forecast-month', 'forecast-day'], 'cross-pillar': ['cross-pillar-natal'],
    connections: ['connections-romantic', 'connections-family', 'connections-work', 'connections-parenting'],
};
export const IMPLEMENTED_READING_KINDS_BY_PILLAR = {
    tarot: ['tarot-daily', 'tarot-question', 'tarot-single-card', 'tarot-support-first'],
    astrology: ['astrology-natal'], numerology: ['numerology-natal'], bazi: ['bazi-natal'], 'human-design': ['human-design-natal'], forecast: ['forecast-year', 'forecast-month', 'forecast-day'], 'cross-pillar': ['cross-pillar-natal'],
    connections: ['connections-romantic', 'connections-family', 'connections-work', 'connections-parenting'],
};
/** True when the contract has a name for this kind. Says nothing about an adapter. */
export const isSchemaReadingKind = (pillar, kind) => SCHEMA_READING_KINDS_BY_PILLAR[pillar]?.includes(kind) ?? false;
/** True when an adapter that builds this kind exists. The only test a caller may use to decide the engine can produce a reading. */
export const isImplementedReadingKind = (pillar, kind) => IMPLEMENTED_READING_KINDS_BY_PILLAR[pillar]?.includes(kind) ?? false;
/** True when the pillar has at least one implemented reading kind. */
export const hasReadingAdapter = (pillar) => (IMPLEMENTED_READING_KINDS_BY_PILLAR[pillar]?.length ?? 0) > 0;
/* --------------------------------------------------------------- epistemics -- */
/** How firmly the INPUTS and structure of a claim are known: the calculation, not the meaning. */
export const DETERMINACY = ['determined', 'conditional', 'withheld'];
/** Whether everything the claim depends on was available. `insufficient` means the claim must be withheld. */
export const ADEQUACY = ['full', 'partial', 'insufficient'];
/**
 * What kind of claim is made.
 *   structural-observation  about the calculated structure itself ("the card in the second place is reversed")
 *   tradition-convention    what the tradition holds a symbol to mean ("in the tradition, this card is about ...")
 *   symbolic-reading        applying the symbolism to the person's situation ("here this may point to ...")
 */
export const INTERPRETIVE_STATUS = ['structural-observation', 'tradition-convention', 'symbolic-reading'];
/** The strongest way a claim may be worded, weakest first. Rank is the index. `assert` is reserved for structure and for what the tradition holds. */
export const MODALITIES = ['withheld', 'possibility', 'tentative', 'tendency', 'assert'];
export const modalityRank = (modality) => MODALITIES.indexOf(modality);
/** What the claim is about. Only `structure` and `tradition` may be asserted; everything about a person, a situation, another person or the future is at most a tendency. */
export const CLAIM_SCOPES = ['structure', 'tradition', 'situation', 'person', 'other-person', 'future'];
/** Inferences a renderer must never draw from this proposition. The first five are the Tarot Reader's own prohibitions (readerInterpretation); the rest are the safety flags. */
export const FORBIDDEN_INFERENCES = [
    'private-thoughts', 'event-prediction', 'person-identified', 'assumption-as-fact', 'verdict',
    'diagnosis', 'domain-transfer', 'empirical-confirmation', 'certainty-from-agreement',
];
export const ROOT_PATTERN = /^(system|shared|tarot):[A-Za-z0-9][A-Za-z0-9._/@+-]*$/;
/** Slot strings are identifiers, never prose: no spaces, no punctuation beyond the token set below. This is how "no prewritten paragraphs" is enforced. */
export const SLOT_TOKEN_PATTERN = /^[A-Za-z0-9][A-Za-z0-9:_./@+#-]*$/;
export const PROPOSITION_ROLES = ['thesis', 'support', 'tension', 'caveat', 'practice', 'exception', 'context'];
/** MUST must be covered; SUPPORTING if the budget allows; OPTIONAL is detail; INTERNAL informs order but is never named; NEVER is a fact that must not be said. */
export const DISCLOSURES = ['must', 'supporting', 'optional', 'internal', 'never'];
export const VALENCES = ['capacity', 'cost', 'mixed', 'neutral'];
/* ---------------------------------------------------------------- relations -- */
/**
 * `unresolved`: the two vocabularies CONTRADICT each other (one says the cards pull against each other, the other that they go along or settle); reported, never settled by a renderer.
 * `mixed`: the two name different kinds of relation that can both be true of the same two cards; both hold, and the natives say which.
 */
export const RELATION_CLASSES = ['accord', 'friction', 'resolution', 'causal', 'sequence', 'mixed', 'unresolved'];
export const RELATION_BACKINGS = ['table', 'positional', 'derived'];
export const RELATION_SALIENCES = ['defining', 'notable', 'quiet'];
export const RELATION_STATUSES = ['agreed', 'compatible', 'single-source', 'differs'];
/* ----------------------------------------------------------- discourse plan -- */
export const DISCOURSE_PURPOSES = ['ground', 'develop', 'tension', 'synthesis', 'practice', 'limit'];
export const TAKEAWAY_ACTS = ['continue', 'redirect', 'let-go', 'moderate', 'meet-it', 'wait', 'choose', 'integrate', 'attend-to-it', 'none'];
/**
 * WHERE THE RELATION THE READING IS BUILT AROUND COMES FROM. The two Tarot stacks name a relation each; they need not name the same pair (the plan's hinge is where the spread's
 * progression turns, the English central relation is the relationship carrying most of the meaning for the question), and independent review found the difference legitimate in
 * about nine readings in ten. The argument is chosen, not defaulted:
 *   s2-table         the English central relation, backed by the relation table
 *   s2-corroborated  the English central relation resting on the places of the spread only, accepted because the plan names the same kind of relation for the pair (they agree)
 *   s1-hinge         the plan's hinge, when the English central is positional-only without that corroboration (or disputed)
 *   s1-tension       the plan's strongest tension, when there is no usable hinge
 *   none             no relation is claimed: the reading says what each card brings and no more
 */
export const ARGUMENT_SOURCES = ['s2-table', 's2-corroborated', 's1-hinge', 's1-tension', 'none'];
/**
 * What the closing practical point asks, derived from the reading's plan and grounded in its argument.
 *   target           the proposition at the plan's response place: the card whose place asks what to do (null when the plan has none)
 *   relationTargets  the two ends of the argument relation, when there is one
 *   grounding        `place-and-relation` (the response card is one end of the argument), `place` (the response card stands apart from it), `relation` (no response place; the argument
 *                    carries it), `none`
 * `relationMode` is what the English layer's relation machinery asked, and `legacy` records the card and source the shipped renderer chose, kept for comparison, not as an instruction.
 */
export const TAKEAWAY_GROUNDINGS = ['place-and-relation', 'place', 'relation', 'none'];
/* -------------------------------------------------------------- reading rules -- */
export const SAFETY_LEVELS = ['standard', 'bounded', 'support-first'];
