import { buildPersonalSymbolicInterpretationHumanStaticTextModel, } from './personalSymbolicInterpretationHumanStaticTextFiller.js?v=b5ef5ed';
export const personalSymbolicInterpretationHumanReportRendererId = 'personal_symbolic_interpretation_human_report_renderer';
export const personalSymbolicInterpretationHumanReportRendererVersion = '0.1.0';
const sectionTitlesBySectionId = {
    identity_name_meaning: 'Name Symbolism',
    identity_numerology: 'Numerology Overview',
    integrated_symbolic_overview: 'Symbolic Overview',
    future_astrology_placeholder: 'Future Astrology Layer',
    warnings_and_limitations: 'Interpretation Boundaries',
    source_and_debug: 'Technical Context',
};
function sectionTitleFor(sectionId) {
    return sectionTitlesBySectionId[sectionId] ?? sectionId;
}
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
function paragraphFor(unit) {
    if (!isNonEmptyString(unit.text)) {
        return null;
    }
    return {
        paragraphId: `paragraph_${unit.humanUnitId}`,
        sourceHumanUnitId: unit.humanUnitId,
        sourceBlockId: unit.blockId,
        sourceUnitId: unit.sourceUnitId,
        text: unit.text,
        plainText: isNonEmptyString(unit.plainText) ? unit.plainText : unit.text,
        markdownText: isNonEmptyString(unit.markdownText) ? unit.markdownText : unit.text,
        safetyLevel: unit.safetyLevel,
        audienceLevel: unit.audienceLevel,
        toneMode: unit.toneMode,
        warnings: [...unit.warnings],
    };
}
function reportSectionFor(section) {
    const paragraphs = section.blocks.flatMap((block) => (block.humanUnits
        .map(paragraphFor)
        .filter((paragraph) => paragraph !== null)));
    if (paragraphs.length === 0) {
        return null;
    }
    return {
        sectionId: section.sectionId,
        title: sectionTitleFor(section.sectionId),
        paragraphs,
    };
}
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: personalSymbolicInterpretationHumanReportRendererId,
        format: 'structured_json',
        schemaVersion: personalSymbolicInterpretationHumanReportRendererVersion,
        humanReadableReportGenerated: true,
        staticTextOnly: true,
        aiGenerated: false,
        llmGenerated: false,
        pdfGenerated: false,
        uiGenerated: false,
    };
}
function sourceFor() {
    return {
        source: 'personal_symbolic_interpretation_human_static_text_model',
        renderer: personalSymbolicInterpretationHumanReportRendererId,
        deterministic: true,
        version: personalSymbolicInterpretationHumanReportRendererVersion,
    };
}
function debugFor(model, sections) {
    const paragraphs = sections.flatMap((section) => section.paragraphs);
    return {
        staticTextOnly: true,
        aiGenerated: false,
        llmGenerated: false,
        pdfGenerated: false,
        uiGenerated: false,
        totalSections: sections.length,
        totalParagraphs: paragraphs.length,
        includedHumanUnits: paragraphs.length,
        skippedHumanUnits: model.debug.totalHumanUnits - paragraphs.length,
        emptySectionsRemoved: model.sections.length - sections.length,
    };
}
export function renderPersonalSymbolicInterpretationHumanReportFromStaticTextModel(model) {
    const sections = model.sections
        .map(reportSectionFor)
        .filter((section) => section !== null);
    return {
        rendererId: personalSymbolicInterpretationHumanReportRendererId,
        rendererVersion: personalSymbolicInterpretationHumanReportRendererVersion,
        sourceFillerId: model.fillerId,
        sourceFillerVersion: model.fillerVersion,
        locale: model.locale,
        audienceLevel: model.audienceLevel,
        toneMode: model.toneMode,
        metadata: metadataFor(),
        sections,
        source: sourceFor(),
        debug: debugFor(model, sections),
    };
}
export function buildPersonalSymbolicInterpretationHumanReport(input, locale, options) {
    const staticTextModel = buildPersonalSymbolicInterpretationHumanStaticTextModel(input, locale, options);
    return renderPersonalSymbolicInterpretationHumanReportFromStaticTextModel(staticTextModel);
}
