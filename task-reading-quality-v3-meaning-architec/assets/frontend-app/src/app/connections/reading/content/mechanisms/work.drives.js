/**
 * WORK. The weight falls on complementarity: how two approaches can strengthen each other, where coordination breaks down, how decisions and communication can be arranged so that a difference is worked with. Nothing here says anything about competence or performance. Part drives (what each is led by).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 */
const WORK_DRIVES = {
    'shared-pull/shared:mastery': {
        title: { en: 'A standard held on both sides', sk: 'Latka, ktorú držia dvaja' },
        passage: {
            en: '{both} are moved by the craft itself, so the standard in the room tends to be high without anyone having to argue for it. A rough draft can be read as a draft, a shortcut is likely to be noticed by both, and a question about how something was made can sound like interest, not challenge.\n\nThe difficulty sits in the word done. A piece of work can reach the afternoon it was due with two people still improving it, each taking the other’s continued polishing as a sign that it is not ready. Neither idea of finished is wrong. What can be missing is a third voice, a client or a calendar, that says this is enough, and without one the standard can keep rising by agreement.',
            sk: '{both} sa nadchýnajú samotným remeslom, a latka v miestnosti preto býva vysoká, hoci o to nikto nevedie spor. Hrubý koncept sa môže brať ako koncept, skratku si pravdepodobne všimne každý z dvoch a otázka, ako niečo vzniklo, môže znieť ako záujem, nie ako výzva.\n\nŤažkosť sa skrýva v slove hotovo. Môže prísť popoludnie, keď sa má práca odovzdať, a dvaja ešte stále vylepšujú; každý pritom berie ďalšie brúsenie druhej strany ako znak, že práca ešte nie je hotová. Ani jedna predstava o tom, čo je hotové, nie je zlá. Chýbať môže tretí hlas, klient alebo kalendár, ktorý povie, že už to stačí, a bez takého hlasu môže latka po vzájomnej dohode stúpať ďalej.',
        },
        aside: {
            en: 'Exacting feedback can pass between the two without sounding personal, since {both} hold the work to the same bar. The same bar can make an honest “good enough” from one side sound to the other like a standard being lowered.',
            sk: 'Náročná spätná väzba môže medzi dvoma prechádzať bez toho, aby znela osobne, lebo {both} merajú prácu tou istou latkou. Tá istá latka však môže spôsobiť, že úprimné „už to stačí“ od jednej strany znie druhej strane ako znižovanie nárokov.',
        },
        step: { en: 'Before a piece of work starts, write down in one line what “enough” means for it, and let that line, not the next improvement, close it.', sk: 'Skôr než sa práca začne, napíšte jednou vetou, čo pri tejto práci znamená „stačí“, a nech prácu uzavrie táto veta, nie ďalšie vylepšovanie.' },
        question: { en: 'Who or what outside the two can say that a piece of work is finished?', sk: 'Kto alebo čo mimo vás dvoch môže povedať, že práca je hotová?' },
    },
    'shared-pull/shared:achievement': {
        title: { en: 'Targets that invite bigger targets', sk: 'Cieľ, ktorý volá po väčšom' },
        passage: {
            en: '{both} tend to measure the work by what gets finished, which can keep planning short: a target is named, split and started with little debate. Getting going comes easily to the two; whether this is the right target is the question that can get skipped.\n\nA target that is met can invite a larger one, and when both are issuing the invitation, neither may be the one to ask what the larger one costs. A familiar version is the meeting after a good result: one proposes the next number, the other raises it. The pace agreed for the previous goal can then become the starting line for the next. A target and a stretch are different things, but between two people with the same drive, the sentence that says so is unlikely to come from the drive itself.',
            sk: '{both} zvyknú merať prácu tým, čo sa dotiahne, a plánovanie tak môže zostať krátke: cieľ sa pomenuje, rozdelí a rozbehne bez veľkej debaty. Rozbehnúť sa ide dvojici ľahko; otázka, či je to ten správny cieľ, sa môže preskočiť.\n\nSplnený cieľ môže volať po väčšom, a keď volajú dvaja naraz, nemusí sa nájsť nikto, kto by sa spýtal, čo ten väčší bude stáť. Známy obraz je porada po dobrom výsledku: jedna strana navrhne ďalšie číslo, druhá ešte pridá a tempo dohodnuté pre predošlý cieľ sa môže stať štartovou čiarou pre ďalší. Cieľ a ďalšie naťahovanie latky nie sú to isté, no medzi dvoma ľuďmi, ktorých ženie tá istá túžba, túto vetu sotva vysloví samotná túžba po výsledku.',
        },
        aside: {
            en: '{both} tend to count what gets finished, so work that has no finish line, such as upkeep, a colleague’s question or a slow repair, can drop out of the tally. It can go unplanned and unthanked by both at once.',
            sk: '{both} zvyknú rátať to, čo sa dotiahne, a práca bez cieľovej čiary, napríklad údržba, otázka kolegu alebo pomalá oprava, tak môže z bilancie vypadnúť. Takáto práca potom môže zostať bez miesta v pláne aj bez poďakovania a nemusí si to všimnúť ani jeden z dvoch.',
        },
        step: { en: 'When a goal is set, agree what pace is being assumed, and treat any later rise in that pace as a new decision rather than a continuation.', sk: 'Keď si určíte cieľ, dohodnite sa, s akým tempom sa počíta, a každé neskoršie zrýchlenie berte ako nové rozhodnutie, nie ako pokračovanie.' },
        question: { en: 'Which of the current targets was chosen, and which simply grew from the last one?', sk: 'Ktorý z terajších cieľov ste si vybrali a ktorý len vyrástol z predošlého?' },
    },
    'shared-pull/shared:recognition': {
        title: { en: 'Credit is the one thing that divides', sk: 'Uznanie je jediné, čo rozdeľuje' },
        passage: {
            en: 'Because {both} want the work to be seen, the two tend to have an eye for the audience: who needs to hear about this, how it will land, which result goes on the first slide. Visibility is likely to be handled early, not left as an afterthought.\n\nCredit is also the one part of the work that cannot be shared without being divided, so a joint result can turn into a question of whose name is read first. It can start small: a summary that thanks everyone in general terms, and a reply that adds one specific name a little too quickly. Whether the two are partners in being seen or rivals for it can depend less on temperament than on whether the credit was settled before the result existed.',
            sk: 'Keďže {both} chcú, aby bola práca vidieť, zvyknú mať cit pre publikum: komu o tom treba povedať, ako to zapôsobí, ktorý výsledok pôjde na prvý slajd. Viditeľnosť sa pravdepodobne rieši včas, nie na poslednú chvíľu.\n\nUznanie je však jediná časť práce, ktorú nemožno mať spolu bez toho, aby sa rozdelilo, a spoločný výsledok sa tak môže zmeniť na otázku, čie meno zaznie prvé. Začať to môže drobnosťou: zhrnutie, ktoré všetkým poďakuje všeobecne, a odpoveď, ktorá až príliš rýchlo doplní jedno konkrétne meno. Či si dvaja pomáhajú k viditeľnosti, alebo o viditeľnosť súperia, môže závisieť menej od povahy ako od toho, či sa uznanie vyjasnilo skôr, než výsledok vznikol.',
        },
        aside: {
            en: '{both} can be generous with credit to everyone outside the pair and careful with it between themselves. Where one of the two has more say or more years, a joint result may travel under that name by default, without anyone having chosen it.',
            sk: '{both} môžu ochotne uznávať všetkých mimo dvojice, no navzájom si uznanie dávkovať opatrne. Ak má jedna z dvoch strán väčšie slovo alebo viac rokov, spoločný výsledok môže automaticky putovať pod tým menom, hoci o tom nikto nerozhodol.',
        },
        step: { en: 'For the next joint piece, agree before it ships how it will be presented and whose names will be on it.', sk: 'Pri ďalšej spoločnej práci sa ešte pred odovzdaním dohodnite, ako sa bude prezentovať a čie mená budú uvedené.' },
        question: { en: 'What would each need to see in a summary of shared work to feel that it was fairly told?', sk: 'Čo musí zhrnutie spoločnej práce obsahovať, aby pôsobilo spravodlivo voči každému z vás?' },
    },
    'shared-pull/shared:meaning': {
        title: { en: 'A cause that makes declining hard', sk: 'Spoločná vec, pri ktorej sa ťažko odmieta' },
        passage: {
            en: '{both} need the work to matter beyond the task list, and a cause held in common can let the two carry dull stretches without much talk about motivation. A tedious handover has a point, and both can see it.\n\nThe same shared conviction can make the word no expensive. Declining one more request, or pausing a project that is still worthwhile, can sound like walking away from the purpose itself. The limit may then go unset, and the tiredness arrive under the name of the cause. A familiar version is a meeting where each can volunteer a little more as the other does. Two questions can sound like one here: whether the work is worth doing, and whether it is worth doing now, by these two, on top of what is already agreed.',
            sk: '{both} potrebujú, aby práca mala zmysel aj mimo zoznamu úloh, a vďaka spoločnej veci môžu nudné úseky zvládať bez veľkých rečí o motivácii. Zdĺhavé odovzdávanie agendy má zmysel a vidí to každý z dvoch.\n\nRovnaké presvedčenie však môže zdražiť slovo nie. Odmietnuť ďalšiu požiadavku alebo pozastaviť projekt, ktorý stále stojí za to, môže znieť ako ústup od samotného zámeru, a tak sa hranica nemusí nastaviť a únava príde v mene tej veci. Známy obraz je porada, na ktorej sa každý môže prihlásiť na o trochu viac, keď sa hlási aj druhá strana. Dve otázky tu môžu znieť ako jedna: či práca stojí za to a či stojí za to teraz, práve pre túto dvojicu, popri všetkom, čo je už dohodnuté.',
        },
        aside: {
            en: '{both} can find it hard to say the work is tiring, since between two people who believe in it that can sound like saying it no longer matters. Fatigue may then surface only sideways, as a short reply or a slipped handover, and be taken for doubt.',
            sk: '{both} môžu len ťažko priznať, že práca je únavná, lebo medzi dvoma ľuďmi, ktorí veria v tú istú vec, to môže znieť, akoby už práca nemala zmysel. Únava sa potom môže ukázať len bokom, v strohej odpovedi alebo v odovzdaní, ktoré sa oneskorí, a môže sa vziať ako pochybnosť.',
        },
        step: { en: 'Keep one visible list of what the two have said yes to, and agree that a new yes needs an old one to leave or wait.', sk: 'Veďte jeden viditeľný zoznam toho, čomu ste povedali áno, a dohodnite sa, že nové áno si žiada, aby staré odišlo alebo počkalo.' },
        question: { en: 'Which good cause is the two’s workload currently being spent on, and who decided that it should be?', sk: 'Na akú dobrú vec sa teraz míňajú vaše sily a kto rozhodol, že to tak má byť?' },
    },
    'shared-pull/shared:belonging': {
        title: { en: 'The room that stays comfortable', sk: 'Miestnosť, kde zostáva príjemne' },
        passage: {
            en: '{both} tend to count the people around the work as part of what it is for, and to notice who is quiet, who is new and who has not been asked. A room people want to stay in can be easier to build when two people pull the same way.\n\nThe hazard is the conversation that would cost some warmth. A decision about moving work from one person to another, an honest remark about a missed handover, a disagreement with a colleague both like: each can be postponed by both at once. Every reason for the delay can sound kind. The problem can stay visible to everyone and unnamed by anyone, and the silence has no single author, since each has the other for company in it. While the room is still comfortable, a hard sentence can still be said gently, and that is also the moment it seems least needed.',
            sk: '{both} zvyknú rátať ľudí okolo práce medzi to, načo práca slúži, a všímať si, kto mlčí, kto je nový a koho sa ešte nikto nespýtal. Miestnosť, v ktorej chcú ľudia ostať, sa môže stavať ľahšie, keď dvaja ťahajú za jeden povraz.\n\nZákerný je rozhovor, ktorý by kúsok tej pohody stál. Presun práce z jedného človeka na druhého, úprimná poznámka k zmeškanému odovzdaniu, nesúhlas s kolegom, ktorého majú dvaja v obľube: každú z týchto vecí môžu odložiť naraz a každý dôvod pritom znie láskavo. Problém môže ostať na očiach všetkým, a predsa nepomenovaný; mlčanie nemá jediného pôvodcu, lebo pri takom mlčaní nie je nikto sám. Kým je v miestnosti ešte príjemne, dá sa aj tvrdá veta povedať jemne, a práve vtedy sa zdá najmenej potrebná.',
        },
        aside: {
            en: '{both} may guard the warmth between themselves as carefully as the warmth in the group. A disagreement between the two can then be softened before it is spoken, and arrive as a hint the other is free to miss.',
            sk: '{both} môžu strážiť pohodu medzi sebou rovnako starostlivo ako pohodu v skupine. Nesúhlas medzi dvoma sa potom môže zjemniť ešte predtým, než zaznie, a prísť len ako náznak, ktorý druhá strana môže aj prehliadnuť.',
        },
        step: { en: 'Pick one thing the people around the work have been avoiding, and agree who says it, in what setting and which of the two backs it up.', sk: 'Vyberte jednu vec, ktorej sa ľudia okolo práce vyhýbajú, a dohodnite sa, kto to povie, pri akej príležitosti a kto z vás dvoch to podporí.' },
        question: { en: 'What problem around the work can most people see that nobody has yet named?', sk: 'Aký problém okolo práce vidí väčšina ľudí, a predsa to ešte nikto nepomenoval?' },
    },
    'shared-pull/shared:freedom': {
        title: { en: 'Two lanes and the space between', sk: 'Dva pruhy a priestor medzi nimi' },
        passage: {
            en: '{both} want a say over how, when and where the work gets done. So even where one could supervise, neither is likely to want to, and a request tends to arrive as a request, not a check. The two can run side by side for a long stretch with very little friction.\n\nThe friction gathers at the seams. The joint decision, the shared deadline and the client who belongs to neither desk can become ground that each leaves to the other, because each is busy with a lane. It can surface at a handover, when one assumes the other has it and the other has assumed the same. The value that keeps the two out of each other’s way is the one that leaves the space between lanes unowned. That space comes to belong to someone only through a deliberate act of ownership.',
            sk: '{both} chcú mať slovo v tom, ako, kedy a kde sa práca robí, a preto sa dozerať na druhú stranu zrejme nechce ani strane, ktorá má väčšie slovo; prosba skôr príde ako prosba než ako kontrola. Dvaja môžu dlho bežať vedľa seba s minimom trenia.\n\nTrenie vzniká tam, kde sa pruhy stretávajú. Spoločné rozhodnutie, spoločný termín a klient, ktorý nepatrí k žiadnemu stolu, sa môžu stať územím, ktoré každý nechá na druhú stranu, lebo každý sa venuje svojmu pruhu. Môže sa to ukázať pri odovzdaní práce, keď jedna strana počíta s tým, že to má druhá, a druhá počíta s tým istým. Hodnota, vďaka ktorej si dvaja nezavadzajú, necháva priestor medzi pruhmi bez majiteľa, a ten priestor niekomu patrí až vtedy, keď sa niekto vedome ujme zodpovednosti.',
        },
        aside: {
            en: '{both} may wait to be asked before stepping into each other’s work, which respects the room each wants. A difficulty in one lane can then stay there longer than it needs to, with help close by and unoffered.',
            sk: '{both} môžu čakať, kým ich niekto požiada, a až potom vstúpiť do práce druhej strany, čo rešpektuje priestor, ktorý každý chce. Ťažkosť v jednom pruhu tak môže ostať dlhšie, než treba, hoci je pomoc na dosah, len sa neponúkne.',
        },
        step: { en: 'List the things that belong to neither lane, and give each one a named owner for the coming stretch of work.', sk: 'Spíšte veci, ktoré nepatria do žiadneho pruhu, a každej dajte na najbližší úsek práce pomenovaného majiteľa.' },
        question: { en: 'Which piece of shared work has, so far, belonged to the other by assumption?', sk: 'Ktorá časť spoločnej práce zatiaľ patrila druhej strane len preto, že sa to tak predpokladalo?' },
    },
    'shared-pull/shared:care': {
        title: { en: 'Everyone’s workload but their own', sk: 'Záťaž všetkých okrem vlastnej' },
        passage: {
            en: '{both} tend to look after the people around the work, often before the work itself, and a colleague with a problem is likely to find that this pair has time to listen. Around them, trouble can get mentioned early.\n\nThe cost is a quiet one. Each can be quick to take on a difficulty that belongs to someone else and slow to mention a limit. The two can be well informed about everyone’s load except their own, and neither may hear the other say that a limit has been reached. A shared habit of giving is hard to interrupt from inside, because a question about one’s own capacity can look selfish to both. For either to ask for help easily, asking would have to count as one more way of looking after people.',
            sk: '{both} sa zvyknú starať o ľudí okolo práce, často skôr ako o prácu samotnú, a kolega s problémom pravdepodobne zistí, že táto dvojica má čas načúvať. Ťažkosti sa tak môžu ozvať včas.\n\nCena je tichá. Každý sa môže rýchlo ujať cudzej ťažkosti a pomaly spomenúť vlastnú hranicu. Dvojica môže mať prehľad o vyťažení všetkých, len nie o svojom, a ani jedna strana nemusí počuť od druhej, že hranica je dosiahnutá. Spoločný zvyk pomáhať sa zvnútra ťažko preruší, lebo otázka na vlastné sily sa môže každému z dvoch zdať sebecká. Ľahko požiadať o pomoc sa dá až vtedy, keď sa aj prosba o pomoc počíta ako ďalší spôsob, ako sa starať o ľudí.',
        },
        aside: {
            en: '{both} may end up easing each other’s load as well, each quietly taking a piece of the other’s week. Two people sparing each other this way can both be stretched, each believing the other is the one being spared.',
            sk: '{both} si môžu navzájom uľahčovať aj vlastnú záťaž, keď každý potichu prevezme kúsok týždňa druhej strany. Dvaja ľudia, ktorí sa takto navzájom šetria, môžu byť naraz preťažení, pričom každý verí, že ušetrená je druhá strana.',
        },
        step: { en: 'Agree to say aloud, in a regular conversation, what each is carrying for other people, so that the load is counted like any other.', sk: 'Dohodnite sa, že pri pravidelnom rozhovore nahlas poviete, čo kto z vás nesie pre iných, aby sa aj táto záťaž rátala ako každá iná.' },
        question: { en: 'Whose problem is each of the two carrying at the moment, and who is carrying theirs?', sk: 'Čie problémy nesie každý z vás práve teraz a kto nesie tie vlastné?' },
    },
    'shared-pull/shared:understanding': {
        title: { en: 'The meeting that found a new angle', sk: 'Porada, ktorá našla ďalší uhol pohľadu' },
        passage: {
            en: '{both} want to know why before they act. Between the two, a decision tends to arrive with its reasoning attached: the options weighed, the assumptions out in the open, a question answered instead of waved through.\n\nA decision also has a date, and two curious minds can lose track of it. The meeting meant to choose can become the meeting that found a new angle, each follow-up question a good one and the choice waiting behind it. Because the questions are good, neither can easily call a halt. Understanding has no edge of its own, while a decision does, and that edge appears only when one of the two names what would be enough to know.',
            sk: '{both} chcú vedieť prečo, skôr než konajú, a rozhodnutia preto zvyknú prichádzať aj s dôvodmi: možnosti sú zvážené, predpoklady na očiach, otázka dostane odpoveď, nie mávnutie rukou.\n\nRozhodnutie má však aj termín a dve zvedavé mysle môžu termín stratiť z očí. Porada, ktorá mala rozhodnúť, sa môže zmeniť na poradu, ktorá našla ďalší uhol pohľadu: každá doplňujúca otázka je dobrá a voľba čaká až za nimi. Keďže sú otázky dobré, nikto ich ľahko nezastaví. Porozumenie nemá vlastnú hranicu, rozhodnutie áno, a tá hranica sa objaví až vtedy, keď niekto z dvojice pomenuje, čo stačí vedieť.',
        },
        aside: {
            en: '{both} may reopen a decision already made whenever a better reason turns up. Work begun on the first version can then find the ground moving under it, and the people waiting on the decision can stop being sure which version stands.',
            sk: '{both} môžu už prijaté rozhodnutie znovu otvoriť zakaždým, keď sa objaví lepší dôvod. Práca rozbehnutá podľa prvej verzie tak môže stratiť pevnú pôdu pod nohami a ľudia, ktorí na rozhodnutie čakajú, si nemusia byť istí, ktorá verzia platí.',
        },
        step: { en: 'Before a decision meeting, name the two or three things that need to be known, and agree that the rest will be handled as a risk, not as a delay.', sk: 'Pred poradou o rozhodnutí pomenujte dve či tri veci, ktoré treba vedieť, a dohodnite sa, že všetko ostatné sa berie ako riziko, nie ako dôvod odložiť.' },
        question: { en: 'What is the smallest amount of understanding that would let the next decision be made?', sk: 'Čo je to najmenej, čomu treba rozumieť, aby sa mohlo urobiť ďalšie rozhodnutie?' },
    },
    'shared-pull/shared:self-expression': {
        title: { en: 'Two signatures, one surface', sk: 'Dva rukopisy na jednej ploche' },
        passage: {
            en: '{both} want a recognisable signature in what they make, and joint work can come out distinctive instead of averaged: the document sounds like someone, the design has a point of view. That is a good reason to work together instead of passing a pen back and forth.\n\nTwo signatures on one piece compete for the same surface. A review can turn into a negotiation, a suggested change heard as an edit to a voice, a defence of the original as a refusal to listen. The exchange can then move from the work to authorship. What decides it is whether the piece has places where each signature can be complete, or a single surface on which both have to be partial.',
            sk: '{both} chcú nechať v tom, čo vytvoria, rozpoznateľný rukopis, a spoločná práca preto môže vyjsť osobitá, nie spriemerovaná: dokument má svoj hlas, dizajn vlastný pohľad na vec. To je dobrý dôvod pracovať spolu a nepodávať si pero z ruky do ruky.\n\nDva rukopisy v jednom diele zaberajú to isté miesto. Pripomienkovanie sa môže zmeniť na vyjednávanie, navrhnutá zmena zaznie ako zásah do cudzieho hlasu, obrana pôvodnej verzie ako odmietnutie počúvať a rozhovor sa môže z práce presunúť k autorstvu. Rozhoduje, či sa v diele nájdu miesta, kde sa môže každý rukopis prejaviť naplno, alebo je tam len jedno spoločné miesto, na ktorom z každého zostane iba kúsok.',
        },
        aside: {
            en: '{both} can hear a note on style as a note on the self, and a note on substance as one on style. Where one of the two carries more weight, the other’s voice may drift toward that signature without anyone asking it to.',
            sk: '{both} môžu počuť poznámku k štýlu ako poznámku k sebe a poznámku k obsahu ako poznámku k štýlu. Ak má jedna z dvoch strán väčšiu váhu, hlas druhej sa môže nenápadne priblížiť k tomu rukopisu, hoci to nikto nežiada.',
        },
        step: { en: 'Divide the next piece so that each owns a section, a stage or a screen outright, and review only the joins together.', sk: 'Ďalšie dielo rozdeľte tak, aby každému patrila celá sekcia, etapa alebo obrazovka, a spoločne kontrolujte iba spoje.' },
        question: { en: 'Which parts of the shared work do the two of you hold most closely as your own?', sk: 'Ktoré časti spoločnej práce drží každý z vás najviac za svoje?' },
    },
    'shared-pull/shared:beauty': {
        title: { en: 'The third pass and the checks nobody sees', sk: 'Tretí prechod a kontroly, ktoré nikto nevidí' },
        passage: {
            en: '{both} care how the work looks and feels, not only whether it functions. So the two tend to notice what others scroll past: the spacing, the wording of a sentence, the order of a page. What leaves the room is likely to carry a finish other people register.\n\nThe finishing has an appetite of its own. Both can see the next improvement, and because each sees it, each can justify it. It can show on the day before something is due: the visible parts get a third pass while the handover notes and the dull checks that nobody admires stay at their first. Not every part of the work asks for the attention that beauty gives; some only need to be sound, and the two can find it hard to say which are which.',
            sk: '{both} dbajú na to, ako práca vyzerá a pôsobí, nielen či funguje, a zvyknú si všímať to, čo ostatní prejdú očami: rozostupy, znenie vety, poradie na stránke. Čo opustí miestnosť, pravdepodobne nesie dotiahnutosť, ktorú si iní všimnú.\n\nDolaďovanie si žiada čoraz viac. Ďalšie vylepšenie vidí každý z dvoch, a keďže je na očiach, dá sa aj obhájiť. Môže sa to ukázať deň pred termínom: viditeľné časti dostanú tretí prechod, kým poznámky k odovzdaniu a nudné kontroly, ktoré nikto neobdivuje, ostanú pri prvom. Nie každá časť práce si žiada pozornosť, akú dáva krása; niektorým stačí, aby boli spoľahlivé, a dvojica môže len ťažko povedať, ktoré sú ktoré.',
        },
        aside: {
            en: 'An eye for finish can be shared while taste is not: {both} may agree that something looks wrong and differ on what looks right, with no measure to settle it. The choice can then fall to whoever cares more on the day, and the other’s taste may quietly stop being offered.',
            sk: 'Cit pre dotiahnutosť môže byť spoločný, aj keď vkus nie je: {both} sa môžu zhodnúť, že niečo nevyzerá dobre, a rozchádzať sa v tom, čo vyzerá dobre, bez meradla, ktoré by to rozsúdilo. Voľba potom môže pripadnúť tomu, komu v ten deň záleží viac, a vkus druhej strany sa môže potichu prestať ponúkať.',
        },
        step: { en: 'Mark which parts of the work are for looking at and which are for relying on, and give both kinds a slot in the plan.', sk: 'Označte, ktoré časti práce sú na pozeranie a ktoré na spoliehanie, a pre každý z týchto druhov nájdite v pláne miesto.' },
        question: { en: 'Which unglamorous part of the work has so far been given the least of the two’s attention?', sk: 'Ktorá nenápadná časť práce dostala zatiaľ z vašej pozornosti najmenej?' },
    },
    'pulls-apart/freedom|belonging': {
        title: { en: 'The same absence, two meanings', sk: 'Tá istá neprítomnosť, dva významy' },
        passage: {
            en: '{p0} wants a say over how and when the work gets done, and {p1} tends to work for the team as much as for the task. On most days the two can fit: the work divides into lanes, and the group gathers where the lanes meet. The strain can start in how each takes an ordinary invitation.\n\n{p1} can see a third meeting in a week as belonging on offer, and {p0} as room being taken away. {p0} can see a declined meeting as a boundary kept, and {p1} as a door closed on the group. Neither view is false, and each is partial. Since the same absence can carry both meanings, a solo hour and a withdrawn one can look alike from the other desk until the two say which is which.',
            sk: '{p0} chce mať slovo v tom, ako a kedy sa práca robí, a {p1} zvykne pracovať pre tím rovnako ako pre úlohu. Väčšinu dní to môže fungovať: práca sa rozdelí do pruhov a tím sa schádza tam, kde sa pruhy stretávajú. Napätie sa môže začať pri obyčajnom pozvaní, ktoré každý vníma inak.\n\n{p1} môže v tretej porade za týždeň vidieť ponuku spolupatričnosti, kým {p0} odoberanie voľnosti. {p0} môže v odmietnutej porade vidieť udržanú hranicu a {p1} zatvorené dvere pred skupinou. Ani jeden pohľad nie je mylný, každý je však len čiastočný. Keďže tá istá neprítomnosť môže znamenať oboje, hodina osamote a hodina stiahnutia môžu od vedľajšieho stola vyzerať rovnako, kým si dvaja nepovedia, o ktorú ide.',
        },
        aside: {
            en: '{p1} can end up carrying most of the group’s informal warmth, the stray question and the check on a quiet colleague, while {p0} keeps to the scheduled parts. That difference can go uncounted on both sides.',
            sk: '{p1} sa môže napokon starať o väčšinu neformálnej pohody v skupine, o náhodnú otázku aj o pohľad na tichého kolegu, kým sa {p0} drží plánovaných častí. Tento rozdiel sa nemusí rátať ani na jednej strane.',
        },
        step: { en: 'Agree which meetings and moments belong to the team in full, and let everything else be solo time that carries no message.', sk: 'Dohodnite sa, ktoré porady a chvíle patria tímu celé, a všetko ostatné nech je čas pre seba, ktorý nič neznamená.' },
        question: { en: 'When one of the two is absent from a team moment, what does the other take that to mean?', sk: 'Keď jeden z vás chýba pri tímovej chvíli, čo v tom vidí druhá strana?' },
    },
    'pulls-apart/achievement|care': {
        title: { en: 'The date and the person carrying it', sk: 'Termín a človek, na ktorom leží' },
        passage: {
            en: '{p0} tends to keep the target in view, and {p1} the people who have to reach it; each is watching something real. At a steady pace the two can cover each other’s blind side: the goal gets pursued, and what it costs people can be noticed before it is a surprise.\n\nA deadline tightens the arrangement. In a meeting where the date is under threat, {p0} may ask what can be cut and {p1} who is carrying the most. Each question can sound to the other like a refusal to face the problem. {p0} can seem to treat people as capacity, and {p1} can seem to treat the date as optional. Which gives way first, the date or the person, is a question that is hardest to answer once the squeeze has begun.',
            sk: '{p0} má zvyčajne na očiach cieľ a {p1} ľudí, ktorí musia cieľ dosiahnuť; každý sleduje niečo skutočné. Pri rovnomernom tempe si dvaja môžu kryť slepé miesta: cieľ sa dotiahne a to, čo stojí ľudí, sa dá zbadať skôr, než to prekvapí.\n\nTermín toto usporiadanie utiahne. Na porade, kde je dátum ohrozený, sa {p0} môže pýtať, čo sa dá škrtnúť, a {p1}, kto nesie najviac, a každá otázka môže druhej strane znieť ako uhýbanie pred problémom. {p0} môže pôsobiť, akoby ľudia boli len kapacita, a {p1}, akoby bol termín voliteľný. Čo ustúpi ako prvé, či termín, alebo človek, je otázka, na ktorú sa najťažšie odpovedá, keď už tlak trvá.',
        },
        aside: {
            en: 'Once a hard stretch is over, {p0} may judge it by whether the date held, and {p1} by what it took from the people who held it. The two can come out of the same stretch with different accounts of how it went.',
            sk: 'Keď sa náročný úsek skončí, {p0} môže hodnotiť, či termín vydržal, a {p1}, koľko to vzalo ľuďom, ktorí to zvládli. Dvaja tak môžu z toho istého úseku vyjsť s rozdielnym obrazom toho, ako to šlo.',
        },
        step: { en: 'Before the next hard stretch, agree which deadlines are fixed, which can move and what load on a person is not acceptable.', sk: 'Pred ďalším náročným úsekom sa dohodnite, ktoré termíny sú pevné, ktoré sa môžu posunúť a akú záťaž na človeka považujete za neprijateľnú.' },
        question: { en: 'When the date and the person carrying it pull apart, which does the other expect to give way?', sk: 'Keď sa termín a človek, na ktorom leží, rozchádzajú, čo z toho má podľa druhej strany ustúpiť?' },
    },
    'pulls-apart/recognition|understanding': {
        title: { en: 'Ready to show, not yet understood', sk: 'Pripravené ukázať, ešte nepochopené' },
        passage: {
            en: '{p0} wants the work seen, and {p1} wants it understood. A piece of work needs both before it leaves the room: an audience, and something sound enough to stand in front of one. What the two show can come with its reasons attached.\n\nFriction tends to gather just before a presentation or a release. {p0} may point to the audience and the moment, and {p1} ask for one more look at the part that is still unclear. {p0} can hear the request as a reason to wait indefinitely, and {p1} can hear the push as a willingness to show what is not yet known. Each can be guarding the same piece of work from a different side. Without an agreed point where the questions stop and the date starts, each push and each question can reopen the same argument.',
            sk: '{p0} chce, aby sa práca videla, a {p1}, aby bola pochopená, a práca potrebuje oboje, kým opustí miestnosť: publikum a niečo dosť pevné, aby pred publikom obstálo. To, čo dvaja ukážu, môže prísť aj s vysvetlením, prečo.\n\nTrenie sa zvykne zbierať tesne pred prezentáciou alebo vydaním. {p0} môže poukazovať na publikum a vhodný moment a {p1} žiadať ešte jeden pohľad na časť, ktorá je stále nejasná. {p0} môže túto žiadosť počuť ako dôvod čakať donekonečna a {p1} ten tlak ako ochotu ukazovať aj to, čomu sa ešte nerozumie. Každý môže tú istú prácu strážiť z inej strany. Bez dohodnutého bodu, v ktorom otázky končia a začína platiť dátum, môže každý tlak aj každá otázka otvoriť ten istý spor nanovo.',
        },
        aside: {
            en: '{p0} may take a warm response from the audience as a sign the work is done, while {p1} is still turning over a question nobody in the audience asked. The two can then disagree about whether a piece that was well received is finished.',
            sk: '{p0} môže brať vrelú odozvu publika ako znak, že práca je hotová, kým {p1} ešte premýšľa nad otázkou, ktorú v publiku nikto nepoložil. Dvaja sa potom môžu rozchádzať v tom, či je dielo, ktoré dobre zapôsobilo, hotové.',
        },
        step: { en: 'Agree in advance what has to be understood before anything is shown, and set the date together once that line is drawn.', sk: 'Vopred sa dohodnite, čo musí byť pochopené skôr, než sa čokoľvek ukáže, a až potom spolu určte dátum.' },
        question: { en: 'What would have to be understood before the work could be shown without worry?', sk: 'Čo by muselo byť pochopené, aby sa práca dala ukázať bez obáv?' },
    },
    'different-pulls/different': {
        title: { en: 'Two reasons for one piece of work', sk: 'Dva dôvody, jedna práca' },
        passage: {
            en: '{p0} {voice0}. {p1} {voice1}. Because the two are moved by different things, attention can fall on different parts of the work, and what one passes over the other tends to catch.\n\nThe trap is reading the other’s priority through one’s own. A decision made for one reason can look, from the other side, like a decision made for no reason at all, since the reason it answers is not one the other holds. It can happen in a disagreement about priorities, where each argues from a ground the other does not stand on and the argument has nowhere to land. Once each can say what makes the work worth doing, the disagreement can become a conversation about where attention goes.',
            sk: '{p0} {voice0}. {p1} {voice1}. Keďže každého poháňa niečo iné, pozornosť môže padať na rôzne časti práce a čo jedna strana prehliadne, druhá zvyčajne zachytí.\n\nČíha tu pasca: posudzovať prioritu druhej strany podľa tej vlastnej. Rozhodnutie urobené z jedného dôvodu môže z opačnej strany vyzerať ako rozhodnutie bez dôvodu, lebo dôvod, na ktorý odpovedá, druhý človek nezdieľa. Môže sa to stať pri nezhode o prioritách, keď každý argumentuje z miesta, kde druhá strana nestojí, a argumenty padajú do prázdna. Keď každý z dvoch vie povedať, čo robí prácu hodnou úsilia, z nezhody sa môže stať rozhovor o tom, kam má ísť pozornosť.',
        },
        aside: {
            en: '{p0} and {p1} can each thank the other for the part of the work that matters to the one giving thanks. The thanks then land slightly off, and what actually moves the other can go unremarked.',
            sk: '{p0} a {p1} si môžu navzájom ďakovať za tú časť práce, na ktorej záleží tomu, kto ďakuje. Poďakovanie potom trochu mieri vedľa a to, čo druhú stranu naozaj ženie, môže ostať nepovšimnuté.',
        },
        step: { en: 'Each says in a sentence what makes the current work worth doing, and the two then divide the tasks by those answers.', sk: 'Nech každý z vás povie jednou vetou, čo robí súčasnú prácu hodnou úsilia, a podľa týchto odpovedí si rozdeľte úlohy.' },
        question: { en: 'Which recent disagreement about priorities was really a difference in what each finds worth doing?', sk: 'Ktorý nedávny spor o priority bol v skutočnosti rozdielom v tom, čo sa každému oplatí robiť?' },
    },
};
export default WORK_DRIVES;
