import { buildPersonalSymbolicInterpretationDebugSnapshot, personalSymbolicInterpretationDebugSnapshotId, personalSymbolicInterpretationDebugSnapshotVersion, } from './personalSymbolicInterpretationDebugSnapshot.js';
const expectedInterpretationId = 'personal_symbolic_interpretation_model';
const expectedInterpretationVersion = '0.1.0';
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
        interpretationId: snapshot.interpretationId,
        interpretationVersion: snapshot.interpretationVersion,
        totalSections: snapshot.summary.totalSections,
        totalBlocks: snapshot.summary.totalBlocks,
        totalInterpretationUnits: snapshot.summary.totalInterpretationUnits,
        availableInterpretationUnits: snapshot.summary.availableInterpretationUnits,
        unavailableInterpretationUnits: snapshot.summary.unavailableInterpretationUnits,
        mismatchedInterpretationUnits: snapshot.summary.mismatchedInterpretationUnits,
    };
}
function validateStableIds(snapshot, issues) {
    if (snapshot.snapshotId !== personalSymbolicInterpretationDebugSnapshotId) {
        issues.push(issue('invalid_snapshot_id', 'Snapshot id does not match the interpretation debug snapshot contract.', 'snapshotId'));
    }
    if (snapshot.snapshotVersion !== personalSymbolicInterpretationDebugSnapshotVersion) {
        issues.push(issue('invalid_snapshot_version', 'Snapshot version does not match the interpretation debug snapshot contract.', 'snapshotVersion'));
    }
    if (snapshot.interpretationId !== expectedInterpretationId) {
        issues.push(issue('invalid_interpretation_id', 'Interpretation id does not match the interpretation model contract.', 'interpretationId'));
    }
    if (snapshot.interpretationVersion !== expectedInterpretationVersion) {
        issues.push(issue('invalid_interpretation_version', 'Interpretation version does not match the interpretation model contract.', 'interpretationVersion'));
    }
}
function validateSummaryTotals(snapshot, issues) {
    const blocks = flattenedBlocks(snapshot);
    const units = flattenedUnits(snapshot);
    const availableInterpretationUnits = units.filter((unit) => unit.available).length;
    const unavailableInterpretationUnits = units.length - availableInterpretationUnits;
    const mismatchedInterpretationUnits = units.filter((unit) => unit.reason === 'value_kind_mismatch').length;
    if (snapshot.summary.totalSections !== snapshot.sections.length) {
        issues.push(issue('section_count_mismatch', 'Summary section count does not match snapshot sections.', 'summary.totalSections'));
    }
    if (snapshot.summary.totalBlocks !== blocks.length) {
        issues.push(issue('block_count_mismatch', 'Summary block count does not match flattened blocks.', 'summary.totalBlocks'));
    }
    if (snapshot.summary.totalInterpretationUnits !== units.length) {
        issues.push(issue('interpretation_unit_count_mismatch', 'Summary interpretation unit count does not match flattened units.', 'summary.totalInterpretationUnits'));
    }
    if (snapshot.summary.availableInterpretationUnits + snapshot.summary.unavailableInterpretationUnits
        !== snapshot.summary.totalInterpretationUnits) {
        issues.push(issue('availability_total_mismatch', 'Summary available and unavailable interpretation unit counts do not equal total units.', 'summary'));
    }
    if (snapshot.summary.availableInterpretationUnits !== availableInterpretationUnits
        || snapshot.summary.unavailableInterpretationUnits !== unavailableInterpretationUnits) {
        issues.push(issue('availability_total_mismatch', 'Summary availability counts do not match flattened unit availability.', 'summary'));
    }
    if (snapshot.summary.mismatchedInterpretationUnits !== snapshot.summary.unavailableInterpretationUnits
        || snapshot.summary.mismatchedInterpretationUnits !== mismatchedInterpretationUnits) {
        issues.push(issue('mismatch_total_mismatch', 'Summary mismatched unit count does not match unavailable units.', 'summary.mismatchedInterpretationUnits'));
    }
}
function validateSectionTotals(section, sectionIndex, issues) {
    if (section.blockCount !== section.blocks.length) {
        issues.push(issue('section_block_count_mismatch', 'Section block count does not match section blocks.', `sections[${sectionIndex}].blockCount`));
    }
    const interpretationUnitCount = section.blocks.reduce((total, block) => total + block.interpretationUnitCount, 0);
    if (section.interpretationUnitCount !== interpretationUnitCount) {
        issues.push(issue('section_unit_count_mismatch', 'Section interpretation unit count does not match block unit counts.', `sections[${sectionIndex}].interpretationUnitCount`));
    }
}
function validateBlockTotals(block, sectionIndex, blockIndex, issues) {
    const path = `sections[${sectionIndex}].blocks[${blockIndex}]`;
    if (block.interpretationUnitCount !== block.units.length) {
        issues.push(issue('block_unit_count_mismatch', 'Block interpretation unit count does not match block units.', `${path}.interpretationUnitCount`));
    }
    if (block.availableInterpretationUnits + block.unavailableInterpretationUnits !== block.interpretationUnitCount) {
        issues.push(issue('block_availability_total_mismatch', 'Block available and unavailable unit counts do not equal block unit count.', path));
    }
}
function validateUnitConsistency(unit, sectionIndex, blockIndex, unitIndex, issues) {
    const path = `sections[${sectionIndex}].blocks[${blockIndex}].units[${unitIndex}]`;
    const expectedReason = unit.available ? 'value_kind_matched' : 'value_kind_mismatch';
    if (unit.reason !== expectedReason) {
        issues.push(issue('unit_reason_mismatch', 'Unit reason does not match unit availability.', `${path}.reason`));
    }
    if (unit.hasPayload !== unit.available) {
        issues.push(issue('unit_payload_mismatch', 'Unit payload marker does not match unit availability.', `${path}.hasPayload`));
    }
    if (Object.hasOwn(unit, 'payload') || Object.hasOwn(unit, 'blockValue')) {
        issues.push(issue('compact_unit_payload_leak', 'Compact unit record includes a payload field that belongs outside the debug snapshot.', path));
    }
}
function validateGuardedLanguage(snapshot, issues) {
    const snapshotJson = JSON.stringify(snapshot).toLowerCase();
    for (const token of guardedLanguageTokens) {
        if (snapshotJson.includes(token)) {
            issues.push(issue('guarded_language_detected', 'Guarded language was detected in the interpretation debug snapshot.', '$'));
        }
    }
}
export function validatePersonalSymbolicInterpretationDebugSnapshot(snapshot) {
    const issues = [];
    validateStableIds(snapshot, issues);
    validateSummaryTotals(snapshot, issues);
    snapshot.sections.forEach((section, sectionIndex) => {
        validateSectionTotals(section, sectionIndex, issues);
        section.blocks.forEach((block, blockIndex) => {
            validateBlockTotals(block, sectionIndex, blockIndex, issues);
            block.units.forEach((unit, unitIndex) => {
                validateUnitConsistency(unit, sectionIndex, blockIndex, unitIndex, issues);
            });
        });
    });
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
export function validatePersonalSymbolicInterpretationSnapshot(input, locale) {
    const snapshot = buildPersonalSymbolicInterpretationDebugSnapshot(input, locale);
    return validatePersonalSymbolicInterpretationDebugSnapshot(snapshot);
}
