import { ASPECT, body, node, sign } from './vocabulary.js';
/*
 * WESTERN ASTROLOGY LABELS.
 *
 * Most of this pillar's labels are generated per chart - an aspect row exists
 * for every pair the engine found - so the patterns below carry more weight
 * than the table. Each returns null unless it can translate ALL of a label, so
 * a half-Slovak row like `Aspekt: Sun konjunkcia Mars` cannot be produced.
 *
 * THE COLON FRAME
 * A generated label names a field and then the body it is about: `Sun house`,
 * `Venus motion`, `Angular: Pluto`. Slovak would want the body in the genitive
 * - `dom Slnka` - and there is no genitive body table to read it from; adding a
 * second table of planet names beside BODY_NOMINATIVE is exactly how the prose
 * and the appendix start disagreeing about what a planet is called. So every
 * generated label uses one frame instead: the field name, a colon, the body in
 * the nominative, which is the form the prose already uses. `Dom: Slnko`,
 * `Pohyb: Venuša`, `Postavenie v dome: Jupiter`. One shape, one word list.
 */
export const WESTERN_ASTROLOGY_LABELS = {
    Ascendant: 'Ascendent',
    'Ascendant sign': 'Znamenie ascendentu',
    'Ascendant longitude': 'Dĺžka ascendentu',
    Midheaven: 'Medium Coeli',
    'Midheaven sign': 'Znamenie Medium Coeli',
    'Midheaven longitude': 'Dĺžka Medium Coeli',
    'House system': 'Systém domov',
    'Whole Sign Houses': 'Celé znamenia (Whole Sign)',
    'Chart ruler': 'Vládca mapy',
    'Essential dignity': 'Esenciálna dignita',
    'Element balance': 'Rovnováha živlov',
    'Modality balance': 'Rovnováha kvalít',
    'Hemisphere balance': 'Rovnováha hemisfér',
    'Moon phase': 'Fáza Mesiaca',
    'Major aspects': 'Hlavné aspekty',
    'Retrograde planets': 'Retrográdne planéty',
    'Angular planets': 'Planéty na uhloch',
    'Angular orb': 'Orb od uhla',
    'Angular source': 'Zdroj uhla',
    Stelliums: 'Stelliá',
    'Bodies outside the scheme': 'Telesá mimo schémy',
    /* The dignity names as ROW LABELS. The Latin term stays as the value. */
    Domicile: 'Domicil',
    Exaltation: 'Exaltácia',
    Detriment: 'Exil',
    Fall: 'Pád',
    Peregrine: 'Peregrin',
    /* ------------------------------------------------------------------ *
     * THE GLANCE STRIP
     *
     * These are mark labels - the captions on the pillar card, above the fold.
     * They reach the reader through renderMark() in premiumPillarScreens.ts
     * rather than through the appendix, which is why they were missed until the
     * mark strip was routed through this overlay too.
     * ------------------------------------------------------------------ */
    'Big Three': 'Veľká trojka',
    'Chart pattern': 'Tvar mapy',
    'Dominant element': 'Prevažujúci živel',
    /* The value beside it is the overlay's `Premenlivé` - plural, agreeing with
       the signs - so the caption names the signs too. `Prevažujúca kvalita:
       Premenlivé` did not agree. */
    'Dominant modality': 'Prevažujúce znamenia',
    'Tightest aspect': 'Najtesnejší aspekt',
    'Angular planet': 'Planéta na uhle',
    Stellium: 'Stellium',
    /* ------------------------------------------------------------------ *
     * GROUP TITLES
     * ------------------------------------------------------------------ */
    'Normalized birth moment': 'Normalizovaný moment narodenia',
    'Time normalization trace': 'Záznam normalizácie času',
    'Planetary positions': 'Postavenia planét',
    'Chart emphasis': 'Dôrazy v mape',
    'Angles and Whole Sign Houses': 'Uhly a domy v celých znameniach (Whole Sign)',
    'Distribution counts': 'Počty v rozložení',
    /* the Advanced chart's groups in Technical details */
    'Minor aspects (Advanced chart)': 'Vedľajšie aspekty (rozšírený kruh)',
    'House systems (Advanced chart)': 'Systémy domov (rozšírený kruh)',
    'Minor aspects': 'Vedľajšie aspekty',
    'House systems': 'Systémy domov',
    'Orb limits': 'Limity orbu',
    'System of the reading': 'Systém výkladu',
    'Chiron and asteroids (Advanced chart)': 'Chiron a planétky (rozšírený kruh)',
    'Chiron and asteroids': 'Chiron a planétky',
    'Aspects of Chiron and the asteroids': 'Aspekty Chirona a planétok',
    'Raw ephemeris trace': 'Surový záznam efemeríd',
    /* ------------------------------------------------------------------ *
     * THE NORMALIZED BIRTH MOMENT
     *
     * The timezone ID itself (`Europe/Bratislava`) is a value and stays as the
     * IANA database writes it; the row that holds it is still a name for a
     * reader, so it reads in Slovak and keeps `IANA` as the scheme name.
     * ------------------------------------------------------------------ */
    'Local birth date': 'Miestny dátum narodenia',
    'Local birth time': 'Miestny čas narodenia',
    'Effective birth time': 'Efektívny čas narodenia',
    'IANA timezone': 'Časové pásmo (IANA)',
    'Timezone source': 'Zdroj časového pásma',
    'Timezone confidence': 'Spoľahlivosť časového pásma',
    'Timezone limitations': 'Obmedzenia časového pásma',
    Latitude: 'Zemepisná šírka',
    Longitude: 'Zemepisná dĺžka',
    'Location precision': 'Presnosť miesta',
    'Location source': 'Zdroj miesta',
    'Location provider': 'Poskytovateľ miesta',
    'Normalization method': 'Metóda normalizácie',
    'UTC datetime': 'Dátum a čas v UTC',
    'UTC input': 'Vstup v UTC',
    'Julian date': 'Juliánsky dátum',
    /* ------------------------------------------------------------------ *
     * THE EPHEMERIS AND ANGLE TRACES
     * ------------------------------------------------------------------ */
    'Local sidereal time': 'Miestny hviezdny čas',
    Obliquity: 'Sklon ekliptiky',
    'Moon phase angle': 'Uhol fázy Mesiaca',
    'Moon phase illumination': 'Osvetlenie Mesiaca',
    'Moon sign boundary check': 'Kontrola hranice znamenia Mesiaca',
    'Retrograde bodies': 'Retrográdne telesá',
    'Retrograde sampling method': 'Metóda vzorkovania retrogradity',
    'Lunar node model': 'Model lunárneho uzla',
    'Angles and houses': 'Uhly a domy',
    Houses: 'Domy',
    /* ------------------------------------------------------------------ *
     * DIGNITY AND EMPHASIS TRACES
     * ------------------------------------------------------------------ */
    'Dignity scheme': 'Schéma dignít',
    'Stellium threshold': 'Prah pre stellium',
    /* ------------------------------------------------------------------ *
     * DISTRIBUTION COUNTS
     * ------------------------------------------------------------------ */
    Elements: 'Živly',
    Modalities: 'Kvality',
};
/*
 * The four per-body trace fields, in the colon frame described above. The value
 * beside each one is a raw readout - a degree, a method name, a motion state
 * with its speed - and is not touched here.
 */
