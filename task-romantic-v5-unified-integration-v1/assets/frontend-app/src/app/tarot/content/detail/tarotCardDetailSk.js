/**
 * KAŽDÁ KARTA SAMA O SEBE, PO SLOVENSKY - v základnej polohe aj obrátená.
 *
 * Rovnaká práca ako tarotCardDetailEn.ts, písaná po slovensky a nie prekladaná: tykanie, pojmy z docs/tarot/TAROT_SK_STYLE.md
 * (palice, poháre, meče, mince) a žiadne tvary, ktoré by prezrádzali rod čitateľa. Obrátená karta je pozmenený výraz tej
 * istej karty, nie jej opak ani zlá karta; text každej sleduje zmenu, ktorú jej priraďuje content/tarotOrientation.ts.
 *
 * NIČ TU NEPREDPOVEDÁ. Žiadny odsek nepomenúva udalosť, osobu, diagnózu, sumu peňazí ani to, čo si myslí niekto iný.
 */
export const TAROT_CARD_DETAIL_SK = {
    /* --------------------------------------------------------- major arcana */
    'major-fool': {
        upright: 'Pocestný kráča k okraju útesu s ľahkým batohom, s očami upretými k oblohe a malým psom pri nohách. Blázon je začiatok urobený z dôvery: skok prichádza skôr než plán a práve v jeho sviežosti je celá sila. Žiada odvahu bez mapy.',
        reversed: 'Obrátený, skok sa stáča dovnútra. Pripravenosť začať tu je, no zaváha, pochybuje alebo ostáva neskúšaná. Blázon stále stojí na okraji a nesie tú istú ľahkosť ako pochybnosť. Chýba dôvod začať teraz, nie schopnosť.',
    },
    'major-magician': {
        upright: 'Jedna ruka ukazuje k nebu, druhá k zemi a pred ním na stole ležia štyri znaky farieb. Mág je schopnosť v akcii: vôľa, nástroje a okamih sa zhodujú. Čo potrebuješ, máš už na dosah; úlohou je nasmerovať to.',
        reversed: 'Obrátený, nástroje zostávajú na stole. Schopnosť či zdroj tu je, no nemôže sa stať činom: roztrieštená pozornosť, predstavenie namiesto vytvorenia veci, plán bez prvého kroku. Zober to do jednej veci a začni.',
    },
    'major-high-priestess': {
        upright: 'Sedí medzi dvoma stĺpmi s napoly skrytým zvitkom v rúchu a závojom z granátových jabĺk za sebou. Veľkňažka je vedenie držané v tichu: intuícia, trpezlivosť, niečo pochopené skôr, než sa to dá povedať. Počúvanie tu poslúži viac než konanie.',
        reversed: 'Obrátená, to, čo sa držalo vo vnútri, sa približuje k povrchu. Tajomstvo prehovorí, intuícia je prehlušená alebo sa ticho berie za neprítomnosť. Tiché poznanie je stále skutočné; otázkou je, či ho počuť, alebo ho prekrikuje iný hlas.',
    },
    'major-empress': {
        upright: 'Korunovaná žena leží na vankúšoch v poli zrelého obilia a neďaleko tečie potok. Cisárovná je hojnosť, ktorá sa pestuje, nie stavia: starostlivosť, tvorivosť, telo a zmysly a pomalá práca, ktorou necháš niečo rozkvitnúť.',
        reversed: 'Obrátená, hojnosť sa stáča dovnútra. Starostlivosť vyschne alebo smeruje len k iným, tvorivosť sa zastaví, pohodlie začne dusiť. Pôda je stále úrodná; potrebuje pozornosť venovanú tomu, kto sa o ňu stará.',
    },
    'major-emperor': {
        upright: 'Prísna postava sedí na kamennom tróne ozdobenom baraními hlavami, pod rúchom pancier. Cisár je štruktúra a autorita: hranice, poriadok, rozhodnutie, ktoré drží. Stavia rám, aby niečo mohlo vydržať.',
        reversed: 'Obrátený, rám sa drží príliš tuho. Autorita stuhne do kontroly alebo sa štruktúra bráni dávno po tom, čo prestala sedieť. Sila je tu v prepísaní pravidla, nie v stavaní múru.',
    },
    'major-hierophant': {
        upright: 'Rúchom odetý učiteľ sedí medzi dvoma žiakmi, pri nohách má skrížené kľúče a jednu ruku zdvihnutú v požehnaní. Veľkňaz je tradícia a učenie: osvedčená forma, spoločná prax, naučiť sa, ako sa vec robí, skôr než sa od nej odkloníš.',
        reversed: 'Obrátený, forma stráca pôsobenie. Zvyk sa spochybňuje, zdedený spôsob znie prázdne alebo sa pravidlo dodržiava bez svojho dôvodu. Ukazuje to k hľadaniu vlastného vzťahu k tomu, čo ťa učili.',
    },
    'major-lovers': {
        upright: 'Dve postavy stoja pod anjelom a za každou strom. Zaľúbenci sú spojenie a voľba: príťažlivosť, súlad hodnôt, rozhodnutie, ktoré ukáže, za čím stojíš. Je to rovnako o dobrom výbere, ako o tom, že ťa niekto vyberie.',
        reversed: 'Obrátení, voľba viazne. Hodnoty a túžba sa rozchádzajú, rozhodnutie sa odkladá alebo sa preferencia vydáva za zásadu. Blízkosť je možná, no najprv treba na otázku, čo si naozaj ceníš, odpovedať priamo.',
    },
    'major-chariot': {
        upright: 'Obrnený vodič stojí na voze ťahanom dvoma sfingami, jednou tmavou a jednou svetlou, a v rukách nemá opraty. Voz je smer získaný vôľou: protichodné ťahy udržané na jednej dráhe, hybnosť zaslúžená disciplínou.',
        reversed: 'Obrátený, disciplína sa stáča dovnútra a napína. Dráha sa drží len úsilím alebo sa ťahy rozídu a voz blúdi. Hybnosť je k dispozícii, keď sa obe strany zhodnú, kam smerujú.',
    },
    'major-strength': {
        upright: 'Žena kladie ruky na papuľu leva, nad hlavou má lemniskátu. Sila je odvaha tichého druhu: trpezlivosť, súcit a vytrvalý vplyv, ktoré skrotia divokú vec bez toho, aby ju zlomili.',
        reversed: 'Obrátená, tichá sila sa ukazuje ako pochybnosť alebo surovosť. Sebadôvera kolíše, zviera sa prejaví alebo jemnosť skĺzne do vyhýbania. Žiada pomenovať strach otvorene a stretnúť sa s ním bez zatínania.',
    },
    'major-hermit': {
        upright: 'Starý muž stojí na vrchole hory s lampášom so šesťcípou hviezdou v jednej ruke a palicou v druhej. Pustovník je úmyselné odtiahnutie: samota zvolená kvôli porozumeniu, malé svetlo, ktoré ukazuje dosť na najbližšie kroky.',
        reversed: 'Obrátený, ústup sa spochybňuje. Samota sa rozplynie v odlúčenosť alebo sa hľadanie zahodí a návrat nepriniesol to, kvôli čomu sa odchádzalo. Lampáš stále horí; pýta sa, či nie je čas zniesť ho z hory.',
    },
    'major-wheel-of-fortune': {
        upright: 'Veľké koleso sa otáča v oblakoch, lemované symbolmi, na vrchu sfinga a okolo postavy stúpajúce aj klesajúce. Koleso šťastia je cyklus a zmena: veci, ktoré sa otáčajú samy a nie je na tebe ich riadiť, a cit pre načasovanie.',
        reversed: 'Obrátené, otáčanie je pomalé alebo uviazne. Cyklus sa vzpiera, na zmenu sa čaká namiesto toho, aby sa jej išlo naproti, šťastie sa zdá byť zadržané. Oddeliť to, čo môžeš riadiť, od toho, čo sa len otáča, vráti pohyb.',
    },
    'major-justice': {
        upright: 'Postava sedí medzi dvoma stĺpmi so zdvihnutým mečom v jednej ruke a váhami v druhej. Spravodlivosť je zvážený účet: príčina a dôsledok, férovosť, úprimný úsudok o situácii vrátane tvojho podielu na nej.',
        reversed: 'Obrátená, vážiť sa začne jednostranne. Vkradne sa zaujatosť, verdikt sa obchádza alebo sa robí audit, ktorý nikdy nedôjde k záveru. Váhy stále žiadajú čítať ich priamo, so všetkými závažiami.',
    },
    'major-hanged-man': {
        upright: 'Muž visí za jednu nohu zo živého stromu, pokojný, okolo hlavy svätožiara. Obesenec je úmyselná pauza: vzdanie sa obvyklého uhla pohľadu, zavesenie, ktoré umožní nový výhľad.',
        reversed: 'Obrátený, pauza sa ukáže taká, aká je. Čakanie sa vydáva za rozhodnutie alebo sa obeť prinesie a nijaký výhľad nezíska. Ak ticho prestalo učiť, je čas zísť dolu a konať.',
    },
    'major-death': {
        upright: 'Kostra v čiernom pancieri jazdí na bielom koni pod vychádzajúcim slnkom, v ruke zástavu s bielou ružou. Smrť je premena, nie doslovný koniec: jedna etapa sa uzatvára, aby bola pôda čistá pre ďalšiu.',
        reversed: 'Obrátená, koniec sa odmieta alebo odkladá. Niečo sa drží pri živote dávno po svojom čase, zmena uviazne, uvoľnenie je urobené len napoly. Karta sa pýta, čo je už skončené a čo stojí lipnutie.',
    },
    'major-temperance': {
        upright: 'Anjel s jednou nohou na zemi a druhou vo vode prelieva tekutinu medzi dvoma pohármi. Miernosť je rovnováha a zmiešanie: striedmosť, trpezlivosť, správny pomer odlišných vecí, z ktorého vzniká niečo nové.',
        reversed: 'Obrátená, pomer sa naruší. Priveľa alebo primálo, zmes nariedená, až stratí chuť, skratka tam, kde bola potrebná trpezlivosť. Úprava miery vráti tok a z dvoch vecí znova urobí jednu.',
    },
    'major-devil': {
        upright: 'Rohatá postava predsedá dvom ľuďom voľne pripútaným reťazami pri jej nohách; obojky sú dosť voľné, aby sa dali stiahnuť. Diabol je pripútanosť: zvyk, túžba alebo strach, ktoré držia práve preto, že sa na ne nikdy nepozrieš.',
        reversed: 'Obrátený, reťaz je viditeľná. Pripútanosť sa pomenuje a uvoľňovanie začne, alebo sa vzorec spozná a jeho zovretie sa popiera. Pozrieť sa priamo na to, čo stále ťahá, je prvý krok von.',
    },
    'major-tower': {
        upright: 'Blesk udrie do vysokej veže, jej koruna odletí a z okien padajú postavy. Veža je náhly pád toho, čo nikdy nebolo pevné: falošná stavba alebo ilúzia skončená naraz, ktorá uvoľní pôdu pre niečo pravdivé.',
        reversed: 'Obrátená, pád sa prežíva vo vnútri alebo sa spomalí. Zmena sa obchádza alebo sa šok nesie potichu, katastrofa sa tesne minie alebo odloží. Základ stále treba skontrolovať; odklad ho nespevní.',
    },
    'major-star': {
        upright: 'Žena kľačí pri jazierku a vylieva vodu na zem aj do potoka pod veľkou hviezdou obkolesenou siedmimi menšími. Hviezda je obnova: nádej po námahe, tiché zotavenie, pokojná otvorenosť voči tomu, čo príde.',
        reversed: 'Obrátená, nádej je tenká alebo sa skúma príliš zblízka. Odrádzanie, čakanie, kým sa budeš cítiť lepšie, namiesto konania, strata dôvery v proces. Voda stále tečie; žiada, aby sa o ňu starali, aj keď to nikto nevidí.',
    },
    'major-moon': {
        upright: 'Mesiac hľadí na cestu medzi dvoma vežami, pes a vlk vyjú a z jazierka sa plazí rak. Mesiac je neistota: sny, inštinkt, strach a polotma, v ktorej nič nie je celkom také, aké sa zdá.',
        reversed: 'Obrátený, hmla sa začína dvíhať alebo sa mení na zmätok. Strach sa postaví, podvod sa prehliadne alebo sa predstava pokladá za fakt. Choď pomaly a nechaj to, čo je skutočné, oddeliť od toho, čo je len predstavené.',
    },
    'major-sun': {
        upright: 'Jasné slnko svieti nad dieťaťom na bielom koni, za múrom rastú slnečnice. Slnko je jasnosť a životnosť: veci na očiach, teplo, istota a úprimná radosť, ktorá nepotrebuje vysvetlenie.',
        reversed: 'Obrátené, žiara je stlmená alebo vynútená. Optimizmus prekročí mieru, radosť sa musí predvádzať, jasnosť sa oneskorí oblakom. Svetlo tu je; otázkou je, ako ho prijať takým, aké je.',
    },
    'major-judgement': {
        upright: 'Anjel zatrúbi na trúbu a z hrobov vstávajú postavy s otvorenými rukami. Súd je povolanie a zúčtovanie: úprimný pohľad späť, uvoľnenie a odpoveď na niečo, čo žiada byť zodpovedané.',
        reversed: 'Obrátený, volanie ostáva bez odpovede alebo sa zmení na rozsudok nad sebou. Pochybnosť, tvrdé sebaposudzovanie, obchádzanie rozhodnutia, ktoré je už jasné. Pohľad späť sa stále žiada: ako odpoveď, nie ako spor.',
    },
    'major-world': {
        upright: 'Tanečnica sa pohybuje vo vavrínovom venci a v rohoch sú štyri postavy. Svet je dokončenie: naplnený cyklus, zjednotenie, spokojnosť z toho, že vec skončila poriadne, a začiatok ďalšieho kruhu.',
        reversed: 'Obrátený, kruh je takmer uzavretý. Koniec sa oneskoruje, posledný kúsok chýba alebo sa dokončenie vyhlási, aby sa ušlo tomu, čo príde. Zviazať voľný koniec dovolí cyklu uzavrieť sa.',
    },
    /* ---------------------------------------------------------------- wands */
    'wands-ace': {
        upright: 'Ruka z oblaku podáva živú palicu, z ktorej raší lístie. Eso palíc je iskra: surový impulz, nová energia, tvorivý ťah ešte pred tým, než dostane tvar. Núti začať, kým je pocit živý.',
        reversed: 'Obrátené, iskra nemá kam ísť. Nadšenie sa rozplynie, začína a zastavuje sa alebo zhorí skôr, než sa čokoľvek postaví. Energia je skutočná; potrebuje cieľ, ktorý ju ponesie.',
    },
    'wands-two': {
        upright: 'Postava na cimburí drží glóbus a hľadí na more, vedľa nej je pripevnená druhá palica. Dvojka palíc je plánovanie z istého miesta: svet v ruke a rozhodnutie, ako ďaleko ísť.',
        reversed: 'Obrátená, obhliadka nahradí cestu. Ostáva sa v známom, váha sa na okraji, plánovanie zmenšuje plán. Dosah je možný, keď sa otázkou stane, ako ďaleko naozaj chceš ísť.',
    },
    'wands-three': {
        upright: 'Postava stojí chrbtom k divákovi a sleduje lode odplávajúce z prístavu, okolo nej zapichnuté tri palice. Trojka palíc je niečo, čo sa dalo do pohybu a čaká sa naň: vízia rozšírená do sveta, prvé výsledky na ceste.',
        reversed: 'Obrátená, pozorovanie sa stáča dovnútra. Čakanie sa mení na starosť, lode meškajú, návrat nie je vidieť. Úsilie je vynaložené; trpezlivosť a pripravený ďalší krok ho nenechajú zadrieť.',
    },
    'wands-four': {
        upright: 'Štyri palice nesú girlandu a postavy oslavujú pred hradom. Štvorka palíc je označený prah: stabilita, návrat domov, dokončená etapa zdieľaná s inými a zaslúžená chvíľa na nádych.',
        reversed: 'Obrátená, oslava platí, no tichšie. Význam sa takmer nemení, len zjemní: nepokoj doma, medzník označený len napoly, privítanie nie celkom usadené. Označ ho skôr, než pôjdeš ďalej.',
    },
    'wands-five': {
        upright: 'Päť postáv dvíha palice a stretávajú sa v nejasnom boji. Päťka palíc je trenie: súperiace nápady, rivalita, hluk, ktorý veci rovnako brúsi, ako ich obrusuje.',
        reversed: 'Obrátená, stret sa sťahuje dovnútra. Konflikt sa obchádza alebo vedie potichu, napätie ostáva nevyriešené. Rozlíšiť zdravé skúšanie síl od skutočného sporu ukáže, kde sa zapojiť.',
    },
    'wands-six': {
        upright: 'Jazdec na bielom koni nesie palicu ovinutú vavrínom cez jasajúci dav. Šestka palíc je verejné uznanie: víťazstvo, zásluha, istota, ktorá bola zaslúžená a je vidieť.',
        reversed: 'Obrátená, uznanie sa prežíva vnútorne alebo prichádza neskoro. Úspech bez potlesku, ego vo víťazstve, strach z pádu z podstavca. Prijmi zásluhu a nepotrebuj ju znova už zajtra.',
    },
    'wands-seven': {
        upright: 'Postava na kopci sa bráni šiestim palicám, ktoré sa dvíhajú zdola. Sedmička palíc je držaná pozícia: stáť na svojom a brániť to, čo stojí za obranu, aj keď je protivníkov viac.',
        reversed: 'Obrátená, obrana sa unavuje. Prichádza preťaženie, ustupuje sa z pozícií alebo sa bráni všetko naraz a nič poriadne. Vyber, ktorý kopec naozaj stojí za to držať, a zvyšok nechaj ísť.',
    },
    'wands-eight': {
        upright: 'Osem palíc letí otvorenou oblohou k zemi. Osmička palíc je rýchlosť: rýchly pohyb, správy, všetko prichádza naraz a hybnosť pokračuje, kým je cesta voľná.',
        reversed: 'Obrátená, let sa spomalí alebo rozptýli. Oneskorenia, pomiešané spojenia, rýchlosť bez smeru. Spomaľ natoľko, aby bolo vidieť, kam palice dopadajú, a až potom pošli ďalšie.',
    },
    'wands-nine': {
        upright: 'Obviazaná postava sa opiera o palicu pred múrom ôsmich ďalších, ostražitá. Deviatka palíc je odolnosť na konci dlhého úsilia: unavená, strážna, stále stojí.',
        reversed: 'Obrátená, stráž ostáva zo zvyku alebo povolí. Vyčerpanie, obranný postoj voči hrozbe, ktorá už odišla. Skontroluj, či je hliadka ešte potrebná a či sa dá palica položiť.',
    },
    'wands-ten': {
        upright: 'Postava zohnutá pod zväzkom desiatich palíc kráča k mestu. Desiatka palíc je bremeno: zodpovednosť nesená až do konca, ťarcha príliš veľa vecí v rukách jedného človeka.',
        reversed: 'Obrátená, náklad je väčší než ten, kto ho nesie. Preťaženie prejde do zrútenia alebo sa bremeno konečne zloží. Rozhodni, ktorá časť nikdy nebola na tebe, aby si ju niesol.',
    },
    'wands-page': {
        upright: 'Mladá postava drží palicu a skúma ju v púšti plnej pyramíd. Páža palíc je iskra zvedavosti: nápad, správa, nadšenie pre niečo nové, ešte skôr než sa z toho stane plán.',
        reversed: 'Obrátené, novinka alebo nápad dopadá pomaly. Nadšenie oznámené skôr, než sa vyskúšalo, správa oneskorená alebo zveličená. Povedz to a potom choď zistiť.',
    },
    'wands-knight': {
        upright: 'Rytier sa rúti na vzpínajúcom sa koni s vztýčenou palicou a púšť lieta za ním. Rytier palíc je vášeň v pohybe: dobrodružstvo, odvážna energia, konanie bez čakania na dovolenie.',
        reversed: 'Obrátený, útok sa stáča dovnútra alebo vyhasne. Ponáhľanie, rozptýlené úsilie, viac začatého než dokončeného, žiar bez cieľa. Ťah je skutočný; žiada vynaložiť ho na jednu vec.',
    },
    'wands-queen': {
        upright: 'Kráľovná sedí na tróne so slnečnicou a čiernou mačkou, v ruke palica. Kráľovná palíc je teplo s istotou: priťahujúca, odhodlaná, prítomnosť, okolo ktorej sa ľudia zhromažďujú.',
        reversed: 'Obrátená, teplo sa sťahuje. Nastupuje pochybnosť o sebe, žiara potrebuje pozornosť miestnosti alebo plameň hasne. Oheň tu stále je; udrž ho, aj keď sa nikto nepozerá.',
    },
    'wands-king': {
        upright: 'Kráľ sedí na tróne so znakmi levov a salamandrov a drží rašiacu palicu. Kráľ palíc je vizionárske vedenie: smer držaný a podporovaný, autorita, ktorá inšpiruje.',
        reversed: 'Obrátený, vízia tvrdne. Impulz sa vydáva za príkaz, očakávanie prerastie možnosti, smer sa pokladá za pravdu. Povedz, kam to smeruje, a stoj si za tým.',
    },
    /* ----------------------------------------------------------------- cups */
    'cups-ace': {
        upright: 'Ruka z oblaku drží pohár prelievajúci sa piatimi prúdmi, kým holubica doň púšťa hostiu. Eso pohárov je otvorenie citu: láska, súcit, tvorivé či duchovné vzlietnutie.',
        reversed: 'Obrátené, cit je surový na povrchu alebo zadržaný. Vyleje sa skôr, než sa niekam odnesie, ponúkne sa priskoro alebo sa odmietne. Prijmi to, čo sa ti naozaj podáva.',
    },
    'cups-two': {
        upright: 'Dve postavy si vymieňajú poháre pod hermovou palicou zakončenou levou hlavou. Dvojka pohárov je stretnutie rovných: vzájomná príťažlivosť, partnerstvo, vyvážená výmena.',
        reversed: 'Obrátená, výmena uviazne. Jedna strana čaká na súhlas druhej, rovnováha sa naklonila, väzba sa ešte nezdá skutočná. Stretni sa s tým na rovnakej úrovni.',
    },
    'cups-three': {
        upright: 'Tri ženy spolu dvíhajú poháre uprostred plodov úrody. Trojka pohárov je zdieľaná radosť: priateľstvo, spoločenstvo, dobrá vec, ktorá sa oslávi v spoločnosti namiesto toho, aby sa prešla mlčaním.',
        reversed: 'Obrátená, kruh sa uzatvára do seba. Oslava pretrvá dlhšie než jej dôvod, spoločnosť sa zvrhne na klebety alebo klany, radosť ostáva súkromná. Povedz to ľuďom, ktorým patrí.',
    },
    'cups-four': {
        upright: 'Postava sedí pod stromom so založenými rukami, nevšíma si tri poháre, kým jej ruka z oblaku podáva štvrtý. Štvorka pohárov je odtiahnutá pozornosť: ľahostajnosť, rozjímanie, ponuka ponechaná bez povšimnutia.',
        reversed: 'Obrátená, pozornosť sa vracia. Ponuka, ktorá ostávala bez povšimnutia, sa konečne zbadá, alebo sa odtiahnutie ukáže ako vyhýbanie. Pozri sa na to, čo sa ti naozaj podáva, skôr než rozhodneš, že to nie je pre teba.',
    },
    'cups-five': {
        upright: 'Postava v plášti smúti nad troma vyliatymi pohármi, kým dva stoja vzpriamene za ňou. Päťka pohárov je zármutok upretý na stratu: ľútosť, sklamanie a to, čo ostalo, stále nevidieť.',
        reversed: 'Obrátená, postava sa začína otáčať. Prijatie, spočítanie toho, čo ostalo, alebo zármutok držaný príliš dlho. Otoč sa natoľko, aby bolo vidieť dva poháre, ktoré stále stoja.',
    },
    'cups-six': {
        upright: 'Dve deti si v tichom nádvorí podávajú pohár s kvetmi, v každom rohu pohár. Šestka pohárov je láskavosť a spomienka: nostalgia, nevinnosť, niečo dobré prenesené z minulosti.',
        reversed: 'Obrátená, minulosť sa vynára na svetlo. Nostalgia žije vo verzii, ktorá odišla, alebo sa spomienka vidí taká, aká bola. Vezmi si láskavosť a nechaj tamten rok.',
    },
    'cups-seven': {
        upright: 'Postava stojí pred siedmimi pohármi vznášajúcimi sa v oblakoch, každý ukrýva inú víziu. Sedmička pohárov je možnosť: predstavivosť, fantázia, viac možností, než môže byť skutočných.',
        reversed: 'Obrátená, hmla sa rozplýva alebo zrúti. Voľba sa vynúti, ilúzia sa prehliadne alebo sa zachovajú všetky možnosti tým, že sa nevyberie žiadna. Vyber jednu a ostatné nechaj ísť.',
    },
    'cups-eight': {
        upright: 'Postava odchádza od ôsmich naskladaných pohárov k vzdialeným horám za svitu mesiaca. Osmička pohárov je úmyselný odchod: odísť od niečoho, čo už neuspokojuje.',
        reversed: 'Obrátená, odchod sa spochybňuje. Zdržiavanie, strach z odchodu alebo odchádzanie vždy, keď začne byť ťažko. Choď a nerozoberaj to do nekonečna, alebo ostaň s otvorenými očami.',
    },
    'cups-nine': {
        upright: 'Spokojná postava sedí pred oblúkom deviatich pohárov so založenými rukami. Deviatka pohárov je spokojnosť: splnené želania, radosť z toho, čo sa získalo.',
        reversed: 'Obrátená, pohodlie zatuchne. Samoľúbosť, rozmaznanie, uspokojenie, ktoré už od teba nič nežiada. Čo bolo želané, prišlo; užívaj si to a nič k tomu nepridávaj, ani nevyhľadávaj ďalšie.',
    },
    'cups-ten': {
        upright: 'Pár s dvoma deťmi stojí pod dúhou desiatich pohárov nad domovom. Desiatka pohárov je zdieľané naplnenie: rodina, patrenie, citová úplnosť, ktorá je spoločná viacerým ľuďom.',
        reversed: 'Obrátená, obraz je vyleštený. Súlad sa predvádza, napätie ostáva nevypovedané, domácnosť alebo skupina nežije celkom to, čo ukazuje navonok. Nechaj to byť takým dobrým, aké to je.',
    },
    'cups-page': {
        upright: 'Mladá postava drží pohár, z ktorého vykukuje ryba. Páža pohárov je nežná zvedavosť: intuícia, tvorivý nápad, citová správa, ktorá sa práve len vynára na povrch.',
        reversed: 'Obrátené, nápad sa zle číta. Nálada sa berie za posolstvo, city sú príliš krehké na držanie alebo sa nápad zadržiava. Všimni si ho skôr, než rozhodneš, čo znamená.',
    },
    'cups-knight': {
        upright: 'Rytier jazdí pomaly a podáva pohár, krajina okolo je pokojná. Rytier pohárov je romantika a ponuka: nežný prístup, idealizmus, návrh podaný s citom, nie silou.',
        reversed: 'Obrátený, gesto a podstata sa rozídu. Šarm bez nasledovania, náladovosť, sľub, ktorý ostal len gestom. Choď k tomu krokom a dôjdi až na miesto určenia.',
    },
    'cups-queen': {
        upright: 'Kráľovná sedí na tróne pri pobreží a hľadí na zatvorený, zdobený pohár. Kráľovná pohárov je hlboký cit, ktorý ostáva použiteľný: súcit, intuícia, citová vyrovnanosť.',
        reversed: 'Obrátená, voda pretečie. Pocity iných sa berú za vlastné, vkráda sa závislosť a srdce je zahltené. Cíť to a nestaň sa tým; cit ostane použiteľný, len ak má brehy.',
    },
    'cups-king': {
        upright: 'Kráľ sedí na tróne uprostred rozbúrenej vody, v jednej ruke pohár, v druhej žezlo. Kráľ pohárov je vyrovnanosť: cit pod vládou, múdrosť, pokoj v búrke.',
        reversed: 'Obrátený, pokoj ochladne alebo cit uniká. Kontrola, ktorá potláča, náladovosť skrytá za vyrovnanosťou. Zostaň vyrovnaný a nechladni; nechaj vodu hýbať sa.',
    },
    /* --------------------------------------------------------------- swords */
    'swords-ace': {
        upright: 'Ruka z oblaku zviera meč korunovaný vavrínovým vencom. Eso mečov je jasnosť: pomenovaná pravda, čisto prerezané rozhodnutie, schopnosť mysle oddeliť to, čo je skutočné.',
        reversed: 'Obrátené, rez mine. Jasnosť sa zakalí, slová vyjdú tupo alebo neskoro, alebo sa prereže niečo, čo netrebalo. Povedz pravdivú vec jasne, a nie ostrejšie, než je treba.',
    },
    'swords-two': {
        upright: 'Postava so zaviazanými očami drží v rovnováhe dva skrížené meče, za ňou pokojné more. Dvojka mečov je patová situácia: odložené rozhodnutie, rovnováha udržaná nepozeraním.',
        reversed: 'Obrátená, páska sa zošmykne. Pat sa láme, voľba sa vynúti alebo sa ukáže, čím vyhýbanie naozaj bolo. Najprv si zloži pásku z očí a potom rozhodni z toho, čo vidíš.',
    },
    'swords-three': {
        upright: 'Srdce prebodnuté tromi mečmi visí pod dažďovými mrakmi. Trojka mečov je zlomené srdce: zármutok, bolestná pravda, krivda povedaná priamo. Bolesť nezjemňuje; pomenúva ju, a od pomenovania sa začína hojenie.',
        reversed: 'Obrátená, rana sa uvoľní alebo znova otvorí. Pomalé zotavenie, odpustenie alebo bolesť udržiavaná popisovaním. Nechaj ju byť taká bolestivá, aká je, a nie viac.',
    },
    'swords-four': {
        upright: 'Rytier leží na hrobke so zloženými rukami, nad ním visia meče a jeden leží pod ním. Štvorka mečov je odpočinok: ústup, zotavenie, zastavenie ako práca.',
        reversed: 'Obrátená, odpočinok je skrátený alebo príliš dlhý. Nepokoj, vyhorenie, ústup, ktorý prekročil zotavenie. Zastav sa poriadne, nie len napoly, a nechaj zastavenie urobiť svoju prácu.',
    },
    'swords-five': {
        upright: 'Škľabiaca sa postava zbiera meče, kým dve ďalšie odchádzajú porazené. Päťka mečov je prázdna výhra: konflikt, vlastný záujem, víťazstvo, ktoré stálo celú miestnosť.',
        reversed: 'Obrátená, dôsledky vyplávajú na povrch. Ľútosť, potreba zmieriť sa alebo konflikt, ktorý sa vlečie dlho po vyhratom bode. Spočítaj, čo výhra naozaj stála.',
    },
    'swords-six': {
        upright: 'Prievozník tlačí tyčou čln s postavou v plášti a dieťaťom k pokojnejšej vode, šesť mečov stojí v prove. Šestka mečov je prechod: opustenie ťažkostí, pohyb k pokojnejšej zemi.',
        reversed: 'Obrátená, prechod je pomalý alebo uviazne. Batožina prenesená na druhú stranu, odchod ešte nie je možný, minulosť nespracovaná. Nechaj prechod trvať, kým trvá.',
    },
    'swords-seven': {
        upright: 'Postava na špičkách odchádza z tábora s piatimi mečmi a dva necháva za sebou. Sedmička mečov je nenápadnosť: stratégia, vyhýbanie, vziať si časť a obísť zvyšok.',
        reversed: 'Obrátená, plán sa rozpadá. Odhalenie, priznanie alebo obchádzka len preto, že priama cesta je ťažká. Pomenuj úprimne, čomu sa vyhýbaš, a rozhodni, či to stále stojí za to.',
    },
    'swords-eight': {
        upright: 'Zviazaná žena so zaviazanými očami stojí medzi ôsmimi mečmi, putá sú voľné. Osmička mečov je pocit uviaznutia: obmedzenie, ktoré je sčasti vnímané, myšlienka ako klietka.',
        reversed: 'Obrátená, putá sa uvoľňujú. Obmedzenie sa vidí jasne, začína sa oslobodenie alebo zostať v putách znamená vyhnúť sa pohľadu. Vyskúšaj, či putá naozaj držia.',
    },
    'swords-nine': {
        upright: 'Postava sedí v posteli s tvárou v dlaniach, na stene deväť mečov. Deviatka mečov je úzkosť: hodina najhoršieho scenára, nespavosť, hrôza o tretej ráno.',
        reversed: 'Obrátená, noc povoľuje. Strach sa vysloví nahlas, najhoršie sa preberá menej alebo úzkosť ostáva skrytá. Počkaj na ráno, skôr než uveríš tomu, čo povedala tretia hodina.',
    },
    'swords-ten': {
        upright: 'Postava leží tvárou nadol s desiatimi mečmi v chrbte, na obzore vychádza svitanie. Desiatka mečov je bolestný koniec: dno, dokončený záver, kým nový deň už vstáva.',
        reversed: 'Obrátená, koniec sa vlečie alebo sa dvíha. Zotavovanie je pomalé, púšťať sa odmieta, alebo najhoršie už pominulo. Všimni si, že obloha za postavou už svetlie.',
    },
    'swords-page': {
        upright: 'Mladá postava drží meč vzpriamene na vetrom ošľahanej pôde a pozorne sleduje okolie. Páža mečov je bdelosť: zvedavosť, rýchly dôvtip, ostrá myseľ, ktorá hľadá fakty.',
        reversed: 'Obrátené, bdelosť skysne. Zvedavosť sa mení na klebety, ostražitosť na podozrievavosť a dôvtip na ostré slová povedané príliš rýchlo. Myseľ je stále bystrá; žiada ostať ostrá bez krehkosti.',
    },
    'swords-knight': {
        upright: 'Rytier sa rúti do vetra s vztýčeným mečom a ohnuté stromy za ním. Rytier mečov je poháňaný intelekt: rýchle konanie, priamosť, ctižiadosť v zhone, myšlienka, ktorá chce byť pri cieli prvá.',
        reversed: 'Obrátený, útok preletí cieľ. Netrpezlivosť, netaktnosť, odpoveď dosiahnutá skôr, než sa vypočula otázka. Spomaľ natoľko, aby ti bolo rozumieť; bod je správny a potrebuje dopadnúť.',
    },
    'swords-queen': {
        upright: 'Kráľovná sedí v profile na vysokom tróne, jedna ruka zdvihnutá, meč vzpriamený. Kráľovná mečov je jasný zrak: nezávislosť, úprimnosť, vnímanie vydobyté ťažko.',
        reversed: 'Obrátená, jasný zrak ochladne alebo otupie. Tvrdosť, trpkosť, rez urobený skôr, než sa to pochopilo. Vnímanie je stále presné; žiada byť povedané natoľko láskavo, aby bolo počuť.',
    },
    'swords-king': {
        upright: 'Kráľ sedí na tróne tvárou dopredu, v ruke vzpriamený meč. Kráľ mečov je intelektuálna autorita: rozhodnutia podľa zásady, férovosť, pravda ako mierka.',
        reversed: 'Obrátený, pravidlo prevalcuje človeka. Strnulosť, chladný úsudok, autorita použitá bez milosrdenstva. Zásada môže byť správna; žiada rozhodnutie, ktoré je uznané za vlastné a urobené s ľuďmi na očiach.',
    },
    /* ------------------------------------------------------------ pentacles */
    'pentacles-ace': {
        upright: 'Ruka z oblaku ponúka zlatú mincu nad kvitnúcou záhradou a bránou v živom plote. Eso mincí je pevný začiatok: ponuka, zdroj, prvý kameň položený na niečom skutočnom.',
        reversed: 'Obrátené, ponuka je zle odvážená alebo sa vymkne. Príležitosť sa berie za hotovú vec alebo začiatku chýba opora. Začni, kým je pôda pod nohami, a ostatné sa k tomu pridá.',
    },
    'pentacles-two': {
        upright: 'Postava žongluje s dvoma mincami spojenými slučkou nekonečna, za ňou sa na vlnách hompáľajú lode. Dvojka mincí je rovnováha v pohybe: prispôsobivosť, držať dve veci naraz.',
        reversed: 'Obrátená, žonglovanie sa kláti. Vo vzduchu je príliš veľa vecí, priority sa kĺžu a jeden záväzok navyše začína stáť ostatné. Udrž obe v pokojnejšom rytme, alebo si vyber, ktorú položíš.',
    },
    'pentacles-three': {
        upright: 'Remeselník pracuje v katedrále, kým dvaja pozorovatelia kontrolujú plány. Trojka mincí je spolupráca: zručná práca, tímová práca, plán premenený na skutočnosť s inými.',
        reversed: 'Obrátená, tím sa trepí. Zladenosť sa láme, štandardy sa nesplnia alebo sa na prácu čaká namiesto toho, aby sa robila. Plán je stále dobrý; začni časťou, ktorú máš urobiť dobre ty.',
    },
    'pentacles-four': {
        upright: 'Postava drží jednu mincu pri hrudi, jednu na hlave a dve pod nohami. Štvorka mincí je pevné držanie: istota, kontrola, ochrana toho, čo je tvoje, a nechuť to pustiť.',
        reversed: 'Obrátená, zovretie povolí alebo stuhne. Buď sa po dlhom držaní vráti štedrosť, alebo majetníčkosť zatvorí dvere všetkému novému. Skontroluj, čo zovretie stojí a čo chráni.',
    },
    'pentacles-five': {
        upright: 'Dve postavy v snehu prechádzajú popri osvetlenom okne kostola, zhrbené a obviazané. Päťka mincí je núdza: nedostatok, izolácia, pomoc nablízku a nepovšimnutá.',
        reversed: 'Obrátená, núdza sa zmierňuje alebo sa skrýva. Zotavenie môže začínať, alebo nedostatok len ostáva nevypovedaný a neviditeľný. Pomoc, ktorá bola vždy nablízku, je teraz bližšie: pozri hore a spýtaj sa.',
    },
    'pentacles-six': {
        upright: 'Obchodník váži mince na váhach a dáva dvom kľačiacim postavám. Šestka mincí je dávanie a prijímanie: štedrosť, férovosť, výmena, ktorá nesie aj moc a pýta sa, kto komu dáva a prečo.',
        reversed: 'Obrátená, váhy sa nakláňajú. Dar so sebou nesie podmienky, dlh ostáva nevypovedaný, dávanie kupuje pozíciu namiesto toho, aby napĺňalo potrebu. Všimni si, kto drží váhy.',
    },
    'pentacles-seven': {
        upright: 'Roľník sa opiera o motyku a pozerá na ker obsypaný siedmimi mincami. Sedmička mincí je pauza na zhodnotenie: trpezlivosť, investícia, posúdenie rastu skôr, než sa vynaloží viac.',
        reversed: 'Obrátená, trpezlivosť sa tenčí. Netrpezlivosť, úsilie, ktoré nenesie ovocie, chuť vykopať rastlinu, aby sa zistilo, či rastie. Rast trvá, kým trvá; nechaj ho dokončiť.',
    },
    'pentacles-eight': {
        upright: 'Remeselník vyrezáva mince za lavicou, šesť hotových, jedna v ruke. Osmička mincí je usilovnosť: zručnosť budovaná opakovaním, práca dobre urobená pre ňu samu.',
        reversed: 'Obrátená, remeslo sa kazí. Perfekcionizmus, opakovanie bez pokroku, vyleštená časť, ktorú nikto nepotreboval. Pracuj ďalej bez pozerania na koniec a nechaj dobré dokončiť sa.',
    },
    'pentacles-nine': {
        upright: 'Žena v krásnej záhrade drží sokola, na viniči ťažké strapce. Deviatka mincí je zaslúžená pohoda: nezávislosť, vytrieznenosť, radosť z toho, čo práca vybudovala.',
        reversed: 'Obrátená, pohodlie je prázdne alebo strážené. Sebestačnosť stvrdne na izoláciu, radosť sa užíva osamote a trápi nepokoj, či sa to dá udržať. Dovoľ si to mať.',
    },
    'pentacles-ten': {
        upright: 'Starší muž sedí s rodinou pred klenbou, psy pri nohách, mince votkané do stavby. Desiatka mincí je odkaz: trvalé bohatstvo, rodina, niečo postavené, aby to prežilo staviteľa.',
        reversed: 'Obrátená, stavba sa viac stráži, než obýva. Zdedená ťarcha, rodinné napätie okolo zdrojov, inštitúcia, ktorá zabúda na svojich ľudí. Postav tú časť, ktorá ostáva.',
    },
    'pentacles-page': {
        upright: 'Mladá postava skúma jedinú mincu držanú v ruke na zelenom poli. Páža mincí je trpezlivosť študenta: praktická zvedavosť, učiť sa pomaly a poriadne, krok za krokom.',
        reversed: 'Obrátené, štúdium sa zastaví. Plány sa robia a nezačnú sa, cvičenie sa odkladá a zručnosť ostáva v poličke. Trpezlivosť tu je; potrebuje malý, určitý krok, od ktorého sa dá odraziť.',
    },
    'pentacles-knight': {
        upright: 'Rytier sedí na nehybnom, ťažkom koni na zoranom poli a drží mincu. Rytier mincí je vytrvalosť: spoľahlivosť, rutina, dokončiť vec tým, že sa nezastaví.',
        reversed: 'Obrátený, tempo sa zastaví. Nuda, tvrdohlavé opakovanie, rutina, ktorá prežila svoje využitie. Pokračuj týmto tempom, ak ešte slúži, alebo zmeň trasu, skôr než sa pole zorie mimo sezóny.',
    },
    'pentacles-queen': {
        upright: 'Kráľovná sedí v prekvitajúcej záhrade, hýčká mincu, pri nohách jej sedí zajac. Kráľovná mincí je praktická starostlivosť: opatera, vynaliezavosť, pohodlie premenené na skutočnosť.',
        reversed: 'Obrátená, starostlivosť je jednostranná. Všetci sú opatrení okrem toho, kto sa stará, a praktickosť sa zvrhne na obavy o hmotné veci. Opatruj pôdu, na ktorej stojíš.',
    },
    'pentacles-king': {
        upright: 'Kráľ v rúchu z hrozna sedí na tróne vyrezávanom bykmi, v ruke minca. Kráľ mincí je hmotné majstrovstvo: blahobyt vybudovaný a dobre využitý, spoľahlivá štedrosť.',
        reversed: 'Obrátený, prostriedky sa stanú mierkou. Vkráda sa chamtivosť či tvrdohlavosť a všetko, vrátane ľudí, sa posudzuje podľa úrody. Majstrovstvo je skutočné; žiada, aby slúžilo tomu, na čo bolo vybudované.',
    },
};
