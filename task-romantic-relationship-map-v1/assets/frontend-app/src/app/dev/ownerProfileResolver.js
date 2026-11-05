import { isOwnerReviewDevice, ownerReviewHostMismatch, ownerReviewWasRefused, readOwnerReviewCache, requestOwnerProfiles, } from './ownerReviewDelivery.js';
const storageOf = (input) => {
    if (input.storage !== undefined)
        return input.storage;
    try {
        return globalThis.localStorage ?? null;
    }
    catch {
        return null;
    }
};
function withHost(base, hostname) {
    const ownersList = base.source === 'build-owner' || base.source === 'api' || base.source === 'cached-api';
    return { ...base, hostMismatch: ownersList ? null : ownerReviewHostMismatch(hostname) };
}
/** The list before the network has answered. Synchronous, so the panel is never empty by accident and never shows the wrong people first. */
export function resolveOwnerProfilesLocally(input) {
    const { build, hostname } = input;
    if (input.qaProfileSet === 'owner') {
        return withHost({ source: 'build-owner', presets: build, paired: false, pending: false, apiStatus: null, refused: false }, hostname);
    }
    const storage = storageOf(input);
    if (isOwnerReviewDevice(storage)) {
        const cached = readOwnerReviewCache(storage);
        return withHost(cached
            ? { source: 'cached-api', presets: cached, paired: true, pending: true, apiStatus: null, refused: false }
            : { source: 'unavailable', presets: [], paired: true, pending: true, apiStatus: null, refused: false }, hostname);
    }
    return withHost({ source: 'public-fallback', presets: build, paired: false, pending: false, apiStatus: null, refused: ownerReviewWasRefused(storage) }, hostname);
}
/** The settled list: asks the service only in the protected remote-owner mode (a sanitized build, a paired device). */
export async function resolveOwnerProfiles(input) {
    const { hostname } = input;
    if (input.qaProfileSet === 'owner')
        return resolveOwnerProfilesLocally(input);
    const storage = storageOf(input);
    if (!isOwnerReviewDevice(storage))
        return resolveOwnerProfilesLocally({ ...input, storage });
    const result = await requestOwnerProfiles(input.fetcher, storage);
    if (result.outcome === 'delivered' && result.presets) {
        return withHost({ source: 'api', presets: result.presets, paired: true, pending: false, apiStatus: result.httpStatus, refused: false }, hostname);
    }
    if (result.outcome === 'refused') {
        /* The pairing and the cache were dropped by the request; what is left is the unpaired rule, with the reason kept. */
        const local = resolveOwnerProfilesLocally({ ...input, storage });
        return { ...local, apiStatus: 401, refused: true };
    }
    const cached = readOwnerReviewCache(storage);
    return withHost(cached
        ? { source: 'cached-api', presets: cached, paired: true, pending: false, apiStatus: result.httpStatus, refused: false }
        : { source: 'unavailable', presets: [], paired: true, pending: false, apiStatus: result.httpStatus, refused: false }, hostname);
}
