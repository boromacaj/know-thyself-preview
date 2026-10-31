/**
 * PERSONALITY (Osobnosť) - Slovak records. What people meet first.
 *
 * A Slovak rewrite of ../personality.ts, not a word-for-word copy: same twelve keys, same fields, same array lengths, `master` on exactly
 * 11, 22 and 33. Follows SLOVAK_STYLE.md: tykanie, gender-free phrasing (no past-tense forms of "you"), the source's hedging unchanged.
 */
export const PERSONALITY_MEANINGS_SK = {
    1: {
        intro: 'Jednotka znamená začiatok: prvý krok, vlastné smerovanie a schopnosť začať niečo, čo ešte neexistovalo.',
        meaning: 'Ako Osobnosť číslo 1 opisuje dojem rozhodnosti: pôsobíš vyrovnane, schopne, sebaisto a trochu pred ostatnými. Ľudia zvyknú predpokladať, že vieš, kam ideš, a čakajú na tvoje vedenie. To, čo stretnú ako prvé, môže byť určitejšie než to, čo platí vnútri. Rovnaká sebaistota sa dá vnímať aj ako agresívna, alebo ako uzavretá voči podnetom.',
        strengths: [
            'Pôsobiť schopne skôr, než povieš veľa',
            'Odvaha a originalita, ktoré ostatní vidia hneď',
            'Prítomnosť, ktorú je ťažké ovládnuť',
        ],
        challenges: [
            'Pôsobenie zastrašujúco alebo neprístupne',
            'Ostatní váhajú ponúknuť návrh',
            'Sebaistý povrch, ktorý môže skrývať pochybnosti',
        ],
        shows: [
            'Dostať do rúk právomoc alebo prvé slovo v novej skupine.',
            'Kolegovia, ktorí čakajú, kým prehovoríš, a až potom sa zaviažu.',
        ],
        ask: 'Čo by ľudia povedali, keby videli, že sa ešte rozhoduješ?',
    },
    2: {
        intro: 'Dvojka znamená vzťah: dvojicu, rovnováhu, počúvanie a tichú prácu, ktorá sa deje medzi ľuďmi.',
        meaning: 'Ako Osobnosť číslo 2 opisuje dojem priateľskosti a pohody: jemná, pozorná a upokojujúca spoločnosť. Ľudia sa pri tebe rýchlo uvoľnia a povedia ti viac, než plánovali. Ľahko im uniká, koľko toho vnímaš. Zamieňajú láskavosť s krehkosťou alebo prenášajú svoje očakávania na tvoje ticho. Tento dojem je skutočná výhoda, ak zároveň nie je aj povinnosťou.',
        strengths: [
            'Pri tebe sa ľudia cítia vypočutí a v pohode',
            'Trpezlivosť, ktorá vyvoláva dôveru',
            'Vnútorná sila, ktorú ľudia podceňujú',
        ],
        challenges: [
            'Zneužívanie, pretože pôsobíš ústretovo',
            'Ostatní na teba prenášajú svoje očakávania',
            'Vyčerpanie z napätia v miestnosti',
        ],
        shows: [
            'Cudzí ľudia ti do pár minút rozprávajú svoje príbehy a potom sa čudujú, prečo.',
            'Byť tým, o kom ostatní dúfajú, že sa postaví na ich stranu.',
        ],
        ask: 'Kedy naposledy priateľstvo prežilo tvoje „nie“?',
    },
    3: {
        intro: 'Trojka znamená vyjadrenie: hlas, predstavivosť, hru a pud urobiť vnútornú vec viditeľnou pre iných.',
        meaning: 'Ako Osobnosť číslo 3 opisuje dojem žiarivosti: živosť, teplo, pohotovosť a príjemná spoločnosť. Keď vojdeš, miestnosť sa trochu rozjasní a ľudia si o tebe urobia priaznivý názor skôr, než pre to niečo urobíš. Riziko je v tom, že sa šarm berie za celý príbeh a na to, čo je pod ním, sa nikto nepýta.',
        strengths: [
            'Zlepšiť náladu na stretnutí',
            'Vtip a šarm, ktoré otvárajú dvere',
            'Ľahkosť pri predstavovaní seba a svojich nápadov',
        ],
        challenges: [
            'Pôsobenie povrchne alebo nevážne',
            'Ľudia predpokladajú, že je všetko v poriadku',
            'Preháňanie, ktoré sa vkráda, keď vystupuješ',
        ],
        shows: [
            'Pozvanie medzi ľudí ako duša spoločnosti pri stole.',
            'Siahnuť po ľahkosti, keď sa rozhovor stáva vážnym.',
        ],
        ask: 'Kto by bol prekvapený, keby zistil, ako sa dnes naozaj máš?',
    },
    4: {
        intro: 'Štvorka znamená štruktúru: základy, metódu, spoľahlivosť a trpezlivosť stavať to, čo vydrží.',
        meaning: 'Ako Osobnosť číslo 4 opisuje dojem pevnosti: spoľahlivosť, stálosť a nenápadnosť. Ľudia predpokladajú, že sa na teba dá spoľahnúť, väčšinou skôr, než majú nejaký dôkaz. Ten predpoklad sa potvrdí dosť často na to, aby sa sotva dal nazvať omylom. Cenou je prvý dojem, ktorý môže pôsobiť prísne alebo konvenčne, a úsilie, ktoré ostáva bez povšimnutia.',
        strengths: [
            'Rýchlo získaná dôvera',
            'Schopnosť bez zbytočného vystatovania',
            'Rozumný a opatrný úsudok',
        ],
        challenges: [
            'Pôsobenie prísne alebo neprístupne',
            'Prehliadnutá ambícia a snaha',
            'Ostatní čakajú, že bremeno poneseš vždy ty',
        ],
        shows: [
            'Skoro dostať kľúče, účty alebo zodpovednosť.',
            'Kolegovia, ktorí sa pýtajú na tvoj názor skôr, než sa rozhodnú.',
        ],
        ask: 'Čo by mali ľudia na tebe vidieť, no spoľahlivosť to zakrýva?',
    },
    5: {
        intro: 'Päťka znamená zmenu: pohyb, zvedavosť, zmysly a slobodu voľby.',
        meaning: 'Ako Osobnosť číslo 5 opisuje dojem pohybu: živosť, zvedavosť, rýchlosť a trochu provizórnosti. Pri prvom kontakte pôsobíš zaujímavo a ľudia zároveň nadobúdajú pocit, že si tu možno len na prechod, a môžu podľa toho aj konať. Rovnaká energia, ktorá priťahuje, sa dá vnímať ako nepokoj alebo ako neochota zaviazať sa, keď novosť vyprchá.',
        strengths: [
            'Magnetická a pútavá prítomnosť',
            'Pohoda s najrôznejšími ľuďmi',
            'Rýchle a vnímavé čítanie situácie',
        ],
        challenges: [
            'Povesť nestálosti',
            'Ostatní sa držia späť, lebo čakajú, že odídeš',
            'Vyhýbanie sa hĺbke zo strachu, že ťa niekde pripútajú',
        ],
        shows: [
            'Ľahko spoznávať ľudí na nových miestach a zostať v pamäti ako niekto, kto je stále na odchode.',
            'Ponuka stať sa tvárou niečoho nového.',
        ],
        ask: 'Pri čom ostávaš dlho, aj keď si to ľudia neuvedomujú?',
    },
    6: {
        intro: 'Šestka znamená starostlivosť: domov, zodpovednosť, súlad a snahu, aby sa ľuďom dobre darilo.',
        meaning: 'Ako Osobnosť číslo 6 opisuje dojem tepla a zodpovednosti: láskavosť, férovosť a pocit, že sa s tebou dá bezpečne hovoriť. Ľudia ti prinášajú problémy skoro, predpokladajú dobrú vieru a často už po pár minútach ťa zaradia do role opatrovateľa skupiny. Je to dar dôvery a môže z toho byť rola bez tvojho výberu.',
        strengths: [
            'Útecha, ktorú ľudia vyhľadávajú',
            'Férovosť, ktorú ľudia vnímajú',
            'Vyrovnaná a harmonická prítomnosť',
        ],
        challenges: [
            'Cudzie bremená, ktoré ti dajú skôr, než sa ponúkneš',
            'Zneužívanie, pretože predpokladáš to najlepšie',
            'Veľmi hlboké prežívanie pochvaly alebo kritiky',
        ],
        shows: [
            'Cudzí ľudia sa ti zdôverujú v radoch a v čakárňach.',
            'Poverenie zorganizovať to, čo nikto iný nechce.',
        ],
        ask: 'Čo by sa v tvojom konaní zmenilo, keby ľudia prestali predpokladať, že sa o nich postaráš?',
    },
    7: {
        intro: 'Sedmička znamená skúmanie: hľadanie toho, čo je pravda pod tým, čo sa tvrdí, a samotu, ktorú takéto hľadanie potrebuje.',
        meaning: 'Ako Osobnosť číslo 7 opisuje dojem zdržanlivosti: vyrovnanosť, zamyslenosť, trochu tajomnosti a pocit, že niečo ostáva bokom. Ľudia si skôr všimnú inteligenciu než teplo. Tichosť môžu čítať ako odstup, alebo ako to, že máš všetko vyriešené. Tento dojem často vzbudzuje rešpekt. Zároveň môže ľudí nechať neistých, ako k tebe pristúpiť, alebo ich nechať čakať, kým prehovoríš ako prvý.',
        strengths: [
            'Vyrovnanosť, ktorá si získava rešpekt',
            'Hĺbka, ktorú ľudia cítia',
            'Povesť človeka, ktorý premýšľa skôr, než prehovorí',
        ],
        challenges: [
            'Pôsobenie uzavreto alebo povýšenecky',
            'Zatúlanie sa dovnútra uprostred rozhovoru',
            'Ľudia váhajú, či sa k tebe vôbec priblížiť',
        ],
        shows: [
            'Pôsobiť ako niekto, kto vie niečo, čo ostatní nevedia.',
            'Musieť urobiť prvý krok skôr, než ťa ľudia naozaj poznajú.',
        ],
        ask: 'Čo malé môžeš povedať ako prvé, aby ľudia vedeli, že sa s tebou dá otvorene hovoriť?',
    },
    8: {
        intro: 'Osmička znamená následok: autoritu, zdroje, úsilie premenené na výsledky a zodpovednosť, ktorá prichádza s mocou.',
        meaning: 'Ako Osobnosť číslo 8 opisuje dojem podstatnosti: autority, ktorú ľudia vidia skôr, než si ju nárokuješ. Predpokladajú schopnosti a vyššie postavenie, berú ťa doslova a bežnú poznámku počujú ako rozhodnutie. Je to výhoda s opakujúcou sa cenou. Ľudia si pri tebe dávajú pozor, a opatrní ľudia ti nie vždy povedia to, čo potrebuješ počuť.',
        strengths: [
            'Prítomnosť, ktorá unesie celú miestnosť',
            'Vnímaná spoľahlivosť a schopnosti',
            'Férovosť, na ktorú ľudia reagujú, keď ťa poznajú',
        ],
        challenges: [
            'Pôsobenie panovačne alebo sebecky',
            'Ľudia sa podriaďujú, aj keď chceš skutočný názor',
            'Počítanie bodov alebo prístup všetko alebo nič',
        ],
        shows: [
            'Dostať za úlohu predsedať, viesť alebo rozhodnúť skôr, než sa ponúkneš.',
            'Teplo, ktoré ľudí prekvapí, keď sa objaví.',
        ],
        ask: 'Kto okolo teba ti prestal hovoriť pravdu, lebo pôsobíš tak sebaisto?',
    },
    9: {
        intro: 'Deväťka znamená dovŕšenie: široký pohľad, súcit a púšťanie, ktoré uzatvára jeden cyklus, aby mohol začať ďalší.',
        meaning: 'Ako Osobnosť číslo 9 opisuje dojem šírky: svetaskúsenosť, vyrovnanosť a trochu neosobný nadhľad. Ľudia cítia rozsah a férovosť a často majú pocit, že sa pozeráš na celú situáciu, nie na nich. Niektorí v tom vidia ladnosť a teplo vo veľkom meradle, iní odstup. Tvoj pokoj môže skrývať viac citu, než ľudia tušia.',
        strengths: [
            'Dôstojné a pokojné vystupovanie',
            'Široká empatia, ktorú ľudia cítia',
            'Vkus a nadhľad, ktoré si získavajú rešpekt',
        ],
        challenges: [
            'Pôsobenie povýšene alebo ľahostajne',
            'Závisť alebo odstup zo strany iných ľudí',
            'Dávanie až do vyčerpania a ťažkosti s prijímaním',
        ],
        shows: [
            'Pôsobiť ako niekto, kto toho veľa zažil a rozumie.',
            'Stretávať ľudí, ktorí by chceli, aby tvoja pozornosť patrila práve im.',
        ],
        ask: 'Kto by chcel aspoň na hodinu cítiť, že je práve on tvojou starosťou?',
    },
    11: {
        intro: 'Jedenástka sa chápe ako zosilnená dvojka: citlivosť, intuícia a inšpirácia s vyššou intenzitou.',
        meaning: 'Ako Osobnosť číslo 11 opisuje dojem blízkosti a hĺbky: ľudia majú pocit, že ich niekto naozaj počúva, a cítia v tebe niečo, čo nevedia celkom pomenovať. Niektorým to prináša pokoj, iných to mierne znepokojuje, akoby ich niekto videl presnejšie, než čakali. Dojem môže byť jemný aj intenzívny v tej istej minúte a ľudia môžu brať za celého teba jedno či druhé.',
        strengths: [
            'Upokojujúca prítomnosť, ktorej ľudia dôverujú',
            'Hlboké počúvanie a vhľad do motívov',
            'Túžba po súlade, ktorú ostatní cítia',
        ],
        challenges: [
            'Napätie držané pod pokojným povrchom',
            'Podceňovanie alebo mylné vnímanie ako odstup',
            'Nechať sa vtiahnuť ľuďmi, ktorí nie sú takí, akými sa zdajú',
        ],
        shows: [
            'Ľudia sa približujú alebo ustupujú a nevedia povedať prečo.',
            'Iní na teba premietajú svoje nádeje či obavy skôr, než sa naozaj dostaneš k slovu.',
        ],
        ask: 'Keď v niekom niečo vidíš, čo ti bráni to povedať?',
        master: 'Pod číslom 11 sa skrýva 2: takt, trpezlivosť a citlivosť, len vo vyššej polohe. V mnohých dňoch je dojem jednoducho dojmom dvojky, prístupným a jemným. Označenie master číslo opisuje intenzitu prítomnosti, nie hodnosť.',
    },
    22: {
        intro: 'Dvadsaťdva sa chápe ako štvorka vo väčšej mierke: veľký plán spojený s praktickou metódou.',
        meaning: 'Ako Osobnosť číslo 22 opisuje dojem váhy: vážnosť v dlhšom časovom rozsahu, než je jeden rozhovor. Ľudia vycítia, že pracuješ na niečom podstatnom, aj keď o tom nehovoríš, a vnímajú ťa ako niekoho, na koho sa dá spoľahnúť a kto vidí ďaleko. Štýl môže pôsobiť konvenčne a decentne a sebaistota navonok nemusí zodpovedať pochybnostiam vnútri.',
        strengths: [
            'Stálosť, na ktorú sa ľudia spoliehajú',
            'Organizácia a diplomacia viditeľné už pri prvom stretnutí',
            'Zmysel pre cieľ, ktorý inšpiruje lojálnych pomocníkov',
        ],
        challenges: [
            'Rozdiel medzi sebaistotou navonok a súkromnými pochybnosťami o sebe',
            'Očakávanie, že ponesieš viac, než ponúkaš',
            'Decentný štýl, ktorý skrýva tvoju ambíciu',
        ],
        shows: [
            'Zaobchádzanie ako s tým zodpovedným dospelým v miestnosti.',
            'Ľudia sa pýtajú, čo budeš budovať, často skôr, než o tebe vedia čokoľvek iné.',
        ],
        ask: 'Čo by zaznelo o tvojich ambíciách, keby bolo isté, že je to bezpečné?',
        master: 'Pod číslom 22 je 4 a dojem je často dojmom štvorky: usporiadanosť, spoľahlivosť, pracovitosť. Označenie master číslo opisuje rozsah zámeru, ktorý ľudia vycítia, nie záruku, že sa naplní.',
    },
    33: {
        intro: 'Tridsaťtri sa chápe ako šestka rozšírená smerom von: starostlivosť o domov a rodinu ponúkaná ľuďom, ku ktorým človek nie je viazaný.',
        meaning: 'Ako Osobnosť číslo 33 opisuje dojem otvoreného tepla: pohostinnosť a ochotu zapojiť sa. Ľudia cítia, že sa naozaj zapojíš, a nie zdvorilo odmietneš. Preto ti prinášajú veci, často ťažké a po krátkej známosti. Pôsobíš na nich ako bezpečný prístav a môže z toho byť miesto, z ktorého sa nedá odísť.',
        strengths: [
            'Férovosť, pohostinnosť a lojalita, ktoré ľudia cítia hneď',
            'Dobré ucho a umelecké oko',
            'Prítomnosť, ktorá ľudí pozýva uvoľniť sa a otvoriť',
        ],
        challenges: [
            'Preťahovanie síl pre cudzích ľudí',
            'Videnie len toho najlepšieho v ľuďoch a nesprávne posúdenie charakteru',
            'Pochvala alebo kritika ťa hlboko zasiahne',
        ],
        shows: [
            'Žiadosti o pomoc alebo o vypočutie od ľudí, ktorých sotva poznáš.',
            'Priatelia, ktorí berú tvoj domov ako svoje útočisko.',
        ],
        ask: 'Ktoré žiadosti sa dajú odmietnuť bez straty tepla, vďaka ktorému sa k tebe ľudia približujú?',
        master: 'Pod číslom 33 je 6 a v mnohých dňoch je dojem dojmom šestky: teplo, zodpovednosť, starostlivosť. Tradície sa líšia v tom, či je 33 samostatné master číslo. Tu sa opisuje ako zosilnená šestka, nie ako vyššia hodnosť.',
    },
};
