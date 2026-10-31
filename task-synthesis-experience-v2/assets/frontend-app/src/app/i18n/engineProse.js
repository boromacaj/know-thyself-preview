import { activeLocale } from './locale.js?v=53c0693';
import { t, UI_STRING_KEYS } from './uiStrings.js?v=53c0693';
/*
 * SENTENCES THE ENGINES WROTE.
 *
 * The astronomy, calendar and adapter code does not only emit numbers. It also
 * composes short explanatory sentences next to the value they explain: what the
 * retrograde flag was sampled from, why Uranus carries no dignity score, what
 * "seasonally resting" means for a Day Master. A reader who opens Technical
 * Details meets those sentences, so a Slovak reader has to meet them in Slovak.
 *
 * WHY A TABLE AND NOT AN ENGINE CHANGE
 * Identical reasoning to limitationText.ts, and deliberately the same shape.
 * The sentence belongs next to the branch that emits it - that is what makes
 * the engine readable - and putting locale awareness into the ephemeris and the
 * solar-term calendar would make the one deterministic part of this codebase
 * depend on which language the reader picked. So this is a late, purely textual
 * overlay applied where the reading is composed and where the synthesis screen
 * renders, never inside a pillar engine or a synthesis adapter.
 *
 * WHAT IS IN SCOPE AND WHAT IS NOT
 * SENTENCES are translated. VALUE READOUTS are not: "Capricorn: Sun, Mercury,
 * Venus | House 2: ...", "Mercury 4.61 degrees from Midheaven", "Raw longitude
 * 182.5115 / direct". Those sit in a technical table whose label column and
 * value column are English by design - technicalNotes.ts already works that
 * way - and translating half of a readout would fork the vocabulary between two
 * columns of the same row, which is worse for someone checking the working than
 * leaving the readout alone.
 *
 * One deliberate exception is the essential dignity fact, where the engine
 * concatenates a readout and its explanation into a single string. It cannot be
 * split, and the explanation is the larger half, so the whole line is rendered
 * in Slovak - sign name declined, which is why these are rebuilt from a
 * template rather than word-substituted.
 *
 * THE OTHER EXCEPTION IS THE GLANCE STRIP
 * The mark values on each pillar card - `Virgo 4°35′`, `Fire Rabbit`, `Waxing
 * Crescent`, `Respond, then inform` - go through this same overlay, and they are
 * not the technical table. They are the first thing on the screen, they are
 * short enough that nothing looking for a sentence ever noticed them, and the
 * label beside every one of them is already Slovak. So the words in them are
 * translated and every figure in them is not: `4°35′` is the calculation, and
 * the reason to print it is that a reader can check it.
 *
 * The overlay cannot tell a mark from an appendix field - it is handed a string
 * - so a value that is both, like the element balance, now reads in Slovak in
 * both places. That is the consistent answer rather than a compromise: one value
 * with one name, wherever the reader meets it.
 *
 * EXACT MATCH FIRST, THEN PATTERNS
 * Fixed sentences match whole. A reworded English sentence then surfaces as a
 * reported gap instead of quietly getting stale Slovak that no longer says the
 * same thing. Sentences the engine interpolates values into get a pattern, and
 * every captured value - degree, score, count, threshold, pinyin stem - is
 * carried through untouched, because it is engine output and not prose.
 */
/* -------------------------------------------------------------------------- *
 * NAMES THE SENTENCES HAVE TO DECLINE
 * -------------------------------------------------------------------------- */
/*
 * Slovak declines the sign, and the preposition alternates with it. The
 * locative form ("v Panne", "vo Váhach") is read from the UI dictionary rather
 * than restated here, so the technical appendix and the hub card can never
 * drift apart. The nominative and dative are local because the dictionary has
 * no need of them: only these sentences say "Mercury rules Virgo".
 */
/* Exported because i18n/labelText.ts needs exactly these names for the technical
   appendix's field labels. Two tables of Slovak planet names would drift apart
   the first time one of them was corrected, so there is one. */
export const SIGN_NOMINATIVE = {
    aries: 'Baran',
    taurus: 'Býk',
    gemini: 'Blíženci',
    cancer: 'Rak',
    leo: 'Lev',
    virgo: 'Panna',
    libra: 'Váhy',
    scorpio: 'Škorpión',
    sagittarius: 'Strelec',
    capricorn: 'Kozorožec',
    aquarius: 'Vodnár',
    pisces: 'Ryby',
};
const SIGN_DATIVE = {
    aries: 'Baranovi',
    taurus: 'Býkovi',
    gemini: 'Blížencom',
    cancer: 'Rakovi',
    leo: 'Levovi',
    virgo: 'Panne',
    libra: 'Váham',
    scorpio: 'Škorpiónovi',
    sagittarius: 'Strelcovi',
    capricorn: 'Kozorožcovi',
    aquarius: 'Vodnárovi',
    pisces: 'Rybám',
};
/** Grammatical gender of each body's Slovak name, for the words in front of it. */
export const BODY_GENDER = {
    sun: 'n', moon: 'm', mercury: 'm', venus: 'f', mars: 'm', jupiter: 'm',
    saturn: 'm', uranus: 'm', neptune: 'm', pluto: 'n',
    earth: 'f', 'north node': 'm', 'south node': 'm',
};
export const BODY_NOMINATIVE = {
    sun: 'Slnko',
    moon: 'Mesiac',
    mercury: 'Merkúr',
    venus: 'Venuša',
    mars: 'Mars',
    jupiter: 'Jupiter',
    saturn: 'Saturn',
    uranus: 'Urán',
    neptune: 'Neptún',
    pluto: 'Pluto',
    /* The three the Human Design deck adds to the ten: the Earth opposite the
       Sun, and the two lunar Nodes. Astrology's rows already call the Nodes
       this; the deck's rows now do too. */
    earth: 'Zem',
    'north node': 'Severný uzol',
    'south node': 'Južný uzol',
    /* The optional extended objects of the Advanced chart: their names are the same in Slovak. */
    chiron: 'Chiron',
    ceres: 'Ceres',
    pallas: 'Pallas',
    juno: 'Juno',
    vesta: 'Vesta',
};
/*
 * THE FIVE MAJOR ASPECTS.
 *
 * Written out here rather than read from i18n/labels/vocabulary.ts, which holds
 * the same five for the aspect ROW LABEL. Normally that would be one table read
 * from two places, and it is one table everywhere else in this file - but
 * vocabulary.ts already imports SIGN_NOMINATIVE, BODY_NOMINATIVE and PHASE from
 * here, so reading its ASPECT back would make the two files import each other.
 * These five names are settled astrological terms and the label and the value
 * must agree: if one is ever corrected, correct the other in the same commit.
 */
const ASPECT_NAME = {
    conjunction: 'konjunkcia',
    opposition: 'opozícia',
    square: 'kvadratúra',
    trine: 'trigon',
    sextile: 'sextil',
};
/*
 * THE FOUR CHART ELEMENTS AND THE THREE MODALITIES.
 *
 * Capitalised, unlike the BaZi phases below, because these never appear inside
 * a sentence: they are the whole of a value - `Prevažujúci živel: Zem` - or an
 * entry in the balance list, where the English capitalises too. Astrology's
 * `Air` has no BaZi counterpart and BaZi's `Wood` and `Metal` have no astrology
 * one, so these are genuinely a different four words, not a second casing of
 * the same table.
 */
/*
 * Held in the LOWER case and in two forms, because the same four words are now
 * needed in two places that disagree about both. As a standalone value -
 * `Prevažujúci živel: Zem` - the word opens a field and is capitalised, and the
 * three patterns below do that. Inside the Big Three prose it sits mid-sentence
 * (`živly zem a vzduch`) and after `živlu`, which governs the genitive (`živlu
 * zeme`). Lower case is the form that reads correctly in the sentence and
 * the only one the other can be derived from, so it is the one stored.
 */
const CHART_ELEMENT = {
    Fire: { nominative: 'oheň', genitive: 'ohňa' },
    Earth: { nominative: 'zem', genitive: 'zeme' },
    Air: { nominative: 'vzduch', genitive: 'vzduchu' },
    Water: { nominative: 'voda', genitive: 'vody' },
};
/* Lower case for the same reason, and no second form: the only frame the prose
   puts a modality in is `Obe sú premenlivé`, which is the nominative. */
const CHART_MODALITY = {
    Cardinal: 'kardinálne',
    Fixed: 'pevné',
    Mutable: 'premenlivé',
};
/** A stored lower-case word opening a value field. Slovak capitalises the same
    letter English does, so the standalone readouts are unchanged. */
const capitalised = (word) => word.charAt(0).toUpperCase() + word.slice(1);
/*
 * The three motion states the ephemeris reports. `Retrográdny, priamy a
 * stacionárny pohyb` is already the wording of the retrograde method note in
 * this file, so the readout uses the same three words rather than a second
 * vocabulary for the same fact.
 */
const MOTION_STATE = {
    direct: 'priamy pohyb',
    retrograde: 'retrográdny pohyb',
    stationary: 'stacionárny pohyb',
};
/*
 * The three positions a hidden stem can hold in its branch. They are an ORDER,
 * not a rank of importance, and Slovak reads them as ordinary adjectives
 * agreeing with `kmeň` - masculine, so one form each.
 */
const HIDDEN_STEM_ROLE = {
    primary: 'hlavný',
    secondary: 'vedľajší',
    tertiary: 'tretí',
};
/** BaZi phases. The pillar says `živel`, not `element`, and they are lower case. */
export const PHASE = {
    Wood: 'drevo',
    Fire: 'oheň',
    Earth: 'zem',
    Metal: 'kov',
    Water: 'voda',
};
/*
 * The same five phases in the two other cases these sentences need them in.
 * "a stronger structural presence of Wood" is genitive, "transforms into Metal"
 * is accusative, and only `voda` and `zem` actually change - but writing the
 * unchanged ones out too keeps the lookup total, so a caller never has to know
 * which phases decline and which do not.
 */
const PHASE_GENITIVE = {
    Wood: 'dreva',
    Fire: 'ohňa',
    Earth: 'zeme',
    Metal: 'kovu',
    Water: 'vody',
};
const PHASE_ACCUSATIVE = {
    Wood: 'drevo',
    Fire: 'oheň',
    Earth: 'zem',
    Metal: 'kov',
    Water: 'vodu',
};
/*
 * The genitive is here because the zodiac READING, unlike the glance strip,
 * never names the animal on its own: every frame it appears in says "znamenie
 * <animal>" - the sign OF the rabbit - and Slovak puts that second noun in the
 * genitive. Only the twelve genitives are listed; the phase in front of them is
 * the adjective table below, and the phase as a noun is PHASE and its two cases.
 */
const ZODIAC_ANIMAL = {
    Rat: { name: 'potkan', gender: 'm', genitive: 'potkana' },
    Ox: { name: 'byvol', gender: 'm', genitive: 'byvola' },
    Tiger: { name: 'tiger', gender: 'm', genitive: 'tigra' },
    Rabbit: { name: 'zajac', gender: 'm', genitive: 'zajaca' },
    Dragon: { name: 'drak', gender: 'm', genitive: 'draka' },
    Snake: { name: 'had', gender: 'm', genitive: 'hada' },
    Horse: { name: 'kôň', gender: 'm', genitive: 'koňa' },
    Goat: { name: 'koza', gender: 'f', genitive: 'kozy' },
    Monkey: { name: 'opica', gender: 'f', genitive: 'opice' },
    Rooster: { name: 'kohút', gender: 'm', genitive: 'kohúta' },
    Dog: { name: 'pes', gender: 'm', genitive: 'psa' },
    Pig: { name: 'prasa', gender: 'n', genitive: 'prasaťa' },
};
const PHASE_ADJECTIVE = {
    Wood: { m: 'Drevený', f: 'Drevená', n: 'Drevené' },
    Fire: { m: 'Ohnivý', f: 'Ohnivá', n: 'Ohnivé' },
    Earth: { m: 'Zemský', f: 'Zemská', n: 'Zemské' },
    Metal: { m: 'Kovový', f: 'Kovová', n: 'Kovové' },
    Water: { m: 'Vodný', f: 'Vodná', n: 'Vodné' },
};
/*
 * The TCM organ pair each phase is traditionally read against.
 *
 * `Spleen` is in here as `slezina` and also stays `Spleen` in Human Design,
 * where it is the name of a centre. Two tables, two pillars, no conflict: the
 * organ is an organ and the centre keeps the canonical name a reader can look
 * up in any Human Design source.
 */
const TCM_ORGAN = {
    Liver: 'pečeň',
    Gallbladder: 'žlčník',
    Heart: 'srdce',
    'Small Intestine': 'tenké črevo',
    Spleen: 'slezina',
    Stomach: 'žalúdok',
    Lung: 'pľúca',
    'Large Intestine': 'hrubé črevo',
    Kidney: 'obličky',
    Bladder: 'močový mechúr',
};
/*
 * THE NUMEROLOGY NUMBER THEMES, IN TWO CASES.
 *
 * The engine writes each theme into two different frames from the same source
 * string: "Number 6 emphasizes care, ..." governs the accusative, and the
 * Karmic Lessons / Hidden Passion list prints "6: care, ..." as a bare label,
 * which is nominative. Substituting one Slovak phrase into both would put a
 * wrong case in one of them every time, so both are written out. Where the
 * phrase happens to be identical in the two cases - neuter nouns and masculine
 * inanimates do not change - the two entries simply agree.
 */
const NUMBER_THEME_NOMINATIVE = {
    'agency, first steps, and the willingness to act from a clear center': 'samostatné konanie, prvé kroky a ochota konať z jasného stredu',
    'relational awareness, listening, and the ability to move with subtle timing': 'vnímavosť voči vzťahom, počúvanie a schopnosť pohybovať sa s jemným načasovaním',
    'creative voice, language, imagination, and feelings finding shareable form': 'tvorivý hlas, jazyk, predstavivosť a pocity, ktoré nachádzajú zdieľateľnú formu',
    'stable foundations, grounded effort, and ideas becoming usable form': 'pevné základy, ukotvené úsilie a myšlienky, ktoré sa menia na použiteľnú formu',
    'variety, direct experience, flexible learning, and responsive movement': 'rozmanitosť, priama skúsenosť, pružné učenie a pohyb, ktorý reaguje',
    'care, emotional repair, harmony, and tending what matters': 'starostlivosť, citová náprava, harmónia a opatera toho, na čom záleží',
    'reflection, study, pattern recognition, and honest understanding': 'reflexia, štúdium, rozpoznávanie vzorcov a úprimné porozumenie',
    'responsible power, material clarity, resource awareness, and capable action': 'zodpovedná moc, materiálna jasnosť, prehľad o zdrojoch a schopné konanie',
    'compassion, completion, symbolic breadth, and experience becoming wisdom': 'súcit, dokončovanie, symbolická šírka a skúsenosť, ktorá sa mení na múdrosť',
};
const NUMBER_THEME_ACCUSATIVE = {
    'agency, first steps, and the willingness to act from a clear center': 'samostatné konanie, prvé kroky a ochotu konať z jasného stredu',
    'relational awareness, listening, and the ability to move with subtle timing': 'vnímavosť voči vzťahom, počúvanie a schopnosť pohybovať sa s jemným načasovaním',
    'creative voice, language, imagination, and feelings finding shareable form': 'tvorivý hlas, jazyk, predstavivosť a pocity, ktoré nachádzajú zdieľateľnú formu',
    'stable foundations, grounded effort, and ideas becoming usable form': 'pevné základy, ukotvené úsilie a myšlienky, ktoré sa menia na použiteľnú formu',
    'variety, direct experience, flexible learning, and responsive movement': 'rozmanitosť, priamu skúsenosť, pružné učenie a pohyb, ktorý reaguje',
    'care, emotional repair, harmony, and tending what matters': 'starostlivosť, citovú nápravu, harmóniu a opateru toho, na čom záleží',
    'reflection, study, pattern recognition, and honest understanding': 'reflexiu, štúdium, rozpoznávanie vzorcov a úprimné porozumenie',
    'responsible power, material clarity, resource awareness, and capable action': 'zodpovednú moc, materiálnu jasnosť, prehľad o zdrojoch a schopné konanie',
    'compassion, completion, symbolic breadth, and experience becoming wisdom': 'súcit, dokončovanie, symbolickú šírku a skúsenosť, ktorá sa mení na múdrosť',
};
/*
 * THE THREE NAME-NUMEROLOGY SIGNALS, BY NAME.
 *
 * Exported because the appendix meets each of these twice: as the NAME OF A
 * ROW, which i18n/labels/numerology.ts is responsible for, and INSIDE A VALUE,
 * where the name map writes "Soul Urge Number 8: agency through competence,
 * stewardship, strategy". Two tables would drift the first time one of them was
 * corrected and the row would end up disagreeing with the line beneath it, so
 * there is one and the label table reads it from here.
 */
export const NUMEROLOGY_SIGNAL_NAME = {
    'Expression / Destiny Number': 'Číslo vyjadrenia / osudu',
    'Soul Urge Number': 'Číslo túžby duše',
    'Personality Number': 'Číslo osobnosti',
};
/*
 * Every position as the REDUCTION TRACES name it.
 *
 * The traces print `Life Path Number: 43 -> 7 | Birth Day Number: 28 -> 10 ->
 * 1`, which is the engine showing its working - the arrows and the figures are
 * the point and are never touched. Only the name in front of each colon is a
 * word for a reader, and it has to be the same word the row above it uses.
 */
const TRACE_NAME = {
    ...NUMEROLOGY_SIGNAL_NAME,
    'Life Path Number': 'Číslo životnej cesty',
    'Birth Day Number': 'Číslo dňa narodenia',
    'Attitude Number': 'Číslo postoja',
    'Balance Number': 'Číslo rovnováhy',
    'Maturity Number': 'Číslo zrelosti',
    'Hidden Passion Number': 'Číslo skrytej vášne',
    /* The karmic-debt readout writes Expression under both of its names. */
    'Expression / Destiny Number': 'Číslo vyjadrenia',
    'Expression Number': 'Číslo vyjadrenia',
};
/** The lunar nodes, which the placement lines name like a body. */
const NODE_NAME = {
    'north node': 'Severný uzol',
    'south node': 'Južný uzol',
};
/*
 * THE KEYWORD ROW THAT SIGNAL PRINTS.
 *
 * The row is "<signal> <number>: <theme> through <three keywords>". It is not
 * prose - it has no verb and no function words, which is exactly why the prose
 * audit walked past it for so long - but it is the sentence a reader meets
 * beside their Expression number, so it reads in Slovak.
 *
 * The theme is the subject of the row and stays nominative. The keywords follow
 * `cez`, which governs the accusative, so they are written in that case: half
 * of them are feminine nouns in -a and would otherwise be visibly wrong.
 */
const NAME_THEME_LABEL = {
    initiative: 'iniciatíva',
    attunement: 'naladenie',
    expression: 'vyjadrenie',
    structure: 'štruktúra',
    movement: 'pohyb',
    care: 'starostlivosť',
    depth: 'hĺbka',
    agency: 'samostatné konanie',
    integration: 'integrácia',
};
const NAME_THEME_KEYWORD = {
    'self-direction': 'sebariadenie',
    originality: 'originalitu',
    courage: 'odvahu',
    sensitivity: 'citlivosť',
    cooperation: 'spoluprácu',
    tact: 'takt',
    creativity: 'tvorivosť',
    communication: 'komunikáciu',
    play: 'hravosť',
    reliability: 'spoľahlivosť',
    order: 'poriadok',
    craft: 'remeselnú zručnosť',
    freedom: 'slobodu',
    change: 'zmenu',
    curiosity: 'zvedavosť',
    support: 'podporu',
    repair: 'nápravu',
    beauty: 'krásu',
    inquiry: 'skúmanie',
    discernment: 'rozlišovanie',
    solitude: 'samotu',
    competence: 'kompetentnosť',
    stewardship: 'správcovstvo',
    strategy: 'stratégiu',
    compassion: 'súcit',
    meaning: 'zmysel',
    release: 'uvoľnenie',
};
/* Pinnacles and Challenges are both feminine in Slovak - kapitola, výzva - so
   one set of ordinals serves both lists. */
