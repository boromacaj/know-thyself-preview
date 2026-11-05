import { runtimeConfig } from '../config/runtimeConfig.js?v=99fda38';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=99fda38';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=99fda38';
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
