import { activeLocale } from '../i18n/locale.js';
const v = (en, sk) => ({ en, sk });
export const say = (voice) => {
    if (!voice)
        return '';
    return activeLocale() === 'sk' ? voice.sk : voice.en;
};
/* ------------------------------------------------------- operating styles */
/*
 * ENGLISH ONLY, BY THE PORTRAIT'S CENTRAL WANT.
 *
 * Two or three charts can share a family of central want (freedom, making) and
 * so every sentence that is coloured by the family. The central want itself -
 * the theme that opens the portrait - is different in each of them, so a
 * sentence that would otherwise be word for word the same in two readings is
 * said here in the terms of that want. The key is `slot|theme|central`; only the
 * English is touched, the Slovak keeps its single sentence per slot, and an
 * entry is always ONE sentence or phrase where the default is one.
 */
const CENTRAL_EN = {
    /* habits */
    'act|emotional-permeability|independent-direction': 'read the mood of a room quickly, even when you are focused on what you are doing',
    'act|emotional-permeability|room-to-move': 'sense the atmosphere around you quickly, even when you are busy adjusting things',
    'act|careful-consolidation|independent-direction': 'keep hold of what already works before you add anything new',
    'act|careful-consolidation|looking-after': 'look after what already works before you add anything new',
    'act|conceptual-abstraction|independent-direction': 'read a single case as an example of something wider, and form your own view of it',
    'act|conceptual-abstraction|flexible-improvisation': 'take whatever case comes up as an example of something wider',
    /* wants */
    'need|meaning-and-purpose|room-to-move': 'a purpose that makes the effort worthwhile',
    'need|meaning-and-purpose|looking-after': 'a purpose behind the effort',
    /* what a pattern costs */
    'cost|emotional-permeability|independent-direction': "Other people's moods can blur into your own, even when you are sure of your direction.",
    'cost|emotional-permeability|room-to-move': 'With so much changing around you, it can be hard to say which mood is yours and which belongs to the room.',
    'cost|room-to-move|flexible-improvisation': 'A rule you did not choose is likely to stand out to you sooner than the room around it.',
    /* what a pattern is not */
    'gloss|closeness-and-belonging|independent-direction': 'Wanting a few close people is a different thing from wanting company; it can sit beside going your own way.',
    'gloss|closeness-and-belonging|room-to-move': 'Needing a few close people does not mean needing company; the two can pull different ways.',
    'gloss|creative-generation|flexible-improvisation': 'Making need not mean art here; it can be how you reshape, arrange or write things as you go.',
    /* splits */
    'tension|change.bothA|room-to-move': 'You want what you have built to last, yet you are just as drawn to the next thing; room to change matters to you.',
    'tension|change.bothA|looking-after': 'You want what you have taken care of to last, and you are pulled just as strongly toward whatever comes next.',
    'tension|autonomy.bothB|independent-direction': 'Exchange with other people sharpens your thinking, and you still need the decision to be your own; neither need gives way.',
    'tension|autonomy.bothB|looking-after': 'You think best when you can talk things through with other people, yet you need room to reach your own decisions; neither gives way.',
    /* a part of a life */
    'area|work-career.independent-direction|flexible-improvisation': 'do things your own way',
    'area|work-career.steady-endurance|room-to-move': 'keep going on one thing at your own pace',
    'area|work-career.steady-endurance|creative-generation': 'finish one piece of work',
};
const centralEn = (slot, key, centralId) => {
    if (!centralId || activeLocale() === 'sk')
        return '';
    return CENTRAL_EN[`${slot}|${key}|${centralId}`] ?? '';
};
const THEME_VOICE = {
    'deep-internal-processing': {
        tag: v('working things out inwardly', 'spracúvanie vecí vo vnútri'),
        lead: v('You work things out inwardly, and usually well before you say anything about them.', 'Veci si spracúvaš vo vnútri, a zvyčajne dávno predtým, než o nich niečo povieš.'),
        turn: v('The risk is that you finish the thinking and never get round to letting anyone else hear it.', 'Riziko je, že premýšľanie dokončíš a k tej časti, kde sa to niekto iný dozvie, sa už nedostaneš.'),
    },
    'independent-direction': {
        tag: v('deciding for yourself', 'rozhodovanie sa za seba'),
        lead: v('You would rather decide for yourself than wait for a decision to be made around you.', 'Radšej sa rozhodneš za seba, než aby sa rozhodlo okolo teba.'),
        turn: v('Deciding for yourself can tip into deciding alone when asking would have been quicker, or into carrying more than the situation needed.', 'Vie sa to preklopiť do rozhodovania osamote v situáciách, keď by bolo rýchlejšie sa opýtať – a do brania si na seba viac, než bolo treba.'),
    },
    'relational-orientation': {
        tag: v('reading the other person first', 'čítanie druhého človeka ako prvé'),
        lead: v('You read the other person before you read the situation, and what they bring genuinely changes your position.', 'Najprv čítaš človeka a až potom situáciu, a to, s čím príde, ti naozaj mení stanovisko.'),
        turn: v('Your own preference can go unspoken for so long that you lose track of it yourself.', 'Cena je, že vlastný názor zostane nevyslovený tak dlho, až ho napokon prestaneš vnímať aj ty.'),
    },
    'structured-method': {
        tag: v('wanting to know how it works', 'chuť vedieť, ako to funguje'),
        lead: v('You want to know how something is put together, and you are rarely satisfied with the first version of it.', 'Chceš vedieť, ako je vec poskladaná, a s prvou verziou sa málokedy uspokojíš.'),
        turn: v('Refining has no natural stopping point, so knowing when something is finished can be harder for you than getting it right.', 'Doťahovanie nemá prirodzený koniec, takže vedieť, kedy je vec hotová, môže byť pre teba ťažšie než urobiť ju dobre.'),
    },
    'flexible-improvisation': {
        tag: v('changing the plan as you go', 'menenie plánu za pochodu'),
        lead: v('You work with what is actually in front of you and change the plan without much ceremony.', 'Pracuješ s tým, čo máš reálne pred sebou, a plán meníš bez veľkých okolkov.'),
        turn: v('Keeping things open can leave a plan looser than the people relying on it expect.', 'Vopred urobené plány zvyknú potichu vyjsť navnivoč – čo funguje dovtedy, kým sa na niektorý nespoliehal niekto iný.'),
    },
    'emotional-permeability': {
        tag: v('picking up the mood around you', 'zachytávanie nálady okolo teba'),
        lead: v('You pick up the mood of a room quickly, and it affects you more than it may show.', 'Náladu v miestnosti zachytíš rýchlo a zasiahne ťa viac, než možno vidieť.'),
        turn: v('Telling your own mood apart from the one around you can be harder than it sounds.', 'Odlíšiť vlastnú náladu od tej okolo seba môže byť ťažšie, než to znie.'),
    },
    'emotional-containment': {
        tag: v('keeping your reactions to yourself', 'držanie reakcií pre seba'),
        lead: v('You keep your reactions to yourself, and what shows on the outside is a fraction of what is happening.', 'Reakcie si necháš pre seba a navonok je vidieť zlomok toho, čo sa naozaj deje.'),
        turn: v('People close to you may be working from much less information than they think they have.', 'Ľudia blízko teba možno pracujú s oveľa menej informáciami, než si myslia.'),
    },
    'outward-expression': {
        tag: v('thinking out loud', 'premýšľanie nahlas'),
        lead: v('Saying a thing out loud is part of how you decide what you think about it.', 'Vysloviť vec nahlas je súčasť toho, ako si o nej urobíš názor.'),
        turn: v('A thought you were still forming can land as a conclusion, and the people who heard it may treat it as one.', 'Myšlienky, ktoré sa ešte len rodili, môžu dopadnúť ako závery – a tak ich vezme každý, kto ich počul.'),
    },
    'risk-appetite': {
        tag: v('moving before it is safe', 'pohyb skôr, než je to bezpečné'),
        lead: v('You will commit to something before it is fully safe to, and you would rather move than wait for certainty.', 'Do veci sa pustíš skôr, než je úplne bezpečná – radšej pohyb než čakanie na istotu.'),
        turn: v('Being ready to commit early can make it hard to tell a calculated risk from plain impatience while you are in it.', 'Tá istá pohotovosť môže sťažiť rozlíšiť vypočítané riziko od obyčajnej netrpezlivosti, kým si práve v ňom.'),
    },
    'careful-consolidation': {
        tag: v('protecting what already works', 'ochrana toho, čo už funguje'),
        lead: v('You build things to last, and you protect what already works rather than trading it for something newer.', 'Staviaš veci nadlho a to, čo už funguje, radšej chrániš, než aby sa to menilo za novšie.'),
        turn: v('Something that has stopped working can keep its place for a long time on the strength of having worked once.', 'Vec, ktorá už prestala fungovať, si vie dlho udržať miesto len na základe toho, že kedysi fungovala.'),
    },
    'conceptual-abstraction': {
        tag: v('reaching for the principle', 'siahanie po princípe'),
        lead: v('You reach for the principle behind a situation rather than staying with the situation itself.', 'Siahaš po princípe za situáciou, nie po situácii samotnej.'),
        turn: v('The concrete version of a problem can start to feel like a distraction from the interesting version of it.', 'Konkrétna podoba problému sa ti môže začať javiť ako vyrušovanie od tej zaujímavej.'),
    },
    'steady-endurance': {
        tag: v('staying with one thing', 'vydržanie pri jednej veci'),
        lead: v('You can stay with one thing for a long time, well after the first interest has worn off.', 'Pri jednej veci vieš vydržať dlho, aj keď prvý záujem dávno opadol.'),
        turn: v('Staying with something says nothing about whether it was worth staying with, and from inside that is hard to judge.', 'Výdrž nehovorí nič o tom, či to za to stálo, a zvnútra sa to dvoje rozlišuje ťažko.'),
    },
    'social-visibility': {
        tag: v('being comfortable in view', 'pohoda v tom byť na očiach'),
        lead: v('You are comfortable being visible, and you do not particularly mind being looked at while you work.', 'Byť na očiach ti nerobí problém a nijak zvlášť ti neprekáža, keď sa niekto pozerá, ako pracuješ.'),
        turn: v('Attention is easy to mistake for agreement, and the two arrive together less often than it feels.', 'Pozornosť sa ľahko zamení so súhlasom, a tie dve veci neprichádzajú spolu tak často, ako to pôsobí.'),
    },
    /* ------------------------------------------------------------- drives */
    'creative-generation': {
        tag: v('making something your own', 'robenie niečoho po svojom'),
        lead: v('There is a real need to make something and put your own form on it.', 'Je v tebe skutočná potreba niečo vyrobiť a dať tomu vlastný tvar.'),
        turn: v('Making does not have to mean art; it can be how you build, arrange, write or fix things.', 'Nemusí to znamenať umenie; rovnako dobre sa to môže ukázať v tom, ako staviaš, usporadúvaš, píšeš alebo opravuješ veci.'),
    },
    'mastery-and-depth': {
        tag: v('doing it properly', 'urobiť to poriadne'),
        lead: v('Doing something adequately does not feel to you like having done it.', 'Urobiť niečo dostatočne sa v tebe neprežíva ako urobiť to.'),
        turn: v('The messy early stage of anything seems hard for you to tolerate, and it can be a reason not to start.', 'Neohrabaný začiatok ti zrejme padne mimoriadne ťažko a vie sa stať dôvodom vôbec nezačať.'),
    },
    'results-and-ambition': {
        tag: v('having something to show for it', 'mať na konci čo ukázať'),
        lead: v('You measure by what actually got built, earned or finished, not by how the effort felt.', 'Meriaš podľa toho, čo naozaj vzniklo, zarobilo sa alebo sa dokončilo, nie podľa toho, aká bola tá námaha.'),
        turn: v('Work with nothing to show at the end of it tends to drain you faster than work that is simply hard.', 'Práca, po ktorej na konci nič nezostane, ťa zvykne vyčerpať rýchlejšie než práca, ktorá je len ťažká.'),
    },
    'being-recognised': {
        tag: v('being seen for what you did', 'to, aby si prácu niekto všimol'),
        lead: v('You need what you contribute to actually register with somebody.', 'Potrebuješ, aby si to, čím prispeješ, naozaj niekto všimol.'),
        turn: v('Wanting it noticed is not vanity: unnoticed work goes flat on you, and a little acknowledgement goes a long way.', 'Nie je to ješitnosť: nepovšimnutá práca v tebe splasne a trocha uznania zájde ďaleko.'),
    },
    'meaning-and-purpose': {
        tag: v('knowing what it is for', 'vedieť, načo to je'),
        lead: v('You need to know what something is ultimately for, and competence alone will not hold you for long.', 'Potrebuješ vedieť, načo vec v konečnom dôsledku je, a samotná schopnosť ťa dlho neudrží.'),
        turn: v('The question of what it is all for tends to go unasked while things are working, and then arrives all at once.', 'Tá otázka sa zvykne nepýtať, kým usporiadanie funguje, a potom príde celá naraz.'),
    },
    'closeness-and-belonging': {
        tag: v('belonging somewhere specific', 'patriť niekam konkrétne'),
        lead: v('You want to belong somewhere specific, with particular people rather than in general.', 'Chceš niekam patriť konkrétne – ku konkrétnym ľuďom, nie všeobecne.'),
        turn: v('Belonging is not the same as sociability: you can want a few close people without wanting much company.', 'Nie je to to isté ako spoločenskosť a tieto dve veci môžu ťahať rôznymi smermi.'),
    },
    'room-to-move': {
        tag: v('keeping room to move', 'držanie si priestoru na pohyb'),
        lead: v('You need to be able to change an arrangement from the inside without asking permission.', 'Potrebuješ vedieť zmeniť usporiadanie zvnútra bez toho, aby na to bolo treba niečie dovolenie.'),
        turn: v('You are likely to notice a constraint long before you notice the freedom around it.', 'Obmedzenie si pravdepodobne všimneš oveľa skôr než slobodu okolo neho.'),
    },
    'looking-after': {
        tag: v('picking up what nobody is holding', 'zdvíhanie toho, čo nikto nedrží'),
        lead: v('You notice what nobody is holding and pick it up, often before deciding whether you wanted to.', 'Všimneš si, čo nikto nedrží, a zdvihneš to – často skôr, než stihneš zvážiť, či chceš.'),
        turn: v('Care offered without being asked can be taken for granted, because nobody has to turn it down.', 'Druhí to môžu začať brať ako samozrejmosť a najčastejšie sa to pokazí, keď o to nikto nepožiada a nikto to neodmietne.'),
    },
    'wanting-to-understand': {
        tag: v('needing to know why', 'potreba vedieť prečo'),
        lead: v('Knowing why matters to you for its own sake, not only when the answer turns out to be useful.', 'Vedieť prečo je pre teba hodnota sama osebe, nielen vtedy, keď sa odpoveď na niečo hodí.'),
        turn: v('A satisfying explanation of something unimportant can hold you longer than a rough one of something urgent.', 'Uspokojivé vysvetlenie niečoho nedôležitého ťa udrží dlhšie než hrubé vysvetlenie niečoho súrneho.'),
    },
    'form-and-craft': {
        tag: v('caring how a thing is made', 'záležanie na tom, ako je vec urobená'),
        lead: v('How something is made matters to you, and things that work but are badly made are genuinely irritating.', 'Záleží ti na tom, ako je vec urobená, a veci, ktoré fungujú, ale sú odfláknuté, ťa naozaj dráždia.'),
        turn: v('Other people may read your eye for craftsmanship as fussiness, and from outside the two are hard to tell apart.', 'Druhí to môžu čítať ako puntičkárstvo a zvonku sa to dvoje ťažko rozlišuje.'),
    },
};
export const themeVoice = (themeId) => THEME_VOICE[themeId];
/** Theme ids with no voice yet, for the test that will not let that pass. */
export const VOICED_THEME_IDS = Object.keys(THEME_VOICE);
/* ---------------------------------------------------------------- poles -- */
/*
 * ONE SIDE OF A SPLIT, AS A PREDICATE.
 *
 * Completes `One part of you ...`, so each entry is a bare verb phrase and
 * never a sentence. Both halves of every axis are here: a tension names both,
 * and a reading that could only phrase the pole it preferred would be choosing
 * a winner in the grammar.
 */
