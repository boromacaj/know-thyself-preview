import { buildPersonalSymbolicInterpretationTextModel, } from './personalSymbolicInterpretationTextModelBuilder.js?v=b5ef5ed';
import { getPersonalSymbolicInterpretationTemplateDefinition, personalSymbolicInterpretationTemplateRegistryId, } from './personalSymbolicInterpretationTemplateRegistry.js?v=b5ef5ed';
export const personalSymbolicInterpretationTemplateResolverId = 'personal_symbolic_interpretation_template_resolver';
export const personalSymbolicInterpretationTemplateResolverVersion = '0.1.0';
function uniqueWarnings(warnings) {
    return Array.from(new Set(warnings));
}
export function resolvePersonalSymbolicInterpretationTemplateForTextUnit(textUnit) {
    const templateDefinition = getPersonalSymbolicInterpretationTemplateDefinition(textUnit.templateKey);
    if (templateDefinition === null) {
        return {
            templateKey: textUnit.templateKey,
            templateState: 'missing',
            templateText: null,
            resolvedText: null,
            requiredVariables: [],
            allowedVariables: [],
            safetyLevel: textUnit.safetyLevel,
            matched: false,
            reason: 'template_missing',
            warnings: uniqueWarnings([...textUnit.warnings, 'template_missing']),
        };
    }
    return {
        templateKey: templateDefinition.templateKey,
        templateState: templateDefinition.templateState,
        templateText: null,
        resolvedText: null,
        requiredVariables: [...templateDefinition.requiredVariables],
        allowedVariables: [...templateDefinition.allowedVariables],
        safetyLevel: templateDefinition.safetyLevel,
        matched: true,
        reason: 'template_matched',
        warnings: uniqueWarnings([...textUnit.warnings, ...templateDefinition.warnings]),
    };
}
function resolveUnit(textUnit) {
    return {
        textUnitId: textUnit.textUnitId,
        sourceUnitId: textUnit.sourceUnitId,
        blockId: textUnit.blockId,
        unitType: textUnit.unitType,
        safetyLevel: textUnit.safetyLevel,
        audienceLevel: textUnit.audienceLevel,
        toneMode: textUnit.toneMode,
        titleKey: textUnit.titleKey,
        templateKey: textUnit.templateKey,
        allowedValueKind: textUnit.allowedValueKind,
        state: textUnit.state,
        text: null,
        variables: { ...textUnit.variables },
        warnings: [...textUnit.warnings],
        template: resolvePersonalSymbolicInterpretationTemplateForTextUnit(textUnit),
    };
}
function resolveBlock(block) {
    return {
        blockId: block.blockId,
        blockType: block.blockType,
        state: block.state,
        units: block.textUnits.map(resolveUnit),
    };
}
function resolveSection(section) {
    return {
        sectionId: section.sectionId,
        state: section.state,
        blocks: section.blocks.map(resolveBlock),
    };
}
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: 'personal_symbolic_interpretation_template_resolver',
        format: 'structured_json',
        schemaVersion: personalSymbolicInterpretationTemplateResolverVersion,
        textGenerated: false,
        templatesResolved: false,
    };
}
function sourceFor() {
    return {
        source: 'personal_symbolic_interpretation_text_model',
        templateRegistry: personalSymbolicInterpretationTemplateRegistryId,
        builder: 'personal_symbolic_interpretation_template_resolver',
        deterministic: true,
        version: personalSymbolicInterpretationTemplateResolverVersion,
    };
}
function debugFor(sections) {
    const blocks = sections.flatMap((section) => section.blocks);
    const units = blocks.flatMap((block) => block.units);
    const matchedTemplates = units.filter((unit) => unit.template.matched).length;
    return {
        finalProseGenerated: false,
        templatesResolved: false,
        aiGenerated: false,
        totalSections: sections.length,
        totalBlocks: blocks.length,
        totalTextUnits: units.length,
        totalTemplateLookups: units.length,
        matchedTemplates,
        missingTemplates: units.length - matchedTemplates,
    };
}
export function buildPersonalSymbolicInterpretationTemplateResolvedModel(input, locale, options) {
    const textModel = buildPersonalSymbolicInterpretationTextModel(input, locale, options);
    const sections = textModel.sections.map(resolveSection);
    return {
        resolverId: personalSymbolicInterpretationTemplateResolverId,
        resolverVersion: personalSymbolicInterpretationTemplateResolverVersion,
        textContractId: textModel.textContractId,
        textContractVersion: textModel.textContractVersion,
        locale: textModel.locale,
        audienceLevel: textModel.audienceLevel,
        toneMode: textModel.toneMode,
        metadata: metadataFor(),
        sections,
        source: sourceFor(),
        debug: debugFor(sections),
    };
}
