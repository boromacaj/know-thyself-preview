import { foldText, padded } from './questionText.js?v=b5ef5ed';
export function compileCues(cues) {
    return cues.map((source) => {
        const prefix = source.endsWith('*');
        const folded = foldText(prefix ? source.slice(0, -1) : source);
        return { needle: prefix ? ` ${folded}` : ` ${folded} `, prefix, source };
    });
}
/** The cues found in a folded question, as their source text. */
export function cuesIn(paddedFolded, cues) {
    return cues.filter((cue) => paddedFolded.includes(cue.needle)).map((cue) => cue.source);
}
export const anyCue = (paddedFolded, cues) => cues.some((cue) => paddedFolded.includes(cue.needle));
const compiled = (table) => Object.fromEntries(Object.entries(table).map(([key, cues]) => [key, compileCues(cues)]));
/* ------------------------------------------------------------ language -- */
/** Function words that decide EN against SK. Diacritic letters are counted separately. */
export const LANGUAGE_CUES = compiled({
    en: [
        'the', 'is', 'are', 'my', 'me', 'i', 'should', 'will', 'what', 'how', 'why', 'when', 'or', 'and',
        'of', 'with', 'about', 'does', 'am', 'can', 'this', 'that', 'it', 'not',
    ],
    sk: [
        'som', 'je', 'sa', 'si', 'ma', 'mam', 'co', 'ako', 'preco', 'kedy', 'alebo', 'ci', 'ze', 'na',
        'moj', 'moja', 'moje', 'mi', 'mu', 'jej', 'bude', 'budem', 'mal', 'mala', 'ktory', 'ktora', 'kde',
        'aky', 'aka', 'aj', 'ale', 'nie', 'ani', 'pre', 'vo', 'zo',
    ],
});
/** Letters Slovak uses and English does not. One of these in a question is a strong signal. */
export const SLOVAK_LETTERS = /[áäčďéíĺľňóôŕšťúýž]/i;
/* ------------------------------------------------------------ structure -- */
export const STRUCTURE_CUES = compiled({
    whWords: [
        'what', 'how', 'why', 'when', 'where', 'who', 'which', 'whom', 'whose',
        'čo', 'ako', 'prečo', 'kedy', 'kde', 'kto', 'aký', 'aká', 'aké', 'ktorý', 'ktorá', 'ktoré', 'koľko', 'kam', 'odkiaľ', 'komu', 'koho',
    ],
    yesNoOpeners: [
        'will', 'is', 'are', 'am', 'does', 'do', 'did', 'can', 'could', 'would', 'should', 'shall', 'has', 'have', 'was', 'were',
    ],
    future: [
        'future', 'ahead', 'coming', 'upcoming', 'next', 'soon', 'eventually', 'heading', 'going to', 'turn out',
        'end up', 'where is this going', 'where this is going', 'where is it going', 'outlook', 'prospects', 'trajectory',
        'what lies', 'what is in store', 'what awaits', 'will',
        'budúc*', 'čaká', 'čakajú', 'bude', 'budem', 'budeme', 'budú', 'smeruje', 'smerujem', 'smerujeme', 'dopadne', 'skončí',
        'vyvinie', 'najbližš*', 'nasledujúc*', 'o rok', 'o mesiac', 'čoskoro',
        'dostanem', 'získam', 'podarí', 'vyjde', 'stane', 'zvládnem',
    ],
    choice: [
        'torn between', 'which one', 'which should i', 'which is better', 'which path', 'which option', 'choose between', 'decide between',
        'two options', 'two choices', 'two offers', 'two paths',
        'ktorú si mám vybrať', 'ktorú z', 'ktorá z', 'rozhoduj*', 'rozdvojen*', 'vybrať si', 'dve možnosti', 'dve ponuky',
    ],
    past: [
        'past', 'used to', 'why did', 'what happened', 'ago', 'history', 'back then',
        'minulos*', 'kedysi', 'pred rokmi', 'stalo',
    ],
    problemRecurrence: [
        'keeps happening', 'keep happening', 'keep doing', 'keep ending up', 'keeps coming back', 'again and again',
        'over and over', 'always', 'never', 'every time', 'same pattern', 'recurring', 'repeat*', 'pattern', 'cycle',
        'stále', 'znova', 'opäť', 'opakuj*', 'vzorec', 'vždy', 'nikdy', 'zakaždým', 'dokola', 'cyklus',
    ],
    problemBlock: [
        'stuck', 'block*', 'blocking', 'holding me back', 'obstacle*', 'struggle', 'struggling', 'can t seem', 'cannot seem',
        'what is wrong', 'going wrong', 'problem*', 'issue*', 'difficult*',
        'zasek*', 'zaseknut*', 'blok*', 'prekáž*', 'problém*', 'bráni', 'drží ma', 'nedarí', 'ide zle', 'trápi',
    ],
    why: ['why', 'prečo', 'dôvod', 'reason for'],
    action: [
        'what should i', 'what can i do', 'what do i do', 'how should i', 'how can i', 'how do i', 'how to', 'how could i',
        'how might i', 'what do i need', 'next step*', 'best way to', 'what would help', 'advice', 'guidance on how',
        'what steps', 'what action', 'how do we', 'what can we do', 'what should we',
        'čo mám', 'čo môžem', 'čo robiť', 'ako mám', 'ako môžem', 'ako by som', 'ako na', 'ako postupovať', 'ďalší krok',
        'ďalšie kroky', 'poraď*', 'čo by pomohlo', 'čo môžeme', 'čo máme', 'ako máme', 'ako sa vysporiadať',
    ],
    goNoGo: [
        'is it a good idea to', 'is it wise to', 'is it time to', 'is it right to', 'would it be better to', 'do i take', 'do i accept',
        'is it worth', 'should we',
        'je dobrý nápad', 'oplatí sa', 'je čas', 'má zmysel',
    ],
    reflection: [
        'overall', 'in general', 'general*', 'check in', 'check-in', 'how am i', 'big picture', 'balance', 'where am i',
        'my life', 'right now', 'at the moment', 'this week', 'this month', 'today',
        'celkov*', 'všeobecn*', 'ako sa mám', 'kde sa nachádzam', 'rovnováh*', 'môj život', 'momentálne', 'práve teraz', 'tento týždeň', 'tento mesiac', 'dnes',
    ],
    singleFocus: [
        'one card', 'single card', 'a card', 'card of the day', 'daily card', 'card for today', 'focus for today', 'focus on today',
        'one word', 'quick answer', 'quick read', 'quick reading',
        'jedna karta', 'jednu kartu', 'jednej karte', 'karta dňa', 'karta na dnes', 'na čo sa dnes zamerať', 'na čo sa zamerať dnes', 'jedno slovo',
    ],
    blindSpot: [
        'not seeing', 'can t see', 'cannot see', 'overlook*', 'what am i missing', 'missing something', 'blind spot*', 'hidden',
        'don t understand', 'do not understand', 'unaware', 'what i am not', 'what is hidden', 'what i can t see',
        'nevidím', 'prehliadam', 'uniká mi', 'čo mi uniká', 'slepá škvrna', 'skryt*', 'nechápem', 'čo si nevšímam', 'čo nevidím',
    ],
    resources: [
        'strength*', 'resource*', 'what supports me', 'what do i have', 'what helps me', 'my gifts', 'talent*', 'assets',
        'what can i rely on', 'what do i bring', 'support me',
        'silné stránky', 'zdroje', 'čo ma podporuje', 'čo mi pomáha', 'talent*', 'dary', 'o čo sa môžem oprieť', 'čo mám k dispozícii',
    ],
});
/* ---------------------------------------------------------- domain cues -- */
export const DOMAIN_CUES = compiled({
    career: [
        'job', 'work', 'working', 'career', 'promotion', 'salary', 'interview', 'hired', 'fired', 'resign*', 'business',
        'company', 'startup', 'office', 'profession*', 'employer', 'employment', 'workplace', 'client*', 'colleague*', 'boss',
        'práca', 'práci', 'prácu', 'práce', 'zamestn*', 'kariér*', 'povýšen*', 'plat', 'pohovor*', 'firm*', 'podnik*', 'živnos*', 'povolani*', 'šéf', 'kolega',
    ],
    creativity: [
        'creative', 'creativity', 'art', 'artist*', 'artwork', 'writing', 'write', 'novel', 'music', 'song*', 'paint*', 'design*',
        'project*', 'inspiration', 'create', 'creating', 'craft', 'poem*', 'story', 'album',
        'tvori*', 'tvorb*', 'tvorivos*', 'kreatív*', 'umen*', 'písa*', 'román*', 'hudb*', 'maľ*', 'nápad*', 'inšpirác*', 'básn*', 'projekt*',
    ],
    emotional: [
        'feel', 'feeling*', 'feelings', 'sad', 'sadness', 'anxious', 'anxiety', 'worried', 'worry', 'angry', 'anger', 'lonely',
        'loneliness', 'grief', 'grieving', 'afraid', 'fear', 'overwhelmed', 'heartbroken', 'jealous', 'ashamed', 'hurt', 'upset',
        'cítim', 'cítiť', 'pocit*', 'smutn*', 'smútok', 'úzkos*', 'obav*', 'strach*', 'osamel*', 'hnev*', 'bolest*', 'žiaľ', 'žiarliv*', 'zranen*',
    ],
    spiritual: [
        'meaning', 'purpose', 'soul', 'spiritual*', 'faith', 'higher self', 'universe', 'divine', 'meditat*', 'calling', 'destiny',
        'zmysel', 'poslanie', 'duša', 'duši', 'duchovn*', 'viera', 'vieru', 'vesmír*', 'božsk*', 'meditá*', 'povolanie',
    ],
    selfDevelopment: [
        'grow', 'growth', 'habit*', 'discipline', 'confidence', 'self esteem', 'improve', 'become', 'better version', 'personal development',
        'learn*', 'change myself', 'self worth',
        'rast', 'rastiem', 'rásť', 'návyk*', 'disciplín*', 'sebavedom*', 'sebaúct*', 'zlepš*', 'stať sa', 'lepšia verzia', 'osobný rast', 'učiť sa', 'zmeniť seba',
    ],
});
const person = (role, type, cues) => ({ role, type, cues: compileCues(cues) });
/**
 * Other people, by ROLE. Never by name: a name is declined in Slovak and
 * guessed wrongly in English, and the reading needs only to know what kind of
 * person is on the other side.
 *
 * `priateľ` and `vzťah` are deliberately NOT romantic: in Slovak `môj priateľ`
 * is a boyfriend or a friend, and `vzťah` is any relationship. Typing them as
 * romantic would put the wrong word in a position label.
 */
