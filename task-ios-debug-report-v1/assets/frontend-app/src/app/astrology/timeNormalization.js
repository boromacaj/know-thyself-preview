import { birthTimeAnswer } from '../birthTimePrecision.js?v=b5ef5ed';
import { birthLocationFromProfile } from '../location/birthLocation.js?v=b5ef5ed';
const NOON_FALLBACK_TIME = '12:00';
export function normalizeBirthTime(input) {
    const limitations = [];
    const location = birthLocationFromProfile(input);
    const dateParts = parseDate(input.birthDate);
    /* The time and its certainty by the shared rule: an UNKNOWN time is empty
       here even if a caller left a value beside it, so it can only ever reach
       the calculation as the noon fallback, never as a typed 12:00. */
    const { birthTime: suppliedBirthTime, birthTimePrecision } = birthTimeAnswer(input.birthTime, input.birthTimePrecision);
    const usesNoonFallback = suppliedBirthTime === '';
    const effectiveBirthTime = usesNoonFallback ? NOON_FALLBACK_TIME : suppliedBirthTime;
    const timeParts = parseTime(effectiveBirthTime);
    const timeZone = input.birthTimeZone;
    if (!dateParts)
        limitations.push('A valid local birth date is required to calculate the UTC birth moment.');
    if (!timeParts)
        limitations.push('A valid local birth time is required. Use HH:MM, or leave it empty to use the local noon estimate.');
    if (usesNoonFallback) {
        limitations.push('Birth time was not supplied. Western Astrology used 12:00 local noon as a neutral midpoint estimate; Moon degree and other time-sensitive values are approximate.');
    }
    if (location.latitude === null || location.longitude === null) {
        limitations.push('Selected birth coordinates are required for location provenance. Typed place text is not treated as coordinates.');
    }
    if (input.birthTimeZoneConfidence !== 'resolved') {
        limitations.push(...(input.birthTimeZoneLimitations.length > 0
            ? input.birthTimeZoneLimitations
            : ['A timezone could not be resolved automatically for the selected birth location. Astrology remains blocked.']));
    }
    if (input.birthTimeZoneConfidence === 'resolved' && !timeZone) {
        limitations.push('Timezone resolution reported success without an IANA timezone. Astrology remains blocked.');
    }
    if (timeZone && !isValidTimeZone(timeZone))
        limitations.push(`The timezone "${timeZone}" is not a valid IANA timezone identifier.`);
    const blockingLimitations = limitations.filter((limitation) => !limitation.startsWith('Birth time was not supplied.'));
    const baseTrace = [
        { label: 'Local birth date', value: input.birthDate || 'Not supplied' },
        { label: 'Local birth time', value: suppliedBirthTime || 'Not supplied' },
        { label: 'Effective birth time', value: effectiveBirthTime },
        { label: 'Birth time precision', value: usesNoonFallback ? 'estimated-local-noon' : 'user-supplied' },
        /* The reader's own answer about certainty, beside the calculation basis
           above: an approximate time is calculated as supplied, and this is where
           the technical record keeps it from reading as exact. */
        { label: 'Birth time certainty', value: birthTimePrecision },
        { label: 'IANA timezone', value: timeZone ?? 'Not supplied' },
        { label: 'Timezone source', value: input.birthTimeZoneSource ?? 'Unavailable' },
        { label: 'Timezone confidence', value: input.birthTimeZoneConfidence },
        { label: 'Timezone limitations', value: input.birthTimeZoneLimitations.join(' ') || 'None' },
        { label: 'Latitude', value: location.latitude === null ? 'Not selected' : String(location.latitude) },
        { label: 'Longitude', value: location.longitude === null ? 'Not selected' : String(location.longitude) },
        { label: 'Location precision', value: location.precision },
        { label: 'Location source', value: location.source },
        { label: 'Location provider', value: location.provider ?? 'None' },
        { label: 'Normalization method', value: 'ECMAScript Intl IANA offset search with local-time round-trip validation' },
    ];
    if (blockingLimitations.length > 0 || !dateParts || !timeParts || !timeZone) {
        return blocked(input, timeZone, limitations, baseTrace, effectiveBirthTime, birthTimePrecision);
    }
    const requested = { ...dateParts, ...timeParts };
    const utcCandidates = utcCandidatesForLocalTime(requested, timeZone);
    if (utcCandidates.length !== 1) {
        return blocked(input, timeZone, [utcCandidates.length === 0
                ? 'The local birth time is not valid in the supplied timezone or could not be normalized. Check daylight-saving transitions and source data.'
                : 'The local birth time is ambiguous in the supplied timezone because two UTC instants match it. A disambiguated source time is required.'], baseTrace, effectiveBirthTime, birthTimePrecision);
    }
    const [utcDate] = utcCandidates;
    const utcDateTime = utcDate.toISOString();
    const julianDate = utcDate.getTime() / 86_400_000 + 2_440_587.5;
    return {
        status: 'ready',
        localDate: input.birthDate,
        localTime: effectiveBirthTime,
        timeZone,
        utcDateTime,
        julianDate,
        birthTimePrecision,
        limitations,
        trace: [
            ...baseTrace,
            { label: 'UTC datetime', value: utcDateTime },
            { label: 'Julian date', value: julianDate.toFixed(8) },
        ],
    };
}
function blocked(input, timeZone, limitations, trace, effectiveBirthTime, birthTimePrecision) {
    return {
        status: 'blocked',
        localDate: input.birthDate,
        localTime: effectiveBirthTime,
        timeZone,
        utcDateTime: null,
        julianDate: null,
        birthTimePrecision,
        limitations,
        trace,
    };
}
/**
 * The UTC instants that bound a local civil day at a birth place: the first
 * instant the clock there reads `localDate` 00:00, and the last instant before
 * it reads the next date's 00:00 (so 23:59:59.999 on an ordinary day, and the
 * right hour on a daylight-saving day, which is 23 or 25 hours long). Uses the
 * same historical offset search as the birth moment itself. Where a zone
 * skipped midnight, the day starts at its first valid local minute. Null for an
 * invalid date or zone.
 */
