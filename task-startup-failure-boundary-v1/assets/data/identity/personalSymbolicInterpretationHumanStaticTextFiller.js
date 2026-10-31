import { buildPersonalSymbolicInterpretationHumanLayerModel, } from './personalSymbolicInterpretationHumanLayerBuilder.js?v=2ea79e9';
import { isPersonalNameMeaningAdaptedHumanUnitId, resolvePersonalNameMeaningAdaptedText, } from './personalNameMeaningContentAdapter.js?v=2ea79e9';
import { isPersonalNumerologyMeaningAdaptedHumanUnitId, resolvePersonalNumerologyMeaningAdaptedText, } from './personalNumerologyMeaningContentAdapter.js?v=2ea79e9';
export const personalSymbolicInterpretationHumanStaticTextFillerId = 'personal_symbolic_interpretation_human_static_text_filler';
export const personalSymbolicInterpretationHumanStaticTextFillerVersion = '0.1.0';
export const personalSymbolicInterpretationHumanStaticTextUnitIds = [
    'human_name_meaning_core_summary',
    'human_name_symbolic_theme',
    'human_name_cultural_context',
    'human_name_archetype_seed',
    'human_name_origin_context',
    'human_name_meaning_boundary',
    'human_numerology_core_summary',
    'human_numerology_number_themes',
    'human_numerology_calculation_context',
    'human_numerology_cycle_context',
    'human_numerology_boundary',
    'human_available_layers_summary',
    'human_layer_status_context',
    'human_integration_readiness_summary',
    'human_cross_layer_integration_seed',
    'human_integration_boundary',
    'human_astrology_placeholder_context',
    'human_astrology_boundary',
    'human_missing_inputs_context',
    'human_calculation_boundary',
    'human_interpretation_safety_boundary',
    'human_source_metadata_context',
    'human_debug_validation_context',
    'human_deterministic_pipeline_context',
];
const staticTextByHumanUnitId = {
    human_name_meaning_core_summary: 'This section summarizes symbolic information connected to the provided name input. It is intended as a reflective reference, not as a fixed personality statement.',
    human_name_symbolic_theme: 'This unit identifies broad symbolic themes associated with the available name reference data, without treating those themes as identity labels.',
    human_name_cultural_context: 'This unit preserves cultural and source context for name symbolism so that meaning is not separated from its reference background.',
    human_name_archetype_seed: 'This unit marks a possible archetypal seed connected to the name layer, intended only as a gentle reflection point.',
    human_name_origin_context: 'This unit records the available origin context for the name layer when such reference information is present.',
    human_name_meaning_boundary: 'This boundary keeps name symbolism separate from certainty claims, personality labels, or fixed conclusions.',
    human_numerology_core_summary: 'This section summarizes the available numerology values in a structured way. The numbers are treated as symbolic patterns rather than deterministic labels.',
    human_numerology_number_themes: 'This unit groups numerology number themes as symbolic references that may support reflection without defining identity.',
    human_numerology_calculation_context: 'This unit explains that numerology values come from deterministic calculation rules applied to the provided input.',
    human_numerology_cycle_context: 'This unit records available cycle context as symbolic timing information, not as a prediction of events.',
    human_numerology_boundary: 'This boundary keeps numerology outputs framed as reflective patterns rather than certainty, proof, or fixed identity.',
    human_available_layers_summary: 'This overview shows which symbolic layers are currently available in the report and which layers are still placeholders for future development.',
    human_layer_status_context: 'This unit records the current status of each symbolic layer so unavailable systems remain clearly visible.',
    human_integration_readiness_summary: 'This unit indicates whether enough symbolic layers are available for broader synthesis, while keeping incomplete areas explicit.',
    human_cross_layer_integration_seed: 'This unit marks where future cross-layer synthesis can connect multiple symbolic systems once those systems are calculated.',
    human_integration_boundary: 'This boundary prevents incomplete symbolic layers from being blended into unsupported conclusions.',
    human_astrology_placeholder_context: 'This placeholder marks the future astrology layer. No astrology calculation is included in this report yet.',
    human_astrology_boundary: 'This boundary keeps astrology-related interpretation inactive until the required calculation layer is available.',
    human_missing_inputs_context: 'This unit records missing or unavailable inputs so the report remains transparent about what has not been calculated.',
    human_calculation_boundary: 'This boundary separates calculated values from unresolved or future calculation layers.',
    human_interpretation_safety_boundary: 'All interpretations in this report should be read as reflective tendencies, not as diagnosis, destiny, certainty, or fixed identity.',
    human_source_metadata_context: 'This unit records source and metadata context to make the report easier to audit and review.',
    human_debug_validation_context: 'This unit records validation and debug context for development review without changing the interpretation content.',
    human_deterministic_pipeline_context: 'This output is assembled through a deterministic pipeline of contracts, registries, resolvers, snapshots, validators, and builders.',
};
function uniqueWarnings(warnings) {
    return [...new Set(warnings)];
}
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
function firstGivenNameFromValue(value) {
    if (Array.isArray(value)) {
        for (const item of value) {
            const name = firstGivenNameFromValue(item);
            if (name !== null) {
                return name;
            }
        }
        return null;
    }
    if (typeof value !== 'string') {
        return null;
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) {
        return null;
    }
    return trimmed.split(/\s+/)[0] ?? trimmed;
}
function nestedValue(input, path) {
    let current = input;
    for (const key of path) {
        if (!isRecord(current)) {
            return undefined;
        }
        current = current[key];
    }
    return current;
}
function nameForMeaningAdapter(input) {
    const candidatePaths = [
        ['birthName', 'givenNames'],
        ['identity', 'birthName', 'givenNames'],
        ['givenNames'],
        ['preferredName'],
        ['name'],
        ['fullName'],
    ];
    for (const path of candidatePaths) {
        const candidate = firstGivenNameFromValue(nestedValue(input, path));
        if (candidate !== null) {
            return candidate;
        }
    }
    return '';
}
export function isPersonalSymbolicInterpretationHumanStaticTextUnitId(value) {
    return typeof value === 'string'
        && personalSymbolicInterpretationHumanStaticTextUnitIds.includes(value);
}
export function fillPersonalSymbolicInterpretationHumanUnitText(unit, inputName = '', numerologyInput = null) {
    if (!isPersonalSymbolicInterpretationHumanStaticTextUnitId(unit.humanUnitId)) {
        return {
            ...unit,
            variableKeys: [...unit.variableKeys],
            variablePolicy: {
                allowedKeys: [...unit.variablePolicy.allowedKeys],
                requiredKeys: [...unit.variablePolicy.requiredKeys],
            },
            claimBoundaries: [...unit.claimBoundaries],
            template: {
                ...unit.template,
                requiredVariables: [...unit.template.requiredVariables],
                allowedVariables: [...unit.template.allowedVariables],
                warnings: [...unit.template.warnings],
            },
            warnings: [...unit.warnings],
            content: null,
            text: null,
            plainText: null,
            markdownText: null,
        };
    }
    const staticText = staticTextByHumanUnitId[unit.humanUnitId];
    const nameAdapterResolution = resolvePersonalNameMeaningAdaptedText(unit.humanUnitId, inputName);
    const numerologyAdapterResolution = resolvePersonalNumerologyMeaningAdaptedText(unit.humanUnitId, numerologyInput);
    const nameAdaptedText = (isPersonalNameMeaningAdaptedHumanUnitId(unit.humanUnitId)
        && (nameAdapterResolution.status === 'adapted'
            || nameAdapterResolution.status === 'fallback_adapted')
        && typeof nameAdapterResolution.text === 'string')
        ? nameAdapterResolution.text
        : null;
    const numerologyAdaptedText = (isPersonalNumerologyMeaningAdaptedHumanUnitId(unit.humanUnitId)
        && (numerologyAdapterResolution.status === 'adapted'
            || numerologyAdapterResolution.status === 'fallback_adapted')
        && typeof numerologyAdapterResolution.text === 'string')
        ? numerologyAdapterResolution.text
        : null;
    const adaptedText = nameAdaptedText ?? numerologyAdaptedText ?? staticText;
    const nameAdapterWarnings = isPersonalNameMeaningAdaptedHumanUnitId(unit.humanUnitId)
        ? [
            ...(nameAdapterResolution.status === 'adapted' || nameAdapterResolution.status === 'fallback_adapted'
                ? ['name_content_adapted']
                : ['name_content_unavailable']),
            ...(nameAdapterResolution.status === 'fallback_adapted' ? ['name_content_fallback'] : []),
        ]
        : [];
    const numerologyAdapterWarnings = isPersonalNumerologyMeaningAdaptedHumanUnitId(unit.humanUnitId)
        ? [
            ...(numerologyAdapterResolution.status === 'adapted' || numerologyAdapterResolution.status === 'fallback_adapted'
                ? ['numerology_content_adapted']
                : ['numerology_content_unavailable']),
            ...(numerologyAdapterResolution.status === 'fallback_adapted' ? ['numerology_content_fallback'] : []),
        ]
        : [];
    return {
        ...unit,
        variableKeys: [...unit.variableKeys],
        variablePolicy: {
            allowedKeys: [...unit.variablePolicy.allowedKeys],
            requiredKeys: [...unit.variablePolicy.requiredKeys],
        },
        claimBoundaries: [...unit.claimBoundaries],
        template: {
            ...unit.template,
            requiredVariables: [...unit.template.requiredVariables],
            allowedVariables: [...unit.template.allowedVariables],
            warnings: [...unit.template.warnings],
        },
        warnings: uniqueWarnings([
            ...unit.warnings,
            'static_text_filled',
            ...nameAdapterWarnings,
            ...numerologyAdapterWarnings,
        ]),
        content: adaptedText,
        text: adaptedText,
        plainText: adaptedText,
        markdownText: adaptedText,
    };
}
function fillBlock(block, inputName, numerologyInput) {
    return {
        ...block,
        humanUnits: block.humanUnits.map((unit) => (fillPersonalSymbolicInterpretationHumanUnitText(unit, inputName, numerologyInput))),
    };
}
function fillSection(section, inputName, numerologyInput) {
    return {
        ...section,
        blocks: section.blocks.map((block) => fillBlock(block, inputName, numerologyInput)),
    };
}
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: personalSymbolicInterpretationHumanStaticTextFillerId,
        format: 'structured_json',
        schemaVersion: personalSymbolicInterpretationHumanStaticTextFillerVersion,
        humanReadableTextGenerated: true,
        staticTextOnly: true,
        aiGenerated: false,
        llmGenerated: false,
        finalProseGenerated: false,
    };
}
function sourceFor() {
    return {
        source: 'personal_symbolic_interpretation_human_layer_model',
        builder: personalSymbolicInterpretationHumanStaticTextFillerId,
        deterministic: true,
        version: personalSymbolicInterpretationHumanStaticTextFillerVersion,
    };
}
function debugFor(sections) {
    const blocks = sections.flatMap((section) => section.blocks);
    const units = blocks.flatMap((block) => block.humanUnits);
    const filledHumanUnits = units.filter((unit) => unit.text !== null).length;
    return {
        staticTextOnly: true,
        aiGenerated: false,
        llmGenerated: false,
        finalProseGenerated: false,
        totalSections: sections.length,
        totalBlocks: blocks.length,
        totalHumanUnits: units.length,
        filledHumanUnits,
        unfilledHumanUnits: units.length - filledHumanUnits,
        allowedStaticTextUnitIds: [...personalSymbolicInterpretationHumanStaticTextUnitIds],
    };
}
export function buildPersonalSymbolicInterpretationHumanStaticTextModel(input, locale, options) {
    const humanLayerModel = buildPersonalSymbolicInterpretationHumanLayerModel(input, locale, options);
    const inputName = nameForMeaningAdapter(input);
    const sections = humanLayerModel.sections.map((section) => fillSection(section, inputName, input));
    return {
        fillerId: personalSymbolicInterpretationHumanStaticTextFillerId,
        fillerVersion: personalSymbolicInterpretationHumanStaticTextFillerVersion,
        sourceBuilderId: humanLayerModel.builderId,
        sourceBuilderVersion: humanLayerModel.builderVersion,
        humanLayerContractId: humanLayerModel.humanLayerContractId,
        humanLayerContractVersion: humanLayerModel.humanLayerContractVersion,
        locale: humanLayerModel.locale,
        audienceLevel: humanLayerModel.audienceLevel,
        toneMode: humanLayerModel.toneMode,
        metadata: metadataFor(),
        sections,
        source: sourceFor(),
        debug: debugFor(sections),
    };
}
