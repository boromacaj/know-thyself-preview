import { isBirthTimePrecision } from '../../birthTimePrecision.js?v=53c0693';
import { adaptPremiumProfile } from '../../premium-earth/premiumProfileAdapter.js?v=53c0693';
/**
 * WHAT CONNECTIONS KEEPS, WHERE, AND FOR HOW LONG.
 *
 * Connections adds NO account, NO server and NO shared store. The only people it ever holds are those the user typed in, and they live in the browser of the device they were
 * typed on, in one of two places the user chooses per person:
 *
 *   session   `sessionStorage`: survives a refresh, is gone when the tab or the browser is closed. THE DEFAULT. This is where anyone is kept unless the user asks otherwise,
 *             and it is the only place a child is ever kept without an explicit choice.
 *   device    `localStorage`: stays until the user removes the person. Offered as "keep on this device" on each person, never preselected.
 *
 * Birth names are held because the Numerology engine reads them; they are never shown (the screens show the short label the user chose). No free text about a relationship is
 * stored anywhere: the observed context is a closed set of codes (connectionsTypes.ts), the roles are a choice, and the flow records which people were chosen and nothing else.
 *
 * DELETION. `removePerson` deletes one person from both places and from every flow that used them; `forgetEverything` deletes every Connections key in both places. Both are one
 * tap in the screen ("Remove" on a person; "Forget everything Connections holds" at the foot of the first screen). The owner's own profile is not Connections' to keep or
 * delete: it is the application's, read through the profile bridge and never copied.
 *
 * A stored record that cannot be read as it was written is dropped, not repaired: the store never guesses at a birth date.
 */
