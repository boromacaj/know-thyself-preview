/*
 * IS THIS A TIMEZONE THE RUNTIME KNOWS?
 *
 * A birthplace is committed to the profile only with a timezone, and every birth-moment pillar is derived from it. The
 * Google resolver already checks what it receives; this is the same check for what comes back from a device (a stored
 * profile that was edited by hand, truncated, or written by an older build) and for what a profile is about to be built from,
 * so a name that merely looks like a zone never reaches an engine as one.
 */
export function isValidIanaTimeZone(value) {
    if (typeof value !== 'string' || value.trim().length === 0)
        return false;
    try {
        new Intl.DateTimeFormat('en', { timeZone: value.trim() }).format();
        return true;
    }
    catch {
        return false;
    }
}
