import { buildPersonalSymbolicReportExportModel } from './personalSymbolicReportExportModel.js';
import { getPersonalSymbolicInterpretationUnitsForBlock } from './personalSymbolicInterpretationRegistry.js';
export const personalSymbolicInterpretationId = 'personal_symbolic_interpretation_model';
export const personalSymbolicInterpretationVersion = '0.1.0';
const interpretationMetadata = {
    deterministic: true,
    generatedBy: 'personal_symbolic_interpretation_resolver',
    format: 'structured_json',
    schemaVersion: personalSymbolicInterpretationVersion,
};
function valueKindFor(block) {
    const valueKind = block.value.kind;
    return typeof valueKind === 'string' ? valueKind : 'unknown';
}
export function resolvePersonalSymbolicInterpretationUnitPayload(unitDefinition, block) {
    const sourceValueKind = valueKindFor(block);
    const valueKindMatches = sourceValueKind === unitDefinition.requiredValueKind;
    return {
        unitId: unitDefinition.unitId,
        blockId: unitDefinition.blockId,
        unitType: unitDefinition.unitType,
        titleKey: unitDefinition.titleKey,
        descriptionKey: unitDefinition.descriptionKey,
        requiredValueKind: unitDefinition.requiredValueKind,
        sourceValueKind,
        available: valueKindMatches,
        reason: valueKindMatches ? 'value_kind_matched' : 'value_kind_mismatch',
        payload: valueKindMatches
            ? {
                kind: unitDefinition.unitType,
                valueKind: sourceValueKind,
                blockValue: block.value,
            }
            : null,
        sortOrder: unitDefinition.sortOrder,
    };
}
function resolveBlock(block) {
    return {
        ...block,
        interpretationUnits: getPersonalSymbolicInterpretationUnitsForBlock(block.blockId)
            .map((unitDefinition) => resolvePersonalSymbolicInterpretationUnitPayload(unitDefinition, block)),
    };
}
function resolveSection(section) {
    return {
        sectionId: section.sectionId,
        title: section.title,
        description: section.description,
        titleKey: section.titleKey,
        descriptionKey: section.descriptionKey,
        layer: section.layer,
        status: section.status,
        available: section.available,
        reason: section.reason,
        blocks: section.blocks.map(resolveBlock),
    };
}
function debugFor(reportExportModel, sections) {
    const blocks = sections.flatMap((section) => section.blocks);
    const interpretationUnits = blocks.flatMap((block) => block.interpretationUnits);
    const availableInterpretationUnits = interpretationUnits.filter((unit) => unit.available).length;
    return {
        reportExportModel,
        totalSections: sections.length,
        totalBlocks: blocks.length,
        totalInterpretationUnits: interpretationUnits.length,
        availableInterpretationUnits,
        unavailableInterpretationUnits: interpretationUnits.length - availableInterpretationUnits,
    };
}
export function buildPersonalSymbolicInterpretationModel(input, locale) {
    const reportExportModel = buildPersonalSymbolicReportExportModel(input, locale);
    const sections = reportExportModel.sections.map(resolveSection);
    return {
        interpretationId: personalSymbolicInterpretationId,
        interpretationVersion: personalSymbolicInterpretationVersion,
        exportId: reportExportModel.exportId,
        exportVersion: reportExportModel.exportVersion,
        reportId: reportExportModel.reportId,
        reportVersion: reportExportModel.reportVersion,
        locale: reportExportModel.locale,
        status: reportExportModel.status,
        metadata: interpretationMetadata,
        sections,
        warnings: reportExportModel.warnings,
        source: {
            reportExportSource: reportExportModel.source,
            interpretationSource: {
                source: 'personal_symbolic_report_export_model',
                registry: 'personal_symbolic_interpretation_registry',
                builder: 'personal_symbolic_interpretation_resolver',
                deterministic: true,
                version: personalSymbolicInterpretationVersion,
            },
        },
        debug: debugFor(reportExportModel, sections),
    };
}