export function localCivilDayUtcBounds(localDate, timeZone) {
    const date = parseDate(localDate);
    if (!date || !isValidTimeZone(timeZone))
        return null;
    const firstInstantOf = (parts) => {
        /* Midnight normally; a zone that jumped over it starts the day at its first valid minute. */
        for (let minute = 0; minute < 24 * 60; minute += 1) {
            const candidates = utcCandidatesForLocalTime({ ...parts, hour: Math.floor(minute / 60), minute: minute % 60 }, timeZone);
            if (candidates.length > 0)
                return candidates[0].getTime();
        }
        return null;
    };
    const next = new Date(Date.UTC(date.year, date.month - 1, date.day + 1));
    const startMs = firstInstantOf(date);
    const nextStartMs = firstInstantOf({ year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() });
    if (startMs === null || nextStartMs === null || nextStartMs <= startMs)
        return null;
    return { startMs, endMs: nextStartMs - 1 };
}
function utcCandidatesForLocalTime(parts, timeZone) {
    const localEpoch = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
    const offsets = new Set();
    try {
        for (let hour = -48; hour <= 48; hour += 6) {
            const sampleEpoch = localEpoch + hour * 3_600_000;
            const observed = zonedParts(new Date(sampleEpoch), timeZone);
            const observedEpoch = Date.UTC(observed.year, observed.month - 1, observed.day, observed.hour, observed.minute);
            offsets.add(observedEpoch - sampleEpoch);
        }
        const candidateEpochs = [...offsets]
            .map((offset) => localEpoch - offset)
            .filter((epoch) => sameParts(zonedParts(new Date(epoch), timeZone), parts));
        return [...new Set(candidateEpochs)].sort((left, right) => left - right).map((epoch) => new Date(epoch));
    }
    catch {
        return [];
    }
}
function zonedParts(date, timeZone) {
    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    });
    const values = Object.fromEntries(formatter.formatToParts(date)
        .filter((part) => part.type !== 'literal')
        .map((part) => [part.type, Number(part.value)]));
    return {
        year: values.year,
        month: values.month,
        day: values.day,
        hour: values.hour,
        minute: values.minute,
    };
}
function parseDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match)
        return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const check = new Date(Date.UTC(year, month - 1, day));
    if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day)
        return null;
    return { year, month, day };
}
function parseTime(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(value);
    if (!match)
        return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    return hour <= 23 && minute <= 59 ? { hour, minute } : null;
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
function sameParts(left, right) {
    return left.year === right.year
        && left.month === right.month
        && left.day === right.day
        && left.hour === right.hour
        && left.minute === right.minute;
}