const POLE_VOICE = {
    introspective: v('works things out privately, on its own time', 'si veci preberá v súkromí a vo vlastnom čase'),
    'outwardly-engaged': v('wants to be out in the middle of things', 'chce byť vonku, priamo uprostred diania'),
    analytical: v('wants to reason it through and see the working', 'si to chce premyslieť a vidieť ten postup'),
    intuitive: v('knows the answer before there is anything to show for it', 'vie odpoveď skôr, než sa dá čímkoľvek podložiť'),
    independent: v('wants room to decide and move on its own', 'chce priestor rozhodnúť sa a pohnúť sa po svojom'),
    collaborative: v('works better when there is some exchange first', 'funguje lepšie, keď si to najprv s niekým vymení'),
    structured: v('wants a method it can rely on', 'chce postup, na ktorý sa dá spoľahnúť'),
    adaptable: v('would rather deal with what is actually happening', 'sa radšej zaoberá tým, čo sa naozaj deje'),
    cautious: v('checks the downside before committing', 'si pred zaviazaním overí, čo sa môže pokaziť'),
    'risk-oriented': v('would rather move and find out', 'sa radšej pohne a zistí to za pochodu'),
    'emotionally-expressive': v('shows what it is feeling as it happens', 'dá najavo, čo cíti, v tej chvíli'),
    'emotionally-contained': v('keeps that to itself and processes it later', 'si to necháva pre seba a spracuje to neskôr'),
    private: v('needs a good deal of time nobody else is in', 'potrebuje dosť času, v ktorom nie je nikto iný'),
    social: v('is comfortable being seen and among people', 'je v pohode medzi ľuďmi a keď je vidieť'),
    'stability-seeking': v('wants what is built to stay built', 'chce, aby to, čo je postavené, zostalo stáť'),
    'novelty-seeking': v('is already interested in the next thing', 'sa už zaujíma o tú ďalšiu vec'),
    assertive: v('moves first and takes the consequences', 'sa pohne prvá a nesie za to následky'),
    receptive: v('waits to see what the situation asks for', 'počká, čo si situácia vypýta'),
    practical: v('trusts what can be demonstrated', 'verí tomu, čo sa dá ukázať'),
    conceptual: v('trusts the principle behind the case', 'verí princípu za konkrétnym prípadom'),
};
export const poleVoice = (dimension) => say(POLE_VOICE[dimension]);
/** Dimensions with no pole voice, for the coverage test. */
export const VOICED_POLES = Object.keys(POLE_VOICE);
const PARTS = {
    /* ------------------------------------------------------------- styles */
    'deep-internal-processing': {
        need: v('time to work things out on your own before anyone asks', 'čas premyslieť si veci v tichosti skôr, než sa ťa niekto opýta'),
        act: v('work things out privately before you say anything', 'premyslieť si veci v tichosti, dávno predtým, než o nich niečo povieš'),
        prefers: 'act', family: 'depth', turnKind: 'cost',
    },
    'independent-direction': {
        need: v('your own direction', 'vlastný smer'),
        act: v('make up your own mind rather than wait for a decision to form around you', 'urobiť si vlastný názor namiesto čakania, kým sa rozhodnutie vytvorí okolo teba'),
        prefers: 'need', family: 'freedom', turnKind: 'cost',
    },
    'relational-orientation': {
        need: v('real exchange with the people around you', 'skutočnú výmenu s ľuďmi okolo seba'),
        act: v('read the other person before you read the situation', 'čítať najprv človeka a až potom situáciu'),
        prefers: 'act', family: 'people', turnKind: 'cost',
    },
    'structured-method': {
        need: v('a method you can rely on', 'postup, na ktorý sa dá spoľahnúť'),
        act: v('take something apart to see how it works', 'rozobrať vec, kým nevieš, ako je poskladaná'),
        prefers: 'act', family: 'method', turnKind: 'cost',
    },
    'flexible-improvisation': {
        need: v('freedom from fixed rules', 'dosť voľnosti, aby ťa nesvieral pevný systém'),
        act: v('change the plan as soon as it stops fitting', 'zmeniť plán, len čo prestane sedieť'),
        prefers: 'need', family: 'freedom', turnKind: 'cost',
    },
    'emotional-permeability': {
        need: v('some say over the atmosphere you spend your days in', 'aspoň trochu vplyvu na atmosféru, v ktorej trávíš dni'),
        act: v('pick up the mood around you quickly', 'rýchlo zachytiť náladu okolo seba'),
        prefers: 'act', family: 'people', turnKind: 'cost',
    },
    'emotional-containment': {
        need: v('privacy around what you feel', 'súkromie pre to, čo cítiš'),
        act: v('keep your reactions to yourself until you have sorted them out', 'nechať si reakcie pre seba, kým si ich neutriedíš'),
        prefers: 'act', family: 'people', turnKind: 'cost',
    },
    'outward-expression': {
        need: v('someone to think out loud with', 'niekoho, s kým môžeš premýšľať nahlas'),
        act: v('think out loud, finding out what you mean', 'premýšľať nahlas a zisťovať, čo si myslíš, práve keď to hovoríš'),
        prefers: 'act', family: 'making', turnKind: 'cost',
    },
    'risk-appetite': {
        need: v('the chance to move before everything is certain', 'možnosť pohnúť sa skôr, než je všetko isté'),
        act: v('commit before everything is certain', 'pustiť sa do veci skôr, než je všetko isté'),
        prefers: 'act', family: 'freedom', turnKind: 'cost',
    },
    'careful-consolidation': {
        need: v('something solid that does not need constant rebuilding', 'niečo pevné, čo netreba každý rok prestavovať'),
        act: v('protect what already works before adding anything new', 'chrániť to, čo už funguje, skôr než pridáš niečo nové'),
        prefers: 'act', family: 'method', turnKind: 'cost',
    },
    'conceptual-abstraction': {
        need: v('ideas big enough to organise the rest', 'myšlienky dosť veľké na to, aby usporiadali zvyšok'),
        act: v('treat a single case as an example of something wider', 'hľadať princíp za konkrétnym prípadom'),
        prefers: 'act', family: 'depth', turnKind: 'cost',
    },
    'steady-endurance': {
        need: v('work you can stay with for a long time', 'prácu, pri ktorej sa dá dlho vydržať'),
        act: v('stay with one thing for a long time', 'vydržať pri jednej veci dlhý čas'),
        prefers: 'act', family: 'method', turnKind: 'cost',
    },
    'social-visibility': {
        need: v('a place where what you do is seen', 'miesto, kde je vidieť, čo robíš'),
        act: v('work in plain view without minding who is watching', 'pracovať na očiach bez ohľadu na to, kto sa pozerá'),
        prefers: 'act', family: 'making', turnKind: 'cost',
    },
    /* ------------------------------------------------------------- drives */
    'creative-generation': {
        need: v('your own stamp on what you make', 'možnosť dať tomu, čo robíš, vlastný tvar'),
        act: v('make something rather than only talk about it', 'radšej niečo vyrobiť, než o tom len hovoriť'),
        prefers: 'need', family: 'making', turnKind: 'gloss',
    },
    'mastery-and-depth': {
        need: v('the chance to do things properly, not just adequately', 'príležitosť urobiť niečo poriadne, nie len dostatočne'),
        act: v('keep refining until something is properly done', 'doťahovať veci, kým nie sú poriadne hotové'),
        prefers: 'need', family: 'depth', turnKind: 'cost',
    },
    'results-and-ambition': {
        need: v('something tangible to leave behind', 'niečo hmatateľné, čo po tebe zostane'),
        act: v('judge an effort by what it actually produced', 'posudzovať námahu podľa toho, čo naozaj priniesla'),
        prefers: 'need', family: 'making', turnKind: 'cost',
    },
    'being-recognised': {
        need: v('someone who notices what you contribute', 'aspoň nejaký signál, že to, čím prispievaš, niekto skutočne zaregistroval'),
        act: v('notice quickly whether your work has reached anyone', 'rýchlo si všimnúť, či tvoja práca k niekomu dorazila'),
        prefers: 'need', family: 'making', turnKind: 'gloss',
    },
    'meaning-and-purpose': {
        need: v('a reason the effort is worth it', 'dôvod, pre ktorý sa tá námaha oplatí'),
        act: v('ask what something is for before you commit to it', 'pýtať sa, načo niečo je, skôr než sa do toho pustíš'),
        prefers: 'need', family: 'depth', turnKind: 'cost',
    },
    'closeness-and-belonging': {
        need: v('a few people you genuinely belong with', 'zopár ľudí, ku ktorým naozaj patríš'),
        act: v('stay close to a few particular people', 'držať sa blízko pri niekoľkých konkrétnych ľuďoch'),
        prefers: 'need', family: 'people', turnKind: 'gloss',
    },
    'room-to-move': {
        need: v('room to change things as you go', 'priestor meniť veci za pochodu'),
        act: v('keep a way out of any arrangement', 'nechávať si z každého usporiadania cestu von'),
        prefers: 'need', family: 'freedom', turnKind: 'cost',
    },
    'looking-after': {
        need: v('something or someone to take care of', 'niečo alebo niekoho, o koho sa oplatí starať'),
        act: v('pick up what nobody else is holding', 'zdvihnúť to, čo nikto iný nedrží'),
        prefers: 'need', family: 'people', turnKind: 'cost',
    },
    'wanting-to-understand': {
        need: v('an explanation that actually holds together', 'vysvetlenie, ktoré naozaj drží pokope'),
        act: v('keep asking why until the answer holds', 'pýtať sa prečo, kým odpoveď neobstojí'),
        prefers: 'need', family: 'depth', turnKind: 'cost',
    },
    'form-and-craft': {
        need: v('things that are well made and not merely functional', 'veci, ktoré majú aj poriadne spracovanie, nielen funkciu'),
        act: v('notice how well something is made before anything else', 'všímať si najprv, ako dobre je vec urobená'),
        prefers: 'need', family: 'depth', turnKind: 'cost',
    },
};
export const themeParts = (themeId) => PARTS[themeId];
export const PARTED_THEME_IDS = Object.keys(PARTS);
/* ======================================================================== *
 * WHEN TWO WANTS BECOME ONE.
 *
 * A standard, a purpose or an audience is not a separate want so much as a
 * condition on another one. `Mastery` beside `understanding` is not two items
 * in a list; it is a particular kind of understanding - why, not only that.
 * Beside `making` it is a particular kind of making. The same theme means
 * something different next to a different neighbour, and a reader should be
 * able to hear that.
 *
 * So three HEADS (understanding, making, results) and four QUALIFIERS (a
 * standard, a purpose, being seen, craft), and a complete table between them:
 * twelve phrases, written out, rather than a grammar that assembles them and
 * gets half of them wrong. When a list holds a head and a qualifier, the
 * composer replaces both with the phrase here.
 *
 * Twelve is the whole of it. A new head or qualifier adds four phrases or
 * three, and a test fails until they exist.
 * ======================================================================== */
