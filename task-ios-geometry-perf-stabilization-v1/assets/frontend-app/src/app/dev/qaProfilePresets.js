/*
 * Levice, exactly as the bundled gazetteer already records it
 * (localLocationSearchProvider.ts, id bundled-levice-sk). Reused rather than
 * retyped so a preset and a real search of the same town cannot disagree.
 */
const LEVICE = {
    label: 'Levice, Nitra Region, Slovakia',
    latitude: 48.2156,
    longitude: 18.6071,
    country: 'Slovakia',
    region: 'Nitra Region',
};
/*
 * Banská Bystrica. NOT in the bundled gazetteer; these are the only
 * coordinates for the town already present in the repository
 * (tests/frontendPremiumEarthPhaseA.test.mjs). City centre, not a hospital.
 */
const BANSKA_BYSTRICA = {
    label: 'Banská Bystrica, Slovakia',
    latitude: 48.7363,
    longitude: 19.1462,
    country: 'Slovakia',
    region: 'Banská Bystrica Region',
};
/*
 * Michaela's birthplace is taken directly from the owner-provided screenshot
 * of the resolved PLACE card, including the displayed coordinates and zone.
 */
const BRATISLAVA_RUZINOV = {
    label: 'Ružinovská 4810/6, 821 01 Bratislava-Ružinov, Slovakia',
    latitude: 48.1550,
    longitude: 17.1521,
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
const levice = place(LEVICE, 'Pôrodnica Levice');
/* Same town, same coordinates, same zone - but the fourth profile was given as
   the town rather than a hospital, so its row says the town. Naming a
   maternity hospital nobody supplied would be the invention the note above
   exists to avoid. */
const leviceTown = place(LEVICE, 'Levice, Slovakia');
const banskaBystrica = place(BANSKA_BYSTRICA, 'Pôrodnica Banská Bystrica');
const bratislavaRuzinov = place(BRATISLAVA_RUZINOV, 'Ružinovská 4810/6, 821 01 Bratislava-Ružinov, Slovakia');
export const QA_PROFILE_PRESETS = [
    {
        id: 'boris-macaj',
        menuLabel: 'Boris Máčaj · 1987',
        vessel: 'male',
        birthName: 'Boris',
        birthSurname: 'Máčaj',
        birthDate: '1987-08-28',
        birthTime: '12:05',
        birthTimePrecision: 'exact',
        placeQuery: levice.query,
        placeLabel: levice.label,
        placeMeta: levice.meta,
        placeSelection: levice.selection,
    },
    {
        id: 'pavlina-magnova',
        menuLabel: 'Pavlína Magnová · 2002',
        vessel: 'female',
        birthName: 'Pavlína',
        birthSurname: 'Magnová',
        birthDate: '2002-01-02',
        birthTime: '19:45',
        birthTimePrecision: 'exact',
        placeQuery: banskaBystrica.query,
        placeLabel: banskaBystrica.label,
        placeMeta: banskaBystrica.meta,
        placeSelection: banskaBystrica.selection,
    },
    {
        id: 'jozefina-macajova',
        menuLabel: 'Jozefína Máčajová · 1963',
        vessel: 'female',
        birthName: 'Jozefína',
        birthSurname: 'Máčajová',
        /* No time given. The empty string plus an explicit UNKNOWN is how the rest
           of the app says it - an unanswered time is the same empty string, which
           is exactly why the precision has to travel beside it. The engines
           calculate her chart from their 12:00 fallback; 12:00 is never written
           here. */
        birthDate: '1963-02-05',
        birthTime: '',
        birthTimePrecision: 'unknown',
        placeQuery: levice.query,
        placeLabel: levice.label,
        placeMeta: levice.meta,
        placeSelection: levice.selection,
    },
    {
        id: 'michaela-pinkavova',
        menuLabel: 'Michaela Pinkavová · 1993',
        vessel: 'female',
        birthName: 'Michaela',
        birthSurname: 'Pinkavová',
        birthDate: '1993-06-17',
        birthTime: '15:15',
        birthTimePrecision: 'exact',
        placeQuery: bratislavaRuzinov.query,
        placeLabel: bratislavaRuzinov.label,
        placeMeta: bratislavaRuzinov.meta,
        placeSelection: bratislavaRuzinov.selection,
    },
    {
        id: 'tomas-batovsky',
        menuLabel: 'Tomáš Bátovský · 1994',
        /*
         * NOT GUESSED FROM THE SURNAME, unlike the three above.
         *
         * Bátovský is a masculine form and the same inference would have produced
         * 'male' - but no body was given for this profile, and `undefined` is the
         * value the product already has for "deliberately not defined" rather than
         * a gap. It is also the one that matters: luckPillarDirection resolves the
         * Da Yun direction from Year Stem polarity AND the selected body, and
         * refuses when the body is undefined. This preset is therefore the only one
         * that reaches that refusal, which is worth being able to open in one tap.
         */
        vessel: 'undefined',
        birthName: 'Tomáš',
        birthSurname: 'Bátovský',
        birthDate: '1994-06-16',
        /*
         * A REAL 12:00, AND THE THIRD CERTAINTY STATE.
         *
         * This is the one preset whose time is APPROXIMATE: a supplied estimate,
         * not a recorded time and not an absence. All three states now have a
         * profile - exact (Boris, Pavlína), approximate (here), unknown (Jozefína) -
         * and this one is the case the other two cannot cover, because 12:00 is
         * also the value the engines fall back to when no time was given. An exact
         * 12:00, an approximate 12:00 and an unknown-time fallback 12:00 are three
         * different states that share one clock reading, and only the precision
         * beside it tells them apart.
         */
        birthTime: '12:00',
        birthTimePrecision: 'approximate',
        placeQuery: leviceTown.query,
        placeLabel: leviceTown.label,
        placeMeta: leviceTown.meta,
        placeSelection: leviceTown.selection,
    },
];
export function findQaProfilePreset(id) {
    return QA_PROFILE_PRESETS.find((preset) => preset.id === id) ?? null;
}
