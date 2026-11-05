import { activeLocale } from '../i18n/locale.js?v=53c0693';
import { t } from '../i18n/uiStrings.js?v=53c0693';
import { LocationSearchProviderError } from './locationSearchProvider.js?v=53c0693';
import { createPlaceIndexSource, searchPlaceIndex, } from './openPlaceIndex.js?v=53c0693';
import { preferredCountriesFor } from './placeSearchContext.js?v=53c0693';
/*
 * THE BIRTHPLACE SEARCH THE ONBOARDING USES: OPEN DATA, NO GEOCODING SERVICE, NO KEY.
 *
 * It answers the question the onboarding asks - "where were you born?" - from the index in openPlaceIndex.ts and turns each match into
 * the one result shape the rest of the product already takes (LocationSearchResult), plus what the search knows that the old result
 * could not say: whether it is a settlement or a verified maternity facility, whose coordinates they are, and which IANA zone the
 * record points to. The zone comes WITH the result (`timeZone`, `timeZoneSource`), so choosing a place never needs a second service.
 *
 * A HOSPITAL IS OFFERED, NOT VOUCHED FOR. Most maternity wards are not tagged in OpenStreetMap, but the hospital that holds them is mapped, and a
 * person who writes "maternity ward Zvolen" is looking for it. When the query asks for a hospital or a maternity ward, the general hospitals of
 * the town are offered (placeKind 'hospital') and the suggestion says the maternity ward is not confirmed; a verified ward, where there is
 * one, is above them.
 *
 * WHAT A FACILITY IS HERE, AND IS NOT. A facility is an OpenStreetMap object whose own tags say obstetric care (docs/data/OPEN_PLACE_DATA.md,
 * "What counts as a maternity facility"). It is a record of what OpenStreetMap says TODAY: nothing here says the facility existed, or
 * had a maternity ward, on the day a person was born, and the suggestion says "current record" so that no one reads it that way. When a
 * facility is chosen its own coordinates are used; when only a settlement is chosen the settlement's are, and `coordinatePrecision`
 * says which, so the next reader of the record does not have to guess.
 */
const MINIMUM_QUERY_LENGTH = 2;
export const PLACE_INDEX_BASE_URL = '/know-thyself-preview/task-synthesis-experience-v2/assets/places/';
const unavailableMessage = 'Place search is temporarily unavailable. Try again.';
const fetchJson = async (url) => {
    const response = await fetch(url, { credentials: 'omit' });
    if (response.status === 404)
        return null;
    if (!response.ok)
        throw new Error(`place index: ${response.status} for ${url}`);
    return response.json();
};
const browserPreferredCountries = () => preferredCountriesFor(activeLocale(), typeof navigator !== 'undefined' && Array.isArray(navigator.languages) ? navigator.languages : []);
export function createOpenPlaceSearchProvider(source = createPlaceIndexSource(PLACE_INDEX_BASE_URL, fetchJson), preferredCountries = browserPreferredCountries) {
    return {
        id: 'open-place-index',
        label: 'GeoNames and OpenStreetMap, searched locally',
        mode: 'live',
        limitation: 'Settlements of 500 people and over everywhere (every settlement in Slovakia and Czechia) from GeoNames; verified maternity facilities from OpenStreetMap where the index carries them (Slovakia). No request leaves the app\'s own origin.',
        async searchPlaces(query) {
            const typed = query.trim();
            if (typed.length < MINIMUM_QUERY_LENGTH)
                return [];
            let meta;
            let matches;
            try {
                [meta, matches] = await Promise.all([source.meta(), searchPlaceIndex(source, typed, { preferredCountries: preferredCountries() })]);
            }
            catch {
                throw new LocationSearchProviderError(unavailableMessage);
            }
            return resultsFor(meta, matches);
        },
    };
}
/* -------------------------------------------------------------- the results == */
const roundedCoordinate = (value) => Math.round(value * 10_000) / 10_000;
function kindOfSettlement(place) {
    if (place.population >= 100_000)
        return t('onb.place.kind.city');
    if (place.population >= 5_000)
        return t('onb.place.kind.town');
    return t('onb.place.kind.village');
}
function placeLabel(meta, place) {
    const region = meta.admin1[`${place.countryCode}.${place.admin1Code}`] ?? null;
    const country = meta.countries[place.countryCode] ?? null;
    return { region, country };
}
function joinParts(parts) {
    return parts.filter((part) => typeof part === 'string' && part.length > 0).join(', ');
}
function settlementResult(meta, place) {
    const { region, country } = placeLabel(meta, place);
    return {
        id: `geonames:${place.gid}`,
        label: joinParts([place.name, region, country]),
        detail: kindOfSettlement(place),
        latitude: roundedCoordinate(place.latitude),
        longitude: roundedCoordinate(place.longitude),
        country,
        region,
        source: 'geonames',
        precision: 'searched',
        timeZone: place.timeZone || null,
        timeZoneSource: 'geonames-place-record',
        placeKind: 'settlement',
        coordinatePrecision: 'settlement',
        settlement: place.name,
        dataSource: 'GeoNames',
    };
}
function facilityResult(meta, facility, home) {
    const country = meta.countries[facility.countryCode] ?? null;
    const region = home ? placeLabel(meta, home).region : null;
    const homeName = home?.name ?? null;
    const isHospital = facility.kind === 'hospital';
    const nameHasHome = homeName !== null && facility.name.toLowerCase().includes(homeName.toLowerCase());
    return {
        id: facility.id,
        label: joinParts([facility.name, nameHasHome ? null : homeName, country]),
        detail: isHospital
            ? `${t('onb.place.kind.hospital')} · ${t('onb.place.hospital.unconfirmed')}`
            : `${t('onb.place.kind.facility')} · ${t('onb.place.facility.current')}`,
        latitude: roundedCoordinate(facility.latitude),
        longitude: roundedCoordinate(facility.longitude),
        country,
        region,
        source: 'openstreetmap+geonames',
        precision: 'searched',
        timeZone: home?.timeZone || null,
        timeZoneSource: 'geonames-nearest-settlement',
        placeKind: isHospital ? 'hospital' : 'facility',
        coordinatePrecision: 'facility',
        settlement: homeName,
        dataSource: 'OpenStreetMap contributors (ODbL), GeoNames',
    };
}
/**
 * Two different places with the same label (there are 17 Nová Ves in Slovakia) must not look like one. Where the labels collide, the
 * coordinates are added to the detail line - the one thing that always tells them apart - and the label is left as the profile will
 * carry it.
 */
function disambiguated(results) {
    const counts = new Map();
    for (const result of results)
        counts.set(result.label, (counts.get(result.label) ?? 0) + 1);
    return results.map((result) => ((counts.get(result.label) ?? 0) > 1
        ? { ...result, detail: `${result.detail ?? ''} · ${formatCoordinates(result.latitude, result.longitude)}` }
        : result));
}
function formatCoordinates(latitude, longitude) {
    return `${Math.abs(latitude).toFixed(2)}° ${latitude >= 0 ? 'N' : 'S'}, ${Math.abs(longitude).toFixed(2)}° ${longitude >= 0 ? 'E' : 'W'}`;
}
function resultsFor(meta, matches) {
    const results = [];
    for (const match of matches) {
        if (match.kind === 'settlement')
            results.push(settlementResult(meta, match.place));
        else
            results.push(facilityResult(meta, match.facility, match.settlement));
    }
    return disambiguated(results);
}
