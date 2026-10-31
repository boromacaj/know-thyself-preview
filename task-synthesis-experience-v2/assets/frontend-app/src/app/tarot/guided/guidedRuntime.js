/**
 * THE DOOR TO GUIDED TAROT'S LARGE PART.
 *
 * The same pattern as the card descriptions (content/reader/readerDescriptionLoader.ts): the module arrives the first time it is wanted and is in memory after
 * that. `guidedBundle()` is synchronous and returns null until then, so a screen asked to draw a guided step before the module is in memory draws nothing for it
 * rather than throwing; the controller never shows a guided step before `loadGuided()` has resolved.
 */
let loaded = null;
let pending = null;
/** Starts loading, once. Resolves true when the module is in memory and false when it could not be loaded (the person stays in Daily Tarot). Never rejects. */
export function loadGuided() {
    if (loaded !== null)
        return Promise.resolve(true);
    pending ??= import('./guidedBundle.js?v=53c0693')
        .then((module) => { loaded = module; return true; })
        .catch(() => { pending = null; return false; });
    return pending;
}
export const guidedLoaded = () => loaded !== null;
export const guidedBundle = () => loaded;
