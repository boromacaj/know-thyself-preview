import { pairKey, phrasingFor } from './temporalComposition.js?v=d9f39e7';
const FORMS = {
    1: { nom: 'jednotka', gen: 'jednotky', acc: 'jednotku', withIns: 's jednotkou' },
    2: { nom: 'dvojka', gen: 'dvojky', acc: 'dvojku', withIns: 's dvojkou' },
    3: { nom: 'trojka', gen: 'trojky', acc: 'trojku', withIns: 's trojkou' },
    4: { nom: 'štvorka', gen: 'štvorky', acc: 'štvorku', withIns: 'so štvorkou' },
    5: { nom: 'päťka', gen: 'päťky', acc: 'päťku', withIns: 's päťkou' },
    6: { nom: 'šestka', gen: 'šestky', acc: 'šestku', withIns: 'so šestkou' },
    7: { nom: 'sedmička', gen: 'sedmičky', acc: 'sedmičku', withIns: 'so sedmičkou' },
    8: { nom: 'osmička', gen: 'osmičky', acc: 'osmičku', withIns: 's osmičkou' },
    9: { nom: 'deviatka', gen: 'deviatky', acc: 'deviatku', withIns: 's deviatkou' },
};
const WORDS = {
    1: {
        themeGen: 'iniciatívy',
        themeIs: 'iniciatíva je',
        themeAcc: 'iniciatívu',
        want: 'začiatok',
        year: [
            'sa točí okolo výberu vlastného smeru a toho, aby bol naozaj tvoj',
            'si žiada vlastný smer, zvolený vedome, nie zo zotrvačnosti',
            'dáva na prvé miesto iniciatívu: vybrať, kam ísť, a urobiť prvé kroky',
        ],
        month: 'kladie väčší dôraz na výber smeru a na záväzok k nemu',
        use: 'prvý krok',
        moreOf: 'ďalší nový začiatok',
        echo: 'sa ľahšie koná podľa výzvy k novému smeru',
        concentrates: 'otázkou teraz je, čomu sa zaviazať ako prvému',
        tripleList: 'smer, vlastná iniciatíva a prvé kroky',
        notEvent: 'sa v tento deň niečo musí začať',
        ready: 'na prvý krok už niečo čaká',
        pressure: 'vynútený začiatok skôr, než je jasná situácia',
    },
    2: {
        themeGen: 'spolupráce',
        themeIs: 'spolupráca je',
        themeAcc: 'spoluprácu',
        want: 'trpezlivosť a spoluprácu',
        year: [
            'pracuje cez spoluprácu, načasovanie a odozvu druhých ľudí',
            'ide tempom dohôd, trpezlivosti a odozvy druhých ľudí',
            'praje partnerstvu: počúvaniu, zlaďovaniu a tomu, aby sa veci vyvíjali medzi ľuďmi',
        ],
        month: 'robí spoluprácu a odozvu druhých dôležitejšou pre to, ako sa to vyvíja',
        use: 'spoločné dohadovanie',
        moreOf: 'ďalšie konzultácie',
        echo: 'sa trpezlivosť a spolupráca vracajú do popredia',
        concentrates: 'pokrok ešte viac závisí od načasovania a dobrého zladenia',
        tripleList: 'počúvanie, načasovanie a trpezlivosť',
        notEvent: 'sa v tento deň musí uzavrieť dohoda',
        ready: 'je už niečo pripravené na spoločné dohodnutie',
        pressure: 'čakanie vo chvíli, keď už treba konať',
    },
    3: {
        themeGen: 'vyjadrenia',
        themeIs: 'vyjadrenie je',
        themeAcc: 'vyjadrenie',
        want: 'vyjadrenie',
        year: [
            'praje tomu, aby sa nápady, práca a rozhovory dostali medzi ľudí',
            'chce, aby bolo vidieť a počuť nápady, prácu aj rozhovory',
            'sa točí okolo vyjadrenia: tvorby, zdieľania a hľadania slov',
        ],
        month: 'to prenáša do vyjadrenia, do rozhovorov, náčrtov a všetkého, čo sa dá zdieľať',
        use: 'vyjadrenie alebo ukázanie niečoho',
        moreOf: 'ďalšie rozprávanie',
        echo: 'sa ľahšie využije ťah k vyjadreniu',
        concentrates: 'to, čo vyjadruješ alebo zdieľaš, sa ľahšie dostane k ľuďom',
        tripleList: 'kontakt, zdieľanie a viditeľná práca',
        notEvent: 'v tento deň treba niečo vysloviť',
        ready: 'je už niečo pripravené na zdieľanie',
        pressure: 'rozptýlenie do príliš mnohých smerov',
    },
    4: {
        themeGen: 'štruktúry',
        themeIs: 'štruktúra je',
        themeAcc: 'štruktúru',
        want: 'pevný tvar',
        year: [
            'je o budovaní niečoho spoľahlivého, jednej praktickej vrstvy za druhou',
            'si žiada trpezlivé budovanie s metódou, údržbou a základmi, ktoré vydržia',
            'si žiada štruktúru: aby veci boli spoľahlivé, opakovateľné a dobre udržiavané',
        ],
        month: 'to zužuje na štruktúru a na to, čo sa dá naozaj spraviť spoľahlivým',
        use: 'sústavnú, praktickú prácu',
        moreOf: 'ďalšie uťahovanie štruktúry',
        echo: 'sa do popredia vracia sústavné budovanie',
        concentrates: 'praktické základy si zaslúžia najviac pozornosti',
        tripleList: 'metóda, disciplína a spoľahlivosť',
        notEvent: 'sa v tento deň musí všetko usporiadať',
        ready: 'je už niečo pripravené na usporiadanie',
        pressure: 'lipnutie na štruktúre, ktorá už nepomáha',
    },
    5: {
        themeGen: 'zmeny',
        themeIs: 'zmena je',
        themeAcc: 'zmenu',
        want: 'pohyb',
        year: [
            'zostáva otvorený pohybu, skúšaniu a uvoľňovaniu toho, čo stuhlo',
            'praje zmene, skúšaniu iných ciest a uvoľňovaniu usporiadaní, ktoré príliš stuhli',
            'sa točí okolo pohybu: skúšania, prispôsobovania a hľadania inej cesty',
        ],
        month: 'to uvoľňuje a pridáva pohyb a priestor vyskúšať inú cestu',
        use: 'skúšanie inej cesty',
        moreOf: 'ďalšie skúmanie',
        echo: 'sa ľahšie koná podľa otvorenosti voči zmene',
        concentrates: 'viac zo súčasného usporiadania sa dá upraviť',
        tripleList: 'pohyb, skúšanie a uvoľňovanie pevných usporiadaní',
        notEvent: 'sa v tento deň niečo musí zmeniť',
        ready: 'je už niečo pripravené pohnúť sa',
        pressure: 'zamieňanie pohybu za pokrok',
    },
    6: {
        themeGen: 'zodpovednosti',
        themeIs: 'zodpovednosť je',
        themeAcc: 'zodpovednosť',
        want: 'starostlivosť a záväzok',
        year: [
            'stavia do stredu zodpovednosť, starostlivosť a všetko, o čo sa treba poriadne starať',
            'je o starostlivosti a záväzku, o tom, na čom záleží, a o oprave toho, čo ju potrebuje',
            'sa pýta, o čo sa staráš, čo udržiavaš a za čo zodpovedáš',
        ],
        month: 'to spája so zodpovednosťou, s tým, o čo sa treba postarať, čo opraviť alebo poriadne dokončiť',
        use: 'starostlivosť o dôležité veci',
        moreOf: 'preberanie ďalších povinností',
        echo: 'sa do popredia vracajú povinnosti a starostlivosť',
        concentrates: 'do popredia sa dostávajú povinnosti a starostlivosť o veci',
        tripleList: 'starostlivosť, záväzok a údržba',
        notEvent: 'v tento deň treba prevziať novú povinnosť',
        ready: 'už niečo potrebuje starostlivosť',
        pressure: 'nesenie toho, čo patrí niekomu inému',
    },
    7: {
        themeGen: 'premýšľania',
        themeIs: 'premýšľanie je',
        themeAcc: 'premýšľanie',
        want: 'premýšľanie',
        year: [
            'sa obracia k štúdiu, prehodnocovaniu a jasnejšiemu porozumeniu toho, na čom záleží',
            'je časom hĺbky, štúdia, prehodnocovania a premýšľania až do konca',
            'dáva porozumenie pred výkon: kontrolu, učenie sa a premyslenie vecí',
        ],
        month: 'to obracia dovnútra, k štúdiu, kontrole a porozumeniu toho, čo sa naozaj deje',
        use: 'kontrolu a porozumenie',
        moreOf: 'ďalšie analyzovanie',
        echo: 'sa do popredia vracia vnútorná, premýšľavá práca',
        concentrates: 'porozumenie má ešte viac než inokedy prednosť pred výkonom',
        tripleList: 'štúdium, hĺbka a dôkladná kontrola',
        notEvent: 'tento deň treba stráviť osamote',
        ready: 'sa už niečo pýta na porozumenie',
        pressure: 'kontrolu, ktorá sa nikdy nedostane k záveru',
    },
    8: {
        themeGen: 'výsledkov a zodpovednosti',
        themeIs: 'výsledky a zodpovednosť sú',
        themeAcc: 'výsledky a zodpovednosť',
        want: 'konkrétny výsledok',
        year: [
            'dáva väčšiu váhu výsledkom, zdrojom a zodpovednosti za ne',
            'je o hmatateľných dôsledkoch a o zodpovednosti, ktorá prichádza s výsledkami a zdrojmi',
            'si žiada výsledky, ktoré sa dajú zmerať, a autoritu, ktorá za ne zodpovedá',
        ],
        month: 'to robí konkrétnym a do popredia dáva výsledky, zdroje a zodpovednosť',
        use: 'niečo merateľné',
        moreOf: 'ďalší tlak na výsledky',
        echo: 'sa zameranie na výsledky ľahšie mení na niečo konkrétne',
        concentrates: 'praktické dôsledky rozhodnutí sú bližšie po ruke',
        tripleList: 'zdroje, autorita a merateľné ciele',
        notEvent: 'v tento deň musí prísť výsledok',
        ready: 'je už niečo pripravené stať sa konkrétnym',
        pressure: 'vynucovanie výsledku',
    },
    9: {
        themeGen: 'dokončenia',
        themeIs: 'dokončenie je',
        themeAcc: 'dokončenie',
        want: 'poriadne ukončenie',
        year: [
            'je o dokončení, o uzavretí toho, čo dobehlo svoj čas, a o pustení toho, čo už netreba',
            'je časom dokončenia, uzatvárania, púšťania a pohľadu na väčší celok',
            'sa pýta, čo už dobehlo svoj čas a čo celý cyklus naučil',
        ],
        month: 'tomu dáva dokončovací charakter a priestor na uzatváranie, púšťanie a pohľad na väčší celok',
        use: 'dokončovanie a púšťanie',
        moreOf: 'ďalšie upratovanie',
        echo: 'sa ľahšie pokračuje v práci dokončovania',
        concentrates: 'viac z toho, čo dobehlo svoj čas, je pripravené na uzavretie',
        tripleList: 'dokončovanie, púšťanie a širší pohľad',
        notEvent: 'sa v tento deň niečo musí skončiť',
        ready: 'niečo už dospelo k svojmu koncu',
        pressure: 'lipnutie na tom, čo sa už skončilo',
    },
};
const MONTH_INSIDE = {
    '1-2': (m) => `V ňom ${m} privádza k tomuto smeru druhých ľudí: cieľ zostáva tvoj, no načasovanie a dohoda vážia viac.`,
    '2-1': (m) => `V ňom si ${m} žiada prvý vlastný krok, urobený s ohľadom na ľudí okolo.`,
    '3-7': (m) => `V ňom ${m} obracia vyjadrenie na čas dovnútra: práve kontrola robí z toho, čo sa zdieľa, niečo, čo stojí za zdieľanie.`,
    '7-3': (m) => `V ňom ${m} nechá zaznieť alebo ukáže časť toho, čo sa ujasnilo.`,
    '4-5': (m) => `V ňom ${m} vnáša do tejto štruktúry pružnosť: upraviť to, čo sa buduje, a podržať základ.`,
    '5-4': (m) => `V ňom ${m} dáva pohybu tvar: niečo zo zmeny potrebuje pevnú, opakovateľnú podobu.`,
    '5-6': (m) => `V ňom sa ${m} pýta, čo má zostať pevne dohodnuté, kým sa iné veci menia.`,
    '6-5': (m) => `V ňom ${m} uvoľňuje záväzky, ktoré stuhli natoľko, že už nepomáhajú.`,
    '1-9': (m) => `V ňom ${m} upratuje to, čo tomuto smeru stojí v ceste, a dokončuje, čo dobehlo svoj čas.`,
    '9-1': (m) => `V ňom ${m} nechá z toho, čo sa uvoľnilo, vyrásť prvý krok.`,
};
/* Stály mesiac (4, 6) vo vete o svojom roku - year first, after „Mesiac s …". */
const MONTH_STEADY = {
    '1-4': 'dáva tomuto smeru funkčnú štruktúru: tie jeho časti, ktoré sa dajú spraviť spoľahlivými',
    '2-4': 'mení toto partnerstvo na štruktúru: kto robí čo, spoľahlivo a po poriadku',
    '3-4': 'dáva tomuto vyjadreniu pevnejšiu štruktúru: dokončené veci namiesto ďalších začiatkov',
    '6-4': 'dáva týmto zodpovednostiam spoľahlivý a dobre udržiavaný poriadok, aby starostlivosť nezávisela od pamäti ani od nálady',
    '7-4': 'mení toto porozumenie na metódu: poznámky, postupy a to, na čo sa dá spoľahnúť',
    '8-4': 'to zužuje na štruktúru: systémy a záznamy, od ktorých výsledok závisí',
    '9-4': 'dáva tomuto dokončovaniu poriadok: čo sa uzatvára poriadne, jedna vec po druhej',
    '1-6': 'spája tento smer so zodpovednosťou: s tým, o koho a o čo sa pri ňom treba postarať',
    '2-6': 'mení túto spoluprácu na starostlivosť: na čo sa druhí spoliehajú a čo treba opraviť',
    '3-6': 'spája toto vyjadrenie so zodpovednosťou: hovoriť s ohľadom na ľudí, ku ktorým sa to dostane',
    '4-6': 'spája toto budovanie s údržbou: opravovať a udržiavať to, čo už stojí',
    '7-6': 'dáva toto porozumenie do služieb toho, čo potrebuje starostlivosť, opravu alebo údržbu',
    '8-6': 'spája tieto výsledky so zodpovednosťou: komu slúžia a čo z nich treba udržiavať',
    '9-6': 'spája toto dokončenie so starostlivosťou: poriadne dokončiť povinnosti a opraviť, čo sa ešte opraviť dá',
};
/*
 * DEŇ NAD PRÁCOU MESIACA - every ordered pair of different numbers, month
 * first, after „Päťka tohto dňa …". The same pairs as the English and the same
 * idea: the day's number does its own work on what the month is working on.
 *
 * „Tohto dňa", never „dnešná": as in the English, the Forecast reads whichever
 * date is selected, and „dnešná" would name the wrong day on a date browsed in
 * the past or the future. The number stays the subject at the head of the
 * sentence, so a clause that opens on „sa" or „si" keeps its clitic second.
 */