const CHAPTER_ORDINAL = {
    First: 'Prvá',
    Second: 'Druhá',
    Third: 'Tretia',
    Fourth: 'Štvrtá',
};
/*
 * The five seasonal states of the month command (旺相休囚死), as the engine
 * names them. Masculine singular, because the subject is always the Day Master.
 */
/* The same five states as NOUNS, for frames where an adjective would have to
   agree with a phase whose gender varies. */
/**
 * The pillar a branch or stem sits in, as the relationship sentences name it.
 *
 * They read `Mao (Year) a You (Day) sú v priamom strete` - the pinyin is the
 * engine's and stays, but the position in brackets is an ordinary word and was
 * the last English left inside those sentences. Falls back to the engine's own
 * word rather than to a blank.
 */
const pillarPosition = (english) => PILLAR_NOMINATIVE[english] ?? english;
/** The four pillar positions in the nominative, for rows that name them. */
const PILLAR_NOMINATIVE = {
    Year: 'Rok', Month: 'Mesiac', Day: 'Deň', Hour: 'Hodina',
};
const SEASONAL_NOUN = {
    prosperous: 'rozkvet',
    aided: 'podpora',
    resting: 'odpočinok',
    trapped: 'zovretie',
    dead: 'vyhasnutie',
};
const SEASONAL_STATE = {
    prosperous: 'prekvitajúci',
    aided: 'podporený',
    resting: 'odpočívajúci',
    trapped: 'uväznený',
    dead: 'mŕtvy',
};
/** The numerology positions as row labels, in the reading's own wording. */
const NUMEROLOGY_POSITION = {
    'Life Path': 'Životná cesta',
    Expression: 'Vyjadrenie',
    'Soul Urge': 'Túžba duše',
    Personality: 'Osobnosť',
    'Birth Day': 'Deň narodenia',
    Maturity: 'Zrelosť',
    Balance: 'Rovnováha',
    Attitude: 'Postoj',
    'Hidden Passion': 'Skrytá vášeň',
    'Karmic Lesson': 'Karmická lekcia',
    'Karmic Debt': 'Karmický dlh',
    Pinnacle: 'Vrchol',
    Challenge: 'Výzva',
    'Personal Year': 'Osobný rok',
    'Personal Month': 'Osobný mesiac',
    'Personal Day': 'Osobný deň',
};
/** What the four aspect families are called where the orb note names one. */
const ASPECT_MARKER = {
    Fusion: 'spojenie',
    Flow: 'plynulý aspekt',
    Tension: 'napätie',
    Polarity: 'protiľahlosť',
};
const STRENGTH_TENDENCY = {
    strong: 'silný',
    'moderately-strong': 'mierne silný',
    balanced: 'vyrovnaný',
    'moderately-weak': 'mierne slabý',
    weak: 'slabý',
    indeterminate: 'neurčený',
};
/*
 * The three confidence levels the strength model reports, feminine nominative
 * because the only noun they ever describe is `spoľahlivosť`. The sentence is
 * built so that they land in that one slot: an instrumental would have dragged
 * the alternating preposition (`s nízkou`, `so strednou`) into the table with
 * them, and a preposition is the frame's business, not the value's.
 */
const CONFIDENCE_LEVEL = {
    low: 'nízka',
    medium: 'stredná',
    high: 'vysoká',
};
/** `Fire` -> `oheň` / `ohňa` / `oheň` / `Oheň`, in English still `Fire`. */
export function phaseWord(english, form = 'nominative') {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    const table = form === 'genitive' ? PHASE_GENITIVE
        : form === 'accusative' ? PHASE_ACCUSATIVE : PHASE;
    const word = table[english];
    if (!word)
        return english;
    return form === 'label' ? capitalised(word) : word;
}
/** `Rabbit` -> `zajaca`, the form `znamenie ...` needs. In English still `Rabbit`. */
export function zodiacAnimalGenitive(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    return ZODIAC_ANIMAL[english]?.genitive ?? english;
}
/**
 * `Rabbit` -> `zajac`, the plain name the seasonal ring puts in brackets after
 * the branch. The genitive above is the same twelve animals in the one case the
 * zodiac reading needs; this is the nominative the same table already carries,
 * not a second list of them.
 */
export function zodiacAnimalWord(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    return ZODIAC_ANIMAL[english]?.name ?? english;
}
/**
 * `resting` -> `odpočívajúci`, agreeing with the Day Master it is said of.
 *
 * The same five words the engine's own seasonal sentences already use, so the
 * ring's tooltip and the appendix cannot drift apart.
 */
export function seasonalStateWord(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    return SEASONAL_STATE[english] ?? english;
}
/**
 * `Earth` -> `zem` / `zeme`, for the Big Three prose. In English still `Earth`.
 *
 * Lower case, because every frame in that reading is mid-sentence: `živly zem a
 * vzduch`, `živlu zeme`. The capitalised standalone value is the same
 * four words with the first letter raised, and the balance patterns do that
 * where they need it.
 */
export function chartElementWord(english, form = 'nominative') {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    const entry = CHART_ELEMENT[english];
    return entry ? entry[form] : english;
}
/** `Mutable` -> `premenlivé`, agreeing with the two placements it is said of. */
export function chartModalityWord(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    return CHART_MODALITY[english] ?? english;
}
/**
 * `Venus` -> `Venuša`, for the placement titles. In English still `Venus`.
 *
 * The same ten names the technical appendix and the glance strip print, read
 * from the one table, so a heading and the row under it cannot disagree.
 */
export function bodyWord(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    return BODY_NOMINATIVE[english.toLowerCase()] ?? english;
}
/** `weak` -> `slabý`, agreeing with the Day Master the sentence puts it after. */
export function strengthTendencyWord(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    return STRENGTH_TENDENCY[english] ?? english;
}
/** `high` -> `vysoká`, agreeing with `spoľahlivosť`. */
export function confidenceWord(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    return CONFIDENCE_LEVEL[english.toLowerCase()] ?? english;
}
/**
 * "v Panne" / "vo Váhach", straight from the UI dictionary.
 *
 * Exported because the astrology READING needs the same twelve forms: `Slnko v
 * Panne` is what its prose already says, and the placement titles above it were
 * still saying `Sun v znamení Virgo`. The preposition comes with the word
 * because it alternates with it, and in English the whole thing is still `in
 * Virgo`, so the frame around it reads the same in both languages.
 */
/**
 * The bare sign name: `Škorpión`, not `v Škorpiónovi`.
 *
 * `inSign` below carries the preposition because it alternates with the word,
 * which is right inside a sentence and wrong in a caption - and in English
 * `inSign` returns `in Scorpio`, so using it for a caption that reads
 * `Ascendant Scorpio` would have changed the English too.
 */
export function signWord(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    return SIGN_NOMINATIVE[english.toLowerCase()] ?? english;
}
export function inSign(english) {
    const key = `zodiac.in.${english.toLowerCase()}`;
    return UI_STRING_KEYS.includes(key) ? t(key) : english;
}
/* The four angles in the three cases the appendix values put them in. */
const ANGLE_NOMINATIVE = {
    Ascendant: 'Ascendent',
    Descendant: 'Descendent',
    Midheaven: 'Medium Coeli (MC)',
    'Imum Coeli': 'Imum Coeli (IC)',
};
const ANGLE_LOCATIVE = {
    Ascendant: 'ascendente',
    Descendant: 'descendente',
    Midheaven: 'Medium Coeli (MC)',
    'Imum Coeli': 'Imum Coeli (IC)',
};
const ANGLE_GENITIVE = {
    Ascendant: 'ascendentu',
    Descendant: 'descendentu',
    Midheaven: 'Medium Coeli (MC)',
    'Imum Coeli': 'Imum Coeli (IC)',
};
const DIGNITY_WORD = {
    Domicile: 'domicil',
    Exaltation: 'exaltácia',
    Detriment: 'exil',
    Fall: 'pád',
    Peregrine: 'peregrín',
};
/** The role a Human Design centre plays, as the engine categorises it. */
const CENTRE_CATEGORY = {
    pressure: 'tlak',
    awareness: 'vedomie',
    motor: 'motor',
    manifestation: 'prejav',
    generation: 'tvorba energie',
    identity: 'identita',
};
const ARROW = { Left: 'doľava', Right: 'doprava' };
const nominativeSign = (english) => SIGN_NOMINATIVE[english.toLowerCase()] ?? english;
/**
 * A window as the appendices print it - `Leo until about 10:25, Virgo from
 * about 10:25 to 13:05, Libra from about 13:05`, or a BaZi pillar's `Ding Si
 * until about 11:45, ...` - in Slovak, or null when any span does not parse.
 * A sign is said in Slovak; a pillar's pinyin stays as it is.
 */
export function windowPhraseSk(phrase) {
    const value = (text) => (SIGN_NOMINATIVE[text.toLowerCase()] ? nominativeSign(text) : text);
    const spans = phrase.split(', ').map((span) => {
        const until = /^(.+?) until about (\d\d:\d\d)$/.exec(span);
        if (until)
            return `${value(until[1])} približne do ${until[2]}`;
        const between = /^(.+?) from about (\d\d:\d\d) to (\d\d:\d\d)$/.exec(span);
        if (between)
            return `${value(between[1])} približne od ${between[2]} do ${between[3]}`;
        const from = /^(.+?) from about (\d\d:\d\d)$/.exec(span);
        if (from)
            return `${value(from[1])} približne od ${from[2]}`;
        return null;
    });
    return spans.every((span) => span !== null) ? spans.join(', ') : null;
}
/*
 * HUMAN DESIGN VALUES, AS THE WHOLE-DAY ENVELOPE LISTS THEM (model.ts):
 * `Projector; Generator`, `Wait for recognition and invitation; Respond`,
 * `3/5; 3/6; 4/6`. Semicolons, because a Strategy has a comma in it. The NAMES
 * stay English, as they do on every other row (i18n/labels/humanDesign.ts):
 * Types, Authorities, Definitions, Profiles and a cross's gate label. A
 * Strategy or a Signature is a sentence or a word, and is said in Slovak. Any
 * item this does not know leaves the whole row English rather than half-Slovak.
 */
const HD_NAMES = new Set([
    'Manifesting Generator', 'Generator', 'Manifestor', 'Projector', 'Reflector',
    'Emotional / Solar Plexus', 'Sacral', 'Splenic', 'Ego Manifested', 'Ego Projected', 'Self-Projected',
    'Mental / Environmental', 'Lunar',
    'No Definition', 'Single Definition', 'Split Definition', 'Triple Split Definition',
    'Quadruple Split Definition', 'Multiple Split Definition',
]);
const HD_SAID_IN_SLOVAK = new Set([
    'Respond, then inform', 'Respond', 'Inform before acting', 'Wait for recognition and invitation', 'Wait through a lunar cycle',
    'Satisfaction', 'Success', 'Peace', 'Surprise', 'Frustration', 'Bitterness', 'Anger', 'Disappointment',
]);
/**
 * The Ten God FAMILIES in the genitive Slovak needs after "skupiny", and a Definition with its Slovak noun and the
 * canonical name in brackets (the style guide's rule for a name the reader may check against another source).
 * Owned here so the reading's phrases (synthesis-reading/factPhrasing.ts) and the evidence chain's fact lines
 * below say the same thing, from one table.
 */
const TEN_GOD_FAMILY_GENITIVE = {
    output: 'tvorby', resource: 'výživy', wealth: 'majetku', authority: 'autority', companion: 'seberovných',
};
const HD_DEFINITION_PHRASE = {
    'Single Definition': 'jednoliata definícia (Single Definition)',
    'Split Definition': 'rozdelená definícia (Split Definition)',
    'Triple Split Definition': 'trojito rozdelená definícia (Triple Split)',
    'Quadruple Split Definition': 'štvorito rozdelená definícia (Quadruple Split)',
    'No Definition': 'žiadna definícia (No Definition)',
};
export const tenGodFamilyGenitive = (family) => TEN_GOD_FAMILY_GENITIVE[family];
export const hdDefinitionPhrase = (definition) => HD_DEFINITION_PHRASE[definition];
/** Slovak counts "stem": 1 kmeň, 2 to 4 kmene, otherwise kmeňov. */
const stemsWord = (count) => (count === 1 ? 'kmeň' : count >= 2 && count <= 4 ? 'kmene' : 'kmeňov');
/** One Human Design value in Slovak: a Strategy or a Signature translated, a name as it is. */
export function hdValueSk(value) {
    return HD_SAID_IN_SLOVAK.has(value) ? SK[value] ?? value : value;
}
/* Kept outside any braces: the Slovak token check reads `{a|b|c}` in this file as a gender token. */
const HD_PROFILE = /^\d\/\d$/;
const HD_CROSS = /^(?:Right Angle|Left Angle|Juxtaposition) Cross \d+\/\d+ \| \d+\/\d+$/;
const hdKeptName = (value) => HD_NAMES.has(value) || HD_PROFILE.test(value) || HD_CROSS.test(value);
const hdSaidInSlovak = (value) => (HD_SAID_IN_SLOVAK.has(value) ? SK[value] ?? null : null);
function hdValueList(list) {
    const values = list.split('; ').map((value) => (hdKeptName(value) ? value : hdSaidInSlovak(value)));
    return values.every((value) => value !== null) ? values.join('; ') : null;
}
/** `Virgo` -> `Panna`, `House 11` -> `Dom 11`: where a stellium sits. */
const placeWord = (english) => {
    const house = english.match(/^House (\d+)$/);
    return house ? `Dom ${house[1]}` : nominativeSign(english);
};
const dativeSign = (english) => SIGN_DATIVE[english.toLowerCase()] ?? english;
const body = (english) => BODY_NOMINATIVE[english.toLowerCase()] ?? english;
const bodyList = (english) => english.split(', ').map(body).join(', ');
/*
 * SLOVAK COUNTS.
 *
 * English writes "4 channel(s)" once and is done. Slovak has three forms and
 * picks by the numerator: 1 kanál, 4 kanály, 5 kanálov - and 0 takes the same
 * form as 5. Every count the appendix prints goes through here rather than
 * getting a plural glued on, because "4 kanálov" is the kind of mistake a
 * reader notices immediately and stops trusting the rest of the page for.
 */
function plural(count, one, few, many) {
    if (count === 1)
        return one;
    return count >= 2 && count <= 4 ? few : many;
}
/** "Earth and Metal and Water" -> "zem, kov a voda". Slovak lists one `a`. */
function phaseList(english) {
    const phases = english.split(' and ').map((phase) => PHASE[phase] ?? phase);
    if (phases.length < 2)
        return phases.join('');
    return `${phases.slice(0, -1).join(', ')} a ${phases[phases.length - 1]}`;
}
const numberTheme = (english, accusative) => (accusative ? NUMBER_THEME_ACCUSATIVE : NUMBER_THEME_NOMINATIVE)[english] ?? english;
/*
 * The four dated chapters the Pinnacles and Challenges outputs append to their
 * explanation. Each is "First: <a whole sentence>", and the sentence is one the
 * table already knows how to render standalone, so it is looked up rather than
 * restated here.
 */
function chapters(tail) {
    return tail
        .split(/ (?=(?:First|Second|Third|Fourth|Position \d+): )/)
        .map((chunk) => {
        const match = chunk.match(/^(?:(First|Second|Third|Fourth)|Position (\d+)): (.+)$/);
        if (!match)
            return chunk;
        const label = match[1] ? CHAPTER_ORDINAL[match[1]] : `Pozícia ${match[2]}`;
        return `${label}: ${render(match[3]) ?? match[3]}`;
    })
        .join(' ');
}
/* -------------------------------------------------------------------------- *
 * FIXED SENTENCES
 * -------------------------------------------------------------------------- */
