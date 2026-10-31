import { inSign } from '../../i18n/engineProse.js?v=f9ab0a6';
import { degreeText, involves, otherEnd, } from './astrologyInterpretation.js?v=f9ab0a6';
import { capitalise, listWords, spanAtMoment } from './astrologyVoice.js?v=f9ab0a6';
const SIGN = {
    Aries: {
        style: 'urobiť prvý krok a ísť veciam priamo naproti',
        styleMore: 'Prejavuje sa to rýchlymi začiatkami, chuťou do výziev a netrpezlivosťou pri čakaní.',
        drive: 'výzva, ktorej môžeš ísť naproti, a niečo, čo môžeš začať',
        driveMore: 'Ožívaš na začiatku vecí, keď treba urobiť krok a nikto ho ešte neurobil.',
        settle: 'možnosť konať podľa pocitu hneď',
        settleMore: 'Pocity zvyknú prichádzať rýchlo a chcú von; sedieť na nich je ťažšie než podľa nich konať.',
        surface: 'priamo, rýchlo a pripravene konať',
        manner: 'priamy, rýchly a akčný',
        surfaceMore: 'Prvý dojem zvykne byť energický a priamy, skôr než sa stihne ukázať niečo premyslenejšie.',
        mind: 'byť rýchle a rozhodné: názor si utvoríš rýchlo a radšej ho vyskúšaš, než ho budeš ďalej zvažovať',
        act: 'konať hneď a priamo; hybnosť prichádza ľahko, vytrvať pri niečom, čo už beží, stojí viac úsilia',
        relate: 'hovoriť priamo a s vrelosťou a rovnakú otvorenosť chceš aj späť',
        closeness: 'keď sa pocity môžu povedať hneď, a nie usmerňovať',
        pull: 'okamžitému konaniu',
        overuse: 'chuť začínať sa zmení na netrpezlivosť so všetkým, čo prichádza po začiatku',
        practice: 'včas si určiť, kto alebo čo vec ponesie, keď sa začiatok skončí',
        moonOveruse: 'podľa pocitov sa koná skôr, než sa im porozumie',
        moonPractice: 'dať silnému pocitu pár minút, kým podľa neho začneš konať',
    },
    Taurus: {
        style: 'budovať vytrvalo a držať sa toho, čo funguje',
        styleMore: 'Prejavuje sa to trpezlivosťou, vernosťou tomu, čo sa osvedčilo, a pokojným, nenáhlivým tempom.',
        drive: 'niečo pevné, čo sa dá budovať, a čas vybudovať to poriadne',
        driveMore: 'Dôveruješ tomu, čo vydrží, a radšej niečo urobíš pomaly a dobre než rýchlo a dvakrát.',
        settle: 'rutina, pohodlie a veci, ktoré zostávajú na svojom mieste',
        settleMore: 'Istota zvykne prichádzať z toho, čo je známe - z dostatku času, stálych zvykov a miesta, ktoré sa nemení.',
        surface: 'pokojne, stálo a nenáhlivo',
        manner: 'pokojný, stály a nenáhlivý',
        surfaceMore: 'Prvý dojem zvykne byť pokojný - pôsobíš ako niekto, koho nikto neponáhľa.',
        mind: 'byť rozvážne: názor mení pomaly, a keď ho už zmení, tak dôkladne',
        act: 'konať pomaly a vytrvať; keď sa niečo rozbehne, vytrvalosť je dôležitejšia než rýchlosť',
        relate: 'prejavovať starostlivosť spoľahlivosťou a prítomnosťou a ceníš si to, na čo sa dá spoľahnúť',
        closeness: 'keď je stála a nenáhlivá a má zvyky, ktoré zdieľate',
        pull: 'stabilite',
        overuse: 'stálosť sa zmení na držanie postoja dlho po tom, čo zmizol jeho dôvod',
        practice: 'vopred si určiť dátum, keď sa k ustálenému rozhodnutiu vrátiš, aby zmena prišla ako voľba, a nie ako hrozba',
        moonOveruse: 'pohodlie sa stane spôsobom, ako si nevšimnúť, že treba niečo zmeniť',
        moonPractice: 'všímať si, kedy sa zo zvyku, ktorý ťa držal, stal spôsob, ako sa niečomu vyhnúť',
    },
    Gemini: {
        style: 'zvedavosť, prepájanie a viacero rozbehnutých nití naraz',
        styleMore: 'Prejavuje sa to rýchlymi súvislosťami, množstvom záujmov a citom pre všetko nové.',
        drive: 'pestrosť, informácie a myšlienky na výmenu',
        driveMore: 'Ožívaš, keď je čo nové pochopiť a s kým to prebrať.',
        settle: 'rozhovor a niečo nové na premýšľanie',
        settleMore: 'Keď pocit vyslovíš, zvyčajne sa tým upokojí; odrezanie od kontaktu ťa zneistí viac, než sa zdá.',
        surface: 'zvedavo, pohotovo a zhovorčivo',
        manner: 'zvedavý, pohotový a zhovorčivý',
        surfaceMore: 'Prvý dojem zvykne byť pohotový a zaujatý - pôsobíš ako niekto, kto už kladie ďalšiu otázku.',
        mind: 'byť rýchle a asociatívne: rýchlo prepája veci a dokáže naraz udržať viac línií myšlienok',
        act: 'konať cez slová a myšlienky a najlepšie ti ide viac vecí naraz než jedna po druhej',
        relate: 'potrebovať rozhovor a ľahkosť; vzájomný záujem je rovnako dôležitý ako blízkosť',
        closeness: 'keď je v nej veľa rozhovoru a trochu priestoru na pohyb',
        pull: 'zvedavosti',
        overuse: 'šírka sa stane spôsobom, ako nikdy nejsť do žiadnej veci tak hlboko, aby ťa preverila',
        practice: 'zvoliť si výslovný bod dokončenia, keď zvedavosť stále rozširuje pole, aby sa šírka zmenila na niečo použiteľné',
        moonOveruse: 'rozprávanie o pocite nahradí jeho prežitie',
        moonPractice: 'nechať pocit najprv prežiť a až potom ho vysvetľovať',
    },
    Cancer: {
        style: 'chrániť, starať sa a držať pohromade to, na čom záleží',
        styleMore: 'Prejavuje sa to ochranárstvom, dlhou pamäťou na to, ako sa veci cítili, a starostlivosťou o všetko, čo je tvoje.',
        drive: 'istota a ľudia, o ktorých sa môžeš starať',
        driveMore: 'Najlepšie ti je, keď sa o niečo staráš - o človeka, miesto či projekt - a vytváraš mu bezpečie na rast.',
        settle: 'blízkosť a bezpečné miesto, kam sa môžeš vracať',
        settleMore: 'Upokojuje ťa spolupatričnosť; pocit, že si mimo alebo v neistote, zvykne rozkolísať všetko ostatné.',
        surface: 'starostlivo, opatrne a ochranársky',
        manner: 'starostlivý, opatrný a ochranársky',
        surfaceMore: 'Prvý dojem zvykne byť starostlivý a trochu zdržanlivý - ochranárstvo, ktoré sa s dôverou otvára.',
        mind: 'nasledovať cit a pamäť: pamätáš si, ako sa veci povedali, a náladu čítaš skôr než argument',
        act: 'konať nepriamo a ochranársky, a najrázne v prospech niekoho alebo niečoho, na čom ti záleží',
        relate: 'dávať starostlivosť a ochranu a potrebuješ cítiť, že to, čo spolu budujete, je v bezpečí',
        closeness: 'keď sa na vzťah dá spoľahnúť, je vrelý a odchod aj návrat sú ľahké',
        pull: 'blízkosti a bezpečiu ľudí, na ktorých ti záleží',
        overuse: 'starostlivosť sa zmení na držanie - veci ostávajú tak, ako sú, lebo zmena pôsobí ako hrozba',
        practice: 'nechať ľudí, na ktorých ti záleží, riskovať po svojom',
        moonOveruse: 'zranenie sa skryje za starostlivosť o všetkých ostatných',
        moonPractice: 'povedať, čo potrebuješ, priamo, namiesto starania sa o druhých v nádeji, že si to všimnú',
    },
    Leo: {
        style: 'vrelosť, hrdosť a dávať sa naplno do toho, čo robíš',
        styleMore: 'Prejavuje sa to štedrosťou, hrdosťou na to, čo tvoríš, a túžbou robiť veci celým srdcom.',
        drive: 'tvorivé vyjadrenie a niečo, do čoho môžeš vložiť celé srdce',
        driveMore: 'Ožívaš, keď je to, čo robíš, rozpoznateľne tvoje a urobené celým srdcom.',
        settle: 'vrelosť a vedomie, že záležíš ľuďom, na ktorých záleží tebe',
        settleMore: 'Upokojuje ťa, keď ťa tvoji blízki oceňujú; prehliadnutie zvykne bolieť viac než otvorený nesúhlas.',
        surface: 'vrelo, sebaisto a výrazne',
        manner: 'vrelý, sebaistý a výrazný',
        surfaceMore: 'Prvý dojem zvykne byť vrelý a výrazný - pôsobíš ako niekto, kto naplní miestnosť bez snahy.',
        mind: 'byť sebaisté a výrazné: myšlienku rado predstaví celú a s presvedčením',
        act: 'konať odvážne a celým srdcom a najviac vkladáš do toho, čo ťa napĺňa hrdosťou',
        relate: 'štedro dávať a otvorene prejavovať city a chceš, aby sa náklonnosť ukazovala, nie predpokladala',
        closeness: 'keď sa náklonnosť ukazuje otvorene a často',
        pull: 'uznaniu a pozornosti',
        overuse: 'hrdosť sťažuje prijať kritiku alebo ustúpiť, keď patrí chvíľa niekomu inému',
        practice: 'dať chvíľam iných ľudí rovnako veľa priestoru ako tým svojim',
        moonOveruse: 'potreba ocenenia môže potichu rozhodovať o tom, čo robíš',
        moonPractice: 'požiadať o ocenenie otvorene, namiesto ešte väčšej práce v nádeji, že si ju niekto všimne',
    },
    Virgo: {
        style: 'všímať si, čo by mohlo fungovať lepšie, a trpezlivo to dotiahnuť',
        styleMore: 'Prejavuje sa to okom pre detail, ktorý nesedí, trpezlivosťou pri starostlivej práci a tým, že veci radšej zlepšuješ, než obdivuješ.',
        drive: 'schopnosť, užitočnosť a dobre urobená vec',
        driveMore: 'Ožívaš, keď má úloha správne riešenie a štandard si určuješ ty.',
        settle: 'poriadok, užitočnosť a problém, ktorý sa naozaj dá vyriešiť',
        settleMore: 'Keď dáš do poriadku niečo navonok, zvykne sa upokojiť aj vnútro; s pocitom, s ktorým sa nedá nič urobiť, sa žije ťažšie.',
        surface: 'skromne, presne a pozorne',
        manner: 'skromný, presný a pozorný',
        surfaceMore: 'Prvý dojem zvykne byť pozorný a zdržanlivý - pôsobíš ako niekto, kto si najprv všíma detaily a až potom hovorí.',
        mind: 'byť presné a analytické: všíma si detail, ktorý nesedí, a chce ho opraviť',
        act: 'konať skôr efektívne než silou a vkladať úsilie presne tam, kde robí rozdiel',
        relate: 'prejavovať starostlivosť pozornosťou a praktickou pomocou - všimnúť si podstatné a vyriešiť problém skôr, než ho niekto spomenie',
        closeness: 'keď je starostlivosť praktická a nikto nemusí hádať, čo treba',
        pull: 'tomu, aby veci boli presne správne',
        overuse: 'oko pre to, čo by mohlo byť lepšie, sa obráti dovnútra a nič mu nie je dosť dobré',
        practice: 'vopred si určiť, čo znamená „dosť dobré“, namiesto posudzovania až na konci',
        moonOveruse: 'z úzkosti sa stane zoznam úloh, takže samotnému pocitu sa nikto nevenuje',
        moonPractice: 'pomenovať, čo cítiš, skôr než začneš čokoľvek opravovať',
    },
    Libra: {
        style: 'rovnováha, férovosť a zvažovanie každej strany pred voľbou',
        styleMore: 'Prejavuje sa to taktom, zmyslom pre mieru a zvykom rýchlo vidieť aj druhú stranu.',
        drive: 'férovosť, harmónia a dobré partnerstvo',
        driveMore: 'Ožívaš, keď sú veci férové a v správnej miere a keď je s kým ich premyslieť.',
        settle: 'harmónia, férovosť a niekto, s kým sa dajú veci prebrať',
        settleMore: 'Nevyriešený nesúhlas ťa zvykne znepokojovať, kým sa nenapraví; pokoj okolo teba a pokoj v tebe spolu úzko súvisia.',
        surface: 'príjemne, uvážlivo a diplomaticky',
        manner: 'príjemný, uvážlivý a diplomatický',
        surfaceMore: 'Prvý dojem zvykne byť zdvorilý a vyvážený - pôsobíš ako niekto, kto zvažuje, ako veci dopadnú.',
        mind: 'zvažovať obe strany: druhý pohľad vidíš rýchlo a rozhodnutie môže trvať dlhšie než pochopenie',
        act: 'konať cez vyjednávanie a presviedčanie skôr než cez konfrontáciu a hľadať férový krok',
        relate: 'ceniť si partnerstvo, férovosť a ladnosť a snažíš sa udržať veci v rovnováhe',
        closeness: 'keď sa nezhody preberú a vyriešia, namiesto toho, aby sa nechali tak',
        pull: 'pokoju a harmónii',
        overuse: 'zvažovanie každej strany sa stane spôsobom, ako si nikdy nevybrať ani jednu',
        practice: 'dať rozhodnutiu termín a dodržať ho',
        moonOveruse: 'túžba po harmónii necháva tvoju vlastnú preferenciu nevyslovenú, až kým sa už nedá udržať',
        moonPractice: 'povedať svoju preferenciu ako prvú, skôr než sa prispôsobíš ostatným',
    },
    Scorpio: {
        style: 'hĺbka, intenzita a dostať sa veciam na koreň',
        styleMore: 'Prejavuje sa to sústredením, vernosťou a odmietaním uspokojiť sa s povrchom čohokoľvek.',
        drive: 'hĺbka, pravda a niečo, čomu sa oplatí oddať celkom',
        driveMore: 'Ožívaš, keď na niečom záleží natoľko, že sa tomu oddáš úplne, a keď vidíš pod jeho povrch.',
        settle: 'dôvera, súkromie a blízkosť, ktorá je skutočná, nie zdvorilá',
        settleMore: 'Upokojuje ťa dôvera a dávaš ju pomaly; kontakt, ktorý ostáva na povrchu, ťa skôr zatvorí, než otvorí.',
        surface: 'zdržanlivo, ostražito a intenzívne',
        manner: 'zdržanlivý, ostražitý a intenzívny',
        surfaceMore: 'Prvý dojem zvykne byť zdržanlivý a pozorný - pôsobíš ako niekto, kto si všíma viac, než povie.',
        mind: 'ísť do hĺbky: hľadá to, čo je skryté alebo nevyslovené, a otázku len tak nepustí',
        act: 'konať sústredene a vytrvalo a oddať sa naplno, keď sa rozhodneš, že na niečom záleží',
        relate: 'chcieť hĺbku a vernosť a dávať sa naplno, keď je tu dôvera',
        closeness: 'keď je úprimná a súkromná a keď sa dôvera buduje krok za krokom',
        pull: 'hĺbke a kontrole',
        overuse: 'intenzita sa zmení na kontrolu - držanie postojov alebo krívd dlho po tom, čo prestali slúžiť',
        practice: 'nahlas povedať, čo strážiš, aby dôvera nemusela byť najprv preskúšaná, kým sa dá',
        moonOveruse: 'zranenie zíde do podzemia a zmení sa na nedôveru',
        moonPractice: 'pomenovať zranenie, kým je ešte malé',
    },
    Sagittarius: {
        style: 'zmysel, sloboda a pohľad ďalej než na situáciu pred tebou',
        styleMore: 'Prejavuje sa to optimizmom, priamosťou a potrebou mať niečo, k čomu sa oplatí mieriť.',
        drive: 'zmysel, sloboda a širší obzor',
        driveMore: 'Ožívaš, keď je čo väčšie pochopiť alebo keď je smer, ktorým sa oplatí vydať.',
        settle: 'sloboda, optimizmus a niečo, na čo sa môžeš tešiť',
        settleMore: 'Upokojuje ťa priestor na pohyb a zmysel pre to, kam veci smerujú; pocit ohradenia ťa zvykne rýchlo znepokojiť.',
        surface: 'otvorene, nadšene a priamo',
        manner: 'otvorený, nadšený a priamy',
        surfaceMore: 'Prvý dojem zvykne byť otvorený a nadšený - pôsobíš ako niekto, kto už hľadí na to, čo príde.',
        mind: 'hľadať celkový obraz a zmysel za detailom a najlepšie mu ide, keď sa môže široko rozletieť',
        act: 'konať s nadšením a zmyslom pre smer a najrýchlejšie sa pohneš k niečomu, čo pre teba niečo znamená',
        relate: 'prejavovať vrelosť, priamosť a štedrosť a potrebuješ v tom priestor ďalej rásť',
        closeness: 'keď blízkosť nechá priestor pre nezávislosť aj pre spoločné plány',
        pull: 'slobode',
        overuse: 'hľadanie niečoho väčšieho robí súčasný záväzok menším, než v skutočnosti je',
        practice: 'prepojiť každodennú úlohu s väčším zmyslom, ktorému slúži, aby prestala pôsobiť ako obchádzka',
        moonOveruse: 'nepokoj prevezme vládu vždy, keď ťa pocit žiada zostať na mieste',
        moonPractice: 'vydržať s nepríjemným pocitom o chvíľu dlhšie, než začneš hľadať východ',
    },
    Capricorn: {
        style: 'zodpovednosť, dlhodobé plánovanie a budovanie niečoho, čo vydrží',
        styleMore: 'Prejavuje sa to disciplínou, trpezlivosťou s dlhými projektmi a silným zmyslom pre zodpovednosť.',
        drive: 'výsledky a dlhodobá štruktúra, ktorú môžeš budovať',
        driveMore: 'Ožívaš, keď je tu skutočný cieľ, jasná zodpovednosť a ešte dlhá cesta pred tebou.',
        settle: 'štruktúra, spoľahlivosť a vedomie, na čom si',
        settleMore: 'Upokojuje ťa, keď máš veci v rukách a vieš, čo sa očakáva; keď nevieš, na čom si, zvykne ťa to znepokojiť.',
        surface: 'vyrovnane, vážne a schopne',
        manner: 'vyrovnaný, vážny a schopný',
        surfaceMore: 'Prvý dojem zvykne byť vyrovnaný a schopný - vrelosť sa ukáže, keď je tu dôvera.',
        mind: 'byť praktické a strategické: plánuje po etapách a pýta sa, čo naozaj bude fungovať',
        act: 'konať disciplinovane a trpezlivo a vytrvalo pracovať na cieľoch s dlhým horizontom',
        relate: 'prejavovať starostlivosť spoľahlivosťou a záväzkom a to, čo spolu budujete, berieš vážne',
        closeness: 'keď sa na vzťah dá spoľahnúť a záväzky sa dodržiavajú',
        pull: 'tomu, aby bola práca urobená poriadne',
        overuse: 'túžba po výsledkoch nemá prirodzený koniec a ďalší cieľ príde skôr, než si užiješ ten posledný',
        practice: 'vložiť kúsok odmeny priamo do práce, namiesto jej odkladania, kým nebude všetko hotové',
        moonOveruse: 'pocity sa riadia, namiesto toho, aby sa prežívali',
        moonPractice: 'dovoliť si pocit, ktorý nemá žiadny úžitok ani riešenie',
    },
    Aquarius: {
        style: 'nezávislosť, princíp a hľadanie lepšieho spôsobu, ako robiť veci',
        styleMore: 'Prejavuje sa to nezávislosťou, silným zmyslom pre princíp a zvykom spochybňovať, ako sa veci zvyčajne robia.',
        drive: 'nezávislosť a lepší spôsob, ako robiť veci',
        driveMore: 'Ožívaš, keď môžeš myslieť po svojom a zlepšiť, ako niečo funguje pre všetkých zúčastnených.',
        settle: 'priestor, nezávislosť a priateľstvo, ktoré ťa nedusí',
        settleMore: 'Upokojuje ťa priestor byť sebou; blízkosť, ktorá od teba žiada vzdať sa nezávislosti, ťa zvykne znepokojiť.',
        surface: 'priateľsky, nezávisle a ťažko predvídateľne',
        manner: 'priateľský, nezávislý a ťažko predvídateľný',
        surfaceMore: 'Prvý dojem zvykne byť priateľský s istým odstupom - pôsobíš ako niekto, kto ide po svojej línii.',
        mind: 'byť nezávislé a systematické: spochybňuje zaužívané predpoklady a hľadá za nimi princíp',
        act: 'konať podľa princípu a po svojom a odpor ťa skôr posilní v odhodlaní, než oslabí',
        relate: 'ceniť si priateľstvo, úprimnosť a priestor a potrebuješ v tom zostať sebou',
        closeness: 'keď v nej je priateľstvo a dosť priestoru',
        pull: 'nezávislosti',
        overuse: 'odstup drží konkrétneho človeka v rovnakej vzdialenosti ako všeobecnú otázku',
        practice: 'dovoliť jednému konkrétnemu človeku, aby záležal viac než princíp',
        moonOveruse: 'odstup sa stane predvolenou voľbou vždy, keď sa blízkosť skomplikuje',
        moonPractice: 'povedať niekomu blízkemu, čo potrebuješ, skôr než sa stiahneš',
    },
    Pisces: {
        style: 'citlivosť, predstavivosť a vnímanie viac, než sa povie',
        styleMore: 'Prejavuje sa to empatiou, predstavivosťou a rýchlym vnímaním nálady v miestnosti.',
        drive: 'zmysel, predstavivosť a pocit spojenia s niečím väčším',
        driveMore: 'Ožívaš, keď ťa niečo pohne a tvoja predstavivosť má priestor pracovať.',
        settle: 'pokoj, ticho a čas, aby sa pocity usadili samy',
        settleMore: 'Upokojuje ťa čas osamote na vstrebanie toho, čo sa v tebe nazbieralo; hluk a ostré hrany ťa zvyknú rýchlo vyčerpať.',
        surface: 'jemne, vnímavo a ťažko uchopiteľne',
        manner: 'jemný, vnímavý a ťažko uchopiteľný',
        surfaceMore: 'Prvý dojem zvykne byť jemný a otvorený - pôsobíš ako niekto, kto vníma náladu skôr, než veľa povie.',
        mind: 'byť intuitívne a obrazotvorné: celok uchopí skôr, než vie vysvetliť jeho časti',
        act: 'konať cez vplyv a vytrvalosť skôr než silou a najlepšie ti ide, keď ťa niečo inšpiruje',
        relate: 'prejavovať súcit a oddanosť a potrebuješ nehu na oplátku',
        closeness: 'keď je jemná a je čas stiahnuť sa a vrátiť',
        pull: 'intuícii',
        overuse: 'otvorenosť vníma toľko z nálady okolo teba, že tú svoju je ťažké nájsť',
        practice: 'stanoviť si jasné hranice toho, čo na seba berieš, aby sa súcit nezmenil na zahltenie',
        moonOveruse: 'nálady iných vytlačia tvoju vlastnú',
        moonPractice: 'nájsť si čas osamote a oddeliť vlastné pocity od tých, ktoré prišli z okolia',
    },
};
/* ---------------------------------------------------------- the planets -- */
const NOM = {
    Sun: 'Slnko', Moon: 'Mesiac', Mercury: 'Merkúr', Venus: 'Venuša', Mars: 'Mars', Jupiter: 'Jupiter',
    Saturn: 'Saturn', Uranus: 'Urán', Neptune: 'Neptún', Pluto: 'Pluto',
    'North Node': 'severný uzol', 'South Node': 'južný uzol',
};
const INS = {
    Sun: 'Slnkom', Moon: 'Mesiacom', Mercury: 'Merkúrom', Venus: 'Venušou', Mars: 'Marsom', Jupiter: 'Jupiterom',
    Saturn: 'Saturnom', Uranus: 'Uránom', Neptune: 'Neptúnom', Pluto: 'Plutom',
    'North Node': 'severným uzlom', 'South Node': 'južným uzlom',
};
const DAT = {
    Sun: 'Slnku', Moon: 'Mesiacu', Mercury: 'Merkúru', Venus: 'Venuši', Mars: 'Marsu', Jupiter: 'Jupiteru',
    Saturn: 'Saturnu', Uranus: 'Uránu', Neptune: 'Neptúnu', Pluto: 'Plutu',
    'North Node': 'severnému uzlu', 'South Node': 'južnému uzlu',
};
const GEN = {
    Sun: 'Slnka', Moon: 'Mesiaca', Mercury: 'Merkúra', Venus: 'Venuše', Mars: 'Marsu', Jupiter: 'Jupitera',
    Saturn: 'Saturna', Uranus: 'Uránu', Neptune: 'Neptúna', Pluto: 'Pluta',
    'North Node': 'severného uzla', 'South Node': 'južného uzla',
};
const GENDER = {
    Sun: 'n', Moon: 'm', Mercury: 'm', Venus: 'f', Mars: 'm', Jupiter: 'm', Saturn: 'm', Uranus: 'm',
    Neptune: 'm', Pluto: 'n', 'North Node': 'm', 'South Node': 'm',
};
const Nom = (point) => capitalise(NOM[point]);
/** "s Marsom" / "so Saturnom": the preposition takes its vowel before a hissing consonant. */
const withPrep = (ins) => `${/^[sSzZšŠžŽ]/.test(ins) ? 'so' : 's'} ${ins}`;
/** "k Mesiacu" / "ku kontrole". */
const toPrep = (dat) => `${/^[kKgG]/.test(dat) ? 'ku' : 'k'} ${dat}`;
const FUNCTION = {
    Sun: { nom: 'tvoje smerovanie', acc: 'tvoje smerovanie', dat: 'tvojmu smerovaniu', ins: 'tvojím smerovaním', plural: false },
    Moon: { nom: 'tvoj citový život', acc: 'tvoj citový život', dat: 'tvojmu citovému životu', ins: 'tvojím citovým životom', plural: false },
    Mercury: { nom: 'tvoje myslenie', acc: 'tvoje myslenie', dat: 'tvojmu mysleniu', ins: 'tvojím myslením', plural: false },
    Venus: { nom: 'tvoje vzťahy', acc: 'tvoje vzťahy', dat: 'tvojim vzťahom', ins: 'tvojimi vzťahmi', plural: true },
    Mars: { nom: 'tvoje konanie', acc: 'tvoje konanie', dat: 'tvojmu konaniu', ins: 'tvojím konaním', plural: false },
    Jupiter: { nom: 'tvoj zmysel pre možnosti', acc: 'tvoj zmysel pre možnosti', dat: 'tvojmu zmyslu pre možnosti', ins: 'tvojím zmyslom pre možnosti', plural: false },
    Saturn: { nom: 'tvoj zmysel pre zodpovednosť', acc: 'tvoj zmysel pre zodpovednosť', dat: 'tvojmu zmyslu pre zodpovednosť', ins: 'tvojím zmyslom pre zodpovednosť', plural: false },
    Uranus: { nom: 'tvoja potreba nezávislosti', acc: 'tvoju potrebu nezávislosti', dat: 'tvojej potrebe nezávislosti', ins: 'tvojou potrebou nezávislosti', plural: false },
    Neptune: { nom: 'tvoja predstavivosť', acc: 'tvoju predstavivosť', dat: 'tvojej predstavivosti', ins: 'tvojou predstavivosťou', plural: false },
    Pluto: { nom: 'tvoja intenzita', acc: 'tvoju intenzitu', dat: 'tvojej intenzite', ins: 'tvojou intenzitou', plural: false },
    'North Node': { nom: 'tvoj zmysel pre smer', acc: 'tvoj zmysel pre smer', dat: 'tvojmu zmyslu pre smer', ins: 'tvojím zmyslom pre smer', plural: false },
    'South Node': { nom: 'to, čo ti ide samo', acc: 'to, čo ti ide samo', dat: 'tomu, čo ti ide samo', ins: 'tým, čo ti ide samo', plural: false },
};
/** A list of functions with the possessive said once: „tvoje smerovanie, myslenie, vzťahy a konanie“. */
const fnList = (points) => {
    const items = points.map((point) => FUNCTION[point].nom);
    const lead = items[0]?.split(' ')[0] ?? '';
    const shared = lead === 'tvoje' || lead === 'tvoj' || lead === 'tvoja';
    return and(items.map((item, index) => (shared && index > 0 && item.startsWith(`${lead} `) ? item.slice(lead.length + 1) : item)));
};
/** What a planet adds at a hard angle, as the thing another function comes to carry (accusative). */
const HARD_EFFECT = {
    Sun: 'tlak dokazovať sa',
    Moon: 'náladovosť a rýchle reakcie',
    Mercury: 'neustále prehodnocovanie',
    Venus: 'ťah k pohodliu a uznaniu',
    Mars: 'naliehavosť a trenie',
    Jupiter: 'prehnanosť a sľubovanie priveľa',
    Saturn: 'opatrnosť a sebakritiku',
    Uranus: 'nepokoj a náhle zmeny smeru',
    Neptune: 'pochybnosti a idealizmus',
    Pluto: 'intenzitu a potrebu kontroly',
    'North Node': 'ťah k neznámemu',
    'South Node': 'ťah k známemu',
};
/** What a planet lends when it meets another easily (accusative). */
const SOFT_EFFECT = {
    Sun: 'zmysel',
    Moon: 'cit',
    Mercury: 'jasnosť',
    Venus: 'vrelosť a ľahkosť',
    Mars: 'energiu',
    Jupiter: 'sebadôveru a rozlet',
    Saturn: 'stálosť a disciplínu',
    Uranus: 'originalitu',
    Neptune: 'predstavivosť a zmysel pre niečo väčšie',
    Pluto: 'hĺbku a vytrvalosť',
    'North Node': 'smer',
    'South Node': 'ľahkosť',
};
const ELEMENT_NOM = { Fire: 'oheň', Earth: 'zem', Air: 'vzduch', Water: 'voda' };
const ELEMENT_GEN = { Fire: 'ohňa', Earth: 'zeme', Air: 'vzduchu', Water: 'vody' };
/** "the only water placement": the adjective agreeing with "postavenie". */
const ELEMENT_ADJ = {
    Fire: 'ohnivé', Earth: 'zemské', Air: 'vzdušné', Water: 'vodné',
};
const ELEMENT_LABEL = { Fire: 'Oheň', Earth: 'Zem', Air: 'Vzduch', Water: 'Voda' };
/** What an element leans on (accusative, after "opiera o"). */
const ELEMENT_THEME = {
    Fire: 'energiu, iniciatívu a nadšenie',
    Earth: 'praktickosť, trpezlivosť a viditeľné výsledky',
    Air: 'myšlienky, rozhovor a nadhľad',
    Water: 'cit, intuíciu a citovú hĺbku',
};
const ELEMENT_SHORT = {
    Fire: 'iniciatívu', Earth: 'praktickosť', Air: 'myšlienky', Water: 'cit',
};
const ELEMENT_OVERUSE = {
    Fire: 'nadšenie predbehne dotiahnutie',
    Earth: 'praktickosť odmietne všetko, čo sa nedá zmerať',
    Air: 'premýšľanie o pocite nahradí jeho prežitie',
    Water: 'cit zaplaví úsudok',
};
const ELEMENT_PRACTICE = {
    Fire: 'rozložiť si začiatok tak, aby zostalo aj na koniec',
    Earth: 'nechať priestor aj tomu, čo sa nedá naplánovať ani dokázať',
    Air: 'všimnúť si pocit skôr, než ho začneš vysvetľovať',
    Water: 'dať pocitu čas, kým podľa neho začneš konať',
};
/** What a Venus in each element tends to give, and a Moon to ask for (accusative). */
const ELEMENT_GIVE = {
    Fire: 'nadšenie a vrelosť',
    Earth: 'spoľahlivosť a praktickú starostlivosť',
    Air: 'rozhovor a ľahkosť',
    Water: 'nehu a vnímavosť',
};
const ELEMENT_NEED = {
    Fire: 'vrelosť a pozornosť',
    Earth: 'stálosť a praktickú starostlivosť',
    Air: 'rozhovor a trochu priestoru',
    Water: 'citovú blízkosť',
};
const MODALITY_ADJ = { Cardinal: 'kardinálnych', Fixed: 'pevných', Mutable: 'premenlivých' };
const MODALITY_ADJ_PL_NOM = { Cardinal: 'kardinálne', Fixed: 'pevné', Mutable: 'premenlivé' };
const MODALITY_ADJ_DAT = { Cardinal: 'kardinálnej', Fixed: 'pevnej', Mutable: 'premenlivej' };
const MODALITY_LABEL = { Cardinal: 'Kardinálna', Fixed: 'Pevná', Mutable: 'Premenlivá' };
const MODALITY_ACC = { Cardinal: 'kardinálnu', Fixed: 'pevnú', Mutable: 'premenlivú' };
/** The mode's way of working (nominative). */
const MODALITY_THEME = {
    Cardinal: 'začínanie a uvádzanie vecí do pohybu',
    Fixed: 'držanie kurzu a dotiahnutie vecí do konca',
    Mutable: 'prispôsobovanie sa a otvorené možnosti',
};
/** How a knot's pressure is met, by the members' shared mode (instrumental). */
const MODALITY_RESPONSE = {
    Cardinal: 'činom, nie čakaním',
    Fixed: 'vytrvaním, nie ustúpením',
    Mutable: 'prispôsobením, nie priamou konfrontáciou',
};
const MODALITY_OVERUSE = {
    Cardinal: 'začne sa viac, než sa dá uniesť',
    Fixed: 'drží sa aj toho, čo už prestalo fungovať',
    Mutable: 'možnosti ostávajú otvorené tak dlho, že sa nič neuzavrie',
};
const MODALITY_PRACTICE = {
    Cardinal: 'dokončiť jednu vec, skôr než začneš ďalšiu',
    Fixed: 'určiť si bod, keď sa záväzok prehodnotí',
    Mutable: 'zvoliť si výslovný bod dokončenia',
};
/** Whole Sign houses, as the part of life each stands for (instrumental, after "spojenej s"). */
const HOUSE_AREA = {
    1: 'tvojou vlastnou prítomnosťou a tým, ako vstupuješ do sveta',
    2: 'zdrojmi a tým, čo si ceníš',
    3: 'učením, komunikáciou a tvojím bezprostredným okolím',
    4: 'domovom, koreňmi a tvojím súkromným zázemím',
    5: 'tvorivosťou, radosťou a sebavyjadrením',
    6: 'každodennou prácou a rutinou',
    7: 'blízkymi partnerstvami',
    8: 'spoločnými zdrojmi, intimitou a tým, čo zostáva skryté',
    9: 'presvedčeniami, štúdiom a širšími obzormi',
    10: 'verejným životom a smerom, ktorým ideš vo svete',
    11: 'priateľstvami, skupinami a spoločnými cieľmi',
    12: 'samotou a tým, čo sa deje mimo dohľadu',
};
/** `v dvanástom dome` - a house by its ordinal, in the locative. */
const HOUSE_IN = {
    1: 'v prvom dome', 2: 'v druhom dome', 3: 'v treťom dome', 4: 'vo štvrtom dome',
    5: 'v piatom dome', 6: 'v šiestom dome', 7: 'v siedmom dome', 8: 'v ôsmom dome',
    9: 'v deviatom dome', 10: 'v desiatom dome', 11: 'v jedenástom dome', 12: 'v dvanástom dome',
};
/* A luminary's house, as what it changes about the drive or the need it holds
   - the arena, never an event in it. Completes `..., takže ...`. */
