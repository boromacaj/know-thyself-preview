/**
 * FAMILY. A family tie carries history and expectation, so the weight falls on roles that outlast the reason for them, on how much closeness each can offer, and on distance that is healthy rather than a failure. Part a (inner focus, reasoning, autonomy, structure, risk).
 * Each entry is one mechanism told whole (see Mechanism in contentTypes.ts). Slovak is written after the English has been proven (sk is empty until then).
 *
 * The neutral keys (shared, opposed, oneSided) serve siblings and extended family; they use no kind-specific noun, so they also stand in wherever a directed form is not written. The directed keys
 * (opposed:<pole>) speak of the older and the younger generation without naming the kind: the composer writes the role beside each name.
 */
const FAMILY_A = {
    /* ------------------------------------------------------------------ processing-pace -- */
    'processing-pace/shared:introspective': {
        title: { en: 'A silence nobody breaks', sk: 'Ticho, ktoré nikto neprelomí' },
        passage: {
            en: 'Say a lunch turns tense or a call goes badly: {both} are each likely to take the matter away to think, and to leave the other to do the same. Little is said in the heat that has to be taken back, and what comes later has been weighed.\n\nThe same courtesy can leave a matter with nobody to raise it. A worry about a relative or a remark that landed badly can sit between the two, each leaving it to the other to speak first if it were pressing. The silence can begin as consideration and harden into something that looks like agreement. It lasts until one of them breaks it, and the habit that protects the tie gives neither a reason to.',
            sk: 'Povedzme, že sa pri obede zhustí atmosféra alebo sa nevydarí telefonát: {both} si vtedy pravdepodobne odnesú vec na rozmyslenie, každý zvlášť, a to isté nechajú aj druhému. V zápale sa povie máločo, čo by sa muselo brať späť, a čo príde neskôr, je už rozvážené.\n\nTá istá ohľaduplnosť však môže spôsobiť, že vec nemá kto nadhodiť. Starosť o príbuzného alebo poznámka, ktorá nesadla, môže ostať ležať medzi nimi, lebo každý čaká, že sa druhý ozve, ak by to bolo naliehavé. Mlčanie môže začať ako ohľaduplnosť a postupne sa zmeniť na niečo, čo pripomína súhlas. Trvá, kým sa jeden z nich neozve prvý, a zvyk, ktorý vzťah chráni, na to nedáva dôvod nikomu z nich.',
        },
        aside: {
            en: 'Neither is likely to press the other for an answer, since {both} tend to give each other time to think without being asked. A matter that needs raising can then wait with no one to raise it, each leaving the first word to the other.',
            sk: 'Ani jeden z nich druhú stranu s odpoveďou zrejme nepopoháňa, lebo {both} si zvyčajne nechávajú čas na rozmyslenie, aj keď o to nikto nežiada. Vec, ktorú treba otvoriť, potom môže dlho čakať, lebo každý nechá prvé slovo na druhom.',
        },
        step: { en: 'Agree on one small way to open a matter that has been left to rest, a line either can use, so that neither has to find the first word alone.', sk: 'Dohodnite sa na jednej krátkej vete, ktorou môže ktokoľvek z vás otvoriť vec, čo ostala ležať, aby nikto nemusel hľadať prvé slovo sám.' },
        question: { en: 'What has been left to rest between you that neither of you has yet been the first to mention?', sk: 'Čo medzi vami ostalo ležať len preto, že prvé slovo ešte nepadlo?' },
    },
    'processing-pace/shared:outwardly-engaged': {
        title: { en: 'Said at the table, finished by phone', sk: 'Povedané pri stole, dohovorené cez telefón' },
        passage: {
            en: 'Say a sharp remark is made at the table: {both} are likely to settle it with a long call that same evening, each finding out what is meant by saying it aloud. The air tends to clear early, and little hardens into family history.\n\nThe speed has a cost. When both reach for the conversation at once, each is talking before either is sure what the matter is. Other matters can join in, until the first remark is the smallest thing in the call. Two fast voices seldom lack words. What the conversation can lack is a moment in which one has finished and the other has not yet begun.',
            sk: 'Povedzme, že pri stole padne ostrá poznámka: {both} si vec pravdepodobne vyjasnia ešte v ten večer dlhým telefonátom a každý zisťuje, čo si myslí, tým, že to povie nahlas. Vzduch sa zvyčajne vyčistí skoro a len máločo sa zapíše do rodinnej histórie.\n\nRýchlosť však niečo stojí. Keď sa do rozhovoru pustia naraz, každý hovorí skôr, než si je ktokoľvek z nich istý, o čo ide, a cestou sa môžu pridať ďalšie veci, až je pôvodná poznámka v telefonáte to najmenšie. Dvom rýchlym hlasom slová chýbajú zriedka. Rozhovoru skôr môže chýbať chvíľa, keď jeden dohovorí a druhý ešte nezačína.',
        },
        aside: {
            en: '{both} can clear a quarrel the same evening, since each talks a matter out. Its price can be a call in which both speak at once and the first remark ends up the smallest thing said.',
            sk: '{both} môžu hádku vyjasniť ešte v ten večer, lebo každý si vec vyrozpráva. Daňou za to môže byť telefonát, v ktorom hovoria naraz, až je pôvodná poznámka to najmenšie, čo zaznelo.',
        },
        step: { en: 'When a call starts to widen, let either name the one thing it was about, and return to that before anything else is added.', sk: 'Keď sa telefonát začne rozrastať, nech ktokoľvek z vás pomenuje tú jednu vec, o ktorú išlo, a vráťte sa k tejto veci skôr, než pribudne čokoľvek iné.' },
        question: { en: 'When a conversation between you starts with one remark, what tends to join it before it ends?', sk: 'Keď sa rozhovor medzi vami začne jednou poznámkou, čo všetko sa doň zvykne pridať, kým sa skončí?' },
    },
    'processing-pace/opposed': {
        title: { en: 'The call, the quiet and the family’s version', sk: 'Telefonát, ticho a rodinná verzia' },
        passage: {
            en: '{p1} tends to work a matter out by talking, and in a family that can mean talking to other relatives. {p0} is more likely to take it away first and answer once it has settled. The gap between the two is where a version of events can form. By the time {p0} has a considered answer, {p1} can already have been over the matter with a cousin or an aunt. A view may have begun to circulate that {p0} was not there to shape.\n\nThe unreturned call can look like a door closing, and the family’s position can look like a decision made without a hearing. Each way of working it out has its use: the early airing that keeps a hurt from setting, and the slower answer that does not reopen it by accident. The difference shows in one thing, whether the considered answer is waited for or overtaken.',
            sk: '{p1} si vec zvyčajne ujasňuje rozprávaním a v rodine to môže znamenať rozhovory s ďalšími príbuznými. {p0} si vec skôr najprv odnesie a odpovie, až keď sa uleží. Práve v tejto medzere sa môže utvoriť rodinná verzia udalostí. Kým má {p0} premyslenú odpoveď, {p1} už môže mať vec prebratú s bratrancom či tetou a po rodine môže kolovať názor, ktorý {p0} už neovplyvní.\n\nNevrátený hovor môže pôsobiť ako zatvorené dvere a postoj rodiny ako rozhodnutie urobené bez vypočutia. Každý z oboch spôsobov má svoj zmysel: skoré vyrozprávanie nedá krivde zakoreniť sa a pomalšia odpoveď krivdu nechtiac znova neotvorí. Rozdiel sa ukáže na jednom: či sa na premyslenú odpoveď počká, alebo ostane predbehnutá.',
        },
        aside: {
            en: 'By the time {p0} has thought a family matter over alone, {p1} may already have talked it through with relatives. The considered answer can then arrive into a view already formed, and the delay can look like absence.',
            sk: 'Kým si {p0} rodinnú záležitosť v tichosti premyslí, {p1} môže mať vec už prebratú s príbuznými. Premyslená odpoveď potom môže prísť k názoru, ktorý je už hotový, a oneskorenie môže pôsobiť ako neprítomnosť.',
        },
        step: { en: 'Agree on a day by which the considered answer will come, and on what may be said to other relatives until it does.', sk: 'Dohodnite si deň, dokedy príde premyslená odpoveď, a čo sa dovtedy smie povedať ostatným príbuzným.' },
        question: { en: 'Who else hears about a family matter before the two of you have talked it through, and what would you like them to hear?', sk: 'Kto ďalší sa o rodinnej veci dozvie skôr, než sa spolu porozprávate, a čo by ste chceli, aby sa títo ľudia dozvedeli?' },
    },
    'processing-pace/opposed:introspective': {
        title: { en: 'A pause that sounds like a ruling', sk: 'Pauza, ktorá znie ako rozsudok' },
        passage: {
            en: 'A pause from the older generation can be taken for a ruling. {first} tends to take a hard moment away and speak once it has settled. Say a visit has been awkward: {second}, who works things out by talking, may want to call that same evening. If the call goes unanswered, no answer yet can read as the answer.\n\nThe call, in turn, can sound like a demand for a reply before there is one, and a reply given under that pressure can be the least considered thing {first} could offer. Between generations the silence can weigh more, since it comes from the older one. A pause that has an end is a consideration; a pause without one can be read as closure, and what separates them can be a single sentence that is easy to leave unsaid.',
            sk: 'Pauzu staršej generácie možno vziať ako rozsudok. {first} si ťažkú chvíľu zvyčajne odnesie a ozve sa, až keď sa vec uleží. Povedzme, že návšteva bola nepríjemná: {second} si veci ujasňuje rozprávaním, a preto môže chcieť volať ešte v ten večer, a ak telefonát ostane bez odpovede, aj „zatiaľ nič“ môže pôsobiť ako odpoveď.\n\nTelefonát zasa môže znieť ako nárok na odpoveď skôr, než nejaká existuje, a odpoveď daná pod takým tlakom môže byť to najmenej premyslené, čo {first} vie ponúknuť. Medzi generáciami môže ticho vážiť viac, lebo prichádza zo strany staršej generácie. Pauza s koncom je ohľaduplnosť, pauza bez konca sa môže vziať ako bodka za celou vecou a rozdiel medzi nimi môže robiť jediná veta, ktorá sa dá ľahko vynechať.',
        },
        aside: {
            en: '{first} may need time before answering, while {second} may want to talk the same evening. From the older generation a pause can sound like a ruling, and from the younger a call can sound like a demand.',
            sk: '{first} môže potrebovať čas, kým odpovie, zatiaľ čo {second} môže chcieť vec prebrať ešte v ten večer. Od staršej generácie môže pauza znieť ako rozsudok a od mladšej zasa telefonát ako nárok.',
        },
        step: { en: 'Let the one who needs time say, when the matter first comes up, on which day an answer will come.', sk: 'Nech ten, kto potrebuje čas, hneď pri otvorení veci povie, v ktorý deň príde odpoveď.' },
        question: { en: 'When a pause turns into silence between you, what would tell the other that the matter is still being held?', sk: 'Keď sa pauza medzi vami zmení na ticho, čo by druhému dalo najavo, že vec ešte nie je uzavretá?' },
    },
    'processing-pace/opposed:outwardly-engaged': {
        title: { en: 'The call that is hard to put off', sk: 'Telefonát, ktorý sa ťažko odkladá' },
        passage: {
            en: 'After a difficult visit {first} may ring that evening to talk it through, and a call from the older generation can be hard to leave unanswered. {second} tends to take things away to think first. So the evening can go two ways: {second} picks up and gives a first reaction before it has formed. Or {second} lets the phone ring and carries the missed call into the next day as a small debt.\n\nEither way, the answer that would have been most useful, the one given after thinking, has not yet been given. The call may come from a wish to clear the air before a hurt sets. The slower answer is no less a reply, and it has a place in the tie once the call is understood to be an opening and not a deadline.',
            sk: 'Po náročnej návšteve môže {first} ešte v ten večer zavolať, aby si to spolu prebrali, a hovor od staršej generácie sa nechá bez odpovede len ťažko. {second} si veci zvyčajne najprv odnáša na rozmyslenie. Večer sa tak môže uberať dvoma smermi: {second} telefón zdvihne a vysloví prvú reakciu skôr, než sa stihne utvoriť, alebo nechá telefón zvoniť a zmeškaný hovor si ponesie do ďalšieho dňa ako malý dlh.\n\nTak či tak zatiaľ nezaznela odpoveď, ktorá by bola najužitočnejšia, tá po rozmyslení. Volanie môže vychádzať z túžby vyčistiť vzduch, skôr než sa krivda zakorení. Pomalšia odpoveď je rovnako odpoveď a vo vzťahu má svoje miesto, keď sa hovor chápe ako pozvanie k rozhovoru, nie ako lehota.',
        },
        aside: {
            en: '{first} may call the same evening to talk a visit through, and {second}, who needs time to think, can find the call hard to leave unanswered. An answer given at once can be thinner than the one the next day would bring.',
            sk: '{first} môže ešte v ten večer zavolať, aby si návštevu prebrali, a hoci {second} potrebuje čas na rozmyslenie, takýto hovor sa ťažko nechá bez odpovede. Odpoveď daná hneď môže byť chudobnejšia než tá, ktorú by priniesol ďalší deň.',
        },
        step: { en: 'Let a short message count as a full reply to the evening call, with the longer answer to follow when it is ready.', sk: 'Nech krátka správa platí ako plnohodnotná odpoveď na večerný hovor a dlhšia odpoveď príde, keď bude hotová.' },
        question: { en: 'What would make it easy to say “not tonight” without it sounding like “not at all”?', sk: 'Čo by uľahčilo povedať „dnes nie“ tak, aby to neznelo ako „vôbec nie“?' },
    },
    'processing-pace/oneSided:introspective': {
        title: { en: 'A pause nobody had to ask for', sk: 'Pauza, o ktorú netreba žiadať' },
        passage: {
            en: 'When a moment turns hard, {lean} is likely to take it away before speaking about it, while {mid} sits somewhere between the two paces. So the pause tends to be given without any conversation about it, and pace is seldom argued over.\n\nThat quiet leaves a gap. How long the pause can last may go unsaid, and waiting without a pull of one’s own can look, from outside, like having nothing to ask. A question left open at the end of a visit can stay open: {mid} may hold it lightly while {lean} can take it for closed. The arrangement works for as long as waiting is not mistaken for the absence of a question.',
            sk: 'Keď príde ťažká chvíľa, {lean} si vec pravdepodobne najprv odnesie na rozmyslenie a prehovorí až potom, kým {mid} stojí niekde medzi oboma tempami. Pauza sa preto obvykle dostane bez jediného slova a spor o tempo býva zriedkavý.\n\nToto ticho necháva medzeru. Ako dlho môže pauza trvať, môže ostať nevyslovené, a čakanie bez vlastnej potreby môže zvonku vyzerať, akoby sa nebolo na čo pýtať. Otázka otvorená na konci návštevy môže otvorená aj ostať: {mid} môže otázku držať len zľahka, zatiaľ čo {lean} môže vec pokladať za uzavretú. Dohoda funguje, kým sa čakanie nepokladá za znak, že niet na čo sa pýtať.',
        },
        aside: {
            en: 'Time with a family matter is something {lean} tends to need, and {mid} leans neither way, so the pause can be granted without a word. How long it may last then goes unsaid.',
            sk: '{lean} zvyčajne potrebuje na rodinnú vec čas a {mid} sa neprikláňa ani na jednu stranu, takže pauza sa môže dať bez slova. Ako dlho smie trvať, potom ostane nevyslovené.',
        },
        step: { en: 'Say aloud, once, how long a pause may last and what happens at its end, so that the one who waits is not left holding the question alone.', sk: 'Povedzte raz nahlas, ako dlho smie pauza trvať a čo bude, keď skončí, aby otázka neostala len na tom, kto čaká.' },
        question: { en: 'What question have you been holding while the other took time, and does the other know it is still there?', sk: 'Akú otázku nosíte v sebe, kým si druhý berie čas, a vie druhý, že tá otázka stále platí?' },
    },
    'processing-pace/oneSided:outwardly-engaged': {
        title: { en: 'An easy person to call', sk: 'Človek, ktorému sa ľahko volá' },
        passage: {
            en: 'Talking a family matter through is how {lean} tends to sort it out, and {mid}, who has no marked preference, can be the one who listens. That can make {mid} easy to call, and easy to over-call. A limit may show late in someone not strongly drawn either way, so a call that began after dinner can fill the evening before anyone says it has gone far enough.\n\nThe tie holds up while “not tonight” is something either can say aloud. It strains when saying it is left to the listener, because a limit stated after a long stretch of listening can sound sharper than it was meant to.',
            sk: '{lean} zvyčajne rieši rodinnú vec rozhovorom a {mid} nemá v tomto vyhranený postoj, takže počúvať môže práve {mid}. Preto sa {mid} môže dať zavolať ľahko, až príliš ľahko. Kto sa výrazne neprikláňa ani k jednému, môže hranicu ukázať neskoro, a tak hovor začatý po večeri môže zaplniť celý večer, kým niekto povie, že už stačí.\n\nVzťah drží, kým „dnes nie“ je veta, ktorú môže nahlas povedať ktokoľvek z nich. Začne sa namáhať, keď to ostáva na tom, kto počúva, lebo hranica vyslovená po dlhom počúvaní môže znieť ostrejšie, než sa myslelo.',
        },
        aside: {
            en: 'A family matter is something {lean} tends to talk through, and {mid} can be the one who listens. A limit on that listening may show late, so a call can run on past the point {mid} would have chosen.',
            sk: '{lean} zvyčajne rozoberá rodinnú vec v rozhovore a počúvať môže {mid}. Hranica takého počúvania sa môže ukázať neskoro, takže hovor môže trvať dlhšie, než {mid} chce.',
        },
        step: { en: 'Agree that either of you can end a long call with a plain “that is enough for tonight”, and that it carries no judgement on the matter.', sk: 'Dohodnite sa, že dlhý hovor môže ktorýkoľvek z vás ukončiť obyčajným „na dnes stačí“ a že to nie je súd nad tým, o čom sa hovorilo.' },
        question: { en: 'At what point in a long call about a family matter would each of you want to stop, and who would say so?', sk: 'V ktorom bode dlhého hovoru o rodinnej veci by každý z vás chcel skončiť a kto by to povedal?' },
    },
    /* ------------------------------------------------------------------ reasoning-style -- */
    'reasoning-style/shared:analytical': {
        title: { en: 'Correct on paper, unsaid in person', sk: 'Správne na papieri, nevyslovené naživo' },
        passage: {
            en: 'Say a shared cost has to be split or a rota agreed for helping a relative: {both} can settle such things on paper, with each entry agreed and little left to memory. That precision protects the tie from the argument that opens with “but I thought we said”.\n\nWhat the paper cannot hold is what the arrangement means to each of them. Neither is inclined to set the feeling beside the facts, so a fair settlement can leave one of the two with something unsaid about it. The accuracy of the figures can make it harder to raise, because there is nothing in them to correct. The arrangement can be right and still leave open a question that no figure answers.',
            sk: 'Povedzme, že treba rozdeliť spoločný výdavok alebo sa dohodnúť, kto kedy pomôže príbuznému: {both} také veci dokážu vybaviť na papieri, každá položka je odsúhlasená a na pamäť sa spolieha málo. Táto presnosť chráni vzťah pred hádkou, ktorá sa začína slovami „ale veď sme sa dohodli, že…“.\n\nPapier však nezachytí, čo dohoda znamená pre každého z nich. Nikto z nich nemá sklon klásť pocit vedľa faktov, takže férové vyrovnanie môže jedného z nich nechať s niečím nevysloveným. Presné čísla to môžu ešte sťažiť, lebo v nich niet čo opraviť. Dohoda môže byť správna a predsa nechať otvorenú otázku, na ktorú nijaké číslo neodpovie.',
        },
        aside: {
            en: 'Practical family business can go smoothly, since {both} tend to keep it straight. What a correct arrangement means to each of them is a separate matter, and nothing in the arrangement gives a place to say it.',
            sk: 'Praktické rodinné veci môžu ísť hladko, lebo {both} si ich zvyčajne držia v poriadku. Čo správna dohoda znamená pre každého z nich, je iná otázka a dohoda sama na to nenecháva miesto.',
        },
        step: { en: 'After the next practical arrangement is agreed, take a moment more for each of you to say how it sits with you.', sk: 'Keď sa dohodne ďalšia praktická vec, vyhraďte si ešte chvíľu, v ktorej každý z vás povie, ako to prežíva.' },
        question: { en: 'Is there an arrangement between you that is correct on paper and still has something unsaid in it?', sk: 'Je medzi vami dohoda, ktorá je na papieri správna, no niečo k tomu zostalo nevyslovené?' },
    },
    'reasoning-style/shared:intuitive': {
        title: { en: 'Two who read the room', sk: 'Spoločný cit pre náladu' },
        passage: {
            en: '{both} tend to read a room faster than the room can say what is in it. Say a remark at a family meal is really about something else: both are likely to pick up the undertone, and may ease it before anyone names it.\n\nThe gift carries its own risk, because each can trust the other’s sense of what was meant, and an impression that two people share begins to feel like a fact. What a relative meant can become what the family takes the relative to have meant, without anyone asking. If a correction comes, it comes against the agreement of two people, which is harder to move than one person’s guess.',
            sk: '{both} zvyčajne vycítia atmosféru v miestnosti skôr, než ktokoľvek stihne povedať, čo sa deje. Povedzme, že poznámka pri rodinnom jedle je v skutočnosti o niečom inom: každý z nich podtón pravdepodobne zachytí a napätie môžu zmierniť skôr, než sa vôbec pomenuje.\n\nTento dar má aj svoje riziko, lebo každý môže veriť úsudku druhého o tom, čo sa myslelo, a dojem, ktorý majú spoločný, začne pôsobiť ako fakt. To, čo príbuzný myslel, sa môže zmeniť na to, čo rodina príbuznému pripisuje, bez toho, aby sa niekto spýtal. Ak príde oprava, príde proti zhode dvoch ľudí, a tú je ťažšie pohnúť než odhad jedného.',
        },
        aside: {
            en: 'The mood of a family gathering is something {both} can pick up quickly. When the two agree on what a remark meant, the impression can pass as the family’s version of events without anyone having asked.',
            sk: 'Náladu rodinného stretnutia {both} dokážu zachytiť rýchlo. Keď sa zhodnú, čo poznámka znamenala, môže ich dojem platiť za rodinnú verziu udalostí, hoci sa nikto nespýtal.',
        },
        step: { en: 'When both of you feel sure what a relative meant, put one plain question to the relative before the impression is repeated to anyone else.', sk: 'Keď sa vám zdá, že viete, čo príbuzný myslel, spýtajte sa príbuzného jednou jasnou otázkou skôr, než dojem zopakujete niekomu ďalšiemu.' },
        question: { en: 'Which remark from a relative might you both have read the same way without checking it?', sk: 'Ktorú poznámku niektorého príbuzného ste si možno vyložili rovnako bez toho, aby ste si to overili?' },
    },
    'reasoning-style/opposed': {
        title: { en: 'The date corrected, the hurt questioned', sk: 'Opravený dátum, spochybnená krivda' },
        passage: {
            en: 'A date corrected in the middle of a family story can be a small act with a large echo. {p0} tends to want to know who said what and when, and may offer the correction as help. {p1} is more likely to read a family matter by its mood and by what came before, and can hear the hurt itself being questioned. From there the talk can turn into an argument about whether it happened, a contest neither can win.\n\nThe two ways of knowing do not compete when they are taken in turn. A record that is straight and a hearing that is generous are what a family conversation about the past needs, and each person here brings one of them. The question is which of the two conversations is taking place at any moment.',
            sk: 'Dátum opravený uprostred rodinného príbehu môže byť malý čin s veľkou ozvenou. {p0} zvyčajne chce vedieť, kto čo povedal a kedy, a opravu môže ponúknuť ako pomoc. {p1} skôr vníma rodinnú vec podľa nálady a podľa toho, čo sa stalo predtým, a môže mať pocit, že sa spochybňuje samotná krivda. Odtiaľ sa rozhovor môže zvrhnúť na hádku o tom, či sa to vôbec stalo, a takú nevyhrá nikto z nich.\n\nTieto dva spôsoby, ako veci poznať, si neprekážajú, keď sa striedajú. Rozhovor o minulosti potrebuje v rodine presný záznam aj ochotu vypočuť a každý z dvojice prináša jedno z toho. Otázka je, ktorý z dvoch rozhovorov sa práve vedie.',
        },
        aside: {
            en: 'A correction offered as help can be heard as doubt, since {p0} tends to go by the facts and {p1} by mood and what came before. The talk can then turn to whether something happened instead of what it was like.',
            sk: 'Oprava ponúknutá ako pomoc sa môže počuť ako pochybnosť, lebo sa {p0} zvyčajne riadi faktmi, {p1} skôr náladou a tým, čo sa stalo predtým. Rozhovor sa potom môže stočiť k tomu, či sa niečo stalo, namiesto toho, aké to bolo.',
        },
        step: { en: 'Name which conversation you are having, the one about what happened or the one about how it felt, and keep them apart for the length of the talk.', sk: 'Pomenujte, ktorý rozhovor vediete, či ten o tom, čo sa stalo, alebo ten o tom, aké to bolo, a kým hovoríte, držte ich od seba.' },
        question: { en: 'When you recall the same family occasion differently, which part do you each most want the other to take seriously?', sk: 'Keď si tú istú rodinnú udalosť pamätáte inak, na čom z toho každému z vás najviac záleží, aby to druhý vzal vážne?' },
    },
    'reasoning-style/opposed:analytical': {
        title: { en: 'Asked to prove a sense of things', sk: 'Tušenie, ktoré sa má preukázať' },
        passage: {
            en: '{first} tends to want a matter set out plainly: what happened, on which day, with what result. {second} may arrive with a sense of it instead, a change in the air during a visit, and nothing to point to. Between generations the request for specifics can carry extra weight, since it is put by the older of the two. It can sound like being asked to prove a perception before it is allowed to count.\n\nA perception that cannot be proved is easy to withdraw. {second} may then say less, and the conversation can be left with the facts and without the matter they were meant to explain.',
            sk: '{first} zvyčajne chce mať vec jasne vyloženú: čo sa stalo, v ktorý deň a s akým výsledkom. {second} môže namiesto toho prísť s pocitom z veci, so zmenou vo vzduchu počas návštevy, a nemať na čo ukázať. Medzi generáciami môže mať žiadosť o konkrétnosti vlastnú váhu, lebo prichádza zo strany staršej generácie, a môže znieť, akoby sa postreh musel najprv preukázať, aby sa vôbec rátal.\n\nPostreh, ktorý sa nedá preukázať, sa ľahko vezme späť. {second} potom môže hovoriť menej a v rozhovore môžu ostať fakty bez veci, ktorú mali vysvetliť.',
        },
        aside: {
            en: 'Facts are what {first} tends to want, while {second} may arrive with a sense of things and nothing to point to. Asked for proof, a perception is easily withdrawn, and the facts that remain no longer cover the matter.',
            sk: '{first} zvyčajne chce fakty, kým {second} môže prísť s tušením a bez toho, na čo by sa dalo ukázať. Keď treba postreh preukázať, ľahko sa stiahne a fakty, ktoré ostanú, už vec nepokrývajú.',
        },
        step: { en: 'Let what was noticed be described first, with questions about dates and detail held back until it has been heard.', sk: 'Nech sa najprv opíše, čo sa zbadalo, a otázky na dátumy a podrobnosti nech počkajú, kým sa to vypočuje.' },
        question: { en: 'What have you each noticed in the family that you could not yet support with a date or a fact?', sk: 'Čo ste si v rodine každý všimli a zatiaľ to neviete podoprieť dátumom ani faktom?' },
    },
    'reasoning-style/opposed:intuitive': {
        title: { en: 'A knowing without dates', sk: 'Vedieť to bez dátumov' },
        passage: {
            en: '{first} may say that something is off in the family and mean it as a plain statement of how things are. {second} is likely to ask what exactly, since when, and what could be done. The questions can be a way of taking the concern seriously, since asking is how {second} tends to act on one. To a person who has noticed something that comes without dates, the questions can sound like a request to justify a knowing.\n\nBoth may want the same outcome, something done. Whether the hunch ever reaches a date can depend on what is asked first: what was noticed, or what can be proved.',
            sk: '{first} môže povedať, že v rodine niečo nie je v poriadku, a myslieť to ako jednoduché konštatovanie, ako veci stoja. {second} sa pravdepodobne spýta, čo presne, od kedy a čo sa s tým dá robiť. Otázky môžu byť spôsobom, ako obavu vziať vážne, lebo {second} na obavu zvyčajne reaguje práve pýtaním sa. Tomu, kto niečo vycíti a nemá k tomu dátumy, však môžu znieť ako výzva obhájiť, že to vie.\n\nKaždý z nich môže chcieť to isté: aby sa niečo urobilo. Či sa tušenie niekedy dopracuje k dátumu, môže závisieť od toho, na čo sa človek spýta najprv: čo sa zbadalo, alebo čo sa dá preukázať.',
        },
        aside: {
            en: '{first} may sense that something is off in the family and say so without dates. {second} can ask for specifics as a way of taking it seriously, and the question can sound like a request to justify a knowing.',
            sk: '{first} môže cítiť, že v rodine niečo nie je v poriadku, a povedať to bez dátumov. {second} sa môže pýtať na konkrétnosti ako na spôsob, ako to brať vážne, a otázka môže znieť ako výzva obhájiť, že to človek vie.',
        },
        step: { en: 'When a worry is raised, ask what has been noticed before asking what is known, and write down the specifics together afterwards.', sk: 'Keď niekto vysloví obavu, opýtajte sa najprv, čo sa zbadalo, a až potom, čo sa vie; podrobnosti si potom zapíšte spolu.' },
        question: { en: 'When a hunch is put to the other as a question, what does it sound like to the one who raised it?', sk: 'Keď sa tušenie predloží druhému ako otázka, ako to znie tomu, kto tušenie vyslovil?' },
    },
    'reasoning-style/oneSided:analytical': {
        title: { en: 'The one who translates', sk: 'Ten, kto prekladá' },
        passage: {
            en: 'Without a strong pull toward facts or feeling, {mid} may end up moving between the two, while {lean} tends to keep to the facts. In a family conversation {mid} can become the translator: turning a figure into what it means to a relative, and a relative’s hurt into a question {lean} can answer. It can work quietly enough that nobody remarks on it.\n\nThe cost is that the translation lives in one person. When {mid} is out of the room, the talk can split back into facts and feeling, and the two sides can seem to disagree when they have only lost their interpreter. A tie that depends on a translator holds until the translator is tired.',
            sk: 'Keďže sa {mid} výrazne neprikláňa ani k faktom, ani k pocitom, môže sa ocitnúť medzi nimi, zatiaľ čo {lean} sa zvyčajne drží faktov. V rodinnom rozhovore môže {mid} prevziať úlohu prekladateľa: číslo preložiť na to, čo znamená pre príbuzného, a krivdu príbuzného na otázku, na ktorú vie {lean} odpovedať. Môže to fungovať tak nenápadne, že si to nikto nevšimne.\n\nHáčik je v tom, že preklad žije v jednom človeku. Keď {mid} z miestnosti odíde, rozhovor sa môže rozpadnúť späť na fakty a pocity a môže sa zdať, že sa dve strany nezhodnú, hoci len prišli o tlmočníka. Vzťah, ktorý stojí na prekladateľovi, vydrží, kým sa prekladateľ neunaví.',
        },
        aside: {
            en: 'In a family conversation where {lean} keeps to the facts, {mid}, leaning neither way, can become the one who translates between facts and feeling. The work is useful and invisible, and it stops when {mid} is not at the table.',
            sk: 'V rodinnom rozhovore, v ktorom sa {lean} drží faktov, môže {mid} prekladať medzi faktmi a pocitmi, keďže sa neprikláňa ani na jednu stranu. Je to užitočná a nenápadná práca a skončí, keď {mid} nie je nablízku.',
        },
        step: { en: 'Now and then let the one who keeps to the facts say what a figure means, and the other say what it costs.', sk: 'Občas nech ten, kto sa drží faktov, povie, čo číslo znamená, a druhý, čo to stojí.' },
        question: { en: 'Where in a family conversation does one of you end up explaining the other to everyone else?', sk: 'V ktorých chvíľach rodinného rozhovoru jeden z vás vysvetľuje druhého všetkým ostatným?' },
    },
    'reasoning-style/oneSided:intuitive': {
        title: { en: 'A hunch with a question beside it', sk: 'Tušenie s otázkou po boku' },
        passage: {
            en: 'When {lean} says what a visit was really about, {mid} can take the sense seriously and still ask what prompted it. That question stands between an impression and the family’s account of events. Asked with interest, it can sharpen the impression: {lean} can find the words for what was noticed, and {mid} learns what to listen for.\n\nLeft out, it leaves a gap. A view about a relative that nobody said aloud can begin to travel as the way things are. The check holds only while it arrives as interest in the hunch, since a question that sounds like a test teaches the hunch to stay unspoken.',
            sk: 'Keď {lean} povie, o čom návšteva naozaj bola, {mid} dokáže vziať ten pocit vážne a predsa sa opýtať, čo ten pocit spustilo. Táto otázka stojí medzi dojmom a rodinnou verziou udalostí. Položená so záujmom môže dojem spresniť: {lean} môže nájsť slová pre to, čo sa zbadalo, a {mid} sa dozvie, čomu načúvať.\n\nBez tejto otázky vzniká medzera. Názor na príbuzného, ktorý nikto nevyslovil nahlas, sa môže začať šíriť ako samozrejmosť. Kontrola vydrží len dovtedy, kým prichádza ako záujem o tušenie, lebo otázka, ktorá znie ako skúška, naučí tušenie mlčať.',
        },
        aside: {
            en: 'Say {lean} has a hunch about a family matter: {mid} may take it seriously and still ask what prompted it. That question can keep an impression from settling into the family’s account.',
            sk: 'Povedzme, že {lean} má pri rodinnej veci tušenie: {mid} môže tušenie vziať vážne a predsa sa spýtať, čo za tým je. Taká otázka môže zabrániť tomu, aby sa dojem usadil v rodinnej verzii udalostí.',
        },
        step: { en: 'Ask what prompted a hunch in the tone of someone who wants to know, and say first what in it rings true.', sk: 'Pýtajte sa, čo tušenie spustilo, tónom človeka, ktorý to naozaj chce vedieť, a najprv povedzte, čo v tom znie pravdivo.' },
        question: { en: 'What might one of you sense at a family gathering that nobody says aloud, and what would the other want to ask about it?', sk: 'Čo môže jeden z vás vycítiť na rodinnom stretnutí, hoci to nikto nepovie nahlas, a na čo by sa k tomu chcel spýtať druhý?' },
    },
    /* --------------------------------------------------------------- closeness-and-room -- */
    'closeness-and-room/shared:independent': {
        title: { en: 'Contact that is chosen', sk: 'Kontakt z chuti, nie z povinnosti' },
        passage: {
            en: '{both} tend to keep in touch because they want to, not because it is owed, each leaving the other to decide what to share and when. News can be told once it is settled, whether a move, a new job or a result from the doctor. Nothing in the tie leans on anyone.\n\nThe weak point sits in the same habit. A stretch of quiet is decided by neither. It can be taken for a sign that nothing is needed, so a worry that was small at the start can reach the other only once it has become a crisis. A tie without pressure can also be a tie without a question.',
            sk: '{both} sa zvyčajne ozývajú preto, že chcú, nie preto, že musia, a každý nechá na druhom, čo povie a kedy. Novinky sa môžu povedať, až keď sú hotové, či už ide o sťahovanie, novú prácu, alebo výsledok od lekára. Nič na nikoho netlačí.\n\nSlabé miesto sa skrýva v tom istom zvyku. O dlhšom tichu nerozhoduje nikto z nich. Dá sa vziať za znak, že nič netreba, a tak sa starosť, ktorá bola na začiatku malá, môže dostať k druhému až ako kríza. Vzťah bez tlaku môže byť aj vzťahom bez otázok.',
        },
        aside: {
            en: 'Room is something {both} tend to leave each other, and pressure stays out of the tie. A worry can then go unmentioned until it has grown, since a long quiet is easily taken for a sign that nothing is needed.',
            sk: 'Priestor si {both} zvyčajne nechávajú a tlak ostáva mimo vzťahu. Starosť potom môže ostať nevyslovená, kým nenarastie, lebo dlhé ticho sa ľahko berie ako znak, že nič netreba.',
        },
        step: { en: 'Choose one regular, light point of contact that carries no expectation of news, so that the quiet is broken before anything has to be reported.', sk: 'Vyberte si jednu pravidelnú, ľahkú príležitosť na kontakt, pri ktorej sa nečakajú novinky, aby sa ticho prerušilo skôr, než bude čo hlásiť.' },
        question: { en: 'What would let each of you know the other is all right without either having to ask?', sk: 'Čo by každému z vás dalo vedieť, že druhý je v poriadku, bez toho, aby sa niekto musel pýtať?' },
    },
    'closeness-and-room/shared:collaborative': {
        title: { en: 'Everything passes between them', sk: 'Všetko sa preberá spolu' },
        passage: {
            en: '{both} are likely to keep each other inside their ordinary days, with calls, errands and decisions talked over before they are made. When something serious happens, the closeness is already in place. Help tends to arrive before it is asked for.\n\nThe cost is that the edges can go unguarded. Some things sit at the edges: a choice that belongs to one of them, a worry not yet ready to be shared, an arrangement still being thought about. None has a natural place in a tie where everything passes between the two. The wish for a corner of one’s own can then sound, when it is voiced, like a move away from the tie itself.',
            sk: '{both} sú si pravdepodobne navzájom súčasťou všedných dní: telefonáty, vybavovanie aj rozhodnutia sa preberajú ešte pred tým, než sa urobia, takže keď sa stane niečo vážne, blízkosť už je na mieste. Pomoc zvykne prísť skôr, než niekto požiada.\n\nCenou je, že hranica medzi spoločným a vlastným môže ostať bez povšimnutia. Voľba, ktorá patrí jednému z nich, starosť, ktorá ešte nie je zrelá na zdieľanie, dohoda, o ktorej sa ešte len uvažuje: nič z toho nemá prirodzené miesto vo vzťahu, kde sa všetko preberá spolu. Túžba po vlastnom kúte potom, keď zaznie, môže znieť ako krok preč od samotného vzťahu.',
        },
        aside: {
            en: 'In the ordinary run of things {both} tend to keep each other close. With the edges unguarded, a private choice has no easy place, and asking for one can sound like leaving.',
            sk: 'V bežných veciach si {both} zvyčajne držia blízkosť. Keď si nikto nevšíma, kde sa spoločné končí, súkromná voľba nemá ľahké miesto a žiadosť o kúsok súkromia môže znieť ako odchod.',
        },
        step: { en: 'Agree on one kind of matter that each may decide alone and tell afterwards, and treat it as part of the closeness and not a gap in it.', sk: 'Dohodnite sa na jednom druhu vecí, o ktorých môže každý rozhodnúť sám a povedať to až potom, a berte to ako súčasť blízkosti, nie ako trhlinu v blízkosti.' },
        question: { en: 'Which decision of your own might you want to keep out of the shared conversation, and how would the other hear that?', sk: 'Ktoré vlastné rozhodnutie by ste možno chceli nechať mimo spoločného rozhovoru a ako by to druhý prijal?' },
    },
    'closeness-and-room/opposed': {
        title: { en: 'The same news, told at two moments', sk: 'Tá istá novinka, povedaná skoro a neskoro' },
        passage: {
            en: 'The same piece of news can mean two things here. {p0} tends to share it once it is settled, as a courtesy: this is what has been decided, nothing to worry about. {p1} may have wanted to hear it while it was still being weighed, and on hearing it settled can find that the weighing happened without the family. The follow-up questions that come next can sound like an attempt to reopen a choice already made, and {p0} may tell the next piece of news later still.\n\nThese are ordinary things, a boundary on one side and a wish for company on the other. They touch at one point, the moment news is told, and that is where the difference is easiest to feel and hardest to name.',
            sk: 'Tá istá správa tu môže znamenať dve rôzne veci. {p0} novinku zvyčajne povie, až keď je hotová, ako slušnosť: toto sa rozhodlo, netreba sa strachovať. {p1} môže chcieť novinku počuť, kým sa ešte zvažuje, a keď príde hotová, môže zistiť, že sa zvažovalo bez rodiny. Otázky, ktoré potom nasledujú, môžu znieť ako pokus otvoriť už urobené rozhodnutie a {p0} môže ďalšiu novinku povedať ešte neskôr.\n\nIde o celkom obyčajné veci: na jednej strane o hranicu, na druhej o túžbu po spoločnosti. Stretnú sa v jednom bode, vo chvíli, keď sa novinka hovorí, a práve tam sa rozdiel cíti najľahšie a pomenúva najťažšie.',
        },
        aside: {
            en: 'News that is settled is what {p0} tends to share, while {p1} may want to hear it as it forms. The same sentence can be a courtesy in one telling and an exclusion in the other.',
            sk: '{p0} zvyčajne hovorí novinky, až keď sú hotové, kým {p1} ich môže chcieť počuť už vtedy, keď sa len rodia. Tá istá veta môže jednému znieť ako slušnosť a druhému ako vylúčenie.',
        },
        step: { en: 'Agree which news travels early and which waits until it is settled, so that the timing is understood and not read as a message.', sk: 'Dohodnite sa, ktoré novinky pôjdu von skoro a ktoré počkajú, kým budú hotové, aby sa o načasovaní vedelo a nečítalo sa ako odkaz.' },
        question: { en: 'Which news of yours would the other have liked to hear sooner, and which would you rather keep until it was settled?', sk: 'Ktorú vašu novinku by druhý rád počul skôr a ktorú by ste radšej nechali, kým bude hotová?' },
    },
    'closeness-and-room/opposed:independent': {
        title: { en: 'A line around one’s own affairs', sk: 'Čiara okolo vlastných vecí' },
        passage: {
            en: '{first} may keep a decision about health or money private until it is made, while {second} may want to be consulted and counted in. When the subject is the older generation’s own affairs, the two needs can meet at their sharpest. An offer of help, which can be how {second} shows closeness, can sound to the other like a doubt that things are in hand.\n\nEach step toward can be taken as a step in, and each step back as a closing. The line {first} keeps may be less a statement about the other than a way of still being the one who decides. The help {second} offers may be a place alongside, not a hand on the wheel. Until each is heard in that way, the offer and the refusal can go round, each making the other likelier.',
            sk: '{first} si môže rozhodnutie o zdraví či peniazoch nechať pre seba, kým nie je urobené, zatiaľ čo {second} môže chcieť byť pri tom a radiť sa. Keď ide o vlastné záležitosti staršej generácie, tieto dve potreby môžu naraziť naplno. Ponuka pomoci, ktorou {second} môže dávať najavo blízkosť, môže druhému znieť ako pochybnosť, či veci zvláda.\n\nKaždý krok k druhému sa môže vziať ako vstup na cudzie územie a každý krok späť ako zatvorenie dverí. Čiara, ktorú {first} drží, nemusí byť výrokom o druhom, ale skôr spôsobom, ako si ponechať rozhodovanie; pomoc, ktorú {second} ponúka, môže byť miestom po boku, nie snahou prevziať riadenie. Kým sa nepočúvajú takto, môžu sa ponuka a odmietnutie točiť dokola a jedno vyvoláva druhé.',
        },
        aside: {
            en: '{first} may keep a clear line around personal decisions, while {second} may want to be part of them. An offer of help can then sound like doubt, and a refusal like a closed door.',
            sk: '{first} si môže okolo osobných rozhodnutí držať jasnú čiaru, kým {second} môže chcieť byť pri nich. Ponuka pomoci potom môže znieť ako pochybnosť a odmietnutie ako zatvorené dvere.',
        },
        step: { en: 'Agree which of the older generation’s decisions will be told early, and which will be told once they are made.', sk: 'Dohodnite sa, ktoré rozhodnutia staršej generácie sa budú oznamovať vopred a ktoré až po tom, ako sa urobia.' },
        question: { en: 'Which decisions would the older of you like to make alone, and which would be easier with the other’s view?', sk: 'Ktoré rozhodnutia si chce staršia strana robiť sama a pri ktorých by pomohol pohľad druhej strany?' },
    },
    'closeness-and-room/opposed:collaborative': {
        title: { en: 'A question that sounds like a check', sk: 'Otázka, ktorá znie ako kontrola' },
        passage: {
            en: 'A question about plans is the smallest unit of this difference. {first} may ask how a move is going, when the next visit is, what was decided about a job. Asked in that spirit, it is a way of being part of a life. {second} tends to keep a clear line around such decisions, and the same question can sound like a request for permission.\n\nA short answer can follow, from which {first} learns less than before, and the next question can be longer. The questions that were meant as company can become, by repetition, the thing the answers are shortened to avoid.',
            sk: 'Otázka na plány je tento rozdiel v malom. {first} sa môže pýtať, ako ide sťahovanie, kedy bude ďalšia návšteva, čo sa rozhodlo o práci. Takto kladená otázka je spôsobom, ako byť súčasťou života. {second} si okolo takých rozhodnutí zvyčajne drží jasnú čiaru a tá istá otázka môže znieť ako žiadosť o dovolenie.\n\nMôže nasledovať krátka odpoveď, z ktorej sa {first} dozvie menej než predtým, a ďalšia otázka potom môže byť dlhšia. Otázky, ktoré mali byť spoločnosťou, sa opakovaním môžu zmeniť na to, čomu sa odpovede skracovaním snažia vyhnúť.',
        },
        aside: {
            en: 'Asking about plans can be how {first} stays close, while {second} tends to tell things once they are settled. The question can sound like a request for permission, and shorter answers can prompt longer questions.',
            sk: 'Pýtať sa na plány môže byť spôsob, akým {first} ostáva nablízku, zatiaľ čo {second} zvyčajne hovorí o veciach, až keď sú hotové. Otázka môže znieť ako žiadosť o dovolenie a kratšie odpovede môžu vyvolať dlhšie otázky.',
        },
        step: { en: 'Agree on one regular moment when plans are shared in full, so that the questions in between do not have to carry all of the closeness.', sk: 'Dohodnite si jednu pravidelnú chvíľu, keď sa plány povedia celé, aby otázky medzi tým nemuseli niesť celú blízkosť.' },
        question: { en: 'What would the younger of you like to be asked, and what would the older like to be told, so that both feel in touch?', sk: 'Na čo by sa mladšia strana rada nechala pýtať a čo by staršia rada počula, aby ste mali pocit, že o sebe viete?' },
    },
    'closeness-and-room/oneSided:independent': {
        title: { en: 'Room for one, ease for the other', sk: 'Priestor na jednej strane, ľahkosť na druhej' },
        passage: {
            en: 'The contact between the two can settle at whatever {lean} offers. {lean} tends to know how much room is needed; {mid} shows no strong pull either way, and so claims no particular amount. What results can be a tie in which nobody asks for anything: a call that is not made is not missed, and a visit nobody proposes is not noticed as absent.\n\nIt can look like ease, and mostly it may be. It is also a tie in which one person’s need for room can become the measure of the whole, while whatever {mid} would choose, if asked, has no occasion to be said.',
            sk: 'Kontakt medzi nimi sa môže ustáliť na tom, čo ponúka {lean}. {lean} zvyčajne vie, koľko priestoru potrebuje; {mid} nemá výrazný sklon ani jedným smerom, a preto si nijakú mieru nenárokuje. Výsledkom môže byť vzťah, v ktorom nikto o nič nežiada: telefonát, ktorý nepríde, nikomu nechýba, a návštevu, ktorú nikto nenavrhne, nikto nepostráda.\n\nMôže to byť ľahkosť a väčšinou to tak možno aj je. Je to však aj vzťah, v ktorom sa potreba priestoru jedného môže stať mierou pre celok, kým to, čo chce {mid}, nemá kedy zaznieť, pokiaľ sa nikto nespýta.',
        },
        aside: {
            en: 'How much room is needed is something {lean} tends to know, and {mid} has no strong pull either way. The closeness can then be set by one need alone, and what {mid} would want may go unsaid.',
            sk: 'Koľko priestoru treba, {lean} zvyčajne vie, kým {mid} nemá výrazný sklon ani jedným smerom. Miera blízkosti sa tak môže riadiť jedinou potrebou a to, čo chce {mid}, môže ostať nevyslovené.',
        },
        step: { en: 'Let the one with no strong pull say what contact would actually suit, so the tie is not left to the other’s need for room alone.', sk: 'Nech ten z vás, kto nemá vyhranenú potrebu, povie, aký kontakt by naozaj vyhovoval, aby sa vzťah neriadil len potrebou priestoru druhého.' },
        question: { en: 'How much contact would each of you choose, if neither had to guess?', sk: 'Koľko kontaktu by každému z vás vyhovovalo, keby nikto nemusel hádať?' },
    },
    'closeness-and-room/oneSided:collaborative': {
        title: { en: 'A yes so easy that no has weight', sk: 'Áno také ľahké, že nie má váhu' },
        passage: {
            en: 'Being consulted, told early and counted in is what {lean} tends to want, and {mid}, without a firm leaning, can make room for that. The default in this tie can become yes: yes to the call, to the visit, to the opinion. A default of yes makes every no stand out.\n\nWhen {mid} wants one matter kept private, the request can land as a rare refusal, and the rarer it is, the more it can seem to mean. The ease of the yes is what gives the no its weight. A private matter named early is an ordinary fact of the tie; named late, it is a surprise.',
            sk: '{lean} sa zvyčajne chce radiť, dozvedieť sa novinky včas a byť pri veciach, a keďže {mid} nemá pevný sklon ani jedným smerom, vie na to urobiť miesto. Predvolenou odpoveďou v tomto vzťahu sa tak môže stať áno: áno telefonátu, návšteve, názoru. Pri takom pravidelnom áno je každé nie nápadné.\n\nKeď {mid} chce nechať jednu vec súkromnú, môže to dopadnúť ako vzácne odmietnutie a čím je zriedkavejšie, tým viac sa zdá znamenať. Ľahkosť áno dodáva nie váhu. Súkromná vec pomenovaná včas je obyčajná súčasť vzťahu; pomenovaná neskoro je prekvapenie.',
        },
        aside: {
            en: 'Say {lean} wants to be close and involved and {mid} can make room for it: the default can become yes. A single no, for a matter kept private, can then carry more weight than it was meant to.',
            sk: 'Povedzme, že {lean} chce byť blízko a pri veciach a {mid} na to vie urobiť miesto: predvolenou odpoveďou sa potom môže stať áno. Jediné nie kvôli veci ponechanej v súkromí môže mať väčšiu váhu, než malo mať.',
        },
        step: { en: 'Name, before it is needed, one or two matters that are simply the other’s own, so that keeping them private is not news.', sk: 'Pomenujte ešte predtým, než to bude treba, jednu či dve veci, ktoré sú jednoducho druhého, aby ich ponechanie v súkromí nebolo novinkou.' },
        question: { en: 'What would it be like to say “this one is mine” to the other, and what would you want said back?', sk: 'Aké by bolo povedať druhému „toto je moje“ a čo by ste chceli počuť v odpovedi?' },
    },
    /* ---------------------------------------------------------- structure-and-flexibility -- */
    'structure-and-flexibility/shared:structured': {
        title: { en: 'Plans that are promises', sk: 'Plány, ktoré platia ako sľuby' },
        passage: {
            en: 'A Sunday call, a date for the holidays, a birthday visit: {both} are likely to keep such plans as promises, and in a family that is a quiet kind of reliability. The tie can have a rhythm both can count on, and little time is spent arranging.\n\nThe arrangements can also stiffen. Life can ask for a revision: a relative who can no longer travel, or a new commitment with its own calendar. Neither may then have much practice at changing a plan except by breaking it. A revised date can be taken for a breach. The firm schedule that carried the tie can also make its first amendment feel like an event.',
            sk: 'Nedeľný telefonát, termín sviatkov, narodeninová návšteva: {both} také plány pravdepodobne berú ako sľuby a v rodine je to tichý druh spoľahlivosti. Vzťah môže mať rytmus, na ktorý sa dá spoľahnúť, a na dohadovanie netreba veľa času.\n\nDohody však môžu aj stuhnúť. Keď život žiada zmenu, napríklad keď príbuzný už nevládze cestovať alebo pribudne nový záväzok s vlastným kalendárom, nikto z nich nemusí mať veľa skúseností so zmenou plánu inak než zrušením. Posunutý termín sa môže vziať ako porušenie. Pevný rozvrh, ktorý vzťah niesol, môže spôsobiť aj to, že prvá zmena pôsobí ako udalosť.',
        },
        aside: {
            en: 'Visits, calls and birthdays tend to happen as arranged when {both} keep plans as promises. A change can then feel less like a revision than like a breach.',
            sk: 'Návštevy, telefonáty a narodeniny sa zvyčajne konajú tak, ako sa dohodlo, keď {both} berú plány ako sľuby. Zmena potom môže pôsobiť skôr ako porušenie než ako úprava.',
        },
        step: { en: 'Agree how a date may be changed, with how much notice and in whose words, before the first change is needed.', sk: 'Dohodnite sa ešte pred prvou zmenou, ako sa termín smie zmeniť, s akým predstihom a akými slovami.' },
        question: { en: 'Which arrangement between you would be hardest to change, and what would make changing it feel like a revision rather than a breach?', sk: 'Ktorá dohoda medzi vami by sa menila najťažšie a čo by spôsobilo, že by zmena pôsobila ako úprava, nie ako porušenie?' },
    },
    'structure-and-flexibility/shared:adaptable': {
        title: { en: 'Nothing owed, little fixed', sk: 'Nikto nič nedlží, málo je pevné' },
        passage: {
            en: 'No Sunday call, no set week for the holidays: {both} tend to meet when it suits, and they seldom quarrel about dates. Nothing is owed and nothing is missed, so contact carries little sense of duty. A visit that falls through is nobody’s fault when no date was set.\n\nThat is also how contact can thin. Each may leave the next meeting open, expecting a date to come up, and with no fixed point to be missed there is nothing against which a gap can be measured. The tie rests on the intention to meet, and an intention does not show when it has begun to slip.',
            sk: 'Žiadny nedeľný telefonát, žiadny určený týždeň na sviatky: {both} sa zvyčajne stretnú, keď sa to hodí, a o termíny sa hádajú zriedka. Nikto nikomu nič nedlží a nič nechýba, takže z kontaktu necítiť povinnosť. Keď sa návšteva neuskutoční, nie je to ničia vina, lebo termín nikto nestanovil.\n\nTak sa však kontakt môže aj rozriediť. Každý môže nechať ďalšie stretnutie otvorené v domnienke, že sa termín nejako objaví, a keď niet pevného bodu, ktorý by sa dal zmeškať, nie je podľa čoho merať, aká veľká je medzera. Vzťah stojí na úmysle stretnúť sa a na úmysle nie je vidieť, že sa začal strácať.',
        },
        aside: {
            en: 'Dates are unlikely to cause a quarrel when {both} arrange things as they come. With no fixed point to miss, contact can thin out without anyone having decided it should.',
            sk: 'Termíny sú zriedka dôvodom na hádku, keď si {both} zariaďujú veci, ako prídu. Keď niet pevného bodu, ktorý by sa dal zmeškať, môže kontakt rednúť, hoci to nikto nerozhodol.',
        },
        step: { en: 'Pick one fixed point in the year, a date or an occasion, and keep the rest as open as it is now.', sk: 'Vyberte si jeden pevný bod v roku, dátum alebo príležitosť, a zvyšok nechajte taký otvorený, aký je teraz.' },
        question: { en: 'What would change in a meeting between you if it had a date set ahead, rather than simply happening?', sk: 'Čo by sa na vašom stretnutí zmenilo, keby malo termín určený vopred a neprišlo len tak?' },
    },
    'structure-and-flexibility/opposed': {
        title: { en: 'Let’s see, and the day kept free', sk: 'Uvidíme a deň, čo ostal voľný' },
        passage: {
            en: '“Let’s see” is a complete answer for one of the two and an unfinished one for the other. {p1} tends to keep the weekend open to whatever arrives. {p0} may arrange a day around a visit and take “let’s see” as being left waiting. Then {p0} may ask again, the second ask can sound like a demand to commit, and {p1} may answer more loosely, to keep some room.\n\nEach can then see the other as the source of the trouble, one as stiff and one as unreliable. Behind it are two real things, a day kept free and a week left open. What decides it is whether a visit carries a few fixed points and some slack, and whether the two have said which is which.',
            sk: '„Uvidíme“ je pre jedného z dvojice úplná odpoveď a pre druhého nedokončená. {p1} zvyčajne nechá víkend otvorený tomu, čo príde. {p0} si môže okolo návštevy zariadiť deň a „uvidíme“ brať ako čakanie bez odpovede. Potom sa {p0} môže spýtať znova, druhá otázka môže znieť ako tlak na záväzok a {p1} môže odpovedať ešte voľnejšie, aby priestor ostal.\n\nKaždý potom môže hľadať príčinu ťažkostí v druhom: jeden môže pôsobiť strnulo, druhý nespoľahlivo. Za tým sú dve skutočné veci: deň, ktorý ostal voľný, a týždeň, ktorý ostal otvorený. Rozhoduje, či má návšteva pár pevných bodov a trochu voľnosti a či si povedali, ktoré sú ktoré.',
        },
        aside: {
            en: 'When {p1} answers “let’s see”, the visit stays open, while {p0} can be left with a day hanging. The same answer can be complete for one and a hold for the other.',
            sk: 'Keď {p1} odpovie „uvidíme“, návšteva ostáva otvorená, kým {p0} môže ostať s dňom, ktorý visí vo vzduchu. Tá istá odpoveď môže byť pre jedného úplná a pre druhého odkladom.',
        },
        step: { en: 'Agree which one or two points in a visit are fixed, and leave the rest open on purpose.', sk: 'Dohodnite sa na jednom či dvoch pevných bodoch návštevy a zvyšok nechajte zámerne otvorený.' },
        question: { en: 'For which occasions does a fixed date matter to one of you, and for which is leaving it open a kindness?', sk: 'Pri ktorých príležitostiach záleží jednému z vás na pevnom termíne a pri ktorých je láskavejšie nechať to otvorené?' },
    },
    'structure-and-flexibility/opposed:structured': {
        title: { en: 'The calendar that belongs to one', sk: 'Kalendár, ktorý patrí jednému' },
        passage: {
            en: 'Keeping the family calendar is something {first} tends to take on: the Sunday call, the date for the holidays, the visit agreed well ahead. {second} may live more loosely, and a changed date or a late arrival, ordinary in that way of living, can look like a small breach of something promised. {second} may not expect the weight it carries.\n\nWhen the dates rest with one person, the question of whether they are promises or suggestions can stay unasked. What reads as a breach on one side may be only a rescheduling on the other, and neither may have said which it is.',
            sk: '{first} zvyčajne drží rodinný kalendár: nedeľný telefonát, termín sviatkov, návštevu dohodnutú dávno vopred. {second} môže žiť voľnejšie a zmenený termín či neskorý príchod, pre taký spôsob života bežný, môže vyzerať ako malé porušenie niečoho sľúbeného, pričom {second} možno nečaká, akú váhu to má.\n\nKeď termíny ostávajú na jednom človeku, otázka, či sú to sľuby, alebo návrhy, môže ostať nepoložená. To, čo na jednej strane pôsobí ako porušenie, môže byť na druhej len presunutie, a nahlas možno ešte nezaznelo, ktoré z toho to je.',
        },
        aside: {
            en: 'The Sunday call, the holidays, the visit agreed ahead: these are dates {first} tends to keep. When {second} changes a plan, it can look like a breach of a promise and be meant as a rescheduling.',
            sk: '{first} zvyčajne drží termíny: nedeľný telefonát, sviatky, návštevu dohodnutú vopred. Keď {second} plán zmení, môže to vyzerať ako porušenie sľubu, hoci je to myslené ako presunutie.',
        },
        step: { en: 'Say aloud which dates are promises and which are suggestions, so that a change can be told as one or the other.', sk: 'Povedzte nahlas, ktoré termíny sú sľuby a ktoré návrhy, aby sa zmena dala oznámiť ako jedno či druhé.' },
        question: { en: 'Which of the family’s dates feel like promises to the older of you, and which are only suggestions to the younger?', sk: 'Ktoré rodinné termíny sú pre staršiu stranu sľubmi a ktoré sú pre mladšiu len návrhmi?' },
    },
    'structure-and-flexibility/opposed:adaptable': {
        title: { en: 'An open door with no date on it', sk: 'Otvorené dvere bez dátumu' },
        passage: {
            en: '“Come whenever you like” is a generous sentence, and {first} can mean it as the whole invitation. {second} tends to plan around dates and may not be able to book a journey or free a day with it. So {second} may end up proposing the days, and {first} may say yes or let’s see. The work of arranging can pass to the younger one visit by visit, without anyone having assigned it.\n\nThe door stays open; what is missing is a fixed point to walk toward. Openness meant as welcome can become, in practice, what makes the visit hard to arrange.',
            sk: '„Príď, kedy chceš“ je veľkorysá veta, ktorú {first} môže myslieť ako celé pozvanie. {second} zvyčajne plánuje podľa dátumov a s takou vetou si nemusí vedieť zarezervovať cestu ani uvoľniť deň. Dni tak môže nakoniec navrhovať {second}, {first} môže povedať áno alebo uvidíme a dohadovanie sa môže presúvať na mladšiu stranu, návšteva za návštevou, bez toho, aby to niekto prideľoval.\n\nDvere ostávajú otvorené; chýba pevný deň, na ktorý by sa dalo prísť. Otvorenosť myslená ako privítanie môže v praxi sťažiť dohodnutie návštevy.',
        },
        aside: {
            en: '{first} may welcome with an open door and no date on it, while {second} may need a date to plan around. The arranging can then fall to the younger one, and an invitation meant as welcome can become hard to accept.',
            sk: '{first} môže vítať otvorenými dverami bez dátumu, zatiaľ čo {second} môže potrebovať dátum, podľa ktorého sa dá plánovať. Dohadovanie potom môže padnúť na mladšiu stranu a pozvanie myslené ako privítanie sa môže ťažko prijímať.',
        },
        step: { en: 'Let the older of you propose one date for the next visit, and keep the open invitation for the rest.', sk: 'Nech staršia strana navrhne jeden termín najbližšej návštevy a otvorené pozvanie nech platí pre všetko ostatné.' },
        question: { en: 'What would an invitation with a date on it mean to each of you, compared with “come whenever you like”?', sk: 'Čo by pre každého z vás znamenalo pozvanie s dátumom v porovnaní s „príď, kedy chceš“?' },
    },
    'structure-and-flexibility/oneSided:structured': {
        title: { en: 'Whoever keeps the dates', sk: 'Ten, kto drží dátumy' },
        passage: {
            en: 'The family calendar can have a keeper: the one who knows when a visit is due, who is hosting the holiday, whose birthday comes next. Here that is likely to be {lean}, and {mid}, who sits between planning and leaving things open, is unlikely to object, which is how it stays with one person. Nothing is wrong with the arrangement while it works.\n\nSitting between the two can look, to the one keeping the dates, like having no view of them, and so {lean} may remain the only one who checks. The calendar can come to rest on one person without either having chosen that, and a lapse in it can surprise both.',
            sk: 'Rodinný kalendár môže mať svojho strážcu: toho, kto vie, kedy je na rade návšteva, kto hostí sviatky a komu budú ďalšie narodeniny. Tu je to pravdepodobne {lean} a {mid} stojí niekde medzi plánovaním a nechávaním vecí otvorených, takže sotva bude namietať, a preto to ostáva na jednom človeku. Kým to funguje, nie je na dohode nič zlé.\n\nTomu, kto termíny drží, môže chýbajúci vyhranený postoj druhého pripadať ako nezáujem o termíny, a tak môže kontrolovať len {lean}. Kalendár sa tak môže oprieť o jedného človeka, hoci si to nikto nezvolil, a keď sa v ňom niečo vynechá, môže to prekvapiť každého z nich.',
        },
        aside: {
            en: 'Keeping the family dates is something {lean} is likely to take on, and {mid}, without a strong leaning, lets the calendar rest there. The arrangement can run smoothly until a date is dropped.',
            sk: 'Rodinné termíny bude pravdepodobne držať {lean} a {mid}, keďže sa výrazne neprikláňa ani k jednému, to tak nechá. Dohoda môže ísť hladko, kým sa niektorý termín nevynechá.',
        },
        step: { en: 'Hand one recurring date, the holiday or a birthday, to the other to arrange from start to finish.', sk: 'Odovzdajte druhému jeden opakujúci sa termín, sviatky či narodeniny, nech to celé zariadi od začiatku do konca.' },
        question: { en: 'Which family dates would be forgotten if the one who keeps them stopped, and would the other notice?', sk: 'Na ktoré rodinné termíny by sa zabudlo, keby ich ten, kto ich drží, prestal držať, a všimol by si to druhý?' },
    },
    'structure-and-flexibility/oneSided:adaptable': {
        title: { en: 'Which occasions are fixed', sk: 'Ktoré príležitosti sú pevné' },
        passage: {
            en: '{lean} tends to leave most dates open, and {mid}, without a firm preference about dates, may raise no objection; the exception is the occasion that matters, which needs a fixed day. The arrangement can hold until the two have different ideas of which occasions those are.\n\nSay {mid} counts a birthday among the fixed ones and {lean} treats it as “around then”. In that small moment, the flexibility that otherwise suits the tie can look like a lapse in care. The list of fixed points is seldom written down. It lives in two heads, and the two lists can differ.',
            sk: '{lean} zvyčajne nechá väčšinu termínov otvorených a {mid}, bez pevnej predstavy o termínoch, možno nebude namietať; výnimkou je príležitosť, na ktorej záleží a ktorá žiada pevný deň. Dohoda môže vydržať, kým každý z nich nemá inú predstavu o tom, ktoré príležitosti to sú.\n\nPovedzme, že {mid} považuje narodeniny za pevný bod a {lean} ich berie ako „niekedy okolo toho“: v takej malej chvíli sa pružnosť, ktorá vzťahu inak vyhovuje, môže zdať ako nedostatok záujmu. Zoznam pevných bodov sa zriedka zapíše. Žije v dvoch hlavách a tie dva zoznamy sa môžu líšiť.',
        },
        aside: {
            en: 'The big occasions need a date, and the rest can stay open while {lean} leaves things loose and {mid} goes along. Which occasions count as big is rarely agreed, and the two lists can differ.',
            sk: 'Veľké príležitosti potrebujú dátum a zvyšok môže ostať otvorený, kým {lean} necháva veci voľne a {mid} sa pridá. Ktoré príležitosti sú veľké, sa dohodne málokedy a dva zoznamy sa môžu líšiť.',
        },
        step: { en: 'Write down together the few occasions that get a fixed date, and let everything outside that list stay open.', sk: 'Zapíšte si spolu tých pár príležitostí, ktoré dostanú pevný termín, a všetko mimo zoznamu nechajte otvorené.' },
        question: { en: 'Which date, if it slipped, would be felt as a broken promise by one of you?', sk: 'Ktorý termín by, keby sa posunul, pocítil jeden z vás ako porušený sľub?' },
    },
    /* ------------------------------------------------------------------ risk-and-caution -- */
    'risk-and-caution/shared:cautious': {
        title: { en: 'Safer together, and slower', sk: 'Bezpečnejšie spolu a pomalšie' },
        passage: {
            en: 'Say a decision concerns an older relative’s care or money the family shares: {both} are likely to decide slowly and with the downside in view. What the family has can be safer for it.\n\nThe same care can compound. One may raise a worry and the other add one, until a reasonable option has more reasons against it than either would have supplied alone. Where a relative’s own safety is the subject, two careful people can agree on a degree of protection greater than the relative asked for. Agreement between the two can come easily, and is not the same as agreement from everyone concerned.',
            sk: 'Povedzme, že ide o starostlivosť o staršieho príbuzného alebo o peniaze, ktoré rodina má spoločne: {both} budú pravdepodobne rozhodovať pomaly a s ohľadom na riziká a to, čo rodina má, môže byť vďaka tomu bezpečnejšie.\n\nRovnaká opatrnosť sa však môže nabaľovať. Jeden môže vzniesť obavu a druhý pridať ďalšiu, až má rozumná možnosť proti sebe viac dôvodov, než by dodal ktokoľvek z nich sám. Keď ide o bezpečnosť samotného príbuzného, môže zhoda dvoch opatrných ľudí viesť k väčšej ochrane, než o akú príbuzný žiadal. Zhoda medzi dvoma môže prísť ľahko a nie je to isté ako súhlas všetkých, ktorých sa vec týka.',
        },
        aside: {
            en: 'Family decisions tend to be taken slowly when {both} have the downside in view, which can protect what the family holds. Each added worry can make a reasonable option look worse than it is, and agreement between the two is not the agreement of everyone concerned.',
            sk: 'Rodinné rozhodnutia sa zvyčajne robia pomaly, keď {both} majú na očiach, čo sa môže pokaziť, a to môže chrániť, čo rodina má. Každá pridaná obava môže urobiť rozumnú možnosť horšou, než je, a zhoda dvoch ešte nie je zhoda všetkých, ktorých sa vec týka.',
        },
        step: { en: 'Before settling a cautious choice, ask what it would cost to do nothing, and who else should have a say.', sk: 'Skôr než sa opatrná voľba uzavrie, opýtajte sa, čo by vás stálo nerobiť nič, a kto ďalší by mal mať slovo.' },
        question: { en: 'Which good chance might the two of you have talked each other out of, and who would have had to carry it?', sk: 'Akú dobrú príležitosť ste si mohli spolu vyhovoriť a kto by niesol dôsledky?' },
    },
    'risk-and-caution/shared:risk-oriented': {
        title: { en: 'Nobody to ask what if', sk: 'Nikto sa nespýta, čo ak' },
        passage: {
            en: 'Neither of the two tends to be the one who asks “and if it goes wrong?”. {both} are likely to back each other’s leaps, whether a move, a business or a late change of direction, and in a family that can decide whether a plan stays a dream or is tried.\n\nThe side left unexamined can be a shared venture: say a loan between relatives, or a business taken on together. Either can begin with the energy of the plan and without the question a bank would put. Money and kinship are then tied together by how much the two trust the plan, and if it does not work out, the tie itself can carry the weight.',
            sk: 'Nikto z nich sa zvyčajne nepýta „a čo ak sa to pokazí?“. {both} sa pri odvážnych krokoch pravdepodobne navzájom podporia, či ide o sťahovanie, podnikanie alebo neskorú zmenu smeru, a v rodine to môže rozhodnúť, či plán ostane snom, alebo sa vyskúša.\n\nNepreskúmaný môže ostať spoločný podnik: napríklad pôžička medzi príbuznými či podnikanie, do ktorého sa pustia spolu, rozbehnuté s energiou plánu a bez otázky, ktorú by položila banka. Peniaze a príbuzenstvo sú potom spojené tým, nakoľko plánu veria, a ak to nevyjde, váhu môže niesť samotný vzťah.',
        },
        aside: {
            en: '{both} are likely to back each other’s leaps, which can decide whether a plan is tried. With nobody asking what could go wrong, a loan or venture between relatives can carry more risk than either would accept from a stranger.',
            sk: '{both} pravdepodobne podporia odvážne kroky jeden druhého, čo môže rozhodnúť, či sa plán vyskúša. Ak sa nikto nepýta, čo sa môže pokaziť, môže pôžička či podnik medzi príbuznými niesť viac rizika, než by ktokoľvek z nich prijal od cudzieho človeka.',
        },
        step: { en: 'For any money or venture shared between you, let one of you play the sceptic once and list what could go wrong.', sk: 'Pri každých peniazoch či podniku, ktoré máte spoločné, nech jeden z vás raz zahrá skeptika a vypíše, čo sa môže pokaziť.' },
        question: { en: 'If a shared plan did not work out, what would you each want the tie to still be able to carry?', sk: 'Keby sa spoločný plán nevydaril, čo by ste chceli, aby vzťah ešte vedel uniesť?' },
    },
    'risk-and-caution/opposed': {
        title: { en: 'The worry that becomes supervision', sk: 'Obava, z ktorej sa stáva dohľad' },
        passage: {
            en: 'A worry said once is information; said again, between adults, it can begin to sound like a vote of no confidence. Say {p1} mentions a move or a loan: {p0} is likely to see the pitfalls and say so, then say so again. {p1} is more likely to see the opening, and can start to leave plans unmentioned until they are settled.\n\nFrom there {p0} may hear about decisions only as done things, with nothing left to weigh, and the worry that might have helped can arrive too late to be used. The silence is what takes the weighing away. Each has what the other lacks, the pitfall and the opening, and a decision that meets both has seen more than one that meets either. Such a decision depends on the plan being told while it can still change.',
            sk: 'Obava povedaná raz je informácia; povedaná znova, medzi dospelými, môže začať znieť ako vyslovenie nedôvery. Povedzme, že {p1} spomenie sťahovanie či pôžičku: {p0} pravdepodobne uvidí úskalia, povie to a potom to povie znova. {p1} skôr vidí príležitosť a môže začať plány nespomínať, kým nie sú hotové.\n\nOdtiaľ sa {p0} môže o rozhodnutiach dozvedať už len ako o hotových veciach, bez priestoru niečo zvážiť, a obava, ktorá mohla pomôcť, môže prísť príliš neskoro, aby sa dala použiť. Zvažovanie berie práve to mlčanie. Každý má to, čo druhému chýba, úskalie a príležitosť, a rozhodnutie, ktoré rátá s oboma, toho vidí viac než to, ktoré rátá len s jedným; podmienkou je, aby sa plán povedal, kým sa ešte dá zmeniť.',
        },
        aside: {
            en: 'Pitfalls are what {p0} is likely to see, and {p1} the opening. A worry repeated between adults can sound like supervision, and plans can then stop being shared before they are settled.',
            sk: 'Úskalia pravdepodobne uvidí {p0}, príležitosť {p1}. Obava opakovaná medzi dospelými môže znieť ako dohľad a plány sa potom môžu prestať zdieľať, kým nie sú hotové.',
        },
        step: { en: 'Agree that the worry is said once, clearly, early in a plan, and that the decision stays with the one it belongs to.', sk: 'Dohodnite sa, že obava sa povie raz, jasne a hneď na začiatku plánu, a rozhodnutie ostane tomu, komu patrí.' },
        question: { en: 'What would make it easier to tell the other about a plan while it can still change?', sk: 'Čo by uľahčilo povedať druhému o pláne, kým sa ešte dá zmeniť?' },
    },
    'risk-and-caution/opposed:cautious': {
        title: { en: 'A worry from the older generation', sk: 'Obava od staršej generácie' },
        passage: {
            en: 'When {second} describes a new country, a business or a change of course, {first} may hear the plan and, at once, the ways it could go wrong. Coming from the older generation, the worry can carry weight that the same words from a friend would not. It can sound like a verdict on the life {second} has chosen, and plans can start to be described only once they are fixed.\n\nBy then {first} may have lost the chance to say the worry once, early, where it would be heard as care. A worry raised early and a decision trusted to its owner are both available to this tie. A plan that is no longer described is what puts them out of reach.',
            sk: 'Keď {second} opisuje novú krajinu, podnikanie alebo zmenu smeru, {first} môže počuť plán a hneď aj všetko, čo sa môže pokaziť. Z úst staršej generácie môže mať obava váhu, akú by tie isté slová od priateľa nemali. Môže znieť ako súd nad životom, ktorý si {second} volí, a plány sa môžu začať opisovať až vtedy, keď sú pevné.\n\nDovtedy už {first} môže prísť o šancu povedať obavu raz a včas, keď by znela ako starostlivosť. Včas vyslovená obava aj rozhodnutie zverené tomu, komu patrí, sú vo vzťahu stále možné. Mimo dosahu ich dostane až plán, o ktorom sa už nehovorí.',
        },
        aside: {
            en: '{first} may meet a plan with the ways it could go wrong, and from the older generation that worry can carry extra weight. It can sound like a verdict, and {second} may then describe plans only once they are fixed.',
            sk: '{first} môže na plán reagovať tým, čo sa môže pokaziť, a od staršej generácie môže mať taká obava väčšiu váhu. Môže znieť ako súd a {second} potom môže plány opisovať až vtedy, keď sú pevné.',
        },
        step: { en: 'Let the older of you say the worry once, early, and the younger say what has already been weighed.', sk: 'Nech staršia strana povie obavu raz a včas a mladšia nech povie, čo už je zvážené.' },
        question: { en: 'How does a worry sound to the younger of you when it comes from the older, and what would make it sound like care?', sk: 'Ako znie obava mladšej strane, keď prichádza od staršej, a čo by spôsobilo, že by znela ako starostlivosť?' },
    },
    'risk-and-caution/opposed:risk-oriented': {
        title: { en: 'Who is allowed to be the careful one', sk: 'Kto smie byť ten opatrný' },
        passage: {
            en: 'Say a late change of course or a venture looks bold to others: {first} may take it on with ease, while {second} weighs what could go wrong. A role can reverse here before either has named it, the younger as the careful voice and the older as the one being advised.\n\nThe questions {second} puts are about the plan, and they can be heard as a sign that {first} is no longer trusted to judge. The more carefully they are put, the more they can sound like supervision. The boldness is not what is at stake. What is at stake is who gets to be the careful one in the family, and whether the part was offered or only taken up.',
            sk: 'Povedzme, že neskorá zmena smeru alebo podnikanie pôsobí na ostatných odvážne: {first} sa do toho môže pustiť s ľahkosťou, kým {second} zvažuje, čo sa môže pokaziť. Roly sa tu môžu obrátiť skôr, než ich niekto pomenuje: mladšia strana ako opatrný hlas a staršia ako tá, ktorej sa radí.\n\nOtázky, ktoré {second} kladie, sú o pláne, no dajú sa počuť ako znak, že sa úsudku staršej strany už nedôveruje. Čím opatrnejšie sa kladú, tým viac môžu znieť ako dohľad. Nejde o odvahu. Ide o to, kto smie byť v rodine ten opatrný a či bola táto úloha ponúknutá, alebo len prevzatá.',
        },
        aside: {
            en: 'When {first} takes a chance and {second} weighs what could go wrong, the usual roles can reverse before anyone names them. Careful questions from the younger one can then sound like supervision.',
            sk: 'Keď {first} riskuje a {second} zvažuje, čo sa môže pokaziť, zvyčajné roly sa môžu obrátiť skôr, než ich niekto pomenuje. Opatrné otázky mladšej strany potom môžu znieť ako dohľad.',
        },
        step: { en: 'Ask the older of you first what would make the plan feel safe enough, and only then bring the younger one’s list of risks.', sk: 'Skôr než mladšia strana predloží zoznam rizík, spýtajte sa staršej, čo by plán urobilo dosť bezpečným.' },
        question: { en: 'Who in the family has been the careful one, and did either of you agree to that part?', sk: 'Kto v rodine zastáva úlohu toho opatrného a je to úloha, na ktorej ste sa dohodli?' },
    },
    'risk-and-caution/oneSided:cautious': {
        title: { en: 'A worry that is fair and changes nothing', sk: 'Obava, ktorá je oprávnená a nič nemení' },
        passage: {
            en: 'What could go wrong with a loan, a move or a change of job is what {lean} tends to weigh. {mid}, drawn strongly neither to caution nor to risk, may hear the worry and the appeal together, so a concern raised here is heard as one view among two and not as opposition. That can keep the talk calm.\n\nIt can also leave the decision hanging: {mid} may agree that the worry is fair, and the agreement can be taken for a change of mind. The choice can then go ahead as before, to the surprise of both. A worry does most when it is clear what it would change, and a calm hearing can hide that it has not changed anything.',
            sk: 'Čo všetko sa môže pokaziť pri pôžičke, sťahovaní či zmene práce, zvyčajne zvažuje {lean}. {mid} sa výrazne neprikláňa k opatrnosti ani k riziku a môže počuť obavu aj lákavosť naraz, takže obava vyslovená tu sa počuje ako jeden z dvoch názorov, nie ako odpor. To môže udržať rozhovor pokojný.\n\nRozhodnutie však môže ostať visieť: {mid} môže súhlasiť, že obava je oprávnená, súhlas sa môže vziať za zmenu názoru a voľba môže ísť ďalej ako predtým, čo prekvapí každého z nich. Obava zaberie najviac, keď je jasné, čo by zmenila, a pokojné vypočutie môže zakryť, že nezmenila nič.',
        },
        aside: {
            en: 'Agreement that a worry is fair can be taken for a change of mind. {lean} may weigh the risks while {mid}, with no strong leaning, hears the worry without a fight, and the plan can go ahead unchanged.',
            sk: 'Súhlas, že obava je oprávnená, sa môže pokladať za zmenu názoru. {lean} môže zvažovať riziká, kým {mid} bez výrazného sklonu obavu vypočuje bez sporu, a plán môže ísť ďalej nezmenený.',
        },
        step: { en: 'When a worry is raised, say what it would change in the plan, and ask the other whether it does.', sk: 'Keď sa vysloví obava, povedzte, čo by v pláne zmenila, a opýtajte sa druhého, či to tak je.' },
        question: { en: 'After a worry has been heard between you, how do you each know whether it changed anything?', sk: 'Ako každý z vás po vypočutí obavy zistí, či niečo zmenila?' },
    },
    'risk-and-caution/oneSided:risk-oriented': {
        title: { en: 'Told before it is fixed', sk: 'Povedané skôr, než je to pevné' },
        passage: {
            en: '{lean} is likely to take a chance when a choice feels right, and {mid}, without a strong pull either way, may not object, so there is room to try. The announcement is where this is most easily strained. A plan told while it is still forming leaves room for curiosity, and {mid} can ask a question or two. Told once it is fixed, a plan has an audience rather than a second voice, and tolerance can be the only response {mid} has left.\n\nNot objecting to a risk is not the same as having had a say in it. A relative who has been told but not asked can keep unease out of sight, and it can show up later as a reluctance to hear the next plan.',
            sk: '{lean} pravdepodobne riskne, keď sa voľba zdá správna, a {mid}, bez výrazného sklonu jedným či druhým smerom, možno nebude namietať, takže je priestor skúšať. Najľahšie sa to môže narušiť pri oznámení. Plán povedaný, kým sa ešte tvorí, nechá miesto pre zvedavosť a {mid} sa môže spýtať na jednu či dve veci. Plán oznámený až hotový má divákov namiesto druhého hlasu a {mid} potom môže už len tolerovať.\n\nNenamietať proti riziku nie je to isté ako mať v ňom slovo. Príbuzný, ktorému sa len oznámilo a nikto sa nepýtal, môže nepokoj skrývať a ten sa neskôr môže ukázať ako neochota počuť ďalší plán.',
        },
        aside: {
            en: 'Tolerance can be the only response left to a plan told once it is fixed. {lean} may be ready to take chances and {mid} may raise no objection, while a plan told as it forms can invite a question.',
            sk: 'Na plán oznámený až hotový môže ostať jedinou odpoveďou tolerancia. {lean} môže chcieť riskovať a {mid} nemusí namietať, kým plán povedaný ešte počas vzniku pozýva k otázke.',
        },
        step: { en: 'Tell the other about a plan while one question can still change it, even if it is only half formed.', sk: 'Povedzte druhému o pláne, kým ešte jedna otázka môže plán zmeniť, aj keď je len napoly hotový.' },
        question: { en: 'At what stage of a plan would the other like to hear about it, and which question would the other want room to ask?', sk: 'V ktorej fáze plánu by sa o ňom druhý rád dozvedel a akú otázku by chcel mať priestor položiť?' },
    },
};
export default FAMILY_A;
