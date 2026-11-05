import { activeLocale } from '../i18n/locale.js';
import { windowPhraseSk } from '../i18n/engineProse.js';
/*
 * WHAT EACH PILLAR SAYS IT CANNOT DO.
 *
 * A limitation is the most load-bearing sentence in the whole product. It is
 * the place where the app tells the reader, in its own voice, that a value is
 * approximate, that a convention is contested, that schools disagree, or that
 * nothing here is medical advice. Everything else can be read as flavour; these
 * cannot.
 *
 * WHY A TABLE AND NOT AN ENGINE CHANGE
 * The strings are authored inside the engines, next to the condition that
 * raises them, which is where they belong - the sentence and the branch that
 * emits it should be readable together. Translating them in place would mean
 * putting locale awareness into the astronomy and calendar code, which is the
 * one part of this codebase that must stay pure and deterministic. So this is a
 * late, purely textual overlay applied once where the reading is composed,
 * exactly like the prose overlay on the knowledge units.
 *
 * WHY EXACT MATCH
 * These are fixed sentences, not templates. Matching the whole string means a
 * reworded English limitation shows up as a reported gap instead of silently
 * getting a stale Slovak sentence that no longer says the same thing - which,
 * for this particular class of text, is the worst failure available.
 *
 * THE TRANSLATION RULE APPLIED HERE
 * The hedge IS the content. "not medical advice", "not a universal standard",
 * "no name is invented", "rather than showing a falsely precise value" all
 * survive as full clauses. Where the English states plainly that something is
 * not implemented, the Slovak says so too, rather than softening it into a
 * promise that it is coming.
 */
