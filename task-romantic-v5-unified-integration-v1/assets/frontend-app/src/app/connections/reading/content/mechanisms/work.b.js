/**
 * WORK. The weight falls on complementarity: how two approaches can strengthen each other, where coordination breaks down, how decisions and communication can be arranged so that a difference is worked with. Nothing here says anything about competence or performance. Part b (emotional expression, visibility, change, initiative, abstraction).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 * Directed keys (opposed:<pole>) are written for a manager and a collaborator and for a mentor and a mentee alike: {first} has more say or more experience, {second} the other; no role nouns appear.
 */
const WORK_B = {
    /* ------------------------------------------------------------------ emotional-expression */
    'emotional-expression/shared:emotionally-expressive': {
        title: { en: 'Reactions that arrive at once', sk: 'Reakcie, ktoré prídu hneď' },
        passage: {
            en: 'Pleasure at a draft, irritation at a moved deadline, a sigh over a tool that has broken again: {both} are likely to let each reaction show as it comes. Each can read the other easily, since the register is the same, and a problem is likelier to be announced than carried.\n\nThe edge of that fluency shows in a tense meeting. One open reaction can meet another with nobody holding a steadier register in between, and a remark about the plan can start to sound like a remark about the person. People nearby who do not share the register may hear a quarrel where the two hear an ordinary exchange. Which of the two it was tends to be settled afterwards, by whether either says plainly that the remark was about the plan and not about the other.',
            sk: 'Radosť z konceptu, podráždenie nad posunutým termínom, vzdych nad nástrojom, ktorý sa zasa pokazil: {both} zvyčajne dávajú každú takú reakciu najavo hneď, ako príde. Navzájom si ľahko rozumejú, lebo reagujú podobne, a problém skôr zaznie nahlas, než by sa nosil potichu.\n\nHranica tejto ľahkosti sa ukáže na napätej porade. Jedna otvorená reakcia môže naraziť na druhú bez toho, aby medzi nimi niekto držal pokojnejší tón, a poznámka k plánu môže začať znieť ako poznámka k človeku. Ľudia okolo, ktorí takto nereagujú, môžu počuť hádku tam, kde dvojica počuje obyčajnú výmenu názorov. Čo to vlastne bolo, sa zvyčajne ukáže až potom: podľa toho, či niekto z nich jasne povie, že poznámka patrila plánu, a nie človeku.',
        },
        aside: {
            en: '{both} both tend to show reactions in the moment, so the mood of the work is easy to read and a problem is likely to be announced early. In a tense meeting one open reaction can meet another, and a remark about the plan can sound like a remark about the person.',
            sk: '{both} zvyčajne dávajú reakcie najavo hneď, takže náladu pri práci je ľahké vyčítať a problém sa pravdepodobne ohlási včas. Na napätej porade môže jedna otvorená reakcia naraziť na druhú a poznámka k plánu môže znieť ako poznámka k človeku.',
        },
        step: { en: 'After a sharp exchange, agree that either of you can say “that was about the plan, not about you”, and that the other lets it settle there.', sk: 'Po ostrej výmene sa dohodnite, že ktokoľvek z vás môže povedať „to bolo o pláne, nie o človeku“ a druhá strana to tým nechá uzavreté.' },
        question: { en: 'Which reaction from the other has been easiest to read, and which has sounded larger than it was meant?', sk: 'Ktorá reakcia druhej strany sa vám čítala najľahšie a ktorá vyznela silnejšie, než bola myslená?' },
    },
    'emotional-expression/shared:emotionally-contained': {
        title: { en: 'Calm on both sides of the desk', sk: 'Pokoj na jednej aj na druhej strane' },
        passage: {
            en: 'When a late request arrives, {both} may take it without a change in either voice. That steadiness can keep a hard day from spreading: the crisis is worked through at an even pace, and nobody has to manage a second one between the two.\n\nThe cost is in what the calm hides. Each can take the other’s even tone as a sign that there is room to spare, and nothing in the exchange prompts a question about load. The first visible sign of strain can then be a handover that arrives thin, or a plan that is suddenly changed. Where calm is the manner of both, the only thing that can prompt a question about load is the question itself.',
            sk: 'Keď príde neskorá požiadavka, {both} môžu takú požiadavku prijať bez toho, aby sa niekomu z nich zmenil hlas. Takáto vyrovnanosť môže zabrániť, aby sa ťažký deň rozlial ďalej: kríza sa rieši rovnomerným tempom a nikto nemusí zvládať ešte jednu krízu medzi nimi dvoma.\n\nCena je v tom, čo pokoj zakrýva. Každý z nich môže brať vyrovnaný tón druhej strany ako znak, že je ešte rezerva, a nič vo výmene nevyvolá otázku na záťaž. Prvým viditeľným znakom napätia potom môže byť odovzdaná práca, ktorá je skromnejšia než inokedy, alebo náhla zmena plánu. Kde je pokoj spôsobom celej dvojice, otázku na záťaž nevyvolá nič, len samotná otázka.',
        },
        aside: {
            en: '{both} are both inclined to stay level under pressure, so a crisis can be worked through without a second one starting between them. The cost is that strain may have no way to show, and each can read the other’s calm as spare capacity.',
            sk: '{both} zvyknú pod tlakom držať pokoj, takže krízou sa dá prejsť bez toho, aby sa medzi nimi rozbehla ďalšia. Cenou je, že napätie nemusí mať ako vyjsť najavo a každý môže pokoj druhej strany brať za voľnú kapacitu.',
        },
        step: { en: 'Choose one regular moment, such as the end of a busy stretch, when each asks the other a plain question about load, however calm things look.', sk: 'Zvoľte si jednu pravidelnú chvíľu, napríklad koniec rušného obdobia, keď sa navzájom jednoducho opýtate na záťaž, nech to vyzerá akokoľvek pokojne.' },
        question: { en: 'What would show you that the other is carrying too much, if nothing about the surface changed?', sk: 'Čo by vám prezradilo, že druhá strana nesie priveľa, keby sa navonok nič nezmenilo?' },
    },
    'emotional-expression/opposed': {
        title: { en: 'Two scales for the same news', sk: 'Jedna správa, dve miery' },
        passage: {
            en: 'Say a deadline moves. {p0} may say at once, in full voice, what it does to the week, while {p1} may say only that it is understood and go back to the work. Each response is ordinary to the one who gives it and easy to misread. {p0} may take the quiet for having no view at all, and {p1} may take the volume for an emergency that needs putting out.\n\nBoth readings are guesses made on one’s own scale, and each scale has its use. {p0} can give early warning and {p1} can keep the room steady while the problem is solved, so the pair has both. Whether it keeps both depends on whether a signal means the same thing on each side: how loud counts as alarm, and what a level voice is allowed to mean.',
            sk: 'Povedzme, že sa posunie termín. {p0} môže hneď a nahlas povedať, čo to urobí s týždňom, kým {p1} môže povedať len to, že rozumie, a vrátiť sa k práci. Pre toho, kto takto odpovedá, je to obyčajná odpoveď, no zvonka sa dá ľahko pochopiť zle. {p0} môže ticho považovať za znak, že nijaký názor niet, a {p1} môže hlasnosť považovať za požiar, ktorý treba hasiť.\n\nKaždý z týchto výkladov je len odhad podľa vlastnej miery a každá miera má svoje využitie. {p0} vie varovať včas a {p1} vie udržať pokoj, kým sa problém rieši, takže dvojica má k dispozícii jedno aj druhé. Či to tak zostane, závisí od toho, či signál znamená na každej strane to isté: aká hlasnosť už je poplach a čo smie znamenať vyrovnaný hlas.',
        },
        aside: {
            en: '{p0} tends to show reactions as they come and {p1} to keep a level surface, so the same news can look like an emergency on one side and like indifference on the other. Each reading is a guess made on one’s own scale.',
            sk: '{p0} zvyčajne dáva reakcie najavo, ako prídu, a {p1} navonok drží pokoj, takže tá istá správa môže na jednej strane vyzerať ako poplach a na druhej ako ľahostajnosť. Každý výklad je len odhad podľa vlastnej miery.',
        },
        step: { en: 'Agree one plain phrase that means “this is more than it sounds”, and one that means “I have heard this and I am steady”.', sk: 'Dohodnite si jednu jednoduchú vetu, ktorá znamená „je to viac, než to znie“, a jednu, ktorá znamená „rozumiem a držím pokoj“.' },
        question: { en: 'How loud does a reaction have to be, for each of you, before it counts as alarm?', sk: 'Ako hlasná musí byť reakcia, aby u každého z vás platila za poplach?' },
    },
    'emotional-expression/opposed:emotionally-expressive': {
        title: { en: 'A reaction that weighs more than meant', sk: 'Reakcia, ktorá váži viac, než mala' },
        passage: {
            en: 'Because {first} has more say in how the work goes, or longer experience of it, a reaction from that side can count for more than it was meant to. {first} is likely to react in the moment, with pleasure at a good draft or sharp disappointment at a missed detail. A remark about one slide can then be carried out of the room as a verdict.\n\n{second} may keep an even surface and say little in return, so the cost of the reaction seldom shows. A loop can form: a sharp remark, a level answer, the level answer read as agreement, and a next remark as strong as the last. The channel that should carry the weight of a reaction back to the person who gave it is the one that stays quiet.',
            sk: 'Keďže {first} má pri práci väčšie slovo alebo dlhšiu skúsenosť, reakcia z tejto strany môže vážiť viac, než mala. {first} často reaguje hneď, radosťou z dobrého konceptu či ostrým sklamaním nad prehliadnutým detailom, a poznámka k jednému slajdu sa môže z miestnosti odniesť ako rozsudok.\n\n{second} môže navonok držať pokoj a odpovedať málo, takže cena reakcie sa takmer neukáže. Môže tak vzniknúť kruh: ostrá poznámka, pokojná odpoveď, pokojná odpoveď pochopená ako súhlas a ďalšia poznámka rovnako silná ako predošlá. Mlčí práve cesta, ktorou by sa váha reakcie mala vrátiť k tomu, od koho prišla.',
        },
        aside: {
            en: 'A reaction can count for more than it was meant to when {first}, who tends to react openly, also has more say or experience. {second} may keep a level surface, which gives little to read and lets a sharp remark pass for settled.',
            sk: 'Reakcia môže vážiť viac, než mala, keď {first} zvykne reagovať otvorene a zároveň má väčšie slovo alebo viac skúseností. {second} môže navonok držať pokoj, ktorý dáva málo na čítanie, a ostrá poznámka tak môže prejsť ako vybavená vec.',
        },
        step: { en: 'After a strong reaction, the one with more say or experience states what it was about and what it was not about, then leaves room for a reply.', sk: 'Po silnej reakcii nech ten, kto má väčšie slovo alebo viac skúseností, povie, o čom reakcia bola a o čom nebola, a nechá priestor na odpoveď.' },
        question: { en: 'What would let the quieter of the two say how a reaction landed, without it costing anything?', sk: 'Čo by tomu z vás, kto reaguje tichšie, uľahčilo povedať, ako reakcia dopadla, aby to nič nestálo?' },
    },
    'emotional-expression/opposed:emotionally-contained': {
        title: { en: 'Reading a level surface', sk: 'Čítanie z pokojnej tváre' },
        passage: {
            en: '{second} is likely to show enthusiasm and frustration as they come. {first} tends to answer in an even voice, and because {first} has more say or longer experience, that evenness can get studied closely. A flat “good, go ahead” after an excited proposal can mean {second} has to guess whether the idea has landed. A pause before an answer can be read for a meaning it may not carry.\n\nIn the other direction, when {second} reacts strongly, {first} can take it for a crisis and move to settle it at once. The settling can come as reassurance, or as a solution offered before the frustration has said what it is about. Where a surface offers nothing to read, the one watching supplies a meaning, and the supplied version tends to be the more worrying one.',
            sk: '{second} zvyčajne dáva nadšenie aj frustráciu najavo hneď, ako prídu. {first} odpovedá spravidla vyrovnaným hlasom, a keďže má väčšie slovo alebo dlhšiu skúsenosť, táto vyrovnanosť sa môže pozorne skúmať. Strohé „dobre, len do toho“ po nadšenom návrhu môže znamenať, že {second} musí hádať, či nápad zaujal, a v pauze pred odpoveďou sa dá hľadať význam, ktorý tam nemusí byť.\n\nV opačnom smere, keď {second} zareaguje silno, môže to {first} vziať za krízu a hneď sa pustiť do riešenia: ubezpečením alebo hotovým riešením skôr, než frustrácia povie, o čo ide. Kde navonok nie je čo čítať, ten, kto sa pozerá, si význam domyslí a domyslená verzia býva tá znepokojivejšia.',
        },
        aside: {
            en: 'Small cues from a level surface can be read closely when {first}, who has more say or experience, tends to answer evenly. {second} is quicker to show reactions, and a strong one can be taken for a crisis and settled before it has said what it is about.',
            sk: 'Z vyrovnanej odpovede sa môžu pozorne čítať aj drobnosti, keď {first} zvykne odpovedať pokojne a má pritom väčšie slovo alebo viac skúseností. {second} dáva reakcie najavo rýchlejšie a silná reakcia sa môže vziať za krízu a vyriešiť skôr, než povie, o čo ide.',
        },
        step: { en: 'Where an answer is kept level, let it carry one added sentence that says what it means: “that is a yes”, “I need to think” or “this worries me”.', sk: 'Tam, kde odpoveď znie vyrovnane, nech obsahuje jednu vetu navyše, ktorá povie, čo znamená: „je to áno“, „potrebujem si to premyslieť“ alebo „toto ma znepokojuje“.' },
        question: { en: 'Which small cue from the quieter of the two has been read as meaning more than it did?', sk: 'Ktorý drobný signál od toho z vás, kto reaguje vyrovnanejšie, sa vyložil ako viac, než znamenal?' },
    },
    'emotional-expression/oneSided:emotionally-expressive': {
        title: { en: 'The one who steadies every flare', sk: 'Kto utíši každé vzplanutie' },
        passage: {
            en: '{lean} tends to wear the mood of the work on the surface, while {mid} has no strong pull either way and is likely to answer a flare in a moderate key. That can be useful: a flare of irritation that meets a moderate answer is less likely to harden into a verdict.\n\nIt has a price that is easy not to see. {mid} can end up steadying each flare, adjusting quietly and carrying the cost of doing so, while {lean} gets no sign of how much that took. When each reaction meets a steady answer, {lean} has nothing to measure its weight by.',
            sk: '{lean} zvykne nosiť náladu práce na tvári, kým sa {mid} nijakým smerom výrazne neprikláňa a na vzplanutie pravdepodobne odpovie miernym tónom. To môže pomôcť: záblesk podráždenia, ktorý narazí na miernu odpoveď, sa menej ľahko zmení na rozsudok.\n\nMá to cenu, ktorú je ľahké prehliadnuť. {mid} môže napokon každé vzplanutie utíšiť, potichu sa prispôsobiť a niesť to, čo to stojí, kým {lean} nedostane nijaký signál o tom, koľko to stálo. Keď každá reakcia narazí na pokojnú odpoveď, {lean} nemá čím zmerať, akú má váhu.',
        },
        aside: {
            en: 'Steadying can become a quiet job here: {lean} tends to let the mood of the work show, and {mid}, with no strong pull either way, can become the one who settles each flare. {lean} may get no sign of how much the steadying takes.',
            sk: 'Utišovanie sa tu môže stať tichou prácou: {lean} zvykne dávať náladu práce najavo a {mid}, bez výrazného sklonu na jednu či druhú stranu, môže každé vzplanutie upokojiť. {lean} pritom nemusí dostať nijaký signál o tom, koľko to stojí.',
        },
        step: { en: 'From time to time each of you says how a recent reaction landed, and the other hears it out without explaining.', sk: 'Z času na čas si povedzte, ako zapôsobila nedávna reakcia, a druhá strana to vypočuje bez vysvetľovania.' },
        question: { en: 'What does a strong reaction ask of the other, and has that ever been said aloud?', sk: 'Čo silná reakcia žiada od druhej strany a zaznelo to už niekedy nahlas?' },
    },
    'emotional-expression/oneSided:emotionally-contained': {
        title: { en: 'Match the calm or ask about it', sk: 'Pridať sa k pokoju, alebo sa opýtať' },
        passage: {
            en: 'When {lean} goes quiet under pressure, {mid} faces a choice that does not announce itself: to match the calm, or to ask about it. Matching is the easy path and fits the middle of a crisis. {mid} leans neither way, which is why there is a choice at all.\n\nIf the calm is matched, two people under load can end up level at each other. The first visible sign of strain may then be a handover that arrives thin or a request to change the plan. If the question is asked, it can be a small one, put privately. Which of the two happens can depend on whether {mid} reads the level surface as an answer or as a reason to ask.',
            sk: 'Keď {lean} pod tlakom stíchne, {mid} stojí pred voľbou, ktorá sa neohlási: pridať sa k pokoju, alebo sa na ten pokoj opýtať. Pridať sa je ľahšia cesta a uprostred krízy sa to hodí. {mid} sa nijakým smerom neprikláňa, a preto tu voľba vôbec je.\n\nAk sa pokoj len zopakuje, dvaja ľudia pod záťažou si môžu navzájom odpovedať pokojom a prvým viditeľným znakom napätia môže byť skromnejšie odovzdanie práce alebo žiadosť o zmenu plánu. Ak otázka padne, môže byť malá a položená v súkromí. Ktorá z možností nastane, môže závisieť od toho, či {mid} berie pokojný výraz ako odpoveď, alebo ako dôvod opýtať sa.',
        },
        aside: {
            en: 'When {lean} keeps strain out of sight, {mid}, who leans neither way, faces a choice that does not announce itself: to match the calm, or to ask about it. Matching is easier, and two people under load can end up level at each other.',
            sk: 'Keď {lean} nenechá záťaž vidieť, {mid} sa bez výrazného vlastného sklonu ocitne pred voľbou, ktorá sa neohlási: pridať sa k pokoju, alebo sa na ten pokoj opýtať. Pridať sa je ľahšie a dvaja ľudia pod záťažou si potom môžu navzájom odpovedať len pokojom.',
        },
        step: { en: 'Agree a short private question about load that either can ask without it becoming an event, such as “how heavy is it right now?”', sk: 'Dohodnite sa na krátkej súkromnej otázke o záťaži, ktorú môže položiť ktokoľvek z vás tak, aby z toho nebola udalosť, napríklad „aké ťažké to práve je?“' },
        question: { en: 'What would make a question about load easy to ask and easy to answer honestly?', sk: 'Čo by uľahčilo opýtať sa na záťaž aj úprimne odpovedať?' },
    },
    /* ------------------------------------------------------------------ visibility (social-energy) */
    'social-energy/shared:private': {
        title: { en: 'Everyone prepares, nobody presents', sk: 'Všetci pripravujú, nikto neprezentuje' },
        passage: {
            en: 'Say a pitch needs a voice. {both} may each offer to do something else, one to refine the slides and the other to check the figures, and the slides improve while the question of who speaks stays open. Both tend to be at ease out of sight, so the preparation can be thorough and the pair seldom competes for attention.\n\nThe same preference can leave the outward jobs unclaimed: the client call, the pitch, the difficult conversation. They can fall to whoever is least uncomfortable that day, or wait. The work reaches other rooms only if one of the two decides, deliberately, to carry it there.',
            sk: 'Povedzme, že prezentácia potrebuje hlas. {both} môžu ponúknuť, že urobia niečo iné: doladiť slajdy, skontrolovať čísla. Slajdy sa zlepšujú, kým otázka, kto bude hovoriť, zostáva otvorená. V pozadí sa zvyčajne cítia dobre, takže príprava môže byť dôkladná a o pozornosť spolu zápasia málokedy.\n\nRovnaká záľuba v pozadí môže nechať vonkajšie úlohy bez toho, aby si ich niekto vzal: hovor s klientom, prezentáciu, ťažký rozhovor. Môžu pripadnúť tomu, komu je v ten deň najmenej nepríjemné, alebo počkať. Práca sa dostane do iných miestností len vtedy, ak sa niekto z dvojice zámerne rozhodne, že prácu tam odnesie.',
        },
        aside: {
            en: '{both} would both rather work out of sight, so the pitch, the client call and the awkward conversation can go unclaimed. The preparation can grow more thorough while the question of who speaks stays open.',
            sk: '{both} sa radšej držia mimo pozornosti, takže prezentácia, hovor s klientom aj nepríjemný rozhovor môžu zostať bez toho, aby si ich niekto vzal. Príprava môže byť čoraz dôkladnejšia, kým otázka, kto bude hovoriť, zostáva otvorená.',
        },
        step: { en: 'Before the next piece of work goes outward, name who will speak for it, and agree what the other prepares to make that easier.', sk: 'Skôr než práca pôjde navonok, určte, kto bude prácu predstavovať, a dohodnite sa, čo pripraví druhá strana, aby to bolo ľahšie.' },
        question: { en: 'Which outward job, the call, the pitch or the hard conversation, is easiest for each of you to take on?', sk: 'Ktorú z vonkajších úloh, hovor, prezentáciu alebo ťažký rozhovor, by každý z vás zobral najľahšie?' },
    },
    'social-energy/shared:social': {
        title: { en: 'Two voices, two versions of the promise', sk: 'Dva hlasy, dve verzie sľubu' },
        passage: {
            en: 'Two people who are at ease in a room can each make a promise in it. In a client meeting or a team call, {both} may answer questions as they come and build on each other’s answers. Each can then leave with a slightly different version of what was agreed.\n\nOften no record gets made: both are speaking and neither is keeping one. The follow-up note is the job that belongs to the quiet seat at the table, and in this pair there is no quiet seat. Where both prefer the room, the unglamorous jobs around it, the note, the confirmation, the updated file, fall into the space between.',
            sk: 'Dvaja ľudia, ktorým je v miestnosti dobre, tam môžu každý niečo sľúbiť. Na stretnutí s klientom alebo na tímovom hovore môžu {both} odpovedať na otázky, ako prichádzajú, a nadväzovať na odpovede druhej strany, takže každý môže odísť s trochu inou verziou toho, čo sa dohodlo.\n\nZáznam často nevznikne: hovoria dvaja a poznámky si nepíše nikto. Zápis po stretnutí patrí tomu, kto na stretnutí sedí potichu, a v tejto dvojici nikto taký nie je. Kde majú dvaja radšej ruch miestnosti, nevďačné práce okolo stretnutia, zápis, potvrdenie, aktualizovaný súbor, padnú pod stôl.',
        },
        aside: {
            en: '{both} both lean toward the front of the room, so two voices can leave a meeting with two versions of what was promised. The note, the confirmation and the updated file can fall between them.',
            sk: '{both} sa v spoločnosti ľudí cítia dobre, takže dva hlasy môžu z porady odísť s dvoma verziami sľubu. Zápis, potvrdenie a aktualizovaný súbor si nemusí vziať nikto.',
        },
        step: { en: 'Decide before each meeting who speaks less and keeps the record, and swap the role next time.', sk: 'Pred každou poradou sa dohodnite, kto bude hovoriť menej a viesť záznam, a nabudúce si úlohu vymeňte.' },
        question: { en: 'Who writes down what was agreed, and when does the other get to read it?', sk: 'Kto zapíše, čo sa dohodlo, a kedy si to druhá strana môže prečítať?' },
    },
    'social-energy/opposed': {
        title: { en: 'The room and the desk', sk: 'Miestnosť a pracovný stôl' },
        passage: {
            en: 'The work has two places here: the room, where {p1} tends to carry it, and the desk, where {p0} holds the detail behind it. In the room a question can arrive that only {p0} can answer, and a promise can be made that {p0} has not yet scoped.\n\nAt the desk the picture runs the other way: {p0} may learn what was said in the room only afterwards. The name on the presentation can also come to stand for work that two people made. The arrangement rests on a thin channel in both directions. What {p1} may say in the room has to reach the desk it concerns, and what {p0} knows has to be within reach before the room asks.',
            sk: 'Práca tu má dve miesta: miestnosť s ľuďmi, kde prácu zvyčajne predstavuje {p1}, a pracovný stôl, kde {p0} drží detaily, na ktorých stojí. V miestnosti môže zaznieť otázka, na ktorú vie odpovedať len {p0}, a môže sa sľúbiť niečo, čo {p0} ešte nemá prepočítané.\n\nPri stole to ide naopak: {p0} sa môže dozvedieť, čo odznelo v miestnosti, až dodatočne, a meno na prezentácii môže začať stáť za prácou, ktorú urobili dvaja. Celé to stojí na tenkom spojení tam aj späť. Čo {p1} v miestnosti prípadne povie, sa musí dostať k tomu, kto na veci pracuje, a čo {p0} vie, musí byť poruke skôr, než sa ľudia v miestnosti opýtajú.',
        },
        aside: {
            en: 'In the room {p1} tends to carry the work, and at the desk {p0} holds the detail behind it. A promise made in the room can outrun what the desk has scoped, and the name on the presentation can stand for work two people made.',
            sk: 'V miestnosti prácu zvyčajne predstavuje {p1} a pri stole drží {p0} detaily, na ktorých stojí. Sľub daný v miestnosti môže predbehnúť to, čo je pri stole prepočítané, a meno na prezentácii môže stáť za prácou, ktorú urobili dvaja.',
        },
        step: { en: 'After a meeting with others, put what was promised into two lines and send them to whoever will carry it out.', sk: 'Po stretnutí s ostatnými zhrňte, čo sa sľúbilo, do dvoch riadkov a pošlite ich tomu, kto to bude robiť.' },
        question: { en: 'What does the person in the room need to know from the desk before saying yes, and where is that written?', sk: 'Čo potrebuje vedieť človek v miestnosti od stola, kým povie áno, a kde je to zapísané?' },
    },
    'social-energy/opposed:private': {
        title: { en: 'Rooms that one of them skips', sk: 'Miestnosti, kam jeden nechodí' },
        passage: {
            en: 'Small meetings, written notes, few hallway conversations: {first} tends to work in that quieter register. {second} is at ease where people gather and speak, and may build working relationships there. Those rooms are the ones {first} tends to skip. Introductions, context and the naming of good work, which someone with more say or experience can carry in, can travel less far than they could.\n\n{first} may see nothing missing, since the work arrives through the channels {first} uses. {second} may find that a good deal that could be passed along stays in the small room. Much rests on whether the quieter forms, a note, a name put forward, a few words in the right ear, count as a way of carrying someone into a room.',
            sk: 'Malé stretnutia, písomné poznámky, málo rozhovorov na chodbe: {first} zvyčajne pracuje v tomto tichšom režime. {second} sa dobre cíti tam, kde sa ľudia schádzajú a rozprávajú, a práve tam si môže budovať pracovné vzťahy. Do týchto miestností {first} zvyčajne nechodí. Predstavenia, súvislosti a zmienka o dobrej práci, ktoré tam môže vniesť niekto s väčším slovom alebo skúsenosťami, tak môžu zájsť menej ďaleko, než by mohli.\n\n{first} nemusí vidieť, že by niečo chýbalo, lebo práca prichádza cestami, ktoré {first} používa. {second} si môže všimnúť, že veľa z toho, čo sa dalo podať ďalej, zostáva v malej miestnosti. Veľa závisí od toho, či sa aj tichšie podoby, poznámka, navrhnuté meno, pár slov správnemu človeku, budú počítať ako spôsob, ako niekoho uviesť medzi ľudí.',
        },
        aside: {
            en: 'Introductions and credit can travel less far than they could when {first}, who has more say or experience, tends to skip the gatherings where {second} is at ease. Small rooms and writing suit one side, company the other.',
            sk: 'Predstavenia a uznanie môžu zájsť menej ďaleko, než by mohli, keď {first} s väčším slovom alebo skúsenosťami zvyčajne vynecháva stretnutia, na ktorých sa {second} cíti dobre. Jednej strane vyhovujú malé miestnosti a písanie, druhej spoločnosť ľudí.',
        },
        step: { en: 'Agree one small private way for the one with more say or experience to carry the other’s work outward: a note, a name put forward, an introduction.', sk: 'Dohodnite jeden malý súkromný spôsob, ako môže ten, kto má väčšie slovo alebo viac skúseností, vyniesť prácu druhej strany navonok: poznámka, navrhnuté meno, predstavenie.' },
        question: { en: 'In which room would it be most useful for the other’s work to be named, and who could name it?', sk: 'V ktorej miestnosti by bolo najužitočnejšie spomenúť prácu druhej strany a kto by to mohol urobiť?' },
    },
    'social-energy/opposed:social': {
        title: { en: 'Advice shaped like its giver', sk: 'Rada ušitá podľa toho, kto radí' },
        passage: {
            en: 'When {first} points to a way of being seen, the route described tends to be the one that suits the rooms {first} likes: speak up, show up, meet people. {second}, at ease away from the spotlight, may find that route runs through the places that cost the most effort. The advice fits the one who gives it, and the other can hear it as a standard.\n\nA second route exists: a written summary, a small review, a named piece of work that people can point to. Unless the quieter routes count as routes of equal standing, the advice can stay a measure that only one of the two meets comfortably. The conversation about visibility can then turn into a conversation about temperament.',
            sk: 'Keď {first} radí, ako sa dať vidieť, opisuje zvyčajne cestu, ktorá sa hodí do miestností, kde je {first} vo svojom živle: prehovoriť, ukázať sa, zoznamovať sa. {second} sa mimo reflektorov cíti dobre a môže zistiť, že táto cesta vedie cez miesta, ktoré stoja najviac námahy. Rada je ušitá na mieru tomu, kto radí, a druhá strana môže v takej rade počuť meradlo.\n\nExistuje aj druhá cesta: písomné zhrnutie, krátka recenzia, pomenovaná práca, na ktorú môžu ľudia ukázať. Kým sa tichšie cesty nebudú počítať ako rovnocenné, rada môže zostať mierou, ktorú pohodlne splní len jeden z dvoch, a rozhovor o viditeľnosti sa môže zmeniť na rozhovor o povahe.',
        },
        aside: {
            en: '{first} is at ease in front of people and tends to describe the way of being seen that {first} finds natural. {second} may prefer the back room, and that way can sound like a standard while a quieter route goes unnamed.',
            sk: '{first} sa pred ľuďmi cíti dobre a zvykne opisovať taký spôsob, ako sa dať vidieť, aký {first} považuje za prirodzený. {second} môže mať radšej zázemie a taká cesta potom môže znieť ako meradlo, kým tichšia cesta zostane nepomenovaná.',
        },
        step: { en: 'List two or three ways a piece of work can be seen without a full room, and treat them as routes of equal standing.', sk: 'Zostavte zoznam dvoch alebo troch spôsobov, ako sa dá práca ukázať bez plnej miestnosti, a berte ich ako rovnocenné cesty.' },
        question: { en: 'What would count, for each of you, as having been seen well, and does it need a room?', sk: 'Čo by pre každého z vás znamenalo, že ľudia vašu prácu poriadne zbadali, a je na to treba miestnosť?' },
    },
    'social-energy/oneSided:private': {
        title: { en: 'The default that nobody chose', sk: 'Usporiadanie, ktoré nikto nezvolil' },
        passage: {
            en: 'Because {mid} has no strong pull either way, nobody has to decide who goes out front. The client call, the demo and the update in front of others can drift to whoever does not object, while {lean} tends to stay with the work that suits the back room. Each time it is a small and reasonable choice.\n\nAdded up, it can become an arrangement that neither picked. {mid} ends up carrying the outward jobs as well as a share of the preparation, and {lean} may be seen by few beyond the desk. The ease of the arrangement is also what keeps it from being looked at.',
            sk: 'Keďže {mid} nemá výrazný sklon ani jedným smerom, nikto nemusí rozhodovať, kto pôjde dopredu. Hovor s klientom, ukážka a zhrnutie pred ľuďmi sa môžu presunúť k tomu, kto nenamieta, kým {lean} zvyčajne zostáva pri práci, ktorá sa hodí do zázemia. Zakaždým je to malé a rozumné rozhodnutie.\n\nV súčte z toho môže vzniknúť usporiadanie, ktoré si nikto nevybral: {mid} napokon nesie vonkajšie úlohy aj časť prípravy a {lean} sa mimo vlastného stola môže ukázať len málokomu. Pohodlie takého usporiadania je zároveň to, čo bráni, aby sa naň niekto pozrel zblízka.',
        },
        aside: {
            en: 'Outward jobs can drift without anyone choosing where. {lean} tends to prefer the back room, and {mid}, with no strong pull either way, can end up with the call, the demo and the update. An arrangement that runs this smoothly is easy to leave unexamined.',
            sk: 'Vonkajšie úlohy sa môžu presúvať bez toho, aby niekto rozhodol kam: {lean} zvyčajne uprednostňuje zázemie a {mid}, bez výrazného sklonu jedným či druhým smerom, môže napokon prevziať hovor, ukážku aj zhrnutie. Usporiadanie, ktoré beží takto hladko, sa ľahko nechá bez povšimnutia.',
        },
        step: { en: 'For the next project, say out loud who carries each outward job, and decide it afresh instead of letting it follow from who is willing.', sk: 'Pri ďalšom projekte povedzte nahlas, kto ktorú vonkajšiu úlohu preberie, a rozhodnite to znova, nie podľa toho, kto sa práve ponúkne.' },
        question: { en: 'Which outward jobs have you each taken on without having been asked or having said yes?', sk: 'Ktoré vonkajšie úlohy ste si každý prevzali bez toho, aby vás o to niekto požiadal alebo ste výslovne súhlasili?' },
    },
    'social-energy/oneSided:social': {
        title: { en: 'Decisions made in the corridor', sk: 'Rozhodnutia na chodbe' },
        passage: {
            en: 'For the pair, a meeting can go on past the room: the conversation afterwards, the call that follows the call, the lunch where a client is talked round. {lean}, who tends to draw energy from people, can settle a good deal there.\n\n{mid} can join those conversations or skip them, and a skip has a consequence. A decision can be taken while {mid} is elsewhere, and {mid} may learn of it from the minutes or from a passing remark. That can look like a decision made in secret, when it was only made wherever {lean} happened to be talking. The meeting that counts can then be wherever {lean} is having it, unless decisions are written down somewhere {mid} can read them.',
            sk: 'Porada sa pre dvojicu nemusí skončiť dverami zasadačky: rozhovor po stretnutí, hovor po hovore, obed, pri ktorom sa klient nechá presvedčiť. {lean} zvykne čerpať energiu z ľudí, a tak sa tam dá vybaviť pomerne veľa.\n\n{mid} sa k týmto rozhovorom môže pridať alebo ich vynechať a vynechanie má následok. Rozhodnutie môže padnúť, kým je {mid} inde, a {mid} sa to môže dozvedieť až zo zápisu alebo z poznámky mimochodom. To môže vyzerať ako rozhodnutie za chrbtom, hoci padlo len tam, kde sa práve rozprávalo. Porada, ktorá sa počíta, potom môže byť všade tam, kde práve hovorí {lean}, pokiaľ sa rozhodnutia nezapisujú tam, kde si ich {mid} prečíta.',
        },
        aside: {
            en: 'Some decisions can be made in the corridor, on the call after the call, over lunch, since {lean} tends to be at ease in company. {mid} can join or skip those conversations, and each skip can mean learning of a decision from the minutes.',
            sk: 'Niektoré rozhodnutia môžu padnúť na chodbe, v hovore po hovore či pri obede, lebo sa {lean} v spoločnosti zvyčajne cíti dobre. {mid} sa k týmto rozhovorom môže pridať alebo ich vynechať a každé vynechanie môže znamenať, že sa o rozhodnutí dozvie až zo zápisu.',
        },
        step: { en: 'Write down any decision taken outside a meeting and send it to the other at once.', sk: 'Každé rozhodnutie, ktoré padlo mimo porady, zapíšte a hneď pošlite druhej strane.' },
        question: { en: 'Which decisions get settled in conversations that only one of you is part of?', sk: 'Ktoré rozhodnutia sa vybavia v rozhovoroch, ktorých sa zúčastňuje len jeden z vás?' },
    },
    /* ------------------------------------------------------------------ change (change-and-steadiness) */
    'change-and-steadiness/shared:stability-seeking': {
        title: { en: 'Workarounds instead of change', sk: 'Obchádzky namiesto zmeny' },
        passage: {
            en: 'A spreadsheet can gain a macro, a shared folder a note about which step to avoid, and the old tool stays. When something stops fitting, {both} tend to adapt around it rather than replace it, and each adjustment is small, sensible and quickly learned.\n\nThe cost builds inside the arrangement. What the pair protects can by then be a set of habits that two people know and nobody else can use. A new colleague, or a day when one of the two is away, can show how much of the work lives in those habits. The steadiness is real. What has changed is the thing being kept steady.',
            sk: 'Tabuľka môže dostať makro, zdieľaný priečinok poznámku, ktorému kroku sa vyhnúť, a starý nástroj zostáva. Keď niečo prestane vyhovovať, {both} to zvyčajne radšej obídu, než by to vymenili, a každá úprava je malá, rozumná a ľahko sa dá naučiť.\n\nCena sa hromadí vo vnútri tohto usporiadania. To, čo dvojica chráni, môžu byť medzitým návyky, ktoré poznajú dvaja ľudia a nikto iný ich nevie používať. Nový kolega alebo deň, keď jeden z dvojice chýba, môže ukázať, koľko práce stojí práve na týchto návykoch. Stálosť je skutočná. Zmenilo sa to, čo sa vlastne udržiava.',
        },
        aside: {
            en: '{both} both value what works, so a tool that stops fitting tends to collect workarounds instead of being replaced. The work keeps running, and more of how it runs can come to live in two heads.',
            sk: '{both} si cenia, čo funguje, takže nástroj, ktorý prestane vyhovovať, skôr obrastie obchádzkami, než by sa vymenil. Práca beží ďalej a čoraz viac z toho, ako beží, môže žiť len v dvoch hlavách.',
        },
        step: { en: 'Choose one workaround you each rely on and write it down as a step anyone could follow, or decide to retire the tool it supports.', sk: 'Vyberte jednu obchádzku, na ktorú sa spoliehate, a spíšte postup, podľa ktorého by to zvládol ktokoľvek, alebo sa rozhodnite vyradiť nástroj, ktorý sa obchádza.' },
        question: { en: 'Which workaround would be hardest to explain to someone new?', sk: 'Ktorú obchádzku by bolo najťažšie vysvetliť niekomu novému?' },
    },
    'change-and-steadiness/shared:novelty-seeking': {
        title: { en: 'The next tool arrives before the last one settles', sk: 'Ďalší nástroj príde skôr, než sa ten posledný usadí' },
        passage: {
            en: 'When a new tool is proposed, {both} may both say yes, and the disagreement that would have tested it may not take place. The old routine can be half closed down while the new one is half set up, and the next idea circulating before the last has become habit.\n\nThe pair can move quickly through this stage. The cost tends to be registered by the people who depend on the routine: the colleague who learned the previous process, the client used to a particular form, whoever reads a report that has changed its format. They are also the ones placed to say what the change cost, and they may hear about it only after it has been made.',
            sk: 'Keď sa navrhne nový nástroj, {both} môžu hneď povedať áno a nesúhlas, ktorý by nástroj preveril, sa nemusí vôbec odohrať. Stará rutina môže byť napoly zrušená, nová napoly zavedená a ďalší nápad už obieha skôr, než sa z predošlého stal zvyk.\n\nDvojica môže týmto úsekom prejsť rýchlo. Cenu zvyčajne zaznamenajú tí, čo sa na rutinu spoliehajú: kolega, ktorý sa naučil predošlý postup, klient zvyknutý na určitý formulár, ktokoľvek, kto číta správu v zmenenom formáte. Práve oni môžu povedať, čo zmena stála, a o zmene sa môžu dozvedieť až vtedy, keď je po všetkom.',
        },
        aside: {
            en: '{both} are both drawn to the new, so a change can be welcomed by two people and tested by neither. The cost can fall on those who rely on the routine, who may hear about the change only after it is made.',
            sk: '{both} sa ochotne chytia nového, takže zmenu môžu privítať dvaja a preveriť nikto. Cenu môžu niesť tí, čo sa spoliehajú na rutinu a o zmene sa môžu dozvedieť až vtedy, keď je hotová.',
        },
        step: { en: 'Before adopting a new tool, finish or formally close the last one, and ask one person who relies on the old routine what the change will cost.', sk: 'Skôr než prijmete nový nástroj, dokončite alebo formálne zatvorte predošlý a opýtajte sa niekoho, kto sa spolieha na starú rutinu, aký dopad bude mať zmena.' },
        question: { en: 'Which earlier change is still half finished, and who is still working around it?', sk: 'Ktorá skoršia zmena zostala napoly hotová a kto to dodnes obchádza?' },
    },
    'change-and-steadiness/opposed': {
        title: { en: 'Which cost gets counted first', sk: 'Ktorá cena sa počíta ako prvá' },
        passage: {
            en: 'When {p1} brings a new tool, {p0} may ask what it replaces and who has to relearn the old one. The question is a real one, and it can also sound like a no. {p1} can hear resistance and {p0} a plan without edges, and the subject may come up less often, which can look like peace.\n\nThe tool is rarely the argument. Each of the two holds something the work needs: {p0} may hold reasons for the present way that nobody wrote down, and {p1} tends to notice what the present way costs. What they can disagree about is which cost is counted first, the cost of changing or the cost of staying. Until that is named, a trial can look like a threat and a question like a veto.',
            sk: 'Keď {p1} prinesie nový nástroj, {p0} sa môže spýtať, čo nahrádza a kto sa bude musieť preučiť. Otázka je vecná, no môže znieť aj ako odmietnutie. {p1} môže počuť odpor, {p0} zase plán bez hraníc, a téma sa potom môže otvárať zriedkavejšie, čo zvonka vyzerá ako pokoj.\n\nSpor sa málokedy vedie o samotný nástroj. Každý z nich drží niečo, čo práca potrebuje: {p0} môže poznať dôvody súčasného spôsobu, aj tie, ktoré nikto nezapísal, a {p1} si zvyčajne všíma, čo súčasný spôsob stojí. Rozchádzať sa môžu v tom, ktorá cena sa počíta ako prvá, či cena zmeny, alebo cena zotrvania, a kým sa to nepomenuje, môže pokus vyzerať ako hrozba a otázka ako veto.',
        },
        aside: {
            en: 'A proposal and a question can sound like a push and a veto here. {p0} tends to hold the reasons for the present way, and {p1} tends to hold its cost.',
            sk: 'Návrh a otázka tu môžu znieť ako tlak a veto: {p0} zvyčajne chráni, čo funguje, a {p1} hľadá ďalšiu verziu. Každý drží polovicu rozhodnutia: dôvody súčasného spôsobu a to, koľko stojí.',
        },
        step: { en: 'Before the next change, each states one cost of keeping things as they are and one cost of changing them, and only then do the two of you compare.', sk: 'Pred ďalšou zmenou nech každý uvedie jednu cenu zachovania súčasného stavu a jednu cenu zmeny, a až potom to spolu porovnajte.' },
        question: { en: 'What does the present way of working protect that is not written down anywhere?', sk: 'Čo súčasný spôsob práce chráni, hoci to nie je nikde zapísané?' },
    },
    'change-and-steadiness/opposed:stability-seeking': {
        title: { en: 'A question that sounds like a ruling', sk: 'Otázka, ktorá znie ako rozhodnutie' },
        passage: {
            en: '{second} may come with a new way of doing something, and {first} may ask why the present way should go. Coming from someone with more say or experience, that question can sound like a ruling, and the next proposal can cost more to make than the last.\n\nWhat can follow is a quiet split: a new approach gets tried out of sight, where it needs no hearing, while the present way goes on as it stands. What {first} protects and what {second} wants to try can then run side by side, and {first} may see only one of them. The question of whether the present way still serves can be left without an answer.',
            sk: '{second} môže prísť s novým spôsobom, ako niečo robiť, a {first} sa môže spýtať, prečo meniť ten súčasný. Od niekoho, kto má väčšie slovo alebo viac skúseností, môže taká otázka znieť ako rozhodnutie a ďalší návrh môže stáť viac úsilia než ten predošlý.\n\nPotom môže nastať tichý rozkol. {second} skúša nový prístup radšej bokom, kde sa dá vyskúšať bez posudzovania, kým {first} zostáva pri súčasnom postupe. To, čo {first} chráni, a to, čo {second} chce vyskúšať, potom bežia vedľa seba a {first} vidí len jedno z toho. Otázka, či súčasný spôsob ešte slúži, ostáva bez odpovede.',
        },
        aside: {
            en: 'When {first}, who tends to guard what works, has more say or experience, a question about why to change can sound like a ruling. {second} may find proposals costly to make, and trials can move out of sight.',
            sk: 'Keď {first} zvykne strážiť, čo funguje, a má pritom väčšie slovo alebo viac skúseností, otázka, prečo meniť, môže znieť ako rozhodnutie. {second} môže zistiť, že predložiť návrh nie je lacné, a pokusy sa môžu presunúť mimo dohľadu.',
        },
        step: { en: 'Invite proposals in a fixed, low-cost form, such as a short note with the problem, the idea and a small trial, and answer each one in the same form.', sk: 'Dohodnite si pevnú, nenáročnú podobu návrhov, napríklad krátku poznámku s problémom, nápadom a malým pokusom, a na každý návrh odpovedajte v rovnakej podobe.' },
        question: { en: 'What would make it easy to say “I would like to try something”, and equally easy to hear it?', sk: 'Čo by uľahčilo povedať „chcem niečo vyskúšať“ a rovnako ľahko to vypočuť?' },
    },
    'change-and-steadiness/opposed:novelty-seeking': {
        title: { en: 'Change set by one, absorbed by the other', sk: 'Zmenu určí jedna strana, znáša druhá' },
        passage: {
            en: '{first} is drawn to the next tool, the new process, the improved version, and can present each one with the weight of position or experience. {second} may feel that a change has to be adopted rather than weighed, and is likely to be the one who learns it and rebuilds what depended on the old way. The pace of change can then be set at one end of the pair and absorbed at the other.\n\nA familiar version: a routine has only just settled when a newer one is proposed. When {second} asks what happens to what was built, the question can be taken for resistance. Yet it may be the practical half of the proposal: what the change replaces and what it will cost to move. Heard as a contribution rather than a brake, it can give the change a realistic shape.',
            sk: '{first} sa zvykne obzerať po ďalšom nástroji, novom postupe, vylepšenej verzii a môže každú novinku predstaviť s váhou svojho postavenia alebo skúseností. {second} môže mať pocit, že zmenu treba prijať, a nie zvažovať. Učiť sa novinku a prestavovať to, čo stálo na starom spôsobe, bude pravdepodobne {second}. Tempo zmien sa tak môže určovať na jednom konci dvojice a znášať na druhom.\n\nZnáma podoba: rutina sa sotva usadí a už sa navrhuje novšia. Keď sa {second} spýta, čo bude s tým, čo sa postavilo, môže sa to brať ako odpor, hoci môže ísť o praktickú polovicu návrhu: čo zmena nahrádza a koľko bude stáť prechod. Ak sa otázka vypočuje ako príspevok, a nie ako brzda, môže dať zmene reálnejšiu podobu.',
        },
        aside: {
            en: 'Change can be set at one end and absorbed at the other: {first} is drawn to the new and has more say or experience, while {second} is likely to do the relearning. A question about what the change replaces can be the practical half of a proposal, even when it sounds like resistance.',
            sk: 'Zmenu môže určovať jedna strana a znášať druhá: {first} sa chytá nového a má väčšie slovo alebo viac skúseností, kým preučiť sa bude pravdepodobne musieť {second}. Otázka, čo zmena nahrádza, môže byť praktickou polovicou návrhu, aj keď znie ako odpor.',
        },
        step: { en: 'Attach to each new change a short list of what it replaces and who has to relearn it, written by the person proposing it.', sk: 'Ku každej novej zmene pripojte krátky zoznam toho, čo nahrádza a kto sa to bude musieť preučiť, a nech ten zoznam napíše ten, kto zmenu navrhuje.' },
        question: { en: 'What was replaced lately that someone had only just learned?', sk: 'Čo sa nedávno nahradilo, hoci sa to niekto práve naučil?' },
    },
    'change-and-steadiness/oneSided:stability-seeking': {
        title: { en: 'The swing vote on change', sk: 'Rozhodujúci hlas pri zmene' },
        passage: {
            en: 'A proposal for change can be settled by where {mid} stands on the day. {lean} tends to guard what works, {mid} has no strong pull either way, and nobody has said that the decision sits there. If {mid} goes along, {lean} meets the change as something already under way. If {mid} holds back, a change worth testing can lapse without having been weighed.\n\nEither way, the question can be settled before it is discussed. The reasons for keeping things as they are may get a shorter hearing than they would between two people who disagreed openly.',
            sk: 'O návrhu na zmenu môže rozhodnúť to, kde {mid} v ten deň stojí: {lean} zvykne strážiť, čo funguje, {mid} nemá výrazný sklon ani jedným smerom a nikto nepovedal, že rozhodnutie leží práve tam. Ak sa {mid} pridá, {lean} sa so zmenou stretne ako s niečím, čo už beží. Ak {mid} zaváha, zmena, ktorú stálo za to vyskúšať, môže zaniknúť bez zváženia.\n\nTak či onak sa otázka môže rozhodnúť skôr, než sa o veci hovorí, a dôvody na zachovanie súčasného stavu môžu dostať menej priestoru, než by dostali medzi dvoma ľuďmi, ktorí by sa otvorene rozchádzali.',
        },
        aside: {
            en: 'On a change, {mid} can become the swing vote: {lean} tends to guard the routine, and {mid} has no strong pull either way. A proposal can be settled by one person’s lean before anyone has discussed it.',
            sk: 'Pri zmene sa {mid} môže stať jazýčkom na váhach: {lean} zvykne strážiť rutinu a {mid} nemá výrazný sklon ani jedným smerom. Návrh sa môže rozhodnúť podľa toho, kam sa prikloní jeden človek, ešte než sa o veci hovorilo.',
        },
        step: { en: 'Take each proposed change as a question put to both: the one guarding the routine says what it protects, the other says what it might gain.', sk: 'Berte každú navrhnutú zmenu ako otázku pre vás dvoch: ten, kto stráži rutinu, povie, čo chráni, a druhá strana povie, čo by sa mohlo získať.' },
        question: { en: 'Which change has gone ahead, or lapsed, without either of you saying why?', sk: 'Ktorá zmena prebehla alebo zanikla bez toho, aby niekto z vás povedal prečo?' },
    },
    'change-and-steadiness/oneSided:novelty-seeking': {
        title: { en: 'A filter nobody has described', sk: 'Sito, ktoré nikto neopísal' },
        passage: {
            en: 'A tool, a process, a different way to organise the work: {lean} is likely to keep bringing the new. {mid} can take each one up or let it pass, and so can become the filter for the whole stream. Some proposals are adopted, some lapse, and the reasons can stay in one head.\n\n{lean} may meet a pattern of yes and not now that looks arbitrary, because a filter with no stated criteria looks like mood. Proposals may then come more often, in the hope that one gets through, or less often, as the pattern stops making sense. Either way, the conversation about what kind of change the work can carry may not take place.',
            sk: 'Nástroj, postup, iný spôsob organizácie práce: {lean} pravdepodobne prináša stále niečo nové. {mid} môže každý návrh prevziať, alebo nechať prejsť, a tak sa môže stať sitom pre celý prúd. Niektoré návrhy sa ujmú, iné zaniknú a dôvody môžu zostať v jednej hlave.\n\n{lean} môže naraziť na striedanie „áno“ a „teraz nie“, ktoré pôsobí svojvoľne, lebo sito bez vyslovených pravidiel vyzerá ako nálada. Návrhy potom môžu chodiť častejšie, v nádeji, že nejaký prejde, alebo zriedkavejšie, keď to prestane dávať zmysel. Tak či onak sa rozhovor o tom, akú zmenu práca unesie, nemusí vôbec odohrať.',
        },
        aside: {
            en: '{lean} is likely to bring new ideas, and {mid} may take some up and let others pass. Without stated criteria the pattern can look like mood, and the conversation about what change the work can carry may not start.',
            sk: '{lean} pravdepodobne prináša nové nápady a {mid} môže niektoré prijať a iné nechať prejsť. Bez vyslovených pravidiel to môže vyzerať ako nálada a rozhovor o tom, akú zmenu práca unesie, sa nemusí ani začať.',
        },
        step: { en: 'Write down three tests a proposal has to meet before it is tried, and apply them to the next one together.', sk: 'Zapíšte si tri skúšky, ktorými musí návrh prejsť, kým sa vyskúša, a ďalší návrh nimi prejdite spolu.' },
        question: { en: 'What makes a proposal worth trying, and has that been said to the one proposing?', sk: 'Čo robí návrh hodným vyskúšania a povedalo sa to už tomu, kto navrhuje?' },
    },
    /* ------------------------------------------------------------------ initiative (taking-the-lead) */
    'taking-the-lead/shared:assertive': {
        title: { en: 'Whoever circulates first', sk: 'Kto rozošle ako prvý' },
        passage: {
            en: 'When both move first, little room is left for an actual decision. {both} each tend to be sure of the next step, so a second proposal can appear while the first is still being read. The plan sent first can then win on timing alone.\n\nWhere one of the two has more say, the picture shifts. A plan from that side can stand whenever it arrives, and a plan the other sent first can look like a step out of turn. Either way, direction can be set by timing or by rank rather than chosen, and the plan that came second may stop being offered.',
            sk: 'Keď má každý sklon ísť prvý, nezostáva veľa priestoru na spoločné rozhodnutie. {both} majú o ďalšom kroku zvyčajne jasno, takže druhý návrh môže prísť, kým sa prvý ešte len číta, a platiť začne jednoducho ten plán, ktorý niekto rozošle skôr.\n\nKeď má niekto z dvojice väčšie slovo, situácia je trochu iná: plán z tejto strany môže platiť bez ohľadu na to, kedy príde, a plán, ktorý druhá strana poslala skôr, môže pôsobiť ako predbiehanie. Tak či onak môže smer určiť načasovanie alebo postavenie, a nie voľba, a druhý plán už nikto ani nemusí navrhnúť.',
        },
        aside: {
            en: '{both} both tend to take the first step, so little waits for permission. Two proposals can form at once, and direction can go to whichever is sent first, or to whichever comes from the side with more say.',
            sk: '{both} zvyknú robiť prvý krok, takže máločo čaká na povolenie. Naraz môžu vzniknúť dva návrhy a smer môže pripadnúť tomu, ktorý sa odošle skôr, alebo tomu, ktorý príde od strany s väčším slovom.',
        },
        step: { en: 'When both have a proposal ready, put the two side by side before either is sent, and choose between them in one conversation.', sk: 'Keď má každý z vás hotový návrh, položte ich vedľa seba ešte pred odoslaním a vyberte medzi nimi v jednom rozhovore.' },
        question: { en: 'Whose plan is the work following at the moment, and was that ever decided between the two of you?', sk: 'Ktorým plánom sa práca práve riadi a rozhodlo sa o tom niekedy medzi vami dvoma?' },
    },
    'taking-the-lead/shared:receptive': {
        title: { en: 'Refining needs something to refine', sk: 'Dolaďovať sa dá len to, čo existuje' },
        passage: {
            en: 'A meeting can open with nothing on the table. {both} tend to listen closely, ask careful questions and build on whatever is put forward, and nothing is put forward. Each may leave room for the other to begin, and the pause that results can last until a third person fills it.\n\nThe pair can be at its most engaged once a proposal exists, and without a starting point until one appears. Whatever someone else brings can be refined thoroughly and tends to be adopted because it is the only thing on the table. The direction of the work can then be set by whoever outside the pair is willing to propose. The refining that would have improved a first draft is applied to the first draft that happens to arrive.',
            sk: 'Porada sa môže začať bez jediného návrhu. {both} zvyčajne pozorne počúvajú, kladú starostlivé otázky a stavajú na všetkom, čo odznie, lenže nič neodznie. Každý môže nechať začať druhú stranu a pauza, ktorá tak vznikne, môže trvať, kým ticho nezaplní niekto tretí.\n\nDvojica je najviac v živle, keď už nejaký návrh existuje, a kým sa neobjaví, nemá z čoho vyjsť. To, čo prinesie niekto iný, sa môže dôkladne doladiť a býva prijaté preto, že nič iné nie je. Smer práce potom môže určiť ktokoľvek mimo dvojice, kto je ochotný navrhnúť, a dolaďovanie, ktoré by zlepšilo prvý koncept, sa použije na prvý koncept, ktorý náhodou dorazí.',
        },
        aside: {
            en: '{both} are inclined to lead by listening and refining, so a discussion with nothing on the table has nothing to work on. A proposal from someone else tends to be adopted simply because it is the only one.',
            sk: '{both} radšej vedú počúvaním a dolaďovaním, takže diskusia bez návrhu nemá s čím pracovať. Návrh od niekoho iného býva prijatý jednoducho preto, že je jediný.',
        },
        step: { en: 'Take turns bringing a rough first draft to each discussion, so that something is on the table to refine.', sk: 'Striedajte sa v tom, kto na každú diskusiu prinesie hrubý prvý koncept, aby bolo čo dolaďovať.' },
        question: { en: 'What would each of you propose, if it did not need to be finished?', sk: 'S čím by ste prišli, keby to nemuselo byť hotové?' },
    },
    'taking-the-lead/opposed': {
        title: { en: 'Proposal first, shape second', sk: 'Najprv návrh, potom tvar' },
        passage: {
            en: '{p0} tends to send the plan first and {p1} to read it with care, so the careful changes can arrive once work on it has already begun. That division of labour can suit the two: {p0} opens with proposals and {p1} can then shape them, so the work gets both a direction and a second look.\n\nIts weak point is the stretch between proposal and decision, which has no marker. {p0} can take silence for assent and carry on, and {p1} can take the carrying on for a decision already made and hold the objection back. Shaping can then read as hesitation, and proposing as closing the matter. What the stretch lacks is a point at which a proposal is open for shaping, and a point at which the shaping ends and someone decides.',
            sk: '{p0} zvyčajne pošle plán ako prvý a {p1} si návrh pozorne prečíta, takže dôkladné úpravy môžu prísť, keď sa podľa plánu už pracuje. Takéto rozdelenie práce im môže vyhovovať: s návrhmi prichádza {p0} a {p1} ich potom môže dotvoriť, takže práca dostane smer aj druhý pohľad.\n\nSlabým miestom je úsek medzi návrhom a rozhodnutím, ktorý nie je nijako vyznačený. {p0} môže brať ticho za súhlas a pokračovať a {p1} môže brať pokračovanie za rozhodnutie, ktoré už padlo, a námietku si nechať pre seba. Úpravy potom môžu pôsobiť ako váhanie a návrhy ako uzatváranie veci. Chýba bod, v ktorom je návrh pripravený na úpravy, a bod, v ktorom úpravy končia a niekto rozhodne.',
        },
        aside: {
            en: '{p0} tends to take the first step and {p1} to shape what is proposed. The pairing can work as a division of labour until the shaping is read as hesitation or the proposing as a decision already taken.',
            sk: '{p0} zvyčajne robí prvý krok a {p1} dáva tomu, čo sa navrhne, tvar. Takáto deľba práce môže fungovať dovtedy, kým sa úpravy nezačnú brať ako váhanie alebo návrhy ako hotové rozhodnutie.',
        },
        step: { en: 'For the next piece of shared work, say out loud who proposes, who shapes and who has the last word.', sk: 'Pri ďalšej spoločnej práci povedzte nahlas, kto navrhuje, kto upravuje a kto má posledné slovo.' },
        question: { en: 'At what point is a proposal ready to be shaped, and who decides when the shaping is over?', sk: 'Kedy je návrh pripravený na úpravy a kto rozhodne, že úpravy skončili?' },
    },
    'taking-the-lead/opposed:assertive': {
        title: { en: 'Objections that arrive as improvements', sk: 'Námietky, ktoré prídu ako vylepšenia' },
        passage: {
            en: '{first} tends to set the direction and get things moving, and because {first} has more say or experience, a proposal can count as settled from the moment it is voiced. {second} is inclined to listen first and contribute by refining, so a response may come as a suggestion: a better order for the steps, a question about one detail.\n\nIn that setting refining can become the only form disagreement is able to take. A reservation about the direction can arrive in the shape of an improvement to the detail, and {first} may receive many refinements and no disagreement, with no way to tell which is which. What that route cannot carry is the objection that would have changed the plan.',
            sk: '{first} zvyčajne udáva smer a rozhýbe veci, a keďže má väčšie slovo alebo viac skúseností, návrh môže platiť za uzavretý od chvíle, keď zaznie. {second} radšej najprv počúva a prispieva dolaďovaním, takže odpoveď môže prísť ako návrh na vylepšenie: lepšie poradie krokov, otázka k jednému detailu.\n\nV takom prostredí sa dolaďovanie môže stať jedinou podobou, akú nesúhlas môže mať. Výhrada k smeru môže prísť preoblečená za vylepšenie detailu a {first} môže dostávať veľa vylepšení a žiadny nesúhlas a nemá ako rozoznať, čo je čo. Táto cesta neunesie námietku, ktorá by plán zmenila.',
        },
        aside: {
            en: 'Once {first}, who tends to set direction and has more say or experience, voices a proposal, it can function as a decision. {second} is inclined to refine, and a reservation about the direction may come out as a tweak to the detail.',
            sk: 'Keď {first} zvykne udávať smer a má väčšie slovo alebo viac skúseností, vyslovený návrh môže fungovať ako rozhodnutie. {second} radšej dolaďuje a výhrada k smeru môže vyjsť ako úprava detailu.',
        },
        step: { en: 'Before a proposal is settled, ask for the strongest objection to the direction itself, and treat refinements as a separate question.', sk: 'Skôr než sa návrh uzavrie, vypýtajte si najsilnejšiu námietku proti samotnému smeru a vylepšenia berte ako samostatnú otázku.' },
        question: { en: 'What would make it safe to say “I do not think we should do this” before a plan starts moving?', sk: 'Čo by umožnilo bezpečne povedať „nemyslím si, že by sme to mali robiť“, ešte kým sa plán nerozbehol?' },
    },
    'taking-the-lead/opposed:receptive': {
        title: { en: 'The later word carries more weight', sk: 'Neskoršie slovo váži viac' },
        passage: {
            en: '{second} tends to take the first step and get the work moving. {first} is inclined to listen, take what has been put forward and improve it, and to speak last with the weight of more say or experience. The two are not slow and fast so much as moving at different points in one decision: one at its start, the other at its close.\n\nThe friction sits in between. By the time {first} has weighed the proposal, the work may already be running at the pace {second} set, and a refinement can arrive as a brake on something in motion. {second} can find it hard to tell whether the silence means approval, and may keep going; {first} may find the direction already set by the one with less say or experience. Who owns the direction is the question the sequence leaves open.',
            sk: '{second} zvyčajne urobí prvý krok a rozhýbe prácu. {first} radšej počúva, vezme, čo sa navrhlo, a vylepší to; vyjadruje sa až nakoniec a s váhou, ktorú dáva väčšie slovo alebo skúsenosť. Nejde ani tak o pomalosť a rýchlosť ako o to, že sa každý z nich pohne v inom bode jedného rozhodovania: jedna strana na začiatku, druhá na konci.\n\nTrenie vzniká medzi tým. Kým {first} návrh zváži, práca už môže bežať tempom, ktoré udáva {second}, a vylepšenie môže prísť ako brzda na niečo, čo už ide. {second} nemusí vedieť posúdiť, či ticho znamená schválenie, a môže pokračovať; {first} môže zistiť, že smer už určila strana s menším slovom alebo menej skúsenosťami. Poradie krokov necháva otvorené, komu smer patrí.',
        },
        aside: {
            en: 'The two move at different points in one decision: {second} tends to move first, and {first} refines and speaks last with more say or experience. The sequence can leave open who owns the direction.',
            sk: 'Dvojica sa pohne v rôznych bodoch jedného rozhodovania: {second} zvyčajne začína a {first} dolaďuje a vyjadruje sa až nakoniec, s väčším slovom alebo skúsenosťou. Poradie môže nechať otvorené, komu smer patrí.',
        },
        step: { en: 'Agree what silence means in the stretch between a proposal and a decision, and who says out loud when the work can safely start.', sk: 'Dohodnite sa, čo znamená ticho v úseku medzi návrhom a rozhodnutím, a kto nahlas povie, kedy sa môže práca bezpečne rozbehnúť.' },
        question: { en: 'At what point does a proposal become something the work can start from, and who says so?', sk: 'Kedy sa z návrhu stáva niečo, od čoho sa dá s prácou začať, a kto to povie?' },
    },
    'taking-the-lead/oneSided:assertive': {
        title: { en: 'A role decided by speed', sk: 'Úlohu rozhoduje rýchlosť' },
        passage: {
            en: '{lean} tends to move first, and {mid} has no strong pull toward leading or waiting. Which role {mid} takes can then be settled by how quickly {lean} moves. If {lean} moves fast, {mid} may follow and refine; if there is a pause, {mid} may step forward, so the same person can follow in one meeting and lead in the next.\n\nThe pair can get a way of working that seems to run without friction, and a lead that is set by timing rather than by anything either decided. The question of what {mid} would propose, given the room, can go unasked.',
            sk: '{lean} zvyčajne začína a {mid} nemá výrazný sklon viesť ani čakať. Akú úlohu {mid} prevezme, potom môže závisieť od toho, ako rýchlo sa {lean} rozbehne. Ak {lean} začne rýchlo, {mid} môže nasledovať a dolaďovať; ak nastane pauza, {mid} môže vystúpiť dopredu, takže na jednej porade môže ísť za druhou stranou a na ďalšej viesť.\n\nDvojica tak môže dostať spôsob práce, ktorý akoby bežal bez trenia, a vedenie dané načasovaním, nie niečím, o čom by niekto z nich rozhodol. Otázka, čo navrhuje {mid}, keď má dosť priestoru, sa nemusí vôbec položiť.',
        },
        aside: {
            en: '{lean} is likely to take the first step, and {mid} has no strong pull either way. Which role {mid} plays can then be set by how quickly {lean} moves, and what {mid} would propose, given the room, may stay unasked.',
            sk: '{lean} pravdepodobne urobí prvý krok a {mid} nemá výrazný sklon ani jedným smerom. Akú úlohu {mid} zohrá, môže potom určiť tempo, akým sa {lean} rozbieha, a otázka, čo navrhuje {mid}, keď má dosť priestoru, môže zostať nepoložená.',
        },
        step: { en: 'Once in a while, let the one who tends to wait open the discussion, and let the other hold back until the proposal is on the table.', sk: 'Raz za čas nech diskusiu otvorí ten z vás, kto zvyčajne čaká, a druhá strana nech počká, kým nezaznie návrh.' },
        question: { en: 'What would each of you propose first if the other waited?', sk: 'Aký návrh by od každého z vás zaznel ako prvý, keby druhá strana počkala?' },
    },
    'taking-the-lead/oneSided:receptive': {
        title: { en: 'The first word in a quiet room', sk: 'Prvé slovo v tichej miestnosti' },
        passage: {
            en: 'Say a meeting starts and nobody speaks. {lean} tends to contribute by listening and refining, and to wait for something to refine; {mid}, with no strong pull either way, can step forward and break the silence. Done once, it is a favour. Repeated, it can become a pattern.\n\nA role taken up to break a silence can settle into the way things are done. {mid} can become the one who opens and {lean} the one who answers, though neither chose it. The loss is quiet on both sides. {mid} carries the starting, and {lean}, who comes into play on the second draft, may be asked for it only after the first has already taken its shape.',
            sk: 'Povedzme, že sa porada začne a nikto nehovorí. {lean} zvyčajne prispieva počúvaním a dolaďovaním a čaká na niečo, čo sa dá dolaďovať; {mid} bez výrazného sklonu jedným či druhým smerom môže vystúpiť a ticho prelomiť. Raz je to láskavosť. Keď sa to opakuje, môže z toho byť zvyk.\n\nÚloha prevzatá na prelomenie ticha sa môže usadiť ako spôsob práce, takže {mid} začne otvárať a {lean} odpovedať, hoci si to nikto nezvolil. Strata je tichá pre každú stranu: {mid} nesie začínanie a {lean} prichádza na rad pri druhom koncepte, no k slovu sa môže dostať až vtedy, keď prvý koncept už dostal svoj tvar.',
        },
        aside: {
            en: 'A role taken up once to break a silence can harden into the way things are done. {lean} tends to lead by refining, and {mid} can step forward when nobody else does, though neither may have chosen the arrangement.',
            sk: 'Úloha prevzatá raz na prelomenie ticha sa môže stať zaužívaným spôsobom práce. {lean} zvyčajne vedie dolaďovaním a {mid} môže vystúpiť, keď to nikto iný neurobí, hoci si takéto usporiadanie nemusel zvoliť nikto.',
        },
        step: { en: 'Alternate who opens the next few discussions, and notice what changes in the first draft when the other one starts.', sk: 'Striedajte sa v otváraní niekoľkých ďalších diskusií a všímajte si, čo sa zmení v prvom koncepte, keď začne druhá strana.' },
        question: { en: 'Who opens discussions at the moment, and was that ever a choice?', sk: 'Kto dnes diskusie otvára a bola to niekedy voľba?' },
    },
    /* ------------------------------------------------------------------ abstraction (practical-and-conceptual) */
    'practical-and-conceptual/shared:practical': {
        title: { en: 'Next steps without a direction', sk: 'Ďalšie kroky bez smeru' },
        passage: {
            en: 'A review can find every item on track and nobody able to say why one of them exists. That is the risk for two people who both think in next steps, owners and deadlines: each task tends to be checked against the next delivery and none against the direction. Most questions are about the step in front.\n\nThe work moves, and the reason for it can be held by neither, as if it were kept somewhere else. When {both} are practical, the question of where it all leads has no owner unless one of the two takes it on deliberately.',
            sk: 'Kontrola stavu môže ukázať, že každá položka je v poriadku, a nikto pritom nevie povedať, prečo niektorá z nich existuje. To je riziko dvoch ľudí, ktorí myslia v ďalších krokoch, v tom, kto čo vybaví, a v termínoch: každá úloha sa zvyčajne meria najbližším odovzdaním a žiadna smerom. Väčšina otázok sa týka kroku, ktorý je na rade.\n\nPráca napreduje a dôvod, prečo sa robí, nemusí držať ani jeden z nich, akoby bol uložený niekde inde. Keď {both} myslia prakticky, otázka, kam to celé vedie, nemá majiteľa, pokiaľ sa tejto otázky niekto z dvojice zámerne neujme.',
        },
        aside: {
            en: '{both} both lean toward next steps and deadlines, so the work moves and the larger question can go unasked. Each task is checked against the next delivery, none against the direction.',
            sk: '{both} sa prikláňajú k ďalším krokom a termínom, takže práca napreduje a väčšia otázka môže zostať nepoložená. Každá úloha sa meria najbližším odovzdaním, žiadna smerom.',
        },
        step: { en: 'Put one item on the agenda at regular intervals that is not about a task: what the work is for, and whether it is still pointed there.', sk: 'Dávajte v pravidelných odstupoch na program jednu tému, ktorá nie je o úlohe: načo práca slúži a či stále mieri tým smerom.' },
        question: { en: 'If someone asked what the work is for, would the two of you give the same answer?', sk: 'Keby sa niekto opýtal, načo práca slúži, odpovedali by ste vy dvaja rovnako?' },
    },
    'practical-and-conceptual/shared:conceptual': {
        title: { en: 'Options at the rate of two minds', sk: 'Možností pribúda, rozhodnutí nie' },
        passage: {
            en: 'Ideas are seldom closed here; they are extended. {both} tend to build on each other’s ideas: one suggests a pattern, the other sees a wider one. A conversation that began with a question can end with more possible answers than it began with. The talk is the strength of the pair, opening possibilities that neither would have seen alone.\n\nThe other side is the end of the conversation. Options can multiply at the rate of two minds and decisions at the rate of none, and each may leave with a different next step or none. Choosing would mean letting some ideas go, and the first task can wait for someone willing to do that.',
            sk: 'Nápady sa tu len zriedka uzatvárajú; skôr sa rozširujú. {both} zvyčajne nadväzujú na nápady druhej strany: jedna navrhne súvislosť, druhá uvidí širšiu a rozhovor, ktorý začal otázkou, môže skončiť s viacerými možnými odpoveďami, než mal na začiatku. Rozhovor je silnou stránkou dvojice a otvára možnosti, ktoré by nik z nich osamote nevidel.\n\nDruhou stranou je koniec rozhovoru. Možností môže pribúdať tempom dvoch myslí a rozhodnutí tempom žiadnej a každý môže odísť s iným ďalším krokom, alebo s nijakým. Vybrať by znamenalo niektoré nápady pustiť a prvá úloha môže čakať, kým sa nájde niekto ochotný to urobiť.',
        },
        aside: {
            en: '{both} can each build on the other’s ideas, so options multiply faster than they are chosen. A conversation can end with more options than it began with and none of them picked.',
            sk: '{both} môžu nadväzovať na nápady druhej strany, takže možností pribúda rýchlejšie, než sa vyberajú. Rozhovor sa môže skončiť s viacerými možnosťami, než mal na začiatku, a bez jedinej vybranej.',
        },
        step: { en: 'End each conversation by choosing one idea and naming who takes its first step, and park the others on a list.', sk: 'Každý rozhovor ukončite výberom jedného nápadu a pomenovaním toho, kto urobí prvý krok, a ostatné odložte na zoznam.' },
        question: { en: 'Which idea from the last few conversations has a first step and an owner?', sk: 'Ktorý nápad z posledných rozhovorov má prvý krok a majiteľa?' },
    },
    'practical-and-conceptual/opposed': {
        title: { en: 'Two ways of taking an idea seriously', sk: 'Dva spôsoby, ako brať nápad vážne' },
        passage: {
            en: 'When {p1} describes where the work could go, {p0} may ask for the first step. A question about the first step can be a way of taking the idea seriously, and it can sound like a cut. A reply about the larger pattern can be a way of defending the idea, and it can sound like a dodge.\n\nEach form of attention can read as its opposite from the other side, and the exchange can turn into two people repeating their own question. When it works, {p1} supplies the direction and {p0} turns it into steps, owners and dates, and each makes the other’s contribution real. When it does not, the plan can stay small and the idea unbuilt.',
            sk: 'Keď {p1} opisuje, kam by práca mohla smerovať, {p0} sa môže spýtať na prvý krok. Otázka na prvý krok môže byť spôsobom, ako vziať nápad vážne, a zároveň môže znieť ako škrt. Odpoveď o širšej súvislosti môže byť spôsobom, ako nápad obhájiť, a zároveň môže znieť ako vyhýbanie sa odpovedi.\n\nKaždý z týchto spôsobov pozornosti môže druhej strane pripadať ako svoj opak a výmena sa môže zmeniť na dvoch ľudí, ktorí opakujú každý svoju otázku. Keď to funguje, {p1} dodáva smer a {p0} premieňa smer na kroky, mená a termíny, takže príspevok každého sa stáva skutočným. Keď nie, plán môže zostať malý a z nápadu nič nevznikne.',
        },
        aside: {
            en: 'Each question can be a way of taking an idea seriously: {p1} tends to describe where the work could go, and {p0} to ask for the first step. Each can sound to the other like a cut or a dodge.',
            sk: 'Každá otázka môže byť spôsobom, ako vziať nápad vážne: {p1} zvyčajne opisuje, kam by práca mohla smerovať, a {p0} sa pýta na prvý krok. Druhej strane však môže každá znieť ako škrt alebo vyhýbanie sa.',
        },
        step: { en: 'Give every idea two sentences: one that says where it leads, and one that says what the first step is and who takes it.', sk: 'Ku každému nápadu pripíšte dve vety: jednu o tom, kam nápad vedie, a druhú o tom, aký je prvý krok a kto sa do toho pustí.' },
        question: { en: 'When an idea meets a question about its first step, what does each of you hear in it?', sk: 'Keď nápad narazí na otázku o prvom kroku, čo v tom počuje každý z vás?' },
    },
    'practical-and-conceptual/opposed:practical': {
        title: { en: 'A question every idea has to pass', sk: 'Otázka, ktorou musí nápad prejsť' },
        passage: {
            en: 'The first question {first} is likely to ask is what can be delivered, by whom and by when. Because {first} has more say or experience, the question can work as a filter on everything {second} brings. Ideas that can be stated as a task tend to go through, and the others to fall away. {second} tends to think in direction and connection, and some of what {second} sees is hard to state as a task.\n\nTwo things can follow. {second} may learn to shrink ideas before voicing them, or hold them back, and {first} then receives the wider pattern only in the form that survives translation. The filter is useful, and it is also a choice about what the work gets to hear.',
            sk: 'Prvá otázka, ktorú {first} pravdepodobne položí, znie: čo sa dá dodať, kým a dokedy. Keďže {first} má väčšie slovo alebo viac skúseností, otázka môže fungovať ako sito na všetko, čo prináša {second}: nápady, ktoré sa dajú vyjadriť ako úloha, zvyčajne prejdú, ostatné odpadnú. {second} zvyčajne myslí v smere a súvislostiach a časť toho, čo {second} vidí, sa ako úloha vyjadruje ťažko.\n\nMôžu z toho vyplynúť dve veci. {second} sa môže naučiť nápady pred vyslovením zmenšovať, alebo ich nechávať pre seba, a {first} potom dostane širší obraz len v podobe, ktorá prežije preklad. Takéto sito je užitočné a zároveň je to rozhodnutie o tom, čo sa práci dovolí počuť.',
        },
        aside: {
            en: 'Ideas that cannot be stated as a task can fall away when {first}, who tends to ask what can be delivered, has more say or experience. {second} may come to offer only what survives translation into a step.',
            sk: 'Nápady, ktoré sa nedajú vyjadriť ako úloha, môžu odpadnúť, keď {first} zvykne klásť otázku, čo sa dá dodať, a má pritom väčšie slovo alebo viac skúseností. {second} môže začať ponúkať len to, čo prežije preklad do kroku.',
        },
        step: { en: 'Leave a place in the discussion for ideas that are not yet tasks, and decide together later which of them become one.', sk: 'Nechajte v diskusii miesto aj pre nápady, ktoré ešte nie sú úlohami, a až neskôr spolu rozhodnite, ktoré z nich sa nimi stanú.' },
        question: { en: 'Which idea went unspoken because it could not yet be stated as a task?', sk: 'Ktorý nápad zostal nevyslovený, lebo sa ešte nedal vyjadriť ako úloha?' },
    },
    'practical-and-conceptual/opposed:conceptual': {
        title: { en: 'An inspiring paragraph, no first task', sk: 'Pôsobivý odsek, žiadna prvá úloha' },
        passage: {
            en: 'In wide strokes, {first} can sketch where the work could lead, and {second} may leave the meeting with an inspiring paragraph and no first task. The translation from direction to steps, owners and dates is real work, and it tends to fall to the one with less say or experience.\n\nTo do it, {second} has to ask the questions that sound like objections: what exactly, by when, who decides. Asking them of someone who holds the direction carries some risk of sounding like doubt, and when the ideas move, the plan has to be rebuilt. The one with more say or experience holds the direction, the other the translation, and it is in the translation that the direction becomes real or does not.',
            sk: 'Vo veľkých líniách môže {first} načrtnúť, kam by práca mohla smerovať, a {second} môže odísť z porady s pôsobivým odsekom a bez prvej úlohy. Preklad od smeru ku krokom, menám a termínom je skutočná práca a zvyčajne pripadne strane s menším slovom alebo menej skúsenosťami.\n\nNa to musí {second} klásť otázky, ktoré znejú ako námietky: čo presne, dokedy, kto rozhoduje. Pýtať sa tak niekoho, kto drží smer, nesie isté riziko, že to zaznie ako pochybnosť, a keď sa nápady pohnú, plán treba prestavať. Strana s väčším slovom alebo skúsenosťami drží smer, druhá preklad, a práve v preklade sa smer buď stane skutočným, alebo nie.',
        },
        aside: {
            en: '{first} can set a wide direction, and {second} is left to translate it into steps, owners and dates. The translation is real work, and the questions it needs can sound like objections.',
            sk: '{first} môže nastaviť široký smer a {second} zostane s prekladom do krokov, mien a termínov. Preklad je skutočná práca a otázky, ktoré si žiada, môžu znieť ako námietky.',
        },
        step: { en: 'After a direction is described, the one who described it also names the first step and its owner, however rough.', sk: 'Keď niekto opíše smer, nech k tomu hneď pridá aj prvý krok a meno toho, kto začne, hoci len zhruba.' },
        question: { en: 'What would the other need to hear to believe a direction is ready to start?', sk: 'Čo by druhá strana potrebovala počuť, aby uverila, že smer je pripravený na začiatok?' },
    },
    'practical-and-conceptual/oneSided:practical': {
        title: { en: 'The altitude of the conversation', sk: 'Výška, na ktorej sa rozhovor usadí' },
        passage: {
            en: 'A conversation between the two can settle at ground level. {lean} tends to think in next steps and deadlines, while {mid} has no strong pull toward either the task or the larger pattern. The talk then tends to settle at the altitude of the firmer lean. {mid} may come down to the ground, since that is where the talk is, and the wider view can go unspoken.\n\nThe pair can then have two people at ground level, and whatever larger picture {mid} might have brought is adapted away. The wider view may be within reach but not on offer, and the question of where the work is heading waits for someone to ask it.',
            sk: 'Rozhovor dvojice sa môže usadiť pri zemi. {lean} zvyčajne myslí v ďalších krokoch a termínoch, kým {mid} nemá výrazný sklon ani k úlohe, ani k širšiemu obrazu. Rozhovor sa potom zvyčajne drží úrovne konkrétnych krokov: {mid} môže zostúpiť na zem, lebo tam sa hovorí, a širší pohľad môže zostať nevyslovený.\n\nDvojica tak môže mať dvoch ľudí pri zemi a väčší obraz, ktorý môže mať {mid} v zálohe, sa pri prispôsobovaní stratí. Širší pohľad môže byť poruke, no zostáva neponúknutý, a otázka, kam práca smeruje, čaká, kým sa niekto opýta.',
        },
        aside: {
            en: 'The conversation can settle at ground level: {lean} tends to think in next steps, and {mid} has no strong pull either way. A wider view may be within reach, but it is not on offer until someone asks.',
            sk: 'Rozhovor sa môže usadiť pri zemi: {lean} zvyčajne myslí v krokoch a {mid} nemá výrazný sklon ani jedným smerom. Širší pohľad môže byť poruke, no zostáva neponúknutý, kým sa niekto neopýta.',
        },
        step: { en: 'Once in a while, open a discussion by asking the one less tied to the task list for the wider view, before any task is mentioned.', sk: 'Raz za čas začnite diskusiu otázkou na širší pohľad na prácu, ešte než sa spomenie niektorá úloha, a nech odpovie ten z vás, kto je menej pripútaný k zoznamu úloh.' },
        question: { en: 'What would change in the first minutes of a meeting if it opened with the wider view?', sk: 'Čo by sa zmenilo v prvých minútach porady, keby sa otvorila otázkou na širší pohľad?' },
    },
    'practical-and-conceptual/oneSided:conceptual': {
        title: { en: 'Every translation drops something', sk: 'Každý preklad niečo zahodí' },
        passage: {
            en: 'Where {lean} sees a direction and its connections, {mid}, who leans neither toward the picture nor toward the step, can end up doing the translating. An idea then has a route to a next step.\n\nA translation is also an interpretation. In turning the idea into a task, {mid} can decide what it meant, what to leave out and what to put first. The result can arrive as a delivered thing rather than an altered one. {lean} may see the finished work and recognise only some of it. Every translation drops something, and the question is whether the person who had the idea gets to see what.',
            sk: 'Kde {lean} vidí smer a súvislosti, tam môže prekladanie napokon prevziať {mid}, keďže sa neprikláňa ani k obrazu, ani ku kroku. Nápad tak má cestu k ďalšiemu kroku.\n\nPri premene nápadu na úlohu sa však zároveň rozhoduje, čo nápad znamenal: {mid} môže určiť, čo vynechať a čo dať na prvé miesto, a výsledok môže doraziť ako dodaná vec, nie ako upravená. {lean} môže vidieť hotovú prácu a spoznať z nápadu len časť. Pri každom preklade sa niečo stratí a otázka je, či sa človek, od ktorého nápad pochádza, dozvie, čo to bolo.',
        },
        aside: {
            en: 'Every translation also interprets: {lean} tends to bring the direction, and {mid} can turn it into a task. What was cut or reordered on the way may not be visible to the one who had the idea.',
            sk: 'Keď sa z nápadu robí úloha, zároveň sa rozhoduje, čo nápad znamená: {lean} zvyčajne prináša smer a {mid} môže smer premeniť na úlohu. To, čo sa po ceste vynechalo alebo prestavilo, nemusí byť vidieť človeku, od ktorého nápad pochádza.',
        },
        step: { en: 'When an idea becomes a task, write beside the task what was left out, so the owner of the idea can add it back or let it go.', sk: 'Keď sa z nápadu stane úloha, napíšte k úlohe, čo sa vynechalo, aby človek, od ktorého nápad pochádza, mohol vynechané vrátiť, alebo to nechať tak.' },
        question: { en: 'What did the last idea lose on its way to becoming a task, and was that a choice?', sk: 'Čo posledný nápad cestou k úlohe stratil a bola to voľba?' },
    },
};
export default WORK_B;
