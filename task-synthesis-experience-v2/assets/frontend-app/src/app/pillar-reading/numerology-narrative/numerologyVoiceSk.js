import { TEMPERAMENT } from '../../knowledge/numerology/numberTemperament.js?v=53c0693';
import { capitalise, chainText, joinList, readableTrace } from './numerologyVoice.js?v=53c0693';
const STEM = {
    1: 'jednot', 2: 'dvoj', 3: 'troj', 4: 'štvor', 5: 'päť', 6: 'šest', 7: 'sedmič', 8: 'osmič',
    9: 'deviat', 11: 'jedenást', 22: 'dvadsaťdvoj', 33: 'tridsaťtroj',
};
const END = { nom: 'ka', gen: 'ky', dat: 'ke', acc: 'ku', loc: 'ke', ins: 'kou' };
/** The number as a Slovak noun in a case: sedmička, sedmičky, sedmičkou. */
const num = (value, form = 'nom') => (STEM[value] ? `${STEM[value]}${END[form]}` : String(value));
const Num = (value, form = 'nom') => capitalise(num(value, form));
const POS = {
    'life-path': { title: 'Životná cesta', nom: 'tvoja životná cesta', gen: 'tvojej životnej cesty', dat: 'tvojej životnej ceste', loc: 'v tvojej životnej ceste' },
    birthday: { title: 'Deň narodenia', nom: 'tvoj deň narodenia', gen: 'tvojho dňa narodenia', dat: 'tvojmu dňu narodenia', loc: 'v tvojom dni narodenia' },
    'soul-urge': { title: 'Túžba duše', nom: 'tvoja túžba duše', gen: 'tvojej túžby duše', dat: 'tvojej túžbe duše', loc: 'v tvojej túžbe duše' },
    expression: { title: 'Vyjadrenie', nom: 'tvoje vyjadrenie', gen: 'tvojho vyjadrenia', dat: 'tvojmu vyjadreniu', loc: 'v tvojom vyjadrení' },
    personality: { title: 'Osobnosť', nom: 'tvoja osobnosť', gen: 'tvojej osobnosti', dat: 'tvojej osobnosti', loc: 'v tvojej osobnosti' },
    maturity: { title: 'Zrelosť', nom: 'tvoja zrelosť', gen: 'tvojej zrelosti', dat: 'tvojej zrelosti', loc: 'v tvojej zrelosti' },
    attitude: { title: 'Postoj', nom: 'tvoj postoj', gen: 'tvojho postoja', dat: 'tvojmu postoju', loc: 'v tvojom postoji' },
    balance: { title: 'Rovnováha', nom: 'tvoja rovnováha', gen: 'tvojej rovnováhy', dat: 'tvojej rovnováhe', loc: 'v tvojej rovnováhe' },
    'hidden-passion': {
        title: 'Skrytá vášeň',
        nom: 'najčastejšia hodnota v tvojom mene',
        gen: 'najčastejšej hodnoty v tvojom mene',
        dat: 'najčastejšej hodnote v tvojom mene',
        loc: 'v najčastejšej hodnote tvojho mena',
    },
};
const list = (items) => joinList(items, ' a ');
const locList = (positions) => list(positions.map((position) => POS[position].loc));
/* ================================================================== numbers */
/** What the root carries, for the master sentences: „naladenie dvojky na iných ľudí“. */
const ROOT_BRIEF = {
    2: 'naladenie dvojky na iných ľudí',
    4: 'trpezlivé budovanie štvorky',
    6: 'starostlivosť šestky o ľudí okolo',
};
/* As in the English voice: an opener says what the number orients you toward,
   notices or asks of you - never what your life hands you. */
const LIFE_PATH = {
    1: 'Tvojím inštinktom je rozhodnúť podľa seba, ešte pred dohodou, a výsledok uniesť. Životná cesta 1 znamená dôverovať vlastnému úsudku natoľko, že podľa neho aj konáš.',
    2: 'Tvoja pozornosť smeruje k tomu, čo sa deje medzi ľuďmi — k partnerstvu, k vyjednávaniu, k tímu, ktorý treba držať pokope. Životná cesta 2 znamená čítať, čo sa medzi ľuďmi deje, a zariadiť, aby to fungovalo, a to bez toho, aby ťa to stálo vlastnú pozíciu.',
    3: 'To, čo vidíš, chce byť vyslovené. Životná cesta 3 znamená dávať tomu podobu, ktorú iní dokážu prijať — slová, obrazy, príbeh, vtip, ktorý zaberie — a zvládnuť aj tú menej prirodzenú polovicu: dokončiť, čo začneš.',
    4: 'Ťahá ťa to k tej časti práce, ktorá musí vydržať: k základu, k postupu, k veci, ktorá funguje, aj keď sa nikto nepozerá. Životná cesta 4 znamená stavať trpezlivo, v poradí, ktoré si práca naozaj žiada.',
    5: 'Najlepšie sa učíš v pohybe — cez nové miesta, nových ľudí a problémy, do ktorých radšej rovno vstúpiš, namiesto štúdia vopred. Životná cesta 5 žiada slobodu a úsudok, ktoré záväzky v nej stojí za to udržať.',
    6: 'Zodpovednosť za ľudí a miesta okolo seba preberáš rýchlo. Životná cesta 6 znamená robiť to dobre — a naučiť sa, kde tvoja zodpovednosť končí, nielen kde začína.',
    7: 'Priepasť medzi tým, čo sa tvrdí, a tým, čo je pravda, ťa stále priťahuje späť. Životná cesta 7 znamená zostať pri otázke, kým nevieš, ako vec naozaj funguje — a potom vyjsť von a povedať, čo sa ukázalo.',
    8: 'Tvoja pozornosť smeruje k dôsledkom: k zdrojom, ktoré treba zorganizovať, k rozhodnutiam, ktoré majú váhu, k výsledkom, ktoré sa dajú merať. Životná cesta 8 znamená zvládať veľké veci bez toho, aby rozhodovali o tom, kým si.',
    9: 'Situácie zvykneš vidieť celé a tvoja pozornosť sa stále rozširuje — k ľuďom za hranicou tvojho kruhu a k citu pre to, kedy sa niečo naplnilo. Životná cesta 9 znamená dávať niečomu väčšiemu, než je tvoj vlastný záujem, a vzdať sa vlastného nároku.',
    11: 'Často tušíš, kam sa niečo uberá, skôr, než dokážeš ukázať prečo. Životná cesta 11 znamená dôverovať tomuto vnímaniu a popritom preň budovať dôkazy.',
    22: 'Priťahuje ťa to, čo je väčšie než osobný život: štruktúry, inštitúcie, práca postavená na to, aby ju ďalej používali iní. Životná cesta 22 znamená stavať v takom rozsahu — a to sa dá vždy len po jednom obyčajnom dni.',
    33: 'Tvoj pocit zodpovednosti zvykne siahať za hranicu tvojho kruhu. Životná cesta 33 znamená pestovať starostlivosť sústavne, ďaleko za hranicou tých, ktorým je dlžná — a vedieť, kde musí prestať.',
};
const GIFT = {
    1: 'pripravenosť konať podľa vlastných záverov',
    2: 'jemný cit pre to, čo potrebujú iní',
    3: 'dar vyjadriť veci slovami',
    4: 'praktický zmysel a cit pre to, ako majú byť veci usporiadané',
    5: 'schopnosť rýchlo sa zorientovať v neznámych situáciách',
    6: 'inštinkt starať sa o ľudí',
    7: 'premýšľavá, skúmavá povaha',
    8: 'praktický úsudok o zdrojoch a ľuďoch',
    9: 'široký, ľudský rozhľad',
    11: 'rýchla intuícia pre ľudí a situácie',
    22: 'schopnosť vidieť, ako by sa veľká vec naozaj postavila',
};
const SOUL_URGE = {
    1: 'Uspokojí ťa rozhodnutie, ktoré je tvoje: tvoja túžba duše je 1. Chvíľa, keď môžeš konať podľa vlastného úsudku bez čakania na povolenie, je chvíľa, keď sa cítiš najviac sebou.',
    2: 'Uspokojí ťa spojenie, ktoré funguje — tvoja túžba duše je 2. Partnerstvo alebo tím, v ktorom je naozaj počuť každú stranu, je miesto, kde sa zvykneš cítiť pokojne.',
    3: 'Živí ťa vyjadrenie, ktoré zasiahne — to opisuje túžba duše 3: povedať alebo vytvoriť niečo a vidieť, že to k niekomu dorazí. Rozhovor, radosť a dobrá odozva pre teba nie sú bonus, ale podstata.',
    4: 'Uspokojí ťa poriadok, ktorý drží — tvoja túžba duše je 4. Poriadne urobená práca, plán, ktorý funguje, a veci, na ktoré sa dá spoľahnúť, ti dovolia oddýchnuť si, a skôr si zvyčajne neoddýchneš.',
    5: 'Uspokojí ťa priestor na pohyb: tvoja túžba duše je 5. Nové skúsenosti, rozmanitosť a sloboda zmeniť smer sú tam, kde sa zvykneš cítiť najviac nažive.',
    6: 'Uspokojí ťa, keď môžeš pomôcť — tvoja túžba duše je 6. Keď sú ľudia, na ktorých ti záleží, v poriadku, čiastočne aj vďaka tebe, môžeš si oddýchnuť.',
    7: 'Uspokojí ťa porozumenie: tvoja túžba duše je 7. Čas a ticho dostať sa veci na dno a otázka zodpovedaná poriadne, nie približne, sú odmenou samy osebe.',
    8: 'Uspokojí ťa dôsledok — tvoja túžba duše je 8. Výsledky, ktoré sa rátajú, a stávky dosť skutočné na to, aby na nich záležalo, sú tam, kde sa zvykneš cítiť najviac nažive.',
    9: 'Živí ťa zmysel, ktorý presahuje tvoj vlastný záujem — to opisuje túžba duše 9: práca alebo starostlivosť, ktorá slúži viac než len tebe. To, čo robíš, má cenu, keď to siaha za tvoj vlastný kruh.',
    11: 'Uspokojí ťa vhľad: tvoja túžba duše je 11. Ide ti o chvíľu, keď sa to, čo tušíš, ukáže ako pravda, a nájdeš spôsob, ako to podať tak, aby to iní mohli použiť.',
    22: 'Uspokojí ťa budovať niečo, čo ťa prežije — tvoja túžba duše je 22: štruktúru, ktorú budú iní používať ešte dlho po skončení práce.',
    33: 'Uspokojí ťa starostlivosť ako prax, nielen v núdzi: tvoja túžba duše je 33 a jej odmenou je sústavná užitočnosť pre ľudí, na ktorých dosiahneš.',
};
const SOUL_URGE_SHORT = {
    1: 'rozhodnutie, ktoré je tvoje', 2: 'spojenie, ktoré funguje', 3: 'vyjadrenie, ktoré zasiahne',
    4: 'poriadok, ktorý drží', 5: 'priestor na pohyb', 6: 'možnosť pomôcť',
    7: 'porozumenie a čas i ticho, ktoré k nemu vedú', 8: 'dôsledok, teda výsledky, ktoré sa rátajú',
    9: 'zmysel, ktorý presahuje tvoj vlastný záujem', 11: 'vhľad, o ktorý sa dá podeliť', 22: 'budovanie toho, čo ťa prežije',
    33: 'starostlivosť ako prax',
};
/* „Výbava“ is the English "equipment" in Slovak clothes (SLOVAK_STYLE.md): the
   Expression is read as what you are able to do - „schopnosti“. */
