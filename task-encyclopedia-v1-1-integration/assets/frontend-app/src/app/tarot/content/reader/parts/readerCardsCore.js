/**
 * THE EIGHT CARDS WRITTEN FIRST, BY HAND, AS THE MODEL FOR THE REST.
 *
 * They are chosen to cover what the layer must do: a Major whose six places read very
 * differently (The Tower), one that is withdrawal rather than force (The Hermit), a
 * numbered Minor of craft (Eight of Pentacles), the pair that is the career benchmark
 * (Eight of Swords, The Devil, Queen of Swords), and the pair that must stay in tension
 * (The Chariot, Four of Swords). See docs/tarot/TAROT_READER_STYLE_GUIDE.md.
 */
export const READER_CARDS_CORE = {
    'major-tower': {
        en: {
            essence: "What can no longer hold its own weight comes down, and shows what it was resting on.",
            description: "The Tower exposes what can no longer support its own weight. Its disruption may feel sudden, but the weakness it reveals is often older than the moment of collapse. This card can represent shock, confrontation, revelation or the failure of a structure that once created security. It is uncomfortable because it removes the option of pretending nothing has changed. Yet the Tower is seldom destruction for its own sake. Its deeper question is what becomes possible once maintaining the unstable structure is no longer the priority.",
            stake: "a structure failing under its own weight",
            question: "What would you build differently if the old structure were no longer worth defending?",
            lines: {
                origin: "{card} reads here as something that gave way earlier and is still shaping the ground. The weakness it exposed was probably older than the moment it showed, and what is carried forward is less the shock than the knowledge of what failed.",
                state: "{card} describes a structure that is no longer holding its own weight. The disruption may feel sudden, but the weakness it shows tends to be older than the moment it becomes visible, and the situation has stopped allowing anyone to pretend otherwise.",
                driver: "{card} in the underlying place suggests that what keeps this going is a structure being maintained past its usefulness. The pressure is not coming from nowhere; it builds where something has been propped up instead of repaired.",
                response: "As the way forward, {mid} does not ask for demolition so much as honesty about what is already failing: to stop propping it up, and to decide what is worth rebuilding once defending the old structure is no longer the priority.",
                direction: "{card} marks a tendency toward exposure. If the present dynamic continues, what has been held together by effort is likelier to show its limit than to hold. It is a direction, not a verdict, and it also marks what could be rebuilt on firmer ground once the false stability is out of the way.",
                other: "On the other side, {mid} points to a stance shaped by upheaval: a role or position under strain, a place that has been shaken. It is a stance, not a window into what the other side privately thinks or feels.",
            },
        },
        sk: {
            essence: "Čo už neunesie vlastnú váhu, padá a ukáže, o čo sa opieralo.",
            description: "Veža odhaľuje to, čo už nedokáže uniesť vlastnú váhu. Jej zásah môže pôsobiť náhle, no slabina, ktorú odkrýva, je často staršia než okamih zrútenia. Karta môže znamenať šok, konfrontáciu, odhalenie alebo zlyhanie stavby, ktorá kedysi dávala istotu. Je nepríjemná, lebo berie možnosť tváriť sa, že sa nič nezmenilo. Veža však nie je ničenie pre ničenie. Jej hlbšia otázka znie: čo sa stane možným, keď udržiavanie nestabilnej stavby prestane byť prioritou?",
            stake: "stavba, ktorá zlyháva pod vlastnou váhou",
            question: "Čo by sa dalo postaviť inak, keby stará stavba už nestála za obranu?",
            lines: {
                origin: "{card} sa číta ako vplyv z dávnejšieho obdobia: niečo sa už raz zrútilo a dodnes to ovplyvňuje pôdu, na ktorej stojí dnešok. Slabina, ktorú to odhalilo, bola možno staršia než samotný okamih pádu.",
                state: "{card} opisuje stavbu, ktorá už neunesie vlastnú váhu. Narušenie môže pôsobiť náhle, no slabina, ktorú odkrýva, býva staršia než okamih, keď sa stane viditeľnou, a situácia už nedovoľuje tváriť sa, že sa nič nedeje.",
                driver: "{card} na mieste toho, čo je pod povrchom, naznačuje, že situáciu drží pri živote stavba, ktorá sa udržiava dlhšie, než slúži. Tlak neprichádza odnikiaľ: rastie tam, kde sa niečo podopieralo namiesto opravy.",
                response: "Ako cesta vpred {mid} nežiada demoláciu, ale úprimnosť o tom, čo už zlyháva: prestať to podopierať a rozhodnúť sa, čo stojí za to postaviť znova, keď obrana starej stavby už nie je prioritou.",
                direction: "{card} naznačuje smer k odhaleniu. Ak súčasná dynamika pokračuje, to, čo sa drží len námahou, skôr ukáže svoju hranicu, než by vydržalo. Je to smer, nie rozsudok, a zároveň to ukazuje, čo sa dá postaviť na pevnejšom základe, keď falošná stabilita zmizne.",
                other: "Na mieste druhej strany {mid} ukazuje postoj poznačený otrasom: úlohu alebo pozíciu pod tlakom. Je to postoj, nie pohľad do toho, čo si druhá strana súkromne myslí alebo cíti.",
            },
        },
    },
    'major-hermit': {
        en: {
            essence: "Deliberate withdrawal from noise, in order to hear what a crowd drowns out.",
            description: "The Hermit steps away from noise in order to hear what cannot be heard in a crowd. His solitude is deliberate: a temporary distance from expectations, opinions and distraction. He often appears when the next useful answer is unlikely to come from doing more or moving faster. At his best, he represents reflection, independence of thought and wisdom earned through attention. His shadow emerges when retreat becomes avoidance or self-protection hardens into isolation. The Hermit asks whether you need more information from the world, or enough quiet to recognise what you already know.",
            stake: "chosen solitude and the slow work of attention",
            question: "Do you need more information from the world, or enough quiet to recognise what you already know?",
            lines: {
                origin: "Behind this, {mid} points to something from earlier: a stretch of stepping back, thinking alone or declining to follow the crowd, whose lessons still shape how this is seen.",
                state: "Where things stand, {mid} shows a situation in which the next useful answer is unlikely to come from doing more or moving faster. The distance from other people's expectations looks deliberate, and the real work at the moment is attention.",
                driver: "Underneath this, {mid} suggests that withdrawal is part of what holds this in place. It may be protecting something real, or it may have hardened from a pause into a habit of staying out of reach.",
                response: "What {mid} asks for here is quiet that is used rather than merely endured: time alone with the question, a step back from other people's opinions, and a willingness to hear what is already known.",
                direction: "If the present dynamic continues, {mid} points toward turning inward: clarity is likelier to come from reflection than from further activity, and the cost to watch is solitude that stops serving the question.",
                other: "For the other side, {mid} describes a posture of chosen distance: someone, or something, keeping apart to think things through alone. It tells you nothing about what the other side privately feels.",
            },
        },
        sk: {
            essence: "Zámerné odtiahnutie sa od hluku, aby bolo počuť to, čo dav prehlušuje.",
            description: "Pustovník sa odťahuje od hluku, aby začul to, čo v dave nepočuť. Jeho samota je zámerná: dočasný odstup od očakávaní, názorov a rozptýlenia. Často sa objaví vtedy, keď ďalšia užitočná odpoveď nepríde z robenia viac ani z rýchlejšieho pohybu. V najlepšom prípade predstavuje zamyslenie, nezávislosť myslenia a múdrosť získanú pozornosťou. Jeho tieň sa ukáže, keď sa ústup zmení na vyhýbanie sa alebo keď sa sebaochrana zatvrdí do izolácie. Pustovník sa pýta, či potrebuješ od sveta viac informácií, alebo dosť ticha na to, aby bolo možné rozpoznať, čo už vieš.",
            stake: "zvolená samota a pomalá práca pozornosti",
            question: "Potrebuješ od sveta viac informácií, alebo dosť ticha na to, aby sa ukázalo, čo už vieš?",
            lines: {
                origin: "Za týmto stojí {mid} ako vec z predchádzajúceho obdobia: úsek stiahnutia sa, premýšľania osamote alebo odmietnutia ísť s davom, ktorého poučenia dodnes určujú, ako sa na to pozeráš.",
                state: "Tam, kde veci stoja, {mid} ukazuje situáciu, v ktorej ďalšia užitočná odpoveď pravdepodobne nepríde z robenia viac ani z rýchlejšieho pohybu. Odstup od cudzích očakávaní pôsobí zámerne a skutočnou prácou je teraz pozornosť.",
                driver: "Pod povrchom {mid} ukazuje, že stiahnutie sa je súčasťou toho, čo to drží na mieste. Môže chrániť niečo skutočné, alebo sa z pauzy zmenilo na zvyk držať sa mimo dosahu.",
                response: "{card} tu žiada ticho, ktoré sa využije, nielen pretrpí: čas osamote s otázkou, krok späť od cudzích názorov a ochotu vypočuť si to, čo sa už vie.",
                direction: "Ak súčasná dynamika pokračuje, {mid} ukazuje smer dovnútra: jasnosť skôr príde z premýšľania než z ďalšej aktivity a treba si všímať samotu, ktorá prestane slúžiť otázke.",
                other: "Druhú stranu {mid} opisuje ako zvolený odstup: niekto alebo niečo, čo sa drží bokom, aby si veci premyslelo osamote. O tom, čo druhá strana súkromne cíti, to nehovorí nič.",
            },
        },
    },
    'pentacles-eight': {
        en: {
            essence: "Skill built through patient repetition, valued for the craft rather than the applause.",
            description: "Eight of Pentacles is the quiet dignity of getting better through repetition. It values craft over performance and progress over applause. The card often appears when improvement depends less on inspiration than on attention: doing the work, noticing what is weak and returning to it again. Its strength is disciplined development. Its shadow is becoming so absorbed in perfecting the process that the larger purpose disappears. It asks whether repetition is sharpening your skill, or simply keeping you busy.",
            stake: "craft built through repetition",
            question: "Is the repetition sharpening your skill, or simply keeping you busy?",
            lines: {
                origin: "{card} stands for something from the past that still sets the terms: a stretch of steady practice whose habits, standards and hard-won competence still shape how this is approached.",
                state: "The picture {mid} gives of the present is practice with no audience: attention put on the weakest part of the work and repeated until it is less weak. The effort is quiet and cumulative, and there may be little to show for it yet.",
                driver: "{card} points to what is working below the surface: absorption in the work. The dedication is real, but it can also be a way of staying inside the process so that the larger purpose never has to be faced.",
                response: "{card} answers with a stance: disciplined development. Pick the weakest part of the work, return to it, and let skill rather than approval set the pace.",
                direction: "{card} leans toward steady improvement if the present dynamic continues: competence compounds slowly, and the thing to watch is whether the craft is still serving the purpose it began with.",
                other: "As the other side, {mid} stands for a role of diligence and focus on the work: concentration on craft or duty. It is a stance, not a statement of what the other side feels.",
            },
        },
        sk: {
            essence: "Zručnosť, ktorá vzniká trpezlivým opakovaním a váži si remeslo viac než potlesk.",
            description: "Osmička mincí je tichá dôstojnosť zlepšovania sa opakovaním. Cení si remeslo viac než výkon a pokrok viac než potlesk. Karta sa často objaví tam, kde zlepšenie závisí menej od inšpirácie než od pozornosti: robiť prácu, všímať si, čo je slabé, a vracať sa k tomu. Jej silou je disciplinovaný rozvoj. Jej tieňom je pohltenie zdokonaľovaním postupu natoľko, že sa stratí väčší zmysel. Pýta sa, či ti opakovanie brúsi zručnosť, alebo ťa len zamestnáva.",
            stake: "remeslo budované opakovaním",
            question: "Brúsi ti opakovanie zručnosť, alebo ťa len zamestnáva?",
            lines: {
                origin: "{card} ukazuje na niečo skoršie, čo dodnes určuje podmienky: úsek vytrvalého cvičenia, ktorého zvyky, nároky a ťažko získaná zručnosť formujú, ako sa k tomu pristupuje.",
                state: "Obraz súčasnosti, ktorý {mid} dáva, je cvičenie bez obecenstva: pozornosť upretá na najslabšiu časť práce a opakovaná, kým nie je menej slabá. Úsilie je tiché a postupné a zatiaľ sa z neho nemusí veľa ukazovať.",
                driver: "{card} poukazuje na to, čo pracuje pod povrchom: zaujatie prácou. Oddanosť je skutočná, no môže byť aj spôsobom, ako zostať v procese, aby sa nikdy nemuselo čeliť väčšiemu zmyslu.",
                response: "{card} odpovedá postojom: disciplinovaný rozvoj. Vybrať najslabšiu časť práce, vrátiť sa k nej a nechať tempo určovať zručnosť, nie súhlas iných.",
                direction: "{card} sa prikláňa k stálemu zlepšovaniu, ak súčasná dynamika pokračuje: spôsobilosť sa pomaly násobí a treba sledovať, či remeslo ešte slúži zámeru, s ktorým sa začalo.",
                other: "Ako druhá strana {mid} zastupuje pilnosť a sústredenie na prácu: pozornosť upretú na remeslo alebo povinnosť. Je to postoj, nie výpoveď o tom, čo druhá strana cíti.",
            },
        },
    },
    'swords-eight': {
        en: {
            essence: "A sense of being bound that is real as an experience, though the ties are looser than they look.",
            description: "The Eight of Swords is the experience of being held by something that looks more final than it is. A figure stands bound and blindfolded among upright blades, yet the ties are loose and the way out is less blocked than it feels, though in context some limits can be real. The card is about the gap between confinement and the story told about it: fear, habit, other people's expectations or a lack of options that has been taken for granted can feel exactly like a locked door. At its best it names the trap clearly enough to test it. Its shadow is staying inside a limit that was never tried, because trying it would mean choosing something. The open question is what is actually preventing movement, and what only feels as though it does.",
            stake: "the sense of having no way out",
            question: "What is actually preventing movement, and what only feels as though it is?",
            lines: {
                origin: "Behind this, {mid} points to something from earlier: a period of feeling boxed in, whose sense of limits still shapes what seems possible now.",
                state: "Where things stand, {mid} shows the feeling of being trapped almost exactly: restriction, a narrowed view and the sense that every route is closed. The card also notes that the binding is looser than it feels, and that the blindfold is part of the picture.",
                driver: "Underneath this, {mid} suggests that the restriction is partly held in place by what is not being looked at. The limit feels external, but a share of it may be an assumption that has never been tested.",
                response: "What {mid} asks for here is for the blindfold to come off first: to look at the actual constraints, separate those that are fixed from those that only feel fixed, and test the loosest one.",
                direction: "If the present dynamic continues, {mid} points toward continued confinement: a sense of limits tends to harden when it is never tested, and to loosen when it is.",
                other: "For the other side, {mid} describes a posture of feeling constrained or hemmed in: a role with little room to move. It describes a position, and does not reveal what the other side privately feels.",
            },
        },
        sk: {
            essence: "Pocit zviazanosti, ktorý je ako zážitok skutočný, hoci putá sú voľnejšie, než vyzerajú.",
            description: "Osmička mečov je zážitok, že ťa drží niečo, čo vyzerá konečnejšie, než to je. Postava stojí zviazaná a so zaviazanými očami medzi vztýčenými čepeľami, no putá sú voľné a cesta von nie je zatarasená. Karta je o rozdiele medzi uväznením a príbehom, ktorý sa o ňom hovorí: strach, zvyk, cudzie očakávania alebo nedostatok možností, ktorý sa berie ako samozrejmosť, môžu pôsobiť presne ako zamknuté dvere. V najlepšom prípade pomenuje past dosť jasne na to, aby sa dala vyskúšať. Jej tieňom je zostať v hranici, ktorú nikto neskúsil, lebo skúška by znamenala niečo si vybrať. Otvorená otázka je, čo skutočne bráni pohybu a čo sa len tak zdá.",
            stake: "pocit, že niet cesty von",
            question: "Čo skutočne bráni pohybu a čo sa len tak zdá?",
            lines: {
                origin: "Za týmto stojí {mid} ako vec z predchádzajúceho obdobia: úsek pocitu uzavretosti, ktorého zmysel pre hranice dodnes určuje, čo sa zdá možné.",
                state: "Tam, kde veci stoja, {mid} ukazuje pocit uväznenia takmer presne: obmedzenie, zúžený výhľad a dojem, že každá cesta je zatvorená. Karta zároveň pripomína, že putá sú voľnejšie, než sa zdá, a že páska na očiach patrí k obrazu.",
                driver: "Pod povrchom {mid} ukazuje, že obmedzenie drží čiastočne to, na čo sa nepozerá. Hranica pôsobí ako vonkajšia, no jej časť môže byť predpoklad, ktorý sa nikdy nevyskúšal.",
                response: "{card} tu žiada najprv zložiť pásku z očí: pozrieť sa na skutočné obmedzenia, oddeliť tie, ktoré sú pevné, od tých, ktoré sa len tak zdajú, a vyskúšať to najvoľnejšie.",
                direction: "Ak súčasná dynamika pokračuje, {mid} ukazuje pretrvávajúcu uzavretosť, ak zostane bez preskúmania: pocit hraníc má sklon tvrdnúť, keď sa neskúša, a povoľovať, keď sa skúša.",
                other: "Druhú stranu {mid} opisuje ako zovretie: úlohu s malým priestorom na pohyb. Opisuje pozíciu a neodhaľuje, čo druhá strana súkromne cíti.",
            },
        },
    },
    'major-devil': {
        en: {
            essence: "A bond that persists because it pays something, which makes it hard to see as a choice.",
            description: "The Devil is attachment that has stopped looking like a choice. Two figures stand chained to a pedestal, but the chains hang loosely around their necks, and much of what holds them is the arrangement itself. The card concerns the things that bind through reward as much as through force: comfort, desire, status, dependence, habit, a role that pays something even while it costs more. It is honest about the pull of those things instead of pretending they are simply bad. At its best it names what has a hold and what it gives in exchange. Its shadow is denial, treating the bond as fate. What the hold gives in return is the question the card leaves open.",
            stake: "a hold that has stopped being questioned",
            question: "What is the hold giving in return, and what would it cost to put it down?",
            lines: {
                origin: "{card} stands for something from the past that still sets the terms: an attachment, habit or arrangement that began by offering something and has since become part of how things are done.",
                state: "The picture {mid} gives of the present is a hold: a dependence, a habit, a role or a comfort that is hard to question because it also provides something. The chains in the picture hang loosely, which is the point.",
                driver: "{card} points to what is working below the surface: the situation persists because part of it is still providing something - security, familiarity, status, money, approval, or simply the comfort of knowing what comes next. That does not make the frustration unreal. It suggests the trap may have a door, and that opening it would mean giving something up.",
                response: "{card} answers with a stance: an honest account of what the hold gives and what it takes, before deciding whether the exchange is still worth it.",
                direction: "{card} leans toward repetition if the present dynamic continues: the pattern deepens precisely because it is comfortable, and it changes when the exchange is looked at plainly.",
                other: "As the other side, {mid} stands for a role shaped by attachment or dependence: something that is hard to leave. It describes a pattern, and not what the person feels.",
            },
        },
        sk: {
            essence: "Väzba, ktorá trvá, lebo niečo prináša, a preto sa ťažko vníma ako voľba.",
            description: "Diabol je pripútanie, ktoré prestalo vyzerať ako voľba. Dve postavy stoja pripútané k podstavcu, no reťaze im voľne visia okolo krku a drží ich len samotné usporiadanie. Karta sa týka vecí, ktoré viažu odmenou rovnako ako silou: pohodlie, túžba, postavenie, závislosť, zvyk, úloha, ktorá niečo platí, hoci stojí viac. Je úprimná o sile ich príťažlivosti a nepredstiera, že sú jednoducho zlé. V najlepšom prípade pomenuje, čo drží a čo za to dáva. Jej tieňom je popieranie: brať väzbu ako osud. Čo pripútanie dáva na oplátku, to je otázka, ktorú karta nechá otvorenú.",
            stake: "pripútanie, ktoré sa prestalo spochybňovať",
            question: "Čo ti to pripútanie dáva na oplátku a koľko by stálo pustiť ho?",
            lines: {
                origin: "{card} ukazuje na niečo skoršie, čo dodnes určuje podmienky: pripútanie, zvyk alebo usporiadanie, ktoré sa začalo ponukou niečoho a stalo sa súčasťou toho, ako sa veci robia.",
                state: "Obraz súčasnosti, ktorý {mid} dáva, je zovretie: závislosť, zvyk, úloha alebo pohodlie, ktoré sa ťažko spochybňuje, lebo aj niečo poskytuje. Reťaze na obraze visia voľne a práve v tom je podstata.",
                driver: "{card} poukazuje na to, čo pracuje pod povrchom: situácia trvá, lebo jej časť stále niečo dáva - istotu, známosť, postavenie, peniaze, uznanie alebo jednoducho pohodlie toho, že sa vie, čo príde. To neznamená, že frustrácia nie je skutočná. Znamená to, že na pasci môžu byť dvere a že ich otvorenie by znamenalo niečo sa vzdať.",
                response: "{card} odpovedá postojom: úprimný účet toho, čo pripútanie dáva a čo berie, skôr než sa rozhodne, či výmena stále stojí za to.",
                direction: "{card} sa prikláňa k opakovaniu, ak súčasná dynamika pokračuje: vzorec sa prehlbuje práve preto, že je pohodlný, a mení sa, keď sa výmena pozrie pravdivo.",
                other: "Ako druhá strana {mid} zastupuje postoj poznačený pripútaním alebo závislosťou: úlohu spojenú s niečím, čo sa ťažko opúšťa. Opisuje vzorec, nie to, čo druhá strana cíti.",
            },
        },
    },
    'swords-queen': {
        en: {
            essence: "Clear sight and plain speech that have been earned, not borrowed.",
            description: "The Queen of Swords sits high, hand raised, looking directly at whatever is in front of the throne. The card stands for clarity that has been paid for: perception sharpened by loss or experience, independence that does not need approval, honesty that does not hurry to comfort. In a reading it can describe a person, a role or a quality in you that sees precisely and says it plainly. At its best it cuts through confusion without cruelty. Its shadow is precision turned into distance, or coldness mistaken for clarity. Looked at without needing the picture to be kinder, a matter often turns out simpler to see and harder to decide.",
            stake: "clear sight and plain speech",
            question: "What would you decide if you looked at it without needing the picture to be kinder?",
            lines: {
                origin: "What {mid} leaves over from before is a hard-won clarity, or an experience that taught directness, whose standards still shape how this is judged.",
                state: "{card} shows a situation that calls for exactness: clear sight, plain speech and independence from what others would prefer to hear. Read as a part of you or a way of acting, it is the capacity to see the matter without softening it first.",
                driver: "What keeps this going, {mid} suggests, is a distance kept for the sake of clarity: precision that protects by not getting close, or honesty that has not yet been paired with warmth. Beneath it, the clarity may be doing the work of safety.",
                response: "For a way through, {mid} offers a cleaner assessment rather than an easy exit: to say the clear thing plainly and kindly, and to separate what cannot be changed from what has only been decided to be impossible.",
                direction: "The tendency {mid} describes is toward clarity: if the present dynamic continues, things grow plainer and more direct, at the price that directness can arrive faster than the people or the situation can take it in.",
                other: "{card} shows the other side's part as directness, independence and detachment: clear sight and open speech. That describes a posture, and says nothing about what the other side feels.",
            },
        },
        sk: {
            essence: "Jasný pohľad a priama reč, ktoré sú vydobyté, nie požičané.",
            description: "Kráľovná mečov sedí vysoko so zdvihnutou rukou a pozerá sa priamo na to, čo má pred sebou. Predstavuje jasnosť, ktorá niečo stála: vnímanie zbrúsené stratou alebo skúsenosťou, nezávislosť, ktorá nepotrebuje súhlas, úprimnosť, ktorá sa neponáhľa s útechou. V čítaní môže opisovať človeka, úlohu alebo vlastnosť v tebe, ktorá vidí presne a hovorí to jasne. V najlepšom prípade rozseká zmätok bez krutosti. Jej tieňom je presnosť, ktorá sa zmenila na odstup, alebo chlad, ktorý sa pokladá za jasnosť. Keď sa na vec človek pozerá bez potreby, aby bol obraz milší, býva jednoduchšia na pohľad a ťažšia na rozhodnutie.",
            stake: "jasný pohľad a priama reč",
            question: "Čo by sa dalo rozhodnúť, keby sa človek pozeral bez potreby, aby bol obraz milší?",
            lines: {
                origin: "{card} zanecháva z dávnejšieho obdobia ťažko získanú jasnosť alebo skúsenosť, ktorá naučila priamosti a dodnes určuje, ako sa to posudzuje.",
                state: "{card} ukazuje situáciu, ktorá žiada presnosť: jasný pohľad, priamu reč a nezávislosť od toho, čo by iní radi počuli. Čítaná ako časť teba alebo ako spôsob konania je to schopnosť vidieť vec bez toho, aby sa najprv zjemnila.",
                driver: "Čo to drží v chode, ukazuje {mid}: odstup udržiavaný kvôli jasnosti - presnosť, ktorá chráni tým, že sa nepribližuje, alebo úprimnosť, ktorá sa ešte nespojila s teplom. Pod povrchom môže jasnosť robiť prácu bezpečia.",
                response: "Cestu cez to ponúka {mid}: nie ľahký východ, ale čistejšie posúdenie. Povedať jasnú vec priamo a láskavo a oddeliť to, čo sa zmeniť nedá, od toho, čo sa len rozhodlo za nemožné.",
                direction: "Tendencia, ktorú {mid} opisuje, ide k jasnosti: ak súčasná dynamika pokračuje, veci sa stávajú jednoduchšími a priamejšími, za cenu, že priamosť môže prísť skôr, než ju ľudia alebo situácia stihnú prijať.",
                other: "{card} ukazuje podiel druhej strany ako postoj priamosti, nezávislosti a odstupu: jasný pohľad a otvorenú reč. Je to držanie tela, ktoré nehovorí nič o tom, čo druhá strana cíti.",
            },
        },
    },
    'major-chariot': {
        en: {
            essence: "Direction held by will: opposing pulls steered into one course.",
            description: "The Chariot is direction won by will. A driver stands in an armoured vehicle drawn by two sphinxes, one dark and one light, and steers them with no reins in his hands, which suggests that the control is internal rather than mechanical. The card concerns momentum that has been earned: a decision made, competing pulls brought under one purpose, effort that has stopped wavering. At its best it is disciplined progress with a clear aim. Its shadow is force mistaken for direction, speed with nowhere in particular to arrive, or control so tight that it cannot respond to what changes. Whether the pulls are really aligned, or only being held in place, is what the picture leaves unanswered.",
            stake: "momentum earned by discipline",
            question: "Are the pulls actually aligned, or only being held in place?",
            lines: {
                origin: "{card} stands for something from the past that still sets the terms: an effort of will that set a course and still gives it momentum, whether or not the course is still the right one.",
                state: "The picture {mid} gives of the present is real momentum: a decision made, competing pulls pointed one way, and effort that has stopped wavering. The question it raises is not whether things can move, but who or what is steering.",
                driver: "{card} points to what is working below the surface: drive, a determination to keep pushing along the chosen line, which sustains the effort and may also keep it from being reconsidered.",
                response: "{card} answers with a stance: aim as well as force. Be clear which direction the effort serves, and hold the opposing pulls together deliberately, not by strain alone.",
                direction: "{card} leans toward forward movement if the present dynamic continues: momentum carries on, and where it is carrying depends on how well the pulls underneath agree.",
                other: "As the other side, {mid} stands for a role of purpose and drive: pushing hard in one direction. It is a stance, and nothing in it can be read as what the other side privately feels.",
            },
        },
        sk: {
            essence: "Smer držaný vôľou: protichodné ťahy zvedené do jedného kurzu.",
            description: "Voz je smer vydobytý vôľou. Vodič stojí v obrnenom voze ťahanom dvoma sfingami, tmavou a svetlou, a riadi ich bez opratí v rukách, čo ukazuje, že kontrola je vnútorná, nie mechanická. Karta sa týka zaslúženej hybnosti: rozhodnutia, ktoré padlo, protichodných ťahov zvedených pod jeden zámer, úsilia, ktoré prestalo kolísať. V najlepšom prípade ide o disciplinovaný pokrok s jasným cieľom. Jej tieňom je sila zamenená za smer, rýchlosť bez miesta, kam dorazí, alebo kontrola tak pevná, že nedokáže reagovať na zmenu. Či sú ťahy naozaj zladené, alebo ich len drží na mieste, to obraz nechá otvorené.",
            stake: "hybnosť zaslúžená disciplínou",
            question: "Sú ťahy naozaj zladené, alebo ich len drží na mieste napätie?",
            lines: {
                origin: "{card} ukazuje na niečo skoršie, čo dodnes určuje podmienky: úsilie vôle, ktoré nastavilo kurz a stále mu dáva hybnosť, či už je kurz stále správny, alebo nie.",
                state: "Obraz súčasnosti, ktorý {mid} dáva, je skutočná hybnosť: rozhodnutie, ktoré padlo, protichodné ťahy smerujúce jedným smerom a úsilie, ktoré prestalo kolísať. Otázka, ktorú otvára, nie je, či sa veci môžu hýbať, ale kto alebo čo ich riadi.",
                driver: "{card} poukazuje na to, čo pracuje pod povrchom: odhodlanie tlačiť ďalej po zvolenej línii, ktoré udržiava úsilie a môže ho zároveň chrániť pred prehodnotením.",
                response: "{card} odpovedá postojom: cieľ rovnako ako sila. Ujasniť si, čomu úsilie slúži, a držať protichodné ťahy pokope zámerne, nielen namáhaním.",
                direction: "{card} sa prikláňa vpred, ak súčasná dynamika pokračuje: hybnosť pokračuje tiež a o tom, kam smeruje, rozhoduje, ako dobre sa ťahy pod povrchom zhodujú.",
                other: "Ako druhá strana {mid} zastupuje postoj odhodlania a ťahu: tlačenie jedným smerom. Je to postoj, z ktorého sa nedá vyčítať, čo si druhá strana súkromne myslí.",
            },
        },
    },
    'swords-four': {
        en: {
            essence: "A deliberate pause taken so that something can be recovered before it is asked to carry more.",
            description: "The Four of Swords is deliberate stopping. A figure lies in repose on a tomb in a quiet place, three swords on the wall above and one beneath, a stained-glass window of an offering nearby. At its centre the card is withdrawal chosen so that something can be recovered, rested or reconsidered before it is asked to carry more, though in context it can shade toward collapse or quitting when the stopping is not really chosen. It often appears after strain, or just before a decision that deserves a clearer head. At its best it is restoration and perspective. Its shadow is rest that outlasts its purpose, or retreat that turns into avoidance. What the pause protects, and what it is actually for, is the part the picture leaves open.",
            stake: "deliberate stillness",
            question: "What is the pause protecting, and what is it actually for?",
            lines: {
                origin: "Behind this, {mid} points to something from earlier: a period of stopping to recover or reconsider, whose quiet is still part of the present shape of things.",
                state: "Where things stand, {mid} shows a standstill that is the right response: strain has to settle before clarity can come, and clarity is not yet ahead. It is a rest, not a defeat.",
                driver: "Underneath this, {mid} suggests that what holds this in place is a need for rest or distance that has not been admitted, or a pause that has outlasted its purpose and settled into avoidance.",
                response: "What {mid} asks for here is a deliberate pause, long enough to recover judgement and to see the matter whole, with a clear idea of what it is for so that it does not drift into avoidance.",
                direction: "If the present dynamic continues, {mid} points toward stillness and recovery: activity falls away in favour of rest and review, and the thing to watch is whether the pause has an end.",
                other: "For the other side, {mid} describes a posture of recovery: a step back to save strength, with the strain already behind it. That is a stance, not a claim about what the other side feels.",
            },
        },
        sk: {
            essence: "Zámerná pauza, aby sa dalo obnoviť to, čo bude musieť niesť viac.",
            description: "Štvorka mečov je zámerné zastavenie. Postava leží v pokoji na hrobke v tichom mieste, tri meče visia na stene nad ňou a jeden pod ňou, nablízku je vitráž s obetou. Karta nie je zrútenie ani vzdanie sa: je to stiahnutie zvolené preto, aby sa dalo niečo obnoviť, oddýchnuť si alebo prehodnotiť skôr, než sa od toho bude žiadať viac. Často sa objaví po záťaži alebo tesne pred rozhodnutím, ktoré si zaslúži bistrejšiu hlavu. V najlepšom prípade je to obnova a nadhľad. Jej tieňom je oddych, ktorý prežil svoj účel, alebo ústup, ktorý sa mení na vyhýbanie. Čo pauza chráni a načo slúži, to obraz necháva otvorené.",
            stake: "zámerné zastavenie",
            question: "Čo pauza chráni a načo vlastne slúži?",
            lines: {
                origin: "Za týmto stojí {mid} ako vec z predchádzajúceho obdobia: úsek zastavenia kvôli obnove alebo prehodnoteniu, ktorého ticho je stále súčasťou dnešného tvaru vecí.",
                state: "Tam, kde veci stoja, {mid} ukazuje stagnáciu, ktorá je sama prácou: zastavenie, lebo situácia práve to potrebuje, s námahou za sebou a jasnosťou ešte pred sebou. Je to pauza, nie porážka.",
                driver: "Pod povrchom {mid} ukazuje, že to drží potreba odpočinku alebo odstupu, ktorú nikto nepriznal, alebo pauza, ktorá trvá dlhšie než jej účel a usadila sa ako vyhýbanie.",
                response: "{card} tu žiada zámernú pauzu, dosť dlhú na to, aby sa vrátil úsudok a vec bolo vidieť celú, s jasnou predstavou, načo slúži, aby sa nezmenila na vyhýbanie.",
                direction: "Ak súčasná dynamika pokračuje, {mid} ukazuje smer k pokoju a obnove: aktivita ustupuje v prospech odpočinku a prehodnotenia a treba si všímať, či má pauza koniec.",
                other: "Druhú stranu {mid} opisuje ako obnovu síl: krok späť, pri ktorom je námaha už za nami. Je to postoj, nie tvrdenie o tom, čo druhá strana cíti.",
            },
        },
    },
};
