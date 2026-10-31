import { PILLAR_GENITIVE, phaseLabel } from './vocabulary.js?v=b5ef5ed';
/*
 * BAZI / TCM LABELS.
 *
 * `Day Master` stays English: it is the name of the concept in every BaZi
 * source, and the reading glosses it in prose the first time it appears. The
 * pinyin stems and branches, the Chinese characters and `Yong Shen` stay too.
 * Everything that is merely an English word for a row does not.
 *
 * THE VOCABULARY IS NOT CHOSEN HERE
 * `pillar-reading/limitationText.ts` already ships Slovak for this pillar, and
 * the reading itself names the pillars through `uiStrings.ts`. Both were read
 * before this table was written, so the appendix says `Pilier hodiny`,
 * `nebeské kmene`, `pozemské vetvy`, `skrytý kmeň`, `piliere šťastia` and
 * `TČM` in the same words the sentences around them use. Two names for one
 * thing on one page is the failure this file exists to avoid, which is also why
 * `trace` is `záznam` here - that is what the astrology table calls it.
 *
 * WHAT STAYS ENGLISH, AND WHY THIS PILLAR HAS THE MOST OF IT
 * BaZi and Day Master; every pinyin stem and branch; the Chinese characters;
 * Yong Shen; `Ten God` as the name of the relation system; `Da Yun`; `Jie`,
 * `Li Chun` and the solar-term names; and the structure names a reader would
 * look up in any BaZi source - Six Harmony, Six Clash, Six Harm, Three Harmony,
 * Stem Combination, Stem Clash, the punishments, and `bureau`. A relationship
 * row like `Mao-You Six Clash` is pinyin plus one of those names and so has
 * nothing left to translate; where such a name sits next to an ordinary word,
 * the ordinary word is Slovak - `Skryté kmene vetvy dňa`, never `Day branch
 * hidden stems`.
 *
 * NO HEALTH VERDICTS
 * The TCM rows are traditional correspondence. `Day Master strength tendency`
 * is a tendency and stays one - `Tendencia sily Day Mastera`, never a word that
 * would read as a finding about a body.
 */
