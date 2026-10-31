import { TAROT_VOICE_SK } from '../content/tarotVoiceSk.js?v=2ea79e9';
import { listPhrase, upperFirst } from '../content/tarotVoice.js?v=2ea79e9';
import { variantOf } from './readerInterpretation.js?v=2ea79e9';
import { anchorLead, anchorNote } from './questionAnchor.js?v=2ea79e9';
/** A quoted question that already ends on its own mark is not closed with a second full stop. */
const stop = (quoted) => (/[?!…]$/.test(quoted.trim()) ? "" : ".");
/**
 * ČÍTANIE K OTÁZKE PO SLOVENSKY.
 *
 * Paralelná implementácia toho istého hlasu, nie preklad. Platia pravidlá
 * z docs/tarot/TAROT_SK_STYLE.md a docs/tarot/TAROT_READER_STYLE_GUIDE.md:
 *
 *   ŽIADNA VETA NEURČUJE RÓD ČITATEĽA. Všetko, čo oslovuje čitateľa, je prítomný
 *   čas, rozkazovací spôsob alebo infinitív - "opýtal si sa" či "pripravený" tu
 *   nenájdeš.
 *
 *   NÁZOV KARTY STOJÍ LEN V NOMINATÍVE. Preto je v každej vete podmetom slovesa v
 *   prítomnom čase 3. osoby (to rod nepozná), stojí za dvojbodkou, alebo je
 *   v zátvorke. Predložka, ktorá by žiadala pád ("medzi", "od", "proti"), sa
 *   s názvom karty nikdy nespája.
 *
 *   FRAGMENT KARTY (STAKE) JE PODSTATNÉ MENO V NOMINATÍVE. Nikdy ho nenasleduje
 *   predložka ani predmet slovesa: stojí za "je", za dvojbodkou, za "na jednej
 *   strane ... na druhej", alebo ako podmet.
 *
 *   ČO KARTA HOVORÍ NA SVOJOM MIESTE, tu nie je: je to jej vlastný napísaný riadok
 *   (content/reader). Tento súbor ich len kladie medzi vety, ktoré karty spájajú.
 */
const ARC_LINE = {
    continuation: 'jedna línia vedená rovnomerne cez všetky karty',
    escalation: 'niečo, čo cestou rastie',
    interruption: 'usadená vec, do ktorej sa v polovici vstúpi',
    'breakdown-to-recovery': 'niečo, čo povolí a potom sa usadí',
    'expansion-to-limit': 'rozpínanie, ktoré narazí na hranu',
    'stasis-to-movement': 'nehybný začiatok, ktorý sa končí pohybom',
    'conflict-to-integration': 'rozdelenie, ktoré sa vracia do jedného celku',
    'opening-to-choice': 'situácia, ktorá dospeje k voľbe',
    'holding-to-release': 'niečo držané a potom pustené',
    'uncertainty-to-clarity': 'neisté otvorenie, ktoré sa vyjasní',
    'stability-to-disruption': 'usadené otvorenie, ktoré sa naruší',
    redirection: 'smer, ktorý sa v polovici otočí',
};
const ARC_ASK = {
    continuation: 'Otázka potom nie je čo robiť, ale či v tom pokračovať.',
    escalation: 'Otázka potom je, ako ďaleko to musí zájsť.',
    interruption: 'Čítanie je potom o tom zásahu, nie o úseku, ktorý dovtedy fungoval.',
    'breakdown-to-recovery': 'Dôležitejšie je tu to usadenie než to povolenie.',
    'expansion-to-limit': 'Otázka potom je, či je tá hranica skutočná, alebo len ďalšia vec, ktorú treba prekonať.',
    'stasis-to-movement': 'Otázka potom je, načo tá nehybnosť bola.',
    'conflict-to-integration': 'Otázka potom je, čoho sa treba vzdať, aby sa to zatvorilo.',
    'opening-to-choice': 'Žiada to tú voľbu urobiť, nie ju znova vážiť.',
    'holding-to-release': 'Otázka potom je, čo to držanie chránilo.',
    'uncertainty-to-clarity': 'Žiada to na vyjasnenie počkať, nie ho tlačiť.',
    'stability-to-disruption': 'Otázka potom je, či to usadenie bolo skutočné.',
    redirection: 'Otázka potom je, či ten obrat robíš ty, alebo niekto iný.',
};
const PAIR_PLAIN = {
    interruption: [
        (a, b, s) => `${b} vstupuje do toho, čo ${a} ustálila: ${s}.`,
        (a, b, s) => `${b} preruší líniu, po ktorej šla ${a}: ${s}.`,
    ],
    stabilisation: [
        (a, b, s) => `${b} dáva tomu, čo ${a} rozkolísala, pevnejšiu pôdu: ${s}.`,
        (a, b, s) => `${b} usádza to, čo ${a} nechala rozkolísané: ${s}.`,
    ],
    escalation: [
        (a, b, s) => `${b} ide smerom, ktorým sa vydala ${a}, ešte ďalej: ${s}.`,
        (a, b, s) => `To, čo ${a} začína, ${b} stupňuje: ${s}.`,
    ],
    softening: [
        (a, b, s) => `${b} nesie tú istú líniu ako ${a}, no tichšie: ${s}.`,
        (a, b, s) => `${b} pokračuje v línii, ktorú otvorila ${a}, len jemnejšie: ${s}.`,
    ],
    reinforcement: [
        (a, b, s) => `${b} hovorí to isté čo ${a}, len z inej strany: ${s}.`,
        (a, b, s) => `${a} a ${b} sa tu navzájom posilňujú: ${s}.`,
    ],
    redirection: [
        (a, b, s) => `${b} ohýba smer, ktorý udáva ${a}: ${s}.`,
        (a, b, s) => `Smer, ktorým šla ${a}, ${b} nezastavuje, len ho mení: ${s}.`,
    ],
    release: [
        (a, b, s) => `${b} púšťa to, čo držala ${a}: ${s}.`,
        (a, b, s) => `${b} odkladá to, čo ${a} niesla: ${s}.`,
    ],
    integration: [
        (a, b, s) => `${b} dáva dokopy to, čo ${a} rozdelila: ${s}.`,
        (a, b, s) => `Kde ${a} rozdeľuje, ${b} skladá do jedného celku: ${s}.`,
    ],
    exposure: [
        (a, b, s) => `${b} vynáša na svetlo to, čo ${a} držala vnútri: ${s}.`,
        (a, b, s) => `To, čo ${a} nosila vo vnútri, ${b} vystavuje pohľadu: ${s}.`,
    ],
    answer: [
        (a, b, s) => `${b} odpovedá na to, čo ${a} nechala otvorené: ${s}.`,
        (a, b, s) => `To, čo ${a} nechala bez odpovede, ${b} pomenúva: ${s}.`,
    ],
    contrast: [
        (a, b, s) => `${b} komplikuje to, čo ukazuje ${a}: ${s}.`,
        (a, b, s) => `${a} a ${b} neukazujú rovnakým smerom: ${s}.`,
    ],
    continuation: [
        (a, b, s) => `${b} nadväzuje na to, čo ukazuje ${a}: ${s}.`,
        (a, b, s) => `${b} pokračuje v tom, čo ${a} začala: ${s}.`,
    ],
};
const PAIR_NAMES = {
    interruption: [(a, b) => `${b} prekríži to, čo opisuje ${a}.`, (a, b) => `${b} preruší líniu, po ktorej šla ${a}.`],
    stabilisation: [(a, b) => `${b} dáva pevnejšiu oporu tomu, čo opisuje ${a}.`, (a, b) => `${a} opisuje niečo rozkolísané, ${b} to usádza.`],
    escalation: [(a, b) => `${b} ide tým istým smerom ako ${a}, no ďalej.`, (a, b) => `${b} stupňuje to, čo opisuje ${a}.`],
    softening: [(a, b) => `${b} ide tou istou líniou ako ${a}, no tichšie.`, (a, b) => `${b} pokračuje v línii, ktorú opisuje ${a}, len jemnejšie.`],
    reinforcement: [(a, b) => `${b} drží tú istú líniu ako ${a}.`, (a, b) => `${a} a ${b} sa tu navzájom posilňujú.`],
    redirection: [(a, b) => `${b} otáča smer, ktorým ide ${a}, ale neukončuje ho.`, (a, b) => `${b} ohýba smer, ktorý udáva ${a}.`],
    release: [(a, b) => `${b} púšťa to, čo opisuje ${a}.`, (a, b) => `${b} odkladá to, čo ${a} opisuje.`],
    integration: [(a, b) => `${b} skladá do celku to, čo opisuje ${a}.`, (a, b) => `${b} dáva dokopy to, čo ${a} opisuje.`],
    exposure: [(a, b) => `${b} vynáša na svetlo to, čo opisuje ${a}.`, (a, b) => `${b} ukazuje to, čo ${a} opisuje.`],
    answer: [(a, b) => `${b} odpovedá na to, čo opisuje ${a}.`, (a, b) => `${b} odpovedá na otázku, ktorú ${a} necháva otvorenú.`],
    contrast: [(a, b) => `${b} smeruje opačne ako ${a}.`, (a, b) => `${b} komplikuje to, čo ukazuje ${a}.`],
    continuation: [(a, b) => `${b} nadväzuje na to, čo prináša ${a}.`, (a, b) => `${b} vyplýva z toho, čo ukazuje ${a}.`],
};
/** Čo karta, ktorá je obrátená, nerobí: neusádza, neodpovedá, nepúšťa, nespája a nezmierňuje nič z toho, čo jej predchádza - tie vety by jej pripisovali dar základnej polohy. */
const NOT_BY_A_REVERSED = new Set(['answer', 'release', 'integration', 'softening', 'stabilisation', 'exposure']);
const edgeLedgers = new WeakMap();
/** Karta v bežnej vete: "karta X", obrátená ako "obrátená karta X". */
const refOf = (c, index) => (c.plan.cards[index].orientation === 'reversed' ? `obrátená karta ${c.name(index)}` : `karta ${c.name(index)}`);
/**
 * Dve karty, ktoré si niečo robia, povedané raz za čítanie. Prázdny reťazec, keď by veta pripisovala obrátenej karte dar základnej polohy alebo keď tú istú dvojicu čítanie už povedalo.
 */
