export function inputFromLocationSearchResult(input, result) {
    return {
        ...input,
        birthPlaceText: result.label,
        birthLatitude: result.latitude,
        birthLongitude: result.longitude,
        birthLocationPrecision: 'searched',
        birthLocationSource: 'provider-search',
        resolvedPlaceLabel: result.label,
        birthCountry: result.country,
        birthRegion: result.region,
        birthLocationProvider: result.source,
        birthTimeZoneHint: result.timeZone ?? null,
        birthTimeZoneHintSource: result.timeZoneSource ?? result.source,
        birthTimeZone: null,
    };
}
export function inputFromMapClick(input, coordinates) {
    return {
        ...input,
        birthLatitude: coordinates.latitude,
        birthLongitude: coordinates.longitude,
        birthLocationPrecision: 'map-selected',
        birthLocationSource: 'map-click',
        resolvedPlaceLabel: null,
        birthCountry: null,
        birthRegion: null,
        birthLocationProvider: null,
        birthTimeZoneHint: null,
        birthTimeZoneHintSource: null,
        birthTimeZone: null,
    };
}
export function inputFromReverseGeocodeResult(input, result) {
    return {
        ...input,
        birthPlaceText: result.label ?? input.birthPlaceText,
        resolvedPlaceLabel: result.label,
        birthCountry: result.country,
        birthRegion: result.region,
        birthLocationProvider: result.provider,
    };
}
