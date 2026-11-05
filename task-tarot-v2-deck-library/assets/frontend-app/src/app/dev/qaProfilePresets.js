/*
 * Bratislava, exactly as the bundled gazetteer already records it
 * (localLocationSearchProvider.ts, id bundled-bratislava-sk). Reused rather than
 * retyped so a preset and a real search of the same town cannot disagree.
 */
const BRATISLAVA = {
    label: 'Bratislava, Bratislava Region, Slovakia',
    latitude: 48.1486,
    longitude: 17.1077,
    country: 'Slovakia',
    region: 'Bratislava Region',
};
/*
 * Košice. NOT in the bundled gazetteer; these are the only
 * coordinates for the town already present in the repository
 * (tests/frontendPremiumEarthPhaseA.test.mjs). City centre, not a hospital.
 */
const KOSICE = {
    label: 'Košice, Slovakia',
    latitude: 48.7164,
    longitude: 21.2611,
    country: 'Slovakia',
    region: 'Košice Region',
};
/*
 * Eva's birthplace is taken directly from the owner-provided screenshot
 * of the resolved PLACE card, including the displayed coordinates and zone.
 */
const BRATISLAVA_CENTRE = {
    label: 'Bratislava, Slovakia',
    latitude: 48.1486,
    longitude: 17.1077,
    country: 'Slovakia',
    region: 'Bratislava Region',
};
/*
 * Slovakia keeps one civil zone across the whole country, so naming it here is
 * a statement about the country rather than a guess about the town - which is
 * why the confidence is 'resolved'. The source string says a preset supplied
 * it, so the technical appendix never presents it as a lookup that happened.
 */
const SLOVAK_ZONE = 'Europe/Bratislava';
const PRESET_ZONE_SOURCE = 'qa-profile-preset';
function place(town, originLabel) {
    return {
        query: town.label,
        /* The hospital as given, with the town it resolves to, so a tester can see
           at a glance which coordinates are actually in play. */
        label: originLabel,
        meta: `${town.latitude.toFixed(4)}, ${town.longitude.toFixed(4)} · ${SLOVAK_ZONE}`,
        selection: {
            candidate: {
                label: town.label,
                latitude: town.latitude,
                longitude: town.longitude,
                country: town.country,
                region: town.region,
                provider: PRESET_ZONE_SOURCE,
                /* 'searched', not 'map-selected': these came from a place name, and the
                   precision field is what the appendix reports about how they arrived. */
                precision: 'searched',
                source: 'provider-search',
                timeZoneHint: SLOVAK_ZONE,
                timeZoneHintSource: PRESET_ZONE_SOURCE,
            },
            timeZone: SLOVAK_ZONE,
            timeZoneSource: PRESET_ZONE_SOURCE,
            timeZoneConfidence: 'resolved',
            timeZoneLimitations: [],
            /* The camera is already wherever the tester left it, and a preset is not
               a place selection they made - so it does not fly the planet. */
            moveCameraOnPresent: false,
        },
    };
}
const bratislava = place(BRATISLAVA, 'Bratislava');
/* Same town, same coordinates, same zone - but the fourth profile was given as
   the town rather than a hospital, so its row says the town. Naming a
   maternity hospital nobody supplied would be the invention the note above
   exists to avoid. */
const bratislavaTown = place(BRATISLAVA, 'Bratislava, Slovakia');
const kosice = place(KOSICE, 'Košice');
const bratislavaCentre = place(BRATISLAVA_CENTRE, 'Bratislava, Slovakia');
export const QA_PROFILE_PRESETS = [
    {
        id: 'alex-demo',
        menuLabel: 'Alex Demo · 1990',
        vessel: 'male',
        birthName: 'Alex',
        birthSurname: 'Demo',
        birthDate: '1990-03-14',
        birthTime: '12:05',
        birthTimePrecision: 'exact',
        placeQuery: bratislava.query,
        placeLabel: bratislava.label,
        placeMeta: bratislava.meta,
        placeSelection: bratislava.selection,
    },
    {
        id: 'petra-samplova',
        menuLabel: 'Petra Samplová · 2000',
        vessel: 'female',
        birthName: 'Petra',
        birthSurname: 'Samplová',
        birthDate: '2000-06-21',
        birthTime: '19:45',
        birthTimePrecision: 'exact',
        placeQuery: kosice.query,
        placeLabel: kosice.label,
        placeMeta: kosice.meta,
        placeSelection: kosice.selection,
    },
    {
        id: 'hana-demova',
        menuLabel: 'Hana Demová · 1965',
        vessel: 'female',
        birthName: 'Hana',
        birthSurname: 'Demová',
        /* No time given. The empty string plus an explicit UNKNOWN is how the rest
           of the app says it - an unanswered time is the same empty string, which
           is exactly why the precision has to travel beside it. The engines
           calculate her chart from their 12:00 fallback; 12:00 is never written
           here. */
        birthDate: '1965-11-09',
        birthTime: '',
        birthTimePrecision: 'unknown',
        placeQuery: bratislava.query,
        placeLabel: bratislava.label,
        placeMeta: bratislava.meta,
        placeSelection: bratislava.selection,
    },
    {
        id: 'eva-vzorova',
        menuLabel: 'Eva Vzorová · 1995',
        vessel: 'female',
        birthName: 'Eva',
        birthSurname: 'Vzorová',
        birthDate: '1995-02-11',
        birthTime: '15:15',
        birthTimePrecision: 'exact',
        placeQuery: bratislavaCentre.query,
        placeLabel: bratislavaCentre.label,
        placeMeta: bratislavaCentre.meta,
        placeSelection: bratislavaCentre.selection,
    },
    {
        id: 'marek-testovsky',
        menuLabel: 'Marek Testovský · 1992',
        /*
         * NOT GUESSED FROM THE SURNAME, unlike the three above.
         *
         * Testovský is a masculine form and the same inference would have produced
         * 'male' - but no body was given for this profile, and `undefined` is the
         * value the product already has for "deliberately not defined" rather than
         * a gap. It is also the one that matters: luckPillarDirection resolves the
         * Da Yun direction from Year Stem polarity AND the selected body, and
         * refuses when the body is undefined. This preset is therefore the only one
         * that reaches that refusal, which is worth being able to open in one tap.
         */
        vessel: 'undefined',
        birthName: 'Marek',
        birthSurname: 'Testovský',
        birthDate: '1992-09-03',
        /*
         * A REAL 12:00, AND THE THIRD CERTAINTY STATE.
         *
         * This is the one preset whose time is APPROXIMATE: a supplied estimate,
         * not a recorded time and not an absence. All three states now have a
         * profile - exact (Alex, Petra), approximate (here), unknown (Hana) -
         * and this one is the case the other two cannot cover, because 12:00 is
         * also the value the engines fall back to when no time was given. An exact
         * 12:00, an approximate 12:00 and an unknown-time fallback 12:00 are three
         * different states that share one clock reading, and only the precision
         * beside it tells them apart.
         */
        birthTime: '12:00',
        birthTimePrecision: 'approximate',
        placeQuery: bratislavaTown.query,
        placeLabel: bratislavaTown.label,
        placeMeta: bratislavaTown.meta,
        placeSelection: bratislavaTown.selection,
    },
];
export function findQaProfilePreset(id) {
    return QA_PROFILE_PRESETS.find((preset) => preset.id === id) ?? null;
}
