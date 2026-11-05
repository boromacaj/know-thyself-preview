/*
 * WHERE THE CLAIMS IN THIS CORPUS COME FROM.
 * ==========================================
 *
 * An honest account, not a bibliography that flatters the dataset.
 *
 * Almost everything here is tier `curated`: written for this project by
 * summarising the mainstream reading found across standard onomastic reference
 * material, rather than transcribed from one citable edition with page numbers.
 * That is a real limitation and it is recorded in the data rather than hidden
 * behind a confident tone. A future pass that checks entries against a named
 * edition can upgrade individual records to `reference-work` one at a time,
 * which is exactly why the tier lives per-source instead of being assumed.
 *
 * WHAT PROVENANCE IS FOR HERE
 * Not for display. It is so that when a claim is later found to be wrong, it is
 * possible to ask "what else rests on the same source?" and get a list, instead
 * of re-checking the whole corpus by hand.
 *
 * WHAT IS DELIBERATELY ABSENT
 * No baby-name website is a source in this registry, and none was used. Those
 * sites are the single largest supply of confident invented etymology in
 * existence, and a layer whose entire justification is epistemic honesty cannot
 * be built on them.
 */
export const GIVEN_NAME_PROVENANCE = [
    {
        id: 'onomastic-consensus',
        label: 'Mainstream onomastic consensus',
        tier: 'scholarly-consensus',
        detail: {
            en: 'The derivation given consistently across standard name-etymology reference works. Used where the reading is not seriously contested.',
            sk: 'Odvodenie, ktoré sa zhodne uvádza v štandardných príručkách o pôvode mien. Používa sa tam, kde výklad nie je vážne sporný.',
        },
    },
    {
        id: 'biblical-onomastics',
        label: 'Hebrew and Greek biblical onomastics',
        tier: 'scholarly-consensus',
        detail: {
            en: 'Derivations of scriptural names from their Hebrew, Aramaic or Greek forms, as established in biblical name scholarship.',
            sk: 'Odvodenie biblických mien z hebrejských, aramejských alebo gréckych podôb, tak ako ich ustálilo bádanie o biblických menách.',
        },
    },
    {
        id: 'slavic-onomastics',
        label: 'Slavic onomastic scholarship',
        tier: 'scholarly-consensus',
        detail: {
            en: 'Reconstruction of Slavic compound names from Proto-Slavic roots. Reconstructed forms are marked as such and are not attested spellings.',
            sk: 'Rekonštrukcia slovanských zložených mien z praslovanských koreňov. Rekonštruované podoby sú označené a nejde o doložené zápisy.',
        },
    },
    {
        id: 'germanic-onomastics',
        label: 'Germanic onomastic scholarship',
        tier: 'scholarly-consensus',
        detail: {
            en: 'Reconstruction of Germanic compound names from Proto-Germanic and Old High German elements.',
            sk: 'Rekonštrukcia germánskych zložených mien z praslovanských a starohornonemeckých prvkov.',
        },
    },
    {
        id: 'classical-onomastics',
        label: 'Greek and Latin onomastics',
        tier: 'scholarly-consensus',
        detail: {
            en: 'Derivations from attested Ancient Greek and Latin vocabulary, including Roman cognomina and gens names.',
            sk: 'Odvodenie z doloženej starogréckej a latinskej slovnej zásoby vrátane rímskych cognomin a rodových mien.',
        },
    },
    {
        id: 'contested-etymology',
        label: 'Contested etymology',
        tier: 'curated',
        detail: {
            en: 'A proposal on which scholarship is genuinely divided. Recorded so the disagreement itself can be shown, never as a settled answer.',
            sk: 'Návrh, na ktorom sa bádanie nezhoduje. Zaznamenaný preto, aby bolo možné ukázať samotný nesúlad, nikdy nie ako hotová odpoveď.',
        },
    },
    {
        id: 'curated-summary',
        label: 'Curated KNOW THYSELF summary',
        tier: 'curated',
        detail: {
            en: 'Explanatory prose written for this project, summarising the sources above. The weakest tier: useful, but not a citation.',
            sk: 'Vysvetľujúci text napísaný pre tento projekt, ktorý zhŕňa vyššie uvedené zdroje. Najslabšia úroveň: užitočná, ale nie citácia.',
        },
    },
    {
        id: 'sk-civil-calendar',
        label: 'Slovak civil name-day calendar',
        tier: 'national-calendar',
        detail: {
            en: 'The name-day calendar in general civil use in Slovakia, as printed in diaries and shown by consumer calendars.',
            sk: 'Kalendár menín bežne používaný na Slovensku, ako ho tlačia diáre a zobrazujú spotrebiteľské kalendáre.',
        },
    },
    {
        id: 'enwiki-sk-namedays',
        label: 'English Wikipedia, Name days in Slovakia',
        tier: 'curated',
        detail: {
            en: 'A secondary compilation, used as ONE cross-check among several and never alone. It is a long-term vandalism target: unreverted junk names sat on 10 February and 1 May for years, and a broken markup character silently emptied 27 March. Useful for corroboration, not authority.',
            sk: 'Sekundárna kompilácia, použitá ako JEDEN z viacerých kontrolných zdrojov, nikdy samostatne. Ide o dlhodobý terč vandalizmu: neopravené nezmyselné mená boli roky pri 10. februári a 1. máji a chybný znak v zápise potichu vyprázdnil 27. marec. Vhodné na potvrdenie, nie ako autorita.',
        },
    },
    {
        id: 'sk-web-calendars',
        label: 'Established Slovak calendar publications',
        tier: 'national-calendar',
        detail: {
            en: 'Slovak-language calendar references reproducing the Oficiálne kalendárium compiled by the Kalendárna komisia at the Ministry of Culture of the Slovak Republic, which is the body that actually sets the Slovak name-day calendar.',
            sk: 'Slovenské kalendárové zdroje reprodukujúce Oficiálne kalendárium, ktoré zostavuje Kalendárna komisia pri Ministerstve kultúry Slovenskej republiky - teda orgán, ktorý slovenský kalendár menín skutočne určuje.',
        },
    },
    {
        id: 'cz-civil-calendar',
        label: 'Czech civil name-day calendar',
        tier: 'national-calendar',
        detail: {
            en: 'The name-day calendar in general civil use in Czechia.',
            sk: 'Kalendár menín bežne používaný v Česku.',
        },
    },
    {
        id: 'pl-civil-calendar',
        label: 'Polish name-day calendar',
        tier: 'national-calendar',
        detail: {
            en: 'Polish imieniny dates in common civil use. Poland recognises several dates for many names; this dataset records commonly cited ones and is not exhaustive.',
            sk: 'Poľské dátumy imieniny v bežnom používaní. V Poľsku má veľa mien viacero uznávaných dátumov; tento súbor uvádza bežne citované a nie je vyčerpávajúci.',
        },
    },
    {
        id: 'hu-civil-calendar',
        label: 'Hungarian name-day calendar',
        tier: 'national-calendar',
        detail: {
            en: 'Hungarian névnap dates in common civil use.',
            sk: 'Maďarské dátumy névnap v bežnom používaní.',
        },
    },
];
const BY_ID = new Map(GIVEN_NAME_PROVENANCE.map((source) => [source.id, source]));
export function provenanceSource(id) {
    return BY_ID.get(id) ?? null;
}
export function isProvenanceId(id) {
    return BY_ID.has(id);
}
