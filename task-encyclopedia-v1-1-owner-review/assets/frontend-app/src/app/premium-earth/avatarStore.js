/*
 * THE PROFILE PHOTO, AND WHY IT IS NOT IN THE PROFILE RECORD.
 *
 * `knowthyself.profile` is the deterministic birth data: about eight hundred
 * bytes of name, date, time and place, read once at startup and handed straight
 * to the engines. Everything in it is an input to a calculation, and the reason
 * it is small and boring is that it is re-read on every load and must never be
 * the thing that fails.
 *
 * A photo is none of that. It is tens of kilobytes, it changes nothing anyone
 * computes, and a browser that refuses to store it should still produce a
 * chart. Putting it in the same record would mean a full quota - which an image
 * can cause on its own - taking the birth data down with it, and every profile
 * read paying to parse a data URL nothing was going to look at.
 *
 * So: its own key, its own record, its own failure mode. Losing the photo
 * costs a photo.
 *
 * IT NEVER LEAVES THE DEVICE. No upload, no third party, no account. The file
 * is read locally, drawn into a canvas and kept as a data URL in localStorage,
 * exactly like the locale and the theme. A picture of somebody's face is not a
 * thing to send anywhere to solve an avatar.
 */
/** Bumped only when a stored record can no longer be read by this code. */
export const AVATAR_SCHEMA_VERSION = 1;
/** Its own key, namespaced beside the profile rather than inside it. */
export const AVATAR_STORAGE_KEY = 'knowthyself.avatar';
/**
 * The square the photo is reduced to before it is stored.
 *
 * The avatar renders at 30px and the largest place it could ever appear is the
 * profile sheet at about 64. 256 covers a 3x display with room to spare, and
 * takes a 4MB phone photograph down to something in the tens of kilobytes -
 * which is the difference between a record that always stores and one that
 * sometimes blows the quota.
 */
export const AVATAR_PIXELS = 256;
/** Above this the record is refused rather than written. */
export const AVATAR_MAX_BYTES = 512 * 1024;
const defaultStorage = () => {
    try {
        const storage = globalThis.localStorage;
        if (!storage)
            return null;
        const probe = `${AVATAR_STORAGE_KEY}.probe`;
        storage.setItem(probe, '1');
        storage.removeItem(probe);
        return storage;
    }
    catch {
        return null;
    }
};
const isDataUrl = (value) => (typeof value === 'string' && /^data:image\/[a-z+.-]+;base64,[A-Za-z0-9+/=]+$/.test(value));
/**
 * The stored photo, or null for every reason there is not to have one.
 *
 * A record that cannot be read is REMOVED as well as ignored, so a device that
 * once held a broken value does not re-parse it on every start. Same rule the
 * profile record follows, for the same reason.
 */
export function readStoredAvatar(storage = defaultStorage()) {
    if (!storage)
        return null;
    let raw = null;
    try {
        raw = storage.getItem(AVATAR_STORAGE_KEY);
    }
    catch {
        return null;
    }
    if (!raw)
        return null;
    let parsed = null;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        clearStoredAvatar(storage);
        return null;
    }
    if (!parsed || typeof parsed !== 'object') {
        clearStoredAvatar(storage);
        return null;
    }
    const record = parsed;
    /* An unknown version is discarded rather than guessed at - there is one
       schema, and a photo is the cheapest thing in the product to ask for again. */
    if (record.schemaVersion !== AVATAR_SCHEMA_VERSION || !isDataUrl(record.dataUrl)) {
        clearStoredAvatar(storage);
        return null;
    }
    return record.dataUrl;
}
/** Writes the photo. False when it could not be stored, which is not an error. */
export function writeStoredAvatar(dataUrl, storage = defaultStorage()) {
    if (!storage)
        return false;
    if (!isDataUrl(dataUrl))
        return false;
    if (dataUrl.length > AVATAR_MAX_BYTES)
        return false;
    const record = {
        schemaVersion: AVATAR_SCHEMA_VERSION,
        dataUrl,
        savedAt: new Date().toISOString(),
    };
    try {
        storage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(record));
        return true;
    }
    catch {
        /* A full quota is not something the reader can act on, and the session in
           front of them still works - the photo simply will not survive a reload. */
        return false;
    }
}
export function clearStoredAvatar(storage = defaultStorage()) {
    if (!storage)
        return;
    try {
        storage.removeItem(AVATAR_STORAGE_KEY);
    }
    catch {
        /* Nothing further to try, and nothing the reader needs told. */
    }
}
/**
 * The reader-facing form of a birthplace.
 *
 * A geocoded pick can come back as a doorstep: "SNP 2103/19, 934 01 Levice,
 * Slovensko". The coordinates behind it are what the engines need and they stay
 * exactly as they are - but a street number and a postcode have no business on
 * a profile screen, and the engines are the only thing that ever wanted them.
 * What a person recognises as where they were born is the town and the country.
 *
 * POSITION DECIDES, NOT SHAPE - and that is the whole difficulty.
 * "934 01 Levice" and "1600 Pennsylvania Avenue NW" both open with a number and
 * are not remotely the same thing: one is a postcode in front of a town, the
 * other is a house in front of a street. Stripping the leading digits from both
 * (which is what this did at first) turns the second into "Pennsylvania Avenue
 * NW" and prints it as somebody's birthplace.
 *
 * What separates them is where they sit. A geocoded address is ordered
 * street, [postcode] locality, [region,] country - so with three parts or more
 * the FIRST one is the street line whenever it carries a number, and it goes
 * before anything else is considered. With only two parts there is no street
 * line to drop and the leading digits really are a postcode.
 *
 * `country` is passed separately because the candidate records it on its own,
 * and a structured field beats parsing a string whenever one exists.
 */
export function localityOf(label, country) {
    const parts = label.split(',').map((part) => part.trim()).filter((part) => part.length > 0);
    /* The street line, dropped whole - never mined for a town. */
    const withoutStreet = parts.length >= 3 && /\d/.test(parts[0]) ? parts.slice(1) : parts;
    const cleaned = withoutStreet
        .map((part) => part
        /* A postcode in front of the town: "934 01 Levice", "1100-053 Lisboa". */
        .replace(/^[0-9][0-9\s-]{2,9}\s+/, '')
        /* Or behind it, which is how the UK and a few others write one. */
        .replace(/\s+[A-Z]{1,2}[0-9][0-9A-Z]?\s+[0-9][A-Z]{2}$/i, '')
        .replace(/\s+[0-9][0-9\s-]{2,9}$/, '')
        .trim())
        .filter((part) => part.length > 0 && !/\d/.test(part));
    const named = country?.trim() ?? '';
    if (cleaned.length === 0)
        return named;
    const locality = cleaned[0];
    const tail = named || (cleaned.length > 1 ? cleaned[cleaned.length - 1] : '');
    if (!tail || tail === locality)
        return locality;
    return `${locality}, ${tail}`;
}
