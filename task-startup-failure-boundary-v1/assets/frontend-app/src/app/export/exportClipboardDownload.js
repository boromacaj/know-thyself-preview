import { slugify } from '../format.js?v=2ea79e9';
/**
 * Robust clipboard copy: prefers the async Clipboard API, falls back to a temporary
 * off-screen textarea + execCommand('copy') for non-secure-context or older browsers,
 * and always removes any temporary DOM node it creates (export spec section 32).
 */
export async function copyTextToClipboard(text) {
    try {
        if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            await navigator.clipboard.writeText(text);
            return { ok: true, message: 'Copied to clipboard.' };
        }
    }
    catch {
        // Fall through to the legacy fallback below.
    }
    if (typeof document === 'undefined') {
        return { ok: false, message: 'Clipboard is unavailable in this environment.' };
    }
    const textarea = document.createElement('textarea');
    try {
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const succeeded = document.execCommand('copy');
        return succeeded
            ? { ok: true, message: 'Copied to clipboard.' }
            : { ok: false, message: 'Copy command was not supported by this browser. Use Download JSON instead.' };
    }
    catch {
        return { ok: false, message: 'Clipboard copy failed. Use the Download JSON action instead.' };
    }
    finally {
        textarea.remove();
    }
}
/** No coordinates or timezone in filenames — only a name slug and the birth date. */
export function sanitizeFilenameSegment(value) {
    const normalized = value.normalize('NFD').replace(new RegExp('[\\u0300-\\u036f]', 'g'), '').trim();
    const slug = slugify(normalized);
    return slug || 'profile';
}
export function buildExportFilename(kind, displayName, birthDate) {
    const namePart = sanitizeFilenameSegment(displayName);
    const datePart = /^\d{4}-\d{2}-\d{2}$/.test(birthDate) ? birthDate : 'unknown-date';
    return `know-thyself-${kind}-${namePart}-${datePart}.json`;
}
/** Browser-native Blob download; revokes the object URL and removes the temporary anchor. */
export function downloadJsonFile(filename, data) {
    if (typeof document === 'undefined' || typeof URL === 'undefined' || typeof Blob === 'undefined') {
        throw new Error('Download is only available in a browser environment.');
    }
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    try {
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
    }
    finally {
        anchor.remove();
        URL.revokeObjectURL(url);
    }
}
