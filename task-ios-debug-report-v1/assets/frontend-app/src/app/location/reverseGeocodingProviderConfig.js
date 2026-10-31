import { runtimeConfig } from '../config/runtimeConfig.js?v=b5ef5ed';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=b5ef5ed';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=b5ef5ed';
export function createReverseGeocodingProviderConfiguration(config) {
    const provider = config.googleConfigured
        ? createGoogleReverseGeocodingProvider(config)
        : unavailableReverseGeocodingProvider;
    return {
        provider,
        mode: provider.mode,
        runtimeState: config.state,
    };
}
export const reverseGeocodingProviderConfiguration = createReverseGeocodingProviderConfiguration(runtimeConfig);
