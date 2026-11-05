/*
 * NAMES OF LANGUAGES.
 *
 * Records store a `LanguageKey`; a reader is shown a label in their own
 * language. Kept here rather than in the UI dictionary because these are
 * reference vocabulary belonging to the knowledge layer - the same words a
 * record's prose uses - rather than chrome, and because a language name is
 * needed by anything that renders a derivation, including code paths that have
 * no business importing the UI strings.
 *
 * The Slovak forms are the ordinary Slovak names for these languages, in the
 * nominative. Where a derivation sentence needs another case the composer
 * builds the sentence around the label rather than inflecting it, because
 * inflecting a table entry by rule is how a localisation starts producing
 * plausible-looking Slovak that no Slovak speaker would write.
 */
const LABELS = {
    'proto-slavic': { en: 'Proto-Slavic', sk: 'praslovanský' },
    'old-church-slavonic': { en: 'Old Church Slavonic', sk: 'staroslovienčina' },
    slavic: { en: 'Slavic', sk: 'slovanský' },
    slovak: { en: 'Slovak', sk: 'slovenčina' },
    czech: { en: 'Czech', sk: 'čeština' },
    polish: { en: 'Polish', sk: 'poľština' },
    russian: { en: 'Russian', sk: 'ruština' },
    bulgarian: { en: 'Bulgarian', sk: 'bulharčina' },
    'serbo-croatian': { en: 'Serbo-Croatian', sk: 'srbochorvátčina' },
    ukrainian: { en: 'Ukrainian', sk: 'ukrajinčina' },
    latin: { en: 'Latin', sk: 'latinčina' },
    'ancient-greek': { en: 'Ancient Greek', sk: 'starogréčtina' },
    'byzantine-greek': { en: 'Byzantine Greek', sk: 'byzantská gréčtina' },
    hebrew: { en: 'Hebrew', sk: 'hebrejčina' },
    aramaic: { en: 'Aramaic', sk: 'aramejčina' },
    arabic: { en: 'Arabic', sk: 'arabčina' },
    'proto-germanic': { en: 'Proto-Germanic', sk: 'pragermánsky' },
    'old-high-german': { en: 'Old High German', sk: 'stará horná nemčina' },
    'old-norse': { en: 'Old Norse', sk: 'stará nórčina' },
    'old-english': { en: 'Old English', sk: 'stará angličtina' },
    gothic: { en: 'Gothic', sk: 'gótčina' },
    german: { en: 'German', sk: 'nemčina' },
    english: { en: 'English', sk: 'angličtina' },
    french: { en: 'French', sk: 'francúzština' },
    italian: { en: 'Italian', sk: 'taliančina' },
    spanish: { en: 'Spanish', sk: 'španielčina' },
    portuguese: { en: 'Portuguese', sk: 'portugalčina' },
    'proto-celtic': { en: 'Proto-Celtic', sk: 'prakeltský' },
    'old-irish': { en: 'Old Irish', sk: 'stará írčina' },
    welsh: { en: 'Welsh', sk: 'waleština' },
    gaelic: { en: 'Gaelic', sk: 'gaelčina' },
    hungarian: { en: 'Hungarian', sk: 'maďarčina' },
    turkic: { en: 'Turkic', sk: 'turkické jazyky' },
    bulgar: { en: 'Bulgar', sk: 'jazyk Protobulharov' },
    persian: { en: 'Persian', sk: 'perzština' },
    sanskrit: { en: 'Sanskrit', sk: 'sanskrit' },
    'proto-indo-european': { en: 'Proto-Indo-European', sk: 'praindoeurópsky' },
    egyptian: { en: 'Egyptian', sk: 'egyptčina' },
    phoenician: { en: 'Phoenician', sk: 'feničtina' },
    basque: { en: 'Basque', sk: 'baskičtina' },
    finnish: { en: 'Finnish', sk: 'fínčina' },
    lithuanian: { en: 'Lithuanian', sk: 'litovčina' },
    romanian: { en: 'Romanian', sk: 'rumunčina' },
    albanian: { en: 'Albanian', sk: 'albánčina' },
    unknown: { en: 'an unidentified language', sk: 'neurčený jazyk' },
};
export function languageLabel(key, locale) {
    const entry = LABELS[key];
    if (!entry)
        return key;
    return (locale === 'sk' ? entry.sk : entry.en) ?? entry.en;
}
/** Every key in the table. Used by the coverage test. */
export const LANGUAGE_KEYS = Object.keys(LABELS);