const DAY_ON_MONTH = {
    '1-2': 'privádza k novému začiatku tohto mesiaca druhých ľudí: smer zostáva tvoj, tempo však viac závisí od dohody',
    '1-3': 'robí nový začiatok tohto mesiaca viditeľným: povedz, čo sa začína, alebo niekomu ukáž prvú verziu',
    '1-4': 'dáva novému začiatku tohto mesiaca praktický základ: jednu časť poriadne pripraviť tak, aby sa dala opakovať',
    '1-5': 'necháva priestor vyskúšať nový smer tohto mesiaca inou cestou, skôr než sa k nemu viac zaviažeš',
    '1-6': 'sa stará o to, na čom nový začiatok tohto mesiaca stojí: o ľudí, detaily a sľuby okolo neho',
    '1-7': 'je na premyslenie nového smeru tohto mesiaca skôr, než pôjde ďalej: čítať, prehodnotiť, porovnať',
    '1-8': 'dáva novému začiatku tohto mesiaca merateľný cieľ a niekoho, kto za výsledok zodpovedá',
    '1-9': 'upratuje to, čo novému začiatku tohto mesiaca stojí v ceste, a dokončuje, čo je už hotové',
    '2-1': 'pridáva k spoločnej práci tohto mesiaca prvý vlastný krok, urobený s ohľadom na ľudí, ktorých sa týka',
    '2-3': 'zdieľa, kde spoločná práca tohto mesiaca stojí: povedať to jasne alebo ostatným ukázať, čo je hotové',
    '2-4': 'mení dohody tohto mesiaca na fungujúci postup: kto robí čo a v akom poradí',
    '2-5': 'trochu uvoľňuje spoločné dojednania tohto mesiaca, aby sa dal vyskúšať iný spôsob spolupráce',
    '2-6': 'mení spoluprácu tohto mesiaca na starostlivosť: poriadne sa venovať tomu, na čo sa druhí spoliehajú',
    '2-7': 'robí krok späť, aby bolo jasné, na čom spoločná práca tohto mesiaca stojí: čo je dohodnuté, čo sa len predpokladá a čo treba skontrolovať',
    '2-8': 'žiada od spoločnej práce tohto mesiaca konkrétny výsledok: čo sa dohodlo a kto za to zodpovedá',
    '2-9': 'čisto dokončuje časť spoločnej práce tohto mesiaca a ľudí, ktorých sa týka, drží na očiach',
    '3-1': 'mení nápady a náčrty tohto mesiaca na prvý konkrétny krok, nielen na rozhovor o nich',
    '3-2': 'mení to, čo mesiac zdieľa, na výmenu: počúvať odozvu druhých ľudí skôr, než zaznie viac',
    '3-4': 'dáva do poriadku to, čo mesiac vyjadruje: upraviť, usporiadať a jednu vec poriadne dokončiť',
    '3-5': 'skúša pre to, čo mesiac zdieľa, inú cestu: inú podobu alebo iných poslucháčov',
    '3-6': 'narába s tým, čo mesiac vyjadruje, starostlivo: s ohľadom na ľudí, ku ktorým sa to dostane, a na to, ako to na nich zapôsobí',
    '3-7': 'preveruje to, čo mesiac vyjadruje slovami, skôr než to pôjde ďalej: čo sa zdieľa, získa, keď sa to najprv skontroluje',
    '3-8': 'obracia to, čo mesiac zdieľa, ku konkrétnemu výsledku: čo to má priniesť a kto za to zodpovedá',
    '3-9': 'dovádza to, čo mesiac vyjadroval, do konca: jedna vec dokončená, jeden rozhovor uzavretý',
    '4-1': 'robí prvý konkrétny krok v tom, čo mesiac buduje, namiesto ďalšej prípravy',
    '4-2': 'mení to, čo mesiac buduje, na spoločnú prácu: dohoda a načasovanie vážia viac než sila',
    '4-3': 'ukazuje to, čo mesiac buduje, niekomu, kto to potrebuje vidieť, alebo to opisuje jednoduchými slovami',
    '4-5': 'vnáša do štruktúry tohto mesiaca pružnosť: upraviť to, čo sa buduje, a základ nechať stáť',
    '4-6': 'udržiava to, čo mesiac buduje: opravy, údržba a poriadne dokončenie toho, čo už stojí',
    '4-7': 'preveruje to, čo mesiac buduje: či to drží a či to ešte dáva zmysel',
    '4-8': 'sa pýta, čo má štruktúra tohto mesiaca konkrétne priniesť a kto za to zodpovedá',
    '4-9': 'dokončuje jednu časť toho, čo mesiac buduje, a púšťa, čo už nepotrebuje',
    '5-1': 'vyberá jednu zo zmien tohto mesiaca a naozaj ju začína, namiesto držania všetkých možností otvorených',
    '5-2': 'privádza k zmenám tohto mesiaca druhých ľudí, takže tempo určuje dohoda a načasovanie',
    '5-3': 'dáva zmenám tohto mesiaca slová: čo sa posúva a prečo na tom záleží',
    '5-4': 'dáva zmenám tohto mesiaca pevný tvar: jedna časť urobená poriadne a tak, aby sa dala opakovať',
    '5-6': 'sa pýta, čo má zostať pevné, kým mesiac udržiava veci v pohybe: ľudia a sľuby, ktoré stojí za to podržať',
    '5-7': 'prehodnocuje zmeny tohto mesiaca, skôr než pôjdu ďalej: čo funguje a čo je len pohyb',
    '5-8': 'obracia zmeny tohto mesiaca k merateľnému výsledku, aby pohyb k niečomu viedol',
    '5-9': 'dokončuje to, čo zmeny tohto mesiaca urobili zbytočným, a čisto to púšťa, aby zmena mala miesto',
    '6-1': 'sa púšťa do jednej zo zodpovedností tohto mesiaca: prvý konkrétny krok, urobený hneď',
    '6-2': 'mení zodpovednosti tohto mesiaca na spoločnú vec: dohodu o tom, kto čo nesie',
    '6-3': 'dáva záväzkom tohto mesiaca jasný hlas: čo na seba berieš a čo nie',
    '6-4': 'dáva zodpovednosti tohto mesiaca do poriadku: jedna povinnosť vybavená poriadne, od začiatku do konca',
    '6-5': 'uvoľňuje tie záväzky tohto mesiaca, ktoré stuhli natoľko, že už nepomáhajú, a ostatné nechá na mieste',
    '6-7': 'robí krok späť, aby bolo jasné, čo zo zodpovedností tohto mesiaca je naozaj tvoje a čo nie',
    '6-8': 'robí záväzky tohto mesiaca merateľnými: čo sa dlží, kto to dlží a dokedy',
    '6-9': 'poriadne dokončuje jednu z povinností tohto mesiaca a púšťa jednu, ktorá dobehla svoj čas',
    '7-1': 'mení premýšľanie tohto mesiaca na prvý konkrétny krok: jedno rozhodnutie, ktoré sa naozaj urobí',
    '7-2': 'privádza premýšľanie tohto mesiaca do rozhovoru: porovnať ho s odozvou druhých ľudí a vidieť, čo obstojí',
    '7-3': 'nechá zaznieť alebo ukáže časť toho, čo sa tento mesiac ujasnilo, kým je to ešte čerstvé',
    '7-4': 'dáva premýšľaniu tohto mesiaca poriadok: poznámky, metódu a jednu časť poriadne zapísanú',
    '7-5': 'vnáša pohyb do otázok tohto mesiaca: iný zdroj, iná metóda alebo iný uhol pohľadu',
    '7-6': 'prenáša porozumenie tohto mesiaca do starostlivosti o to, čo ju potrebuje: oprava, údržba, dodržaný sľub',
    '7-8': 'sa pýta, čo má premýšľanie tohto mesiaca konkrétne priniesť: rozhodnutie, číslo, výsledok, za ktorý niekto zodpovedá',
    '7-9': 'dovádza štúdium tohto mesiaca do konca: čo sa pochopilo a čo sa dá pustiť',
    '8-1': 'robí prvý konkrétny krok k výsledku, na ktorý sa mesiac sústreďuje',
    '8-2': 'privádza k výsledkom tohto mesiaca druhých ľudí: spoločné zásluhy a jasné dohody vážia viac než tlak',
    '8-3': 'dáva výsledkom tohto mesiaca slová: čo sa podarilo a čo ešte treba',
    '8-4': 'dáva zdroje tohto mesiaca do praktického poriadku: záznamy, postup a jednu časť urobenú poriadne',
    '8-5': 'hľadá k výsledkom tohto mesiaca inú cestu: iný spôsob, ako dôjsť k tomu istému',
    '8-6': 'sa stará o ľudí a údržbu, na ktorých výsledky tohto mesiaca stoja, aby vydržali',
    '8-7': 'preveruje výsledky tohto mesiaca, skôr než pôjdu ďalej: čísla, predpoklady a to, čo to naozaj stojí',
    '8-9': 'čisto uzatvára jeden z výsledkov tohto mesiaca a púšťa, čo už nepotrebuje',
    '9-1': 'začína niečo malé z toho, čo mesiac uvoľnil: nový krok vyrastá z konca',
    '9-2': 'privádza druhých k tomu, čo mesiac dokončuje: dohoda o tom, čo sa končí a ako sa to odovzdá',
    '9-3': 'dáva slová tomu, čo mesiac uzatvára, jasne a láskavo: správa, ktorá uzavrie kruh',
    '9-4': 'dáva dokončovaniu tohto mesiaca poriadok: jednu vec uzavrieť poriadne namiesto polovičného uzatvárania viacerých',
    '9-5': 'pristupuje k tomu, čo mesiac dokončuje, inak: niečo z toho možno stačí zmeniť, nie ukončiť',
    '9-6': 'dokončuje povinnosti tohto mesiaca starostlivo: aj o to, čo sa uzatvára, je poriadne postarané',
    '9-7': 'prehodnocuje to, čo mesiac dokončuje: čo to naučilo a čo stojí za to si ponechať',
    '9-8': 'robí súpis toho, čo mesiac uzatvára: čo to prinieslo a aké zdroje to uvoľní',
};
/* Deň, ktorý kontrastuje so svojím rokom - after „V roku s …", verb second. */
const YEAR_OVER_DAY = {
    '1-2': 'je táto spolupráca spôsobom, ako zvolený smer získa podporu',
    '2-1': 'funguje vlastný krok najlepšie vtedy, keď má ľudí okolo stále na očiach',
    '3-7': 'je taký bližší pohľad súčasťou vyjadrenia: čo sa zdieľa, lepšie vyznie, keď je to premyslené',
    '7-3': 'je vyslovenie nahlas aj spôsobom, ako preveriť, čo sa ujasnilo',
    '4-5': 'patrí táto pružnosť k údržbe: úpravy udržia štruktúru použiteľnú',
    '5-4': 'dáva deň poriadku zmenám niečo, na čom môžu stáť',
    '5-6': 'chráni táto starostlivosť pred tým, aby zmeny stáli to, na čom záleží',
    '6-5': 'chráni trocha pohybu zodpovednosť pred tým, aby stuhla na zvyk',
    '1-9': 'je toto upratovanie súčasťou začiatku: nový smer potrebuje miesto',
};
const capitalise = (text) => text.charAt(0).toLocaleUpperCase('sk') + text.slice(1);
/**
 * The day's clause without its subject, the way Slovak drops one it has just
 * named: „Dáva zmenám …". A reflexive clitic cannot open a sentence, so
 * „sa stará" becomes „Stará sa".
 */