function pairText(edge, c, v) {
    const said = edgeLedgers.get(c) ?? new Set();
    edgeLedgers.set(c, said);
    const key = `${edge.from}>${edge.to}`;
    if (said.has(key))
        return '';
    const reversedTo = c.plan.cards[edge.to].orientation === 'reversed';
    const reversedFrom = c.plan.cards[edge.from].orientation === 'reversed';
    if (reversedTo && NOT_BY_A_REVERSED.has(edge.relation))
        return '';
    const [a, b] = [refOf(c, edge.from), refOf(c, edge.to)];
    const plain = !reversedTo && !reversedFrom;
    const text = plain
        ? upperFirst(PAIR_PLAIN[edge.relation][v % PAIR_PLAIN[edge.relation].length](a, b, c.stake(edge.to)))
        : upperFirst(PAIR_NAMES[edge.relation][v % PAIR_NAMES[edge.relation].length](a, b));
    said.add(key);
    return text;
}
const RANK_NAME = {
    ace: 'eso', two: 'dvojka', three: 'trojka', four: 'štvorka', five: 'päťka', six: 'šestka', seven: 'sedmička',
    eight: 'osmička', nine: 'deviatka', ten: 'desiatka', page: 'páža', knight: 'rytier', queen: 'kráľovná', king: 'kráľ',
};
const RANK_THEME = {
    ace: 'začiatky', two: 'voľby a dvojice', three: 'rast a prejav', four: 'štruktúra a držanie', five: 'trenie',
    six: 'prispôsobenie a pohyb ďalej', seven: 'skúšanie a posudzovanie', eight: 'pohyb a zdokonaľovanie',
    nine: 'intenzita ku koncu cyklu', ten: 'dokončenie a to, čo po ňom nasleduje',
    page: 'učenie sa', knight: 'naháňanie', queen: 'vnútorné majstrovstvo', king: 'vonkajšia zodpovednosť',
};
/** Nominatív množného čísla - "Vedúcou farbou sú ...". */
const SUIT_PLURAL = { wands: 'palice', cups: 'poháre', swords: 'meče', pentacles: 'mince' };
/** Genitív množného čísla - po "z". */
const SUIT_GENITIVE = { wands: 'palíc', cups: 'pohárov', swords: 'mečov', pentacles: 'mincí' };
const SUIT_AREA = { wands: 'elán', cups: 'cit', swords: 'myšlienka', pentacles: 'hmotné veci' };
const SUIT_DOMAIN = {
    wands: {
        relating: 'túžba a iniciatíva v tom, ako sa stretávate',
        working: 'elán a iniciatíva v práci',
        creating: 'iskra a vôľa začať',
        inner: 'energia a ambícia',
        general: 'elán a iniciatíva',
    },
    cups: {
        relating: 'cit a blízkosť',
        working: 'ľudská stránka práce',
        creating: 'to, k čomu sa tvorba cítením prepracúva',
        inner: 'cit a vnímavosť',
        general: 'cit a spojenie',
    },
    swords: {
        relating: 'čo sa medzi vami hovorí a čo nie',
        working: 'rozhodnutia a komunikácia',
        creating: 'nápady a úsudok',
        inner: 'myslenie a úsudok',
        general: 'myšlienka, pravda a rozhodnutie',
    },
    pentacles: {
        relating: 'čo sa v praxi spoločne buduje',
        working: 'konkrétna práca a zdroje',
        creating: 'remeslo, forma a to, čo sa dá naozaj vyrobiť',
        inner: 'telo, návyky a to, čo je pevné',
        general: 'hmotná skutočnosť a to, čo sa dá postaviť',
    },
};
const DIMENSION_LINE = {
    direction: 'kde v priebehu stoja',
    movement: 'ktorým smerom tlačia',
    focus: 'či hľadia dovnútra alebo von',
    stance: 'ako zaobchádzajú s ľuďmi okolo',
    stability: 'aké sú stabilné',
    agency: 'čo žiadajú',
};
const WHY = {
    'one-card-reflection': 'Na takúto otázku stačí jedna karta: ukazuje na jednu vec, na ktorú sa pozrieť.',
    'past-present-future': 'Pýta sa, kam niečo smeruje, preto sa karty čítajú ako vplyv z minulosti, súčasný stav a smer, ktorým to ide.',
    'situation-action-outcome': 'Pýta sa, čo robiť, preto sa karty čítajú ako situácia, odpoveď, ktorá jej sedí, a kam táto odpoveď smeruje.',
    'problem-cause-solution': 'Pýta sa, prečo sa niečo stále opakuje, preto sa karty čítajú ako viditeľná ťažkosť, dynamika pod ňou a konštruktívna odpoveď.',
    'self-other-relationship': 'Ide o vzťah, preto sa karty čítajú ako tvoja časť, ako môže odtiaľto vyzerať druhá strana, a čo je medzi vami.',
    'option-a-b-guidance': 'Je to voľba medzi dvoma vecami, preto karty čítajú, čo každá z nich drží a na čom voľba naozaj stojí, bez vyberania víťaza.',
    'body-mind-spirit': 'Je to otázka na celkový obraz, preto sa karty čítajú ako praktická stránka, myseľ a cítenie a to, o čom to je pod povrchom.',
    'steadying-reflection': 'Toto je otázka, ktorú čítanie z kariet nevie rozhodnúť, preto sa karty čítajú podľa toho, ako voči nej stojíš, čo ju robí ťažkou a čo ťa môže podržať.',
    'support-resistance-key': 'Pýta sa na výsledok, ktorý žiadna karta nesľubuje, preto sa karty čítajú podľa toho, čo to podporuje, čo proti tomu pôsobí a na čom to stojí.',
    'blind-spot-view': 'Pýta sa, čo môže byť mimo zorného poľa, preto sa karty čítajú ako to, čo je už vidieť, čo môže byť mimo toho a čo by sa zmenilo, keby sa to uvidelo.',
    'resources-view': 'Pýta sa, o čo sa môžeš oprieť, preto sa karty čítajú ako to, čo už nesieš, čo ďalšie je k dispozícii a kde sa to dá použiť.',
};
const FLOW = {
    'agency:passive-to-active': 'Rozloženie sa pohybuje od čakania ku konaniu.',
    'agency:active-to-passive': 'Rozloženie sa pohybuje od konania k prijímaniu a čakaniu.',
    'focus:inner-to-outer': 'To, čo začína vo vnútri, sa končí navonok.',
    'focus:outer-to-inner': 'To, čo začína navonok, sa končí obrátené dovnútra.',
    'intensity:rising': 'Váha čítania cestou k poslednej karte narastá.',
    'intensity:easing': 'Váha čítania cestou k poslednej karte ustupuje.',
};
const THEME_MOVEMENT = {
    outward: 'Celkovo sa karty prikláňajú navonok, ku konaniu.',
    steadying: 'Celkovo sa karty prikláňajú k usadeniu.',
    inward: 'Celkovo sa karty prikláňajú dovnútra, k zdržaniu sa.',
    turning: 'Celkovo sa karty prikláňajú k zmene smeru.',
};
const HINGE_LEAD = {
    defining: ['Najviac záleží na tomto:', 'Čítanie sa opiera o toto:', 'Os čítania:'],
    notable: ['Stojí za povšimnutie:', 'Čítaj ako prvé:', 'Jeden vzťah vyniká:'],
    quiet: ['Najbližšie k osi:'],
};
const ELEMENT_NAME = { fire: 'oheň', water: 'voda', air: 'vzduch', earth: 'zem' };
function elementLine(kind, elements) {
    const [left, right] = elements;
    const pair = `${upperFirst(ELEMENT_NAME[left])} a ${ELEMENT_NAME[right]}`;
    if (kind === 'reinforcing') {
        return left === right
            ? `Dve z kariet majú rovnaký živel (${ELEMENT_NAME[left]}), čo ten register zosilňuje.`
            : `${pair} sa tu navzájom podnecujú, čo ten register aktivuje.`;
    }
    if (kind === 'nourishing')
        return `${pair} sa tu navzájom živia: cit a praktický základ sa podporujú.`;
    const mixed = [left, right].sort().join('|');
    return mixed === 'air|earth'
        ? 'Vzduch a zem tu pracujú v odlišných režimoch: pojmové a praktické sa celkom nestretnú.'
        : `${pair} tu pôsobia proti sebe: elán a cit sa navzájom tlmia alebo rušia.`;
}
const plain = (items) => listPhrase(items, 'a');
const dims = (keys) => plain(keys.map((key) => DIMENSION_LINE[key] ?? key));
const REFLECT = {
    continue: 'Ako by vyzeralo pokračovanie, keby bolo vybrané, a nie zdedené?',
    redirect: 'Ktorá časť súčasnej línie stojí za zachovanie a ktorá je len zotrvačnosť?',
    'let-go': 'Čo to držanie chráni a čo by stálo jeho položenie?',
    moderate: 'Kde by ľahší dotyk zmenil to, čo sa naozaj stane?',
    'meet-it': 'Ako by vyzeralo stretnutie s tým priamo a čo sa získava obchádzaním?',
    wait: 'Čo sa dá všimnúť, kým sa nič nerobí?',
    choose: 'Akú voľbu stále nechávaš otvorenú a na čo čaká?',
    integrate: 'Ktoré časti idú proti sebe a čo by im dovolilo sedieť spolu?',
    'attend-to-it': 'Čomu sa ešte nevenovala dosť pozornosti?',
};
/**
 * KARTA JE PODMET, NÁZOV JE PRÍVESOK.
 *
 * Názov karty stojí len v nominatíve a môže byť v množnom čísle (Zaľúbenci) alebo v inom ráde než
 * sloveso, ktoré by ho nasledovalo. Preto je podmetom vždy slovo "karta" - ženský rod, jednotné
 * číslo, tretia osoba prítomného času - a názov je k nej priložený ako v tabuľke. Po predložke
 * stojí názov v úvodzovkách, nikdy skloňovaný.
 */
