import { runtimeConfig } from '../config/runtimeConfig.js?v=d9f39e7';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=d9f39e7';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=d9f39e7';
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