const SK = {
    /* ---------------------------------------------------------- numerology -- */
    'Numerology is presented as symbolic reflection, not identity certainty.': 'Numerológia je symbolické zrkadlo na zamyslenie, nie istota o tom, kto si.',
    'The Pythagorean letter mapping is used. A Chaldean mapping assigns different letter values and would produce different name-based numbers.': 'Používa sa pytagorovské priradenie písmen k číslam. Chaldejské priradenie dáva písmenám iné hodnoty, takže by z mena vyšli iné čísla.',
    'Master numbers 11, 22 and 33 are kept in the reduced birth month, day and year that build the Life Path and the Pinnacles. For the Challenges the same parts are reduced to single digits first.': 'Majstrovské čísla 11, 22 a 33 zostávajú zachované v zredukovanom mesiaci, dni a roku narodenia, z ktorých sa skladá životná cesta a vrcholy. Pri výzvach sa tie isté časti najprv zredukujú na jednociferné čísla.',
    'A Challenge is therefore a difference of two single digits and runs from 0 to 8; a Challenge of 0 is a real result.': 'Výzva je preto rozdiel dvoch jednociferných čísel a pohybuje sa od 0 do 8; výzva 0 je skutočný výsledok.',
    'Pinnacle age spans are calendar-age windows, not predictions about what happens inside them.': 'Vekové rozpätia vrcholov sú len kalendárne okná podľa veku. Nie sú predpoveďou toho, čo sa v nich stane.',
    /* --------------------------------------------------- western astrology -- */
    'Astrology is presented as symbolic reflection, not predictive or identity certainty.': 'Astrológia je symbolické zrkadlo na zamyslenie. Nič nepredpovedá a nehovorí s istotou, kto si.',
    'Planet longitudes are geocentric; coordinates are used for local angles and houses.': 'Polohy planét sú počítané geocentricky, teda zo stredu Zeme. Súradnice miesta narodenia sa používajú na miestne uhly a domy.',
    'Whole Sign Houses are the house system of the reading and of Technical details. Equal House, Porphyry and Placidus can be explored on the chart wheel (Advanced chart) and never change the reading; Placidus is not available beyond the polar circles. Other systems (Koch, Regiomontanus, Campanus and the like) are not implemented.': 'Systémom domov výkladu aj Technických podrobností sú Whole Sign Houses (celé znamenia). Equal House, Porphyry a Placidus možno skúmať na kruhu mapy (rozšírený kruh); výklad nikdy nemenia. Placidus nie je dostupný za polárnymi kruhmi. Ďalšie systémy (Koch, Regiomontanus, Campanus a podobné) zapracované nie sú.',
    'Minor aspects (semisextile, semisquare, sesquiquadrate, quincunx) are calculated for the Advanced chart with their own tighter orbs and are not used by the reading; other minor aspects (quintile, septile and the like) are not implemented. Chiron, Ceres, Pallas, Juno and Vesta are calculated for the Advanced chart for births from 1890 to 2110 and are not used by the reading; other asteroids are not implemented.': 'Vedľajšie aspekty (semisextil, semikvadrát, sesquikvadrát, kvinkunx) sa počítajú pre rozšírený kruh vlastnými, užšími orbmi a výklad ich nepoužíva; ďalšie vedľajšie aspekty (kvintil, septil a podobné) zapracované nie sú. Chiron, Ceres, Pallas, Juno a Vesta sa pre rozšírený kruh počítajú pre narodenia od roku 1890 do roku 2110 a výklad ich nepoužíva; ďalšie planétky zapracované nie sú.',
    'Aspect patterns (T-square, Grand Trine, Yod), chart shape, and a dominant-planet score are not implemented; dominance in particular has no single agreed weighting across authors.': 'Aspektové obrazce (T-kvadrát, veľký trigon, jod), tvar mapy ani skóre dominantnej planéty nie sú zapracované. Pri dominancii navyše neexistuje jedno váženie, na ktorom by sa autori zhodli.',
    'Chart ruler uses modern rulership (Pluto/Uranus/Neptune rule Scorpio/Aquarius/Pisces); traditional rulership is not mixed in.': 'Vládca mapy je určený podľa modernej vlády (Pluto, Urán a Neptún vládnu Škorpiónovi, Vodnárovi a Rybám). Tradičná vláda sa do toho nemieša.',
    'Essential dignity uses the traditional seven-planet rulership scheme and scores only domicile, exaltation, detriment and fall. Triplicity, term and face need a chosen authority whose tables differ, so they are not scored. Uranus, Neptune and Pluto have no agreed traditional dignity and are left unscored rather than given a modern rulership the sources disagree on.': 'Esenciálna dignita (sila planéty podľa znamenia) vychádza z tradičnej sedemplanétovej schémy a hodnotí len domicil, exaltáciu, exil a pád. Triplicita, termín a tvár by si vyžadovali vybrať jednu autoritu, no ich tabuľky sa navzájom líšia, preto sa nehodnotia. Urán, Neptún a Pluto nemajú dohodnutú tradičnú dignitu, takže zostávajú nehodnotené — namiesto toho, aby im bola pridelená moderná vláda, na ktorej sa zdroje nezhodujú.',
    'The chart ruler above uses the modern rulership convention while essential dignity uses the traditional one. The two schemes disagree about Scorpio, Aquarius and Pisces, so the two outputs are deliberately labelled with the scheme each follows.': 'Vládca mapy vyššie používa modernú vládu, kým esenciálna dignita používa tradičnú. Tieto dve schémy sa nezhodujú pri Škorpiónovi, Vodnárovi a Rybách, preto je pri každom výstupe zámerne uvedené, ktorou schémou sa riadi.',
    'North Node uses the true (osculating) node model; it can differ from the mean node by up to ~1.5 degrees, which can shift the node sign/house near a boundary. South Node is the exact +180 degree opposition.': 'Severný uzol je počítaný ako pravý (oskulačný) uzol. Od stredného uzla sa môže líšiť približne o 1,5 stupňa, čo pri hranici môže posunúť znamenie alebo dom uzla. Južný uzol je presne o 180 stupňov oproti.',
    'The Ascendant, Midheaven, houses, house placements and the Ascendant-derived chart ruler depend on the birth time. With an exact time they are read normally. With an estimate, an angle that changes within two hours of it is read as provisional, and the houses and chart ruler are left out unless the rising sign holds across that window. With no time they are withheld rather than read from the 12:00 local reference the engine calculates with.': 'Ascendent, Medium Coeli, domy, postavenia v domoch a vládca mapy odvodený od ascendentu závisia od času narodenia. Pri presnom čase sa čítajú bežne. Pri odhade sa os, ktorá sa do dvoch hodín od neho mení, číta ako predbežná, a domy s vládcom mapy sa vynechávajú, ak ascendent v celom tomto okne neostáva v jednom znamení. Bez času narodenia sa neuvádzajú vôbec a nečítajú sa ani z referenčných 12:00 miestneho času, s ktorými výpočet pracuje.',
    'Birth time was not supplied. The planets are calculated for 12:00 local time only as a reference, and each planet\'s sign is checked across the whole day of birth: a planet that changes sign that day is read both ways, never as its noon value, and the Ascendant, Midheaven, houses, chart ruler, angular planets and hemisphere balance are withheld.': 'Čas narodenia nebol zadaný. Planéty sú vypočítané pre 12:00 miestneho času len ako referenčný bod a znamenie každej planéty sa kontroluje počas celého dňa narodenia: planéta, ktorá v ten deň mení znamenie, sa číta oboma spôsobmi, nikdy nie podľa poludňajšej hodnoty, a ascendent, Medium Coeli, domy, vládca mapy, planéty na osiach aj rozloženie do pologúľ sa neuvádzajú.',
    'Birth time is your own estimate. The chart is calculated for the time given and checked two hours either side of it: results that hold across that window are marked as resting on an estimate, and a rising sign that changes within it is read as provisional, with the chart ruler and houses left out.': 'Čas narodenia je tvoj vlastný odhad. Mapa je vypočítaná pre uvedený čas a skontrolovaná dve hodiny pred ním aj po ňom: výsledky, ktoré v tom okne platia, sú označené ako stojace na odhade, a ascendent, ktorý sa v ňom mení, sa číta ako predbežný, pričom vládca mapy a domy sa vynechávajú.',
    /* ------------------------------------------------------------ bazi/tcm -- */
    'TCM content is traditional correspondence and non-diagnostic reflection only. It does not diagnose, does not prescribe treatment, and is not medical advice.': 'Obsah z TČM sú len tradičné súvzťažnosti a nediagnostické zamyslenie. Nič nediagnostikuje, nepredpisuje liečbu a nie je to lekárska rada.',
    'Hidden-stem weighting uses one commonly cited conventional percentage model; it is not a universal standard across BaZi schools.': 'Váženie skrytých kmeňov vychádza z jedného bežne citovaného percentuálneho modelu. Nie je to všeobecne platný štandard, školy BaZi sa v ňom líšia.',
    'Day Master strength is a model-derived balancing hypothesis (see Five Phase balance section), not a definitive Useful God (Yong Shen) determination.': 'Sila Day Mastera je hypotéza o rovnováhe odvodená z modelu (pozri časť o rovnováhe piatich fáz). Nie je to definitívne určenie užitočného živlu (Yong Shen).',
    'Stem and branch combinations/punishments show structural presence only; elemental transformation is never asserted since the seasonal/structural conditions that would confirm it are not modeled.': 'Spojenia a tresty kmeňov a vetiev ukazujú len to, že daná štruktúra je v mape prítomná. Premena živlu sa nikdy netvrdí, pretože sezónne a štruktúrne podmienky, ktoré by ju potvrdili, tento model nepočíta.',
    'Luck Pillar direction (forward/reverse) follows Year Stem polarity and the body selected at onboarding. Both sequences are calculated and the natal chart does not choose between them; the Forecast applies the rule, and chooses no direction when the body was left undefined.': 'Smer pilierov šťastia (dopredu alebo dozadu) vyplýva z polarity kmeňa roku a z tela zvoleného pri onboardingu. Počítajú sa obe postupnosti a rodná mapa medzi nimi nevyberá; pravidlo uplatňuje Predpoveď a ak telo zostalo neurčené, smer nevyberá.',
    'Birth time is your own estimate: the Hour Pillar and everything read from it are approximate, and the reading marks them so.': 'Čas narodenia je tvoj vlastný odhad: hodinový pilier a všetko, čo sa z neho číta, je približné a výklad to tak aj označuje.',
    'Birth time was not supplied. The Hour Pillar is unavailable rather than inferred from the 12:00 local-noon fallback.': 'Čas narodenia nebol zadaný. Hodinový pilier zostáva nedostupný – neodvodzuje sa z referenčných 12:00 miestneho času.',
    'Hour Pillar is unavailable because birth time was not supplied; it is never fabricated from the local-noon fallback.': 'Hodinový pilier je nedostupný, pretože nebol zadaný čas narodenia. Nikdy sa nevymýšľa z referenčných 12:00 miestneho času.',
    'Year and Month solar-term boundaries were evaluated at the shared 12:00 local-noon estimate and may be approximate on a boundary day.': 'Hranice solárnych termínov pre rok a mesiac boli počítané zo spoločného odhadu 12:00 miestneho poludnia. V deň, keď hranica prechádza, môžu byť preto približné.',
    'No solar-term boundary falls on the birth date, so the Year and Month Pillars are the same whatever the hour of birth was.': 'Na dátum narodenia nepripadá žiadna hranica solárneho termínu, takže ročný a mesačný pilier sú rovnaké, nech bola hodina narodenia akákoľvek.',
    'A normalized UTC birth moment is required for BaZi.': 'BaZi potrebuje normalizovaný moment narodenia v UTC.',
    /* -------------------------------------------------------- human design -- */
    'Human Design is presented as symbolic reflection, not fate, diagnosis, or identity certainty.': 'Human Design je symbolické zrkadlo na zamyslenie. Nie je to osud, diagnóza ani istota o tom, kto si.',
    'Type, strategy, authority, and definition are derived deterministically from the completed-channel center graph.': 'Type, Strategy, Authority a Definition sa odvodzujú jednoznačným výpočtom z grafu centier, ktoré spájajú úplné kanály.',
    'The Design moment is solved for a solar longitude exactly 88° before the Personality Sun using an iterative solar-speed correction.': 'Moment Design sa hľadá tam, kde je Slnko presne 88° pred Slnkom Personality. Používa sa pritom postupná oprava na rýchlosť Slnka.',
    'North Node activations use a locally derived osculating true lunar node (matching Swiss Ephemeris SE_TRUE_NODE); South Node is exactly 180° opposite.': 'Aktivácie severného uzla používajú lokálne vypočítaný pravý (oskulačný) lunárny uzol, zhodný so Swiss Ephemeris SE_TRUE_NODE. Južný uzol je presne o 180° oproti.',
    'Lunar node convention is unresolved across Human Design sources: the true (osculating) node used here can differ from the mean node by up to ~1.5°, which can shift the node line and, near a gate boundary, the node gate. This does not affect Type, Strategy, Authority, Definition, or Profile, which never depend on node lines.': 'Zdroje Human Designu sa nezhodujú v tom, ktorý lunárny uzol používať. Pravý (oskulačný) uzol použitý tu sa môže od stredného líšiť približne o 1,5°, čo môže posunúť líniu uzla a pri hranici brány aj samotnú bránu. Na Type, Strategy, Authority, Definition ani Profile to nemá vplyv — tie od línií uzlov nikdy nezávisia.',
    'The Incarnation Cross is reported by angle and its four gates. The proper cross name (for example "Cross of the Sphinx") requires a curated table of named crosses that this engine does not hold, so no name is invented.': 'Inkarnačný kríž je uvedený uhlom a svojimi štyrmi bránami. Vlastný názov kríža (napríklad „Cross of the Sphinx“) by si vyžadoval overenú tabuľku pomenovaných krížov, ktorú tento výpočet nemá — preto sa žiadny názov nevymýšľa.',
    'The four Variables are reported as arrow orientation with their color and tone numbers. The named PHS diet, environment, motivation, and perspective variants for each color are a separate interpretive table that is not implemented, so the color number is shown rather than a variant name.': 'Štyri premenné (Variables) sú uvedené ako smer šípky spolu s číslom farby a tónu. Pomenované varianty PHS pre stravu, prostredie, motiváciu a perspektívu tvoria samostatnú výkladovú tabuľku, ktorá zapracovaná nie je. Preto je uvedené číslo farby, nie názov variantu.',
    'Full interpretive BodyGraph text, circuitry grouping, and cognition are not implemented yet.': 'Úplný výkladový text k BodyGraphu, delenie na okruhy a cognition zatiaľ zapracované nie sú.',
    /* Replaced, not reworded: the old sentence ended "treat them as approximate",
       which is the state of a SUPPLIED estimate. This chart has no time at all
       and the mechanics are withheld, so saying "approximate" contradicted the
       suppression on the same screen. */
    'Birth time was not supplied. Every Human Design mechanic is read from one exact moment and can change within a single day, so Type, Strategy, Authority, Profile, Definition, the centres, the channels and the gates are withheld for this chart rather than derived from the 12:00 local-noon fallback the engine calculates with.': 'Čas narodenia nebol zadaný. Každá mechanika Human Designu sa číta z jedného presného okamihu a môže sa zmeniť v priebehu jediného dňa, preto sú typ, stratégia, autorita, profil, definícia, centrá, kanály aj brány pre túto mapu zadržané, a nie odvodené z dvanástej hodiny miestneho poludnia, s ktorou engine počíta.',
    /* The whole-day envelope (human-design/humanDesignEnvelope.ts) - what replaced
       the blanket refusal above wherever the birth date could be scanned. */
    'Birth time was not supplied. Every Human Design mechanic was checked across the whole birth date: the ones that hold at every instant of it are shown, and the ones that change are withheld rather than read from the 12:00 local reference the engine calculates with.': 'Čas narodenia nebol zadaný. Každá mechanika Human Designu sa preverila počas celého dňa narodenia: tie, ktoré platia v každom jeho okamihu, sú zobrazené, a tie, ktoré sa menia, sú vynechané – nečítajú sa z referenčnej 12:00 miestneho času, s ktorou engine počíta.',
    /* --------------------------------------------------------- cross-pillar -- */
    'Current synthesis evidence comes from one calculated pillar only.': 'Podklady pre túto syntézu zatiaľ pochádzajú len z jedného vypočítaného piliera.',
    /* -------------------------------------------------- birth-moment blocks -- */
    'A valid local birth date is required to calculate the UTC birth moment.': 'Na výpočet momentu narodenia v UTC je potrebný platný miestny dátum narodenia.',
    'A valid local birth time is required. Use HH:MM, or leave it empty to use the local noon estimate.': 'Je potrebný platný miestny čas narodenia. Zadaj ho v tvare HH:MM, alebo pole nechaj prázdne a použije sa odhad miestneho poludnia.',
    'Birth time was not supplied. Western Astrology used 12:00 local noon as a neutral midpoint estimate; Moon degree and other time-sensitive values are approximate.': 'Čas narodenia nebol zadaný. Západná astrológia použila 12:00 miestneho poludnia ako neutrálny stredový odhad. Stupeň Mesiaca a ďalšie hodnoty citlivé na čas sú preto približné.',
    'Birth time was not supplied.': 'Čas narodenia nebol zadaný.',
    'Selected birth coordinates are required for location provenance. Typed place text is not treated as coordinates.': 'Na doloženie pôvodu miesta sú potrebné vybrané súradnice narodenia. Napísaný text miesta sa za súradnice nepovažuje.',
    'A timezone could not be resolved automatically for the selected birth location. Astrology remains blocked.': 'Pre vybrané miesto narodenia sa nepodarilo automaticky určiť časové pásmo. Astrológia preto zostáva zablokovaná.',
    'Timezone resolution reported success without an IANA timezone. Astrology remains blocked.': 'Určovanie časového pásma ohlásilo úspech, ale nevrátilo pásmo IANA. Astrológia preto zostáva zablokovaná.',
};
/*
 * The one limitation that is not a fixed sentence.
 *
 * The invalid-timezone message interpolates the offending identifier, so it can
 * never match a table key. It gets a pattern of its own rather than being left
 * in English, and the identifier is carried through untouched because it is an
 * engine value, not prose.
 */