const EXPRESSION = {
    1: 'Tvoje vyjadrenie je 1: schopnosť rozhodnúť sa aj s neúplnými informáciami, začať ešte pred dohodou a uniesť výsledok.',
    2: 'Tvoje vyjadrenie je 2 a tvoje schopnosti smerujú k spolupráci: takt, trpezlivosť a oko pre detail, ktorý ľudí udrží pri spoločnej práci.',
    3: 'Tvoje vyjadrenie je 3. Tvojou silnou stránkou je komunikácia — nájsť takú podobu veci, ktorú iní dokážu prijať.',
    4: 'Tvoje vyjadrenie je 4 a tvoje schopnosti patria metóde: plánovanie, organizovanie a dotiahnutie práce do konca.',
    5: 'Tvoje vyjadrenie je 5, schopnosť prispôsobiť sa: rýchlo sa učiť, zvládať zmenu a pracovať s ľuďmi každého druhu.',
    6: 'Tvoje vyjadrenie je 6, schopnosť starať sa: všimnúť si, čo človek alebo skupina potrebuje, a zariadiť situáciu tak, aby im slúžila.',
    7: 'Tvoje vyjadrenie je 7. Tvojou silnou stránkou je analýza — ísť pod prvú odpoveď a zostať pri probléme, kým nepovolí.',
    8: 'Tvoje vyjadrenie je 8, schopnosť organizovať a viesť: narábať so zdrojmi, rozsahom a dôsledkami.',
    9: 'Tvoje vyjadrenie je 9, schopnosť nadhľadu: vidieť situáciu celú a pracovať pre niečo širšie, než je tvoj vlastný záujem.',
    11: 'Tvoje vyjadrenie je 11. Tvojou silnou stránkou je zachytiť to, čo nezaznelo, a dať tomu podobu, ktorú môžu použiť iní.',
    22: 'Tvoje vyjadrenie je 22, schopnosť budovať vo veľkom: udržať veľký návrh spolu s praktickými krokmi, ktoré ho dotiahnu.',
    33: 'Tvoje vyjadrenie je 33. Tvojou silnou stránkou je stáť pri ľuďoch sústavne, ako prax, nielen v kríze.',
};
/** After „tvoje schopnosti smerujú k ...“: dative. */
const EXPRESSION_SHORT = {
    1: 'rozhodovaniu a neseniu rozhodnutí', 2: 'spolupráci a taktu', 3: 'komunikácii',
    4: 'metóde a dotiahnutiu práce', 5: 'prispôsobeniu', 6: 'starostlivosti, ktorá situáciu rozbehne',
    7: 'analýze', 8: 'organizácii a vedeniu', 9: 'nadhľadu',
    11: 'zachyteniu toho, čo nezaznelo', 22: 'budovaniu vo veľkom', 33: 'sústavnej pomoci ľuďom',
};
const EXPRESSION_TAIL = {
    'life-path': ', takže tvoj smer a tvoje schopnosti majú jednu tému',
    'soul-urge': ', a robiť to ťa zároveň uspokojuje',
    birthday: ', dar tvojho dňa narodenia, teraz ako hlavná schopnosť',
};
/* The Personality: what tends to show first - the quality of the surface,
   never how particular people react to it. */
