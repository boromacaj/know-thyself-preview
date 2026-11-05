import { buildPersonalSymbolicInterpretationModel } from './personalSymbolicInterpretationResolver.js?v=53c0693';
import { isPersonalSymbolicInterpretationTextAudienceLevel, isPersonalSymbolicInterpretationTextToneMode, personalSymbolicInterpretationTextContractId, personalSymbolicInterpretationTextContractVersion, } from './personalSymbolicInterpretationTextContract.js?v=53c0693';
import { getPersonalSymbolicInterpretationTextUnitsForSourceUnit, } from './personalSymbolicInterpretationTextUnitRegistry.js?v=53c0693';
const defaultAudienceLevel = 'simple';
const defaultToneMode = 'neutral';
function resolveOptions(options) {
    return {
        audienceLevel: isPersonalSymbolicInterpretationTextAudienceLevel(options?.audienceLevel)
            ? options.audienceLevel
            : defaultAudienceLevel,
        toneMode: isPersonalSymbolicInterpretationTextToneMode(options?.toneMode)
            ? options.toneMode
            : defaultToneMode,
    };
}
function uniqueWarnings(warnings) {
    return Array.from(new Set(warnings));
}
function variablesFor(sourceUnit, textDefinition) {
    const candidateVariables = {
        blockId: sourceUnit.blockId,
        sourceUnitId: sourceUnit.unitId,
        valueKind: sourceUnit.sourceValueKind,
        unitType: sourceUnit.unitType,
    };
    return Object.fromEntries(Object.entries(candidateVariables).filter(([key]) => textDefinition.variablePolicy.allowedKeys.includes(key)));
}
function warningsFor(sourceUnit, textDefinition) {
    const warnings = [...textDefinition.warnings];
    if (!sourceUnit.available) {
        warnings.push('source_interpretation_unit_unavailable');
    }
    if (sourceUnit.reason === 'value_kind_mismatch') {
        warnings.push('value_kind_mismatch');
    }
    return uniqueWarnings(warnings);
}
export function resolvePersonalSymbolicInterpretationTextUnit(sourceUnit, textDefinition, options) {
    const resolvedOptions = resolveOptions(options);
    return {
        textUnitId: textDefinition.textUnitId,
        sourceUnitId: sourceUnit.unitId,
        blockId: sourceUnit.blockId,
        unitType: textDefinition.unitType,
        safetyLevel: textDefinition.safetyLevel,
        audienceLevel: resolvedOptions.audienceLevel,
        toneMode: resolvedOptions.toneMode,
        titleKey: sourceUnit.titleKey,
        templateKey: textDefinition.templateKey,
        allowedValueKind: textDefinition.allowedValueKind,
        state: sourceUnit.available ? textDefinition.state : 'unavailable',
        text: null,
        variables: variablesFor(sourceUnit, textDefinition),
        warnings: warningsFor(sourceUnit, textDefinition),
    };
}
function blockStateFor(sourceBlock, textUnits) {
    if (!sourceBlock.available) {
        return 'unavailable';
    }
    if (textUnits.some((unit) => unit.state === 'placeholder')) {
        return 'placeholder';
    }
    if (textUnits.some((unit) => unit.state === 'limited')) {
        return 'limited';
    }
    return 'ready';
}
function sectionStateFor(blocks) {
    if (blocks.length > 0 && blocks.every((block) => block.state === 'unavailable')) {
        return 'unavailable';
    }
    if (blocks.some((block) => block.state === 'placeholder')) {
        return 'placeholder';
    }
    if (blocks.some((block) => block.state === 'limited')) {
        return 'limited';
    }
    return 'ready';
}
function resolveBlock(block, options) {
    const textUnits = block.interpretationUnits.flatMap((sourceUnit) => (getPersonalSymbolicInterpretationTextUnitsForSourceUnit(sourceUnit.unitId)
        .map((definition) => resolvePersonalSymbolicInterpretationTextUnit(sourceUnit, definition, options))));
    return {
        blockId: block.blockId,
        blockType: block.blockType,
        state: blockStateFor(block, textUnits),
        textUnits,
    };
}
function resolveSection(section, options) {
    const blocks = section.blocks.map((block) => resolveBlock(block, options));
    return {
        sectionId: section.sectionId,
        state: sectionStateFor(blocks),
        blocks,
    };
}
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: 'personal_symbolic_interpretation_text_model_builder',
        format: 'structured_json',
        schemaVersion: personalSymbolicInterpretationTextContractVersion,
        textGenerated: false,
    };
}
function sourceFor() {
    return {
        source: 'personal_symbolic_interpretation_model',
        contract: 'personal_symbolic_interpretation_text_contract',
        deterministic: true,
        version: personalSymbolicInterpretationTextContractVersion,
    };
}
function debugFor() {
    return {
        finalProseGenerated: false,
        templatesResolved: false,
        aiGenerated: false,
    };
}
export function buildPersonalSymbolicInterpretationTextModel(input, locale, options) {
    const interpretationModel = buildPersonalSymbolicInterpretationModel(input, locale);
    const resolvedOptions = resolveOptions(options);
    const sections = interpretationModel.sections.map((section) => resolveSection(section, resolvedOptions));
    return {
        textContractId: personalSymbolicInterpretationTextContractId,
        textContractVersion: personalSymbolicInterpretationTextContractVersion,
        locale: interpretationModel.locale,
        audienceLevel: resolvedOptions.audienceLevel,
        toneMode: resolvedOptions.toneMode,
        metadata: metadataFor(),
        sections,
        source: sourceFor(),
        debug: debugFor(),
    };
}
