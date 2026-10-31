import { hdCenterConceptKey } from '../components/humanDesignHeroConfig.js?v=d9f39e7';
const EN = {
    head: {
        name: 'Head',
        kind: 'a pressure centre',
        role: 'The Head centre, at the top of the graph, is the centre of mental pressure: the pull to think, to ask, to wonder. Human Design reads it as where inspiration and questions arise, before the Ajna turns them into a way of thinking.',
        themes: 'Inspiration, curiosity, questions, the drive to make sense of things.',
        gates: '64, 61 and 63 are its gates.',
        defined: 'a steady, reliable source of mental pressure and inspiration, which does not depend on who is nearby',
        open: 'it takes in other people’s questions and mental pressure and can amplify them, which the tradition describes as feeling the pressure to answer questions that are not one’s own',
    },
    ajna: {
        name: 'Ajna',
        kind: 'an awareness centre',
        role: 'The Ajna is the centre of mental awareness: where ideas are conceptualised, opinions formed and certainty reached. Human Design reads it as how a mind processes - not what it thinks, but how it arrives at thinking.',
        themes: 'Conceptualising, opinions, understanding, how certainty is built.',
        gates: '47, 24, 4, 17, 11 and 43 are its gates.',
        defined: 'a fixed, consistent way of thinking and processing information',
        open: 'a flexible mind that can take up many points of view, which the tradition cautions can slide into pretending to a certainty it does not have',
    },
    throat: {
        name: 'Throat',
        kind: 'the centre of manifestation',
        role: 'The Throat is the centre of expression and action: speech, communication, and the point where what is felt or understood in the other centres becomes something said or done. It is the most connected centre on the graph.',
        themes: 'Communication, expression, action, being heard, making things happen.',
        gates: '62, 23, 56, 35, 12, 45, 33, 8, 31, 20 and 16 are its gates.',
        defined: 'a consistent way of speaking and acting, which looks the same in every setting',
        open: 'an expression that changes with the company and the setting, which the tradition describes as a pressure to be heard or to draw attention',
    },
    g: {
        name: 'G / Identity',
        kind: 'the centre of identity and direction',
        role: 'The G centre, at the heart of the graph, is the centre of identity, direction and love. Human Design reads it as the sense of who one is and where one is going, and it sits between the mental centres above and the body’s centres below.',
        themes: 'Identity, direction, love, one’s place and path.',
        gates: '1, 13, 25, 46, 2, 15, 10 and 7 are its gates.',
        defined: 'a fixed sense of self and direction',
        open: 'a fluid sense of identity that is shaped by the people and places one is in, which the tradition describes as a search for direction and love',
    },
    ego: {
        name: 'Ego / Heart',
        kind: 'a motor centre',
        role: 'The Heart (Ego) centre is the centre of willpower: determination, the material world, worth and the ability to keep a promise. In Human Design it is a motor, a source of energy that is spent in short, strong efforts rather than steadily.',
        themes: 'Willpower, self-worth, value, promises, material resources.',
        gates: '21, 51, 26 and 40 are its gates.',
        defined: 'a consistent access to willpower, and a capacity to commit and to keep to it',
        open: 'no fixed willpower to draw on, which the tradition describes as a habit of trying to prove worth and of promising more than can be kept',
    },
    solarPlexus: {
        name: 'Solar Plexus',
        kind: 'a motor centre',
        role: 'The Solar Plexus is the centre of emotional awareness. Human Design reads emotion here as a wave, with highs and lows over time, rather than as a state: it is a motor and it is also an awareness centre.',
        themes: 'Emotion, mood, feeling, clarity that comes with time, sensitivity.',
        gates: '36, 22, 37, 6, 49, 55 and 30 are its gates.',
        defined: 'a consistent emotional wave: highs and lows that come and go on their own rhythm, and a clarity that is reached over time rather than at once',
        open: 'a sensitivity that takes in and amplifies other people’s emotions, which the tradition describes as a tendency to avoid emotional confrontation',
    },
    sacral: {
        name: 'Sacral',
        kind: 'a motor centre',
        role: 'The Sacral is the centre of life force: the generative, sustainable energy for work and for life, and the gut response that answers a question in the moment. It is the strongest motor on the graph and defines the Generator types.',
        themes: 'Life force, work, response, vitality, sexuality, knowing when there is enough.',
        gates: '5, 14, 29, 34, 27, 42, 3, 9 and 59 are its gates.',
        defined: 'a consistent, sustainable energy and a gut response, which is how the tradition describes the Generator’s way of deciding',
        open: 'no consistent access to this energy, which the tradition describes as taking on other people’s energy and not knowing when enough is enough',
    },
    spleen: {
        name: 'Spleen',
        kind: 'an awareness centre',
        role: 'The Spleen is the centre of instinctive awareness: intuition in the present moment, well-being, health, and a sense of what is safe. It speaks quietly and once, and the tradition connects it to survival and to fear in the moment.',
        themes: 'Intuition, instinct, health, security, timing, fear.',
        gates: '48, 57, 44, 50, 32, 28 and 18 are its gates.',
        defined: 'a consistent instinctive awareness, which does not depend on other people',
        open: 'an awareness that takes in other people’s fears and wellness, which the tradition describes as holding on to what is not good for one',
    },
    root: {
        name: 'Root',
        kind: 'a pressure centre and a motor',
        role: 'The Root, at the base of the graph, is the centre of adrenaline and pressure: the drive to get moving, to act and to get things done. It is a motor, and it is the pressure that stress and the urge to be free of it come from.',
        themes: 'Pressure, stress, drive, urgency, getting things done.',
        gates: '53, 60, 52, 19, 39, 41, 58, 38 and 54 are its gates.',
        defined: 'a consistent way of handling pressure and stress, in its own rhythm',
        open: 'a sensitivity to other people’s stress and urgency that can amplify it, which the tradition describes as a rush to be free of the pressure',
    },
};
const SK = {
    head: {
        name: 'Head',
        kind: 'tlakové centrum',
        role: 'Centrum Head, na vrchole grafu, je centrum mentálneho tlaku: ťahu premýšľať, pýtať sa, čudovať sa. Human Design v ňom vidí miesto, kde vznikajú inšpirácia a otázky, ešte predtým, než ich Ajna premení na spôsob myslenia.',
        themes: 'Inšpirácia, zvedavosť, otázky, snaha dať veciam zmysel.',
        gates: 'Jeho bránami sú 64, 61 a 63.',
        defined: 'stály, spoľahlivý zdroj mentálneho tlaku a inšpirácie, ktorý nezávisí od toho, kto je nablízku',
        open: 'preberá cudzie otázky a mentálny tlak a môže ich zosilňovať; tradícia to opisuje ako tlak odpovedať na otázky, ktoré nie sú vlastné',
    },
    ajna: {
        name: 'Ajna',
        kind: 'centrum vedomia',
        role: 'Ajna je centrum mentálneho vedomia: miesto, kde sa pojmovo spracúvajú myšlienky, tvoria názory a dosahuje istota. Human Design v nej vidí, ako myseľ spracúva - nie čo si myslí, ale ako k mysleniu dospieva.',
        themes: 'Pojmové myslenie, názory, porozumenie, to, ako sa buduje istota.',
        gates: 'Jej bránami sú 47, 24, 4, 17, 11 a 43.',
        defined: 'pevný, stály spôsob myslenia a spracúvania informácií',
        open: 'pružná myseľ, ktorá vie prijať veľa uhlov pohľadu; tradícia upozorňuje, že sa môže zvrhnúť v predstieranie istoty, ktorú nemá',
    },
    throat: {
        name: 'Throat',
        kind: 'centrum prejavu',
        role: 'Throat je centrum vyjadrovania a konania: reči, komunikácie a bodu, v ktorom sa to, čo sa cíti alebo chápe v ostatných centrách, stáva niečím vysloveným alebo vykonaným. Je to najprepojenejšie centrum grafu.',
        themes: 'Komunikácia, vyjadrovanie, konanie, byť vypočutý, uvádzať veci do pohybu.',
        gates: 'Jeho bránami sú 62, 23, 56, 35, 12, 45, 33, 8, 31, 20 a 16.',
        defined: 'stály spôsob rozprávania a konania, ktorý vyzerá rovnako v každom prostredí',
        open: 'prejav, ktorý sa mení podľa spoločnosti a prostredia; tradícia to opisuje ako tlak byť počutý alebo pútať pozornosť',
    },
    g: {
        name: 'G / Identity',
        kind: 'centrum identity a smerovania',
        role: 'Centrum G, v strede grafu, je centrum identity, smerovania a lásky. Human Design v ňom vidí pocit toho, kým človek je a kam ide; leží medzi mentálnymi centrami nad ním a centrami tela pod ním.',
        themes: 'Identita, smerovanie, láska, miesto a cesta človeka.',
        gates: 'Jeho bránami sú 1, 13, 25, 46, 2, 15, 10 a 7.',
        defined: 'pevný pocit seba samého a smerovania',
        open: 'plynulý pocit identity, ktorý formujú ľudia a miesta, v ktorých človek je; tradícia to opisuje ako hľadanie smeru a lásky',
    },
    ego: {
        name: 'Ego / Heart',
        kind: 'motorické centrum',
        role: 'Centrum Heart (Ego) je centrum vôle: odhodlania, hmotného sveta, hodnoty a schopnosti dodržať sľub. V Human Design je to motor - zdroj energie, ktorá sa míňa v krátkych, silných vypätiach, nie rovnomerne.',
        themes: 'Vôľa, sebahodnota, hodnota, sľuby, hmotné zdroje.',
        gates: 'Jeho bránami sú 21, 51, 26 a 40.',
        defined: 'stály prístup k vôli a schopnosť zaviazať sa a vydržať pri tom',
        open: 'žiadna pevná vôľa, o ktorú sa dá oprieť; tradícia to opisuje ako zvyk dokazovať si hodnotu a sľubovať viac, než sa dá dodržať',
    },
    solarPlexus: {
        name: 'Solar Plexus',
        kind: 'motorické centrum',
        role: 'Solar Plexus je centrum emočného vedomia. Human Design tu vidí emóciu ako vlnu s vrcholmi a údoliami v čase, nie ako stav: je to motor a zároveň centrum vedomia.',
        themes: 'Emócie, nálada, cítenie, jasnosť, ktorá prichádza s časom, citlivosť.',
        gates: 'Jeho bránami sú 36, 22, 37, 6, 49, 55 a 30.',
        defined: 'stála emočná vlna: vrcholy a údolia, ktoré prichádzajú a odchádzajú vo vlastnom rytme, a jasnosť, ktorá sa dosahuje časom, nie naraz',
        open: 'citlivosť, ktorá preberá a zosilňuje cudzie emócie; tradícia to opisuje ako sklon vyhýbať sa emočnej konfrontácii',
    },
    sacral: {
        name: 'Sacral',
        kind: 'motorické centrum',
        role: 'Sacral je centrum životnej sily: plodnej, udržateľnej energie pre prácu a pre život a telesnej odpovede, ktorá reaguje na otázku v danej chvíli. Je to najsilnejší motor grafu a určuje typy Generator.',
        themes: 'Životná sila, práca, odpoveď, vitalita, sexualita, vedieť, kedy je dosť.',
        gates: 'Jeho bránami sú 5, 14, 29, 34, 27, 42, 3, 9 a 59.',
        defined: 'stála, udržateľná energia a telesná odpoveď; tradícia tak opisuje spôsob rozhodovania typu Generator',
        open: 'žiadny stály prístup k tejto energii; tradícia to opisuje ako preberanie cudzej energie a nevedomosť, kedy je dosť',
    },
    spleen: {
        name: 'Spleen',
        kind: 'centrum vedomia',
        role: 'Spleen je centrum inštinktívneho vedomia: intuície v prítomnom okamihu, pohody, zdravia a pocitu, čo je bezpečné. Prehovorí potichu a len raz a tradícia ho spája s prežitím a so strachom v danej chvíli.',
        themes: 'Intuícia, inštinkt, zdravie, istota, načasovanie, strach.',
        gates: 'Jeho bránami sú 48, 57, 44, 50, 32, 28 a 18.',
        defined: 'stále inštinktívne vedomie, ktoré nezávisí od iných ľudí',
        open: 'vedomie, ktoré preberá cudzie obavy a pohodu; tradícia to opisuje ako lipnutie na tom, čo človeku nerobí dobre',
    },
    root: {
        name: 'Root',
        kind: 'tlakové centrum a motor',
        role: 'Root, v základe grafu, je centrum adrenalínu a tlaku: nutkania pohnúť sa, konať a dostať veci do konca. Je to motor a je to tlak, z ktorého pramení stres a snaha zbaviť sa ho.',
        themes: 'Tlak, stres, hnací motor, naliehavosť, dokončovanie vecí.',
        gates: 'Jeho bránami sú 53, 60, 52, 19, 39, 41, 58, 38 a 54.',
        defined: 'stály spôsob zvládania tlaku a stresu, vo vlastnom rytme',
        open: 'citlivosť na cudzí stres a naliehavosť, ktorá ich môže zosilňovať; tradícia to opisuje ako zhon zbaviť sa tlaku',
    },
};
const STATES = ['defined', 'open', 'uncertain'];
/** The themes as a clause (lower-cased at the start, no full stop) and the gates as a list of numbers - the sentences around them are the builder's. */
const themesOf = (text) => text.themes.replace(/\.$/, '').replace(/^./, (letter) => letter.toLowerCase());
const gatesOf = (text) => (text.gates.match(/\d+/g) ?? []).join(', ');
function bodyEn(text, state) {
    const stateParagraph = state === 'defined'
        ? `In this chart the ${text.name} centre is defined: at least one complete channel runs into it. Human Design reads a defined centre as consistent - ${text.defined}.`
        : state === 'open'
            ? `In this chart the ${text.name} centre is open (undefined): no complete channel runs into it. Human Design reads an open centre as variable: ${text.open}.`
            : `No birth time was given, so this centre’s state cannot be settled: whether the ${text.name} centre is defined or open depends on the hour of birth, and the app does not guess. A recorded birth time would settle it.`;
    return [`${text.role} It is ${text.kind}.`, `Its themes: ${themesOf(text)}. Its gates: ${gatesOf(text)}.`, stateParagraph];
}
function bodySk(text, state) {
    const stateParagraph = state === 'defined'
        ? `V tomto grafe je centrum ${text.name} definované: vedie doň aspoň jeden úplný kanál. Human Design definované centrum chápe ako stále - ${text.defined}.`
        : state === 'open'
            ? `V tomto grafe je centrum ${text.name} otvorené (nedefinované): nevedie doň žiadny úplný kanál. Human Design otvorené centrum chápe ako premenlivé: ${text.open}.`
            : `Nebol zadaný čas narodenia, takže stav tohto centra sa nedá určiť: či je centrum ${text.name} definované, alebo otvorené, závisí od hodiny narodenia a aplikácia nehádá. Určil by to zadaný čas narodenia.`;
    return [`${text.role} Je to ${text.kind}.`, `Jeho témy: ${themesOf(text)}. Jeho brány: ${gatesOf(text)}.`, stateParagraph];
}
const stateTitle = (state) => (state === 'defined' ? 'defined' : state === 'open' ? 'open' : 'state uncertain');
const stateTitleSk = (state) => (state === 'defined' ? 'definované' : state === 'open' ? 'otvorené' : 'stav neistý');
/** The English entries, 27 of them (nine centres in three states). A centre's panel is its title and its text and nothing else: no eyebrow over the title, no boundary box under the text (the owner's call: the title already says what it is). */
export function humanDesignCenterEntries() {
    return Object.keys(EN).flatMap((center) => STATES.map((state) => ({
        key: hdCenterConceptKey(center, state),
        title: `${EN[center].name} centre · ${stateTitle(state)}`,
        system: 'human-design',
        eyebrow: '',
        body: bodyEn(EN[center], state),
    })));
}
/** The same entries in Slovak: the centres' names are the canonical English ones, as in the rest of the pillar. */
export function humanDesignCenterEntriesSk() {
    return Object.fromEntries(Object.keys(SK).flatMap((center) => STATES.map((state) => [hdCenterConceptKey(center, state), {
            title: `Centrum ${SK[center].name} · ${stateTitleSk(state)}`,
            eyebrow: '',
            body: bodySk(SK[center], state),
        }])));
}