const PERSONALITY = {
    1: 'Navonok sa zvykne najprv ukázať priamosť a sebaistota — dojem, že rozhodnutie už padlo. To je osobnosť 1.',
    2: 'Navonok sa zvykne najprv ukázať prístupnosť a takt — dojem, že najprv počúvaš a až potom hovoríš. To je osobnosť 2.',
    3: 'Tvoja osobnosť je 3 a zvykne pôsobiť živo a ľahko v rozhovore.',
    4: 'Tvoja osobnosť je 4 a zvykne pôsobiť stálo a spoľahlivo — dojmom, že splníš, čo povieš.',
    5: 'Navonok sa zvykne najprv ukázať rýchlosť a zvedavosť, pohyb, ktorý prinášaš do miestnosti. To je osobnosť 5.',
    6: 'Navonok sa zvykne najprv ukázať vrelosť a ochota prevziať zodpovednosť. To je osobnosť 6.',
    7: 'Navonok sa zvykne najprv ukázať zdržanlivosť a pozornosť — dojem, že najprv pozoruješ a až potom hovoríš. To je osobnosť 7.',
    8: 'Tvoja osobnosť je 8 a zvykne pôsobiť schopne a pokojne — dojmom, že to zvládneš.',
    9: 'Navonok sa zvykne najprv ukázať otvorenosť a veľkorysý rozhľad, dojem, že vnímaš všetkých. To je osobnosť 9.',
    11: 'Navonok sa zvykne najprv ukázať blízka pozornosť: dojem, že naozaj počúvaš a všímaš si viac, než sa hovorí. To je osobnosť 11. Tá pozornosť má skutočnú intenzitu a tá intenzita je prejavom čísla, nie chybou povrchu.',
    22: 'Navonok sa zvykne najprv ukázať ukotvenosť a cieľavedomosť, dojem, že niečo buduješ. To je osobnosť 22.',
    33: 'Navonok sa zvykne najprv ukázať vrelosť s dlhým dosahom. To je osobnosť 33.',
};
const PERSONALITY_SHORT = {
    1: 'priamosť a sebaistota', 2: 'prístupnosť a takt', 3: 'živosť a ľahkosť', 4: 'stálosť a spoľahlivosť',
    5: 'rýchlosť a zvedavosť', 6: 'vrelosť a zodpovednosť', 7: 'zdržanlivosť a pozornosť',
    8: 'schopnosť a pokoj', 9: 'otvorenosť a dojem, že vnímaš všetkých', 11: 'blízka pozornosť',
    22: 'ukotvenosť a cieľavedomosť', 33: 'vrelosť s dlhým dosahom',
};
/** What shows first in a Personality; nominative, „pozornosť jedenástky je prvá vrstva“. */
const PERSONALITY_DRAW = {
    1: 'sebaistota', 2: 'takt', 3: 'ľahkosť', 4: 'spoľahlivosť', 5: 'zvedavosť', 6: 'vrelosť',
    7: 'zdržanlivosť', 8: 'pokoj', 9: 'otvorenosť', 11: 'pozornosť', 22: 'cieľavedomosť', 33: 'vrelosť',
};
/** What an Expression does once the work starts; the number is the subject, and no verb is reflexive (a clitic „sa“ would land out of place). */
const EXPRESSION_DOES = {
    1: 'rozhodne', 2: 'udrží ľudí pri spoločnej práci', 3: 'nájde slová',
    4: 'postaví postup', 5: 'prispôsobí postup tomu, čo miestnosť naozaj potrebuje',
    6: 'zariadi situáciu tak, aby slúžila ľuďom v nej', 7: 'zistí, ako vec naozaj funguje',
    8: 'prevezme zodpovednosť za výsledok', 9: 'udrží celok na očiach', 11: 'pomenuje to, čo nikto nepovedal',
    22: 'premení nápad na stavbu', 33: 'ďalej stojí pri ľuďoch v nej',
};
/** When a Soul Urge under a different surface tends to come forward. */
const SOUL_URGE_WHEN = {
    1: 'keď je rozhodnutie na tebe',
    2: 'keď treba niečo medzi ľuďmi udržať pokope',
    3: 'len čo je čo povedať',
    4: 'keď ide o úroveň práce',
    5: 'len čo veci začnú príliš tuhnúť',
    6: 'keď niekto nablízku potrebuje pomoc',
    7: 'keď ťa nejaká otázka nepustí',
    8: 'len čo je v hre niečo skutočné',
    9: 'keď práca presiahne tvoj vlastný kruh',
    11: 'keď sa potvrdí niečo, čo vycítiš vopred',
    22: 'keď je čo postaviť natrvalo',
    33: 'keď niekto na dosah potrebuje sústavnú starostlivosť',
};
/** The position a shared chapter number is read through, as in the English voice. */
const SHARE_ORDER = ['life-path', 'soul-urge', 'expression', 'personality', 'birthday', 'maturity'];
const leadShare = (positions) => [...positions].sort((a, b) => SHARE_ORDER.indexOf(a) - SHARE_ORDER.indexOf(b))[0];
const PINNACLE_SHARE = {
    'life-path': 'tieto roky idú smerom, ktorý už určuje tvoja životná cesta',
    'soul-urge': 'tieto roky živia to, čo ťa už teraz uspokojuje',
    expression: 'tieto roky využívajú to, na čo už máš schopnosti',
    personality: 'tieto roky zosilňujú to, čo sa už teraz ukazuje ako prvé',
    birthday: 'tieto roky čerpajú z daru tvojho dňa narodenia',
    maturity: 'tieto roky dávajú skorú ochutnávku toho, kam tvoje čísla smerujú neskôr',
};
const CHALLENGE_SHARE = {
    'life-path': 'tlak dopadá na tvoj vlastný smer',
    'soul-urge': 'tlak dopadá na to, čo chceš najviac',
    expression: 'tlak dopadá na to, čo vieš najlepšie',
    personality: 'tlak dopadá na tú tvoju stránku, ktorá sa ukáže ako prvá',
    birthday: 'tlak dopadá na dar tvojho dňa narodenia',
    maturity: 'tlak dopadá na smer tvojich neskorších rokov',
};
const MATURITY_TOLD = {
    'life-path': 'neskorší život prehĺbi smer, ktorý už máš, namiesto toho, aby pridal nový',
    'soul-urge': 'neskorší život prehĺbi motív, ktorý už máš, namiesto toho, aby pridal nový',
    expression: 'neskorší život prehĺbi schopnosť, ktorú už používaš, namiesto toho, aby pridal novú',
    personality: 'neskorší život prehĺbi tú tvoju stránku, ktorá sa ukáže ako prvá, namiesto toho, aby pridal novú',
    birthday: 'neskorší život prehĺbi dar tvojho dňa narodenia, namiesto toho, aby pridal nový',
};
const PERSONALITY_TAIL = {
    'life-path': ', takže smer je vidieť skôr než čokoľvek iné',
    'soul-urge': ', takže ukazuješ to, čo chceš',
    expression: ', takže povrch zodpovedá tomu, čo vieš',
};
/** What a number does without being decided on, for the chart's heaviest number. */
const BY_DEFAULT = {
    1: 'vykročiť skôr než ostatní, či už ťa niekto nasleduje, alebo nie', 2: 'naladiť sa na ľudí okolo seba',
    3: 'dávať slová tomu, čo si všimneš', 4: 'usporiadať všetko, čo máš pred sebou',
    5: 'hľadať ďalšiu príležitosť', 6: 'postarať sa o toho, kto je nablízku',
    7: 'overovať to, čo ostatní prijali', 8: 'prevziať velenie nad tým, na čom záleží',
    9: 'odstúpiť a vidieť celý obraz',
};
/** What each number wants; the subject is the number, so the agreement is feminine. */
const STANCE = {
    1: 'chce konať ako prvá', 2: 'chce súhlas, kým sa pohne', 3: 'chce to povedať a vidieť, že to zasiahne',
    4: 'chce metódu a dokončenú prácu', 5: 'chce priestor zmeniť smer', 6: 'chce, aby boli všetci postaraní',
    7: 'chce pochopiť, skôr než koná', 8: 'chce výsledky, ktoré sa rátajú', 9: 'chce celý obraz',
    11: 'vycíti skôr, než dokáže vysvetliť', 22: 'chce stavať za hranicou osobného', 33: 'chce sa postarať o každého na dosah',
};
/** What each number brings to the others: [accusative, genitive]. */
const CONTRIBUTION = {
    1: ['hybnosť', 'hybnosti'], 2: ['takt', 'taktu'], 3: ['dosah', 'dosahu'], 4: ['trvácnosť', 'trvácnosti'],
    5: ['pružnosť', 'pružnosti'], 6: ['starostlivosť', 'starostlivosti'], 7: ['presnosť', 'presnosti'],
    8: ['váhu', 'váhy'], 9: ['nadhľad', 'nadhľadu'], 11: ['predvídavosť', 'predvídavosti'],
    22: ['rozsah', 'rozsahu'], 33: ['veľkorysosť', 'veľkorysosti'],
};
/** Overuse; the subject is the number. */
const OVERUSE = {
    1: 'nesie všetko sama a rady počuje ako zasahovanie',
    2: 'drží pokoj na úkor tvojej vlastnej pozície',
    3: 'sa rozdrobí do mnohých začatých a málo dokončených vecí a povie menej, než myslí',
    4: 'sa drží metódy aj potom, čo prestala pomáhať',
    5: 'odíde skôr, než čokoľvek stihne zapustiť korene',
    6: 'si naloží viac, než je tvoje, a potom to v tebe hlodá',
    7: 'obráti svoju prísnosť proti tebe a stiahne sa tam, kde bol treba kontakt',
    8: 'ťa meria iba výsledkami',
    9: 'sa rozprestrie tak široko, že najbližší ľudia dostanú najmenej z teba',
    11: 'ide na nervy a prijíma viac, než stihne spracovať',
    22: 'naberie rozsah, ktorý nenechá miesto obyčajnému dňu',
    33: 'dáva aj za hranicou únavy a volá to normálnym stavom',
};
const ABSENT = {
    1: 'presadenie sa', 2: 'trpezlivosť s tempom iných', 3: 'vyslovenie toho, čo cítiš',
    4: 'poriadok a rutina', 5: 'prispôsobenie sa zmene', 6: 'prevzatie zodpovednosti za iných',
    7: 'čas osamote na premýšľanie', 8: 'narábanie s peniazmi a autoritou', 9: 'tolerancia a širší pohľad',
};
const BALANCE = {
    1: 'zvládnuť to osamote, čo pomáha, keď situácia potrebuje jedno jasné rozhodnutie, a nie, keď potrebuje podporu',
    2: 'prebrať to s niekým, komu dôveruješ',
    3: 'odľahčiť náladu, čo uvoľní napätie, ale nie vždy ho vyrieši',
    4: 'plán a zoznam',
    5: 'zmena prostredia',
    6: 'postarať sa o niekoho iného',
    7: 'stiahnuť sa a premyslieť to',
    8: 'prevziať velenie',
    9: 'odstúpiť a vidieť celok',
};
const MATURITY = {
    1: 'stáť na vlastnom úsudku', 2: 'spolupráca a jemnejší cit pre iných',
    3: 'vyjadrenie — povedať viac z toho, čo vidíš', 4: 'budovanie niečoho trvalého',
    5: 'sloboda a záber, širší život s viac pohybom', 6: 'zodpovednosť a starostlivosť z vlastnej voľby',
    7: 'hĺbka — štúdium, premýšľanie a vnútorný život', 8: 'autorita a výsledky vo väčšom rozsahu',
    9: 'šírka — práca a starostlivosť pre niečo väčšie než tvoj vlastný záujem',
    11: 'vhľad — vnímanie, ktorému dôveruješ a o ktoré sa delíš', 22: 'budovanie vo veľkom', 33: 'starostlivosť ako prax',
};
/** After „tieto roky sa točia okolo“: genitive. */
const PINNACLE = {
    1: 'nezávislosti a začiatkov', 2: 'partnerstva, trpezlivosti a spolupráce',
    3: 'vyjadrenia, tvorivosti a priateľstva', 4: 'práce, štruktúry a základov',
    5: 'zmeny, pohybu a slobody', 6: 'zodpovednosti, domova a starostlivosti',
    7: 'štúdia, premýšľania a vnútorného rastu', 8: 'úspechu, autority a hmotných výsledkov',
    9: 'zavŕšenia, širšej služby a púšťania',
    11: 'vhľadu a inšpirácie a nervovej záťaže, ktorá k nim patrí',
    22: 'budovania vo veľkom', 33: 'starostlivosti a služby za hranicou vlastného kruhu',
};
const CHALLENGE = {
    1: 'stáť za vlastnou pozíciou bez zmenšovania sa aj bez prehnanej kompenzácie',
    2: 'pracovať s tempom a odlišnosťou iných a nestratiť pritom vlastný úsudok',
    3: 'povedať, čo myslíš, aj keď ťa pritom vidia',
    4: 'robiť prácu v poradí, v akom sa musí urobiť',
    5: 'zvoliť si, k čomu sa chceš viazať',
    6: 'rozhodnúť, čo za iných ponesieš a čo nie',
    7: 'konať s neúplnými informáciami a dôverovať aj tam, kde sa nedá nič dokázať',
    8: 'narábať s peniazmi, autoritou a výsledkami bez toho, aby ťa definovali',
};
const DEBT_TRADITION = {
    13: 'Tradícia spája 13 s kedysi obchádzanou námahou, ktorá sa spláca trpezlivou, vytrvalou prácou.',
    14: 'Tradícia spája 14 s kedysi zneužitou slobodou, ktorá sa spláca mierou a záväzkom.',
    16: 'Tradícia spája 16 so stavbou postavenou na pýche alebo na lichotivom obraze, ktorú treba znovu postaviť na tom, čo je naozaj pravda.',
    19: 'Tradícia spája 19 s nezávislosťou, ktorá stvrdla na sebestačnosť, a dlh sa spláca tým, že sa človek učí pomoc prijímať, nielen dávať.',
};
const DEBT_TENDENCY = {
    13: 'ukazuje na dokončovanie toho, čo začneš, vrátane jeho nezáživného stredu.',
    14: 'ukazuje na kotvu podľa vlastnej voľby, aby zmena zostala voľbou, a nie nutkaním.',
    16: 'ukazuje na jednu otázku, ktorú sa oplatí si z času na čas položiť: stojí to, čo staviaš, na tom, čo je pravda, alebo na neoverenom príbehu o sebe?',
    19: 'ukazuje na to, pustiť k sebe pomoc a nebrať ju ako stratu nezávislosti.',
};
const RELATION_WORD = {
    same: 'to isté číslo',
    reinforcing: 'rôzne čísla, ktoré tlačia rovnakým smerom',
    complementary: 'rôzne čísla, ktoré si navzájom dodávajú, čo chýba',
    crosswise: 'čísla, ktoré sa líšia tempom alebo tým, kde pracujú',
};
const ORDINAL_LOC = ['prvej', 'druhej', 'tretej', 'štvrtej'];
const ORDINAL_NOM = ['prvá', 'druhá', 'tretia', 'štvrtá'];
/* ================================================================ sentences */
function masterLine(value, root, position) {
    return `${Num(value)} je majstrovské číslo a ${POS[position].loc} zostáva celá: ${ROOT_BRIEF[root]} vo väčšej mierke. Prináša to väčší záber aj väčšiu záťaž a v obyčajné dni zvyčajne funguje ako obyčajná ${num(root)} — vtedy to číslo odpočíva, nezlyháva.`;
}
function echoPlaces(echo) {
    return list(echo.positions.map((position, index) => {
        const value = echo.values[index];
        return value !== echo.root ? `${POS[position].loc} (ako ${value}, jej majstrovská podoba)` : POS[position].loc;
    }));
}
function echoLine(echo, owner) {
    if (!echo.dominant)
        return `${Num(echo.root)} je aj ${echoPlaces(echo)}.`;
    return `${Num(echo.root)} nie je len ${POS[owner].loc}: je aj ${echoPlaces(echo)}, a preto má medzi tvojimi číslami väčšiu váhu než ktorékoľvek iné. Opisuje to, čo robíš bez rozhodovania — ${BY_DEFAULT[echo.root]} — a to ide ľahko a ťažko sa to vypína.`;
}
function debtLine(debt) {
    return `${capitalise(POS[debt.position].nom)} vzniká cez ${debt.value}, jeden zo štyroch súčtov, ktoré moderná západná tradícia číta ako karmický dlh. ${DEBT_TRADITION[debt.value]} Ak ho čítaš ako sklon, a nie ako verdikt, ${DEBT_TENDENCY[debt.value]}`;
}
function birthdayLine(ref, relation) {
    const gift = GIFT[ref.value] ?? GIFT[ref.root];
    switch (relation) {
        case 'same': return `Tvoj deň narodenia má rovnaké číslo, ${ref.value}, takže smer prichádza aj so zabudovaným darom: ${gift}.`;
        case 'reinforcing': return `Tvoj deň narodenia pridáva ${num(ref.value, 'acc')} — ${gift} — a tlačí rovnakým smerom ako cesta.`;
        case 'complementary': return `Tvoj deň narodenia pridáva ${num(ref.value, 'acc')}: ${gift}, a tým dáva ceste niečo, čo sama nemá.`;
        default: return `Tvoj deň narodenia pridáva ${num(ref.value, 'acc')}: ${gift}. Ťahá iným smerom ako cesta a priestor potrebujú obe.`;
    }
}
/** A group of positions sharing a value, in the case a sentence needs. */
function groupText(group, form) {
    return group.positions.length === 1
        ? `${num(group.value, form)} ${POS[group.positions[0]].gen}`
        : `${num(group.value, form)} ${locList(group.positions)}`;
}
function axisSentence(anchor, sides) {
    const a = anchor.value;
    const slow = TEMPERAMENT[String(a)]?.tempo === 'slow';
    const inward = TEMPERAMENT[String(a)]?.facing === 'inward';
    const axes = [...new Set(sides.map((side) => side.axis))];
    const on = (axis) => sides.filter((side) => side.axis === axis);
    const them = (axis) => list(on(axis).map((side) => num(side.group.value)));
    const plural = (axis) => on(axis).length > 1;
    const pick = (axis, one, many) => (plural(axis) ? many : one);
    const primary = (axis) => {
        if (axis === 'tempo') {
            return slow
                ? `${num(a)} by bola radšej presná než skorá a ${them(axis)} ${pick(axis, 'by bola radšej skorá než dokonalá', 'by boli radšej skoré než dokonalé')}`
                : `${num(a)} by bola radšej skorá než dokonalá a ${them(axis)} ${pick(axis, 'by bola radšej presná než skorá', 'by boli radšej presné než skoré')}`;
        }
        if (axis === 'facing') {
            return inward
                ? `${num(a)} robí svoju prácu mimo dohľadu a ${them(axis)} ${pick(axis, 'chce', 'chcú')}, aby bola práca vidieť`
                : `${num(a)} pracuje tam, kde ju vidieť, a ${them(axis)} ${pick(axis, 'drží', 'držia')} prácu v súkromí`;
        }
        return slow
            ? `${num(a)} pracuje pomaly a mimo dohľadu, ${them(axis)} rýchlo a otvorene`
            : `${num(a)} pracuje rýchlo a otvorene, ${them(axis)} pomaly a mimo dohľadu`;
    };
    const secondary = (axis) => {
        if (axis === 'tempo')
            return slow ? `${them(axis)} sa ${pick(axis, 'hýbe', 'hýbu')} ešte rýchlejšie` : `${them(axis)} sa ${pick(axis, 'hýbe', 'hýbu')} pomalšie`;
        if (axis === 'facing') {
            return inward
                ? `${them(axis)} ${pick(axis, 'chce', 'chcú')} výsledok tam, kde ho ľudia uvidia`
                : `${them(axis)} ${pick(axis, 'drží', 'držia')} výsledok mimo dohľadu`;
        }
        return slow
            ? `${them(axis)} sa ${pick(axis, 'hýbe', 'hýbu')} rýchlejšie a otvorene`
            : `${them(axis)} sa ${pick(axis, 'hýbe', 'hýbu')} pomalšie a mimo dohľadu`;
    };
    const [first, second] = axes;
    return `${capitalise(primary(first))}${second ? `, zatiaľ čo ${secondary(second)}` : ''}.`;
}
function pairCost(anchor, other, axis) {
    const slowFirst = TEMPERAMENT[String(anchor)]?.tempo === 'slow';
    const inwardFirst = TEMPERAMENT[String(anchor)]?.facing === 'inward';
    const [slow, fast] = slowFirst ? [anchor, other] : [other, anchor];
    const [inward, outward] = inwardFirst ? [anchor, other] : [other, anchor];
    if (axis === 'tempo') {
        return `Medzi nimi: čakať, kým si bude ${num(slow)} istá, stojí čas, a ísť za ${num(fast, 'ins')} príliš skoro stojí presnosť.`;
    }
    if (axis === 'facing') {
        return `Medzi nimi môže ${num(inward)} zadržať to, čo potrebuje ${num(outward)} ukázať, a ${num(outward)} môže ukázať to, čo ${num(inward)} ešte nedokončila.`;
    }
    return `Medzi nimi môže ${num(slow)} zadržať to, na čo je ${num(fast)} pripravená konať, a ${num(fast)} môže konať skôr, než ${num(slow)} skončí.`;
}
/* ============================================================ the sections */
export const SK_VOICE = {
    direction: (plan) => {
        const lp = plan.lifePath;
        const first = [LIFE_PATH[lp.value]];
        if (lp.master)
            first.push(masterLine(lp.value, lp.root, 'life-path'));
        const paragraphs = [first.join(' ')];
        const second = [];
        if (plan.birthday) {
            second.push(birthdayLine(plan.birthday.ref, plan.birthday.relation));
            if (plan.birthday.ref.master && !lp.master)
                second.push(masterLine(plan.birthday.ref.value, plan.birthday.ref.root, 'birthday'));
        }
        if (plan.echo) {
            const owner = plan.echo.root === lp.root ? 'life-path' : 'birthday';
            second.push(echoLine(plan.echo, owner));
        }
        if (second.length > 0)
            paragraphs.push(second.join(' '));
        for (const debt of plan.debts)
            paragraphs.push(debtLine(debt));
        return paragraphs;
    },
    drive: (plan) => {
        const su = plan.soulUrge;
        const lp = plan.lifePath.value;
        const first = [];
        if (plan.toldBy) {
            first.push(`Tvoja túžba duše je rovnaké číslo ${su.value} ako ${POS[plan.toldBy].nom}, takže ťa uspokojuje ${SOUL_URGE_SHORT[su.value]}.`);
        }
        else {
            first.push(SOUL_URGE[su.value]);
            if (su.master)
                first.push(masterLine(su.value, su.root, 'soul-urge'));
        }
        switch (plan.withDirection) {
            case 'same':
                if (!plan.toldBy)
                    first.push('Je to rovnaké číslo ako tvoja životná cesta, takže to, čo ťa uspokojuje, a smer, ktorý určuje tvoja životná cesta, sú jedno a samotná práca je odmenou.');
                break;
            case 'reinforcing':
                first.push(`Tlačí rovnakým smerom ako tvoja životná cesta ${lp}: to, čo chceš, a smer, ktorý určuje, sa zhodujú.`);
                break;
            case 'complementary':
                first.push(`Je to iný druh uspokojenia, než aký dáva tvoja životná cesta ${lp}, a to je užitočné: práve ${num(su.value)} robí smer ${num(lp, 'gen')} hodným námahy.`);
                break;
            case 'crosswise':
                first.push(`Nevychádza z toho istého miesta ako tvoja životná cesta ${lp} a obe potrebujú v tom istom týždni vedome vyhradený priestor.`);
                break;
            default:
                break;
        }
        if (plan.echo && !plan.echo.dominant)
            first.push(echoLine(plan.echo, 'soul-urge'));
        if (plan.passionAgrees && !(plan.echo?.positions.includes('hidden-passion'))) {
            first.push(`Najčastejšia hodnota v tvojom mene je tiež ${su.root}, čo tento motív ešte posilňuje.`);
        }
        const paragraphs = [first.join(' ')];
        if (plan.echo?.dominant)
            paragraphs.push(echoLine(plan.echo, 'soul-urge'));
        for (const debt of plan.debts)
            paragraphs.push(debtLine(debt));
        return paragraphs;
    },
    presence: (plan) => {
        const exp = plan.expression;
        const pers = plan.personality;
        const first = [];
        if (plan.expressionToldBy) {
            first.push(`Tvoje vyjadrenie je rovnaké číslo ${exp.value} ako ${POS[plan.expressionToldBy].nom}: tvoje schopnosti smerujú k ${EXPRESSION_SHORT[exp.value]}${EXPRESSION_TAIL[plan.expressionToldBy] ?? ''}.`);
        }
        else {
            first.push(EXPRESSION[exp.value]);
            if (exp.master)
                first.push(masterLine(exp.value, exp.root, 'expression'));
        }
        if (plan.expressionEcho)
            first.push(echoLine(plan.expressionEcho, 'expression'));
        const second = [];
        if (plan.personalityToldBy) {
            second.push(`To, čo sa navonok zvykne ukázať ako prvé, je rovnaké číslo ${pers.value} ako ${POS[plan.personalityToldBy].nom}: ${PERSONALITY_SHORT[pers.value]}${PERSONALITY_TAIL[plan.personalityToldBy] ?? ''}.`);
        }
        else {
            second.push(PERSONALITY[pers.value]);
            if (pers.master)
                second.push(masterLine(pers.value, pers.root, 'personality'));
        }
        if (plan.personalityEcho)
            second.push(echoLine(plan.personalityEcho, 'personality'));
        if (plan.attitudeAgrees)
            second.push(`Tvoj postoj, prvá reakcia, ktorú ukážeš, nesie tú istú ${num(pers.root, 'acc')}, takže prvý dojem je súdržný.`);
        /* As in the English voice: what tends to show first, and what comes
           forward once there is work or something at stake - never what other
           people offer, assign or conclude. */
        const third = [];
        switch (plan.withEachOther) {
            case 'same':
                third.push('Povrch aj schopnosti sú to isté číslo, takže to, čo sa ukáže ako prvé, je to, čo naozaj vieš — a to, čo vieš mimo tohto rozsahu, môže zostať v úzadí, niekedy aj pre teba.');
                break;
            case 'reinforcing':
                third.push(`${Num(pers.value)} a ${num(exp.value)}, s ktorou pracuješ, sa zhodujú, takže prvý dojem je spoľahlivým vodítkom k tomu, ako naozaj pracuješ.`);
                break;
            case 'complementary':
                third.push(`${capitalise(PERSONALITY_DRAW[pers.value])} ${num(pers.value, 'gen')} je prvá vrstva; ${num(exp.value)} potom, keď príde na prácu, ${EXPRESSION_DOES[exp.value]}.`);
                break;
            case 'crosswise':
                third.push(`${Num(pers.value)} a ${num(exp.value)}, s ktorou pracuješ, mieria rôznym smerom, takže prvý dojem môže o tom, ako naozaj pracuješ, povedať málo; ${num(exp.value)} sa zvykne ukázať až pri samotnej práci.`);
                break;
            default:
                break;
        }
        const su = plan.soulUrge;
        if (su && su.value !== pers.value) {
            switch (plan.innerOuter) {
                case 'reinforcing':
                    third.push(`To, čo ukazuješ, a to, čo chceš, mieri rovnakým smerom: ${num(pers.value)} na povrchu je férovou ukážkou ${num(su.value, 'gen')} pod ňou.`);
                    break;
                case 'complementary':
                    third.push(`Pod ${num(pers.value, 'ins')} je ${num(su.value)}, ktorá zvykne vystúpiť dopredu, ${SOUL_URGE_WHEN[su.value]}.`);
                    break;
                case 'crosswise':
                    third.push(`Povrch a motív sú od seba ďaleko: ${num(pers.value)} na povrchu prezradí o ${num(su.value, 'loc')} pod ňou málo a ${num(su.value)} zvykne zostať mimo dohľadu, kým sa ju nerozhodneš ukázať.`);
                    break;
                default:
                    break;
            }
        }
        else if (su && plan.innerOuter === 'same') {
            third.push('To, čo sa ukáže ako prvé, ťa zároveň uspokojuje, takže medzi povrchom a motívom je malá vzdialenosť.');
        }
        const paragraphs = [first.join(' '), second.join(' '), third.join(' ')];
        for (const debt of plan.debts)
            paragraphs.push(debtLine(debt));
        return paragraphs.filter(Boolean);
    },
    pullStandfirst: 'Kde chcú časti tvojich čísel rôzne veci — čítané ako sklony, nie ako verdikty.',
    pull: (plan) => {
        if (plan.kind === 'split') {
            const anchor = plan.anchor;
            const sides = plan.against;
            const first = [];
            first.push(sides.length === 1
                ? `Najsilnejšie napätie v tvojich číslach je medzi ${groupText(anchor, 'ins')} a ${groupText(sides[0].group, 'ins')}.`
                : `Najsilnejšie napätie v tvojich číslach je medzi ${groupText(anchor, 'ins')} a číslami na druhej strane: ${list(sides.map((side) => groupText(side.group, 'ins')))}.`);
            first.push(`${capitalise(`${num(anchor.value)} ${STANCE[anchor.value]}`)}; ${sides.map((side) => `${num(side.group.value)} ${STANCE[side.group.value]}`).join('; ')}.`);
            if (plan.more.length > 0) {
                const extra = plan.more.map((group) => `${list(group.positions.map((position) => POS[position].nom))} s číslom ${group.value}`);
                const many = plan.more.length > 1 || plan.more[0].positions.length > 1;
                first.push(`${capitalise(list(extra))} sa ${many ? 'nakláňajú' : 'nakláňa'} tým istým smerom ako ${sides.length === 1 ? num(sides[0].group.value) : 'ony'}.`);
            }
            const second = [
                axisSentence(anchor, sides),
                `Keď to funguje, ${num(anchor.value)} prináša ${CONTRIBUTION[anchor.value][0]} do ${list(sides.map((side) => `${CONTRIBUTION[side.group.value][1]} ${num(side.group.value, 'gen')}`))}.`,
            ];
            return [first.join(' '), second.join(' ')];
        }
        if (plan.kind === 'gap') {
            const { left, right } = plan;
            return [
                `V tvojich číslach nič silno neťahá proti zvyšku. Najzreteľnejší rozdiel je medzi ${groupText(left, 'ins')} a ${groupText(right, 'ins')}: ${num(left.value)} ${STANCE[left.value]}, kým ${num(right.value)} ${STANCE[right.value]}.`,
                `Je to rozdiel dôrazu, nie konflikt, a každá dodá, čo druhej chýba — ${num(left.value)} prináša ${CONTRIBUTION[left.value][0]}, ${num(right.value)} ${CONTRIBUTION[right.value][0]}.`,
            ];
        }
        const roots = plan.roots.map((root) => num(root));
        return [
            `V tvojich číslach len málo ťahá proti zvyšku. Tón ${roots.length === 1 ? 'udáva' : 'udávajú'} ${list(roots)} a ostatné čísla sa nakláňajú rovnakým smerom, takže smer je jasný a námaha zájde ďaleko.`,
            'Takáto zhoda však nedokáže spochybniť sama seba: nesprávny smer môže zájsť ďaleko, kým sa v tebe niečo ozve, a preto má pre teba pohľad zvonka, ktorému dôveruješ, väčšiu cenu než ďalší vlastný.',
        ];
    },
    cost: (plan) => {
        const paragraphs = [];
        const [a, b] = plan.overuse;
        if (a !== undefined) {
            const first = [`Keď sa preženie, ${num(a)} ${OVERUSE[a]}.`];
            if (b !== undefined)
                first.push(`${Num(b)} zas ${OVERUSE[b]}.`);
            if (plan.pair)
                first.push(pairCost(plan.pair.anchor, plan.pair.other, plan.pair.axis));
            paragraphs.push(first.join(' '));
        }
        const second = [];
        if (plan.absent.length === 1) {
            const [n] = plan.absent;
            second.push(`${Num(n, 'acc')} v tvojich číslach nenesie nič — ani meno, ani žiadna pozícia — takže ${ABSENT[n]} je niečo, čo si buduješ zámerne, a nie niečo, čo príde samo.`);
        }
        else if (plan.absent.length === 2) {
            const [n, m] = plan.absent;
            second.push(`${Num(n, 'acc')} ani ${num(m, 'acc')} v tvojich číslach nenesie nič — ani meno, ani žiadna pozícia — takže ${ABSENT[n]} a ${ABSENT[m]} sú veci, ktoré si buduješ zámerne, a nie veci, ktoré prídu samy.`);
        }
        if (plan.balance !== null && BALANCE[plan.balance]) {
            second.push(`Pod tlakom zvykneš siahnuť po tomto: ${BALANCE[plan.balance]}; presne to opisuje tvoje číslo rovnováhy, ${plan.balance}.`);
        }
        if (second.length > 0)
            paragraphs.push(second.join(' '));
        return paragraphs;
    },
    growth: (plan, pull) => {
        const m = plan.maturity;
        const lp = plan.lifePath.value;
        const sentences = [`S časom tvoje čísla smerujú k tomuto: ${MATURITY[m.value]}. Tvoja zrelosť je ${m.value}.`];
        if (m.master && plan.toldBy) {
            sentences.push(`${Num(m.value)} je majstrovské číslo a zostáva tu celá: ${num(m.root)}, ktorú už nesie ${POS[plan.toldBy].nom}, má pracovať vo väčšom rozsahu — s väčším záberom aj väčšou záťažou.`);
        }
        else if (m.master) {
            sentences.push(masterLine(m.value, m.root, 'maturity'));
        }
        if (plan.toldBy && !m.master) {
            sentences.push(`Je to tá istá ${num(m.value)}, ktorú nesie ${POS[plan.toldBy].nom}, takže ${MATURITY_TOLD[plan.toldBy] ?? 'neskorší život prehĺbi číslo, ktoré už máš, namiesto toho, aby pridal nové'}.`);
        }
        else if (!plan.toldBy && plan.sharedWith.length === 0) {
            sentences.push(`Žiadne iné z tvojich základných čísel nie je ${num(m.value)}, takže neskorší život pridáva nový smer, namiesto toho, aby prehlboval ten, ktorý už nesieš.`);
        }
        if (plan.inPull && pull.kind === 'split') {
            const opposite = pull.anchor.positions.includes('maturity')
                ? list(pull.against.map((side) => num(side.group.value, 'dat')))
                : groupText(pull.anchor, 'dat');
            sentences.push(`V napätí opísanom vyššie stojí ${num(m.value)} proti ${opposite} a s časom dostáva viac priestoru.`);
        }
        else {
            switch (plan.withDirection) {
                case 'reinforcing':
                    sentences.push(`Tlačí rovnakým smerom ako tvoja životná cesta ${lp}.`);
                    break;
                case 'complementary':
                    sentences.push(`Pridáva niečo k tvojej životnej ceste ${lp}, namiesto toho, aby ju opakovala.`);
                    break;
                case 'crosswise':
                    sentences.push(`Odvracia sa od tvojej životnej cesty ${lp}, takže neskorší život žiada niečo, čo tvoj smer nežiadal.`);
                    break;
                default: break;
            }
        }
        return [sentences.join(' ')];
    },
    chapterStandfirst: 'Úsek rokov čítaný ako štruktúra, nie ako predpoveď.',
    chapter: (plan) => {
        const c = plan.chapter;
        const lp = plan.lifePath.value;
        const first = [];
        if (c.index === 0)
            first.push(`Si v prvej zo svojich štyroch životných kapitol, ktorá trvá od narodenia do ${c.endAge} rokov.`);
        else if (c.index === 3)
            first.push(`Si vo štvrtej, poslednej zo svojich životných kapitol, ktorá trvá od ${c.startAge} rokov do konca života.`);
        else
            first.push(`Si v ${ORDINAL_LOC[c.index]} zo svojich štyroch životných kapitol, od ${c.startAge} do ${c.endAge} rokov.`);
        first.push(`Jej vrchol je ${c.pinnacle}: tieto roky sa točia okolo ${PINNACLE[c.pinnacle]}.`);
        if (c.pinnacleMaster) {
            first.push(`${Num(c.pinnacle)} je tu majstrovské číslo: ${ROOT_BRIEF[c.pinnacleRoot]} vo väčšej mierke, s väčším záberom aj väčšou záťažou.`);
        }
        if (plan.pinnacleShares.length > 0) {
            first.push(`${Num(c.pinnacleRoot === c.pinnacle ? c.pinnacle : c.pinnacleRoot)} je aj ${locList(plan.pinnacleShares)}, takže ${PINNACLE_SHARE[leadShare(plan.pinnacleShares)]}.`);
        }
        else {
            switch (plan.pinnacleWithDirection) {
                case 'reinforcing':
                    first.push(`Tlačí rovnakým smerom ako tvoja životná cesta ${lp}.`);
                    break;
                case 'complementary':
                    first.push('Dáva tvojmu smeru niečo, čo sám nemá.');
                    break;
                case 'crosswise':
                    first.push(`Žiada spôsob práce, ktorý tvoja životná cesta ${lp} bežne nedodáva.`);
                    break;
                default: break;
            }
        }
        const second = [];
        if (c.challenge === 0) {
            second.push('Jej výzva je 0. To neznamená, že chýba ťažkosť: v týchto rokoch neprevažuje žiadny jeden tlak, takže kapitola ti neukáže jednu vec, na ktorej treba pracovať, a prácou sa stáva vedome si zvoliť, kam dáš úsilie.');
        }
        else {
            second.push(`Jej výzva je ${c.challenge}: tlakom vnútri týchto rokov je ${CHALLENGE[c.challenge]}.`);
            if (plan.challengeShares.length > 0) {
                second.push(`${Num(c.challenge)} je aj ${locList(plan.challengeShares)}, takže ${CHALLENGE_SHARE[leadShare(plan.challengeShares)]}.`);
            }
            else {
                switch (plan.challengeWithDirection) {
                    case 'reinforcing':
                        second.push(`Tlačí rovnakým smerom ako tvoja životná cesta ${lp}, takže tlak týchto rokov pôsobí pozdĺž tvojho smeru, a nie naprieč ním.`);
                        break;
                    case 'complementary':
                        second.push(`Žiada niečo, čo tvoja životná cesta ${lp} sama nedodá, a preto sa tieto roky môžu podobať učeniu sa druhého jazyka.`);
                        break;
                    case 'crosswise':
                        second.push(`Tlačí tam, kde sa tvoja životná cesta ${lp} cíti najmenej doma, a práve preto je to práca tejto kapitoly.`);
                        break;
                    default: break;
                }
            }
        }
        return [first.join(' '), second.join(' ')];
    },
    evidence: {
        standfirst: 'Čísla za každou časťou výkladu a ako vznikli.',
        section: (section, model, plan) => EVIDENCE[section](model, plan),
    },
    reference: {
        chapterTiming: (model) => {
            const [c1, c2, c3, c4] = model.chapters;
            if (!c1 || !c4)
                return '';
            const digit = model.positions['life-path']?.root ?? 0;
            const lp = model.positions['life-path']?.value ?? digit;
            return `Tvoje štyri kapitoly trvajú od narodenia do ${c1.endAge} rokov, od ${c2.startAge} do ${c2.endAge}, od ${c3.startAge} do ${c3.endAge} a od ${c4.startAge} rokov do konca života. Prvá sa končí pri 36 mínus ${lp === digit ? `${digit}, tvoja životná cesta` : `${digit}, jednomiestne číslo tvojej životnej cesty (${lp} sa tu počíta ako ${digit})`}, a preto je najdlhšia; prostredné dve trvajú po deväť rokov.`;
        },
        positionTitle: (position, value, compound) => (position === 'life-path' && compound !== null
            ? `${POS[position].title} ${compound}/${value}`
            : `${POS[position].title} ${value}`),
        debtTitle: (value, positions) => `Karmický dlh ${value} · ${list(positions.map((position) => POS[position].title))}`,
        positionsStandfirst: 'Každé číslo samostatne, v pozícii, ktorá ho vytvorila — plnší výklad, z ktorého čerpá hlavný text.',
        chaptersStandfirst: 'Štyri úseky života, ktoré opisujú vrcholy a výzvy, každý čítaný ako štruktúra, nie ako predpoveď.',
        cyclesStandfirst: 'Osobný rok, mesiac a deň dnešného dátumu. Predpoveď ich číta deň po dni; tu sú pre úplnosť.',
    },
};
/* ================================================================= evidence */
const TRACE_LABELS = {
    birthMonth: 'mesiac', birthDay: 'deň', birthYear: 'rok',
    lifePath: 'životná cesta', expression: 'vyjadrenie',
};
const TEMPO_WORD = { slow: 'pomalé', steady: 'vyrovnané', fast: 'rýchle' };
const FACING_WORD = { inward: 'dovnútra', outward: 'navonok', both: 'oboma smermi' };
const named = (signal) => `${POS[signal.position].title} ${signal.value}`;
const relationLine = (left, right, relation) => (left && right && relation ? `${named(left)} a ${named(right).toLowerCase()}: ${RELATION_WORD[relation]}.` : null);
const lettersOf = (signal) => signal.trace
    .split('+').map((part) => part.trim().split('=')[0] ?? '').join('');
