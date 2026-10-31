import { ascendantInterpretationMap } from '../ascendantInterpretationMap.js?v=53c0693';
import { aspectInterpretationMap } from '../aspectInterpretationMap.js?v=53c0693';
import { blackMoonLilithSignInterpretationMap } from '../blackMoonLilithSignInterpretationMap.js?v=53c0693';
import { ceresSignInterpretationMap } from '../ceresSignInterpretationMap.js?v=53c0693';
import { chironSignInterpretationMap } from '../chironSignInterpretationMap.js?v=53c0693';
import { descendantInterpretationMap } from '../descendantInterpretationMap.js?v=53c0693';
import { houseInterpretationMap } from '../houseInterpretationMap.js?v=53c0693';
import { junoSignInterpretationMap } from '../junoSignInterpretationMap.js?v=53c0693';
import { jupiterSignInterpretationMap } from '../jupiterSignInterpretationMap.js?v=53c0693';
import { lunarPhaseInterpretationMap } from '../lunarPhaseInterpretationMap.js?v=53c0693';
import { marsSignInterpretationMap } from '../marsSignInterpretationMap.js?v=53c0693';
import { mercurySignInterpretationMap } from '../mercurySignInterpretationMap.js?v=53c0693';
import { moonSignInterpretationMap } from '../moonSignInterpretationMap.js?v=53c0693';
import { neptuneSignInterpretationMap } from '../neptuneSignInterpretationMap.js?v=53c0693';
import { northNodeSignInterpretationMap } from '../northNodeSignInterpretationMap.js?v=53c0693';
import { pallasSignInterpretationMap } from '../pallasSignInterpretationMap.js?v=53c0693';
import { partOfFortuneSignInterpretationMap } from '../partOfFortuneSignInterpretationMap.js?v=53c0693';
import { plutoSignInterpretationMap } from '../plutoSignInterpretationMap.js?v=53c0693';
import { saturnSignInterpretationMap } from '../saturnSignInterpretationMap.js?v=53c0693';
import { southNodeSignInterpretationMap } from '../southNodeSignInterpretationMap.js?v=53c0693';
import { sunSignInterpretationMap } from '../sunSignInterpretationMap.js?v=53c0693';
import { uranusSignInterpretationMap } from '../uranusSignInterpretationMap.js?v=53c0693';
import { venusSignInterpretationMap } from '../venusSignInterpretationMap.js?v=53c0693';
import { vestaSignInterpretationMap } from '../vestaSignInterpretationMap.js?v=53c0693';
const source = 'western_astrology_resolved_placements';
const lookup = 'western_astrology_interpretation_lookup';
const signInterpretationMapByPointId = {
    sun: signMap('sunSignInterpretationMap', sunSignInterpretationMap),
    moon: signMap('moonSignInterpretationMap', moonSignInterpretationMap),
    mercury: signMap('mercurySignInterpretationMap', mercurySignInterpretationMap),
    venus: signMap('venusSignInterpretationMap', venusSignInterpretationMap),
    mars: signMap('marsSignInterpretationMap', marsSignInterpretationMap),
    jupiter: signMap('jupiterSignInterpretationMap', jupiterSignInterpretationMap),
    saturn: signMap('saturnSignInterpretationMap', saturnSignInterpretationMap),
    uranus: signMap('uranusSignInterpretationMap', uranusSignInterpretationMap),
    neptune: signMap('neptuneSignInterpretationMap', neptuneSignInterpretationMap),
    pluto: signMap('plutoSignInterpretationMap', plutoSignInterpretationMap),
    chiron: signMap('chironSignInterpretationMap', chironSignInterpretationMap),
    ascendant: signMap('ascendantInterpretationMap', ascendantInterpretationMap),
    descendant: signMap('descendantInterpretationMap', descendantInterpretationMap),
    mean_lilith: signMap('blackMoonLilithSignInterpretationMap', blackMoonLilithSignInterpretationMap),
    true_lilith: signMap('blackMoonLilithSignInterpretationMap', blackMoonLilithSignInterpretationMap),
    mean_node: signMap('northNodeSignInterpretationMap', northNodeSignInterpretationMap),
    true_node: signMap('northNodeSignInterpretationMap', northNodeSignInterpretationMap),
    mean_south_node: signMap('southNodeSignInterpretationMap', southNodeSignInterpretationMap),
    true_south_node: signMap('southNodeSignInterpretationMap', southNodeSignInterpretationMap),
    part_of_fortune: signMap('partOfFortuneSignInterpretationMap', partOfFortuneSignInterpretationMap),
    ceres: signMap('ceresSignInterpretationMap', ceresSignInterpretationMap),
    pallas: signMap('pallasSignInterpretationMap', pallasSignInterpretationMap),
    juno: signMap('junoSignInterpretationMap', junoSignInterpretationMap),
    vesta: signMap('vestaSignInterpretationMap', vestaSignInterpretationMap),
};
const houseKeyByHouseName = {
    first_house: 'first',
    second_house: 'second',
    third_house: 'third',
    fourth_house: 'fourth',
    fifth_house: 'fifth',
    sixth_house: 'sixth',
    seventh_house: 'seventh',
    eighth_house: 'eighth',
    ninth_house: 'ninth',
    tenth_house: 'tenth',
    eleventh_house: 'eleventh',
    twelfth_house: 'twelfth',
};
const houseMapDefinition = {
    interpretationSourceType: 'house_interpretation_map',
    interpretationMapId: 'houseInterpretationMap',
    entries: houseInterpretationMap,
};
const aspectMapDefinition = {
    interpretationSourceType: 'aspect_interpretation_map',
    interpretationMapId: 'aspectInterpretationMap',
    entries: aspectInterpretationMap,
};
const lunarPhaseMapDefinition = {
    interpretationSourceType: 'lunar_phase_interpretation_map',
    interpretationMapId: 'lunarPhaseInterpretationMap',
    entries: lunarPhaseInterpretationMap,
};
export function lookupWesternAstrologyInterpretations(resolvedChart) {
    if (!isResolvedChartLike(resolvedChart)) {
        throw new Error('Invalid Western Astrology resolved chart.');
    }
    const warnings = [];
    const matches = [];
    const unmatchedPlacements = [];
    for (const placement of Object.values(resolvedChart.placements)) {
        const result = lookupPlacement(placement);
        if (result.kind === 'match') {
            matches.push(result.match);
        }
        else {
            unmatchedPlacements.push(result.unmatched);
        }
    }
    return {
        source,
        lookup,
        matches,
        unmatchedPlacements,
        meta: {
            resolvedChartSource: resolvedChart.source,
            resolvedChartResolver: resolvedChart.resolver,
            totalPlacements: matches.length + unmatchedPlacements.length,
            matchedCount: matches.length,
            unmatchedCount: unmatchedPlacements.length,
            connectedInterpretationMaps: getConnectedInterpretationMapIds(),
        },
        warnings,
    };
}
export function getInterpretationMatchByPlacementId(result, placementId) {
    return result.matches.find((match) => match.placementId === placementId);
}
export function getInterpretationMatchesByCategory(result, category) {
    return result.matches.filter((match) => match.placementCategory === category);
}
export function getUnmatchedPlacementsByStatus(result, status) {
    return result.unmatchedPlacements.filter((placement) => placement.status === status);
}
export function getMatchedInterpretationCount(result) {
    return result.matches.length;
}
export function getUnmatchedInterpretationCount(result) {
    return result.unmatchedPlacements.length;
}
function lookupPlacement(placement) {
    if (!placement.lookupKey) {
        return {
            kind: 'unmatched',
            unmatched: createUnmatchedPlacement(placement, 'skipped_missing_lookup_key', 'Placement does not contain a lookup key.'),
        };
    }
    if (isHousePlacement(placement)) {
        return lookupHousePlacement(placement);
    }
    if (isSignPlacement(placement)) {
        return lookupSignPlacement(placement);
    }
    if (isAspectPlacement(placement)) {
        return lookupAspectPlacement(placement);
    }
    if (placement.category === 'lunar_phase') {
        return createLookupResult(placement, lunarPhaseMapDefinition, placement.lookupKey.replace('lunar_phase.', ''));
    }
    const unsupportedPlacement = placement;
    return {
        kind: 'unmatched',
        unmatched: createUnmatchedPlacement(unsupportedPlacement, 'skipped_unsupported_category', `Unsupported placement category: ${unsupportedPlacement.category}.`),
    };
}
function lookupSignPlacement(placement) {
    if (placement.category === 'house_cusp' || !placement.pointId) {
        return {
            kind: 'unmatched',
            unmatched: createUnmatchedPlacement(placement, 'skipped_unsupported_category', 'House cusp sign interpretation lookup is not supported by an existing foundation map.'),
        };
    }
    const mapDefinition = signInterpretationMapByPointId[placement.pointId];
    if (!mapDefinition) {
        return {
            kind: 'unmatched',
            unmatched: createUnmatchedPlacement(placement, 'unmatched_no_foundation_map', `No existing ${formatPointLabel(placement.pointId)} sign interpretation foundation map was found.`),
        };
    }
    return createLookupResult(placement, mapDefinition, placement.sign);
}
function lookupHousePlacement(placement) {
    const interpretationKey = houseKeyByHouseName[placement.houseName];
    return createLookupResult(placement, houseMapDefinition, interpretationKey);
}
function lookupAspectPlacement(placement) {
    return createLookupResult(placement, aspectMapDefinition, placement.aspectType);
}
function createLookupResult(placement, mapDefinition, interpretationKey) {
    const interpretation = mapDefinition.entries[interpretationKey];
    if (!interpretation) {
        return {
            kind: 'unmatched',
            unmatched: createUnmatchedPlacement(placement, 'unmatched_no_interpretation_entry', `No ${mapDefinition.interpretationMapId} entry was found for key ${interpretationKey}.`),
        };
    }
    return {
        kind: 'match',
        match: {
            placementId: placement.id,
            placementCategory: placement.category,
            placementLookupKey: placement.lookupKey,
            interpretationSourceType: mapDefinition.interpretationSourceType,
            interpretationMapId: mapDefinition.interpretationMapId,
            interpretationKey,
            interpretation,
            confidence: 'direct_map_match',
            sourcePlacement: placement,
        },
    };
}
function createUnmatchedPlacement(placement, status, reason) {
    return {
        placementId: placement.id,
        placementCategory: placement.category,
        placementLookupKey: placement.lookupKey ?? null,
        status,
        reason,
        sourcePlacement: placement,
    };
}
function signMap(interpretationMapId, entries) {
    return {
        interpretationSourceType: 'sign_interpretation_map',
        interpretationMapId,
        entries,
    };
}
function isSignPlacement(placement) {
    return 'sign' in placement;
}
function isHousePlacement(placement) {
    return placement.id.endsWith('_house') && 'houseName' in placement && 'pointId' in placement;
}
function isAspectPlacement(placement) {
    return placement.category === 'aspect' && 'aspectType' in placement;
}
function formatPointLabel(pointId) {
    return pointId.replace(/_/g, ' ');
}
function getConnectedInterpretationMapIds() {
    return [
        ...Object.values(signInterpretationMapByPointId).map((definition) => definition.interpretationMapId),
        houseMapDefinition.interpretationMapId,
        aspectMapDefinition.interpretationMapId,
        lunarPhaseMapDefinition.interpretationMapId,
    ];
}
function isResolvedChartLike(value) {
    return (value?.source === 'normalized_astroapi_natal_chart' &&
        value.resolver === 'western_astrology_placement_resolver' &&
        typeof value.placements === 'object' &&
        Array.isArray(value.signPlacements) &&
        Array.isArray(value.housePlacements) &&
        Array.isArray(value.aspectPlacements));
}
