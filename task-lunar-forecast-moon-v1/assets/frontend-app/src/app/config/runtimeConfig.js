export function resolveRuntimeConfig(environment = readViteEnvironment()) {
    const rawProvider = normalizedValue(environment.VITE_LOCATION_PROVIDER);
    const googleMapsBrowserKey = normalizedValue(environment.VITE_GOOGLE_MAPS_BROWSER_KEY);
    const googleBrowserKeyPresent = googleMapsBrowserKey !== null;
    if (rawProvider === null) {
        return placeholderConfig({
            state: 'missing-config',
            requestedLocationProvider: 'placeholder',
            googleMapsBrowserKey,
            googleBrowserKeyPresent,
            limitation: 'No runtime location provider was supplied. Placeholder mode is active.',
            configurationRequirement: 'Set VITE_LOCATION_PROVIDER=google and provide an approved VITE_GOOGLE_MAPS_BROWSER_KEY with Maps JavaScript, Places, and Time Zone API access.',
        });
    }
    const requestedProvider = rawProvider.toLowerCase();
    if (requestedProvider === 'placeholder') {
        return placeholderConfig({
            state: 'placeholder',
            requestedLocationProvider: 'placeholder',
            googleMapsBrowserKey,
            googleBrowserKeyPresent,
            limitation: 'Placeholder mode is explicitly configured. No live map or autocomplete service is active.',
            configurationRequirement: 'Set VITE_LOCATION_PROVIDER=google and provide an approved VITE_GOOGLE_MAPS_BROWSER_KEY with Maps JavaScript, Places, and Time Zone API access.',
        });
    }
    if (requestedProvider === 'google' && !googleBrowserKeyPresent) {
        return placeholderConfig({
            state: 'google-missing-key',
            requestedLocationProvider: 'google',
            googleMapsBrowserKey: null,
            googleBrowserKeyPresent: false,
            limitation: 'Google Maps was requested, but its browser key is missing. Placeholder mode remains active.',
            configurationRequirement: 'Provide a non-empty VITE_GOOGLE_MAPS_BROWSER_KEY through approved browser runtime configuration.',
        });
    }
    if (requestedProvider === 'google') {
        return {
            requestedLocationProvider: 'google',
            selectedLocationProvider: 'google',
            googleRequested: true,
            googleMapsBrowserKey,
            googleBrowserKeyPresent: true,
            googleConfigured: true,
            state: 'google-configured',
            limitation: 'Google map rendering, live place suggestions, and timezone resolution are configured when the approved browser key can load Maps JavaScript, Places, and Time Zone API.',
            configurationRequirement: 'Use a browser-restricted Google Maps key with Maps JavaScript API, Places API, and Time Zone API enabled.',
        };
    }
    return placeholderConfig({
        state: 'unknown-provider',
        requestedLocationProvider: 'unknown',
        googleMapsBrowserKey,
        googleBrowserKeyPresent,
        limitation: `Unsupported VITE_LOCATION_PROVIDER value "${rawProvider}". Placeholder mode is active.`,
        configurationRequirement: 'Use VITE_LOCATION_PROVIDER=placeholder or VITE_LOCATION_PROVIDER=google.',
    });
}
export const runtimeConfig = resolveRuntimeConfig();
/**
 * This repository has no Vite build (a plain tsc + static-server pipeline; see
 * frontend-app/scripts/serve.mjs and copy-assets.mjs), so there is no real
 * import.meta.env.DEV/PROD distinction to gate on. The safe repository-consistent
 * equivalent is an explicit opt-in runtime flag, using the same approved-env-key
 * mechanism as VITE_LOCATION_PROVIDER/VITE_GOOGLE_MAPS_BROWSER_KEY above: unset (or
 * anything other than "true") in every deployed/production environment by default,
 * and only enabled locally via a gitignored .env file.
 */
export function isDevProfilePresetsEnabled(environment = readViteEnvironment()) {
    return normalizedValue(environment.VITE_ENABLE_DEV_PROFILE_PRESETS)?.toLowerCase() === 'true';
}
export const devProfilePresetsEnabled = isDevProfilePresetsEnabled();
export function resolveQaProfileSet(environment = readViteEnvironment()) {
    return normalizedValue(environment.VITE_QA_PROFILE_SET)?.toLowerCase() === 'owner' ? 'owner' : 'sanitized';
}
export const qaProfileSet = resolveQaProfileSet();
export function readViteEnvironment() {
    const meta = import.meta;
    const browserRuntime = globalThis;
    return {
        ...browserRuntime.__KNOW_THYSELF_RUNTIME_ENV__,
        ...meta.env,
    };
}
function normalizedValue(value) {
    const normalized = value?.trim();
    return normalized ? normalized : null;
}
function placeholderConfig(input) {
    return {
        ...input,
        selectedLocationProvider: 'placeholder',
        googleRequested: input.requestedLocationProvider === 'google',
        googleConfigured: false,
    };
}
