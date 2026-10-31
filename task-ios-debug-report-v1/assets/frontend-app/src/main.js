import { AppController } from './app/controller.js?v=b5ef5ed';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=b5ef5ed';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js?v=b5ef5ed';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js?v=b5ef5ed';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=b5ef5ed';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
