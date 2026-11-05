/**
 * PARENTING. The adult holds the greater responsibility for adapting; nothing here labels a child or predicts one, and what is said of a child is a tendency the adult can meet. The age guide carries what is specific to an age. Part a2 (inner focus, reasoning, autonomy, structure, risk: one-sided forms).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 */
const PARENTING_A2 = {
    /* ------------------------------------------------------------ inner focus -- */
    'processing-pace/oneSided:introspective:first': {
        title: { en: 'When the adult’s quiet has to explain itself', sk: 'Ticho dospelého človeka, ktoré treba vysvetliť' },
        passage: {
            en: 'After a sharp moment {first} may go quiet to settle, while {second} has no strong pull toward waiting or talking. So the household’s way back to calm can run through the adult’s silence rather than a negotiation. That can spare everyone the words that come too early, and a child who can wait has room to wait.\n\nThe silence is also the weak point, because a quiet adult sends a message that someone has to interpret. A clipped answer and a closed face after a dinner-table row can be read as displeasure, and a child who can take either style may have no way to tell settling from distance. The return is then the adult’s to make: {first} is the only one who knows when the settling is done.',
            sk: 'Po ostrej chvíli môže {first} stíchnuť a v tichu sa upokojiť, kým {second} nemá výrazný sklon ani k čakaniu, ani k rozhovoru, a tak cesta domácnosti späť k pokoju môže viesť cez ticho dospelého človeka, nie cez vyjednávanie. Všetkým to môže ušetriť slová, ktoré by zazneli priskoro, a dieťa, ktoré vie čakať, má čas počkať.\n\nTicho je však zároveň slabé miesto, lebo mlčiaci dospelý človek niečo oznamuje a niekto to musí vyložiť. Stručná odpoveď a zatvorená tvár po hádke pri večeri sa dajú vziať ako nevôľa a dieťa, ktoré zvládne oba spôsoby, nemusí mať ako rozoznať, či sa dospelý človek upokojuje, alebo sa odťahuje. Návrat je potom na dospelom človeku: len {first} vie, kedy je upokojovanie hotové.',
        },
        aside: {
            en: 'After a sharp moment {first} may go quiet to settle, and {second} has no strong pull either way, so the adult’s silence can set the tone of the minutes after. That silence can be read as settling or as displeasure, and only the adult knows which.',
            sk: 'Po ostrej chvíli môže {first} stíchnuť a upokojiť sa, {second} nemá výrazný sklon ani jedným smerom, a tak ticho dospelého človeka môže udať tón nasledujúcich minút. Dá sa vziať ako upokojovanie aj ako nevôľa a ktoré z toho to je, vie len dospelý človek.',
        },
        step: { en: 'Give the quiet a short spoken label and a promised return, such as “I’m settling, I’ll be back”, so the child is not left to interpret it.', sk: 'Pomenujte ticho krátkou vetou a sľúbte, že sa vrátite, napríklad „upokojujem sa, o chvíľu som späť“, aby dieťa nemuselo hádať, čo ticho znamená.' },
        question: { en: 'What does the child have to go on, after a sharp moment, to know that the quiet is settling and not displeasure?', sk: 'Podľa čoho dieťa po ostrej chvíli pozná, že ticho dospelého človeka je upokojovanie, a nie nevôľa?' },
    },
    'processing-pace/oneSided:introspective:second': {
        title: { en: 'A child settling behind a closed door', sk: 'Dieťa, ktoré sa upokojuje za zatvorenými dverami' },
        passage: {
            en: '{second} tends to settle a feeling inwardly before speaking, and {first} can leave a silence alone or fill it, so what happens in the minutes after an upset is the adult’s choice. A child who settles inwardly can be given exactly the time needed, and the talk that follows tends to be clearer for it.\n\nThe adult’s range is also the temptation. Whichever response is nearest, a question at the bedroom door, a hand on the shoulder, a bright “what happened?”, asks a child who is still sorting things out to speak first. That is where a stalemate can start: the question meets a closed door, the closed door sounds like refusal, and the second question follows. Because {first} can do either, staying near and saying nothing is a decision, not a default.',
            sk: '{second} sa zvyčajne najprv v sebe upokojí a až potom prehovorí, {first} vie ticho nechať tak aj vyplniť, a tak je na dospelom človeku, čo sa v minútach po rozrušení stane. Dieťaťu, ktoré sa upokojuje v sebe, možno dať presne toľko času, koľko potrebuje, a rozhovor potom býva jasnejší.\n\nTo, že dospelý človek vie robiť oboje, je zároveň pokušenie. Každá najbližšia reakcia, otázka pri dverách izby, ruka na pleci, veselé „čo sa stalo?“, žiada od dieťaťa, ktoré si veci ešte len skladá, aby prehovorilo prvé. Tu sa to môže zaseknúť: otázka narazí na zatvorené dvere, zatvorené dvere pôsobia ako odmietnutie a príde ďalšia otázka. Keďže {first} zvládne oba spôsoby, zostať nablízku a mlčať je rozhodnutie, nie samozrejmosť.',
        },
        aside: {
            en: 'Before saying a feeling, {second} tends to settle it, and {first} can wait or ask, so the adult decides what the minutes after an upset hold. The nearest response, a question, is the one that asks the child to speak first.',
            sk: '{second} sa pred rozhovorom zvyčajne najprv v sebe upokojí, {first} vie počkať aj sa opýtať, takže o tom, čo prinesú minúty po rozrušení, rozhoduje dospelý človek. Najbližšia reakcia, otázka, je práve tá, ktorá od dieťaťa žiada, aby hovorilo prvé.',
        },
        step: { en: 'Agree in advance that after an upset the default is to stay near without a question, and that asking can wait until the child turns back.', sk: 'Dohodnite sa vopred, že po rozrušení zostanete najprv nablízku bez otázky a s otázkou počkáte, kým dieťa samo neurobí prvý krok.' },
        question: { en: 'What does the child do, once an upset has settled, that shows the door is open again?', sk: 'Čo dieťa po upokojení urobí, aby dalo najavo, že dvere sú zasa otvorené?' },
    },
    'processing-pace/oneSided:outwardly-engaged:first': {
        title: { en: 'A pace of talk set by the adult', sk: 'Tempo rozhovoru udáva dospelý človek' },
        passage: {
            en: '{first} is apt to work through an upset by saying it, quickly and soon, and {second} can keep that pace or settle more slowly. Talking things out can then become the house style by default. Little stays unsaid for long, and the child can hear an adult put a feeling into words.\n\nThe cost is easy to miss because the child can follow. An adult in full flow can fit three questions and a solution into the space where a child would take a breath, and keeping up can be taken for agreement. Whether the child’s own version gets told then depends on how long the adult leaves a gap.',
            sk: '{first} sa s rozrušením často vyrovnáva nahlas, rýchlo a hneď, a {second} vie držať to tempo alebo sa upokojovať pomalšie, takže rozprávanie sa môže samo od seba stať štýlom domácnosti. Máločo zostane dlho nevyslovené a dieťa môže počuť, ako dospelý človek dáva pocit do slov.\n\nCena sa ľahko prehliadne, lebo dieťa stíha. Dospelý v plnom prúde môže tam, kde by sa dieťa len nadýchlo, stihnúť tri otázky aj riešenie, a to, že dieťa stíha, sa dá pokladať za súhlas. Či potom zaznie aj verzia dieťaťa, závisí od toho, ako dlho dospelý človek nechá pauzu.',
        },
        aside: {
            en: '{first} may talk an upset out quickly, and {second} can match the pace or settle more slowly, so the speed of the conversation is the adult’s. A child who keeps up has not necessarily finished.',
            sk: '{first} môže rozrušenie rozobrať rýchlo a nahlas a {second} vie držať krok alebo sa upokojovať pomalšie, takže rýchlosť rozhovoru udáva dospelý človek. Dieťa, ktoré stíha, ešte nemusí mať všetko povedané.',
        },
        step: { en: 'After a hard moment, ask one question and then wait out a pause that is slightly longer than is comfortable before adding anything.', sk: 'Po ťažkej chvíli položte jednu otázku a potom vydržte pauzu, ktorá je o niečo dlhšia, než je príjemné, a až potom niečo pridajte.' },
        question: { en: 'When the adult has said what needs saying, what tells the child that the floor is open?', sk: 'Keď dospelý človek dohovorí, podľa čoho dieťa pozná, že slovo je voľné?' },
    },
    'processing-pace/oneSided:outwardly-engaged:second': {
        title: { en: 'An upset that needs an ear while hot', sk: 'Rozrušenie, ktoré treba vypočuť, kým je čerstvé' },
        passage: {
            en: 'Whether the telling finds an ear can rest with the adult: {second} is likely to work an upset out loud and soon, and {first} can listen at once or hold off. When the listening comes, the storm tends to pass in the telling; when the adult’s answer is “not now”, the same story can come back louder.\n\nThere is a quieter trap in being helpful. Because {first} can go either way, a torrent is easily answered with a fix, and to a child who is mid-sentence a fix can sound like “enough”. A solution offered first is a good answer to a question the child has not finished asking.',
            sk: 'Či rozprávanie nájde poslucháča, môže závisieť od dospelého človeka: {second} asi potrebuje rozrušenie vyrozprávať nahlas a hneď, {first} vie počúvať okamžite, ale aj odložiť. Keď rozprávanie poslucháča nájde, búrka zvyčajne pominie už počas rozprávania; keď dospelý človek odpovie „teraz nie“, ten istý príbeh sa môže vrátiť hlasnejší.\n\nOchota pomáhať skrýva tichšiu pascu. Keďže {first} zvládne oba spôsoby, na príval slov sa ľahko odpovie riešením a dieťa uprostred vety môže riešenie pochopiť ako „dosť“. Riešenie podané ako prvé je dobrá odpoveď na otázku, ktorú dieťa ešte nedopovedalo.',
        },
        aside: {
            en: 'While an upset is still hot, {second} may need it heard, and {first} can listen now or later, so the adult’s timing can matter more than the adult’s advice. A fix offered first can sound like the end of the telling.',
            sk: 'Kým je rozrušenie ešte čerstvé, {second} môže potrebovať poslucháča a {first} vie počúvať hneď aj neskôr, takže na tom, kedy dospelý človek počúva, môže záležať viac než na rade dospelého človeka. Riešenie podané ako prvé môže pôsobiť ako koniec rozprávania.',
        },
        step: { en: 'Keep any solution back until the telling has run out, and let the child ask for it.', sk: 'Riešenie si nechajte, kým rozprávanie neutíchne, a počkajte, či sa dieťa samo nespýta, čo s tým.' },
        question: { en: 'What tells the adult that the telling has finished, and not merely paused?', sk: 'Podľa čoho dospelý človek pozná, že rozprávanie skončilo, a nie že sa len odmlčalo?' },
    },
    'processing-pace/siblings:oneSided:introspective': {
        title: { en: 'After the squabble, a quiet', sk: 'Po hádke príde ticho' },
        passage: {
            en: 'After a squabble {lean} tends to go quiet to settle, and {mid} can wait or talk, so how the two quarrel is shaped mostly by the one who goes quiet. The pause can keep a squabble from turning into a chase, and each gets room to cool.\n\nThe pause also leaves a question in the room: is it over, or only stopped? A sibling who can do either may fill the gap with a joke, a remark or a nudge, and for the one who is still settling that can land as the squabble restarting. How a squabble ends between them can then depend less on who was right than on who speaks first after the quiet.',
            sk: 'Po hádke sa {lean} zvyčajne stiahne do ticha a upokojuje sa, {mid} vie počkať aj rozprávať, takže to, ako sa dvojica háda, udáva väčšinou ten, kto stíchne. Pauza môže zabrániť, aby sa hádka zmenila na naháňačku, a každý dostane čas vychladnúť.\n\nV miestnosti však zostane otázka: skončilo to, alebo sa to len prerušilo? Súrodenec, ktorý zvládne oba spôsoby, môže medzeru zaplniť vtipom, poznámkou či štuchnutím a pre toho, kto sa ešte upokojuje, to môže vyznieť ako nový začiatok hádky. To, ako sa hádka skončí, potom môže závisieť menej od toho, kto mal pravdu, než od toho, kto prehovorí prvý po tichu.',
        },
        aside: {
            en: 'After a squabble {lean} tends to go quiet, and {mid} can wait or talk, so the pause can shape how a quarrel between the two ends. A first word spoken into the pause can restart what the pause was holding.',
            sk: 'Po hádke {lean} zvyčajne stíchne a {mid} vie počkať aj rozprávať, takže pauza môže ovplyvniť, ako sa spor dvojice skončí. Prvé slovo vyslovené do pauzy môže znova rozbehnúť to, čo pauza zadržala.',
        },
        step: { en: 'Let the two agree a sign that means “still settling” and another that means “done”, so nobody has to guess which kind of quiet it is.', sk: 'Nechajte dvojicu dohodnúť sa na znamení pre „ešte sa upokojujem“ a na inom pre „už je to za nami“, aby nikto nemusel hádať, o aké ticho ide.' },
        question: { en: 'What does each of the two do, once a squabble is over, that shows it is really over?', sk: 'Čo robí každý z dvojice po hádke, čím ukáže, že je naozaj vybavená?' },
    },
    'processing-pace/siblings:oneSided:outwardly-engaged': {
        title: { en: 'The squabble said out loud, at once', sk: 'Hádka hneď a nahlas' },
        passage: {
            en: 'When the two squabble, {lean} may want it said out loud straight away, and {mid} can join in or hold back, so quarrels between them tend to be loud, quick and over. Little is saved up for later.\n\nSpeed has a side effect. The version of events said first and hardest can become the account of what happened, simply because it is out first. When the other telling is slower to arrive, the quarrel can be over before it is heard.',
            sk: 'Keď sa dvojica háda, {lean} môže chcieť všetko vypovedať hneď a nahlas, {mid} sa vie pridať aj ostať bokom, takže spory bývajú hlasné, rýchle a rýchlo vybavené. Máločo sa necháva na neskôr.\n\nRýchlosť má vedľajší účinok. Verzia, ktorá zaznie prvá a najhlasnejšie, sa môže stať tým, čo sa „naozaj stalo“, len preto, že bola vonku skôr. Ak druhé rozprávanie prichádza pomalšie, hádka môže skončiť skôr, než zaznie.',
        },
        aside: {
            en: 'When the two squabble, {lean} may want it said at once, and {mid} can join in or wait, so quarrels between them tend to be quick and loud. The telling that comes first can end up as the account of what happened.',
            sk: 'Keď sa dvojica háda, {lean} môže chcieť všetko povedať hneď a {mid} sa vie pridať alebo počkať, takže spory bývajú rýchle a hlasné. Verzia, ktorá zaznie prvá, sa môže ujať ako to, čo sa naozaj stalo.',
        },
        step: { en: 'After a quick squabble, give the slower telling its turn before the matter is called settled.', sk: 'Po rýchlej hádke najprv vypočujte aj to druhé, pomalšie rozprávanie a až potom vyhláste vec za vybavenú.' },
        question: { en: 'After a quick squabble, whose version tends to go unsaid, and what would it add?', sk: 'Čia verzia po rýchlej hádke zvyčajne zostane nevyslovená a čo by dodala?' },
    },
    /* ------------------------------------------------------------ reasoning -- */
    'reasoning-style/oneSided:analytical:first': {
        title: { en: 'Reasons given, and given at length', sk: 'Dôvody a ich dĺžka' },
        passage: {
            en: '{first} usually wants a rule to come with its reason, and gives one, while {second} can take things by reason or by feel, so explanation can become the currency the household trades in. A rule understood this way can hold without anyone standing guard over it.\n\nThe trouble is length. A reason is a sentence and a case is a lecture, and at the door with one shoe on the case can outlast the time it was meant to save. Because the child can take an explanation or leave it, there may be little signal when the argument has run past its use, so where it stops is the adult’s call alone.',
            sk: '{first} zvyčajne chce pravidlo aj s dôvodom a dôvod aj povie, {second} vie prijať veci rozumom aj citom, takže vysvetľovanie sa môže stať hlavným jazykom domácnosti. Pravidlo pochopené takto môže platiť aj bez dozoru.\n\nHáčik je v dĺžke. Dôvod je jedna veta, no celý výklad je prednáška, a vo dverách s jednou topánkou môže trvať dlhšie než čas, ktorý mal ušetriť. Keďže dieťa vie dôvod prijať, ale aj prepočuť, nemusí dať najavo, že už je toho dosť, a tak o tom, kde vysvetľovanie skončí, rozhoduje len dospelý človek.',
        },
        aside: {
            en: 'Reasons are what {first} tends to reach for, and {second} has no strong pull toward reason or feel, so explaining can become the household’s habit. The risk is length: a child who can take a reason or leave it may give little sign of when it has run on too long.',
            sk: 'Po dôvodoch zvyčajne siaha {first}, {second} nemá výrazný sklon ani k rozumu, ani k citu, a tak sa vysvetľovanie môže stať zvykom domácnosti. Riziko je v dĺžke: dieťa, ktoré dôvod vie prijať aj prepočuť, nemusí nijako dať najavo, že už je toho veľa.',
        },
        step: { en: 'Keep a reason to one sentence, and agree that the longer conversation about it can happen at a time that is not rushed.', sk: 'Dôvod povedzte jednou vetou a dohodnite sa, že dlhšie sa o tom dá porozprávať vtedy, keď sa nikto neponáhľa.' },
        question: { en: 'Which rules at home need a reason spoken aloud, and which are understood well enough to be said in a word?', sk: 'Ktoré pravidlá doma potrebujú dôvod vysloviť nahlas a ktoré sú také jasné, že stačí jedno slovo?' },
    },
    'reasoning-style/oneSided:analytical:second': {
        title: { en: 'The why that arrives only some of the time', sk: 'Prečo, ktoré príde len niekedy' },
        passage: {
            en: '{second} often wants the reason behind a limit, and {first} can give one or simply decide, so whether a rule comes with its why can depend on the adult’s mood and the clock. That is the weak point of being able to do either.\n\nSay at bedtime the answer one evening is a reason and the next a plain “because I said so”: the difference can be read as the rule being open to negotiation. Then the question can come back, longer. A limit that sometimes has a reason and sometimes none can invite the very testing a reason would have settled.',
            sk: '{second} často chce poznať dôvod hranice, {first} vie dôvod povedať, ale aj jednoducho rozhodnúť, takže to, či pravidlo príde s vysvetlením, môže závisieť od nálady dospelého človeka a od času. V tom je slabina toho, že dospelý človek zvládne oba spôsoby.\n\nAk je pri ukladaní do postele jeden večer odpoveďou dôvod a na druhý večer len „lebo to tak je“, rozdiel sa dá pochopiť tak, že sa o pravidle dá vyjednávať. Otázka sa potom môže vrátiť, a dlhšia. Hranica, ktorá má raz dôvod a raz nie, môže pozývať práve k takému skúšaniu, aké by dôvod uzavrel.',
        },
        aside: {
            en: 'The why behind a limit is what {second} often asks for, and {first} can give one or simply decide, so a rule may arrive with its why only some of the time. An answer that was on offer once can seem worth asking for again.',
            sk: '{second} sa často pýta, prečo hranica platí, a {first} vie dôvod dať alebo jednoducho rozhodnúť, takže pravidlo môže prísť s vysvetlením len niekedy. Odpoveď, ktorá raz padla, môže stáť za to, aby sa dieťa pýtalo znova.',
        },
        step: { en: 'Decide which few limits carry a one-sentence reason, and give the same reason each time they come up.', sk: 'Určte niekoľko hraníc, ku ktorým patrí dôvod v jednej vete, a zakaždým, keď prídu na rad, povedzte ten istý dôvod.' },
        question: { en: 'When a reason is not given, what does the child do with the silence?', sk: 'Čo urobí dieťa s tichom, keď sa dôvod nepovie?' },
    },
    'reasoning-style/oneSided:intuitive:first': {
        title: { en: 'Rules carried by tone', sk: 'Pravidlá, ktoré drží tón hlasu' },
        passage: {
            en: '{first} tends to make a request through mood and tone, with little said about why, and {second} can follow a feeling or a reason. A request then travels mostly on how it is said. That is warm and quick, and with a child who can take either it can work well.\n\nThe reason stays implicit, though. “Tidy this up” said in a tone that says it matters can leave a child who could have used a reason with the mood and not the thing. When the mood changes, the rule seems to change with it. A limit carried by tone is only as steady as the tone.',
            sk: '{first} zvyčajne žiada náladou a tónom a o dôvode hovorí málo, {second} vie ísť za pocitom aj za dôvodom, takže žiadosť nesie najmä to, ako sa povie. To je vrúcne a rýchle a s dieťaťom, ktoré zvládne oba spôsoby, to môže dobre fungovať.\n\nDôvod však zostáva nevyslovený. „Upracuj to“ povedané tónom, z ktorého je cítiť, že na tom záleží, môže nechať dieťa, ktoré by dôvod vedelo využiť, s náladou namiesto veci. Keď sa nálada zmení, vyzerá to, že sa mení aj pravidlo. Pravidlo, ktoré sa opiera len o tón, je také stále ako samotný tón.',
        },
        aside: {
            en: '{first} may set limits through mood and tone, and {second} can follow a feeling or a reason, so how a request sounds carries most of its weight. A rule that rides on tone is only as steady as the tone.',
            sk: 'Hranice môže {first} určovať náladou a tónom a {second} vie ísť za pocitom aj za dôvodom, takže väčšinu váhy žiadosti nesie to, ako znie. Pravidlo opreté len o tón je také stále ako tón.',
        },
        step: { en: 'Take one rule that has been carried by tone and say its reason aloud once, in plain words, so that it holds when the mood does not.', sk: 'Vezmite jedno pravidlo, ktoré doteraz držal tón, a raz nahlas, jednoduchými slovami povedzte, prečo platí, aby platilo aj vtedy, keď sa nálada zmení.' },
        question: { en: 'Which rule at home is really held up by the adult’s tone, and not by a reason anyone could say?', sk: 'Ktoré pravidlo doma naozaj drží tón dospelého človeka, a nie dôvod, ktorý by sa dal vysloviť?' },
    },
    'reasoning-style/oneSided:intuitive:second': {
        title: { en: 'When the tone is the message', sk: 'Keď tón povie všetko' },
        passage: {
            en: '{second} may catch the mood of a request before its words, and {first} can speak in reasons or in feeling, so the adult chooses which of the two carries the message. In a hurry a reason can be the quicker thing to give, and a calm sentence said in a clipped voice can be heard as the clipped voice.\n\nA careful explanation after an upset can pass by, while a sharp tone can stay long after the point it carried. What the child keeps is likely to be the tone, so the tone can become the message, whatever the words said.',
            sk: '{second} môže zachytiť náladu žiadosti skôr než slová, {first} vie hovoriť dôvodmi aj citom, takže dospelý človek si vyberá, čo ponesie odkaz. V zhone býva dôvod rýchlejšie po ruke a pokojná veta povedaná odseknutým hlasom sa môže vnímať len ako ten odseknutý hlas.\n\nStarostlivé vysvetlenie po rozrušení môže prejsť bez povšimnutia, kým ostrý tón môže zostať v pamäti dlho po veci, ktorú niesol. Dieťa si skôr zapamätá tón, a tak sa odkazom môže stať tón, nech slová hovoria čokoľvek.',
        },
        aside: {
            en: 'Before the words of a request, {second} may catch its mood, and {first} can speak in feeling or in reasons, so the adult chooses what carries the message. A clipped voice can outlast the careful sentence it came with.',
            sk: 'Náladu žiadosti môže {second} zachytiť skôr než slová a {first} vie hovoriť citom aj dôvodmi, takže dospelý človek si vyberá, čo ponesie odkaz. Odseknutý hlas sa môže pamätať dlhšie než starostlivá veta, s ktorou prišiel.',
        },
        step: { en: 'For anything that matters, use fewer words and show it with a picture, a story or a demonstration, and check the tone before the sentence.', sk: 'Pri všetkom, na čom záleží, použite menej slov, ukážte to obrazom, príbehom alebo názornou ukážkou a najprv si overte tón, až potom vetu.' },
        question: { en: 'What does the child take from the adult’s voice when the words and the tone say different things?', sk: 'Čo si dieťa odnesie z hlasu dospelého človeka, keď slová hovoria jedno a tón niečo iné?' },
    },
    'reasoning-style/siblings:oneSided:analytical': {
        title: { en: 'The rule that wants examining first', sk: 'Pravidlo, ktoré treba najprv rozobrať' },
        passage: {
            en: '{lean} may ask why a rule is the rule: whose turn it is, which seat, what counts. {mid} can take a reason or play on without one. A game can then stop for questions the other would have let go. The examining has a value: a rule worked out together tends to hold longer than one announced.\n\nThe cost is the pause itself. A sibling who could have carried on can take the questions for delay, and the one asking can take the carrying on for a rule invented as it goes. What one calls fairness the other can call stalling.',
            sk: '{lean} sa môže pýtať, prečo pravidlo platí: kto je na rade, ktoré miesto, čo sa počíta. {mid} vie prijať dôvod aj hrať ďalej bez dôvodu, takže hra sa môže zastaviť pri otázkach, ktoré by druhý nechal tak. Rozoberanie má hodnotu: pravidlo, ku ktorému sa dospeje spolu, zvyčajne vydrží dlhšie než pravidlo oznámené.\n\nCena je v samotnej prestávke. Súrodenec, ktorý by vedel pokračovať, môže otázky považovať za brzdenie hry a ten, kto sa pýta, môže hranie ďalej považovať za pravidlo vymyslené za pochodu. Čo jeden nazýva férovosťou, to druhý môže nazvať zdržiavaním.',
        },
        aside: {
            en: 'Play can stop for questions: {lean} may want the reason behind each rule of a game, and {mid} can take a reason or play on. What one sibling calls fairness the other can call stalling.',
            sk: 'Dôvod každého pravidla hry môže chcieť poznať {lean} a {mid} vie prijať dôvod aj hrať ďalej, takže hra sa môže zastavovať pri otázkach. Čo jeden súrodenec volá férovosťou, druhý môže nazvať zdržiavaním.',
        },
        step: { en: 'Agree the rules of a game before it starts, and keep one agreed way to settle a rule that comes up halfway.', sk: 'Pravidlá hry sa dohodnite skôr, než sa začne, a nech je jasné, ako sa vyrieši pravidlo, ktoré vyvstane uprostred hry.' },
        question: { en: 'Which rules of a game are worth a pause, and which can simply be settled by turns?', sk: 'Ktoré pravidlá hry stoja za prestávku a ktoré sa dajú jednoducho rozhodnúť striedaním?' },
    },
    'reasoning-style/siblings:oneSided:intuitive': {
        title: { en: 'The game as it felt and as agreed', sk: 'Hra podľa pocitu a podľa dohody' },
        passage: {
            en: '{lean} often reads the mood of a game before its rules, and {mid} can follow a mood or a rule, so what the two play and how is carried largely by atmosphere. Games can start easily and bend easily, and a story told together can wander somewhere neither planned.\n\nThe slip is a rule that changes with the mood. One may say “that is not what we said” and the other answer “that is how it felt”. The two are then consulting different records of the same game, one of what was said and one of what it was like. Neither is wrong, which is why the exchange can go round and round.',
            sk: '{lean} často vníma náladu hry skôr než pravidlá, {mid} vie ísť za náladou aj za pravidlom, takže to, čo dvojica hrá a ako, nesie najmä atmosféra. Hry sa môžu ľahko začínať aj ohýbať a spoločne vymýšľaný príbeh môže zájsť niekam, kam nemieril nikto z dvojice.\n\nZádrhel nastane, keď sa pravidlo mení podľa nálady. Jeden môže povedať „takto sme sa nedohodli“ a druhý odpovedať „mne to tak prišlo“. Každý potom nazerá do iného záznamu tej istej hry: jeden do toho, čo sa povedalo, druhý do toho, aké to bolo. Nikto sa nemýli, a preto sa to môže točiť dokola.',
        },
        aside: {
            en: 'The feel of a game is what {lean} tends to go by, and {mid} can follow a feeling or a rule, so play bends easily between the two. A dispute can be about two records of one game, what was said and what it felt like.',
            sk: 'Podľa pocitu z hry sa zvyčajne riadi {lean} a {mid} vie ísť za pocitom aj za pravidlom, takže hra sa medzi dvojicou ľahko ohýba. Spor môže byť o dvoch záznamoch tej istej hry, o tom, čo sa povedalo, a o tom, aké to bolo.',
        },
        step: { en: 'Say the one or two rules of a game aloud at the start, and let the rest follow the mood.', sk: 'Na začiatku hry nahlas povedzte jedno či dve pravidlá a zvyšok nechajte na nálade.' },
        question: { en: 'After a game, what does each of the two remember most clearly, the rules or the mood?', sk: 'Čo si každý z dvojice po hre pamätá najjasnejšie, pravidlá, alebo náladu?' },
    },
    /* ------------------------------------------------------------ autonomy -- */
    'closeness-and-room/oneSided:independent:first': {
        title: { en: 'Room offered freely, invitations rare', sk: 'Veľa priestoru, málo pozvaní' },
        passage: {
            en: '{first} may prefer to work things out alone and to give room freely, and {second} has no strong pull toward being alone or alongside, so room can become the household’s default. Nobody need feel crowded, and a child can try things without an audience.\n\nThe price of a generous default is that company has to be proposed. An adult who prefers room may propose it less, and a child who could go either way has little reason to push for more. An afternoon can then pass with each in a different room, a task or a screen in hand. The room is generous; what is missing is the invitation.',
            sk: '{first} možno radšej rieši veci osamote a veľkoryso necháva priestor, {second} nemá výrazný sklon ani k samote, ani k spoločnosti, takže priestor sa môže stať samozrejmosťou domácnosti. Nikto sa nemusí cítiť stiesnene a dieťa môže veci skúšať bez divákov.\n\nVeľkorysá samozrejmosť má však cenu: spoločnosť treba navrhnúť. Dospelý, ktorému priestor vyhovuje, môže spoločnosť navrhovať menej a dieťa, ktoré zvládne oba spôsoby, nemá veľký dôvod pýtať si viac. Popoludnie tak môže prejsť, každý v inej izbe, s úlohou alebo obrazovkou v ruke. Priestoru je dosť, chýba pozvanie.',
        },
        aside: {
            en: '{first} may value room and offer it freely, and {second} has no strong pull either way, so apartness can become the default. Closeness then depends on someone proposing it, and an adult who values room tends to propose it less.',
            sk: 'Vlastný priestor si {first} môže ceniť a veľkoryso nechávať priestor aj druhým, {second} nemá výrazný sklon ani jedným smerom, takže odstup sa môže stať samozrejmosťou. Blízkosť potom závisí od toho, kto spoločnosť navrhne, a dospelý človek, ktorému záleží na priestore, zvyčajne navrhuje spoločnosť menej.',
        },
        step: { en: 'Put one small, regular shared moment on the calendar, so that company is proposed by the plan and not left to whoever thinks of it.', sk: 'Zapíšte do kalendára jednu malú, pravidelnú spoločnú chvíľu, aby spoločnosť navrhoval plán a nezávisela od toho, komu to napadne.' },
        question: { en: 'What is one small thing the two could do side by side that asks very little of either?', sk: 'Čo malé by mohla dvojica robiť popri sebe, aby to od nikoho nežiadalo veľa?' },
    },
    'closeness-and-room/oneSided:independent:second': {
        title: { en: 'Closeness on the child’s terms', sk: 'Blízkosť, akú dieťa chce' },
        passage: {
            en: '{second} seems to like managing alone, and {first} has no strong pull toward company or distance, so how close the two are is set mostly by what {second} invites. A wish for room need not mean less connection, only smaller forms of it: a presence nearby while something is being built, a question that can be left unanswered.\n\nWhat can get in the way is the adult’s readiness. Since stepping in is easy for the adult, a hand can arrive at the shoelace before it was asked for, and a child who wanted to finish alone can take that as doubt. Then the closeness on offer and the closeness wanted can pass each other in the doorway.',
            sk: '{second} zrejme chce veci zvládať samostatne a {first} nemá výrazný sklon ani k spoločnosti, ani k odstupu, takže mieru blízkosti dvojice určuje najmä to, k čomu {second} pozve. Túžba po vlastnom priestore nemusí znamenať menej blízkosti, len drobnejšie podoby blízkosti: niekoho nablízku, kým sa niečo stavia, otázku, ktorá môže zostať bez odpovede.\n\nV ceste môže stáť pohotovosť dospelého človeka. Keďže zasiahnuť je pre dospelého človeka ľahké, ruka sa môže ocitnúť pri šnúrke skôr, než zaznie prosba o pomoc, a dieťaťu, ktoré chce skončiť samo, to môže pripadať ako nedôvera. Ponúkaná a chcená blízkosť sa potom môžu minúť vo dverách.',
        },
        aside: {
            en: '{second} seems to like managing alone, and {first} has no strong pull toward company or distance, so closeness is set mostly by what {second} invites. A hand that arrives before it is asked for can be taken as doubt.',
            sk: 'Veci zrejme chce zvládať samostatne {second} a {first} nemá výrazný sklon ani k spoločnosti, ani k odstupu, takže o miere blízkosti rozhoduje najmä to, k čomu {second} pozve. Ruka, ktorá príde skôr, než zaznie prosba o pomoc, môže pôsobiť ako nedôvera.',
        },
        step: { en: 'Offer connection in a small form that can be declined, such as company while the child works, and let the answer be no without comment.', sk: 'Ponúknite blízkosť v malej podobe, ktorú možno odmietnuť, napríklad spoločnosť, kým dieťa pracuje, a odpoveď „nie“ prijmite bez komentára.' },
        question: { en: 'When does the child already come close without being asked, and what is the adult doing then?', sk: 'Kedy sa dieťa už teraz priblíži samo od seba a čo robí dospelý človek v tej chvíli?' },
    },
    'closeness-and-room/oneSided:collaborative:first': {
        title: { en: 'The chair beside the homework', sk: 'Stolička pri úlohách' },
        passage: {
            en: '{first} often does things more easily with company and invites it, and {second} can join in or work alone, so the two may spend a good deal of time side by side. Cooking, homework or a long drive can become the place where the talk happens, and that is a real gift.\n\nBecause the child can take it either way, the solo version is seldom tested. Company can become the default form of help. The small steps a child could take alone can get skipped without anyone choosing to skip them: the first page of reading, the start of a task, the chair beside already pulled out. Together is easy to give and easy to give too often, since a child who can go either way may offer no cue to stop.',
            sk: '{first} často robí veci ľahšie v spoločnosti a spoločnosť vyhľadáva, {second} sa vie pridať aj pracovať samostatne, takže dvojica môže tráviť veľa času bok po boku. Varenie, úlohy či dlhá cesta autom sa môžu stať chvíľami, keď sa rozpráva najviac, a to je vzácne.\n\nKeďže dieťa zvládne oba spôsoby, samostatná podoba sa skúša málokedy. Spoločnosť sa môže stať zaužívaným spôsobom pomoci. Drobné kroky, ktoré by dieťa zvládlo samo, sa môžu vynechávať, hoci o tom nikto nerozhodol: prvá strana čítania, začiatok úlohy, stolička vedľa, ktorá je už pripravená. Spolu sa dáva ľahko a ľahko sa dáva aj priveľa, lebo dieťa, ktoré zvládne oba spôsoby, nemusí nijako naznačiť, že už stačí.',
        },
        aside: {
            en: '{first} often prefers company for doing things, and {second} can join in or work alone, so company can become the default form of help. Small solo steps can then be skipped without anyone choosing to skip them.',
            sk: '{first} často robí veci radšej v spoločnosti a {second} sa vie pridať alebo pracovať samostatne, takže spoločnosť sa môže stať zaužívaným spôsobom pomoci. Drobné samostatné kroky sa potom môžu vynechať, hoci o tom nikto nerozhodol.',
        },
        step: { en: 'Pick one regular task that the child starts alone, with the adult in the next room and the chair left empty until it is asked for.', sk: 'Vyberte jednu pravidelnú úlohu, ktorú dieťa začne samo: dospelý človek je vo vedľajšej izbe a stolička zostane prázdna, až kým dieťa nepožiada o spoločnosť.' },
        question: { en: 'Which part of a shared task could the child start alone, and what would the adult do in the meantime?', sk: 'Ktorú časť spoločnej úlohy by dieťa mohlo začať samo a čo medzitým urobí dospelý človek?' },
    },
    'closeness-and-room/oneSided:collaborative:second': {
        title: { en: 'Company asked for, and the answers it gets', sk: 'Prosba o spoločnosť a odpovede, ktoré dostane' },
        passage: {
            en: 'For a puzzle, for homework, for falling asleep, {second} tends to want someone alongside, and {first} can sit close or work apart, so whether company is given is the adult’s call each time. A busy adult who can do either has a way out that is easy to use: “in a minute”, “you can manage”, each honest and each reasonable.\n\nWhat can build up is the pattern rather than any one answer. Company is sometimes yes and sometimes “in a minute”, and a request that sometimes works can seem worth repeating louder. The adult’s answers, given one at a time, can become the thing the child has to learn to read.',
            sk: 'Pri skladačke, pri úlohách, pri zaspávaní {second} zvyčajne chce mať niekoho pri sebe, {first} vie sedieť nablízku aj pracovať bokom, takže zakaždým záleží na dospelom človeku, či spoločnosť príde. Zaneprázdnený dospelý človek, ktorý zvládne oba spôsoby, má východisko, po ktorom sa ľahko siahne: „o chvíľu“, „zvládneš to“, každé úprimné a rozumné.\n\nŤažší než jednotlivá odpoveď býva celok. Spoločnosť je raz áno, raz „o chvíľu“, a prosba, ktorá niekedy zaberie, sa môže zdať hodná toho, aby zaznela hlasnejšie. Odpovede dospelého človeka, dávané po jednej, sa nakoniec môžu stať niečím, čo sa dieťa musí naučiť odhadovať.',
        },
        aside: {
            en: 'The adult’s answers can set how often company is asked for, since {second} tends to look for it in what is being done and {first} can join or step away. A request that sometimes gets company can seem worth making again.',
            sk: 'Spoločnosť pri tom, čo robí, zvyčajne hľadá {second} a {first} sa vie pridať aj odstúpiť, takže od odpovedí dospelého človeka môže závisieť, ako často sa prosba opakuje. Prosba, ktorá niekedy spoločnosť dostane, sa môže zdať hodná zopakovania.',
        },
        step: { en: 'Offer company in a form with an end, such as “I’ll sit with you for the first page, then I’ll be at the table”, so that the answer is a yes with a limit.', sk: 'Ponúknite spoločnosť s koncom, napríklad „posedím s tebou pri prvej strane a potom budem pri stole“, aby odpoveď bola áno s jasným koncom.' },
        question: { en: 'When the adult has to say “not now”, what tells the child when company will come?', sk: 'Keď dospelý človek musí povedať „teraz nie“, podľa čoho dieťa vie, kedy spoločnosť príde?' },
    },
    'closeness-and-room/siblings:oneSided:independent': {
        title: { en: 'Playing apart in one room', sk: 'Každý sám v jednej izbe' },
        passage: {
            en: 'One room can hold two separate games without much negotiation: {lean} may want to do things alone, and {mid} has no strong pull toward playing together or apart. Parallel play can work here, side by side but not joined.\n\nWhere it can strain is the invitation. A “no” from the one who prefers to do it alone can be taken for a rebuff, however it was meant. An invitation declined with no word about later has nowhere to go. A “no” that adds “later” can turn the same refusal into a plan.',
            sk: 'V jednej izbe sa môžu bez veľkého dohadovania odohrávať dve oddelené hry: {lean} môže chcieť robiť veci samostatne a {mid} nemá výrazný sklon ani k spoločnej, ani k oddelenej hre. Hra popri sebe tu môže fungovať: vedľa seba, ale nie spolu.\n\nZadrhnúť to môže pri pozvaní. „Nie“ od toho, kto radšej robí veci osamote, sa môže vziať ako odbitie, nech je myslené akokoľvek, a pozvanie odmietnuté bez slova o neskoršom čase nemá kam ísť. „Nie“, ku ktorému pribudne „neskôr“, môže z toho istého odmietnutia urobiť plán.',
        },
        aside: {
            en: 'Sharing a room while each keeps to separate things can come easily: {lean} may want to do things alone, and {mid} has no strong pull either way. A “no” that does not add “later” can sound like a rebuff.',
            sk: 'Samostatne môže chcieť robiť {lean} a {mid} nemá výrazný sklon ani jedným smerom, takže dvojica môže zdieľať izbu a každý sa môže venovať svojmu. „Nie“, ku ktorému nepribudne „neskôr“, môže pôsobiť ako odbitie.',
        },
        step: { en: 'Let a refusal come with a time or a place, such as “after I finish this” or “not today, but tomorrow”, so the invitation is deferred and not lost.', sk: 'Dohodnite sa, že k odmietnutiu patrí čas alebo miesto, napríklad „keď toto dokončím“ alebo „dnes nie, ale zajtra“, aby bolo pozvanie odložené, nie stratené.' },
        question: { en: 'What could the sibling who says no add to the no, so that it is clear the invitation is still open?', sk: 'Čo môže súrodenec, ktorý odmieta, pridať k svojmu „nie“, aby bolo jasné, že pozvanie ešte platí?' },
    },
    'closeness-and-room/siblings:oneSided:collaborative': {
        title: { en: 'A yes that is easy to get', sk: 'Áno, ktoré sa ľahko získa' },
        passage: {
            en: '{lean} is quick to ask for company in whatever is being done, and {mid} can join in or carry on alone, so a game, a chore or a story usually finds a partner. A sibling with no strong pull either way is an easy one to ask.\n\nWhat can wear down is the pattern of asking. A sibling who can say yes tends to be the one who is asked, and invitations can gather on that one while whatever else is under way waits. A yes that is easy to get can start to look like a duty, and the yes can then lose what made it a gift.',
            sk: '{lean} rýchlo požiada o spoločnosť pri všetkom, čo robí, a {mid} sa vie pridať aj pokračovať osamote, takže hra, domáca práca či príbeh zvyčajne nájde partnera. Súrodenca, ktorý nemá výrazný sklon ani jedným smerom, sa dá ľahko poprosiť.\n\nZaťažiť môže spôsob, akým sa žiada. Súrodenec, ktorý vie povedať áno, býva ten, koho sa pýtajú, a pozvania sa môžu hromadiť u jedného súrodenca, kým všetko ostatné, čo je rozbehnuté, čaká. Áno, ktoré sa dá ľahko získať, môže začať pôsobiť ako povinnosť a prestať byť darom.',
        },
        aside: {
            en: '{lean} is quick to ask for company in whatever is being done, and {mid} can join in or carry on alone, so invitations can gather on the one who can say yes. A yes that is easy to get can start to look like a duty.',
            sk: 'O spoločnosť pri všetkom, čo robí, rýchlo požiada {lean} a {mid} sa vie pridať aj pokračovať osamote, takže sa pozvania môžu zhromažďovať u toho, kto vie povedať áno. Áno, ktoré sa dá ľahko získať, môže začať vyzerať ako povinnosť.',
        },
        step: { en: 'Let the sibling who is asked answer sometimes with “yes to this, not to that”, so that the yes can be chosen as well as given.', sk: 'Nechajte súrodenca, ktorého sa pýtajú, občas odpovedať „áno tomuto, tamtomu nie“, aby sa áno dalo aj vybrať, nielen dať.' },
        question: { en: 'When does a yes to a game feel like a choice, and when does it feel like the thing to do?', sk: 'Kedy pôsobí áno hre ako voľba a kedy ako niečo, čo sa jednoducho robí?' },
    },
    /* ------------------------------------------------------------ structure -- */
    'structure-and-flexibility/oneSided:structured:first': {
        title: { en: 'A frame set by the adult', sk: 'Poriadok dňa určuje dospelý človek' },
        passage: {
            en: '{first} tends to keep the day to a pattern, and {second} can follow a routine or do without one, so the household’s frame is the adult’s and may meet little resistance. Mornings, meals and bedtime can run in a known order, and that order frees attention for everything else.\n\nA frame nobody pushes against can grow past what anyone needs: another step in the evening, a one-off turned into a rule, the shoes in their place by the door. A child who bends may give the adult no friction to show when it has become tight. The same pattern can make a late bus or a visitor the adult’s difficulty first, since the plan was the adult’s and the child may have less riding on it.',
            sk: '{first} zvyčajne drží deň v pevnom poriadku a {second} vie ísť podľa rutiny aj bez rutiny, takže poriadok domácnosti patrí dospelému človekovi a môže naraziť len na malý odpor. Rána, jedlá a ukladanie do postele môžu bežať v známom poradí a to poradie uvoľňuje pozornosť na všetko ostatné.\n\nPoriadok, proti ktorému sa nikto nestavia, môže narásť nad mieru, akú ktokoľvek potrebuje: ďalší krok večer, jednorazová vec pretavená na pravidlo, topánky na svojom mieste pri dverách. Dieťa, ktoré sa prispôsobí, sa nemusí postaviť na odpor, takže dospelý človek ľahko nezbadá, že poriadok je už príliš prísny. Ten istý poriadok môže z meškajúceho autobusu alebo z návštevy urobiť najprv starosť dospelého človeka, lebo plán patril dospelému človekovi a dieťaťu na pláne možno toľko nezáleží.',
        },
        aside: {
            en: '{first} is likely to keep the routine, and {second} can follow it or manage without, so the frame is the adult’s by default. A child who bends may give the adult no friction to show when the frame has grown tighter than anyone needs.',
            sk: 'Rutinu pravdepodobne drží {first} a {second} zvládne deň s rutinou aj bez rutiny, takže poriadok od začiatku patrí dospelému človekovi. Dieťa, ktoré sa prispôsobí, sa nemusí postaviť na odpor, a tak dospelý človek nemusí zbadať, že je poriadok prísnejší, než ktokoľvek potrebuje.',
        },
        step: { en: 'Now and then drop one step of the routine on purpose and see whether anyone minds; if nobody does, leave it out.', sk: 'Raz za čas zámerne vynechajte jeden krok rutiny a pozrite sa, či to niekomu vadí; ak nie, nechajte to tak.' },
        question: { en: 'Which part of the routine is there because the child needs it, and which because the adult does?', sk: 'Ktorá časť rutiny slúži dieťaťu a ktorá dospelému človekovi?' },
    },
    'structure-and-flexibility/oneSided:structured:second': {
        title: { en: 'The exception that costs the adult nothing', sk: 'Výnimka, ktorá dospelého človeka nič nestojí' },
        passage: {
            en: '{second} seems to rely on routine and on rules that stay put, and {first} can hold a pattern or improvise, so how steady the day is lies in the adult’s hands. An adult without a strong pull either way can let a plan bend when something better turns up.\n\nThat bending is also cheap. Say a bedtime is moved because the evening is pleasant, or a rule is waived on a tired day. Each costs the adult nothing, and can cost a child who relies on the pattern the very thing it was holding up. An exception granted once can be taken as the new rule, and a waived rule can be harder to hold the next time. What costs the adult nothing may cost the child something.',
            sk: '{second} sa zrejme opiera o rutinu a pravidlá, ktoré sa nehýbu, {first} vie držať poriadok aj improvizovať, takže to, aký predvídateľný je deň, je v rukách dospelého človeka. Dospelý, ktorý nemá výrazný sklon ani jedným smerom, dokáže plán ohnúť, keď sa objaví niečo lepšie.\n\nTo ohýbanie je však aj lacné. Ak sa čas spánku posunie, lebo je príjemný večer, alebo sa v unavený deň odpustí pravidlo, dospelého človeka to nestojí nič. Dieťa, ktoré sa o poriadok opiera, však môže prísť presne o to, čo poriadok držal. Výnimka povolená raz sa môže vziať ako nové pravidlo a pravidlo, z ktorého sa raz zľavilo, sa nabudúce drží ťažšie. Čo dospelého človeka nestojí nič, môže dieťa niečo stáť.',
        },
        aside: {
            en: 'A routine that holds is what {second} tends to lean on, and {first} can hold a pattern or let it go, so how steady the day is lies with the adult. An exception costs the adult little and can cost a child who relies on the pattern a good deal.',
            sk: 'O rutinu, ktorá drží, sa {second} zvyčajne opiera a {first} vie poriadok držať aj pustiť, takže predvídateľnosť dňa je v rukách dospelého človeka. Výnimka dospelého človeka stojí málo, no dieťa, ktoré sa o poriadok opiera, môže zaplatiť veľa.',
        },
        step: { en: 'Announce a change of plan before it happens and name what stays the same, so that the exception comes with a fixed point beside it.', sk: 'Zmenu plánu ohláste vopred a pomenujte, čo zostáva rovnaké, aby mala výnimka vedľa seba pevný bod.' },
        question: { en: 'Which fixed points does the child lean on most, and do they hold when the day gets busy?', sk: 'O ktoré pevné body sa dieťa opiera najviac a držia aj vo rušný deň?' },
    },
    'structure-and-flexibility/oneSided:adaptable:first': {
        title: { en: 'A rhythm kept only in the adult’s head', sk: 'Rytmus uložený len v hlave dospelého človeka' },
        passage: {
            en: '{first} leans toward letting the day take its shape as it goes, and {second} can run on a plan or on the moment. The household’s rhythm is then whatever the day makes of it. Plans bend easily and an ordinary afternoon can turn into an outing.\n\nThe difficulty is that a rhythm kept in one head gives the child nothing outside it to lean on, even a child who can manage without. Dinner can move, bedtime can depend on the evening, and the rules can be the ones the adult remembers when the need arises. With no fixed points the day’s shape tends to be settled by whatever is most pressing, and that is often the clock.',
            sk: '{first} sa prikláňa k tomu, aby sa deň vyvíjal za pochodu, a {second} vie fungovať podľa plánu aj podľa chvíle, takže rytmus domácnosti vzniká z toho, čo deň prinesie. Plány sa ľahko ohýbajú a z obyčajného popoludnia môže byť výlet.\n\nŤažkosť je v tom, že rytmus uložený v jednej hlave nedáva dieťaťu nijakú vonkajšiu oporu, ani vtedy, keď by sa dieťa zaobišlo bez opory. Večera sa môže posúvať, čas spánku môže závisieť od toho, aký je večer, a pravidlá môžu byť také, aké dospelému človekovi napadnú, keď ich treba. Bez pevných bodov tvar dňa zvyčajne určí to, čo práve tlačí najviac, a tým často býva čas.',
        },
        aside: {
            en: '{first} leans toward improvising, and {second} can go with a plan or without one, so the day takes whatever shape it is given. A rhythm kept only in the adult’s head can leave the clock to decide.',
            sk: 'K improvizácii sa prikláňa {first} a {second} vie ísť s plánom aj bez plánu, takže deň dostáva tvar za pochodu. Keď rytmus existuje len v hlave dospelého človeka, môžu rozhodnúť hodiny.',
        },
        step: { en: 'Pick one fixed point in the day that the adult will hold whatever else shifts, and tell the child which one it is.', sk: 'Vyberte jeden pevný bod dňa, ktorý dospelý človek udrží, nech sa posunie čokoľvek iné, a povedzte dieťaťu, ktorý to je.' },
        question: { en: 'What would be hard about keeping that fixed point on the day it matters most?', sk: 'Čo by bolo ťažké na tom udržať tento pevný bod v deň, keď na ňom záleží najviac?' },
    },
    'structure-and-flexibility/oneSided:adaptable:second': {
        title: { en: 'Firm one day, loose the next', sk: 'Jeden deň pevne, druhý voľne' },
        passage: {
            en: '{second} may find a full timetable tight and look for a new way through most days. {first} can hold a routine or let it go. How much structure the home has is then chosen in the moment, not given. Without a strong pull either way, the adult has no fixed default to rest on.\n\nThat can produce a swing: days that run loose, then a hard stand over shoes or homework when the pile gets too high. The child can meet the same rule as a loose one and as a firm one, according to the adult’s reserves. A rule that is sometimes firm and sometimes loose can invite a child inclined to push against routines to find out which kind of day it is.',
            sk: '{second} sa v plnom rozvrhu môže cítiť stiesnene a takmer každý deň hľadať novú cestu von. {first} vie rutinu držať aj pustiť, takže to, koľko pevného poriadku v domácnosti platí, sa volí na mieste a nie je dané. Bez výrazného sklonu ktorýmkoľvek smerom nemá dospelý človek pevné východisko, o ktoré by sa dalo oprieť.\n\nZ toho môže vzniknúť kolísanie: dni plynú voľne a potom dospelý človek zaprie päty pri topánkach alebo úlohách, keď sa toho nahromadí priveľa. Dieťa sa môže stretávať s tým istým pravidlom raz voľným, raz pevným, podľa toho, koľko síl dospelému človekovi ostáva. Pravidlo, ktoré je niekedy pevné a niekedy voľné, môže lákať dieťa, ktoré má sklon búriť sa proti rutine, aby zistilo, aký deň je dnes.',
        },
        aside: {
            en: '{second} may push against a full timetable, and {first} can hold a routine or let it go, so the amount of structure is chosen in the moment. A rule that is sometimes firm and sometimes loose can invite the child to find out which kind of day it is.',
            sk: 'Proti plnému rozvrhu sa {second} môže búriť a {first} vie rutinu držať aj pustiť, takže miera poriadku sa volí na mieste. Pravidlo, ktoré je niekedy pevné a niekedy voľné, môže dieťa lákať zistiť, aký deň je dnes.',
        },
        step: { en: 'Decide the few rules that stay firm on every day, tired ones included, and give the rest as real choices.', sk: 'Určte niekoľko pravidiel, ktoré platia každý deň, aj v unavený, a ostatné ponúknite ako skutočnú voľbu.' },
        question: { en: 'Which rule is firm on one day and loose on another, and what decides which it will be?', sk: 'Ktoré pravidlo je jeden deň pevné a druhý voľné a čo rozhoduje o tom, aké bude?' },
    },
    'structure-and-flexibility/siblings:oneSided:structured': {
        title: { en: 'The usual order, and a small change', sk: 'Zaužívané poradie a malá zmena' },
        passage: {
            en: '{lean} probably prefers things done in the usual order, and {mid} can keep to it or change it, so shared routines, whose turn, which seat, who goes first, can settle quickly. Neither has to argue for the arrangement, because one of them already holds it.\n\nA changed arrangement is where it can catch. A small variation to one, another seat or another order of play, can be a rule broken to the other, and the same change is then two different events. A shared routine can run smoothly until the day somebody improves it.',
            sk: '{lean} pravdepodobne chce, aby sa veci robili v zaužívanom poradí, a {mid} vie poradie držať aj zmeniť, takže spoločné rutiny, kto je na rade, ktoré miesto, kto začína, sa môžu ustáliť rýchlo. Nikto sa nemusí o dohodu hádať, lebo jeden z dvojice už na dohode trvá.\n\nZadrhnúť to môže pri zmene. Malá odchýlka pre jedného, iné miesto alebo iné poradie v hre, môže byť pre druhého porušením pravidla, a tá istá zmena sú potom dve rôzne udalosti. Spoločná rutina môže bežať hladko až do dňa, keď niekto príde s vylepšením.',
        },
        aside: {
            en: '{lean} probably prefers the usual order, and {mid} can keep it or change it, so shared routines can settle quickly. A small change for one can be a broken rule for the other.',
            sk: 'Zaužívané poradie má {lean} pravdepodobne radšej a {mid} vie poradie držať aj zmeniť, takže spoločné rutiny sa môžu ustáliť rýchlo. Malá zmena pre jedného môže byť pre druhého porušeným pravidlom.',
        },
        step: { en: 'Before changing a shared arrangement, such as a seat or an order of play, say so aloud, so that a change is a proposal and not a surprise.', sk: 'Dohodnite sa, že zmena spoločného usporiadania, napríklad miesta alebo poradia v hre, sa najprv povie nahlas, aby bola návrhom, nie prekvapením.' },
        question: { en: 'Which shared routines between the two need to stay the same, and which could change without anyone minding?', sk: 'Ktoré spoločné rutiny dvojice musia zostať rovnaké a ktoré sa dajú zmeniť, bez toho, aby to niekomu vadilo?' },
    },
    'structure-and-flexibility/siblings:oneSided:adaptable': {
        title: { en: 'A game that changes shape as it goes', sk: 'Hra, ktorá mení tvar za pochodu' },
        passage: {
            en: '{lean} is inclined to change the plan as the game goes, and {mid} can keep a plan or drop it. Shared games can then drift into new shapes, and the two are seldom short of ideas. Play can stay light, and an interrupted plan need not be a loss.\n\nThe gap is in what counts as the game. When the plan changes midway, a sibling who could have held it can follow the change simply because it is there, and the original is dropped without a moment when anyone agreed. What was settled at the start has no owner once it has changed.',
            sk: '{lean} často mení plán počas hry a {mid} vie plán držať aj pustiť, takže spoločné hry sa môžu posúvať do nových podôb a dvojici zriedka dôjdu nápady. Hra môže zostať ľahká a prerušený plán nemusí byť stratou.\n\nMedzera je v tom, čo sa vlastne počíta za hru. Keď sa plán uprostred zmení, súrodenec, ktorý by vedel plán udržať, môže zmenu jednoducho nasledovať, lebo je tu, a pôvodný plán sa opustí, bez chvíle, keď by s tým niekto súhlasil. Čo sa dohodlo na začiatku, nemá po zmene majiteľa.',
        },
        aside: {
            en: 'Mid-game, {lean} may change the plan, and {mid} can keep it or drop it, so play drifts into new shapes. What was settled at the start has no owner once the plan has moved.',
            sk: 'Uprostred hry môže {lean} zmeniť plán a {mid} vie plán držať aj pustiť, takže hra sa posúva do nových podôb. Čo sa dohodlo na začiatku, nemá po zmene majiteľa.',
        },
        step: { en: 'At the start of a game, name the one thing that is not to change, and let everything else move.', sk: 'Na začiatku hry pomenujte jednu vec, ktorá sa meniť nemá, a všetko ostatné nechajte voľne meniť.' },
        question: { en: 'When a game changes shape, what did the two agree at the start, and when did it stop being the plan?', sk: 'Keď hra zmení podobu, na čom sa dvojica dohodla na začiatku a kedy to prestalo byť plánom?' },
    },
    /* ------------------------------------------------------------ risk -- */
    'risk-and-caution/oneSided:cautious:first': {
        title: { en: 'A caution the child can hear', sk: 'Opatrnosť, ktorú dieťa počuje' },
        passage: {
            en: '{first} tends to look before leaping, and to say so, and {second} can hang back or go ahead, so the household’s pace with new things is likely to be the adult’s. There may be fewer bumps, and what is tried is tried with attention.\n\nWhat the adult says carries as well as what the child sees. Say a child who could have gone on is at the top of the climbing frame. There are two sources of information, the frame and the adult’s “careful”, and the second is often the louder. What began as the adult’s view of the climb can become the child’s view of climbing.',
            sk: '{first} sa zvyčajne pozrie, než skočí, a povie to nahlas, {second} vie zostať vzadu aj ísť dopredu, takže tempo, akým domácnosť pristupuje k novým veciam, pravdepodobne udáva dospelý človek. Odrenín môže byť menej a čo sa skúša, skúša sa s pozornosťou.\n\nTo, čo dospelý človek povie, môže mať rovnakú váhu ako to, čo dieťa vidí. Ak je dieťa, ktoré by mohlo pokračovať, na vrchu preliezky, má dva zdroje informácií, samotnú preliezku a „opatrne“ od dospelého človeka, a ten druhý býva hlasnejší. Čo začalo ako pohľad dospelého človeka na výstup, sa môže stať pohľadom dieťaťa na lezenie.',
        },
        aside: {
            en: 'Before a leap, {first} tends to look and to say so, and {second} can hang back or go ahead, so the adult’s caution can be the loudest signal at the edge. What began as the adult’s view of the climb can become the child’s view of climbing.',
            sk: 'Pred skokom sa {first} zvyčajne pozrie a povie to nahlas, {second} vie zostať vzadu aj ísť dopredu, takže pri okraji môže byť najhlasnejším signálom opatrnosť dospelého človeka. Čo začalo ako pohľad dospelého človeka na výstup, sa môže stať pohľadom dieťaťa na lezenie.',
        },
        step: { en: 'Say the worry once, in a sentence, and then watch in silence, so that the child has the frame to read and not a running commentary.', sk: 'Obavu povedzte raz, jednou vetou, a potom mlčky sledujte, aby dieťa čítalo samotnú situáciu, nie priebežný komentár.' },
        question: { en: 'Which of the adult’s cautions would the child recognise as the adult’s, and which as simply how things are?', sk: 'Ktoré upozornenia dospelého človeka by dieťa spoznalo ako názor dospelého človeka a ktoré jednoducho ako to, ako veci sú?' },
    },
    'risk-and-caution/oneSided:cautious:second': {
        title: { en: 'Time at the edge', sk: 'Čas na okraji' },
        passage: {
            en: 'Before joining, {second} is likely to watch from the edge, and {first} can walk straight in or wait. The adult then decides whether the edge is a place to stand or one to leave. An adult who can do both has two good moves: wait with the child, or go in first and show it can be done.\n\nA third move is the easiest to reach for: a cheerful “come on, it is fine”, meant as encouragement and able to be heard as the end of the waiting. For a child who watches first, waiting can be the way to a yes, and a wait cut short tends to come back as a no.',
            sk: '{second} sa pravdepodobne najprv díva z okraja a až potom sa pridá, {first} vie vstúpiť rovno aj počkať, takže od dospelého človeka závisí, či je okraj miestom na státie, alebo na odchod. Dospelý, ktorý zvládne oba spôsoby, má dva dobré kroky: počkať s dieťaťom, alebo ísť dnu ako prvý a ukázať, že sa to dá.\n\nTretia možnosť je tá, po ktorej sa siahne najľahšie: veselé „poď, je to v poriadku“, myslené ako povzbudenie, no dá sa počuť aj ako koniec čakania. Pre dieťa, ktoré sa najprv pozerá, môže byť čakanie cestou k áno a skrátené čakanie sa zvyčajne vráti ako nie.',
        },
        aside: {
            en: 'From the edge, {second} may watch before joining, and {first} can go in or wait, so the adult decides whether the edge is a place to stand or to leave. A wait cut short with cheerful encouragement tends to return as a no.',
            sk: 'Z okraja môže {second} najprv pozorovať a {first} vie vstúpiť aj počkať, takže od dospelého človeka závisí, či je okraj miestom na státie, alebo na odchod. Čakanie skrátené veselým povzbudením sa zvyčajne vráti ako nie.',
        },
        step: { en: 'Agree with the child, before going in, what the first small step is and who takes it, so that the watching has an end the child chose.', sk: 'Ešte pred vstupom sa s dieťaťom dohodnite, aký bude prvý malý krok a kto ten krok urobí, aby pozorovanie skončilo tak, ako si to dieťa vybralo.' },
        question: { en: 'What does the child do at the edge that shows the watching is nearly done?', sk: 'Čo robí dieťa na okraji, keď sa pozorovanie chýli ku koncu?' },
    },
    'risk-and-caution/oneSided:risk-oriented:first': {
        title: { en: 'Whose height is the next step', sk: 'Čí je výška ďalšieho kroku' },
        passage: {
            en: '{first} seems to enjoy a challenge and to offer one readily, and {second} can take it or leave it, so adventures tend to happen at the adult’s pitch. The family may get to the hilltop, the cold water, the bus line nobody knows.\n\nThe pitch is where it can slide. “A bit higher” is judged by one body and one nerve. A child who can take a challenge or leave it can make it look comfortable from outside. Nobody in the moment can then say whether the next step is the child’s or the adult’s. Who chooses the height of the next step decides whose adventure it is.',
            sk: '{first} zrejme vyhľadáva výzvy a ochotne ich ponúka, {second} vie výzvu prijať aj nechať, takže dobrodružstvo zvyčajne má takú výšku, akú určí dospelý človek. Rodina sa môže dostať na vrchol kopca, do studenej vody, na autobusovú linku, ktorú nikto nepozná.\n\nPošmyknúť sa to môže práve pri tej výške. „Trochu vyššie“ posudzuje jedno telo a jedna odvaha. Dieťa, ktoré vie výzvu prijať aj nechať, môže spôsobiť, že výzva zvonka vyzerá pohodlne, a tak v danej chvíli nikto nevie povedať, či je ďalší krok dieťaťa, alebo dospelého človeka. Kto určuje výšku ďalšieho kroku, ten rozhoduje, čie je to dobrodružstvo.',
        },
        aside: {
            en: '{first} may enjoy a challenge and offer it readily, and {second} can take it or leave it, so adventures are set at the adult’s pitch. A child without a strong pull either way can make it hard to tell whose the next step is.',
            sk: 'Výzvy môže {first} ochotne ponúkať a {second} vie výzvu prijať aj nechať, takže dobrodružstvá majú výšku, akú určí dospelý človek. Dieťa bez výrazného sklonu ktorýmkoľvek smerom môže sťažiť rozlíšenie, čí je ďalší krok.',
        },
        step: { en: 'Let the child choose the height of the next step some of the time, and say aloud whose choice it was.', sk: 'Nechajte dieťa občas samo vybrať výšku ďalšieho kroku a nahlas povedzte, čia to bola voľba.' },
        question: { en: 'How would the adult know that a challenge has stopped being the child’s own?', sk: 'Podľa čoho by dospelý človek poznal, že výzva už nie je výzvou samotného dieťaťa?' },
    },
    'risk-and-caution/oneSided:risk-oriented:second': {
        title: { en: 'A few lines that can be heard', sk: 'Zopár hraníc, ktoré sa dajú počuť' },
        passage: {
            en: '{second} may climb, try and say yes before the question is finished, and {first} can hold back or join in, so the adult decides where the day’s safety is held. An adult who can do either can be pulled both ways: say no to everything, or join in and stop noticing the risk.\n\nBoth ends wear. A stream of “careful” can become background that goes unheard, and a run of yes can leave the lines unclear when one finally matters. What is likely to reach a child who tries first is not the number of warnings but how few the lines are, so that each one is audible.',
            sk: '{second} možno lezie, skúša a povie áno skôr, než otázka dozneje, {first} vie zostať bokom aj sa pridať, takže od dospelého človeka závisí, kde sa ten deň drží bezpečnosť. Dospelého to môže ťahať na dve strany: povedať nie všetkému, alebo sa pridať a rizika si prestať všímať.\n\nOpotrebúva sa to z oboch strán. Prúd „opatrne“ sa môže zmeniť na pozadie, ktoré nikto nepočuje, a rad áno môže nechať hranice nejasné, keď jedna z nich napokon záleží. K dieťaťu, ktoré skúša ako prvé, sa pravdepodobne nedostane počet varovaní, ale to, že hraníc je málo a každá sa dá počuť.',
        },
        aside: {
            en: '{second} is apt to say yes to a challenge before the question is finished, and {first} can hold back or join in, so the adult can be pulled between constant warning and none. A short list of safety lines is easier to hear than a long one.',
            sk: '{second} zvykne povedať výzve áno skôr, než otázka dozneje, a {first} vie zostať bokom aj sa pridať, takže dospelého človeka to môže ťahať medzi neprestajným varovaním a žiadnym. Krátky zoznam bezpečnostných hraníc sa počuje ľahšie než dlhý.',
        },
        step: { en: 'Agree the safety lines with the child ahead of time, and keep the list short enough to say in one breath.', sk: 'Bezpečnostné hranice si s dieťaťom dohodnite vopred a zoznam nech je taký krátky, aby sa dal povedať na jeden nádych.' },
        question: { en: 'Which safety line could the child name without being reminded?', sk: 'Ktorú bezpečnostnú hranicu by dieťa vedelo pomenovať bez pripomenutia?' },
    },
    'risk-and-caution/siblings:oneSided:cautious': {
        title: { en: 'The edge shared by two', sk: 'Okraj, ktorý zdieľa dvojica' },
        passage: {
            en: 'At something new {lean} may hang back, and {mid} can go ahead or wait, so the two often arrive at a pace that suits the slower start. A sibling without a strong pull either way can fall in with that pace.\n\nThe strain can come the first time {mid} wants to go ahead. The choice is to go alone or to stay for company, and either can look like a decision about the other: going on can seem like leaving, and staying like holding back. A pace agreed together is shared property, and it is the first departure from it that tends to get noticed.',
            sk: 'Pri niečom novom môže {lean} zostať vzadu a {mid} vie ísť dopredu aj počkať, takže dvojica sa často ustáli na tempe, ktoré vyhovuje pomalšiemu rozbehu. Súrodenec bez výrazného sklonu ktorýmkoľvek smerom sa tomu tempu môže prispôsobiť.\n\nNapätie sa môže objaviť prvýkrát, keď {mid} chce ísť dopredu. Možnosti sú ísť osamote, alebo zostať kvôli spoločnosti, a každá z možností môže vyzerať ako rozhodnutie o druhom: ísť dopredu sa môže javiť ako odchod a zostať ako brzdenie. Tempo, na ktorom sa dvojica zhodla, patrí dvojici a všimne sa zvyčajne až prvá odchýlka.',
        },
        aside: {
            en: 'Faced with something new, {lean} may hang back, and {mid} can go ahead or wait, so the two often settle on the slower pace. The first time one goes ahead, going on can look like leaving and staying like holding back.',
            sk: 'Pred niečím novým môže {lean} zostať vzadu a {mid} vie ísť dopredu aj počkať, takže sa dvojica často ustáli na pomalšom tempe. Keď jeden prvýkrát ide dopredu, môže sa ísť dopredu javiť ako odchod a zostať ako brzdenie.',
        },
        step: { en: 'Let the one who wants to go ahead say so first, and the one who wants to wait say what would help, so that going ahead and waiting are both plans.', sk: 'Dohodnite sa, že ten, kto chce ísť dopredu, to povie ako prvý, a ten, kto chce počkať, povie, čo by pomohlo, aby oboje, ísť dopredu aj čakať, bolo plánom.' },
        question: { en: 'What could the one who goes ahead bring back, so that going ahead is part of what the two do together?', sk: 'Čo môže priniesť späť ten, kto ide dopredu, aby aj to patrilo k tomu, čo dvojica robí spolu?' },
    },
    'risk-and-caution/siblings:oneSided:risk-oriented': {
        title: { en: 'Keeping up, or keeping watch', sk: 'Držať krok, alebo držať stráž' },
        passage: {
            en: '{lean} is often drawn to the high wall, the cold water, the new game, and {mid} can follow or hold back, so the two seldom argue about pace. Between them, the new thing rarely waits.\n\nThe risk is that following can turn into keeping up. A sibling who can do either may be carried by the other’s speed into things neither would pick slowly, or may be left as the one who watches. Minding the other is not a child’s job, yet the role can arrive without being given: the one who stays behind is the one standing there when something goes wrong.',
            sk: '{lean} sa často púšťa na vysoký múr, do studenej vody, do novej hry a {mid} vie nasledovať aj zostať vzadu, takže sa dvojica o tempe zriedka háda. Nová vec medzi nimi len zriedka čaká.\n\nRiziko je, že z nasledovania sa môže stať držanie kroku. Súrodenec, ktorý zvládne oba spôsoby, sa môže nechať uniesť rýchlosťou druhého k veciam, ktoré by si pri pomalom rozhodovaní nevybral nikto z nich, alebo sa môže stať tým, kto len dáva pozor. Strážiť druhého nie je úloha dieťaťa, a predsa táto úloha môže prísť aj bez pridelenia: kto zostane vzadu, ten je pri ruke, keď sa niečo pokazí.',
        },
        aside: {
            en: '{lean} is often drawn to new things, and {mid} can follow or hold back, so the two seldom argue about pace. Following can turn into keeping up, and holding back can turn into keeping watch.',
            sk: 'Do nových vecí sa {lean} často púšťa a {mid} vie nasledovať aj zostať vzadu, takže sa dvojica o tempe zriedka háda. Z nasledovania sa môže stať držanie kroku a zo zostávania vzadu dávanie pozoru.',
        },
        step: { en: 'Agree between the two that each can say “not this one” without it counting as backing out, and that nobody is left to keep watch.', sk: 'Dohodnite sa, že každý z dvojice môže povedať „túto nie“, bez toho, aby to platilo ako ústup, a že nikto nezostane na stráži.' },
        question: { en: 'What could each of the two say, in the moment, to change the pace without ending the game?', sk: 'Čo môže každý z dvojice povedať priamo v hre, aby sa zmenilo tempo a hra neskončila?' },
    },
};
export default PARENTING_A2;
