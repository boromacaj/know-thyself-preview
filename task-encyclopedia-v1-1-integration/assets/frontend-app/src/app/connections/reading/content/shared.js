/**
 * THE DOMAIN-NEUTRAL WORDS OF CONNECTIONS.
 *
 * Hedging clauses, time notes, the echo of the user's own observations, the pair-signature phrases of the four traditions, the vocabulary they are filled with, and the sentence
 * frames the composer places voices in. Every name is a nominative subject; Slovak placeholders for planets, aspects, phases, pillars, types and positions only ever stand in
 * the nominative (as a subject, a predicate noun, an apposition or in brackets), because none of them can be declined at render time.
 */
const CONTENT = {
    corroboration: {
        firm: [
            { en: 'Both the sky-based and the calendar-based traditions point this way.', sk: 'Tým istým smerom ukazujú tradície, ktoré čítajú oblohu, aj tie, ktoré čítajú kalendár.' },
            { en: 'Here the traditions that read the birth sky and those that read the birth date agree.', sk: 'Na tomto sa zhodujú výklady oblohy v čase narodenia aj výklady dátumu narodenia.' },
            { en: 'Two quite different ways of reading a birth, by the sky and by the calendar, land in the same place.', sk: 'Dva celkom odlišné spôsoby čítania narodenia, podľa oblohy a podľa kalendára, tu dochádzajú k tomu istému.' },
            { en: 'This is one of the places where the sky-based and calendar-based readings line up.', sk: 'Toto je jedno z miest, kde sa výklad oblohy a výklad kalendára stretávajú.' },
            { en: 'It shows up from both directions, in the reading of the sky and in the reading of the calendar.', sk: 'Ukazuje sa to z oboch strán, na oblohe v čase narodenia aj v kalendári.' },
        ],
        supported: [
            { en: 'More than one tradition points here, though they draw on closely related inputs.', sk: 'Ukazuje sem viac než jedna tradícia, hoci vychádzajú z veľmi príbuzných údajov.' },
            { en: 'It comes from more than one system, all reading much the same raw material, so it counts for a little more than a single voice.', sk: 'Hovorí to viac systémov, ktoré však čítajú takmer ten istý východiskový materiál, takže to má o niečo väčšiu váhu než jediný hlas.' },
            { en: 'Several traditions say it, but they share a starting point, so the agreement is worth taking modestly.', sk: 'Tvrdí to niekoľko tradícií, no majú spoločné východisko, preto treba ich zhodu brať striedmo.' },
            { en: 'The pattern recurs across more than one tradition, which steadies it without settling it.', sk: 'Vzorec sa opakuje vo viac než jednej tradícii, čo mu dodáva istotu, no nerozhoduje to.' },
            { en: 'More than one system notices this, though not from fully independent angles.', sk: 'Všíma si to viac systémov, hoci nie z celkom nezávislých uhlov.' },
        ],
        singleSource: [
            { en: 'Only one tradition leans this way, so hold it lightly.', sk: 'Týmto smerom sa prikláňa len jedna tradícia, preto to ber s rezervou.' },
            { en: 'This rests on a single tradition and is better taken as a question than an answer.', sk: 'Opiera sa to o jedinú tradíciu, takže je to skôr otázka než odpoveď.' },
            { en: 'One system alone says this: worth noticing, not worth building on.', sk: 'Hovorí to iba jeden systém: stojí to za povšimnutie, no stavať sa na tom nedá.' },
            { en: 'It comes from just one of the traditions, so let lived experience have the last word.', sk: 'Vychádza to len z jednej z tradícií, preto nech má posledné slovo vlastná skúsenosť.' },
            { en: 'Only a single source suggests it, which makes it a tentative note rather than a firm conclusion.', sk: 'Naznačuje to jediný zdroj, takže ide skôr o opatrný náznak než o pevný záver.' },
        ],
    },
    timeNotes: {
        approximate: {
            en: 'A birth time that is only approximate leaves some details uncertain. The ones that shift through the day, such as the Moon’s exact position, the rising sign and the houses, are treated as estimates, not fixed points.',
            sk: 'Ak je čas narodenia len približný, údaje, ktoré sa počas dňa rýchlo menia, ako presné postavenie Mesiaca, ascendent a domy, sa berú ako odhad, nie ako pevný bod.',
        },
        unknown: {
            en: '{name} has no known birth time, so for that chart the Moon, the rising sign and the other angles, the houses and the BaZi hour pillar are left out. The reading rests on what stays the same all day.',
            sk: 'Čas narodenia jednej z dvoch osôb nepoznáme, preto sa pri tejto mape vynechávajú Mesiac, ascendent a ostatné osi, domy aj hodinový pilier BaZi a čítanie stojí na tom, čo sa počas dňa nemení.',
        },
        unknownBoth: {
            en: 'Neither birth time is known. The Moon, the rising sign and the other angles, the houses and the BaZi hour pillar are left out of both charts. What remains is what holds at any hour of those two days.',
            sk: 'Ani jeden čas narodenia nie je známy, preto výklad v oboch mapách vynecháva Mesiac, ascendent a ostatné osi, domy aj hodinový pilier BaZi a stojí na tom, čo platí v ktorúkoľvek hodinu daného dňa.',
        },
    },
    observed: {
        'communication-struggles': {
            echo: { en: 'You said that talking things through is a struggle here.', sk: 'Uvádzaš, že rozhovory tu idú ťažko.' },
        },
        'frequent-conflict': {
            echo: { en: 'You mentioned that arguments come often.', sk: 'Spomínaš, že hádky prichádzajú často.' },
        },
        'conflict-goes-unrepaired': {
            echo: { en: 'By your account, disagreements tend to be left hanging rather than mended.', sk: 'Podľa tvojich slov sa nezhody skôr nechávajú tak, než urovnávajú.' },
        },
        'pace-differences': {
            echo: { en: 'You noticed that each moves at a different speed.', sk: 'Všímaš si, že každý z nich má iné tempo.' },
        },
        'different-working-styles': {
            echo: { en: 'In your words, each works in quite a different way.', sk: 'Ako píšeš, každý z nich pracuje celkom inak.' },
        },
        'unclear-roles': {
            echo: { en: 'You said it is not clear who is responsible for what.', sk: 'Hovoríš, že nie je jasné, kto má čo na starosti.' },
        },
        'decision-stalemates': {
            echo: { en: 'You described decisions that stall.', sk: 'Opisuješ rozhodnutia, ktoré uviaznu.' },
        },
        'feeling-unseen': {
            echo: { en: 'You said the sense of being truly seen is missing in this relationship.', sk: 'Píšeš, že v tomto vzťahu chýba pocit, že druhý človek naozaj vidí, čo sa vo vnútri deje.' },
        },
        'need-more-closeness': {
            echo: { en: 'There is, you said, a wish for more closeness here.', sk: 'Spomínaš túžbu po väčšej blízkosti.' },
        },
        'need-more-space': {
            echo: { en: 'You mentioned a need for more room.', sk: 'Hovoríš o potrebe väčšieho priestoru.' },
        },
        'strong-reactions-to-change': {
            echo: { en: 'Change, you noted, brings out strong reactions.', sk: 'Všímaš si, že zmeny vyvolávajú silné reakcie.' },
        },
        'resists-rules': {
            echo: { en: 'You described strong pushback against rules and limits.', sk: 'Opisuješ silný odpor voči pravidlám a hraniciam.' },
        },
        'withdraws-when-upset': {
            echo: { en: 'You describe someone going quiet or pulling away when upset.', sk: 'Opisuješ, že sa niekto pri rozrušení odmlčí alebo stiahne.' },
        },
        'sibling-friction': {
            echo: { en: 'You mentioned friction between siblings.', sk: 'Spomínaš trenice medzi súrodencami.' },
        },
        'unfair-comparison': {
            echo: { en: 'You noticed comparisons between them that feel unfair.', sk: 'Všímaš si porovnávanie medzi nimi, ktoré pôsobí nespravodlivo.' },
        },
        'parents-disagree-on-approach': {
            echo: { en: 'As you put it, the adults involved disagree on the approach.', sk: 'Ako uvádzaš, dospelí sa nezhodujú v tom, aký prístup zvoliť.' },
        },
        'wants-to-collaborate': {
            echo: { en: 'You said there is a real wish to work well together.', sk: 'Píšeš o skutočnej chuti dobre spolupracovať.' },
        },
        'old-roles-persist': {
            echo: { en: 'Old family roles, you said, keep coming back.', sk: 'Staré rodinné roly sa podľa tvojich slov stále vracajú.' },
        },
        'recurring-argument': {
            echo: { en: 'You described the same argument returning again and again.', sk: 'Opisuješ hádku, ktorá sa vracia stále v tej istej podobe.' },
        },
    },
    signatures: {
        /* ---------------------------------------------------------------- Western astrology: topic x flavour ---- */
        'astrology.inter-aspect.emotion.joining': {
            en: 'In Western astrology, one person’s {aBody} in {aspect} with the other’s {bBody} describes feelings that find each other easily, comfort offered in a form the other already understands. || Astrologers take a {aspect} between one person’s {aBody} and the other’s {bBody} as emotional ease: moods that settle into a shared rhythm without much explaining.',
            sk: 'Medzi mapami vzniká {aspect}, {aBody} v jednej a {bBody} v druhej, a západná astrológia v tom vidí city, ktoré sa ľahko nájdu, a útechu, ktorej druhá strana rozumie bez vysvetľovania. || {aBody} v jednej mape a {bBody} v druhej spolu podľa západnej astrológie ľahko ladia: nálady si nájdu spoločný rytmus aj bez veľkého vysvetľovania.',
        },
        'astrology.inter-aspect.emotion.friction': {
            en: 'Western astrology reads a {aspect} between one person’s {aBody} and the other’s {bBody} as moods on different clocks: what soothes one can unsettle the other, and the rub teaches each a good deal about feeling. || In the astrological tradition, this contact between one person’s {aBody} and the other’s {bBody} is emotional friction: sensitivities that catch on each other, and that rarely let a feeling go unnoticed.',
            sk: '{aBody} v jednej mape a {bBody} v druhej stoja podľa západnej astrológie v napätí: nálady majú rozdielny rytmus a čo jednu stranu upokojí, druhú môže rozladiť. || Je to {aspect}, {aBody} v jednej mape a {bBody} v druhej, a astrologická tradícia to číta ako citové trenie: citlivé miesta, ktoré sa o seba zachytávajú, no zároveň nedovolia, aby cit zostal nepovšimnutý.',
        },
        'astrology.inter-aspect.emotion.complementing': {
            en: 'Astrologers see the {aspect} of one person’s {aBody} and the other’s {bBody} as an emotional seesaw: each tends to feel what the other holds back, which can balance the two or pull them to opposite ends. || In Western astrology, one person’s {aBody} facing the other’s {bBody} across the zodiac reads as two emotional styles that mirror each other, each supplying the side the other lacks.',
            sk: 'Je to {aspect}: {aBody} v jednej mape a {bBody} v druhej stoja proti sebe a astrológovia v tom vidia citovú hojdačku, pri ktorej každá strana často cíti práve to, čo druhá zadržiava. || V západnej astrológii stoja {aBody} v jednej mape a {bBody} v druhej oproti sebe, čo sa číta ako dva citové štýly, ktoré sa zrkadlia a každý dodáva to, čo druhému chýba.',
        },
        'astrology.inter-aspect.communication.joining': {
            en: 'When one person’s {aBody} and the other’s {bBody} meet in {aspect}, astrology reads minds that catch each other’s meaning quickly, and conversation that runs on without effort. || Western astrology treats a {aspect} between one person’s {aBody} and the other’s {bBody} as easy exchange: ideas pass back and forth, and half a sentence is often enough.',
            sk: 'Keď sa {aBody} v jednej mape a {bBody} v druhej stretnú v aspekte ({aspect}), astrológia to číta ako mysle, ktoré si rýchlo rozumejú, a rozhovor, ktorý plynie bez námahy. || Západná astrológia vidí v takomto spojení – {aBody} v jednej mape, {bBody} v druhej – ľahkú výmenu: myšlienky prechádzajú tam a späť a často stačí pol vety.',
        },
        'astrology.inter-aspect.communication.friction': {
            en: 'A {aspect} between one person’s {aBody} and the other’s {bBody} is read in astrology as talk that sparks and snags: sharp exchanges, quick misunderstandings, and ideas tested hard. || Astrology sees this contact, one person’s {aBody} squaring the other’s {bBody}, as two ways of making sense that rub, so conversations run lively and easily cross wires.',
            sk: 'Je to {aspect}, {aBody} v jednej mape a {bBody} v druhej, a astrológia v tom vidí rozhovor, ktorý iskrí aj zadrháva: ostré výmeny, rýchle nedorozumenia a myšlienky podrobené tvrdej skúške. || {aBody} v jednej mape a {bBody} v druhej predstavujú podľa astrológie dva spôsoby uvažovania, ktoré sa o seba trú: rozhovory bývajú živé a ľahko pri nich dôjde k nedorozumeniu.',
        },
        'astrology.inter-aspect.communication.complementing': {
            en: 'In astrology, the {aspect} of one person’s {aBody} and the other’s {bBody} pairs two vantage points: each tends to ask the question the other forgets, which makes for good debate and the occasional deadlock. || Western astrology reads one person’s {aBody} opposite the other’s {bBody} as minds that start from opposite sides, useful for seeing a whole problem and prone to arguing it from both ends.',
            sk: 'V astrológii {aspect}, {aBody} v jednej mape a {bBody} v druhej, spája dva uhly pohľadu: každá strana sa často pýta na to, na čo druhá zabudne, čo prináša dobrú debatu a občas aj patovú situáciu. || {aBody} v jednej mape a {bBody} v druhej stoja podľa západnej astrológie oproti sebe: mysle začínajú z opačných strán, čo pomáha obsiahnuť celý problém, ale zvádza aj k nekonečnej debate.',
        },
        'astrology.inter-aspect.attraction.joining': {
            en: 'Astrology has long read a {aspect} between one person’s {aBody} and the other’s {bBody} as warmth and energy moving in the same direction: liking turns easily into wanting to do things together. || In Western astrology, one person’s {aBody} in {aspect} with the other’s {bBody} describes an easy pull, warmth on one side meeting drive on the other without much resistance.',
            sk: 'Medzi mapami je {aspect} – {aBody} v jednej, {bBody} v druhej – a astrológia to odpradávna číta ako vrúcnosť a energiu, ktoré idú rovnakým smerom: z náklonnosti ľahko vznikne chuť robiť veci spolu. || {aBody} v jednej mape a {bBody} v druhej vytvárajú podľa západnej astrológie ľahký ťah: vrúcnosť jednej strany sa bez väčšieho odporu stretáva s energiou druhej.',
        },
        'astrology.inter-aspect.attraction.friction': {
            en: 'In Western astrology, a {aspect} between one person’s {aBody} and the other’s {bBody} is a charged pull: the spark that comes with friction, and wanting that runs on different timing. || Astrologers call this kind of contact, one person’s {aBody} squared by the other’s {bBody}, magnetic and restless at once: plenty of energy, and some of it spent rubbing.',
            sk: 'V západnej astrológii tvoria {aBody} v jednej mape a {bBody} v druhej nabitý ťah: iskru, ktorá prichádza s trením, a chcenie, ktoré má na každej strane iné načasovanie. || Astrológovia označujú takýto kontakt – {aBody} v jednej mape, {bBody} v druhej, v napätom uhle – za magnetický a zároveň nepokojný: energie je veľa a časť sa minie na trenie.',
        },
        'astrology.inter-aspect.attraction.complementing': {
            en: 'Western astrology treats one person’s {aBody} opposite the other’s {bBody} as a pull between opposites: each has what the other reaches for, and the distance between the two is part of the draw. || In astrology, the {aspect} of one person’s {aBody} and the other’s {bBody} describes polarity, warmth and drive facing each other, alive with interest and sometimes with standoff.',
            sk: 'Podľa západnej astrológie stoja {aBody} v jednej mape a {bBody} v druhej oproti sebe ako protiklady: každá strana má to, po čom druhá siaha, a práve vzdialenosť je súčasťou príťažlivosti. || V astrológii {aspect}, {aBody} v jednej mape a {bBody} v druhej, opisuje polaritu, v ktorej stojí vrúcnosť tvárou v tvár energii: veľa záujmu a občas aj vzájomné zaťatie.',
        },
        'astrology.inter-aspect.drive.joining': {
            en: 'One person’s {aBody} in {aspect} with the other’s {bBody} is read in astrology as effort that pulls the same way: each tends to spur the other on, and plans gather momentum. || Western astrology sees a {aspect} between one person’s {aBody} and the other’s {bBody} as purpose and push in step, the kind of contact where getting started together comes easily.',
            sk: '{aBody} v jednej mape a {bBody} v druhej ťahajú podľa astrológie za jeden povraz: každá strana zvykne povzbudiť druhú a plány naberajú rýchlosť. || V západnej astrológii sa {aspect} medzi mapami, {aBody} v jednej a {bBody} v druhej, číta ako zladený zámer a rozbeh: spoločný začiatok ide ľahko.',
        },
        'astrology.inter-aspect.drive.friction': {
            en: 'Astrologers read a {aspect} between one person’s {aBody} and the other’s {bBody} as two wills that test each other: energising, competitive, and at times bruising. || In Western astrology this is a contest of drives, one person’s {aBody} squaring the other’s {bBody}, which tends to sharpen each side and to turn every shared plan into a negotiation.',
            sk: 'Pre astrológov stoja {aBody} v jednej mape a {bBody} v druhej v napätí dvoch vôlí, ktoré sa navzájom skúšajú: povzbudzuje to, vyvoláva súťaživosť a občas aj zabolí. || {aBody} v jednej mape a {bBody} v druhej sú v západnej astrológii súbojom ťahov: každú stranu to zbystrí a zo spoločného plánu ľahko urobí vyjednávanie.',
        },
        'astrology.inter-aspect.drive.complementing': {
            en: 'The {aspect} between one person’s {aBody} and the other’s {bBody} is read in astrology as purpose meeting push from across the way: each challenges the other to act, sometimes by pushing back. || Western astrology treats one person’s {aBody} opposite the other’s {bBody} as two kinds of drive facing each other, able to steady each other or to pull against each other.',
            sk: 'V astrológii stoja {aBody} v jednej mape a {bBody} v druhej oproti sebe, čo sa číta ako zámer, ktorý stretáva rozbeh z opačnej strany: každá strana vyzýva druhú konať, niekedy aj tým, že sa vzoprie. || Západná astrológia vidí v tejto opozícii – {aBody} v jednej mape, {bBody} v druhej – dva druhy ťahu tvárou v tvár, ktoré sa môžu navzájom vyvažovať alebo si odporovať.',
        },
        'astrology.inter-aspect.structure.joining': {
            en: 'Saturn is astrology’s planet of limits and commitment, so a {aspect} between one person’s {aBody} and the other’s {bBody} is read as steadiness: structure that feels reassuring rather than confining. || Western astrology reads an easy Saturn link, {aBody} with {bBody}, as reliability: who sets the limits matters less, because the limits tend to be welcome.',
            sk: 'Saturn je v astrológii planétou hraníc a záväzkov, preto sa tento kontakt, {aBody} v jednej mape a {bBody} v druhej, číta ako stálosť: poriadok, ktorý skôr upokojuje, než zväzuje. || Podľa západnej astrológie opisuje ľahký kontakt so Saturnom ({aBody} a {bBody}) spoľahlivosť: menej záleží na tom, kto hranice určuje, lebo hranice bývajú vítané.',
        },
        'astrology.inter-aspect.structure.friction': {
            en: 'In Western astrology, a {aspect} involving Saturn, here {aBody} against {bBody}, is read as limits that feel heavy before they feel useful: one side can seem like a brake, the other like a pressure. || Astrology reads this Saturn square, one person’s {aBody} to the other’s {bBody}, as a test of patience: criticism is easily heard where only caution was meant, and the structure it builds is hard-won.',
            sk: 'V západnej astrológii sa napätý aspekt so Saturnom ({aBody} a {bBody}) číta ako hranice, ktoré najprv ťažia a až potom pomáhajú: jedna strana môže pôsobiť ako brzda, druhá ako tlak. || Astrológia vidí v tejto kvadratúre – {aBody} v jednej mape, {bBody} v druhej – skúšku trpezlivosti: kde bola myslená len opatrnosť, ľahko zaznie kritika, a poriadok, ktorý vznikne, je vybojovaný.',
        },
        'astrology.inter-aspect.structure.complementing': {
            en: 'Astrology reads the {aspect} between one person’s {aBody} and the other’s {bBody} as structure meeting its counterweight: responsibility on one side, freedom on the other, and limits that have to be negotiated. || With Saturn opposite a personal planet, here {aBody} and {bBody}, Western astrology describes a balance of duty and impulse that each side helps the other find.',
            sk: 'Podľa astrológie sa tu poriadok stretáva so svojou protiváhou ({aBody} v jednej mape, {bBody} v druhej): na jednej strane zodpovednosť, na druhej sloboda a hranice, o ktorých treba vyjednávať. || Keď stojí Saturn oproti osobnej planéte, tu {aBody} a {bBody}, opisuje západná astrológia rovnováhu povinnosti a impulzu, ktorú si strany pomáhajú nájsť.',
        },
        'astrology.inter-aspect.values.joining': {
            en: 'Astrologers read a {aspect} between one person’s {aBody} and the other’s {bBody} as shared taste and priorities: a similar sense of what is worth time, money and care. || In Western astrology, one person’s {aBody} in {aspect} with the other’s {bBody} suggests values that sit comfortably side by side, so choosing together tends to be straightforward.',
            sk: '{aBody} v jednej mape a {bBody} v druhej sa podľa astrológov zhodujú vo vkuse a prioritách: podobne sa tu vníma, čo stojí za čas, peniaze a starostlivosť. || V západnej astrológii ukazujú {aBody} v jednej mape a {bBody} v druhej na hodnoty, ktoré vedľa seba pokojne obstoja, takže spoločné rozhodovanie zvyčajne ide hladko.',
        },
        'astrology.inter-aspect.values.friction': {
            en: 'Where one person’s {aBody} squares the other’s {bBody}, astrology reads different ideas of what matters: what one finds worth the effort, the other may find beside the point. || Western astrology reads a {aspect} between one person’s {aBody} and the other’s {bBody} as values that rub, taste and priorities that need explaining rather than assuming.',
            sk: 'Kde {aBody} v jednej mape a {bBody} v druhej stoja v napätí, číta astrológia rozdielne predstavy o tom, čo je dôležité: čo jedna strana považuje za hodné námahy, druhá môže pokladať za vedľajšie. || Západná astrológia vidí v tomto napätom aspekte ({aBody} a {bBody}) hodnoty, ktoré sa o seba trú: vkus a priority treba vysvetľovať, nie predpokladať.',
        },
        'astrology.inter-aspect.values.complementing': {
            en: 'Western astrology reads the {aspect} of one person’s {aBody} and the other’s {bBody} as values seen from opposite ends: each tends to show the other what has been underrated. || In astrology, one person’s {aBody} opposite the other’s {bBody} pairs two scales of worth, a source of mutual education and of the occasional tug-of-war over what comes first.',
            sk: 'Podľa západnej astrológie sa {aBody} v jednej mape a {bBody} v druhej pozerajú na hodnoty z opačných koncov: každá strana často ukáže druhej to, čo druhá podceňuje. || V astrológii stoja {aBody} v jednej mape a {bBody} v druhej oproti sebe ako dve stupnice hodnôt, čo sa číta ako vzájomné učenie aj občasné preťahovanie o to, čo má prednosť.',
        },
        'astrology.inter-aspect.growth.joining': {
            en: 'Jupiter is the planet of growth in astrology, and this contact, one person’s {aBody} with the other’s {bBody}, is read as encouragement: each tends to make the other’s plans feel larger and more possible. || Western astrology reads an easy Jupiter contact like this {aspect} as generosity that widens horizons, along with a shared taste for saying yes.',
            sk: 'Jupiter je v astrológii planétou rastu, preto sa tento kontakt, {aBody} v jednej mape a {bBody} v druhej, číta ako povzbudenie: plány jednej strany vedľa druhej rastú a zdajú sa dosiahnuteľnejšie. || Západná astrológia vidí v ľahkom kontakte s Jupiterom ({aBody} a {bBody}) veľkorysosť, ktorá rozširuje obzor, a spoločnú chuť povedať áno.',
        },
        'astrology.inter-aspect.growth.friction': {
            en: 'With Jupiter in a square, here between {aBody} and {bBody}, astrology warns of too much of a good thing: big promises, a shared appetite for more, and different ideas of how far to go. || Astrologers read this Jupiter tension, one person’s {aBody} against the other’s {bBody}, as enthusiasm that outruns the plan, generous in spirit and loose with limits.',
            sk: 'Keď je Jupiter v kvadratúre, tu {aBody} a {bBody}, astrológia upozorňuje na priveľa dobrého: veľké sľuby, spoločnú chuť na viac a rozdielne predstavy o tom, kam až zájsť. || Podľa astrológov je toto napätie s Jupiterom ({aBody} a {bBody}) nadšením, ktoré predbieha plán: veľkorysým v duchu, voľným v hraniciach.',
        },
        'astrology.inter-aspect.growth.complementing': {
            en: 'Astrology sees Jupiter opposite a personal planet, here {aBody} and {bBody}, as two views of what growth means: one side reaches wide, the other keeps things close to home, and each can stretch the other. || In Western astrology, the {aspect} of one person’s {aBody} and the other’s {bBody} describes a broadening from opposite sides, where encouragement sometimes arrives as a challenge.',
            sk: 'Astrológia vidí v Jupiteri oproti osobnej planéte, tu {aBody} a {bBody}, dva pohľady na to, čo znamená rast: jedna strana siaha do šírky, druhá drží veci bližšie domovu a každá môže tú druhú posunúť. || V západnej astrológii opisuje {aspect}, {aBody} v jednej mape a {bBody} v druhej, rozširovanie obzoru z opačných strán, pri ktorom povzbudenie niekedy prichádza ako výzva.',
        },
        'astrology.inter-aspect.conflict.joining': {
            en: 'Astrologers often say that a {aspect} between one person’s {aBody} and the other’s {bBody} lets anger move in step: disagreements flare and burn out quickly, and it is easy to end up on the same side. || In Western astrology, one person’s {aBody} in {aspect} with the other’s {bBody} reads as heat that runs the same way, so a quarrel tends to be direct, short and soon over.',
            sk: 'Astrológovia zvyknú hovoriť, že pri takomto aspekte ({aspect}: {aBody} v jednej mape, {bBody} v druhej) ide hnev rovnakým krokom: nezhody vzplanú a rýchlo vyhasnú a ľahko sa skončí na tej istej strane. || V západnej astrológii sa {aBody} v jednej mape a {bBody} v druhej v tomto aspekte čítajú ako oheň, ktorý horí rovnakým smerom: hádka býva priama, krátka a rýchlo sa skončí.',
        },
        'astrology.inter-aspect.conflict.friction': {
            en: 'In astrology, a {aspect} between one person’s {aBody} and the other’s {bBody} is the classic picture of tempers that strike each other: heat rises fast, and how disagreement is cooled matters more than how it began. || Western astrology reads this contact, one person’s {aBody} squaring the other’s {bBody}, as quick flashpoints, honest and energising, with a habit of escalating before anyone has paused.',
            sk: 'V astrológii sú {aBody} v jednej mape a {bBody} v druhej v napätom uhle klasickým obrazom temperamentov, ktoré do seba narážajú: horúčava stúpa rýchlo a dôležitejšie než to, ako sa hádka začne, je to, ako sa schladí. || Západná astrológia vidí v takomto kontakte ({aBody} a {bBody} v kvadratúre) rýchle vzplanutia, úprimné a povzbudzujúce, so sklonom stupňovať sa skôr, než sa niekto zastaví.',
        },
        'astrology.inter-aspect.conflict.complementing': {
            en: 'When one person’s {aBody} faces the other’s {bBody} across the zodiac, astrology reads two opposite ways of fighting: each tends to bring out the other’s fire, which can end in a standoff or in a fair balance of strength. || Western astrology treats the {aspect} of one person’s {aBody} and the other’s {bBody} as conflict seen from both ends, where one way of pushing meets its mirror image.',
            sk: 'Keď stoja {aBody} v jednej mape a {bBody} v druhej oproti sebe, astrológia v tom vidí dva opačné spôsoby boja: každá strana zvykne v druhej rozdúchať oheň, čo môže viesť k patu alebo k férovej rovnováhe síl. || Západná astrológia chápe túto opozíciu ({aBody} a {bBody}) ako konflikt videný z oboch koncov: spôsob, akým tlačí jedna strana, sa stretáva so svojím zrkadlovým obrazom.',
        },
        /* ---------------------------------------------------------------- Western astrology: generic by flavour ---- */
        'astrology.inter-aspect.joining': {
            en: 'Western astrology treats a {aspect} between one person’s {aBody} and the other’s {bBody} as an easy contact, where these two parts of the charts tend to cooperate rather than compete. || In astrology, one person’s {aBody} in {aspect} with the other’s {bBody} is a joining contact: what each planet stands for finds a ready partner in the other chart.',
            sk: '{aBody} v jednej mape a {bBody} v druhej tvoria podľa západnej astrológie ľahký kontakt: tieto časti máp skôr spolupracujú, než by si konkurovali. || V astrológii sa tento aspekt ({aspect}) chápe ako spájajúci: to, čo predstavuje {aBody} v jednej mape a {bBody} v druhej, sa ľahko stretne.',
        },
        'astrology.inter-aspect.friction': {
            en: 'Astrologers see a {aspect} between one person’s {aBody} and the other’s {bBody} as an activating tension: the two parts of the charts push on each other, which brings energy and asks for adjustment. || In Western astrology, one person’s {aBody} squaring the other’s {bBody} is a friction contact, uncomfortable at times and rarely dull, read as a spur to growth rather than a flaw.',
            sk: 'Astrológovia vidia v tejto kvadratúre – {aBody} v jednej mape, {bBody} v druhej – aktivizujúce napätie: tieto časti máp na seba tlačia, čo prináša energiu a žiada prispôsobenie. || {aBody} v jednej mape a {bBody} v druhej sú v západnej astrológii kontaktom trenia: niekedy nepohodlným, málokedy nudným, čítaným ako podnet na rast, nie ako chyba.',
        },
        'astrology.inter-aspect.complementing': {
            en: 'Astrology has a name for one person’s {aBody} opposite the other’s {bBody}: polarity, in which each side holds what the other lacks, two halves of one theme facing each other. || In Western astrology, the {aspect} of one person’s {aBody} and the other’s {bBody} is a complementary contact that tends to mirror: much of what each sees in the other is the missing half of a shared theme.',
            sk: 'V astrológii je {aspect}, {aBody} v jednej mape a {bBody} v druhej, polaritou: každá strana má to, čo druhej chýba, a dve polovice jednej témy stoja tvárou v tvár. || {aBody} v jednej mape a {bBody} v druhej stoja podľa západnej astrológie v zrkadliacom sa vzťahu: veľa z toho, čo každá strana vidí v druhej, je chýbajúca polovica spoločnej témy.',
        },
        /* ---------------------------------------------------------------- BaZi ---- */
        'bazi.day-master.mirroring': {
            en: 'In BaZi, both Day Masters belong to the same phase, {aElement}, which the tradition reads as two of a kind: quick recognition, and at times the rivalry of equals who want the same room. || BaZi sees two {aElement} Day Masters as mirrors in the five-phase cycle, at ease with each other’s nature and inclined to compete where they overlap.',
            sk: 'V BaZi je hlavný prvok dňa („Day Master“) v oboch mapách {aElement}, čo tradícia číta ako podobnosť: rýchle vzájomné spoznanie a občas aj súperenie dvoch rovnocenných strán o ten istý priestor. || Keď je hlavný prvok dňa („Day Master“) na oboch stranách {aElement}, BaZi v tom vidí zrkadlo v kruhu piatich fáz: ľahké porozumenie povahe druhej strany a sklon súperiť tam, kde sa prekrývajú.',
        },
        'bazi.day-master.nourishing': {
            en: 'In BaZi the two Day Masters, {aElement} and {bElement}, stand in the nourishing relation of the five phases: {giver} sits on the side that feeds, and {receiver} on the side that is fed. || The five-phase cycle sets {aElement} and {bElement} in a generating bond in which {giver} is the source of support; BaZi reads it as warmth that flows easily and does best when some of it flows back.',
            sk: 'V BaZi stoja denné kmene oboch máp, {aElement} a {bElement}, vo vzťahu, v ktorom jedna fáza živí druhú: {giver} je na strane, ktorá dáva, {receiver} na strane, ktorá prijíma. || V kruhu piatich fáz tvoria {aElement} a {bElement} pár, v ktorom je {giver} zdrojom opory; BaZi to číta ako vrúcnosť, ktorá tečie ľahko a ktorej prospieva, keď sa časť vracia späť.',
        },
        'bazi.day-master.steering': {
            en: 'In BaZi’s controlling cycle, {steerer} holds the phase that shapes and {steered} the phase that is shaped, a relation the tradition reads as structure and challenge, steadying when welcome and pressing when not. || BaZi sets {aElement} and {bElement} in the restraining relation of the five phases: in the tradition’s terms {steerer} gives direction, and {steered} meets it, by leaning on it or by pushing back.',
            sk: 'V kruhu, v ktorom jedna fáza krotí druhú, drží {steerer} fázu, ktorá formuje, a {steered} fázu, ktorá je formovaná; BaZi to číta ako poriadok a výzvu, ktoré upokojujú, keď sú vítané, a tlačia, keď nie sú. || V BaZi stoja {aElement} a {bElement} vo vzťahu usmerňovania: podľa tejto logiky {steerer} udáva smer a {steered} sa oň buď oprie, alebo sa vzoprie.',
        },
        'bazi.branch-harmony': {
            en: 'In BaZi, one person’s {aPillar} and the other’s {bPillar} form a Six Harmony, a pairing of earthly branches the tradition reads as quiet affinity: a bond that can hold without much effort. || The earthly branches of one person’s {aPillar} and the other’s {bPillar} combine in a Six Harmony, which BaZi takes as an easy fit, a sense of standing on the same side.',
            sk: 'V BaZi tvoria {aPillar} jednej mapy a {bPillar} druhej súzvuk vetiev („Six Harmony“), spojenie pozemských vetiev, ktoré tradícia číta ako tichú blízkosť: puto, ktoré drží bez veľkej námahy. || {aPillar} v jednej mape a {bPillar} v druhej spájajú svoje pozemské vetvy do súzvuku vetiev („Six Harmony“), čo BaZi chápe ako ľahké zladenie, pocit, že stoja na tej istej strane.',
        },
        'bazi.branch-clash': {
            en: 'BaZi calls the meeting of one person’s {aPillar} and the other’s {bPillar} a Six Clash, a classical term for movement and friction: things get shaken loose, plans are tested, and little stays still for long. || In the BaZi tradition, a Six Clash between one person’s {aPillar} and the other’s {bPillar} describes branches that push against each other, bringing change and liveliness rather than any fixed outcome.',
            sk: '{aPillar} jednej mapy a {bPillar} druhej tvoria v BaZi stret vetiev („Six Clash“), klasický pojem pre pohyb a trenie: veci sa uvoľnia, plány prejdú skúškou a máločo zostane dlho na mieste. || V tradícii BaZi opisuje stret vetiev („Six Clash“), ktoré sa o seba opierajú – {aPillar} v jednej mape, {bPillar} v druhej – a prinášajú zmenu a živosť, nie nejaký pevný výsledok.',
        },
        'bazi.branch-three-harmony-half': {
            en: 'In BaZi, one person’s {aPillar} and the other’s {bPillar} hold two of the three branches of a Three Harmony leaning toward {element}, a partial alliance the tradition reads as shared purpose not yet complete. || Two branches of a Three Harmony, one in each chart ({aPillar} and {bPillar}), point together toward {element}; BaZi reads it as cooperation that builds over time.',
            sk: 'V BaZi nesú {aPillar} jednej mapy a {bPillar} druhej dve z troch vetiev trojitého súzvuku („Three Harmony“), ktorého cieľovou fázou je {element}: čiastočné spojenectvo, ktoré tradícia číta ako spoločný zámer, ešte nie celkom úplný. || Dve vetvy trojitého súzvuku („Three Harmony“), každá v inej mape ({aPillar} a {bPillar}), spolu ukazujú na jednu fázu, a tou je {element}; BaZi to číta ako spoluprácu, ktorá rastie časom.',
        },
        'bazi.branch-same': {
            en: 'Both charts carry the same earthly branch in the {aPillar}, which BaZi reads as mirroring: a similar background rhythm, easy to recognise in each other and sometimes too familiar to question. || In BaZi, a shared branch in the {aPillar} of both charts is a mirror, bringing ease and, at times, the same blind spots.',
            sk: 'V oboch mapách má {aPillar} tú istú pozemskú vetvu, čo BaZi číta ako zrkadlenie: podobný rytmus v pozadí, ľahko rozpoznateľný na druhej strane a niekedy až príliš známy na to, aby sa spochybňoval. || V BaZi je rovnaká vetva, ktorú v oboch mapách nesie {aPillar}, zrkadlom: prináša ľahkosť a niekedy aj tie isté slepé miesta.',
        },
        'bazi.stem-combination': {
            en: 'BaZi counts the heavenly stems of one person’s {aPillar} and the other’s {bPillar} among the five classic combinations, binding toward {element}: a pull of mutual interest, and a tendency to draw each other in. || In BaZi, the stems of one person’s {aPillar} and the other’s {bPillar} combine in a pairing associated with {element}, which the tradition reads as attraction and cooperation, sometimes at the cost of each side’s own course.',
            sk: 'Nebeské kmene, ktoré nesú {aPillar} jednej mapy a {bPillar} druhej, patria v BaZi k piatim klasickým spojeniam a ich výsledná fáza je {element}: ťah vzájomného záujmu a sklon vťahovať sa navzájom. || {aPillar} v jednej mape a {bPillar} v druhej spájajú v BaZi svoje nebeské kmene do dvojice, ktorej fázou je {element}; tradícia to číta ako príťažlivosť a spoluprácu, niekedy na úkor vlastného smeru každej strany.',
        },
        'bazi.stem-clash': {
            en: 'In BaZi, the heavenly stems of one person’s {aPillar} and the other’s {bPillar} clash, which the tradition reads as directness and pressure: views meet head-on, and each side is pushed to hold or to give ground. || BaZi treats a stem clash between one person’s {aPillar} and the other’s {bPillar} as two impulses that meet head-on, energising and abrasive at once, with no outcome fixed in advance.',
            sk: 'V BaZi sa nebeské kmene, ktoré nesú {aPillar} jednej mapy a {bPillar} druhej, zrážajú, čo tradícia číta ako priamosť a tlak: názory na seba narážajú čelne a každá strana je nútená stáť pevne alebo ustúpiť. || {aPillar} jednej mapy a {bPillar} druhej majú v BaZi kmene v strete: dva impulzy idú proti sebe, povzbudzujú aj odierajú zároveň a výsledok nie je vopred daný.',
        },
        /* ---------------------------------------------------------------- Human Design ---- */
        'human-design.channel.companionship': {
            en: 'In Human Design, both charts carry the whole {channel} channel, a connection the tradition calls companionship: familiar ground, easy mirroring, and little that needs explaining about that energy. || Human Design reads a channel held in full on both sides, here the {channel} channel, as companionship: each recognises how the other runs that energy, though neither brings the other anything new in it.',
            sk: 'V Human Design je v oboch mapách celý kanál {channel}, spojenie, ktoré tradícia volá spoločenstvo („companionship“): známa pôda, ľahké zrkadlenie a málo toho, čo by bolo treba o tejto energii vysvetľovať. || Kanál {channel}, ktorý je celý v oboch mapách, číta Human Design ako spoločenstvo: každá strana pozná spôsob, akým druhá s touto energiou narába, no nič nové si v tom navzájom neprinesú.',
        },
        'human-design.channel.compromise': {
            en: 'In Human Design, {holder} carries the whole {channel} channel and {other} carries one of its gates, a connection called compromise: the half tends to bend to the whole, so one way of running that energy usually sets the tone. || Human Design calls it compromise when {holder} holds the {channel} channel in full and {other} holds only half: the tradition expects the half to adapt, which is easy to miss and worth noticing.',
            sk: 'V Human Design má {holder} celý kanál {channel} a {other} iba jednu bránu tohto kanála, čo sa nazýva kompromis: polovica sa zvyčajne prispôsobí celku, takže tón v tejto energii udáva jedna strana. || Human Design hovorí o kompromise, keď má {holder} kanál {channel} celý a {other} len polovicu: tradícia čaká, že sa strana s polovicou prispôsobí, čo sa ľahko prehliadne a stojí za povšimnutie.',
        },
        'human-design.channel.dominance': {
            en: 'In Human Design, {holder} has the whole {channel} channel and {other} has neither of its gates, a connection called dominance: not a matter of power, but of one side bringing an energy the other meets only through the relationship. || Human Design names it dominance when {holder} holds the {channel} channel and {other} holds none of it: the tradition reads one side setting the tone in that area while the other experiences it, often with curiosity.',
            sk: 'V Human Design má {holder} celý kanál {channel} a {other} z tohto kanála nemá nič, čo sa nazýva dominancia: nejde o moc, ale o to, že jedna strana prináša energiu, ktorú druhá spoznáva len cez tento vzťah. || O dominancii hovorí Human Design, keď má {holder} kanál {channel} celý a {other} nemá žiadnu z brán tohto kanála: tradícia to číta tak, že v tejto oblasti udáva tón jedna strana a druhá to zažíva, často so zvedavosťou.',
        },
        'human-design.channel.electromagnetic': {
            en: 'In Human Design, each chart holds one gate of the {channel} channel and together they complete it, a connection called electromagnetic: the spark of complementarity, where each supplies what the other is missing. || Human Design reads the {channel} channel, completed only when the two charts sit side by side, as an electromagnetic connection: a lively charge of interest and friction that comes from two halves fitting together.',
            sk: 'V Human Design má každá mapa jednu bránu kanála {channel} a spolu tvoria celý kanál, čo sa nazýva elektromagnetické spojenie: iskra vzájomného dopĺňania, pri ktorej každá strana prináša to, čo druhej chýba. || Kanál {channel}, ktorý sa dotvorí až vtedy, keď sa dve mapy položia vedľa seba, číta Human Design ako elektromagnetické spojenie: živý náboj záujmu aj trenia, ktorý vzniká z dvoch zapadajúcich polovíc.',
        },
        'human-design.type-pair.same': {
            en: 'Human Design gives both charts the same type, {typeA}, which the tradition reads as a shared way of engaging with life: each understands the other’s strategy from the inside, and the two can share a blind spot too. || In Human Design, two {typeA} charts move by the same rule, so the tradition expects easy recognition of how each decides and acts, and the same habits to watch for.',
            sk: 'Human Design priraďuje obom mapám ten istý typ, {typeA}, čo tradícia číta ako spoločný spôsob, akým sa človek zapája do života: každá strana chápe stratégiu druhej zvnútra a môžu mať aj to isté slepé miesto. || V Human Design sa v oboch mapách všetko riadi tým istým pravidlom typu {typeA}, preto tradícia čaká ľahké porozumenie tomu, ako každá strana rozhoduje a koná, a aj rovnaké zvyky, na ktoré si treba dávať pozor.',
        },
        'human-design.type-pair.different': {
            en: 'In Human Design, one chart is a {typeA} and the other a {typeB}, two types that move by different rules: the tradition suggests that much of the friction eases once each knows the other’s strategy. || Human Design sets a {typeA} beside a {typeB}, two different strategies for meeting life, which the tradition reads as complementary when understood and puzzling when not.',
            sk: 'V Human Design je jedna mapa {typeA} a druhá {typeB}, dva typy, ktoré sa riadia rôznymi pravidlami: tradícia naznačuje, že veľa trenia ustúpi, keď každá strana pozná stratégiu druhej. || Human Design kladie vedľa seba typ {typeA} a typ {typeB}, dve rozdielne stratégie, ako sa stretávať so životom, čo tradícia číta ako doplnenie, keď im človek rozumie, a ako záhadu, keď nie.',
        },
        /* ---------------------------------------------------------------- Numerology ---- */
        'numerology.life-path.same-number': {
            en: 'In numerology, the {position} number is {numA} in both profiles, which the tradition reads as a similar direction over a lifetime: long-range aims that are easy to recognise in each other, and shared blind spots. || Numerology gives both people the same {position} number, {numA}, a sign in that tradition of lives bending along similar lines, with the ease and the sameness that brings.',
            sk: 'V numerológii sa v oboch profiloch opakuje {position} {numA}, čo tradícia číta ako podobný smer v dlhom horizonte života: vzdialené ciele, ktoré každá strana ľahko spozná u druhej, aj spoločné slepé miesta. || Numerológia nachádza v oboch profiloch tú istú hodnotu, {position} {numA}; tradícia v tom vidí životy, ktoré idú podobným smerom, s ľahkosťou aj jednotvárnosťou, ktorú to prináša.',
        },
        'numerology.life-path.shared-root': {
            en: 'In numerology, the {position} numbers {numA} and {numB} share a root, a master number and the number it reduces to: the same theme over a lifetime, carried at two different intensities. || Numerology treats {numA} and {numB} as one {position} theme in two registers, the master number heightening what the root number lives more quietly.',
            sk: 'V numerológii je {position} v jednom profile {numA} a v druhom {numB}; majstrovské číslo a číslo, na ktoré sa redukuje, nesú tú istú tému celého života v dvoch rôznych intenzitách. || Numerológia chápe {numA} a {numB} ako jednu tému v dvoch polohách ({position}): majstrovské číslo zosilňuje to, čo koreňové číslo žije tichšie.',
        },
        'numerology.life-path.different-number': {
            en: 'Numerology reads the two {position} numbers, {numA} and {numB}, as two separate arcs over a lifetime, each on its own terms; the tradition does not rank one pairing above another. || In numerology, different {position} numbers, here {numA} and {numB}, describe two separate routes through life, neither better nor worse matched.',
            sk: 'Numerológia číta dve rozdielne čísla ({position} {numA} a {numB}) ako dva samostatné oblúky celého života, každý na vlastných podmienkach; nijakú dvojicu čísel tradícia nestavia nad inú. || V numerológii je {position} v jednom profile {numA} a v druhom {numB}: dva životy, ktoré mieria vlastným smerom, nie lepšie či horšie zladené, len dve rôzne cesty, pri ktorých sa oplatí porovnávať skúsenosti.',
        },
        'numerology.soul-urge.same-number': {
            en: 'In the numerological tradition, the {position} number is {numA} for both, read as a similar private motivation: what quietly satisfies each is alike, even when it does not show on the surface. || Numerology finds the same {position} number, {numA}, in both profiles, pointing to inner wants that resemble each other, easy to sense and easy to take for granted.',
            sk: 'V numerológii má {position} v oboch profiloch hodnotu {numA}, čo tradícia číta ako podobnú vnútornú motiváciu: to, čo každú stranu potichu napĺňa, je podobné, aj keď to navonok nevidno. || Numerológia nachádza v oboch profiloch rovnakú hodnotu, {position} {numA}, a číta to ako vnútorné túžby, ktoré sa na seba podobajú: ľahko sa vycítia a ľahko sa berú ako samozrejmosť.',
        },
        'numerology.soul-urge.shared-root': {
            en: 'Numerology reads the {position} numbers {numA} and {numB} as one root in two strengths: the same inner longing, felt more intensely on the side of the master number. || In numerology, a master number and its root, here {numA} and {numB}, sit in the {position} position, so the private motive is shared while its pitch differs.',
            sk: 'V jednom profile je {position} {numA}, v druhom {numB}; numerológia to číta ako jeden koreň v dvoch silách: rovnaká vnútorná túžba, silnejšie prežívaná tam, kde stojí majstrovské číslo. || Majstrovské číslo a číslo, z ktorého vyrastá, sa tu stretávajú ako {position} ({numA} a {numB}): súkromný motív je spoločný, líši sa len intenzita.',
        },
        'numerology.expression.same-number': {
            en: 'Numerology gives both profiles the same {position} number, {numA}, which the tradition reads as a kindred way of working: similar strengths, recognisable at a glance, and a tendency to reach for the same tools. || In numerology, a shared {position} number such as {numA} describes natural abilities that lean the same way, which helps each understand the other’s work and invites some overlap.',
            sk: 'Numerológia priraďuje obom profilom rovnakú hodnotu, {position} {numA}, čo tradícia číta ako príbuzný spôsob práce: podobné silné stránky, rozpoznateľné na prvý pohľad, a sklon siahať po rovnakých nástrojoch. || V numerológii opisuje {position} {numA} v oboch profiloch prirodzené schopnosti, ktoré sa prikláňajú rovnakým smerom: pomáha to rozumieť práci druhej strany, no ľahko dôjde k prekrývaniu.',
        },
        'numerology.expression.shared-root': {
            en: 'The {position} numbers {numA} and {numB} share a root in numerology, so the tradition sees the same native gift sounding at two different pitches, one of them carrying a master number’s extra charge. || Numerology reads {numA} and {numB} in the {position} position as related capabilities, the master number pushing harder at what the root number does steadily.',
            sk: 'Čísla {numA} a {numB}, ktoré tu nesie {position}, majú v numerológii spoločný koreň: tá istá vrodená schopnosť znie v dvoch výškach a jedna z nich nesie navyše náboj majstrovského čísla. || Numerológia číta {numA} a {numB} ako príbuzné schopnosti ({position}): majstrovské číslo tlačí silnejšie na to, čo koreňové číslo robí vytrvalo.',
        },
        'numerology.personality.same-number': {
            en: 'The {position} number is {numA} in both profiles, which numerology reads as a similar first impression: the two tend to strike others, and each other, in much the same way at first meeting. || In numerology, a shared {position} number of {numA} is read as a similar outward manner, quickly familiar on both sides and sometimes mistaken for a deeper sameness.',
            sk: 'V oboch profiloch je {position} {numA}, čo numerológia číta ako podobný prvý dojem: na okolie aj na seba navzájom pôsobia pri prvom stretnutí veľmi podobne. || Numerológia vidí v zhodnom čísle ({position} {numA}) podobný vonkajší prejav, ktorý je rýchlo známy na oboch stranách a niekedy sa zamieňa s hlbšou podobnosťou.',
        },
        'numerology.personality.shared-root': {
            en: 'Numerology links the {position} numbers {numA} and {numB} through a shared root: a similar first impression, with the master number lending it a stronger, more noticeable edge. || In numerology, {numA} and {numB} as {position} numbers are one outward style at two volumes, alike in kind and different in how strongly they register.',
            sk: 'Numerológia spája čísla {numA} a {numB}, ktoré tu nesie {position}, spoločným koreňom: podobný prvý dojem, ktorému majstrovské číslo dodáva výraznejšiu hranu. || V numerológii sú {numA} a {numB} ({position}) jeden vonkajší štýl v dvoch hlasitostiach: rovnaký druh, iná sila pôsobenia.',
        },
        'numerology.birthday.same-number': {
            en: 'Numerology finds the same {position} number, {numA}, in both profiles, a small shared talent in that tradition’s terms: a particular knack that is easy to recognise in each other. || In numerology the {position} number is the day’s own gift, and here it is {numA} on both sides: a similar knack that tends to make small shared tasks go smoothly.',
            sk: 'Deň narodenia má v oboch profiloch hodnotu {numA}, čo numerológia číta ako malý spoločný talent: zvláštnu zručnosť, ktorú každá strana ľahko spozná u druhej. || V numerológii je číslo dňa narodenia darom samotného dňa a tu je v oboch profiloch {numA}: podobná zručnosť, ktorá uľahčuje drobné spoločné úlohy.',
        },
        'numerology.birthday.shared-root': {
            en: 'Numerology reads {numA} and {numB} as {position} numbers sharing a root: the same small talent of the day, sharpened on the side of the master number. || In numerology, a {position} number of {numA} and one of {numB} come from the same root, a shared knack that one side holds in a more intense form.',
            sk: 'Pre numerológiu majú čísla dňa narodenia {numA} a {numB} spoločný koreň: ten istý drobný talent dňa, zaostrený na strane majstrovského čísla. || V numerológii pochádzajú {numA} a {numB} ako čísla dňa narodenia z jedného koreňa: spoločná zručnosť, ktorú jedna strana nesie v intenzívnejšej podobe.',
        },
    },
    vocabulary: {
        'body.Sun': { en: 'Sun', sk: 'Slnko' },
        'body.Moon': { en: 'Moon', sk: 'Mesiac' },
        'body.Mercury': { en: 'Mercury', sk: 'Merkúr' },
        'body.Venus': { en: 'Venus', sk: 'Venuša' },
        'body.Mars': { en: 'Mars', sk: 'Mars' },
        'body.Jupiter': { en: 'Jupiter', sk: 'Jupiter' },
        'body.Saturn': { en: 'Saturn', sk: 'Saturn' },
        'aspect.conjunction': { en: 'conjunction', sk: 'konjunkcia' },
        'aspect.sextile': { en: 'sextile', sk: 'sextil' },
        'aspect.square': { en: 'square', sk: 'kvadratúra' },
        'aspect.trine': { en: 'trine', sk: 'trigón' },
        'aspect.opposition': { en: 'opposition', sk: 'opozícia' },
        'element.wood': { en: 'wood', sk: 'drevo' },
        'element.fire': { en: 'fire', sk: 'oheň' },
        'element.earth': { en: 'earth', sk: 'zem' },
        'element.metal': { en: 'metal', sk: 'kov' },
        'element.water': { en: 'water', sk: 'voda' },
        'pillar.year': { en: 'year pillar', sk: 'ročný pilier' },
        'pillar.month': { en: 'month pillar', sk: 'mesačný pilier' },
        'pillar.day': { en: 'day pillar', sk: 'denný pilier' },
        'pillar.hour': { en: 'hour pillar', sk: 'hodinový pilier' },
        'hdtype.generator': { en: 'Generator', sk: 'Generator' },
        'hdtype.manifesting-generator': { en: 'Manifesting Generator', sk: 'Manifesting Generator' },
        'hdtype.projector': { en: 'Projector', sk: 'Projector' },
        'hdtype.manifestor': { en: 'Manifestor', sk: 'Manifestor' },
        'hdtype.reflector': { en: 'Reflector', sk: 'Reflector' },
        'position.life-path': { en: 'life path', sk: 'životná cesta' },
        'position.soul-urge': { en: 'soul urge', sk: 'túžba duše' },
        'position.expression': { en: 'expression', sk: 'vyjadrenie' },
        'position.personality': { en: 'personality', sk: 'osobnosť' },
        'position.birthday': { en: 'birthday', sk: 'deň narodenia' },
    },
    roleCheck: {
        en: 'The roles are read as you chose them. These two birth dates make that an unusual order, so it is worth checking that the roles are the right way round.',
        sk: 'Roly sa čítajú tak, ako boli zvolené. Podľa týchto dátumov narodenia je to nezvyčajné usporiadanie, preto sa oplatí overiť, či roly nie sú opačne.',
    },
    tooYoung: {
        en: 'A child this young is not read for a style. Temperament in the first years is still forming and changes quickly. A birth date has nothing to add to what the age itself already says. What follows is the age guide: what is typical now, and what helps.',
        sk: 'Také malé dieťa sa nečíta podľa štýlu. Temperament sa v prvých rokoch ešte formuje a rýchlo mení a dátum narodenia k tomu nepovie nič, čo by nevyplývalo už zo samotného veku. Nižšie je sprievodca vekom: čo je v tomto veku bežné a čo pomáha.',
    },
    quiet: {
        headline: { en: 'Nothing here pulls hard either way', sk: 'Nič tu výrazne neťahá ani jedným smerom' },
        lede: {
            en: '{both} sit close to the middle on nearly everything this comparison reads. No clear pattern rises out of it: neither a shared lean nor a sharp difference.',
            sk: '{both} stoja takmer vo všetkom, čo toto porovnanie sleduje, blízko stredu, a tak sa neukazuje jasný vzorec: ani spoločný sklon, ani ostrý rozdiel.',
        },
        body: {
            en: 'That is a result in its own right, not a gap to be filled. The symbols have little to add about this relationship. What happens in it is shaped more by circumstance, habit and choice than by anything a chart shows. The most useful material is what you notice yourself: when things come easily, where they snag, and what each person asks for.',
            sk: 'Aj to je výsledok, nie medzera, ktorú treba zaplniť. Symboly k tomuto vzťahu nemajú veľa čo dodať a to, čo sa medzi dvoma ľuďmi deje, viac formujú okolnosti, zvyky a rozhodnutia než čokoľvek, čo ukáže mapa. Najužitočnejšie je to, čo vidíš na vlastné oči: kedy veci idú ľahko, kde sa zadrhávajú a o čo každý z nich žiada.',
        },
    },
    roleLabels: {
        resonance: { en: 'Shared ground', sk: 'Spoločná pôda' },
        complement: { en: 'Complementary', sk: 'Dopĺňajú sa' },
        friction: { en: 'Where it can rub', sk: 'Kde to môže drhnúť' },
        asymmetry: { en: 'One flexes', sk: 'Jedna strana sa prispôsobí' },
        open: { en: 'Depends on the approach', sk: 'Záleží na prístupe' },
    },
    drives: {
        label: { en: 'What each is drawn to', sk: 'Čo každého priťahuje' },
        title: {
            shared: { en: 'Drawn to the same thing', sk: 'Ťahá ich to isté' },
            pullsApart: { en: 'Two pulls that tug apart', sk: 'Dva ťahy, ktoré sa rozchádzajú' },
            different: { en: 'Drawn to different things', sk: 'Každého ťahá niečo iné' },
        },
    },
    signaturesTitle: { en: 'Where the traditions meet', sk: 'Kde sa tradície stretávajú' },
    signaturesLede: {
        en: 'Laid side by side, the two charts also draw a few remarks from the traditions themselves. These describe what each system holds about such pairings, not anything measured in the two people.',
        sk: 'Keď sa dve mapy položia vedľa seba, ozvú sa aj samotné tradície; nasledujúce vety hovoria o tom, ako každý systém takéto spojenia vykladá, nie o ničom, čo by sa dalo na týchto dvoch ľuďoch zmerať.',
    },
    forNameLabel: { en: '{name}:', sk: '{name}:' },
    forBothLabel: { en: 'Both:', sk: 'Spolu:' },
    forAdultLabel: { en: 'For the adult:', sk: 'Pre dospelého človeka:' },
    /* ------------------------------------------------------------------------------------------------------ how the reading is told -- */
    narrative: {
        /* THE LEAN NOTE (V3): one plain sentence that closes the central passage when the evidence behind it is only a lean (a slight stance, a single tradition). The passages themselves never speak of evidence. */
        lean: [
            { en: 'Part of this rests on a slight lean, so hold it loosely.', sk: 'Tento obraz stojí sčasti len na slabom sklone, takže je to skôr smer než zistenie.' },
            { en: 'One side of this is a faint signal: more a direction than a finding.', sk: 'Časť tohto obrazu stojí na slabom náznaku: skôr smer než zistenie.' },
            { en: 'Read this as a lean: part of the basis is thin.', sk: 'Ide o sklon: časť opory je tenká.' },
        ],
        /* THE HEDGED NOTE (V3.2): where one of the two is pulled both ways on this dimension, the central passage says so once, right after the sentence that makes the claim. The name is the
           nominative subject of the clause in every variant (never after a preposition), and `one` / `many` carry the verb for one name or two. */
        hedged: {
            one: [
                { en: '{name} leans this way only mildly, so read this as a tendency, not a rule.', sk: '{name} tu nesmeruje jednoznačne jedným smerom, takže ide skôr o sklon než o pravidlo.' },
                { en: '{name} follows this only in part, so it is a possibility, not a fact.', sk: '{name} sa tým riadi len sčasti, takže ide skôr o možnosť než o fakt.' },
                { en: '{name} shows mixed signs here, so read this as a hint.', sk: '{name} do toho zapadne len niekedy, takže ide o náznak, nie o zistenie.' },
            ],
            many: [
                { en: '{name} lean this way only mildly, so read this as a tendency, not a rule.', sk: '{name} tu nesmerujú jednoznačne jedným smerom, takže ide skôr o sklon než o pravidlo.' },
                { en: '{name} follow this only in part, so it is a possibility, not a fact.', sk: '{name} sa tým riadia len sčasti, takže ide skôr o možnosť než o fakt.' },
                { en: '{name} show mixed signs here, so read this as a hint.', sk: '{name} do toho zapadnú len niekedy, takže ide o náznak, nie o zistenie.' },
            ],
        },
        /* WHO IS LIKE WHAT, worded for how firmly the evidence stands. `firm`: a reading (strong, corroborated, one consistent lean). `soft`: a lean (thin, single-source, or the person is pulled both ways).
           The voices that fill {voice} are verb phrases after a singular subject ("checks what could go wrong"), so each lead reads "someone who {voice}". */
        leads: {
            opposed: {
                firm: [
                    { en: '{p0} reads as someone who {voice0}, and {p1} as someone who {voice1}.', sk: '{p0} sa v týchto profiloch javí ako človek, ktorý {voice0}, a {p1} ako človek, ktorý {voice1}.' },
                    { en: 'In these profiles {p0} is the one who {voice0}, while {p1} is the one who {voice1}.', sk: 'V týchto profiloch {p0} {voice0}, kým {p1} {voice1}.' },
                    { en: '{p0} comes across as someone who {voice0}; {p1}, as someone who {voice1}.', sk: '{p0} pôsobí ako človek, ktorý {voice0}; {p1} ako človek, ktorý {voice1}.' },
                    { en: 'On one side stands {p0}, who {voice0}; on the other, {p1}, who {voice1}.', sk: '{p0} {voice0}. {p1} naopak {voice1}.' },
                    { en: 'The two come at this differently: {p0} {voice0}, and {p1} {voice1}.', sk: 'Pristupujú k tomu rozdielne: {p0} {voice0}, a {p1} {voice1}.' },
                    { en: 'Here the profiles part ways: {p0} {voice0}, while {p1} {voice1}.', sk: 'Tu sa profily rozchádzajú: {p0} {voice0}, kým {p1} {voice1}.' },
                ],
                soft: [
                    { en: 'The profile leans toward {p0} being someone who {voice0} and {p1} someone who {voice1}; these are leanings, not certainties.', sk: 'Profil naznačuje, že {p0} {voice0}, kým {p1} {voice1}; ide o sklony, nie o istoty.' },
                    { en: '{p0} may be someone who {voice0}, and {p1} someone who {voice1}; the profiles point that way without insisting on it.', sk: 'Je možné, že {p0} {voice0}, kým {p1} {voice1}; profily tým smerom ukazujú, no nenástojia.' },
                    { en: 'The profiles hint that {p0} {voice0} while {p1} {voice1}.', sk: 'Profily naznačujú, že {p0} {voice0}, zatiaľ čo {p1} {voice1}.' },
                    { en: 'If the profiles are a fair guide, {p0} {voice0}, and {p1} {voice1}.', sk: 'Ak sú profily dobrým vodidlom, {p0} {voice0}, a {p1} {voice1}.' },
                    { en: 'The profiles suggest a difference: {p0} {voice0}, and {p1} {voice1}.', sk: 'Profily naznačujú rozdiel: {p0} {voice0}, a {p1} {voice1}.' },
                ],
            },
            shared: {
                firm: [
                    { en: '{both} read as people who {voice}.', sk: '{both} sa tu javia ako ľudia, ktorí {voice}.' },
                    { en: 'Here {both} are alike: both {voice}.', sk: 'V oboch profiloch je sklon rovnaký – {both} {voice}.' },
                    { en: 'In both profiles the lean is the same: {both} {voice}.', sk: '{both} {voice}, v oboch profiloch rovnako.' },
                    { en: 'On this, {both} look alike: both {voice}.', sk: 'V tomto sa podobajú – {both} {voice}.' },
                    { en: 'The profiles tell the same story about {both} here: both {voice}.', sk: 'Profily tu rozprávajú ten istý príbeh – {both} {voice}.' },
                ],
                soft: [
                    { en: 'The profiles lean the same way for {both}, toward people who {voice}.', sk: '{both} sa podľa profilov nakláňajú rovnakým smerom – k ľuďom, ktorí {voice}.' },
                    { en: '{both} may share a lean here, toward people who {voice}.', sk: '{both} možno zdieľajú rovnaký sklon – sú to ľudia, ktorí {voice}.' },
                    { en: 'To the extent the profiles can say, {both} {voice}.', sk: 'Pokiaľ to profily vedia povedať, {both} {voice}.' },
                    { en: '{both} seem to share a lean here, toward people who {voice}.', sk: 'Profily akoby ukazovali spoločný sklon – {both} {voice}.' },
                ],
            },
            oneSided: {
                firm: [
                    { en: '{lean} reads as someone who {voice}, while {mid} sits nearer the middle.', sk: '{lean} sa javí ako človek, ktorý {voice}, kým {mid} stojí bližšie k stredu.' },
                    { en: 'Only one side leans clearly: {lean} is someone who {voice}, and {mid} meets it from the middle.', sk: 'Jasný sklon má len jedna strana – {lean} {voice}, a {mid} stojí v strede.' },
                    { en: '{lean} leans toward someone who {voice}; {mid} does not lean either way.', sk: 'Sklon má {lean} – je to človek, ktorý {voice}; {mid} sa nenakláňa ani jedným smerom.' },
                    { en: 'Here {lean} leans clearly, as someone who {voice}; {mid} does not.', sk: 'Jasný sklon tu má {lean}, človek, ktorý {voice}; {mid} nie.' },
                    { en: 'The pull on this runs one way: {lean} reads as someone who {voice}, with {mid} nearer the middle.', sk: 'Sklon tu ide jedným smerom: {lean} sa javí ako človek, ktorý {voice}, a {mid} je bližšie k stredu.' },
                ],
                soft: [
                    { en: 'The profile leans toward {lean} being someone who {voice}, with {mid} nearer the middle.', sk: 'Profil naznačuje, že {lean} {voice}, kým {mid} stojí bližšie k stredu.' },
                    { en: '{lean} may be the one who {voice}, with {mid} closer to the middle.', sk: 'Je možné, že {lean} {voice}, kým {mid} je bližšie k stredu.' },
                    { en: 'The profiles lean on one side only: {lean} may be someone who {voice}, and {mid} not especially either way.', sk: 'Profily sa nakláňajú len na jednu stranu – je možné, že {lean} {voice}, a {mid} sa nenakláňa nijako zvlášť.' },
                    { en: 'If the profiles are right, {lean} {voice}, while {mid} sits nearer the middle.', sk: 'Ak profily platia, {lean} {voice}, kým {mid} stojí bližšie k stredu.' },
                ],
            },
            leanOnly: {
                firm: [
                    { en: '{lean} reads as someone who {voice}.', sk: '{lean} sa javí ako človek, ktorý {voice}.' },
                    { en: 'Here {lean} leans clearly, as someone who {voice}.', sk: 'Jasný sklon tu má {lean}, človek, ktorý {voice}.' },
                    { en: 'This is where {lean} stands out: someone who {voice}.', sk: 'Tu {lean} vyniká: človek, ktorý {voice}.' },
                ],
                soft: [
                    { en: '{lean} may be someone who {voice}.', sk: '{lean} možno {voice}.' },
                    { en: 'The profiles hint that {lean} {voice}.', sk: 'Profily naznačujú, že {lean} {voice}.' },
                    { en: 'If the profiles are right, {lean} {voice}.', sk: 'Ak profily platia, {lean} {voice}.' },
                ],
            },
        },
        /* THE SECOND AND THIRD THING said of a child open with a connective, so the portrait reads as one story. */
        childAlso: [
            { en: 'Alongside that,', sk: 'Popri tom' },
            { en: 'Beyond that,', sk: 'Okrem toho' },
            { en: 'In another part of everyday life,', sk: 'V inej časti každodenného života' },
        ],
        /* A PERSON PULLED BOTH WAYS on a dimension: what follows is a way it could look, never a report of how it is. */
        pulled: [
            { en: '{who} is pulled two ways here.', sk: '{who} má v tejto oblasti dva ťahy naraz.' },
            { en: 'For {who} the profile points both ways at once.', sk: '{who} má v profile dva smery zároveň.' },
            { en: 'On this dimension {who} does not lean clearly either way.', sk: '{who} tu nemá jednoznačný sklon.' },
        ],
        /* A SCENE IS MARKED as an illustration of how a dynamic can go. It is never told as something that happened to these two people. */
        scene: [
            { en: 'Here is one familiar way this can go.', sk: 'Takto to môže vyzerať v bežnom živote.' },
            { en: 'In ordinary life it can look like this.', sk: 'Takto sa to môže prejaviť v obyčajný deň.' },
            { en: 'One possible version of the situation looks like this.', sk: 'Jeden z možných priebehov situácie vyzerá takto.' },
            { en: 'To see how this can show up, picture an ordinary week.', sk: 'Predstav si obyčajný týždeň, v ktorom sa to môže ukázať.' },
            { en: 'Imagine one way this may unfold.', sk: 'Predstav si jeden možný priebeh.' },
            { en: 'Take a busy week as an example.', sk: 'Vezmi si za príklad rušný týždeň.' },
            { en: 'Consider an everyday example.', sk: 'Skús si predstaviť bežný príklad.' },
            { en: 'Another way this may appear in practice.', sk: 'Iný spôsob, ako sa to môže prejaviť v praxi.' },
        ],
        /* WHAT KIND OF THREAD a supporting thread is: one to keep an eye on, one that carries the pair, or one that simply sits beside the central theme. */
        support: {
            watch: [
                { en: 'One thread is worth keeping an eye on.', sk: 'Jedno vlákno stojí za pozornosť.' },
                { en: 'There is also a place to watch.', sk: 'Je tu aj miesto, ktoré treba sledovať.' },
                { en: 'Another place asks for some care.', sk: 'Ďalšie miesto si žiada trochu opatrnosti.' },
                { en: 'Here is a place that needs some attention.', sk: 'Zaslúži si pozornosť ešte jedno miesto.' },
                { en: 'One more point is worth watching.', sk: 'Jeden ďalší bod stojí za sledovanie.' },
            ],
            carry: [
                { en: 'Something in the profiles helps hold the pair steady.', sk: 'Niečo v profiloch pomáha udržať dvojicu v rovnováhe.' },
                { en: 'Something else in the profiles works in the pair’s favour.', sk: 'Niečo iné v profiloch hrá v prospech dvojice.' },
                { en: 'Beside the friction, there is something to stand on.', sk: 'Popri treniu je tu aj niečo, o čo sa možno oprieť.' },
                { en: 'There is something to lean on as well.', sk: 'Je tu aj niečo, o čo sa dá oprieť.' },
                { en: 'Part of the picture is steadier.', sk: 'Časť obrazu je pevnejšia.' },
            ],
            other: [
                { en: 'A further thread runs through this.', sk: 'Prechádza tým aj ďalšie vlákno.' },
                { en: 'Beside that, another thread matters.', sk: 'Popri tom záleží aj na ďalšom vlákne.' },
                { en: 'There is another thread worth knowing.', sk: 'Stojí za to poznať ešte jedno vlákno.' },
                { en: 'One more strand is worth knowing.', sk: 'Stojí za to poznať ešte jednu stránku.' },
                { en: 'And there is this.', sk: 'A je tu aj toto.' },
                { en: 'A different strand adds to the picture.', sk: 'Iná stránka dopĺňa obraz.' },
            ],
        },
        /* TWO THINGS SAID OF ONE PERSON that can seem to pull apart (narrative/consistency.ts). The bridge says how they coexist; it explains, it does not rescue. {name} is the person. */
        tensions: {
            'withdraw-and-express': {
                en: '{name} can be open about feeling and still need quiet to work it out; the two take turns rather than cancel each other.',
                sk: '{name} vie city prejaviť otvorene a popri tom potrebuje ticho na ich spracovanie; striedajú sa a navzájom sa nepopierajú.',
            },
            'withdraw-and-social': {
                en: '{name} can be good company and still need to withdraw to recharge; being sociable and needing time alone are not opposites.',
                sk: '{name} vie byť dobrou spoločnosťou a popri tom potrebuje čas osamote na načerpanie síl; spoločenskosť a potreba samoty nie sú protiklady.',
            },
            'engaged-and-contained': {
                en: '{name} can be easy to engage with and slow to say what is felt: an easy contact on the surface, reserve underneath.',
                sk: '{name} sa dá ľahko osloviť a o tom, čo sa deje vnútri, hovorí pomaly: ľahký kontakt navonok, zdržanlivosť vo vnútri.',
            },
            'private-and-express': {
                en: '{name} can be open about feeling with the few who are close and private with everyone else.',
                sk: '{name} vie city prejaviť otvorene niekoľkým blízkym ľuďom a pred ostatnými si zachováva súkromie.',
            },
            'plan-and-novelty': {
                en: '{name} can like a plan and still crave the new; the structure tends to serve the novelty, as a framework to try things in.',
                sk: '{name} oceňuje plán a popri tom túži po novom; štruktúra zvyčajne novotu podporuje, je rámcom, v ktorom sa dá skúšať.',
            },
            'assertive-and-cautious': {
                en: '{name} can be quick to take the lead and careful about risk: decisive about direction, watchful about the downside.',
                sk: '{name} vie rýchlo prevziať vedenie a popri tom dbá na to, čo by sa mohlo pokaziť: rozhodnosť v smere, opatrnosť pri riziku.',
            },
            'steady-and-risk': {
                en: '{name} can want steadiness in daily life and still be willing to take a risk; a steady base is often what makes a bold move feel possible.',
                sk: '{name} chce v každodennom živote stabilitu a popri tom sa riziku nevyhýba; pevný základ často robí odvážny krok možným.',
            },
            'flexible-and-steady': {
                en: '{name} can be flexible from day to day and still want the larger picture to stay steady.',
                sk: '{name} sa v bežných dňoch vie prispôsobiť a popri tom chce, aby veľké veci zostali stabilné.',
            },
            'plan-and-risk': {
                en: '{name} can like a plan and still move before the picture is complete; the plan is often what makes the first move possible.',
                sk: '{name} oceňuje plán a popri tom sa vie pustiť do veci, kým obraz nie je úplný; plán často prvý krok umožní.',
            },
            'careful-and-curious': {
                en: '{name} can be careful about risk and still curious about the new; checking first is often how the new gets tried.',
                sk: '{name} dbá na riziko a popri tom sa zaujíma o nové; overenie vopred býva práve cestou, ako sa nové vyskúša.',
            },
            'solo-and-social': {
                en: '{name} can like working alone and still enjoy company; the two are different moods, not a contradiction.',
                sk: '{name} vie pracovať osamote a popri tom si užíva spoločnosť; sú to rôzne nálady, nie rozpor.',
            },
            'together-and-quiet': {
                en: '{name} can like working with others and still need quiet to think.',
                sk: '{name} si váži prácu s inými a popri tom potrebuje ticho na premýšľanie.',
            },
            'social-and-contained': {
                en: '{name} can be at home in company and still keep feelings close.',
                sk: '{name} sa v spoločnosti cíti dobre a popri tom si city necháva v sebe.',
            },
            'collaborate-and-private': {
                en: '{name} can like working alongside others and still keep what is personal close.',
                sk: '{name} si váži prácu popri iných a popri tom si osobné veci necháva pre seba.',
            },
        },
        /* THE USER'S OWN OBSERVATION is received as theirs. The profiles may touch what the user sees; they neither confirm it nor overrule it. */
        observed: {
            /* The reading tells a thread that touches what the user described: said plainly, with the user's own judgement left as theirs. {phrase} follows "in" (English) or a colon (Slovak). */
            speaks: [
                { en: 'What you describe sits close to the pattern above, which is about {phrase}.', sk: 'S tým súvisí aj to, čo je opísané vyššie.' },
                { en: 'What you describe may connect to the pattern above. Only you know the daily detail.', sk: 'To, čo opisuješ, sa môže viazať na vyššie opísané. Každodenné podrobnosti poznáš len ty.' },
                { en: 'The pattern above, about {phrase}, may be part of what you are seeing.', sk: 'Vyššie opísané sa toho dotýka.' },
            ],
            /* The profiles do say something about it, but it is faint or left aside: said as exactly that. */
            elsewhere: [
                { en: 'The profiles say little about this, so the reading follows what they show more clearly.', sk: 'Profily sa toho dotýkajú len okrajovo, preto sa vyššie opísané opiera o výraznejšie črty.' },
                { en: 'The profiles touch this too, but more faintly than the pattern above. You know better than any reading which of the two weighs more day to day.', sk: 'Aj tu sa črtá slabší náznak; vyššie opísané sa opiera o výraznejší a ty najlepšie vieš, ktorý z nich má v bežnom dni väčšiu váhu.' },
            ],
            /* Nothing in the profiles speaks to it: one short sentence, with no talk of the machinery. */
            silent: [
                { en: 'The reading above does not speak to this directly, and it deserves to be taken seriously all the same.', sk: 'Čítanie vyššie sa k tomu priamo nevyjadruje, a predsa si to zaslúži, aby sa to bralo vážne.' },
                { en: 'It may come from circumstances, history or stress rather than from how these people are put together.', sk: 'Môže to pramenieť z okolností, minulosti alebo stresu, a nie z povahy týchto ľudí.' },
                { en: 'What you see every day counts for more than any reading here.', sk: 'To, čo vidíš zo dňa na deň, má väčšiu váhu než akékoľvek čítanie.' },
            ],
            /* A wish: it needs no chart to be fair. */
            wish: [
                { en: 'That is a wish, and a wish needs no chart to be fair. It is reason enough to bring it up.', sk: 'Je to oprávnené prianie aj bez opory v mape a stojí za to, aby zaznelo.' },
                { en: 'Wanting this is reason enough to say so. How it is received is not something a reading can promise.', sk: 'Už samotné prianie stojí za to povedať nahlas. Ako to druhá strana prijme, žiadne čítanie nesľúbi.' },
            ],
            /* A wish, where the reading above shows how the two may differ in it. */
            wishTold: [
                { en: 'That is a wish, and it needs no chart to be fair. The reading above shows where the two of you may differ in it. That is worth knowing before it is asked for.', sk: 'Je to oprávnené prianie aj bez opory v mape. Čítanie vyššie ukazuje, v čom sa môžete líšiť, a oplatí sa to vedieť, kým sa o to požiada.' },
                { en: 'Wanting this is reason enough to say so. Where the two of you may differ in it is what the reading above describes.', sk: 'Už to, že to chceš, je dôvod to povedať. V čom sa môžete líšiť, opisuje čítanie vyššie.' },
            ],
        },
    },
};
export default CONTENT;
