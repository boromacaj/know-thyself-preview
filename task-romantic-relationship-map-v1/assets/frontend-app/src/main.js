import { AppController } from './app/controller.js';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
