/*
 * THE FORECAST, IN SLOVAK.
 *
 * The same interpretation model as forecastContent.ts - one core meaning per
 * number, read at three distances - written again in Slovak rather than
 * translated. The English file stays the canonical statement of WHAT each
 * number means; this file says it the way a Slovak editor would, to one reader,
 * as `ty`.
 *
 * Keyed by the same CycleNumber and carrying the same fields, so the screen
 * selects a table by locale and touches nothing else. Nothing here changes
 * which number a day, month or year gets - that is arithmetic in
 * personalCycles.ts and this file cannot reach it.
 *
 * Writing rules, the same as the English and enforced in review:
 *  - name the number and the scale, so every claim is traceable
 *  - concrete verbs, nameable actions, offered rather than prescribed
 *  - a caution says what tends to go WRONG under the theme, never a warning of harm
 *  - a symbolic emphasis, never an event, and no assumed job, partner, family
 *    or household: a domain is „pokiaľ ide o prácu", never a job the reader holds
 *  - no superlatives about the cycle and no countdowns
 *  - nothing medical, nothing financial-advisory, nothing that predicts an event
 *  - tykanie, short sentences, no English sentence underneath
 */
export const CYCLE_KEYWORD_SK = {
    1: 'Začiatok a iniciatíva',
    2: 'Spolupráca a trpezlivosť',
    3: 'Vyjadrenie a kontakt',
    4: 'Štruktúra a metóda',
    5: 'Zmena a pohyb',
    6: 'Starostlivosť a zodpovednosť',
    7: 'Štúdium a premýšľanie',
    8: 'Výsledky a autorita',
    9: 'Dokončenie a uvoľnenie',
};
export const YEAR_CONTENT_SK = {
    1: {
        theme: 'Rok s jednotkou otvára deväťročný cyklus. Toto obdobie zdôrazňuje výber smeru: to, čo sa teraz začne, zvykne určiť kurz, ktorým sa ďalšie roky uberajú, a preto rok praje rozhodnutiu viac než unášaniu sa.',
        opportunities: 'Rozbehnúť niečo vlastné, zmeniť smer, podpísať sa pod prácu, ktorá zostávala v úzadí, a urobiť rozhodnutia, ktoré sa doteraz nechávali na iných.',
        cautions: 'Rozhodovať na vlastnú päsť je silou aj pascou. Pohnúť sa skôr, než zaznie druhá strana, môže priniesť prácu, ktorú treba prerábať v spolupracujúcom roku s dvojkou, ktorý nasleduje.',
        work: 'Pokiaľ ide o prácu alebo štúdium, dôraz jednotky praje prevzatiu vedenia a rozbehnutiu toho, čo chceš mať vo vlastných rukách. Čakanie na úplnú zhodu sa k tomuto roku hodí menej.',
        money: 'Peniaze skôr idú do rozbehu, než by sa z neho vracali. Výdavky na základy sú pre rok s jednotkou typické; výnosy nie sú to, čo tento rok zdôrazňuje.',
        relationships: 'Nové kontakty zvyknú vznikať ľahko. Tým existujúcim prospieva vedomá pozornosť, lebo rok ťahá k vlastným plánom.',
        family: 'Medzi najbližšími zvykne fungovať lepšie hovoriť o tom, čo meníš, než to predložiť hotové; zmena oznámená ako hotové rozhodnutie môže dopadnúť zle.',
        development: 'Samostatnosť, rozhodnosť a schopnosť stáť za vlastnou voľbou. Všímaj si, kde sa rozhodnutia zo zvyku prenechávajú iným.',
        goodToStart: 'Čokoľvek, čo má vydržať niekoľko rokov: disciplínu, štúdium, dlhší vlastný projekt.',
        betterToFinish: 'Záväzky z predchádzajúceho cyklu, ktoré sa nesú už len z povinnosti. Čím dlhšie sa nesú, tým zvyknú byť ťažšie.',
        doNotForce: 'Súhlas. Partnerstvo a zhoda sú témou roka s dvojkou; tlačiť na ne teraz zvykne priniesť poslušnosť namiesto podpory.',
    },
    2: {
        theme: 'Rok s dvojkou pracuje na tom, čo začal rok s jednotkou, a to tempom druhých ľudí. Toto obdobie zdôrazňuje dohody, trpezlivosť a spoluprácu viac než samostatnú iniciatívu.',
        opportunities: 'Partnerstvo, rokovania, spolupráca a tiché upevnenie toho, čo sa začalo v predchádzajúcom roku.',
        cautions: 'Rok praje ústretovosti, a tak sa z nej ľahko stane prílišná ústretovosť. Typickou chybou roka s dvojkou je zdržiavať rozhodnutie preto, že by mohlo niekoho vyrušiť.',
        work: 'Pokiaľ ide o prácu, k dôrazu dvojky sa hodí spolupráca, podporné roly a práca z druhej pozície, vďaka ktorej niečo uspeje. Sólové ťahy sa k nemu hodia menej.',
        money: 'Peňažné veci sa zvyknú hýbať cez spoločné dojednania a dohody skôr než cez jeden rázny krok, a zvyčajne pomaly.',
        relationships: 'Vzťahy sú v strede dôrazu dvojky: prehĺbiť partnerstvo, opraviť ho alebo pomenovať, čím nejaké spolužitie naozaj je.',
        family: 'Diplomacia sa k roku s dvojkou hodí: je to dobré prostredie na riešenie dlhého sporu cez kompromis.',
        development: 'Trpezlivosť, počúvanie a rozlíšenie medzi udržiavaním pokoja a vyhýbaním sa rozhovoru.',
        goodToStart: 'Spoločné dojednania, rokovania a čokoľvek, čo bez súhlasu druhého človeka nefunguje.',
        betterToFinish: 'Nejasnosti. Dohody, ktoré nikdy neboli vyslovené, sa dajú spísať alebo ukončiť.',
        doNotForce: 'Rýchlosť. Tlak na termín v roku s dvojkou zvykne stáť práve tú dohodu, ktorú mal urýchliť.',
    },
    3: {
        theme: 'Rok s trojkou je výrazový a spoločenský. Toto obdobie zdôrazňuje viditeľnosť a kontakt a uľahčuje rozptýlenie sa na viac vecí, než sa dá dokončiť.',
        opportunities: 'Písať, prezentovať, učiť, publikovať, tvoriť a spoznávať nových ľudí.',
        cautions: 'Rozptýlenie. Rok s trojkou zvykne ponúknuť viac príležitostí, než jeden človek unesie, a kto vezme všetky, skončí rok s málom dokončeného.',
        work: 'Pokiaľ ide o prácu, k dôrazu trojky sa hodí všetko, čo sa komunikuje: prezentovanie, písanie, výučba, práca tvárou k ľuďom. Dlhá osamelá práca s detailmi sa k nemu hodí menej.',
        money: 'Peniaze môžu prichádzať a odchádzať v niekoľkých malých prúdoch namiesto jedného; k roku s trojkou sa hodí nechať si rezervu na medzery medzi nimi.',
        relationships: 'Spoločenské a ľahké. Dôraz trojky praje zoznamovaniu a šírke kontaktov viac než pomalej práci s prehlbovaním jedného vzťahu.',
        family: 'Ľahší tón než v dvoch predchádzajúcich rokoch. K dôrazu trojky sa hodia stretnutia, oslavy a obnovenie kontaktu, ktorý stíchol.',
        development: 'Povedať vec priamo namiesto naznačovania — a naučiť sa odmietnuť príležitosti, ktoré sú iba zaujímavé.',
        goodToStart: 'Čokoľvek, čo potrebuje publikum: súbor textov, kurz, ktorý môžeš viesť, verejnú podobu súkromnej práce.',
        betterToFinish: 'Rozrobené. K roku s trojkou sa hodí uzavrieť dve nedokončené tvorivé veci skôr, než pribudnú ďalšie.',
        doNotForce: 'Hĺbku. Sústredená, samotárska a podrobná práca je témou rokov so štvorkou a sedmičkou; vynucovať ju teraz zvykne priniesť opustené začiatky.',
    },
    4: {
        theme: 'Rok so štvorkou stavia. Je nenápadný a nosný: toto obdobie zdôrazňuje systémy, opravy a základy, na ktorých môžu stáť ďalšie roky.',
        opportunities: 'Urobiť si poriadok, opraviť, čo dlho krívalo, dať dohodám pevnú formu a odrobiť nezáživnú prácu, ktorá uľahčí ďalšie roky.',
        cautions: 'Strnulosť a drina aj za bodom, kde práca prestala byť užitočná. Námaha nie je to isté ako pokrok.',
        work: 'Pokiaľ ide o prácu, k dôrazu štvorky sa hodia postupy, dokumentácia, kvalifikácie a dokončovanie. Nový začiatok od nuly sa k nemu hodí menej.',
        money: 'K roku so štvorkou sa hodí rozpočet, preskladanie a poriadok v záznamoch. Pokrok tu zvykne prichádzať skôr z poriadku a nižších nákladov než z rastu.',
        relationships: 'Skôr stále než vzrušujúce. Spoľahlivosť zvykne vážiť viac než gestá.',
        family: 'Pokiaľ ide o domov, dôraz štvorky padá na praktické veci: opravy, papiere, hranice. Keď sa im človek venuje, zvykne sa uľaviť viac než o tú jednu úlohu.',
        development: 'Disciplína a jej hranica: naučiť sa rozoznať, kde vytrvalosť prestáva byť cnosťou.',
        goodToStart: 'Systémy, rutiny, tréning a všetko, čo má hodnotu len vtedy, keď sa to udržiava.',
        betterToFinish: 'Odkladané opravy a papierovanie, najmä tie, ktoré už začali niečo stáť.',
        doNotForce: 'Prelom. Rok so štvorkou je stavaný na sústavný postup, nie na skoky; vynútený skok zvykne napnúť stavbu, ktorá sa práve kladie.',
    },
    5: {
        theme: 'Rok s päťkou veci uvoľňuje. Toto obdobie zdôrazňuje zmenu: cestovanie, zmena prostredia, nové dojednania a nečakané príležitosti sú preň typické — a rovnako záväzok urobený z okamžitého popudu.',
        opportunities: 'Cesty, zmena prostredia, nové kontakty, nové podmienky dohôd a pokusy, ktoré by v roku so štvorkou priveľmi rušili.',
        cautions: 'Unáhlené záväzky. Rok robí zmenu ľahkou, a práve vtedy sa dohody zvyknú uzatvárať bez poriadneho prečítania.',
        work: 'Pokiaľ ide o prácu, k dôrazu päťky sa hodí zmena, rozmanitosť a krátke pokusy. Čokoľvek, čo potrebuje neprerušovanú rutinu, sa k nemu hodí menej.',
        money: 'Premenlivo. Príjmy aj výdavky sa môžu hýbať viac než zvyčajne; k roku s päťkou sa hodí rezerva na jednorazové náklady.',
        relationships: 'Nepokojné. Dôraz päťky praje novým kontaktom a novým podmienkam vo vzťahu, ktorý zatuchol, a zle znáša predstieranie, že je všetko v poriadku.',
        family: 'Pomáha pružnosť. Pevné domáce zvyklosti môže byť treba uvoľniť; počítať s pohybom zvykne fungovať lepšie než sa mu brániť.',
        development: 'Sloboda — a rozdiel medzi tým, keď niečo meníš, a tým, keď z niečoho utekáš.',
        goodToStart: 'Pokusy s jasným koncom: veci, ktoré sa dajú lacno zastaviť, ak nezaberú.',
        betterToFinish: 'Dojednania, ktoré už nesedia, no zo zvyku sa stále obnovujú.',
        doNotForce: 'Trvalosť. Uzavrieť v roku s päťkou dlhé záväzky zvykne znamenať, že sa neskôr dojednávajú znova.',
    },
    6: {
        theme: 'Rok so šestkou sa obracia k starostlivosti a zodpovednosti. Toto obdobie zdôrazňuje povinnosti — a uspokojenie z toho, že je o veci poriadne postarané.',
        opportunities: 'Starať sa o to, na čom záleží, opravovať vzťahy, služba iným a práca s jasnou povinnosťou starostlivosti.',
        cautions: 'Prílišná zodpovednosť. Rok robí z preberania cudzej záťaže prirodzenú vec, a tá záťaž sa sama od seba len zriedka odloží.',
        work: 'Pokiaľ ide o prácu, k dôrazu šestky sa hodí starostlivosť, výučba, služba a kvalita. Práca, ktorá vyžaduje odstup, sa k nemu hodí menej.',
        money: 'Výdavky sa zvyknú prikláňať k starostlivosti a údržbe. Počítať s nimi funguje lepšie, než sa nechať prekvapiť.',
        relationships: 'Záväzok je témou šestky: prostredie na to, aby dohoda dostala jasnú podobu, jedným aj druhým smerom.',
        family: 'Ak sú rodina a domov súčasťou života, v roku so šestkou sa zvyknú dostať do stredu: starostlivosť o druhých, dlho odkladané rozhovory, poriadok v domácnosti.',
        development: 'Zodpovednosť s hranicami: naučiť sa povedať, čo sa dá uniesť a čo nie.',
        goodToStart: 'Záväzky voči ľuďom, projekty okolo domova a prácu, za ktorú chceš niesť zodpovednosť.',
        betterToFinish: 'Napoly rozrobené veci a povinnosti prevzaté kedysi len dočasne.',
        doNotForce: 'Odstup. Držať sa od nárokov blízkych ľudí bokom zvykne v roku so šestkou stáť viac, než keby sa im človek venoval.',
    },
    7: {
        theme: 'Rok so sedmičkou sa obracia dovnútra. Toto obdobie zdôrazňuje štúdium, rozbor a prehodnotenie namiesto výkonu a zvonku môže pôsobiť pomaly.',
        opportunities: 'Výskum, vzdelávanie, špecializácia a preverenie, či smer nastavený v roku s jednotkou stále sedí.',
        cautions: 'Stiahnuť sa od ľudí vo chvíli, keď treba odpoveď. Samota je metódou tohto roka; zmiznúť je jeho zlyhaním.',
        work: 'Pokiaľ ide o prácu, k dôrazu sedmičky sa hodí odbornosť, rozbor, audit a tichá kompetencia. Viditeľnosť a objem sa k nemu hodia menej.',
        money: 'Rok na to, aby sa financiám poriadne porozumelo, skôr než aby sa rozširovali.',
        relationships: 'Menej, ale hlbšie. Chuť na spoločnosť môže klesnúť; povedať to nahlas funguje lepšie než tiché miznutie z dohľadu.',
        family: 'Blízke vzťahy a domov môžu potrebovať vedomé úsilie, lebo sedmička ťahá dovnútra, k vlastnému premýšľaniu.',
        development: 'Skutočné štúdium a všimnutie si toho, čomu naozaj veríš.',
        goodToStart: 'Štúdium, výskum, špecializáciu a každé prehodnotenie, ktorému sa dlho vyhýbaš, lebo by sa ti odpoveď nemusela páčiť.',
        betterToFinish: 'Napoly pochopené veci: opustený kurz, otvorenú otázku, nedokončený rozbor.',
        doNotForce: 'Výkon a viditeľnosť. Tlačiť na ne v roku so sedmičkou zvykne priniesť plytkú prácu, ktorú treba neskôr obhajovať.',
    },
    8: {
        theme: 'Rok s osmičkou je o výsledkoch, autorite a zdrojoch. Toto obdobie zdôrazňuje hmatateľné dôsledky a zodpovednosť — spolu s rizikom precenenia vlastných síl.',
        opportunities: 'Vyjednávať, preberať autoritu, dávať zdroje do práce a hľadať spravodlivé uznanie za prácu, ktorá zostávala bez neho.',
        cautions: 'Precenenie síl a zámena tlaku za pokrok. Dôraz osmičky praje úsudku o správnej veľkosti viac než chuti na väčšiu.',
        work: 'Pokiaľ ide o prácu, dôraz osmičky praje prevzatiu zodpovednosti za výsledky, nie za úlohy, a jasnému pomenovaniu, akú hodnotu má tvoja práca.',
        money: 'Do popredia sa dostávajú peniaze a zdroje: vyjednávanie, tvorba cien a vedomý základ financií. Opisuje to dôraz, nie sľub zisku.',
        relationships: 'Práca a ambícia si môžu vziať veľa priestoru; povedať, čo robíš a dokedy, pomáha, aby to nerozhodlo za teba.',
        family: 'Témou môže byť zabezpečenie, a to nenahradí prítomnosť; v roku s osmičkou sa táto výmena môže urobiť nevedomky.',
        development: 'Autorita: uplatňovať ju a prijať zodpovednosť, keď sa niečo pokazí.',
        goodToStart: 'Čokoľvek, kde ide o merateľný výsledok: rokovanie, podnik, vážne finančné dojednanie.',
        betterToFinish: 'Podhodnotené dohody a prácu odvádzanú na úrovni, ktorá sa neuznáva.',
        doNotForce: 'Rast, ktorý sa nedá udržať. V roku s osmičkou sa expanzia ľahko začína a draho vracia späť.',
    },
    9: {
        theme: 'Rok s deviatkou uzatvára cyklus. Toto obdobie zdôrazňuje dokončenie, uvoľnenie a nadhľad: dokončiť, čo splnilo svoju úlohu, a spojiť si, čo celý cyklus naučil.',
        opportunities: 'Dokončiť, odovzdať, vypratať, odpustiť a urobiť miesto pre to, čo príde.',
        cautions: 'Začať niečo, čo potrebuje dlhý rozbeh. Dôraz deviatky praje dokončovaniu, takže dlhé začiatky zvyknú súperiť s upratovaním, ktoré si žiada.',
        work: 'Pokiaľ ide o prácu, k dôrazu deviatky sa hodí dokončenie, odovzdanie alebo dobrý odchod. Založenie niečoho na desať rokov sa k nemu hodí menej.',
        money: 'Skôr vyrovnávať než hromadiť: vyrovnať, čo sa dlží, zrušiť, čo sa už nepoužíva, ukončiť dojednania, ktoré potichu stoja peniaze.',
        relationships: 'Rok s deviatkou praje úprimnosti o tom, čo sa medzi ľuďmi už zmenilo. Keď sa to prizná, zvykne sa uľaviť, nech to pôjde akýmkoľvek smerom.',
        family: 'K roku s deviatkou sa hodí zmierenie a pustenie starých krívd. Čo zostane nevyriešené, zvykne sa preniesť do ďalšieho cyklu.',
        development: 'Púšťať, spojiť si, čo cyklus naučil, a rozoznať, kedy niečo vzdávaš a kedy niečo dokončuješ.',
        goodToStart: 'Veci, ktoré sú samy koncom: upratanie, odovzdanie, posledné vydanie.',
        betterToFinish: 'To, čo čaká na dokončenie. Dokončenie je presne to, čo rok s deviatkou zdôrazňuje.',
        doNotForce: 'Dlhodobý nový začiatok. Dôrazom deviatky je dokončenie; čo má bežať roky, zvykne lepšie vyrásť z jasného konca než vtesnané pred neho.',
    },
};
export const MONTH_CONTENT_SK = {
    1: {
        theme: 'Mesiac s jednotkou zdôrazňuje začiatky: prostredie na otvorenie toho, na čom zvyšok roka pracuje.',
        tone: 'Dopredu a trochu netrpezlivo. Energie na začínanie zvykne byť dosť, trpezlivosti s tempom ostatných menej.',
        focus: 'Vybrať smer a urobiť prvý konkrétny krok — nie sa naň pripravovať.',
        work: 'Pokiaľ ide o prácu, dôraz jednotky praje otvoreniu niečoho nového, prevzatiu vedenia alebo veci, ktorú si nikto nezobral.',
        money: 'Výdavky na rozbeh sú pre mesiac s jednotkou typické. Určiť rozpočet skôr, než sa začne, funguje lepšie než počas.',
        relationships: 'Prostredie na prvé oslovenie; menej na všímanie si toho, čo potrebujú druhí.',
        family: 'Povedať ľuďom okolo, čo začínaš, zvykne pomôcť, lebo dôraz jednotky uľahčuje jednostranné plány.',
        creativity: 'Silný na začiatky a prázdne strany, slabší na prepracúvanie.',
        rest: 'Chuť na odpočinok môže byť malá. Pomáha vedome si ho naplánovať.',
        decisions: 'Mesiac s jednotkou sa hodí na rozhodovanie, aj bez úplnej zhody.',
        social: 'Výberovo: menej ľudí, viac pokroku.',
        favorable: 'Začínať, vyberať si, žiadať a podpísať sa pod niečo.',
        caution: 'Konať skôr, než zaznie druhá strana, a brať pomalšie tempo druhých ako prekážku.',
    },
    2: {
        theme: 'Mesiac s dvojkou zdôrazňuje spoluprácu a trpezlivosť. Pokrok zvykne ísť cez druhých ľudí, nie okolo nich.',
        tone: 'Citlivo a pomalšie. Malé trenice sa môžu zapísať viac než inokedy.',
        focus: 'Dohody, nadväzovanie a detail, vďaka ktorému spoločná vec naozaj funguje.',
        work: 'Pokiaľ ide o prácu, k dôrazu dvojky sa hodí podpora, koordinácia, vyjednávanie a spoločné dokončenie niečoho.',
        money: 'Prostredie na dojednanie a odsúhlasenie podmienok, nie na rázne jednostranné kroky.',
        relationships: 'Vzťahy sú v popredí: dobré prostredie na rozhovor, ktorý sa odkladal.',
        family: 'Diplomacia sa k mesiacu s dvojkou hodí; dlhý spor sa teraz môže riešiť ľahšie.',
        creativity: 'Skôr spolu než osamote: úpravy, párová práca a dolaďovanie.',
        rest: 'Odpočinok sa k tomuto mesiacu hodí; dôraz dvojky nie je stavaný na tlačenie.',
        decisions: 'K mesiacu s dvojkou sa hodí poradiť sa skôr, než padne rozhodnutie; rozhodnutia urobené osamote sa zvyknú vracať.',
        social: 'Malé skupiny a rozhovory medzi štyrmi očami, nie davy.',
        favorable: 'Vyjednávať, spolupracovať, sprostredkúvať, dobre počkať.',
        caution: 'Prílišná ústretovosť a odkladanie rozhodnutia preto, že by mohlo niekoho vyrušiť.',
    },
    3: {
        theme: 'Mesiac s trojkou zdôrazňuje vyjadrenie a kontakt: hovoriť, ukazovať, stretávať sa s ľuďmi.',
        tone: 'Ľahko a rýchlo. Pozornosť sa ľahko presúva, čo má obe strany.',
        focus: 'Komunikácia a kontakt: písanie, prezentovanie, publikovanie, obnovenie starých spojení.',
        work: 'Pokiaľ ide o prácu, k dôrazu trojky sa hodí všetko, čo sa komunikuje: prezentovanie, písanie, výučba, rozhovory, ktoré potrebujú vrelosť.',
        money: 'Malé časté výdavky si zaslúžia viac pozornosti než jedno veľké rozhodnutie.',
        relationships: 'Spoločenské a ľahké: dobré na šírku kontaktov, menej na hĺbku.',
        family: 'Prostredie na stretnutia a na obnovenie kontaktu, ktorý stíchol.',
        creativity: 'Tvorivá chuť zvykne byť vysoká; k mesiacu s trojkou sa hodí vytvoriť tú vec, kým trvá.',
        rest: 'Odpočinok sa môže rozdrobiť; pomáha chrániť si spánok, lebo dôraz trojky zvykne zaplniť večery.',
        decisions: 'K mesiacu s trojkou sa hodí rozhodnutia prediskutovať; uzatvárať čokoľvek zložité iba na vlne nadšenia nie.',
        social: 'Vysoká: mesiac na prijímanie pozvaní, ak o ne stojíš.',
        favorable: 'Písať, prezentovať, zdieľať prácu verejne, obnoviť kontakt.',
        caution: 'Rozbehnúť priveľa vecí a nedokončiť ani jednu.',
    },
    4: {
        theme: 'Mesiac so štvorkou zdôrazňuje poriadok a dokončovanie: nenápadný a produktívny, keď sa využije na sústavnú prácu.',
        tone: 'Stále a namáhavo, často pomalšie, než by podľa pocitu malo byť.',
        focus: 'Systémy, papierovanie, opravy a uzatváranie praktických úloh.',
        work: 'Pokiaľ ide o prácu, k dôrazu štvorky sa hodí dokumentácia, postupy a podrobné dotiahnutie vecí.',
        money: 'K mesiacu so štvorkou sa hodí rozpočet, kontrola a poriadok v záznamoch: dobré prostredie na pohľad na financie také, aké naozaj sú.',
        relationships: 'Spoľahlivosť váži viac než gestá: prísť vtedy, kedy je dohodnuté.',
        family: 'Pokiaľ ide o domov, dôraz štvorky padá na praktické papiere a opravy; keď sa im človek venuje, zvykne sa uľaviť viac než len o tú jednu úlohu.',
        creativity: 'Skôr remeslo než inšpirácia: úpravy, technika, dokončovanie.',
        rest: 'K mesiacu so štvorkou sa hodí odpočinok v pevných blokoch; lepšie znáša rutinu než improvizáciu.',
        decisions: 'Dobré prostredie na rozhodnutia s dlhými následkami, lebo sa detaily naozaj skontrolujú.',
        social: 'Malá chuť; hodia sa malé záväzky.',
        favorable: 'Usporiadať, opraviť, zdokumentovať, dokončiť.',
        caution: 'Strnulosť a drina aj za bodom, kde už práca prestala mať zmysel.',
    },
    5: {
        theme: 'Mesiac s päťkou praje pohybu a zmene prostredia. Ak sa plány posunú, časť z toho môže byť užitočná.',
        tone: 'Nepokojne a rýchlo. Rutina môže pôsobiť ťažšie než inokedy.',
        focus: 'Rozmanitosť, cesty, nové podmienky a skúšanie vecí namiesto ich usadzovania.',
        work: 'Pokiaľ ide o prácu, k dôrazu päťky sa hodí zmena, nové kontakty a krátke pokusy; neprerušovaná rutina menej.',
        money: 'Peniaze sa môžu hýbať oboma smermi; pomáha rezerva na jednorazové náklady.',
        relationships: 'Živé, ale premenlivé: dobré na nové kontakty, menej na uisťovanie.',
        family: 'Pevné domáce zvyklosti sa môžu uvoľniť; naplánovať si trochu pružnosti zvykne fungovať lepšie než sa jej brániť.',
        creativity: 'Dobré na nové podnety a hrubé náčrty, slabšie na dokončovanie.',
        rest: 'Nepravidelný; chrániť si spánok je dôležitejšie než inokedy.',
        decisions: 'K mesiacu s päťkou sa hodí odložiť čokoľvek trvalé: rozhodovať o pokusoch, nie o záväzkoch.',
        social: 'Vysoká a pestrá: noví ľudia rovnako ako tí známi.',
        favorable: 'Cestovať, skúšať, znovu dojednávať, zmeniť niečo malé.',
        caution: 'Unáhlené záväzky a odsúhlasenie vecí, ktoré zostali poriadne neprečítané.',
    },
    6: {
        theme: 'Mesiac so šestkou zdôrazňuje starostlivosť a zodpovednosť. Povinnosti vyplávajú na povrch a venovať sa im zvykne upokojiť viac, než to stojí.',
        tone: 'Vrelšie a ťažšie. Môže sa od teba žiadať viac a zvykne to vážiť menej než inokedy.',
        focus: 'Starostlivosť, oprava vzťahov a kvalita toho, za čo zodpovedáš.',
        work: 'Pokiaľ ide o prácu, k dôrazu šestky sa hodí starostlivosť, výučba, služba a kvalita; odstup menej.',
        money: 'Výdavky sa zvyknú prikláňať k starostlivosti a údržbe; počítať s nimi funguje lepšie, než sa nechať zaskočiť.',
        relationships: 'Záväzok je v popredí: prostredie na jasné pomenovanie vecí, jedným aj druhým smerom.',
        family: 'Ak je rodina súčasťou života, zvykne sa dostať do stredu: odkladané rozhovory môžu ísť teraz lepšie než neskôr.',
        creativity: 'Estetická a praktická: izba, jedlo, vec urobená vlastnými rukami.',
        rest: 'Odpočinok zvykne prísť ľahšie blízko domova.',
        decisions: 'Prostredie na rozhodnutia o ľuďoch a starostlivosti; slabšie na chladné, čisto obchodné.',
        social: 'Blízky okruh, nie široký kontakt.',
        favorable: 'Opraviť, pohostiť, zaviazať sa, poriadne sa o niečo postarať.',
        caution: 'Vziať na seba cudziu záťaž a potom mať za zlé váhu, ktorá bola tvojou voľbou.',
    },
    7: {
        theme: 'Mesiac so sedmičkou zdôrazňuje štúdium a premýšľanie: výkon zvykne klesnúť, porozumenie rásť.',
        tone: 'Ticho a dovnútra. Spoločnosť môže stáť viac síl než inokedy.',
        focus: 'Výskum, rozbor, prehodnotenie a otázky, ktoré čakali na čas.',
        work: 'Pokiaľ ide o prácu, k dôrazu sedmičky sa hodí odbornosť, kontrola, rozbor a poriadne premyslenie; objem menej.',
        money: 'Skôr preverovať než konať: prostredie na porozumenie finančnej situácii viac než na jej zmenu.',
        relationships: 'Dostupnosť môže byť menšia; povedať to nahlas funguje lepšie než tiché stiahnutie sa.',
        family: 'Blízkosť môže potrebovať vedomé úsilie, lebo dôraz sedmičky ťahá dovnútra.',
        creativity: 'Skôr pojmová než produktívna: teraz nápady, neskôr vykonanie.',
        rest: 'Samota v mesiaci so sedmičkou zvykne obnovovať.',
        decisions: 'K mesiacu so sedmičkou sa hodí skôr zbierať než rozhodovať, iba ak by samo rozhodnutie bolo o tom, s niečím prestať.',
        social: 'Nízka. Chrániť si ticho funguje lepšie než sa zaň ospravedlňovať.',
        favorable: 'Študovať, skúmať, prehodnocovať, byť zámerne osamote.',
        caution: 'Stíchnuť vo chvíli, keď treba odpoveď.',
    },
    8: {
        theme: 'Mesiac s osmičkou zdôrazňuje výsledky, zdroje a zodpovednosť: prostredie, v ktorom sa do popredia dostávajú hmatateľné dôsledky.',
        tone: 'S ťahom a na očiach. Tlak môže byť vyšší a vyššie môže byť aj to, čo je na dosah.',
        focus: 'Výsledky, vyjednávanie a spravodlivé uznanie za to, čo sa urobilo.',
        work: 'Pokiaľ ide o prácu, dôraz osmičky praje prevzatiu zodpovednosti za výsledok, nie za úlohu.',
        money: 'V popredí sú peniaze a zdroje: vyjednávanie, tvorba cien a vedomé finančné rozhodnutia. Je to dôraz, nie sľub zisku.',
        relationships: 'Práca a ambícia si môžu vziať celý priestor, ak sa vopred nerozhodne inak.',
        family: 'Zabezpečenie nie je prítomnosť; v mesiaci s osmičkou sa táto výmena môže urobiť bez povšimnutia.',
        creativity: 'Skôr obchodná než objaviteľská: aby vec obstála.',
        rest: 'Krátky a zámerný; mesiac s osmičkou ho sám ponúka len zriedka.',
        decisions: 'Prostredie na závažné rozhodnutia, ak sa skontroluje, akú veľkosť na seba berieš.',
        social: 'Skôr cieľavedomá než ležérna.',
        favorable: 'Vyjednávať, oceňovať, uzatvárať, prevziať autoritu.',
        caution: 'Precenenie síl a zámena toho, aké je to ťažké, za to, ako dobre to ide.',
    },
    9: {
        theme: 'Mesiac s deviatkou zdôrazňuje upratovanie: dokončovať, odovzdávať a púšťať viac než otvárať čokoľvek nové.',
        tone: 'Hĺbavo a často unavene. Konce môžu stáť viac síl, než sa navonok zdá.',
        focus: 'Dokončenie, upratanie a uzavretie toho, čo je v praxi hotové už nejaký čas.',
        work: 'Pokiaľ ide o prácu, k dôrazu deviatky sa hodí dokončiť, zdokumentovať, odovzdať a dobre odísť; založenie niečoho nového menej.',
        money: 'Vyrovnať a uzavrieť: čo sa dlží, čo sa už nepoužíva, dojednania, ktoré potichu stoja peniaze.',
        relationships: 'Prostredie na to, aby sa skončené nechalo skončiť a povedalo sa to láskavo.',
        family: 'K mesiacu s deviatkou sa hodí zmierenie a odloženie starej krivdy.',
        creativity: 'Úpravy a dokončovanie: zavrieť otvorené súbory namiesto otvárania ďalšieho.',
        rest: 'Odpočinok je potrebný; viac zvykne pomôcť po upratovaní než namiesto neho.',
        decisions: 'K mesiacu s deviatkou sa rozhodovanie o tom, čo ukončiť, hodí viac než o tom, čo začať.',
        social: 'Skôr rozlúčky a uzatváranie než nové zoznámenia.',
        favorable: 'Dokončiť, vypratať, odpustiť, odovzdať.',
        caution: 'Začať niečo, čo potrebuje dlhý rozbeh, vo chvíli, ktorá praje uzatváraniu.',
    },
};
export const DAY_CONTENT_SK = {
    1: {
        summary: 'Deň s jednotkou praje začínaniu a rozhodovaniu: prvému konkrétnemu kroku namiesto ďalšej prípravy.',
        favorable: 'Otvoriť úlohu, vybrať si, urobiť prvý krok v niečom, čo je už naplánované.',
        cautions: 'Konať skôr, než zaznie druhá strana, a brať pomalšie tempo niekoho iného ako prekážku.',
        work: 'Pokiaľ ide o prácu, dobrý deň začať to, okolo čoho sa krúži; dobre sa na to môže hodiť prvá časť dňa.',
        communication: 'Priamo a stručne: povedať vec jasne namiesto zmäkčovania do nejasnosti.',
        relationships: 'Dobrý na oslovenie, slabší na všímanie si toho, čo potrebuje niekto iný.',
        planning: 'Nastaviť smer týždňa namiesto vypĺňania podrobností.',
        rest: 'V tento deň sa dá ľahko podceniť; pomáha pevný koniec dňa.',
        practical: 'Začni jednu malú praktickú úlohu; dokončiť ju môžeš neskôr.',
        pace: 'Na začiatku zvykne byť rýchlejší; prvé hodiny sa môžu hodiť na rozhodné kroky.',
    },
    2: {
        summary: 'Deň s dvojkou praje spolupráci a trpezlivosti: pracovať cez ľudí, nie okolo nich, a nechať veciam čas, ktorý potrebujú.',
        favorable: 'Nadviazať na predošlé, vyjednávať, poriadne počúvať, niečo spoločne dokončiť.',
        cautions: 'Súhlasiť preto, že nesúhlas by bol nepríjemný, a odkladať rozhodnutie kvôli pokoju.',
        work: 'Pokiaľ ide o prácu, podpora a koordinácia sa k dňu hodia viac než sólové tlačenie.',
        communication: 'Viac sa pýtať než hovoriť; detail aj tón sa môžu zapísať viac než inokedy.',
        relationships: 'Dobré prostredie na ťažký rozhovor vedený jemne.',
        planning: 'Plánovať s niekým, nie proti nemu.',
        rest: 'Odpočinok stojí za to; deň nie je stavaný na tlačenie.',
        practical: 'Malé, starostlivé úlohy namiesto všetkého, čo potrebuje hrubú silu.',
        pace: 'Pomaly a rovnomerne; ísť s tým zvykne fungovať lepšie než proti tomu.',
    },
    3: {
        summary: 'Deň s trojkou praje vyjadreniu a kontaktu: napísať to, povedať to, ukázať to, stretnúť sa s ľuďmi.',
        favorable: 'Písať, prezentovať, obnoviť kontakt a čokoľvek, čo má publikum.',
        cautions: 'Začať štyri veci a nedokončiť ani jednu; rozprávať o pláne namiesto jeho vykonania.',
        work: 'Pokiaľ ide o prácu, k dňu sa hodia úlohy postavené na komunikácii viac než osamelá práca s detailmi.',
        communication: 'Rozhovor ide ľahko: dobré prostredie povedať niečo, čo čakalo na vyslovenie.',
        relationships: 'Ľahké a spoločenské: dobré na šírku, nie na hĺbku.',
        planning: 'Načrtnúť široko; zložité záväzky je lepšie neuzatvárať na nadšení tohto dňa.',
        rest: 'Do večera ho môže niečo vytlačiť; ak ho potrebuješ, pomáha rozhodnúť sa včas.',
        practical: 'Vybaviť drobnosti naraz môže v tento deň dobre fungovať.',
        pace: 'Rýchlo a roztrúsene; pomáha vopred si vybrať dve priority.',
    },
    4: {
        summary: 'Deň so štvorkou praje poriadku, rutine a dokončovaniu praktických úloh viac než unáhleným záväzkom či nejasne určeným zmenám.',
        favorable: 'Papierovanie, opravy, dokumentácia a uzavretie toho, čo je skoro hotové.',
        cautions: 'Drieť aj za bodom užitočnosti a odmietať prispôsobiť sa, keď to plán zjavne potrebuje.',
        work: 'Pokiaľ ide o prácu, k dňu sa hodí detail, postup a dokončovanie; metóda váži viac než inšpirácia.',
        communication: 'Presne a doslova: písomne potvrdiť, čo sa dohodlo ústne.',
        relationships: 'Skôr stále než vrelé; v tento deň sa zapisuje spoľahlivosť.',
        planning: 'Dobrý deň na zostavenie konkrétneho plánu: dátumy, kroky, kto čo robí.',
        rest: 'Odpočinok v pevných blokoch, nie improvizovaný.',
        practical: 'Poriadne dokonči jednu malú praktickú úlohu.',
        pace: 'Rovnomerne a vytrvalo, často pomalšie, než by podľa pocitu malo byť.',
    },
    5: {
        summary: 'Deň s päťkou praje pohybu a rozmanitosti. Ak sa plán posunie, pracovať so zmenou zvykne pomôcť viac než sa jej brániť.',
        favorable: 'Presuny, nové kontakty, krátke pokusy, nové podmienky pre niečo, čo zatuchlo.',
        cautions: 'Zaviazať sa z okamžitého popudu a odsúhlasiť niečo, čo zostalo poriadne neprečítané.',
        work: 'Pokiaľ ide o prácu, k dňu sa hodí zmena prostredia a nové podnety viac než neprerušené sústredenie.',
        communication: 'Rýchlo a široko: dobré na nadviazanie kontaktu, menej na jemné odtiene.',
        relationships: 'Živé, ale premenlivé; sľuby je v tento deň lepšie držať malé.',
        planning: 'Plánovať voľne: podrobný rozvrh môže potrebovať úpravu.',
        rest: 'Nepravidelný; pomáha chrániť si predovšetkým spánok.',
        practical: 'Pochôdzky a presuny namiesto dlhých sústredených úloh.',
        pace: 'Rýchlo a nerovnomerne; pomáha nechať si v dni vôľu.',
    },
    6: {
        summary: 'Deň so šestkou praje starostlivosti a zodpovednosti: poriadne sa o niečo postarať, či už o úlohu, miesto alebo človeka.',
        favorable: 'Opravy, pohostenie a starostlivosť o niekoho alebo niečo, čo ju potrebuje.',
        cautions: 'Vziať na seba cudziu záťaž a niesť ju ešte dlho po tomto dni.',
        work: 'Pokiaľ ide o prácu, k dňu sa hodí starostlivosť, služba, výučba a kvalitná práca viac než chladné, čisto obchodné úlohy.',
        communication: 'Vrelo a osobne: dobré prostredie na opravu napätého kontaktu.',
        relationships: 'Záväzok je v popredí: dobrý deň na jasné pomenovanie veci.',
        planning: 'Plánovať okolo ľudí a starostlivosti, nie okolo výkonu.',
        rest: 'Odpočinok zvykne prísť ľahšie blízko domova.',
        practical: 'Oprav alebo daj do poriadku jednu vec, ktorá potrebuje starostlivosť.',
        pace: 'Mierne a vrelo; preplnený deň mu nesedí.',
    },
    7: {
        summary: 'Deň so sedmičkou praje štúdiu, rozboru a zámernej samote: porozumeniu viac než výkonu.',
        favorable: 'Výskum, prehodnotenie, čítanie a poriadne premyslenie jedného problému.',
        cautions: 'Stíchnuť vo chvíli, keď niekto potrebuje odpoveď.',
        work: 'Pokiaľ ide o prácu, k dňu sa hodí rozbor a odbornosť viac než porady a objem.',
        communication: 'Minimálne: krátka priebežná odpoveď je lepšia než žiadna.',
        relationships: 'Dostupnosť môže byť malá; povedať to funguje lepšie než tiché stiahnutie sa.',
        planning: 'Dobrý deň na preverenie, či je plán správny, nie na jeho vykonanie.',
        rest: 'Samota v tento deň zvykne obnovovať.',
        practical: 'Úlohy bez rozruchu namiesto všetkého, čo si žiada vyjednávanie.',
        pace: 'Pomaly a dovnútra; pomáha chrániť si trochu ticha.',
    },
    8: {
        summary: 'Deň s osmičkou praje výsledkom, zdrojom a zodpovednosti: dotiahnuť výsledok do konkrétnej podoby a prevziať za neho zodpovednosť.',
        favorable: 'Vyjednávať, oceňovať, niečo uzavrieť, prevziať zodpovednosť za výsledok.',
        cautions: 'Precenenie síl a zámena toho, aký ťažký deň je, za to, ako dobre ide.',
        work: 'Pokiaľ ide o prácu, k dňu sa hodí skôr tá závažná položka než tá pohodlná.',
        communication: 'Pevne a jasne: podmienky, čísla a termíny povedané priamo.',
        relationships: 'Práca a ambícia si môžu vziať celý priestor, ak sa vopred nerozhodne inak.',
        planning: 'Plánovať výsledky a termíny, nie činnosť.',
        rest: 'Krátky a zámerný; deň ho sám ponúka len zriedka.',
        practical: 'Vybav jednu praktickú finančnú alebo administratívnu vec.',
        pace: 'Vysoké a pod tlakom; pomáha vopred si určiť, kde sa to končí.',
    },
    9: {
        summary: 'Deň s deviatkou praje dokončovaniu a upratovaniu, nie začínaniu: uzavrieť, čo je v praxi už hotové.',
        favorable: 'Dokončiť, odovzdať, vypratať, ospravedlniť sa, niečo čisto ukončiť.',
        cautions: 'Začať niečo, čo potrebuje dlhý rozbeh, v deň, ktorý praje uzatváraniu.',
        work: 'Pokiaľ ide o prácu, k dňu sa hodí dokončenie a odovzdanie viac než otvorenie nového frontu.',
        communication: 'Dobré prostredie na správu, ktorá uzatvára kruh — aj na tú ťažkú.',
        relationships: 'Dobré na zmierenie a na to, aby sa skončené nechalo skončiť.',
        planning: 'Prejsť zoznam a uzavrieť ho namiesto jeho predlžovania.',
        rest: 'Konce môžu unaviť viac, než sa zdá; pomáha odpočinok po upratovaní.',
        practical: 'Vyprázdni, zaraď, vráť alebo zruš jednu vec, ktorá je hotová.',
        pace: 'Doznieva; veľké otváranie sa k dňu hodí menej.',
    },
};
/*
 * THE SENTENCES THE BUILDER WRITES.
 *
 * buildForecast.ts composes three short pieces of prose of its own - the
 * methodology note, the reason a month is marked, and the note when a cycle
 * number matches the Life Path. It stays locale-free, so the screen looks these
 * up here by the same structural facts the builder used to choose them. The
 * reasons are recognised from the numbers, not from the English text, so a
 * reworded English reason cannot silently produce a mismatched Slovak one.
 */
