import { runtimeConfig } from '../config/runtimeConfig.js?v=f2c3a78';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=f2c3a78';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=f2c3a78';
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
