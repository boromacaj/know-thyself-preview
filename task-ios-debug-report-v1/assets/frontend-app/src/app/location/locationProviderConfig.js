import { runtimeConfig } from '../config/runtimeConfig.js?v=b5ef5ed';
import { localLocationSearchProvider } from './localLocationSearchProvider.js?v=b5ef5ed';
import { createOpenPlaceSearchProvider } from './openPlaceSearchProvider.js?v=b5ef5ed';
/**
 * THE BIRTHPLACE SEARCH IS THE OPEN PLACE INDEX, WHATEVER THE KEYS.
 *
 * It needs no key, makes no request outside the app's own origin and costs nothing per search, so there is nothing to configure and
 * nothing for a missing key to switch off. The one other provider is the bundled one-place gazetteer, reached only when
 * VITE_LOCATION_PROVIDER=placeholder says so on purpose (a test or a review that must stay entirely off the index files).
 * (Google Places used to be the live provider here; its module is gone with the place search it served.)
 */
export function createLocationProviderConfiguration(config) {
    const provider = config.state === 'placeholder'
        ? localLocationSearchProvider
        : createOpenPlaceSearchProvider();
    return {
        provider,
        mode: provider.mode,
        runtimeState: config.state,
    };
}
export const locationProviderConfiguration = createLocationProviderConfiguration(runtimeConfig);
