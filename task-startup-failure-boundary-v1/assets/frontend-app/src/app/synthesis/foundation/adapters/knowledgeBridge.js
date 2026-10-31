import { KNOWLEDGE } from '../../../knowledge/knowledgeBase.js?v=2ea79e9';
import { resolveInterpretation } from '../../../knowledge/resolveKnowledge.js?v=2ea79e9';
import { dimensionFamily } from '../../../semantics/semanticTaxonomy.js?v=2ea79e9';
/**
 * THE KNOWLEDGE -> EVIDENCE BRIDGE
 * ================================
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE
 * ------------------------------------
 * Synthesis does not decide what anything means. If the knowledge layer holds a
 * unit for an entity, its semantics and its provenance are what reach the
 * evidence set. An adapter may normalise a pillar's STRUCTURE - which entity is
 * central, which facts descend from the same root, whether the birth time was
 * good enough - and nothing else.
 *
 * Before the integration, all four adapters carried their own meaning tables:
 * `NUMBER_DIMENSIONS`, `ELEMENT_DIMENSIONS`, `TYPE_DIMENSIONS` and friends. They
 * were a second interpretation database, smaller and blunter than the authored
 * one, and the two would have drifted the first time anybody edited either. Life
 * Path 7 meant `introspective, analytical, private, conceptual` in the adapter
 * and something considerably more specific in the knowledge unit, and nothing
 * would have flagged the divergence.
 *
 * WHAT A MISSING UNIT MEANS
 * -------------------------
 * Silence. `knowledgeEvidence()` returns an empty array when nothing is written
 * for an entity, and the caller emits nothing rather than falling back to a
 * guess. That is why a Profile 4/6 currently produces no profile evidence while
 * a 5/1 produces plenty: the content is not written yet, and inventing it at the
 * adapter would hide exactly the gap the content plan needs to see.
 *
 * A caller may supply SEVERAL requests in preference order - the composed
 * placement first, the plain sign second - and the first that resolves wins. The
 * resolved unit id is recorded on every evidence item, so any weight in the
 * output can be traced back to the paragraph a reader would be shown.
 */
/** The knowledge layer and the synthesis layer name two pillars differently. */
const SYSTEM_FOR_PILLAR = {
    numerology: 'numerology',
    astrology: 'western-astrology',
    bazi: 'bazi',
    'human-design': 'human-design',
};
/**
 * Resolve one seed against the knowledge base and expand it into evidence.
 *
 * One evidence item per semantic signal on the resolved reading. Weighting later
 * multiplies by the signal's own magnitude, so a unit that reads 0.9
 * introspective and 0.4 private contributes proportionally rather than casting
 * two equal votes - which is what the pre-integration adapters did, because
 * their tables had no magnitudes to carry.
 */
export function bridgeSeed(pillar, seed) {
    const system = SYSTEM_FOR_PILLAR[pillar];
    let resolved = null;
    for (const lookup of seed.lookups) {
        resolved = resolveInterpretation(KNOWLEDGE, { ...lookup, system });
        if (resolved)
            break;
    }
    if (!resolved)
        return { evidence: [], resolved: null };
    const methodology = seed.methodology ?? 'calculated';
    const seen = new Set();
    const evidence = [];
    for (const signal of resolved.semantics) {
        if (seed.family && dimensionFamily(signal.dimension) !== seed.family)
            continue;
        /* One source can reach the same dimension by two routes - a base archetype
           and an overlay both landing on `introspective`. mergeSemantics already
           summed those, so a duplicate here would be a bug rather than a reading,
           but the guard is cheap and the id must stay unique regardless. */
        if (seen.has(signal.dimension))
            continue;
        seen.add(signal.dimension);
        evidence.push({
            id: `${pillar}:${seed.sourceEntity}:${signal.dimension}`,
            pillar,
            sourceEntity: seed.sourceEntity,
            fact: seed.fact,
            dimension: signal.dimension,
            semanticWeight: signal.weight,
            strength: seed.strength,
            /* Straight from the resolved reading, including any weakening a fired
               overlay caused. Synthesis does not get an opinion about this. */
            interpretationKind: resolved.effectiveKind,
            settledness: resolved.effectiveSettledness,
            methodology,
            independenceGroup: seed.independenceGroup,
            knowledgeUnitId: resolved.unitId,
            ...(seed.context === undefined ? {} : { context: seed.context }),
        });
    }
    return { evidence, resolved };
}
export function bridgeSeeds(pillar, seeds) {
    return seeds.flatMap((seed) => bridgeSeed(pillar, seed).evidence);
}
