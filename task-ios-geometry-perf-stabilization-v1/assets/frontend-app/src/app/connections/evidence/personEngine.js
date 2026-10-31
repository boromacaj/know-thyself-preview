import { createProfileExperience } from '../../model.js?v=d9f39e7';
import { personEvidenceOf } from './personEvidence.js?v=d9f39e7';
import { pillarFactsOf } from './pillarFacts.js?v=d9f39e7';
/** FNV-1a over the fields the engines read. Names are in it because Numerology reads them; nothing here is ever shown or stored. */
export function fingerprintOf(input) {
    const text = [
        input.givenNames, input.birthSurname, input.birthDate, input.birthTime, input.birthTimePrecision ?? '',
        input.birthLatitude, input.birthLongitude, input.birthTimeZone ?? '',
    ].join('|');
    let hash = 0x811c9dc5;
    for (let i = 0; i < text.length; i += 1) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(16).padStart(8, '0');
}
const CACHE_LIMIT = 24;
const cache = new Map();
const remember = (computed) => {
    cache.delete(computed.fingerprint);
    cache.set(computed.fingerprint, computed);
    while (cache.size > CACHE_LIMIT)
        cache.delete(cache.keys().next().value);
    return computed;
};
export class PersonNotCalculable extends Error {
    reason;
    constructor(reason) {
        super(`Connections cannot read this person: ${reason}`);
        this.reason = reason;
        this.name = 'PersonNotCalculable';
    }
}
export function computedPersonFromExperience(experience) {
    const fingerprint = fingerprintOf(experience.input);
    const cached = cache.get(fingerprint);
    if (cached)
        return remember(cached);
    const source = experience.crossPillarReading?.source;
    if (!source)
        throw new PersonNotCalculable('no-synthesis');
    return remember({ fingerprint, evidence: personEvidenceOf(source), facts: pillarFactsOf(experience) });
}
export function computePerson(input) {
    const fingerprint = fingerprintOf(input);
    const cached = cache.get(fingerprint);
    if (cached)
        return remember(cached);
    let experience;
    try {
        experience = createProfileExperience(input);
    }
    catch {
        throw new PersonNotCalculable('engine-failed');
    }
    return computedPersonFromExperience(experience);
}
/** For tests and for "forget everything": drops every cached person. */
export const forgetComputedPeople = () => { cache.clear(); };
