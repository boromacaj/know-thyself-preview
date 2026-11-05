import { runtimeConfig } from '../config/runtimeConfig.js?v=4cd804d';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=4cd804d';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=4cd804d';
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
