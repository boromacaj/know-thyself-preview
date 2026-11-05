import { runtimeConfig } from '../config/runtimeConfig.js?v=2bfd44e';
import { createGoogleReverseGeocodingProvider } from './googleReverseGeocodingProvider.js?v=2bfd44e';
import { unavailableReverseGeocodingProvider } from './unavailableReverseGeocodingProvider.js?v=2bfd44e';
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
