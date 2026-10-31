/**
 * RELATIONSHIPS - what passes BETWEEN people.
 *
 * This area owns the connection itself: closeness, friction, repair, distance, and how the person takes part in it. It does
 * not own inner patterns (Personal growth), the decision to leave or stay (Life changes) or a shared household (Home).
 * Whatever is said of another person is a stance the cards show, never what that person thinks, feels or will do.
 *
 * What this file says: the area's one sentence about Major cards, and for each intention a frame for every place (one
 * sentence for a card that can be read plainly, one for a card under strain), a takeaway and a closing question for each
 * kind of answering card.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    majorWeight: t('When most of the three cards are Major Arcana, the matter reaches past an everyday exchange and touches something lasting in how the people involved relate.', 'Keď je väčšina kariet z Veľkých arkán, ide o viac než o bežnú výmenu: dotýka sa to niečoho trvalejšieho v tom, ako sa ľudia k sebe vzťahujú.'),
};
const current = {
    id: 'relationships.current-situation',
    areaId: 'relationships',
    label: t('Understand my current relationship situation', 'Pochopiť, ako to teraz vo vzťahu stojí'),
    focus: t('Hold in mind the relationship you want to understand, and how it feels to you right now.', 'Maj na mysli vzťah, ktorému chceš porozumieť, a to, ako ti v ňom teraz je.'),
    semantics: {
        explores: t('where one of your relationships stands right now', 'to, ako to teraz vyzerá v jednom z tvojich vzťahov'),
        reflection: 'orient',
        practical: 'name',
        forbids: ['other-person-mind', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'self-other-relationship',
    category: 'relationship',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('How you stand in it', 'Ako v ňom stojíš'),
            ask: t('Your own part in this connection right now: what you bring and how you hold it.', 'Tvoja vlastná časť v tomto vzťahu práve teraz: čo do neho prinášaš a ako to v ňom nesieš.'),
            frame: {
                steady: t('In practice this is the part played almost without thinking: the warmth, habits and ways of showing up by which someone is recognised in a connection.', 'V praxi je to úloha hraná takmer bez rozmýšľania: teplo, zvyky a spôsoby, ako sa ukázať, podľa ktorých je človek vo vzťahu spoznateľný.'),
                strained: t('Here a person\'s part tends to feel effortful: a role taken on too heavily, a stance kept up from habit, a way of showing up that has worn thin.', 'Tu sa vlastná úloha cíti namáhavo: rola, ktorú človek nesie priveľmi ťažko, postoj držaný zo zvyku, spôsob, ako sa ukázať, ktorý sa obnosil.'),
            } },
        { label: t('How the other side meets you', 'Ako ťa stretáva druhá strana'),
            ask: t('The stance the other side shows from where you stand: a role or a posture, never what they privately think.', 'Postoj druhej strany tak, ako ho vidíš zo svojho miesta: rola alebo spôsob vystupovania, nikdy to, čo si súkromne myslí.'),
            frame: {
                steady: t('From outside, a stance is what one meets first: an openness, a steadiness or a role that shows itself as soon as one turns toward the connection.', 'Zvonku človek naráža na postoj: otvorenosť, stálosť alebo rolu, ktorá sa ukáže, hneď ako sa k vzťahu obráti.'),
                strained: t('What reaches you may come across as guarded, stiff or demanding, which says how it looks from where you stand and nothing about what lies behind it.', 'To, čo k tebe prichádza, môže pôsobiť strážne, strnulo alebo náročne; hovorí to o tom, ako to vyzerá z tvojho miesta, nie o tom, čo je za tým.'),
            } },
        { label: t('What lives between you', 'Čo žije medzi vami'),
            ask: t('The dynamic that belongs to neither of you alone.', 'To, čo patrí vášmu vzťahu ako celku, a nie jednému z vás zvlášť.'),
            frame: {
                steady: t('Between two people there is usually a shared ground that neither owns alone: a rhythm, a private joke, a way of talking, a quiet that is comfortable.', 'Medzi dvoma ľuďmi býva spoločná pôda, ktorú nevlastní nikto sám: rytmus, súkromný vtip, spôsob rozprávania, ticho, v ktorom je príjemne.'),
                strained: t('What sits between you can feel like a pattern that keeps coming round: a repeated exchange, an unspoken rule, a distance that has settled in.', 'Medzi vami sa môže usadiť vzorec, ktorý sa stále vracia: opakovaná výmena, nevyslovené pravidlo, odstup, ktorý ostal.'),
            } },
    ],
    opening: t('This reading looks at where one of your relationships stands right now. The first card is your own part in it, the second the stance the other side shows from where you stand, and the third what has grown between you.', 'Toto čítanie sa pozerá na to, ako to teraz vyzerá v jednom z tvojich vzťahov. Prvá karta je tvoja vlastná časť v ňom, druhá postoj, ktorý ukazuje druhá strana, a tretia to, čo medzi vami vyrástlo.'),
    takeaway: {
        act: t('A small, ordinary step could be naming where you stand: one conversation held, one habit adjusted, one boundary made visible.', 'Malým, obyčajným krokom môže byť pomenovanie toho, kde stojíš: jeden rozhovor, jedna upravená drobnosť, jedna viditeľná hranica.'),
        ease: t('This may be less about doing more than about giving the connection room: a slower pace, fewer demands, and time to settle into what it is.', 'Môže ísť menej o ďalšie úsilie a viac o priestor pre vzťah: pomalšie tempo, menej požiadaviek a čas, aby sa usadil v tom, čím je.'),
        face: t('What may help here is looking squarely at what is actually happening between you, without hurrying to fix it.', 'Pomôcť môže pozrieť sa priamo na to, čo sa medzi vami naozaj deje, bez náhlenia s opravou.'),
        weave: t('What may help is letting feeling, words and actions point the same way, so that the connection meets one steady expression of you.', 'Pomôcť môže, keď cit, slová a skutky mieria rovnakým smerom, takže k vzťahu prichádza jeden súdržný prejav.'),
    },
    closings: {
        act: t('What would your own part in this connection look like if you set the other side\'s posture aside for a moment?', 'Ako vyzerá tvoja vlastná časť v tomto vzťahu, keď na chvíľu necháš bokom postoj druhej strany?'),
        ease: t('What would a slower pace in this connection leave room for?', 'Čomu by urobilo miesto pomalšie tempo v tomto vzťahu?'),
        face: t('Which part of this connection would you like to meet with a little more honesty?', 'Ku ktorej časti tohto vzťahu chceš pristupovať o niečo úprimnejšie?'),
        weave: t('Which of the things that live between you would be worth choosing again?', 'Čo z toho, čo žije medzi vami, by stálo za to zvoliť si znova?'),
    },
};
const tension = {
    id: 'relationships.tension',
    areaId: 'relationships',
    label: t('Explore what creates tension', 'Preskúmať, čo vytvára napätie'),
    focus: t('Hold in mind a place in this relationship where things feel tight.', 'Maj na mysli miesto vo vzťahu, kde cítiš napätie.'),
    semantics: {
        explores: t('where tension between you and someone close shows up and what keeps it going', 'to, kde sa medzi tebou a niekým blízkym ukazuje napätie a čo ho živí'),
        reflection: 'untangle',
        practical: 'try',
        forbids: ['other-person-mind', 'predict-outcome', 'fate-claim', 'life-directive', 'health-claim'],
    },
    spreadId: 'problem-cause-solution',
    category: 'relationship',
    guidance: 'unblock',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('Where the tension shows', 'Kde sa napätie ukazuje'),
            ask: t('The point where the strain becomes visible between you, as it appears on the surface.', 'Miesto, kde je napätie medzi vami vidieť, tak ako sa ukazuje navonok.'),
            frame: {
                steady: t('On the surface, tension is usually something specific: a topic, a moment, a recurring scene that is easy to recognise once it is named.', 'Na povrchu je napätie zvyčajne niečo konkrétne: téma, okamih, opakujúca sa scéna, ktorú je ľahké spoznať, len čo sa pomenuje.'),
                strained: t('It tends to flare at a particular moment, topic or tone, and the strain is hardest to hide exactly there.', 'Napätie sa zvyčajne rozhorí v určitej chvíli, pri určitej téme alebo tóne, a práve tam sa najťažšie skrýva.'),
            } },
        { label: t('What keeps it going', 'Čo ho udržiava'),
            ask: t('The pattern underneath that feeds the tension, in how things are said, avoided or expected.', 'Vzorec pod povrchom, ktorý napätie živí: v tom, ako sa veci hovoria, obchádzajú alebo očakávajú.'),
            frame: {
                steady: t('Often what keeps tension going is also useful in some way: a habit that keeps the peace, or a role that gives each person a little footing.', 'Napätie často udržiava to, čo je zároveň na niečo dobré: zvyk, ktorý chráni pokoj, alebo rola, ktorá každému dáva trochu opory.'),
                strained: t('Pressure tends to feed this pattern: unspoken expectation, defensiveness or silence, repeating because looking at it would cost something.', 'Tento vzorec živí tlak: nevyslovené očakávanie, obrana alebo ticho, ktoré sa opakujú, lebo pozrieť sa na ne by niečo stálo.'),
            } },
        { label: t('How you can meet it', 'Ako sa k nemu môžeš postaviť'),
            ask: t('A stance on your side that speaks to that pattern. It asks for a way of being, not for a result.', 'Postoj na tvojej strane, ktorý odpovedá na ten vzorec: ide o spôsob, akým pristupuješ, nie o výsledok.'),
            frame: {
                steady: t('How one meets strain needs no one else to change first; it shows in a tone, a pace, a kind of honesty.', 'Spôsob, ako sa človek napätiu postaví, nečaká, kým sa zmení niekto iný; prejaví sa v tóne, tempe a druhu úprimnosti.'),
                strained: t('Meeting it can turn forced or half meant: real effort that lands as pressure, or a stance taken only to end the discomfort.', 'Čeliť napätiu môže vyznieť vynútene alebo napoly úprimne: skutočné úsilie, ktoré pôsobí ako nátlak, alebo postoj zaujatý len preto, aby nepohodlie skončilo.'),
            } },
    ],
    opening: t('This reading looks at tension between you and someone close. The first card is where the strain shows, the second the pattern underneath that keeps it going, and the third a stance you can take toward it. It reads patterns, not people: nothing here says what anyone intends.', 'Toto čítanie sa pozerá na napätie medzi tebou a niekým blízkym. Prvá karta je miesto, kde sa napätie ukazuje, druhá vzorec pod ním, ktorý ho udržiava, a tretia postoj, ktorý k nemu môžeš zaujať. Číta vzorce, nie ľudí: nič tu nehovorí o tom, čo kto zamýšľa.'),
    takeaway: {
        act: t('A small, specific change on your side could be enough to start with: one conversation held differently, one request made plainly.', 'Na začiatok môže stačiť malá, konkrétna zmena na tvojej strane: jeden rozhovor vedený inak, jedna prosba vyslovená jasne.'),
        ease: t('This may need less pushing and more room: a slower pace, lighter demands, and time for each side to answer in its own way.', 'Môže ísť o menej tlaku a viac priestoru: pomalšie tempo, menej požiadaviek a čas, aby každá strana odpovedala po svojom.'),
        face: t('What may help here is saying what the tension is, kindly and without blame, before trying to settle it.', 'Pomôcť môže pomenovať, o čo v napätí ide, láskavo a bez obviňovania, ešte skôr, než sa ho niekto pokúsi vyriešiť.'),
        weave: t('This may be less about any single move than about consistency, so that what you feel, say and do point the same way.', 'Môže ísť menej o jeden krok a viac o dôslednosť: aby cit, slová a skutky mierili tým istým smerom.'),
    },
    closings: {
        act: t('What would change in the tension if you named your own need in it first?', 'Čo sa v tom napätí môže zmeniť, ak ako prvú pomenuješ vlastnú potrebu?'),
        ease: t('What would a little less pressure from both sides leave room for?', 'Čomu by urobilo miesto o čosi menej tlaku z oboch strán?'),
        face: t('What tends to happen just before the tension rises, and what does that moment seem to ask for?', 'Čo sa zvyčajne deje tesne predtým, než napätie stúpne, a čo si ten okamih žiada?'),
        weave: t('How closely do what you feel, what you say and what you do match when things get tight?', 'Nakoľko spolu súhlasí to, čo cítiš, hovoríš a robíš, keď sa veci napnú?'),
    },
};
const help = {
    id: 'relationships.what-helps',
    areaId: 'relationships',
    label: t('Discover what may help', 'Nájsť, čo môže pomôcť'),
    focus: t('Hold in mind a connection you would like to feel more supported in.', 'Maj na mysli vzťah, v ktorom by sa ti hodila väčšia opora.'),
    semantics: {
        explores: t('what you already bring to a relationship and what could support it', 'to, čo do vzťahu už prinášaš a čo ho môže podporiť'),
        reflection: 'resource',
        practical: 'try',
        forbids: ['other-person-mind', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'resources-view',
    category: 'relationship',
    guidance: 'resources',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What you already bring', 'Čo do toho už prinášaš'),
            ask: t('The qualities and habits you already offer this connection.', 'Vlastnosti a návyky, ktoré tomuto vzťahu už teraz dávaš.'),
            frame: {
                steady: t('A strength already in use tends to be a quality or habit the relationship has long drawn on, often without anyone remarking on it.', 'Silná stránka, ktorá sa už používa, je zvyčajne vlastnosť alebo zvyk, o ktorý sa vzťah dlho opiera, často bez toho, aby si to niekto všimol.'),
                strained: t('Strength can be carried at a cost or in a distorted form: care that smothers, honesty that wounds, reliability that has stiffened into rigidity.', 'Silná stránka sa môže niesť za cenu alebo v pokrivenej podobe: starostlivosť, ktorá dusí, úprimnosť, ktorá zraňuje, spoľahlivosť, ktorá stuhla na strnulosť.'),
            } },
        { label: t('What is within reach', 'Čo je na dosah'),
            ask: t('What else is available to the connection beyond what you already give: a quality, a support, a shared ground.', 'Čo ďalšie má vzťah k dispozícii okrem toho, čo už dávaš: vlastnosť, oporu, spoločnú pôdu.'),
            frame: {
                steady: t('Support here may not yet be fully used: a quality held in reserve, a shared ground, a person or practice that steadies things.', 'Opora tu možno ešte nie je celkom využitá: vlastnosť v zálohe, spoločná pôda, človek alebo zvyk, ktorý veci upokojuje.'),
                strained: t('Support that exists can still be hard to reach, when what is offered is awkward to take or has conditions or old hurt around it.', 'Opora, ktorá existuje, môže byť ťažko dosiahnuteľná, keď je ponuka nepohodlná na prijatie alebo sa okolo nej držia podmienky či stará bolesť.'),
            } },
        { label: t('Where it could help', 'Kde by to mohlo pomôcť'),
            ask: t('The place in the relationship where these could be put to use, as a direction to try rather than a plan.', 'Miesto vo vzťahu, kde by sa to dalo využiť: smer na vyskúšanie, nie plán.'),
            frame: {
                steady: t('The places where a strength fits best are usually ordinary: a small exchange, a passing moment, rather than a grand gesture.', 'Miesta, kde silná stránka sedí najlepšie, bývajú obyčajné: malá výmena, prchavý okamih, nie veľké gesto.'),
                strained: t('Using a strength can be awkward or costly in this place, where the usual approach may not fit and some adjusting is part of the work.', 'Využiť tu silnú stránku môže byť nepohodlné alebo nákladné, lebo obvyklý prístup nemusí sedieť a prispôsobovanie patrí k práci.'),
            } },
    ],
    opening: t('This reading looks at what may help a relationship of yours. The first card is what you already bring to it, the second what lies within reach beyond that, and the third where those strengths could be put to use.', 'Toto čítanie sa pozerá na to, čo môže pomôcť jednému z tvojich vzťahov. Prvá karta je to, čo do neho už prinášaš, druhá to, čo je okrem toho na dosah, a tretia miesto, kde by sa tieto silné stránky dali využiť.'),
    takeaway: {
        act: t('What may help is putting one strength to work in an ordinary way, and noticing how the connection answers it.', 'Pomôcť môže použiť jednu silnú stránku obyčajným, každodenným spôsobom a všímať si, ako na ňu vzťah odpovie.'),
        ease: t('Support here looks more like softening than adding: a little more room for the connection, and letting what is already good be enough.', 'Opora tu vyzerá skôr ako zmiernenie než pridávanie: o niečo viac priestoru pre vzťah a dovoliť tomu, čo je už dobré, aby stačilo.'),
        face: t('This may be less about finding something new than about looking at the connection as it really is and starting from there.', 'Môže ísť menej o hľadanie niečoho nového a viac o pohľad na vzťah taký, aký naozaj je, a o začiatok od toho.'),
        weave: t('What may help is bringing different strengths into one gesture, so that care, honesty and action arrive together.', 'Pomôcť môže spojiť rôzne silné stránky do jedného gesta, aby starostlivosť, úprimnosť a konanie prišli spolu.'),
    },
    closings: {
        act: t('Where in this relationship could a strength you already have be offered in a plain, ordinary way?', 'Kde by sa vo vzťahu dala jednoducho a bez okolkov ponúknuť silná stránka, ktorú už máš?'),
        ease: t('What in this connection could you let be enough as it is?', 'Čo by mohlo vo vzťahu stačiť také, aké to už je?'),
        face: t('What do you see when you look at this connection as it really is, and what could you start from?', 'Čo vidíš, keď sa na tento vzťah pozrieš taký, aký naozaj je, a od čoho by sa dalo začať?'),
        weave: t('Which of your own strengths would you like this relationship to see more of, and which of them work well together?', 'Ktorú zo svojich silných stránok chceš dať vo vzťahu viac najavo a ktoré z nich spolu dobre fungujú?'),
    },
};
const attention = {
    id: 'relationships.attention',
    areaId: 'relationships',
    label: t('Understand what deserves my attention', 'Pochopiť, čomu sa oplatí venovať pozornosť'),
    focus: t('Hold in mind a relationship where you sense something is going unnoticed.', 'Maj na mysli vzťah, v ktorom tušíš, že niečo uniká pozornosti.'),
    semantics: {
        explores: t('what in a relationship is in view, what may be overlooked, and what attention would change', 'to, čo je vo vzťahu na očiach, čo môže unikať a čo by sa zmenilo, keby sa tomu venovala pozornosť'),
        reflection: 'notice',
        practical: 'observe',
        forbids: ['other-person-mind', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'blind-spot-view',
    category: 'relationship',
    guidance: 'blind-spot',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What is already in view', 'Čo je už na očiach'),
            ask: t('What you can already see about this connection, as plainly as it can be said.', 'Čo už o tomto vzťahu vidíš, tak jasne, ako sa to dá povedať.'),
            frame: {
                steady: t('Whatever is in plain view can be said without strain: the part of the relationship that can be described simply and without argument.', 'Čo je zjavné, dá sa povedať bez námahy: časť vzťahu, ktorú možno opísať jednoducho a bez sporu.'),
                strained: t('Some of what is in view is still uncomfortable to look at, so it stays in sight while the eyes keep sliding away.', 'Niečo z toho, čo je na očiach, je stále nepríjemné pozorovať, takže to ostáva v zornom poli, kým pohľad stále uhýba.'),
            } },
        { label: t('What may be going unnoticed', 'Čo môže unikať pozornosti'),
            ask: t('A possibility the cards raise about what is not yet in view. It is a question to hold, not a fact they establish.', 'Možnosť o tom, čo ešte nie je na očiach: otázka na zváženie, nie zistený fakt.'),
            frame: {
                steady: t('Quiet things get overlooked because they do not demand notice: a small pattern, a gap, a gesture that goes unmarked.', 'Tiché veci sa ľahko prehliadnu, lebo si nevyžadujú pozornosť: drobný vzorec, medzera, gesto, ktoré ostane bez povšimnutia.'),
                strained: t('Avoidance tends to live here, because noticing would be uncomfortable: a question circled, a feeling kept at the edge, a cost left unexamined.', 'Býva tu vyhýbanie, lebo všimnúť si by bolo nepríjemné: otázka, ktorá sa obchádza, cit držaný na okraji, cena, ktorá ostáva neskúmaná.'),
            } },
        { label: t('What attention would shift', 'Čo by pozornosť zmenila'),
            ask: t('What would change in how you take part in the relationship if the unnoticed part came into view.', 'Čo by sa zmenilo v tom, ako sa na vzťahu podieľaš, keby sa nepovšimnutá časť dostala do zorného poľa.'),
            frame: {
                steady: t('Noticing can bring change by itself: a way of taking part loosens, and a response becomes a little freer.', 'Všimnutie samo môže priniesť zmenu: spôsob účasti sa uvoľňuje a odpoveď sa stáva o niečo slobodnejšou.'),
                strained: t('Unease may come first here, because seeing clearly can unsettle how someone takes part before it clarifies anything.', 'Najprv môže prísť nepokoj, lebo jasné videnie dokáže rozkolísať, ako sa človek na vzťahu podieľa, skôr než čokoľvek objasní.'),
            } },
    ],
    opening: t('This reading looks at what deserves your attention in a relationship. The first card is what you can already see, the second what may be going unnoticed (a question to hold, not a finding), and the third what would shift if you gave it attention.', 'Toto čítanie sa pozerá na to, čomu sa vo vzťahu oplatí venovať pozornosť. Prvá karta je to, čo už vidíš, druhá to, čo môže unikať (otázka na zváženie, nie zistenie), a tretia to, čo by sa zmenilo, keby sa tomu venovala pozornosť.'),
    takeaway: {
        act: t('Attention can become one small action here: asking the question that keeps being circled, or noticing what happens just before the old pattern starts.', 'Pozornosť sa tu môže zmeniť na jeden malý krok: položiť otázku, ktorá sa stále obchádza, alebo si všimnúť, čo sa deje tesne predtým, než sa spustí starý vzorec.'),
        ease: t('Attention here need not mean effort; it can be as light as letting oneself notice, with nothing to do about it yet.', 'Pozornosť tu nemusí znamenať námahu; môže byť taká ľahká ako dovoliť si niečo všimnúť, bez toho, že by sa s tým hneď niečo robilo.'),
        face: t('What deserves attention may be uncomfortable to look at, and it may help to look gently anyway, letting it be as large or small as it is.', 'To, čomu sa oplatí venovať pozornosť, môže byť nepríjemné pozorovať, a pomôcť môže pozrieť sa na to nežne a nechať to také veľké či malé, aké to naozaj je.'),
        weave: t('Attention may be asked to hold two things at once, what you feel and what you see, rather than choosing between them.', 'Pozornosť možno treba udržať pri dvoch veciach naraz, pri tom, čo cítiš, a pri tom, čo vidíš, namiesto voľby medzi nimi.'),
    },
    closings: {
        act: t('How might your way of taking part change if the unnoticed part came into view?', 'Ako by sa mohol zmeniť tvoj podiel na vzťahu, keby sa to nepovšimnuté dostalo na svetlo?'),
        ease: t('What would you notice in this relationship if you looked at it as a curious stranger, with nothing to fix?', 'Čo je na tomto vzťahu vidieť očami zvedavého pozorovateľa, ktorý nemusí nič opravovať?'),
        face: t('What would it be like to look gently at the part of this relationship that is hardest to see?', 'Čo sa mení, keď sa na tú časť vzťahu, ktorú je najťažšie vidieť, pozrieš nežne?'),
        weave: t('Where do what you feel about this relationship and what you can see in it meet, and where do they differ?', 'Kde sa to, čo k tomuto vzťahu cítiš, stretáva s tým, čo v ňom vidíš, a kde sa to rozchádza?'),
    },
};
export const RELATIONSHIPS_AREA = {
    id: 'relationships',
    label: t('Relationships', 'Vzťahy'),
    blurb: t('Closeness, friction and the way you take part in it.', 'Blízkosť, trenie a tvoj podiel na nich.'),
    scope: t('what passes between people', 'to, čo prebieha medzi ľuďmi'),
    intentions: [current, tension, help, attention],
    lens,
};
