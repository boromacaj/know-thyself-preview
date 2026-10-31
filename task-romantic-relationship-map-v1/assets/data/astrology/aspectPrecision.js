export const aspectCalculationRequirements = [
    'Astronomical planetary or point longitudes',
    'Aspect detection engine',
    'Orb policy',
    'Validated chart bodies or points',
    'Aspect type definitions',
];
export const aspectMeaningModel = 'Planet or body = what symbolic function is active. Sign = how that function expresses itself. House = where, or in which life area, that function may be reflected. Aspect = how two symbolic functions relate, cooperate, challenge, intensify, or require adjustment.';
export const aspectPreparedPendingMessage = 'Aspect calculation requires astronomical planetary or point longitudes, an aspect detection engine, and an orb policy. This foundation currently contains only the aspect interpretation database and precision contract. No aspects are calculated yet.';
export const aspectPrecisionNote = 'Astrological aspects are symbolic angular relationships between calculated chart bodies or points. This foundation explains the meaning of aspect types, but does not calculate planetary longitudes, aspect detection, orbs, applying/separating states, or aspect strength.';
export const aspectPrecisionStatusMessages = {
    unavailable_missing_birth_context: {
        status: 'unavailable_missing_birth_context',
        label: 'Missing birth context',
        userMessage: 'Aspect interpretation pending - a validated chart context is required before aspect calculation can be attempted.',
        technicalRequirement: 'Aspects cannot be inferred from signs, houses, numerology, questionnaire answers, user preference, birth date alone, date ranges, location alone, or any single chart placement.',
        canDisplayAspects: false,
    },
    unavailable_missing_planetary_longitudes: {
        status: 'unavailable_missing_planetary_longitudes',
        label: 'Missing planetary or point longitudes',
        userMessage: 'Aspect interpretation pending - astronomical planetary or point longitudes are required before any aspect can be calculated.',
        technicalRequirement: 'A future ephemeris-backed longitude source must provide calculated chart body or point positions before aspect detection can run.',
        canDisplayAspects: false,
    },
    unavailable_missing_orb_policy: {
        status: 'unavailable_missing_orb_policy',
        label: 'Missing orb policy',
        userMessage: 'Aspect interpretation pending - an orb policy is required before aspect detection can decide whether an angular relationship qualifies.',
        technicalRequirement: 'No orb range, exactness rule, applying/separating rule, or aspect strength rule is defined or calculated in this foundation.',
        canDisplayAspects: false,
    },
    pending_ephemeris_engine: {
        status: 'pending_ephemeris_engine',
        label: 'Ephemeris engine pending',
        userMessage: 'Aspect interpretation pending - the ephemeris engine is not active yet, so planetary or point longitudes are not available.',
        technicalRequirement: 'A future astronomical calculation engine must provide validated longitudes before any aspect detection can be performed.',
        canDisplayAspects: false,
    },
    pending_aspect_detection_engine: {
        status: 'pending_aspect_detection_engine',
        label: 'Aspect detection engine pending',
        userMessage: 'Aspect interpretation pending - the aspect detection engine is not active yet. This foundation contains interpretation data only.',
        technicalRequirement: 'A future aspect detection engine must compare calculated longitudes against aspect definitions and a selected orb policy.',
        canDisplayAspects: false,
    },
    pending_orb_policy: {
        status: 'pending_orb_policy',
        label: 'Orb policy pending',
        userMessage: 'Aspect interpretation pending - no orb policy is active yet, so aspect exactness, qualification, and strength are not calculated.',
        technicalRequirement: 'A future orb policy must define allowed distance from exact aspect angles before displayable aspects can be identified.',
        canDisplayAspects: false,
    },
    calculated_available: {
        status: 'calculated_available',
        label: 'Calculated available',
        userMessage: 'Aspects calculated by a future aspect engine. Review source precision, calculated longitudes, and orb policy before interpreting aspect output.',
        technicalRequirement: 'Display requires validated planetary or point longitudes, aspect detection, selected orb policy, and clear calculation provenance.',
        canDisplayAspects: true,
    },
};
export function aspectStatusMessage(status) {
    return aspectPrecisionStatusMessages[status];
}
