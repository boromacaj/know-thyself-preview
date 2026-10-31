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
    majorWeight: t('With most of the cards Major Arcana, this reaches past a passing mood and touches something lasting: how values are held and how a life is given meaning.', 'Keď je väčšina kariet z Veľkých arkán, siaha to ďalej než k prechodnej nálade: týka sa to niečoho trvalého v tom, na čom záleží a ako sa životu dáva zmysel.'),
};
const pattern = {
    id: 'personal-growth.pattern',
    areaId: 'personal-growth',
    label: t('Understand a recurring inner pattern', 'Pochopiť opakujúci sa vnútorný vzorec'),
    focus: t('Hold in mind a reaction or a habit of thought that keeps coming back.', 'Maj na mysli reakciu alebo zvyk myslenia, ktoré sa stále vracajú.'),
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
                steady: t('In daily life it tends to be small and familiar: the usual wording of a thought, a reaction so practised that it can pass for temperament.', 'V bežnom dni býva takýto vzorec nenápadný: známe znenie myšlienky, reakcia tak zacvičená, že sa dá pokladať za povahu.'),
                strained: t('Here the pattern tends to arrive louder and faster than the moment calls for, sometimes with shame close behind.', 'Vzorec tu zvykne prísť hlasnejšie a rýchlejšie, než si chvíľa pýta, niekedy s hanbou hneď v závese.')
            } },
        { label: t('What keeps it turning', 'Čo ho drží v chode'),
            ask: t('The belief, fear or need underneath that feeds the repetition.', 'Presvedčenie, obava alebo potreba pod povrchom, ktoré to opakovanie živia.'),
            frame: {
                steady: t('Underneath the repetition there is usually a quiet reason, something that once did honest work and still sounds sensible when it speaks.', 'Pod opakovaním väčšinou leží tichý dôvod, niečo, čo kedysi robilo poctivú prácu a stále znie rozumne.'),
                strained: t('If the reason stays out of sight, an old fear or an unmet need can keep the pattern going simply by never being spoken.', 'Ak dôvod ostáva mimo dohľadu, starý strach či nenaplnená potreba môžu vzorec udržiavať tým, že sa nikdy nevyslovia.')
            } },
        { label: t('How to meet it', 'Ako sa s ním stretnúť'),
            ask: t('A way of standing toward the pattern that speaks to its root. It asks for an attitude, not for a result.', 'Postoj k vzorcu, ktorý mieri k jeho koreňu. Ide o postoj, nie o výsledok.'),
            frame: {
                steady: t('Curiosity, patience or plain honesty tend to suit this place better than winning or fixing, since they take the pattern seriously without feeding it.', 'Zvedavosť, trpezlivosť či obyčajná úprimnosť sem pasujú lepšie než snaha vyhrať alebo opraviť, lebo berú vzorec vážne bez toho, aby ho kŕmili.'),
                strained: t('Meeting the pattern with a fight, with scolding or with hurry is the usual difficulty here, since each tends to feed what it is aimed at.', 'Boj, karhanie či ponáhľanie bývajú na tomto mieste častou ťažkosťou, lebo každé z nich zvykne živiť to, proti čomu mieri.')
            } },
    ],
    opening: t('This reading looks at an inner pattern that tends to come back. The first card is how it shows on the surface, the second what keeps it turning underneath, and the third a stance toward it. It reads a pattern, not a verdict on you: nothing here labels you or explains your past.', 'Toto čítanie sa pozerá na vnútorný vzorec, ktorý sa zvykne vracať. Prvá karta je to, ako sa ukazuje navonok, druhá to, čo ho pod povrchom drží v chode, a tretia postoj, ktorý k nemu možno zaujať. Číta vzorec, nie rozsudok nad tebou: nič tu ťa nezaraďuje do škatuľky ani nevysvetľuje tvoju minulosť.'),
    takeaway: {
        act: t('A small, ordinary step could be to pause for one breath when the pattern starts and quietly name it to yourself, instead of letting it run on by itself.', 'Malým, obyčajným krokom môže byť zastaviť sa na jeden nádych, keď sa vzorec spúšťa, a potichu ho pre seba pomenovať namiesto toho, aby bežal ďalej samospádom.'),
        ease: t('This may be less about fighting the pattern than about giving it room: meeting each return without scolding and letting it wear thin at its own pace.', 'Môže ísť menej o boj so vzorcom a viac o priestor pre neho: stretnúť každý jeho návrat bez karhania a nechať ho vyblednúť vlastným tempom.'),
        face: t('What may help here is a direct look at what the pattern protects and what it costs, before any attempt to change it.', 'Pomôcť môže priamy pohľad na to, čo vzorec chráni a čo stojí, ešte pred akýmkoľvek pokusom o zmenu.'),
        weave: t('What stands out is bringing thought, feeling and action into one line, so the pattern meets a single steady attention rather than several that compete.', 'Vyniká zladenie myslenia, cítenia a konania do jednej línie, aby vzorec stretol jednu vyrovnanú pozornosť namiesto viacerých, ktoré si konkurujú.'),
    },
    closings: {
        act: t('At what hour or in what mood does the pattern usually start, and what is going on just before?', 'V ktorej hodine alebo nálade sa vzorec zvyčajne spustí a čo sa tesne predtým deje?'),
        ease: t('What is this pattern trying to protect, and what might loosen if that need were met more gently?', 'Čo sa tento vzorec snaží ochrániť a čo by sa mohlo uvoľniť, keby sa táto potreba napĺňala jemnejšie?'),
        face: t('If the pattern could say one sentence in its own defence, what would the sentence be?', 'Keby mal vzorec povedať jednu vetu na svoju obranu, aká by to bola veta?'),
        weave: t('Which part of you takes over when the pattern starts, and what would your other parts say if they were asked?', 'Ktorá tvoja časť sa ujme slova, keď sa vzorec spustí, a čo by povedali ostatné, keby sa ich niekto opýtal?'),
    },
};
const values = {
    id: 'personal-growth.values',
    areaId: 'personal-growth',
    label: t('Explore what matters most to me', 'Preskúmať, na čom mi najviac záleží'),
    focus: t('Hold in mind something you care about that needs no justification.', 'Maj na mysli niečo, na čom ti záleží a čo nepotrebuje vysvetľovať.'),
    semantics: {
        explores: t('what matters most to you, in daily life, in thought and in meaning', 'to, na čom ti najviac záleží: v každodennom živote, v myslení i v hlbšom zmysle'),
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
                steady: t('Calendars and small choices carry most of this place: whatever quietly receives time, attention and effort without any announcement.', 'Väčšinu tohto miesta nesú kalendár a drobné voľby: to, čo potichu dostáva čas, pozornosť a úsilie bez ohlasovania.'),
                strained: t('Days can crowd out what matters, with hours claimed by urgency or habit while the thing itself waits at the edge of the schedule.', 'Dni môžu vytláčať dôležité: hodiny zabrané naliehavosťou či zvykom, kým samotná vec čaká na okraji rozvrhu.')
            } },
        { label: t('How it is held in thought', 'Ako sa drží v mysli'),
            ask: t('How what matters is spoken of inwardly: the words, ideals and arguments you carry about it.', 'Ako sa o dôležitom hovorí vo vnútri: slová, ideály a argumenty, ktoré o ňom nosíš.'),
            frame: {
                steady: t('Words and ideals give what matters a shape here: a phrase, a creed, an argument that keeps coming back.', 'Slová a ideály dávajú dôležitému na tomto mieste tvar: veta, vyznanie, argument, ktorý sa stále vracia.'),
                strained: t('Ideals held very tightly or argued very often can turn into a standard nobody could meet, or into words with little under them.', 'Ideály držané príliš pevne alebo obhajované príliš často sa môžu zmeniť na meradlo, ktoré nikto nesplní, alebo na slová s ničím pod sebou.')
            } },
        { label: t('What sits underneath', 'Čo je pod tým'),
            ask: t('The deeper root of what matters, the value or longing beneath the words and habits.', 'Hlbší koreň toho, na čom záleží: hodnota alebo túžba pod slovami a zvykmi.'),
            frame: {
                steady: t('Beneath both words and habits lies the longing or conviction that would still matter with nobody watching.', 'Hlbšie než slová a zvyky leží túžba alebo presvedčenie, ktoré ostáva dôležité, aj keď sa nikto nepozerá.'),
                strained: t('The root can be hard to reach or hard to admit, covered over by duty, by expectations taken from others, or by long habit.', 'Koreň môže byť ťažko dostupný alebo ťažko priznateľný, prekrytý povinnosťou, očakávaniami prevzatými od iných či dlhým zvykom.')
            } },
    ],
    opening: t('This reading looks at what matters most to you. The first card is how it shows in ordinary days, the second how it is held in thought and words, and the third what sits beneath both. It describes values as they appear, not a ranking of what you ought to care about.', 'Toto čítanie sa pozerá na to, na čom ti najviac záleží. Prvá karta je to, ako sa to ukazuje v obyčajných dňoch, druhá ako sa to drží v mysli a slovách, a tretia to, čo leží pod oboma. Opisuje hodnoty tak, ako sa javia, nie rebríček toho, na čom by ti malo záležať.'),
    takeaway: {
        act: t('A small, ordinary step could be to let one value show in one plain act: a call made, an hour protected, a yes or a no said clearly.', 'Malým krokom môže byť dovoliť jednej hodnote ukázať sa v jednom obyčajnom skutku: zavolať, ochrániť si hodinu, jasne povedať áno alebo nie.'),
        ease: t('This may be less about proving what matters at every moment than about trusting that it can be enough for now, without turning into a test of effort.', 'Môže ísť menej o dokazovanie dôležitého v každej chvíli a viac o dôveru, že zatiaľ môže stačiť, bez toho, aby sa z toho stala skúška úsilia.'),
        face: t('It may be worth looking squarely at where what is said to matter and how hours are spent part ways; the gap is information, not a verdict.', 'Môže stáť za to pozrieť sa priamo na miesto, kde sa to, čo sa o dôležitom hovorí, rozchádza s tým, čomu sa venuje čas; tá medzera je informácia, nie rozsudok.'),
        weave: t('What may help is letting the lived, the thought and the meant meet in one place, so a value is practised, understood and felt at once.', 'Pomôcť môže, ak sa to, čo sa žije, myslí a čo to znamená, stretne na jednom mieste, aby sa hodnota naraz praktizovala, chápala a cítila.'),
    },
    closings: {
        act: t('If your days were read as a statement of values, what would they say matters most?', 'Keby sa tvoje dni čítali ako vyhlásenie o hodnotách, čo by o dôležitom hovorili?'),
        ease: t('Which value would stay dear to you even if nobody ever saw it in your actions?', 'Ktorá hodnota by ti ostala drahá, aj keby ju nikto nikdy nevidel v tvojich skutkoch?'),
        face: t('What is the one thing that matters to you and almost never makes it into words?', 'Čo je to jedno, na čom ti záleží, a málokedy sa to dostane do slov?'),
        weave: t('Where in your life do what you do, what you think and what you feel about what matters already point the same way?', 'Kde v tvojom živote už to, čo robíš, myslíš a cítiš o tom, na čom ti záleží, smeruje rovnakým smerom?'),
    },
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
                steady: t('Often it is an experience, a habit or a season of life whose effect is easier to see now than it was at the time.', 'Býva to skúsenosť, zvyk či životné obdobie, ktorých účinok je dnes lepšie vidieť než vtedy.'),
                strained: t('Some of what shaped growth was hard soil: a loss, a long effort or a stretch of life that taught something at a cost.', 'Niečo z toho, čo rast formovalo, býva tvrdá pôda: strata, dlhé úsilie alebo obdobie, ktoré čosi naučilo za svoju cenu.')
            } },
        { label: t('Where it stands', 'Kde teraz stojí'),
            ask: t('Where your growth stands at this moment: what has taken root and what is still forming.', 'Kde sa tvoj rast nachádza práve teraz: čo sa už ujalo a čo sa ešte tvorí.'),
            frame: {
                steady: t('What has taken root usually shows up in small things: a changed reaction, a new habit of attention, something no longer held by force.', 'To, čo sa ujalo, sa zvyčajne ukazuje v drobnostiach: zmenená reakcia, nový zvyk pozornosti, niečo, čo už netreba držať silou.'),
                strained: t('Growth that feels slow or uncertain can look like a changed reaction that keeps slipping back, or progress that is hard to see from the inside.', 'Rast, ktorý sa zdá pomalý či neistý, môže vyzerať ako zmenená reakcia, čo sa stále vracia po starom, alebo ako postup, ktorý zvnútra nevidno.')
            } },
        { label: t('Where it tends', 'Kam tíhne'),
            ask: t('The direction growth leans toward if the present dynamic continues, a tendency and not a promise.', 'Smer, ku ktorému rast tíhne, ak súčasná dynamika pokračuje: sklon, nie sľub.'),
            frame: {
                steady: t('This place reads a leaning, not a plan: the kind of pull growth is following and what that pull would favour if it carried on.', 'Tu ide o sklon, nie o plán: k čomu sa rast prikláňa a čomu by dal miesto, keby to tak pokračovalo.'),
                strained: t('Narrowing or overshooting is the usual difficulty: growth leaning toward a version of itself that leaves out something still needed.', 'Častou ťažkosťou je zúženie alebo prestrelenie: rast sa nakláňa k podobe seba, ktorá vynecháva niečo, čo je ešte potrebné.')
            } },
    ],
    opening: t('This reading looks at how you have been growing. The first card is what shaped it, the second where it stands now, and the third where it tends if the present dynamic continues: a tendency, not a promise.', 'Toto čítanie sa pozerá na to, ako sa v tebe odohráva rast. Prvá karta je to, čo ho formovalo, druhá miesto, kde teraz stojí, a tretia smer, ku ktorému tíhne, ak súčasná dynamika pokračuje: sklon, nie sľub.'),
    takeaway: {
        act: t('It may be enough to notice one change already visible in how things are met or chosen, and to give it a modest, regular place in the week.', 'Môže stačiť všimnúť si jednu zmenu, ktorá je už vidieť v tom, ako sa reaguje či vyberá, a dať jej v týždni skromné, pravidelné miesto.'),
        ease: t('This may be less about hurrying or measuring growth than about giving what has changed time to settle before asking for the next change.', 'Môže ísť menej o poháňanie či meranie rastu a viac o to, dať tomu, čo sa už zmenilo, čas usadiť sa, skôr než príde na rad ďalšia zmena.'),
        face: t('An honest look at what has not changed, as well as what has, may be what helps; both belong to an accurate picture.', 'Pomôcť môže úprimný pohľad na to, čo sa nezmenilo, rovnako ako na to, čo sa zmenilo; obe patria k presnému obrazu.'),
        weave: t('Joining the earlier and the present self into one story could help what was learned travel forward rather than stay behind.', 'Spojenie skoršieho a súčasného ja do jedného príbehu môže pomôcť, aby sa to, čo sa naučilo, nieslo ďalej a nezostalo za chrbtom.'),
    },
    closings: {
        act: t('What do you notice in yourself now that would have gone unseen at the start?', 'Čo si na sebe dnes všímaš, čo by ti na začiatku ušlo?'),
        ease: t('What in your growth might simply need time to settle, before anything is measured?', 'Čo v tvojom raste potrebuje možno len čas, aby sa usadilo, ešte než sa niečo meria?'),
        face: t('What, if anything, looks much the same in you as it did at the start, and what do you make of that?', 'Čo sa na tebe, ak vôbec niečo, javí podobne ako na začiatku, a čo si o tom myslíš?'),
        weave: t('Which part of what has changed do you most want to keep, and what keeps it alive?', 'Ktorú časť z toho, čo sa zmenilo, chceš najviac zachovať a čo ju udržuje nažive?'),
    },
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
                steady: t('The inner situation here is usually a workable starting point: something already stirring that could bear a little more attention.', 'Vnútorná situácia tu zvykne byť použiteľným východiskom: niečo sa už hýbe a unesie o trochu viac pozornosti.'),
                strained: t('It can read as crowded or pressing, with more demands and open questions than attention can hold at once.', 'Môže pôsobiť preplnene a naliehavo, s viacerými nárokmi a otázkami, než sa dá udržať v pozornosti naraz.')
            } },
        { label: t('A fitting response', 'Vhodná odpoveď'),
            ask: t('A response in attitude or practice that fits that situation, small enough to be tried.', 'Odpoveď v postoji alebo praxi, ktorá tej situácii zodpovedá a je dosť malá na to, aby sa dala skúsiť.'),
            frame: {
                steady: t('A response of the right size is small enough for an ordinary day: one practice, one change of attitude, one place to rest attention.', 'Odpoveď správnej veľkosti sa zmestí do obyčajného dňa: jedna prax, jedna zmena postoja, jedno miesto, kam sa pozornosť položí.'),
                strained: t('Size is the usual trouble: a plan to remake oneself all at once, too large or too grim for the day and kept up on willpower alone.', 'Častým problémom je veľkosť: plán pretvoriť sa naraz, príliš veľký či príliš prísny na daný deň a držaný len vôľou.')
            } },
        { label: t('Where it tends to lead', 'Kam to má sklon viesť'),
            ask: t('Where that response tends to lead if it is kept up, as a tendency and not a promise.', 'Kam má takáto odpoveď sklon viesť, ak sa v nej pokračuje: ako sklon, nie sľub.'),
            frame: {
                steady: t('Read as a leaning and never as a result owed, this place weighs what such a response would favour if it were kept up.', 'Čítať sa tu dá sklon, nie výsledok, na ktorý je nárok: čomu by takáto odpoveď dala miesto, keby sa v nej pokračovalo.'),
                strained: t('Kept up too long, a response can stiffen or go hollow, turning into a practice carried on for its own sake after its meaning has left.', 'Pri príliš dlhom držaní môže odpoveď stuhnúť alebo sa vyprázdniť a stať sa praxou udržiavanou pre ňu samu, keď z nej odišiel zmysel.')
            } },
    ],
    opening: t('This reading looks for a direction in your inner development. The first card is the inner situation as it stands, the second a fitting response, and the third where that response tends to lead. The step it names is small and ordinary, and it remains yours to take or leave.', 'Toto čítanie hľadá smer pre tvoj vnútorný vývoj. Prvá karta je vnútorná situácia taká, aká je, druhá vhodná odpoveď a tretia to, kam má takáto odpoveď sklon viesť. Krok, ktorý pomenúva, je malý a obyčajný a je len na tebe, či ho urobíš.'),
    takeaway: {
        act: t('One short practice tried for a few days before it is judged could be enough: ten quiet minutes, a page of honest writing, a walk without a phone.', 'Stačiť môže jedna krátka prax, vyskúšaná niekoľko dní skôr, než sa posúdi: desať tichých minút, strana úprimného písania, prechádzka bez telefónu.'),
        ease: t('The fitting step may be a subtraction: one demand dropped, one self-improvement project paused, and more room left for what is already stirring.', 'Vhodným krokom môže byť ubratie: jedna požiadavka preč, jeden projekt sebazdokonaľovania na pauze a viac miesta pre to, čo sa už hýbe.'),
        face: t('The next step may be simply to look at what has been avoided and say it plainly, in a notebook or aloud, without needing to fix it.', 'Ďalším krokom môže byť jednoducho pozrieť sa na to, čomu sa vyhýbaš, a povedať to jasne, do zošita alebo nahlas, bez potreby to hneď opravovať.'),
        weave: t('What fits is lining up one small habit with one stated value, so that what is practised and what is believed stop contradicting each other.', 'Hodí sa zladiť jeden malý zvyk s jednou vyslovenou hodnotou, aby sa to, čo sa praktizuje, a to, čomu sa verí, prestali protirečiť.'),
    },
    closings: {
        act: t('What practice is small enough to survive your worst day and still count?', 'Aká prax je taká malá, že ju zvládne aj najhorší deň, a stále sa počíta?'),
        ease: t('What would have to loosen for this direction to have room?', 'Čo by sa muselo uvoľniť, aby tento smer mal miesto?'),
        face: t('What do you notice when you look straight at the part of your inner life you would like to give more attention?', 'Čo si všímaš, keď sa pozrieš priamo na tú časť svojho vnútra, ktorej chceš venovať viac pozornosti?'),
        weave: t('Which habit you already have could this direction sit beside, so that the two support each other?', 'Vedľa ktorého zvyku, ktorý už máš, by tento smer mohol stáť, aby sa navzájom podporovali?'),
    },
};
export const GROWTH_AREA = {
    id: 'personal-growth',
    label: t('Personal & Spiritual Growth', 'Osobný a duchovný rast'),
    blurb: t('Inner patterns, values and meaning, and the direction you give them.', 'Vnútorné vzorce, hodnoty a zmysel a smer, ktorý im dávaš.'),
    scope: t('the inner life of patterns, values and meaning', 'vnútorný život vzorcov, hodnôt a zmyslu'),
    intentions: [pattern, values, growth, direction],
    lens,
};
