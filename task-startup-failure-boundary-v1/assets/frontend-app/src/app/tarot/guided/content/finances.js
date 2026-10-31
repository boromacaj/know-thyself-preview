/**
 * FINANCES & STABILITY - how a person RELATES to money, security and resources.
 *
 * This area owns the attitude: what security means, which priorities pull, how uncertainty feels, which everyday habits shape
 * the sense of ground. It does not own job satisfaction or career direction (Work & Career). It is the most sensitive area, so
 * it is symbolic and reflective only: no advice, no amounts, no instruments, no outcomes. The reading helps a person SEE how
 * they stand toward money; it never says what to do with any of it.
 *
 * What the area writes: one sentence for when Major cards lead the three, and for each intention its places (label, ask, and a
 * frame for a card that can be read plainly and for a card under strain), its opening, four takeaways and four closing questions.
 * Nothing here describes a card, predicts, or tells a person what to do.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    majorWeight: t('With most of the cards Major Arcana, the matter is less about the everyday handling of money and more about what security and enough have come to mean over a long time.', 'Keď je väčšina kariet z Veľkých arkán, nejde ani tak o každodenné nakladanie s peniazmi, ako o to, čo pre teba za dlhý čas začala znamenať istota a čo dostatok.'),
};
const security = {
    id: 'finances-stability.security',
    areaId: 'finances-stability',
    label: t('Understand my relationship with security', 'Pochopiť môj vzťah k istote'),
    focus: t('Hold in mind what security means to you, and what it feels like when you think about it.', 'Maj na mysli, čo pre teba znamená istota a aký pocit prináša, keď na ňu myslíš.'),
    semantics: {
        explores: t('how you relate to security and what it rests on', 'to, ako sa vzťahuješ k istote a na čom stojí'),
        reflection: 'meaning',
        practical: 'name',
        forbids: ['financial-advice', 'predict-outcome', 'fate-claim', 'life-directive', 'health-claim'],
    },
    spreadId: 'body-mind-spirit',
    category: 'general-reflection',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('The practical side', 'Praktická stránka'),
            ask: t('How security is lived day to day: the routines, objects and arrangements that make up the ground you stand on.', 'Ako sa istota žije každý deň: rutiny, veci a usporiadania, z ktorých sa skladá pôda, na ktorej stojíš.'),
            frame: {
                steady: t('In practice, security tends to live in small, repeated things: where papers are kept, what is on the shelf, how an ordinary week is laid out.', 'V praxi sa istota zvykne skrývať v malých opakovaných veciach: kde sú uložené papiere, čo je v poličke, ako je rozvrhnutý obyčajný týždeň.'),
                strained: t('Here the everyday arrangements can feel thin or worn, as if staying secure took more upkeep than it gives back.', 'Každodenné usporiadania tu môžu pôsobiť tenko či opotrebovane, akoby udržiavanie istoty vyžadovalo viac starostlivosti, než vracia.'),
            } },
        { label: t('The inner voice', 'Vnútorný hlas'),
            ask: t('What thinking about security stirs in thought and feeling: the worries, hopes and stories that come with it.', 'Čo myslenie na istotu vyvoláva v mysli a v citoch: starosti, nádeje a príbehy, ktoré ho sprevádzajú.'),
            frame: {
                steady: t('How this voice sounds matters more than what it says: whether it speaks calmly, in a rush, or in a tone borrowed from someone else.', 'Viac než to, čo tento hlas hovorí, záleží na tom, ako znie: či pokojne, v zhone, alebo hlasom prevzatým od niekoho iného.'),
                strained: t('That inner voice tends to be loud, repetitive or oddly silent, with the same few worries circling and little room left for any other thought.', 'Ten vnútorný hlas býva hlasný, opakujúci sa alebo nezvykle tichý: tých pár istých starostí krúži dookola a na iné myšlienky ostáva málo miesta.'),
            } },
        { label: t('What sits underneath', 'Čo je pod povrchom'),
            ask: t('The value or need beneath the whole matter: what security is ultimately for.', 'Hodnota alebo potreba pod celou témou: načo je istota v konečnom dôsledku dobrá.'),
            frame: {
                steady: t('Below the surface, the same few needs tend to recur in different clothes: rest, belonging, freedom, dignity, being able to care for others.', 'Pod povrchom sa rovnaké potreby zvyknú vracať v rôznych podobách: oddych, spolupatričnosť, sloboda, dôstojnosť, schopnosť postarať sa o iných.'),
                strained: t('When the need underneath goes unnamed, the wish for safety can end up carrying far more than it can hold.', 'Keď sa potreba pod povrchom nepomenuje, túžba po bezpečí môže niesť oveľa viac, než unesie.'),
            } },
    ],
    opening: t('This reading looks at your relationship with security. The first card is the practical side, how security is lived day to day, the second the inner side, what thinking about it stirs in thought and feeling, and the third what sits underneath, the value it serves. It describes an attitude, not a financial position, and gives no advice about money.', 'Toto čítanie sa pozerá na tvoj vzťah k istote. Prvá karta je praktická stránka, ako sa istota žije každý deň, druhá vnútorná stránka, čo myslenie na ňu vyvoláva v mysli a v citoch, a tretia to, čo je pod povrchom, hodnota, ktorej slúži. Opisuje postoj, nie finančnú situáciu, a nedáva žiadne rady o peniazoch.'),
    takeaway: {
        act: t('One plain sentence about what security means to you could be enough to see whether your daily habits say the same thing.', 'Môže stačiť jedna jasná veta o tom, čo pre teba istota znamená, aby bolo vidieť, či to isté hovoria aj tvoje denné zvyky.'),
        ease: t('This may be less about adding vigilance than about letting the alarm grow a little quieter, so that what remains becomes visible.', 'Môže ísť menej o pridávanie bdelosti a viac o to, nechať poplach trochu stíchnuť, aby bolo vidieť, čo ostáva.'),
        face: t('What may help here is looking plainly at the feeling behind the word security, before any plan forms around it.', 'Pomôcť môže pozrieť sa priamo na pocit, ktorý stojí za slovom istota, ešte predtým, než sa okolo neho sformuje nejaký plán.'),
        weave: t('This may be about bringing the practical, the felt and the valued into one picture, so that what is done daily and what is cared about stop contradicting each other.', 'Môže ísť o spojenie praktického, pociťovaného a cenného do jedného obrazu, aby si to, čo sa robí denne, a to, na čom záleží, prestali odporovať.'),
    },
    closings: {
        act: t('Which ordinary arrangement in your week comes closest to saying what security means to you?', 'Ktoré obyčajné usporiadanie v tvojom týždni najlepšie vyjadruje, čo pre teba istota znamená?'),
        ease: t('What would security feel like to you if it did not need to be proven every day?', 'Aký by to bol pocit istoty, keby ju nebolo treba každý deň dokazovať?'),
        face: t('Whose voice do you hear when you think about enough, and how close is it to your own?', 'Čí hlas počuješ, keď myslíš na to, čo je dosť, a nakoľko sa podobá na tvoj vlastný?'),
        weave: t('What does feeling secure make room for in you, and what does its absence close off?', 'Čomu v tebe pocit istoty robí miesto a čo sa bez neho zatvára?'),
    },
};
const priorities = {
    id: 'finances-stability.priorities',
    areaId: 'finances-stability',
    label: t('Reflect on financial priorities', 'Zamyslieť sa nad finančnými prioritami'),
    focus: t('Hold in mind two things that both feel important and seem to compete for room.', 'Maj na mysli dve veci, ktoré sú obe dôležité a zdá sa, že súperia o miesto.'),
    semantics: {
        explores: t('two pulls around priorities and what the weighing between them turns on', 'dve veci, ktoré súperia o miesto medzi prioritami, a to, na čom stojí ich zvažovanie'),
        reflection: 'weigh',
        practical: 'ask',
        forbids: ['financial-advice', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'option-a-b-guidance',
    category: 'binary-decision',
    guidance: 'reflect',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('The first pull', 'Prvá vec na stole'),
            ask: t('One thing that asks for a place among your priorities, held as a pull and not as a plan.', 'Jedna vec, ktorá si pýta miesto medzi tvojimi prioritami, vnímaná ako sila, ktorá k sebe priťahuje, nie ako plán.'),
            frame: {
                steady: t('Typically this is something cared about for good reasons: a person, a freedom, a safeguard, a plain sense of order.', 'Zvyčajne je to niečo, na čom záleží z dobrých dôvodov: človek, sloboda, ochrana, obyčajný pocit poriadku.'),
                strained: t('It can sound loud and urgent, pressing for room before its own reason has been heard.', 'Môže sa ozvať hlasno a naliehavo a pýtať si miesto skôr, než sa vypočuje jej vlastný dôvod.'),
            } },
        { label: t('The second pull', 'Druhá vec na stole'),
            ask: t('A different pull that also asks for room, held beside the first and not ranked above it.', 'Iná vec, ktorá si tiež pýta miesto, držaná vedľa prvej a nie nad ňou.'),
            frame: {
                steady: t('Seen from here, the other care has its own seriousness and its own reasons, and does not need the first one\'s vocabulary to be understood.', 'Odtiaľto má druhá starosť vlastnú vážnosť aj vlastné dôvody a na pochopenie nepotrebuje slovník tej prvej.'),
                strained: t('This is often the pull that feels awkward to admit, as though wanting room for it needed an apology.', 'Býva to tá vec, ktorú je ťažšie priznať, akoby chcieť pre ňu miesto znamenalo ospravedlniť sa.'),
            } },
        { label: t('What the weighing turns on', 'Na čom stojí zvažovanie'),
            ask: t('The value or need beneath both pulls, not a verdict on which one is right.', 'Hodnota alebo potreba pod oboma vecami, nie verdikt o tom, ktorá z nich je správna.'),
            frame: {
                steady: t('Both claims can often be traced to a shared concern here, such as being able to rest, to give, or to stay free.', 'Obe požiadavky sa tu dajú často vystopovať k spoločnej starosti, napríklad k možnosti oddýchnuť si, dávať druhým alebo mať slobodu.'),
                strained: t('Wanting a clean answer, fearing the loss of one side and feeling that everything costs something tend to gather here.', 'Zhromažďuje sa tu túžba po čistej odpovedi, strach zo straty jednej strany a pocit, že všetko niečo stojí.'),
            } },
    ],
    opening: t('This reading holds two pulls around priorities side by side. The first card is one pull, the second a different one, and the third what the weighing between them turns on. It names no winner and gives no direction about money: it only shows what each pull holds.', 'Toto čítanie drží vedľa seba dve veci, ktoré si pýtajú miesto medzi prioritami. Prvá karta je jedna z nich, druhá je odlišná a tretia ukazuje, na čom stojí zvažovanie medzi nimi. Nevyhlasuje víťaza ani nedáva pokyn o peniazoch: len ukazuje, čo každá z nich nesie.'),
    takeaway: {
        act: t('Giving each pull its own plain sentence may help show what each one protects, side by side.', 'Pomôcť môže dať každej z nich vlastnú jednoduchú vetu, aby bolo vedľa seba vidieť, čo každá chráni.'),
        ease: t('This may be less about reaching a verdict than about letting both pulls stay on the table a little longer; they sometimes soften when neither has to win.', 'Môže ísť menej o to, dospieť k verdiktu, a viac o to, nechať obe veci ešte chvíľu na stole; niekedy zmäknú, keď ani jedna nemusí vyhrať.'),
        face: t('Looking directly at what each pull protects, and at what is lost when either goes unheard, is what this reading points toward.', 'Ide o priamy pohľad na to, čo každá z týchto vecí chráni a čo sa stráca, keď nie je niektorá z nich vypočutá.'),
        weave: t('Both pulls can often be held together, and what they have in common may show before what separates them.', 'Obe veci sa často dajú držať pri sebe a to, čo majú spoločné, sa môže ukázať skôr než to, čo ich delí.'),
    },
    closings: {
        act: t('What is each of these two pulls trying to keep safe for you?', 'Čo sa každá z týchto dvoch vecí snaží pre teba uchrániť?'),
        ease: t('If neither pull had to win, what might they say to each other?', 'Keby ani jedna z nich nemusela vyhrať, čo by sa navzájom povedali?'),
        face: t('Which of these pulls feels most like your own wish, and which more like something absorbed from somewhere else?', 'Ktorá z týchto vecí je najviac tvojou vlastnou túžbou a ktorá skôr niečím prevzatým odinakiaľ?'),
        weave: t('What could both of these pulls be serving, if you look for the shared thing underneath?', 'Čomu by mohli slúžiť obe tieto veci, keď hľadáš to spoločné pod nimi?'),
    },
};
const risk = {
    id: 'finances-stability.risk',
    areaId: 'finances-stability',
    label: t('Explore my attitude toward risk', 'Preskúmať môj postoj k riziku'),
    focus: t('Hold in mind a moment when the ground felt uncertain, and notice how you tend to meet it.', 'Maj na mysli chvíľu, keď bola pôda neistá, a všimni si, ako na to zvyčajne reaguješ.'),
    semantics: {
        explores: t('how you feel toward uncertainty and what steadies or unsettles you', 'to, ako sa cítiš voči neistote a čo ťa upokojuje alebo znepokojuje'),
        reflection: 'orient',
        practical: 'observe',
        forbids: ['financial-advice', 'predict-outcome', 'fate-claim', 'life-directive', 'health-claim'],
    },
    spreadId: 'support-resistance-key',
    category: 'emotional',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What steadies', 'Čo dáva oporu'),
            ask: t('What helps you feel steady when things are uncertain: a habit, a belief, a kind of support.', 'Čo ti pomáha cítiť pevnú pôdu, keď sú veci neisté: zvyk, presvedčenie, druh opory.'),
            frame: {
                steady: t('Footing here is usually unglamorous: a trusted routine, a conviction, a person, the memory of having coped before.', 'Opora tu býva nenápadná: osvedčený zvyk, presvedčenie, človek, spomienka na to, že sa to už raz zvládlo.'),
                strained: t('Support can feel shaky or stretched in this place, or can depend on keeping every detail under control.', 'Na tomto mieste môže byť opora vratká či natiahnutá, alebo závislá od toho, že každý detail ostáva pod kontrolou.'),
            } },
        { label: t('What makes you hesitate', 'Čo ťa núti váhať'),
            ask: t('What pulls you back when uncertainty rises: a fear, an old experience, a voice of caution.', 'Čo ťa drží späť, keď neistota rastie: strach, stará skúsenosť, hlas opatrnosti.'),
            frame: {
                steady: t('Hesitation here often carries experience: a voice of caution with something sensible to say, worth hearing out before it is answered.', 'Váhanie tu často nesie skúsenosť: je to hlas opatrnosti, ktorý má čo rozumné povedať a oplatí sa ho vypočuť do konca.'),
                strained: t('Caution can harden into fear or freezing, shaped by an old experience that still speaks in the present tense.', 'Opatrnosť môže stvrdnúť na strach či zamrznutie, ktoré drží stará skúsenosť hovoriaca stále v prítomnom čase.'),
            } },
        { label: t('What the attitude turns on', 'Na čom postoj stojí'),
            ask: t('The deeper question the attitude turns on: a feeling toward uncertainty, not a judgement about any decision.', 'Hlbšia otázka, na ktorej postoj stojí: cit voči neistote, nie úsudok o nejakom rozhodnutí.'),
            frame: {
                steady: t('Beneath both support and hesitation usually lies a plain feeling toward the unknown: trust, curiosity, a need for footing, a wish for room.', 'Pod oporou aj váhaním býva obyčajný pocit voči neznámemu: dôvera, zvedavosť, potreba opory, túžba po priestore.'),
                strained: t('Security and freedom can seem to cancel each other out, leaving the feeling toward uncertainty unresolved.', 'Istota a sloboda sa môžu zdať navzájom rušiť, takže pocit voči neistote ostáva nevyriešený.'),
            } },
    ],
    opening: t('This reading looks at your attitude toward risk as a feeling, not a decision. The first card is what steadies you, the second what makes you hesitate, and the third what the attitude turns on. Nothing here weighs any particular choice.', 'Toto čítanie sa pozerá na tvoj postoj k riziku ako na cit, nie ako na rozhodnutie. Prvá karta je to, čo ti dáva oporu, druhá to, čo ťa núti váhať, a tretia to, na čom postoj stojí. Nič tu neposudzuje žiadnu konkrétnu voľbu.'),
    takeaway: {
        act: t('It may be enough to notice, over a few ordinary days, what steadies and what makes for hesitation, letting both stand without judgement.', 'Môže stačiť počas niekoľkých obyčajných dní si všimnúť, čo dáva oporu a čo núti váhať, a nechať obe veci stáť bez posudzovania.'),
        ease: t('This may be less about settling the matter than about hearing caution and openness out without hurry; the feeling sometimes eases once neither is argued with.', 'Môže ísť menej o vyriešenie veci a viac o vypočutie opatrnosti aj otvorenosti bez náhlenia; pocit sa niekedy uvoľní, keď sa so žiadnou z nich nehádaš.'),
        face: t('Seeing the feeling underneath directly, before it is judged as courage or fear, is what this reading points toward.', 'Ide o priamy pohľad na cit pod povrchom, skôr než sa označí za odvahu či strach.'),
        weave: t('Caution and curiosity can stand on the same side here, each able to tell the other what it has noticed.', 'Opatrnosť a zvedavosť môžu stáť na jednej strane a každá môže tej druhej povedať, čo si všimla.'),
    },
    closings: {
        act: t('What do you tend to do first when the ground feels uncertain, before you think about what is wise?', 'Čo zvykneš urobiť ako prvé, keď je pôda neistá, ešte predtým, než zvažuješ, čo je rozumné?'),
        ease: t('Where does your sense of how safe it is not to know first come from?', 'Odkiaľ pochádza tvoj pocit toho, nakoľko je bezpečné niečo nevedieť?'),
        face: t('What does uncertainty feel like in your body and in your thoughts, before it is called risk or opportunity?', 'Aký je pocit neistoty v tele a v myšlienkach skôr, než sa nazve rizikom či príležitosťou?'),
        weave: t('What does your caution protect, and what might your curiosity be asking for?', 'Čo tvoja opatrnosť chráni a o čo si môže pýtať tvoja zvedavosť?'),
    },
};
const habits = {
    id: 'finances-stability.habits',
    areaId: 'finances-stability',
    label: t('Recognize habits that affect stability', 'Rozpoznať zvyky, ktoré ovplyvňujú stabilitu'),
    focus: t('Hold in mind an ordinary day with money in it, and the small things done almost without noticing.', 'Maj na mysli obyčajný deň, v ktorom sa objavia peniaze, a drobnosti, ktoré sa robia takmer bez povšimnutia.'),
    semantics: {
        explores: t('which everyday habits shape your sense of stability, in view and out of view', 'ktoré každodenné zvyky formujú tvoj pocit stability, viditeľné aj nepovšimnuté'),
        reflection: 'notice',
        practical: 'observe',
        forbids: ['financial-advice', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'blind-spot-view',
    category: 'self-development',
    guidance: 'blind-spot',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('The habit you can see', 'Zvyk, ktorý vidíš'),
            ask: t('An everyday habit around money or security that you already recognise in yourself.', 'Každodenný zvyk okolo peňazí alebo istoty, ktorý už u seba spoznávaš.'),
            frame: {
                steady: t('Most often this is a familiar routine seen without much drama, one that brings comfort, order or relief.', 'Ide zväčša o známu rutinu videnú bez veľkej drámy, ktorá prináša pohodlie, poriadok či úľavu.'),
                strained: t('A habit that is seen can still be hard to look at kindly, tangled up with worry, guilt or a sense that it ought to be different.', 'Aj zvyk, ktorý je dobre vidieť, môže byť ťažké sledovať láskavo, keď sa spája so starosťou, vinou alebo pocitom, že by mal byť iný.'),
            } },
        { label: t('What may be out of view', 'Čo môže byť mimo zorného poľa'),
            ask: t('A question about a habit that is easy to miss. It is a possibility to hold, not a fact the cards establish.', 'Otázka o zvyku, ktorý sa dá ľahko prehliadnuť: možnosť, ktorú treba mať na mysli, nie zistenie z kariet.'),
            frame: {
                steady: t('Whatever sits here may be so ordinary that it has faded into the background, a quiet pattern that is easy to overlook.', 'Čo tu leží, môže byť také obyčajné, že to zapadlo do pozadia: tichý vzorec, ktorý sa dá ľahko prehliadnuť.'),
                strained: t('A pattern kept out of sight tends to have a reason: embarrassment, tiredness, or the habit of not asking.', 'Vzorec držaný mimo dohľadu má zvyčajne svoj dôvod: rozpaky, únavu alebo zvyk nepýtať sa.'),
            } },
        { label: t('What noticing would change', 'Čo by zmenilo všimnutie si'),
            ask: t('What would shift in your sense of ground if the unnoticed habit came into view and could simply be seen.', 'Čo by sa zmenilo v tvojom pocite opory, keby sa nepovšimnutý zvyk dostal do zorného poľa a dal sa jednoducho vidieť.'),
            frame: {
                steady: t('Simply seeing tends to feel lighter than expected, and a familiar routine can look different once it is no longer unseen.', 'Jednoduché videnie býva ľahšie, než sa čaká, a známa rutina môže vyzerať inak, keď už nie je neviditeľná.'),
                strained: t('Noticing can bring discomfort along: shame, grief or a wish to look away again may arrive with a clear view.', 'Všimnutie si môže priniesť aj nepríjemný pocit: s jasným pohľadom môže prísť hanba, smútok či túžba znova odvrátiť zrak.'),
            } },
    ],
    opening: t('This reading looks at the habits that quietly shape your sense of stability. The first card is a habit you can already see, the second what may be out of view (a question to hold, not a finding), and the third what would shift if it were noticed. Habits are observed here, never judged or corrected.', 'Toto čítanie sa pozerá na zvyky, ktoré potichu formujú tvoj pocit stability. Prvá karta je zvyk, ktorý už vidíš, druhá to, čo môže byť mimo zorného poľa (otázka na držanie, nie zistenie), a tretia to, čo by sa zmenilo, keby sa to všimlo. Zvyky sa tu pozorujú, nikdy neposudzujú ani neopravujú.'),
    takeaway: {
        act: t('A small, ordinary step could be to watch one routine around money as it happens, with nothing about it changed.', 'Malým, obyčajným krokom môže byť pozorovať jednu rutinu okolo peňazí, ako prebieha, a nič na nej nemeniť.'),
        ease: t('This may be less about effort than about letting a familiar habit be seen once, with curiosity rather than criticism.', 'Môže ísť menej o námahu a viac o to, dovoliť známemu zvyku raz sa ukázať, so zvedavosťou namiesto kritiky.'),
        face: t('The habit that feels too ordinary to question may be the one worth a direct and kind look, allowed to be as large or as small as it is.', 'Zvyk, ktorý sa zdá príliš obyčajný na spochybňovanie, si môže zaslúžiť priamy a láskavý pohľad, nech je veľký či malý, aký je.'),
        weave: t('Attention may hold two things together: what a habit gives (comfort, relief, belonging) and what it quietly costs.', 'Pozornosť môže udržať pri sebe dve veci: čo zvyk dáva (útechu, úľavu, pocit spolupatričnosti) a čo potichu stojí.'),
    },
    closings: {
        act: t('Which routine around money would be easiest to simply watch for a day, without changing anything?', 'Ktorú rutinu okolo peňazí by bolo najľahšie jednoducho jeden deň sledovať, bez toho, aby sa čokoľvek menilo?'),
        ease: t('What does a habit you rarely question give you that has little to do with money itself?', 'Čo ti dáva zvyk, ktorý len zriedka spochybňuješ, a čo má s peniazmi samými máločo spoločné?'),
        face: t('If one ordinary habit could speak plainly, what would it say it is for?', 'Keby jeden obyčajný zvyk mohol prehovoriť priamo, čo by povedal, načo slúži?'),
        weave: t('Where do your daily money habits and your values quietly agree, and where do they part ways?', 'Kde sa tvoje denné zvyky okolo peňazí a tvoje hodnoty potichu zhodujú a kde sa rozchádzajú?'),
    },
};
export const FINANCES_AREA = {
    id: 'finances-stability',
    label: t('Finances & Stability', 'Financie a stabilita'),
    blurb: t('How you relate to money, security and what you lean on.', 'Ako sa vzťahuješ k peniazom, istote a veciam, o ktoré sa opieraš.'),
    scope: t('how you relate to money, security and resources', 'to, ako sa vzťahuješ k peniazom, istote a zdrojom'),
    intentions: [security, priorities, risk, habits],
    lens,
};
