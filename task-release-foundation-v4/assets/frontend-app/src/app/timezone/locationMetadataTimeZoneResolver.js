export const locationMetadataTimeZoneResolver = {
    id: 'location-provider-timezone-metadata',
    async resolveTimeZone(location, _localDate) {
        if (location.latitude === null || location.longitude === null || location.precision === 'text-only') {
            return unavailable('A resolved birth location with coordinates is required before its timezone can be determined.');
        }
        if (!location.timeZoneHint) {
            return unavailable('The selected location source did not include timezone metadata. No local timezone-boundary resolver is connected for map-only coordinates.');
        }
        if (!isValidTimeZone(location.timeZoneHint)) {
            return {
                timeZone: null,
                source: location.timeZoneHintSource ?? location.provider ?? 'location metadata',
                confidence: 'unavailable',
                limitations: ['The location source returned timezone metadata that could not be validated as an IANA timezone. Astrology remains blocked.'],
            };
        }
        return {
            timeZone: location.timeZoneHint,
            source: location.timeZoneHintSource ?? location.provider ?? 'location provider timezone metadata',
            confidence: 'resolved',
            limitations: [],
        };
    },
};
function unavailable(limitation) {
    return {
        timeZone: null,
        source: 'timezone resolver unavailable',
        confidence: 'unavailable',
        limitations: [limitation],
    };
}
function isValidTimeZone(value) {
    try {
        new Intl.DateTimeFormat('en', { timeZone: value }).format();
        return true;
    }
    catch {
        return false;
    }
}
