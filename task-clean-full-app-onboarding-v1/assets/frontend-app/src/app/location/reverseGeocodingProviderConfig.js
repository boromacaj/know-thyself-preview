import { runtimeConfig } from '../config/runtimeConfig.js?v=f9ab0a6';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=f9ab0a6';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=f9ab0a6';
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
