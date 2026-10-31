import { AppController } from './app/controller.js?v=2ea79e9';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=2ea79e9';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js?v=2ea79e9';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js?v=2ea79e9';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=2ea79e9';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
