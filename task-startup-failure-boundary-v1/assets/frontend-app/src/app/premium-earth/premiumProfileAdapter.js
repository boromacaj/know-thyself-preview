import { birthTimeAnswer } from '../birthTimePrecision.js?v=2ea79e9';
import { isValidIanaTimeZone } from '../timezone/ianaTimeZone.js?v=2ea79e9';
const trimmed = (value) => (value ?? '').trim();
/*
 * WHAT THE BAZI ENGINE DOES WITH THE BODY, AND WHAT IT DOES NOT.
 *
 * The engine still publishes BOTH Luck Pillar directions and chooses neither,
 * because ProfileInput carries no body and no BaZi module reads one. That part
 * is unchanged and is still worth surfacing.
 *
 * What HAS changed since this note was written is the claim that nothing reads
 * the body at all. temporal-synthesis/luckPillarDirection.ts resolves the
 * direction from Year Stem polarity and the body selected at onboarding, and
 * the Forecast applies it - so the note may no longer say the selection goes
 * unused, only that BaZi's own output does not consume it.
 */
const VESSEL_NOT_CONSUMED_NOTE = 'The vessel selection is not part of ProfileInput, so the BaZi engine publishes both '
    + 'Luck Pillar directions as labelled alternatives rather than resolving one from it. '
    + 'The Forecast resolves the direction separately, from Year Stem polarity and the '
    + 'selected body.';
/**
 * Turns a committed onboarding profile into the engine's canonical ProfileInput.
 *
 * Missing data is reported, never substituted: an absent timezone or coordinate
 * produces `ready: false` rather than a plausible-looking guess, because the
 * astrology, BaZi and Human Design pillars all derive the birth moment from
 * those exact fields.
 */
export function adaptPremiumProfile(profile) {
    const givenNames = trimmed(profile.birthName);
    const birthSurname = trimmed(profile.birthSurname);
    const birthDate = trimmed(profile.birthDate);
    /* The time and its certainty resolve together, by the one rule: an unknown
       time is always empty, whatever was left in the field. */
    const { birthTime, birthTimePrecision } = birthTimeAnswer(profile.birthTime, profile.birthTimePrecision);
    const selection = profile.placeSelection;
    const candidate = selection?.candidate ?? null;
    const missing = [];
    if (givenNames.length === 0)
        missing.push('birthName');
    if (birthSurname.length === 0)
        missing.push('birthSurname');
    if (birthDate.length === 0)
        missing.push('birthDate');
    if (!candidate)
        missing.push('placeSelection');
    if (candidate && !Number.isFinite(candidate.latitude))
        missing.push('birthLatitude');
    if (candidate && !Number.isFinite(candidate.longitude))
        missing.push('birthLongitude');
    /* A zone that is only a string is not a zone: it would reach every birth-moment pillar as one. */
    if (!isValidIanaTimeZone(trimmed(selection?.timeZone)))
        missing.push('birthTimeZone');
    const notes = [VESSEL_NOT_CONSUMED_NOTE];
    /* Birth time is optional by design. The documented behaviour is a 12:00 local
       estimate for Western Astrology and Human Design, with the BaZi Hour Pillar
       left Unavailable - so its absence is a note, never a missing field. */
    if (birthTime.length === 0) {
        notes.push('No birth time: Western Astrology and Human Design use a 12:00 local estimate '
            + 'and are time-sensitive, and the BaZi Hour Pillar stays Unavailable.');
    }
    if (birthTimePrecision === 'approximate') {
        notes.push('Approximate birth time: the reader\'s closest estimate is used for every calculation, '
            + 'and time-sensitive results built on it are estimates.');
    }
    if (selection && selection.timeZoneConfidence && selection.timeZoneConfidence !== 'resolved') {
        notes.push(`Timezone confidence is "${selection.timeZoneConfidence}", so birth-moment pillars carry limitations.`);
    }
    if (missing.length > 0 || !candidate) {
        return { input: null, ready: false, missing, notes };
    }
    const fullName = [givenNames, birthSurname].filter((part) => part.length > 0).join(' ');
    const input = {
        fullName,
        givenNames,
        birthSurname,
        birthDate,
        birthTime,
        birthTimePrecision,
        // What the user typed; the resolved label is carried separately below.
        birthPlaceText: trimmed(profile.placeQuery) || candidate.label,
        birthLatitude: candidate.latitude,
        birthLongitude: candidate.longitude,
        birthLocationPrecision: candidate.precision,
        birthLocationSource: candidate.source,
        resolvedPlaceLabel: candidate.label,
        birthCountry: candidate.country,
        birthRegion: candidate.region,
        birthLocationProvider: candidate.provider,
        birthTimeZoneHint: candidate.timeZoneHint,
        birthTimeZoneHintSource: candidate.timeZoneHintSource,
        birthTimeZone: selection?.timeZone ?? null,
        birthTimeZoneSource: selection?.timeZoneSource ?? null,
        // The resolver's own verdict, never an assumption made here.
        birthTimeZoneConfidence: selection?.timeZoneConfidence ?? 'unavailable',
        birthTimeZoneLimitations: [...(selection?.timeZoneLimitations ?? [])],
    };
    return { input, ready: true, missing: [], notes };
}
