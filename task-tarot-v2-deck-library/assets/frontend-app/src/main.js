import { AppController } from './app/controller.js?v=f2c3a78';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=f2c3a78';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js?v=f2c3a78';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js?v=f2c3a78';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=f2c3a78';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
