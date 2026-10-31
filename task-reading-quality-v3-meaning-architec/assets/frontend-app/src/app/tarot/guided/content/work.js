/**
 * WORK AND CAREER - vocation and professional life as ACTIVITY.
 *
 * This area owns direction, craft, contribution, recognition, obstacles, colleagues as part of the work, and where effort and
 * priorities go. It does not own money or security (Finances), the inner life (Personal growth) or a decision to leave a job
 * (Life changes). Whatever is said of a colleague or an organisation is a stance, never what a person thinks or intends.
 *
 * Round 2: every lens table has a steady register and a strained register; each place carries a frame written for its own
 * intention; trend lines describe the quality of a pull (what it favours, what it leaves out), never a forecast; arc lines
 * describe the shape of the order of cards, never an event at work.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    stage: {
        'sets-something-beginning': [
            t('A beginning at work tends to look modest: a first draft, an idea said aloud in a meeting, a task taken on before anyone calls it a role.', 'Začiatok v práci zvykne vyzerať skromne: prvý návrh, nápad povedaný nahlas na porade, úloha prevzatá skôr, než ju niekto nazve rolou.'),
            t('New work often starts as curiosity about a problem nobody owns yet, well before it has a title, a plan or a place in the calendar.', 'Nová práca často začína zvedavosťou k problému, ktorý ešte nikto nemá na starosti, dávno pred tým, než dostane názov, plán alebo miesto v kalendári.'),
        ],
        'sustains-an-effort': [
            t('Most working life is sustained effort that goes largely unremarked: the plain middle of a project, where progress is measured in finished tasks rather than praise.', 'Väčšinu pracovného života tvorí vytrvalé úsilie, ktorého si takmer nikto nevšimne: nenápadný stred projektu, kde sa pokrok meria dokončenými úlohami, nie pochvalou.'),
            t('Craft is built by repetition: the same task done again with slightly more care, until it stops being effort and becomes skill.', 'Remeslo sa buduje opakovaním: tá istá úloha robená znova s o niečo väčšou starostlivosťou, kým sa z námahy nestane zručnosť.'),
        ],
        'holds-still': [
            t('A pause at work can be a plateau, where the routine runs and little changes, or a quiet stretch in which the next direction is still settling.', 'Pauza v práci môže byť plošina, kde všetko beží podľa zabehnutého a málo sa mení, alebo pokojný úsek, v ktorom sa ešte usádza ďalší smer.'),
            t('Standing still at work can look like rest between projects or like a rut grown familiar, and from the inside the two are easy to confuse.', 'Státie na mieste v práci môže vyzerať ako oddych medzi projektmi alebo ako vyjazdená koľaj, ktorá sa stala povedomou, a zvnútra sa tie dve ľahko zamieňajú.'),
        ],
        'stands-at-full-extent': [
            t('A working life at full stretch shows its real shape: what it has built, what it demands, and how much of a person it uses.', 'Pracovný život v plnom rozmachu ukazuje svoj skutočný tvar: čo vybudoval, čo si žiada a koľko z človeka spotrebúva.'),
            t('Work at its peak is a result to look at and also a load to carry, and both belong to the picture.', 'Práca na vrchole je výsledok, na ktorý sa dá pozerať, a zároveň záťaž, ktorú treba niesť; k obrazu patrí oboje.'),
        ],
        'is-mid-transition': [
            t('A working life in transition feels like standing between roles: the old way of doing things is loosening and the new one has no clear outline yet.', 'Pracovný život v premene pripomína státie medzi rolami: starý spôsob práce sa uvoľňuje a nový ešte nemá jasný obrys.'),
            t('Mid-transition at work often means a job description that no longer matches the day, and a day that has not yet found its new description.', 'Premena v práci často znamená pracovnú náplň, ktorá už nesedí na skutočný deň, a deň, ktorý ešte nenašiel novú náplň.'),
        ],
        'is-being-broken-into': [
            t('When something breaks into work (a failed plan, a sudden reorganisation, a mistake come to light) it shows what the structure was resting on.', 'Keď do práce vtrhne niečo náhle (zlyhaný plán, nečakaná reorganizácia, odhalená chyba), ukáže sa, na čom celá stavba stála.'),
            t('A disruption at work tends to expose which processes were solid and which only looked that way, and who had been quietly holding the gaps together.', 'Narušenie v práci zvykne odhaliť, ktoré postupy boli pevné a ktoré len tak vyzerali, a kto ticho držal pohromade medzery.'),
        ],
        'is-letting-go': [
            t('Letting go at work can mean setting down a title, a project that has run its course, or a standard of perfection nobody asked for.', 'Pustiť v práci môže znamenať odložiť titul, projekt, ktorý doslúžil, alebo štandard dokonalosti, ktorý si nikto nevyžiadal.'),
            t('What is being put down in a working life is often an old picture of success, or a role worn so long it began to feel like identity.', 'To, čo sa v pracovnom živote odkladá, je často starý obraz úspechu alebo rola nosená tak dlho, že sa začala podobať na identitu.'),
        ],
        'is-coming-together': [
            t('Where work comes together, separate skills, tasks and colleagues begin to fit: the project holds as a whole and nobody has to do everything.', 'Tam, kde sa práca spája, začínajú do seba zapadať oddelené zručnosti, úlohy aj kolegovia: projekt drží ako celok a nikto nemusí robiť všetko.'),
            t('A working life comes together when what a person is good at, what the work needs and what matters to them start pointing at the same place.', 'Pracovný život sa skladá dokopy, keď to, v čom je človek dobrý, to, čo práca potrebuje, a to, na čom mu záleží, začnú mieriť na to isté miesto.'),
        ],
    },
    stance: {
        continue: [
            t('Continuing tends to look like protecting what already works: a routine, a standard, a way of finishing things, kept up rather than reinvented.', 'Pokračovanie zvykne vyzerať ako ochrana toho, čo už funguje (rutina, štandard, spôsob dokončovania vecí), namiesto vymýšľania odznova.'),
            t('Steadiness is a quiet craft of its own: consistency doing, week after week, what bursts of effort cannot.', 'Stálosť je vlastné tiché remeslo: dôslednosť, ktorá týždeň po týždni zvládne to, čo návaly úsilia nezvládnu.'),
        ],
        redirect: [
            t('Redirecting tends to keep the commitment and change the route: another method, another role within the same project, another way of asking for what is needed.', 'Zmena smeru zvykne ponechať záväzok a zmeniť cestu: iný postup, iná úloha v tom istom projekte, iný spôsob, ako požiadať o potrebné.'),
            t('It is a turn in approach rather than in purpose: the same aim, reached through the door that is actually open.', 'Je to zmena prístupu, nie zámeru: ten istý cieľ, dosiahnutý cez dvere, ktoré sú naozaj otvorené.'),
        ],
        'let-go': [
            t('Letting go at work tends to mean setting down what is no longer one’s own: a task that has moved on, the need to control every detail, a standard that only exhausts.', 'Pustenie v práci zvykne znamenať odložiť to, čo už nepatrí k tejto práci: úlohu, ktorá sa posunula inam, potrebu mať pod kontrolou každý detail, nároky, ktoré len vyčerpávajú.'),
            t('An old way of working, or the hope that effort alone gets noticed, can be released, and attention then has somewhere new to go.', 'Starý spôsob práce alebo nádej, že si samotné úsilie niekto všimne, sa dá pustiť a pozornosť sa potom môže obrátiť k tomu, čo je skutočne pred tebou.'),
        ],
        moderate: [
            t('Here that means moderating the pace: fewer commitments held at once, and room for the work to be done well rather than only done.', 'Zmierňovanie sa zvyčajne týka tempa: menej záväzkov naraz a priestor, aby sa práca dala urobiť poriadne, nielen stihnúť.'),
            t('Proportion is the point: neither pushing past what a day can hold nor pulling back from it, but giving each task the weight that fits.', 'Ide o primeranosť: netlačiť za hranicu toho, čo deň unesie, ani sa mu nevyhýbať, ale dať každej úlohe váhu, ktorá jej patrí.'),
        ],
        'meet-it': [
            t('Facing it tends to mean looking at what is actually going on in the work rather than managing around it: the missed target, the stalled project, the conversation put off.', 'Čeliť tomu zvyčajne znamená pozerať sa na to, čo sa v práci naozaj deje, namiesto obchádzania: zmeškaný cieľ, zaseknutý projekt, odkladaný rozhovor.'),
            t('Done plainly, it is naming the real problem in terms of tasks and facts, and staying with it long enough to understand it.', 'V najjednoduchšej podobe je to pomenovať skutočný problém v reči úloh a faktov a zotrvať pri ňom dosť dlho, aby sa mu dalo porozumieť.'),
        ],
        wait: [
            t('Some work cannot be hurried: a decision not yet ripe, an answer that has not arrived, a skill that needs more time to settle.', 'Niektorá práca sa nedá uponáhľať: rozhodnutie, ktoré ešte nedozrelo, odpoveď, ktorá nedorazila, zručnosť, ktorá potrebuje viac času, aby sa usadila.'),
            t('Patience at work is not idleness: ordinary tasks carry on while the larger picture clears, without pressure to hurry it.', 'Trpezlivosť v práci nie je nečinnosť: bežné úlohy idú ďalej, kým sa väčší obraz vyjasňuje, bez nátlaku na jeho zrýchlenie.'),
        ],
        choose: [
            t('Work sometimes narrows to a clear choice about where attention goes, and a choosing stance means making it knowingly rather than by default.', 'Práca sa niekedy zúži na jasnú voľbu, kam smeruje pozornosť, a postoj voľby znamená urobiť ju vedome, nie zo zvyku.'),
            t('The choice is often less about the job than about which kind of work, effort or contribution deserves the best hours of the day.', 'Voľba sa často netýka ani tak zamestnania, ako toho, ktorý druh práce, úsilia či príspevku si zaslúži najlepšie hodiny dňa.'),
        ],
        integrate: [
            t('Integrating tends to mean joining the pieces of a working life (skills, values, daily tasks) so that they stop pulling in separate directions.', 'Zjednotenie zvyčajne znamená poskladať súčasti pracovného života (zručnosti, hodnoty, každodenné úlohy) tak, aby nemierili každá inam.'),
            t('It shows when what gets done all day and what is cared about begin to read as one portrait.', 'Prejavuje sa vtedy, keď to, čo sa robí celý deň, a to, na čom záleží, začnú tvoriť jeden obraz.'),
        ],
        'attend-to-it': [
            t('Attending tends to mean watching rather than fixing: how the days actually go, before judging what, if anything, needs to change.', 'Venovať tomu pozornosť zvyčajne znamená skôr pozorovať než opravovať: ako dni naozaj plynú, skôr než sa posúdi, či sa vôbec niečo má meniť.'),
            t('What attention picks up is often specific: where effort drains away, which tasks keep returning, when the work feels like one’s own.', 'To, čo pozornosť zachytí, je často konkrétne: kde ubúda sila, ktoré úlohy sa vracajú, kedy sa práca zdá vlastná.'),
        ],
    },
    trend: {
        expanding: t('Reach marks this pull: taking in more of the work and being seen doing it, while leaving open what that wider stretch costs.', 'Rozširovanie sa tu vyznačuje dosahom: zaberať viac z práce a byť pri tom vidieť, pričom otvorené zostáva, čo takýto záber stojí.'),
        contracting: t('Narrowing has its own appeal: a tighter focus and a smaller circle of what is truly done, though it can also leave out things that mattered.', 'Zužovanie má vlastnú príťažlivosť: užšie zameranie a menší okruh toho, čo sa naozaj robí, hoci môže vynechať aj veci, na ktorých záležalo.'),
        stabilising: t('What can be relied on draws this pull: routines and ways of working that hold, though that can leave little room for the unplanned.', 'Stabilizácia siaha po tom, na čo sa dá spoľahnúť: po rutinách a postupoch, ktoré držia, hoci to môže nechať málo miesta pre neplánované.'),
        disrupting: t('A quality of unsettling runs through this pull: the working order is questioned, and what looked fixed may prove open to negotiation.', 'Rozrušenie dáva tomuto smerovaniu ráz: pracovný poriadok sa spochybňuje a to, čo vyzeralo pevne, sa môže ukázať ako vyjednateľné.'),
        redirecting: t('Here the pull bends sideways rather than forward: another shape of contribution, another focus, and the old role looked at again.', 'Smerovanie sa tu ohýba skôr nabok než dopredu: iná podoba príspevku, iné zameranie a stará rola, na ktorú sa pozerá nanovo.'),
        resolving: t('Closure is what this pull favours: a leaning toward answered questions and gathered loose ends, with less room for what is not yet finished.', 'Táto tendencia dáva prednosť uzavretiu: sklon k zodpovedaným otázkam a zozbieraným voľným koncom, s menším priestorom pre to, čo ešte nie je hotové.'),
        suspended: t('An in-between quality marks this pull: the work is held open, neither settled nor dropped, and attention has little to fasten on yet.', 'Medzistav je pre tento sklon príznačný: práca zostáva otvorená, ani usadená, ani odložená, a pozornosť sa zatiaľ nemá čoho chytiť.'),
    },
    arc: {
        continuation: t('Read in order, the cards make one steady line: the same craft, pace and direction carried from one place to the next.', 'Čítané v poradí sa karty dajú vnímať ako rovnomerná línia: to isté remeslo, tempo a smer prenesené z jedného miesta na druhé.'),
        escalation: t('Taken in sequence, the cards gather intensity, each place carrying a little more weight than the one before.', 'Brané v poradí sa karty dajú čítať ako stupňujúca sa intenzita, pričom každé miesto nesie o niečo väčšiu váhu než predchádzajúce.'),
        interruption: t('Partway through, a working rhythm is cut across, which leaves open what the break shows about how the work is arranged.', 'V poradí sa karty dajú vnímať ako rytmus, ktorý sa v polovici pretne, a to necháva otvorené, čo toto prerušenie hovorí o usporiadaní práce.'),
        'breakdown-to-recovery': t('In order, the cards move from strain toward what may be a more workable footing, leaving open what to keep from the earlier arrangement.', 'Čítané v poradí sa karty dajú vnímať ako tvar, v ktorom môže napätie ustúpiť použiteľnejšiemu základu, pričom otvorená ostáva otázka, čo si zo skoršieho usporiadania ponechať.'),
        'expansion-to-limit': t('Taken in sequence, the cards show growth meeting an edge, which raises the question of capacity, time and what is worth the effort.', 'Brané v poradí sa karty dajú vnímať ako rast, ktorý narazí na hranicu, a tento tvar otvára pohľad na kapacitu, čas a to, čo za námahu stojí.'),
        'stasis-to-movement': t('Read in order, the cards move from a fixed, repetitive stretch toward a first loosening, where an angle or a pace could start to differ.', 'Čítané v poradí sa karty dajú vnímať ako pevný, opakujúci sa úsek, ktorý sa môže začať uvoľňovať: tvar, v ktorom sa uhol pohľadu alebo tempo môžu začať líšiť.'),
        'conflict-to-integration': t('Laid out in order, competing pulls may settle into a more workable whole, with the demands ordered rather than erased.', 'V poradí sa karty dajú vnímať ako protichodné sklony, ktoré sa môžu usadiť do použiteľnejšieho celku, v ktorom by sa nároky zoradili, nie vymazali.'),
        'opening-to-choice': t('Read in order, an opening narrows toward a point of weighing, where a question of direction or priority comes into focus.', 'Čítané v poradí sa karty dajú vnímať ako otvorenie, ktoré sa zužuje k bodu zvažovania, v ktorom vystupuje do popredia otázka smeru alebo priorít.'),
        'holding-to-release': t('Taken in sequence, a grip may gradually loosen: something held tightly, such as a role, a standard or an effort, held more lightly by the end.', 'Brané v poradí sa karty dajú vnímať ako zovretie, ktoré môže postupne povoliť: niečo držané pevne, napríklad rola, štandard alebo úsilie, sa na konci možno drží voľnejšie.'),
        'uncertainty-to-clarity': t('Read in order, a haze may give way to something that can be named, and the picture of the work becomes easier to put into words.', 'Čítané v poradí sa karty dajú vnímať ako hmla, ktorá môže postupne ustúpiť niečomu pomenovateľnému: tvar, v ktorom by sa obraz práce dal ľahšie vyjadriť slovami.'),
        'stability-to-disruption': t('Laid out in order, a settled arrangement meets a shock, which opens the question of what the steadiness rested on.', 'V poradí sa karty dajú vnímať ako ustálené usporiadanie, ktoré narazí na otras, a tento tvar otvára otázku, na čom tá ustálenosť stála.'),
        redirection: t('Read in order, the path bends: effort carries on but aims at a different horizon from the one it started with.', 'Čítané v poradí sa karty dajú vnímať ako zákruta cesty: úsilie, ktoré pokračuje, no mieri k inému obzoru než na začiatku.'),
    },
    alignment: {
        aligned: t('The two cards lean the same way, which in working matters can mean less adjusting and more of a fit that is already in place.', 'Obe karty sa nakláňajú rovnakým smerom, čo v pracovných veciach môže znamenať menej prispôsobovania a viac súladu, ktorý už existuje.'),
        complementary: t('The two cards differ but fit, like strengths that cover each other’s gaps.', 'Obe karty sa líšia, ale zapadajú do seba, ako silné stránky, ktoré pokrývajú navzájom svoje medzery.'),
        opposed: t('The two cards pull in different directions, as priorities and expectations sometimes do at work, and what sits between them shows what that tension passes through.', 'Obe karty mieria opačným smerom, ako to v práci niekedy robia priority a očakávania, a to, čo je medzi nimi, ukazuje, cez čo toto napätie prechádza.'),
        apart: t('The two cards seem to concern different matters altogether, so common ground may start with asking what the work is for.', 'Zdá sa, že obe karty sa týkajú úplne odlišných vecí, takže spoločná pôda môže začať otázkou, načo práca slúži.'),
    },
    suit: {
        wands: t('Wands bring initiative to work: drive, ambition, the spark of a new project and the stamina to see it through.', 'Palice prinášajú do práce iniciatívu: zápal, ambíciu, iskru nového projektu a výdrž dotiahnuť ho do konca.'),
        cups: t('Cups carry the meaning of work: what feels worthwhile, how people care for one another, and how the work sits with one’s values.', 'Poháre nesú zmysel práce: čo sa zdá hodnotné, ako sa ľudia o seba starajú a ako práca ladí s hodnotami.'),
        swords: t('Swords speak of thinking and communication at work: clear analysis, honest feedback, decisions, and the words that cut through confusion.', 'Meče hovoria o myslení a komunikácii v práci: o jasnej analýze, úprimnej spätnej väzbe, rozhodnutiach a slovách, ktoré prerežú zmätok.'),
        pentacles: t('Pentacles ground work in craft: skill built over time, dependable output, tools, schedules and the patient shaping of something that lasts.', 'Mince zakotvujú prácu v remesle: v zručnosti budovanej časom, spoľahlivom výsledku, nástrojoch, rozvrhu a trpezlivom tvarovaní niečoho trvalého.'),
    },
    strained: {
        stage: {
            'sets-something-beginning': t('A beginning that goes hard at work tends to be a start without footing: an idea half-heard, a task taken on without the time or backing it needs.', 'Začiatok, ktorý v práci ide ťažko, zvykne byť štart bez opory: nápad, ktorý nikto celkom nepočul, alebo úloha prevzatá bez času a zázemia, ktoré potrebuje.'),
            'sustains-an-effort': t('Sustained effort under strain tends to look like a long middle with little return: tasks piling up, care wearing thin, and the work carried more by habit than by interest.', 'Vytrvalé úsilie v napätí zvykne vyzerať ako dlhý stred bez návratnosti: úlohy sa hromadia, starostlivosť sa tenčí a práca sa nesie skôr zo zvyku než zo záujmu.'),
            'holds-still': t('A pause that goes hard at work tends to feel like being stuck: the same tasks, the same meeting, and a sense that the standstill is not a rest.', 'Pauza, ktorá v práci ide ťažko, sa zvykne pociťovať ako uviaznutie: tie isté úlohy, tá istá porada a dojem, že tento stav nie je oddych.'),
            'stands-at-full-extent': t('Full extent under strain tends to mean overstretch: a working life at its limit, where what it has built asks more than a person has to give.', 'Plný rozsah pri záťaži zvykne znamenať presiahnutie síl: pracovný život na hranici, kde to, čo vybudoval, žiada viac, než sa dá dať.'),
            'is-mid-transition': t('A transition that goes hard tends to feel like standing between roles with neither one fitting: the old way is gone from the day and the new one is not yet usable.', 'Premena, ktorá ide ťažko, zvykne pôsobiť ako stav medzi rolami, z ktorých ani jedna nesedí: starý spôsob zo dňa zmizol a nový sa ešte nedá používať.'),
            'is-being-broken-into': t('When the break-in is hard, work tends to feel shaken at its base: a plan that failed, a structure that gave way, and the sorting of what still holds.', 'Keď je narušenie tvrdé, práca sa zvykne cítiť otrasená v základoch: zlyhaný plán, štruktúra, ktorá povolila, a triedenie toho, čo ešte drží.'),
            'is-letting-go': t('Letting go under strain tends to feel like a loss rather than a release: a role, a project or an image of success gone before it could be set down.', 'Pustenie v napätí zvykne pôsobiť skôr ako strata než ako úľava: rola, projekt alebo obraz úspechu, ktoré sa stratili skôr, než ich bolo možné odložiť.'),
            'is-coming-together': t('Coming together under strain tends to be forced or partial: pieces pressed into a fit, with skills, tasks and colleagues still pulling at the seams.', 'Spájanie pri záťaži zvykne byť vynútené alebo len čiastočné: kúsky natlačené do súladu, pričom zručnosti, úlohy aj kolegovia ešte napínajú švy.'),
        },
        stance: {
            continue: t('Continuing under strain tends to be persistence on a route that tires the person out: the same pace kept up from momentum rather than because it still serves.', 'Pokračovanie, keď to ide ťažko, zvykne byť vytrvávanie na trase, ktorá unavuje: rovnaké tempo držané zo zotrvačnosti, nie preto, že ešte slúži.'),
            redirect: t('A forced redirect tends to look like a turn made in reaction, away from something rather than toward something, with the new route not yet tested.', 'Vynútená zmena smeru zvykne vyzerať ako odbočka z reakcie, preč od niečoho a nie k niečomu, pričom nová cesta nie je ešte vyskúšaná.'),
            'let-go': t('Letting go that is resisted tends to look like a grip tightening on a task, a title or a standard, where every detail seems necessary and releasing any of it feels like failing.', 'Odmietané pustenie zvykne vyzerať ako zovretie, ktoré sa pri úlohe, tituli alebo štandarde ešte sprísňuje: každý detail sa zdá nevyhnutný a pustiť čokoľvek pôsobí ako zlyhanie.'),
            moderate: t('Moderation under strain tends to be lost balance: pace swinging between pushing too hard and withdrawing, with no steady measure of what a day can hold.', 'Miera pri záťaži zvykne byť stratená rovnováha: tempo sa kýve medzi príliš tvrdým tlačením a ústupom a chýba stála miera toho, čo deň unesie.'),
            'meet-it': t('Facing it when it is hard tends to mean meeting what was avoided for some time: the missed target, the stalled project, the conversation that kept being put off.', 'Čeliť tomu, keď je to ťažké, zvykne znamenať stretnutie s tým, čomu sa dlho vyhýbalo: zmeškaný cieľ, zaseknutý projekt, rozhovor, ktorý sa stále odkladal.'),
            wait: t('Forced waiting tends to feel like limbo: decisions that depend on timing or on others, tasks that cannot move, and patience that is mostly being used up.', 'Vynútené čakanie zvykne pôsobiť ako medzistav: rozhodnutia, ktoré závisia od načasovania alebo od iných, úlohy, ktoré sa nehnú, a trpezlivosť, ktorá sa väčšinou len míňa.'),
            choose: t('A choice under strain tends to feel like a fork where every branch costs something, with attention pulled between two kinds of work and neither easily set aside.', 'Voľba v napätí zvykne pôsobiť ako rázcestie, kde každá vetva niečo stojí, a pozornosť sa trhá medzi dvoma druhmi práce, z ktorých ani jeden sa ľahko neodloží.'),
            integrate: t('Integration under strain tends to be a juggling act: skills, values and daily tasks held together by effort alone, with the seams showing whenever attention slips.', 'Zjednotenie, keď to ide ťažko, zvykne byť žonglovanie: zručnosti, hodnoty a každodenné úlohy držané pokope len úsilím a švy je vidieť vždy, keď pozornosť povolí.'),
            'attend-to-it': t('Attention under strain tends to be unwelcome noticing: the drained hours, the tasks that keep returning, and the sense that the work has stopped feeling like one’s own.', 'Pozornosť pri záťaži zvykne byť nevítané všímanie si: vyčerpané hodiny, úlohy, ktoré sa stále vracajú, a dojem, že práca prestala byť vlastná.'),
        },
        trend: {
            expanding: t('A pull toward more that goes hard tends to be overreach: wider scope taken on faster than it can be carried, with the strain showing before the benefit does.', 'Sklon k väčšiemu, ktorý ide ťažko, zvykne byť presah: širší záber prevzatý rýchlejšie, než sa dá uniesť, a záťaž je vidieť skôr než prínos.'),
            contracting: t('A narrowing that bites tends to feel like losing ground: a smaller circle of work, fewer places to contribute, and a sense of being edged out rather than focused.', 'Zužovanie, ktoré tlačí, zvykne pôsobiť ako strata terénu: menší okruh práce, menej miest, kde prispievať, a pocit vytláčania namiesto sústredenia.'),
            stabilising: t('Settling that has gone stiff tends to be rigidity: routines kept because they are routines, and little give when the work asks for something different.', 'Usadenie, ktoré stuhlo, zvykne byť strnulosť: rutiny držané len preto, že sú rutiny, a málo pružnosti, keď práca žiada niečo iné.'),
            disrupting: t('A disruption that breaks through tends to feel abrupt: plans scattered, familiar structures failing to hold, and a working order pieced together from what is left.', 'Narušenie, ktoré sa prelomí, zvykne pôsobiť náhle: rozptýlené plány, známe štruktúry, ktoré nedržia, a pracovný poriadok poskladaný z toho, čo zostalo.'),
            redirecting: t('A forced bend in the path tends to feel like a detour nobody chose: role or focus renegotiated under pressure, with the reasons not yet clear.', 'Vynútená zákruta cesty zvykne pôsobiť ako obchádzka, ktorú si nikto nevybral: rola alebo zameranie sa prehodnocujú v napätí a dôvody nie sú zatiaľ jasné.'),
            resolving: t('A resolution under strain tends to be closure by exhaustion or haste: things ended to be done with them, and questions left that the finish did not answer.', 'Uzavretie pri záťaži zvykne byť ukončenie z vyčerpania alebo zo zhonu: veci sa dokončia, aby boli preč, a otázky, na ktoré koniec neodpovedal, zostávajú.'),
            suspended: t('A suspension that drags tends to weigh on the work: decisions deferred, projects half-open, and a long wait in which effort has nowhere settled to go.', 'Pozastavenie, ktoré sa naťahuje, zvykne zaťažovať prácu: odložené rozhodnutia, polootvorené projekty a dlhé čakanie, v ktorom úsilie nemá kam sa usadiť.'),
        },
    },
    weighing: t('Two pulls at work (the familiar way and a new one, depth and speed) rarely settle by one winning outright; they tend to ease when each has a place of its own.', 'Dve pohnútky v práci (známy spôsob a nový, hĺbka a rýchlosť) sa málokedy vyriešia víťazstvom jednej; zvyknú sa upokojiť, keď má každá svoje miesto.'),
    layers: t('Work rests on three things at once: what is practically done, what is thought and felt about it, and what it means to the person doing it. It is steadiest when none is left out.', 'Práca stojí na troch veciach naraz: na tom, čo sa prakticky robí, čo si o nej človek myslí a cíti a čo mu znamená. Najpevnejšia je, keď žiadna z nich nechýba.'),
    majorWeight: t('Major cards in the lead suggest a theme that matters more than a passing task.', 'Keď v trojici prevládajú Veľké arkány, vec zvykne siahať za každodenné úlohy a dotýkať sa niečoho trvalejšieho v tom, ako sa chápe povolanie.'),
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
                steady: t('Some early influence still serves the work: a choice, a lesson or an example that quietly set the line it has followed.', 'Patria sem formujúce vplyvy, ktoré stále slúžia: skorá voľba, lekcia alebo príklad, ktorý ticho vytýčil líniu, po ktorej práca išla.'),
                strained: t('Under strain, the early influence is one that left a mark: a pressure, an expectation taken on too soon, or a hasty turn the work still carries.', 'Pri záťaži tu zvykne byť vplyv, ktorý zanechal stopu: skorý tlak, očakávanie prevzaté príliš včas alebo unáhlená zákruta, ktorú práca stále nesie.')
            } },
        { label: t('Where it stands', 'Kde teraz stojí'),
            ask: t('The work as it is now: what you do, how it feels to do it, and what it asks of you.', 'Práca taká, aká je teraz: čo robíš, aké je to ju robiť a čo si od teba pýta.'),
            frame: {
                steady: t('This is the work as it is lived now: what has settled into a daily way of doing it, and what the present stretch asks and gives.', 'Témou je práca tak, ako sa žije teraz: čo sa usadilo do každodenného spôsobu práce a čo súčasný úsek žiada a dáva.'),
                strained: t('When it goes hard, the present stretch pushes against the person: a gap between what the work asks and what is available, felt in ordinary days.', 'Keď to ide ťažko, súčasný úsek tlačí proti človeku: rozdiel medzi tým, čo práca žiada, a tým, čo je k dispozícii, sa prejavuje v bežných dňoch.')
            } },
        { label: t('Where it tends', 'Kam smeruje'),
            ask: t('The way the work tends to lead if the present dynamic carries on: a tendency to look at, not a promise.', 'Smer, ktorým by práca mohla viesť, ak súčasná dynamika pokračuje: tendencia na pozorovanie, nie sľub.'),
            frame: {
                steady: t('What matters here is what the present line carries forward: what it favours and what it leaves out, as a tendency and not an outcome.', 'Tu ide o kvalitu, ktorú súčasná línia nesie ďalej: čo uprednostňuje a čo vynecháva, chápané ako sklon, nie ako výsledok.'),
                strained: t('The concern is hardening or fraying: what carrying on exactly as things are could cost, held as a possibility only.', 'Na tomto mieste ide o zatvrdnutie alebo rozstrapkanie: o cenu pokračovania presne tak, ako veci sú, chápanú len ako možnosť.')
            } },
    ],
    opening: t('This reading looks at the direction your work is taking. The first card is what shaped it, the second where it stands now, and the third where it tends to lead if the present dynamic continues: a tendency, not a promise.', 'Toto čítanie sa pozerá na smer, ktorým sa uberá tvoja práca. Prvá karta je to, čo ju formovalo, druhá miesto, kde teraz stojí, a tretia to, kam by mohla viesť, ak súčasná dynamika pokračuje: ide o sklon, nie o sľub.'),
    takeaway: {
        act: t('Putting the present direction into one plain sentence, and noticing which of this week’s tasks actually serve it, can be enough.', 'Môže stačiť vyjadriť súčasný smer jednou jasnou vetou a všimnúť si, ktoré úlohy tohto týždňa mu naozaj slúžia.'),
        ease: t('The direction may need less steering and more time: let the present stretch of work be what it is, and notice what it keeps showing.', 'Smer možno potrebuje menej riadenia a viac času: nechaj súčasný úsek práce byť tým, čím je, a všímaj si, čo ti stále ukazuje.'),
        face: t('What is asked is to look squarely at where the work actually stands, without a hopeful or a harsh gloss, and to name it as it is.', 'Žiada sa pozrieť priamo na to, kde práca naozaj stojí, bez nádejného či prísneho lakovania, a pomenovať to tak, ako to je.'),
        weave: t('What stands out is joining the earlier chapters of your work with the present one, so that the direction reads as one line rather than separate jobs.', 'Vyniká spojenie skorších kapitol tvojej práce so súčasnou, aby sa smer čítal ako jedna línia, nie ako samostatné zamestnania.'),
    },
    closings: [
        t('Which thread from how your work took shape still feels alive in what you do now?', 'Ktorá niť z toho, ako sa tvoja práca formovala, je stále živá v tom, čo robíš teraz?'),
        t('If the present direction were put into one plain sentence, what would that sentence leave out?', 'Čo by zostalo mimo, keby sa súčasný smer práce opísal jednou jasnou vetou?'),
        t('What in your working days belongs to the line you are on, and what only came along with it?', 'Čo z tvojich pracovných dní patrí k línii, ktorou ideš, a čo sa k nej len pripojilo?'),
    ],
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
                steady: t('While things are steady, the obstacle is visible: there is a concrete point in the work where it can be seen, described and so located.', 'Témou je viditeľnosť: konkrétne miesto v práci, kde sa prekážka dá vidieť, opísať a tak lokalizovať.'),
                strained: t('At its sharpest, the obstacle interrupts a task, a meeting or a deadline and is not easily worked around.', 'V napätí sa prekážka zvykne ukázať v najostrejšej podobe: preruší úlohu, poradu alebo termín a nedá sa ľahko obísť.')
            } },
        { label: t('What keeps it going', 'Čo ju udržiava'),
            ask: t('The pattern underneath that sustains it: a habit, a structure, an unspoken expectation or an unclear priority.', 'Vzorec pod povrchom, ktorý ju živí: zvyk, štruktúra, nevyslovené očakávanie alebo nejasná priorita.'),
            frame: {
                steady: t('What holds the obstacle in place is often also useful: a habit, a safeguard, a way of doing things that once solved a real problem.', 'Sem patrí to, čo drží prekážku na mieste tým, že je zároveň užitočné: zvyk, poistka, spôsob práce, ktorý kedysi vyriešil skutočný problém.'),
                strained: t('Pressure, haste or avoidance can keep the pattern going, and it may repeat partly because looking at it carries a cost.', 'Keď je toto miesto v napätí, vzorec sa drží pri živote zhonom, vyhýbaním sa alebo tlakom a opakuje sa preto, že pohľad naň by niečo stál.')
            } },
        { label: t('A way of working with it', 'Ako s ňou pracovať'),
            ask: t('A stance that speaks to that pattern. It asks for a way of working, not for a result.', 'Postoj, ktorý hovorí k tomu vzorcu. Žiada si spôsob práce, nie výsledok.'),
            frame: {
                steady: t('The fitting change is usually plainer than the problem: a different method, pace or place for attention, made where the pattern starts.', 'V tomto mieste ide o spôsob práce, ktorý sedí na vzorec pod povrchom: postup, tempo alebo druh pozornosti, ktoré sa dotýkajú príčiny.'),
                strained: t('Forced or resisted, the way of working turns into effort against the pattern instead of alongside it, or a response that comes late or too hard.', 'Vynútený alebo odmietaný spôsob práce sa tu mení na úsilie proti vzorcu namiesto popri ňom alebo na reakciu, ktorá príde neskoro či príliš tvrdo.')
            } },
    ],
    opening: t('This reading looks at an obstacle in your work. The first card is where it shows, the second the pattern underneath that keeps it going, and the third a way of working that speaks to it. It reads the situation, not people: nothing here says what anyone intends.', 'Toto čítanie sa pozerá na prekážku v tvojej práci. Prvá karta je miesto, kde sa ukazuje, druhá vzorec pod ňou, ktorý ju udržiava, a tretia spôsob práce, ktorý k nej hovorí. Číta situáciu, nie ľudí: nič tu nehovorí o úmysloch nikoho.'),
    takeaway: {
        act: t('One small, specific change in how the work is done can be enough: a task broken down, a request made plainly, a priority named.', 'Môže stačiť jedna malá, konkrétna zmena v tom, ako sa práca robí: rozpísaná úloha, jasne vyslovená požiadavka, pomenovaná priorita.'),
        ease: t('The obstacle may need less force and more room: a slower pace, fewer things held at once, and time for the stuck part to loosen.', 'Prekážka možno potrebuje menej sily a viac priestoru: pomalšie tempo, menej vecí naraz a čas, aby sa zaseknutá časť uvoľnila.'),
        face: t('The obstacle is asking to be looked at directly: describing it in plain terms of tasks and facts can come before any attempt to get past it.', 'Prekážka chce, aby sa na ňu pozrelo priamo: jej opis v jednoduchej reči úloh a faktov môže predchádzať akémukoľvek pokusu obísť ju.'),
        weave: t('Coherence may be what helps: what you call a priority, what you schedule and what you actually do pointing the same way.', 'Pomôcť môže súlad: keď to, čo nazývaš prioritou, čo plánuješ a čo naozaj robíš, mieri tým istým smerom.'),
    },
    closings: [
        t('What would shift in this obstacle if it were described as a problem of process rather than of ability?', 'Čo by sa na tejto prekážke zmenilo, keby sa chápala ako problém postupu, nie schopností?'),
        t('Where in the work does the obstacle appear most often, and what is usually going on just before it?', 'Kde sa v práci táto prekážka objavuje najčastejšie a čo sa zvyčajne deje tesne pred tým?'),
        t('What does the pattern that keeps this going also give, and what would be missed if it loosened?', 'Čo ti vzorec, ktorý prekážku udržiava, zároveň dáva, a čo by ti chýbalo, keby povolil?'),
    ],
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
                steady: t('Skills, habits of care and qualities so familiar they pass unnoticed: what is already part of how the work gets done.', 'Toto miesto tvoria zručnosti, zvyky starostlivosti a vlastnosti natoľko povedomé, že unikajú pozornosti: to, čo už patrí k tomu, ako sa práca robí.'),
                strained: t('Under pressure, a strength is either used so hard or so long that it turns costly, or overlooked because it seems too ordinary to count.', 'Pri záťaži býva toto miesto poznačené nadužívaním alebo prehliadaním: silná stránka používaná tak intenzívne či dlho, že začala byť nákladná, alebo prehliadaná, lebo sa zdá príliš obyčajná.')
            } },
        { label: t('What is within reach', 'Čo máš na dosah'),
            ask: t('What else is available to your work beyond what you already do: a capacity, a connection, a resource not yet in use.', 'Čo ďalšie je tvojej práci k dispozícii okrem toho, čo už robíš: schopnosť, kontakt, zdroj, ktorý ešte nie je v hre.'),
            frame: {
                steady: t('Just outside current practice there is something unused: a capacity, a connection not yet drawn on, a resource close by and untouched.', 'Hneď za hranicou súčasnej praxe leží to, čo toto miesto zvykne niesť: schopnosť, ktorá sa ešte nepoužila, kontakt, na ktorý sa ešte nespoľahlo, zdroj blízko a nedotknutý.'),
                strained: t('What is nearby is hard to reach under strain: a capacity that needs conditions not yet in place, or a resource held back by doubt or circumstance.', 'To, čo je nablízku, no ťažko dosiahnuteľné, sa tu v napätí ukazuje: schopnosť, ktorá potrebuje zatiaľ chýbajúce podmienky, alebo zdroj, ktorý brzdia pochybnosti či okolnosti.')
            } },
        { label: t('Where to use it', 'Kde to uplatniť'),
            ask: t('The part of your work where these strengths could be applied, as a direction to try rather than a plan.', 'Miesto v tvojej práci, kde by sa tieto silné stránky dali uplatniť: smer na vyskúšanie, nie plán.'),
            frame: {
                steady: t('Fit is the question: a kind of task, a setting or a way of contributing that matches what a strength is already good for.', 'Na tomto mieste ide o súlad: druh úloh, prostredie alebo spôsob prispievania, ktorý zodpovedá tomu, na čo sa silná stránka už hodí.'),
                strained: t('Mismatch is the strained form: a real ability asked to work against the grain, or given little room.', 'Nesúlad sa tu prejavuje v napätí: skutočná schopnosť, ktorá má pracovať proti srsti alebo dostáva len málo priestoru.')
            } },
    ],
    opening: t('This reading looks at the strengths you bring to your work. The first card is what you already carry, the second what lies within reach beyond that, and the third where those strengths could be put to use.', 'Toto čítanie sa pozerá na silné stránky, ktoré prinášaš do svojej práce. Prvá karta je to, čo už v sebe nosíš, druhá to, čo je okrem toho na dosah, a tretia miesto, kde by sa tieto silné stránky dali využiť.'),
    takeaway: {
        act: t('Using one strength deliberately in one ordinary task this week, and noticing how the task changes, can be enough.', 'Môže stačiť použiť jednu silnú stránku zámerne pri jednej bežnej úlohe a všimnúť si, ako sa tá úloha zmení.'),
        ease: t('A strength does not always need more output: sometimes it asks to be used with less strain, in the work it suits best.', 'Silná stránka nie vždy potrebuje viac výkonu: niekedy žiada, aby sa používala s menším napätím, v práci, ktorá jej najviac sedí.'),
        face: t('It may help to look honestly at what you do well, without modesty or inflation, and to say it in plain words.', 'Môže pomôcť pozrieť sa úprimne na to, čo ti ide, bez skromničenia a bez nafukovania, a povedať to obyčajnými slovami.'),
        weave: t('What stands out is combining different strengths in one piece of work, so that skill, care and judgement show up together.', 'Vyniká spojenie rôznych silných stránok v jednej práci, aby sa zručnosť, starostlivosť a úsudok prejavili spolu.'),
    },
    closings: [
        t('Which strength do you use daily at work without ever counting it as one?', 'Ktorú silnú stránku využívaš v práci denne a pritom ju nikdy nepočítaš medzi svoje?'),
        t('Where in your work do things go well with little effort, and what are you doing then?', 'Kedy ti v práci veci idú bez veľkého úsilia a čo práve robíš?'),
        t('Which strength has proved useful in more than one kind of task, and what does that show about it?', 'Ktorá silná stránka sa ti osvedčila pri viacerých druhoch úloh a čo to o nej prezrádza?'),
    ],
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
                steady: t('The ground is workable: what is already in place, what has been done and what remains plainly open.', 'Predmetom je pôda, na ktorej sa dá pracovať: čo je už na mieste, čo sa urobilo a čo zostáva zjavne otvorené.'),
                strained: t('The situation presses: what has been left undone, what is unclear, and what makes any move feel heavier than it looks.', 'Situácia tlačí: čo zostalo nedokončené, čo je nejasné a čo robí každý krok ťažším, než vyzerá.')
            } },
        { label: t('A fitting response', 'Vhodná odpoveď'),
            ask: t('A small, ordinary move that suits the situation as it is, one that is within your own hands.', 'Malý, obyčajný krok, ktorý sedí na situáciu takú, aká je, a ktorý je v tvojich rukách.'),
            frame: {
                steady: t('A fitting response is proportionate: a move small enough to be one’s own, shaped by the situation rather than by a wish to be done.', 'Odpoveď tu určuje primeranosť: krok dosť malý na to, aby bol vlastný, tvarovaný situáciou, nie túžbou mať to z krku.'),
                strained: t('Haste, pressure or reluctance drives the response when it goes hard: a move made to relieve tension rather than to fit what is actually there.', 'Odpoveď, keď ide ťažko, poháňa zhon, tlak alebo neochota: krok urobený na uľavenie od napätia, nie preto, aby sedel na skutočnú situáciu.')
            } },
        { label: t('Where it tends to lead', 'Kam to zvykne viesť'),
            ask: t('The direction such a move tends to open up: a tendency to look at, never a promise.', 'Smer, ktorý takýto krok zvykne otvárať: tendencia na pozorovanie, nikdy sľub.'),
            frame: {
                steady: t('Such a move leans somewhere: toward what it opens and away from what it leaves aside, a direction to watch and not an outcome.', 'Toto miesto sa týka toho, ku čomu sa takýto krok kloní: čo otvára a čo necháva bokom, smer na sledovanie, nie výsledok.'),
                strained: t('Cost comes into view here: what a response may close off, strain or postpone, held as something to look at before the step is chosen.', 'Do popredia tu vystupuje cena: čo môže odpoveď uzavrieť, zaťažiť alebo odložiť, chápané ako vec na zváženie ešte pred výberom kroku.')
            } },
    ],
    opening: t('This reading looks at a useful next step in your work. The first card is the situation as it is, the second a response that fits it, and the third where that response tends to lead: a direction to look at, not a promise.', 'Toto čítanie sa pozerá na užitočný ďalší krok v tvojej práci. Prvá karta je situácia taká, aká je, druhá odpoveď, ktorá k nej sedí, a tretia to, kam táto odpoveď zvykne viesť: smer na pozorovanie, nie sľub.'),
    takeaway: {
        act: t('The smallest version of the step can be enough: one email drafted, one question asked, one hour set aside for it.', 'Môže stačiť najmenšia verzia kroku: jeden rozpísaný e-mail, jedna položená otázka, jedna hodina vyhradená na to.'),
        ease: t('The useful step may be to prepare rather than act: gather what is missing and let the right moment become clear.', 'Užitočným krokom môže byť skôr príprava než konanie: zozbierať, čo chýba, a nechať moment, aby sa vyjasnil.'),
        face: t('The next step may begin with seeing the situation squarely: what has been done, what has not, and what is actually yours to decide.', 'Ďalší krok môže začať priamym pohľadom na situáciu: čo sa urobilo, čo nie a čo je naozaj na tebe.'),
        weave: t('What stands out is making the step fit the whole: let it serve the craft, the people involved and your own limits at once.', 'Vyniká zladenie kroku s celkom: nech slúži remeslu, ľuďom, ktorých sa týka, aj tvojim hraniciam naraz.'),
    },
    closings: [
        t('Which step, however small, would feel like yours to take?', 'Ktorý krok, aj keby bol malý, by sa ti zdal naozaj tvoj?'),
        t('What would make this step fit the situation as it really is?', 'Čo by urobilo tento krok primeraným skutočnej situácii?'),
        t('What do you already have in hand for this step, and what is still missing?', 'Čo už na tento krok máš po ruke a čo ešte chýba?'),
    ],
};
export const WORK_AREA = {
    id: 'work-career',
    label: t('Work & Career', 'Práca a kariéra'),
    blurb: t('Direction, craft and contribution, and what stands in their way.', 'Smerovanie, remeslo a príspevok, aj to, čo im stojí v ceste.'),
    scope: t('vocation and working life as activity, not money', 'povolanie a pracovný život ako činnosť, nie peniaze'),
    intentions: [direction, obstacle, strengths, nextStep],
    lens,
};
