/*
 * PERSISTENCE BRIDGE — SAFE, INCREMENTAL INDEXEDDB SHADOW.
 *
 * Strategy: localStorage remains the PRIMARY persistence path. The bridge
 * shadows writes to IndexedDB as a SECONDARY copy. This is write-behind,
 * never write-through: if IndexedDB fails, localStorage still works and the
 * app is unaffected. The bridge is idempotent and crash-safe.
 *
 * Identity: every record the bridge writes is owned by the device's guest id
 * (auth/guestProvider.ts), created once at the first initialization and stable
 * across reloads. A shadow written before guest ids existed (ownerUserId null)
 * is adopted by the guest on the next initialization, so one device never
 * holds two "current" profiles.
 *
 * Concurrency: all IndexedDB writes are serialized through a single promise
 * chain (`writeChain`). Each write carries a monotonic version counter; a
 * stale write that arrives after a newer one is silently dropped. This
 * prevents out-of-order overwrites.
 *
 * Deletion: `shutdownBridge()` sets a flag that blocks new writes and waits
 * for the chain to drain. `resetBridgeAfterDeletion()` returns the bridge to
 * a clean pre-init state so it can be re-initialized on the next page load.
 */
import { snapshotToStoredProfile } from './profileAdapter.js?v=4cd804d';
import { ensureGuestSession } from '../auth/guestProvider.js?v=4cd804d';
const BRIDGE_VERSION_KEY = 'knowthyself.bridge.version';
const BRIDGE_VERSION = '1';
const ACTIVE_PROFILE_KEY = 'activeProfileId';
let bridgeActive = false;
let bridgeShutdown = false;
let shadowProfileId = null;
let guestUserId = null;
let lastError = null;
let writeCounter = 0;
let writeChain = Promise.resolve();
export function getBridgeStatus() {
    return {
        active: bridgeActive,
        shutdown: bridgeShutdown,
        shadowProfileId,
        guestUserId,
        lastError,
        writeCounter,
    };
}
/** The guest id every bridge record is owned by; created once, on first use. */
function ownerId() {
    if (guestUserId)
        return guestUserId;
    try {
        guestUserId = ensureGuestSession().user.userId;
    }
    catch {
        guestUserId = null;
    }
    return guestUserId;
}
function enqueue(operation, onBlocked) {
    const next = writeChain.then(() => {
        if (bridgeShutdown)
            return onBlocked;
        return operation();
    }).catch((error) => {
        lastError = error instanceof Error ? error.message : 'Bridge operation failed';
        return onBlocked;
    });
    writeChain = next;
    return next;
}
const newest = (a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '') || b.version - a.version;
export async function initializeBridge(readLocalProfile) {
    if (bridgeActive)
        return;
    if (bridgeShutdown)
        return;
    try {
        const owner = ownerId();
        const snapshot = readLocalProfile();
        if (!snapshot) {
            bridgeActive = true;
            return;
        }
        const { getDb } = await import('./db.js?v=4cd804d');
        const db = await getDb();
        /* The guest's own shadow first, then a shadow from before guest ids. Several candidates (an interrupted earlier
           init) collapse to the newest; the rest are copies of the same localStorage profile and are removed. */
        const candidates = (await getAllFromStore(db, 'profiles'))
            .filter((p) => p.ownerUserId === owner || p.ownerUserId === null)
            .sort(newest);
        const existingShadow = candidates[0];
        for (const duplicate of candidates.slice(1))
            await deleteFromStore(db, 'profiles', duplicate.id);
        if (existingShadow) {
            shadowProfileId = existingShadow.id;
            const fresh = snapshotToStoredProfile(snapshot, existingShadow.id, owner);
            const stored = { ...fresh, createdAt: existingShadow.createdAt, version: existingShadow.version + 1 };
            await putInStore(db, 'profiles', stored);
            writeCounter = stored.version;
        }
        else {
            const stored = snapshotToStoredProfile(snapshot, undefined, owner);
            shadowProfileId = stored.id;
            await putInStore(db, 'profiles', stored);
            writeCounter = stored.version;
        }
        await putInStore(db, 'settings', { key: ACTIVE_PROFILE_KEY, value: shadowProfileId });
        try {
            localStorage.setItem(BRIDGE_VERSION_KEY, BRIDGE_VERSION);
        }
        catch { /* quota or blocked — not critical */ }
        bridgeActive = true;
        lastError = null;
    }
    catch (error) {
        lastError = error instanceof Error ? error.message : 'Bridge initialization failed';
        bridgeActive = true;
    }
}
export function shadowWriteProfile(snapshot) {
    if (!bridgeActive || bridgeShutdown)
        return Promise.resolve();
    writeCounter += 1;
    const thisVersion = writeCounter;
    return enqueue(async () => {
        const { getDb } = await import('./db.js?v=4cd804d');
        const db = await getDb();
        const owner = ownerId();
        if (shadowProfileId) {
            const existing = await getFromStore(db, 'profiles', shadowProfileId);
            if (existing && existing.version >= thisVersion)
                return;
            const fresh = snapshotToStoredProfile(snapshot, shadowProfileId, owner);
            const stored = existing
                ? { ...fresh, createdAt: existing.createdAt, version: thisVersion }
                : { ...fresh, version: thisVersion };
            await putInStore(db, 'profiles', stored);
        }
        else {
            const stored = snapshotToStoredProfile(snapshot, undefined, owner);
            shadowProfileId = stored.id;
            await putInStore(db, 'profiles', { ...stored, version: thisVersion });
            await putInStore(db, 'settings', { key: ACTIVE_PROFILE_KEY, value: shadowProfileId });
        }
        lastError = null;
    }, undefined);
}
/**
 * Appends one legal event to the IndexedDB log, owned by the guest id. Resolves true only when the record was written;
 * false when the bridge is shut down or IndexedDB refused. The durable fact lives in legal/legalRecord.ts.
 */
export function recordLegalEvent(documentType, documentVersion, eventType) {
    if (bridgeShutdown)
        return Promise.resolve(false);
    return enqueue(async () => {
        const { recordAcknowledgment } = await import('./legalStore.js?v=4cd804d');
        await recordAcknowledgment({
            userId: ownerId(),
            documentType: documentType,
            documentVersion,
            eventType,
            ipAddress: null,
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        });
        return true;
    }, false);
}
/** @deprecated Use recordLegalEvent with an explicit eventType. */
export function recordLegalAcknowledgment(documentType, documentVersion) {
    return recordLegalEvent(documentType, documentVersion, 'view');
}
export async function shutdownBridge() {
    bridgeShutdown = true;
    await writeChain;
    bridgeActive = false;
    shadowProfileId = null;
    writeCounter = 0;
    lastError = null;
}
export function resetBridgeAfterDeletion() {
    bridgeShutdown = false;
    bridgeActive = false;
    shadowProfileId = null;
    guestUserId = null;
    writeCounter = 0;
    lastError = null;
    writeChain = Promise.resolve();
}
// ── Low-level IndexedDB helpers ──────────────────────────────────────
function getFromStore(db, storeName, key) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const request = tx.objectStore(storeName).get(key);
        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => reject(request.error);
    });
}
function getAllFromStore(db, storeName) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const request = tx.objectStore(storeName).getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
function putInStore(db, storeName, value) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const request = tx.objectStore(storeName).put(value);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}
function deleteFromStore(db, storeName, key) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const request = tx.objectStore(storeName).delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}
