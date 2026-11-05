const source = 'western_astrology_interpretation_bundle';
const builder = 'western_astrology_synthesis_graph';
const signElements = {
    aries: 'fire', taurus: 'earth', gemini: 'air', cancer: 'water', leo: 'fire', virgo: 'earth',
    libra: 'air', scorpio: 'water', sagittarius: 'fire', capricorn: 'earth', aquarius: 'air', pisces: 'water',
};
const signModalities = {
    aries: 'cardinal', taurus: 'fixed', gemini: 'mutable', cancer: 'cardinal', leo: 'fixed', virgo: 'mutable',
    libra: 'cardinal', scorpio: 'fixed', sagittarius: 'mutable', capricorn: 'cardinal', aquarius: 'fixed', pisces: 'mutable',
};
const elementThemes = {
    fire: 'fire_emphasis', earth: 'earth_emphasis', air: 'air_emphasis', water: 'water_emphasis',
};
const modalityThemes = {
    cardinal: 'cardinal_emphasis', fixed: 'fixed_emphasis', mutable: 'mutable_emphasis',
};
const signThemes = {
    aries: 'fire_emphasis', taurus: 'earth_emphasis', gemini: 'air_emphasis', cancer: 'water_emphasis',
    leo: 'fire_emphasis', virgo: 'earth_emphasis', libra: 'air_emphasis', scorpio: 'depth_and_transformation',
    sagittarius: 'exploration_growth_expansion', capricorn: 'earth_emphasis', aquarius: 'air_emphasis', pisces: 'water_emphasis',
};
const planetaryResonanceBySign = {
    aries: ['mars'], taurus: ['venus'], gemini: ['mercury'], cancer: ['moon'], leo: ['sun'], virgo: ['mercury'],
    libra: ['venus'], scorpio: ['pluto', 'mars'], sagittarius: ['jupiter'], capricorn: ['saturn'],
    aquarius: ['uranus', 'saturn'], pisces: ['neptune', 'jupiter'],
};
const emphasisPlacements = {
    relational: ['venus_sign', 'juno_sign', 'descendant_sign', 'seventh_house'],
    transformational: ['sun_sign', 'pluto_sign', 'chiron_sign', 'mean_lilith_sign', 'true_lilith_sign', 'vesta_sign'],
    exploratory: ['ascendant_sign', 'venus_sign', 'jupiter_sign', 'mean_node_sign', 'true_node_sign'],
    emotional: ['moon_sign', 'mars_sign', 'ceres_sign', 'fourth_house'],
    intellectual: ['mercury_sign', 'pallas_sign', 'uranus_sign', 'third_house'],
    structural: ['saturn_sign', 'medium_coeli_sign', 'tenth_house'],
    devotional: ['vesta_sign', 'sun_sign', 'mars_sign'],
    protective: ['ceres_sign', 'moon_sign', 'mars_sign'],
    visionary: ['jupiter_sign', 'uranus_sign', 'neptune_sign', 'pallas_sign'],
};
const emphasisThemes = {
    relational: 'relational_agreements', transformational: 'depth_and_transformation', exploratory: 'exploration_growth_expansion',
    emotional: 'water_emphasis', intellectual: 'symbolic_intelligence', structural: 'earth_emphasis',
    devotional: 'devotional_focus', protective: 'protective_care', visionary: 'visionary',
};
export function buildWesternAstrologySynthesisGraph(bundle) {
    if (!isBundleLike(bundle))
        throw new Error('Invalid Western Astrology interpretation bundle.');
    const warnings = [];
    const signSignals = collectSignSignals(bundle, warnings);
    const aspectSignals = collectAspectSignals(bundle, warnings);
    const nodes = createNodes(bundle, signSignals);
    const clusters = createClusters(signSignals);
    const symbolicPatterns = createSymbolicPatterns(signSignals);
    const tensions = createTensions(signSignals);
    const reinforcements = createReinforcements(signSignals, aspectSignals);
    const emphasisAreas = createEmphasisAreas(bundle);
    const edges = createEdges(bundle, clusters, tensions, reinforcements, emphasisAreas);
    return {
        source,
        builder,
        nodes,
        edges,
        clusters,
        emphasisAreas,
        symbolicPatterns,
        tensions,
        reinforcements,
        meta: {
            bundleSource: bundle.source,
            bundleAssembler: bundle.assembler,
            totalBundleSections: bundle.sections.length,
            totalBundleMatches: bundle.coverage.totalMatches,
            totalNodes: nodes.length,
            totalEdges: edges.length,
            totalClusters: clusters.length,
            totalPatterns: symbolicPatterns.length,
            totalTensions: tensions.length,
            totalReinforcements: reinforcements.length,
        },
        warnings,
    };
}
export function getSynthesisGraphNodeById(graph, nodeId) {
    return graph.nodes.find((node) => node.id === nodeId);
}
export function getSynthesisGraphClusterById(graph, clusterId) {
    return graph.clusters.find((cluster) => cluster.id === clusterId);
}
export function getSynthesisGraphEmphasisAreaById(graph, emphasisAreaId) {
    return graph.emphasisAreas.find((area) => area.id === emphasisAreaId);
}
export function getSynthesisGraphTensionsByTheme(graph, symbolicTheme) {
    return graph.tensions.filter((tension) => tension.symbolicTheme === symbolicTheme);
}
export function getSynthesisGraphReinforcementsByTheme(graph, symbolicTheme) {
    return graph.reinforcements.filter((reinforcement) => reinforcement.symbolicTheme === symbolicTheme);
}
function collectSignSignals(bundle, warnings) {
    return getAllBundleItems(bundle).flatMap((item) => {
        const placement = item.sourceMatch.sourcePlacement;
        if (!isSignPlacement(placement) || !placement.pointId)
            return [];
        const signal = {
            placementId: item.placementId,
            pointId: placement.pointId,
            sign: placement.sign,
            element: signElements[placement.sign],
            modality: signModalities[placement.sign],
            category: item.placementCategory,
            sourceItem: item,
        };
        if (!signal.element || !signal.modality) {
            warnings.push({ code: 'unsupported_placement_shape', message: 'A sign placement did not include enough zodiac metadata for graph grouping.', placementId: item.placementId });
            return [];
        }
        return [signal];
    });
}
function collectAspectSignals(bundle, warnings) {
    return getAllBundleItems(bundle).flatMap((item) => {
        const placement = item.sourceMatch.sourcePlacement;
        if (!isAspectPlacement(placement))
            return [];
        if (!placement.point1 || !placement.point2) {
            warnings.push({ code: 'unsupported_placement_shape', message: 'An aspect placement did not include enough point metadata for graph grouping.', placementId: item.placementId });
            return [];
        }
        return [{ placementId: item.placementId, point1: placement.point1, point2: placement.point2, aspectType: placement.aspectType, category: 'aspect', sourceItem: item }];
    });
}
function createNodes(bundle, signSignals) {
    const sectionNodes = bundle.sections.map((section) => ({ id: `section:${section.id}`, type: 'section', label: section.id, sectionId: section.id, weight: weightFromCount(section.matchCount) }));
    const placementNodes = getAllBundleItems(bundle).map((item) => ({ id: `placement:${item.placementId}`, type: 'placement', label: item.placementId, placementId: item.placementId, placementCategory: item.placementCategory, weight: 'medium', sourceItem: item }));
    const themeNodes = uniqueStrings([...signSignals.map((signal) => signThemes[signal.sign]), ...signSignals.map((signal) => elementThemes[signal.element]), ...signSignals.map((signal) => modalityThemes[signal.modality])]).map((theme) => ({ id: `theme:${theme}`, type: 'symbolic_theme', label: theme, symbolicTheme: theme, weight: 'medium' }));
    const elementNodes = uniqueStrings(signSignals.map((signal) => signal.element)).map((element) => ({ id: `element:${element}`, type: 'element', label: element, element, symbolicTheme: elementThemes[element], weight: weightFromCount(signSignals.filter((signal) => signal.element === element).length) }));
    const modalityNodes = uniqueStrings(signSignals.map((signal) => signal.modality)).map((modality) => ({ id: `modality:${modality}`, type: 'modality', label: modality, modality, symbolicTheme: modalityThemes[modality], weight: weightFromCount(signSignals.filter((signal) => signal.modality === modality).length) }));
    const archetypeNodes = uniqueStrings(signSignals.map((signal) => signal.pointId)).map((pointId) => ({ id: `archetype:${pointId}`, type: 'planetary_archetype', label: pointId, weight: 'low' }));
    return [...sectionNodes, ...placementNodes, ...themeNodes, ...elementNodes, ...modalityNodes, ...archetypeNodes];
}
function createClusters(signSignals) {
    const bySign = groupBy(signSignals, (signal) => signal.sign).filter((group) => group.values.length >= 2).map((group) => ({ id: `${group.key}_cluster`, symbolicTheme: signThemes[group.key], placements: group.values.map((signal) => signal.placementId), signs: [group.key], weight: weightFromCount(group.values.length) }));
    const byElement = groupBy(signSignals, (signal) => signal.element).filter((group) => group.values.length >= 3).map((group) => ({ id: `${group.key}_element_cluster`, symbolicTheme: elementThemes[group.key], placements: group.values.map((signal) => signal.placementId), element: group.key, weight: weightFromCount(group.values.length) }));
    const byModality = groupBy(signSignals, (signal) => signal.modality).filter((group) => group.values.length >= 4).map((group) => ({ id: `${group.key}_modality_cluster`, symbolicTheme: modalityThemes[group.key], placements: group.values.map((signal) => signal.placementId), modality: group.key, weight: weightFromCount(group.values.length) }));
    return [...bySign, ...byElement, ...byModality];
}
function createSymbolicPatterns(signSignals) {
    const sameSign = groupBy(signSignals, (signal) => signal.sign).filter((group) => group.values.length >= 2).map((group) => ({ id: `${group.key}_same_sign_pattern`, symbolicTheme: signThemes[group.key], patternType: 'same_sign_repetition', placements: group.values.map((signal) => signal.placementId), weight: weightFromCount(group.values.length) }));
    const sameElement = groupBy(signSignals, (signal) => signal.element).filter((group) => group.values.length >= 3).map((group) => ({ id: `${group.key}_same_element_pattern`, symbolicTheme: elementThemes[group.key], patternType: 'same_element_repetition', placements: group.values.map((signal) => signal.placementId), weight: weightFromCount(group.values.length) }));
    const sameModality = groupBy(signSignals, (signal) => signal.modality).filter((group) => group.values.length >= 4).map((group) => ({ id: `${group.key}_same_modality_pattern`, symbolicTheme: modalityThemes[group.key], patternType: 'same_modality_repetition', placements: group.values.map((signal) => signal.placementId), weight: weightFromCount(group.values.length) }));
    const resonance = signSignals.filter((signal) => planetaryResonanceBySign[signal.sign]?.includes(signal.pointId)).map((signal) => ({ id: `${signal.pointId}_${signal.sign}_resonance_pattern`, symbolicTheme: 'planetary_resonance', patternType: 'planet_sign_resonance', placements: [signal.placementId], weight: 'medium' }));
    return [...sameSign, ...sameElement, ...sameModality, ...resonance];
}
function createTensions(signSignals) {
    const fire = signSignals.filter((signal) => signal.element === 'fire').map((signal) => signal.placementId);
    const water = signSignals.filter((signal) => signal.element === 'water').map((signal) => signal.placementId);
    const air = signSignals.filter((signal) => signal.element === 'air').map((signal) => signal.placementId);
    const cardinal = signSignals.filter((signal) => signal.modality === 'cardinal').map((signal) => signal.placementId);
    const fixed = signSignals.filter((signal) => signal.modality === 'fixed').map((signal) => signal.placementId);
    const tensions = [];
    if (fire.length > 0 && water.length > 0)
        tensions.push({ id: 'fire_water_tension', symbolicTheme: 'impulse_vs_protection', tensionType: 'element_contrast', placements: [...fire.slice(0, 4), ...water.slice(0, 4)], weight: fire.length + water.length >= 6 ? 'high' : 'medium' });
    if (cardinal.length >= 3 && fixed.length >= 3)
        tensions.push({ id: 'cardinal_fixed_load_tension', symbolicTheme: 'fixed_emphasis', tensionType: 'modality_load', placements: [...cardinal.slice(0, 3), ...fixed.slice(0, 3)], weight: 'medium' });
    if (air.length === 0)
        tensions.push({ id: 'air_deficiency_tension', symbolicTheme: 'symbolic_deficiency', tensionType: 'element_deficiency', placements: [], weight: 'low' });
    return tensions;
}
function createReinforcements(signSignals, aspectSignals) {
    const sameSign = groupBy(signSignals, (signal) => signal.sign).filter((group) => group.values.length >= 2).map((group) => ({ id: `${group.key}_reinforcement`, symbolicTheme: signThemes[group.key], reinforcementType: 'same_sign', placements: group.values.map((signal) => signal.placementId), weight: weightFromCount(group.values.length) }));
    const sameElement = groupBy(signSignals, (signal) => signal.element).filter((group) => group.values.length >= 3).map((group) => ({ id: `${group.key}_element_reinforcement`, symbolicTheme: elementThemes[group.key], reinforcementType: 'same_element', placements: group.values.map((signal) => signal.placementId), weight: weightFromCount(group.values.length) }));
    const resonance = signSignals.filter((signal) => planetaryResonanceBySign[signal.sign]?.includes(signal.pointId)).map((signal) => ({ id: `${signal.pointId}_${signal.sign}_resonance_reinforcement`, symbolicTheme: 'planetary_resonance', reinforcementType: 'planet_sign_resonance', placements: [signal.placementId], weight: 'medium' }));
    const aspects = aspectSignals.filter((signal) => ['conjunction', 'trine', 'sextile'].includes(signal.aspectType)).map((signal) => ({ id: `${signal.placementId}_aspect_reinforcement`, symbolicTheme: 'planetary_resonance', reinforcementType: 'aspect_echo', placements: [signal.placementId], weight: 'low' }));
    return [...sameSign, ...sameElement, ...resonance, ...aspects];
}
function createEmphasisAreas(bundle) {
    const placementIds = getAllBundleItems(bundle).map((item) => item.placementId);
    return Object.entries(emphasisPlacements).map(([area, candidates]) => {
        const placements = candidates.filter((placementId) => placementIds.some((candidate) => candidate === placementId || candidate.includes(placementId)));
        return { id: `${area}_emphasis`, symbolicTheme: emphasisThemes[area], area: area, placements, weight: weightFromCount(placements.length) };
    }).filter((area) => area.placements.length > 0);
}
function createEdges(bundle, clusters, tensions, reinforcements, emphasisAreas) {
    const sectionEdges = bundle.sections.flatMap((section) => section.items.map((item) => createEdge(`edge:${item.placementId}:belongs_to:${section.id}`, 'belongs_to', `placement:${item.placementId}`, `section:${section.id}`, sectionTheme(section), [item.placementId], 'low')));
    const clusterEdges = clusters.flatMap((cluster) => cluster.placements.map((placementId) => createEdge(`edge:${placementId}:cluster:${cluster.id}`, 'reinforces', `placement:${placementId}`, `theme:${cluster.symbolicTheme}`, cluster.symbolicTheme, [placementId], cluster.weight)));
    const tensionEdges = tensions.flatMap((tension) => createPlacementPairEdges(tension.placements, tension.id, 'tensions_with', tension.symbolicTheme, tension.weight));
    const reinforcementEdges = reinforcements.flatMap((reinforcement) => reinforcement.placements.map((placementId) => createEdge(`edge:${placementId}:reinforcement:${reinforcement.id}`, 'echoes', `placement:${placementId}`, `theme:${reinforcement.symbolicTheme}`, reinforcement.symbolicTheme, [placementId], reinforcement.weight)));
    const emphasisEdges = emphasisAreas.flatMap((area) => area.placements.map((placementId) => createEdge(`edge:${placementId}:emphasis:${area.id}`, 'intensifies', `placement:${placementId}`, `theme:${area.symbolicTheme}`, area.symbolicTheme, [placementId], area.weight)));
    return uniqueEdges([...sectionEdges, ...clusterEdges, ...tensionEdges, ...reinforcementEdges, ...emphasisEdges]);
}
function createPlacementPairEdges(placements, baseId, type, symbolicTheme, weight) {
    const [first, second] = placements;
    return first && second ? [createEdge(`edge:${baseId}:${first}:${second}`, type, `placement:${first}`, `placement:${second}`, symbolicTheme, [first, second], weight)] : [];
}
function createEdge(id, type, fromNodeId, toNodeId, symbolicTheme, placementIds, weight) {
    return { id, type, fromNodeId, toNodeId, symbolicTheme, placementIds, weight };
}
function sectionTheme(section) {
    if (section.id === 'depth_shadow_and_transformation')
        return 'depth_and_transformation';
    if (section.id === 'love_values_and_attachment')
        return 'relational_agreements';
    if (section.id === 'mind_and_expression')
        return 'symbolic_intelligence';
    if (section.id === 'drive_energy_and_boundaries')
        return 'fire_emphasis';
    if (section.id === 'growth_structure_and_maturity')
        return 'earth_emphasis';
    if (section.id === 'collective_and_transpersonal')
        return 'visionary';
    return 'planetary_resonance';
}
function getAllBundleItems(bundle) {
    return bundle.sections.flatMap((section) => section.items);
}
function isSignPlacement(placement) {
    return 'sign' in placement;
}
function isAspectPlacement(placement) {
    return placement.category === 'aspect' && 'aspectType' in placement;
}
function groupBy(values, getKey) {
    const groups = values.reduce((accumulator, value) => {
        const key = getKey(value);
        accumulator[key] = [...(accumulator[key] ?? []), value];
        return accumulator;
    }, {});
    return Object.entries(groups).map(([key, groupedValues]) => ({ key: key, values: groupedValues })).sort((left, right) => left.key.localeCompare(right.key));
}
function uniqueStrings(values) {
    return [...new Set(values)];
}
function uniqueEdges(edges) {
    return [...new Map(edges.map((edge) => [edge.id, edge])).values()];
}
function weightFromCount(count) {
    if (count >= 4)
        return 'high';
    if (count >= 2)
        return 'medium';
    return 'low';
}
function isBundleLike(value) {
    return value?.source === 'western_astrology_interpretation_lookup' && value.assembler === 'western_astrology_interpretation_bundle_assembler' && Array.isArray(value.sections) && typeof value.coverage === 'object';
}
