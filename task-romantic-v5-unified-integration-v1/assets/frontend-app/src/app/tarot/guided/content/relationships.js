/**
 * RELATIONSHIPS - what passes BETWEEN people.
 *
 * This area owns the connection itself: closeness, friction, repair, distance, and how the person takes part in it. It does
 * not own inner patterns (Personal growth), the decision to leave or stay (Life changes) or a shared household (Home).
 * Whatever is said of another person is a stance the cards show, never what that person thinks, feels or will do.
 *
 * Two registers: the steady tables read after a card that is working or neutral, the strained tables after a card under
 * strain. The strained stage sentences are also read for the other side, so they describe a connection from outside
 * and never say "you".
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    stage: {
        'sets-something-beginning': [
            t('Between people, the early signs are usually small and easy to miss: a change of tone, a pause, a question asked for the first time, a topic that starts to return.', 'Medzi ľuďmi býva začiatok malý a ľahko prehliadnuteľný: o niečo vrelší tón, otázka položená prvýkrát, pootvorené dvere.'),
            t('In a relationship, something new often shows first as willingness: to try again, to be seen a little more, to ask instead of assuming.', 'Nové sa vo vzťahu často prejaví najprv ako ochota: skúsiť to znova, ukázať sa o niečo viac, opýtať sa namiesto domnievania sa.'),
        ],
        'sustains-an-effort': [
            t('Much of what keeps a bond alive is unglamorous: showing up, repairing small things, doing the work nobody applauds.', 'Väčšina z toho, čo vzťah udržiava nažive, je nenápadná: prísť, keď treba, opraviť drobnosti, robiť prácu, za ktorú nikto netlieska.'),
            t('Closeness is rarely held by feeling alone; it is held by what gets done again and again, long after the first enthusiasm.', 'Blízkosť sa málokedy udrží samotným citom; drží ju to, čo sa robí znova a znova, dlho po prvom nadšení.'),
        ],
        'holds-still': [
            t('When a relationship holds still, it can be a pause with room to breathe, or a silence that is hard to be the first to break.', 'Keď vzťah stojí, môže to byť pauza, v ktorej sa obaja nadýchnu, alebo ticho, ktoré je ťažké prelomiť.'),
            t('Stillness between people can be rest or standoff, and the difference usually lies in whether anything is still being said.', 'Ticho medzi ľuďmi môže byť oddych aj pat a rozdiel býva v tom, či sa ešte niečo hovorí.'),
        ],
        'stands-at-full-extent': [
            t('A connection at its fullest shows what it is made of: its warmth and its limits are both in plain view.', 'Vzťah v plnej šírke ukazuje, z čoho je utkaný: teplo aj hranice sú na očiach.'),
            t('The fullest moment of a bond is not always its easiest; it is simply when little of it stays hidden.', 'Najplnší okamih vzťahu nemusí byť jeho najľahší; je to len chvíľa, keď sa z neho už takmer nič neskrýva.'),
        ],
        'is-mid-transition': [
            t('A relationship in transition is no longer what it was and not yet what it is becoming, and that in-between can feel like losing footing.', 'Vzťah v premene už nie je taký, aký bol, a ešte nie je taký, aký sa stáva; toto medzidobie môže pripadať ako strata opory.'),
            t('Between people, change often arrives as an unsettled stretch in which the old roles no longer fit and no one has yet agreed on new ones.', 'Zmena medzi ľuďmi často prichádza ako neusadené obdobie, v ktorom staré roly nesedia a nové ešte nikto neurčil.'),
        ],
        'is-being-broken-into': [
            t('When something breaks into a relationship (a hard truth, a rupture, an unexpected need) it shows what the connection was resting on.', 'Keď do vzťahu vstúpi niečo prudké (nepríjemná pravda, roztržka, nečakaná potreba), ukáže, na čom stál.'),
            t('A shock between people tends to bring out the assumptions nobody said aloud, and asks how far they were ever shared.', 'Otras medzi ľuďmi zvykne vyniesť na svetlo predpoklady, ktoré nikto nevyslovil, a pýta sa, nakoľko boli vôbec spoločné.'),
        ],
        'is-letting-go': [
            t('Letting go in a relationship can mean releasing an expectation, a role, an old grievance or a picture of someone, and not necessarily the person.', 'Pustiť vo vzťahu môže znamenať uvoľniť očakávanie, rolu, starú výčitku alebo predstavu o druhom, a nie nutne samotného človeka.'),
            t('What is being put down between people is often a story (how it should have gone, who should have changed) more than a person.', 'To, čo sa medzi ľuďmi odkladá, je často príbeh (ako to malo ísť, kto sa mal zmeniť) viac než človek.'),
        ],
        'is-coming-together': [
            t('Where things come together between people, differences stop competing and begin to fit: not sameness, but a workable whole.', 'Tam, kde sa veci medzi ľuďmi spájajú, rozdiely prestávajú súperiť a začínajú do seba zapadať: nie zhoda do bodky, ale použiteľný celok.'),
            t('A connection tends to deepen when each side\'s way of being finds a place in the shared space without the other having to give theirs up.', 'Spojenie sa zvykne prehlbovať, keď sa spôsob bytia každého nájde v spoločnom priestore a nikto nemusí vzdať ten svoj.'),
        ],
    },
    stance: {
        continue: [
            t('Continuing between people usually rests on small, reliable gestures: a message answered, a promise kept, a presence that can be counted on.', 'Pokračovanie medzi ľuďmi sa zvyčajne opiera o malé, spoľahlivé gestá: odpovedanú správu, dodržaný sľub, prítomnosť, na ktorú sa dá spoliehať.'),
            t('To carry on in a relationship is to ask what in it is still alive and worth tending, and to give that steady attention rather than a grand gesture.', 'Pokračovať vo vzťahu znamená pýtať sa, čo v ňom ešte žije a stojí za starostlivosť, a venovať tomu stálu pozornosť namiesto veľkého gesta.'),
        ],
        redirect: [
            t('Redirecting here means changing how a concern is brought (another tone, another moment, another way of asking) while the care behind it stays the same.', 'Zmeniť smer tu znamená zmeniť spôsob, akým sa starosť prináša (iný tón, iný moment, iný spôsob pýtania sa), pričom samotná starostlivosť ostáva rovnaká.'),
            t('A change of approach rather than of heart: the same concern, put in a form the other side can take in.', 'Zmena prístupu, nie srdca: tá istá starosť vyslovená v podobe, ktorú druhá strana dokáže prijať.'),
        ],
        'let-go': [
            t('Something is being asked to be put down: an expectation, the need to be right, the hope that a person might turn into someone else.', 'Žiada sa niečo odložiť: očakávanie, potrebu mať pravdu, nádej, že sa z niekoho stane niekto iný.'),
            t('Putting down a grievance or an old picture of how this should go can make room for what is actually here.', 'Odložiť výčitku alebo starý obraz toho, ako to malo byť, môže uvoľniť miesto pre to, čo tu naozaj je.'),
        ],
        moderate: [
            t('Between people, moderation is a matter of proportion: how much to say, how much to ask, how much to leave for another day.', 'Miernosť medzi ľuďmi je otázkou miery: koľko povedať, koľko sa spýtať a koľko nechať na iný deň.'),
            t('A middle way here is neither pressing nor withdrawing, but a pace at which both sides can answer.', 'Stredná cesta tu nie je ani tlačenie, ani ústup, ale tempo, v ktorom môžu odpovedať obe strany.'),
        ],
        'meet-it': [
            t('Meeting it asks for a look at what is actually going on between people instead of managing around it.', 'Postaviť sa tomu čelom znamená pozrieť sa na to, čo sa medzi ľuďmi naozaj deje, namiesto obchádzania.'),
            t('To meet it is to say the real thing plainly and kindly, and to bear the discomfort of its being said.', 'Čeliť tomu znamená povedať skutočnú vec jasne a láskavo a uniesť nepohodlie z toho, že odznela.'),
        ],
        wait: [
            t('Some things between people cannot be hurried; waiting here leaves the other side room to arrive at its own pace, and leaves you room to notice what you do meanwhile.', 'Niektoré veci medzi ľuďmi sa nedajú urýchliť; čakanie tu necháva druhej strane priestor prísť vlastným tempom a tebe priestor všimnúť si, čo robíš medzitým.'),
            t('Patience here is not passivity: it is leaving space without filling it with assumptions.', 'Trpezlivosť tu nie je pasivita: znamená nechať priestor a nezaplniť ho domnienkami.'),
        ],
        choose: [
            t('A choice in a relationship is often about the part a person takes in it: how present, how open, how patient.', 'Voľba vo vzťahu sa často týka úlohy, ktorú v ňom človek preberá: ako prítomne, ako otvorene, ako trpezlivo.'),
            t('The choice here is less about the other person than about what is considered worth keeping in the connection.', 'Voľba tu nie je ani tak o druhom človeku, ako o tom, čo ti vo vzťahu stojí za to zachovať.'),
        ],
        integrate: [
            t('Integrating here means bringing the pieces into agreement (what is felt, what is said, what is done) so that they stop pulling in different directions.', 'Zjednotenie tu znamená priviesť jednotlivé časti do súladu (čo sa cíti, čo sa hovorí, čo sa robí), aby sa netrhali na rôzne strany.'),
            t('Between people, integration starts with words and actions that match, so that what reaches the other person is one thing rather than several.', 'Zjednotenie medzi ľuďmi začína slovami a skutkami, ktoré sa zhodujú, aby sa k druhému človeku dostalo jedno posolstvo, nie viaceré.'),
        ],
        'attend-to-it': [
            t('Something between people asks for attention before a solution: looking closely first, deciding afterwards.', 'Niečo medzi ľuďmi si žiada pozornosť skôr než riešenie: najprv pozrieť zblízka, až potom sa rozhodovať.'),
            t('The work here is noticing (how one reacts, where one tightens, what keeps repeating) before trying to fix anything.', 'Práca tu spočíva vo všímaní (ako sa reaguje, kde sa človek stiahne, čo sa opakuje) skôr, než sa čokoľvek pokúsi opraviť.'),
        ],
    },
    trend: {
        expanding: t('Expansion would favour openness: more said, more shared, more risked, with less regard for the safety of staying small.', 'Rozširovanie sa prikláňa k otvorenosti: viac povedaného, viac zdieľaného, viac riskovaného, s menším ohľadom na istotu malého priestoru.'),
        contracting: t('Contraction here is a pull toward protection: less said, more distance, a narrowing that guards something and leaves out reach.', 'Sťahovanie do seba je sklon k ochrane: menej povedaného, viac odstupu, zúženie, ktoré niečo stráži a necháva na dosah menej.'),
        stabilising: t('The steadying pull favours reliability: a rhythm that has become familiar, ground that bears weight, and less room for the unexpected.', 'Ustaľovanie dáva prednosť spoľahlivosti: známemu rytmu a pôde, ktorá unesie váhu, s menším miestom pre neočakávané.'),
        disrupting: t('A disruptive pull loosens what has set: patterns, arrangements and roles are tested, and the question is what was holding them.', 'Narúšanie uvoľňuje to, čo stuhlo: vzorce, dohody a roly sa skúšajú a otázkou je, čo ich držalo.'),
        redirecting: t('Redirection favours a different shape of the connection, in which roles and expectations are renegotiated and the old form is left aside.', 'Presmerovanie robí miesto inej podobe spojenia, v ktorej sa roly a očakávania dohadujú nanovo a stará podoba ostáva bokom.'),
        resolving: t('The settling pull favours closing what has been open (a conversation finished, a tension eased, a question answered) and may leave less room for what is still unsaid.', 'Uzatváranie hľadá dokončenie otvoreného (dokončený rozhovor, uvoľnené napätie, zodpovedaná otázka) a môže nechať menej miesta pre to, čo ešte nezaznelo.'),
        suspended: t('A suspended pull holds things undecided: neither forward nor back, a pause that keeps options open and keeps questions open too.', 'Pozastavenie drží veci v nerozhodnutí: ani vpred, ani späť, pauza, ktorá necháva otvorené možnosti, ale aj otázky.'),
    },
    strained: {
        stage: {
            'sets-something-beginning': t('A beginning that goes hard tends to feel tentative and easily bruised: a first step that comes too early, a fresh start carrying old hurt, an opening that is not yet trusted.', 'Začiatok, ktorý ide ťažko, býva váhavý a ľahko zraniteľný: prvý krok príliš skoro, nový štart zaťažený starou ranou, otvorenie, ktorému sa ešte celkom neverí.'),
            'sustains-an-effort': t('Sustained effort that goes hard tends to feel like carrying more than a fair share, or like keeping things going from habit once the warmth has thinned, with a tiredness that is hard to say aloud.', 'Trvalé úsilie, ktoré ide ťažko, sa často cíti ako nesenie viac než spravodlivého podielu alebo ako udržiavanie zo zvyku, keď sa teplo vytratilo, a únavu je ťažké vysloviť.'),
            'holds-still': t('A pause in strain can feel less like rest than like a standoff: unsaid things pile up, and the stillness is held by caution or a fear of making it worse.', 'Pauza v napätí sa môže cítiť skôr ako pat než ako oddych: nevysloveného pribúda a ticho drží opatrnosť alebo obava, že sa to zhorší.'),
            'stands-at-full-extent': t('A connection stretched to its fullest while it goes hard can show overreach: too much asked, too much given, or a limit passed before it was named.', 'Vzťah natiahnutý na doraz, keď to ide ťažko, môže ukazovať prekročenie miery: priveľa sa žiada, priveľa dáva alebo sa hranica prejde skôr, než sa pomenuje.'),
            'is-mid-transition': t('A transition in strain tends to feel like drifting between roles that no longer fit, with the old arrangement gone, no new one settled and footing hard to find.', 'Premena, ktorá je ťažká, sa často cíti ako unášanie medzi rolami, ktoré už nesedia: staré usporiadanie je preč, nové nie je ustálené a oporu je ťažké nájsť.'),
            'is-being-broken-into': t('A rupture that lands hard tends to bring sharp words, exposed assumptions and hurt that arrives faster than it can be made sense of.', 'Roztržka, ktorá dopadne tvrdo, zvykne priniesť ostré slová, odhalené predpoklady a bolesť, ktorá prichádza rýchlejšie, než sa jej dá porozumieť.'),
            'is-letting-go': t('Letting go in strain is often grudging or incomplete: a grievance put down and picked up again, grief and relief so tangled that they are hard to tell apart.', 'Púšťanie v napätí je často neochotné alebo nedokončené: výčitka odložená a znova zodvihnutá, smútok a úľava tak zamotané, že sa ťažko rozlišujú.'),
            'is-coming-together': t('Coming together under pressure can turn into a pairing pushed by the wish for peace, where differences are pressed flat instead of given room.', 'Spájanie pri záťaži sa môže zmeniť na zosúladenie vynútené túžbou po pokoji, pri ktorom sa rozdiely stlačia dohromady namiesto toho, aby dostali miesto.'),
        },
        stance: {
            continue: t('Continuing when it is hard can harden into repetition: the same argument, the same silence, carried on from habit because stopping would mean looking at it.', 'Pokračovať v ťažkom môže stuhnúť do opakovania: ten istý spor, to isté ticho, vlečené zo zvyku, lebo zastaviť sa by znamenalo pozrieť sa na to.'),
            redirect: t('Redirecting in strain can look like swerving: a sudden change of tone or subject that avoids the concern instead of carrying it differently, so that it may return in another form.', 'Zmena smeru v napätí môže pripomínať uhýbanie: náhla zmena tónu alebo témy, ktorá starosť obíde namiesto toho, aby ju priniesla inak, a tá sa môže vrátiť v inej podobe.'),
            'let-go': t('Letting go when it goes hard tends to be grudging or half done: a hand opened and closed again, relief and loss so mixed that the release does not quite hold.', 'Pustenie, ktoré ide ťažko, býva neochotné alebo napoly hotové: dlaň otvorená a znova zovretá, úľava a strata tak zmiešané, že uvoľnenie celkom nedrží.'),
            moderate: t('Moderation under pressure slips toward either end: pressing harder to be heard, or going quiet to keep the peace, and neither gives the connection what it needs.', 'Miernosť pri záťaži sa kloní ku krajnostiam: tlačiť silnejšie, aby bolo počuť, alebo stíchnuť kvôli pokoju, a ani jedno nedáva vzťahu, čo potrebuje.'),
            'meet-it': t('Meeting it in strain can come out as confrontation: the true thing said at the wrong moment or with more edge than care, so that the saying itself becomes a new hurt.', 'Postaviť sa tomu v napätí môže vyznieť ako konfrontácia: pravdivá vec povedaná v nevhodnej chvíli alebo s väčšou ostrosťou než starostlivosťou, a samotné vyslovenie sa môže stať novou ranou.'),
            wait: t('Waiting when it is hard tends to curdle into withholding or testing: silence kept as pressure, or patience that is really avoidance.', 'Čakanie, ktoré je ťažké, sa ľahko zmení na zadržiavanie alebo skúšanie: ticho držané ako nátlak alebo trpezlivosť, ktorá je v skutočnosti vyhýbanie sa.'),
            choose: t('A choice made in strain is often rushed or put off altogether, so that how one takes part gets settled by default rather than by intent.', 'Voľba v tiesni sa často robí narýchlo alebo sa odkladá úplne, takže o spôsobe účasti rozhodne zotrvačnosť, nie zámer.'),
            integrate: t('Integration in strain can mean words and actions pulling apart: one thing said, another felt, a third done, so that one’s own stance is hard to read even to oneself.', 'Zjednotenie v napätí môže znamenať, že sa slová a skutky rozchádzajú: jedno sa povie, druhé cíti, tretie robí, a vlastný postoj je ťažké rozpoznať aj pre seba.'),
            'attend-to-it': t('Attending when it is hard can tip into scanning every exchange for signs and going over it again and again, with little becoming clearer.', 'Všímanie si v ťažkom sa môže zvrhnúť na prehľadávanie každej výmeny v hľadaní znamení a opakované omieľanie, pričom sa len máločo vyjasní.'),
        },
        trend: {
            expanding: t('Expansion in strain is overreach: too much said too fast, or the connection stretched wider than its trust can hold.', 'Rozširovanie v napätí je prílišný rozmach: priveľa povedaného priskoro alebo vzťah natiahnutý širšie, než unesie jeho dôvera.'),
            contracting: t('Contraction when it goes hard feels like withdrawal: silence thickening, distance growing, protective moves that can easily be felt as rejection.', 'Stiahnutie sa, ktoré ide ťažko, pripomína ústup: ticho hustne, odstup rastie a ochranné kroky sa dajú ľahko pocítiť ako odmietnutie.'),
            stabilising: t('Steadying under pressure can be a steadiness bought by going rigid or numb: the surface calm while what needs saying stays outside.', 'Ustaľovanie pri záťaži môže byť pevnosť vykúpená stuhnutím alebo otupením: povrch pokojný, kým to, čo treba povedať, ostáva vonku.'),
            disrupting: t('Disruption in strain is the sharp form: old arrangements giving way abruptly, and a stretch in which little feels reliable.', 'Rozrušenie, ktoré ide ťažko, je jeho ostrá podoba: staré dohody povoľujú prudko a ide o úsek, v ktorom sa málo čo zdá spoľahlivé.'),
            redirecting: t('Redirection made in a squeeze is a turn taken under pressure rather than by agreement, which leaves roles and expectations contested.', 'Presmerovanie v tiesni je zákruta urobená z núdze, nie dohodou, a roly s očakávaniami ostávajú sporné.'),
            resolving: t('Resolving in strain tends to be a hurried or partial closure: a conversation ended before it was finished, with what remained unsaid still present.', 'Uzatváranie v ťažkom býva narýchlo alebo len čiastočné: rozhovor ukončený skôr, než bol dokončený, pričom nevyslovené tu stále je.'),
            suspended: t('Suspension in strain is a stalemate: undecided and uncomfortable, with the wait for someone to move first wearing on.', 'Pozastavenie v napätí je pat: nerozhodnuté a nepríjemné, pričom čakanie, kým sa niekto pohne ako prvý, unavuje.'),
        },
    },
    arc: {
        continuation: t('Read together, the cards show a connection carrying on in the pattern it already has, which raises what in that pattern is worth keeping.', 'Spolu sa karty dajú vidieť ako vzťah, ktorý pokračuje vo vzorci, aký už má, s otázkou, čo z neho stojí za zachovanie.'),
        escalation: t('In order, the cards show feeling or friction gathering weight between people, step by step.', 'V poradí sa karty dajú čítať ako cit alebo trenie, ktoré medzi ľuďmi krok za krokom naberá na váhe.'),
        interruption: t('Something cuts across the usual pattern between people, and the question is what that interruption brings into view.', 'Poradie sa dá čítať ako niečo, čo prekríži obvyklý vzorec medzi ľuďmi, a ako otázka, čo toto prerušenie vynesie na svetlo.'),
        'breakdown-to-recovery': t('The order runs from strain toward repair, and what broke is named before anything is rebuilt.', 'Poradie možno vidieť ako cestu od napätia k náprave, na ktorej sa to, čo sa zlomilo, najprv pomenuje a až potom sa znovu stavia.'),
        'expansion-to-limit': t('A connection opens out and then meets its edge, which asks what that edge says about how much can be given.', 'Poradie sa dá čítať ako vzťah, ktorý sa rozšíri a potom narazí na hranicu, s otázkou, čo tá hranica hovorí o tom, koľko sa dá dať.'),
        'stasis-to-movement': t('The cards move from a held, stuck pattern between people toward something beginning to shift.', 'Karty sa dajú čítať ako posun od uviaznutého vzorca k niečomu, čo sa začína hýbať.'),
        'conflict-to-integration': t('Opposing needs open the sequence, and it moves toward a workable whole, where the difference is made room for rather than erased.', 'Protichodné potreby otvárajú poradie a dá sa čítať ako smerovanie k použiteľnému celku, v ktorom rozdiel dostane miesto namiesto toho, aby sa vymazal.'),
        'opening-to-choice': t('The order runs from an opening between people to a point where how to take part becomes a real question.', 'Poradie sa dá čítať ako otvorenie medzi ľuďmi, po ktorom sa otázka, ako sa na vzťahu podieľať, stáva skutočnou.'),
        'holding-to-release': t('Something held tightly begins to loosen across the order: a hand opening rather than a door closing.', 'Poradie sa dá čítať ako uvoľňovanie niečoho, čo sa držalo pevne: otvára sa dlaň, nezatvárajú sa dvere.'),
        'uncertainty-to-clarity': t('The order shifts from murkiness about where things stand toward something that can be seen and named.', 'Poradie možno vidieť ako posun od zahmlenosti o tom, ako veci stoja, k niečomu, čo by sa dalo vidieť a pomenovať.'),
        'stability-to-disruption': t('A steady arrangement is shaken across the order, which asks what the steadiness was really made of.', 'Poradie sa dá čítať ako otrasenie pevného usporiadania a ako otázka, z čoho tá pevnosť v skutočnosti bola.'),
        redirection: t('The sequence bends rather than stops: the line of the connection no longer points quite where it did.', 'Poradie možno vidieť skôr ako zákrutu než zastavenie: línia vzťahu už nemieri celkom tam, kam predtým.'),
    },
    alignment: {
        aligned: t('Your card and the other side\'s card lean the same way, so there is less to reconcile and more to recognise in what is shared.', 'Tvoja karta a karta druhej strany sa nakláňajú rovnakým smerom, takže je menej čo zlaďovať a viac čo rozpoznať v tom, čo je spoločné.'),
        complementary: t('The two sides differ but fit, each supplying something the other lacks.', 'Obe strany sa líšia, ale zapadajú do seba a každá dopĺňa to, čo druhej chýba.'),
        opposed: t('The two sides pull against each other, and the card between you shows what that pull has to pass through.', 'Obe strany idú proti sebe a karta medzi vami ukazuje, cez čo musí tento protiklad prejsť.'),
        apart: t('The two sides seem to look at different things altogether, so what lies between you may first be a matter of finding something common to look at.', 'Zdá sa, že obe strany sa pozerajú na úplne iné veci, takže to, čo je medzi vami, môže najprv spočívať v hľadaní niečoho spoločného, na čo sa dá pozerať.'),
    },
    suit: {
        wands: t('Wands bring drive and warmth to relating: initiative, passion, and the heat of wanting something from each other.', 'Palice dávajú vzťahu iskru a teplo: iniciatívu, vášeň a žiar toho, keď od seba navzájom niečo chceme.'),
        cups: t('Cups carry the heart of a relationship: feeling, tenderness, care, and the way care is given and received.', 'Poháre nesú srdce vzťahu: cit, nežnosť, starostlivosť a to, ako sa starostlivosť dáva a prijíma.'),
        swords: t('Swords speak of thought and communication between people: what is said, what is held back, and how clearly it is understood.', 'Meče hovoria o myslení a komunikácii medzi ľuďmi: čo sa povie, čo sa zadrží a ako jasne sa to pochopí.'),
        pentacles: t('Pentacles ground a relationship in the practical: time, reliability, shared routines and what is actually done for each other.', 'Mince zakotvujú vzťah v praktickom: čas, spoľahlivosť, spoločné zvyky a to, čo pre seba navzájom skutočne robíme.'),
    },
    weighing: t('Between people, two pulls (closeness and room, speaking up and holding back) rarely resolve by one winning outright; they tend to settle when each is given its due.', 'Medzi ľuďmi sa dve potreby (blízkosť a priestor, prehovoriť a zadržať) málokedy vyriešia tým, že jedna jednoducho vyhrá; zvyknú sa usadiť, keď dostane každá svoje.'),
    layers: t('A relationship rests on three things at once: what is done, what is felt and what it means to the person living it. It is steadiest when none of them is left out.', 'Vzťah stojí na troch veciach naraz: na tom, čo sa robí, čo sa cíti a čo to pre človeka znamená. Najpevnejší je, keď žiadna z nich nechýba.'),
    majorWeight: t('Major cards in the lead suggest a theme that matters more than an everyday exchange.', 'Keď v čítaní prevládajú Veľké arkány, ide o viac než o bežnú výmenu: dotýka sa to niečoho trvalejšieho v tom, ako sa zúčastnení vzťahujú.'),
};
const current = {
    id: 'relationships.current-situation',
    areaId: 'relationships',
    label: t('Understand my current relationship situation', 'Pochopiť moju aktuálnu vzťahovú situáciu'),
    focus: t('Hold in mind the relationship you want to understand, and how it feels to you right now.', 'Maj na mysli vzťah, ktorému chceš porozumieť, a to, aký ti teraz je.'),
    semantics: {
        explores: t('where one of your relationships stands right now', 'to, v akom stave je teraz jeden z tvojich vzťahov'),
        reflection: 'orient',
        practical: 'name',
        forbids: ['other-person-mind', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'self-other-relationship',
    category: 'relationship',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('How you stand in it', 'Ako v ňom stojíš'),
            ask: t('Your own part in this connection right now: what you bring and how you hold it.', 'Tvoja vlastná časť v tomto spojení práve teraz: čo do neho prinášaš a ako to nesieš.'),
            frame: {
                steady: t('The part played almost without thought: warmth, habits and ways of showing up that make a person recognisable in a connection.', 'Úloha hraná takmer bez premýšľania: teplo, návyky a spôsoby, ako sa objaviť, vďaka ktorým je človek vo vzťahu spoznateľný.'),
                strained: t('Under strain, your part becomes a role carried under pressure: taken on too heavily, kept up by habit, or worn thin.', 'Ide o úlohu hranú s námahou: rolu prevzatú príliš ťažko, postoj držaný zo zvyku, spôsob, ako sa objaviť, ktorý sa obnosil.'),
            } },
        { label: t('How the other side meets you', 'Ako ťa stretáva druhá strana'),
            ask: t('The stance the other side shows from where you stand: a role or a posture, never what the other side privately thinks.', 'Postoj, ktorý druhá strana ukazuje z tvojho miesta: rola alebo spôsob vystupovania, nikdy to, čo si súkromne myslí.'),
            frame: {
                steady: t('What one meets from outside is a posture: an openness, a steadiness or a role that appears on turning toward the connection.', 'Zvonku človek naráža na postoj: otvorenosť, stálosť alebo rolu, ktorá sa ukáže, keď sa k spojeniu obráti.'),
                strained: t('Here the posture is hard to meet: guarded, stiff or demanding as seen from outside, with nothing implied about what lies behind it.', 'Tu je s postojom ťažké sa stretnúť: zvonku pôsobí strážne, strnulo alebo náročne, bez toho, že by sa tým čokoľvek tvrdilo o tom, čo je za ním.'),
            } },
        { label: t('What lives between you', 'Čo žije medzi vami'),
            ask: t('The dynamic that belongs to neither of you alone.', 'Dynamika, ktorá nepatrí ani jednému z vás samotnému.'),
            frame: {
                steady: t('Ground that belongs to the connection rather than to either person: a rhythm, a private joke, a way of talking, a quiet that feels comfortable from where you stand.', 'Pôda, ktorá patrí spojeniu, nie jednému z ľudí v ňom: rytmus, súkromný vtip, spôsob rozprávania, ticho, v ktorom ti je príjemne.'),
                strained: t('Under pressure, what lives between you is a pattern that keeps coming back, as it feels from your side: a repeated exchange, an unspoken rule, a distance that has settled in.', 'Na tomto mieste napätie ukazuje na vzorec, ktorý sa medzi vami opakuje, tak ako ho vnímaš ty: stále tú istú výmenu, nevyslovené pravidlo, usadený odstup.'),
            } },
    ],
    opening: t('This reading looks at where one of your relationships stands right now. The first card is your own part in it, the second the stance the other side shows from where you stand, and the third what has grown between you.', 'Toto čítanie sa pozerá na to, v akom stave je teraz jeden z tvojich vzťahov. Prvá karta je tvoja vlastná časť v ňom, druhá postoj, ktorý druhá strana ukazuje z tvojho miesta, a tretia to, čo medzi vami vyrástlo.'),
    takeaway: {
        act: t('The most useful move here is a small, concrete one: a conversation held, a habit adjusted, a boundary made visible.', 'Najužitočnejší krok je tu malý a konkrétny: rozhovor, ktorý sa uskutoční, zvyk, ktorý sa upraví, hranica, ktorá sa ukáže.'),
        ease: t('What helps is less effort rather than more: a slower pace, fewer demands, and room for the connection to settle into what it is.', 'Pomáha skôr menej úsilia než viac: pomalšie tempo, menej požiadaviek a priestor, aby sa spojenie usadilo v tom, čím je.'),
        face: t('What this reading points to is something to look at squarely, without rushing to fix it: to name what is actually happening between you.', 'Čítanie ukazuje na niečo, na čo sa oplatí pozrieť priamo a bez zbytočného nutkania opravovať: pomenovať, čo sa medzi vami naozaj deje.'),
        weave: t('What stands out is bringing your own feeling, words and actions into line, so that the connection meets one steady you.', 'Vyniká zosúladenie tvojho cítenia, slov a skutkov, aby k spojeniu prichádzal jeden súdržný prejav.'),
    },
    closings: [
        t('Which part of this connection would you like to meet with a little more honesty?', 'Ku ktorej časti tohto spojenia chceš pristupovať o niečo úprimnejšie?'),
        t('What does your own part in this connection look like when you set the other side\'s posture aside for a moment?', 'Ako vyzerá tvoja vlastná časť v tomto spojení, keď na chvíľu odložíš postoj druhej strany?'),
        t('Which of the things that live between you was never really chosen by either side, and which of them is worth choosing again?', 'Čo z toho, čo žije medzi vami, si nikto z vás naozaj nevolil, a čo z toho stojí za to zvoliť si znova?'),
    ],
};
const tension = {
    id: 'relationships.tension',
    areaId: 'relationships',
    label: t('Explore what creates tension', 'Preskúmať, čo vytvára napätie'),
    focus: t('Hold in mind a place in this relationship where things feel tight.', 'Maj na mysli miesto v tomto vzťahu, kde je to napäté.'),
    semantics: {
        explores: t('where tension between you and someone close shows up and what keeps it going', 'to, kde sa medzi tebou a niekým blízkym objavuje napätie a čo ho udržiava'),
        reflection: 'untangle',
        practical: 'try',
        forbids: ['other-person-mind', 'predict-outcome', 'fate-claim', 'life-directive', 'health-claim'],
    },
    spreadId: 'problem-cause-solution',
    category: 'relationship',
    guidance: 'unblock',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('Where the tension shows', 'Kde sa napätie ukazuje'),
            ask: t('The point where the strain becomes visible between you, as it appears on the surface.', 'Miesto, kde sa napätie medzi vami stáva viditeľným, tak ako sa ukazuje navonok.'),
            frame: {
                steady: t('While things are steady, the tension can still be talked about: it sits in a topic, a moment or a recurring scene that is easy to recognise.', 'Keď je to stabilné, povrch napätia sa ešte dá pomenovať: téma, okamih, opakujúca sa scéna, ktorú ľahko spoznať.'),
                strained: t('Friction at its sharpest: the moment, topic or tone where things flare and the strain is hardest to hide.', 'Trenie v najostrejšej podobe: okamih, téma alebo tón, kde to vzplane a napätie sa najťažšie skrýva.'),
            } },
        { label: t('What keeps it going', 'Čo ho udržiava'),
            ask: t('The pattern underneath that feeds the tension, in how things are said, avoided or expected.', 'Vzorec pod povrchom, ktorý napätie živí: v tom, ako sa veci hovoria, obchádzajú alebo očakávajú.'),
            frame: {
                steady: t('Whatever sustains the tension by also being useful: a habit that keeps the peace, a role that gives some footing.', 'To, čo napätie udržiava tým, že je zároveň užitočné: zvyk, ktorý zachováva pokoj, rola, ktorá dáva oporu.'),
                strained: t('Pressure can keep this one going: unspoken expectation, defensiveness or silence, repeated wherever speaking plainly feels expensive.', 'Tento vzorec udržiava tlak: nevyslovené očakávanie, obrana alebo ticho, ktoré sa opakujú, lebo pozrieť sa na ne by niečo stálo.'),
            } },
        { label: t('How you can meet it', 'Ako sa s ním môžeš stretnúť'),
            ask: t('A stance on your side that speaks to that pattern. It asks for a way of being, not for a result.', 'Postoj na tvojej strane, ktorý na ten vzorec odpovedá. Ide o spôsob, akým sa k tomu postavíš, nie o výsledok.'),
            frame: {
                steady: t('A way of meeting the strain that needs no one else to change first: a tone, a pace, a kind of honesty.', 'Spôsob, ako sa napätiu postaviť, ktorý nevyžaduje, aby sa najprv zmenil niekto iný: tón, tempo, druh úprimnosti.'),
                strained: t('Meeting it under strain turns forced or half meant: real effort that lands as pressure, or a stance taken only to end the discomfort.', 'Stretnutie s napätím je tu vynútené alebo napoly úprimné: skutočné úsilie, ktoré pôsobí ako nátlak, alebo postoj zaujatý len preto, aby nepohodlie skončilo.'),
            } },
    ],
    opening: t('This reading looks at tension between you and someone close. The first card is where the strain shows, the second the pattern underneath that keeps it going, and the third a stance you can take toward it. It reads patterns, not people: nothing here says what anyone intends.', 'Toto čítanie sa pozerá na napätie medzi tebou a niekým blízkym. Prvá karta je miesto, kde sa napätie ukazuje, druhá vzorec pod ním, ktorý ho udržiava, a tretia postoj, ktorý k nemu môžeš zaujať. Číta vzorce, nie ľudí: nič tu nehovorí o tom, čo kto zamýšľa.'),
    takeaway: {
        act: t('The way through is a small, specific change on your side: one conversation held differently, one request made plainly.', 'Cesta ďalej je malá, konkrétna zmena na tvojej strane: jeden rozhovor vedený inak, jedna prosba vyslovená jasne.'),
        ease: t('The tension may need less pushing and more room: slow the pace, ease the demands, and let both sides answer in their own time.', 'Napätie možno potrebuje menej tlaku a viac priestoru: spomaliť, zmierniť požiadavky a nechať každú stranu odpovedať vlastným tempom.'),
        face: t('The tension is asking to be looked at directly: say what it is, kindly and without blame, before trying to settle it.', 'Napätie chce, aby sa naň pozrelo priamo: povedať, čo to je, láskavo a bez obviňovania, skôr než sa ho pokúsiš vyriešiť.'),
        weave: t('The way through lies in consistency: let what you feel, what you say and what you do point the same way.', 'Cesta vedie cez dôslednosť: nech cit, slová a skutky mieria tým istým smerom.'),
    },
    closings: [
        t('What would change in the tension if you named your own need in it first?', 'Čo by sa v tom napätí zmenilo, keby sa ako prvá pomenovala tvoja vlastná potreba?'),
        t('What happens just before the tension rises, and what does that moment ask for?', 'Čo sa deje tesne predtým, než napätie stúpne, a o čo ten okamih žiada?'),
        t('What would a little less pressure from both sides leave room for?', 'Čomu by urobilo miesto o čosi menej tlaku z oboch strán?'),
    ],
};
const help = {
    id: 'relationships.what-helps',
    areaId: 'relationships',
    label: t('Discover what may help', 'Objaviť, čo môže pomôcť'),
    focus: t('Hold in mind a connection you would like to feel more supported in.', 'Maj na mysli vzťah, v ktorom ti na opore záleží najviac.'),
    semantics: {
        explores: t('what you already bring to a relationship and what could support it', 'to, čo do vzťahu už prinášaš a čo ho môže podporiť'),
        reflection: 'resource',
        practical: 'try',
        forbids: ['other-person-mind', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'resources-view',
    category: 'relationship',
    guidance: 'resources',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What you already bring', 'Čo do toho už prinášaš'),
            ask: t('The qualities and habits you already offer this connection.', 'Vlastnosti a návyky, ktoré tomuto spojeniu už teraz dávaš.'),
            frame: {
                steady: t('A strength already in use: a quality or habit the relationship has long drawn on, often without anyone remarking on it.', 'Silná stránka, ktorá sa už používa: vlastnosť alebo návyk, o ktorý sa vzťah dlho opiera, často bez toho, aby si to niekto všimol.'),
                strained: t('Strength carried at a cost, or held in a distorted form: care that smothers, honesty that wounds, reliability that has stiffened into rigidity.', 'Silná stránka nesená za cenu alebo držaná v pokrivenej podobe: starostlivosť, ktorá dusí, úprimnosť, ktorá zraňuje, spoľahlivosť, ktorá stuhla na strnulosť.'),
            } },
        { label: t('What is within reach', 'Čo je na dosah'),
            ask: t('What else is available to the connection beyond what you already give: a quality, a support, a shared ground.', 'Čo ďalšie je spojeniu k dispozícii okrem toho, čo už dávaš: vlastnosť, opora, spoločná pôda.'),
            frame: {
                steady: t('Here the support is not yet fully used: a quality held in reserve, a shared ground, a person or practice that steadies the connection.', 'Opora tu ešte nie je celkom využitá: vlastnosť v zálohe, spoločná pôda, človek alebo zvyk, ktorý spojenie upokojuje.'),
                strained: t('Support that is present but hard to reach: something offered that is awkward to take, or help with conditions or old hurt around it.', 'Opora, ktorá je prítomná, ale ťažko dosiahnuteľná: ponuka, ktorú je nepohodlné prijať, alebo pomoc, okolo ktorej sú podmienky či stará bolesť.'),
            } },
        { label: t('Where it could help', 'Kde by to mohlo pomôcť'),
            ask: t('The place in the relationship where these could be put to use, as a direction to try rather than a plan.', 'Miesto vo vzťahu, kde by sa to dalo využiť: smer na vyskúšanie, nie plán.'),
            frame: {
                steady: t('The spot where a strength fits best is usually ordinary: a small exchange, a passing moment, rather than a grand gesture.', 'Miesto, kde silná stránka sedí najlepšie, býva obyčajné: malá výmena, prchavý okamih, nie veľké gesto.'),
                strained: t('Using a strength here can be awkward or costly: the usual approach may not fit, and some adjusting is part of the work.', 'Použiť tu silnú stránku môže byť nepohodlné alebo nákladné; obvyklý prístup nemusí sedieť a súčasťou práce je prispôsobenie.'),
            } },
    ],
    opening: t('This reading looks at what may help a relationship of yours. The first card is what you already bring to it, the second what lies within reach beyond that, and the third where those strengths could be put to use.', 'Toto čítanie sa pozerá na to, čo môže pomôcť jednému z tvojich vzťahov. Prvá karta je to, čo do neho už prinášaš, druhá to, čo je okrem toho na dosah, a tretia miesto, kde by sa tieto silné stránky dali využiť.'),
    takeaway: {
        act: t('Put one strength to work in a small, ordinary way, and notice how the connection answers it.', 'Použi jednu silnú stránku malým, obyčajným spôsobom a všímaj si, ako na ňu spojenie odpovie.'),
        ease: t('Support here looks like softening rather than adding: give the connection a little more room and let what is already good be enough.', 'Opora tu vyzerá skôr ako zmiernenie než pridávanie: daj spojeniu o niečo viac priestoru a nechaj to, čo je už dobré, stačiť.'),
        face: t('What helps most may be the willingness to look at the connection as it really is, and to start from there.', 'Najviac môže pomôcť ochota pozrieť sa na spojenie také, aké naozaj je, a vychádzať z toho.'),
        weave: t('What helps is bringing your different strengths into one gesture, so that care, honesty and action arrive together.', 'Pomáha spojiť rôzne silné stránky do jedného gesta, aby starostlivosť, úprimnosť a konanie prišli spolu.'),
    },
    closings: [
        t('Which of your own strengths does this connection not yet get to see?', 'Ktorá z tvojich silných stránok zatiaľ nie je v tomto spojení viditeľná?'),
        t('Where in this relationship would a strength you already have be welcome, if it were offered plainly?', 'Kde by sa vo vzťahu hodila silná stránka, ktorú už máš, keby sa ponúkla jednoducho a bez okolkov?'),
        t('What is already supporting this connection that deserves to be acknowledged?', 'Čo už toto spojenie podopiera a zaslúži si, aby sa to pomenovalo?'),
    ],
};
const attention = {
    id: 'relationships.attention',
    areaId: 'relationships',
    label: t('Understand what deserves my attention', 'Pochopiť, čomu sa oplatí venovať pozornosť'),
    focus: t('Hold in mind a relationship where you sense something is going unnoticed.', 'Maj na mysli vzťah, v ktorom tušíš, že niečo uniká pozornosti.'),
    semantics: {
        explores: t('what in a relationship is in view, what may be overlooked, and what attention would change', 'to, čo je vo vzťahu na očiach, čo môže unikať a čo by sa zmenilo, keby sa tomu venovala pozornosť'),
        reflection: 'notice',
        practical: 'observe',
        forbids: ['other-person-mind', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'blind-spot-view',
    category: 'relationship',
    guidance: 'blind-spot',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What is already in view', 'Čo je už na očiach'),
            ask: t('What you can already see about this connection, as plainly as it can be said.', 'Čo už o tomto spojení vidíš, tak jasne, ako sa to dá povedať.'),
            frame: {
                steady: t('The plainly visible part of the connection: what can be described simply and without argument.', 'To, čo je zjavné a dá sa povedať bez námahy: časť spojenia, ktorú možno opísať jednoducho a bez sporu.'),
                strained: t('In view yet uncomfortable to look at: held in sight while the eyes keep sliding away.', 'Na očiach, no nepríjemné na pohľad: drží sa to v zornom poli, kým pohľad stále uhýba.'),
            } },
        { label: t('What may be going unnoticed', 'Čo môže unikať pozornosti'),
            ask: t('A possibility the cards raise about what is not yet in view. It is a question to hold, not a fact they establish.', 'Možnosť o tom, čo ešte nie je na očiach. Je to otázka na zváženie, nie preukázaný fakt.'),
            frame: {
                steady: t('Something quiet is easily overlooked because it does not demand notice: a small pattern, a gap, a gesture that goes unmarked.', 'Niečo tiché sa ľahko prehliadne, lebo si nevyžaduje pozornosť: drobný vzorec, medzera, gesto, ktoré ostane bez povšimnutia.'),
                strained: t('Under strain, what goes unnoticed is avoided because noticing would be uncomfortable: a question circled, a feeling kept at the edge, a pattern whose cost goes unexamined.', 'Keď to ide ťažko, ide o niečo, čomu sa vyhýba, lebo všimnúť si to by bolo nepríjemné: otázku, ktorá sa obchádza, cit držaný na okraji, vzorec s cenou, ktorá ostáva neskúmaná.'),
            } },
        { label: t('What attention would shift', 'Čo by pozornosť zmenila'),
            ask: t('What would change in how you take part in the relationship if the unnoticed part came into view.', 'Čo by sa zmenilo v tom, ako sa na vzťahu podieľaš, keby sa nepovšimnutá časť dostala do zorného poľa.'),
            frame: {
                steady: t('Noticing brings change: a way of taking part that loosens, a response that becomes freer.', 'Všimnutie prináša zmenu: spôsob účasti sa uvoľňuje a odpoveď sa stáva slobodnejšou.'),
                strained: t('Unease can come first: seeing clearly can unsettle how one takes part before it clarifies anything.', 'Najprv môže prísť nepokoj: jasné videnie môže rozkolísať spôsob účasti skôr, než čokoľvek objasní.'),
            } },
    ],
    opening: t('This reading looks at what deserves your attention in a relationship. The first card is what you can already see, the second what may be going unnoticed (a question to hold, not a finding), and the third what would shift if you gave it attention.', 'Toto čítanie sa pozerá na to, čomu sa vo vzťahu oplatí venovať pozornosť. Prvá karta je to, čo už vidíš, druhá to, čo môže unikať (otázka na zváženie, nie zistenie), a tretia to, čo by sa zmenilo, keby sa tomu venovala pozornosť.'),
    takeaway: {
        act: t('Let attention become one small action: ask the question you have been circling, or notice what you do just before the old pattern starts.', 'Nech sa pozornosť zmení na jeden malý krok: polož otázku, ktorú obchádzaš, alebo si všimni, čo robíš tesne pred tým, než sa spustí starý vzorec.'),
        ease: t('Attention here does not mean effort. It can be as light as letting yourself notice, without having to do anything about it yet.', 'Pozornosť tu neznamená námahu. Môže byť taká ľahká ako dovoliť si všimnúť si niečo, bez toho, aby sa s tým hneď muselo niečo robiť.'),
        face: t('What deserves attention may be uncomfortable to look at. Look anyway, gently, and let it be as large or as small as it actually is.', 'To, čomu sa oplatí venovať pozornosť, môže byť nepríjemné pozorovať. Pozri sa napriek tomu, nežne, a nechaj to byť také veľké či malé, aké to naozaj je.'),
        weave: t('Attention may be asked to hold two things at once (what you feel and what you see) rather than choosing between them.', 'Pozornosť možno treba udržať pri dvoch veciach naraz (pri tom, čo cítiš, a pri tom, čo vidíš), namiesto voľby medzi nimi.'),
    },
    closings: [
        t('What would you notice in this relationship if you looked at it as a curious stranger?', 'Čo by bolo na tomto vzťahu vidieť očami zvedavého, nezaujatého pozorovateľa?'),
        t('What do you keep circling in this connection without ever quite looking at it?', 'Čo v tomto spojení stále obchádzaš a nikdy sa na to nepozrieš celkom zblízka?'),
        t('If the unnoticed part came into view, how might your way of taking part change?', 'Ako by sa mohol zmeniť tvoj spôsob účasti na vzťahu, keby sa nepovšimnutá časť dostala na svetlo?'),
    ],
};
export const RELATIONSHIPS_AREA = {
    id: 'relationships',
    label: t('Relationships', 'Vzťahy'),
    blurb: t('Closeness, friction and the way you take part in it.', 'Blízkosť, trenie a to, ako sa na nich podieľaš.'),
    scope: t('what passes between people', 'to, čo prebieha medzi ľuďmi'),
    intentions: [current, tension, help, attention],
    lens,
};
