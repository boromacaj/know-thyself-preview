import { buildPersonalSymbolicInterpretationTemplateResolvedModel, } from './personalSymbolicInterpretationTemplateResolver.js?v=d9f39e7';
export const personalSymbolicInterpretationTemplateSnapshotId = 'personal_symbolic_interpretation_template_snapshot';
export const personalSymbolicInterpretationTemplateSnapshotVersion = '0.1.0';
function uniqueWarnings(warnings) {
    return Array.from(new Set(warnings));
}
function snapshotTemplate(template) {
    return {
        templateKey: template.templateKey,
        templateState: template.templateState,
        matched: template.matched,
        reason: template.reason,
        requiredVariables: [...template.requiredVariables],
        allowedVariables: [...template.allowedVariables],
        safetyLevel: template.safetyLevel,
        warnings: [...template.warnings],
    };
}
function snapshotUnit(unit) {
    return {
        textUnitId: unit.textUnitId,
        sourceUnitId: unit.sourceUnitId,
        blockId: unit.blockId,
        unitType: unit.unitType,
        safetyLevel: unit.safetyLevel,
        audienceLevel: unit.audienceLevel,
        toneMode: unit.toneMode,
        titleKey: unit.titleKey,
        templateKey: unit.templateKey,
        allowedValueKind: unit.allowedValueKind,
        state: unit.state,
        variableKeys: Object.keys(unit.variables).sort(),
        warnings: uniqueWarnings([...unit.warnings, ...unit.template.warnings]),
        template: snapshotTemplate(unit.template),
    };
}
function snapshotBlock(block) {
    return {
        blockId: block.blockId,
        blockType: block.blockType,
        state: block.state,
        units: block.units.map(snapshotUnit),
    };
}
function snapshotSection(section) {
    return {
        sectionId: section.sectionId,
        state: section.state,
        blocks: section.blocks.map(snapshotBlock),
    };
}
function sourceFor() {
    return {
        source: 'personal_symbolic_interpretation_template_resolved_model',
        builder: 'personal_symbolic_interpretation_template_snapshot',
        deterministic: true,
        version: personalSymbolicInterpretationTemplateSnapshotVersion,
    };
}
function debugFor(resolvedModel) {
    return {
        finalProseGenerated: false,
        templatesResolved: false,
        aiGenerated: false,
        compact: true,
        totalSections: resolvedModel.debug.totalSections,
        totalBlocks: resolvedModel.debug.totalBlocks,
        totalTextUnits: resolvedModel.debug.totalTextUnits,
        totalTemplateLookups: resolvedModel.debug.totalTemplateLookups,
        matchedTemplates: resolvedModel.debug.matchedTemplates,
        missingTemplates: resolvedModel.debug.missingTemplates,
        textValuesIncluded: false,
        templateTextsIncluded: false,
        resolvedTextsIncluded: false,
        variableValuesIncluded: false,
    };
}
export function buildPersonalSymbolicInterpretationTemplateSnapshot(input, locale, options) {
    const resolvedModel = buildPersonalSymbolicInterpretationTemplateResolvedModel(input, locale, options);
    return {
        snapshotId: personalSymbolicInterpretationTemplateSnapshotId,
        snapshotVersion: personalSymbolicInterpretationTemplateSnapshotVersion,
        resolverId: resolvedModel.resolverId,
        resolverVersion: resolvedModel.resolverVersion,
        textContractId: resolvedModel.textContractId,
        textContractVersion: resolvedModel.textContractVersion,
        locale: resolvedModel.locale,
        audienceLevel: resolvedModel.audienceLevel,
        toneMode: resolvedModel.toneMode,
        sections: resolvedModel.sections.map(snapshotSection),
        source: sourceFor(),
        debug: debugFor(resolvedModel),
    };
}