export const PEOPLE = [
    person('partner', 'romantic', [
        'partner*', 'boyfriend', 'girlfriend', 'husband', 'wife', 'spouse', 'fiance*', 'fiancee', 'lover', 'crush', 'dating',
        'married', 'marriage', 'wedding', 'in love', 'love interest', 'soulmate', 'twin flame', 'romantic*', 'sweetheart', 'situationship',
        'frajer*', 'frajerk*', 'manžel*', 'manželk*', 'snúben*', 'láska', 'lásku', 'láske', 'zaľúben*', 'svadb*', 'romantick*', 'randen*', 'milenec', 'milenk*', 'partnerk*',
    ]),
    person('ex', 'romantic', [
        'ex', 'exboyfriend', 'exgirlfriend', 'ex boyfriend', 'ex girlfriend', 'my ex', 'former partner', 'expartner*', 'expriatel*',
        'bývalý', 'bývalá', 'bývalého', 'bývalej', 'bývalou', 'bývalí',
    ]),
    person('parent', 'family', [
        'mother', 'mom', 'mum', 'mommy', 'father', 'dad', 'daddy', 'parent*', 'stepmother', 'stepfather',
        'matka', 'matky', 'matku', 'matke', 'mama', 'mamy', 'mamu', 'mame', 'mamou', 'mamka', 'mamku', 'mamke', 'otec', 'otca', 'otcovi', 'otcom', 'ocko', 'rodič*', 'rodiny',
    ]),
    person('child', 'family', [
        'son', 'daughter', 'child', 'children', 'kid', 'kids', 'baby',
        'syn', 'syna', 'synovi', 'synom', 'dcéra', 'dcéru', 'dcére', 'dcérou', 'dieťa', 'dieťaťa', 'deti', 'detí', 'dieťatko',
    ]),
    person('sibling', 'family', [
        'brother', 'sister', 'sibling*', 'brat', 'brata', 'bratovi', 'bratom', 'bratia', 'sestra', 'sestru', 'sestre', 'sestrou', 'súrodenc*', 'surodenc*',
    ]),
    person('relative', 'family', [
        'grandmother', 'grandfather', 'grandma', 'grandpa', 'aunt', 'uncle', 'cousin', 'family', 'in laws', 'mother in law', 'father in law',
        'babka', 'babku', 'babke', 'dedko', 'dedka', 'teta', 'tetu', 'strýk*', 'bratranec', 'sesternic*', 'rodin*', 'svokr*', 'svokor*',
    ]),
    person('friend', 'friend', [
        'friend', 'friends', 'friendship', 'best friend', 'bestie', 'buddy',
        'kamarát*', 'kamarátk*', 'kamoš*', 'kamošk*', 'priateľstv*',
    ]),
    person('close-person', 'other', [
        'priateľ', 'priateľa', 'priateľovi', 'priateľom', 'priateľka', 'priateľku', 'priateľke', 'priateľkou',
    ]),
    person('boss', 'work', [
        'boss', 'manager', 'supervisor', 'employer', 'šéf', 'šéfa', 'šéfovi', 'šéfom', 'šéfka', 'nadriaden*', 'zamestnávateľ*',
    ]),
    person('colleague', 'work', [
        'colleague*', 'coworker*', 'co worker*', 'teammate*', 'team', 'client*', 'customer*', 'business partner',
        'kolega', 'kolegu', 'kolegovi', 'kolegom', 'kolegovia', 'kolegyn*', 'spolupracovn*', 'klient*', 'tím', 'tým',
    ]),
];
/** The relationship as a SUBJECT, with no role named: "our relationship", "náš vzťah". */
export const RELATIONSHIP_WORDS = compileCues([
    'relationship*', 'between us', 'our relationship', 'with him', 'with her', 'with them', 'we two', 'the two of us',
    'vzťah*', 'vzťahu', 'medzi nami', 'náš vzťah', 's ním', 's ňou', 's nimi', 'my dvaja', 'my dve',
]);
/** A person's FEELINGS or intentions asked about: the classic relationship question. */
export const OTHER_PERSON_CUES = compileCues([
    'does he', 'does she', 'do they', 'is he', 'is she', 'what does he', 'what does she', 'what do they', 'what is he', 'what is she',
    'will he', 'will she', 'miss me', 'love me', 'like me', 'want me', 'think of me', 'thinks about me', 'feel about me', 'feels about me',
    'on ma', 'ona ma', 'čo si myslí', 'myslí na mňa', 'má ma rád', 'má ma rada', 'chýbam mu', 'chýbam jej', 'miluje ma', 'chce ma',
    'ozve sa', 'napíše', 'cíti ku mne', 'cíti voči mne',
]);
/* ---------------------------------------------------------- sensitivity -- */
/**
 * What a card reading must not pretend to settle.
 *
 * Deliberately specific. A flag changes what the reading does (see
 * questionSafety.ts), so a cue that fires on ordinary questions would degrade
 * ordinary readings; each list is therefore kept to words that carry the
 * subject on their own. Where a word is ordinary and only some uses are
 * sensitive, the cue is a phrase.
 */
