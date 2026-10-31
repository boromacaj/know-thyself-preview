/**
 * THE CANONICAL PROVENANCE MODEL
 * ==============================
 *
 * Where a claim came from, how firm it is, and what state the calculation under
 * it was in. Shared by the knowledge layer (which AUTHORS the first two) and the
 * synthesis layer (which OBSERVES the third and DERIVES weight from all three).
 *
 * THE PROBLEM THIS SOLVES
 * -----------------------
 * The two foundation workstreams arrived with overlapping-but-different models:
 *
 *   knowledge   one enum: calculated-fact | established | contextual-derivation
 *               | tradition-specific | contested
 *
 *   synthesis   three enums: interpretation (direct | derived |
 *               tradition-specific | contested), confidence
 *               (established-within-system | conventional | provisional |
 *               contested), methodology (calculated | time-sensitive |
 *               suppressed)
 *
 * Collapsing them into one enum would have been tidy and wrong: it would have
 * lost the distinction between *how a claim was arrived at* and *how firm it is*
 * — a tradition-specific reading can be rock solid inside its school or barely
 * agreed even there, and those are different facts. Keeping all four enums would
 * have stored the same truth twice.
 *
 * THE RESOLUTION - THREE ORTHOGONAL QUESTIONS
 * -------------------------------------------
 *   kind          What KIND of claim is this? Owned and authored by knowledge.
 *   settledness   How FIRM is it? Owned and authored by knowledge.
 *   methodology   What state was the CALCULATION in? Not authored anywhere. It
 *                 is a runtime property of one profile, observed by synthesis
 *                 from the engines' own suppression flags.
 *
 * `kind` and `settledness` are constrained, not independent — see
 * LEGAL_SETTLEDNESS below and the test that enforces it. That constraint is what
 * stops them drifting into two spellings of one fact.
 *
 * Synthesis derives every weighting factor from these three fields and never
 * stores its own opinion of them. The traceable chain is:
 *
 *   calculated fact -> knowledge unit -> provenance -> semantic signal
 *                   -> evidence -> weight -> theme
 */
/**
 * Which settledness values are coherent with which kind.
 *
 * A contested claim cannot also be established; a bare calculated fact cannot be
 * provisional, because there is no interpretation in it to be unsure about. The
 * matrix is enforced by assertLegalProvenance() and by a test over every
 * registered knowledge unit, so the two fields cannot drift into redundancy or
 * into nonsense.
 */
export const LEGAL_SETTLEDNESS = {
    'calculated-fact': ['established-within-system'],
    established: ['established-within-system', 'conventional'],
    'contextual-derivation': ['conventional', 'provisional'],
    'tradition-specific': ['conventional', 'provisional'],
    contested: ['contested'],
};
export function isLegalProvenance(kind, settledness) {
    return LEGAL_SETTLEDNESS[kind].includes(settledness);
}
export function assertLegalProvenance(provenance, where) {
    if (!isLegalProvenance(provenance.kind, provenance.settledness)) {
        throw new Error(`${where}: provenance kind '${provenance.kind}' cannot be '${provenance.settledness}' ` +
            `(legal: ${LEGAL_SETTLEDNESS[provenance.kind].join(', ')})`);
    }
}
/* ------------------------------------------------------------------ *
 * WEIGHTING FACTORS - derived, never stored
 * ------------------------------------------------------------------ */
/**
 * How far a claim's kind discounts its weight.
 *
 * A calculated fact and an established meaning are both full weight: one is not
 * an interpretation and the other is what the tradition uniformly says. Each
 * further step away from that costs something, and contested costs a lot,
 * because a reading practitioners argue about must be able to colour a theme
 * that other evidence already carries and must never establish one alone.
 */
export const KIND_FACTOR = {
    'calculated-fact': 1,
    established: 1,
    'contextual-derivation': 0.8,
    'tradition-specific': 0.65,
    contested: 0.4,
};
export const SETTLEDNESS_FACTOR = {
    'established-within-system': 1,
    conventional: 0.85,
    provisional: 0.6,
    contested: 0.4,
};
/**
 * Suppressed is 0, not a small number.
 *
 * When an engine refuses to compute something, the evidence is retained in the
 * output for inspection but cannot influence any theme. Downgrading rather than
 * excluding would let a profile with no birth time quietly accumulate
 * conclusions it has not earned.
 */
export const METHODOLOGY_FACTOR = {
    calculated: 1,
    'time-sensitive': 0.7,
    suppressed: 0,
};
/** The provenance contribution to an evidence weight. Multiplied, not averaged. */
export function provenanceFactor(kind, settledness, methodology) {
    return KIND_FACTOR[kind] * SETTLEDNESS_FACTOR[settledness] * METHODOLOGY_FACTOR[methodology];
}
