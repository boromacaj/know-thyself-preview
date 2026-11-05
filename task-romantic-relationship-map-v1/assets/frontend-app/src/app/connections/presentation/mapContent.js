const l = (en, sk) => ({ en, sk });
const pendingSlovak = [];
/** English-first: a string written for English only. Its Slovak is the English text until a Slovak pass; it is registered here so that this is visible and testable, never a silent copy. */
const en = (text) => { const value = { en: text, sk: text }; pendingSlovak.push(value); return value; };
export const SLOVAK_PENDING = pendingSlovak;
export const CATEGORY_TEXT = {
    communication: {
        label: l('Communication', 'Komunikácia'),
        covers: l('How each thinks things through and puts them into words', 'Ako každý premýšľa a ako to vyjadruje'),
        implication: {
            resonance: l('In a tense moment this can be an advantage; it may also mean the same blind spot goes unnoticed.', 'V napätej chvíli to môže byť výhoda; môže to však znamenať aj to, že rovnaké slepé miesto nikto nezbadá.'),
            complement: l('When someone asks before assuming an answer, the difference can become a resource.', 'Keď sa niekto opýta skôr, než si odpoveď domyslí, rozdiel sa môže stať zdrojom.'),
            friction: l('It helps when each side says how it likes to think things through and asks how the other side does.', 'Pomáha, keď každá strana povie, ako najradšej premýšľa, a opýta sa, ako to robí druhá strana.'),
            asymmetry: l('The side nearer the middle can say what it actually prefers, and the side with the clearer preference can ask.', 'Strana bližšie k stredu môže povedať, čo naozaj uprednostňuje, a strana s jasnejšou preferenciou sa môže opýtať.'),
        },
    },
    emotions: {
        label: l('Emotions', 'Emócie a citlivosť'),
        covers: l('How feelings are shown or held', 'Ako sa city ukazujú alebo držia v sebe'),
        implication: {
            resonance: l('Shared habits can feel easy, and can also leave a feeling unspoken when neither side tends to raise it.', 'Spoločný zvyk môže pôsobiť ľahko, no cit môže zostať nevyslovený, ak sa ani jedna strana nezvykne otvoriť.'),
            complement: l('Saying which of the two is happening can keep a quiet moment from being read as distance.', 'Keď sa povie, ktorá z týchto dvoch vecí sa deje, ticho nemusí vyzerať ako odstup.'),
            friction: l('A short sentence about what a reaction means can spare a lot of guessing.', 'Krátka veta o tom, čo reakcia znamená, môže ušetriť veľa hádania.'),
            asymmetry: l('The side nearer the middle may leave its own feeling unsaid, so it helps to ask directly.', 'Strana bližšie k stredu môže nechať svoj cit nevyslovený, preto pomáha opýtať sa priamo.'),
        },
    },
    closeness: {
        label: l('Closeness', 'Blízkosť a vlastný priestor'),
        covers: l('Togetherness, room and company', 'Spoločný čas, priestor a spoločnosť'),
        implication: {
            resonance: l('Shared time can feel natural; it is worth saying out loud when one side wants more of the other.', 'Spoločný čas môže pôsobiť prirodzene; stojí za to nahlas povedať, keď jedna strana chce viac blízkosti.'),
            complement: l('Agreeing when time together and time apart begin and end can let the difference work for the relationship.', 'Keď sa dohodne, kedy spoločný čas aj čas osobitne začína a končí, rozdiel môže fungovať v prospech vzťahu.'),
            friction: l('A shared rhythm of time together and apart usually helps more than settling it case by case.', 'Spoločný rytmus času spolu a času osobitne zvyčajne pomáha viac než riešenie od prípadu k prípadu.'),
            asymmetry: l('The side nearer the middle may not say what it would choose, so it helps to ask what each side would pick.', 'Strana bližšie k stredu nemusí povedať, čo by si vybrala, preto pomáha opýtať sa, čo by si vybrala každá strana.'),
        },
    },
    conflict: {
        label: l('Conflict & Reconnection', 'Napätie a zmierenie'),
        covers: l('When something goes wrong: a synthesis, not an observation', 'Keď sa niečo pokazí: syntéza, nie pozorovanie'),
        implication: {
            resonance: l('A shared pattern is easy to follow, and can also repeat the same stall if neither side changes it.', 'Spoločný vzorec sa ľahko udržiava, no ak sa nezmení ani z jednej strany, môže sa opakovať rovnaké uviaznutie.'),
            complement: l('Saying how long a pause is needed and when the talk resumes lets the difference help.', 'Keď sa povie, ako dlho pauza potrebuje trvať a kedy sa rozhovor obnoví, rozdiel môže pomôcť.'),
            friction: l('Agreeing in advance what each side needs first (a pause, a conversation, a gesture) is often easier than deciding in the moment.', 'Vopred sa dohodnúť, čo každá strana najprv potrebuje (pauzu, rozhovor, gesto), býva jednoduchšie než to rozhodovať v danej chvíli.'),
            asymmetry: l('Letting the side nearer the middle say first what it needs can balance this.', 'Ak strana bližšie k stredu povie ako prvá, čo potrebuje, môže sa to vyvážiť.'),
        },
    },
    decisions: {
        label: l('Decisions', 'Rozhodovanie a iniciatíva'),
        covers: l('Who steps in first, and how risk is weighed', 'Kto začína a ako sa váži riziko'),
        implication: {
            resonance: l('It can be quick and smooth; it is worth checking that a shared habit is not a shared blind spot.', 'Môže to ísť rýchlo a hladko; stojí za to overiť, že spoločný zvyk nie je spoločným slepým miestom.'),
            complement: l('Naming who proposes and who tests an idea can make the balance deliberate.', 'Keď sa pomenuje, kto navrhuje a kto nápad preveruje, rovnováha sa môže stať zámernou.'),
            friction: l('Agreeing beforehand how big a step may be taken without a joint decision can reduce stalls.', 'Vopred sa dohodnúť, aký veľký krok sa môže urobiť bez spoločného rozhodnutia, môže znížiť uviaznutia.'),
            asymmetry: l('A yes from the side nearer the middle is more reliable when it is asked for directly than when it is assumed.', 'Súhlas strany bližšie k stredu je spoľahlivejší, keď sa priamo žiada, než keď sa predpokladá.'),
        },
    },
    everyday: {
        label: l('Everyday Life', 'Každodenný život'),
        covers: l('Plans, change and the practical side of life', 'Plány, zmena a praktická stránka života'),
        implication: {
            resonance: l('This is a strength for daily life; it helps to watch for the one thing neither side tends to do.', 'Pre bežný deň je to opora; pomáha všímať si, čo nerobí ani jedna strana.'),
            complement: l('Dividing daily tasks by fit rather than by habit can make the balance work.', 'Ak sa každodenné úlohy delia podľa toho, čo komu sedí, a nie podľa zvyku, rovnováha môže fungovať.'),
            friction: l('Fixing one or two shared anchors in the week and leaving the rest open usually eases this.', 'Určiť si v týždni jeden-dva spoločné pevné body a zvyšok týždňa nechať bez plánu to zvyčajne zmierni.'),
            asymmetry: l('The side nearer the middle may not say how the arrangement sits with it, so it helps to ask.', 'Strana bližšie k stredu nemusí povedať, ako sedí dohoda tejto strane, preto pomáha opýtať sa.'),
        },
    },
    direction: {
        label: l('Shared Direction', 'Spoločný smer'),
        covers: l('What each is drawn to over the longer run', 'Čo každého priťahuje v dlhšom horizonte'),
        implication: {
            resonance: l('A shared motive is a strong base; it helps to ask which concrete choices it points to.', 'Spoločný motív je silný základ; pomáha opýtať sa, ku ktorým konkrétnym rozhodnutiam smeruje.'),
            complement: l('Making room for both in long-term choices keeps one from outweighing the other.', 'Ak sa pri dlhodobých voľbách nechá priestor každej strane, žiadna nepreváži nad druhou.'),
            friction: l('Naming each side’s priority before a big decision keeps it from becoming a quiet contest.', 'Keď každá strana pomenuje svoju prioritu pred veľkým rozhodnutím, nestane sa z toho tichý súboj.'),
            asymmetry: l('Asking the less marked side what it wants for the longer run keeps that direction in view.', 'Ak sa niekto opýta menej výraznej strany, čo chce v dlhšom horizonte, smer menej výraznej strany zostane na očiach.'),
        },
    },
};
export const LIMITED_TEXT = {
    quiet: l('Neither profile has a clear preference here. This comparison has nothing specific to say about it, and that says nothing about the people.', 'Ani jeden profil tu nemá jasnú preferenciu. Porovnanie k tomu nemá čo konkrétne povedať a o ľuďoch to nehovorí nič.'),
    unreadable: l('At least one profile cannot be placed here with confidence, so this area is left open.', 'Aspoň jeden profil tu nemožno spoľahlivo zaradiť, preto túto oblasť necháva porovnanie otvorenú.'),
    faint: l('Only a faint signal appears here: too slight to treat as a finding.', 'Objavuje sa tu len slabý signál: príliš slabý na to, aby sa bral ako zistenie.'),
    'single-source': l('Only one tradition points to this, so it stays a hint, not a finding.', 'Poukazuje na to len jedna tradícia, preto ide o náznak, nie o zistenie.'),
};
/** The same reasons in a few words, for a row of the map. */
export const LIMITED_BRIEF = {
    quiet: l('No clear preference on either side.', 'Ani jedna strana nemá jasnú preferenciu.'),
    unreadable: l('Cannot be placed with confidence.', 'Nemožno spoľahlivo zaradiť.'),
    faint: l('Only a faint signal.', 'Len slabý signál.'),
    'single-source': l('Only one tradition points to it.', 'Ukazuje na to len jedna tradícia.'),
};
export const DERIVED_NOTE = l('This area is a synthesis of the findings listed below, not a separate measurement: the model has not observed how this couple actually argues or reconciles.', 'Táto oblasť je syntézou nižšie uvedených zistení, nie samostatným meraním: model nepozoroval, ako sa tento pár naozaj háda alebo zmieruje.');
/** The tone labels: the only place a role is named. A role is shown with a shape as well as a word, so it never rests on colour. */
export const TONE_TEXT = {
    resonance: { label: l('In tune', 'Súlad'), hint: l('a shared direction', 'spoločný smer') },
    complement: { label: l('Complements', 'Dopĺňanie'), hint: l('a difference that can balance', 'rozdiel, ktorý sa môže vyvážiť') },
    friction: { label: l('Needs coordination', 'Vyžaduje ladenie'), hint: l('a difference that needs coordinating', 'rozdiel, ktorý treba zladiť') },
    asymmetry: { label: l('One clearer preference', 'Jedna jasnejšia preferencia'), hint: l('one side has the clearer preference, the other is nearer the middle', 'jedna strana má jasnejšiu preferenciu, druhá je bližšie k stredu') },
    mixed: { label: l('Several patterns', 'Viac vzorcov'), hint: l('parts of this area read differently', 'časti tejto oblasti sa čítajú odlišne') },
    limited: { label: l('Too little to say', 'Málo informácií'), hint: l('too little to say firmly', 'príliš málo na pevné tvrdenie') },
};
export const PATTERN_TEXT = {
    thin: l('Few areas can be read with confidence for these two profiles, so this comparison is more open than definite.', 'Pri týchto dvoch profiloch sa dá spoľahlivo čítať málo oblastí, preto je porovnanie skôr otvorené než určité.'),
};
/** The axes, named as the areas of life they are about. */
export const AXIS_TEXT = {
    'inner-focus': l('Thinking it through, or talking it out', 'Najprv v sebe, alebo nahlas'),
    reasoning: l('Logic and intuition', 'Logika a intuícia'),
    'emotional-expression': l('Showing feelings', 'Prejavovanie citov'),
    autonomy: l('Room and togetherness', 'Priestor a blízkosť'),
    visibility: l('Privacy and company', 'Súkromie a spoločnosť'),
    initiative: l('Who takes the first step', 'Kto urobí prvý krok'),
    risk: l('Caution and boldness', 'Opatrnosť a odvaha'),
    structure: l('Planning and spontaneity', 'Plány a spontánnosť'),
    change: l('Steadiness and novelty', 'Stálosť a novota'),
    abstraction: l('The practical and the big picture', 'Praktické veci a veľký obraz'),
};
/** What leaning to a pole is, as a short phrase that fits after a name. A verb phrase or a noun phrase: never an adjective, so it carries no gender in Slovak. */
export const POLE_TEXT = {
    introspective: l('thinks it through first', 'najprv si to premyslí v sebe'),
    'outwardly-engaged': l('thinks out loud', 'premýšľa nahlas v rozhovore'),
    analytical: l('weighs the logic', 'váži logiku a fakty'),
    intuitive: l('trusts intuition', 'opiera sa o intuíciu'),
    independent: l('needs room', 'potrebuje priestor'),
    collaborative: l('seeks togetherness', 'hľadá spoločnú prácu a blízkosť'),
    structured: l('keeps to a plan', 'drží sa plánu'),
    adaptable: l('adapts as things go', 'pružne sa prispôsobuje'),
    cautious: l('weighs risks first', 'najprv zvažuje riziká'),
    'risk-oriented': l('leans to bold steps', 'prikláňa sa k odvážnym krokom'),
    'emotionally-expressive': l('shows feelings openly', 'city ukazuje otvorene'),
    'emotionally-contained': l('keeps feelings close', 'city drží bližšie pri sebe'),
    private: l('values privacy', 'si cení súkromie'),
    social: l('draws energy from company', 'čerpá energiu zo spoločnosti'),
    'stability-seeking': l('prefers what is steady', 'uprednostňuje stálosť'),
    'novelty-seeking': l('looks for something new', 'hľadá nové'),
    assertive: l('steps in first', 'robí prvý krok'),
    receptive: l('waits and responds', 'počká a odpovie'),
    practical: l('keeps to the concrete', 'drží sa konkrétneho'),
    conceptual: l('looks at the big picture', 'sa pozerá na veľký obraz'),
    mastery: l('mastery', 'majstrovstvo'),
    achievement: l('achievement', 'úspech a výsledky'),
    recognition: l('recognition', 'uznanie'),
    meaning: l('meaning', 'zmysel'),
    belonging: l('belonging', 'spolupatričnosť'),
    freedom: l('freedom', 'sloboda'),
    care: l('care', 'starostlivosť'),
    understanding: l('understanding', 'porozumenie'),
    'self-expression': l('self-expression', 'sebavyjadrenie'),
    beauty: l('beauty', 'krása'),
};
export const STANCE_TEXT = {
    middle: l('sits in the middle here', 'je tu uprostred'),
    mixed: l('is pulled both ways', 'ťahá to oboma smermi'),
    none: l('cannot be placed here with confidence', 'tu nemožno spoľahlivo zaradiť'),
    slight: l('slightly', 'mierne'),
    clear: l('clearly', 'výrazne'),
    driveLabel: l('led by', 'pohnútka'),
};
export const UI_TEXT = {
    kicker: l('Romantic relationship', 'Partnerský vzťah'),
    frame: l('A symbolic comparison of two profiles. It describes tendencies and does not measure the relationship or predict it.', 'Symbolické porovnanie dvoch profilov. Opisuje sklony; vzťah nemeria ani nepredpovedá.'),
    mapTitle: l('Relationship map', 'Mapa vzťahu'),
    mapHint: l('Tap an area to see what the profiles show and why.', 'Ťukni na oblasť a uvidíš, čo profily ukazujú a prečo.'),
    connects: l('What connects you', 'Čo vás spája'),
    complements: l('How you complement each other', 'V čom sa dopĺňate'),
    tension: l('Where tension may arise', 'Kde môže vznikať napätie'),
    attention: l('Where to pay attention', 'Na čo si dať pozor'),
    emptyConnects: l('No clear shared pattern stands out in this comparison.', 'V tomto porovnaní nevyniká jasný spoločný vzorec.'),
    emptyComplements: l('No clear complementary pattern stands out in this comparison.', 'V tomto porovnaní nevyniká jasné dopĺňanie.'),
    emptyAttention: l('No clear point of tension stands out in this comparison. That describes these profiles; it is not a promise about the relationship.', 'V tomto porovnaní nevyniká jasné miesto napätia. Opisuje to tieto profily, nie je to sľub o vzťahu.'),
    open: l('Open this area', 'Otvoriť oblasť'),
    coverage: l('Supported by more than one tradition', 'Podložené viac než jednou tradíciou'),
    coverageUnit: l('areas', 'oblastí'),
    coverageNote: l('This counts where the traditions agree with one another. It does not measure how accurate the comparison is.', 'Počíta, kde sa tradície navzájom zhodujú. Nemeria, nakoľko je porovnanie presné.'),
    of: l('of', 'zo'),
    derivedFrom: l('Derived from', 'Vychádza z'),
    inPractice: l('In practice', 'V praxi'),
    howFirm: l('Symbolic support', 'Symbolická opora'),
    strength: l('signal', 'signál'),
    strengthWord: { strong: l('strong', 'silný'), moderate: l('moderate', 'stredný'), faint: l('faint', 'slabý') },
    support: { firm: l('two independent kinds of tradition', 'dva nezávislé druhy tradícií'), supported: l('several traditions of one kind', 'viacero tradícií jedného druhu'), 'single-source': l('one tradition only', 'iba jedna tradícia') },
    pulledBoth: l('pulled both ways', 'ťahá to oboma smermi'),
    /* said after a finding when its words would otherwise say more than the positions do */
    qualHedgedOne: l('{who} also feels the opposite pull here.', '{who} tu zároveň zažíva aj opačný ťah.'),
    qualHedgedBoth: l('{a} and {b} both also feel the opposite pull here.', '{a} aj {b} tu zároveň zažívajú aj opačný ťah.'),
    qualSlightBoth: l('The lean is slight in both.', 'Sklon je v oboch profiloch len mierny.'),
    qualSlightLean: l('The preference is only slight.', 'Preferencia je len mierna.'),
    qualSlightOne: l('At least one of the two leans only slightly.', 'Aspoň jeden sklon je len mierny.'),
    timeNote: l('At least one birth time is approximate or unknown, so the parts of the chart that depend on it are left out or estimated.', 'Čas narodenia aspoň jednej osoby je približný alebo neznámy, preto sa časti mapy, ktoré na čase závisia, vynechávajú alebo odhadujú.'),
    limitsTitle: l('What this map says and what it does not', 'Čo mapa hovorí a čo nie'),
    legend: l('Shapes show the kind of relationship in each area; the word beside the shape says it too.', 'Tvar ukazuje druh vzťahu v oblasti; rovnako to hovorí slovo vedľa tvaru.'),
    closeToggle: l('Collapse', 'Zbaliť'),
    /* the dashboard (English first) */
    dashKicker: en('Romantic Connections'),
    ringTitle: en('Relationship pattern'),
    ringHint: en('Tap a dimension to explore it.'),
    railLabel: en('The seven dimensions of your relationship'),
    derivedTag: en('derived'),
    drawnFrom: en('Drawn from'),
    insightsTitle: en('Three things to notice'),
    gaugePending: en('No overall score is shown.'),
    gaugeCentre: en('Pattern'),
    demoRibbon: en('DEMO VALUE · not a relationship result'),
    setupTitle: en('Romantic Connections'),
    setupLead: en('Select a person to explore your relationship.'),
    setupPartner: en('Your partner'),
    readingAs: en('Reading as {name}'),
    explore: en('Explore connection'),
};
/** The four traditions, as named on the evidence line of a finding. */
export const PILLAR_TEXT = {
    astrology: l('Western astrology', 'Západná astrológia'),
    'human-design': l('Human Design', 'Human Design'),
    bazi: l('BaZi', 'BaZi'),
    numerology: l('Numerology', 'Numerológia'),
};
export const FINDINGS = {
    'inner-focus': {
        shared: [
            l('{a} and {b} both tend to think things through inside before they speak, so quiet may feel normal between them.', '{a} aj {b} majú sklon najprv veci premyslieť v sebe, takže ticho medzi nimi môže pôsobiť prirodzene.'),
            l('{a} and {b} both tend to think out loud, so a feeling is likely to reach words quickly.', '{a} aj {b} majú sklon premýšľať nahlas, takže sa pocit môže rýchlo dostať do slov.'),
        ],
        opposed: l('{p0} tends to think things through inside and {p1} out loud, so the same pause can mean “still thinking” or “pulling away”, depending on who reads it.', '{p0} má sklon premýšľať v sebe a {p1} nahlas, takže tá istá pauza môže znamenať „ešte rozmýšľam“ aj „odťahujem sa“, podľa toho, kto sa na pauzu pozerá.'),
        lean: [
            l('{lean} tends to think things through inside first; {flex} sits nearer the middle.', '{lean} má sklon najprv veci premyslieť v sebe; {flex} je bližšie k stredu.'),
            l('{lean} tends to think out loud; {flex} sits nearer the middle.', '{lean} má sklon premýšľať nahlas; {flex} je bližšie k stredu.'),
        ],
    },
    reasoning: {
        shared: [
            l('{a} and {b} both lean on logic and facts when they weigh something up.', '{a} aj {b} sa pri vážení vecí opierajú o logiku a fakty.'),
            l('{a} and {b} both trust intuition and the feel of a situation when they weigh something up.', '{a} aj {b} sa pri vážení vecí spoliehajú na intuíciu a cit pre situáciu.'),
        ],
        opposed: l('{p0} leans on logic and facts, {p1} on intuition, so together they may cover angles that neither would reach alone.', '{p0} sa opiera o logiku a fakty, {p1} o intuíciu, takže spolu môžu pokryť uhly pohľadu, ktoré by samostatne nezvládli.'),
        lean: [
            l('{lean} leans on logic and facts; {flex} sits nearer the middle between logic and intuition.', '{lean} sa opiera o logiku a fakty; {flex} je bližšie k stredu medzi logikou a intuíciou.'),
            l('{lean} trusts intuition; {flex} sits nearer the middle between intuition and logic.', '{lean} sa spolieha na intuíciu; {flex} je bližšie k stredu medzi intuíciou a logikou.'),
        ],
    },
    autonomy: {
        shared: [
            l('{a} and {b} both seem to need plenty of room, so time apart may feel natural rather than like distance.', '{a} aj {b} zrejme potrebujú dosť priestoru, takže čas osobitne môže pôsobiť prirodzene, nie ako odstup.'),
            l('{a} and {b} both seem to look for a lot of togetherness, so shared time may matter a great deal.', '{a} aj {b} zrejme hľadajú veľa spoločného času, takže spoločný čas môže mať veľkú váhu.'),
        ],
        opposed: l('{p0} needs more room and {p1} more togetherness, so a wish for space can sound like withdrawal and a wish for closeness like pressure.', '{p0} potrebuje viac priestoru a {p1} viac blízkosti, takže túžba po priestore môže znieť ako ústup a túžba po blízkosti ako tlak.'),
        lean: [
            l('{lean} clearly needs room; {flex} sits nearer the middle between room and togetherness.', '{lean} jasne potrebuje priestor; {flex} je bližšie k stredu medzi priestorom a blízkosťou.'),
            l('{lean} clearly looks for togetherness; {flex} sits nearer the middle between togetherness and room.', '{lean} jasne hľadá spoločný čas; {flex} je bližšie k stredu medzi blízkosťou a priestorom.'),
        ],
    },
    structure: {
        shared: [
            l('{a} and {b} both prefer a plan to leaving things open, so shared arrangements may be easy to make.', '{a} aj {b} majú radšej plán než otvorené veci, takže spoločné dohody sa môžu robiť ľahko.'),
            l('{a} and {b} both prefer to keep things open and adjust as they go, so plans may stay loose.', '{a} aj {b} majú radšej veci otvorené a prispôsobujú sa za pochodu, takže plány môžu zostať voľné.'),
        ],
        opposed: l('{p0} likes a plan and {p1} likes to keep things open, so the same day can feel too planned and too loose at once, depending on who looks at it.', '{p0} uprednostňuje plán a {p1} radšej nechá veci otvorené, takže ten istý deň môže pôsobiť príliš naplánovane aj príliš voľne, podľa toho, kto sa na deň pozerá.'),
        lean: [
            l('{lean} tends to keep to a plan; {flex} sits nearer the middle between plan and improvisation.', '{lean} má sklon držať sa plánu; {flex} je bližšie k stredu medzi plánom a improvizáciou.'),
            l('{lean} tends to keep things open and adjust as they go; {flex} sits nearer the middle.', '{lean} má sklon nechať veci otvorené a prispôsobovať sa za pochodu; {flex} je bližšie k stredu.'),
        ],
    },
    risk: {
        shared: [
            l('{a} and {b} both weigh risks before they act, so big steps are likely to be taken carefully.', '{a} aj {b} najprv zvažujú riziká, takže veľké kroky sa môžu robiť opatrne.'),
            l('{a} and {b} both lean toward bold steps, so decisions can move fast.', '{a} aj {b} sa prikláňajú k odvážnym krokom, takže rozhodnutia môžu ísť rýchlo.'),
        ],
        opposed: l('{p0} weighs risks first and {p1} leans toward bold steps, so a decision can stall between caution and boldness.', '{p0} najprv zvažuje riziká a {p1} sa prikláňa k odvážnym krokom, takže rozhodnutie môže uviaznuť medzi opatrnosťou a odvahou.'),
        lean: [
            l('{lean} tends to weigh risks first; {flex} sits nearer the middle between caution and boldness.', '{lean} má sklon najprv zvažovať riziká; {flex} je bližšie k stredu medzi opatrnosťou a odvahou.'),
            l('{lean} tends toward bold steps; {flex} sits nearer the middle between boldness and caution.', '{lean} má sklon k odvážnym krokom; {flex} je bližšie k stredu medzi odvahou a opatrnosťou.'),
        ],
    },
    'emotional-expression': {
        shared: [
            l('{a} and {b} both tend to show feelings openly, so what is felt is likely to be visible between them.', '{a} aj {b} majú sklon ukazovať city otvorene, takže city môžu byť medzi nimi dobre viditeľné.'),
            l('{a} and {b} both tend to keep feelings close, so a feeling can stay unspoken until someone says it aloud.', '{a} aj {b} majú sklon držať city bližšie pri sebe, takže cit môže zostať nevyslovený, kým sa nepovie nahlas.'),
        ],
        opposed: l('{p0} shows feelings openly and {p1} keeps them closer, which can balance warmth and calm, or look like pressure on one side and distance on the other.', '{p0} ukazuje city otvorene a {p1} ich drží bližšie pri sebe, čo môže vyvážiť vrúcnosť a pokoj, ale aj pôsobiť ako tlak a ako odstup.'),
        lean: [
            l('{lean} tends to show feelings openly; {flex} sits nearer the middle.', '{lean} má sklon ukazovať city otvorene; {flex} je bližšie k stredu.'),
            l('{lean} tends to keep feelings close; {flex} sits nearer the middle.', '{lean} má sklon držať city bližšie pri sebe; {flex} je bližšie k stredu.'),
        ],
    },
    visibility: {
        shared: [
            l('{a} and {b} both value privacy, so a quiet life for two may suit them.', '{a} aj {b} si cenia súkromie, takže pokojný život vo dvojici im môže sedieť.'),
            l('{a} and {b} both draw energy from company, so a shared social life may feel natural.', '{a} aj {b} čerpajú energiu zo spoločnosti, takže spoločný spoločenský život môže pôsobiť prirodzene.'),
        ],
        opposed: l('{p0} values privacy and {p1} draws energy from company, so the balance between evenings in and evenings out may need agreeing.', '{p0} si cení súkromie a {p1} čerpá energiu zo spoločnosti, preto sa môže hodiť dohodnúť rovnováhu medzi večermi doma a vonku.'),
        lean: [
            l('{lean} values privacy; {flex} sits nearer the middle between privacy and company.', '{lean} si cení súkromie; {flex} je bližšie k stredu medzi súkromím a spoločnosťou.'),
            l('{lean} draws energy from company; {flex} sits nearer the middle between company and privacy.', '{lean} čerpá energiu zo spoločnosti; {flex} je bližšie k stredu medzi spoločnosťou a súkromím.'),
        ],
    },
    change: {
        shared: [
            l('{a} and {b} both prefer what is steady, so routines may feel comfortable.', '{a} aj {b} uprednostňujú stálosť, takže rutina môže pôsobiť pohodlne.'),
            l('{a} and {b} both look for something new, so variety may come easily and steadiness may need attention.', '{a} aj {b} hľadajú nové veci, takže rozmanitosť môže prísť ľahko a stálosť môže potrebovať pozornosť.'),
        ],
        opposed: l('{p0} prefers what is steady and {p1} looks for something new, so the wish to keep a routine can meet the wish to change it.', '{p0} uprednostňuje stálosť a {p1} hľadá nové, takže chuť udržať rutinu sa môže stretnúť s chuťou rutinu zmeniť.'),
        lean: [
            l('{lean} tends to prefer what is steady; {flex} sits nearer the middle between steadiness and novelty.', '{lean} má sklon uprednostňovať stálosť; {flex} je bližšie k stredu medzi stálosťou a novosťou.'),
            l('{lean} tends to look for something new; {flex} sits nearer the middle between novelty and steadiness.', '{lean} má sklon hľadať nové; {flex} je bližšie k stredu medzi novosťou a stálosťou.'),
        ],
    },
    initiative: {
        shared: [
            l('{a} and {b} both tend to step in first, so who starts something may need a word now and then.', '{a} aj {b} majú sklon robiť prvý krok, takže môže byť občas potrebné dohodnúť, kto začne.'),
            l('{a} and {b} both tend to wait and respond, so a decision can wait until someone takes the lead.', '{a} aj {b} majú sklon počkať a odpovedať, takže rozhodnutie môže čakať, kým sa niekto neujme iniciatívy.'),
        ],
        opposed: l('{p0} tends to step in first and {p1} to wait and respond, which can combine initiative with care.', '{p0} má sklon robiť prvý krok a {p1} počkať a odpovedať, čo môže spojiť iniciatívu s ohľaduplnosťou.'),
        lean: [
            l('{lean} tends to step in first; {flex} sits nearer the middle between starting and waiting.', '{lean} má sklon robiť prvý krok; {flex} je bližšie k stredu medzi začatím a čakaním.'),
            l('{lean} tends to wait and respond; {flex} sits nearer the middle between waiting and starting.', '{lean} má sklon počkať a odpovedať; {flex} je bližšie k stredu medzi čakaním a začatím.'),
        ],
    },
    abstraction: {
        shared: [
            l('{a} and {b} both keep to the concrete, so practical matters are likely to be handled in a similar way.', '{a} aj {b} sa držia konkrétneho, takže praktické veci sa môžu riešiť podobne.'),
            l('{a} and {b} both look at the big picture, so ideas may flow easily while the details need someone to own them.', '{a} aj {b} sa pozerajú na veľký obraz, takže nápady môžu plynúť ľahko, kým detaily potrebujú niekoho, kto sa ich ujme.'),
        ],
        opposed: l('{p0} keeps to the concrete and {p1} looks at the big picture, which together can cover more ground.', '{p0} sa drží konkrétneho a {p1} sa pozerá na veľký obraz, čo spolu môže pokryť viac.'),
        lean: [
            l('{lean} tends to keep to the concrete; {flex} sits nearer the middle between the concrete and the big picture.', '{lean} má sklon držať sa konkrétneho; {flex} je bližšie k stredu medzi konkrétnym a veľkým obrazom.'),
            l('{lean} tends to look at the big picture; {flex} sits nearer the middle between the big picture and the concrete.', '{lean} má sklon pozerať sa na veľký obraz; {flex} je bližšie k stredu medzi veľkým obrazom a konkrétnym.'),
        ],
    },
};
/** What the drives say. {a} {b} are the people, {d} the one drive both share, {dA} {dB} each person's own; the drives are nouns, set after a label. */
export const DRIVE_FINDINGS = {
    'shared-drive': l('Both profiles are led by the same motive ({d}), which can give the relationship a common direction.', 'Oba profily vedie rovnaká pohnútka ({d}), čo môže dať vzťahu spoločný smer.'),
    'drives-pull-apart': l('{a} is led by {dA} and {b} by {dB}: two motives that can pull in different directions.', '{a} · pohnútka: {dA}; {b} · pohnútka: {dB}. Tieto dve pohnútky sa môžu ťahať rôznymi smermi.'),
    'different-drives': l('{a} is led by {dA} and {b} by {dB}: different motives that can widen what the relationship looks for.', '{a} · pohnútka: {dA}; {b} · pohnútka: {dB}. Odlišné pohnútky môžu rozšíriť to, čo vzťah hľadá.'),
};