const SK = {
    /* numerologyMeanings.ts CHALLENGE_ZERO_MEANING: a 0 Challenge read as itself. */
    'Challenge 0 is its own result, not a reduced 9: no single developmental pressure dominates that chapter, so its focus has to be chosen rather than imposed.': 'Výzva 0 je samostatný výsledok, nie zredukovaná deviatka: v tej kapitole neprevažuje žiadny jeden vývojový tlak, a preto si jej ťažisko treba zvoliť, nie čakať, že bude dané.',
    /* A methodology field, and a sentence rather than an identifier: the API
       names stay exactly as they are so the method is still checkable, and the
       English words describing what is done with them do not. */
    'ECMAScript Intl IANA offset search with local-time round-trip validation': 'Vyhľadanie posunu cez ECMAScript Intl a databázu IANA, overené spätným '
        + 'prevodom miestneho času',
    /* The node-convention footnote, which is a full sentence and was in English
       under a Slovak heading. The five capitalised HD row names inside it are
       labels, and the style guide translates those. */
    ['True node used; mean-node convention can shift node line/gate but never affects '
        + 'Type, Strategy, Authority, Definition, or Profile']: 'Použitý je pravý uzol (true node). Konvencia stredného uzla môže posunúť líniu '
        + 'a bránu uzla, na typ, stratégiu, autoritu, definíciu ani profil však nemá vplyv.',
    'Visible stems + primary branch elements; hidden stems counted separately': 'Viditeľné kmene + hlavné živly vetiev; skryté kmene sa počítajú zvlášť',
    'True solar time (primary); civil clock time retained for comparison': 'Pravý slnečný čas (hlavný); občiansky čas je ponechaný na porovnanie',
    'Unavailable: birth time not supplied': 'Nedostupné: nebol zadaný čas narodenia',
    /* ------------------------------------------------- THE GLANCE STRIP VALUES */
    /*
     * The mark values on the pillar card, above the fold. They reach the reader
     * through renderMark() in premiumPillarScreens.ts, which is why they outlived
     * every earlier pass over the appendix: they are one or two words with no
     * verb in them, so nothing that looks for a SENTENCE ever saw them.
     *
     * They are not readouts either. A readout is the engine showing its working -
     * a raw longitude, a reduction trace - and stays as the engine wrote it. These
     * are the answer to the question the card asks: what phase was the Moon in,
     * what does this Type actually do. A reader meets them before anything else on
     * the screen, so they read in the reader's language.
     */
    /* The eight Moon phases the ephemeris names. Plain Slovak, not the
       astronomical `cúvajúci`: this is the first line of the card. */
    'New Moon': 'Nov',
    'Waxing Crescent': 'Dorastajúci kosáčik',
    'First Quarter': 'Prvá štvrť',
    'Waxing Gibbous': 'Dorastajúci mesiac',
    'Full Moon': 'Spln',
    'Waning Gibbous': 'Ubúdajúci mesiac',
    'Third Quarter': 'Posledná štvrť',
    'Waning Crescent': 'Ubúdajúci kosáčik',
    /*
     * The five Strategies, one per Type.
     *
     * A Strategy is an instruction, and it is written as one: tykanie, imperative,
     * the same voice the rest of the reading uses. The TYPE it belongs to stays
     * English - Manifesting Generator is the name a reader will find in every
     * other source - but "Respond, then inform" is not a name, it is the sentence
     * telling them what to do, and leaving it in English leaves the one actionable
     * line on the card unreadable.
     */
    'Respond, then inform': 'Reaguj, potom informuj',
    Respond: 'Reaguj',
    'Inform before acting': 'Informuj skôr, než začneš konať',
    'Wait for recognition and invitation': 'Čakaj na uznanie a pozvanie',
    'Wait through a lunar cycle': 'Počkaj celý lunárny cyklus',
    /* The state of one centre. `centrum` is neuter, and both words agree with it.
       The centre NAMES beside them - Head, Ajna, Throat - are the label, and stay
       English exactly as they do everywhere else. */
    Defined: 'Definované',
    Open: 'Otvorené',
    /* The four variable arrows. The same two words the arrow sentence in this
       table already uses ("tóny 1-3 ukazujú doľava"), so the mark and the
       explanation under it cannot end up calling one direction two things. */
    Left: 'Doľava',
    Right: 'Doprava',
    /*
     * The body/mind concepts the deciding practice touches.
     *
     * These are ordinary scientific vocabulary with an entry in the encyclopedia,
     * not Human Design names - there is nothing to check them against in a Human
     * Design source - so they are translated. `Interocepcia` and `racionalizácia`
     * are the established Slovak terms; the other two are described rather than
     * transliterated, because no settled Slovak compound exists for either.
     */
    Interoception: 'Interocepcia',
    'Bodily decision signals': 'Telesné signály pri rozhodovaní',
    'Autonomic arousal': 'Aktivácia autonómneho nervového systému',
    Rationalisation: 'Racionalizácia',
    /* ------------------------------------------- astrology: angles and houses */
    'Calculated rising degree from UTC birth moment, latitude, longitude, and obliquity. Time-sensitive.': 'Vypočítaný stupeň vychádzajúci nad obzorom - z momentu narodenia v UTC, zemepisnej šírky a dĺžky a sklonu ekliptiky. Citlivé na čas.',
    'Calculated meridian angle from local sidereal time. Time-sensitive.': 'Vypočítaný uhol poludníka z miestneho hviezdneho času. Citlivé na čas.',
    'Whole-sign house system v1': 'Systém domov v celých znameniach (Whole Sign) v1',
    'The Ascendant sign becomes the 1st house; subsequent signs become houses 2–12.': 'Znamenie ascendentu sa stáva prvým domom; nasledujúce znamenia sa stávajú domami 2 až 12.',
    'Whole Sign Houses': 'Celé znamenia (Whole Sign)',
    /* THE ADVANCED CHART'S TECHNICAL DETAILS: what each house system is and how it was calculated, and the minor aspects' search. */
    'Whole Sign Houses. The reading and the groups above use it; the systems below are for exploring the chart wheel only.': 'Celé znamenia (Whole Sign). Používa ich výklad aj skupiny vyššie; systémy nižšie slúžia len na skúmanie kruhu mapy.',
    'Each house is one whole zodiac sign, the first being the Ascendant\'s sign; the cusp of every house is 0 degrees of its sign.': 'Každý dom je jedno celé znamenie, prvý je znamenie ascendentu; hrot každého domu je 0 stupňov jeho znamenia.',
    'Twelve 30-degree houses counted from the exact Ascendant degree; the Midheaven is not the 10th cusp.': 'Dvanásť domov po 30 stupňoch počítaných od presného stupňa ascendentu; Medium Coeli nie je hrotom 10. domu.',
    'Each quadrant between two angles (Ascendant, Imum Coeli, Descendant, Midheaven) is divided into three equal arcs of the ecliptic; cusps 1, 4, 7 and 10 are the angles.': 'Každý kvadrant medzi dvoma uhlami (ascendent, Imum Coeli, descendent, Medium Coeli) sa delí na tri rovnaké oblúky ekliptiky; hroty 1, 4, 7 a 10 sú samotné uhly.',
    'Time-based: each intermediate cusp (11, 12, 2, 3) divides its own ecliptic point\'s diurnal semi-arc into thirds, solved by fixed-point iteration from the local sidereal time, the obliquity and the latitude; cusps 5, 6, 8 and 9 are the opposites.': 'Časový systém: každý medziľahlý hrot (11, 12, 2, 3) delí denný polooblúk svojho bodu na ekliptike na tretiny; rieši sa iteráciou z miestneho hviezdneho času, sklonu ekliptiky a zemepisnej šírky; hroty 5, 6, 8 a 9 sú ich protipóly.',
    'None found within the minor orb limits.': 'V limitoch vedľajších aspektov sa nenašiel žiadny.',
    'JPL Horizons state vectors integrated locally (Gragg-Bulirsch-Stoer, the Sun and planets from astronomy-engine); nothing is fetched while the chart is drawn.': 'Stavové vektory JPL Horizons, integrované lokálne (Gragg-Bulirsch-Stoer, Slnko a planéty z astronomy-engine); pri kreslení mapy sa nič nesťahuje.',
    'Chiron and the asteroids need a normalized birth moment.': 'Chiron a planétky potrebujú normalizovaný moment narodenia.',
    'Chiron and the asteroids could not be calculated for this moment.': 'Chiron a planétky sa pre tento moment nepodarilo vypočítať.',
    'Chiron and the asteroids are placed for an exact birth moment, so they need a birth time.': 'Chiron a planétky sa umiestňujú pre presný moment narodenia, preto potrebujú čas narodenia.',
    'None of Chiron and the asteroids is in orb of another body.': 'Žiadne z telies Chiron a planétky nie je v orbe voči inému telesu.',
    'Unavailable: Placidus did not converge at this latitude and time.': 'Nedostupné: Placidus sa pre túto šírku a čas nepodarilo vyriešiť.',
    /* ------------------------------------------------------------------ bazi */
    'Visible stems and primary branch elements only; hidden stems excluded': 'Len viditeľné kmene a hlavné živly vetiev; skryté kmene sa nezapočítavajú',
    /* ----------------------------------------------- astrology: how it was run */
    'GeoVector with aberration and light-time correction, converted to true ecliptic of date': 'GeoVector s korekciou na aberáciu a čas šírenia svetla, prepočítaný na pravú ekliptiku dátumu',
    'Osculating true ascending node from the local lunar state vector (Swiss Ephemeris SE_TRUE_NODE convention); South Node is the exact +180 degree opposition': 'Oskulačný pravý vzostupný uzol z lokálneho stavového vektora Mesiaca (konvencia Swiss Ephemeris SE_TRUE_NODE); južný uzol je presne o 180 stupňov oproti',
    'Osculating true ascending node from the local lunar state vector (Swiss Ephemeris SE_TRUE_NODE convention) / South Node exactly 180 degrees opposite': 'Oskulačný pravý vzostupný uzol z lokálneho stavového vektora Mesiaca (konvencia Swiss Ephemeris SE_TRUE_NODE) / južný uzol presne o 180 stupňov oproti',
    'Osculating true ascending node from the local lunar state vector (Swiss Ephemeris SE_TRUE_NODE convention)': 'Oskulačný pravý vzostupný uzol z lokálneho stavového vektora Mesiaca (konvencia Swiss Ephemeris SE_TRUE_NODE)',
    'Exact opposition (+180°) of the calculated North Node; not independently sampled': 'Presná opozícia (+180°) k vypočítanému severnému uzlu; nie je vzorkovaný samostatne',
    'Tropical, geocentric true ecliptic of date': 'Tropický zverokruh, geocentrická pravá ekliptika dátumu',
    /* ------------------------------------------------ astrology: what it means */
    'Retrograde/direct/stationary is derived from real apparent-longitude motion (central-difference sample), not a static table.': 'Retrográdny, priamy a stacionárny pohyb sa odvodzuje zo skutočného pohybu zdanlivej dĺžky (vzorka centrálnou diferenciou), nie zo statickej tabuľky.',
    'Traditional rulership; domicile +5, exaltation +4, fall -4, detriment -5. Triplicity, term and face are not scored because their tables differ by authority.': 'Tradičná vláda; domicil +5, exaltácia +4, pád -4, exil -5. Triplicita, termín a tvár sa nehodnotia, pretože ich tabuľky sa podľa autority líšia.',
    'Modern rulership convention: the ruling body of the calculated Ascendant sign.': 'Konvencia modernej vlády: teleso, ktoré vládne vypočítanému znameniu ascendentu.',
    'Three or more bodies in one sign or house. Some authors require four, so the member count is shown rather than only the label.': 'Tri alebo viac telies v jednom znamení alebo dome. Niektorí autori vyžadujú štyri, preto je uvedený aj počet členov, nielen samotný názov.',
    'Bodies conjunct the Ascendant, Descendant, Midheaven or Imum Coeli within a 5 degree orb. Wider orbs are used by some authors.': 'Telesá v konjunkcii s ascendentom, descendentom, Medium Coeli alebo Imum Coeli s orbom do 5 stupňov. Niektorí autori používajú širšie orby.',
    'Conjunction, sextile, square, trine, and opposition are calculated from angular distance between planet longitudes (including North Node).': 'Konjunkcia, sextil, kvadratúra, trigon a opozícia sa počítajú z uhlovej vzdialenosti medzi dĺžkami planét (vrátane severného uzla).',
    'Essential dignity is derived from the sign each classical planet occupies.': 'Esenciálna dignita sa odvodzuje zo znamenia, v ktorom stojí každá klasická planéta.',
    'A stellium is a concentration of bodies in a single sign or house.': 'Stelium je nahromadenie telies v jednom znamení alebo dome.',
    'The chart ruler is derived from the Ascendant sign and is unavailable without houses.': 'Vládca mapy sa odvodzuje zo znamenia ascendentu, takže bez domov nie je dostupný.',
    'Angles and houses require coordinates and normalized birth moment.': 'Uhly a domy potrebujú súradnice a normalizovaný moment narodenia.',
    /* ------------------------------------ astrology: the short notes beside them */
    'Major aspects within configured orb limits': 'Hlavné aspekty v rámci nastavených limitov orbu',
    'No sign or house holds three or more bodies': 'Žiadne znamenie ani dom nedrží tri a viac telies',
    'No body within 5 degrees of an angle': 'Žiadne teleso nie je do 5 stupňov od uhla mapy',
    'Requires calculated Ascendant': 'Vyžaduje vypočítaný ascendent',
    'Requires calculated Ascendant and Midheaven': 'Vyžaduje vypočítaný ascendent a Medium Coeli',
    'Requires calculated planetary positions': 'Vyžaduje vypočítané polohy planét',
    'Missing angle/house result': 'Chýba výsledok pre uhly a domy',
    /* ------------------------------------------------------------ bazi frames */
    'Li Chun solar year / 12 Jie solar months / Gregorian JDN sexagenary day / true-solar-time shichen (civil-time comparison retained)': 'Solárny rok od Li Chun / 12 solárnych mesiacov Jie / sexagenárny deň cez Gregorián JDN / shichen podľa pravého slnečného času (porovnanie s občianskym časom ponechané)',
    /* ---------------------------------------------------- human design frames */
    'Tropical geocentric ecliptic longitudes mapped to Human Design gate wheel starting at 302°': 'Tropické geocentrické ekliptikálne dĺžky premietnuté na kruh brán Human Designu, ktorý začína na 302°',
    /* ------------------------------------------------- pillar source provenance */
    'Calculated locally from the entered birth name and date with traceable deterministic steps.': 'Vypočítané lokálne zo zadaného rodného mena a dátumu, jednoznačnými krokmi, ktoré sa dajú spätne prejsť.',
    'No output or interpretation is generated for this pillar.': 'Pre tento pilier sa negeneruje žiadny výstup ani výklad.',
    /* ------------------------------------------------------- bazi: the pillars */
    /* `hodinový pilier` and `piatich fáz` follow limitationText.ts, which already
       ships those forms to readers. Two names for the same thing in one appendix
       is worse than either name. */
    'The Day Master is the Heavenly Stem of the calculated Day Pillar.': 'Day Master je nebeský kmeň vypočítaného denného piliera.',
    'Year / Month / Day / Hour order; Hour is omitted when birth time is unknown.': 'Poradie rok / mesiac / deň / hodina; hodina sa vynecháva, keď čas narodenia nie je známy.',
    'Visible stems + primary branch elements': 'Viditeľné kmene + živly hlavných vetiev',
    'Hidden-stem and seasonal layers are reported separately below, not merged into this count.': 'Vrstva skrytých kmeňov a sezónna vrstva sú uvedené samostatne nižšie, do tohto počtu sa nezlučujú.',
    'Counts the polarity of each visible stem and branch.': 'Počíta polaritu každého viditeľného kmeňa a každej viditeľnej vetvy.',
    'The active Jie boundary selects the BaZi solar month.': 'Aktívna hranica Jie vyberá solárny mesiac BaZi.',
    'Unknown birth time': 'Neznámy čas narodenia',
    /* The 12:00 fallback is a reference the engine calculates at, not an
       estimate (odhad) - docs/product/BIRTH_TIME_INTEGRITY_CONTRACT.md. */
    'No Hour Pillar is fabricated from the local-noon fallback.': 'Z referenčných 12:00 miestneho času sa nevymýšľa žiadny hodinový pilier.',
    /* ---------------------------------------------- bazi: season, strength, luck */
    'Derived from the calculated Month Branch\'s Five Phase seasonal governance (旺相休囚死), a structural fact, not a strength verdict.': 'Odvodené zo sezónnej vlády piatich fáz vo vypočítanej mesačnej pozemskej vetve (旺相休囚死). Je to štrukturálny fakt, nie verdikt o sile.',
    'Model-derived balancing hypothesis, not a definitive Useful God (Yong Shen) determination. A different school or weighting convention may classify this chart differently.': 'Hypotéza o rovnováhe odvodená z modelu, nie definitívne určenie užitočného živlu (Yong Shen). Iná škola alebo iná konvencia váženia môže túto mapu zaradiť inak.',
    'Both listed; the natal chart does not choose a direction': 'Uvedené obe; rodná mapa smer nevyberá',
    'Direction (forward vs. reverse) follows Year Stem Yin/Yang polarity together with the body selected at onboarding: a Yang year stem with a male body, or a Yin year stem with a female body, runs forward, and the two remaining combinations run reverse. Both sequences are calculated here and the natal chart does not choose between them; the Forecast applies the rule. When the body was deliberately left undefined no direction is chosen anywhere, because the traditional rule takes a binary and no school extends it.': 'Smer (dopredu alebo dozadu) vyplýva z polarity Yin/Yang nebeského kmeňa roku spolu s telom zvoleným pri onboardingu: kmeň Yang s mužským telom alebo kmeň Yin so ženským telom ide dopredu, zvyšné dve kombinácie idú dozadu. Obe postupnosti sa tu počítajú a rodná mapa medzi nimi nevyberá; pravidlo uplatňuje Predpoveď. Ak telo zostalo zámerne neurčené, smer sa nevyberá nikde, pretože tradičné pravidlo pracuje s dvojicou a žiadna škola ho nerozširuje.',
    /* How the BaZi trace names the kind of birth time (model.ts). */
    'exact (as entered)': 'presný (tak, ako bol zadaný)',
    'approximate (your estimate, used as entered)': 'približný (tvoj odhad, použitý tak, ako bol zadaný)',
    'unknown (12:00 local noon used only for the date boundaries)': 'neznámy (12:00 miestneho poludnia slúži len na hranice dátumu)',
    'No birth time was supplied. Human Design mechanics move within a single day, so this is withheld rather than derived from the 12:00 local-noon fallback the engine calculates with. Supplying an exact birth time resolves it.': 'Čas narodenia nebol zadaný. Mechanika Human Designu sa mení v priebehu jedného dňa, preto sa tento údaj radšej neuvádza, než by sa odvodil z náhradných 12:00 miestneho poludnia, s ktorými engine počíta. Zadanie presného času narodenia ho určí.',
    'The Design moment is solved until the Sun is 88 degrees before the Personality Sun. It is reported as the calculation it is, from an estimated birth moment, and no mechanic is derived from it here.': 'Moment Designu sa hľadá dovtedy, kým je Slnko 88 stupňov pred osobnostným Slnkom. Uvádza sa ako výpočet, ktorým je - z odhadnutého momentu narodenia - a nijaká mechanika sa z neho tu neodvodzuje.',
    'Requires an exact birth time': 'Vyžaduje presný čas narodenia',
    'Derived from Type': 'Odvodené od typu',
    'Requires the completed-channel graph': 'Vyžaduje graf dokončených kanálov',
    'Requires the two Sun lines': 'Vyžaduje obe slnečné línie',
    'Follows from Type': 'Vyplýva z typu',
    'Follows from the defined centres': 'Vyplýva z definovaných centier',
    'Follows from the profile': 'Vyplýva z profilu',
    'Reads the tone of an activation': 'Číta tón aktivácie',
    'A path through the centre graph': 'Cesta cez graf centier',
    'Suppressed': 'Potlačené',
    /* Western Astrology without a birth time (model.ts): what the hour decides is
       withheld. Its own value string, so that the translation does not reach the
       bare 'Withheld' other pillars print. */
    'Withheld (no birth time)': 'Vynechané (bez času narodenia)',
    'approximate (your estimate, used as entered; checked two hours either side)': 'približný (tvoj odhad, použitý tak, ako bol zadaný; overený dve hodiny pred ním aj po ňom)',
    'unknown (planets calculated for 12:00 local time as a neutral reference; signs checked across the whole day)': 'neznámy (planéty vypočítané pre 12:00 miestneho času ako neutrálny referenčný bod; znamenia overené počas celého dňa)',
    'Not supplied (12:00 local used as a neutral reference)': 'Nezadaný (12:00 miestneho času slúži len ako neutrálny referenčný bod)',
    'Requires a birth time': 'Vyžaduje čas narodenia',
    'Requires the Ascendant': 'Vyžaduje ascendent',
    'Requires the Ascendant and Midheaven': 'Vyžaduje ascendent a Medium Coeli',
    'Requires the houses': 'Vyžaduje domy',
    'Not applied without a birth time': 'Bez času narodenia sa nepoužíva',
    'Whole Sign houses are counted from the rising sign, which needs a birth time, so no house is assigned here.': 'Domy v celých znameniach sa počítajú od ascendentu, ktorý potrebuje čas narodenia, preto sa tu žiadny dom nepriraďuje.',
    'No birth time was supplied. The Ascendant, the Midheaven, the houses, the chart ruler and angular planets move within a single day, so this is withheld rather than read from the 12:00 local-noon reference the engine calculates with. Supplying a birth time resolves it.': 'Čas narodenia nebol zadaný. Ascendent, Medium Coeli, domy, vládca mapy aj planéty na osiach sa menia v priebehu jedného dňa, preto sa tento údaj neuvádza, namiesto toho, aby sa čítal z referenčných 12:00 miestneho poludnia, s ktorými engine počíta. Zadanie času narodenia ho určí.',
    /* Western Astrology with an estimated time whose rising sign changes within
       two hours of it (model.ts): the houses, ruler and hemispheres counted from
       it are withheld; the angles are shown as provisional. */
    'Withheld (estimated time)': 'Vynechané (odhadnutý čas)',
    /* BaZi without a clock time (model.ts): the values that correct or read one. */
    'Not applicable (no birth time)': 'Neuplatňuje sa (bez času narodenia)',
    'Needs a birth time': 'Vyžaduje čas narodenia',
    'True solar time corrects a birth clock time for the birth longitude and the equation of time. With no birth time there is no clock time to correct, and the 12:00 reference the engine calculates with is not the reader\'s time.': 'Pravý slnečný čas opravuje čas narodenia na hodinách o zemepisnú dĺžku miesta narodenia a o časovú rovnicu. Bez času narodenia nie je čo opravovať a referenčných 12:00, s ktorými výpočet pracuje, nie je tvoj čas.',
    '12:00 (a reference for the date boundaries only, not a birth time)': '12:00 (len referenčný bod pre hranice dátumu, nie čas narodenia)',
    'The start age depends on the birth hour; with no birth time it is given as the range the birth date allows.': 'Vek na začiatku závisí od hodiny narodenia; bez času narodenia sa uvádza ako rozpätie, ktoré pripúšťa dátum narodenia.',
    'The start age depends on the birth hour; it is given as the range two hours either side of your estimate allows.': 'Vek na začiatku závisí od hodiny narodenia; uvádza sa ako rozpätie, ktoré pripúšťajú dve hodiny pred tvojím odhadom aj po ňom.',
    /* The trace's birth-time certainty (timeNormalization.ts), and the two
       luminaries' method rows, which were the only method rows left in English. */
    unknown: 'neznámy',
    approximate: 'približný',
    exact: 'presný',
    'SunPosition / apparent geocentric true ecliptic of date': 'SunPosition / zdanlivá geocentrická pravá ekliptika dátumu',
    'EclipticGeoMoon / geocentric true ecliptic of date': 'EclipticGeoMoon / geocentrická pravá ekliptika dátumu',
    'Not applied: the rising sign changes near your estimated time': 'Nepoužíva sa: ascendent sa blízko tvojho odhadu mení',
    'Requires a rising sign that holds near your estimated time': 'Vyžaduje ascendent, ktorý sa blízko tvojho odhadu nemení',
    'Changes within two hours of your estimated time': 'Mení sa do dvoch hodín od tvojho odhadu',
    'Your birth time is an estimate, and the rising sign changes within two hours of it. Whole Sign houses, the chart ruler and the hemispheres are all counted from the rising sign, so they are left out rather than read from one of its possible signs. A confirmed birth time resolves them.': 'Tvoj čas narodenia je odhad a ascendent sa do dvoch hodín od neho mení. Domy v celých znameniach, vládca mapy aj rozloženie do pologúľ sa počítajú od ascendentu, preto sa vynechávajú a nečítajú sa z jedného z jeho možných znamení. Potvrdený čas narodenia ich určí.',
    'Your birth time is an estimate, and which planets sit on an angle changes within two hours of it, so none is named. A confirmed birth time resolves it.': 'Tvoj čas narodenia je odhad a to, ktoré planéty stoja na osiach, sa do dvoch hodín od neho mení, preto sa žiadna neuvádza. Potvrdený čas narodenia to určí.',
    'Luck Pillars are suppressed rather than fabricated.': 'Piliere šťastia sa radšej vôbec nezobrazia, než by sa vymysleli.',
    'Birth time falls within the 23:00-23:59 "late Zi hour" window. Some traditions advance the Day Pillar to the next day for this window ("early/late Zi"); this engine uses the single Zi-hour convention where the Day Pillar does not advance until civil local midnight. This is a documented methodology choice, not universal consensus.': 'Čas narodenia padá do okna „neskorej hodiny Zi“ 23:00-23:59. Niektoré tradície v tomto okne posúvajú denný pilier na nasledujúci deň („skorá/neskorá Zi“); tento engine používa konvenciu jedinej hodiny Zi, pri ktorej sa denný pilier posunie až o občianskej miestnej polnoci. Je to zdokumentovaná metodická voľba, nie univerzálny konsenzus.',
    /* --------------------------------------------------------- bazi: TCM layer */
    /*
     * THE NON-DIAGNOSTIC DISCLAIMER.
     *
     * Three negations in the middle sentence and an instruction in the last one.
     * They are kept as three separate negations rather than collapsed into one
     * ("nie je to lekárska rada") because each names a different thing the app is
     * not doing, and a reader who takes the page for one of them is not helped by
     * having been told about the other two. The closing clause stays an
     * instruction with a subject: see a clinician, not "consider consulting".
     */
    'Traditional correspondence, non-diagnostic': 'Tradičné priradenie, nediagnostické',
    'This is a traditional, symbolic correspondence layer derived from your calculated Five Phase chart structure. It is not a medical diagnosis, not a clinical assessment, and not treatment advice. If you have a health concern, please consult a qualified clinician.': 'Toto je tradičná, symbolická vrstva priradení, odvodená z vypočítanej štruktúry tvojej mapy piatich fáz. Nie je to lekárska diagnóza, nie je to klinické posúdenie a nie je to odporúčanie liečby. Ak máš zdravotný problém, obráť sa na kvalifikovaného lekára.',
    /* ------------------------------------------------ human design: the mechanics */
    'Graph-derived classification': 'Klasifikácia odvodená z grafu',
    'Derived from resolved Type': 'Odvodené z určeného Type',
    'Mapped deterministically from the calculated Human Design Type.': 'Deterministicky priradené z vypočítaného Human Design Type.',
    'Authority hierarchy': 'Hierarchia autority',
    'Resolved in order: Solar Plexus, Sacral, Spleen, Ego, G/Self-Projected, Mental/Environmental, or Lunar.': 'Vyhodnocuje sa v poradí: Solar Plexus, Sacral, Spleen, Ego, G/Self-Projected, Mental/Environmental alebo Lunar.',
    'Personality Sun line / Design Sun line': 'Línia Personality Sun / línia Design Sun',
    'Calculated from the two Sun activations.': 'Vypočítaný z dvoch aktivácií Slnka.',
    'Centers are defined only through completed channels.': 'Centrá sú definované len cez úplné kanály.',
    'A channel is defined when both gates are activated.': 'Kanál je definovaný vtedy, keď sú aktivované obe brány.',
    'Unique gates from Personality and Design activations.': 'Unikátne brány z aktivácií Personality a Design.',
    'A graph path, not simple center presence, is used to distinguish Manifesting Generator or Manifestor mechanics.': 'Na odlíšenie mechaniky Manifesting Generator a Manifestor sa používa cesta v grafe, nie iba prítomnosť centra.',
    'Conscious Sun activation': 'Aktivácia vedomého Slnka',
    'Unconscious Sun activation': 'Aktivácia nevedomého Slnka',
    'Gate / line / color / tone / base from the birth moment.': 'Brána / línia / farba / tón / báza z momentu narodenia.',
    'Gate / line / color / tone / base from the design moment.': 'Brána / línia / farba / tón / báza z momentu Design.',
    'The Design moment is solved until the Sun is 88° before the Personality Sun.': 'Moment Design sa dopočítava dovtedy, kým Slnko nie je 88° pred Personality Sun.',
    'Unknown days before birth': 'Neznámy počet dní pred narodením',
    /*
     * THE WHOLE-DAY ENVELOPE (model.ts, envelopeHumanDesignOutputs): an unknown
     * birth time read across the whole birth date. The composite rows - a list of
     * the values a mechanic takes that day - are rebuilt by the patterns below
     * (hdValueList); these are the fixed ones. `Needs a birth time` is BaZi's
     * row as well and is already in the table above - one value, one wording.
     */
    'The same across the whole birth date': 'Rovnaké počas celého dňa narodenia',
    'Changes during the birth date': 'Mení sa počas dňa narodenia',
    'Follows from a Type that holds all day': 'Vyplýva z typu, ktorý platí celý deň',
    'Gate and line the same across the whole birth date': 'Brána aj línia sú rovnaké počas celého dňa narodenia',
    'Defined all day': 'Definované celý deň',
    'Open all day': 'Otvorené celý deň',
    'Activated all day': 'Aktivované celý deň',
    'None defined all day': 'Žiadne nie je definované celý deň',
    'None open all day': 'Žiadne nie je otvorené celý deň',
    'None all day': 'Žiadna celý deň',
    'Depends on the hour': 'Závisí od hodiny',
    'Defined (all day)': 'Definované (celý deň)',
    'Undefined (all day)': 'Nedefinované (celý deň)',
    'The whole local birth date was scanned.': 'Preveril sa celý miestny deň narodenia.',
    'The local civil birth date, 00:00 to 23:59, at the birth place': 'Miestny kalendárny deň narodenia od 00:00 do 23:59 v mieste narodenia',
    "Certified scan of every activation's gate and line, then one chart per stretch on which all of them hold": 'Certifikované preverenie brány a línie každej aktivácie, potom jedna mapa na každý úsek, v ktorom sa žiadna z nich nemení',
    'The same at every instant of the birth date: the whole day was scanned, so this holds whatever the hour of birth was.': 'Rovnaké v každom okamihu dňa narodenia: preveril sa celý deň, takže to platí bez ohľadu na hodinu narodenia.',
    'This changes during the birth date, so it is not read without a birth time. The values it takes that day are listed; none of them is chosen.': 'Počas dňa narodenia sa to mení, preto sa to bez času narodenia nečíta. Hodnoty, ktoré v ten deň nadobúda, sú vypísané; žiadna z nich sa nevyberá.',
    'The Design moment is solved until the Sun is 88° before the Personality Sun, so it moves with the birth hour; its exact instant is not given without a birth time.': 'Moment Design sa dopočítava dovtedy, kým Slnko nie je 88° pred Personality Sun, takže sa posúva s hodinou narodenia; jeho presný okamih sa bez času narodenia neuvádza.',
    /* --------------------------------------- human design: what the reader is told */
    'The felt marker of living the Strategy': 'Pocitový znak toho, že žiješ podľa Strategy',
    'The felt marker of overriding the Strategy': 'Pocitový znak toho, že Strategy obchádzaš',
    'Undefined centers are where conditioning is taken in and amplified from others. They are a real result, not a gap in the calculation.': 'Nedefinované centrá sú miesta, kde od druhých preberáš podmieňovanie a zosilňuješ ho. Sú skutočný výsledok, nie medzera vo výpočte.',
    'Angle unavailable': 'Uhol nedostupný',
    'Built from the conscious Sun and Earth plus the unconscious Sun and Earth. The angle follows from the profile. The named cross title is not asserted because this engine holds no curated table of cross names.': 'Poskladaný z vedomého Slnka a Zeme a z nevedomého Slnka a Zeme. Uhol vyplýva z profilu. Pomenovanie kríža sa netvrdí, pretože tento engine nemá ručne zostavenú tabuľku názvov krížov.',
    'Not asserted; requires a curated table of named crosses': 'Netvrdí sa; vyžaduje ručne zostavenú tabuľku pomenovaných krížov',
    'Each arrow reads the tone of one activation: tones 1-3 point Left (active, focused), tones 4-6 point Right (receptive, peripheral).': 'Každá šípka číta tón jednej aktivácie: tóny 1-3 ukazujú doľava (aktívne, sústredené), tóny 4-6 ukazujú doprava (vnímavé, periférne).',
    /* ------------------------------------------------ numerology: where it came from */
    'Birth-date structure': 'Štruktúra dátumu narodenia',
    'Day-of-month reduction': 'Redukcia dňa v mesiaci',
    'Full-name expression': 'Vyjadrenie celého mena',
    'Vowel-based inner signal': 'Vnútorný signál zo samohlások',
    'Consonant-based outer signal': 'Vonkajší signál zo spoluhlások',
    'Current calendar-year cycle': 'Aktuálny cyklus kalendárneho roka',
    'Values absent from the normalized birth name': 'Hodnoty, ktoré v normalizovanom rodnom mene chýbajú',
    'Most frequent value or values in the birth name': 'Najčastejšia hodnota alebo hodnoty v rodnom mene',
    'Initial-based response marker': 'Znak reakcie odvodený z iniciál',
    'Life Path + Expression, mid-life synthesis': 'Životná cesta + vyjadrenie, syntéza stredného veku',
    'Birth month + birth day': 'Mesiac narodenia + deň narodenia',
    'Absolute differences of the same date pairs': 'Absolútne rozdiely tých istých dvojíc z dátumu',
    'Personal Year + current calendar month': 'Osobný rok + aktuálny kalendárny mesiac',
    'Personal Month + current day of the month': 'Osobný mesiac + aktuálny deň v mesiaci',
    'No values were identified by this calculation.': 'Tento výpočet neurčil žiadne hodnoty.',
    /* --------------------------------------------- numerology: chapters and debt */
    /* Own-chain, as the methodology contract counts a debt: the position's own
       total or a total on its own way down, never one inside a part. */
    "Found in a core position's own reduction": 'Nájdené vo vlastnej redukcii základnej pozície',
    "No debt total in any core position's own reduction": 'Vo vlastnej redukcii žiadnej základnej pozície nie je súčet dlhu',
    'No karmic debt total (13, 14, 16 or 19) appears in the reduction path of any core number.': 'V redukčnej ceste žiadneho základného čísla sa neobjavuje súčet karmického dlhu (13, 14, 16 ani 19).',
    'Totals of 13, 14, 16 or 19 appearing before a core number reduces.': 'Súčty 13, 14, 16 alebo 19, ktoré sa objavia predtým, než sa základné číslo zredukuje.',
    'Age could not be determined from the birth date': 'Vek sa z dátumu narodenia nepodarilo určiť',
    'Which of the four Pinnacle age windows the current date falls inside. Read against the engine generation date, not a live clock, so the same profile always resolves to the same chapter.': 'Ktoré zo štyroch vekových okien vrcholu obsahuje aktuálny dátum. Číta sa voči dátumu, kedy engine výstup vygeneroval, nie voči živým hodinám, takže ten istý profil vyjde vždy na tú istú kapitolu.',
    /*
     * The three number themes the interpretation map writes as a sentence. The
     * other twenty-four entries in that map are keyword rows - "reflection •
     * analysis • meaning-seeking" - and they follow immediately below.
     */
    'A life-pattern emphasis on initiative, self-trust, and learning to lead from personal clarity.': 'Dôraz životného vzorca na iniciatívu, dôveru v seba a učenie sa viesť z vlastnej jasnosti.',
    'A talent-expression emphasis on originality, independent execution, and visible personal voice.': 'Dôraz vyjadrenia talentu na originalitu, samostatné prevedenie a viditeľný osobný hlas.',
    'A yearly-cycle emphasis on new beginnings, fresh decisions, and planting the next pattern.': 'Dôraz ročného cyklu na nové začiatky, čerstvé rozhodnutia a zasadenie ďalšieho vzorca.',
    /*
     * THE KEYWORD ROWS.
     *
     * Three words and two bullets. No verb, no function word, nothing the prose
     * audit's heuristics can see - and it is what a reader is shown next to their
     * Life Path and their Personal Year, so it is the row they read first.
     *
     * Nominative throughout: the row stands on its own rather than completing a
     * sentence. The bullet is kept, because it is the same list in both languages
     * and a reader comparing the two columns should see the same shape.
     *
     * They are written out whole rather than assembled from a word list. The same
     * English word is not the same Slovak word in every row - `expression` is the
     * theme `vyjadrenie` in one and the manner `vyjadrenie` of a signal in
     * another, and `power` reads as `moc` beside mastery but as plain result
     * beside `výsledky` - and a shared word table would flatten that.
     */
    /* ------------------------------------------------------ life path */
    'relationship • sensitivity • cooperation': 'vzťah • citlivosť • spolupráca',
    'expression • creativity • emotional voice': 'vyjadrenie • tvorivosť • citový hlas',
    'structure • discipline • grounded purpose': 'štruktúra • disciplína • ukotvený zmysel',
    'freedom • change • lived experience': 'sloboda • zmena • prežitá skúsenosť',
    'care • responsibility • relational harmony': 'starostlivosť • zodpovednosť • harmónia vo vzťahoch',
    'reflection • analysis • meaning-seeking': 'reflexia • analýza • hľadanie zmyslu',
    'power • mastery • material responsibility': 'moc • majstrovstvo • materiálna zodpovednosť',
    'compassion • completion • wider perspective': 'súcit • dokončovanie • širší pohľad',
    /* ----------------------------------------------------- expression */
    'diplomacy • listening • subtle expression': 'diplomacia • počúvanie • jemné vyjadrenie',
    'creative voice • communication • imagination': 'tvorivý hlas • komunikácia • predstavivosť',
    'practical skill • reliability • structured expression': 'praktická zručnosť • spoľahlivosť • štruktúrované vyjadrenie',
    'adaptability • curiosity • dynamic expression': 'prispôsobivosť • zvedavosť • dynamické vyjadrenie',
    'support • harmony • protective expression': 'podpora • harmónia • ochranné vyjadrenie',
    'depth • precision • reflective expression': 'hĺbka • presnosť • reflexívne vyjadrenie',
    'leadership • strategy • executive expression': 'vedenie • stratégia • výkonné vyjadrenie',
    'humanistic voice • compassion • integrative expression': 'humanistický hlas • súcit • integrujúce vyjadrenie',
    /* -------------------------------------------------- personal year */
    'patience • cooperation • emotional tuning': 'trpezlivosť • spolupráca • citové ladenie',
    'expression • visibility • creative growth': 'vyjadrenie • viditeľnosť • tvorivý rast',
    'foundation • discipline • practical building': 'základy • disciplína • praktické budovanie',
    'change • movement • adaptive growth': 'zmena • pohyb • prispôsobivý rast',
    'responsibility • repair • home focus': 'zodpovednosť • náprava • zameranie na domov',
    'pause • reflection • inner review': 'pauza • reflexia • vnútorná revízia',
    'power • results • material focus': 'moc • výsledky • zameranie na hmotné veci',
    'completion • release • emotional integration': 'dokončenie • uvoľnenie • citová integrácia',
    /*
     * THE TECHNICAL APPENDIX'S SHORT VALUES.
     *
     * Not readouts - a readout is a figure with its unit - but the one-word
     * answers a field can hold: a status, a boolean, an absence. The label
     * beside each is already Slovak, so an English `No` under `Retrográdny`
     * was the last English word in the row.
     */
    'Calculated locally': 'Vypočítané lokálne',
    'Calculated engine output': 'Výstup lokálneho výpočtu',
    Yes: 'Áno',
    No: 'Nie',
    None: 'Žiadne',
    'None available': 'Žiadne',
    'None identified': 'Žiadne zistené',
    'Not supplied': 'Nezadané',
    Unavailable: 'Nedostupné',
    /* The Human Design Signature and Not-Self theme, one pair per Type. */
    Satisfaction: 'Spokojnosť',
    Success: 'Úspech',
    Peace: 'Pokoj',
    Surprise: 'Prekvapenie',
    Frustration: 'Frustrácia',
    Bitterness: 'Horkosť',
    Anger: 'Hnev',
    Disappointment: 'Sklamanie',
    /* The BaZi polarity as a standalone value; the prose already says jin and jang. */
    Yin: 'Jin',
    Yang: 'Jang',
    /* Timezone confidence and place precision, as the resolver names them. */
    resolved: 'určené',
    ambiguous: 'nejednoznačné',
    unavailable: 'nedostupné',
    searched: 'vyhľadané',
    'map-selected': 'vybrané na mape',
    'text-only': 'len text',
    /* Fixed astrology appendix values. */
    'Whole Sign angles': 'Uhly v celých znameniach (Whole Sign)',
    '3 or more bodies in one sign or house': '3 alebo viac telies v jednom znamení alebo dome',
    'Ten calculated body positions': 'Desať vypočítaných polôh telies',
    'Ten calculated body positions by Whole Sign house': 'Desať vypočítaných polôh telies podľa domov Whole Sign',
    'Eastern = houses 1,2,3,10,11,12 (near Ascendant). Western = houses 4-9 (near Descendant). Southern = houses 7-12 (above horizon, MC side). Northern = houses 1-6 (below horizon, IC side).': 'Východ = domy 1, 2, 3, 10, 11, 12 (pri ascendente). Západ = domy 4–9 (pri descendente). Juh = domy 7–12 (nad obzorom, na strane MC). Sever = domy 1–6 (pod obzorom, na strane IC).',
};
/** `14.28` -> `14,28`: a Slovak reader writes the fraction with a comma. */
const decimalComma = (figure) => figure.replace('.', ',');
const PATTERNS = [
    /*
     * AN ANGLE READ FROM AN ESTIMATE (model.ts): `Provisional: at your estimated
     * time. Within two hours of it: Leo until about 10:25, Virgo from about 10:25
     * to 13:05, Libra from about 13:05`, the trace row `Virgo 17°34′ (provisional:
     * …)`, and the stable forms. The window phrase is rebuilt span by span; a span
     * that does not parse leaves the whole value English rather than half-Slovak.
     */
    [/^Provisional: at your estimated time\. Within two hours of it: (.+)$/,
        (m) => { const phrase = windowPhraseSk(m[1]); return phrase ? `Predbežné: pri tvojom odhadovanom čase. Do dvoch hodín od neho: ${phrase}` : null; }],
    [/^Changes during the birth date: (.+)$/,
        (m) => { const phrase = windowPhraseSk(m[1]); return phrase ? `Mení sa počas dňa narodenia: ${phrase}` : null; }],
    /* A BaZi pillar row read from an estimate: `Wu Wu / 戊午 / Yang Earth Horse / cycle 55 (provisional: …)`. */
    [/^(.+ \/ .+ \/ .+ \/ cycle \d+) \(provisional: (.+)\)$/,
        (m) => {
            const phrase = windowPhraseSk(m[2]);
            const head = render(m[1]) ?? m[1];
            return phrase ? `${head} (predbežné: ${phrase})` : null;
        }],
    /* The figures are carried through untouched: a technical number never changes with the language. */
    [/^Start age (~?[\d.]+(?:–[\d.]+)?) \(forward\) \/ (~?[\d.]+(?:–[\d.]+)?) \(reverse\)$/,
        (m) => `Vek na začiatku ${m[1]} (dopredu) / ${m[2]} (dozadu)`],
    [/^At your estimated time; the same sign across two hours either side\. Ecliptic longitude ([\d.]+°)$/,
        (m) => `Pri tvojom odhadovanom čase; to isté znamenie dve hodiny pred ním aj po ňom. Ekliptikálna dĺžka ${m[1]}`],
    [/^([A-Z][a-z]+) (\d+°\d\d′) \(provisional: (.+)\)$/,
        (m) => {
            const sign = SIGN_NOMINATIVE[m[1].toLowerCase()];
            const phrase = windowPhraseSk(m[3]);
            return sign && phrase ? `${sign} ${m[2]} (predbežné: ${phrase})` : null;
        }],
    [/^([A-Z][a-z]+) (\d+°\d\d′) \(the same sign across the window\)$/,
        (m) => { const sign = SIGN_NOMINATIVE[m[1].toLowerCase()]; return sign ? `${sign} ${m[2]} (to isté znamenie v celom okne)` : null; }],
    /*
     * THE ASTROLOGY APPENDIX'S RAW ROWS, which printed English sign, planet and
     * phase names beside Slovak labels: the planetary positions
     * (`154.580675° / Virgo 4°35′`), the chart ruler's note (`Scorpio 7°38′ /
     * House 1`) and count row (`Pluto / Scorpio`), a bare ruler (`Mercury`) and
     * the Moon phase count (`Waxing Crescent / 44.399011°`). The numbers are
     * carried through untouched.
     */
    [/^([\d.]+°) \/ ([A-Z][a-z]+) (\d+°\d\d′)$/,
        (m) => { const sign = SIGN_NOMINATIVE[m[2].toLowerCase()]; return sign ? `${m[1]} / ${sign} ${m[3]}` : null; }],
    [/^([A-Z][a-z]+) (\d+°\d\d′) \/ House (\d{1,2})$/,
        (m) => { const sign = SIGN_NOMINATIVE[m[1].toLowerCase()]; return sign ? `${sign} ${m[2]} / dom ${m[3]}` : null; }],
    [/^(Sun|Moon|Mercury|Venus|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto) \/ ([A-Z][a-z]+)$/,
        (m) => {
            const body = BODY_NOMINATIVE[m[1].toLowerCase()];
            const sign = SIGN_NOMINATIVE[m[2].toLowerCase()];
            return body && sign ? `${body} / ${sign}` : null;
        }],
    [/^(Sun|Moon|Mercury|Venus|Uranus|Neptune)$/, (m) => BODY_NOMINATIVE[m[1].toLowerCase()] ?? null],
    [/^(New Moon|Waxing Crescent|First Quarter|Waxing Gibbous|Full Moon|Waning Gibbous|Third Quarter|Waning Crescent) \/ ([\d.]+°)$/,
        (m) => (SK[m[1]] ? `${SK[m[1]]} / ${m[2]}` : null)],
    /*
     * THE FIVE-PHASE TALLY: `Wood 1 / Fire 2 / Earth 2 / Metal 3 / Water 0`.
     *
     * The BaZi glance strip and the technical row print the raw counts in the
     * engine's own form, and the Slovak strip showed the English phase names
     * beside a Slovak label. The numbers are carried through untouched; only the
     * five names are said in Slovak, as the reading says them.
     */
    [/^Wood (\d+) \/ Fire (\d+) \/ Earth (\d+) \/ Metal (\d+) \/ Water (\d+)$/,
        (m) => `Drevo ${m[1]} / Oheň ${m[2]} / Zem ${m[3]} / Kov ${m[4]} / Voda ${m[5]}`],
    /*
     * THE NUMEROLOGY POSITION AND ITS NUMBER: `Hidden Passion 1`.
     *
     * The synthesis prose already says „skrytá vášeň 1" - factPhrasing.ts builds
     * that - and the evidence chain underneath it said `Hidden Passion 1`, so the
     * same result carried two names on one screen depending on which half of the
     * page the reader was looking at. These are LABELS in the style guide's sense:
     * ordinary English words naming a row, not canonical terms a reader would
     * check against another source.
     */
    [/^(Life Path|Expression|Soul Urge|Personality|Birth Day|Maturity|Balance|Attitude|Hidden Passion|Karmic Lesson|Karmic Debt|Pinnacle|Challenge|Personal Year|Personal Month|Personal Day) (\d+)$/,
        (m) => {
            const position = NUMEROLOGY_POSITION[m[1]];
            return position ? `${position} ${m[2]}` : null;
        }],
    /*
     * THE DEFINED CHANNEL: `Channel 16-48 defined`.
     *
     * The channels reach the synthesis as evidence in their own right now - they
     * are the most specific structural result Human Design produces - so the
     * appendix prints one row per defined channel and each needed a Slovak form.
     */
    [/^Channel (\d+-\d+) defined$/, (m) => `definovaný kanál ${m[1]}`],
    /*
     * WHAT A LUMINARY IS FOR: `the Virgo Sun: what it reaches for`.
     *
     * Distinct from the placement row above it, which says how that luminary
     * BEHAVES. The sign carries both and the synthesis reads them separately, so
     * the appendix has to keep them apart in Slovak too.
     */
    [/^the ([A-Z][a-z]+) (Sun|Moon): what it reaches for$/,
        (m) => {
            const body = BODY_NOMINATIVE[m[2].toLowerCase()];
            return body ? `to, o čo ide ${body} ${inSign(m[1])}` : null;
        }],
    /*
     * THE ASPECT AS THE EVIDENCE CHAIN PRINTS IT: `Mercury Square Saturn (orb 2.2°)`.
     *
     * The appendix's own aspect row already translates; this is the shorter form
     * the synthesis adapter emits, and it was not covered. Slovak takes a decimal
     * comma in reader-facing prose, which the orb here is.
     */
    [/^([A-Z][a-z]+(?: Node)?) (Conjunction|Sextile|Square|Trine|Opposition) ([A-Z][a-z]+(?: Node)?) \(orb ([\d.]+)°\)$/,
        (m) => {
            const a = BODY_NOMINATIVE[m[1].toLowerCase()];
            const b = BODY_NOMINATIVE[m[3].toLowerCase()];
            const aspect = ASPECT_NAME[m[2].toLowerCase()];
            return a && b && aspect
                ? `${a} ${aspect} ${b} (orb ${m[4]}°)`
                : null;
        }],
    /* The same row without a birth time: no orb (the one at 12:00 is not the
       reader's), and "in orb all day" when the scan proved it holds. */
    [/^([A-Z][a-z]+(?: Node)?) (Conjunction|Sextile|Square|Trine|Opposition) ([A-Z][a-z]+(?: Node)?)( \(in orb all day\))?$/,
        (m) => {
            const a = BODY_NOMINATIVE[m[1].toLowerCase()];
            const b = BODY_NOMINATIVE[m[3].toLowerCase()];
            const aspect = ASPECT_NAME[m[2].toLowerCase()];
            return a && b && aspect
                ? `${a} ${aspect} ${b}${m[4] ? ' (v orbe celý deň)' : ''}`
                : null;
        }],
    /*
     * THE ASPECT'S ORB NOTE, WHICH IS A SENTENCE AND WAS TREATED AS A READOUT.
     * Every figure passes through; the four words around them move.
     */
    [/^(Fusion|Flow|Tension|Polarity) marker\. Angular distance ([\d.]+)° against exact (\d+)°; max orb (\d+)°\.$/,
        (m) => {
            const marker = ASPECT_MARKER[m[1]];
            return marker
                ? `${marker}. Uhlová vzdialenosť ${m[2]}° oproti presným ${m[3]}°; `
                    + `najväčší povolený orb ${m[4]}°.`
                : null;
        }],
    /*
     * THE ASPECT WHEN THE BIRTH TIME IS NOT KNOWN EXACTLY (model.ts, describeAspectUnderUncertainty).
     *
     * An unknown time prints no orb on the card: the aspect is "in orb all day" when the scan
     * proved it, otherwise the 12:00 calculation contains it and without an exact time it cannot be said whether it holds across the
     * possible birth times - which is not "only at the reference time", because the aspect can hold
     * at other instants too. An estimate keeps its orb and names it as the orb at the estimate.
     * Every figure passes through byte for byte.
     */
    [/^In orb all day; the exact orb depends on the birth time\.$/,
        () => 'V orbe celý deň; presný orb závisí od času narodenia.'],
    [/^The 12:00 calculation includes this aspect, but without an exact birth time we cannot tell whether it holds all day\.$/,
        () => 'Výpočet pre 12:00 tento aspekt obsahuje, ale bez presného času narodenia nevieme, či platí počas celého dňa.'],
    [/^Orb (\d+°\d\d′) at your estimated time(; not in orb throughout the two hours either side)?$/,
        (m) => `Orb ${m[1]} pri tvojom odhadovanom čase${m[2] ? '; v rozmedzí dvoch hodín okolo odhadu nie je v orbe po celý čas' : ''}`],
    [/^(Fusion|Flow|Tension|Polarity) marker\. Exact angle (\d+)°; max orb (\d+)°\.$/,
        (m) => {
            const marker = ASPECT_MARKER[m[1]];
            return marker ? `${marker[0].toUpperCase()}${marker.slice(1)}. Presný uhol ${m[2]}°; najväčší povolený orb ${m[3]}°.` : null;
        }],
    [/^Major aspects within configured orb limits at the 12:00 reference(?:; (\d+) of (\d+) are in orb all day)?$/,
        (m) => `Hlavné aspekty v rámci nastavených limitov orbu v referenčnom čase 12:00${m[1] ? `; v orbe celý deň: ${m[1]} z ${m[2]}` : ''}`],
    [/^Major aspects within configured orb limits at your estimated time(?:; (\d+) of (\d+) are in orb throughout the two hours either side)?$/,
        (m) => `Hlavné aspekty v rámci nastavených limitov orbu pri tvojom odhadovanom čase${m[1] ? `; v rozmedzí dvoch hodín okolo odhadu je po celý čas v orbe: ${m[1]} z ${m[2]}` : ''}`],
    [/^(\d+) within orb( \(at your estimated time\))?$/,
        (m) => `${m[1]} v orbe${m[2] ? ' (pri tvojom odhadovanom čase)' : ''}`],
    [/^(\d+) at the 12:00 reference(?: \((\d+) in orb all day\))?$/,
        (m) => `${m[1]} v referenčnom čase 12:00${m[2] ? ` (${m[2]} v orbe celý deň)` : ''}`],
    [/^(\d+) at your estimated time(?: \((\d+) in orb throughout the two hours either side\))?$/,
        (m) => `${m[1]} pri tvojom odhadovanom čase${m[2] ? ` (${m[2]} po celý čas v orbe v rozmedzí dvoch hodín okolo odhadu)` : ''}`],
    /*
     * THE ASPECT VALUE ITSELF: `Venus trine Neptune`.
     *
     * The appendix's LABEL for the same row already reads „Aspekt: Venuša — trigón
     * — Neptún", so the row printed the planets in Slovak on one line and in
     * English on the next. Lower case here, because the engine's value form is
     * lower case and the label form is not.
     */
    [/^([A-Z][a-z]+(?: Node)?) (conjunction|sextile|square|trine|opposition) ([A-Z][a-z]+(?: Node)?)$/,
        (m) => {
            const a = BODY_NOMINATIVE[m[1].toLowerCase()];
            const b = BODY_NOMINATIVE[m[3].toLowerCase()];
            const aspect = ASPECT_NAME[m[2]];
            return a && b && aspect ? `${a} ${aspect} ${b}` : null;
        }],
    /*
     * THE DAY MASTER STRENGTH READOUT: `weak (support 3.75 / drain 8.66)`.
     * The verdict word is the same one the reading uses in prose, so it comes
     * from the same table rather than a second copy of it.
     */
    [/^(strong|moderately-strong|balanced|moderately-weak|weak|indeterminate) \(support ([\d.]+) \/ drain ([\d.]+)\)$/,
        (m) => {
            const tendency = STRENGTH_TENDENCY[m[1]];
            return tendency
                ? `${tendency} (opora ${m[2]} / odčerpanie ${m[3]})`
                : null;
        }],
    /*
     * THE BALANCE READOUT: `Support 3.75 / Drain 8.66 / confidence high`.
     *
     * Three ordinary English words around three engine figures, in the field a
     * reader opens precisely to check those figures.
     *
     * THE FIGURES KEEP THE DOT. Slovak reader-facing prose takes a decimal comma
     * and this is not prose - it is a readout whose entire purpose is to be
     * compared against what the engine produced, and localizationInvariants
     * asserts that no number in the appendix moves with the language. The words
     * move; the figures are the same bytes in both.
     */
    [/^Support ([\d.]+) \/ Drain ([\d.]+) \/ confidence (low|medium|high)$/,
        (m) => {
            const confidence = CONFIDENCE_LEVEL[m[3]];
            return confidence
                ? `Opora ${m[1]} / odčerpanie ${m[2]} / `
                    + `spoľahlivosť ${confidence}`
                : null;
        }],
    /*
     * THE ASPECT'S ORB READOUT: `Orb 0°40′ / angle 119.340620° / exact 120° / max orb 6°`.
     *
     * A slash-separated readout rather than the sentence form two patterns above,
     * which is why it survived that one. Three ordinary English words label three
     * engine figures; the figures pass through byte for byte, because this is the
     * field a reader opens to check them.
     */
    [/^Chiron and the asteroids are calculated for births between (\d{4}) and (\d{4})\.$/,
        (m) => `Chiron a planétky sa počítajú pre narodenia medzi rokmi ${m[1]} a ${m[2]}.`],
    [/^at most ([\d.]+)" of apparent longitude against JPL Horizons, (\d{4})-(\d{4})$/,
        (m) => `najviac ${m[1]}" zdanlivej ekliptikálnej dĺžky oproti JPL Horizons, ${m[2]}-${m[3]}`],
    [/^((?:Whole Sign|Equal House|Porphyry|Placidus) \d{1,2}(?:, (?:Whole Sign|Equal House|Porphyry|Placidus) \d{1,2})*)$/,
        (m) => m[1].split(', ').map((part) => {
            const pair = /^(Whole Sign|Equal House|Porphyry|Placidus) (\d{1,2})$/.exec(part);
            const names = { 'Whole Sign': 'celé znamenia', 'Equal House': 'rovnaké domy', Porphyry: 'Porfyrov systém', Placidus: 'Placidus' };
            return pair ? `${names[pair[1]]} ${pair[2]}` : part;
        }).join(', ')],
    [/^Semisextile (\d+)° \/ Semisquare (\d+)° \/ Sesquiquadrate (\d+)° \/ Quincunx (\d+)° \(the major aspects use (\d+)° \/ (\d+)° \/ (\d+)° by the bodies involved\)$/,
        (m) => `Semisextil ${m[1]}° / Semikvadrát ${m[2]}° / Sesquikvadrát ${m[3]}° / Kvinkunx ${m[4]}° (hlavné aspekty používajú ${m[5]}° / ${m[6]}° / ${m[7]}° podľa zúčastnených telies)`],
    [/^Unavailable: Placidus has no solution at latitude (-?[\d.]+): it needs every ecliptic point to rise and set, which holds only between (-?[\d.]+) and (-?[\d.]+) degrees \(the polar circles\)\.$/,
        (m) => `Nedostupné: Placidus nemá riešenie pre zemepisnú šírku ${m[1]}: potrebuje, aby každý bod ekliptiky vychádzal aj zapadal, čo platí len medzi ${m[2]} a ${m[3]} stupňami (polárne kruhy).`],
    [/^Orb (\d+)°(\d+)′ \/ angle ([\d.]+)° \/ exact (\d+)° \/ max orb (\d+)°$/,
        (m) => `Orb ${m[1]}°${m[2]}′ / uhol ${m[3]}° / presne ${m[4]}° / `
            + `najväčší orb ${m[5]}°`],
    /* The same readout for a time that is not exact: the figures are the engine's, the label says whose moment they belong to. */
    [/^Orb (\d+)°(\d+)′ \/ angle ([\d.]+)° \/ exact (\d+)° \/ max orb (\d+)° \(at your estimated time(; not in orb throughout the two hours either side)?\)$/,
        (m) => `Orb ${m[1]}°${m[2]}′ / uhol ${m[3]}° / presne ${m[4]}° / najväčší orb ${m[5]}° `
            + `(pri tvojom odhadovanom čase${m[6] ? '; v rozmedzí dvoch hodín okolo odhadu nie je v orbe po celý čas' : ''})`],
    [/^(In orb all day|Not in orb throughout the day) \/ exact (\d+)° \/ max orb (\d+)° \/ reference-time readout \(12:00\), not the birth moment: orb (\d+°\d\d′), angle ([\d.]+)°$/,
        (m) => `${m[1] === 'In orb all day' ? 'V orbe celý deň' : 'Nie je v orbe počas celého dňa'} / presne ${m[2]}° / najväčší orb ${m[3]}° / `
            + `údaj z referenčného času (12:00), nie z okamihu narodenia: orb ${m[4]}, uhol ${m[5]}°`],
    /*
     * THE KARMIC-DEBT READOUT: `Birth Day Number:16, Soul Urge Number:14`.
     *
     * A comma-joined list of position names and the compound value each reduced
     * from, and the only place `Expression / Destiny Number` appears with a slash
     * in it. The names are the same ones the reduction traces use, so they come
     * from the same table rather than a second copy; every figure passes through.
     */
    [/^((?:[A-Z][A-Za-z ]*(?: \/ [A-Z][A-Za-z ]*)? Number:\d+)(?:, [A-Z][A-Za-z ]*(?: \/ [A-Z][A-Za-z ]*)? Number:\d+)*)$/,
        (m) => {
            const parts = m[1].split(', ').map((part) => {
                const pair = /^(.+ Number):(\d+)$/.exec(part);
                if (!pair)
                    return null;
                const name = TRACE_NAME[pair[1]]
                    ?? TRACE_NAME[pair[1].replace('Expression / Destiny Number', 'Expression Number')];
                return name ? `${name}: ${pair[2]}` : null;
            });
            return parts.every(Boolean) ? parts.join(', ') : null;
        }],
    /*
     * THE FORECAST'S OWN CURRENT FACTS.
     *
     * New engine strings, produced by asking the existing engines about a period
     * rather than about a birth. Same rule as everywhere else in this file: the
     * pinyin stems and branches, the planet names and every figure pass through
     * untouched, and only the English words framing them are translated.
     */
    [/^Personal (Year|Month|Day) (\d+)$/, (m) => {
            const scale = { Year: 'rok', Month: 'mesiac', Day: 'de\u0148' }[m[1]];
            return scale ? `Osobn\u00fd ${scale} ${m[2]}` : null;
        }],
    [/^Annual pillar ([A-Z][a-z]+) ([A-Z][a-z]+)$/,
        (m) => `ro\u010dn\u00fd pilier ${m[1]} ${m[2]}`],
    [/^Luck pillar ([A-Z][a-z]+) ([A-Z][a-z]+)$/,
        (m) => `pilier \u0161\u0165astia ${m[1]} ${m[2]} (Da Yun)`],
    [/^Transiting ([A-Z][a-z]+) (Conjunction|Sextile|Square|Trine|Opposition) natal ([A-Z][a-z]+)$/,
        /*
         * The two adjectives agree with the bodies they stand in front of. Slnko and
         * Pluto are neuter, Venu\u0161a and Zem feminine, the rest masculine, so a single
         * form for all thirteen produced \u201erodn\u00fd Slnko" and \u201erodn\u00fd Venu\u0161a".
         */
        (m) => {
            const transiting = BODY_NOMINATIVE[m[1].toLowerCase()];
            const natal = BODY_NOMINATIVE[m[3].toLowerCase()];
            const aspect = ASPECT_NAME[m[2].toLowerCase()];
            if (!transiting || !natal || !aspect)
                return null;
            const moving = { m: 'tranzituj\u00faci', f: 'tranzituj\u00faca', n: 'tranzituj\u00face' }[BODY_GENDER[m[1].toLowerCase()] ?? 'm'];
            const born = { m: 'rodn\u00fd', f: 'rodn\u00e1', n: 'rodn\u00e9' }[BODY_GENDER[m[3].toLowerCase()] ?? 'm'];
            return `${moving} ${transiting} \u2014 ${aspect} \u2014 ${born} ${natal}`;
        }],
    /* `inSign` and not the nominative: the preposition in `v znameni` governs
       the genitive, so that frame printed `v znameni Panna` with the sign left
       undeclined - and the astrology reading two screens away already says
       `v Panne`, which is the same twelve forms this can simply reuse. */
    [/^Transiting Sun in ([A-Z][a-z]+)$/, (m) => {
            const sign = SIGN_NOMINATIVE[m[1].toLowerCase()];
            return sign ? `tranzituj\u00face Slnko ${inSign(m[1])}` : null;
        }],
    /* The eight phase names are already in the exact-match table above, so this
       reuses them rather than declaring a second list that could drift. */
    [/^Moon phase: (.+)$/, (m) => {
            const phase = SK[m[1]];
            return phase ? `f\u00e1za Mesiaca: ${phase}` : null;
        }],
    /* The Attitude number's trace: `birth month 8 + birth day 28`. */
    [/^birth month (\d+) \+ birth day (\d+)$/,
        (m) => `mesiac narodenia ${m[1]} + deň narodenia ${m[2]}`],
    /* The seasonal governance value, which states the ruling phase and the Day
       Master's standing in one line. Noun frame again, for the same reason: the
       five phases are not all the same gender. */
    [/^Month ruled by (Wood|Fire|Earth|Metal|Water); Day Master (Wood|Fire|Earth|Metal|Water) is seasonally (prosperous|aided|resting|trapped|dead)$/, (m) => {
            const ruler = PHASE[m[1]];
            const master = PHASE[m[2]];
            const state = SEASONAL_NOUN[m[3]];
            return ruler && master && state
                ? `Mesiacu vládne ${ruler}; sezónny stav Day Mastera (${master}): ${state}`
                : null;
        }],
    /*
     * THE RELATIONSHIP ROW'S VALUE: `Year: Mao / Day: You`.
     *
     * A value, not a label - which is why it belongs here and not in
     * i18n/labels/bazi.ts. The pinyin branch is the engine's and passes through;
     * the position word is ordinary and takes the nominative, not the `roka` that
     * `Pilier roka` wants.
     */
    [/^(Year|Month|Day|Hour): (\w+) \/ (Year|Month|Day|Hour): (\w+)$/, (m) => {
            const first = PILLAR_NOMINATIVE[m[1]];
            const second = PILLAR_NOMINATIVE[m[3]];
            return first && second ? `${first}: ${m[2]} / ${second}: ${m[4]}` : null;
        }],
    /*
     * THE STRENGTH-FACTOR TRACE: `Fire / seasonal dead (x0.5) / support / weight 0.5`.
     * Every figure passes through; only the four words around them move.
     */
    [/^(Wood|Fire|Earth|Metal|Water) \/ seasonal (prosperous|aided|resting|trapped|dead) \(x([\d.]+)\) \/ (support|drain) \/ weight ([\d.]+)$/, (m) => {
            const phase = PHASE[m[1]];
            const state = SEASONAL_NOUN[m[2]];
            const role = m[4] === 'support' ? 'podpora' : 'odčerpanie';
            return phase && state
                ? `${phase} / sezónne ${state} (x${m[3]}) / ${role} / váha ${m[5]}`
                : null;
        }],
    /*
     * THE SEASONAL STATE, as a standalone appendix VALUE.
     *
     * SEASONAL_STATE holds masculine adjectives, and the five phases are not all
     * masculine - drevo is neuter, zem and voda feminine - so `Zem je sezónne
     * odpočívajúci` is what a direct rendering produces. The frame is built round
     * a NOUN instead, which no gender can disagree with, and the phase arrives in
     * the genitive from the table that already holds it.
     */
    [/^(Wood|Fire|Earth|Metal|Water) is seasonally (prosperous|aided|resting|trapped|dead)$/, (m) => {
            const phase = PHASE_GENITIVE[m[1]];
            const state = SEASONAL_NOUN[m[2]];
            return phase && state ? `Sezónny stav fázy ${phase}: ${state}` : null;
        }],
    /* ------------------------------------------ THE GLANCE STRIP, ASTROLOGY */
    /*
     * THE SIGN AND DEGREE READOUT: `Virgo 4°35′`.
     *
     * This one is a deliberate change to the rule at the top of this file, and it
     * is worth saying why. A readout stays English where translating half of it
     * would fork the vocabulary - `Raw longitude 182.5115 / direct` has no Slovak
     * half. This one is not that. The label beside it already reads `Slnko`, the
     * prose under it already reads `v Panne`, and only the value between them
     * still said `Virgo` - so English here was not consistency, it was the last
     * fragment of a row whose other two thirds had already moved.
     *
     * The degree passes through character for character. It is the calculation,
     * and the whole point of showing it is that a reader can check it.
     */
    [/^([A-Za-z]+) (\d{1,2}°\d{2}′)$/, (m) => {
            const sign = SIGN_NOMINATIVE[m[1].toLowerCase()];
            return sign ? `${sign} ${m[2]}` : null;
        }],
    /*
     * THE BIG THREE, AS ONE LINE: `Virgo Sun · Libra Moon · Scorpio rising`.
     *
     * Slovak turns this round - the body first, then where it stands - because
     * `Panna Slnko` is not a phrase in Slovak and `Slnko v Panne` is the phrase
     * every reader already knows. The preposition alternates with the sign, so it
     * is read from the UI dictionary rather than glued on: `v Panne`, but `vo
     * Váhach`. `rising` is the ascendant, and stays a common noun in the middle
     * of a list, exactly as `rising` does.
     *
     * Two placements or three: the engine drops the ascendant when the birth time
     * was estimated. Any part this file cannot name returns null for the whole
     * line, because a Big Three reading half in each language is worse than one
     * honestly in English.
     */
    [/^[A-Za-z]+ (?:Sun|Moon|rising)(?: · [A-Za-z]+ (?:Sun|Moon|rising))+$/, (m) => {
            const parts = m[0].split(' · ').map((part) => {
                const piece = part.match(/^([A-Za-z]+) (Sun|Moon|rising)$/);
                if (!piece || !SIGN_NOMINATIVE[piece[1].toLowerCase()])
                    return null;
                const place = inSign(piece[1]);
                if (piece[2] === 'rising')
                    return `ascendent ${place}`;
                const name = BODY_NOMINATIVE[piece[2].toLowerCase()];
                return name ? `${name} ${place}` : null;
            });
            return parts.every((part) => part !== null) ? parts.join(' · ') : null;
        }],
    /*
     * THE TIGHTEST ASPECT: `Sun Trine Neptune`.
     *
     * Same three parts and the same em-dash frame the aspect ROW LABEL already
     * uses in i18n/labels/westernAstrology.ts, so the mark on the card and the
     * heading of the entry that explains it read identically. The capitalised
     * aspect word is what tells this apart from the appendix's own aspect value,
     * which the engine writes lower case (`Sun trine Neptune`) and which stays a
     * readout beside a readout.
     *
     * Either body can be a lunar node, which is named like a body here.
     */
    [/^(\w+(?: Node)?) (Conjunction|Opposition|Square|Trine|Sextile) (\w+(?: Node)?)$/, (m) => {
            const a = BODY_NOMINATIVE[m[1].toLowerCase()] ?? NODE_NAME[m[1].toLowerCase()];
            const b = BODY_NOMINATIVE[m[3].toLowerCase()] ?? NODE_NAME[m[3].toLowerCase()];
            const aspect = ASPECT_NAME[m[2].toLowerCase()];
            return a && b && aspect ? `${a} — ${aspect} — ${b}` : null;
        }],
    /*
     * THE ELEMENT AND MODALITY BALANCES, and the dominant one on its own.
     *
     * The counts are the calculation and pass through; only the seven words in
     * front of them move. The balance is matched whole, in the order the engine
     * writes it, rather than as a loose list of `<word> <number>` pairs - that
     * looser shape would also have claimed the BaZi Five Elements count, which is
     * a different five words and is not this pillar's to translate.
     */
    [/^Fire (\d+) \/ Earth (\d+) \/ Air (\d+) \/ Water (\d+)$/,
        (m) => `${capitalised(CHART_ELEMENT.Fire.nominative)} ${m[1]} / ${capitalised(CHART_ELEMENT.Earth.nominative)} ${m[2]} / ${capitalised(CHART_ELEMENT.Air.nominative)} ${m[3]} / ${capitalised(CHART_ELEMENT.Water.nominative)} ${m[4]}`],
    [/^Cardinal (\d+) \/ Fixed (\d+) \/ Mutable (\d+)$/,
        (m) => `${capitalised(CHART_MODALITY.Cardinal)} ${m[1]} / ${capitalised(CHART_MODALITY.Fixed)} ${m[2]} / ${capitalised(CHART_MODALITY.Mutable)} ${m[3]}`],
    [/^(Fire|Earth|Air|Water)$/,
        (m) => (CHART_ELEMENT[m[1]] ? capitalised(CHART_ELEMENT[m[1]].nominative) : null)],
    [/^(Cardinal|Fixed|Mutable)$/,
        (m) => (CHART_MODALITY[m[1]] ? capitalised(CHART_MODALITY[m[1]]) : null)],
    /*
     * THE PLANET READOUT'S OWN NOTE: `Raw longitude 154.5807°` and, under it,
     * `Earth element / Mutable modality / direct`.
     *
     * The rule at the top of this file keeps a READOUT English where translating
     * half of it would fork the vocabulary. These two are not that. Neither has an
     * English half to protect: the first is one label in front of a figure, the
     * second is three words the pillar already prints in Slovak two rows higher
     * (`Prevažujúci živel: Zem`). The figure and the degree sign pass through
     * character for character - they are the calculation, and showing them is so
     * a reader can check it.
     */
    [/^Raw longitude ([\d.]+°)$/, (m) => `Ekliptikálna dĺžka ${m[1]}`],
    [/^Raw longitude ([\d.]+°) \/ (direct|retrograde|stationary)$/,
        (m) => `Ekliptikálna dĺžka ${m[1]} / ${MOTION_STATE[m[2]]}`],
    [/^(Fire|Earth|Air|Water) element \/ (Cardinal|Fixed|Mutable) modality \/ (direct|retrograde|stationary)$/,
        (m) => `živel ${CHART_ELEMENT[m[1]].nominative} / kvalita ${CHART_MODALITY[m[2]]} / ${MOTION_STATE[m[3]]}`],
    /* ----------------------------------------------- THE GLANCE STRIP, BAZI */
    /*
     * THE YEAR ANIMAL: `Fire Rabbit`.
     *
     * The one line in this pillar a reader already knows the answer to before
     * they arrive, which is exactly why it opens the card - and why it reading
     * `Fire Rabbit` under a Slovak heading was the most visible English left.
     * Slovak puts the phase in front as an adjective and agrees it with the
     * animal; both halves are looked up, so an animal or a phase this file does
     * not name leaves the line English rather than half built.
     */
    [/^(Wood|Fire|Earth|Metal|Water) ([A-Z][a-z]+)$/, (m) => {
            const animal = ZODIAC_ANIMAL[m[2]];
            const adjective = animal ? PHASE_ADJECTIVE[m[1]]?.[animal.gender] : undefined;
            return animal && adjective ? `${adjective} ${animal.name}` : null;
        }],
    /*
     * THE DAY MASTER STRENGTH TENDENCY, on its own.
     *
     * The same six values the compound Day Master fact already renders further
     * down, read from the same table, because the card and the sentence beneath
     * it are talking about one thing and must call it one name.
     */
    [/^(strong|moderately-strong|balanced|moderately-weak|weak|indeterminate)$/,
        (m) => STRENGTH_TENDENCY[m[1]] ?? null],
    /*
     * THE HOUSE PLACEMENT LINE, one per body.
     *
     * Returns null unless the body is one this file names, so a line can never
     * come back half Slovak. The SIGN and DEGREE that precede it in the same cell
     * are a separate piece and stay as the engine wrote them - see the note on
     * the sign readouts below.
     */
    [/^(.+?) is placed in House (\d{1,2}) using Whole Sign Houses\.$/, (m) => {
            const body = BODY_NOMINATIVE[m[1].trim().toLowerCase()] ?? NODE_NAME[m[1].trim().toLowerCase()];
            return body ? `${body} je v dome ${m[2]} podľa systému celých znamení (Whole Sign).` : null;
        }],
    [/^Ecliptic longitude ([\d.]+)°$/, (m) => `Ekliptikálna dĺžka ${m[1]}°`],
    /* The bare house a placement resolves to, as a value. */
    [/^House (\d{1,2})$/, (m) => `Dom ${m[1]}`],
    /*
     * THE CURRENT CHAPTER.
     *
     * A key-output value that is a small sentence rather than a readout, and the
     * most visible one in the numerology appendix. `kapitola` is feminine, so the
     * ordinal is too.
     */
    [/^(First|Second|Third|Fourth) — Pinnacle (\d+) \/ Challenge (\d+)$/,
        (m) => `${CHAPTER_ORDINAL[m[1]]} — Vrchol ${m[2]} / Výzva ${m[3]}`],
    /*
     * THE REDUCTION TRACES. Every segment has to be a position this file names,
     * or the whole line stays English - a half-translated trace would be worse
     * than an English one, because it would look checked.
     */
    [/^(.+ Number: .+)$/, (m) => {
            const parts = m[1].split(' | ').map((part) => {
                const segment = part.match(/^(.+? Number): (.+)$/);
                if (!segment)
                    return null;
                const name = TRACE_NAME[segment[1]];
                return name ? `${name}: ${segment[2]}` : null;
            });
            return parts.every((part) => part !== null) ? parts.join(' | ') : null;
        }],
    /*
     * THE DERIVATION NOTES.
     *
     * Each says which two positions a third was built from, and each carries the
     * calculated numbers, so none of them can be a fixed entry. The figures pass
     * through untouched; only the position names and the frame around them move.
     */
    [/^Life Path (\d+) \+ Expression (\d+)$/,
        (m) => `Životná cesta ${m[1]} + vyjadrenie ${m[2]}`],
    [/^Personal Year (\d+) \+ calendar month (\d+)$/,
        (m) => `Osobný rok ${m[1]} + kalendárny mesiac ${m[2]}`],
    [/^Personal Month (\d+) \+ day of month (\d+)$/,
        (m) => `Osobný mesiac ${m[1]} + deň v mesiaci ${m[2]}`],
    /*
     * ESSENTIAL DIGNITY - the five cases of noteFor(), each carrying its own
     * readout prefix. The back-reference ties the sign in the prefix to the sign
     * in the sentence, so a half-matched line can never be rebuilt from two
     * different signs. The dignity names stay Latin: they are the checkable term,
     * and every source the reader finds will use them.
     */
    [
        /^Domicile in (\w+) \(score (-?\d+)\) - (\w+) rules \1 and operates on its own terms there\.$/,
        (m) => `Domicil ${inSign(m[1])} (skóre ${m[2]}) - ${body(m[3])} vládne ${dativeSign(m[1])} a koná tam podľa vlastných pravidiel.`,
    ],
    [
        /^Exaltation in (\w+) \(score (-?\d+)\) - (\w+) is exalted in \1: amplified, and held to a standard higher than the one it sets itself\.$/,
        (m) => `Exaltácia ${inSign(m[1])} (skóre ${m[2]}) - ${body(m[3])} je ${inSign(m[1])} v exaltácii: pôsobí zosilnene a zároveň platí prísnejšie meradlo, než aké si nastavuje vlastnou povahou.`,
    ],
    [
        /^Detriment in (\w+) \(score (-?\d+)\) - (\w+) is in detriment in \1, the sign opposite its rulership, and works through unfamiliar terms\.$/,
        (m) => `Exil ${inSign(m[1])} (skóre ${m[2]}) - ${body(m[3])} je ${inSign(m[1])} v exile, teda v znamení oproti svojej vláde, a pracuje tam za neznámych podmienok.`,
    ],
    [
        /^Fall in (\w+) \(score (-?\d+)\) - (\w+) is in fall in \1, opposite its exaltation, where its usual approach carries less leverage\.$/,
        (m) => `Pád ${inSign(m[1])} (skóre ${m[2]}) - ${body(m[3])} je ${inSign(m[1])} v páde, teda oproti svojej exaltácii, kde zvyčajný spôsob konania nemá takú páku.`,
    ],
    [
        /^Peregrine in (\w+) \(score (-?\d+)\) - (\w+) holds no major dignity in \1; it acts without either the support or the friction of the four essential dignities\.$/,
        (m) => `Peregrín ${inSign(m[1])} (skóre ${m[2]}) - ${body(m[3])} nemá ${inSign(m[1])} žiadnu veľkú dignitu; koná bez opory aj bez trenia štyroch esenciálnych dignít.`,
    ],
    /*
     * THE DIGNITY SUMMARY. The second sentence only exists when some body sits
     * outside the traditional scheme, and the engine trims the string when it
     * does not - so the tail is optional here for the same reason.
     */
    [
        /^Traditional rulership only: domicile \+5, exaltation \+4, fall -4, detriment -5\.(?: (.+) sit outside the traditional scheme and are not scored\.)?$/,
        (m) => `Len tradičná vláda: domicil +5, exaltácia +4, pád -4, exil -5.${m[1] ? ` ${bodyList(m[1])} stoja mimo tradičnej schémy a nehodnotia sa.` : ''}`,
    ],
    /* The sampling window and the stationary threshold are engine constants and
       travel through as written. */
    [
        /^Central difference of apparent tropical ecliptic longitude at birth moment (\d+)h before and (\d+)h after, using each body's own position method; stationary threshold ([\d.]+) degrees\/day$/,
        (m) => `Centrálna diferencia zdanlivej tropickej ekliptikálnej dĺžky ${m[1]}h pred momentom narodenia a ${m[2]}h po ňom, pre každé teleso jeho vlastnou metódou výpočtu polohy; prah stacionárnosti ${m[3]} stupňa/deň`,
    ],
    /* The Moon boundary check. Nominative signs: this is a list of three states,
       not a sentence about being in one. */
    [
        /^Sign at -(\d+)h: (\w+) \/ at birth moment: (\w+) \/ at \+(\d+)h: (\w+)( \(crosses a sign boundary within this window\))?$/,
        (m) => `Znamenie -${m[1]}h: ${nominativeSign(m[2])} / v momente narodenia: ${nominativeSign(m[3])} / +${m[4]}h: ${nominativeSign(m[5])}${m[6] ? ' (v tomto okne prechádza cez hranicu znamení)' : ''}`,
    ],
    /* Counts. "z" takes the genitive, which does not vary with the numerator, so
       one phrasing is correct for 0, 1 and 10 alike and no branch is needed. */
    [
        /^(\d+) of (\d+) calculated bodies$/,
        (m) => `${m[1]} z ${m[2]} vypočítaných telies`,
    ],
    /*
     * THE TWO FACT LINES OF THE SYNTHESIS EVIDENCE CHAIN THAT STAYED ENGLISH (S-1, S-2).
     *
     * The chain prints each fact through this table. `Type: Generator, Profile 3/6, Sacral authority` and `Retrograde bodies: Venus, Pluto`
     * matched nothing, so a Slovak reader met them whole in English, up to eleven times in one profile. The Human
     * Design names (the Type, the Authority) are the canonical English ones, which is how the reading's own phrases
     * carry them; the words around them and the body names are Slovak. Every figure passes through.
     */
    [/^Type: ([^,]+?)(?:, Profile (\d\/\d))?(?:, (.+?) authority)?$/,
        (m) => `Typ: ${m[1]}${m[2] ? `, profil ${m[2]}` : ''}${m[3] ? `, autorita ${m[3]}` : ''}`],
    /*
     * THE REST OF THE EVIDENCE CHAIN'S ENGLISH FACT LINES (same defect class as S-1 and S-2).
     *
     * Each is the engine's fact for a synthesis row, shown whole in Technical details: the Human Design Profile,
     * Authority and Definition, the Western element, modality and hemisphere emphasis, the BaZi polarity balance
     * and Ten God emphasis. Slovak says the concept in full and keeps what is a name or a figure: the Human Design
     * names stay English as they do on every other row (labels/humanDesign.ts), the figures pass through in the
     * same order, and the words are the ones the reading and the labels already use.
     */
    [/^Profile (\d\/\d)$/, (m) => `Profil ${m[1]}`],
    [/^Authority: (.+)$/, (m) => (HD_NAMES.has(m[1]) ? `Autorita: ${m[1]}` : null)],
    [/^Definition: (.+)$/, (m) => hdDefinitionPhrase(m[1]) ?? (HD_NAMES.has(m[1]) ? `Definícia: ${m[1]}` : null)],
    [/^Element emphasis: (Fire|Earth|Air|Water)$/, (m) => `Dôraz na živel: ${chartElementWord(m[1])}`],
    [/^Modality emphasis: (Cardinal|Fixed|Mutable)$/, (m) => `Dôraz na kvalitu: ${chartModalityWord(m[1])}`],
    [/^Hemisphere emphasis: (\d+)E\/(\d+)W, (\d+)N\/(\d+)S$/,
        (m) => `Dôraz hemisfér: východ ${m[1]} / západ ${m[2]}, sever ${m[3]} / juh ${m[4]}`],
    [/^Polarity balance: (\d+) Yang \/ (\d+) Yin$/, (m) => `Rovnováha polarity: ${m[1]} Jang / ${m[2]} Jin`],
    [/^Ten God emphasis: (output|resource|wealth|authority|companion) \((\d+) stems?\)$/,
        (m) => `Dôraz skupiny ${tenGodFamilyGenitive(m[1])} medzi desiatimi bohmi (${m[2]} ${stemsWord(Number(m[2]))})`],
    [/^Retrograde bodies: (.+)$/,
        (m) => {
            const bodies = m[1].split(', ').map((body) => BODY_NOMINATIVE[body.toLowerCase()]);
            return bodies.every(Boolean) ? `Retrográdne telesá: ${bodies.join(', ')}` : null;
        }],
    [
        /^(\d+) of (\d+) classical planet\(s\) in domicile or exaltation(?:, (\d+) in detriment or fall)?$/,
        (m) => `${m[1]} z ${m[2]} klasických planét v domicile alebo exaltácii${m[3] ? `, ${m[3]} v exile alebo páde` : ''}`,
    ],
    /*
     * PILLAR PROVENANCE. Engine id and coordinate frame are interpolated, so the
     * engine id passes through and the frame is looked up in the table above -
     * it is a sentence of its own and is also emitted standalone elsewhere.
     */
    [
        /^(.+); (.+)\. Planets, major aspects, Ascendant, Midheaven, and Whole Sign Houses are derived locally\. No external ephemeris API is used\.$/,
        (m) => `${m[1]}; ${SK[m[2]] ?? m[2]}. Planéty, hlavné aspekty, ascendent, Medium Coeli a Whole Sign Houses sa počítajú lokálne. Nepoužíva sa žiadne externé efemeridové API.`,
    ],
    [
        /^(.+); (.+)\. Solar boundaries use the existing local astronomy engine and the sexagenary day uses an auditable Gregorian JDN formula\. No external BaZi or calendar API is used\.$/,
        (m) => `${m[1]}; ${SK[m[2]] ?? m[2]}. Hranice solárnych termínov počíta existujúci lokálny astronomický engine a sexagenárny deň vychádza z overiteľného vzorca Gregorián JDN. Nepoužíva sa žiadne externé BaZi ani kalendárové API.`,
    ],
    [
        /^(.+); (.+)\. Type, strategy, authority, and definition are derived from the completed-channel center graph\. No external Human Design API is used\.$/,
        (m) => `${m[1]}; ${SK[m[2]] ?? m[2]}. Type, Strategy, Authority a Definition sa odvodzujú z grafu centier, ktoré spájajú úplné kanály. Nepoužíva sa žiadne externé Human Design API.`,
    ],
    /*
     * THE SEASONAL EVIDENCE FACT, which the synthesis screen prints under every
     * theme the Day Master supports or contradicts. The stem and the month branch
     * are pinyin and stay pinyin; the state and the ruling phase are the prose.
     */
    [
        /^Day Master (\w+) is seasonally (prosperous|aided|resting|trapped|dead) in the (\w+) month \((Wood|Fire|Earth|Metal|Water) ruling\)$/,
        (m) => `Day Master ${m[1]} je sezónne ${SEASONAL_STATE[m[2]]} v mesiaci ${m[3]} (vládne ${PHASE[m[4]]})`,
    ],
    /* --------------------------------------------------------- BAZI: THE COUNTS */
    /* Pinyin stems and branches, the Chinese characters and every figure travel
       through untouched. Only the counted noun is rebuilt, and it is rebuilt
       rather than pluralised because Slovak picks the form from the numerator. */
    [
        /^(\d+) visible stem\(s\)$/,
        (m) => `${m[1]} ${plural(Number(m[1]), 'viditeľný kmeň', 'viditeľné kmene', 'viditeľných kmeňov')}`,
    ],
    [
        /^(\d+) visible branch\(es\)$/,
        (m) => `${m[1]} ${plural(Number(m[1]), 'viditeľná vetva', 'viditeľné vetvy', 'viditeľných vetiev')}`,
    ],
    [
        /^(\d+) visible character\(s\)$/,
        (m) => `${m[1]} ${plural(Number(m[1]), 'viditeľný znak', 'viditeľné znaky', 'viditeľných znakov')}`,
    ],
    [
        /^(\d+) hidden stem\(s\)$/,
        (m) => `${m[1]} ${plural(Number(m[1]), 'skrytý kmeň', 'skryté kmene', 'skrytých kmeňov')}`,
    ],
    /*
     * THE HIDDEN-STEM READOUT: `Geng (primary, 60%) -> Hurting Officer; Ren
     * (secondary, 30%) -> Direct Wealth`.
     *
     * Sits directly under `3 skryté kmene`, so `primary` was the one English word
     * left in a Slovak row. The pinyin stem, the percentage and the Ten God name
     * all pass through: the first two are the calculation and the third is a
     * canonical structure name a reader looks up.
     *
     * Rebuilt segment by segment and null for the whole string if any segment is
     * unrecognised, because a list half in each language is worse than one
     * honestly in English.
     */
    [
        /^[A-Za-z]+ \((?:primary|secondary|tertiary), \d+%\) -> [A-Za-z ]+(?:; [A-Za-z]+ \((?:primary|secondary|tertiary), \d+%\) -> [A-Za-z ]+)*$/,
        (m) => {
            const parts = m[0].split('; ').map((part) => {
                const piece = part.match(/^([A-Za-z]+) \((primary|secondary|tertiary), (\d+%)\) -> ([A-Za-z ]+)$/);
                const role = piece ? HIDDEN_STEM_ROLE[piece[2]] : undefined;
                return piece && role ? `${piece[1]} (${role}, ${piece[3]}) -> ${piece[4]}` : null;
            });
            return parts.every((part) => part !== null) ? parts.join('; ') : null;
        },
    ],
    /*
     * THE TCM CONSTITUTION VALUE: `Earth / Spleen-Stomach`.
     *
     * The reading names it in two sentences of its own - the section title and
     * the body - so it is not only an appendix readout, and both halves are words
     * this file already holds: the phase from PHASE and the organs from the same
     * table the Day Master correspondence sentence uses. Null if either organ is
     * unknown, so a new pairing shows up in English rather than half-translated.
     */
    [
        /^(Wood|Fire|Earth|Metal|Water) \/ ([A-Za-z ]+)-([A-Za-z ]+)$/,
        (m) => {
            const organs = [TCM_ORGAN[m[2]], TCM_ORGAN[m[3]]];
            return organs.every((organ) => organ) ? `${PHASE[m[1]]} / ${organs[0]}-${organs[1]}` : null;
        },
    ],
    /* ------------------------------------------------- BAZI: SEASON AND EMPHASIS */
    [
        /^Month ruled by (Wood|Fire|Earth|Metal|Water)$/,
        (m) => `Mesiacu vládne ${PHASE[m[1]]}`,
    ],
    /*
     * The seasonal note. The state adjective agrees with "mesiac", which is
     * masculine, so the SEASONAL_STATE table the Day Master fact already uses is
     * correct here too and is not duplicated.
     */
    [
        /^The active solar month is seasonally (prosperous|aided|resting|trapped|dead) for the (Wood|Fire|Earth|Metal|Water) phase \(month governed by (Wood|Fire|Earth|Metal|Water)\)\. This is a structural seasonal correspondence, not a strength or health verdict\.$/,
        (m) => `Aktívny solárny mesiac je pre fázu ${PHASE[m[2]]} sezónne ${SEASONAL_STATE[m[1]]} (mesiacu vládne ${PHASE[m[3]]}). Ide o štrukturálne sezónne priradenie, nie o verdikt o sile ani o zdraví.`,
    ],
    /*
     * The two emphasis notes. Written as "má / majú ... zastúpenie" rather than
     * "je zastúpený", because the adjective would have to agree with the phase -
     * zem is feminine, kov masculine, drevo neuter - and the verb does not. Same
     * sentence, one form, no gender table.
     */
    [
        /^(.+?) (?:is|are) relatively more represented in this symbolic chart model \((\d+) of (\d+) counted positions\)\.$/,
        (m) => `V tomto symbolickom modeli mapy ${m[1].includes(' and ') ? 'majú' : 'má'} ${phaseList(m[1])} relatívne vyššie zastúpenie (${m[2]} z ${m[3]} počítaných pozícií).`,
    ],
    [
        /^(.+?) (?:is|are) relatively less represented in this symbolic chart model\. Less represented is not automatically a weakness, and abundant is not automatically harmful — traditional correspondence only\.$/,
        (m) => `V tomto symbolickom modeli mapy ${m[1].includes(' and ') ? 'majú' : 'má'} ${phaseList(m[1])} relatívne nižšie zastúpenie. Nižšie zastúpenie nie je automaticky slabina a hojné zastúpenie nie je automaticky škodlivé — ide len o tradičné priradenie.`,
    ],
    [
        /^Your Day Master phase, (Wood|Fire|Earth|Metal|Water), traditionally corresponds to the ([\w ]+)\/([\w ]+) system pair\.$/,
        (m) => `Fáza tvojho Day Master, ${PHASE[m[1]]}, tradične zodpovedá orgánovej dvojici ${TCM_ORGAN[m[2]] ?? m[2]}/${TCM_ORGAN[m[3]] ?? m[3]}.`,
    ],
    [
        /^Hour Pillar is method-sensitive: civil clock time gives (.+), true solar time gives (.+)\. The true-solar-time result is used as primary; the civil-time result is retained for comparison\.$/,
        (m) => `Hodinový pilier závisí od metódy: občiansky čas dáva ${m[1]}, pravý slnečný čas dáva ${m[2]}. Ako primárny sa berie výsledok z pravého slnečného času; výsledok z občianskeho času zostáva na porovnanie.`,
    ],
    /*
     * BAZI: THE BRANCH AND STEM RELATIONSHIPS.
     *
     * Structure names stay English - Six Harmony, Three Harmony, Five Stem
     * Combination - because they are what the reader will find in any source, and
     * the Chinese characters beside them are the real check. What gets rebuilt is
     * the clause that says what is and is not being claimed: "traditionally cited
     * but not asserted as an actual transformation" is the whole point of the
     * sentence, and it survives as two clauses in Slovak too.
     */
    [
        /^(\w+) \((\w+)\) and (\w+) \((\w+)\) form a Six Harmony \(六合\) pair\. A resulting (Wood|Fire|Earth|Metal|Water) phase is traditionally cited but not asserted as an actual transformation\.$/,
        (m) => `${m[1]} (${pillarPosition(m[2])}) a ${m[3]} (${pillarPosition(m[4])}) tvoria pár Six Harmony (六合). Výsledná fáza ${PHASE[m[5]]} sa tradične uvádza, ale netvrdí sa, že ide o skutočnú premenu.`,
    ],
    [
        /^(\w+) \((\w+)\) and (\w+) \((\w+)\) form a Six Harmony \(六合\) pair\. No resulting element is consistently agreed for this pair across sources, so none is asserted here\.$/,
        (m) => `${m[1]} (${pillarPosition(m[2])}) a ${m[3]} (${pillarPosition(m[4])}) tvoria pár Six Harmony (六合). Na výslednom živle sa zdroje pri tejto dvojici jednotne nezhodujú, takže sa tu žiadny netvrdí.`,
    ],
    [
        /^(\w+) \((\w+)\) and (\w+) \((\w+)\) directly clash \(Six Clashes \/ 六冲\)\.$/,
        (m) => `${m[1]} (${pillarPosition(m[2])}) a ${m[3]} (${pillarPosition(m[4])}) sú v priamom strete (Six Clashes / 六冲).`,
    ],
    [
        /^(\w+) \((\w+)\) and (\w+) \((\w+)\) form a Six Harm \(六害\) pair\.$/,
        (m) => `${m[1]} (${pillarPosition(m[2])}) a ${m[3]} (${pillarPosition(m[4])}) tvoria pár Six Harm (六害).`,
    ],
    [
        /^(\w+) \((\w+)\) and (\w+) \((\w+)\) form the Zi-Mao mutual punishment \(punishment of impropriety\)\.$/,
        (m) => `${m[1]} (${pillarPosition(m[2])}) a ${m[3]} (${pillarPosition(m[4])}) tvoria vzájomný trest Zi-Mao (trest za neslušnosť).`,
    ],
    [
        /^(\w+) appears in both (\w+) and (\w+); this branch is a recognized self-punishment branch\.$/,
        (m) => `${m[1]} sa objavuje v ${m[2]} aj v ${m[3]}; táto vetva je uznávaná ako vetva sebatrestania.`,
    ],
    [
        /^(\w+) \((\w+)\) and (\w+) \((\w+)\) form the traditional Five Stem Combination\. Whether this actually transforms into (Wood|Fire|Earth|Metal|Water) depends on seasonal and structural conditions not modeled in this milestone\.$/,
        (m) => `${m[1]} (${pillarPosition(m[2])}) a ${m[3]} (${pillarPosition(m[4])}) tvoria tradičnú Five Stem Combination. Či sa to naozaj premení na ${PHASE_ACCUSATIVE[m[5]]}, závisí od sezónnych a štrukturálnych podmienok, ktoré tento míľnik nemodeluje.`,
    ],
    [
        /^(\w+) \((\w+)\) and (\w+) \((\w+)\) are in direct controlling-cycle opposition \(a commonly cited stem clash\)\.$/,
        (m) => `${m[1]} (${pillarPosition(m[2])}) a ${m[3]} (${pillarPosition(m[4])}) stoja v priamej opozícii ovládacieho cyklu (bežne uvádzaný stret nebeských kmeňov).`,
    ],
    /* The trio groupings, complete and partial. The English partial form reads
       "that would forms" - an engine typo that is not this overlay's to fix, so
       the Slovak simply says what the sentence means. */
    [
        /^([\w-]+) forms a Three Harmony (Wood|Fire|Earth|Metal|Water) bureau\. A full bureau is traditionally considered a stronger structural presence of \2; transformation is not asserted\.$/,
        (m) => `${m[1]} tvorí Three Harmony bureau živlu ${PHASE[m[2]]}. Úplné bureau sa tradične považuje za silnejšiu štrukturálnu prítomnosť ${PHASE_GENITIVE[m[2]]}; premena sa netvrdí.`,
    ],
    [
        /^([\w-]+) present as a partial grouping \(missing (\w+) to complete\) that would forms a Three Harmony (Wood|Fire|Earth|Metal|Water) bureau\. A full bureau is traditionally considered a stronger structural presence of \3; transformation is not asserted\.$/,
        (m) => `${m[1]} je prítomné ako čiastočné zoskupenie (do úplnosti chýba ${m[2]}), ktoré by tvorilo Three Harmony bureau živlu ${PHASE[m[3]]}. Úplné bureau sa tradične považuje za silnejšiu štrukturálnu prítomnosť ${PHASE_GENITIVE[m[3]]}; premena sa netvrdí.`,
    ],
    [
        /^([\w-]+) forms the (.+)\.$/,
        (m) => `${m[1]} tvorí ${m[2]}.`,
    ],
    [
        /^([\w-]+) present as a partial grouping \(missing (\w+) to complete\) that would forms the (.+)\.$/,
        (m) => `${m[1]} je prítomné ako čiastočné zoskupenie (do úplnosti chýba ${m[2]}), ktoré by tvorilo ${m[3]}.`,
    ],
    /* ------------------------------------------------- HUMAN DESIGN: THE COUNTS */
    [
        /^(\d+) center\(s\)$/,
        (m) => `${m[1]} ${plural(Number(m[1]), 'centrum', 'centrá', 'centier')}`,
    ],
    [
        /^(\d+) channel\(s\)$/,
        (m) => `${m[1]} ${plural(Number(m[1]), 'kanál', 'kanály', 'kanálov')}`,
    ],
    [
        /^(\d+) unique gate\(s\)$/,
        (m) => `${m[1]} ${plural(Number(m[1]), 'unikátna brána', 'unikátne brány', 'unikátnych brán')}`,
    ],
    [
        /^(\d+) connected component\(s\)$/,
        (m) => `${m[1]} ${plural(Number(m[1]), 'prepojený komponent', 'prepojené komponenty', 'prepojených komponentov')}`,
    ],
    /* "3 z 9 centier" keeps the partitive genitive whatever the numerator is; the
       verb and the participle after it do not, so they are picked by count. */
    [
        /^(\d+) of 9 center\(s\) undefined$/,
        (m) => `${m[1]} z 9 centier ${plural(Number(m[1]), 'je nedefinované', 'sú nedefinované', 'je nedefinovaných')}`,
    ],
    [
        /^(\d+) of 4 arrow\(s\) resolved$/,
        (m) => `${m[1]} zo 4 šípok ${plural(Number(m[1]), 'je vyriešená', 'sú vyriešené', 'je vyriešených')}`,
    ],
    [
        /^([\d.]+) days before birth$/,
        (m) => `${m[1]} dní pred narodením`,
    ],
    /* ------------------------------ HUMAN DESIGN: THE WHOLE-DAY ENVELOPE ROWS */
    /* After the astrology/BaZi window pattern of the same shape, which returns
       null for anything that is not a list of clock spans. */
    [/^Changes during the birth date: (.+)$/,
        (m) => { const list = hdValueList(m[1]); return list ? `Mení sa počas dňa narodenia: ${list}` : null; }],
    [/^Changes during the birth date: (\d+\.\d(?: \/ \d+\.\d)+)$/, (m) => `Mení sa počas dňa narodenia: ${m[1]}`],
    [/^Needs a birth time: gates (\d+(?: \/ \d+)+)$/, (m) => `Vyžaduje čas narodenia: brány ${m[1]}`],
    [/^Needs a birth time: (.+)$/,
        (m) => { const list = hdValueList(m[1]); return list ? `Vyžaduje čas narodenia: ${list}` : null; }],
    [/^(Defined|Open) all day; (.+) depend on the hour$/,
        (m) => `${m[1] === 'Defined' ? 'Definované' : 'Otvorené'} celý deň; od hodiny závisí: ${m[2]}`],
    [/^Defined all day; (\d+-\d+(?: \/ \d+-\d+)*) only at some hours$/, (m) => `Definované celý deň; ${m[1]} len v niektorých hodinách`],
    [/^Activated all day; (\d+(?:, \d+)*) only at some hours$/, (m) => `Aktivované celý deň; ${m[1]} len v niektorých hodinách`],
    [/^The gate holds all day; the line changes: (\d+\.\d(?: \/ \d+\.\d)+)$/, (m) => `Brána platí celý deň; línia sa mení: ${m[1]}`],
    [/^About (\d+) days before birth$/, (m) => `Približne ${m[1]} ${plural(Number(m[1]), 'deň', 'dni', 'dní')} pred narodením`],
    [/^Gate (\d+\.\d) \(all day\)$/, (m) => `brána ${m[1]} (celý deň)`],
    [/^Gate (\d+) \(all day\); line (\d(?: \/ \d)+)$/, (m) => `brána ${m[1]} (celý deň); línia ${m[2]}`],
    [/^(.+) \(all day\)$/, (m) => { const list = hdValueList(m[1]); return list ? `${list} (celý deň)` : null; }],
    /* ------------------------------------------ HUMAN DESIGN: THE HEDGED CLAIMS */
    /* The Type is interpolated and stays English: Manifesting Generator is the
       name the reader will find everywhere else. */
    [
        /^Derived from Sacral definition and a real connected motor-to-Throat path\. Motor path: (.+)\.$/,
        (m) => `Odvodené z definície Sacral a zo skutočnej prepojenej cesty od motora k Throat. Cesta motora: ${m[1] === 'None' ? 'žiadna' : m[1]}.`,
    ],
    [
        /^The state reported when a (.+) follows its Strategy and Authority\. It is a self-check, not a promise\.$/,
        (m) => `Stav, ktorý sa uvádza, keď sa ${m[1]} riadi svojou Strategy a Authority. Je to sebakontrola, nie sľub.`,
    ],
    [
        /^The recurring signal a (.+) tends to notice when decisions bypass Strategy and Authority\.$/,
        (m) => `Opakujúci sa signál, ktorý ${m[1]} zvykne zachytiť, keď rozhodnutia obídu Strategy a Authority.`,
    ],
    [
        /^(Left Angle|Right Angle|Juxtaposition), set by profile (\S+)$/,
        (m) => `${m[1]}, určený profilom ${m[2]}`,
    ],
    /* ------------------------------------------------------ NUMEROLOGY: MEANINGS */
    [
        /^Number (\d+) emphasizes (.+)\.$/,
        (m) => `Číslo ${m[1]} zdôrazňuje ${numberTheme(m[2], true)}.`,
    ],
    [
        /^Value (\d+) uses the available reduced-number (\d+) map and emphasizes (.+)\.$/,
        (m) => `Hodnota ${m[1]} používa dostupnú mapu zredukovaného čísla ${m[2]} a zdôrazňuje ${numberTheme(m[3], true)}.`,
    ],
    /*
     * The wrapper a master number gets, and the interpretation it wraps.
     *
     * The tail is a whole row in its own right - a keyword row, or the name map's
     * "<signal> <number>: <theme> through ..." - and the table already knows how
     * to render it standalone, so it is looked up rather than restated. Passing it
     * through untranslated, which is what this did, left every master number in
     * the reading with a Slovak frame around an English row.
     */
    [
        /^Value (\d+) uses the available reduced-number (\d+) interpretation: (.+)$/,
        (m) => `Hodnota ${m[1]} používa dostupný výklad zredukovaného čísla ${m[2]}: ${render(m[3]) ?? m[3]}`,
    ],
    /*
     * THE NAME MAP'S KEYWORD ROW.
     *
     * Rebuilt from three tables rather than listed as twenty-seven fixed strings,
     * because the row is assembled from three tables at source too. If any part is
     * unknown the English row is returned whole: a row reading "Číslo osobnosti 5:
     * pohyb through freedom, change, curiosity" would be worse than the English.
     */
    [
        /^(Expression \/ Destiny Number|Soul Urge Number|Personality Number) ([1-9]): (\w+) through (.+)$/,
        (m) => {
            const signal = NUMEROLOGY_SIGNAL_NAME[m[1]];
            const theme = NAME_THEME_LABEL[m[3]];
            const keywords = m[4].split(', ').map((keyword) => NAME_THEME_KEYWORD[keyword]);
            return signal && theme && keywords.every(Boolean)
                ? `${signal} ${m[2]}: ${theme} cez ${keywords.join(', ')}`
                : m[0];
        },
    ],
    /* Karmic Lessons and Hidden Passion print bare "6: theme" labels joined by a
       pipe. Nominative, not the accusative the "emphasizes" frame governs. */
    [
        /^[1-9]: [^|]+(?: \| [1-9]: [^|]+)*$/,
        (m) => m[0].split(' | ').map((entry) => {
            const parts = entry.match(/^([1-9]): (.+)$/);
            return parts ? `${parts[1]}: ${numberTheme(parts[2], false)}` : entry;
        }).join(' | '),
    ],
    /* --------------------------------------------- NUMEROLOGY: THE FOUR CHAPTERS */
    [
        /^Four life chapters built from the separately reduced month, day and year\. (.+)$/,
        (m) => `Štyri životné kapitoly, poskladané zo samostatne zredukovaného mesiaca, dňa a roka. ${chapters(m[1])}`,
    ],
    [
        /^Each challenge runs alongside the pinnacle of the same position\. A challenge of 0 is a real result and means no single pressure dominates that chapter\. (.+)$/,
        (m) => `Každá výzva beží popri vrchole na rovnakej pozícii. Výzva s hodnotou 0 je skutočný výsledok a znamená, že v tej kapitole nedominuje jeden konkrétny tlak. ${chapters(m[1])}`,
    ],
    /* The age windows beside them, and the one that also says where the reader is
       now. Split rather than matched as a whole: the list is one to four spans. */
    [
        /^(?:ages \d+-\d+|age \d+\+)(?:, (?:ages \d+-\d+|age \d+\+|currently \d+))*$/,
        (m) => m[0].split(', ').map((span) => {
            const range = span.match(/^ages (\d+)-(\d+)$/);
            if (range)
                return `vek ${range[1]}-${range[2]}`;
            const open = span.match(/^age (\d+)\+$/);
            if (open)
                return `vek ${open[1]}+`;
            const now = span.match(/^currently (\d+)$/);
            return now ? `teraz ${now[1]}` : span;
        }).join(', '),
    ],
    [
        /^Karmic debt totals found in: (.+)\.$/,
        /* The tail is `14 (Birth Day Number), 19 (Personality Number)` - figures the
           engine found, each labelled with the position it came from. The figures
           pass through; the names in brackets are the same names the rows use. */
        (m) => `Súčty karmického dlhu nájdené v: ${m[1].replace(/\(([^)]+)\)/g, (whole, name) => (TRACE_NAME[name] ? `(${TRACE_NAME[name]})` : whole))}.`,
    ],
    /*
     * The Moon phase's two figures. The phase name on the card is an exact entry
     * above; the illumination under it and the elongation beside it in the key
     * outputs are interpolated, so they are patterns. The figure is the engine's
     * and passes through, with the decimal comma Slovak writes a fraction with.
     */
    [
        /^(\d+\.\d+)% illuminated$/,
        (m) => `osvetlenie ${decimalComma(m[1])} %`,
    ],
    [
        /^(\d+\.\d+)° elongation$/,
        (m) => `elongácia ${decimalComma(m[1])}°`,
    ],
    /* The Type mark's note on the Human Design card: `Strategy: Respond, then
       inform`. The Strategy itself is an exact entry above. */
    [
        /^Strategy: (.+)$/,
        (m) => `Stratégia: ${SK[m[1]] ?? m[1]}`,
    ],
    /* ---------------------------------------------- the technical appendix */
    /*
     * VALUES WITH A UNIT OR A NAME IN THEM.
     *
     * The figure passes through untouched - it is what a reader checks against
     * another tool, so it keeps its decimal point - and only the words around
     * it are Slovak: the unit, the sign, the body, the house. `degrees` becomes
     * the symbol, which reads the same in every language a reader might be
     * comparing against.
     */
    [
        /^House (\d+) \/ (\w+) (-?\d+\.\d+) degrees$/,
        (m) => (SIGN_NOMINATIVE[m[2].toLowerCase()] ? `Dom ${m[1]} / ${nominativeSign(m[2])} ${m[3]}°` : null),
    ],
    [
        /^(\w+) whole sign \/ cusp (-?\d+\.\d+) degrees$/,
        (m) => (SIGN_NOMINATIVE[m[1].toLowerCase()] ? `${nominativeSign(m[1])} celé znamenie / hrot ${m[2]}°` : null),
    ],
    [
        /^(\w+) (-?\d+\.\d+) degrees$/,
        (m) => (SIGN_NOMINATIVE[m[1].toLowerCase()] ? `${nominativeSign(m[1])} ${m[2]}°` : null),
    ],
    [
        /^(-?\d+(?:\.\d+)?) degrees$/,
        (m) => `${m[1]}°`,
    ],
    [
        /^(direct|retrograde|stationary) \((-?\d+\.\d+) degrees\/day\)$/,
        (m) => `${MOTION_STATE[m[1]]} (${m[2]}°/deň)`,
    ],
    [
        /^(Ascendant|Descendant|Midheaven|Imum Coeli), orb (-?\d+\.\d+) degrees$/,
        (m) => `${ANGLE_NOMINATIVE[m[1]]}, orb ${m[2]}°`,
    ],
    /* `Sun in Virgo (Earth, Mutable)` - the placement rows, and the angles. */
    [
        /^(Sun|Moon|Mercury|Venus|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto|North Node|South Node) in (\w+)(?: \((Fire|Earth|Air|Water), (Cardinal|Fixed|Mutable)\))?$/,
        (m) => (SIGN_NOMINATIVE[m[2].toLowerCase()]
            ? `${body(m[1])} ${inSign(m[2])}${m[3] ? ` (${CHART_ELEMENT[m[3]].nominative}, ${CHART_MODALITY[m[4]]})` : ''}`
            : null),
    ],
    [
        /^(Ascendant|Descendant|Midheaven|Imum Coeli) in (\w+)$/,
        (m) => (SIGN_NOMINATIVE[m[2].toLowerCase()] ? `${ANGLE_NOMINATIVE[m[1]]} ${inSign(m[2])}` : null),
    ],
    /* `Pluto on Ascendant` and `Pluto 3.21° from Ascendant`, one or several. */
    [
        /^(\w+) on (Ascendant|Descendant|Midheaven|Imum Coeli)(?:(?:, | \| )(\w+) on (Ascendant|Descendant|Midheaven|Imum Coeli))*$/,
        (m) => m[0].split(/(, | \| )/).map((part) => {
            const one = part.match(/^(\w+) on (Ascendant|Descendant|Midheaven|Imum Coeli)$/);
            return one ? `${body(one[1])} na ${ANGLE_LOCATIVE[one[2]]}` : part;
        }).join(''),
    ],
    [
        /^(\w+) (-?\d+\.\d+)° from (Ascendant|Descendant|Midheaven|Imum Coeli)(?:(?:, | \| )(\w+) (-?\d+\.\d+)° from (Ascendant|Descendant|Midheaven|Imum Coeli))*$/,
        (m) => m[0].split(/(, | \| )/).map((part) => {
            const one = part.match(/^(\w+) (-?\d+\.\d+)° from (Ascendant|Descendant|Midheaven|Imum Coeli)$/);
            return one ? `${body(one[1])} ${one[2]}° od ${ANGLE_GENITIVE[one[3]]}` : part;
        }).join(''),
    ],
    /* `East 9 / West 1 / North 5 / South 5` */
    [
        /^East (\d+) \/ West (\d+) \/ North (\d+) \/ South (\d+)$/,
        (m) => `Východ ${m[1]} / Západ ${m[2]} / Sever ${m[3]} / Juh ${m[4]}`,
    ],
    /* `Mercury Domicile, Venus Fall` */
    [
        /^(?:\w+ (?:Domicile|Exaltation|Detriment|Fall|Peregrine))(?:, \w+ (?:Domicile|Exaltation|Detriment|Fall|Peregrine))*$/,
        (m) => m[0].split(', ').map((part) => {
            const one = part.match(/^(\w+) (Domicile|Exaltation|Detriment|Fall|Peregrine)$/);
            return one ? `${body(one[1])} ${DIGNITY_WORD[one[2]]}` : part;
        }).join(', '),
    ],
    /* `Virgo (4), House 11 (4)` - where the stellia are, with their sizes. */
    [
        /^(?:(?:\w+|House \d+) \(\d+\))(?:, (?:\w+|House \d+) \(\d+\))*$/,
        (m) => m[0].split(', ').map((part) => {
            const one = part.match(/^(\w+|House \d+) \((\d+)\)$/);
            return one ? `${placeWord(one[1])} (${one[2]})` : part;
        }).join(', '),
    ],
    /* `Virgo: Sun, Mercury, Venus, Mars | House 11: Sun, Mercury, Venus, Mars` */
    [
        /^(?:(?:\w+|House \d+): [\w ,]+)(?: \| (?:\w+|House \d+): [\w ,]+)*$/,
        (m) => {
            const parts = m[0].split(' | ').map((part) => {
                const one = part.match(/^(\w+|House \d+): (.+)$/);
                if (!one)
                    return null;
                const members = one[2].split(', ');
                if (!members.every((name) => BODY_NOMINATIVE[name.toLowerCase()]))
                    return null;
                return `${placeWord(one[1])}: ${bodyList(one[2])}`;
            });
            return parts.every((part) => part !== null) ? parts.join(' | ') : null;
        },
    ],
    /* `Sun, Mercury, Venus, Mars` - a plain list of bodies. */
    [
        /^(?:Sun|Moon|Mercury|Venus|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto|North Node|South Node)(?:, (?:Sun|Moon|Mercury|Venus|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto|North Node|South Node))+$/,
        (m) => bodyList(m[0]),
    ],
    /* The Day Master as a value: `Ji Earth`, and `Ji Earth / Yin` beside its
       polarity. The stem is pinyin and stays; the phase is the pillar's word. */
    [
        /^(Jia|Yi|Bing|Ding|Wu|Ji|Geng|Xin|Ren|Gui) (Wood|Fire|Earth|Metal|Water)$/,
        (m) => `${m[1]} (${PHASE[m[2]]})`,
    ],
    [
        /^(Jia|Yi|Bing|Ding|Wu|Ji|Geng|Xin|Ren|Gui) (Wood|Fire|Earth|Metal|Water) \/ (Yin|Yang)$/,
        (m) => `${m[1]} (${PHASE[m[2]]}) / ${m[3] === 'Yin' ? 'Jin' : 'Jang'}`,
    ],
    /* The Human Design appendix: a centre's state, the definition groups, the
       four Variables. The category in brackets is the centre's role. */
    [
        /^(Defined|Undefined) \((\w+)\)$/,
        (m) => `${m[1] === 'Defined' ? 'Definované' : 'Nedefinované'} (${CENTRE_CATEGORY[m[2]] ?? m[2]})`,
    ],
    [
        /^Group \d+: .+$/,
        (m) => m[0].replace(/\bGroup (\d+):/g, 'Skupina $1:'),
    ],
    /* `Left / color 6 / tone 2 / from Design Sun gate 16.1` - one Variable's
       derivation, in the appendix and as a key output's note. Color and tone
       are the system's own words and stay; the arrow and the source read in
       Slovak. */
    [
        /^(Left|Right) \/ color (\d) \/ tone (\d) \/ from (Design|Personality) ([A-Za-z ]+?) gate (\d+\.\d)\.?$/,
        (m) => `${ARROW[m[1]]} / color ${m[2]} / tone ${m[3]} / z aktivácie ${m[4]}: ${body(m[5])}, brána ${m[6]}`,
    ],
    [
        /^(Left|Right) \(color (\d), tone (\d)\) from (Design|Personality) ([A-Za-z ]+?) gate (\d+\.\d)$/,
        (m) => `${ARROW[m[1]]} (color ${m[2]}, tone ${m[3]}) z aktivácie ${m[4]}: ${body(m[5])}, brána ${m[6]}`,
    ],
    /* `94.751306 degrees / Gate 52.1.6.4.4` - an activation's longitude beside
       its gate, line, color, tone and base; `Li Qiu (立秋) / 135 degrees` - a
       solar term beside its longitude. The figures pass through. */
    [
        /^(-?\d+\.\d+) degrees \/ Gate (\d+(?:\.\d+)+)$/,
        (m) => `${m[1]}° / brána ${m[2]}`,
    ],
    [
        /^(.+?) \/ (\d+(?:\.\d+)?) degrees$/,
        (m) => `${m[1]} / ${m[2]}°`,
    ],
    [
        /^Dominant phase: (Wood|Fire|Earth|Metal|Water) \((\d+) of (\d+)\)$/,
        (m) => `Prevládajúca fáza: ${PHASE[m[1]]} (${m[2]} z ${m[3]})`,
    ],
    [
        /^Determination \(Digestion\): (Left|Right) \/ Environment: (Left|Right) \/ Motivation: (Left|Right) \/ Perspective \(View\): (Left|Right)$/,
        (m) => `Determination (trávenie): ${ARROW[m[1]]} / Environment (prostredie): ${ARROW[m[2]]} / Motivation (motivácia): ${ARROW[m[3]]} / Perspective (pohľad): ${ARROW[m[4]]}`,
    ],
    /* The evidence adapter's one-line form: `Waxing Crescent (14.28% illuminated)`. */
    [
        /^(New Moon|Waxing Crescent|First Quarter|Waxing Gibbous|Full Moon|Waning Gibbous|Third Quarter|Last Quarter|Waning Crescent) \((\d+\.\d+)% illuminated\)$/,
        (m) => `${SK[m[1]] ?? m[1]} (osvetlenie ${decimalComma(m[2])} %)`,
    ],
];
/*
 * SEGMENTS OF THE COMPOUND DAY MASTER FACT.
 *
 * The BaZi adapter builds one evidence line by joining two or three clauses
 * with "; ", and which clauses are present depends on the chart - the tendency
 * clause is dropped when the model is indeterminate. Enumerating every
 * arrangement would be four near-identical patterns, so the clauses are matched
 * one at a time and the join is rebuilt. These are tried only after the whole
 * string has failed to match, and each is anchored tightly enough that it
 * cannot fire inside an unrelated sentence that happens to contain a semicolon.
 */
