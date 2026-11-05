import { runtimeConfig } from '../config/runtimeConfig.js';
import { createGoogleMapsProvider } from './googleMapsProvider.js';
import { createPlaceholderMapProvider } from './placeholderMapProvider.js';
const candidates = [
    {
        id: 'google-maps',
        label: 'Google Maps Platform',
        mapCapability: 'Maps JavaScript API with satellite or hybrid map type',
        searchCapability: 'Places Autocomplete with selected place geometry',
        credentialRequirement: 'Browser API key, enabled billing, and domain restrictions',
        mapDocumentation: 'https://developers.google.com/maps/documentation/javascript/maptypes',
        searchDocumentation: 'https://developers.google.com/maps/documentation/places/web-service/place-autocomplete',
    },
    {
        id: 'mapbox',
        label: 'Mapbox',
        mapCapability: 'Mapbox GL JS with Mapbox Standard Satellite',
        searchCapability: 'Search Box API suggest/retrieve session',
        credentialRequirement: 'Restricted public access token',
        mapDocumentation: 'https://docs.mapbox.com/map-styles/reference/standard-satellite/',
        searchDocumentation: 'https://docs.mapbox.com/api/search/search-box/',
    },
];
export function createMapProviderConfiguration(config) {
    return {
        provider: config.googleConfigured
            ? createGoogleMapsProvider(config)
            : createPlaceholderMapProvider(config.configurationRequirement, {
                requestedProvider: config.requestedLocationProvider,
                selectedProvider: config.selectedLocationProvider,
                googleKeyPresent: config.googleBrowserKeyPresent,
                googleConfigured: config.googleConfigured,
                configState: config.state,
            }),
        candidates,
        runtimeState: config.state,
    };
}
export const mapProviderConfiguration = createMapProviderConfiguration(runtimeConfig);