export const PEOPLE_KEY = 'knowthyself.connections.people';
export const SESSION_KEY = 'knowthyself.connections.session';
export const STORE_VERSION = 1;
const safeStorage = (get) => {
    try {
        const storage = get();
        const probe = '__kt_probe__';
        storage.setItem(probe, '1');
        storage.removeItem(probe);
        return storage;
    }
    catch {
        return null;
    }
};
export const browserStorages = () => ({
    session: safeStorage(() => window.sessionStorage),
    device: safeStorage(() => window.localStorage),
});
/* ----------------------------------------------------------------- reading -- */
const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);
const LABEL_LIMIT = 40;
/** A date that exists on the calendar, not just one shaped like it. */
const isCalendarDate = (value) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!m)
        return false;
    const probe = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
    return probe.getUTCFullYear() === Number(m[1]) && probe.getUTCMonth() === Number(m[2]) - 1 && probe.getUTCDate() === Number(m[3]);
};
const cleanLabel = (value) => (isString(value) ? value.replace(/\s+/g, ' ').trim().slice(0, LABEL_LIMIT) : '');
function readPerson(value, retention) {
    if (!value || typeof value !== 'object')
        return null;
    const v = value;
    const selection = v.placeSelection;
    const candidate = selection?.candidate;
    if (!isString(v.id) || !/^[a-z0-9-]{4,40}$/.test(v.id))
        return null;
    const label = cleanLabel(v.label);
    if (!label || !isString(v.birthName) || !isString(v.birthSurname) || !isString(v.birthDate) || !isCalendarDate(v.birthDate))
        return null;
    if (!isString(v.birthTime) || (v.birthTime !== '' && !/^\d{2}:\d{2}$/.test(v.birthTime)))
        return null;
    if (!isBirthTimePrecision(v.birthTimePrecision))
        return null;
    if (!candidate || !isString(candidate.label) || !isNumber(candidate.latitude) || !isNumber(candidate.longitude) || !isString(selection?.timeZone))
        return null;
    return {
        id: v.id, label, retention, birthName: v.birthName, birthSurname: v.birthSurname, birthDate: v.birthDate, birthTime: v.birthTime,
        birthTimePrecision: v.birthTimePrecision, placeQuery: isString(v.placeQuery) ? v.placeQuery : candidate.label, placeSelection: selection,
    };
}
function parse(storage, key) {
    if (!storage)
        return null;
    try {
        const raw = storage.getItem(key);
        if (!raw)
            return null;
        const parsed = JSON.parse(raw);
        return parsed && parsed.version === STORE_VERSION ? parsed : null;
    }
    catch {
        return null;
    }
}
const peopleIn = (storage, key, retention) => {
    const parsed = parse(storage, key);
    return (parsed?.people ?? []).map((entry) => readPerson(entry, retention)).filter((person) => person !== null);
};
/** Everyone held, in a stable order (by label, then id). A person in both places is the device copy. */
export function readPeople(storages) {
    const byId = new Map();
    for (const person of peopleIn(storages.session, SESSION_KEY, 'session'))
        byId.set(person.id, person);
    for (const person of peopleIn(storages.device, PEOPLE_KEY, 'device'))
        byId.set(person.id, person);
    return [...byId.values()].sort((a, b) => a.label.localeCompare(b.label) || (a.id < b.id ? -1 : 1));
}
function writePeople(storage, key, people) {
    if (!storage)
        return false;
    try {
        if (people.length === 0) {
            storage.removeItem(key);
            return true;
        }
        storage.setItem(key, JSON.stringify({ version: STORE_VERSION, people }));
        return true;
    }
    catch {
        return false;
    }
}
export function savePerson(storages, person) {
    const target = person.retention === 'device' ? storages.device : storages.session;
    const key = person.retention === 'device' ? PEOPLE_KEY : SESSION_KEY;
    const existing = peopleIn(target, key, person.retention).filter((entry) => entry.id !== person.id);
    /* Moving between places: the other copy goes, so a person is never in both. */
    const otherStorage = person.retention === 'device' ? storages.session : storages.device;
    const otherKey = person.retention === 'device' ? SESSION_KEY : PEOPLE_KEY;
    const otherRetention = person.retention === 'device' ? 'session' : 'device';
    writePeople(otherStorage, otherKey, peopleIn(otherStorage, otherKey, otherRetention).filter((entry) => entry.id !== person.id));
    return writePeople(target, key, [...existing, person]);
}
export function removePerson(storages, id) {
    writePeople(storages.session, SESSION_KEY, peopleIn(storages.session, SESSION_KEY, 'session').filter((entry) => entry.id !== id));
    writePeople(storages.device, PEOPLE_KEY, peopleIn(storages.device, PEOPLE_KEY, 'device').filter((entry) => entry.id !== id));
}
/** Delete every Connections key in both places. Nothing else is touched. */
export function forgetEverything(storages) {
    for (const [storage, keys] of [[storages.session, [SESSION_KEY, FLOW_KEY]], [storages.device, [PEOPLE_KEY]]]) {
        if (!storage)
            continue;
        for (const key of keys) {
            try {
                storage.removeItem(key);
            }
            catch { /* nothing to do */ }
        }
    }
}
/* -------------------------------------------------------------------- flow -- */
export const FLOW_KEY = 'knowthyself.connections.flow';
/** A fresh opaque id: not derived from anything about the person. */
export function newPersonId(random = Math.random) {
    let id = 'p-';
    while (id.length < 14)
        id += Math.floor(random() * 36).toString(36);
    return id;
}
export const readFlowRecord = (storages) => parse(storages.session, FLOW_KEY);
export function writeFlowRecord(storages, flow) {
    if (!storages.session)
        return;
    try {
        storages.session.setItem(FLOW_KEY, JSON.stringify({ version: STORE_VERSION, flow }));
    }
    catch { /* a full or blocked store only costs the restore */ }
}
/* ------------------------------------------------------------ to the engine -- */
/** The engine's input for a stored person, through the application's own adapter. Null when it cannot be run without inventing something. */
export function profileInputOf(person) {
    const profile = {
        vessel: 'undefined',
        birthName: person.birthName,
        birthSurname: person.birthSurname,
        birthDate: person.birthDate,
        birthTime: person.birthTime,
        birthTimePrecision: person.birthTimePrecision,
        placeQuery: person.placeQuery,
        placeSelection: person.placeSelection,
    };
    const adapted = adaptPremiumProfile(profile);
    return adapted.ready ? adapted.input : null;
}
