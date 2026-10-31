import { parseOwnerProfiles } from './ownerProfileImport.js?v=2ea79e9';
/*
 * THE OWNER'S FIVE PROFILES, DELIVERED PRIVATELY TO THE OWNER'S OWN DEVICE.
 *
 * A deployed preview is a public address, so its bundle carries made-up people and never the real records (scripts/sanitize-preview-build.mjs, unchanged). The
 * records are instead held as a private binding of the Pages project and released by /api/owner-profiles (functions/api/owner-profiles.js) to a request that
 * carries the owner's review token. This module is the browser's half of that:
 *
 *   1. PAIRING, ONCE PER DEVICE. The owner opens the review link with the token in the URL FRAGMENT (#ownerKey=...). A fragment is never sent to a server and is
 *      not in any log; it is read here, kept in this browser's localStorage, and removed from the address bar at once. There is nothing to import, nothing to carry.
 *   2. EVERY LATER OPEN. The stored token is sent as a bearer header; the five records come back, are validated by the same parser the file import uses (exactly
 *      five complete records, rebuilt field by field), and are kept as a CACHE of the API under their own key
 *      (the file import has another). ownerProfileResolver.ts is the one place that decides what the list shows. Nothing is computed or invented here.
 *
 * No token, no records: an unpaired visitor to a public preview gets the build's own made-up people, as always. The file import stays as a fallback.
 * This module holds no record and no token; the production build never runs it (it is behind the same dev-presets flag as the QA control).
 */
