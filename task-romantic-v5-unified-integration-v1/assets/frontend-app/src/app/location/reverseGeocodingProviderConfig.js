import { runtimeConfig } from '../config/runtimeConfig.js?v=d9a1a90';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=d9a1a90';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=d9a1a90';
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
