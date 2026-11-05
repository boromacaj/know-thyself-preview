import { AppController } from './app/controller.js?v=4cd804d';
import { isTermsSatisfied } from './legal/legalRecord.js?v=4cd804d';
import { locationProviderConfiguration } from './app/location/locationProviderConfig.js?v=4cd804d';
import { reverseGeocodingProviderConfiguration } from './app/location/reverseGeocodingProviderConfig.js?v=4cd804d';
import { mapProviderConfiguration } from './app/map/mapProviderConfig.js?v=4cd804d';
import { timeZoneResolverConfiguration } from './app/timezone/timeZoneResolverConfig.js?v=4cd804d';
const root = document.querySelector('#root');
if (!root)
    throw new Error('Missing #root application mount');
/* The rollback takes the same personal data as the product, so it asks for the same Terms: without them it hands over to the front door, whose gate owns the acceptance. */
if (!isTermsSatisfied()) {
    window.location.replace(new URL('../', window.location.href).href);
}
else {
    new AppController(root, locationProviderConfiguration.provider, reverseGeocodingProviderConfiguration.provider, timeZoneResolverConfiguration.resolver, mapProviderConfiguration.provider).start();
}