const SUN_HOUSE = {
    1: 'to, čo ťa poháňa, sa zvykne priamo ukazovať v tom, ako sa nesieš',
    2: 'táto hnacia sila zvykne smerovať do budovania niečoho pevného a vlastného',
    3: 'táto hnacia sila zvykne bežať na zvedavosti a na preberaní vecí v rozhovore',
    4: 'táto hnacia sila zvykne smerovať skôr do súkromného zázemia než do verejného postavenia',
    5: 'táto hnacia sila zvykne potrebovať niečo, čo môže tvoriť a čím sa môže tešiť',
    6: 'táto hnacia sila sa zvykne ukazovať v každodennej práci a v užitočnosti',
    7: 'táto hnacia sila zvykne ožiť v partnerstve, po boku druhého človeka',
    8: 'táto hnacia sila zvykne ísť skôr do hĺbky než do šírky',
    9: 'táto hnacia sila zvykne hľadať zmysel a väčší obraz',
    10: 'táto hnacia sila zvykne záležať na tom, aby bolo vidieť, čo robíš a kam to vedie',
    11: 'táto hnacia sila zvykne fungovať najlepšie medzi ľuďmi a pre niečo spoločné',
    12: 'táto hnacia sila zvykne pracovať potichu a mimo dohľadu',
};
const MOON_HOUSE = {
    1: 'city sa zvyknú ukázať na povrchu, často skôr, než ich pomenuješ',
    2: 'pocit pokoja úzko súvisí s tým, že máš niečo pevné a vlastné',
    3: 'upokojuje ťa prebrať veci a byť v kontakte s tým, čo je nablízku',
    4: 'domov a súkromné zázemie veľmi ovplyvňujú, ako pokojne sa cítiš',
    5: 'hra a sebavyjadrenie patria k tomu, ako sa zotavuješ',
    6: 'upokojuje ťa pracovná rutina a neporiadok v nej ťa zvykne rozhodiť',
    7: 'to, ako sa cítiš, úzko súvisí s človekom, ktorý ti je najbližší',
    8: 'city idú do hĺbky a zdieľajú sa len tam, kde je veľká dôvera',
    9: 'upokojuje ťa priestor učiť sa, objavovať a vidieť ďalej',
    10: 'to, ako pokojne sa cítiš, úzko súvisí s tým, kde stojíš a kam smeruješ',
    11: 'upokojuje ťa príslušnosť ku skupine alebo k spoločnému cieľu',
    12: 'city sa zvyknú spracovať neskôr, v súkromí',
};
const ANGLE_PHRASE = {
    Ascendant: 'priamo na ascendente',
    Midheaven: 'priamo na najvyššom bode mapy',
    Descendant: 'priamo na descendente, oproti ascendentu',
    'Imum Coeli': 'priamo na najnižšom bode mapy',
};
const ANGLE_GEN = {
    Ascendant: 'ascendentu', Midheaven: 'Medium Coeli', Descendant: 'descendentu', 'Imum Coeli': 'Imum Coeli',
};
const SIGN_NOM = {
    Aries: 'Baran', Taurus: 'Býk', Gemini: 'Blíženci', Cancer: 'Rak', Leo: 'Lev', Virgo: 'Panna',
    Libra: 'Váhy', Scorpio: 'Škorpión', Sagittarius: 'Strelec', Capricorn: 'Kozorožec', Aquarius: 'Vodnár', Pisces: 'Ryby',
};
const SIGN_DAT = {
    Aries: 'Baranovi', Taurus: 'Býkovi', Gemini: 'Blížencom', Cancer: 'Rakovi', Leo: 'Levovi', Virgo: 'Panne',
    Libra: 'Váham', Scorpio: 'Škorpiónovi', Sagittarius: 'Strelcovi', Capricorn: 'Kozorožcovi', Aquarius: 'Vodnárovi', Pisces: 'Rybám',
};
const SIGN_ELEMENT = {
    Aries: 'Fire', Taurus: 'Earth', Gemini: 'Air', Cancer: 'Water', Leo: 'Fire', Virgo: 'Earth',
    Libra: 'Air', Scorpio: 'Water', Sagittarius: 'Fire', Capricorn: 'Earth', Aquarius: 'Air', Pisces: 'Water',
};
const SIGN_MODALITY = {
    Aries: 'Cardinal', Taurus: 'Fixed', Gemini: 'Mutable', Cancer: 'Cardinal', Leo: 'Fixed', Virgo: 'Mutable',
    Libra: 'Cardinal', Scorpio: 'Fixed', Sagittarius: 'Mutable', Capricorn: 'Cardinal', Aquarius: 'Fixed', Pisces: 'Mutable',
};
const and = (items) => listWords(items, 'a');
const or = (items) => listWords(items, 'alebo');
/** "Tri tvoje postavenia stoja" / "Päť tvojich postavení stojí" - the count governs the case. */
function countPlacements(value) {
    if (value === 3)
        return 'Tri tvoje postavenia sú';
    if (value === 4)
        return 'Štyri tvoje postavenia sú';
    const words = ['Nula', 'Jedno', 'Dve', 'Tri', 'Štyri', 'Päť', 'Šesť', 'Sedem', 'Osem', 'Deväť', 'Desať'];
    return `${words[value] ?? value} tvojich postavení je`;
}
const ALL_OF = { 2: 'Obe', 3: 'Všetky tri', 4: 'Všetky štyri', 5: 'Všetkých päť' };
/** "Všetky štyri stoja" / "Všetkých päť stojí" - from five up the verb goes singular. */
const allStand = (value) => (value >= 5
    ? `${ALL_OF[value] ?? `Všetkých ${value}`} je`
    : `${ALL_OF[value] ?? 'Všetky'} sú`);
