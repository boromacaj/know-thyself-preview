/**
 * ROMANTIC. In a partnership the weight falls on the small daily moments: how a feeling is met, how a disagreement is paused and picked up again, how closeness and room are shared. Part a (inner focus, reasoning, autonomy, structure, risk).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 */
const ROMANTIC_A = {
    /* ------------------------------------------------------------------ inner focus (processing-pace) -- */
    'processing-pace/opposed': {
        title: { en: 'Quiet to settle, talk to find out', sk: 'Ticho na ujasnenie, slová na zistenie' },
        passage: {
            en: 'The silence after an upset can mean two different things here. {p0} tends to settle first: the feeling is sorted inwardly, and what gets said afterwards is meant as the considered version. {p1} is more likely to find out what is felt by saying it and hearing it answered, so a silence can seem to be the very place where the conversation should be.\n\nThat is where a circle can start. Say {p1} reaches for the conversation and {p0} steps back to settle: the step back can sound like refusal, and {p1} reaches harder, which leaves less room to settle. When the circle does not start, the two hold both halves of a good conversation: the honest first reaction and the answer that has been weighed. A pause that carries some sign of where it ends can be waited out; one that carries none is easily heard as a door closing.',
            sk: 'Ticho po rozrušení tu môže znamenať dve rôzne veci. {p0} si city zvyčajne najprv utriedi v sebe a to, čo povie potom, býva už premyslené. {p1} skôr zisťuje, čo cíti, tým, že to vysloví a počuje odpoveď, a preto môže ticho pôsobiť ako chýbajúci rozhovor.\n\nTu sa môže rozbehnúť kolotoč. Povedzme, že {p1} chce o veci hovoriť a {p0} ustúpi, lebo si vec potrebuje najprv ujasniť: ústup môže znieť ako odmietnutie, {p1} nalieha ešte viac a na ujasnenie ostáva ešte menej miesta. Keď sa kolotoč nerozbehne, dvojica má pokope dve polovice dobrého rozhovoru: úprimnú prvú reakciu aj premyslenú odpoveď. Pauzu, ktorá aspoň naznačí, kedy sa skončí, sa dá prečkať; pauza bez takého znamenia ľahko vyzerá ako zabuchnuté dvere.',
        },
        aside: {
            en: 'Quiet is taken differently by each of the two. {p0} tends to go inward to settle before speaking, while {p1} is more likely to talk to find out what is felt. A step back can sound like refusal, and a reach for the conversation can feel like pressure.',
            sk: 'Každý z dvojice berie ticho inak. {p0} sa pred rozprávaním zvyčajne stiahne do seba, aby sa veci ustálili, kým {p1} skôr zisťuje, čo cíti, práve tým, že hovorí. Ústup môže znieť ako odmietnutie a naliehanie na rozhovor ako tlak.',
        },
        step: { en: 'Agree on a short phrase that means “not now, and yes later”, with a time attached, so that a step back is heard as postponed rather than refused.', sk: 'Dohodnite sa na krátkej vete, ktorá znamená „teraz nie, ale potom áno“, aj s časom, aby sa stiahnutie počulo ako odloženie, nie ako odmietnutie.' },
        question: { en: 'In the first minutes after an upset, what tells each of you that a silence means later and not no?', sk: 'Podľa čoho každý z vás v prvých minútach po rozrušení pozná, že ticho znamená „neskôr“, a nie „nie“?' },
    },
    'processing-pace/shared:introspective': {
        title: { en: 'Two people, each waiting for the other', sk: 'Dvojica, v ktorej každý čaká na druhého' },
        passage: {
            en: 'Neither of these two is likely to hurry the other. {both} tend to settle a feeling inwardly before they speak, so an upset can leave less that needs taking back, and a step away can be understood on both sides without being explained.\n\nThe courtesy has a second face. When a hard subject needs opening, each can wait for the other to begin, each taking the other’s quiet as a sign that the moment is not yet right. A topic can sit unopened, politely, for as long as the courtesy lasts. What can end the wait is one of the two breaking the symmetry on purpose, with a sentence small enough to say while the rest is still unsettled.',
            sk: 'V tejto dvojici asi nikto druhú stranu nepopoháňa. {both} si city zvyčajne najprv utriedia v sebe a až potom prehovoria, takže po rozrušení môže zaznieť menej slov, ktoré treba brať späť, a keď sa jeden stiahne, druhý to môže pochopiť aj bez vysvetľovania.\n\nTá zdvorilosť má aj druhú stránku. Keď treba načať ťažkú tému, každý môže čakať, kým začne ten druhý, a ticho druhého brať ako znamenie, že na to ešte nie je čas. Téma môže slušne ležať nenačatá, kým zdvorilosť vydrží. Čakanie sa môže skončiť, keď jeden z nich zámerne urobí prvý krok krátkou vetou, ktorú sa dá povedať, aj keď zvyšok ešte nie je ustálený.',
        },
        aside: {
            en: 'Courtesy and delay are one habit here. {both} give each other time to settle, which spares them hasty words, and it can leave a hard subject waiting while each expects the other to open it.',
            sk: 'Zdvorilosť a odkladanie sú tu jeden zvyk. {both} si dávajú čas ustáliť sa, čo ich chráni pred unáhlenými slovami, no ťažká téma môže zostať ležať, lebo každý očakáva, že tému otvorí ten druhý.',
        },
        step: { en: 'Take turns being the one who opens a hard subject, and open it with a single sentence that does not need an answer yet.', sk: 'Striedajte sa v tom, kto otvára ťažkú tému, a začnite jednou vetou, na ktorú sa zatiaľ nemusí odpovedať.' },
        question: { en: 'Which subject is each of you waiting for the other to raise?', sk: 'Pri ktorej téme každý z vás čaká, že prvý prehovorí ten druhý?' },
    },
    'processing-pace/shared:outwardly-engaged': {
        title: { en: 'Drafts said aloud, answered as positions', sk: 'Myslenie nahlas, brané ako stanovisko' },
        passage: {
            en: 'A sentence said aloud to find out what is felt is a draft, not a position. {both} tend to produce drafts quickly, and each can answer the other’s draft as if it were final. A complaint thrown out half-formed can meet a defence, the defence a sharper line, and what began as thinking aloud can turn into two positions defended at speed.\n\nThe same speed can be the pair’s advantage, since little is left to harden unspoken. Whether a quarrel clears or compounds can depend on whether either one is willing to say that a sentence was a first attempt, and to take it back.',
            sk: 'Veta vyslovená nahlas, aby sa zistilo, čo človek cíti, je len prvý náčrt, nie stanovisko. {both} zvyčajne tvoria takéto náčrty rýchlo a každý môže na náčrt toho druhého odpovedať, akoby bol hotový. Nedomyslená sťažnosť môže naraziť na obranu, obrana na ostrejšiu vetu a to, čo sa začalo ako myslenie nahlas, sa môže zmeniť na dve stanoviská, ktoré sa bránia v plnom tempe.\n\nRovnaké tempo môže byť zároveň ich výhodou, lebo máločo zostane dlho nevyslovené. Či hádka utíchne, alebo sa vyhrotí, môže záležať na tom, či je jeden z nich ochotný povedať, že tá veta bola prvý pokus, a vziať to späť.',
        },
        aside: {
            en: 'Two people who think aloud produce drafts quickly. {both} tend to find out what they feel by saying it, so a half-formed complaint can be answered as a final position and the exchange speeds up instead of settling.',
            sk: 'Dvaja ľudia, ktorí rozmýšľajú nahlas, vytvárajú náčrty rýchlo. {both} zvyčajne zisťujú, čo cítia, tým, že to vyslovia, takže nedomyslenú sťažnosť možno vziať ako konečné stanovisko a výmena sa namiesto upokojenia zrýchli.',
        },
        step: { en: 'Give each other a phrase for “that was a first draft”, and treat it as a full retraction of the sentence it follows.', sk: 'Dohodnite sa na výraze „to bol len prvý náčrt“ a berte to ako úplné odvolanie práve vyslovenej vety.' },
        question: { en: 'What makes it easy, or hard, for one of you to take back a sentence said in the heat of the moment?', sk: 'Čo jednému z vás uľahčuje alebo sťažuje vziať späť vetu, ktorá zaznela v zápale?' },
    },
    'processing-pace/oneSided:introspective': {
        title: { en: 'One settles quietly, one sets the tempo', sk: 'Ticho na jednej strane, tempo na druhej' },
        passage: {
            en: '{lean} tends to settle a feeling in quiet before speaking, and {mid} can meet that quiet or fill it with talk. So the pace of a hard conversation tends to be set by how {mid} adjusts, not by anything the two have agreed. This can be a kindness: a circle of push and retreat has less to feed on.\n\nWhat gets lost is the saying. {lean} may seldom be asked to put the need for quiet into words, and {mid}, who can go either way, may not mention a wish to talk it through, if there is one. A pause can then look like peace when it is only one person having stopped asking.',
            sk: '{lean} si city zvyčajne ustáli v tichu, kým prehovorí, a {mid} môže to ticho prijať alebo zaplniť rozprávaním. Tempo ťažkého rozhovoru preto zvyčajne určuje to, ako sa prispôsobí {mid}, a nie nejaká dohoda dvojice. Môže to byť láskavosť: kolotoč naliehania a ústupu tu má menej z čoho rásť.\n\nČo sa tu ľahko vytratí, sú slová. {lean} sa možno len zriedka musí vyjadriť k tomu, prečo potrebuje ticho, a keďže {mid} vie ísť oboma smermi, nemusí ani spomenúť prípadnú chuť vec prebrať. Pauza potom môže vyzerať ako pokoj, hoci jeden človek len prestal žiadať.',
        },
        aside: {
            en: 'The flexible one tends to follow the quieter one’s pace. {lean} tends to settle inwardly and {mid} can match either tempo, so whatever {mid} would prefer can go unspoken because adjusting is so easy.',
            sk: 'Kto sa ľahko prispôsobí, zvyčajne prevezme pokojnejšie tempo druhej strany. {lean} si veci zvyčajne ustáli v sebe a {mid} vie ísť v oboch tempách, takže vlastné želanie, ktoré má {mid}, môže zostať nevyslovené, lebo prispôsobiť sa je také ľahké.',
        },
        step: { en: 'Ask the one who adapts easily which pace would actually suit a hard evening, and let the quieter one say how long a pause usually needs.', sk: 'Opýtajte sa toho, kto sa prispôsobuje ľahko, ktoré tempo by sa na ťažký večer naozaj hodilo, a nech ten, kto potrebuje ticho, povie, koľko času pauza zvyčajne potrebuje.' },
        question: { en: 'If the answer were not shaped by what the other needs, what would the easier-going of you want from the first minutes after an upset?', sk: 'Ak odhliadnete od toho, čo potrebuje ten druhý, čo si v prvých minútach po rozrušení želá ten z vás, kto sa prispôsobuje ľahšie?' },
    },
    'processing-pace/oneSided:outwardly-engaged': {
        title: { en: 'The subject opened, the speed still open', sk: 'Téma otvorená, tempo ešte nerozhodnuté' },
        passage: {
            en: '{lean} tends to find out what is felt by saying it, and so is likely to be the one who opens a hard subject, which keeps it from going unspoken. {mid} can follow at that pace or ask for a slower one.\n\nMuch can depend on which of those {mid} takes up on a given day. Following at speed can produce answers that were quick rather than settled. Slowing down can sound, to someone who has just spoken, like the start of a retreat. Because {mid} can do either, the choice is easy to make without noticing, and {lean} can find it hard to tell a slower pace from a withdrawal. The strain can ease once a slow answer is as ordinary in this pair as a quick one.',
            sk: '{lean} zvyčajne zisťuje, čo cíti, tým, že to vysloví, a preto ťažkú tému pravdepodobne otvorí, takže téma nezostane nevyslovená. {mid} môže ísť rovnakým tempom, alebo požiadať o pomalšie.\n\nVeľa môže závisieť od toho, ktorú z týchto možností si {mid} v daný deň vyberie. Držať krok môže priniesť odpovede, ktoré sú skôr rýchle než ustálené. Spomalenie môže hneď po vyslovení pôsobiť ako začiatok ústupu. Keďže {mid} vie oboje, voľba sa dá urobiť ľahko a bez povšimnutia a {lean} môže len ťažko rozoznať pomalšie tempo od stiahnutia sa. Napätie môže povoliť, keď bude pomalá odpoveď v tejto dvojici rovnako bežná ako rýchla.',
        },
        aside: {
            en: 'The talker tends to open the subject and the adapter to set its speed. {lean} is likely to say what is felt as it forms, and {mid} can follow or slow it, so a slowing that comes without a reason can sound like a retreat.',
            sk: 'Tému zvyčajne otvorí ten, kto premýšľa nahlas, a rýchlosť určí ten, kto sa prispôsobuje. {lean} zvyčajne vyslovuje, čo cíti, ešte kým sa to rodí, a {mid} môže držať krok alebo spomaliť, takže spomalenie bez vysvetlenia môže znieť ako ústup.',
        },
        step: { en: 'Try, on a low-stakes subject, letting the adaptable one answer last, and notice what the answer sounds like when it has not had to keep up.', sk: 'Skúste pri téme, na ktorej veľa nezáleží, nechať toho, kto sa prispôsobuje, odpovedať až na konci, a všimnite si, ako odpoveď znie, keď nemusí držať krok.' },
        question: { en: 'When a subject is raised, how would each of you tell a slower answer from a withdrawn one?', sk: 'Keď sa otvorí nejaká téma, ako každý z vás rozozná pomalšiu odpoveď od stiahnutia sa?' },
    },
    /* ------------------------------------------------------------------ reasoning (reasoning-style) -- */
    'reasoning-style/opposed': {
        title: { en: 'A hunch that has to show its papers', sk: 'Tušenie, ktoré sa musí preukázať' },
        passage: {
            en: '{p1} can sense that something is off before there is anything to point to. {p0} tends to trust what can be laid out step by step, and to ask what the sense rests on. The question can be a way of taking the hunch seriously, and it can land as a demand for proof that does not exist yet.\n\nSay {p1} mentions a feeling about a plan, {p0} asks for the reasons, the reasons have not formed, and the feeling is set aside as unfounded. The next one may come later, already defended, or not at all, and {p0} can lose the early signal that {p1} was placed to catch. Between them the two can hold a test and an early warning: one asks whether a plan holds, the other notices how it will be to live with. Whether a plan gets both can come down to how a hunch is heard: as an early note worth a look, or as a claim that has to win its case.',
            sk: '{p1} môže vycítiť, že niečo nesedí, skôr než je na čo ukázať. {p0} zvyčajne verí tomu, čo sa dá vyložiť krok za krokom, a pýta sa, na čom to tušenie stojí. Tá otázka môže byť spôsobom, ako tušenie vziať vážne, no môže zaznieť aj ako požiadavka obhájiť to, čo sa ešte obhájiť nedá.\n\nPovedzme, že {p1} spomenie zlý pocit z plánu, {p0} sa spýta na dôvody, dôvody ešte nie sú a pocit sa odloží ako nepodložený. Ďalší taký pocit môže prísť neskôr, už s obhajobou, alebo vôbec nie, a {p0} tak môže prísť o včasný signál, ktorý vie zachytiť {p1}. Spolu môžu mať skúšku aj včasné varovanie: jeden sa pýta, či plán obstojí, druhý si všíma, aké bude s takým plánom žiť. Či plán dostane oboje, môže záležať na tom, ako sa tušenie počuje: ako včasný postreh, ktorý stojí za pozretie, alebo ako tvrdenie, ktoré musí vyhrať spor.',
        },
        aside: {
            en: 'Hunches and reasons keep different clocks. {p1} can sense that something is off before there is anything to point to, and {p0} tends to want the reasons first. The request for reasons can sound like doubt, and the hunch that cannot yet be defended can go unmentioned.',
            sk: 'Tušenie a dôvody prichádzajú v inom čase. {p1} môže vycítiť, že niečo nesedí, skôr než je na čo ukázať, a {p0} chce zvyčajne najprv dôvody. Žiadosť o dôvody môže znieť ako pochybnosť a tušenie, ktoré sa zatiaľ nedá obhájiť, môže zostať nevyslovené.',
        },
        step: { en: 'When raising a thought, say whether it is a hunch or a conclusion, so that a hunch is met with curiosity and a conclusion with questions.', sk: 'Keď prichádzate s nejakou myšlienkou, povedzte, či je to tušenie, alebo záver, aby sa tušenie stretlo so zvedavosťou a záver s otázkami.' },
        question: { en: 'What happens to a feeling of yours that you cannot yet explain: is it said, softened, or kept back?', sk: 'Čo sa stane s pocitom, ktorý zatiaľ neviete vysvetliť: povie sa nahlas, zmäkčí sa, alebo zostane nevyslovený?' },
    },
    'reasoning-style/shared:analytical': {
        title: { en: 'Answering a feeling with a plan', sk: 'Plán ako odpoveď na pocit' },
        passage: {
            en: '{both} tend to meet a worry with questions: what exactly happened, what follows from it, what could be done. That can make tender subjects easier to discuss without a fight, since each tends to trust a careful argument and neither has to defend a feeling by raising a voice.\n\nThe quiet difficulty is one of timing. Say one describes a bad day and the other answers with a plan: the plan may be sound and still arrive before the day has been heard. Between two people who both explain, there may be no one placed to notice that what was wanted first was company. Whether comfort or ideas is being asked for is a question easily skipped when both are quick to answer.',
            sk: '{both} zvyčajne odpovedajú na starosť otázkami: čo presne sa stalo, čo z toho vyplýva, čo sa dá robiť. Vďaka tomu sa citlivé témy môžu prebrať bez hádky, lebo každý zvyčajne verí dôkladnému zdôvodneniu a nikto nemusí pocit obhajovať zvýšeným hlasom.\n\nŤažkosť je tichá a týka sa načasovania. Povedzme, že jeden opíše zlý deň a druhý odpovie plánom: plán môže byť rozumný, a predsa prísť skôr, než si ten deň niekto vypočuje. Medzi dvoma ľuďmi, z ktorých každý vysvetľuje, nemusí mať kto zbadať, že najprv bola potrebná spoločnosť. Otázka, či sa čaká útecha, alebo nápady, sa ľahko preskočí, keď každý z nich odpovedá rýchlo.',
        },
        aside: {
            en: 'Explaining tends to be the shared way of meeting a feeling. {both} are likely to answer it with questions and a plan, which can keep a tender subject calm and can mean that a bad day is solved before it has been heard.',
            sk: 'Vysvetľovanie býva ich spoločným spôsobom, ako prijať pocit. {both} naň zvyčajne odpovedajú otázkami a plánom, čo môže citlivú tému udržať v pokoji a môže znamenať, že zlý deň sa vyrieši skôr, než sa vypočuje.',
        },
        step: { en: 'Try an evening in which nothing is solved: each tells a difficult moment of the day, and the other only asks what it was like.', sk: 'Skúste večer, keď sa nič nerieši: každý povie jednu ťažkú chvíľu dňa a druhý sa len spýta, aké to bolo.' },
        question: { en: 'What does a solution say to each of you when it arrives before the feeling has been heard?', sk: 'Čo každému z vás povie riešenie, ktoré príde skôr, než sa pocit vypočuje?' },
    },
    'reasoning-style/shared:intuitive': {
        title: { en: 'Understood before it is said, and sometimes misread', sk: 'Pochopené skôr, než sa to povie, a občas nesprávne' },
        passage: {
            en: '{both} can pass a great deal across without saying it: a change of voice at the door, a pause that lasts a little too long, and the other is already responding. That economy is real, and it can be much of what lets the two feel understood.\n\nIts blind spot is that a sense of the other’s mood can feel like knowledge. When it is wrong, it is wrong with conviction on both sides. A tired silence can be taken as displeasure, the cooler reply that follows as proof, and neither asks, because asking seems unnecessary until it is overdue. The shared gift and the shared hazard are one thing, since understanding that rarely needs words also rarely gets checked.',
            sk: '{both} si dokážu bez slov odovzdať veľa: zmenu hlasu pri dverách, pauzu o chvíľu dlhšiu, než treba, a ten druhý už reaguje. Táto úspornosť je skutočná a môže byť veľkou časťou toho, prečo majú pocit, že si rozumejú.\n\nSlepé miesto je v tom, že dojem z nálady druhého človeka sa môže zdať vedomosťou. Keď sa mýli, mýli sa s presvedčením na oboch stranách. Unavené ticho sa môže vziať za nevôľu, chladnejšia odpoveď, ktorá nasleduje, za potvrdenie, a nikto sa nepýta, lebo pýtať sa pripadá zbytočné, kým nie je neskoro. Spoločný dar aj spoločné riziko sú jedna vec: porozumenie, ktoré slová potrebuje len málokedy, sa málokedy aj overuje.',
        },
        aside: {
            en: 'Wordless understanding can run unchecked. {both} tend to pick up each other’s mood from small signals, which saves explanation and can let a wrong guess stand, because the question that would correct it seems unnecessary.',
            sk: 'Porozumenie bez slov môže ostať bez overenia. {both} zvyčajne zachytávajú nálady z maličkostí, čo šetrí vysvetľovanie, ale môže nechať stáť aj omyl, lebo otázka, ktorá by omyl opravila, sa zdá zbytočná.',
        },
        step: { en: 'When a mood is picked up, ask one plain question before answering it, such as whether it is about the two of you or about the day.', sk: 'Keď niekto z vás zachytí náladu, položte jednu jasnú otázku skôr, než zareagujete, napríklad či ide o vás dvoch, alebo o prežitý deň.' },
        question: { en: 'Which small signal from the other does each of you read most confidently, and has that reading ever been checked?', sk: 'Ktorý drobný signál druhého si každý z vás vykladá najistejšie a overili ste si niekedy, či ten výklad platí?' },
    },
    'reasoning-style/oneSided:analytical': {
        title: { en: 'Feelings that arrive dressed as arguments', sk: 'Pocity prezlečené za argumenty' },
        passage: {
            en: 'A conversation here tends to happen in the language {lean} prefers, since {mid} can speak it. That has real uses: questions get answered, a worry can be taken apart into pieces that can be handled, and a decision can rest on stated reasons.\n\nWhat gets left out is easy to miss. A sense that {mid} formed by feel can arrive already dressed as an argument, and what could not be argued may be the part left behind. {lean} can meet a partner who is easy to reason with, and may not meet what was noticed first. The exchange changes when {mid} can say, without a case ready, that something matters and the reasons have not caught up.',
            sk: 'Rozhovor tu zvyčajne prebieha v jazyku, ktorý má radšej {lean}, lebo {mid} ten jazyk ovláda. Má to skutočný úžitok: na otázky sa dostávajú odpovede, starosť sa môže rozložiť na zvládnuteľné kúsky a rozhodnutie môže stáť na vyslovených dôvodoch.\n\nTo, čo zostane bokom, sa ľahko prehliadne. Dojem, ku ktorému {mid} dospeje citom, môže prísť už prezlečený za argument a to, čo sa argumentmi povedať nedalo, môže zostať pozadu. {lean} môže mať pred sebou človeka, s ktorým sa dobre diskutuje, a nemusí sa stretnúť s tým, čo sa zachytilo ako prvé. Výmena sa zmení, keď {mid} dokáže bez hotového zdôvodnenia povedať, že niečo je dôležité, hoci dôvody ešte chýbajú.',
        },
        aside: {
            en: 'Reasoning tends to get the floor. {lean} tends to want the why before trusting a feeling, and {mid} can supply it or go by instinct, so a gut sense may arrive in the form of an argument and lose what could not be argued.',
            sk: 'Rozumovanie tu zvyčajne dostáva slovo. {lean} chce zvyčajne vedieť prečo skôr, než pocitu uverí, a {mid} vie dôvod dodať alebo ísť podľa inštinktu, takže tušenie môže prísť v podobe argumentu a stratiť to, čo sa argumentmi povedať nedalo.',
        },
        step: { en: 'Let the one who can go either way say at the start whether a view is reasoned or felt, and leave a felt one unjustified for a first hearing.', sk: 'Nech ten, kto vie ísť oboma smermi, povie hneď na začiatku, či názor vychádza z úvahy, alebo z citu, a názor z citu nech pri prvom vypočutí zostane bez zdôvodnenia.' },
        question: { en: 'What does the more flexible of you notice before there are reasons, and what would make saying so safe?', sk: 'Čo si ten z vás, kto vie ísť oboma smermi, všimne skôr, než sú dôvody, a čo by pomohlo povedať to bez obáv?' },
    },
    'reasoning-style/oneSided:intuitive': {
        title: { en: 'A hunch with an interpreter at hand', sk: 'Tušenie s tlmočníkom po ruke' },
        passage: {
            en: '{mid} can act as an interpreter for the hunches {lean} has, turning an impression into words and reasons when a decision calls for them. That can be useful: the early sense of a mood or a risk does not have to wait for its justification before it can be used.\n\nThe risk sits in the arrangement itself. If {mid} keeps supplying the reasons, they can start to look like the credentials a hunch needs, and an impression that nobody manages to translate this time may be set aside as unfounded. {lean} can also come to hand over a sense and wait for it to be put into proper form, which can make the other a translator and leave the original unspoken. What can get lost is that the sense was already information before any reasons arrived.',
            sk: '{mid} môže tušeniam, ktoré má {lean}, robiť tlmočníka: prevádzať dojem do slov a dôvodov, keď to rozhodnutie vyžaduje. To môže byť užitočné: včasný dojem z nálady alebo rizika nemusí čakať na zdôvodnenie, aby sa dal použiť.\n\nRiziko je v samotnom usporiadaní. Ak {mid} dôvody stále dodáva, môžu začať vyzerať ako vstupenka, ktorú tušenie potrebuje, a dojem, ktorý sa tentoraz nikomu nepodarí preložiť, sa môže odložiť ako nepodložený. {lean} si tiež môže zvyknúť dojem odovzdať a čakať, kým dostane poriadnu podobu, čím sa z druhého človeka môže stať prekladateľ a pôvodný dojem zostane nevyslovený. Stratiť sa môže to, že dojem bol informáciou už predtým, než prišli akékoľvek dôvody.',
        },
        aside: {
            en: 'An interpreter is close to hand for every hunch. {lean} tends to read a situation by its feel, and {mid} can put the feel into reasons, which is useful until the reasons start to feel like the price of being heard.',
            sk: 'Pri každom tušení je po ruke tlmočník. {lean} zvyčajne posudzuje situáciu podľa dojmu a {mid} vie ten dojem previesť do dôvodov, čo je užitočné, kým sa dôvody nezačnú zdať cenou za vypočutie.',
        },
        step: { en: 'Let a hunch be noted as it comes, without reasons, and look at it together later, when something has confirmed or contradicted it.', sk: 'Poznačte si tušenie, keď príde, bez dôvodov, a vráťte sa k tomu spolu neskôr, keď sa niečo potvrdí alebo vyvráti.' },
        question: { en: 'When has a sense that could not yet be explained turned out to be worth hearing earlier?', sk: 'Kedy sa ukázalo, že tušenie, ktoré sa ešte nedalo vysvetliť, stálo za vypočutie už skôr?' },
    },
    /* ------------------------------------------------------------------ autonomy (closeness-and-room) -- */
    'closeness-and-room/opposed': {
        title: { en: 'The closed door and the open invitation', sk: 'Zavreté dvere a otvorené pozvanie' },
        passage: {
            en: 'The same closed door can carry two messages. {p0} may keep the ease in a shared life by taking time alone, and can come back from it warmer. {p1} tends to be most at home with the evening in one room and the decision made together, and can hear a request for room as a verdict on the relationship.\n\nA circle can form here: {p1} reaches for more contact, {p0} can feel crowded and step away, and each step away can make the next reach a little longer. Any argument that follows is seldom about the evening itself; it is about what the evening was taken to mean. The amount of time apart may matter less than whether the room has an edge that {p1} can see.',
            sk: 'Zavreté dvere môžu každému z nich povedať niečo iné. {p0} si možno pohodu spoločného života udržiava časom osamote a z takého času sa môže vracať s väčšou vrúcnosťou. {p1} sa zvyčajne cíti najlepšie, keď večer trávia v jednej miestnosti a rozhodujú spoločne, a prosbu o priestor môže počuť ako rozsudok nad vzťahom.\n\nMôže tu vzniknúť začarovaný kruh: {p1} hľadá viac blízkosti, {p0} sa môže cítiť stiesnene a odstúpiť a s každým odstúpením sa {p1} môže načahovať o kúsok ďalej. Prípadná hádka, ktorá potom príde, len zriedka býva o samotnom večeri; býva o tom, ako si ten večer kto vyložil. Na množstve času oddelene môže záležať menej než na tom, či má ten priestor hranicu, ktorú {p1} vidí.',
        },
        aside: {
            en: 'Closeness and room can be read as messages. {p1} tends to lean toward togetherness, and {p0} to need stretches alone to be at ease, so a request for room can sound like withdrawal and a request for company like pressure.',
            sk: 'Za blízkosťou aj za priestorom sa dá hľadať skrytý význam. {p1} sa zvyčajne prikláňa k tomu byť spolu a {p0} zvyčajne potrebuje na pohodu chvíle osamote, takže prosba o priestor môže znieť ako odťahovanie a prosba o spoločnosť ako tlak.',
        },
        step: { en: 'Agree to ask “what would this mean?” whenever a plan for room, or for company, is met with a flinch.', sk: 'Dohodnite sa, že sa spýtate „čo by to znamenalo?“, keď návrh na čas osobitne alebo spolu narazí na nevôľu.' },
        question: { en: 'When does room feel restful to one of you and like distance to the other?', sk: 'Kedy sa priestor jednému z vás zdá oddychom a druhému odstupom?' },
    },
    'closeness-and-room/shared:independent': {
        title: { en: 'Time together as a choice, not a default', sk: 'Spoločný čas ako voľba, nie samozrejmosť' },
        passage: {
            en: 'Time together tends to be a decision, not a default, when {both} protect their room, and an evening in company can carry the weight of having been chosen over an evening alone. The other’s absence is less likely to be held against anyone, which can spare the pair a good deal of friction.\n\nThe weakness is what a long rope can hide. A wish for more company is a request, and here it may feel like the one thing that should not be asked, so each can go on assuming the other prefers it this way. Two calendars can run side by side without a collision and without a meeting. Whoever first says that company was wanted could seem to be breaking the quiet rule that keeps the arrangement comfortable, which is why it can be harder to say than it sounds.',
            sk: 'Keď {both} chránia svoj priestor, spoločný čas býva rozhodnutím, nie samozrejmosťou, a večer strávený spolu môže mať váhu voľby, ktorá padla namiesto večera osamote. Neprítomnosť druhého sa tu skôr nevyčíta, čo môže dvojici ušetriť veľa trenia.\n\nSlabinou je to, čo sa za veľkou voľnosťou môže skryť. Túžba po väčšej spoločnosti je prosba a tu môže pôsobiť ako jediná vec, o ktorú sa nepatrí žiadať, a tak každý môže ďalej predpokladať, že druhému to takto vyhovuje. Dva kalendáre môžu bežať vedľa seba bez zrážky, no aj bez toho, aby sa niekde stretli. Prvé priznanie, že spoločnosť by bola vítaná, môže vyzerať ako porušenie tichého pravidla, na ktorom to pohodlné usporiadanie stojí, a preto sa povie ťažšie, než sa zdá.',
        },
        aside: {
            en: 'A long rope can hide a wish for company. {both} tend to give each other room freely, so time together is chosen, and if neither asks for more, each can go on assuming that the distance is what the other prefers.',
            sk: 'Veľká voľnosť môže zakryť túžbu po spoločnosti. {both} si zvyčajne ochotne dopriavajú priestor, takže spoločný čas je voľbou, a ak nikto nežiada viac, každý môže ďalej predpokladať, že odstup druhému vyhovuje.',
        },
        step: { en: 'Set up a standing, low-key invitation, such as one meal in the week with no agenda, that either can use without having to ask for more.', sk: 'Zaveďte pevné, nenápadné pozvanie, napríklad jedno jedlo v týždni bez programu, ktoré môže využiť ktorýkoľvek z vás bez toho, aby sa muselo žiadať viac.' },
        question: { en: 'What would it take for one of you to say “I wanted company today” without it sounding like a complaint?', sk: 'Čo by pomohlo, aby jeden z vás mohol povedať „dnes by mi spoločnosť padla vhod“ a neznelo to ako výčitka?' },
    },
    'closeness-and-room/shared:collaborative': {
        title: { en: 'Everything in the plural', sk: 'Všetko v množnom čísle' },
        passage: {
            en: '{both} tend to make decisions in the plural: the weekend, the errands, even an opinion about a film can arrive as a “we”. Friends and plans can flow into one pool, and nobody has to ask to be included.\n\nThe cost is quiet. A wish that belongs to one person can seem to need turning into a shared plan before it can be mentioned, and a wish that does not turn can be set aside before anyone has heard it. Each can find that a part of life has been put away for the sake of the couple without there being a moment at which it was given up. Building the shared life tends to come easily to these two; room for what is not shared is the part that does not make itself.',
            sk: '{both} sa zvyčajne rozhodujú v množnom čísle: víkend, pochôdzky, dokonca aj názor na film môže zaznieť ako „my“. Priatelia a plány sa môžu zliať do jedného a nikto nemusí prosiť o prizvanie.\n\nCena je tichá. Prianie, ktoré patrí len jednému z nich, akoby sa najprv muselo premeniť na spoločný plán, aby sa vôbec dalo spomenúť, a prianie, ktoré sa premeniť nedá, sa môže odložiť skôr, než vôbec zaznie. Každý môže zistiť, že časť života sa odložila kvôli dvojici, hoci nebola žiadna chvíľa, keď by sa o tom rozhodlo. Spoločný život sa u týchto dvoch zvyčajne buduje ľahko; miesto pre to, čo spoločné nie je, samo od seba nevznikne.',
        },
        aside: {
            en: 'Everything tends toward “we” here. {both} tend to feel most at home when plans, evenings and problems are shared, which can leave little to carry alone and little room for a wish that belongs to one of them.',
            sk: 'Všetko tu smeruje k „my“. {both} sa zvyčajne cítia najlepšie, keď sú plány, večery aj starosti spoločné, takže len máločo treba niesť osamote a pre prianie, ktoré patrí len jednému z nich, môže zostať málo miesta.',
        },
        step: { en: 'Let each keep one thing that belongs to no plan of the two, and share it only if and when it is wanted.', sk: 'Nechajte každému jednu vec, ktorá nepatrí do žiadneho plánu dvojice, a podeľte sa o takú vec, iba ak na to príde chuť.' },
        question: { en: 'Is there something each of you has set aside for the sake of the two, and is it still set aside by choice?', sk: 'Je niečo, čo každý z vás dáva bokom kvôli dvojici, a robí to ešte z vlastnej voľby?' },
    },
    'closeness-and-room/oneSided:independent': {
        title: { en: 'Room that is easy to give', sk: 'Priestor, ktorý sa dá ľahko dopriať' },
        passage: {
            en: 'Room can be easy to give when the one giving it has no strong pull either way, and that is where {mid} stands. {lean} can take an afternoon or a weekend without it turning into a question, and the tug-of-war this difference can start may hardly begin.\n\nWhat the ease can hide is the other side of the bargain. {lean} may not learn what the room costs the other, because any cost is seldom announced, and the readiness {mid} shows can settle into a habit of not mentioning any preference at all. A relationship can end up arranged around one person’s rhythm without either having proposed it, and the first sign may be a small remark about how many evenings have been spent apart.',
            sk: 'Dopriať priestor môže byť ľahké, keď človek nemá vyhranenú potrebu ani jedným smerom, a práve tam stojí {mid}. {lean} si môže vziať popoludnie či víkend bez toho, aby sa z toho stala otázka, a preťahovanie, ktoré by takýto rozdiel mohol rozbehnúť, sa nemusí takmer ani začať.\n\nZa tou ľahkosťou sa môže skrývať, čo platí druhá strana. {lean} sa nemusí dozvedieť, čo ten priestor stojí druhého človeka, lebo prípadná cena sa len zriedka ohlasuje, a ochota, ktorú {mid} dáva najavo, sa môže zmeniť na zvyk nespomínať vôbec žiadne prianie. Vzťah sa tak môže zariadiť podľa rytmu jedného človeka bez akéhokoľvek návrhu a prvým znamením môže byť drobná poznámka o tom, koľko večerov prešlo oddelene.',
        },
        aside: {
            en: 'Easy room can hide a preference. {lean} tends to need stretches alone and {mid} can give them without feeling left, which can spare the tug-of-war and leave a wish for company on the other side unspoken.',
            sk: 'Ľahko daný priestor môže zakrývať prianie. {lean} zvyčajne potrebuje chvíle osamote a {mid} ich vie dopriať bez pocitu opustenosti, čo môže ušetriť preťahovanie a nechať nevyslovené prianie po spoločnosti na druhej strane.',
        },
        step: { en: 'Let the easygoing one say, once, how much company would be chosen if the choice were entirely free.', sk: 'Nechajte toho, kto sa prispôsobuje ľahko, raz povedať, koľko spoločnosti by bolo ideálne pri úplne slobodnej voľbe.' },
        question: { en: 'If room cost nothing to give, what would the one who gives it still want more of?', sk: 'Keby dopriať priestor nič nestálo, čo by ešte chýbalo tomu z vás, kto priestor dáva?' },
    },
    'closeness-and-room/oneSided:collaborative': {
        title: { en: 'Togetherness with an unnamed edge', sk: 'Blízkosť s nepomenovanou hranicou' },
        passage: {
            en: 'Most of the togetherness {lean} looks for, {mid} can meet, so the edge of it seldom has to be named. That is also why it can arrive as news. The evening {mid} does need alone, said for the first time, can sound like a change in the relationship and not like a fact about one evening.\n\nWhere the limit is named plainly and early, it can become part of the arrangement, one more shape the days take. Where it is left to be discovered, the discovery can be remembered as the moment the room appeared, and the evenings before it may start to look, in hindsight, like something given reluctantly.',
            sk: 'Väčšinu spoločného času, ktorý {lean} hľadá, vie {mid} dať, a tak sa hranica málokedy musí pomenovať. Práve preto môže prísť ako novinka. Večer, ktorý {mid} naozaj potrebuje osamote, môže pri prvom vyslovení znieť ako zmena vo vzťahu, nie ako fakt o jednom večeri.\n\nAk sa hranica pomenuje jasne a včas, môže sa stať bežnou súčasťou spoločných dní. Ak sa objaví až sama, tá chvíľa môže zostať v pamäti ako okamih, keď sa zrazu zjavil priestor, a predchádzajúce večery môžu spätne vyzerať, akoby sa dávali neochotne.',
        },
        aside: {
            en: 'A flexible partner can hide the edge. {lean} tends to look for a lot of shared time and {mid} can meet most of it, so the point at which it becomes too much may stay unnamed until it is suddenly needed.',
            sk: 'Prispôsobivý človek môže hranicu skrývať. {lean} zvyčajne hľadá veľa spoločného času a {mid} vie väčšinu z toho dať, takže chvíľa, keď je toho priveľa, môže zostať nepomenovaná, až kým sa zrazu nemusí vysloviť.',
        },
        step: { en: 'While nothing is at stake, let the flexible one name the amount of shared time that feels generous and the amount that is a stretch.', sk: 'Kým o nič nejde, nech ten, kto sa ľahko prispôsobí, pomenuje, koľko spoločného času je ešte štedrosť a koľko už námaha.' },
        question: { en: 'What about the limits of togetherness is easier to say on an ordinary evening than in the middle of a full week?', sk: 'Čo sa o hraniciach blízkosti dá ľahšie povedať v obyčajný večer než uprostred preplneného týždňa?' },
    },
    /* ------------------------------------------------------------------ structure (structure-and-flexibility) -- */
    'structure-and-flexibility/opposed': {
        title: { en: 'Wednesday’s plan and Saturday’s mood', sk: 'Stredajší plán a sobotná nálada' },
        passage: {
            en: 'Say it is Wednesday: {p0} may already be planning the weekend, while {p1} would rather see how Saturday feels. Neither leaning is a comment on the relationship, though each can be heard as one. A plan can be a way of making sure the day is spent on the two of them and not on logistics, and an open day can be where the good surprise has room to happen.\n\nThe friction can gather in what each contributes unseen. The planning tends to be invisible, and so does the readiness to turn a cancelled plan into something. When Saturday arrives without arrangements, {p0} can see it as being left to do the arranging; when it arrives with them, {p1} can see it as a day already used up. A few fixed points that both have chosen are a different thing from a schedule that one has set.',
            sk: 'Povedzme, že je streda: {p0} už možno plánuje víkend, kým {p1} chce radšej počkať, aká bude sobotná nálada. Ani jeden sklon nie je komentár k vzťahu, hoci sa tak dá počuť. Plán môže byť spôsob, ako zaistiť, aby deň patril dvojici, a nie vybavovaniu, a voľný deň môže dať priestor príjemnému prekvapeniu.\n\nTrenie sa môže zbierať v tom, čo každý prináša nepovšimnuto. Plánovanie býva neviditeľné, rovnako ako ochota urobiť zo zrušeného plánu niečo dobré. Keď sobota príde bez dohôd, {p0} v tom môže vidieť, že zariaďovanie zostalo na jednom z dvoch; keď príde s dohodami, {p1} v tom môže vidieť deň, ktorý sa minul skôr, než začal. Niekoľko pevných bodov, ktoré dvojica zvolila spolu, je niečo iné než rozvrh určený jedným z dvoch.',
        },
        aside: {
            en: 'Small things can carry the friction. {p0} may plan the weekend on Wednesday while {p1} would rather see how Saturday feels, and each can hear the other’s habit as a statement about the relationship.',
            sk: 'Trenie sa môže skrývať v maličkostiach. {p0} možno plánuje víkend už v stredu, kým {p1} chce radšej počkať na sobotnú náladu, a každý môže zvyk druhého počuť ako výrok o vzťahu.',
        },
        step: { en: 'Agree on a word for a plan that is only an idea, so that a maybe is not heard as a yes and an open day is not heard as a no.', sk: 'Dohodnite sa na slove pre plán, ktorý je zatiaľ len nápad, aby sa „možno“ nebralo ako áno a voľný deň ako nie.' },
        question: { en: 'Which part of the week does each of you most want settled, and which part most want left alone?', sk: 'Ktorú časť týždňa chce mať každý z vás najviac pevne zariadenú a ktorá by mala zostať úplne voľná?' },
    },
    'structure-and-flexibility/shared:structured': {
        title: { en: 'Two diaries and little room for chance', sk: 'Dva diáre a málo miesta pre náhodu' },
        passage: {
            en: 'Everything tends to have an owner when {both} like the week arranged: the bills, the birthdays, the Sunday. It is a quiet gift, since the daily floor can hold without discussion and the week is less likely to surprise either of them in a bad way.\n\nThe difficulty is subtler than rigidity. A plan guarded from two sides can set into rules that nobody quite chose, and a change proposed by one can meet the other’s own idea of how the day should go. An unplanned evening needs room in two diaries at once, and each diary can have good reasons for being full. The result can be a life that is well run and seldom surprised, in which spontaneity is something both might welcome and neither schedules.',
            sk: 'Keď {both} majú radi usporiadaný týždeň, o všetko sa zvyčajne niekto stará: o účty, narodeniny, nedeľu. Je to tichý dar, lebo základ všedných dní môže držať bez debát a týždeň ich nepríjemne prekvapí menej často.\n\nŤažkosť je jemnejšia než strnulosť. Plán strážený z oboch strán sa môže zmeniť na pravidlá, ktoré vlastne nikto nezvolil, a zmena, ktorú navrhne jeden, môže naraziť na vlastnú predstavu druhého o tom, ako má deň vyzerať. Neplánovaný večer potrebuje miesto v dvoch diároch naraz a každý diár môže mať dobré dôvody, prečo je plný. Výsledkom môže byť život dobre riadený, ale málokedy prekvapený, v ktorom je spontánnosť niečo, čo by každý možno uvítal, no nikto to nenaplánuje.',
        },
        aside: {
            en: 'Two diaries can leave little room for chance. {both} tend to like the week arranged, so a plan guarded from both sides can set into rules nobody quite chose, and an evening left open needs a gap in both diaries at once.',
            sk: 'Dva diáre môžu nechať málo miesta pre náhodu. {both} majú zvyčajne radi usporiadaný týždeň, takže plán strážený z oboch strán sa môže zmeniť na pravidlá, ktoré vlastne nikto nezvolil, a voľný večer potrebuje medzeru v oboch diároch naraz.',
        },
        step: { en: 'Reserve one evening in both diaries as empty on purpose, and let whoever has an idea on the day propose it.', sk: 'Nechajte jeden večer v oboch diároch zámerne prázdny a nech program navrhne ten, kto v ten deň príde s nápadom.' },
        question: { en: 'What would an evening that was not planned look like for the two of you, and who would have to give something up for it?', sk: 'Ako by vyzeral večer, ktorý nikto nenaplánoval, a kto z vás by sa musel pre taký večer niečoho vzdať?' },
    },
    'structure-and-flexibility/shared:adaptable': {
        title: { en: 'An easy day and the forms that wait', sk: 'Ľahký deň a formuláre, ktoré čakajú' },
        passage: {
            en: 'A change of plan is unlikely to start a quarrel here, and the insurance renewal may have no particular owner. A cancelled dinner can turn into a walk without either taking it as a slight, and that ease can be much of what makes {both} good company for each other.\n\nThe same lightness has a gap in it. The dull obligations, the insurance, the dentist, the bills, can belong to no one in particular, and each can assume the other will get to them, or that later is fine. They can slide until they arrive together as a crisis, and the crisis can then be taken for a statement about the relationship when it is an overdue form. What is often missing is not a system but a moment when one of the two says, “this one is mine”.',
            sk: 'Zmena plánu tu asi nespôsobí hádku a obnovenie poistky nemusí mať jasného majiteľa. Zrušená večera sa môže zmeniť na prechádzku a nikto to nemusí brať ako urážku. Práve táto ľahkosť môže byť veľkou časťou toho, prečo sú si {both} navzájom dobrou spoločnosťou.\n\nTá istá ľahkosť má aj slabé miesto. Nudné povinnosti, ako poistka, zubár či účty, nemusia patriť nikomu zvlášť a každý môže počítať s tým, že sa k nim dostane ten druhý, alebo že to ešte počká. Môžu sa odkladať, až prídu naraz ako kríza, a tú potom možno vziať za výrok o vzťahu, hoci je to len formulár po termíne. Často nechýba systém, ale chvíľa, keď jeden z dvoch povie: „toto beriem ja“.',
        },
        aside: {
            en: 'The dull things can belong to nobody. {both} tend to move easily with the day, so a change of plan seldom becomes an argument, while the insurance and the dentist can slide, each assuming the other will get to them.',
            sk: 'Nudné veci nemusia patriť nikomu. {both} sa zvyčajne ľahko prispôsobia dňu, takže zmena plánu sa len zriedka zvrhne na hádku, kým poistka a zubár sa môžu odkladať, pričom každý počíta s tým, že sa k nim dostane ten druhý.',
        },
        step: { en: 'Give each recurring dull task one named owner, written down where both can see it, and trade the list around when it stops fitting.', sk: 'Každej opakujúcej sa nudnej povinnosti určte jedného majiteľa, zapíšte to tam, kde to vidí každý z vás, a keď zoznam prestane sedieť, povymieňajte si úlohy.' },
        question: { en: 'Which of the dull things would each of you quietly prefer the other to carry?', sk: 'Ktorú z nudných vecí by každému z vás potichu najviac vyhovovalo prenechať druhému?' },
    },
    'structure-and-flexibility/oneSided:structured': {
        title: { en: 'A tolerated plan is still one person’s plan', sk: 'Znášaný plán je stále plán jedného človeka' },
        passage: {
            en: '{lean} can end up owning the calendar, simply because {mid} has no strong pull either way and can live with whatever it holds. That can be efficient: the week runs, less is likely to be forgotten, and {mid} can bend a plan without turning it into a matter.\n\nWhat it hides is whose plan it is. When one keeps the arrangement and the other tolerates it, the keeper can end up carrying a load of remembering that is seldom seen. The one who tolerates it may be agreeing to a week on which only one voice was heard. The ease on both sides is real, and so is the chance that the week has a single author.',
            sk: '{lean} môže skončiť s kalendárom v rukách, jednoducho preto, že {mid} nemá vyhranenú potrebu ani jedným smerom a s tým, čo v kalendári stojí, vie žiť. To môže byť praktické: týždeň beží, menej sa zabudne a {mid} vie plán ohnúť a nerobiť z toho problém.\n\nSkrýva sa v tom otázka, čí je to vlastne plán. Keď má jeden plán v rukách a druhý sa prispôsobuje, ten, kto plán drží, môže niesť záťaž pamätania, ktorú málokto vidí. Ten, kto plán znáša, môže súhlasiť s týždňom, v ktorom zaznel len jeden hlas. Ľahkosť na oboch stranách je skutočná a rovnako skutočná je možnosť, že týždeň má jediného autora.',
        },
        aside: {
            en: 'A calendar can have one author. {lean} tends to keep it and {mid} can work inside it or bend it, so daily life can run smoothly, and the plan can be tolerated by one without ever having been chosen by both.',
            sk: 'Kalendár môže mať jediného autora. {lean} zvyčajne drží kalendár a {mid} sa vie plánu prispôsobiť alebo plán ohnúť, takže bežný deň môže bežať hladko, hoci plán môže jeden z dvoch len znášať bez toho, aby sa o tom rozhodlo spolu.',
        },
        step: { en: 'Once, let the flexible one draw up the week, and see what the structured one learns about what the plan was holding.', sk: 'Raz nechajte pružného človeka zostaviť týždeň a všimnite si, čo sa ten, kto zvyčajne plánuje, dozvie o tom, čo plán držal pokope.' },
        question: { en: 'How much of the week as it stands is something each of you would have chosen, and how much is simply what was already written?', sk: 'Koľko z terajšieho týždňa zodpovedá voľbe každého z vás a koľko je len to, čo tam už stálo zapísané?' },
    },
    'structure-and-flexibility/oneSided:adaptable': {
        title: { en: 'The planning behind the easy day', sk: 'Plánovanie za ľahkým dňom' },
        passage: {
            en: '{lean} tends to go with the day, and {mid} can supply just enough structure to keep the essentials covered. Because {mid} is able to, the arrangement can settle that way without a decision. The appointments, the bookings and the question of what Saturday holds can be handled in the background, and the easy day seems to cost nothing.\n\nWhat it costs can show up in a small moment. Say {mid} asks whether anything has been planned: the relaxed answer can carry the news that the planning has been left to the one who asked. The unplanned day is a gift to the pair only while the planning behind it is known to exist.',
            sk: '{lean} sa zvyčajne nechá viesť dňom a {mid} vie dodať práve toľko poriadku, aby bolo postarané o podstatné. Pretože to {mid} dokáže, môže sa to tak ustáliť bez akéhokoľvek rozhodnutia. Termíny, rezervácie aj otázka, čo prinesie sobota, sa môžu vybavovať v pozadí a ľahký deň akoby nič nestál.\n\nČo stojí, sa môže ukázať v drobnej chvíli. Povedzme, že sa {mid} spýta, či je niečo naplánované: uvoľnená odpoveď môže prezradiť, že plánovanie zostalo na tom, kto sa pýta. Neplánovaný deň je darom pre dvojicu len dovtedy, kým sa vie, že plánovanie v pozadí existuje.',
        },
        aside: {
            en: 'The easy day can have a planner behind it. {lean} tends to follow the day, and {mid} can supply enough structure to cover the essentials, so the planning can happen in the background and go unseen.',
            sk: 'Za ľahkým dňom môže stáť niekto, kto plánuje. {lean} sa zvyčajne nechá viesť dňom a {mid} vie dodať dosť poriadku, aby bolo postarané o podstatné, takže plánovanie môže prebiehať v pozadí a zostať nepovšimnuté.',
        },
        step: { en: 'Make the background planning visible once: let the planner list what is already arranged, and let the easygoing one take over one item on it.', sk: 'Raz urobte plánovanie v pozadí viditeľným: nech ten, kto plánuje, vymenuje, čo je už zariadené, a ten, kto sa nechá viesť dňom, si prevezme jednu položku.' },
        question: { en: 'What is arranged for the two of you that only one of you knows has been arranged?', sk: 'Čo je pre vás dvoch zariadené tak, že o tom vie len jeden z vás?' },
    },
    /* ------------------------------------------------------------------ risk (risk-and-caution) -- */
    'risk-and-caution/opposed': {
        title: { en: 'Two lists, both true', sk: 'Dva zoznamy, oba pravdivé' },
        passage: {
            en: 'A large decision between these two can arrive with two lists. {p1} tends to hold the reasons it might be wonderful, and {p0} the things that could go wrong. Both lists can be true. The trouble can start when they stop being information and become positions: {p1} may push for the step, {p0} may add one more risk, and the two end up arguing with each other instead of with the question. Enthusiasm can feel like being hurried toward an edge, and each doubt can feel like a door being shut.\n\nTogether the two can hold what neither has alone: a sense of what is worth trying and a sense of what would make it survivable. A good deal can rest on the order of two questions, what needs to stay safe whatever happens and whether to go at all.',
            sk: 'Veľké rozhodnutie medzi týmito dvoma môže prísť s dvoma zoznamami. {p1} má zvyčajne dôvody, prečo by to mohlo byť skvelé, a {p0} veci, ktoré by sa mohli pokaziť. Oba zoznamy môžu byť pravdivé. Problém môže začať, keď prestanú byť informáciou a stanú sa stanoviskami: {p1} môže tlačiť na krok vpred, {p0} môže pridať ďalšie riziko a dvojica sa napokon háda medzi sebou namiesto toho, aby riešila samotnú otázku. Nadšenie môže pôsobiť ako postrkovanie k okraju a každá pochybnosť ako zatváranie dverí.\n\nSpolu môžu mať to, čo nemá ani jeden sám: cit pre to, čo stojí za pokus, aj cit pre to, čo by pomohlo to ustáť. Veľa môže závisieť od poradia dvoch otázok: čo treba udržať v bezpečí, nech sa stane čokoľvek, a či sa do toho vôbec pustiť.',
        },
        aside: {
            en: 'Two true lists can stall a decision. {p1} tends to see what a step could open and {p0} what it could cost, and each can treat the other’s list as an obstacle rather than half the picture.',
            sk: 'Dva pravdivé zoznamy môžu rozhodnutie zdržať. {p1} zvyčajne vidí, čo by krok mohol otvoriť, a {p0}, čo by mohol stáť, a každý môže zoznam druhého brať ako prekážku, a nie ako druhú polovicu pravdy.',
        },
        step: { en: 'Give a big decision a date: agree when it will be settled, and what the more cautious one needs to have seen by then.', sk: 'Veľkému rozhodnutiu dajte termín: dohodnite sa, kedy sa rozhodne a čo má opatrnejšia strana dovtedy vidieť.' },
        question: { en: 'Which doubt, if answered, would let the more cautious of you say yes, and which question would the bolder one like to be asked first?', sk: 'Ktorú pochybnosť treba zodpovedať, aby opatrnejšia strana mohla povedať áno, a akú otázku chce odvážnejšia strana počuť ako prvú?' },
    },
    'risk-and-caution/shared:cautious': {
        title: { en: 'A leap talked out of existence', sk: 'Skok vyhovorený z hlavy' },
        passage: {
            en: '{both} tend to build with savings, a backup plan and a second look before anything is signed, and the ground under the shared life tends to feel solid.\n\nCaution that meets caution has nothing to answer it. An objection from one is likely to sound reasonable to the other, who may add another. A leap that both half want can be talked out of existence by two people who agreed with each other at every step. Nobody has to say no for a plan to stay in the drawer; it is enough that neither takes it out again.',
            sk: '{both} zvyčajne stavajú na úsporách, záložnom pláne a druhom pohľade predtým, než sa niečo podpíše, a pôda pod spoločným životom pôsobí zvyčajne pevne.\n\nOpatrnosť, ktorá sa stretne s opatrnosťou, nemá protiváhu. Námietka jedného sa druhému zrejme bude zdať rozumná a môže pribudnúť ďalšia. Skok, ktorý si napoly želá každý z nich, dokážu dvaja ľudia, ktorí sa v každom kroku zhodli, vyhovoriť z hlavy. Nikto nemusí povedať nie, aby plán zostal v šuplíku; stačí, že sa znova nevytiahne.',
        },
        aside: {
            en: 'Every objection can sound reasonable here. {both} lean toward caution, so a doubt from one may meet no counterweight in the other, and a leap that both half want can be talked out of existence one sensible step at a time.',
            sk: 'Každá námietka tu môže znieť rozumne. {both} sa prikláňajú k opatrnosti, takže pochybnosť jedného nemusí u druhého nájsť protiváhu a skok, ktorý si dvaja napoly želajú, sa dá vyhovoriť jedným rozumným krokom za druhým.',
        },
        step: { en: 'For a plan that keeps being postponed, find one small version that could be tried at low cost, and decide together whether it goes ahead.', sk: 'Pre plán, ktorý sa stále odkladá, nájdite jednu malú verziu, ktorú sa dá vyskúšať lacno, a spolu sa rozhodnite, či sa do toho pustíte.' },
        question: { en: 'Which plan is still being checked, and what would count as checked enough?', sk: 'Ktorý plán sa stále preveruje a čo by znamenalo, že je preverený dosť?' },
    },
    'risk-and-caution/shared:risk-oriented': {
        title: { en: 'A yes with no brake behind it', sk: 'Áno bez brzdy' },
        passage: {
            en: 'An idea is seldom met with a reason to wait when {both} are together. The spontaneous trip, the bold step and the plan that sounded impossible can all get a yes, and that appetite can be much of what makes the shared life feel alive.\n\nThe risk is that nobody may hold the brake, so the check that would make a leap safer can fall to neither of them. The money to fall back on, the way back, the plan for when it does not work can be left to be found on the way, at the point where finding them costs the most. Whoever first asks what happens if it goes wrong may sound for a moment like a spoiler, when the question is the one piece the pair is least likely to supply.',
            sk: 'Nápad len zriedka narazí na dôvod počkať, keď sú {both} spolu. Spontánny výlet, odvážny krok aj plán, ktorý znel nemožne, môžu dostať áno a práve táto chuť môže byť veľkou časťou toho, prečo spoločný život pôsobí živo.\n\nRiziko je v tom, že brzdu možno nikto nedrží, takže kontrola, ktorá by skok urobila bezpečnejším, nemusí pripadnúť nikomu z nich. Rezerva na horšie časy, cesta späť, plán pre prípad, že to nevyjde, sa môžu nechať na neskôr a hľadať až po ceste, práve vtedy, keď je ich hľadanie najdrahšie. Kto sa prvý spýta, čo ak to nevyjde, môže na chvíľu pôsobiť ako kazisvet, hoci je to otázka, s ktorou by dvojica sama od seba prišla najmenej.',
        },
        aside: {
            en: 'A shared appetite for the bold step can leave the brake unheld. {both} lean toward the leap, so the question of what happens if it goes wrong may come late, when answering it costs the most.',
            sk: 'Spoločná chuť do odvážnych krokov môže znamenať, že brzdu nikto nedrží. {both} sa prikláňajú k skoku, takže otázka, čo ak sa to pokazí, môže prísť neskoro, keď odpovedať stojí najviac.',
        },
        step: { en: 'For each large yes, ask out loud while it is still exciting what would be needed if it did not work, and answer it before the date is fixed.', sk: 'Pri každom veľkom áno sa nahlas, kým je to ešte vzrušujúce, spýtajte, čo by bolo treba, ak by to nevyšlo, a odpovedzte na to skôr, než sa určí dátum.' },
        question: { en: 'Whose turn is it to ask what happens if it goes wrong, and what would make the question sound like care and not like a spoiler?', sk: 'Kto je na rade s otázkou, čo sa stane, ak to nevyjde, a čo by spôsobilo, že zaznie ako starostlivosť, a nie ako kazenie radosti?' },
    },
    'risk-and-caution/oneSided:cautious': {
        title: { en: 'The casting vote', sk: 'Rozhodujúci hlas' },
        passage: {
            en: 'On a large decision {mid} can end up holding the casting vote. {lean} is likely to ask for the second look, and {mid} can go either way. When {mid} sides with the second look, the choice is measured and still moves; when {mid} sides with the leap, the caution can turn into a minority view that has to be argued for.\n\nEither outcome can work. What can go missing is the sense that the decision was made by the two together. {mid} may find every large choice resting on a position taken alone, and {lean} may start to feel that caution is being outvoted rather than answered. A vote cast silently can be heard as a ruling, whichever way it goes.',
            sk: 'Pri veľkom rozhodnutí môže mať napokon rozhodujúci hlas {mid}. {lean} pravdepodobne požiada o druhý pohľad a {mid} môže ísť oboma smermi. Keď sa {mid} prikloní k druhému pohľadu, voľba je uvážená a predsa sa pohne; keď sa {mid} prikloní ku skoku, opatrnosť sa môže zmeniť na menšinový názor, ktorý treba obhajovať.\n\nKaždý z výsledkov môže obstáť. Čo môže chýbať, je pocit, že rozhodli dvaja spolu. {mid} môže zistiť, že každá veľká voľba stojí na stanovisku, ktoré zaujal jeden človek sám, a {lean} môže nadobudnúť dojem, že sa opatrnosť prehlasuje namiesto toho, aby dostala odpoveď. Hlas odovzdaný mlčky sa dá počuť ako rozsudok, nech dopadne akokoľvek.',
        },
        aside: {
            en: 'Whoever can go either way can hold the casting vote. {lean} tends to keep a hand on the brake and {mid} can side with it or with the leap, so big choices can stay measured, though caution can come to feel outvoted instead of answered.',
            sk: 'Rozhodujúci hlas môže mať ten, kto vie ísť oboma smermi. {lean} zvyčajne drží ruku na brzde a {mid} sa môže postaviť na stranu brzdy alebo skoku, takže veľké voľby môžu zostať uvážené, hoci opatrný hlas môže vyznieť ako prehlasovaný, nie vypočutý.',
        },
        step: { en: 'Let the one who can go either way say early which way a large decision is leaning and what is behind that, before the cautious one has to argue first.', sk: 'Nech ten, kto vie ísť oboma smermi, včas povie, ktorým smerom sa veľké rozhodnutie prikláňa a čo za tým stojí, skôr než musí ako prvá argumentovať opatrnejšia strana.' },
        question: { en: 'What would the cautious one need to hear for a decision to feel answered rather than outvoted?', sk: 'Čo potrebuje počuť opatrnejšia strana, aby rozhodnutie pôsobilo ako odpoveď na námietky, a nie ako prehlasovanie?' },
    },
    'risk-and-caution/oneSided:risk-oriented': {
        title: { en: 'A second opinion that can sound like a no', sk: 'Druhý názor, ktorý môže znieť ako nie' },
        passage: {
            en: '{lean} can be drawn to a bold step before the details exist, and {mid} can either join in or slow it. Because {mid} can do both, a yes is easy to take for the whole answer, and a slower reply for a small no.\n\nThat is the weak point of a second opinion: it is only worth having if it can be heard as one. A slowing that arrives with its reason, a number or a question or a thing that needs checking, can sound like a second opinion. Without a reason it can sound like the first hint of a refusal, and the plan may then be defended instead of examined. Whether a pause is help or resistance is settled less by the pause than by what comes with it.',
            sk: '{lean} sa môže nadchnúť pre odvážny krok skôr, než sú známe podrobnosti, a {mid} sa môže pridať alebo to spomaliť. Pretože {mid} vie oboje, áno sa ľahko vezme za celú odpoveď a pomalšia reakcia za malé nie.\n\nTo je slabé miesto druhého názoru: má cenu len vtedy, ak sa dá počuť ako druhý názor. Spomalenie, ktoré prichádza s dôvodom, číslom, otázkou alebo vecou na preverenie, môže znieť ako druhý názor. Bez dôvodu môže znieť ako prvý náznak odmietnutia a plán sa potom môže skôr obhajovať, ako skúmať. Či je pauza pomocou, alebo odporom, závisí menej od samotnej pauzy než od toho, čo prichádza spolu s pauzou.',
        },
        aside: {
            en: 'A slower reply can sound like a refusal. {lean} can be drawn to a bold step before the details exist and {mid} can join in or slow things down, so a yes can be taken for the whole answer and a slowing for a small no.',
            sk: 'Pomalšia odpoveď môže znieť ako odmietnutie. {lean} sa môže nadchnúť pre odvážny krok skôr, než sú známe podrobnosti, a {mid} sa môže pridať alebo veci spomaliť, takže áno sa dá vziať za celú odpoveď a spomalenie za malé nie.',
        },
        step: { en: 'Say which kind of reply it is: “yes”, “yes, and let me check this”, or “not yet”, and agree that the second counts as a yes.', sk: 'Povedzte, o aký druh odpovede ide: „áno“, „áno, ešte to preverím“ alebo „ešte nie“, a dohodnite sa, že sa druhá počíta ako áno.' },
        question: { en: 'What does a pause from the more flexible of you sound like to the one with the idea, and what would let it sound like help?', sk: 'Ako znie pauza od toho z vás, kto vie ísť oboma smermi, tomu, kto má nápad, a čo by pomohlo, aby zaznela ako pomoc?' },
    },
};
export default ROMANTIC_A;