export const FUSION_HEADS = ['wanting-to-understand', 'creative-generation', 'results-and-ambition'];
export const FUSION_QUALIFIERS = ['mastery-and-depth', 'meaning-and-purpose', 'being-recognised', 'form-and-craft'];
const FUSIONS = {
    'wanting-to-understand+mastery-and-depth': v('an understanding of why things work rather than just that they do', 'pochopenie, prečo veci fungujú, nie len že fungujú'),
    'wanting-to-understand+meaning-and-purpose': v('an explanation that reaches as far as what something is for', 'vysvetlenie, ktoré siaha až k tomu, načo niečo je'),
    'wanting-to-understand+being-recognised': v('someone who genuinely engages with what you have worked out', 'niekoho, kto sa naozaj zaoberá tvojimi úvahami'),
    'wanting-to-understand+form-and-craft': v('an explanation that is exact rather than roughly right', 'vysvetlenie, ktoré je presné, nie len zhruba správne'),
    'creative-generation+mastery-and-depth': v('work you have finished to your own standard', 'prácu dotiahnutú podľa vlastných meradiel'),
    'creative-generation+meaning-and-purpose': v('something to make that matters beyond the making', 'tvorbu, ktorá má zmysel aj mimo samotného tvorenia'),
    'creative-generation+being-recognised': v('work of your own that other people actually get to see', 'vlastnú prácu, ktorú uvidia aj druhí'),
    'creative-generation+form-and-craft': v('things you make that are properly made, not just made', 'veci, ktoré sú poriadne spracované, nie len vyrobené'),
    'results-and-ambition+mastery-and-depth': v('a result that holds up rather than one that is merely finished', 'výsledok, ktorý naozaj obstojí'),
    'results-and-ambition+meaning-and-purpose': v('a result that matters beyond the task itself', 'výsledok, ktorý má význam aj mimo samotnej úlohy'),
    'results-and-ambition+being-recognised': v('a result other people can actually see', 'výsledok, ktorý môžu vidieť aj druhí'),
    'results-and-ambition+form-and-craft': v('a result that is well made and not merely finished', 'výsledok, ktorý je dobre urobený, nielen dokončený'),
};
export const fusionOf = (head, qualifier) => FUSIONS[`${head}+${qualifier}`];
const TENSION_VOICE = {
    'inner-focus': {
        bothA: v('Time in your own head comes first, yet being in the thick of things is just as necessary; going without either for long costs you.', 'Začínaš zvnútra a čas vo vlastnej hlave je pre teba nevyhnutný, no rovnako aj byť uprostred diania; keď to dlho chýba, niečo ťa to stojí.'),
        bothB: v('You come alive among people and events, yet time inside your own head is just as necessary; each runs down without the other.', 'Najviac ožívaš medzi ľuďmi a udalosťami, a predsa je čas vo vlastnej hlave rovnako nevyhnutný; jedno bez druhého sa vyčerpá.'),
        both: v('You need time in your own head and time in the middle of things, and neither can stand in for the other for long.', 'Potrebuješ čas vo vlastnej hlave aj čas uprostred diania a ani jedno z toho dlho nenahradí to druhé.'),
        a: v('You work best from the inside out, though being among people and things matters more than it might seem.', 'Najlepšie ti to ide zvnútra von, hoci byť medzi ľuďmi a vecami je pre teba dôležitejšie, než sa môže zdať.'),
        b: v('You come alive in the middle of things, but you still need time afterwards for it all to settle.', 'Najviac ožívaš uprostred diania, no potom stále potrebuješ čas, aby sa to v tebe usadilo.'),
    },
    reasoning: {
        bothA: v('You want to show your reasoning, yet you also trust a quicker sense that gets there first; when they disagree, neither gives way.', 'Chceš vedieť ukázať, ako sa k záveru dá dôjsť, a zároveň veríš rýchlejšiemu zmyslu, ktorý príde skôr než úvaha; keď sa rozchádzajú, ani jeden ľahko neustúpi.'),
        bothB: v('You often know before you can say why, yet you still want to be able to say it; the difficulty is the gap between the two.', 'Často vieš skôr, než vieš povedať prečo, a aj tak trváš na tom, aby sa to prečo dalo povedať; ťažkosť je v medzere medzi tým dvojím.'),
        both: v('An answer often arrives before the explanation, yet you want the explanation too; when they disagree, which to trust is the hard part.', 'Odpoveď často príde skôr, než ju vieš vysvetliť, a ty ju aj tak chceš vedieť vysvetliť; ťažké je rozpoznať, ktorej z nich veriť, keď sa rozchádzajú.'),
        a: v('You want to reason things through, even when a quicker, quieter sense has already made up its mind.', 'Chceš si veci premyslieť, aj keď nejaký rýchlejší a tichší zmysel už má dávno jasno.'),
        b: v('You often know before you can say why, and the reasoning tends to arrive afterwards to check what you already sensed.', 'Často vieš skôr, než vieš povedať prečo, a úvaha prichádza až potom – aby overila, čo už tušíš.'),
    },
    autonomy: {
        bothA: v('Deciding for yourself matters a great deal, but so does real exchange with other people; the hard part is telling which a moment needs.', 'Rozhodovať za seba je pre teba veľmi dôležité a rovnako aj skutočná výmena s druhými; obe sú skutočné a ťažké je rozpoznať, čo si daná chvíľa pýta.'),
        bothB: v('You think best in exchange with other people, yet you need room to reach your own decisions; neither gives way.', 'Najlepšie uvažuješ vo výmene s druhými a zároveň potrebuješ priestor dospieť k vlastným rozhodnutiam; ani jedna z týchto potrieb neustúpi tej druhej.'),
        both: v('You want room to reach your own decisions, and you also respond strongly to real exchange with other people. Both are real, so the question is usually which one a given moment needs.', 'Chceš priestor dospieť k vlastným rozhodnutiam a zároveň silno reaguješ na skutočnú výmenu s druhými. Obe sú skutočné, takže otázka zvyčajne znie, čo si práve daná chvíľa pýta.'),
        a: v('You prefer to reach your own view first, but what other people bring matters to you more than it looks from outside.', 'Radšej si najprv urobíš vlastný názor, no to, čo prinesú druhí, pre teba znamená viac, než je zvonku vidieť.'),
        b: v('You think best in exchange with other people, and yet you still need the last word on what is yours to decide.', 'Najlepšie uvažuješ vo výmene s druhými, a predsa potrebuješ mať posledné slovo v tom, čo je tvoje rozhodnutie.'),
    },
    structure: {
        bothA: v('You reach for structure first, which helps until it feels restrictive; then the need for room to improvise is just as strong.', 'Najprv siahaš po štruktúre a tá pomáha, kým nezačne pôsobiť tesne; potom je potreba priestoru na improvizáciu rovnako silná.'),
        bothB: v('You reach for flexibility first, which helps until things feel directionless; then the need for some structure is just as strong.', 'Najprv siahaš po voľnosti a tá pomáha, kým nezačne pôsobiť bez smeru; potom je potreba nejakej štruktúry rovnako silná.'),
        both: v('Structure helps you until it feels restrictive, and flexibility helps until it feels directionless; you seem to need both, in turn.', 'Štruktúra ti pomáha, kým nezačne pôsobiť tesne, a voľnosť pomáha, kým nezačne pôsobiť bez smeru; zdá sa, že potrebuješ oboje, striedavo.'),
        a: v('A clear method steadies you, as long as it leaves some room to move once things stop going to plan.', 'Jasný postup ťa drží pokope, pokiaľ nechá trochu priestoru, keď veci prestanú ísť podľa plánu.'),
        b: v('You prefer to work with what is actually happening, though some structure underneath keeps that from turning into drift.', 'Radšej pracuješ s tým, čo sa naozaj deje, hoci trochu štruktúry v pozadí bráni tomu, aby sa z toho stalo blúdenie.'),
    },
    risk: {
        bothA: v('You check the downside first, yet you are just as ready to take the chance; which wins depends on how concrete the cost looks.', 'Prvým krokom je overiť si, čo sa môže pokaziť, a predsa je chuť riskovať rovnako skutočná; ktorá vyhrá, závisí od toho, aká konkrétna sa cena zdá.'),
        bothB: v('You would rather move and find out, yet your careful side is just as real and tends to take over once the cost is concrete.', 'Radšej sa pohneš a zistíš to za pochodu, a predsa je opatrná stránka rovnako skutočná; zvykne prevziať slovo vo chvíli, keď sa cena stane konkrétnou.'),
        both: v('You can live with uncertainty up to a point, after which a more careful side takes over; where that point sits is hard to predict.', 'S neistotou vieš žiť len po určitú hranicu; za ňou preberá slovo opatrnejšia stránka a kde tá hranica je, sa nedá vždy predvídať ani tebe.'),
        a: v('You check the downside before committing, though a readiness to take the chance is there too, and sometimes it wins.', 'Pred zaviazaním si overíš, čo sa môže pokaziť, hoci aj chuť riskovať je v tebe a niekedy vyhrá.'),
        b: v('You would rather move and find out, but once the cost becomes concrete, a more cautious side tends to step in.', 'Radšej sa pohneš a zistíš to za pochodu, no keď sa cena stane konkrétnou, zvykne sa ozvať opatrnejšia stránka.'),
    },
    'emotional-expression': {
        bothA: v('What you feel tends to show, though part of you would rather keep it private until it makes sense; the two rarely agree on timing.', 'To, čo cítiš, sa zvykne ukázať, a časť teba by bola radšej, keby nie, kým to nedáva zmysel; v načasovaní sa tie dve málokedy zhodnú.'),
        bothB: v('You keep what you feel to yourself until it makes sense, though part of you wants it seen sooner; the two rarely agree on timing.', 'To, čo cítiš, si necháš pre seba, kým to nedáva zmysel, a časť teba chce, aby to bolo vidieť oveľa skôr; v načasovaní sa tie dve málokedy zhodnú.'),
        both: v('You want to show what you feel and also to keep it private until it makes sense; the two rarely agree on timing.', 'Chceš dať najavo, čo cítiš, a zároveň si to chceš nechať pre seba, kým to nedáva zmysel; obe sú skutočné a v načasovaní sa málokedy zhodnú.'),
        a: v('What you feel tends to show quickly, even though another part of you would prefer to sort it out first.', 'To, čo cítiš, sa zvykne ukázať rýchlo, hoci iná tvoja časť by si to radšej najprv utriedila.'),
        b: v('You tend to keep feelings to yourself until you have sorted them out, even though another part of you wants them seen.', 'Pocity si zvykneš nechať pre seba, kým si ich neutriedíš, hoci iná tvoja časť chce, aby ich bolo vidieť.'),
    },
    visibility: {
        bothA: v('Time that belongs only to you is essential, and so is company; going without either for long costs you.', 'Čas, ktorý patrí len tebe, je nevyhnutný, a rovnako aj spoločnosť; potrebuješ oboje a keď jedno dlho chýba, niečo ťa to stojí.'),
        bothB: v('You are at home among people and need real time alone just as much; too long without either wears you down.', 'Medzi ľuďmi si ako doma a skutočný čas osamote potrebuješ rovnako; jedno bez druhého sa vyčerpá.'),
        both: v('You need real time alone and you need company, and going too long without either one costs you something.', 'Potrebuješ skutočný čas osamote aj spoločnosť a keď ti dlho chýba jedno či druhé, niečo ťa to stojí.'),
        a: v('You need a good deal of time that belongs only to you, though time among people matters to you more than it may look.', 'Potrebuješ dosť času, ktorý patrí len tebe, hoci čas medzi ľuďmi je pre teba dôležitejší, než sa môže zdať.'),
        b: v('You are at ease being seen and among people, and yet you still need time that belongs to nobody but you.', 'Byť na očiach a medzi ľuďmi ti je prirodzené, a predsa potrebuješ čas, ktorý nepatrí nikomu okrem teba.'),
    },
    change: {
        bothA: v('You want what has been built to last, and you are pulled just as strongly toward whatever comes next.', 'Chceš, aby vybudované vydržalo, a rovnako silno ťa to ťahá k tomu, čo príde potom; udržať aj začať sú obe skutočné chute.'),
        bothB: v('You are drawn to whatever comes next, and you want just as strongly for what already works to stay standing.', 'Priťahuje ťa to, čo príde potom, a rovnako silno chceš, aby to, čo už funguje, zostalo stáť; ani jedna z týchto chutí neustúpi tej druhej.'),
        both: v('You want what has been built to last, and you are also drawn to whatever comes next; neither appetite gives way to the other.', 'Chceš, aby vybudované vydržalo, a zároveň ťa priťahuje to, čo príde potom; ani jedna z týchto chutí neustúpi tej druhej.'),
        a: v('You value what already works and want it to last, though the next thing pulls at you more than it first appears.', 'Vážiš si to, čo už funguje, a chceš, aby to vydržalo, hoci ťa to ďalšie láka viac, než sa na prvý pohľad zdá.'),
        b: v('You are already half-interested in the next thing, even while part of you wants what has been built to stay built.', 'Napoly sa už zaujímaš o ďalšiu vec, aj keď časť teba chce, aby postavené zostalo stáť.'),
    },
    initiative: {
        bothA: v('You can take the first step or wait and see what a situation asks for; the pull between the two is mostly about timing.', 'Vieš urobiť prvý krok a rovnako vieš počkať, čo si situácia vypýta; ťahanie medzi tým dvojím je hlavne o načasovaní.'),
        bothB: v('You tend to wait and see what a situation asks for, yet often want to take the first step; the pull is mostly about timing.', 'Zvykneš počkať, čo si situácia vypýta, a rovnako často chceš urobiť prvý krok; ťahanie medzi tým dvojím je hlavne o načasovaní.'),
        both: v('The pull is often about timing: whether to take the first step or to wait and see what the situation asks for.', 'Ťahanie býva často v načasovaní: či urobiť prvý krok, alebo počkať, čo si situácia vypýta.'),
        a: v('You tend to take the first step, though waiting to see what the situation asks for is part of you too, and sometimes wiser.', 'Zvykneš urobiť prvý krok, hoci počkať, čo si situácia vypýta, je tiež súčasť teba – a niekedy lepšia voľba.'),
        b: v('You tend to wait and see what a situation asks for, though part of you would rather take the first step.', 'Zvykneš počkať, čo si situácia vypýta, hoci časť teba by radšej urobila prvý krok.'),
    },
    abstraction: {
        bothA: v('You trust what can be shown in practice, yet are just as drawn to the principle behind it; each keeps the other honest.', 'Veríš tomu, čo sa dá ukázať v praxi, a rovnako ťa priťahuje princíp v pozadí; jedno drží druhé pri zemi.'),
        bothB: v('You reach for the principle behind a situation and need just as much to see it work in practice; each keeps the other honest.', 'Siahaš po princípe za situáciou a rovnako potrebuješ vidieť, že v praxi funguje; jedno drží druhé pri zemi.'),
        both: v('You trust what can be shown in practice and you also reach for the principle behind it; each keeps the other honest.', 'Veríš tomu, čo sa dá ukázať v praxi, a zároveň siahaš po princípe v pozadí; jedno drží druhé pri zemi.'),
        a: v('You trust what can be shown in practice, though the principle behind it interests you more than you let on.', 'Veríš tomu, čo sa dá ukázať v praxi, hoci princíp v pozadí ťa zaujíma viac, než dáš najavo.'),
        b: v('You reach for the principle behind a situation, though you still want to see it hold up in practice.', 'Siahaš po princípe za situáciou, no nakoniec aj tak chceš vidieť, že v praxi obstojí.'),
    },
};
export const tensionVoice = (axis, shape) => say(TENSION_VOICE[axis]?.[shape]);
export const VOICED_AXES = Object.keys(TENSION_VOICE);
/* ======================================================================== *
 * ONE SIDE OF A SPLIT, IN THREE OR FOUR WORDS.
 *
 * For the closing line, which refers back to a split the reader has already
 * met and should not explain it again. Nominative nouns in Slovak, so they
 * can stand after a dash without a preposition choosing their case.
 * ======================================================================== */