const HARD_CONJUNCTION = new Set(['Saturn', 'Mars', 'Pluto', 'Uranus']);
/** One aspect, said as what it does to the planet it is read from. */
function link(aspect, from) {
    const other = otherEnd(aspect, from);
    const subject = Nom(from);
    const fn = FUNCTION[from];
    const carries = fn.plural ? 'zvyknú niesť' : 'zvykne niesť';
    switch (aspect.kind) {
        case 'conjunction':
            return HARD_CONJUNCTION.has(other)
                ? `${subject} stojí spolu ${withPrep(INS[other])}, takže ${fn.nom} ${carries} ${HARD_EFFECT[other]}.`
                : `${subject} stojí spolu ${withPrep(INS[other])}, takže ${fn.nom} a ${FUNCTION[other].nom} zvyknú fungovať ako jedno.`;
        case 'opposition':
            return `${subject} stojí oproti ${DAT[other]} na druhej strane mapy, takže ${fn.nom} a ${FUNCTION[other].nom} sa skôr striedajú, než by splynuli.`;
        case 'square':
            return `${subject} je v rozpore ${withPrep(INS[other])}, takže ${fn.nom} ${carries} ${HARD_EFFECT[other]}.`;
        case 'trine':
            return `${subject} ľahko spolupracuje ${withPrep(INS[other])}, čo ${fn.dat} zvykne dodávať ${SOFT_EFFECT[other]}.`;
        default:
            return `${subject} môže spolupracovať ${withPrep(INS[other])}, čo ${fn.dat} môže dodať ${SOFT_EFFECT[other]}, keď to využiješ.`;
    }
}
/** How a knot member meets its centre, with the pronoun agreeing with the centre. */
function knotVerb(aspect, center, plural) {
    const feminine = GENDER[center] === 'f';
    switch (aspect.kind) {
        case 'conjunction': return `${plural ? 'stoja' : 'stojí'} priamo pri ${feminine ? 'nej' : 'ňom'}`;
        case 'opposition': return `${plural ? 'stoja' : 'stojí'} oproti ${feminine ? 'nej' : 'nemu'} na druhej strane mapy`;
        case 'square': return `${plural ? 'ťahajú' : 'ťahá'} proti ${feminine ? 'nej' : 'nemu'}`;
        case 'trine': return `${feminine ? 'ju' : 'ho'} ľahko ${plural ? 'podporujú' : 'podporuje'}`;
        default: return `${feminine ? 'jej' : 'mu'} ${plural ? 'pomáhajú' : 'pomáha'}`;
    }
}
/** Členovia uzla, jedna veta na druh väzby: dve planéty, ktoré obe stoja oproti, sa povedia raz. */
function knotClauses(links, center) {
    const groups = [];
    for (const entry of links) {
        const group = groups.find((one) => one.aspect.kind === entry.kind);
        if (group)
            group.points.push(otherEnd(entry, center));
        else
            groups.push({ aspect: entry, points: [otherEnd(entry, center)] });
    }
    return and(groups.map((group) => `${and(group.points.map((point) => Nom(point)))} ${knotVerb(group.aspect, center, group.points.length > 1)}`));
}
const DIGNITY_LINE = {
    Mercury: {
        Domicile: 'Merkúr je tam vo vlastnom znamení, takže tento spôsob myslenia prichádza prirodzene a s istotou.',
        Exaltation: 'Merkúr je tam v znamení, ktoré tradícia pokladá za mimoriadne priaznivé. Tradícia to číta ako tento spôsob myslenia v najostrejšej podobe.',
        Detriment: 'Merkúr tam stojí v znamení oproti svojmu vlastnému, takže tento spôsob myslenia si žiada viac vedomého úsilia, než sa zdá.',
        Fall: 'Merkúr je tam v znamení, ktoré tradícia pokladá za náročné. Tradícia to číta ako myslenie, ktoré musí pre rovnakú jasnosť pracovať viac.',
    },
    Venus: {
        Domicile: 'Venuša je tam vo vlastnom znamení, takže náklonnosť prichádza ľahko a na vlastných podmienkach.',
        Exaltation: 'Venuša je tam v znamení, ktoré tradícia pokladá za mimoriadne priaznivé. Tradícia to číta ako náklonnosť v jej najštedrejšej podobe.',
        Detriment: 'Venuša tam stojí v znamení oproti svojmu vlastnému, čo tradícia číta ako náklonnosť, ktorá pracuje cez štýl, ktorý nie je jej vlastný.',
        Fall: 'Venuša je tam v znamení, ktoré tradícia pokladá za náročné. Tradícia to číta ako náklonnosť, ktorej slobodné prejavenie stojí viac úsilia.',
    },
    Mars: {
        Domicile: 'Mars je tam vo vlastnom znamení, takže hnacia sila prichádza priamo a silno.',
        Exaltation: 'Mars je tam v znamení, ktoré tradícia pokladá za mimoriadne priaznivé. Tradícia to číta ako hnaciu silu v najdisciplinovanejšej podobe.',
        Detriment: 'Mars tam stojí v znamení oproti svojmu vlastnému, takže hnacia sila zvykne vychádzať pomalšie alebo nepriamejšie, než ju cítiš.',
        Fall: 'Mars je tam v znamení, ktoré tradícia pokladá za náročné. Tradícia to číta ako hnaciu silu, ktorej nasmerovanie stojí viac úsilia.',
    },
};
const MOON_DIGNITY = {
    Domicile: 'Mesiac je tu vo vlastnom znamení, takže táto potreba je silná a ľahko rozpoznateľná.',
    Exaltation: 'Mesiac je tu v znamení, ktoré tradícia pokladá za mimoriadne priaznivé. Tradícia to číta ako potrebu, ktorá je dobre podporená a stála.',
    Detriment: 'Mesiac tu stojí v znamení oproti svojmu vlastnému, čo tradícia číta ako potrebu, ktorej naplnenie si žiada viac vedomej starostlivosti.',
    Fall: 'Mesiac je tu v znamení, ktoré tradícia pokladá za náročné. Tradícia to číta ako potrebu, ktorej naplnenie si žiada viac vedomej starostlivosti.',
};
/* By the Sun's element, then the Moon's: the direction this chart has it. */
const FRICTION = {
    'Fire|Earth': 'To, čo ťa poháňa, sa chce pohnúť hneď, a to, čo ťa upokojuje, chce vec urobiť poriadne, takže každé môže pôsobiť ako brzda toho druhého.',
    'Earth|Fire': 'To, čo ťa poháňa, chce vec urobiť poriadne, a to, čo ťa upokojuje, sa chce pohnúť hneď, takže každé môže pôsobiť ako brzda toho druhého.',
    'Fire|Water': 'To, čo ťa poháňa, chce konať, a to, čo ťa upokojuje, chce najprv precítiť, kam ide, takže každé môže tomu druhému pripadať prehnané alebo pomalé.',
    'Water|Fire': 'To, čo ťa poháňa, chce najprv precítiť, kam ide, a to, čo ťa upokojuje, chce konať, takže každé môže tomu druhému pripadať pomalé alebo prehnané.',
    'Air|Earth': 'To, čo ťa poháňa, to chce najprv prebrať, a to, čo ťa upokojuje, chce niečo konkrétne, takže každé môže tomu druhému pripadať ako zdržanie.',
    'Earth|Air': 'To, čo ťa poháňa, chce niečo konkrétne, a to, čo ťa upokojuje, to chce najprv prebrať, takže každé môže tomu druhému pripadať ako zdržanie.',
    'Air|Water': 'To, čo ťa poháňa, chce odstup, aby mohlo premýšľať, a to, čo ťa upokojuje, chce blízkosť, aby mohlo cítiť, takže každé môže tomu druhému pripadať chladné alebo zahlcujúce.',
    'Water|Air': 'To, čo ťa poháňa, chce blízkosť, aby mohlo cítiť, a to, čo ťa upokojuje, chce odstup, aby mohlo premýšľať, takže každé môže tomu druhému pripadať zahlcujúce alebo chladné.',
};
const frictionLine = (sun, moon) => FRICTION[`${sun}|${moon}`];
/* The last step of the give-and-need line, by the Moon's element. */
const SAY_WHICH = {
    Fire: 'Pomáha otvorene si povedať o to, čo práve potrebuješ.',
    Earth: 'Pomáha jednoducho pomenovať, ktoré z toho práve potrebuješ.',
    Air: 'Pomáha dať do slov, ktoré z toho práve potrebuješ.',
    Water: 'Pomáha dať blízkym vedieť, ktoré z toho práve potrebuješ, aj keď sa to zdá samozrejmé.',
};
/** `Kozorožec približne od 21:35`, `Lev približne do 10:20`. */
function spanPhrase(span, index, total) {
    const sign = SIGN_NOM[span.value] ?? span.value;
    if (total === 1)
        return sign;
    if (index === 0)
        return `${sign} približne do ${span.toLocal}`;
    if (index === total - 1)
        return `${sign} približne od ${span.fromLocal}`;
    return `${sign} približne od ${span.fromLocal} do ${span.toLocal}`;
}
const spansPhrase = (spans) => and(spans.map((span, index) => spanPhrase(span, index, spans.length)));
/* =========================================================== sections == */
function time(claim) {
    const moving = claim.boundary.map((entry) => entry.body);
    const others = moving.filter((body) => body !== 'Moon');
    const readBoth = (bodies) => (bodies.length === 1 ? 'číta sa nižšie oboma spôsobmi' : 'čítajú sa nižšie oboma spôsobmi');
    if (claim.precision === 'unknown') {
        const base = 'Čas narodenia nebol zadaný, preto tento výklad vynecháva všetko, čo závisí od hodiny: ascendent, domy a planétu, ktorá mape vládne.';
        if (moving.length === 0) {
            return `${base} Každá planéta si počas dňa tvojho narodenia drží svoje znamenie, aj rýchly Mesiac, takže to, čo nasleduje, stojí len na dátume.`;
        }
        if (claim.moonHolds) {
            return `${base} Planéty sa čítajú z dátumu. Mesiac si drží svoje znamenie celý deň; ${and(others.map((body) => NOM[body]))} nie, a preto sa ${others.length === 1 ? 'číta' : 'čítajú'} nižšie oboma spôsobmi.`;
        }
        const alsoMoving = others.length > 0 ? `, rovnako ako ${and(others.map((body) => NOM[body]))}` : '';
        return `${base} Planéty sa čítajú z dátumu, no Mesiac v ten deň mení znamenie${alsoMoving}, a preto sa ${moving.length === 1 ? 'číta' : 'čítajú'} nižšie oboma spôsobmi.`;
    }
    const planets = moving.length === 0
        ? ' Planéty si dve hodiny pred ním aj po ňom držia svoje znamenia, takže väčšina tohto výkladu od neho nezávisí.'
        : ` Do dvoch hodín pred ním alebo po ňom ${and(moving.map((body) => NOM[body]))} ${moving.length === 1 ? 'mení' : 'menia'} znamenie a ${readBoth(moving)}; ostatné planéty si svoje znamenia držia.`;
    const rising = claim.rising === null ? ''
        : claim.rising.spans.length <= 1
            ? ' Ascendent sa v tom okne tiež nemení, no stojí na odhade, a tak sa aj číta.'
            : ' Ascendent sa v tom okne mení, a nižšie sa tak aj číta.';
    return `Tvoj čas narodenia je odhad.${planets}${rising}`;
}
function pattern(claim) {
    switch (claim.kind) {
        case 'concentration': {
            const voice = SIGN[claim.sign];
            const bodies = and(claim.planets.map((body) => NOM[body]));
            const functions = fnList(claim.planets);
            const opening = `${countPlacements(claim.planets.length)} v tom istom znamení, ${inSign(claim.sign)}, a dávajú mape jej hlavnú tému: ${voice.style}.`;
            const members = `${capitalise(bodies)} sú tam všetky, takže ${functions} fungujú v rovnakom štýle.`;
            let support = '';
            if (claim.element === 'leads' && claim.modality === 'leads') {
                support = ` Celková rovnováha mapy ide rovnakým smerom: jej najsilnejší živel aj najsilnejšia kvalita patria ${SIGN_DAT[claim.sign]}. Kvalita je to, či znamenia väčšinou začínajú veci, držia sa ich alebo sa prispôsobujú. To tejto téme pridáva váhu.`;
            }
            else if (claim.element === 'leads') {
                support = ` Najsilnejším živlom mapy je ${ELEMENT_NOM[SIGN_ELEMENT[claim.sign]]}, živel tohto znamenia, čo tejto téme dodáva váhu.`;
            }
            else if (claim.modality === 'leads') {
                const modality = SIGN_MODALITY[claim.sign];
                support = ` Mapa sa navyše prikláňa ${toPrep(`${MODALITY_ADJ_DAT[modality]} kvalite`)}, ku ktorej toto znamenie patrí - ${MODALITY_THEME[modality]}.`;
            }
            else if (claim.element === 'shares' || claim.modality === 'shares') {
                support = ' Počty živlov a kvalít túto tému podopierajú, no celú mapu neprevážia.';
            }
            const second = [voice.styleMore];
            if (claim.house !== null) {
                second.push(`${allStand(claim.planets.length)} ${HOUSE_IN[claim.house]}, v časti mapy spojenej ${withPrep(HOUSE_AREA[claim.house])}, takže práve tam táto téma zvykne nachádzať uplatnenie.`);
            }
            if (claim.withSun.length > 0) {
                second.push(`${capitalise(and(['Sun', ...claim.withSun].map((body) => NOM[body])))} sú len pár stupňov od seba, takže ${fnList([...claim.withSun, 'Sun'])} sa od seba ťažko oddeľujú.`);
            }
            if (claim.outside) {
                const { body, members: touched } = claim.outside;
                const withWhom = withPrep(and(touched.map((member) => INS[member])));
                second.push(claim.outside.kind === 'opposition'
                    ? `${Nom(body)} stojí oproti ${and(touched.map((member) => DAT[member]))} na druhej strane mapy, takže sa k tejto téme z druhej strany stále hlási ${FUNCTION[body].nom}.`
                    : claim.outside.kind === 'square'
                        ? `${Nom(body)} je v napätí ${withWhom} naraz, čo celej téme pridáva ${HARD_EFFECT[body]}.`
                        : `${Nom(body)} ľahko spolupracuje ${withWhom} naraz, čo celej téme dodáva ${SOFT_EFFECT[body]}.`);
            }
            return [`${opening} ${members}${support}`, second.join(' ')];
        }
        case 'knot': {
            const others = claim.links.map((entry) => otherEnd(entry, claim.center));
            const tied = GENDER[claim.center] === 'f' ? 'previazaná' : GENDER[claim.center] === 'n' ? 'previazané' : 'previazaný';
            const verbs = knotClauses(claim.links, claim.center);
            const first = `Hlavnou témou tvojej mapy nie je jedno znamenie, ale spleť tesných väzieb. ${Nom(claim.center)}, ${FUNCTION[claim.center].nom}, je tesne ${tied} ${withPrep(and(others.map((point) => INS[point])))}: ${verbs}.`;
            const center = FUNCTION[claim.center];
            const carries = `${capitalise(center.nom)} tak zriedka ${center.plural ? 'prichádzajú' : 'prichádza'} osamote - ${fnList(others)} ${center.plural ? 'ich' : 'ho'} zvyčajne sprevádzajú.`;
            const shared = claim.sharedModality
                ? ` ${allStand(others.length + 1)} v ${MODALITY_ADJ[claim.sharedModality]} znameniach (${{ Cardinal: 'tých, ktoré veci začínajú', Fixed: 'tých, ktoré sa držia svojho', Mutable: 'tých, ktoré sa prispôsobujú' }[claim.sharedModality]}), takže na záťaž tejto spleti zvykneš odpovedať ${MODALITY_RESPONSE[claim.sharedModality]}.`
                : '';
            const internal = claim.internal.length > 0
                ? ' Aj ostatné sú previazané navzájom, takže zmena v jednom sa zvykne prejaviť vo všetkých.'
                : '';
            const slow = others.filter((point) => point === 'Uranus' || point === 'Neptune' || point === 'Pluto');
            const own = GENDER[claim.center] === 'f' ? 'tvoja' : GENDER[claim.center] === 'n' ? 'tvoje' : 'tvoj';
            const generational = slow.length > 0
                ? ` ${capitalise(and(slow.map((point) => NOM[point])))} ${slow.length === 1 ? 'sa pohybuje' : 'sa pohybujú'} tak pomaly, že ${slow.length === 1 ? 'jeho znamenie zdieľa' : 'ich znamenia zdieľa'} veľa ľudí narodených v rovnakom období; osobné je tu to, ako sa ${slow.length === 1 ? 's ním' : 's nimi'} stretáva ${own} ${NOM[claim.center]}.`
                : '';
            return [`${first} ${carries}${shared}${generational}`, `Keďže je s tým spojené toľko, ${center.nom} ${center.plural ? 'sú' : 'je'} niečo, čo nesieš, nie niečo, čo prichádza ľahko.${internal}`];
        }
        case 'temperament': {
            if (claim.element && claim.modality) {
                return [`Hlavná téma tvojej mapy vychádza z jej rovnováhy, nie z jedného postavenia. ${capitalise(ELEMENT_NOM[claim.element])} jasne prevažuje nad ostatnými živlami a medzi kvalitami vedie ${MODALITY_LABEL[claim.modality].toLowerCase()}, takže mapa sa opiera o ${ELEMENT_THEME[claim.element]} a jej tempom je ${MODALITY_THEME[claim.modality]}.`];
            }
            if (claim.element) {
                return [`Hlavná téma tvojej mapy vychádza z jej rovnováhy, nie z jedného postavenia: ${ELEMENT_NOM[claim.element]} jasne prevažuje nad ostatnými živlami, takže mapa sa opiera o ${ELEMENT_THEME[claim.element]}.`];
            }
            const modality = claim.modality;
            return [`Hlavná téma tvojej mapy vychádza z jej tempa, nie z jedného postavenia: jasne vedie ${MODALITY_LABEL[modality].toLowerCase()} kvalita, takže tempom mapy je ${MODALITY_THEME[modality]}.`];
        }
        case 'polarity': {
            const [a, b] = claim.mass;
            const outlierWhat = claim.outlier.body === 'Sun' ? 'to, čo ťa poháňa,' : 'to, čo ťa upokojuje,';
            return [
                `Hlavnou témou tvojej mapy je rozdelenie. ${capitalise(ELEMENT_NOM[a])} a ${ELEMENT_NOM[b]} nesú väčšinu jej postavení, takže mapa ako celok sa opiera o ${ELEMENT_SHORT[a]} a ${ELEMENT_SHORT[b]}. ${Nom(claim.outlier.body)} je jej jediné ${ELEMENT_ADJ[claim.outlier.element]} postavenie, takže ${outlierWhat} pracuje v registri, ktorý zvyšok mapy nezdieľa.`,
                `Tým sa ${NOM[claim.outlier.body]} stáva v mape výnimkou, nie pravidlom, a časťou, ktorá sa najľahšie ocitne mimo kroku. Chce ${ELEMENT_THEME[claim.outlier.element]} a zvyšok mapy toho ponúka málo.`,
            ];
        }
        default: {
            if (claim.spans.length > 1) {
                const readings = claim.spans.map((span, index) => `${marks.ifSign('Sun', span, index, claim.spans.length)} Témou je potom ${SIGN[span.value].style}.`);
                return [`Nič v tvojej mape sa nesústreďuje dosť silno na to, aby samo určilo tému, a tak ju určuje Slnko - a o akú tému ide, závisí od hodiny. ${readings.join(' ')}`];
            }
            const voice = SIGN[claim.sign];
            return [`Nič v tvojej mape sa nesústreďuje dosť silno na to, aby samo určilo tému, a tak ju určuje Slnko: ${voice.style}. ${voice.styleMore}`];
        }
    }
}
function drive(claim) {
    const sun = SIGN[claim.sun];
    const sunHouse = claim.sunHouse !== null
        ? ` Slnko je ${HOUSE_IN[claim.sunHouse]}, spojenom ${withPrep(HOUSE_AREA[claim.sunHouse])}, takže ${SUN_HOUSE[claim.sunHouse]}.`
        : '';
    const paragraphs = [claim.sunSigns.length === 1
            ? `Slnko ${inSign(claim.sun)} je to, čo ťa poháňa: ${sun.drive}. ${sun.driveMore}${sunHouse}`
            : claim.sunSplitTold
                ? `Rovnako sa delí aj to, čo ťa poháňa: ${byHour(claim.sunSpans, (sign) => `je to ${SIGN[sign].drive}`)}.`
                : `Slnko, ktoré ťa poháňa, v deň tvojho narodenia mení znamenie, a tak sa číta oboma spôsobmi. ${claim.sunSpans.map((span, index) => `${marks.ifSign('Sun', span, index, claim.sunSpans.length)} Poháňa ťa tam ${SIGN[span.value].drive}.`).join(' ')}`];
    const bothFixed = claim.sunSigns.length === 1 && claim.moonSigns.length === 1;
    if (claim.moonSigns.length > 1) {
        const spans = claim.moonSpans;
        const readings = spans.map((span, index) => `${marks.ifSign('Moon', span, index, spans.length)} Upokojuje ťa tam ${SIGN[span.value].settle}.`);
        paragraphs.push(`Mesiac, ktorý ťa upokojuje, v deň tvojho narodenia mení znamenie, a tak sa číta oboma spôsobmi. ${readings.join(' ')}`);
    }
    else {
        const moon = SIGN[claim.moon];
        const moonHouse = claim.moonHouse !== null
            ? ` Mesiac je ${HOUSE_IN[claim.moonHouse]}, spojenom ${withPrep(HOUSE_AREA[claim.moonHouse])}, takže ${MOON_HOUSE[claim.moonHouse]}.`
            : '';
        const dignity = claim.moonDignity ? ` ${MOON_DIGNITY[claim.moonDignity] ?? ''}` : '';
        paragraphs.push(`Mesiac ${inSign(claim.moon)} je to, čo ťa upokojuje: ${moon.settle}. ${moon.settleMore}${moonHouse}${dignity}`.trim());
    }
    if (claim.developedBelow && claim.sameModality && bothFixed) {
        const modality = SIGN_MODALITY[claim.sun];
        paragraphs.push(`Jedno ich predsa spája - tempo: obe sú ${MODALITY_ADJ_PL_NOM[modality]} znamenia, takže obom sú blízke ${MODALITY_THEME[modality]}.`);
    }
    if (!claim.developedBelow && bothFixed) {
        const sunElement = SIGN_ELEMENT[claim.sun];
        const moonElement = SIGN_ELEMENT[claim.moon];
        const relation = claim.relation === 'same-sign'
            ? 'Slnko a Mesiac zdieľajú znamenie, takže to, čo chceš, a to, čo potrebuješ, sa zriedka rozchádza.'
            : claim.relation === 'same-element'
                ? `Obe stoja v znameniach ${ELEMENT_GEN[sunElement]}, takže to, čo ťa poháňa, a to, čo ťa upokojuje, sa zvyčajne zhoduje.`
                : claim.relation === 'congenial'
                    ? `${capitalise(ELEMENT_NOM[sunElement])} a ${ELEMENT_NOM[moonElement]} sa navzájom živia, takže hnacia sila a potreba si skôr pomáhajú, než by si konkurovali.`
                    : '';
        const aspect = claim.aspect && (claim.aspect.kind === 'trine' || claim.aspect.kind === 'sextile')
            ? ' Navyše sú priamo prepojené, čo spoluprácu ešte uľahčuje.' : '';
        if (relation)
            paragraphs.push(`${relation}${aspect}`);
    }
    if (claim.joined.length > 0) {
        const plural = claim.joined.length > 1 || claim.joined.some((body) => FUNCTION[body].plural);
        paragraphs.push(`${capitalise(and(claim.joined.map((body) => NOM[body])))} ${claim.joined.length === 1 ? 'stojí' : 'stoja'} tesne pri Slnku, takže ${and(claim.joined.map((body) => FUNCTION[body].nom))} ${plural ? 'sú' : 'je'} súčasťou tvojho smerovania, nie niečím oddeleným.`);
    }
    return paragraphs;
}
/*
 * THE RISING SIGN IS NEVER THE SUBJECT of a Slovak sentence here: Blíženci,
 * Váhy and Ryby are plural, and "vychádza Blíženci" does not agree. The
 * ascendant is the subject and the sign stands in the locative - "ascendent je
 * v Blížencoch" - which agrees for all twelve.
 */
