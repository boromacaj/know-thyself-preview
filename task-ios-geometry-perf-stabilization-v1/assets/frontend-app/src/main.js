import { AppController } from './app/controller.js?v=d9f39e7';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=d9f39e7';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js?v=d9f39e7';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js?v=d9f39e7';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=d9f39e7';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
