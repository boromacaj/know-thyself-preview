import { buildPersonalIdentityContentResolutionSnapshot, personalIdentityContentResolutionSnapshotId, personalIdentityContentResolutionSnapshotVersion, } from './personalIdentityContentResolutionSnapshot.js';
export const personalIdentityContentReadinessSummaryId = 'personal_identity_content_readiness_summary';
export const personalIdentityContentReadinessSummaryVersion = '0.1.0';
export const personalIdentityContentReadinessStatuses = [
    'ready',
    'partial',
    'unavailable',
];
export const personalIdentityContentReadinessDomainStatuses = [
    'ready',
    'fallback',
    'missing',
];
function uniqueWarnings(warnings) {
    return [...new Set(warnings)];
}
function domainReadinessStatusFor(domain) {
    if (domain.status === 'adapted') {
        return 'ready';
    }
    if (domain.status === 'fallback_adapted') {
        return 'fallback';
    }
    return 'missing';
}
function summaryDomainFor(domain) {
    return {
        domain: domain.domain,
        readinessStatus: domainReadinessStatusFor(domain),
        resolutionStatus: domain.status,
        normalizedKey: domain.normalizedKey,
        inputValue: domain.inputValue,
        warnings: [...domain.warnings],
    };
}
function countsFor(domains) {
    return {
        totalDomains: domains.length,
        readyDomains: domains.filter((domain) => domain.readinessStatus === 'ready').length,
        fallbackDomains: domains.filter((domain) => domain.readinessStatus === 'fallback').length,
        missingDomains: domains.filter((domain) => domain.readinessStatus === 'missing').length,
    };
}
function overallReadinessFor(counts) {
    if (counts.readyDomains === counts.totalDomains && counts.totalDomains > 0) {
        return 'ready';
    }
    if (counts.missingDomains === counts.totalDomains) {
        return 'unavailable';
    }
    return 'partial';
}
function metadataFor() {
    return {
        deterministic: true,
        generatedBy: 'personal_identity_content_readiness_summary',
        aiGenerated: false,
        llmGenerated: false,
        source: 'deterministic_content_readiness_summary',
        sourceSnapshotId: personalIdentityContentResolutionSnapshotId,
        sourceSnapshotVersion: personalIdentityContentResolutionSnapshotVersion,
    };
}
export function buildPersonalIdentityContentReadinessSummaryFromSnapshot(snapshot) {
    const domains = snapshot.domains.map(summaryDomainFor);
    const counts = countsFor(domains);
    const warnings = uniqueWarnings([
        ...snapshot.warnings,
        ...domains.flatMap((domain) => domain.warnings),
        'deterministic_content_readiness_summary',
        'not_final_interpretation',
        'not_runtime_ui',
    ]);
    return {
        summaryId: personalIdentityContentReadinessSummaryId,
        summaryVersion: personalIdentityContentReadinessSummaryVersion,
        deterministic: true,
        readinessStatus: overallReadinessFor(counts),
        domains,
        counts,
        warnings,
        metadata: metadataFor(),
    };
}
export function buildPersonalIdentityContentReadinessSummary(input) {
    return buildPersonalIdentityContentReadinessSummaryFromSnapshot(buildPersonalIdentityContentResolutionSnapshot(input));
}
