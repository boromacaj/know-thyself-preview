import { activeLocale } from '../i18n/locale.js';
import { BODY_GENDER, SIGN_NOMINATIVE, inSign } from '../i18n/engineProse.js';
import { SIGN_NAMES, degreeText } from './lunarEvents.js';
import { lunarEventNarrative } from './lunarEventNarrative.js';
const lang = () => (activeLocale() === 'sk' ? 'sk' : 'en');
/* ------------------------------------------------------------ small tools -- */
const ordinalEn = (n) => (n >= 11 && n <= 13 ? `${n}th` : `${n}${['th', 'st', 'nd', 'rd'][n % 10 > 3 ? 0 : n % 10]}`);
const ordinalOf = (n) => (lang() === 'sk' ? `${n}.` : ordinalEn(n));
const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const decimal = (n) => (lang() === 'sk' ? String(n).replace('.', ',') : String(n));
const signKey = (index) => SIGN_NAMES[index].toLowerCase();
const signIndexOf = (name) => SIGN_NAMES.indexOf(name);
const signName = (name) => (lang() === 'sk' ? SIGN_NOMINATIVE[name.toLowerCase()] ?? name : name);
const inSignText = (name) => inSign(name);
/* ------------------------------------------------------------ the tables -- */
const MOON_STYLE = {
    en: [
        'gives feelings a direct, quick edge: reactions come fast and want an outlet',
        'slows things down and asks for steadiness, comfort and things you can rely on',
        'keeps the mind busy: it is easier to talk, read and compare notes than to sit with a feeling',
        'brings feelings close to the surface, with a pull towards home, family and being looked after',
        'turns up the warmth, the pride and the wish to be seen and appreciated',
        'sharpens attention to detail, routine and what needs fixing or tidying',
        'puts the focus on balance, fairness and how you stand with other people',
        'deepens everything: feelings run strong, and what is hidden wants to be said',
        'widens the view and the appetite for honesty, movement and meaning',
        'steadies the mood towards duty, structure and what can be built to last',
        'adds distance and clarity: it is easier to see a pattern than to feel inside it',
        'softens the edges: empathy, intuition and tiredness all run closer to the surface',
    ],
    sk: [
        'dodáva citom priamu, rýchlu hranu: reakcie prichádzajú rýchlo a hľadajú východisko',
        'spomaľuje tempo a pýta si stálosť, pohodlie a veci, na ktoré sa dá spoľahnúť',
        'zamestnáva myseľ: ľahšie je rozprávať sa, čítať a porovnávať poznatky než zotrvať pri pocite',
        'vynáša city na povrch a ťahá k domovu, k rodine a k pocitu, že sa o teba niekto stará',
        'zosilňuje vrúcnosť, hrdosť a túžbu, aby si ťa všimli a ocenili',
        'zaostruje pozornosť na detaily, rutinu a to, čo treba opraviť alebo upratať',
        'stavia do popredia rovnováhu, férovosť a to, ako stojíš voči iným ľuďom',
        'všetko prehlbuje: city sú silné a to, čo je skryté, si pýta slovo',
        'rozširuje výhľad a chuť na úprimnosť, pohyb a zmysel',
        'upokojuje náladu smerom k povinnosti, štruktúre a tomu, čo sa dá vybudovať natrvalo',
        'pridáva odstup a jasnosť: ľahšie je vidieť vzorec než byť uprostred pocitu',
        'zjemňuje hrany: empatia, intuícia aj únava sú bližšie k povrchu',
    ],
};
const NEW_FLAVOUR = {
    en: [
        'courage, initiative and a clean break from hesitation',
        'patience, the body, money and things that grow slowly and last',
        'curiosity, conversation, learning and trying several small things',
        'care, home, family and emotional safety',
        'creativity, generosity and doing something you are proud of',
        'practical improvement, healthy habits and doing one thing well',
        'partnership, fairness and finding the balance in a relationship',
        'honesty, depth and facing what has been avoided',
        'exploration, study, travel and a larger view',
        'commitment, planning and building towards a long-term goal',
        'independence, friendship, original ideas and shared causes',
        'rest, imagination, compassion and listening to intuition',
    ],
    sk: [
        'odvaha, iniciatíva a čistý rez s váhaním',
        'trpezlivosť, telo, peniaze a veci, ktoré rastú pomaly a vydržia',
        'zvedavosť, rozhovory, učenie a skúšanie viacerých malých vecí',
        'starostlivosť, domov, rodina a citová bezpečnosť',
        'tvorivosť, štedrosť a robenie niečoho, z čoho máš radosť',
        'praktické zlepšovanie, starostlivosť o zdravie a dôkladné urobenie jednej veci',
        'partnerstvo, férovosť a hľadanie rovnováhy vo vzťahu',
        'úprimnosť, hĺbka a pohľad na to, čo doteraz zostávalo bokom',
        'objavovanie, štúdium, cestovanie a širší pohľad',
        'záväzok, plánovanie a budovanie smerom k dlhodobému cieľu',
        'nezávislosť, priateľstvo, originálne nápady a spoločné ciele',
        'odpočinok, predstavivosť, súcit a počúvanie intuície',
    ],
};
/** The short theme of each sign as a beginning, for the reflection when no house is known. */
const NEW_FOCUS = {
    en: ['taking the initiative', 'patience and steady habits', 'learning and conversation', 'care and home', 'creative expression', 'practical improvement', 'balance in a relationship', 'honesty about what matters', 'exploration and study', 'a long-term goal', 'independence and shared causes', 'rest and imagination'],
    sk: ['prevzatie iniciatívy', 'trpezlivosť a pravidelné návyky', 'učenie a rozhovory', 'starostlivosť a domov', 'tvorivé vyjadrenie', 'praktické zlepšenie', 'rovnováha vo vzťahu', 'úprimný pohľad na to, na čom záleží', 'objavovanie a štúdium', 'dlhodobý cieľ', 'nezávislosť a spoločné ciele', 'odpočinok a predstavivosť'],
};
const AXES = {
    en: [
        { name: 'the self and the other', a: 'what you want for yourself', b: 'what a relationship needs', focus: 'what you need and what a relationship needs' },
        { name: 'what is yours and what is shared', a: 'security, money and values', b: 'intimacy, trust and change', focus: 'security and shared trust' },
        { name: 'the near and the far', a: 'everyday facts and conversation', b: 'the larger view and belief', focus: 'everyday facts and the bigger picture' },
        { name: 'the private and the public', a: 'home, feeling and care', b: 'career, duty and standing', focus: 'home and public duty' },
        { name: 'the personal and the collective', a: 'creative self-expression', b: 'friends, groups and shared ideals', focus: 'personal expression and belonging to a group' },
        { name: 'the practical and the boundless', a: 'routine, craft and health', b: 'rest, imagination and what cannot be measured', focus: 'routine and rest' },
    ],
    sk: [
        { name: 'ja a druhý', a: 'to, čo chceš pre seba', b: 'to, čo potrebuje vzťah', focus: 'vlastné potreby a potreby vzťahu' },
        { name: 'tvoje a spoločné', a: 'istota, peniaze a hodnoty', b: 'intimita, dôvera a zmena', focus: 'istota a spoločná dôvera' },
        { name: 'blízke a vzdialené', a: 'každodenné fakty a rozhovory', b: 'širší pohľad a presvedčenie', focus: 'každodenné fakty a širší obraz' },
        { name: 'súkromné a verejné', a: 'domov, cit a starostlivosť', b: 'povolanie, povinnosť a postavenie', focus: 'domov a verejná povinnosť' },
        { name: 'osobné a spoločné', a: 'tvorivé sebavyjadrenie', b: 'priatelia, skupiny a spoločné ideály', focus: 'osobné vyjadrenie a patrenie do skupiny' },
        { name: 'praktické a nekonečné', a: 'rutina, remeslo a zdravie', b: 'odpočinok, predstavivosť a to, čo sa nedá zmerať', focus: 'rutina a odpočinok' },
    ],
};
const HOUSES = {
    en: [
        { theme: 'yourself, your body and the way you begin things', focus: 'who you are and how you begin things' },
        { theme: 'money, resources and what you value', focus: 'money and what you value' },
        { theme: 'everyday communication, learning, siblings and your surroundings', focus: 'everyday conversations and learning' },
        { theme: 'home, family, roots and inner security', focus: 'home and family' },
        { theme: 'creativity, play, romance and joy', focus: 'creativity and joy' },
        { theme: 'daily routine, work, health habits and care', focus: 'daily routine and health habits' },
        { theme: 'partnerships and close one-to-one relationships', focus: 'close partnerships' },
        { theme: 'shared resources, trust, intimacy and deeper change', focus: 'shared resources and deep trust' },
        { theme: 'beliefs, study, travel and the search for meaning', focus: 'beliefs and wider horizons' },
        { theme: 'career, public role and life direction', focus: 'career and life direction' },
        { theme: 'friends, groups and long-term hopes', focus: 'friendships and long-term hopes' },
        { theme: 'rest, solitude, the inner life and what happens behind the scenes', focus: 'rest and the inner life' },
    ],
    sk: [
        { theme: 'vlastná identita, telo a spôsob, akým začínaš veci', focus: 'vlastná identita a spôsob, akým začínaš' },
        { theme: 'peniaze, zdroje a to, čo oceňuješ', focus: 'peniaze a hodnoty' },
        { theme: 'každodenná komunikácia, učenie, súrodenci a blízke okolie', focus: 'každodenné rozhovory a učenie' },
        { theme: 'domov, rodina, korene a vnútorná istota', focus: 'domov a rodina' },
        { theme: 'tvorivosť, hra, romantika a radosť', focus: 'tvorivosť a radosť' },
        { theme: 'denný režim, práca a starostlivosť o zdravie', focus: 'denný režim a starostlivosť o zdravie' },
        { theme: 'partnerstvá a blízke vzťahy vo dvojici', focus: 'blízke partnerstvá' },
        { theme: 'spoločné zdroje, dôvera, intimita a hlbšia zmena', focus: 'spoločné zdroje a hlboká dôvera' },
        { theme: 'presvedčenia, štúdium, cestovanie a hľadanie zmyslu', focus: 'presvedčenia a širšie obzory' },
        { theme: 'povolanie, verejná rola a životný smer', focus: 'povolanie a životný smer' },
        { theme: 'priatelia, skupiny a dlhodobé nádeje', focus: 'priateľstvá a dlhodobé nádeje' },
        { theme: 'odpočinok, samota, vnútorný život a to, čo sa deje v pozadí', focus: 'odpočinok a vnútorný život' },
    ],
};
/*
 * WHAT EACH NATAL POINT STANDS FOR. English: a noun phrase ("your drive, ..."). Slovak: a subordinate clause that starts with "ako", "čo" or "kde", so every sentence frame ("to, ako ...",
 * "Všimni si, ako ...") takes it without the case of a noun having to change.
 */
