/**
 * PARENTING. The adult holds the greater responsibility for adapting; nothing here labels a child or predicts one, and what is said of a child is a tendency the adult can meet. The age guide carries what is specific to an age. Part a1 (inner focus, reasoning, autonomy, structure, risk: shared and opposed forms).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 */
const PARENTING_A1 = {
    /* ------------------------------------------------------------ inner focus: processing-pace -- */
    'processing-pace/shared:introspective': {
        title: { en: 'Two who settle things inside first', sk: 'Dvojica, ktorá to najprv vyrieši v sebe' },
        passage: {
            en: '{both} both tend to go inward before they go outward, so a hard moment between them can pass without a raised voice and without a sentence said in haste. Each tends to give the other room to arrive at a thought before it is spoken.\n\nThe same quiet has a second reading. An adult who goes silent can look to a child like displeasure, and a child who goes silent can look like sulking. When each waits for the other to speak first, a feeling that could have been said in a minute may stay unsaid. A quiet that carries some sign of what it is can read very differently from one that carries none.',
            sk: '{both} sa zvyknú najprv utiahnuť do seba a až potom hovoriť, a tak môže ťažká chvíľa medzi nimi prejsť bez zvýšeného hlasu a bez vety povedanej v zhone. Každý zvykne druhému nechať čas dôjsť k myšlienke skôr, než zaznie nahlas.\n\nTo isté ticho má aj druhú stránku. Keď dospelý človek stíchne, dieťaťu to môže pripadať ako nespokojnosť, a keď stíchne dieťa, dospelému človekovi to môže pripadať ako trucovanie. Ak každý čaká, kým prehovorí ten druhý, pocit, ktorý sa dal povedať za minútu, môže zostať nevyslovený. Ticho, z ktorého sa dá aspoň trochu poznať, o čo ide, môže pôsobiť úplne inak než ticho bez akéhokoľvek náznaku.',
        },
        aside: {
            en: '{both} can let a hard moment pass in quiet, so little is said in haste. The same quiet can be read as displeasure from either side, and each may wait for the other to speak first.',
            sk: '{both} môžu nechať ťažkú chvíľu prejsť v tichu, takže sa v zhone povie málo. To isté ticho sa však dá z ktorejkoľvek strany vziať ako nespokojnosť a každý môže čakať, kým prehovorí ten druhý.',
        },
        step: { en: 'Give the quiet a name the child can use, such as “thinking” and “not cross”, so that a silence does not have to be guessed.', sk: 'Dajte tichu pomenovanie, ktoré dieťa vie použiť, napríklad „rozmýšľam“ alebo „nehnevám sa“, aby nikto nemusel hádať, čo mlčanie znamená.' },
        question: { en: 'How does each of you show that a quiet moment is thinking and not distance?', sk: 'Ako každý z vás dá najavo, že tichá chvíľa je premýšľanie, a nie odstup?' },
    },
    'processing-pace/shared:outwardly-engaged': {
        title: { en: 'Two talkers and one pair of ears', sk: 'Dvaja rozprávači a jedno voľné ucho' },
        passage: {
            en: 'When {both} are upset, the feeling tends to go straight into words. That gives the household something useful: little is likely to stay underground, and what is wrong is out in the open while it can still be sorted.\n\nThe difficulty is that listening needs a free pair of ears. After a hard moment, adult and child can talk at once, each telling the story as it looks from where each stands, and one upset becomes two accounts running side by side with nobody receiving either. Only one of the two has to pause for the other to be heard, and the adult has the wider means to be that one.',
            sk: 'Keď sa {both} rozrušia, pocit sa zvykne hneď premeniť na slová. Domácnosti to dáva niečo užitočné: máločo zvyčajne zostane skryté a to, čo je zle, vyjde najavo, kým sa to ešte dá vyriešiť.\n\nHáčik je v tom, že na počúvanie treba voľné ucho. Po ťažkej chvíli môžu dospelý človek aj dieťa hovoriť naraz, každý rozpráva, ako to vidí zo svojho miesta, a z jedného rozrušenia sú zrazu dve verzie, ktoré bežia vedľa seba, a nikto nepočúva ani jednu. Aby niekto počúval, stačí, keď sa jeden z dvoch zastaví, a dospelý človek má viac možností urobiť to ako prvý.',
        },
        aside: {
            en: 'When {both} are upset, it tends to come out loud, so little goes underground. The price is that two accounts can run at once with no one left to listen.',
            sk: 'Keď sa {both} rozrušia, zvyčajne to hneď zaznie nahlas, takže máločo zostane skryté. Cena je, že môžu bežať dve verzie naraz a nezostane nikto, kto by počúval.',
        },
        step: { en: 'Agree that when a feeling is big the child speaks first and the adult only listens, and that the adult’s side comes afterwards.', sk: 'Dohodnite sa, že keď je pocit veľký, hovorí najprv dieťa a dospelý človek len počúva, a že svoju stranu povie dospelý človek až potom.' },
        question: { en: 'When both of you have something to say about the same moment, who is better placed to wait, and what would help the waiting?', sk: 'Keď máte vy dvaja čo povedať o tej istej chvíli, kto z vás môže ľahšie počkať a čo by čakanie uľahčilo?' },
    },
    'processing-pace/opposed:introspective': {
        title: { en: 'A minute inside meets a story that cannot wait', sk: 'Minúta v sebe a príbeh, ktorý nepočká' },
        passage: {
            en: '{second} tends to bring an upset the moment it happens, while {first} may take a minute inward before words come. That minute can let {first} become the calm listener a hot story needs, and it is also where a misunderstanding can start: the child stands in the pause, hears no answer and says it again, louder.\n\nTo a child who talks things out, a silence from the adult can read as being turned away rather than as getting ready to listen. Whether the pause helps may depend less on its length than on whether the child can tell what it is.',
            sk: '{second} zvykne prísť s rozrušením hneď, ako sa niečo stane, kým {first} možno najprv potrebuje minútu v sebe, než prídu slová. Vďaka tej minúte môže {first} počúvať pokojne, ako to horúci príbeh potrebuje, no práve tam sa môže začať aj nedorozumenie: {second} stojí v pauze, odpoveď nepočuje a povie to znova, hlasnejšie.\n\nTomu, kto si veci vyrozpráva nahlas, môže mlčanie dospelého človeka pripadať ako odvrátenie, a nie ako príprava na počúvanie. Či pauza pomôže, môže závisieť menej od toho, ako dlho trvá, než od toho, či {second} rozozná, čo znamená.',
        },
        aside: {
            en: '{first} may need a minute inward before listening, and {second} tends to talk an upset out at once. To the child, that minute can look like a closed door, whatever it is for.',
            sk: '{first} môže pred počúvaním potrebovať minútu v sebe a {second} zvykne rozrušenie vyrozprávať hneď. Druhej strane môže tá minúta pripadať ako zatvorené dvere, nech slúži na čokoľvek.',
        },
        step: { en: 'Keep a short, warm line ready for the pause, so the child hears that the listening is coming, and then keep to the time it names.', sk: 'Majte na čas pauzy pripravenú krátku, vľúdnu vetu, z ktorej bude jasné, že počúvanie príde, a potom dodržte čas, ktorý ste sľúbili.' },
        question: { en: 'What could the child hear or see during the pause that says it is a pause and not a refusal?', sk: 'Čo môže {second} počas pauzy počuť alebo vidieť, aby bolo jasné, že ide o pauzu, a nie o odmietnutie?' },
    },
    'processing-pace/opposed:outwardly-engaged': {
        title: { en: 'The question at the door', sk: 'Otázka pri dverách' },
        passage: {
            en: '{first} tends to reach for the conversation while the upset is fresh, and {second} to go quiet and settle first. The two moves pass each other: a question at the door can keep the door shut, and a shut door can bring the question again.\n\nWhat {second} brings back after settling can be the more considered account, and it tends to arrive when nothing is being pressed for, beside a task or in a shared silence. {first} can still hear it, through a different door from the one first tried, and a door left unpushed tends to be easier to open from the inside.',
            sk: '{first} zvykne siahnuť po rozhovore, kým je rozrušenie čerstvé, a {second} sa radšej najprv stíši a upokojí. Tieto dva kroky sa míňajú: otázka pri dverách môže dvere nechať zatvorené a zatvorené dvere môžu priviesť ďalšiu otázku.\n\nTo, s čím {second} príde po upokojení, môže byť premyslenejšia verzia, a tá zvykne prísť vtedy, keď sa na nič netlačí, popri nejakej práci alebo v spoločnom tichu. {first} sa to môže dozvedieť aj tak, len inými dverami než tými, ktoré sa skúšali najprv, a dvere, na ktoré nikto netlačí, sa zvnútra zvyčajne otvárajú ľahšie.',
        },
        aside: {
            en: 'While an upset is fresh, {first} may want to talk it through, and {second} to go quiet first. Asking harder tends to lengthen a quiet that is there for settling.',
            sk: 'Kým je rozrušenie čerstvé, {first} môže chcieť všetko prebrať a {second} najprv stíchnuť. Naliehanie otázkami zvykne predĺžiť ticho, ktoré slúži na upokojenie.',
        },
        step: { en: 'Swap the question for nearness: stay nearby, say once that the door is open, and let the child choose the moment to return.', sk: 'Namiesto otázky ponúknite blízkosť: zostaňte nablízku, raz povedzte, že dvere sú otvorené, a nechajte, nech si {second} vyberie chvíľu, keď sa vráti.' },
        question: { en: 'Where, and beside what, does the child most easily start to talk without being asked?', sk: 'Kde a popri čom začne {second} najľahšie rozprávať, aj keď sa nikto nepýta?' },
    },
    'processing-pace/siblings:shared:introspective': {
        title: { en: 'Two closed doors after a squabble', sk: 'Dvoje zatvorených dverí po hádke' },
        passage: {
            en: 'When {both} squabble, it can end in two separate rooms. Each tends to go inward to settle, which can spare the pair most of what is said in a temper and leaves the quarrel itself for nobody to reopen.\n\nThe pattern is gentle, and a settled mood can be mistaken for a settled matter. What stays unspoken may be small, whose turn it was or who started it, and it can return as the next small spark. A first word from either that is not about the quarrel at all can be what lets the matter close.',
            sk: 'Keď sa {both} pohádajú, môže sa to skončiť v dvoch oddelených izbách. Každý sa zvykne stiahnuť do seba a upokojiť, čo môže ušetriť väčšinu toho, čo sa povie v zlosti, a samotnú hádku potom nikto znova neotvára.\n\nTakýto spôsob je jemný, no upokojenú náladu možno pomýliť s vyriešenou vecou. Nevyslovené môže byť čosi malé, napríklad poradie alebo to, kto začal, a vrátiť sa to môže ako ďalšia drobná iskra. Prvé slovo od ktoréhokoľvek z nich, ktoré sa vôbec netýka hádky, môže byť to, čo vec konečne zavrie.',
        },
        aside: {
            en: 'When {both} settle a quarrel in two separate rooms, little is said in haste. Little is picked up again either, so a small matter can wait for the next spark.',
            sk: 'Keď sa {both} po hádke rozídu do dvoch izieb, v zhone sa povie málo. Málo sa však potom aj znova otvorí, takže drobnosť môže čakať na ďalšiu iskru.',
        },
        step: { en: 'Agree on one small sign, such as a knock and an offer to do something together, that either child can use to say “I am ready again” without talking about the quarrel.', sk: 'Dohodnite jeden malý signál, napríklad zaklopať a ponúknuť niečo spoločné, ktorým môže ktorýkoľvek zo súrodencov dať najavo „už môžem znova“, bez reči o hádke.' },
        question: { en: 'What small gesture could serve as a first word after a quarrel between the two?', sk: 'Aké drobné gesto by mohlo poslúžiť ako prvé slovo po hádke medzi súrodencami?' },
    },
    'processing-pace/siblings:shared:outwardly-engaged': {
        title: { en: 'Quarrels that are loud and quick', sk: 'Hlasné a rýchle hádky' },
        passage: {
            en: '{both} tend to say what they feel as they feel it, so a quarrel between them can be out in the open at once, loud and fast, and the air can clear almost as quickly. Little is likely to be held back to be dragged up later.\n\nThe cost is that two voices with no listener can turn the telling into a contest. Each may set out a version of events and wait only to answer, and the volume can rise once getting a turn to speak becomes the point. What drives the noise may be less the quarrel itself than the doubt of getting a turn at all.',
            sk: '{both} zvyknú hovoriť, čo cítia, hneď ako to cítia, takže hádka medzi nimi môže byť okamžite na povrchu, hlasná a rýchla, a vzduch sa môže vyčistiť takmer rovnako rýchlo. Máločo si zrejme odložia na neskoršie vyťahovanie.\n\nCena je, že dva hlasy bez poslucháča môžu z rozprávania urobiť súťaž. Každý môže vykladať svoju verziu udalostí a čakať už len na chvíľu, keď odpovie, a hlasitosť môže stúpať, keď sa hlavným cieľom stane dostať slovo. Hluk možno nepoháňa ani tak samotná hádka ako obava, či sa človek k slovu vôbec dostane.',
        },
        aside: {
            en: 'Little is likely to be stored up when {both} quarrel loudly and in the open. With two speakers and no listener, though, the telling itself can become the contest.',
            sk: '{both} sa zvyknú hádať nahlas a otvorene, takže sa máločo nahromadí. Keď však hovoria dvaja a nepočúva nikto, môže sa z rozprávania stať súťaž.',
        },
        step: { en: 'Agree on a plain order of turns for a quarrel, one child telling while the other waits and then swapping, so that each knows a turn is coming.', sk: 'Dohodnite jasné poradie slova pre hádku: jeden zo súrodencov rozpráva, druhý čaká, a potom sa vymenia, aby bolo každému jasné, že sa k slovu dostane.' },
        question: { en: 'What would let each child trust that a turn to speak is coming, so that talking over the other becomes unnecessary?', sk: 'Čo by pomohlo každému zo súrodencov veriť, že sa k slovu dostane, takže prekrikovať druhého nebude treba?' },
    },
    'processing-pace/siblings:opposed': {
        title: { en: 'One presses, one retreats', sk: 'Jeden tlačí, druhý ustupuje' },
        passage: {
            en: 'After a squabble, {p1} may want it settled now while {p0} may need a closed door first, and the harder {p1} presses, the longer the quiet can last. Pursuit and retreat feed each other, and the squabble itself can fade from view while the chase carries on.\n\nBetween them the two hold both halves of a good repair: {p1} can bring what was felt in the moment and {p0} what was thought through afterwards, so a quarrel can be heard from both sides. The chase can loosen once {p1} knows the talk is coming and {p0} can say roughly when.',
            sk: 'Po hádke môže {p1} chcieť všetko vyriešiť hneď, kým {p0} môže najprv potrebovať zatvorené dvere, a čím viac {p1} tlačí, tým dlhšie môže ticho trvať. Naháňanie a ústup sa navzájom živia a samotná hádka môže ustúpiť do pozadia, kým naháňačka pokračuje.\n\nMedzi nimi sú dve polovice dobrého zmierenia: {p1} môže priniesť pocit z danej chvíle a {p0} to, čo si premyslí neskôr, takže hádku možno vypočuť z dvoch strán. Naháňačka môže poľaviť, keď {p1} vie, že rozhovor príde, a {p0} vie povedať, približne kedy.',
        },
        aside: {
            en: 'Pressing for a settlement at once tends to lengthen the quiet of a sibling who needs a closed door. {p1} can bring the quick word and {p0} the considered one, and a repair needs both.',
            sk: 'Tlak na okamžité urovnanie zvykne predĺžiť ticho súrodenca, ktorý potrebuje zatvorené dvere. {p1} môže priniesť rýchle slovo a {p0} premyslené, a zmierenie potrebuje oboje.',
        },
        step: { en: 'Agree that the one who needs a closed door says roughly when the talk can happen, and that the other waits for that time without asking again.', sk: 'Dohodnite sa, že ten, kto potrebuje zatvorené dvere, povie, približne kedy sa dá hovoriť, a druhý na ten čas počká bez ďalšieho pýtania.' },
        question: { en: 'What would make waiting easier for the one who wants it settled now, and naming a time easier for the other?', sk: 'Čo by uľahčilo čakanie tomu, kto chce mať všetko vyriešené hneď, a čo by druhému uľahčilo povedať čas?' },
    },
    /* ------------------------------------------------------------ reasoning: reasoning-style -- */
    'reasoning-style/shared:analytical': {
        title: { en: 'Reasons that invite more reasons', sk: 'Dôvody, ktoré pozývajú ďalšie dôvody' },
        passage: {
            en: '{both} may like a rule to come with its reason, and a limit that has been explained tends to be kept without anyone standing guard over it. The child can meet an adult who treats a question as a question.\n\nA reason is also a handle, though. Given reasons, a child can test them, and an adult who enjoys a good argument may answer each one, until the talk has become a debate in which the limit seems to depend on who argued better. In a tired moment, neither may find the sentence that separates a rule that has been explained from a rule that is open to negotiation. The habit of asking why stays a strength only while that line can still be seen.',
            sk: '{both} môžu mať radi, keď pravidlo prichádza aj s dôvodom, a vysvetlená hranica sa zvykne dodržiavať aj bez stráženia. Dieťa môže mať pred sebou dospelého človeka, ktorý berie otázku ako otázku.\n\nDôvod však ponúka aj niečo, za čo sa dá chytiť. Keď dieťa dôvody dostane, môže ich skúšať, a dospelý človek, ktorý má rád dobrý argument, môže odpovedať na každý z nich, až sa z rozhovoru stane debata, v ktorej hranica akoby závisela od toho, kto argumentoval lepšie. V unavenej chvíli sa môže stať, že nikto nenájde vetu, ktorá oddelí vysvetlené pravidlo od pravidla, o ktorom sa dá vyjednávať. Zvyk pýtať sa prečo zostáva silnou stránkou len dovtedy, kým túto deliacu čiaru vidno.',
        },
        aside: {
            en: '{both} may keep a limit more easily once it has been explained. A reason is also a handle, though, and the limit can end up resting on who argued better.',
            sk: '{both} môžu hranicu ľahšie dodržiavať, keď je vysvetlená. Za dôvod sa však dá aj chytiť a hranica potom môže stáť na tom, kto argumentoval lepšie.',
        },
        step: { en: 'Name in advance the few limits that are explained but not negotiable, so that a fair question gets an answer without reopening the rule.', sk: 'Vopred pomenujte pár hraníc, ktoré sa vysvetľujú, ale nevyjednávajú, aby férová otázka dostala odpoveď bez toho, že sa pravidlo otvorí odznova.' },
        question: { en: 'Which limit at home could be given its reason once and then stay out of the debate?', sk: 'Ktorá hranica u vás doma by mohla dostať svoj dôvod raz a potom zostať mimo debaty?' },
    },
    'reasoning-style/shared:intuitive': {
        title: { en: 'A mood read at a glance', sk: 'Nálada na prvý pohľad' },
        passage: {
            en: '{both} tend to read the mood of a moment before its words, so a look or a hand on the shoulder can do the work of a speech. Warmth can pass quickly between them, and so can an edge.\n\nThat speed has a blind side. A mood taken in at a glance is seldom checked aloud. The adult’s tired silence can be taken by the child as being about the child, and the child’s flat answer as being about the adult, with neither saying so. What stays out of words is often the one plain sentence that would say what the feeling was about.',
            sk: '{both} zvyknú vycítiť náladu chvíle skôr než slová, takže pohľad alebo ruka na pleci môže zastúpiť celú reč. Teplo medzi nimi môže preskočiť rýchlo, a rovnako aj ostrý tón.\n\nTáto rýchlosť má slepé miesto. Nálada, ktorú človek zachytí na prvý pohľad, sa málokedy overuje nahlas. Dieťa môže unavené ticho dospelého človeka brať osobne a dospelý človek strohú odpoveď dieťaťa takisto, a nikto to nepovie. Mimo slov často zostáva práve tá jedna jasná veta, ktorá by povedala, o čom pocit je.',
        },
        aside: {
            en: '{both} can feel a mood at a glance, which saves many words. What is sensed is seldom checked aloud, though, so a passing mood may be taken as meant for the other.',
            sk: '{both} môžu vycítiť náladu na prvý pohľad, čo ušetrí veľa slov. Čo sa vycíti, sa však málokedy overí nahlas, a tak sa prechodná nálada môže vziať tak, akoby mierila na toho druhého.',
        },
        step: { en: 'When a mood changes, add one plain sentence about what it is about, such as “I am tired, it is not about you”.', sk: 'Keď sa nálada zmení, pridajte jednu jasnú vetu o tom, čoho sa týka, napríklad „mám dnes málo síl, nie je to kvôli tebe“.' },
        question: { en: 'When a mood changes in the house, who is first to wonder whether it is their fault?', sk: 'Keď sa v dome zmení nálada, kto sa prvý zamyslí nad tým, či za to môže?' },
    },
    'reasoning-style/opposed:analytical': {
        title: { en: 'The careful case and the warm tone', sk: 'Dôkladné vysvetlenie a vľúdny tón' },
        passage: {
            en: '{first} tends to give reasons, sometimes at length, and {second} to take in the tone of the explanation before any of its content. A careful argument can therefore arrive as a scolding, however evenly it is put, and the longer the case, the more tone there is to receive.\n\nUsed lightly, the difference is a gain: the child can meet rules that have reasons, and {first} can see how much a warm manner carries. The trouble lies less in the reasons than in their length, since past a certain point the child may be hearing only the tone.',
            sk: '{first} zvykne uvádzať dôvody, niekedy aj dlho, a {second} zvykne skôr vnímať tón vysvetľovania než obsah. Dôkladný výklad tak môže vyznieť ako kázanie, hoci je podaný pokojne, a čím je dlhší, tým viac tónu zaznie.\n\nV malej dávke je ten rozdiel prínosom: {second} sa môže stretávať s pravidlami, ktoré majú dôvody, a {first} môže vidieť, koľko toho unesie vľúdny spôsob. Problém nie je ani tak v dôvodoch ako v ich dĺžke, lebo od istej chvíle už môže byť počuť len tón.',
        },
        aside: {
            en: 'Reasons and tone can pass each other by: {first} tends to give reasons, and {second} to go by tone. The more careful the case, the more tone there is to take in.',
            sk: '{first} zvykne uvádzať dôvody a {second} ísť podľa tónu, takže sa môžu minúť. Čím dôkladnejšie vysvetlenie, tým viac tónu zaznie.',
        },
        step: { en: 'Give one short, kind sentence of reason, then show what is meant with a story, a picture or an example, and stop there.', sk: 'Povedzte jednu krátku, láskavú vetu s dôvodom, potom ukážte, čo sa myslí, príbehom, obrázkom alebo príkladom, a tam skončite.' },
        question: { en: 'Which explanation tends to run long, and what would a single sentence and a demonstration keep of it?', sk: 'Ktoré vysvetlenie sa zvykne natiahnuť a čo by z toho zostalo, keby ste povedali jednu vetu a ukázali príklad?' },
    },
    'reasoning-style/opposed:intuitive': {
        title: { en: 'A question that is not a challenge', sk: 'Pýtať sa neznamená odvrávať' },
        passage: {
            en: '{second} may ask for the reason, and {first} may answer with a feeling or with “because it is time”. With nothing to test, the child can ask again, and the asking can sound to the adult like pushing back.\n\nOften there is a real judgement behind the feeling, about the day, the hour, how much is left to do. Put into one plain reason, such as “we leave now because tomorrow starts early”, it can give {second} something to hold, while {first} keeps the sense for a moment that no rule can teach. The question can be curiosity more than challenge, and an answer with a reason in it tends to end it.',
            sk: '{second} sa môže pýtať na dôvod a {first} môže odpovedať pocitom alebo vetou „lebo je čas“. Keď nie je čo preskúšať, otázka môže prísť znova a dospelému človekovi to môže znieť ako odvrávanie.\n\nZa pocitom často stojí skutočný úsudok o dni, o hodine, o tom, koľko práce ešte zostáva. Keď sa povie jednou jasnou vetou, napríklad „odchádzame teraz, lebo zajtra sa začína zavčasu“, môže {second} dostať niečo, čoho sa dá chytiť, a {first} si pritom ponechá cit pre chvíľu, ktorý nenaučí žiadne pravidlo. Otázka môže byť skôr zvedavosť než výzva a po odpovedi s dôvodom zvykne utíchnuť.',
        },
        aside: {
            en: 'A why that meets a feeling tends to come back. When {second} hears no reason in the answer, the question can return, and to the adult it can sound like pushing back.',
            sk: 'Otázka „prečo“, ktorá narazí na pocit, sa zvykne vrátiť. Keď {second} v odpovedi nepočuje žiadny dôvod, otázka môže prísť znova a dospelému človekovi to môže znieť ako odvrávanie.',
        },
        step: { en: 'Turn the feeling into one plain reason before the question comes again, and treat that second question as curiosity.', sk: 'Premeňte pocit na jeden jasný dôvod, skôr než príde otázka znova, a túto druhú otázku berte ako zvedavosť.' },
        question: { en: 'What is the plain reason behind the limit that most often meets a second “why”?', sk: 'Aký je ten jasný dôvod za hranicou, ktorá najčastejšie vyvolá druhé „prečo“?' },
    },
    'reasoning-style/siblings:shared:analytical': {
        title: { en: 'Two who check the rules', sk: 'Dvojica, ktorá si overuje pravidlá' },
        passage: {
            en: '{both} tend to check a rule against its wording: whose turn it was, what was agreed, whether the new rule applies to the old game. Each can hold the other to the letter, and each can be held to it.\n\nThis can make for fair games, since little is left vague. It can also make games stall, with two careful advocates and no referee, and a point left open can outlast the game. Whether the checking stays a contest may come down to there being any last word that both accept.',
            sk: '{both} si zvyknú pravidlo overiť podľa znenia: čí bol rad, na čom sa dohodli, či sa nové pravidlo týka aj starej hry. Každý vie druhého chytiť za slovo a sám sa dá chytiť rovnako.\n\nHry môžu byť vďaka tomu férové, lebo máločo zostáva nejasné. Môžu však aj uviaznuť: dvaja dôslední obhajcovia a žiadny rozhodca, a nevyriešený bod môže hru prežiť. Či zostane overovanie súbojom, môže závisieť od toho, či existuje nejaké posledné slovo, ktoré prijme každý z nich.',
        },
        aside: {
            en: 'Holding a game to its wording keeps it fair, and {both} tend to do just that. A point left open, though, can outlast the game.',
            sk: 'Hra, ktorá sa drží znenia, zostáva férová, a {both} na to zvyknú dbať. Nevyriešený bod však môže hru prežiť.',
        },
        step: { en: 'Settle once, together, what decides a game when the rules do not, such as a coin or a fixed order, and use it every time.', sk: 'Dohodnite raz a spoločne, čo rozhodne hru, keď pravidlá mlčia, napríklad hod mincou alebo pevné poradie, a používajte to zakaždým.' },
        question: { en: 'What would the two accept as the last word when they disagree about what was agreed?', sk: 'Čo by dvojica prijala ako posledné slovo, keď sa nezhodnú v tom, na čom sa dohodli?' },
    },
    'reasoning-style/siblings:shared:intuitive': {
        title: { en: 'Games that follow the mood', sk: 'Hry podľa nálady' },
        passage: {
            en: '{both} tend to play by feel, so a game can start without a word about rules and change shape as the mood does. Each can catch the other’s mood quickly, and much of the fun comes from that.\n\nIt is also how a sour mood can spread. One flat remark can be caught as a mood by the other and answered in kind, with neither stopping to ask what it meant. A tone can outlast the point it carried. Whether a passing mood stays passing may depend on one of the two saying plainly what the tone was about.',
            sk: '{both} sa zvyknú hrať podľa citu, takže hra môže začať bez slova o pravidlách a meniť sa spolu s náladou. Každý môže rýchlo prebrať náladu toho druhého a veľká časť zábavy pramení práve z toho.\n\nTakto sa však môže šíriť aj kyslá nálada. Strohá poznámka sa môže druhému preniesť ako nálada a vrátiť sa rovnakým tónom, pričom sa nikto nezastaví s otázkou, čo to malo znamenať. Tón môže trvať dlhšie než to, o čom bol. Či prechodná nálada zostane prechodná, môže závisieť od toho, či jeden z dvojice povie jasne, o čo vlastne išlo.',
        },
        aside: {
            en: 'A sour tone can pass from one sibling to the other with no one asking what it meant. {both} tend to catch each other’s mood fast, in play and out of it.',
            sk: 'Kyslý tón môže prejsť z jedného súrodenca na druhého bez toho, aby sa niekto spýtal, čo znamenal. {both} zvyknú rýchlo chytiť náladu toho druhého, v hre aj mimo hry.',
        },
        step: { en: 'Choose a short phrase either child can use to pause a game when the mood turns, such as “wait, that came out wrong”, and honour it when it is used.', sk: 'Vyberte krátku frázu, ktorou môže ktorýkoľvek zo súrodencov zastaviť hru, keď sa nálada zmení, napríklad „počkaj, to vyšlo zle“, a keď zaznie, hra sa naozaj zastaví.' },
        question: { en: 'What word or look already tells the other that a game has stopped being fun?', sk: 'Aké slovo alebo aký pohľad už teraz druhému hovorí, že hra prestala byť zábavou?' },
    },
    'reasoning-style/siblings:opposed': {
        title: { en: 'The rule against the feeling', sk: 'Pravidlo proti pocitu' },
        passage: {
            en: '{p0} may cite the rule and {p1} answer with how it felt, so a quarrel can run on two tracks that do not meet: one about what was agreed, the other about what was done to whom. Each can find the other unreasonable without either one being wrong.\n\nIn play, the pair can supply what the other lacks, {p0} the fairness that keeps a game going and {p1} the feel that keeps it fun. A quarrel can ease once both halves are said aloud, that the rule says this and that it also felt unfair.',
            sk: '{p0} sa môže odvolať na pravidlo a {p1} odpovedať tým, aký to bol pocit, takže hádka môže bežať po dvoch koľajach, ktoré sa nestretnú. Jedna je o tom, na čom sa dohodli, druhá o tom, čo sa komu stalo. Každému môže druhá strana pripadať nerozumná, hoci ani jeden nemusí mať nepravdu.\n\nV hre si dvojica môže dodať to, čo jednému chýba: {p0} férovosť, vďaka ktorej hra pokračuje, a {p1} cit, vďaka ktorému je hra zábava. Hádka sa môže upokojiť, keď zaznie jedno aj druhé: že pravidlo hovorí toto a že to zároveň pôsobilo nespravodlivo.',
        },
        aside: {
            en: '{p0} may argue from what was agreed and {p1} from how it felt, so a quarrel between the two can run on two tracks. Each track is true, and each sibling may hear only one.',
            sk: '{p0} môže argumentovať tým, na čom sa dohodli, a {p1} tým, aký to bol pocit, takže hádka medzi súrodencami môže bežať po dvoch koľajach. Každá koľaj platí, a každý zo súrodencov môže počuť len jednu.',
        },
        step: { en: 'When the two disagree, let each say one sentence from the rule and one from the feeling before anyone answers.', sk: 'Keď sa súrodenci nezhodnú, nech každý z nich povie jednu vetu o pravidle a jednu o pocite, ešte než niekto odpovie.' },
        question: { en: 'What would each need to hear from the other to know that both the rule and the feeling had been taken seriously?', sk: 'Čo potrebuje každý zo súrodencov počuť od druhého, aby bolo jasné, že sa vážne vzalo pravidlo aj pocit?' },
    },
    /* ------------------------------------------------------------ autonomy: closeness-and-room -- */
    'closeness-and-room/shared:independent': {
        title: { en: 'Two who manage on their own', sk: 'Dvojica, ktorá si poradí sama' },
        passage: {
            en: '{both} tend to like managing things alone, and each can leave the other room to try, to make a mess and to mend it. That respect suits a child who wants to do it without help.\n\nIts difficulty is quiet. When neither reaches out first, a need for help can stay behind a closed door. The adult’s restraint can look to the child like a lack of interest, and the child’s closed door can look to the adult like a request to be left out. Nothing need be refused, because nothing is asked. Much can depend on whether asking for a hand is easy enough to cost nobody any dignity.',
            sk: '{both} majú radšej, keď si veci zvládnu bez cudzej pomoci, a každý môže druhému nechať miesto vyskúšať si, narobiť neporiadok a zase to dať do poriadku. Takýto rešpekt vyhovuje dieťaťu, ktoré chce robiť veci bez pomoci.\n\nHáčik je nenápadný. Keď sa nikto neozve prvý, potreba pomoci môže zostať za zatvorenými dverami. Zdržanlivosť dospelého človeka môže dieťaťu pripadať ako nezáujem a zatvorené dvere dieťaťa môžu dospelému človekovi pripadať ako prosba zostať bokom. Nikto nemusí nič odmietnuť, lebo sa nič nežiada. Veľa môže závisieť od toho, či sa dá o pomoc požiadať tak ľahko, že to nikoho nepripraví o dôstojnosť.',
        },
        aside: {
            en: 'Room to try is easy to give when {both} prefer to manage alone. A need for help can then go unnoticed, with neither asking and neither intruding.',
            sk: 'Priestor na skúšanie sa dáva ľahko, keď {both} radšej zvládajú veci bez cudzej pomoci. Potreba pomoci potom môže zostať nepovšimnutá, keď sa nikto nepýta a nikto sa nevtiera.',
        },
        step: { en: 'Agree on one low-key way for the child to ask for help, such as a word or an object left in sight, that needs no explanation.', sk: 'Dohodnite jeden nenápadný spôsob, ako môže dieťa požiadať o pomoc, napríklad slovo alebo predmet nechaný na očiach, ktorý nepotrebuje vysvetlenie.' },
        question: { en: 'How does the child let the adult know a hand would be welcome, and how does the adult offer one without taking over?', sk: 'Ako dá dieťa dospelému človekovi vedieť, že pomocná ruka by sa hodila, a ako môže dospelý človek ponúknuť pomoc a úlohu pritom neprevziať?' },
    },
    'closeness-and-room/shared:collaborative': {
        title: { en: 'Everything is better beside someone', sk: 'Popri niekom je všetko lepšie' },
        passage: {
            en: 'Almost anything can go better when {both} do it side by side, from cooking to tidying, and ordinary jobs double as time together. Talk, warmth and learning by watching arrive in the same place.\n\nThe cost sits in the same habit. When company is the answer both reach for, the small solo step, the first try with no one beside, can quietly be left out, and a busy adult can find few moments that are not shared. Closeness stays warm while the child’s room to manage alone may grow only as fast as someone proposes it, and the adult is the one placed to propose it.',
            sk: 'Takmer všetko môže ísť lepšie, keď to {both} robia bok po boku, od varenia po upratovanie, a obyčajné práce sú zároveň spoločným časom. Rozhovor, teplo a učenie pozorovaním sa stretávajú na jednom mieste.\n\nCena sa skrýva v tom istom zvyku. Keď je spoločnosť odpoveďou, po ktorej siahne každý, malý samostatný krok, prvý pokus bez nikoho po boku, sa môže potichu vynechať, a zaneprázdnený dospelý človek môže nájsť len málo chvíľ, ktoré nie sú spoločné. Blízkosť zostáva teplá, no priestor, v ktorom dieťa zvládne veci samo, môže rásť len tak rýchlo, ako niekto navrhne ďalší krok, a na taký návrh má najlepšiu pozíciu dospelý človek.',
        },
        aside: {
            en: 'Ordinary jobs turn into time together when {both} like to work side by side. The small solo step is easy to skip when company is the ready answer.',
            sk: 'Bežné práce sa menia na spoločný čas, keď {both} radi robia veci bok po boku. Malý samostatný krok sa ľahko vynechá, keď je spoločnosť poruke ako hotová odpoveď.',
        },
        step: { en: 'Choose one small job that the child tries alone first, with the adult busy nearby, and look at it together afterwards.', sk: 'Vyberte jednu malú prácu, ktorú dieťa skúsi najprv samo, kým má dospelý človek nablízku vlastnú prácu, a potom si výsledok pozrite spolu.' },
        question: { en: 'What is one thing the child could begin alone that would still leave a place for the two of you afterwards?', sk: 'Čo by dieťa mohlo začať samo tak, aby potom zostalo miesto aj pre vás dvoch?' },
    },
    'closeness-and-room/opposed:independent': {
        title: { en: '“You can manage” heard as “go away”', sk: '„Zvládneš to“ počuté ako „choď preč“' },
        passage: {
            en: '{first} tends to leave room for a task to be done alone, and {second} to want someone alongside for it. The same sentence, “you can manage”, can then sound like trust to one and like being sent off to the other.\n\nThe child can have a standing invitation to try, and {first} a daily reminder that company is itself a kind of help. Whether independence feels chosen or imposed can depend on whether the distance arrives in steps or in one sentence.',
            sk: '{first} zvykne nechávať priestor, aby sa úloha urobila samostatne, a {second} zvykne chcieť mať pri úlohe niekoho po boku. Tá istá veta, „zvládneš to“, potom môže jednému znieť ako dôvera a druhému ako odbitie.\n\n{second} môže dostávať stálu pozvánku vyskúšať si veci a {first} každodennú pripomienku, že spoločnosť je sama osebe druh pomoci. Či samostatnosť pôsobí ako vlastná voľba, alebo ako niečo nanútené, môže závisieť od toho, či odstup prichádza po krokoch, alebo jednou vetou.',
        },
        aside: {
            en: '{first} can mean “you can manage” as trust, and {second} can hear it as “go away”. How the distance arrives may matter more than how much of it there is.',
            sk: '{first} môže vetu „zvládneš to“ myslieť ako dôveru a {second} v tom môže počuť „choď preč“. Na tom, ako odstup prichádza, môže záležať viac než na veľkosti odstupu.',
        },
        step: { en: 'Begin the task beside the child and step back in announced stages, saying each time where the adult will be.', sk: 'Začnite úlohu spolu a ustupujte po ohlásených krokoch, pričom zakaždým povedzte, kde budete.' },
        question: { en: 'Which task could start side by side, and what would the child need to hear before the adult steps away?', sk: 'Ktorá úloha by sa mohla začať bok po boku a čo potrebuje {second} počuť, než dospelý človek odstúpi?' },
    },
    'closeness-and-room/opposed:collaborative': {
        title: { en: 'An offered hand, a wish to manage alone', sk: 'Podaná ruka a chuť poradiť si bez pomoci' },
        passage: {
            en: '{first} tends to come forward with help, company or an offer to do it together, and {second} to move away and do it alone. The offer can feel to the child like doubt, and the refusal can feel to the adult like a door being shut, though what is offered and refused is often the task more than the person.\n\nThe child can practise managing alone, with an adult who is there when an attempt goes wrong. {first} is the one who can move from helping to being available, and a refused hand and a welcome presence can sit side by side.',
            sk: '{first} zvykne prichádzať s pomocou, spoločnosťou alebo ponukou urobiť to spolu a {second} zvykne ísť na to osamote. Ponuka môže dieťaťu pripadať ako pochybnosť a odmietnutie dospelému človekovi ako zatváranie dverí, hoci to, čo sa ponúka a odmieta, je často skôr úloha než človek.\n\n{second} si tak môže skúšať veci zvládnuť bez pomoci, pričom je nablízku dospelý človek, keď sa pokus nevydarí. Práve {first} môže prejsť od pomáhania k tomu, že je jednoducho k dispozícii, a odmietnutá ruka a vítaná prítomnosť môžu existovať vedľa seba.',
        },
        aside: {
            en: '{first} may offer company where {second} wants to manage alone. The offer can feel like doubt to the child, and the refusal like a shut door to the adult.',
            sk: '{first} môže ponúkať spoločnosť tam, kde {second} chce zvládnuť veci bez pomoci. Ponuka môže dieťaťu pripadať ako pochybnosť a odmietnutie dospelému človekovi ako zatvorené dvere.',
        },
        step: { en: 'Offer help once, then stay within earshot and let the attempt run, stepping in only when asked or when safety needs it.', sk: 'Ponúknite pomoc raz, potom zostaňte nablízku, nechajte priestor na vlastný pokus a zasiahnite len na požiadanie alebo keď to vyžaduje bezpečnosť.' },
        question: { en: 'What could the adult say or do that offers help without taking the task out of the child’s hands?', sk: 'Čo môže dospelý človek povedať alebo urobiť, čím ponúkne pomoc, a pritom úlohu nevezme z rúk?' },
    },
    'closeness-and-room/siblings:shared:independent': {
        title: { en: 'Two worlds under one roof', sk: 'Dva svety pod jednou strechou' },
        passage: {
            en: '{both} each tend to do things alone, so a shared home can hold two separate worlds: two projects, two corners, two doors that close. Little may be asked of the other, and crowding is rare except when a space or a thing has to be shared.\n\nThose moments can be sharp, since neither may have had much practice at negotiating. An elbow in a corner, a borrowed thing, a question about where something is: each can feel like an intrusion and get a short answer. Closeness, when it comes, may come on parallel lines, side by side with separate things in hand.',
            sk: '{both} zvyknú robiť veci každý po svojom, takže pod jednou strechou môžu byť dva oddelené svety: dva projekty, dva kúty, dvoje dverí, ktoré sa zatvárajú. Jeden od druhého možno chce málo a trenice bývajú zriedkavé, okrem chvíľ, keď si treba rozdeliť miesto alebo vec.\n\nTakéto chvíle môžu byť ostré, lebo ani jeden zo súrodencov nemusí mať veľa cviku vo vyjednávaní. Lakeť v rohu, požičaná vec, otázka, kde niečo je: čokoľvek z toho môže pôsobiť ako vtrhnutie do cudzieho a dostať strohú odpoveď. Blízkosť, ak príde, môže prísť popri sebe, bok po boku, každý s vlastnou vecou v ruke.',
        },
        aside: {
            en: '{both} can keep to two separate worlds, which makes for a quiet home. The sharp moments tend to come when a space or a thing has to be shared.',
            sk: '{both} sa môžu držať každý svojho sveta a doma je potom ticho. Ostré chvíle zvyknú prísť tam, kde si treba rozdeliť miesto alebo vec.',
        },
        step: { en: 'Agree on a few shared things and spaces and how a turn with them is asked for, so that borrowing does not have to be argued.', sk: 'Dohodnite pár spoločných vecí a miest a to, ako sa pýta o rad, aby sa o požičiavaní nemuselo hádať.' },
        question: { en: 'What does each child most want kept private, and what would make sharing the rest easier?', sk: 'Čo chce každý zo súrodencov najviac nechať len pre seba a čo by uľahčilo delenie zvyšku?' },
    },
    'closeness-and-room/siblings:shared:collaborative': {
        title: { en: 'A partner for every game', sk: 'Partner na každú hru' },
        passage: {
            en: '{both} tend to do things best together, and much of a day can be a joint project: a game, a den, a plan with two parts. Neither is often without a partner, and that is a kind of richness.\n\nThe fragile point comes when the pairing breaks. A friend who takes one away, a task done separately, a day with different plans can leave the other at a loose end, and the one who goes can be asked to explain. Neither may have had much practice at a free hour alone. Time apart can be easier to bear when both know where the other is and when the other is back.',
            sk: '{both} to najlepšie zvyknú robiť spolu a veľká časť dňa môže byť spoločný projekt: hra, úkryt, plán o dvoch častiach. Málokedy je jeden z nich bez partnera, a to je svojím spôsobom bohatstvo.\n\nKrehké miesto príde, keď sa dvojica rozdelí. Kamarát, ktorý si jedného odvedie, úloha robená zvlášť, deň s rôznymi plánmi: ten, kto zostane, potom nemusí vedieť, čo so sebou, a od toho, kto odchádza, sa môže čakať vysvetlenie. S voľnou hodinou osamote nemusí mať ani jeden z nich veľa skúseností. Čas osobitne sa môže znášať ľahšie, keď každý vie, kde je ten druhý a kedy sa vráti.',
        },
        aside: {
            en: 'When one goes elsewhere, the other can be left at a loose end. {both} tend to make most things a joint project, so an hour apart has little practice behind it.',
            sk: 'Keď jeden odíde inam, ten druhý nemusí vedieť, čo so sebou. {both} zvyknú robiť väčšinu vecí ako spoločný projekt, a preto majú s hodinou osobitne málo cviku.',
        },
        step: { en: 'Practise a short, announced time apart, with a known place and a known end, and make sure the one left behind has something to do.', sk: 'Nacvičujte krátky, ohlásený čas osobitne, so známym miestom a známym koncom, a postarajte sa, aby súrodenec, ktorý zostane, mal čo robiť.' },
        question: { en: 'What does each child do in a free hour when the other is away, and what would make that hour feel good?', sk: 'Čo robí každý zo súrodencov vo voľnej hodine, keď je druhý preč, a čo by túto hodinu spravilo príjemnou?' },
    },
    'closeness-and-room/siblings:opposed': {
        title: { en: 'Knocking and closing', sk: 'Klopanie a zatváranie' },
        passage: {
            en: '{p1} may knock where {p0} closes the door, and a pattern can form in which each move prompts the other. The more {p1} invites, the more the invitation can feel like pressure, and the more {p0} withdraws, the more the closed door can read as a snub.\n\n{p0} can show what it is to be absorbed in one’s own thing, and {p1} how much more a game can be with another in it. A closed door can stop sounding like a snub once it is clear that it is not about the one who knocks.',
            sk: '{p1} môže klopať tam, kde {p0} zatvára dvere, a môže sa vytvoriť kolotoč, v ktorom jeden krok vyvoláva druhý. Čím viac {p1} pozýva, tým viac môže pozvánka pôsobiť ako tlak, a čím viac sa {p0} sťahuje, tým skôr môžu zatvorené dvere vyznieť ako odbitie.\n\n{p0} môže ukázať, aké je ponoriť sa do vlastnej veci, a {p1} zasa, o koľko je hra lepšia, keď sa pridá ešte niekto. Zatvorené dvere môžu prestať pôsobiť ako odbitie, keď je jasné, že nie sú namierené proti tomu, kto klope.',
        },
        aside: {
            en: 'An invitation can start to feel like pressure when it is repeated at a closed door. {p1} may keep inviting while {p0} keeps closing, and each move can prompt the other.',
            sk: 'Pozvánka opakovaná pri zatvorených dverách môže začať pôsobiť ako tlak. {p1} môže stále pozývať, kým {p0} stále zatvára, a jeden krok môže vyvolávať druhý.',
        },
        step: { en: 'Set a regular time for playing together and a regular time when a door may stay shut, and let both children count on each.', sk: 'Určte pravidelný čas na spoločnú hru a pravidelný čas, keď môžu dvere zostať zatvorené, a nech sa každý zo súrodencov môže spoľahnúť na jedno aj druhé.' },
        question: { en: 'What would let the one who wants company hear a closed door as “not now” and not “not you”?', sk: 'Čo by pomohlo tomu, kto chce spoločnosť, počuť zatvorené dvere ako „teraz nie“, a nie ako „ty nie“?' },
    },
    /* ------------------------------------------------------------ structure: structure-and-flexibility -- */
    'structure-and-flexibility/shared:structured': {
        title: { en: 'Rails that both rely on', sk: 'Koľaje, o ktoré sa dvojica opiera' },
        passage: {
            en: 'The day can run on rails when {both} like order: the same morning, the same shape to the evening, rules that stay where they were put. Nobody has to fight for the rhythm, and the frame can leave energy free for everything else.\n\nThe weak point is the day the rails end. Illness, travel or a late bus can unsettle both at once, and the adult’s own unease at a changed plan is among the first things a child can read. Where both rely on the plan, a break in it can spread faster than either could carry it alone. How the change is met, and whether it was named beforehand, can shape what the child takes from it.',
            sk: 'Deň môže ísť po koľajniciach, keď {both} majú radi poriadok: rovnaké ráno, rovnaký priebeh večera, pravidlá, ktoré zostávajú tam, kde sa položili. Nikto nemusí o rytmus bojovať a pevný poriadok môže nechať silu na všetko ostatné.\n\nSlabým miestom je deň, keď koľaje skončia. Choroba, cesta alebo meškajúci autobus môžu zneistiť dvojicu naraz a nepokoj dospelého človeka zo zmeneného plánu patrí k prvému, čo dieťa vycíti. Keď sa na plán spolieha celá dvojica, narušenie sa môže šíriť rýchlejšie, než to jeden človek unesie sám. Čo si dieťa zo zmeny odnesie, môže závisieť od toho, ako sa zmena zvládne a či bola ohlásená vopred.',
        },
        aside: {
            en: 'Days can run on rails when {both} lean on routine, until the plan breaks. Then each can unsettle the other, since the adult’s unease is easy for a child to read.',
            sk: 'Dni môžu ísť po koľajniciach, keď sa {both} opierajú o rutinu, kým sa plán nepokazí. Vtedy sa môžu navzájom zneisťovať, lebo nepokoj dospelého dieťa ľahko vycíti.',
        },
        step: { en: 'Name the change before it comes, and keep one small fixed point in the changed day, such as a meal or an evening ritual, for both to hold.', sk: 'Zmenu pomenujte skôr, než príde, a do zmeneného dňa nechajte jeden malý pevný bod, napríklad jedlo alebo večerný rituál, o ktorý sa môžete oprieť vy dvaja.' },
        question: { en: 'What small fixed point could hold both of you steady on a day when the plan has to break?', sk: 'Aký malý pevný bod by vás mohol udržať v pokoji v deň, keď sa plán musí rozpadnúť?' },
    },
    'structure-and-flexibility/shared:adaptable': {
        title: { en: 'Light days, and who holds the rhythm', sk: 'Ľahké dni a otázka, kto drží rytmus' },
        passage: {
            en: 'A cancelled outing or a sudden change of plan rarely becomes a crisis when {both} take the day as it comes, and an ordinary afternoon can turn into something better than the one planned.\n\nThe same lightness can drift. With neither adult nor child naturally holding the rhythm, sleep, meals and the jobs that need doing can slide later, and the point at which tiredness makes the decision can arrive without anyone having chosen it. Loose days stay enjoyable when a few points hold, and the adult is the one placed to choose which.',
            sk: 'Zrušený výlet alebo náhla zmena plánu sa málokedy zmení na krízu, keď {both} berú deň tak, ako príde, a obyčajné popoludnie sa môže zmeniť na niečo lepšie než to plánované.\n\nTáto ľahkosť však môže nechať veci plávať. Keď rytmus od prírody nedrží ani dospelý človek, ani dieťa, spánok, jedlá a povinnosti sa môžu posúvať neskôr a chvíľa, keď rozhodne únava, môže prísť, hoci o tom nikto nerozhodol. Voľné dni zostanú príjemné, ak pár vecí drží, a vybrať, ktoré to budú, môže najlepšie dospelý človek.',
        },
        aside: {
            en: 'Plans can stay light when {both} roll with the day. With nobody holding the rhythm, sleep and meals may move later until tiredness decides.',
            sk: 'Plány môžu zostať ľahké, keď sa {both} nechajú niesť dňom. Keď rytmus nikto nedrží, spánok a jedlá sa môžu posúvať neskôr, až kým nerozhodne únava.',
        },
        step: { en: 'Pick two or three anchors that stay put even on loose days, such as a mealtime and a wind-down, and let everything else move.', sk: 'Vyberte dve alebo tri opory, ktoré zostanú na mieste aj vo voľných dňoch, napríklad čas jedla a utíšenie pred spaním, a všetko ostatné nechajte pohyblivé.' },
        question: { en: 'Which two anchors would keep a loose day from ending in tiredness, and which parts of the day can stay free?', sk: 'Ktoré dve opory by uchránili voľný deň pred koncom v únave a ktoré časti dňa môžu zostať voľné?' },
    },
    'structure-and-flexibility/opposed:structured': {
        title: { en: 'A plan, and a child who finds another way', sk: 'Plán a vlastná cesta' },
        passage: {
            en: '{first} tends to run the day on a plan and {second} to drift from it, finding a new route through getting ready, tidying up and winding down. Reminders can multiply, and after enough of them a reminder can sound to the child like nagging, while the adult can feel like the only one holding the day together.\n\nThe frame can be of real use to the child, and {first} can learn from the child’s looseness that not everything needs a plan. Each extra fixed point can weaken the ones that matter, since a plan with everything in it gives no sign of what counts.',
            sk: '{first} zvykne viesť deň podľa plánu a {second} z plánu vybočovať a pri chystaní, upratovaní a utišovaní pred spaním si nájsť vlastnú cestu. Pripomienok môže pribúdať, a keď ich je dosť, ďalšia môže znieť ako hundranie, kým dospelý človek môže mať pocit, že deň drží pokope sám.\n\n{second} môže mať z pevného rámca naozaj úžitok a {first} sa môže z tejto uvoľnenosti naučiť, že nie všetko potrebuje plán. Každý ďalší pevný bod môže oslabiť tie, na ktorých záleží, lebo z plánu, v ktorom je všetko, nie je poznať, čo sa naozaj počíta.',
        },
        aside: {
            en: '{first} may run the day on a plan that {second} tends to drift from, which invites a stream of reminders. The fewer things are fixed, the more each one counts.',
            sk: '{first} môže viesť deň podľa plánu, z ktorého {second} zvykne vybočovať, a to priťahuje záplavu pripomienok. Čím menej vecí je pevných, tým viac záleží na každej z nich.',
        },
        step: { en: 'Choose the few things that need to happen in a set way, and let the child decide the order and manner of the rest.', sk: 'Vyberte tých pár vecí, ktoré sa musia diať určitým spôsobom, a o poradí a spôsobe zvyšku nech rozhodne {second}.' },
        question: { en: 'Which three or four things need to stay fixed, and which could the child safely run?', sk: 'Ktoré tri alebo štyri veci musia zostať pevné a ktoré môže bezpečne riadiť {second}?' },
    },
    'structure-and-flexibility/opposed:adaptable': {
        title: { en: 'A change that is announced and one that happens', sk: 'Zmena ohlásená a zmena, ktorá sa stane' },
        passage: {
            en: '{second} tends to want to know what comes next, while {first} may decide as the day goes. A plan changed at the last minute can unsettle the child beyond the moment of the change, while to the adult it may be only a better idea.\n\nThe child can give the household a reason to build a few dependable habits, and {first} can show that a change of plan can be lived through and even enjoyed. Much of the difference can be carried by a word or two beforehand, since a change that is announced is a different event from a change that simply happens.',
            sk: '{second} zvykne chcieť vedieť, čo príde, kým sa {first} môže rozhodovať za pochodu. Plán zmenený na poslednú chvíľu môže dieťa vyviesť z miery aj dlho po samotnej zmene, pričom dospelému človekovi to môže pripadať len ako lepší nápad.\n\n{second} môže domácnosti dať dôvod vytvoriť si pár spoľahlivých zvykov a {first} môže ukázať, že zmena plánu sa dá prežiť a dokonca užiť. Veľkú časť rozdielu môže urobiť slovo či dve vopred, lebo ohlásená zmena je iná udalosť ako zmena, ktorá sa jednoducho stane.',
        },
        aside: {
            en: 'Plans can shift as the day goes when {first} decides on the go, and {second} may want to know what comes next. A change that is announced can land differently from one that simply happens.',
            sk: 'Plány sa môžu cez deň meniť, keď sa {first} rozhoduje za pochodu, a {second} môže chcieť vedieť, čo príde. Ohlásená zmena môže dopadnúť inak ako tá, ktorá sa jednoducho stane.',
        },
        step: { en: 'Tell the child at the start of the day what it holds, and give a word of warning before anything shifts.', sk: 'Na začiatku dňa povedzte, čo deň prinesie, a skôr než sa niečo posunie, jedným slovom upozornite.' },
        question: { en: 'Which changes of plan could be told to the child earlier than they are now?', sk: 'Ktoré zmeny plánu by sa dali ohlásiť skôr, než sa ohlasujú teraz?' },
    },
    'structure-and-flexibility/siblings:shared:structured': {
        title: { en: 'Two keepers of the agreement', sk: 'Dvaja strážcovia dohody' },
        passage: {
            en: 'A turn, a rule, the order of a shared room: {both} tend to like these to stay as agreed. That can keep a good deal of friction out of a shared home, since each knows what to expect.\n\nIt can also mean that each notices at once when the order is broken and judges the other strictly. A thing moved, a turn skipped, an exception granted to one: any of these can become a case, and a small matter can stay open while neither grants the exception.',
            sk: 'Poradie, pravidlo, poriadok v spoločnej izbe: {both} zvyknú chcieť, aby to platilo tak, ako sa dohodlo. Vďaka tomu sa v spoločnom domove môže ušetriť dosť trenia, lebo každý vie, čo čakať.\n\nMôže to však znamenať aj to, že každý hneď zbadá, keď sa poriadok poruší, a toho druhého prísne posudzuje. Presunutá vec, vynechané poradie, výnimka pre jedného: z čohokoľvek z toho sa môže stať spor a drobnosť môže zostať otvorená, kým nikto výnimku nepovolí.',
        },
        aside: {
            en: 'A shared home can be spared much friction when {both} keep agreements steady. Each can also notice at once when the order is broken, and a small matter can stay open.',
            sk: '{both} zvyknú dohody držať pevne, čo spoločnému domovu ušetrí veľa trenia. Každý však môže hneď zbadať, keď sa poriadok poruší, a drobnosť môže zostať otvorená.',
        },
        step: { en: 'Write down the few agreements that matter most between the two, such as turns and shared spaces, and agree one way to change them.', sk: 'Zapíšte si pár dohôd, na ktorých medzi súrodencami najviac záleží, napríklad poradie a spoločné miesta, a dohodnite jeden spôsob, ako ich meniť.' },
        question: { en: 'Which agreement between the two is most worth keeping steady, and which could be allowed to bend?', sk: 'Ktorú dohodu medzi nimi sa najviac oplatí držať pevne a ktorá by mohla poľaviť?' },
    },
    'structure-and-flexibility/siblings:shared:adaptable': {
        title: { en: 'Rules made up as they go', sk: 'Pravidlá vymyslené za pochodu' },
        passage: {
            en: 'Rules can be made as they are needed and dropped when they stop being fun, and {both} seem content with that. A game can change shape several times, plans can give way easily on both sides, and a quiet afternoon can become an expedition.\n\nWhat can go missing is the memory of what was agreed. Whose turn it was, who put the thing away, which version of the rule applies today: with nothing fixed, each can remember it differently, and a shared room or a shared chore can fall to whoever notices first. Looseness is a gift in play and a weak footing for a shared job.',
            sk: 'Pravidlá môžu vznikať, keď treba, a zanikať, keď prestanú baviť, a {both} s tým zjavne nemajú problém. Hra môže viackrát zmeniť podobu, plány môžu ľahko ustúpiť na jednej aj druhej strane a tiché popoludnie sa môže zmeniť na výpravu.\n\nChýbať môže pamäť na to, na čom sa dohodli. Kto bol na rade, kto čo uložil, ktorá verzia pravidla platí dnes: keď nič nie je pevné, každý si to môže pamätať inak a spoločná izba alebo spoločná povinnosť môže pripadnúť tomu, kto si to všimne prvý. Uvoľnenosť je v hre dar, no na spoločnú robotu je to slabá opora.',
        },
        aside: {
            en: 'What was agreed is easy to lose when everything bends. {both} tend to improvise, so shared jobs can fall to whoever notices first.',
            sk: 'Dohoda sa ľahko stratí, keď sa všetko ohýba. {both} zvyknú improvizovať, a tak spoločné práce môžu pripadnúť tomu, kto si ich všimne prvý.',
        },
        step: { en: 'Give each shared job a simple fixed marker, such as a chart, a swap of days or an object that changes hands, so it does not rest on memory.', sk: 'Dajte každej spoločnej práci niečo jednoduché a viditeľné, napríklad tabuľku, striedanie dní alebo predmet, ktorý putuje z ruky do ruky, aby nezávisela len od pamäti.' },
        question: { en: 'Which shared job keeps being forgotten, and what simple marker would make it visible without a fight?', sk: 'Ktorá spoločná práca sa stále zabúda a čo jednoduché by bez hádky ukázalo, kto je na rade?' },
    },
    'structure-and-flexibility/siblings:opposed': {
        title: { en: 'The game one keeps and the other changes', sk: 'Hra, ktorú jeden drží a druhý mení' },
        passage: {
            en: '{p0} may want the rules of a game, or the order of a shared room, to hold, while {p1} may change them midway to make a better game. {p0} can call that cheating, and {p1} can call the policing the thing that spoils the game.\n\nEach has what the other’s play lacks, {p0} the steadiness that lets a long game last and {p1} the invention that keeps it interesting. Both can be right at once, which is exactly what a quarrel about cheating leaves no room for.',
            sk: '{p0} môže chcieť, aby pravidlá hry alebo poriadok v spoločnej izbe platili, kým {p1} ich môže uprostred meniť, aby bola hra lepšia. {p0} to môže nazvať podvodom a {p1} môže tvrdiť, že hru kazí práve to strážnikovanie.\n\nKaždé má to, čo hre toho druhého chýba: {p0} stálosť, vďaka ktorej dlhá hra vydrží, a {p1} vynaliezavosť, vďaka ktorej zostáva zaujímavá. Pravdu môžu mať naraz jedno aj druhé, a práve na to v hádke o podvádzaní nezostáva miesto.',
        },
        aside: {
            en: '{p0} may hold to the rules of a game where {p1} would rather change them midway. One can call the change cheating, and the other can call the holding policing.',
            sk: 'Tam, kde {p1} môže chcieť pravidlá hry uprostred zmeniť, sa ich {p0} môže držať. Jedno môže zmenu nazvať podvodom, druhé zas to držanie strážnikovaním.',
        },
        step: { en: 'Before a game starts, agree a few rules that stay fixed and name the ones either child may change.', sk: 'Pred začiatkom hry sa dohodnite na pár pravidlách, ktoré zostanú pevné, a pomenujte tie, ktoré môže ktorýkoľvek zo súrodencov meniť.' },
        question: { en: 'Which rules of the usual games feel fixed to one child and open to the other?', sk: 'Ktoré pravidlá obvyklých hier pôsobia jednému zo súrodencov ako pevné a druhému ako otvorené?' },
    },
    /* ------------------------------------------------------------ risk: risk-and-caution -- */
    'risk-and-caution/shared:cautious': {
        title: { en: 'Two who check before they step', sk: 'Dvojica, ktorá sa pred krokom rozhliadne' },
        passage: {
            en: '{both} tend to look before they leap, so a new place or a new thing can be met slowly and there is seldom an argument about going too fast. A child who watches from the edge is not rushed by an adult who does the same.\n\nWhat can be missing is the push that neither has. Two careful minds can talk each other out of a thing: the adult’s reasons for waiting match the child’s, each confirms the other, and a new group or a new place keeps being postponed with every reason sound. Much rests on whether anyone puts a small first step on the table.',
            sk: '{both} sa pred krokom zvyknú najprv rozhliadnuť, takže k novému miestu alebo novej veci môžu pristupovať pomaly a o príliš rýchle tempo sa zriedka hádajú. Dieťa, ktoré sleduje z okraja, dospelý človek nesúri, lebo sám robí to isté.\n\nChýbať môže postrčenie, ktoré nemá ani jeden. Dve opatrné hlavy si niečo môžu navzájom vyhovoriť: dôvody dospelého človeka na čakanie sa zhodujú s dôvodmi dieťaťa, jeden druhého potvrdzuje a nová skupina alebo nové miesto sa odkladá dokola, hoci každý dôvod je rozumný. Veľa závisí od toho, či niekto navrhne malý prvý krok.',
        },
        aside: {
            en: 'Nobody is rushed when {both} look before they leap. Each can confirm the other’s reasons for waiting, so a new thing may be postponed again and again.',
            sk: 'Nikoho nikto nesúri, keď sa {both} najprv rozhliadnu. Každý môže potvrdzovať dôvody toho druhého na čakanie, a tak sa nová vec môže odkladať znova a znova.',
        },
        step: { en: 'Choose one new thing and the smallest first step toward it, small enough to be undone, and set a day to try it.', sk: 'Vyberte jednu novú vec a najmenší možný prvý krok k tej veci, taký malý, že sa dá vrátiť späť, a určte deň, keď to skúsite.' },
        question: { en: 'What is the worry that has kept the new thing waiting, and how big is it really?', sk: 'Aká obava drží novú vec v čakaní a aká veľká v skutočnosti je?' },
    },
    'risk-and-caution/shared:risk-oriented': {
        title: { en: 'Appetite on both sides', sk: 'Chuť na výzvy z jednej aj druhej strany' },
        passage: {
            en: '{both} tend to be drawn to challenge: the higher branch, the faster route, the idea agreed to before the question is finished. Adventures can happen easily, and fear of the new is rarely what holds this household back.\n\nWith appetite on both sides, the careful voice can go missing. The adult may be as keen as the child, so the question of whether something is safe can arrive after the climb instead of before, and a limit set late is harder to hold. The careful part then has to be taken on purpose, and with the greater responsibility, it falls to the adult.',
            sk: '{both} zvyknú mať chuť na výzvy: vyššiu vetvu, rýchlejšiu trasu, nápad, na ktorý sa kývne skôr, než otázka dozaznie. Dobrodružstvá prichádzajú ľahko a strach z nového túto domácnosť zriedka brzdí.\n\nKeď je chuť na jednej aj druhej strane, opatrný hlas môže chýbať. Dospelý môže byť rovnako nadšený ako dieťa, a tak otázka, či je niečo bezpečné, môže prísť až po výstupe, a nie vopred, a hranica určená neskoro sa drží ťažšie. Opatrnosť potom treba prevziať zámerne, a keďže väčšiu zodpovednosť nesie dospelý človek, pripadá táto úloha dospelému človekovi.',
        },
        aside: {
            en: 'Adventures can come easily when {both} go for a challenge. With no one braking, the question of safety can arrive after the climb.',
            sk: 'Dobrodružstvá môžu prichádzať ľahko, keď sa {both} púšťajú do výziev. Keď nikto nebrzdí, na bezpečnosť sa môže myslieť až dodatočne.',
        },
        step: { en: 'Decide in advance, calmly, the two or three safety lines that hold whatever the mood, and say yes freely to everything outside them.', sk: 'Vopred a v pokoji určte dve alebo tri bezpečnostné hranice, ktoré platia bez ohľadu na náladu, a na všetko mimo nich hovorte ochotne áno.' },
        question: { en: 'Which safety lines would the adult hold even in the middle of the fun, and how does the child know them?', sk: 'Ktoré bezpečnostné hranice chce dospelý človek držať aj uprostred zábavy a ako ich dieťa pozná?' },
    },
    'risk-and-caution/opposed:cautious': {
        title: { en: 'The warning and the climb', sk: 'Varovanie a lezenie' },
        passage: {
            en: '{first} tends to see what could go wrong and {second} what could be fun. At the top of a climb or the edge of a new plan, the two can look at the same thing and see different pictures. A stream of warnings can teach a child one of two lessons: to stop listening, or to stop telling.\n\n{first} can offer an eye for danger and can be drawn by the child into things that would have gone untried. Warnings tend to carry more weight when there are few of them, and a yes is believable only where a no is rare.',
            sk: '{first} zvykne vidieť, čo sa môže pokaziť, a {second} skôr to, čo môže byť zábava. Na vrchole výstupu alebo na okraji nového plánu sa tí dvaja môžu pozerať na tú istú vec a každý vidieť niečo iné. Z prívalu varovaní sa dá naučiť jedno z dvoch: prestať počúvať, alebo prestať rozprávať.\n\n{first} môže ponúknuť oko na nebezpečenstvo a vďaka druhej strane sa môže dostať k veciam, ktoré by inak zostali neskúšané. Varovania zvyknú mať väčšiu váhu, keď ich je málo, a „áno“ znie presvedčivo len tam, kde „nie“ zaznie zriedka.',
        },
        aside: {
            en: 'Where {second} tends to spot the fun, {first} tends to spot the danger. A stream of warnings can teach a child to stop listening or to stop telling.',
            sk: '{first} zvykne zbadať nebezpečenstvo a {second} zábavu. Z prívalu varovaní sa dá naučiť prestať počúvať alebo prestať rozprávať.',
        },
        step: { en: 'Name the few lines that are about real safety, hold them firmly, and answer the rest with a yes and some interest.', sk: 'Pomenujte tých pár hraníc, ktoré sa týkajú skutočnej bezpečnosti, držte ich pevne a na zvyšok odpovedajte áno a s trochou záujmu.' },
        question: { en: 'Which warnings are about real safety, and which could become a yes with some interest?', sk: 'Ktoré varovania sa týkajú skutočnej bezpečnosti a ktoré by sa s trochou záujmu mohli zmeniť na áno?' },
    },
    'risk-and-caution/opposed:risk-oriented': {
        title: { en: 'Enthusiasm that works as a push', sk: 'Nadšenie, ktoré pôsobí ako tlak' },
        passage: {
            en: 'At the edge of a new thing, {second} may need time to watch before joining, while {first} may want to share the thrill of it. Each encouraging word can turn into pressure, and a child who feels pushed can dig in harder, so enthusiasm offered as a way in can work as a push.\n\nEach has something to give: the child can have a guide who makes the world look worth exploring, and {first} can see how much a slower start protects. Whether “not yet” is accepted as a fair answer can change the whole exchange. When it is, the child can watch, and then try a step of the child’s own choosing.',
            sk: 'Na okraji niečoho nového môže {second} potrebovať čas na pozorovanie, než sa pridá, kým sa {first} môže chcieť podeliť o vzrušenie, ktoré to nové prináša. Každé povzbudivé slovo sa môže zmeniť na tlak a ten, kto tlak cíti, sa môže zaprieť ešte viac, takže nadšenie ponúknuté ako pozvanie môže zafungovať ako postrčenie.\n\nKaždý má čo dať: {second} môže mať sprievodcu, vďaka ktorému svet stojí za objavovanie, a {first} môže vidieť, koľko toho ochráni pomalší začiatok. To, či sa „ešte nie“ berie ako férová odpoveď, môže zmeniť celý priebeh. Keď áno, {second} môže najprv sledovať a potom skúsiť krok podľa vlastnej voľby.',
        },
        aside: {
            en: '{first} may love the thrill where {second} may need time to watch first. Encouragement offered as a way in can then land as a push.',
            sk: '{first} sa môže tešiť zo vzrušenia tam, kde sa {second} môže potrebovať najprv prizerať. Povzbudenie ponúknuté ako pozvanie potom môže pôsobiť ako postrčenie.',
        },
        step: { en: 'Offer the next step once, accept “not yet” without comment, and stay close while the child watches.', sk: 'Ponúknite ďalší krok raz, prijmite „ešte nie“ bez komentára a zostaňte nablízku, kým {second} sleduje.' },
        question: { en: 'What would the child count as a small step that the child can choose alone?', sk: 'Čo považuje {second} za malý krok, ktorý si môže vybrať bez pomoci?' },
    },
    'risk-and-caution/siblings:shared:cautious': {
        title: { en: 'Waiting at the edge together', sk: 'Spoločné čakanie na okraji' },
        passage: {
            en: '{both} may hang back at new things and wait together at the door of a new place or a new game. Neither is likely to push the other, and each has company in the watching.\n\nThe company is also what can keep both at the edge. Each can read the other’s hesitation as confirmation that waiting is right, and neither goes first, so the watching can go on. What can change it is very small: one of the two makes a tiny first move, and the other sees that it was safe.',
            sk: '{both} sa pri nových veciach môžu držať späť a spolu čakať pri dverách nového miesta alebo novej hry. Jeden druhého pravdepodobne netlačí a pri pozorovaní má každý spoločnosť.\n\nPráve spoločnosť však môže držať dvojicu na okraji. Každý môže váhanie toho druhého vziať ako potvrdenie, že čakať je správne, a keďže nikto nejde prvý, pozorovanie sa môže ťahať. Zmeniť to môže veľmi málo: jeden z dvojice urobí drobný prvý pohyb a ten druhý uvidí, že to bolo bezpečné.',
        },
        aside: {
            en: '{both} may wait together at the door of anything new, with neither going first. Hesitation can confirm hesitation.',
            sk: '{both} môžu spolu čakať pri dverách všetkého nového a nikto nejde prvý. Váhanie môže potvrdzovať váhanie.',
        },
        step: { en: 'Let the children take turns being the first to try a new thing in a very small way, while the other watches until ready.', sk: 'Nechajte súrodencov striedať sa v tom, kto prvý vyskúša niečo nové, a to celkom po troške, kým druhý pozoruje, až kým sa nerozhodne pridať.' },
        question: { en: 'What small first move have the two already made together, and which of them found it easier?', sk: 'Aký malý prvý pohyb už súrodenci spolu urobili a ktorému z nich to išlo ľahšie?' },
    },
    'risk-and-caution/siblings:shared:risk-oriented': {
        title: { en: 'Each step sets the next bar', sk: 'Každý krok zdvíha latku' },
        passage: {
            en: '{both} can egg each other on. One may climb a little higher and the other match it, so each step can set the bar for the next, and a game of small risks can climb toward a large one. Neither is the careful one, so there is no voice in the pair that says stop.\n\nThe thrill is shared and so is the lack of a brake, and a risk between two children who both go for it can grow faster than either would take alone. Neither is the other’s minder: the care that is missing belongs to the home and its few clear lines, not to one child watching the other.',
            sk: '{both} sa môžu navzájom vyhecovať. Jeden môže vyšplhať o niečo vyššie a druhý to dorovnať, takže každý krok môže zdvihnúť latku pre ďalší a hra s drobnými rizikami môže dorásť k veľkému riziku. Ani jeden nie je ten opatrný, a tak v dvojici chýba hlas, ktorý by povedal stop.\n\nVzrušenie je spoločné a spoločná je aj chýbajúca brzda, a riziko medzi súrodencami, ktorí do toho idú rovnako, môže rásť rýchlejšie, než by rástlo pri každom zvlášť. Ani jeden nie je strážcom druhého: opatrnosť, ktorá chýba, patrí domovu a pár jasným hraniciam, nie tomu, že jeden súrodenec dozerá na druhého.',
        },
        aside: {
            en: 'Raising the bar is catching. {both} tend to go for risk, and with no careful voice in the pair a small dare can climb toward a large one.',
            sk: 'Zdvíhanie latky je nákazlivé. {both} zvyknú ísť do rizika a bez opatrného hlasu v dvojici môže malá výzva vyrásť na veľkú.',
        },
        step: { en: 'Set a few clear safety lines for risky play that apply to both children, and keep the watching with the adults, not with either child.', sk: 'Určte pár jasných bezpečnostných hraníc pre rizikovú hru, ktoré platia pre každého zo súrodencov, a dohľad nechajte na dospelých, nie na niektorom zo súrodencov.' },
        question: { en: 'Which dares between the two are about the fun, and which cross a line that the adults need to hold?', sk: 'Ktoré výzvy medzi súrodencami sú o zábave a ktoré prekračujú hranicu, ktorú musia držať dospelí?' },
    },
    'risk-and-caution/siblings:opposed': {
        title: { en: 'Teasing the hesitation, telling tales on the dare', sk: 'Posmech váhaniu, žalovanie na odvahu' },
        passage: {
            en: '{p1} may dare where {p0} would rather hang back, and between the two a script can form: teasing about the hesitating and telling tales about the daring. Each is a way of saying something about the other’s judgement, and each can harden into a pattern.\n\nThe difference is also what each can borrow: {p1} can show that the jump can be made, and {p0} where to look first. Which of those becomes a taunt and which becomes a skill can depend on what the household makes of the two kinds of good judgement, the brave try and the sensible wait.',
            sk: '{p1} sa môže púšťať do odvážnych vecí tam, kde sa {p0} skôr drží späť, a medzi nimi sa môže ustáliť scenár: posmech z váhania a žalovanie na odvahu. Jedno aj druhé je spôsob, ako povedať niečo o úsudku toho druhého, a jedno aj druhé sa môže zabehnúť ako ustálený vzorec.\n\nZ rozdielu si však môžu aj navzájom požičať: {p1} môže ukázať, že skok sa dá urobiť, a {p0}, kam sa treba pozrieť najprv. Čo z toho sa stane posmeškom a čo zručnosťou, môže závisieť od toho, ako sa doma pozerá na dva druhy dobrého úsudku: na odvážny pokus a na rozumné počkanie.',
        },
        aside: {
            en: '{p0} can be teased for hanging back, and {p1} told on for the dare. What each shows is also something the other can learn.',
            sk: '{p0} môže čeliť posmechu za váhanie a {p1} žalovaniu za odvahu. To, čo každý z nich ukazuje, sa však ten druhý môže aj naučiť.',
        },
        step: { en: 'Say aloud, whenever either does it, what is good about the brave try and about the sensible wait, so that neither becomes a point for teasing.', sk: 'Zakaždým, keď to jeden zo súrodencov urobí, povedzte nahlas, čo je dobré na odvážnom pokuse a čo na rozumnom počkaní, aby sa ani jedno nestalo námetom posmechu.' },
        question: { en: 'What does each child do well in a risky moment that the other could borrow?', sk: 'Čo robí každý zo súrodencov v rizikovej chvíli dobre, čo si môže požičať druhý?' },
    },
};
export default PARENTING_A1;
