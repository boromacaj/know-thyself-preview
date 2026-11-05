/*
 * SLOVAK READING PROSE - batch western-astrology-01.
 *
 * 110 units, roughly 9009 words of source. Keyed by the unit id the reading
 * resolves; see ../SLOVAK_STYLE.md for the house rules every batch follows.
 *
 * Empty is a legitimate state: the overlay falls back to English per FIELD,
 * so a batch that is not written yet costs English prose, never a broken
 * reading.
 */
export const WESTERNASTROLOGY01 = {
    'western-astrology:aspect:conjunction:base-archetype': {
        headline: 'Dve funkcie zrastené do jednej.',
        core: [
            'Konjunkcia spája. Tie dve funkcie sa nestriedajú - fungujú ako jedna zliatina, ktorú človek nedokáže ľahko rozobrať na časti. Preto je to najsilnejší aspekt a zároveň ten, pri ktorom je najťažšie zostať objektívny.',
        ],
    },
    'western-astrology:aspect:sextile:base-archetype': {
        headline: 'Dve funkcie, ktoré spolupracujú, ak ich k tomu pozveš.',
        core: [
            'Sextil je spolupráca, ktorú máš poruke, nie taká, ktorá beží sama. Tie dve funkcie spolu fungujú dobre vždy, keď to prepojenie urobíš vedome, a driemu, keď to neurobíš. Je to aspekt, ktorý sa v mape najľahšie premrhá, lebo sa nijako neohlasuje a nič ho nenúti do používania.',
        ],
    },
    'western-astrology:aspect:square:base-archetype': {
        headline: 'Dve funkcie, ktoré si navzájom prekážajú - a je to užitočné.',
        core: [
            'Kvadratúra je trenie, ktoré má zmysel. Každá z tých funkcií zasahuje do tej druhej a to zasahovanie vynúti vývoj, do ktorého by sa ani jedna sama nepustila. Zavčasu sa to číta ako ťažkosť a neskôr ako schopnosť, a je to najspoľahlivejší motor skutočného rastu v celej mape.',
        ],
    },
    'western-astrology:aspect:trine:base-archetype': {
        headline: 'Dve funkcie, ktoré sa zhodnú bez námahy.',
        core: [
            'Trigón je ľahký v doslovnom zmysle: tie dve funkcie spolupracujú bez toho, aby ich o to niekto požiadal, takže tá schopnosť je skutočná a človek, ktorý ju má, ju obvykle nevidí. Jeho slabinou je, že nič ho nenúti do používania - a nepoužívaný talent zostane talentom.',
        ],
    },
    'western-astrology:aspect:opposition:base-archetype': {
        headline: 'Dve funkcie, ktoré sa stretnú len cez medzeru.',
        core: [
            'Opozícia postaví dve funkcie na opačné konce tej istej osi, takže nasýtiť jednu obvykle znamená vyhladovať druhú. Typicky sa objavuje premietnutá navonok - zažívaš ju ako nárok prichádzajúci od iných ľudí - dovtedy, kým ju nerozpoznáš ako vnútorný rozštep, ktorý sa nedá vyriešiť, len striedať.',
        ],
    },
    'western-astrology:chart-pattern:angular-emphasis:base-archetype': {
        headline: 'Postavenia na uhloch, ktoré mapa nedokáže udržať potichu.',
        core: [
            'Jedno alebo viac tvojich postavení stojí blízko niektorého uhla - ascendentu, medium coeli, descendentu alebo imum coeli - a poloha na uhle je najsilnejší zosilňovač v celej mape. Funkcia na uhle sa v živote stane výraznou, či si to jej nositeľ prial alebo nie, a býva to tvoja najviditeľnejšia časť.',
            'Oplatí sa to čítať skôr ako hlasitosť než ako obsah. Planéta na uhle neznamená niečo iné, než by znamenala inde; len sa nedá viesť súkromne. Počítaj s tým, že si čitateľnejší, než sa cítiš.',
        ],
    },
    'western-astrology:chart-pattern:hemisphere-eastern:base-archetype': {
        headline: 'Mapa s ťažiskom vo vlastnom smerovaní.',
        core: [
            'Väčšina tvojich postavení padá do východnej polovice mapy, teda na stranu, ktorá sa spája skôr so sebou než s druhým. Bežný výklad hovorí, že okolnosti skôr utváraš, než na ne odpovedáš: máš sklon určovať si vlastné podmienky a menej závisíš od iných ľudí, keď treba rozbehnúť život.',
            'Všimni si tú závislosť: dôraz na polovicu mapy vyžaduje domy a tie vyžadujú presný čas narodenia. Bez neho sa tento výklad nedá zostaviť. Počíta sa v systéme Whole Sign, ktorý niektoré telesá umiestňuje inam než Placidus.',
        ],
    },
    'western-astrology:chart-pattern:chart-ruler-emphasis:base-archetype': {
        headline: 'Planéta, ktorej sa zodpovedá celá mapa.',
        core: [
            'Planéta, ktorá vládne tvojmu vychádzajúcemu znameniu, je vládcom mapy a jej stav farbí všetko ostatné. To, kde stojí podľa znamenia, domu a aspektov, opisuje kanál, cez ktorý sa celá mapa zvykne prejaviť - preto môžu dvaja ľudia s rovnakým Slnkom a Mesiacom žiť dosť odlišne, ak sú ich vládcovia v inej kondícii.',
            'Za zmienku stojí: vládnutie siedmich klasických planét je nesporné, ale to, či môže mape vládnuť Urán, Neptún alebo Pluto, je živý rozkol medzi tradičnou a modernou praxou. Tento výklad používa moderné vládnutia a tradičný astrológ by trom z dvanástich vychádzajúcich znamení priradil iného vládcu.',
        ],
    },
    'western-astrology:chart-pattern:stellium-sign:base-archetype': {
        headline: 'Jeden register, do ktorého sa celá mapa stále vracia.',
        core: [
            'Tri alebo viac tvojich postavení stojí v jedinom znamení, čo robí zo štýlu toho znamenia ťažisko celej mapy. Niekoľko rôznych funkcií - to, ako myslíš, čo chceš, ako konáš - beží v rovnakom registri, a výsledkom je sústredenie, nie pestrosť: v tom režime silné a podľa toho aj úzke.',
            'Ťažkosť je v tom, že stelium je zvnútra neviditeľné. Keďže taká veľká časť teba beží na rovnakom nastavení, nepôsobí to ako nastavenie; pôsobí to ako skutočnosť. Náprava býva v protiľahlom znamení a zvykne pôsobiť trochu cudzo - a to je práve pointa, nie námietka.',
        ],
    },
    'western-astrology:planet:jupiter-scorpio:natal-placement': {
        headline: 'Rast cez to, čo väčšina ľudí radšej neskúma.',
        core: [
            'Jupiter v Škorpiónovi sa rozširuje do hĺbky, nie do šírky. Príležitosť je tu viazaná na hĺbku - na ťažký materiál, na vec, ktorú nikto nechce riešiť, na situáciu, ktorá si vyžaduje nervy - a toto postavenie skutočne obohacujú skúsenosti, ktoré by iných vyčerpali.',
            'Prestrelí sa to intenzitou a apetítom. Toto postavenie dokáže ísť za nejakou témou alebo za nejakým človekom aj za hranicu užitočnosti a má značnú kapacitu pre nadmieru, ktorá sa ľahko skryje, lebo z nej vidieť tak málo.',
        ],
    },
    'western-astrology:planet:mars-capricorn:natal-placement': {
        headline: 'Mars v exaltácii: ctižiadosť s desaťročím trpezlivosti za chrbtom.',
        core: [
            'Mars je v Kozorožcovi v exaltácii - v jednom zo svojich najsilnejších postavení - a dôvodom je, že sila tu dostane štruktúru, po ktorej môže bežať. Úsilie je strategické, rozvrhnuté a namierené na niečo, čo sa vyplatí až z dlhodobého hľadiska, a potrebná disciplína sa nezažíva ako disciplína - je to jednoducho spôsob, akým sa práca robí. Toto postavenie sa dostane ďalej než rýchlejšie postavenia, lebo nikdy nemuselo zastaviť a znova sa rozbiehať.',
            'Motor nikdy nebeží naprázdno. Tento Mars sa ťažko dokáže bez zdôvodnenia zastaviť a neproduktívny týždeň berie ako malé zlyhanie, čo sa časom nazbiera na nemalú cenu. Hnev je ovládaný až do neviditeľnosti a vychádza von ako chlad alebo ako náhle, trvalé stiahnutie priazne, ktoré môže prísť bez viditeľného varovania.',
        ],
    },
    'western-astrology:planet:neptune-capricorn:natal-placement': {
        headline: 'Dlhá generácia, ktorá si idealizovala štruktúru a legitimitu.',
        core: [
            'Neptún v Kozorožcovi zmäkčuje hrany okolo autority a úspechu. Spoločným snom je inštitúcia, ktorá naozaj funguje, a postavenie, ktoré naozaj niečo znamená; ilúziou je, že tá štruktúra sama osebe dodá obsah.',
            'Generačná atmosféra. Osobnou zložkou sú dom a aspekty.',
        ],
    },
    'western-astrology:planet:pluto-scorpio:natal-placement': {
        headline: 'Pluto vo vlastnom znamení: generácia, ktorá šla do tmy zámerne.',
        core: [
            'Pluto vládne Škorpiónovi a jeho premieňajúca sila tu pracuje na vlastnej pôde - moc, smrteľnosť, skryté a tabuizované. Generačnou témou je neuhýbavá ochota pozrieť sa na to, čo sa predtým nedalo vysloviť.',
            'Toto je kolektívne a veľmi hlboké. Tvojím to robia až dom a aspekty.',
        ],
    },
    'western-astrology:planet:saturn-gemini:natal-placement': {
        headline: 'Učiť sa dôverovať vlastnej mysli nahlas.',
        core: [
            'Saturn v Blížencoch dolieha na reč a na myslenie. Zvykne sa to prejaviť ako zvyk upravovať si vetu skôr, než ju povieš, a tiché podozrenie, že myslíš pomalšie než miestnosť. Učenie môže pôsobiť namáhavo spôsobom, ktorý so schopnosťami nemá nič spoločné.',
            'Buduje sa tým skutočná dôkladnosť: toto postavenie vie, čo vie, lebo si to overilo. Úlohou je všimnúť si, kedy sa overovanie stalo spôsobom, ako sa nikdy nemusieť odkryť.',
        ],
    },
    'western-astrology:planet:saturn-sagittarius:natal-placement': {
        headline: 'Zistiť, čomu naozaj veríš, keď sa požičaná verzia stratila.',
        core: [
            'Saturn v Strelcovi obmedzuje vieru a slobodu. Zdedené rámce - viery aj príslušnosti - zvyknú pôsobiť buď príliš ťažko, alebo nie dosť pevne, a potom nasleduje vážna a niekedy osamelá práca: zistiť, čo pokladáš za pravdivé, bez toho, aby to bolo zdedené.',
            'Buduje sa tým presvedčenie, ktoré prešlo skúškou a dá sa vysloviť. Dôležité je nedovoliť, aby sa zrútenie jednej istoty zatvrdlo do všeobecného odmietania zaviazať sa čomukoľvek.',
        ],
    },
    'western-astrology:sign:scorpio:base-archetype': {
        headline: 'Fixná voda: ide až úplne dovnútra.',
        core: [
            'Škorpión pracuje intenzitou a hĺbkou. Čokoľvek v ňom stojí, nerobí nič mimochodom: buď sa zaviaže úplne, alebo sa úplne zdrží, číta ľudí presne na úrovni, ktorú sami neponúkli, a drží si súkromnú rezervu, ktorú ani blízkosť celkom neotvorí.',
        ],
    },
    'western-astrology:house:mars-house-2:natal-placement': {
        headline: 'Úsilie ide do budovania a udržania.',
        core: [
            'Táto energia ide do hmotného. Mars v druhom dome ju mieri na zarábanie, získavanie a bránenie toho, čo je tvoje, a pre istotu budeš pracovať tvrdo a vytrvalo. Spory o peniaze a majetok sú miestom, kde sa prejaví prchkosť.',
        ],
    },
    'western-astrology:house:mercury-house-11:natal-placement': {
        headline: 'Myseľ pracuje cez siete a spoločné myšlienky.',
        core: [
            'Toto myslenie je kolektívne. Merkúr v jedenástom dome znamená, že myšlienky sa vyvíjajú v skupinách, a ťahá ťa to k rozhovoru, ktorý prebieha medzi mnohými ľuďmi, nie medzi dvoma. Priateľstvá tu často stoja na spoločnej téme.',
        ],
    },
    'western-astrology:house:sun-house-11:natal-placement': {
        headline: 'Ukazuje sa to medzi ľuďmi, ktorých si vyberáš.',
        core: [
            'Zmysel tu vzniká medzi ľuďmi. Slnko v jedenástom dome znamená, že seba nachádzaš cez skupiny, priateľstvá a spoločné ciele, nie cez sólový výkon, a to, k čomu sa pracuje, býva väčšie než tvoje vlastné miesto v tom. Patriť niekam tu nie je voliteľné.',
        ],
    },
    'western-astrology:aspect:mercury-square-saturn:natal-placement': {
        headline: 'Opatrné myslenie, zaplatené sebacenzúrou.',
        core: [
            'Toto je aspekt, ktorý človeka núti dôkladne sa pripraviť skôr, než prehovorí, a potom povedať menej, než si pripravil. Saturn brzdí Merkúr, takže myšlienka príde a hneď sa váži, či stojí za riziko, že bude nesprávna - a to váženie býva dosť prísne na to, aby to, čo napokon vyjde von, znelo neisto alebo odovzdane, nie premyslene. Pod tým často leží obava z opravovania, odbitia alebo z toho, že ťa niekto predbehne.',
            'To, čo z toho vzniká, je skutočné a tvrdo vydobyté: keďže ľahké odpovede tu nikdy nestačili, tento aspekt vytvára naozajstnú odbornosť namiesto pohotovosti a štandardy, ktoré držia aj vtedy, keď nikto nekontroluje. Úlohou je rozlíšiť užitočnú sebacenzúru, ktorá zlepšuje jasnosť, od úzkostnej, ktorá len odkladá kontakt - zvnútra sú na nerozoznanie a nie je to to isté.',
        ],
    },
    'western-astrology:element:air:base-archetype': {
        headline: 'Mentálny odstup: potrebuje to pomenovať.',
        core: [
            'Vzduch dodáva nadhľad, jazyk a schopnosť odstúpiť od zážitku ešte počas neho. Mapa s veľkou váhou vzduchu rozumie vlastnému životu veľmi dobre a prežíva ho na dĺžku ruky; mapa, kde vzduch chýba, ťažko vyjadruje to, čo napriek tomu vie.',
        ],
    },
    'western-astrology:element:earth:base-archetype': {
        headline: 'Zmysel pre hmotné: verí tomu, čo sa dá chytiť.',
        core: [
            'Zem dodáva praktickosť a trpezlivosť s pomalými procesmi. Meria výsledkom a trvanlivosťou. Mapa s veľkou váhou zeme stojí pevne na zemi až po zotrvačnosť; mapa, kde zem chýba, má myšlienky, ktoré sa stále nedokážu usadiť vo fyzickom svete.',
        ],
    },
    'western-astrology:house:jupiter-house-12:natal-placement': {
        headline: 'Rast prichádza potichu a často nečakane.',
        core: [
            'Táto rozpínavá kvalita je skrytá. Jupiter v dvanástom dome znamená, že dobré veci prichádzajú bez viditeľnej príčiny a často cez samotu, ústranie alebo prácu urobenú pre ľudí, ktorí sa to nikdy nedozvedia. Viera je tu naozaj užitočná.',
        ],
    },
    'western-astrology:house:saturn-house-8:natal-placement': {
        headline: 'Tlak je na dôvere a na tom, čo je spoločné.',
        core: [
            'Táto obmedzujúca funkcia ide hlboko. Saturn v ôsmom dome robí z blízkosti, závislosti a spoločných zdrojov ťažký terén a ovládanie je prispôsobenie, ktoré sa urobí zavčasu. Pustiť niekoho k sebe bez toho, aby bola najprv poistená úniková cesta, je dlhodobý projekt tohto postavenia.',
        ],
    },
    'western-astrology:house:uranus-house-2:natal-placement': {
        headline: 'Generačné postavenie, ktoré zosobňuje to, čo si ceníš a čo držíš.',
        core: [
            'Urán v druhom dome pripája to generačné narušenie na to, čo si ceníš, a vytvára nepokojný a často neortodoxný vzťah k peniazom a istote. Istota sa tu zvykne budovať nepravidelne a cestami, ktoré nikto neplánoval.',
        ],
    },
    'western-astrology:house:uranus-house-4:natal-placement': {
        headline: 'Generačné postavenie, ktoré zosobňuje tvoja súkromná základňa.',
        core: [
            'Urán vo štvrtom dome ho kladie ku koreňu, takže domáca základňa je nekonvenčná, pohyblivá alebo vytrhnutá zo zdedeného vzoru. Domov je niečo, čo si postavíš, nie niečo, čo len zdedíš.',
        ],
    },
    'western-astrology:house:venus-house-11:natal-placement': {
        headline: 'Náklonnosť ide cez priateľstvo a spoločné ciele.',
        core: [
            'Táto hodnotiaca funkcia je kolektívna. Venuša v jedenástom dome znamená, že najlepšie vzťahy začínajú ako priateľstvá a ten ráz si udržia, a človeka, ktorý s tebou zdieľa projekt, si ceníš rovnako ako toho, kto s tebou zdieľa posteľ.',
        ],
    },
    'western-astrology:chart-pattern:element-absent-air:base-archetype': {
        headline: 'Vedieť veci, ktoré sa ťažko dávajú do slov.',
        core: [
            'Medzi tvojimi vypočítanými postaveniami je vzduchu málo alebo vôbec. Neznamená to, že myslíš menej jasne; znamená to, že krok mimo vlastnú skúsenosť sa nedeje sám od seba, takže odstup treba dosiahnuť zámerne. Prejavuje sa to ako medzera medzi presnosťou toho, čo vnímaš, a ľahkosťou, s akou to dostaneš do slov: vieš to, a vysvetľovanie je drina.',
            'Chráni ťa to pred pascou, do ktorej padajú mapy s prevahou vzduchu: hovoriť o živote namiesto toho, aby sa žil. Pýta si to zámerný návyk - zapísať to, povedať to niekomu - ktorý dodá nadhľad, aký by vzduch dodal sám.',
        ],
    },
    'western-astrology:chart-pattern:element-absent-earth:base-archetype': {
        headline: 'Myšlienky, ktoré potrebujú zámernú cestu do fyzického sveta.',
        core: [
            'Medzi tvojimi vypočítanými postaveniami je zeme málo alebo vôbec. Typická skúsenosť je taká, že dobré myslenie, skutočný cit alebo naozajstná vízia sa stále nedokážu usadiť ako hotová vec vo svete - nie z neschopnosti, ale preto, že prekladový krok, ktorý dodáva zem, tu treba urobiť naschvál.',
            'Oplatí sa zariadiť si život tak, aby štruktúru dodalo niečo zvonku: termín, spolupracovník, postup, ktorý nepochádza od teba. Vyvažuje to sloboda od hmotnej opatrnosti, ktorá mapy s prevahou zeme drží v situáciách, z ktorých už dávno vyrástli.',
        ],
    },
    'western-astrology:chart-pattern:element-dominant-air:base-archetype': {
        headline: 'Mapa, ktorá musí vec pomenovať, než ju udrží.',
        core: [
            'Ťažisko tvojej mapy padá do vzduchu. Väčšina vypočítaných postavení stojí v Blížencoch, Váhach alebo Vodnárovi, čo vytvára povahu pracujúcu cez jazyk, porovnávanie a istý užitočný odstup - dokážeš odstúpiť od vlastnej skúsenosti ešte počas nej a svojmu životu vieš rozumieť zvonka aj zvnútra.',
            'Ten odstup je zároveň ťažkosťou. Mapa s prevahou vzduchu dokáže výrečne opísať cit, ktorý v skutočnosti nezažila, a dokáže nahradiť rozhodnutie diskusiou o ňom. Chýba jej ochota byť v niečom bez komentára.',
        ],
    },
    'western-astrology:chart-pattern:element-dominant-earth:base-archetype': {
        headline: 'Mapa, ktorá verí tomu, čo sa dá chytiť.',
        core: [
            'Ťažisko tvojej mapy padá do zeme. Väčšina vypočítaných postavení stojí v Býkovi, Panne alebo Kozorožcovi a výsledkom je povaha usporiadaná okolo hmotného a preukázateľného: meriaš výsledkom, máš skutočnú trpezlivosť s pomalými procesmi a spoľahlivosť je u teba stála a praktická.',
            'Cenou je istá ťažkopádnosť. Mapa s prevahou zeme vzdoruje všetkému neoverenému, dokáže si zameniť opatrnosť za úsudok a naozaj ťažko koná podľa niečoho, o čom sa zatiaľ nedá ukázať, že to funguje. Býva tu aj sklon niesť ťarchu ďalej len preto, že to zvládneš.',
        ],
    },
    'western-astrology:chart-pattern:modality-dominant-fixed:base-archetype': {
        headline: 'Mapa, ktorá si drží svoju pozíciu.',
        core: [
            'Tvoje postavenia sa sústreďujú vo fixných znameniach, tých, ktoré stoja vo vrchole každého ročného obdobia. Toto je hlboká výdrž: keď sa raz zaviažeš, pokračuješ, a bežné odradenia sotva zaregistruješ. Vernosť a vytrvalosť sú ich viditeľnou podobou.',
            'Zmeniť kurz si vyžaduje niečo blízke kríze. Mapa s prevahou fixných znamení vie brániť usporiadanie dávno po tom, čo prestalo slúžiť, a to bránenie zažívať ako čestnosť; cena sa obvykle počíta v obdobiach, nie v týždňoch. Oplatí sa zabudovať si vonkajšiu spätnú väzbu a vopred si sľúbiť, že sa bude brať vážne.',
        ],
    },
    'western-astrology:chart-pattern:modality-dominant-mutable:base-archetype': {
        headline: 'Mapa, ktorá sa prispôsobí tomu, čo sa naozaj deje.',
        core: [
            'Tvoje postavenia sa sústreďujú v premenlivých znameniach, tých, ktoré uzatvárajú každé ročné obdobie. Dáva to skutočnú pružnosť: prispôsobíš sa podmienkam namiesto boja proti nim, hodíš sa do situácií, s ktorými nikto nerátal, a dokážeš držať otvorených niekoľko možností bez nutnosti uzavrieť ich.',
            'Chýba tomu pevný bod. Mapa s prevahou premenlivých znamení sa dokáže ohnúť tak ochotne, že z jej vlastnej pozície nič neprežije, a hrozí jej rozptýlenie síl, ktoré pôsobí ako pohotovosť a funguje ako unášanie. Užitočnou protiváhou je rozhodnúť jednu vec, o ktorej sa už nebude znovu vyjednávať.',
        ],
    },
    'western-astrology:chart-pattern:retrograde-emphasis:base-archetype': {
        headline: 'Mapa, ktorá viac spracúva dovnútra.',
        core: [
            'Niekoľko telies bolo pri tvojom narodení retrográdnych. Retrográdny pohyb je zdanlivý, nie skutočný - planéta necúva, len tak vyzerá odtiaľto - a zhodný moderný výklad je zvnútornenie: tie funkcie sa prepracúvajú v súkromí, vo vlastnom čase, kým sa stanú dostupnými navonok.',
            'Praktickou podobou je odstup medzi tým, kedy k niečomu dôjdeš, a tým, kedy to dokážeš predložiť; číta sa to ako pomalosť a obvykle je to dôkladnosť. Za zaznamenanie stojí, že staršia tradícia brala retrogradáciu jednoducho ako oslabenie a že moderná prax to do veľkej miery opustila; tento výklad ide za moderným a ten nesúhlas je skutočný.',
        ],
    },
    'western-astrology:chart-pattern:retrograde:base-archetype': {
        headline: 'Funkcia beží najprv dovnútra, až potom von.',
        core: [
            'Retrográdna planéta sa z pohľadu Zeme pohybuje dozadu, čo je zdanlivý pohyb, nie skutočný. Zhodný výklad je zvnútornenie: funkcia nie je oslabená, ale spracúva sa v súkromí a vo vlastnom čase, kým sa stane dostupnou navonok, a býva skôr prehodnocovaná než presadzovaná.',
        ],
    },
    'western-astrology:modality:fixed:base-archetype': {
        headline: 'Udržiava.',
        core: [
            'Fixné znamenia držia pozíciu, každé stojí vo vrchole svojho ročného obdobia. Silou je skutočná výdrž; cenou je, že zmena kurzu si obvykle vyžaduje niečo blízke kríze, lebo nič menšie tým nepohne.',
        ],
    },
    'western-astrology:modality:mutable:base-archetype': {
        headline: 'Prispôsobuje sa.',
        core: [
            'Premenlivé znamenia sa prispôsobujú podmienkam. Silou je pružnosť a schopnosť pracovať s tým, čo sa naozaj deje; cenou je sklon ohnúť sa tak ochotne, že z tvojej vlastnej pozície nič neprežije.',
        ],
    },
    'western-astrology:planet:jupiter-aries:natal-placement': {
        headline: 'Rast cez to, že ideš prvý.',
        core: [
            'Jupiter v Baranovi sa rozširuje tým, že začína. Príležitosť ti prichádza skôr v okamihu pohybu než v okamihu prípravy a istá dávka šťastia naozaj chodí za ochotou začať skôr, než sú podmienky pripravené. Sebadôvera je tu skutočná a otvára dvere, ktoré by opatrnosť nechala zatvorené.',
            'Prestrelí sa to rozsahom a rýchlosťou naraz. Toto postavenie si naloží viac, než situácia unesie, a predpokladá, že rozbeh tú medzeru pokryje - čo sa niekedy stane. Keď nie, ten nedostatok obvykle objaví niekto ďalej po prúde.',
        ],
    },
    'western-astrology:planet:jupiter-gemini:natal-placement': {
        headline: 'Rast cez záber a kontakt.',
        core: [
            'Jupiter v Blížencoch sa rozširuje učením a rozprávaním s ľuďmi. Príležitosť tu prichádza cez rozhovor viac než cez plánovanie a už len tá šírka toho, čo ťa zaujíma, vytvára spojenia medzi odbormi, aké špecialisti nikdy neurobia. Je tu skutočný dar urobiť neznámu tému prístupnou.',
            'Prestrelí sa to rozptýlením. Toto postavenie povie áno viacerým veciam, než pri koľkých môže byť jeden človek prítomný, a záber, ktorý v tridsiatke vyzerá ako bohatstvo, môže v päťdesiatke vyzerať ako absencia čohokoľvek dokončeného. Hĺbku si tu treba zvoliť proti srsti.',
        ],
    },
    'western-astrology:planet:jupiter-sagittarius:natal-placement': {
        headline: 'Jupiter vo vlastnom znamení: viera, diaľka a chuť na väčší rámec.',
        core: [
            'Jupiter vládne Strelcovi a jeho rozpínavá sila tu beží bez trenia. Optimizmus je skutočný, nie vyrobený, príležitosť sa nachádza v cudzine a v neznámom, a je tu naozajstná schopnosť držať veľkú predstavu o tom, čím život môže byť, a konať, akoby bola dostupná.',
            'Bez obmedzenia je to postavenie, ktoré sľúbi, čo nedokáže splniť, a v tej chvíli tomu samo verí. Presvedčenie predbieha dôkazy, ďalší horizont vytláča ten súčasný a detail sa nechá na niekoho s menším rozhľadom.',
        ],
    },
    'western-astrology:planet:mars-aquarius:natal-placement': {
        headline: 'Konanie zo zásady, pod nezvyčajným uhlom.',
        core: [
            'Mars vo Vodnárovi sa nedá tlačiť a ani sám netlačí očakávaným smerom. Konáš z dôvodov, ktoré vieš vysloviť, priťahuje ťa prístup, ktorý nikto neskúsil, a spoločenský tlak je na teba takmer bez účinku - to, že to robia všetci, je skôr argument proti. Úsilie je prerušované, nie rovnomerné, prichádza v návaloch okolo nejakej myšlienky.',
            'Odstup otupuje silu. Tento Mars dokáže obhájiť pozíciu s úplným presvedčením a potom podľa nej nekonať, a dokáže byť nápadne nedotknutý ľudskou cenou zmeny, ktorú považuje za správnu. Pri priamej konfrontácii sa stáva chladnejším a teoretickejším, čo je v hádke účinné a vo vzťahu na zúrenie.',
        ],
    },
    'western-astrology:planet:mars-sagittarius:natal-placement': {
        headline: 'Energia, ktorá ide doširoka, rýchlo a za niečím, čo má zmysel.',
        core: [
            'Mars v Strelcovi koná z presvedčenia. Daj tomuto postaveniu niečo, čomu verí, a energia je obrovská a naozaj nákazlivá; daj mu niečo, čo považuje za zbytočné, a nie je tam vôbec nič. Podstupuješ veľké riziká s úprimnou dobrou náladou a zo zádrhelov sa spamätávaš rýchlejšie, než sa zdá rozumné.',
            'Rozsah predbieha logistiku. Tento Mars sa zaviaže k viac, než situácia unesie, a potom ten nedostatok berie ako cudzie zlyhanie odvahy, a dokáže byť preč skôr, než dorazia následky posledného nadšenia. V konflikte je zbraňou priamosť a z pozície toho, kto ju schytá, pôsobí zámernejšie, než býva.',
        ],
    },
    'western-astrology:planet:mars-virgo:natal-placement': {
        headline: 'Úsilie namierené presne na tú časť, na ktorej naozaj záleží.',
        core: [
            'Mars v Panne pracuje skôr efektívne než silou. Nájdeš konkrétne miesto zlyhania a úsilie dáš tam, vďaka čomu tvoje úsilie zájde ďaleko a najlepšie funguje tam, kde si úloha žiada starostlivosť, nie silu. Vytrvalé, metodické nasadenie je skutočná, tichá sila.',
            'Presnosť sa mení na trenie. Tento Mars dokáže minúť dostupnú energiu na dolaďovanie niečoho, čo už bolo dosť dobré, a dokáže byť ostro podráždený nedbanlivosťou iných spôsobom, ktorý stojí viac dobrej vôle, než stála tá nedbanlivosť. Hnev tu vychádza von ako kritika, nie ako hnev, čo sa ťažšie zodpovedá a ťažšie rieši.',
        ],
    },
    'western-astrology:planet:mercury-capricorn:natal-placement': {
        headline: 'Štruktúrované myslenie s dlhým časovým horizontom.',
        core: [
            'Merkúr v Kozorožcovi je ako stvorený na problém, ktorý trvá roky. Myslí v postupnostiach a následkoch, zahodí, čo neprežije stret so skutočnosťou, a má skutočnú znášanlivosť voči neatraktívnemu stredu ťažkej práce. Keď hovoríš, obvykle už máš domyslené, a preto to, čo povieš, váži viac, než by jeho hlasitosť naznačovala.',
            'Tá vážnosť sa nedá vypnúť. Tento Merkúr sa pomaly zaoberá myšlienkou bez viditeľného úžitku a dokáže odmietnuť niečo naozaj sľubné len preto, že to prišlo bez plánu. Je tu aj zvyk upravovať si vetu, ktorý stojí skutočné príspevky: myšlienka sa zadrží, kým nie je celkom obhájiteľná, a dovtedy sa rozhovor pohol ďalej.',
        ],
    },
    'western-astrology:planet:mercury-gemini:natal-placement': {
        headline: 'Myseľ vo vlastnom dome: rýchla, široká a nekonečne zvedavá.',
        core: [
            'Merkúr vládne Blížencom a je to vidieť. Prijímaš veľa, spájaš veci, o ktorých spojenie ťa nikto nežiadal, a prechádzaš medzi polohami - odbornou, vtipnou, vážnou - a ani si to nevšímaš. Učenie je rýchle a je naozaj príjemné, nie účelové, a vo vlastnej spoločnosti sa takmer nikdy nenudíš, lebo je vždy čo prevracať v hlave.',
            'Hĺbku si tu treba zvoliť zámerne. Tá istá rýchlosť, ktorá umožňuje šírku, robí zo zotrvania pri jednej téme za hranicou zaujímavého trest, takže Merkúr v Blížencoch dokáže nazbierať obrovské množstvo vedomostí, ktoré končia jednu vrstvu pred odbornosťou. Je tu aj sklon obhajovať pozície pre potešenie z hádky, čo je zábavné a občas drahé.',
        ],
    },
    'western-astrology:planet:mercury-pisces:natal-placement': {
        headline: 'Myslenie dojmom, ktoré dorazí skôr než odôvodnenie.',
        core: [
            'Merkúr v Rybách berie veci vcelku. Zaznamenávaš atmosféru, náznak a to, čo je pod slovami, a často vieš odpoveď dávno predtým, než dokážeš zostaviť dôvod pre ňu - čo je skutočná forma inteligencie a ťažko sa obhajuje na porade. Metafora tu funguje lepšie než definícia a obrazy zostanú, keď tvrdenia už dávno odišli.',
            'Presnosť je tu vecou zámernej disciplíny. Tento Merkúr je naozaj nejasný v podrobnostiach - časy, čísla, kto čo povedal - a medzeru nepozorovane vyplní niečím pravdepodobným. Nasáva aj istotu iných ľudí, takže rázne vyslovená nesprávna myšlienka dokáže vytlačiť tvoj vlastný správny dojem, a potom už nebudeš vedieť povedať, kam sa ten tvoj podel.',
        ],
    },
    'western-astrology:planet:mercury-scorpio:natal-placement': {
        headline: 'Vyšetrujúca myseľ, ktorá predpokladá, že pod povrchom je viac.',
        core: [
            'Merkúr v Škorpiónovi neprijíma povrchovú verziu. Hľadá, čo sa vynecháva, a obvykle niečo nájde, lebo myseľ takto namierená dosť dlho sa stane veľmi dobrou v čítaní medzery medzi tým, čo ľudia hovoria, a tým, čo robia. Tomuto postaveniu sedí výskum a rovnako aj každá práca, kde je skutočná odpoveď zahrabaná a niekto musí byť ochotný kopať aj za hranicu nepohodlia.',
            'Podozrievavosť beží bez ohľadu na to, či je oprávnená. Tento Merkúr dokáže z veľmi mála dôkazov zostaviť prepracovaný a vnútorne súdržný výklad cudzích pohnútok a dlho si ho držať v súkromí bez akéhokoľvek overenia. Reč je tu strategická - povieš presne to, čo máš v pláne povedať - a ľudia nablízku si môžu všimnúť, že nikdy nedostanú celý obraz.',
        ],
    },
    'western-astrology:planet:mercury-virgo:natal-placement': {
        headline: 'Triediaca myseľ: presná, užitočná a tvrdá na seba.',
        core: [
            'Merkúr v Panne aj vládne, aj je v exaltácii - v jednom zo svojich najsilnejších postavení - a výsledkom je myseľ, ktorá je od začiatku určená na rozlišovanie. Kde iný Merkúr zbiera informácie, tento ich triedi: skúša ich, oddeľuje nosné od ozdobného a všimne si nezrovnalosť, ktorú nikto iný nezachytil. Svoje tvrdenia mierniš, lebo vidíš výnimky, takže povieš „asi“ tam, kde hlasnejšia myseľ povie „jasné“ - a tá opatrnosť má zvyčajne svoj dôvod.',
            'Otočený dovnútra je ten istý nástroj trestajúci. Upravuje vetu skôr, než vyjde von, a preto tento Merkúr často pôsobí neisto, hoci je v skutočnosti opatrný, a dokáže prepracovať hotovú vec za bod zlepšenia až do bodu ochromenia. Druhou cenou je nevyžiadaná oprava: presnosť ponúknutá tam, kde ju nikto nechcel, môže vyznieť ako kritika, nech bola mienená akokoľvek.',
        ],
    },
    'western-astrology:planet:moon-aquarius:natal-placement': {
        headline: 'Cit pozorovaný z krátkej vzdialenosti, obvykle presne.',
        core: [
            'Mesiac vo Vodnárovi kladie krok medzi seba a vlastné reakcie. Dokážeš opísať, čo cítiš, ešte počas toho, čo to cítiš, čo ti dáva skutočný pokoj pod tlakom a naozajstnú schopnosť pomôcť človeku v núdzi bez toho, aby ťa to strhlo. Citová nezávislosť je tu skutočná: nepotrebuješ veľa a ani tebe by nebolo po vôli, keby ťa niekto potreboval priveľmi.',
            'Ten krok sa môže zmeniť na múr. Tento Mesiac dokáže držať každého v takej vzdialenosti, aby nebol nepohodlný, a zažívať to ako voľbu, nie ako vzorec. Pod skutočným tlakom reakciou nie je siahnuť po niekom, ale stať sa odťažitejším, teoretickejším a rozumnejším - presne vo chvíli, keď rozumnosť nie je to, čo situácia potrebuje.',
        ],
    },
    'western-astrology:planet:moon-cancer:natal-placement': {
        headline: 'Mesiac doma, k dobrému aj k zlému.',
        core: [
            'Toto je Mesiac v znamení, ktorému vládne, a účinkom je zosilnenie, nie uľahčenie. Citový život je tu hlboký, prílivový a s dlhou pamäťou: prežívaš veci dôkladne, pamätáš si, ako niečo pôsobilo, dlho po tom, čo ti z pamäti vypadlo, čo sa povedalo, a máš presný inštinkt na citové rozpoloženie miestnosti, ktorý dorazí skôr než akýkoľvek dôkaz. Bezpečie ti dáva patričnosť - človek, miesto, dvere, ktoré sa dajú zavrieť.',
            'Cenou je tá pamäť. Mesiac v Rakovi si drží zranenia s rovnakou vernosťou ako všetko ostatné a stará bolesť sa dá znovu prežiť v plnej sile pri veľmi malom podnete. Ochranný reflex siaha až k stiahnutiu: keď je tento Mesiac zranený, ide bokom a dovnútra namiesto toho, aby to povedal, a ľudia, ktorí to spôsobili, často vôbec netušia, že sa niečo stalo.',
        ],
    },
    'western-astrology:planet:moon-libra:natal-placement': {
        headline: 'Rovnováha sa vracia tým, že sa dá do poriadku vzťah.',
        core: [
            'Mesiac vo Váhach sa nedokáže usadiť, kým je medzi dvoma ľuďmi niečo nedoriešené. Nesúlad tu cítiš okamžite a nutkanie napraviť ho je okamžité a väčšinou mimovoľné, čo z tohto Mesiaca robí naozaj zručného zmierovateľa a trochu nespoľahlivého svedka vlastnej pozície. Si príjemná spoločnosť skôr zo stavby než z námahy.',
            'Cenou je, že harmónia sa kupuje za tvoje vlastné preferencie, opakovane a bez toho, aby si to niekto všimol - vrátane teba. Mesiac vo Váhach sa môže ocitnúť v usporiadaniach, ktoré každému vyhovujú dostatočne a nikomu úplne. Je tu aj závislosť tvojej nálady od nálady toho druhého, ktorú sa oplatí sledovať: keď je nepokoj u toho druhého, nedokážeš sa upokojiť ani ty, čo mu dáva kontrolu, na akej sa nikto nedohodol.',
        ],
    },
    'western-astrology:planet:moon-scorpio:natal-placement': {
        headline: 'Cit, ktorý ide hlboko, zostáva súkromný a neriedi sa.',
        core: [
            'Mesiac v Škorpiónovi cíti v hĺbke, kam väčšina ľudí nechodí, a rozhodol sa - obvykle zavčasu a obvykle z nejakého dôvodu - to neukazovať. Namiesto toho dostaneš zadržanie: pod pokojnou hladinou sa deje veľmi veľa. A k tomu presné, takmer nespravodlivé vnímanie toho, čo iní skrývajú, keďže zvnútra vieš, ako skrývanie vyzerá.',
            'Dôvera je tu takmer dvojhodnotová a je pomalá. Keď sa raz dá, je takmer úplná; keď sa raz zlomí, veľmi ťažko sa vydá znova, a tento Mesiac dokáže niesť stiahnutie dlho bez toho, aby povedal, za čo bolo. Druhou ťažkosťou je, že takto sústredený cit musí niekam ísť: nevyjadrený sa mení na podozrievavosť alebo na kontrolujúce zovretie situácií, ktorým by v skutočnosti nič nebolo, keby sa nechali tak.',
        ],
    },
    'western-astrology:planet:moon-taurus:natal-placement': {
        headline: 'Pohodlie tu nie je luxus; je to regulačný mechanizmus.',
        core: [
            'Mesiac v Býkovi sa upokojuje cez hmatateľné a známe. Jedlo, teplo, známe kreslo, tá istá prechádzka v ten istý čas - to nie sú pôžitky, ale skutočná mechanika, ktorou sa tento Mesiac vracia na východiskovú hodnotu, a prísť o ne stojí viac, než sa zdá. Citovo je tebou pomaly hnúť a rovnako pomaly ťa rozkolísať.',
            'Tá stálosť má tvrdú hranu. Keď sa tento Mesiac raz usadí v nejakom usporiadaní, nechce ho mať rušené, a vstrebe prekvapivé množstvo nešťastia, len aby nemusel prijať prevrat, ktorý by zmena priniesla. Je tu aj spojenie medzi citom a hľadaním pohodlia, ku ktorému sa oplatí byť úprimný: siahnuť po niečom, čo sa dá mať alebo podržať, môže byť citová reakcia v inej podobe.',
        ],
    },
    'western-astrology:planet:neptune-aquarius:natal-placement': {
        headline: 'Dlhá generácia, ktorá si idealizovala kolektív.',
        core: [
            'Neptún vo Vodnárovi rozpúšťa hranice okolo skupiny a siete. Spoločnou túžbou je naozaj prepojené ľudstvo a ilúziou je, že prepojenie vo veľkom meradle je to isté ako prepojenie.',
            'Skôr tón obdobia než povahová črta. Konkrétnou ju robia dom a aspekty.',
        ],
    },
    'western-astrology:planet:neptune-sagittarius:natal-placement': {
        headline: 'Dlhá generácia, ktorá si idealizovala samotný zmysel.',
        core: [
            'Neptún v Strelcovi rozpúšťa hranice okolo viery. Kolektívnou túžbou je niečo dosť veľké na to, aby to vysvetlilo všetko, a ilúziou je, že istota vo veľkej otázke robí tie malé zbytočnými.',
            'Štrnásťročný tón. Zosobňujú ho dom a aspekty.',
        ],
    },
    'western-astrology:planet:neptune-scorpio:natal-placement': {
        headline: 'Dlhá generácia, ktorá si idealizovala hĺbku a premenu.',
        core: [
            'Neptún v Škorpiónovi rozmazáva čiaru okolo moci, blízkosti a skrytého. Spoločnou fascináciou je to, čo leží pod povrchom, a ilúziou je, že intenzita je to isté ako pravda.',
            'Kultúrne, nie osobné. Konkrétnou časťou sú dom a aspekty.',
        ],
    },
    'western-astrology:planet:pluto-libra:natal-placement': {
        headline: 'Generácia, ktorá prepísala podmienky partnerstva.',
        core: [
            'Pluto vo Váhach premieňa samotný vzťah: čo je manželstvo, čo si vyžaduje rovnosť a čo sa stane, keď staré usporiadanie už neobstojí. Tieňom je mocenský zápas vedený jazykom spravodlivosti.',
            'Generačné, nie osobné. Tvojím ho robia dom a aspekty.',
        ],
    },
    'western-astrology:planet:pluto-sagittarius:natal-placement': {
        headline: 'Generácia, ktorá prepísala vieru a jej inštitúcie.',
        core: [
            'Pluto v Strelcovi premieňa to, čo kultúra pokladá za pravdu: náboženstvo, ideológiu, rámce, ktorými sa ospravedlňuje všetko ostatné. Tieňom je presvedčenie zatvrdnuté do niečoho, čo dovolí čokoľvek.',
            'Generačná vrstva. Osobným sa to stáva v dome a v aspektoch.',
        ],
    },
    'western-astrology:planet:pluto-virgo:natal-placement': {
        headline: 'Generácia, ktorá prepísala prácu, zdravie a telo.',
        core: [
            'Pluto v Panne premieňa bežnú mechaniku života - prácu, medicínu, rutiny, z ktorých je život poskladaný. Tieňom je perfekcionizmus uplatnený vo veľkom, so skutočnou ľudskou cenou.',
            'Kolektívna vrstva. Individuálnou zložkou sú dom a aspekty.',
        ],
    },
    'western-astrology:planet:saturn-aquarius:natal-placement': {
        headline: 'Zistiť, kam patríš, po návrate z odstupu.',
        core: [
            'Saturn má klasické vládnutie nad Vodnárom a tlak tu prikladá na patričnosť. Často je tu pocit byť tým vonkajším - nie dramaticky, len štruktúrne - a prispôsobením je zásadová nezávislosť, ktorá je skutočná a zároveň sčasti obranou.',
            'Vyrastá z toho človek, ktorý dokáže udržať pozíciu proti skupine a mať pravdu. Úlohou je dovoliť, aby ti na nejakej skupine záležalo, čo si vyžaduje prijať, že byť prijatý nie je to isté ako byť pohltený.',
        ],
    },
    'western-astrology:planet:sun-cancer:natal-placement': {
        headline: 'Zmysel postavený okolo toho, čo chrániš.',
        core: [
            'Toto Slnko pozná seba cez patričnosť. Nie cez spoločenskosť - Slnko v Rakovi môže byť dosť uzavreté - ale cez tú konkrétnu vec mať ľudí, ktorí sú tvoji, a miesto, ktoré je tvoje, a usporiadať život okolo toho, aby oboje zostalo celé. Ctižiadosť je tu skutočná, ale málokedy sa vysloví ako ctižiadosť; objaví sa skôr ako presvedčenie, že o určité veci sa treba postarať, a ako ochota veľmi tvrdo pracovať, aby sa tak stalo.',
            'Prístup je nepriamy, čo je dobré o sebe vedieť, lebo ľuďom, ktorí idú na veci rovno, pôsobí ako vyhýbavý. A ochranársky inštinkt sa nevypne, keď už ochrana nie je potrebná: Slnko v Rakovi dokáže ďalej riadiť citové počasie dospelým, ktorí by si ho radšej riadili sami, a byť naozaj zranené, keď sa tá starostlivosť zažíva ako kontrola.',
        ],
    },
    'western-astrology:planet:sun-capricorn:natal-placement': {
        headline: 'Ja, ktoré sa stavia pomaly, proti odporu a zámerne.',
        core: [
            'Slnko v Kozorožcovi berie dlhý pohľad od začiatku, často skôr, než je to pohodlné. Je tu vážnosť, ktorú netreba učiť, a organizujúcim presvedčením je, že čokoľvek, čo za niečo stojí, sa buduje, nedostáva. S odloženým výnosom pracuješ dobre a zodpovednosť nesieš bez veľkého viditeľného sťažovania.',
            'Ťažkosťou je, že toto Slnko sa meria výstupom a nemá prirodzený bod, kde sa zastaviť. Po úspechu nasleduje ďalší cieľ, nie spokojnosť, a odpočinok sa číta ako poľavenie, nie ako zotavenie. Je tu aj zdržanlivosť, ktorá môže pôsobiť ako chlad, hoci je to obvykle len neochota povedať niečo skôr, než je to premyslené a dá sa za tým stáť.',
        ],
    },
    'western-astrology:planet:sun-pisces:natal-placement': {
        headline: 'Ja s nezvyčajne mäkkými okrajmi - a s lepším zrakom vďaka nim.',
        core: [
            'Slnko v Rybách nezažíva seba ako jasne ohraničenú vec. Identita je tu priepustná - tvaruje ju miestnosť, hudba, spoločnosť, v ktorej tráviš popoludnie - a tá priepustnosť je zdrojom obrazotvornosti aj súcitu, ktoré v tomto postavení nie sú ozdobou, ale naozaj tým, ako svet prijímaš. Často vycítiš veci, ktoré ti nikto nepovedal.',
            'Ťažké je udržať tvar. Smerovanie potrebuje hranu, od ktorej sa dá odraziť, a toto Slnko si ju musí postaviť zámerne tam, kde ju iní dostávajú hotovú - preto Slnko v Rybách môže stráviť dlhý úsek ranej dospelosti tým, že je mimoriadne schopné v službe cudziemu plánu. Únik je tu spôsob zlyhania a málokedy je dramatický: ťažšia vec sa jednoducho stále odkladá v prospech niečoho mäkšieho.',
        ],
    },
    'western-astrology:planet:sun-scorpio:natal-placement': {
        headline: 'Život, do ktorého sa počítajú len tie časti, ktoré šli až nadoraz.',
        core: [
            'Slnko v Škorpiónovi nemá polohu pre mierne. K čomukoľvek sa zaviažeš, zaviažeš sa úplne, a od čohokoľvek sa zdržíš, zdržíš sa úplne, a medzi tým je veľmi málo. Vzniká z toho skutočná výdrž - pri ťažkej téme, človeku či projekte dokážeš zostať dlho po tom, čo by samotný záujem vyprchal - a ostrý, nevyžiadaný cit pre to, čo sa môže diať pod tým, čo ľudia hovoria.',
            'Súkromie tu nie je plachosť, je to stratégia, a niečo stojí. Slnko v Škorpiónovi obvykle vie o ľuďoch okolo seba veľmi veľa, kým jeho z nich pozná takmer nikto, a tá nerovnováha sa časom stane osamelou spôsobom, na ktorý sa ťažko sťažuje, keďže je to tvoje vlastné dielo. Druhou ťažkosťou je, že intenzita nemá tichý stupeň: veci, ktoré si plnú váhu nezaslúžia, ju aj tak dostanú.',
        ],
    },
    'western-astrology:planet:sun-virgo:natal-placement': {
        headline: 'Identita cez prácu, ktorá je naozaj užitočná.',
        core: [
            'Slnko v Panne má ťažisko v schopnostiach. Nie v postavení a nie v rozsahu – v užitočnosti, v tom konkrétnom uspokojení z veci urobenej poriadne niekým, kto si všimol, čo treba urobiť. Priťahuje ťa nezrovnalosť v systéme, a ty ju opravíš, často bez jedinej zmienky, a to nazbierané množstvo nespomenutých opráv je to, z čoho podľa Slnka v Panne potichu pozostáva jeho život.',
            'Problém je v tom, že rovnaký meter platí aj dovnútra, v plnej sile a bez akejkoľvek zhovievavosti. Oko, ktoré zachytí chybu v postupe, ju zachytáva na tebe nepretržite, a Slnko v Panne môže byť fakticky vynikajúce a pritom si v súkromí viesť skóre proti verzii seba, ktorá sa ani raz nedosiahla. Je tu aj zvyk preberať zodpovednosť za prácu iných, ktorý pôsobí ako služba a stojí viac, než sa zdá.',
        ],
    },
    'western-astrology:planet:uranus-aquarius:natal-placement': {
        headline: 'Urán vo vlastnom znamení: ročník definovaný kolektívnou myšlienkou.',
        core: [
            'Urán vládne Vodnárovi a jeho narúšajúca sila tu beží naplno na vlastnom území: siete, ideológie, spôsob, akým sa organizujú veľké množstvá ľudí. Spoločnou vlastnosťou je naozajstná pôvodnosť pohľadu a pohodlie z toho, že je človek pred zvyškom miestnosti.',
            'Generačná stopa. To, čo z nej robí opis teba a nie všetkých rovesníkov, sú dom a aspekty.',
        ],
    },
    'western-astrology:planet:uranus-capricorn:natal-placement': {
        headline: 'Ročník, ktorý reformoval inštitúcie, ktoré zdedil.',
        core: [
            'Urán v Kozorožcovi prikladá narušenie na štruktúru, hierarchiu a zavedenú autoritu. Spoločnou témou je, že inštitúcie neplnia svoj účel a bude ich treba prestavať, nie nahradiť - čo sa prikláňa skôr k reforme než k revolúcii.',
            'Kolektívne, nie individuálne. Konkrétnou časťou sú dom a aspekty.',
        ],
    },
    'western-astrology:planet:uranus-leo:natal-placement': {
        headline: 'Ročník, ktorý trval na tom, že sa vyjadrí.',
        core: [
            'Urán v Levovi kladie narúšajúcu funkciu na individuálne vyjadrenie. Spoločnou témou je odmietnutie byť typom - presvedčenie, že ja sa vynachádza, nededí - a vznikla z toho generácia so skutočnou tvorivou odvahou a s istou ťažkosťou podriadiť sa čomukoľvek.',
            'Skôr stopa obdobia než osobná črta. Individuálnou časťou sú dom a aspekty.',
        ],
    },
    'western-astrology:planet:uranus-libra:natal-placement': {
        headline: 'Ročník, ktorý prevyjednal partnerstvo.',
        core: [
            'Urán vo Váhach tlačí na podmienky vzťahov - kto si koho berie, na akom základe a či to usporiadanie musí vyzerať ako to predchádzajúce. Spoločnou témou je skutočné očakávanie rovnosti popri skutočnej nestabilite v tom, ako sa to zariaďuje.',
            'Toto opisuje obdobie, nie človeka. Osobnou časťou sú dom a aspekty.',
        ],
    },
    'western-astrology:planet:uranus-sagittarius:natal-placement': {
        headline: 'Ročník, ktorý sa rozišiel so zdedenou vierou.',
        core: [
            'Urán v Strelcovi rozkolísava učenia, inštitúcie a samozrejmé rámce, podľa ktorých si ľudia určujú, čo čo znamená. Spoločným sklonom je viera, ku ktorej si človek dôjde sám, a výrazný odpor voči tomu, aby mu niekto hovoril, čoho sa má držať.',
            'Tón obdobia. Osobným ho robí to, kam v tvojej mape padne.',
        ],
    },
    'western-astrology:planet:venus-aquarius:natal-placement': {
        headline: 'Blízkosť za nekonvenčných podmienok a priateľstvo na prvom mieste.',
        core: [
            'Venuša vo Vodnárovi chce skôr spoločníka než vlastníka. Priťahujú ťa ľudia, ktorí sú zaujímaví, nie vhodní, je ti pohodlne v usporiadaniach, ktoré nesedia na šablónu, a tomu, s kým si, dopraješ skutočnú, nesentimentálnu slobodu. Základom býva priateľstvo a často prežije aj romantiku.',
            'Opakujúcou sa ťažkosťou je odstup. Táto Venuša dokáže byť celkom prítomná rozumom a mierne neprítomná citom a na nárok na blízkosť odpovie tým, že sa stane rozumnejšou a menej dostupnou. Je tu aj vzdor voči konvencii, ktorý je niekedy zásadou a niekedy len reflexom, a zvnútra sa dajú ťažko rozlíšiť.',
        ],
    },
    'western-astrology:planet:venus-capricorn:natal-placement': {
        headline: 'Láska ako niečo postavené, vyskúšané a myslené vážne.',
        core: [
            'Venuša v Kozorožcovi je pomalá, vážna a podstatne teplejšia, než ako vyzerá. Náklonnosť sa ukazuje spoľahlivosťou - prísť, niesť ťarchu, byť niekým, komu slovo drží - a zdržanlivosť na začiatku je filter, nie chlad. To, čo postavíš, obvykle vydrží, lebo stavať začínaš, až keď máš dosť istoty.',
            'Tá zdržanlivosť môže prežiť svoju užitočnosť. Táto Venuša dokáže zostať v strehu dlho po tom, čo si ten druhý zaslúžil lepšie, a dokáže vzťah brať ako ďalšiu vec, ktorú treba zvládať dobre, nie si ju užívať. Býva tu tichý transakčný podtón, ktorý sa oplatí preskúmať: pocit, že náklonnosť si treba zaslúžiť - ty rovnako ako ten druhý.',
        ],
    },
    'western-astrology:planet:venus-scorpio:natal-placement': {
        headline: 'Láska bez plytkého nastavenia.',
        core: [
            'Venuša v Škorpiónovi chce všetko. Polovičná pozornosť je horšia než žiadna, nezáväznosť tu v podstate neexistuje, a to, čo hľadáš, je blízkosť, v ktorej obaja videli aj nelichotivý materiál a zostali. Keď sa toto postavenie zaviaže, je to úplné, a vernosť, ktorá s tým prichádza, nie je podmienená tým, že vzťah bude ľahký.',
            'Intenzita takéhoto rádu nerozlišuje dobre medzi hĺbkou a kontrolou. Žiarlivosť je zjavné zlyhanie, ale jemnejším je skúšanie - vytváranie malých situácií, ktoré majú ukázať, či ten druhý vydrží - a má sklon vyvolať práve to opustenie, ktoré overovalo. Zrada sa tu takmer nedá napraviť a táto Venuša dokáže niesť zatvorené dvere veľmi dlho.',
        ],
    },
    'western-astrology:planet:venus-taurus:natal-placement': {
        headline: 'Láska ako niečo, čoho sa dá dotknúť, čo sa dá udržať a na čo je spoľahnutie.',
        core: [
            'Venuša vládne Býkovi a chce tu trvácnosť a hmatateľnú skutočnosť. Náklonnosť sa vyjadruje prítomnosťou, jedlom, pohodlím a stálym opakovaním malých úkonov, nie vyhláseniami, a čo si ceníš, to si nechávaš. Je v tomto postavení skutočná zmyslová inteligencia a hlboká schopnosť vernosti, ktorú netreba pripomínať.',
            'To držanie pokračuje aj za hranicu užitočnosti. Táto Venuša zostane v usporiadaní, ktoré potichu prestalo živiť kohokoľvek, lebo odísť by znamenalo rozobrať niečo postavené - a bude to nazývať oddanosťou. Druhou hranou je vlastnícky sklon: to, čo miluješ, zažívaš ako svoje, a rozdiel medzi oddanosťou a vlastníctvom je tu niečo, čo musíš robiť zámerne.',
        ],
    },
    'western-astrology:planet:venus-virgo:natal-placement': {
        headline: 'Náklonnosť ukázaná tým, čo si všímaš a potichu vybavíš.',
        core: [
            'Venuša v Panne lásku neohlasuje, robí ju v detailoch. Zapamätaná vec, problém vyriešený skôr, než sa spomenul, malý praktický úkon, o ktorý nikto nežiadal - to je celá slovná zásoba, a je hlbšia, než sa jej obvykle uznáva. Ceníš si zručnosť a čestnosť, nie predvádzanie, a je ťažké ťa zaujať a ľahké si ťa udržať, keď sa to podarí.',
            'Kritické oko sa v blízkosti nevypne a tam narobí škodu. Zlepšenia ponúknuté ako pomoc môžu vyznieť ako rozsudok a do blízkosti sa môže potichu usadiť pocit, že niečo celkom nestačí, bez toho, aby to niekto pomenoval. Táto Venuša drží aj samu seba na méte zaslúženosti, takže prijať lásku len tak - bez toho, aby bola v ten týždeň zaslúžená - je zvláštne nepohodlný zážitok.',
        ],
    },
    'western-astrology:sign:capricorn:base-archetype': {
        headline: 'Kardinálna zem: stavia niečo, čo vydrží.',
        core: [
            'Kozorožec pracuje štruktúrou a dlhými časovými horizontmi. Čokoľvek v ňom stojí, zvážnie zavčasu, znesie odložený výnos a točí sa okolo schopností a postavenia. Nesie k tomu aj primeranú ťarchu: ťažkosť zastaviť sa a sklon čítať odpočinok ako zlyhanie.',
        ],
    },
    'western-astrology:sign:sagittarius:base-archetype': {
        headline: 'Premenlivý oheň: potrebuje mať v dohľade horizont.',
        core: [
            'Strelec pracuje rozširovaním. Čokoľvek v ňom stojí, siaha po zmysle, diaľke a väčšom rámci, je otvorené až do netaktnosti a potrebuje veriť, že na tom, čo robí, záleží. Detail aj uzavretosť sa mu čítajú ako malé smrti.',
        ],
    },
    'western-astrology:sign:taurus:base-archetype': {
        headline: 'Fixná zem: nechá si čas a nepustí.',
        core: [
            'Býk pracuje pomaly a konkrétne. Čokoľvek v ňom stojí, chce hmatateľné, spoľahlivé a neuponáhľané, a keď sa raz na niečom usadí, drží to dávno po hranici užitočnosti. Trpezlivosť je tu skutočná a rovnako aj neoblomnosť.',
        ],
    },
    'western-astrology:aspect:jupiter-conjunction-mercury:natal-placement': {
        headline: 'Myseľ s nezvyčajne veľkým rámcom.',
        core: [
            'Merkúr s Jupiterom myslí vo veľkom. Myseľ siaha po princípe, po prirovnaní a po širšom dosahu, a je tu skutočná schopnosť urobiť veľkú myšlienku uchopiteľnou a zaujímavou pre ľudí, ktorých predtým nezaujímala.',
            'Detail je miesto, kde to redne. Tvrdenie má správny tvar a často voľné podrobnosti, a táto dvojica preženie kvôli účinku a potom to preháňanie obhajuje. Čítanie aj rozprávanie majú sklon bežať ďalej, než je užitočné.',
        ],
    },
    'western-astrology:aspect:mars-conjunction-sun:natal-placement': {
        headline: 'Zmysel a čin ako jeden pohyb.',
        core: [
            'Slnko s Marsom kladú identitu a silu na to isté miesto: si to, čo robíš, a to robenie je okamžité. Odvaha je tu skutočná a priama a energia dostupná pre čokoľvek, o čom máš naozaj rozhodnuté, je značná.',
            'Medzi chcením a konaním nie je odstup, takže cestou sa veľmi málo prehodnocuje. Konflikt vzniká ľahko, sčasti preto, že mu ideš rovno naproti, a sčasti preto, že priamosť v tejto intenzite môže vyznieť ako útok, nech bola mienená akokoľvek.',
        ],
    },
    'western-astrology:aspect:mars-square-venus:natal-placement': {
        headline: 'Chcenie a naháňanie sa míňajú.',
        core: [
            'Tu si príťažlivosť a naháňanie prekážajú. To, k čomu ťa ťahá, obvykle nie je to, za čím ideš, alebo to naháňanie podkopáva samotné chcenie - snaha je útočná tam, kde má byť mäkká, alebo váhavá tam, kde má byť priama. Vzťahy nesú skutočné trenie aj skutočný náboj, obvykle oboje.',
            'Vzniká z toho citová a sexuálna úprimnosť, dosť tvrdo vydobytá, keďže ľahká cesta tu nikdy nebola. Spôsobom zlyhania je opakovaný vzorec konfliktu vo vzťahoch, ktorý sa zamieňa za chémiu.',
        ],
    },
    'western-astrology:aspect:moon-conjunction-sun:natal-placement': {
        headline: 'To, čo chceš, a to, čo potrebuješ, je jedno a to isté.',
        core: [
            'Slnko a Mesiac spolu spájajú zmysel a inštinkt: to, k čomu vedome mieriš, a to, čo v súkromí potrebuješ, sa spolu nedohadujú, lebo sú jedným popudom. Vzniká z toho silná jednotnosť smeru a málo vnútorného sporu, ktorý vie človeka spomaliť.',
            'Cenou je chýbajúca oprava. Keď identita a citová potreba ťahajú rovnakým smerom, nie je v tebe nič, čo by povedalo, že smer je zlý, takže omyl môže bežať veľmi dlho, kým ho niečo preverí. Odstup od seba tu musí prísť zvonku; zvnútra nepríde.',
        ],
    },
    'western-astrology:element:water:base-archetype': {
        headline: 'Prežitá informácia: vie skôr, než to dokáže povedať.',
        core: [
            'Voda dodáva citovú inteligenciu a hĺbku pripútania. Spracúva citom, nie argumentom, a zaznamenáva, čo sa deje pod tým, čo sa hovorí. Mapa s veľkou váhou vody je priepustná; mapa, kde voda chýba, číta emóciu ako cudzí jazyk, ktorý dokáže preložiť, ale nie ním hovoriť.',
        ],
    },
    'western-astrology:house:jupiter-house-6:natal-placement': {
        headline: 'Rast prichádza cez samotnú prácu.',
        core: [
            'Táto rozpínavá kvalita je uplatnená. Jupiter v šiestom dome znamená, že príležitosť prichádza cez zručnosť a službu, nie cez viditeľnosť, a nebezpečenstvom je vziať na seba viac zodpovednosti, než jeden človek unesie.',
        ],
    },
    'western-astrology:house:jupiter-house-7:natal-placement': {
        headline: 'Rast prichádza cez iných ľudí.',
        core: [
            'Táto rozpínavá kvalita je vzťahová. Jupiter v siedmom dome znamená, že partnerstvo je mechanizmom, ktorým sa tvoj život zväčšuje, a v tom, po čieho boku skončíš, máš obvykle šťastie.',
        ],
    },
    'western-astrology:house:jupiter-house-8:natal-placement': {
        headline: 'Rast prichádza cez hĺbku a cez to, čo je spoločné.',
        core: [
            'Táto rozpínavá kvalita ide pod povrch. Jupiter v ôsmom dome znamená, že ťa obohacuje - niekedy hmotne, vždy inak - ťažký materiál, ktorému sa zvykne vyhýbať, a zdroje držané spoločne.',
        ],
    },
    'western-astrology:house:mars-house-11:natal-placement': {
        headline: 'Úsilie sa míňa na skupinu a na dlhší cieľ.',
        core: [
            'Táto energia patrí skupine. Mars v jedenástom dome znamená, že energia ide do spoločných projektov, vecí a sietí, a za skupinu sa biješ ochotnejšie než za seba. Opakujúcou sa cenou je trenie s priateľmi a spojencami.',
        ],
    },
    'western-astrology:house:mars-house-9:natal-placement': {
        headline: 'Energia ide za tým, čomu veríš.',
        core: [
            'Táto energia beží na presvedčení. Mars v deviatom dome znamená, že sila je dostupná v pomere k zmyslu, takže vec, cesta alebo téma, ktorej veríš, odomkne úsilie, aké bežné úlohy nikdy nevyvolajú. Spor o zásady je miesto, kde sa bojuje.',
        ],
    },
    'western-astrology:house:mercury-house-2:natal-placement': {
        headline: 'Myseľ je namierená na to, akú majú veci hodnotu.',
        core: [
            'Toto myslenie beží cez praktické. Merkúr v druhom dome mieri myseľ na hodnotu, zdroje a otázku, na čo je niečo v skutočnosti dobré, a k istote sa dopracúvaš skôr uvažovaním než citom.',
        ],
    },
    'western-astrology:house:mercury-house-8:natal-placement': {
        headline: 'Myseľ ide po tom, čo sa nehovorí.',
        core: [
            'Toto myslenie vyšetruje. Merkúr v ôsmom dome mieri myseľ na skryté, spoločné a nepohodlné, z čoho vzniká skutočná výskumná schopnosť a zvyk držať vlastné závery v súkromí.',
        ],
    },
    'western-astrology:house:moon-house-12:natal-placement': {
        headline: 'Cit beží pod úrovňou, kde sa dá ohlásiť.',
        core: [
            'Tento citový život je z veľkej časti skrytý, aj pred tebou. Mesiac v dvanástom dome znamená, že veľmi veľa sa spracúva mimo vedomého dohľadu, takže často zistíš, že niečo už je vybavené, no nevieš povedať kedy. Samota je naozaj obnovujúca a nenápadne prechádza do izolácie.',
        ],
    },
    'western-astrology:house:moon-house-3:natal-placement': {
        headline: 'Cit sa spracúva tým, že sa vyrozpráva do tvaru.',
        core: [
            'Tento citový život potrebuje slová. Mesiac v treťom dome znamená, že reakcia nie je naozaj usadená, kým sa niekomu neopíše, a zostať s niečím nevysloveným je podoba tiesne, ktorú toto postavenie pozná najlepšie. Najbližšie okolie a každodenná výmena nesú skutočnú citovú váhu.',
        ],
    },
    'western-astrology:house:moon-house-5:natal-placement': {
        headline: 'Cit vychádza von ako niečo vytvorené.',
        core: [
            'Tento citový život je výrazový. Mesiac v piatom dome znamená, že vnútorné počasie si nájde cestu do všetkého, čo tvoríš, a tvorenie je spôsob, akým sa cit spracúva, nie činnosť robená až potom. Deti, romantika aj hra tu nesú ťažší citový náboj než zvyčajne.',
        ],
    },
    'western-astrology:house:moon-house-7:natal-placement': {
        headline: 'Cit prichádza cez toho, kto stojí oproti tebe.',
        core: [
            'Tento citový život je vzťahový. Mesiac v siedmom dome znamená, že tvoje vnútorné rozpoloženie citlivo reaguje na človeka, ktorý ti je najbližší, a citovo poznávaš seba prevažne cez odraz. Zodpovedajúcim rizikom je nálada, ktorá nikdy nie je celkom tvoja.',
        ],
    },
    'western-astrology:house:moon-house-9:natal-placement': {
        headline: 'Cit potrebuje priestor a dôvod.',
        core: [
            'Tento citový život potrebuje záber. Mesiac v deviatom dome znamená, že sa upokojuješ rozširovaním - cestovaním, štúdiom, väčším pohľadom - a situácia bez horizontu v tebe vyvolá skôr nepokoj než smútok. To, čomu veríš, nesie skutočnú citovú váhu, nielen rozumovú.',
        ],
    },
    'western-astrology:house:neptune-house-12:natal-placement': {
        headline: 'Generačné postavenie, ktoré zosobňuje to, čo beží mimo dohľadu.',
        core: [
            'Neptún v dvanástom dome je na vlastnej pôde: prehlbuje všetko neohraničené a robí zo samoty niečo naozaj obnovujúce a zároveň niečo, v čom sa dá ľahko zmiznúť. Čiara medzi ústraním a stiahnutím sa nie je zvnútra zjavná.',
        ],
    },
    'western-astrology:house:neptune-house-2:natal-placement': {
        headline: 'Generačné postavenie, ktoré zosobňuje to, čo si ceníš a čo držíš.',
        core: [
            'Neptún v druhom dome rozmazáva hranicu okolo zdrojov, čo sťažuje jasné posúdenie hodnoty a robí peniaze zvláštne klzkými. To, čo si zaslúžiš, a to, čo dostaneš zaplatené, sa málokedy zrozumiteľne stretne.',
        ],
    },
    'western-astrology:house:neptune-house-3:natal-placement': {
        headline: 'Generačné postavenie, ktoré zosobňuje tvoje najbližšie okolie.',
        core: [
            'Neptún v treťom dome ho kladie do blízkeho sveta, čo dáva mysleniu impresionistický ráz a spôsobuje, že detail sa stráca. Budeš mať pravdu v tvare a hmlu v podrobnostiach.',
        ],
    },
    'western-astrology:house:neptune-house-4:natal-placement': {
        headline: 'Generačné postavenie, ktoré zosobňuje tvoja súkromná základňa.',
        core: [
            'Neptún vo štvrtom dome ho kladie ku koreňu, kde pocit domova a pôvodu zvykne byť idealizovaný alebo nejasný. Domov nesie skôr atmosféru než súbor faktov.',
        ],
    },
    'western-astrology:house:neptune-house-7:natal-placement': {
        headline: 'Generačné postavenie, ktoré zosobňuje ten, kto sedí oproti tebe.',
        core: [
            'Neptún v siedmom dome ho kladie do partnerstva, čo prináša súcit, idealizáciu a ťažkosť vidieť toho druhého presne. Sklamanie tu býva skôr opravou tvojho vlastného obrazu než zradou.',
        ],
    },
    'western-astrology:house:pluto-house-1:natal-placement': {
        headline: 'Premieňajúci tlak mieri na samotnú identitu.',
        core: [
            'Kde sa to stáva viditeľným, je spôsob, akým ťa ľudia berú. Pluto v prvom dome dáva intenzívnu prítomnosť, ktorú možno vycítiť skôr, než prehovoríš, a sklon viac ako raz sa pretvoriť.',
        ],
    },
    'western-astrology:house:pluto-house-10:natal-placement': {
        headline: 'Premieňajúci tlak mieri na verejný záznam.',
        core: [
            'Toto beží cez postavenie. Pluto v desiatom dome vnáša do verejného postavenia skutočnú mocenskú dynamiku a verejný tvar života sa môže prestavať od základov.',
        ],
    },
    'western-astrology:house:pluto-house-12:natal-placement': {
        headline: 'Premieňajúci tlak beží mimo dohľadu.',
        core: [
            'Toto beží pod vedomím. Pluto v dvanástom dome znamená, že najhlbší materiál je zároveň najmenej viditeľný, vyplavuje sa nepriamo a obvykle neskoro. To, čo sa premieňa, sa často dá pomenovať až spätne.',
        ],
    },
    'western-astrology:house:pluto-house-2:natal-placement': {
        headline: 'Premieňajúci tlak mieri na hodnotu.',
        core: [
            'Toto beží cez zdroje. Pluto v druhom dome robí z peňazí a sebahodnoty arénu intenzity - nazbierané, stratené a znovu postavené - a to, čo považuješ za cenné, sa aspoň raz úplne zmení.',
        ],
    },
    'western-astrology:house:pluto-house-5:natal-placement': {
        headline: 'Premieňajúci tlak mieri na to, čo tvoríš.',
        core: [
            'Toto beží cez vyjadrenie. Pluto v piatom dome dáva tvorivej práci skutočnú hĺbku a nutkanie za ňou, ktoré nie je celkom dobrovoľné, a romantike zodpovedajúcu intenzitu, ktorá málokedy zostane dlho nezáväzná.',
        ],
    },
    'western-astrology:house:saturn-house-2:natal-placement': {
        headline: 'Tlak je na istote.',
        core: [
            'Táto obmedzujúca funkcia je materiálna. Saturn v druhom dome robí zo zdrojov niečo, na čom treba pracovať a o čo sa treba obávať, a vytvára trvalú opatrnosť s peniazmi, ktorá prežije aj to, keď ich je dosť.',
        ],
    },
    'western-astrology:house:saturn-house-3:natal-placement': {
        headline: 'Tlak je na reči a učení.',
        core: [
            'Táto obmedzujúca funkcia beží nablízko. Saturn v treťom dome znamená, že dorozumievanie je zavčasu namáhavé - váhavosť, oprava, pocit, že ťa niekto predbieha - a to, čo z toho napokon vznikne, je človek, ktorý hovorí menej a stojí za vypočutie.',
        ],
    },
    'western-astrology:house:saturn-house-6:natal-placement': {
        headline: 'Tlak je v každodennej drine.',
        core: [
            'Táto obmedzujúca funkcia je rutinná. Saturn v šiestom dome znamená, že arénou disciplíny sú každodenná práca a rutina, a schopnosť vytrvalého neatraktívneho úsilia je tu značná. Trvalým rizikom je prepracovanie.',
        ],
    },
    'western-astrology:house:sun-house-2:natal-placement': {
        headline: 'Ukazuje sa to v tom, čo staviaš a akú máš hodnotu.',
        core: [
            'Tento zmysel sa vyjadruje cez zdroje. Slnko v druhom dome viaže identitu na to, čo dokážeš vyrobiť, udržať a na čo sa dokážeš spoľahnúť, takže zručnosť v hmotnom svete nie je vedľajšia k tomu, kto si - je to pôda, na ktorej stojíš. Sebahodnotu a majetok je tu ťažšie udržať oddelene, než je celkom pohodlné.',
        ],
    },
    'western-astrology:house:sun-house-9:natal-placement': {
        headline: 'Ukazuje sa to všade, kde sa rámec rozšíri.',
        core: [
            'Tento zmysel potrebuje odstup. Slnko v deviatom dome umiestňuje identitu do cestovania, štúdia, viery alebo čohokoľvek iného, čo odtiahne pohľad od bezprostredného, a život obmedzený na miestne vyvoláva zvláštny nepokoj, ktorý žiadne pohodlie neutíši. V nejakej podobe si vždy študent.',
        ],
    },
};