const POLE_SHORT = {
    introspective: v('time in your own head', 'čas vo vlastnej hlave'),
    'outwardly-engaged': v('being in the middle of things', 'byť uprostred diania'),
    analytical: v('reasoning it through', 'premyslenie'),
    intuitive: v('trusting the first read', 'dôvera prvému dojmu'),
    independent: v('your own way', 'vlastná cesta'),
    collaborative: v('other people\'s input', 'podnety od druhých'),
    structured: v('a set method', 'pevný postup'),
    adaptable: v('room to improvise', 'priestor na improvizáciu'),
    cautious: v('caution', 'opatrnosť'),
    'risk-oriented': v('taking the chance', 'riskovanie'),
    'emotionally-expressive': v('showing what you feel', 'dať najavo, čo cítiš'),
    'emotionally-contained': v('keeping it in', 'nechať si to pre seba'),
    private: v('time alone', 'čas osamote'),
    social: v('company', 'spoločnosť'),
    'stability-seeking': v('keeping what works', 'udržať, čo funguje'),
    'novelty-seeking': v('the next thing', 'ďalšia vec'),
    assertive: v('the first step', 'prvý krok'),
    receptive: v('waiting to see', 'počkať a vidieť'),
    practical: v('what can be shown', 'to, čo sa dá ukázať'),
    conceptual: v('the principle behind it', 'princíp v pozadí'),
};
export const poleShort = (dimension) => say(POLE_SHORT[dimension]);
const CONTEXT_NEED = {
    /* The same two wants turn up in most portraits; beside a different lead they
       are said in that lead's terms, and at the head of their own list in plain
       words. */
    'room-to-move': {
        freedom: v('room to adjust things along the way', 'priestor meniť veci za pochodu'),
        depth: v('space to change direction as your thinking changes', 'priestor meniť veci za pochodu'),
        making: v('room to rearrange things as you work', 'priestor meniť veci za pochodu'),
        people: v('room to change how things are set up around you', 'priestor meniť veci za pochodu'),
        method: v('room to adjust an arrangement once it stops working', 'priestor meniť veci za pochodu'),
    },
    'closeness-and-belonging': {
        depth: v('a handful of people you really belong with', 'zopár ľudí, ku ktorým naozaj patríš'),
        making: v('a few people to belong with', 'zopár ľudí, ku ktorým naozaj patríš'),
        method: v('a small, steady circle you genuinely belong to', 'zopár ľudí, ku ktorým naozaj patríš'),
    },
    'independent-direction': {
        depth: v('the freedom to reach your own conclusions', 'slobodu dospieť k vlastným záverom'),
        making: v('the final say over how things are done', 'posledné slovo v tom, ako sa veci robia'),
        people: v('a view that is truly your own', 'názor, ktorý je naozaj tvoj'),
        method: v('control over how the work is done', 'kontrolu nad tým, ako sa práca robí'),
    },
    'results-and-ambition': {
        depth: v('a result that shows the thinking was worth it', 'výsledok, ktorý ukáže, že premýšľanie malo zmysel'),
        making: v('something finished you can point to', 'niečo dokončené, na čo môžeš ukázať'),
        people: v('something real that other people can rely on', 'niečo skutočné, na čo sa druhí môžu spoľahnúť'),
        method: v('a result that holds up over time', 'výsledok, ktorý časom obstojí'),
    },
    'flexible-improvisation': {
        depth: v('space to follow a question wherever it leads', 'priestor ísť za otázkou, kamkoľvek vedie'),
        making: v('room to change course while the work is still taking shape', 'priestor zmeniť smer, kým práca ešte naberá tvar'),
        people: v('the freedom to respond to what is actually happening', 'voľnosť reagovať na to, čo sa naozaj deje'),
        method: v('a plan that can bend when it has to', 'plán, ktorý sa vie ohnúť, keď treba'),
    },
};
const CONTEXT_ACT = {
    'conceptual-abstraction': {
        depth: v('look past the case in front of you for the idea that explains it', 'hľadať princíp za konkrétnym prípadom'),
        making: v('ask what wider rule your work illustrates', 'hľadať princíp za konkrétnym prípadom'),
    },
    'structured-method': {
        making: v('build something up step by step until it holds', 'stavať vec krok za krokom, kým nedrží'),
        people: v('bring some order to a thing before you share it', 'dať veci poriadok skôr, než sa o ňu podelíš'),
        freedom: v('find your own method before taking on anyone else\'s', 'vypracovať si vlastný postup skôr, než prijmeš cudzí'),
    },
    'deep-internal-processing': {
        making: v('let an idea develop in private before you show it', 'nechať nápad dozrieť v súkromí skôr, než ho ukážeš'),
        people: v('take things in quietly and sort them out later', 'vnímať veci potichu a triediť si ich až neskôr'),
        freedom: v('settle a question privately and explain it afterwards', 'vyriešiť si otázku v súkromí a vysvetliť ju až potom'),
        method: v('think a thing through before you start', 'premyslieť si vec v tichosti skôr, než začneš'),
    },
    /* The mood is registered in every one of these; only where the attention
       happens to be changes. Nothing is added about what is then done with it -
       `before you get to work` was a behaviour no evidence ever described. */
    'emotional-permeability': {
        depth: v('pick up the atmosphere around you quickly, even when you are deep in thought', 'rýchlo vycítiť atmosféru okolo seba, aj uprostred vlastných úvah'),
        making: v('pick up the mood around you quickly, even while you are absorbed in your own work', 'rýchlo zachytiť náladu okolo seba, aj uprostred práce na niečom vlastnom'),
        freedom: v('sense the atmosphere around you quickly, even while you are going your own way', 'rýchlo vycítiť atmosféru okolo seba, aj keď ideš vlastnou cestou'),
        method: v('register the mood around you quickly, even when your attention is on the task itself', 'rýchlo zaregistrovať náladu okolo seba, aj keď je tvoja pozornosť pri samotnej úlohe'),
    },
    'steady-endurance': {
        depth: v('stay with a question for as long as it takes', 'zostať pri otázke tak dlho, ako treba'),
        making: v('keep working on something long after the first excitement has gone', 'pracovať na niečom dlho po tom, čo prvé nadšenie opadlo'),
        people: v('stay with people and commitments through the harder stretches', 'držať sa ľudí a záväzkov aj v ťažších obdobiach'),
        freedom: v('keep going steadily on your own terms', 'pokračovať po svojom, vytrvalým tempom'),
    },
    /* What another person brings changes your position - in each of these, and
       nothing else is claimed: not consulting anybody, not involving anybody
       early, which were behaviours rather than the pattern. */
    'relational-orientation': {
        depth: v('understand where someone is coming from before you form a view', 'pochopiť, odkiaľ niekto prichádza, skôr než si urobíš názor'),
        making: v('shape what you make around the person it is for', 'prispôsobiť to, čo robíš, človeku, pre ktorého to je'),
        freedom: v('let other people\'s views shape yours, even when the decision is yours', 'nechať názory druhých formovať ten tvoj, aj keď je rozhodnutie na tebe'),
        method: v('take the people involved into account before you settle on a method', 'zohľadniť ľudí, ktorých sa to týka, skôr než sa ustáli postup'),
    },
};
/**
 * The phrase for a theme in a list led by `leadFamily`, or its own phrase when
 * it leads the list or has no variant for that company.
 */