function meet(claim) {
    const voice = SIGN[claim.rising];
    const rising = inSign(claim.rising);
    if (claim.state === 'boundary') {
        const at = spanAtMoment(claim.spans);
        const index = at ? claim.spans.indexOf(at) : -1;
        const before = index > 0 ? inSign(claim.spans[index - 1].value) : null;
        const after = index >= 0 && index < claim.spans.length - 1 ? inSign(claim.spans[index + 1].value) : null;
        const range = at ? ` len približne medzi ${at.fromLocal} a ${at.toLocal}` : '';
        const edges = [before ? `skôr je ${before}` : '', after ? `neskôr ${after}` : ''].filter(Boolean).join(', ');
        const lead = `Pri čase, ktorý uvádzaš, je ascendent ${rising}, čo by určovalo, ako pôsobíš na prvý pohľad: ${voice.surface}. Ascendent však zostáva ${rising}${range}${edges ? `; ${edges}` : ''}. Vládca mapy a domy sa riadia ascendentom, preto ich tu vynechávame.`;
        const same = claim.sameSignAs === 'moon' || claim.sameSignAs === 'both'
            ? ' Ak je odhad blízko, ascendent je aj znamením tvojho Mesiaca a ako prvá by sa ukázala tvoja citová stránka.'
            : claim.sameSignAs === 'sun'
                ? ' Ak je odhad blízko, ascendent je aj znamením tvojho Slnka a to, čo sa ukáže ako prvé, by dobre naznačovalo, čo ťa poháňa.'
                : '';
        return [`${lead}${same}`];
    }
    const opening = `${claim.state === 'approximate' ? `Pri čase, ktorý uvádzaš, je ascendent ${rising}` : `Ascendent je ${rising}`} a určuje, ako pôsobíš na prvý pohľad: ${voice.surface}. ${voice.surfaceMore}`;
    let affinity;
    if (claim.sameSignAs === 'both') {
        affinity = 'Je to aj znamenie tvojho Slnka aj Mesiaca, takže to, čo sa ukáže ako prvé, má veľmi blízko k tomu, čo je pod tým.';
    }
    else if (claim.sameSignAs === 'moon') {
        affinity = `Je to aj znamenie tvojho Mesiaca, takže ako prvá sa ukáže tvoja citová stránka${claim.luminaryOnAngle?.body === 'Moon' && claim.luminaryOnAngle.angle === 'Ascendant'
            ? ' - a keďže Mesiac stojí priamo na ascendente, ukáže sa výrazne' : ''}.`;
    }
    else if (claim.sameSignAs === 'sun') {
        affinity = 'Je to aj znamenie tvojho Slnka, takže to, čo sa ukáže ako prvé, dobre naznačuje, čo ťa poháňa.';
    }
    else if (claim.affinity === 'both') {
        affinity = 'Ascendent zdieľa živel so Slnkom aj s Mesiacom, takže povrch zodpovedá tomu, čo je pod ním.';
    }
    else if (claim.affinity === 'sun') {
        affinity = 'Ascendent zdieľa živel so Slnkom, takže povrch ukazuje na to, čo ťa poháňa.';
    }
    else if (claim.affinity === 'moon') {
        affinity = 'Ascendent zdieľa živel s Mesiacom, takže tvoja citová stránka sa zvyčajne ukáže skôr než tvoja hnacia sila.';
    }
    else {
        affinity = 'Ascendent nezdieľa živel ani so Slnkom, ani s Mesiacom, takže to, čo sa ukáže ako prvé, veľa neprezrádza o tom, čo ťa poháňa alebo upokojuje; to sa ukazuje až neskôr.';
    }
    const onAngle = claim.luminaryOnAngle;
    const toldAbove = onAngle?.body === 'Moon' && onAngle.angle === 'Ascendant'
        && (claim.sameSignAs === 'moon' || claim.sameSignAs === 'both');
    const angular = onAngle && !toldAbove
        ? ` ${Nom(onAngle.body)} stojí aj ${ANGLE_PHRASE[onAngle.angle]}, čo ${onAngle.body === 'Sun' ? 'to, čo ťa poháňa,' : 'to, čo ťa upokojuje,'} približuje k povrchu.`
        : '';
    const paragraphs = [`${opening} ${affinity}${angular}`];
    if (claim.ruler) {
        const ruler = claim.ruler;
        const angle = ruler.angle ? `, ${ANGLE_PHRASE[ruler.angle]}` : '';
        if (ruler.inRisingSign) {
            paragraphs.push(`${Nom(ruler.body)}, planéta, ktorá vládne ${SIGN_DAT[claim.rising]}, stojí tiež ${inSign(claim.rising)}${angle}. To ascendent posilňuje: jeho ${voice.manner} spôsob nie je len prvým dojmom, ale štýlom, ktorým zvykne konať veľká časť mapy.`);
        }
        else {
            const where = ruler.house
                ? `, v časti mapy spojenej ${withPrep(HOUSE_AREA[ruler.house])}, takže práve tam sa štýl ascendentu zvykne uplatniť`
                : ' a štýl ascendentu sa zvykne prenášať cez túto planétu';
            const angular = ruler.angle ? ` Stojí aj ${ANGLE_PHRASE[ruler.angle]}, čo to ešte zosilňuje.` : '';
            const ties = ruler.inPatternSign
                ? ' Tým sa to, čo sa ukáže ako prvé, viaže späť na hlavnú tému mapy.'
                : ` Tým sa to, čo sa ukáže ako prvé, viaže na štýl znamenia ${SIGN_NOM[ruler.sign]}: ${SIGN[ruler.sign].style}.`;
            paragraphs.push(`Planéta, ktorá vládne ascendentu, ${NOM[ruler.body]}, stojí ${inSign(ruler.sign)}${where}.${angular}${ties}`);
        }
    }
    return paragraphs;
}
const OPENING = {
    Mercury: {
        own: (sign) => `S Merkúrom ${inSign(sign)} tvoje myslenie zvykne ${SIGN[sign].mind}.`,
        shared: (sign) => `Merkúr nesie rovnaký štýl aj do myslenia, takže tvoje myslenie zvykne ${SIGN[sign].mind}.`,
    },
    Mars: {
        own: (sign) => `S Marsom ${inSign(sign)} zvykneš ${SIGN[sign].act}.`,
        shared: (sign) => `Mars nesie rovnaký štýl aj do konania, takže zvykneš ${SIGN[sign].act}.`,
    },
    Venus: {
        own: (sign) => `S Venušou ${inSign(sign)} v blízkych vzťahoch zvykneš ${SIGN[sign].relate}.`,
        shared: (sign) => `Venuša nesie rovnaký štýl aj do blízkosti, takže zvykneš ${SIGN[sign].relate}.`,
    },
};
function planetParagraph(note) {
    const body = note.body;
    const parts = [note.inPattern ? OPENING[body].shared(note.sign) : OPENING[body].own(note.sign)];
    const dignity = note.dignity ? DIGNITY_LINE[body][note.dignity] : undefined;
    if (dignity)
        parts.push(dignity);
    if (note.aspect)
        parts.push(link(note.aspect, note.body));
    return parts.join(' ');
}
function mind(claim) {
    return [
        ...(claim.mercury ? [planetParagraph(claim.mercury)] : []),
        ...(claim.mars ? [planetParagraph(claim.mars)] : []),
    ];
}
/* How the Moon's closeness line opens, by the Moon's element. */
const CLOSENESS_LEAD = {
    Fire: (sign) => `Tvoj Mesiac ${inSign(sign)} sa cíti najbližšie,`,
    Earth: (sign) => `Blízkosť najlepšie funguje pre tvoj Mesiac ${inSign(sign)},`,
    Air: (sign) => `Tvoj Mesiac ${inSign(sign)} sa v blízkych vzťahoch uvoľní,`,
    Water: (sign) => `Tvoj Mesiac ${inSign(sign)} sa v blízkych vzťahoch cíti bezpečne,`,
};
function relate(claim) {
    const venus = claim.venus;
    const paragraphs = [];
    if (venus.signs.length > 1) {
        const readings = venus.spans.map((span, index) => `${marks.ifSign('Venus', span, index, venus.spans.length)} V blízkosti potom zvykneš ${SIGN[span.value].relate}.`);
        paragraphs.push(`Venuša v deň tvojho narodenia mení znamenie, a tak sa to, ako sa vzťahuješ k ľuďom, číta oboma spôsobmi. ${readings.join(' ')}`);
    }
    else {
        paragraphs.push(planetParagraph(venus));
    }
    if (claim.moon.signs.length === 1) {
        const moonLine = `${CLOSENESS_LEAD[SIGN_ELEMENT[claim.moon.sign]](claim.moon.sign)} ${SIGN[claim.moon.sign].closeness}.`;
        const venusElement = SIGN_ELEMENT[venus.sign];
        const moonElement = SIGN_ELEMENT[claim.moon.sign];
        const relation = venus.signs.length > 1 ? ''
            : claim.relation === 'same-sign' ? ' Venuša a Mesiac zdieľajú znamenie, takže to, čo v blízkych vzťahoch dávaš, a to, čo potrebuješ, sa zhoduje.'
                : claim.relation === 'same-element' ? ' Venuša a Mesiac zdieľajú živel, takže to, čo dávaš, a to, čo potrebuješ, sa zvyčajne zhoduje.'
                    : claim.relation === 'congenial' ? ' Venuša a Mesiac sú rozdielne, no zlučiteľné, takže to, čo dávaš, a to, čo potrebuješ, sa zvyčajne podporuje.'
                        : ` To, čo dávaš, a to, čo potrebuješ, sa tu môže líšiť: Venuša zvykne dávať ${ELEMENT_GIVE[venusElement]}, kým Mesiac žiada ${ELEMENT_NEED[moonElement]}. ${SAY_WHICH[moonElement]}`;
        paragraphs.push(`${moonLine}${relation}`);
    }
    return paragraphs;
}
const LUMINARY_TENSION_LEAD = {
    Earth: 'Najzreteľnejšie napätie je medzi Slnkom a Mesiacom.',
    Air: 'Najsilnejšie napätie v mape leží medzi Slnkom a Mesiacom.',
    Fire: 'Hlavné trenie mapy vedie medzi Slnkom a Mesiacom.',
    Water: 'Slnko a Mesiac ťahajú rôznymi smermi.',
};
function tensionParagraph(tension, index) {
    switch (tension.type) {
        case 'luminaries': {
            const sun = SIGN[tension.sun];
            const moon = SIGN[tension.moon];
            const aspect = tension.aspect?.kind === 'square'
                ? ' Navyše k sebe stoja v ostrom uhle, takže na seba tlačia, namiesto toho, aby sa striedali.'
                : tension.aspect?.kind === 'opposition'
                    ? ' Navyše stoja oproti sebe, takže zvykneš medzi nimi kolísať.'
                    : '';
            const alone = tension.moonAlone
                ? ` Mesiac je navyše jediná časť tvojej mapy v znamení ${ELEMENT_GEN[SIGN_ELEMENT[tension.moon]]}, takže jeho potrebu nič iné v mape nepodopiera a ľahšie sa prehlasuje.`
                : '';
            const friction = frictionLine(SIGN_ELEMENT[tension.sun], SIGN_ELEMENT[tension.moon]);
            const closing = friction ? ` ${friction}`
                : ' Obe sa navzájom živia, no z opačných strán, takže zvykneš medzi nimi kolísať namiesto držania oboch naraz.';
            return `${LUMINARY_TENSION_LEAD[SIGN_ELEMENT[tension.sun]]} Slnko ${inSign(tension.sun)} ťahá ${toPrep(sun.pull)}; Mesiac ${inSign(tension.moon)} ťahá ${toPrep(moon.pull)}.${aspect}${alone}${closing}`;
        }
        case 'surface':
            return `${index === 0 ? 'Najzreteľnejšie napätie' : 'Ďalšie napätie'} je medzi povrchom a tým, čo je pod ním: ${SIGN[tension.rising].manner} spôsob ascendentu sa ukáže ako prvý, zatiaľ čo to, čo ťa poháňa a upokojuje, sa ukazuje až neskôr.`;
        case 'aspect': {
            const { aspect } = tension;
            const shape = aspect.kind === 'opposition'
                ? `${NOM[aspect.a]} stojí oproti ${DAT[aspect.b]} na druhej strane mapy, takže sa obe skôr striedajú, než by splynuli`
                : aspect.kind === 'square'
                    ? `${NOM[aspect.a]} je v napätí ${withPrep(INS[aspect.b])} a to napätie zvykne vytvárať skôr úsilie než ľahkosť`
                    : `${NOM[aspect.a]} stojí spolu ${withPrep(INS[aspect.b])}, takže ${FUNCTION[aspect.a].nom} ${FUNCTION[aspect.a].plural ? 'zvyknú' : 'zvykne'} niesť ${HARD_EFFECT[aspect.b]}`;
            return `${index === 0 ? 'Najzreteľnejšie napätie' : 'Druhé napätie'} je medzi ${FUNCTION[aspect.a].ins} a ${FUNCTION[aspect.b].ins}: ${shape}.`;
        }
        default:
            return `${index === 0 ? 'Najzreteľnejšie napätie je v tempe' : 'Je tu aj napätie v tempe'}: mapa ako celok sa prikláňa ${toPrep(`${MODALITY_ADJ_DAT[tension.lead]} kvalite`)}, zatiaľ čo Slnko aj Mesiac stoja v ${MODALITY_ADJ[tension.luminaries]} znameniach. Mape je bližšie ${MODALITY_THEME[tension.lead]}, im ${MODALITY_THEME[tension.luminaries]}.`;
    }
}
function tension(claim) {
    return claim.tensions.map((entry, index) => tensionParagraph(entry, index));
}
/** `pri narodení približne pred 14:10 ...; pri narodení neskôr ...` - one clause per sign the Sun holds that day. */
const byHour = (spans, clause) => spans
    .map((span, index) => `${index === 0 ? `pri narodení približne pred ${span.toLocal}` : 'pri narodení neskôr'} ${clause(span.value)}`)
    .join('; ');