/** The four positions in the nominative, for rows that name them outright. */
const PILLAR_NOMINATIVE = {
    Year: 'Rok', Month: 'Mesiac', Day: 'Deň', Hour: 'Hodina',
};
export const BAZI_LABELS = {
    /* The glance strip, which reaches the reader through renderMark() rather than
       through the appendix. The animal itself is a value and is translated where
       the reading already names the animals; these are only the captions. */
    'Chinese zodiac': 'Čínske znamenie',
    'Year animal': 'Zviera roka',
    /* The BaZi hero's second circle: the element of the year. */
    Element: 'Živel',
    'Yin / Yang balance': 'Rovnováha Jin / Jang',
    'Day Master': 'Day Master',
    'Heavenly Stems': 'Nebeské kmene',
    'Earthly Branches': 'Pozemské vetvy',
    'Year pillar': 'Pilier roka',
    'Month pillar': 'Pilier mesiaca',
    'Day pillar': 'Pilier dňa',
    'Hour pillar': 'Pilier hodiny',
    'Active solar term': 'Aktívny solárny termín',
    'Seasonal context': 'Sezónny kontext',
    'True solar time': 'Pravý slnečný čas',
    'Civil clock time': 'Občiansky čas',
    'Effective local time': 'Efektívny miestny čas',
    /* The prose spells the polarity jin and jang; the rows follow it. The
       branch Yin in `Yin-Si-Shen` below is a different word and stays. */
    'Yin / Yang': 'Jin / Jang',
    Yin: 'Jin',
    Yang: 'Jang',
    'Drain score': 'Skóre odčerpania',
    'Support score': 'Skóre podpory',
    /* ------------------------------------------------------------------ *
     * GROUP TITLES
     * ------------------------------------------------------------------ */
    'Four Pillars': 'Štyri piliere',
    'Five Element and polarity counts': 'Počty piatich živlov a polarity',
    Warnings: 'Varovania',
    'Day Master strength (model-derived)': 'Sila Day Mastera (odvodená z modelu)',
    Relationships: 'Vzťahy',
    'Luck Pillars (Da Yun)': 'Piliere šťastia (Da Yun)',
    'TCM constitution': 'Konštitúcia podľa TČM',
    'BaZi calculation trace': 'Záznam výpočtu BaZi',
    'BaZi readiness trace': 'Záznam pripravenosti BaZi',
    /* ------------------------------------------------------------------ *
     * THE COUNTS
     *
     * The five phases themselves are a pattern below, because the engine also
     * writes them as bare one-word labels. `raw` is the count of what is VISIBLE
     * in the chart, before the hidden and seasonal layers are added, so it reads
     * as the count it is rather than as a claim about the whole chart.
     * ------------------------------------------------------------------ */
    'Five Elements': 'Päť živlov',
    'Five Elements (raw)': 'Päť živlov (hrubý počet)',
    'Element count rule': 'Pravidlo počítania živlov',
    'Seasonal governance': 'Sezónna vláda',
    /* ------------------------------------------------------------------ *
     * DAY MASTER STRENGTH
     *
     * A tendency from a versioned model, never a verdict: `tendencia`, and the
     * group heading keeps `odvodená z modelu` exactly as the limitation beside
     * it does. See limitationText.ts, which says in full that this is not a
     * Yong Shen determination.
     * ------------------------------------------------------------------ */
    'Day Master strength': 'Sila Day Mastera',
    'Day Master strength tendency': 'Tendencia sily Day Mastera',
    Tendency: 'Tendencia',
    'Model version': 'Verzia modelu',
    /* ------------------------------------------------------------------ *
     * RELATIONSHIPS AND LUCK PILLARS
     * ------------------------------------------------------------------ */
    'Relationships detected': 'Zistené vzťahy',
    'Luck Pillars': 'Piliere šťastia',
    /* The two named three-branch punishments. Both are structure names in the
       form every source lists them, pinyin trio included, so they stay English
       for the same reason `Mao-You Six Clash` does. */
    'Punishment of ungratefulness (Yin-Si-Shen)': 'Punishment of ungratefulness (Yin-Si-Shen)',
    'Punishment of relying on power (Chou-Xu-Wei)': 'Punishment of relying on power (Chou-Xu-Wei)',
    /* ------------------------------------------------------------------ *
     * TCM CONSTITUTION - traditional correspondence, nothing diagnostic
     * ------------------------------------------------------------------ */
    'TCM constitution (Day Master)': 'Konštitúcia podľa TČM (Day Master)',
    'Day Master correspondence': 'Súvzťažnosť Day Mastera',
    'Seasonal note': 'Sezónna poznámka',
    /* ------------------------------------------------------------------ *
     * TRUE SOLAR TIME
     *
     * Both Hour Pillars are named after the clock they were computed from, in
     * the same `Pilier hodiny` frame the four pillars use above.
     * ------------------------------------------------------------------ */
    'Longitude/meridian correction': 'Oprava na dĺžku a poludník',
    'Equation of Time': 'Časová rovnica',
    'Total correction': 'Celková oprava',
    'Total time correction': 'Celková časová oprava',
    'Civil-time Hour Pillar': 'Pilier hodiny podľa občianskeho času',
    'True-solar-time Hour Pillar': 'Pilier hodiny podľa pravého slnečného času',
    'Hour basis': 'Základ hodiny',
    /* ------------------------------------------------------------------ *
     * THE CALCULATION TRACE
     *
     * `Jie`, `Li Chun`, the solar-term names and the JDN formula are the
     * provenance this section exists to show and are not touched; the row that
     * holds each one is a name for a reader and reads in Slovak.
     * ------------------------------------------------------------------ */
    Frame: 'Rámec výpočtu',
    'UTC birth moment': 'Moment narodenia v UTC',
    'Sun apparent longitude': 'Zdanlivá dĺžka Slnka',
    'Li Chun boundary UTC': 'Hranica Li Chun v UTC',
    'BaZi solar year': 'Solárny rok BaZi',
    'Active month Jie': 'Aktívne Jie mesiaca',
    'Active Jie boundary UTC': 'Hranica aktívneho Jie v UTC',
    'Month index from Li Chun': 'Poradie mesiaca od Li Chun',
    'Gregorian Julian Day Number': 'Gregoriánske juliánske číslo dňa',
    'Day-cycle formula': 'Vzorec denného cyklu',
    'Day boundary convention': 'Konvencia hranice dňa',
    'Zi-hour convention': 'Konvencia hodiny Zi',
};
export const BAZI_PATTERNS = [
    /* The relationship rows name the two positions they join: `Year: Mao / Day:
       You`. The pinyin branch is the engine's and stays; the position word is
       ordinary and takes the nominative here, not the `roka` that `Pilier roka`
       wants. */
    [/^(Year|Month|Day|Hour): (\w+) \/ (Year|Month|Day|Hour): (\w+)$/, (m) => {
            const first = PILLAR_NOMINATIVE[m[1]];
            const second = PILLAR_NOMINATIVE[m[3]];
            return first && second ? `${first}: ${m[2]} / ${second}: ${m[4]}` : null;
        }],
    /* The five phases appear as bare field labels in the element counts. */
    [/^(Wood|Fire|Earth|Metal|Water)$/, (m) => phaseLabel(m[1])],
    [/^(Year|Month|Day|Hour) branch hidden stems$/, (m) => `Skryté kmene vetvy ${PILLAR_GENITIVE[m[1]]}`],
    [/^(Year|Month|Day|Hour) stem Ten God$/, (m) => `Ten God kmeňa ${PILLAR_GENITIVE[m[1]]}`],
    /* One hidden stem as its own row in the strength factors, named by the pinyin
       stem it contributes. Written before the plain stem/branch shape below so the
       longer label is never read as `Day branch` with a tail left over. */
    [/^(Year|Month|Day|Hour) branch hidden stem \(([A-Za-z]+)\)$/,
        (m) => `Skrytý kmeň vetvy ${PILLAR_GENITIVE[m[1]]} (${m[2]})`],
    /* `Day stem (Ji)`, `Day branch (Mao)` - every visible character of the chart,
       once per strength factor. The pinyin in the bracket is the engine's value
       and is carried through untouched. */
    [/^(Year|Month|Day|Hour) (stem|branch) \(([A-Za-z]+)\)$/, (m) => {
            const part = m[2] === 'stem' ? 'Kmeň' : 'Vetva';
            return `${part} ${PILLAR_GENITIVE[m[1]]} (${m[3]})`;
        }],
    /* The two Luck Pillar sequences. Direction is `dopredu / dozadu` because that
       is how the limitation naming the unresolved direction already says it. */
    [/^Forward #(\d+)$/, (m) => `Dopredu č. ${m[1]}`],
    [/^Reverse #(\d+)$/, (m) => `Dozadu č. ${m[1]}`],
    /* The TCM emphasis notes, numbered by the engine. */
    [/^Emphasis (\d+)$/, (m) => `Dôraz ${m[1]}`],
    /* The blocked-calculation trace lists the limitations it hit, numbered. */
    [/^Limitation (\d+)$/, (m) => `Obmedzenie ${m[1]}`],
    /*
     * A Three Harmony bureau is named after the phase it forms. `Three Harmony`
     * and `bureau` are what a reader looks the structure up under and stay; the
     * phase is a word this pillar says in Slovak everywhere else, so it is said in
     * Slovak here too - and in apposition (`bureau živlu Drevo`) rather than
     * substituted into the English frame. Returns null if the phase is not one of
     * the five, so a half-translated bureau cannot be produced.
     */
    [/^Three Harmony \(([A-Za-z]+) bureau\)$/, (m) => {
            const phase = phaseLabel(m[1]);
            return phase ? `Three Harmony (bureau živlu ${phase})` : null;
        }],
    /*
     * The branch and stem structures, deliberately unchanged.
     *
     * `Xu-Mao Six Harmony`, `Mao-You Six Clash`, `Ji-Jia Stem Combination`,
     * `Wu Self-Punishment`: every part is either a pinyin branch or stem, or the
     * name of the structure itself. There is no ordinary English word left to put
     * into Slovak, and inventing one would break agreement with the source the
     * reader would check this against. Matched explicitly rather than left to fall
     * through, so the coverage report shows them as a decision rather than as a
     * gap someone should close.
     */
    [/^[A-Za-z]+(?:-[A-Za-z]+)? (Six Harmony|Six Clash|Six Harm|Mutual Punishment|Self-Punishment|Stem Combination|Stem Clash)$/,
        (m) => m[0]],
];
