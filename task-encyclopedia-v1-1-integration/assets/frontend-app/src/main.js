import { AppController } from './app/controller.js?v=2bfd44e';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=2bfd44e';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js?v=2bfd44e';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js?v=2bfd44e';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=2bfd44e';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