const SEGMENT_PATTERNS = [
    [
        /^Day Master (\w+) \((Yin|Yang) (Wood|Fire|Earth|Metal|Water)\)$/,
        (m) => `Day Master ${m[1]} (${m[2]} ${PHASE[m[3]]})`,
    ],
    [
        /^(prosperous|aided|resting|trapped|dead) in (\w+) month \((Wood|Fire|Earth|Metal|Water) ruling\)$/,
        (m) => `${SEASONAL_STATE[m[1]]} v mesiaci ${m[2]} (vládne ${PHASE[m[3]]})`,
    ],
    [
        /^tendency (strong|moderately-strong|balanced|moderately-weak|weak|indeterminate)$/,
        (m) => `tendencia: ${STRENGTH_TENDENCY[m[1]]}`,
    ],
];
/** The whole string, or null when nothing in the tables claims it. */
function render(text) {
    const exact = SK[text];
    if (exact)
        return exact;
    for (const [pattern, build] of PATTERNS) {
        const match = text.match(pattern);
        if (!match)
            continue;
        const built = build(match);
        if (built)
            return built;
    }
    /*
     * THE RELATIONSHIPS ROW.
     *
     * The BaZi Relationships group prints "<completeness> / <description>" into a
     * single value. `complete` and `partial` stay as they are: the same token is
     * the bare value of the matching key output two lists further down, and
     * translating it here would leave the appendix calling one thing two names.
     * The description is a sentence in its own right and is emitted standalone
     * elsewhere, so it is looked up rather than restated - and when it has no
     * Slovak this returns null, so the gap is still reported as a gap instead of
     * being papered over with a half-translated row.
     */
    const relationship = text.match(/^(complete|partial) \/ (.+)$/);
    if (relationship) {
        const description = render(relationship[2]);
        return description ? `${relationship[1]} / ${description}` : null;
    }
    return null;
}
/** The compound fact, rebuilt clause by clause. Null unless a clause matched. */
function renderSegments(text) {
    if (!text.includes('; '))
        return null;
    const segments = text.split('; ');
    let touched = false;
    const rendered = segments.map((segment) => {
        for (const [pattern, build] of SEGMENT_PATTERNS) {
            const match = segment.match(pattern);
            if (match) {
                touched = true;
                return build(match);
            }
        }
        return segment;
    });
    return touched ? rendered.join('; ') : null;
}
const LOCALES_WITH_A_TABLE = new Set(['sk']);
/**
 * Engine-authored prose in the reader's language, or the English original.
 *
 * A no-op in English by construction, so the English reading stays byte for
 * byte what it was. Falls back to the English sentence rather than to nothing:
 * a technical explanation that failed to translate must still be readable,
 * because the alternative is a value with no account of where it came from.
 */
export function engineProse(english) {
    if (!LOCALES_WITH_A_TABLE.has(activeLocale()))
        return english;
    const text = english.trim();
    if (text.length === 0)
        return english;
    return render(text) ?? renderSegments(text) ?? english;
}
/** Engine prose with no Slovak. Used by the localisation coverage report. */
export function untranslatedEngineProse(texts) {
    return texts.filter((text) => {
        const trimmed = text.trim();
        if (trimmed.length === 0)
            return false;
        return render(trimmed) === null && renderSegments(trimmed) === null;
    });
}