function overuseClause(overuse) {
    switch (overuse.source) {
        case 'sign': return SIGN[overuse.sign].overuse;
        case 'sun-both': return byHour(overuse.spans, (sign) => SIGN[sign].overuse);
        case 'moon': return SIGN[overuse.sign].moonOveruse;
        case 'knot': return `niesť ${FUNCTION[overuse.center].acc} a všetko, čo je s ${FUNCTION[overuse.center].plural ? 'nimi' : 'ním'} previazané, naraz sťažuje čokoľvek z toho odložiť`;
        case 'element': return ELEMENT_OVERUSE[overuse.element];
        default: return MODALITY_OVERUSE[overuse.modality];
    }
}
function practiceClause(overuse) {
    switch (overuse.source) {
        case 'sign': return SIGN[overuse.sign].practice;
        case 'sun-both': return byHour(overuse.spans, (sign) => `pomáha ${SIGN[sign].practice}`);
        case 'moon': return SIGN[overuse.sign].moonPractice;
        case 'knot': return 'rozhodovať sa po jednom, čo z toho, čo je s tým previazané, je dnes naozaj tvoje';
        case 'element': return ELEMENT_PRACTICE[overuse.element];
        default: return MODALITY_PRACTICE[overuse.modality];
    }
}
const COST_LEAD = {
    concentration: 'Mať toľko v jednom znamení najviac stojí, keď to beží príliš naplno:',
    knot: 'Cenou takejto spleti väzieb je váha:',
    temperament: 'Takto silné prikláňanie sa na jednu stranu má svoju cenu:',
    polarity: 'Rozdelená mapa má svoju vlastnú cenu:',
    luminary: 'Keď tento štýl beží príliš naplno,',
};
const MOON_COST_LEAD = {
    Fire: 'Mesiac pridáva vlastnú cenu:',
    Earth: 'Aj reflex Mesiaca má svoju cenu:',
    Air: 'Na strane Mesiaca je cena iná:',
    Water: 'Mesiac nesie vlastnú cenu:',
};
const PRACTICE_LEAD = {
    concentration: 'Pomáha',
    knot: 'Najviac pomáha',
    temperament: 'Pomáha',
    polarity: 'Praktickou odpoveďou je',
    luminary: 'Pomáha',
};
function helps(claim) {
    const [first, second] = claim.overuse;
    const moonLead = second && second.source === 'moon' ? MOON_COST_LEAD[SIGN_ELEMENT[second.sign]] : '';
    const byTheHour = first.source === 'sun-both';
    const costLead = byTheHour ? 'Cena závisí od hodiny:' : COST_LEAD[claim.patternKind];
    const cost = `${costLead} ${overuseClause(first)}.${second ? ` ${moonLead} ${overuseClause(second)}.` : ''}`;
    const practices = claim.practice.map(practiceClause);
    const lead = byTheHour ? 'Aj to, čo pomáha, závisí od hodiny:' : PRACTICE_LEAD[claim.patternKind];
    /* One practice to a sentence, as in English. */
    const help = practices.length > 1
        ? `${lead} ${practices[0]}. Pomáha aj ${practices[1]}.`
        : `${lead} ${practices[0]}.`;
    const paragraphs = [cost, help];
    if (claim.support) {
        const { support } = claim;
        const from = support.a === 'Sun' || support.a === 'Moon' ? support.a : support.b;
        const other = otherEnd(support, from);
        const fn = FUNCTION[from];
        paragraphs.push(`V mape je aj určitá ľahkosť, z ktorej sa dá čerpať. ${Nom(from)} ľahko spolupracuje ${withPrep(INS[other])}, takže ${fn.nom} sa ${fn.plural ? 'môžu' : 'môže'} opierať o ${SOFT_EFFECT[other]}, nielen o úsilie.`);
    }
    return paragraphs;
}
/* ============================================================ evidence == */
const ASPECT_WORD = {
    conjunction: 'konjunkcia', opposition: 'opozícia', square: 'kvadratúra', trine: 'trigón', sextile: 'sextil',
};
const BODY_LABEL = {
    ...NOM, 'North Node': 'Severný uzol', 'South Node': 'Južný uzol',
};
const IN_ORB_ALL_DAY = 'v orbe celý deň';
/* Without a birth time an orb moves with the hour, so, as At a glance does, the
   aspect is said to hold all day and no single orb is printed (see the English voice). */