export function contextualPart(themeId, form, leadFamily, centralId = null) {
    const parts = PARTS[themeId];
    if (!parts)
        return '';
    const central = centralEn(form, themeId, centralId);
    if (central)
        return central;
    if (leadFamily) {
        const variant = (form === 'need' ? CONTEXT_NEED : CONTEXT_ACT)[themeId]?.[leadFamily];
        if (variant)
            return say(variant);
    }
    return say(parts[form]);
}
/** For the coverage test: every variant a theme declares, by form. */
export const CONTEXT_VARIANT_THEMES = {
    need: Object.keys(CONTEXT_NEED),
    act: Object.keys(CONTEXT_ACT),
};
/* ======================================================================== *
 * WHAT MAKING IS NOT, DEPENDING ON WHAT KIND OF MAKING IT IS.
 *
 * `That does not have to mean art` is the most important thing to say about
 * the making drive - it is the theme most easily over-read - but what it means
 * depends on the pairing. Making finished to a standard is about care; making
 * that reaches somebody is about an audience. One clarification per pairing,
 * and the plain one when making stands alone.
 * ======================================================================== */
const GLOSS_BESIDE = {
    'creative-generation+mastery-and-depth': v('Making here is less about art than about care: it shows in how something is built, written or arranged.', 'Nejde ani tak o umenie ako o starostlivosť: ukáže sa to v tom, ako je niečo postavené, napísané alebo usporiadané.'),
    'creative-generation+being-recognised': v('What you make need not be art; what matters is that it reaches someone.', 'Nemusí ísť o umenie; dôležité je, aby to, čo vznikne, k niekomu dorazilo.'),
    'creative-generation+meaning-and-purpose': v('What you make does not have to be art; it only has to be for something.', 'Nemusí to byť umenie; stačí, aby to malo zmysel.'),
    'creative-generation+form-and-craft': v('Making is not only about art here; it is about things being made well, whatever they are.', 'Nejde len o umenie; ide o to, aby boli veci dobre urobené, nech sú akékoľvek.'),
};
export const glossBeside = (themeId, partnerId) => say(GLOSS_BESIDE[`${themeId}+${partnerId}`]);
/* ======================================================================== *
 * WHAT A COMMON PATTERN COSTS, IN THE LIGHT OF WHAT IT SERVES.
 *
 * Two costs turned up in a third of all readings - method's `refining has no
 * natural stopping point` and endurance's `staying power says nothing about
 * whether the thing was worth it` - because method and endurance are among the
 * themes nearly every chart carries. The cost of a pattern depends on what it
 * is in service of, so these take the colour of the portrait's central want,
 * the same way the habits do.
 * ======================================================================== */
