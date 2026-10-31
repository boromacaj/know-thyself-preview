/*
 * THE CLEAN FULL-APP BUILD: a first-time visitor's experience, end to end, with nobody's profile in it.
 *
 * It is a BUILD-TIME switch, stamped into the page as <meta name="kt-clean-onboarding" content="1"> by copy-assets.mjs when KT_CLEAN_ONBOARDING=1 (the
 * decision lives in ci/clean-onboarding.mjs, one marker file per branch). It is a meta tag and not a runtime-config key so the four approved public runtime
 * keys, and everything that pins them, stay exactly as they were. A page without the tag is every other build, byte for byte.
 *
 * What the switch changes (and nothing else):
 *   1. no QA / demo / owner profile is offered or injected (the build sets VITE_ENABLE_DEV_PROFILE_PRESETS to false and the stubs replace the preset data);
 *   2. the page's browser storage is a private namespace of THIS preview path (the inline shim in premium-earth-phase-a.html), so another preview of the same
 *      origin can neither put a profile here nor lose one to this build;
 *   3. a returning visitor with a saved profile is taken to the Main Menu instead of the front door (profileSessionRestore.ts);
 *   4. Settings offers one deliberate way back to the beginning: "Start over with a new profile".
 */
import { destinationFromHash, readStoredProfile } from './app/premium-earth/profilePersistence.js?v=f9ab0a6';
export const cleanOnboardingEnabled = () => (typeof document !== 'undefined'
    && document.querySelector('meta[name="kt-clean-onboarding"]')?.getAttribute('content') === '1');
/**
 * A returning visitor asks for the Main Menu by name.
 *
 * profileSessionRestore.ts restores only what a URL hash asks for (the front door rule every other build keeps: the bare address always plays the opening). In the
 * clean build a person this device already knows IS asking for their menu, so the bare address is given the hash `#/menu` - in place, no history entry - when, and
 * only when, a usable saved profile exists. The restore then runs exactly as it does for any `#/menu` link, and declines exactly as before if the record is unusable.
 */
export function askForMenuIfRemembered() {
    if (!cleanOnboardingEnabled() || destinationFromHash(window.location.hash) || !readStoredProfile())
        return;
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/menu`);
}
/** The locale is a preference of the person's, not a part of the profile: it survives a start-over. */
const KEPT_ACROSS_START_OVER = ['kt-locale'];
/**
 * Forgets the profile, and everything that belongs to it, on this device - in this build's own namespace only (the shim's clear() cannot reach another
 * preview's keys) - and returns to the front door. The caller has already asked the person twice.
 */
export function startOverOnThisDevice() {
    try {
        const kept = KEPT_ACROSS_START_OVER.map((key) => [key, window.localStorage.getItem(key)]);
        window.localStorage.clear();
        window.sessionStorage.clear();
        for (const [key, value] of kept)
            if (value !== null)
                window.localStorage.setItem(key, value);
    }
    catch {
        /* Blocked storage means nothing was kept in the first place. */
    }
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    window.location.reload();
}
