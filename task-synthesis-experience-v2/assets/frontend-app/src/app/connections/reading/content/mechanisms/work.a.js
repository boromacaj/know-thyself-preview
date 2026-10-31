/**
 * WORK. The weight falls on complementarity: how two approaches can strengthen each other, where coordination breaks down, how decisions and communication can be arranged so that a difference is worked with. Nothing here says anything about competence or performance. Part a (inner focus, reasoning, autonomy, structure, risk).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 */
const WORK_A = {
    /* ------------------------------------------------------------------ inner focus: processing-pace */
    'processing-pace/shared:introspective': {
        title: { en: 'Finished thoughts, unfinished questions', sk: 'Hotové myšlienky, nevyslovené otázky' },
        passage: {
            en: '{both} tend to settle a problem inwardly before saying anything, so what passes between them is likely to be a finished thought: a considered message, a proposal that has already met its own objections. Less may need redoing, and nobody is made to listen to a thought on its way to becoming one.\n\nWhat is not yet finished is another matter. A doubt about the brief, a half-noticed gap in a handover, a question not yet worth asking: each may hold it until it is ready and take the other’s silence to mean that no problem was seen. A shared document can then carry the same unspoken gap all the way to the review. The shortage, where there is one, is not of thought but of a place where an unfinished thought is allowed to be said.',
            sk: '{both} si problém zvyčajne najprv premyslia každý sám, a tak si medzi sebou podávajú skôr hotové myšlienky: rozmyslenú správu, návrh, ktorý si už poradil s vlastnými námietkami. Menej sa potom prerába a nikto nemusí počúvať, ako sa myšlienka ešte len rodí.\n\nS tým, čo ešte hotové nie je, je to iné. Pochybnosť o zadaní, sotva zbadaná medzera pri odovzdávaní práce, otázka, ktorá ešte nestojí za opýtanie: každý si takú vec môže nechať pre seba, kým nedozrie, a ticho druhej strany pokladať za znak, že problém nikto nevidí. Spoločný dokument potom môže tú istú nevyslovenú medzeru dovliecť až na záverečnú kontrolu. Ak tu niečo chýba, nie je to premýšľanie, ale miesto, kde sa smie povedať aj nedokončená myšlienka.',
        },
        aside: {
            en: 'Once {both} have settled a thought inwardly, it tends to arrive finished, and the unfinished ones can stay put. A doubt about a handover may then go unsaid on both sides, while the quiet on the other side looks like an all-clear.',
            sk: 'Keď si {both} myšlienku najprv premyslia v sebe, prichádza zvyčajne hotová a tie nedokončené môžu ostať bokom. Pochybnosť pri odovzdávaní práce potom nemusí zaznieť ani z jednej strany, kým ticho druhej strany pôsobí ako znamenie, že je všetko v poriadku.',
        },
        step: { en: 'Agree on one regular place, however short, where an unfinished thought may be put on the table with the label that it is unfinished.', sk: 'Dohodnite si jedno pravidelné miesto, hoci aj krátke, kde sa dá povedať nedokončená myšlienka s poznámkou, že ešte nie je hotová.' },
        question: { en: 'Which doubt would be easier to raise if it were allowed to arrive half-formed?', sk: 'Ktorú pochybnosť by ste ľahšie povedali, keby mohla prísť aj nedomyslená?' },
    },
    'processing-pace/shared:outwardly-engaged': {
        title: { en: 'Thinking aloud, together', sk: 'Premýšľanie nahlas, spolu' },
        passage: {
            en: 'Given a problem, {both} are likely to turn it into a conversation before it becomes a task. Each tends to find out what is meant by hearing it said back, so an idea can be shaped, challenged and reshaped in the open while it is still cheap to change.\n\nThe weak point is the end of the conversation. A thought voiced in passing can sound like a decision, and the moment when talking became agreeing is hard to find afterwards. A call can end in good spirits and each can then set off on a slightly different plan. What the pair is short of is not talk but one moment, said aloud, when the thinking stops and something is settled.',
            sk: 'Keď {both} dostanú problém, pravdepodobne z problému najprv urobia rozhovor a až potom úlohu. Každý často zistí, čo vlastne myslí, až keď to vysloví a dostane odpoveď, takže nápad sa môže otvorene tvarovať, spochybňovať a prerábať, kým sa ešte dá lacno zmeniť.\n\nSlabé miesto je koniec rozhovoru. Myšlienka vyslovená mimochodom môže znieť ako rozhodnutie a chvíľa, keď sa z rozprávania stala dohoda, sa potom ťažko hľadá. Hovor môže skončiť v dobrej nálade a každý sa potom môže pustiť do trochu iného plánu. Dvojici nechýba rozhovor, ale jedna nahlas povedaná chvíľa, keď sa premýšľanie skončí a niečo sa dohodne.',
        },
        aside: {
            en: '{both} can move an idea quickly by talking it through, each finding out what is meant from the answer. The edge of the talk is the weak point: a remark made in passing can pass for a decision, and each may leave with a slightly different version of what was agreed.',
            sk: '{both} vedia nápad rýchlo posunúť rozhovorom, lebo každý zistí, čo myslí, až z odpovede. Najslabší je koniec rozhovoru: poznámka hodená mimochodom môže prejsť za rozhodnutie a každý môže odísť s trochu inou verziou toho, čo sa dohodlo.',
        },
        step: { en: 'End each working conversation by saying aloud what was decided and what is still open, and let one of the two put it in writing.', sk: 'Každý pracovný rozhovor zakončite tým, že nahlas poviete, čo sa rozhodlo a čo ostáva otvorené; jeden z vás to potom zapíše.' },
        question: { en: 'After a conversation between you that ran well, would each of you name the same thing as decided?', sk: 'Keď sa váš rozhovor skončí dobre, pomenovali by ste ako dohodnutú tú istú vec?' },
    },
    'processing-pace/opposed': {
        title: { en: 'Workshop for one, input for the other', sk: 'Dielňa pre jedného, podklad pre druhého' },
        passage: {
            en: 'A meeting can be a different thing for each of the two. {p1} tends to do the thinking in it, by saying a half-formed idea and hearing it answered. {p0} is more likely to take in the material there and think it through afterwards, alone. Between them the work can get a wide first opening and a considered second look, and each is hard to produce without the other.\n\nThe snag is the order. A decision can be reached in the room while {p0} is still thinking, so the objection that arrives afterwards looks like going back on the agreement. {p1} can hear it that way, while {p0} may simply have reached the first moment at which it could be said. Such an objection is not late; the meeting was early for it.',
            sk: 'Porada môže byť pre každého z dvojice niečo iné. {p1} na porade zvyčajne premýšľa: povie nedokončený nápad a počúva, čo sa naň odpovie. {p0} tam skôr zbiera podklady a premyslí si ich až potom, osamote. Práca tak môže dostať široký začiatok aj premyslený druhý pohľad a jedno bez druhého sa získava ťažko.\n\nZádrhel je v poradí. Rozhodnutie môže na porade padnúť, kým {p0} ešte premýšľa, a námietka, ktorá príde potom, vyzerá ako ústup z dohody. {p1} to tak môže počuť, hoci {p0} sa možno len dostáva k prvej chvíli, keď sa to dá povedať. Taká námietka neprichádza neskoro; skôr porada prišla priskoro.',
        },
        aside: {
            en: 'In a meeting {p1} tends to think aloud, while {p0} is more likely to think before and after it, alone. A decision taken in the room can come while {p0} is still weighing it, so a later objection may sound like a reversal.',
            sk: 'Na porade {p1} zvyčajne premýšľa nahlas, kým {p0} skôr premýšľa pred poradou a po porade, osamote. Rozhodnutie môže na porade padnúť, kým {p0} ešte zvažuje, a neskoršia námietka potom môže znieť ako zvrat.',
        },
        step: { en: 'Send the question or the agenda ahead of the meeting, and name a time by which a considered answer is expected afterwards.', sk: 'Pošlite otázku alebo program vopred a určte, dokedy sa potom čaká premyslená odpoveď.' },
        question: { en: 'Which decisions could stay open until everyone has had time to think, and which need the room?', sk: 'Ktoré rozhodnutia môžu počkať, kým si ich každý premyslí, a ktoré treba urobiť priamo na porade?' },
    },
    'processing-pace/opposed:introspective': {
        title: { en: 'A pause that weighs more than the thinking', sk: 'Pauza váži viac než samotné premýšľanie' },
        passage: {
            en: '{second} tends to think aloud, offering a rough idea in order to find out what it is. {first} is more inclined to settle things inwardly and answer once the thought is finished. Because {first} has more say or more experience in the exchange, the pause after a rough idea can carry more weight than was meant. {second} can hear it as a verdict on the idea when it is only the time a thought takes.\n\nWork may then move ahead on a guess at what the silence meant, and the considered answer, when it comes, can meet something already built. A pause that arrives with a name, an answer that is owed and a point at which it will come, is heard quite differently from one that arrives bare.',
            sk: '{second} zvykne premýšľať nahlas a hrubým nápadom zisťuje, čo vlastne je. {first} si veci skôr premyslí v sebe a ozve sa, až keď je myšlienka hotová. Keďže {first} má v rozhovore väčšie slovo alebo viac skúseností, pauza po hrubom nápade môže vážiť viac, než mala. {second} môže tú pauzu počuť ako ortieľ nad nápadom, hoci je to len čas, ktorý myšlienka potrebuje.\n\nPráca sa potom môže rozbehnúť na domnienke o tom, čo ticho znamenalo, a premyslená odpoveď, keď príde, môže naraziť na hotovú vec. Pauza, pri ktorej zaznie, že odpoveď príde a kedy, sa počúva celkom inak než holé ticho.',
        },
        aside: {
            en: 'When {first} goes quiet to think, the pause can weigh more than the thinking, since it comes from the side with more say or experience. {second} may take the silence for a judgement on a rough idea, and work can start on a guess about what it meant.',
            sk: 'Keď sa {first} odmlčí kvôli premýšľaniu, pauza môže vážiť viac než samotné premýšľanie, lebo prichádza od strany s väčším slovom alebo skúsenosťami. {second} môže ticho vziať za súd nad hrubým nápadom a práca sa môže rozbehnúť na domnienke, čo znamenalo.',
        },
        step: { en: 'Let the one with more say answer a rough idea at once with a time for the considered reply, even when the reply itself has to wait.', sk: 'Nech strana s väčším slovom na hrubý nápad hneď aspoň povie, kedy príde premyslená odpoveď, aj keď samotná odpoveď počká.' },
        question: { en: 'When a rough idea is offered, how can the other tell whether a silence means thinking, doubt or no?', sk: 'Podľa čoho sa pri hrubom nápade pozná, či ticho znamená premýšľanie, pochybnosť alebo nesúhlas?' },
    },
    'processing-pace/opposed:outwardly-engaged': {
        title: { en: 'A passing thought heard as an instruction', sk: 'Nápad mimochodom, ktorý znie ako pokyn' },
        passage: {
            en: 'Ideas can be voiced while they are still being found, since {first} is likely to think by talking, and the work can gain a quick, open start. Coming from the side with more say or more experience, though, a passing thought can carry weight it was not meant to have. {second}, who is more inclined to settle things inwardly, may take what was said seriously and begin carrying it out with care, while {first} has moved on to the next idea.\n\nThe cost on the quiet side is the same fact from the other end: the conversation can outpace inward thinking, and an objection that could change the plan may stay inside until the work shows it. Much turns on whether anyone marks which sentences were wondering and which were asking.',
            sk: 'Nápady často zaznejú ešte vtedy, keď sa len hľadajú, lebo {first} pravdepodobne premýšľa rozprávaním; práca tak získa rýchly, otvorený začiatok. Od strany s väčším slovom alebo skúsenosťami však aj myšlienka hodená mimochodom môže vážiť viac, než mala. {second} si veci skôr premyslí v sebe, povedané možno vezme vážne a začne to svedomito plniť, kým {first} je už pri ďalšom nápade.\n\nNa tichej strane sa to isté prejaví z druhého konca: rozhovor ľahko beží rýchlejšie, než stačí premýšľanie v tichu, a námietka, ktorá by zmenila plán, neraz ostane nevyslovená, kým sa neukáže na samotnej práci. Veľa záleží na tom, či niekto rozlíši, ktoré vety boli len uvažovanie a ktoré už žiadosť.',
        },
        aside: {
            en: 'When {first} thinks aloud, a passing idea can be taken as direction, since it comes from the side whose word carries more weight. {second} may quietly start work on it, while {first} is already onto the next one.',
            sk: 'Keď {first} premýšľa nahlas, nápad hodený mimochodom sa môže brať ako smer, lebo prichádza od strany, ktorej slovo má väčšiu váhu. {second} sa môže potichu pustiť do práce na nápade, kým {first} je už pri ďalšom.',
        },
        step: { en: 'When thinking aloud, the one with more say can open with a short marker, such as “thinking, not asking”, and say “now it is a request” when it becomes one.', sk: 'Pri premýšľaní nahlas môže strana s väčším slovom začať krátkou poznámkou, napríklad „len rozmýšľam, nič nežiadam“, a keď z nápadu vznikne požiadavka, povedať „teraz je to už žiadosť“.' },
        question: { en: 'Which recent idea started as a passing thought and was treated as a task, and what would have shown the difference?', sk: 'Ktorý nedávny nápad vznikol mimochodom, a predsa sa bral ako úloha, a čo by ten rozdiel ukázalo?' },
    },
    'processing-pace/oneSided:introspective': {
        title: { en: 'Whose tempo the pair keeps', sk: 'Podľa čieho tempa sa ide' },
        passage: {
            en: '{lean} tends to settle a question inwardly before answering, and {mid} has no strong pull either way, so the pair is likely to drift to the pace {lean} needs without anyone choosing it. Questions can go quiet and come back considered, with the objections already answered.\n\nWhat can go unseen is the waiting. {mid} may be left unsure whether a gap means that {lean} is thinking, is stuck or has not yet been asked, and may fill it with either a nudge or a guess. An open silence can be read three ways, and from the outside there may be no telling which one applies.',
            sk: '{lean} si otázku zvyčajne najprv vyrieši v sebe a až potom odpovie, a {mid} nemá silný sklon ani jedným smerom, takže dvojica sa pravdepodobne prispôsobí tempu, ktoré potrebuje {lean}, bez toho, aby o tom niekto rozhodol. Otázky môžu na chvíľu stíchnuť a vrátiť sa premyslené, s už zodpovedanými námietkami.\n\nNebadané môže ostať čakanie. {mid} nemusí vedieť, či medzera znamená premýšľanie, zádrhel alebo otázku, ktorá ešte nezaznela, a medzeru môže vyplniť buď postrčením, alebo domnienkou. Otvorené ticho sa dá vyložiť tromi spôsobmi a zvonka sa možno nedá rozoznať, ktorý z nich platí.',
        },
        aside: {
            en: 'A question put to the pair tends to wait until {lean} has settled it inwardly, and {mid}, who has no strong pull either way here, may simply go along with that pace. While {lean} is silent, {mid} may not know whether it means thinking, a snag or a question not yet noticed.',
            sk: '{lean} si zvyčajne potrebuje veci najprv premyslieť v sebe, a otázka tak chvíľu počká. {mid} tu nemá silný sklon ani jedným smerom, takže sa tomuto tempu môže jednoducho prispôsobiť. Kým {lean} mlčí, {mid} nemusí vedieť, či ide o premýšľanie, zádrhel alebo otázku, ktorú si ešte nikto nevšimol.',
        },
        step: { en: 'Whenever a question is put, name the time by which an answer will come, so that waiting has an end and a reason.', sk: 'Pri každej otázke povedzte, dokedy príde odpoveď, aby čakanie malo koniec aj dôvod.' },
        question: { en: 'When an answer is slow, how can the other tell whether it is thinking, trouble or a question not yet noticed?', sk: 'Ako sa pri pomalej odpovedi pozná, či ide o premýšľanie, zádrhel alebo otázku, ktorú si ešte nikto nevšimol?' },
    },
    'processing-pace/oneSided:outwardly-engaged': {
        title: { en: 'Easy agreement, unfinished idea', sk: 'Ľahký súhlas, nedokončený nápad' },
        passage: {
            en: 'What {lean} says in passing can become a plan with nobody quite deciding it. {lean} tends to think by talking, and {mid}, who sits between the two styles, can follow along, add to a half-formed idea or stay quiet. That gives the thinking the listener it needs.\n\nIt can also make agreement cheap. {mid} may go along without having weighed the idea, {lean} can take the lack of resistance for a check that has been passed, and the draft may be treated as settled by both before either has tested it.',
            sk: 'To, čo {lean} povie mimochodom, sa môže stať plánom, hoci o tom nikto naozaj nerozhodol. {lean} zvyčajne premýšľa rozprávaním a {mid} stojí medzi týmito dvoma štýlmi, takže vie v rozhovore sledovať, dopĺňať nedokončený nápad alebo mlčať. Premýšľanie tak dostane poslucháča, ktorého potrebuje.\n\nSúhlas tým však môže zlacnieť. {mid} sa môže pridať aj bez zváženia nápadu, {lean} môže chýbajúci odpor brať ako prejdenú kontrolu a koncept sa môže pokladať za hotový, hoci ešte neprešiel nijakou skúškou.',
        },
        aside: {
            en: 'Agreement that costs nothing can stand in for a test. {lean} tends to think aloud, {mid} may simply go along, and a draft that meets no resistance can be taken for settled.',
            sk: 'Súhlas, ktorý nič nestojí, môže nahradiť skúšku. {lean} zvyčajne premýšľa nahlas, {mid} sa môže jednoducho pridať a koncept, ktorý nenarazí na odpor, sa môže pokladať za hotový.',
        },
        step: { en: 'Before an idea becomes a task, say aloud whether it is agreed or only being followed along with.', sk: 'Skôr než sa z nápadu stane úloha, povedzte nahlas, či je dohodnutý, alebo sa len ide s prúdom.' },
        question: { en: 'Which idea voiced in passing has since been worked on without either of you having decided it?', sk: 'Na ktorom mimochodom vyslovenom nápade sa odvtedy pracuje, hoci sa o tom nerozhodlo?' },
    },
    /* ------------------------------------------------------------------ reasoning: reasoning-style */
    'reasoning-style/shared:analytical': {
        title: { en: 'Proof as the common language', sk: 'Spoločná reč: čo sa dá doložiť' },
        passage: {
            en: '{both} tend to send each other claims with the reasons attached, so a disagreement can be settled by agreeing what would count as proof, and whatever is decided leaves a trail that others could check, repeat or correct.\n\nThe difficulty is the call that proof cannot reach yet: a decision about something new, with no data to be had. Each may ask for one more check, each can hear the other’s request as ordinary care, and the analysis can grow past the point where it could change the answer. Calling it enough can then sound like leaving out the very step both value.',
            sk: '{both} si zvyčajne posielajú tvrdenia aj s dôvodmi, takže nezhodu môže vyriešiť už dohoda o tom, čo sa bude považovať za preukázané, a všetko, čo sa rozhodne, po sebe necháva stopu, ktorú môžu iní skontrolovať, zopakovať alebo opraviť.\n\nŤažké je rozhodnutie, na ktoré podklady zatiaľ nestačia: voľba v niečom novom, kde sa dáta zohnať nedajú. Každý môže žiadať ešte jednu kontrolu, žiadosť druhej strany môže brať ako bežnú starostlivosť a analýza môže prerásť bod, za ktorým už odpoveď nezmení. Povedať, že stačí, potom môže znieť ako vynechanie práve toho kroku, na ktorom záleží každému z nich.',
        },
        aside: {
            en: 'Since {both} tend to want proof, a disagreement can become a question of what would count as one. The harder case is the decision no data can settle, where one more check keeps seeming reasonable and saying enough can sound like dropping a step.',
            sk: 'Keďže {both} chcú zvyčajne vidieť podklady, nezhoda sa môže zmeniť na otázku, čo sa bude brať ako preukázané. Ťažšie je rozhodnutie, ktoré žiadne dáta nevyriešia: ešte jedna kontrola sa zdá stále rozumná a povedať, že stačí, môže znieť ako vynechaný krok.',
        },
        step: { en: 'Before the analysis starts, agree what result would change the decision and by when the question closes, so that more checking has a visible end.', sk: 'Skôr než sa začne analýza, dohodnite, aký výsledok by rozhodnutie zmenil a dokedy sa otázka uzavrie, aby ďalšie overovanie malo viditeľný koniec.' },
        question: { en: 'For the next open decision, what finding would change the answer, and what happens if none arrives?', sk: 'Aké zistenie by pri najbližšom otvorenom rozhodnutí zmenilo odpoveď a čo sa stane, ak žiadne nepríde?' },
    },
    'reasoning-style/shared:intuitive': {
        title: { en: 'A hunch that two instincts share', sk: 'Tušenie, v ktorom sa zhodnú dva inštinkty' },
        passage: {
            en: '{both} tend to read where a situation is heading from a few signals, and the reads often match, so a direction can be settled in a sentence while others are still asking for the numbers. It can be quick and need no meeting.\n\nAn agreed hunch is not a checked one, though. Two instincts that match can feel like confirmation, and the question that would test them, what would show this is wrong, is one neither has much reason to ask. It tends to surface when the read has to be handed on, and a colleague or client who asks why may find that the steps were not put into words.',
            sk: '{both} zvyčajne z niekoľkých signálov vycítia, kam situácia smeruje, a odhady sa často zhodujú, takže smer sa dá uzavrieť jednou vetou, kým iní ešte žiadajú čísla. Môže to ísť rýchlo a bez porady.\n\nZhodné tušenie však ešte nie je overené tušenie. Dva zhodné inštinkty môžu pôsobiť ako potvrdenie a otázku, ktorá by ich preverila, teda čo by ukázalo, že sa mýlia, nemá ani jeden z nich veľký dôvod položiť. Zvyčajne to vyjde najavo, keď treba odhad odovzdať ďalej a kolega či klient, ktorý sa spýta prečo, môže zistiť, že kroky nikto nepomenoval.',
        },
        aside: {
            en: 'Where {both} read a situation the same way from a few signals, two matching instincts can feel like a confirmed fact. What would show the read wrong is then a question neither has reason to ask, and the first to ask it may be someone outside the pair.',
            sk: 'Keď {both} podľa niekoľkých signálov vidia situáciu rovnako, dva zhodné inštinkty môžu pôsobiť ako potvrdený fakt. Otázka, čo by ukázalo, že sa mýlia, potom nemá prečo zaznieť a prvý sa môže spýtať až niekto mimo dvojice.',
        },
        step: { en: 'When the two reads agree, take a moment to write down the signals behind the read and one thing that would show it mistaken.', sk: 'Keď sa dva odhady zhodnú, na chvíľu si zapíšte signály, z ktorých vychádzajú, a jednu vec, ktorá by ukázala, že sa mýlia.' },
        question: { en: 'If a colleague asked how the two of you reached this view, what could be said that is more than “it seems right”?', sk: 'Keby sa kolega spýtal, ako ste k tomuto názoru došli, čo by sa dalo povedať okrem „zdá sa nám to správne“?' },
    },
    'reasoning-style/opposed': {
        title: { en: 'Which way, and how do we know', sk: 'Kam smerujeme a podľa čoho to vieme' },
        passage: {
            en: '{p1} tends to sense where things are heading before the argument for it exists; {p0} is more likely to want the argument before trusting the direction. The two can be answering different questions, which way and how do we know, and the work needs both: the direction gives something to test, and the test gives the direction a form that others can follow.\n\nSay {p0} asks for the numbers behind a hunch that has none yet. {p1} may answer with more conviction in place of reasons, {p0} can hear the conviction as a substitute for proof, and a question about the hunch can turn into a question about the person asking it. The disagreement is seldom about the decision itself. It is about what counts as an answer.',
            sk: '{p1} zvyčajne vycíti, kam veci smerujú, skôr než existuje argument; {p0} zvykne chcieť argument skôr, než smeru uverí. Môžu tak odpovedať na rôzne otázky, kam to ide a podľa čoho to vieme, a práca potrebuje oba pohľady: smer dáva, čo skúšať, a skúška dáva smeru podobu, ktorú môžu ostatní nasledovať.\n\nPovedzme, že {p0} žiada čísla k tušeniu, ktoré ich ešte nemá. {p1} môže namiesto dôvodov ponúknuť väčšie presvedčenie, {p0} v tom presvedčení môže počuť náhradu za odôvodnenie a otázka k tušeniu sa môže zmeniť na otázku o tom, kto sa pýta. Nezhoda sa len zriedka týka samotného rozhodnutia. Týka sa toho, čo sa berie ako odpoveď.',
        },
        aside: {
            en: 'Asked which way, {p1} tends to have an answer before the working, while {p0} would rather see the working first. Their disagreement can be less about the decision than about what would settle it, so more conviction on one side and more questions on the other may only widen it.',
            sk: 'Na otázku, kam to ide, má {p1} zvyčajne odpoveď skôr než postup, kým {p0} chce najprv vidieť postup. Nezhoda sa tak môže týkať menej samotného rozhodnutia než toho, čo by vec rozhodlo, a keď jedna strana pridá presvedčenie a druhá otázky, rozpor sa môže len prehĺbiť.',
        },
        step: { en: 'Before arguing for an outcome, let the hunch be stated as signals and the doubt be stated as the proof that would settle it.', sk: 'Skôr než sa začnete prieť o výsledok, nech sa tušenie povie ako signály a pochybnosť ako zistenie, ktoré by veci rozhodlo.' },
        question: { en: 'What would count as enough proof for this kind of decision, and who gets to say so?', sk: 'Čo by pri takomto rozhodnutí stačilo ako dostatočné overenie a kto môže povedať, že stačí?' },
    },
    'reasoning-style/opposed:analytical': {
        title: { en: 'The price of entry for an idea', sk: 'Čo musí nápad splniť, aby sa vypočul' },
        passage: {
            en: '{first} tends to want the working behind a conclusion, and {second} often has the conclusion before the working. Because {first} has more say or more experience, that wish can set the price of entry for an idea, and a read that cannot show its steps is easily taken as not yet ready for discussion. That can narrow what {second} brings until only what can be proved arrives, and the earliest signal, the one that is still a feeling, may be filtered out before anyone sees it.\n\nThe effect runs the other way as well. {first} can often turn a hunch into something testable by asking what it is noticing and what would confirm it. Whether a read is allowed in as a read decides which of the two happens.',
            sk: '{first} zvyčajne chce vidieť postup za záverom a {second} má záver často skôr než postup. Keďže {first} má väčšie slovo alebo viac skúseností, toto želanie môže určiť, čo musí nápad splniť, aby sa vôbec vypočul, a odhad, ktorý nevie ukázať kroky, sa ľahko berie ako ešte nepripravený na rozhovor. To môže zúžiť, čo {second} prináša, až prichádza len to, čo sa dá podložiť, a najskorší signál, ten, ktorý je ešte len pocit, sa môže vytratiť skôr, než sa naň niekto pozrie.\n\nPlatí to aj opačne. {first} často dokáže z tušenia urobiť niečo, čo sa dá preskúšať, ak sa spýta, čo tušenie zachytáva a čím by sa dalo potvrdiť. Ktorá z týchto dvoch možností nastane, závisí od toho, či sa odhad pripustí ako odhad.',
        },
        aside: {
            en: 'When {first} asks for the working behind an idea and also has more say or experience, the standard of proof can decide what gets brought forward. {second} may stop offering reads that cannot yet show their steps, and the early signal can be lost before anyone has looked at it.',
            sk: 'Keď {first} žiada postup za nápadom a má k tomu väčšie slovo alebo skúsenosti, miera podloženia môže rozhodnúť o tom, čo sa vôbec prinesie. {second} môže prestať ponúkať odhady, ktoré kroky zatiaľ ukázať nevedia, a včasný signál sa môže stratiť skôr, než sa naň niekto pozrie.',
        },
        step: { en: 'Make room for a hunch offered as a hunch, welcomed for testing and not asked to prove itself first.', sk: 'Urobte miesto tušeniu, ktoré sa ponúka ako tušenie: nech je vítané na preskúšanie a nech sa nežiada, aby sa najprv obhájilo.' },
        question: { en: 'What has been left unsaid because it could not yet be backed up, and what might it have shown?', sk: 'Čo ostalo nevyslovené, lebo sa to zatiaľ nedalo podložiť, a čo by to mohlo ukázať?' },
    },
    'reasoning-style/opposed:intuitive': {
        title: { en: 'A decision with its reasons left out', sk: 'Rozhodnutie bez dôvodov' },
        passage: {
            en: '{first} tends to decide from a read of the situation, and with more say or more experience behind it, that read can quickly become the direction. {second} is more at home with reasons and may see what a call rests on only when it is shown. When the reasons stay unspoken, {second} may be left acting on a call that cannot be explained onward, to a client, a colleague or anyone who asks later, because its steps were not put into words.\n\nThe same read, asked for its signals, gives {second} something to check and gives {first} a second pair of eyes where instinct can run ahead of the facts. A question put as curiosity can open that exchange; put as challenge, it can close it, since the one with more say may hear any request for reasons as doubt.',
            sk: '{first} zvyčajne rozhoduje podľa toho, ako vníma situáciu, a keďže má {first} väčšie slovo alebo viac skúseností, tento odhad sa môže rýchlo stať smerom. {second} sa cíti istejšie pri dôvodoch a to, na čom rozhodnutie stojí, pravdepodobne uvidí, až keď to niekto ukáže. Ak dôvody ostanú nevyslovené, {second} môže napokon konať podľa rozhodnutia, ktoré nevie vysvetliť klientovi, kolegovi ani nikomu, kto sa spýta neskôr, lebo kroky rozhodnutia nikto nepomenoval.\n\nAk sa niekto pri tom odhade spýta na signály, {second} dostane niečo na overenie a {first} druhý pár očí tam, kde inštinkt niekedy predbehne fakty. Otázka položená zo zvedavosti môže takú výmenu otvoriť; ak zaznie ako výzva, výmena sa skôr uzavrie, lebo strana s väčším slovom v každej žiadosti o dôvody ľahko začuje pochybnosť.',
        },
        aside: {
            en: 'When {first} decides on instinct, the call can reach the other side without its working and with the weight of more say or experience behind it. {second} may then act on a decision that is hard to explain further along, and asking for the reasons can be heard as doubt.',
            sk: 'Keď {first} rozhodne podľa inštinktu, rozhodnutie sa môže k druhej strane dostať bez postupu a s váhou väčšieho slova alebo skúseností. {second} potom môže konať podľa rozhodnutia, ktoré sa ďalej ťažko vysvetľuje, a žiadosť o dôvody sa môže počuť ako pochybnosť.',
        },
        step: { en: 'When a decision rests on a read, add one sentence on the signals behind it, so that whoever acts on it can explain it onward.', sk: 'Keď rozhodnutie stojí na odhade, pridajte jednu vetu o signáloch, aby každý, kto podľa rozhodnutia koná, vedel vysvetliť prečo.' },
        question: { en: 'Which recent decision rested on a feeling that the other then had to explain onward without the reasons?', sk: 'Ktoré nedávne rozhodnutie stálo na pocite, takže sa muselo vysvetľovať ďalej bez dôvodov?' },
    },
    'reasoning-style/oneSided:analytical': {
        title: { en: 'Skipping ahead shows which steps matter', sk: 'Preskakovanie ukáže, ktoré kroky sa počítajú' },
        passage: {
            en: '{lean} tends to lay an argument out step by step, while {mid}, with no firm leaning here, may follow the steps or jump to the end. Where {mid} jumps can be telling: it may show which steps the case needs and which only its builder needs.\n\nThe risk is in the jump. {mid} may agree with the conclusion because it looks right, and {lean} may take that agreement for a check on the steps when the steps were skipped. The case can then feel reviewed by both while no one has walked through it.',
            sk: '{lean} zvyčajne rozkladá argument krok za krokom, kým {mid} bez výrazného sklonu môže kroky sledovať alebo skočiť rovno na záver. Miesta, kde {mid} preskočí, môžu veľa prezradiť: môžu ukázať, ktoré kroky potrebuje zdôvodnenie a ktoré len postup, ktorým vzniklo.\n\nRiziko je v skoku. {mid} môže súhlasiť so záverom, lebo vyzerá správne, a {lean} môže ten súhlas vziať za kontrolu krokov, hoci sa kroky preskočili. Zdôvodnenie potom môže pôsobiť ako spoločne prejdené, hoci krok za krokom nešiel nikto.',
        },
        aside: {
            en: 'Step by step is how {lean} tends to build a case, and {mid} may follow the steps or go straight to the conclusion. An agreement reached by the second route can feel checked when nobody has actually gone through the steps.',
            sk: 'Zdôvodnenie stavia {lean} zvyčajne krok za krokom a {mid} môže kroky sledovať, alebo ísť rovno na záver. Súhlas, ku ktorému sa dôjde druhou cestou, môže pôsobiť ako preverený, hoci kroky nikto naozaj neprešiel.',
        },
        step: { en: 'Say at the start whether a conclusion is offered for agreement or for checking, so that skipping the steps is a choice and not an accident.', sk: 'Na začiatku povedzte, či sa záver ponúka na súhlas, alebo na kontrolu, aby preskočenie krokov bolo voľbou, nie nehodou.' },
        question: { en: 'What would make it safe to say, in the middle of a discussion, that something has not been checked yet?', sk: 'Čo by umožnilo povedať uprostred rozhovoru, že niečo zatiaľ nie je overené?' },
    },
    'reasoning-style/oneSided:intuitive': {
        title: { en: 'Ask or accept: a choice only one has', sk: 'Spýtať sa, alebo prijať: voľba iba pre jedného' },
        passage: {
            en: 'At each decision {mid}, who leans neither way, has a choice that {lean} seldom faces: to ask for the reasons behind a read or to go with it. {lean} tends to sense where things are heading and may not yet be able to say why, so the way the pair decides can be largely set by which of the two {mid} picks in the moment.\n\nOn small matters, going with the read can save time. On large ones, a conclusion nobody has examined can pass for something both have weighed. Asking, when it comes, is not necessarily doubt; it is the route by which a feeling becomes something the pair can say aloud and later check.',
            sk: 'Pri každom rozhodnutí má {mid}, bez sklonu na jednu či druhú stranu, voľbu, pred ktorou {lean} stojí len zriedka: spýtať sa na dôvody odhadu, alebo sa k odhadu pridať. {lean} zvyčajne vycíti, kam veci smerujú, a nemusí ešte vedieť povedať prečo, takže to, ako dvojica rozhoduje, môže vo veľkej miere určovať, čo {mid} v danej chvíli zvolí.\n\nPri drobnostiach môže ušetriť čas, keď sa odhad jednoducho prijme. Pri veľkých veciach môže záver, ktorý nikto neskúmal, prejsť za niečo, čo dvojica spolu zvážila. Otázka, keď príde, nemusí byť pochybnosť; je to cesta, ktorou sa z pocitu stane niečo, čo dvojica vie povedať nahlas a neskôr skontrolovať.',
        },
        aside: {
            en: 'Often {lean} senses a direction before being able to explain it, and {mid} can either ask for the reasons or go along. A read accepted without a question can then pass for one both have weighed.',
            sk: 'Často {lean} vycíti smer skôr, než vie vysvetliť prečo, a {mid} sa môže buď spýtať na dôvody, alebo sa pridať. Odhad prijatý bez otázky potom môže prejsť za spoločne zvážený.',
        },
        step: { en: 'Decide in advance which kinds of decision are taken on a read and which are first put into words, so that asking is a rule and not a challenge.', sk: 'Dohodnite sa vopred, ktoré druhy rozhodnutí sa robia podľa odhadu a ktoré sa najprv povedia slovami, aby otázka bola pravidlom, nie výzvou.' },
        question: { en: 'Which decisions are small enough to take on a feeling, and which should be put into words before anyone acts?', sk: 'Ktoré rozhodnutia sú dosť malé na to, aby sa robili podľa pocitu, a ktoré treba pred konaním povedať slovami?' },
    },
    /* ------------------------------------------------------------------ autonomy: closeness-and-room */
    'closeness-and-room/shared:independent': {
        title: { en: 'Two pieces, and a seam nobody owns', sk: 'Dva diely a spoj, o ktorý sa nikto nestará' },
        passage: {
            en: '{both} are likely to split the work into pieces, each with one owner who is left alone with it. Questions get settled inside the piece, nobody hovers, and a part tends to come back finished on its own terms.\n\nTrouble, if it comes, gathers at the seam between the pieces. Each part can work on its own terms and still not fit the other, because the assumptions made along the way were made in separate rooms. It tends to show when the parts are joined and a format, a name for a thing or a sequence turns out to differ. The seam belongs to neither piece, and so it can reach the join with no owner at all.',
            sk: '{both} si prácu pravdepodobne rozdelia na diely, každý diel zvyčajne vedie jeden z nich a druhý doň nezasahuje. Otázky sa riešia vnútri dielu, nikto nikoho nekontroluje na každom kroku a diel býva hotový, ale podľa pravidiel svojho autora.\n\nAk príde problém, objaví sa na spoji medzi dielmi. Každý diel môže fungovať sám o sebe a k druhému predsa nepasovať, lebo predpoklady po ceste vznikali oddelene, každý u seba. Zvyčajne sa to ukáže pri spájaní dielov, keď sa zistí, že sa líši formát, názov pre tú istú vec alebo poradie krokov. Spoj nepatrí ani jednému dielu, a tak zaň až do spájania nemusí zodpovedať nikto.',
        },
        aside: {
            en: 'When {both} split the work, each piece tends to have one owner who is left alone with it, so the joins between pieces may belong to no one. Two parts can each work and still not fit, because the assumptions behind them were made apart.',
            sk: 'Keď si {both} rozdelia prácu, každý diel má zvyčajne na starosti jeden z nich a druhý do tej práce nezasahuje, takže spoje medzi dielmi nemusia patriť nikomu. Dve časti môžu každá fungovať a predsa nepasovať, lebo predpoklady za nimi vznikali oddelene.',
        },
        step: { en: 'Name one point, early, at which the two pieces are laid side by side, and agree who looks at the join.', sk: 'Určte si včas jeden bod, v ktorom sa diely priložia vedľa seba, a dohodnite, kto sa pozrie na spoj.' },
        question: { en: 'Where do your two pieces meet, and who is looking at that place?', sk: 'Kde sa vaše dva diely stretnú a kto sa na to miesto pozerá?' },
    },
    'closeness-and-room/shared:collaborative': {
        title: { en: 'Everything shared, so who holds the next step', sk: 'Všetko spolu, a čí je ďalší krok' },
        passage: {
            en: '{both} tend to work best side by side, building on an idea the moment it is said: drafts get shown early, and a wrong turn can be caught while it is still small.\n\nThe cost hides in the same tendency. When everything is done together, everything is owned by both, and a task can sit untouched because each may assume the other has it. A meeting can end in full agreement and the follow-up still go unsent. Working side by side answers many questions, but not who holds the next step.',
            sk: '{both} zvyčajne pracujú najlepšie vedľa seba a na nápade stavajú hneď, ako zaznie: koncepty sa ukazujú skoro a zlá odbočka sa dá zachytiť, kým je ešte malá.\n\nCena sa skrýva v tom istom sklone. Keď sa všetko robí spolu, všetko je spoločné a úloha môže ležať, lebo každý môže predpokladať, že sa o úlohu stará druhá strana. Porada sa môže skončiť úplnou zhodou a následná správa aj tak neodíde. Práca vedľa seba odpovie na veľa otázok, len nie na to, kto drží ďalší krok.',
        },
        aside: {
            en: 'So much is shared when {both} work together that a next step can belong to both and be held by neither. A follow-up may then go unsent, each expecting it from the other side.',
            sk: 'Keď {both} pracujú spolu, spoločné je toľko, že ďalší krok môže patriť každému z nich, a pritom nebyť v rukách nikoho. Následná správa potom nemusí odísť, lebo každý čaká, že príde od druhej strany.',
        },
        step: { en: 'At the end of each working session, name one owner for each next step, even when the work itself stays shared.', sk: 'Na konci každého pracovného stretnutia určte pre každý ďalší krok jedného majiteľa, aj keď samotná práca ostáva spoločná.' },
        question: { en: 'Which task has been waiting because each of you thought the other had it?', sk: 'Ktorá úloha leží, lebo každý z vás predpokladá, že je na druhej strane?' },
    },
    'closeness-and-room/opposed': {
        title: { en: 'A check-in heard two ways', sk: 'Otázka na stav práce, počutá dvojako' },
        passage: {
            en: 'A question about how the work is going can mean two things. {p1} tends to ask it as a way of working: drafts shown early, a second view while there is still room to change course. {p0} can hear it as checking up, a sign that the piece is doubted. Then {p0} may share less, {p1}, knowing less, may ask more, and the loop can turn until neither is sure where the work stands.\n\nEach style has its use: pieces worked through without interruption from one, the early conversation that keeps the pieces pointing the same way from the other. Which one dominates depends on whether contact has a rhythm of its own or happens only as a reaction to silence.',
            sk: 'Otázka, ako práca ide, môže znamenať dve veci. {p1} sa tak zvyčajne pýta ako súčasť spôsobu práce: koncepty ukázať skoro, druhý pohľad, kým sa ešte dá zmeniť smer. {p0} to môže počuť ako kontrolu, ako znak, že sa o rozpracovanej veci pochybuje. {p0} potom zdieľa menej, {p1} vie menej a pýta sa viac a kruh sa točí, až nikto nevie, ako práca stojí.\n\nKaždý štýl sa na niečo hodí: od jedného prídu diely prepracované bez vyrušovania, od druhého včasný rozhovor, ktorý udržiava diely v rovnakom smere. Ktorý z nich prevládne, závisí od toho, či má kontakt vlastný rytmus, alebo vzniká len ako reakcia na ticho.',
        },
        aside: {
            en: 'Asking how the work is going, {p1} can mean working together, while {p0}, who would rather have a clear run at the piece, may hear checking up. Each round of it can leave both less sure where the work stands.',
            sk: 'Otázkou, ako práca ide, môže {p1} myslieť spoluprácu, kým {p0} chce mať na svoj diel pokoj a môže v tom počuť kontrolu. Po každom ďalšom kole potom môže byť menej jasné, ako práca stojí.',
        },
        step: { en: 'Agree a fixed rhythm, such as a short look at the work on set occasions, with clear ground between them where nobody asks.', sk: 'Dohodnite pevný rytmus, napríklad krátky pohľad na prácu v stanovených chvíľach, a medzi nimi voľné obdobie, v ktorom sa nikto nepýta.' },
        question: { en: 'What would each of you need to know about the work, and how often, to leave the time in between alone?', sk: 'Čo o práci a ako často potrebuje každý z vás vedieť, aby ste si v čase medzi tým dali pokoj?' },
    },
    'closeness-and-room/opposed:independent': {
        title: { en: 'Distance offered as trust, found as absence', sk: 'Odstup ako dôvera, odstup ako neprítomnosť' },
        passage: {
            en: '{first} tends to hand over a task or a question and step back, a distance that can be offered as trust. {second} can find the same distance an absence: no one to show a draft to, no sign whether the direction is right. The gap is where small questions collect, and with more say or experience on the other side of it, the cost of asking can grow larger than the question.\n\nWhere {second} reaches for a check-in, {first} may hear a request to be supervised, when it may simply be a way of working. There is a good form of this: one gives a clear piece to own, the other notices early when the pieces start to drift. Contact without dates of its own has to be asked for, and the asking falls to the side for whom it costs most.',
            sk: '{first} zvyčajne odovzdá úlohu alebo otázku a ustúpi, čo sa dá ponúknuť ako dôvera. {second} môže v tom istom odstupe nájsť neprítomnosť: nie je komu ukázať koncept, nie je znak, či smer sedí. V tej medzere sa zbierajú malé otázky a keď je na druhej strane väčšie slovo alebo viac skúseností, opýtať sa môže stáť viac než samotná otázka.\n\nKeď {second} siahne po krátkej výmene, {first} v tom môže počuť žiadosť o dohľad, hoci môže ísť jednoducho o spôsob práce. Má to aj dobrú podobu: jedna strana dá jasný diel do vlastných rúk, druhá si včas všimne, keď sa diely začnú rozchádzať. Kontakt bez vlastných termínov si treba vypýtať a pýtať sa potom musí strana, ktorú to stojí najviac.',
        },
        aside: {
            en: 'When {first} steps back from a piece of work, the distance can be meant as trust and found as absence. {second} may be left with no one to show a draft to, and asking upward can feel costlier than the question itself.',
            sk: 'Keď {first} od práce ustúpi, odstup môže byť myslený ako dôvera a prijatý ako neprítomnosť. {second} môže ostať bez niekoho, komu ukázať koncept, a opýtať sa smerom nahor môže pôsobiť drahšie než samotná otázka.',
        },
        step: { en: 'Build short, fixed points for sharing progress into the arrangement from the start, so that the one with less say does not have to ask for them.', sk: 'Zabudujte do dohody od začiatku krátke pevné body na zdieľanie postupu, aby ich nemusela vyžadovať strana s menším slovom.' },
        question: { en: 'What would the one who wants more contact need to see, and how often, to take the distance as room rather than absence?', sk: 'Čo by mala strana, ktorá chce viac kontaktu, vidieť a ako často, aby brala odstup ako priestor, nie ako neprítomnosť?' },
    },
    'closeness-and-room/opposed:collaborative': {
        title: { en: 'A visit that cuts a long stretch short', sk: 'Návšteva, ktorá rozseká dlhý úsek' },
        passage: {
            en: '{first} tends to work by staying close: a draft shown early, a look over the shoulder, a question put in passing. {second} is more likely to want long, uninterrupted stretches, and the same visits can cut those stretches into pieces too short to use. Because {first} has more say or more experience, asking to be left alone can be hard, and the request may not get made.\n\nWhat can follow is a quiet mismatch. {first} may feel the work is out of view and visit more; {second}, with less continuous time, may share in smaller amounts. Each visit can then look like care from one side and like an interruption from the other, with neither said aloud.',
            sk: '{first} zvyčajne pracuje zblízka: skorý koncept, pohľad ponad plece, otázka mimochodom. {second} skôr potrebuje dlhé nerušené úseky a tie isté návštevy ich môžu rozsekať na kúsky, ktoré sa na prácu nedajú využiť. Keďže {first} má väčšie slovo alebo viac skúseností, požiadať o pokoj môže byť ťažké a k žiadosti nemusí vôbec prísť.\n\nMôže z toho vzniknúť tichý nesúlad. {first} môže mať pocit, že práca je mimo dohľadu, a chodiť častejšie; {second} má menej súvislého času a môže zdieľať po menších dávkach. Každá návšteva potom môže z jednej strany vyzerať ako záujem a z druhej ako vyrušenie, a nikto to nahlas nepovie.',
        },
        aside: {
            en: 'When {first} keeps close to the work, the visits can break up the long stretches {second} prefers. Asking for them back is harder toward the side with more say or experience, so the request may stay unmade.',
            sk: 'Keď sa {first} drží blízko pri práci, návštevy môžu rozbiť dlhé úseky, ktoré {second} uprednostňuje. Vypýtať si ich späť je ťažšie voči strane s väčším slovom alebo skúsenosťami, a tak žiadosť nemusí vôbec zaznieť.',
        },
        step: { en: 'Mark stretches in the week as belonging to the one who prefers room, with a fixed point at the end where the work is shown.', sk: 'Vyhraďte v týždni úseky pre stranu, ktorá uprednostňuje pokoj, a na konci každého pevný bod, kde sa práca ukáže.' },
        question: { en: 'Which part of the work needs long, undisturbed time, and when could that time be protected?', sk: 'Ktorá časť práce potrebuje dlhý nerušený čas a kedy by sa dal ochrániť?' },
    },
    'closeness-and-room/oneSided:independent': {
        title: { en: 'Long stretches alone, short meetings together', sk: 'Dlhé úseky osamote, krátke porady spolu' },
        passage: {
            en: '{lean} prefers long stretches with room, and {mid}, without a strong pull toward company or toward room, is likely to adapt. Long quiet stretches can suit the work, and nothing has to be negotiated to get them.\n\nThe same ease can let contact thin out. A meeting may go unrequested: {lean} would rather not have one, and {mid} has no reason to press. Work can come out of a quiet stretch nearly finished and meet its first reader late, when changing it is costly. The gap is not a difference in need; only one of the two has a view on when to meet, and the other has none to set against it.',
            sk: '{lean} uprednostňuje dlhé úseky s priestorom pre seba a {mid} sa bez silného sklonu k spoločnosti či k samote pravdepodobne prispôsobí. Dlhé tiché úseky môžu práci vyhovovať a netreba sa kvôli nim s nikým dohadovať.\n\nTá istá ľahkosť však môže nechať kontakt riednuť. O poradu nemusí nikto požiadať: {lean} sa zaobíde aj bez porady a {mid} nemá dôvod naliehať. Práca môže z tichého úseku vyjsť takmer dokončená a prvého čitateľa nájsť neskoro, keď je zmena drahá. Medzera nie je rozdiel v potrebách; len jeden z dvojice má názor na to, kedy sa stretnúť, a druhá strana nemá vlastný, ktorý by proti tomu mohla postaviť.',
        },
        aside: {
            en: 'Where {lean} prefers long stretches with room and {mid} has no strong pull to set against it, contact between the two can thin out. Work may then be shown only when it is nearly done and costly to change.',
            sk: 'Keď {lean} uprednostňuje dlhé úseky s priestorom pre seba a {mid} nemá silný opačný sklon, kontakt medzi dvojicou môže riednuť. Hrozí, že prácu ukážu až vtedy, keď je takmer hotová a zmena je drahá.',
        },
        step: { en: 'Fix a couple of short check-in points in advance, so that sharing does not depend on either of you asking for it.', sk: 'Dohodnite si vopred pár krátkych bodov, kde sa na prácu spolu pozriete, aby zdieľanie nezáviselo od toho, či o ne niekto z vás požiada.' },
        question: { en: 'At which stage of the work would a second view cost least and help most?', sk: 'V ktorej fáze práce by druhý pohľad stál najmenej a pomohol najviac?' },
    },
    'closeness-and-room/oneSided:collaborative': {
        title: { en: 'Company on offer, at a hidden price', sk: 'Prítomnosť na požiadanie, za skrytú cenu' },
        passage: {
            en: '{lean} often works best with someone nearby: a draft shared early, a question put as it arises. {mid}, with no strong pull either way, can supply that or step back, and each adjustment can carry a cost that does not show.\n\nOn a given afternoon {lean} may keep turning for a second view, {mid} may keep turning back, and work planned for time alone gets done in the gaps or not at all. Since {mid} can say yes to working side by side, the moment when it stops being easy may go unheard. Which parts are shared and which are solo is a fact about the work; if it goes unnamed, {mid} may end up carrying the difference alone.',
            sk: '{lean} často pracuje najlepšie, keď je niekto nablízku: koncept ukázaný skoro, otázka položená hneď, ako vznikne. {mid} bez silného sklonu na jednu či druhú stranu môže byť nablízku aj ustúpiť a každé prispôsobenie môže mať cenu, ktorú nevidno.\n\nV niektoré popoludnie sa {lean} môže stále obracať po druhý pohľad, {mid} sa môže stále vracať a práca naplánovaná na čas osamote sa urobí v medzerách, alebo vôbec. Keďže {mid} môže na prácu bok po boku povedať áno, chvíľu, keď to prestane byť ľahké, nemusí nikto počuť. To, ktoré časti sú spoločné a ktoré samostatné, patrí k samotnej práci; ak sa to nepomenuje, {mid} môže nakoniec rozdiel znášať osamote.',
        },
        aside: {
            en: 'Working next to someone tends to suit {lean} best, and {mid} can stay close or step back, so {mid} may quietly carry the cost of each yes. Where {lean} also has more say or experience, a no can be harder still to give.',
            sk: '{lean} zvyčajne najlepšie pracuje popri niekom a {mid} môže byť nablízku alebo ustúpiť, takže {mid} môže potichu platiť za každé áno. Ak má {lean} navyše väčšie slovo alebo skúsenosti, povedať nie môže byť ešte ťažšie.',
        },
        step: { en: 'Mark each task as shared or solo when it is taken on, so that stepping back is part of the plan and not a refusal.', sk: 'Pri preberaní každej úlohy označte, či je spoločná, alebo samostatná, aby ustúpenie bolo súčasťou plánu, nie odmietnutím.' },
        question: { en: 'Which parts of the work are better done alone, and has anyone said so?', sk: 'Ktoré časti práce sa lepšie robia osamote a povedalo sa to už niekedy nahlas?' },
    },
    /* ------------------------------------------------------------------ structure: structure-and-flexibility */
    'structure-and-flexibility/shared:structured': {
        title: { en: 'A plan that guards and a plan that binds', sk: 'Plán, ktorý chráni, a plán, ktorý viaže' },
        passage: {
            en: 'What {both} promise tends to arrive as described: the plan exists, each step is checked and the finish line was fixed before the start, so a handover leaves little to guess.\n\nThe same care makes a change of direction expensive. When the brief moves, the plan has to be redrawn, the checks re-listed and the finish line renegotiated. Two people who value that order may spend their effort on the revision while the quick test that would have shown whether the change matters goes untried. The plan is a way of protecting the work, and it can quietly become the thing being protected.',
            sk: 'To, čo {both} sľúbia, zvyčajne príde tak, ako bolo opísané: plán existuje, každý krok sa kontroluje a už pred začiatkom je určené, kedy bude hotovo, takže pri odovzdaní netreba veľa hádať.\n\nTá istá starostlivosť zdražuje zmenu smeru. Keď sa zadanie pohne, treba plán prekresliť, kontroly znova vypísať a termín dohodnúť odznova. Dvaja ľudia, ktorí si taký poriadok cenia, môžu minúť energiu na prepracovanie, kým rýchla skúška, ktorá by ukázala, či na zmene záleží, ostane nevyskúšaná. Plán má prácu chrániť a potichu sa môže stať tým, čo sa chráni.',
        },
        aside: {
            en: 'Plans kept and steps checked: that is how {both} tend to work, so a handover leaves little to guess. When the brief moves, though, redrawing the plan can take the place of trying out the change.',
            sk: 'Plány sa držia a kroky sa kontrolujú: tak {both} zvyčajne pracujú, a preto pri odovzdaní netreba veľa hádať. Keď sa však zadanie pohne, prekresľovanie plánu môže nahradiť vyskúšanie zmeny.',
        },
        step: { en: 'Agree that a small trial may run outside the plan when the brief changes, before anyone redraws the plan.', sk: 'Dohodnite sa, že pri zmene zadania môže prebehnúť malá skúška aj mimo plánu, skôr než niekto plán prekreslí.' },
        question: { en: 'When the brief last changed, was the plan updated first or the change tried first, and which would have shown more?', sk: 'Čo sa pri poslednej zmene zadania stalo skôr: aktualizoval sa plán, alebo sa vyskúšala zmena, a čo by ukázalo viac?' },
    },
    'structure-and-flexibility/shared:adaptable': {
        title: { en: 'Movement without a record', sk: 'Pohyb bez záznamu' },
        passage: {
            en: '{both} are seldom thrown by a change in the brief: work can start before every detail is fixed, the approach bends to what turns up, and the project follows the situation instead of the first plan.\n\nWhat thins out is the dull layer that makes the movement legible: the checklist, the final verification, the note of what was agreed and when it changed. Each may adjust and carry the current version in memory, so the work can exist in two slightly different forms with neither aware. It tends to surface when a third person receives it and finds that few of the decisions were written down.',
            sk: '{both} sa zmenou v zadaní len zriedka nechajú vyviesť z miery: práca môže začať skôr, než je každý detail pevný, postup sa prispôsobuje tomu, čo sa objaví, a projekt sleduje situáciu, nie prvý plán.\n\nUbúda všetko to nudné, vďaka čomu sa dá pohyb sledovať: kontrolný zoznam, záverečné overenie, poznámka o tom, čo sa dohodlo a kedy sa to zmenilo. Každý sa môže prispôsobovať a aktuálnu verziu nosiť v hlave, takže práca môže existovať v dvoch trochu odlišných podobách a nikto o tom nevie. Zvyčajne to vyjde najavo, keď prácu preberie tretí človek a zistí, že zapísaných rozhodnutí je málo.',
        },
        aside: {
            en: 'Adjusting freely, {both} can keep the work close to the situation and leave little record of how it got there. Two slightly different versions can then circulate until someone else asks which one is current.',
            sk: '{both} môžu pri voľnom prispôsobovaní držať prácu blízko situácie a nechať po sebe málo záznamov o tom, ako sa došlo k súčasnému stavu. Potom môžu kolovať dve trochu odlišné verzie, kým sa niekto ďalší nespýta, ktorá platí.',
        },
        step: { en: 'Keep one running note of what changed and why, updated by whoever made the change, and treat it as the version of record.', sk: 'Veďte jednu priebežnú poznámku o tom, čo sa zmenilo a prečo, nech zmeny zapisuje ten, kto ich robí, a berte poznámku ako záväznú verziu.' },
        question: { en: 'If someone new took over today, which decisions would be found written down, and which would have to be asked about?', sk: 'Keby dnes prácu preberal niekto nový, ktoré rozhodnutia by sa našli zapísané a na ktoré by sa bolo treba spýtať?' },
    },
    'structure-and-flexibility/opposed': {
        title: { en: 'A plan is a promise, or a first guess', sk: 'Plán ako sľub, alebo prvý odhad' },
        passage: {
            en: '{p0} tends to treat a plan as a promise: once written, it is what others can lean on. {p1} is more likely to treat it as the best guess so far, to be updated when the work shows more. Both are sensible uses of a plan, and together they let the work stay responsive without losing its checks.\n\nThe two meet badly at one point: the change nobody announces. {p1} may adjust, since that is what a guess is for, and {p0} may find out only at the review, where a sensible change looks like a broken promise. A difference in method then becomes an argument about reliability, when what was missing was one sentence saying that the plan had moved.',
            sk: '{p0} zvyčajne berie plán ako sľub: čo je raz napísané, na to sa môžu ostatní spoľahnúť. {p1} skôr berie plán ako doterajší najlepší odhad, ktorý sa upraví, keď práca ukáže viac. Oba spôsoby sú rozumné a spolu dovolia práci reagovať bez toho, aby prišla o kontroly.\n\nZle sa stretnú v jednom bode: v zmene, ktorú nikto neohlási. {p1} môže upraviť, lebo na to odhad slúži, a {p0} sa to môže dozvedieť až na kontrole, kde rozumná zmena vyzerá ako porušený sľub. Rozdiel v spôsobe práce sa potom mení na spor o spoľahlivosť, hoci chýbala len jedna veta o tom, že sa plán posunul.',
        },
        aside: {
            en: 'Promise or best guess: {p0} tends to hold a plan as the first and {p1} as the second. An unannounced change can then look like a broken commitment on one side and like ordinary adjusting on the other.',
            sk: 'Sľub, alebo najlepší odhad: {p0} zvyčajne drží plán ako prvé a {p1} ako druhé. Neohlásená zmena potom môže na jednej strane vyzerať ako porušený záväzok a na druhej ako bežná úprava.',
        },
        step: { en: 'Mark in the plan which lines are promises and which are guesses, and say aloud whenever a line moves from one kind to the other.', sk: 'Označte v pláne, ktoré riadky sú sľuby a ktoré odhady, a hovorte nahlas, keď sa riadok presúva z jedného druhu do druhého.' },
        question: { en: 'Which parts of the current plan are promises that others rely on, and which are guesses that may change?', sk: 'Ktoré časti terajšieho plánu sú sľuby, na ktoré sa spoliehajú iní, a ktoré odhady, čo sa môžu zmeniť?' },
    },
    'structure-and-flexibility/opposed:structured': {
        title: { en: 'Adjust and tell, or ask and adjust', sk: 'Upraviť a povedať, alebo spýtať sa a upraviť' },
        passage: {
            en: 'As the work shows what it needs, {second} is more inclined to adjust, while {first} tends to keep the plan and the definition of done. With more say or experience on the planning side, every adjustment on the other can raise a small question: is this inside the plan, or is it a change that needs agreement?\n\nTwo things can happen to that question. It can be asked every time, which slows the adjusting that was the point. Or it can go unasked, so changes are made quietly and found at the review, where a sensible adjustment can be read as a departure. Whether {second} may adjust and then tell, or needs to ask first, is the line the whole arrangement runs along.',
            sk: 'Podľa toho, čo práca ukazuje, sa {second} skôr prispôsobuje, kým {first} zvyčajne drží plán aj to, čo sa bude považovať za hotové. Keď je na strane plánu väčšie slovo alebo viac skúseností, každá úprava na druhej strane môže zdvihnúť malú otázku: je to ešte v pláne, alebo je to zmena, na ktorej sa treba dohodnúť?\n\nS touto otázkou sa môžu stať dve veci. Môže sa klásť zakaždým, čo spomaľuje práve tie úpravy, o ktoré išlo. Alebo sa nepoloží, takže zmeny sa robia potichu a vyjdú najavo na kontrole, kde rozumná úprava môže pôsobiť ako odchýlka. Celé usporiadanie stojí na tom, či smie {second} najprv upraviť a potom povedať, alebo sa má najprv spýtať.',
        },
        aside: {
            en: 'When {first} holds the plan and has more say or experience, each adjustment {second} makes can become a question of permission. Asked every time, it slows the work; left unasked, it surfaces at the review.',
            sk: 'Keď {first} drží plán a má väčšie slovo alebo skúsenosti, každá úprava, ktorú {second} urobí, sa môže stať otázkou povolenia. Ak sa na povolenie pýta zakaždým, práca sa spomaľuje; ak nie, úprava vyjde najavo na kontrole.',
        },
        step: { en: 'Define in advance which kinds of adjustment may be made and reported afterwards, and which need a decision first.', sk: 'Určte vopred, ktoré druhy úprav sa smú urobiť a nahlásiť až potom a ktoré potrebujú najprv rozhodnutie.' },
        question: { en: 'Which adjustment was last made quietly and surprised the other?', sk: 'Ktorá posledná úprava sa urobila potichu a druhú stranu prekvapila?' },
    },
    'structure-and-flexibility/opposed:adaptable': {
        title: { en: 'The same change, two different bills', sk: 'Tá istá zmena, dva rôzne účty' },
        passage: {
            en: 'A change of mind costs the two of them different amounts. {first} tends to adjust the direction as the work teaches something, and with more say or experience behind it, the adjustment can become the new course at once. {second} tends to work from a plan with checks attached, so the same change can mean the plan is out of date, finished steps may need redoing and the definition of done has shifted.\n\nThe cost is easy to miss from the side that makes the change, and the one who bears it may hesitate to name it. What looks like resistance to flexibility can be the plain arithmetic of rebuilding. A change announced with the parts it touches is a different thing from a change announced as a direction.',
            sk: 'Zmena názoru môže každého z dvojice stáť inú cenu. {first} zvyčajne upravuje smer podľa toho, čo ukáže práca, a keďže má väčšie slovo alebo skúsenosti, úprava sa môže hneď stať novou cestou. {second} skôr pracuje z plánu s kontrolami, takže tá istá zmena môže znamenať, že plán je zastaraný, hotové kroky sa možno budú musieť robiť odznova a to, čo sa považuje za hotové, sa posunulo.\n\nZo strany, ktorá zmenu robí, sa cena ľahko prehliadne a strana, ktorá platí, sa môže zdráhať cenu pomenovať. To, čo vyzerá ako odpor voči pružnosti, môže byť obyčajné počítanie toho, čo treba prestavať. Zmena oznámená spolu s tým, čoho sa dotýka, je iná vec než zmena oznámená ako smer.',
        },
        aside: {
            en: 'When {first} changes direction, the change can be cheap to make and costly to absorb. {second} may have to redo the plan, the checks and the definition of done, and may hesitate to say what that costs.',
            sk: 'Keď {first} zmení smer, urobiť zmenu môže byť lacné a zapracovať zmenu drahé. {second} možno musí prerobiť plán, kontroly aj to, čo sa počíta za hotové, a môže sa zdráhať povedať, koľko to stojí.',
        },
        step: { en: 'When the direction changes, list the steps it touches and what has to be redone, so that the cost is visible to whoever decided the change.', sk: 'Pri zmene smeru vypíšte, ktorých krokov sa dotýka a čo treba prerobiť, aby cenu videla aj strana, ktorá o zmene rozhodla.' },
        question: { en: 'Who found out last about the last change, and what had been done by then?', sk: 'Kto sa o poslednej zmene dozvedel ako posledný a čo sa dovtedy už urobilo?' },
    },
    'structure-and-flexibility/oneSided:structured': {
        title: { en: 'A spine that bends without telling', sk: 'Plán, ktorý sa ohýba bez ohlásenia' },
        passage: {
            en: '{lean} tends to write the plan and check the steps; {mid}, without a strong pull either way, may follow it or work around it. A plan that its second person can bypass without friction stays alive only as long as {lean} keeps checking it, and little in the daily work may show how much of it still describes what is being done.\n\nWhen {mid} works around a step, a different tool for the job or a shortcut past a check, there may be no signal. {lean} may go on verifying against the plan while the work has taken another route, and the review can turn into a comparison of two descriptions of the same work. The spine holds as long as both know where it has been bent.',
            sk: '{lean} zvyčajne píše plán a kontroluje kroky; {mid} bez vyhraneného sklonu môže plán nasledovať aj obísť. Plán, ktorý sa dá bez trenia obísť, sa udrží len dovtedy, kým {lean} neprestáva kontrolovať, a v dennej práci možno máločo ukáže, koľko z plánu ešte opisuje to, čo sa naozaj robí.\n\nKeď {mid} krok obíde, napríklad iným nástrojom alebo skratkou popri kontrole, nemusí to nikto zbadať. {lean} môže ďalej overovať podľa plánu, kým práca beží inou cestou, a kontrola sa môže zmeniť na porovnávanie dvoch opisov tej istej práce. Plán drží, kým každý vie, kde sa ohol.',
        },
        aside: {
            en: 'If {lean} keeps the plan and {mid} can work around a step without friction, the plan may drift quietly away from the work. A review can then end up comparing two accounts of the same job.',
            sk: 'Ak plán drží {lean} a {mid} môže krok bez trenia obísť, plán sa môže potichu vzďaľovať od práce. Kontrola potom môže skončiť porovnávaním dvoch opisov tej istej práce.',
        },
        step: { en: 'When a step is bypassed, record it on the plan itself, so that the plan keeps describing the work that is actually done.', sk: 'Keď sa niektorý krok obíde, zapíšte to rovno do plánu, aby plán naďalej opisoval prácu, ktorá sa naozaj robí.' },
        question: { en: 'Which steps of the plan are still followed as written, and which have already been quietly changed?', sk: 'Ktoré kroky plánu sa ešte dodržiavajú tak, ako sú napísané, a ktoré sa už potichu zmenili?' },
    },
    'structure-and-flexibility/oneSided:adaptable': {
        title: { en: 'Follow or hold: who writes the change down', sk: 'Nasledovať, alebo držať: kto zapíše zmenu' },
        passage: {
            en: 'A change of direction can meet a second person who has a choice about it: {lean} tends to move as the work moves, and {mid} can go along or hold steady. Following keeps the pair moving. Holding steady keeps one fixed point in the work, which is useful when someone is waiting for the version agreed earlier.\n\nWhat can be unclear is which of the two {mid} is doing at a given moment. The work can drift between the modes without a word, and a colleague, or the other half of the pair, may be working from the earlier version while the direction has moved on. From the outside, following and holding can look alike until the two versions meet.',
            sk: 'Pri zmene smeru môže mať druhá strana na výber: {lean} sa zvyčajne hýbe tak, ako sa hýbe práca, a {mid} sa môže pridať alebo zostať pri pôvodnom. Ak sa {mid} pridá, dvojica ostane v pohybe. Ak {mid} drží pôvodný smer, v práci ostane jeden pevný bod, čo sa hodí, keď niekto čaká na skôr dohodnutú verziu.\n\nNejasné môže byť, ktorú z týchto dvoch vecí {mid} práve robí. Práca môže bez slova kĺzať z jedného do druhého a kolega alebo druhá polovica dvojice môže pracovať podľa staršej verzie, kým sa smer už posunul. Zvonka môže nasledovanie aj držanie vyzerať rovnako, kým sa dve verzie nestretnú.',
        },
        aside: {
            en: 'As the work moves, {lean} tends to adjust with it, and {mid} can follow or hold steady without saying which. Two versions of the work can then run side by side until someone writes the change down.',
            sk: 'Keď sa práca hýbe, {lean} sa zvyčajne prispôsobí a {mid} môže nasledovať alebo držať pôvodný smer bez slova o tom, čo robí. Dve verzie práce potom môžu bežať vedľa seba, kým niekto zmenu nezapíše.',
        },
        step: { en: 'Whenever the direction moves, let the one who can follow or hold say which is being done: the change followed, or the earlier version held.', sk: 'Keď sa smer posunie, nech strana, ktorá môže nasledovať alebo držať, povie, čo robí: či zmenu nasleduje, alebo drží staršiu verziu.' },
        question: { en: 'Where would a newcomer look to find out which version is current?', sk: 'Kde by sa nováčik dozvedel, ktorá verzia je aktuálna?' },
    },
    /* ------------------------------------------------------------------ risk: risk-and-caution */
    'risk-and-caution/shared:cautious': {
        title: { en: 'Two careful people, one open question', sk: 'Dvaja opatrní, jedna otvorená otázka' },
        passage: {
            en: '{both} tend to check what could go wrong before they commit, and to prefer decisions that can be undone. What they build is likely to have its costs looked at and its exits in place, and little may need reversing in a hurry.\n\nA decision not taken leaves no trace, though. One can suggest a further check, the other can agree since agreeing seems the careful thing, and the opportunity can pass in a run of reasonable pauses that nobody records as a choice. Two people who value caution seldom disagree about a risk; they can take turns waiting for the other to be sure enough.',
            sk: '{both} zvyčajne skôr, než sa zaviažu, preverujú, čo sa môže pokaziť, a uprednostňujú rozhodnutia, ktoré sa dajú vziať späť. Pri tom, čo postavia, budú pravdepodobne náklady prepočítané a východ pripravený a máločo bude treba narýchlo odvolávať.\n\nRozhodnutie, ktoré sa neurobilo, však po sebe nezanechá stopu. Jedna strana môže navrhnúť ďalšiu kontrolu, druhá môže súhlasiť, lebo súhlas vyzerá opatrne, a príležitosť môže prejsť v rade rozumných odkladov, ktoré nikto nezapíše ako rozhodnutie. Dvaja opatrní ľudia sa len zriedka hádajú o riziku; skôr sa môžu striedať v čakaní, kým si bude dosť istá druhá strana.',
        },
        aside: {
            en: 'Looking for the downside first, {both} can let a pending choice collect one reasonable pause after another. No single pause looks like a decision, and an opportunity can lapse without anyone having chosen to let it.',
            sk: 'Keď {both} hľadajú najprv slabé miesta, pri čakajúcej voľbe sa môže nahromadiť jeden rozumný odklad za druhým. Žiadny odklad nevyzerá ako rozhodnutie a príležitosť môže prepadnúť bez toho, aby to niekto zvolil.',
        },
        step: { en: 'Put a decision date next to each pending choice, and count what waiting past it would cost as well as what acting would risk.', sk: 'Pri každej čakajúcej voľbe uveďte dátum rozhodnutia a počítajte nielen s tým, čo by riskovalo konanie, ale aj s tým, čo by stálo čakanie po tomto dátume.' },
        question: { en: 'Which decision has had its checks repeated, and what would the two of you need to see to call it enough?', sk: 'Ktoré rozhodnutie sa dočkalo opakovaných kontrol a čo by ste potrebovali vidieť, aby ste povedali, že stačí?' },
    },
    'risk-and-caution/shared:risk-oriented': {
        title: { en: 'Small bets on one account', sk: 'Malé stávky na jednom účte' },
        passage: {
            en: '{both} tend to move before the picture is complete and to read a missed attempt as information, so the pair can test a lot and learn early what does not work.\n\nEach bet can be reasonable on its own, which is how they stack. Neither may be inclined to ask the question on the far side of a bet, what happens if this goes wrong. Nor may either add the bets together, so the same money, time or client goodwill can stand behind several of them at once. The risk sits less in any single leap than in the sum, which can grow without being seen.',
            sk: '{both} sa zvyčajne pohnú skôr, než je obraz úplný, a nevydarený pokus berú ako informáciu, takže dvojica môže veľa skúšať a skoro zistiť, čo nefunguje.\n\nKaždá stávka môže byť sama osebe rozumná, a práve preto sa hromadia. Nikto z dvojice nemusí mať chuť pýtať sa na to, čo stávka môže stáť: čo sa stane, ak sa to pokazí. Nikto ich ani nemusí sčítavať, takže tie isté peniaze, čas alebo dobrá vôľa klienta môžu stáť za viacerými naraz. Riziko je menej v jednom skoku ako v súčte, ktorý môže rásť bez povšimnutia.',
        },
        aside: {
            en: 'Moving early, {both} can rest a string of reasonable bets on the same money, time or goodwill. What the bets add up to is a question neither may think to ask.',
            sk: '{both} sa zvyčajne rýchlo pustia do veci a viacero rozumných stávok môže stáť na tých istých peniazoch, čase alebo dobrej vôli. Koľko toho spolu riskujú naraz, je otázka, na ktorú nemusí nikto z nich pomyslieť.',
        },
        step: { en: 'Keep one shared list of the bets currently open, with what each puts at stake, and read it together before adding another.', sk: 'Veďte jeden spoločný zoznam práve otvorených stávok s tým, čo každá dáva do hry, a skôr než pribudne ďalšia, prejdite si zoznam spolu.' },
        question: { en: 'Taken together, what is at stake across the bets that are open, and who would notice if it grew?', sk: 'Čo je spolu v hre pri všetkých otvorených stávkach a kto by si všimol, keby to narástlo?' },
    },
    'risk-and-caution/opposed': {
        title: { en: 'Counting different losses', sk: 'Počítanie rôznych strát' },
        passage: {
            en: '{p0} tends to count what can be lost by acting, and {p1} what can be lost by waiting. Both are real costs, and each is easy to miss from the other side: a loss from a bet is plain once it has happened, while the loss from a bet not placed is rarely itemised. A proposal that has survived both counts can be better shaped than one that went through either alone.\n\nIn the poorer version, {p1} can start deciding alone to get past the brake, {p0} can start blocking by default to keep a say, and each can come to look like what the other was wary of. Until then, each supplies the half the decision lacks.',
            sk: '{p0} zvyčajne počíta, čo sa dá stratiť konaním, a {p1}, čo sa dá stratiť čakaním. Tieto dve straty sú skutočné a z druhej strany sa každá ľahko prehliadne: strata zo stávky je jasná, keď nastane, kým o stávke, ktorá sa nevsadila, nikto nevedie účty. Návrh, ktorý prešiel jedným aj druhým počtom, môže byť lepšie premyslený než ten, čo prešiel len jedným.\n\nV horšej verzii môže {p1} začať rozhodovať osamote, aby sa obišla brzda, {p0} môže začať automaticky blokovať ako jediný spôsob, ako si udržať hlas, a každý môže začať vyzerať ako to, čoho sa druhá strana obávala. Dovtedy každý dopĺňa polovicu, ktorá rozhodnutiu chýba.',
        },
        aside: {
            en: 'Acting has a cost and so does waiting: {p0} tends to see the first and {p1} the second. Each is easy to miss from the other side, since a lost bet shows plainly while a bet not placed is seldom counted.',
            sk: 'Konanie má svoju cenu a čakanie tiež: {p0} zvyčajne vidí prvú a {p1} druhú. Každá sa z druhej strany ľahko prehliadne, lebo prehratú stávku je jasne vidieť, kým stávku, ktorá sa nevsadila, málokto počíta.',
        },
        step: { en: 'For each decision, write down the cost of acting and the cost of waiting, and let each person fill in the column the other tends to leave out.', sk: 'Pri každom rozhodnutí napíšte cenu konania a cenu čakania a nech každý vyplní stĺpec, ktorý druhá strana zvykne vynechať.' },
        question: { en: 'What would waiting cost on the decision in front of you, and what would acting cost, in words both of you accept?', sk: 'Čo by stálo čakanie pri rozhodnutí, ktoré máte pred sebou, a čo konanie, slovami, ktoré by prijal každý z vás?' },
    },
    'risk-and-caution/opposed:cautious': {
        title: { en: 'A “not yet” with no size', sk: '„Ešte nie“ bez miery' },
        passage: {
            en: '{second} tends to see an opportunity and want to test it; {first} is more likely to ask what the worst case would be. Since {first} has more say or more experience, a hesitation can work as a decision whatever it was meant as: “not yet” stops the proposal, and the proposal has no way to ask what “yet” would take.\n\nThat can push {second} towards proposing less, or towards acting in small ways that do not reach the gate. Proposing less costs the work its ideas; acting below the gate hides exactly what {first} would need to see to guard the downside. Both losses come from the same place: a “not yet” that carries no size and no condition.',
            sk: '{second} zvyčajne vidí príležitosť a chce príležitosť vyskúšať; {first} sa skôr pýta, aký by bol najhorší prípad. Keďže {first} má väčšie slovo alebo viac skúseností, váhanie môže pôsobiť ako rozhodnutie, nech bolo myslené akokoľvek: „ešte nie“ návrh zastaví a návrh sa nemá ako opýtať, čo by muselo platiť, aby prišlo „už“.\n\n{second} potom môže navrhovať menej, alebo konať po malých krokoch, ktoré k bráne ani nedôjdu. Keď sa navrhuje menej, práca prichádza o nápady; keď sa koná pod bránou, skrýva sa práve to, čo {first} potrebuje vidieť na stráženie pred stratami. Tieto dve straty majú ten istý zdroj: „ešte nie“, ktoré nemá ani veľkosť, ani podmienku.',
        },
        aside: {
            en: 'Caution from the side with more say or experience can act as a gate. Say {second} proposes a test and {first} answers “not yet”: with no size or condition, the answer stops the idea without saying what would let it through.',
            sk: 'Opatrnosť zo strany s väčším slovom alebo skúsenosťami môže pôsobiť ako brána. Povedzme, že {second} navrhne skúšku a {first} odpovie „ešte nie“ a bez veľkosti či podmienky odpoveď nápad zastaví a nepovie, čo by nápad pustilo ďalej.',
        },
        step: { en: 'Let every “not yet” come with one condition or one limit: what would need to be known, or how small a first test could be.', sk: 'Nech každé „ešte nie“ prichádza s jednou podmienkou alebo hranicou: čo by sa muselo vedieť, alebo aká malá môže byť prvá skúška.' },
        question: { en: 'What would have to be true for a “not yet” on the current proposal to become a yes?', sk: 'Čo by muselo platiť, aby sa „ešte nie“ k terajšiemu návrhu zmenilo na áno?' },
    },
    'risk-and-caution/opposed:risk-oriented': {
        title: { en: 'A doubt before the bet, a doubt after', sk: 'Pochybnosť pred stávkou a po stávke' },
        passage: {
            en: '{first} is quick to see the upside, and with more say or experience behind it, a bet may need only to be mentioned to be under way. {second} is more inclined to check what could go wrong and may be the one who can see the weak point. That makes the timing matter: before a commitment a doubt is information, and after it a doubt can sound like second thoughts.\n\nCaution that arrives late is easily heard as opposition, and caution held back to avoid that is lost altogether. An objection that comes with a smaller version of the bet, or a way out, tends to be heard as part of the plan. Without a set point before the bet at which the downside is expected to be named, a doubt has only awkward moments left to arrive in.',
            sk: '{first} rýchlo zbadá výhodu a keďže má väčšie slovo alebo skúsenosti, stávku možno stačí len spomenúť, aby už bežala. {second} skôr skúma, čo sa môže pokaziť, a slabé miesto môže uvidieť práve {second}. Preto záleží na načasovaní: pred záväzkom je pochybnosť informácia, po záväzku môže znieť ako dodatočné váhanie.\n\nOpatrnosť, ktorá príde neskoro, sa ľahko počuje ako odpor, a opatrnosť zadržaná, aby sa tomu predišlo, sa stratí úplne. Námietka, ktorá príde s menšou verziou stávky alebo s cestou von, sa zvykne počuť ako súčasť plánu. Ak pred stávkou nie je pevný bod, v ktorom sa očakáva, že niekto pomenuje nevýhody, pochybnosti ostanú len nevhodné chvíle.',
        },
        aside: {
            en: 'When {first} proposes a bet, the weight of more say or experience can put it under way almost as soon as it is mentioned. A doubt {second} raises before the commitment is information; the same doubt afterwards can sound like second thoughts.',
            sk: 'Keď {first} navrhne stávku, vďaka väčšiemu slovu alebo skúsenostiam môže bežať takmer hneď, ako sa spomenie. Pochybnosť, ktorú {second} vysloví pred záväzkom, je informácia; tá istá pochybnosť po záväzku môže znieť ako dodatočné váhanie.',
        },
        step: { en: 'Before any commitment, ask the one with less say to name the biggest risk, and record the answer.', sk: 'Pred každým záväzkom nechajte stranu s menším slovom pomenovať najväčšie riziko a odpoveď zapíšte.' },
        question: { en: 'At what point in the last bet could a doubt have been raised as information instead of as an objection?', sk: 'V ktorom bode poslednej stávky sa dala pochybnosť povedať ako informácia, nie ako námietka?' },
    },
    'risk-and-caution/oneSided:cautious': {
        title: { en: 'The swing vote on every risk', sk: 'Rozhodujúci hlas pri každom riziku' },
        passage: {
            en: '{lean} tends to watch the downside and {mid}, leaning neither way, can tip a risky decision in either direction, so in practice {mid} may be the one who settles it, whether or not that was agreed. If {mid} sides with the caution the pair is careful; if {mid} sides with the opportunity it is bold, and {lean} has been outvoted by a person who had not declared a side.\n\nThat makes the caution most useful as an early warning, said while the choice is still open, and least useful as a late brake. {mid} does not hold a neutral position either: siding with one is a decision about the other, and it lands differently when it is visible than when it is left implied.',
            sk: '{lean} zvyčajne sleduje nevýhody a {mid} bez sklonu na jednu či druhú stranu môže rizikové rozhodnutie prevážiť ktorýmkoľvek smerom, takže v praxi môže rozhodovať {mid}, či sa to tak dohodlo, alebo nie. Ak sa {mid} prikloní k opatrnosti, dvojica je opatrná; ak k príležitosti, je odvážna a {lean} ostane v menšine voči strane, ktorá sa vopred k ničomu nehlásila.\n\nOpatrnosť je preto najužitočnejšia ako včasné varovanie, vyslovené, kým je voľba ešte otvorená, a najmenej užitočná ako neskorá brzda. Ani {mid} nestojí na neutrálnom mieste: priklonenie k jednej strane je rozhodnutie o druhej a pôsobí inak, keď je viditeľné, než keď sa len naznačí.',
        },
        aside: {
            en: 'Whenever {lean} raises what could go wrong, {mid}, leaning neither way, can turn the warning into a stop or let it pass. {mid} can then hold the deciding vote on a risk, though the choice is seldom named as one.',
            sk: 'Kedykoľvek {lean} upozorní, čo sa môže pokaziť, {mid} bez vyhraneného sklonu môže z varovania urobiť zastavenie, alebo varovanie nechať prejsť. {mid} tak môže mať pri riziku rozhodujúci hlas, hoci sa voľba len málokedy pomenuje ako voľba.',
        },
        step: { en: 'On each risky decision, let the one who can go either way say which side is taken and why, so that the deciding vote is visible.', sk: 'Pri každom rizikovom rozhodnutí nech ten, kto sa vie prikloniť na ktorúkoľvek stranu, povie, ktorú berie a prečo, aby bolo vidieť, kto má rozhodujúci hlas.' },
        question: { en: 'On the last risky decision, whose view settled it, and did both of you know that at the time?', sk: 'Čie stanovisko rozhodlo pri poslednom rizikovom rozhodnutí a bolo vám to v tej chvíli jasné?' },
    },
    'risk-and-caution/oneSided:risk-oriented': {
        title: { en: 'A yes with no size attached', sk: 'Súhlas bez určenej miery' },
        passage: {
            en: '{lean} tends to reach for the opportunity, and {mid}, with no strong pull either way, can speed a bet up or slow it down. When {mid} says yes, the word may mean go, or go within reason, and the proposal can move ahead on whichever was heard. The yes carries no size, so {lean} may take the green light to cover the whole bet while {mid} meant a first part of it.\n\nThe pair can combine a quick start with a second look; much turns on whether the size of the bet is stated before the yes. Without it, a shared decision can turn out to have been two separate decisions that happened to use the same word.',
            sk: '{lean} zvyčajne siaha po príležitosti a {mid} bez silného sklonu môže stávku urýchliť alebo pribrzdiť. Keď {mid} povie áno, to slovo môže znamenať „poďme“ alebo „poďme s mierou“ a návrh sa môže pohnúť podľa toho, čo sa počulo. Áno nehovorí nič o veľkosti, a tak {lean} môže zelenú vziať za súhlas s celou stávkou, kým {mid} myslí len prvú časť.\n\nDvojica môže spojiť rýchly štart s druhým pohľadom; veľa záleží na tom, či sa veľkosť stávky povie pred áno. Bez toho sa môže ukázať, že za spoločným rozhodnutím boli v skutočnosti dve oddelené, ktoré len použili to isté slovo.',
        },
        aside: {
            en: 'A yes given without a size can cover the whole bet in one mind and only a first part of it in the other. {lean} tends to reach for the opportunity, and {mid} can add speed or hold back.',
            sk: 'Áno bez určenej veľkosti môže v jednej hlave znamenať celú stávku a v druhej len prvú časť. {lean} zvyčajne siaha po príležitosti a {mid} môže pridať na rýchlosti alebo pribrzdiť.',
        },
        step: { en: 'State the size of a bet, in money, time or exposure, before anyone says yes, and let the yes apply to that size.', sk: 'Veľkosť stávky, v peniazoch, čase alebo miere rizika, povedzte skôr, než niekto povie áno, a nech áno platí pre túto veľkosť.' },
        question: { en: 'When the last bet was agreed, did both hold the same limit in mind, and was it said aloud?', sk: 'Mali ste pri poslednej dohodnutej stávke na mysli rovnakú hranicu a povedala sa nahlas?' },
    },
};
export default WORK_A;