const CONTEXT_COST = {
    /* The cost of deciding for yourself, said in the colour of what the reading is mainly about (the same sentence in every portrait that carries the want was a stock line). */
    'independent-direction': {
        freedom: v('Going your own way can leave you alone with a decision that a second pair of eyes would have caught.', 'Vie sa to preklopiť do rozhodovania osamote v situáciách, keď by bolo rýchlejšie sa opýtať – a do brania si na seba viac, než bolo treba.'),
        making: v('Wanting the final say over the work can leave every decision about it waiting on you.', 'Vie sa to preklopiť do rozhodovania osamote v situáciách, keď by bolo rýchlejšie sa opýtať – a do brania si na seba viac, než bolo treba.'),
        depth: v('Reaching your own conclusions can leave you the only person who has checked them.', 'Vie sa to preklopiť do rozhodovania osamote v situáciách, keď by bolo rýchlejšie sa opýtať – a do brania si na seba viac, než bolo treba.'),
        people: v('Deciding for yourself can sit awkwardly beside people who expected to be asked.', 'Vie sa to preklopiť do rozhodovania osamote v situáciách, keď by bolo rýchlejšie sa opýtať – a do brania si na seba viac, než bolo treba.'),
        method: v('A method you set yourself can go unquestioned because nobody else was asked to look at it.', 'Vie sa to preklopiť do rozhodovania osamote v situáciách, keď by bolo rýchlejšie sa opýtať – a do brania si na seba viac, než bolo treba.'),
    },
    /* Two costs every second chart carries, said in the colour of what the
       reading is mainly about. The Slovak is the one sentence each. */
    'room-to-move': {
        freedom: v('A limit tends to register with you well before the freedom around it does.', 'Obmedzenie si pravdepodobne všimneš oveľa skôr než slobodu okolo neho.'),
        making: v('You may notice what is holding your work back before you notice how much room you still have.', 'Obmedzenie si pravdepodobne všimneš oveľa skôr než slobodu okolo neho.'),
        depth: v('The limits on an idea tend to stand out to you sooner than the room left to explore it.', 'Obmedzenie si pravdepodobne všimneš oveľa skôr než slobodu okolo neho.'),
        people: v('With other people involved, you may notice what restricts you before you notice what is open.', 'Obmedzenie si pravdepodobne všimneš oveľa skôr než slobodu okolo neho.'),
        method: v('A rule or routine that boxes you in tends to stand out sooner than the room around it.', 'Obmedzenie si pravdepodobne všimneš oveľa skôr než slobodu okolo neho.'),
    },
    'emotional-permeability': {
        freedom: v('What you absorb from a room is not always easy to tell from what you feel yourself.', 'Odlíšiť vlastnú náladu od tej okolo seba môže byť ťažšie, než to znie.'),
        making: v('Other people\'s moods can seep into your own while you are trying to work.', 'Odlíšiť vlastnú náladu od tej okolo seba môže byť ťažšie, než to znie.'),
        depth: v('It can be hard to tell which feelings are yours and which belong to the room.', 'Odlíšiť vlastnú náladu od tej okolo seba môže byť ťažšie, než to znie.'),
        people: v('Other people\'s moods can become yours before you have noticed them.', 'Odlíšiť vlastnú náladu od tej okolo seba môže byť ťažšie, než to znie.'),
        method: v('Absorbing the mood around you can blur where your own feeling stops.', 'Odlíšiť vlastnú náladu od tej okolo seba môže byť ťažšie, než to znie.'),
    },
    'flexible-improvisation': {
        freedom: v('Keeping your options open can leave a plan looser than the people relying on it expect.', 'Vopred urobené plány zvyknú potichu vyjsť navnivoč – čo funguje dovtedy, kým sa na niektorý nespoliehal niekto iný.'),
        making: v('A piece of work can stay open for so long that nobody else can build on it.', 'Vopred urobené plány zvyknú potichu vyjsť navnivoč – čo funguje dovtedy, kým sa na niektorý nespoliehal niekto iný.'),
        depth: v('A question you keep reopening can leave others unsure what has actually been decided.', 'Vopred urobené plány zvyknú potichu vyjsť navnivoč – čo funguje dovtedy, kým sa na niektorý nespoliehal niekto iný.'),
        people: v('Staying flexible can leave the people relying on you unsure what to count on.', 'Vopred urobené plány zvyknú potichu vyjsť navnivoč – čo funguje dovtedy, kým sa na niektorý nespoliehal niekto iný.'),
        method: v('Changing the method as you go can make it hard to say what the method now is.', 'Vopred urobené plány zvyknú potichu vyjsť navnivoč – čo funguje dovtedy, kým sa na niektorý nespoliehal niekto iný.'),
    },
    'structured-method': {
        making: v('Because the method never quite feels finished, the moment to let the work go tends to be the hard part.', 'Keďže postup nikdy celkom nepôsobí hotovo, najťažšia zvykne byť chvíľa, keď treba prácu pustiť.'),
        people: v('Getting the order right can take priority over what the people involved actually need from it.', 'Dať veciam poriadok môže dostať prednosť pred tým, čo z toho ľudia naokolo naozaj potrebovali.'),
        freedom: v('A method of your own can quietly become a rule you are the last to question.', 'Vlastný postup sa môže potichu zmeniť na pravidlo, ktoré spochybníš až nakoniec.'),
    },
    'steady-endurance': {
        making: v('Persistence can keep a project going long after its moment has passed.', 'Vytrvalosť dokáže udržať projekt pri živote dlho po tom, čo jeho chvíľa pominula.'),
        people: v('Loyalty can outlast the reasons for it.', 'Vernosť dokáže prežiť dôvody, pre ktoré vznikla.'),
        freedom: v('Doing it your own way for long enough can hide the moment the way itself stopped working.', 'Keď robíš veci po svojom dosť dlho, môže ti uniknúť chvíľa, keď samotný spôsob prestal fungovať.'),
        depth: v('Staying with a question can quietly turn into circling it.', 'Vydržať pri otázke sa môže potichu zmeniť na krúženie okolo nej.'),
    },
    /* Two QA profiles shared one sentence here, word for word, and it compared
       them with `most people` on no evidence at all. The difficulty of starting
       is the same finding in each; what the start is measured against differs. */
    'mastery-and-depth': {
        making: v('A first rough version can be hard to live with, because it falls so far short of what you are aiming for.', 'Prvá hrubá verzia sa znáša ťažko, pretože je ešte tak ďaleko od toho, kam mieriš.'),
        freedom: v('Being a beginner at something sits badly with you, and that can be enough to keep you from starting.', 'Začínať v niečom úplne od nuly ti nesedí a môže to byť dôvod vôbec nezačať.'),
        depth: v('Not yet knowing something well is uncomfortable for you, and it can keep you from starting at all.', 'Keď niečo ešte dobre nepoznáš, je ti to nepríjemné a môže ťa to odradiť už od začiatku.'),
    },
};
/** Every sentence a cost can be said in: each theme's own turn and the variants coloured by the portrait. For the test that asks whether a cost reached the page. */
export function everyCostLine() {
    const own = Object.values(THEME_VOICE).map((theme) => say(theme.turn));
    const coloured = Object.values(CONTEXT_COST).flatMap((variants) => voicesOf(variants).map((voice) => say(voice)));
    return [...own, ...coloured].filter((line) => line.length > 0);
}
/** A theme's cost, coloured by the portrait's central want where it has a variant. */
export function contextualCost(themeId, centralFamily, centralId = null) {
    const central = centralEn('cost', themeId, centralId);
    if (central)
        return central;
    const variant = centralFamily ? CONTEXT_COST[themeId]?.[centralFamily] : undefined;
    return variant ? say(variant) : say(THEME_VOICE[themeId]?.turn);
}
/* ======================================================================== *
 * THE CLARIFICATION, IN THE LIGHT OF WHAT THE PORTRAIT IS ABOUT.
 *
 * Being seen is the want most easily over-read, and its clarification is the
 * most important thing to say about it - which made it the one gloss two QA
 * profiles shared word for word. What `it is not vanity` amounts to depends on
 * the rest of the portrait: in a reading about making, an unnoticed piece feels
 * unfinished; in one about understanding, it is the work nobody engages with
 * that goes flat. A pairing's own clarification (above) still comes first.
 * ======================================================================== */
const GLOSS_CONTEXT = {
    'closeness-and-belonging': {
        freedom: v('Wanting a few close people is not the same as wanting company.', 'Nie je to to isté ako spoločenskosť a tieto dve veci môžu ťahať rôznymi smermi.'),
        depth: v('Needing a few close people does not mean needing a crowd.', 'Nie je to to isté ako spoločenskosť a tieto dve veci môžu ťahať rôznymi smermi.'),
        making: v('Belonging here means a few particular people, not being sociable.', 'Nie je to to isté ako spoločenskosť a tieto dve veci môžu ťahať rôznymi smermi.'),
    },
    'being-recognised': {
        making: v('Being seen for your work is not about praise: work nobody notices can feel unfinished, however good it is.', 'Nejde o pochvalu: niečo, čo vytvoríš a nikto si to nevšimne, ti môže pripadať nedokončené, nech je to akokoľvek dobré.'),
        depth: v('What you want is engagement rather than praise: work nobody engages with tends to go flat on you, however sound it is.', 'Nejde o pochvalu, ale o záujem: práca, ktorou sa nikto nezaoberá, v tebe zvykne splasnúť, nech je akokoľvek dobrá.'),
    },
};
/** The clarification a gloss theme carries: its pairing's, its portrait's, or its own. */
export function contextualGloss(themeId, partnerId, centralFamily, centralId = null) {
    const paired = partnerId ? glossBeside(themeId, partnerId) : '';
    if (paired)
        return paired;
    const central = centralEn('gloss', themeId, centralId);
    if (central)
        return central;
    const coloured = centralFamily ? GLOSS_CONTEXT[themeId]?.[centralFamily] : undefined;
    return coloured ? say(coloured) : say(THEME_VOICE[themeId]?.turn);
}
const TENSION_CONTEXT = {
    autonomy: {
        bothA: {
            byFamily: {
                making: v('You trust your own judgement and want other people\'s input while the work takes shape; the hard part is knowing when each is needed.', 'Tvoj vlastný úsudok je pre teba veľmi dôležitý a rovnako aj podnety druhých, kým práca naberá tvar; obe sú skutočné a ťažké je vedieť, kedy počúvať a kedy rozhodnúť.'),
                depth: v('You want your own conclusions, and you think better in real exchange with other people; the hard part is knowing which a question needs.', 'Chceš dospieť k vlastným záverom a zároveň ti skutočná výmena s druhými pomáha lepšie uvažovať; obe sú skutočné a ťažké je rozpoznať, čo si daná otázka pýta.'),
            },
        },
    },
    /* Beside a shown readiness to commit early, waiting is said as the contrast
       it is, so the two sentences do not simply contradict each other. */
    /* Thinking aloud is how an inward worker finishes the thought, so the two
       sentences do not claim opposite working places. */
    'inner-focus': {
        a: {
            beside: {
                'outward-expression': v('Your thinking starts on the inside and gets finished in the open; being among people and things matters more than it might seem.', 'Najlepšie ti to ide zvnútra von, hoci byť medzi ľuďmi a vecami je pre teba dôležitejšie, než sa môže zdať.'),
            },
        },
    },
    initiative: {
        b: {
            beside: {
                'risk-appetite': v('You tend to wait and see what a situation asks for and then commit quickly, though part of you would rather take the first step.', 'Zvykneš počkať, čo si situácia vypýta, hoci časť teba by radšej urobila prvý krok.'),
            },
        },
        bothB: {
            beside: {
                'risk-appetite': v('You tend to wait and see, yet your readiness to commit early means you often want to take the first step; the pull is mostly about timing.', 'Zvykneš počkať, čo si situácia vypýta, a rovnako často chceš urobiť prvý krok; ťahanie medzi tým dvojím je hlavne o načasovaní.'),
            },
        },
    },
    structure: {
        bothA: {
            byFamily: {
                making: v('Structure serves your work until it starts to cramp it; from that point, room to improvise matters just as much.', 'Štruktúra je pre teba na prvom mieste a prácu podporuje, kým ju nezačne zväzovať; potom je priestor na improvizáciu rovnako dôležitý.'),
                freedom: v('You build a structure of your own first; it helps until it hems you in, and then room to improvise matters just as much.', 'Najprv si nastavíš vlastnú štruktúru a tá pomáha, kým ťa nezačne obmedzovať; potom je priestor na improvizáciu rovnako dôležitý.'),
                depth: v('A clear framework helps you think, up to the point where it limits the thinking; past that, room to improvise matters just as much.', 'Jasný rámec ti pomáha premýšľať, kým nezačne premýšľanie obmedzovať; potom je priestor na improvizáciu rovnako dôležitý.'),
            },
        },
        a: {
            beside: {
                'room-to-move': v('A clear method steadies you, though you are quick to change it once it stops fitting.', 'Jasný postup ťa drží pokope, hoci keď prestane sedieť, rýchlo ho zmeníš.'),
                'flexible-improvisation': v('A clear method steadies you, though you are quick to change it once it stops fitting.', 'Jasný postup ťa drží pokope, hoci keď prestane sedieť, rýchlo ho zmeníš.'),
            },
        },
    },
};
/**
 * The sentence for a split: said beside a pattern that already states one of
 * its sides, or in the colour of the portrait's central want, or as authored.
 */
export function contextualTension(axis, shape, centralFamily, shownThemeIds, centralId = null) {
    const context = TENSION_CONTEXT[axis]?.[shape];
    for (const [themeId, voice] of Object.entries(context?.beside ?? {})) {
        if (shownThemeIds.has(themeId))
            return say(voice);
    }
    const central = centralEn('tension', `${axis}.${shape}`, centralId);
    if (central)
        return central;
    const coloured = centralFamily ? context?.byFamily?.[centralFamily] : undefined;
    return coloured ? say(coloured) : tensionVoice(axis, shape);
}
/* ======================================================================== *
 * EACH PATTERN, AS THE CLOSE REMEMBERS IT.
 *
 * `In short` used to reprint the handles - `doing it properly, working things
 * out inwardly` - which is the reading's index, not its meaning. The close now
 * says what a person needs in words the reading has not used yet, so that the
 * opening and the close read alone give the central pattern twice without
 * repeating a phrase. Every entry completes `you need ...`, and the Slovak is
 * in the accusative for the same reason.
 * ======================================================================== */