const withoutSubject = (clause) => capitalise(clause.replace(/^(sa|si) (\p{L}+)/u, (_, clitic, verb) => `${verb} ${clitic}`));
const phrase = (text, month) => text[phrasingFor(month)];
export const TEMPORAL_VOICE_SK = (sentence) => {
    switch (sentence.kind) {
        case 'concentration':
            return `Rok, mesiac aj deň nesú ${FORMS[sentence.n].acc}, a tak je téma ${WORDS[sentence.n].themeGen} nezvyčajne sústredená: `
                + `${WORDS[sentence.n].tripleList} dostávajú viac priestoru než zvyčajne.`;
        case 'not-event':
            return `Neznamená to, že ${WORDS[sentence.n].notEvent}; znamená to, že ak ${WORDS[sentence.n].ready}, všetky tri hodiny ukazujú rovnakým smerom.`;
        case 'watch':
            return sentence.doubled
                ? `Keď je téma ${FORMS[sentence.n].gen} zdvojená, treba si dať pozor na ${WORDS[sentence.n].pressure}.`
                : `Treba si dať pozor na ${WORDS[sentence.n].pressure}.`;
        case 'short-term-headline':
            return `${capitalise(WORDS[sentence.year].themeIs)} témou roka, no tento mesiac aj tento deň si žiadajú ${WORDS[sentence.month].want}.`;
        case 'year':
            return `Tvoj rok ${FORMS[sentence.year].withIns} ${phrase(WORDS[sentence.year].year, sentence.month)}.`;
        case 'year-month':
            return `Tvoj rok ${FORMS[sentence.year].withIns} ${phrase(WORDS[sentence.year].year, sentence.month)}, `
                + `${sentence.link === 'and' ? 'pričom' : 'zatiaľ čo'} mesiac ${FORMS[sentence.month].withIns} ${WORDS[sentence.month].month}.`;
        case 'month':
            return `Mesiac ${FORMS[sentence.month].withIns} ${MONTH_STEADY[pairKey(sentence.year, sentence.month)]}.`;
        case 'month-inside':
            return MONTH_INSIDE[pairKey(sentence.year, sentence.month)](`mesiac ${FORMS[sentence.month].withIns}`);
        case 'month-repeats':
            return `Tento mesiac opakuje ${FORMS[sentence.month].acc}, a tak tému roka ešte zosilňuje: ${WORDS[sentence.month].concentrates}.`;
        case 'day':
            return `${capitalise(FORMS[sentence.day].nom)} tohto dňa ${DAY_ON_MONTH[pairKey(sentence.month, sentence.day)]}.`;
        case 'day-repeats':
            return `V tento deň sa ${FORMS[sentence.day].nom} zopakuje, takže v tomto mesiaci je to vhodnejší deň na `
                + `${WORDS[sentence.day].use} než na ${WORDS[sentence.year].moreOf}.`;
        case 'day-echo':
            return `${capitalise(FORMS[sentence.day].nom)} tohto dňa sa zhoduje s rokom, takže na jeden deň ${WORDS[sentence.day].echo}.`;
        case 'day-continues':
            return `${withoutSubject(DAY_ON_MONTH[pairKey(sentence.month, sentence.day)])}.`;
        case 'year-day':
            return `V roku ${FORMS[sentence.year].withIns} ${YEAR_OVER_DAY[pairKey(sentence.year, sentence.day)]}.`;
        case 'sequence':
            return `Symbolicky sa postupnosť presúva od dokončenia cez ${WORDS[sentence.month].themeAcc} k začiatku.`;
    }
};