export const METHODOLOGY_NOTE_SK = 'Osobný rok sa preklápa 1. januára, nie na narodeniny — obe konvencie existujú a táto aplikácia používa túto. '
    + 'Majstrovské čísla 11 a 22 sa v týchto cykloch redukujú, pretože sú vlastnosťou natálnej mapy, nie prechodného obdobia. '
    + 'Ide o symbolické zamyslenie: nič tu nepredpovedá udalosti.';
export function markerReasonKind(personalMonth, personalYear) {
    if (personalMonth === personalYear)
        return 'matches-year';
    if (personalMonth === 1)
        return 'opening';
    if (personalMonth === 9)
        return 'clearing';
    return null;
}
export function markerReasonSk(kind, personalMonth) {
    switch (kind) {
        case 'matches-year':
            return `Osobný mesiac ${personalMonth} sa zhoduje s osobným rokom — téma roka je tu zhustená.`;
        case 'opening':
            return 'Osobný mesiac 1 — úvodný dôraz roka, vhodný na rozbeh.';
        case 'clearing':
            return 'Osobný mesiac 9 — dôraz na upratovanie, vhodný na dokončenie a odovzdanie.';
    }
}
export function resonanceSk(kind, cycle, lifePath) {
    if (kind === 'personal-year-matches-life-path') {
        return `Tvoj osobný rok (${cycle}) sa zhoduje s tvojou životnou cestou (${lifePath}). `
            + 'Téma roka je zároveň tvojou stálou témou, takže tento rok býva skôr príznačný než neznámy. '
            + 'Je to konštatovanie, že sa dve vypočítané čísla zhodujú — žiadny ďalší výpočet sa nerobí.';
    }
    return `Tvoja životná cesta má tiež číslo ${lifePath}, takže téma dňa je zároveň tvojou stálou témou.`;
}
/*
 * THE LUNAR LAYER.
 *
 * Folk almanac custom, kept apart from numerology on the screen and here. The
 * English recommendations in lunarGuidance.ts are chosen by whether the Moon
 * is filling or emptying; the Slovak is keyed by the same activity and the
 * same trend, so the two can never disagree about which advice a day gets.
 */
