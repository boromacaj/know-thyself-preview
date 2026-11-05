/*
 * WHERE A PERSON IS LIKELY TO HAVE BEEN BORN, FROM WHAT THE APP ALREADY KNOWS OF THEM.
 *
 * "Levi" is a ski resort in Lapland, a suburb in Quebec, a street of American towns - and Levice, in Slovakia. Which of them is first is a
 * question about the person, and the only honest evidence the page has is the language they chose for the app and the language their
 * browser says they read. Those two become a short list of countries; between two places that match equally well, one in the list comes
 * first (openPlaceIndex.ts, rankOf). It never hides a place, never adds one, and is the same for the same language settings - so the
 * order is stable. No location is read from the device and nothing is sent anywhere.
 */
/** The countries a language is most likely to be a first language of, most likely first. A short table on purpose: a language not in it gives no preference. */
const COUNTRIES_OF_LANGUAGE = Object.freeze({
    sk: ['SK', 'CZ'],
    cs: ['CZ', 'SK'],
    pl: ['PL'],
    hu: ['HU', 'SK', 'RO'],
    de: ['DE', 'AT', 'CH'],
    uk: ['UA'],
});
/** The region of a BCP 47 tag ("sk-SK" -> "SK", "en-GB" -> "GB", "sk" -> null). */
function regionOf(tag) {
    const match = /^[a-z]{2,3}(?:-[A-Za-z]{4})?-([A-Za-z]{2})(?:-|$)/.exec(tag);
    return match ? match[1].toUpperCase() : null;
}
/**
 * `locale` is the language of the app; `browserLanguages` is navigator.languages. The app's language comes first (it is the person's
 * choice), then the regions of the browser's own languages, each once.
 */
export function preferredCountriesFor(locale, browserLanguages = []) {
    const found = [];
    const add = (country) => {
        if (country && !found.includes(country))
            found.push(country);
    };
    const language = locale.toLowerCase().split('-')[0];
    for (const country of COUNTRIES_OF_LANGUAGE[language] ?? [])
        add(country);
    add(regionOf(locale));
    for (const tag of browserLanguages.slice(0, 3)) {
        const region = regionOf(tag);
        /* a region the browser names is the evidence; only a bare language ("sk") falls back to the country it is mostly spoken in */
        if (region)
            add(region);
        else
            add((COUNTRIES_OF_LANGUAGE[tag.toLowerCase().split('-')[0]] ?? [])[0]);
    }
    return found;
}
