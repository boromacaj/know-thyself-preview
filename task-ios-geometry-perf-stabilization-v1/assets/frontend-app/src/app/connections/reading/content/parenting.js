/*
 * PARENTING: AN ADULT AND A CHILD, READ THROUGH THE LENS OF FIT.
 *
 * The adult (parent or caregiver, any family shape) is the first role, the child the second. A child's style is a tendency still forming, never an identity, a prediction or a
 * finding about health; where the two styles rub, the reading points at what the ADULT can adapt. The neutral `opposed` and `oneSided` voices serve two children in one home
 * (siblings-in-household); `shared` voices serve any two people in the household. Research basis: docs/research/connections/corpus-parenting.json (its safetyBoundaries bind
 * every sentence here: no diagnosis, no fixed labels, no physical punishment or shaming, no sibling ranking, route worries to a paediatrician or psychologist).
 */
const ADULT_CHILD = ['parent-child', 'caregiver-child'];
const SIBLINGS = ['siblings-in-household'];
const FROM_TODDLER = ['toddler-1-3', 'preschool-3-5', 'early-school-6-8', 'middle-school-9-12', 'early-adolescence-13-15', 'late-adolescence-16-18'];
const FROM_PRESCHOOL = ['preschool-3-5', 'early-school-6-8', 'middle-school-9-12', 'early-adolescence-13-15', 'late-adolescence-16-18'];
const FROM_SCHOOL = ['early-school-6-8', 'middle-school-9-12', 'early-adolescence-13-15', 'late-adolescence-16-18'];
const YOUNG = ['toddler-1-3', 'preschool-3-5'];
/* Practices whose examples are a playground, a song for leaving the park or "five more slides" are for the early years; they are not offered for a teenager. */
const UP_TO_SCHOOL = ['toddler-1-3', 'preschool-3-5', 'early-school-6-8'];
const UP_TO_MIDDLE = ['toddler-1-3', 'preschool-3-5', 'early-school-6-8', 'middle-school-9-12'];
const CONTENT = {
    domain: 'parenting',
    axes: {
        /* ------------------------------------------------------------ inner-focus: processing-pace -- */
        'inner-focus': {
            label: { en: 'How each settles after an upset', sk: 'Ako sa každý upokojuje po rozrušení' },
            phrase: { en: 'how each settles after an upset', sk: 'to, ako sa každý upokojuje po rozrušení' },
            title: {
                shared: { en: 'The same way back to calm', sk: 'Rovnaká cesta späť k pokoju' },
                opposed: { en: 'One goes quiet, one needs to talk', sk: 'Jeden stíchne, druhý potrebuje hovoriť' },
                oneSided: { en: 'One turns inward, one meets either way', sk: 'Jeden sa obráti dovnútra, druhý zvládne oboje' },
            },
            scale: [{ en: 'Goes quiet first', sk: 'Najprv ticho' }, { en: 'Talks it out', sk: 'Vyrozpráva sa' }],
            poles: {
                introspective: {
                    one: { en: 'tends to go quiet after an upset and come back once the feeling has settled', sk: 'po rozrušení zvyčajne stíchne a vráti sa, až keď sa pocit usadí' },
                    many: { en: 'tend to go quiet after an upset and come back once the feeling has settled', sk: 'po rozrušení zvyčajne stíchnu a vrátia sa, až keď sa pocit usadí' },
                    gift: { en: 'What comes back after the quiet is usually clearer than anything that could have been said in the first rush.', sk: 'To, čo sa vráti po tichu, býva jasnejšie než čokoľvek, čo by zaznelo v prvej vlne.' },
                    cost: { en: 'To someone waiting outside the closed door, the silence can look like sulking or like being shut out.', sk: 'Pre toho, kto čaká za zatvorenými dverami, môže ticho vyzerať ako trucovanie alebo ako odmietnutie.' },
                    asks: { en: 'It asks for nearness without questions, and for the talk to wait until the body has calmed.', sk: 'Žiada si blízkosť bez otázok a rozhovor, ktorý počká, kým sa telo upokojí.' },
                },
                'outwardly-engaged': {
                    one: { en: 'tends to work an upset out loud, needing someone to hear it while it is still hot', sk: 'rozrušenie zvyčajne spracúva nahlas a potrebuje, aby to niekto počul, kým je to ešte horúce' },
                    many: { en: 'tend to work an upset out loud, needing someone to hear it while it is still hot', sk: 'rozrušenie zvyčajne spracúvajú nahlas a potrebujú, aby to niekto počul, kým je to ešte horúce' },
                    gift: { en: 'Little stays bottled up: the trouble is on the table quickly, and so is the relief.', sk: 'Máločo zostane zadusené: problém je rýchlo na stole a rovnako rýchlo príde aj úľava.' },
                    cost: { en: 'The torrent can arrive at the worst moment, at the school gate or at lights-out, and flood whoever is listening.', sk: 'Príval slov môže prísť v najhoršej chvíli, pred bránou školy alebo pri zhasínaní, a zaplaviť toho, kto práve počúva.' },
                    asks: { en: 'An ear before advice is the request, along with patience for the same story told twice.', sk: 'Prosí o ucho skôr než o radu a trpezlivosť s tým istým príbehom porozprávaným dvakrát.' },
                },
            },
            shared: {
                introspective: {
                    gain: { en: '{both} give each other room to cool down, so few things get said in a temper that later need taking back.', sk: '{both} si navzájom nechávajú priestor vychladnúť, takže v hneve zaznie málo vecí, ktoré treba neskôr vziať späť.' },
                    risk: { en: 'What can go missing is the return: two quiet people may each wait for the other to reopen a hurt, and it slips away unspoken.', sk: 'Chýbať môže návrat: dvaja tichší ľudia môžu čakať, kým bolestnú vec otvorí druhý človek, a tá sa napokon stratí nevyslovená.' },
                },
                'outwardly-engaged': {
                    gain: { en: '{both} say what is wrong while it is fresh, so an upset seldom goes underground for days.', sk: '{both} povedia, čo je zle, kým je to čerstvé, takže rozrušenie len zriedka zostane celé dni pod povrchom.' },
                    risk: { en: 'Two people talking it out at once can turn one upset into two, with nobody left free simply to listen.', sk: 'Keď to dvaja vyrozprávajú naraz, z jedného rozrušenia môžu byť dve a nikto nezostane voľný na obyčajné počúvanie.' },
                },
            },
            opposed: {
                gain: { en: '{p0} brings the thought-through version and {p1} the one said in the moment, so a squabble between the two can be heard from both sides.', sk: '{p0} prináša premyslenú verziu a {p1} tú vyslovenú hneď, takže hádku medzi súrodencami možno počuť z oboch strán.' },
                risk: { en: 'After a squabble {p1} wants it settled now while {p0} needs a closed door first, and the harder {p1} presses, the longer the quiet lasts.', sk: 'Po hádke chce {p1} všetko vyriešiť hneď, kým {p0} najprv potrebuje zatvorené dvere, a čím viac {p1} naliehá, tým dlhšie ticho trvá.' },
                bridge: { en: 'It helps when {p1} learns that the talk will come later, and {p0} learns to say roughly when.', sk: 'Pomáha, keď {p1} vie, že rozhovor príde neskôr, a {p0} sa naučí povedať, približne kedy.' },
            },
            oneSided: {
                introspective: { note: { en: '{lean} goes quiet after a squabble and {mid} can usually wait or talk, so quarrels between the two rarely turn into a chase.', sk: '{lean} po hádke stíchne a {mid} zvyčajne vie počkať aj sa rozprávať, takže sa ich spor len zriedka zmení na naháňačku.' } },
                'outwardly-engaged': { note: { en: '{lean} wants to talk a squabble out at once and {mid} can usually go along, so quarrels between the two tend to end quickly and out loud.', sk: '{lean} chce hádku hneď vyrozprávať a {mid} sa zvyčajne vie pridať, takže spory medzi súrodencami sa končia rýchlo a nahlas.' } },
            },
            swings: { en: '{who} settles differently from day to day, sometimes needing quiet and sometimes words, so asking works better than assuming.', sk: '{who} sa upokojuje zakaždým inak, raz potrebuje ticho, inokedy slová, preto sa oplatí skôr pýtať než predpokladať.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{second} wants to talk an upset out straight away, often at the least convenient moment, while {first} needs a quiet minute first; to the child, that pause can feel like being turned away.', sk: '{second} chce rozrušenie vyrozprávať hneď, často v najmenej vhodnej chvíli, zatiaľ čo {first} najprv potrebuje chvíľu ticha; dieťaťu sa táto pauza môže javiť ako odmietnutie.' },
                    gain: { en: 'Once that minute has been taken, {first} can offer something rare: a calm listener who is not swept away by the story.', sk: 'Keď si {first} tú chvíľu dopraje, môže dieťaťu ponúknuť niečo vzácne: pokojné ucho, ktoré príbeh nestrhne.' },
                    bridge: { en: '{first} offers a short, warm holding line (“tell me in two minutes, I want to hear all of it”), and the two minutes really do end in listening.', sk: '{first} rozhovor podrží krátkou, vľúdnou vetou („povedz mi to o dve minúty, chcem počuť všetko“) a tie dve minúty sa naozaj skončia počúvaním.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{first} wants to talk it through while it is fresh and {second} needs to go quiet first; questions at the door tend to keep the door shut for longer.', sk: '{first} chce vec prebrať, kým je čerstvá, a {second} najprv potrebuje stíchnuť; otázky pri dverách zvyčajne nechajú dvere zatvorené ešte dlhšie.' },
                    gain: { en: '{second} grows up with an adult who wants to hear what happened, and {first} receives the slower, truer version once it comes.', sk: '{second} vyrastá s dospelým, ktorý chce počuť, čo sa stalo, a {first} sa dočká pomalšej, pravdivejšej verzie, keď príde.' },
                    bridge: { en: 'The shift is from asking to staying near: {first} stays within reach and says the door is open, and {second} chooses the moment to come back.', sk: 'Zmena spočíva v tom, že otázky nahradí blízkosť: {first} zostane na dosah a povie, že dvere sú otvorené, a {second} si vyberie chvíľu, keď sa vráti.' },
                },
                oneSidedFirstLeans: {
                    introspective: { note: { en: '{first} tends to go quiet after a hard moment and {second} can meet either way, so the quiet reads as calm as long as it ends in coming back.', sk: '{first} po ťažkej chvíli zvyčajne stíchne a {second} zvláda oba spôsoby, takže dieťa ticho dospelého človeka prečíta ako pokoj, pokiaľ sa skončí návratom.' } },
                    'outwardly-engaged': { note: { en: '{first} talks hard moments out quickly and {second} can usually keep pace, though even a child in the middle appreciates being asked whether now is a good time.', sk: '{first} ťažké chvíle rýchlo vyrozpráva a {second} zvyčajne stačí tempu, no aj dieťa uprostred ocení otázku, či je teraz vhodná chvíľa.' } },
                },
                oneSidedSecondLeans: {
                    introspective: { note: { en: '{second} goes quiet to settle and {first} can flex either way, which leaves the adult well placed to wait nearby without pushing.', sk: '{second} sa upokojuje v tichu a {first} sa vie prispôsobiť oboma smermi, a tak je pre dospelého človeka ľahké čakať nablízku bez naliehania.' } },
                    'outwardly-engaged': { note: { en: '{second} needs to say an upset out loud and {first} can meet that tempo, so the most useful thing is simply to be the ear that is there when the words come.', sk: '{second} potrebuje rozrušenie povedať nahlas a {first} vie toto tempo prijať, takže najviac pomôže byť uchom, ktoré je po ruke, keď slová prídu.' } },
                },
            },
            child: {
                introspective: {
                    shows: { en: 'may go quiet or slip away after an upset, and come back to it later, once the feeling has settled', sk: 'sa po rozrušení môže utiahnuť do ticha alebo odísť bokom a k veci sa vrátiť neskôr, keď pocit opadne' },
                    needs: { en: 'Words tend to come after the quiet rather than before it, and pressing for them early can keep the door shut for longer.', sk: 'Slová zvyčajne prichádzajú až po tichu, nie skôr, a naliehanie priskoro môže nechať dvere zatvorené ešte dlhšie.' },
                    support: { en: 'Stay near without questioning, offer a calm activity side by side, and leave a clearly open door for later.', sk: 'Zostaň nablízku bez vypytovania, ponúkni pokojnú činnosť vedľa seba a nechaj jasne otvorené dvere na neskôr.' },
                },
                'outwardly-engaged': {
                    shows: { en: 'is likely to bring an upset straight to whoever is nearby and talk until it is all out, sometimes loudly and more than once', sk: 's rozrušením pravdepodobne hneď príde za tým, kto je práve nablízku, a hovorí, kým to celé nevyjde von, niekedy nahlas a aj viackrát' },
                    needs: { en: 'Someone who listens while the feeling is still hot may be just what calms the storm; an ear offered only later can make it bigger rather than smaller.', sk: 'Poslucháč vo chvíli, keď je pocit ešte horúci, môže byť práve to, čo búrku utíši; počúvanie odložené na neskôr môže búrku skôr zväčšiť než zmenšiť.' },
                    support: { en: 'Listen first and fix later: reflect back in a few words what has been heard before offering any solution.', sk: 'Najprv počúvaj, riešenia nechaj na neskôr: skôr než niečo navrhneš, zopakuj pár slovami, čo odznelo.' },
                },
            },
        },
        /* ------------------------------------------------------------ reasoning: reasoning-style -- */
        reasoning: {
            label: { en: 'How each makes sense of things', sk: 'Ako každý chápe veci' },
            phrase: { en: 'how each makes sense of an explanation', sk: 'to, ako každý chápe vysvetlenie' },
            title: {
                shared: { en: 'Speaking the same kind of sense', sk: 'Rovnaký spôsob chápania' },
                opposed: { en: 'Reasons for one, pictures for the other', sk: 'Jednému dôvody, druhému obrazy' },
                oneSided: { en: 'One reasons it out, one takes either road', sk: 'Jeden to rozoberá, druhý zvládne oboje' },
            },
            scale: [{ en: 'Wants the reason', sk: 'Chce poznať dôvod' }, { en: 'Goes by feel', sk: 'Riadi sa pocitom' }],
            poles: {
                analytical: {
                    one: { en: 'tends to want the reason behind a rule and to test it, often with a long string of whys', sk: 'zvyčajne chce poznať dôvod pravidla a preveriť, či naozaj platí, často celou sériou otázok „prečo“' },
                    many: { en: 'tend to want the reason behind a rule and to test it, often with a long string of whys', sk: 'zvyčajne chcú poznať dôvod pravidla a preveriť, či naozaj platí, často celou sériou otázok „prečo“' },
                    gift: { en: 'A rule that has been understood tends to be kept without anyone standing guard over it.', sk: 'Pravidlo, ktoré dáva zmysel, sa zvyčajne dodržiava aj bez dozoru.' },
                    cost: { en: 'The questions can sound like arguing back, and a tired adult can hear cheek where there is real curiosity.', sk: 'Otázky môžu znieť ako odvrávanie a unavený dospelý človek môže počuť drzosť tam, kde je skutočná zvedavosť.' },
                    asks: { en: 'It asks for one honest reason, briefly given, and the patience to let a fair question be asked.', sk: 'Žiada si jeden úprimný dôvod, povedaný stručne, a trpezlivosť nechať zaznieť férovú otázku.' },
                },
                intuitive: {
                    one: { en: 'tends to take things in through feeling and pictures, catching the mood of a request before its words', sk: 'veci zvyčajne vníma cez pocity a obrazy a naladenie žiadosti zachytí skôr než samotné slová' },
                    many: { en: 'tend to take things in through feeling and pictures, catching the mood of a request before its words', sk: 'veci zvyčajne vnímajú cez pocity a obrazy a naladenie žiadosti zachytia skôr než samotné slová' },
                    gift: { en: 'Tone and atmosphere are read quickly, so a warm request often lands before it is even finished.', sk: 'Tón a atmosféra sa čítajú rýchlo, takže vľúdna prosba často zaberie ešte pred posledným slovom.' },
                    cost: { en: 'A long explanation can wash straight past, while a sharp tone can stick far longer than the point it carried.', sk: 'Dlhé vysvetľovanie môže prejsť mimo, zatiaľ čo ostrý tón zostane v pamäti oveľa dlhšie než samotná myšlienka.' },
                    asks: { en: 'Fewer words help here, and a picture, a story or a demonstration that shows what is meant.', sk: 'Pomáha menej slov a namiesto nich obraz, príbeh alebo ukážku toho, čo sa myslí.' },
                },
            },
            shared: {
                analytical: {
                    gain: { en: '{both} like things to make sense, so a reason given plainly settles more than a raised voice would.', sk: '{both} chcú, aby veci dávali zmysel, takže jasne povedaný dôvod upokojí viac než zvýšený hlas.' },
                    risk: { en: 'Debates can run long: two people who care a great deal about being right can argue about bedtime until bedtime has passed.', sk: 'Debaty sa môžu naťahovať: dvaja ľudia, ktorým veľmi záleží na tom, kto má pravdu, dokážu o čase spánku diskutovať, až kým ten čas neprejde.' },
                },
                intuitive: {
                    gain: { en: '{both} read each other’s mood quickly, so a look or a hand on a shoulder often does the work of a speech.', sk: '{both} si navzájom rýchlo čítajú náladu, takže pohľad alebo ruka na pleci často urobí viac než dlhá reč.' },
                    risk: { en: 'What is sensed may go unspoken; two people who go by feel can assume they understand each other and skip the words that would check.', sk: 'Čo sa vycíti, môže zostať nevyslovené; dvaja ľudia, ktorí sa riadia pocitom, môžu predpokladať, že si rozumejú, a vynechať slová, ktoré by to overili.' },
                },
            },
            opposed: {
                gain: { en: '{p0} wants the rules of a game spelled out and {p1} plays by the feel of it, and together the two can make a game that is both fair and fun.', sk: '{p0} chce mať pravidlá hry presne vysvetlené a {p1} hrá podľa citu, takže spolu môžu vytvoriť hru, ktorá je férová aj zábavná.' },
                risk: { en: 'Arguments tend to miss each other: {p0} cites the rule, {p1} answers with how it felt, and each side finds the other unreasonable.', sk: 'Hádky sa zvyknú míňať: {p0} sa odvoláva na pravidlo, {p1} odpovedá tým, ako sa cíti, a každá strana považuje tú druhú za nerozumnú.' },
                bridge: { en: 'It helps when an adult names both halves (“so the rule says this, and it also felt unfair”) and {p0} and {p1} look for a version that holds both.', sk: 'Pomáha, keď dospelý človek pomenuje oboje („pravidlo hovorí toto a zároveň to bolo nefér“) a {p0} a {p1} hľadajú riešenie, ktoré unesie oboje.' },
            },
            oneSided: {
                analytical: { note: { en: '{lean} asks the whys and {mid} is easy either way, so a home that gives short reasons tends to suit both children.', sk: '{lean} sa pýta prečo a {mid} to zvládne s vysvetlením aj bez vysvetlenia, takže domácnosť, ktorá dáva krátke dôvody, zvyčajne vyhovuje obom deťom.' } },
                intuitive: { note: { en: '{lean} goes by feel and {mid} can meet a reason or a mood, so at home the tone tends to matter more than the exact words.', sk: '{lean} sa riadi pocitom a {mid} prijme dôvod aj náladu, preto doma zvyčajne viac záleží na tóne než na presných slovách.' } },
            },
            swings: { en: '{who} asks for reasons on some days and goes by feel on others, so it is worth checking which is needed now.', sk: '{who} raz chce dôvody a inokedy ide podľa pocitu, preto sa oplatí overiť, čo je práve potrebné.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{first} explains, sometimes at length, and {second} reads the tone more than the reasons, so a careful argument can land as a scolding.', sk: '{first} vysvetľuje, niekedy dlho, a {second} číta viac tón než dôvody, takže starostlivo poskladaný argument môže doľahnúť ako hromženie.' },
                    gain: { en: 'The child grows up in a world where rules have reasons, and {first} gets a daily lesson in how much a warm tone can carry.', sk: 'Dieťa vyrastá vo svete, v ktorom majú pravidlá dôvody, a {first} dostáva každodennú lekciu o tom, koľko unesie vľúdny tón.' },
                    bridge: { en: '{first} gives one kind sentence of reason and then shows rather than tells, which tends to reach a child who goes by feel better than the full case.', sk: '{first} povie jednu vľúdnu vetu s dôvodom a potom radšej ukazuje, než vysvetľuje, čo dieťa, ktoré sa riadi pocitom, zvyčajne osloví lepšie než celá obhajoba.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{second} wants the reason and {first} answers with “because that is how it is” or with a feeling; the child hears no reason at all and keeps asking.', sk: '{second} chce poznať dôvod a {first} odpovedá „pretože je to tak“ alebo pocitom; dieťa nepočuje žiadny dôvod, a tak sa pýta ďalej.' },
                    gain: { en: '{second} brings a taste for clear thinking into the relationship, and {first} brings a sense for the mood of a moment that no rule can teach.', sk: '{second} prináša do vzťahu chuť po jasnom uvažovaní a {first} cit pre náladu chvíle, ktorý žiadne pravidlo nenaučí.' },
                    bridge: { en: 'It helps when {first} turns the feeling into one plain reason (“we leave now because tomorrow starts early”) and treats the questions as curiosity, not cheek.', sk: 'Pomáha, keď {first} premení pocit na jeden jednoduchý dôvod („odchádzame, lebo zajtra skoro vstávame“) a otázky berie ako zvedavosť, nie ako drzosť.' },
                },
                oneSidedFirstLeans: {
                    analytical: { note: { en: '{first} reaches for reasons and {second} takes things in either way, so explanations work well as long as each one stays short.', sk: '{first} siaha po dôvodoch a {second} prijíma veci oboma spôsobmi, takže vysvetlenia fungujú, pokiaľ zostanú krátke.' } },
                    intuitive: { note: { en: '{first} leads by feel and {second} can follow a mood or a reason, so a reason spoken aloud now and then helps the child see what the feeling was about.', sk: '{first} vedie podľa citu a {second} vie nasledovať náladu aj dôvod, takže občas nahlas vyslovený dôvod pomôže dieťaťu pochopiť, o čo išlo.' } },
                },
                oneSidedSecondLeans: {
                    analytical: { note: { en: '{second} wants the whys and {first} can explain or skip the explaining, so the child is best met with a short, honest reason and room for one more question.', sk: '{second} chce vedieť prečo a {first} vie dôvody dať aj vynechať, takže dieťaťu najlepšie poslúži krátky, úprimný dôvod a priestor na ešte jednu otázku.' } },
                    intuitive: { note: { en: '{second} takes things in by feel and {first} can meet that, so a tone, a gesture or a shared story tends to do more than a careful argument.', sk: '{second} vníma veci pocitom a {first} to vie prijať, takže tón, gesto alebo spoločný príbeh zvyčajne urobí viac než starostlivý argument.' } },
                },
            },
            child: {
                analytical: {
                    shows: { en: 'often asks why and tests whether a rule really holds, and may accept a limit more readily once it makes sense', sk: 'sa často pýta „prečo“, skúša, či pravidlo naozaj platí, a hranicu môže prijať ochotnejšie, keď dáva zmysel' },
                    needs: { en: 'A reason can feel like respect: a limit that has been explained may be kept from the inside rather than from fear of the consequence.', sk: 'Dôvod môže pôsobiť ako prejav rešpektu: vysvetlená hranica sa môže dodržiavať skôr z vnútorného presvedčenia než zo strachu z následkov.' },
                    support: { en: 'Give one honest reason in a sentence, welcome a fair question, and say plainly when a rule is not up for debate.', sk: 'Daj jeden úprimný dôvod v jednej vete, privítaj férovú otázku a jasne povedz, keď pravidlo nie je na diskusiu.' },
                },
                intuitive: {
                    shows: { en: 'seems to respond to the tone and mood of a request more than to its words, and to remember how something felt', sk: 'zrejme vníma skôr tón a náladu žiadosti než samotné slová a pamätá si najmä to, aký pocit niečo zanechalo' },
                    needs: { en: 'A warm tone and something to see or do may carry a message further than a long explanation.', sk: 'Vľúdny tón a niečo, čo sa dá vidieť alebo urobiť, môžu odkaz preniesť ďalej než dlhé vysvetľovanie.' },
                    support: { en: 'Keep words few, show rather than tell, and reach for a story, a picture or a demonstration for anything that matters.', sk: 'Hovor málo, radšej ukazuj, a pri dôležitých veciach siahni po príbehu, obrázku alebo ukážke.' },
                },
            },
        },
        /* ------------------------------------------------------------ autonomy: closeness-and-room -- */
        autonomy: {
            label: { en: 'On one’s own or together', sk: 'Samostatne, alebo spolu' },
            phrase: { en: 'how much each wants to do things alone or together', sk: 'to, nakoľko chce každý robiť veci samostatne alebo spolu' },
            title: {
                shared: { en: 'The same measure of closeness', sk: 'Rovnaká miera blízkosti' },
                opposed: { en: 'One wants room, one wants company', sk: 'Jeden chce priestor, druhý spoločnosť' },
                oneSided: { en: 'One sets the distance, one adjusts', sk: 'Jeden určuje odstup, druhý sa prispôsobí' },
            },
            scale: [{ en: 'On my own', sk: 'Samostatne' }, { en: 'Together', sk: 'Spolu' }],
            poles: {
                independent: {
                    one: { en: 'tends to want to do it without help, even slowly, even if it goes wrong the first time', sk: 'zvyčajne chce veci robiť bez pomoci, aj pomaly, aj keď to napoprvé nevyjde' },
                    many: { en: 'tend to want to do it without help, even slowly, even if it goes wrong the first time', sk: 'zvyčajne chcú veci robiť bez pomoci, aj pomaly, aj keď to napoprvé nevyjde' },
                    gift: { en: 'Competence grows early and stubbornly, and with it the pride of having managed.', sk: 'Zručnosť rastie skoro a vytrvalo a spolu so zručnosťou aj hrdosť, že sa to podarilo.' },
                    cost: { en: 'Help offered too fast can feel like being overruled, and a refused hand can look like a rejection of the helper.', sk: 'Pomoc ponúknutá príliš rýchlo môže pôsobiť ako prehlasovanie a odmietnutá ruka môže vyzerať ako odmietnutie toho, kto pomáha.' },
                    asks: { en: 'What it needs is patience at the shoelace, and help that waits to be asked.', sk: 'Žiada si trpezlivosť pri šnúrkach a pomoc, ktorá počká, kým o ňu niekto požiada.' },
                },
                collaborative: {
                    one: { en: 'tends to want company in whatever is being done, and works best with someone alongside', sk: 'zvyčajne chce mať pri tom, čo robí, niekoho nablízku a najlepšie to ide s niekým po boku' },
                    many: { en: 'tend to want company in whatever is being done, and work best with someone alongside', sk: 'zvyčajne chcú mať pri tom, čo robia, niekoho nablízku a najlepšie to ide s niekým po boku' },
                    gift: { en: 'Shared doing becomes a natural place for talk, warmth and learning by watching.', sk: 'Spoločná činnosť sa stáva prirodzeným miestom na rozhovor, blízkosť a učenie sa pozorovaním.' },
                    cost: { en: 'A request to manage alone can feel like being sent away, and a busy adult can feel there is no moment off duty.', sk: 'Žiadosť zvládnuť niečo samostatne môže pôsobiť ako odohnanie a zaneprázdnený dospelý človek môže mať pocit, že nemá ani chvíľu voľna.' },
                    asks: { en: 'Company comes first, and distance after it in small, announced steps.', sk: 'Najprv spoločnosť, odstup až potom, po malých, ohlásených krokoch.' },
                },
            },
            shared: {
                independent: {
                    gain: { en: '{both} leave each other room to try, so mistakes get made and mended without much fuss.', sk: '{both} si navzájom nechávajú priestor skúšať, takže chyby sa robia aj napravujú bez veľkého rozruchu.' },
                    risk: { en: 'Two people who prefer to manage alone can drift into parallel lives under one roof, and a need for help can go unnoticed for a while.', sk: 'Dvaja ľudia, ktorí radšej všetko zvládajú samostatne, sa môžu pod jednou strechou rozísť do paralelných životov a potreba pomoci môže chvíľu zostať nepovšimnutá.' },
                },
                collaborative: {
                    gain: { en: '{both} like doing things side by side, so ordinary jobs, from cooking to homework, double as time together.', sk: '{both} robia veci najradšej bok po boku, takže bežné povinnosti, od varenia po úlohy, sú zároveň spoločným časom.' },
                    risk: { en: 'Room to manage alone can come late: when company is the easy answer every time, small solo steps may quietly be skipped.', sk: 'Priestor zvládnuť niečo samostatne môže prísť neskoro: keď je spoločnosť zakaždým najľahšou odpoveďou, malé samostatné kroky sa môžu potichu vynechať.' },
                },
            },
            opposed: {
                gain: { en: '{p0} shows what managing alone looks like and {p1} shows how much more fun it is together, and each child can borrow a little of the other way.', sk: '{p0} ukazuje, ako vyzerá zvládnuť niečo samostatne, a {p1}, o koľko je to zábavnejšie spolu, a každé dieťa si môže z druhého prístupu kúsok požičať.' },
                risk: { en: '{p1} keeps inviting and {p0} keeps closing the bedroom door, until the invitations start to feel pushy and the closed door starts to feel like a snub.', sk: '{p1} stále pozýva a {p0} stále zatvára dvere izby, až pozvania začnú pôsobiť dotieravo a zatvorené dvere ako odmietnutie.' },
                bridge: { en: 'With set times for playing together and set times when a door may stay shut, {p1} can count on company and {p0} can count on room.', sk: 'Keď sú dané časy na spoločnú hru aj časy, keď môžu dvere zostať zatvorené, {p1} sa môže spoľahnúť na spoločnosť a {p0} na priestor.' },
            },
            oneSided: {
                independent: { note: { en: '{lean} wants to manage alone and {mid} is fine either way, so the two can play together or apart without much negotiation.', sk: '{lean} chce veci zvládať samostatne a {mid} zvládne oboje, takže súrodenci sa vedia hrať spolu aj oddelene bez veľkého vyjednávania.' } },
                collaborative: { note: { en: '{lean} looks for company and {mid} can join in or play alone, so the wish to do things together usually finds a partner.', sk: '{lean} hľadá spoločnosť a {mid} sa vie pridať aj zabaviť samostatne, takže túžba po spoločnej hre zvyčajne nájde odozvu.' } },
            },
            swings: { en: '{who} swings between wanting company and wanting to be left alone, sometimes within an hour, so the signal is worth reading afresh.', sk: '{who} kolíše medzi túžbou po spoločnosti a túžbou ostať osamote, niekedy v priebehu hodiny, preto sa oplatí signál čítať zakaždým nanovo.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{second} wants an adult alongside for the task and {first} expects it done alone; the child can hear “you can manage” as “go away”.', sk: '{second} chce mať pri úlohe dospelého človeka nablízku a {first} očakáva samostatnosť; dieťa môže vo vete „to zvládneš“ počuť „choď preč“.' },
                    gain: { en: 'The child has a standing invitation to try alone, and {first} is reminded daily that company is itself a kind of help.', sk: 'Dieťa má stále pozvanie skúsiť to samostatne a {first} dostáva každodennú pripomienku, že aj spoločnosť je druh pomoci.' },
                    bridge: { en: '{first} starts beside the child and steps back gradually: the first part together, then from the next room, then an occasional look in.', sk: '{first} začne pri dieťati a ustupuje postupne: prvú časť spolu, potom z vedľajšej miestnosti, potom už len občasné nazretie.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{first} offers help and company and {second} wants to manage alone; the offer can feel like doubt, and the refusal like a door being shut.', sk: '{first} ponúka pomoc a spoločnosť a {second} chce veci zvládnuť samostatne; ponuka môže pôsobiť ako nedôvera a odmietnutie ako zatvorené dvere.' },
                    gain: { en: '{second} gets to grow competent early, and {first} provides a safety net that is there when an attempt fails.', sk: '{second} môže skoro rásť v zručnosti a {first} poskytuje záchrannú sieť, ktorá je po ruke, keď pokus nevyjde.' },
                    bridge: { en: 'The shift is from helping to being available: {first} lets the attempt run, stays in earshot, and steps in when asked or when safety needs it.', sk: 'Zmena spočíva v prechode od pomáhania k dostupnosti: {first} dá priestor na pokus, zostane nablízku a zasiahne na požiadanie alebo vtedy, keď ide o bezpečnosť.' },
                },
                oneSidedFirstLeans: {
                    independent: { note: { en: '{first} tends to leave plenty of room and {second} can manage alone or with company, so the main thing is making sure that asking for help is easy.', sk: '{first} zvyčajne necháva veľa priestoru a {second} si poradí samostatne aj so spoločnosťou, takže hlavné je, aby sa o pomoc dalo ľahko požiadať.' } },
                    collaborative: { note: { en: '{first} prefers doing things together and {second} can join in or go solo, so shared doing works best when the child also gets turns at managing alone.', sk: '{first} najradšej robí veci spolu a {second} sa vie pridať aj ísť vlastnou cestou, takže spoločná činnosť funguje najlepšie, keď má dieťa aj príležitosti zvládnuť niečo samostatne.' } },
                },
                oneSidedSecondLeans: {
                    independent: { note: { en: '{second} wants to do it without help and {first} can adjust, so the most useful stance is interested distance: watching, not taking over.', sk: '{second} chce veci robiť bez pomoci a {first} sa vie prispôsobiť, takže najviac pomôže záujem z odstupu: pozorovať, nie preberať.' } },
                    collaborative: { note: { en: '{second} looks for company in what is being done and {first} can join in, so time alongside is an easy gift, with small solo steps added over time.', sk: '{second} hľadá pri činnosti spoločnosť a {first} sa vie pridať, takže čas vedľa seba je ľahký dar a malé samostatné kroky môžu pribúdať postupne.' } },
                },
            },
            child: {
                independent: {
                    shows: { en: 'can insist on doing things without help, and may push away a hand that arrives too soon', sk: 'niekedy trvá na tom, že veci urobí bez pomoci, a ruku, ktorá príde priskoro, môže odstrčiť' },
                    needs: { en: 'Room to try, get it wrong and try again may be what lets confidence grow, and help that waits to be asked can keep the wish to try alive.', sk: 'Priestor skúsiť, pomýliť sa a skúsiť znova môže byť to, z čoho rastie sebadôvera, a pomoc, ktorá počká, kým o ňu niekto požiada, môže udržať chuť skúšať.' },
                    support: { en: 'Allow extra time for doing it alone, stay available rather than taking over, and keep safety as the one reason to step in uninvited.', sk: 'Nechaj viac času na samostatné pokusy, buď poruke namiesto preberania a jediným dôvodom zasiahnuť bez požiadania nech je bezpečnosť.' },
                },
                collaborative: {
                    shows: { en: 'tends to want someone alongside, whether for a job around the house, a new plan or a hard moment', sk: 'zvyčajne chce mať niekoho po boku, či už pri práci v domácnosti, pri novom pláne alebo v ťažkej chvíli' },
                    needs: { en: 'With someone close by, new things can feel possible, and independence may grow out of that closeness rather than against it.', sk: 'S niekým nablízku sa nové veci môžu zdať zvládnuteľné a samostatnosť môže vyrastať práve z tejto blízkosti.' },
                    support: { en: 'Start alongside and step back in small, announced stages, so that independence feels like a step the child chooses.', sk: 'Začni po boku a ustupuj po malých, ohlásených krokoch, aby samostatnosť pôsobila ako krok, ktorý si dieťa vyberá samo.' },
                },
            },
        },
        /* ------------------------------------------------------------ structure: structure-and-flexibility -- */
        structure: {
            label: { en: 'Routines and rules', sk: 'Rutiny a pravidlá' },
            phrase: { en: 'how much each leans on routine and rules', sk: 'to, nakoľko sa každý opiera o rutinu a pravidlá' },
            title: {
                shared: { en: 'The same feel for order', sk: 'Rovnaký zmysel pre poriadok' },
                opposed: { en: 'The plan meets improvisation', sk: 'Plán sa stretáva s improvizáciou' },
                oneSided: { en: 'One holds the routine, one bends', sk: 'Jeden drží rutinu, druhý sa ohne' },
            },
            scale: [{ en: 'Likes a set routine', sk: 'Pevný denný poriadok' }, { en: 'Goes with the moment', sk: 'Voľnosť chvíle' }],
            poles: {
                structured: {
                    one: { en: 'tends to like knowing the plan, keeping to the usual order and having rules that stay put', sk: 'zvyčajne chce poznať plán, držať sa zaužívaného poradia a mať pravidlá, ktoré platia' },
                    many: { en: 'tend to like knowing the plan, keeping to the usual order and having rules that stay put', sk: 'zvyčajne chcú poznať plán, držať sa zaužívaného poradia a mať pravidlá, ktoré platia' },
                    gift: { en: 'Days run smoothly, promises are remembered, and the predictable frame leaves energy free for everything else.', sk: 'Dni plynú hladko, sľuby sa pamätajú a predvídateľný rámec nechá energiu na všetko ostatné.' },
                    cost: { en: 'A broken routine can feel like a small catastrophe, and an exception granted once can be held up as the new rule.', sk: 'Narušená rutina môže pôsobiť ako malá katastrofa a výnimka povolená raz sa môže začať brať ako nové pravidlo.' },
                    asks: { en: 'It asks for rules that hold from one day to the next, and for warning when a rule has to bend.', sk: 'Žiada si pravidlá, ktoré platia zo dňa na deň, a upozornenie, keď to nejde.' },
                },
                adaptable: {
                    one: { en: 'tends to go with the moment, finding routines tight and inventing a new way through most days', sk: 'zvyčajne ide s chvíľou, v rutine sa cíti stiesnene a takmer každý deň si nájde novú cestu' },
                    many: { en: 'tend to go with the moment, finding routines tight and inventing a new way through most days', sk: 'zvyčajne idú s chvíľou, v rutine sa cítia stiesnene a takmer každý deň si nájdu novú cestu' },
                    gift: { en: 'Plans that fall apart are taken in stride, and an ordinary afternoon can turn into an adventure.', sk: 'Rozpadnutý plán sa prijme s ľahkosťou a z obyčajného popoludnia môže byť dobrodružstvo.' },
                    cost: { en: 'Shoes, homework and bedtime can become a daily renegotiation that wears out whoever is keeping track.', sk: 'Topánky, úlohy a čas spánku sa môžu stať každodenným vyjednávaním, ktoré vyčerpá toho, kto to všetko stráži.' },
                    asks: { en: 'What suits it is a few firm anchors rather than a full timetable, and for room to choose the way between those anchors.', sk: 'Žiada si niekoľko pevných bodov namiesto celého rozvrhu a priestor zvoliť si cestu medzi nimi.' },
                },
            },
            shared: {
                structured: {
                    gain: { en: '{both} find comfort in a rhythm, so mornings and evenings tend to run on rails that nobody has to fight for.', sk: '{both} nachádzajú pokoj v rytme, takže rána a večery zvyčajne bežia po koľajach, o ktoré netreba bojovať.' },
                    risk: { en: 'When the plan breaks, through illness, travel or a late bus, two people who need the plan can unsettle each other quickly.', sk: 'Keď sa plán rozpadne pre chorobu, cestu alebo meškajúci autobus, dvaja ľudia, ktorí plán potrebujú, sa môžu navzájom rýchlo rozladiť.' },
                },
                adaptable: {
                    gain: { en: '{both} roll with the day, so a cancelled outing or a sudden change of plan seldom becomes a crisis.', sk: '{both} berú deň tak, ako príde, takže zrušený výlet alebo náhla zmena plánu sa len zriedka zmení na krízu.' },
                    risk: { en: 'With nobody holding the rhythm, sleep, meals and homework can drift until tiredness does the deciding.', sk: 'Keď rytmus nikto nedrží, spánok, jedlo a úlohy sa môžu posúvať, až kým nerozhodne únava.' },
                },
            },
            opposed: {
                gain: { en: '{p0} keeps track of how things are done and {p1} keeps inventing new ways, and a shared game or a shared room can gain from both.', sk: '{p0} stráži, ako sa veci robia, a {p1} stále vymýšľa nové spôsoby, takže spoločná hra či izba môže ťažiť z oboch prístupov.' },
                risk: { en: '{p0} needs the rules of a game or the order of a shared room to stay put and {p1} changes them midway, so one side cries foul and the other feels policed.', sk: '{p0} potrebuje, aby pravidlá hry či poriadok v spoločnej izbe platili, a {p1} ich mení za pochodu, takže jedna strana kričí, že je to podvod, a druhá sa cíti strážená.' },
                bridge: { en: 'When the few fixed rules are agreed before a game starts and the open ones are named, {p0} can relax and {p1} can still invent.', sk: 'Keď sa pred hrou dohodne pár pevných pravidiel a pomenujú sa tie, ktoré sa môžu meniť, {p0} si môže vydýchnuť a {p1} môže ďalej vymýšľať.' },
            },
            oneSided: {
                structured: { note: { en: '{lean} keeps to the usual order and {mid} can live with it or without it, so shared routines tend to settle without much friction.', sk: '{lean} sa drží zaužívaného poriadku a {mid} sa mu vie prispôsobiť, takže spoločné rutiny sa zvyčajne ustália bez väčšieho trenia.' } },
                adaptable: { note: { en: '{lean} goes with the moment and {mid} can keep a plan or drop it, so the two usually find a way around changes together.', sk: '{lean} ide s chvíľou a {mid} vie plán dodržať aj opustiť, takže súrodenci zvyčajne zvládajú zmeny spoločne.' } },
            },
            swings: { en: '{who} craves routine on some days and resists it on others, often depending on tiredness, so a fixed rule about rules may not fit.', sk: '{who} raz túži po rutine a inokedy sa proti rutine búri, často podľa únavy, preto pevné pravidlo o pravidlách nemusí sedieť.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{first} runs the day on a plan and {second} drifts away from it; reminders multiply, the child hears only nagging, and the adult feels unheard.', sk: '{first} vedie deň podľa plánu a {second} sa od plánu vzďaľuje; pripomienok pribúda, dieťa počuje len napomínanie a dospelý človek má pocit, že hovorí do vetra.' },
                    gain: { en: 'The child gets a frame that makes the day easier to manage, and {first} gets a daily reminder that not everything needs a plan.', sk: 'Dieťa dostáva rámec, ktorý pomáha zvládnuť deň, a {first} každodennú pripomienku, že nie všetko potrebuje plán.' },
                    bridge: { en: '{first} keeps a few anchors fixed, such as meals, sleep and safety, and {second} gets to choose the order and the how of the rest.', sk: '{first} drží pevne niekoľko bodov, napríklad jedlo, spánok a bezpečnosť, a {second} si pri zvyšku volí poradie aj spôsob.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{second} needs to know what comes next and {first} decides on the go, so a plan changed at the last minute can unsettle the child for the rest of the day.', sk: '{second} potrebuje vedieť, čo príde, a {first} sa rozhoduje za pochodu, takže plán zmenený na poslednú chvíľu môže dieťa rozhodiť na celý zvyšok dňa.' },
                    gain: { en: '{second} gives the household a reason to build a few dependable habits, and {first} shows the child that a change of plan can be survived and even enjoyed.', sk: '{second} dáva domácnosti dôvod vybudovať pár spoľahlivých zvykov a {first} ukazuje dieťaťu, že zmena plánu sa dá prežiť a dokonca aj užiť.' },
                    bridge: { en: 'Small advance notice does most of the work: {first} says what the afternoon holds and gives a warning before anything shifts.', sk: 'Väčšinu práce urobí malé upozornenie vopred: {first} povie, čo popoludnie prinesie, a dá vedieť skôr, než sa niečo zmení.' },
                },
                oneSidedFirstLeans: {
                    structured: { note: { en: '{first} keeps the routine and {second} can adapt to it, so the frame helps as long as there is a little room inside it for the child’s own choices.', sk: '{first} drží rutinu a {second} sa vie prispôsobiť, takže rámec pomáha, pokiaľ v ňom zostane trochu miesta na vlastné voľby dieťaťa.' } },
                    adaptable: { note: { en: '{first} improvises and {second} can manage either way, though a few predictable points in the week give the child something to lean on.', sk: '{first} improvizuje a {second} zvládne oboje, no zopár predvídateľných bodov v týždni dá dieťaťu oporu.' } },
                },
                oneSidedSecondLeans: {
                    structured: { note: { en: '{second} relies on routine and {first} can adjust, so keeping the usual order and announcing changes is a simple and generous gift.', sk: '{second} sa opiera o rutinu a {first} sa vie prispôsobiť, takže zachovať zaužívané poradie a ohlasovať zmeny je jednoduchý a veľkorysý dar.' } },
                    adaptable: { note: { en: '{second} pushes against tight routines and {first} can bend, so a light frame with real choices inside tends to work better than a full timetable.', sk: '{second} sa búri proti tesným rutinám a {first} vie povoliť, takže ľahký rámec so skutočnými voľbami zvyčajne funguje lepšie než celý rozvrh.' } },
                },
            },
            child: {
                structured: {
                    shows: { en: 'may want the same order each day, notice when a rule is broken, and be unsettled when a plan changes', sk: 'môže chcieť každý deň rovnaké poradie, všíma si, keď niekto poruší pravidlo, a zmenu plánu môže niesť ťažko' },
                    needs: { en: 'Knowing what comes next can feel like safety, and may free attention for everything else.', sk: 'Vedieť, čo príde, môže pôsobiť ako bezpečie a uvoľniť pozornosť pre všetko ostatné.' },
                    support: { en: 'Keep a steady daily order, say the plan out loud, and give advance warning when something has to change.', sk: 'Drž stály denný poriadok, hovor plán nahlas a vopred upozorni, keď sa niečo musí zmeniť.' },
                },
                adaptable: {
                    shows: { en: 'tends to resist fixed routines, find a new way through each day, and let slip a rule that seemed settled', sk: 'sa zvyčajne bráni pevným rutinám, každý deň si nájde novú cestu a pravidlo, ktoré sa zdalo dohodnuté, ľahko pustí z hlavy' },
                    needs: { en: 'A few firm points may be kept more willingly than a full timetable, with room to choose the way between them.', sk: 'Zopár pevných bodov sa môže dodržiavať ochotnejšie než celý rozvrh, ak medzi nimi zostane priestor zvoliť si vlastnú cestu.' },
                    support: { en: 'Choose the few rules that truly matter, keep those calmly consistent, and offer real choices about everything else.', sk: 'Vyber si zopár pravidiel, na ktorých naozaj záleží, tie drž pokojne a dôsledne a pri všetkom ostatnom ponúkni skutočné voľby.' },
                },
            },
        },
        /* ------------------------------------------------------------ risk: risk-and-caution -- */
        risk: {
            label: { en: 'Caution and daring', sk: 'Opatrnosť a odvaha' },
            phrase: { en: 'how each meets what is new and risky', sk: 'to, ako každý pristupuje k novému a riskantnému' },
            title: {
                shared: { en: 'The same nerve', sk: 'Rovnaká miera odvahy' },
                opposed: { en: 'One watches, one jumps', sk: 'Jeden pozoruje, druhý skočí' },
                oneSided: { en: 'One sets the pace of daring', sk: 'Jeden určuje tempo odvahy' },
            },
            scale: [{ en: 'Watches first', sk: 'Najprv pozoruje' }, { en: 'Jumps in', sk: 'Skočí do toho' }],
            poles: {
                cautious: {
                    one: { en: 'tends to watch from the edge first and join in once the new thing feels safe', sk: 'zvyčajne najprv pozoruje z okraja a zapojí sa, až keď nová vec pôsobí bezpečne' },
                    many: { en: 'tend to watch from the edge first and join in once the new thing feels safe', sk: 'zvyčajne najprv pozorujú z okraja a zapoja sa, až keď nová vec pôsobí bezpečne' },
                    gift: { en: 'Looking before leaping spares a good many bumps, and what is finally tried is usually tried wholeheartedly.', sk: 'Pozrieť sa skôr, než sa skočí, ušetrí veľa úrazov a to, do čoho sa napokon ide, sa robí naplno.' },
                    cost: { en: 'The waiting can be mistaken for unwillingness, and hurrying it along usually makes it longer.', sk: 'Čakanie si niekto môže pomýliť s neochotou a súrenie čakanie zvyčajne len predĺži.' },
                    asks: { en: 'It asks for time on the edge, small steps, and an adult who neither pushes nor rescues.', sk: 'Žiada si čas na okraji, malé kroky a dospelého človeka, ktorý netlačí ani nezachraňuje.' },
                },
                'risk-oriented': {
                    one: { en: 'tends to try first and think later, climbing the highest frame or saying yes before the question is finished', sk: 'zvyčajne najprv skúša a až potom premýšľa, vylezie na najvyššiu preliezku alebo povie áno skôr, než otázka dozneje' },
                    many: { en: 'tend to try first and think later, climbing the highest frame or saying yes before the question is finished', sk: 'zvyčajne najprv skúšajú a až potom premýšľajú, vylezú na najvyššiu preliezku alebo povedia áno skôr, než otázka dozneje' },
                    gift: { en: 'Courage comes easily, and new skills, places and people are met with appetite rather than fear.', sk: 'Odvaha prichádza ľahko a nové zručnosti, miesta a ľudia sa stretávajú so zvedavosťou, nie so strachom.' },
                    cost: { en: 'Scraped knees are the small price; the larger one is an adult who is constantly on watch and constantly saying no.', sk: 'Odreté kolená sú malá daň; väčšou je dospelý človek, ktorý je neustále na stráži a neustále hovorí nie.' },
                    asks: { en: 'Clear lines where safety is at stake serve it best, and a yes to adventure everywhere else.', sk: 'Najlepšie poslúžia jasné hranice tam, kde ide o bezpečnosť, a áno pre dobrodružstvo všade inde.' },
                },
            },
            shared: {
                cautious: {
                    gain: { en: '{both} take new things slowly, so there is seldom a fight about going too fast.', sk: '{both} pristupujú k novým veciam pomaly, takže spor o príliš rýchle tempo vzniká len zriedka.' },
                    risk: { en: 'Two careful people can talk each other out of things, and the new club or the first sleepover may keep being postponed.', sk: 'Dvaja opatrní ľudia si môžu navzájom veci vyhovoriť a nový krúžok či prvé prespávanie mimo domu sa môže donekonečna odkladať.' },
                },
                'risk-oriented': {
                    gain: { en: '{both} go looking for a challenge, so adventures happen and fear of the new is seldom what holds the household back.', sk: '{both} vyhľadávajú výzvy, takže dobrodružstvá sa dejú a strach z nového domácnosť len zriedka zabrzdí.' },
                    risk: { en: 'With nobody pulling the brake, the safety question can come too late; it helps when someone deliberately takes the careful part.', sk: 'Keď nikto nebrzdí, otázka bezpečnosti môže prísť neskoro; pomáha, keď niekto vedome prevezme úlohu brzdy.' },
                },
            },
            opposed: {
                gain: { en: '{p1} shows that the jump can be made and {p0} shows where to look first, so each child can learn a little nerve or a little care.', sk: '{p1} ukazuje, že sa skočiť dá, a {p0}, kam sa treba najprv pozrieť, takže sa každé z detí môže naučiť trochu odvahy alebo trochu opatrnosti.' },
                risk: { en: '{p1} dares and {p0} hangs back, and teasing about being scared, or telling tales about being reckless, can harden into a pattern between the two.', sk: '{p1} vyzýva a {p0} zostáva vzadu, a doberanie si kvôli strachu alebo žalovanie kvôli hazardu sa medzi súrodencami môže ustáliť ako vzorec.' },
                bridge: { en: 'When the adults praise both kinds of good judgement, the brave try and the sensible wait, neither caution nor daring has to become a label.', sk: 'Keď dospelí oceňujú oba druhy dobrého úsudku, odvážny pokus aj rozumné počkanie, z opatrnosti ani z odvahy sa nemusí stať nálepka.' },
            },
            oneSided: {
                cautious: { note: { en: '{lean} hangs back at new things and {mid} can go either way, so the two often settle on a shared pace for new adventures.', sk: '{lean} pri nových veciach chvíľu zostáva vzadu a {mid} vie ísť oboma smermi, takže sa súrodenci pri nových dobrodružstvách často zladia na spoločnom tempe.' } },
                'risk-oriented': { note: { en: '{lean} rushes at new things and {mid} can follow or hold back, so the two seldom argue over pace, though no child should be made the other child’s minder.', sk: '{lean} sa do nových vecí vrhá a {mid} vie nasledovať aj zastať, takže sa súrodenci pre tempo zriedka hádajú; žiadne dieťa by však nemalo byť strážcom druhého dieťaťa.' } },
            },
            swings: { en: '{who} takes risks one day and hesitates the next, often depending on who is watching, so neither label fits.', sk: '{who} raz riskuje a inokedy váha, často podľa toho, kto sa pozerá, takže žiadna nálepka nesedí.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{first} sees what could go wrong and {second} sees what could be fun; a stream of warnings can teach the child to stop listening, or to stop telling.', sk: '{first} vidí, čo sa môže pokaziť, a {second}, čo môže byť zábava; prúd varovaní môže dieťa naučiť prestať počúvať alebo prestať rozprávať.' },
                    gain: { en: 'The child has an adult who notices danger, and {first} gets drawn into adventures that would otherwise have been skipped.', sk: 'Dieťa má pri sebe dospelého človeka, ktorý si všimne nebezpečenstvo, a {first} sa nechá vtiahnuť do dobrodružstiev, ktoré by inak zostali nevyskúšané.' },
                    bridge: { en: '{first} names the two or three lines that are about real safety, holds those firmly, and says yes, with interest, to the rest.', sk: '{first} pomenuje dve či tri hranice, ktoré sa týkajú skutočnej bezpečnosti, tie drží pevne a na ostatné povie so záujmom áno.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{first} wants to share the thrill and {second} needs time on the edge; encouragement can turn into pressure, and the child may dig in harder.', sk: '{first} chce zážitok zdieľať a {second} potrebuje čas na okraji; povzbudzovanie sa môže zmeniť na tlak a dieťa sa môže zaťať ešte viac.' },
                    gain: { en: '{second} has a guide who makes the world look worth exploring, and {first} learns how much a slower start can protect.', sk: '{second} má sprievodcu, vďaka ktorému svet vyzerá ako miesto hodné objavovania, a {first} sa učí, koľko dokáže ochrániť pomalší štart.' },
                    bridge: { en: 'Small, chosen steps work better than a big push: {first} offers the next step, accepts a “not yet”, and stays close while the child watches.', sk: 'Malé, zvolené kroky fungujú lepšie než veľké postrčenie: {first} ponúkne ďalší krok, prijme „ešte nie“ a zostane nablízku, kým dieťa pozoruje.' },
                },
                oneSidedFirstLeans: {
                    cautious: { note: { en: '{first} leans towards caution and {second} can go either way, so the adult’s worries are worth keeping in proportion, so that the child does not borrow the fear.', sk: '{first} sa prikláňa k opatrnosti a {second} vie ísť oboma smermi, preto sa oplatí udržať obavy dospelého človeka v primeranej miere, aby si ich dieťa nepožičalo.' } },
                    'risk-oriented': { note: { en: '{first} enjoys a challenge and {second} can take one or leave it, so adventures work best when the child sets the height of the next step.', sk: '{first} vyhľadáva výzvy a {second} ich vie prijať aj odmietnuť, takže dobrodružstvá fungujú najlepšie, keď výšku ďalšieho kroku určuje dieťa.' } },
                },
                oneSidedSecondLeans: {
                    cautious: { note: { en: '{second} watches before joining and {first} can meet that pace, which is often all a careful start needs: time, nearness and no audience.', sk: '{second} sa najprv pozerá a až potom sa pridá a {first} vie toto tempo prijať, čo je často všetko, čo opatrný začiatok potrebuje: čas, blízkosť a žiadne publikum.' } },
                    'risk-oriented': { note: { en: '{second} rushes at challenges and {first} can adjust, so the main work is choosing the few safety lines that are not negotiable and keeping those clear.', sk: '{second} sa do výziev vrhá a {first} sa vie prispôsobiť, takže hlavnou prácou je vybrať pár bezpečnostných hraníc, o ktorých sa nevyjednáva, a držať ich jasne.' } },
                },
            },
            child: {
                cautious: {
                    shows: { en: 'is inclined to watch new situations and people from the edge before joining in, and to need time to warm up', sk: 'nové situácie a ľudí radšej najprv pozoruje z okraja, kým sa pridá, a potrebuje čas, kým sa osmelí' },
                    needs: { en: 'A gradual start may be how caution turns into confidence; small steps that are allowed to be slow can help more than either a push or a rescue.', sk: 'Pozvoľný začiatok môže byť cesta, ako sa opatrnosť zmení na istotu; malé kroky, ktoré smú byť pomalé, môžu pomôcť viac než postrčenie či záchrana.' },
                    support: { en: 'Prepare ahead, stay close at first, offer one small next step, and treat “not yet” as a fair answer.', sk: 'Priprav sa vopred, spočiatku zostaň nablízku, ponúkni jeden malý ďalší krok a „ešte nie“ ber ako férovú odpoveď.' },
                },
                'risk-oriented': {
                    shows: { en: 'is apt to rush at a challenge, testing and trying before stopping to check', sk: 'sa do výziev zvykne púšťať bez váhania, skúša a testuje skôr, než sa zastaví a overí si situáciu' },
                    needs: { en: 'Daring can be a way of learning, and a few clear safety lines may help more than a long list of warnings.', sk: 'Odvaha môže byť spôsobom učenia a pár jasných bezpečnostných hraníc môže pomôcť viac než dlhý zoznam varovaní.' },
                    support: { en: 'Hold a few safety rules firmly and explain them once; elsewhere, allow adventure within safe limits.', sk: 'Pár bezpečnostných pravidiel drž pevne a vysvetli ich raz; inde dovoľ dobrodružstvo v bezpečných medziach.' },
                },
            },
        },
        /* ------------------------------------------------------------ emotional-expression -- */
        'emotional-expression': {
            label: { en: 'How feelings show', sk: 'Ako sa ukazujú city' },
            phrase: { en: 'how openly each shows a feeling', sk: 'to, ako otvorene každý ukazuje city' },
            title: {
                shared: { en: 'Feelings shown the same way', sk: 'City ukazované rovnako' },
                opposed: { en: 'Big feelings meet quiet ones', sk: 'Veľké emócie sa stretávajú s tichými' },
                oneSided: { en: 'One sets the emotional weather', sk: 'Jeden určuje citové počasie' },
            },
            scale: [{ en: 'Shows it all', sk: 'Ukáže všetko' }, { en: 'Keeps it in', sk: 'Nechá si to v sebe' }],
            poles: {
                'emotionally-expressive': {
                    one: { en: 'tends to show feelings fully and at once, so joy, anger and disappointment are visible from across the room', sk: 'zvyčajne ukáže city naplno a hneď, takže radosť, hnev aj sklamanie vidno už od dverí' },
                    many: { en: 'tend to show feelings fully and at once, so joy, anger and disappointment are visible from across the room', sk: 'zvyčajne ukazujú city naplno a hneď, takže radosť, hnev aj sklamanie vidno už od dverí' },
                    gift: { en: 'Nobody has to guess what is going on, and tenderness arrives as openly as frustration does.', sk: 'Nikto nemusí hádať, čo sa deje, a nežnosť prichádza rovnako otvorene ako zlosť.' },
                    cost: { en: 'The volume can be hard to live alongside, and an intense outburst can pull the adults into matching it.', sk: 'S takou hlasitosťou sa nežije ľahko a prudký výbuch môže dospelých strhnúť k rovnakému tónu.' },
                    asks: { en: 'What it needs is a steady presence that can hold a big feeling without punishing it or giving way to it.', sk: 'Potrebuje pokojnú prítomnosť, ktorá veľký pocit unesie, netrestá a zároveň sa mu nepoddá.' },
                },
                'emotionally-contained': {
                    one: { en: 'tends to keep feelings inside, so distress may show only as a stomach ache, a short temper or a quiet evening', sk: 'si city zvyčajne necháva v sebe, takže trápenie sa môže ukázať len ako bolesť brucha, podráždenosť alebo tichý večer' },
                    many: { en: 'tend to keep feelings inside, so distress may show only as a stomach ache, a short temper or a quiet evening', sk: 'si city zvyčajne nechávajú v sebe, takže trápenie sa môže ukázať len ako bolesť brucha, podráždenosť alebo tichý večer' },
                    gift: { en: 'There is steadiness here, and a feeling that is finally shared has usually been thought about first.', sk: 'Je v tom stálosť a pocit, ktorý sa napokon povie, býva vopred premyslený.' },
                    cost: { en: 'Real distress can go unseen for a while, because the outside looks calm long after the inside is not.', sk: 'Skutočné trápenie môže chvíľu zostať nepovšimnuté, lebo navonok je pokoj ešte dlho potom, čo vnútri už nie je.' },
                    asks: { en: 'Gentle, low-pressure openings help most, along with an adult who notices the small signs.', sk: 'Najviac pomáhajú jemné príležitosti bez tlaku a dospelý človek, ktorý si všimne drobné signály.' },
                },
            },
            shared: {
                'emotionally-expressive': {
                    gain: { en: '{both} show what they feel, so the air clears quickly and affection is easy to see.', sk: '{both} ukazujú, čo cítia, takže vzduch sa rýchlo vyčistí a náklonnosť je dobre vidieť.' },
                    risk: { en: 'Two big reactions can feed each other, and a small frustration can become a loud evening with no one calm enough left to slow it.', sk: 'Dve prudké reakcie sa môžu navzájom živiť a z malej mrzutosti môže byť hlučný večer, keď už nikto nemá dosť pokoja na to, aby to spomalil.' },
                },
                'emotionally-contained': {
                    gain: { en: '{both} keep their feelings level, so home tends to feel calm and nobody is swamped by another person’s storm.', sk: '{both} udržiavajú city v rovnováhe, takže doma býva pokoj a nikoho nezaplaví cudzia búrka.' },
                    risk: { en: 'What goes unsaid can pile up quietly: two people who keep things in may each assume that the other is fine.', sk: 'Nevyslovené sa môže potichu hromadiť: dvaja ľudia, ktorí si veci nechávajú pre seba, môžu jeden o druhom predpokladať, že je všetko v poriadku.' },
                },
            },
            opposed: {
                gain: { en: '{p0} says out loud what is going on between the two, and {p1} brings a calm that can steady a shared room.', sk: '{p0} vysloví nahlas to, čo sa medzi súrodencami deje, a {p1} prináša pokoj, ktorý dokáže spoločnú izbu upokojiť.' },
                risk: { en: 'When {p0} erupts, {p1} tends to go still, and a hurt that makes no noise is easily missed beside one that does.', sk: 'Keď {p0} vybuchne, {p1} zvyčajne stíchne, a bolesť, ktorá nerobí hluk, sa vedľa tej hlučnej ľahko prehliadne.' },
                bridge: { en: 'It helps when the adults check in with the quieter child after a storm, and not only with the louder one during it.', sk: 'Pomáha, keď sa dospelí po búrke ozvú aj tichšiemu z detí, nielen hlučnejšiemu uprostred búrky.' },
            },
            oneSided: {
                'emotionally-expressive': { note: { en: '{lean} shows feelings loudly and {mid} can take it in stride, so the weather at home is lively but storms seldom last long.', sk: '{lean} ukazuje city nahlas a {mid} to zvláda s pokojom, takže počasie v domácnosti je živé, ale búrky netrvajú dlho.' } },
                'emotionally-contained': { note: { en: '{lean} keeps feelings inside and {mid} moves between showing and holding back, so it is worth asking now and then how the quieter child is really doing.', sk: '{lean} si city necháva v sebe a {mid} ich vie ukázať aj zadržať, preto sa oplatí občas sa opýtať, ako sa tichšie z detí naozaj má.' } },
            },
            swings: { en: 'Calm for days and then everything at once: {who} runs this way, so a quiet stretch does not by itself mean that all is well.', sk: '{who} funguje takto: dlho pokoj a potom všetko naraz, takže tiché obdobie samo osebe ešte neznamená, že je všetko v poriadku.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{first} shows feelings openly and {second} keeps them in; the adult’s intensity can make the child go quieter still, and the child’s quiet can read to the adult as not caring.', sk: '{first} ukazuje city otvorene a {second} si ich necháva v sebe; intenzita dospelého človeka môže dieťa ešte viac stíšiť a ticho dieťaťa sa dospelému človekovi môže zdať ako ľahostajnosť.' },
                    gain: { en: '{second} sees that feelings can be named and survived, and {first} learns the value of a quieter, steadier register.', sk: '{second} vidí, že city sa dajú pomenovať a prežiť, a {first} sa učí, akú hodnotu má tichší a pokojnejší tón.' },
                    bridge: { en: '{first} lowers the volume when the child is upset and opens low-pressure channels, such as talking side by side, drawing, or a note left on the pillow.', sk: '{first} stíši hlas, keď je dieťa rozrušené, a otvorí cesty bez tlaku, napríklad rozhovor bok po boku, kreslenie alebo odkaz na vankúši.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{second} feels everything loudly and {first} meets it with a calm that can look like coolness; the child may turn up the volume just to be noticed.', sk: '{second} prežíva všetko nahlas a {first} na to odpovedá pokojom, ktorý môže pôsobiť chladne; dieťa potom môže pridať na hlasitosti, len aby sa ozvalo zreteľnejšie.' },
                    gain: { en: 'The child has a steady anchor in the storm, and {first} is invited by the child’s openness to show a little more warmth out loud.', sk: 'Dieťa má v búrke pevnú kotvu a {first} môže vďaka otvorenosti dieťaťa ukázať trochu viac nežnosti nahlas.' },
                    bridge: { en: '{first} names the feeling back in words (“that was a really big disappointment”), so that the calm is felt as company rather than distance.', sk: '{first} pomenuje pocit slovami („to bolo naozaj veľké sklamanie“), aby pokoj pôsobil ako spoločnosť, nie ako odstup.' },
                },
                oneSidedFirstLeans: {
                    'emotionally-expressive': { note: { en: '{first} shows feelings fully and {second} sits somewhere in between, so the child can learn a great deal from watching how big feelings are handled and repaired.', sk: '{first} ukazuje city naplno a {second} je niekde medzi, takže dieťa sa môže veľa naučiť z toho, ako sa s veľkými emóciami zaobchádza a ako sa po nich veci napravujú.' } },
                    'emotionally-contained': { note: { en: '{first} keeps feelings level and {second} can go either way, so naming the adult’s own feelings aloud now and then gives the child words to borrow.', sk: '{first} drží city na uzde a {second} vie ísť oboma smermi, takže keď dospelý človek občas nahlas pomenuje vlastný pocit, dieťa získa slová, ktoré si môže požičať.' } },
                },
                oneSidedSecondLeans: {
                    'emotionally-expressive': { note: { en: '{second} shows feelings fully and {first} can hold steady, which is exactly the anchor a big feeling needs: calm, close and unhurried.', sk: '{second} ukazuje city naplno a {first} vie udržať pokoj, čo je presne tá kotva, ktorú veľký pocit potrebuje: pokoj, blízkosť a žiadny zhon.' } },
                    'emotionally-contained': { note: { en: '{second} keeps feelings in and {first} can meet that, so small, regular openings, a bedtime chat or a walk, tend to bring out what questions alone do not.', sk: '{second} si city necháva pre seba a {first} to vie prijať, takže malé pravidelné príležitosti, napríklad rozhovor pred spaním alebo prechádzka, zvyčajne vynesú na povrch to, čo samotné otázky nie.' } },
                },
            },
            child: {
                'emotionally-expressive': {
                    shows: { en: 'can feel things at full volume, with joy and frustration both arriving fast and loud', sk: 'môže prežívať veci naplno: radosť aj zlosť prichádzajú rýchlo a nahlas' },
                    needs: { en: 'A big feeling may need a calm adult more than a lecture, and it often passes once it has been named and accepted.', sk: 'Veľký pocit môže potrebovať skôr pokojného dospelého človeka než prednášku a často prejde práve vtedy, keď je pomenovaný a prijatý.' },
                    support: { en: 'Stay calm and close, name the feeling and accept it, and only then set a limit on what is done with it.', sk: 'Zostaň nablízku a v pokoji, pomenuj pocit a prijmi to, čo dieťa cíti, a až potom stanov hranicu pre to, čo s pocitom robí.' },
                },
                'emotionally-contained': {
                    shows: { en: 'often keeps feelings inside, so that worry or sadness may surface sideways, as tiredness, a stomach ache or a short temper', sk: 'si city často necháva pre seba, takže starosť alebo smútok sa môžu ukázať oklukou, ako únava, bolesť brucha či podráždenosť' },
                    needs: { en: 'A feeling that is not shown may still need a way out, and side-by-side moments without pressure can offer one.', sk: 'Aj pocit, ktorý nie je vidieť, môže potrebovať cestu von a chvíle bok po boku, bez tlaku, môžu takú cestu ponúknuť.' },
                    support: { en: 'Notice the small signals, offer regular low-key openings such as a walk or a bedtime chat, and let an answer come later rather than on the spot.', sk: 'Všímaj si drobné signály, ponúkaj pravidelné nenápadné príležitosti, napríklad prechádzku alebo rozhovor pred spaním, a nechaj odpoveď prísť neskôr, nie hneď.' },
                },
            },
        },
        /* ------------------------------------------------------------ visibility: social-energy -- */
        visibility: {
            label: { en: 'Company and quiet', sk: 'Spoločnosť a ticho' },
            phrase: { en: 'how much company each needs, and how much quiet', sk: 'to, koľko spoločnosti a koľko ticha každý potrebuje' },
            title: {
                shared: { en: 'The same appetite for company', sk: 'Rovnaký hlad po spoločnosti' },
                opposed: { en: 'A full house, a quiet room', sk: 'Plný dom a tichá izba' },
                oneSided: { en: 'One needs the quiet or the crowd', sk: 'Jeden potrebuje ticho alebo ruch' },
            },
            scale: [{ en: 'Small circle, quiet time', sk: 'Malý okruh, čas osamote' }, { en: 'Company and bustle', sk: 'Spoločnosť a ruch' }],
            poles: {
                private: {
                    one: { en: 'tends to keep to a small circle and to need quiet time after a busy day among people', sk: 'sa zvyčajne drží malého okruhu ľudí a po rušnom dni medzi ľuďmi potrebuje ticho' },
                    many: { en: 'tend to keep to a small circle and to need quiet time after a busy day among people', sk: 'sa zvyčajne držia malého okruhu ľudí a po rušnom dni medzi ľuďmi potrebujú ticho' },
                    gift: { en: 'Friendships tend to be few and deep, and time alone is used well rather than endured.', sk: 'Priateľstiev býva málo, no sú hlboké, a čas osamote sa využije, nie pretrpí.' },
                    cost: { en: 'After a party or a long school day the battery can be flat, and the retreat can look like a mood or a rejection.', sk: 'Po oslave alebo dlhom dni v škole môže byť batéria vybitá a ústup môže pôsobiť ako zlá nálada alebo odmietnutie.' },
                    asks: { en: 'Protected quiet time is the first request, and social plans in smaller doses the second.', sk: 'Prvou prosbou je chránený čas v tichu, druhou spoločenské plány v menších dávkach.' },
                },
                social: {
                    one: { en: 'tends to light up around people, wanting friends over, plans made and someone to talk to', sk: 'pri ľuďoch zvyčajne ožije, chce mať návštevy, plány a niekoho na rozhovor' },
                    many: { en: 'tend to light up around people, wanting friends over, plans made and someone to talk to', sk: 'pri ľuďoch zvyčajne ožijú, chcú mať návštevy, plány a niekoho na rozhovor' },
                    gift: { en: 'New people are met easily, and the energy of company flows back into the home.', sk: 'S novými ľuďmi sa nadväzuje ľahko a energia zo spoločnosti sa vracia aj domov.' },
                    cost: { en: 'A quiet weekend can feel like a punishment, and the hunger for company can outpace what the adults have the strength to give.', sk: 'Tichý víkend môže pôsobiť ako trest a túžba po spoločnosti môže prevýšiť to, na čo majú dospelí sily.' },
                    asks: { en: 'Regular chances to be among people matter here, and quiet that is offered rather than imposed.', sk: 'Záleží tu na pravidelných príležitostiach byť medzi ľuďmi a na tichu, ktoré sa ponúkne, nie nanúti.' },
                },
            },
            shared: {
                private: {
                    gain: { en: '{both} are content with a quiet home and a few close people, so evenings in are restful rather than dull.', sk: '{both} si vystačia s tichým domovom a niekoľkými blízkymi ľuďmi, takže večery doma sú oddychom, nie nudou.' },
                    risk: { en: 'Two private people can let the circle shrink, and the effort of inviting others, or of joining in, may keep being put off.', sk: 'Dvaja uzavretejší ľudia môžu nechať okruh zmenšovať a námaha niekoho pozvať alebo sa niekam pridať sa môže stále odkladať.' },
                },
                social: {
                    gain: { en: '{both} enjoy company, so friends come and go easily and the house tends to be full of life.', sk: '{both} si užívajú spoločnosť, takže priatelia ľahko prichádzajú a odchádzajú a dom býva plný života.' },
                    risk: { en: 'With a full calendar there may be little unscheduled quiet, and tiredness can surface as short tempers on Sunday night.', sk: 'Pri plnom kalendári môže zostať málo nenaplánovaného ticha a únava sa môže prejaviť podráždenosťou v nedeľu večer.' },
                },
            },
            opposed: {
                gain: { en: '{p1} brings friends and noise into the house and {p0} keeps a quieter corner, so each child can visit the other’s world when it suits.', sk: '{p1} privádza domov kamarátov a ruch a {p0} udržiava tichší kút, takže každé z detí môže zavítať do sveta druhého dieťaťa, keď mu to vyhovuje.' },
                risk: { en: '{p1} wants friends over and {p0} wants the house quiet, and a shared bedroom can become the place where the two needs collide.', sk: '{p1} chce mať doma kamarátov a {p0} chce v dome ticho, a spoločná izba sa môže stať miestom, kde sa tieto dve potreby zrazia.' },
                bridge: { en: 'A predictable rhythm of visitor afternoons and quiet afternoons, plus one corner that is off limits to guests, gives each need a place.', sk: 'Predvídateľný rytmus popoludní s návštevami a tichých popoludní a k tomu kútik, kam hostia nesmú, dá každej potrebe svoje miesto.' },
            },
            oneSided: {
                private: { note: { en: '{lean} needs quiet after company and {mid} can manage bustle or calm, so a little protected alone time is usually easy to arrange.', sk: '{lean} po spoločnosti potrebuje ticho a {mid} zvládne ruch aj pokoj, takže trochu chráneného času osamote sa zvyčajne dá ľahko zariadiť.' } },
                social: { note: { en: '{lean} wants company and {mid} can go along, so visits from friends tend to suit both children, as long as quiet stays an option.', sk: '{lean} túži po spoločnosti a {mid} sa vie pridať, takže návštevy kamarátov zvyčajne vyhovujú obom deťom, pokiaľ zostane aj možnosť ticha.' } },
            },
            swings: { en: 'Sociable one week and craving solitude the next: with {who}, asking works better than planning on yesterday’s mood.', sk: '{who} chce jeden týždeň ľudí a ďalší samotu, preto funguje skôr otázka než plán podľa včerajšej nálady.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{second} wants friends, visits and outings and {first} wants a quiet home; the child can feel held back while the adult runs out of strength.', sk: '{second} chce kamarátov, návštevy a výlety a {first} chce tichý domov; dieťa sa môže cítiť obmedzované a dospelému človekovi môžu dochádzať sily.' },
                    gain: { en: 'The child has a calm home base to come back to, and {first} is drawn into connections that might otherwise not have happened.', sk: 'Dieťa má pokojný domov, kam sa môže vrátiť, a {first} sa dostáva k vzťahom, ktoré by inak možno nevznikli.' },
                    bridge: { en: '{first} plans company in manageable doses, shares the load with other families or clubs, and keeps some quiet time for the adult as well.', sk: '{first} plánuje spoločnosť v zvládnuteľných dávkach, delí sa o túto úlohu s inými rodinami alebo krúžkami a chráni si aj vlastný čas v tichu.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{first} fills the weekend with people and {second} needs a quieter one; the child’s retreat can look like rudeness when it is mostly tiredness.', sk: '{first} naplní víkend ľuďmi a {second} potrebuje pokojnejší; ústup dieťaťa môže vyzerať ako nezdvorilosť, hoci ide najmä o únavu.' },
                    gain: { en: '{second} gets gentle practice in company from an adult who makes it look easy, and {first} learns what a quiet afternoon is worth.', sk: '{second} získava jemný tréning v spoločnosti od dospelého človeka, s ktorým to vyzerá ľahko, a {first} sa učí, akú cenu má tiché popoludnie.' },
                    bridge: { en: '{first} checks how much battery the child has before saying yes to plans, builds in a quiet hour after busy days, and lets the child leave a gathering early without fuss.', sk: '{first} pred každým plánom zistí, koľko má dieťa síl, po rušných dňoch naplánuje tichú hodinku a dovolí dieťaťu odísť zo stretnutia skôr bez rozruchu.' },
                },
                oneSidedFirstLeans: {
                    private: { note: { en: '{first} prefers a quiet home and {second} can go either way, so a few regular chances for company outside the home keep the balance easy.', sk: '{first} uprednostňuje tichý domov a {second} vie ísť oboma smermi, takže pár pravidelných príležitostí na spoločnosť mimo domu udrží rovnováhu.' } },
                    social: { note: { en: '{first} loves company and {second} can join in or step back, so it is worth noticing which way the child’s energy points on a given day.', sk: '{first} miluje spoločnosť a {second} sa vie pridať aj stiahnuť, preto sa oplatí všímať si, kam v daný deň smeruje energia dieťaťa.' } },
                },
                oneSidedSecondLeans: {
                    private: { note: { en: '{second} needs quiet after company and {first} can adjust to give it, so protecting that recovery time is a small change with a large effect.', sk: '{second} po spoločnosti potrebuje ticho a {first} sa vie prispôsobiť, takže chrániť tento čas na zotavenie je malá zmena s veľkým účinkom.' } },
                    social: { note: { en: '{second} wants people around and {first} can manage both, so regular, planned company tends to calm the restlessness of a quiet week.', sk: '{second} chce mať okolo seba ľudí a {first} zvládne oboje, takže pravidelná naplánovaná spoločnosť zvyčajne utlmí nepokoj tichého týždňa.' } },
                },
            },
            child: {
                private: {
                    shows: { en: 'seems to feel most at home with a few close friends, and to need quiet after a busy day', sk: 'sa zrejme najlepšie cíti v malom okruhu blízkych priateľov a po rušnom dni potrebuje ticho' },
                    needs: { en: 'Quiet may be how energy comes back, and a small circle can be a preference rather than a problem to fix.', sk: 'Ticho môže byť spôsob, ako sa vracajú sily, a malý okruh priateľov môže byť voľbou, nie problémom na riešenie.' },
                    support: { en: 'Protect a quiet stretch after busy days, keep social plans in smaller doses, and let a preference for a few friends stand.', sk: 'Chráň čas v tichu po rušných dňoch, dávkuj spoločenské plány a rešpektuj, že stačí pár priateľov.' },
                },
                social: {
                    shows: { en: 'usually comes alive among people, and may go looking for bustle after too many quiet days', sk: 'medzi ľuďmi zvyčajne ožije a po príliš mnohých tichých dňoch môže začať hľadať ruch' },
                    needs: { en: 'Company may give more energy than it takes, and regular time with friends can settle more than it stirs up.', sk: 'Spoločnosť môže dodávať viac síl, než berie, a pravidelný čas s priateľmi môže skôr upokojiť než rozvíriť.' },
                    support: { en: 'Build regular chances for company into the week, and offer quiet time as a choice rather than an exile.', sk: 'Zabuduj do týždňa pravidelné príležitosti na spoločnosť a čas v tichu ponúkaj ako voľbu, nie ako vyhnanstvo.' },
                },
            },
        },
        /* ------------------------------------------------------------ change: change-and-steadiness -- */
        change: {
            label: { en: 'Change and the familiar', sk: 'Zmena a známe' },
            phrase: { en: 'how each meets change and the familiar', sk: 'to, ako každý prijíma zmenu a známe' },
            title: {
                shared: { en: 'The same pace of change', sk: 'Rovnaké tempo zmien' },
                opposed: { en: 'The familiar meets the new', sk: 'Známe sa stretáva s novým' },
                oneSided: { en: 'One leans to the old or the new', sk: 'Jeden sa prikláňa k starému alebo novému' },
            },
            scale: [{ en: 'Holds to the familiar', sk: 'Drží sa známeho' }, { en: 'Hungry for the new', sk: 'Láka nové' }],
            poles: {
                'stability-seeking': {
                    one: { en: 'tends to hold on to the familiar and to find switches, from a changed plan to starting somewhere new, genuinely hard', sk: 'sa zvyčajne drží známeho a prechody, od zmeneného plánu po začiatok niečoho nového, znáša naozaj ťažko' },
                    many: { en: 'tend to hold on to the familiar and to find switches, from a changed plan to starting somewhere new, genuinely hard', sk: 'sa zvyčajne držia známeho a prechody, od zmeneného plánu po začiatok niečoho nového, znášajú naozaj ťažko' },
                    gift: { en: 'Loyalty to people, places and rituals runs deep, and a familiar rhythm is lived in fully.', sk: 'Vernosť ľuďom, miestam a rituálom je hlboká a známy rytmus sa žije naplno.' },
                    cost: { en: 'An unannounced change lands as a shock, and the protest can look out of all proportion to a mere change of plan.', sk: 'Neohlásená zmena dopadne ako šok a protest môže pôsobiť úplne neprimerane k obyčajnej zmene plánu.' },
                    asks: { en: 'Warning comes first, then a bridge from the old to the new, and some things that stay just as before.', sk: 'Najprv potrebuje upozornenie, potom most od starého k novému a niekoľko vecí, ktoré zostanú presne také, aké boli.' },
                },
                'novelty-seeking': {
                    one: { en: 'tends to crave the new, tiring quickly of the same activities, routes and routines', sk: 'zvyčajne túži po novom a tých istých činností, ciest a rutín sa rýchlo nasýti' },
                    many: { en: 'tend to crave the new, tiring quickly of the same activities, routes and routines', sk: 'zvyčajne túžia po novom a tých istých činností, ciest a rutín sa rýchlo nasýtia' },
                    gift: { en: 'Curiosity is constant, and new places, foods and people are met as an adventure.', sk: 'Zvedavosť je neustála a nové miesta, jedlá aj ľudia sa stretávajú ako dobrodružstvo.' },
                    cost: { en: 'Boredom arrives fast, and the hunger for something different can unsettle a household that runs on its habits.', sk: 'Nuda prichádza rýchlo a hlad po niečom inom môže rozkolísať domácnosť, ktorá stojí na zvykoch.' },
                    asks: { en: 'Novelty inside a steady frame suits it best, with a say in what the new thing will be.', sk: 'Najlepšie mu sedí novosť vnútri stabilného rámca a slovo pri výbere toho, čo nové bude.' },
                },
            },
            shared: {
                'stability-seeking': {
                    gain: { en: '{both} cherish the familiar, so rituals, from the weekly dinner to the Sunday walk, hold the home together.', sk: '{both} si cenia známe, takže rituály, od spoločnej večere po nedeľnú prechádzku, držia domov pokope.' },
                    risk: { en: 'A big change, a move or a new baby, can shake both at once, with nobody steady enough to absorb the jolt for the other.', sk: 'Veľká zmena, sťahovanie či nový súrodenec, môže otriasť oboma naraz a nikto nemá dosť stability, aby otras zachytil aj za druhého.' },
                },
                'novelty-seeking': {
                    gain: { en: '{both} love something new, so trips, experiments and changes of plan bring shared excitement rather than conflict.', sk: '{both} milujú nové veci, takže výlety, pokusy aj zmeny plánu prinášajú spoločné nadšenie, nie konflikt.' },
                    risk: { en: 'With both chasing the next thing, the steady rhythms that rest a body, such as sleep and meals, can be the first to slip.', sk: 'Keď sa každý z dvojice ženie za ďalšou novinkou, ako prvé sa môžu rozpadnúť pokojné rytmy, ktoré dávajú telu oddych, ako spánok a jedlo.' },
                },
            },
            opposed: {
                gain: { en: '{p1} pulls the family towards new things and {p0} keeps the beloved rituals alive, and a household needs both.', sk: '{p1} ťahá rodinu k novým veciam a {p0} udržiava pri živote obľúbené rituály, a domácnosť potrebuje oboje.' },
                risk: { en: 'Every outing becomes a negotiation: {p1} asks for somewhere new, {p0} pleads for the usual, and one child is let down whichever way it goes.', sk: 'Každý výlet sa mení na vyjednávanie: {p1} chce niekam nové, {p0} prosí o to zvyčajné a jedno z detí je sklamané, nech sa rozhodne akokoľvek.' },
                bridge: { en: 'Taking turns, and pairing the new with something familiar, such as a new place visited with the usual snack, lets each child have a share.', sk: 'Striedanie a spájanie nového so známym, napríklad nové miesto so zvyčajným občerstvením, dá každému dieťaťu kus toho, čo potrebuje.' },
            },
            oneSided: {
                'stability-seeking': { note: { en: '{lean} finds change hard and {mid} takes it either way, so small warnings before transitions usually keep the peace between the two.', sk: '{lean} znáša zmeny ťažko a {mid} ich prijíma tak či onak, takže malé upozornenia pred prechodmi zvyčajne udržia medzi súrodencami pokoj.' } },
                'novelty-seeking': { note: { en: '{lean} wants the new and {mid} can follow or stay put, so fresh plans tend to find a willing companion.', sk: '{lean} chce nové veci a {mid} sa vie pridať aj zostať pri starom, takže nové plány zvyčajne nájdu ochotného spoločníka.' } },
            },
            swings: { en: 'Change is welcome on a good day and fought on a tired one for {who}, so how the day has gone is worth checking first.', sk: '{who} zmenu v dobrý deň víta a v unavený deň odmieta, preto sa oplatí najprv zistiť, aký bol deň.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{second} wants new places and new plans and {first} prefers the tried and true; repeated refusals can leave the child restless and the adult cornered.', sk: '{second} chce nové miesta a nové plány a {first} uprednostňuje overené; opakované „nie“ môže v dieťati nechať nepokoj a dospelého človeka zatlačiť do kúta.' },
                    gain: { en: 'The child has a steady base to explore from, and {first} gets a guide to experiences that would otherwise have been passed by.', sk: 'Dieťa má pevný bod, z ktorého môže objavovať, a {first} sprievodcu k zážitkom, ktoré by inak zostali bokom.' },
                    bridge: { en: '{first} keeps the base routines steady and plans a regular dose of something new, with the child choosing what it will be.', sk: '{first} drží základné rutiny stabilné a pravidelne plánuje dávku niečoho nového, pričom to, čo to bude, vyberá dieťa.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{first} enjoys a change of plan and {second} needs the familiar, so a spontaneous outing or a rearranged room can hit the child as a loss.', sk: '{first} si užíva zmenu plánu a {second} potrebuje známe, takže spontánny výlet alebo prestavaná izba môže dieťa zasiahnuť ako strata.' },
                    gain: { en: '{second} brings the household its rituals, and {first} shows the child, gently, that new things can turn out well.', sk: '{second} prináša domácnosti rituály a {first} dieťaťu jemne ukazuje, že nové veci môžu dopadnúť dobre.' },
                    bridge: { en: '{first} announces changes early, explains what stays the same, and brings something familiar along into anything new.', sk: '{first} ohlasuje zmeny včas, vysvetlí, čo zostane rovnaké, a do všetkého nového vezme so sebou kúsok známeho.' },
                },
                oneSidedFirstLeans: {
                    'stability-seeking': { note: { en: '{first} prefers the familiar and {second} can go either way, so the occasional new thing, chosen by the child, keeps curiosity fed.', sk: '{first} uprednostňuje známe a {second} vie ísť oboma smermi, takže občasná novinka, ktorú vyberie dieťa, udrží zvedavosť nasýtenú.' } },
                    'novelty-seeking': { note: { en: '{first} seeks the new and {second} can meet it or not, so a little warning before changes keeps the adult’s enthusiasm from becoming the child’s upheaval.', sk: '{first} vyhľadáva nové a {second} sa vie pridať aj nie, takže krátke upozornenie pred zmenou zabráni, aby sa nadšenie dospelého človeka stalo pre dieťa otrasom.' } },
                },
                oneSidedSecondLeans: {
                    'stability-seeking': { note: { en: '{second} finds change hard and {first} can adjust, so warnings, rituals and something familiar to carry along are the simplest help.', sk: '{second} znáša zmeny ťažko a {first} sa vie prispôsobiť, takže upozornenia, rituály a niečo známe na cestu sú tou najjednoduchšou pomocou.' } },
                    'novelty-seeking': { note: { en: '{second} craves the new and {first} can go along, so planned variety inside a steady week usually answers the restlessness.', sk: '{second} túži po novom a {first} sa vie pridať, takže plánovaná pestrosť vnútri stabilného týždňa zvyčajne utíši nepokoj.' } },
                },
            },
            child: {
                'stability-seeking': {
                    shows: { en: 'might find transitions hard, from switching off a game to starting somewhere new, and may protest loudly or go very quiet when things change', sk: 'prechody, od vypnutia hry po začiatok na novom mieste, môže znášať ťažko a pri zmenách hlasno protestovať alebo celkom stíchnuť' },
                    needs: { en: 'Change may be easier with a run-up: a warning, something familiar to hold on to, and time.', sk: 'Zmena môže byť ľahšia s rozbehom: s upozornením vopred, s niečím známym, čoho sa dá držať, a s časom.' },
                    support: { en: 'Warn before switches, introduce new places and people gradually, and keep a familiar ritual or object as a bridge.', sk: 'Upozorni vopred na každý prechod, nové miesta a ľudí uvádzaj postupne a ako most ponechaj známy rituál alebo predmet.' },
                },
                'novelty-seeking': {
                    shows: { en: 'is often quick to tire of the familiar and to light up at something new', sk: 'sa známeho často rýchlo nasýti a pri niečom novom ožije' },
                    needs: { en: 'Inside a steady frame, novelty may settle restlessness rather than stir it.', sk: 'Vnútri stabilného rámca môže novota nepokoj skôr utíšiť než rozdúchať.' },
                    support: { en: 'Keep the core routines steady and build in regular, chosen novelty: a new route, a new recipe, a new place to explore.', sk: 'Základné rutiny drž stabilné a pravidelne do nich vlož zvolenú novinku: novú cestu, nový recept, nové miesto na objavovanie.' },
                },
            },
        },
        /* ------------------------------------------------------------ initiative: taking-the-lead -- */
        initiative: {
            label: { en: 'Who leads and who follows', sk: 'Kto vedie a kto nasleduje' },
            phrase: { en: 'how strongly each pushes for a way of doing things', sk: 'to, ako silno každý presadzuje svoj spôsob' },
            title: {
                shared: { en: 'The same strength of will', sk: 'Rovnako silná vôľa' },
                opposed: { en: 'Two ways of standing one’s ground', sk: 'Dva spôsoby, ako si stáť za svojím' },
                oneSided: { en: 'One leads, one is easy either way', sk: 'Jeden vedie, druhý zvládne oboje' },
            },
            scale: [{ en: 'Pushes for a way', sk: 'Presadzuje sa' }, { en: 'Goes along', sk: 'Prispôsobí sa' }],
            poles: {
                assertive: {
                    one: { en: 'tends to know what is wanted and to push for it, with a clear no ready when a limit lands', sk: 'zvyčajne vie, čo chce, ide si za tým a keď príde hranica, má po ruke jasné „nie“' },
                    many: { en: 'tend to know what is wanted and to push for it, with a clear no ready when a limit lands', sk: 'zvyčajne vedia, čo chcú, idú si za tým a keď príde hranica, majú po ruke jasné „nie“' },
                    gift: { en: 'There is drive here, a readiness to lead games and plans, and a will that does not easily get lost in a crowd.', sk: 'Je v tom energia, chuť viesť hry aj plány a vôľa, ktorá sa v dave len tak nestratí.' },
                    cost: { en: 'Every limit can become a contest, and a day can fill up with power struggles over shoes and spoons.', sk: 'Každá hranica sa môže zmeniť na súboj a deň sa môže zaplniť mocenskými bojmi o topánky a lyžičky.' },
                    asks: { en: 'A real say where a say is possible is the request, and calm, unbending firmness where it is not.', sk: 'Žiada si skutočné slovo tam, kde je to možné, a pokojnú, neochvejnú pevnosť tam, kde nie.' },
                },
                receptive: {
                    one: { en: 'tends to go along with the plan, follow another’s lead and seldom push for a personal preference', sk: 'sa zvyčajne prispôsobí plánu, nechá sa viesť a vlastné želanie presadzuje len zriedka' },
                    many: { en: 'tend to go along with the plan, follow another’s lead and seldom push for a personal preference', sk: 'sa zvyčajne prispôsobia plánu, nechajú sa viesť a vlastné želania presadzujú len zriedka' },
                    gift: { en: 'Cooperation comes easily, along with a gift for making room for others without strain.', sk: 'Spolupráca ide ľahko a je tu aj dar urobiť miesto iným bez námahy.' },
                    cost: { en: 'Wishes can go unspoken for so long that nobody knows what is wanted, and an easy yes can hide a quiet disappointment.', sk: 'Želania môžu zostať nevyslovené tak dlho, že o nich nikto nevie, a ľahké áno môže skrývať tiché sklamanie.' },
                    asks: { en: 'Being asked is the need: a direct question about what is wanted, and the patience to wait for the answer.', sk: 'Potrebuje, aby sa niekto opýtal: priamu otázku na vlastné želanie a trpezlivosť počkať na odpoveď.' },
                },
            },
            shared: {
                assertive: {
                    gain: { en: '{both} say what they want, so nobody is left guessing and plans get made quickly.', sk: '{both} povedia, čo chcú, takže nikto nemusí hádať a plány vznikajú rýchlo.' },
                    risk: { en: 'Two strong wills can lock horns over small things, and neither may want to be the one who steps back first.', sk: 'Dve silné vôle sa môžu zaseknúť na maličkostiach a ani jedna nemusí chcieť ustúpiť ako prvá.' },
                },
                receptive: {
                    gain: { en: '{both} make room for each other easily, so daily life runs with little friction and plenty of give and take.', sk: '{both} si navzájom ľahko robia miesto, takže každodenný život plynie s malým trením a s ochotou ustúpiť.' },
                    risk: { en: 'When each waits for the other to decide, decisions drift and real preferences stay hidden behind “I don’t mind.”', sk: 'Keď každý čaká, až rozhodne druhý človek, rozhodnutia sa odkladajú a skutočné želania zostávajú skryté za vetou „mne je to jedno“.' },
                },
            },
            opposed: {
                gain: { en: '{p0} comes up with ideas for games and {p1} joins in readily, so play gets going quickly.', sk: '{p0} prichádza s nápadmi na hry a {p1} sa ochotne pridá, takže hra sa rýchlo rozbehne.' },
                risk: { en: 'Over time {p0} can end up choosing every game while {p1} stops saying what is wanted, which can look like harmony while one voice fades.', sk: 'Časom môže {p0} vyberať každú hru, kým {p1} prestane hovoriť, čo chce, a to môže vyzerať ako súlad, hoci jeden hlas pomaly slabne.' },
                bridge: { en: 'When the adults protect turn-taking, such as choosing on alternate days, {p1} gets practice at asking and {p0} at giving way.', sk: 'Keď dospelí chránia striedanie, napríklad výber hry na striedačku po dňoch, {p1} sa cvičí v tom, ako si povedať, a {p0} v tom, ako ustúpiť.' },
            },
            oneSided: {
                assertive: { note: { en: '{lean} pushes for a way and {mid} can lead or follow, so the two usually sort out who chooses without a fight.', sk: '{lean} si presadzuje svoj spôsob a {mid} vie viesť aj nasledovať, takže súrodenci si zvyčajne bez hádky rozdelia, kto vyberá.' } },
                receptive: { note: { en: '{lean} tends to go along and {mid} can lead or follow, so it is worth checking now and then that the quieter wish gets its turn.', sk: '{lean} sa zvyčajne prispôsobí a {mid} vie viesť aj nasledovať, preto sa oplatí občas overiť, či aj tichšie želanie príde na rad.' } },
            },
            swings: { en: 'Weeks of easy going along, then a sudden hard stand: when {who} does this, the stand is usually about something that has built up.', sk: 'Týždne ochotného prispôsobovania a potom zrazu tvrdý odpor: keď to robí {who}, odpor zvyčajne súvisí s niečím, čo sa nahromadilo.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{first} decides quickly and {second} goes along; things run smoothly, but the child’s own wishes can stay unspoken until they come out as tears.', sk: '{first} rozhoduje rýchlo a {second} sa prispôsobí; všetko beží hladko, no vlastné želania dieťaťa môžu zostať nevyslovené, kým nevyjdú von v slzách.' },
                    gain: { en: 'The child gets clear direction, and {first} gets the chance to practise asking rather than deciding.', sk: 'Dieťa dostáva jasný smer a {first} príležitosť učiť sa pýtať namiesto rozhodovania.' },
                    bridge: { en: '{first} asks first and decides second (“which one do you want?”), and waits out the pause before the answer.', sk: '{first} sa najprv opýta a až potom rozhodne („ktoré chceš ty?“) a vydrží ticho, kým príde odpoveď.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{second} pushes hard and {first} tends to give way to keep the peace; the limits then move, and the child keeps testing to find where they are.', sk: '{second} tlačí silno a {first} pre pokoj zvyčajne ustúpi; hranice sa potom posúvajú a dieťa ich skúša ďalej, aby zistilo, kde vlastne sú.' },
                    gain: { en: '{second} brings initiative and ideas, and {first} brings a listening patience that can make a strong will feel respected.', sk: '{second} prináša iniciatívu a nápady a {first} trpezlivosť načúvať, vďaka ktorej sa silná vôľa môže cítiť rešpektovaná.' },
                    bridge: { en: '{first} decides in a calm moment which limits are firm, offers real choices everywhere else, and holds the firm ones kindly and without debate.', sk: '{first} si v pokojnej chvíli ujasní, ktoré hranice sú pevné, všade inde ponúkne skutočné voľby a tie pevné drží vľúdne a bez diskusie.' },
                },
                oneSidedFirstLeans: {
                    assertive: { note: { en: '{first} takes the lead readily and {second} can lead or follow, so leaving a few real decisions to the child keeps the balance fair.', sk: '{first} ochotne preberá vedenie a {second} vie viesť aj nasledovať, takže ponechať dieťaťu pár skutočných rozhodnutí udrží rovnováhu.' } },
                    receptive: { note: { en: '{first} tends to give way and {second} can lead or follow, so the main thing is that firm limits stay firm even when giving way is easier.', sk: '{first} zvyčajne ustúpi a {second} vie viesť aj nasledovať, takže hlavné je, aby pevné hranice zostali pevné aj vtedy, keď je ľahšie ustúpiť.' } },
                },
                oneSidedSecondLeans: {
                    assertive: { note: { en: '{second} pushes for a say and {first} can adjust, so choices within clear limits tend to turn contests into cooperation.', sk: '{second} si žiada slovo a {first} sa vie prispôsobiť, takže voľby v jasných hraniciach zvyčajne menia súboje na spoluprácu.' } },
                    receptive: { note: { en: '{second} tends to go along and {first} can lead or follow, so asking directly what the child wants, and waiting for the answer, matters more than it seems.', sk: '{second} sa zvyčajne prispôsobí a {first} vie viesť aj nasledovať, takže priama otázka, čo dieťa chce, a trpezlivosť počkať na odpoveď znamenajú viac, než sa zdá.' } },
                },
            },
            child: {
                assertive: {
                    shows: { en: 'probably knows what is wanted, says no clearly, and tests where a limit really lies', sk: 'pravdepodobne vie, čo chce, jasne povie nie a skúša, kde hranica naozaj je' },
                    needs: { en: 'A strong will may need a real say and firm, calm edges; choices within limits tend to work better than a contest of strength.', sk: 'Silná vôľa môže potrebovať skutočné slovo a pevné, pokojne držané hranice; voľba v ich rámci zvyčajne funguje lepšie než súboj síl.' },
                    support: { en: 'Offer genuine choices, explain the few rules that do not bend once, and hold them calmly, without threats or guilt.', sk: 'Ponúkaj skutočné voľby, pár nemenných pravidiel raz vysvetli a drž ich pokojne, bez vyhrážok a bez vyvolávania viny.' },
                },
                receptive: {
                    shows: { en: 'will often go along with others and fit in with the plan, seldom pushing for a personal wish', sk: 'sa zvyčajne prispôsobí iným a zapadne do plánu, vlastné želanie presadzuje len zriedka' },
                    needs: { en: 'An easy-going manner can hide real preferences, which may come out when someone asks and then waits.', sk: 'Za ústretovosťou sa môžu skrývať skutočné želania; môžu vyjsť najavo, keď sa niekto opýta a počká.' },
                    support: { en: 'Ask directly what is wanted, let the child choose first sometimes, and notice and welcome a rare “no”.', sk: 'Pýtaj sa priamo, čo dieťa chce, občas nechaj dieťa vyberať ako prvé a zriedkavé „nie“ si všimni a privítaj.' },
                },
            },
        },
        /* ------------------------------------------------------------ abstraction: practical-and-conceptual -- */
        abstraction: {
            label: { en: 'Hands-on or imaginative', sk: 'Prakticky, alebo v predstavách' },
            phrase: { en: 'how each meets the world, by doing or by imagining', sk: 'to, či sa každý so svetom stretáva skôr cez činnosť, alebo cez predstavivosť' },
            title: {
                shared: { en: 'The same way into the world', sk: 'Rovnaká cesta do sveta' },
                opposed: { en: 'Hands meet imagination', sk: 'Ruky sa stretávajú s fantáziou' },
                oneSided: { en: 'One leads with doing or with dreaming', sk: 'Jeden vedie činom alebo snom' },
            },
            scale: [{ en: 'Hands-on', sk: 'Prakticky' }, { en: 'Ideas and imagination', sk: 'Nápady a fantázia' }],
            poles: {
                practical: {
                    one: { en: 'tends to learn by doing, wanting to touch, build and see what works', sk: 'sa zvyčajne učí robením, chce veci chytiť, postaviť a vidieť, čo funguje' },
                    many: { en: 'tend to learn by doing, wanting to touch, build and see what works', sk: 'sa zvyčajne učia robením, chcú veci chytiť, postaviť a vidieť, čo funguje' },
                    gift: { en: 'Things get made, fixed and tried, and learning sticks because it passed through the hands.', sk: 'Veci sa vyrábajú, opravujú a skúšajú a naučené zostáva, lebo prešlo rukami.' },
                    cost: { en: 'Talk about feelings or abstract plans can feel pointless, and a long explanation loses its audience quickly.', sk: 'Reči o pocitoch či abstraktných plánoch môžu pôsobiť zbytočne a dlhé vysvetľovanie rýchlo stratí poslucháča.' },
                    asks: { en: 'Something to do with the hands helps, and lessons that can be tried rather than told.', sk: 'Pomáha niečo, čo sa dá robiť rukami, a lekcie, ktoré sa dajú vyskúšať, nie len vypočuť.' },
                },
                conceptual: {
                    one: { en: 'tends to live among ideas and stories, asking big questions and inventing whole worlds', sk: 'zvyčajne žije v nápadoch a príbehoch, kladie veľké otázky a vymýšľa celé svety' },
                    many: { en: 'tend to live among ideas and stories, asking big questions and inventing whole worlds', sk: 'zvyčajne žijú v nápadoch a príbehoch, kladú veľké otázky a vymýšľajú celé svety' },
                    gift: { en: 'Imagination is rich, and a single question at dinner can open a conversation that lasts all evening.', sk: 'Fantázia je bohatá a jediná otázka pri večeri dokáže otvoriť rozhovor na celý večer.' },
                    cost: { en: 'The practical steps, the shoes, the bag, the bus, can vanish into a daydream that looks like not listening.', sk: 'Praktické kroky, topánky, taška, autobus, sa môžu stratiť v snení, ktoré pôsobí ako nepočúvanie.' },
                    asks: { en: 'Interest in the ideas comes first, and then practical steps woven into the story.', sk: 'Najprv záujem o nápady, potom praktické kroky votkané do príbehu.' },
                },
            },
            shared: {
                practical: {
                    gain: { en: '{both} enjoy getting things done, so building, cooking or fixing something together is an easy way to be close.', sk: '{both} si užívajú, keď sa veci robia, takže spoločné stavanie, varenie či opravovanie je jednoduchou cestou k blízkosti.' },
                    risk: { en: 'Feelings and big questions may get less room than tasks, and some things only get said when there is nothing left to do.', sk: 'Pocity a veľké otázky môžu dostať menej priestoru než úlohy a niektoré veci zaznejú, až keď už nie je čo robiť.' },
                },
                conceptual: {
                    gain: { en: '{both} love ideas, so stories, questions and shared imaginary worlds can fill whole afternoons.', sk: '{both} milujú nápady, takže príbehy, otázky a spoločné vymyslené svety dokážu naplniť celé popoludnia.' },
                    risk: { en: 'With two heads in the clouds the practical side can go unattended, and the forgotten form or the missing sports kit becomes a recurring surprise.', sk: 'Keď sú myšlienky oboch v oblakoch, praktická stránka môže zostať bez dozoru a zabudnutý formulár či chýbajúce veci na telocvik sa stanú opakovaným prekvapením.' },
                },
            },
            opposed: {
                gain: { en: '{p1} dreams up the game and {p0} makes it playable, so together the two reach something neither would have reached alone.', sk: '{p1} vymyslí hru a {p0} zabezpečí, aby sa naozaj dala hrať, takže vznikne niečo, k čomu by sa ani jedno z detí samo nedostalo.' },
                risk: { en: '{p0} wants to get on with it while {p1} is still describing the world, and impatience on one side meets hurt on the other.', sk: '{p0} chce už konečne začať, kým {p1} ešte stále opisuje svet, a netrpezlivosť na jednej strane sa stretne so sklamaním na druhej.' },
                bridge: { en: 'When {p1} owns the story and {p0} owns the building, the difference turns into a team.', sk: 'Keď {p1} dostane na starosť príbeh a {p0} stavbu, rozdiel sa zmení na tím.' },
            },
            oneSided: {
                practical: { note: { en: '{lean} wants to do and build and {mid} moves between doing and imagining, so shared projects tend to suit both children.', sk: '{lean} chce robiť a stavať a {mid} sa pohybuje medzi robením a predstavami, takže spoločné projekty zvyčajne vyhovujú obom deťom.' } },
                conceptual: { note: { en: '{lean} lives in ideas and stories and {mid} can run with the ideas or bring the story down to earth, so imaginative play often finds a ready partner.', sk: '{lean} žije v nápadoch a príbehoch a {mid} ich vie rozvíjať aj priviesť na zem, takže hra s fantáziou často nájde ochotného spoluhráča.' } },
            },
            swings: { en: 'A builder one day and a dreamer the next: for {who} it is worth offering both ways in.', sk: 'Raz stavanie, inokedy snenie: {who} sa mení podľa dňa, preto sa oplatí ponúknuť oba spôsoby, ako sa do veci pustiť.' },
            directed: {
                opposedFirstOnFirstPole: {
                    risk: { en: '{first} keeps to the task and {second} drifts into ideas; reminders feel like interruptions to the child, and daydreams look like dawdling to the adult.', sk: '{first} sa drží úlohy a {second} sa zatúla do nápadov; pripomienky dieťa vníma ako vyrušovanie a snenie sa dospelému človekovi zdá ako zdržiavanie.' },
                    gain: { en: 'The child gets help turning ideas into real things, and {first} gets invited into a wider world of questions.', sk: 'Dieťa dostáva pomoc premeniť nápady na skutočné veci a {first} pozvanie do širšieho sveta otázok.' },
                    bridge: { en: '{first} gives the idea a minute of real interest first, then helps find the next practical step.', sk: '{first} najprv venuje nápadu chvíľu skutočného záujmu a potom pomôže nájsť ďalší praktický krok.' },
                },
                opposedFirstOnSecondPole: {
                    risk: { en: '{first} explains in ideas and {second} learns with the hands; long talks lose the child, and the child’s impatience can look like lack of interest.', sk: '{first} vysvetľuje v myšlienkach a {second} sa učí rukami; dlhé rozhovory dieťa stratia a netrpezlivosť dieťaťa môže pôsobiť ako nezáujem.' },
                    gain: { en: '{second} keeps the household’s plans grounded, and {first} can add the why to whatever the child builds.', sk: '{second} drží plány domácnosti pri zemi a {first} môže k tomu, čo dieťa stavia, pridať aj otázku „prečo“.' },
                    bridge: { en: '{first} turns explanations into something to try, build or see, and saves the big talk for after the doing.', sk: '{first} premení vysvetlenia na niečo, čo sa dá vyskúšať, postaviť alebo vidieť, a veľké rozhovory si nechá na chvíľu, keď je hotovo.' },
                },
                oneSidedFirstLeans: {
                    practical: { note: { en: '{first} leads with doing and {second} moves between doing and imagining, so room for the child’s stories alongside the tasks keeps both alive.', sk: '{first} vedie činom a {second} sa pohybuje medzi robením a predstavami, takže priestor aj pre príbehy dieťaťa popri úlohách udrží nažive oboje.' } },
                    conceptual: { note: { en: '{first} thinks in ideas and {second} can follow either way, so pairing a big conversation with something to do keeps the child engaged.', sk: '{first} uvažuje v nápadoch a {second} vie ísť oboma smermi, takže keď sa veľký rozhovor spojí s nejakou činnosťou, dieťa zostane zaujaté.' } },
                },
                oneSidedSecondLeans: {
                    practical: { note: { en: '{second} learns by doing and {first} can meet that, so showing and trying together will usually teach more than telling.', sk: '{second} sa učí robením a {first} to vie prijať, takže ukázať a spolu vyskúšať zvyčajne naučí viac než rozprávať.' } },
                    conceptual: { note: { en: '{second} lives in ideas and stories and {first} can follow, so interest in the imagined world is often the best door into the practical one.', sk: '{second} žije v nápadoch a príbehoch a {first} to vie nasledovať, takže záujem o vymyslený svet je často najlepšími dverami do toho praktického.' } },
                },
            },
            child: {
                practical: {
                    shows: { en: 'is likely to learn most easily through hands-on activities, and to lose interest in long explanations', sk: 'sa pravdepodobne najľahšie učí pri praktických činnostiach a pri dlhom vysvetľovaní stráca záujem' },
                    needs: { en: 'What has been tried out by hand may stay longer than what has only been heard.', sk: 'Najviac si môže zapamätať to, čo si vyskúša vlastnými rukami.' },
                    support: { en: 'Show rather than tell, give a real part in any shared task, and keep explanations short and concrete.', sk: 'Radšej ukazuj než rozprávaj, pri spoločnej činnosti zver skutočnú úlohu a vysvetlenia drž krátke a konkrétne.' },
                },
                conceptual: {
                    shows: { en: 'leans toward stories, questions and imagined worlds, and may drift off in the middle of a practical task', sk: 'sa často nechá uniesť príbehmi, otázkami a vymyslenými svetmi a uprostred praktickej úlohy sa môže zasniť' },
                    needs: { en: 'Ideas can be a real form of engagement, and being taken seriously in them may make practical requests easier to hear.', sk: 'Nápady môžu byť skutočnou formou zapojenia a keď ich niekto berie vážne, praktické požiadavky sa potom môžu počúvať ľahšie.' },
                    support: { en: 'Listen to the idea first, then link the practical step to it, and let the story carry the routine along.', sk: 'Najprv si vypočuj nápad, potom k nemu pripoj praktický krok a nechaj príbeh, nech unesie aj rutinu.' },
                },
            },
        },
    },
    drives: {
        shared: {
            mastery: {
                gain: { en: '{both} respect effort and practice, so time spent getting better at something is easy to share and to support.', sk: '{both} si vážia úsilie a cvik, takže čas strávený zdokonaľovaním sa v niečom sa ľahko zdieľa aj podporuje.' },
                risk: { en: 'High standards can turn inward: a shared wish to do things well can become criticism of how the other person is doing.', sk: 'Vysoké nároky sa môžu obrátiť dovnútra vzťahu: spoločná túžba robiť veci dobre sa môže zmeniť na kritiku druhého človeka.' },
            },
            achievement: {
                gain: { en: '{both} light up at a goal, so a project, a match or a finished puzzle gives them something to celebrate together.', sk: '{both} sa tešia z cieľov, takže projekt, zápas alebo dokončená skladačka im dá spoločný dôvod na oslavu.' },
                risk: { en: 'When results are what both notice, effort and rest can go unpraised, and pressure can creep into play.', sk: 'Keď si každý z dvojice všíma najmä výsledky, úsilie a oddych môžu zostať bez uznania a do hry sa môže vkradnúť tlak.' },
            },
            recognition: {
                gain: { en: '{both} blossom when noticed, so praise and attention land warmly in both directions.', sk: '{both} rozkvitnú, keď si ich niekto všimne, takže pochvala a pozornosť padajú na úrodnú pôdu oboma smermi.' },
                risk: { en: 'Each may need to be seen at the very same moment, and attention can turn into something to compete for.', sk: 'Pozornosť môže každý z dvojice potrebovať v tej istej chvíli a stať sa predmetom súťaže.' },
            },
            meaning: {
                gain: { en: '{both} care about why things matter, so a question at bedtime can turn into a real conversation.', sk: '{both} hľadajú zmysel vecí, takže otázka pred spaním sa môže zmeniť na skutočný rozhovor.' },
                risk: { en: 'Ordinary chores can feel pointless to both, and the daily routine may need a reason before it gets done at all.', sk: 'Bežné povinnosti môžu obom pripadať zbytočné a denná rutina môže potrebovať dôvod, aby sa vôbec urobila.' },
            },
            belonging: {
                gain: { en: '{both} value being together, so family rituals and shared time come naturally.', sk: '{both} si cenia spolupatričnosť, takže rodinné rituály a spoločný čas prichádzajú prirodzene.' },
                risk: { en: 'Disagreement can feel like a threat to the bond, so differences may be smoothed over rather than said.', sk: 'Nezhoda môže pôsobiť ako hrozba pre puto, a tak sa rozdiely skôr zahladia, než vyslovia.' },
            },
            freedom: {
                gain: { en: '{both} need room, so neither tends to crowd the other and independence is respected early.', sk: '{both} potrebujú priestor, takže sa navzájom zvyčajne nedusia a samostatnosť sa rešpektuje odmalička.' },
                risk: { en: 'Two people who need room can drift apart under one roof, and a shared plan may be hard to agree on.', sk: 'Dvaja ľudia, ktorí potrebujú priestor, sa môžu pod jednou strechou vzďaľovať a dohodnúť sa na spoločnom pláne môže byť ťažké.' },
            },
            care: {
                gain: { en: '{both} notice when someone needs help, so kindness is part of an ordinary day.', sk: '{both} si všimnú, keď niekto potrebuje pomoc, takže láskavosť je súčasťou bežného dňa.' },
                risk: { en: 'Each may look after the other and forget to ask for anything back, and a child can end up carrying too much of the looking after.', sk: 'Každý sa môže starať o druhého a zabúdať na vlastné potreby a dieťa môže na seba prevziať priveľa starostlivosti.' },
            },
            understanding: {
                gain: { en: '{both} want to know how things work, so curiosity becomes a shared language.', sk: '{both} chcú vedieť, ako veci fungujú, takže zvedavosť je ich spoločný jazyk.' },
                risk: { en: 'Explaining can stand in for feeling, and an upset may get analysed when it first needs comfort.', sk: 'Vysvetľovanie môže nahradiť cit a rozrušenie sa môže rozoberať vtedy, keď najprv potrebuje útechu.' },
            },
            'self-expression': {
                gain: { en: '{both} make things and show them, so drawings, songs and performances find a ready audience.', sk: '{both} tvoria a ukazujú svoje výtvory, takže kresby, piesne aj predstavenia nájdu vďačné publikum.' },
                risk: { en: 'Two people who each want the stage can end up performing at once, with nobody left to watch.', sk: 'Dvaja ľudia, ktorí chcú byť na javisku, môžu skončiť tak, že vystupujú naraz a nikto sa nepozerá.' },
            },
            beauty: {
                gain: { en: '{both} notice beauty, so a walk, a song or a nicely laid table can be a shared pleasure.', sk: '{both} vnímajú krásu, takže prechádzka, pieseň či pekne prestretý stôl môžu byť spoločným potešením.' },
                risk: { en: 'Mess and noise can grate on both, and a household with children tends to have plenty of each.', sk: 'Neporiadok a hluk môžu oboch iritovať a v domácnosti s deťmi ich býva neúrekom.' },
            },
        },
        pullsApart: {
            'freedom|belonging': {
                gain: { en: '{p0} keeps the household open to the world and {p1} keeps everyone close, and a family needs both directions.', sk: '{p0} drží domácnosť otvorenú svetu a {p1} drží všetkých pokope, a rodina potrebuje oba smery.' },
                risk: { en: '{p1} wants more time together and {p0} wants more room; each request for closeness can feel like a leash, and each step away like a loss.', sk: '{p1} chce viac spoločného času a {p0} viac priestoru; každá prosba o blízkosť môže pôsobiť ako vodítko a každý krok preč ako strata.' },
                bridge: { en: 'When together-time is regular and predictable and the free time around it goes unquestioned, {p1} can count on closeness and {p0} can breathe.', sk: 'Keď je spoločný čas pravidelný a predvídateľný a voľno navyše nikto nespochybňuje, {p1} sa môže spoľahnúť na blízkosť a {p0} môže dýchať.' },
            },
            'achievement|care': {
                gain: { en: '{p0} pulls towards goals and {p1} towards looking after one another, so the household can be both ambitious and kind.', sk: '{p0} ťahá k cieľom a {p1} k vzájomnej starostlivosti, takže domácnosť môže byť ambiciózna aj láskavá.' },
                risk: { en: '{p0} measures a day by what got done and {p1} by how everyone felt, and each can find the opposite priority beside the point.', sk: '{p0} meria deň tým, čo sa urobilo, a {p1} tým, ako sa všetci cítili, a každý môže považovať opačnú prioritu za vedľajšiu.' },
                bridge: { en: 'When the end of the day names both, what was achieved and who was looked after, {p0} and {p1} can each feel that their way counted.', sk: 'Keď sa na konci dňa pomenuje oboje, čo sa podarilo aj o koho sa kto postaral, {p0} aj {p1} môžu cítiť, že ich spôsob sa počítal.' },
            },
            'recognition|understanding': {
                gain: { en: 'Praise and understanding meet here: {p0} flourishes on being noticed and {p1} on being truly understood, which can make attention in this home run deep.', sk: 'Pochvala a porozumenie sa tu stretávajú: {p0} rozkvitá pri uznaní a {p1} pri skutočnom porozumení, takže pozornosť v tomto domove môže ísť do hĺbky.' },
                risk: { en: '{p0} wants quick praise and {p1} wants to be understood, so a quick “well done” can satisfy one and feel hollow to the other.', sk: '{p0} chce rýchlu pochvalu a {p1} porozumenie, takže rýchle „výborne“ jedného poteší a druhému môže pripadať prázdne.' },
                bridge: { en: '{p0} hears the praise out loud and {p1} hears the question that goes deeper (“what was the hard part?”), and each gets what is needed.', sk: '{p0} dostane pochvalu nahlas a {p1} otázku, ktorá ide hlbšie („čo bolo na tom najťažšie?“), a každý dostane to, čo potrebuje.' },
            },
        },
        different: {
            gain: { en: 'Different pulls give the home two directions to grow in, and {p0} and {p1} can each open a door the other would not have found.', sk: 'Rôzne túžby dávajú domovu dva smery rastu a {p0} aj {p1} môžu otvoriť dvere, ktoré by druhý človek nenašiel.' },
            risk: { en: 'What one finds obviously worthwhile may leave the other unmoved, and at home it is easy to steer towards one’s own pull without noticing.', sk: 'To, čo jeden považuje za samozrejmú hodnotu, druhého človeka nemusí vôbec osloviť, a doma sa dá ľahko, bez povšimnutia, ísť len za vlastným ťahom.' },
            bridge: { en: 'When {p0} and {p1} ask about the other pull, what makes it worthwhile, and join it now and then, the difference stays a difference and not a contest.', sk: 'Keď sa {p0} a {p1} zaujímajú o to, čo priťahuje druhého človeka, pýtajú sa, čo je na tom pekné, a občas sa pridajú, rozdiel zostane rozdielom a nezmení sa na súťaž.' },
        },
        drawnTo: {
            mastery: { one: { en: 'is drawn to getting really good at something', sk: 'túži naozaj niečo dobre ovládať' }, many: { en: 'are drawn to getting really good at things', sk: 'túžia naozaj niečo dobre ovládať' } },
            achievement: { one: { en: 'is drawn to reaching goals and finishing what was started', sk: 'chce dosahovať ciele a dotiahnuť začaté do konca' }, many: { en: 'are drawn to reaching goals and finishing what was started', sk: 'chcú dosahovať ciele a dotiahnuť začaté do konca' } },
            recognition: { one: { en: 'is drawn to being seen and appreciated for what is done', sk: 'túži, aby si niekto všimol a ocenil, čo urobí' }, many: { en: 'are drawn to being seen and appreciated for what is done', sk: 'túžia, aby si niekto všimol a ocenil, čo urobia' } },
            meaning: { one: { en: 'is drawn to understanding why things matter', sk: 'hľadá, prečo na veciach záleží' }, many: { en: 'are drawn to understanding why things matter', sk: 'hľadajú, prečo na veciach záleží' } },
            belonging: { one: { en: 'is drawn to feeling part of the family and the group', sk: 'túži patriť do rodiny a do partie' }, many: { en: 'are drawn to feeling part of the family and the group', sk: 'túžia patriť do rodiny a do partie' } },
            freedom: { one: { en: 'is drawn to room to choose and to move', sk: 'túži po priestore vyberať si a hýbať sa' }, many: { en: 'are drawn to room to choose and to move', sk: 'túžia po priestore vyberať si a hýbať sa' } },
            care: { one: { en: 'is drawn to looking after others', sk: 'má potrebu starať sa o druhých' }, many: { en: 'are drawn to looking after others', sk: 'majú potrebu starať sa o druhých' } },
            understanding: { one: { en: 'is drawn to knowing how things and people work', sk: 'chce vedieť, ako fungujú veci a ľudia' }, many: { en: 'are drawn to knowing how things and people work', sk: 'chcú vedieť, ako fungujú veci a ľudia' } },
            'self-expression': { one: { en: 'is drawn to making and showing something personal', sk: 'túži tvoriť a ukázať niečo vlastné' }, many: { en: 'are drawn to making and showing something personal', sk: 'túžia tvoriť a ukázať niečo vlastné' } },
            beauty: { one: { en: 'is drawn to beautiful things, sounds and places', sk: 'vníma krásu vecí, zvukov a miest' }, many: { en: 'are drawn to beautiful things, sounds and places', sk: 'vnímajú krásu vecí, zvukov a miest' } },
        },
    },
    kinds: {
        'parent-child': {
            frame: { en: '{both} are read here as a parent and a growing child: two styles meeting, not two fixed types.', sk: '{both} sú tu rodič a dieťa, ktoré ešte rastie: dva rôzne štýly v jednom vzťahu, nie dva pevné typy.' },
            lens: { en: 'The adult holds most of the room to adapt, and a child’s style is a tendency still forming, not a verdict.', sk: 'Prispôsobiť sa môže najmä dospelý človek; štýl dieťaťa je sklon, ktorý sa ešte len formuje, nie hotová vec.' },
            roles: [{ en: 'the parent', sk: 'rodič' }, { en: 'the child', sk: 'dieťa' }],
            consequence: {
                'change-and-steadiness': { en: 'Between a parent and a child, the adult usually controls the timing of changes, so the warning, the pace and the familiar thread are largely in the adult’s hands.', sk: 'Medzi rodičom a dieťaťom má načasovanie zmien zvyčajne v rukách dospelý človek, takže upozornenie, tempo aj známa niť závisia najmä od dospelého človeka.' },
                'structure-and-flexibility': { en: 'Rules here are the adult’s to set, which also makes them the adult’s to adjust: a frame that fits this child matters more than one that fits most children.', sk: 'Pravidlá tu určuje dospelý človek, a teda ich môže aj upraviť: dôležitejší je rámec, ktorý sedí práve tomuto dieťaťu, než ten, ktorý sedí väčšine detí.' },
                'emotional-expression': { en: 'A child learns a good deal about handling feelings by watching the adults, so the way a parent recovers from a hard moment teaches as much as any words.', sk: 'Dieťa sa veľa o zvládaní citov naučí pozorovaním dospelých, takže to, ako sa rodič spamätá z ťažkej chvíle, učí rovnako ako slová.' },
                'taking-the-lead': { en: 'Between a parent and a child the question is not who wins but how much say fits the child’s age, with firm limits kept for safety and real choices offered elsewhere.', sk: 'Medzi rodičom a dieťaťom nejde o to, kto vyhrá, ale o to, koľko slova zodpovedá veku dieťaťa: pevné hranice pre bezpečnosť a skutočné voľby všade inde.' },
                'closeness-and-room': { en: 'The right distance shifts with age, since a toddler and a teenager need very different things, and the adult’s task is to keep adjusting it.', sk: 'Správny odstup sa mení s vekom, lebo batoľa a tínedžer potrebujú veľmi odlišné veci, a úlohou dospelého človeka je odstup priebežne dolaďovať.' },
                'processing-pace': { en: 'When an upset happens the adult’s tempo sets the tone, so it usually helps most when the adult matches the child’s pace rather than the other way round.', sk: 'Keď príde rozrušenie, tempo dospelého človeka udáva tón, takže zvyčajne najviac pomôže, keď sa dospelý človek prispôsobí tempu dieťaťa, a nie naopak.' },
            },
        },
        'caregiver-child': {
            frame: { en: '{both} are read here as a caregiver and a child who leans on the adult’s steadiness.', sk: '{both} sú tu dospelý človek, ktorý sa o dieťa stará, a dieťa, ktoré sa opiera o stálosť dospelého človeka.' },
            lens: { en: 'The adult holds most of the room to adapt, in step with the household’s rules; a child’s style is a tendency still forming, not a verdict.', sk: 'Prispôsobiť sa môže najmä dospelý človek, a to v súlade s pravidlami domácnosti; štýl dieťaťa je sklon, ktorý sa ešte len formuje, nie hotová vec.' },
            roles: [{ en: 'the caregiver', sk: 'opatrujúci dospelý človek' }, { en: 'the child', sk: 'dieťa' }],
            consequence: {
                'structure-and-flexibility': { en: 'A caregiver usually shares the frame with the parents, so agreeing the main rules with them spares the child two different systems.', sk: 'Opatrujúci dospelý človek zvyčajne zdieľa rámec s rodičmi, takže dohoda o hlavných pravidlách ušetrí dieťa stretu s dvoma rôznymi systémami.' },
                'change-and-steadiness': { en: 'Handovers between home and care are transitions in their own right, and a familiar goodbye ritual can ease them for a child who finds change hard.', sk: 'Odovzdávanie medzi domovom a starostlivosťou mimo rodiny je samo osebe prechodom a známy rituál rozlúčky môže tento prechod uľahčiť dieťaťu, ktoré zmeny znáša ťažko.' },
                'emotional-expression': { en: 'A child may show feelings differently in care than at home, so what is seen in care is one view of the child, not the whole picture.', sk: 'Dieťa môže pri opatrujúcom dospelom človeku ukazovať city inak než doma, takže to, čo vidno pri starostlivosti mimo rodiny, je jeden pohľad na dieťa, nie celý obraz.' },
                'closeness-and-room': { en: 'Trust with a caregiver is built over time, so a child who keeps some distance at first is usually taking the measure of things, not refusing.', sk: 'Dôvera k opatrujúcemu dospelému človekovi rastie postupne, takže dieťa, ktoré si spočiatku drží odstup, zvyčajne len zisťuje, ako sa veci majú, a neodmieta.' },
            },
        },
        'siblings-in-household': {
            frame: { en: '{both} are read here as two children growing up in one home: two different people, not a better and a worse version of each other.', sk: '{both} sú tu dve deti, ktoré vyrastajú v jednom domove: dve rôzne osobnosti, nie lepšia a horšia verzia jedného dieťaťa.' },
            lens: { en: 'Each child’s style is a tendency still forming, and neither child is measured against the other.', sk: 'Štýl každého dieťaťa je sklon, ktorý sa ešte len formuje, a ani jedno dieťa sa tu neporovnáva s druhým.' },
            consequence: {
                'taking-the-lead': { en: 'Between siblings, who leads can harden into a fixed role; adults who protect turn-taking keep both voices in practice.', sk: 'Medzi súrodencami sa to, kto vedie, môže zmeniť na pevnú rolu; dospelí, ktorí chránia striedanie, udržia v cviku oba hlasy.' },
                'closeness-and-room': { en: 'Siblings who share a room or a parent’s attention often need both shared time and protected time apart, and the adults can arrange both.', sk: 'Súrodenci, ktorí zdieľajú izbu alebo pozornosť rodiča, často potrebujú spoločný čas aj chránený čas oddelene a dospelí môžu zariadiť oboje.' },
                'emotional-expression': { en: 'When one child is loud and the other quiet, the quiet child’s needs are easily overlooked, and a short check-in after the storm keeps things fair.', sk: 'Keď je jedno dieťa hlučné a druhé tiché, potreby toho tichšieho sa ľahko prehliadnu a krátka otázka po búrke udrží férovosť.' },
                'pulls-apart': { en: 'Children who want different things from family life are easily compared; explaining differences openly, by age and need, keeps a comparison from becoming a ranking.', sk: 'Deti, ktoré od rodinného života chcú rôzne veci, sa ľahko porovnávajú; otvorené vysvetlenie rozdielov podľa veku a potrieb zabráni, aby sa porovnanie zmenilo na rebríček.' },
                'change-and-steadiness': { en: 'One child’s excitement about a change can be the other’s upheaval, so the same news may need telling in two ways.', sk: 'Nadšenie jedného dieťaťa zo zmeny môže byť pre druhé otrasom, takže tú istú správu možno treba povedať dvoma spôsobmi.' },
            },
        },
    },
    practices: [
        /* ---- processing-pace: a child who withdraws, a child who talks it out ---- */
        {
            id: 'par.when-quiet-persists',
            title: { en: 'When going quiet becomes a pattern', sk: 'Keď sa stíchnutie stane vzorcom' },
            body: { en: 'Keep a gentle, standing invitation (“you can tell me anything, even the small stuff”) and notice what the quiet comes with. Going inward to settle is a style; worry, low mood or avoiding friends that lasts for weeks, or shows up at school as well as at home, is worth raising with the paediatrician or a child psychologist.', sk: 'Udržuj jemné, trvalé pozvanie („môžeš mi povedať čokoľvek, aj maličkosti“) a všímaj si, čo ticho sprevádza. Stiahnuť sa do seba kvôli upokojeniu je štýl; starosti, skleslosť alebo vyhýbanie sa kamarátom, ktoré trvajú týždne alebo sa ukazujú v škole aj doma, je dobré prebrať s pediatrom alebo detským psychológom.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'processing-pace', kinds: ADULT_CHILD, context: ['withdraws-when-upset'], ages: FROM_PRESCHOOL },
            sources: ['PAR-032', 'PAR-052'],
        },
        {
            id: 'par.near-not-asking',
            title: { en: 'Stay near, ask later', sk: 'Buď nablízku, pýtaj sa neskôr' },
            body: { en: 'When the child goes quiet after an upset, let the questions wait. Stay in the same room or close by with something ordinary to do, and let one sentence say the door is open (“whenever you’re ready”). Once things have settled, reopen it yourself, gently, so that coming back to it does not rest on the child alone.', sk: 'Keď dieťa po rozrušení stíchne, nechaj otázky počkať. Zostaň v tej istej miestnosti alebo neďaleko pri nejakej obyčajnej činnosti a jednou vetou daj najavo, že dvere sú otvorené („keď budeš chcieť“). Keď sa situácia upokojí, jemne sa k veci vráť ty, aby návrat nezávisel len od dieťaťa.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'processing-pace', childPoles: ['introspective'], kinds: ADULT_CHILD, ages: FROM_TODDLER },
            sources: ['PAR-013', 'PAR-032'],
        },
        {
            id: 'par.ear-before-advice',
            title: { en: 'An ear before advice', sk: 'Najprv ucho, potom rada' },
            body: { en: 'When the child arrives with a story at full speed, put the phone down and listen to the end before offering any fix. Say back the heart of it in a few words (“so it felt really unfair”) and wait; often that is all that was needed, and the solution can come later, quite possibly from the child.', sk: 'Keď dieťa prinesie príbeh v plnej rýchlosti, odlož telefón a počúvaj až do konca, skôr než ponúkneš riešenie. Zopakuj pár slovami jadro („takže ti to prišlo naozaj nespravodlivé“) a počkaj; často je to všetko, čo bolo treba, a riešenie môže prísť neskôr, pokojne aj od dieťaťa.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'processing-pace', childPoles: ['outwardly-engaged'], kinds: ADULT_CHILD, ages: FROM_PRESCHOOL },
            sources: ['PAR-013', 'PAR-014'],
        },
        /* ---- emotional-expression: emotion coaching, repair, quiet and loud feelings ---- */
        {
            id: 'par.feelings-first-young',
            title: { en: 'Feelings first with little ones', sk: 'S malými najprv pocity' },
            body: { en: 'In a meltdown, get down to the child’s level, keep words very few and stay close until the peak has passed; explaining can wait. Afterwards, give the feeling one plain name (“that was a big, cross feeling”). Protect regular meals and naps, since storms tend to gather around hunger and tiredness, and meet hitting or throwing firmly and the same way every time.', sk: 'Pri záchvate zlosti sa zohni na úroveň dieťaťa, hovor len pár slov a zostaň nablízku, kým vrchol neprejde; vysvetľovanie počká. Potom pocit pomenuj jednoducho („to bola veľká zlosť“). Stráž pravidelné jedlo a spánok, lebo pri hlade a únave sa búrky zvyknú zbierať, a na udieranie či hádzanie reaguj pevne a zakaždým rovnako.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'emotional-expression', kinds: ADULT_CHILD, ages: YOUNG },
            sources: ['PAR-014', 'PAR-015'],
        },
        {
            id: 'par.feelings-first',
            title: { en: 'Name the feeling, then the limit', sk: 'Najprv pocit, potom hranica' },
            body: { en: 'When feelings run high, start by naming and accepting what is felt (“you’re furious that the game ended”), and only then set the limit on what is done with it (“and the controller isn’t for throwing”). Accepting a feeling is not accepting the behaviour; it tends to make the limit easier to hear.', sk: 'Keď emócie vrcholia, začni pomenovaním a prijatím pocitu („zúriš, že sa hra skončila“) a až potom stanov hranicu pre to, čo sa s pocitom robí („ale ovládač sa nehádže“). Prijať pocit neznamená prijať správanie; hranica sa potom zvyčajne lepšie počúva.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'emotional-expression', kinds: ADULT_CHILD, ages: FROM_SCHOOL },
            sources: ['PAR-013', 'PAR-010'],
        },
        {
            id: 'par.repair',
            title: { en: 'Repair after losing patience', sk: 'Náprava po strate trpezlivosti' },
            body: { en: 'Every adult loses patience sometimes; what teaches most is the return. Once things have calmed, go back to the child, name what happened without a lecture (“I raised my voice, and that wasn’t fair to you”), and say what you will try next time. If it happens often, treat that as a sign of strain worth getting support for, not as a personal failing.', sk: 'Trpezlivosť občas stratí každý dospelý človek; najviac naučí návrat. Keď sa situácia upokojí, vráť sa k dieťaťu, bez kázania pomenuj, čo sa stalo („zvýšil sa mi hlas a to nebolo voči tebe fér“), a povedz, čo skúsiš nabudúce. Ak sa to stáva často, ber to ako znak preťaženia, pri ktorom treba hľadať podporu, nie ako osobné zlyhanie.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'emotional-expression', relations: ['opposed'], kinds: ADULT_CHILD, ages: FROM_TODDLER },
            sources: ['PAR-019', 'PAR-013', 'PAR-040'],
        },
        {
            id: 'par.calm-adult',
            title: { en: 'Lower your own volume', sk: 'Stíš najprv seba' },
            body: { en: 'When the child’s feeling is loud, lower your own volume: a slow breath, fewer words, a steady face. Children learn a good deal about calming down by watching adults do it, and a harsh or heated response tends to feed the very intensity it is meant to stop.', sk: 'Keď je pocit dieťaťa hlučný, stíš ten svoj: pomalý dych, menej slov, pokojná tvár. Deti sa veľa o upokojovaní učia tým, že pozorujú dospelých, a prudká či ostrá reakcia zvyčajne živí práve tú intenzitu, ktorú chce zastaviť.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'emotional-expression', childPoles: ['emotionally-expressive'], kinds: ADULT_CHILD },
            sources: ['PAR-013', 'PAR-003', 'PAR-002'],
        },
        {
            id: 'par.side-door-feelings',
            title: { en: 'A side door for quiet feelings', sk: 'Bočné dvere pre tiché city' },
            body: { en: 'Some feelings come out more easily side by side than face to face. Offer regular, low-key openings, such as a walk, a drive, cooking together or the last minutes of the evening, and ask one light question without pressing for an answer. If a stomach ache, low mood or short temper keeps returning for weeks, check in with the paediatrician.', sk: 'Niektoré city vychádzajú ľahšie bok po boku než v rozhovore z očí do očí. Ponúkaj pravidelné nenápadné príležitosti, napríklad prechádzku, cestu autom, spoločné varenie či posledné minúty večera, a polož jednu ľahkú otázku bez naliehania na odpoveď. Ak sa bolesť brucha, skleslosť alebo podráždenosť týždne vracia, poraď sa s pediatrom.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'emotional-expression', childPoles: ['emotionally-contained'], kinds: ADULT_CHILD, ages: FROM_PRESCHOOL },
            sources: ['PAR-013', 'PAR-052'],
        },
        /* ---- structure-and-flexibility: coordinating adults, routines, rules ---- */
        {
            id: 'par.adults-one-frame',
            title: { en: 'Two adults, one frame', sk: 'Dva hlasy, jeden rámec' },
            body: { en: 'Agree with the other adult, away from the child, which few routines and rules hold whoever is in charge, and let the rest differ. When the child points out a difference (“but I’m allowed to when you’re not here”), answer without criticising the other adult: “some things differ, and these few stay the same”. If talking with the other adult does not feel safe, set this aside and look for support instead.', sk: 'S druhým dospelým sa bez dieťaťa dohodni, ktoré z rutín a pravidiel platia bez ohľadu na to, kto je práve pri dieťati, a zvyšok nechaj, nech sa líši. Keď dieťa na rozdiel upozorní („keď tu nie si, tak to smiem“), odpovedz bez kritiky druhého dospelého človeka: „Niečo sa líši, ale týchto pár vecí platí u oboch.“ Ak rozhovor s druhým dospelým nepôsobí bezpečne, odlož to a radšej hľadaj podporu.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'structure-and-flexibility', kinds: ADULT_CHILD, context: ['parents-disagree-on-approach'] },
            sources: ['PAR-038', 'PAR-039'],
        },
        {
            id: 'par.few-anchors',
            title: { en: 'A few warm anchors', sk: 'Niekoľko teplých kotiev' },
            body: { en: 'Pick three or four moments that run the same way on most days, such as breakfast, the goodbye at the door and the evening wind-down, and keep those moments predictable and warm rather than rigid. Around those few fixed points the rest of the day can stay as loose as it likes; on a chaotic day, keeping just one still helps.', sk: 'Vyber si tri či štyri chvíle, ktoré väčšinu dní prebiehajú rovnako, napríklad raňajky, rozlúčku pri dverách a večerné stíšenie, a udržuj ich predvídateľné a vľúdne, nie strnulé. Okolo týchto pár pevných bodov môže zvyšok dňa zostať voľný; v chaotický deň pomôže, aj keď sa udrží jediný z nich.' },
            audience: { kind: 'role', role: 'first' },
            /* for a day nobody holds steady (both improvise), or a child who leans on order beside an adult who does not: not a both-ways card */
            triggers: { dynamic: 'structure-and-flexibility', kinds: ADULT_CHILD, mechanisms: ['structure-and-flexibility/shared:adaptable', 'structure-and-flexibility/opposed:adaptable', 'structure-and-flexibility/oneSided:structured:second', 'structure-and-flexibility/oneSided:adaptable:first'] },
            sources: ['PAR-024', 'PAR-019'],
        },
        {
            id: 'par.rules-ahead',
            title: { en: 'Rules said ahead, kept calmly', sk: 'Pravidlá vopred, držané pokojne' },
            body: { en: 'Pick the handful of rules you care about most and say each one before the moment it applies rather than in the middle of it (“before we sit down: screens go off at dinner”). Then let the rule do the work: say it once, calmly, follow through consistently, and leave threats, shouting and shame out of it.', sk: 'Vyber si hŕstku pravidiel, ktoré sú pre teba najdôležitejšie, a každé povedz skôr, než nastane chvíľa, keď platí, nie až uprostred situácie („skôr než si sadneme: pri večeri sú obrazovky vypnuté“). Potom už stačí pravidlo raz pokojne pripomenúť, zakaždým rovnako dodržať a vynechať vyhrážky, krik aj zahanbovanie.' },
            audience: { kind: 'role', role: 'first' },
            /* for a child who lets rules slip, whoever holds the plan; not for two who both lean on order */
            triggers: { dynamic: 'structure-and-flexibility', kinds: ADULT_CHILD, ages: FROM_TODDLER, mechanisms: ['structure-and-flexibility/opposed:structured', 'structure-and-flexibility/shared:adaptable', 'structure-and-flexibility/oneSided:adaptable:second', 'structure-and-flexibility/oneSided:structured:first'] },
            sources: ['PAR-019', 'PAR-010', 'PAR-012'],
        },
        /* ---- change-and-steadiness: transitions and novelty ---- */
        {
            id: 'par.transition-storms',
            title: { en: 'When change sets off a storm', sk: 'Keď zmena spustí búrku' },
            body: { en: 'Notice when the strongest reactions happen; such moments tend to cluster at handovers, endings and tired times. Build a small, warm ritual into those moments, such as the same goodbye phrase or a song for leaving the park, protect food and rest around those moments, and keep your own reaction calm. If reactions are sudden, new or extreme, check health, sleep and stress with the paediatrician.', sk: 'Všímaj si, kedy prichádzajú najsilnejšie reakcie; často sa zhlukujú pri odovzdávaní, pri koncoch a v unavených chvíľach. Do týchto chvíľ vlož malý, vľúdny rituál, napríklad tú istú vetu na rozlúčku alebo pesničku na odchod z ihriska, postráž okolo nich jedlo a oddych a vlastnú reakciu drž pokojnú. Ak sú reakcie náhle, nové alebo extrémne, preber zdravie, spánok a stres s pediatrom.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'change-and-steadiness', kinds: ADULT_CHILD, context: ['strong-reactions-to-change'], ages: UP_TO_SCHOOL },
            sources: ['PAR-024', 'PAR-015', 'PAR-002'],
        },
        {
            id: 'par.change-run-up',
            title: { en: 'Give change a run-up', sk: 'Daj zmene rozbeh' },
            body: { en: 'Before a switch, say what comes next in the order it will happen (“after this game: bath, then our usual story”). For a bigger change, start talking about it early, keep the familiar parts of the day exactly as before, and let a known object or ritual come along as a bridge. Warning and a gradual start tend to help more than hurrying.', sk: 'Pred prechodom povedz, čo príde, v poradí, v akom to príde („po tejto hre kúpanie a potom naša rozprávka“). O väčšej zmene začni hovoriť včas, známe časti dňa nechaj presne také, aké boli, a ako most nech poslúži známy predmet alebo rituál. Upozornenie a pozvoľný začiatok zvyčajne pomôžu viac než súrenie.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'change-and-steadiness', childPoles: ['stability-seeking'], kinds: ADULT_CHILD, ages: UP_TO_SCHOOL },
            sources: ['PAR-002', 'PAR-024'],
        },
        {
            id: 'par.new-inside-routine',
            title: { en: 'Something new, inside the routine', sk: 'Niečo nové vnútri rutiny' },
            body: { en: 'Keep the core of the week steady and plan a regular dose of novelty that the child gets to choose: a new route home, a recipe, a place to explore, a small project. Novelty with a frame tends to calm the restlessness of a child who craves the new, and can spare the household constant upheaval.', sk: 'Jadro týždňa drž stabilné a naplánuj pravidelnú dávku novôt, ktorú si dieťa vyberie samo: novú cestu domov, recept, miesto na objavovanie, malý projekt. Novota s rámcom zvyčajne utíši nepokoj dieťaťa, ktoré túži po novom, a domácnosti môže ušetriť neustále otrasy.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'change-and-steadiness', childPoles: ['novelty-seeking'], kinds: ADULT_CHILD, ages: FROM_TODDLER },
            sources: ['PAR-002', 'PAR-024', 'PAR-012'],
        },
        /* ---- closeness-and-room: independence and company ---- */
        {
            id: 'par.let-the-attempt-run',
            title: { en: 'Let the attempt run', sk: 'Daj čas na vlastný pokus' },
            body: { en: 'When the child wants to manage alone, leave the extra minutes it takes and keep your hands still, even when it goes slowly or comes out crooked. Ask before helping (“do you want a hand, or shall I just watch?”), and step in uninvited only when safety needs it. Afterwards, ask how it went before adding what you saw.', sk: 'Keď chce dieťa niečo zvládnuť samo, nechaj na to minúty navyše a ruky drž pri sebe, aj keď to ide pomaly alebo to nevyjde úplne rovno. Skôr než pomôžeš, opýtaj sa („chceš pomôcť, alebo sa mám len pozerať?“) a bez pozvania zasiahni iba vtedy, keď ide o bezpečnosť. Potom sa najprv opýtaj, ako to išlo, a až potom pridaj vlastný pohľad.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'closeness-and-room', childPoles: ['independent'], kinds: ADULT_CHILD, ages: UP_TO_MIDDLE },
            sources: ['PAR-010', 'PAR-012'],
        },
        {
            id: 'par.available-not-in-charge',
            title: { en: 'Be there, leave the decision', sk: 'Buď poruke, rozhodnutie nechaj' },
            body: { en: 'When the child is working something out alone, offer availability rather than help: one question (“do you want ideas, or just someone to hear it?”) and then exactly what was asked for. Leave the decision where it was, and let it be known that a second opinion is there whenever it is wanted.', sk: 'Keď mladý človek niečo rieši po svojom, ponúkni skôr dostupnosť než pomoc: jednu otázku („chceš nápady, alebo len niekoho, kto ťa vypočuje?“) a potom presne to, o čo požiada. Rozhodnutie nechaj tam, kde bolo, a daj najavo, že druhý názor je k dispozícii, kedykoľvek bude treba.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'closeness-and-room', childPoles: ['independent'], kinds: ADULT_CHILD, ages: ['early-adolescence-13-15', 'late-adolescence-16-18'] },
            sources: ['PAR-010', 'PAR-012'],
        },
        {
            id: 'par.alongside-then-apart',
            title: { en: 'Start alongside, step back slowly', sk: 'Začni po boku, ustupuj pomaly' },
            body: { en: 'For a child who wants company in what is being done, begin side by side. Then step back in small, announced stages, for instance “I’ll do the first page with you, then I’ll be at the table”. Independence that grows out of closeness tends to feel like a step the child chose rather than being sent away.', sk: 'Pri dieťati, ktoré chce mať pri činnosti spoločnosť, začni bok po boku. Potom ustupuj po malých, ohlásených krokoch, napríklad „prvú stranu urobíme spolu, potom budem pri stole“. Samostatnosť, ktorá vyrastá z blízkosti, zvyčajne pôsobí ako krok, ktorý si dieťa vybralo, a nie ako odohnanie.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'closeness-and-room', childPoles: ['collaborative'], kinds: ADULT_CHILD, ages: UP_TO_MIDDLE },
            sources: ['PAR-010', 'PAR-012'],
        },
        {
            id: 'par.easy-to-tell',
            title: { en: 'Make telling easy', sk: 'Nech je ľahké povedať to' },
            body: { en: 'With a young teenager, what an adult knows tends to come from what is told freely, not from tracking or questioning. Make telling easy: let the first reaction be interest rather than alarm, and say plainly what any check is for. Signs of self-harm or exploitation are the exception: then act at once, and get professional help.', sk: 'U mladého tínedžera to, čo dospelý človek vie, zvyčajne pochádza z toho, čo sa povie dobrovoľne, nie zo sledovania či vypočúvania. Uľahči rozprávanie: prvou reakciou nech je záujem, nie poplach, a jasne povedz, načo slúži akákoľvek kontrola. Výnimkou sú znaky sebapoškodzovania alebo zneužívania: vtedy konaj hneď a vyhľadaj odbornú pomoc.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'closeness-and-room', kinds: ADULT_CHILD, ages: ['early-adolescence-13-15'] },
            sources: ['PAR-030', 'PAR-052'],
        },
        /* ---- taking-the-lead: limits, choices, clashes ---- */
        {
            id: 'par.say-in-rules',
            title: { en: 'A real say, a firm few', sk: 'Skutočné slovo, pár pevných bodov' },
            body: { en: 'When a rule is pushed against in the moment, say it once, in a steady voice, and leave the argument about the rule itself for later; threats and guilt stay out of it. If the same push keeps returning, talk the rule over at a quiet time and let the child shape the parts that can bend. A strong will tends to accept a firm limit more readily when it has a real say elsewhere.', sk: 'Pri odpore proti pravidlu stačí pravidlo raz pevným hlasom pripomenúť a spor o samotné pravidlo nechať na neskôr; vyhrážky a vyvolávanie viny do toho nepatria. Ak sa ten istý odpor stále vracia, preber pravidlo v pokojnej chvíli a o tom, čo sa môže ohnúť, sa dohodni spoločne. Silná vôľa zvyčajne ľahšie prijme pevnú hranicu, keď inde dostane skutočné slovo.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'taking-the-lead', kinds: ADULT_CHILD, context: ['resists-rules'], ages: FROM_PRESCHOOL },
            sources: ['PAR-010', 'PAR-012'],
        },
        {
            id: 'par.two-small-choices',
            title: { en: 'Two small choices', sk: 'Dve malé voľby' },
            body: { en: 'Where a plain yes or no would invite a standoff, offer two options you are happy with: “shoes first or coat first?”, “hop to the car or tiptoe?”. A small, real choice meets the push for independence without moving the limit, and it often defuses the moment before it becomes a tantrum.', sk: 'Tam, kde by obyčajné áno alebo nie viedlo k pretláčaniu, ponúkni dve možnosti, s ktorými súhlasíš: „najprv topánky, alebo bundu?“, „k autu poskočíme, alebo pôjdeme po špičkách?“. Malá skutočná voľba vyjde v ústrety túžbe po samostatnosti bez posunutia hranice a často zažehná napätie skôr, než príde záchvat zlosti.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'taking-the-lead', kinds: ADULT_CHILD, ages: YOUNG },
            sources: ['PAR-015', 'PAR-010'],
        },
        {
            id: 'par.same-clash',
            title: { en: 'When the same clash keeps returning', sk: 'Keď sa ten istý stret stále vracia' },
            body: { en: 'Name the pattern as a difference between two ways, not a flaw in either: “I want to decide fast and you need to have your say; let’s find how both can fit”. Keep your own reactions calm and predictable, and adjust the adult side first, where the most room usually is.', sk: 'Pomenuj vzorec ako rozdiel medzi dvoma spôsobmi, nie ako chybu jedného či druhého: „Ja sa chcem rozhodnúť rýchlo a ty potrebuješ povedať svoje; poďme zistiť, ako sa zmestí oboje“. Vlastné reakcie drž pokojné a predvídateľné a začni úpravami na strane dospelého človeka, kde býva najviac priestoru.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed'], kinds: ADULT_CHILD, ages: FROM_TODDLER, adultPoles: ['assertive'] },
            sources: ['PAR-003'],
        },
        {
            id: 'par.ask-and-wait',
            title: { en: 'Ask, then wait', sk: 'Opýtaj sa a počkaj' },
            body: { en: 'An easy-going child can go along so readily that real preferences stay hidden. Ask directly and specifically (“which of these do you want?”), let the child choose first now and then, and wait through the pause instead of filling it. Welcome the occasional “no” as a sign that a voice of its own is growing.', sk: 'Ústretové dieťa sa vie prispôsobiť tak ochotne, že skutočné želania zostanú skryté. Pýtaj sa priamo a konkrétne („ktoré z toho chceš?“), občas nechaj dieťa vyberať ako prvé a ticho pred odpoveďou nevypĺňaj. Občasné „nie“ privítaj ako znak, že rastie vlastný hlas.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'taking-the-lead', childPoles: ['receptive'], kinds: ADULT_CHILD, ages: FROM_PRESCHOOL },
            sources: ['PAR-010', 'PAR-012'],
        },
        /* ---- risk-and-caution ---- */
        {
            id: 'par.small-steps',
            title: { en: 'Small steps, no push, no rescue', sk: 'Malé kroky, bez tlačenia a bez záchrany' },
            body: { en: 'Treat caution with the new as a way of approaching the world, not a fault. Prepare ahead, stay close at first, and offer one small next step (“shall we watch from the bench, then say hello?”). Let “not yet” count as a fair answer, and say out loud when a step has been taken, however small.', sk: 'Opatrnosť voči novému ber ako spôsob, akým dieťa pristupuje k svetu, nie ako chybu. Priprav sa vopred, spočiatku zostaň nablízku a ponúkni jeden malý ďalší krok („pozrieme sa najprv z lavičky a potom pozdravíme?“). „Ešte nie“ ber ako férovú odpoveď a nahlas povedz, keď sa nejaký krok podarí, hoci aj malý.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'risk-and-caution', childPoles: ['cautious'], kinds: ADULT_CHILD, ages: UP_TO_SCHOOL },
            sources: ['PAR-002', 'PAR-012'],
        },
        {
            id: 'par.safety-lines',
            title: { en: 'Few lines, firmly held', sk: 'Málo hraníc, pevne držaných' },
            body: { en: 'For a child drawn to daring, name the two or three safety lines that are truly non-negotiable, explain each one once, and hold those lines the same way every time. Then say yes, with interest, to bounded adventure everywhere else: the climbing wall, the bike trail, the new sport. A short list held firmly tends to be heard, where a stream of warnings tends to be tuned out.', sk: 'Pri dieťati, ktoré láka odvaha, pomenuj dve či tri bezpečnostné hranice, o ktorých sa naozaj nevyjednáva, raz ich vysvetli a drž ich zakaždým rovnako. Na všetko ostatné, lezeckú stenu, cyklotrasu, nový šport, povedz so záujmom áno, no s hranicami. Krátky zoznam pevne držaných pravidiel sa zvyčajne počuje, kým prúd varovaní dieťa zvyčajne prestane vnímať.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'risk-and-caution', childPoles: ['risk-oriented'], kinds: ADULT_CHILD, ages: FROM_TODDLER },
            sources: ['PAR-012', 'PAR-019'],
        },
        /* ---- social-energy ---- */
        {
            id: 'par.protect-recharge',
            title: { en: 'Protect the quiet stretch', sk: 'Chráň chvíľu ticha' },
            body: { en: 'After a busy day, let a quiet stretch come before anything else is asked of the child: a corner, a book, a closed door, whatever helps to recover. A preference for a few close friends is a style, not a problem to fix; if the retreat brings distress or avoidance that persists across settings, raise it with the paediatrician.', sk: 'Po rušnom dni dopraj chvíľu ticha skôr, než sa od dieťaťa bude čokoľvek chcieť: kútik, knihu, zatvorené dvere, čokoľvek, čo pomáha nabrať sily. Záľuba v pár blízkych priateľoch je štýl, nie problém na riešenie; ak stiahnutie sprevádza trápenie alebo vyhýbanie sa, ktoré pretrváva v rôznych prostrediach, povedz o tom pediatrovi.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'social-energy', childPoles: ['private'], kinds: ADULT_CHILD, ages: FROM_PRESCHOOL },
            sources: ['PAR-032', 'PAR-052'],
        },
        {
            id: 'par.plan-company',
            title: { en: 'Plan the company', sk: 'Naplánuj spoločnosť' },
            body: { en: 'For a child who comes alive among people, put company into the week on purpose: a regular playdate, a club, a visit to cousins. If company tires the adult sooner than the child, share the load with other families or activities rather than running on empty, and offer quiet time as a choice, not a punishment.', sk: 'Dieťaťu, ktoré medzi ľuďmi ožíva, vlož spoločnosť do týždňa zámerne: pravidelné stretnutie s kamarátom, krúžok, návštevu bratrancov či sesterníc. Ak spoločnosť dospelého človeka unaví skôr než dieťa, rozdeľ túto úlohu s inými rodinami alebo aktivitami, nech sily nedôjdú, a čas v tichu ponúkaj ako voľbu, nie ako trest.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'social-energy', childPoles: ['social'], kinds: ADULT_CHILD, ages: UP_TO_MIDDLE },
            sources: ['PAR-012', 'PAR-003'],
        },
        /* ---- reasoning-style: communicating with this child ---- */
        {
            id: 'par.reason-or-picture',
            title: { en: 'One reason, or one picture', sk: 'Jeden dôvod alebo jeden obraz' },
            body: { en: 'Match the way you explain to how this child takes things in. A child who asks why tends to settle with one honest reason in a sentence; a child who goes by feel tends to respond to a warm tone and something to see or do. Either way, short instructions and a calm voice carry further than a long speech.', sk: 'Spôsob vysvetľovania prispôsob tomu, ako toto dieťa veci vníma. Dieťa, ktoré sa pýta „prečo“, zvyčajne upokojí jeden úprimný dôvod v jednej vete; dieťa, ktoré sa riadi pocitom, zvyčajne lepšie zareaguje na vľúdny tón a niečo, čo môže vidieť alebo urobiť. Krátke pokyny a pokojný hlas dôjdu ďalej než dlhá reč tak či onak.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'reasoning-style', kinds: ADULT_CHILD, ages: FROM_PRESCHOOL },
            sources: ['PAR-010', 'PAR-002'],
        },
        /* ---- drives ---- */
        {
            id: 'par.child-own-pull',
            title: { en: 'When the child is drawn elsewhere', sk: 'Keď dieťa láka niečo iné' },
            body: { en: 'When what draws the child is not what draws the adult, take the child’s pull seriously on its own terms: ask what makes it good, learn one thing about it, and make some room for it in the week. Keep the adult’s own interests on offer, but not as the measure; interests a child owns tend to carry effort further than ones handed down.', sk: 'Keď dieťa láka niečo iné než dospelého človeka, ber to vážne: opýtaj sa, čo je na tom dobré, zisti o tom aspoň jednu vec a urob tomu v týždni miesto. Vlastné záujmy dospelého človeka ponúkaj ďalej, no nerob z nich meradlo; záujmy, ktoré si dieťa zvolí samo, zvyčajne unesú úsilie ďalej než tie podané zhora.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'different-pulls', relations: ['different-drives'], kinds: ADULT_CHILD },
            sources: ['PAR-012', 'PAR-003'],
        },
        {
            id: 'par.shared-interest-child-leads',
            title: { en: 'Where you both care, take turns leading', sk: 'Kde záleží obom, vedenie sa strieda' },
            body: {
                en: 'When an adult and a child are drawn to the same thing, it is an easy place to meet. Take turns choosing the next step and setting the pace, and let the child be the one who knows something at times. Keep it for the shared enjoyment, not for coaching or results; an interest the adult also loves can quietly become the adult’s project, so check now and then that the child still wants it.',
                sk: 'Keď dospelého človeka aj dieťa priťahuje to isté, je to ľahké miesto na stretnutie. Striedaj sa s dieťaťom vo výbere ďalšieho kroku aj v určovaní tempa a občas nechaj dieťa byť tým, kto niečo vie. Nechaj to pre spoločnú radosť, nie pre koučovanie či výsledky; záujem, ktorý má dospelý človek tiež rád, sa môže nenápadne stať projektom dospelého človeka, preto sa raz za čas ujisti, že to dieťa stále chce.',
            },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], kinds: ADULT_CHILD },
            sources: ['PAR-012', 'PAR-003'],
        },
        {
            id: 'par.explain-differences',
            title: { en: 'Explain the differences out loud', sk: 'Rozdiely vysvetľuj nahlas' },
            body: { en: 'If one child gets more freedom, patience or attention than another, say why, by age or need, before the comparison is drawn without you (“going out alone comes with being older”). Check now and then that no child routinely gets less warmth. Fair does not have to mean identical; it does need to be explained, and to feel fair.', sk: 'Ak jedno dieťa dostáva viac voľnosti, trpezlivosti alebo pozornosti než druhé, povedz dôvod, vek alebo potrebu, skôr než si porovnanie urobia deti samy („chodiť von samostatne prichádza s vekom“). Občas si over, či niektoré dieťa nedostáva pravidelne menej vľúdnosti. Férové nemusí znamenať rovnaké; musí však byť vysvetlené a pôsobiť férovo.' },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'pulls-apart', kinds: ADULT_CHILD, context: ['unfair-comparison'] },
            sources: ['PAR-036', 'PAR-034'],
        },
        /* ---- siblings in one household ---- */
        {
            id: 'par.explain-differences-siblings',
            title: { en: 'Explain the differences, share the turns', sk: 'Vysvetľuj rozdiely, striedaj voľbu' },
            body: { en: 'When one child can feel measured against another, say plainly why treatment differs, by age or need, and when a child says it is unfair, take it seriously rather than arguing about it. Let the turn to choose the game, the meal or the plan pass around, so that who decides does not turn into a ranking.', sk: 'Keď sa jedno dieťa môže cítiť porovnávané s iným, jasne povedz, prečo sa zaobchádza rôzne, podľa veku alebo potreby, a keď sa dieťa ozve, že je to nefér, ber to vážne a nehádaj sa o tom. Nech sa voľba hry, jedla alebo plánu strieda, aby sa z toho, kto rozhoduje, nestal rebríček.' },
            audience: { kind: 'adult' },
            triggers: { dynamic: 'taking-the-lead', kinds: SIBLINGS, context: ['unfair-comparison'] },
            sources: ['PAR-036', 'PAR-034'],
        },
        {
            id: 'par.sibling-coaching',
            title: { en: 'Slow the quarrel down', sk: 'Hádku spomaľ, nesúď' },
            body: { en: 'In a quarrel, slow it down rather than ruling on it: whoever is quarrelling says in one sentence what happened, the other says it back, and each suggests one way out. Step in at once if anyone could get hurt, and afterwards let the fix the two found stand, even if an adult would have chosen another.', sk: 'Hádku najprv spomaľ, súd môže počkať: každý, kto sa hádal, jednou vetou povie, čo sa stalo, druhý to zopakuje a potom každý navrhne jedno riešenie. Ak niekomu hrozí, že sa zraní, zasiahni hneď, a riešenie, ktoré spolu našli, nechaj potom platiť, aj keď by dospelý človek zvolil iné.' },
            audience: { kind: 'adult' },
            triggers: { dynamic: 'taking-the-lead', kinds: SIBLINGS, context: ['sibling-friction'], ages: ['early-school-6-8', 'middle-school-9-12'] },
            sources: ['PAR-037', 'PAR-035'],
        },
        {
            id: 'par.sibling-good-moments',
            title: { en: 'Something that needs both', sk: 'Úloha pre dvoch' },
            body: { en: 'Give the two something that only works with both of them, such as a joint job, a game for two or a surprise for someone else, alongside time apart that each can count on. Steer clear of fixed roles such as “the easy one” or “the wild one”; the relationship tends to grow in the space the adults leave for it.', sk: 'Daj tým dvom niečo, čo funguje len vo dvojici, napríklad spoločnú úlohu, hru pre dvoch alebo prekvapenie pre niekoho iného, a popri tom čas oddelene, na ktorý sa môže spoľahnúť každý z nich. Vyhni sa pevným rolám typu „to pohodové dieťa“ alebo „to divoké dieťa“; vzťah zvyčajne rastie v priestore, ktorý mu dospelí nechajú.' },
            audience: { kind: 'adult' },
            triggers: { dynamic: 'closeness-and-room', kinds: SIBLINGS },
            sources: ['PAR-035', 'PAR-034'],
        },
        {
            id: 'par.no-comparison',
            title: { en: 'A child on their own terms', sk: 'Dieťa podľa seba' },
            body: { en: 'Talk about a child’s effort and progress against where that same child was before, not against a brother or sister. People are drawn to different things; interest in each pull, rather than a ranking of them, keeps the difference from turning into a competition.', sk: 'O úsilí a pokroku dieťaťa hovor vzhľadom na to, kde bolo to isté dieťa predtým, nie vzhľadom na brata či sestru. Ľudí priťahujú rôzne veci; záujem o každú z týchto túžob namiesto ich rebríčka zabráni, aby sa rozdiel zmenil na súťaž.' },
            audience: { kind: 'adult' },
            triggers: { dynamic: 'different-pulls', kinds: SIBLINGS },
            sources: ['PAR-036', 'PAR-034'],
        },
    ],
    sections: {
        overview: { en: 'This pairing at a glance', sk: 'Táto dvojica v skratke' },
        story: { en: 'How the two styles meet', sk: 'Ako sa tieto dva štýly stretávajú' },
        alongside: { en: 'Also at play', sk: 'Čo ešte hrá úlohu' },
        guidance: { en: 'What to try', sk: 'Čo vyskúšať' },
        yourWords: { en: 'What you have noticed', sk: 'Čo si všímaš ty' },
        next: { en: 'One agreement to make', sk: 'Na čom sa môžete dohodnúť' },
        limits: { en: 'What this reading can and cannot do', sk: 'Čo táto analýza dokáže a čo nie' },
    },
    guidanceIntro: { en: 'Small, concrete things to try at home this week: take what fits the family, leave what does not, and adapt any of it to the child in front of you.', sk: 'Malé, konkrétne veci, ktoré sa dajú doma vyskúšať ešte tento týždeň: vezmi, čo sedí tvojej rodine, nechaj, čo nesedí, a čokoľvek z toho prispôsob dieťaťu, ktoré máš pred sebou.' },
    shapes: {
        all: { en: '{both} meet in three ways at once: easy common ground in {resonance}, a difference that can help in {complement}, and the place most likely to rub, {friction}.', sk: '{both} sa stretávajú v troch rovinách naraz: ľahká spoločná pôda v oblasti „{resonance}“, rozdiel, ktorý môže pomáhať, v oblasti „{complement}“, a miesto, kde to najskôr drhne, teda „{friction}“.' },
        resonanceFriction: { en: 'Much comes easily where {both} share {resonance}; the place that asks for the most adjusting is {friction}.', sk: '{both} majú veľa spoločného v oblasti „{resonance}“; najviac dolaďovania si žiada oblasť „{friction}“.' },
        complementFriction: { en: '{both} differ usefully in {complement}, and the main place to adapt is {friction}.', sk: '{both} sa užitočne líšia v oblasti „{complement}“ a hlavným miestom na prispôsobenie je „{friction}“.' },
        resonanceComplement: { en: '{both} share a lot in {resonance} and differ helpfully in {complement}, which gives the relationship a steady base and some room to grow.', sk: '{both} majú veľa spoločného v oblasti „{resonance}“ a užitočne sa líšia v oblasti „{complement}“, čo dáva vzťahu pevný základ aj priestor na rast.' },
        resonanceOnly: { en: 'What stands out is common ground: {both} meet most easily in {resonance}.', sk: 'Najvýraznejšia je spoločná pôda: {both} sa najľahšie stretávajú v oblasti „{resonance}“.' },
        complementOnly: { en: 'What stands out is a difference that can help: {both} bring different things to {complement}.', sk: 'Najvýraznejší je rozdiel, ktorý môže pomáhať: {both} prinášajú rôzne veci do oblasti „{complement}“.' },
        frictionOnly: { en: 'The clearest thread is a place to adapt: {both} meet the most friction in {friction}, which is where small changes tend to help most.', sk: 'Najzreteľnejšou niťou je miesto na prispôsobenie: {both} narážajú najviac v oblasti „{friction}“, a práve tam malé zmeny zvyčajne pomôžu najviac.' },
    },
    drivePhrases: {
        shared: { en: 'what both are drawn to', sk: 'to, čo oboch priťahuje' },
        pullsApart: { en: 'what each wants to do', sk: 'to, čo každý chce robiť' },
        different: { en: 'what each is drawn to', sk: 'to, čo každého priťahuje' },
    },
    care: { en: 'If a worry about a child’s development, mood or behaviour lasts for weeks, appears across settings or causes real distress, a paediatrician or a child psychologist is the right next step; no profile can tell whether something needs attention. Any concern about a child’s safety belongs with a doctor or another trusted professional promptly, and with emergency services if someone is in danger. Parental exhaustion is a reason to ask for support, not a failing.', sk: 'Ak obava o vývin, náladu alebo správanie dieťaťa trvá týždne, prejavuje sa v rôznych prostrediach alebo spôsobuje skutočné trápenie, správnym ďalším krokom je pediater alebo detský psychológ; žiadny profil nedokáže povedať, či niečo potrebuje pozornosť. Akákoľvek obava o bezpečie dieťaťa patrí bez odkladu k lekárovi alebo inému dôveryhodnému odborníkovi, a ak je niekto v ohrození, aj k záchrannej službe. Vyčerpanie z rodičovstva je dôvodom požiadať o pomoc, nie zlyhaním.' },
    household: {
        /* WHAT THE USER REPORTS (V3.2). Where the strongest pattern does not speak to a reported problem, these say so plainly and then turn to the problem itself: general, research-backed,
           never attributed to anyone's profile. They name nobody and refer to no child or children as a group. */
        concerns: {
            'sibling-friction': {
                apart: {
                    en: 'The patterns told on this page show nothing between the brothers and sisters that would explain this, so it is better met on its own terms. Quarrels between brothers and sisters are common and tend to follow circumstances, such as tiredness or competition for the same attention, more than temperament; some approaches tend to help, whoever is quarrelling.',
                    sk: 'Vzorce povedané na tejto stránke nič medzi bratmi a sestrami, čo by to vysvetľovalo, neukazujú, preto sa to lepšie rieši samostatne. Hádky medzi bratmi a sestrami sú bežné a zvyčajne súvisia skôr s okolnosťami, napríklad s únavou alebo súťažením o rovnakú pozornosť, než s povahou; niektoré postupy zvyčajne pomáhajú, nech sa hádajú ktokoľvek.',
                },
                adjacent: {
                    en: 'The profiles touch this only at the edge, in {phrase}; take it as a possibility to check against what you see, not as a finding.',
                    sk: 'Profily sa toho dotýkajú len okrajovo: {phrase}; ber to ako možnosť, ktorú si overíš podľa toho, čo vidíš, nie ako zistenie.',
                },
                step: {
                    en: 'For one week, just notice when the quarrels start: the hour, the place, what came just before. Write it down without trying to fix anything yet.',
                    sk: 'Jeden týždeň si len všímajte, kedy hádky začínajú: v ktorú hodinu, kde a čo tomu predchádzalo. Zapíšte si to a zatiaľ nič nenaprávajte.',
                },
                question: { en: 'On the days the quarrels do not happen, what is different?', sk: 'Čím sa líšia dni, keď sa hádky nezačnú?' },
                caution: { en: 'Friction between brothers and sisters also follows tiredness, circumstances and what has worked before, so this is one part of the picture, not its cause.', sk: 'Trenie medzi bratmi a sestrami súvisí aj s únavou, okolnosťami a s tým, čo sa predtým osvedčilo, takže ide o jednu časť obrazu, nie o príčinu.' },
                practices: ['par.sibling-coaching', 'par.sibling-good-moments'],
            },
            'unfair-comparison': {
                apart: {
                    en: 'The patterns told on this page show no difference that would explain the comparisons, so this is better met directly. A child often notices a difference in treatment before understanding the reason for it, and a short, plain explanation tends to help more than reassurance.',
                    sk: 'Vzorce povedané na tejto stránke neukazujú rozdiel, ktorý by tie porovnávania vysvetľoval, preto sa to lepšie rieši priamo. Dieťa si rozdiel v zaobchádzaní všimne skôr, než pochopí dôvod, a krátke, jasné vysvetlenie zvyčajne pomôže viac než ubezpečovanie.',
                },
                adjacent: {
                    en: 'How an adult answers a push on a limit, as told above, can look like uneven treatment from where a child stands; take it as a possibility to check against what you see, not as a finding.',
                    sk: 'To, ako dospelý človek odpovedá na tlak na hranicu, ako je povedané vyššie, môže zvonka vyzerať ako nerovnaké zaobchádzanie; ber to ako možnosť, ktorú si overíš podľa toho, čo vidíš, nie ako zistenie.',
                },
                step: {
                    en: 'Pick the one difference in treatment that comes up most, and settle for yourself the plain reason behind it before the next time it is raised.',
                    sk: 'Vyberte rozdiel v zaobchádzaní, ktorý sa objavuje najčastejšie, a skôr než tému znova otvoríte, ujasnite si pre seba dôvod, ktorý za tým stojí.',
                },
                question: { en: 'The last time a child said “that’s not fair”, what was the child really asking for?', sk: 'Keď dieťa naposledy povedalo „to je nefér“, čo vlastne potrebovalo?' },
                caution: { en: 'Whether something feels fair also depends on how well the reason is understood, so this is one part of the picture, not its cause.', sk: 'To, či niečo pôsobí férovo, závisí aj od toho, ako dobre je dôvod vysvetlený, takže ide o jednu časť obrazu, nie o príčinu.' },
                practices: ['par.explain-differences-siblings', 'par.no-comparison'],
            },
            'parents-disagree-on-approach': {
                apart: {
                    en: 'The patterns told on this page show no difference between the two adults that would explain this, so it is better met as a question of agreement than of temperament. A child usually copes well with two different adults when the main rules are the same and the adults back each other up.',
                    sk: 'Vzorce povedané na tejto stránke neukazujú medzi oboma dospelými rozdiel, ktorý by to vysvetľoval, preto sa to lepšie berie ako otázka dohody než povahy. Dieťa zvyčajne dobre zvláda dvoch rozdielnych dospelých, ak sú hlavné pravidlá rovnaké a dospelí sa navzájom podporujú.',
                },
                adjacent: {
                    en: 'One adult meeting two people differently, as told above, can feel to the other adult like a difference in approach; take it as a possibility to check against what you see, not as a finding.',
                    sk: 'To, že sa jeden dospelý človek s dvomi ľuďmi stretáva inak, ako je povedané vyššie, môže druhému dospelému človekovi pripadať ako rozdiel v prístupe; ber to ako možnosť, ktorú si overíš podľa toho, čo vidíš, nie ako zistenie.',
                },
                step: {
                    en: 'Pick one recent moment you handled differently, and each say what you were trying to protect, without commenting on the other’s answer.',
                    sk: 'Vyberte jednu nedávnu situáciu, ktorú ste zvládli rozdielne, a každý povedzte, čo ste sa snažili ochrániť, bez komentovania odpovede toho druhého.',
                },
                question: { en: 'Where did the two answers turn out to be about the same worry?', sk: 'Kde sa dve odpovede ukázali byť o tej istej starosti?' },
                caution: { en: 'How two adults approach things also follows habit, tiredness and what each brought from home, so this is one part of the picture, not its cause.', sk: 'To, ako dospelí pristupujú k veciam, ovplyvňujú aj zvyky, únava a to, čo si každý priniesol z domova, takže ide o jednu časť obrazu, nie o príčinu.' },
                practices: ['par.adults-one-frame'],
            },
            'withdraws-when-upset': {
                apart: {
                    en: 'Going quiet after an upset is a common way of settling, and the patterns told on this page do not say why it happens.',
                    sk: 'Odmlčanie sa po rozrušení je bežný spôsob, ako sa upokojiť, a vzorce povedané na tejto stránke nehovoria, prečo sa to deje.',
                },
                adjacent: {
                    en: 'What the profiles show in {phrase} may touch this; take it as a possibility to check against what you see, not as a finding.',
                    sk: 'Profily ukazujú niečo, čo sa toho môže dotýkať: {phrase}. Ber to ako možnosť, ktorú si overíš podľa toho, čo vidíš, nie ako zistenie.',
                },
                step: {
                    en: 'Keep a gentle, standing invitation to talk, and notice what the quiet comes with.',
                    sk: 'Nechajte stále, jemné pozvanie na rozhovor a všímajte si, čo ticho sprevádza.',
                },
                question: { en: 'What does the quiet come with, and how long does it last?', sk: 'Čo ticho sprevádza a ako dlho trvá?' },
                caution: { en: 'Going quiet has many ordinary reasons, so this is one part of the picture, not its cause.', sk: 'Odmlčanie má veľa bežných dôvodov, takže ide o jednu časť obrazu, nie o príčinu.' },
                practices: [],
            },
            'resists-rules': {
                apart: {
                    en: 'The patterns told on this page do not explain the pushing against rules, so it is better met on its own terms. Pushing against a rule is common and often follows how the rule is set and explained more than temperament; some approaches tend to help.',
                    sk: 'Vzorce povedané na tejto stránke odpor voči pravidlám nevysvetľujú, preto sa to lepšie rieši samostatne. Odpor voči pravidlu je bežný a často súvisí skôr s tým, ako sa pravidlo stanoví a vysvetlí, než s povahou; niektoré postupy zvyčajne pomáhajú.',
                },
                adjacent: {
                    en: 'How a limit is held, as told above, can meet that pushing; take it as a possibility to check against what you see, not as a finding.',
                    sk: 'To, ako sa hranica drží, ako je povedané vyššie, sa s tým odporom môže stretávať; ber to ako možnosť, ktorú si overíš podľa toho, čo vidíš, nie ako zistenie.',
                },
                caution: { en: 'Pushing against rules also follows age, tiredness and how the rule was set, so this is one part of the picture, not its cause.', sk: 'Odpor voči pravidlám súvisí aj s vekom, únavou a tým, ako bolo pravidlo stanovené, takže ide o jednu časť obrazu, nie o príčinu.' },
                step: {
                    en: 'Pick the one rule that is pushed against most, and settle for yourself which part of it is firm and which part could bend.',
                    sk: 'Vyberte pravidlo, ktoré dieťa najčastejšie testuje, a skôr než tému znova otvoríte, ujasnite si pre seba, ktorá časť pravidla je pevná a ktorá sa môže ohnúť.',
                },
                question: { en: 'When the rule is pushed against, what is the push usually asking for?', sk: 'Čo dieťa zvyčajne chce, keď tlačí na pravidlo?' },
                practices: ['par.say-in-rules'],
            },
        },
        stepLabel: { en: 'For {names}:', sk: '{names}:' },
        alsoShows: { en: 'Across the household the profiles show a different pattern, told here in brief.', sk: 'V celej domácnosti profily ukazujú inú črtu, povedanú tu stručne.' },
        /* HOW TWO PATTERNS JOIN, AND WHERE AN ADULT WITH NO SHARED PATTERN IS READ. Names are nominative subjects. */
        bridges: {
            sameAdult: { en: '{adult} {adult?appears|appear} in both of the patterns above, so a step in one is also a step in the other.', sk: '{adult} {adult?vystupuje|vystupujú} v oboch vzorcoch vyššie, takže krok v jednom je zároveň krokom v druhom.' },
            sameChild: { en: '{child} {child?appears|appear} in both of the patterns above, so what helps in one may help in the other.', sk: '{child} {child?vystupuje|vystupujú} v oboch vzorcoch vyššie, takže to, čo pomáha v jednom, môže pomôcť aj v druhom.' },
            sameChildren: { en: '{children} {children?appears|appear} in both of the patterns above, so what helps in one may help in the other.', sk: '{children} {children?vystupuje|vystupujú} v oboch vzorcoch vyššie, takže to, čo pomáha v jednom, môže pomôcť aj v druhom.' },
            unnamedAdult: {
                en: 'The pairs that include {adult} have their own pages.',
                sk: 'Vzťahy, v ktorých {adult} {adult?vystupuje|vystupujú}, nájdeš na ich vlastných stránkach.',
            },
        },
        intro: [
            { en: 'Looking across the whole household, a few patterns stand out that no single pair shows on its own.', sk: 'Pri pohľade na celú domácnosť vystupuje niekoľko vzorcov, ktoré samotná dvojica neukáže.' },
            { en: 'A household is more than its pairs: here is what repeats, and what differs, when everyone in it is read together.', sk: 'Domácnosť je viac než súčet dvojíc: tu je to, čo sa opakuje, a to, čo sa líši, keď sa pozrieme spolu na všetkých, ktorí tvoria domácnosť.' },
            { en: 'Read together, the relationships in this home show where approaches line up and where one approach will not fit everyone.', sk: 'Keď sa vzťahy v tomto domove čítajú spolu, ukazujú, kde sa prístupy zhodujú a kde jeden prístup nesedí všetkým.' },
        ],
        childFitDiffers: [
            { en: 'In {phrase}, {x} and {y} meet easily while {u} and {v} meet more friction; the same child simply fits each adult differently, and neither adult is doing it wrong.', sk: 'V oblasti „{phrase}“ sa {x} a {y} stretávajú ľahko, zatiaľ čo {u} a {v} narážajú viac; to isté dieťa jednoducho sedí každému dospelému človekovi inak a ani jeden z dospelých nerobí chybu.' },
            { en: '{x} and {y} find their way to each other easily in {phrase}, and {u} and {v} have to work harder at it; what comes naturally to one pair can be borrowed by the other.', sk: 'V oblasti „{phrase}“ si {x} a {y} ľahko nájdu cestu k sebe, kým {u} a {v} na tom musia viac pracovať; to, čo jednej dvojici ide samo, si môže druhá dvojica požičať.' },
            { en: '{x} and {y} meet easily in {phrase} and {u} and {v} less so, which is a difference of fit between people, not a sign that anyone is failing.', sk: '{x} a {y} sa v oblasti „{phrase}“ stretávajú ľahko, {u} a {v} menej, a to je rozdiel v tom, ako si ľudia navzájom sedia, nie znak, že niekto zlyháva.' },
        ],
        adultAdapts: [
            { en: '{parent} meets some friction in {phrase} in more than one relationship, which makes this a good place for the adult’s own approach to bend; it says nothing against anyone.', sk: '{parent} naráža v oblasti „{phrase}“ na trenie vo viacerých vzťahoch, takže práve tu sa oplatí ohnúť vlastný prístup dospelého človeka; nie je to výčitka voči nikomu.' },
            { en: 'In more than one relationship the hardest place for {parent} is {phrase}, so a small change in the adult’s habit here may ease several relationships at once.', sk: '{parent} zažíva vo viacerých vzťahoch najviac trenia v oblasti „{phrase}“, takže malá zmena vo zvyku dospelého človeka môže uľahčiť viacero vzťahov naraz.' },
            { en: 'The common thread is the adult: {parent} rubs against more than one person in {phrase}, and that is where an adjustment, rather than a correction, is most likely to help.', sk: 'Spoločnou niťou je tu dospelý človek: {parent} naráža v oblasti „{phrase}“ na trenie vo viacerých vzťahoch, a práve tam pomôže skôr úprava prístupu než naprávanie.' },
        ],
        childrenOpposite: [
            { en: '{c1} and {c2} sit at opposite ends of {phrase}, which is why the approach that works with one child can backfire with the other; two children may simply need two approaches.', sk: '{c1} a {c2} stoja v oblasti „{phrase}“ na opačných koncoch, a preto to, čo funguje pri jednom dieťati, môže pri druhom zlyhať; dve deti môžu jednoducho potrebovať dva prístupy.' },
            { en: 'In {phrase}, {c1} and {c2} need nearly opposite things, so fairness here means giving each of them what fits rather than giving both the same.', sk: 'V oblasti „{phrase}“ potrebujú {c1} a {c2} takmer opačné veci, takže férovosť tu znamená dať každému z nich to, čo mu sedí, nie obom to isté.' },
            { en: '{c1} and {c2} differ sharply in {phrase}; when a method that settles one child unsettles the other, that is a difference between the two, not a failure of either.', sk: '{c1} a {c2} sa v oblasti „{phrase}“ výrazne líšia; keď spôsob, ktorý jedno dieťa upokojí, druhé rozruší, ide o rozdiel medzi nimi, nie o zlyhanie niektorého z nich.' },
        ],
        childrenAlike: [
            { en: '{c1} and {c2} lean the same way in {phrase}, so what helps one child is likely to help the other too, while each stays a person in their own right.', sk: '{c1} a {c2} sa v oblasti „{phrase}“ prikláňajú rovnakým smerom, takže to, čo pomáha jednému dieťaťu, pravdepodobne pomôže aj druhému, hoci každé zostáva samo sebou.' },
            { en: '{c1} and {c2} have a lot in common in {phrase}, which makes routines easy to share, though it can also mean they react to the same change at the same moment.', sk: '{c1} a {c2} majú v oblasti „{phrase}“ veľa spoločného, takže rutiny sa dajú ľahko zdieľať, no môže to znamenať aj to, že na tú istú zmenu zareagujú naraz.' },
            { en: '{c1} and {c2} share a style in {phrase}; one approach can serve both here, and the shared experience may help them understand each other.', sk: '{c1} a {c2} majú v oblasti „{phrase}“ podobný štýl; jeden prístup tu môže poslúžiť obom a spoločná skúsenosť im môže pomôcť navzájom si porozumieť.' },
        ],
        adultsDiffer: [
            { en: '{p1} and {p2} would each handle things differently in {phrase}, and neither way is wrong; what matters is agreeing the main lines in private and backing each other up in front of the family.', sk: '{p1} a {p2} by k oblasti „{phrase}“ pristupovali inak a ani jeden prístup nie je zlý; dôležité je dohodnúť sa na hlavných líniách medzi sebou a pred rodinou sa navzájom podporiť.' },
            { en: 'In {phrase}, {p1} and {p2} lean different ways, which can give the family two useful models as long as the adults settle disagreements between themselves.', sk: 'V oblasti „{phrase}“ sa {p1} a {p2} prikláňajú k rôznym smerom, čo môže rodine dať dva užitočné vzory, pokiaľ si dospelí nezhody riešia medzi sebou.' },
            { en: '{p1} and {p2} differ in {phrase}; two styles of care can live side by side, and a household tends to cope well with different adults when the core rules are shared.', sk: '{p1} a {p2} sa líšia v oblasti „{phrase}“; dva štýly starostlivosti môžu žiť vedľa seba a domácnosť zvyčajne dobre zvláda rozdielnych dospelých, ak sú základné pravidlá spoločné.' },
        ],
        /* One dimension on which the adults differ and the child meets each of them differently, told as one point. */
        combined: [
            { en: 'In {phrase}, {x} and {u} lean different ways, and {y} fits one more easily than the other: {x} and {y} meet easily while {u} and {y} meet more friction. It is a difference of fit, not a sign that either adult is doing it wrong.', sk: 'V oblasti „{phrase}“ sa {x} a {u} prikláňajú k rôznym stranám a {y} sa ľahšie zladí s jednou z týchto dvoch strán než s druhou: {x} a {y} si rozumejú ľahko, {u} a {y} narážajú viac. Je to rozdiel v tom, ako si sedia, nie znak, že niektorý z dospelých robí chybu.' },
            { en: '{x} and {y} meet easily in {phrase}, and {u} and {y} less so; that follows from how the two adults differ there, and it says nothing against any of the three.', sk: '{x} a {y} sa v oblasti „{phrase}“ stretávajú ľahko, {u} a {y} menej; vyplýva to z toho, ako sa dvaja dospelí v tejto oblasti líšia, a nič to nehovorí proti nikomu z troch.' },
            { en: 'What differs between {x} and {u} in {phrase} shows up in how {y} meets each of them: easily in one pair, with more friction in the other. What comes naturally to one pair can be borrowed by the other.', sk: 'To, v čom sa {x} a {u} v oblasti „{phrase}“ líšia, sa prejaví v tom, ako si s každým z nich {y} rozumie: ľahko v jednej dvojici, s väčším trením v druhej. To, čo ide jednej dvojici samo, si môže druhá dvojica požičať.' },
        ],
        /* The step that follows from the household's central theme, and one question, by what that theme is. */
        next: {
            'child-fit-differs': [
                { en: 'A small, shared step fits: the adult whose way meets less friction with the child can say, once, what seems to help, and the other can try it for a week.', sk: 'Hodí sa malý spoločný krok: dospelý človek, pri ktorom je menej trenia, môže raz povedať, čo sa zdá pomáhať, a druhý to môže týždeň skúsiť.' },
                { en: 'Since the same child fits each adult differently, the step that fits is to compare notes, not to settle who is right: what does the easier pair do that the other could borrow?', sk: 'Keďže to isté dieťa sedí každému dospelému človekovi inak, hodí sa porovnať skúsenosti a nerozhodovať, kto má pravdu: čo robí dvojica, kde to ide ľahšie, a čo by si z toho mohla požičať druhá?' },
            ],
            'adult-adapts': [
                { en: 'Because the common thread is the adult, the step that fits is one adjustment in the adult’s own habit around {phrase}, kept for a few weeks before it is judged.', sk: 'Keďže spoločnou niťou je dospelý človek, sedí jedna úprava vo vlastnom zvyku dospelého človeka v oblasti „{phrase}“, ktorú treba pár týždňov udržať, kým sa začne hodnotiť.' },
                { en: 'Around {phrase}, a change on the adult’s side reaches every relationship at once, so the step that fits is the smallest change that can be tried this week.', sk: 'Zmena na strane dospelého človeka v oblasti „{phrase}“ zasiahne každý vzťah naraz, a preto sedí najmenšia zmena, ktorú sa dá skúsiť už tento týždeň.' },
            ],
            'children-opposite': [
                { en: 'Because, around {phrase}, the two children need nearly opposite things, the step that fits is to meet each of them where they are, and to explain calmly that fair does not mean identical.', sk: 'Keďže dve deti potrebujú v oblasti „{phrase}“ takmer opačné veci, sedí krok stretnúť každé z nich tam, kde práve je, a pokojne vysvetliť, že férové neznamená rovnaké.' },
                { en: 'Around {phrase}, one approach will not fit both children, so the step that fits is to choose, for one week, the approach that suits one of them and watch how the other responds.', sk: 'Jeden prístup nesedí obom deťom v oblasti „{phrase}“, preto sa hodí na týždeň zvoliť prístup, ktorý vyhovuje jednému z nich, a sledovať, ako reaguje druhé.' },
            ],
            'children-alike': [
                { en: 'Where {c1} and {c2} share a style around {phrase}, one routine can serve both, so the step that fits is to build a shared routine there and leave each of them room to change it.', sk: 'Tam, kde majú {c1} a {c2} v oblasti „{phrase}“ podobný štýl, môže jedna rutina poslúžiť obom, takže sedí krok vytvoriť tam jednu spoločnú rutinu a nechať každému z nich priestor túto rutinu zmeniť.' },
                { en: 'A shared style around {phrase} makes a shared ritual easy, so the step that fits is a small one done together, with the adults noticing when {c1} and {c2} need different things after all.', sk: 'Spoločný štýl v oblasti „{phrase}“ uľahčuje spoločný rituál, takže sedí malý krok urobený spolu, pričom si dospelí všímajú, kedy {c1} a {c2} predsa len potrebujú rôzne veci.' },
            ],
            'adults-differ': [
                { en: 'The step that fits is for the adults to settle the main lines around {phrase} between themselves, and to let the details stay different.', sk: 'Hodí sa krok, v ktorom dospelí dohodnú hlavné línie v oblasti „{phrase}“ medzi sebou a detaily nechajú rôzne.' },
                { en: 'Two styles can live in one home, so the step that fits is a short agreement between the adults on the one or two lines around {phrase} that matter most, said in the same words by both.', sk: 'Dva štýly môžu žiť v jednom domove, a preto sedí krátka dohoda dospelých o jednej-dvoch líniách v oblasti „{phrase}“, na ktorých záleží najviac, povedaná rovnakými slovami od oboch.' },
            ],
        },
        ask: {
            'child-fit-differs': [
                { en: 'Around {phrase}, what does {y} seem to need that one adult already gives and the other might try?', sk: 'Čo podľa všetkého dieťa {y} v oblasti „{phrase}“ potrebuje a čo jeden dospelý človek už dáva a druhý by mohol skúsiť?' },
                { en: 'Around {phrase}, when do {y} and {u} meet most easily, and what is different about those moments?', sk: 'Kedy sa {y} a {u} v oblasti „{phrase}“ stretávajú najľahšie a čím sa tie chvíle líšia?' },
            ],
            'adult-adapts': [
                { en: 'Around {phrase}, what is the smallest change the adult could make that the others at home would notice?', sk: 'Aká je najmenšia zmena, ktorú by dospelý človek v oblasti „{phrase}“ mohol urobiť tak, aby si to všimli ostatní doma?' },
                { en: 'Around {phrase}, when is it easiest for {parent}, and what is different then?', sk: 'Kedy to {parent} v oblasti „{phrase}“ zvláda najľahšie a čím sa tie chvíle líšia?' },
            ],
            'children-opposite': [
                { en: 'Around {phrase}, where would treating {c1} and {c2} differently feel most unfair, and how could the reason be said aloud?', sk: 'Kde by v oblasti „{phrase}“ vyzeralo najnespravodlivejšie, keby {c1} a {c2} dostali rozdielny prístup, a ako sa dá dôvod povedať nahlas?' },
                { en: 'Around {phrase}, what does each of {c1} and {c2} get that the other does not need?', sk: 'Čo v oblasti „{phrase}“ dostáva {c1}, čo {c2} nepotrebuje, a naopak?' },
            ],
            'children-alike': [
                { en: 'Around {phrase}, what could {c1} and {c2} do together that would feel like their own?', sk: 'Čo by mohli {c1} a {c2} robiť spolu v oblasti „{phrase}“, aby to bolo ich vlastné?' },
                { en: 'Around {phrase}, where might the shared style hide a difference between {c1} and {c2}?', sk: 'Kde by v oblasti „{phrase}“ mohol spoločný štýl skrývať, že sa {c1} a {c2} predsa len líšia?' },
            ],
            'adults-differ': [
                { en: 'Around {phrase}, which one or two lines do {p1} and {p2} most need to agree on?', sk: 'Na ktorých jednej-dvoch líniách v oblasti „{phrase}“ je najdôležitejšie, aby sa {p1} a {p2} dohodli?' },
                { en: 'Around {phrase}, what would be heard the same from {p1} and {p2}, even if the way of saying it differs?', sk: 'Čo by v oblasti „{phrase}“ zaznelo rovnako, nech to hovorí {p1}, alebo {p2}, aj keď každý to povie inak?' },
            ],
        },
        quiet: { en: 'Across this household no pattern stands out strongly enough to name; each relationship is best read on its own.', sk: 'V tejto domácnosti nijaký vzorec nie je natoľko výrazný, aby stál za pomenovanie; každý vzťah sa najlepšie číta samostatne.' },
        closing: { en: 'A child is not an entry in a ranking: it helps when the adult meets a child where they are and keeps comparisons, even kind ones, out of earshot.', sk: 'Dieťa nie je položka v rebríčku: pomáha, keď dospelý príde k dieťaťu tam, kde práve je, a porovnávanie, aj to láskavé, nechá mimo doslechu.' },
    },
    /* How the reading ends in this domain, by the shape of its story: why a step of this size suits it, and one question. The step itself is the first research-backed practice the story calls for. */
    endings: {
        converge: {
            next: [
                { en: 'Where {both} already meet easily, in {phrase}, the best use is to make room for it: ordinary time together in which that shared style can simply be enjoyed.', sk: 'Tam, kde sa {both} už stretávajú ľahko, v oblasti „{phrase}“, je najlepšie nechať tomu priestor: obyčajný spoločný čas, v ktorom si tento spoločný štýl možno jednoducho užívať.' },
                { en: 'Common ground in {phrase} is a resource for the relationship, so the step that fits is a modest one that uses it, not a project.', sk: 'Spoločná pôda v oblasti „{phrase}“ je zdrojom vzťahu, preto sedí skromný krok, ktorý túto pôdu využije, a nie projekt.' },
            ],
            ask: [
                { en: 'On {phrase}, what does the child do when things are going well?', sk: 'Čo robí dieťa v oblasti „{phrase}“, keď sa darí?' },
                { en: 'On {phrase}, when does it feel easiest, and what is different about those moments?', sk: 'Kedy to v oblasti „{phrase}“ ide najľahšie a čím sa tie chvíle líšia?' },
            ],
            step: [
                { en: 'Set aside a regular stretch of ordinary time in which the shared style is simply enjoyed, with no teaching in it.', sk: 'Vyhraď si pravidelný kúsok obyčajného času, v ktorom sa spoločný štýl len užíva, bez poučovania.' },
                { en: 'Say aloud, once, what you enjoy about doing this together.', sk: 'Povedz nahlas, raz, čo ťa na tom, keď to robíte spolu, teší.' },
            ],
        },
        complement: {
            next: [
                { en: 'The difference in {phrase} can help a child, who gets another way of seeing things, if the adult names it as a difference and not as a fault.', sk: 'Rozdiel v oblasti „{phrase}“ môže dieťaťu pomôcť, lebo dostane iný pohľad na veci, ak dospelý človek rozdiel pomenuje ako rozdiel a nie ako chybu.' },
                { en: 'A difference in style is a chance to model: the adult can show another way of handling things in {phrase} without insisting it is the only one.', sk: 'Rozdiel v štýle je príležitosť ísť príkladom: dospelý človek môže ukázať iný spôsob, ako zvládať oblasť „{phrase}“, a netvrdiť pritom, že je jediný.' },
            ],
            ask: [
                { en: 'On {phrase}, what does the child gain from the adult’s way, and what does the adult gain from the child’s?', sk: 'Čo dieťa získava zo spôsobu dospelého človeka v oblasti „{phrase}“ a čo dospelý človek získava zo spôsobu dieťaťa?' },
                { en: 'On {phrase}, where could the adult follow the child’s lead for a week?', sk: 'Kde by sa mohol dospelý človek v oblasti „{phrase}“ na týždeň nechať viesť dieťaťom?' },
            ],
            step: [
                { en: 'Name the difference as a difference (“we do this differently”), not as a fault, and show the other way once without pressing it.', sk: 'Pomenuj rozdiel ako rozdiel („robíme to inak“), nie ako chybu, a ukáž ten druhý spôsob raz, bez nátlaku.' },
                { en: 'Let the child choose how one small thing is done this week, and do it that way.', sk: 'Nechaj dieťa tento týždeň vybrať si spôsob jednej drobnosti a urob to tak.' },
            ],
        },
        tension: {
            next: [
                { en: 'Because the likeliest snag is {phrase}, the adult has most of the room to adapt, and a small change on the adult’s side usually does more than a change asked of the child.', sk: 'Ak sa najľahšie zadrhne v oblasti „{phrase}“, má dospelý človek najviac priestoru na prispôsobenie a malá zmena na strane dospelého človeka zvyčajne zaberie viac než zmena žiadaná od dieťaťa.' },
                { en: 'Friction in {phrase} is information about fit, not about the child, so a first step that adjusts the approach is better than one that adjusts the child.', sk: 'Trenie v oblasti „{phrase}“ je informácia o zhode, nie o dieťati, takže prvý krok, ktorý upraví prístup, je lepší než taký, ktorý upraví dieťa.' },
            ],
            ask: [
                { en: 'On {phrase}, what would help the child feel understood?', sk: 'Čo by pomohlo dieťaťu cítiť sa pochopené v oblasti „{phrase}“?' },
                { en: 'On {phrase}, what would the adult try differently for one week?', sk: 'Čo by dospelý človek na týždeň skúsil v oblasti „{phrase}“ inak?' },
            ],
            step: [
                { en: 'For a week, change one thing in your own approach (the timing, the tone, the warning) and watch what changes.', sk: 'Na týždeň zmeň jednu vec vo vlastnom prístupe (načasovanie, tón, upozornenie) a sleduj, čo sa zmení.' },
                { en: 'Choose the moment of the day where the friction usually starts, and step in a little earlier and a little calmer.', sk: 'Vyber si chvíľu v dni, kde sa trenie zvyčajne začína, a zasiahni o trochu skôr a pokojnejšie.' },
            ],
        },
        asymmetry: {
            next: [
                { en: 'When one side leans clearly in {phrase}, the other may take the lean for a choice, so the step that fits is to notice what it looks like before responding to it.', sk: 'Keď sa jedna strana v oblasti „{phrase}“ jasne nakláňa, druhá môže ten sklon brať ako rozhodnutie, preto sa hodí najprv si všimnúť, ako vyzerá, a až potom naň reagovať.' },
                { en: 'A one-sided lean shows most at ordinary moments, which makes ordinary moments the place to watch first.', sk: 'Jednostranný sklon sa ukazuje najviac v obyčajných chvíľach, a tak sú obyčajné chvíle miestom, kde sa oplatí pozerať najprv.' },
            ],
            ask: [
                { en: 'On {phrase}, when does the lean show most clearly, and what is going on just before?', sk: 'Kedy sa sklon v oblasti „{phrase}“ ukazuje najjasnejšie a čo sa deje tesne predtým?' },
                { en: 'On {phrase}, what does the child seem to need that is easy to miss?', sk: 'Čo podľa všetkého dieťa v oblasti „{phrase}“ potrebuje, čo sa dá ľahko prehliadnuť?' },
            ],
            step: [
                { en: 'For a few days, watch what the lean looks like at ordinary moments, and answer the need behind it before the behaviour.', sk: 'Niekoľko dní sleduj, ako vyzerá ten sklon v obyčajných chvíľach, a reaguj na potrebu, ktorá je za tým, skôr než na správanie.' },
                { en: 'Once, at a calm moment, ask what would make this part of the day easier, and try the answer.', sk: 'Raz v pokojnej chvíli sa spýtaj, čo by túto časť dňa uľahčilo, a vyskúšaj odpoveď.' },
            ],
        },
    },
    restraint: [
        { en: 'It is fine to begin by watching: a few days of noticing what happens there, without trying to change anything, often shows the adult what to do next.', sk: 'Je v poriadku začať aj pozorovaním: pár dní všímania si, čo sa tam deje, bez snahy čokoľvek meniť, často ukáže dospelému človekovi, čo robiť ďalej.' },
    ],
    closing: { en: 'Children keep changing, and no profile captures every part of how they respond. Notice what you actually see in this child, keep what helps you understand them, and leave room for what is different.', sk: 'Deti sa stále menia a žiadny profil nezachytí všetko z ich prežívania. Všímaj si, čo u konkrétneho dieťaťa naozaj vidíš. Nechaj si to, čo ti pomáha lepšie mu porozumieť, a daj priestor aj tomu, čo je inak.' },
};
export default CONTENT;
