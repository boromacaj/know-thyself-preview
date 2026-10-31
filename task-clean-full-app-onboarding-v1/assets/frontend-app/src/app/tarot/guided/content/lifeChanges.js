/**
 * LIFE CHANGES & DECISIONS - thresholds and transitions in general.
 *
 * This area owns the passage itself: a crossroads, a chapter closing, a new one starting, the in-between, resisting change and
 * adapting to it. It does not own a specific house move (Home), a trip (Travel), a job (Work) or a relationship (Relationships).
 * It never picks a path for the person: it shows what each holds and what the choice turns on.
 *
 * The area itself says one thing about the whole (majorWeight); everything else a reading says about a place comes from the
 * engine's own sentences and from the frames of the chosen intention below.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    majorWeight: t('Where most of the cards are Major Arcana, a change tends to be less a passing adjustment than a matter of something lasting in how a life is shaped.', 'Keď je väčšina z troch kariet z Veľkých arkán, zmena zvykne byť menej prechodnou úpravou a viac vecou niečoho trvalého v tom, ako sa život uberá.'),
};
const crossroads = {
    id: 'life-changes.crossroads',
    areaId: 'life-changes',
    label: t('Understand my current crossroads', 'Pochopiť rázcestie, na ktorom práve stojím'),
    focus: t('Hold in mind the two directions in front of you, and what each one seems to hold.', 'Maj na mysli dva smery pred sebou a to, čo v každom z nich tušíš.'),
    semantics: {
        explores: t('two paths in front of you and what the choice between them turns on', 'dve cesty pred tebou a to, na čom stojí voľba medzi nimi'),
        reflection: 'weigh',
        practical: 'ask',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'other-person-mind'],
    },
    spreadId: 'option-a-b-guidance',
    category: 'binary-decision',
    guidance: 'decide',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('The first path', 'Prvá cesta'),
            ask: t('What this path holds: what it offers, what it asks of you and what it leaves behind.', 'Čo táto cesta obsahuje: čo ponúka, čo od teba žiada a čo necháva za sebou.'),
            frame: {
                steady: t('Seen up close, a path shows itself in small things: the hours it would fill, the people around it and the habits it would grow.', 'Zblízka sa cesta ukazuje v drobnostiach: v hodinách, ktoré by vypĺňala, v ľuďoch okolo nej a v zvykoch, ktoré by pestovala.'),
                strained: t('Looking at this path squarely is harder than it sounds: a cost slips past unnoticed, or the attraction runs ahead of any reason for it.', 'Pozrieť sa na túto cestu priamo je ťažšie, než znie: cena sa ľahko prehliadne alebo príťažlivosť predbehne akýkoľvek dôvod.'),
            } },
        { label: t('The second path', 'Druhá cesta'),
            ask: t('What this path holds, looked at as fairly as the first, with no ranking implied.', 'Čo obsahuje táto cesta, keď sa na ňu pozrieš rovnako spravodlivo ako na prvú, bez náznaku poradia.'),
            frame: {
                steady: t('Here the other path gets the same plain hearing as the first: what it keeps alive in a life, with no rank and no head start.', 'Druhá cesta tu dostáva rovnaký pohľad ako prvá: čo v živote udržiava nažive, bez poradia a bez náskoku.'),
                strained: t('If this path feels unproven, that unease tends to colour the whole look at it, and being fair to it takes deliberate effort.', 'Ak sa táto cesta zdá neoverená, nepokoj sa premieta do celého pohľadu na ňu a spravodlivosť voči nej si žiada vedomé úsilie.'),
            } },
        { label: t('What the choice turns on', 'Na čom voľba stojí'),
            ask: t('The consideration that decides between the two, named as a criterion and not as a winner.', 'Hľadisko, od ktorého závisí voľba medzi nimi, pomenované ako kritérium, nie ako víťaz.'),
            frame: {
                steady: t('Usually something plain separates two paths: a value, a need or a limit that can be said aloud without ranking either one.', 'Rozdiel medzi dvoma cestami zvykne stáť na niečom obyčajnom: na hodnote, potrebe alebo hranici, ktorú sa dá povedať nahlas.'),
                strained: t('When the criterion itself is contested, two values pull against each other, and it is not yet clear which one the choice rests on.', 'Keď je samo hľadisko sporné, dve hodnoty stoja proti sebe a zatiaľ nie je jasné, o ktorú z nich sa voľba opiera.'),
            } },
    ],
    opening: t('This reading looks at a crossroads you are standing at. The first card is one path and what it holds, the second the other path, read as evenly, and the third what the choice turns on. It does not pick a path: it shows what each holds and what the decision rests on.', 'Toto čítanie sa pozerá na rázcestie, na ktorom stojíš. Prvá karta ukazuje jednu cestu a to, čo v nej je, druhá druhú, čítanú rovnako spravodlivo, a tretia to, na čom voľba stojí. Žiadnu cestu nevyberá: ukazuje, čo každá obsahuje a o čo sa rozhodnutie opiera.'),
    takeaway: {
        act: t('A small, ordinary step could be to set down what a typical week on each path would hold, and to read the two side by side.', 'Malým, obyčajným krokom môže byť zapísať si, čo by obsahoval bežný týždeň na každej ceste, a prečítať si oba zápisy vedľa seba.'),
        ease: t('This may be less about deciding sooner than about giving the choice room: time for what each path holds to become clearer first.', 'Môže ísť menej o rýchlejšie rozhodnutie a viac o priestor pre voľbu: o čas, v ktorom sa najprv ukáže, čo ktorá cesta obsahuje.'),
        face: t('What may help here is a direct look at what each path costs as well as what it offers, said plainly for both.', 'Pomôcť môže pozrieť sa priamo na to, čo každá cesta stojí aj čo ponúka, a povedať si to jasne pri oboch.'),
        weave: t('This may be about letting head and heart look at the same two paths, so that both what is thought and what is felt are heard before a criterion is set.', 'Môže ísť o to, aby sa na tie isté dve cesty pozerala hlava aj srdce a zaznelo, čo sa o nich myslí a čo sa k nim cíti, skôr než sa určí hľadisko.'),
    },
    closings: {
        act: t('What do you need to know about each path before the choice feels like your own?', 'Čo o každej z ciest potrebuješ vedieť, aby sa ti voľba zdala vlastná?'),
        ease: t('What would change if the choice were given a little more time, and what would stay the same?', 'Čo by sa zmenilo, keby voľba dostala o niečo viac času, a čo by zostalo rovnaké?'),
        face: t('What does each path protect, and what of that is hard for you to lose?', 'Čo každá z ciest chráni a čo z toho je pre teba ťažké stratiť?'),
        weave: t('Which consideration keeps coming back when the two paths are set side by side?', 'Ktoré hľadisko sa stále vracia, keď si obe cesty položíš vedľa seba?'),
    },
};
const release = {
    id: 'life-changes.release',
    areaId: 'life-changes',
    label: t('Explore what I may need to release', 'Preskúmať, čo možno potrebujem pustiť'),
    focus: t('Hold in mind something you sense you are still carrying from a chapter that has changed.', 'Maj na mysli niečo, o čom tušíš, že to ešte nosíš z kapitoly, ktorá sa zmenila.'),
    semantics: {
        explores: t('what may be worth setting down as a chapter changes, and what keeps it in hand', 'to, čo sa oplatí odložiť, keď sa kapitola mení, a čo to drží na mieste'),
        reflection: 'release',
        practical: 'put-down',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim', 'health-claim', 'other-person-mind'],
    },
    spreadId: 'problem-cause-solution',
    category: 'emotional',
    guidance: 'unblock',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What is hard to loosen', 'Čo sa ťažko uvoľňuje'),
            ask: t('How the holding on shows up on the surface: a habit, a plan or a picture that has stayed longer than it served.', 'Ako sa to, čo držíš, ukazuje navonok: zvyk, plán alebo obraz, ktorý zostal dlhšie, než slúžil.'),
            frame: {
                steady: t('Usually it is something ordinary and easy to name: an object, a role or a routine kept up for perfectly good reasons.', 'Zvyčajne ide o niečo obyčajné, čo sa dá ľahko pomenovať: vec, rola alebo zvyk, ktoré sa udržiavajú z celkom dobrých dôvodov.'),
                strained: t('What is held has become something to guard rather than to use, and even a slight loosening can feel like a loss.', 'To, čo sa drží, sa už skôr stráži, než používa, a aj mierne uvoľnenie môže pôsobiť ako strata.'),
            } },
        { label: t('What keeps hold of it', 'Čo to drží'),
            ask: t('What underneath keeps it in place: what it protects, what it stands in for, what it would mean to put it down.', 'Čo to pod povrchom drží na mieste: čo to chráni, čo zastupuje a čo by znamenalo to odložiť.'),
            frame: {
                steady: t('Behind a firm hold there is often loyalty rather than stubbornness: a sense of belonging, or a memory of who one used to be.', 'Za pevným stiskom býva často skôr vernosť než tvrdohlavosť: pocit príslušnosti alebo spomienka na to, kým človek býval.'),
                strained: t('A fear tends to sit underneath: that letting go would leave a gap nothing fills, or that the past would then count for less.', 'Pod tým sa zvykne ukrývať obava, že pustenie nechá medzeru, ktorú nič nezaplní, alebo že minulosť by potom mala menšiu váhu.'),
            } },
        { label: t('A way of setting it down', 'Spôsob, ako to odložiť'),
            ask: t('A stance that speaks to that holding. It asks for a manner of letting go, not for a result.', 'Postoj, ktorý sa hodí k tomu, čo sa drží. Ide o spôsob pustenia, nie o výsledok.'),
            frame: {
                steady: t('Letting go can be a slow, partial and respectful matter, done at the pace the thing deserves and with thanks for what it gave.', 'Pustenie môže byť pomalé, po častiach a úctivé, vo vlastnom tempe a s vďakou za to, čo vec dala.'),
                strained: t('Done too fast, too bluntly or under pressure from outside, letting go feels more like loss than like relief.', 'Keď sa pustenie deje príliš rýchlo, zhurta alebo pod tlakom zvonka, pôsobí skôr ako strata než ako úľava.'),
            } },
    ],
    opening: t('This reading looks at what you may need to release as something changes. The first card is where the holding on shows, the second what underneath keeps it in place, and the third a stance toward setting it down. It reads patterns rather than verdicts: nothing here says that something must be given up.', 'Toto čítanie sa pozerá na to, čo možno potrebuješ pustiť, keď sa niečo mení. Prvá karta ukazuje, kde sa zovretie prejavuje, druhá, čo ho pod povrchom drží, a tretia, aký postoj sa hodí k odloženiu. Číta vzorce, nie rozsudky: nič tu nehovorí, že sa niečoho treba vzdať.'),
    takeaway: {
        act: t('One small act may be enough here: setting aside a single object, an open loop or an old argument that no longer needs carrying.', 'Môže stačiť jeden malý krok: odložiť jednu vec, uzavrieť jednu otvorenú záležitosť alebo prestať omieľať starý spor, ktorý netreba nosiť ďalej.'),
        ease: t('This may be less about forcing a release than about loosening, one finger at a time, with room to keep what still matters.', 'Môže ísť menej o vynútené pustenie a viac o uvoľňovanie prst po prste, s priestorom ponechať si to, na čom ešte záleží.'),
        face: t('What may help here is looking at what is held before putting it down: what it has given, and what carrying it on now costs.', 'Pomôcť môže pozrieť sa na to, čo sa drží, ešte pred odložením: čo to dalo a čo stojí nosiť to ďalej.'),
        weave: t('Thanks and release can arrive together: it may be possible to honour what the old thing gave and still accept that its season has turned.', 'Vďaka a pustenie môžu prísť spolu: dá sa uznať, čo staré dalo, a zároveň prijať, že jeho obdobie sa skončilo.'),
    },
    closings: {
        act: t('What small thing could be set down first, and what room would that make?', 'Čo malé sa dá odložiť ako prvé a aké miesto by tým vzniklo?'),
        ease: t('What would a gentler way of setting it down look like?', 'Aký by bol jemnejší spôsob, ako to odložiť?'),
        face: t('What has the thing you are holding been protecting, and how much of that still needs protecting?', 'Čo to, čo držíš, doteraz chránilo, a koľko z toho ešte ochranu potrebuje?'),
        weave: t('What would be lighter to carry if it were set down, and what from it is worth keeping?', 'Čo by bolo ľahšie niesť, keby sa to odložilo, a čo z toho stojí za zachovanie?'),
    },
};
const resources = {
    id: 'life-changes.resources',
    areaId: 'life-changes',
    label: t('Recognize my available resources', 'Rozpoznať zdroje, ktoré mám po ruke'),
    focus: t('Hold in mind a change you are facing and what you have to meet it with.', 'Maj na mysli zmenu, ktorej čelíš, a to, čím jej môžeš ísť v ústrety.'),
    semantics: {
        explores: t('what you already carry into a change and what else is within reach', 'to, čo do zmeny už nesieš a čo ďalšie máš na dosah'),
        reflection: 'resource',
        practical: 'name',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim'],
    },
    spreadId: 'resources-view',
    category: 'general-reflection',
    guidance: 'resources',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What you already carry', 'Čo už nosíš so sebou'),
            ask: t('The qualities, skills and experience you bring with you into this change.', 'Vlastnosti, schopnosti a skúsenosti, ktoré do tejto zmeny prinášaš so sebou.'),
            frame: {
                steady: t('This tends to be what has already been tested: skills, steadiness or experience that have held up somewhere before.', 'Býva to skôr osvedčené než želané: schopnosti, vyrovnanosť alebo skúsenosť, ktoré už niekde obstáli.'),
                strained: t('A resource carried for long can look worn, overstretched or simply ordinary, and so be hard to recognise as strength.', 'Zdroj, ktorý sa nosí dlho, môže pôsobiť opotrebovane, preťažene alebo celkom obyčajne, a preto sa ťažko spoznáva ako sila.'),
            } },
        { label: t('What else is within reach', 'Čo je ešte na dosah'),
            ask: t('What is available beyond what you already carry: a support, a habit, a pause, a place to stand.', 'Čo je k dispozícii okrem toho, čo už nosíš: opora, zvyk, oddych, pevné miesto pod nohami.'),
            frame: {
                steady: t('Within reach tends to mean just outside the usual round: a support, a rest or a wider view, near but not yet part of the routine.', 'Na dosah býva niečo tesne za hranicou každodenného: opora, oddych alebo širší pohľad, ktoré sú blízko, no ešte nepatria k bežnému dňu.'),
                strained: t('Reaching for support can feel awkward or uncertain here, and getting to it may cost effort, pride or a plain admission of need.', 'Siahnuť po opore môže byť nepríjemné alebo neisté a dostať sa k nej môže stáť námahu, hrdosť či priznanie potreby.'),
            } },
        { label: t('Where to put it to use', 'Kde to využiť'),
            ask: t('The part of the transition where these could be put to work, as a direction to try and not a plan.', 'Časť zmeny, kde by sa to dalo uplatniť: smer na vyskúšanie, nie plán.'),
            frame: {
                steady: t('Here a strength meets a task: the point where what is available lines up with what the change actually needs.', 'Tu sa sila stretáva s úlohou: v mieste, kde sa to, čo je k dispozícii, zhoduje s tým, čo zmena naozaj potrebuje.'),
                strained: t('Strength and task do not quite match: a resource set to work where it does not fit, or spread thin over too many fronts.', 'Sila a úloha sa celkom nezhodujú: zdroj nasadený tam, kde nesedí, alebo rozotretý na príliš veľa frontov.'),
            } },
    ],
    opening: t('This reading looks at the resources you have for a change. The first card is what you already carry into it, the second what else lies within reach, and the third where those strengths could be put to use.', 'Toto čítanie sa pozerá na zdroje, ktoré máš pre zmenu, ktorou prechádzaš. Prvá karta je to, čo do nej už nesieš, druhá to, čo je okrem toho na dosah, a tretia miesto, kde by sa tieto silné stránky dali využiť.'),
    takeaway: {
        act: t('Trying one of these resources in a small, ordinary way could show how the change responds to it.', 'Vyskúšať jeden z týchto zdrojov malým, obyčajným spôsobom môže ukázať, ako naň zmena reaguje.'),
        ease: t('Rest and margin count as resources too, and leaving a little room around the change may keep what is carried from being spent all at once.', 'Aj oddych a rezerva sú zdroje a trochu priestoru okolo zmeny môže zabrániť tomu, aby sa to, čo sa nesie, minulo naraz.'),
        face: t('What may help here is a plain stock-take of what is actually available, including what is smaller or thinner than hoped.', 'Pomôcť môže triezvy prehľad toho, čo je naozaj po ruke, aj toho, čo je menšie či slabšie, než sa dúfalo.'),
        weave: t('This may be about seeing how the strengths fit together, so that skill, support and steadiness meet the change as one whole.', 'Môže ísť o to vidieť, ako do seba silné stránky zapadajú, aby schopnosť, opora a vyrovnanosť stretli zmenu ako jeden celok.'),
    },
    closings: {
        act: t('Which part of the change could use more of what you already carry, and which part needs something different?', 'Ktorá časť zmeny by mohla využiť viac z toho, čo už nosíš, a ktorá potrebuje niečo iné?'),
        ease: t('What has carried you through a change before, and what of that is still within reach?', 'Čo ťa už raz prenieslo cez zmenu a čo z toho je stále na dosah?'),
        face: t('Which of your own resources do you treat as ordinary, though they carry a good deal of weight?', 'Ktoré z tvojich zdrojov berieš ako samozrejmosť, hoci nesú veľa váhy?'),
        weave: t('Who or what, besides your own effort, belongs on the list of what you have?', 'Kto alebo čo okrem tvojho vlastného úsilia patrí na zoznam toho, čo máš?'),
    },
};
const forward = {
    id: 'life-changes.forward',
    areaId: 'life-changes',
    label: t('Reflect on how to move forward', 'Zamyslieť sa nad tým, ako ísť ďalej'),
    focus: t('Hold in mind the situation you are in, and the sense that something is ready to move.', 'Maj na mysli situáciu, v ktorej si, a pocit, že sa niečo chystá pohnúť.'),
    semantics: {
        explores: t('where a transition stands and which small response fits it', 'to, kde sa zmena nachádza a aká malá odpoveď jej sedí'),
        reflection: 'step',
        practical: 'try',
        forbids: ['predict-outcome', 'life-directive', 'fate-claim'],
    },
    spreadId: 'situation-action-outcome',
    category: 'action-guidance',
    guidance: 'act',
    temporal: 'future',
    relationshipType: null,
    places: [
        { label: t('Where things stand', 'Ako veci stoja'),
            ask: t('The situation as it is now, described plainly, without hopes or fears added ahead of it.', 'Situácia taká, aká je teraz, opísaná jasne, bez nádejí a obáv pridaných dopredu.'),
            frame: {
                steady: t('Most situations in transition hold all three at once: something already shifted, something settled and something still open.', 'Situácia uprostred zmeny zvyčajne drží všetky tri naraz: niečo, čo sa už pohlo, niečo usadené a niečo, čo je ešte otvorené.'),
                strained: t('Urgency, tiredness or crowding press on the situation, so that too much arrives at once to see where the floor still holds.', 'Naliehavosť, únava alebo tlačenica na situáciu doliehajú, takže je naraz priveľa na to, aby bolo vidieť, kde podlaha ešte drží.'),
            } },
        { label: t('A fitting response', 'Vhodná odpoveď'),
            ask: t('A way of responding that suits the situation as it stands: small, ordinary and within your own reach.', 'Spôsob odpovede, ktorý situácii sedí: malý, obyčajný a v tvojom dosahu.'),
            frame: {
                steady: t('A fitting response tends to look unremarkable from outside: it matches the size of what is actually there and uses what is already to hand.', 'Vhodná odpoveď zvykne zvonka vyzerať nenápadne: zodpovedá veľkosti toho, čo tu naozaj je, a používa to, čo je už po ruke.'),
                strained: t('Out of proportion, a response is too large, too hasty or too guarded for what the situation calls for.', 'Neprimeraná odpoveď je príliš veľká, príliš unáhlená alebo príliš opatrná na to, čo situácia vyžaduje.'),
            } },
        { label: t('Where that response tends to lead', 'Kam taká odpoveď zvykne viesť'),
            ask: t('The direction such a response tends to open, offered as a tendency and never as a promise.', 'Smer, ktorý takáto odpoveď zvykne otvárať, ako tendencia, nie sľub.'),
            frame: {
                steady: t('This is a heading held loosely rather than a destination: where a response like this tends to lean, with no end point fixed.', 'Ide skôr o voľne držaný smer než o cieľ: o to, kam sa taká odpoveď zvykne priklánať, bez pevne daného konca.'),
                strained: t('Doubt tends to follow the response here: whether it leads anywhere at all, and a pull to drop it before it has had room to show anything.', 'Za odpoveďou zvykne prísť pochybnosť, či vôbec niekam vedie, a pokušenie vzdať ju skôr, než dostane priestor niečo ukázať.'),
            } },
    ],
    opening: t('This reading looks at how to move forward through a change. The first card is the situation as it stands, the second a response that fits it, and the third the direction such a response tends to open. It names a tendency, not a promise.', 'Toto čítanie sa pozerá na to, ako ísť zmenou ďalej. Prvá karta je situácia taká, aká je, druhá odpoveď, ktorá jej sedí, a tretia smer, ktorý takáto odpoveď zvykne otvárať. Pomenúva tendenciu, nie sľub.'),
    takeaway: {
        act: t('The next step may well be small and ordinary: a conversation, a list, an hour set aside, whichever the situation actually calls for.', 'Ďalší krok môže byť malý a obyčajný: rozhovor, zoznam, vyhradená hodina, podľa toho, čo situácia naozaj vyžaduje.'),
        ease: t('Moving forward may mean moving less: a slower pace, setting aside what is not needed for now, and letting the next step show itself.', 'Ísť ďalej môže znamenať hýbať sa menej: spomaliť, odložiť, čo teraz netreba, a nechať ďalší krok, nech sa ukáže sám.'),
        face: t('The way forward may begin with looking squarely at where things stand and saying it plainly, before any step is chosen.', 'Cesta ďalej môže začať priamym pohľadom na to, ako veci stoja, a jasným pomenovaním, skôr než sa vyberie akýkoľvek krok.'),
        weave: t('It may help to let the step fit the whole picture: what is practical, what is felt and what matters, gathered into one small move.', 'Môže pomôcť nechať krok zapadnúť do celého obrazu: čo je praktické, čo sa cíti a na čom záleží, v jednom malom pohybe.'),
    },
    closings: {
        act: t('What would a step in proportion to the situation look like, neither larger nor smaller?', 'Ako by vyzeral krok primeraný situácii, ani väčší, ani menší?'),
        ease: t('What could be left alone for now, so that the next step has some room?', 'Čo sa dá zatiaľ nechať tak, aby mal ďalší krok priestor?'),
        face: t('What would help you see the situation plainly before any step is chosen?', 'Čo by pomohlo vidieť situáciu jasne, skôr než sa vyberie akýkoľvek krok?'),
        weave: t('What is the smallest step that would still feel like your own?', 'Aký najmenší krok by ti ešte pripadal vlastný?'),
    },
};
export const LIFE_CHANGES_AREA = {
    id: 'life-changes',
    label: t('Life Changes & Decisions', 'Životné zmeny a rozhodnutia'),
    blurb: t('Crossroads, endings, beginnings and the stretch between them.', 'Rázcestia, konce, začiatky a obdobie medzi nimi.'),
    scope: t('thresholds and transitions in general', 'prahy a prechody vo všeobecnosti'),
    intentions: [crossroads, release, resources, forward],
    lens,
};
