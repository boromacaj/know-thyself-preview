import { ReverseGeocodingProviderError } from './reverseGeocodingProvider.js?v=d9f39e7';
export const unavailableReverseGeocodingProvider = {
    id: 'reverse-geocoding-unavailable',
    label: 'Reverse geocoding unavailable',
    mode: 'unavailable',
    limitation: 'No live reverse-geocoding provider is configured. Exact map coordinates can be stored without inferred place metadata.',
    async reverseGeocode() {
        throw new ReverseGeocodingProviderError('Exact map point was stored, but no reverse-geocoding provider is configured.');
    },
};
