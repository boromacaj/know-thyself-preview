import { AppController } from './app/controller.js?v=53c0693';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=53c0693';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js?v=53c0693';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js?v=53c0693';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=53c0693';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
