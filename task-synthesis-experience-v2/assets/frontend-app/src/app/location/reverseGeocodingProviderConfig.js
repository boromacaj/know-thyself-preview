import { runtimeConfig } from '../config/runtimeConfig.js?v=53c0693';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=53c0693';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=53c0693';
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
