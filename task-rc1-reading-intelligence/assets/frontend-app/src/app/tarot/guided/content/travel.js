/**
 * TRAVEL & NEW EXPERIENCES - going toward the unfamiliar and what it leaves behind.
 *
 * This area owns curiosity, leaving the known, openness, preparation, uncertainty and what an experience teaches. It does not
 * own a change of dwelling (Home & Moving), a general crossing from one chapter to another (Life changes) or the inner life apart
 * from an experience (Personal growth). It gives no safety, medical, visa, booking or money advice: the next step it names is small,
 * ordinary and the person's own.
 *
 * The stage and stance tables are shared by all four intentions (what draws a person, uncertainty about the unknown, preparing,
 * what an experience teaches), so they describe textures of the unfamiliar and presuppose no particular trip. What belongs to one
 * intention lives in the `frame` of its places.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    stage: {
        'sets-something-beginning': [
            t('A beginning toward the unfamiliar often shows first as a small pull, before any plan exists: a place name that lingers, a map left open on a table, a wish to hear a language not one’s own.', 'Začiatok smerom k neznámemu sa často ukáže najprv ako nenápadná príťažlivosť ešte pred akýmkoľvek plánom: názov miesta, ktorý sa vracia, rozložená mapa na stole, túžba počuť cudziu reč.'),
            t('Something new tends to start as curiosity without a destination: a question about how people live elsewhere, or an itch to do one thing for the very first time.', 'Nové sa zvykne začínať ako zvedavosť bez cieľa: otázka, ako žijú ľudia inde, alebo chuť urobiť jednu vec úplne prvýkrát.'),
        ],
        'sustains-an-effort': [
            t('Much of an unfamiliar experience is carried by small repeated acts: reading signs that are not yet familiar, asking once more, finding the next place to sit down.', 'Veľkú časť neznámej skúsenosti nesú drobné opakované úkony: lúštenie ešte nezvyčajných značiek, ďalšia otázka, hľadanie miesta, kde si sadnúť.'),
            t('Patience holds up the unfamiliar more often than thrill does: the tenth tired hour, the third attempt at a phrase, the habit of looking around once more.', 'Neznáme drží častejšie trpezlivosť než vzrušenie: desiata unavená hodina, tretí pokus o vetu, zvyk poobzerať sa ešte raz.'),
        ],
        'holds-still': [
            t('Stillness near the unfamiliar can be a quiet hour at a table where everything is new and nothing has happened yet, and everything is simply taken in.', 'Pokoj popri neznámom môže byť tichá hodina pri stole, kde je všetko nové a nič sa ešte nestalo, a všetko sa len vstrebáva.'),
            t('Holding still before something new can be a deliberate pause to study the map, or a waiting that has quietly turned into a habit of not starting.', 'Zastavenie pred niečím novým môže byť zámerná pauza na štúdium mapy, alebo čakanie, ktoré sa potichu zmenilo na zvyk nezačínať.'),
        ],
        'stands-at-full-extent': [
            t('When an experience of the new is at its widest, the language is all around, the senses are busy and the distance from the familiar is at its greatest.', 'Keď je zážitok z nového najširší, jazyk je všade naokolo, zmysly sú zaneprázdnené a odstup od známeho je najväčší.'),
            t('Being fully inside something new has its own weight: wonder and tiredness arrive together, and no familiar corner is near enough to step back into.', 'Byť celý v niečom novom má svoju váhu: úžas a únava prichádzajú spolu a žiadny známy kút nie je dosť blízko, aby sa doň dalo ustúpiť.'),
        ],
        'is-mid-transition': [
            t('Between the familiar and the first morning of something new, old routines have loosened and new ones have not formed, which can feel exciting and disorienting at once.', 'Medzi známym a prvým ránom v niečom novom sa staré zvyky uvoľnili a nové sa ešte nevytvorili, čo môže byť naraz vzrušujúce aj dezorientujúce.'),
            t('In the middle of a crossing the matter is neither the leaving nor yet the return; the in-between is made of waiting rooms, borrowed words and unfamiliar light.', 'Uprostred prechodu nejde už o odchod a ešte nie o návrat; medzidobie sa skladá z čakární, požičaných slov a nezvyčajného svetla.'),
        ],
        'is-being-broken-into': [
            t('When the unexpected breaks into an experience (a missed connection, a wrong turn, a sentence nobody understands), it shows how much was being held up by expectation.', 'Keď do zážitku vtrhne nečakané (zmeškaný spoj, zlá odbočka, veta, ktorej nikto nerozumie), ukáže, koľko sa držalo len na očakávaní.'),
            t('A jolt in unfamiliar surroundings tends to strip things down to what is actually needed: a clear head, a little patience, someone who stops to help.', 'Náraz v neznámom prostredí zvykne zredukovať veci na to potrebné: jasnú hlavu, trochu trpezlivosti, niekoho, kto sa zastaví a pomôže.'),
        ],
        'is-letting-go': [
            t('Letting go in this area can mean setting down the itinerary held in the head: the picture of how a place should feel, the wish to see everything, the fear of missing something.', 'Pustiť tu môže znamenať odložiť plán držaný v hlave: obraz toho, aký má byť pocit z miesta, túžbu vidieť všetko, strach z toho, že niečo unikne.'),
            t('Some of what is left behind on the way is weight: the old routine, the need to be in control, the habit of comparing everything with home.', 'Časť toho, čo sa na ceste necháva za sebou, je záťaž: starý poriadok dňa, potreba mať všetko pod kontrolou, zvyk porovnávať všetko s domovom.'),
        ],
        'is-coming-together': [
            t('When an experience comes together, its pieces begin to connect (a street, a taste, a few words, a stranger’s kindness) until the unfamiliar becomes something that can be read.', 'Keď sa zážitok spája, jeho kúsky začnú do seba zapadať (ulica, chuť, pár slov, láskavosť neznámeho človeka), až sa neznáme začne dať čítať.'),
            t('Near the close of an experience, what was seen, tasted and learned starts to fit into one account that could actually be told.', 'Ku koncu zážitku sa to, čo sa videlo, ochutnalo a naučilo, začína skladať do jedného príbehu, ktorý by sa dal skutočne rozprávať.'),
        ],
    },
    stance: {
        continue: [
            t('Continuing tends to look like the same curiosity carried on at an unhurried pace, with attention staying on what is directly in front of it.', 'Pokračovanie zvykne vyzerať ako tá istá zvedavosť nesená ďalej nenáhlivým tempom, s pozornosťou pri tom, čo je priamo pred ňou.'),
            t('Staying with a direction already taken can be as plain as one more day of looking and one more conversation without a plan.', 'Ostať pri smere, ktorým sa už išlo, môže byť také obyčajné ako ešte jeden deň pozerania a ešte jeden rozhovor bez plánu.'),
        ],
        redirect: [
            t('A change of route is what is asked here, not a change of wish: the same curiosity pointed at another street, another season, another way of arriving.', 'Žiada sa tu zmena trasy, nie túžby: tá istá zvedavosť namierená na inú ulicu, iné obdobie, iný spôsob príchodu.'),
            t('What drew a person in can often be found by a different path than the one drawn on the first map.', 'To, čo človeka pritiahlo, sa dá často nájsť inou cestou, než je tá nakreslená na prvej mape.'),
        ],
        'let-go': [
            t('Something is asked to be set down at the door: the need for everything to go to plan, the picture of how it ought to feel, the comparison with other people’s photographs.', 'Niečo sa žiada odložiť pri dverách: potrebu, aby všetko išlo podľa plánu, obraz toho, aké to má byť, porovnávanie s cudzími fotografiami.'),
            t('Lightening the luggage can mean less checking, fewer expectations and room for an afternoon with no purpose.', 'Odľahčiť batožinu môže znamenať menej kontrolovania, menej očakávaní a priestor na popoludnie bez účelu.'),
        ],
        moderate: [
            t('Keeping a human pace tends to mean fewer places, longer looks and some space between one thing seen and the next.', 'Udržať ľudské tempo zvykne znamenať menej miest, dlhšie pohľady a trochu priestoru medzi jednou videnou vecou a ďalšou.'),
            t('Appetite for the new has a measure: enough to feel the edge of the familiar, not so much that nothing can be absorbed.', 'Chuť na nové má svoju mieru: dosť na to, aby bolo cítiť okraj známeho, nie však toľko, aby sa nedalo nič vstrebať.'),
        ],
        'meet-it': [
            t('Facing the unfamiliar directly tends to look like going in with what one has: a few words, a question, and the willingness to be a beginner.', 'Priamo čeliť neznámemu zvykne vyzerať ako vojsť dnu s tým, čo človek má: s pár slovami, s otázkou a ochotou byť začiatočníkom.'),
            t('Meeting it can mean walking into the room, the street or the conversation that feels foreign, without tidying it into a familiar shape.', 'Stretnúť to môže znamenať vojsť do miestnosti, ulice či rozhovoru, ktoré pôsobia cudzo, a neupravovať ich do známej podoby.'),
        ],
        wait: [
            t('Not every door of this kind opens on schedule; waiting can be a place where readiness grows at its own pace and where it shows what is done with the wait.', 'Nie každé dvere tohto druhu sa otvárajú podľa rozvrhu; čakanie môže byť miestom, kde pripravenosť dozrieva vlastným tempom a kde je vidieť, čo sa s čakaním robí.'),
            t('Waiting before a first step is not idleness: it can be a time of gathering curiosity, looking at maps and letting a wish settle.', 'Čakanie pred prvým krokom nie je nečinnosť: môže byť časom zbierania zvedavosti, pozerania do máp a usadzovania túžby.'),
        ],
        choose: [
            t('Here the matter is which pull to follow, a knowing choice between familiar comfort and an unfamiliar invitation.', 'Ide tu o to, ktorú túžbu nasledovať: o vedomú voľbu medzi známym pohodlím a neznámym pozvaním.'),
            t('The choice is often less about a destination than about what kind of experience is worth wanting: ease, depth, surprise or rest.', 'Voľba býva menej o cieli než o tom, aký druh zážitku stojí za to chcieť: ľahkosť, hĺbku, prekvapenie či oddych.'),
        ],
        integrate: [
            t('Integration looks like carrying an experience into ordinary days in a form that fits them: what was seen, what was felt, what quietly changed.', 'Zjednotenie vyzerá ako prenesenie zážitku do obyčajných dní v podobe, ktorá sa do nich hodí: čo sa videlo, čo sa cítilo, čo sa potichu zmenilo.'),
            t('It begins when the adventurous side and the careful side stop arguing and work together: one hand on the map, one on the bag.', 'Začína, keď sa dobrodružná a opatrná stránka prestanú hádať a spolupracujú: jedna ruka na mape, druhá na taške.'),
        ],
        'attend-to-it': [
            t('Something here asks for attention rather than a plan: what pulls, what unsettles and what keeps drawing the eye.', 'Niečo tu žiada pozornosť, nie plán: čo priťahuje, čo znepokojuje a čo stále púta pohľad.'),
            t('Noticing comes first: where curiosity rises, and where something tightens at the thought of the unfamiliar.', 'Najprv prichádza všímanie si: kde sa dvíha zvedavosť a kde sa pri myšlienke na neznáme niečo stiahne.'),
        ],
    },
    trend: {
        expanding: t('An outward pull of this kind favours breadth: openness to surprise and a taste for the unfamiliar, while what can be absorbed at once is easily left out of view.', 'Sklon smerom von sa prikláňa k šírke: k otvorenosti voči prekvapeniu a chuti na neznáme, kým to, koľko sa dá vstrebať naraz, ľahko ostáva mimo pozornosti.'),
        contracting: t('A narrowing pull favours nearness: the known table, the familiar road, a smaller radius, at the cost of whatever lies beyond it.', 'Keď sa to zužuje, dáva to prednosť blízkosti: známemu stolu, obvyklej ceste, menšiemu okruhu, na úkor všetkého, čo leží za ním.'),
        stabilising: t('Where the pull is toward steadiness, footing in the new is what counts: routines that make an unfamiliar place workable, with less appetite for what is still unmapped.', 'Ak to smeruje k pevnosti, záleží na opore v novom: na zvykoch, vďaka ktorým je neznáme miesto zvládnuteľné, pričom chuť na ešte nezmapované je menšia.'),
        disrupting: t('A shaking pull has the quality of a plan being tested by something unlooked for, and it leaves open what comes to light in the testing.', 'Otriasanie má povahu plánu skúšaného niečím nečakaným a necháva otvorené, čo sa pri tej skúške ukáže.'),
        redirecting: t('A bending pull keeps curiosity steady while the destination changes, favouring another place to land over the one first pictured.', 'Pri ohýbaní smeru zvedavosť ostáva stála, kým sa mení cieľ, a hľadá iné miesto pristátia než to, ktoré sa predstavovalo najprv.'),
        resolving: t('In a pull toward completion the quality is of a question about the unfamiliar settling and an account taking shape, though how whole it feels is open.', 'Pri smerovaní k dokončeniu ide o to, že sa otázka o neznámom usadzuje a vzniká príbeh, hoci to, nakoľko je celistvý, ostáva otvorené.'),
        suspended: t('A suspended pull favours the threshold: the wish present, the road not yet taken, and a stillness in which things stay open.', 'Zavesenie robí miesto pre prah: túžba je prítomná, cesta ešte nie je nastúpená a ticho necháva veci otvorené.'),
    },
    strained: {
        stage: {
            'sets-something-beginning': t('A beginning under strain tends to start tangled: the wish is real, yet it arrives together with the worry, and neither is easy to separate from the other.', 'Začiatok v napätí sa zvykne zamotať: túžba je skutočná, no prichádza spolu s obavou a jedno sa od druhého ťažko oddeľuje.'),
            'sustains-an-effort': t('Sustained effort under strain tends to feel like tiredness of the unfamiliar: signs still unreadable, a phrase still failing, patience wearing thin without being gone.', 'Pretrvávajúca námaha, keď to ide ťažko, zvykne pôsobiť ako únava z neznámeho: značky sú stále nečitateľné, veta sa stále nedarí a trpezlivosť sa tenčí, hoci ešte nie je preč.'),
            'holds-still': t('Stillness under strain can turn from a pause into a stall: the map stays open, the wish stays alive, and not starting becomes the easiest position to hold.', 'Pokoj v napätí sa môže zmeniť z pauzy na uviaznutie: mapa zostáva rozložená, túžba žije ďalej a nezačínať sa stáva najľahšou polohou.'),
            'stands-at-full-extent': t('Being at full extent under strain can mean too much newness at once: senses overfull, tiredness louder than wonder, and no familiar corner to rest in.', 'Plný rozsah pri záťaži môže znamenať priveľa nového naraz: zmysly preplnené, únavu hlasnejšiu než úžas a žiadny známy kút, v ktorom si oddýchnuť.'),
            'is-mid-transition': t('A crossing under strain can feel like having left the old ground without yet standing on any other: routines gone, words borrowed, a longing for something firm underfoot.', 'Prechod, ktorý ide ťažko, môže pripomínať stav, keď sa stará pôda už opustila a na žiadnej inej sa ešte nestojí: zvyky preč, slová požičané a túžba po niečom pevnom pod nohami.'),
            'is-being-broken-into': t('When the unexpected breaks in hard, it can shake confidence in one’s own bearings: the plan gone, the language failing, the sense of being a beginner suddenly sharp.', 'Keď nečakané vtrhne tvrdo, môže otriasť dôverou vo vlastnú orientáciu: plán je preč, jazyk zlyháva a pocit začiatočníka je zrazu ostrý.'),
            'is-letting-go': t('Letting go under strain tends to be reluctant: the itinerary in the head, the need to be sure or the picture of how it should feel is gripped harder just as it stops fitting.', 'Púšťanie v napätí býva neochotné: plán v hlave, potreba istoty či obraz toho, aké to má byť, sa zvierajú ešte pevnejšie práve vtedy, keď prestávajú sedieť.'),
            'is-coming-together': t('Coming together under strain can stay partial: some pieces of the experience connect while others hang loose, and the account that forms does not yet ring true.', 'Spájanie pri záťaži môže ostať len čiastočné: niektoré kúsky zážitku do seba zapadajú, iné visia voľne a príbeh, ktorý vzniká, ešte neznie pravdivo.'),
        },
        stance: {
            continue: t('Continuing under strain can be a habit of pressing on that has stopped looking around: the pace stays the same although tiredness or doubt is asking to be noticed.', 'Pokračovanie v napätí môže byť zvyk ísť ďalej, ktorý sa prestal obzerať: tempo ostáva rovnaké, hoci únava či pochybnosť žiadajú povšimnutie.'),
            redirect: t('A forced change of route can feel like the loss of the original wish, though the wish itself may be asking only for another form.', 'Vynútená zmena trasy môže pôsobiť ako strata pôvodnej túžby, hoci tá sama možno žiada len inú podobu.'),
            'let-go': t('Letting go that is forced or resisted tends to sound like grief for the imagined version: the picture of how it should have been, held on to after the real thing has moved elsewhere.', 'Púšťanie, ktoré je vynútené alebo odpierané, znie ako smútok za predstavenou verziou: za obrazom toho, aké to malo byť, držaným aj po tom, čo skutočnosť išla inam.'),
            moderate: t('Moderation under strain can harden into too little: so careful about taking in the new that nothing enters, or so rushed that nothing is absorbed.', 'Miernosť pri záťaži môže stvrdnúť na príliš málo: taká opatrnosť pri prijímaní nového, že dnu nič nevchádza, alebo taký chvat, že sa nič nestíha vstrebať.'),
            'meet-it': t('Meeting the unfamiliar under strain can mean going in with clenched resolve: facing it, yes, but braced so tightly that little of it can actually be seen.', 'Stretnutie s neznámym v napätí môže byť vstup so zaťatým odhodlaním: čelí sa mu, ale tak napäto, že z neho možno vidieť len máločo.'),
            wait: t('Waiting under strain can curdle from patience into avoidance: the pause stretches, and it grows harder to tell what it protects from what it merely postpones.', 'Čakanie, keď to ide ťažko, sa môže z trpezlivosti zvrhnúť na vyhýbanie: pauza sa naťahuje a ťažšie je rozoznať, čo chráni a čo len odkladá.'),
            choose: t('Choosing under strain tends to feel like losing one pull to keep the other, each option looking like the price of the other.', 'Voľba v napätí sa zvykne cítiť ako strata jednej túžby kvôli druhej, pričom každá možnosť vyzerá ako cena tej druhej.'),
            integrate: t('Integration under strain can feel like holding two selves in one bag: the adventurous side and the careful side each insisting on being the one in charge.', 'Zjednotenie pri záťaži môže pripomínať dve osobnosti v jednej taške: dobrodružná aj opatrná stránka trvajú na tom, že velí práve ona.'),
            'attend-to-it': t('Attention under strain can slide into scanning for what might fail: the tightening is noticed more than the pull, until the unfamiliar looks mostly like a list of worries.', 'Pozornosť v napätí sa môže zvrhnúť na hľadanie toho, čo by mohlo zlyhať: všíma sa viac stiahnutie než samotná príťažlivosť, až neznáme vyzerá hlavne ako zoznam obáv.'),
        },
        trend: {
            expanding: t('An outward pull under strain tends to overreach: the wish to take in everything leaves little room for tiredness, for absorbing, or for any single thing to be properly seen.', 'Smerovanie von sa v napätí zvykne preháňať: túžba prijať všetko necháva málo miesta pre únavu, pre vstrebanie či pre to, aby sa jedna vec videla poriadne.'),
            contracting: t('A pull toward the known under strain tends to narrow past comfort: the radius shrinks until even a small departure feels like a great effort.', 'Sklon k známemu sa pri záťaži zužuje za hranicu pohodlia: okruh sa zmenšuje, až aj drobné vybočenie pôsobí ako veľká námaha.'),
            stabilising: t('A pull toward steadiness under strain tends to stiffen: routine is held so firmly that the unfamiliar has no way in, and comfort starts to cost curiosity.', 'Smerovanie k pevnosti, keď to ide ťažko, tuhne: poriadok sa drží tak pevne, že neznáme nemá ako dnu, a pohodlie začína stáť zvedavosť.'),
            disrupting: t('A shaking pull under strain can leave the plan in pieces and the sense of direction briefly unreadable, with the map useful only as a record of what was hoped for.', 'Otriasanie v napätí môže nechať plán v kusoch a smer na chvíľu nečitateľný, s mapou užitočnou len ako záznam toho, v čo sa dúfalo.'),
            redirecting: t('A pull that bends under strain can feel like the right place slipping away, the new direction felt first as a loss rather than as a possibility.', 'Smer, ktorý sa pri záťaži ohýba, môže pôsobiť ako únik správneho miesta, pričom nový smer sa cíti najprv ako strata a nie ako možnosť.'),
            resolving: t('A pull toward closing under strain tends to run too fast or leave a thread hanging: the experience ends before it has been taken in, or without a clear sense of what it was.', 'Smerovanie k uzavretiu v napätí býva príliš rýchle, alebo necháva niť visieť: zážitok sa končí skôr, než sa stihol vstrebať, alebo bez jasného pocitu, čím bol.'),
            suspended: t('A suspended pull under strain tends to wear on the wish itself: the threshold stays, but standing at it begins to feel heavier than crossing or turning back.', 'Zavesenie pri záťaži opotrebúva samotnú túžbu: prah ostáva, no stáť na ňom začína byť ťažšie než prejsť alebo sa vrátiť.'),
        },
    },
    arc: {
        continuation: t('The three cards describe an exploration continuing along a line already begun, the same curiosity carried further rather than turned aside.', 'Tri karty opisujú objavovanie, ktoré pokračuje po línii, ktorá už začala: tá istá zvedavosť je nesená ďalej, nie odklonená.'),
        escalation: t('In order, the cards show the pull toward the unfamiliar sharpening, each step reaching further from the known than the one before.', 'V poradí karty ukazujú, ako sa príťažlivosť neznámeho zostruje a každý krok siaha od známeho ďalej než ten predchádzajúci.'),
        interruption: t('Something cuts across the usual route, and the sequence is about what that detour makes visible.', 'Niečo pretína obvyklú trasu a celé poradie je o tom, čo táto odbočka robí viditeľným.'),
        'breakdown-to-recovery': t('The sequence can move from a stumble on the way (lost, tired, out of depth) toward finding footing again, the stumble left as something to learn from.', 'Poradie sa môže posúvať od zakopnutia na ceste (stratenosť, únava, pocit, že to presahuje sily) k opätovnému nájdeniu opory, pričom zakopnutie ostáva ako niečo, z čoho sa dá učiť.'),
        'expansion-to-limit': t('The horizon widens and then meets an edge, which raises the question of what that edge says about how much newness can be taken in at once.', 'Obzor sa rozširuje a potom naráža na okraj, čo otvára otázku, čo tento okraj hovorí o tom, koľko nového sa dá prijať naraz.'),
        'stasis-to-movement': t('From a long wish that stayed on the map, the sequence can move toward something beginning to stir: a first step, however small.', 'Z dlhej túžby, ktorá zostávala na mape, sa poradie môže posunúť k niečomu, čo sa začína hýbať: k prvému kroku, hoci malému.'),
        'conflict-to-integration': t('Appetite for adventure and need for the familiar open the sequence, and it can end nearer a workable whole: neither silenced, each given a place.', 'Chuť na dobrodružstvo a potreba známeho otvárajú poradie a to sa môže končiť bližšie k použiteľnému celku: ani jedno nie je umlčané, každé dostáva svoje miesto.'),
        'opening-to-choice': t('An opening toward the unfamiliar leads to a point where deciding which kind of experience to follow is hard to avoid.', 'Otvorenie smerom k neznámemu vedie k bodu, kde sa ťažko obchádza otázka, aký druh zážitku nasledovať.'),
        'holding-to-release': t('What was held tightly (the itinerary, the need to be sure) can loosen toward the end, like a hand opening around a map.', 'To, čo sa držalo pevne (plán, potreba istoty), sa môže ku koncu uvoľňovať ako dlaň, ktorá púšťa mapu.'),
        'uncertainty-to-clarity': t('Not knowing what lies beyond the border can give way, bit by bit, to something that can be seen and named.', 'Nevedomosť o tom, čo je za hranicou, môže po troche ustupovať niečomu, čo sa dá vidieť a pomenovať.'),
        'stability-to-disruption': t('A comfortable routine is shaken by something unfamiliar, and the sequence asks what the comfort had been keeping out of reach.', 'Pohodlný poriadok dňa je otrasený niečím neznámym a poradie sa pýta, čo pohodlie držalo mimo dosahu.'),
        redirection: t('The line of exploration bends: it does not stop, but it no longer points to the place first imagined.', 'Línia objavovania sa ohýba: nezastavuje sa, ale už nemieri k miestu, ktoré sa najprv predstavovalo.'),
    },
    alignment: {
        aligned: t('The two sides lean the same way: wanting and wariness agree, and attention is free for how to meet the unfamiliar.', 'Obe strany sa nakláňajú rovnakým smerom: túžba a opatrnosť sa zhodujú a pozornosť je voľná na to, ako sa s neznámym stretnúť.'),
        complementary: t('The two sides differ but fit: one supplies the appetite for the unfamiliar, the other the care that makes it workable.', 'Obe strany sa líšia, ale zapadajú do seba: jedna dodáva chuť na neznáme, druhá starostlivosť, vďaka ktorej je to zvládnuteľné.'),
        opposed: t('The two sides pull against each other, as an urge to go and a wish to stay can, and the card between them shows what that pull has to pass through.', 'Obe strany idú proti sebe, tak ako nutkanie ísť a túžba zostať, a karta medzi nimi ukazuje, cez čo toto napätie musí prejsť.'),
        apart: t('The two sides seem to look at different horizons altogether, so what connects them may first need a shared point of reference, such as a name for what is really wanted.', 'Zdá sa, že obe strany hľadia na úplne iné obzory, takže to, čo ich spája, môže najprv potrebovať spoločný orientačný bod, napríklad pomenovanie toho, čo sa naozaj chce.'),
    },
    suit: {
        wands: t('Wands bring appetite and movement to exploring: the urge to set out, adventurous initiative and the spark of wanting to see for oneself.', 'Palice prinášajú do objavovania chuť a pohyb: nutkanie vyraziť, dobrodružnú iniciatívu a iskru túžby vidieť na vlastné oči.'),
        cups: t('Cups carry the feeling in an experience: wonder, longing, homesickness, and the people who make a place feel kind.', 'Poháre nesú cit v zážitku: úžas, túžbu, stesk po domove a ľudí, vďaka ktorým pôsobí miesto láskavo.'),
        swords: t('Swords speak of thinking and language on unfamiliar ground: reading signs, asking questions, making sense of what is strange.', 'Meče hovoria o myslení a jazyku na neznámej pôde: o čítaní značiek, kladení otázok a snahe pochopiť to, čo je cudzie.'),
        pentacles: t('Pentacles ground exploring in the practical: luggage, time, the body’s tiredness and the small arrangements that make an experience possible.', 'Mince zakotvujú objavovanie v praktickom: v batožine, čase, únave tela a drobných prípravách, vďaka ktorým je zážitok možný.'),
    },
    weighing: t('Between the pull outward and the pull to stay near the known, one rarely wins outright; they settle when each is heard, the curiosity and the caution alike.', 'Medzi túžbou ísť von a túžbou zostať pri známom málokedy jeden jednoducho zvíťazí; usadia sa, keď je vypočutá zvedavosť aj opatrnosť.'),
    layers: t('An experience of the unfamiliar rests on three things at once: what is practically arranged, what is thought and felt about it, and what it means underneath. It tends to be fuller when none is left out.', 'Skúsenosť s neznámym stojí na troch veciach naraz: na tom, čo je prakticky pripravené, čo sa o tom myslí a cíti a čo to znamená v hĺbke. Býva plnšia, keď žiadna nechýba.'),
    majorWeight: t('Major cards in the lead suggest a theme that matters more than a passing taste of the new.', 'Keď trojicu vedú Veľké arkány, ide o viac než o letmú príchuť nového: dotýka sa to niečoho trvalého v tom, ako sa stretáva neznáme a čo sa v tom stretnutí smie zmeniť.'),
};
const draw = {
    id: 'travel-experiences.draw',
    areaId: 'travel-experiences',
    label: t('Understand what draws me toward exploration', 'Pochopiť, čo ma priťahuje k objavovaniu'),
    focus: t('Hold in mind a place, a kind of experience or simply a pull you keep noticing.', 'Maj na mysli miesto, druh zážitku alebo len príťažlivosť, ktorú si stále všímaš.'),
    semantics: {
        explores: t('what draws you toward the unfamiliar and what may sit just outside view', 'to, čo ťa priťahuje k neznámemu a čo môže zostávať tesne mimo zorného poľa'),
        reflection: 'notice',
        practical: 'name',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'legal-claim', 'financial-advice'],
    },
    spreadId: 'blind-spot-view',
    category: 'general-reflection',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What you can already see', 'Čo už vidíš'),
            ask: t('What you already notice about this pull: the images, places or moments that keep returning.', 'Čo už na tejto príťažlivosti vnímaš: obrazy, miesta či okamihy, ktoré sa stále vracajú.'),
            frame: {
                steady: t('Part of the pull is already clear: images, places or moments that return, and the plain appeal they carry.', 'Tu ide zvyčajne o tú časť príťažlivosti, ktorá je už jasná: obrazy, miesta či okamihy, ktoré sa vracajú, a jednoduché čaro, ktoré nesú.'),
                strained: t('Under strain, the pull is noticed but half-dismissed: clear enough to unsettle, not clear enough to be named.', 'Pod tlakom tu zvykne ležať príťažlivosť, ktorú si človek všimol, no napoly odmieta: dosť jasná na to, aby znepokojovala, nie na to, aby sa dala pomenovať.'),
            } },
        { label: t('What may sit outside view', 'Čo môže byť mimo zorného poľa'),
            ask: t('A possibility, held as a question rather than a finding, about what stands behind the pull and is not yet in view.', 'Možnosť, ktorú treba držať ako otázku, nie ako zistenie: čo stojí za touto príťažlivosťou a ešte nie je vidieť.'),
            frame: {
                steady: t('What stands behind the pull tends to be a quiet reason, perhaps a need the unfamiliar answers, held as a question and not as a finding.', 'Za príťažlivosťou zvykne stáť tichý dôvod, možno potreba, na ktorú neznáme odpovedá, držaný ako otázka, nie ako zistenie.'),
                strained: t('The pull may be covering something: a restlessness, a comparison or a wish to be elsewhere that is easier left unexamined.', 'Predmetom tu býva niečo, čo môže príťažlivosť zakrývať: nepokoj, porovnávanie či túžba byť inde, ktoré je ľahšie nechať neskúmané.'),
            } },
        { label: t('What would shift', 'Čo by sa posunulo'),
            ask: t('What would change in how you meet the unfamiliar if the unseen part came into view.', 'Čo by sa zmenilo v tom, ako sa stretávaš s neznámym, keby sa nevidená časť dostala do zorného poľa.'),
            frame: {
                steady: t('What counts is the change of angle: a plainer sense of what is being sought in the unfamiliar once the hidden part is seen.', 'V tomto mieste ide o zmenu uhla pohľadu: o jasnejší zmysel toho, čo sa v neznámom hľadá, keď sa skrytá časť dostane na svetlo.'),
                strained: t('The change of angle meets resistance: the comfort of not looking, or a worry that seeing the whole pull would ask too much.', 'Témou zvykne byť odpor voči zmene uhla pohľadu: pohodlie nepozerať sa alebo obava, že pohľad na celú túto príťažlivosť by žiadal priveľa.'),
            } },
    ],
    opening: t('This reading looks at what draws you toward the unfamiliar. The first card is what you can already see in that pull, the second what may lie outside view (a question to hold, not a finding), and the third what would shift in how you meet the new if that part came into view.', 'Toto čítanie sa pozerá na to, čo ťa priťahuje k neznámemu. Prvá karta je to, čo v tejto príťažlivosti už vidíš, druhá to, čo môže ležať mimo zorného poľa (otázka na držanie, nie zistenie), a tretia to, čo by sa posunulo v tom, ako sa stretávaš s novým, keby sa táto časť dostala do zorného poľa.'),
    takeaway: {
        act: t('A small, ordinary act can be enough to give the pull some shape: reading how a place is spoken about by those who live there, or an afternoon in a part of one’s own town that is unfamiliar.', 'Na to, aby príťažlivosť dostala tvar, môže stačiť malý, obyčajný úkon: čítanie o tom, ako o mieste hovoria tí, ktorí tam žijú, alebo popoludnie v časti vlastného mesta, ktorú nepoznáš.'),
        ease: t('The pull does not need an answer at once. It can lie on the table like an open map and be looked at a little each day, until it says more.', 'Na príťažlivosť netreba odpovedať hneď. Môže ležať na stole ako rozložená mapa a každý deň sa naň možno chvíľu pozrieť, kým nepovie viac.'),
        face: t('What draws you may be uncomfortable to name, perhaps because it points past something familiar. Said plainly, it can turn out as large or as small as it actually is.', 'To, čo ťa priťahuje, môže byť nepríjemné pomenovať, možno preto, že to ukazuje za niečo známe. Povedané jasne sa to môže ukázať ako také veľké či malé, aké to naozaj je.'),
        weave: t('The pull and the part of you that holds back can be named together, so that curiosity and care make one picture rather than two arguments.', 'Príťažlivosť aj to, čo ťa drží späť, sa dajú pomenovať spolu, aby zvedavosť a starostlivosť vytvorili jeden obraz, nie dva spory.'),
    },
    closings: [
        t('What does the unfamiliar offer that the familiar does not?', 'Čo ponúka neznáme, čo známe neponúka?'),
        t('Which image of the pull keeps coming back, and what might it be standing in for?', 'Ktorý obraz tejto príťažlivosti sa stále vracia a za čo by mohol stáť?'),
        t('If the pull could be put into one plain sentence, what would that sentence say?', 'Keby sa príťažlivosť dala vyjadriť jednou jasnou vetou, čo by táto veta hovorila?'),
    ],
};
const unknown = {
    id: 'travel-experiences.unknown',
    areaId: 'travel-experiences',
    label: t('Reflect on uncertainty about the unknown', 'Zamyslieť sa nad neistotou z neznámeho'),
    focus: t('Hold in mind a step into the unfamiliar that you find yourself both wanting and hesitating over.', 'Maj na mysli krok do neznáma, pri ktorom zároveň chceš aj váhaš.'),
    semantics: {
        explores: t('what supports openness to the unknown, what makes you hold back, and what your feeling turns on', 'to, čo podporuje otvorenosť voči neznámemu, čo ťa drží späť a od čoho tvoj pocit závisí'),
        reflection: 'orient',
        practical: 'steady',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'legal-claim', 'financial-advice'],
    },
    spreadId: 'support-resistance-key',
    category: 'emotional',
    guidance: 'reflect',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What supports openness', 'Čo podporuje otvorenosť'),
            ask: t('What already makes the unfamiliar feel approachable: a past experience, a person, a habit of curiosity.', 'Čo už teraz robí neznáme prístupným: predchádzajúca skúsenosť, človek, zvyk zvedavosti.'),
            frame: {
                steady: t('Some things make the unknown approachable: a memory of having coped before, a person to turn to, a habit of asking questions.', 'Keď je to pevné, toto miesto je o tom, čo robí neznáme prístupným: o spomienke, že sa to už raz zvládlo, o človeku, na ktorého sa dá obrátiť, o zvyku pýtať sa.'),
                strained: t('Under strain, openness is held up by effort: curiosity that is real but needs bracing each time, or support thinner than it looks.', 'V napätí býva témou otvorenosť držaná úsilím: zvedavosť je skutočná, no treba ju zakaždým vystužiť, alebo opora tenšia, než vyzerá.'),
            } },
        { label: t('What makes you hold back', 'Čo ťa drží späť'),
            ask: t('What gives the hesitation its weight: a worry, an old memory, a wish to stay in control.', 'Čo dáva váhaniu jeho váhu: obava, stará spomienka, túžba mať všetko pod kontrolou.'),
            frame: {
                steady: t('Hesitation does honest work here: regard for one’s own limits, a wish to know the ground, a caution that has earned its place.', 'Váhanie tu zvykne robiť poctivú prácu: ohľad na vlastné hranice, túžba poznať terén, opatrnosť, ktorá si svoje miesto zaslúži.'),
                strained: t('Under pressure, hesitation grows larger than its cause: an old memory, a habit of control, or a fear louder than the situation itself.', 'Tu sa zvykne ukazovať váhanie, ktoré prerástlo svoju príčinu: stará spomienka, zvyk kontrolovať alebo strach hlasnejší než samotná situácia.'),
            } },
        { label: t('What your openness turns on', 'Od čoho závisí tvoja otvorenosť'),
            ask: t('The thing that decides which of the two sounds louder at any moment: a criterion to look at, not a verdict.', 'To, čo rozhoduje, ktorá z dvoch strán znie práve hlasnejšie: kritérium na pozorovanie, nie verdikt.'),
            frame: {
                steady: t('Openness turns on the conditions that let wish and hesitation both be heard: pace, company, room to turn back.', 'Obvyklou témou tu je podmienka, vďaka ktorej sa dá počuť túžba aj váhanie bez umlčania jedného z nich: tempo, spoločnosť, priestor vrátiť sa.'),
                strained: t('Where it sticks, feeling tends to swing between the two with no steady criterion, and whichever voice is loudest at the moment does the deciding.', 'Ak sa to zasekne, pocit sa zvykne hojdať medzi oboma stranami bez stáleho kritéria a rozhoduje práve najhlasnejší hlas.'),
            } },
    ],
    opening: t('This reading looks at uncertainty about the unknown. The first card is what supports your openness, the second what makes you hold back, and the third what your feeling turns on between the two. It reads a stance toward the unfamiliar, not whether going is right.', 'Toto čítanie sa pozerá na neistotu z neznámeho. Prvá karta je to, čo podporuje tvoju otvorenosť, druhá to, čo ťa drží späť, a tretia to, od čoho závisí tvoj pocit medzi nimi. Číta postoj k neznámemu, nie to, či je správne ísť.'),
    takeaway: {
        act: t('A small, ordinary step can steady more than a large resolve, and it might be as modest as a street, a dish or a few phrases of another language met close to home.', 'Skôr než veľké odhodlanie môže oporu dať malý, obyčajný krok, a môže byť taký skromný ako ulica, jedlo či pár viet v inom jazyku stretnuté blízko domova.'),
        ease: t('Steadiness here comes from lowering the stakes: the unknown can be approached at a walking pace, with something familiar close by.', 'Opora tu vzniká uvoľnením tlaku: k neznámemu sa dá pristupovať krok za krokom, s niečím známym nablízku.'),
        face: t('The hesitation may be asking to be heard rather than argued with; put into plain words, what exactly it fears can look different once it is written down.', 'Váhanie môže chcieť byť vypočuté, nie vyvracané; keď sa jasnými slovami povie, čoho sa presne obáva, môže to po napísaní vyzerať inak.'),
        weave: t('What helps is letting the wish to go and the care about how to go speak in one voice: curiosity with a thoughtfully packed bag, care with an open door.', 'Pomáha nechať túžbu ísť a starostlivosť o to, ako ísť, hovoriť jedným hlasom: zvedavosť s premyslene zbalenou taškou, starostlivosť s otvorenými dverami.'),
    },
    closings: [
        t('What would change about the unknown if it were fine not to know how, for a while?', 'Čo by sa na neznámom zmenilo, keby sa v ňom dalo chvíľu nevedieť, ako na to?'),
        t('Which part of the hesitation is care, and which part has simply become habit?', 'Ktorá časť váhania je starostlivosť a ktorá sa len stala zvykom?'),
        t('What makes a step toward the unfamiliar feel exactly as large as it does?', 'Čo robí z kroku k neznámemu práve tak veľký krok, aký sa zdá?'),
    ],
};
const prepare = {
    id: 'travel-experiences.prepare',
    areaId: 'travel-experiences',
    label: t('Explore how to prepare thoughtfully', 'Preskúmať, ako sa premyslene pripraviť'),
    focus: t('Hold in mind an experience you want to meet with care, and the part of it you most want to feel ready for.', 'Maj na mysli zážitok, ku ktorému chceš pristupovať s rozvahou, a tú jeho časť, na ktorú sa chceš najviac pripraviť.'),
    semantics: {
        explores: t('how to prepare for something new with care, and where that preparation tends to lead', 'to, ako sa s rozvahou pripraviť na niečo nové a kam taká príprava smeruje'),
        reflection: 'step',
        practical: 'prepare',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'legal-claim', 'financial-advice'],
    },
    spreadId: 'situation-action-outcome',
    category: 'action-guidance',
    guidance: 'act',
    temporal: 'future',
    relationshipType: null,
    places: [
        { label: t('How things stand', 'Ako veci stoja'),
            ask: t('The situation as it is before setting out: what is clear, what is open and what is simply unknown.', 'Situácia taká, aká je pred začiatkom: čo je jasné, čo je otvorené a čo je jednoducho neznáme.'),
            frame: {
                steady: t('Before setting out, the ground tends to look like this: what is already clear, what is honestly unknown, and how calmly the two sit side by side.', 'Pôda pred začiatkom zvykne vyzerať takto: čo je už jasné, čo je poctivo neznáme a ako pokojne tieto dve veci sedia vedľa seba.'),
                strained: t('Pressure turns the starting point into a crowd of unknowns: more questions than can be answered, and a pull to prepare for everything at once.', 'Tlak mení východisko na zhluk neznámych: viac otázok, než sa dá zodpovedať, a nutkanie pripraviť sa na všetko naraz.'),
            } },
        { label: t('A fitting preparation', 'Vhodná príprava'),
            ask: t('A stance that suits this moment: a way of getting ready that is ordinary, small and your own.', 'Postoj, ktorý sa hodí do tejto chvíle: spôsob prípravy, ktorý je obyčajný, malý a tvoj.'),
            frame: {
                steady: t('Steady preparation is in proportion: ordinary, small and sufficient, with room left for what cannot be arranged.', 'Znakom pevnej prípravy je tu miera: obyčajná, malá a dostatočná, s miestom pre to, čo sa zariadiť nedá.'),
                strained: t('Under strain, preparation loses its proportion: too little attention, or so much that readiness becomes a task without an end.', 'Napätie zvykne ukazovať na prípravu, ktorá stratila mieru: buď príliš málo pozornosti, alebo toľko, že pripravenosť sa mení na úlohu bez konca.'),
            } },
        { label: t('Where it tends to lead', 'Kam taká príprava smeruje'),
            ask: t('The direction that preparation tends to give the experience, as a tendency and never as a promise.', 'Smer, ktorý príprava zážitku zvykne dávať, ako sklon a nikdy ako prísľub.'),
            frame: {
                steady: t('Good preparation leaves room to look up from the map and meet what is actually there.', 'Na tomto mieste ide o to, čo môže príprava zážitku dať: priestor zdvihnúť oči od mapy a stretnúť to, čo tam skutočne je.'),
                strained: t('When strained, preparation becomes checking that comforts more than it equips: a screen, with the experience met through the plan rather than directly.', 'Napätou podobou je kontrolovanie, ktoré skôr upokojuje, než vybavuje: príprava ako clona, so zážitkom stretávaným cez plán, nie priamo.'),
            } },
    ],
    opening: t('This reading looks at preparing for something new with care. The first card is how things stand before setting out, the second a fitting way to prepare, and the third the direction that preparation tends to give (a tendency, not a promise).', 'Toto čítanie sa pozerá na to, ako sa s rozvahou pripraviť na niečo nové. Prvá karta je to, ako veci stoja pred začiatkom, druhá vhodný spôsob prípravy a tretia smer, ktorý taká príprava zvykne dávať (sklon, nie prísľub).'),
    takeaway: {
        act: t('One ordinary act of preparation can be enough to begin with: reading how a place describes itself, getting to know a few words of its language, or setting out what is wanted within reach.', 'Na začiatok môže stačiť jeden obyčajný úkon prípravy: čítanie o tom, ako sa miesto predstavuje samo, zoznámenie sa s pár slovami jeho jazyka alebo vyloženie vecí, ktoré sa chcú mať po ruke.'),
        ease: t('Preparation can be lighter than it feels: a plan can leave room for an afternoon nobody arranged, and for what cannot be foreseen.', 'Príprava môže byť ľahšia, než sa zdá: plán môže nechať miesto na popoludnie, ktoré nikto nezariadil, a na to, čo sa nedá predvídať.'),
        face: t('Preparing well may begin with looking directly at what feels uncertain, and noting which of it can be arranged and which can only be met when it arrives.', 'Dobrá príprava môže začať priamym pohľadom na to, čo pôsobí neisto, a poznamenaním si, čo sa dá zariadiť a čo sa dá len stretnúť, keď to príde.'),
        weave: t('The practical and the felt side can be brought together: what is carried in the bag and what is carried in mind, packed with the same care.', 'Praktická a pocitová stránka sa dajú spojiť: to, čo sa nesie v taške, a to, čo sa nesie v mysli, môže byť pripravené s rovnakou starostlivosťou.'),
    },
    closings: [
        t('What would you like to bring along that cannot be packed?', 'Čo chceš vziať so sebou, čo sa nedá zbaliť?'),
        t('Which part of getting ready is care, and which part is a wish for certainty?', 'Ktorá časť prípravy je starostlivosť a ktorá túžba po istote?'),
        t('What might it mean to leave one corner of the plan open?', 'Čo by mohlo znamenať nechať jeden kút plánu otvorený?'),
    ],
};
const teaches = {
    id: 'travel-experiences.teaches',
    areaId: 'travel-experiences',
    label: t('Discover what a new experience may teach me', 'Objaviť, čo ma môže naučiť nový zážitok'),
    focus: t('Hold in mind an experience, past or imagined, that took or could take you out of your usual ground.', 'Maj na mysli zážitok, minulý alebo predstavený, ktorý ťa vyviedol alebo by ťa mohol vyviesť z obvyklej pôdy.'),
    semantics: {
        explores: t('what a new experience asks of the body, the mind and the sense of what matters', 'to, čo nový zážitok žiada od tela, mysle a pocitu toho, na čom záleží'),
        reflection: 'meaning',
        practical: 'name',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'legal-claim', 'financial-advice'],
    },
    spreadId: 'body-mind-spirit',
    category: 'self-development',
    guidance: 'reflect',
    temporal: 'timeless',
    relationshipType: null,
    places: [
        { label: t('What it asks of the body', 'Čo žiada od tela'),
            ask: t('The lived, practical side of the experience: tiredness, hunger, pace, the senses in a new place.', 'Prežívaná, praktická stránka zážitku: únava, hlad, tempo, zmysly na novom mieste.'),
            frame: {
                steady: t('The body registers the unfamiliar first: its pace, its appetite, its tiredness, and what it knows before words arrive.', 'Telo v neznámom zaznamenáva ako prvé a o tom toto miesto zvykne byť: o jeho tempe, chuti, únave a o tom, čo vie skôr, než prídu slová.'),
                strained: t('Under strain, the body brings its limits forward: depletion, overload or restlessness that bends everything else that is seen and learned.', 'Hranice tela sa pri záťaži vynárajú do popredia: vyčerpanie, preťaženie či nepokoj, ktoré ohýbajú všetko ostatné, čo sa vidí a učí.'),
            } },
        { label: t('What it asks of the mind', 'Čo žiada od mysle'),
            ask: t('How thinking and feeling meet the unfamiliar: what is learned, what is mistaken, what is felt when everything around is foreign.', 'Ako sa myslenie a cit stretávajú s neznámym: čo sa učí, v čom sa mýli a čo sa cíti, keď je všetko naokolo cudzie.'),
            frame: {
                steady: t('The mind looks for footing in the unfamiliar: sorting what is strange, picking up a few words, noticing its own assumptions.', 'Tu býva témou myseľ, ktorá si v neznámom hľadá oporu: triedi cudzie, učí sa pár slov, všíma si vlastné predpoklady.'),
                strained: t('Under stress, thinking is clouded by the new: mistakes repeated, assumptions defended, or a sense of being swamped by a place that refuses to be made simple.', 'Myslenie zahmlené novým sa tu ukazuje v napätí: opakované omyly, obhajované predpoklady alebo pocit zaplavenia miestom, ktoré sa nedá zjednodušiť.'),
            } },
        { label: t('What it is about underneath', 'O čom je to v hĺbke'),
            ask: t('The value or meaning under the experience: what it touches in what matters to you.', 'Hodnota alebo zmysel pod zážitkom: čoho sa dotýka z toho, na čom ti záleží.'),
            frame: {
                steady: t('Beneath the surface, an experience can touch a value: curiosity, humility, gratitude or a sense of what matters at home.', 'Pod povrchom sa zážitok tu zvykne dotýkať nejakej hodnoty: zvedavosti, pokory, vďaky alebo pocitu toho, na čom záleží doma.'),
                strained: t('Under pressure, meaning does not come easily: an experience unsettles a value, or leaves a question about what mattered without a tidy answer.', 'Zmysel, ktorý neprichádza ľahko, je napätou témou: zážitok, ktorý otriasa nejakou hodnotou alebo necháva otázku, na čom záležalo, bez úhľadnej odpovede.'),
            } },
    ],
    opening: t('This reading looks at what a new experience may teach. The first card is its lived, practical side, the second how thought and feeling meet it, and the third what it is about underneath, in terms of what matters to you.', 'Toto čítanie sa pozerá na to, čo môže nový zážitok naučiť. Prvá karta je jeho prežívaná, praktická stránka, druhá to, ako sa s ním stretáva myslenie a cit, a tretia to, o čom je v hĺbke, v zmysle toho, na čom ti záleží.'),
    takeaway: {
        act: t('A single plain sentence can be enough to name one thing the unfamiliar setting showed about you, and ordinary days can show whether it holds.', 'Môže stačiť jedna jasná veta, ktorá pomenúva jednu vec, čo o tebe neznáme prostredie ukázalo; či platí, sa dá vidieť aj v obyčajných dňoch.'),
        ease: t('Not every lesson needs to be collected at once. Some arrive late, over a meal back home, and ask only to be given room.', 'Nie každé poučenie treba zbierať hneď. Niektoré prichádzajú neskôr, pri jedle doma, a žiadajú len, aby im bolo ponechané miesto.'),
        face: t('What the experience shows may be unflattering: a limit, a habit, an assumption. It can be taken as information about how the new is met, not as a verdict.', 'To, čo zážitok ukazuje, nemusí lichotiť: hranica, zvyk, predpoklad. Dá sa to brať ako informácia o tom, ako sa človek stretáva s novým, nie ako rozsudok.'),
        weave: t('What the body noticed, what the mind made of it and what it meant underneath can be set side by side, so that the lesson is one story rather than three.', 'Čo telo zaznamenalo, čo si z toho myseľ vytvorila a čo to znamenalo v hĺbke, sa dá položiť vedľa seba, aby poučenie bolo jedným príbehom, nie tromi.'),
    },
    closings: [
        t('What from the new is worth carrying into ordinary days?', 'Čo z nového sa oplatí preniesť do obyčajných dní?'),
        t('What might the unfamiliar be teaching that words have not yet caught up with?', 'Čo ťa môže neznáme učiť, na čo slová ešte nedosiahli?'),
        t('Which lesson would still be worth having if nobody else ever heard about it?', 'Ktoré poučenie by stálo za to mať, aj keby sa o ňom nikto iný nedozvedel?'),
    ],
};
export const TRAVEL_AREA = {
    id: 'travel-experiences',
    label: t('Travel & New Experiences', 'Cestovanie a nové zážitky'),
    blurb: t('Curiosity, the unfamiliar and what an experience leaves behind.', 'Zvedavosť, neznáme a to, čo po sebe zážitok zanecháva.'),
    scope: t('going toward the unfamiliar and what it leaves behind', 'cesta k neznámemu a to, čo po nej zostane'),
    intentions: [draw, unknown, prepare, teaches],
    lens,
};
