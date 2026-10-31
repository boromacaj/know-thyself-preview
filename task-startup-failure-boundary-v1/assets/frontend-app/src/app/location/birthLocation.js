export function birthLocationFromProfile(input) {
    return {
        rawText: input.birthPlaceText,
        resolvedLabel: input.resolvedPlaceLabel,
        latitude: input.birthLatitude,
        longitude: input.birthLongitude,
        country: input.birthCountry,
        region: input.birthRegion,
        precision: input.birthLocationPrecision,
        source: input.birthLocationSource,
        provider: input.birthLocationProvider,
        timeZoneHint: input.birthTimeZoneHint,
        timeZoneHintSource: input.birthTimeZoneHintSource,
    };
}
