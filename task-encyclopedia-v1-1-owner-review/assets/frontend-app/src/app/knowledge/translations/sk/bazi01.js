/*
 * SLOVAK READING PROSE - batch bazi-01.
 *
 * 68 units, roughly 9052 words of source. Keyed by the unit id the reading
 * resolves; see ../SLOVAK_STYLE.md for the house rules every batch follows.
 *
 * Empty is a legitimate state: the overlay falls back to English per FIELD,
 * so a batch that is not written yet costs English prose, never a broken
 * reading.
 */
export const BAZI01 = {
    'bazi:five-element:balance-layers:element-balance': {
        headline: 'Štyri rôzne počty, ktoré merajú štyri rôzne veci.',
        core: [
            'Mapa BaZi nedáva jeden počet živlov, ale niekoľko, a nie sú to verzie toho istého čísla. '
                + 'HRUBÝ POČET sčíta viditeľné znaky — osem, alebo šesť, keď hodina nie je známa. Počet cez SKRYTÉ KMENE pridáva to, čo je vnútri '
                + 'každej vetvy, s váhami podľa konvencie. SEZÓNNA VÁHA sa pýta, do ktorej fázy patrí mesačná '
                + 'vetva; tradícia Ziping to považuje za dôležitejšie než akékoľvek sčítanie. A údaj o PODPORE '
                + 'ODVODENEJ Z MODELU sa pýta ešte na niečo iné: nie koľko z každej fázy je prítomné, ale či je '
                + 'konkrétne Day Master — kmeň, ktorý v mape zastupuje teba — podporovaný alebo vyčerpávaný.',
            'Bežne sa nezhodujú a tá nezhoda je informácia, nie chyba. Mapa môže mať na povrchu prevahu kovu, '
                + 'slabé zakorenenie pod ňou a môže sa narodiť v ročnom období, ktoré ju vyčerpáva — a Day Master '
                + 'sa napriek tomu číta ako podporovaný. Ktorékoľvek jediné číslo, podané ako odpoveď, by skrývalo '
                + 'tri ďalšie.',
        ],
    },
    'bazi:heavenly-stem:position-day:base-archetype': {
        headline: 'Ty: hore Day Master, dole blízke partnerstvo.',
        core: [
            'Denný pilier je predmetom celej mapy. Jeho kmeň je Day Master — vzťažný bod, voči ktorému sa meria '
                + 'všetko ostatné — a jeho vetva sa tradične číta ako ty v blízkom vzťahu, staršou rečou „palác '
                + 'manželstva“.',
            'Vzťah medzi kmeňom a vetvou priamo pod ním patrí k prvým veciam, ktoré vykladač kontroluje. Povie '
                + 'totiž, či má Day Master pod sebou pevnú pôdu. Kmeň, ktorý sedí na vetve podporujúcej jeho vlastnú '
                + 'fázu, sa opisuje ako zakorenený, a zakorenenie je jedným z troch faktorov, ktoré rozhodujú o sile.',
        ],
    },
    'bazi:heavenly-stem:position-hour:base-archetype': {
        headline: 'Neskorší život, súkromné ambície a to, čo sa odovzdáva ďalej.',
        core: [
            'Hodinový pilier sa tradične číta pre druhú polovicu života, pre deti a pre súkromné ambície, ktoré '
                + 'človek nemusí nahlas vyslovovať. Je najvnútornejšou zo štyroch pozícií a pre ostatných najmenej '
                + 'viditeľnou.',
            'Je to zároveň pilier, ktorý sa najčastejšie nedá vypočítať. Bez presného času narodenia sa hodina '
                + 'zistiť nedá a tento projekt ju radšej nechá ako nedostupnú, než by hádal. Znamená to, že mapa bez '
                + 'času narodenia naozaj číta tri piliere, nie štyri, a počty živlov vychádzajú zo šiestich znakov '
                + 'namiesto ôsmich.',
        ],
    },
    'bazi:heavenly-stem:position-month:base-archetype': {
        headline: 'Najťažší zo štyroch: kariéra, výchova a samotné ročné obdobie.',
        core: [
            'Mesačný pilier má väčšiu váhu než ktorákoľvek iná pozícia okrem dennej. Tradícia ho volá palácom '
                + 'kariéry a číta ho pre stred výchovy a — čo je rozhodujúce — jeho vetva určuje ročné obdobie, od ktorého závisí, '
                + 'či je Day Master — kmeň, ktorý v mape zastupuje teba — podporovaný alebo vyčerpávaný.',
            'Práve preto vykladači čítajú tento pilier hneď po Day Master. Všetko ostatné v mape sa mení podľa '
                + 'toho, do ktorého ročného obdobia mesačná vetva patrí, a výklad, ktorý ho preskočí, pracuje bez '
                + 'najväčšej jednotlivej informácie, akú mapa ponúka.',
        ],
    },
    'bazi:heavenly-stem:position-year:base-archetype': {
        headline: 'Pôvod, rané prostredie a to z teba, čo ľudia stretnú ako prvé.',
        core: [
            'Ročný pilier sa tradične číta pre to, odkiaľ prichádzaš: rodová línia, podmienky detstva a spoločenská '
                + 'tvár, ktorá sa na ne formuje ako odpoveď. Opisuje najvonkajšiu vrstvu človeka — tú, ktorú vidno skôr, '
                + 'než ťa niekto pozná.',
            'Jeho kmeň sa číta ako spôsob, akým toto vonkajšie ja funguje, a jeho vetva ako prostredie, v ktorom sa '
                + 'sformovalo. V mape dospelého človeka má menšiu váhu než mesačný alebo denný pilier a to, čo opisuje, '
                + 'môže byť skôr niečo prekonané než niečo súčasné.',
        ],
    },
    'bazi:luck-pillar:day-master-strength:base-archetype': {
        headline: 'Pomôcka o podpore a vyčerpaní, nie rozsudok.',
        core: [
            'Výpočet dáva skóre podpory, skóre vyčerpania a úroveň istoty. Podpora ráta to, čo Day Master — kmeň, '
                + 'ktorý v mape zastupuje teba — živí: jeho vlastnú fázu inde v mape a fázu, ktorá ho vytvára. '
                + 'Vyčerpanie ráta to, čo si z neho berie: čo vytvára on, čo ovláda a čo ovláda jeho. Rozdiel medzi '
                + 'tými dvoma je sklon mapy.',
            'V tradícii Ziping o tom rozhodujú tri veci a výpočet toto poradie dodržiava. Najväčšiu váhu má '
                + 'VLÁDNUCI MESIAC, pretože Day Master narodený v ročnom období svojej vlastnej fázy má podporu, ktorú '
                + 'nič iné nenahradí. Druhé je ZAKORENENIE: či sa fáza Day Mastera objaví medzi skrytými kmeňmi vetiev — '
                + 'preto na skrytej vrstve tak veľmi záleží. Tretia je ZOTRVAČNOSŤ, teda celkové rozloženie naprieč '
                + 'všetkými ôsmimi znakmi.',
            'Čím toto nie je: určením Useful God. Nájsť Yong Shen — jedinú fázu, ktorá najlepšie napráva konkrétnu '
                + 'nerovnováhu mapy — je úsudok závislý od zručnosti, na ktorom sa schopní vykladači často nezhodnú. '
                + 'Skóre podpory oproti vyčerpaniu je užitočná pomôcka a podstatne '
                + 'menšie tvrdenie, a tento projekt sa zámerne zastavuje pri tom menšom.',
        ],
    },
    'bazi:luck-pillar:hidden-stem-primary:base-archetype': {
        headline: 'Kmeň, ktorým vetva z väčšej časti je.',
        core: [
            'Hlavný skrytý kmeň nesie väčšinu váhy vetvy a zvyčajne sa zhoduje s jej povrchovou fázou. Hlavným '
                + 'kmeňom vetvy Mao je Yi, preto sa Mao číta ako čisté jinové drevo. Tam, kde má vetva hlavný kmeň a '
                + 'nič iné, sú vetva a kmeň v podstate tá istá vec.',
            'V praxi je to ten skrytý kmeň, ktorý najviac rozhoduje o tom, či je Day Master — kmeň, ktorý v mape '
                + 'zastupuje teba — zakorenený. Kmeň, ktorý sedí nad vetvou, ktorej hlavný skrytý kmeň zdieľa jeho '
                + 'fázu, má pod sebou skutočnú pôdu, a to je jeden z troch faktorov, ktoré tradícia Ziping zvažuje, '
                + 'kým mapu označí za silnú alebo slabú.',
        ],
    },
    'bazi:luck-pillar:hidden-stem-secondary:base-archetype': {
        headline: 'Druhá vec, ktorú vetva nesie — skutočná, ale s menšou váhou.',
        core: [
            'Vedľajší skrytý kmeň je prítomný a naozaj činný, zhruba na tretine váhy vetvy alebo menej. Práve on '
                + 'robí z vetvy viac než jej povrchovú fázu — je dôvod, prečo Shen nie je iba kov, ale kov s vodou, '
                + 'ktorá sa v ňom pohybuje.',
            'Vo vedľajších kmeňoch býva to prekvapivé v mape. Prinášajú vzťahy desiatich bohov (Ten Gods) — desať pomenovaní pre to, '
                + 'ako sa ostatné kmene majú k Day Master — a na povrchu ich vidieť nie je. Mapa, ktorá sa zo svojich '
                + 'viditeľných znakov číta priamočiaro, tak môže mať pod sebou druhú tému, nesenú vedľajšími kmeňmi.',
        ],
    },
    'bazi:luck-pillar:hidden-stem-tertiary:base-archetype': {
        headline: 'Zvyšok: prítomný, slabý a len občas rozhodujúci.',
        core: [
            'Tretí skrytý kmeň nesie najmenšiu váhu — zvyčajne desatinu alebo menej — a objavuje sa iba v takzvaných '
                + 'skladových vetvách. Tradícia ho číta ako zvyšok ročného obdobia, ktoré vetva uzatvára, nie ako činnú '
                + 'silu.',
            'Stojí za to o ňom vedieť najmä preto, že občas rozhodne tesný prípad. Tam, kde je mapa jemne vyvážená '
                + 'medzi dvoma výkladmi, môže byť práve tretí kmeň tým, čo ju preváži. A tam, kde sa zdá, že mapa nemá '
                + 'ani jeden výskyt nejakého živla, môže byť tretí kmeň jediným miestom, kde ten živel existuje. Presné váhy '
                + 'sú konvencia, nie norma: školy uvádzajú trochu odlišné percentá a výpočet zaznamená, ktorý model '
                + 'použil.',
        ],
    },
    'bazi:luck-pillar:hidden-stems:base-archetype': {
        headline: 'Z čoho je každá vetva v skutočnosti zložená.',
        core: [
            'Každá pozemská vetva obsahuje jeden až tri nebeské kmene, ktoré na povrchu mapy nevidno. To sú skryté '
                + 'kmene a práve pri ich čítaní prestáva byť BaZi tabuľkou ôsmich znakov a stáva sa rozborom. '
                + 'Viditeľné znaky sú rám, skryté kmene nesú veľkú časť obsahu.',
            'Štyri vetvy sú čisté a nesú jediný kmeň: Zi, Mao, Wu a You. Tie sa vyjadrujú jasne a ľahko sa čítajú. '
                + 'Štyri skladové vetvy — Chou, Chen, Wei a Xu — nesú po troch a sú tomu úmerne zložité: deje sa v nich '
                + 'veľa, čo povrch neukáže. Zvyšné štyri nesú dva alebo tri, s jedným prevládajúcim a jedným či dvoma '
                + 'podpornými.',
            'Prakticky to znamená, že živel, ktorý má vo viditeľnom počte nulu, môže byť pod povrchom prítomný v '
                + 'množstve, a živel, ktorý sa navrchu javí ako prevládajúci, môže mať pod sebou veľmi málo zakorenenia. '
                + 'Každý výklad, ktorý pracuje len s viditeľnými znakmi, pracuje len s časťou mapy.',
        ],
    },
    'bazi:luck-pillar:luck-pillar-direction:base-archetype': {
        headline: 'Prečo ukazujeme obe postupnosti, a nie jednu.',
        core: [
            'Smer, ktorým beží postupnosť pilierov šťastia — desaťročných období okolo mapy —, či dopredu alebo '
                + 'dozadu šesťdesiatčlenným cyklom, určuje polarita ročného kmeňa spolu s telom. Kmeň Yang s mužským '
                + 'telom a kmeň Yin so ženským telom idú dopredu; zvyšné dve kombinácie idú dozadu.',
            'Táto mapa uvádza obe postupnosti a medzi nimi nevyberá. Pravidlo uplatňuje Predpoveď, podľa tela '
                + 'zvoleného pri onboardingu. Ak telo zostalo zámerne neurčené, pravidlo nemá odpoveď — pracuje s '
                + 'dvojicou a žiadna škola ho nerozširuje —, takže sa smer nikde nevyberá a desaťročný cyklus je v '
                + 'Predpovedi vynechaný, namiesto aby sa hádal. Rámec postavený na domnienke je horší než rámec, ktorý '
                + 'povie, kde končí.',
        ],
    },
    'bazi:luck-pillar:luck-pillars:base-archetype': {
        headline: 'Desaťročné zmeny počasia okolo mapy, ktorá sa nemení.',
        core: [
            'Rodná mapa je pevná. Mení sa prostredie, v ktorom funguje, a práve to opisujú piliere šťastia: '
                + 'postupnosť desaťročných období, každé z nich kmeň nad vetvou. Pridávajú do obrazu fázy a menia, '
                + 'ktoré časti mapy sú podporené a ktoré sú pod tlakom.',
            'Tradícia tak vysvetľuje mapu, ktorá akoby fungovala inak z jedného desaťročia do druhého, hoci sa '
                + 'na človeku nezmenilo nič — zmenili sa okolité fázy. Takto '
                + 'čítaný pilier šťastia opisuje podmienky a hovorí, čomu dané obdobie praje. Nepredpovedá udalosti a '
                + 'výklad, ktorý ho berie ako predpoveď, prekročil to, čo metóda unesie.',
            'Počiatočný vek nie je svojvoľný: počíta sa zo vzdialenosti medzi okamihom narodenia a susedným '
                + 'solárnym termínom — jedným z dvadsiatich štyroch bodov, ktorými čínsky kalendár delí slnečný rok. '
                + 'Preto dvaja ľudia narodení pár dní od seba môžu do svojich postupností vstúpiť s odstupom rokov. '
                + 'Každý pilier sa číta oproti rodnej mape: či dodáva to, čo Day Master — kmeň, ktorý v mape zastupuje '
                + 'teba — postráda, alebo viac toho, čoho už má priveľa.',
        ],
    },
    'bazi:luck-pillar:tcm-correspondence:base-archetype': {
        headline: 'Samostatná symbolická vrstva — a výslovne nie zdravotný výklad.',
        core: [
            'Čínska medicínska teória priraďuje päť fáz (wu xing, v bežnej reči päť živlov) k orgánovým systémom, ročným obdobiam, chutiam, emóciám a '
                + 'svetovým stranám: drevo k pečeni a jari, oheň k srdcu a letu, zem k slezine a neskorému letu, kov k '
                + 'pľúcam a jeseni, voda k obličkám a zime. Je to starý a vnútorne súdržný systém súvzťažností a mapu '
                + 'BaZi cezeň možno čítať.',
            'Vzniká z toho symbolická téma konštitúcie: opis toho, kde je mapa hustá a kde tenká, vyjadrený '
                + 'slovníkom tradičného medicínskeho modelu. Ponúkame ho tu ako kultúrny a symbolický materiál, pretože '
                + 'je súčasťou toho, ako sa tento systém čítal po stáročia, a pretože vynechať ho by tradíciu '
                + 'skresľovalo.',
            'Nie je to posúdenie zdravia. Nič tu nediagnostikuje žiadny stav, nič žiadny nepredpovedá a počet '
                + 'živlov nehovorí vôbec nič o tele kohokoľvek. Kto má zdravotnú starosť, mal by sa obrátiť na lekára. '
                + 'Táto vrstva na to nemá žiadny vplyv a nesmie sa jej dovoliť, aby to ovplyvňovala.',
        ],
    },
    'bazi:branch-relation:branch-six-harmony:base-archetype': {
        headline: 'Dve vetvy, ktoré sa zviažu do usadenej dvojice.',
        core: [
            'Šesťnásobná harmónia zviaže dve vetvy dohromady a za správnych podmienok sa dvojica premení na novú '
                + 'fázu. Číta sa ako spevnenie, spolupráca a pripútanie — obe zapojené pozície prestanú fungovať '
                + 'samostatne a začnú fungovať ako jedna.',
            'Cenou je zotrvačnosť. Spojené vetvy sú zamestnané jedna druhou, čo je výhoda vtedy, keď spôsobovali '
                + 'škodu, a strata vtedy, keď robili užitočnú prácu. Tak ako pri spojení kmeňov, tento projekt '
                + 'štruktúru rozpozná, ale netvrdí, že premena nastala — či nastane, závisí od školy a od kontextu.',
        ],
    },
    'bazi:day-master:yi:day-master-role': {
        headline: 'Popínavá rastlina: pružná, vytrvalá, potichu využívajúca príležitosti.',
        core: [
            'Yi je drevo bez kmeňa. Rastie okolo prekážok, nie cez ne, využije akúkoľvek oporu, ktorá je po ruke, '
                + 'a prežije podmienky, ktoré by niečo vzpriamenejšie zlomili. Mäkkosť je skutočná a rovnako skutočná '
                + 'je aj húževnatosť pod ňou. Ľudí, ktorí si to prvé pomýlia s celým príbehom, to pravidelne prekvapí.',
            'Tento Day Master — kmeň, ktorý v mape zastupuje teba — sa dostáva tam, kam smeruje, prispôsobením, nie '
                + 'silou. Preto si nezvyčajne dobre poradí tam, kde je priama cesta zatvorená. Kde Jia vyhlási postoj, '
                + 'tam Yi nájde človeka, ktorý ho unesie. To je skutočná stratégia a často sa zamieňa za to, že žiadnu '
                + 'nemá.',
        ],
        portrait: {
            innerWorld: [
                'Vnútorný život je sociálne naladený a podstatne vypočítavejší, než sa zdá. Yi sleduje, čo miestnosť '
                    + 'potrebuje, a prispôsobí sa. Prispôsobovanie prebehne tak rýchlo, že ani ten, kto ho robí, si ho '
                    + 'vždy nevšimne ako rozhodnutie.',
            ],
            relationships: [
                'Yi je príjemná spoločnosť a ľahko sa viaže. Ťažko znáša, keď má v nejakom postoji stáť sám: tento '
                    + 'kmeň má radšej niekoho vedľa seba a občas bude zastávať názor hlavne preto, že ho zastáva niekto, '
                    + 'komu dôveruje. Rizikom je závislosť a prichádza postupne, nie voľbou.',
            ],
            workAndDirection: [
                'Najlepšie tam, kde na pružnosti a vzťahoch záleží viac než na právomoci — vyjednávanie, '
                    + 'koordinácia, čokoľvek, kde musíš dosiahnuť výsledok cez ľudí, ktorí ti nie sú podriadení. Yi býva '
                    + 'často dôvodom, prečo náročný projekt vyšiel, a málokedy menom, ktoré je s ním spojené.',
            ],
            shadow: [
                'Pružnosť sa mení na beztvarosť, keď nie je proti čomu rásť. Yi v situácii bez štruktúry a bez '
                    + 'podporujúceho človeka býva unášané a môže stráviť roky pripútané k niečomu, čo bolo pohodlné, nie '
                    + 'správne.',
            ],
            growth: [
                'Úlohou je vybudovať si vlastný postoj, ktorý prežije nesúhlas. Nie stuhnúť — to by premrhalo '
                    + 'skutočnú silu, ktorá tu je —, ale vedieť povedať, čo si myslíš, aj keď si tvoja doterajšia '
                    + 'opora myslí opak.',
            ],
        },
    },
    'bazi:earthly-branch:mao:base-archetype': {
        headline: 'Drevo vrcholnej jari: kultivované, spoločenské, vyhýbajúce sa priamemu konfliktu.',
        core: [
            'Mao je čisté jinové drevo na vrchole jari a Yi je jeho jediný skrytý kmeň. Tak ako Zi, aj tu robí '
                + 'jediný kmeň z Mao jednu z najčistejších vetiev v mape a tomu úmerne priamu v tom, čo prináša.',
            'Prináša kultivovanosť, spoločenskosť a sklon k umeniu, spolu so skutočnou nechuťou stretnúť sa s '
                + 'konfliktom priamo. Keď to funguje, je to diplomacia a vkus. Keď je to nespracované, je to vyhýbanie '
                + 'sa oblečené do jemnosti a sklon problém obrásť namiesto toho, aby sa riešil. Zvieraťom je Zajac.',
        ],
    },
    'bazi:ten-god:direct-officer:base-archetype': {
        headline: 'To, čo ťa ovláda, v opačnej polarite: legitímna autorita.',
        core: [
            'Direct Officer — jeden z desiatich bohov (Ten Gods), teda vzťahov, ktorými sa ostatné kmene merajú '
                + 'voči Day Master, kmeňu, ktorý v mape zastupuje teba — je ovládanie prichádzajúce ako štruktúra, nie ako sila: pravidlá, '
                + 'úrad, postavenie a očakávania spojené s rolou. Číta sa ako zodpovednosť, sebadisciplína a úprimná '
                + 'úcta k tomu, ako sa veci majú robiť.',
            'Keď je výrazný, tradícia ho číta ako svedomitosť, ktorá sa môže usadiť vnútri povolení iných ľudí, '
                + 'a ako ťažkosť konať bez schválenia. Keď je vedľajší, je to zmysel pre mieru, vďaka ktorému mapa '
                + 'nie je iba sebaslužobná. V krajnosti je to konvencia držaná pevnejšie, než situácia vyžaduje.',
        ],
    },
    'bazi:ten-god:direct-wealth:base-archetype': {
        headline: 'To, čo ovládaš ty, v opačnej polarite: zarobený, stály výnos.',
        core: [
            'Direct Wealth — jeden z desiatich bohov (Ten Gods), teda vzťahov, ktorými sa ostatné kmene merajú '
                + 'voči Day Master, kmeňu, ktorý v mape zastupuje teba — je stála podoba majetku: hodnota zo skutočne odvedenej práce, '
                + 'splnené záväzky, zisky nazbierané po kúskoch. Číta sa ako usilovnosť, praktickosť a dobre '
                + 'podložená nedôvera voči čomukoľvek, čo platí priveľa a priskoro.',
            'Keď je výrazný, tradícia ho číta ako spoľahlivosť a opatrnosť so zdrojmi: pomalé budovanie a '
                + 'udržanie toho, čo je postavené. Klasické texty ho viažu aj na záväzky, do ktorých sa vstupuje '
                + 'vážne a ktoré sa dodržia. Keď je vedľajší, je to prízemnenie, vďaka ktorému špekulatívnejšia mapa '
                + 'zostane stabilná.',
        ],
    },
    'bazi:ten-god:friend:base-archetype': {
        headline: 'Tvoja vlastná fáza v tvojej vlastnej polarite: seberovný.',
        core: [
            'Friend — jeden z desiatich bohov (Ten Gods), teda vzťahov, ktorými sa ostatné kmene merajú '
                + 'voči Day Master, kmeňu, ktorý v mape zastupuje teba — je tvoja fáza v tvojej vlastnej polarite: skôr zrkadlo než vzťah. Číta '
                + 'sa ako sebestačnosť, ako porovnávanie sa s rovesníkmi a ako schopnosť udržať vlastný postoj bez '
                + 'toho, aby ho niekto musel potvrdiť.',
            'Keď je výrazný, tradícia ho číta ako skutočnú nezávislosť, ktorá môže sťažiť spoluprácu: súperenie '
                + 'tam, kde by spolupráca poslúžila lepšie, a zdieľanú zásluhu, ktorá nestačí. V miernej podobe je to '
                + 'jednoducho schopnosť postaviť sa sám, keď treba. Ani jedno čítanie nie je rozsudok: je to opis toho, '
                + 'ako je mapa vyvážená, nie toho, akú má človek hodnotu.',
        ],
    },
    'bazi:ten-god:hurting-officer:base-archetype': {
        headline: 'To, čo vytváraš, v opačnej polarite: brilantné a neposlušné.',
        core: [
            'Hurting Officer — jeden z desiatich bohov (Ten Gods), teda vzťahov, ktorými sa ostatné kmene merajú '
                + 'voči Day Master, kmeňu, ktorý v mape zastupuje teba — je tvorba, ktorá nebude rešpektovať pravidlá. Dodáva ostré '
                + 'vyjadrovanie a skutočnú originalitu a proti autorite sa vzpiera takmer reflexívne. Klasický '
                + 'názov zaznamenáva, že poškodzuje Officer, teda štruktúru, vnútri ktorej má mapa fungovať.',
            'Keď je výrazný, tradícia ho číta ako zjavnú schopnosť spojenú s ťažkým vzťahom k hierarchii: lepšie '
                + 'mu sedí práca, ktorá hovorí sama za seba, než práca, ktorú musí niekto schváliť. Keď je vedľajší, '
                + 'je to jednoducho ostrie v tom, čo vytvára, a odmietnutie vyrobiť niečo iba priemerne dobré.',
            'Tradícia spája silný Hurting Officer aj s trením voči autorite v blízkych vzťahoch a toto čítanie '
                + 'naozaj závisí od školy — niektorí vykladači mu dávajú veľkú váhu, iní ho považujú za prežitok. '
                + 'Ponúkame ho ako uhol pohľadu, nie ako predpoveď.',
        ],
    },
    'bazi:ten-god:rob-wealth:base-archetype': {
        headline: 'Tvoja fáza v opačnej polarite: súper, ktorý je zároveň spojenec.',
        core: [
            'Rob Wealth — jeden z desiatich bohov (Ten Gods), teda vzťahov, ktorými sa ostatné kmene merajú '
                + 'voči Day Master, kmeňu, ktorý v mape zastupuje teba — je tvoja vlastná fáza v opačnej polarite: dosť blízka, aby bola '
                + 'spojencom, dosť odlišná, aby súperila. Prináša ťah, sociálnu silu a skutočnú schopnosť konať po '
                + 'boku iných — a popritom berie zdroje.',
            'Názov je nešťastný a výklad sa ním nemá riadiť. Nie je to zlovestný vplyv. Opisuje delenie, ktoré sa '
                + 'ukáže ako nerovnomerné, a súťaživosť, ktorá môže byť dôvodom, prečo sa vôbec niečo urobí. Keď je '
                + 'výrazný, tradícia ho číta ako energiu a zdroje, ktoré odchádzajú cez to, o čo sa človek delí s '
                + 'inými. Keď je vedľajší, je to jednoducho spoločenské ostrie, vďaka ktorému mapa nie je uzavretá '
                + 'sama do seba.',
        ],
    },
    'bazi:earthly-branch:you:base-archetype': {
        headline: 'Kov vrcholnej jesene: presný, rozlišujúci, ostrý v reči.',
        core: [
            'You je čistý jinový kov na vrchole jesene a Xin je jeho jediný skrytý kmeň — ďalšia vetva s jediným '
                + 'kmeňom a tomu zodpovedajúco jasná v tom, ako sa prejavuje. V tejto vetve nie je nič skryté, čo je '
                + 'jej sila aj dôvod, prečo môže dopadnúť tvrdo.',
            'Prináša presnosť, rozlišovanie a dôslednosť voči forme, s ostrosťou v reči, ktorá pôsobí ako '
                + 'náročnosť alebo ako rezanie, celkom podľa toho, v akej je spoločnosti. Keď to funguje, je to '
                + 'skutočná kontrola kvality. Keď je to nespracované, je to hľadanie chýb podané s väčšou presnosťou '
                + 'než láskavosťou. Zvieraťom je Kohút.',
        ],
    },
    'bazi:five-element:water-scarce:element-balance': {
        headline: 'Voda sa vo viditeľnom počte takmer neobjaví.',
        core: [
            'Málo vody neznamená plytkosť. Znamená, že premýšľanie sa nedeje samo od seba: táto mapa sa hýbe '
                + 'rýchlo a učí sa pomalšie, než by mohla, a zámerne postavené pauzy tu majú väčšiu cenu než kdekoľvek '
                + 'inde.',
            'Nula v súčte je najčastejšie zle čítaný údaj v mape BaZi. Neznamená nedostatok v človeku a často '
                + 'neznamená ani to, že živel chýba: voda môže sedieť vo vetve ako skrytý kmeň a v povrchovom počte sa '
                + 'vôbec neobjaviť. Tradícia číta chýbajúcu fázu ako vlastnosť, ktorá v mape sama nevzniká, '
                + 'nie ako niečo, čo človeku chýba.',
        ],
    },
    'bazi:polarity:polarity-balanced:element-balance': {
        headline: 'Obe polohy poruke, ani jedna neprevláda.',
        core: [
            'Mapa nesie zhruba rovnako jin aj jang. V praxi to opisuje prístup k obom režimom: vieš tlačiť aj '
                + 'čakať, konať na situáciu aj nechať ju vyvinúť sa, bez toho, aby jedno či druhé bolo automatickou '
                + 'odpoveďou.',
            'Výhodou je rozsah. Zodpovedajúca ťažkosť je, že mapa bez prevládajúcej polarity nemá predvolené '
                + 'nastavenie, takže situácie vyžadujúce okamžitý inštinkt v nej môžu vyvolať pauzu tam, kde by sa '
                + 'jednostrannejšia mapa jednoducho pohla. Tá pauza je zvyčajne úsudok, nie nerozhodnosť, hoci sa za '
                + 'nerozhodnosť pravidelne považuje.',
        ],
    },
    'bazi:branch-relation:branch-six-clash:base-archetype': {
        headline: 'Dve vetvy priamo oproti sebe: pohyb, vynútený.',
        core: [
            'Šesťnásobný stret spája vetvy vzdialené šesť pozícií a stavia ročné obdobie proti ročnému obdobiu a '
                + 'svetovú stranu proti svetovej strane. Je najsilnejším z pôsobení medzi vetvami a tým, ktoré sa '
                + 'najskôr prejaví ako skutočné udalosti — sťahovanie, odlúčenie, rozhodnutie urobené preto, že '
                + 'situácia by sa už neudržala.',
            'Či je stret ničivý alebo uvoľňujúci, závisí výhradne od toho, či zapojené vetvy mape pomáhali alebo '
                + 'škodili. Znamená to, že stret sám osebe hovorí veľmi málo. Záleží aj na polohe: stret medzi ročnou '
                + 'a mesačnou vetvou opisuje niečo iné než stret medzi dennou a hodinovou, pretože tie pozície '
                + 'spravujú iné časti života. Výklad musí najprv pomenovať, ktoré piliere sú zapojené, inak neznamená '
                + 'nič.',
        ],
    },
    'bazi:branch-relation:branch-three-harmony:base-archetype': {
        headline: 'Tri vetvy, ktoré tvoria úplný živlový rám.',
        core: [
            'San He čiže trojnásobná harmónia vzniká z troch vetiev vzdialených od seba štyri pozície, ktoré spolu '
                + 'vytvárajú silný prúd jedinej fázy. Je to najmocnejšie budujúce spojenie v systéme vetiev a úplná '
                + 'trojica podstatne pretvára rovnováhu živlov v mape.',
            'ČIASTOČNÁ trojnásobná harmónia — prítomné sú dve z troch — sa číta podstatne opatrnejšie. Tradícia ju '
                + 'berie ako skrytú štruktúru, nie ako činnú: rám existuje a čaká na chýbajúcu vetvu, ktorá môže prísť '
                + 'cez pilier šťastia alebo cez ročný cyklus. Výpočet zaznamená, ktorá vetva chýba, namiesto toho, aby '
                + 'čiastočnú trojicu bral ako úplnú.',
        ],
    },
    'bazi:branch-relation:stem-clash:base-archetype': {
        headline: 'Dva kmene v priamom protiklade na povrchu mapy.',
        core: [
            'Kmene vzdialené sedem pozícií sa dostávajú do stretu — protikladné fázy v tej istej polarite, ktoré '
                + 'sa stretávajú tam, kde je mapa najviditeľnejšia. Keďže kmene sedia na povrchu, stret medzi nimi sa '
                + 'skôr prejaví v správaní a vo vyslovenom postoji než v okolnostiach.',
            'Čítaj to ako napätie, nie ako poškodenie. Dve funkcie ťahajúce proti sebe vytvárajú viditeľnú '
                + 'nedôslednosť a — ak sa s tým pracuje — skutočnú schopnosť udržať naraz protichodné ohľady. Či sa to '
                + 'bude čítať ako konflikt alebo ako rozsah, závisí hlavne od toho, či zvyšok mapy dá tým dvom kmeňom '
                + 'kam ísť.',
        ],
    },
    'bazi:branch-relation:stem-combination:base-archetype': {
        headline: 'Dva kmene, ktoré sa zviažu a prestanú konať oddelene.',
        core: [
            'Dva nebeské kmene vzdialené päť pozícií tvoria spojenie. Tradícia to číta ako zviazanie: tie dva '
                + 'kmene sa pripútajú k sebe a za správnych podmienok sa dvojica premení na úplne novú fázu.',
            'Praktické čítanie je, že spojený kmeň je zaneprázdnený. Zaoberá sa svojím partnerom namiesto toho, aby '
                + 'v mape robil vlastnú prácu, čo je výhoda tam, kde ten kmeň robil problémy, a strata tam, kde robil '
                + 'niečo užitočné. Či premena naozaj nastane, silno závisí od podmienok a tento projekt to netvrdí: '
                + 'prítomnosť štruktúry sa rozpozná, jej spustenie sa netvrdí.',
        ],
    },
    'bazi:day-master:geng-aided:seasonal-context': {
        headline: 'Sekera v neskorom lete: čerstvo vyrobená a pevná.',
        core: [
            'Jangový kov v období zeme, ktorá kov vytvára. Podpora je základotvorná: tento kmeň sa tu formuje, '
                + 'nielen ostrí, a za ostrím je skutočná hmota. Rozhodnosť, pod ktorou je aj naozajstná váha, je '
                + 'zriedkavejšie spojenie, než znie, a práve ono robí z tejto zostavy niekoho, komu sa zverujú veci, '
                + 'na ktorých záleží.',
            'Povaha je rozhodná a pevne stojaca na zemi, čo je najlepšia kombinácia, akú tento kmeň ponúka. Mapy '
                + 'ako táto robia ťažké rozhodnutia, o ktorých sa neskôr ukáže, že boli dobre podložené — a to je '
                + 'podstatne zriedkavejšie než len robiť ťažké rozhodnutia.',
        ],
        portrait: {
            practicalGuidance: [
                'Ťažké rozhodnutia urobené v tomto stave zvyknú neskôr obstáť, lebo úsudok aj pôda '
                    + 'pod ním sú celé v tom istom čase. Preto sa oplatí robiť ich práve tu a neodkladať '
                    + 'ich do obdobia, kde bude to isté rozhodnutie stáť podstatne viac.',
            ],
            workAndDirection: [
                'Sedí práca, kde rozhodnutia majú následky a niekto si ich musí verejne zobrať na '
                    + 'seba. Chuť na takúto zodpovednosť je tu prítomná, čo pri tomto kmeni neplatí v '
                    + 'každom období.',
            ],
            relationships: [
                'Rozhodné a pevne stojace, čomu ľudia veria a čomu sa zvyknú podriadiť. Ostrie je '
                    + 'prítomné a práve dobre usadené, takže reže vtedy, keď je namierené, nie vždy, keď sa '
                    + 'ho niekto dotkne.',
            ],
        },
    },
    'bazi:day-master:geng:day-master-role': {
        headline: 'Neopracovaná sekera: rozhodná, drsná, účinná.',
        core: [
            'Geng je kov pred zušľachtením. Je priamy, odhodlaný a v konfrontácii sa cíti dobre, a čisto pretne '
                + 'situácie, okolo ktorých opatrnejšie povahy krúžia mesiace. Silou tu nie je presnosť, ale '
                + 'rozhodnutie, a ten rozdiel je dôležitý: Geng je najužitočnejší presne tam, kde má čistá odpoveď '
                + 'väčšiu cenu než opatrná.',
            'Je v tom drsnosť, ktorú ostatní berú buď ako osviežujúcu, alebo ako neznesiteľnú, a takmer nič medzi '
                + 'tým. Tento Day Master — kmeň, ktorý v mape zastupuje teba — vec povie, predpokladá, že dopadla ako '
                + 'informácia, a je úprimne prekvapený, keď dopadla ako útok. To prekvapenie je úprimné. Dopad je '
                + 'skutočný.',
        ],
        portrait: {
            innerWorld: [
                'Sebaskúmaniu veľmi neholduje a je s tým celkom spokojný. Geng spracúva veci konaním, takže z '
                    + 'nedoriešeného pocitu sa skôr stane rozhodnutie než premýšľanie — čo funguje lepšie, než to znie, '
                    + 'a občas preskočí niečo dôležité.',
            ],
            relationships: [
                'Ochraňujúci, verný a s tvrdými hranami. Geng bráni svojich ľudí bez zaváhania a v jemnejších '
                    + 'polohách zručný nie je, takže náklonnosť často prichádza ako praktický zásah. Najhoršie zvláda '
                    + 'situáciu, ktorá si žiada trpezlivosť namiesto vyriešenia.',
            ],
            workAndDirection: [
                'Tam, kde treba robiť ťažké rozhodnutia a niekto musí byť ochotný byť za ne neobľúbený: vymáhanie '
                    + 'pravidiel, reštrukturalizácia, kríza, súťaž. Geng si poradí zle tam, kde je práca jemná a vzťahy '
                    + 'krehké.',
            ],
            shadow: [
                'Zlyháva do prísnosti a tá zareže aj do vecí, ktoré boli živé. Druhou cenou je nízka znášanlivosť '
                    + 'voči nejednoznačnosti: Geng vynúti riešenie skôr, než na to bola situácia zrelá, a potom '
                    + 'predčasnú odpoveď obhajuje, lebo ustúpiť je horšie.',
            ],
            growth: [
                'Úlohou je naučiť sa pauzu — konkrétne disciplínu položiť jednu otázku predtým, než vynesieš verdikt. A '
                    + 'všimnúť si, že väčšina situácií na rozhodnutie v skutočnosti nečaká.',
            ],
        },
    },
    'bazi:day-master:ji-resting:seasonal-context': {
        headline: 'Pôda na jeseň: úroda sa z nej vyberá.',
        core: [
            'Narodil si sa s jinovou zemou ako svojím Day Master — kmeňom, ktorý v mape zastupuje teba — v ročnom '
                + 'období, ktoré patrí kovu. Zem kov vytvára, čo znamená, že ročné obdobie neustále odčerpáva to, čo '
                + 'vytváraš ty. Presne to sa deje s pôdou, keď sa z nej vyberie úroda.',
            'Ak to čítaš ako povahu, nie ako osud, je to celkom rozpoznateľné. Vydávaš zo seba stále. Si '
                + 'produktívny spôsobom, ktorý je čitateľný pre všetkých okrem teba, pretože to, čo vytvoríš, odchádza '
                + 'hneď, ako to vznikne. A si vyčerpanejší, než si zvykneš priznať, pretože to vyčerpávanie je '
                + 'postupné a nikdy nemá chvíľu, na ktorú by sa dalo ukázať.',
            'Zodpovedajúca sila sa v tej opatrnosti nesmie stratiť. Day Master, ktorý svoje ročné obdobie '
                + 'podporuje namiesto toho, aby proti nemu bojoval, nie je slabý. Je užitočný v tom prostom zmysle, že '
                + 'tam, kde je, idú veci lepšie. Potrebuje zásobovaciu líniu: oheň, teda teplo a uznanie, a ďalšiu '
                + 'zem, teda ľudí, ktorí časť nákladu nesú, a nielen z neho berú.',
        ],
        portrait: {
            practicalGuidance: [
                'Výdaj je čitateľný pre všetkých okrem toho, kto ho robí, čo je nezvyčajné zlyhanie a '
                    + 'potrebuje nezvyčajnú odpoveď. Vonkajší prehľad — čo tento mesiac naozaj odišlo, '
                    + 'napísané — je užitočnejší než akékoľvek premýšľanie, lebo premýšľa práve tá strana, '
                    + 'ktorá to nevidí.',
            ],
            workAndDirection: [
                'Sedí práca, kde sa stály prínos spája do celku a kde si to niekto zapisuje. Zle '
                    + 'sadne prostredie, ktoré meria len viditeľnú iniciatívu, čiže väčšinu toho, čo tento '
                    + 'stav nevytvára.',
            ],
            relationships: [
                'Dáva rovnomerne a bez sťažností, a chýbajúca sťažnosť sa u ostatných číta ako '
                    + 'chýbajúca cena. Nikdy sa to neuvedie na pravú mieru, lebo uviesť by si vyžiadalo '
                    + 'presne tú sebadôveru, ktorú tento stav tlmí.',
            ],
        },
    },
    'bazi:day-master:ji:day-master-role': {
        headline: 'Obrobené pole: prijímajúce, vyživujúce, potichu ustupujúce do pozadia.',
        core: [
            'Ji je zem, ktorá bola obrobená. Kde je Wu hora, tam je Ji pôda, v ktorej sa veci pestujú: ústretová, '
                + 'vynaliezavá, všímavá voči tomu, čo potrebujú iní, a naklonená zmiznúť do usporiadania, ktoré drží '
                + 'pokope. Je to najprispôsobivejší a najmenej viditeľný z kmeňov zeme.',
            'Príznačný vzorec je, že tam, kde je tento Day Master — kmeň, ktorý v mape zastupuje teba —, idú veci '
                + 'lepšie a nikto nevie celkom povedať prečo. Ji vytvára podmienky, nie výsledky, a život usporiadaný '
                + 'takto sa dá čítať z toho, čo umožnil, nie z toho, čo presadil. Je to skutočná podoba sily a zvnútra '
                + 'sa ľahko podceňuje.',
        ],
        portrait: {
            innerWorld: [
                'Všímavé voči druhým do tej miery, že to môže zakryť jeho vlastný stav. Ji často nevie, čo chce — '
                    + 'nie z nerozhodnosti, ale preto, že otázku, čo potrebujú iní, si zodpovedalo oveľa častejšie.',
            ],
            relationships: [
                'Ľahko sa mu dá byť blízko a ťažko sa dá spoznať. Ústretovosť je úprimná, nie vypočítavá, preto mu '
                    + 'ľudia rýchlo dôverujú — a preto sa preferencia pod ňou vysloví len zriedka. Vzťahy s týmto '
                    + 'kmeňom bežia roky na nevyslovenej dohode, ktorá vyhovuje viac jednej strane.',
            ],
            workAndDirection: [
                'Najlepšie tam, kde je hodnota v tom, aby systém fungoval, a nie v tom byť jeho viditeľným výsledkom: '
                    + 'prevádzka, učenie, starostlivosť, sprostredkovanie. Oplatí sa v tom byť zámerný, pretože povaha, '
                    + 'ktorá sa usporiada okolo potrieb iných ľudí, bude inak usporiadaná nimi.',
            ],
            shadow: [
                'Príznačným zlyhaním je vstrebávanie. Zem prijme, čo sa na ňu položí, vrátane starostí a '
                    + 'nedokončených vecí iných ľudí, a nemá žiadny prirodzený spôsob, ako to zase zložiť. To, čo sa '
                    + 'nazbiera, sa neohlási. Usadí sa a stane sa váhou, ktorú človek jednoducho nesie.',
            ],
            growth: [
                'Disciplína je nelákavá a konkrétna: vyslov preferenciu nahlas skôr, než sa usporiadanie vytvorí. '
                    + 'Tomuto kmeňu nechýba sila, často mu chýba vyslovený postoj, a takmer každá ťažkosť vyššie sa '
                    + 'zmenší, keď je preferencia na stole včas, a nie keď sa dojednáva spätne.',
            ],
        },
    },
    'bazi:day-master:xin-aided:seasonal-context': {
        headline: 'Klenot čerstvo zasadený: podporený a pekne vyniká.',
        core: [
            'Jinový kov v období zeme, ktorá kov vytvára. Podpora je základotvorná a pre tento kmeň je to '
                + 'najpohodlnejšie postavenie: kultivovaný, dobre uzemnený a dosť sebaistý na to, aby nebol krehký.',
            'Povaha je presná bez toho, aby z toho mala úzkosť, a práve v tom je rozdiel medzi Xin, ktoré pracuje, '
                + 'a Xin, ktoré sa bráni. Mapy ako táto robia náročnú prácu a robia ju rady.',
        ],
        portrait: {
            practicalGuidance: [
                'Presnosť tu nie je úzkostná, a ten rozdiel váži viac, než znie: je to rozdiel medzi '
                    + 'náročnou prácou a obranou pred kritikou. Ten istý výsledok môže vzniknúť z oboch a '
                    + 'udržateľný je len jeden z nich.',
            ],
            workAndDirection: [
                'Sedí náročná technická alebo výtvarná práca, lebo toto je stav, v ktorom je latka '
                    + 'nástrojom, nie múrom. Verzia s múrom sa objavuje v iných obdobiach a spoľahlivo '
                    + 'vytvorí menej.',
            ],
            relationships: [
                'Dobre sa ukazuje a znesie, keď sa naň niekto pozerá, čo tento kmeň nedokáže vždy. '
                    + 'Odstup, ktorý inde pôsobí ako chlad, tu takmer chýba, takže ľudia stretnú niečo '
                    + 'bližšie k tomu, čo tam naozaj je.',
            ],
        },
    },
    'bazi:day-master:xin:day-master-role': {
        headline: 'Dokončený klenot: presný, vyberavý, ľahko poškriabateľný.',
        core: [
            'Xin je kov po zušľachtení. Je presný, rozlišujúci a potichu hrdý, so skutočným citom pre estetiku a s '
                + 'nízkou znášanlivosťou voči hrubému. Kde Geng reže, tam Xin rozlišuje — a to rozlišovanie je také '
                + 'jemné, že ostatní často nevidia, na čo vlastne reaguje.',
            'Tento Day Master — kmeň, ktorý v mape zastupuje teba — si všíma kvalitu a to všímanie nie je poza. '
                + 'Naozaj registruje rozdiel medzi tým, čo bolo urobené poriadne, a tým, čo niekomu prešlo. '
                + 'Zodpovedajúca citlivosť na urážku je úmerná vloženej starostlivosti, a preto malá nedbanlivosť od '
                + 'blízkeho človeka môže dopadnúť podstatne tvrdšie, než bola myslená.',
        ],
        portrait: {
            innerWorld: [
                'Kultivovaný, sebakritický a ľahšie zraniteľný, než naznačuje jeho pokoj. Xin si svoje zranenia '
                    + 'necháva pre seba a necháva si ich dlho, pričom povrch zostáva po celý čas nedotknutý. Rozdiel '
                    + 'medzi tým, ako usadene tento kmeň vyzerá, a tým, koľko v skutočnosti nesie, je väčší než pri '
                    + 'ktoromkoľvek inom.',
            ],
            relationships: [
                'Vyberavý a hlboko verný, keď je výber raz urobený. Xin si nepriľne k mnohým ľuďom a k niekoľkým '
                    + 'priľne úplne. Ťažkosť je v tom, že jeho nároky platia aj vnútri vzťahu, a partner môže roky '
                    + 'cítiť, že je jemne hodnotený, bez toho, aby to jeden či druhý pomenoval.',
            ],
            workAndDirection: [
                'Všade tam, kde je produktom presnosť: dizajn, redigovanie, právo, remeslo, analýza. Xin sa premrhá '
                    + 'na prácu v objeme a naozaj trpí v prostrediach, kde je normou „dosť dobré“, pretože ten rozdiel '
                    + 'prestať vidieť nedokáže.',
            ],
            shadow: [
                'Vyberavosť obrátená von je kritika, obrátená dnu je nárok, ktorému nič nevyhovie. Xin vie byť aj '
                    + 'potichu panovačný — istý si vlastným vkusom spôsobom, ktorý nenecháva miesto pre vkus nikoho '
                    + 'iného — a málokedy si uvedomí, že práve to robí.',
            ],
            growth: [
                'Úlohou je nechať niečo nedokonalé a hotové. A tiež povedať, keď niečo zabolelo, pretože '
                    + 'mlčanie Xin na túto tému si ľudia zakaždým vyložia ako ľahostajnosť — a pritom by sa boli '
                    + 'prispôsobili, keby ich o to niekto požiadal.',
            ],
        },
    },
    'bazi:day-master:yi-prosperous:seasonal-context': {
        headline: 'Popínavá rastlina na jar: rastie rýchlo do všetkých strán naraz.',
        core: [
            'Jinové drevo v období dreva. Tento kmeň podporuje všetko a vzniká z toho prispôsobivosť v plnej sile: '
                + 'Yi, ktoré nájde medzeru v akejkoľvek situácii a je tam skôr, než si niekto všimne, že nejaká cesta '
                + 'vôbec existovala.',
            'Bez obmedzenia sa pružnosť mení na beztvarosť. Toto je mapa, ktorá môže rásť do toľkých smerov, že ani '
                + 'jeden nikam nedôjde, a ktorá sa vie naraz prichytiť na viacero opôr bez toho, aby sa zaviazala '
                + 'ktorejkoľvek. Štruktúra uložená zvonku je tu naozaj užitočná, nielen znesiteľná.',
        ],
        portrait: {
            practicalGuidance: [
                'Pri toľkých otvorených cestách je samotný výber tá skutočná práca, nie niečo, čo ju '
                    + 'predchádza. Rozhodnúť sa dá tak, že si jednu vyberieš na určený čas, nie navždy, '
                    + 'lebo trvalá voľba je jediný tvar, na ktorý tento stav nepristúpi.',
            ],
            workAndDirection: [
                'Sedí práca s viacerými schodnými cestami a s reálnym termínom, kde termín dodá to '
                    + 'obmedzenie, ktoré ročné obdobie nedáva. Bez neho tá istá prispôsobivosť drží '
                    + 'možnosti otvorené aj vtedy, keď už žiadna z nich nie je dostupná.',
            ],
            relationships: [
                'Väzby vznikajú rýchlo a rozpadajú sa pomaly, takže ich pribúda rýchlejšie, než na ne '
                    + 'stíha pozornosť. Nikto nevypadne, čo znie štedro a v praxi to znamená, že na každého '
                    + 'vyjde menej.',
            ],
        },
    },
    'bazi:day-master:yi-resting:seasonal-context': {
        headline: 'Popínavá rastlina v lete: kvitne a míňa sa pritom.',
        core: [
            'Jinové drevo v období ohňa, ktorý drevo živí. Toto je kmeň vo svojom najvýraznejšom stave — tvorivý, '
                + 'spoločenský, viditeľne produktívny — a míňa sa na to, aby taký bol.',
            'To, čo toto Yi vydáva, je skutočné, a cena nie je zjavná nikomu vrátane toho, kto ju platí, pretože '
                + 'tvorba pôsobí bez námahy. Vyčerpanie sem prichádza bez varovania a zvyčajne sa pripíše niečomu '
                + 'inému. Nápravou je zámerné stiahnutie sa — a bude sa zdať zbytočné presne dovtedy, kým sa zdať '
                + 'prestane.',
        ],
        portrait: {
            practicalGuidance: [
                'Kým to prebieha, výdaj pôsobí bez námahy, a práve preto vyčerpanie v tomto stave '
                    + 'prichádza bez ohlásenia a zvyčajne naraz. Zotavenie preto musí byť naplánované, nie '
                    + 'brané vtedy, keď sa zdá potrebné, lebo potrebné sa začne zdať až vtedy, keď už '
                    + 'mešká.',
            ],
            workAndDirection: [
                'Sedí tvorivá a spoločenská práca, kde je ľahkosť tvorby naozajstnou výhodou. Tá istá '
                    + 'ľahkosť je aj to, čo cenu zakrýva, takže zotavenie musí byť v rozvrhu, nie ponechané '
                    + 'na úsudok.',
            ],
            relationships: [
                'Štedrá spoločnosť, ktorú ľudia radi majú a nevšimnú si, čo jej udržanie stojí. Nič '
                    + 'na tom vystupovaní nenaznačuje námahu, takže sa nikto nepýta — a keby sa aj spýtal, '
                    + 'odpoveď by sa pravdepodobne obišla.',
            ],
        },
    },
    'bazi:earthly-branch:chou:base-archetype': {
        headline: 'Zamrznutá zem: trpezlivá, hromadiaca, držiaca to, čo ešte nie je hotové.',
        core: [
            'Chou je zem neskorej zimy a jedna zo štyroch skladových vetiev; obsahuje Ji, Gui a Xin. Tri skryté '
                + 'kmene ju robia vnútri zložitou — v tejto vetve sa deje viac, než naznačuje jej nehybnosť.',
            'Prináša výdrž a schopnosť podržať niečo cez obdobie, keď sa s tým nedá nič robiť. Keď to funguje, je '
                + 'to trpezlivosť naozaj vzácneho druhu. Keď je to nespracované, je to tvrdohlavosť, ktorá si krivdy '
                + 'odkladá rovnako starostlivo ako všetko ostatné. Pomenúva ju Byvol a skladová funkcia je dôležitejšia '
                + 'než to zviera.',
        ],
    },
    'bazi:earthly-branch:shen:base-archetype': {
        headline: 'Kov skorej jesene: rýchly, vynaliezavý, ľahko sa nudiaci.',
        core: [
            'Shen otvára jeseň a je jednou zo štyroch rastových vetiev; nesie Geng, Ren a Wu. Kľúčovou štruktúrou '
                + 'je kov vytvárajúci vodu: mechanizmus, ktorý vytvára tok. Práve pre túto kombináciu sa vetva číta '
                + 'ako bystrá, nielen ostrá.',
            'Prináša rýchlu, vynaliezavú inteligenciu — rýchlo vidí, ako niečo funguje, rýchlo nájde obchádzku a '
                + 'rovnako rýchlo stráca záujem, len čo je hlavolam vyriešený. Keď to funguje, je to skutočná '
                + 'dômyselnosť. Keď je to nespracované, je to nepokoj a stopa spolovice vyriešených problémov. '
                + 'Zvieraťom je Opica a pohyblivosť je tu podstatou.',
        ],
    },
    'bazi:earthly-branch:wu:base-archetype': {
        headline: 'Oheň vrcholného leta: energický, otvorený, netrpezlivý, keď ho niečo drží.',
        core: [
            'Wu je vetva poludnia a letného slnovratu — oheň na maxime, nesúci Ding a Ji. Je to navonok '
                + 'najenergickejšia pozícia na kruhu. Zem skrytá pod ohňom je jediné, čo v nej niečo spomaľuje.',
            'Prináša ťah, viditeľnosť a silný pohyb dopredu, s veľmi malou znášanlivosťou voči tomu byť držaný na '
                + 'mieste. Keď to funguje, je to zotrvačnosť, okolo ktorej sa ostatní organizujú. Keď je to '
                + 'nespracované, je to prepaľovanie energie aj vzťahov a netrpezlivosť, ktorá pôsobí ako odbíjanie '
                + 'druhých. Zvieraťom je Kôň.',
        ],
    },
    'bazi:earthly-branch:xu:base-archetype': {
        headline: 'Zem neskorej jesene: verná, zásadová, obozretná.',
        core: [
            'Xu je skladová vetva a suchá zem neskorej jesene; nesie Wu, Xin a Ding. Oheň a kov uložené spolu jej '
                + 'dávajú aj presvedčenie, aj tvrdú hranu, keď sa to presvedčenie spochybní.',
            'Prináša vernosť a sklon držať postoj z povinnosti, nie z výhody. Keď to funguje, je to skutočná '
                + 'zásadovosť. Keď je to nespracované, je to strnulosť, ktorá si mýli zaťatosť s bezúhonnosťou, a '
                + 'obozretnosť, ktorá vonku drží viac, než je potrebné. Pomenúva ju Pes.',
        ],
    },
    'bazi:five-element:earth-abundant:element-balance': {
        headline: 'Zem nesie veľkú časť tejto mapy.',
        core: [
            'Zem je fáza stability, sprostredkovania a trpezlivého vstrebávania všetkého, čo ostatné fázy '
                + 'vytvoria. Keď je silno zastúpená, je spoľahlivá až po nepohnuteľnosť a náchylná na starosť, ktorá '
                + 'krúži po tom istom mieste a nič nevyrieši.',
            'Prebytok zeme si ľudia najčastejšie mýlia so spoľahlivosťou. Spoľahlivosť je voľba robená opakovane; '
                + 'prebytok zeme je mapa, ktorej je nehýbať sa ľahšie než hýbať sa, a rozdiel vyjde najavo, až keď sa '
                + 'naozaj musí niečo zmeniť. Čítaj to najmä oproti skrytým kmeňom, pretože zem výrazná na povrchu a s '
                + 'malým zakorenením pod ňou sa správa úplne inak než zem, ktorá siaha až dole.',
        ],
    },
    'bazi:five-element:fire-scarce:element-balance': {
        headline: 'Oheň sa vo viditeľnom počte takmer neobjaví.',
        core: [
            'Málo ohňa neznamená chlad. Znamená, že vyžarovanie navonok nie je automatické: táto mapa vie, čo si '
                + 'myslí, a musí sa rozhodnúť, že to niekomu dá pocítiť. Na uznaní tu záleží viac, než si to človek '
                + 'zvykne priznať, práve preto, že si ho mapa sama nevyrába.',
            'Nula v súčte je najčastejšie zle čítaný údaj v mape BaZi. Neznamená nedostatok v človeku a často '
                + 'neznamená ani to, že živel chýba: oheň môže sedieť vo vetve ako skrytý kmeň a v povrchovom počte sa '
                + 'vôbec neobjaviť. Tradícia číta chýbajúcu fázu ako vlastnosť, ktorá v mape sama nevzniká, '
                + 'nie ako niečo, čo človeku chýba.',
        ],
    },
    'bazi:five-element:wood-abundant:element-balance': {
        headline: 'Drevo nesie veľkú časť tejto mapy.',
        core: [
            'Drevo je fáza rastu, plánovania a nutkania rozpínať sa. Mapa, ktorá ho nesie veľa, smeruje k '
                + 'ctižiadosti, k dobroprajnosti a k istej netrpezlivosti voči všetkému nehybnému — a v krajnosti k '
                + 'strnulosti oblečenej do zásad a k väčšiemu počtu plánov, než jeden život unesie.',
            'Prebytok dreva si ľudia najčastejšie mýlia s ťahom. Nie je to to isté: ťah veci dokončuje, prebytok '
                + 'dreva ich začína, a mapa v tomto stave môže byť desať rokov zaneprázdnená bez toho, aby sa toho veľa '
                + 'zbehlo dokopy. Skôr než z toho niečo vyvodíš, porovnaj počet s ročným obdobím, pretože drevo '
                + 'narodené do vlastnej jari sa číta veľmi inak než drevo nakopené v jeseni, ktorá ho zastrihuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-wu-xu:base-archetype': {
        headline: 'Kmeň a vetva jednej fázy: zakorenené, sústredené, jednosmerné.',
        core: [
            'Wu sediace na Xu stavia kmeň priamo na jeho vlastnú fázu, čo je najpevnejšia opora, akú môže '
                + 'pilier mať.',
            'Tradícia to nazýva zakorenením a znamená to, že vlastnosti kmeňa nie sú len prítomné, ale '
                + 'ukotvené — držia pod tlakom a nezávisia od toho, či ich zvyšok mapy udrží. Zodpovedajúca úzkosť '
                + 'záberu je skutočná: takto sústredený pilier má značnú silu v jednej polohe a veľmi malý rozsah '
                + 'mimo nej.',
            'Pes je jednou vrstvou tejto vetvy, nie celou vetvou: Xu je jangová pozícia zeme, ktorá nesie vlastné '
                + 'skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími heslami pre '
                + 'Wu a Xu a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine —, mení, ktorú '
                + 'časť života opisuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-yi-mao:base-archetype': {
        headline: 'Kmeň a vetva jednej fázy: zakorenené, sústredené, jednosmerné.',
        core: [
            'Yi sediace na Mao stavia kmeň priamo na jeho vlastnú fázu, čo je najpevnejšia opora, akú môže '
                + 'pilier mať.',
            'Tradícia to nazýva zakorenením a znamená to, že vlastnosti kmeňa nie sú len prítomné, ale '
                + 'ukotvené — držia pod tlakom a nezávisia od toho, či ich zvyšok mapy udrží. Zodpovedajúca úzkosť '
                + 'záberu je skutočná: takto sústredený pilier má značnú silu v jednej polohe a veľmi malý rozsah '
                + 'mimo nej.',
            'Zajac je jednou vrstvou tejto vetvy, nie celou vetvou: Mao je jinová pozícia dreva, ktorá nesie '
                + 'vlastné skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími '
                + 'heslami pre Yi a Mao a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine —, '
                + 'mení, ktorú časť života opisuje.',
        ],
    },
    'bazi:polarity:polarity-yin:element-balance': {
        headline: 'Mapa, ktorá funguje prijímaním, vstrebávaním a vytrvaním.',
        core: [
            'Mapa sa kloní k jinu. Opisuje to prijímajúce nastavenie: najprv vziať dnu a až potom konať, ustúpiť '
                + 'tam, kde je ustúpenie lacnejšie než odpor, a pracovať vytrvalosťou, nie silou. Nie je to to isté ako '
                + 'introverzia a mapa s prevahou jinu môže byť úplne spoločenská.',
            'Tempo je pomalšie a výdrž vyššia. Táto zostava veci prežije, všimne si, čo rýchlejšej mape uniklo, a '
                + 'k svojmu cieľu sa dostane oklukou. Keď je prehnaná, mení sa na pasivitu — dlhé čakanie na '
                + 'podmienky, ktoré aj tak nikdy neprídu — a na ťažkosť vysloviť postoj vtedy, keď to situácia '
                + 'vyžadovala.',
        ],
    },
    'bazi:polarity:yin:base-archetype': {
        headline: 'Dovnútra obrátená, odpovedajúca stránka fázy.',
        core: [
            'Jin je tá istá fáza, ktorá pracuje nepriamo: ustupuje, vstrebáva a vytrvá namiesto toho, aby tlačila. '
                + 'Jinový kmeň nie je slabšou verziou svojho jangového partnera, ale inou stratégiou, a v nepriateľskej '
                + 'mape býva z tých dvoch trvácnejší.',
        ],
    },
    'bazi:ten-god:direct-resource:base-archetype': {
        headline: 'To, čo ťa podporuje, v opačnej polarite: bežná výživa.',
        core: [
            'Direct Resource — jeden z desiatich bohov (Ten Gods), teda vzťahov, ktorými sa ostatné kmene merajú '
                + 'voči Day Master, kmeňu, ktorý v mape zastupuje teba — je priamočiara podpora: učenie, starostlivosť a '
                + 'taký druh zázemia, vďaka ktorému si človek môže dovoliť riskovať. Číta sa ako schopnosť učiť sa, '
                + 'mravná vážnosť a úcta k tomu, čo sa odovzdalo.',
            'Keď je výrazný, tradícia ho číta ako skutočnú schopnosť študovať a sklon zostať v pozícii žiaka '
                + 'dlhšie, než je nutné. Keď je vedľajší, je to zázemie, vďaka ktorému sa dá ctižiadosť udržať. '
                + 'Klasické texty ho spájajú s matkou a s formálnym vzdelaním — sú to tradičné súvislosti, nie '
                + 'výpovede o niečej rodine.',
        ],
    },
    'bazi:ten-god:indirect-resource:base-archetype': {
        headline: 'To, čo ťa podporuje, v rovnakej polarite: nekonvenčná výživa.',
        core: [
            'Indirect Resource — jeden z desiatich bohov (Ten Gods), teda vzťahov, ktorými sa ostatné kmene merajú '
                + 'voči Day Master, kmeňu, ktorý v mape zastupuje teba — je fáza, ktorá tvoj Day Master vytvára v rovnakej '
                + 'polarite: podpora prichádzajúca nepriamou cestou, nie tou samozrejmou — špecializované znalosti, '
                + 'samotárske štúdium, intuícia, záujem sledovaný po svojom.',
            'Keď je výrazný, tradícia ho číta ako hĺbku v špecializovanom odbore a príznačný odstup. Spája sa s '
                + 'výskumom a s ezoterikou a s podporou, ktorá najlepšie funguje, keď prichádza na vlastných '
                + 'podmienkach. Keď je vedľajší, je to jednoducho samostatná črta v tom, ako sa človek učí.',
        ],
    },
    'bazi:ten-god:seven-killings:base-archetype': {
        headline: 'To, čo ťa ovláda, v rovnakej polarite: tlak bez vyjednávania.',
        core: [
            'Seven Killings — jeden z desiatich bohov (Ten Gods), teda vzťahov, ktorými sa ostatné kmene merajú '
                + 'voči Day Master, kmeňu, ktorý v mape zastupuje teba — je fáza, ktorá tvoj Day Master ovláda v rovnakej polarite, a svoj '
                + 'tlak prikladá priamo. Číta sa ako rozhodnosť pod hrozbou, súperivá odvaha a autorita, ktorá sa '
                + 'berie, nie udeľuje.',
            'Názov je najznepokojivejší z celej skupiny a výklad taký byť nemá. Dobre čítaný je to odvaha pod '
                + 'tlakom: schopnosť podať výkon, keď sú podmienky ťažké, a pokoj v boji. Cenou je sklon usporiadať '
                + 'všetko okolo tlaku a ťažkosť uvoľniť sa, keď tlak, ktorý tú povahu sformoval, už nie je prítomný.',
            'Keď je výrazný a nezmiernený, tradícia ho číta ako naozaj ťažký na život — zvnútra aj zvonku. Keď je '
                + 'výrazný a zmiernený — tradícia hľadá odtok alebo zdroj, ktorý by ho zmiernil —, počíta ho medzi '
                + 'najsilnejšie štruktúry, aké mapa môže mať.',
        ],
    },
    'bazi:branch-relation:branch-six-harm:base-archetype': {
        headline: 'Tichá škoda vnútri zdanlivého spojenectva.',
        core: [
            'Vzťah ujmy opisuje zranenie, ktoré prichádza cez blízkosť, nie cez protiklad. Klasický výklad hovorí '
                + 'o zrade od spolupracovníka alebo o spolupráci, ktorá potichu stojí viac, než vracia. Je jemnejší '
                + 'než stret a tomu úmerne ťažšie si ho všimnúť.',
            'Aká váha mu patrí, je naozaj sporné. Niektorí vykladači berú ujmu ako významnú samu osebe, iní ju '
                + 'považujú za slabý odvodok stretu a čítajú ju len vtedy, keď rovnakým smerom ukazuje už stret alebo '
                + 'trest. Tento výpočet ujmy zaznamenáva a nedáva im veľkú váhu, a každý výklad postavený na ujme by '
                + 'to mal povedať.',
        ],
    },
    'bazi:branch-relation:branch-three-punishment:base-archetype': {
        headline: 'Tri vetvy, ktoré vytvárajú opotrebovanie, nie otvorený konflikt.',
        core: [
            'Trojnásobný trest zoskupuje vetvy, ktorých pôsobenie vytvára trenie brúsivého druhu, nie čistú '
                + 'zrážku. Tradícia ich pomenúva podľa nevďaku a podľa šikanovania a číta ich ako opakujúcu sa '
                + 'ťažkosť, ktorá vzniká vnútri mapy, a nie je jej uložená zvonku. Na rozdiel od stretu sa tu nič '
                + 'nezráža — vzorec sa jednoducho stále opakuje.',
            'Toto patrí k najspornejším štruktúram v BaZi. Tie zoskupenia sa nedajú čisto odvodiť z vytvárajúceho '
                + 'a ovládajúceho cyklu tak, ako sa dajú strety a harmónie, a viacerí uznávaní súčasní vykladači im '
                + 'váhu výrazne znižujú alebo ich zahadzujú úplne. Uvádzame ich tu preto, že ich výpočet rozpozná, a '
                + 'označujeme ich preto, že podať ich s rovnakou istotou ako stret by skresľovalo, ako to v odbore '
                + 'naozaj stojí.',
        ],
    },
    'bazi:earthly-branch:hai:base-archetype': {
        headline: 'Voda skorej zimy: štedrá, chtivá života, prekročená v záväzkoch.',
        core: [
            'Hai otvára zimu a je poslednou zo štyroch rastových vetiev; nesie Ren a Jia. Voda, ktorá nesie drevo — '
                + 'tok, v ktorom niečo rastie. Z troch vodných pozícií je táto tá s najviac životom, nie tá s '
                + 'najväčšou hĺbkou.',
            'Prináša štedrosť a skutočnú chuť do života spolu so sklonom nabrať si viac, než ročné obdobie unesie. '
                + 'Keď to funguje, je to teplo a šírka. Keď je to nespracované, je to prepínanie sa a ťažkosť povedať '
                + 'nie čomukoľvek, čo znie zaujímavo. Zvieraťom je Prasa.',
        ],
    },
    'bazi:earthly-branch:chen:base-archetype': {
        headline: 'Zem neskorej jari: ctižiadostivá, vnútri rušná, držiaca protiklady.',
        core: [
            'Chen je skladová vetva a najpremenlivejšia zo zemí; nesie Wu, Yi a Gui. Drevo a voda uložené vnútri '
                + 'zeme ju robia vnútri preplnenou a tradícia ju spája s veľkým rozmerom a s náhlymi zmenami.',
            'Prináša ctižiadosť a schopnosť niesť roky protichodné pohnútky bez toho, aby ich vyriešila. Keď to '
                + 'funguje, je to rozsah a výdrž. Keď je to nespracované, je to nepokoj bez jediného predmetu a '
                + 'ťažkosť rozoznať, ktorá z viacerých pohnútok je vlastne tvoja. Pomenúva ju Drak; podstata je v '
                + 'skrytých kmeňoch.',
        ],
    },
    'bazi:earthly-branch:si:base-archetype': {
        headline: 'Oheň skorého leta: strategický, navonok vrelý, vnútri počítajúci.',
        core: [
            'Si začína leto a je jednou zo štyroch rastových vetiev; nesie Bing, Geng a Wu. Určujúcou štruktúrou je '
                + 'oheň sediaci nad skrytým kovom: teplo na povrchu, výpočet pod ním.',
            'Prináša stratégiu a nezvyčajnú schopnosť dlhého nábehu — táto vetva plánuje ďalej dopredu, než dáva '
                + 'najavo. Keď to funguje, je to skutočná predvídavosť. Keď je to nespracované, je to manévrovanie, '
                + 'ktoré si ostatní nakoniec všimnú. Zvieraťom je Had a patrí k najhoršie čítaným vetvám, pretože aj to '
                + 'teplo, aj ten výpočet sú skutočné.',
        ],
    },
    'bazi:earthly-branch:zi:base-archetype': {
        headline: 'Polnočná voda: vynaliezavá, uzavretá, bdiaca vtedy, keď nebdie nič iné.',
        core: [
            'Zi je vetva polnoci a zimného slnovratu — čistá jinová voda, ktorá ako jediný skrytý kmeň nesie Gui. '
                + 'Vetva s jediným kmeňom sa prejavuje jasne, čo z nej robí jednu z ľahšie čitateľných pozícií v '
                + 'mape.',
            'Prináša inteligenciu, ktorá potichu pracuje, kým všetko ostatné spí: vynaliezavú, vnímavú a spokojnú s '
                + 'tým, že funguje bez publika. Tieňom je uzavretosť, ktorá prežije svoju užitočnosť, a nepokoj, ktorý '
                + 'vyplavuje presne v hodinách, keď všetci ostatní spia. Zvieraťom je Potkan a je to jedna z viacerých '
                + 'vrstiev, nie celý výklad.',
        ],
    },
    'bazi:five-element:earth-scarce:element-balance': {
        headline: 'Zem sa vo viditeľnom počte takmer neobjaví.',
        core: [
            'Málo zeme neznamená nestabilitu. Znamená, že usadzujúcu funkciu treba dodať zvonku — režim dňa, '
                + 'spoľahlivé miesto, ľudia, ktorí sa nehýbu —, pretože sa nevytvára vnútri. Ľudia s takouto mapou si '
                + 'často stavajú štruktúru zámerne a prekvapí ich, ako veľmi to pomáha.',
            'Nula v súčte je najčastejšie zle čítaný údaj v mape BaZi. Neznamená nedostatok v človeku a často '
                + 'neznamená ani to, že živel chýba: zem môže sedieť vo vetve ako skrytý kmeň a v povrchovom počte sa '
                + 'vôbec neobjaviť. Tradícia číta chýbajúcu fázu ako vlastnosť, ktorá v mape sama nevzniká, '
                + 'nie ako niečo, čo človeku chýba.',
        ],
    },
    'bazi:five-element:metal-abundant:element-balance': {
        headline: 'Kov nesie veľkú časť tejto mapy.',
        core: [
            'Kov je fáza zušľachťovania odoberaním: presnosť, spravodlivosť a ochota urobiť čistý rez. Keď je ho '
                + 'veľa, vytvára náročné meradlá a v krajnosti prísnosť, ktorá zareže do živého.',
            'Prebytok kovu si ľudia najčastejšie mýlia so schopnosťou. Presnosť je skutočná a otázkou je, na čo sa '
                + 'prikladá: mapa v tomto stave priloží náročné meradlo na niečo, čo ho nikdy nepotrebovalo, a '
                + 'vzniknuté trenie zažíva ako nedbanlivosť iných ľudí. Užitočnou kontrolou je sezónna vrstva, pretože '
                + 'kov vo vlastnej jeseni je v plnej sile, kým kov v letnej mape sa pretvára, či chce alebo nie.',
        ],
    },
    'bazi:five-element:metal:base-archetype': {
        headline: 'Rez: fáza, ktorá rozhoduje, čo netreba.',
        core: [
            'Kov je zušľachťovanie odoberaním. Je to fáza jesene, zberu a prerezávania a nesie presnosť, '
                + 'spravodlivosť a ochotu urobiť čistý rez. Kov v prebytku je prísnosť, ktorá zareže do živého. Príliš '
                + 'slabý kov necháva mapu, ktorá nevie dokončiť, nevie zahodiť a nevie povedať potrebnú tvrdú vetu.',
        ],
    },
    'bazi:five-element:wood:base-archetype': {
        headline: 'Rast: tlak niečoho živého nahor.',
        core: [
            'Drevo je rozpínanie sa v nejakom smere. Je to fáza jari, začiatkov a plánu, ktorý už teraz siaha za '
                + 'svoju súčasnú veľkosť, a nesie vlastnosti, ktoré patria k rastu: dobroprajnosť, ctižiadosť a istú '
                + 'netrpezlivosť voči všetkému, čo sa nechce pohnúť. Drevo v prebytku je strnulosť oblečená do zásad. '
                + 'Príliš slabé drevo necháva úmysel, ktorý nikdy celkom nevyklíči.',
        ],
    },
    'bazi:heavenly-stem:pillar-ding-chou:base-archetype': {
        headline: 'Vetva, ktorú kmeň živí: produktívne a potichu nákladné.',
        core: [
            'Ding vytvára fázu vetvy Chou, čo znamená, že tento pilier neustále produkuje namiesto toho, aby '
                + 'hromadil.',
            'Číta sa to ako tvorba — viditeľná a užitočná — a zároveň ako pomalé míňanie, ktoré sa ľahko prehliadne, pretože produkovať nepôsobí ako '
                + 'dávať niečo preč. Pilier ako tento je miestom, kde mapa tvorí, a zároveň časťou, ktorú treba dopĺňať.',
            'Byvol je jednou vrstvou tejto vetvy, nie celou vetvou: Chou je jinová pozícia zeme, ktorá nesie '
                + 'vlastné skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími '
                + 'heslami pre Ding a Chou a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine '
                + '—, mení, ktorú časť života opisuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-ding-mao:base-archetype': {
        headline: 'Vetva, ktorá živí kmeň: dobre zásobené a naklonené oprieť sa o to.',
        core: [
            'Mao vytvára fázu kmeňa Ding, takže vetva živí kmeň zospodu.',
            'Je to pohodlný pilier — kmeň má za sebou niečo pevné a nemusí si podporu vyrábať sám. Rizikom je závislosť: '
                + 'takto dobre zásobený kmeň si môže odolnosť, ku ktorej by ho tvrdšia opora prinútila, budovať '
                + 'pomaly.',
            'Zajac je jednou vrstvou tejto vetvy, nie celou vetvou: Mao je jinová pozícia dreva, ktorá nesie '
                + 'vlastné skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími '
                + 'heslami pre Ding a Mao a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine '
                + '—, mení, ktorú časť života opisuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-geng-chen:base-archetype': {
        headline: 'Vetva, ktorá živí kmeň: dobre zásobené a naklonené oprieť sa o to.',
        core: [
            'Chen vytvára fázu kmeňa Geng, takže vetva živí kmeň zospodu.',
            'Je to pohodlný pilier — kmeň má za sebou niečo pevné a nemusí si podporu vyrábať sám. Rizikom je závislosť: '
                + 'takto dobre zásobený kmeň si môže odolnosť, ku ktorej by ho tvrdšia opora prinútila, budovať '
                + 'pomaly.',
            'Drak je jednou vrstvou tejto vetvy, nie celou vetvou: Chen je jangová pozícia zeme, ktorá nesie '
                + 'vlastné skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími '
                + 'heslami pre Geng a Chen a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine '
                + '—, mení, ktorú časť života opisuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-geng-wu:base-archetype': {
        headline: 'Vetva, ktorá tlačí na svoj kmeň: obmedzené, a preto vyberavé.',
        core: [
            'Wu ovláda fázu kmeňa Geng, čo stavia kmeň pod tlak prichádzajúci priamo zospodu.',
            'Je to najstiesnenejšia opora, akú môže pilier mať, a neznamená to, že je niečo zle. Znamená to, '
                + 'že vlastnosti kmeňa sa vyjadrujú úzko a proti odporu, nie voľne. Vzniká z toho zvyčajne '
                + 'vyberavejšia a premyslenejšia verzia kmeňa — vypracovaná, nie jednoducho vydaná.',
            'Kôň je jednou vrstvou tejto vetvy, nie celou vetvou: Wu je jangová pozícia ohňa, ktorá nesie vlastné '
                + 'skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími heslami pre '
                + 'Geng a Wu a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine —, mení, ktorú '
                + 'časť života opisuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-geng-zi:base-archetype': {
        headline: 'Vetva, ktorú kmeň živí: produktívne a potichu nákladné.',
        core: [
            'Geng vytvára fázu vetvy Zi, čo znamená, že tento pilier neustále produkuje namiesto toho, aby '
                + 'hromadil.',
            'Číta sa to ako tvorba — viditeľná a užitočná — a zároveň ako pomalé míňanie, ktoré sa ľahko prehliadne, pretože produkovať nepôsobí ako '
                + 'dávať niečo preč. Pilier ako tento je miestom, kde mapa tvorí, a zároveň časťou, ktorú treba dopĺňať.',
            'Potkan je jednou vrstvou tejto vetvy, nie celou vetvou: Zi je jangová pozícia vody, ktorá nesie '
                + 'vlastné skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími '
                + 'heslami pre Geng a Zi a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine '
                + '—, mení, ktorú časť života opisuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-gui-you:base-archetype': {
        headline: 'Vetva, ktorá živí kmeň: dobre zásobené a naklonené oprieť sa o to.',
        core: [
            'You vytvára fázu kmeňa Gui, takže vetva živí kmeň zospodu.',
            'Je to pohodlný pilier — kmeň má za sebou niečo pevné a nemusí si podporu vyrábať sám. Rizikom je závislosť: '
                + 'takto dobre zásobený kmeň si môže odolnosť, ku ktorej by ho tvrdšia opora prinútila, budovať '
                + 'pomaly.',
            'Kohút je jednou vrstvou tejto vetvy, nie celou vetvou: You je jinová pozícia kovu, ktorá nesie vlastné '
                + 'skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími heslami pre '
                + 'Gui a You a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine —, mení, ktorú '
                + 'časť života opisuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-ji-you:base-archetype': {
        headline: 'Vetva, ktorú kmeň živí: produktívne a potichu nákladné.',
        core: [
            'Ji vytvára fázu vetvy You, čo znamená, že tento pilier neustále produkuje namiesto toho, aby '
                + 'hromadil.',
            'Číta sa to ako tvorba — viditeľná a užitočná — a zároveň ako pomalé míňanie, ktoré sa ľahko prehliadne, pretože produkovať nepôsobí ako '
                + 'dávať niečo preč. Pilier ako tento je miestom, kde mapa tvorí, a zároveň časťou, ktorú treba dopĺňať.',
            'Kohút je jednou vrstvou tejto vetvy, nie celou vetvou: You je jinová pozícia kovu, ktorá nesie vlastné '
                + 'skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími heslami pre '
                + 'Ji a You a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine —, mení, ktorú '
                + 'časť života opisuje.',
        ],
    },
    'bazi:heavenly-stem:pillar-jia-shen:base-archetype': {
        headline: 'Vetva, ktorá tlačí na svoj kmeň: obmedzené, a preto vyberavé.',
        core: [
            'Shen ovláda fázu kmeňa Jia, čo stavia kmeň pod tlak prichádzajúci priamo zospodu.',
            'Je to najstiesnenejšia opora, akú môže pilier mať, a neznamená to, že je niečo zle. Znamená to, '
                + 'že vlastnosti kmeňa sa vyjadrujú úzko a proti odporu, nie voľne. Vzniká z toho zvyčajne '
                + 'vyberavejšia a premyslenejšia verzia kmeňa — vypracovaná, nie jednoducho vydaná.',
            'Opica je jednou vrstvou tejto vetvy, nie celou vetvou: Shen je jangová pozícia kovu, ktorá nesie '
                + 'vlastné skryté kmene, a zviera je len štítkom na tejto nádobe. Čítaj to spolu s podrobnejšími '
                + 'heslami pre Jia a Shen a pamätaj, že to, kde tento pilier sedí — v roku, mesiaci, dni alebo hodine '
                + '—, mení, ktorú časť života opisuje.',
        ],
    },
};