const cardRef = (c, index) => `karta ${c.name(index)}`;
/**
 * KRÁTKA VETA PRED KARTOU, KTORÁ MENÍ ČÍTANIE, A POVEDÁ TO.
 *
 * Hovorí sa len pri vzťahu, ktorý si vetu zaslúži, a z karty na kartu inak. Nepomenúva žiadnu kartu:
 * podmetom je karta, ktorá nasleduje, a toto je len obrátenie strany.
 */
const LINK = {
    interruption: {
        mid: ['Tu sa línia láme.', 'Tu sa čítanie preruší.', 'To, čo bolo ustálené, sa tu naruší.'],
        final: ['Posledná karta preruší to, čo prišlo predtým.', 'Na konci sa do čítania vstúpi.', 'Posledná karta naruší to, čo bolo ustálené.'],
    },
    stabilisation: {
        mid: ['Tu sa čítanie usádza.', 'Odtiaľto je pôda pevnejšia.', 'Tu veci nadobúdajú pevnosť.'],
        final: ['Posledná karta čítanie usádza.', 'Posledná karta dáva čítaniu pevnejšiu pôdu.', 'Čítanie sa končí na pevnejšej pôde.'],
    },
    escalation: {
        mid: ['Odtiaľto tlak rastie.', 'To zosilňuje, čo prišlo predtým.', 'Odtiaľto to tlačí silnejšie.'],
        final: ['Posledná karta stupňuje, čo prišlo predtým.', 'Na konci sa tlak ešte zvýši.', 'Posledná karta tlačí ešte silnejšie.'],
    },
    softening: {
        mid: ['Tu tlak povoľuje.', 'Odtiaľto to ide tichšie.', 'Toto z toho berie časť sily.'],
        final: ['Posledná karta tlak zmierňuje.', 'Na konci to utíchne.', 'Posledná karta z toho berie časť sily.'],
    },
    reinforcement: {
        mid: ['Toto potvrdzuje tú istú vec z inej strany.', 'Tá istá vec sa objavuje z inej strany.', 'Toto hovorí to isté inak.'],
        final: ['Posledná karta hovorí to isté z inej strany.', 'Posledná karta potvrdzuje to, čo prišlo predtým.', 'Na konci zaznie to isté inými slovami.'],
    },
    redirection: {
        mid: ['Tu sa rozloženie obracia.', 'Tu sa kurz mení.', 'Odtiaľto sa smer ohýba.'],
        final: ['Posledná karta čítanie obracia.', 'Posledná karta mení smer čítania.', 'Čítanie sa na konci obracia.'],
    },
    release: {
        mid: ['Tu sa niečo odkladá.', 'Tu sa držanie končí.', 'Tu zovretie povoľuje.'],
        final: ['Posledná karta púšťa to, čo prišlo predtým.', 'Na konci sa niečo pustí.', 'Posledná karta zovretie uvoľňuje.'],
    },
    integration: {
        mid: ['Tu sa časti začínajú skladať.', 'Odtiaľto sa kúsky dávajú dokopy.', 'Tu sa to rozdelené spája.'],
        final: ['Posledná karta spája, čo bolo rozdelené.', 'Na konci sa časti skladajú.', 'Posledná karta dáva čítaniu celok.'],
    },
    exposure: {
        mid: ['Tu vychádza na povrch to, čo bolo vnútri.', 'Toto vynáša na svetlo to, čo ležalo pod povrchom.', 'Tu sa niečo skryté ukazuje.'],
        final: ['Posledná karta ukazuje, čo bolo skryté.', 'Na konci vychádza na povrch to, čo bolo vnútri.', 'Posledná karta vynáša skryté na svetlo.'],
    },
    answer: {
        mid: ['Táto karta odpovedá na predchádzajúcu.', 'Čítanie sa tu začína odpovedať samo.', 'To, čo zostalo otvorené, tu dostáva odpoveď.'],
        final: ['Posledná karta odpovedá na to, čo zostalo otvorené.', 'Na konci čítanie dostáva odpoveď.', 'Posledná karta reaguje na predchádzajúcu.'],
    },
    contrast: {
        mid: ['Ďalšia karta to komplikuje.', 'Tu sa čítanie ťahá dvoma smermi.', 'Obraz tu prestáva byť jednoduchý.'],
        final: ['Posledná karta čítanie komplikuje.', 'Posledná karta ťahá proti tomu, čo prišlo predtým.', 'Posledná karta obraz podstatne mení.'],
    },
    continuation: { mid: ['Čítanie odtiaľto pokračuje.'], final: ['Čítanie pokračuje až do konca.'] },
};
/* ------------------------------------------------------------ a position -- */
function criterionPreface(contrast, stake) {
    return contrast === 'forces' ? `Na čom to stojí, je ${stake}.` : `Na čom voľba stojí, je ${stake}.`;
}
function lead(clause, c) {
    const groups = c.interpretation.groups[clause.i];
    const lines = groups.map((group) => c.line(clause.i, group));
    if (lines.some((line) => line === null))
        return `${upperFirst(`karta ${c.title(clause.i)}`)}: ${c.phrases(clause.i).dynamic}.`;
    const preface = clause.fn === 'criterion' ? [criterionPreface(clause.contrast, c.stake(clause.i))] : [];
    return [...preface, ...lines].join(' ');
}
/* ----------------------------------------------------------- the insight -- */
const ALIGNMENT_INSIGHT = {
    aligned: [
        'Obe strany stoja v mnohom na rovnakom mieste: na jednej {a}, na druhej {b}, a medzi nimi je {m}.',
        'Obe strany sa tu prikláňajú rovnakým smerom, {a} aj {b}, a to, čo je medzi nimi, je {m}.',
    ],
    complementary: [
        'Obe strany nie sú rovnaké, no sedia k sebe: na jednej {a}, na druhej {b}, a medzi nimi je {m}.',
        'Každá strana dodáva to, čo tej druhej chýba: {a} a {b}, a medzi nimi {m}.',
    ],
    opposed: [
        'Obe strany nestoja na rovnakom mieste: na jednej {a}, na druhej {b}. To, čo je medzi nimi, {m}, je miesto, kde sa ten rozdiel buď spracuje, alebo nie.',
        'Rozdiel medzi stranami je skutočný: na jednej {a}, na druhej {b}. Nesie ho to, čo je medzi nimi: {m}.',
    ],
    apart: [
        'Obe strany majú spoločného málo ({a}; {b}), a preto váha leží na tom, čo je medzi nimi: {m}.',
        'Spoločnej pôdy je málo ({a}; {b}), a vzťah sa číta najmä cez to, čo je medzi nimi: {m}.',
    ],
};
const lowerFirst = (value) => value.charAt(0).toLowerCase() + value.slice(1);
/** Tvar jedného druhu záveru v poradí, ktoré žiada štruktúra čítania. Chýbajúci tvar padá na základný. */
function conclusion(clause, c) {
    const s = (index) => c.stake(clause.focus[index] ?? clause.focus[0]);
    const n = (index) => c.name(clause.focus[index] ?? clause.focus[0]);
    const v = clause.v;
    /* Two wordings are chosen by a number that is independent of the one that chooses among three. */
    const w = (clause.v + clause.lead) % 2;
    const shape = clause.shape;
    switch (clause.kind) {
        case 'ladder-problem':
            if (shape === 'tension-first')
                return `V čítaní je napätie skôr než odpoveď: na povrchu ${s(0)}, pod tým ${s(1)}. Zmeniť to môže ${s(2)}.`;
            if (shape === 'conditional')
                return `Na povrchu to vyzerá ako ${s(0)}; pod tým sa drží ${s(1)}; a zmeniť to môže ${s(2)}.`;
            if (shape === 'progression')
                return `Čítanie sa pohybuje v troch krokoch: najprv to, čo je vidieť (${s(0)}), potom to, čo to drží (${s(1)}), potom to, čo to môže zmeniť (${s(2)}).`;
            return w === 0
                ? `Na povrchu je to ${s(0)}. Pod tým je ${s(1)}. Zmeniť to môže ${s(2)}.`
                : `Na povrchu sa to ukazuje ako ${s(0)}, drží to ${s(1)} a pohnúť to môže ${s(2)}.`;
        case 'ladder-situation':
            if (shape === 'tension-first')
                return `Situácia v sebe nesie napätie: ${s(0)} a to, čo si žiada, ${s(1)}. Kam to smeruje: ${s(2)}.`;
            if (shape === 'conditional')
                return `Situácia teraz vyzerá takto: ${s(0)}. Pomôcť môže ${s(1)} a smer, ktorým to ide, je ${s(2)}.`;
            if (shape === 'progression')
                return `Od začiatku ku koncu: ${s(0)}; ${s(1)}; ${s(2)} - kde veci stoja, čo si žiadajú, kam smerujú.`;
            return w === 0
                ? `Situácia vyzerá takto: ${s(0)}. Pomôcť môže ${s(1)}. Smer, ktorým to ide, je ${s(2)}.`
                : `Situácia je teraz ${s(0)}. Čo si žiada, je ${s(1)}. A smeruje k tomuto: ${s(2)}.`;
        case 'ladder-sequence':
            if (shape === 'tension-first')
                return `Postupnosť nejde hladko: na začiatku je ${s(0)}, uprostred ${s(1)} a na konci ${s(2)}, a švy je vidieť.`;
            if (shape === 'conditional')
                return `Začiatok tvorí ${s(0)}, stred ${s(1)}; koniec patrí k tomuto: ${s(2)}.`;
            if (shape === 'progression')
                return `Pohyb má tri kroky: ${s(0)}; ${s(1)}; ${s(2)}.`;
            return w === 0
                ? `Na začiatku je ${s(0)}, uprostred ${s(1)} a na konci ${s(2)}.`
                : `Pohyb v troch krokoch: ${s(0)}; ${s(1)}; ${s(2)}.`;
        case 'late-turn':
            if (shape === 'conditional')
                return `Základom je ${s(0)}, potom ${s(1)}; posledná karta, ${n(2)}, ho môže zmeniť: ${s(2)}.`;
            if (shape === 'progression')
                return `${upperFirst(s(0))}; potom ${s(1)}; a ${n(2)} mení, čo to znamená: ${s(2)}.`;
            switch ((v + clause.lead) % 3) {
                case 0: return `Posledná karta, ${n(2)}, neruší to, čo jej predchádza: ${s(0)}, potom ${s(1)}. Mení spôsob, ako sa k tomu dá pristupovať: ${s(2)}.`;
                case 1: return `Čítanie mení posledná karta, ${n(2)}. Neruší to, čo jej predchádza (${s(0)}; ${s(1)}), ale dáva tomu iný základ: ${s(2)}.`;
                case 2: return `Základ čítania: ${s(0)}; potom ${s(1)}. Posledná karta, ${n(2)}, k tomu pridáva svoje: ${s(2)}.`;
                default: return `Základ čítania: ${s(0)}; potom ${s(1)}. Posledná karta, ${n(2)}, k tomu pridáva svoje: ${s(2)}.`;
            }
        case 'gap': {
            const other = clause.focus[2];
            const outcome = other === undefined ? ''
                : other === c.plan.cards.length - 1 ? ` ${upperFirst(cardRef(c, other))} pridáva smer, nie rozuzlenie: ${s(2)}.`
                    : ` Začiatkom je ${s(2)}.`;
            if (shape === 'conditional')
                return `Ak je ten rozpor skutočný, je tento: na jednej strane ${s(0)}, na druhej ${s(1)}. Karty ho nerozhodujú; pýtajú sa, čo každá strana chráni.${outcome}`;
            if (shape === 'progression')
                return `Rozloženie smeruje k rozporu: na jednej strane ${s(0)}, na druhej ${s(1)}. Ani jedno nie je jednoducho chyba.${outcome}`;
            return w === 0
                ? `Rozloženie dáva vedľa seba dve veci: ${s(0)} a ${s(1)}. Užitočná otázka je menej v tom, ktorá z nich vyhrá, než v tom, čo každá z nich chráni.${outcome}`
                : `Je tu skutočný rozpor: na jednej strane ${s(0)}, na druhej ${s(1)}. Ani jedno nie je jednoducho chyba a karty medzi nimi nevyberajú.${outcome}`;
        }
        case 'consistent': {
            const end = s(clause.focus.length - 1);
            const between = clause.focus.length > 2 ? ` a medzi nimi ${s(1)}` : '';
            return w === 0
                ? `Na jednom konci ${s(0)}, na druhom ${end}${between} - a hovoria to isté z rôznych strán.`
                : `Ktorúkoľvek kartu čítaš ako prvú, ukazuje na to isté: na jednom konci ${s(0)}, na druhom ${end}${between}.`;
        }
        case 'self-other': {
            const table = ALIGNMENT_INSIGHT[clause.alignment ?? 'apart'];
            return table[v % table.length].replace('{a}', s(0)).replace('{b}', s(1)).replace('{m}', s(2));
        }
        case 'options':
            if (shape === 'tension-first')
                return `Obe cesty idú proti sebe: na jednej strane ${s(0)}, na druhej ${s(1)}. Karty nevyberajú; o voľbe rozhoduje ${s(2)}.`;
            if (shape === 'conditional')
                return `Ak je voľba medzi týmito dvoma: ${s(0)} a ${s(1)}, karty jednu nevyberajú; rozhoduje ${s(2)}.`;
            if (v === 2)
                return `Sú tu dve cesty: ${s(0)} a ${s(1)}, a karty nechávajú voľbu otvorenú. Rozhoduje ${s(2)}.`;
            return w === 0
                ? `Karty medzi dvoma cestami nevyberajú. Na jednej strane ${s(0)}, na druhej ${s(1)}; o voľbe rozhoduje ${s(2)}.`
                : `Ani jedna cesta tu nie je zvýhodnená: na jednej strane ${s(0)}, na druhej ${s(1)}, a rozhoduje ${s(2)}.`;
        case 'forces':
            if (shape === 'tension-first')
                return `Podpora a odpor tu idú tvrdo proti sebe: na jednej strane ${s(0)}, na druhej ${s(1)}. Na čom to stojí: ${s(2)}. Je to rovnováha tak, ako veci stoja, nie predpoveď.`;
            if (shape === 'conditional')
                return `Pomáha ${s(0)} a proti tomu tlačí ${s(1)}; záleží na tom, čo je ${s(2)}: podmienka, nie rozsudok.`;
            if (v === 2)
                return `Dve sily: na jednej strane podpora (${s(0)}), na druhej odpor (${s(1)}). Medzi nimi rozhoduje ${s(2)}: podmienka, nie rozsudok.`;
            return w === 0
                ? `Podpora aj odpor sú skutočné: na jednej strane ${s(0)}, na druhej ${s(1)}; na čom to stojí, určuje ${s(2)}. Je to rovnováha tak, ako veci stoja, nie predpoveď.`
                : `Pomáha ${s(0)} a tlačí proti tomu ${s(1)}. Na čom to stojí, je ${s(2)} - podmienka, nie rozsudok.`;
        case 'layers':
            if (shape === 'conditional')
                return `Na praktickej rovine je to ${s(0)}, v mysli a cítení ${s(1)} a pod oboma leží ${s(2)}.`;
            if (shape === 'progression')
                return `Od praktického cez duševné k tomu, o čom to je pod povrchom: ${s(0)}; ${s(1)}; ${s(2)}.`;
            if (v === 2)
                return `Praktická stránka je ${s(0)}; myseľ a cítenie ${s(1)}; a pod tým je ${s(2)}.`;
            return w === 0
                ? `Prakticky je to ${s(0)}. V mysli a cítení je to ${s(1)}. Pod tým všetkým prechádza ako niť ${s(2)}.`
                : `Pod oboma stránkami prechádza niť: ${s(2)}; praktická stránka nesie ${s(0)}, myseľ a cítenie nesú ${s(1)}.`;
        default:
            return '';
    }
}
const GROUNDS = new Set(['ladder-problem', 'ladder-situation', 'ladder-sequence', 'late-turn', 'gap', 'consistent', 'options', 'forces']);
function insight(clause, c) {
    let text = conclusion(clause, c);
    if (text.length === 0)
        return text;
    /* A conclusion that already opens on an "ak" is not given a second one. */
    const lead = clause.subject !== null && GROUNDS.has(clause.kind) && !/^ak /i.test(text) ? anchorLead({ subject: clause.subject }, 'sk', clause.lead) : '';
    if (lead.length > 0)
        text = `${lead}${lowerFirst(text)}`;
    if (clause.tone === 'heavy') {
        text += clause.v === 0
            ? ' Rozloženie je ťažké, no ukazuje napätý vzorec, nie pevne daný výsledok.'
            : ' Nie je to rozsudok: karty ukazujú napätý vzorec, nie pevne daný výsledok.';
    }
    return text;
}
/* ------------------------------------------------------------- the opening -- */
function opening(clause) {
    const { v } = clause;
    switch (clause.focus) {
        case 'late-turn':
            return ['Posledná karta mení čítanie podstatne.', 'Čítanie mení posledná karta.', 'Posledná karta je tá, ktorá toto čítanie pohybuje.'][v % 3];
        case 'contradiction': {
            const adjective = clause.tone === 'heavy' || clause.tone === 'tense' ? 'nepríjemný' : 'skutočný';
            return [
                `V strede tohto rozloženia je ${adjective} rozpor.`,
                'Prvé, čo vyniká, je, že dve karty si navzájom odporujú, a na tom odpore záleží.',
                'Dve z týchto kariet idú proti sebe a čítanie pri tom zostáva.',
            ][v % 3];
        }
        case 'weight':
            return [
                'Väčšinu tohto rozloženia tvoria Veľké arkány, a otázka tak dostáva väčšiu váhu, než by jej dali samotné detaily.',
                'Je to rozloženie veľkých kariet, takže otázka stojí v niečom širšom než sú jej detaily.',
                'Karty sú tu veľké a otázka sa číta proti tej váhe.',
            ][v % 3];
        case 'consistent': {
            const tail = clause.tone === 'heavy' ? ', a to, čo hovorí, nie je ľahké' : '';
            return [
                `Rozloženie je v tomto bode nezvyčajne jednotné${tail}.`,
                `Karty sa tu medzi sebou zhodujú viac, než sa zvyčajne zhodujú${tail}.`,
                `Karty tu hovoria v podstate to isté, z rôznych strán${tail}.`,
            ][v % 3];
        }
        case 'even':
            return ['Obraz je vyrovnanejší, než sa na prvý pohľad zdá.', 'Žiadna jedna vrstva tu čítanie nenesie sama; je skôr vyrovnané než jednostranné.', 'Nič v obraze nedominuje; vrstvy sú na jednej úrovni.'][v % 3];
        default:
            return '';
    }
}
/* ---------------------------------------------------------------- the clauses -- */
function render(clause, c) {
    const { plan } = c;
    const seed = c.delivery.seed;
    switch (clause.k) {
        case 'ask':
            return clause.excerpt ? `Otázka znie: „${clause.excerpt}“${stop(clause.excerpt)}` : 'Všetko nižšie vychádza z tvojej otázky.';
        case 'why':
            return WHY[clause.spreadId] ?? WHY['body-mind-spirit'];
        case 'yes-no-note':
            return 'Karty neodpovedajú áno alebo nie. Toto čítanie sa namiesto toho pozerá na to, čo sa okolo tej otázky deje.';
        case 'assumption-note':
            return 'Otázka berie ako hotové niečo, čo karty nevedia potvrdiť, preto sa rozloženie číta podľa toho, čo ukazuje o dynamike, nie podľa toho, či je ten predpoklad pravdivý.';
        case 'anchor-note':
            return anchorNote({ subject: clause.subject }, 'sk');
        case 'opening':
            return opening(clause);
        case 'reversal-note':
            if (clause.total === 1)
                return 'Karta vyšla obrátená, čo mení, ako sa číta - nerobí z nej zlú kartu.';
            if (clause.reversed === 1)
                return 'Jedna karta vyšla obrátená, čo mení, ako sa číta - nerobí z nej zlú kartu.';
            if (clause.reversed === clause.total)
                return 'Všetky karty vyšli obrátené, takže celé čítanie je v pozmenenej polohe, nie v základnej.';
            return `Obrátených kariet je ${clause.reversed} z ${clause.total}. Obrátenie mení, ako sa karta prejavuje; nerobí z nej výstrahu.`;
        case 'link': {
            const options = LINK[clause.relation][clause.final ? 'final' : 'mid'];
            return options[clause.v % options.length];
        }
        case 'lead':
            return lead(clause, c);
        case 'mode':
            return TAROT_VOICE_SK.orientation.modeLine[plan.cards[clause.i].card.reversalMode];
        case 'court': {
            const rank = RANK_NAME[clause.rank];
            const as = `Ako dvorná karta (${rank})`;
            const framing = {
                'part-of-self': [
                    `${as} sa tu číta ako časť teba.`,
                    `Dvorná karta (${rank}) tu znamená skôr vlastnosť v tebe než niekoho iného.`,
                    `Dvorná karta (${rank}) tu stojí za niečím v tebe, nie za iným človekom.`,
                ],
                'way-of-acting': [
                    `${as} sa tu číta ako spôsob konania, nie ako osoba.`,
                    `Dvorná karta (${rank}) tu znamená skôr spôsob konania než konkrétneho človeka.`,
                    `Dvorná karta (${rank}) hovorí o tom, ako sa koná, nie o tom, kto koná.`,
                ],
                'person-or-role': [
                    `${as} môže zastupovať osobu, rolu alebo spôsob, akým niekto koná - karty nevedia povedať, ktorý z nich.`,
                    `Dvorná karta (${rank}) môže byť osoba, rola alebo spôsob správania; karty nehovoria, ktorá z nich.`,
                    `Či je dvorná karta (${rank}) niekto, rola alebo len spôsob správania, karty nechávajú otvorené.`,
                ],
            };
            return framing[clause.framing][clause.v % 3];
        }
        case 'relation':
            return pairText(clause.edge, c, clause.v);
        case 'arc':
            return variantOf(seed, 20, 2) === 0
                ? `Na začiatku je ${c.stake(clause.first)}, na konci ${c.stake(clause.last)}: ${ARC_LINE[clause.arc]}.`
                : `Karty sa pohybujú od začiatku (${c.stake(clause.first)}) ku koncu (${c.stake(clause.last)}) - ${ARC_LINE[clause.arc]}.`;
        case 'arc-ask':
            return ARC_ASK[clause.arc];
        case 'flow':
            return FLOW[`${clause.kind}:${clause.value}`] ?? '';
        case 'hinge': {
            const leads = HINGE_LEAD[clause.edge.salience];
            const said = pairText(clause.edge, c, clause.v);
            return said === '' ? '' : `${leads[clause.v % leads.length]} ${lowerFirst(said)}`;
        }
        case 'turn':
            return variantOf(seed, 21, 2) === 0
                ? `Obrat prichádza tam, kde sa stretávajú karty: ${c.name(clause.edge.from)} a ${c.name(clause.edge.to)}.`
                : `Zlom nastáva na styku dvoch kariet: ${c.name(clause.edge.from)} a ${c.name(clause.edge.to)}.`;
        case 'tension': {
            const [a, b] = [c.name(clause.edge.from), c.name(clause.edge.to)];
            if (clause.dimensions.length > 0 && clause.v === 1)
                return `${a} a ${b} sa líšia v tomto: ${dims(clause.dimensions)}. Ten rozdiel je súčasťou toho, čo rozloženie hovorí.`;
            return `${a} a ${b} smerujú opačne a ten rozpor je súčasťou odpovede, nie niečo, čo treba vyhladiť.`;
        }
        case 'agree':
            return `${c.name(clause.edge.from)} a ${c.name(clause.edge.to)} sa zhodujú v tomto: ${dims(clause.dimensions)}, a preto je to najpevnejšia niť čítania.`;
        case 'theme-suit': {
            const domain = SUIT_DOMAIN[clause.suit][clause.group];
            return clause.count >= clause.total
                ? `Všetky karty patria jednej farbe - ${SUIT_PLURAL[clause.suit]} - takže ide celou cestou o toto: ${domain}.`
                : `${{ 1: 'Jedna', 2: 'Dve', 3: 'Tri', 4: 'Štyri', 5: 'Päť' }[clause.count] ?? clause.count} z ${clause.total === 3 ? 'troch' : clause.total} kariet ${clause.count === 1 ? 'je' : 'sú'} ${SUIT_PLURAL[clause.suit]}; značná časť toho sa týka tohto: ${domain}.`;
        }
        case 'theme-movement':
            return THEME_MOVEMENT[clause.family];
        case 'major-density':
            if (clause.density === 'all')
                return 'Všetky karty sú Veľké arkány, čo tradícia číta ako rámec širší než jedna situácia - menej o detailoch a viac o tom, k čomu patria.';
            if (clause.density === 'most')
                return `Veľké arkány tvoria väčšinu kariet (${clause.majors} z ${clause.total}), takže čítanie siaha ďalej než k detailom každodenných vecí.`;
            return 'Nie je tu žiadny Veľký arkán, čo drží čítanie na úrovni každodenných okolností, nie väčších tém.';
        case 'absent-suits':
            return `Nič tu nepochádza z ${plain(clause.suits.map((suit) => SUIT_GENITIVE[suit]))}, a tak mimo obrazu zostáva: ${plain(clause.suits.map((suit) => SUIT_AREA[suit]))}.`;
        case 'rank-repeat':
            return `Niektoré karty majú rovnakú hodnosť (${RANK_NAME[clause.rank]}): ${plain(clause.indexes.map((index) => c.name(index)))}. To zdôrazňuje: ${RANK_THEME[clause.rank]}.`;
        case 'number-run':
            return clause.direction === 'ascending'
                ? `Čísla naprieč kartami stúpajú: ${plain(clause.indexes.map((index) => c.name(index)))} - číta sa to ako niečo, čo sa ešte buduje.`
                : `Čísla naprieč kartami klesajú: ${plain(clause.indexes.map((index) => c.name(index)))} - číta sa to ako niečo, čo doznieva alebo sa zužuje na podstatu.`;
        case 'court-level':
            return clause.level === 'all'
                ? 'Každá karta je dvorná karta, takže je to čítanie o postojoch a spôsoboch konania, nie o udalostiach.'
                : 'Objavuje sa viac dvorných kariet, takže čítanie je viac o postojoch a spôsoboch konania než o udalostiach.';
        case 'element':
            return elementLine(clause.kind, clause.elements);
        case 'echo':
            return 'Jeden motív prechádza viacerými kartami, a preto sa karty čítajú ako jedno čítanie, nie ako samostatné poznámky.';
        case 'alignment':
            return `Karty ${c.name(clause.self)} a ${c.name(clause.other)} sa čítajú najprv proti sebe, lebo obe strany sú jadrom otázky.`;
        case 'meeting-acts':
            return clause.edges.map((edge) => pairText(edge, c, 0)).filter((text) => text.length > 0).join(' ');
        case 'tradeoff': {
            const [a, b] = [cardRef(c, clause.first), cardRef(c, clause.second)];
            if (clause.dimension === 'steadiness')
                return `Pevnejšie z tých dvoch stojí ${a}, menej ustálene ${b}.`;
            if (clause.dimension === 'force')
                return `Väčšiu silu nesie ${a}.`;
            /* "Pushes outward" and "looks inward" name no human thing, and the two cards' own phrases are said where they sit: nothing is said (as in English). */
            return '';
        }
        case 'alike':
            return `Sú si podobné v tomto: ${dims(clause.dimensions)}, a rozdiel medzi nimi leží inde.`;
        case 'neutrality':
            return clause.kind === 'options'
                ? 'Karty medzi tými dvoma nevyberajú.'
                : `Toto je vyváženie tak, ako veci stoja, nie predpoveď: ${c.name(clause.criterion)} pomenúva, na čom to stojí.`;
        case 'layers': {
            if (clause.even)
                return 'Všetky tri vrstvy sú na podobnej úrovni, takže obraz je skôr vyrovnaný než jednostranný.';
            const steady = `Najpevnejšia pôda: ${c.labels[clause.steadiest].toLowerCase()}`;
            return clause.strained !== null && clause.strained !== clause.steadiest
                ? `${steady}; vrstva, ktorá si žiada najviac starostlivosti: ${c.labels[clause.strained].toLowerCase()}.`
                : `${steady}.`;
        }
        case 'cost':
            return clause.phrase
                ? `Na čo si dať pozor - ${c.name(clause.i)}: v prehnanej podobe ${c.phrases(clause.i).difficult}.`
                : `Napätie tohto čítania sídli najmä v karte „${c.name(clause.i)}“ v jej prehnanej podobe.`;
        case 'insight':
            return insight(clause, c);
        case 'card-question':
            return c.question(clause.i);
        case 'practical':
            return `${upperFirst(cardRef(c, clause.i))} žiada jedno: ${c.phrases(clause.i).asks}.`;
        case 'direction-caveat':
            return 'Smer čítaj ako tendenciu: môže sa zmeniť, keď sa zmení súčasná dynamika.';
        case 'reflect':
            return REFLECT[clause.role];
        default:
            return '';
    }
}
export const QUESTION_VOICE_SK = {
    locale: 'sk',
    sectionTitles: { framing: 'Tvoja otázka', synthesis: 'Ako do seba karty zapadajú', takeaway: 'Čo si z toho vziať' },
    render,
    preDraw: (input) => {
        const places = input.positions.map((position, index) => `${index + 1}. ${position.label} - ${position.description}`).join('\n');
        const opening = input.excerpt ? `Otázka znie: „${input.excerpt}“${stop(input.excerpt)}` : 'Všetko tu vychádza z tvojej otázky.';
        const why = WHY[input.spreadId] ?? WHY['body-mind-spirit'];
        const extra = input.yesNo && input.spreadId !== 'support-resistance-key' && input.spreadId !== 'option-a-b-guidance' && input.spreadId !== 'steadying-reflection'
            ? ' Karty neodpovedajú áno alebo nie, preto sa čítanie pozerá na to, čo sa okolo tej otázky deje.' : '';
        return `${opening} ${why}${extra}\n\nMiesta:\n${places}\n\nKarty môžeš potiahnuť, kedykoľvek budeš chcieť.`;
    },
};
