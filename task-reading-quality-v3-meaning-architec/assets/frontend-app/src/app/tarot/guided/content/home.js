/**
 * HOME & MOVING - place, belonging and the dwelling.
 *
 * This area owns what home means, how a person lives in a place, the question of whether surroundings still fit, settling
 * into somewhere unfamiliar and what steadies a person in it. It does not own the road and the unfamiliar (Travel) or
 * transitions in general (Life changes). It never says to move and never says to stay: it describes pulls, not verdicts.
 *
 * The lens below is shared by all four intentions, so it speaks of the dwelling and the place in general (staying, leaving,
 * arriving, living) and never presupposes that the person is already moving or already settling. What is specific to an
 * intention lives in its places (`ask` and `frame`).
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    stage: {
        'sets-something-beginning': [
            t('At home, a beginning is often a small thing: a key turned in a lock, the first lamp switched on, an empty shelf waiting to be used.', 'Doma býva začiatok drobnosťou: kľúč otočený v zámku, prvá rozsvietená lampa, prázdny regál, ktorý čaká na použitie.'),
            t('A place starts to feel known by degrees: a familiar mug, a path to the shop worked out, a corner that has begun to collect a few belongings.', 'Miesto sa stáva známym postupne: obľúbený hrnček, vychodená cesta do obchodu, kútik, v ktorom sa začali usádzať veci.'),
        ],
        'sustains-an-effort': [
            t('A home is kept by routine more than by decision: meals cooked, rooms aired, small repairs done before they grow large.', 'Domov sa drží skôr rutinou než rozhodnutím: uvarené jedlá, vyvetrané izby, drobné opravy urobené skôr, než narastú.'),
            t('Much of living somewhere is repetition: the same stairs, the same kettle, the table wiped and the day’s things put back where they belong.', 'Veľká časť bývania je opakovanie: tie isté schody, ten istý čajník, utretý stôl a veci vrátené na svoje miesto.'),
        ],
        'holds-still': [
            t('A home that holds still can be restful, a quiet room at the end of the day, or a stillness in which nothing has been touched for a long time.', 'Domov, ktorý stojí, môže byť oddychom, tichou izbou na konci dňa, alebo stojatou vodou, v ktorej sa dlho nič nepohlo.'),
            t('A dwelling that stays the same for years becomes part of whoever lives in it: the creak of a floorboard, the angle of the afternoon light, a quiet known by heart.', 'Bývanie, ktoré sa roky nemení, sa stáva súčasťou toho, kto v ňom žije: vŕzganie podlahy, uhol popoludňajšieho svetla, ticho poznané naspamäť.'),
        ],
        'stands-at-full-extent': [
            t('A home at its fullest is lived in to its edges: every room has a use, and its comforts and its cramped corners are equally plain.', 'Domov obývaný naplno je využitý až po okraje: každá izba slúži a pohodlie aj tesné kúty sú rovnako na očiach.'),
            t('Fullness shows what a place can hold and what it cannot: the table is crowded, the walls are known, nothing is left to imagine.', 'Plnosť ukazuje, čo miesto unesie a čo nie: stôl je plný, steny sú známe a nič nezostáva na domýšľanie.'),
        ],
        'is-mid-transition': [
            t('A room caught between two arrangements is half one thing and half another: shelves partly cleared, a wall partly painted, nothing quite in its place yet.', 'Izba medzi dvoma usporiadaniami je napoly jedna a napoly druhá vec: poličky čiastočne vyprázdnené, stena čiastočne natretá, nič ešte nie je celkom na svojom mieste.'),
            t('A change of surroundings tends to leave a stretch in which the hand still reaches for the old light switch and the new street does not yet feel known.', 'Zmena prostredia zvykne nechať úsek, v ktorom ruka ešte siaha po starom vypínači a nová ulica sa ešte nezdá známa.'),
        ],
        'is-being-broken-into': [
            t('When something breaks into a home (noise, a repair that cannot wait, a sudden change in who lives there), it shows how much of its calm was taken for granted.', 'Keď do domova vtrhne niečo nečakané (hluk, oprava, ktorá nepočká, náhla zmena v tom, kto tam býva), ukáže, ako veľmi sa jeho pokoj považoval za samozrejmosť.'),
            t('A disturbance in a dwelling reaches further than its size, because home is where people expect not to have to stay on guard.', 'Rušenie v obydlí zasiahne viac, než je samo veľké, pretože doma sa čakáva, že netreba byť stále v strehu.'),
        ],
        'is-letting-go': [
            t('Letting go at home can mean emptying a drawer, giving away a chair, or loosening the grip on a room that has stopped being what it was.', 'Rozlúčiť sa s niečím doma môže znamenať vyprázdniť zásuvku, darovať stoličku alebo povoliť zovretie izby, ktorá prestala byť tým, čím bola.'),
            t('What is put down in a dwelling is often more than objects: a picture of the place as it once was, or a plan for it that never took shape.', 'To, čo sa v bývaní odkladá, je často viac než veci: predstava miesta, aké raz bolo, alebo plán s ním, ktorý nikdy nezískal podobu.'),
        ],
        'is-coming-together': [
            t('A home comes together when its parts agree: light where it is needed, a table where people gather, belongings that look as if they belong to each other.', 'Domov sa zlaďuje, keď jeho časti súhlasia: svetlo tam, kde ho treba, stôl tam, kde sa schádzajú ľudia, a veci, ktoré akoby k sebe patrili.'),
            t('Belonging often arrives as a quiet fit: the street, the stairwell and the neighbours’ greetings begin to make one recognisable place.', 'Spolupatričnosť často prichádza ako tiché zapadnutie: ulica, schodisko a pozdravy susedov začnú dávať jedno poznateľné miesto.'),
        ],
    },
    stance: {
        continue: [
            t('Continuing here tends to look like keeping up the rhythms that make a place liveable: the evening routine, the cleared table, the lamp left on.', 'Pokračovanie tu zvyčajne vyzerá ako udržiavanie rytmov, vďaka ktorým sa miesto dá obývať: večerný zvyk, uprataný stôl, rozsvietená lampa.'),
            t('Carrying on can mean tending what already has its place (the plants, the habits, the arrangement of the rooms) rather than rearranging for its own sake.', 'Pokračovať môže znamenať starať sa o to, čo už má svoje miesto (rastliny, zvyky, usporiadanie izieb), a nepremiestňovať len pre samotné premiestňovanie.'),
        ],
        redirect: [
            t('A change of course here may be modest: another arrangement of the furniture, a different use of a room, a new way of coming through the door.', 'Zmena smeru tu môže byť skromná: iné rozloženie nábytku, iné využitie izby, nový spôsob, akým sa vchádza do dverí.'),
            t('Redirecting at home can mean changing how a space is used while the question underneath stays the same: where one rests and where one gathers.', 'Zmeniť smer doma môže znamenať zmeniť využitie priestoru, kým otázka pod tým ostáva rovnaká: kde sa oddychuje a kde sa schádza.'),
        ],
        'let-go': [
            t('Letting go here is about something set down: a heap of things kept out of habit, a picture of how the place ought to look, a rule about how it was always done.', 'Pustiť tu znamená odložiť niečo, čo sa drží: hromadu vecí zo zvyku, predstavu o tom, ako má miesto vyzerať, pravidlo o tom, ako sa to vždy robilo.'),
            t('Making room often starts with one object or one expectation released, and the rest of the room loosens around it.', 'Spraviť miesto sa často začína jednou odloženou vecou alebo jedným opusteným očakávaním a zvyšok izby sa okolo toho uvoľní.'),
        ],
        moderate: [
            t('Moderation here means a pace the household can bear: one wall painted, one shelf sorted, one room finished before the next is begun.', 'Miera tu znamená tempo, ktoré domácnosť unesie: vymaľovať jednu stenu, utriediť jednu poličku, dokončiť jednu izbu a až potom začať ďalšiu.'),
            t('Moderation at home is a matter of enough: enough furniture, enough activity, enough quiet, with none of them pushing out the others.', 'Miera doma je otázkou dosť: dosť nábytku, dosť ruchu, dosť ticha, pričom nič z toho nevytláča ostatné.'),
        ],
        'meet-it': [
            t('Meeting it asks for a plain look at how a place actually is: the draughty corner, the noise at night, the room nobody uses, named without apology.', 'Treba sa pozrieť na miesto také, aké naozaj je: prievanový kút, nočný hluk, izbu, ktorú nikto nepoužíva, a pomenovať to bez ospravedlňovania.'),
            t('Looking squarely at a place can be as simple as standing in the middle of a room and noticing, without hurry, what it gives, what it asks and what it cannot offer.', 'Úprimne sa pozrieť na miesto môže byť také jednoduché ako stáť uprostred izby a bez náhlenia si všímať, čo dáva, čo si pýta a čo ponúknuť nedokáže.'),
        ],
        wait: [
            t('Some things about a place only show with time: how the light moves, how the street sounds in winter, whether the evenings feel like home. There is room to let them show.', 'Niektoré veci o mieste sa ukážu len časom: ako sa pohybuje svetlo, ako znie ulica v zime, či sú večery ako doma. Je tu priestor nechať ich ukázať.'),
            t('Patience at home is not idleness: it is letting a room stay half-furnished until its use becomes clear, rather than filling it to escape the emptiness.', 'Trpezlivosť doma nie je nečinnosť: je to nechať izbu napoly zariadenú, kým sa neujasní, na čo slúži, namiesto jej zaplnenia len preto, aby sa predišlo prázdnote.'),
        ],
        choose: [
            t('A home sometimes narrows to a question of what it is for (a shelter, a workshop, a gathering room), and choosing here means saying so knowingly.', 'Domov sa občas zúži na otázku, načo slúži (ako útočisko, dielňa, miesto stretnutí), a voľba tu znamená povedať si to vedome.'),
            t('A choice here is less about the building than about what is worth keeping close: quiet, company, light, a short walk to anything.', 'Voľba tu nie je ani tak o budove, ako o tom, čo stojí za to mať nablízku: pokoj, spoločnosť, svetlo, krátku cestu ku všetkému.'),
        ],
        integrate: [
            t('Bringing together is the work of making rooms and routines one whole, so that where people sleep, eat and rest stops feeling like separate arrangements.', 'Spájanie je práca, ktorou sa izby a zvyky miesta stávajú jedným celkom, aby miesta, kde sa spí, jedáva a oddychuje, prestali pôsobiť ako oddelené usporiadania.'),
            t('Integration at home is when belongings, habits and neighbourhood begin to agree with each other, and a person can walk in without having to adjust to anything.', 'Zjednotenie doma nastáva, keď sa veci, zvyky a okolie začnú navzájom zhodovať a do dverí sa dá vstúpiť bez toho, aby sa človek musel čomukoľvek prispôsobovať.'),
        ],
        'attend-to-it': [
            t('Something about living in a place often asks to be noticed before it is fixed: where the shoulders tense at the door, which room goes unused, what gets tucked out of sight.', 'Niečo na bývaní často žiada všimnúť si ešte pred opravovaním: kde sa pri dverách napnú plecia, ktorá izba ostáva nepoužitá, čo sa ukladá z dohľadu.'),
            t('Attending to a home can begin with how a room feels at different hours (morning, dusk, late at night) before anything is decided about it.', 'Pozornosť k domovu môže začať tým, aký je pocit z izby v rôznych hodinách (ráno, za súmraku, neskoro v noci), skôr než sa o nej čokoľvek rozhodne.'),
        ],
    },
    trend: {
        expanding: t('An expanding pull would favour openness: rooms used to their edges, doors left ajar, space made for others, while the quiet of a small corner goes unattended.', 'Rozširovanie by sa prikláňalo k otvorenosti: izby využité až po okraje, pootvorené dvere, miesto pre iných, kým ticho malého kúta ostane bez pozornosti.'),
        contracting: t('Drawing inward, the pull favours shelter: fewer rooms in use, the world kept at the threshold, at the cost of whatever might have come through an open door.', 'Obracanie dovnútra hľadá úkryt: menej používaných izieb, svet zadržaný na prahu, na úkor toho, čo mohlo prísť otvorenými dverami.'),
        stabilising: t('Something steadying leans toward what is already known by heart: familiar routines, a place that needs no explaining, though with little room for the unfamiliar.', 'Ustaľovanie sa nakláňa k tomu, čo je už poznané naspamäť: známe zvyky, miesto, ktoré netreba vysvetľovať, hoci s malým priestorom pre nové.'),
        disrupting: t('A pull that unsettles favours whatever shakes the usual order of a household: a habit, a room or a plan pushed out of shape, which can also clear space.', 'Nepokoj sa prikláňa ku všetkému, čo otrasie obvyklým poriadkom domácnosti: zvyk, izba či plán vytlačené z tvaru, čo môže aj uvoľniť miesto.'),
        redirecting: t('Redirection as a pull favours a different use of the same walls: rooms, habits and roles turned toward what matters now, with the old purpose set aside rather than defended.', 'Zmena smeru by dala prednosť inému využitiu tých istých stien: izby, zvyky a úlohy obrátené k tomu, na čom záleží teraz, so starým účelom odloženým, nie obhajovaným.'),
        resolving: t('Resolution, as a quality of pull, favours closing what is open: a corner waiting to be arranged, a question about the place wanting an answer that can be lived with.', 'Smerovanie k vyriešeniu hľadá uzavretie otvoreného: kút čakajúci na zariadenie, otázka o mieste, ktorá chce odpoveď, s akou sa dá žiť.'),
        suspended: t('The pull is toward an unfinished pause, like standing in the hallway with a coat on; it keeps the question about the place open and leaves nothing forced.', 'Zastavenie na polceste, ako stáť na chodbe s kabátom na pleciach, nechá otázku o mieste otvorenú a nič nenúti.'),
    },
    strained: {
        stage: {
            'sets-something-beginning': t('A beginning under strain is a shaky start: the lamp is on and the key has turned, but the room does not yet answer, and the first nights feel unsteady.', 'Začiatok v napätí je neistý štart: lampa svieti a kľúč je otočený, ale izba ešte neodpovedá a prvé noci sú neisté.'),
            'sustains-an-effort': t('Keeping a home going under strain turns routines into weight: the same chores, repairs put off, effort that goes in and seems to settle nothing.', 'Udržiavať domov, keď to ide ťažko, mení zvyky na záťaž: tie isté povinnosti, odkladané opravy, úsilie, ktoré sa vkladá a zdá sa, že nič neusadí.'),
            'holds-still': t('Stillness under strain feels less like rest than like being stuck: rooms unchanged for too long, a question about the place left unasked because asking it is uncomfortable.', 'Pokoj v napätí pôsobí menej ako odpočinok a viac ako zaseknutie: izby príliš dlho nezmenené, otázka o mieste nepoložená, lebo jej položenie je nepríjemné.'),
            'stands-at-full-extent': t('A place at its limit tends to feel crowded: too many things for the shelves, too many demands on the rooms, too little air between one need and the next.', 'Miesto na hranici sa zvyčajne zdá preplnené: priveľa vecí na poličky, priveľa nárokov na izby, primálo vzduchu medzi jednou potrebou a ďalšou.'),
            'is-mid-transition': t('A place caught between arrangements can feel like having no floor under things: nothing yet found, nothing quite given up, the hand reaching for what is no longer there.', 'Miesto uväznené medzi usporiadaniami môže pôsobiť, akoby veci nemali pod sebou podlahu: nič ešte nenájdené, nič celkom nepustené a ruka, ktorá siaha po tom, čo tam už nie je.'),
            'is-being-broken-into': t('When noise, damage or a sudden change hits a household, the sense of safe ground goes first, because home is where people expect to be able to put their guard down.', 'Keď domácnosť zasiahne hluk, škoda či náhla zmena, ako prvý sa stratí pocit bezpečnej pôdy, lebo doma sa čaká, že sa dá zložiť obranu.'),
            'is-letting-go': t('Loosening the hold on a place under strain can hurt: a room emptied that still carries a memory, a plan for the dwelling put down unfinished.', 'Povoliť zovretie miesta pri záťaži môže bolieť: vyprázdnená izba, ktorá stále nesie spomienku, a plán s bývaním odložený nedokončený.'),
            'is-coming-together': t('Coming together under strain is slow and uneven: some parts of the home agree while others still grate, and the sense of fit comes and goes.', 'Zlaďovanie v ťažkej chvíli je pomalé a nerovnomerné: niektoré časti domova si sadnú, iné ešte škrípu a pocit zapadnutia prichádza a odchádza.'),
        },
        stance: {
            continue: t('Carrying on under strain is keeping the routines up after they have gone hollow: the evening habit and the cleared table, kept because stopping would show how thin they have become.', 'Pokračovať v napätí znamená udržiavať zvyky, ktoré sa vyprázdnili: večerný rituál a uprataný stôl, držané preto, že ich zastavenie by ukázalo, aké sú tenké.'),
            redirect: t('A forced change of direction at home is rearranging in haste: furniture moved or a room given a new use because the old one stopped being bearable, not because the new one was chosen.', 'Vynútená zmena smeru doma je prestavovanie v zhone: nábytok presunutý alebo izba s novým účelom preto, že starý prestal byť znesiteľný, nie preto, že nový bol vybraný.'),
            'let-go': t('Letting go under pressure can feel like being stripped of things: objects, habits or a picture of the place taken away before there was time to say goodbye to them.', 'Púšťať, keď niečo tlačí, môže pripadať ako obrať sa o veci: predmety, zvyky či predstava miesta zmiznú skôr, než bol čas rozlúčiť sa s nimi.'),
            moderate: t('Holding a measure under strain is hard when everything calls for attention at once: noise, tasks and needs crowd the middle way into a thin line.', 'V preťažení je ťažké držať mieru, keď všetko volá o pozornosť naraz: hluk, úlohy a potreby stláčajú stredný spôsob do tenkej čiary.'),
            'meet-it': t('Looking squarely at a place under strain means seeing what is hard about it without softening it: the cold corner, the unease at night, the room that holds a tension nobody mentions.', 'Pozrieť sa priamo na miesto, ktoré zaťažuje, znamená vidieť, čo je na ňom ťažké, bez zmäkčovania: studený kút, nepokoj v noci, izbu, ktorá drží napätie, o ktorom nikto nehovorí.'),
            wait: t('Waiting under strain is not restful: the open question hangs over each room, and patience can feel like putting off something that keeps pressing.', 'Čakanie, ktoré tlačí, nie je oddychové: otvorená otázka visí nad každou izbou a trpezlivosť môže pripadať ako odkladanie niečoho, čo stále tlačí.'),
            choose: t('A choice forced about what a home is for can feel like giving up one need to serve another: quiet or company, shelter or space.', 'Voľba vynútená otázkou, načo domov slúži, môže pripadať ako vzdanie sa jednej potreby kvôli druhej: ticho alebo spoločnosť, útočisko alebo priestor.'),
            integrate: t('Bringing the parts of a place together under strain meets friction: habits, belongings and surroundings that do not yet agree, and an effort at harmony that keeps coming undone.', 'Spájanie častí miesta pri záťaži naráža na trenie: zvyky, veci a okolie, ktoré sa ešte nezhodujú, a snaha o súlad, ktorá sa stále rozpadá.'),
            'attend-to-it': t('Attention under strain finds what was avoided: the room never used, the corner always shut away, which asks to be noticed before it asks for any repair.', 'Pozornosť v ťažkej chvíli nachádza to, čomu sa unikalo: izbu, ktorá sa nepoužíva, kút vždy zatvorený, čo žiada najprv všimnutie a až potom akúkoľvek opravu.'),
        },
        trend: {
            expanding: t('An expanding pull under strain overreaches: more space or more activity than the household can hold, with rest and quiet crowded out.', 'Rozširovanie, keď to ide ťažko, siaha príliš ďaleko: viac priestoru či ruchu, než domácnosť unesie, a odpočinok s tichom ostávajú vytlačené.'),
            contracting: t('A narrowing pull under strain closes the door a little too far: fewer rooms in use, fewer visitors, the dwelling turning into a place to hide rather than to rest.', 'Obracanie dovnútra v napätí zatvára dvere o niečo viac, než treba: menej používaných izieb, menej návštev, bývanie, z ktorého sa stáva úkryt namiesto miesta odpočinku.'),
            stabilising: t('A steadying pull under strain can harden into rigidity: the arrangement kept as it is mostly because changing it feels risky.', 'Ustaľovanie pri záťaži sa môže zmeniť na strnulosť: usporiadanie udržané tak, ako je, najmä preto, že jeho zmena pôsobí riskantne.'),
            disrupting: t('A disruptive pull under strain shakes the basics of a household: arrangements, rooms and routines pushed out of shape faster than they can be put back.', 'Narušenie v preťažení otriasa základmi domácnosti: usporiadania, izby a zvyky sú vytlačené z tvaru rýchlejšie, než sa dajú vrátiť.'),
            redirecting: t('A pull toward redirection under strain turns restless: a household leaning toward another arrangement without a clear picture of what it should hold.', 'Zmena smeru, ktorá tlačí, sa mení na nepokoj: domácnosť sa nakláňa k inému usporiadaniu bez jasnej predstavy, čo má obsahovať.'),
            resolving: t('A pull toward resolution under strain can feel hurried: the wish to close the question about the place quickly, before it has been understood.', 'Snaha o vyriešenie v ťažkej chvíli môže pôsobiť unáhlene: túžba rýchlo uzavrieť otázku o mieste skôr, než bola pochopená.'),
            suspended: t('A suspended pull under strain is a limbo that wears on a household: decisions left in boxes, the coat still on in the hallway, nothing settled and nothing let go.', 'Pozastavenie, keď to tlačí, je medzistav, ktorý domácnosť vyčerpáva: rozhodnutia nechané v škatuliach, kabát stále na chodbe, nič ustálené a nič pustené.'),
        },
    },
    arc: {
        continuation: t('Read together, the cards describe a way of dwelling that keeps to its established lines: the same rooms, the same rhythms, whether they still serve well or have worn thin.', 'Spolu karty opisujú spôsob bývania, ktorý sa drží zaužívaných línií: tie isté izby, tie isté rytmy, či už dobre slúžia, alebo sa obnosili.'),
        escalation: t('In order, the cards describe a feeling about a place growing stronger with each step: restlessness, attachment or unease gaining weight.', 'V poradí karty opisujú pocit k miestu, ktorý s každým krokom silnie: nepokoj, pripútanosť alebo nepohoda naberajú na váhe.'),
        interruption: t('Something crosses the usual order of the household, and the sequence is about what that interruption shows of what the place was quietly holding.', 'Niečo prekríži obvyklý chod domácnosti a poradie je o tom, čo toto prerušenie ukáže o tom, čo miesto doteraz potichu nieslo.'),
        'breakdown-to-recovery': t('The sequence runs from a place that has stopped holding (a leak, a crack, a loss of ease) to the question of what mending it would involve.', 'Poradie vedie od miesta, ktoré prestalo držať (presakovanie, trhlina, strata pohodlia), k otázke, čo všetko by oprava miesta obnášala.'),
        'expansion-to-limit': t('A dwelling opens out and then meets its edge; the question is what its walls, its light and its surroundings say about how much it can hold.', 'Bývanie sa rozšíri a potom narazí na svoju hranicu; otázkou je, čo steny, svetlo a okolie hovoria o tom, koľko toho unesie.'),
        'stasis-to-movement': t('From a settled, unchanged arrangement the sequence turns toward something starting to shift in how the place is lived in or felt.', 'Z ustáleného, nemenného usporiadania sa poradie obracia k niečomu, čo sa začína hýbať v tom, ako sa miesto obýva alebo prežíva.'),
        'conflict-to-integration': t('Opposing pulls (the need for quiet and the need for company, the familiar and the new) open the sequence, which reads toward a workable whole rather than a winner.', 'Protichodné sklony (potreba ticha a potreba spoločnosti, známe a nové) otvárajú poradie, ktoré sa uberá k použiteľnému celku, nie k víťazovi.'),
        'opening-to-choice': t('A widening in how the place is seen reads toward a point where a choice about how to live in it, or with it, comes into view.', 'Rozšírenie pohľadu na miesto sa uberá k bodu, kde sa črtá voľba, ako v ňom a s ním žiť.'),
        'holding-to-release': t('The sequence reads from holding tightly to what is kept in a place (objects, habits, a picture of how it should be) toward loosening, like keys set down on the table.', 'Poradie vedie od pevného držania toho, čo sa v mieste uchováva (veci, zvyky, obraz toho, aké má byť), k povoľovaniu, ako kľúče položené na stôl.'),
        'uncertainty-to-clarity': t('The sequence reads from haziness about how much at home a person feels toward something that can be seen and named.', 'Poradie vedie od zahmlenosti v tom, nakoľko sa človek cíti doma, k niečomu, čo sa dá vidieť a pomenovať.'),
        'stability-to-disruption': t('The sequence reads as a steady domestic arrangement being shaken, and asks what the steadiness was really made of: habit, comfort or genuine belonging.', 'Poradie vyzerá ako otrasený pevný domáci poriadok a pýta sa, z čoho tá pevnosť v skutočnosti bola: zo zvyku, z pohodlia alebo zo skutočnej spolupatričnosti.'),
        redirection: t('The way of living in a place bends: it does not stop, but it no longer runs where it did.', 'Spôsob, akým sa na mieste býva, sa ohýba: nezastavuje sa, ale už nemieri tam, kam predtým.'),
    },
    alignment: {
        aligned: t('The two sides of the question lean the same way, which makes this less about reconciling them than about noticing what that shared direction asks of the place.', 'Obe strany otázky sa nakláňajú rovnakým smerom, takže nejde ani tak o ich zmierenie, ako o všimnutie si, čo táto spoločná orientácia žiada od miesta.'),
        complementary: t('The two sides differ but fit, like a door and its frame: one gives the opening, the other the support.', 'Obe strany sa líšia, ale zapadajú, ako dvere a zárubňa: jedna dáva otvor, druhá oporu.'),
        opposed: t('The two sides pull against each other, as a wish for roots can pull against a wish for room, and the card between them shows what that pull has to pass through.', 'Obe strany mieria opačne, ako môže túžba po koreňoch stáť proti túžbe po voľnom priestore, a karta medzi nimi ukazuje, cez čo to napätie musí prejsť.'),
        apart: t('The two sides seem to be looking into different rooms altogether, so what lies between them may depend first on finding something common to look at.', 'Zdá sa, že obe strany sa pozerajú do celkom iných izieb, takže to, čo je medzi nimi, môže závisieť najprv od nájdenia niečoho spoločného, na čo sa dá pozerať.'),
    },
    suit: {
        wands: t('Wands bring drive to the question of home: the urge to rearrange, to build, to begin afresh, and the restlessness that goes with it.', 'Palice prinášajú do otázky domova popud: nutkanie premiestňovať, stavať, začínať odznova, a nepokoj, ktorý k tomu patrí.'),
        cups: t('Cups carry the feeling for a place: attachment, belonging, the warmth of a kitchen, the longing for a familiar room.', 'Poháre nesú cit k miestu: pripútanosť, spolupatričnosť, teplo kuchyne a clivotu za známou izbou.'),
        swords: t('Swords speak of thought about home: weighing, naming what works and what does not, and the conversations a household has or avoids.', 'Meče hovoria o myslení o domove: o zvažovaní, pomenúvaní toho, čo funguje a čo nie, a o rozhovoroch, ktoré domácnosť vedie alebo obchádza.'),
        pentacles: t('Pentacles ground home in the practical: the walls, the repairs, the daily routines, the body’s ease in a room and the hours a place takes.', 'Mince spájajú domov s praktickým: steny, opravy, každodenné zvyky, telesné pohodlie v izbe a čas, ktorý si miesto pýta.'),
    },
    majorWeight: t('Major cards in the lead suggest a theme that matters more than rooms and furniture.', 'Keď vedú Veľké arkány, ide o viac než o izby a nábytok: dotýka sa to niečoho trvalého v tom, čo znamená niekam patriť.'),
    weighing: t('Two pulls about a place (roots and fresh air, the familiar and the possible) rarely settle by one winning outright; they tend to be carried more easily when each is given its due.', 'Dve túžby okolo miesta (korene a čerstvý vzduch, známe a možné) sa málokedy vyriešia tým, že jedna jednoducho vyhrá; lepšie sa nesú, keď dostane každá svoje.'),
    layers: t('A home rests on three things at once: what is done in it, how it feels and what it means. It is steadiest when none of the three is left out.', 'Domov stojí na troch veciach naraz: na tom, čo sa v ňom robí, ako sa v ňom cíti a čo znamená. Najpevnejší je, keď žiadna z nich nechýba.'),
};
const meaning = {
    id: 'home-moving.meaning',
    areaId: 'home-moving',
    label: t('Understand what home means to me', 'Pochopiť, čo pre mňa znamená domov'),
    focus: t('Hold in mind a place that feels, or once felt, like home.', 'Maj na mysli miesto, ktoré ti pripadá alebo kedysi pripadalo ako domov.'),
    semantics: {
        explores: t('what home means to you, in daily life, in thought and underneath', 'čo pre teba znamená domov v každodennom živote, v myšlienkach i hlbšie'),
        reflection: 'meaning',
        practical: 'name',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'other-person-mind'],
    },
    spreadId: 'body-mind-spirit',
    category: 'general-reflection',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('How home is lived', 'Ako sa domov žije'),
            ask: t('The daily, bodily side of home: where you sleep, eat and rest, and how the rooms feel to move through.', 'Každodenná, telesná stránka domova: kde spíš, jedáš a oddychuješ a aký je pocit pohybovať sa izbami.'),
            frame: {
                steady: t('When home works, it is plain daily comfort: where the body rests, which rooms are easy to move through, what routine makes a day feel lived in.', 'Hlavnou témou je obyčajné pohodlie každodenného používania: kde si telo odpočinie, ktorými izbami sa ľahko chodí, aký zvyk robí z dňa prežitý deň.'),
                strained: t('Under strain, home is hard to live in bodily: a room that tires, a night without ease, routines that have become a grind.', 'Pod tlakom ide o domov, v ktorom sa telu ťažko žije: izba, ktorá unavuje, noc bez pokoja, zvyky, z ktorých sa stala driina.'),
            } },
        { label: t('What home is in your mind', 'Čo je domov v tvojej mysli'),
            ask: t('The picture and the words you hold for home: what you imagine it to be.', 'Obraz a slová, ktoré pre domov máš: ako si ho predstavuješ.'),
            frame: {
                steady: t('The picture of home carried in the head is made of words, images and remembered rooms that make a place count as home.', 'Tu ide o obraz domova nosený v hlave: slová, predstavy a spomínané izby, vďaka ktorým miesto platí za domov.'),
                strained: t('Strain here tends to show as a picture of home that has come apart from the real rooms: an ideal nothing can match, or a memory that crowds out the present place.', 'Keď to ide ťažko, obraz domova sa odtrhne od skutočných izieb: ideál, ktorému nič nezodpovedá, alebo spomienka, ktorá vytláča súčasné miesto.'),
            } },
        { label: t('What home stands for', 'Za čo domov stojí'),
            ask: t('What sits underneath: the values and the belonging a home is asked to hold.', 'Čo je pod povrchom: hodnoty a spolupatričnosť, ktoré má domov nosiť.'),
            frame: {
                steady: t('Underneath lie the values a home is asked to protect: safety, belonging, privacy, the sense of being known by a place.', 'Pod povrchom ležia hodnoty, ktoré má domov chrániť: bezpečie, spolupatričnosť, súkromie, pocit, že miesto človeka pozná.'),
                strained: t('Often this is about a value home is not currently holding: belonging that feels thin, safety that is not quite felt, a need that stays unnamed.', 'Často ide o hodnotu, ktorú domov práve nedrží: spolupatričnosť, ktorá sa zdá tenká, bezpečie, ktoré sa celkom necíti, potreba, ktorá ostáva nepomenovaná.'),
            } },
    ],
    opening: t('This reading looks at what home means to you. The first card is the lived side of it, the rooms and routines of daily life; the second is how you picture home in your mind; and the third is what it stands for underneath, the values and belonging it holds.', 'Toto čítanie sa pozerá na to, čo pre teba znamená domov. Prvá karta je jeho prežívaná stránka, izby a zvyky každodenného života; druhá je to, ako si domov predstavuješ v mysli; a tretia je to, za čo stojí hlbšie, hodnoty a spolupatričnosť, ktoré nesie.'),
    takeaway: {
        act: t('A small, concrete step is enough: put one thing in a room that makes it feel like yours, or set one routine that marks the day as lived here.', 'Stačí malý, konkrétny krok: dať do izby jednu vec, vďaka ktorej pôsobí ako tvoja, alebo zaviesť jeden zvyk, ktorý označí deň ako prežitý tu.'),
        ease: t('What helps is asking less of the place: let it be ordinary and sufficient for a while, without demanding that it feel perfect.', 'Pomáha žiadať od miesta menej: nechať ho chvíľu byť obyčajným a postačujúcim, bez nároku, aby bolo dokonalé.'),
        face: t('It may help to say plainly what home has to include for you (a quiet corner, a table, a certain light) and to notice where that is missing.', 'Môže pomôcť povedať si jasne, čo musí domov pre teba obsahovať (tichý kút, stôl, určité svetlo), a všimnúť si, kde to chýba.'),
        weave: t('Home sits where daily life, thought and values meet; the task is to let the three agree, so the place you live in matches what matters to you.', 'Domov leží tam, kde sa stretáva každodennosť, myslenie a hodnoty; úlohou je nechať ich zladiť, aby miesto, kde žiješ, zodpovedalo tomu, na čom ti záleží.'),
    },
    closings: [
        t('Which small thing in your home already says what it means to you?', 'Ktorá drobnosť v tvojom domove už teraz hovorí, čo pre teba znamená?'),
        t('When you picture home with your eyes closed, which room or moment comes first, and what does it hold?', 'Keď si domov predstavíš so zavretými očami, ktorá izba alebo chvíľa príde prvá a čo v sebe nesie?'),
        t('What does a place need to carry for it to feel like home rather than only somewhere to live?', 'Čo musí miesto nosiť v sebe, aby pôsobilo ako domov a nielen ako miesto na bývanie?'),
    ],
};
const needForChange = {
    id: 'home-moving.need-for-change',
    areaId: 'home-moving',
    label: t('Explore the need for change', 'Preskúmať potrebu zmeny'),
    focus: t('Hold in mind the surroundings you live in and the question of whether they still fit.', 'Maj na mysli prostredie, v ktorom žiješ, a otázku, či ti ešte sedí.'),
    semantics: {
        explores: t('what supports a change of surroundings, what holds you where you are and what it turns on', 'čo podporuje zmenu prostredia, čo ťa drží tam, kde si, a od čoho to závisí'),
        reflection: 'weigh',
        practical: 'observe',
        forbids: ['life-directive', 'predict-outcome', 'fate-claim', 'financial-advice', 'legal-claim', 'other-person-mind'],
    },
    spreadId: 'support-resistance-key',
    category: 'general-reflection',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What supports a change', 'Čo zmenu podporuje'),
            ask: t('What in the surroundings or in you leans toward something different: a restlessness, a room that no longer fits, a wish for another light.', 'Čo v prostredí alebo v tebe sa nakláňa k niečomu inému: nepokoj, izba, ktorá už nesedí, túžba po inom svetle.'),
            frame: {
                steady: t('Interest rather than escape marks a real pull toward different surroundings: a wish for other light, more space or another street.', 'Skutočné lákanie k inému prostrediu sa pozná skôr záujmom než útekom: túžba po inom svetle, väčšom priestore či inej ulici.'),
                strained: t('Under pressure, the pull is a restlessness that pushes: irritation with the present rooms, a wish to be anywhere else, which may say more about pressure than about the place.', 'Na tomto mieste býva napätie nepokojom, ktorý tlačí: podráždenie z terajších izieb, túžba byť kdekoľvek inde, čo môže hovoriť viac o tlaku než o samotnom mieste.'),
            } },
        { label: t('What holds you in place', 'Čo ťa drží na mieste'),
            ask: t('What keeps the present surroundings dear or important: familiar streets, people nearby, the comfort of knowing every corner.', 'Čo robí súčasné prostredie milým alebo dôležitým: známe ulice, ľudia nablízku, pohodlie z poznania každého kúta.'),
            frame: {
                steady: t('The present surroundings are worth keeping for real reasons: people nearby, streets known by heart, a routine that rests on this particular place.', 'Ide o to, čo robí súčasné prostredie hodným zachovania: ľudia nablízku, ulice poznané naspamäť, zvyk, ktorý stojí práve na tomto mieste.'),
                strained: t('Under strain, attachment is kept going by habit or by dread of losing what is known: a hold that has turned into a grip.', 'Pripútanosť udržiavaná zvykom alebo strachom zo straty známeho je to, čo tu tlak zvyčajne ukazuje: držanie, ktoré sa zmenilo na zovretie.'),
            } },
        { label: t('What the question turns on', 'Na čom otázka stojí'),
            ask: t('The question underneath both pulls, named without choosing a side.', 'Otázka pod oboma pohnútkami, pomenovaná bez výberu strany.'),
            frame: {
                steady: t('Beneath both pulls sits a need: what a place would have to give for the question to settle, put plainly and without taking a side.', 'Potreba pod oboma pohnútkami je jadrom veci: čo by miesto muselo dávať, aby sa otázka utíšila, vyjadrené jasne a bez stavania sa na stranu.'),
                strained: t('Beneath the argument sits a need that stays hidden: the question is loud because what it really turns on has not yet been said.', 'Pod sporom sedí potreba, ktorá ostáva skrytá: otázka je hlasná preto, že to, na čom skutočne stojí, ešte nebolo povedané.'),
            } },
    ],
    opening: t('This reading looks at the need for change in the place where you live, without leaning toward either answer. The first card is what supports a change, the second what holds you where you are, and the third what the question turns on. It describes pulls, not a verdict.', 'Toto čítanie sa pozerá na potrebu zmeny v mieste, kde žiješ, bez naklonenia sa k niektorej odpovedi. Prvá karta je to, čo zmenu podporuje, druhá to, čo ťa drží tam, kde si, a tretia to, na čom otázka stojí. Opisuje pohnútky, nie verdikt.'),
    takeaway: {
        act: t('A small, ordinary step is enough: write down what you would miss and what you would not miss, and read the two lists side by side.', 'Stačí malý, obyčajný krok: zapísať si, čo by ti chýbalo a čo by ti nechýbalo, a prečítať si oba zoznamy vedľa seba.'),
        ease: t('Weighing two pulls can look like letting the question sit alongside ordinary days and noticing which pull stays steady and which shifts with the weather.', 'Zvažovanie dvoch pohnútok môže vyzerať ako nechať otázku stáť popri bežných dňoch a všímať si, ktorá ostáva stála a ktorá sa mení s počasím.'),
        face: t('Looking squarely at both pulls is the point: say what the present surroundings give and what they lack, without hurrying toward a verdict.', 'Ide o to pozrieť sa priamo na obe pohnútky: pomenovať, čo súčasné prostredie dáva a čo mu chýba, bez náhlenia k záveru.'),
        weave: t('Weighing two pulls can include noticing what they share: sometimes both ask for a place that allows rest as well as growth, and naming what each asks is part of the weighing.', 'Zvažovanie dvoch pohnútok môže zahŕňať všímanie si, čo majú spoločné: niekedy obe žiadajú miesto, kde sa dá oddychovať aj rásť, a pomenovať, čo každá žiada, je súčasťou zvažovania.'),
    },
    closings: [
        t('If both pulls were speaking about one and the same need, what would that need be?', 'Keby obe pohnútky hovorili o jednej a tej istej potrebe, ktorá by to bola?'),
        t('Which part of where you live now would you miss anywhere else?', 'Čo z miesta, kde teraz bývaš, by ti chýbalo kdekoľvek inde?'),
        t('What stands out about your surroundings on an ordinary day when you look at them with fresh eyes?', 'Čo vynikne na tvojom prostredí v obyčajný deň, keď naň pozrieš čerstvými očami?'),
    ],
};
const adapting = {
    id: 'home-moving.adapting',
    areaId: 'home-moving',
    label: t('Reflect on adapting to a new place', 'Zamyslieť sa nad zvykaním si na nové miesto'),
    focus: t('Hold in mind a place that is new to you, or a change in your surroundings you are getting used to.', 'Maj na mysli miesto, ktoré je pre teba nové, alebo zmenu prostredia, na ktorú si zvykáš.'),
    semantics: {
        explores: t('how settling into a new place unfolds, from what shaped it to where it tends', 'ako prebieha zvykanie si na nové miesto, od toho, čo ho formovalo, po to, kam smeruje'),
        reflection: 'trace',
        practical: 'try',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'other-person-mind'],
    },
    spreadId: 'past-present-future',
    category: 'general-reflection',
    guidance: 'reflect',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What you carry into it', 'Čo do toho prinášaš'),
            ask: t('What shaped how you meet a new place: earlier homes, the habits you carry, what you hoped to find there.', 'Čo formuje to, ako vychádzaš v ústrety novému miestu: predchádzajúce domovy, zvyky, ktoré nesieš, a to, čo si od neho sľubuješ.'),
            frame: {
                steady: t('Habits from earlier homes, the ease of having begun somewhere before and hopes for the place all tend to come along into a new home.', 'Zvyky z predchádzajúcich domovov, ľahkosť z toho, že človek už niekde začínal, a nádeje spojené s miestom sa zvyknú prenášať do nového domova.'),
                strained: t('When strained, what is brought along tends to colour the arrival: comparison with a former home, hopes the new place cannot meet, habits that fit badly here.', 'To, čo sa prináša z predtým, pri záťaži sfarbuje príchod: porovnávanie s bývalým domovom, nádeje, ktoré nové miesto nenaplní, zvyky, ktoré sem zle pasujú.'),
            } },
        { label: t('Where settling in stands', 'Ako ďaleko sa zvykanie dostalo'),
            ask: t('How the place feels today: what has begun to feel familiar and what is still strange.', 'Aký je pocit z miesta dnes: čo začína byť známe a čo je ešte cudzie.'),
            frame: {
                steady: t('The place is becoming familiar: corners that have started to feel known, paths walked without thinking, a strangeness slowly wearing thin.', 'Ide o to, nakoľko sa miesto stalo známym: kúty, ktoré začínajú byť poznané, cesty prejdené bez rozmýšľania, cudzosť, ktorá sa pomaly stenčuje.'),
                strained: t('Under strain, the strangeness does not wear off: rooms that stay unfamiliar, a street that feels like someone else’s, evenings that do not feel like home.', 'Cudzosť, ktorá nevyprcháva, je to, čo tu napätie zvyčajne ukazuje: izby, ktoré ostávajú neznáme, ulica, ktorá pôsobí ako cudzia, večery, ktoré nie sú ako doma.'),
            } },
        { label: t('Where settling in tends', 'Kam sa zvykanie uberá'),
            ask: t('The direction settling in leans toward if the present rhythm continues: a tendency, never a promise.', 'Smer, ktorým sa zvykanie uberá, ak súčasný rytmus pokračuje: tendencia, nikdy nie sľub.'),
            frame: {
                steady: t('Settling leans somewhere, as a tendency only: what the present rhythm is gathering toward, and what it still leaves unattended.', 'Predmetom je náklon zvykania, len ako tendencia: k čomu sa súčasný rytmus zbiera a čo ešte necháva bokom.'),
                strained: t('Settling can stall: a rhythm that keeps the place at a distance, where days go on without much of them taking root.', 'Zabývanie sa môže zadrhnúť: rytmus, ktorý drží miesto v odstupe, kde dni plynú a málo z nich zapúšťa korene, je to, čo tu tlak zvyčajne ukazuje.'),
            } },
    ],
    opening: t('This reading looks at settling into a new place. The first card is what shaped how you meet it, the second where the settling in stands today, and the third where it tends if the present rhythm continues: a tendency, not a promise.', 'Toto čítanie sa pozerá na zvykanie si na nové miesto. Prvá karta je to, čo formuje, ako mu vychádzaš v ústrety, druhá to, ako ďaleko sa zvykanie dostalo, a tretia to, kam smeruje, ak súčasný rytmus pokračuje: tendencia, nie sľub.'),
    takeaway: {
        act: t('One small, repeated act can start making the place yours: the same walk each morning, the same chair at the same table, a greeting to the same neighbour.', 'Jeden malý, opakovaný skutok môže začať robiť miesto tvojím: tá istá ranná prechádzka, to isté kreslo pri tom istom stole, pozdrav tomu istému susedovi.'),
        ease: t('Settling in asks for time rather than effort: allow the place to stay unfamiliar a little longer, and let familiarity arrive at its own pace.', 'Zabývanie si žiada skôr čas než námahu: dovoľ miestu zostať ešte chvíľu cudzím a nechaj známosť prísť vlastným tempom.'),
        face: t('Name plainly what feels strange or missing in the new surroundings, and let that be part of the picture rather than something to hide.', 'Pomenuj bez okolkov, čo v novom prostredí pôsobí cudzo alebo chýba, a nechaj to byť súčasťou obrazu, nie niečím, čo treba skrývať.'),
        weave: t('Settling in comes together where old and new meet: bring one thing from before into the rooms and let one new habit grow beside it.', 'Miesto sa stáva domovom tam, kde sa stretne staré a nové: vnes do izieb jednu vec z predtým a nechaj popri nej vyrásť jeden nový zvyk.'),
    },
    closings: [
        t('What would make the next ordinary evening here feel a little more like yours?', 'Čo by urobilo ďalší obyčajný večer tu o niečo viac tvojím?'),
        t('Which corner, sound or habit of the new place has started to feel familiar before it quite registered?', 'Ktorý kút, zvuk alebo zvyk nového miesta ti začal byť známy skôr, než ti to došlo?'),
        t('What from an earlier home do you still reach for, and what does that say about what you need here?', 'Po čom z predchádzajúceho domova ešte stále siaheš a čo to hovorí o tom, čo potrebuješ tu?'),
    ],
};
const grounded = {
    id: 'home-moving.grounded',
    areaId: 'home-moving',
    label: t('Discover what helps me feel grounded', 'Objaviť, čo mi dáva pevnú pôdu pod nohami'),
    focus: t('Hold in mind a moment when a place gave you a sense of steady ground, and what was around you then.', 'Maj na mysli chvíľu, keď ti miesto dávalo pocit pevnej pôdy, a to, čo bolo vtedy okolo teba.'),
    semantics: {
        explores: t('what already steadies you in a place, what else is within reach and where to lean on it', 'čo ti na mieste už teraz dáva oporu, čo ďalšie je na dosah a kde sa o to oprieť'),
        reflection: 'resource',
        practical: 'steady',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim'],
    },
    spreadId: 'resources-view',
    category: 'general-reflection',
    guidance: 'resources',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What already steadies you', 'Čo ti už teraz dáva oporu'),
            ask: t('The things and habits in your surroundings that already give you a sense of ground: a chair, a routine, a view.', 'Veci a zvyky v tvojom prostredí, ktoré ti už dávajú pocit pevnej pôdy: kreslo, rutina, výhľad.'),
            frame: {
                steady: t('Something steadying is already in place: a chair, a routine, a view, something the day leans on without noticing.', 'Opora, ktorá už stojí na svojom mieste, je tu témou: kreslo, zvyk, výhľad, niečo, o čo sa deň opiera bez povšimnutia.'),
                strained: t('Worn thin, a support tends to show up here as a routine kept up without comfort, a favourite spot that no longer settles, ground less solid than it looks.', 'Obnosená opora sa tu zvyčajne ukazuje ako zvyk udržiavaný bez útechy, obľúbené miesto, ktoré už neukľudňuje, pôda menej pevná, než vyzerá.'),
            } },
        { label: t('What else is nearby', 'Čo ďalšie je nablízku'),
            ask: t('What else could support that feeling close at hand: a neighbour, a park, a quiet hour, a corner not yet used.', 'Čo ďalšie by mohlo tento pocit podporiť na dosah ruky: sused, park, tichá hodina, kút, ktorý ešte nie je využitý.'),
            frame: {
                steady: t('Within easy reach sits something not yet used: a neighbour, a park, a quiet hour, a corner that has not been given a purpose.', 'Na dosah leží niečo ešte nevyužité: sused, park, tichá hodina, kút, ktorému ešte nebol daný účel.'),
                strained: t('Under stress, nearby support is hard to take up: something noticed but not yet trusted, held off by tiredness or doubt.', 'Blízka opora, ktorú je ťažké prijať, ukazuje tlak: niečo zbadané, ale zatiaľ neodskúšané, držané bokom únavou alebo pochybnosťou.'),
            } },
        { label: t('Where to lean on it', 'Kde sa o to oprieť'),
            ask: t('The part of daily life where these supports could be leaned on, as a direction to try rather than a plan.', 'Časť každodenného života, kde by sa o tieto opory dalo oprieť: smer na vyskúšanie, nie plán.'),
            frame: {
                steady: t('Support would be felt most in a particular part of the day: an hour, room or habit where leaning comes easily.', 'Najviac by sa opora cítila v určitej časti dňa: hodina, izba alebo zvyk, kde je ľahké oprieť sa.'),
                strained: t('Some part of daily life resists support when strained: an hour or a room where steadiness slips away and leaning on anything feels difficult.', 'Istá časť dňa sa v ťažkých chvíľach oporou bráni: hodina alebo izba, kde pevnosť uniká a opierať sa o čokoľvek je ťažké.'),
            } },
    ],
    opening: t('This reading looks at what helps you feel grounded in a place. The first card is what already steadies you, the second what else lies close at hand, and the third where these supports could be put to use in daily life.', 'Toto čítanie sa pozerá na to, čo ti pomáha mať na mieste pevnú pôdu pod nohami. Prvá karta je to, čo ti už teraz dáva oporu, druhá to, čo ďalšie je na dosah ruky, a tretia miesto v každodennom živote, kde by sa tieto opory dali využiť.'),
    takeaway: {
        act: t('Lean on one steadying thing in a small, ordinary way: sit in the same spot at the same hour for a few days and notice what it gives.', 'Oprieť sa o jednu vec, ktorá dáva oporu, malým, obyčajným spôsobom: na pár dní si sadnúť na rovnaké miesto v rovnakú hodinu a všimnúť si, čo to dáva.'),
        ease: t('Steadiness does not need anything added: it may come from taking away noise, hurry or clutter until what is already steady can be felt.', 'Pevná pôda nevyžaduje nič pridávať: môže vzniknúť odoberaním hluku, zhonu či neporiadku, kým sa nezačne cítiť to, čo je už pevné.'),
        face: t('It may help to admit what is not steady in your surroundings, and to start from what is.', 'Môže pomôcť priznať, čo v tvojom okolí pevné nie je, a vychádzať z toho, čo pevné je.'),
        weave: t('Support gathers where routine, place and meaning touch: a repeated act, in a particular spot, that matters to you.', 'Opora vzniká tam, kde sa dotýka zvyk, miesto a zmysel: opakovaný skutok na konkrétnom mieste, na ktorom ti záleží.'),
    },
    closings: [
        t('Which ordinary corner of your day already feels like solid ground?', 'Ktorý obyčajný kútik tvojho dňa ti už teraz pripadá ako pevná pôda?'),
        t('What in a room makes your shoulders drop as soon as you come in?', 'Čo ti v izbe uvoľní plecia hneď, ako vstúpiš?'),
        t('If one steady thing could be added to your surroundings, what quality would it bring?', 'Ak by sa do tvojho okolia dala pridať jedna stála vec, akú vlastnosť by priniesla?'),
    ],
};
export const HOME_AREA = {
    id: 'home-moving',
    label: t('Home & Moving', 'Domov a sťahovanie'),
    blurb: t('What home means, how a place fits, and what grounds you in it.', 'Čo znamená domov, ako ti miesto sedí a čo ti v ňom dáva oporu.'),
    scope: t('place, belonging and the dwelling', 'miesto, spolupatričnosť a bývanie'),
    intentions: [meaning, needForChange, adapting, grounded],
    lens,
};
