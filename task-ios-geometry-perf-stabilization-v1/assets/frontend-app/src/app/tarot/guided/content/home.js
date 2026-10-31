/**
 * HOME & MOVING - place, belonging and the dwelling.
 *
 * This area owns what home means, how a person lives in a place, the question of whether surroundings still fit, settling
 * into somewhere unfamiliar and what steadies a person in it. It does not own the road and the unfamiliar (Travel) or
 * transitions in general (Life changes). It never says to move and never says to stay: it describes pulls, not verdicts.
 *
 * What is specific to an intention lives in its places (`ask` and `frame`), its takeaways and its closings; the area itself
 * contributes only the sentence for a reading led by Major cards.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    majorWeight: t('With most of the cards Major Arcana, the matter reaches past rooms and furniture and touches something lasting about what it means to belong somewhere.', 'Keď je väčšina kariet z Veľkých arkán, otázka siaha za izby a nábytok a dotýka sa niečoho trvalého v tom, čo znamená niekam patriť.'),
};
const meaning = {
    id: 'home-moving.meaning',
    areaId: 'home-moving',
    label: t('Understand what home means to me', 'Pochopiť, čo pre mňa znamená domov'),
    focus: t('Hold in mind a place that feels, or once felt, like home.', 'Maj na mysli miesto, ktoré ti pripadá alebo kedysi pripadalo ako domov.'),
    semantics: {
        explores: t('what home means to you, in daily life, in thought and underneath', 'čo pre teba znamená domov v každodennom živote, v myšlienkach i hlbšie'),
        reflection: 'meaning',
        practical: 'name',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'other-person-mind'],
    },
    spreadId: 'body-mind-spirit',
    category: 'general-reflection',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('How home is lived', 'Ako sa domov žije'),
            ask: t('The daily, bodily side of home: where you sleep, eat and rest, and how the rooms feel to move through.', 'Každodenná, telesná stránka domova: kde spíš, jedáš a oddychuješ a aký je pocit pohybovať sa izbami.'),
            frame: {
                steady: t('In daily life this tends to show in small repeated things: which chair is yours, how the morning goes, whether the body lets go once the door is shut.', 'V bežnom dni sa to zvykne ukazovať v drobnostiach: ktoré kreslo je tvoje, ako začína ráno, či telo povolí hneď po zatvorení dverí.'),
                strained: t('The body is often the first to notice a home that costs more than it gives: rooms that tire, sleep that does not settle, routines done rather than lived.', 'Telo si domov, ktorý viac berie, než dáva, všimne zvyčajne ako prvé: izby, ktoré unavujú, spánok, ktorý sa neusadí, zvyky, ktoré sa len odbavujú.'),
            } },
        { label: t('What home is in your mind', 'Čo je domov v tvojej mysli'),
            ask: t('The picture and the words you hold for home: what you imagine it to be.', 'Obraz a slová, ktoré pre domov máš: ako si ho predstavuješ.'),
            frame: {
                steady: t('Over the years the mind collects its own idea of home from borrowed pieces: a grandparent’s kitchen, a street at dusk, the sound of one particular door.', 'Predstavu domova si myseľ skladá roky z požičaných kúskov: babičkina kuchyňa, ulica za súmraku, zvuk jedných konkrétnych dverí.'),
                strained: t('An idea of home can come apart from the rooms it is meant to describe, either too ideal for anything to match or too tied to a place left behind.', 'Predstava domova sa môže odtrhnúť od skutočných izieb, buď taká ideálna, že jej nič nezodpovedá, alebo príliš viazaná na miesto, ktoré ostalo za chrbtom.'),
            } },
        { label: t('What home stands for', 'Za čo domov stojí'),
            ask: t('What sits underneath: the values and the belonging a home is asked to hold.', 'Čo je pod povrchom: hodnoty a spolupatričnosť, ktoré má domov nosiť.'),
            frame: {
                steady: t('What home stands for tends to show in what a person would defend or miss: privacy, safety, the sense of being known by a place.', 'Čo domov znamená, sa zvykne ukázať v tom, čo sa bráni alebo čo chýba: súkromie, bezpečie, pocit, že ťa miesto pozná.'),
                strained: t('Belonging or safety may be wanted more than it is felt, and the value a home is asked to hold can stay thin or unnamed.', 'Spolupatričnosť alebo bezpečie sa môžu chcieť viac, než sa cítia, a hodnota, ktorú má domov držať, môže ostať tenká či nepomenovaná.'),
            } },
    ],
    opening: t('This reading looks at what home means to you. The first card is the lived side of it, the rooms and routines of daily life; the second is how you picture home in your mind; and the third is what it stands for underneath, the values and belonging it holds.', 'Toto čítanie sa pozerá na to, čo pre teba znamená domov. Prvá karta je jeho prežívaná stránka, izby a zvyky každodenného života; druhá je to, ako si domov predstavuješ v mysli; a tretia je to, za čo stojí hlbšie, hodnoty a spolupatričnosť, ktoré nesie.'),
    takeaway: {
        act: t('Adding one thing to a room that makes it feel like yours, or one routine that marks the day as lived here, is a small step in this direction.', 'Malým obyčajným krokom môže byť jedna vec v izbe, vďaka ktorej pôsobí ako tvoja, alebo jeden zvyk, ktorý označí deň ako prežitý práve tu.'),
        ease: t('It may be enough, for now, for the place to be ordinary and sufficient rather than perfect, and to ask a little less of it.', 'Zatiaľ môže stačiť, aby bolo miesto obyčajné a dostatočné, nie dokonalé, a žiadať od neho o málo menej.'),
        face: t('This may be less about finding the right word for home than about seeing what it has to include for you (a quiet corner, a table, a certain light) and where that is missing.', 'Môže ísť menej o hľadanie správneho slova pre domov a viac o to, vidieť, čo musí obsahovať pre teba (tichý kút, stôl, určité svetlo) a kde to chýba.'),
        weave: t('Home seems to sit where daily life, thought and values meet, and a place feels most like home when the three agree with one another.', 'Domov sa zdá byť tam, kde sa stretávajú každodennosť, myslenie a hodnoty, a miesto pôsobí najviac ako domov, keď sa tieto tri zhodujú.'),
    },
    closings: {
        act: t('Which small thing in your home already says what it means to you?', 'Ktorá drobnosť v tvojom domove už teraz hovorí, čo pre teba znamená?'),
        ease: t('When you picture home with your eyes closed, which room or moment comes first, and what does it hold?', 'Keď si domov predstavíš so zavretými očami, ktorá izba alebo chvíľa príde prvá a čo v sebe nesie?'),
        face: t('What does a place need to carry for it to feel like home rather than only somewhere to live?', 'Čo musí miesto nosiť v sebe, aby pôsobilo ako domov a nielen ako miesto na bývanie?'),
        weave: t('Where do your rooms, your picture of home and what matters to you agree, and where do they part?', 'Kde sa tvoje izby, tvoja predstava domova a to, na čom ti záleží, zhodujú a kde sa rozchádzajú?'),
    },
};
const needForChange = {
    id: 'home-moving.need-for-change',
    areaId: 'home-moving',
    label: t('Explore the need for change', 'Preskúmať potrebu zmeny'),
    focus: t('Hold in mind the surroundings you live in and the question of whether they still fit.', 'Maj na mysli prostredie, v ktorom žiješ, a otázku, či ti ešte sedí.'),
    semantics: {
        explores: t('what supports a change of surroundings, what holds you where you are and what it turns on', 'čo podporuje zmenu prostredia, čo ťa drží tam, kde si, a od čoho to závisí'),
        reflection: 'weigh',
        practical: 'observe',
        forbids: ['life-directive', 'predict-outcome', 'fate-claim', 'financial-advice', 'legal-claim', 'other-person-mind'],
    },
    spreadId: 'support-resistance-key',
    category: 'general-reflection',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What supports a change', 'Čo zmenu podporuje'),
            ask: t('What in the surroundings or in you leans toward something different: a restlessness, a room that no longer fits, a wish for another light.', 'Čo sa v prostredí alebo v tebe nakláňa k niečomu inému: nepokoj, izba, ktorá už nesedí, túžba po inom svetle.'),
            frame: {
                steady: t('Interest, more than escape, usually marks a pull toward different surroundings: a taste for other light, more room, another street.', 'Skôr záujem než útek zvyčajne sprevádza skutočné lákanie k inému prostrediu: chuť na iné svetlo, viac miesta, inú ulicu.'),
                strained: t('Irritation with the present rooms, or a wish to be anywhere else, can be a restlessness that says more about pressure than about the place itself.', 'Podráždenie z terajších izieb alebo túžba byť kdekoľvek inde môže byť nepokoj, ktorý vypovedá viac o tlaku než o samotnom mieste.'),
            } },
        { label: t('What holds you in place', 'Čo ťa drží na mieste'),
            ask: t('What keeps the present surroundings dear or important: familiar streets, people nearby, the comfort of knowing every corner.', 'Čo robí súčasné prostredie milým alebo dôležitým: známe ulice, ľudia nablízku, pohodlie z poznania každého kúta.'),
            frame: {
                steady: t('What makes the present surroundings worth keeping is often ordinary: people within reach, streets known by heart, a routine that only works in this exact spot.', 'Dôvody, prečo je súčasné prostredie hodné zachovania, bývajú obyčajné: ľudia nablízku, ulice poznané naspamäť, zvyk, ktorý funguje len na tomto mieste.'),
                strained: t('Attachment can also be kept going by habit or by dread of losing what is familiar, so that a hold becomes a grip.', 'Pripútanosť môže držať aj zvyk či strach zo straty známeho, takže z držania sa stane zovretie.'),
            } },
        { label: t('What the question turns on', 'Na čom otázka stojí'),
            ask: t('The question underneath both pulls, named without choosing a side.', 'Otázka pod oboma smermi, pomenovaná bez výberu strany.'),
            frame: {
                steady: t('Under two opposing pulls there is usually one plainer need, such as rest, company, room or light, that a place would have to give for the question to quiet.', 'Pod dvoma protichodnými smermi býva jedna obyčajnejšia potreba, napríklad pokoj, spoločnosť, priestor či svetlo, ktorú by miesto muselo dávať, aby sa otázka utíšila.'),
                strained: t('Here the argument is loud because the need beneath it has not yet been said, and each side speaks for something it has not named.', 'Spor je hlasný preto, že potreba pod ním ešte nezaznela, a každá strana hovorí za niečo, čo nepomenovala.'),
            } },
    ],
    opening: t('This reading looks at the need for change in the place where you live, without leaning toward either answer. The first card is what supports a change, the second what holds you where you are, and the third what the question turns on. It describes pulls, not a verdict.', 'Toto čítanie sa pozerá na potrebu zmeny v mieste, kde žiješ, bez naklonenia sa k niektorej odpovedi. Prvá karta je to, čo zmenu podporuje, druhá to, čo ťa drží tam, kde si, a tretia to, na čom otázka stojí. Nenavrhuje verdikt, len opisuje, čo ťa kam ťahá.'),
    takeaway: {
        act: t('Writing down what would be missed and what would not, then reading the two lists side by side, is a small step that fits the question.', 'Malým obyčajným krokom môže byť zapísať si, čo by z miesta chýbalo a čo nie, a prečítať si oba zoznamy vedľa seba.'),
        ease: t('What may help is letting the question sit alongside ordinary days and watching which pull stays steady and which shifts with the weather.', 'Pomôcť môže nechať otázku stáť popri bežných dňoch a všímať si, ktorý smer ostáva stály a ktorý sa mení s počasím.'),
        face: t('Looking squarely at both pulls may matter more than choosing between them: what the present surroundings give, what they lack, and what each pull is really after.', 'Priamy pohľad na oba smery môže znamenať viac než rýchly výber: čo súčasné prostredie dáva, čo mu chýba a čo každý z nich vlastne hľadá.'),
        weave: t('Both pulls may share a core, since sometimes each asks for a place where rest and growth can live together, and naming what each asks belongs to the weighing.', 'Oba smery môžu mať spoločné jadro, lebo niekedy oba žiadajú miesto, kde sa dá oddychovať aj rásť, a pomenovať, čo každý žiada, je súčasťou zvažovania.'),
    },
    closings: {
        act: t('Which part of where you live now would you miss anywhere else?', 'Čo z miesta, kde teraz bývaš, by ti chýbalo kdekoľvek inde?'),
        ease: t('What stands out about your surroundings on an ordinary day when you look at them with fresh eyes?', 'Čo vynikne na tvojom prostredí v obyčajný deň, keď naň pozrieš čerstvými očami?'),
        face: t('If both pulls were speaking about one and the same need, what would that need be?', 'Keby oba smery hovorili o jednej a tej istej potrebe, ktorá by to bola?'),
        weave: t('What would a place have to offer for both the wish to stay and the wish for change to feel heard?', 'Čo by muselo miesto ponúkať, aby sa ozvala aj túžba zostať, aj túžba po zmene?'),
    },
};
const adapting = {
    id: 'home-moving.adapting',
    areaId: 'home-moving',
    label: t('Reflect on adapting to a new place', 'Zamyslieť sa nad tým, ako si zvykám na nové miesto'),
    focus: t('Hold in mind a place that is new to you, or a change in your surroundings you are getting used to.', 'Maj na mysli miesto, ktoré je pre teba nové, alebo zmenu prostredia, na ktorú si zvykáš.'),
    semantics: {
        explores: t('how settling into a new place unfolds, from what shaped it to where it tends', 'ako si zvykáš na nové miesto, od toho, čo to formuje, po to, kam sa to nakláňa'),
        reflection: 'trace',
        practical: 'try',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'other-person-mind'],
    },
    spreadId: 'past-present-future',
    category: 'general-reflection',
    guidance: 'reflect',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What you carry into it', 'S čím prichádzaš'),
            ask: t('What shaped how you meet a new place: earlier homes, the habits you carry, what you hoped to find there.', 'Čo ovplyvňuje, s čím k novému miestu prichádzaš: predošlé domovy, zvyky, ktoré nosíš, a to, čo si od neho sľubuješ.'),
            frame: {
                steady: t('Habits from earlier homes, the knack of having begun somewhere before and hopes for the place all travel along into a new address.', 'Zvyky z predošlých domovov, skúsenosť so začiatkami a nádeje spojené s miestom sa zvyknú presťahovať spolu s človekom do nového bydliska.'),
                strained: t('Comparison with a former home, hopes the new place cannot meet and habits that fit badly here can colour an arrival before the rooms get a chance.', 'Porovnávanie s bývalým domovom, nádeje, ktoré nové miesto nenaplní, a zvyky, ktoré sem zle pasujú, môžu sfarbiť príchod skôr, než izby dostanú šancu.'),
            } },
        { label: t('Where settling in stands', 'Nakoľko je miesto už známe'),
            ask: t('How the place feels today: what has begun to feel familiar and what is still strange.', 'Aký je pocit z miesta dnes: čo začína byť známe a čo je ešte cudzie.'),
            frame: {
                steady: t('Familiarity tends to arrive unevenly: a shop that is suddenly known, a path walked without thinking, while other corners stay strange for a long time.', 'Známosť prichádza nerovnomerne: obchod sa zrazu pozná, cesta sa prejde bez rozmýšľania, kým iné kúty ostávajú dlho cudzie.'),
                strained: t('Some places stay stubbornly foreign for a while: rooms where nothing seems to belong, a street that appears to be someone else’s, evenings that do not feel like home.', 'Niektoré miesta ostávajú tvrdohlavo cudzie: izby, v ktorých sa nič nezdá na svojom mieste, ulica, čo akoby patrila iným, večery, ktoré nie sú ako doma.'),
            } },
        { label: t('Where settling in tends', 'Kam sa to nakláňa'),
            ask: t('The direction settling in leans toward if the present rhythm continues: a tendency, never a promise.', 'Smer, ktorým sa to nakláňa, ak súčasný rytmus pokračuje: tendencia, nikdy nie sľub.'),
            frame: {
                steady: t('Settling is rarely a straight line: it gathers toward whatever the daily rhythm keeps returning to, and leaves unattended whatever the rhythm skips.', 'Zvykať si na miesto nejde po priamke: nakláňa sa k tomu, k čomu sa denný rytmus stále vracia, a necháva bokom to, čo rytmus obchádza.'),
                strained: t('Days can pass with little of them taking root when a rhythm keeps the place at arm’s length and the new home stays provisional.', 'Dni môžu plynúť a málo z nich zapustí korene, keď rytmus drží miesto v odstupe a nové bývanie ostáva len prechodné.'),
            } },
    ],
    opening: t('This reading looks at settling into a new place. The first card is what shaped how you meet it, the second where the settling in stands today, and the third where it tends if the present rhythm continues: a tendency, not a promise.', 'Toto čítanie sa pozerá na to, ako si zvykáš na nové miesto. Prvá karta je to, čo ovplyvňuje, s čím k nemu prichádzaš, druhá to, nakoľko je už miesto známe, a tretia to, kam sa to nakláňa, ak súčasný rytmus pokračuje: tendencia, nie sľub.'),
    takeaway: {
        act: t('A small, repeated act can start to make a place familiar: the same morning walk, the same chair at the same table, a greeting to the same neighbour.', 'Miesto môže začať byť známe cez jeden malý opakovaný zvyk: tú istú rannú prechádzku, to isté kreslo pri tom istom stole, pozdrav tomu istému susedovi.'),
        ease: t('Settling in may call for time more than effort, and a place can stay unfamiliar a little longer while familiarity comes at its own pace.', 'Možno tu ide viac o čas než o námahu: miesto môže ostať ešte chvíľu cudzie a známosť môže prísť vlastným tempom.'),
        face: t('Saying plainly what feels strange or missing in the new surroundings may help it become part of the picture instead of something kept out of sight.', 'Jasne povedať, čo v novom prostredí pôsobí cudzo alebo chýba, môže pomôcť, aby to bolo súčasťou obrazu a nie niečím, čo sa skrýva.'),
        weave: t('A place often becomes home where old and new meet, with one thing from before in the rooms and one new habit growing beside it.', 'Miesto sa často stáva domovom tam, kde sa stretne staré a nové: jedna vec z predtým v izbách a popri nej jeden nový zvyk.'),
    },
    closings: {
        act: t('What would make the next ordinary evening here feel a little more like yours?', 'Čo by urobilo ďalší obyčajný večer tu o niečo viac tvojím?'),
        ease: t('Which corner, sound or habit of the new place comes closest to feeling familiar?', 'Ktorý kút, zvuk alebo zvyk nového miesta sa najviac blíži k tomu, aby bol známy?'),
        face: t('When you reach for something from an earlier home, what is it, and what does it say about what you need here?', 'Keď siahaš po niečom z predošlého domova, po čom je to a čo to hovorí o tom, čo potrebuješ tu?'),
        weave: t('What from before and what from now could sit side by side in these rooms?', 'Čo z minulosti a čo zo súčasnosti by mohlo stáť v týchto izbách vedľa seba?'),
    },
};
const grounded = {
    id: 'home-moving.grounded',
    areaId: 'home-moving',
    label: t('Discover what helps me feel grounded', 'Objaviť, čo mi dáva pevnú pôdu pod nohami'),
    focus: t('Hold in mind a moment when a place gave you a sense of steady ground, and what was around you then.', 'Maj na mysli chvíľu, keď ti miesto dávalo pocit pevnej pôdy, a to, čo bolo vtedy okolo teba.'),
    semantics: {
        explores: t('what already steadies you in a place, what else is within reach and where to lean on it', 'čo ti na mieste už teraz dáva oporu, čo ďalšie je na dosah a kde sa o to oprieť'),
        reflection: 'resource',
        practical: 'steady',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim'],
    },
    spreadId: 'resources-view',
    category: 'general-reflection',
    guidance: 'resources',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What already steadies you', 'Čo ti už teraz dáva oporu'),
            ask: t('The things and habits in your surroundings that already give you a sense of ground: a chair, a routine, a view.', 'Veci a zvyky v tvojom prostredí, ktoré ti už dávajú pocit pevnej pôdy: kreslo, rutina, výhľad.'),
            frame: {
                steady: t('Whatever already steadies a day tends to be modest and easy to overlook, something the day leans on without noticing, like a worn chair or a window with a view.', 'Čo deň už teraz podopiera, býva nenápadné a ľahko prehliadnuteľné, niečo, o čo sa opiera bez povšimnutia, napríklad obnosené kreslo či okno s výhľadom.'),
                strained: t('Supports can wear thin: a routine kept up without comfort, a favourite spot that no longer settles, ground that looks firmer than it feels.', 'Opory sa môžu obnosiť: zvyk udržiavaný bez útechy, obľúbené miesto, ktoré už neukľudňuje, pôda, ktorá vyzerá pevnejšie, než sa cíti.'),
            } },
        { label: t('What else is nearby', 'Čo ďalšie je nablízku'),
            ask: t('What else could support that feeling close at hand: a neighbour, a park, a quiet hour, a corner not yet used.', 'Čo ďalšie by mohlo tento pocit podporiť na dosah ruky: sused, park, tichá hodina, kút, ktorý ešte nie je využitý.'),
            frame: {
                steady: t('Close by there is often something not yet counted on: a neighbour, a park, a quiet hour, a corner that has been given no purpose.', 'Blízko býva niečo, s čím sa ešte nerátalo: sused, park, tichá hodina, kút, ktorému nikto nedal účel.'),
                strained: t('Support within reach can be hard to take up when tiredness or doubt keeps it at a distance, noticed but not yet trusted.', 'Opora na dosah sa niekedy ťažko prijíma, keď ju únava alebo pochybnosť drží bokom: zbadaná, ale zatiaľ nepreskúšaná.'),
            } },
        { label: t('Where to lean on it', 'Kde sa o to oprieť'),
            ask: t('The part of daily life where these supports could be leaned on, as a direction to try rather than a plan.', 'Časť každodenného života, kde by sa o tieto opory dalo oprieť: smer na vyskúšanie, nie plán.'),
            frame: {
                steady: t('Support is usually felt more in one part of the day than in the rest: an hour, a room or a habit where leaning comes easily.', 'Opora sa zvyčajne cíti viac v jednej časti dňa než v ostatných: v hodine, izbe či zvyku, kde sa dá oprieť ľahko.'),
                strained: t('Some stretches of the day resist any support: an hour or a room where steadiness slips away and leaning on anything feels like effort.', 'Niektoré úseky dňa oporu odmietajú: hodina alebo izba, kde pevnosť uniká a opierať sa o čokoľvek znamená námahu.'),
            } },
    ],
    opening: t('This reading looks at what helps you feel grounded in a place. The first card is what already steadies you, the second what else lies close at hand, and the third where these supports could be put to use in daily life.', 'Toto čítanie sa pozerá na to, čo ti pomáha mať na mieste pevnú pôdu pod nohami. Prvá karta je to, čo ti už teraz dáva oporu, druhá to, čo ďalšie je na dosah ruky, a tretia miesto v každodennom živote, kde by sa tieto opory dali využiť.'),
    takeaway: {
        act: t('A small, ordinary step could be leaning on one steadying thing for a few days, for instance by sitting in the same spot at the same hour and noticing what it gives.', 'Malým obyčajným krokom môže byť opierať sa niekoľko dní o jednu vec, ktorá dáva oporu, napríklad sedieť na tom istom mieste v tú istú hodinu a všímať si, čo to dáva.'),
        ease: t('Steadiness may not need anything added: it can come from taking away noise, hurry or clutter until what is already steady can be felt.', 'Pevná pôda nemusí potrebovať nič pridávať: môže vzniknúť odobratím hluku, zhonu či neporiadku, kým sa nezačne cítiť to, čo je už pevné.'),
        face: t('It may help to see what in your surroundings is not steady, and to start from what is.', 'Môže pomôcť všimnúť si, čo v tvojom okolí pevné nie je, a vychádzať z toho, čo pevné je.'),
        weave: t('Support gathers where routine, place and meaning touch, as in a repeated act, in a particular spot, that matters to you.', 'Opora vzniká tam, kde sa dotýka zvyk, miesto a zmysel: opakovaný skutok na konkrétnom mieste, na ktorom ti záleží.'),
    },
    closings: {
        act: t('Which ordinary corner of your day already feels like solid ground?', 'Ktorý obyčajný kútik tvojho dňa ti už teraz pripadá ako pevná pôda?'),
        ease: t('What would let your shoulders drop as soon as you come into a room?', 'Čo by ti uvoľnilo plecia hneď po vstupe do izby?'),
        face: t('Where in your surroundings is the ground least steady, and what is different there?', 'Kde je v tvojom okolí pôda najmenej pevná a čo je tam inak?'),
        weave: t('If one steady thing could be added to your surroundings, what quality would it bring?', 'Ak by sa do tvojho okolia dala pridať jedna stála vec, akú vlastnosť by priniesla?'),
    },
};
export const HOME_AREA = {
    id: 'home-moving',
    label: t('Home & Moving', 'Domov a sťahovanie'),
    blurb: t('What home means, how a place fits, and what grounds you in it.', 'Čo znamená domov, ako ti miesto sedí a čo ti v ňom dáva oporu.'),
    scope: t('place, belonging and the dwelling', 'miesto, spolupatričnosť a bývanie'),
    intentions: [meaning, needForChange, adapting, grounded],
    lens,
};