const ROLES = {
    en: {
        Sun: 'your sense of identity and vitality',
        Moon: 'your emotional needs and what makes you feel safe',
        Mercury: 'how you think, talk and decide',
        Venus: 'what and whom you value, and how you relate',
        Mars: 'your drive, your courage and how you assert yourself',
        Jupiter: 'growth, trust and your sense of what is possible',
        Saturn: 'responsibility, limits and long-term structure',
        Uranus: 'the need for freedom and change',
        Neptune: 'imagination, ideals and what is hard to pin down',
        Pluto: 'deep change and questions of power and trust',
        Ascendant: 'how you come across to the world',
        Midheaven: 'your public direction and vocation',
    },
    sk: {
        Sun: 'ako vnímaš vlastnú identitu a vitalitu',
        Moon: 'čo ti dáva pocit bezpečia a aké sú tvoje emocionálne potreby',
        Mercury: 'ako myslíš, hovoríš a rozhoduješ sa',
        Venus: 'čo a koho oceňuješ a ako vstupuješ do vzťahov',
        Mars: 'čo ťa poháňa a ako si presadzuješ svoje',
        Jupiter: 'kde rastieš a čomu dôveruješ',
        Saturn: 'za čo preberáš zodpovednosť a kde si určuješ hranice',
        Uranus: 'kde potrebuješ slobodu a zmenu',
        Neptune: 'kde sa uplatňujú tvoja predstavivosť a tvoje ideály a čo sa ťažko uchopuje',
        Pluto: 'kde ide o hlbokú zmenu, moc a dôveru',
        Ascendant: 'ako pôsobíš navonok',
        Midheaven: 'kam smeruješ navonok a v čom vidíš svoje povolanie',
    },
};
/** The natal point in the phrase "your natal Venus" - English. */
const NATAL_EN = {
    Sun: 'your natal Sun', Moon: 'your natal Moon', Mercury: 'your natal Mercury', Venus: 'your natal Venus', Mars: 'your natal Mars', Jupiter: 'your natal Jupiter',
    Saturn: 'your natal Saturn', Uranus: 'your natal Uranus', Neptune: 'your natal Neptune', Pluto: 'your natal Pluto', Ascendant: 'your Ascendant (your rising sign)', Midheaven: 'your Midheaven (the top of your chart, tied to public life)',
};
/** The natal point after "s" in Slovak: possessive, adjective and noun in the instrumental, by the body's gender. */
const NATAL_SK = {
    Sun: 'tvojím natálnym Slnkom', Moon: 'tvojím natálnym Mesiacom', Mercury: 'tvojím natálnym Merkúrom', Venus: 'tvojou natálnou Venušou', Mars: 'tvojím natálnym Marsom',
    Jupiter: 'tvojím natálnym Jupiterom', Saturn: 'tvojím natálnym Saturnom', Uranus: 'tvojím natálnym Uránom', Neptune: 'tvojím natálnym Neptúnom', Pluto: 'tvojím natálnym Plutom',
    Ascendant: 'tvojím ascendentom', Midheaven: 'tvojím Medium Coeli, skrátene MC',
};
void BODY_GENDER;
/** The angle in plain words, with the traditional name beside it where it has one a reader might look up. */
const ASPECT_EN = {
    conjunction: 'sits right on', opposition: 'is directly opposite', square: 'is at a right angle to',
    trine: 'makes an easy angle (a trine) with', sextile: 'makes an easy angle (a sextile) with',
};
const alsoEn = (verb) => (verb.startsWith('is ') ? `is also ${verb.slice(3)}` : `also ${verb}`);
const ASPECT_SK = {
    conjunction: 'v konjunkcii s', opposition: 'v opozícii s', square: 'v kvadratúre s', trine: 'v trigóne s', sextile: 'v sextile s',
};
const EFFECT = {
    en: {
        full: {
            conjunction: [
                (r) => `That puts ${r} in full view; tradition treats this as a good time to notice it.`,
                (r) => `The light falls straight on ${r}, which is why a Full Moon is read as a time to notice it.`,
            ],
            opposition: [
                (r) => `That sets ${r} on the other side of the axis, so it can be seen from the opposite side: a chance to compare what you feel with what you do.`,
            ],
            square: [
                (r) => `Tradition reads this as friction around ${r}; the pressure is a pointer to what wants adjusting.`,
                (r) => `That puts ${r} in tension with the axis, which tradition reads as a pointer to what is out of balance, more than a problem.`,
            ],
            easy: [
                (r) => `That is a supportive angle for ${r}: traditionally things flow more easily there, and what you notice can be put to use.`,
                (r) => `That is a supportive angle for ${r}; tradition reads it as an easier, more open tone there.`,
            ],
        },
        new: {
            conjunction: [
                (r) => `A new cycle begins right on ${r}, a natural place to set an intention.`,
                (r) => `The start falls right on ${r}, so an intention set there has something to take hold of.`,
            ],
            opposition: [
                (r) => `That places ${r} opposite the start; tradition reads this as other people or circumstances mirroring it back.`,
            ],
            square: [
                (r) => `That puts ${r} in friction with the start; tradition favours a small, deliberate step there over a push.`,
                (r) => `Tradition reads this as some resistance around ${r}; better to begin gently and keep going.`,
            ],
            easy: [
                (r) => `That is a supportive angle for ${r}: a start there is traditionally easier.`,
                (r) => `That is a supportive angle for ${r}; tradition reads it as a gentler, more open start there.`,
            ],
        },
    },
    sk: {
        full: {
            conjunction: [
                (r) => `Do plného svetla sa tak dostáva to, ${r}. Tradične je to čas, keď sa to ľahšie ukáže.`,
                (r) => `Svetlo dopadá priamo na to, ${r}; preto sa spln tradične číta ako čas, keď sa to dá ľahšie zbadať.`,
            ],
            opposition: [
                (r) => `Na opačnej strane osi stojí to, ${r}, takže to vidíš z druhej strany: príležitosť porovnať, čo cítiš a čo robíš.`,
            ],
            square: [
                (r) => `To, ${r}, stojí k osi v pravom uhle, čo tradícia číta ako napätie; ten tlak číta ako ukazovateľ toho, čo treba upraviť.`,
                (r) => `Tradícia číta tento pravý uhol ako napätie v tom, ${r}: skôr ukazovateľ toho, čo je mimo rovnováhy, než problém.`,
            ],
            easy: [
                (r) => `Je to podporný aspekt pre to, ${r}: tradične tu veci plynú ľahšie a to, čo si všimneš, sa dá využiť.`,
                (r) => `Je to podporný aspekt pre to, ${r}; tradične sa číta ako ľahší a otvorenejší tón v tejto oblasti.`,
            ],
        },
        new: {
            conjunction: [
                (r) => `Nový cyklus sa začína priamo tam, kde ide o to, ${r}. Je to prirodzené miesto na stanovenie zámeru.`,
                (r) => `Začiatok padá priamo na to, ${r}, takže zámer, ktorý si tu stanovíš, sa má o čo oprieť.`,
            ],
            opposition: [
                (r) => `Oproti začiatku stojí to, ${r}. Tradícia to číta tak, že ti to môžu zrkadliť iní ľudia alebo okolnosti.`,
            ],
            square: [
                (r) => `Začiatok sa v napätí stretáva s tým, ${r}. Tradícia tu odporúča skôr malý, premyslený krok než tlak.`,
                (r) => `Tradícia číta tento pravý uhol ako trochu trenia v tom, ${r}: lepšie je začať jemne a pokračovať.`,
            ],
            easy: [
                (r) => `Je to podporný aspekt pre to, ${r}: začiatok tu býva tradične ľahší.`,
                (r) => `Je to podporný aspekt pre to, ${r}; tradične sa číta ako jemnejší a otvorenejší začiatok v tejto oblasti.`,
            ],
        },
    },
};
/*
 * English says what the tradition makes of the event in three wordings per kind, chosen by the Moon's sign, and closes with ONE short disclaimer, chosen by the sign and the month
 * from six wordings, so a reader who opens several lunations meets neither the same sentence nor three disclaimers in one card.
 */
