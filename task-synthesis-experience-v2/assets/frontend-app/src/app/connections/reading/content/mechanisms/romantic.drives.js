/**
 * ROMANTIC. In a partnership the weight falls on the small daily moments: how a feeling is met, how a disagreement is paused and picked up again, how closeness and room are shared. Part drives (what each is led by).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 */
const ROMANTIC_DRIVES = {
    'shared-pull/shared:mastery': {
        title: { en: 'Two people absorbed in their craft', sk: 'Dvaja ponorení do svojho remesla' },
        passage: {
            en: '{both} each have something they are slowly getting good at, and each is likely to know what a closed door and a quiet evening mean: not a refusal, only someone at work. Nobody has to defend the hours, and the effort behind a small improvement can be understood without being explained.\n\nThe cost is easy to miss because nothing happens. Two people can share a room for an evening, each bent over a separate piece, until the talk shrinks to who is cooking and what is needed from the shop. The relationship can get whatever is left of the day, and what is left can be small. Whether this becomes a pair of parallel absorptions or two crafts that sometimes meet turns on whether the work is ever carried across the threshold: a stuck problem said aloud, a half-finished piece shown early.',
            sk: '{both} majú každý niečo, v čom sa pomaly zlepšujú, a každý zrejme vie, čo znamenajú zatvorené dvere a tichý večer: nie odmietnutie, len druhý pri práci. Hodiny nikto nemusí obhajovať a námaha za malým pokrokom sa dá pochopiť aj bez vysvetľovania.\n\nCena sa ľahko prehliadne, lebo sa nič nedeje. Dvaja môžu presedieť večer v jednej izbe, každý sklonený nad svojou prácou, kým sa reč nezúži na to, kto varí a čo treba kúpiť v obchode. Vzťah môže dostať len to, čo zo dňa zvýši, a to môže byť málo. Či z toho budú dve oddelené ponorenia, alebo dve remeslá, ktoré sa občas stretnú, záleží na tom, či sa práca niekedy dostane aj cez prah: problém, na ktorom to viazne, povedaný nahlas, rozrobený kus ukázaný pred dokončením.',
        },
        aside: {
            en: 'Each of the two has a craft that takes the evening, and each is likely to understand that about the other. The hours are given freely, and the risk is only that the relationship is fed on what is left of the day.',
            sk: 'Remeslo, ktoré zaberie celý večer, má tu každý z dvojice a každý to u druhého zrejme chápe. Hodiny sa dávajú bez zaváhania a hrozí len to, že vzťah sa živí zvyškami dňa.',
        },
        step: { en: 'Pick one thing you are stuck on and say it aloud over a meal, asking the other for a question rather than an answer.', sk: 'Vyberte si jednu vec, pri ktorej viaznete, povedzte nahlas pri jedle a druhého požiadajte o otázku namiesto odpovede.' },
        question: { en: 'Which part of your craft would you like the other to see before it is finished, and which part would you rather keep to yourself?', sk: 'Ktorú časť svojho remesla by ste chceli ukázať druhému ešte pred dokončením a ktorú by ste si radšej nechali pre seba?' },
    },
    'shared-pull/shared:achievement': {
        title: { en: 'Both climbing, and where the tiredness lands', sk: 'Dvaja na ceste hore a kam sa zloží únava' },
        passage: {
            en: 'A late night before a deadline is unlikely to meet reproach when {both} are the kind of people who set a goal and reach it. Ambition tends to be understood from the inside, so the one coming home drained is seldom asked to justify the hours, and a goal is backed as readily as it is held.\n\nThe same fluency has a shadow. When each is climbing, home can become the place where tiredness is put down, because it is the one place that demands no result. A weekend can go to recovering from the last push and preparing for the next, and a small win at home goes uncounted beside the larger ones elsewhere. Two calendars can also compete without a word, the nearer deadline taking the evening by default. The partnership can then become a pit stop between two ascents, and the open question is whether it is ever allowed to be a goal of its own.',
            sk: 'Za neskorú noc pred termínom sotva niekto niečo vyčíta, ak {both} patria k ľuďom, ktorí si dajú cieľ a dotiahnu to do konca. Ambícii tu obyčajne rozumejú zvnútra, takže od toho, kto sa vráti domov vyčerpaný, sa zdôvodnenie hodín len zriedka žiada, a cieľ sa podporí tak ochotne, ako sa sleduje.\n\nRovnaká ľahkosť má aj tieň. Keď stúpa každý, domov sa môže stať miestom, kde sa únava odkladá, lebo je to jediné miesto, ktoré nežiada výsledok. Víkend môže odísť na zotavovanie z posledného náporu a prípravu na ďalší a malé víťazstvo doma sa popri väčších inde nerátá. Dva kalendáre môžu aj bez slova súperiť a o večeri rozhodne bližší termín, jednoducho preto, že je bližší. Vzťah sa potom môže zmeniť na zastávku medzi dvoma výstupmi a otvorená zostáva otázka, či sa smie niekedy stať aj cieľom.',
        },
        aside: {
            en: 'Ambition is spoken fluently here, which makes the relationship a safe place to arrive tired. It can also become the only place where tiredness is put down, while every win is counted somewhere else.',
            sk: 'Ambícia tu nie je nikomu cudzia, a preto sa do vzťahu dá prísť unavený bez obáv. Môže sa však stať jediným miestom, kde sa únava odkladá, zatiaľ čo víťazstvá sa počítajú inde.',
        },
        step: { en: 'When one of you has a push coming, say when it ends and name one thing at home that will still happen during it.', sk: 'Keď jeden z vás čaká nápor, povedzte, kedy sa skončí, a pomenujte jednu vec doma, ktorá sa bude diať aj v tom čase.' },
        question: { en: 'What would count as a win for the two of you, as opposed to a win for each of you?', sk: 'Čo by bolo spoločnou výhrou vás dvoch, a nie výhrou každého zvlášť?' },
    },
    'shared-pull/shared:recognition': {
        title: { en: 'Two people who need to be seen', sk: 'Dvojica, ktorá potrebuje byť videná' },
        passage: {
            en: '{both} treat praise almost as a language, and each tends to speak it well: the noticed effort, the word at the right moment, the “I saw what that took”. Being seen by someone who knows how much it counts is among the warmest things this pairing can give.\n\nThe difficulty is that the need runs in both directions at once. Say one comes home with good news while the other is still carrying a day nobody noticed, and the applause can arrive a beat late or thin, given from an empty cup. Neither has to be selfish for this to happen. Two people who each need an audience can be short of audience, and the other’s win can sting before it pleases. Much depends on whether the light moves between them, one evening plainly one person’s and the next the other’s.',
            sk: '{both} poznajú pochvalu skoro ako vlastný jazyk a každý v ňom zvyčajne hovorí dobre: všimnuté úsilie, slovo v pravú chvíľu, „vidím, čo ťa to stálo“. Uznanie od niekoho, kto vie, koľko znamená, patrí k najvrúcnejšiemu, čo môže tento pár dať.\n\nŤažkosť je v tom, že potreba ide oboma smermi naraz. Povedzme, že jeden príde s dobrou správou, kým druhý ešte nesie deň, ktorého si nikto nevšimol, a potlesk môže prísť oneskorene alebo chabý, daný z prázdneho pohára. Aby sa to stalo, nikto nemusí byť sebecký. Dvom ľuďom, ktorí potrebujú obecenstvo, môže obecenstvo chýbať a úspech druhého môže najprv zabolieť a až potom potešiť. Veľa závisí od toho, či sa svetlo strieda: jeden večer jasne patrí jednému a ďalší druhému.',
        },
        aside: {
            en: 'Appreciation is currency in this pairing, and each is likely to know what it is worth. When each is waiting to be seen, good news can arrive to a listener who is also waiting.',
            sk: 'Uznanie je v tomto páre mena, ktorej hodnotu zrejme pozná každý. Keď na povšimnutie čaká každý, dobrá správa môže doraziť k poslucháčovi, ktorý tiež čaká.',
        },
        step: { en: 'Take turns being the one celebrated: on a given evening the news of one is heard first and fully, and the other’s waits its turn.', sk: 'Striedajte sa v tom, kto je na rade s oslavou: jeden večer sa správa jedného vypočuje ako prvá a celá a správa druhého si počká.' },
        question: { en: 'What does being seen look like for each of you, and when is it hardest to give?', sk: 'Čo pre každého z vás znamená byť videný a kedy je najťažšie takéto uznanie dať?' },
    },
    'shared-pull/shared:meaning': {
        title: { en: 'Looking for the point of it all, together', sk: 'Spolu hľadať, načo to všetko je' },
        passage: {
            en: 'What {both} share is a need for their life to add up to something, and the conversations that follow can run long: why this work, why this city, what a good year would actually have been. Those talks are often where the two feel closest, because each is taken seriously at the level where it counts.\n\nThe cost falls on the plain days. A search for meaning can make ordinary happiness look thin, so a quiet week of meals, errands and a film can be read as drift rather than as a good week. A small question such as “is this enough?” can open at the supper table and take the whole evening with it. The hinge is whether a plain stretch is counted as part of the answer or only as the gap before it.',
            sk: '{both} zdieľajú potrebu, aby ich život dával zmysel, a rozhovory, ktoré z toho vzniknú, vedia byť dlhé: prečo práve táto práca, prečo práve toto mesto, čo by vlastne bol dobrý rok. V takých chvíľach sa dvaja často cítia najbližšie, lebo tu berú každého vážne v tom, na čom naozaj záleží.\n\nCena sa platí v obyčajných dňoch. Hľadanie zmyslu vie obyčajné šťastie zmenšiť, takže pokojný týždeň s jedlom, vybavovaním a jedným filmom môže pôsobiť ako plynutie bez cieľa, a nie ako dobrý týždeň. Malá otázka, napríklad „stačí to?“, sa môže objaviť pri večeri a vziať so sebou celý večer. Záleží na tom, či sa obyčajné obdobie počíta ako súčasť odpovede, alebo len ako medzera pred odpoveďou.',
        },
        aside: {
            en: 'A life that adds up is what both want, and the long talks about why are a bond in themselves. An ordinary, good stretch can nevertheless look slight beside the question of what it is all for.',
            sk: 'Tu chcú dvaja život, ktorý dáva zmysel, a už dlhé rozhovory o tom, prečo, ich spájajú. Obyčajné, dobré obdobie však popri otázke, načo to celé je, môže pôsobiť nepatrne.',
        },
        step: { en: 'After a plain week, each names one thing in it that was good as it was, with no question of what it adds up to.', sk: 'Po obyčajnom týždni pomenujte každý jednu vec, ktorá bola dobrá taká, aká bola, a nepýtajte sa, k čomu to celé vedie.' },
        question: { en: 'What would a good ordinary year look like to each of you, with nothing in it to prove?', sk: 'Aký by bol pre každého z vás dobrý obyčajný rok, v ktorom nie je čo dokazovať?' },
    },
    'shared-pull/shared:belonging': {
        title: { en: 'A warm nest, and how closed it can get', sk: 'Teplé hniezdo a ako sa vie uzavrieť' },
        passage: {
            en: '{both} are led by the wish to belong somewhere, so home tends to be built with intention. It can show in the table laid for the same few people, the friends who become a shared circle, the small customs that make a week feel like theirs.\n\nThe cost shows at the edges. When togetherness carries this much weight, one person’s evening with an old friend, a solitary hobby or a trip alone can be taken as a small desertion, whatever it was meant as. The one going out may begin to apologise for plans that need no apology. The circle can also close, until a new person at the table feels like a lot to ask. What decides it is whether the nest works as a home base or as a boundary.',
            sk: '{both} sa nechávajú viesť túžbou niekam patriť, a preto si domov zvyčajne budujú s rozmyslom. Prejaviť sa to môže v stole prestretom pre tých istých pár ľudí, v priateľoch, z ktorých sa stáva spoločný kruh, v drobných zvykoch, vďaka ktorým je týždeň naozaj ich.\n\nCena sa ukáže na okrajoch. Keď je spolubytie také dôležité, večer s dávnym priateľom, samotárska záľuba alebo cesta bez druhého sa môžu brať ako malé opustenie, nech to je myslené akokoľvek. Ten, kto odchádza, sa môže začať ospravedlňovať za plány, ktoré ospravedlnenie nepotrebujú. Kruh sa môže aj uzavrieť, až kým pridať k stolu nového človeka nepôsobí ako priveľa žiadať. Rozhoduje, či je hniezdo miestom, odkiaľ sa dá vyjsť a kam sa dá vrátiť, alebo hranicou.',
        },
        aside: {
            en: 'Home is tended on purpose when both are led by belonging. Anything outside the circle can then start to look like a small desertion, and the circle itself can close more tightly than either intended.',
            sk: 'Domov sa pestuje zámerne, keď dvoch vedie túžba patriť. Všetko mimo kruhu potom môže začať vyzerať ako malé opustenie a kruh sa môže uzavrieť tesnejšie, než by chcel ktokoľvek z dvojice.',
        },
        step: { en: 'Name one friendship or pastime outside the pair that each of you wants kept, and agree that going to it is announced, not asked for.', sk: 'Pomenujte každý jedno priateľstvo alebo záľubu mimo dvojice, ktoré chcete zachovať, a dohodnite sa, že odísť za tým sa len oznámi a o dovolenie sa nežiada.' },
        question: { en: 'What would each of you need to hear before an evening apart feels like part of the closeness?', sk: 'Čo by každý z vás potreboval počuť, aby večer bez druhého patril k blízkosti?' },
    },
    'shared-pull/shared:freedom': {
        title: { en: 'Nobody to explain a free evening to', sk: 'Nikomu netreba vysvetľovať voľný večer' },
        passage: {
            en: 'Between two people who both value freedom, a free evening needs no explanation. Plans change, a trip can be taken alone, and neither has to defend a wish for room, so the relationship stays light enough to breathe in. {both} can change a plan at the last minute without it turning into a negotiation.\n\nThe shadow is a question nobody asks. Naming what this is, a shared address, a holiday booked ahead, a word for the arrangement, can feel like the first claim on someone’s room, so each leaves it for the other to raise. Commitments can then arrive by drift rather than by decision, and each may read the other’s silence as a preference. Whoever minds the gap first can end up holding the question, and asking can then feel like the first claim on room in the whole arrangement.',
            sk: 'Keď dvaja ľudia stoja o slobodu, voľný večer nepotrebuje vysvetlenie. Plány sa menia, na cestu sa dá vybrať aj osamote a nikto nemusí obhajovať, že chce mať priestor, takže vzťah ostáva dosť ľahký na to, aby sa v ňom dalo dýchať. {both} môžu v poslednej chvíli zmeniť plán, bez toho aby z toho bolo vyjednávanie.\n\nTieň je otázka, ktorú nikto nekladie. Keď sa má pomenovať, čo toto je (spoločná adresa, dovolenka zarezervovaná dopredu, slovo pre ich dohodu), môže to vyzerať ako prvé siahnutie na cudzí priestor, a tak to každý nechá na druhom. Záväzky potom môžu prichádzať samy, nie rozhodnutím, a každý si môže mlčanie druhého vyložiť ako to, čo druhý chce. Kto si medzeru všimne prvý, môže napokon tú otázku niesť a pýtať sa môže vtedy pôsobiť ako prvý nárok na cudzí priestor v celej ich dohode.',
        },
        aside: {
            en: 'Room is given freely when both are led by freedom, and the relationship stays easy to be in. The price can be a question left unasked by each, because asking is itself a claim on the other’s room.',
            sk: 'Priestor sa tu dáva ochotne, lebo dvoch vedie sloboda, a vzťah ostáva ľahký. Cenou môže byť otázka, ktorú nepoloží nikto, lebo pýtať sa je samo nárokom na priestor druhého.',
        },
        step: { en: 'Choose one open question, a plan, a place or a word for what this is, and agree on a day to bring a first answer, even if the answer is “not yet”.', sk: 'Vyberte si jednu otvorenú otázku, plán, miesto alebo slovo pre to, čo toto je, a dohodnite sa na dni, keď prinesiete prvú odpoveď, aj keď to bude „zatiaľ nie“.' },
        question: { en: 'Which question about the two of you does each wait for the other to raise?', sk: 'Ktorú otázku o vás dvoch nechávate každý na druhého?' },
    },
    'shared-pull/shared:care': {
        title: { en: 'Two givers, and nobody asking', sk: 'Dvojica, ktorá dáva, a nikto, kto by si pýtal' },
        passage: {
            en: 'The tea is made before it is asked for, the coat is picked up, a hard day is read from the way a key turns in the door. {both} tend to look after each other with attention, and in a difficult stretch this can make the relationship a safe place to land.\n\nBut when both are givers, neither may be practised at receiving. A request can feel like taking from someone who has already given, so tiredness can stay private on each side, and each can be quietly covering the other’s evening while the two agree that nothing is wrong. The one most in need can be the hardest to find, because giving looks exactly like health from outside. Care can pass in the hall without either having asked for anything. It turns on whether a request is allowed to count as an act of care too.',
            sk: 'Čaj je uvarený skôr, než oň niekto požiada, kabát zodvihnutý z podlahy, ťažký deň sa pozná podľa toho, ako sa v zámke otočí kľúč. {both} sa o seba zvyčajne starajú pozorne a v ťažkom období môže byť vzťah vďaka tomu miestom, kde sa dá bezpečne pristáť.\n\nKeď však dáva každý, nikto možno nemá cvik v prijímaní. Požiadať môže vyzerať ako brať od niekoho, kto už dal, takže únava môže zostať na každej strane súkromná a každý môže potichu pokrývať večer druhého, kým sa dvaja zhodujú, že nič nie je zlé. Ten, kto to potrebuje najviac, sa hľadá najťažšie, lebo dávanie vyzerá zvonka presne ako zdravie. Starostlivosť môže prejsť z ruky do ruky na chodbe, a pritom nikto o nič nepožiada. Záleží na tom, či aj prosba smie byť prejavom starostlivosti.',
        },
        aside: {
            en: 'Giving comes first for both, so little is asked for. Tiredness can build unnoticed on each side, since a request would feel like taking from someone already giving.',
            sk: 'Keď na prvom mieste stojí dávanie, žiada sa máločo. Únava sa môže nepozorovane hromadiť na každej strane, lebo požiadať by pôsobilo ako brať od niekoho, kto už dáva.',
        },
        step: { en: 'Each names one thing the other could ask of them this week that would be welcome, and asks for it once.', sk: 'Každý z vás povie jednu vec, o ktorú môže druhý tento týždeň požiadať a ktorá je vítaná, a druhý o ňu raz požiada.' },
        question: { en: 'What is the smallest thing you could ask for this week without feeling that you are taking?', sk: 'Čo je najmenšie, o čo by ste mohli tento týždeň požiadať, bez pocitu, že si berete?' },
    },
    'shared-pull/shared:understanding': {
        title: { en: 'Wanting to know how the other works', sk: 'Zvedavosť na to, ako funguje druhá strana' },
        passage: {
            en: 'Curiosity is the form of closeness {both} trust most: why a mood came, what a sentence was really about, how the other arrived at a decision. Being understood in the particular way each wants is one of the quiet pleasures here, and it gives the pair a shared way of talking about its own patterns.\n\nThe edge is the moment when the curiosity arrives first. In the first minutes after an upset, “what do you think that was really about?” can read as being studied rather than held, and a feeling is explained while it is still raw and only needed company. A disagreement can then turn into a case to be solved, and the solution can stand in for the comfort. Understanding does its best work as the last step of a repair; it becomes a detour when it replaces the first.',
            sk: 'Zvedavosť je podoba blízkosti, ktorej {both} dôverujú najviac: prečo príde nálada, o čom veta naozaj je, ako k rozhodnutiu dospieva druhá strana. Byť pochopený presne tak, ako to každý chce, patrí k tichým radostiam tohto páru a dáva dvojici spoločnú reč na to, ako to u nich chodí.\n\nÚskalie je chvíľa, keď zvedavosť príde prvá. V prvých minútach po rozrušení môže otázka „čo myslíš, o čom to naozaj bolo?“ vyznieť ako skúmanie, nie ako podpora, a cit sa rozoberá, kým je ešte čerstvý a potreboval by len spoločnosť. Z nezhody sa potom môže stať prípad na vyriešenie a riešenie môže nahradiť útechu. Porozumenie sa najlepšie hodí ako posledný krok uzmierenia; odbočkou je, keď nahradí ten prvý.',
        },
        aside: {
            en: 'To be understood is the particular pleasure of this pairing, and each works at it. The risk is the explanation that comes too early: a feeling analysed when it only needed to be held.',
            sk: 'Byť pochopený je osobitná radosť tohto páru a každý sa o ňu usiluje. Riziko je vo vysvetlení, ktoré príde priskoro: cit sa rozoberá tam, kde stačilo byť nablízku.',
        },
        step: { en: 'After an upset, make the first question one of company, not of cause, and leave the why until both have settled.', sk: 'Po rozrušení nech je prvá otázka o spoločnosti, nie o príčine, a „prečo“ si nechajte, kým sa neupokojíte.' },
        question: { en: 'In the last upset, what did each of you need in the first minute that the other could not guess?', sk: 'Čo si pri poslednom rozrušení každý z vás želal v prvej minúte a čo z toho druhá strana nevedela?' },
    },
    'shared-pull/shared:self-expression': {
        title: { en: 'Two voices, one seat for the listener', sk: 'Dva hlasy, jedno miesto pre poslucháča' },
        passage: {
            en: '{both} need a way to put what is inside into the world, whether in words, work, music or an opinion held out loud. Each can give the other the rarer thing: a real listener for what is half-made. The relationship can become a stage that feels safe, where the unfinished thing can be shown.\n\nA familiar version of the trouble is the evening when both have something to say. One begins a story, the other starts composing a reply by the second sentence and enters on the next breath, and each can hear the other’s turn as an interruption and leave feeling slightly unspoken. In a disagreement this sharpens, since two people talking to be heard are not quite talking to each other. The scarce thing in the room is not the voice but the seat for the listener.',
            sk: '{both} potrebujú spôsob, ako dostať to, čo majú v sebe, na svet, či už slovom, prácou, hudbou alebo nahlas povedaným názorom. Každý môže druhému dať vzácnejšiu vec: skutočného poslucháča pre to, čo je ešte len rozpracované. Vzťah sa môže stať bezpečným javiskom, na ktorom sa dá ukázať aj nedokončené.\n\nZnáma podoba tej ťažkosti je večer, keď má každý čo povedať. Jeden začne príbeh, druhý už pri druhej vete začne skladať odpoveď a vstúpi pri najbližšom nádychu, a každý môže vstup druhého počuť ako skočenie do reči a odísť s pocitom, že niečo zostalo nepovedané. V nezhode sa to zhorší, lebo dvaja, čo hovoria, aby ich vypočuli, nehovoria celkom jeden k druhému. Vzácny nie je v miestnosti hlas, ale miesto pre poslucháča.',
        },
        aside: {
            en: 'Both have a voice that wants room, and each is generous in encouraging the other’s. Two strong voices can still talk past each other, each waiting for the gap in which to be heard.',
            sk: 'Hlas, ktorý chce priestor, má každý z dvojice a každý druhého veľkoryso povzbudzuje. Dva silné hlasy sa však môžu míňať, lebo každý čaká na medzeru, v ktorej zaznie.',
        },
        step: { en: 'Try an evening in which one speaks for a few minutes without reply, and the other says back what was heard before adding anything of their own.', sk: 'Skúste večer, keď jeden z vás niekoľko minút hovorí bez odpovede a druhý potom zopakuje, čo zaznelo, skôr než pridá niečo vlastné.' },
        question: { en: 'What is it you most want the other to hear, and what usually gets in the way of it being heard?', sk: 'Čo najviac chcete, aby druhý počul, a čo tomu zvyčajne bráni?' },
    },
    'shared-pull/shared:beauty': {
        title: { en: 'A table set for two', sk: 'Stôl prestretý pre dvoch' },
        passage: {
            en: 'A table set when nobody is coming, flowers bought for no occasion, a walk timed for dusk: {both} have a bond made partly of small things chosen to look and feel right. These rituals give an ordinary week its texture, and each is likely to notice when the other has taken trouble, which is its own way of being cared about.\n\nShared taste can turn into shared standards. A kitchen left as it was after a long day, a hurried present or a room in disorder can carry more weight than the day itself, as if it were a comment on the relationship. The same eye that makes a home lovely can make an ordinary, messy evening feel as though something has gone wrong. A standard can be a form of care, and the same standard can turn into an inspection without either noticing when it changed.',
            sk: '{both} držia spolu sčasti aj vďaka maličkostiam vybraným tak, aby vyzerali a pôsobili správne: stôl prestretý, aj keď nikto nepríde, kvety bez príležitosti, prechádzka načasovaná na súmrak. Tieto rituály dávajú obyčajnému týždňu ráz a každý si zrejme všimne, keď sa druhý trochu namáha, čo je samo osebe prejav toho, že na človeku záleží.\n\nSpoločný vkus sa môže zmeniť na spoločné nároky. Kuchyňa nechaná po dlhom dni tak, ako je, narýchlo kúpený darček alebo neporiadok v izbe môžu ťažiť viac než samotný deň, akoby boli poznámkou k vzťahu. Rovnaké oko, vďaka ktorému je domov krásny, môže spôsobiť, že obyčajný, rozhádzaný večer vyzerá, akoby sa niečo pokazilo. Nárok môže byť formou starostlivosti a ten istý nárok sa môže zmeniť na kontrolu bez toho, aby si niekto z dvojice všimol, kedy sa to stalo.',
        },
        aside: {
            en: 'Small rituals of beauty hold this pair together: the laid table, the flowers, the walk at dusk. Taste can harden into exacting standards, and a plain, untidy day can then seem like a fault.',
            sk: 'Drobné rituály krásy držia tento pár pohromade: prestretý stôl, kvety, prechádzka za súmraku. Z vkusu sa môžu stať prísne nároky a obyčajný, neupratený deň potom môže vyzerať ako chyba.',
        },
        step: { en: 'Name one small standard each of you can leave uncorrected this week, and one ritual of beauty each wants kept.', sk: 'Pomenujte každý jeden malý nárok, ktorý tento týždeň necháte bez opravy, a jeden rituál krásy, ktorý chcete zachovať.' },
        question: { en: 'Which little thing in your shared days gives you the sense that someone took trouble for you?', sk: 'Ktorá maličkosť vo vašich spoločných dňoch vám dáva pocit, že sa pre vás niekto namáhal?' },
    },
    'pulls-apart/freedom|belonging': {
        title: { en: 'The same invitation, two meanings', sk: 'Rovnaké pozvanie, dva významy' },
        passage: {
            en: 'The difference can show in something as small as an invitation. Say one arrives for both: {p1} may hear a chance to be together and lean toward yes, while {p0} may hear an evening already spoken for and answer “we’ll see”. {p1} can hear that answer as a step back from being together, and {p0} can feel the hopeful yes as a decision half made for two.\n\nBehind it are two different needs. {p0} tends to need room so that a bond can breathe; {p1} tends to need presence so that a bond is real on ordinary days. Held well, they balance: {p1} can keep the two close, and {p0} can keep the closeness from turning tight. Held badly, each can take the other’s need as a verdict on the relationship. A “we’ll see” can be heard as room inside the bond or as a first step out of it, and nothing in the words themselves says which.',
            sk: 'Rozdiel sa môže ukázať už pri obyčajnom pozvaní. Povedzme, že príde pozvanie pre dvojicu: {p1} v ňom vidí príležitosť na spoločný večer a má chuť hneď prikývnuť, kým {p0} má pocit, že je večer zrazu zabraný, a odpovie „uvidíme“. {p1} si takú odpoveď vyloží ako odstup a {p0} zase cíti v tom ochotnom áno rozhodnutie, ktoré padlo bez opýtania.\n\nZa tým sú dve rôzne potreby. {p0} zvyčajne potrebuje priestor, aby vzťah mohol dýchať; {p1} zvyčajne potrebuje blízkosť, ktorá robí vzťah skutočným aj v bežných dňoch. Keď sa to darí, potreby sa vyvažujú: {p1} môže udržiavať blízkosť a {p0} dbať, aby sa nezmenila na tesnosť. Keď nie, každý môže brať potrebu druhého ako ortieľ nad vzťahom. „Uvidíme“ sa dá pochopiť ako priestor, ktorý k vzťahu patrí, aj ako prvý krok von a samotné slovo neprezradí, ako je myslené.',
        },
        aside: {
            en: 'Freedom and belonging read the same evening in opposite ways. {p0} may find the way back in a night alone, which {p1} can read as distance; {p1} may find warmth in a night together, which {p0} can read as a claim.',
            sk: 'Sloboda a spolupatričnosť si ten istý večer vykladajú opačne. {p0} môže vo večere osamote nájsť cestu späť a {p1} v tom môže vidieť odstup; {p1} môže nájsť teplo vo večere spolu a {p0} v tom môže vidieť nárok.',
        },
        step: { en: 'When an invitation arrives for both, let each say first what it means to them, and let a “we’ll see” come with the day it will be settled.', sk: 'Keď príde pozvanie pre vás dvoch, nech každý z vás najprv povie, čo to pozvanie znamená, a k „uvidíme“ pridajte deň, keď sa to rozhodne.' },
        question: { en: 'What would let time apart mean coming back, and closeness mean an invitation rather than a claim?', sk: 'Čo by pomohlo, aby čas oddelene znamenal návrat a blízkosť pozvanie, a nie nárok?' },
    },
    'pulls-apart/achievement|care': {
        title: { en: 'One free hour, two claims on it', sk: 'Jedna voľná hodina a dva nároky na ňu' },
        passage: {
            en: 'The evening has one free hour and two claims on it. {p0} is led by the goal that is nearly within reach, {p1} by the person who needs a call, a visit or a listening ear. Both claims are decent, which is why the hour is so hard to give.\n\nThe damage lies in how the choice is taken. A goal given the hour can look like the relationship coming second, and a person given the hour can look like the goal brushed aside. Each can begin to hear the other’s use of time as a statement about where the relationship ranks. Together the two can build and tend at once, {p0} moving the shared life forward while {p1} sees that no one is left behind on the way. A priority is a choice about one hour, a ranking is a claim about the whole relationship, and the two are easily taken for each other.',
            sk: 'Večer má jednu voľnú hodinu a dva nároky na ňu. {p0} ide za cieľom, ktorý je takmer na dosah, {p1} za človekom, ktorý potrebuje telefonát, návštevu alebo vypočutie. Oba nároky sú slušné, a práve preto je také ťažké tú hodinu dať.\n\nŠkoda vzniká v tom, ako sa rozhoduje. Cieľ, ktorý dostane hodinu, môže vyzerať, akoby vzťah prišiel na druhé miesto, a človek, ktorý hodinu dostane, akoby sa cieľ odsunul nabok. Každý si potom môže začať vykladať, ako druhý nakladá s časom, ako znamenie toho, na ktorom mieste je vzťah. Spolu vedia dvaja budovať aj opatrovať naraz: {p0} posúva spoločný život dopredu, kým {p1} dbá na to, aby cestou nikto nezostal pozadu. Priorita je rozhodnutie o jednej hodine, rebríček je tvrdenie o celom vzťahu a tie dve sa ľahko pomýlia.',
        },
        aside: {
            en: 'Building and tending compete for the same hours. When {p0} gives an evening to the goal and {p1} gives it to the people, each can take the other’s choice for a verdict on the relationship.',
            sk: 'Budovanie a opatrovanie súperia o tie isté hodiny. Keď {p0} venuje večer cieľu a {p1} ľuďom, každý môže voľbu druhého brať ako ortieľ nad vzťahom.',
        },
        step: { en: 'Before a busy stretch begins, agree on one hour that belongs to the people and is not moved for the goal, and one that belongs to the goal.', sk: 'Skôr než začne rušné obdobie, dohodnite jednu hodinu, ktorá patrí ľuďom a pre cieľ sa nepresúva, a jednu, ktorá patrí cieľu.' },
        question: { en: 'When the evening goes to the goal or to the people, what does the other need said so that it is not heard as a ranking?', sk: 'Keď večer pripadne cieľu alebo ľuďom, čo potrebuje druhá strana počuť, aby to neznelo ako rebríček?' },
    },
    'pulls-apart/recognition|understanding': {
        title: { en: 'Applause on one side, questions on the other', sk: 'Potlesk na jednej strane, otázky na druhej' },
        passage: {
            en: 'Good news can land awkwardly between these two, because each may want it met differently. {p0} may want it received whole, with a pause for the applause. {p1} tends to show interest another way, by asking how it worked, what it was like, what came next. {p1} can mean the questions as a compliment, and {p0} can take them as a cross-examination that cuts the celebration short.\n\nIt can run the other way too. Say {p1} has just worked out how something works and wants to walk through it. If {p0} answers first with a warm “that’s wonderful”, the praise can sound like the end of the subject, even if it was meant as a beginning. Each can be offering the attention that comes most readily and still leave the other slightly missed. The difference holds two kinds of attention, one that celebrates what was done and one that wants to know how and why. Either can sting when it comes alone, and either can reach deep when the other follows.',
            sk: 'S dobrou správou to medzi týmito dvoma môže zaškrípať, lebo každý možno čaká iné privítanie. {p0} možno chce, aby sa celá správa najprv vypočula a potom prišla radosť. {p1} zvykne prejavovať záujem inak: pýta sa, ako to fungovalo, aké to bolo, čo prišlo potom. {p1} môže otázky myslieť ako poklonu, no {p0} ich môže brať ako výsluch, ktorý oslavu predčasne utne.\n\nMôže to byť aj naopak. Povedzme, že {p1} práve pochopí, ako niečo funguje, a chce to celé vyrozprávať. Ak {p0} odpovie najprv vrelým „to je skvelé“, pochvala môže vyznieť ako koniec témy, aj keď je myslená ako začiatok rozhovoru. Každý ponúka pozornosť, ktorá prichádza sama od seba, a druhá strana sa aj tak cíti trochu prehliadnutá. Ide o dva druhy pozornosti: jedna oslavuje, čo sa podarilo, druhá chce vedieť, ako a prečo. Jedna bez druhej môže zabolieť, no keď prídu jedna po druhej, vedia človeka hlboko potešiť.',
        },
        aside: {
            en: 'Good news can be wanted in two forms here: applauded, or understood. When {p0} shares a win hoping for a cheer and {p1} answers with questions about how it works, each can come away a little unseen.',
            sk: 'Pri dobrej správe môže jeden z dvojice čakať potlesk a druhý porozumenie. Keď sa {p0} podelí o úspech v nádeji na jasot a {p1} odpovie otázkami, ako to funguje, každému môže zostať pocit, že sa trochu minuli.',
        },
        step: { en: 'When one of you brings good news, celebrate it first and ask the questions afterwards, so that each kind of attention gets its turn.', sk: 'Keď jeden z vás prinesie dobrú správu, najprv oslavujte a otázky si nechajte na potom, nech príde na rad každý druh pozornosti.' },
        question: { en: 'When you bring good news, which do you want first, applause or questions, and does the other know it?', sk: 'Keď prinesiete dobrú správu, čo chcete najprv – potlesk, alebo otázky? A vie to ten druhý?' },
    },
    'different-pulls/different': {
        title: { en: 'Two things to live for', sk: 'Dve veci, pre ktoré sa žije' },
        passage: {
            en: 'Here {p0} {voice0}, while {p1} {voice1}. Neither is a mood or a hobby of the other’s. Each is closer to what a person arranges the days around, and the relationship holds two such centres.\n\nA free Saturday is where the difference shows. The day can be divided fairly, some hours for each pull, and still leave each wondering whether the other’s pull is being indulged rather than understood. Without curiosity each pull can shrink into a hobby in the other’s eyes, and what one of them lives for ends up at the margins of the shared week. The relationship has two engines, and much depends on whether each is treated as part of the machine or as noise from the next room.',
            sk: 'Tu {p0} {voice0}, kým {p1} {voice1}. Ani jedno nie je nálada či koníček druhého. Každé je skôr to, okolo čoho si človek zariaďuje dni, a vzťah má dva takéto stredy.\n\nRozdiel sa ukáže na voľnej sobote. Deň sa dá rozdeliť spravodlivo, niekoľko hodín pre každú vec, a každý sa napriek tomu môže pýtať, či sa to druhé len trpí, namiesto aby sa pochopilo. Bez zvedavosti sa môže to druhé v očiach každého zmenšiť na koníček a to, pre čo jeden z dvojice žije, skončí na okraji spoločného týždňa. Vzťah má dva motory a veľa závisí od toho, či sa každý berie ako súčasť stroja, alebo ako hluk z vedľajšej izby.',
        },
        aside: {
            en: 'Two different pulls give the relationship two engines. {p0} {voice0}, and {p1} {voice1}, and each may take the other’s pull for a pastime.',
            sk: 'Dve rozdielne veci, pre ktoré sa žije, dávajú vzťahu dva motory. {p0} {voice0}, {p1} {voice1}, a každý môže tú druhú vec brať ako záľubu.',
        },
        step: { en: 'Each describes a good day of the other’s pull as if planning it, and the two book one such day.', sk: 'Opíšte každý dobrý deň v tom, čo druhého hýbe, tak konkrétne, ako pri plánovaní, a jeden taký deň si spolu vyhraďte.' },
        question: { en: 'What does the other not yet know about what it is like to be moved by your pull?', sk: 'Čo druhý ešte nevie o tom, aké to je, keď vás niečo takto hýbe?' },
    },
};
export default ROMANTIC_DRIVES;
