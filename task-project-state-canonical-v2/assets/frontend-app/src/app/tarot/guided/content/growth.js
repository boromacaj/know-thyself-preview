/**
 * PERSONAL & SPIRITUAL GROWTH - the inner life.
 *
 * This area owns what happens inside the person: recurring patterns, values, meaning, attention and inner direction. It does not
 * own other people (Relationships), the practical running of life (Work, Finances, Home) or the crossing of a threshold (Life
 * changes). "Spiritual" here is reflective only: meaning, stillness, attention, gratitude, values, silence. Nothing in it claims
 * anything about the supernatural, labels the person or reads their mental health.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    stage: {
        'sets-something-beginning': [
            t('Inwardly, a beginning is often quiet: a question that keeps returning, a small dissatisfaction with an old answer, a curiosity that arrives before any plan.', 'Vnútri býva začiatok tichý: otázka, ktorá sa stále vracia, malá nespokojnosť so starou odpoveďou, zvedavosť, ktorá príde skôr než akýkoľvek plán.'),
            t('Something new in the inner life often starts as a change of attention: noticing what used to pass unseen, or hearing a familiar thought as if for the first time.', 'Nové sa vo vnútornom živote často začína zmenou pozornosti: všimnúť si, čo predtým unikalo, alebo počuť známu myšlienku, akoby prvýkrát.'),
        ],
        'sustains-an-effort': [
            t('Inner work is mostly repetition: the same small practice kept up on days when it seems pointless, until it stops being an effort and becomes part of the day.', 'Vnútorná práca je väčšinou opakovanie: tá istá malá prax držaná aj v dňoch, keď sa zdá zbytočná, kým prestane byť námahou a stane sa súčasťou dňa.'),
            t('Inner effort rarely moves in a straight line; what holds it is returning (to the page, to the silence, to the honest question) after every lapse.', 'Vnútorné úsilie sa málokedy pohybuje po priamke; drží ho návrat (k papieru, k tichu, k úprimnej otázke) po každom výpadku.'),
        ],
        'holds-still': [
            t('When the inner life holds still, it can be a fallow field in which something is resting, or a plateau where old habits simply repeat.', 'Keď vnútorný život stojí, môže to byť úhor, na ktorom niečo oddychuje, alebo plošina, na ktorej sa staré zvyky len opakujú.'),
            t('Stillness inside can be a settling, like sediment sinking to the bottom of a glass, or a stalling that only looks calm from the outside.', 'Ticho vnútri môže byť usadzovanie, ako keď kal klesá na dno pohára, alebo zastavenie, ktoré len zvonka vyzerá pokojne.'),
        ],
        'stands-at-full-extent': [
            t('A way of being carried to its fullest shows both its gift and its price: what it makes possible and what it has quietly crowded out.', 'Spôsob bytia dotiahnutý do poslednej miery ukazuje dar aj cenu: čo umožňuje a čo potichu vytlačil.'),
            t('A strength stretched to its limit is easy to recognise from within: it feels less like a choice and more like a habit that can no longer be put down.', 'Silná stránka natiahnutá na hranicu sa dá zvnútra spoznať: pôsobí menej ako voľba a viac ako zvyk, ktorý sa už nedá odložiť.'),
        ],
        'is-mid-transition': [
            t('An inner change in progress often feels like standing between two rooms: the old picture of oneself no longer fits, and the new one has not yet been tried on.', 'Prebiehajúca vnútorná zmena pripomína stáť medzi dvoma izbami: stará predstava o sebe už nesedí a nová ešte nebola vyskúšaná.'),
            t('In the middle of a shift, values and habits can drift apart for a while, so that actions follow one set of them and belief another.', 'Uprostred posunu sa hodnoty a zvyky môžu na čas rozísť, takže sa koná podľa jedných a verí sa v druhé.'),
        ],
        'is-being-broken-into': [
            t('When something breaks into the inner life (a loss of certainty, a hard recognition, a belief that gives way), it tends to show what had been propping up the picture.', 'Keď do vnútorného života vstúpi niečo prudké (strata istoty, ťažké uvedomenie, presvedčenie, ktoré povolí), ukáže, čo celý obraz podopieralo.'),
            t('A sudden jolt from within can strip away a story about oneself that had been taken for a fact, leaving a bare and unfamiliar clarity.', 'Náhly otras zvnútra môže strhnúť príbeh o sebe, ktorý sa pokladal za fakt, a zanechať holú, nezvyčajnú jasnosť.'),
        ],
        'is-letting-go': [
            t('Letting go inwardly can mean setting down an old self-image, a grudge, a standard nobody chose, or a role that was outgrown without notice.', 'Pustiť vo vnútri môže znamenať odložiť starú predstavu o sebe, zášť, meradlo, ktoré nikto nevybral, alebo rolu, z ktorej sa nebadane vyrástlo.'),
            t('What is released in the inner life is often a rule handed down long ago (never fail, never burden anyone, keep everything in hand) more than any outer circumstance.', 'To, čo sa vnútorne uvoľňuje, je často pravidlo zdedené dávno (nezlyhať, nezaťažovať, mať všetko v rukách) viac než akákoľvek vonkajšia okolnosť.'),
        ],
        'is-coming-together': [
            t('Where inner pieces come together, what is felt, thought and done begin to agree, and a value that was once only an idea shows up in ordinary choices.', 'Kde sa vnútorné časti spájajú, to, čo sa cíti, myslí a robí, sa začína zhodovať a hodnota, ktorá bola kedysi len myšlienkou, sa ukáže v obyčajných rozhodnutiach.'),
            t('Coming together inwardly is less a peak than a quiet fit: the parts of a person stop arguing over which of them speaks for the whole.', 'Vnútorné zjednotenie je skôr tiché zapadnutie než vrchol: časti človeka sa prestávajú dohadovať, ktorá z nich hovorí za celok.'),
        ],
    },
    stance: {
        continue: [
            t('Continuing here tends to look like steadiness: a practice, a question or a habit of attention that goes on doing its quiet work without needing to be defended.', 'Pokračovať tu zvyčajne vyzerá ako stálosť: prax, otázka či zvyk pozornosti, ktoré robia svoju tichú prácu aj bez toho, aby ich bolo treba obhajovať.'),
            t('Staying with an inner direction tends to rest on small repeated acts more than on any dramatic turn, with an occasional glance at whether they still point toward something that matters.', 'Zostať pri vnútornom smere sa zvyčajne opiera o drobné opakované skutky viac než o dramatický obrat, s občasným pohľadom, či ešte mieria k tomu, na čom záleží.'),
        ],
        redirect: [
            t('A change of course here tends to turn the same effort toward something else (another practice, another question, a gentler standard) while the underlying wish remains.', 'Zmena smeru tu zvyčajne obráti to isté úsilie inam (iná prax, iná otázka, miernejšie meradlo), kým základné želanie ostáva.'),
            t('The method changes, not the purpose: the longing behind the work remains, and the way of following it takes another shape.', 'Mení sa spôsob, nie zámer: túžba za tou prácou ostáva a spôsob, ako ju sledovať, dostáva inú podobu.'),
        ],
        'let-go': [
            t('Letting go here tends to mean setting something down: an old verdict about oneself, the need to appear consistent, a standard that keeps being missed.', 'Pustiť tu zvyčajne znamená niečo položiť: starý rozsudok nad sebou, nutkanie pôsobiť dôsledne, meradlo, ktoré sa stále nedarí splniť.'),
            t('Setting aside a habit of self-judgement, or a story that has outlived its use, can leave more room than any new effort.', 'Odložiť zvyk sebaposudzovania alebo príbeh, ktorý prežil svoju užitočnosť, môže uvoľniť viac miesta než akékoľvek nové úsilie.'),
        ],
        moderate: [
            t('Moderating here tends to mean turning the dial down: less striving, less self-scrutiny, and a pace at which something can be absorbed rather than merely achieved.', 'Pritlmiť tu zvyčajne znamená ubrať: menej snaženia, menej skúmania seba a tempo, pri ktorom sa dá niečo vstrebať, nielen dosiahnuť.'),
            t('Too much intensity can turn reflection into pressure, and too little lets it slide into drift; the fitting amount is found by noticing, not by rule.', 'Priveľa intenzity vie zo zamyslenia urobiť tlak a primálo ho nechá skĺznuť do plynutia; vhodná miera sa zisťuje všímaním, nie pravidlom.'),
        ],
        'meet-it': [
            t('Meeting it tends to mean a direct look at what is actually there (a fear, a want, a habit of mind) rather than managing around it with distraction or good explanations.', 'Stretnúť to zvyčajne znamená pozrieť sa priamo na to, čo tu naozaj je (strach, túžba, zvyk mysle), a nie to obchádzať rozptýlením či dobrým vysvetlením.'),
            t('It can mean letting an uncomfortable thought finish its sentence, and staying with it long enough to see what it is made of.', 'Môže to znamenať nechať nepríjemnú myšlienku dohovoriť a ostať pri nej dosť dlho, aby bolo vidieť, z čoho je.'),
        ],
        wait: [
            t('Some inner shifts cannot be hurried, and waiting here tends to look like leaving the question open, like a seed in dark soil, while noticing the urge to force an answer.', 'Niektoré vnútorné posuny sa nedajú urýchliť a čakanie tu zvyčajne vyzerá ako nechať otázku otvorenú, ako semienko v tmavej zemi, a všímať si nutkanie vynútiť odpoveď.'),
            t('Patience here is not idleness: it is allowing something to ripen while attention rests on it lightly.', 'Trpezlivosť tu nie je nečinnosť: je to dovoliť veci dozrieť, kým na nej pozornosť ostáva ľahko položená.'),
        ],
        choose: [
            t('Choosing here tends to be a decision about where attention goes, made knowingly rather than by habit.', 'Voľba tu býva rozhodnutím o tom, kam smeruje pozornosť, urobeným vedome a nie zo zvyku.'),
            t('The choice is often less about outcomes than about which value leads when two of them pull apart.', 'Voľba býva menej o výsledkoch a viac o tom, ktorá hodnota vedie, keď sa dve rozídu.'),
        ],
        integrate: [
            t('Integration tends to show as thought, feeling and action telling the same story, so that an ordinary day begins to look like the values it is lived by.', 'Zjednotenie sa zvyčajne ukazuje tak, že myslenie, cit a konanie rozprávajú ten istý príbeh a obyčajný deň začína vyzerať ako hodnoty, podľa ktorých sa žije.'),
            t('It tends to start with small consistencies: a habit that matches a belief, a word that matches a deed, a part of oneself allowed to sit at the same table as the rest.', 'Zvyčajne začína drobnými súladmi: zvyk, ktorý zodpovedá presvedčeniu, slovo, ktoré zodpovedá skutku, a časť človeka, ktorej sa dovolí sedieť pri jednom stole s ostatnými.'),
        ],
        'attend-to-it': [
            t('Attending to it tends to mean noticing rather than solving: when it appears, what comes just before and what follows, ahead of any attempt to change it.', 'Venovať tomu pozornosť zvyčajne znamená všímať si, nie riešiť: kedy sa to objaví, čo tomu predchádza a čo nasleduje, skôr než príde akýkoľvek pokus o zmenu.'),
            t('It is mostly noticing (the tightening, the old reflex, the thought that returns at the same hour) and letting the thing show its shape first.', 'Je to väčšinou všímať si (stiahnutie sa vnútri, starý reflex, myšlienku, ktorá sa vracia v rovnakú hodinu) a nechať vec, aby najprv ukázala svoj tvar.'),
        ],
    },
    trend: {
        expanding: t('An expanding pull favours curiosity and a looser grip on what is unsettled, and it leaves little room for taking stock of what is already on the table.', 'Rozširovanie sa prikláňa k zvedavosti a voľnejšiemu úchopu nevyriešeného; zanecháva málo miesta na zhodnotenie toho, čo už leží na stole.'),
        contracting: t('Drawing inward, the pull favours privacy and a smaller circle of what gets examined, while wider questions are set to one side.', 'Pri sťahovaní dovnútra sa sklon prikláňa k súkromiu a menšiemu okruhu toho, čo sa skúma, kým širšie otázky ostávajú bokom.'),
        stabilising: t('Steadying favours rhythm and settled values over experiment, and what it leaves out is whatever does not yet fit the rhythm.', 'Ustaľovanie dáva prednosť rytmu a usadeným hodnotám pred pokusmi; vynecháva to, čo sa do rytmu zatiaľ nezmestí.'),
        disrupting: t('A shaking pull brings postponed questions to the surface, and it leaves less patience for the old descriptions of oneself.', 'Otriasanie vynáša na povrch odložené otázky a necháva menej trpezlivosti pre staré opisy seba.'),
        redirecting: t('Turning toward another direction favours a fresh sorting of what gets attention, with the former order of priorities pushed into the background.', 'Obrat k inému smeru robí miesto novému triedeniu toho, čomu sa venuje pozornosť, a pôvodné poradie priorít odsúva do pozadia.'),
        resolving: t('A settling pull inclines toward closing an open question and loosening an old tension, and it leaves less room for rehearsing either again.', 'Usadzovanie sa nakláňa k uzavretiu otvorenej otázky a uvoľneniu starého napätia; ponecháva menej miesta na ďalšie nacvičovanie oboch.'),
        suspended: t('The pull of a pause favours keeping the question open, and a firm answer is left for later.', 'Pauza ponecháva otázku otvorenú a pevnú odpoveď odkladá na neskôr.'),
    },
    arc: {
        continuation: t('Read together, the cards describe an inner way of being that carries on, which can be a comfort or a rut depending on what it carries.', 'Čítané spolu, karty opisujú vnútorný spôsob bytia, ktorý pokračuje, a ten môže byť útechou alebo vyjazdenou koľajou podľa toho, čo nesie.'),
        escalation: t('In order, the cards show an inner pressure or a recognition gathering weight, each step carrying more than the one before.', 'V poradí karty ukazujú vnútorný tlak alebo uvedomenie, ktoré naberá váhu, pričom každý krok nesie viac než predchádzajúci.'),
        interruption: t('Something cuts across the habitual run of thought, and the sequence is about what that break lets be seen in whatever it interrupted.', 'Niečo prekríži zaužívaný beh myšlienok a poradie je o tom, čo sa vďaka tomu zlomu ukáže v tom, čo bolo prerušené.'),
        'breakdown-to-recovery': t('The sequence moves from something giving way inside toward gathering again: what fell apart is acknowledged before a steadier footing is built.', 'Poradie sa posúva od toho, že niečo vo vnútri povolí, k opätovnému zbieraniu: čo sa rozpadlo, sa najprv uzná a až potom sa stavia pevnejšia opora.'),
        'expansion-to-limit': t('An inner opening widens and then meets its edge; the question is what that edge says about pace and about how much can be carried at once.', 'Vnútorné otvorenie sa rozšíri a potom narazí na svoju hranicu; otázkou je, čo tá hranica hovorí o tempe a o tom, koľko sa dá uniesť naraz.'),
        'stasis-to-movement': t('From a held, stuck place the cards move toward something shifting inside: a first loosening rather than a finished change.', 'Z uviaznutého miesta sa karty posúvajú k niečomu, čo sa vo vnútri začína hýbať: k prvému uvoľneniu, nie k hotovej zmene.'),
        'conflict-to-integration': t('Opposing inner voices open the sequence and it ends closer to a workable whole; the disagreement is not silenced, it is given room.', 'Protichodné vnútorné hlasy otvárajú poradie a to sa končí bližšie k použiteľnému celku; nezhoda sa neumlčí, dostane svoje miesto.'),
        'opening-to-choice': t('An inner opening leads to a point where a choice about which pull to follow is hard to leave alone.', 'Vnútorné otvorenie vedie k bodu, kde sa voľba o tom, ktorým smerom sa vydať, ťažko necháva ležať.'),
        'holding-to-release': t('What has been held tightly inside loosens by the end: a clenched hand opening rather than a door shutting.', 'To, čo sa vo vnútri držalo pevne, sa na konci uvoľňuje: zovretá päsť sa otvára, nezatvárajú sa dvere.'),
        'uncertainty-to-clarity': t('Fog about where things stand inside gradually gives way to something that can be seen and put into words.', 'Hmla okolo toho, ako to vo vnútri stojí, postupne ustupuje niečomu, čo sa dá uvidieť a vyjadriť slovami.'),
        'stability-to-disruption': t('A settled way of seeing oneself is shaken, and the sequence asks what the steadiness was really built on.', 'Usadený spôsob, akým sa človek vidí, sa otrasie a poradie sa pýta, na čom tá pevnosť v skutočnosti stála.'),
        redirection: t('The line of inner development bends: it does not stop, but it no longer points where it did.', 'Línia vnútorného vývoja sa ohýba: nezastavuje sa, ale už nemieri tam, kam predtým.'),
    },
    alignment: {
        aligned: t('The two inner voices, as these cards show them, lean the same way, so there is less to reconcile and more to notice about what they already share.', 'Obidva vnútorné hlasy, tak ako ich tieto karty ukazujú, sa nakláňajú rovnakým smerom, takže je menej čo zmierovať a viac čo si všimnúť na tom, čo už zdieľajú.'),
        complementary: t('The two inner voices differ but fit, each supplying something the other lacks, a steadier side and a more open one.', 'Obidva vnútorné hlasy sa líšia, ale zapadajú do seba a každý dopĺňa, čo druhému chýba: pevnejšia strana a otvorenejšia strana.'),
        opposed: t('The two inner voices pull against each other, and the question is less which one is right than what each of them is for.', 'Obidva vnútorné hlasy idú proti sebe a otázka nie je ani tak, ktorý z nich má pravdu, ako načo každý z nich slúži.'),
        apart: t('The two inner voices seem to be looking at different things altogether, so they may first need something in common to look at.', 'Zdá sa, že obidva vnútorné hlasy sa pozerajú na úplne iné veci, takže môžu najprv potrebovať niečo spoločné, na čo sa dá pozerať.'),
    },
    suit: {
        wands: t('Wands bring drive to the inner life: restlessness, the spark of a calling, and the effort of acting on what one cares about.', 'Palice prinášajú do vnútorného života popud: nepokoj, iskru povolania a úsilie konať podľa toho, na čom človeku záleží.'),
        cups: t('Cups carry the heart of the inner life: feeling, longing, and what is cherished without needing a reason.', 'Poháre nesú srdce vnútorného života: cit, túžbu a to, čo sa cení bez potreby dôvodu.'),
        swords: t('Swords speak of thought and honesty with oneself: the stories repeated inwardly, the clarity that cuts, and the word that finally names a thing.', 'Meče hovoria o myslení a úprimnosti k sebe: o príbehoch opakovaných v hlave, o jasnosti, ktorá rozdeľuje, a o slove, ktoré konečne pomenuje vec.'),
        pentacles: t('Pentacles tie inner life to the practical: the daily routine, the body, time, and the small repeated acts by which a value becomes visible.', 'Mince viažu vnútorný život na praktické: na denný rytmus, telo, čas a drobné opakované skutky, ktorými sa hodnota stáva viditeľnou.'),
    },
    strained: {
        stage: {
            'sets-something-beginning': t('A beginning under strain tends to be hesitant or premature: the new question is pushed down as impractical, or seized so fast that it is not yet understood.', 'Začiatok v napätí býva váhavý alebo unáhlený: nová otázka sa odsunie ako nepraktická, alebo sa schmatne tak rýchlo, že sa ešte nestihla pochopiť.'),
            'sustains-an-effort': t('Sustained effort under strain turns grim: the practice becomes a duty kept up out of fear of lapsing, and its original reason is hard to recall.', 'Vytrvávanie pri záťaži sa sprísni: z praxe sa stane povinnosť držaná zo strachu z výpadku a pôvodný dôvod sa ťažko pripomína.'),
            'holds-still': t('When holding still goes hard, it can be a stall dressed as calm, where the same habits repeat and the question is avoided rather than rested.', 'Keď je stáť ťažké, môže to byť zastavenie prezlečené za pokoj, v ktorom sa zvyky len opakujú a otázka sa obchádza namiesto toho, aby oddychovala.'),
            'stands-at-full-extent': t('At its limit and under pressure, a strength can harden into compulsion, and the cost, the part of life it has been crowding out, becomes difficult to ignore.', 'Na hranici a v napätí môže silná stránka stvrdnúť na nutkanie a cena, teda to, čo vytlačila zo života, sa už len ťažko prehliada.'),
            'is-mid-transition': t('A transition under strain can feel like being stuck between two pictures of oneself, with neither offering firm footing.', 'Prechod, ktorý ide ťažko, môže pôsobiť ako uviaznutie medzi dvoma predstavami o sebe, z ktorých ani jedna nedáva pevnú oporu.'),
            'is-being-broken-into': t('When the break is hard, a belief or a story about oneself gives way with little warning, and what remains can feel bare before it feels clear.', 'Keď je zlom tvrdý, presvedčenie alebo príbeh o sebe povolí takmer bez varovania a to, čo zostane, pôsobí skôr holo než jasne.'),
            'is-letting-go': t('Letting go under strain tends to be forced or half done: something is dropped without being acknowledged, or gripped harder precisely because it is being pried loose.', 'Pustenie, ktoré ide ťažko, býva vynútené alebo nedokončené: niečo sa zahodí bez toho, aby sa to uznalo, alebo sa to zovrie pevnejšie práve preto, že sa to vytrháva.'),
            'is-coming-together': t('When coming together goes hard, the harmony can be a surface one: parts of a person agree out loud while one of them stays unheard.', 'Keď sa spájanie zadrháva, súlad môže byť len povrchový: časti človeka sa zhodnú nahlas, kým jedna z nich zostáva nevypočutá.'),
        },
        stance: {
            continue: t('Continuing under strain runs on momentum: the practice goes on, but its reason has gone quiet and nobody asks whether it still fits.', 'Pokračovanie pri záťaži ide zo zotrvačnosti: prax beží ďalej, ale jej dôvod stíchol a nikto sa nepýta, či ešte sedí.'),
            redirect: t('A forced change of course can feel like running from something rather than toward something, with the old wish left unattended on the way.', 'Vynútená zmena smeru môže pôsobiť ako útek od niečoho, nie pohyb k niečomu, pričom staré želanie ostane po ceste nepovšimnuté.'),
            'let-go': t('Forced letting go can feel like losing something that was not ready to be set down, or like gripping tighter the harder it is pulled away.', 'Vynútené púšťanie môže pôsobiť ako strata niečoho, čo ešte nebolo pripravené na odloženie, alebo ako zovieranie, ktoré sa stupňuje, čím silnejšie sa to vytrháva.'),
            moderate: t('Moderation under strain can turn into suppression: the dial is pushed down by force, and whatever was pressing is simply not heard.', 'Miernosť v napätí sa môže zvrhnúť na potláčanie: tempo sa stlačí silou a to, čo tlačilo, sa jednoducho nepočuje.'),
            'meet-it': t('Meeting it under strain can slide into a fixed stare, where a hard look at the thing becomes scolding instead of seeing.', 'Stretnutie, ktoré ide ťažko, sa môže zmeniť na uprený pohľad, v ktorom sa tvrdé pozeranie na vec stáva karhaním namiesto videnia.'),
            wait: t('Waiting under strain can be avoidance with a respectable name: a pause that holds an answer at bay instead of letting it ripen.', 'Čakanie v napätí môže byť vyhýbanie so slušným menom: pauza, ktorá drží odpoveď na uzde, namiesto aby ju nechala dozrieť.'),
            choose: t('Choosing under strain tends to be pushed by the clock or by outside expectation, so that the value that wins is the loudest rather than the truest.', 'Voľba pri záťaži býva poháňaná hodinami alebo vonkajším očakávaním, takže vyhrá hodnota, ktorá je najhlasnejšia, nie najpravdivejšia.'),
            integrate: t('Forced integration can paper over a difference: thought, feeling and action are made to agree on the surface while one of them is overruled.', 'Vynútené zjednotenie môže zakryť rozdiel: myslenie, cit a konanie sa donútia zhodnúť navonok, kým jedno z nich je prehlasované.'),
            'attend-to-it': t('Attention under strain can turn into tense watching: the thing is observed so closely that the observing becomes a habit of its own.', 'Pozornosť v napätí sa môže zmeniť na napäté stráženie: vec sa sleduje tak zblízka, že samotné sledovanie sa stane zvykom.'),
        },
        trend: {
            expanding: t('When widening goes hard, it can outrun what there is room to hold: more questions opened than attention can follow, and breadth mistaken for depth.', 'Keď sa rozširovanie zadrháva, môže predbehnúť to, na čo je miesto: otvorí sa viac otázok, než stihne pozornosť sledovať, a šírka sa zamení za hĺbku.'),
            contracting: t('When narrowing hardens, guardedness can set into avoidance, and the circle of what may be looked at keeps shrinking.', 'Keď sa sťahovanie spevní, opatrnosť môže stvrdnúť na vyhýbanie a okruh toho, na čo sa dá pozrieť, sa stále zmenšuje.'),
            stabilising: t('When steadying hardens, a rhythm can set into rigidity and a value held firm can stop being questioned, including a verdict about oneself repeated until it passes for fact.', 'Keď sa ustaľovanie zatvrdí, rytmus môže stuhnúť na pravidlo a pevne držané presvedčenie sa prestane skúmať, vrátane rozsudku nad sebou, ktorý sa opakuje, kým nezačne platiť za fakt.'),
            disrupting: t('When the shaking is severe, certainties give way faster than anything replaces them, and old descriptions of oneself fall away before new ones are found.', 'Keď je otras silný, istoty povolia rýchlejšie, než ich čosi nahradí, a staré opisy seba odpadnú skôr, než sa nájdu nové.'),
            redirecting: t('When the turn is hard, a change of direction can feel like giving up everything before it, and the old wish is left without a home.', 'Keď je obrat tvrdý, zmena smeru sa môže zdať ako zrieknutie sa všetkého predchádzajúceho a staré želanie ostane bez domova.'),
            resolving: t('When closing is rushed, an answer can come from exhaustion or from shutting a question early, rather than from seeing it through.', 'Keď sa uzatváranie ponáhľa, odpoveď môže vzísť z vyčerpania alebo z predčasného zavretia otázky, nie z jej dotiahnutia do konca.'),
            suspended: t('When the pause drags on, it can feel like being stuck: the open question turns from room into weight, and avoiding it costs more than looking would.', 'Keď sa pauza vlečie, môže pôsobiť ako uviaznutie: otvorená otázka sa z priestoru mení na záťaž a vyhýbať sa jej stojí viac síl než pozrieť sa na ňu.'),
        },
    },
    weighing: t('Two inner pulls (security and curiosity, discipline and softness) are rarely a contest with a winner; they tend to be held side by side, each with something true to say.', 'Dva vnútorné smery (istota a zvedavosť, disciplína a jemnosť) sú málokedy súťaž s víťazom; zvyknú sa držať vedľa seba a každý má čo povedať.'),
    layers: t('The inner life rests on three things at once: how it is lived day to day, what is thought and felt, and what it all means. It tends to be steadiest when none of them is left out.', 'Vnútorný život stojí na troch veciach naraz: na tom, ako sa žije zo dňa na deň, čo sa myslí a cíti a čo to všetko znamená. Býva najpevnejší, keď žiadna z nich nechýba.'),
    majorWeight: t('When Major cards lead the three, this weighs more than a passing mood: it touches something lasting in how values are held and a life is made sense of.', 'Keď čítanie vedú Veľké arkány, ide o viac než o prechodnú náladu: dotýka sa to niečoho trvalého v tom, ako sa držia hodnoty a ako sa životu dáva zmysel.'),
};
const pattern = {
    id: 'personal-growth.pattern',
    areaId: 'personal-growth',
    label: t('Understand a recurring inner pattern', 'Pochopiť opakujúci sa vnútorný vzorec'),
    focus: t('Hold in mind a reaction or a habit of thought that keeps coming back.', 'Maj na mysli reakciu alebo zvyk myslenia, ktorý sa stále vracia.'),
    semantics: {
        explores: t('an inner pattern that repeats, and what keeps it going', 'vnútorný vzorec, ktorý sa opakuje, a to, čo ho udržiava'),
        reflection: 'trace',
        practical: 'observe',
        forbids: ['health-claim', 'fate-claim', 'predict-outcome', 'life-directive'],
    },
    spreadId: 'problem-cause-solution',
    category: 'self-development',
    guidance: 'unblock',
    temporal: 'timeless',
    relationshipType: null,
    places: [
        { label: t('Where the pattern shows', 'Kde sa vzorec ukazuje'),
            ask: t('The moment where the pattern becomes visible in a thought, a mood or a habit, as it appears on the surface.', 'Chvíľa, v ktorej sa vzorec stáva viditeľným v myšlienke, nálade či zvyku, tak, ako sa ukazuje navonok.'),
            frame: {
                steady: t('Here the pattern tends to appear at its most ordinary: the familiar moment, the usual wording of the thought, a reaction so practised that it passes for temperament.', 'Vzorec sa tu zvyčajne ukazuje v najobyčajnejšej podobe: známa chvíľa, zvyčajné znenie myšlienky, reakcia tak vycvičená, že sa zamieňa za povahu.'),
                strained: t('A returning reaction, turned up: under strain the pattern tends to arrive with more force, speed or shame than the moment seems to call for.', 'Vracajúca sa reakcia, len hlasnejšia: v napätí vzorec zvyčajne prichádza s väčšou silou, rýchlosťou či hanbou, než chvíľa vyžaduje.')
            } },
        { label: t('What keeps it turning', 'Čo ho drží v chode'),
            ask: t('The belief, fear or need underneath that feeds the repetition.', 'Presvedčenie, obava alebo potreba pod povrchom, ktoré to opakovanie živia.'),
            frame: {
                steady: t('Beneath the repetition there tends to sit a quiet reason: a belief or a need that once did real work and still sounds sensible when it speaks.', 'Pod opakovaním zvykne sedieť tichý dôvod: presvedčenie alebo potreba, ktoré kedysi robili poctivú prácu a stále znejú rozumne.'),
                strained: t('A reason held out of sight can keep the pattern going because looking at it would cost something: an old fear or an unmet need that feeds on staying unspoken.', 'Dôvod držaný mimo dohľadu môže vzorec udržiavať, lebo pohľad naň by niečo stál: starý strach či nenaplnená potreba, ktoré žijú z toho, že ostávajú nevyslovené.')
            } },
        { label: t('How to meet it', 'Ako sa s ním stretnúť'),
            ask: t('A way of standing toward the pattern that speaks to its root. It asks for an attitude, not for a result.', 'Spôsob, ako stáť voči vzorcu, ktorý hovorí k jeho koreňu. Žiada si postoj, nie výsledok.'),
            frame: {
                steady: t('Curiosity, patience or plain honesty are the kind of stance that tends to belong here, one that takes the pattern seriously without feeding it.', 'Sem zvyčajne patrí postoj ako zvedavosť, trpezlivosť či obyčajná úprimnosť, ktorý berie vzorec vážne, no nekŕmi ho.'),
                strained: t('In this place, strain tends to show as a stance that keeps the pattern fed: fighting it, scolding oneself for it, or hurrying to be rid of it.', 'Na tomto mieste sa tlak zvyčajne ukazuje ako postoj, ktorý vzorec sám živí: boj s ním, karhanie seba za neho alebo ponáhľanie sa zbaviť sa ho.')
            } },
    ],
    opening: t('This reading looks at an inner pattern that tends to come back. The first card is how it shows on the surface, the second what keeps it turning underneath, and the third a stance toward it. It reads a pattern, not a verdict on you: nothing here labels you or explains your past.', 'Toto čítanie sa pozerá na vnútorný vzorec, ktorý sa zvykne vracať. Prvá karta je to, ako sa ukazuje navonok, druhá to, čo ho pod povrchom drží v chode, a tretia postoj, ktorý k nemu možno zaujať. Číta vzorec, nie rozsudok nad tebou: nič tu ťa nezaraďuje do škatuľky ani nevysvetľuje tvoju minulosť.'),
    takeaway: {
        act: t('The way through is a small act of attention: when the pattern starts, pause for one breath and name it to yourself instead of letting it run on by itself.', 'Cesta vedie cez malý akt pozornosti: keď sa vzorec spúšťa, zastaviť sa na jeden nádych a pomenovať ho pre seba, namiesto aby bežal ďalej samospádom.'),
        ease: t('The pattern may need less fighting and more room: meet each return of it without scolding, and let it wear thin at its own pace.', 'Vzorec možno potrebuje menej boja a viac priestoru: stretnúť každý jeho návrat bez karhania a nechať ho vyblednúť vlastným tempom.'),
        face: t('What this reading points to is something to look at squarely: what the pattern protects and what it costs, before trying to change it.', 'Čítanie ukazuje na niečo, na čo sa oplatí pozrieť priamo: čo vzorec chráni a čo stojí, skôr než sa ho pokúsiš zmeniť.'),
        weave: t('What stands out is bringing thought, feeling and action into one line, so that the pattern meets a single steady attention rather than several competing ones.', 'Vyniká zjednotenie myslenia, cítenia a konania, aby vzorec stretol jednu vyrovnanú pozornosť namiesto viacerých, ktoré sa navzájom pretláčajú.'),
    },
    closings: [
        t('What is this pattern trying to protect, and is that still worth protecting?', 'Čo sa tento vzorec snaží ustrážiť a stojí to ešte za tú námahu?'),
        t('At what hour or in what mood does the pattern usually start, and what is going on just before?', 'V ktorej hodine alebo nálade sa vzorec zvyčajne spustí a čo sa tesne predtým deje?'),
        t('If the pattern could say one sentence in its own defence, what would the sentence be?', 'Keby mal vzorec povedať jednu vetu na svoju obranu, aká by to bola veta?'),
    ],
};
const values = {
    id: 'personal-growth.values',
    areaId: 'personal-growth',
    label: t('Explore what matters most to me', 'Preskúmať, na čom mi najviac záleží'),
    focus: t('Hold in mind something you care about that needs no justification.', 'Maj na mysli niečo, na čom ti záleží a čo nepotrebuje vysvetľovať.'),
    semantics: {
        explores: t('what matters most to you, in daily life, in thought and in meaning', 'to, na čom ti najviac záleží, v každodennosti, v myslení a v zmysle'),
        reflection: 'meaning',
        practical: 'name',
        forbids: ['health-claim', 'fate-claim', 'predict-outcome', 'life-directive'],
    },
    spreadId: 'body-mind-spirit',
    category: 'spiritual',
    guidance: 'reflect',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('How it is lived', 'Ako sa žije'),
            ask: t('The place where what matters shows in ordinary hours: what gets time, attention and care.', 'Miesto, kde sa dôležité ukazuje v obyčajných hodinách: čomu sa dáva čas, pozornosť a starostlivosť.'),
            frame: {
                steady: t('Calendars and small choices tend to carry this place: whatever quietly receives time, attention and effort without any announcement.', 'Toto miesto zvyčajne nesie kalendár a drobné voľby: to, čo potichu dostáva čas, pozornosť a úsilie bez ohlasovania.'),
                strained: t('When it goes hard, days crowd out what matters: hours claimed by urgency or habit while the thing that matters waits at the edge of the schedule.', 'Keď je to ťažké, dni vytláčajú dôležité: hodiny zabrané naliehavosťou či zvykom, kým to, na čom záleží, čaká na okraji rozvrhu.')
            } },
        { label: t('How it is held in thought', 'Ako sa drží v mysli'),
            ask: t('How what matters is spoken of inwardly: the words, ideals and arguments you carry about it.', 'Ako sa o dôležitom hovorí vo vnútri: slová, ideály a argumenty, ktoré o ňom nosíš.'),
            frame: {
                steady: t('Words and ideals that give what matters a shape tend to live here: a creed, a phrase, an argument one finds oneself repeating.', 'Tu zvyknú žiť slová a ideály, ktoré dôležitému dávajú tvar: vyznanie, veta, argument, ktorý sa človek pristihne opakovať.'),
                strained: t('Strain here tends to look like ideals held so tightly or argued so often that they turn into a standard to fail, or into words with nothing under them.', 'Tlak sa tu zvyčajne ukazuje ako ideály držané tak pevne alebo obhajované tak často, že sa menia na meradlo, ktoré sa nedá splniť, alebo na slová, pod ktorými nič nie je.')
            } },
        { label: t('What sits underneath', 'Čo je pod tým'),
            ask: t('The deeper root of what matters, the value or longing beneath the words and habits.', 'Hlbší koreň toho, na čom záleží: hodnota alebo túžba pod slovami a zvykmi.'),
            frame: {
                steady: t('Beneath both words and habits, this place tends to touch the longing or conviction that would still matter with no one watching.', 'Pod slovami aj zvykmi sa toto miesto zvyčajne dotýka túžby alebo presvedčenia, ktoré by záležalo, aj keby sa nikto nepozeral.'),
                strained: t('A root that is hard to reach or hard to admit can stand here: a value covered over by duty, by expectation taken over from others, or by long habit.', 'Môže tu stáť koreň, ku ktorému je ťažké sa dostať alebo ktorý je ťažké priznať: hodnota prekrytá povinnosťou, očakávaním prevzatým od iných alebo dlhým zvykom.')
            } },
    ],
    opening: t('This reading looks at what matters most to you. The first card is how it shows in ordinary days, the second how it is held in thought and words, and the third what sits beneath both. It describes values as they appear, not a ranking of what you ought to care about.', 'Toto čítanie sa pozerá na to, na čom ti najviac záleží. Prvá karta je to, ako sa to ukazuje v obyčajných dňoch, druhá ako sa to drží v mysli a slovách, a tretia to, čo leží pod oboma. Opisuje hodnoty tak, ako sa javia, nie rebríček toho, na čom by ti malo záležať.'),
    takeaway: {
        act: t('Let one value show up in one ordinary act: a call made, an hour protected, a yes or a no said plainly.', 'Nech sa jedna hodnota ukáže v jednom obyčajnom skutku: zavolať, ochrániť si hodinu, povedať jasné áno alebo nie.'),
        ease: t('Values do not need to be proven at every moment: let what matters be quietly enough for now, without turning it into a test of effort.', 'Hodnoty netreba dokazovať v každej chvíli: nechaj to, na čom ti záleží, zatiaľ pokojne stačiť, bez premeny na skúšku úsilia.'),
        face: t('Look squarely at the place where what you say matters and how you spend your hours part ways; the gap is information, not a judgement.', 'Pozri sa priamo na miesto, kde sa to, čo hovoríš o dôležitom, rozchádza s tým, čomu venuješ čas; tá medzera je informácia, nie súd.'),
        weave: t('What stands out is letting the lived, the thought and the meant meet in one place, so that a value is practised, understood and felt at once.', 'Vyniká spojenie toho, čo sa žije, myslí a znamená, na jednom mieste, aby sa hodnota naraz praktizovala, chápala a cítila.'),
    },
    closings: [
        t('If your days were read as a statement of values, what would they say matters most?', 'Keby sa tvoje dni čítali ako vyhlásenie o hodnotách, čo by o dôležitom hovorili?'),
        t('Which value would stay dear to you even if nobody ever saw it in your actions?', 'Ktorá hodnota by ti ostala drahá, aj keby ju nikto nikdy nevidel v tvojich skutkoch?'),
        t('What is the one thing that matters to you and almost never makes it into words?', 'Čo je to jedno, na čom ti záleží, a málokedy sa to dostane do slov?'),
    ],
};
const growth = {
    id: 'personal-growth.growth',
    areaId: 'personal-growth',
    label: t('Reflect on personal growth', 'Zamyslieť sa nad osobným rastom'),
    focus: t('Hold in mind a way you have changed, or are still changing.', 'Maj na mysli spôsob, akým sa v tebe niečo zmenilo alebo sa ešte mení.'),
    semantics: {
        explores: t('how your inner growth stands, where it began and where it tends', 'ako stojí tvoj vnútorný rast, odkiaľ vyšiel a kam tíhne'),
        reflection: 'trace',
        practical: 'name',
        forbids: ['health-claim', 'fate-claim', 'predict-outcome', 'life-directive'],
    },
    spreadId: 'past-present-future',
    category: 'self-development',
    guidance: 'reflect',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What shaped it', 'Čo ho formovalo'),
            ask: t('The experiences and habits that laid the ground for the growth so far.', 'Skúsenosti a zvyky, ktoré pripravili pôdu pre doterajší rast.'),
            frame: {
                steady: t('Whatever laid the ground tends to belong here: an experience, a habit or a season of life whose effect is easier to see now than it was then.', 'Pripravená pôda je témou tohto miesta: skúsenosť, zvyk či životné obdobie, ktorého účinok je dnes lepšie vidieť než vtedy.'),
                strained: t('Under strain, the subject is usually hard soil: a loss, a long effort or a stretch of life that taught something at a cost.', 'Pri záťaži ide zvyčajne o tvrdú pôdu: strata, dlhé úsilie alebo obdobie, ktoré čosi naučilo za cenu.')
            } },
        { label: t('Where it stands', 'Kde teraz stojí'),
            ask: t('Where your growth stands at this moment: what has taken root and what is still forming.', 'Kde sa tvoj rast nachádza práve teraz: čo sa už ujalo a čo sa ešte tvorí.'),
            frame: {
                steady: t('What has already taken root tends to be the subject: a changed reaction, a new habit of attention, something that no longer needs to be held by force.', 'Témou je zvyčajne to, čo sa už ujalo: zmenená reakcia, nový zvyk pozornosti, niečo, čo už netreba držať silou.'),
                strained: t('Slower or less certain than hoped, growth in this place tends to look like a changed reaction that keeps slipping back, or progress that is hard to see from inside.', 'Pomalší či neistejší, než sa čakalo: rast sa tu zvyčajne ukazuje ako zmenená reakcia, ktorá sa stále vracia po starom, alebo postup, ktorý je zvnútra ťažko vidieť.')
            } },
        { label: t('Where it tends', 'Kam tíhne'),
            ask: t('The direction growth leans toward if the present dynamic continues, a tendency and not a promise.', 'Smer, ku ktorému rast tíhne, ak súčasná dynamika pokračuje: sklon, nie sľub.'),
            frame: {
                steady: t('The leaning of growth is the matter here: the kind of pull it follows and what it would favour if the present dynamic continued, never a plan.', 'Tu ide o sklon rastu: k čomu sa prikláňa a čo by uprednostnil, keby súčasná dynamika pokračovala, nikdy nie plán.'),
                strained: t('Narrowing or overshooting is what strain tends to bring to this place: growth leaning toward a version of itself that leaves out something still needed.', 'Zúženie alebo preskočenie je to, čo tlak na toto miesto zvyčajne prináša: rast sa nakláňa k podobe seba, ktorá vynecháva niečo, čo je ešte potrebné.')
            } },
    ],
    opening: t('This reading looks at how you have been growing. The first card is what shaped it, the second where it stands now, and the third where it tends if the present dynamic continues: a tendency, not a promise.', 'Toto čítanie sa pozerá na to, ako sa v tebe odohráva rast. Prvá karta je to, čo ho formovalo, druhá miesto, kde teraz stojí, a tretia smer, ku ktorému tíhne, ak súčasná dynamika pokračuje: sklon, nie sľub.'),
    takeaway: {
        act: t('Name one change you can already see in how you react or choose, and give it a small, regular place in the week.', 'Pomenuj jednu zmenu, ktorú už vidíš v tom, ako reaguješ alebo vyberáš, a daj jej v týždni malé, pravidelné miesto.'),
        ease: t('Growth does not need to be hurried or measured: let what has changed settle before asking for the next change.', 'Rast netreba poháňať ani merať: nechaj usadiť to, čo sa už zmenilo, skôr než si pýtaš ďalšiu zmenu.'),
        face: t('Look honestly at what has not changed as well as what has; both belong to an accurate picture of where you stand.', 'Pozri sa úprimne na to, čo sa nezmenilo, rovnako ako na to, čo sa zmenilo; obe patria k presnému obrazu toho, kde stojíš.'),
        weave: t('What stands out is joining the earlier and the present self into one story, so that what was learned is carried forward rather than left behind.', 'Vyniká spojenie skoršieho a súčasného ja do jedného príbehu, aby sa to, čo sa naučilo, nieslo ďalej a nezostalo za chrbtom.'),
    },
    closings: [
        t('Which wish from an earlier stretch of your life has quietly been met, and which is still waiting for room?', 'Ktoré želanie z predchádzajúceho obdobia tvojho života sa potichu splnilo a ktoré ešte čaká na miesto?'),
        t('What do you notice in yourself now that would have gone unseen at the start?', 'Čo si na sebe dnes všímaš, čo by ti na začiatku ušlo?'),
        t('Which part of what has changed do you most want to keep, and what keeps it alive?', 'Ktorú časť z toho, čo sa zmenilo, chceš najviac zachovať a čo ju udržuje nažive?'),
    ],
};
const direction = {
    id: 'personal-growth.inner-direction',
    areaId: 'personal-growth',
    label: t('Find a direction for inner development', 'Nájsť smer pre vnútorný vývoj'),
    focus: t('Hold in mind the part of your inner life you would like to give more attention.', 'Maj na mysli tú časť svojho vnútra, ktorej chceš venovať viac pozornosti.'),
    semantics: {
        explores: t('a small, fitting direction for your inner development', 'malý, vhodný smer pre tvoj vnútorný vývoj'),
        reflection: 'step',
        practical: 'try',
        forbids: ['health-claim', 'fate-claim', 'predict-outcome', 'life-directive'],
    },
    spreadId: 'situation-action-outcome',
    category: 'self-development',
    guidance: 'act',
    temporal: 'future',
    relationshipType: null,
    places: [
        { label: t('Where you stand inwardly', 'Kde stojíš vnútorne'),
            ask: t('The inner situation as it is now: what is asking for attention and what is already in motion.', 'Vnútorná situácia taká, aká je teraz: čo si pýta pozornosť a čo je už v pohybe.'),
            frame: {
                steady: t('Here the inner situation tends to be a workable starting point: what is already stirring and could bear a little more attention.', 'Vnútorná situácia tu zvyčajne slúži ako použiteľné východisko: to, čo sa už hýbe a snesie o kúsok viac pozornosti.'),
                strained: t('Pressing or crowded is how the inner situation tends to read under strain: more demands and questions than attention can hold at once.', 'Tlačiace alebo preplnené: tak sa vnútorná situácia v napätí zvyčajne ukazuje, s viacerými požiadavkami a otázkami, než sa dá udržať v pozornosti naraz.')
            } },
        { label: t('A fitting response', 'Vhodná odpoveď'),
            ask: t('A response in attitude or practice that fits that situation, small enough to be tried.', 'Odpoveď v postoji alebo praxi, ktorá tej situácii zodpovedá a je dosť malá na to, aby sa dala skúsiť.'),
            frame: {
                steady: t('Small enough for an ordinary day is the mark of the response that tends to belong here: one practice, one change of attitude, one place to set attention.', 'Dosť malá na obyčajný deň: taká odpoveď sem zvyčajne patrí, jedna prax, jedna zmena postoja, jedno miesto, kam položiť pozornosť.'),
                strained: t('Too large, too hasty or too grim for the day: the response under strain tends to be a plan to remake oneself at once and keep it up on willpower alone.', 'Príliš veľká, unáhlená či prísna na daný deň: odpoveď v napätí zvykne byť plán pretvoriť sa naraz a držať ho samou vôľou.')
            } },
        { label: t('Where it tends to lead', 'Kam to má sklon viesť'),
            ask: t('Where that response tends to lead if it is kept up, as a tendency and not a promise.', 'Kam má takáto odpoveď sklon viesť, ak sa v nej pokračuje: ako sklon, nie sľub.'),
            frame: {
                steady: t('Whatever such a response would favour if kept up is the matter in this place, seen as a leaning and not as a result owed.', 'Ide tu o to, čo by takáto odpoveď uprednostnila, keby sa v nej pokračovalo, chápané ako sklon, nie ako výsledok, na ktorý je nárok.'),
                strained: t('Kept up too long, a response can stiffen or go hollow, and that is what strain tends to touch here: a practice continued for its own sake after its meaning has left.', 'Pri príliš dlhom držaní môže odpoveď stuhnúť alebo sa vyprázdniť a toho sa tu tlak zvyčajne dotýka: prax udržiavaná pre ňu samu, keď z nej odišiel zmysel.')
            } },
    ],
    opening: t('This reading looks for a direction in your inner development. The first card is the inner situation as it stands, the second a fitting response, and the third where that response tends to lead. The step it names is small and ordinary, and it remains yours to take or leave.', 'Toto čítanie hľadá smer pre tvoj vnútorný vývoj. Prvá karta je vnútorná situácia taká, aká je, druhá vhodná odpoveď a tretia to, kam má takáto odpoveď sklon viesť. Krok, ktorý pomenúva, je malý a obyčajný a je len na tebe, či ho urobíš.'),
    takeaway: {
        act: t('Choose one small practice and keep it for a few days before judging it: ten quiet minutes, a page of honest writing, a walk without a phone.', 'Vyber jednu malú prax a drž ju niekoľko dní, než ju zhodnotíš: desať tichých minút, stranu úprimného písania, prechádzku bez telefónu.'),
        ease: t('The fitting step may be a subtraction: one demand dropped, one self-improvement project paused, and more room left for what is already stirring.', 'Vhodným krokom môže byť ubratie: jedna požiadavka preč, jeden projekt sebazdokonaľovania na pauze a viac miesta pre to, čo sa už hýbe.'),
        face: t('The next step may be simply to look at what has been avoided and to say it plainly, in a notebook or aloud, without needing to fix it.', 'Ďalším krokom môže byť jednoducho pozrieť sa na to, čomu sa vyhýbaš, a povedať to jasne, do zošita alebo nahlas, bez potreby to hneď opravovať.'),
        weave: t('What fits is lining up one small habit with one stated value, so that what is practised and what is believed stop contradicting each other.', 'Hodí sa zladiť jeden malý zvyk s jednou vyslovenou hodnotou, aby sa to, čo sa praktizuje, a to, čomu sa verí, prestali protirečiť.'),
    },
    closings: [
        t('What practice is small enough to survive your worst day and still count?', 'Aká prax je taká malá, že ju zvládne aj najhorší deň, a stále sa počíta?'),
        t('Where in an ordinary week is there already a little quiet space for this?', 'Kde v obyčajnom týždni už dnes býva pre toto trochu ticha?'),
        t('What would have to loosen for this direction to have room?', 'Čo by sa muselo uvoľniť, aby tento smer mal miesto?'),
    ],
};
export const GROWTH_AREA = {
    id: 'personal-growth',
    label: t('Personal & Spiritual Growth', 'Osobný a duchovný rast'),
    blurb: t('Inner patterns, values and meaning, and the direction you give them.', 'Vnútorné vzorce, hodnoty a zmysel a smer, ktorý im dávaš.'),
    scope: t('the inner life of patterns, values and meaning', 'vnútorný život vzorcov, hodnôt a zmyslu'),
    intentions: [pattern, values, growth, direction],
    lens,
};
