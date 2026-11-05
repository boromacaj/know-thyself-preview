import { pillarLabel } from '../format.js?v=53c0693';
function jsonBlock(value) {
    return '```json\n' + JSON.stringify(value, null, 2) + '\n```';
}
function heading(title) {
    return `\n# ${title}\n`;
}
function header(title, schema, schemaVersion, generatedAt) {
    return [
        'KNOW THYSELF PRO — ' + title,
        `Export schema: ${schema}`,
        `Schema version: ${schemaVersion}`,
        `Generated at: ${generatedAt}`,
        'Purpose: Study material for Unified Pattern Engine and manual cross-pillar synthesis',
    ].join('\n');
}
/**
 * Human-readable, ChatGPT-friendly clipboard export for the complete cross-pillar
 * document. Every section is both labeled with a heading (scannable) and backed by a
 * full JSON block (nothing truncated) — see export spec section 12.1. The document
 * ends with the entire structure as one final machine-readable JSON block.
 */
export function serializeCrossPillarExportToText(document) {
    const directMatches = document.comparisonCandidates.filter((candidate) => candidate.relationshipType === 'direct-match');
    const functionalParallels = document.comparisonCandidates.filter((candidate) => candidate.relationshipType === 'functional-parallel');
    const archetypalResonances = document.comparisonCandidates.filter((candidate) => candidate.relationshipType === 'archetypal-resonance');
    const otherCandidates = document.comparisonCandidates.filter((candidate) => (candidate.relationshipType !== 'direct-match' && candidate.relationshipType !== 'functional-parallel' && candidate.relationshipType !== 'archetypal-resonance'));
    const sections = [
        header('COMPLETE CROSS-PILLAR DATA EXPORT', document.exportSchema, document.exportSchemaVersion, document.generatedAt),
        heading('PROFILE CONTEXT') + jsonBlock(document.profile),
        heading('EXPORT INTEGRITY') + jsonBlock(document.exportIntegrity),
        heading('NUMEROLOGY') + jsonBlock(document.pillars.numerology),
        heading('HUMAN DESIGN') + jsonBlock(document.pillars.humanDesign),
        heading('WESTERN ASTROLOGY') + jsonBlock(document.pillars.westernAstrology),
        heading('BAZI & TCM') + jsonBlock(document.pillars.baziTcm),
        heading('NORMALIZED CROSS-PILLAR SIGNALS') + jsonBlock(document.normalizedSignals),
        heading('DIRECT MATCH CANDIDATES') + (directMatches.length > 0 ? jsonBlock(directMatches) : 'None generated for this profile.'),
        heading('FUNCTIONAL PARALLELS') + (functionalParallels.length > 0 ? jsonBlock(functionalParallels) : 'None generated for this profile.'),
        heading('ARCHETYPAL RESONANCES') + (archetypalResonances.length > 0 ? jsonBlock(archetypalResonances) : 'None generated for this profile.'),
        otherCandidates.length > 0 ? heading('OTHER COMPARISON CANDIDATES') + jsonBlock(otherCandidates) : '',
        heading('POTENTIAL TENSIONS') + (document.candidateTensions.length > 0 ? jsonBlock(document.candidateTensions) : 'None detected for this profile.'),
        heading('UNMATCHED SIGNALS') + (document.unmatchedSignals.length > 0 ? jsonBlock(document.unmatchedSignals) : 'None — every normalized signal participated in at least one comparison candidate or tension.'),
        heading('SEMANTIC GUARDRAILS') + jsonBlock(document.semanticGuardrails),
        heading('METHODOLOGY WARNINGS') + jsonBlock(document.methodologyWarnings),
        heading('SUPPRESSED / UNAVAILABLE / ESTIMATED FIELDS') + jsonBlock({
            suppressedFields: document.exportIntegrity.suppressedFields,
            estimatedFields: document.exportIntegrity.estimatedFields,
            unsupportedFields: document.exportIntegrity.unsupportedFields,
        }),
        heading('TRACEABILITY') + jsonBlock(document.traceability),
        heading('MACHINE-READABLE JSON') + jsonBlock(document),
    ];
    return sections.filter(Boolean).join('\n\n');
}
/**
 * Human-readable, ChatGPT-friendly clipboard export for a single pillar. Uses the
 * same heading/JSON-block pattern as the complete export so pasting either one into
 * ChatGPT is unambiguous about scope.
 */
export function serializePillarExportToText(document) {
    const label = pillarLabel(document.pillarId).toUpperCase();
    return [
        header(`${label} PILLAR DATA EXPORT`, document.exportSchema, document.exportSchemaVersion, document.generatedAt),
        heading('PROFILE CONTEXT') + jsonBlock(document.profile),
        heading('EXPORT INTEGRITY') + jsonBlock(document.exportIntegrity),
        heading(`${label} — COMPLETE PILLAR DATA`) + jsonBlock(document.pillar),
        heading('SUPPRESSED / UNAVAILABLE / ESTIMATED FIELDS') + jsonBlock({
            suppressedFields: document.exportIntegrity.suppressedFields,
            estimatedFields: document.exportIntegrity.estimatedFields,
            unsupportedFields: document.exportIntegrity.unsupportedFields,
        }),
        heading('MACHINE-READABLE JSON') + jsonBlock(document),
    ].filter(Boolean).join('\n\n');
}
