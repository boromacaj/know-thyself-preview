import { activeLocale } from '../i18n/locale.js?v=f9ab0a6';
const callbackName = '__knowThyselfGoogleMapsReady';
const scriptSelector = 'script[data-know-thyself-google-maps]';
/*
 * THE KEY IS THE ONE THING THIS PAGE CANNOT FIX.
 *
 * Google tells the page that its key does not work - billing off, a revoked key, a referrer that is not allowed, a
 * project without the API - in exactly one way: by calling window.gm_authFailure after the script has loaded. Nothing
 * rejects, nothing throws; the map simply paints its own "Oops! Something went wrong" over itself. Without this the page
 * has no way to know, so the person is left on Google's error panel with no explanation and a search that fails one
 * suggestion at a time.
 *
 * So the failure is recorded once and announced to whoever asked. It is a fact about the key, not about this moment, so
 * it is not retried: the next page load asks again.
 *
 * gm_authFailure IS NOT THE WHOLE STORY. Observed on the deployed preview: a key whose project has billing switched off
 * (BillingNotEnabledMapError) never calls it. The 3D map mounts, reports itself steady, and paints "Oops! Something went wrong"
 * over itself - while the only thing the page is told is a line on the console, "Google Maps JavaScript API error: <Name>MapError".
 * That line is the one signal there is, so it is read as the same fact: the key cannot be used here. The console still gets it.
 */
let authFailed = false;
const authFailureListeners = new Set();
let authFailureInstalled = false;
/** True once Google has reported that the configured key cannot be used on this page. */
export function googleMapsAuthFailed() {
    return authFailed;
}
/** Calls the listener once if the key fails, now or later. Returns the way to stop listening. */
export function onGoogleMapsAuthFailure(listener) {
    if (authFailed) {
        try {
            listener();
        }
        catch { /* a listener that fails is not Google's problem */ }
        return () => { };
    }
    authFailureListeners.add(listener);
    return () => { authFailureListeners.delete(listener); };
}
/** The line Google writes for a key or project it refuses: "Google Maps JavaScript API error: BillingNotEnabledMapError". */
export const GOOGLE_MAPS_KEY_ERROR_LINE = /^Google Maps JavaScript API error: \w+MapError(?![A-Za-z])/;
function announceAuthFailure() {
    authFailed = true;
    for (const listener of [...authFailureListeners]) {
        try {
            listener();
        }
        catch { /* one listener must not keep the others from hearing it */ }
    }
    authFailureListeners.clear();
}
function installAuthFailureHandler(googleWindow) {
    if (authFailureInstalled)
        return;
    authFailureInstalled = true;
    const previous = googleWindow.gm_authFailure;
    googleWindow.gm_authFailure = () => {
        announceAuthFailure();
        if (typeof previous === 'function') {
            try {
                previous();
            }
            catch { /* the earlier handler is not ours */ }
        }
    };
    /* Listening, not swallowing: the console receives every line exactly as before. */
    const consoleHost = googleWindow.console ?? (typeof console !== 'undefined' ? console : undefined);
    if (consoleHost && typeof consoleHost.error === 'function') {
        const originalError = consoleHost.error.bind(consoleHost);
        consoleHost.error = (...args) => {
            try {
                if (typeof args[0] === 'string' && GOOGLE_MAPS_KEY_ERROR_LINE.test(args[0]))
                    announceAuthFailure();
            }
            catch { /* reading a console line must never throw */ }
            originalError(...args);
        };
    }
}
let pendingLoad = null;
export const loadGoogleMaps = (browserKey) => {
    const normalizedKey = browserKey.trim();
    if (!normalizedKey) {
        return Promise.reject(new Error('Google Maps browser configuration is missing.'));
    }
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return Promise.reject(new Error('Google Maps can only load in a browser document.'));
    }
    const googleWindow = window;
    installAuthFailureHandler(googleWindow);
    const loadedMaps = currentMapsApi(googleWindow);
    if (loadedMaps)
        return Promise.resolve(loadedMaps);
    if (pendingLoad)
        return pendingLoad;
    pendingLoad = new Promise((resolve, reject) => {
        const existingScript = document.querySelector(scriptSelector);
        const script = existingScript ?? document.createElement('script');
        const clearCallbacks = () => {
            delete googleWindow.__knowThyselfGoogleMapsReady;
            script.onerror = null;
        };
        const fail = () => {
            clearCallbacks();
            script.remove();
            pendingLoad = null;
            reject(new Error('Google Maps could not be loaded. Check the approved browser configuration and network access.'));
        };
        googleWindow.__knowThyselfGoogleMapsReady = () => {
            const maps = currentMapsApi(googleWindow);
            if (!maps) {
                fail();
                return;
            }
            clearCallbacks();
            resolve(maps);
        };
        script.onerror = fail;
        if (!existingScript) {
            const source = new URL('https://maps.googleapis.com/maps/api/js');
            source.searchParams.set('key', normalizedKey);
            source.searchParams.set('loading', 'async');
            source.searchParams.set('callback', callbackName);
            source.searchParams.set('v', 'weekly');
            source.searchParams.set('libraries', 'places');
            /*
             * THE READER'S LANGUAGE, SO PLACE SUGGESTIONS ARRIVE IN IT.
             *
             * A Slovak reader searching for their birthplace was offered
             * "Levice, Nitra Region, Slovakia", and that string is what the profile
             * then stores and prints in its header - English in the one line on the
             * screen that is about them.
             *
             * The Maps script loads once per page, so this is fixed at load and a
             * mid-session language switch does not re-fetch it. That is the right
             * behaviour rather than a limitation: the label a profile keeps is the one
             * chosen at selection time, and relabelling somebody's stored birthplace
             * behind them would be worse than leaving it in the language they picked
             * it in.
             *
             * Coordinates and the resolved timezone are unaffected - this changes the
             * words on the suggestion, not the point it resolves to.
             */
            source.searchParams.set('language', activeLocale());
            script.src = source.toString();
            script.async = true;
            script.dataset.knowThyselfGoogleMaps = 'true';
            document.head.append(script);
        }
    });
    return pendingLoad;
};
function currentMapsApi(googleWindow) {
    const maps = googleWindow.google?.maps;
    return maps?.Map ? maps : null;
}
