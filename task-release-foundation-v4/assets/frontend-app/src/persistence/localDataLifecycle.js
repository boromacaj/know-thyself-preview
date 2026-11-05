/** The locale is a preference of the person's, not a part of the profile: it survives a deletion. */
export const KEPT_ACROSS_DELETION = ['kt-locale'];
/** Owner-review material (other people's QA profiles, the review token) is not the person's data and is not exported. */
const EXPORT_EXCLUDED = /^knowthyself\.owner(Profiles|Review)/;
function entriesOf(storage) {
    const out = {};
    for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if (key === null || EXPORT_EXCLUDED.test(key))
            continue;
        const value = storage.getItem(key);
        if (value !== null)
            out[key] = value;
    }
    return out;
}
/** Every key of both web storages (minus owner-review material), for the GDPR export. */
export function collectLocalStorageData() {
    let local = {};
    let session = {};
    try {
        local = entriesOf(window.localStorage);
    }
    catch { /* blocked storage holds nothing */ }
    try {
        session = entriesOf(window.sessionStorage);
    }
    catch { /* blocked storage holds nothing */ }
    return { localStorage: local, sessionStorage: session };
}
function clearWebStorage(storage, keep) {
    try {
        const kept = keep.map((key) => [key, storage.getItem(key)]);
        storage.clear();
        for (const [key, value] of kept)
            if (value !== null)
                storage.setItem(key, value);
        return storage.length === kept.filter(([, value]) => value !== null).length ? 'cleared' : 'failed';
    }
    catch {
        return 'failed';
    }
}
async function clearIndexedDb(errors) {
    let db;
    try {
        db = await import('./db.js?v=4cd804d');
        await db.getDb();
    }
    catch {
        /* Never opened, or cannot be opened in this context: nothing was ever written there. */
        return { outcome: 'unavailable', report: null };
    }
    try {
        const { deleteEverything } = await import('./deletionService.js?v=4cd804d');
        const report = await deleteEverything();
        db.closeDb();
        return { outcome: 'cleared', report };
    }
    catch (error) {
        errors.push(error instanceof Error ? error.message : 'IndexedDB deletion failed');
        return { outcome: 'failed', report: null };
    }
}
export async function forgetAllLocalData() {
    const errors = [];
    try {
        const { shutdownBridge } = await import('./persistenceBridge.js?v=4cd804d');
        await shutdownBridge();
    }
    catch (error) {
        errors.push(error instanceof Error ? error.message : 'Bridge shutdown failed');
    }
    /* The authoritative stores go first: should IndexedDB hang or refuse, the device still no longer holds the profile. */
    let local = 'unavailable';
    let session = 'unavailable';
    try {
        local = clearWebStorage(window.localStorage, KEPT_ACROSS_DELETION);
    }
    catch {
        local = 'failed';
    }
    try {
        session = clearWebStorage(window.sessionStorage, []);
    }
    catch {
        session = 'failed';
    }
    if (local === 'failed')
        errors.push('localStorage could not be cleared');
    if (session === 'failed')
        errors.push('sessionStorage could not be cleared');
    const { outcome: indexedDb, report } = await clearIndexedDb(errors);
    try {
        const { resetBridgeAfterDeletion } = await import('./persistenceBridge.js?v=4cd804d');
        resetBridgeAfterDeletion();
    }
    catch { /* the bridge module is optional */ }
    return {
        ok: indexedDb !== 'failed' && local !== 'failed' && session !== 'failed',
        indexedDb,
        localStorage: local,
        sessionStorage: session,
        report,
        errors,
    };
}