export const LUNAR_PHASE_NAMES_SK = {
    'New Moon': 'Nov',
    'Waxing Crescent': 'Dorastajúci kosáčik',
    'First Quarter': 'Prvá štvrť',
    'Waxing Gibbous': 'Dorastajúci Mesiac',
    'Full Moon': 'Spln',
    'Waning Gibbous': 'Ubúdajúci Mesiac',
    'Last Quarter': 'Posledná štvrť',
    'Waning Crescent': 'Ubúdajúci kosáčik',
};
export const LUNAR_TREND_SK = {
    waxing: 'dorastá',
    waning: 'ubúda',
};
export const LUNAR_DISCLAIMER_SK = 'Ľudové kalendárne zvyky, nie numerológia a nie veda. Uvedené oddelene a pri každej položke je pomenovaná tradícia, z ktorej pochádza.';
export const LUNAR_SOURCE_SK = {
    "Old Farmer's Almanac (moon-phase farming)": 'Old Farmer\'s Almanac (hospodárenie podľa fáz Mesiaca)',
    'Lunar hair and nail custom': 'ľudový zvyk o strihaní vlasov a nechtov podľa Mesiaca',
    'European folk household custom': 'európsky ľudový zvyk v domácnosti',
};
/** Keyed by the English activity, which is the row's identity in lunarGuidance.ts. */
export const LUNAR_ACTIVITIES_SK = {
    'Sowing and planting above-ground crops': {
        activity: 'Sejba a sadenie plodín rastúcich nad zemou',
        waxing: 'Tradične sa odporúča teraz, kým Mesiac dorastá.',
        waning: 'Tradične sa necháva, kým Mesiac znovu nezačne dorastať.',
    },
    'Planting root and below-ground crops': {
        activity: 'Sadenie koreňových plodín a plodín rastúcich pod zemou',
        waxing: 'Tradične sa odkladá až za spln.',
        waning: 'Tradične sa odporúča teraz, kým Mesiac ubúda.',
    },
    'Pruning, thinning, weeding and mowing': {
        activity: 'Rez, prerieďovanie, pletie a kosenie',
        waxing: 'Tradične sa odkladá; rast vraj ide do výhonkov.',
        waning: 'Tradične sa odporúča teraz, aby sa spomalilo dorastanie.',
    },
    'Transplanting and grafting': {
        activity: 'Presádzanie a vrúbľovanie',
        waxing: 'Tradične sa odporúča teraz.',
        waning: 'Tradične sa odkladá, kým Mesiac nedorastá.',
    },
    Haircut: {
        activity: 'Strihanie vlasov',
        waxing: 'Zvyk spája dorastajúci Mesiac s rýchlejším dorastaním a dĺžkou.',
        waning: 'Zvyk spája ubúdajúci Mesiac s pomalším dorastaním a strihom, ktorý drží tvar.',
    },
    'Nail cutting': {
        activity: 'Strihanie nechtov',
        waxing: 'Zvyk spája dorastajúci Mesiac s rýchlejším dorastaním.',
        waning: 'Zvyk spája ubúdajúci Mesiac s pomalším dorastaním.',
    },
    'Clearing out and decluttering the home': {
        activity: 'Upratovanie a vyprázdňovanie domácnosti',
        waxing: 'Tradične sa necháva na ubúdajúci Mesiac.',
        waning: 'Tradične sa odporúča teraz.',
    },
    'Preserving, drying and storing': {
        activity: 'Zaváranie, sušenie a uskladňovanie',
        waxing: 'Tradične sa necháva na ubúdajúci Mesiac, keď vraj plody držia menej vody.',
        waning: 'Tradične sa odporúča teraz.',
    },
};