const GIST = {
    'deep-internal-processing': v('time to settle things before you speak', 'čas ujasniť si veci pre seba ešte predtým, než prehovoríš'),
    'independent-direction': v('a direction that is genuinely yours', 'smer, o ktorom rozhoduješ ty'),
    'relational-orientation': v('people whose view genuinely changes yours', 'ľudí, ktorých pohľad naozaj mení ten tvoj'),
    'structured-method': v('a process you trust', 'postup, ktorému môžeš dôverovať'),
    'flexible-improvisation': v('room to respond to whatever comes up', 'priestor reagovať na to, čo naozaj príde'),
    'emotional-permeability': v('surroundings that suit you', 'prostredie, v ktorom sa cítiš dobre'),
    'emotional-containment': v('room to settle your feelings before you show them', 'priestor utriediť si pocity skôr, než ich ukážeš'),
    'outward-expression': v('people to talk things over with', 'ľudí, s ktorými môžeš veci prebrať nahlas'),
    'risk-appetite': v('room to take a chance', 'priestor niečo riskovať'),
    'careful-consolidation': v('something solid to build on', 'niečo pevné, na čom sa dá stavať'),
    'conceptual-abstraction': v('a principle that explains the details', 'princíp, ktorý dáva detailom zmysel'),
    'steady-endurance': v('something worth staying with', 'niečo, pri čom sa oplatí vydržať'),
    'social-visibility': v('a place where you can be seen', 'miesto, kde ťa je vidieť'),
    'creative-generation': v('something of your own to shape', 'niečo vlastné, čomu môžeš dať tvar'),
    'mastery-and-depth': v('work that feels genuinely finished rather than merely done', 'prácu, ktorá je naozaj dotiahnutá, nie len hotová'),
    'results-and-ambition': v('visible proof that your effort led somewhere', 'viditeľný dôkaz, že tvoja námaha k niečomu viedla'),
    'being-recognised': v('a place where your contribution counts', 'niekoho, kto si všimne, čo do toho vkladáš'),
    'meaning-and-purpose': v('work that means something to you', 'prácu, ktorá pre teba niečo znamená'),
    'closeness-and-belonging': v('a small circle where you truly belong', 'malý okruh ľudí, kam naozaj patríš'),
    'room-to-move': v('freedom to rearrange what stops fitting', 'voľnosť veci preusporiadať, keď prestanú sedieť'),
    'looking-after': v('someone or something to be responsible for', 'niekoho alebo niečo, o čo sa môžeš starať'),
    'wanting-to-understand': v('something worth getting to the bottom of', 'niečo, čomu sa oplatí prísť na koreň'),
    'form-and-craft': v('things made with real care', 'veci urobené s ozajstnou starostlivosťou'),
};
export const themeGist = (themeId) => say(GIST[themeId]);
export const GIST_THEME_IDS = Object.keys(GIST);
const BALANCE = {
    'inner-focus': {
        a: v('quiet thinking time balanced by enough of the world outside', 'tichý čas na premýšľanie vyvážený dostatkom vonkajšieho sveta'),
        b: v('plenty going on around you with time afterwards to let it settle', 'dosť diania okolo seba s časom potom, aby sa to usadilo'),
        even: v('as much quiet thinking as time out among things', 'rovnako veľa tichého premýšľania ako času uprostred diania'),
    },
    reasoning: {
        a: v('room to check your thinking without silencing your instinct', 'priestor overiť si úvahu bez toho, aby umĺkol inštinkt'),
        b: v('room to trust what you sense with time to check it afterwards', 'priestor veriť tomu, čo tušíš, s časom overiť si to neskôr'),
        even: v('a way to trust your reasoning as much as your first read', 'spôsob, ako veriť úvahe rovnako ako prvému dojmu'),
    },
    autonomy: {
        a: v('room to decide while still hearing others out', 'priestor rozhodovať sa po svojom, no so sluchom pre druhých'),
        b: v('thinking partners who leave you the decision', 'ľudí na premýšľanie, ktorí ti nechajú posledné slovo'),
        even: v('real independence alongside real exchange with others', 'skutočnú samostatnosť popri skutočnej výmene s druhými'),
    },
    structure: {
        a: v('a dependable method you are free to rework', 'spoľahlivý postup, ktorý môžeš prerobiť'),
        bothA: v('a clear method you can adjust', 'jasný postup s dostatkom voľnosti ho priebežne prerábať'),
        b: v('scope to find the method as you go', 'dosť voľnosti nájsť postup priebežne'),
        even: v('structure alternating with freedom', 'striedanie štruktúry s voľnosťou'),
    },
    risk: {
        a: v('a careful look at the downside before you take the chance', 'dôkladný pohľad na riziká skôr, než do toho pôjdeš'),
        b: v('room to act early with an eye on what it could cost', 'priestor konať skoro s okom na tom, čo to môže stáť'),
        even: v('a clear sense of when a chance is worth taking', 'jasný pocit, kedy sa oplatí riskovať'),
    },
    'emotional-expression': {
        a: v('room to let feelings show with time to make sense of them', 'priestor ukázať city s časom pochopiť ich'),
        b: v('time to make sense of what you feel before it has to show', 'čas pochopiť, čo cítiš, skôr než to musí byť vidieť'),
        even: v('your own timing for when feelings show', 'vlastné načasovanie toho, kedy je city vidieť'),
    },
    visibility: {
        a: v('plenty of time of your own with company you choose', 'dosť času len pre seba so spoločnosťou, ktorú si vyberieš'),
        b: v('people around you without losing time of your own', 'ľudí okolo seba bez straty času pre seba'),
        even: v('real time alone as much as real company', 'skutočný čas osamote rovnako ako skutočnú spoločnosť'),
    },
    change: {
        a: v('something lasting to build on with room for what comes next', 'niečo trvácne ako základ s priestorom pre to, čo príde'),
        b: v('something new to move toward without losing what already works', 'niečo nové, k čomu sa dá smerovať, bez straty toho, čo už funguje'),
        even: v('things that last as much as things that are new', 'veci, ktoré vydržia, rovnako ako veci, ktoré sú nové'),
    },
    initiative: {
        a: v('the freedom to move first with the patience to hold back when that is wiser', 'voľnosť konať hneď s trpezlivosťou počkať, keď je to múdrejšie'),
        b: v('time to read a situation before you act', 'čas prečítať situáciu skôr, než začneš konať'),
        even: v('a feel for the right moment to move', 'cit pre správnu chvíľu na prvý krok'),
    },
    abstraction: {
        a: v('ideas that prove themselves in practice', 'myšlienky, ktoré sa osvedčia v praxi'),
        b: v('principles you can test in practice', 'princípy, ktoré si môžeš overiť v praxi'),
        even: v('practice that keeps ideas honest', 'prax, ktorá drží myšlienky pri zemi'),
    },
};
const leaningOf = (shape) => shape === 'both' ? 'even' : shape === 'a' || shape === 'bothA' ? 'a' : 'b';
/** The leading split as a need, in the way it leans. */
export function balanceGist(axis, shape) {
    const entry = BALANCE[axis];
    if (!entry)
        return '';
    const exact = shape === 'bothA' ? entry.bothA : shape === 'bothB' ? entry.bothB : undefined;
    return say(exact ?? entry[leaningOf(shape)]);
}
const AREA_CLAUSES = {
    'work-career': {
        'independent-direction': {
            base: v('choose your own methods', 'rozhodnúť po svojom, ako sa veci budú robiť'),
            byFamily: { making: v('set the method yourself', 'určovať postup podľa seba') },
        },
        'relational-orientation': {
            base: v('work with people rather than around them', 'robiť veci s ľuďmi, nie popri nich'),
        },
        'creative-generation': {
            base: v('make something clearly yours', 'vytvoriť niečo, čo je rozpoznateľne tvoje'),
        },
        'structured-method': {
            base: v('follow a method you trust', 'postupovať podľa metódy, ktorej dôveruješ'),
            byFamily: { making: v('keep the work in a clear order', 'mať vo veciach jasný poriadok') },
        },
        'mastery-and-depth': {
            base: v('do it properly, without a rush', 'robiť veci dôkladne, bez zhonu'),
            byFamily: { making: v('take the time to get it right', 'venovať tomu dosť času, aby to bolo správne') },
        },
        'steady-endurance': {
            base: v('see one piece of work through', 'zostať pri jednej veci, kým nie je hotová'),
            byFamily: {
                depth: v('stay with one question as long as it needs', 'zostať pri jednej veci, kým nie je hotová'),
                freedom: v('see one thing through', 'zostať pri jednej veci, kým nie je hotová'),
            },
        },
        'results-and-ambition': {
            base: v('see the result become concrete', 'vidieť, ako výsledok naberá konkrétnu podobu'),
            byFamily: {
                making: v('see the finished thing in front of you', 'vidieť hotovú vec pred sebou'),
                depth: v('see where the effort has led', 'vidieť, kam námaha viedla'),
            },
        },
        'being-recognised': {
            base: v('have your work noticed', 'počítať s tým, že si tvoju prácu niekto všimne'),
        },
        'risk-appetite': {
            base: v('move before everything is settled', 'pohnúť sa skôr, než je všetko isté'),
        },
        'room-to-move': {
            base: v('change things without asking permission', 'meniť nastavenie vecí bez pýtania sa o dovolenie'),
            afterMethod: v('still change course once the original plan stops fitting', 'aj tak zmeniť smer, keď pôvodný plán prestane sedieť'),
        },
        'flexible-improvisation': {
            base: v('adjust the approach once the plan stops fitting', 'zmeniť prístup, len čo plán prestane sedieť'),
            afterMethod: v('still adjust the approach once the plan stops fitting', 'aj tak upraviť prístup, keď plán prestane sedieť'),
        },
    },
    relationships: {
        'relational-orientation': {
            base: v('take in the other person\'s view before settling your own', 'vnímať pohľad druhého skôr, než ustáliš ten svoj'),
        },
        'closeness-and-belonging': {
            base: v('count on a few particular people', 'mať pri sebe niekoľko konkrétnych ľudí, na ktorých je spoľahnutie'),
        },
        'looking-after': {
            /* Not "the people close to you": the relationships frame already opens
               "With people close to you", and the list read it twice. */
            base: v('look after someone who needs it', 'postarať sa o niekoho, kto to potrebuje'),
        },
        'emotional-permeability': {
            base: v('tune in to others without losing yourself', 'vnímať, ako sa cíti druhý, bez straty prehľadu o vlastných pocitoch'),
        },
        'emotional-containment': {
            base: v('sort out what you feel before you are asked to show it', 'utriediť vlastné pocity skôr, než ich máš ukázať'),
        },
        'social-visibility': {
            base: v('be openly yourself in company', 'byť v spoločnosti otvorene sebou'),
        },
    },
    'decision-making': {
        'deep-internal-processing': {
            base: v('think it over on your own first', 'premyslieť to najprv v tichosti'),
        },
        'structured-method': {
            base: v('work through it step by step', 'prejsť tým krok za krokom'),
        },
        'careful-consolidation': {
            base: v('weigh what you already have before changing anything', 'zvážiť, čo už máš, skôr než niečo zmeníš'),
        },
    },
    communication: {
        'outward-expression': {
            base: v('think out loud with someone', 'premýšľať nahlas s niekým'),
        },
        'wanting-to-understand': {
            base: v('keep asking until you understand what is really meant', 'klásť otázky, kým nepochopíš, čo sa naozaj myslí'),
        },
        'conceptual-abstraction': {
            base: v('get to the principle behind the details', 'prísť na princíp za detailmi'),
        },
        'creative-generation': {
            base: v('put things in your own words', 'povedať veci vlastnými slovami'),
        },
        'social-visibility': {
            base: v('speak openly in company', 'hovoriť otvorene aj pred ostatnými'),
        },
    },
    'money-material': {
        'structured-method': {
            base: v('keep a clear system for it', 'mať na to jasný systém'),
        },
        'careful-consolidation': {
            base: v('build up something solid over time', 'postupne budovať niečo pevné'),
        },
        'results-and-ambition': {
            base: v('see what the effort actually brought in', 'vidieť, čo námaha naozaj priniesla'),
        },
        'risk-appetite': {
            base: v('take a chance when it looks worth it', 'riskovať, keď sa to zdá oplatiť'),
        },
    },
};
/** A theme's condition in one area, coloured and placed; empty where the model does not file it there. */
export function areaClause(area, themeId, context) {
    const clause = AREA_CLAUSES[area]?.[themeId];
    if (!clause)
        return '';
    const central = centralEn('area', `${area}.${themeId}`, context.centralId);
    if (central)
        return central;
    if (context.afterMethod && clause.afterMethod)
        return say(clause.afterMethod);
    const coloured = context.family ? clause.byFamily?.[context.family] : undefined;
    return say(coloured ?? clause.base);
}
/** The themes an area can speak for, in the order its clauses are said. */
export const areaClauseOrder = (area) => Object.keys(AREA_CLAUSES[area] ?? {});
/* ======================================================================== *
 * WHAT A SPLIT CAN LOOK LIKE - MARKED AS A POSSIBILITY, NEVER AS A MEMORY.
 *
 * A split is the most abstract thing a reading says, and the one a concrete
 * picture helps most: `which one wins depends on how concrete the cost looks`
 * is true and hard to recognise; a plan that is attractive until its price is
 * spelled out is easy to recognise. So a split can carry one illustration.
 *
 * Every entry keeps four rules, and a test holds them:
 *   - it opens with a marker that says it is an example: `For example`, `You
 *     might notice this when`, `One way this can show up is`, `In practice,
 *     this could mean`, `This can look like`;
 *   - it pictures the split it is attached to and nothing else - no trait,
 *     place, relationship or event the split does not already contain;
 *   - it is a possibility in the present tense, never something that happened;
 *   - it is never evidence. It follows the finding, which stands without it.
 * The composer uses one per reading at most, and only for a split both sides
 * of which rest on more than one tradition.
 * ======================================================================== */
