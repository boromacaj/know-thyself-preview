import { runtimeConfig } from '../config/runtimeConfig.js?v=2ea79e9';
import { createGoogleTimeZoneResolver } from './googleTimeZoneResolver.js?v=2ea79e9';
import { locationMetadataTimeZoneResolver } from './locationMetadataTimeZoneResolver.js?v=2ea79e9';
/**
 * THE ZONE COMES WITH THE PLACE. A birthplace chosen from the open place index carries the IANA zone of its record
 * (GeoNames' own, `timeZoneHint`), and that is what the resolution is: no second service is asked, and the device's own zone is never
 * a fallback. Only a point that arrives WITHOUT a zone - the rollback application's map click - goes on to the Google Time Zone
 * resolver, and only where that application has its key configured.
 */
function metadataFirst(primary, fallback) {
    return {
        id: `${primary.id}-then-${fallback.id}`,
        resolveTimeZone(location, localDate, localTime) {
            return (location.timeZoneHint ? primary : fallback).resolveTimeZone(location, localDate, localTime);
        },
    };
}
export function createTimeZoneResolverConfiguration(config) {
    if (config.googleConfigured) {
        return {
            resolver: metadataFirst(locationMetadataTimeZoneResolver, createGoogleTimeZoneResolver(config)),
            mode: 'provider-metadata-then-google-time-zone-api',
        };
    }
    return {
        resolver: locationMetadataTimeZoneResolver,
        mode: 'provider-metadata',
    };
}
export const timeZoneResolverConfiguration = createTimeZoneResolverConfiguration(runtimeConfig);
