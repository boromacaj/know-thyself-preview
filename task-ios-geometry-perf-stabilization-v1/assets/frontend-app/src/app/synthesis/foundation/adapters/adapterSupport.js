/**
 * Expand one structural seed into one evidence item per dimension.
 *
 * The id is `${pillar}:${sourceEntity}:${dimension}` and therefore stable across
 * runs and unique by construction, which is what lets the independence pass
 * address items by id without a counter that would drift with ordering.
 */
export function structuralEvidence(pillar, seed) {
    /* DE-DUPLICATED, and not merely to keep ids unique.
       One source can reach the same dimension by two routes: an Aries placement is
       Fire AND Cardinal, and both say `assertive`. Emitting both would be a single
       source voting twice for one idea - double-counting inside one piece of
       evidence, below the level the independence groups operate at, and invisible
       to them. Collapsing here is the only place that catches it. */
    const dimensions = [...new Set(seed.dimensions)];
    return dimensions.map((dimension) => ({
        id: `${pillar}:${seed.sourceEntity}:${dimension}`,
        pillar,
        sourceEntity: seed.sourceEntity,
        fact: seed.fact,
        dimension,
        semanticWeight: seed.semanticWeight ?? 1,
        strength: seed.strength,
        interpretationKind: seed.interpretationKind,
        settledness: seed.settledness,
        methodology: seed.methodology ?? 'calculated',
        independenceGroup: seed.independenceGroup,
        ...(seed.context === undefined ? {} : { context: seed.context }),
    }));
}
export function structuralEvidenceAll(pillar, seeds) {
    return seeds.flatMap((seed) => structuralEvidence(pillar, seed));
}
