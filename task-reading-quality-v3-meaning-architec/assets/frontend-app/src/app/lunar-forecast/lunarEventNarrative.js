/*
 * Lunar Forecast's reader-facing layer. The event and natal contacts have already
 * been calculated elsewhere; this module only composes their symbolic meaning.
 * Keep exact placements and methodology in the separate technical disclosure.
 * No biographical facts or certain future events are inferred from a chart.
 */
const HOUSES = {
    sk: [
        { focus: 'vlastný smer a priestor pre seba', question: 'Kedy sa rozhoduješ podľa svojich potrieb a kedy iba reaguješ na očakávania druhých?' },
        { focus: 'peniaze, istotu a osobné hodnoty', question: 'Kde držíš zdroje príliš pevne zo strachu a kde potrebuješ jasnejšiu dohodu?' },
        { focus: 'každodenné rozhovory a informácie', question: 'Riešiš konkrétne fakty, alebo sa v debate míňate, pretože každý hovorí o inom cieli?' },
        { focus: 'domov, súkromie a vnútorné zázemie', question: 'Čomu doma venuješ energiu a čo z nej odchádza kvôli vonkajším povinnostiam?' },
        { focus: 'radosť, tvorivosť a osobné vyjadrenie', question: 'Čo robíš preto, že ťa to teší, a čo len kvôli prijatiu okolím?' },
        { focus: 'prácu, denný rytmus a starostlivosť o seba', question: 'Pomáha ti tvoj režim, alebo udržiavaš výkon aj vtedy, keď potrebuješ prestávku?' },
        { focus: 'partnerstvá a blízke vzťahy', question: 'Kde ustupuješ len pre pokoj a kde naopak nechávaš málo priestoru druhému?' },
        { focus: 'zdieľané zdroje, intimitu a dôveru', question: 'Je medzi vami jasné, čo je spoločné, čo zostáva osobné a kde sú hranice?' },
        { focus: 'presvedčenia, štúdium a širší výhľad', question: 'Držíš sa veľkého vysvetlenia aj tam, kde mu odporujú drobné každodenné fakty?' },
        { focus: 'povolanie, zodpovednosť a verejný smer', question: 'Ktoré povinnosti sú naozaj tvoje a ktoré preberáš na úkor súkromného života?' },
        { focus: 'priateľstvá, skupiny a spoločné ciele', question: 'Kde sa prispôsobuješ skupine natoľko, že strácaš radosť z vlastného nápadu?' },
        { focus: 'odpočinok, samotu a vnútorné spracovanie', question: 'Nezamieňaš si neustálu činnosť s pokrokom, keď by viac pomohol odstup?' },
    ],
    en: [
        { focus: 'your own direction and room to be yourself' },
        { focus: 'money, security and personal values' },
        { focus: 'daily conversations and information' },
        { focus: 'home, privacy and your inner foundation' },
        { focus: 'joy, creativity and personal expression' },
        { focus: 'work, daily rhythm and self-care' },
        { focus: 'partnerships and close relationships' },
        { focus: 'shared resources, intimacy and trust' },
        { focus: 'beliefs, study and the wider view' },
        { focus: 'career, responsibility and public direction' },
        { focus: 'friends, groups and shared goals' },
        { focus: 'rest, solitude and the inner life' },
    ],
};
const SIGNS = {
    sk: [
        { full: 'Baran chce konať priamo, Váhy pripomínajú dôsledky pre druhých. Dôležitý rozdiel je medzi úprimnou iniciatívou a tlakom na súhlas.', fresh: 'Baran dáva začiatku odvahu. Užitočnejší než veľký plán bude prvý samostatný krok, pri ktorom vieš, prečo ho robíš.' },
        { full: 'Býk hľadá istotu a stálosť, Škorpión sa pýta na dôveru a nevyhnutné zmeny. Pokoj má hodnotu, no nie vtedy, ak stojí na nevyslovenom probléme.', fresh: 'Býk smeruje k tomu, čo sa dá udržať. Začiatok má zmysel vtedy, ak stojí na reálnych zdrojoch a zvládnuteľnom tempe.' },
        { full: 'Blíženci zbierajú fakty a otázky, Strelec hľadá väčší význam. Daj pozor, aby rýchla odpoveď neprekryla to, čo ešte naozaj nevieš.', fresh: 'Blíženci prajú skúšaniu a rozhovoru. Namiesto jedného definitívneho záveru zvoľ malý pokus a spätnú väzbu.' },
        { full: 'Rak chráni súkromné bezpečie, Kozorožec zdôrazňuje zodpovednosť. Ani starostlivosť, ani výkon nemusia stáť na tom, že jednu stranu úplne zanedbáš.', fresh: 'Rak upriamuje pozornosť na zázemie a bezpečie. Začni tam, kde môže drobná pravidelná starostlivosť vytvoriť viac pokoja.' },
        { full: 'Lev chce tvoriť a byť videný, Vodnár pripomína spoločný priestor. Skús odlíšiť vlastnú radosť od potreby uznania.', fresh: 'Lev podporuje tvorivé vyjadrenie. Začni niečím, pri čom je dôležitá radosť z tvorby, nie okamžitá odozva.' },
        { full: 'Panna skúma detaily a fungovanie, Ryby ukazujú potrebu oddychu a odstupu. Nie všetko, čo je nedokonalé, si vyžaduje ďalšiu opravu.', fresh: 'Panna dáva začiatku praktický smer. Jeden udržateľný návyk bude užitočnejší než komplikovaný systém zmien.' },
        { full: 'Váhy hľadajú dohodu, Baran bráni vlastnú iniciatívu. Rozlišuj medzi skutočným kompromisom a mlčaním zo strachu z nesúhlasu.', fresh: 'Váhy začínajú rozhovorom o rovnováhe. Pomenuj očakávania oboch strán ešte pred tým, než vznikne záväzok.' },
        { full: 'Škorpión sa dotýka dôvery a premien, Býk chce zostať pri istote. Hlbší rozhovor nemusí znamenať stratu bezpečia; môže ukázať, na čom skutočne stojí.', fresh: 'Škorpión otvára otázku dôvery. Začni tým, že si priznáš, čo nechceš ďalej prehliadať, bez tlaku na rýchle rozhodnutie.' },
        { full: 'Strelec hľadá širší zmysel, Blíženci pripomínajú konkrétne fakty. Silné presvedčenie má cenu až vtedy, keď zostáva otvorené otázkam.', fresh: 'Strelec rozširuje obzor. Zvoľ jednu tému, ktorú chceš spoznať hlbšie, namiesto sľubu, že zmeníš všetko naraz.' },
        { full: 'Kozorožec stavia na povinnosti, Rak pripomína ľudskú potrebu zázemia. Výsledok, ktorý ťa dlhodobo vyčerpáva, nemusí byť dobrá dohoda.', fresh: 'Kozorožec podporuje dlhodobú stavbu. Stanov jeden realistický záväzok a spôsob, ako rozpoznáš pokrok.' },
        { full: 'Vodnár vidí skupinu a budúcnosť, Lev osobný hlas. Spoločná vízia funguje lepšie, ak v nej zostáva priestor pre jednotlivca.', fresh: 'Vodnár otvára nový pohľad na spoločné ciele. Skús jednu zmenu v spolupráci bez potreby presvedčiť všetkých naraz.' },
        { full: 'Ryby potrebujú priestor na cit a predstavivosť, Panna chce pomenovať konkrétny postup. Oddych a štruktúra sa nemusia vylučovať.', fresh: 'Ryby dávajú začiatku jemnejší tón. Dopraj nápadu priestor, ale pripoj k nemu jeden jednoduchý krok do reality.' },
    ],
    en: [
        { full: 'Aries wants direct action while Libra weighs the effect on others. There is a difference between honest initiative and pressuring someone to agree.', fresh: 'Aries favours initiative. A small step you can own matters more than an ambitious declaration.' },
        { full: 'Taurus seeks steadiness while Scorpio asks about trust and necessary change. Peace is valuable, but not when it rests on an unspoken problem.', fresh: 'Taurus asks what can last. Begin with real resources and a pace you can sustain.' },
        { full: 'Gemini gathers facts while Sagittarius searches for the larger meaning. A quick answer should not cover up what you still do not know.', fresh: 'Gemini favours experiments and conversation. Test an idea and invite feedback before declaring a final answer.' },
        { full: 'Cancer protects private security while Capricorn stresses duty. Caring and achieving need not require neglecting either side.', fresh: 'Cancer draws attention to emotional foundations. A small recurring act of care can be a meaningful beginning.' },
        { full: 'Leo seeks expression while Aquarius remembers the group. Notice the difference between the pleasure of creating and a need for approval.', fresh: 'Leo favours creative expression. Begin with something worth making even before anyone reacts to it.' },
        { full: 'Virgo examines the details while Pisces needs rest and perspective. Not everything imperfect needs another round of fixing.', fresh: 'Virgo gives a beginning practical shape. One sustainable habit is worth more than an elaborate improvement system.' },
        { full: 'Libra seeks agreement while Aries protects initiative. Distinguish compromise from silence driven by fear of disagreement.', fresh: 'Libra starts with a conversation about fairness. Clarify both sides’ expectations before making a commitment.' },
        { full: 'Scorpio raises trust and change while Taurus wants safety. A deeper conversation need not destroy stability; it may show what stability rests on.', fresh: 'Scorpio turns towards trust. Admit what you can no longer ignore without forcing an immediate decision.' },
        { full: 'Sagittarius looks for meaning while Gemini checks the facts. A strong belief stays useful when it remains open to questions.', fresh: 'Sagittarius widens the view. Choose one subject to explore instead of promising to change everything.' },
        { full: 'Capricorn values duty while Cancer remembers the need for a foundation. A result that keeps exhausting you may not be a good bargain.', fresh: 'Capricorn values steady construction. Choose one realistic commitment and decide how to recognise progress.' },
        { full: 'Aquarius looks to the group while Leo protects the personal voice. Shared plans work better when individuals retain room to contribute.', fresh: 'Aquarius invites a new view of shared goals. Try one change in cooperation without needing everyone to agree immediately.' },
        { full: 'Pisces needs imagination and feeling while Virgo asks for a method. Rest and structure do not have to compete.', fresh: 'Pisces gives a beginning a gentler tone. Give the idea room, then connect it to one simple action.' },
    ],
};
const SIGNS_EN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const AXIS_NOTE = {
    sk: [
        'Aj v blízkom vzťahu potrebuje zostať priestor pre vlastné rozhodnutia. Dohoda má zmysel vtedy, keď sa v nej ani jedna strana nemusí stratiť.',
        'Hranica medzi tým, čo je tvoje, a tým, čo zdieľaš, nie je len otázkou peňazí. Ide aj o dôveru a o to, kto o čom rozhoduje.',
        'Širší pohľad dáva každodenným faktom význam, no môže ich aj prekryť. Pomáha odlíšiť, čo skutočne vieš, od toho, čo si zatiaľ iba vysvetľuješ.',
        'Súkromné zázemie a verejné záväzky sa potrebujú navzájom podporovať. Ak povinnosti vytláčajú oddych alebo blízkosť, otázkou nemusí byť, ako stihnúť viac, ale čomu dať prednosť.',
        'Vlastná tvorivosť môže obohatiť ľudí okolo teba práve tým, že je osobná. Patriť do skupiny nemusí znamenať prispôsobiť jej každý svoj nápad.',
        'Denné povinnosti môžu dávať životu rytmus, ale bez priestoru na obnovu síl prestávajú slúžiť. Odpočinok nie je opakom zodpovednosti.',
    ],
    en: [
        'Even a close relationship needs room for independent choices. An agreement works best when neither person has to disappear into it.',
        'The line between what is yours and what you share is not only about money. It is also about trust and who gets to decide what.',
        'The bigger picture gives everyday facts meaning, but it can also obscure them. It helps to distinguish what you know from what you are interpreting.',
        'Private foundations and public obligations need to support each other. If duties crowd out rest or closeness, the question may not be how to do more, but what deserves priority.',
        'Your own creativity can contribute to a group precisely because it is personal. Belonging does not have to mean adjusting every idea to fit.',
        'Daily duties can give life rhythm, but without room to recover they stop serving you. Rest is not the opposite of responsibility.',
    ],
};
const POINTS = {
    sk: {
        Sun: 'jasnejšie pomenovať vlastný postoj', Moon: 'rozpoznať, čo ti dáva bezpečie', Mercury: 'vysloviť otázku alebo spresniť dohodu', Venus: 'hovoriť o hodnotách a blízkosti', Mars: 'urobiť konkrétny krok a nastaviť hranicu', Jupiter: 'vidieť možnosti bez prehnaných sľubov', Saturn: 'prevziať primeranú zodpovednosť', Uranus: 'zvážiť zmenu bez náhlenia', Neptune: 'odlíšiť predstavu od reality', Pluto: 'otvoriť otázku dôvery a moci', Ascendant: 'vystupovať otvorenejšie a zrozumiteľnejšie', Midheaven: 'spresniť verejný smer a zodpovednosť',
    },
    en: {
        Sun: 'state your position more clearly', Moon: 'recognise what makes you feel secure', Mercury: 'ask a question or clarify an agreement', Venus: 'speak about values and closeness', Mars: 'take a concrete step and set a boundary', Jupiter: 'see possibilities without overpromising', Saturn: 'accept a proportionate responsibility', Uranus: 'consider change without rushing', Neptune: 'separate an ideal from reality', Pluto: 'raise a question about trust and power', Ascendant: 'show up more openly and clearly', Midheaven: 'clarify public direction and responsibility',
    },
};
function contactText(input) {
    const { lang, activations } = input;
    if (!activations.length)
        return null;
    const supportive = activations.filter((a) => a.aspect === 'trine' || a.aspect === 'sextile');
    const demanding = activations.filter((a) => !['trine', 'sextile'].includes(a.aspect));
    const points = (items) => items.slice(0, 2).map((a) => POINTS[lang][a.natal]).filter(Boolean);
    const join = (items) => lang === 'sk' ? items.join(' a zároveň ') : items.join(' and to ');
    const parts = [];
    if (supportive.length) {
        const action = join(points(supportive));
        if (action)
            parts.push(lang === 'sk'
                ? `Podporné väzby v natálnej mape naznačujú, že pri tejto téme môže byť užitočné ${action}.`
                : `Supportive natal contacts point to the value of being able to ${action}.`);
    }
    if (demanding.length) {
        const action = join(points(demanding));
        if (action && lang === 'sk') {
            parts.push(`Náročnejšie väzby zároveň upozorňujú na potrebu ${action}. Ak sa objaví odpor, je užitočnejšie preskúmať jeho príčinu než hneď tlačiť na výsledok.`);
        }
        else if (action) {
            /* English: a conjunction is a direct meeting, not a hard aspect; only a square or an opposition is met with "resistance". */
            const hard = demanding.filter((a) => a.aspect !== 'conjunction');
            const direct = demanding.filter((a) => a.aspect === 'conjunction');
            if (hard.length)
                parts.push(`More demanding contacts also highlight the need to ${join(points(hard))}. If there is resistance, examining its source is more useful than forcing a result.`);
            if (direct.length)
                parts.push(`A contact that sits directly on a point of your chart puts extra weight on being able to ${join(points(direct))}.`);
        }
    }
    if (!parts.length)
        return null;
    return parts.join(' ');
}
/** 2–3 coherent paragraphs; fewer and less specific when the chart supports less. */
export function lunarEventNarrative(input) {
    const { lang, kind, moonHouse, sunHouse } = input;
    const sign = SIGNS_EN.indexOf(input.moonSign);
    if (sign < 0)
        return [];
    const houses = HOUSES[lang];
    const theme = moonHouse === null ? null : houses[moonHouse - 1];
    const other = sunHouse === null ? null : houses[sunHouse - 1];
    const signText = SIGNS[lang][sign][kind === 'full' ? 'full' : 'fresh'];
    const paragraphs = [];
    if (kind === 'full') {
        if (theme && other) {
            const axisNote = AXIS_NOTE[lang][(moonHouse - 1) % 6];
            paragraphs.push(lang === 'sk'
                ? `Tento spln v tvojej mape spája tieto témy: „${theme.focus}“ a „${other.focus}“. ${axisNote} ${theme.question}`
                : `The most personal theme of this Full Moon is the tension between ${theme.focus} and ${other.focus}. ${axisNote}`);
        }
        else {
            paragraphs.push(lang === 'sk'
                ? (input.hasNatal ? 'Spln tradične upozorňuje na dve stránky jednej témy. Bez spoľahlivého rozdelenia do životných oblastí nemožno poctivo povedať, kde presne sa má táto téma u teba odohrávať.' : 'Spln tradične otvára dve stránky jednej témy. Bez osobnej natálnej mapy zostáva tento výklad všeobecný a nepripisuje ti konkrétne životné okolnosti.')
                : (input.hasNatal ? 'A Full Moon traditionally brings two sides of a theme into view. Without reliable house placements, the chart cannot honestly locate that theme in a specific area of your life.' : 'A Full Moon traditionally brings two sides of a theme into view. Without a natal chart this is a general reading, not a claim about your circumstances.'));
        }
        paragraphs.push(signText);
    }
    else {
        if (theme) {
            paragraphs.push(lang === 'sk'
                ? `Nov upriamuje pozornosť na tému „${theme.focus}“. Nejde o príkaz urobiť veľký obrat; skôr o vedomé rozhodnutie, aký nový spôsob fungovania chceš vyskúšať. ${theme.question}`
                : `This New Moon offers a starting point around ${theme.focus}. It is not an instruction to overhaul your life, but a chance to choose one different way of doing things.`);
        }
        else {
            paragraphs.push(lang === 'sk'
                ? (input.hasNatal ? 'Nov tradične predstavuje začiatok. Bez spoľahlivého času narodenia však nemožno určiť konkrétnu životnú oblasť, preto sa výklad drží všeobecnej témy znamenia a dostupných natálnych väzieb.' : 'Nov tradične predstavuje začiatok. Bez osobnej natálnej mapy sa výklad drží všeobecnej témy znamenia.')
                : (input.hasNatal ? 'A New Moon traditionally represents a beginning. Without reliable birth-time information, the chart cannot place it in a specific life area; the reading therefore stays with the sign and the natal contacts that are available.' : 'A New Moon traditionally represents a beginning. Without a natal chart the reading stays with the general theme of the sign.'));
        }
        paragraphs.push(signText);
    }
    const contacts = contactText(input);
    if (contacts)
        paragraphs.push(contacts);
    /* English: the reflection plan's question closes the last paragraph, once; the area pair or the contact it asks about has already been named above. */
    if (lang === 'en' && input.reflection && paragraphs.length > 0)
        paragraphs[paragraphs.length - 1] = `${paragraphs[paragraphs.length - 1]} ${input.reflection}`;
    return paragraphs;
}