const MEANING_EN = {
    full: [
        'Traditionally a Full Moon is a point of culmination: what has been building comes into view, and both sides of an axis are felt at once.',
        'A Full Moon is read as the high point of the lunar cycle: the Sun and Moon face each other, and a theme tends to show itself from both sides.',
        'In the astrological tradition a Full Moon is a moment of visibility, when two sides of one theme can be seen together.',
    ],
    new: [
        'Traditionally a New Moon marks a beginning: the old cycle closes and a new one opens, a good moment for an intention and a small first step.',
        'A New Moon is read as the start of a lunar cycle, a natural point to set an intention and take a small first step.',
        'In the astrological tradition a New Moon is a quiet reset, with one cycle closing as the next opens.',
    ],
};
const DISCLAIMER_EN = [
    'It is a symbol, not a prediction.',
    'Take it as a symbol rather than a forecast.',
    'None of this predicts events; it is a tradition to reflect with.',
    'This is symbolism, not a prediction.',
    'Read it as a prompt for reflection, not as a prediction.',
    'The tradition speaks in symbols, and it predicts nothing.',
];
const meaningEn = (event) => {
    const sign = signIndexOf(event.moonSign);
    const month = event.instant.getUTCMonth();
    return `${MEANING_EN[event.kind][sign % 3]} ${DISCLAIMER_EN[(sign + month) % DISCLAIMER_EN.length]}`;
};
const MEANING = {
    en: {
        full: `${MEANING_EN.full[0]} ${DISCLAIMER_EN[0]}`,
        new: `${MEANING_EN.new[0]} ${DISCLAIMER_EN[0]}`,
    },
    sk: {
        full: 'Spln sa tradične chápe ako čas vyvrcholenia: to, čo sa budovalo, vychádza na svetlo a je cítiť obe strany osi naraz. Je to symbol, nie predpoveď.',
        new: 'Nov sa tradične chápe ako začiatok: starý cyklus sa uzatvára a nový sa otvára; je to vhodná chvíľa na zámer a malý prvý krok. Je to symbol, nie predpoveď.',
    },
};
const TRADITIONAL = {
    en: {
        Wolf: 'Wolf Moon', Snow: 'Snow Moon', Worm: 'Worm Moon', Pink: 'Pink Moon', Flower: 'Flower Moon', Strawberry: 'Strawberry Moon', Buck: 'Buck Moon',
        Sturgeon: 'Sturgeon Moon', Corn: 'Corn Moon', Harvest: 'Harvest Moon', Hunters: 'Hunter’s Moon', Beaver: 'Beaver Moon', Cold: 'Cold Moon',
    },
    sk: {
        Wolf: 'Vlčí spln', Snow: 'Snehový spln', Worm: 'Červový spln', Pink: 'Ružový spln', Flower: 'Kvetinový spln', Strawberry: 'Jahodový spln', Buck: 'Jelení spln',
        Sturgeon: 'Jeseterový spln', Corn: 'Kukuričný spln', Harvest: 'Žatevný spln', Hunters: 'Poľovnícky spln', Beaver: 'Bobrí spln', Cold: 'Studený spln',
    },
};
const LABELS = {
    en: {
        full: 'Full Moon', new: 'New Moon',
        onDayFull: 'Exact Full Moon on this day', onDayNew: 'Exact New Moon on this day', nextFull: 'Next Full Moon', nextNew: 'Next New Moon',
        traditionalNote: 'North American almanac name, a cultural custom and not an astronomical fact',
        disclaimer: 'Astrology is a symbolic tradition, not a prediction or a cause. The dates, times and positions above are astronomy.',
        zoneFallback: 'The device time zone is unavailable, so the time is shown in UTC.',
        moonWord: 'Moon', sunWord: 'Sun',
        headingSky: 'The sky and the tradition', headingInChart: 'In your chart', headingReflect: 'Reflect', headingReading: 'What matters now', headingTechnical: 'Astrological basis and details',
        region: 'The exact Full Moon or New Moon',
    },
    sk: {
        full: 'Spln', new: 'Nov',
        onDayFull: 'Presný spln v tento deň', onDayNew: 'Presný nov v tento deň', nextFull: 'Najbližší spln', nextNew: 'Najbližší nov',
        traditionalNote: 'názov zo severoamerického almanachu, kultúrny zvyk a nie astronomický fakt',
        disclaimer: 'Astrológia je symbolická tradícia, nie predpoveď ani príčina. Dátumy, časy a polohy vyššie sú astronómia.',
        zoneFallback: 'Časové pásmo zariadenia nie je dostupné, preto je čas uvedený v UTC.',
        moonWord: 'Mesiac', sunWord: 'Slnko',
        headingSky: 'Obloha a tradícia', headingInChart: 'V tvojej natálnej mape', headingReflect: 'Zamyslenie', headingReading: 'Čo je teraz podstatné', headingTechnical: 'Astrologické podklady a detaily',
        region: 'Presný spln alebo nov',
    },
};
export const lunarEventLabel = (key) => LABELS[lang()][key] ?? key;
/** "FULL MOON IN TAURUS" / "Spln v Býkovi", from the Moon's sign. */
export function eventTitle(kind, moonSign) {
    const name = LABELS[lang()][kind];
    return lang() === 'sk' ? `${name} ${inSignText(moonSign)}` : `${name} in ${moonSign}`;
}
/** The compact line on the Forecast Day: "Next Full Moon in Taurus" / "Najbližší spln v Býkovi", or "Exact ..." / "Presný ..." when the day holds the instant. */
export function compactEventTitle(kind, moonSign, onDay) {
    const name = LABELS[lang()][kind];
    if (lang() === 'sk')
        return `${onDay ? 'Presný' : 'Najbližší'} ${name.toLowerCase()} ${inSignText(moonSign)}`;
    return `${onDay ? 'Exact' : 'Next'} ${name} in ${moonSign}`;
}
export function clockLine(clock) {
    return `${clock.date} · ${clock.time} ${clock.zoneName}`;
}
/* --------------------------------------------------------- the paragraphs -- */
function astronomyText(event) {
    const moon = degreeText(event.moonDegree, event.moonMinute);
    const sun = degreeText(event.sunDegree, event.sunMinute);
    const moonSign = signName(event.moonSign);
    const sunSign = signName(event.sunSign);
    if (lang() === 'sk') {
        return event.kind === 'full'
            ? `Mesiac stojí presne oproti Slnku: Mesiac ${moon} ${inSignText(event.moonSign)}, Slnko ${sun} ${inSignText(event.sunSign)}. Z pohľadu Zeme je privrátená strana Mesiaca osvetlená celá alebo takmer celá.`
            : `Slnko a Mesiac stoja v tom istom bode zverokruhu, ${moon} ${inSignText(event.moonSign)}. Mesiac je k Zemi obrátený neosvetlenou stranou, preto ho nevidno.`;
    }
    return event.kind === 'full'
        ? `The Moon stands exactly opposite the Sun: Moon at ${moon} ${moonSign}, Sun at ${sun} ${sunSign}. Seen from Earth, the Moon is fully lit, or as near as it gets.`
        : `The Sun and the Moon stand at the same point of the zodiac, ${moon} ${moonSign}. The Moon turns its unlit side to the Earth, so it cannot be seen.`;
}
function signParagraph(event) {
    const l = lang();
    const index = signIndexOf(event.moonSign);
    if (event.kind === 'full') {
        const axis = AXES[l][index % 6];
        return l === 'sk'
            ? `Os splnu tvoria ${signName(event.moonSign)} a ${signName(event.sunSign)}: ${axis.name}, na jednej strane ${axis.a}, na druhej ${axis.b}. Tradične Mesiac ${inSignText(event.moonSign)} ${MOON_STYLE.sk[index]}.`
            : `The axis is ${event.moonSign}–${event.sunSign}: ${axis.name}, with ${axis.a} on one side and ${axis.b} on the other. Traditionally, the Moon in ${event.moonSign} ${MOON_STYLE.en[index]}.`;
    }
    return l === 'sk'
        ? `Nov ${inSignText(event.moonSign)} dáva začiatku tón: ${NEW_FLAVOUR.sk[index]}.`
        : [
            `With the Moon in ${event.moonSign}, the new cycle leans toward ${NEW_FLAVOUR.en[index]}.`,
            `A New Moon in ${event.moonSign} opens on the themes of ${NEW_FLAVOUR.en[index]}.`,
            `${event.moonSign} sets the tone for this cycle: ${NEW_FLAVOUR.en[index]}.`,
            `In ${event.moonSign}, the tradition links a new start with ${NEW_FLAVOUR.en[index]}.`,
        ][(index + event.instant.getUTCMonth()) % 4];
}
/* The closing sentence of the house paragraph, in three wordings chosen by the house, so it is not the same sentence in every lunation (English only). */
const FULL_BALANCE_EN = [
    'A Full Moon lights both areas at once, so the useful question is how the two are in balance.',
    'A Full Moon shows both areas together, so it is worth asking how they balance each other.',
    'Both areas are lit at once, which makes the balance between them the natural question.',
];
const NEW_HOUSE_EN = [
    'Tradition reads this New Moon as a fresh start in that area of life.',
    'In tradition, a New Moon in this house is a chance to begin again in that area.',
    'That is the part of life where tradition sees this New Moon opening a new chapter.',
];
function houseParagraph(event, natal) {
    if (natal.moonHouse === null || natal.sunHouse === null)
        return null;
    const l = lang();
    const h = HOUSES[l];
    const m = natal.moonHouse;
    if (event.kind === 'full') {
        const s = natal.sunHouse;
        return l === 'sk'
            ? `V systéme celých znamení (Whole Sign) stojí Mesiac v tvojom ${ordinalOf(m)} dome – ${h[m - 1].theme}. Slnko stojí v tvojom ${ordinalOf(s)} dome – ${h[s - 1].theme}. Spln rozsvieti obe oblasti naraz, preto sa oplatí pýtať, ako sú tieto dve oblasti vyvážené.`
            : [
                `The Moon stands in your ${ordinalOf(m)} house – ${h[m - 1].theme}. The Sun stands in your ${ordinalOf(s)} house – ${h[s - 1].theme}. ${FULL_BALANCE_EN[m % 3]}`,
                `Your ${ordinalOf(m)} house (${h[m - 1].theme}) holds the Moon, and your ${ordinalOf(s)} house (${h[s - 1].theme}) holds the Sun. ${FULL_BALANCE_EN[m % 3]}`,
                `The Moon lights up your ${ordinalOf(m)} house – ${h[m - 1].theme} – while the Sun lights up your ${ordinalOf(s)} house – ${h[s - 1].theme}. ${FULL_BALANCE_EN[m % 3]}`,
            ][(m + s) % 3];
    }
    return l === 'sk'
        ? `V systéme celých znamení (Whole Sign) padne tento nov do tvojho ${ordinalOf(m)} domu – ${h[m - 1].theme}. Tradične je to oblasť života, v ktorej sa nový začiatok najľahšie zbadá a formuje.`
        : [
            `This New Moon falls in your ${ordinalOf(m)} house – ${h[m - 1].theme}. ${NEW_HOUSE_EN[m % 3]}`,
            `Your ${ordinalOf(m)} house covers ${h[m - 1].theme}, and the New Moon falls there. ${NEW_HOUSE_EN[m % 3]}`,
            `The New Moon falls in the part of your chart for ${h[m - 1].theme} (your ${ordinalOf(m)} house). ${NEW_HOUSE_EN[m % 3]}`,
        ][(m + signIndexOf(event.moonSign)) % 3];
}
function aspectGroup(aspect) {
    return aspect === 'trine' || aspect === 'sextile' ? 'easy' : aspect;
}
/** Which of the wordings of a contact: chosen by the chart (the point, the aspect and the sign), never at random. */
const variantOf = (event, position, count) => ((signIndexOf(event.moonSign) + position) % count);
function activationParagraph(event, activation, position, repeated) {
    const l = lang();
    const role = ROLES[l][activation.natal];
    const options = EFFECT[l][event.kind][aspectGroup(activation.aspect)];
    /* a second contact of the same kind (two planets on the Sun, say) is said as "also", with a short effect, not with the same two sentences again */
    const effect = repeated ? (l === 'sk' ? `Týka sa to aj toho, ${role}.` : `That reaches ${role} as well.`) : options[variantOf(event, position, options.length)](role);
    const full = event.kind === 'full';
    const orbRaw = activation.showOrb ? (l === 'sk' ? ` (odchýlka ${decimal(activation.orb)}°)` : ` (${decimal(activation.orb)}° from exact)`) : '';
    /* at a Full Moon the two lights are opposite: a point on one of them is opposite the other, and a point at a right angle to one is at a right angle to both */
    if (l === 'sk') {
        const natalText = NATAL_SK[activation.natal];
        const orb = orbRaw;
        const body = activation.eventBody === 'Moon' ? 'Mesiac' : 'Slnko';
        const other = activation.eventBody === 'Moon' ? 'Slnko' : 'Mesiac';
        let lead;
        if (!full)
            lead = `Nov je ${ASPECT_SK[activation.aspect]} ${natalText}${orb}.`;
        else if (activation.aspect === 'conjunction')
            lead = `${body} je v konjunkcii s ${natalText}${orb}, takže ${other} stojí oproti.`;
        else if (activation.aspect === 'square')
            lead = `Os Mesiac–Slnko je v kvadratúre s ${natalText}${orb}.`;
        else
            lead = `${body} je ${ASPECT_SK[activation.aspect]} ${natalText}${orb}.`;
        if (repeated)
            lead = lead.replace(' je ', ' je aj ').replace(/, takže [^.]*.$/, '.');
        return `${lead} ${effect}`;
    }
    const natalText = NATAL_EN[activation.natal];
    const squareWord = position % 2 === 0 ? ASPECT_EN.square : 'forms a square with';
    const baseVerb = activation.aspect === 'square' ? squareWord : ASPECT_EN[activation.aspect];
    const verb = repeated ? alsoEn(baseVerb) : baseVerb;
    let lead;
    if (!full)
        lead = `The New Moon ${verb} ${natalText}.`;
    else if (activation.aspect === 'conjunction')
        lead = `The ${activation.eventBody} ${verb} ${natalText}${repeated ? '' : `, so the ${activation.eventBody === 'Moon' ? 'Sun' : 'Moon'} stands opposite`}.`;
    else if (activation.aspect === 'square')
        lead = `${repeated ? 'The Moon and Sun are also' : 'The Moon and Sun are'} at a right angle to ${natalText}${repeated ? '' : ', so both press on it'}.`;
    else
        lead = `The ${activation.eventBody} ${verb} ${natalText}.`;
    /* the distance from exact is evidence: it is in the evidence line under the details (orbLine), not in the sentence about the angle */
    return `${lead} ${effect}`;
}
const ELEMENTS = {
    en: ['Fire', 'Earth', 'Air', 'Water'],
    sk: ['Oheň', 'Zem', 'Vzduch', 'Voda'],
};
/**
 * How the event's signs sit against the natal Sun's sign. At a Full Moon the axis has two ends, so the relation is to BOTH (a point at a right angle to one is at a right angle to the other;
 * one trine is a sextile from the far end); at a New Moon it is to the one point. Said in the voice of a tradition, and left out when the natal Sun already makes a contact with the event
 * (the same fact must not be said twice).
 */
