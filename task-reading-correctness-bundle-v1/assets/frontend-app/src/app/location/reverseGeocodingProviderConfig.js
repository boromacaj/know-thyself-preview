import { runtimeConfig } from '../config/runtimeConfig.js';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js';
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
