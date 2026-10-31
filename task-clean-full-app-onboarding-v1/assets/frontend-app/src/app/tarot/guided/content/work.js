/**
 * WORK AND CAREER - vocation and professional life as ACTIVITY.
 *
 * This area owns direction, craft, contribution, recognition, obstacles, colleagues as part of the work, and where effort and
 * priorities go. It does not own money or security (Finances), the inner life (Personal growth) or a decision to leave a job
 * (Life changes). Whatever is said of a colleague or an organisation is a stance, never what a person thinks or intends.
 *
 * Round 6: the area keeps one sentence of its own (majorWeight). Each place carries a frame written for its own intention
 * (steady and strained); each intention carries four takeaways and four closing questions, one for each kind of answering card.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    majorWeight: t('With most of the three cards Major Arcana, the question reaches beyond the week’s tasks toward how the work fits a longer working life: its direction and what it is for.', 'Keď je väčšina z troch kariet z Veľkých arkán, otázka presahuje úlohy tohto týždňa a siaha k tomu, ako práca zapadá do dlhšieho pracovného života: k jej smeru a zmyslu.'),
};
const direction = {
    id: 'work-career.direction',
    areaId: 'work-career',
    label: t('Explore my current direction', 'Preskúmať môj súčasný smer'),
    focus: t('Hold in mind the work you do now, and the path that brought you to it.', 'Maj na mysli prácu, ktorú teraz robíš, a cestu, ktorá ťa k nej priviedla.'),
    semantics: {
        explores: t('where your work stands now, what shaped it and which way it tends', 'kde teraz stojí tvoja práca, čo ju formovalo a ktorým smerom sa uberá'),
        reflection: 'trace',
        practical: 'name',
        forbids: ['predict-outcome', 'other-person-mind', 'financial-advice', 'life-directive', 'fate-claim'],
    },
    spreadId: 'past-present-future',
    category: 'career',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What shaped it', 'Čo ju formovalo'),
            ask: t('The experiences, choices and circumstances that gave your work its present shape.', 'Skúsenosti, rozhodnutia a okolnosti, ktoré dali tvojej práci jej dnešnú podobu.'),
            frame: {
                steady: t('In a working life this often shows up as an early choice, someone’s example or a lesson that quietly set the line the work later followed.', 'V pracovnom živote sa to často ukáže ako skorá voľba, príklad iného človeka alebo skúsenosť, ktorá ticho vytýčila líniu, po ktorej sa práca neskôr uberala.'),
                strained: t('What shaped the work may have arrived with pressure attached: an expectation taken on early, a hasty turn, or a standard nobody really chose.', 'To, čo prácu formovalo, mohlo prísť s tlakom: očakávanie prevzaté príliš skoro, unáhlená zákruta alebo štandard, ktorý si nikto naozaj nevybral.')
            } },
        { label: t('Where it stands', 'Kde teraz stojí'),
            ask: t('The work as it is now: what you do, how it feels to do it, and what it asks of you.', 'Práca taká, aká je teraz: čo robíš, aké to je a čo od teba práca žiada.'),
            frame: {
                steady: t('In practice this place is most visible in ordinary days: the routines that have settled, the tasks that fill the week, the parts of the work that run on their own.', 'V praxi je toto miesto najviditeľnejšie v bežných dňoch: v zabehnutých rutinách, v úlohách, ktoré napĺňajú týždeň, a v častiach práce, ktoré bežia samy.'),
                strained: t('For work in this place a gap can open between what the days require and what is at hand to meet it, felt in small, everyday frictions.', 'Pri práci na tomto mieste sa môže medzi tým, čo dni žiadajú, a tým, čo je po ruke, otvoriť medzera, ktorú je cítiť v drobných každodenných treniciach.')
            } },
        { label: t('Where it tends', 'Kam smeruje'),
            ask: t('The way the work tends to lead if the present dynamic carries on: a tendency to look at, not a promise.', 'Smer, ktorým by sa práca mohla uberať, ak všetko pokračuje ako doteraz: sklon, ktorý sa dá sledovať, nie sľub.'),
            frame: {
                steady: t('This place tends to show which qualities of the present line would carry forward and what that line leaves out, as a leaning rather than an outcome.', 'Toto miesto zvykne ukázať, ktoré vlastnosti súčasnej línie by išli ďalej a čo táto línia vynecháva, ako sklon, nie ako výsledok.'),
                strained: t('If the present line goes on unchanged, the cost tends to gather in one familiar spot: what has hardened, worn thin or gone unexamined, offered only as a possibility.', 'Ak súčasná línia pokračuje bez zmeny, cena sa zvykne zbierať na jednom známom mieste: pri tom, čo stvrdlo, ošúchalo sa alebo zostalo nepreskúmané, a to len ako možnosť.')
            } },
    ],
    opening: t('This reading looks at the direction your work is taking. The first card is what shaped it, the second where it stands now, and the third where it tends to lead if the present dynamic continues: a tendency, not a promise.', 'Toto čítanie sa pozerá na smer, ktorým sa uberá tvoja práca. Prvá karta je to, čo ju formovalo, druhá miesto, kde teraz stojí, a tretia to, kam by mohla viesť, ak všetko pokračuje ako doteraz: ide o sklon, nie o sľub.'),
    takeaway: {
        act: t('A small, ordinary step could be to put the present direction into one plain sentence and see which of this week’s tasks actually serve it.', 'Malým, obyčajným krokom môže byť vyjadriť súčasný smer jednou jasnou vetou a všimnúť si, ktoré úlohy tohto týždňa mu naozaj slúžia.'),
        ease: t('This may be less about steering the direction than about giving it time, and letting the present stretch of work show what keeps repeating in it.', 'Môže ísť menej o riadenie smeru a viac o to, dať mu čas a nechať súčasný úsek práce ukázať, čo sa v ňom opakuje.'),
        face: t('What may help here is looking squarely at where the work actually stands, without a hopeful or a harsh gloss, and describing it as it is.', 'Pomôcť môže pozrieť sa priamo na to, kde práca naozaj stojí, bez nádejného či prísneho lakovania, a opísať to tak, ako to je.'),
        weave: t('Joining the earlier chapters of the work with the present one may matter here, so that the direction reads as one line and not as separate jobs.', 'Dôležité môže byť spojiť skoršie kapitoly práce so súčasnou, aby sa smer čítal ako jedna línia, nie ako samostatné zamestnania.'),
    },
    closings: {
        act: t('If the present direction were put into one plain sentence, what would that sentence leave out?', 'Čo by v jednej jasnej vete o súčasnom smere tvojej práce chýbalo?'),
        ease: t('What in your working days belongs to the line you are on, and what only came along with it?', 'Čo z tvojich pracovných dní patrí k línii, ktorou ideš, a čo sa k nej len pripojilo?'),
        face: t('How would you describe where your work stands today if nobody else had to hear it?', 'Ako by znel opis toho, kde tvoja práca dnes stojí, keby ho nikto iný nemal čítať?'),
        weave: t('Which thread from how your work took shape still feels alive in what you do now?', 'Ktorá niť z toho, ako sa tvoja práca formovala, je stále živá v tom, čo robíš teraz?'),
    },
};
const obstacle = {
    id: 'work-career.obstacle',
    areaId: 'work-career',
    label: t('Understand an obstacle', 'Pochopiť prekážku'),
    focus: t('Hold in mind one obstacle in your work that keeps returning or keeps getting in the way.', 'Maj na mysli jednu prekážku v práci, ktorá sa vracia alebo ti stále stojí v ceste.'),
    semantics: {
        explores: t('what stands in the way at work and what keeps it there', 'čo stojí v práci v ceste a čo ju tam drží'),
        reflection: 'untangle',
        practical: 'try',
        forbids: ['predict-outcome', 'other-person-mind', 'financial-advice', 'legal-claim', 'health-claim', 'life-directive', 'fate-claim'],
    },
    spreadId: 'problem-cause-solution',
    category: 'career',
    guidance: 'unblock',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('Where it shows', 'Kde sa ukazuje'),
            ask: t('The point where the obstacle becomes visible in your work: a task, a meeting, a recurring delay.', 'Miesto, kde sa prekážka v tvojej práci stáva viditeľnou: úloha, porada, opakované zdržanie.'),
            frame: {
                steady: t('Day to day it tends to turn up in something small and specific: a task that stalls, a handover that goes missing, a meeting that circles.', 'Zvyčajne sa ukáže v niečom malom a konkrétnom: úloha sa zasekne, odovzdanie práce sa stratí, porada chodí dookola.'),
                strained: t('Here the obstacle tends to arrive with edges: it interrupts a task, a meeting or a deadline, and is hard to route around.', 'Prekážka sem zvykne prísť s ostrými hranami: preruší úlohu, poradu alebo termín a ťažko sa obchádza.')
            } },
        { label: t('What keeps it going', 'Čo ju udržiava'),
            ask: t('The pattern underneath that sustains it: a habit, a structure, an unspoken expectation or an unclear priority.', 'Vzorec pod povrchom, ktorý ju drží pri živote: zvyk, štruktúra, nevyslovené očakávanie alebo nejasná priorita.'),
            frame: {
                steady: t('Often what keeps an obstacle going is also useful: a habit, a safeguard or a way of working that once solved a real problem.', 'Prekážku často udržiava aj niečo užitočné: zvyk, poistka alebo spôsob práce, ktorý kedysi vyriešil skutočný problém.'),
                strained: t('Avoidance, haste or pressure tends to keep the pattern repeating, since looking at it directly would cost something.', 'Zhon, tlak alebo vyhýbanie sa zvyknú udržiavať vzorec pri živote, lebo priamy pohľad naň by niečo stál.')
            } },
        { label: t('A way of working with it', 'Ako s ňou pracovať'),
            ask: t('A stance that speaks to that pattern. It asks for a way of working, not for a result.', 'Postoj, ktorý na ten vzorec odpovedá. Ide o spôsob práce, nie o výsledok.'),
            frame: {
                steady: t('What fits here is a method, a pace or a kind of attention that meets the cause itself and not only the part that shows.', 'Sem sedí postup, tempo alebo druh pozornosti, ktoré sa dotýkajú samotnej príčiny, nielen toho, čo je navonok vidieť.'),
                strained: t('Effort tends to land against the pattern instead of alongside it, or arrives late or too hard, so the response adds to the pressure.', 'Úsilie zvykne dopadnúť proti vzorcu namiesto popri ňom, alebo príde neskoro či príliš tvrdo, takže odpoveď tlak skôr zvyšuje.')
            } },
    ],
    opening: t('This reading looks at an obstacle in your work. The first card is where it shows, the second the pattern underneath that keeps it going, and the third a way of working that speaks to it. It reads the situation, not people: nothing here says what anyone intends.', 'Toto čítanie sa pozerá na prekážku v tvojej práci. Prvá karta je miesto, kde sa ukazuje, druhá vzorec pod ňou, ktorý ju udržiava, a tretia spôsob práce, ktorý na ňu odpovedá. Číta situáciu, nie ľudí: nič tu nehovorí o úmysloch nikoho.'),
    takeaway: {
        act: t('A small, ordinary change in how the work is done could be enough: a task broken into parts, a request made plainly, a priority named.', 'Môže stačiť jedna drobná zmena v tom, ako sa práca robí: úloha rozdelená na časti, jasne vyslovená požiadavka, pomenovaná priorita.'),
        ease: t('This may be less about force than about room: a slower pace, fewer things held at once, and time for the stuck part to loosen.', 'Môže ísť menej o silu a viac o priestor: pomalšie tempo, menej vecí naraz a čas, aby sa zaseknutá časť uvoľnila.'),
        face: t('What may help here is describing the obstacle in plain terms of tasks and facts before trying to get past it.', 'Pomôcť môže opísať prekážku jednoduchou rečou úloh a faktov skôr, než sa ju pokúsiš obísť.'),
        weave: t('Coherence could matter most here: what is called a priority, what is scheduled and what actually gets done lining up in the same direction.', 'Najviac môže záležať na súlade: aby to, čo sa nazýva prioritou, čo je v pláne a čo sa naozaj robí, mierilo tým istým smerom.'),
    },
    closings: {
        act: t('Where in the work does the obstacle appear most often, and what is usually going on just before it?', 'Kde sa v práci táto prekážka objavuje najčastejšie a čo sa zvyčajne deje tesne pred ňou?'),
        ease: t('What does the pattern that keeps this going also give, and what would be missed if it loosened?', 'Čo ti vzorec, ktorý prekážku udržiava, zároveň dáva, a čo by ti chýbalo, keby povolil?'),
        face: t('What would shift in this obstacle if it were described as a problem of process rather than of ability?', 'Čo by sa na tejto prekážke zmenilo, keby sa chápala ako problém postupu, nie schopností?'),
        weave: t('Where do what you call a priority, what you schedule and what you do each day come apart?', 'Kde sa rozchádza to, čo nazývaš prioritou, to, čo máš v pláne, a to, čo naozaj robíš?'),
    },
};
const strengths = {
    id: 'work-career.strengths',
    areaId: 'work-career',
    label: t('Recognize my strengths', 'Rozpoznať svoje silné stránky'),
    focus: t('Hold in mind the work you do and the moments in it when things go well for you.', 'Maj na mysli prácu, ktorú robíš, a chvíle, keď ti v nej veci idú.'),
    semantics: {
        explores: t('the strengths you already bring to work and where they could be used', 'silné stránky, ktoré už do práce prinášaš, a miesta, kde by sa dali využiť'),
        reflection: 'resource',
        practical: 'name',
        forbids: ['predict-outcome', 'other-person-mind', 'financial-advice', 'life-directive', 'fate-claim'],
    },
    spreadId: 'resources-view',
    category: 'career',
    guidance: 'resources',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What you already carry', 'Čo už v sebe nosíš'),
            ask: t('The skills, habits and qualities you already bring to your work, whether or not anyone has named them.', 'Zručnosti, návyky a vlastnosti, ktoré do práce už prinášaš, či ich niekto pomenoval, alebo nie.'),
            frame: {
                steady: t('Much of it is so familiar that it goes unnoticed: skills, habits of care and ways of working that already shape how the work gets done.', 'Veľa z toho je natoľko povedomé, že to uniká pozornosti: zručnosti, zvyky starostlivosti a spôsoby práce, ktoré už tvarujú to, ako sa práca robí.'),
                strained: t('A strength can be used so hard or for so long that it becomes costly, or be overlooked because it seems too ordinary to count.', 'Silnú stránku možno používať tak intenzívne alebo tak dlho, že začne byť nákladná, alebo ju prehliadať, lebo sa zdá príliš obyčajná.')
            } },
        { label: t('What is within reach', 'Čo máš na dosah'),
            ask: t('What else is available to your work beyond what you already do: a capacity, a connection, a resource not yet in use.', 'Čo ďalšie je tvojej práci k dispozícii okrem toho, čo už robíš: schopnosť, kontakt, zdroj, ktorý ešte nie je v hre.'),
            frame: {
                steady: t('Just outside current practice is where this place looks: at a capacity not yet used, a connection not yet drawn on, a resource close at hand.', 'Tesne za hranicou súčasnej praxe sa toto miesto pozerá na schopnosť, ktorá sa ešte nepoužila, kontakt, na ktorý sa ešte nespoľahlo, alebo zdroj na dosah ruky.'),
                strained: t('What is nearby can still be hard to reach: a capacity that needs conditions not yet in place, or a resource held back by doubt or circumstance.', 'Nablízku môže byť aj niečo ťažko dosiahnuteľné: schopnosť, ktorá potrebuje zatiaľ chýbajúce podmienky, alebo zdroj, ktorý brzdia pochybnosti či okolnosti.')
            } },
        { label: t('Where to use it', 'Kde to uplatniť'),
            ask: t('The part of your work where these strengths could be applied, as a direction to try rather than a plan.', 'Miesto v tvojej práci, kde by sa tieto silné stránky dali uplatniť: smer na vyskúšanie, nie plán.'),
            frame: {
                steady: t('Fit is the question in this place: a kind of task, a setting or a way of contributing that matches what a strength is already good for.', 'Ide tu o súlad: o druh úloh, prostredie alebo spôsob prispievania, ktorý zodpovedá tomu, na čo sa silná stránka už hodí.'),
                strained: t('Mismatch tends to mark it: a real ability asked to work against the grain, or left with little room to be used.', 'Poznačiť ho môže nesúlad: skutočná schopnosť, ktorá má pracovať proti srsti alebo dostáva len málo priestoru.')
            } },
    ],
    opening: t('This reading looks at the strengths you bring to your work. The first card is what you already carry, the second what lies within reach beyond that, and the third where those strengths could be put to use.', 'Toto čítanie sa pozerá na silné stránky, ktoré prinášaš do svojej práce. Prvá karta je to, čo už v sebe nosíš, druhá to, čo je okrem toho na dosah, a tretia miesto, kde by sa tieto silné stránky dali využiť.'),
    takeaway: {
        act: t('A small, ordinary step could be to use one strength deliberately in one everyday task, and to notice how that task changes.', 'Malým, obyčajným krokom môže byť použiť jednu silnú stránku zámerne pri jednej bežnej úlohe a všimnúť si, ako sa úloha zmení.'),
        ease: t('A strength does not always need more output: it may ask to be used with less strain, in the kind of work it suits best.', 'Silná stránka nepotrebuje vždy viac výkonu: niekedy stačí používať ju s menším napätím, v práci, ktorá jej najviac sedí.'),
        face: t('What may help here is looking honestly at what goes well, without modesty or inflation, and saying it in plain words.', 'Pomôcť môže úprimne sa pozrieť na to, čo ti ide, bez skromničenia aj bez nafukovania, a povedať to obyčajnými slovami.'),
        weave: t('This may be about combining different strengths in one piece of work, so that skill, care and judgement show up together.', 'Môže ísť o spojenie rôznych silných stránok v jednej práci, aby sa zručnosť, starostlivosť a úsudok prejavili spolu.'),
    },
    closings: {
        act: t('Which strength could you use on purpose in one ordinary task this week?', 'Ktorá silná stránka by sa dala tento týždeň zámerne využiť pri jednej bežnej úlohe?'),
        ease: t('Where in your work do things go well with little effort, and what are you doing then?', 'Kedy ti v práci veci idú bez veľkého úsilia a čo práve robíš?'),
        face: t('Which strength do you use daily at work without ever counting it as one?', 'Ktorú svoju silnú stránku používaš v práci každý deň, hoci ju za silnú stránku nepovažuješ?'),
        weave: t('Which strength has proved useful in more than one kind of task, and what does that show about it?', 'Ktorá silná stránka sa ti osvedčila pri viacerých druhoch úloh a čo to o nej hovorí?'),
    },
};
const nextStep = {
    id: 'work-career.next-step',
    areaId: 'work-career',
    label: t('Reflect on a useful next step', 'Zamyslieť sa nad užitočným ďalším krokom'),
    focus: t('Hold in mind one piece of your work where you would like to move a step further.', 'Maj na mysli jednu oblasť svojej práce, v ktorej sa chceš pohnúť o krok ďalej.'),
    semantics: {
        explores: t('the situation at work as it is, a fitting response and where that response tends to lead', 'situáciu v práci takú, aká je, vhodnú odpoveď a to, kam zvykne viesť'),
        reflection: 'step',
        practical: 'try',
        forbids: ['predict-outcome', 'other-person-mind', 'financial-advice', 'legal-claim', 'life-directive', 'fate-claim'],
    },
    spreadId: 'situation-action-outcome',
    category: 'action-guidance',
    guidance: 'act',
    temporal: 'future',
    relationshipType: null,
    places: [
        { label: t('The situation as it is', 'Situácia taká, aká je'),
            ask: t('Where your work stands in this matter right now, described plainly, without hope or worry added.', 'Kde práca v tejto veci práve stojí, opísané jednoducho, bez pridanej nádeje či obáv.'),
            frame: {
                steady: t('Seen in practice, it is a mix of what is finished, what is half-done and what has simply not been decided yet.', 'Prakticky je to zmes toho, čo je hotové, čo je rozrobené a o čom sa jednoducho ešte nerozhodlo.'),
                strained: t('Weight gathers around any first move: something left undone, something unclear, and a step that feels heavier than it looks.', 'Okolo prvého kroku sa zhromažďuje váha: niečo nedokončené, niečo nejasné a krok, ktorý pôsobí ťažšie, než vyzerá.')
            } },
        { label: t('A fitting response', 'Vhodná odpoveď'),
            ask: t('A small, ordinary move that suits the situation as it is, one that is within your own hands.', 'Malý, obyčajný krok, ktorý sedí na situáciu takú, aká je, a ktorý je v tvojich rukách.'),
            frame: {
                steady: t('A response fits when it is small enough to be one’s own, shaped by what the situation actually asks and not by a wish to be done with it.', 'Odpoveď sedí, keď je dosť malá na to, aby bola vlastná, a tvaruje ju to, čo situácia naozaj žiada, nie túžba mať to z krku.'),
                strained: t('Haste, pressure or reluctance can drive the response, so a move is made to relieve tension and not to suit what is actually there.', 'Odpoveď môže hnať zhon, tlak alebo neochota, takže sa krok urobí na uvoľnenie napätia, nie aby sedel na to, čo tu naozaj je.')
            } },
        { label: t('Where it tends to lead', 'Kam to zvykne viesť'),
            ask: t('The direction such a move tends to open up: a tendency to look at, never a promise.', 'Smer, ktorý takýto krok zvykne otvárať: tendencia na pozorovanie, nikdy sľub.'),
            frame: {
                steady: t('What the move leans toward is the point here: what it opens up and what it sets aside, offered as a direction to watch and not as an outcome.', 'Tu ide o to, ku čomu sa krok kloní: čo otvára a čo necháva bokom, ako smer na sledovanie, nie ako výsledok.'),
                strained: t('A cost comes into view in this place: what a response may close off, strain or put back, worth seeing before a step is chosen.', 'Na tomto mieste vystupuje do popredia cena: čo môže odpoveď uzavrieť, zaťažiť alebo odložiť, a stojí za to vidieť to ešte pred výberom kroku.')
            } },
    ],
    opening: t('This reading looks at a useful next step in your work. The first card is the situation as it is, the second a response that fits it, and the third where that response tends to lead: a direction to look at, not a promise.', 'Toto čítanie sa pozerá na užitočný ďalší krok v tvojej práci. Prvá karta je situácia taká, aká je, druhá odpoveď, ktorá k nej sedí, a tretia to, kam táto odpoveď zvykne viesť: smer na pozorovanie, nie sľub.'),
    takeaway: {
        act: t('A small, ordinary version of the step can be enough: one email drafted, one question asked, one hour set aside for it.', 'Môže stačiť malá, obyčajná podoba kroku: jeden rozpísaný e-mail, jedna položená otázka, jedna hodina vyhradená na to.'),
        ease: t('The useful step may be to prepare rather than to act: gathering what is missing and letting the right moment become clear.', 'Užitočným krokom môže byť skôr príprava než konanie: zozbierať, čo chýba, a nechať moment, aby sa vyjasnil.'),
        face: t('What may help here is seeing the situation squarely first: what has been done, what has not, and what is actually yours to decide.', 'Pomôcť môže najprv sa na situáciu pozrieť priamo: čo sa urobilo, čo nie a čo je naozaj na tebe.'),
        weave: t('It may come down to fitting the step to the whole, so that it serves the craft, the people involved and your own limits at once.', 'Môže ísť o to, aby krok zapadol do celku a slúžil zároveň remeslu, ľuďom, ktorých sa týka, aj tvojim hraniciam.'),
    },
    closings: {
        act: t('Which step, however small, would feel like yours to take?', 'Ktorý krok, hoci aj malý, by sa ti zdal naozaj tvoj?'),
        ease: t('What do you already have in hand for this step, and what is still missing?', 'Čo už na tento krok máš po ruke a čo ešte chýba?'),
        face: t('What would make this step fit the situation as it really is?', 'Čo by pomohlo, aby tento krok sedel na situáciu takú, aká naozaj je?'),
        weave: t('How would this step sit alongside the craft, the people involved and your own limits?', 'Ako by tento krok zapadol medzi remeslo, ľudí, ktorých sa týka, a tvoje vlastné hranice?'),
    },
};
export const WORK_AREA = {
    id: 'work-career',
    label: t('Work & Career', 'Práca a kariéra'),
    blurb: t('Direction, craft and contribution, and what stands in their way.', 'Smerovanie, remeslo a prínos, ale aj to, čo im stojí v ceste.'),
    scope: t('vocation and working life as activity, not money', 'povolanie a pracovný život ako činnosť, nie peniaze'),
    intentions: [direction, obstacle, strengths, nextStep],
    lens,
};
