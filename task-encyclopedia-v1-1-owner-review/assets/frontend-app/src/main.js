import { AppController } from './app/controller.js?v=99fda38';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=99fda38';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js?v=99fda38';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js?v=99fda38';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=99fda38';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
