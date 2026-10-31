/**
 * TRAVEL & NEW EXPERIENCES - going toward the unfamiliar and what it leaves behind.
 *
 * This area owns curiosity, leaving the known, openness, preparation, uncertainty and what an experience teaches. It does not
 * own a change of dwelling (Home & Moving), a general crossing from one chapter to another (Life changes) or the inner life apart
 * from an experience (Personal growth). It gives no safety, medical, visa, booking or money advice: the next step it names is small,
 * ordinary and the person's own.
 *
 * What belongs to one intention lives in the `frame` of its places, in the takeaway and in the closing question for each kind of
 * answering card. The only thing the area itself says is what it means when Major cards lead the three.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    majorWeight: t('With most of the cards Major Arcana, this is about more than a passing taste of the new: it touches how the unfamiliar tends to be met and what a person lets change.', 'Keď je väčšina kariet z Veľkých arkán, nejde o letmú príchuť nového: dotýka sa to toho, ako človek vchádza do neznáma a čo si nechá zmeniť.'),
};
const draw = {
    id: 'travel-experiences.draw',
    areaId: 'travel-experiences',
    label: t('Understand what draws me toward exploration', 'Pochopiť, čo ma priťahuje k objavovaniu'),
    focus: t('Hold in mind a place, a kind of experience or simply a pull you keep noticing.', 'Maj na mysli miesto, druh zážitku alebo len príťažlivosť, ktorú si stále všímaš.'),
    semantics: {
        explores: t('what draws you toward the unfamiliar and what may sit just outside view', 'to, čo ťa priťahuje k neznámemu a čo môže zostávať tesne mimo zorného poľa'),
        reflection: 'notice',
        practical: 'name',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'legal-claim', 'financial-advice'],
    },
    spreadId: 'blind-spot-view',
    category: 'general-reflection',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What you can already see', 'Čo už vidíš'),
            ask: t('What you already notice about this pull: the images, places or moments that keep returning.', 'Čo už na tejto príťažlivosti vnímaš: obrazy, miesta či okamihy, ktoré sa stále vracajú.'),
            frame: {
                steady: t('Here the pull is usually at its most describable: the part that could be told to someone close without much searching for words.', 'Tu je príťažlivosť zvyčajne najuchopiteľnejšia: tá časť, ktorú by sa dalo bez dlhého hľadania slov povedať niekomu blízkemu.'),
                strained: t('The pull may be noticed here yet kept at arm’s length: it keeps coming back, and calling it a passing fancy is easier than looking at it.', 'Príťažlivosť sa tu môže všímať, no držať od seba na dĺžku ruky: stále sa vracia a označiť ju za prchavý rozmar je ľahšie než sa na ňu pozrieť.'),
            } },
        { label: t('What may sit outside view', 'Čo môže byť mimo zorného poľa'),
            ask: t('A possibility, held as a question rather than a finding, about what stands behind the pull and is not yet in view.', 'Možnosť, s ktorou sa dá zaobchádzať ako s otázkou, nie ako so zistením: čo stojí za touto príťažlivosťou a ešte nie je vidieť.'),
            frame: {
                steady: t('Behind a pull there is often a quiet reason, and here it tends to be modest: a need for room, for novelty, or for being a beginner again.', 'Za príťažlivosťou býva často tichý dôvod a tu zvykne byť skromný: potreba priestoru, novosti alebo toho, byť opäť začiatočníkom.'),
                strained: t('This place can hold what the pull is standing in front of: a restlessness, a comparison with other lives, a weariness with the usual that is easier left unexamined.', 'Toto miesto môže skrývať to, čo príťažlivosť zakrýva: nepokoj, porovnávanie s cudzími životmi či únavu zo všednosti, čo je jednoduchšie nechať bez povšimnutia.'),
            } },
        { label: t('What would shift', 'Čo by sa posunulo'),
            ask: t('What would change in how you meet the unfamiliar if the unseen part came into view.', 'Čo by sa zmenilo v tom, ako sa stretávaš s neznámym, keby sa nevidená časť dostala do zorného poľa.'),
            frame: {
                steady: t('Seeing the hidden part tends to change the angle more than the plan: the same wish, understood a little better, and so met a little differently.', 'Keď sa skrytá časť ukáže, mení sa skôr uhol pohľadu než plán: tá istá túžba, o niečo lepšie pochopená, a preto prežívaná trochu inak.'),
                strained: t('A shift in angle can feel more demanding than welcome here, as if understanding the pull might oblige something, and looking away stays tempting.', 'Zmena uhla pohľadu tu môže byť skôr náročná než vítaná, akoby pochopenie príťažlivosti niečo zaväzovalo, a lákavé je odvrátiť pohľad.'),
            } },
    ],
    opening: t('This reading looks at what draws you toward the unfamiliar. The first card is what you can already see in that pull, the second what may lie outside view (a question to hold, not a finding), and the third what would shift in how you meet the new if that part came into view.', 'Toto čítanie sa pozerá na to, čo ťa priťahuje k neznámemu. Prvá karta je to, čo v tejto príťažlivosti už vidíš, druhá to, čo môže ležať mimo zorného poľa (otázka na držanie, nie zistenie), a tretia to, čo by sa posunulo v tom, ako sa stretávaš s novým, keby sa táto časť ukázala.'),
    takeaway: {
        act: t('What may help here is a small, ordinary look at the pull: reading how people who live somewhere describe it, or spending an afternoon in an unfamiliar corner of one’s own town.', 'Pomôcť môže malý, obyčajný pohľad na túto príťažlivosť: čítanie o tom, ako o mieste hovoria ľudia, čo tam žijú, alebo popoludnie v zákutí vlastného mesta, ktoré ešte nepoznáš.'),
        ease: t('This may be less about answering the pull than about leaving it open, like a map on the table that is looked at a little each day until it says more.', 'Môže ísť menej o odpoveď na túto príťažlivosť a viac o to, nechať ju otvorenú ako mapu na stole, na ktorú sa každý deň chvíľu pozrieš, kým nepovie viac.'),
        face: t('What may help is saying the pull plainly, even if it points past something familiar; said aloud, it often turns out as large or as small as it really is.', 'Pomôcť môže povedať si tú príťažlivosť jasne, aj keď ukazuje za niečo známe; keď sa vysloví, býva taká veľká či malá, aká naozaj je.'),
        weave: t('This may be about letting the pull and the part that holds back sit in one picture, so that curiosity and care read as partners and not as an argument.', 'Môže ísť o to, nechať príťažlivosť aj to, čo drží späť, v jednom obraze, aby zvedavosť a starostlivosť pôsobili ako partneri, nie ako spor.'),
    },
    closings: {
        act: t('What is one small, ordinary way the pull could become a little more concrete?', 'Aký malý, obyčajný spôsob by mohol urobiť túto príťažlivosť o niečo konkrétnejšou?'),
        ease: t('Which image of the pull keeps coming back, and what might it be standing in for?', 'Ktorý obraz tejto príťažlivosti sa stále vracia a za čo by mohol stáť?'),
        face: t('If the pull could be put into one plain sentence, what would that sentence say?', 'Keby sa príťažlivosť dala vyjadriť jednou jasnou vetou, čo by táto veta hovorila?'),
        weave: t('What does the unfamiliar offer that the familiar does not, and what does each give you?', 'Čo ponúka neznáme, čo známe neponúka, a čo ti dáva jedno aj druhé?'),
    },
};
const unknown = {
    id: 'travel-experiences.unknown',
    areaId: 'travel-experiences',
    label: t('Reflect on uncertainty about the unknown', 'Zamyslieť sa nad neistotou pred neznámom'),
    focus: t('Hold in mind a step into the unfamiliar that you find yourself both wanting and hesitating over.', 'Maj na mysli krok do neznáma, pri ktorom zároveň chceš aj váhaš.'),
    semantics: {
        explores: t('what supports openness to the unknown, what makes you hold back, and what your feeling turns on', 'to, čo podporuje otvorenosť voči neznámemu, čo ťa drží späť a od čoho tvoj pocit závisí'),
        reflection: 'orient',
        practical: 'steady',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'legal-claim', 'financial-advice'],
    },
    spreadId: 'support-resistance-key',
    category: 'emotional',
    guidance: 'reflect',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What supports openness', 'Čo podporuje otvorenosť'),
            ask: t('What already makes the unfamiliar feel approachable: a past experience, a person, a habit of curiosity.', 'Čo už teraz robí neznáme prístupným: predchádzajúca skúsenosť, človek, zvyk zvedavosti.'),
            frame: {
                steady: t('Support usually looks ordinary: someone who has been somewhere similar, a memory of managing before, a habit of asking along the way.', 'Opora zvykne vyzerať obyčajne: niekto, kto už bol na podobnom mieste, spomienka, že to išlo aj predtým, zvyk pýtať sa cestou.'),
                strained: t('It can be that the support is real but thin, so each step into the unknown has to be argued for again instead of simply taken.', 'Môže sa stať, že opora je skutočná, ale tenká, takže každý krok do neznáma treba znova obhajovať, nie len urobiť.'),
            } },
        { label: t('What makes you hold back', 'Čo ťa drží späť'),
            ask: t('What gives the hesitation its weight: a worry, an old memory, a wish to stay in control.', 'Čo dáva váhaniu jeho váhu: obava, stará spomienka, túžba mať všetko pod kontrolou.'),
            frame: {
                steady: t('Hesitation here is often doing honest work: noticing limits, asking for firmer ground, and wanting to know the road before taking it.', 'Váhanie tu často robí poctivú prácu: všíma si hranice, žiada pevnejšiu pôdu a chce poznať cestu skôr, než sa po nej vyrazí.'),
                strained: t('Fear can grow here beyond what is in front of it, fed by an old memory or by a wish to keep every detail under control.', 'Strach tu môže narásť nad rozmer toho, čo je pred ním, živený starou spomienkou alebo túžbou mať každý detail pod kontrolou.'),
            } },
        { label: t('What your openness turns on', 'Od čoho závisí tvoja otvorenosť'),
            ask: t('The thing that decides which of the two sounds louder at any moment: a criterion to look at, not a verdict.', 'To, čo rozhoduje, ktorá z dvoch strán znie práve hlasnejšie: kritérium na pozorovanie, nie verdikt.'),
            frame: {
                steady: t('What it turns on is often the conditions of the step more than the step itself: its pace, who is nearby, and whether turning back stays possible.', 'Často záleží na podmienkach kroku viac než na kroku samom: na jeho tempe, na tom, kto je nablízku, a či sa dá vrátiť.'),
                strained: t('If nothing steady decides, feeling swings between wanting and holding back, and whichever voice is louder at the moment ends up choosing.', 'Ak nerozhoduje nič pevné, pocit sa hojdá medzi chcením a váhaním a vyberie to, čo je práve hlasnejšie.'),
            } },
    ],
    opening: t('This reading looks at uncertainty about the unknown. The first card is what supports your openness, the second what makes you hold back, and the third what your feeling turns on between the two. It reads a stance toward the unfamiliar, not whether going is right.', 'Toto čítanie sa pozerá na neistotu pred neznámom. Prvá karta je to, čo podporuje tvoju otvorenosť, druhá to, čo ťa drží späť, a tretia to, od čoho závisí tvoj pocit medzi nimi. Skúma postoj k neznámemu, nie to, či je správne ísť.'),
    takeaway: {
        act: t('A small, ordinary step could do more than a large resolve: a street, a dish or a few phrases of another language met close to home.', 'Malý, obyčajný krok môže dať viac opory než veľké odhodlanie: ulica, jedlo alebo pár viet v inom jazyku, s ktorými sa človek stretne blízko domova.'),
        ease: t('This may be less about courage than about lowering the stakes: approaching the unknown at a walking pace, with something familiar still within reach.', 'Môže ísť menej o odvahu než o zníženie nárokov: k neznámemu sa dá priblížiť chôdzou, nie behom, a s niečím známym stále na dosah.'),
        face: t('What may help is hearing the hesitation out instead of arguing with it; written in plain words, what it actually fears can look different.', 'Pomôcť môže vypočuť si váhanie, namiesto aby sa s ním človek hádal; napísané jasnými slovami môže to, čoho sa naozaj bojí, vyzerať inak.'),
        weave: t('What may help is letting the wish to go and the care about how to go speak in one voice: curiosity with a thoughtfully packed bag, care with an open door.', 'Pomôcť môže nechať túžbu ísť a starostlivosť o to, ako ísť, hovoriť jedným hlasom: zvedavosť s premyslene zbalenou taškou, starostlivosť s otvorenými dverami.'),
    },
    closings: {
        act: t('What makes a step toward the unfamiliar feel exactly as large as it does?', 'Čo spôsobuje, že sa ti krok k neznámemu zdá práve taký veľký?'),
        ease: t('What would change about the unknown if it were fine not to know how, for a while?', 'Čo by sa na neznámom zmenilo, keby sa v ňom dalo chvíľu nevedieť, ako na to?'),
        face: t('Which part of the hesitation is care, and which part has simply become habit?', 'Ktorá časť váhania je starostlivosť a ktorá sa len stala zvykom?'),
        weave: t('What would let the wish to go and the caution about going sit at the same table?', 'Čo by dovolilo túžbe ísť a opatrnosti pred cestou sedieť pri jednom stole?'),
    },
};
const prepare = {
    id: 'travel-experiences.prepare',
    areaId: 'travel-experiences',
    label: t('Explore how to prepare thoughtfully', 'Preskúmať, ako sa premyslene pripraviť'),
    focus: t('Hold in mind an experience you want to meet with care, and the part of it you most want to feel ready for.', 'Maj na mysli zážitok, ku ktorému chceš pristupovať s rozvahou, a tú jeho časť, na ktorú sa chceš najviac pripraviť.'),
    semantics: {
        explores: t('how to prepare for something new with care, and where that preparation tends to lead', 'to, ako sa s rozvahou pripraviť na niečo nové a kam taká príprava smeruje'),
        reflection: 'step',
        practical: 'prepare',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'legal-claim', 'financial-advice'],
    },
    spreadId: 'situation-action-outcome',
    category: 'action-guidance',
    guidance: 'act',
    temporal: 'future',
    relationshipType: null,
    places: [
        { label: t('How things stand', 'Ako veci stoja'),
            ask: t('The situation as it is before setting out: what is clear, what is open and what is simply unknown.', 'Situácia taká, aká je pred začiatkom: čo je jasné, čo je otvorené a čo je jednoducho neznáme.'),
            frame: {
                steady: t('Before anything starts, a situation usually holds three kinds of things: what is settled, what can still be found out, and what only the experience will show.', 'Pred začiatkom sa v situácii zvyčajne nájdu tri druhy vecí: čo je isté, čo sa ešte dá zistiť a čo ukáže až samotný zážitok.'),
                strained: t('Questions can arrive all at once here, until the starting point feels like a crowd and getting ready seems to mean answering every one.', 'Otázky tu môžu prísť naraz, až východisko pripomína dav a príprava akoby znamenala zodpovedať každú z nich.'),
            } },
        { label: t('A fitting preparation', 'Vhodná príprava'),
            ask: t('A stance that suits this moment: a way of getting ready that is ordinary, small and your own.', 'Postoj, ktorý sa hodí do tejto chvíle: spôsob prípravy, ktorý je obyčajný, malý a tvoj.'),
            frame: {
                steady: t('Proportion is usually what makes a preparation fit: some care, some room left over, and no pretence of covering everything.', 'Primeranou robí prípravu zvyčajne zmysel pre mieru: trochu starostlivosti, trochu voľného miesta a žiadne predstieranie, že sa dá pokryť všetko.'),
                strained: t('Readiness can turn into a task with no end, or shrink into hoping for the best, and either way proportion is what goes missing.', 'Pripravenosť sa môže zmeniť na úlohu bez konca alebo scvrknúť na dúfanie, že to nejako pôjde, a v oboch prípadoch sa stráca miera.'),
            } },
        { label: t('Where it tends to lead', 'Kam taká príprava smeruje'),
            ask: t('The direction that preparation tends to give the experience, as a tendency and never as a promise.', 'Smer, ktorý zážitku príprava zvyčajne dáva: sklon, nie prísľub.'),
            frame: {
                steady: t('Preparation tends to give an experience a little slack, enough that attention can lift from the plan and go to what is actually there.', 'Príprava zvykne zážitku dať trochu voľnosti, aby sa pozornosť mohla zdvihnúť od plánu a zamerať na to, čo tam skutočne je.'),
                strained: t('Checking can become a way of keeping the experience at a distance, with the plan seen more clearly than the place it was made for.', 'Kontrolovanie sa môže zmeniť na spôsob, ako udržať zážitok od seba, pričom plán je vidieť jasnejšie než miesto, pre ktoré vznikol.'),
            } },
    ],
    opening: t('This reading looks at preparing for something new with care. The first card is how things stand before setting out, the second a fitting way to prepare, and the third the direction that preparation tends to give (a tendency, not a promise).', 'Toto čítanie sa pozerá na to, ako sa s rozvahou pripraviť na niečo nové. Prvá karta je to, ako veci stoja pred začiatkom, druhá vhodný spôsob prípravy a tretia smer, ktorý taká príprava zvykne dávať (sklon, nie prísľub).'),
    takeaway: {
        act: t('A small, ordinary piece of preparation could be enough to begin with: reading how a place describes itself, learning a few words of its language, or laying out what is wanted within reach.', 'Na začiatok by mohol stačiť malý, obyčajný kus prípravy: čítanie o tom, ako sa miesto predstavuje samo, pár slov z jeho jazyka alebo vyloženie vecí, ktoré chceš mať po ruke.'),
        ease: t('Preparation may be lighter than it feels: a plan can leave room for an afternoon nobody arranged and for whatever cannot be foreseen.', 'Príprava môže byť ľahšia, než sa zdá: plán môže nechať miesto pre popoludnie, ktoré nikto nezariadil, aj pre to, čo sa predvídať nedá.'),
        face: t('Preparing well may start with looking straight at what feels uncertain and sorting it into what can be arranged and what can only be met when it comes.', 'Dobrá príprava môže začať priamym pohľadom na to, čo pôsobí neisto, a roztriedením na to, čo sa dá zariadiť, a to, čo sa dá len stretnúť, keď to príde.'),
        weave: t('The practical side and the felt side can be packed together: what goes in the bag and what goes in the mind, with the same amount of care.', 'Praktická a pocitová stránka sa dajú zbaliť spolu: to, čo ide do tašky, aj to, čo ide do mysle, s rovnakou starostlivosťou.'),
    },
    closings: {
        act: t('Which one piece of getting ready would feel most worth doing first?', 'Ktorý jeden kus prípravy by sa oplatilo urobiť ako prvý?'),
        ease: t('What might it mean to leave one corner of the plan open?', 'Čo by mohlo znamenať nechať jeden kút plánu otvorený?'),
        face: t('Which part of getting ready is care, and which part is a wish for certainty?', 'Ktorá časť prípravy je starostlivosť a ktorá túžba po istote?'),
        weave: t('What would you like to bring along that cannot be packed?', 'Čo chceš vziať so sebou, aj keď sa to nedá zbaliť?'),
    },
};
const teaches = {
    id: 'travel-experiences.teaches',
    areaId: 'travel-experiences',
    label: t('Discover what a new experience may teach me', 'Objaviť, čo ma môže naučiť nový zážitok'),
    focus: t('Hold in mind an experience, past or imagined, that took or could take you out of your usual ground.', 'Maj na mysli zážitok, minulý alebo predstavený, ktorý ťa vyviedol alebo by ťa mohol vyviesť z obvyklého prostredia.'),
    semantics: {
        explores: t('what a new experience asks of the body, the mind and the sense of what matters', 'to, čo nový zážitok žiada od tela, mysle a pocitu toho, na čom záleží'),
        reflection: 'meaning',
        practical: 'name',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'legal-claim', 'financial-advice'],
    },
    spreadId: 'body-mind-spirit',
    category: 'self-development',
    guidance: 'reflect',
    temporal: 'timeless',
    relationshipType: null,
    places: [
        { label: t('What it asks of the body', 'Čo žiada od tela'),
            ask: t('The lived, practical side of the experience: tiredness, hunger, pace, the senses in a new place.', 'Prežívaná, praktická stránka zážitku: únava, hlad, tempo, zmysly na novom mieste.'),
            frame: {
                steady: t('In a new place the body usually answers first, through its pace, its hunger and its tiredness, well before any thought has formed.', 'V novom prostredí telo zvyčajne odpovedá ako prvé, svojím tempom, hladom a únavou, dávno predtým, než sa sformuluje nejaká myšlienka.'),
                strained: t('Tiredness, overload or restlessness can crowd this place and colour whatever else is seen, so that the body’s limits drown out the rest.', 'Únava, preťaženie či nepokoj môžu zaplniť toto miesto a sfarbiť všetko ostatné, čo sa vidí, takže hranice tela prehlušia zvyšok.'),
            } },
        { label: t('What it asks of the mind', 'Čo žiada od mysle'),
            ask: t('How thinking and feeling meet the unfamiliar: what is learned, what is mistaken, what is felt when everything around is foreign.', 'Ako sa myslenie a cit stretávajú s neznámym: čo sa učí, v čom sa mýli a čo sa cíti, keď je všetko naokolo cudzie.'),
            frame: {
                steady: t('Thinking in unfamiliar surroundings tends to be a sorting job: picking up a few words, noticing what was assumed, correcting small mistakes.', 'Myslenie v cudzom prostredí zvykne byť triedenie: zachytiť pár slov, všimnúť si, čo sa predpokladalo, opraviť drobné omyly.'),
                strained: t('Mistakes repeat, assumptions get defended, or the place refuses to be made simple, and the mind can feel swamped rather than curious.', 'Omyly sa opakujú, predpoklady sa bránia alebo miesto odmieta byť jednoduché, a myseľ sa môže cítiť skôr zaplavená než zvedavá.'),
            } },
        { label: t('What it is about underneath', 'O čom je to v hĺbke'),
            ask: t('The value or meaning under the experience: what it touches in what matters to you.', 'Hodnota alebo zmysel pod zážitkom: čoho sa dotýka z toho, na čom ti záleží.'),
            frame: {
                steady: t('Beneath what happens, an experience often touches something valued: curiosity, humility, gratitude, or a clearer sense of what matters at home.', 'Pod tým, čo sa deje, sa zážitok často dotýka niečoho cenného: zvedavosti, pokory, vďačnosti alebo jasnejšieho pocitu, na čom záleží doma.'),
                strained: t('Meaning can come slowly and untidily here, with a value shaken and a question left standing where a conclusion was expected.', 'Zmysel tu môže prichádzať pomaly a neuhladene, s otrasenou hodnotou a otázkou, ktorá zostáva stáť tam, kde sa čakal záver.'),
            } },
    ],
    opening: t('This reading looks at what a new experience may teach. The first card is its lived, practical side, the second how thought and feeling meet it, and the third what it is about underneath, in terms of what matters to you.', 'Toto čítanie sa pozerá na to, čo môže nový zážitok naučiť. Prvá karta je jeho prežívaná, praktická stránka, druhá to, ako sa s ním stretáva myslenie a cit, a tretia to, o čom je v hĺbke, v zmysle toho, na čom ti záleží.'),
    takeaway: {
        act: t('A single plain sentence may be enough to name one thing the unfamiliar setting showed, and ordinary days can then show whether it holds.', 'Môže stačiť jedna jasná veta, ktorá pomenuje jednu vec, čo neznáme prostredie ukázalo; či platí, sa dá vidieť v obyčajných dňoch.'),
        ease: t('Not every lesson needs collecting at once; some arrive late, over a meal back home, and ask only for room.', 'Nie každé poučenie treba zbierať hneď; niektoré prídu neskôr, pri jedle doma, a žiadajú len miesto.'),
        face: t('What the experience shows may be unflattering, such as a limit, a habit or an assumption, and it can be taken as information about how the new is met rather than a verdict.', 'To, čo zážitok ukazuje, nemusí lichotiť, napríklad hranica, zvyk či predpoklad, a dá sa to brať ako informácia o tom, ako sa človek stretáva s novým, nie ako rozsudok.'),
        weave: t('What the body noticed, what the mind made of it and what it meant underneath can be set side by side, so that the lesson becomes one story instead of three.', 'Čo telo zaznamenalo, čo si z toho myseľ vytvorila a čo to znamenalo v hĺbke, sa dá položiť vedľa seba, aby poučenie bolo jedným príbehom, nie tromi.'),
    },
    closings: {
        act: t('What from the new is worth carrying into ordinary days?', 'Čo z nového sa oplatí preniesť do obyčajných dní?'),
        ease: t('What might the unfamiliar be teaching that words have not yet caught up with?', 'Čo ťa môže naučiť to neznáme, na čo slová ešte nedosiahli?'),
        face: t('Which lesson would still be worth having if nobody else ever heard about it?', 'Ktoré poučenie by stálo za to mať, aj keby sa o ňom nikto iný nedozvedel?'),
        weave: t('How might what the body, the mind and the deeper sense of the experience each showed fit into one account?', 'Ako by sa dalo to, čo ukázalo telo, myseľ aj hlbší zmysel zážitku, poskladať do jedného príbehu?'),
    },
};
export const TRAVEL_AREA = {
    id: 'travel-experiences',
    label: t('Travel & New Experiences', 'Cestovanie a nové zážitky'),
    blurb: t('Curiosity, the unfamiliar and what an experience leaves behind.', 'Zvedavosť, neznáme a to, čo po sebe zážitok zanecháva.'),
    scope: t('going toward the unfamiliar and what it leaves behind', 'cesta k neznámemu a to, čo po nej zostane'),
    intentions: [draw, unknown, prepare, teaches],
    lens,
};