function signLinkParagraph(event, natal) {
    if (!natal.natalSunSign || !natal.signLink)
        return null;
    if (natal.activations.some((activation) => activation.natal === 'Sun'))
        return null;
    const l = lang();
    const sun = signName(natal.natalSunSign);
    const sunIn = inSignText(natal.natalSunSign);
    const link = natal.signLink;
    const full = event.kind === 'full';
    const contacts = natal.activations.length > 0;
    if (l === 'sk') {
        if (full) {
            if (link === 'same' || link === 'opposite')
                return `Tvoje natálne Slnko je ${sunIn}, teda na jednom konci tejto osi; tradícia to číta tak, že sa ťa tento spln dotýka priamo, v tvojej vlastnej identite.`;
            if (link === 'square')
                return `Tvoje natálne Slnko je ${sunIn}, v pravom uhle k obom koncom osi; tradícia to číta ako napätie, ktoré si pýta úpravu.`;
            if (link === 'trine' || link === 'sextile')
                return `Tvoje natálne Slnko je ${sunIn}, v podporných uhloch (trigón a sextil) k obom koncom osi; tradícia to číta ako priaznivé pozadie.`;
            return contacts
                ? `Tvoje natálne Slnko je ${sunIn}, bez hlavného uhla k tejto osi, preto osobná váha splnu vychádza z kontaktov uvedených vyššie, nie zo znamenia tvojho Slnka.`
                : `Tvoje natálne Slnko je ${sunIn}, bez hlavného uhla k tejto osi, takže sa ťa tento spln podľa tradície dotýka menej priamo.`;
        }
        if (link === 'same')
            return `Nov je v tvojom znamení Slnka (${sun}): tradične osobný začiatok, blízky tomu, čo ti je vlastné.`;
        if (link === 'square')
            return `Tvoje natálne Slnko je ${sunIn}, v pravom uhle k znameniu tohto novu; tradícia to číta ako mierne trenie a podnet k pohybu.`;
        if (link === 'trine')
            return `Tvoje natálne Slnko je ${sunIn}, v trigóne so znamením tohto novu; tradícia to číta ako ľahký, známy tón.`;
        if (link === 'sextile')
            return `Tvoje natálne Slnko je ${sunIn}, v sextile so znamením tohto novu; tradícia to číta ako ľahké, priaznivé pozadie.`;
        if (link === 'opposite')
            return `Tvoje natálne Slnko je ${sunIn}, presne oproti znameniu tohto novu; tradícia to číta tak, že ti začiatok môžu odzrkadliť iní.`;
        return contacts
            ? `Tvoje natálne Slnko je ${sunIn}, bez hlavného uhla k znameniu tohto novu, preto osobná váha novu vychádza z kontaktov uvedených vyššie, nie zo znamenia tvojho Slnka.`
            : `Tvoje natálne Slnko je ${sunIn}, bez hlavného uhla k znameniu tohto novu, takže sa ťa tento nov podľa tradície dotýka menej priamo.`;
    }
    if (full) {
        if (link === 'same' || link === 'opposite')
            return `Your natal Sun is in ${sun}, at one end of this axis; tradition reads that as a Full Moon that touches you directly, in your own sense of self.`;
        if (link === 'square')
            return `Your natal Sun is in ${sun}, in a square (a 90° angle) with both ends of the axis; tradition reads that as tension that asks for adjustment.`;
        if (link === 'trine' || link === 'sextile')
            return `Your natal Sun is in ${sun}, in supportive angles (a trine and a sextile) to the two ends of the axis; tradition reads that as a favourable background.`;
        return contacts
            ? `Your natal Sun is in ${sun} and makes no major angle with this axis, so your Sun sign plays little part here.`
            : `Your natal Sun is in ${sun}, which makes no major angle with this axis, so tradition reads this Full Moon as touching you less directly.`;
    }
    if (link === 'same')
        return `This New Moon is in your Sun sign, ${sun}: traditionally a personal beginning, close to who you already are.`;
    if (link === 'square')
        return `Your natal Sun is in ${sun}, in a square (a 90° angle) with the sign of this New Moon; tradition reads that as some friction and a push to move.`;
    if (link === 'trine')
        return `Your natal Sun is in ${sun}, in a trine with the sign of this New Moon; tradition reads that as an easy, familiar tone.`;
    if (link === 'sextile')
        return `Your natal Sun is in ${sun}, in a sextile with the sign of this New Moon; tradition reads that as an easy, favourable background.`;
    if (link === 'opposite')
        return `Your natal Sun is in ${sun}, opposite the sign of this New Moon; tradition reads that as others mirroring the beginning back to you.`;
    return contacts
        ? `Your natal Sun is in ${sun} and makes no major angle with the sign of this New Moon, so your Sun sign plays little part here.`
        : `Your natal Sun is in ${sun}, which makes no major angle with the sign of this New Moon, so tradition reads this New Moon as touching you less directly.`;
}
/** The one honest thing left to say when the birth time is not exact and no natal planet makes a contact: the element of the event's sign against the natal Sun's. */
function elementParagraph(event, natal) {
    if (event.kind !== 'new' || !natal.elementLink || !natal.natalSunSign)
        return null;
    const l = lang();
    const { element, relation } = natal.elementLink;
    const name = ELEMENTS[l][element];
    if (relation === 'same')
        return l === 'sk' ? `Znamenie tohto novu patrí k živlu ${name}, rovnako ako tvoje natálne Slnko; tradícia to číta ako známy, domáci tón.` : `The sign of this New Moon belongs to the element ${name}, like your natal Sun; tradition reads that as a familiar, at-home tone.`;
    if (relation === 'compatible')
        return l === 'sk' ? `Znamenie tohto novu patrí k živlu ${name}, ktorý sa so živlom tvojho natálneho Slnka tradične dopĺňa.` : `The sign of this New Moon belongs to the element ${name}, which traditionally complements the element of your natal Sun.`;
    return null;
}
const CAVEAT = {
    en: {
        unknown: 'Your birth time is unknown. Life areas and time-sensitive natal contacts are left out rather than guessed.',
        approximate: 'Your birth time is only approximate. Life areas and time-sensitive natal contacts are left out rather than guessed.',
    },
    sk: {
        unknown: 'Čas tvojho narodenia nepoznáme; životné oblasti a časovo citlivé väzby preto neodhadujeme.',
        approximate: 'Čas tvojho narodenia je len približný; životné oblasti a časovo citlivé väzby preto neodhadujeme.',
    },
};
const NO_CONTACT = {
    en: {
        exact: (kind) => `No natal planet or angle makes a close contact with this ${kind === 'full' ? 'Full Moon' : 'New Moon'}, so its personal weight comes mainly from the house and sign themes above.`,
        other: (kind) => `Without an exact birth time only some natal planets can be placed reliably, and none of them makes a close contact with this ${kind === 'full' ? 'Full Moon' : 'New Moon'}. Its personal weight comes mainly from the sign themes above.`,
    },
    sk: {
        exact: (kind) => `Žiadna natálna planéta, ascendent ani Medium Coeli (MC) nie je v blízkom aspekte s týmto ${kind === 'full' ? 'splnom' : 'novom'}, preto jeho osobná váha vychádza hlavne z tém domov a znamení uvedených vyššie.`,
        other: (kind) => `Žiadna z natálnych planét, ktoré sa dajú spoľahlivo umiestniť aj bez presného času narodenia, nie je v blízkom aspekte s týmto ${kind === 'full' ? 'splnom' : 'novom'}, preto jeho osobná váha vychádza hlavne z tém znamení uvedených vyššie.`,
    },
};
/** The absence of a close contact, in three short wordings chosen by the sign and the month (English). */
function noContactEn(event, exact) {
    const moon = event.kind === 'full' ? 'Full Moon' : 'New Moon';
    const pick = (signIndexOf(event.moonSign) + event.instant.getUTCMonth()) % 3;
    if (exact) {
        return [
            `No natal planet or angle is in close contact with this ${moon}, so the house and sign themes above carry most of its weight for you.`,
            `This ${moon} touches nothing in your chart closely; the house and sign themes above are what it brings you.`,
            `With no close natal contact, this ${moon} speaks to you mainly through the house and sign themes above.`,
        ][pick];
    }
    return [
        `Without an exact birth time only some natal planets can be placed reliably, and none of them is in close contact with this ${moon}; the sign themes above carry its weight.`,
        `Of the natal planets that can be placed without an exact birth time, none is in close contact with this ${moon}, so the sign themes above are what it brings you.`,
        `No natal planet that can be placed without an exact birth time is in close contact with this ${moon}; its weight comes from the sign themes above.`,
    ][pick];
}
/** What a natal point stands for, as a clause that follows "Notice" (English; the Slovak ROLES are clauses already). */
const NOTICE_EN = {
    Sun: 'how you see yourself and where your vitality goes',
    Moon: 'what you need in order to feel safe',
    Mercury: 'how you think, talk and decide',
    Venus: 'what and whom you value, and how you relate',
    Mars: 'what drives you and how you assert yourself',
    Jupiter: 'where you are growing and what you trust',
    Saturn: 'what you take responsibility for and where you set limits',
    Uranus: 'where you need freedom and change',
    Neptune: 'where imagination and ideals come into play',
    Pluto: 'where deep change, power and trust are at stake',
    Ascendant: 'how you come across to the world',
    Midheaven: 'where you are heading in public life and vocation',
};
/**
 * THE AREA OF A HOUSE AS A PHRASE THAT FOLLOWS "in" - English only. The short `focus` labels read as titles in quotation marks ("a small step in “shared resources and deep trust”");
 * these are the same twelve areas said as the end of a sentence.
 */
