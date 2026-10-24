import { activeLocale } from '../i18n/locale.js';
/**
 * PLAIN-LANGUAGE NOTES FOR TECHNICAL FIELDS.
 *
 * One short sentence per field, saying what the field IS. Not what it means for
 * the reader - that is the reading, upstairs. Someone who opens Technical
 * Details has already decided they want the working; what they need is to be
 * able to tell an orb from a longitude without leaving the page.
 *
 * THE RULES THESE NOTES FOLLOW
 *
 *   One sentence. Two only where the field is genuinely two ideas.
 *   Define, never interpret. "The orb is the distance from exact" - not "a
 *     tight orb makes this aspect important in your life".
 *   No hedging scaffolding, no "may indicate", no symbolic claims.
 *   Silence is allowed. A field whose label already says it - "Status",
 *     "Engine" - gets nothing, because a note that adds no information is
 *     noise wearing a helpful expression.
 *
 * Keyed by the engine's own field label, matched case-insensitively, with a
 * prefix fallback so generated labels like "Aspect: Sun square Saturn" and
 * "House placement: Venus" resolve to the family note rather than to nothing.
 */
const EXACT = {
    /* ---------------------------------------------------------- numerology */
    'final number': 'The value this calculation reduces to after every step.',
    'final values': 'The values this calculation produced, before any are selected.',
    'reduction steps': 'Each stage of the digit-sum reduction, so the arithmetic can be checked.',
    'component values': 'The separate numbers that were combined to reach the result.',
    'master number preserved': 'Whether the reduction stopped at 11, 22 or 33 instead of continuing to a single digit.',
    'raw input': 'The exact text or date the calculation started from.',
    'normalized input': 'The input after case, spacing and punctuation were standardised.',
    'counting rule': 'Which letter-to-number scheme was used.',
    'present values': 'The numbers that do appear in the name.',
    'missing values': 'The numbers that do not appear in the name at all.',
    /* ----------------------------------------------------------- astrology */
    ascendant: 'The zodiac degree rising on the eastern horizon at the moment of birth. It sets the house structure.',
    midheaven: 'The highest point of the chart, marking the vocational axis.',
    'chart ruler': 'The planet that rules the rising sign.',
    'house system': 'The method used to divide the chart into twelve houses.',
    'angle source': 'The data the angles were computed from.',
    'angle and house structure': 'How the houses were derived from the angles.',
    'angles and houses': 'The calculated angles and the houses that follow from them.',
    'major aspects': 'The angular relationships between bodies that fell within the permitted orb.',
    'aspect structure': 'How the aspects were detected and which orbs were allowed.',
    orb: 'The distance between an aspect and its exact angle. A smaller orb is a tighter aspect.',
    'element balance': 'How the calculated placements distribute across fire, earth, air and water.',
    'modality balance': 'How the calculated placements distribute across cardinal, fixed and mutable.',
    'hemisphere balance': 'How many placements fall in each half of the chart. Requires houses, so it requires a birth time.',
    stelliums: 'Three or more bodies gathered in one sign or house.',
    'angular planets': 'Bodies close to one of the four chart angles.',
    'essential dignity': 'Whether a planet sits in a sign it rules, is exalted in, or is weakened in.',
    'retrograde bodies': 'Bodies that appeared to move backwards from Earth at this moment.',
    'retrograde planets': 'Bodies that appeared to move backwards from Earth at this moment.',
    'moon phase': 'The Sun-Moon angular relationship at birth, expressed as a phase of the lunar cycle.',
    'lunar phase context': 'The phase calculation and the angle it came from.',
    'chart emphasis': 'Where the chart concentrates: stelliums, angular bodies and dominant qualities.',
    elements: 'The count of placements in each of the four elements.',
    modalities: 'The count of placements in each of the three modalities.',
    /* ---------------------------------------------------------------- bazi */
    'day master': 'The Heavenly Stem of the day pillar. It is the reference point the whole chart is read against.',
    'day master strength': 'How well the rest of the chart supports the Day Master.',
    'day master structure': 'The stem, its phase and its polarity.',
    'day master correspondence': 'The traditional symbolic associations of the Day Master phase.',
    'support score': 'The engine’s count of chart factors that strengthen the Day Master.',
    'drain score': 'The engine’s count of chart factors that weaken or draw on the Day Master.',
    tendency: 'Whether the chart reads as strong, balanced or weak overall.',
    'five element distribution': 'How many times each of the five phases appears across the chart.',
    'hour pillar': 'The stem and branch for the birth hour. Left unavailable rather than guessed when the birth time is unknown.',
    'civil-time hour pillar': 'The hour pillar as given by ordinary clock time.',
    'true-solar-time hour pillar': 'The hour pillar as given by solar time at the birth longitude.',
    'true solar time': 'Clock time corrected for longitude and for the equation of time.',
    'civil clock time': 'The ordinary local clock time at the place of birth.',
    'equation of time': 'The difference between solar time and mean clock time on that date.',
    'longitude/meridian correction': 'The adjustment for how far the birth place sits from its time-zone meridian.',
    'total correction': 'The combined adjustment applied to reach true solar time.',
    'seasonal note': 'Which solar term the birth date falls in, and what that means for the month pillar.',
    'luck pillars': 'The ten-year periods the chart passes through. Da Yun.',
    direction: 'Whether the Luck Pillar sequence runs forward or in reverse.',
    relationships: 'The clashes, combinations, harms and punishments detected between branches.',
    'tcm constitution': 'Traditional symbolic correspondences only. Not a health assessment and not medical advice.',
    disclaimer: 'The scope limit that applies to the section above.',
    yin: 'How many yin stems and branches the chart contains.',
    yang: 'How many yang stems and branches the chart contains.',
    /* -------------------------------------------------------- human design */
    type: 'The energy mechanic the chart is built on, derived from which centres are defined.',
    strategy: 'The way of engaging that follows from the Type. It is not a separate calculation.',
    authority: 'The decision-making mechanism, determined by a fixed precedence over the defined centres.',
    profile: 'Two lines: the conscious personality line and the unconscious design line.',
    definition: 'How the defined centres group into connected networks.',
    'definition groups': 'Which centres fall into each connected group.',
    'defined centers': 'The centres with consistent, fixed energy.',
    'defined center pattern': 'Which of the nine centres are defined and which are open.',
    'defined channels': 'The complete gate-to-gate connections that define centres.',
    'activated gates': 'Every gate occupied by a planet in either activation.',
    'gate notation': 'How gate and line numbers are written.',
    'personality sun gate': 'The gate the Sun occupied at the moment of birth.',
    'personality earth gate': 'The gate opposite the Sun at the moment of birth.',
    'design sun gate': 'The gate the Sun occupied at the Design moment, about 88 days before birth.',
    'design earth gate': 'The gate opposite the Sun at the Design moment.',
    'personality utc': 'The birth moment in Coordinated Universal Time.',
    'design utc': 'The Design moment in Coordinated Universal Time.',
    'design offset days': 'How far before birth the Design moment fell, measured by exact solar arc rather than by a fixed count of days.',
    'motor-to-throat path': 'Whether a motor centre connects to the Throat, which is what separates a Manifestor and a Manifesting Generator from a Generator.',
    'bodygraph mechanics': 'The gates, channels and centre states the graph was drawn from.',
    'named cross title': 'The conventional name of the Incarnation Cross formed by the four Sun and Earth gates.',
    /* --------------------------------------------------------------- shared */
    frame: 'The reference frame the positions were computed in.',
    'model version': 'The version of the interpretation model that produced this reading.',
    warnings: 'Conditions the engine flagged while calculating.',
};
/** Generated labels share a prefix; match the family rather than every instance. */
const PREFIX = [
    ['aspect:', 'An angular relationship between two bodies, with the distance from exact.'],
    ['house placement:', 'Which of the twelve houses this body falls in.'],
    ['stellium:', 'Three or more bodies gathered in one sign or house.'],
    ['angular:', 'A body close to one of the four chart angles, which amplifies it.'],
    ['forward #', 'One ten-year Luck Pillar in the forward sequence.'],
    ['reverse #', 'One ten-year Luck Pillar in the reverse sequence.'],
    ['requirement ', 'Data this pillar needs before it can calculate.'],
    ['emphasis ', 'A symbolic correspondence note. Not a health statement.'],
];
/** Pillar-key suffixes: "Year pillar", "Month pillar", and so on. */
const PILLAR_POSITION = {
    year: 'The Year pillar. Traditionally read for ancestry, early environment and the outward social self.',
    month: 'The Month pillar. Traditionally read for upbringing, career and the seasonal conditions the chart grew in.',
    day: 'The Day pillar. Its stem is the Day Master; its branch is traditionally read for the self and close partnership.',
    hour: 'The Hour pillar. Traditionally read for later life, private ambition and what is passed on.',
};
/*
 * THE SAME NOTES IN SLOVAK.
 *
 * Keyed identically, because the key is the ENGINE'S OWN LABEL and the engine
 * does not change language. Only the explanation does. A key missing here falls
 * back to English per field rather than per section, so a partially translated
 * appendix reads as a Slovak appendix with a few English lines - not as an
 * English one.
 */
