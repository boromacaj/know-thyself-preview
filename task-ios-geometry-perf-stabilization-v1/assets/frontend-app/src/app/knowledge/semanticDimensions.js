import { ALL_DIMENSIONS, DIMENSION_NOTES, isUnipolar, } from '../semantics/semanticTaxonomy.js?v=d9f39e7';
/**
 * THE KNOWLEDGE LAYER'S VIEW OF THE CANONICAL SEMANTIC TAXONOMY.
 *
 * This file no longer defines a vocabulary. It used to: fifteen signed
 * dimensions, private to the knowledge layer, which overlapped the synthesis
 * layer's ten axes without matching them. Both are now one closed vocabulary in
 * `app/semantics/semanticTaxonomy.ts`, and this module is the authoring
 * ergonomics for content files plus the one rule they must obey.
 *
 * THE RULE: WEIGHTS ARE MAGNITUDES, NOT SIGNED VALUES.
 *
 * The old model wrote `sig('relational', -0.5)` and meant "pulls away from
 * relatedness". Under the canonical taxonomy that is `sig('independent', 0.5)` -
 * the opposing pole, named. This is not cosmetic. A signed weight on a UNIPOLAR
 * dimension had nowhere to land: `sig('sensitivity', -0.4)` could only assert
 * that the absence of sensitivity is itself a quality, which manufactures a
 * negative claim out of silence. Naming the pole makes that impossible to write
 * by accident, and sig() rejects a non-positive weight outright.
 *
 * These signals are NEVER rendered. They are the join keys that let synthesis
 * notice that four systems are saying the same thing in four dialects.
 */
export { ALL_DIMENSIONS, DIMENSION_NOTES, isUnipolar };
/** Kept under its historical name so existing callers and tests keep working. */
export const SEMANTIC_DIMENSIONS = DIMENSION_NOTES;
export const ALL_SEMANTIC_DIMENSIONS = ALL_DIMENSIONS;
/**
 * Terse constructor for content files: `sig('intuitive', 0.8)`.
 *
 * Throws on a weight outside (0, 1]. A zero says nothing and should be an
 * omission; a negative means the author wanted the other pole and should name
 * it. Both are authoring mistakes worth failing loudly at module load rather
 * than silently carrying into a synthesis weight.
 */
export function sig(dimension, weight) {
    if (!(weight > 0) || weight > 1) {
        throw new Error(`semantic weight for '${dimension}' must be in (0, 1], received ${weight}. ` +
            'Name the opposing pole instead of using a negative weight.');
    }
    return { dimension, weight };
}