const AREA_AFTER_IN_EN = [
    'how you present yourself and begin things', 'your money and what you value', 'everyday conversations and learning', 'your home and family life',
    'your creative and playful side', 'your daily routine and health habits', 'your close partnerships', 'shared resources and trust',
    'your beliefs and wider horizons', 'your career and life direction', 'your friendships and long-term hopes', 'your rest and inner life',
];
/** Three closings for each kind, chosen by the sign, so a reader who reads several does not meet one closing every time. */
const FULL_CLOSING = {
    en: [
        'What has been building here lately, and what balance would feel right this week?',
        'What has been growing in these areas lately, and what would a steadier balance look like this week?',
        'Where have you been leaning too far one way lately, and what small adjustment would feel right this week?',
    ],
    sk: [
        'Čo sa tu v poslednom čase budovalo a aká rovnováha by ti tento týždeň vyhovovala?',
        'Čo v týchto oblastiach v poslednom čase rástlo a ako by tento týždeň vyzerala pokojnejšia rovnováha?',
        'Kde sa v poslednom čase prikláňaš priveľmi na jednu stranu a aká malá úprava by tento týždeň sedela?',
    ],
};
/**
 * THE REFLECTION FOLLOWS THE CHART'S STRONGEST FACT: the closest contact when there is one (what that point stands for), then the house (or the house pair at a Full Moon), then the axis or the
 * sign. So two charts that share a house still get different questions when their contacts differ.
 */
