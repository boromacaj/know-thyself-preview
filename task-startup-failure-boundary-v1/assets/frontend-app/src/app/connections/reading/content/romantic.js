/**
 * ROMANTIC: ADULT PARTNERS, ANY GENDER COMBINATION.
 *
 * The words a partner reading is built from. Grammar rules: see contentTypes.ts. Practices cite docs/research/connections/corpus-romantic.json and stay inside its `notFor`
 * and safety boundaries (no prediction, no attachment types, no gendered roles, nothing for a relationship where one partner is afraid: that is what `care` is for).
 */
const CONTENT = {
    domain: 'romantic',
    axes: {
        /* ------------------------------------------------------------------ processing-pace -- */
        'inner-focus': {
            label: { en: 'How each digests a feeling', sk: 'Ako každý spracúva city' },
            phrase: { en: 'how each digests a feeling or a disagreement', sk: 'to, ako každý spracúva city a nezhody' },
            title: {
                shared: { en: 'The same rhythm of settling', sk: 'Rovnaký rytmus upokojenia' },
                opposed: { en: 'Time to think, or talk it out now', sk: 'Čas na rozmyslenie, alebo rozhovor hneď' },
                oneSided: { en: 'One settles inward, one meets either pace', sk: 'Ticho na jednej strane, prispôsobivosť na druhej' },
            },
            scale: [{ en: 'Needs quiet first', sk: 'Najprv ticho' }, { en: 'Talks it through', sk: 'Hneď to vysloviť' }],
            poles: {
                introspective: {
                    one: { en: 'goes quiet to find out what is felt before saying anything', sk: 'sa najprv odmlčí a v tichu zisťuje, čo cíti, a až potom to vysloví' },
                    many: { en: 'go quiet to find out what is felt before saying anything', sk: 'sa najprv odmlčia a v tichu zisťujú, čo cítia, a až potom to vyslovia' },
                    gift: {
                        en: 'What comes after the quiet is usually weighed, and truer to the feeling underneath than a first reaction would be.',
                        sk: 'To, čo príde po tichu, býva premyslené a vernejšie tomu, čo sa deje vo vnútri, než prvá reakcia.',
                    },
                    cost: {
                        en: 'To someone who wants the matter settled tonight, the silence can read as distance, or as a door quietly closing.',
                        sk: 'Pre toho, kto chce vec vyriešiť ešte dnes večer, môže ticho pôsobiť ako odstup alebo ako potichu zatvárané dvere.',
                    },
                    asks: {
                        en: 'It asks for time that is not hurried, and in return owes a clear word on when the conversation will come back.',
                        sk: 'Žiada si čas, ktorý nikto nesúri, a na oplátku dlhuje jasné slovo o tom, kedy sa rozhovor vráti.',
                    },
                },
                'outwardly-engaged': {
                    one: { en: 'works out what is felt by saying it aloud and hearing it answered', sk: 'zisťuje, čo cíti, tak, že to vysloví a počuje odpoveď' },
                    many: { en: 'work out what is felt by saying it aloud and hearing it answered', sk: 'zisťujú, čo cítia, tak, že to vyslovia a počujú odpoveď' },
                    gift: {
                        en: 'Little is left to fester: a hurt gets named while it is small, and the air clears the same evening.',
                        sk: 'Máločo sa nechá hniť: krivda sa pomenuje, kým je malá, a vzduch sa vyčistí ešte v ten istý večer.',
                    },
                    cost: {
                        en: 'Pressed for an answer at once, a slower partner can feel cornered, and words said in the heat land harder than intended.',
                        sk: 'Pod tlakom okamžitej odpovede môže mať pomalší človek pocit, že nemá kam ustúpiť, a slová vyslovené v rozpálení dopadnú tvrdšie, než boli myslené.',
                    },
                    asks: {
                        en: 'What it needs is a listener now, or at least an exact time when the listening will happen, rather than a closed door.',
                        sk: 'Potrebuje ucho hneď teraz, alebo aspoň presný čas, kedy príde na rad, nie zavreté dvere.',
                    },
                },
            },
            shared: {
                introspective: {
                    gain: {
                        en: '{both} tend to give each other room to land before anything is decided, so less gets said in the heat of the moment that has to be taken back.',
                        sk: '{both} si navzájom dávajú priestor upokojiť sa skôr, než sa niečo rozhodne, a tak v zápale hádky zaznie len máločo, čo treba brať späť.',
                    },
                    risk: {
                        en: 'The catch is the hard conversation that two quiet people can postpone together for weeks, each waiting for the other to open it.',
                        sk: 'Háčik je v ťažkom rozhovore, ktorý dvaja tichší ľudia dokážu spoločne odkladať celé týždne, pretože každý čaká, kým tú tému otvorí druhý človek.',
                    },
                },
                'outwardly-engaged': {
                    gain: {
                        en: '{both} clear the air quickly; a quarrel at breakfast is usually talked through by dinner, and nobody carries it alone for long.',
                        sk: '{both} vedia rýchlo vyčistiť vzduch; ranná hádka býva do večere prebraná a nikto nenosí ťarchu dlho sám v sebe.',
                    },
                    risk: {
                        en: 'With two fast talkers, a disagreement can speed up instead of settling, and the thing that needed a night’s sleep gets decided at its loudest.',
                        sk: 'Keď chce vec vyriešiť hneď každá strana, nezhoda sa môže namiesto upokojenia rozbehnúť a to, čo potrebovalo noc spánku, sa rozhodne v najhlasnejšej chvíli.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: 'Handled well, the pair has both halves of a good argument: the immediate honesty {p1} brings and the considered answer {p0} returns with later.',
                    sk: 'Keď sa to zvládne, dvojica má dve polovice dobrého sporu: {p1} prináša okamžitú úprimnosť a {p0} neskôr premyslenú odpoveď.',
                },
                risk: {
                    en: 'The usual misunderstanding runs in a circle: {p1} reaches for the conversation, {p0} steps back to settle, the step back sounds like refusal, and {p1} reaches harder.',
                    sk: 'Typické nedorozumenie sa točí v kruhu: {p1} sa snaží o rozhovor, {p0} ustúpi do ticha, aby sa veci usadili, ten ústup znie ako odmietnutie, a tak {p1} tlačí ešte viac.',
                },
                bridge: {
                    en: 'A small agreement does most of the work: {p0} names how long the quiet will last and when the talk resumes, and {p1} holds the topic until then.',
                    sk: 'Väčšinu práce urobí malá dohoda: {p0} povie, ako dlho bude ticho trvať a kedy sa k téme vrátia, a {p1} dovtedy tému podrží.',
                },
            },
            oneSided: {
                introspective: {
                    note: {
                        en: '{lean} does the quiet part of the work and {mid} can meet a slower or a faster tempo, which usually spares the pair the circle of push and retreat.',
                        sk: '{lean} odvedie tichú časť práce a {mid} sa vie prispôsobiť pomalšiemu aj rýchlejšiemu tempu, čo páru zvyčajne ušetrí kolotoč tlačenia a ústupu.',
                    },
                },
                'outwardly-engaged': {
                    note: {
                        en: '{lean} tends to open the conversation and {mid} can follow at that pace or slow it a little, which keeps hard topics from going unspoken.',
                        sk: '{lean} zvyčajne otvára rozhovor a {mid} vie ísť v rovnakom tempe alebo tempo trochu pribrzdiť, takže ťažké témy len zriedka zostanú nevyslovené.',
                    },
                },
            },
            swings: {
                en: 'The pattern can shift with mood and tiredness rather than staying fixed.',
                sk: 'Vzorec sa môže meniť podľa nálady a únavy a nemusí zostať pevný.',
            },
        },
        /* ------------------------------------------------------------------ reasoning-style -- */
        reasoning: {
            label: { en: 'How each makes sense of things', sk: 'Ako každý chápe veci' },
            phrase: { en: 'how each makes sense of a feeling or a choice', sk: 'to, ako každý chápe city a rozhodnutia' },
            title: {
                shared: { en: 'Two minds that work alike', sk: 'Rovnaký spôsob uvažovania' },
                opposed: { en: 'Reasons and hunches', sk: 'Dôvody a tušenia' },
                oneSided: { en: 'One clear lens, one mind that can borrow it', sk: 'Výrazný pohľad a myseľ, ktorá sa mu prispôsobí' },
            },
            scale: [{ en: 'Reasons it through', sk: 'Premyslí si to' }, { en: 'Goes by feel', sk: 'Riadi sa citom' }],
            poles: {
                analytical: {
                    one: { en: 'wants to understand why before trusting a feeling or a plan', sk: 'chce najprv pochopiť dôvod, a až potom dôveruje pocitu alebo plánu' },
                    many: { en: 'want to understand why before trusting a feeling or a plan', sk: 'chcú najprv pochopiť dôvod, a až potom dôverujú pocitu alebo plánu' },
                    gift: {
                        en: 'A worry looked at this way gets taken apart into pieces that can actually be handled.',
                        sk: 'Starosť, na ktorú sa takto pozrie, sa rozloží na kúsky, s ktorými sa dá naozaj niečo robiť.',
                    },
                    cost: {
                        en: 'Offered to someone who is upset, an explanation can sound like a ruling on whether the feeling is allowed.',
                        sk: 'Kto práve prežíva smútok alebo hnev, môže vysvetlenie počuť ako verdikt o tom, či má na ten pocit právo.',
                    },
                    asks: {
                        en: 'Patience with questions helps it most, along with a hunch that arrives with whatever reasons can be found for it.',
                        sk: 'Najviac pomôže trpezlivosť s otázkami a tušenie, ktoré prichádza aj s dôvodmi, aké sa preň dajú nájsť.',
                    },
                },
                intuitive: {
                    one: { en: 'reads a situation by its feel and often knows before being able to say why', sk: 'číta situáciu podľa toho, ako pôsobí, a často vie skôr, než dokáže povedať, prečo to tak je' },
                    many: { en: 'read a situation by its feel and often know before being able to say why', sk: 'čítajú situáciu podľa toho, ako pôsobí, a často vedia skôr, než dokážu povedať, prečo to tak je' },
                    gift: {
                        en: 'Shifts in mood get noticed early, often before a word has been said.',
                        sk: 'Zmena nálady sa zachytí včas, často skôr, než padne prvé slovo.',
                    },
                    cost: {
                        en: 'Asked to justify a sense that something is off, the reasons may not exist yet, and pressing for reasons can feel like doubt.',
                        sk: 'Keď treba obhájiť pocit, že niečo nie je v poriadku, dôvody ešte nemusia existovať, a naliehanie na ne pôsobí ako nedôvera.',
                    },
                    asks: {
                        en: 'The request underneath is simple: to be taken seriously as information, even before the reasons arrive.',
                        sk: 'Prosba v pozadí je jednoduchá: brať tušenie vážne ako informáciu, aj kým dôvody ešte nedorazili.',
                    },
                },
            },
            shared: {
                analytical: {
                    gain: {
                        en: '{both} can talk through even a tender subject without it turning into a fight, because each trusts a careful argument.',
                        sk: '{both} dokážu prebrať aj citlivú tému bez toho, aby sa zvrhla na hádku, lebo každý verí dôkladnému argumentu.',
                    },
                    risk: {
                        en: 'Two careful thinkers can solve a feeling instead of hearing it, and a moment that needed comfort gets a plan instead.',
                        sk: 'Dve premýšľavé hlavy môžu city riešiť namiesto toho, aby ich vypočuli, a chvíľa, ktorá potrebovala útechu, dostane plán.',
                    },
                },
                intuitive: {
                    gain: {
                        en: '{both} often understand each other without much explanation; a look across a room can carry a whole conversation.',
                        sk: '{both} si často rozumejú bez veľkého vysvetľovania; jeden pohľad cez miestnosť unesie celý rozhovor.',
                    },
                    risk: {
                        en: 'When two people read each other by feel, a misreading can go unchecked for a long time, since nobody thinks to ask.',
                        sk: 'Keď sa dvaja ľudia čítajú podľa pocitu, omyl môže dlho zostať neodhalený, pretože nikomu nenapadne sa spýtať.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: '{p0} brings the questions that test a plan and {p1} the sense of how it will feel to live with, and decisions made with both tend to hold.',
                    sk: '{p0} prináša otázky, ktoré plán preveria, a {p1} cit pre to, ako sa s tým plánom bude žiť; rozhodnutia, v ktorých je oboje, zvyčajne vydržia.',
                },
                risk: {
                    en: 'Badly coordinated, {p0} asks for reasons the moment {p1} shares a feeling, and {p1} stops sharing feelings that cannot be defended.',
                    sk: 'Ak sa to nezladí, {p0} žiada dôvody hneď, ako {p1} prezradí pocit, a {p1} prestane hovoriť o pocitoch, ktoré sa nedajú obhájiť.',
                },
                bridge: {
                    en: 'It helps to agree that a hunch counts as a valid first draft, which {p0} can then help test and {p1} can revise.',
                    sk: 'Pomáha dohoda, že tušenie platí ako prvý náčrt, ktorý {p0} pomôže preveriť a {p1} môže neskôr upraviť.',
                },
            },
            oneSided: {
                analytical: {
                    note: {
                        en: '{lean} supplies the careful reasoning and {mid} can follow it or step back to a gut sense, so no way of knowing gets crowded out.',
                        sk: '{lean} prináša dôkladnú úvahu a {mid} vie ísť s úvahou alebo sa oprieť o vnútorný pocit, takže ani jeden spôsob poznania nevytlačí ten druhý.',
                    },
                },
                intuitive: {
                    note: {
                        en: '{lean} senses the mood of things early and {mid} can translate that sense into words and reasons when a decision calls for that.',
                        sk: '{lean} vycíti náladu skôr a {mid} vie tento pocit preložiť do slov a dôvodov, keď ich rozhodnutie potrebuje.',
                    },
                },
            },
            swings: {
                en: 'Here {who} moves between careful thought and gut feeling, depending on what is at stake.',
                sk: '{who} tu prechádza medzi dôkladnou úvahou a citom podľa toho, o čo práve ide.',
            },
        },
        /* --------------------------------------------------------------- closeness-and-room -- */
        autonomy: {
            label: { en: 'Closeness and room', sk: 'Blízkosť a priestor' },
            phrase: { en: 'the balance of closeness and room each needs', sk: 'rovnováha blízkosti a vlastného priestoru' },
            title: {
                shared: { en: 'The same measure of closeness', sk: 'Rovnaká miera blízkosti' },
                opposed: { en: 'One reaches in, one needs air', sk: 'Túžba po blízkosti a potreba vzduchu' },
                oneSided: { en: 'One clear need, one who flexes', sk: 'Jasná potreba na jednej strane, pružnosť na druhej' },
            },
            scale: [{ en: 'Needs room of one’s own', sk: 'Vlastný priestor' }, { en: 'Wants to do life together', sk: 'Všetko spolu' }],
            poles: {
                independent: {
                    one: { en: 'needs stretches of time that belong to no one else, and comes back the warmer for it', sk: 'potrebuje úseky času, ktoré nepatria nikomu inému, a po nich sa vracia s väčšou vrúcnosťou' },
                    many: { en: 'need stretches of time that belong to no one else, and come back the warmer for it', sk: 'potrebujú úseky času, ktoré nepatria nikomu inému, a po nich sa vracajú s väčšou vrúcnosťou' },
                    gift: {
                        en: 'Togetherness that is freely returned to, again and again, carries the feeling of being chosen.',
                        sk: 'Blízkosť, ku ktorej sa niekto slobodne a opakovane vracia, nepôsobí ako povinnosť, ale ako voľba.',
                    },
                    cost: {
                        en: 'To a partner who wants more togetherness, a closed door or a solo weekend can feel like a verdict on the relationship.',
                        sk: 'Pre toho, kto túži po väčšej blízkosti, môžu zatvorené dvere alebo víkend osamote pôsobiť ako verdikt nad vzťahom.',
                    },
                    asks: {
                        en: 'Room that is not taken as rejection is the need here, and the debt it owes is a clear signal that the room has an end.',
                        sk: 'Potrebuje priestor, ktorý nikto neberie ako odmietnutie, a dlhuje jasný signál, že ten priestor má koniec.',
                    },
                },
                collaborative: {
                    one: { en: 'feels most at home when plans, evenings and problems are shared', sk: 'sa cíti najlepšie, keď sú plány, večery aj starosti spoločné' },
                    many: { en: 'feel most at home when plans, evenings and problems are shared', sk: 'sa cítia najlepšie, keď sú plány, večery aj starosti spoločné' },
                    gift: {
                        en: 'Hardly anything has to be carried alone; a bad day is met with company before it has to be explained.',
                        sk: 'Máloktorú vec treba niesť osamote; zlý deň sa stretne s pochopením skôr, než príde na vysvetľovanie.',
                    },
                    cost: {
                        en: 'For someone who needs air, the steady invitation to do things together can start to feel like being watched.',
                        sk: 'Kto potrebuje vzduch, tomu môže neustále pozývanie k spoločným veciam začať pripadať ako dohľad.',
                    },
                    asks: {
                        en: 'Inclusion and reassurance are what it looks for, and to be told plainly when room is needed, so the gap is not filled with worry.',
                        sk: 'Hľadá zapojenie, uistenie a priame slovo vo chvíli, keď je potrebný priestor, aby odstup nezaplnili obavy.',
                    },
                },
            },
            shared: {
                independent: {
                    gain: {
                        en: '{both} give each other a long rope without keeping score, and time together tends to be chosen rather than expected.',
                        sk: '{both} si nechávajú dlhé lano a nerátajú body, takže spoločný čas býva skôr voľbou ako povinnosťou.',
                    },
                    risk: {
                        en: 'Two people who both protect their room can drift into parallel lives, each assuming the other prefers it that way.',
                        sk: 'Dvaja ľudia, ktorí si strážia svoj priestor, sa môžu nebadane rozísť do súbežných životov, pričom každý predpokladá, že druhému človeku to tak vyhovuje.',
                    },
                },
                collaborative: {
                    gain: {
                        en: '{both} build a shared life easily: errands, friends and plans flow into a common pool, and nobody has to ask for a place at the table.',
                        sk: '{both} ľahko budujú spoločný život: pochôdzky, priatelia aj plány plynú do spoločného a nikto nemusí žiadať o miesto pri stole.',
                    },
                    risk: {
                        en: 'So much is shared that individual wishes can go quiet, and one day each finds a part of life put away for the sake of the couple.',
                        sk: 'Spoločného je toľko, že osobné túžby môžu stíchnuť, a jedného dňa každý zistí, že kus vlastného života ostáva odložený kvôli páru.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: 'Once the rhythm is named, the difference becomes a strength: {p0} brings air and a life outside the pair, {p1} keeps the threads of the shared life tied.',
                    sk: 'Keď sa rytmus pomenuje, z rozdielu je sila: {p0} prináša vzduch a život aj mimo páru, {p1} drží pokope nitky spoločného života.',
                },
                risk: {
                    en: 'The loop is familiar: {p1} reaches for more contact, {p0} feels crowded and steps away, and with every step away, {p1} reaches a little harder.',
                    sk: 'Ten kruh je známy: {p1} sa načahuje po väčšom kontakte, {p0} sa cíti stiesnene a ustúpi, a s každým ústupom sa {p1} načahuje o niečo viac.',
                },
                bridge: {
                    en: 'Predictability does more than any amount of talk: {p0} says when the time apart ends, and {p1} can trust it because it keeps happening.',
                    sk: 'Viac než akékoľvek reči pomôže predvídateľnosť: {p0} povie, kedy sa čas osamote skončí, a {p1} tomu môže veriť, pretože sa to opakovane naozaj stane.',
                },
            },
            oneSided: {
                independent: {
                    note: {
                        en: '{lean} needs a measure of room and {mid} can usually give it without feeling left, which keeps the pair out of the usual tug-of-war.',
                        sk: '{lean} potrebuje istú mieru priestoru a {mid} to zväčša vie dopriať bez pocitu opustenosti, takže pár sa vyhne obvyklému preťahovaniu.',
                    },
                },
                collaborative: {
                    note: {
                        en: '{lean} looks for a lot of shared time and {mid} can meet much of it, though it helps to say out loud where the edge of that is.',
                        sk: '{lean} hľadá veľa spoločného času a {mid} vie väčšinu toho dať, hoci pomáha nahlas povedať, kde je hranica.',
                    },
                },
            },
            swings: {
                en: 'Closeness and room trade places for {who} from week to week, so this picture moves with circumstance.',
                sk: '{who} si blízkosť a priestor strieda z týždňa na týždeň, takže tento obraz sa mení s okolnosťami.',
            },
        },
        /* -------------------------------------------------------- structure-and-flexibility -- */
        structure: {
            label: { en: 'Plans and spontaneity', sk: 'Plány a spontánnosť' },
            phrase: { en: 'how each likes daily life to be arranged', sk: 'to, ako si každý predstavuje usporiadanie bežného dňa' },
            title: {
                shared: { en: 'The same way of arranging a life', sk: 'Rovnaký spôsob, ako si zariadiť život' },
                opposed: { en: 'The list and the open evening', sk: 'Zoznam úloh a voľný večer' },
                oneSided: { en: 'One keeps the plan, one goes with it', sk: 'Plán na jednej strane, ochota prispôsobiť sa na druhej' },
            },
            scale: [{ en: 'Likes it planned', sk: 'Podľa plánu' }, { en: 'Takes it as it comes', sk: 'Podľa chvíle' }],
            poles: {
                structured: {
                    one: { en: 'likes to know what the week holds and who is doing what', sk: 'chce vedieť, čo prinesie týždeň a kto čo robí' },
                    many: { en: 'like to know what the week holds and who is doing what', sk: 'chcú vedieť, čo prinesie týždeň a kto čo robí' },
                    gift: {
                        en: 'Bills get paid, birthdays get remembered, and the household has a floor nobody has to think about.',
                        sk: 'Účty sú zaplatené, na narodeniny sa nezabudne a domácnosť má pevnú podlahu, o ktorej nikto nemusí premýšľať.',
                    },
                    cost: {
                        en: 'A plan held too tightly turns small changes into small betrayals, and spontaneity starts to look like carelessness.',
                        sk: 'Plán, ktorý sa drží príliš pevne, mení drobné zmeny na drobné zrady a spontánnosť začne vyzerať ako ľahkovážnosť.',
                    },
                    asks: {
                        en: 'Warning before a plan changes matters to it, and agreements that are kept or renegotiated rather than quietly dropped.',
                        sk: 'Dôležité je upozornenie pred zmenou plánu a dohody, ktoré sa dodržia alebo nanovo dohodnú, nie potichu zahodia.',
                    },
                },
                adaptable: {
                    one: { en: 'decides late, follows the day and is at ease when plans dissolve', sk: 'sa rozhoduje na poslednú chvíľu, ide s dňom, a keď sa plány rozplynú, berie to s pokojom' },
                    many: { en: 'decide late, follow the day and are at ease when plans dissolve', sk: 'sa rozhodujú na poslednú chvíľu, idú s dňom, a keď sa plány rozplynú, berú to s pokojom' },
                    gift: {
                        en: 'A cancelled train becomes an evening somewhere unexpected; life keeps some room for surprise.',
                        sk: 'Zrušený vlak sa zmení na večer na nečakanom mieste; v živote zostáva miesto pre prekvapenie.',
                    },
                    cost: {
                        en: 'The other person can end up carrying the invisible planning, and from that side the ease can look like not caring.',
                        sk: 'Neviditeľné plánovanie potom môže zostať na druhom človeku a z tej strany ľahkosť vyzerá ako nezáujem.',
                    },
                    asks: {
                        en: 'In return for room to decide in the moment, it owes an early word when a shared plan is going to slip.',
                        sk: 'Za priestor rozhodnúť sa vo chvíli dlhuje včasné slovo, keď spoločný plán začne kĺzať.',
                    },
                },
            },
            shared: {
                structured: {
                    gain: {
                        en: '{both} tend to keep a calm, predictable daily rhythm together, and the week is less likely to surprise them in a bad way.',
                        sk: '{both} spolu zvyčajne držia pokojný, predvídateľný denný rytmus a týždeň ich tak menej často nepríjemne prekvapí.',
                    },
                    risk: {
                        en: 'A plan guarded from two sides can harden into rules nobody chose, and two diaries leave little room for an evening that just happens.',
                        sk: 'Plán, ktorý strážia dve strany naraz, môže stvrdnúť na pravidlá, ktoré vlastne nikto nechce, a dva diáre nechajú len málo miesta pre večer, ktorý sa jednoducho stane.',
                    },
                },
                adaptable: {
                    gain: {
                        en: '{both} move easily with whatever the day brings, and a change of plan rarely becomes an argument.',
                        sk: '{both} ľahko plávajú s tým, čo deň prinesie, a zmena plánu sa len zriedka zvrhne na hádku.',
                    },
                    risk: {
                        en: 'Nobody quite owns the dull things, so the insurance, the dentist and the rent can slide until they arrive as a crisis.',
                        sk: 'Nudné veci nikomu celkom nepatria, a tak poistka, zubár a nájom môžu kĺzať, až kým neprídu ako kríza.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: 'Between them, the pair has a spine and a pulse: the plans that make life work and the openness that keeps it feeling alive.',
                    sk: 'Spolu má pár chrbtovú kosť aj tep: plány, vďaka ktorým život funguje, a otvorenosť, vďaka ktorej je živý.',
                },
                risk: {
                    en: 'Small things carry the friction: {p0} plans the weekend on Wednesday, {p1} wants to see how Saturday feels, and each reads the other’s habit as a statement about the relationship.',
                    sk: 'Trenie sa skrýva v maličkostiach: {p0} plánuje víkend už v stredu, {p1} chce vidieť, ako bude v sobotu, a každý číta zvyk druhého človeka ako výrok o vzťahu.',
                },
                bridge: {
                    en: 'It eases a lot when the fixed points are few and agreed, so {p0} knows what will hold and {p1} knows what is free.',
                    sk: 'Veľa sa uvoľní, keď je pevných bodov málo a sú dohodnuté: {p0} vie, čo platí, a {p1} vie, čo je voľné.',
                },
            },
            oneSided: {
                structured: {
                    note: {
                        en: '{lean} keeps the calendar and {mid} can work inside it or bend it a little, which tends to keep daily life running without much friction.',
                        sk: '{lean} drží kalendár a {mid} sa v ňom vie pohybovať alebo plán trochu ohnúť, takže bežný život zvyčajne beží bez väčšieho trenia.',
                    },
                },
                adaptable: {
                    note: {
                        en: '{lean} goes with the day and {mid} can supply just enough planning to keep the dull essentials covered.',
                        sk: '{lean} ide s dňom a {mid} vie dodať práve toľko plánovania, aby nudné nevyhnutnosti neostali nepokryté.',
                    },
                },
            },
            swings: {
                en: 'Planning comes in seasons for {who}, firm for a while and loose after, so this can change from month to month.',
                sk: '{who} plánuje po obdobiach, chvíľu pevne a potom voľne, takže sa to môže meniť z mesiaca na mesiac.',
            },
        },
        /* ------------------------------------------------------------------ risk-and-caution -- */
        risk: {
            label: { en: 'Caution and daring', sk: 'Opatrnosť a odvaha' },
            phrase: { en: 'how much uncertainty each can live with', sk: 'miera neistoty, ktorú každý znesie' },
            title: {
                shared: { en: 'The same comfort with risk', sk: 'Rovnaký vzťah k riziku' },
                opposed: { en: 'The brake and the accelerator', sk: 'Brzda a plyn' },
                oneSided: { en: 'One sets the measure of risk, one adjusts', sk: 'Mieru rizika určuje jedna strana' },
            },
            scale: [{ en: 'Plays it safe', sk: 'Radšej istota' }, { en: 'Takes the leap', sk: 'Skok do neznáma' }],
            poles: {
                cautious: {
                    one: { en: 'wants to see the floor before stepping onto it, especially where money or a home is involved', sk: 'chce vidieť pevnú zem skôr, než na ňu vkročí, najmä keď ide o peniaze alebo domov' },
                    many: { en: 'want to see the floor before stepping onto it, especially where money or a home is involved', sk: 'chcú vidieť pevnú zem skôr, než na ňu vkročia, najmä keď ide o peniaze alebo domov' },
                    gift: {
                        en: 'A shared life gets a safety net: savings, a backup plan and a second look before a signature.',
                        sk: 'Spoločný život dostane záchrannú sieť: úspory, záložný plán a druhý pohľad pred podpisom.',
                    },
                    cost: {
                        en: 'Held too long, the second look becomes a standing no, and an opportunity the whole couple wanted can quietly expire.',
                        sk: 'Ak trvá príliš dlho, druhý pohľad sa zmení na trvalé nie a príležitosť, o ktorú stojí celý pár, potichu vyprší.',
                    },
                    asks: {
                        en: 'It asks for the worry to be heard in detail rather than argued down, and for time to check what can be checked.',
                        sk: 'Žiada si, aby sa obavy vypočuli do detailu a nevyvracali, a čas preveriť, čo sa preveriť dá.',
                    },
                },
                'risk-oriented': {
                    one: { en: 'feels the pull of the move, the venture or the change long before the details are known', sk: 'cíti ťah sťahovania, nového podniku alebo zmeny dávno predtým, než sú známe podrobnosti' },
                    many: { en: 'feel the pull of the move, the venture or the change long before the details are known', sk: 'cítia ťah sťahovania, nového podniku alebo zmeny dávno predtým, než sú známe podrobnosti' },
                    gift: {
                        en: 'Doors get opened that caution alone would have walked past: the year abroad, the late change of career.',
                        sk: 'Otvárajú sa dvere, okolo ktorých by samotná opatrnosť prešla: rok v zahraničí, neskorá zmena povolania.',
                    },
                    cost: {
                        en: 'To a more careful partner, enthusiasm can feel like being hurried toward a cliff, with every doubt treated as an obstacle.',
                        sk: 'Opatrnejšiemu človeku môže nadšenie pripadať ako postrkovanie k útesu, pri ktorom sa každá pochybnosť berie ako prekážka.',
                    },
                    asks: {
                        en: 'A dream heard before it is costed is what it hopes for; what it owes is a real say for the other person before anything is signed.',
                        sk: 'Dúfa, že sen niekto vypočuje skôr, než príde na rad kalkulačka, a dlhuje druhému človeku skutočné slovo skôr, než sa čokoľvek podpíše.',
                    },
                },
            },
            shared: {
                cautious: {
                    gain: {
                        en: '{both} build steadily and rarely gamble what they share, so the ground under the relationship tends to feel solid.',
                        sk: '{both} budujú postupne a s tým, čo majú spoločné, len zriedka riskujú, takže pôda pod vzťahom pôsobí pevne.',
                    },
                    risk: {
                        en: 'Two careful people can talk each other out of every leap, and years later find the plans they once loved still sitting in a drawer.',
                        sk: 'Dve opatrné povahy si môžu navzájom vyhovoriť každý skok a po rokoch nájsť kedysi milované plány stále v šuplíku.',
                    },
                },
                'risk-oriented': {
                    gain: {
                        en: '{both} say yes to life together: the spontaneous trip, the bold move, the plan that sounded impossible at first.',
                        sk: '{both} spolu hovoria životu áno: spontánnej ceste, odvážnemu kroku, plánu, ktorý na začiatku znel nemožne.',
                    },
                    risk: {
                        en: 'With no one pulling on the brake, a shared enthusiasm can carry the pair past the point where a pause would have been wise.',
                        sk: 'Keď nikto nebrzdí, spoločné nadšenie môže pár preniesť cez bod, kde by bolo múdre zastaviť.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: 'Worked together, the pairing is strong: {p1} finds what is worth trying, and {p0} finds what would make it survivable if it goes wrong.',
                    sk: 'Keď ťahajú za jeden povraz, je to silná kombinácia: {p1} nájde, čo stojí za pokus, a {p0} to, vďaka čomu sa dá prežiť aj neúspech.',
                },
                risk: {
                    en: 'Big decisions can stall in a familiar way: {p1} pushes for the move, {p0} lists what could go wrong, and soon the two sides are fighting each other rather than the question.',
                    sk: 'Veľké rozhodnutia sa vedia zaseknúť známym spôsobom: {p1} tlačí na krok vpred, {p0} vymenúva, čo sa môže pokaziť, a čoskoro spolu bojujú dve strany namiesto toho, aby riešili otázku.',
                },
                bridge: {
                    en: 'What helps most is agreeing the floor first, what must stay safe whatever happens, so {p0} can relax and {p1} can dare above it.',
                    sk: 'Najviac pomôže dohodnúť najprv dno, teda to, čo musí zostať v bezpečí za každých okolností: {p0} tak dostane pokoj a {p1} priestor odvážiť sa nad touto hranicou.',
                },
            },
            oneSided: {
                cautious: {
                    note: {
                        en: '{lean} tends to keep a hand on the brake, and {mid} can go either way, which usually keeps big choices measured but still moving.',
                        sk: '{lean} zvyčajne drží ruku na brzde a {mid} sa vie prikloniť na ktorúkoľvek stranu, takže veľké rozhodnutia ostávajú uvážené, no nezastavia sa.',
                    },
                },
                'risk-oriented': {
                    note: {
                        en: '{lean} carries the appetite for change and {mid} can either join in or slow things a little, which gives bold plans a second opinion.',
                        sk: '{lean} prináša chuť do zmien a {mid} sa vie pridať alebo veci trochu spomaliť, čím odvážne plány dostanú druhý názor.',
                    },
                },
            },
            swings: {
                en: 'Caution and daring sit side by side in {who}, so much depends on whether money, home or pride is in play.',
                sk: '{who} má v sebe vedľa seba opatrnosť aj odvahu, takže veľa závisí od toho, či ide o peniaze, domov alebo hrdosť.',
            },
        },
        /* -------------------------------------------------------------- emotional-expression -- */
        'emotional-expression': {
            label: { en: 'How feeling is shown', sk: 'Ako sa ukazujú city' },
            phrase: { en: 'how openly each shows feeling and affection', sk: 'to, ako otvorene každý ukazuje city a náklonnosť' },
            title: {
                shared: { en: 'A shared language of feeling', sk: 'Spoločný jazyk citov' },
                opposed: { en: 'Said aloud, or shown in deeds', sk: 'Vyslovené nahlas, alebo ukázané skutkom' },
                oneSided: { en: 'One shows it openly, one meets it', sk: 'Otvorený prejav a pokojná odpoveď' },
            },
            scale: [{ en: 'Shows it openly', sk: 'Ukáže to navonok' }, { en: 'Keeps it inside', sk: 'Nechá si to vo vnútri' }],
            poles: {
                'emotionally-expressive': {
                    one: { en: 'lets joy, hurt and affection show while still fresh', sk: 'dáva radosť, bolesť aj náklonnosť najavo, kým sú ešte čerstvé' },
                    many: { en: 'let joy, hurt and affection show while still fresh', sk: 'dávajú radosť, bolesť aj náklonnosť najavo, kým sú ešte čerstvé' },
                    gift: {
                        en: 'Feeling named while it is fresh spares a relationship long guessing, and warmth is easy to find.',
                        sk: 'Cit pomenovaný, kým je čerstvý, ušetrí vzťah dlhého hádania a vrúcnosť nie je ťažké nájsť.',
                    },
                    cost: {
                        en: 'At full strength the feeling can fill the room, and a quieter partner may hear a storm where only weather was meant.',
                        sk: 'V plnej sile môže cit zaplniť celú miestnosť a tichší človek začuje búrku tam, kde išlo len o počasie.',
                    },
                    asks: {
                        en: 'A response is what it seeks, not necessarily agreement: some sign that the feeling arrived and found a place.',
                        sk: 'Hľadá odozvu, nie nutne súhlas: znamenie, že cit dorazil a našiel miesto.',
                    },
                },
                'emotionally-contained': {
                    one: { en: 'keeps feeling close and shows care more through what is done than what is said', sk: 'drží city blízko pri sebe a starostlivosť ukazuje skôr skutkami než slovami' },
                    many: { en: 'keep feeling close and show care more through what is done than what is said', sk: 'držia city blízko pri sebe a starostlivosť ukazujú skôr skutkami než slovami' },
                    gift: {
                        en: 'There is a steadiness here that can be leaned on: the shelf repaired, the coat held out, a cool head in a crisis.',
                        sk: 'Je v tom pokoj, o ktorý sa dá oprieť: opravená polica, podaný kabát, chladná hlava v kríze.',
                    },
                    cost: {
                        en: 'Unspoken care can go unseen, and a partner who needs words may start to wonder whether the feeling is there at all.',
                        sk: 'Nevyslovená starostlivosť môže ostať nepovšimnutá a ten, kto potrebuje slová, začne pochybovať, či tam cit vôbec je.',
                    },
                    asks: {
                        en: 'It needs deeds read as the message intended, and patience while words catch up with what is already felt.',
                        sk: 'Potrebuje, aby sa skutky čítali ako odkaz, ktorým naozaj sú, a trpezlivosť, kým slová doženú to, čo sa už cíti.',
                    },
                },
            },
            shared: {
                'emotionally-expressive': {
                    gain: {
                        en: '{both} tend to say the warm things out loud and often, and a hurt is less likely to go unspoken long enough to harden.',
                        sk: '{both} si pekné veci hovoria nahlas a často a krivda len zriedka ostane nevyslovená tak dlho, aby stvrdla.',
                    },
                    risk: {
                        en: 'Two strong currents can amplify each other, so a small sting becomes a big scene before anyone has a chance to cool.',
                        sk: 'Dva silné prúdy sa vedia navzájom zosilniť, a tak sa z malého pichnutia stane veľká scéna skôr, než má ktokoľvek čas vychladnúť.',
                    },
                },
                'emotionally-contained': {
                    gain: {
                        en: '{both} give each other calm and dignity; hard days are met without drama and nobody is asked to perform a feeling.',
                        sk: '{both} si navzájom dopriavajú pokoj a dôstojnosť; ťažké dni sa zvládajú bez drámy a nikto nemusí cit predvádzať.',
                    },
                    risk: {
                        en: 'With two quiet hearts, affection and worry can both stay unspoken, until each wonders privately what the other really feels.',
                        sk: 'Pri dvoch tichých povahách môže ostať nevyslovená náklonnosť aj starosť, až kým sa každý potichu nezačne pýtať, čo naozaj cíti druhý človek.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: 'Read well, the difference covers two needs at once: {p0} keeps warmth audible, and {p1} keeps the ground steady when feelings run high.',
                    sk: 'Ak sa rozdiel číta správne, pokrýva dve potreby naraz: {p0} drží vrúcnosť počuteľnú a {p1} drží pôdu pevnú, keď city stúpajú.',
                },
                risk: {
                    en: 'The misunderstanding usually runs like this: {p0} reaches out in words and waits for words back, {p1} answers with a calm look or a deed, and each side feels the feeling went unanswered.',
                    sk: 'Nedorozumenie zvyčajne prebieha takto: {p0} sa natiahne slovami a čaká slová späť, {p1} odpovie pokojným pohľadom alebo skutkom a každej strane sa zdá, že cit nedostal odpoveď.',
                },
                bridge: {
                    en: 'Much changes once {p0} learns to read a deed as a sentence and {p1} puts one feeling a day into words, however short.',
                    sk: 'Veľa sa zmení, keď {p0} začne čítať skutok ako vetu a {p1} skúsi raz denne vysloviť jeden cit, hoci krátko.',
                },
            },
            oneSided: {
                'emotionally-expressive': {
                    note: {
                        en: '{lean} carries most of the spoken warmth and {mid} can answer in kind or more quietly, which tends to keep feeling flowing without flooding.',
                        sk: '{lean} nesie väčšinu vyslovenej vrúcnosti a {mid} vie odpovedať rovnako alebo tichšie, takže city plynú bez toho, aby všetko zaplavili.',
                    },
                },
                'emotionally-contained': {
                    note: {
                        en: '{lean} keeps feeling close and {mid} can gently draw it out or leave it be, which usually spares the pair a push for words.',
                        sk: '{lean} drží city blízko pri sebe a {mid} ich vie jemne vylákať alebo nechať tak, čo páru zvyčajne ušetrí tlak na slová.',
                    },
                },
            },
            swings: {
                en: 'For {who}, some feelings come out easily and others stay locked away, so a lot depends on the subject.',
                sk: '{who} niektoré city ukazuje ľahko a iné drží zamknuté, takže veľa závisí od témy.',
            },
        },
        /* --------------------------------------------------------------------- social-energy -- */
        visibility: {
            label: { en: 'Private life and social life', sk: 'Súkromie a spoločenský život' },
            phrase: { en: 'how much of the relationship each wants to share with others', sk: 'to, koľko zo vzťahu chce každý zdieľať s ostatnými' },
            title: {
                shared: { en: 'The same door to the world', sk: 'Rovnaké dvere do sveta' },
                opposed: { en: 'A quiet evening, or a full table', sk: 'Tichý večer, alebo plný stôl' },
                oneSided: { en: 'One guards the threshold, one is at ease', sk: 'Strážený prah a ľahkosť na druhej strane' },
            },
            scale: [{ en: 'Keeps it private', sk: 'Nechá si to pre seba' }, { en: 'Lives it in company', sk: 'Žije to medzi ľuďmi' }],
            poles: {
                private: {
                    one: { en: 'keeps the relationship close and recharges best at home, with few people', sk: 'drží vzťah v úzkom kruhu a najlepšie si oddýchne doma, s pár ľuďmi' },
                    many: { en: 'keep the relationship close and recharge best at home, with few people', sk: 'držia vzťah v úzkom kruhu a najlepšie si oddýchnu doma, s pár ľuďmi' },
                    gift: {
                        en: 'What happens inside the relationship stays inside it, and that privacy can become its own kind of intimacy.',
                        sk: 'To, čo sa deje vo vzťahu, v ňom aj zostane, a toto súkromie môže byť samo osebe formou dôvernosti.',
                    },
                    cost: {
                        en: 'To someone who lives among friends, a reluctance to go out or to share news can feel like being kept hidden.',
                        sk: 'Pre človeka, ktorý žije medzi priateľmi, môže neochota ísť von alebo zdieľať novinky pôsobiť, akoby sa vzťah skrýval.',
                    },
                    asks: {
                        en: 'Quiet evenings counting as time together, and some news waiting for permission before it travels: that is what it asks.',
                        sk: 'Prosí o to, aby tichý večer platil za spoločný čas a aby niektoré novinky počkali na súhlas, kým sa rozšíria.',
                    },
                },
                social: {
                    one: { en: 'draws energy from friends, family and full tables, and likes the relationship to be part of that life', sk: 'čerpá energiu z priateľov, rodiny a plného stola a chce, aby bol vzťah súčasťou toho života' },
                    many: { en: 'draw energy from friends, family and full tables, and like the relationship to be part of that life', sk: 'čerpajú energiu z priateľov, rodiny a plného stola a chcú, aby bol vzťah súčasťou toho života' },
                    gift: {
                        en: 'The relationship gets a wider circle around it: people who know the couple, help in a crisis and celebrate the good news.',
                        sk: 'Vzťah má okolo seba širší kruh: ľudí, ktorí pár poznajú, pomôžu v kríze a tešia sa z dobrých správ.',
                    },
                    cost: {
                        en: 'A calendar full of other people can leave the quieter partner feeling like a guest in a shared life.',
                        sk: 'Kalendár plný iných ľudí môže tichšej strane vzťahu dať pocit, že je v spoločnom živote len hosťom.',
                    },
                    asks: {
                        en: 'Company welcomed rather than endured is the wish, and in return it owes some evenings that belong to the two alone.',
                        sk: 'Želá si, aby sa spoločnosť vítala, nie len trpela, a na oplátku dlhuje niekoľko večerov, ktoré patria len dvojici.',
                    },
                },
            },
            shared: {
                private: {
                    gain: {
                        en: '{both} protect a quiet, close life, and home becomes a place where nobody has to be on show.',
                        sk: '{both} chránia tichý, blízky život a domov je miesto, kde sa nikto nemusí predvádzať.',
                    },
                    risk: {
                        en: 'A small world can grow smaller, until the relationship carries every need that friends and family once helped to carry.',
                        sk: 'Malý svet sa môže ešte zmenšiť, až kým vzťah nenesie všetky potreby, s ktorými kedysi pomáhali priatelia a rodina.',
                    },
                },
                social: {
                    gain: {
                        en: '{both} enjoy an open door and a full table, and a shared circle of friends gives the relationship a lot of support.',
                        sk: '{both} obľubujú otvorené dvere a plný stôl a spoločný kruh priateľov dáva vzťahu veľa opory.',
                    },
                    risk: {
                        en: 'Time for just the two can get squeezed out, and hard conversations get postponed because the house is rarely empty.',
                        sk: 'Čas len pre dvojicu sa môže vytratiť a ťažké rozhovory sa odkladajú, pretože doma je málokedy prázdno.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: 'The pair can have a home that restores and a social life that holds it up, with {p0} guarding the first and {p1} building the second.',
                    sk: 'Pár môže mať domov, ktorý obnovuje, aj spoločenský život, ktorý dáva oporu; {p0} stráži to prvé a {p1} buduje to druhé.',
                },
                risk: {
                    en: 'The weekend becomes the battleground: {p1} accepts two invitations, {p0} was counting on a quiet Sunday, and each feels the other does not value what matters.',
                    sk: 'Bojiskom sa stáva víkend: {p1} prijme dve pozvania, {p0} rátá s tichou nedeľou a každý má pocit, že druhý človek nectí to, na čom záleží.',
                },
                bridge: {
                    en: 'A simple rhythm helps: some evenings out, some kept closed, agreed ahead, so {p0} can rest and {p1} can plan.',
                    sk: 'Pomáha jednoduchý rytmus: niektoré večery vonku, niektoré zatvorené, dohodnuté vopred, takže {p0} si oddýchne a {p1} môže plánovať.',
                },
            },
            oneSided: {
                private: {
                    note: {
                        en: '{lean} prefers a quieter social life and {mid} is comfortable with more or less, so the balance usually settles without a struggle.',
                        sk: '{lean} uprednostňuje tichší spoločenský život a {mid} znesie viac aj menej, takže rovnováha sa zvyčajne nájde bez boja.',
                    },
                },
                social: {
                    note: {
                        en: '{lean} keeps the couple connected to a wider circle and {mid} can join in or sit some evenings out without it becoming an issue.',
                        sk: '{lean} udržiava pár spojený so širším kruhom a {mid} sa vie pridať alebo niektorý večer vynechať bez toho, aby z toho bol problém.',
                    },
                },
            },
            swings: {
                en: 'The wish for company and the wish to disappear alternate in {who}, so the balance shifts from week to week.',
                sk: '{who} túži striedavo po spoločnosti a po chvíli, keď sa môže úplne stiahnuť, takže rovnováha sa mení z týždňa na týždeň.',
            },
        },
        /* ------------------------------------------------------------- change-and-steadiness -- */
        change: {
            label: { en: 'Steadiness and newness', sk: 'Stálosť a novota' },
            phrase: { en: 'how much steadiness or newness each wants from a shared life', sk: 'to, koľko stálosti alebo novoty chce každý od spoločného života' },
            title: {
                shared: { en: 'The same appetite for change', sk: 'Rovnaká chuť do zmien' },
                opposed: { en: 'The familiar road and the new one', sk: 'Známa cesta a nová cesta' },
                oneSided: { en: 'One holds the anchor, one sails either way', sk: 'Kotva na jednej strane, voľný vietor na druhej' },
            },
            scale: [{ en: 'Values the familiar', sk: 'Váži si známe' }, { en: 'Seeks the new', sk: 'Hľadá nové' }],
            poles: {
                'stability-seeking': {
                    one: { en: 'finds love in the familiar: the same café, the same Sunday, a life that deepens rather than changes', sk: 'nachádza lásku v známom – v tej istej kaviarni, v tej istej nedeli, v živote, ktorý sa skôr prehlbuje, než mení' },
                    many: { en: 'find love in the familiar: the same café, the same Sunday, a life that deepens rather than changes', sk: 'nachádzajú lásku v známom – v tej istej kaviarni, v tej istej nedeli, v živote, ktorý sa skôr prehlbuje, než mení' },
                    gift: {
                        en: 'Rituals build up over the years and become the relationship’s private history, a reliable place to come home to.',
                        sk: 'Rituály sa časom nabaľujú a stávajú sa súkromnou históriou vzťahu, spoľahlivým miestom, kam sa dá vrátiť.',
                    },
                    cost: {
                        en: 'To a restless partner, steadiness can start to feel like a fence, and every proposed change like an argument to be won.',
                        sk: 'Nepokojnejšej strane môže stálosť začať pripadať ako plot a každá navrhnutá zmena ako spor, ktorý treba vyhrať.',
                    },
                    asks: {
                        en: 'Change that arrives with notice, with something familiar kept in place, is what makes it possible to say yes.',
                        sk: 'Zmenu znesie najlepšie, keď príde s predstihom a niečo známe pritom zostane na svojom mieste.',
                    },
                },
                'novelty-seeking': {
                    one: { en: 'keeps love alive through newness: new places, new projects, a life that keeps moving', sk: 'udržiava lásku živú novotou – novými miestami, novými projektmi, životom, ktorý sa stále hýbe' },
                    many: { en: 'keep love alive through newness: new places, new projects, a life that keeps moving', sk: 'udržiavajú lásku živú novotou – novými miestami, novými projektmi, životom, ktorý sa stále hýbe' },
                    gift: {
                        en: 'The relationship keeps surprising itself, and routine has a hard time settling in for good.',
                        sk: 'Vzťah stále prekvapuje sám seba a rutina sa v ňom ťažko natrvalo usadí.',
                    },
                    cost: {
                        en: 'For someone who rests in the familiar, a steady stream of new plans can feel like ground that will not stay still.',
                        sk: 'Človeku, ktorý spočíva v známom, môže neustály prúd nových plánov pripadať ako pôda, ktorá sa nechce zastaviť.',
                    },
                    asks: {
                        en: 'Curiosity rather than suspicion when something new is proposed is what it needs, and it owes some things left unchanged.',
                        sk: 'Pri novom návrhu potrebuje zvedavosť namiesto podozrievavosti a dlhuje niekoľko vecí, ktoré ostanú nezmenené.',
                    },
                },
            },
            shared: {
                'stability-seeking': {
                    gain: {
                        en: '{both} build a life of deep, trusted routines, and the relationship tends to feel safe because so little is up for grabs.',
                        sk: '{both} budujú život z hlbokých, overených zvykov a vzťah pôsobí bezpečne, pretože len máločo je neisté.',
                    },
                    risk: {
                        en: 'Comfort can slide into autopilot, the same evenings repeating until the couple notices that nothing has been new for years.',
                        sk: 'Pohodlie sa môže zmeniť na autopilota a rovnaké večery sa opakujú, až kým dvojica nezistí, že už roky neprišlo nič nové.',
                    },
                },
                'novelty-seeking': {
                    gain: {
                        en: '{both} keep the relationship moving, and shared adventures become the stories the pair tells for years.',
                        sk: '{both} udržiavajú vzťah v pohybe a spoločné dobrodružstvá sa stávajú príbehmi, ktoré pár rozpráva celé roky.',
                    },
                    risk: {
                        en: 'When newness is the glue, a quiet season can feel as if something is wrong, and the slow work of a shared home can get put off.',
                        sk: 'Keď je novota tmelom, pokojné obdobie môže pôsobiť, akoby niečo nebolo v poriadku, a pomalá práca na spoločnom domove sa môže odkladať.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: 'Together the pair can keep and grow at once: {p0} protects what is worth keeping, and {p1} keeps the shared life from going stale.',
                    sk: 'Spolu vie pár zároveň chrániť aj rásť: {p0} stráži to, čo stojí za zachovanie, a {p1} nedovolí, aby spoločný život zatuchol.',
                },
                risk: {
                    en: 'One proposal can open the whole gap: {p1} suggests a move or a new venture as lightly as dinner, and {p0} hears a threat to everything already built.',
                    sk: 'Jediný návrh dokáže otvoriť celý rozdiel medzi nimi: {p1} navrhne sťahovanie alebo nový podnik tak ľahko ako večeru a {p0} v tom počuje ohrozenie všetkého, čo už stojí.',
                },
                bridge: {
                    en: 'Changing one thing at a time while naming what stays lets {p0} keep an anchor while {p1} still gets to move.',
                    sk: 'Pomáha meniť jednu vec naraz a pritom pomenovať, čo zostáva: {p0} si tak udrží kotvu a {p1} sa stále môže hýbať.',
                },
            },
            oneSided: {
                'stability-seeking': {
                    note: {
                        en: '{lean} holds on to the familiar and {mid} can live with steadiness or change, which keeps the relationship steady without making it rigid.',
                        sk: '{lean} sa drží známeho a {mid} vie žiť so stálosťou aj so zmenou, čo udržiava vzťah pevný, no nie strnulý.',
                    },
                },
                'novelty-seeking': {
                    note: {
                        en: '{lean} leans toward the new and {mid} can go along or slow it down, which tends to keep change welcome rather than threatening.',
                        sk: '{lean} prináša chuť do nového a {mid} sa vie pridať alebo spomaliť, takže zmena býva vítaná, nie hrozivá.',
                    },
                },
            },
            swings: {
                en: '{who} craves change in some years and safety in others, so this may look different over time.',
                sk: '{who} v niektorých rokoch túži po zmene a v iných po istote, takže obraz môže časom vyzerať inak.',
            },
        },
        /* ------------------------------------------------------------------ taking-the-lead -- */
        initiative: {
            label: { en: 'Who moves first', sk: 'Kto robí prvý krok' },
            phrase: { en: 'who tends to take the first step and who follows', sk: 'to, kto zvyčajne robí prvý krok a kto sa pridáva' },
            title: {
                shared: { en: 'Matching instincts about the first step', sk: 'Rovnaký inštinkt pri prvom kroku' },
                opposed: { en: 'One opens, one answers', sk: 'Otvoriť a odpovedať' },
                oneSided: { en: 'One sets the pace, one meets it', sk: 'Tempo udáva jedna strana' },
            },
            scale: [{ en: 'Takes the first step', sk: 'Urobí prvý krok' }, { en: 'Waits to be invited', sk: 'Počká na pozvanie' }],
            poles: {
                assertive: {
                    one: { en: 'tends to propose the plan, raise the subject and make the first move', sk: 'zvyčajne navrhne plán, otvorí tému a urobí prvý krok' },
                    many: { en: 'tend to propose the plan, raise the subject and make the first move', sk: 'zvyčajne navrhnú plán, otvoria tému a urobia prvý krok' },
                    gift: {
                        en: 'Things get started: the trip gets booked, the difficult subject gets raised, and the offer to make up comes first.',
                        sk: 'Veci sa pohnú: výlet sa zarezervuje, ťažká téma sa otvorí a ponuka na zmierenie príde ako prvá.',
                    },
                    cost: {
                        en: 'Leading by habit can leave little space for the other person’s wishes to surface, and quick proposals can land as decisions already made.',
                        sk: 'Vedenie zo zvyku môže nechať málo miesta na to, aby sa ozvali želania druhého človeka, a rýchle návrhy dopadnú ako hotové rozhodnutia.',
                    },
                    asks: {
                        en: 'Answers rather than silence help it, and it owes the patience to ask before proposing.',
                        sk: 'Namiesto ticha čaká odpoveď a dlhuje trpezlivosť najprv sa opýtať a až potom navrhovať.',
                    },
                },
                receptive: {
                    one: { en: 'tends to wait, listen and respond, and often knows what is wanted without saying it', sk: 'zvyčajne čaká, počúva a odpovedá a často vie, čo chce, hoci to nevysloví' },
                    many: { en: 'tend to wait, listen and respond, and often know what is wanted without saying it', sk: 'zvyčajne čakajú, počúvajú a odpovedajú a často vedia, čo chcú, hoci to nevyslovia' },
                    gift: {
                        en: 'Responsiveness makes the relationship easy to approach: an idea offered is met, considered and often improved.',
                        sk: 'Vnímavosť robí vzťah ľahko dostupným: ponúknutý nápad sa stretne s pozornosťou, zváži sa a často vylepší.',
                    },
                    cost: {
                        en: 'Wishes that stay unvoiced can turn into quiet resentment, and the other person may not know a different answer was hoped for.',
                        sk: 'Želania, ktoré ostanú nevyslovené, sa môžu zmeniť na tichú krivdu a druhý človek ani netuší, že sa čakala iná odpoveď.',
                    },
                    asks: {
                        en: 'To be invited in, not only informed, is the request, and now and then it owes a wish of its own.',
                        sk: 'Prosí o pozvanie, nielen o oznámenie, a z času na čas dlhuje aj vlastné želanie.',
                    },
                },
            },
            shared: {
                assertive: {
                    gain: {
                        en: '{both} get things moving, and few plans stall for lack of someone willing to start.',
                        sk: '{both} dávajú veciam pohyb a len málo plánov uviazne pre nedostatok ochoty začať.',
                    },
                    risk: {
                        en: 'Two first movers can collide, each proposing and nobody listening, until small choices become contests over who decides.',
                        sk: 'Dve strany, ktoré chcú začínať, sa vedia zraziť: každá navrhuje, žiadna nepočúva, až sa z malých volieb stanú súboje o to, kto rozhoduje.',
                    },
                },
                receptive: {
                    gain: {
                        en: '{both} pay close attention to each other, and the relationship has a gentle, unforced quality with little jostling for control.',
                        sk: '{both} si navzájom venujú pozornosť a vzťah má jemný, neuponáhľaný charakter bez boja o kontrolu.',
                    },
                    risk: {
                        en: 'When each waits to be asked, decisions drift and important things go unsaid, each hoping the other will start.',
                        sk: 'Keď každý čaká na pozvanie, rozhodnutia sa vlečú a dôležité veci ostávajú nevyslovené v nádeji, že začne druhý človek.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: 'The pair has an easy rhythm of offer and answer: {p0} gets things started and {p1} gives them shape, often improving the plan in the process.',
                    sk: 'Pár má prirodzený rytmus ponuky a odpovede: {p0} veci rozbehne a {p1} im dá tvar, pričom plán často vylepší.',
                },
                risk: {
                    en: 'Left unexamined, {p0} ends up deciding by default, and {p1} goes along until a pile of small unspoken preferences comes out in one hard evening.',
                    sk: 'Ak sa to neprebere, {p0} rozhoduje automaticky a {p1} sa prispôsobuje, až kým sa kopa drobných nevyslovených želaní neprevalí v jeden ťažký večer.',
                },
                bridge: {
                    en: 'It shifts when {p0} asks before proposing and {p1} brings at least one wish to the table each week.',
                    sk: 'Zmení sa to, keď sa {p0} najprv opýta a až potom navrhne a {p1} každý týždeň prinesie na stôl aspoň jedno vlastné želanie.',
                },
            },
            oneSided: {
                assertive: {
                    note: {
                        en: '{lean} tends to set things in motion and {mid} can follow or take the lead in turn, so initiative rarely becomes a contest.',
                        sk: '{lean} zvyčajne veci rozbieha a {mid} sa vie pridať alebo občas prevziať vedenie, takže iniciatíva sa len zriedka stáva súbojom.',
                    },
                },
                receptive: {
                    note: {
                        en: '{lean} prefers to respond and {mid} can step forward when needed, which keeps the relationship from waiting on itself.',
                        sk: '{lean} radšej odpovedá a {mid} vie v prípade potreby vykročiť, takže vzťah nečaká sám na seba.',
                    },
                },
            },
            swings: {
                en: 'Who moves first varies by subject for {who}, leading in some areas and waiting in others.',
                sk: '{who} v niektorých oblastiach vedie a v iných čaká, takže to, kto urobí prvý krok, závisí od témy.',
            },
        },
        /* ---------------------------------------------------------- practical-and-conceptual -- */
        abstraction: {
            label: { en: 'Everyday and big picture', sk: 'Všedný deň a veľký obraz' },
            phrase: { en: 'whether each talks more about daily life or about ideas and meaning', sk: 'to, či každý hovorí skôr o bežných veciach, alebo o myšlienkach a zmysle' },
            title: {
                shared: { en: 'Talking on the same level', sk: 'Rozhovor na rovnakej vlne' },
                opposed: { en: 'The shopping list and the meaning of life', sk: 'Nákupný zoznam a zmysel života' },
                oneSided: { en: 'One level, and a mind that travels', sk: 'Jedna rovina a myseľ, ktorá cestuje' },
            },
            scale: [{ en: 'Keeps to the concrete', sk: 'Drží sa konkrétneho' }, { en: 'Drifts to ideas', sk: 'Uletí k myšlienkam' }],
            poles: {
                practical: {
                    one: { en: 'shows love by handling the concrete: the booking, the repair, the next step', sk: 'ukazuje lásku tým, že vybaví konkrétne veci: rezerváciu, opravu, ďalší krok' },
                    many: { en: 'show love by handling the concrete: the booking, the repair, the next step', sk: 'ukazujú lásku tým, že vybavia konkrétne veci: rezerváciu, opravu, ďalší krok' },
                    gift: {
                        en: 'Plans actually happen, and talk turns into something that can be lived in.',
                        sk: 'Plány sa naozaj uskutočnia a z rozhovorov vznikne niečo, v čom sa dá žiť.',
                    },
                    cost: {
                        en: 'A conversation about what life means can get answered with a to-do list, and the question that wanted more goes unmet.',
                        sk: 'Rozhovor o tom, čo život znamená, môže dostať odpoveď v podobe zoznamu úloh a otázka, ktorá chcela viac, ostane bez odozvy.',
                    },
                    asks: {
                        en: 'Ideas that come down to earth at some point, with a first step attached, are what it asks for.',
                        sk: 'Žiada si, aby myšlienky v istom bode zostúpili na zem a mali pripojený prvý krok.',
                    },
                },
                conceptual: {
                    one: { en: 'talks about what things mean, where life is heading and what could be', sk: 'hovorí o tom, čo veci znamenajú, kam smeruje život a čo by mohlo byť' },
                    many: { en: 'talk about what things mean, where life is heading and what could be', sk: 'hovoria o tom, čo veci znamenajú, kam smeruje život a čo by mohlo byť' },
                    gift: {
                        en: 'The relationship gets a horizon: long talks, shared ideas and a sense of where the two are going.',
                        sk: 'Vzťah dostane horizont: dlhé rozhovory, spoločné myšlienky a pocit, kam dvojica smeruje.',
                    },
                    cost: {
                        en: 'Next week’s arrangements can seem beneath notice, and the running of the household quietly lands on the other side.',
                        sk: 'Vybavovanie budúceho týždňa môže pôsobiť ako nepodstatná vec a chod domácnosti potom potichu zostane celý na druhej strane.',
                    },
                    asks: {
                        en: 'Big questions welcomed, not hurried along to the practical point, are what it needs.',
                        sk: 'Chce, aby veľké otázky boli vítané, nie súrené k praktickému záveru.',
                    },
                },
            },
            shared: {
                practical: {
                    gain: {
                        en: '{both} get things done together, and the shared life runs well because each speaks in tasks and plans the other understands.',
                        sk: '{both} spolu veci dotiahnu a spoločný život beží dobre, lebo každý hovorí v úlohách a plánoch, ktorým druhý človek rozumie.',
                    },
                    risk: {
                        en: 'Talk can narrow to logistics, until the relationship runs smoothly and is rarely spoken of as anything more than a schedule.',
                        sk: 'Rozhovory sa môžu zúžiť na logistiku, až kým vzťah síce beží hladko, no len zriedka sa o ňom hovorí ako o niečom viac než o rozvrhu.',
                    },
                },
                conceptual: {
                    gain: {
                        en: '{both} can talk for hours about ideas, plans and what life is for, and find a deep kind of understanding in it.',
                        sk: '{both} vedia hodiny hovoriť o myšlienkach, plánoch a o tom, na čo je život, a v takých rozhovoroch nachádzajú hlboké porozumenie.',
                    },
                    risk: {
                        en: 'The dull business of life can pile up unattended while the conversation stays with what could be.',
                        sk: 'Nudná prevádzka života sa môže hromadiť bez dozoru, zatiaľ čo rozhovor ostáva pri tom, čo by mohlo byť.',
                    },
                },
            },
            opposed: {
                gain: {
                    en: '{p1} dreams up where the two could go and {p0} works out how to get there, which is a good division of labour for a shared life.',
                    sk: '{p1} vymýšľa, kam by mohla dvojica smerovať, a {p0} vymyslí, ako sa tam dostať, čo je pre spoločný život dobrá deľba práce.',
                },
                risk: {
                    en: 'Without care, {p1} feels the dreams are being cut down to size, and {p0} feels the real work goes unnoticed.',
                    sk: 'Bez pozornosti má {p1} pocit, že sny sa orezávajú na mieru, a {p0} pocit, že skutočná práca ostáva nepovšimnutá.',
                },
                bridge: {
                    en: 'One exchange shifts a lot: {p0} asks one question about the dream before the first practical one, and {p1} names one step that could happen this month.',
                    sk: 'Jedna výmena posunie veľa: {p0} položí jednu otázku o sne skôr než prvú praktickú a {p1} pomenuje jeden krok, ktorý sa môže stať ešte tento mesiac.',
                },
            },
            oneSided: {
                practical: {
                    note: {
                        en: '{lean} keeps conversations grounded and {mid} can move toward the concrete or the abstract, so plans tend to land without losing sight of why.',
                        sk: '{lean} drží rozhovory pri zemi a {mid} sa vie pohnúť ku konkrétnemu aj k abstraktnému, takže plány zvyčajne pristanú bez toho, aby stratili zmysel.',
                    },
                },
                conceptual: {
                    note: {
                        en: '{lean} brings the big questions and {mid} can take up the questions or bring the talk back to the ground, which gives the pair a horizon and footing.',
                        sk: '{lean} prináša veľké otázky a {mid} sa im vie venovať alebo ich vrátiť na zem, čím má pár horizont aj pevnú pôdu.',
                    },
                },
            },
            swings: {
                en: 'Logistics on some days and meaning on others: here {who} moves between levels, so the pattern stays loose.',
                sk: 'Raz logistika, inokedy zmysel: {who} tu prechádza medzi týmito rovinami, takže vzorec ostáva voľný.',
            },
        },
    },
    /* ============================================================================ drives == */
    drives: {
        shared: {
            mastery: {
                gain: {
                    en: '{both} respect the slow work of getting good at something, and can give each other the hours it takes without resentment.',
                    sk: '{both} si vážia pomalú prácu na majstrovstve a vedia si navzájom dopriať hodiny, ktoré si vyžaduje, bez výčitiek.',
                },
                risk: {
                    en: 'Two people bent over their own crafts can end up side by side rather than together, with the relationship getting what is left of the day.',
                    sk: 'Keď sa každý skláňa nad vlastným remeslom, pár môže skončiť vedľa seba namiesto spolu a vzťah dostane len to, čo zo dňa zvýši.',
                },
            },
            achievement: {
                gain: {
                    en: '{both} understand ambition from the inside, so a late night before a deadline is met with support rather than reproach.',
                    sk: '{both} rozumejú ambícii zvnútra, takže neskorá noc pred termínom sa stretne s podporou, nie s výčitkou.',
                },
                risk: {
                    en: 'When each is climbing, the relationship can become the place where tiredness lands, and success gets measured everywhere except at home.',
                    sk: 'Keď stúpa každý po svojom rebríku, vzťah sa môže stať miestom, kam padá únava, a úspech sa meria všade okrem domova.',
                },
            },
            recognition: {
                gain: {
                    en: '{both} know how much it means to be seen, and can be generous with the praise that keeps each other going.',
                    sk: '{both} vedia, koľko znamená uznanie, a nešetria pochvalou, ktorá ich navzájom drží v chode.',
                },
                risk: {
                    en: 'Two people who need an audience can end up competing for the same light, and the other’s success can sting before it pleases.',
                    sk: 'Keď uznanie potrebuje každá strana, môže sa začať súťaž o to isté svetlo a úspech druhého človeka najprv zabolí a až potom poteší.',
                },
            },
            meaning: {
                gain: {
                    en: '{both} want a life that adds up to something, and long conversations about why tend to bring them closer.',
                    sk: '{both} chcú život, ktorý dáva zmysel, a dlhé rozhovory o otázke „prečo“ ich zvyčajne zblížia.',
                },
                risk: {
                    en: 'The search for meaning can make ordinary happiness look thin, so a good, plain year can feel to the couple like a year wasted.',
                    sk: 'Hľadanie zmyslu môže obyčajné šťastie zmenšiť a dobrý, prostý rok môže páru pripadať ako premárnený.',
                },
            },
            belonging: {
                gain: {
                    en: '{both} build a warm nest and a circle of their own, and each knows exactly where home is.',
                    sk: '{both} si budujú teplé hniezdo a vlastný kruh ľudí a každý presne vie, kde je domov.',
                },
                risk: {
                    en: 'So much weight on togetherness can make any outside interest feel like a small desertion, and the circle can close too tightly.',
                    sk: 'Toľko váhy na spolupatričnosti môže spôsobiť, že každý záujem mimo vzťahu pôsobí ako malý útek, a kruh sa uzavrie príliš tesne.',
                },
            },
            freedom: {
                gain: {
                    en: '{both} understand the need for room without having to justify it, and the relationship stays light enough to breathe in.',
                    sk: '{both} chápu potrebu priestoru bez vysvetľovania a vzťah ostáva dosť ľahký na to, aby sa v ňom dalo dýchať.',
                },
                risk: {
                    en: 'With each guarding a separate freedom, commitments can stay vague for years, each waiting for the other to name what this is.',
                    sk: 'Keď si slobodu stráži každá strana, záväzky môžu roky ostať nejasné a každý čaká, kým druhý človek pomenuje, čo to medzi nimi vlastne je.',
                },
            },
            care: {
                gain: {
                    en: '{both} look after each other attentively, and in hard seasons the relationship is a genuinely safe place.',
                    sk: '{both} sa o seba navzájom pozorne starajú a v ťažkých obdobiach je vzťah naozaj bezpečným miestom.',
                },
                risk: {
                    en: 'Two caregivers can be so busy giving that nobody asks for anything, and tiredness builds up unnoticed on each side.',
                    sk: 'Keď každý len dáva, nikto si o nič nepýta a únava sa nepozorovane hromadí na každej strane.',
                },
            },
            understanding: {
                gain: {
                    en: '{both} want to know how the other works inside, and being understood is one of the quiet pleasures of this relationship.',
                    sk: '{both} chcú pochopiť, ako funguje druhý človek, a pocit porozumenia patrí k tichým radostiam tohto vzťahu.',
                },
                risk: {
                    en: 'Analysing each other can stand in for simply being together, and a feeling gets explained when it only needed to be held.',
                    sk: 'Vzájomné analyzovanie môže nahradiť obyčajné bytie spolu a cit sa vysvetľuje tam, kde by stačilo objatie.',
                },
            },
            'self-expression': {
                gain: {
                    en: '{both} encourage each other to make, say and show what is inside, and the relationship becomes a stage that feels safe.',
                    sk: '{both} sa navzájom povzbudzujú tvoriť, hovoriť a ukazovať to, čo nosia v sebe, a vzťah sa stáva javiskom, na ktorom je bezpečne.',
                },
                risk: {
                    en: 'Two strong voices can end up talking past each other, with each waiting for room to be heard.',
                    sk: 'Dva silné hlasy sa môžu míňať a každý čaká, kedy dostane priestor.',
                },
            },
            beauty: {
                gain: {
                    en: '{both} care how life looks and feels, and small rituals of beauty — flowers, a set table, a walk at dusk — become part of the bond.',
                    sk: '{both} dbajú na to, ako život vyzerá a pôsobí, a drobné rituály krásy — kvety, prestretý stôl, prechádzka za súmraku — sa stávajú súčasťou puta.',
                },
                risk: {
                    en: 'Shared taste can turn into shared exacting standards, and an ordinary, messy day can feel as if something has gone wrong.',
                    sk: 'Spoločný vkus sa môže zmeniť na spoločné prísne nároky a obyčajný, neusporiadaný deň potom pôsobí, akoby sa niečo pokazilo.',
                },
            },
        },
        pullsApart: {
            'freedom|belonging': {
                gain: {
                    en: 'Held well, the two can balance each other: {p1} keeps the relationship rooted and {p0} keeps air moving through it.',
                    sk: 'Ak sa to zvládne, môžu sa vyvažovať: {p1} drží vzťah zakorenený a {p0} doň púšťa vzduch.',
                },
                risk: {
                    en: 'The same evening means opposite things: {p0} takes a night alone to come back refreshed, and {p1} may read the same night as distance.',
                    sk: 'Ten istý večer znamená opak: {p0} si berie večer pre seba ako spôsob, ako načerpať sily, a {p1} môže ten istý večer vnímať ako vzdialenosť.',
                },
                bridge: {
                    en: 'It helps when {p0} says out loud that the time apart is for coming back, and {p1} gets a ritual of reconnection that does not depend on asking.',
                    sk: 'Pomáha, keď {p0} nahlas povie, že čas osamote je na to, aby sa dalo vrátiť, a {p1} má rituál opätovného stretnutia, o ktorý netreba prosiť.',
                },
            },
            'achievement|care': {
                gain: {
                    en: 'Together the two can build and tend at once: {p0} moves the shared life forward, and {p1} makes sure no one is lost along the way.',
                    sk: 'Spolu vedia budovať aj opatrovať naraz: {p0} posúva spoločný život vpred a {p1} dbá na to, aby sa po ceste na nikoho nezabudlo.',
                },
                risk: {
                    en: 'The hours collide: {p0} gives the evening to the goal, {p1} gives it to the people, and each starts to feel the other puts something ahead of the relationship.',
                    sk: 'Hodiny sa zrážajú: {p0} venuje večer cieľu, {p1} ľuďom, a každý začne mať pocit, že druhý človek uprednostňuje niečo iné než vzťah.',
                },
                bridge: {
                    en: 'It eases when the couple names the season it is in, a push for a goal or a time for home, so {p1} knows the push will end and {p0} knows the care is not a demand.',
                    sk: 'Uľahčí to, keď dvojica pomenuje obdobie, v ktorom je, či ide o nápor na cieľ, alebo čas pre domov: {p1} tak vie, že nápor sa skončí, a {p0} vie, že starostlivosť nie je požiadavka.',
                },
            },
            'recognition|understanding': {
                gain: {
                    en: 'The difference gives the relationship two kinds of attention: {p0} celebrates what was done, {p1} wants to understand how and why, and each can be deeply felt.',
                    sk: 'Rozdiel dáva vzťahu dva druhy pozornosti: {p0} oslavuje, čo sa podarilo, {p1} chce pochopiť, ako a prečo, a každý z týchto druhov pozornosti vie hlboko zasiahnuť.',
                },
                risk: {
                    en: '{p0} shares a success and hopes for applause, {p1} responds with questions about how it works, and the moment passes with each feeling slightly missed.',
                    sk: '{p0} sa podelí o úspech a dúfa v potlesk, {p1} odpovie otázkami, ako to funguje, a chvíľa prejde tak, že sa ani jedna strana necíti celkom zachytená.',
                },
                bridge: {
                    en: 'A small habit helps: {p1} applauds first and asks later, and {p0} offers the story behind the success along with the result.',
                    sk: 'Pomáha drobný zvyk: {p1} najprv zatlieska a až potom sa pýta, a {p0} ponúkne spolu s výsledkom aj príbeh v pozadí.',
                },
            },
        },
        different: {
            gain: {
                en: 'Different pulls give the relationship two engines: {p0} and {p1} each bring something the other would not have reached for alone.',
                sk: 'Rozdielne ťahy dávajú vzťahu dva motory: {p0} aj {p1} prinášajú do vzťahu niečo, čo by v ňom inak chýbalo.',
            },
            risk: {
                en: 'Without curiosity, each can quietly treat the other’s pull as a hobby, and what one of them lives for ends up squeezed into the margins.',
                sk: 'Bez zvedavosti môže každý potichu brať ťah druhého človeka ako koníček a to, pre čo niekto z dvojice žije, skončí odsunuté na okraj.',
            },
            bridge: {
                en: 'Curiosity is the bridge: {p0} asks what the other pull feels like from inside, and {p1} does the same, at least once, with real interest.',
                sk: 'Mostom je zvedavosť: {p0} sa opýta, aký je ten druhý ťah zvnútra, a {p1} urobí to isté, aspoň raz a so skutočným záujmom.',
            },
        },
        drawnTo: {
            mastery: { one: { en: 'cares about doing a few things really well', sk: 'túži robiť niekoľko vecí naozaj dobre' }, many: { en: 'care about doing a few things really well', sk: 'túžia robiť niekoľko vecí naozaj dobre' } },
            achievement: { one: { en: 'likes to set a goal and then reach it', sk: 'chce si klásť ciele a dosahovať ich' }, many: { en: 'like to set goals and then reach them', sk: 'chcú si klásť ciele a dosahovať ich' } },
            recognition: { one: { en: 'wants the effort to be seen and the work to count', sk: 'chce, aby bolo úsilie vidieť a aby malo váhu' }, many: { en: 'want the effort to be seen and the work to count', sk: 'chcú, aby bolo úsilie vidieť a aby malo váhu' } },
            meaning: { one: { en: 'looks for a reason behind what life asks', sk: 'hľadá v tom, čo život žiada, hlbší zmysel' }, many: { en: 'look for a reason behind what life asks', sk: 'hľadajú v tom, čo život žiada, hlbší zmysel' } },
            belonging: { one: { en: 'longs for a close circle and a place to belong', sk: 'túži po blízkom kruhu ľudí a mieste, kam patrí' }, many: { en: 'long for a close circle and a place to belong', sk: 'túžia po blízkom kruhu ľudí a mieste, kam patria' } },
            freedom: { one: { en: 'needs room to choose a path without asking permission', sk: 'potrebuje voľnosť vybrať si cestu bez pýtania sa o dovolenie' }, many: { en: 'need room to choose a path without asking permission', sk: 'potrebujú voľnosť vybrať si cestu bez pýtania sa o dovolenie' } },
            care: { one: { en: 'is drawn to looking after the people close by', sk: 'má potrebu starať sa o blízkych ľudí' }, many: { en: 'are drawn to looking after the people close by', sk: 'majú potrebu starať sa o blízkych ľudí' } },
            understanding: { one: { en: 'wants to understand how things and people really work', sk: 'chce rozumieť tomu, ako veci a ľudia naozaj fungujú' }, many: { en: 'want to understand how things and people really work', sk: 'chcú rozumieť tomu, ako veci a ľudia naozaj fungujú' } },
            'self-expression': { one: { en: 'needs a way to put what is inside into the world', sk: 'potrebuje dať tomu, čo nosí v sebe, podobu navonok' }, many: { en: 'need a way to put what is inside into the world', sk: 'potrebujú dať tomu, čo nosia v sebe, podobu navonok' } },
            beauty: { one: { en: 'is moved by beauty, in things and in how a day feels', sk: 'hľadá krásu vo veciach aj v tom, ako plynie deň' }, many: { en: 'are moved by beauty, in things and in how a day feels', sk: 'hľadajú krásu vo veciach aj v tom, ako plynie deň' } },
        },
    },
    /* ============================================================================= kinds == */
    kinds: {
        partners: {
            frame: {
                en: '{both} meet here as partners, two people sharing a life. What matters most between partners tends to happen in small daily moments: how a feeling is answered, how a disagreement is paused and taken up again, how time together and time apart are shared.',
                sk: '{both} tvoria pár. To, na čom medzi partnermi najviac záleží, sa zvyčajne odohráva v drobných každodenných chvíľach: ako sa odpovedá na city, ako sa spor preruší a znova k nemu vráti, ako sa delí čas spolu a osobitne.',
            },
            lens: {
                en: 'In a partnership the small daily moments carry the most weight: how a feeling is met, how a disagreement is paused and picked up again, how closeness and room are shared. The reading leans there.',
                sk: 'V partnerskom vzťahu majú najväčšiu váhu malé každodenné chvíle: ako sa prijme cit, ako sa nezhoda preruší a znova otvorí, ako sa delí blízkosť a priestor. Tam sa čítanie sústreďuje.',
            },
            consequence: {
                'processing-pace': {
                    en: 'Between partners this often decides whether an argument ends in repair or in going to sleep with something unfinished.',
                    sk: 'V páre práve toto často rozhoduje, či sa hádka skončí zmierením, alebo tým, že sa ide spať s nedokončenou vecou.',
                },
                'emotional-expression': {
                    en: 'In a couple, this is often where feeling unseen begins, long before anyone says so.',
                    sk: 'V páre sa práve tu často začína pocit nepovšimnutosti, dávno predtým, než to niekto vysloví.',
                },
                'closeness-and-room': {
                    en: 'In a romantic relationship this rhythm shows up in everyday warmth too, so it is worth talking about gently and without keeping score.',
                    sk: 'V romantickom vzťahu sa tento rytmus prejavuje aj v každodennej vrúcnosti, preto sa oplatí hovoriť o ňom jemne a bez počítania bodov.',
                },
                'change-and-steadiness': {
                    en: 'For partners this tends to surface around the big shared decisions: where to live, whether to change work, what the next years hold.',
                    sk: 'V páre sa to zvyčajne ukáže pri veľkých spoločných rozhodnutiach: kde bývať, či zmeniť prácu, čo prinesú ďalšie roky.',
                },
                'structure-and-flexibility': {
                    en: 'Where a life is shared, this is where the invisible work of planning and noticing tends to pile up on one side.',
                    sk: 'Pod spoločnou strechou sa práve tu zvyčajne hromadí na jednej strane neviditeľná práca plánovania a všímania si.',
                },
                'risk-and-caution': {
                    en: 'For a couple the stakes are shared, money, a home and the years ahead, so no single comfort level gets to decide alone.',
                    sk: 'Pre pár je v hre spoločné – peniaze, domov aj nasledujúce roky – a tak o nich nemá rozhodovať len jedna miera opatrnosti.',
                },
            },
        },
    },
    /* ========================================================================= practices == */
    practices: [
        /* processing-pace. Order matters: the composer takes the first two cards that fit the told mechanism. Opposed: one card for each side; one-sided: the leaning side plus a card
           for the pair; shared: cards for the pair. */
        {
            id: 'rom.hold-the-topic',
            title: { en: 'Hold the topic, not the person', sk: 'Držať sa témy, nie naháňať človeka' },
            body: {
                en: 'When the urge is to settle it now, open with one specific, gentle request rather than every complaint at once, then let the quiet last a while. Write the point down if that keeps it from slipping away. A partner who feels trusted to come back may find it easier to return than one who is chased.',
                sk: 'Keď máš chuť vyriešiť to hneď, začni jednou konkrétnou, jemnou prosbou namiesto všetkých výhrad naraz a potom nechaj chvíľu ticho. Ak ti to pomôže, zapíš si podstatu, aby sa nestratila. Kto cíti dôveru, že sa môže vrátiť, ten sa často vracia ľahšie ako ten, koho niekto naháňa.',
            },
            audience: { kind: 'pole', pole: 'outwardly-engaged' },
            triggers: { dynamic: 'processing-pace', relations: ['opposed', 'one-sided'], mechanisms: ['processing-pace/opposed', 'processing-pace/oneSided:outwardly-engaged'] },
            sources: ['ROM-007', 'ROM-012'],
        },
        {
            id: 'rom.leave-a-door',
            title: { en: 'Leave a door, not a silence', sk: 'Pootvorené dvere namiesto ticha' },
            body: {
                en: 'Before stepping away to think, say one sentence that shows the topic matters: “I want to get this right; give me until after dinner.” Then come back at that time, even with half an answer. Coming back when promised can make the next pause easier to trust.',
                sk: 'Skôr než sa stiahneš premýšľať, povedz jednu vetu, z ktorej je jasné, že na téme záleží: „Chcem to vyriešiť poriadne, daj mi čas do večere.“ Potom sa v tom čase vráť, aj s polovičnou odpoveďou. Návrat v sľúbenom čase môže pomôcť, aby sa dalo veriť aj ďalšej pauze.',
            },
            audience: { kind: 'pole', pole: 'introspective' },
            triggers: { dynamic: 'processing-pace', relations: ['opposed', 'one-sided'], mechanisms: ['processing-pace/opposed', 'processing-pace/oneSided:introspective'] },
            sources: ['ROM-007', 'ROM-020'],
        },
        {
            id: 'rom.check-the-quiet',
            title: { en: 'Ask whether the quiet was peace', sk: 'Spýtať sa, či bolo ticho naozaj pokojom' },
            body: {
                en: 'The day after a quiet evening that followed a disagreement, ask one plain question: “Is anything from yesterday still on your mind?” Then listen without explaining the quiet. Being listened to closely is one of the main ways a partner comes across as responsive.',
                sk: 'Deň po tichom večere, ktorý prišiel po nezhode, polož jednu jednoduchú otázku: „Leží ti ešte niečo zo včerajška v hlave?“ Potom počúvaj a ticho nevysvetľuj. Pozorné počúvanie je jedným z hlavných spôsobov, ako partner prejavuje záujem a porozumenie.',
            },
            audience: { kind: 'pole', pole: 'introspective' },
            triggers: { dynamic: 'processing-pace', relations: ['one-sided'], mechanisms: ['processing-pace/oneSided:introspective'] },
            sources: ['ROM-006'],
        },
        {
            id: 'rom.slower-with-a-reason',
            title: { en: 'Give a slower answer its reason', sk: 'Pomalšej odpovedi dať dôvod' },
            body: {
                en: 'When one of you wants more time before answering, say what the time is for. “I want to think that through properly; can we come back to it tonight?” A slower pace that names its purpose is harder to mistake for a step back, and it keeps the topic open between you.',
                sk: 'Keď jeden z vás chce viac času, skôr než zareaguje, nech povie, na čo ten čas potrebuje. „Chcem si to poriadne premyslieť, môžeme sa k tomu vrátiť večer?“ Tempo, ktoré povie, načo je, sa ťažšie zamení za ústup a rozhovor sa tým nekončí.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['one-sided'], mechanisms: ['processing-pace/oneSided:outwardly-engaged'] },
            sources: ['ROM-007'],
        },
        {
            id: 'rom.say-back-first',
            title: { en: 'Say back what you heard before answering', sk: 'Najprv zopakovať, čo zaznelo' },
            body: {
                en: 'When a quarrel picks up speed, whoever is about to reply first says back, in a few words, what was just heard: “So you’re fed up with plans changing at the last minute?” Then the reply. Being heard accurately is one of the main ways a partner comes to feel understood.',
                sk: 'Keď hádka naberá rýchlosť, ten z vás, kto chce práve odpovedať, najprv niekoľkými slovami zopakuje, čo zaznelo: „Takže ťa štve, že sa plány menia na poslednú chvíľu?“ Až potom príde odpoveď. Presné vypočutie patrí k hlavným spôsobom, ako sa partner môže cítiť pochopený.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['shared'], mechanisms: ['processing-pace/shared:outwardly-engaged'] },
            sources: ['ROM-006'],
        },
        {
            id: 'rom.time-for-the-unopened',
            title: { en: 'A set moment for what has been waiting', sk: 'Pevná chvíľa pre to, čo čaká' },
            body: {
                en: 'Agree on one unhurried moment in the week, a walk or the washing-up, when either of you may mention something that has been sitting unsaid, even half-formed. Nothing has to be settled then. Saying what is on one’s mind, and having it heard, tends to go with feeling closer.',
                sk: 'Dohodnite si jednu neuponáhľanú chvíľu v týždni, napríklad prechádzku alebo umývanie riadu, keď môže ktokoľvek z vás spomenúť niečo, čo zostalo nevyslovené, hoci aj nedomyslené. Vtedy sa nič nemusí vyriešiť. Povedať, čo má človek na srdci, a nájsť pozorného poslucháča zvyčajne súvisí s pocitom väčšej blízkosti.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['shared'], mechanisms: ['processing-pace/shared:introspective'] },
            sources: ['ROM-013', 'ROM-006'],
        },
        {
            id: 'rom.receive-the-first-sentence',
            title: { en: 'Receive the first sentence, not the whole matter', sk: 'Prijať prvú vetu, nie hneď celú vec' },
            body: {
                en: 'When one of you raises something that has been waiting, the other first thanks them for saying it and asks only whether to talk now or later. The rest can come when both are ready. Listening with care and without pressure is a main route to feeling that a partner is responsive.',
                sk: 'Keď jeden z vás otvorí niečo, čo dlhšie čakalo, druhý najprv poďakuje, že to zaznelo, a spýta sa len, či o tom hovoriť teraz, alebo neskôr. Zvyšok môže prísť, keď budete pripravení. Pozorné počúvanie bez nátlaku patrí k hlavným cestám k pocitu, že partner je naozaj vnímavý.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['shared'], mechanisms: ['processing-pace/shared:introspective'] },
            sources: ['ROM-006'],
        },
        {
            id: 'rom.pause-with-return',
            title: { en: 'Calm down first, then come back', sk: 'Najprv sa upokojiť, potom sa vrátiť' },
            body: {
                en: 'When you are both talking faster than either is thinking, agree a short break: a glass of water, a walk round the block. Use it to let the body settle rather than to rehearse the next point, then come back to the sentence that started it. Calming down sooner after a quarrel goes with both partners feeling better about the relationship.',
                sk: 'Keď hovoríte rýchlejšie, než stíhate premýšľať, dohodnite si krátku prestávku: pohár vody, krátku prechádzku okolo domu. Využite prestávku na to, aby sa telo upokojilo, nie na prípravu ďalšieho argumentu, a potom sa vráťte k vete, ktorou sa to začalo. Rýchlejšie upokojenie po hádke súvisí s tým, že je so vzťahom spokojnejší každý z partnerov.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['shared', 'opposed'], mechanisms: ['processing-pace/shared:outwardly-engaged', 'processing-pace/opposed'] },
            sources: ['ROM-020'],
        },
        /* emotional-expression: opposed gets a card for the one who keeps feeling close and one for the pair; shared and one-sided forms get the listening and repair cards */
        {
            id: 'rom.one-feeling-in-words',
            title: { en: 'One feeling, in words, each day', sk: 'Jeden pocit denne, slovami' },
            body: {
                en: 'Deeds already say a lot; add one short sentence a day that names a feeling or an appreciation out loud: “I loved hearing from you at lunch.” It does not have to be deep or long. For a partner who listens for words, hearing it can be what makes the care visible.',
                sk: 'Skutky už hovoria veľa; pridaj k nim raz denne jednu krátku vetu, ktorá nahlas pomenuje pocit alebo vďaku: „Potešil ma tvoj telefonát cez obed.“ Nemusí byť hlboká ani dlhá. Pre partnera, ktorý čaká na slová, môže byť práve táto veta tým, čo urobí starostlivosť viditeľnou.',
            },
            audience: { kind: 'pole', pole: 'emotionally-contained' },
            triggers: { dynamic: 'emotional-expression', relations: ['opposed', 'one-sided'], mechanisms: ['emotional-expression/opposed', 'emotional-expression/oneSided:emotionally-contained'] },
            sources: ['ROM-013', 'ROM-001'],
        },
        {
            id: 'rom.count-the-deed',
            title: { en: 'Say that you noticed', sk: 'Povedať nahlas, čo ste si všimli' },
            body: {
                en: 'Today, name one thing the other did that said “I care” without words: “You kept dinner warm for me; thank you.” Care carried in deeds can pass as routine, and a word that it was seen lets it count. Feeling appreciated is among the strongest predictors of how good a relationship feels.',
                sk: 'Dnes pomenujte jednu vec, ktorou druhý z vás bez slov dáva najavo „záleží mi na tebe“, napríklad: „Ďakujem, že mi odkladáš večeru v teple.“ Starostlivosť ukázaná skutkami sa môže brať ako rutina; slovo, že si to niekto všimol, dá skutkom váhu. Pocit ocenenia patrí k najsilnejším ukazovateľom toho, ako dobre partneri vzťah prežívajú.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'emotional-expression', relations: ['opposed', 'shared'], mechanisms: ['emotional-expression/opposed', 'emotional-expression/shared:emotionally-contained'] },
            sources: ['ROM-001'],
        },
        {
            id: 'rom.softer-feeling-first',
            title: { en: 'Lead with the softer feeling', sk: 'Najprv pocit, až potom výčitka' },
            body: {
                en: 'When something hurts, try naming the feeling under the complaint first (lonely, worried, left out) before any criticism arrives. Say one thing at a time and leave a pause for an answer. A single feeling tends to be easier to take in than several at once.',
                sk: 'Keď niečo bolí, skús najprv pomenovať pocit pod výčitkou (osamelosť, obavu, pocit vylúčenia), skôr než príde kritika. Hovor jednu vec naraz a nechaj priestor na odpoveď. Jeden pocit sa zvyčajne prijíma ľahšie než viacero naraz.',
            },
            audience: { kind: 'pole', pole: 'emotionally-expressive' },
            triggers: { dynamic: 'emotional-expression', relations: ['opposed', 'one-sided'], mechanisms: ['emotional-expression/oneSided:emotionally-expressive', 'emotional-expression/opposed'] },
            sources: ['ROM-033', 'ROM-012'],
        },
        {
            id: 'rom.reflect-before-fixing',
            title: { en: 'Reflect before fixing', sk: 'Najprv zopakovať, potom riešiť' },
            body: {
                en: 'When one of you shares something hard, the other first says back what was heard and what it seems to mean: “So the worst part was being talked over?” Then one question: comfort or ideas? Feeling understood can matter more than the right advice.',
                sk: 'Keď sa niekto z vás podelí o niečo ťažké, druhá strana najprv zopakuje, čo zaznelo a čo to asi znamená: „Takže najhoršie bolo, že ťa prekrikovali?“ Potom jedna otázka: útecha, alebo nápady? Pocit, že vás niekto pochopil, môže znamenať viac než správna rada.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'emotional-expression', mechanisms: ['emotional-expression/shared', 'emotional-expression/oneSided'] },
            sources: ['ROM-006', 'ROM-013'],
        },
        {
            id: 'rom.come-back-and-repair',
            title: { en: 'Come back and repair', sk: 'Vrátiť sa a napraviť' },
            body: {
                en: 'After a heated moment, take a short break, a walk or a few slow breaths, then come back and name your own part in one sentence. If the same argument keeps returning, name the topic underneath it once, at a calm time. How quickly a pair settles after a quarrel is linked with how satisfied both partners are.',
                sk: 'Po vyhrotenej chvíli si dajte krátku prestávku, prechádzku alebo pár pomalých nádychov, potom sa vráťte a jednou vetou pomenujte vlastný podiel. Ak sa tá istá hádka stále vracia, pomenujte raz, v pokojnej chvíli, tému, ktorá je pod povrchom. To, ako rýchlo sa pár po hádke upokojí, súvisí s tým, ako spokojný je vo vzťahu každý z partnerov.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'emotional-expression', relations: ['shared'], mechanisms: ['emotional-expression/shared:emotionally-expressive'] },
            sources: ['ROM-020', 'ROM-011'],
        },
        /* closeness-and-room: rhythm, each side, ritual of connection, warmth and physical closeness */
        {
            id: 'rom.rhythm-of-together-and-apart',
            title: { en: 'Agree a rhythm of together and apart', sk: 'Dohodnúť rytmus spolu a osobitne' },
            body: {
                en: 'Name plainly what each needs, more contact or more room, and agree two or three small, predictable fixtures: a call at lunch, one evening each that belongs to no one else, a walk at the weekend. Knowing when the next shared moment comes can make time apart easier to give, and partners who feel free in a relationship tend to meet disagreement with less defensiveness.',
                sk: 'Pomenujte priamo, čo kto potrebuje, viac kontaktu alebo viac priestoru, a dohodnite dve-tri malé, predvídateľné istoty: telefonát cez obed, jeden večer pre každého, ktorý nepatrí nikomu inému, prechádzku cez víkend. Keď je jasné, kedy príde ďalšia spoločná chvíľa, čas osobitne sa dá dopriať ľahšie, a partneri, ktorí sa vo vzťahu cítia slobodne, zvyčajne reagujú na nezhody menej obranne.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['opposed', 'one-sided'], mechanisms: ['closeness-and-room/opposed', 'closeness-and-room/oneSided'] },
            sources: ['ROM-016'],
        },
        {
            id: 'rom.ask-for-company-plainly',
            title: { en: 'Ask for company as a wish, not a complaint', sk: 'Požiadať o spoločnosť ako o prianie, nie výčitku' },
            body: {
                en: 'When you would like more time together, say it as a plain wish. “I’d like us to have dinner together tonight; would that suit you?” A clear, specific request tends to be easier to meet than a hint, and saying what you want is part of being known.',
                sk: 'Keď chcete viac spoločného času, povedzte to ako obyčajné prianie: „Čo keby sme dnes večer večerali spolu? Hodí sa ti to?“ Jasná, konkrétna prosba sa zvyčajne plní ľahšie než náznak a povedať, čo chcete, patrí k tomu, aby vás druhý poznal.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['shared', 'one-sided'], mechanisms: ['closeness-and-room/shared:independent', 'closeness-and-room/oneSided:independent'] },
            sources: ['ROM-013'],
        },
        {
            id: 'rom.room-with-a-return',
            title: { en: 'Take the room, announce the return', sk: 'Vziať si priestor a ohlásiť návrat' },
            body: {
                en: 'When room is needed, say so in a way that cannot be mistaken for leaving: “I need Saturday morning to myself; I’ll be back for lunch.” Then come back on time, and come back present. Room with a clear start and a clear end is less likely to read as rejection.',
                sk: 'Keď potrebuješ priestor, povedz to tak, aby sa to nedalo zameniť s odchodom: „Potrebujem sobotné dopoludnie pre seba, na obed som späť.“ Potom sa vráť načas a naozaj s pozornosťou. Priestor s jasným začiatkom a jasným koncom zvyčajne nepôsobí ako odmietnutie.',
            },
            audience: { kind: 'pole', pole: 'independent' },
            triggers: { dynamic: 'closeness-and-room', relations: ['opposed', 'one-sided'], mechanisms: ['closeness-and-room/opposed', 'closeness-and-room/oneSided:independent'] },
            sources: ['ROM-016'],
        },
        {
            id: 'rom.one-evening-is-one-evening',
            title: { en: 'Hear an evening apart as one evening', sk: 'Večer osobitne je len jeden večer' },
            body: {
                en: 'When the other asks for an evening alone, take it as news about that evening: “Fine. Shall we do something together tomorrow?” Then let the evening be. Feeling free inside a relationship goes with meeting disagreements with more understanding and less defensiveness.',
                sk: 'Keď druhý požiada o večer pre seba, ber to ako správu o tom jednom večere: „Dobre. Urobíme si niečo spolu zajtra?“ Potom ten večer nechaj tak. Pocit slobody vo vzťahu súvisí s tým, že sa na nezhody reaguje s väčším porozumením a menej obranne.',
            },
            audience: { kind: 'pole', pole: 'collaborative' },
            triggers: { dynamic: 'closeness-and-room', relations: ['one-sided'], mechanisms: ['closeness-and-room/oneSided:collaborative'] },
            sources: ['ROM-016'],
        },
        {
            id: 'rom.ask-for-closeness',
            title: { en: 'Ask for closeness directly', sk: 'Požiadať o blízkosť priamo' },
            body: {
                en: 'When distance starts to worry, ask for something specific rather than testing: “Could we go for a walk together after work?” A clear request is easier to meet than a hint. The wish for reassurance can rise and fall from week to week, so a worrying day may say more about the week than about the relationship.',
                sk: 'Keď ťa odstup začne znepokojovať, požiadaj o niečo konkrétne namiesto skúšania: „Pôjdeme sa po práci spolu prejsť?“ Jasnú prosbu je ľahšie splniť ako náznak. Potreba uistenia môže z týždňa na týždeň stúpať aj klesať, takže znepokojivý deň niekedy hovorí viac o týždni než o vzťahu.',
            },
            audience: { kind: 'pole', pole: 'collaborative' },
            triggers: { dynamic: 'closeness-and-room', relations: ['opposed'], mechanisms: ['closeness-and-room/opposed'] },
            sources: ['ROM-004'],
        },
        {
            id: 'rom.i-before-we',
            title: { en: 'Say “I” before “we”', sk: 'Najprv „ja“, potom „my“' },
            body: {
                en: 'When a plan comes up, let each say first what they would choose alone, and only then shape the “we”. A wish that is heard before it is merged is less likely to be dropped quietly. Being in a relationship by one’s own choice is linked with calmer, more understanding disagreements.',
                sk: 'Keď príde reč na plán, nech najprv každý povie vlastnú voľbu a až potom z toho spolu poskladajte „my“. Prianie, ktoré zaznie skôr, než sa rozpustí v spoločnom pláne, sa menej ľahko potichu stratí. To, že je človek vo vzťahu z vlastnej voľby, súvisí s pokojnejšími a chápavejšími nezhodami.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['shared'], mechanisms: ['closeness-and-room/shared:collaborative'] },
            sources: ['ROM-016'],
        },
        {
            id: 'rom.talk-about-warmth',
            title: { en: 'Talk about warmth and closeness, gently', sk: 'Jemne hovoriť o vrúcnosti a blízkosti' },
            body: {
                en: 'At a relaxed, ordinary moment, not in the middle of intimacy or tension, talk about the kinds of warmth and physical closeness each of you enjoys, and what you would like more or less of. The quality of such a conversation seems to matter more than how often it happens, and any no is a complete answer.',
                sk: 'V uvoľnenej, obyčajnej chvíli, nie uprostred dôvernosti ani napätia, sa porozprávajte o tom, aké podoby vrúcnosti a fyzickej blízkosti sú každému z vás príjemné a čoho by mohlo byť viac či menej. Na kvalite takého rozhovoru zrejme záleží viac než na tom, ako často sa vedie, a každé „nie“ je úplná odpoveď.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['shared'], mechanisms: ['closeness-and-room/shared:independent'] },
            sources: ['ROM-021', 'ROM-022'],
        },
        {
            id: 'rom.daily-ritual',
            title: { en: 'A small daily ritual of connection', sk: 'Malý denný rituál spojenia' },
            body: {
                en: 'Pick one moment each day that belongs to the two of you, coffee before work or a short while after dinner, and use it to ask about the day and say one thing you appreciate. Everyday appreciation is among the things most closely tied to a relationship feeling good.',
                sk: 'Vyberte si jednu chvíľu denne, ktorá patrí len vám dvom, kávu pred prácou alebo chvíľku po večeri, a počas tej chvíle sa spýtajte na deň a vyslovte jedno ocenenie. Každodenné ocenenie patrí k tomu, čo najviac súvisí s pocitom, že je vzťah dobrý.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['opposed', 'one-sided'], mechanisms: ['closeness-and-room/opposed', 'closeness-and-room/oneSided:independent'] },
            sources: ['ROM-001'],
        },
        /* taking-the-lead: a soft start-up for the one who opens, a voice for the one who waits */
        {
            id: 'rom.ask-then-propose',
            title: { en: 'Ask first, then propose', sk: 'Najprv sa opýtať, potom navrhnúť' },
            body: {
                en: 'Before suggesting the plan or raising the issue, ask what the other would want, and wait a moment longer than feels needed for a real answer. When something hard has to be said, start with reassurance (“I’m on your side here”), then name one specific thing. A softer start can meet a less defensive reply.',
                sk: 'Skôr než navrhneš plán alebo otvoríš problém, opýtaj sa, aké želanie má druhý človek, a na skutočnú odpoveď počkaj o chvíľu dlhšie, než sa zdá potrebné. Keď treba povedať niečo ťažké, začni uistením („Som tu na tvojej strane“) a potom pomenuj jednu konkrétnu vec. Jemnejší začiatok môže vyvolať menej obrannú odpoveď.',
            },
            audience: { kind: 'pole', pole: 'assertive' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed', 'one-sided'], mechanisms: ['taking-the-lead/opposed', 'taking-the-lead/oneSided:assertive'] },
            sources: ['ROM-012', 'ROM-006'],
        },
        {
            id: 'rom.bring-a-wish',
            title: { en: 'Bring one wish of your own', sk: 'Priniesť jedno vlastné želanie' },
            body: {
                en: 'Once a week, offer one wish before being asked: a place to go, something to change, a small thing that would make the week better. It can be modest. A preference said early can still shape the plan, and saying what you want is part of being known.',
                sk: 'Raz do týždňa ponúkni jedno želanie skôr, než sa ťa niekto opýta: miesto, kam ísť, niečo, čo zmeniť, drobnosť, ktorá by zlepšila týždeň. Môže byť skromné. Želanie vyslovené včas ešte môže plán ovplyvniť a povedať, čo chceš, patrí k tomu, aby ťa druhý poznal.',
            },
            audience: { kind: 'pole', pole: 'receptive' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed', 'one-sided'], mechanisms: ['taking-the-lead/opposed', 'taking-the-lead/oneSided:receptive'] },
            sources: ['ROM-013'],
        },
        {
            id: 'rom.both-plans-side-by-side',
            title: { en: 'Put both plans side by side', sk: 'Dva plány vedľa seba' },
            body: {
                en: 'When you each arrive with a plan, say both out loud before picking one, and ask what each is for: rest, company, something new. Sometimes one day can serve both aims, and the talk moves from who gives way to what the day is for. Goals that partners hold in common go with greater satisfaction, and goals in conflict with less.',
                sk: 'Keď každý z vás príde s vlastným plánom, povedzte nahlas oba, skôr než si jeden vyberiete, a spýtajte sa, na čo je ktorý: oddych, spoločnosť, niečo nové. Niekedy sa dajú oba ciele spojiť v jednom dni a rozhovor sa presunie od toho, kto ustúpi, k tomu, na čo má deň byť. Spoločné ciele partnerov súvisia s väčšou spokojnosťou, ciele v rozpore s menšou.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'taking-the-lead', relations: ['shared'], mechanisms: ['taking-the-lead/shared:assertive'] },
            sources: ['ROM-034'],
        },
        {
            id: 'rom.each-brings-a-wish',
            title: { en: 'Each of you brings one wish', sk: 'Každý prinesie jedno želanie' },
            body: {
                en: 'Once a week, each of you names one small wish before being asked: a place to go, a dish, a change to the routine. It need not be agreed on the spot; the point is that both wishes get said. Saying what one wants tends to go with feeling closer and better understood.',
                sk: 'Raz do týždňa pomenuje každý z vás jedno malé želanie skôr, než príde otázka: miesto, kam ísť, jedlo, zmenu v zabehnutom programe. Dohodnúť sa netreba hneď; ide o to, aby zaznelo želanie každého z vás. Povedať, čo človek chce, zvyčajne súvisí s pocitom väčšej blízkosti a porozumenia.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'taking-the-lead', relations: ['shared'], mechanisms: ['taking-the-lead/shared:receptive'] },
            sources: ['ROM-013'],
        },
        /* structure-and-flexibility: the daily load, and each side */
        {
            id: 'rom.share-the-thinking',
            title: { en: 'Share the thinking, not only the chores', sk: 'Deliť sa aj o premýšľanie, nielen o prácu' },
            body: {
                en: 'Sit down once with a list of what keeps daily life running, including the invisible part: noticing, remembering, planning. Let each task have one owner from start to finish. Then ask whether the split feels fair; fair is what you both agree on, not necessarily half and half.',
                sk: 'Sadnite si raz nad zoznam toho, čo drží bežný život v chode, vrátane neviditeľnej časti: všímania si, pamätania, plánovania. Každá úloha nech má jednu osobu, ktorá za ňu zodpovedá od začiatku do konca. Potom sa opýtajte, či rozdelenie pôsobí spravodlivo; spravodlivé je to, na čom sa zhodnete, nie nutne pol na pol.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['opposed', 'one-sided'], mechanisms: ['structure-and-flexibility/opposed', 'structure-and-flexibility/oneSided:structured'] },
            sources: ['ROM-023', 'ROM-024'],
        },
        {
            id: 'rom.must-and-nice',
            title: { en: 'Sort the plan into must and nice', sk: 'Roztriediť plán na nutné a príjemné' },
            body: {
                en: 'Before reacting to a changed plan, check whether it touches something that truly matters or only a habit. Say the important things plainly and specifically; let the small, unchangeable quirks go with some humour. A few fixed points, clearly named, tend to be easier to keep than many unspoken ones.',
                sk: 'Skôr než zareaguješ na zmenený plán, over si, či ide o niečo naozaj dôležité, alebo len o zvyk. Dôležité veci povedz priamo a konkrétne; drobné, nemenné zvláštnosti nechaj s humorom tak. Niekoľko jasne pomenovaných pevných bodov sa zvyčajne dodržiava ľahšie než mnoho nevyslovených.',
            },
            audience: { kind: 'pole', pole: 'structured' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['opposed', 'one-sided'], mechanisms: ['structure-and-flexibility/opposed', 'structure-and-flexibility/oneSided:structured'] },
            sources: ['ROM-012'],
        },
        {
            id: 'rom.early-word',
            title: { en: 'Say early when a plan will slip', sk: 'Včas povedať, že sa plán posunie' },
            body: {
                en: 'When a shared plan is going to change, say so as soon as it is known, not at the moment it happens. Small, reliable follow-through, doing what was agreed or warning early when it cannot be done, is the kind of self-control people tend to read as trustworthiness.',
                sk: 'Keď sa spoločný plán zmení, povedz to hneď, ako to vieš, nie až v tej chvíli. Drobná spoľahlivosť, teda urobiť, čo bolo dohodnuté, alebo včas upozorniť, keď to nepôjde, je ten druh sebaovládania, ktorý ľudia zvyčajne vnímajú ako znak dôveryhodnosti.',
            },
            audience: { kind: 'pole', pole: 'adaptable' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['opposed', 'one-sided'], mechanisms: ['structure-and-flexibility/opposed', 'structure-and-flexibility/oneSided:adaptable'] },
            sources: ['ROM-014'],
        },
        {
            id: 'rom.ask-what-a-change-gives',
            title: { en: 'Ask what a change would give', sk: 'Spýtať sa, čo by zmena priniesla' },
            body: {
                en: 'When one of you proposes changing a settled plan, the other’s first reply is a question rather than the diary: “What would it give us?” Then decide together. Doing something new together, even something small, is linked with a fresher sense of the relationship.',
                sk: 'Keď jeden z vás navrhne zmeniť dohodnutý plán, druhý najprv odpovie otázkou, nie pohľadom do diára: „Čo by nám to dalo?“ Potom sa rozhodnite spolu. Spoločné nové zážitky, aj tie drobné, súvisia s tým, že vzťah pôsobí sviežejšie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['shared'], mechanisms: ['structure-and-flexibility/shared:structured'] },
            sources: ['ROM-015'],
        },
        {
            id: 'rom.reminder-is-help',
            title: { en: 'Let a reminder count as help', sk: 'Pripomenutie ako pomoc' },
            body: {
                en: 'Agree that a plain reminder about a dull matter counts as help, not as criticism: “The insurance is due soon; yours or mine?” Noticing what needs doing is real work, and it is a common source of friction when it goes unspoken.',
                sk: 'Dohodnite sa, že obyčajné pripomenutie nudnej povinnosti je pomoc, nie výčitka: „Blíži sa termín poistky. Vybavíš to ty, alebo ja?“ Všímať si, čo treba urobiť, je skutočná práca a keď sa o tom mlčí, býva častým zdrojom trenia.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['shared'], mechanisms: ['structure-and-flexibility/shared:adaptable'] },
            sources: ['ROM-023'],
        },
        /* practical-and-conceptual: the how and the what-if, each said as interest */
        {
            id: 'rom.yes-before-how',
            title: { en: 'Put the yes before the how', sk: 'Najprv áno, potom ako' },
            body: {
                en: 'When the other shares a new idea, put the welcome first and the practical question second: “I’d love that. Where would we start?” A question about how that arrives with its welcome is easier to hear as interest than as a first objection. Warmth in listening is part of what makes a partner come across as responsive.',
                sk: 'Keď druhý príde s novým nápadom, daj najprv najavo, že ťa to teší, a až potom sa pýtaj prakticky: „To by bolo krásne. Kde by sme začali?“ Praktická otázka, ktorá príde spolu s radosťou, sa ľahšie počuje ako záujem než ako prvá námietka. Vľúdnosť pri počúvaní patrí k tomu, vďaka čomu partner pôsobí vnímavo.',
            },
            audience: { kind: 'pole', pole: 'practical' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['opposed', 'one-sided'], mechanisms: ['practical-and-conceptual/opposed', 'practical-and-conceptual/oneSided:practical'] },
            sources: ['ROM-006'],
        },
        {
            id: 'rom.dream-with-a-first-step',
            title: { en: 'Give a dream one first step', sk: 'Dať snu prvý krok' },
            body: {
                en: 'When you share a dream, add one small step it could start with. “A year abroad, maybe; we could begin by looking at one city.” A dream with a foot on the ground can be easier for a practical partner to take up. Goals that partners share go with greater satisfaction.',
                sk: 'Keď sa podelíš o sen, pridaj jeden malý krok, ktorým by sa dalo začať. „Rok v zahraničí, možno; mohli by sme si najprv pozrieť jedno mesto.“ Sen, ktorý stojí aspoň jednou nohou na zemi, praktický partner ľahšie prijme. Spoločné ciele partnerov súvisia s väčšou spokojnosťou.',
            },
            audience: { kind: 'pole', pole: 'conceptual' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['opposed'], mechanisms: ['practical-and-conceptual/opposed'] },
            sources: ['ROM-034'],
        },
        /* reasoning-style: the hunch questioned (opposed), the plan before the feeling (shared analytical), the unchecked guess (shared intuitive), the felt view next to the reasoned one (one-sided) */
        {
            id: 'rom.ask-what-the-feeling-noticed',
            title: { en: 'Ask what the feeling has noticed', sk: 'Spýtať sa, čo pocit zachytil' },
            body: {
                en: 'When the other senses that something about a plan is off, ask what the sense is picking up rather than what it rests on: “What feels wrong about it?” Treat the first answer as information, not as a case to rebut. Listening to understand, rather than to test, helps a partner feel taken seriously.',
                sk: 'Keď druhý vycíti, že na pláne niečo nesedí, spýtaj sa, čo ten pocit zachytáva, a nie, na čom stojí: „Čo ti na tom nesedí?“ Prvú odpoveď ber ako informáciu, nie ako tvrdenie na vyvrátenie. Počúvanie s cieľom pochopiť, a nie preveriť, pomáha partnerovi cítiť sa braný vážne.',
            },
            audience: { kind: 'pole', pole: 'analytical' },
            triggers: { dynamic: 'reasoning-style', relations: ['opposed'], mechanisms: ['reasoning-style/opposed'] },
            sources: ['ROM-006'],
        },
        {
            id: 'rom.ideas-or-company',
            title: { en: 'Ideas, or company?', sk: 'Nápady, alebo spoločnosť?' },
            body: {
                en: 'When one of you brings a worry, the other asks first: “Do you want ideas, or just company with this?” Then honour the answer, even when the fix looks obvious. Being listened to first, and helped second, is a main route to being understood.',
                sk: 'Keď niekto z vás prinesie starosť, druhá strana sa najprv opýta: „Chceš nápady, alebo len spoločnosť?“ Potom odpoveď rešpektujte, aj keď sa náprava zdá zrejmá. Najprv vypočuť a až potom pomáhať je jednou z hlavných ciest k porozumeniu.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'reasoning-style', relations: ['shared'], mechanisms: ['reasoning-style/shared:analytical'] },
            sources: ['ROM-006'],
        },
        {
            id: 'rom.hunch-and-reasons',
            title: { en: 'Put the hunch and the reasons side by side', sk: 'Tušenie a dôvody vedľa seba' },
            body: {
                en: 'For a real decision, each of you writes two lines: what the gut says and what the reasons say. Read them together before arguing. The hunch may point to what matters and the reasons to a way of getting there, and a disagreement can shrink once both are visible.',
                sk: 'Pri skutočnom rozhodnutí napíše každý z vás dva riadky: čo hovorí intuícia a čo hovoria dôvody. Prečítajte si ich spolu skôr, než sa začnete dohadovať. Tušenie môže ukázať, na čom záleží, a dôvody cestu, ako sa tam dostať, a keď vidno oboje, nezhoda sa môže zmenšiť.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'reasoning-style', relations: ['opposed', 'one-sided'], mechanisms: ['reasoning-style/opposed', 'reasoning-style/oneSided'] },
            sources: ['ROM-034'],
        },
        {
            id: 'rom.check-one-guess',
            title: { en: 'Check one guess out loud', sk: 'Overiť jeden dohad nahlas' },
            body: {
                en: 'At a calm moment, each says one thing they have assumed about the other’s mood lately, and the other says how close it was. A silent guess becomes a short conversation, and close listening is one of the main routes to feeling understood.',
                sk: 'V pokojnej chvíli povie každý jeden dohad o nálade druhého z poslednej doby a druhý povie, nakoľko sedel. Z tichého dohadu sa stane krátky rozhovor a pozorné počúvanie veľmi pomáha k pocitu, že si dvaja rozumejú.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'reasoning-style', relations: ['shared'], mechanisms: ['reasoning-style/shared:intuitive'] },
            sources: ['ROM-006'],
        },
        /* risk-and-caution: deciding together under different comfort with risk */
        {
            id: 'rom.name-the-specific-worry',
            title: { en: 'Name the specific worry', sk: 'Pomenovať konkrétnu obavu' },
            body: {
                en: 'Instead of a general no, name exactly what is worrying and what would make the step acceptable: a trial period, a savings cushion, a way back. A precise worry can be answered; a vague one tends to feel like a wall.',
                sk: 'Namiesto všeobecného „nie“ pomenuj presne, čo znepokojuje a čo by krok urobilo prijateľným: skúšobné obdobie, finančná rezerva, cesta späť. Na presnú obavu sa dá odpovedať; neurčitá zvyčajne pôsobí ako múr.',
            },
            audience: { kind: 'pole', pole: 'cautious' },
            triggers: { dynamic: 'risk-and-caution', relations: ['opposed', 'one-sided'], mechanisms: ['risk-and-caution/opposed', 'risk-and-caution/oneSided:cautious'] },
            sources: ['ROM-012'],
        },
        {
            id: 'rom.bring-the-idea-early',
            title: { en: 'Bring the idea early, as an idea', sk: 'Prinášať nápad včas, ako nápad' },
            body: {
                en: 'Share a bold plan while it is still a possibility, not once it is half decided, and invite the questions before the details are fixed. Then let the worries reshape it. Holding enthusiasm back long enough to hear a doubt is a form of self-control, and self-control is one of the things trust rests on.',
                sk: 'Podeľ sa o smelý plán, kým je to ešte len možnosť, nie keď je napoly hotový, a pozvi zvedavosť aj námietky skôr, než sa ustália podrobnosti. Potom nechaj obavy plán pretvárať. Udržať nadšenie na uzde, kým zaznie obava, je forma sebaovládania a na sebaovládaní čiastočne stojí dôvera.',
            },
            audience: { kind: 'pole', pole: 'risk-oriented' },
            triggers: { dynamic: 'risk-and-caution', relations: ['opposed', 'one-sided'], mechanisms: ['risk-and-caution/opposed', 'risk-and-caution/oneSided:risk-oriented'] },
            sources: ['ROM-014'],
        },
        {
            id: 'rom.floor-before-the-leap',
            title: { en: 'Agree the floor before the leap', sk: 'Najprv istota, potom skok' },
            body: {
                en: 'Before a big decision, a move, a purchase, a change of work, agree what has to stay protected however it turns out: the savings line, the home, time for each other. Then look at the option above that floor together, as a team facing one question rather than two sides. Facing a stressful choice jointly goes with partners feeling better together.',
                sk: 'Pred veľkým rozhodnutím (sťahovaním, kúpou či zmenou práce) sa dohodnite, čo musí zostať chránené, nech to dopadne akokoľvek: hranica úspor, domov, čas jeden pre druhého. Potom sa na možnosť nad touto hranicou pozrite spolu, ako tím pred jednou otázkou, nie ako dve strany sporu. Spoločné zvládanie záťaže súvisí s tým, že sa partneri vo vzťahu cítia lepšie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'risk-and-caution', mechanisms: ['risk-and-caution/opposed', 'risk-and-caution/oneSided', 'risk-and-caution/shared:risk-oriented'] },
            sources: ['ROM-025'],
        },
        {
            id: 'rom.take-turns-at-the-brake',
            title: { en: 'Take turns holding the brake', sk: 'Striedať sa pri brzde' },
            body: {
                en: 'For a big plan, agree who plays the careful one this time: the person who asks about money, the way back and what happens if it fails, with the other’s blessing. A doubt that both have asked for tends to be easier to hear as care than one that arrives uninvited.',
                sk: 'Pri väčšom pláne sa dohodnite, kto tentoraz bude ten opatrný: kto sa s požehnaním druhého spýta na peniaze, na cestu späť a na to, čo ak sa to pokazí. Pochybnosť, o ktorú ste sami požiadali, sa zvyčajne ľahšie počuje ako pomoc než tá, ktorá príde nečakane.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'risk-and-caution', relations: ['shared'], mechanisms: ['risk-and-caution/shared:risk-oriented'] },
            sources: ['ROM-012'],
        },
        {
            id: 'rom.what-would-make-it-yes',
            title: { en: 'Ask what would make it a yes', sk: 'Spýtať sa, za akých podmienok áno' },
            body: {
                en: 'For a plan that keeps going back in the drawer, each says what would have to be true for a yes: a sum put aside, a date to look at it again, a way back. Doubts named precisely can be answered, and backing each other’s goals, not only guarding against them, goes with feeling better together.',
                sk: 'Pri pláne, ktorý sa stále vracia do šuplíka, povie každý, čo by muselo platiť, aby to bolo áno: odložená suma, termín, keď sa k tomu vrátite, cesta späť. Na presne pomenované pochybnosti sa dá odpovedať a podporovať ciele toho druhého, nielen sa pred nimi chrániť, súvisí s tým, že sa partneri cítia spolu lepšie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'risk-and-caution', relations: ['shared'], mechanisms: ['risk-and-caution/shared:cautious'] },
            sources: ['ROM-034'],
        },
        /* social-energy: the way home after company, the invitation declined too easily, the small worry that needs only two chairs */
        {
            id: 'rom.the-way-home',
            title: { en: 'Agree how the way home goes', sk: 'Dohodnúť sa, ako pôjde cesta domov' },
            body: {
                en: 'After an evening among people, agree how the way home goes: the one who comes back lit up shares one highlight, and the one who comes back tired may ask to keep the rest for the morning. Quiet on the way home can then mean tired, not unhappy. Handling everyday strain together goes with partners feeling better together.',
                sk: 'Po večere medzi ľuďmi sa dohodnite, ako bude vyzerať cesta domov: kto sa vracia nabitý, povie jeden najlepší zážitok, a kto sa vracia unavený, môže poprosiť, aby zvyšok počkal do rána. Ticho cestou domov potom môže znamenať únavu, nie nespokojnosť. Spoločné zvládanie každodennej záťaže súvisí s tým, že sa partneri spolu cítia lepšie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'social-energy', relations: ['opposed'], mechanisms: ['social-energy/opposed'] },
            sources: ['ROM-025'],
        },
        {
            id: 'rom.part-of-you-wanted-yes',
            title: { en: 'Ask whether part of you wanted to go', sk: 'Spýtať sa, či to aspoň trochu lákalo' },
            body: {
                en: 'When an invitation is declined without discussion, ask once: “Did part of you want to say yes?” One of you can go while the other stays in. Saying a small wish aloud is part of being known.',
                sk: 'Keď sa pozvanie odmietne bez debaty, spýtajte sa raz: „Nelákalo ťa to aspoň trochu?“ Jeden z vás môže ísť a druhý zostať doma. Vysloviť aj malé želanie patrí k tomu, aby vás druhý poznal.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'social-energy', relations: ['shared', 'one-sided'], mechanisms: ['social-energy/shared:private', 'social-energy/oneSided:private'] },
            sources: ['ROM-013'],
        },
        {
            id: 'rom.half-an-hour-first',
            title: { en: 'Half an hour for two, before the next plan', sk: 'Pol hodiny pre dvoch pred ďalším plánom' },
            body: {
                en: 'When something small is bothering you, say so before the next plan is made. “Before we say yes to Friday, can we have half an hour, just us?” A worry raised while it is small tends to be easier to talk through, and opening up to each other goes with feeling closer.',
                sk: 'Keď vás niečo malé trápi, povedzte to skôr, než padne ďalší plán. „Kým povieme áno na piatok, dáme si pol hodiny len pre nás?“ Starosť, ktorá zaznie, kým je malá, sa zvyčajne preberá ľahšie a otvorenosť medzi partnermi súvisí s pocitom väčšej blízkosti.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'social-energy', relations: ['shared'], mechanisms: ['social-energy/shared:social'] },
            sources: ['ROM-013'],
        },
        /* change-and-steadiness: novelty inside the familiar, and stress in a season of change */
        {
            id: 'rom.new-inside-familiar',
            title: { en: 'Something new, inside something familiar', sk: 'Niečo nové vo vnútri známeho' },
            body: {
                en: 'Now and then, try something that is new to both of you (a different walk, a class, a dish from an unfamiliar kitchen) while keeping a familiar frame around it, the same evening or the same company. Shared novelty tends to refresh closeness, and the familiar frame can keep it from feeling like upheaval.',
                sk: 'Z času na čas skúste niečo, čo je pre vás dvoch nové (inú trasu, kurz, jedlo z neznámej kuchyne), a nechajte okolo toho známy rámec, ten istý večer alebo tú istú spoločnosť. Spoločná novota zvyčajne osvieži blízkosť a známy rámec môže zabrániť, aby pôsobila ako prevrat.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['opposed', 'one-sided'], mechanisms: ['change-and-steadiness/opposed', 'change-and-steadiness/oneSided:stability-seeking'] },
            sources: ['ROM-015'],
        },
        {
            id: 'rom.like-one-thing-first',
            title: { en: 'Find one thing to like first', sk: 'Najprv nájsť, čo sa páči' },
            body: {
                en: 'When a change is floated, find one thing in it you could like before naming what worries you. “I like the idea of a bigger kitchen; I’m worried about the cost.” Support for a partner’s goals, alongside honest doubts, goes with greater satisfaction in the relationship.',
                sk: 'Keď padne návrh na zmenu, nájdi na návrhu jednu vec, ktorá by sa ti mohla páčiť, skôr než pomenuješ, čo ťa znepokojuje. „Väčšia kuchyňa by sa mi páčila, bojím sa však nákladov.“ Podpora cieľov partnera spolu s úprimnými pochybnosťami súvisí s väčšou spokojnosťou vo vzťahu.',
            },
            audience: { kind: 'pole', pole: 'stability-seeking' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['opposed'], mechanisms: ['change-and-steadiness/opposed'] },
            sources: ['ROM-034'],
        },
        {
            id: 'rom.change-as-a-team',
            title: { en: 'Face a big change as a team', sk: 'Veľkú zmenu zvládať ako tím' },
            body: {
                en: 'In a season of change, a move, a new job, a new family member, set a short, calm weekly check-in before friction builds. Each says what is needed right now: a listening ear, practical help, or time alone. Stress from outside can sharpen how partners judge each other, so pause before blaming.',
                sk: 'V období zmeny, pri sťahovaní, novej práci či novom členovi rodiny, si dohodnite krátky, pokojný týždenný rozhovor skôr, než sa trenie nahromadí. Každý povie, čo práve potrebuje: pozorné ucho, praktickú pomoc alebo chvíľu osamote. Stres zvonka môže zostriť to, ako sa partneri navzájom posudzujú, preto sa pred výčitkou zastavte.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['shared'], mechanisms: ['change-and-steadiness/shared:stability-seeking'] },
            sources: ['ROM-025', 'ROM-026'],
        },
        {
            id: 'rom.finish-one-together',
            title: { en: 'Finish one thing together', sk: 'Dokončiť spolu jednu vec' },
            body: {
                en: 'Pick one half-done shared thing, the photos, the shelf, the papers from a trip, and finish it together before starting the next. Seeing a plan through shows the steady side of a person, and that steadiness is part of what trust rests on.',
                sk: 'Vyberte jednu rozrobenú spoločnú vec, fotky, policu, papiere z cesty, a spolu to dokončite, skôr než začnete ďalšiu. Dotiahnuť plán do konca ukazuje stálosť a na takej stálosti čiastočne stojí dôvera.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['shared'], mechanisms: ['change-and-steadiness/shared:novelty-seeking'] },
            sources: ['ROM-014'],
        },
        {
            id: 'rom.choose-the-new-together',
            title: { en: 'Choose the new thing together', sk: 'Vybrať novinku spolu' },
            body: {
                en: 'Of the new things on offer, let the one who usually goes along choose which to try first, and leave the rest for later without apology. Doing something new together is linked with a fresher feeling between partners.',
                sk: 'Z nových nápadov nech ten, kto sa zvyčajne pridáva, vyberie, ktorý vyskúšate ako prvý, a ostatné nechajte na neskôr bez ospravedlňovania. Spoločne prežité nové zážitky súvisia so sviežejším pocitom medzi partnermi.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['one-sided'], mechanisms: ['change-and-steadiness/oneSided:novelty-seeking'] },
            sources: ['ROM-015'],
        },
        /* shared-pull: nurturing what both are for, and shared direction */
        {
            id: 'rom.feed-the-shared-pull',
            title: { en: 'Give what you share a place, and a limit', sk: 'Dať spoločnému smerovaniu miesto aj hranicu' },
            body: {
                en: 'Name what draws you both and give it a regular place, a project or an evening that serves it. Every so often, check what it leaves out: the rest of the relationship, and what each of you wants separately. Backing each other’s goals tends to go with feeling better together.',
                sk: 'Pomenujte, čo vás dvoch spoločne priťahuje, a dajte tomu pravidelné miesto, projekt alebo večer, ktorý tomu slúži. Z času na čas si overte, čo to vytláča: zvyšok vzťahu aj to, čo chce každý z vás osobitne. Vzájomná podpora cieľov zvyčajne súvisí s tým, že sa partneri spolu cítia lepšie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'] },
            sources: ['ROM-034'],
        },
        {
            id: 'rom.next-few-years',
            title: { en: 'Talk about the next few years', sk: 'Rozhovor o najbližších rokoch' },
            body: {
                en: 'Once or twice a year, talk about where each of you hopes to be in a few years — home, work, money, family — and how you could back each other’s plans. Shared aims tend to go with feeling good together, and saying them aloud keeps them from being merely assumed.',
                sk: 'Raz-dvakrát do roka sa porozprávajte o tom, kde chce byť každý z vás o pár rokov — domov, práca, peniaze, rodina — a ako si môžete navzájom podporiť plány. Spoločné ciele zvyčajne idú ruka v ruke s dobrým pocitom zo vzťahu a ich vyslovenie zabráni, aby sa len predpokladali.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'] },
            sources: ['ROM-034'],
        },
        /* pulls-apart: each card carries the example of one pair of drives, so it is scoped to that pair */
        {
            id: 'rom.ask-which-attention',
            title: { en: 'Ask which attention is wanted', sk: 'Spýtať sa, akú pozornosť druhá strana chce' },
            body: {
                en: 'Before reacting to news, ask: “Cheer first, or tell me how it works?” and give that first; the other kind can follow. Listening that answers what the other actually wants is a main route to feeling understood.',
                sk: 'Skôr než zareagujete na novinku, spýtajte sa: „Najprv potlesk, alebo mi povieš, ako to funguje?“ a dajte najprv to; druhé môže prísť potom. Počúvanie, ktoré odpovedá na to, čo druhý naozaj chce, je jednou z hlavných ciest k tomu, aby sa človek cítil pochopený.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/recognition|understanding'] },
            sources: ['ROM-006'],
        },
        {
            id: 'rom.say-what-you-hope-for',
            title: { en: 'Say what you are hoping for', sk: 'Povedať, akú odozvu čakáte' },
            body: {
                en: 'When you bring news, say what you would like back: “I just want you to be pleased for me,” or “Ask me how I did it.” It saves the other a guess, and saying what one needs is part of being known.',
                sk: 'Keď prinášate novinku, povedzte, akú odozvu by ste chceli: „Chcem sa z toho s tebou len potešiť,“ alebo „Spýtaj sa ma, ako sa to podarilo.“ Druhá strana tak nemusí hádať. Povedať, čo človek potrebuje, patrí k tomu, ako sa dvaja ľudia spoznávajú.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/recognition|understanding'] },
            sources: ['ROM-013'],
        },
        {
            id: 'rom.need-behind-the-pull',
            title: { en: 'Name the need behind each wish', sk: 'Pomenovať potrebu za každým želaním' },
            body: {
                en: 'When a weekend away collides with a weekend with family, each first names the need behind the wish, room to breathe or time to feel close, and only then is the plan discussed. Wishes that clash tend to weigh on a relationship, and a need is often easier to meet than a plan.',
                sk: 'Keď sa víkend mimo domu zrazí s víkendom s rodinou, nech najprv každý pomenuje potrebu za svojím želaním, priestor na nadýchnutie alebo čas na blízkosť, a až potom sa hovorí o pláne. Želania, ktoré sa bijú, zvyčajne vzťah zaťažujú a potrebe sa často dá vyhovieť ľahšie než plánu.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/freedom|belonging'] },
            sources: ['ROM-034'],
        },
        {
            id: 'rom.apart-and-back',
            title: { en: 'Say what the time apart leads back to', sk: 'Povedať, k čomu spoločnému sa vraciate' },
            body: {
                en: 'When one of you takes an evening alone, say what you look forward to doing together afterwards. “Out with friends tonight; tomorrow evening is ours.” Room that comes with a way back can be easier to trust, and feeling free inside a relationship is linked with calmer disagreements.',
                sk: 'Keď si jeden z vás vezme večer pre seba, nech povie, na čo spoločné sa potom teší: „Dnes idem s priateľmi, zajtrajší večer je náš.“ Priestor, ktorý má cestu späť, sa ľahšie prijíma a pocit slobody vo vzťahu súvisí s pokojnejšími nezhodami.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/freedom|belonging'] },
            sources: ['ROM-016'],
        },
        {
            id: 'rom.back-the-other-pull',
            title: { en: 'Back the wish that is not yours', sk: 'Podporiť želanie, ktoré nie je vaše' },
            body: {
                en: 'Each of you names one concrete way to support the other’s side this month: keeping an evening free for the goal, or joining the family dinner without grumbling. Support that is freely chosen tends to ease conflict more than support given under pressure.',
                sk: 'Každý z vás pomenuje jeden konkrétny spôsob, ako tento mesiac podporiť to, na čom záleží druhému: nechať jeden večer voľný na prácu na cieli, alebo prísť na rodinnú večeru bez frflania. Podpora zo slobodnej voľby zvyčajne upokojuje spory viac než podpora vynútená tlakom.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/achievement|care'] },
            sources: ['ROM-016', 'ROM-034'],
        },
        {
            id: 'rom.what-tonight-is-for',
            title: { en: 'Say what tonight is for', sk: 'Povedať, o čo dnes večer ide' },
            body: {
                en: 'When the goal and a person both want the evening, each says what is at stake tonight: “the draft is due tomorrow” or “my sister sounded low on the phone”. A clash about one evening tends to be easier to settle than a question about where the relationship ranks, and naming it keeps it that size.',
                sk: 'Keď si ten istý večer žiada cieľ aj blízky človek, nech každý povie, o čo práve dnes ide: „zajtra odovzdávam návrh“ alebo „sestra znela do telefónu smutne“. Spor o jeden večer sa zvyčajne rieši ľahšie než otázka, na ktorom mieste je vzťah, a keď sa pomenuje, zostane sporom o jeden večer.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/achievement|care'] },
            sources: ['ROM-034'],
        },
        /* different-pulls */
        {
            id: 'rom.from-the-inside',
            title: { en: 'Ask what it feels like from inside', sk: 'Spýtať sa, aké je to zvnútra' },
            body: {
                en: 'Take turns asking about what the other lives for: what it gives, when it began, what is missing on a day without it. Listen to understand, not to compare. Feeling understood across a difference tends to matter more than wanting the same things.',
                sk: 'Striedajte sa v otázkach na to, pre čo žije druhý: čo to dáva, kedy to začalo, čo chýba v dni bez toho. Počúvajte s cieľom pochopiť, nie porovnávať. Pocit porozumenia napriek rozdielu zvyčajne znamená viac než to, či chcete to isté.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'different-pulls', relations: ['different-drives'] },
            sources: ['ROM-017', 'ROM-006'],
        },
        {
            id: 'rom.room-for-each-pull',
            title: { en: 'Say what the other’s pull has given you', sk: 'Oceniť to, pre čo druhý žije' },
            body: {
                en: 'Each of you names one thing the other’s pull has brought into the shared life, a friend, a habit, a way of seeing, and says it out loud. Time shared out fairly can still leave a pull feeling merely tolerated; a word of appreciation can change that. Feeling appreciated is one of the most robust signs of a relationship that feels good.',
                sk: 'Každý z vás pomenuje jednu vec, ktorú do spoločného života prinieslo to, pre čo druhý žije, priateľa, zvyk, spôsob pozerania sa na svet, a povie to nahlas. Spravodlivo rozdelený čas môže stále nechať pocit, že sa to druhé len trpí; slovo uznania to môže zmeniť. Pocit ocenenia patrí k najspoľahlivejším znakom vzťahu, v ktorom je dobre.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'different-pulls', relations: ['different-drives'] },
            sources: ['ROM-001'],
        },
    ],
    sections: {
        overview: { en: 'The shape of this relationship', sk: 'Podoba tohto vzťahu' },
        story: { en: 'How it tends to go', sk: 'Ako to zvykne ísť' },
        alongside: { en: 'Alongside that', sk: 'Popri tom' },
        guidance: { en: 'Small things to try', sk: 'Drobnosti na vyskúšanie' },
        yourWords: { en: 'What you noticed', sk: 'Tvoje postrehy' },
        next: { en: 'A place to begin', sk: 'Odkiaľ začať' },
        limits: { en: 'What this can and cannot tell', sk: 'Čo tento pohľad povie a čo nie' },
    },
    guidanceIntro: {
        en: 'These are small experiments rather than rules: try one for a week or two, notice how it sits with each of you, and keep only what helps.',
        sk: 'Sú to malé pokusy, nie pravidlá: skús jeden týždeň či dva, všimni si, ako to pôsobí na každého z vás, a ponechaj si len to, čo pomáha.',
    },
    shapes: {
        all: {
            en: '{both} meet in three ways at once: shared ground in {resonance}, a useful difference in {complement}, and the place most likely to rub, {friction}.',
            sk: '{both} sa stretávajú v troch rovinách naraz: spoločná pôda v oblasti „{resonance}“, užitočný rozdiel v oblasti „{complement}“ a miesto, kde to môže najskôr drhnúť, teda „{friction}“.',
        },
        resonanceFriction: {
            en: '{both} share real ground in {resonance}, and the place to handle with care is {friction}.',
            sk: '{both} majú skutočnú spoločnú pôdu v oblasti „{resonance}“ a s opatrnosťou treba pristupovať k oblasti „{friction}“.',
        },
        complementFriction: {
            en: '{both} differ usefully in {complement}, and need the most patience with {friction}.',
            sk: '{both} sa užitočne líšia v oblasti „{complement}“ a najviac trpezlivosti potrebujú v oblasti „{friction}“.',
        },
        resonanceComplement: {
            en: '{both} stand on common ground in {resonance} and gain from their difference in {complement}; no usual sore spot stands out here.',
            sk: '{both} stoja na spoločnej pôde v oblasti „{resonance}“ a z rozdielu v oblasti „{complement}“ môžu čerpať; žiadne bežné bolestivé miesto tu výrazne nevystupuje.',
        },
        resonanceOnly: {
            en: 'What {both} share stands out most clearly, above all in {resonance}.',
            sk: 'Najzreteľnejšie vystupuje to, čo {both} majú spoločné, najmä v oblasti „{resonance}“.',
        },
        complementOnly: {
            en: '{both} differ most clearly in a way that can serve them: {complement}.',
            sk: '{both} sa najzreteľnejšie líšia spôsobom, ktorý im môže slúžiť: v oblasti „{complement}“.',
        },
        frictionOnly: {
            en: '{both} meet most noticeably in {friction}, a difference that asks for care rather than a verdict.',
            sk: '{both} sa najvýraznejšie stretávajú v oblasti „{friction}“, teda v rozdiele, ktorý si žiada starostlivosť, nie verdikt.',
        },
    },
    drivePhrases: {
        shared: { en: 'what draws them in the same direction in life', sk: 'to, čo ich v živote spoločne ťahá' },
        pullsApart: { en: 'what each wants from life together', sk: 'to, čo každý chce od spoločného života' },
        different: { en: 'what each lives for', sk: 'to, pre čo každý žije' },
    },
    care: {
        en: 'If anything here involves fear, intimidation, control over money, friends or choices, or violence of any kind, this reading and its suggestions are not the place to start. A trusted person or a local support service for abuse in relationships can help think through safety first. Where there is no fear but the same painful pattern keeps returning, a qualified couple therapist is worth considering early.',
        sk: 'Ak sa tu objavuje strach, zastrašovanie, kontrola nad peniazmi, priateľmi či rozhodnutiami alebo akékoľvek násilie, toto čítanie ani návrhy, ktoré obsahuje, nie sú miestom, kde začať. Dôverný človek alebo miestna služba pomoci pri násilí vo vzťahoch pomôže najprv premyslieť bezpečie. Ak strach nie je prítomný, no ten istý bolestivý vzorec sa stále vracia, oplatí sa včas zvážiť kvalifikovaného párového terapeuta.',
    },
    /* How the reading ends in this domain, by the shape of its story: why a step of this size suits it, and one question. The step itself is the first research-backed practice the story calls for. */
    endings: {
        converge: {
            next: [
                { en: 'Because {both} already meet well in {phrase}, a small step is enough, and it can build on what works rather than on what is wrong.', sk: 'Keďže sa {both} už v oblasti „{phrase}“ dobre stretávajú, stačí malý krok, ktorý nadviaže na to, čo funguje, a nie na to, čo je zlé.' },
                { en: 'When two people share ground as {both} do in {phrase}, the risk is taking it for granted, so the step that fits is a small way of using it on purpose.', sk: 'Keď dvaja ľudia stoja na spoločnej pôde, ako {both} v oblasti „{phrase}“, hrozí, že sa táto pôda začne brať ako samozrejmosť, a preto sa hodí malý spôsob, ako túto pôdu využiť zámerne.' },
            ],
            ask: [
                { en: 'On {phrase}, what is already working, and how could {both} keep it that way?', sk: 'Čo v oblasti „{phrase}“ už funguje a ako by to {both} mohli udržať?' },
                { en: 'On {phrase}, where would a little more of what already works be welcome?', sk: 'Kde by sa v oblasti „{phrase}“ hodilo trochu viac z toho, čo už funguje?' },
            ],
            step: [
                { en: 'This week, each of you says aloud one thing the other does in this part of life that you would not want to lose.', sk: 'Tento týždeň každý z vás nahlas povie jednu vec, ktorú v tejto oblasti robí druhá strana a ktorú si chcete zachovať.' },
                { en: 'Pick one ordinary moment this week and use it on purpose: do the thing that already works, and say that you are doing it.', sk: 'Vyber si tento týždeň jednu obyčajnú chvíľu a využi túto chvíľu zámerne: urob to, čo už funguje, a povedz, že to robíš.' },
            ],
        },
        complement: {
            next: [
                { en: 'The difference in {phrase} is worth using before it is worth fixing, so the step that fits is one that lets each side do what it does well.', sk: 'Rozdiel v oblasti „{phrase}“ stojí za to najprv využiť, až potom opravovať, preto sedí krok, ktorý nechá každú stranu robiť to, v čom je dobrá.' },
                { en: 'A difference like the one in {phrase} is easier to live with once it has been named, so a small, specific step is better than a big talk.', sk: 'S rozdielom, ako je ten v oblasti „{phrase}“, sa žije ľahšie, keď je pomenovaný, takže lepší než veľký rozhovor je malý, konkrétny krok.' },
            ],
            ask: [
                { en: 'On {phrase}, what does each side do well that the other would be glad to lean on?', sk: 'Čo v oblasti „{phrase}“ ide každej strane dobre a o čo by sa druhá strana rada oprela?' },
                { en: 'On {phrase}, what would change first if the difference were treated as a division of labour rather than a disagreement?', sk: 'Čo by sa zmenilo ako prvé, keby sa rozdiel v oblasti „{phrase}“ bral ako rozdelenie práce, a nie ako nezhoda?' },
            ],
            step: [
                { en: 'This week, each of you names one thing the other does well here, and one place where you would like to lean on it more.', sk: 'Tento týždeň každý z vás pomenuje jednu vec, ktorú druhá strana robí v tejto oblasti dobre, a jedno miesto, kde by sa o to dalo oprieť viac.' },
                { en: 'Agree one small job where the difference is the point: one of you starts, the other finishes, and neither apologises for working differently.', sk: 'Dohodnite sa na jednej malej úlohe, v ktorej je rozdiel práve to dôležité: jedna strana začne, druhá dokončí a nikto sa neospravedlňuje, že pracuje inak.' },
            ],
        },
        tension: {
            next: [
                { en: 'Since the likeliest snag is in {phrase}, a low-stakes change usually works better than a large conversation, and a calm moment better than the moment it comes up.', sk: 'Keďže sa v oblasti „{phrase}“ najľahšie zadrhne, malá zmena zvyčajne funguje lepšie než veľký rozhovor a pokojná chvíľa lepšie než chvíľa, keď sa to práve objaví.' },
                { en: 'The friction around {phrase} is a pattern, not a verdict, and patterns tend to ease with one small change made on purpose.', sk: 'Trenie v oblasti „{phrase}“ je vzorec, nie rozsudok, a vzorce sa zvyknú uvoľniť jednou malou zmenou urobenou zámerne.' },
            ],
            ask: [
                { en: 'On {phrase}, what matters most for each side to understand?', sk: 'Čo je v oblasti „{phrase}“ pre každú stranu najdôležitejšie, aby druhá strana pochopila?' },
                { en: 'On {phrase}, what would make it a little easier to raise at a calm moment?', sk: 'Čo by uľahčilo hovoriť o oblasti „{phrase}“ v pokojnej chvíli?' },
            ],
            step: [
                { en: 'The next time the old pattern starts, name it lightly (“this is the loop again”), take a five-minute pause, and come back to it once.', sk: 'Keď sa starý vzorec spustí znova, pomenuj to jemne („zase sme v tom kolotoči“), daj si päťminútovú pauzu a vráť sa k tomu raz.' },
                { en: 'Choose one calm moment this week and say what you need, in one sentence, before anything needs deciding.', sk: 'Vyber si tento týždeň jednu pokojnú chvíľu a povedz jednou vetou, čo potrebuješ, skôr než sa čokoľvek rozhoduje.' },
            ],
        },
        asymmetry: {
            next: [
                { en: 'Because one side carries more of the story in {phrase}, the step that fits is one that asks the other what is wanted, not one that assumes it.', sk: 'Keďže jedna strana nesie v oblasti „{phrase}“ viac z príbehu, hodí sa krok, pri ktorom sa druhej strane položí otázka, čo chce, namiesto toho, aby sa to predpokladalo.' },
                { en: 'A lopsided dimension is easy to misread as indifference on one side, so a modest step starts by checking.', sk: 'Jednostranná oblasť sa dá ľahko pokladať za ľahostajnosť jednej strany, preto skromný krok začína otázkou.' },
            ],
            ask: [
                { en: 'On {phrase}, what would each side say they need, if asked plainly?', sk: 'Čo by každý z dvojice povedal, že potrebuje v oblasti „{phrase}“, keby sa niekto spýtal priamo?' },
                { en: 'On {phrase}, where does one lead without the other having really been asked?', sk: 'Kde v oblasti „{phrase}“ vedie jedna strana bez toho, aby sa druhej naozaj niekto spýtal?' },
            ],
            step: [
                { en: 'Once this week, with no plan attached, ask the other: “What would help you from me on this?” and listen to the whole answer.', sk: 'Raz tento týždeň sa spýtaj druhej strany, bez pripraveného plánu: „Čo by ti v tomto pomohlo odo mňa?“ a vypočuj odpoveď až do konca.' },
                { en: 'For a few days, notice where this shows up in an ordinary day, and say what you saw, without proposing a change.', sk: 'Niekoľko dní si všímaj, kde sa to v bežnom dni ukazuje, a povedz, čo si videl, bez návrhu zmeny.' },
            ],
        },
    },
    restraint: [
        { en: 'It is also fair to take no step yet: noticing what happens in this part of life, and what each person wants then, can be a start in itself.', sk: 'Je tiež v poriadku nerobiť zatiaľ nič: všímať si, čo sa v tejto časti života deje a čo si v tej chvíli každý želá, môže byť začiatkom samo o sebe.' },
        { en: 'If now is not the moment, noticing is enough for the time being.', sk: 'Ak teraz nie je ten správny čas, zatiaľ stačí všímať si.' },
    ],
    closing: {
        en: 'With a reading like this, {both} may find words for patterns that already feel familiar, and an easier way into talking about them. It cannot measure love, say whether the relationship will last, or replace what two people learn by paying attention to each other. The suggestions draw on relationship research, mostly from Western couples, which describes many couples and none in particular.',
        sk: 'Pri takomto čítaní {both} možno nájdu slová pre vzorce, ktoré už poznajú, a ľahší vstup do rozhovoru o nich. Samo čítanie však nedokáže zmerať lásku, povedať, či vzťah vydrží, ani nahradiť to, čo sa dvaja ľudia naučia, keď si navzájom venujú pozornosť. Návrhy vychádzajú z výskumu vzťahov, najmä zo západných krajín, ktorý opisuje mnohé páry a žiaden konkrétny.',
    },
};
export default CONTENT;
