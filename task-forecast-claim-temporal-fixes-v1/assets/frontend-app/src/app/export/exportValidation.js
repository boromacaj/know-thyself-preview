const SECRET_KEY_PATTERN = /api[_-]?key|token|secret|password|credential|authoriz|googlemapskey|browserkey|(^|[^a-z])env([^a-z]|$)/i;
const SECRET_VALUE_PATTERN = /AIza[0-9A-Za-z_-]{10,}/;
/**
 * Field names that are ABOUT secrets (e.g. this integrity contract's own
 * `containsSecrets` flag) rather than actual secret-holding data. Without this
 * allowlist the scanner would flag its own "no secrets found" field as a secret.
 */
const SECRET_KEY_ALLOWLIST = new Set(['containsSecrets', 'secretPaths']);
/**
 * Deep-walks an already-built export document looking for the failure modes the
 * export spec explicitly forbids: undefined values, NaN, circular references, and
 * secret-shaped field names or values (export spec section 34). This is a defensive
 * backstop — adapters should never produce these — not the primary correctness check.
 */
export function scanExportValue(value) {
    const result = { undefinedPaths: [], nanPaths: [], secretPaths: [], circular: false };
    // Tracks the current DFS ancestor chain only (added on entry, removed on exit), so
    // a value legitimately referenced twice via two independent, non-nested paths
    // (e.g. the same TCM correspondence object appearing both in a lookup table export
    // and in a "day master correspondence" pointer to that same table entry) is never
    // mistaken for a true cycle. A real cycle is an object that is its own ancestor.
    const ancestors = new Set();
    function walk(current, path) {
        if (current === undefined) {
            result.undefinedPaths.push(path);
            return;
        }
        if (typeof current === 'number' && Number.isNaN(current)) {
            result.nanPaths.push(path);
            return;
        }
        if (typeof current === 'string' && SECRET_VALUE_PATTERN.test(current)) {
            result.secretPaths.push(path);
            return;
        }
        if (current === null || typeof current !== 'object')
            return;
        if (ancestors.has(current)) {
            result.circular = true;
            return;
        }
        ancestors.add(current);
        if (Array.isArray(current)) {
            current.forEach((item, index) => walk(item, `${path}[${index}]`));
        }
        else {
            for (const [key, entryValue] of Object.entries(current)) {
                if (!SECRET_KEY_ALLOWLIST.has(key) && SECRET_KEY_PATTERN.test(key))
                    result.secretPaths.push(`${path}.${key}`);
                walk(entryValue, `${path}.${key}`);
            }
        }
        ancestors.delete(current);
    }
    walk(value, '$');
    return result;
}
function getByPath(root, path) {
    return path.split('.').reduce((current, segment) => (current && typeof current === 'object' ? current[segment] : undefined), root);
}
export function buildIntegritySummary(document, inputs) {
    const scan = scanExportValue(document);
    const missingRequiredSections = inputs.requiredSections.filter((path) => getByPath(document, path) === undefined);
    const problems = [];
    if (missingRequiredSections.length > 0)
        problems.push(`missing required section(s): ${missingRequiredSections.join(', ')}`);
    if (scan.undefinedPaths.length > 0)
        problems.push(`${scan.undefinedPaths.length} undefined value(s) at ${scan.undefinedPaths.slice(0, 5).join(', ')}`);
    if (scan.nanPaths.length > 0)
        problems.push(`${scan.nanPaths.length} NaN value(s) at ${scan.nanPaths.slice(0, 5).join(', ')}`);
    if (scan.secretPaths.length > 0)
        problems.push(`${scan.secretPaths.length} potential secret field(s) at ${scan.secretPaths.slice(0, 5).join(', ')}`);
    if (scan.circular)
        problems.push('circular reference detected');
    try {
        JSON.stringify(document);
    }
    catch {
        problems.push('JSON serialization failed');
    }
    return {
        valid: problems.length === 0,
        missingRequiredSections,
        warnings: inputs.collectedWarnings,
        unsupportedFields: inputs.collectedUnsupported,
        suppressedFields: inputs.collectedSuppressed,
        estimatedFields: inputs.collectedEstimated,
        schemaValidationStatus: problems.length === 0 ? 'valid' : `invalid: ${problems.join('; ')}`,
        containsSecrets: false,
    };
}
export class ExportValidationError extends Error {
    summary;
    constructor(summary) {
        super(`Export document failed validation: ${summary.schemaValidationStatus}`);
        this.name = 'ExportValidationError';
        this.summary = summary;
    }
}
export function assertExportValid(summary) {
    if (!summary.valid)
        throw new ExportValidationError(summary);
}