export const OWNER_REVIEW_TOKEN_STORAGE_KEY = 'knowthyself.ownerReviewToken';
export const OWNER_REVIEW_ENDPOINT = '/api/owner-profiles';
export const OWNER_REVIEW_FRAGMENT_KEY = 'ownerKey';
/** The last five records the service delivered. A cache of the API and nothing else: the file import has its own key (ownerProfileImport.ts) and never shares it. */
export const OWNER_REVIEW_CACHE_STORAGE_KEY = 'knowthyself.ownerReviewCache';
/** Set when the service refused the token (401), cleared on the next successful pairing, so the QA panel can say why a device is no longer paired. */
export const OWNER_REVIEW_REFUSED_STORAGE_KEY = 'knowthyself.ownerReviewRefused';
/** The one origin owner review is paired on: localStorage is per origin, and only this deployment carries the delivery function and its secrets. */
export const OWNER_REVIEW_CANONICAL_HOST = 'integration-approved-product.know-thyself-preview.pages.dev';
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{32,128}$/;
const defaultStorage = () => {
    try {
        return globalThis.localStorage ?? null;
    }
    catch {
        return null;
    }
};
/** The token a fragment like `#ownerKey=...` carries, or null. Anything that is not shaped like a token is ignored. */
export function ownerReviewTokenFromHash(hash) {
    const body = hash.replace(/^#/, '');
    if (!body.startsWith(`${OWNER_REVIEW_FRAGMENT_KEY}=`))
        return null;
    const value = body.slice(OWNER_REVIEW_FRAGMENT_KEY.length + 1);
    return TOKEN_PATTERN.test(value) ? value : null;
}
export function readOwnerReviewToken(storage = defaultStorage()) {
    try {
        const value = storage?.getItem(OWNER_REVIEW_TOKEN_STORAGE_KEY) ?? null;
        return value !== null && TOKEN_PATTERN.test(value) ? value : null;
    }
    catch {
        return null;
    }
}
export function clearOwnerReviewToken(storage = defaultStorage()) {
    try {
        storage?.removeItem(OWNER_REVIEW_TOKEN_STORAGE_KEY);
    }
    catch { /* nothing to clear */ }
}
/**
 * If the address carries a pairing token, keep it and take it out of the address bar. Returns whether the device was paired by this call.
 * The fragment goes whether or not storing worked: a token must not linger in the visible URL.
 */
export function pairFromLocation(location = globalThis.location, history = globalThis.history ?? null, storage = defaultStorage()) {
    const token = ownerReviewTokenFromHash(location.hash);
    if (token === null)
        return false;
    let stored = false;
    try {
        storage?.setItem(OWNER_REVIEW_TOKEN_STORAGE_KEY, token);
        storage?.removeItem(OWNER_REVIEW_REFUSED_STORAGE_KEY);
        stored = storage !== null;
    }
    catch {
        stored = false;
    }
    try {
        history?.replaceState(null, '', `${location.pathname}${location.search}`);
    }
    catch { /* the address bar is cosmetic */ }
    return stored;
}
/** Whether this device is paired: it holds a token. Cheap and synchronous, so the list can wait for the records instead of showing made-up people first. */
export function isOwnerReviewDevice(storage = defaultStorage()) {
    return readOwnerReviewToken(storage) !== null;
}
/** The records last delivered to this device, validated again on the way out (a damaged cache is no cache). */
export function readOwnerReviewCache(storage = defaultStorage()) {
    try {
        const raw = storage?.getItem(OWNER_REVIEW_CACHE_STORAGE_KEY) ?? null;
        return raw ? parseOwnerProfiles(raw) : null;
    }
    catch {
        return null;
    }
}
export function clearOwnerReviewCache(storage = defaultStorage()) {
    try {
        storage?.removeItem(OWNER_REVIEW_CACHE_STORAGE_KEY);
    }
    catch { /* nothing to clear */ }
}
export function ownerReviewWasRefused(storage = defaultStorage()) {
    try {
        return (storage?.getItem(OWNER_REVIEW_REFUSED_STORAGE_KEY) ?? null) !== null;
    }
    catch {
        return false;
    }
}
/**
 * Asks the service for the five records with the stored token. Success is validated (exactly five complete records) and kept as the CACHE, nothing else.
 * A 401 means the token is not the one the service holds: the pairing AND the cache are dropped (profiles delivered under an auth that no longer works must not
 * survive it) and the refusal is remembered so the panel can say so. A 404 means this origin has no delivery function - the token is kept (it may belong here
 * once the deployment catches up) and the cache stays. Any other failure keeps both.
 */
export async function requestOwnerProfiles(fetcher = (input, init) => fetch(input, init), storage = defaultStorage()) {
    const token = readOwnerReviewToken(storage);
    if (token === null)
        return { outcome: 'unpaired', httpStatus: null, presets: null };
    let response;
    try {
        response = await fetcher(OWNER_REVIEW_ENDPOINT, { headers: { authorization: `Bearer ${token}` }, cache: 'no-store' });
    }
    catch {
        return { outcome: 'unavailable', httpStatus: null, presets: null };
    }
    if (response.status === 401) {
        clearOwnerReviewToken(storage);
        clearOwnerReviewCache(storage);
        try {
            storage?.setItem(OWNER_REVIEW_REFUSED_STORAGE_KEY, '401');
        }
        catch { /* the hint is optional */ }
        return { outcome: 'refused', httpStatus: 401, presets: null };
    }
    if (!response.ok)
        return { outcome: 'unavailable', httpStatus: response.status, presets: null };
    let text;
    try {
        text = await response.text();
    }
    catch {
        return { outcome: 'unavailable', httpStatus: response.status, presets: null };
    }
    const presets = parseOwnerProfiles(text);
    if (!presets || !storage)
        return { outcome: 'unavailable', httpStatus: response.status, presets: null };
    try {
        storage.setItem(OWNER_REVIEW_CACHE_STORAGE_KEY, JSON.stringify(presets));
        storage.removeItem(OWNER_REVIEW_REFUSED_STORAGE_KEY);
    }
    catch {
        return { outcome: 'unavailable', httpStatus: response.status, presets: null };
    }
    return { outcome: 'delivered', httpStatus: response.status, presets };
}
/** Kept for callers that only want the outcome. */
export async function deliverOwnerProfiles(fetcher = (input, init) => fetch(input, init), storage = defaultStorage()) {
    return (await requestOwnerProfiles(fetcher, storage)).outcome;
}
/** The canonical review host when `hostname` is another Pages hostname (where this pairing cannot work), otherwise null. Local and custom hosts are not judged. */
export function ownerReviewHostMismatch(hostname) {
    const host = hostname.trim().toLowerCase();
    return host.endsWith('.pages.dev') && host !== OWNER_REVIEW_CANONICAL_HOST ? OWNER_REVIEW_CANONICAL_HOST : null;
}