function reflectionText(event, natal) {
    const l = lang();
    const index = signIndexOf(event.moonSign);
    const top = natal?.activations[0] ?? null;
    const notice = top ? (l === 'sk' ? ROLES.sk[top.natal] : NOTICE_EN[top.natal]) : null;
    const pair = natal && natal.moonHouse !== null && natal.sunHouse !== null ? [HOUSES[l][natal.moonHouse - 1].focus, HOUSES[l][natal.sunHouse - 1].focus] : null;
    if (event.kind === 'full') {
        const axis = AXES[l][index % 6].focus;
        const closing = FULL_CLOSING[l][index % 3];
        if (l === 'sk') {
            const base = pair ? `Pozri sa na tieto dve oblasti: „${pair[0]}“ a „${pair[1]}“.` : `Os tohto splnu sa týka témy „${axis}“.`;
            return `${base}${notice ? ` Všimni si, ${notice}.` : ''} ${closing}`;
        }
        const hasPair = pair && natal && natal.moonHouse !== null && natal.sunHouse !== null;
        const base = hasPair
            ? `Look at how the weight falls between ${AREA_AFTER_IN_EN[natal.moonHouse - 1]} on one side and ${AREA_AFTER_IN_EN[natal.sunHouse - 1]} on the other.`
            : `The axis of this Full Moon is about ${axis}.`;
        /* the closest contact is named as what it touches, and tied to the thing the line is about, instead of a second "Notice" on an unrelated subject */
        const bearing = top ? ` The closest contact touches ${ROLES.en[top.natal]}, so notice how it bears on ${hasPair ? 'that balance' : 'this axis'}.` : '';
        return `${base}${bearing} ${FULL_CLOSING.en[(index + (natal?.moonHouse ?? 0)) % 3]}`;
    }
    const house = natal && natal.moonHouse !== null ? HOUSES[l][natal.moonHouse - 1].focus : null;
    const focus = house ?? NEW_FOCUS[l][index];
    const step = (n) => {
        if (l === 'sk') {
            return [
                `Vyber jeden malý, konkrétny krok v oblasti „${focus}“, z ktorého budeš mať o mesiac dobrý pocit.`,
                `Aký najmenší prvý krok v oblasti „${focus}“ sa dá urobiť v najbližších dňoch?`,
                `Vyber jednu jemnú, konkrétnu vec v oblasti „${focus}“, ktorou začneš, a nech je dosť malá na to, aby sa naozaj začala.`,
            ][n % 3];
        }
        /* the area said as the end of a sentence: "in your daily routine and health habits" with a house; from the sign alone the lead sentence has just named the theme, so it is "in that area" */
        const where = natal && natal.moonHouse !== null ? `in ${AREA_AFTER_IN_EN[natal.moonHouse - 1]}` : 'in that area';
        return [
            `Choose one small, concrete step ${where} that you would be glad to have started a month from now.`,
            `What is the smallest first step you could take ${where} in the next few days?`,
            `Pick one gentle, specific thing to begin ${where}, and keep it small enough to actually start.`,
            `Start with one small thing ${where}, and see how it feels before you add anything else.`,
            `What is one thing you could begin ${where} this week, however small?`,
        ][n % 5];
    };
    if (l === 'sk') {
        const lead = house ? '' : `Tento cyklus otvára tému „${focus}“. `;
        return `${lead}${notice ? `Všimni si, ${notice}. ` : ''}${step(index)}`;
    }
    const lead = house ? '' : `This cycle opens the theme of ${focus}. `;
    const bearing = top ? `The closest contact touches ${ROLES.en[top.natal]}, so notice how it meets that step. ` : '';
    return `${lead}${step(index + (natal?.moonHouse ?? 0))} ${bearing}`.trim();
}
function evidenceLineEn(natal) {
    const orbs = natal.activations.filter((activation) => activation.showOrb)
        .map((activation) => `${activation.eventBody} ${activation.aspect} natal ${activation.natal} ${decimal(activation.orb)}° from exact`);
    const houses = natal.moonHouse !== null ? 'Houses are Whole Sign houses, counted from your Ascendant.' : '';
    const parts = [orbs.length > 0 ? `Contacts: ${orbs.join('; ')}.` : '', houses].filter((part) => part.length > 0);
    return parts.length > 0 ? parts.join(' ') : null;
}
export function lunarEventText(input) {
    const { event, clock, onDay, natal } = input;
    const l = lang();
    const labels = LABELS[l];
    const personal = [];
    let caveat = null;
    if (natal) {
        const houses = houseParagraph(event, natal);
        const exact = natal.certainty === 'exact';
        if (houses)
            personal.push(houses);
        if (!exact)
            caveat = CAVEAT[l][natal.certainty === 'approximate' ? 'approximate' : 'unknown'];
        const contacts = natal.activations.map((activation, position) => activationParagraph(event, activation, position, natal.activations.slice(0, position).some((earlier) => earlier.eventBody === activation.eventBody && earlier.aspect === activation.aspect)));
        personal.push(...contacts);
        if (contacts.length === 0)
            personal.push(l === 'en' ? noContactEn(event, exact) : NO_CONTACT[l][exact ? 'exact' : 'other'](event.kind));
        const link = signLinkParagraph(event, natal);
        if (link)
            personal.push(link);
        if (!exact && contacts.length === 0) {
            const element = elementParagraph(event, natal);
            if (element)
                personal.push(element);
        }
    }
    return {
        title: eventTitle(event.kind, event.moonSign),
        when: clockLine(clock),
        positions: `${labels.moonWord} ${degreeText(event.moonDegree, event.moonMinute)} ${signName(event.moonSign)} · ${labels.sunWord} ${degreeText(event.sunDegree, event.sunMinute)} ${signName(event.sunSign)}`,
        traditionalName: event.traditionalName ? TRADITIONAL[l][event.traditionalName] : null,
        traditionalNote: event.traditionalName ? labels.traditionalNote : null,
        kicker: onDay ? labels[event.kind === 'full' ? 'onDayFull' : 'onDayNew'] : labels[event.kind === 'full' ? 'nextFull' : 'nextNew'],
        astronomy: astronomyText(event),
        meaning: l === 'en' ? meaningEn(event) : MEANING[l][event.kind],
        sign: signParagraph(event),
        personal,
        reading: lunarEventNarrative({ lang: l, kind: event.kind, moonSign: event.moonSign, hasNatal: natal !== null, moonHouse: natal?.moonHouse ?? null, sunHouse: natal?.sunHouse ?? null, activations: natal?.activations ?? [] }),
        headings: { sky: labels.headingSky, inChart: labels.headingInChart, reflect: labels.headingReflect, reading: labels.headingReading, technical: labels.headingTechnical },
        reflection: reflectionText(event, natal),
        caveat,
        evidenceLine: l === 'en' && natal ? evidenceLineEn(natal) : null,
        disclaimer: labels.disclaimer,
        zoneNote: clock.zoneIsFallback ? labels.zoneFallback : null,
    };
}
/** The short "then" line under the main event. */
export function followingLine(event, clock) {
    const l = lang();
    const lead = l === 'sk' ? 'Potom' : 'Then';
    return `${lead}: ${eventTitle(event.kind, event.moonSign)} · ${clockLine(clock)}`;
}
void lowerFirst;
void signKey;