const vowelNote = (signal) => (signal && lettersOf(signal).includes('Y')
    ? 'Y sa číta ako samohláska, keď ani jeden z jeho susedov v mene nie je samohláska, inak ako spoluhláska.'
    : null);
function echoEvidence(echo) {
    return `${echo.root} sa objavuje aj ako ${list(echo.positions.map((position, index) => `${POS[position].title.toLowerCase()} ${echo.values[index]}`))}.`;
}
const EVIDENCE = {
    'numerology-direction': (model, plan) => {
        const lp = model.positions['life-path'];
        const lines = [`Životná cesta ${lp.value}: ${readableTrace(lp.trace, TRACE_LABELS)}, súčet: ${chainText(lp.chain)}. Mesiac, deň a rok sa redukujú každý zvlášť a 11, 22 a 33 zostávajú celé.`];
        const bd = model.positions.birthday;
        if (bd) {
            lines.push(`Deň narodenia ${chainText(bd.chain)}: deň v mesiaci.`);
            const line = relationLine(lp, bd, plan.direction.birthday?.relation ?? null);
            if (line)
                lines.push(line);
        }
        for (const debt of plan.direction.debts) {
            const signal = model.positions[debt.position];
            lines.push(`Karmický dlh ${debt.value}: je vo vlastnej redukcii pozície ${POS[debt.position].title.toLowerCase()} (${chainText(signal.chain)}), nie v niektorej z jej častí.`);
        }
        if (plan.direction.echo)
            lines.push(echoEvidence(plan.direction.echo));
        return lines;
    },
    'numerology-drive': (model, plan) => {
        const su = model.positions['soul-urge'];
        if (!su || !plan.drive)
            return [];
        const lines = [`Túžba duše ${su.value}: samohlásky každého mena, redukované meno po mene (${readableTrace(su.trace, TRACE_LABELS)}), súčet: ${chainText(su.chain)}.`];
        const note = vowelNote(su);
        if (note)
            lines.push(note);
        const line = relationLine(model.positions['life-path'], su, plan.drive.withDirection);
        if (line)
            lines.push(line);
        if (model.hiddenPassion.length > 0)
            lines.push(`Skrytá vášeň ${list(model.hiddenPassion.map(String))}: hodnota, ktorú písmená tvojho mena opakujú najčastejšie.`);
        for (const debt of plan.drive.debts)
            lines.push(`Karmický dlh ${debt.value}: je vo vlastnej redukcii túžby duše (${chainText(su.chain)}), nie v niektorom z mien.`);
        if (plan.drive.echo)
            lines.push(echoEvidence(plan.drive.echo));
        return lines;
    },
    'numerology-presence': (model, plan) => {
        const exp = model.positions.expression;
        const pers = model.positions.personality;
        if (!exp || !pers || !plan.presence)
            return [];
        const lines = [
            `Vyjadrenie ${exp.value}: všetky písmená, redukované meno po mene (${readableTrace(exp.trace, TRACE_LABELS)}), súčet: ${chainText(exp.chain)}.`,
            `Osobnosť ${pers.value}: spoluhlásky, redukované meno po mene (${readableTrace(pers.trace, TRACE_LABELS)}), súčet: ${chainText(pers.chain)}${pers.master ? `; ${pers.value} zostáva ako majstrovské číslo` : ''}.`,
        ];
        const note = vowelNote(pers);
        if (note)
            lines.push(note);
        const att = model.positions.attitude;
        if (att)
            lines.push(`Postoj ${att.value}: mesiac a deň narodenia (${readableTrace(att.trace, TRACE_LABELS)}), súčet: ${chainText(att.chain)}; majstrovské čísla sa tu redukujú.`);
        for (const line of [
            relationLine(exp, pers, plan.presence.withEachOther),
            relationLine(model.positions['soul-urge'], pers, plan.presence.innerOuter),
        ])
            if (line)
                lines.push(line);
        for (const debt of plan.presence.debts) {
            const signal = model.positions[debt.position];
            lines.push(`Karmický dlh ${debt.value}: je vo vlastnej redukcii pozície ${POS[debt.position].title.toLowerCase()} (${chainText(signal.chain)}).`);
        }
        if (plan.presence.expressionEcho)
            lines.push(echoEvidence(plan.presence.expressionEcho));
        if (plan.presence.personalityEcho)
            lines.push(echoEvidence(plan.presence.personalityEcho));
        return lines;
    },
    'numerology-pull': (model, plan) => {
        const pull = plan.pull;
        const describe = (group) => {
            const signal = model.signals.find((entry) => entry.value === group.value);
            const positions = group.positions.map((position) => POS[position].title).join(', ');
            return signal
                ? `${group.value} (${positions}): ${TEMPO_WORD[signal.tempo]}, ${FACING_WORD[signal.facing]}`
                : `${group.value} (${positions})`;
        };
        const rule = 'Dve čísla sa čítajú ako ťahajúce od seba, keď je jedno pomalé a druhé rýchle, alebo keď jedno pracuje dovnútra a druhé navonok; čísla s rovnakým smerom sa čítajú ako vzájomne posilňujúce.';
        if (pull.kind === 'split') {
            return [`${describe(pull.anchor)}. Proti nemu: ${[...pull.against.map((side) => side.group), ...pull.more].map(describe).join('; ')}.`, rule];
        }
        if (pull.kind === 'gap') {
            return [`${describe(pull.left)}; ${describe(pull.right)}. Žiadna dvojica čísel nie je pomalá proti rýchlej ani dovnútra proti navonok.`, rule];
        }
        return [`Opakované alebo posilňujúce sa čísla: ${pull.roots.join(', ')}. Žiadna dvojica čísel neťahá proti druhej.`, rule];
    },
    'numerology-cost': (model, plan) => {
        const lines = [`Preťaženie sa číta z čísel ${list(plan.cost.overuse.map(String))}${plan.cost.pull === 'split' ? ', dvoch strán napätia' : ''}.`];
        lines.push(model.karmicLessons.length > 0
            ? `Karmické lekcie ${list(model.karmicLessons.map(String))}: hodnoty, ktoré nenesie žiadne písmeno tvojho mena.${model.absentEverywhere.length > 0 ? ` Z nich ${list(model.absentEverywhere.map(String))} ${model.absentEverywhere.length === 1 ? 'chýba' : 'chýbajú'} aj vo všetkých pozíciách.` : ' Každá z nich sa objavuje aspoň v jednej pozícii.'}`
            : 'Karmické lekcie: žiadne — každá hodnota od 1 do 9 sa v písmenách tvojho mena objavuje.');
        const balance = model.positions.balance;
        if (balance)
            lines.push(`Rovnováha ${balance.value}: prvé písmeno každého mena (${readableTrace(balance.trace, TRACE_LABELS)}) → ${balance.parts.join(' + ')} = ${chainText(balance.chain)}; majstrovské čísla sa tu redukujú.`);
        return lines;
    },
    'numerology-growth': (model) => {
        const m = model.positions.maturity;
        if (!m)
            return [];
        return [`Zrelosť ${m.value}: ${readableTrace(m.trace, TRACE_LABELS)}, súčet: ${chainText(m.chain)}${m.master ? `; ${m.value} zostáva ako majstrovské číslo` : ''}.`];
    },
    'numerology-chapter': (model, plan) => {
        const current = plan.chapter?.chapter;
        const [c1, c2, c3, c4] = model.chapters;
        const digit = model.positions['life-path']?.root ?? 0;
        const lines = [];
        if (c1 && c4)
            lines.push(`Obdobia: od narodenia do ${c1.endAge} (36 − ${digit}), potom po deväť rokov (${c2.startAge}-${c2.endAge}, ${c3.startAge}-${c3.endAge}) a od ${c4.startAge} ďalej.`);
        if (!current)
            return lines;
        const lp = model.positions['life-path'];
        const [month, day, year] = lp.parts;
        const P = [`mesiac ${month} + deň ${day}`, `deň ${day} + rok ${year}`, 'prvý + druhý vrchol', `mesiac ${month} + rok ${year}`];
        const C = ['deň − mesiac', 'deň − rok', 'prvá − druhá výzva', 'mesiac − rok'];
        lines.push(`Teraz: ${ORDINAL_NOM[current.index]} kapitola${model.age !== null ? `, vo veku ${model.age}` : ''}.`);
        lines.push(`Vrchol ${current.pinnacle} = ${P[current.index]} (${current.pinnacleParts.join(' + ')})${current.pinnacle !== current.pinnacleParts.reduce((sum, part) => sum + part, 0) ? ` → ${current.pinnacle}` : ''}.`);
        lines.push(`Výzva ${current.challenge} = ${C[current.index]}, jednomiestne (|${current.challengeParts.join(' − ')}|). Výzvy používajú mesiac, deň a rok zredukované na jednu číslicu, preto sú od 0 do 8.`);
        return lines;
    },
};
