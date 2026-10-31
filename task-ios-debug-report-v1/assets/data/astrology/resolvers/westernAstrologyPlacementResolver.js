import { astroApiHouseDefinitions, normalizedHouseNameFromNumber } from '../api/astroApiHouseMapping.js?v=b5ef5ed';
import { astroApiPointDefinitions } from '../api/astroApiPointMapping.js?v=b5ef5ed';
const source = 'normalized_astroapi_natal_chart';
const resolver = 'western_astrology_placement_resolver';
const pointIds = astroApiPointDefinitions.map((definition) => definition.id);
const knownPointIds = new Set(pointIds);
const signPlacementPointIds = pointIds;
const housePlacementPointIds = [
    'sun',
    'moon',
    'mercury',
    'venus',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
    'pluto',
    'chiron',
    'mean_lilith',
    'true_lilith',
    'mean_node',
    'true_node',
    'mean_south_node',
    'true_south_node',
    'part_of_fortune',
    'part_of_spirit',
    'ceres',
    'pallas',
    'juno',
    'vesta',
];
const placementCategoryByPointId = {
    sun: 'core_luminary',
    moon: 'core_luminary',
    mercury: 'personal_planet',
    venus: 'personal_planet',
    mars: 'personal_planet',
    jupiter: 'social_planet',
    saturn: 'social_planet',
    uranus: 'outer_planet',
    neptune: 'outer_planet',
    pluto: 'outer_planet',
    chiron: 'minor_body',
    ascendant: 'angle',
    descendant: 'angle',
    medium_coeli: 'angle',
    imum_coeli: 'angle',
    mean_lilith: 'calculated_symbolic_point',
    true_lilith: 'calculated_symbolic_point',
    mean_node: 'calculated_symbolic_point',
    true_node: 'calculated_symbolic_point',
    mean_south_node: 'calculated_symbolic_point',
    true_south_node: 'calculated_symbolic_point',
    part_of_fortune: 'calculated_symbolic_point',
    part_of_spirit: 'calculated_symbolic_point',
    ceres: 'asteroid',
    pallas: 'asteroid',
    juno: 'asteroid',
    vesta: 'asteroid',
};
const houseCuspPlacementIdByHouseNumber = {
    1: 'first_house_cusp_sign',
    2: 'second_house_cusp_sign',
    3: 'third_house_cusp_sign',
    4: 'fourth_house_cusp_sign',
    5: 'fifth_house_cusp_sign',
    6: 'sixth_house_cusp_sign',
    7: 'seventh_house_cusp_sign',
    8: 'eighth_house_cusp_sign',
    9: 'ninth_house_cusp_sign',
    10: 'tenth_house_cusp_sign',
    11: 'eleventh_house_cusp_sign',
    12: 'twelfth_house_cusp_sign',
};
export function resolveWesternAstrologyPlacements(normalizedChart) {
    if (!isNormalizedNatalChartLike(normalizedChart)) {
        throw new Error('Invalid normalized natal chart: expected normalized AstroAPI natal chart.');
    }
    const warnings = [];
    const placements = {};
    const signPlacements = [];
    const housePlacements = [];
    const aspectPlacements = [];
    for (const pointId of signPlacementPointIds) {
        const point = normalizedChart.points[pointId];
        if (!point) {
            continue;
        }
        const placement = resolvePointSignPlacement(point, warnings);
        if (placement) {
            addPlacement(placement, placements);
            signPlacements.push(placement);
        }
    }
    for (const pointId of housePlacementPointIds) {
        const point = normalizedChart.points[pointId];
        if (!point) {
            continue;
        }
        const placement = resolvePointHousePlacement(point, warnings);
        if (placement) {
            addPlacement(placement, placements);
            housePlacements.push(placement);
        }
    }
    for (const houseDefinition of astroApiHouseDefinitions) {
        const cusp = normalizedChart.houseCusps.find((candidate) => candidate.houseNumber === houseDefinition.houseNumber);
        const placement = cusp
            ? resolveHouseCuspPlacement(cusp, warnings)
            : null;
        if (!placement) {
            warnings.push({
                code: 'missing_house_cusp',
                message: `Missing house cusp for house ${houseDefinition.houseNumber}.`,
                placementId: houseCuspPlacementIdByHouseNumber[houseDefinition.houseNumber],
                source,
            });
            continue;
        }
        addPlacement(placement, placements);
        signPlacements.push(placement);
    }
    for (const aspect of normalizedChart.aspects) {
        const placement = resolveAspectPlacement(aspect, warnings);
        if (placement) {
            addPlacement(placement, placements);
            aspectPlacements.push(placement);
        }
    }
    if (normalizedChart.lunarPhase) {
        const lunarPhasePlacement = {
            id: 'lunar_phase',
            category: 'lunar_phase',
            moonPhaseName: normalizedChart.lunarPhase.moonPhaseName,
            moonPhase: normalizedChart.lunarPhase.moonPhase,
            sunPhase: normalizedChart.lunarPhase.sunPhase,
            degreesBetweenSunMoon: normalizedChart.lunarPhase.degreesBetweenSunMoon,
            lookupKey: `lunar_phase.${normalizeLookupToken(normalizedChart.lunarPhase.moonPhaseName ?? normalizedChart.lunarPhase.moonPhase ?? 'unknown')}`,
            source,
        };
        addPlacement(lunarPhasePlacement, placements);
    }
    else {
        warnings.push({
            code: 'missing_lunar_phase',
            message: 'Missing lunar phase on normalized natal chart.',
            placementId: 'lunar_phase',
            source,
        });
    }
    return {
        source,
        resolver,
        placements,
        signPlacements,
        housePlacements,
        aspectPlacements,
        meta: {
            chartType: normalizedChart.meta.chartType,
            calculationTime: normalizedChart.meta.calculationTime,
            houseSystem: normalizedChart.meta.houseSystem,
            zodiacType: normalizedChart.meta.zodiacType,
            activePoints: [...normalizedChart.meta.activePoints],
            normalizedChartMeta: normalizedChart.meta,
        },
        warnings,
    };
}
export function getResolvedPlacementById(resolvedChart, placementId) {
    return resolvedChart.placements[placementId];
}
export function getResolvedPlacementsByCategory(resolvedChart, category) {
    return Object.values(resolvedChart.placements).filter((placement) => placement.category === category);
}
export function getResolvedSignPlacements(resolvedChart) {
    return [...resolvedChart.signPlacements];
}
export function getResolvedHousePlacements(resolvedChart) {
    return [...resolvedChart.housePlacements];
}
export function getResolvedAspectPlacements(resolvedChart) {
    return [...resolvedChart.aspectPlacements];
}
function resolvePointSignPlacement(point, warnings) {
    const id = `${point.id}_sign`;
    if (!point.sign || !point.signLabel) {
        warnings.push({
            code: 'missing_sign',
            message: `Missing sign for ${point.label}.`,
            placementId: id,
            pointId: point.id,
            source,
        });
        return null;
    }
    return {
        id,
        category: placementCategoryByPointId[point.id],
        pointId: point.id,
        pointLabel: point.label,
        sign: point.sign,
        signLabel: point.signLabel,
        sourceSign: point.sourceSign,
        signNumber: point.signNumber,
        degreeInSign: point.degreeInSign,
        absoluteLongitude: point.absoluteLongitude,
        retrograde: point.retrograde,
        speed: point.speed,
        ...(point.houseNumber ? { houseNumber: point.houseNumber } : {}),
        ...(point.houseName ? { houseName: point.houseName } : {}),
        lookupKey: `${point.id}.${point.sign}`,
        source,
    };
}
function resolvePointHousePlacement(point, warnings) {
    const id = `${point.id}_house`;
    if (!point.houseNumber || !point.houseName) {
        warnings.push({
            code: 'missing_house',
            message: `Missing house for ${point.label}.`,
            placementId: id,
            pointId: point.id,
            source,
        });
        return null;
    }
    return {
        id,
        category: placementCategoryByPointId[point.id],
        pointId: point.id,
        pointLabel: point.label,
        houseNumber: point.houseNumber,
        houseName: point.houseName,
        ...(point.sign ? { sign: point.sign } : {}),
        ...(point.signLabel ? { signLabel: point.signLabel } : {}),
        lookupKey: `${point.id}.house_${point.houseNumber}`,
        source,
    };
}
function resolveHouseCuspPlacement(cusp, warnings) {
    const id = houseCuspPlacementIdByHouseNumber[cusp.houseNumber];
    const houseName = normalizedHouseNameFromNumber(cusp.houseNumber);
    if (!id || !houseName) {
        warnings.push({
            code: 'missing_house_cusp',
            message: `Unsupported house cusp number: ${cusp.houseNumber}.`,
            placementId: id,
            source,
        });
        return null;
    }
    if (!cusp.sign || !cusp.signLabel) {
        warnings.push({
            code: 'missing_sign',
            message: `Missing sign for house ${cusp.houseNumber} cusp.`,
            placementId: id,
            source,
        });
        return null;
    }
    return {
        id,
        category: 'house_cusp',
        houseNumber: cusp.houseNumber,
        houseName,
        sign: cusp.sign,
        signLabel: cusp.signLabel,
        sourceSign: cusp.sourceSign,
        signNumber: cusp.signNumber,
        degreeInSign: cusp.degreeInSign,
        absoluteLongitude: cusp.absoluteLongitude,
        lookupKey: `house_${cusp.houseNumber}.${cusp.sign}`,
        source,
    };
}
function resolveAspectPlacement(aspect, warnings) {
    if (!isKnownPointId(aspect.point1)) {
        warnings.push({
            code: 'unknown_aspect_point',
            message: `Unknown aspect point: ${String(aspect.point1 ?? 'missing')}.`,
            pointId: aspect.point1 ?? 'missing',
            source,
        });
        return null;
    }
    if (!isKnownPointId(aspect.point2)) {
        warnings.push({
            code: 'unknown_aspect_point',
            message: `Unknown aspect point: ${String(aspect.point2 ?? 'missing')}.`,
            pointId: aspect.point2 ?? 'missing',
            source,
        });
        return null;
    }
    if (aspect.aspectType.startsWith('unknown:')) {
        warnings.push({
            code: 'unknown_aspect_type',
            message: `Unknown aspect type: ${aspect.sourceAspectType ?? aspect.aspectType}.`,
            source,
        });
        return null;
    }
    const id = `${aspect.point1}_${aspect.aspectType}_${aspect.point2}`;
    return {
        id,
        category: 'aspect',
        point1: aspect.point1,
        point2: aspect.point2,
        aspectType: aspect.aspectType,
        sourceAspectType: aspect.sourceAspectType,
        orb: aspect.orb,
        lookupKey: `${aspect.point1}.${aspect.aspectType}.${aspect.point2}`,
        source,
    };
}
function addPlacement(placement, placements) {
    placements[placement.id] = placement;
}
function isKnownPointId(value) {
    return typeof value === 'string' && knownPointIds.has(value);
}
function normalizeLookupToken(value) {
    return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'unknown';
}
function isNormalizedNatalChartLike(value) {
    return (value?.source === 'astroapi' &&
        value.endpoint === '/api/v3/charts/natal' &&
        typeof value.points === 'object' &&
        Array.isArray(value.houseCusps) &&
        Array.isArray(value.aspects) &&
        typeof value.meta === 'object');
}