const EXACT_SK = {
    /* ---------------------------------------------------------- numerology */
    'final number': 'Hodnota, na ktorú sa tento výpočet zredukuje po všetkých krokoch.',
    'final values': 'Hodnoty, ktoré výpočet vydal, ešte pred výberom niektorej z nich.',
    'reduction steps': 'Každý krok sčítavania číslic, aby sa dal výpočet overiť.',
    'component values': 'Jednotlivé čísla, ktoré sa spojili do výsledku.',
    'master number preserved': 'Či sa redukcia zastavila na 11, 22 alebo 33 namiesto pokračovania na jednu číslicu.',
    'raw input': 'Presný text alebo dátum, z ktorého výpočet vychádzal.',
    'normalized input': 'Vstup po zjednotení veľkosti písmen, medzier a interpunkcie.',
    'counting rule': 'Ktorá schéma prevodu písmen na čísla sa použila.',
    'present values': 'Čísla, ktoré sa v mene vyskytujú.',
    'missing values': 'Čísla, ktoré sa v mene nevyskytujú vôbec.',
    /* ----------------------------------------------------------- astrology */
    ascendant: 'Stupeň zverokruhu, ktorý v okamihu narodenia vychádzal na východnom obzore. Určuje rozdelenie mapy na domy.',
    midheaven: 'Najvyšší bod mapy. Označuje os povolania a smerovania.',
    'chart ruler': 'Planéta, ktorá vládne vychádzajúcemu znameniu.',
    'house system': 'Metóda, ktorou sa mapa rozdelila na dvanásť domov.',
    'angle source': 'Údaje, z ktorých sa vypočítali hlavné osi mapy.',
    'angle and house structure': 'Ako sa domy odvodili z hlavných osí.',
    'angles and houses': 'Vypočítané osi mapy a domy, ktoré z nich vyplývajú.',
    'major aspects': 'Uhlové vzťahy medzi telesami, ktoré sa zmestili do povolenej odchýlky.',
    'aspect structure': 'Ako sa aspekty hľadali a aké odchýlky boli povolené.',
    orb: 'Vzdialenosť aspektu od presného uhla. Menší orb znamená tesnejší aspekt.',
    'element balance': 'Ako sa vypočítané postavenia rozdeľujú medzi oheň, zem, vzduch a vodu.',
    'modality balance': 'Ako sa vypočítané postavenia rozdeľujú medzi základné, pevné a premenlivé znamenia.',
    'hemisphere balance': 'Koľko postavení pripadá na každú polovicu mapy. Vyžaduje domy, teda aj čas narodenia.',
    stelliums: 'Tri alebo viac telies nahromadených v jednom znamení alebo dome.',
    'angular planets': 'Telesá blízko niektorej zo štyroch hlavných osí mapy.',
    'essential dignity': 'Či planéta stojí v znamení, ktorému vládne, v ktorom je povýšená, alebo v ktorom je oslabená.',
    'retrograde bodies': 'Telesá, ktoré sa v tomto okamihu javili zo Zeme ako pohybujúce sa dozadu.',
    'retrograde planets': 'Telesá, ktoré sa v tomto okamihu javili zo Zeme ako pohybujúce sa dozadu.',
    'moon phase': 'Uhlový vzťah Slnka a Mesiaca pri narodení, vyjadrený ako fáza lunárneho cyklu.',
    'lunar phase context': 'Výpočet fázy a uhol, z ktorého vychádza.',
    'chart emphasis': 'Kde sa mapa zahusťuje: nahromadenia, telesá pri osiach a prevládajúce kvality.',
    elements: 'Počet postavení v každom zo štyroch živlov.',
    modalities: 'Počet postavení v každej z troch kvalít.',
    /* ---------------------------------------------------------------- bazi */
    'day master': 'Nebeský kmeň denného piliera. Je to vzťažný bod, voči ktorému sa číta celá mapa.',
    'day master strength': 'Nakoľko zvyšok mapy podporuje Day Master.',
    'day master structure': 'Kmeň, jeho fáza a jeho polarita.',
    'day master correspondence': 'Tradičné symbolické priradenia k fáze Day Mastera.',
    'support score': 'Počet faktorov mapy, ktoré podľa výpočtu Day Master posilňujú.',
    'drain score': 'Počet faktorov mapy, ktoré podľa výpočtu Day Master oslabujú alebo z neho čerpajú.',
    tendency: 'Či mapa ako celok vychádza silná, vyvážená alebo slabá.',
    'five element distribution': 'Koľkokrát sa každý z piatich živlov v mape objavuje.',
    'hour pillar': 'Kmeň a vetva hodiny narodenia. Ak čas narodenia nie je známy, zostáva nedostupný a nedopĺňa sa odhadom.',
    'civil-time hour pillar': 'Hodinový pilier podľa bežného občianskeho času.',
    'true-solar-time hour pillar': 'Hodinový pilier podľa slnečného času na zemepisnej dĺžke narodenia.',
    'true solar time': 'Hodinový čas opravený o zemepisnú dĺžku a o časovú rovnicu.',
    'civil clock time': 'Bežný miestny občiansky čas v mieste narodenia.',
    'equation of time': 'Rozdiel medzi slnečným a stredným občianskym časom v daný deň.',
    'longitude/meridian correction': 'Oprava o to, ako ďaleko leží miesto narodenia od poludníka svojho časového pásma.',
    'total correction': 'Celková oprava použitá na získanie pravého slnečného času.',
    'seasonal note': 'Do ktorého slnečného termínu dátum narodenia spadá a čo to znamená pre mesačný pilier.',
    'luck pillars': 'Desaťročné obdobia, ktorými mapa prechádza. Da Yun.',
    direction: 'Či postupnosť pilierov šťastia beží dopredu alebo dozadu.',
    relationships: 'Strety, spojenia, ujmy a tresty zistené medzi vetvami.',
    'tcm constitution': 'Iba tradičné symbolické priradenia. Nejde o posúdenie zdravia ani o lekársku radu.',
    disclaimer: 'Obmedzenie rozsahu, ktoré platí pre časť nad týmto riadkom.',
    yin: 'Koľko jinových kmeňov a vetiev mapa obsahuje.',
    yang: 'Koľko jangových kmeňov a vetiev mapa obsahuje.',
    /* -------------------------------------------------------- human design */
    type: 'Energetická mechanika, na ktorej mapa stojí. Vyplýva z toho, ktoré centrá sú definované.',
    strategy: 'Spôsob zapájania sa, ktorý vyplýva z typu. Nie je to samostatný výpočet.',
    authority: 'Mechanizmus rozhodovania. Určuje ho pevné poradie prednosti medzi definovanými centrami.',
    profile: 'Dve čísla: línia vedomej osobnosti a línia nevedomého dizajnu.',
    definition: 'Ako sa definované centrá zoskupujú do prepojených sietí.',
    'definition groups': 'Ktoré centrá patria do ktorej prepojenej skupiny.',
    'defined centers': 'Centrá so stálou, pevnou energiou.',
    'defined center pattern': 'Ktoré z deviatich centier sú definované a ktoré otvorené.',
    'defined channels': 'Úplné spojenia od brány k bráne, ktoré definujú centrá.',
    'activated gates': 'Každá brána obsadená planétou v ktorejkoľvek z dvoch aktivácií.',
    'gate notation': 'Ako sa zapisujú čísla brán a línií.',
    'personality sun gate': 'Brána, ktorú Slnko obsadzovalo v okamihu narodenia.',
    'personality earth gate': 'Brána oproti Slnku v okamihu narodenia.',
    'design sun gate': 'Brána, ktorú Slnko obsadzovalo v okamihu dizajnu, približne 88 dní pred narodením.',
    'design earth gate': 'Brána oproti Slnku v okamihu dizajnu.',
    'personality utc': 'Okamih narodenia v koordinovanom svetovom čase.',
    'design utc': 'Okamih dizajnu v koordinovanom svetovom čase.',
    'design offset days': 'Ako ďaleko pred narodením okamih dizajnu ležal. Meria sa presným slnečným oblúkom, nie pevným počtom dní.',
    'motor-to-throat path': 'Či je niektoré motorické centrum spojené s hrdlom. Práve to odlišuje Manifestora a Manifesting Generatora od Generatora.',
    'bodygraph mechanics': 'Brány, kanály a stavy centier, z ktorých sa graf vykreslil.',
    'named cross title': 'Zaužívaný názov inkarnačného kríža, ktorý tvoria štyri brány Slnka a Zeme.',
    /* --------------------------------------------------------------- shared */
    frame: 'Vzťažná sústava, v ktorej sa polohy počítali.',
    'model version': 'Verzia interpretačného modelu, ktorý tento výklad vytvoril.',
    warnings: 'Podmienky, ktoré výpočet označil počas práce.',
};
const PREFIX_SK = [
    ['aspect:', 'Uhlový vzťah medzi dvoma telesami, aj s odchýlkou od presného uhla.'],
    ['house placement:', 'V ktorom z dvanástich domov toto teleso leží.'],
    ['stellium:', 'Tri alebo viac telies nahromadených v jednom znamení alebo dome.'],
    ['angular:', 'Teleso blízko niektorej zo štyroch osí mapy, čo ho zosilňuje.'],
    ['forward #', 'Jeden desaťročný pilier šťastia v postupnosti smerom dopredu.'],
    ['reverse #', 'Jeden desaťročný pilier šťastia v postupnosti smerom dozadu.'],
    ['requirement ', 'Údaj, ktorý tento pilier potrebuje, aby mohol počítať.'],
    ['emphasis ', 'Poznámka o symbolickom priradení. Nie je to tvrdenie o zdraví.'],
];
const PILLAR_POSITION_SK = {
    year: 'Ročný pilier. Tradične sa číta pre pôvod, rané prostredie a spoločenskú tvár navonok.',
    month: 'Mesačný pilier. Tradične sa číta pre výchovu, kariéru a sezónne podmienky, v ktorých mapa vyrastala.',
    day: 'Denný pilier. Jeho kmeň je Day Master; jeho vetva sa tradične číta pre samotného človeka a blízke partnerstvo.',
    hour: 'Hodinový pilier. Tradične sa číta pre neskorší život, súkromné ambície a to, čo sa odovzdáva ďalej.',
};
export function technicalNoteFor(label) {
    const key = label.trim().toLowerCase();
    /* Slovak first, English behind it, PER KEY. The label itself is the engine's
       own output and is matched in English whatever the reader's language,
       because that is what the engine emits and this layer does not touch it. */
    const sk = activeLocale() === 'sk';
    const exact = (sk ? EXACT_SK[key] : undefined) ?? EXACT[key];
    if (exact)
        return exact;
    const pillarMatch = /^(year|month|day|hour) pillar$/.exec(key);
    if (pillarMatch) {
        return (sk ? PILLAR_POSITION_SK[pillarMatch[1]] : undefined)
            ?? PILLAR_POSITION[pillarMatch[1]];
    }
    if (sk) {
        for (const [prefix, note] of PREFIX_SK) {
            if (key.startsWith(prefix))
                return note;
        }
    }
    for (const [prefix, note] of PREFIX) {
        if (key.startsWith(prefix))
            return note;
    }
    return undefined;
}
/** Keys with no Slovak note. Used by the localisation coverage report. */
export function untranslatedTechnicalNoteKeys() {
    return Object.keys(EXACT).filter((key) => EXACT_SK[key] === undefined);
}
/** For tests and for a maintainer checking coverage. */
export const TECHNICAL_NOTE_KEYS = Object.keys(EXACT);