export const SENSITIVITY_CUES = compiled({
    'self-harm': [
        'suicide', 'suicidal', 'kill myself', 'killing myself', 'end my life', 'ending my life', 'take my own life', 'want to die',
        'wanna die', 'wish i was dead', 'wish i were dead', 'better off dead', 'self harm', 'hurt myself', 'hurting myself',
        'cut myself', 'cutting myself', 'don t want to live', 'do not want to live', 'no reason to live', 'end it all', 'don t want to be here',
        'samovraž*', 'zabiť sa', 'zabijem sa', 'ukončiť život', 'ukončiť si život', 'nechcem žiť', 'nechcem už žiť', 'chcem zomrieť', 'chcem umrieť',
        'ublížiť si', 'ubližujem si', 'porezať sa', 'porezávam sa', 'nechcem tu byť', 'nemá zmysel žiť', 'nemám prečo žiť',
        /* Routing correction (Guided Tarot V1 task): word order, the "any more" forms and the EN/SK parity of "end it all" that the first lists missed. */
        'do not want to be here', 'do not want to be here any more', 'do not want to be here anymore', 'not worth living', 'life is not worth living',
        'life isn t worth living', 'no point in living', 'rather be dead', 'wish i was never born', 'wish i had never been born', 'hang myself',
        'never wake up', 'wish i would not wake up', 'wish i wouldn t wake up', 'tired of living', 'take my life',
        'sa zabiť', 'zabil by som sa', 'zabila by som sa', 'idem sa zabiť', 'vziať si život', 'zobrať si život', 'skoncovať so sebou', 'skoncovať so životom',
        'skončiť so životom', 'ukončiť to všetko', 'to všetko ukončiť', 'to všetko skončiť', 'skončiť to všetko', 'nechcem tu už byť', 'nechcem už byť tu',
        'nechcem tu viac byť', 'radšej by som nežil', 'radšej by som nežila', 'nechcem sa zobudiť', 'keby som sa nezobudil', 'keby som sa nezobudila',
        'nemá cenu žiť', 'nestojí za to žiť', 'život nemá zmysel', 'život nemá cenu', 'obesiť sa', 'chcem byť mŕtv*', 'chcela by som byť mŕtva', 'rád by som zomrel',
        'rada by som zomrela', 'unavený zo života', 'unavená zo života',
    ],
    distress: [
        'hopeless', 'worthless', 'can t go on', 'cannot go on', 'no way out', 'nobody would miss me', 'no point anymore',
        'can t cope', 'cannot cope', 'panic attack*', 'completely broken', 'can t take it anymore',
        'beznádejn*', 'bezcenn*', 'nevidím východisko', 'nezvládam to', 'už nevládzem', 'nikomu by nechýbal', 'nikomu by nechýbala', 'záchvat paniky', 'záchvaty paniky',
        /* Ambiguous wordings of the same weight: they bound the reading (steadying spread and a caring notice) without being taken as an intent to act. */
        'just disappear', 'disappear forever', 'disappear for good', 'disappear completely', 'disappear from the world', 'disappear from this world',
        'wish i could disappear', 'wish i could vanish', 'vanish forever', 'can t do this anymore', 'can t do this any more', 'cannot do this anymore',
        'nothing matters anymore', 'nothing matters any more', 'give up on everything', 'burden to everyone', 'burden to my family', 'nobody cares about me',
        'jednoducho zmiznúť', 'chcem zmiznúť', 'chcela by som zmiznúť', 'zmiznúť navždy', 'zmiznúť zo sveta', 'už to nezvládam', 'viac to nezvládam',
        'už nič nemá zmysel', 'nič nemá zmysel', 'som príťaž', 'som na ťarchu', 'nikomu na mne nezáleží',
    ],
    medical: [
        'diagnos*', 'cancer', 'tumor', 'tumour', 'chemo*', 'illness', 'disease', 'symptom*', 'infection', 'biopsy', 'blood test',
        'my doctor', 'the doctor', 'see a doctor', 'doctor said', 'doctor says', 'in hospital', 'in the hospital', 'to the hospital',
        'my health', 'health problem*', 'heart attack', 'stroke', 'diabetes', 'depression', 'depressed', 'bipolar',
        'schizo*', 'ocd', 'ptsd', 'adhd', 'autis*', 'anxiety disorder', 'eating disorder', 'surgery',
        'diagnóz*', 'rakovin*', 'nádor*', 'choroba', 'choroby', 'chorobu', 'chorobe', 'ochoriet*', 'ochorenie', 'symptóm*',
        'infekci*', 'operáci*', 'biopsi*', 'u lekára', 'môj lekár', 'lekár povedal', 'v nemocnici', 'zdravotný stav', 'zdravotné problémy',
        'srdcový infarkt', 'mozgová príhoda', 'cukrovk*', 'depresi*', 'úzkostná porucha', 'duševná choroba', 'psychická porucha', 'adhd', 'autizm*',
        'lekár niečo zlé', 'lekár nájde', 'lekár zistí', 'lekár mi', 'k lekárovi', 'od lekára', 'u doktora', 'k doktorovi', 'doktor povedal', 'doktor zistí', 'lekárske vyšetrenie',
    ],
    'medical-treatment': [
        'medication*', 'medicine', 'pills', 'prescri*', 'dosage', 'stop taking', 'meds', 'antidepressant*', 'vaccin*',
        'chemo*', 'quit my meds', 'surgery',
        'lieky', 'liek', 'liekov', 'liekmi', 'tabletk*', 'antidepresív*', 'liečb*', 'dávkovan*', 'očkovan*', 'prestať brať', 'prestať užívať',
    ],
    pregnancy: [
        'pregnan*', 'expecting a baby', 'expecting a child', 'conceive', 'conceived', 'conceiving', 'conception', 'miscarr*', 'fertility', 'ivf', 'have a baby',
        'have a child', 'have kids', 'having a baby', 'get pregnant', 'trying for a baby', 'trying to conceive', 'baby on the way', 'abortion',
        'tehotn*', 'otehotnie*', 'tehotenstv*', 'potrat*', 'počať', 'počatie', 'plodnos*', 'mať dieťa', 'mať dieťatko', 'mať deti', 'umelý potrat', 'interrupci*',
    ],
    death: [
        'when will i die', 'will i die', 'am i going to die', 'going to die', 'will he die', 'will she die', 'will they die', 'will my mother die',
        'will my father die', 'how long does he have to live', 'how long does she have to live', 'how long will i live',
        'death is coming', 'life expectancy', 'death of my', 'is going to die', 'will die', 'when will he die', 'when will she die', 'pass away soon',
        'kedy zomriem', 'zomriem', 'zomrie', 'umriem', 'umrie', 'kedy umriem', 'ako dlho budem žiť', 'koľko mi zostáva', 'blíži sa smrť', 'smrť v rodine',
        'smrť blízkeho', 'dožije', 'umrú', 'zomrú',
    ],
    legal: [
        'lawsuit', 'sued', 'suing', 'court', 'on trial', 'stand trial', 'criminal trial', 'court trial', 'verdict', 'lawyer', 'attorney', 'custody', 'legal', 'judge', 'jury', 'criminal charges', 'charged with',
        'indict*', 'prison', 'jail', 'arrest*', 'probation', 'divorce proceedings',
        'súd', 'súdu', 'súde', 'súdny', 'súdne', 'žalob*', 'rozsudok', 'sudca', 'advokát*', 'právnik*', 'právn*', 'väzenie', 'väzby', 'obvinen*', 'trest*', 'polícia', 'zatkn*', 'opatrovníctv*', 'výživné',
    ],
    financial: [
        'invest', 'investing', 'investment', 'investments', 'investor', 'stocks', 'stock market', 'crypto*', 'bitcoin', 'ethereum', 'forex',
        'day trading', 'gambl*', 'lottery', 'lotto', 'casino', 'betting', 'jackpot', 'win money', 'loan', 'mortgage', 'inherit*', 'portfolio',
        'buy shares', 'return on investment',
        'buy a house', 'buy this house', 'buy the house', 'buy a home', 'buy a flat', 'buy an apartment', 'buy a property', 'buy property',
        'investíci*', 'investovať', 'investujem', 'investovanie', 'kryptomen*', 'forex', 'hazard*', 'lotéri*', 'loto', 'kasíno', 'stávk*', 'jackpot', 'pôžičk*', 'hypotek*', 'dedič*', 'portfólio',
        'kúpiť dom', 'kúpiť ten dom', 'kúpiť si dom', 'kúpiť byt', 'kúpiť si byt', 'kúpiť nehnuteľnosť', 'kúpa domu', 'kúpa bytu',
    ],
    accusation: [
        'cheat*', 'cheating on', 'affair', 'unfaithful', 'infidel*', 'lying to me', 'lied to me', 'is lying', 'been lying', 'lies to me', 'lied about', 'betray*', 'secretly seeing', 'sleeping with',
        'another woman', 'another man', 'other woman', 'other man', 'stole', 'stolen', 'thief', 'steal*', 'abus*', 'criminal', 'murder*',
        'rape*', 'predator', 'stalker', 'fraud*', 'scam*',
        'podvádz*', 'podvádza', 'klam*', 'luh*', 'luže', 'lže', 'neverný', 'neverná', 'nevera', 'nevere', 'neverne', 'klame mi', 'luhal', 'zradi*', 'zrádza', 'kradne', 'ukradol', 'zlodej', 'zneuži*',
        'kriminál*', 'vrah', 'vraždu*', 'znásilnen*', 'stalker', 'podvod*', 'iná žena', 'iný muž',
    ],
    paranoia: [
        'spiritual attack', 'psychic attack', 'cursed', 'curse on me', 'hexed', 'black magic', 'witchcraft against', 'evil eye', 'possessed',
        'demon', 'demons', 'demonic', 'gangstalk*', 'they are after me', 'targeted individual', 'poisoning me', 'mind control', 'tracking implant',
        'voices in my head', 'hearing voices', 'energy vampire', 'entity attached', 'everyone is against me',
        'duchovný útok', 'prekliaty', 'prekliata', 'kliatba', 'kliatbu', 'čierna mágia', 'čarodejníctv* proti', 'urieknut*', 'posadnut*', 'démon', 'démoni', 'démonov',
        'sú za mnou', 'ovládajú moju myseľ', 'kontrola mysle', 'čip v tele', 'hlasy v hlave', 'počujem hlasy', 'energetický upír', 'všetci sú proti mne',
        'through the television', 'through the tv', 'television is talking to me', 'tv is talking to me', 'sending me messages through',
        'cez televíziu', 'cez televízor', 'televízia na mňa hovorí', 'televízia mi posiela', 'posielajú mi správy cez',
    ],
});
/* --------------------------------------------------------- the question -- */
export const foldedPadded = (text) => padded(foldText(text));