const BODY_FIELD = {
    house: 'Dom',
    longitude: 'Ekliptikálna dĺžka',
    method: 'Metóda',
    motion: 'Pohyb',
    accuracy: 'Presnosť',
};
/** The house systems by the names Slovak astrology uses (the established English name stays in brackets). */
const HOUSE_SYSTEM_SK = {
    'Whole Sign': 'celé znamenia (Whole Sign)',
    'Equal House': 'rovnaké domy (Equal House)',
    Porphyry: 'Porfyrov systém (Porphyry)',
    Placidus: 'Placidus',
};
export const WESTERN_ASTROLOGY_PATTERNS = [
    [/^Aspect: (\w+(?: Node)?) (\w+) (\w+(?: Node)?)$/, (m) => {
            const a = body(m[1]) ?? node(m[1]);
            const b = body(m[3]) ?? node(m[3]);
            const kind = ASPECT[m[2].toLowerCase()];
            return a && b && kind ? `Aspekt: ${a} — ${kind} — ${b}` : null;
        }],
    /* The same aspect without the `Aspect: ` prefix: the raw trace rows in the
       `Major aspects` group are labelled by the pair alone. Three ASCII words is
       a loose shape, so all three parts have to resolve or this returns null and
       the label falls through to the next pattern. */
    [/^(\w+(?: Node)?) (\w+) (\w+(?: Node)?)$/, (m) => {
            const a = body(m[1]) ?? node(m[1]);
            const b = body(m[3]) ?? node(m[3]);
            const kind = ASPECT[m[2].toLowerCase()];
            return a && b && kind ? `${a} — ${kind} — ${b}` : null;
        }],
    /* A house system's rows in the Advanced chart's group: its cusps and its method, or the bare name of a system the chart cannot calculate. */
    [/^(Whole Sign|Equal House|Porphyry|Placidus) (cusps|method)$/, (m) => {
            const system = HOUSE_SYSTEM_SK[m[1]];
            return system ? `${m[2] === 'cusps' ? 'Hroty domov' : 'Metóda'}: ${system}` : null;
        }],
    [/^(Whole Sign|Equal House|Porphyry|Placidus)$/, (m) => HOUSE_SYSTEM_SK[m[1]] ?? null],
    [/^House placement: (.+)$/, (m) => {
            const b = body(m[1]) ?? node(m[1]);
            return b ? `Postavenie v dome: ${b}` : null;
        }],
    [/^Angular: (.+)$/, (m) => {
            const b = body(m[1]) ?? node(m[1]);
            return b ? `Na uhle: ${b}` : null;
        }],
    /* A stellium is named after whatever holds it - a sign or a house - so the
       tail is either a zodiac sign or `House N`, and nothing else translates. */
    [/^Stellium: (.+)$/, (m) => {
            const inSign = sign(m[1]);
            if (inSign)
                return `Stellium: ${inSign}`;
            const inHouse = m[1].match(/^House (\d{1,2})$/);
            return inHouse ? `Stellium: Dom ${inHouse[1]}` : null;
        }],
    [/^House (\d{1,2})$/, (m) => `Dom ${m[1]}`],
    [/^(\w+(?: Node)?) (house|longitude|method|motion|accuracy)$/, (m) => {
            const b = body(m[1]) ?? node(m[1]);
            const field = BODY_FIELD[m[2]];
            return b && field ? `${field}: ${b}` : null;
        }],
    /* A body standing alone as the name of a row: the planetary position table,
       the dignity table, and every key output that is just a placement. */
    [/^([A-Za-z]+(?: Node)?)$/, (m) => body(m[1]) ?? node(m[1])],
];