const aspectFact = (model, aspect) => `${BODY_LABEL[aspect.a]} - ${BODY_LABEL[aspect.b]}: ${ASPECT_WORD[aspect.kind]}${model.timeWithheld
    ? (aspect.state === 'known' ? `, ${IN_ORB_ALL_DAY}` : '')
    : `, orb ${degreeText(aspect.orb)}`}`;
const DIGNITY_WORD = {
    Domicile: 'domicil', Exaltation: 'exaltácia', Detriment: 'exil', Fall: 'pád', Peregrine: 'peregrinita',
};
const bodyFact = (model, body) => {
    const reading = model.bodies[body];
    const retro = reading.retrograde ? ', retrográdny pohyb' : '';
    /* Without a birth time only the sign the window checked, never the noon
       degree; a planet that changes sign that day gets both, by the hour, and no
       dignity, which would belong to one of them (see the English voice). */
    if (model.timeWithheld && reading.state === 'boundary') {
        return `${BODY_LABEL[body]}: ${spansPhrase(reading.spans)} v deň narodenia${retro}`;
    }
    const dignity = reading.dignity && reading.dignity !== 'Peregrine' ? `, ${DIGNITY_WORD[reading.dignity]}` : '';
    const house = reading.house !== null ? `, dom ${reading.house}` : '';
    const moving = reading.state === 'boundary' ? ` (${spansPhrase(reading.spans)} v deň narodenia)` : '';
    const position = model.timeWithheld ? SIGN_NOM[reading.sign] : `${SIGN_NOM[reading.sign]} ${degreeText(reading.degree)}`;
    return `${BODY_LABEL[body]} ${position}${house}${dignity}${retro}${moving}`;
};
const ELEMENTS_ORDER = ['Fire', 'Earth', 'Air', 'Water'];
const MODALITIES_ORDER = ['Cardinal', 'Fixed', 'Mutable'];
function elementFact(model) {
    const { elements } = model;
    const counts = ELEMENTS_ORDER.map((element) => `${ELEMENT_LABEL[element]} ${elements.counts[element]}`).join(' / ');
    const lead = elements.shape === 'balanced' ? 'žiadny živel nevedie'
        : elements.shape === 'tie' ? `o vedenie sa delia ${and(elements.leaders.map((element) => ELEMENT_LABEL[element]))}`
            : `vedie ${ELEMENT_LABEL[elements.leaders[0]]} o ${elements.shape === 'single' ? 'dva a viac' : 'jeden'}`;
    const moves = elements.state === 'boundary' ? '; počet sa počas dňa narodenia mení' : '';
    return `Živly v desiatich postaveniach: ${counts} - ${lead}${moves}.`;
}
function modalityFact(model) {
    const { modalities } = model;
    const counts = MODALITIES_ORDER.map((modality) => `${MODALITY_LABEL[modality]} ${modalities.counts[modality]}`).join(' / ');
    const lead = modalities.shape === 'tie'
        ? `o vedenie sa delia ${and(modalities.leaders.map((modality) => MODALITY_LABEL[modality]))}`
        : `vedie ${MODALITY_LABEL[modalities.leaders[0]]} o ${modalities.shape === 'single' ? 'dva a viac' : 'jeden'}`;
    const moves = modalities.state === 'boundary' ? '; počet sa počas dňa narodenia mení' : '';
    return `Kvality: ${counts} - ${lead}${moves}.`;
}
function windowRange(model) {
    const spans = model.bodies.Sun.spans;
    if (spans.length === 0)
        return '';
    return `${spans[0].fromLocal}-${spans[spans.length - 1].toLocal}`;
}
const evidence = {
    standfirst: 'Na čom stojí každá časť výkladu vyššie, v pojmoch samotnej mapy.',
    time(model) {
        if (model.precision === 'exact')
            return [];
        if (model.precision === 'unknown') {
            const moving = model.boundaryBodies.map((body) => `${BODY_LABEL[body]}: ${spansPhrase(model.bodies[body].spans)}`);
            return [
                'Čas narodenia: nezadaný. Mapa je vypočítaná pre 12:00 miestneho času len ako neutrálny stred dňa a nič, čo závisí od hodiny, sa z nej nečíta.',
                `Skontrolované počas celého dňa narodenia: ${moving.length > 0 ? `${moving.join('; ')}; každá iná planéta si drží svoje znamenie` : 'každá planéta si drží svoje znamenie, aj Mesiac'}.`,
                'Vynechané: ascendent, Medium Coeli, domy, vládca mapy a planéty na osiach.',
            ];
        }
        const rising = model.bigThree.ascendant;
        const risingLine = rising.spans.length > 0 ? ` Ascendent v tomto okne: ${spansPhrase(rising.spans)}.` : '';
        const moving = model.boundaryBodies.map((body) => `${BODY_LABEL[body]}: ${spansPhrase(model.bodies[body].spans)}`);
        const range = windowRange(model);
        return [`Čas narodenia: tvoj odhad, skontrolovaný dve hodiny pred ním aj po ňom${range ? ` (${range})` : ''}. ${moving.length > 0 ? `Mení sa: ${moving.join('; ')}.` : 'Každá planéta si drží svoje znamenie.'}${risingLine}`];
    },
    pattern(model, plan) {
        const claim = plan.pattern;
        switch (claim.kind) {
            case 'concentration':
                return [
                    `Stelium ${inSign(claim.sign)}: ${and(claim.planets.map((body) => BODY_LABEL[body]))} (${claim.planets.length} z desiatich postavení)${claim.house !== null ? `, všetky v ${claim.house}. dome (celé znamenia)` : ''}.`,
                    elementFact(model),
                    modalityFact(model),
                ];
            case 'knot':
                return [
                    `Tesné aspekty ${toPrep(DAT[claim.center])}: ${claim.links.map((aspect) => aspectFact(model, aspect)).join('; ')}.`,
                    ...(claim.internal.length > 0
                        ? [`Medzi ostatnými: ${claim.internal.map((aspect) => aspectFact(model, aspect)).join('; ')}.`] : []),
                    ...(claim.sharedModality ? [`${ALL_OF[claim.links.length + 1] ?? 'Všetky'} telesá stoja v ${MODALITY_ADJ[claim.sharedModality]} znameniach.`] : []),
                ];
            case 'polarity':
                return [elementFact(model), `${BODY_LABEL[claim.outlier.body]} (${SIGN_NOM[model.bodies[claim.outlier.body].sign]}) je jediné ${ELEMENT_ADJ[claim.outlier.element]} postavenie.`];
            case 'temperament':
                return [elementFact(model), modalityFact(model)];
            default:
                return [bodyFact(model, 'Sun'), 'Žiadne stelium; živly ani kvality nemajú jasné vedenie.'];
        }
    },
    drive(model, plan) {
        const quality = (body) => `${ELEMENT_LABEL[model.bodies[body].element]}, ${MODALITY_LABEL[model.bodies[body].modality]}`;
        const lines = [
            `${bodyFact(model, 'Sun')} (${quality('Sun')}).`,
            `${bodyFact(model, 'Moon')} (${quality('Moon')}).`,
        ];
        const conjunctions = model.aspects.filter((aspect) => aspect.kind === 'conjunction' && involves(aspect, 'Sun')
            && plan.drive.joined.includes(otherEnd(aspect, 'Sun')));
        if (conjunctions.length > 0)
            lines.push(`${conjunctions.map((aspect) => aspectFact(model, aspect)).join('; ')}.`);
        if (plan.drive.aspect)
            lines.push(`${aspectFact(model, plan.drive.aspect)}.`);
        return lines;
    },
    meet(model, plan) {
        const meetClaim = plan.meet;
        if (!meetClaim)
            return [];
        const rising = model.bigThree.ascendant;
        /* Časy okna sa uvádzajú raz, pod „Tvoj čas narodenia“. Ascendent, ktorý sa
           v okne mení, tu len vymenuje ďalšie možné znamenia a domy sa spomenú, iba
           keď sa čítajú. */
        const moving = meetClaim.state === 'boundary';
        const others = rising.spans.map((span) => span.value).filter((value) => value !== rising.sign);
        const lines = [`Ascendent ${rising.sign ? SIGN_NOM[rising.sign] : ''} ${rising.degree !== null ? degreeText(rising.degree) : ''}${rising.state === 'known' ? '' : ', z odhadovaného času'}${moving
                ? `; môže byť aj ${or(others.map((sign) => inSign(sign)))}`
                : '; domy v celých znameniach (Whole Sign)'}.`.replace(' ;', ';')];
        if (meetClaim.ruler && model.ruler) {
            const angular = model.angular.find((entry) => entry.body === model.ruler?.body);
            lines.push(`Vládca mapy (moderná vláda): ${bodyFact(model, model.ruler.body)}${angular ? `, ${degreeText(angular.orb)} od ${ANGLE_GEN[angular.angle]}` : ''}.`);
        }
        const luminary = meetClaim.luminaryOnAngle;
        if (luminary) {
            const entry = model.angular.find((row) => row.body === luminary.body && row.angle === luminary.angle);
            if (entry)
                lines.push(`${BODY_LABEL[luminary.body]} ${degreeText(entry.orb)} od ${ANGLE_GEN[entry.angle]}.`);
        }
        return lines;
    },
    mind(model, plan) {
        const claim = plan.mind;
        if (!claim)
            return [];
        return [claim.mercury, claim.mars].filter((note) => note !== null)
            .map((note) => `${bodyFact(model, note.body)}${note.aspect ? `; ${aspectFact(model, note.aspect)}` : ''}.`);
    },
    relate(model, plan) {
        const venus = plan.relate.venus;
        return [
            `${bodyFact(model, 'Venus')}${venus.aspect ? `; ${aspectFact(model, venus.aspect)}` : ''}.`,
            `${bodyFact(model, 'Moon')}.`,
        ];
    },
    pull(model, plan) {
        const claim = plan.tension;
        if (!claim)
            return [];
        return claim.tensions.map((entry) => {
            switch (entry.type) {
                case 'luminaries': {
                    const sun = model.bodies.Sun;
                    const moon = model.bodies.Moon;
                    const aspect = entry.aspect ? `; ${aspectFact(model, entry.aspect)}` : '';
                    const alone = entry.moonAlone ? `; Mesiac je jediné ${ELEMENT_ADJ[moon.element]} postavenie` : '';
                    return `Slnko ${SIGN_NOM[sun.sign]} (${ELEMENT_LABEL[sun.element]}, ${MODALITY_LABEL[sun.modality]}) proti Mesiacu ${SIGN_NOM[moon.sign]} (${ELEMENT_LABEL[moon.element]}, ${MODALITY_LABEL[moon.modality]})${aspect}${alone}.`;
                }
                case 'surface':
                    return `Ascendent ${SIGN_NOM[entry.rising]} nezdieľa živel so Slnkom (${SIGN_NOM[entry.sun]}) ani s Mesiacom (${SIGN_NOM[entry.moon]}).`;
                case 'aspect':
                    return `${aspectFact(model, entry.aspect)}.`;
                default:
                    return `${modalityFact(model)} Slnko aj Mesiac majú kvalitu ${MODALITY_LABEL[entry.luminaries].toLowerCase()}.`;
            }
        });
    },
    helps(model, plan) {
        const sources = plan.helps.overuse.map((entry) => {
            switch (entry.source) {
                case 'sign': return `štýlu znamenia ${SIGN_NOM[entry.sign]}`;
                case 'sun-both': return `štýlu Slnka ${or(entry.spans.map((span) => inSign(span.value)))} podľa hodiny`;
                case 'moon': return `Mesiaca ${inSign(entry.sign)}`;
                case 'knot': return `aspektov okolo ${GEN[entry.center]}`;
                case 'element': return `dôrazu na ${ELEMENT_NOM[entry.element]}`;
                default: return `dôrazu na ${MODALITY_ACC[entry.modality]} kvalitu`;
            }
        });
        const joined = and(sources);
        return [
            `Vychádza ${/^[sSzZšŠžŽ]/.test(joined) ? 'zo' : 'z'} ${joined}.`,
            ...(plan.helps.support ? [`${aspectFact(model, plan.helps.support)}.`] : []),
        ];
    },
};
/* ============================================================== marks == */
const marks = {
    estimated: 'z odhadovaného času',
    allDay: 'celý deň v tom istom znamení; stupeň závisí od hodiny',
    aspectAllDay: IN_ORB_ALL_DAY,
    signName: (sign) => SIGN_NOM[sign],
    changes: (spans) => spansPhrase(spans),
    alsoPossible: (signs) => `ascendent môže byť aj ${or(signs.map((sign) => inSign(sign)))}`,
    countChanges: (bodies) => `závisí od hodiny: ${and(bodies.map((body) => NOM[body]))} v ten deň ${bodies.length === 1 ? 'mení' : 'menia'} znamenie`,
    placementTitle: (body, signs) => `${Nom(body)} ${signs.map((sign) => inSign(sign)).join(' alebo ')}`,
    ifSign: (body, span, index, total) => (total === 1 ? ''
        : index === 0 ? `Pri narodení približne pred ${span.toLocal} (miestny čas miesta narodenia) je ${NOM[body]} ${inSign(span.value)}.`
            : `Pri narodení približne po ${span.fromLocal} je ${NOM[body]} ${inSign(span.value)}.`),
    risingLead: (sign, spans) => {
        const others = spans.map((span) => span.value).filter((value) => value !== sign);
        return spans.length > 1 && others.length > 0
            ? `Pri čase, ktorý uvádzaš, je ascendent ${inSign(sign)}; do dvoch hodín od neho môže byť aj ${or(others.map((other) => inSign(other)))}.`
            : `Pri čase, ktorý uvádzaš, je ascendent ${inSign(sign)}.`;
    },
    generationalWithoutHouse: 'Generačná vrstva, ktorú zdieľajú všetci narodení v týchto rokoch. Osobnou ju robia aspekty, ktoré tvorí; čas narodenia by k nim pridal aj jej dom.',
};
export const SK_VOICE = {
    time, pattern, drive, meet, mind, relate, tension, helps, evidence, marks,
};
