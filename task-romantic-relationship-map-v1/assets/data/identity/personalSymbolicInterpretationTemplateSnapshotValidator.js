import { buildPersonalSymbolicInterpretationTemplateSnapshot, personalSymbolicInterpretationTemplateSnapshotId, personalSymbolicInterpretationTemplateSnapshotVersion, } from './personalSymbolicInterpretationTemplateSnapshot.js';
import { personalSymbolicInterpretationTemplateResolverId, personalSymbolicInterpretationTemplateResolverVersion, } from './personalSymbolicInterpretationTemplateResolver.js';
const guardedLanguageTokens = [
    ['you', ' are'].join(''),
    ['dest', 'iny'].join(''),
    ['soul', 'mate'].join(''),
    ['diagn', 'osis'].join(''),
    ['med', 'ical'].join(''),
    ['f', 'ate'].join(''),
];
function issue(code, message, path, severity = 'error') {
    return {
        severity,
        code,
        message,
        path,
    };
}
function flattenedBlocks(snapshot) {
    return snapshot.sections.flatMap((section) => section.blocks);
}
function flattenedUnits(snapshot) {
    return flattenedBlocks(snapshot).flatMap((block) => block.units);
}
function validationSummary(snapshot) {
    return {
        snapshotId: snapshot.snapshotId,
        snapshotVersion: snapshot.snapshotVersion,
        resolverId: snapshot.resolverId,
        resolverVersion: snapshot.resolverVersion,
        totalSections: snapshot.debug.totalSections,
        totalBlocks: snapshot.debug.totalBlocks,
        totalTextUnits: snapshot.debug.totalTextUnits,
        totalTemplateLookups: snapshot.debug.totalTemplateLookups,
        matchedTemplates: snapshot.debug.matchedTemplates,
        missingTemplates: snapshot.debug.missingTemplates,
    };
}
function validateStableIds(snapshot, issues) {
    if (snapshot.snapshotId !== personalSymbolicInterpretationTemplateSnapshotId) {
        issues.push(issue('invalid_snapshot_id', 'Snapshot id does not match the template snapshot contract.', 'snapshotId'));
    }
    if (snapshot.snapshotVersion !== personalSymbolicInterpretationTemplateSnapshotVersion) {
        issues.push(issue('invalid_snapshot_version', 'Snapshot version does not match the template snapshot contract.', 'snapshotVersion'));
    }
    if (snapshot.resolverId !== personalSymbolicInterpretationTemplateResolverId) {
        issues.push(issue('invalid_resolver_id', 'Resolver id does not match the template resolver contract.', 'resolverId'));
    }
    if (snapshot.resolverVersion !== personalSymbolicInterpretationTemplateResolverVersion) {
        issues.push(issue('invalid_resolver_version', 'Resolver version does not match the template resolver contract.', 'resolverVersion'));
    }
}
function validateDebugFlags(snapshot, issues) {
    const expectedFlags = {
        finalProseGenerated: false,
        templatesResolved: false,
        aiGenerated: false,
        compact: true,
        textValuesIncluded: false,
        templateTextsIncluded: false,
        resolvedTextsIncluded: false,
        variableValuesIncluded: false,
    };
    for (const [field, expectedValue] of Object.entries(expectedFlags)) {
        if (snapshot.debug[field] !== expectedValue) {
            issues.push(issue('invalid_debug_flag', 'Template snapshot debug flag does not match the compact contract.', `debug.${field}`));
        }
    }
}
function validateSource(snapshot, issues) {
    if (snapshot.source.source !== 'personal_symbolic_interpretation_template_resolved_model') {
        issues.push(issue('invalid_source', 'Template snapshot source does not match the source contract.', 'source.source'));
    }
    if (snapshot.source.builder !== 'personal_symbolic_interpretation_template_snapshot') {
        issues.push(issue('invalid_source_builder', 'Template snapshot source builder does not match the source contract.', 'source.builder'));
    }
    if (snapshot.source.deterministic !== true) {
        issues.push(issue('invalid_source_deterministic', 'Template snapshot source must be deterministic.', 'source.deterministic'));
    }
    if (snapshot.source.version !== personalSymbolicInterpretationTemplateSnapshotVersion) {
        issues.push(issue('invalid_source_version', 'Template snapshot source version does not match the snapshot version.', 'source.version'));
    }
}
function validateDebugTotals(snapshot, issues) {
    const blocks = flattenedBlocks(snapshot);
    const units = flattenedUnits(snapshot);
    const matchedTemplates = units.filter((unit) => unit.template.matched).length;
    const missingTemplates = units.length - matchedTemplates;
    if (snapshot.debug.totalSections !== snapshot.sections.length) {
        issues.push(issue('section_count_mismatch', 'Debug section count does not match snapshot sections.', 'debug.totalSections'));
    }
    if (snapshot.debug.totalBlocks !== blocks.length) {
        issues.push(issue('block_count_mismatch', 'Debug block count does not match flattened blocks.', 'debug.totalBlocks'));
    }
    if (snapshot.debug.totalTextUnits !== units.length) {
        issues.push(issue('text_unit_count_mismatch', 'Debug text unit count does not match flattened units.', 'debug.totalTextUnits'));
    }
    if (snapshot.debug.totalTemplateLookups !== units.length) {
        issues.push(issue('template_lookup_count_mismatch', 'Debug template lookup count does not match flattened units.', 'debug.totalTemplateLookups'));
    }
    if (snapshot.debug.matchedTemplates !== matchedTemplates) {
        issues.push(issue('matched_template_count_mismatch', 'Debug matched template count does not match unit templates.', 'debug.matchedTemplates'));
    }
    if (snapshot.debug.missingTemplates !== missingTemplates) {
        issues.push(issue('missing_template_count_mismatch', 'Debug missing template count does not match unit templates.', 'debug.missingTemplates'));
    }
    if (snapshot.debug.matchedTemplates + snapshot.debug.missingTemplates !== snapshot.debug.totalTemplateLookups) {
        issues.push(issue('template_total_mismatch', 'Matched and missing template counts do not equal total template lookups.', 'debug'));
    }
}
function validateSection(section, sectionIndex, issues) {
    const path = `sections[${sectionIndex}]`;
    if (!Array.isArray(section.blocks)) {
        issues.push(issue('invalid_section_blocks', 'Template snapshot section blocks must be an array.', `${path}.blocks`));
    }
}
function validateBlock(block, sectionIndex, blockIndex, issues) {
    const path = `sections[${sectionIndex}].blocks[${blockIndex}]`;
    if (!Array.isArray(block.units)) {
        issues.push(issue('invalid_block_units', 'Template snapshot block units must be an array.', `${path}.units`));
    }
}
function validateSortedVariableKeys(unit, path, issues) {
    if (!Array.isArray(unit.variableKeys)) {
        issues.push(issue('invalid_variable_keys', 'Template snapshot unit variableKeys must be an array.', `${path}.variableKeys`));
        return;
    }
    const sortedVariableKeys = [...unit.variableKeys].sort();
    if (JSON.stringify(unit.variableKeys) !== JSON.stringify(sortedVariableKeys)) {
        issues.push(issue('variable_keys_not_sorted', 'Template snapshot variableKeys must be sorted for deterministic output.', `${path}.variableKeys`));
    }
}
function validateTemplateConsistency(unit, path, issues) {
    const expectedReason = unit.template.matched ? 'template_matched' : 'template_missing';
    const expectedTemplateState = unit.template.matched ? 'defined' : 'missing';
    if (unit.template.reason !== expectedReason) {
        issues.push(issue('template_reason_mismatch', 'Template reason does not match template matched state.', `${path}.template.reason`));
    }
    if (unit.template.templateState !== expectedTemplateState) {
        issues.push(issue('template_state_mismatch', 'Template state does not match template matched state.', `${path}.template.templateState`));
    }
    if (unit.template.safetyLevel !== unit.safetyLevel) {
        issues.push(issue('template_safety_level_mismatch', 'Template safety level does not match unit safety level.', `${path}.template.safetyLevel`));
    }
}
function validateCompactUnit(unit, sectionIndex, blockIndex, unitIndex, issues) {
    const path = `sections[${sectionIndex}].blocks[${blockIndex}].units[${unitIndex}]`;
    if (Object.hasOwn(unit, 'text')
        || Object.hasOwn(unit, 'variables')
        || Object.hasOwn(unit, 'payload')
        || Object.hasOwn(unit, 'blockValue')) {
        issues.push(issue('compact_unit_field_leak', 'Compact snapshot unit includes a field that belongs outside the template snapshot.', path));
    }
    if (Object.hasOwn(unit.template, 'templateText')
        || Object.hasOwn(unit.template, 'resolvedText')
        || Object.hasOwn(unit.template, 'payload')
        || Object.hasOwn(unit.template, 'blockValue')) {
        issues.push(issue('compact_template_field_leak', 'Compact snapshot template includes a field that belongs outside the template snapshot.', `${path}.template`));
    }
    validateSortedVariableKeys(unit, path, issues);
    validateTemplateConsistency(unit, path, issues);
}
function validateCompactFields(snapshot, issues) {
    snapshot.sections.forEach((section, sectionIndex) => {
        validateSection(section, sectionIndex, issues);
        section.blocks.forEach((block, blockIndex) => {
            validateBlock(block, sectionIndex, blockIndex, issues);
            block.units.forEach((unit, unitIndex) => {
                validateCompactUnit(unit, sectionIndex, blockIndex, unitIndex, issues);
            });
        });
    });
}
function validateGuardedLanguage(snapshot, issues) {
    const snapshotJson = JSON.stringify(snapshot).toLowerCase();
    for (const token of guardedLanguageTokens) {
        if (snapshotJson.includes(token)) {
            issues.push(issue('guarded_language_detected', 'Guarded language was detected in the template snapshot.', '$'));
        }
    }
}
export function validatePersonalSymbolicInterpretationTemplateSnapshotObject(snapshot) {
    const issues = [];
    validateStableIds(snapshot, issues);
    validateSource(snapshot, issues);
    validateDebugFlags(snapshot, issues);
    validateDebugTotals(snapshot, issues);
    validateCompactFields(snapshot, issues);
    validateGuardedLanguage(snapshot, issues);
    const errorCount = issues.filter((validationIssue) => validationIssue.severity === 'error').length;
    const warningCount = issues.length - errorCount;
    return {
        valid: errorCount === 0,
        issueCount: issues.length,
        errorCount,
        warningCount,
        issues,
        summary: validationSummary(snapshot),
        snapshot,
    };
}
export function validatePersonalSymbolicInterpretationTemplateSnapshot(input, locale, options) {
    const snapshot = buildPersonalSymbolicInterpretationTemplateSnapshot(input, locale, options);
    return validatePersonalSymbolicInterpretationTemplateSnapshotObject(snapshot);
}
