import { getPersonalSymbolicContentBlocksForSection } from './personalSymbolicContentRegistry.js?v=53c0693';
import { resolvePersonalSymbolicContentAvailability } from './personalSymbolicContentAvailabilityResolver.js?v=53c0693';
import { getPersonalSymbolicLocalizedText, getPersonalSymbolicSectionLocalizedText, } from './personalSymbolicLocalizationRegistry.js?v=53c0693';
import { buildPersonalSymbolicReportModel } from './personalSymbolicReportModel.js?v=53c0693';
export function assemblePersonalSymbolicReportContent(input, locale) {
    const reportModel = buildPersonalSymbolicReportModel(input);
    const contentAvailability = resolvePersonalSymbolicContentAvailability(reportModel);
    const resolvedLocale = getPersonalSymbolicSectionLocalizedText(reportModel.sections[0].sectionId, locale).locale;
    const availabilityByBlockId = new Map(contentAvailability.blocks.map((block) => [block.blockId, block]));
    return {
        reportId: reportModel.reportId,
        reportVersion: reportModel.reportVersion,
        locale: resolvedLocale,
        status: {
            readinessStatus: reportModel.status.readinessStatus,
            isUsable: reportModel.status.isUsable,
            isComplete: reportModel.status.isComplete,
            reason: reportModel.status.reason,
        },
        sections: reportModel.sections.map((section) => (assembleSection(section, resolvedLocale, availabilityByBlockId))),
        debug: {
            reportModel,
            contentAvailability,
        },
    };
}
function assembleSection(section, locale, availabilityByBlockId) {
    const localizedSection = getPersonalSymbolicSectionLocalizedText(section.sectionId, locale);
    return {
        sectionId: section.sectionId,
        title: localizedSection.title,
        description: localizedSection.description,
        titleKey: localizedSection.titleKey,
        descriptionKey: localizedSection.descriptionKey,
        layer: section.layer,
        status: section.status,
        available: section.available,
        reason: section.reason,
        blocks: getPersonalSymbolicContentBlocksForSection(section.sectionId).map((blockDefinition) => {
            const availability = availabilityByBlockId.get(blockDefinition.blockId);
            return {
                blockId: blockDefinition.blockId,
                blockType: blockDefinition.blockType,
                title: getPersonalSymbolicLocalizedText(blockDefinition.titleKey, locale),
                description: getPersonalSymbolicLocalizedText(blockDefinition.descriptionKey, locale),
                titleKey: blockDefinition.titleKey,
                descriptionKey: blockDefinition.descriptionKey,
                requiredLayer: blockDefinition.requiredLayer,
                availableWhen: blockDefinition.availableWhen,
                status: availability?.status ?? 'unavailable',
                available: availability?.available ?? false,
                reason: availability?.reason ?? 'Content block availability was not resolved.',
                sortOrder: blockDefinition.sortOrder,
            };
        }),
    };
}
