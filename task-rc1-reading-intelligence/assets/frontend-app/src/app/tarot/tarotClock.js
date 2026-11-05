/**
 * WHAT DAY IT IS, FOR A DRAW THAT HAPPENS ONCE A DAY.
 *
 * The daily spread belongs to a LOCAL CIVIL DATE, not to a UTC one. A reader in
 * Bratislava who opens the app at 00:30 has started a new day; the UTC date
 * says it is still yesterday and would hand them the previous spread. So every
 * date in this engine is the date on the reader's own wall.
 *
 * WHY A CLOCK OBJECT AND NOT `new Date()`. The daily policy has to be tested
 * across midnight, across month and year ends, across a leap day, across both
 * DST transitions, and across a device whose clock or zone moved backwards.
 * None of that is testable if the current time is read from the platform in the
 * middle of the logic, so time enters the engine through one injected object
 * and nowhere else.
 *
 * DST IS THE PLATFORM'S JOB AND THAT IS DELIBERATE. A local civil date is read
 * off a Date with getFullYear/getMonth/getDate, which apply the zone's own
 * rules. A day containing a transition is 23 or 25 hours long, and the civil
 * date still rolls exactly once, at local midnight. Arithmetic on epoch
 * milliseconds - "add 86,400,000 for tomorrow" - is what gets this wrong, so
 * there is none here.
 */
const pad = (value) => String(value).padStart(2, '0');
/**
 * 'YYYY-MM-DD' for an instant, in whatever zone the host is running in.
 *
 * The format is chosen so that dates compare correctly as plain strings:
 * fixed-width, most significant first, so `a < b` is chronological and the
 * policy never has to re-parse a date to find out which came first.
 */
export function localCivilDate(at) {
    const date = new Date(at);
    if (Number.isNaN(date.getTime())) {
        throw new RangeError(`Cannot read a civil date from ${at}.`);
    }
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
/** True for a well-formed 'YYYY-MM-DD' that names a real calendar day. */
export function isCivilDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
        return false;
    const [year, month, day] = value.split('-').map(Number);
    if (month < 1 || month > 12 || day < 1 || day > 31)
        return false;
    /* Reject 31 April and 30 February by construction: build the date in local
       time and check it did not roll forward into the next month. */
    const built = new Date(year, month - 1, day);
    return built.getFullYear() === year && built.getMonth() === month - 1 && built.getDate() === day;
}
function hostTimeZone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    }
    catch {
        /* Some locked-down environments have no Intl data at all. The zone is
           context for a later reader, never something the policy depends on, so
           its absence is simply recorded as absent. */
        return '';
    }
}
/** The production clock: the device's own time and zone. */
export const systemTarotClock = {
    now: () => Date.now(),
    localDate: (at) => localCivilDate(at),
    timeZone: () => hostTimeZone(),
};
/**
 * A clock pinned to one instant and zone label.
 *
 * Exported because the tests and the audit script need to stand at 23:59, step
 * over midnight, cross a DST boundary and move backwards. It is not a way to
 * make production deterministic: production uses `systemTarotClock`, and
 * nothing in the engine constructs one of these.
 */
export function fixedTarotClock(at, timeZone = 'UTC') {
    let current = at;
    let zone = timeZone;
    return {
        now: () => current,
        localDate: (instant) => localCivilDate(instant),
        timeZone: () => zone,
        setNow: (next) => { current = next; },
        setTimeZone: (next) => { zone = next; },
    };
}
