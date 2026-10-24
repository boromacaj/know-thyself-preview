const googleTimeZoneProxyEndpoint = '/api/google-timezone';
const googleTimeZoneSource = 'google-time-zone-api';
const neutralTimeZoneLookupTimestamp = 946728000; // 2000-01-01T12:00:00.000Z
const configurationLimitation = 'Coordinates are selected, but timezone could not be resolved. Configure GOOGLE_TIME_ZONE_API_KEY on the local server.';
const deniedLimitation = 'Coordinates are selected, but timezone could not be resolved. Enable Time Zone API for the server-side Google key/project.';
const unresolvedLimitation = 'Coordinates are selected, but timezone could not be resolved. Configure the server-side Google Time Zone API key.';
export function createGoogleTimeZoneResolver(config, options = {}) {
    if (!config.googleConfigured) {
        throw new Error('Google Time Zone resolver requires Google runtime configuration.');
    }
    const fetcher = options.fetcher ?? defaultFetch;
    const endpoint = options.endpoint ?? googleTimeZoneProxyEndpoint;
    return {
        id: googleTimeZoneSource,
        async resolveTimeZone(location) {
            if (location.latitude === null || location.longitude === null || location.precision === 'text-only') {
                return unavailable('A resolved birth location with coordinates is required before its timezone can be determined.');
            }
            if (!isValidCoordinate(location.latitude, location.longitude)) {
                return unavailable('Selected birth coordinates are outside valid latitude/longitude bounds. Timezone resolution was not attempted.');
            }
            const url = proxyUrl(endpoint, {
                lat: String(location.latitude),
                lng: String(location.longitude),
                timestamp: String(timestampForGoogleLookup()),
            });
            let response;
            try {
                response = await fetcher(url);
            }
            catch {
                return googleUnavailable();
            }
            let payload;
            try {
                payload = await response.json();
            }
            catch {
                return googleUnavailable(response.ok
                    ? 'Google Time Zone API returned a response that could not be parsed.'
                    : 'The local timezone proxy returned an unavailable response that could not be parsed.');
            }
            const status = stringValue(payload.status);
            const timeZoneId = stringValue(payload.timeZoneId);
            if (response.ok && status === 'OK' && timeZoneId && isValidTimeZone(timeZoneId)) {
                return {
                    timeZone: timeZoneId,
                    source: googleTimeZoneSource,
                    confidence: 'resolved',
                    limitations: [],
                };
            }
            if (response.ok && status === 'OK' && timeZoneId) {
                return googleUnavailable('Google Time Zone API returned a timezone id that could not be validated as an IANA timezone.');
            }
            return googleUnavailable(statusDetail(status));
        },
    };
}
function defaultFetch(url) {
    if (typeof fetch !== 'function') {
        return Promise.reject(new Error('fetch unavailable'));
    }
    return fetch(url);
}
function proxyUrl(endpoint, params) {
    const base = endpoint.startsWith('http')
        ? endpoint
        : `http://know-thyself.local${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const url = new URL(base);
    url.search = new URLSearchParams(params).toString();
    return endpoint.startsWith('http') ? url.toString() : `${url.pathname}${url.search}`;
}
function timestampForGoogleLookup() {
    // The Google Time Zone API needs a timestamp, but the app only uses Google
    // to resolve the IANA timezone identity for selected coordinates. Exact
    // historical offset and UTC birth moment normalization happen later through
    // ECMAScript Intl using that IANA zone. Keeping this lookup timestamp neutral
    // prevents pre-1970 or otherwise unsupported birth dates from blocking
    // Western Astrology after the location itself has already resolved.
    return neutralTimeZoneLookupTimestamp;
}
function googleUnavailable(detail) {
    const base = detail === 'CONFIGURATION_MISSING'
        ? configurationLimitation
        : detail === 'REQUEST_DENIED'
            ? deniedLimitation
            : unresolvedLimitation;
    const statusDetailText = detail && /^[A-Z_]+$/.test(detail)
        ? `Google Time Zone API status: ${detail}.`
        : detail;
    return {
        timeZone: null,
        source: googleTimeZoneSource,
        confidence: 'unavailable',
        limitations: statusDetailText ? [base, statusDetailText] : [base],
    };
}
function unavailable(limitation) {
    return {
        timeZone: null,
        source: googleTimeZoneSource,
        confidence: 'unavailable',
        limitations: [limitation],
    };
}
function isValidCoordinate(latitude, longitude) {
    return Number.isFinite(latitude)
        && latitude >= -90
        && latitude <= 90
        && Number.isFinite(longitude)
        && longitude >= -180
        && longitude <= 180;
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
function stringValue(value) {
    return typeof value === 'string' && value.trim() ? value.trim() : null;
}
function statusDetail(status) {
    return status ?? undefined;
}
