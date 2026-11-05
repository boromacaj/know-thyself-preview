/**
 * PARENTING. The adult holds the greater responsibility for adapting; nothing here labels a child or predicts one, and what is said of a child is a tendency the adult can meet. The age guide carries what is specific to an age. Part b1 (emotional expression, visibility, change, initiative, abstraction: shared and opposed forms).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 */
const PARENTING_B1 = {
    /* ------------------------------------------------------------ emotional expression ---- */
    'emotional-expression/shared:emotionally-expressive': {
        title: { en: 'Feeling that travels both ways', sk: 'Pocit, ktorý sa prenáša oboma smermi' },
        passage: {
            en: 'Where {both} both let feeling out as it arises, nobody has to guess how the day went, and affection is as easy to see as annoyance. The child can see a feeling said and survived, and the adult is spared the work of decoding a silence.\n\nThe difficulty comes when two big feelings meet at a limit. A child’s protest can lift the adult’s reply, the higher reply can lift the protest, and a request to switch something off can turn into a contest in volume that the limit did not ask for. In that moment the adult’s register is the one most able to change first, and the child tends to borrow whichever one is on offer.',
            sk: 'Keď {both} dávajú city najavo hneď, ako sa objavia, nikto nemusí hádať, ako dopadol deň, a nežnosť je vidieť rovnako ľahko ako podráždenie. Dieťa môže vidieť, že pocit sa dá povedať nahlas a prežiť, a dospelý človek si ušetrí lúštenie mlčania.\n\nZložité to býva pri hranici, keď sa stretnú dva silné pocity. Protest dieťaťa môže zvýšiť hlas dospelého človeka, vyšší hlas môže protest ešte zosilniť a z prosby, aby dieťa niečo vypnulo, sa môže stať súboj v hlasitosti, o ktorý hranica nestála. V takej chvíli najľahšie zmení tón ako prvý dospelý človek a dieťa si zvyčajne vezme ten, ktorý je po ruke.',
        },
        aside: {
            en: 'Feeling travels quickly both ways when {both} both let it out, and warmth shows as readily as irritation. At a limit, though, a raised voice on either side can lift the other, and a small request can turn loud before anyone has decided to argue.',
            sk: 'Pocit sa šíri rýchlo oboma smermi, keď {both} dávajú city najavo, a nežnosť je vidieť rovnako ľahko ako podráždenie. Pri hranici však zvýšený hlas na jednej strane môže zvýšiť hlas na druhej a z drobnej prosby môže byť krik skôr, než sa niekto rozhodne hádať.',
        },
        step: { en: 'Choose one thing the adult does first when voices rise, such as sitting down and lowering the voice, so that the response is decided in advance and not found mid-argument.', sk: 'Vyberte jednu vec, ktorú dospelý človek urobí ako prvú, keď hlasy stúpajú, napríklad si sadne a stíši hlas. Odpoveď tak bude rozhodnutá vopred a nebude sa hľadať uprostred hádky.' },
        question: { en: 'What does the adult’s voice do to the child’s in the first moments of an upset, and what would the child say helps?', sk: 'Ako ovplyvní hlas dospelého človeka hlas dieťaťa v prvých chvíľach rozrušenia a čo by podľa dieťaťa pomohlo?' },
    },
    'emotional-expression/shared:emotionally-contained': {
        title: { en: 'Two who keep it in', sk: 'Dvojica, ktorá si city necháva pre seba' },
        passage: {
            en: 'A flat evening can mean two different things when {both} both keep feeling in: an ordinary evening, or one in which something is being carried alone. From the outside the two look the same, and neither gives the other much to go on.\n\nThe calm is a real gift. Nobody is swamped by another person’s storm, and a feeling that finally gets said has often been thought through. But the child’s distress may arrive sideways, as tiredness, a short temper or a sore stomach, and the adult, who also keeps feeling in, may offer little example of a feeling being named aloud and found bearable. The naming has to start somewhere, and in a home where both are reserved it is more likely to start with the adult than to be coaxed out of the child.',
            sk: 'Tichý večer môže mať dva významy, keď si {both} city nechávajú pre seba: obyčajný večer, alebo večer, v ktorom si niekto niečo nesie sám. Zvonku vyzerajú rovnako a ani jeden z dvojice druhému veľa nenapovie.\n\nPokoj je skutočný dar. Nikoho nezaplaví cudzia búrka a pocit, ktorý sa napokon povie, býva premyslený. Trápenie dieťaťa sa však môže ukázať nepriamo, ako únava, podráždenosť alebo bolesť brucha, a ten, kto si city tiež necháva v sebe, môže dieťaťu len málo ukázať, ako sa pocit povie nahlas a ako sa potom dá uniesť. Niekto musí s pomenúvaním začať a v takom dome je pravdepodobnejšie, že to bude dospelý človek, než že sa to podarí vylákať z dieťaťa.',
        },
        aside: {
            en: 'A calm home can hide a good deal when {both} both keep feeling in. A child’s distress may show sideways, as tiredness or a short temper, to an adult who also tends to say little.',
            sk: 'Pokojný domov môže skrývať dosť veľa, keď si {both} city nechávajú pre seba. Trápenie dieťaťa sa pred dospelým, ktorý tiež zvyčajne hovorí málo, môže ukázať nepriamo, ako únava alebo podráždenosť.',
        },
        step: { en: 'Now and then let the adult name a small feeling of the adult’s own aloud, in plain words and without asking for one in return, so that the child hears how it is done.', sk: 'Nech dospelý človek raz za čas nahlas pomenuje nejaký svoj drobný pocit, jednoduchými slovami a bez očakávania odpovede, aby dieťa počulo, ako sa to robí.' },
        question: { en: 'Where in an ordinary week could a feeling be said aloud without anyone having to ask for it?', sk: 'Kde by sa v obyčajnom týždni dal pocit povedať nahlas, aby sa naň nikto nemusel pýtať?' },
    },
    'emotional-expression/opposed:emotionally-expressive': {
        title: { en: 'A loud feeling, a quiet one', sk: 'Hlasný pocit, tichý pocit' },
        passage: {
            en: '{first} often feels out loud, and {second} tends to close up. After a row the adult’s feeling can still be in the room, and the child’s answer can be a stillness that reads as indifference. The adult may hear no reply and raise the intensity to reach one; the child, facing more, may say less.\n\nThere is something real to gain from the difference. A child beside an adult who names feelings sees that they can be spoken and survived, and the adult has a steadier register to learn from. The quiet can be the form a big feeling takes in a room that is already loud, and it is the adult’s volume, more than the child’s words, that tends to decide how much of it comes out.',
            sk: '{first} často cíti nahlas a {second} sa zvyčajne uzatvára. Po hádke môže byť pocit dospelého človeka stále v miestnosti a dieťa môže odpovedať mlčaním, ktoré pôsobí ako ľahostajnosť. Dospelý možno nepočuje žiadnu odpoveď a pridá na sile, aby sa nejaká ozvala; dieťa, pred ktorým je toho ešte viac, môže povedať ešte menej.\n\nZ rozdielu sa dá naozaj niečo získať. Dieťa popri dospelom človeku, ktorý pomenúva city, vidí, že sa dajú vysloviť a prežiť, a dospelý človek má pri dieťati príklad pokojnejšieho tónu, z ktorého sa môže učiť. Ticho môže byť podobou veľkého pocitu v miestnosti, ktorá je už hlasná, a to, koľko veľkého pocitu vyjde najavo, býva skôr vecou hlasitosti dospelého človeka než slov dieťaťa.',
        },
        aside: {
            en: '{first} may show feeling openly while {second} tends to keep it in. The adult’s intensity can make the child quieter still, and to the adult the quiet can look like not caring.',
            sk: '{first} môže dávať city najavo otvorene, kým si ich {second} zvyčajne necháva pre seba. Intenzita dospelého človeka môže dieťa stíšiť ešte viac a dospelému človekovi sa to ticho môže zdať ako nezáujem.',
        },
        step: { en: 'Agree that after a loud moment the adult speaks quietly first and leaves the child free to answer later, in words or in some other way.', sk: 'Dohodnite sa, že po hlasnej chvíli prehovorí ako prvý dospelý človek, a to potichu, a dieťa môže odpovedať neskôr, slovami alebo inak.' },
        question: { en: 'What does the child do when the adult’s feeling is at full strength, and what would make quiet less necessary?', sk: 'Čo robí dieťa, keď je pocit dospelého človeka na plnú silu, a čo by pomohlo, aby mlčať nebolo také potrebné?' },
    },
    'emotional-expression/opposed:emotionally-contained': {
        title: { en: 'A calm that can be company or distance', sk: 'Pokoj, ktorý môže byť spoločnosťou aj odstupom' },
        passage: {
            en: '{second} tends to feel at full volume, and {first} can meet it with a steadiness that a big feeling can lean on. But steadiness without words can read as distance. A child who cannot tell whether the feeling has landed may turn it up to find out, and the louder it gets, the calmer the adult may try to be.\n\nThe adult has something the child needs, a frame that does not shake, and the child has something the adult can learn from, a plain way of saying what is going on. To the child the same even calm can be company or a closed door, and the difference lies less in how much the adult feels than in whether the feeling seems to have been received.',
            sk: '{second} zvyčajne cíti naplno a nahlas a {first} môže odpovedať pokojom, o ktorý sa veľký pocit môže oprieť. Pokoj bez slov však môže pôsobiť ako odstup. Dieťa, ktoré nevie, či pocit dorazil, môže pridať na hlasitosti, aby to zistilo, a čím je pocit hlasnejší, tým pokojnejší sa môže snažiť byť dospelý človek.\n\nDospelý má to, čo dieťa potrebuje, pevný bod, ktorý sa nechvie, a dieťa má to, z čoho sa dospelý človek môže učiť, jednoduchý spôsob, ako povedať, čo sa deje. Pre dieťa môže byť ten istý vyrovnaný pokoj spoločnosťou aj zavretými dverami a rozdiel je menej v tom, koľko dospelý človek cíti, než v tom, či dieťa vidí, že pocit dorazil.',
        },
        aside: {
            en: 'Steadiness can be an anchor when {second} feels at full volume and {first} stays even. Without words the calm can look like coolness, and the child may raise the volume to be sure the feeling has been received.',
            sk: 'Pokoj môže byť kotvou, keď {second} prežíva pocit naplno a {first} si zachováva rovnováhu. Bez slov môže pokoj pôsobiť ako chlad a dieťa môže zvýšiť hlas, aby sa uistilo, že pocit dorazil.',
        },
        step: { en: 'Choose one sentence that names the child’s feeling back in the same even voice, and use it before any explanation or limit.', sk: 'Vyberte jednu vetu, ktorá pomenuje pocit dieťaťa, a vyslovte takú vetu rovnakým vyrovnaným hlasom skôr než akékoľvek vysvetlenie či hranicu.' },
        question: { en: 'How does the child know when the adult has heard a big feeling, and what would make that clearer?', sk: 'Podľa čoho dieťa pozná, že dospelý človek veľký pocit započul, a čo by to ukázalo jasnejšie?' },
    },
    'emotional-expression/siblings:shared:emotionally-expressive': {
        title: { en: 'Rows that start at full volume', sk: 'Hádky, ktoré začínajú naplno' },
        passage: {
            en: 'When {both} both show feeling at once, a row can have no slow beginning: the first word is already at full volume, and so is the answer. The same quality gives the two their warmth. Delight and affection arrive just as unfiltered, and an apology can come as suddenly as the insult did.\n\nWhat is hard is the climb. Each can answer the other’s volume, and neither is left as the one to lower it, so a small grievance about a game or a turn can fill the house. A row with two accelerators and no brake tends to end when the energy runs out, not when either of the two decides to stop.',
            sk: 'Hádka nemá pomalý rozbeh, keď {both} ukazujú city naraz: prvé slovo je už na plnú hlasitosť a odpoveď tiež. Tá istá vlastnosť dáva dvojici aj teplo. Radosť a nežnosť prichádzajú rovnako priamo a ospravedlnenie môže prísť tak náhle ako urážka.\n\nŤažké je stupňovanie. Každé môže odpovedať na hlasitosť druhého a ani jedno nezostáva v úlohe toho, kto by hlasitosť znížil, takže drobná krivda kvôli hre alebo poradiu môže naplniť celý dom. Hádka, v ktorej sa šliape na plyn a nikto nebrzdí, sa zvyčajne skončí, keď dôjde energia, nie keď sa niektoré z detí rozhodne prestať.',
        },
        aside: {
            en: 'An apology can come as suddenly as the insult when {both} both wear feeling on the surface. The climb in between is the hard part, since each can answer the other’s volume and a small grievance can fill the house.',
            sk: 'Ospravedlnenie môže prísť rovnako náhle ako urážka, keď {both} nosia city na povrchu. Ťažké je to, čo je medzi tým: každé môže odpovedať na hlasitosť druhého a drobná krivda môže naplniť dom.',
        },
        step: { en: 'Let each child pick a word or a sign that means “I need to stop before I say more”, and agree that the other lets the pause happen.', sk: 'Nech si každé dieťa vyberie slovo alebo znamenie, ktoré znamená „potrebujem sa zastaviť, skôr než poviem viac“, a dohodnite sa, že druhé dieťa nechá takú pauzu prebehnúť.' },
        question: { en: 'What does each child do in the middle of a row that makes the other louder, and what brings the volume down?', sk: 'Čo robí každé dieťa uprostred hádky, že druhé zvýši hlas, a čo hlasitosť znižuje?' },
    },
    'emotional-expression/siblings:shared:emotionally-contained': {
        title: { en: 'A row shown only by what stops', sk: 'Hádka, ktorú prezradí len to, čo ustane' },
        passage: {
            en: '“I’m fine” passes without a question when {both} both keep feeling in, since the one who might ask is the one who would also say it. A slight can then sit between the two as a small distance: a shorter answer, a game turned down, a door closed a little more firmly than usual.\n\nThe quiet that keeps the house calm also keeps the grievance out of sight. Each can take the other’s reserve for contentment, and without a louder sibling to announce that something has happened, a row between two reserved children shows mainly in what stops happening.',
            sk: '„Som v poriadku“ prejde bez otázky, keď si {both} city nechávajú pre seba, lebo ten, kto by sa opýtal, by povedal presne to isté. Drobné ukrivdenie môže medzi dvojicou ostať ako malý odstup: kratšia odpoveď, odmietnutá hra, dvere zatvorené o niečo pevnejšie než zvyčajne.\n\nTicho, vďaka ktorému je v dome pokoj, necháva krivdu aj mimo dohľadu. Každé dieťa môže zdržanlivosť druhého brať za spokojnosť a bez hlasnejšieho súrodenca, ktorý by oznámil, že sa niečo stalo, sa hádka medzi dvoma zdržanlivými deťmi prejavuje hlavne tým, čo sa prestane diať.',
        },
        aside: {
            en: 'A row can pass unheard when {both} both keep feeling in. It shows in what stops, a shared game, a longer answer, an open door, and each can take the other’s quiet for contentment.',
            sk: 'Hádka môže prejsť nepočutá, keď si {both} city nechávajú pre seba. Prejaví sa tým, čo ustane: spoločná hra, dlhšia odpoveď, otvorené dvere. Každé môže ticho druhého brať za spokojnosť.',
        },
        step: { en: 'Notice what the two stop doing together, and ask each child separately, in a low-key moment, how things are between the two.', sk: 'Všímajte si, čo deti spolu prestanú robiť, a v nenápadnej chvíli sa opýtajte každého dieťaťa zvlášť, ako sú na tom spolu.' },
        question: { en: 'If each child were asked alone, what would each say the other would not guess?', sk: 'Čo by povedalo každé dieťa v rozhovore osamote, čo by druhé nečakalo?' },
    },
    'emotional-expression/siblings:opposed': {
        title: { en: 'One narrator for every row', sk: 'Jeden rozprávač pre každú hádku' },
        passage: {
            en: 'When {p0} erupts, {p1} tends to go still, and the row can become a story with one narrator. The version that gets told tends to be the one said at volume. The hurt that made no sound can be missed beside it.\n\n{p0} can take the quiet for indifference, and {p1} can take the noise for an attack, when neither is more than a different way of having a feeling. The two hold the halves of a good row between them: one says what is going on, the other can settle the room once it is said.',
            sk: 'Keď {p0} vybuchne, {p1} zvyčajne stíchne a z hádky sa môže stať príbeh s jedným rozprávačom. Rozpráva sa zvyčajne tá verzia, ktorá zaznela nahlas. Bolesť, ktorá sa neozvala, môže popri hlasnej verzii zapadnúť.\n\n{p0} môže brať ticho za ľahostajnosť a {p1} hluk za útok, hoci ani jedno nie je nič viac než iný spôsob, ako mať pocit. Spolu držia dve polovice dobrej hádky: jedno povie, čo sa deje, a druhé vie izbu upokojiť, keď už je to povedané.',
        },
        aside: {
            en: '{p0} is likely to say out loud what is going on, while {p1} tends to keep it in. In a row the louder child’s version can be the one that gets told, and the quieter child’s hurt may make no noise to compete with it.',
            sk: '{p0} zvyčajne hovorí nahlas, čo sa deje, kým si to {p1} skôr necháva pre seba. V hádke môže zaznieť hlavne verzia hlasnejšieho dieťaťa a bolesť tichšieho dieťaťa nemusí mať hluk, ktorým by sa mohla presadiť.',
        },
        step: { en: 'After a row, hear the quieter child’s side before the louder child’s, and let it come in writing, in a drawing or on a walk if speech is hard.', sk: 'Po hádke vypočujte najprv tichšie dieťa a až potom to hlasnejšie, a ak je reč ťažká, nechajte tichšie dieťa vyjadriť sa písmom, kresbou alebo na prechádzke.' },
        question: { en: 'How would each child tell a recent row, and what would be missing from the version that was heard?', sk: 'Ako by každé dieťa porozprávalo nedávnu hádku a čo by chýbalo vo verzii, ktorá zaznela?' },
    },
    /* ------------------------------------------------------------ visibility ---- */
    'social-energy/shared:private': {
        title: { en: 'A small circle that can stop growing', sk: 'Malý okruh, ktorý prestane rásť' },
        passage: {
            en: 'The house is restful when {both} both prefer a few people and a quiet evening: staying in is no loss, and the child has an adult who shares the wish for a shut door. Friendships tend to be few and deep, and time alone is used rather than endured.\n\nWhat is easy to miss is how a small circle sets. An invitation takes effort, and when neither of the two supplies it, the child’s company can narrow to whoever comes with school or the family, without anyone having decided it. A small circle chosen is a preference; a small circle that has stopped growing because inviting takes effort is something else, and only the child’s own words can tell which it is.',
            sk: 'V dome sa dobre oddychuje, keď {both} dávajú prednosť niekoľkým ľuďom a tichému večeru: zostať doma nie je strata a dieťa má vedľa seba dospelého človeka, ktorý rovnako túži po zatvorených dverách. Priateľstiev býva málo, no hlboké, a čas osamote sa využíva, nie pretrpí.\n\nĽahko sa prehliadne, ako sa malý okruh ustáli. Pozvať niekoho stojí námahu, a keď sa do toho nepustí ani jeden z nich, môže sa okruh dieťaťa zúžiť na tých, ktorí prichádzajú so školou alebo s rodinou, bez toho, aby sa o tom rozhodlo. Malý okruh, ktorý si dieťa zvolilo, je preferencia. Malý okruh, ktorý prestal rásť, lebo pozývať stojí námahu, je niečo iné, a ktorý z nich to je, prezradia len slová samotného dieťaťa.',
        },
        aside: {
            en: 'A restful home comes easily when {both} both prefer a few people. Since an invitation takes effort on both sides, the child’s circle can narrow without anyone having chosen it.',
            sk: 'Domov, v ktorom sa dobre oddychuje, vznikne ľahko, keď {both} dávajú prednosť niekoľkým ľuďom. Pozvanie stojí námahu dospelého človeka aj dieťaťa, takže sa okruh dieťaťa môže zúžiť aj bez toho, že by to niekto zvolil.',
        },
        step: { en: 'Now and then make one small invitation together, a single friend or relative, and ask the child afterwards how much of it was welcome.', sk: 'Raz za čas spolu urobte jedno malé pozvanie, jedného kamaráta alebo príbuzného, a potom sa dieťaťa opýtajte, koľko z toho bolo príjemné.' },
        question: { en: 'Which people does the child like to have near, and who has not been asked because asking takes effort?', sk: 'Ktorých ľudí má dieťa rado nablízku a koho nikto nepozval, lebo pozvať niekoho stojí námahu?' },
    },
    'social-energy/shared:social': {
        title: { en: 'A full calendar, a flat evening', sk: 'Plný kalendár, unavený večer' },
        passage: {
            en: 'The busiest house is the one {both} both feel at home in. Friends can come and go, plans multiply, and company is where the energy tends to be.\n\nBecause both draw energy from the same source, neither is well set to notice when it runs low. A child’s tiredness can pass for excitement, and a short temper may surface on the evening after a full weekend, with no unplanned quiet left to meet it. The first sign that a day was too full can then be the temper, since the tiredness can look like more of the fun.',
            sk: 'Najrušnejší dom je ten, v ktorom sa {both} cítia ako doma. Priatelia môžu prichádzať a odchádzať, plánov pribúda a energia býva tam, kde sú ľudia.\n\nKeďže energiu čerpajú z toho istého zdroja, ťažko si všimnú, keď začne dochádzať. Únava dieťaťa sa môže tváriť ako nadšenie a podráždenosť sa môže ukázať večer po plnom víkende, keď nezostal žiadny nenaplánovaný pokoj, ktorý by únavu zachytil. Prvým znakom, že deň bol priveľa, potom môže byť až podráždenosť, lebo únava môže vyzerať ako ďalšia zábava.',
        },
        aside: {
            en: 'A shared appetite for company can fill the calendar when {both} both draw energy from people. A child’s tiredness can pass for excitement, and with nothing unplanned in the week it may surface as a short temper.',
            sk: 'Spoločná chuť na ľudí môže zaplniť kalendár, keď {both} čerpajú energiu zo spoločnosti. Únava dieťaťa sa môže tváriť ako nadšenie a keď v týždni nie je nič nenaplánované, môže sa ukázať ako podráždenosť.',
        },
        step: { en: 'Put one unplanned stretch into the week, with no visitors and nothing to get to, and see what each of the two does with it.', sk: 'Nechajte v týždni jeden nenaplánovaný kus času, bez návštev a bez čohokoľvek, čo treba stihnúť, a všimnite si, čo každý z dvojice urobí s takým voľným časom.' },
        question: { en: 'When has a busy stretch tipped into tiredness, and what did it look like before anyone named it?', sk: 'Kedy sa rušné obdobie zvrtlo na únavu a ako to vyzeralo skôr, než to niekto pomenoval?' },
    },
    'social-energy/opposed:private': {
        title: { en: 'A wish for company in a quiet home', sk: 'Túžba po spoločnosti v tichom dome' },
        passage: {
            en: 'A request for friends over lands differently on each side. {second} may be making an ordinary wish, while {first} can hear one more call on a day perhaps already spent among people. The refusal can be about the adult’s energy, and the child can hear it as being about friends, the plan or wanting company at all.\n\nThe two do give each other something. The adult can be a calm base for the child to come back to, and the child can draw the adult toward connections that might not otherwise happen. A “not today” and a “no” can sound alike unless the adult says which it is, and when the yes could come.',
            sk: 'Prosba, aby prišli kamaráti, dopadne na každej strane inak. {second} môže mať obyčajné želanie, kým {first} v deň, ktorý už možno bol plný ľudí, môže počuť ďalšiu výzvu. Odmietnutie môže byť o energii dospelého človeka, no dieťa to môže pochopiť ako reč o kamarátoch, o pláne alebo o tom, že vôbec chce spoločnosť.\n\nDvojica si má naozaj čo ponúknuť. Dospelý môže byť pokojným zázemím, kam sa dieťa vracia, a dieťa môže dospelého človeka vťahovať do vzťahov, ktoré by inak nevznikli. „Dnes nie“ a „nie“ môžu znieť rovnako, kým dospelý človek nepovie, ktoré z toho to je a kedy môže prísť áno.',
        },
        aside: {
            en: 'Invitations can become a quiet tug between the two when {second} wants company and {first} wants rest. The adult’s “not today” can sound to the child like a verdict on friends, when it may be about energy.',
            sk: 'Pozvania sa môžu stať tichým sporom, keď {second} chce spoločnosť a {first} pokoj. „Dnes nie“ dospelého človeka môže dieťaťu znieť ako rozsudok nad kamarátmi, hoci môže ísť o energiu.',
        },
        step: { en: 'Fix a regular slot for company that the adult can look forward to, and say yes to it in advance, so that the other refusals have somewhere to point.', sk: 'Určte pravidelný čas na spoločnosť, na ktorý sa dospelý človek môže tešiť, a povedzte naň áno vopred, aby pri ostatných odmietnutiach bolo na čo ukázať.' },
        question: { en: 'How much company can the adult welcome without running dry, and how could the child know when that is?', sk: 'Koľko spoločnosti dokáže dospelý človek privítať a nevyčerpať sa a ako to môže dieťa poznať?' },
    },
    'social-energy/opposed:social': {
        title: { en: 'The gathering and the quiet room', sk: 'Posedenie a tichá izba' },
        passage: {
            en: 'A child who slips away from a gathering can look rude to the adult who arranged it, when leaving can be what makes staying possible. {first} tends to get energy from the room and may read the room’s pleasure as the child’s, so more company can seem the kind answer to a flat mood when quiet might be nearer what is needed.\n\nThe two can give each other a good deal. {second} can get gentle practice in company from an adult who makes it look easy, and {first} a closer look at what a quiet hour is worth. Much then rests on whether stepping out of a gathering counts in the house as allowed or as a slight.',
            sk: 'Dieťa, ktoré sa z posedenia vytratí, môže pripadať neslušné dospelému človekovi, ktorý posedenie pripravil, hoci práve možnosť odísť môže pobyt umožniť. {first} zvyčajne naberá energiu z miestnosti a radosť v izbe môže pokladať za radosť dieťaťa, takže viac spoločnosti sa môže zdať láskavou odpoveďou na skleslú náladu, hoci k tomu, čo dieťa potrebuje, môže byť bližšie ticho.\n\nDvojica si môže dať veľa. {second} môže dostať jemný nácvik spoločnosti od dospelého človeka, ktorému to ide ľahko, a {first} lepšie uvidieť, akú hodnotu má tichá hodina. Veľa potom závisí od toho, či sa odchod z posedenia berie v dome ako dovolený, alebo ako urážka.',
        },
        aside: {
            en: '{first} can draw energy from company and {second} from quiet. A child’s retreat from a gathering can look like rudeness to the adult when it may be closer to the end of what the child has to give.',
            sk: '{first} môže čerpať energiu zo spoločnosti a {second} z ticha. Keď sa dieťa z posedenia stiahne, môže to dospelému človekovi pripadať ako nezdvorilosť, hoci to môže byť skôr koniec toho, čo dieťa ešte vládze dať.',
        },
        step: { en: 'Before a gathering, agree with the child a sign for leaving the room and a place to go, so that stepping out is part of the plan.', sk: 'Pred posedením sa s dieťaťom dohodnite na znamení, že chce odísť z miestnosti, a na mieste, kam môže ísť, aby bol odchod súčasťou plánu.' },
        question: { en: 'What does the child need in order to stay at a gathering for a while, and what could make leaving early allowed?', sk: 'Čo dieťa potrebuje, aby mohlo na posedení chvíľu zostať, a čo by umožnilo skorší odchod?' },
    },
    'social-energy/siblings:shared:private': {
        title: { en: 'Quiet together, apart in company', sk: 'Spolu v tichu, osobitne v spoločnosti' },
        passage: {
            en: '{both} both like a quiet room, so a shared one holds little friction: each can read, build or drift, and the other’s silence is taken as no insult. Side by side for an evening is a real kind of company, and it asks very little of either.\n\nThat ease has a cost. Closeness can run on proximity alone. Neither may offer the other a way into what is being read or built, and the same quiet that makes sharing a room simple can keep each from becoming the other’s company by choice. An evening on one sofa, each with headphones on, is a familiar version: the two are side by side, entirely at ease, and not yet with each other.',
            sk: '{both} majú radi tichú izbu, takže v spoločnej izbe je málo trenia: každé môže čítať, stavať alebo snívať a ticho druhého nikto neberie ako urážku. Večer vedľa seba je skutočný druh spoločnosti a od nikoho si nežiada veľa.\n\nTakáto ľahkosť má cenu. Blízkosť sa môže držať len na tom, že sú vedľa seba. Ani jedno druhému nemusí ponúknuť cestu k tomu, čo číta alebo stavia, a to isté ticho, vďaka ktorému je zdieľanie izby jednoduché, môže brániť tomu, aby sa jedno stalo pre druhé spoločnosťou z vlastnej voľby. Známou podobou je večer na jednom gauči, každé so slúchadlami: sedia vedľa seba, úplne uvoľnene, a ešte nie spolu.',
        },
        aside: {
            en: 'Sharing a quiet room takes almost no effort when {both} both like the quiet. The closeness can then run on being side by side, with neither offering the other a way into what each is doing.',
            sk: 'Zdieľať tichú izbu nestojí takmer žiadnu námahu, keď {both} majú radi ticho. Blízkosť sa potom môže držať len na tom, že sú vedľa seba, a ani jedno druhému neponúka cestu k tomu, čo práve robí.',
        },
        step: { en: 'Set up one shared thing that needs both and little talk, such as a puzzle, a walk or a game with turns, and leave it open to be enjoyed or skipped.', sk: 'Vymyslite jednu spoločnú vec, ktorá potrebuje dvoch a málo rozprávania, napríklad puzzle, prechádzku alebo hru so striedaním, a nechajte to dobrovoľné: dá sa to užiť, aj vynechať.' },
        question: { en: 'What does each child do alone that the other has not been invited into, and would either want that?', sk: 'Čo robí každé dieťa osamote, do čoho druhé nikto nepozval, a chcelo by to niektoré z nich?' },
    },
    'social-energy/siblings:shared:social': {
        title: { en: 'Each the other’s audience and rival', sk: 'Každé je poslucháčom aj súperom druhého' },
        passage: {
            en: 'A joke needs a listener, and when {both} both live for company the other is the nearest listener and also the nearest competitor for attention. Games can start without effort, the house is seldom silent, and each child has someone to try a day out on.\n\nThe same appetite can turn playmates into rivals for the room. When a friend arrives, three can make a larger game or a contest for the front, and being outshone by a sibling can sting more than being outshone by anyone else. The attention that makes the play lively is also what both are reaching for.',
            sk: 'Vtip potrebuje poslucháča, a keď {both} žijú spoločnosťou, druhé dieťa je najbližším poslucháčom a zároveň najbližším súperom o pozornosť. Hry sa môžu rozbehnúť bez námahy, v dome je zriedka ticho a každé dieťa má niekoho, komu môže odrozprávať svoj deň.\n\nTá istá chuť môže zo spoluhráčov urobiť súperov o publikum. Keď príde kamarát, traja môžu vymyslieť väčšiu hru alebo súťažiť o prvé miesto a keď dieťa zatieni súrodenec, môže to bolieť viac než zatienenie kýmkoľvek iným. Pozornosť, vďaka ktorej je hra živá, je zároveň tým, po čom siaha každé z detí.',
        },
        aside: {
            en: 'Games start easily when {both} both draw energy from company, and so can the contest for who is heard. Each has a playmate close at hand and a rival for the room.',
            sk: 'Hry sa ľahko rozbehnú, keď {both} čerpajú energiu zo spoločnosti, a rovnako ľahko aj súťaž o to, kto sa dostane k slovu. Každé má po ruke spoluhráča aj súpera o publikum.',
        },
        step: { en: 'Give each child a stretch of the week with the floor, a chosen game or an outing, so that having the stage is a turn and not a contest.', sk: 'Dajte každému dieťaťu v týždni chvíľu, keď má slovo: vybranú hru alebo výlet, aby sa pódium striedalo a nebolo súťažou.' },
        question: { en: 'When does the energy between the two turn from play to competition, and what is each reaching for at that point?', sk: 'Kedy sa energia medzi dvojicou mení z hry na súťaž a po čom v tej chvíli siaha každé z detí?' },
    },
    'social-energy/siblings:opposed': {
        title: { en: 'One room, one volume', sk: 'Jedna izba, jedna hlasitosť' },
        passage: {
            en: 'A shared room has only one volume at a time, and {p0} and {p1} may want different ones. When {p1} wants friends over, the room turns loud and {p0} has no quiet; when {p0} wants quiet, the room stays empty and {p1} has no company. Whichever setting wins tends to be treated as the normal one, and the other child becomes the one who has to ask.\n\nEach also has something to lend. {p1} can be a door to other people and to what is going on outside, and {p0} a place to be unhurried and a listener who is not competing for the floor. The quarrel over the room can hide that, because it can be a quarrel about whose need counts as ordinary.',
            sk: 'Spoločná izba má naraz len jednu hlasitosť, ale {p0} a {p1} môžu chcieť každé inú. Keď chce {p1} pozvať kamarátov, v izbe je hluk a {p0} nemá ticho; keď chce {p0} ticho, izba ostáva prázdna a {p1} nemá spoločnosť. Nastavenie, ktoré vyhrá, sa zvyčajne berie ako to bežné a druhé dieťa je potom to, ktoré musí prosiť.\n\nKaždé má aj čo dať druhému. {p1} môže byť dverami k iným ľuďom a k dianiu vonku a {p0} miestom, kde sa nikam nechvátá, a poslucháčom, ktorý nesúperí o slovo. Spor o izbu to môže zakryť, lebo to môže byť spor o tom, čia potreba sa berie ako bežná.',
        },
        aside: {
            en: 'One shared room can hold only one volume, and {p1} may want friends and noise while {p0} would rather have quiet. Whichever need becomes the default can turn the other child into the one who has to ask.',
            sk: 'Jedna spoločná izba znesie naraz len jednu hlasitosť a {p1} môže chcieť kamarátov a ruch, kým {p0} má radšej ticho. Ktorá potreba sa zabehne ako samozrejmá, môže z druhého dieťaťa urobiť to, ktoré musí prosiť.',
        },
        step: { en: 'Divide the shared room by time, with set stretches for visitors and for quiet, and mark one corner that guests do not enter.', sk: 'Rozdeľte spoločnú izbu podľa času, s vymedzenými obdobiami pre návštevy a pre ticho, a vyznačte jeden kút, kam hostia nechodia.' },
        question: { en: 'Which stretches of the week does each child most want to keep, and how can each ask for them without it sounding like a complaint?', sk: 'Ktoré časti týždňa si chce každé dieťa najviac ponechať a ako o ne môže požiadať tak, aby to neznelo ako sťažnosť?' },
    },
    /* ------------------------------------------------------------ change ---- */
    'change-and-steadiness/shared:stability-seeking': {
        title: { en: 'Two who lean on the familiar', sk: 'Dvojica, ktorá sa opiera o známe' },
        passage: {
            en: 'The same dinner, the same route, the same way a day begins: {both} both lean on things staying put, and the rituals that follow hold a home steady. The child has an adult who understands why a changed plan can feel like a lot.\n\nAt home, how much new reaches the child can depend on what the adult finds comfortable, so a shared liking for the known can keep the child’s world smaller than it might be. When a change does come, a new school year or a plan dropped, it can unsettle both at once, and the adult who would steady the child may have less steadiness to spare. The child’s leaning to the known is still forming, and part of its shape can come from how the adult meets the new.',
            sk: 'Tá istá večera, tá istá cesta, ten istý spôsob, akým sa začína deň: {both} sa opierajú o to, že veci ostávajú na mieste, a rituály, ktoré z toho vyplynú, dodávajú domovu stálosť. Dieťa má vedľa seba dospelého človeka, ktorý chápe, prečo môže zmenený plán pôsobiť ako priveľa.\n\nDoma môže to, koľko nového sa k dieťaťu dostane, závisieť od toho, čo je pohodlné dospelému človekovi, a spoločná obľuba známeho tak môže udržať svet dieťaťa menší, než by mohol byť. Keď zmena príde, nový školský rok alebo zrušený plán, môže vyviesť z miery dospelého človeka aj dieťa naraz a dospelému človekovi, ktorý by dieťa inak upokojil, môže zostať menej pokoja nazvyš. Sklon dieťaťa k známemu sa ešte formuje a to, ako dospelý človek prijíma nové, môže tento sklon čiastočne tvarovať.',
        },
        aside: {
            en: 'Rituals hold the home steady when {both} both lean on the familiar. A changed plan can unsettle the two at once, and the steadying then falls to an adult who may be unsettled too.',
            sk: 'Rituály dodávajú domovu stálosť, keď sa {both} opierajú o známe. Zmenený plán môže vyviesť z miery dospelého človeka aj dieťa naraz a upokojovanie potom pripadne dospelému človekovi, ktorého zmena tiež môže rozhodiť.',
        },
        step: { en: 'Choose one small new thing to try together, announce it early, and keep everything around it as usual.', sk: 'Vyberte jednu malú novú vec, ktorú vyskúšate spolu, oznámte novinku vopred a všetko okolo nechajte po starom.' },
        question: { en: 'What new thing would the child be glad to meet if the adult went first, and what would make it feel safe?', sk: 'Čo nové by dieťa rado spoznalo, keby dospelý človek išiel prvý, a čo by to urobilo bezpečným?' },
    },
    'change-and-steadiness/shared:novelty-seeking': {
        title: { en: 'A plan that changes on the way', sk: 'Plán, ktorý sa mení po ceste' },
        passage: {
            en: 'A plan that changes on the way is an adventure, not a setback, when {both} both lean toward the new. Trips, experiments and a different route home bring shared excitement instead of argument, and the child has an adult who is glad to say yes to something else.\n\nThe shortfall is shared too. The rhythms that carry a body through a week, sleep, meals, the bag packed the night before, can seem dull to both, and they can be the first to slip when the next idea arrives. The cost then tends to show not in the adventure but afterwards, as a tired child or a missing kit on a school morning.',
            sk: 'Plán, ktorý sa mení po ceste, je dobrodružstvo, nie nezdar, keď sa {both} prikláňajú k novému. Výlety, pokusy aj iná cesta domov prinášajú spoločné nadšenie namiesto sporu a dieťa má dospelého človeka, ktorý rád povie áno aj niečomu inému.\n\nSlabé miesto je tiež spoločné. Rytmy, ktoré telo prenesú cez týždeň, spánok, jedlo, taška zbalená večer predtým, môžu túto dvojicu nudiť a pri ďalšom nápade sa môžu zanedbať ako prvé. Cena sa potom zvyčajne ukáže až neskôr, nie pri samotnom dobrodružstve: ako unavené dieťa alebo zabudnuté veci na šport ráno pred školou.',
        },
        aside: {
            en: 'Plans can change without a fuss when {both} both reach for the new. The quiet rhythms of sleep, meals and getting ready can seem dull to both, and they are the part most likely to be dropped.',
            sk: 'Plány sa môžu meniť bez rozruchu, keď {both} siahajú po novom. Pokojné rytmy spánku, jedla a prípravy do školy môžu dvojicu nudiť a práve tie sa najľahšie zanedbajú.',
        },
        step: { en: 'Name the two or three rhythms that stay fixed whatever else changes, such as sleep and meals, and let the new things be chosen around them.', sk: 'Pomenujte dva alebo tri rytmy, ktoré ostanú pevné, nech sa inak mení čokoľvek, napríklad spánok a jedlo, a nové veci vyberajte okolo nich.' },
        question: { en: 'Which routines would the child miss if they slipped, and who is keeping them at the moment?', sk: 'Ktoré rutiny by dieťaťu chýbali, keby sa vytratili, a kto ich teraz drží?' },
    },
    'change-and-steadiness/opposed:stability-seeking': {
        title: { en: 'A tested answer to every new idea', sk: 'Overená odpoveď na každý nový nápad' },
        passage: {
            en: 'Each “can we try something different” reaches an adult for whom the usual is already a good answer, and repeated refusals can begin to sound, to the child, like a verdict on curiosity.\n\n{first} can offer a base that does not move, and {second} a way to places and experiences that would otherwise be passed by. The clash between the usual and the new is often a question of size: a small, chosen version of the new fits on top of a base, while the new at full size can seem to replace it.',
            sk: 'Každé „môžeme skúsiť niečo iné?“ narazí na dospelého človeka, pre ktorého je zabehnuté už dobrou odpoveďou, a opakované odmietnutia môžu dieťaťu začať znieť ako rozsudok nad zvedavosťou.\n\n{first} môže ponúknuť pevný bod, ktorý sa nehýbe, a {second} cestu k miestam a zážitkom, ktoré by inak ostali bokom. Spor medzi zabehnutým a novým je často otázkou miery: malá, vybraná podoba nového sa dá pridať k tomu, čo je, kým nové v plnej veľkosti môže vyzerať, že to nahradí.',
        },
        aside: {
            en: 'Each new idea can meet a tested answer, since {first} tends to prefer what is tried while {second} may want somewhere new. Repeated refusals can leave the child restless and the adult cornered, though a small, chosen version of the new may fit on top of the usual.',
            sk: 'Každý nový nápad môže naraziť na osvedčenú odpoveď, lebo {first} zvyčajne uprednostňuje overené, kým {second} môže chcieť niečo nové. Opakované odmietnutia môžu nechať dieťa nepokojné a dospelého človeka zahnať do kúta, hoci malá, vybraná podoba nového sa môže pridať k zabehnutému.',
        },
        step: { en: 'Agree a regular small dose of the new, with the child choosing what it is, inside a week whose core routines stay as they are.', sk: 'Dohodnite pravidelnú malú dávku nového, ktorú si vyberá dieťa, v týždni, v ktorom základné rutiny ostanú také, aké sú.' },
        question: { en: 'What is the smallest version of what the child wants to try that the adult could say yes to?', sk: 'Aká je najmenšia podoba toho, čo chce dieťa skúsiť, na ktorú by dospelý človek mohol povedať áno?' },
    },
    'change-and-steadiness/opposed:novelty-seeking': {
        title: { en: 'A surprise and a lost plan', sk: 'Prekvapenie a stratený plán' },
        passage: {
            en: 'A surprise outing, a rearranged room, a changed plan on the way home: {first} can find any of these refreshing, while {second} can meet them first as the loss of what was expected. The same news arrives as an offer for one and as a removal for the other.\n\nThe adult can bring something valuable, a demonstration that the new can turn out well, and the child the rituals that give the home its shape. The protest, when it comes, can be about the missing run-up and not about the outing, so the same news told earlier can be a different event.',
            sk: 'Prekvapivý výlet, prestavaná izba, zmenený plán na ceste domov: {first} môže niečo z toho zažiť ako osviežujúce, kým {second} to môže najprv zažiť ako stratu toho, čo sa čakalo. Tá istá správa sa jednej strane javí ako ponuka a druhej ako odobratie.\n\nDospelý môže priniesť niečo cenné, ukážku, že nové môže dopadnúť dobre, a dieťa rituály, ktoré dávajú domovu podobu. Protest, keď príde, môže byť o chýbajúcom rozbehu, nie o výlete, takže tá istá správa povedaná skôr môže byť iná udalosť.',
        },
        aside: {
            en: '{first} may enjoy a change of plan while {second} leans on the familiar. A spontaneous outing can reach the child as a loss, and the protest may be about the missing warning rather than the outing itself.',
            sk: '{first} si môže zmenu plánu užívať, kým sa {second} opiera o známe. Spontánny výlet môže na dieťa dopadnúť ako strata a protest môže byť o chýbajúcom upozornení, nie o samotnom výlete.',
        },
        step: { en: 'Announce changes early, say out loud what stays the same, and let the child carry one familiar thing along into anything new.', sk: 'Oznamujte zmeny včas, povedzte nahlas, čo ostáva rovnaké, a nechajte dieťa vziať do všetkého nového jednu známu vec.' },
        question: { en: 'What does the child lose when a plan changes, and what could the adult say beforehand that would keep it?', sk: 'Čo dieťa pri zmene plánu stráca a čo by mohol dospelý človek povedať vopred, aby to dieťa nestratilo?' },
    },
    'change-and-steadiness/siblings:shared:stability-seeking': {
        title: { en: 'Two who wait for the other to try', sk: 'Každé čaká, kým vyskúša druhé' },
        passage: {
            en: 'A new thing has to be met by two children who both prefer the known, and each can wait for the other to go first: the new food, the new club, the new child next door. When {both} both hang back, hesitation can double instead of cancelling, since neither has an example of the new thing going well.\n\nThe familiar is also shared, and that is a real comfort. The same seat, the same game, the same end to the day can be held in place by two, so that each is the other’s ritual. What is lost is the push that a more adventurous sibling can give, and a change that does come can land on both at once.',
            sk: 'Nová vec naráža na dve deti, ktoré majú rady známe, a každé môže čakať, kým ako prvé pôjde druhé: nové jedlo, nový krúžok, nové dieťa v susedstve. Keď sa {both} držia späť, váhanie sa môže zdvojnásobiť namiesto toho, aby sa zmiernilo, lebo ani jedno nemá príklad, že nové dopadlo dobre.\n\nZnáme je aj spoločné a to je skutočná útecha. To isté miesto, tá istá hra, ten istý koniec dňa sa dajú udržať vo dvojici, takže každé je rituálom pre druhé. Chýba postrčenie, ktoré môže dať odvážnejší súrodenec, a zmena, ktorá príde, môže zasiahnuť dvojicu naraz.',
        },
        aside: {
            en: 'Each child can hold the other’s routines in place when {both} both prefer the familiar. A new thing can then wait for one of the two to try it first.',
            sk: 'Každé dieťa môže druhému držať rutiny na mieste, keď {both} majú radi známe. Nová vec potom môže čakať, kým sa jedno z dvojice odhodlá ísť prvé.',
        },
        step: { en: 'Present new things to both children at once, with notice, so that neither has to be the one who goes first alone.', sk: 'Predstavujte nové veci dvojici naraz a s upozornením, aby ani jedno dieťa nemuselo ísť prvé samo.' },
        question: { en: 'Which new thing has each child been willing to try only after seeing the other try it?', sk: 'Čo nové bolo každé dieťa ochotné vyskúšať až potom, čo to videlo robiť druhé?' },
    },
    'change-and-steadiness/siblings:shared:novelty-seeking': {
        title: { en: 'The next idea before the last one ends', sk: 'Ďalší nápad skôr, než skončí predošlý' },
        passage: {
            en: 'A game that is going well can still be dropped when {both} both lean toward the new, because the next idea arrives before this one is finished. Each is a ready supplier of ideas and the other a ready taker. The house fills with starts: a new plan for the afternoon, a rearranged shelf, a different game by the time the first is set up.\n\nFinishing is the thin side. Between two who both want to move on, each can be the other’s reason to leave a game or a project half made. Staying with the old thing then takes one of them to hold on while the other is already elsewhere, and holding on is the part neither of the two is drawn to.',
            sk: 'Aj hra, ktorá ide dobre, sa môže opustiť, keď sa {both} prikláňajú k novému, lebo ďalší nápad príde skôr, než sa dokončí tento. Každé rado prichádza s nápadmi a druhé ich rado prijíma. Dom sa plní začiatkami: nový plán na popoludnie, prestavaná polica, iná hra, kým sa tá prvá poskladá.\n\nSlabšou stránkou je dokončovanie. Medzi dvoma deťmi, ktoré chcú ísť ďalej, môže byť každé pre druhé dôvodom nechať hru či projekt rozpracované. Zostať pri starom potom vyžaduje, aby jedno vydržalo, kým je druhé už inde, a práve vydržať neláka ani jedno z nich.',
        },
        aside: {
            en: 'A day can fill with beginnings when {both} both chase the next idea. Each can be the other’s reason to move on, and a game or project that nobody stays with tends to go unfinished.',
            sk: 'Deň sa môže zaplniť začiatkami, keď {both} naháňajú jeden nápad za druhým. Každé môže byť pre druhé dôvodom ísť ďalej a hra či projekt, pri ktorom nikto neostane, zvyčajne zostane nedokončený.',
        },
        step: { en: 'Invite the two to name one project they will keep going for a stretch, and let everything else around it change freely.', sk: 'Vyzvite dvojicu, aby pomenovala jeden projekt, pri ktorom nejaký čas vydrží, a všetko ostatné okolo nech sa mení voľne.' },
        question: { en: 'What have the two started together that either would still like to finish?', sk: 'Čo dvojica spolu začala a čo by niektoré z detí ešte rado dokončilo?' },
    },
    'change-and-steadiness/siblings:opposed': {
        title: { en: 'One announcement, two events', sk: 'Jedno oznámenie, dve udalosti' },
        passage: {
            en: 'One announcement can be two different events in the same house. The new game, the rearranged shelf, the plan for the weekend: {p1} can find that it opens something, and {p0} that it unsettles something. Each can take the other’s reaction as a verdict on the idea, when it can be only a different pace of arriving at it.\n\nEach also carries the other somewhere. {p1} can open the way to things that would otherwise stay unmet, and {p0} can offer a place that is still there afterwards: the game that lasts, the ritual that holds. Between them the friction can sit less in the change itself than in its pace and in who hears of it first.',
            sk: 'Jedno oznámenie môže byť v jednom dome dvoma rôznymi udalosťami. Nová hra, prestavaná polica, plán na víkend: {p1} v tom môže vidieť, že sa niečo otvára, a {p0} cítiť, že sa niečo narúša. Každé môže reakciu druhého brať ako rozsudok nad nápadom, hoci to môže byť len iné tempo, akým sa k nápadu prichádza.\n\nKaždé vie druhé niekam zaviesť. {p1} môže otvárať cestu k veciam, ktoré by inak ostali nepoznané, a {p0} môže ponúknuť miesto, ktoré tu je aj potom: hru, ktorá vydrží, rituál, ktorý drží. Trenie medzi dvojicou môže byť menej v samotnej zmene než v tempe zmeny a v tom, kto sa o zmene dozvie prvý.',
        },
        aside: {
            en: '{p1} may take the same news as an invitation and {p0} as a disturbance. Each can take the other’s reaction for a verdict on the idea, when it may be only a difference in pace.',
            sk: '{p1} môže brať tú istú správu ako pozvanie a {p0} ako vyrušenie. Každé môže reakciu druhého brať za rozsudok nad nápadom, hoci môže ísť len o rozdiel v tempe.',
        },
        step: { en: 'Let the child who loves the new tell the other early, as a plan to hold, so that one child’s excitement does not arrive as the other’s surprise.', sk: 'Nech dieťa, ktoré má rado nové, povie druhému včas, ako o pláne, s ktorým sa dá počítať, aby nadšenie jedného neprišlo ako prekvapenie pre druhé.' },
        question: { en: 'What would help the child who likes change to slow down, and what would help the other to try?', sk: 'Čo by pomohlo dieťaťu, ktoré má rado zmenu, spomaliť, a čo by pomohlo druhému skúsiť?' },
    },
    /* ------------------------------------------------------------ initiative ---- */
    'taking-the-lead/shared:assertive': {
        title: { en: 'Two wills at one limit', sk: 'Dve vôle pri jednej hranici' },
        passage: {
            en: 'A limit is seldom received as a plain fact when {both} both know what they want; it is received as a move. A “no” gets a counter, the counter gets another, and the exchange can run well past the thing it was about.\n\nThe same strength has its use. Nobody has to guess what either wants, and plans can be made quickly. A child with a strong will can be practising how to hold a position, and to that child the adult’s firmness can look like one more push to answer. Once the limit is said, the exchange tends to grow with every reason the adult adds and to shrink when there is nothing left to push against.',
            sk: 'Hranica sa málokedy prijme ako obyčajný fakt, keď {both} vedia, čo chcú; berie sa ako výzva. Na „nie“ príde odpor, na odpor ďalší odpor a výmena môže pokračovať ďaleko za to, o čo šlo.\n\nTá istá sila má svoje využitie. Nikto nemusí hádať, čo chce ten druhý, a plány sa dajú urobiť rýchlo. Dieťa so silnou vôľou sa môže učiť, ako si držať stanovisko, a takému dieťaťu môže pevnosť dospelého človeka pripadať ako ďalšie zatlačenie, na ktoré treba zatlačiť späť. Keď hranica zaznie, výmena zvyčajne rastie s každým ďalším dôvodom, ktorý dospelý človek pridá, a slabne, keď už nie je do čoho tlačiť.',
        },
        aside: {
            en: 'Plans are quick and wishes are plain when {both} both know what they want. The same directness can meet a limit with a counter, and the counter with another, until a small “no” becomes a contest.',
            sk: 'Plány sú rýchle a želania jasné, keď {both} vedia, čo chcú. Tá istá priamosť môže na hranicu odpovedať námietkou a na námietku ďalšou, až sa z malého „nie“ stane súboj.',
        },
        step: { en: 'Keep the list of firm limits short and decide it in a calm moment, so that everything else can be a real choice and not a contest.', sk: 'Zoznam pevných hraníc udržte krátky a zostavte v pokojnej chvíli, aby všetko ostatné mohlo byť skutočnou voľbou, nie súbojom.' },
        question: { en: 'Where does the child get to decide something that matters, and which of the adult’s limits is truly firm?', sk: 'Kde sa môže dieťa rozhodnúť o niečom, na čom záleží, a ktorá hranica dospelého človeka je naozaj pevná?' },
    },
    'taking-the-lead/shared:receptive': {
        title: { en: 'Nobody chooses', sk: 'Nikto nevyberie' },
        passage: {
            en: '“What would you like” can be handed back and forth until something outside decides it, when {both} both wait for the other to choose: dinner, the weekend, the plan for the evening.\n\nEasy cooperation is the gift here, and there is little friction to manage. But the child’s easy yes is not yet a wish, and the adult’s easy yes is not yet a limit. In a home where nobody pushes, a limit has to be offered rather than defended, and whether one gets offered depends on the adult.',
            sk: '„Čo chceš?“ sa dá podávať sem a tam, kým o tom nerozhodne niečo zvonku, keď {both} čakajú jeden na druhého, kto vyberie: večera, víkend, plán na večer.\n\nĽahká spolupráca je tu darom a trenia je málo. No ľahké áno dieťaťa ešte nie je želanie a ľahké áno dospelého človeka ešte nie je hranica. V dome, kde nikto netlačí, treba hranicu skôr ponúknuť než obhajovať, a či sa ponúkne, závisí od dospelého človeka.',
        },
        aside: {
            en: 'Preferences can hide behind “I don’t mind” when {both} both wait for the other to choose. The child’s easy yes may not be a wish, and the adult’s may not be a limit.',
            sk: 'Želania sa môžu skrývať za „mne je to jedno“, keď {both} čakajú, kto vyberie. Ľahké áno dieťaťa nemusí byť želaním a ľahké áno dospelého človeka nemusí byť hranicou.',
        },
        step: { en: 'Take turns choosing in the open: the adult says what is wanted first on some days, and asks the child to say it first on others.', sk: 'Striedajte sa v rozhodovaní otvorene: dospelý človek niektoré dni povie, čo chce, ako prvý, a v iné požiada dieťa, aby to povedalo prvé.' },
        question: { en: 'What does the child want that has not been said, and what kind of asking would make it easier to say?', sk: 'Čo si dieťa praje, ale nepovedalo, a aké pýtanie by to uľahčilo?' },
    },
    'taking-the-lead/opposed:assertive': {
        title: { en: 'Smooth, and perhaps not agreed', sk: 'Hladko, a možno bez dohody' },
        passage: {
            en: 'Things can run smoothly when {first} decides and {second} goes along, and smoothness is the part that is easy to mistake for agreement. The adult meets little contest, and the child has a clear lead to follow. What may not appear in the day is the child’s own preference.\n\nA child who seldom pushes back is not the same as a child with nothing to ask for. The unasked wish can come out later as tears or as a sudden refusal that seems to come from nowhere, and the adult is left with a conflict that looks unrelated to anything just said. The smoother the day runs, the easier it is to miss that the choosing has all been on one side.',
            sk: 'Veci môžu ísť hladko, keď {first} rozhoduje a {second} sa prispôsobuje, a práve hladkosť sa ľahko zamení za zhodu. Dospelý sa nestretáva s veľkým odporom a dieťa má jasné vedenie, za ktorým môže ísť. Čo sa v priebehu dňa nemusí objaviť, je to, čo chce samo dieťa.\n\nDieťa, ktoré sa zriedka ohradí, nie je to isté ako dieťa, ktoré nemá čo žiadať. Nevyslovené želanie môže vyjsť neskôr ako plač alebo ako náhle odmietnutie, ktoré akoby prišlo z ničoho, a dospelý človek stojí pred konfliktom, ktorý nesúvisí s ničím, čo práve zaznelo. Čím hladšie deň plynie, tým ľahšie sa prehliadne, že všetko vyberá len jedna strana.',
        },
        aside: {
            en: '{first} may decide quickly while {second} tends to go along, so the day can run smoothly. The child’s own wishes can stay unspoken until they come out as tears or a sudden no.',
            sk: '{first} môže rozhodovať rýchlo, kým sa {second} zvyčajne pridá, takže deň môže bežať hladko. Vlastné želania dieťaťa môžu ostať nevyslovené, kým nevyjdú ako plač alebo náhle „nie“.',
        },
        step: { en: 'Ask first and decide second on small things, and wait out the pause before the child answers.', sk: 'Pri drobnostiach sa najprv pýtajte a rozhodujte až potom a vydržte pauzu, kým dieťa odpovie.' },
        question: { en: 'When did the child last say what was wanted without being asked, and what made that moment easy?', sk: 'Kedy dieťa naposledy samo od seba povedalo, čo chce, a čo tú chvíľu uľahčilo?' },
    },
    'taking-the-lead/opposed:receptive': {
        title: { en: 'Going first, leaving room', sk: 'Ísť prvý a nechať miesto' },
        passage: {
            en: '{second} tends to take the first step and propose the plan, while {first} leans toward listening, keeping the peace and leaving room for others to decide. The two meet wherever a limit is set. A limit that gives way to a push can slide a little each time it is tried, and a child testing it can be finding out where it sits as much as trying to move it.\n\nA quiet manner is no handicap, as long as the limits stay put. What can move them is the adult’s leaning toward peace. Each small yield buys a calm moment and shows that a push may work, so the child’s drive can go into finding the edge, and the edge keeps moving.',
            sk: '{second} sa zvyčajne ujíma prvého kroku a navrhuje plán, kým sa {first} prikláňa k počúvaniu, udržiavaniu pokoja a k tomu, aby rozhodli iní. Stretnú sa všade, kde sa stanovuje hranica. Hranica, ktorá ustúpi tlaku, sa môže pri každom pokuse trochu posunúť, a dieťa, ktoré hranicu skúša, môže zisťovať, kde stojí, rovnako ako sa snažiť hranicou pohnúť.\n\nTichá povaha nevadí, ak hranice držia. Pohnúť hranicami môže skôr túžba dospelého človeka po pokoji. Každé drobné ustúpenie prinesie chvíľu pokoja a ukáže, že tlak môže zabrať, takže sila dieťaťa môže ísť do skúšania, kde je hranica, a tá sa stále posúva.',
        },
        aside: {
            en: 'A limit can meet a test each time it is set when {second} likes to lead and {first} would rather keep the peace. A child pressing on it can be looking for where it sits as much as trying to move it.',
            sk: 'Hranica môže čeliť skúške zakaždým, keď sa stanoví, ak {second} chce viesť a {first} radšej udržiava pokoj. Dieťa, ktoré na hranicu tlačí, môže hľadať, kde stojí, rovnako ako sa snažiť hranicou pohnúť.',
        },
        step: { en: 'Choose the two or three limits that matter most, state them once and calmly in advance, and give a real choice inside them.', sk: 'Vyberte dve alebo tri hranice, na ktorých najviac záleží, povedzte ich raz a pokojne vopred a vnútri nich dajte dieťaťu skutočnú voľbu.' },
        question: { en: 'Which limit would be easiest to hold steady, and what choice could the child own inside it?', sk: 'Ktorú hranicu by bolo najľahšie držať pevne a akú voľbu by dieťa mohlo mať vo vlastných rukách, keby hranica držala?' },
    },
    'taking-the-lead/siblings:shared:assertive': {
        title: { en: 'Two who both want to choose', sk: 'Každé chce rozhodovať' },
        passage: {
            en: 'No choice is small to two children who both know what they want: the game, the seat, the channel. {both} can each propose, each decline the other’s proposal, and the argument can come to be about who gave way last more than about the game.\n\nThe directness has a good side. Each tends to say plainly what is wanted, so little has to be guessed. But stepping back first can cost more between two who both push than between two who do not, which is why a small thing can last so long.',
            sk: 'Pre dve deti, ktoré vedia, čo chcú, nie je žiadna voľba malá: hra, miesto, kanál. {both} môžu navrhovať aj odmietať návrh druhého a hádka sa môže točiť skôr okolo toho, kto naposledy ustúpil, než okolo hry.\n\nPriamosť má dobrú stránku. Každé zvyčajne povie jasne, čo chce, takže sa treba málo domýšľať. Ustúpiť ako prvé však môže stáť viac medzi deťmi, ktoré presadzujú svoje, než medzi tými, ktoré nie, a preto môže drobnosť trvať tak dlho.',
        },
        aside: {
            en: 'Small things can become contests when {both} both push for their own way, because giving way first can feel like losing. The game or the seat can stop being the subject.',
            sk: 'Drobnosti sa môžu stať súbojom, keď {both} presadzujú svoje, lebo ustúpiť ako prvé môže vyzerať ako prehra. Hra či miesto prestane byť tým, o čo ide.',
        },
        step: { en: 'Agree a fair way to settle small choices that neither child has to concede, such as a coin toss or a rota.', sk: 'Dohodnite férový spôsob rozhodovania o drobných voľbách, pri ktorom nikto z detí nemusí ustúpiť, napríklad hod mincou alebo striedanie.' },
        question: { en: 'What does each child say is worth holding on to in a standoff, and how might the other find that out?', sk: 'Čo sa podľa každého dieťaťa oplatí držať, keď sa spor zasekne, a ako by to mohlo druhé zistiť?' },
    },
    'taking-the-lead/siblings:shared:receptive': {
        title: { en: 'Two who each hand the choice over', sk: 'Každé prenecháva voľbu druhému' },
        passage: {
            en: 'A stalemate that makes no noise is what “you choose” becomes when {both} both say it. There is no quarrel because there is no proposal, and the afternoon waits for something to begin.\n\nWhatever is chosen is chosen by what happens first: a friend’s idea, a screen, the next thing on offer. Each child can go along with the result without having wanted it. The cost is not conflict but the quiet absence of what each would have liked, which the other cannot supply because it has not been said.',
            sk: 'Vznikne tichý pat, keď si {both} navzájom hovoria „vyber si ty“. Nie je spor, lebo nikto nič nenavrhne, a popoludnie čaká, kým sa niečo začne.\n\nČo sa vyberie, vyberie sa podľa toho, čo príde prvé: nápad kamaráta, obrazovka, ďalšia vec v ponuke. Každé dieťa môže výsledok prijať, aj keď to nechcelo. Cenou nie je konflikt, ale tiché chýbanie toho, čo by každé rado malo, a druhé to nemôže dodať, lebo to nezaznelo.',
        },
        aside: {
            en: 'An afternoon can pass in waiting to be asked when {both} both go along. Choices fall to whatever arrives first, and each child’s own preference can stay unsaid.',
            sk: 'Celé popoludnie môže prejsť čakaním, kým sa niekto opýta, keď sa {both} len pridávajú. Voľby padnú na to, čo príde prvé, a vlastné želanie každého dieťaťa môže ostať nevyslovené.',
        },
        step: { en: 'Give each child a chance to choose first on set occasions, with the other asked only to say yes or no.', sk: 'Dajte každému dieťaťu pri stanovených príležitostiach možnosť vybrať ako prvé, pričom druhé povie len áno, alebo nie.' },
        question: { en: 'What would each child pick if the other had already said yes to it?', sk: 'Čo by si každé dieťa vybralo, keby vedelo, že druhé už súhlasí?' },
    },
    'taking-the-lead/siblings:opposed': {
        title: { en: 'A game chosen by one voice', sk: 'Hra vybraná jedným hlasom' },
        passage: {
            en: 'The game can start as soon as {p0} names it, because {p1} tends to join readily. That ease is real: nobody argues and play seldom stalls. It also means the choosing is done by one voice, and a game chosen the same way each time can look like harmony while the other voice goes unused.\n\nA voice that goes unused can come to seem the one with nothing to say. {p0} can get the practice of leading and little of stopping to ask, and {p1} the practice of going along and little of saying what is wanted. When {p1} does say a rare “no”, it carries more than its volume.',
            sk: 'Hra sa môže začať, len čo {p0} povie, čo sa bude hrať, lebo sa {p1} zvyčajne ochotne pridá. Tá ľahkosť je skutočná: nikto sa nehádá a hra sa málokedy zasekne. Znamená to ale aj to, že vyberá jeden hlas, a hra vybraná zakaždým rovnakým spôsobom môže vyzerať ako súlad, kým druhý hlas ostáva nevyužitý.\n\nNevyužitý hlas môže začať vyzerať ako ten, ktorý nemá čo povedať. {p0} si tak môže nacvičovať vedenie a málo sa učiť zastaviť sa a opýtať, {p1} zase pridávanie sa a málo sa učiť povedať, čo chce. Keď {p1} raz povie to zriedkavé „nie“, váži to viac, než by naznačovala hlasitosť.',
        },
        aside: {
            en: 'Play can get going fast, since {p0} tends to propose and {p1} to follow. The ease can look like harmony while one voice goes unused.',
            sk: '{p0} zvyčajne navrhuje a {p1} nasleduje, takže hra môže rýchlo nabrať obrátky. Ľahkosť môže vyzerať ako súlad, kým jeden hlas ostáva nevyužitý.',
        },
        step: { en: 'Make choosing a turn: whichever child did not pick the previous game picks the next, and the chooser asks the other for a second idea.', sk: 'Z výberu urobte striedanie: dieťa, ktoré nevyberalo predchádzajúcu hru, vyberie ďalšiu, a to, ktoré vyberá, sa opýta druhého na druhý nápad.' },
        question: { en: 'When did the quieter child last pick, and how did the other respond?', sk: 'Kedy naposledy vyberalo tichšie dieťa a ako na to druhé zareagovalo?' },
    },
    /* ------------------------------------------------------------ abstraction ---- */
    'practical-and-conceptual/shared:practical': {
        title: { en: 'Talk that happens over a task', sk: 'Rozhovor, ktorý vznikne pri práci' },
        passage: {
            en: 'Things get said over a task when {both} both lean toward doing: the bike being mended, the meal being cooked, the shelf going up. A hard subject can come up sideways while the hands are busy, and the work done together is itself a way of being close.\n\nWithout a task the conversation can run short. A talk with nothing to fix or make in it may seem pointless to both, so questions about feelings, meaning or what comes next find less room, and the child gets little practice putting the abstract into words. The task is the door to the conversation, and a question that does not fit through it waits.',
            sk: 'Pri práci sa veci povedia, keď {both} majú bližšie k robeniu: opravuje sa bicykel, varí sa jedlo, montuje sa polica. Ťažká téma môže vyplávať nenápadne, kým majú ruky prácu, a spoločná práca je sama osebe spôsob, ako byť si blízko.\n\nBez úlohy môže byť rozhovor krátky. Rozhovor, v ktorom nie je čo opraviť ani vyrobiť, môže dvojici pripadať zbytočný, takže otázky o pocitoch, o zmysle alebo o tom, čo príde, majú menej miesta a dieťa si málo nacvičuje, ako abstraktné veci vyjadriť slovami. Úloha je dvere do rozhovoru a otázka, ktorá cez ne neprejde, počká.',
        },
        aside: {
            en: 'Cooking, mending or building side by side can be how closeness comes when {both} both lean toward doing. A hard subject can surface while the hands are busy, and wait when there is nothing to do.',
            sk: 'Varenie, opravovanie či stavanie vedľa seba môže byť cestou k blízkosti, keď {both} majú bližšie k robeniu. Ťažká téma sa môže vynoriť, kým majú ruky prácu, a počkať, keď niet čo robiť.',
        },
        step: { en: 'Keep a regular job to do together, and let one question that matters be asked in the middle of it rather than saved for a sit-down.', sk: 'Majte pravidelnú spoločnú prácu a nechajte jednu dôležitú otázku zaznieť priamo pri robote, namiesto toho, aby sa šetrila na rozhovor pri stole.' },
        question: { en: 'What gets said while the two are busy with something, and what has gone unsaid because no task made room?', sk: 'Čo sa povie, kým dvojica niečo robí, a čo ostalo nepovedané, lebo sa nenašla práca, pri ktorej by to zaznelo?' },
    },
    'practical-and-conceptual/shared:conceptual': {
        title: { en: 'Ideas with nobody watching the clock', sk: 'Nápady, pri ktorých nikto nesleduje hodiny' },
        passage: {
            en: 'Once {both} both start on an idea, the evening can belong to it: a story, a theory, a world invented as it goes. A single question at the table can carry the conversation a long way, and the child has an adult who takes ideas seriously.\n\nThe practical side has no natural keeper. The form, the sports kit, the time the bus leaves can slip out of mind for both at once, and when both are away in the same direction no one is left to notice what is due. Whoever mentions the clock then sounds like the end of the conversation and not a part of it.',
            sk: 'Len čo sa {both} do nejakého nápadu pustia, môže sa ten nápad roztiahnuť na celý večer: príbeh, teória, svet vymýšľaný za pochodu. Jedna otázka pri stole môže viesť rozhovor ďaleko a dieťa má vedľa seba dospelého človeka, ktorý berie nápady vážne.\n\nPraktická stránka nemá prirodzeného strážcu. Tlačivo, športové veci, čas odchodu autobusu môžu vypadnúť z hlavy dvom naraz, a keď sú myšlienkami preč tým istým smerom, nikto si nevšimne, čo treba urobiť. Kto potom pripomenie čas, znie, akoby rozhovor ukončoval, a nie akoby doň patril.',
        },
        aside: {
            en: 'The practical side can go unattended when {both} both drift into the same idea. The form, the kit and the departure time can slip from both minds at once, and a reminder can land like an interruption.',
            sk: 'Praktická stránka môže ostať bez dozoru, keď sa {both} zahĺbia do toho istého nápadu. Tlačivo, veci na šport a čas odchodu môžu vypadnúť z dvoch hláv naraz a pripomenutie môže dopadnúť ako vyrušenie.',
        },
        step: { en: 'Give the practical side an owner and a place, such as a list by the door, so that it does not depend on either person remembering in the middle of an idea.', sk: 'Dajte praktickej stránke gazdu a miesto, napríklad zoznam pri dverách, aby sa nespoliehala na to, že si niekto spomenie uprostred nápadu.' },
        question: { en: 'Which practical task most often slips for both, and what visible reminder could carry it instead of memory?', sk: 'Ktorá praktická vec dvojici vypadáva z pamäti najčastejšie a aká viditeľná pripomienka by mohla nahradiť pamäť?' },
    },
    'practical-and-conceptual/opposed:practical': {
        title: { en: 'The list and the idea', sk: 'Zoznam a nápad' },
        passage: {
            en: 'The bag, the bus, the time: {first} tends to hold the list, while {second} may be somewhere inside an idea. A reminder can arrive for the child as an interruption, and a drifting child can look to the adult like someone who is not listening.\n\nThe pairing has real use. The child can get help turning ideas into things that can be made, and the adult can be drawn into a wider world of questions. The same reminder can sound like a break in the thought or a step within it, depending on whether the idea was heard first.',
            sk: 'Taška, autobus, čas: {first} zvyčajne drží zoznam, kým {second} môže byť kdesi v nápade. Pre dieťa môže byť pripomienka vyrušením a dieťa, ktoré sa unáša, môže dospelému človekovi pripadať ako niekto, kto nepočúva.\n\nDvojica si vie naozaj pomôcť. Dieťa môže dostať pomoc pri premieňaní nápadov na veci, ktoré sa dajú vyrobiť, a dospelého človeka to môže vtiahnuť do širšieho sveta otázok. Tá istá pripomienka môže znieť ako prerušenie myšlienky, alebo ako ďalší krok tej istej myšlienky, podľa toho, či sa nápad najprv vypočul.',
        },
        aside: {
            en: '{first} may keep to the task while {second} tends to drift into ideas. Reminders can feel like interruptions to the child, and daydreams can look like dawdling to the adult.',
            sk: 'Kým sa {second} zvykne unášať do nápadov, {first} sa môže držať úlohy. Pripomienky môžu dieťaťu pripadať ako vyrušenie a snenie dospelému človekovi ako zdržiavanie.',
        },
        step: { en: 'Give the idea a moment of real interest first, then ask for the next practical step in the same breath.', sk: 'Najprv venujte nápadu chvíľu skutočného záujmu a hneď potom požiadajte o ďalší praktický krok.' },
        question: { en: 'What is the child thinking about in the moments before a reminder, and how could the adult show that it has been heard?', sk: 'Na čo dieťa myslí v chvíľach pred pripomienkou a ako by mohol dospelý človek ukázať, že to započul?' },
    },
    'practical-and-conceptual/opposed:conceptual': {
        title: { en: 'Explaining to a child who is already doing', sk: 'Vysvetľovať dieťaťu, ktoré už robí' },
        passage: {
            en: '{first} tends to understand through the explanation, {second} through the doing. A long reason can lose a child who has already reached for the tool, and the fidgeting can look to the adult like lack of interest.\n\nThe adult’s why is not wasted; it is early. The child can keep the household’s plans anchored in what can really be done, and the adult can add the reason to whatever the child builds, once there is something in the child’s hands for it to explain.',
            sk: '{first} zvyčajne pochopí z vysvetlenia, {second} z robenia. Dlhé zdôvodňovanie môže dieťa, ktoré už siahlo po náradí, stratiť, a vrtenie sa môže dospelému človekovi pripadať ako nezáujem.\n\n„Prečo“ dospelého človeka nie je zbytočné, len prichádza skoro. Dieťa môže udržiavať plány domácnosti pri zemi, pri tom, čo sa naozaj dá urobiť, a dospelý človek môže k tomu, čo dieťa postaví, dodať dôvod, len čo bude mať v rukách niečo, čo ten dôvod vysvetlí.',
        },
        aside: {
            en: '{first} may explain in ideas while {second} tends to learn with the hands. A long talk can lose the child, and the child’s impatience can look to the adult like lack of interest.',
            sk: '{first} môže vysvetľovať pojmami, kým sa {second} zvykne učiť rukami. Dlhý výklad môže dieťa stratiť a netrpezlivosť dieťaťa môže dospelému človekovi pripadať ako nezáujem.',
        },
        step: { en: 'Turn the next explanation into something to try or build, and keep the big talk for after the doing.', sk: 'Najbližšie vysvetlenie premeňte na niečo, čo sa dá vyskúšať alebo postaviť, a veľký rozhovor si nechajte na neskôr, keď bude robenie za vami.' },
        question: { en: 'What has the child learned recently by doing that no explanation would have taught as well?', sk: 'Čo sa dieťa nedávno naučilo robením, čo by žiadne vysvetlenie nenaučilo rovnako dobre?' },
    },
    'practical-and-conceptual/siblings:shared:practical': {
        title: { en: 'Repair by getting back to work', sk: 'Zmierenie návratom k práci' },
        passage: {
            en: 'A row between two children who both prefer doing to discussing can end the way it began, without a word about it: one picks up the tool again and the other holds the other end. When {both} both lean toward the practical, that is a real kind of repair.\n\nIt also leaves unsaid whatever the row was about, until the next job brings it back. Shared building, cooking or fixing is a strong bond, and what it does not carry is the words for why something hurt. Two who build well together can still lack a way to say what happened.',
            sk: 'Hádka medzi dvoma deťmi, ktoré radšej robia, než rozprávajú, môže skončiť tak, ako sa začala, bez jediného slova o veci: jedno znova zdvihne náradie a druhé drží druhý koniec. Keď {both} majú bližšie k praktickému, je to skutočný spôsob zmierenia.\n\nZároveň to nechá nevypovedané, o čo v hádke šlo, kým to s ďalšou prácou znova nevypláva. Spoločné stavanie, varenie alebo opravovanie je silné puto a čo nenesie, sú slová o tom, prečo niečo zabolelo. Aj deti, ktoré spolu dobre stavajú, môžu stále nemať spôsob, ako povedať, čo sa stalo.',
        },
        aside: {
            en: 'A row can be mended by getting back to the job when {both} both prefer doing to talking. It works as repair, and it can leave the cause of the row unsaid until the next job brings it back.',
            sk: 'Hádka sa dá urovnať návratom k práci, keď {both} radšej robia, než rozprávajú. Funguje to ako zmierenie, no príčina hádky môže ostať nevyslovená, kým sa s ďalšou prácou nevráti.',
        },
        step: { en: 'Let a shared job be the place where a short word about the row is allowed, one sentence each, and then the work goes on.', sk: 'Nech je spoločná práca miestom, kde sa o hádke dá povedať krátke slovo, každé dieťa jednu vetu, a potom sa v práci pokračuje.' },
        question: { en: 'What do the two work out between them with their hands that they would not say in words?', sk: 'Čo si dvojica medzi sebou vyrieši rukami, čo by nepovedala slovami?' },
    },
    'practical-and-conceptual/siblings:shared:conceptual': {
        title: { en: 'An invented world with a closed door', sk: 'Vymyslený svet so zatvorenými dverami' },
        passage: {
            en: 'The game that two imaginative children invent can become a place of its own, with rules, names and jokes that only they hold. When {both} both live among ideas, that shared place is a bond in itself, and the world keeps growing as each adds to it.\n\nIt can also be a door that shuts. A friend or a third child arrives to find a story already in progress. The argument between the two, when there is one, tends to be about whose version of the world is true, a quarrel in which each has a good case. The same invention that holds the two together can leave a visitor, or a plain job like tidying the room, outside it.',
            sk: 'Dve deti s bohatou fantáziou vymyslia hru, ktorá sa môže stať vlastným miestom s pravidlami, menami a vtipmi, ktoré poznajú len tie dve. Keď {both} žijú medzi nápadmi, toto spoločné miesto je samo osebe puto a svet rastie s každým nápadom, ktorý pribudne.\n\nMôže však byť aj dverami, ktoré sa zatvoria. Kamarát alebo tretie dieťa príde na príbeh, ktorý už beží. Ak sa dvojica pohádá, býva to o tom, ktorá verzia sveta je pravdivá, a v takom spore má každé dobrý argument. Tá istá hra, ktorá drží dvojicu pokope, môže nechať vonku návštevu alebo obyčajnú prácu, ako je upratovanie izby.',
        },
        aside: {
            en: 'A shared invented world can be a bond and a boundary at once when {both} both live among ideas. Its private names and rules hold the two together, and can leave a visitor, or a plain job like tidying up, outside it.',
            sk: 'Spoločný vymyslený svet môže byť putom aj hranicou zároveň, keď {both} žijú medzi nápadmi. Súkromné mená a pravidlá toho sveta držia dvojicu pokope a môžu nechať vonku návštevu, ale aj obyčajnú prácu, napríklad upratovanie.',
        },
        step: { en: 'Ask the two to teach a newcomer one rule of the world, so that the world has a way in.', sk: 'Požiadajte dvojicu, aby návštevu naučila jedno pravidlo svojho sveta, a ten svet tak dostane vchod.' },
        question: { en: 'What does the shared world give each child that nothing else does, and who is outside it at the moment?', sk: 'Čo dáva spoločný svet každému dieťaťu, čo nič iné nedá, a kto je teraz mimo?' },
    },
    'practical-and-conceptual/siblings:opposed': {
        title: { en: 'The description and the building', sk: 'Opis a stavba' },
        passage: {
            en: '{p1} can still be describing the game when {p0} has started building it. Each tends to be quicker at one half of the same project. {p0} can hear the description as delay, and {p1} can read the building as the story being hurried into shape and the first brick as a cut to the idea.\n\nTogether they hold the whole of a project, the idea and the way to make it. Something neither would have reached alone can come out of that, once each half counts as a contribution and not as the other’s delay.',
            sk: '{p1} môže ešte opisovať hru, keď {p0} už začína stavať. Každé býva rýchlejšie v jednej polovici toho istého projektu. {p0} môže brať opis ako zdržanie a {p1} stavanie ako unáhlené vtláčanie príbehu do tvaru a prvú tehlu ako zásah do nápadu.\n\nSpolu držia celý projekt: nápad aj cestu, ako sa dá vyrobiť. Môže z toho vzísť niečo, čo by sa žiadnemu z nich osamote nepodarilo, len čo sa každá polovica berie ako príspevok, a nie ako zdržanie druhého.',
        },
        aside: {
            en: '{p1} may dream up the game while {p0} tends to make it playable. Each can take the other’s half for delay, when the two halves are what a finished game is made of.',
            sk: '{p1} môže vymýšľať hru, kým sa {p0} zvykne starať o to, aby sa dala hrať. Každé môže polovicu druhého brať za zdržanie, hoci z týchto dvoch polovíc sa skladá hotová hra.',
        },
        step: { en: 'Give the two a project with two named parts, the idea and the making, and let each own one and swap next time.', sk: 'Dajte dvojici projekt s dvoma pomenovanými časťami, nápadom a výrobou, a nech si každé jednu vezme a nabudúce sa vymenia.' },
        question: { en: 'Which part of a shared project does each child most want to own, and does the other know?', sk: 'Ktorú časť spoločného projektu by chcelo mať každé dieťa na starosti a vie o tom druhé?' },
    },
};
export default PARENTING_B1;
