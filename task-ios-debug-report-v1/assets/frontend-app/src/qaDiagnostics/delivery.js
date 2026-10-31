/*
 * GETTING THE REPORT OFF THE PHONE (testable orchestration, no DOM access of its own).
 *
 * iOS and its in-app browsers restrict the clipboard in different ways: the async Clipboard API needs a secure context and a user
 * gesture and is sometimes absent or rejected in a WKWebView; document.execCommand('copy') works in most web views but only inside
 * the gesture and only from a selected text field. The API is tried first, then the selection fallback. When neither works, the
 * caller shows a selectable text box and offers the Share sheet.
 */
const reasonOf = (error) => {
    if (error && typeof error === 'object' && 'name' in error)
        return String(error.name).slice(0, 40);
    return 'rejected';
};
/**
 * Call this synchronously from the tap handler. The Clipboard API is started first and in the same turn (it changes no focus, so an
 * open keyboard or picker is left alone); only when it is missing or rejected is the selection-based fallback tried, because that
 * one has to focus a text field and so disturbs the page it is meant to observe.
 */
export async function copyReport(text, env) {
    const reasons = [];
    if (env.clipboardWrite) {
        try {
            await env.clipboardWrite(text);
            return { ok: true, method: 'clipboard-api' };
        }
        catch (error) {
            reasons.push(`clipboard API ${reasonOf(error)}`);
        }
    }
    else
        reasons.push('clipboard API unavailable');
    if (env.execCopy) {
        try {
            if (env.execCopy(text) === true)
                return { ok: true, method: 'exec-command' };
            reasons.push('execCommand returned false');
        }
        catch (error) {
            reasons.push(`execCommand threw ${reasonOf(error)}`);
        }
    }
    else
        reasons.push('execCommand unavailable');
    return { ok: false, reasons };
}
export async function shareReport(text, env) {
    if (!env.share)
        return { ok: false, reason: 'Share sheet unavailable in this browser' };
    try {
        await env.share({ title: 'KNOW THYSELF debug report', text });
        return { ok: true };
    }
    catch (error) {
        const name = reasonOf(error);
        // AbortError is the person closing the sheet: not a failure of the mechanism.
        return name === 'AbortError' ? { ok: true, reason: 'sheet dismissed' } : { ok: false, reason: `share ${name}` };
    }
}
/** Human line for the status area, in plain words for a non-technical tester. */
export function describeCopy(outcome, chars) {
    const kb = `${Math.max(1, Math.round(chars / 1000))} KB`;
    return outcome.ok
        ? `Copied (${kb}). Now paste it into your message and send it.`
        : `This browser blocked copying. Use "Share", or press and hold in the box below, choose Select All, then Copy.`;
}
