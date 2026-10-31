import { buildPersonalSymbolicInterpretationModel, } from './personalSymbolicInterpretationResolver.js?v=b5ef5ed';
export const personalSymbolicInterpretationDebugSnapshotId = 'personal_symbolic_interpretation_debug_snapshot';
export const personalSymbolicInterpretationDebugSnapshotVersion = '0.1.0';
function valueKindFor(block) {
    const valueKind = block.value.kind;
    return typeof valueKind === 'string' ? valueKind : 'unknown';
}
function snapshotUnit(unit) {
    return {
        unitId: unit.unitId,
        unitType: unit.unitType,
        requiredValueKind: unit.requiredValueKind,
        sourceValueKind: unit.sourceValueKind,
        available: unit.available,
        reason: unit.reason,
        hasPayload: unit.payload !== null,
    };
}
function snapshotBlock(block) {
    const units = block.interpretationUnits.map(snapshotUnit);
    const availableInterpretationUnits = units.filter((unit) => unit.available).length;
    return {
        blockId: block.blockId,
        blockType: block.blockType,
        requiredLayer: block.requiredLayer,
        status: block.status,
        available: block.available,
        reason: block.reason,
        valueKind: valueKindFor(block),
        interpretationUnitCount: units.length,
        availableInterpretationUnits,
        unavailableInterpretationUnits: units.length - availableInterpretationUnits,
        units,
    };
}
function snapshotSection(section) {
    const blocks = section.blocks.map(snapshotBlock);
    return {
        sectionId: section.sectionId,
        layer: section.layer,
        status: section.status,
        available: section.available,
        reason: section.reason,
        blockCount: blocks.length,
        interpretationUnitCount: blocks.reduce((total, block) => total + block.interpretationUnitCount, 0),
        blocks,
    };
}
function summaryFor(sections) {
    const blocks = sections.flatMap((section) => section.blocks);
    const units = blocks.flatMap((block) => block.units);
    const availableInterpretationUnits = units.filter((unit) => unit.available).length;
    const unavailableInterpretationUnits = units.length - availableInterpretationUnits;
    return {
        totalSections: sections.length,
        totalBlocks: blocks.length,
        totalInterpretationUnits: units.length,
        availableInterpretationUnits,
        unavailableInterpretationUnits,
        blocksWithoutInterpretationUnits: blocks.filter((block) => block.interpretationUnitCount === 0).length,
        mismatchedInterpretationUnits: units.filter((unit) => unit.reason === 'value_kind_mismatch').length,
    };
}
function compactInterpretationDebug(model) {
    return {
        totalSections: model.debug.totalSections,
        totalBlocks: model.debug.totalBlocks,
        totalInterpretationUnits: model.debug.totalInterpretationUnits,
        availableInterpretationUnits: model.debug.availableInterpretationUnits,
        unavailableInterpretationUnits: model.debug.unavailableInterpretationUnits,
    };
}
export function buildPersonalSymbolicInterpretationDebugSnapshot(input, locale) {
    const model = buildPersonalSymbolicInterpretationModel(input, locale);
    const sections = model.sections.map(snapshotSection);
    return {
        snapshotId: personalSymbolicInterpretationDebugSnapshotId,
        snapshotVersion: personalSymbolicInterpretationDebugSnapshotVersion,
        interpretationId: model.interpretationId,
        interpretationVersion: model.interpretationVersion,
        exportId: model.exportId,
        exportVersion: model.exportVersion,
        reportId: model.reportId,
        reportVersion: model.reportVersion,
        locale: model.locale,
        status: model.status,
        summary: summaryFor(sections),
        sections,
        source: {
            interpretationSource: model.source.interpretationSource,
            reportExportSource: model.source.reportExportSource,
            snapshotSource: {
                source: 'personal_symbolic_interpretation_model',
                builder: 'personal_symbolic_interpretation_debug_snapshot',
                deterministic: true,
                version: personalSymbolicInterpretationDebugSnapshotVersion,
            },
        },
        debug: {
            interpretationModelDebug: compactInterpretationDebug(model),
            generatedBy: 'personal_symbolic_interpretation_debug_snapshot',
            deterministic: true,
        },
    };
}