const HYPOTHETICALS = {
    'inner-focus': {
        a: v('For example, you might need an evening to yourself after a day among people, yet a week of only that would feel too quiet.', 'Napríklad po dni medzi ľuďmi môžeš potrebovať večer pre seba, a predsa by ti týždeň len takých večerov pripadal priveľmi tichý.'),
        b: v('For example, a busy day might leave you energised, and you still need a quiet hour afterwards before it all makes sense.', 'Napríklad ťa rušný deň môže nabiť, a aj tak potom potrebuješ tichú hodinu, kým to všetko dá zmysel.'),
    },
    reasoning: {
        a: v('You might notice this when you already have an answer but keep checking it before you trust it.', 'Môžeš si to všimnúť, keď už odpoveď máš, no stále si ju overuješ, kým jej uveríš.'),
        b: v('You might notice this when you know something before you can explain why, and only find the reasons afterwards.', 'Môžeš si to všimnúť, keď niečo vieš skôr, než vieš vysvetliť prečo, a dôvody nájdeš až potom.'),
        even: v('You might notice this when a first impression and a careful argument point different ways and neither feels safe to drop.', 'Môžeš si to všimnúť, keď prvý dojem a starostlivá úvaha ukazujú rôznymi smermi a ani jedno sa nezdá bezpečné pustiť.'),
    },
    autonomy: {
        a: v('One way this can show up is making up your mind privately and still wanting to hear someone else\'s view before you act.', 'Môže sa to prejaviť tak, že sa rozhodneš v súkromí a potom aj tak chceš počuť názor niekoho iného, skôr než podľa toho konáš.'),
        b: v('For example, you might talk a decision through at length and still want the final call to be yours.', 'Napríklad môžeš rozhodnutie dlho prebrať s druhými a aj tak chcieť, aby posledné slovo bolo tvoje.'),
        even: v('For example, a decision made alone can feel incomplete until you have talked it over, and one made together can feel not quite yours.', 'Napríklad rozhodnutie urobené osamote ti môže pripadať neúplné, kým ho s niekým neprebereš, a rozhodnutie urobené spoločne zasa nie celkom tvoje.'),
    },
    structure: {
        a: v('In practice, this could mean drawing up a plan carefully and then changing it once it stops fitting.', 'V praxi to môže znamenať, že si plán starostlivo pripravíš a potom ho bez veľkej ľútosti zmeníš, keď prestane sedieť.'),
        b: v('In practice, this could mean starting before the plan is complete and adding structure only once the work needs it.', 'V praxi to môže znamenať, že začneš skôr, než je plán hotový, a štruktúru pridáš, až keď si ju práca vypýta.'),
        even: v('One way this can show up is a detailed plan for one part of a project and a completely open approach to the next.', 'Môže sa to prejaviť tak, že jednu časť projektu máš podrobne naplánovanú a k ďalšej pristupuješ úplne voľne.'),
    },
    risk: {
        a: v('For example, you might like a new plan in principle and slow right down once the cost or commitment is spelled out.', 'Napríklad ťa nový plán môže v princípe lákať, no keď sa ukáže konkrétna cena alebo záväzok, výrazne spomalíš.'),
        b: v('In practice, this could mean saying yes quickly and doing the careful thinking once the details arrive.', 'V praxi to môže znamenať, že rýchlo povieš áno a dôkladné premýšľanie príde až s detailmi.'),
        even: v('For example, the same risk can feel easy one week and out of the question the next, depending on what is at stake.', 'Napríklad ten istý druh rizika sa ti raz môže zdať ľahký a inokedy neprijateľný – podľa toho, čo je v stávke.'),
    },
    'emotional-expression': {
        a: v('You might notice this when a reaction shows on your face before you have decided what you think about it.', 'Môžeš si to všimnúť, keď sa reakcia ukáže na tvári skôr, než sa rozhodneš, čo si o nej myslíš.'),
        b: v('You might notice this when someone only learns much later how much a moment affected you.', 'Môžeš si to všimnúť, keď sa niekto až oveľa neskôr dozvie, ako veľmi ťa nejaká chvíľa zasiahla.'),
    },
    visibility: {
        a: v('For example, a quiet weekend on your own might restore you, while a long stretch without company slowly starts to wear on you.', 'Napríklad ťa tichý víkend osamote môže dobiť, no dlhšie obdobie bez spoločnosti ťa začne pomaly vyčerpávať.'),
        b: v('For example, you might enjoy a busy evening among people and still need the next morning to yourself.', 'Napríklad si môžeš užiť rušný večer medzi ľuďmi a aj tak potrebovať nasledujúce ráno len pre seba.'),
        even: v('One way this can show up is moving between seeking company and needing time entirely to yourself.', 'Môže sa to prejaviť tak, že striedavo vyhľadávaš spoločnosť a potrebuješ čas úplne len pre seba.'),
    },
    change: {
        a: v('In practice, this could mean keeping the same routine for years while quietly planning something new.', 'V praxi to môže znamenať, že roky dodržiavaš tú istú rutinu a popritom potichu plánuješ niečo nové.'),
        b: v('In practice, this could mean starting something new while making sure there is still something to come back to.', 'V praxi to môže znamenať, že začneš niečo nové a zároveň si strážiš, aby sa bolo kam vrátiť.'),
    },
    initiative: {
        a: v('For example, you might be the one to suggest a plan and then wait to see how the others respond.', 'Napríklad plán môžeš navrhnúť ty a potom počkať, ako zareagujú ostatní.'),
        b: v('For example, you might wait to see where a conversation is going and then, once it is clear, take the first step.', 'Napríklad môžeš počkať, kam sa rozhovor uberá, a keď je to jasné, urobiť prvý krok.'),
    },
};
/** One illustration for a split in the shape it has, or nothing. */
export const hypotheticalFor = (axis, shape) => say(HYPOTHETICALS[axis]?.[leaningOf(shape)]);
/** How every illustration opens, for the test that holds them to it. */
export const HYPOTHETICAL_OPENERS = [
    v('For example,', 'Napríklad'),
    v('You might notice this when', 'Môžeš si to všimnúť, keď'),
    v('One way this can show up is', 'Môže sa to prejaviť tak'),
    v('In practice, this could mean', 'V praxi to môže znamenať'),
    v('This can look like', 'Môže to vyzerať tak'),
];
/* ------------------------------------------------------------ coverage -- */
const isVoice = (value) => value !== undefined;
const voicesOf = (record) => Object.values(record ?? {}).filter(isVoice);
/**
 * Every phrase this file can produce, for the scans that have to see all of it
 * - gendered Slovak, comparisons with other people - rather than only the
 * phrases three QA profiles happen to select.
 */
export function everyVoiceLine() {
    const lines = [];
    for (const theme of Object.values(THEME_VOICE))
        lines.push(theme.lead, theme.turn, theme.tag);
    for (const parts of Object.values(PARTS))
        lines.push(parts.need, parts.act);
    for (const table of [CONTEXT_NEED, CONTEXT_ACT, CONTEXT_COST, GLOSS_CONTEXT]) {
        for (const variants of Object.values(table))
            lines.push(...voicesOf(variants));
    }
    lines.push(...voicesOf(FUSIONS), ...voicesOf(GLOSS_BESIDE), ...voicesOf(GIST));
    lines.push(...voicesOf(POLE_VOICE), ...voicesOf(POLE_SHORT));
    for (const shapes of Object.values(TENSION_VOICE))
        lines.push(...voicesOf(shapes));
    for (const shapes of Object.values(TENSION_CONTEXT)) {
        for (const context of Object.values(shapes)) {
            lines.push(...voicesOf(context?.byFamily), ...voicesOf(context?.beside));
        }
    }
    for (const balance of Object.values(BALANCE))
        lines.push(...voicesOf(balance));
    for (const area of Object.values(AREA_CLAUSES)) {
        for (const clause of Object.values(area)) {
            lines.push(clause.base, ...voicesOf(clause.byFamily), ...(clause.afterMethod ? [clause.afterMethod] : []));
        }
    }
    for (const leanings of Object.values(HYPOTHETICALS))
        lines.push(...voicesOf(leanings));
    return lines;
}
