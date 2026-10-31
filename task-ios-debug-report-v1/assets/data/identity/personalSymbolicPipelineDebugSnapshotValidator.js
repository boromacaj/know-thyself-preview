import { isPersonalSymbolicLayerId, isPersonalSymbolicLayerStatus, isPersonalSymbolicReadinessStatus, isPersonalSymbolicWarningCategory, personalSymbolicLayerIds, } from './personalSymbolicProfileContract.js?v=b5ef5ed';
const topLevelRequiredFields = [
    'originalInput',
    'pipelineId',
    'contractVersion',
    'readinessStatus',
    'isUsable',
    'isComplete',
    'pipelineReason',
    'layerSnapshot',
    'validationSnapshot',
    'warningSnapshot',
    'source',
];
const layerRequiredFields = ['layer', 'status', 'available', 'reason'];
const validationRequiredFields = [
    'validContractReferences',
    'knownLayerIdsOnly',
    'knownReadinessStatus',
    'knownWarningCategoriesOnly',
    'isValid',
    'notes',
];
const warningRequiredFields = ['warningCount', 'warningCodes', 'sourceLayers'];
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function hasField(value, field) {
    return Object.hasOwn(value, field);
}
function addError(errors, path, code, message) {
    errors.push({ path, code, message });
}
function validateRequiredFields(target, fields, basePath, errors) {
    for (const field of fields) {
        if (!hasField(target, field)) {
            addError(errors, `${basePath}.${field}`, 'missing_required_field', 'Required field is missing.');
        }
    }
}
function validateNonEmptyString(value, path, errors) {
    if (typeof value !== 'string' || value.trim() === '') {
        addError(errors, path, 'invalid_non_empty_string', 'Expected a non-empty string.');
    }
}
function validateBoolean(value, path, errors) {
    if (typeof value !== 'boolean') {
        addError(errors, path, 'invalid_boolean', 'Expected a boolean.');
    }
}
function validateArray(value, path, errors) {
    if (!Array.isArray(value)) {
        addError(errors, path, 'invalid_array', 'Expected an array.');
        return false;
    }
    return true;
}
function validateObject(value, path, errors) {
    if (!isRecord(value)) {
        addError(errors, path, 'invalid_object', 'Expected an object.');
        return false;
    }
    return true;
}
function validateLayerSnapshot(layerSnapshot, errors) {
    if (!validateArray(layerSnapshot, 'layerSnapshot', errors)) {
        return;
    }
    if (layerSnapshot.length !== personalSymbolicLayerIds.length) {
        addError(errors, 'layerSnapshot', 'invalid_layer_count', 'Expected exactly three layer entries.');
    }
    layerSnapshot.forEach((layerEntry, index) => {
        const path = `layerSnapshot.${index}`;
        if (!validateObject(layerEntry, path, errors)) {
            return;
        }
        validateRequiredFields(layerEntry, layerRequiredFields, path, errors);
        if (!isPersonalSymbolicLayerId(layerEntry.layer)) {
            addError(errors, `${path}.layer`, 'unknown_layer_id', 'Expected a known personal symbolic layer id.');
        }
        if (layerEntry.layer !== personalSymbolicLayerIds[index]) {
            addError(errors, `${path}.layer`, 'invalid_layer_order', 'Layer order does not match the contract order.');
        }
        if (!isPersonalSymbolicLayerStatus(layerEntry.status)) {
            addError(errors, `${path}.status`, 'unknown_layer_status', 'Expected a known personal symbolic layer status.');
        }
        validateBoolean(layerEntry.available, `${path}.available`, errors);
        validateNonEmptyString(layerEntry.reason, `${path}.reason`, errors);
    });
}
function validateValidationSnapshot(validationSnapshot, errors) {
    if (!validateObject(validationSnapshot, 'validationSnapshot', errors)) {
        return;
    }
    validateRequiredFields(validationSnapshot, validationRequiredFields, 'validationSnapshot', errors);
    for (const field of validationRequiredFields) {
        if (field === 'notes') {
            validateArray(validationSnapshot.notes, 'validationSnapshot.notes', errors);
        }
        else {
            validateBoolean(validationSnapshot[field], `validationSnapshot.${field}`, errors);
        }
    }
}
function validateWarningSnapshot(warningSnapshot, errors) {
    if (!validateObject(warningSnapshot, 'warningSnapshot', errors)) {
        return;
    }
    validateRequiredFields(warningSnapshot, warningRequiredFields, 'warningSnapshot', errors);
    if (typeof warningSnapshot.warningCount !== 'number' || !Number.isFinite(warningSnapshot.warningCount)) {
        addError(errors, 'warningSnapshot.warningCount', 'invalid_number', 'Expected a finite number.');
    }
    const warningCodes = warningSnapshot.warningCodes;
    const sourceLayers = warningSnapshot.sourceLayers;
    const warningCodesAreArray = validateArray(warningCodes, 'warningSnapshot.warningCodes', errors);
    const sourceLayersAreArray = validateArray(sourceLayers, 'warningSnapshot.sourceLayers', errors);
    if (warningCodesAreArray) {
        warningCodes.forEach((code, index) => {
            if (!isPersonalSymbolicWarningCategory(code)) {
                addError(errors, `warningSnapshot.warningCodes.${index}`, 'unknown_warning_category', 'Expected a known personal symbolic warning category.');
            }
        });
    }
    if (sourceLayersAreArray) {
        sourceLayers.forEach((sourceLayer, index) => {
            if (!isPersonalSymbolicLayerId(sourceLayer)) {
                addError(errors, `warningSnapshot.sourceLayers.${index}`, 'unknown_warning_source_layer', 'Expected a known personal symbolic layer id.');
            }
        });
    }
    if (typeof warningSnapshot.warningCount === 'number'
        && Number.isFinite(warningSnapshot.warningCount)
        && warningCodesAreArray
        && warningSnapshot.warningCount !== warningCodes.length) {
        addError(errors, 'warningSnapshot.warningCount', 'warning_count_mismatch', 'warningCount must equal warningCodes length.');
    }
}
export function validatePersonalSymbolicPipelineDebugSnapshot(snapshot) {
    const errors = [];
    const warnings = [];
    if (!validateObject(snapshot, 'snapshot', errors)) {
        return { isValid: false, errors, warnings };
    }
    validateRequiredFields(snapshot, topLevelRequiredFields, 'snapshot', errors);
    validateObject(snapshot.originalInput, 'originalInput', errors);
    validateNonEmptyString(snapshot.pipelineId, 'pipelineId', errors);
    validateNonEmptyString(snapshot.contractVersion, 'contractVersion', errors);
    if (!isPersonalSymbolicReadinessStatus(snapshot.readinessStatus)) {
        addError(errors, 'readinessStatus', 'unknown_readiness_status', 'Expected a known personal symbolic readiness status.');
    }
    validateBoolean(snapshot.isUsable, 'isUsable', errors);
    validateBoolean(snapshot.isComplete, 'isComplete', errors);
    validateNonEmptyString(snapshot.pipelineReason, 'pipelineReason', errors);
    validateLayerSnapshot(snapshot.layerSnapshot, errors);
    validateValidationSnapshot(snapshot.validationSnapshot, errors);
    validateWarningSnapshot(snapshot.warningSnapshot, errors);
    validateObject(snapshot.source, 'source', errors);
    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}
