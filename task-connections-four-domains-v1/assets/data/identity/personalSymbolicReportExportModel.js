import { resolvePersonalSymbolicContentValues } from './personalSymbolicContentValueResolver.js';
export const personalSymbolicReportExportId = 'personal_symbolic_report_export';
export const personalSymbolicReportExportVersion = '0.1.0';
const exportMetadata = {
    deterministic: true,
    generatedBy: 'personal_symbolic_report_export_model',
    format: 'structured_json',
    schemaVersion: personalSymbolicReportExportVersion,
};
function exportSection(section) {
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
        blocks: section.blocks.map((block) => ({
            blockId: block.blockId,
            blockType: block.blockType,
            title: block.title,
            description: block.description,
            titleKey: block.titleKey,
            descriptionKey: block.descriptionKey,
            requiredLayer: block.requiredLayer,
            availableWhen: block.availableWhen,
            status: block.status,
            available: block.available,
            reason: block.reason,
            sortOrder: block.sortOrder,
            value: block.value,
        })),
    };
}
export function buildPersonalSymbolicReportExportModel(input, locale) {
    const resolved = resolvePersonalSymbolicContentValues(input, locale);
    return {
        exportId: personalSymbolicReportExportId,
        exportVersion: personalSymbolicReportExportVersion,
        reportId: resolved.reportId,
        reportVersion: resolved.reportVersion,
        locale: resolved.locale,
        status: {
            readinessStatus: resolved.status.readinessStatus,
            isUsable: resolved.status.isUsable,
            isComplete: resolved.status.isComplete,
            reason: resolved.status.reason,
        },
        metadata: exportMetadata,
        sections: resolved.sections.map(exportSection),
        warnings: resolved.debug.reportModel.warnings,
        source: {
            reportModelSource: resolved.debug.reportModel.source,
            exportSource: {
                source: 'personal_symbolic_content_values',
                builder: 'personal_symbolic_report_export_model',
                deterministic: true,
                version: personalSymbolicReportExportVersion,
            },
        },
        debug: {
            resolvedContentValues: resolved,
            contentAvailability: resolved.debug.contentAvailability,
            reportModelDebug: resolved.debug.reportModel.debug,
        },
    };
}
