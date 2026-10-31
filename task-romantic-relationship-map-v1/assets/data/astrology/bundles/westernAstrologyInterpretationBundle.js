const source = 'western_astrology_interpretation_lookup';
const assembler = 'western_astrology_interpretation_bundle_assembler';
const corePlacementIds = ['sun_sign', 'moon_sign', 'ascendant_sign'];
const sectionDefinitions = [
    {
        id: 'core_identity',
        title: 'Core Identity',
        purpose: 'Groups the primary Sun, Moon, and Ascendant lookup records.',
    },
    {
        id: 'mind_and_expression',
        title: 'Mind And Expression',
        purpose: 'Groups communication, learning, and public expression lookup records.',
    },
    {
        id: 'love_values_and_attachment',
        title: 'Love Values And Attachment',
        purpose: 'Groups relational values, attachment, and partnership lookup records.',
    },
    {
        id: 'drive_energy_and_boundaries',
        title: 'Drive Energy And Boundaries',
        purpose: 'Groups action, motivation, and first-house lookup records.',
    },
    {
        id: 'growth_structure_and_maturity',
        title: 'Growth Structure And Maturity',
        purpose: 'Groups expansion, structure, and ninth or tenth house lookup records.',
    },
    {
        id: 'depth_shadow_and_transformation',
        title: 'Depth Shadow And Transformation',
        purpose: 'Groups depth-oriented planet, Chiron, Lilith, and eighth-house lookup records.',
    },
    {
        id: 'collective_and_transpersonal',
        title: 'Collective And Transpersonal',
        purpose: 'Groups outer planet lookup records.',
    },
    {
        id: 'houses_and_life_areas',
        title: 'Houses And Life Areas',
        purpose: 'Groups matched house placement lookup records.',
    },
    {
        id: 'aspects_and_dynamics',
        title: 'Aspects And Dynamics',
        purpose: 'Groups matched aspect lookup records.',
    },
    {
        id: 'advanced_or_unavailable',
        title: 'Advanced Or Unavailable',
        purpose: 'Groups skipped or unmatched lookup records for later handling.',
    },
];
const directSectionPlacements = {
    sun_sign: ['core_identity'],
    moon_sign: ['core_identity'],
    ascendant_sign: ['core_identity'],
    mercury_sign: ['mind_and_expression'],
    medium_coeli_sign: ['mind_and_expression'],
    venus_sign: ['love_values_and_attachment'],
    juno_sign: ['love_values_and_attachment'],
    mars_sign: ['drive_energy_and_boundaries'],
    jupiter_sign: ['growth_structure_and_maturity'],
    saturn_sign: ['growth_structure_and_maturity'],
    pluto_sign: ['depth_shadow_and_transformation', 'collective_and_transpersonal'],
    chiron_sign: ['depth_shadow_and_transformation'],
    mean_lilith_sign: ['depth_shadow_and_transformation'],
    true_lilith_sign: ['depth_shadow_and_transformation'],
    mean_node_sign: ['depth_shadow_and_transformation'],
    true_node_sign: ['depth_shadow_and_transformation'],
    mean_south_node_sign: ['depth_shadow_and_transformation'],
    true_south_node_sign: ['depth_shadow_and_transformation'],
    uranus_sign: ['collective_and_transpersonal'],
    neptune_sign: ['collective_and_transpersonal'],
};
const houseSectionByInterpretationKey = {
    first: 'drive_energy_and_boundaries',
    third: 'mind_and_expression',
    seventh: 'love_values_and_attachment',
    eighth: 'depth_shadow_and_transformation',
    ninth: 'growth_structure_and_maturity',
    tenth: 'growth_structure_and_maturity',
};
export function assembleWesternAstrologyInterpretationBundle(lookupResult) {
    if (!isLookupResultLike(lookupResult)) {
        throw new Error('Invalid Western Astrology interpretation lookup result.');
    }
    const drafts = createSectionDrafts();
    for (const match of lookupResult.matches) {
        for (const sectionId of getMatchSectionIds(match)) {
            drafts[sectionId].items.push(createBundleItem(match, getMatchSectionRole(match, sectionId)));
        }
    }
    for (const unmatched of lookupResult.unmatchedPlacements) {
        for (const sectionId of getUnmatchedSectionIds(unmatched)) {
            drafts[sectionId].unmatchedItems.push(createBundleUnmatchedItem(unmatched, getUnmatchedSectionRole(unmatched, sectionId)));
        }
    }
    const sections = sectionDefinitions.map((definition) => finalizeSection(drafts[definition.id]));
    const coverage = createCoverage(lookupResult, sections);
    return {
        source,
        assembler,
        sections,
        unmatchedSummary: createUnmatchedSummary(lookupResult.unmatchedPlacements),
        coverage,
        meta: {
            lookupSource: lookupResult.source,
            lookupId: lookupResult.lookup,
            lookupMatchedCount: lookupResult.matches.length,
            lookupUnmatchedCount: lookupResult.unmatchedPlacements.length,
        },
        warnings: [],
    };
}
export function getBundleSectionById(bundle, sectionId) {
    return bundle.sections.find((section) => section.id === sectionId);
}
export function getBundleItemsByPlacementId(bundle, placementId) {
    return bundle.sections.flatMap((section) => section.items.filter((item) => item.placementId === placementId));
}
export function getBundleUnmatchedItemsByPlacementId(bundle, placementId) {
    return bundle.sections.flatMap((section) => section.unmatchedItems.filter((item) => item.placementId === placementId));
}
export function getBundleCoverage(bundle) {
    return bundle.coverage;
}
export function hasBundleCoreIdentityMinimum(bundle) {
    return bundle.coverage.hasCoreIdentityMinimum;
}
function createSectionDrafts() {
    return sectionDefinitions.reduce((drafts, definition) => ({
        ...drafts,
        [definition.id]: {
            ...definition,
            items: [],
            unmatchedItems: [],
        },
    }), {});
}
function finalizeSection(draft) {
    return {
        ...draft,
        matchCount: draft.items.length,
        unmatchedCount: draft.unmatchedItems.length,
    };
}
function createBundleItem(match, sectionRole) {
    return {
        placementId: match.placementId,
        placementCategory: match.placementCategory,
        placementLookupKey: match.placementLookupKey,
        interpretationMapId: match.interpretationMapId,
        interpretationKey: match.interpretationKey,
        interpretation: match.interpretation,
        confidence: match.confidence,
        sourceMatch: match,
        sectionRole,
    };
}
function createBundleUnmatchedItem(unmatched, sectionRole) {
    return {
        placementId: unmatched.placementId,
        placementCategory: unmatched.placementCategory,
        placementLookupKey: unmatched.placementLookupKey,
        status: unmatched.status,
        reason: unmatched.reason,
        sourceUnmatched: unmatched,
        sectionRole,
    };
}
function getMatchSectionIds(match) {
    if (match.placementCategory === 'asteroid') {
        return ['advanced_or_unavailable'];
    }
    const sectionIds = [...(directSectionPlacements[match.placementId] ?? [])];
    if (match.interpretationSourceType === 'house_interpretation_map') {
        sectionIds.push('houses_and_life_areas');
        const relatedSection = houseSectionByInterpretationKey[match.interpretationKey];
        if (relatedSection) {
            sectionIds.push(relatedSection);
        }
    }
    if (match.interpretationSourceType === 'aspect_interpretation_map' || match.placementCategory === 'aspect') {
        sectionIds.push('aspects_and_dynamics');
    }
    if (match.interpretationSourceType === 'lunar_phase_interpretation_map' || match.placementCategory === 'lunar_phase') {
        sectionIds.push('advanced_or_unavailable');
    }
    return uniqueSectionIds(sectionIds.length > 0 ? sectionIds : ['advanced_or_unavailable']);
}
function getUnmatchedSectionIds(unmatched) {
    const sectionIds = [...(directSectionPlacements[unmatched.placementId] ?? [])];
    if (unmatched.placementCategory === 'house_cusp' || unmatched.placementCategory === 'lunar_phase') {
        sectionIds.push('advanced_or_unavailable');
    }
    if (unmatched.placementCategory === 'asteroid' ||
        unmatched.placementId.includes('node') ||
        unmatched.placementId.includes('part_of_')) {
        sectionIds.push('advanced_or_unavailable');
    }
    if (sectionIds.length === 0) {
        sectionIds.push('advanced_or_unavailable');
    }
    return uniqueSectionIds(sectionIds);
}
function getMatchSectionRole(match, sectionId) {
    if (match.interpretationSourceType === 'house_interpretation_map' && sectionId === 'houses_and_life_areas') {
        return 'matched_house_life_area';
    }
    if (match.interpretationSourceType === 'aspect_interpretation_map' || match.placementCategory === 'aspect') {
        return 'matched_aspect_pattern';
    }
    if (match.interpretationSourceType === 'lunar_phase_interpretation_map' || match.placementCategory === 'lunar_phase') {
        return 'matched_lunar_phase_reference';
    }
    if (match.placementCategory === 'asteroid') {
        return 'matched_asteroid_reference';
    }
    if (match.placementId.includes('node')) {
        return 'matched_lunar_node_axis_reference';
    }
    if (match.placementId === 'pluto_sign' && sectionId === 'collective_and_transpersonal') {
        return 'outer_planet_reference';
    }
    return 'matched_section_reference';
}
function getUnmatchedSectionRole(unmatched, sectionId) {
    if (sectionId === 'advanced_or_unavailable') {
        return 'unmatched_for_later_lookup';
    }
    return 'unmatched_section_reference';
}
function createCoverage(lookupResult, sections) {
    const matchedPlacementIds = uniqueStrings(lookupResult.matches.map((match) => match.placementId));
    const unmatchedPlacementIds = uniqueStrings(lookupResult.unmatchedPlacements.map((placement) => placement.placementId));
    const missingCorePlacements = corePlacementIds.filter((placementId) => !matchedPlacementIds.includes(placementId));
    return {
        totalMatches: lookupResult.matches.length,
        totalUnmatched: lookupResult.unmatchedPlacements.length,
        totalSections: sections.length,
        matchedPlacementIds,
        unmatchedPlacementIds,
        sectionsWithMatches: sections.filter((section) => section.matchCount > 0).map((section) => section.id),
        sectionsWithOnlyUnmatched: sections
            .filter((section) => section.matchCount === 0 && section.unmatchedCount > 0)
            .map((section) => section.id),
        missingCorePlacements,
        hasCoreIdentityMinimum: corePlacementIds.filter((placementId) => matchedPlacementIds.includes(placementId)).length >= 2,
    };
}
function createUnmatchedSummary(unmatchedPlacements) {
    return {
        totalUnmatched: unmatchedPlacements.length,
        byStatus: countBy(unmatchedPlacements, (placement) => placement.status),
        byCategory: countBy(unmatchedPlacements, (placement) => placement.placementCategory),
        placementIds: uniqueStrings(unmatchedPlacements.map((placement) => placement.placementId)),
    };
}
function uniqueSectionIds(sectionIds) {
    return [...new Set(sectionIds)];
}
function uniqueStrings(values) {
    return [...new Set(values)];
}
function countBy(values, getKey) {
    return values.reduce((counts, value) => {
        const key = getKey(value);
        counts[key] = (counts[key] ?? 0) + 1;
        return counts;
    }, {});
}
function isLookupResultLike(value) {
    return (value?.source === 'western_astrology_resolved_placements' &&
        value.lookup === 'western_astrology_interpretation_lookup' &&
        Array.isArray(value.matches) &&
        Array.isArray(value.unmatchedPlacements));
}