const PATTERNS = [
    [
        /^The timezone "(.+)" is not a valid IANA timezone identifier\.$/,
        (match) => `Časové pásmo „${match[1]}“ nie je platný identifikátor IANA.`,
    ],
    /* BaZi without a birth time, on a date a solar-term boundary falls on (model.ts). */
    [
        /^A solar-term boundary falls on the birth date, so the (Year and Month Pillars change|Month Pillar changes) during it \((.+)\)\. The chart is read at the 12:00 reference and should be treated as unsettled until a birth time is known\.$/,
        (match) => {
            const phrase = windowPhraseSk(match[2]) ?? match[2];
            const pillars = match[1].startsWith('Year') ? 'menia ročný aj mesačný pilier' : 'mení mesačný pilier';
            return `Na dátum narodenia pripadá hranica solárneho termínu, takže sa počas neho ${pillars} (${phrase}). Mapa sa číta pri referenčných 12:00 a kým nie je známy čas narodenia, treba ju brať ako neustálenú.`;
        },
    ],
];
const TABLES = { sk: SK };
/**
 * A limitation in the reader's language, or the English one.
 *
 * Falls back to the English sentence rather than to nothing: a limitation that
 * failed to translate must still be READ, because the alternative is an app
 * that quietly stops disclosing what it cannot do.
 */
export function limitationText(english) {
    const locale = activeLocale();
    const table = TABLES[locale];
    if (!table)
        return english;
    const text = english.trim();
    const exact = table[text];
    if (exact)
        return exact;
    for (const [pattern, render] of PATTERNS) {
        const match = text.match(pattern);
        if (match)
            return render(match);
    }
    return english;
}
/** Limitations with no Slovak. Used by the localisation coverage report. */
export function untranslatedLimitations(limitations) {
    return limitations.filter((limitation) => {
        const text = limitation.trim();
        if (SK[text])
            return false;
        return !PATTERNS.some(([pattern]) => pattern.test(text));
    });
}
/** Every English limitation this table can translate. Used by the coverage report. */
export const LIMITATION_KEYS = Object.keys(SK);
