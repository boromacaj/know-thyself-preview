import { personalSymbolicInterpretationHumanClaimBoundaries, personalSymbolicInterpretationHumanLayerContractId, personalSymbolicInterpretationHumanLayerContractVersion, } from './personalSymbolicInterpretationHumanLayerContract.js';
import { getPersonalSymbolicInterpretationHumanLayerUnitDefinition, personalSymbolicInterpretationHumanLayerRegistryId, } from './personalSymbolicInterpretationHumanLayerRegistry.js';
import { buildPersonalSymbolicInterpretationTemplateSnapshot, } from './personalSymbolicInterpretationTemplateSnapshot.js';
export const personalSymbolicInterpretationHumanLayerBuilderId = 'personal_symbolic_interpretation_human_layer_builder';
export const personalSymbolicInterpretationHumanLayerBuilderVersion = '0.1.0';
function uniqueStrings(values) {
    return Array.from(new Set(values));
}
function humanStateFor(state) {
    return state;
}
function claimBoundariesFor() {
    return [...personalSymbolicInterpretationHumanClaimBoundaries];
}
function bodyKeyFor(sourceUnitId) {
    return `interpretation.human.${sourceUnitId}.body`;
}
function templateAuditFor(template) {
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
export function resolvePersonalSymbolicInterpretationHumanLayerUnit(section, unit, humanDefinition) {
    if (humanDefinition === null) {
        return {
            humanUnitId: `human_missing_${unit.sourceUnitId}`,
            matched: false,
            reason: 'human_definition_missing',
            sourceKind: 'template_snapshot_unit',
            sourceTextUnitId: unit.textUnitId,
            sourceUnitId: unit.sourceUnitId,
            sectionId: section.sectionId,
            blockId: unit.blockId,
            unitType: 'placeholder',
            safetyLevel: 'placeholder',
            audienceLevel: unit.audienceLevel,
            toneMode: unit.toneMode,
            state: 'unavailable',
            contentState: 'unavailable',
            renderingMode: 'sentence',
            titleKey: unit.titleKey,
            bodyKey: bodyKeyFor(unit.sourceUnitId),
            templateKey: unit.templateKey,
            sourceTemplateKey: unit.templateKey,
            allowedValueKind: unit.allowedValueKind,
            variableKeys: [...unit.variableKeys],
            variablePolicy: {
                allowedKeys: [],
                requiredKeys: [],
            },
            claimBoundaries: claimBoundariesFor(),
            template: templateAuditFor(unit.template),
            content: null,
            text: null,
            plainText: null,
            markdownText: null,
            warnings: uniqueStrings([...unit.warnings, ...unit.template.warnings, 'human_definition_missing']),
            sortOrder: 999999,
        };
    }
    return {
        humanUnitId: humanDefinition.humanUnitId,
        matched: true,
        reason: 'human_definition_matched',
        sourceKind: 'template_snapshot_unit',
        sourceTextUnitId: unit.textUnitId,
        sourceUnitId: unit.sourceUnitId,
        sectionId: section.sectionId,
        blockId: unit.blockId,
        unitType: humanDefinition.humanUnitType,
        safetyLevel: humanDefinition.safetyLevel,
        audienceLevel: unit.audienceLevel,
        toneMode: unit.toneMode,
        state: humanDefinition.contentState,
        contentState: humanDefinition.contentState,
        renderingMode: humanDefinition.renderingMode,
        titleKey: unit.titleKey,
        bodyKey: bodyKeyFor(unit.sourceUnitId),
        templateKey: humanDefinition.templateKey,
        sourceTemplateKey: unit.templateKey,
        allowedValueKind: unit.allowedValueKind,
        variableKeys: [...unit.variableKeys],
        variablePolicy: {
            allowedKeys: [...humanDefinition.variablePolicy.allowedKeys],
            requiredKeys: [...humanDefinition.variablePolicy.requiredKeys],
        },
        claimBoundaries: claimBoundariesFor(),
        template: templateAuditFor(unit.template),
        content: null,
        text: null,
        plainText: null,
        markdownText: null,
        warnings: uniqueStrings([...humanDefinition.warnings, ...unit.warnings, ...unit.template.warnings]),
        sortOrder: humanDefinition.sortOrder,
    };
}
function humanUnitFor(section, unit) {
    const definition = getPersonalSymbolicInterpretationHumanLayerUnitDefinition(`human_${unit.sourceUnitId}`);
    return resolvePersonalSymbolicInterpretationHumanLayerUnit(section, unit, definition);
}
function humanBlockFor(section, block) {
    return {
        blockId: block.blockId,
        blockType: block.blockType,
        state: humanStateFor(block.state),
        humanUnits: block.units.map((unit) => humanUnitFor(section, unit)),
    };
}
function humanSectionFor(section) {
    return {
        sectionId: section.sectionId,
        state: humanStateFor(section.state),
        blocks: section.blocks.map((block) => humanBlockFor(section, block)),
    };
}
function metadataFor() {
    return {
        id: personalSymbolicInterpretationHumanLayerBuilderId,
        version: personalSymbolicInterpretationHumanLayerBuilderVersion,
        deterministic: true,
        generatedBy: personalSymbolicInterpretationHumanLayerBuilderId,
        format: 'structured_json',
        schemaVersion: personalSymbolicInterpretationHumanLayerBuilderVersion,
        finalProseGenerated: false,
        humanReadableTextGenerated: false,
        contentGenerated: false,
        textGenerated: false,
    };
}
function sourceFor(snapshot) {
    return {
        source: 'personal_symbolic_interpretation_template_snapshot',
        registry: personalSymbolicInterpretationHumanLayerRegistryId,
        builder: personalSymbolicInterpretationHumanLayerBuilderId,
        deterministic: true,
        version: personalSymbolicInterpretationHumanLayerBuilderVersion,
        templateSnapshotSource: snapshot.source,
    };
}
function debugFor(snapshot, sections) {
    const blocks = sections.flatMap((section) => section.blocks);
    const units = blocks.flatMap((block) => block.humanUnits);
    return {
        finalProseGenerated: false,
        humanReadableTextGenerated: false,
        aiGenerated: false,
        contentValuesIncluded: false,
        textValuesIncluded: false,
        totalSections: sections.length,
        totalBlocks: blocks.length,
        totalHumanUnits: units.length,
        totalTemplateSnapshotUnits: snapshot.debug.totalTextUnits,
        registryUnitsMatched: units.length,
    };
}
export function buildPersonalSymbolicInterpretationHumanLayerModel(input, locale, options) {
    const snapshot = buildPersonalSymbolicInterpretationTemplateSnapshot(input, locale, options);
    const sections = snapshot.sections.map(humanSectionFor);
    return {
        builderId: personalSymbolicInterpretationHumanLayerBuilderId,
        builderVersion: personalSymbolicInterpretationHumanLayerBuilderVersion,
        humanLayerContractId: personalSymbolicInterpretationHumanLayerContractId,
        humanLayerContractVersion: personalSymbolicInterpretationHumanLayerContractVersion,
        templateSnapshotId: snapshot.snapshotId,
        templateSnapshotVersion: snapshot.snapshotVersion,
        locale: snapshot.locale,
        audienceLevel: snapshot.audienceLevel,
        toneMode: snapshot.toneMode,
        metadata: metadataFor(),
        sections,
        source: sourceFor(snapshot),
        debug: debugFor(snapshot, sections),
    };
}
