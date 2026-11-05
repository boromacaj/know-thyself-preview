/**
 * FAMILY: relationships among family members outside the parenting of minors (siblings, an adult child and a parent, a grandparent and a grandchild, the wider family).
 *
 * The register: respectful of older generations and of how differently families and cultures define what relatives owe each other. Closeness is never scored, distance is
 * never a failure, and nothing here presses towards contact, forgiveness or reconciliation. Research basis: docs/research/connections/corpus-family.json.
 */
const CONTENT = {
    domain: 'family',
    axes: {
        /* ------------------------------------------------------------------ processing-pace -- */
        'inner-focus': {
            label: { en: 'How each takes in a family matter', sk: 'Ako každý spracúva rodinné veci' },
            phrase: { en: 'how each takes in a hard family moment', sk: 'to, ako každý spracúva ťažkú rodinnú chvíľu' },
            title: {
                shared: { en: 'The same pace after a hard visit', sk: 'Rovnaké tempo po ťažkej návšteve' },
                opposed: { en: 'One goes quiet, one picks up the phone', sk: 'Jeden stíchne, druhý hneď volá' },
                oneSided: { en: 'One digests alone, one meets either pace', sk: 'Jeden spracúva v tichu, druhý sa prispôsobí' },
            },
            scale: [{ en: 'Thinks it over first', sk: 'Najprv v tichu' }, { en: 'Talks it out at once', sk: 'Hneď o tom hovorí' }],
            poles: {
                introspective: {
                    one: { en: 'takes a hard family moment away to think, and comes back to it days later', sk: 'si ťažkú rodinnú chvíľu najprv v tichu premyslí a k téme sa vráti až o niekoľko dní' },
                    many: { en: 'take a hard family moment away to think, and come back to it days later', sk: 'si ťažkú rodinnú chvíľu najprv v tichu premyslia a k téme sa vrátia až o niekoľko dní' },
                    gift: { en: 'What arrives after the silence is usually considered, and less likely to reopen an old wound by accident.', sk: 'To, čo príde po tichu, býva premyslené a menej často náhodou otvorí starú ranu.' },
                    cost: { en: 'In a family that settles things at the table, the absence can read as sulking, or as the old habit of walking out.', sk: 'V rodine, ktorá veci rieši hneď pri stole, môže odmlka pôsobiť ako trucovanie alebo ako starý zvyk odísť od problému.' },
                    asks: { en: 'It asks the others to let a topic rest for a while without taking the quiet personally.', sk: 'Žiada od ostatných, aby nechali tému chvíľu ležať a ticho si nebrali osobne.' },
                },
                'outwardly-engaged': {
                    one: { en: 'works a family matter out by talking it through, often on the phone the same evening', sk: 'si rodinnú vec ujasňuje rozhovorom, často ešte v ten večer do telefónu' },
                    many: { en: 'work a family matter out by talking it through, often on the phone the same evening', sk: 'si rodinnú vec ujasňujú rozhovorom, často ešte v ten večer do telefónu' },
                    gift: { en: 'Tension rarely sits unspoken for long, so small hurts get named before hurt can harden into family history.', sk: 'Napätie len zriedka zostáva dlho nevyslovené, takže drobné krivdy zaznejú skôr, než stvrdnú na rodinnú históriu.' },
                    cost: { en: 'The call that comes too soon can feel like being cornered, especially from someone who once had the final word.', sk: 'Telefonát, ktorý príde príliš skoro, môže pôsobiť ako zatlačenie do kúta, najmä ak volá niekto, komu kedysi patrilo posledné slovo.' },
                    asks: { en: 'It asks for an answer within a day or two, even a short one, so that waiting does not turn into worry.', sk: 'Žiada si odpoveď do dňa či dvoch, hoci aj krátku, aby sa čakanie nezmenilo na obavy.' },
                },
            },
            shared: {
                introspective: {
                    gain: { en: '{both} give each other room after a tense lunch or a hard phone call, so little is said that has to be taken back.', sk: '{both} si po napätom obede alebo ťažkom telefonáte nechávajú priestor, takže zaznie len máločo, čo by bolo treba vziať späť.' },
                    risk: { en: 'Two people who both prefer to wait can leave a family matter unspoken for years, each assuming the other likes it that way.', sk: 'Dvaja ľudia, ktorí radšej čakajú, dokážu rodinnú vec nechať nevyslovenú celé roky, pričom každý predpokladá, že druhej strane to tak vyhovuje.' },
                },
                'outwardly-engaged': {
                    gain: { en: '{both} clear the air quickly, so a sharp word at a family dinner is usually talked through the same night.', sk: '{both} rýchlo vyčistia vzduch, takže ostré slovo pri rodinnej večeri sa zvyčajne preberie ešte v ten večer.' },
                    risk: { en: 'When both reach for the conversation at once, a disagreement can grow louder than the issue, and old grievances join in.', sk: 'Keď chce hneď hovoriť každý z dvojice, spor môže prerásť samotnú vec a ozvú sa aj staré krivdy.' },
                },
            },
            opposed: {
                gain: { en: '{p0} brings the considered answer and {p1} the quick one, a useful pairing when a decision about a parent or the family house cannot wait but should not be rushed.', sk: '{p0} prináša premyslenú odpoveď a {p1} tú rýchlu, čo sa hodí, keď rozhodnutie o rodičovi alebo rodinnom dome nemôže čakať, no nemalo by sa ani uponáhľať.' },
                risk: { en: 'The familiar loop: {p1} calls to sort it out, {p0} lets the phone ring to think first, and the silence sounds like the old cold shoulder, so {p1} calls again.', sk: 'Známy kruh: {p1} volá, aby sa to vyriešilo, {p0} nechá telefón zvoniť, lebo si to najprv potrebuje premyslieť, a ticho znie ako staré odmietanie, takže {p1} volá znova.' },
                bridge: { en: 'Most of it eases once {p0} names a day to come back to the topic and {p1} trusts that day enough to wait for it.', sk: 'Väčšina napätia povolí, keď {p0} určí deň, kedy sa k téme vráti, a {p1} tomu dňu dôveruje natoľko, že naň počká.' },
            },
            oneSided: {
                introspective: { note: { en: '{lean} needs time with a family matter and {mid} can take either tempo, so the pause is usually granted without a struggle.', sk: '{lean} potrebuje s rodinnou vecou čas a {mid} sa vie prispôsobiť pomalšiemu aj rýchlejšiemu tempu, takže prestávka zvyčajne prejde bez sporu.' } },
                'outwardly-engaged': { note: { en: '{lean} wants to talk things through soon, and {mid} can usually meet that, as long as there is room to say “not tonight”.', sk: '{lean} chce veci prebrať čoskoro a {mid} na to zvyčajne pristúpi, pokiaľ zostáva priestor povedať „dnes nie“.' } },
            },
            swings: { en: '{who} moves between both habits, so the pace may depend on the topic and on who else is in the room.', sk: '{who} kolíše medzi oboma zvykmi, takže tempo môže závisieť od témy aj od toho, kto ďalší je práve pri tom.' },
        },
        /* ------------------------------------------------------------------ reasoning-style -- */
        reasoning: {
            label: { en: 'How each makes sense of family matters', sk: 'Ako každý chápe rodinné veci' },
            phrase: { en: 'the way each makes sense of a family matter', sk: 'spôsob, akým každý chápe rodinné veci' },
            title: {
                shared: { en: 'Reading the family the same way', sk: 'Rodinu čítajú rovnako' },
                opposed: { en: 'The facts and the feel of it', sk: 'Fakty a tušenie' },
                oneSided: { en: 'One reasons one way, one does both', sk: 'Jeden uvažuje po svojom, druhý zvláda oboje' },
            },
            scale: [{ en: 'Goes by the facts', sk: 'Drží sa faktov' }, { en: 'Goes by the feel', sk: 'Riadi sa tušením' }],
            poles: {
                analytical: {
                    one: { en: 'wants the facts straight first: who said what, what was agreed, what it costs', sk: 'chce mať najprv jasno vo faktoch: kto čo povedal, na čom sa dohodlo a koľko to stojí' },
                    many: { en: 'want the facts straight first: who said what, what was agreed, what it costs', sk: 'chcú mať najprv jasno vo faktoch: kto čo povedal, na čom sa dohodlo a koľko to stojí' },
                    gift: { en: 'Clear facts calm a family argument that would otherwise run on memory and impression, and make arrangements easier to keep.', sk: 'Jasné fakty upokoja rodinný spor, ktorý by inak stál na spomienkach a dojmoch, a dohody sa potom ľahšie dodržiavajú.' },
                    cost: { en: 'Correcting a date while someone is describing an old hurt can sound like arguing the hurt away.', sk: 'Opravovať dátum vo chvíli, keď niekto opisuje starú krivdu, môže vyznieť, akoby sa tá krivda vyvracala.' },
                    asks: { en: 'It asks the others for specifics, and for patience while the checking is done.', sk: 'Žiada od ostatných konkrétnosti a trpezlivosť, kým si ich overí.' },
                },
                intuitive: {
                    one: { en: 'reads a family matter by its mood and its history, often sensing what is meant before it is said', sk: 'číta rodinnú vec podľa nálady a histórie a často vycíti, čo sa myslí, skôr než to zaznie' },
                    many: { en: 'read a family matter by its mood and its history, often sensing what is meant before it is said', sk: 'čítajú rodinnú vec podľa nálady a histórie a často vycítia, čo sa myslí, skôr než to zaznie' },
                    gift: { en: 'This kind of reading catches the undercurrent, the tension behind a polite visit or the worry under a complaint, that a list of facts would miss.', sk: 'Takéto čítanie zachytí spodný prúd, napätie za zdvorilou návštevou či obavu za sťažnosťou, ktoré by zoznam faktov prehliadol.' },
                    cost: { en: 'A strong sense of what is “really” going on is hard to check, and an impression nobody said aloud can quietly become a verdict on a relative.', sk: 'Silný pocit, o čo „naozaj“ ide, sa ťažko overuje a z dojmu, ktorý nikto nevyslovil nahlas, sa ľahko stane rozsudok nad príbuzným.' },
                    asks: { en: 'It asks to be taken seriously as a way of knowing, even when it cannot point to a date or a sentence.', sk: 'Žiada, aby sa bralo vážne ako spôsob poznania, aj keď nevie ukázať na konkrétny dátum či vetu.' },
                },
            },
            shared: {
                analytical: {
                    gain: { en: '{both} can settle practical family business, a care rota, a shared bill, the sale of a flat, with few misunderstandings about what was agreed.', sk: '{both} dokážu vybaviť praktické rodinné záležitosti, rozpis starostlivosti, spoločný účet či predaj bytu, bez veľkých nedorozumení o tom, čo sa vlastne dohodlo.' },
                    risk: { en: 'What neither of them puts on the table is the feeling under the facts, so an arrangement can be correct and still leave someone quietly hurt.', sk: 'Čo však ani jeden nevyloží na stôl, je pocit pod faktami, takže dohoda môže byť správna a niekoho aj tak potichu raniť.' },
                },
                intuitive: {
                    gain: { en: '{both} pick up the unspoken mood of a family gathering quickly, and can often ease the tension before anyone has to name it.', sk: '{both} rýchlo zachytia nevyslovenú náladu rodinného stretnutia a napätie často utlmia skôr, než musí niekto povedať, o čo ide.' },
                    risk: { en: 'Two people who trust their reading of each other can skip the checking, and a guess about what the other meant becomes the family version of events.', sk: 'Dvaja ľudia, ktorí dôverujú svojmu vzájomnému čítaniu, môžu preskočiť overovanie, a dohad o tom, čo druhý človek myslí, sa stane rodinnou verziou udalostí.' },
                },
            },
            opposed: {
                gain: { en: '{p0} keeps the record straight and {p1} keeps track of the mood, and a family conversation that has both tends to be fairer to everyone in it.', sk: '{p0} drží v poriadku fakty a {p1} sleduje náladu, a rodinný rozhovor, ktorý má oboje, býva spravodlivejší ku všetkým zúčastneným.' },
                risk: { en: 'Each can hear the other way of knowing as a dismissal: {p0} asks for evidence of a hurt, {p1} hears doubt, and the talk turns into an argument about whether it happened at all.', sk: 'Každý môže spôsob uvažovania druhej strany počuť ako odmietnutie: {p0} chce pri krivde dôkaz, {p1} v tom počuje pochybnosť a rozhovor sa zmení na spor o to, či sa to vôbec stalo.' },
                bridge: { en: 'It helps to agree which conversation is happening: one about what happened and what to do, one about how it felt, kept apart.', sk: 'Pomáha dohodnúť sa, aký rozhovor práve prebieha: jeden o tom, čo sa stalo a čo urobiť, druhý o tom, ako to bolelo, a každý zvlášť.' },
            },
            oneSided: {
                analytical: { note: { en: '{lean} holds to the facts, and {mid} moves between facts and feel, often translating one into the other in a family conversation.', sk: '{lean} sa drží faktov a {mid} sa pohybuje medzi faktami a tušením a v rodinnom rozhovore často prekladá jedno do druhého.' } },
                intuitive: { note: { en: '{lean} goes by the feel of things and {mid} can meet that or ask for specifics, which keeps a guess from settling into fact.', sk: '{lean} sa riadi tušením a {mid} na to vie pristúpiť alebo sa spýtať na konkrétnosti, takže z dohadu sa tak ľahko nestane fakt.' } },
            },
            swings: { en: '{who} switches between facts and feel, often depending on whether the matter is practical or old and personal.', sk: '{who} prepína medzi faktami a tušením, často podľa toho, či ide o praktickú vec alebo o niečo staré a osobné.' },
        },
        /* --------------------------------------------------------------- closeness-and-room -- */
        autonomy: {
            label: { en: 'Closeness and room', sk: 'Blízkosť a priestor' },
            phrase: { en: 'how much closeness and how much room each wants', sk: 'miera blízkosti a priestoru, ktorú každý potrebuje' },
            title: {
                shared: { en: 'Agreeing on how close', sk: 'Zhoda v tom, ako blízko' },
                opposed: { en: 'One wants room, one wants to be part of it', sk: 'Jeden chce priestor, druhý chce byť pri tom' },
                oneSided: { en: 'One knows how close, one flexes', sk: 'Jeden vie, ako blízko chce byť, druhý sa prispôsobí' },
            },
            scale: [{ en: 'Own decisions, own room', sk: 'Vlastné rozhodnutia, vlastný priestor' }, { en: 'Involved and consulted', sk: 'Zapájať sa a radiť sa' }],
            poles: {
                independent: {
                    one: { en: 'keeps a clear line around personal decisions, and shares news once it is settled rather than while it is being weighed', sk: 'si drží jasnú hranicu okolo vlastných rozhodnutí a novinky oznamuje, až keď sú hotové, nie keď sa ešte zvažujú' },
                    many: { en: 'keep a clear line around their own decisions, and share news once it is settled rather than while it is being weighed', sk: 'si držia jasnú hranicu okolo vlastných rozhodnutí a novinky oznamujú, až keď sú hotové, nie keď sa ešte zvažujú' },
                    gift: { en: 'A clear line lets an adult relationship rest on choice rather than duty, and the time spent together is often freer for it.', sk: 'Jasná hranica umožňuje, aby dospelý vzťah stál na voľbe, nie na povinnosti, a čas strávený spolu býva vďaka tomu slobodnejší.' },
                    cost: { en: 'Hearing about a move or a health scare after the fact can land as being shut out, especially in a family where such news goes first to the closest.', sk: 'Dozvedieť sa o sťahovaní alebo zdravotnom probléme až dodatočne môže pôsobiť ako vylúčenie, najmä v rodine, kde sa také veci hovoria najprv najbližším.' },
                    asks: { en: 'It asks the others to treat a closed door as a boundary, not as a verdict on the relationship.', sk: 'Žiada od ostatných, aby zatvorené dvere brali ako hranicu, nie ako rozsudok nad vzťahom.' },
                },
                collaborative: {
                    one: { en: 'wants to be part of the other person’s life: consulted on decisions, told news early, counted into plans', sk: 'sa chce radiť o rozhodnutiach, dozvedieť sa novinky včas a mať miesto v plánoch druhého človeka' },
                    many: { en: 'want to be part of each other’s lives: consulted on decisions, told news early, counted into plans', sk: 'sa chcú navzájom radiť o rozhodnutiach, dozvedať sa novinky včas a navzájom si držať miesto v plánoch' },
                    gift: { en: 'This kind of closeness means nobody is left alone in a hospital corridor or on moving day, and help often arrives before it is asked for.', sk: 'Takáto blízkosť znamená, že na nemocničnú chodbu ani na sťahovanie nezostáva nikto bez pomoci, a tá často príde ešte pred prosbou.' },
                    cost: { en: 'Help that arrives unasked can feel like being managed, and a question about plans can sound like a request for permission.', sk: 'Nevyžiadaná pomoc môže pôsobiť ako riadenie a otázka na plány môže znieť ako žiadosť o povolenie.' },
                    asks: { en: 'It asks to be included, and to be told plainly where the line is rather than finding it by stepping over it.', sk: 'Žiada si miesto pri veciach a jasne povedanú hranicu, aby sa na hranicu neprichádzalo až tak, že sa prekročí.' },
                },
            },
            shared: {
                independent: {
                    gain: { en: '{both} respect each other’s room without reminders, so contact between them tends to be wanted rather than dutiful.', sk: '{both} si navzájom rešpektujú priestor aj bez pripomínania, takže kontakt býva skôr chcený než povinný.' },
                    risk: { en: 'When neither checks in, a stretch of quiet can become months, and what the other has been carrying may only come out in a crisis.', sk: 'Keď sa ani jeden neozve, z obdobia ticha môžu byť mesiace, a čo nesie druhá strana, často vyjde najavo až pri kríze.' },
                },
                collaborative: {
                    gain: { en: '{both} keep each other close in the ordinary run of things, the calls, the shared errands, the decisions talked over, and that closeness holds in a crisis.', sk: '{both} sa držia blízko aj v obyčajných dňoch, pri telefonátoch, spoločných pochôdzkach a prebraných rozhodnutiach, a táto blízkosť vydrží aj v kríze.' },
                    risk: { en: 'With no one guarding the edges, it gets hard to make a decision or keep something private without the other stepping in.', sk: 'Keď nikto nestráži hranice, ťažko sa robí rozhodnutie alebo drží niečo v súkromí bez toho, aby sa do toho vložila aj druhá strana.' },
                },
            },
            opposed: {
                gain: { en: '{p0} shows that distance can be loyal and {p1} shows that closeness can be practical, so a family can be close without being crowded.', sk: '{p0} ukazuje, že aj odstup môže byť verný, a {p1}, že blízkosť môže byť praktická, takže rodina môže byť blízka bez tlačenice.' },
                risk: { en: 'The usual loop: {p1} reaches in with calls, advice or a visit, {p0} pulls back to protect the line, and each step back makes {p1} reach harder.', sk: 'Typický kruh: {p1} sa približuje telefonátmi, radami či návštevou, {p0} ustupuje a chráni si hranicu, a po každom kroku späť sa {p1} snaží ešte viac.' },
                bridge: { en: 'The turn usually comes when {p0} names what is welcome, not only what is not, and {p1} asks before helping.', sk: 'Zlom zvyčajne príde, keď {p0} povie, čo je vítané, nielen čo nie, a {p1} sa pred pomocou najprv spýta.' },
            },
            oneSided: {
                independent: { note: { en: '{lean} guards a clear line and {mid} can live with it, though big news is still welcome early.', sk: '{lean} si stráži jasnú hranicu a {mid} s tým vie žiť, hoci veľké novinky chce aj tak počuť medzi prvými.' } },
                collaborative: { note: { en: '{lean} wants to be close and involved, and {mid} can usually make room for it, as long as there is space to say “this one is mine”.', sk: '{lean} chce byť blízko a pri veciach a {mid} tomu zvyčajne vie urobiť miesto, pokiaľ zostáva možnosť povedať „toto je moja vec“.' } },
            },
            swings: { en: '{who} wants closeness at some times and room at others, often depending on what is happening in life outside the family.', sk: '{who} raz túži po blízkosti a inokedy po priestore, často podľa toho, čo sa práve deje v živote mimo rodiny.' },
        },
        /* ---------------------------------------------------------- structure-and-flexibility -- */
        structure: {
            label: { en: 'Plans and arrangements', sk: 'Plány a dohody' },
            phrase: { en: 'how each handles plans, visits and family arrangements', sk: 'to, ako každý zvláda plány, návštevy a rodinné dohody' },
            title: {
                shared: { en: 'The same feel for plans', sk: 'Rovnaký vzťah k plánom' },
                opposed: { en: 'The fixed date and the open door', sk: 'Pevný termín a otvorené dvere' },
                oneSided: { en: 'One holds the plan, one goes along', sk: 'Jeden drží plán, druhý sa pridá' },
            },
            scale: [{ en: 'Fixed dates and routines', sk: 'Pevné termíny a zvyky' }, { en: 'Arranged as it comes', sk: 'Ako to príde' }],
            poles: {
                structured: {
                    one: { en: 'likes family life on a known footing: the Sunday call, the set date for the holidays, the visit agreed a week ahead', sk: 'potrebuje mať rodinný život na pevných základoch: nedeľný telefonát, dohodnutý termín sviatkov, návštevu ohlásenú týždeň vopred' },
                    many: { en: 'like family life on a known footing: the Sunday call, the set date for the holidays, the visit agreed a week ahead', sk: 'potrebujú mať rodinný život na pevných základoch: nedeľný telefonát, dohodnutý termín sviatkov, návštevu ohlásenú týždeň vopred' },
                    gift: { en: 'A known rhythm gives relatives something to count on, and keeps contact going through busy years without constant arranging.', sk: 'Známy rytmus dáva príbuzným niečo, na čo sa dá spoľahnúť, a kontakt tak vydrží aj rušné roky bez neustáleho dohadovania.' },
                    cost: { en: 'A plan held too tightly can turn a late arrival or a changed date into a small betrayal.', sk: 'Plán držaný príliš pevne dokáže z neskorého príchodu či zmeneného termínu urobiť malú zradu.' },
                    asks: { en: 'It asks for notice of changes, and for plans to be treated as promises.', sk: 'Žiada si včasné ohlásenie zmien a to, aby sa plány brali ako sľuby.' },
                },
                adaptable: {
                    one: { en: 'prefers to see family as things come: a visit decided on the day, the holidays worked out nearer the time', sk: 'sa radšej s rodinou stretáva podľa toho, ako to príde: návšteva sa rozhodne v ten deň, sviatky sa doriešia až tesne pred nimi' },
                    many: { en: 'prefer to see family as things come: a visit decided on the day, the holidays worked out nearer the time', sk: 'sa radšej s rodinou stretávajú podľa toho, ako to príde: návšteva sa rozhodne v ten deň, sviatky sa doriešia až tesne pred nimi' },
                    gift: { en: 'Flexibility leaves room for the spontaneous visit and copes well when illness, weather or a new baby upends the plan.', sk: 'Pružnosť nechá miesto aj pre spontánnu návštevu a dobre si poradí, keď plán prevráti choroba, počasie alebo nové bábätko.' },
                    cost: { en: 'To a relative who arranges a day around the visit, “let’s see” can sound like being kept on hold.', sk: 'Pre príbuzného, ktorý si podľa návštevy zariaďuje deň, môže „uvidíme“ znieť ako odkladanie na neurčito.' },
                    asks: { en: 'It asks for some slack, in return for a few fixed points that it reliably keeps.', sk: 'Žiada si trochu voľnosti, výmenou za niekoľko pevných bodov, ktoré spoľahlivo dodrží.' },
                },
            },
            shared: {
                structured: {
                    gain: { en: '{both} keep family arrangements easily, and the visits, calls and birthdays tend to happen as promised.', sk: '{both} ľahko dodržiavajú rodinné dohody a návštevy, telefonáty aj narodeniny sa zvyčajne konajú tak, ako sa sľúbilo.' },
                    risk: { en: 'With arrangements fixed on both sides, a change, such as a new partner’s family or a parent who can no longer travel, can feel like a breach rather than a revision.', sk: 'Keď sú dohody pevné z oboch strán, zmena, napríklad rodina nového partnera alebo rodič, ktorý už nevládze cestovať, môže pôsobiť ako porušenie, nie ako úprava.' },
                },
                adaptable: {
                    gain: { en: '{both} meet when it suits and rarely fight about dates, so contact carries little sense of duty.', sk: '{both} sa stretávajú, keď sa to hodí, a o termíny sa takmer nehádajú, takže kontakt nesie len málo pocitu povinnosti.' },
                    risk: { en: 'Without a fixed point, contact can thin out without anyone deciding it should, until a whole year has gone by.', sk: 'Bez pevného bodu môže kontakt rednúť bez toho, aby to niekto rozhodol, až kým neprejde celý rok.' },
                },
            },
            opposed: {
                gain: { en: '{p0} gives the family its fixed points and {p1} keeps room for the unplanned, so a visit can be both reliable and alive.', sk: '{p0} dáva rodine pevné body a {p1} nechá priestor pre nečakané, takže návšteva môže byť spoľahlivá aj živá zároveň.' },
                risk: { en: 'The friction is small and constant: {p0} wants the date settled, {p1} keeps it open, and each sees in the other either rigidity or unreliability.', sk: 'Trenie je drobné, ale stále: {p0} chce mať termín pevne daný, {p1} nechá všetko otvorené a každý v tom druhom vidí buď strnulosť, alebo nespoľahlivosť.' },
                bridge: { en: 'It helps to agree on a few fixed points and leave the rest open: {p0} gets something to count on and {p1} keeps room to move.', sk: 'Pomáha dohodnúť sa na niekoľkých pevných bodoch a zvyšok nechať voľný: {p0} tak má na čo sa spoľahnúť a {p1} si zachová voľnosť.' },
            },
            oneSided: {
                structured: { note: { en: '{lean} holds the dates and {mid} goes along easily, though the family calendar can then rest on one person without anyone choosing that.', sk: '{lean} drží termíny a {mid} sa ľahko pridá, len rodinný kalendár potom často zostane na jednom človeku, aj keď si to nikto nevybral.' } },
                adaptable: { note: { en: '{lean} likes to keep things open and {mid} can work with that, as long as the big occasions still get a date.', sk: '{lean} chce mať veci otvorené a {mid} sa tomu vie prispôsobiť, pokiaľ majú aspoň veľké príležitosti pevný termín.' } },
            },
            swings: { en: '{who} plans tightly at some times and loosely at others, so it is worth asking which mood a particular visit is in.', sk: '{who} raz plánuje presne a inokedy voľne, preto sa oplatí pri konkrétnej návšteve spýtať, ktorý režim práve platí.' },
        },
        /* ------------------------------------------------------------------ risk-and-caution -- */
        risk: {
            label: { en: 'Caution and risk', sk: 'Opatrnosť a riziko' },
            phrase: { en: 'how each weighs risk in life choices', sk: 'to, ako každý váži riziko v životných rozhodnutiach' },
            title: {
                shared: { en: 'The same appetite for risk', sk: 'Rovnaký vzťah k riziku' },
                opposed: { en: 'One worries, one ventures', sk: 'Jeden sa obáva, druhý riskuje' },
                oneSided: { en: 'One has a clear stance on risk', sk: 'Jeden má k riziku jasný postoj' },
            },
            scale: [{ en: 'Plays it safe', sk: 'Hrá na istotu' }, { en: 'Takes the chance', sk: 'Skúsi to' }],
            poles: {
                cautious: {
                    one: { en: 'weighs what could go wrong before a move, a loan or a change of job, and voices the worry early', sk: 'pred sťahovaním, pôžičkou alebo zmenou práce zvažuje, čo sa môže pokaziť, a obavu povie nahlas včas' },
                    many: { en: 'weigh what could go wrong before a move, a loan or a change of job, and voice the worry early', sk: 'pred sťahovaním, pôžičkou alebo zmenou práce zvažujú, čo sa môže pokaziť, a obavu povedia nahlas včas' },
                    gift: { en: 'A worry raised early can spare a family a debt, a hasty sale or a move nobody had thought through.', sk: 'Obava vyslovená včas dokáže rodine ušetriť dlh, unáhlený predaj alebo sťahovanie, ktoré nikto poriadne nepremyslel.' },
                    cost: { en: 'Between adults, a worry repeated often enough starts to sound like a vote of no confidence.', sk: 'Medzi dospelými začne obava opakovaná dosť často znieť ako vyslovenie nedôvery.' },
                    asks: { en: 'It asks to be heard once, fully, without being brushed aside as fussing.', sk: 'Žiada si jedno poriadne vypočutie, bez odbitia ako zbytočného strachovania.' },
                },
                'risk-oriented': {
                    one: { en: 'takes the chance when a choice feels right, whether it is a new country, a business or a late change of course', sk: 'sa pustí do rizika, keď rozhodnutie pôsobí správne, či už ide o novú krajinu, podnikanie alebo neskorú zmenu smeru' },
                    many: { en: 'take the chance when a choice feels right, whether it is a new country, a business or a late change of course', sk: 'sa pustia do rizika, keď rozhodnutie pôsobí správne, či už ide o novú krajinu, podnikanie alebo neskorú zmenu smeru' },
                    gift: { en: 'A willingness to risk brings new chances into a family, and shows the others what is possible.', sk: 'Ochota riskovať prináša do rodiny nové možnosti a ukazuje ostatným, čo všetko sa dá.' },
                    cost: { en: 'When the fallout lands on other relatives too, the risk can feel like a choice made on the family’s behalf without asking.', sk: 'Keď dôsledky dopadnú aj na ďalších príbuzných, riziko môže pôsobiť ako rozhodnutie urobené aj za nich, bez opýtania.' },
                    asks: { en: 'It asks to be trusted with an adult’s own choices, and to hear the worry rather than the verdict.', sk: 'Žiada si dôveru v rozhodnutia dospelého človeka a to, aby zaznela obava, nie rozsudok.' },
                },
            },
            shared: {
                cautious: {
                    gain: { en: '{both} take family decisions slowly and carefully, which protects shared money, a shared house and the people who depend on them.', sk: '{both} robia rodinné rozhodnutia pomaly a opatrne, čo chráni spoločné peniaze, spoločný dom aj ľudí, ktorí sú na nich závislí.' },
                    risk: { en: 'Two careful people can talk each other out of a good chance, or keep an older relative safer than that relative wants to be kept.', sk: 'Dvaja opatrní ľudia si môžu navzájom vyhovoriť dobrú príležitosť alebo chrániť staršieho príbuzného viac, než si to ten príbuzný želá.' },
                },
                'risk-oriented': {
                    gain: { en: '{both} back each other’s leaps, and in a family that can decide whether a plan stays a dream or is actually tried.', sk: '{both} si navzájom držia chrbát pri odvážnych krokoch, a v rodine to môže rozhodnúť, či plán zostane snom, alebo sa naozaj vyskúša.' },
                    risk: { en: 'With no one asking what could go wrong, a joint loan or venture between relatives can carry more risk than either would accept from a stranger.', sk: 'Keď sa nikto nepýta, čo sa môže pokaziť, spoločná pôžička alebo podnik medzi príbuznými môže niesť väčšie riziko, než by ktokoľvek z nich prijal od cudzieho človeka.' },
                },
            },
            opposed: {
                gain: { en: '{p0} sees the pitfalls and {p1} sees the opening, and a family decision that weighs both views is usually better than either alone.', sk: '{p0} vidí úskalia a {p1} príležitosť, a rodinné rozhodnutie, ktoré zváži oba pohľady, býva lepšie než ktorýkoľvek z nich osve.' },
                risk: { en: 'Between adult relatives the worry can turn into supervision: {p0} keeps raising the danger, {p1} stops sharing plans, and the next thing {p0} hears is a decision already made.', sk: 'Medzi dospelými príbuznými sa obava ľahko zmení na dozor: {p0} stále pripomína nebezpečenstvo, {p1} prestane hovoriť o plánoch a {p0} sa ďalej dozvie už len hotové rozhodnutie.' },
                bridge: { en: 'It goes better when {p0} says the worry once, clearly, and {p1} takes it as care rather than control, while the decision stays with whoever it belongs to.', sk: 'Lepšie to ide, keď {p0} povie obavu raz a jasne, {p1} to berie ako starosť, nie ako kontrolu, a rozhodnutie zostáva tomu, komu patrí.' },
            },
            oneSided: {
                cautious: { note: { en: '{lean} weighs the risks and {mid} sees more than one side, and can often pass a worry on without it becoming a fight.', sk: '{lean} váži riziká a {mid} vidí veci z viacerých strán a obavu často dokáže tlmočiť tak, že z toho nevznikne spor.' } },
                'risk-oriented': { note: { en: '{lean} is ready to take chances and {mid} can live with that, although it helps when {lean} shares a plan before it is fixed.', sk: '{lean} sa nebojí riskovať a {mid} s tým vie žiť, aj keď pomáha, keď {lean} povie o pláne skôr, než je hotový.' } },
            },
            swings: { en: '{who} hesitates over some things and takes risks with others, often treating money differently from life choices.', sk: '{who} pri niektorých veciach váha a pri iných riskuje, často pri peniazoch inak než pri životných rozhodnutiach.' },
        },
        /* -------------------------------------------------------------- emotional-expression -- */
        'emotional-expression': {
            label: { en: 'How feeling and love are shown', sk: 'Ako sa ukazujú city a láska' },
            phrase: { en: 'how each shows feeling and love', sk: 'to, ako každý prejavuje city a lásku' },
            title: {
                shared: { en: 'Love shown the same way', sk: 'Láska prejavená rovnako' },
                opposed: { en: 'Said aloud, or shown by doing', sk: 'Povedané nahlas, alebo ukázané skutkom' },
                oneSided: { en: 'One clear way of showing it', sk: 'Jeden jasný spôsob prejavu' },
            },
            scale: [{ en: 'Says it out loud', sk: 'Povie to nahlas' }, { en: 'Shows it by doing', sk: 'Ukáže to skutkom' }],
            poles: {
                'emotionally-expressive': {
                    one: { en: 'shows feeling openly: says it on the phone, hugs at the door', sk: 'prejavuje city otvorene: povie to do telefónu, objíme vo dverách' },
                    many: { en: 'show feeling openly: say it on the phone, hug at the door', sk: 'prejavujú city otvorene: povedia to do telefónu, objímu sa vo dverách' },
                    gift: { en: 'Feeling spoken aloud leaves little doubt about where things stand, and lets grief and pride be shared while the feeling is fresh.', sk: 'Nahlas vyslovený cit nenecháva veľa pochybností o tom, ako sa veci majú, a smútok aj hrdosť sa dajú zdieľať, kým sú čerstvé.' },
                    cost: { en: 'To a relative raised to keep feelings private, a lot of feeling at once can feel like pressure to answer in kind.', sk: 'Pre príbuzného, ktorého doma učili nechávať city pre seba, môže veľa citu naraz pôsobiť ako tlak odpovedať rovnako.' },
                    asks: { en: 'It asks for some answer in words now and then, and does not need it to be long.', sk: 'Žiada si občas odpoveď aj slovami, a nemusí byť dlhá.' },
                },
                'emotionally-contained': {
                    one: { en: 'shows love by doing: the fixed tap, the cooked meal, the lift to the hospital, more than by saying it', sk: 'prejavuje lásku skutkami, opraveným kohútikom, uvarenou večerou či odvozom do nemocnice, viac než slovami' },
                    many: { en: 'show love by doing: the fixed tap, the cooked meal, the lift to the hospital, more than by saying it', sk: 'prejavujú lásku skutkami, opraveným kohútikom, uvarenou večerou či odvozom do nemocnice, viac než slovami' },
                    gift: { en: 'Care shown in deeds is steady and dependable, and it often keeps arriving long after words would have run out.', sk: 'Starostlivosť ukázaná skutkami je stála a spoľahlivá a často prichádza ešte dlho potom, čo by slová došli.' },
                    cost: { en: 'When the feeling stays unspoken, a relative can wait years for a sentence the deeds were already saying.', sk: 'Keď cit zostáva nevyslovený, príbuzný môže roky čakať na vetu, ktorú skutky dávno hovorili.' },
                    asks: { en: 'It asks for the deed to be read as the message, and for patience with words that come slowly.', sk: 'Žiada, aby sa skutok čítal ako odkaz, a trpezlivosť so slovami, ktoré prichádzajú pomaly.' },
                },
            },
            shared: {
                'emotionally-expressive': {
                    gain: { en: '{both} say what they feel, so love, worry and apology rarely go unspoken between them.', sk: '{both} hovoria, čo cítia, takže láska, obava ani ospravedlnenie medzi nimi zriedka zostanú nevyslovené.' },
                    risk: { en: 'Two strong voices can raise the temperature of a family argument fast, and a hurt said in the heat of it can be remembered for years.', sk: 'Dva silné hlasy dokážu rodinný spor rýchlo rozpáliť a krivda vyslovená v zápale sporu sa potom pamätá celé roky.' },
                },
                'emotionally-contained': {
                    gain: { en: '{both} understand care shown in deeds, and recognise the other’s affection without a speech.', sk: '{both} rozumejú starostlivosti ukázanej skutkami a záujem druhého človeka spoznajú aj bez veľkých slov.' },
                    risk: { en: 'What neither says can stay unsaid for good, including the thanks, the apology or the goodbye that keeps waiting for the right moment.', sk: 'Čo nepovie ani jeden, môže zostať nevyslovené natrvalo, vrátane poďakovania, ospravedlnenia alebo rozlúčky, na ktoré sa stále čaká vhodná chvíľa.' },
                },
            },
            opposed: {
                gain: { en: '{p0} gives the family its words and {p1} its dependable deeds, and a relative who learns to read both has two kinds of love to count on.', sk: '{p0} dáva rodine slová a {p1} spoľahlivé skutky, a kto sa naučí čítať oboje, môže sa spoľahnúť na dva druhy lásky.' },
                risk: { en: 'The misreading runs both ways: {p0} waits for the words and hears coolness, {p1} offers the deed and finds it overlooked, and each senses less love than is really there.', sk: 'Nedorozumenie ide oboma smermi: {p0} čaká na slová a počuje chlad, {p1} ponúka skutky a zisťuje, že ich nikto nevidí, a každý má pocit, že lásky je medzi nimi menej, než v skutočnosti je.' },
                bridge: { en: 'It shifts when {p1} adds one sentence to the deed, such as “I did it because I worry about you”, and {p0} names the deed as love when it comes.', sk: 'Zmena príde, keď {p1} k skutku pridá jednu vetu, napríklad „robím to, lebo sa o teba bojím“, a {p0} skutok pomenuje ako lásku, keď príde.' },
            },
            oneSided: {
                'emotionally-expressive': { note: { en: '{lean} says the feeling aloud and {mid} can answer in words or in deeds, so the feeling rarely goes unanswered.', sk: '{lean} vysloví cit nahlas a {mid} vie odpovedať slovom aj skutkom, takže cit zriedka zostane bez odozvy.' } },
                'emotionally-contained': { note: { en: '{lean} shows care by doing and {mid} reads it easily, though a word alongside the deed is sometimes welcome too.', sk: '{lean} ukazuje starostlivosť skutkami a {mid} tomu ľahko rozumie, hoci občas stojí aj o slovo popri skutku.' } },
            },
            swings: { en: '{who} is open with feeling in some company and guarded in other company, often depending on who in the family is listening.', sk: '{who} prejavuje city v niektorej spoločnosti otvorene a v inej zdržanlivo, často podľa toho, kto z rodiny práve počúva.' },
        },
        /* --------------------------------------------------------------------- social-energy -- */
        visibility: {
            label: { en: 'Family gatherings and privacy', sk: 'Rodinné stretnutia a súkromie' },
            phrase: { en: 'how each takes to gatherings and to sharing family news', sk: 'vzťah každého k rodinným stretnutiam a zdieľaniu noviniek' },
            title: {
                shared: { en: 'The same size of table', sk: 'Rovnako veľký stôl' },
                opposed: { en: 'The full table and the quiet visit', sk: 'Plný stôl a tichá návšteva' },
                oneSided: { en: 'One clear preference, one who fits in', sk: 'Jeden má jasnú preferenciu, druhý sa prispôsobí' },
            },
            scale: [{ en: 'Small and private', sk: 'V malom a v súkromí' }, { en: 'Big and shared', sk: 'Vo veľkom a spoločne' }],
            poles: {
                private: {
                    one: { en: 'prefers family in small doses: one relative at a time, news kept within the household', sk: 'má radšej rodinu v menších dávkach: jedného príbuzného naraz a novinky v rámci domácnosti' },
                    many: { en: 'prefer family in small doses: one relative at a time, news kept within the household', sk: 'majú radšej rodinu v menších dávkach: jedného príbuzného naraz a novinky v rámci domácnosti' },
                    gift: { en: 'A private style protects confidences, and makes the one-to-one visit unhurried and honest.', sk: 'Súkromný štýl chráni dôverné veci a stretnutia medzi štyrmi očami bývajú pokojné a úprimné.' },
                    cost: { en: 'Skipping the big gatherings can be read as coldness toward the wider family, and news shared late can feel like being kept out.', sk: 'Vynechávanie veľkých stretnutí si široká rodina môže vyložiť ako chlad a neskoro povedané novinky ako vylúčenie.' },
                    asks: { en: 'It asks for the right to come for the meal and leave before evening, and for news to travel only with permission.', sk: 'Žiada si právo prísť na obed a odísť pred večerom a to, aby sa novinky šírili ďalej len so súhlasom.' },
                },
                social: {
                    one: { en: 'comes alive at the full table: cousins, aunts and neighbours, news passed round, everyone in the know', sk: 'je vo svojom živle pri plnom stole, medzi bratrancami, tetami a susedmi, keď novinky kolujú a každý o všetkom vie' },
                    many: { en: 'come alive at the full table: cousins, aunts and neighbours, news passed round, everyone in the know', sk: 'sú vo svojom živle pri plnom stole, medzi bratrancami, tetami a susedmi, keď novinky kolujú a každý o všetkom vie' },
                    gift: { en: 'This keeps a wide family knitted together, and often means the cousins still know each other a generation on.', sk: 'Takto drží široká rodina pokope a často to znamená, že sa bratranci a sesternice poznajú aj o generáciu neskôr.' },
                    cost: { en: 'News passed round too freely can leave a relative feeling exposed, as if a private matter had become the family’s property.', sk: 'Novinky šírené príliš voľne môžu v príbuznom vyvolať pocit, že súkromná vec sa stala majetkom celej rodiny.' },
                    asks: { en: 'It asks for presence at the occasions that matter, and for gatherings not to be treated as optional extras.', sk: 'Žiada si účasť na príležitostiach, na ktorých záleží, a to, aby sa stretnutia nebrali ako nepovinný doplnok.' },
                },
            },
            shared: {
                private: {
                    gain: { en: '{both} keep family matters close and meet in small settings, so what is said between them tends to stay there.', sk: '{both} si rodinné veci nechávajú pre seba a stretávajú sa v malom, takže čo zaznie medzi nimi, zvyčajne tam aj zostane.' },
                    risk: { en: 'Two private people can drift from the wider family together, and find at the next funeral that the cousins have become strangers.', sk: 'Dvaja uzavretejší ľudia sa môžu spolu vzdialiť od širšej rodiny a na ďalšom pohrebe zistia, že z bratrancov sa stali cudzí ľudia.' },
                },
                social: {
                    gain: { en: '{both} keep the wider family in view, the birthdays, the reunions, the group chat, and draw others in rather than leaving them out.', sk: '{both} majú širokú rodinu stále na očiach, narodeniny, stretávky aj rodinný chat, a ďalších skôr vťahujú, než by ich vynechávali.' },
                    risk: { en: 'With so much shared, there may be no place for a matter that belongs to two people only, and a confidence can travel the family by evening.', sk: 'Pri toľkom zdieľaní nemusí zostať miesto pre vec, ktorá patrí len dvom ľuďom, a dôverná správa môže do večera obehnúť celú rodinu.' },
                },
            },
            opposed: {
                gain: { en: '{p1} keeps the wider family close and {p0} protects what needs protecting, so the family keeps both its gatherings and its confidences.', sk: '{p1} drží širokú rodinu pokope a {p0} chráni to, čo ochranu potrebuje, takže rodina má svoje stretnutia aj svoje dôverné veci.' },
                risk: { en: 'The clash usually comes over occasions and news: {p1} wants everyone at the table and the news shared, {p0} wants the small visit and the matter kept close, and each feels the other is asking too much.', sk: 'Stret zvyčajne príde pri oslavách a novinkách: {p1} chce mať pri stole všetkých a novinku hneď zdieľať, {p0} chce menšiu návštevu a vec nechať v úzkom kruhu, a každá strana má pocit, že druhá žiada priveľa.' },
                bridge: { en: 'It eases when {p0} comes to the occasions that matter most, on agreed terms, and {p1} asks before passing news on.', sk: 'Uľaví sa, keď {p0} príde na tie najdôležitejšie príležitosti za dohodnutých podmienok a {p1} sa pred šírením noviniek najprv spýta.' },
            },
            oneSided: {
                private: { note: { en: '{lean} keeps things small and private and {mid} is at ease either way, often carrying news to the wider family with care.', sk: '{lean} uprednostňuje malé a súkromné stretnutia a {mid} zvládne oboje a novinky do širšej rodiny často nosí s ohľadom.' } },
                social: { note: { en: '{lean} thrives at the full table and {mid} can join in or step back, so gatherings usually happen without a tug-of-war.', sk: '{lean} ožíva pri plnom stole a {mid} sa vie pridať aj stiahnuť, takže stretnutia sa zvyčajne zaobídu bez preťahovania.' } },
            },
            swings: { en: '{who} wants the full table in some years and solitude in others, often tracking what else life is asking at the time.', sk: '{who} raz túži po plnom stole a inokedy po samote, často podľa toho, čo si práve žiada zvyšok života.' },
        },
        /* ------------------------------------------------------------- change-and-steadiness -- */
        change: {
            label: { en: 'Tradition and change', sk: 'Tradícia a zmena' },
            phrase: { en: 'how each holds tradition and meets change', sk: 'to, ako každý drží tradície a prijíma zmeny' },
            title: {
                shared: { en: 'The same pace of change', sk: 'Rovnaké tempo zmien' },
                opposed: { en: 'The way it was, the way it could be', sk: 'Ako to bolo a ako by to mohlo byť' },
                oneSided: { en: 'One has a clear pull, one adapts', sk: 'Jeden má jasný smer, druhý sa prispôsobí' },
            },
            scale: [{ en: 'Keeps things as they are', sk: 'Drží zavedené' }, { en: 'Tries the new', sk: 'Skúša nové' }],
            poles: {
                'stability-seeking': {
                    one: { en: 'holds on to the way family life has gone: the same Christmas, the same house, the same order of things', sk: 'sa drží toho, ako rodinný život doteraz plynul: rovnaké Vianoce, rovnaký dom, rovnaký poriadok vecí' },
                    many: { en: 'hold on to the way family life has gone: the same Christmas, the same house, the same order of things', sk: 'sa držia toho, ako rodinný život doteraz plynul: rovnaké Vianoce, rovnaký dom, rovnaký poriadok vecí' },
                    gift: { en: 'Steadiness gives a family its continuity: the recipe, the place at the table, the story each new generation inherits.', sk: 'Stálosť dáva rodine kontinuitu: recept, miesto pri stole a príbeh, ktorý zdedí každá ďalšia generácia.' },
                    cost: { en: 'When life moves on, through a divorce, a new partner or a move abroad, holding on can look like refusing to accept the people who are changing.', sk: 'Keď sa život pohne, rozvodom, novým partnerom či odchodom do zahraničia, lpenie na starom môže pôsobiť ako neochota prijať ľudí, ktorí sa menia.' },
                    asks: { en: 'It asks for change to be announced early, and for something familiar to be carried through it.', sk: 'Žiada, aby sa zmeny ohlasovali včas a aby cez ne prešlo aj niečo známe.' },
                },
                'novelty-seeking': {
                    one: { en: 'looks for new ways of doing family: a different holiday, a move, a life unlike the one at home', sk: 'hľadá nové podoby rodinného života: iné sviatky, sťahovanie, život, ktorý sa nepodobá tomu z domova' },
                    many: { en: 'look for new ways of doing family: a different holiday, a move, a life unlike the one at home', sk: 'hľadajú nové podoby rodinného života: iné sviatky, sťahovanie, život, ktorý sa nepodobá tomu z domova' },
                    gift: { en: 'An appetite for the new keeps a family from hardening, and often brings in people and customs that later become its own.', sk: 'Chuť skúšať nové nedovolí rodine skostnatieť a často privedie do rodiny ľudí a zvyky, ktoré časom zdomácnejú.' },
                    cost: { en: 'To a relative whose whole life was built on the old ways, each change can sound like a judgment on that life.', sk: 'Pre príbuzného, ktorého celý život stojí na zavedených zvykoch, môže každá zmena znieť ako súd nad týmto životom.' },
                    asks: { en: 'It asks for a new choice to be met with curiosity before it is met with worry.', sk: 'Žiada, aby sa nové rozhodnutie najprv stretlo so zvedavosťou, až potom s obavou.' },
                },
            },
            shared: {
                'stability-seeking': {
                    gain: { en: '{both} keep the family’s customs alive together, and the familiar shape of a holiday or a Sunday carries them through hard years.', sk: '{both} spolu udržiavajú rodinné zvyky a známy tvar sviatkov či nedieľ ich podrží aj v ťažkých rokoch.' },
                    risk: { en: 'When change comes from outside, an illness, a death, a grandchild’s new life, two people who both hold on may struggle to find a new way together.', sk: 'Keď zmena príde zvonka, choroba, úmrtie alebo nový život vnúčaťa, dvaja ľudia, ktorí sa držia starého, spolu ťažšie hľadajú nový spôsob.' },
                },
                'novelty-seeking': {
                    gain: { en: '{both} welcome change in each other’s lives, the move, the new partner, the new way of marking a holiday, and rarely hold each other to the past.', sk: '{both} vítajú zmeny v živote druhého človeka, sťahovanie, nového partnera či nový spôsob sviatkov, a len zriedka sa navzájom viažu k minulosti.' },
                    risk: { en: 'With nobody keeping the old customs, a family can lose its rituals without deciding to, and miss them only later.', sk: 'Keď staré zvyky nikto nedrží, rodina môže o svoje rituály prísť nenápadne a chýbať začnú až neskôr.' },
                },
            },
            opposed: {
                gain: { en: '{p0} keeps the thread to where the family came from and {p1} opens a door to where it is going, and a family needs both.', sk: '{p0} drží niť k tomu, odkiaľ rodina pochádza, a {p1} otvára dvere tomu, kam smeruje, a rodina potrebuje oboje.' },
                risk: { en: 'Every change becomes a test: {p1} brings the new plan, {p0} hears a rejection of the family, and {p1} hears in the worry a doubt about the life {p1} has chosen.', sk: 'Každá zmena sa stane skúškou: {p1} prinesie nový plán, {p0} to počuje ako odmietnutie rodiny a {p1} zas v obave počuje pochybnosť o zvolenom spôsobe života.' },
                bridge: { en: 'It usually helps when {p1} tells the news early and in person, and {p0} says what would be hard to lose rather than arguing the choice.', sk: 'Zvyčajne pomôže, keď {p1} povie novinku včas a osobne a {p0} namiesto spochybňovania rozhodnutia povie, o čo by bolo ťažké prísť.' },
            },
            oneSided: {
                'stability-seeking': { note: { en: '{lean} holds to the familiar and {mid} can bend either way, which often helps a change land gently.', sk: '{lean} sa drží známeho a {mid} sa vie prispôsobiť, takže zmena často dopadne mäkšie.' } },
                'novelty-seeking': { note: { en: '{lean} is drawn to change and {mid} can follow without much strain, as long as some familiar things come along too.', sk: '{lean} hľadá zmenu a {mid} sa vie pridať bez veľkého napätia, pokiaľ sa so zmenou prenesie aj niečo známe.' } },
            },
            swings: { en: '{who} embraces change in some parts of life and resists it in others, often treating family customs differently from everything else.', sk: '{who} v niektorých oblastiach zmeny víta a v iných sa im bráni, pričom rodinné zvyky často berie inak než všetko ostatné.' },
        },
        /* ------------------------------------------------------------------- taking-the-lead -- */
        initiative: {
            label: { en: 'Who takes the lead', sk: 'Kto preberá vedenie' },
            phrase: { en: 'who takes the lead and who goes along', sk: 'to, kto preberá vedenie a kto sa pridáva' },
            title: {
                shared: { en: 'The same place in the family order', sk: 'Rovnaké miesto v rodinnom poradí' },
                opposed: { en: 'The one who decides, the one who goes along', sk: 'Ten, kto rozhoduje, a ten, kto sa pridá' },
                oneSided: { en: 'One with a settled role, one in between', sk: 'Jeden s ustálenou rolou, druhý medzi rolami' },
            },
            scale: [{ en: 'Takes charge', sk: 'Preberá vedenie' }, { en: 'Lets others lead', sk: 'Nechá viesť iných' }],
            poles: {
                assertive: {
                    one: { en: 'takes charge in family matters: books the restaurant, calls the doctor, says what should happen next', sk: 'preberá vedenie v rodinných veciach: rezervuje reštauráciu, volá lekárovi, povie, čo by sa malo stať ďalej' },
                    many: { en: 'take charge in family matters: book the restaurant, call the doctor, say what should happen next', sk: 'preberajú vedenie v rodinných veciach: rezervujú reštauráciu, volajú lekárovi, povedia, čo by sa malo stať ďalej' },
                    gift: { en: 'A readiness to step forward gets the hard things done, the care plan, the funeral, the difficult call, while others are still frozen.', sk: 'Ochota vystúpiť dopredu dotiahne aj ťažké veci, plán starostlivosti, pohreb či náročný telefonát, kým ostatní ešte stoja ako obarení.' },
                    cost: { en: 'A role taken early in childhood can harden into deciding for everyone, and relatives stop offering a view because it is settled anyway.', sk: 'Rola prevzatá už v detstve môže stvrdnúť na rozhodovanie za všetkých a príbuzní prestanú ponúkať vlastný názor, lebo je aj tak rozhodnuté.' },
                    asks: { en: 'It asks for decisions not to be left hanging, and for the effort behind decisions to be noticed.', sk: 'Žiada, aby rozhodnutia nezostávali visieť a aby si niekto všimol námahu, ktorá je za nimi.' },
                },
                receptive: {
                    one: { en: 'tends to let others set the course in family matters, and goes along unless something really matters', sk: 'v rodinných veciach zvyčajne nechá smer na iných a pridá sa, pokiaľ nejde o niečo naozaj dôležité' },
                    many: { en: 'tend to let others set the course in family matters, and go along unless something really matters', sk: 'v rodinných veciach zvyčajne nechajú smer na iných a pridajú sa, pokiaľ nejde o niečo naozaj dôležité' },
                    gift: { en: 'An easy readiness to go along keeps family occasions from becoming contests, and makes room for others to lead.', sk: 'Ľahká ochota pridať sa bráni tomu, aby sa z rodinných udalostí stali súťaže, a dáva priestor viesť aj iným.' },
                    cost: { en: 'A view kept back too long can surface years later as resentment about decisions nobody objected to at the time.', sk: 'Názor zadržiavaný príliš dlho sa môže po rokoch vynoriť ako zatrpknutosť nad rozhodnutiami, proti ktorým vtedy nezaznela ani jedna námietka.' },
                    asks: { en: 'It asks to be asked, directly, before the decision is made.', sk: 'Žiada si priamu otázku ešte predtým, než sa rozhodne.' },
                },
            },
            shared: {
                assertive: {
                    gain: { en: '{both} get things moving, so a crisis rarely finds the family without a plan.', sk: '{both} veci rozhýbu, takže kríza rodinu zriedka zastihne bez plánu.' },
                    risk: { en: 'With two people used to deciding, every family matter can become a question of whose call it is, and an old contest from childhood can run on under the logistics.', sk: 'Keď sú v rozhodovaní doma dvaja, každá rodinná vec sa môže zmeniť na otázku, kto má posledné slovo, a pod logistikou môže pokračovať stará súťaž z detstva.' },
                },
                receptive: {
                    gain: { en: '{both} give way easily, so family occasions stay calm and nobody has to win.', sk: '{both} ľahko ustúpia, takže rodinné udalosti zostávajú pokojné a nikto nemusí vyhrať.' },
                    risk: { en: 'When neither steps forward, the hard decisions about a parent’s care, an inheritance or a house can wait until circumstances make them instead.', sk: 'Keď nevystúpi dopredu ani jeden, ťažké rozhodnutia o starostlivosti o rodiča, dedičstve či dome môžu čakať, kým ich za nich neurobia okolnosti.' },
                },
            },
            opposed: {
                gain: { en: '{p0} moves things forward and {p1} keeps the peace, which can serve a family well when those parts are chosen rather than inherited.', sk: '{p0} posúva veci dopredu a {p1} udržiava pokoj, čo rodine môže dobre slúžiť, ak sú tieto úlohy voľbou, nie dedičstvom.' },
                risk: { en: 'The pattern can set early and stay: {p0} decides, {p1} goes along, and the longer it runs, the likelier it is that {p1} has no say while {p0} carries everything.', sk: 'Vzorec sa môže ustáliť zavčasu a vydržať: {p0} rozhoduje, {p1} sa pridá, a čím dlhšie to trvá, tým ľahšie sa stane, že {p1} nemá slovo a {p0} nesie všetko.' },
                bridge: { en: 'The old roles loosen when {p0} asks before deciding and {p1} offers a view before it is settled, even a small one.', sk: 'Staré roly povolia, keď sa {p0} pred rozhodnutím spýta a {p1} povie svoj názor skôr, než je rozhodnuté, hoci aj malý.' },
            },
            oneSided: {
                assertive: { note: { en: '{lean} tends to take the lead and {mid} can follow or step up, so the lead can move when {lean} is tired or away.', sk: '{lean} zvyčajne preberá vedenie a {mid} vie nasledovať aj vystúpiť dopredu, takže vedenie sa môže presunúť, keď {lean} nevládze alebo je preč.' } },
                receptive: { note: { en: '{lean} tends to let others lead and {mid} can take charge when needed, though {lean} still deserves to be asked.', sk: '{lean} zvyčajne nechá viesť iných a {mid} vie v prípade potreby prevziať vedenie, aj keď {lean} si stále zaslúži otázku.' } },
            },
            swings: { en: '{who} takes charge in some family matters and steps back in others, often by old habit rather than by choice.', sk: '{who} v niektorých rodinných veciach preberá vedenie a v iných ustupuje, často skôr zo starého zvyku než z voľby.' },
        },
        /* ---------------------------------------------------------- practical-and-conceptual -- */
        abstraction: {
            label: { en: 'Practical help and talk about meaning', sk: 'Praktická pomoc a rozhovor o zmysle' },
            phrase: { en: 'whether each meets family through practical help or through talk', sk: 'to, či každý prichádza k rodine cez praktickú pomoc, alebo cez rozhovor' },
            title: {
                shared: { en: 'Meeting on the same ground', sk: 'Stretnutie na rovnakej pôde' },
                opposed: { en: 'The fixed shelf and the long conversation', sk: 'Opravená polica a dlhý rozhovor' },
                oneSided: { en: 'One clear way in, one flexible', sk: 'Jeden jasný prístup, druhý pružný' },
            },
            scale: [{ en: 'Hands-on help', sk: 'Praktická pomoc' }, { en: 'Ideas and meaning', sk: 'Myšlienky a zmysel' }],
            poles: {
                practical: {
                    one: { en: 'meets family through practical things: what needs doing, what it costs, who will drive', sk: 'k rodine pristupuje cez praktické veci: čo treba urobiť, koľko to stojí a kto bude šoférovať' },
                    many: { en: 'meet family through practical things: what needs doing, what it costs, who will drive', sk: 'k rodine pristupujú cez praktické veci: čo treba urobiť, koľko to stojí a kto bude šoférovať' },
                    gift: { en: 'Practical attention gets the gutters cleared, the forms filled in and the parent to the appointment on time.', sk: 'Praktická pozornosť zariadi vyčistené odkvapy, vyplnené tlačivá aj to, že rodič príde k lekárovi načas.' },
                    cost: { en: 'Moving straight to the fix can leave the bigger question, what this change means for the family, unasked.', sk: 'Skok rovno k riešeniu môže nechať väčšiu otázku nevyslovenú: čo táto zmena pre rodinu znamená.' },
                    asks: { en: 'It asks for talk to lead somewhere concrete, and for practical help to count as care.', sk: 'Žiada, aby rozhovor viedol ku konkrétnemu kroku a aby sa praktická pomoc rátala ako starostlivosť.' },
                },
                conceptual: {
                    one: { en: 'meets family through ideas and meaning: the family story, what a choice says about values, where things are heading', sk: 'k rodine pristupuje cez myšlienky a zmysel: rodinný príbeh, čo rozhodnutie hovorí o hodnotách, kam veci smerujú' },
                    many: { en: 'meet family through ideas and meaning: the family story, what a choice says about values, where things are heading', sk: 'k rodine pristupujú cez myšlienky a zmysel: rodinný príbeh, čo rozhodnutie hovorí o hodnotách, kam veci smerujú' },
                    gift: { en: 'Attention to meaning keeps the family story alive, and helps a hard change make sense to everyone it touches.', sk: 'Pozornosť k zmyslu udržiava rodinný príbeh živý a pomáha, aby ťažká zmena dávala zmysel všetkým, ktorých sa týka.' },
                    cost: { en: 'A long conversation about what it all means can wear out a relative who only wants help with the move.', sk: 'Dlhý rozhovor o tom, čo to všetko znamená, môže unaviť príbuzného, ktorému stačí pomoc so sťahovaním.' },
                    asks: { en: 'It asks for time to talk things over, and for the bigger picture to be treated as part of the help.', sk: 'Žiada si čas veci prebrať a to, aby sa aj širší pohľad bral ako súčasť pomoci.' },
                },
            },
            shared: {
                practical: {
                    gain: { en: '{both} show up with tools and lists, and family tasks get shared out and done without much talk.', sk: '{both} prídu s náradím a zoznamom a rodinné úlohy sa rozdelia a urobia bez zbytočných rečí.' },
                    risk: { en: 'With so much to get done, years can pass without a single conversation that is not about a task.', sk: 'Pri všetkom, čo treba urobiť, môžu roky prejsť bez jediného rozhovoru, ktorý by nebol o úlohe.' },
                },
                conceptual: {
                    gain: { en: '{both} can talk for hours about the family’s story and values, and that shared understanding carries them through change.', sk: '{both} dokážu hodiny hovoriť o rodinnom príbehu a hodnotách a toto spoločné porozumenie ich prenesie cez zmeny.' },
                    risk: { en: 'The talk can outrun the practical side, so the forms wait and the visit keeps being planned.', sk: 'Rozhovor môže predbehnúť praktickú stránku, takže tlačivá čakajú a návšteva sa stále len plánuje.' },
                },
            },
            opposed: {
                gain: { en: '{p0} handles the doing and {p1} the meaning, and a family facing a big change needs both the plan and the reason.', sk: '{p0} sa stará o konanie a {p1} o zmysel, a rodina pred veľkou zmenou potrebuje plán aj dôvod.' },
                risk: { en: 'Each can feel the other is missing the point: {p0} wants to settle what to do, {p1} wants to talk about what it means, and the conversation ends with neither done.', sk: 'Každý môže mať pocit, že druhá strana míňa podstatu: {p0} chce vyriešiť, čo urobiť, {p1} chce hovoriť o tom, čo to znamená, a rozhovor skončí bez jedného aj druhého.' },
                bridge: { en: 'It helps to split the time: first what it means, then what to do, with a clear point where one turns into the other.', sk: 'Pomáha rozdeliť si čas: najprv o tom, čo to znamená, potom o tom, čo urobiť, s jasným bodom, kde sa jedno mení na druhé.' },
            },
            oneSided: {
                practical: { note: { en: '{lean} goes straight to what needs doing and {mid} can move between the task and the talk, so the bigger questions get asked too.', sk: '{lean} ide rovno k tomu, čo treba urobiť, a {mid} sa vie pohybovať medzi úlohou a rozhovorom, takže zaznejú aj väčšie otázky.' } },
                conceptual: { note: { en: '{lean} looks for the meaning and {mid} can follow or bring things down to earth, so the talk usually ends in something done.', sk: '{lean} hľadá zmysel a {mid} vie ísť s tým aj vrátiť veci na zem, takže rozhovor sa zvyčajne skončí niečím urobeným.' } },
            },
            swings: { en: '{who} is practical about some family matters and reflective about others, often depending on how personal the matter is.', sk: '{who} pri niektorých rodinných veciach koná prakticky a pri iných premýšľa o zmysle, často podľa toho, aká osobná je daná vec.' },
        },
    },
    /* ============================================================================ drives == */
    drives: {
        shared: {
            mastery: {
                gain: { en: '{both} respect a thing done properly, and can find each other in a shared craft, a garden or a family business.', sk: '{both} si vážia dobre odvedenú prácu a môžu sa stretnúť pri spoločnom remesle, záhrade alebo rodinnom podniku.' },
                risk: { en: 'The same high standards can turn into quiet competition, or into correcting how the other does the very same job.', sk: 'Rovnako vysoké nároky sa môžu zmeniť na tichú súťaž alebo na neustále opravovanie toho, ako to robí druhá strana.' },
            },
            achievement: {
                gain: { en: '{both} understand ambition, and can cheer each other on through exams, career steps and new ventures.', sk: '{both} rozumejú ambíciám a vedia sa navzájom povzbudzovať pri skúškach, kariérnych krokoch aj nových projektoch.' },
                risk: { en: 'In a family that compares, shared ambition can quietly become a scoreboard, with every success measured against the other’s.', sk: 'V rodine, ktorá porovnáva, sa zo spoločnej ambície môže potichu stať tabuľka výsledkov, kde sa každý úspech meria s úspechmi druhej strany.' },
            },
            recognition: {
                gain: { en: '{both} know what it is to want acknowledgement, and can give generously the recognition each would like to receive.', sk: '{both} vedia, aké je túžiť po uznaní, a vedia uznanie, po ktorom túžia, aj štedro dávať.' },
                risk: { en: 'When both are waiting to be noticed, family occasions can become a contest for a parent’s attention or the family’s praise.', sk: 'Keď každý čaká na uznanie, rodinné udalosti sa môžu zmeniť na súťaž o pozornosť rodiča alebo pochvalu rodiny.' },
            },
            meaning: {
                gain: { en: '{both} care about what things mean, and their conversations about family, faith or values can go deep.', sk: '{both} hľadajú zmysel vecí a ich rozhovory o rodine, viere či hodnotách môžu ísť do hĺbky.' },
                risk: { en: 'When the meanings they find differ, a disagreement can feel like an argument about who each one is.', sk: 'Keď sa zmysel, ktorý každý nachádza, rozíde, nezhoda môže pôsobiť ako spor o to, kto je kto.' },
            },
            belonging: {
                gain: { en: '{both} want the family to hold together, and turn up for the birthdays, the hospital visits and the funerals.', sk: '{both} chcú, aby rodina držala pokope, a prídu na narodeniny, do nemocnice aj na pohreb.' },
                risk: { en: 'The same wish can make honest disagreement feel like a threat, so tensions get smoothed over rather than said.', sk: 'To isté želanie môže spôsobiť, že úprimná nezhoda pôsobí ako hrozba, a napätie sa radšej uhladí, než aby zaznelo.' },
            },
            freedom: {
                gain: { en: '{both} grant each other a life of their own, and contact between them tends to be freely chosen.', sk: '{both} si navzájom priznávajú vlastný život a kontakt medzi nimi býva slobodne zvolený.' },
                risk: { en: 'Two people who both prize freedom can let the tie go slack, until neither knows how to pick it back up.', sk: 'Dvaja ľudia, ktorí si cenia slobodu, môžu nechať puto povoliť, až kým ani jeden nevie, ako to puto znova nadviazať.' },
            },
            care: {
                gain: { en: '{both} look after people, and between them a frail parent or a struggling relative is rarely left without help.', sk: '{both} sa starajú o druhých a krehký rodič či príbuzný v ťažkostiach pri nich zriedka zostane bez pomoci.' },
                risk: { en: 'Two carers can wear themselves out side by side, each reluctant to ask for the help they give so freely.', sk: 'Dvaja ľudia, ktorí sa starajú, sa môžu vyčerpať bok po boku, pričom ani jeden nechce požiadať o pomoc, ktorú tak ochotne poskytujú iným.' },
            },
            understanding: {
                gain: { en: '{both} want to understand why people are as they are, which makes room for a relative’s side of the story.', sk: '{both} chcú rozumieť, prečo sú ľudia takí, akí sú, a to dáva priestor aj pre pohľad príbuzného.' },
                risk: { en: 'Understanding can become a way of excusing what still hurts, or of analysing a relative instead of simply talking.', sk: 'Porozumenie sa môže stať spôsobom, ako ospravedlniť to, čo stále bolí, alebo ako príbuzného rozoberať namiesto obyčajného rozhovoru.' },
            },
            'self-expression': {
                gain: { en: '{both} make room for each to show who they really are, even where that differs from what the family expected.', sk: '{both} si navzájom nechávajú priestor ukázať, kým naozaj sú, aj keď sa to líši od rodinných očakávaní.' },
                risk: { en: 'With both claiming room to be themselves, little may be left for the quieter work of meeting halfway.', sk: 'Keď si každý nárokuje priestor pre seba, môže zostať málo miesta na tichšiu prácu stretnúť sa v strede.' },
            },
            beauty: {
                gain: { en: '{both} notice beauty, and can share it in simple ways: a walk, a meal set well, an old photograph.', sk: '{both} si všímajú krásu a vedia sa o ňu deliť jednoducho: prechádzkou, pekne prestretým stolom, starou fotografiou.' },
                risk: { en: 'Taste can become a quiet way of judging, so a relative’s home or choices draw a look that says more than words.', sk: 'Vkus sa môže stať tichým spôsobom súdenia, takže domov alebo voľby príbuzného vyvolajú pohľad, ktorý povie viac než slová.' },
            },
        },
        pullsApart: {
            'freedom|belonging': {
                gain: { en: '{p0} keeps a life outside the family and {p1} keeps the family together, and a family can use both: a door that opens outward and a table to come home to.', sk: '{p0} si drží život mimo rodiny a {p1} drží rodinu pokope, a rodina môže potrebovať oboje: dvere von aj stôl, ku ktorému sa dá vrátiť.' },
                risk: { en: 'Each can read the other as a reproach: {p1} sees the distance as disloyalty, {p0} sees the pull as a claim, and the positions harden.', sk: 'Každý môže druhú stranu vnímať ako výčitku: {p1} vidí v odstupe neloajálnosť, {p0} v tom ťahu nárok, a pozície tvrdnú.' },
                bridge: { en: 'It helps when {p0} chooses a few occasions to be fully there for, and {p1} lets the rest go without counting absences.', sk: 'Pomáha, keď si {p0} vyberie niekoľko príležitostí, na ktoré príde naplno, a {p1} ostatné pustí bez počítania absencií.' },
            },
            'achievement|care': {
                gain: { en: '{p0} brings drive and results and {p1} brings attention to how everyone is doing, so together the goal and the people are both covered.', sk: '{p0} prináša ťah na bránu a výsledky, {p1} pozornosť k tomu, ako sa kto má, a spolu pokryjú cieľ aj ľudí.' },
                risk: { en: 'In family life this often surfaces around care: {p1} carries most of the visits and the worry, {p0} is busy elsewhere, and the gap becomes an unspoken account of who gives more.', sk: 'V rodinnom živote sa to často ukáže pri starostlivosti: {p1} nesie väčšinu návštev a starostí, {p0} má práce inde a z rozdielu sa stane nevyslovený účet o tom, kto dáva viac.' },
                bridge: { en: 'It helps to name the care openly, who does what and what each can offer, so that {p0} finds a way to contribute and {p1} stops holding it all.', sk: 'Pomáha otvorene pomenovať starostlivosť, kto čo robí a čo kto môže ponúknuť: {p0} tak nájde spôsob, ako prispieť, a {p1} nenesie všetko na vlastných pleciach.' },
            },
            'recognition|understanding': {
                gain: { en: '{p0} wants effort seen and {p1} wants the reasons understood, and a family that offers both gives each what matters.', sk: '{p0} chce, aby sa námaha videla, a {p1}, aby sa rozumelo dôvodom, a rodina, ktorá ponúkne oboje, dá každému to podstatné.' },
                risk: { en: 'The mismatch shows in praise and explanation: {p0} needs to hear “well done”, {p1} offers an analysis instead, and {p0} feels unseen while {p1} feels unheard.', sk: 'Nesúlad sa ukáže pri chvále a vysvetľovaní: {p0} potrebuje počuť „to sa podarilo“, {p1} namiesto toho ponúkne rozbor, a {p0} má pocit, že nikto nevidí, a {p1}, že nikto nepočúva.' },
                bridge: { en: 'Often it is enough for {p1} to name the effort first and look deeper only after, and for {p0} to say plainly when acknowledgement is what is wanted.', sk: 'Často stačí, keď {p1} najprv pomenuje námahu a až potom ide do hĺbky, a {p0} jasne povie, keď stojí práve o uznanie.' },
            },
        },
        different: {
            gain: { en: '{p0} and {p1} are moved by different things, which can widen what each sees of life, as long as neither expects the other to want the same.', sk: '{p0} a {p1} túžia po rôznych veciach, čo môže každému rozšíriť pohľad na život, pokiaľ nikto nečaká, že druhá strana bude túžiť po tom istom.' },
            risk: { en: 'Different pulls can turn into quiet disapproval, especially across generations, where one life choice is held up as the measure of another.', sk: 'Rozdielne túžby sa môžu zmeniť na tichý nesúhlas, najmä medzi generáciami, kde sa jedna životná voľba stáva mierou druhej.' },
            bridge: { en: 'Curiosity is the bridge: {p0} asks what makes the other pursuit worth it, and {p1} does the same in return.', sk: 'Mostom je zvedavosť: {p0} sa spýta, čo je na tom, za čím ide druhý človek, také cenné, a {p1} urobí to isté.' },
        },
        drawnTo: {
            mastery: { one: { en: 'is drawn to doing things well and knowing how', sk: 'túži robiť veci dobre a do hĺbky im rozumieť' }, many: { en: 'are drawn to doing things well and knowing how', sk: 'túžia robiť veci dobre a do hĺbky im rozumieť' } },
            achievement: { one: { en: 'is driven by reaching goals and seeing results', sk: 'chce dosahovať ciele a vidieť výsledky' }, many: { en: 'are driven by reaching goals and seeing results', sk: 'chcú dosahovať ciele a vidieť výsledky' } },
            recognition: { one: { en: 'wants effort and a place in the family to be seen', sk: 'túži po uznaní vlastnej námahy a miesta v rodine' }, many: { en: 'want effort and a place in the family to be seen', sk: 'túžia po uznaní vlastnej námahy a miesta v rodine' } },
            meaning: { one: { en: 'is drawn to what gives life purpose', sk: 'hľadá v živote zmysel' }, many: { en: 'are drawn to what gives life purpose', sk: 'hľadajú v živote zmysel' } },
            belonging: { one: { en: 'is drawn to belonging and to keeping the family together', sk: 'túži niekam patriť a držať rodinu pokope' }, many: { en: 'are drawn to belonging and to keeping the family together', sk: 'túžia niekam patriť a držať rodinu pokope' } },
            freedom: { one: { en: 'is drawn to freedom and a life of one’s own', sk: 'túži po slobode a vlastnom živote' }, many: { en: 'are drawn to freedom and a life of one’s own', sk: 'túžia po slobode a vlastnom živote' } },
            care: { one: { en: 'is drawn to looking after others', sk: 'má potrebu starať sa o druhých' }, many: { en: 'are drawn to looking after others', sk: 'majú potrebu starať sa o druhých' } },
            understanding: { one: { en: 'is drawn to understanding people and why things happen', sk: 'chce rozumieť ľuďom a tomu, prečo sa veci dejú' }, many: { en: 'are drawn to understanding people and why things happen', sk: 'chcú rozumieť ľuďom a tomu, prečo sa veci dejú' } },
            'self-expression': { one: { en: 'is drawn to showing who one truly is', sk: 'túži ukázať, kým naozaj je' }, many: { en: 'are drawn to showing who they truly are', sk: 'túžia ukázať, kým naozaj sú' } },
            beauty: { one: { en: 'is drawn to beauty and to things made with care', sk: 'vyhľadáva krásu a veci urobené s láskou' }, many: { en: 'are drawn to beauty and to things made with care', sk: 'vyhľadávajú krásu a veci urobené s láskou' } },
        },
    },
    /* ============================================================================= kinds == */
    kinds: {
        siblings: {
            frame: { en: '{both} are siblings, a tie neither of them chose and both now carry as adults. This reading attends to how the two meet today, as equals who share part of a family.', sk: '{both} sú súrodenci a spája ich puto, ktoré si nevyberali a ktoré dnes nesú ako dospelí. Toto čítanie sleduje, ako sa dnes stretávajú: ako rovnocenní, ktorých časť rodiny je spoločná.' },
            lens: { en: 'Between siblings, old comparisons and childhood roles tend to outlive childhood, so the reading looks at who leads, what feels fair, and where rivalry is really a dispute about time, money or care.', sk: 'Medzi súrodencami staré porovnávanie a roly z detstva často prežijú samotné detstvo, preto sa čítanie pozerá na to, kto vedie, čo pôsobí spravodlivo a kde je súperenie v skutočnosti sporom o čas, peniaze či starostlivosť.' },
            consequence: {
                'taking-the-lead': { en: 'Between siblings, who leads often echoes a role handed out in childhood, such as the responsible one, and adulthood is a chance to choose it again.', sk: 'Medzi súrodencami vedenie často odráža rolu z detstva, napríklad úlohu toho zodpovedného, a dospelosť dáva príležitosť vybrať si úlohu nanovo.' },
                'pulls-apart': { en: 'Siblings easily hear different pulls as the old comparison, who did better, who stayed closer, who was favoured, even when nobody is comparing.', sk: 'Súrodenci rozdielne túžby ľahko počujú ako staré porovnávanie, kto to dotiahol ďalej, kto zostal bližšie, koho uprednostňovali, aj keď nikto neporovnáva.' },
                'closeness-and-room': { en: 'Adult siblings often drift during busy years and draw closer later, so a gap in contact now is common and not a verdict on the bond.', sk: 'Dospelí súrodenci sa v rušných rokoch často vzdialia a neskôr opäť zblížia, takže dnešný odstup je bežný a nie je rozsudkom nad putom.' },
                'emotional-expression': { en: 'Siblings raised in the same home can still have learned different ways of showing feeling, and each may find the other’s way the strange one.', sk: 'Aj súrodenci z jedného domova sa mohli naučiť rôzne spôsoby prejavovania citov a každému môže pripadať zvláštny práve spôsob druhej strany.' },
                'shared-pull': { en: 'A drive two siblings share can be a bond or a race, and which it becomes often depends on whether the family kept score.', sk: 'Túžba, ktorú zdieľajú dvaja súrodenci, môže byť putom aj pretekmi, a čím sa stane, často závisí od toho, či rodina rátala body.' },
            },
        },
        'adult-parent-adult-child': {
            frame: { en: '{both} are a parent and an adult child: a tie that began with one looking after the other and now runs between two adults.', sk: '{both} sú rodič a dospelé dieťa. Ich vzťah sa začal starostlivosťou o dieťa a dnes spája dvoch dospelých ľudí.' },
            lens: { en: 'Here the work is autonomy: the parent letting the adult child’s choices stand, the adult child setting limits without a rupture, and each noticing which old roles still fit.', sk: 'Tu ide o samostatnosť: rodič rešpektuje rozhodnutia dospelého dieťaťa, dospelé dieťa nastaví hranice bez roztržky a každý si všimne, ktoré staré roly ešte sedia.' },
            roles: [{ en: 'the parent', sk: 'rodič' }, { en: 'the adult child', sk: 'dospelé dieťa' }],
            consequence: {
                'closeness-and-room': { en: 'With an adult child, help that was once the job can start to feel like management, and the question becomes what help is welcome now.', sk: 'Pri dospelom dieťati sa pomoc, ktorá bola kedysi povinnosťou, môže začať javiť ako riadenie, a otázka sa mení na to, aká pomoc je vítaná dnes.' },
                'taking-the-lead': { en: 'Decisions once belonged to the parent, and part of this relationship’s work is letting each decision pass to the person whose life it shapes.', sk: 'Kedysi patrilo rozhodovanie rodičovi a súčasťou tohto vzťahu je nechať každé rozhodnutie prejsť na toho, koho život ovplyvňuje.' },
                'change-and-steadiness': { en: 'An adult child’s new life, a partner, a move, a different faith, can unsettle a parent’s sense of the family, and each may need time to find the thread that continues.', sk: 'Nový život dospelého dieťaťa, partner, sťahovanie či iná viera, môže otriasť tým, ako rodič vníma rodinu, a každý môže potrebovať čas, aby našiel niť, ktorá pokračuje.' },
                'emotional-expression': { en: 'A parent and an adult child often learned to show love in different times, and a deed and a sentence can mean the same thing.', sk: 'Rodič a dospelé dieťa sa lásku často naučili prejavovať v iných časoch a skutok aj veta môžu znamenať to isté.' },
                'risk-and-caution': { en: 'A parent’s worry about an adult child’s risk is a form of love and is still not a veto, and it helps to say both.', sk: 'Obava rodiča z rizika dospelého dieťaťa je prejavom lásky, no nie je vetom, a pomáha pomenovať oboje.' },
            },
        },
        'grandparent-grandchild': {
            frame: { en: '{both} are a grandparent and a grandchild, a generation or more apart, with a tie that often runs partly through the generation in between.', sk: '{both} sú starý rodič a vnúča. Delí ich aspoň jedna generácia a ich vzťah často sčasti prechádza cez generáciu, ktorá stojí medzi nimi.' },
            lens: { en: 'What matters most here is closeness felt and help that runs both ways, more than how often they meet, along with respect for the very different worlds each grew up in.', sk: 'Najviac tu záleží na pocítenej blízkosti a na pomoci, ktorá ide oboma smermi, viac než na tom, ako často sa vidia, a na rešpekte k rozdielnym svetom, v ktorých prebiehalo detstvo každého z nich.' },
            roles: [{ en: 'the grandparent', sk: 'starý rodič' }, { en: 'the grandchild', sk: 'vnúča' }],
            consequence: {
                'change-and-steadiness': { en: 'Across two generations, steadiness and novelty can line up with age, and the grandparent’s customs and the grandchild’s new ways can be traded rather than defended.', sk: 'Naprieč dvoma generáciami sa stálosť a novosť môžu deliť podľa veku a zvyky starého rodiča aj nové spôsoby vnúčaťa sa dajú vymieňať, nie obhajovať.' },
                'social-energy': { en: 'Contact here often runs through family gatherings, so how each takes to the full table shapes how much one-to-one time there is.', sk: 'Kontakt tu často prebieha cez rodinné stretnutia, takže to, ako každý znáša plný stôl, ovplyvňuje, koľko času zostane medzi štyrmi očami.' },
                'emotional-expression': { en: 'A grandparent may show love through food, stories or practical help, and a grandchild through a message or a visit; each of these counts.', sk: 'Starý rodič môže lásku ukazovať jedlom, príbehmi či praktickou pomocou a vnúča správou alebo návštevou; počíta sa každý z týchto spôsobov.' },
                'closeness-and-room': { en: 'How involved a grandparent is depends on health, distance, money and the family’s customs, not only on love, and a grandchild’s growing life needs room too.', sk: 'To, koľko sa starý rodič zapája, závisí od zdravia, vzdialenosti, peňazí a zvykov rodiny, nielen od lásky, a rastúci život vnúčaťa tiež potrebuje priestor.' },
                'practical-and-conceptual': { en: 'Practical help and family stories are often what passes between these two generations, and both are worth keeping.', sk: 'Medzi týmito dvoma generáciami často putuje praktická pomoc a rodinné príbehy, a oboje stojí za to uchovať.' },
            },
        },
        'extended-family': {
            frame: { en: '{both} are relatives in the wider family, with a tie that often runs through other people. This reading attends to the tie between the two themselves, apart from what reaches them through the rest of the family.', sk: '{both} patria do širšej rodiny a ich vzťah sa často odvíja cez iných ľudí. Toto čítanie sa pozerá na to, čo je priamo medzi nimi, nielen na to, čo k nim prichádza cez ostatných.' },
            lens: { en: 'Ties in the wider family usually live at gatherings and through the people in between, so the reading weighs ease in company, room and who organises, and treats obligation as something each family defines in its own way.', sk: 'Puto v širšej rodine zvyčajne žije na stretnutiach a cez ľudí medzi nimi, preto čítanie zvažuje pohodu v spoločnosti, priestor a to, kto organizuje, a povinnosť berie ako niečo, čo každá rodina chápe po svojom.' },
            consequence: {
                'social-energy': { en: 'In the wider family, contact often happens only at weddings and funerals, so comfort with a crowd decides much of how this pair meets.', sk: 'V širšej rodine sa kontakt často odohráva len na svadbách a pohreboch, takže to, ako kto znáša plný stôl, do veľkej miery určuje, ako sa táto dvojica stretáva.' },
                'closeness-and-room': { en: 'What is owed to wider kin differs a great deal between families and cultures, so the right amount of closeness here is the one each side can live with.', sk: 'Povinnosti voči širšej rodine sa medzi rodinami a kultúrami veľmi líšia, takže správna miera blízkosti je tu tá, s ktorou vie žiť každá strana.' },
                'taking-the-lead': { en: 'Someone in the wider family usually becomes the organiser of reunions and news, and it helps when that role is offered rather than assumed.', sk: 'V širšej rodine sa zvyčajne niekto stane organizátorom stretnutí a noviniek a pomáha, keď sa táto úloha ponúkne, nie predpokladá.' },
                'change-and-steadiness': { en: 'Wider-family customs often outlast the people who started them, so changing a tradition here can involve far more people than this pair.', sk: 'Zvyky širšej rodiny často prežijú ľudí, ktorí ich založili, a zmena tradície sa tu môže dotknúť oveľa viacerých ľudí než len tejto dvojice.' },
                'different-pulls': { en: 'Relatives who meet rarely can let different pulls simply be interesting, without the weight of a shared household.', sk: 'Príbuzní, ktorí sa stretávajú zriedka, môžu rozdielne túžby brať jednoducho ako zaujímavosť, bez ťarchy spoločnej domácnosti.' },
            },
        },
    },
    /* ========================================================================= practices == */
    practices: [
        /* closeness-and-room */
        {
            id: 'fam.boundary-as-plan',
            title: { en: 'A boundary said as a plan', sk: 'Hranica povedaná ako plán' },
            body: {
                en: 'Say a limit as what you will do, not as what the other must stop: “I’ll ring on Sundays, and some decisions I’d rather share once made.” Say it once, calmly, without a list of reasons. A limit put this way tends to be easier to hear, because it asks nothing of the other and leaves the tie in place.',
                sk: 'Povedz hranicu ako to, čo urobíš ty, nie ako to, s čím má prestať druhý človek: „Budem volať v nedeľu a niektoré rozhodnutia ti radšej poviem, až keď budú hotové.“ Povedz to raz, pokojne a bez zoznamu dôvodov. Takto vyslovená hranica sa zvyčajne ľahšie počúva, lebo od druhého človeka nič nežiada a puto pritom zostáva celé.',
            },
            audience: { kind: 'pole', pole: 'independent' },
            triggers: { dynamic: 'closeness-and-room', relations: ['opposed'], mechanisms: ['closeness-and-room/opposed'] },
            sources: ['FAM-001', 'FAM-019'],
        },
        {
            id: 'fam.ask-before-helping',
            title: { en: 'Ask what help is wanted', sk: 'Opýtaj sa, aká pomoc je vítaná' },
            body: {
                en: 'Before stepping in with advice, a lift or a visit, ask one question: “Do you want help with this, or shall I just listen?” Then follow the answer, even when it is “neither”. Help that was asked for tends to land as care; help that arrives unasked can feel like being managed, however loving the intent.',
                sk: 'Skôr než prídeš s radou, odvozom alebo návštevou, polož jednu otázku: „Chceš s tým pomôcť, alebo ťa mám len vypočuť?“ Potom sa riaď odpoveďou, aj keď znie „ani jedno“. Pomoc, o ktorú niekto požiada, zvyčajne pôsobí ako starostlivosť; nevyžiadaná pomoc môže pôsobiť ako riadenie, hoci je myslená s láskou.',
            },
            audience: { kind: 'pole', pole: 'collaborative' },
            triggers: { dynamic: 'closeness-and-room', relations: ['opposed', 'one-sided', 'shared'], mechanisms: ['closeness-and-room/opposed', 'closeness-and-room/oneSided:collaborative', 'closeness-and-room/shared:collaborative'] },
            sources: ['FAM-020', 'FAM-014'],
        },
        {
            id: 'fam.think-it-over-alone',
            title: { en: 'A sentence for thinking it over alone', sk: 'Veta pre chvíľu, keď si treba niečo premyslieť v súkromí' },
            body: {
                en: 'To work something out alone, say so in a way that keeps the door open: “I’ll think this one over on my own and tell you where I land.” The other can take it as a pause, not a step away. Staying close does not require deciding everything together, and a sentence like this shows both at once.',
                sk: 'Ak si treba niečo premyslieť v súkromí, dajte to najavo tak, aby dvere zostali otvorené: „Toto si chcem najprv premyslieť po svojom a potom ti dám vedieť, ako to vidím.“ Druhá strana to môže prijať ako prestávku, nie ako odstup. Byť si nablízku neznamená všetko riešiť spolu a takáto veta ukáže oboje naraz.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['shared'], mechanisms: ['closeness-and-room/shared:collaborative'] },
            sources: ['FAM-001', 'FAM-019'],
        },
        {
            id: 'fam.tell-it-while-small',
            title: { en: 'Say it while it is small', sk: 'Povedzte to, kým je to malé' },
            body: {
                en: 'Mention a worry, a check-up or a change at work while it is still small, and say what you want back: “Nothing to do, I just wanted you to know.” Saying so keeps the news from sounding like a request. Between two people who leave each other room, news offered this way leaves the other free to answer in whatever way suits.',
                sk: 'Starosť, prehliadku u lekára či zmenu v práci spomeňte, kým je to ešte malé, a povedzte, čo od druhej strany čakáte: „Netreba nič robiť, len nech o tom vieš.“ Vďaka tomu novinka neznie ako prosba. Medzi dvoma ľuďmi, ktorí si nechávajú priestor, takto podaná správa necháva druhej strane voľnosť odpovedať po svojom.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['shared'], mechanisms: ['closeness-and-room/shared:independent'] },
            sources: ['FAM-004', 'FAM-001'],
        },
        {
            id: 'fam.say-what-would-suit',
            title: { en: 'Ask for contact with a size on it', sk: 'Prosba o kontakt v jasnej miere' },
            body: {
                en: 'If you would like more contact, say it as a wish with a size, not a complaint: “I’d like to hear from you a bit more often; a short message is plenty.” Then let the other say what is possible. A small, clear request tends to be easier to meet than a hope that the other will guess.',
                sk: 'Ak by niekomu z vás vyhovoval o niečo častejší kontakt, nech to povie ako želanie s jasnou mierou, nie ako výčitku: „Potešilo by ma, keby sme sa ozývali častejšie; stačí aj krátka správa.“ Druhá strana potom povie, čo je možné. Malú a jasnú prosbu je zvyčajne ľahšie splniť než nádej, že to druhá strana uhádne.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['one-sided'], mechanisms: ['closeness-and-room/oneSided:independent'] },
            sources: ['FAM-004', 'FAM-001'],
        },
        {
            id: 'fam.ask-what-suits',
            title: { en: 'Ask once whether this is enough', sk: 'Spýtaj sa raz, či to stačí' },
            body: {
                en: 'Now and then, ask the other plainly whether the present amount of contact suits: “Is this about right for you, or would you like more?” Then say honestly what you can offer, even if it is less. A question asked by the one who sets the pace gives the other an easy opening to answer.',
                sk: 'Občas sa priamo spýtaj, či terajšia miera kontaktu vyhovuje aj druhej strane: „Stačí ti to takto, alebo by ti vyhovovalo viac?“ Potom úprimne povedz, čo môžeš ponúknuť, aj keď je to menej. Otázka od toho, kto udáva tempo, dáva druhej strane ľahkú príležitosť odpovedať.',
            },
            audience: { kind: 'pole', pole: 'independent' },
            triggers: { dynamic: 'closeness-and-room', relations: ['one-sided'], mechanisms: ['closeness-and-room/oneSided:independent'] },
            sources: ['FAM-001', 'FAM-016'],
        },
        {
            id: 'fam.keep-this-one',
            title: { en: 'Keep one thing, and say what it is not', sk: 'Jedna vec pre seba a veta o tom, čím nie je' },
            body: {
                en: 'Say plainly and early when something is yours to keep. A short reason given once tends to be easier to hear than a no that arrives late. Closeness and a few things kept to oneself can sit together in a family, and one sentence can say both: “This one I’d like to keep to myself; it isn’t about you.”',
                sk: 'Keď si niekto z vás chce niečo nechať pre seba, nech to povie jasne a včas. Krátky dôvod povedaný raz sa zvyčajne počúva ľahšie než odmietnutie, ktoré príde neskoro. Blízkosť a pár vecí, ktoré si človek nechá pre seba, môžu v rodine existovať vedľa seba a jedna veta povie oboje naraz: „Toto si chcem nechať pre seba; nie je to kvôli tebe.“',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['one-sided'], mechanisms: ['closeness-and-room/oneSided:collaborative'] },
            sources: ['FAM-019', 'FAM-002'],
        },
        {
            id: 'fam.limited-contact',
            title: { en: 'Limited contact is a real option', sk: 'Obmedzený kontakt je skutočná možnosť' },
            body: {
                en: 'If contact keeps costing more than it gives, a smaller, clearly defined form is a legitimate choice: a card at birthdays, a call every few months, meeting only with others present. It does not need defending to the wider family. Distance in families is more common than it looks, and the decision can be revisited later, or not at all.',
                sk: 'Ak kontakt opakovane berie viac, než dáva, menšia a jasne vymedzená podoba je legitímnou voľbou: pohľadnica k narodeninám, telefonát raz za pár mesiacov, stretnutia len v prítomnosti ďalších ľudí. Pred širšou rodinou sa to obhajovať netreba. Odstup v rodinách je bežnejší, než sa zdá, a rozhodnutie sa dá neskôr prehodnotiť, alebo aj nie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', context: ['conflict-goes-unrepaired', 'need-more-space', 'frequent-conflict'] },
            sources: ['FAM-024', 'FAM-023', 'FAM-026'],
        },
        {
            id: 'fam.repair-if-wanted',
            title: { en: 'If both want to try again', sk: 'Ak chce znova skúsiť každá strana' },
            body: {
                en: 'Where both want it and contact is safe, start smaller than the rift: a short message, a coffee with a set end time, one topic rather than the whole history. Forgiving is a separate, personal matter; it may come later or not at all, and it does not require trust or more contact. If hurtful behaviour is still happening, protection comes first.',
                sk: 'Ak to chce každá strana a kontakt je bezpečný, začnite v menšom, než aká veľká je roztržka: krátkou správou, kávou s dohodnutým koncom, jednou témou namiesto celej histórie. Odpustenie je samostatná, osobná vec; môže prísť neskôr alebo vôbec nie a nevyžaduje dôveru ani viac kontaktu. Ak ubližovanie stále pokračuje, prednosť má ochrana.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', context: ['conflict-goes-unrepaired'] },
            sources: ['FAM-025', 'FAM-026', 'FAM-024'],
        },
        /* emotional-expression */
        {
            id: 'fam.one-sentence-with-the-deed',
            title: { en: 'Add one sentence to the deed', sk: 'K skutku pridaj jednu vetu' },
            body: {
                en: 'Next time you help, with the repair, the meal or the lift, add one plain sentence that says why: “I’m doing this because you matter to me.” Nothing more is needed. A small acknowledgement of feeling tends to help a relative feel understood, although it lands differently from person to person.',
                sk: 'Keď nabudúce pomôžeš, opravou, jedlom či odvozom, pridaj jednu obyčajnú vetu o tom, prečo to robíš: „Robím to, lebo mi na tebe záleží.“ Viac netreba. Malé pomenovanie citu zvyčajne pomáha, aby mal príbuzný pocit porozumenia, hoci u každého to pôsobí trochu inak.',
            },
            audience: { kind: 'pole', pole: 'emotionally-contained' },
            triggers: { dynamic: 'emotional-expression', relations: ['opposed', 'one-sided'], mechanisms: ['emotional-expression/opposed', 'emotional-expression/oneSided:emotionally-contained'] },
            sources: ['FAM-028'],
        },
        {
            id: 'fam.read-the-deed',
            title: { en: 'Read the deed, then ask for the word', sk: 'Prečítaj čin, potom popros o slovo' },
            body: {
                en: 'When a relative replies to something you said with a deed, a lift, a meal, a job done, try reading the deed as the reply first. If you need the words too, ask once and plainly: “It would mean a lot to hear it said.” A clear request tends to be simpler to meet than a hope that someone will guess.',
                sk: 'Keď príbuzný na tvoje slová reaguje činom, odvozom, jedlom, hotovou prácou, skús ten čin najprv vnímať ako reakciu. Ak potrebuješ aj slová, povedz to raz a jasne: „Veľa by pre mňa znamenalo počuť to nahlas.“ Jasnú prosbu je zvyčajne jednoduchšie splniť než nádej, že to niekto uhádne.',
            },
            audience: { kind: 'pole', pole: 'emotionally-expressive' },
            triggers: { dynamic: 'emotional-expression', relations: ['opposed', 'one-sided'], mechanisms: ['emotional-expression/opposed', 'emotional-expression/oneSided:emotionally-expressive'] },
            sources: ['FAM-015', 'FAM-004'],
        },
        {
            id: 'fam.two-languages-of-love',
            title: { en: 'Two ways of saying the same thing', sk: 'Dva spôsoby, ako povedať to isté' },
            body: {
                en: 'Each writes down three ways of showing care, such as a call, a cooked meal, a lift or a sentence, and three ways of receiving it that mean the most. Compare the lists over coffee. How love is shown often comes from circumstances and upbringing rather than from how much is felt, and the other’s list can explain a reply that once seemed to miss the point.',
                sk: 'Každý si zapíše tri spôsoby, akými prejavuje starostlivosť, napríklad telefonát, navarené jedlo, odvoz či vetu, a tri spôsoby, ktoré pre každého znamenajú najviac, keď ich dostane. Porovnajte zoznamy pri káve. Prejavy lásky často vychádzajú z okolností a výchovy, nie z toho, koľko citu je za nimi, a zoznam druhej strany môže vysvetliť odpoveď, ktorá kedysi akoby minula cieľ.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'emotional-expression', relations: ['opposed', 'one-sided'], mechanisms: ['emotional-expression/opposed', 'emotional-expression/oneSided'] },
            sources: ['FAM-004', 'FAM-015'],
        },
        {
            id: 'fam.answer-what-lies-under',
            title: { en: 'A question in place of a reply in kind', sk: 'Otázka namiesto odpovede v rovnakom tóne' },
            body: {
                en: 'When a remark lands hard, answer what may lie under it rather than how it was said: “That sounded sharp. Is something else on your mind?” A question in place of a reply in kind gives the quarrel nowhere to go for a moment. A spike of anger tends to raise the chance of more conflict later the same day, so a slower answer is worth having ready.',
                sk: 'Keď poznámka zabolí, reagujte na to, čo sa za poznámkou môže skrývať, nie na to, ako zaznela: „Znelo to ostro. Trápi ťa ešte niečo iné?“ Pri otázke namiesto odpovede v rovnakom tóne sa hádka na chvíľu nemá kam rozbehnúť. Náhly hnev zvyčajne zvyšuje šancu na ďalší konflikt v ten istý deň, preto sa oplatí mať pripravenú pomalšiu odpoveď.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'emotional-expression', relations: ['shared'], mechanisms: ['emotional-expression/shared:emotionally-expressive'] },
            sources: ['FAM-022', 'FAM-027'],
        },
        {
            id: 'fam.thank-the-particular',
            title: { en: 'Thank the particular deed', sk: 'Poďakujte za konkrétny skutok' },
            body: {
                en: 'When the other does something for you, thank the particular thing and say what it made possible. Naming the deed and its use shows that the care behind it was seen, without anyone having to talk about feelings. A sense of being understood tends to grow from small acknowledgements such as this: “The lift meant I could stay the whole afternoon.”',
                sk: 'Keď niekto z vás urobí niečo pre druhého, poďakujte za tú konkrétnu vec a dodajte, čo sa vďaka tomu dalo. Pomenovaný čin a to, načo bol dobrý, dajú najavo, že starostlivosť nezostala nepovšimnutá, a nikto pritom nemusí hovoriť o citoch. Pocit porozumenia často rastie práve z takýchto malých uznaní: „Vďaka odvozu sa dalo zostať celé popoludnie.“',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'emotional-expression', relations: ['shared'], mechanisms: ['emotional-expression/shared:emotionally-contained'] },
            sources: ['FAM-028'],
        },
        /* taking-the-lead (file order matters: the first two cards that match a story are the ones offered) */
        {
            id: 'fam.whose-decision',
            title: { en: 'Whose decision is it?', sk: 'Čie je to rozhodnutie?' },
            body: {
                en: 'Before weighing in on a choice, ask one question: whose life does it shape most? Sort it into theirs to make, ours to make together, or mine, and offer a view on the first kind only when asked. Help with a decision that belongs to someone else tends to land better when it was asked for.',
                sk: 'Skôr než sa vyjadríte k rozhodnutiu niekoho iného, položte si jednu otázku: koho život ovplyvní najviac? Zaraďte rozhodnutie medzi tie, ktoré patria druhému, tie spoločné alebo tie vlastné, a k prvej skupine ponúknite názor, len ak oň niekto požiada. Pomoc s rozhodnutím, ktoré patrí niekomu inému, zvyčajne lepšie padne, keď bola vyžiadaná.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed'], mechanisms: ['taking-the-lead/opposed:assertive', 'taking-the-lead/opposed:receptive'] },
            sources: ['FAM-020', 'FAM-014'],
        },
        {
            id: 'fam.view-before-settled',
            title: { en: 'Say your view before it is settled', sk: 'Povedz názor skôr, než je rozhodnuté' },
            body: {
                en: 'When a family decision is forming, offer your view early, even a small one: “I’m not sure about this yet, and I’d like to say what worries me before it’s booked.” Say it calmly, without needing to win. A view given in time can become part of the decision; the same view given afterwards tends to sound like a complaint.',
                sk: 'Keď sa rodinné rozhodnutie formuje, povedz svoj názor včas, hoci aj malý: „Zatiaľ mám pochybnosti a skôr, než sa to zarezervuje, chcem povedať, čo ma trápi.“ Povedz to pokojne, bez potreby vyhrať. Názor vyslovený včas sa môže stať súčasťou rozhodnutia; ten istý názor povedaný neskôr zvyčajne znie ako sťažnosť.',
            },
            audience: { kind: 'pole', pole: 'receptive' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed', 'one-sided', 'shared'], mechanisms: ['taking-the-lead/opposed', 'taking-the-lead/oneSided:receptive', 'taking-the-lead/shared:receptive'] },
            sources: ['FAM-004', 'FAM-001'],
        },
        {
            id: 'fam.hand-it-over',
            title: { en: 'Hand one job over for real', sk: 'Odovzdaj jednu úlohu naozaj' },
            body: {
                en: 'Pick one family job you usually carry, the holiday booking, the calls to the doctor, the birthday list, and offer it to someone else with a short handover and no checking afterwards. If it is done differently, let that stand. Organising tends to stay with whoever has been doing it, and moving one task is one way a role starts to loosen.',
                sk: 'Vyber si jednu rodinnú úlohu, ktorú zvyčajne nesieš ty, rezerváciu na sviatky, telefonáty s lekárom, zoznam narodenín, a ponúkni túto úlohu niekomu inému s krátkym odovzdaním a bez kontroly potom. Ak sa urobí inak, nechaj to tak. Organizovanie zvyčajne zostáva tam, kde bolo doteraz, a presun jednej úlohy je jeden zo spôsobov, ako rolu začať uvoľňovať.',
            },
            audience: { kind: 'pole', pole: 'assertive' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed', 'one-sided', 'shared'], mechanisms: ['taking-the-lead/opposed', 'taking-the-lead/oneSided:assertive', 'taking-the-lead/shared:assertive'] },
            sources: ['FAM-030', 'FAM-001'],
        },
        {
            id: 'fam.role-lock',
            title: { en: 'The responsible one, the difficult one', sk: 'Ten zodpovedný, ten ťažký' },
            body: {
                en: 'Each notes, privately at first, any role the family seemed to hand out early on, if one comes to mind: the responsible one, the peacemaker, the difficult one, the youngest. Then ask, perhaps aloud, whether the role still fits and what each would like to put down. Treat the old roles as ways a family may have coped, not as verdicts on who anyone is.',
                sk: 'Každý si najprv v duchu pomenuje rolu, ktorú si z rodiny odmalička pamätá, ak nejaká príde na um: ten zodpovedný, zmierovateľ, ten ťažký, najmladší. Potom sa skúste, hoci aj nahlas, spýtať, či je tá rola ešte aktuálna a čo z tej roly chce každý odložiť. Berte staré roly ako spôsob, akým sa rodina možno vyrovnávala s okolnosťami, nie ako rozsudok o tom, kto je kto.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed', 'shared'], mechanisms: ['taking-the-lead/opposed:assertive', 'taking-the-lead/shared:assertive'] },
            sources: ['FAM-001', 'FAM-005'],
        },
        {
            id: 'fam.offer-to-lead',
            title: { en: 'Offer to take one', sk: 'Ponuka vziať si jednu vec' },
            body: {
                en: 'If you can lead as well as follow, say so on one matter before the plan is made: “Let me sort this one out.” Whoever tends to step forward can then hand it over without having to ask. A role that is offered tends to move more easily than one that is waited for.',
                sk: 'Ten z vás, kto vie viesť aj nasledovať, to môže pri jednej veci povedať skôr, než vznikne plán: „Toto nechaj na mňa.“ Ten, kto zvyčajne vykročí prvý, potom môže vec odovzdať bez prosenia. Úloha, ktorá sa ponúkne, sa zvyčajne presúva ľahšie než tá, na ktorú sa čaká.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'taking-the-lead', relations: ['one-sided'], mechanisms: ['taking-the-lead/oneSided:assertive'] },
            sources: ['FAM-001'],
        },
        {
            id: 'fam.turns-to-go-first',
            title: { en: 'Take turns at going first', sk: 'Striedajte sa v tom, kto začne' },
            body: {
                en: 'Agree who opens what: one of you proposes the next visit, the other raises the next matter that needs deciding, and swap the next time round. A turn that is known in advance takes the guessing out of who should begin. Waiting can be a courtesy, and a simple rota keeps courtesy from turning into silence.',
                sk: 'Dohodnite sa, kto čo otvorí: jeden z vás navrhne ďalšiu návštevu, druhý nadhodí ďalšiu vec, o ktorej treba rozhodnúť, a nabudúce sa vymeníte. Keď je poradie známe vopred, netreba hádať, kto má začať. Čakanie môže byť zdvorilosť a jednoduché striedanie zabráni, aby sa zo zdvorilosti stalo mlčanie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'taking-the-lead', relations: ['shared', 'one-sided'], mechanisms: ['taking-the-lead/shared:receptive', 'taking-the-lead/oneSided:receptive'] },
            sources: ['FAM-004'],
        },
        /* pulls-apart */
        {
            id: 'fam.fair-not-only-equal',
            title: { en: 'Fair, not only equal', sk: 'Spravodlivé, nielen rovnaké' },
            body: {
                en: 'When comparison comes up, who got more help, who was praised more, ask each other what felt fair or unfair and why, before deciding whether it was favouritism. Two people in one family often remember the same pattern differently. Whether treatment felt fair, and whether the reasons were understood, tends to matter more than whether it was equal.',
                sk: 'Keď príde reč na porovnávanie, kto dostal viac pomoci, koho viac chválili, spýtajte sa navzájom, čo pôsobilo spravodlivo alebo nespravodlivo a prečo, skôr než rozhodnete, či šlo o uprednostňovanie. Dvaja ľudia z jednej rodiny si ten istý vzorec často pamätajú inak. To, či zaobchádzanie pôsobilo spravodlivo a či boli dôvody zrozumiteľné, zvyčajne znamená viac než to, či bolo rovnaké.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], kinds: ['siblings', 'adult-parent-adult-child'], context: ['unfair-comparison', 'sibling-friction'], mechanisms: ['pulls-apart/recognition|understanding', 'pulls-apart/achievement|care'] },
            sources: ['FAM-009', 'FAM-012', 'FAM-010'],
        },
        {
            id: 'fam.what-family-owes',
            title: { en: 'What does family owe?', sk: 'Čo si rodina dlhuje?' },
            body: {
                en: 'On a calm day, ask each other what family members owe one another: how often to visit, who looks after an ageing parent, whether money is shared. Expect honest differences and leave them on the table for a while before trying to settle anything. Such beliefs are shaped by upbringing, faith and culture, and none of them is simply right.',
                sk: 'V pokojný deň sa navzájom spýtajte, čo si podľa vás členovia rodiny navzájom dlhujú: ako často sa navštevovať, kto sa postará o starnúceho rodiča, či sa delia peniaze. Počítajte s úprimnými rozdielmi a nechajte ich chvíľu na stole, skôr než sa pokúsite niečo uzavrieť. Tieto presvedčenia formuje výchova, viera a kultúra a žiadne z nich nie je jednoducho správne.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/freedom|belonging', 'pulls-apart/achievement|care'] },
            sources: ['FAM-018', 'FAM-032'],
        },
        {
            id: 'fam.care-on-one-page',
            title: { en: 'Talk about care before it is urgent', sk: 'Hovorte o starostlivosti skôr, než je naliehavá' },
            body: {
                en: 'If a parent or relative may need more care, talk it through while nothing is urgent: what each of you could do, what each cannot, and what the relative wants. Care tends to fall on whoever lives nearest or was expected to give it, and an early conversation leaves more of it to choice.',
                sk: 'Ak rodič alebo iný príbuzný môže potrebovať viac starostlivosti, preberte to, kým nič nie je naliehavé: čo by kto z vás mohol robiť, čo nezvládne a čo si želá príbuzný, o ktorého ide. Starostlivosť zvyčajne pripadne tomu, kto býva najbližšie alebo od koho sa čakala; keď sa o tom porozprávate včas, viac bude závisieť od vás.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], poles: ['care'], kinds: ['siblings', 'adult-parent-adult-child', 'extended-family'], mechanisms: ['pulls-apart/achievement|care'] },
            sources: ['FAM-030', 'FAM-029'],
        },
        {
            id: 'fam.ask-about-the-day',
            title: { en: 'Ask about the day, not the absence', sk: 'Pýtajte sa na deň, nie na neprítomnosť' },
            body: {
                en: 'When one of you misses a family occasion, the other can ask first about how the day was spent: “How was the trip?” Mention the gap, if at all, afterwards and once. An absence asked about with interest is less likely to harden into a question of loyalty on either side.',
                sk: 'Keď niekto z vás vynechá rodinné stretnutie, druhá strana sa môže najprv spýtať, ako ten deň vyzeral: „Aký bol výlet?“ Medzeru spomeňte, ak vôbec, až potom a len raz. Neprítomnosť, na ktorú sa niekto spýta so záujmom, sa tak ľahko nezmení na otázku vernosti rodine.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/freedom|belonging'] },
            sources: ['FAM-018', 'FAM-004'],
        },
        {
            id: 'fam.how-it-came-about',
            title: { en: 'Tell one part of how it came about', sk: 'Povedzte kúsok z toho, ako to vzniklo' },
            body: {
                en: 'Along with news of a thing done, tell one part of how it came about: the snag, the choice that mattered. The one who wants reasons then has a real point to ask about, and the work behind the news is seen without anyone having to request praise.',
                sk: 'K správe o hotovej veci pridajte kúsok z toho, ako vznikla: zádrhel, voľbu, na ktorej záležalo. Ten, koho zaujímajú dôvody, má potom na čo sa pýtať, a práca za správou sa ukáže bez toho, aby musel niekto prosiť o uznanie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/recognition|understanding'] },
            sources: ['FAM-004', 'FAM-027'],
        },
        /* processing-pace */
        {
            id: 'fam.step-back-with-a-date',
            title: { en: 'Send word during the pause', sk: 'Ozvi sa aj počas prestávky' },
            body: {
                en: 'While you are thinking a matter over, send one short sign that it is still being held: “Still thinking about it; I haven’t forgotten.” It costs a line and keeps the pause from reading as a closed door. A pause that is marked tends to be easier to wait through than one that is simply quiet.',
                sk: 'Kým o veci premýšľaš, pošli krátke znamenie, že téma stále platí: „Ešte o tom premýšľam, nie je to zabudnuté.“ Stojí to jeden riadok a prestávka potom nepôsobí ako zatvorené dvere. Na ohlásenú prestávku sa zvyčajne čaká ľahšie než na obyčajné ticho.',
            },
            audience: { kind: 'pole', pole: 'introspective' },
            triggers: { dynamic: 'processing-pace', relations: ['opposed', 'one-sided'], mechanisms: ['processing-pace/opposed', 'processing-pace/oneSided:introspective'] },
            sources: ['FAM-021'],
        },
        {
            id: 'fam.write-it-down-then-wait',
            title: { en: 'Write it down, then wait', sk: 'Zapíš si to a počkaj' },
            body: {
                en: 'When a relative asks for time, write down what you want to say so it is not lost, and wait for the agreed day instead of calling again or raising it with the rest of the family. Pressing and pulling back tend to feed each other. Waiting is not giving up the topic; it gives the topic a better hearing.',
                sk: 'Keď si niekto z rodiny vypýta čas, zapíš si, čo máš na srdci, aby sa to nestratilo, a počkaj na určený deň namiesto ďalšieho telefonátu alebo otvárania témy so zvyškom rodiny. Naliehanie a sťahovanie sa zvyčajne navzájom živia. Čakanie neznamená vzdať sa témy; téma sa tak dočká pozornejšieho vypočutia.',
            },
            audience: { kind: 'pole', pole: 'outwardly-engaged' },
            triggers: { dynamic: 'processing-pace', relations: ['opposed'], mechanisms: ['processing-pace/opposed'] },
            sources: ['FAM-021', 'FAM-022'],
        },
        {
            id: 'fam.set-up-the-hard-talk',
            title: { en: 'Set up the hard conversation', sk: 'Pripravte ťažký rozhovor' },
            body: {
                en: 'Choose the moment instead of letting it ambush you: not at a crowded table, not late at night, not when anger is already up. Agree on one topic, a place, an end time, and a pause either of you can call. Anger and family conflict tend to feed each other within the same day, so the hour you choose matters.',
                sk: 'Vyberte si chvíľu namiesto toho, aby vás zaskočila: nie pri plnom stole, nie neskoro večer, nie vtedy, keď už v niekom vrie hnev. Dohodnite sa na jednej téme, mieste, čase konca a na tom, že prestávku môže vyhlásiť ktokoľvek z vás. Hnev a rodinný konflikt sa zvyčajne navzájom živia v priebehu toho istého dňa, preto záleží na tom, akú hodinu si vyberiete.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['shared', 'opposed'], mechanisms: ['processing-pace/shared:outwardly-engaged', 'processing-pace/opposed'] },
            sources: ['FAM-022', 'FAM-021'],
        },
        {
            id: 'fam.say-it-back',
            title: { en: 'Say back what you heard', sk: 'Zopakujte, čo zaznelo' },
            body: {
                en: 'Before answering, say back in one sentence what you heard: “So it’s the timing that bothered you.” Only then add your own view. It slows two quick voices just enough for one to finish before the other begins, and being listened to in this way tends to leave people feeling more understood.',
                sk: 'Skôr než odpoviete, zopakujte jednou vetou, čo zaznelo: „Takže ťa trápi hlavne načasovanie.“ Až potom pridajte vlastný pohľad. Dva rýchle hlasy to spomalí práve natoľko, aby jeden stihol dopovedať, kým začne druhý, a pocit, že niekto naozaj počúval, zvyčajne prináša aj pocit porozumenia.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['shared'], mechanisms: ['processing-pace/shared:outwardly-engaged'] },
            sources: ['FAM-027'],
        },
        {
            id: 'fam.first-word-in-writing',
            title: { en: 'Put the first word in writing', sk: 'Prvé slovo napíšte' },
            body: {
                en: 'If something has been resting between you for a while, open it in writing: a short message that names it and asks for nothing yet. “I’ve been turning something over and I’d like to talk about it when you’re ready.” Writing suits people who settle things inwardly, and an opening that needs no reply tends to be easier to send and to receive.',
                sk: 'Ak medzi vami niečo už dlhšie leží, otvorte to písomne: krátkou správou, ktorá vec pomenuje a zatiaľ nič nežiada. „Jedna vec mi chodí po rozume a chcem sa o tom porozprávať, keď ti to bude vyhovovať.“ Písanie vyhovuje ľuďom, ktorí si veci najprv usporiadajú v sebe, a otvorenie, ktoré nečaká na odpoveď, sa zvyčajne ľahšie posiela aj prijíma.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['shared'], mechanisms: ['processing-pace/shared:introspective'] },
            sources: ['FAM-004'],
        },
        {
            id: 'fam.ask-how-much-time',
            title: { en: 'Ask how much time there is', sk: 'Spýtaj sa, koľko je času' },
            body: {
                en: 'A listener who adapts easily tends to say yes, and asking about the time as well helps that yes stay a real one. Before settling in to talk something through, ask whether now suits: “Have you got a little time, or is tomorrow better?”',
                sk: 'Kto sa ľahko prispôsobí, zvyčajne povie áno, a keď sa spýtaš aj na čas, to áno skôr zostane úprimné. Pred dlhým telefonátom o rodinnej veci sa preto spýtaj, či sa to teraz hodí: „Máš teraz chvíľu, alebo radšej zajtra?“',
            },
            audience: { kind: 'pole', pole: 'outwardly-engaged' },
            triggers: { dynamic: 'processing-pace', relations: ['one-sided'], mechanisms: ['processing-pace/oneSided:outwardly-engaged'] },
            sources: ['FAM-004'],
        },
        {
            id: 'fam.still-open',
            title: { en: 'Say once that a question is still open', sk: 'Raz povedzte, že otázka ešte platí' },
            body: {
                en: 'If a question of yours is waiting while the other takes time, mention once, lightly, that it is still there. Patient waiting can be taken for having nothing to ask, and one light mention keeps the question in view without pressing: “No rush, but what we started on is still open for me.”',
                sk: 'Ak otázka niekoho z vás čaká, kým si druhá strana dá čas, stačí raz a zľahka spomenúť, že ešte platí. Trpezlivé čakanie si niekto môže vysvetliť tak, že sa nie je na čo pýtať, a jedna ľahká zmienka otázku pripomenie bez naliehania: „Nie je to súrne, ale to, čo sme začali, je pre mňa stále otvorené.“',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['one-sided'], mechanisms: ['processing-pace/oneSided:introspective'] },
            sources: ['FAM-021'],
        },
        /* change-and-steadiness */
        {
            id: 'fam.tell-it-early',
            title: { en: 'Tell the news early, in person', sk: 'Povedz novinku včas a osobne' },
            body: {
                en: 'When you are about to change something that touches the family, a move, a new partner, a different way of spending the holidays, tell the relatives most affected early and directly, before the news arrives by another route. Leave room for a first reaction that is worried rather than glad. News heard second-hand can sting more than the change itself.',
                sk: 'Keď chystáš zmenu, ktorá sa dotkne blízkych, sťahovanie, nového partnera, iné trávenie sviatkov, oznám to včas a osobne tým, koho sa to týka priamo, skôr než sa k nim novinka dostane inou cestou. Nechaj priestor aj pre prvú reakciu, ktorá je skôr ustarostená než radostná. Dozvedieť sa to z druhej ruky môže zabolieť viac než samotná zmena.',
            },
            audience: { kind: 'pole', pole: 'novelty-seeking' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['opposed', 'one-sided'], mechanisms: ['change-and-steadiness/opposed', 'change-and-steadiness/oneSided:novelty-seeking'] },
            sources: ['FAM-023', 'FAM-004'],
        },
        {
            id: 'fam.say-what-you-would-miss',
            title: { en: 'Say what you would miss', sk: 'Povedz, čo by ti chýbalo' },
            body: {
                en: 'When a relative changes course, try saying what you are afraid of losing, “I’ll miss the way we used to do the holidays”, instead of arguing with the choice. The decision belongs to the person whose life it is; the sense of loss is yours, and both can be true at once. Naming the loss can open a conversation about what can be kept.',
                sk: 'Keď príbuzný zmení smer, skús namiesto spochybňovania rozhodnutia povedať, čoho sa bojíš, že stratíš: „Bude mi chýbať, ako sme trávili sviatky.“ Rozhodnutie patrí človeku, o ktorého život ide; pocit straty patrí tebe a oboje môže platiť naraz. Pomenovaná strata môže otvoriť rozhovor o tom, čo sa dá zachovať.',
            },
            audience: { kind: 'pole', pole: 'stability-seeking' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['opposed'], mechanisms: ['change-and-steadiness/opposed'] },
            sources: ['FAM-013', 'FAM-020'],
        },
        {
            id: 'fam.still-suit',
            title: { en: 'Ask whether the usual still suits', sk: 'Spýtaj sa, či to zvyčajné ešte vyhovuje' },
            body: {
                en: 'Now and then, ask the other whether the usual way still works, and make it easy to say no: “Is Sunday still good for you, or only good for me?” Someone who bends easily may not raise it unasked. An arrangement checked once in a while is less likely to end in a sudden demand.',
                sk: 'Občas sa druhej strany spýtaj, či zvyčajný spôsob ešte vyhovuje, a daj najavo, že aj odpoveď „nie“ je v poriadku: „Hodí sa ti nedeľa ešte, alebo už len mne?“ Kto sa ľahko prispôsobí, často to bez opýtania neotvorí. Dohoda, ktorá sa raz za čas preverí, sa menej často skončí náhlou požiadavkou.',
            },
            audience: { kind: 'pole', pole: 'stability-seeking' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['one-sided'], mechanisms: ['change-and-steadiness/oneSided:stability-seeking'] },
            sources: ['FAM-002', 'FAM-001'],
        },
        {
            id: 'fam.talk-it-through-ahead',
            title: { en: 'Talk about the change that is coming', sk: 'Porozprávajte sa o zmene, ktorá príde' },
            body: {
                en: 'Pick one shift you can see coming, a relative needing more help or a move, and go through it while it is still ahead: what would each of you want kept, and what could give? Two people who like things as they are can find a shift settled by default, so talking early leaves more of it to choice.',
                sk: 'Vyberte jednu zmenu, ktorú vidíte prichádzať, napríklad sťahovanie alebo to, že príbuzný bude potrebovať viac pomoci, a kým je ešte pred vami, prejdite si spolu: čo chce každý z vás zachovať a čoho sa dá vzdať? Ak vám vyhovujú veci tak, ako sú, zmena môže nakoniec prísť bez vášho rozhodnutia; keď sa o tom porozprávate včas, viac bude závisieť od vás.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['shared'], mechanisms: ['change-and-steadiness/shared:stability-seeking'] },
            sources: ['FAM-030', 'FAM-005'],
        },
        {
            id: 'fam.ritual-that-asks-little',
            title: { en: 'A ritual that asks little', sk: 'Rituál, ktorý veľa nežiada' },
            body: {
                en: 'Make the fixed point light enough to keep: a short call on Sundays, a photo at the start of each month, the same café once a season. Keep it short, protect it from heavy topics, and agree that missing one does not end it. Feeling close, and being able to give as well as receive, tends to matter more than how often people meet.',
                sk: 'Nech je pevný bod taký ľahký, aby sa dal udržať: krátky telefonát v nedeľu, fotka na začiatku mesiaca, tá istá kaviareň raz za sezónu. Nech je krátky, chráňte tento zvyk pred ťažkými témami a dohodnite sa, že jedno vynechanie neznamená koniec. Pocit blízkosti a možnosť nielen dostávať, ale aj dávať, zvyčajne znamenajú viac než to, ako často sa ľudia vidia.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['shared'], mechanisms: ['change-and-steadiness/shared:novelty-seeking'] },
            sources: ['FAM-016', 'FAM-008', 'FAM-005'],
        },
        /* social-energy (file order matters: the cards for opposed:private come before the ones for every opposed form) */
        {
            id: 'fam.say-how-far',
            title: { en: 'Say how far the news may go', sk: 'Povedzte, kam až môže novinka ísť' },
            body: {
                en: 'When you tell a relative something, say in the same breath how far it may travel: “This is just for you for now,” or “Tell whoever you like.” A plain word about where news may go spares the other a guess. Being able to choose who hears first tends to keep closeness from feeling crowded.',
                sk: 'Keď niekomu z rodiny niečo zveríte, dodajte jedným dychom, kam to smie ísť ďalej: „Toto je zatiaľ len pre teba“ alebo „Pokojne to rozšír.“ Jasné slovo o tom, kam správa smie putovať, ušetrí druhú stranu hádania. Keď si človek môže vybrať poradie, v akom sa veci šíria, blízkosť zvyčajne nepôsobí stiesňujúco.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'social-energy', relations: ['opposed', 'shared'], mechanisms: ['social-energy/opposed:private', 'social-energy/shared:social'] },
            sources: ['FAM-019', 'FAM-004'],
        },
        {
            id: 'fam.ask-before-sharing-news',
            title: { en: 'Ask before passing news on', sk: 'Pred šírením noviniek sa spýtaj' },
            body: {
                en: 'Before telling the wider family a relative’s news, a pregnancy, an illness, a separation, ask first: “Is this mine to share, and with whom?” Let the answer stand without persuading. News passed on before its owner was ready can feel like losing the right to tell it oneself, however kindly it was meant.',
                sk: 'Skôr než rozneseš správu, ktorá patrí príbuznému, tehotenstvo, chorobu, rozchod, spýtaj sa: „Môžem to rozšíriť, a komu?“ Odpoveď prijmi bez presviedčania. Správa, ktorú niekto rozpovie skôr, než je pripravený ten, koho sa týka, môže pôsobiť ako strata práva oznámiť to vlastnými slovami, aj keď to bolo myslené dobre.',
            },
            audience: { kind: 'pole', pole: 'social' },
            triggers: { dynamic: 'social-energy', relations: ['opposed', 'shared'], mechanisms: ['social-energy/opposed:private', 'social-energy/shared:social'] },
            sources: ['FAM-019', 'FAM-004'],
        },
        {
            id: 'fam.come-for-the-meal',
            title: { en: 'Come for the meal, leave before evening', sk: 'Prísť na obed, odísť pred večerom' },
            body: {
                en: 'If you go to a big gathering, decide your own shape in advance: arrive for the meal, step out for a walk midway, leave at an hour you mention when you arrive. Saying it at the start keeps the exit from looking like a protest. A shape you can keep to is a full way of taking part, as much as staying the whole evening.',
                sk: 'Ak ideš na veľké stretnutie, vopred si urči vlastnú podobu: príď na obed, uprostred si daj prechádzku a odíď v hodine, ktorú spomenieš hneď pri príchode. Keď to povieš na začiatku, odchod nepôsobí ako protest. Účasť v podobe, ktorú vieš dodržať, je rovnako plnohodnotná ako celý večer.',
            },
            audience: { kind: 'pole', pole: 'private' },
            triggers: { dynamic: 'social-energy', relations: ['opposed', 'one-sided'], mechanisms: ['social-energy/opposed', 'social-energy/oneSided:private'] },
            sources: ['FAM-016'],
        },
        {
            id: 'fam.count-the-short-visit',
            title: { en: 'Count the visit that happened', sk: 'Teš sa z návštevy, ktorá bola' },
            body: {
                en: 'When the other comes for part of an occasion, or would rather walk with you than sit at the full table, thank the visit that happened instead of mentioning the part that did not: “Good to see you. Shall we do the walk again?” A smaller form of contact, counted as a whole one, tends to be easier to offer again.',
                sk: 'Keď príde len na časť stretnutia alebo uprednostní prechádzku pred plným stolom, poďakuj za návštevu, ktorá bola, a nespomínaj tú časť, ktorá nebola: „Bolo fajn vidieť sa. Zopakujeme si tú prechádzku?“ Keď sa menšia podoba kontaktu berie ako plnohodnotná, zvyčajne sa ľahšie ponúkne znova.',
            },
            audience: { kind: 'pole', pole: 'social' },
            triggers: { dynamic: 'social-energy', relations: ['opposed'], mechanisms: ['social-energy/opposed'] },
            sources: ['FAM-016', 'FAM-002'],
        },
        {
            id: 'fam.invite-in-two-sizes',
            title: { en: 'Invite in two sizes', sk: 'Pozývaj v dvoch podobách' },
            body: {
                en: 'When you invite, offer two sizes and mean both: “Come for the whole day, or just for lunch, whichever suits.” A yes chosen from two sizes tells you more than a yes to one. An easy-going relative may not ask for the smaller version, so offering it does the asking.',
                sk: 'Keď pozývaš, ponúkni dve veľkosti a mysli to vážne s každou: „Príď na celý deň alebo len na obed, ako chceš.“ Áno vybrané z dvoch možností povie viac než áno na jedinú. Kto sa ľahko prispôsobí, o kratšiu verziu často nepožiada, a ponuka tú otázku položí za druhú stranu.',
            },
            audience: { kind: 'pole', pole: 'social' },
            triggers: { dynamic: 'social-energy', relations: ['one-sided'], mechanisms: ['social-energy/oneSided:social'] },
            sources: ['FAM-016', 'FAM-002'],
        },
        {
            id: 'fam.shape-of-the-visit',
            title: { en: 'Choose the shape of the visit', sk: 'Vyberte podobu návštevy' },
            body: {
                en: 'Ask each other whether the present amount of contact feels too much, too little or about right; there is no correct level, only one that suits these two people. Agree a mix rather than settling it invitation by invitation: some big occasions, some time with just the two of you. A visit both can enjoy tends to do more for closeness than several that one of them endures.',
                sk: 'Spýtajte sa navzájom, či súčasná miera kontaktu pôsobí ako priveľa, primálo alebo tak akurát; správna úroveň neexistuje, len taká, ktorá vyhovuje práve vám. Namiesto riešenia každého pozvania zvlášť sa dohodnite na kombinácii: niekoľko veľkých príležitostí, niekoľko stretnutí medzi štyrmi očami. Návšteva, ktorú si užije každý z vás, zvyčajne prinesie viac blízkosti než niekoľko návštev, ktoré niekto len pretrpí.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'social-energy', relations: ['one-sided'], mechanisms: ['social-energy/oneSided:social'] },
            sources: ['FAM-002', 'FAM-003', 'FAM-016'],
        },
        {
            id: 'fam.quiet-forms-of-contact',
            title: { en: 'Keep in touch in a quiet form', sk: 'Udržiavajte kontakt v tichšej podobe' },
            body: {
                en: 'For a relative you would like to keep up with, choose a form that suits two quiet people: a card at a birthday, a photo now and then, a short visit to one person rather than the whole gathering. Contact need not be frequent to matter. Feeling close tends to count for more than how often people meet.',
                sk: 'Ak chcete s niekým z rodiny zostať v spojení, vyberte si podobu vhodnú pre dve tichšie povahy: pohľadnicu k narodeninám, občas fotku, krátku návštevu u jedného človeka namiesto celého stretnutia. Spojenie nemusí byť časté, aby malo význam. Pocit blízkosti zvyčajne znamená viac než to, ako často sa ľudia vidia.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'social-energy', relations: ['shared'], mechanisms: ['social-energy/shared:private'] },
            sources: ['FAM-016', 'FAM-031'],
        },
        {
            id: 'fam.what-the-go-between-carries',
            title: { en: 'Say what you are willing to carry', sk: 'Koľko z toho niesť a koľko už nie' },
            body: {
                en: 'If you are the one who passes news and explanations along, say what you are glad to carry and what you would rather not. A go-between who names the load is easier to thank, and less likely to be left with all of it. A sentence is enough: “I’m happy to pass on the dates; the explanations are yours to give.”',
                sk: 'Ak niekto z vás odovzdáva novinky a vysvetlenia ďalej, nech povie, čo sa dá zniesť a čo už je priveľa. Sprostredkovateľovi, ktorý pomenuje svoju záťaž, sa ľahšie poďakuje a záťaž sa ľahšie rozdelí. Stačí jedna veta: „Termíny pokojne odovzdám, vysvetlenia sú na tebe.“',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'social-energy', relations: ['one-sided'], mechanisms: ['social-energy/oneSided:private'] },
            sources: ['FAM-004'],
        },
        /* reasoning-style */
        {
            id: 'fam.meaning-before-correction',
            title: { en: 'Ask what it meant before correcting it', sk: 'Spýtaj sa na význam, než budeš opravovať' },
            body: {
                en: 'When a relative tells a family story differently from how you remember it, hold the correction and ask first: “What did that mean for you?” Put what you heard into your own words before offering any facts. The detail can come later if it still matters; a sense of being understood tends to open the way for it.',
                sk: 'Keď príbuzný rozpráva rodinný príbeh inak, než znie tvoja spomienka, odlož opravu a najprv sa spýtaj: „Čo to pre teba znamenalo?“ Skôr než prídu fakty, povedz vlastnými slovami, čo počuješ. Detail môže prísť neskôr, ak bude ešte dôležitý; keď sa človek cíti pochopený, cesta k detailu sa zvyčajne otvorí sama.',
            },
            audience: { kind: 'pole', pole: 'analytical' },
            triggers: { dynamic: 'reasoning-style', relations: ['opposed', 'one-sided'], mechanisms: ['reasoning-style/opposed', 'reasoning-style/oneSided:analytical'] },
            sources: ['FAM-027', 'FAM-028'],
        },
        {
            id: 'fam.give-the-sense-a-reason',
            title: { en: 'Give the hunch a reason', sk: 'Daj tušeniu dôvod' },
            body: {
                en: 'When you sense what is really going on in the family, offer it as an impression, not a fact. Give one concrete reason: “I might be wrong, but the calls seem shorter lately.” Then ask whether it looks the same from the other side. Relatives often see the same pattern differently, and a reason gives the other person something to answer.',
                sk: 'Keď ti niečo napovie, čo sa medzi blízkymi deje, ponúkni to ako dojem, nie ako fakt, a s jedným konkrétnym dôvodom: „Možno sa mýlim, ale telefonáty sú v poslednom čase kratšie.“ Potom zisti, či to z druhej strany vyzerá podobne. Ten istý vzorec môže každý vidieť inak a dôvod dáva druhej strane niečo, na čo môže odpovedať.',
            },
            audience: { kind: 'pole', pole: 'intuitive' },
            triggers: { dynamic: 'reasoning-style', relations: ['opposed', 'one-sided', 'shared'], mechanisms: ['reasoning-style/opposed', 'reasoning-style/oneSided:intuitive', 'reasoning-style/shared:intuitive'] },
            sources: ['FAM-012', 'FAM-004'],
        },
        {
            id: 'fam.fair-as-well-as-right',
            title: { en: 'Check whether it feels fair, too', sk: 'Over aj to, či to pôsobí spravodlivo' },
            body: {
                en: 'When an arrangement is settled, ask a second question beside “is it right?”: “Does it feel fair to you, given everything?” An arrangement can be exact and still feel uneven to the one with more at stake. Whether something feels fair can matter in a family as much as whether it is equal.',
                sk: 'Keď je dohoda uzavretá, položte popri otázke „je to správne?“ ešte jednu: „Pôsobí ti to spravodlivo, keď zvážiš všetko?“ Dohoda môže byť presná, a predsa sa môže zdať nevyvážená tomu, kto má v hre viac. To, či niečo pôsobí spravodlivo, môže v rodine znamenať rovnako veľa ako to, či je to rovnaké.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'reasoning-style', relations: ['shared'], mechanisms: ['reasoning-style/shared:analytical'] },
            sources: ['FAM-009', 'FAM-010'],
        },
        {
            id: 'fam.facts-and-feelings-apart',
            title: { en: 'Facts on one page, feelings in another talk', sk: 'Fakty na papier, city do iného rozhovoru' },
            body: {
                en: 'For a weighty family decision, about care or money, put the facts on one page both can see: costs, dates, who agreed to what. Keep a separate conversation for how it all feels. Naming what a dispute is really about, time, money or roles, can show that it is smaller than it sounded.',
                sk: 'Pri závažnom rodinnom rozhodnutí, o starostlivosti či peniazoch, dajte fakty na jeden papier, ktorý vidí každý z vás: náklady, termíny, kto s čím súhlasil. Pre to, ako to celé prežívate, si nechajte samostatný rozhovor. Keď sa pomenuje, o čo v spore naozaj ide, či o čas, peniaze alebo roly, môže sa ukázať, že spor je menší, než sa zdal.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'reasoning-style', relations: ['one-sided'], mechanisms: ['reasoning-style/oneSided:analytical'] },
            sources: ['FAM-005'],
        },
        /* structure-and-flexibility */
        {
            id: 'fam.say-which-dates-matter',
            title: { en: 'Say which dates matter, and why', sk: 'Povedz, na ktorých dátumoch ti záleží a prečo' },
            body: {
                en: 'If an open plan leaves you waiting, ask for one fixed point rather than asking again and again. A reason given once tends to be easier to meet than a repeated question, so when a date matters to you, say why: “I’d like to keep the Saturday; it’s the day I can plan around.”',
                sk: 'Ak ťa plán bez dátumu drží v neistote, popros o jeden pevný bod namiesto opakovaného pýtania. Dôvod vyslovený raz sa zvyčajne ľahšie rešpektuje než otázka, ktorá sa stále vracia, a tak keď je pre teba dátum dôležitý, vysvetli prečo: „Tú sobotu si chcem držať, lebo okolo tohto dňa plánujem.“',
            },
            audience: { kind: 'pole', pole: 'structured' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['opposed'], mechanisms: ['structure-and-flexibility/opposed'] },
            sources: ['FAM-002', 'FAM-004'],
        },
        {
            id: 'fam.open-with-one-fixed-point',
            title: { en: 'Open plans with one fixed point', sk: 'Otvorený plán s jedným pevným bodom' },
            body: {
                en: 'Keep the rest open if that suits you, and give the other one fixed point to stand on: the day, or the hour by which you will know. If a date has to move, say so early and offer the next one in the same message. Flexibility with a few fixed points tends to sit better in a family than all or nothing.',
                sk: 'Ak ti voľný plán vyhovuje, ponúkni aj tak jeden bod, o ktorý sa dá oprieť: deň alebo aspoň hodinu, do ktorej sa rozhodneš. Keď sa dátum musí posunúť, ozvi sa včas a v tej istej správe navrhni nový. Pružnosť s niekoľkými istými bodmi sa v rodine zvyčajne znáša lepšie než jedna či druhá krajnosť.',
            },
            audience: { kind: 'pole', pole: 'adaptable' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['opposed', 'one-sided'], mechanisms: ['structure-and-flexibility/opposed', 'structure-and-flexibility/oneSided:adaptable'] },
            sources: ['FAM-002'],
        },
        {
            id: 'fam.share-the-calendar',
            title: { en: 'Put the family dates where both can see them', sk: 'Rodinné dátumy na jedno miesto' },
            body: {
                en: 'Keep the family dates, birthdays, visits, the occasions that recur, in one place both of you can see, a shared calendar or a note on the fridge, so that knowing what is due is not one person’s job. The one who keeps the dates can then stop being the only reminder. A calendar both can read is easier to share out later.',
                sk: 'Dajte dôležité dátumy, oslavy, návštevy, pravidelné príležitosti, na jedno miesto, ktoré vidí každý z vás, do spoločného kalendára alebo na lístok na chladničke, aby vedieť, čo sa blíži, nebolo úlohou jedného človeka. Ten, kto dátumy stráži, tak už nie je jedinou pripomienkou. Kalendár, ktorý vidia dvaja, sa neskôr aj ľahšie rozdelí.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['one-sided'], mechanisms: ['structure-and-flexibility/oneSided:structured'] },
            sources: ['FAM-002'],
        },
        {
            id: 'fam.one-loose-date',
            title: { en: 'One plan held loosely, on purpose', sk: 'Jeden plán zámerne voľne' },
            body: {
                en: 'Choose one regular occasion and hold it loosely on purpose, a visit some weekend in spring rather than on a set day, so that both get practice at a plan that can move. A tie that can bend in small things tends to find it easier to bend when life asks for a bigger change.',
                sk: 'Pri jednej pravidelnej príležitosti si zámerne nechajte voľnosť, napríklad návštevu niektorý víkend na jar namiesto pevného dňa, aby ste si vyskúšali plán, ktorý sa môže posunúť. Puto, ktoré sa vie prispôsobiť v malom, sa zvyčajne ľahšie prispôsobí, aj keď život prinesie väčšiu zmenu.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['shared'], mechanisms: ['structure-and-flexibility/shared:structured'] },
            sources: ['FAM-002'],
        },
        {
            id: 'fam.a-line-after-a-while',
            title: { en: 'A line when it has been a while', sk: 'Pár slov, keď je to už dlhšie' },
            body: {
                en: 'When you notice it has been a while and would like to meet, send a short line with no plan attached: “Thinking of you. Let’s find a day when it suits.” With nothing fixed between you, a small signal is what shows that the wish to meet is still there. Quiet stretches between relatives are common and need not mean the tie is fading.',
                sk: 'Keď si všimnete, že je to už dlhšie, a chcete sa stretnúť, pošlite pár slov bez konkrétneho plánu: „Myslím na teba. Nájdime si deň, keď sa to bude hodiť.“ Keď medzi vami nie je nič pevné, práve malý signál ukáže, že chuť stretnúť sa trvá. Tichšie obdobia medzi príbuznými sú bežné a nemusia znamenať, že puto slabne.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['shared'], mechanisms: ['structure-and-flexibility/shared:adaptable'] },
            sources: ['FAM-005', 'FAM-016'],
        },
        /* risk-and-caution */
        {
            id: 'fam.ask-what-was-weighed',
            title: { en: 'Ask what has been weighed', sk: 'Spýtaj sa, čo už je zvážené' },
            body: {
                en: 'Before raising a worry about a relative’s plan, ask what has been thought through already: “What have you looked at so far?” Then add only what seems missing, once. A worry that answers the plan as it stands tends to be heard as help rather than as doubt.',
                sk: 'Skôr než vyslovíš obavu z plánu príbuzného, spýtaj sa, čo už je premyslené: „Čo všetko už máš premyslené?“ Potom pridaj len to, čo ešte chýba, a len raz. Obava, ktorá nadväzuje na plán tak, ako je, zvyčajne zaznie ako pomoc, nie ako pochybnosť.',
            },
            audience: { kind: 'pole', pole: 'cautious' },
            triggers: { dynamic: 'risk-and-caution', relations: ['opposed', 'one-sided'], mechanisms: ['risk-and-caution/opposed', 'risk-and-caution/oneSided:cautious'] },
            sources: ['FAM-020', 'FAM-001'],
        },
        {
            id: 'fam.invite-one-worry',
            title: { en: 'Invite one worry on purpose', sk: 'Pozvi jednu obavu zámerne' },
            body: {
                en: 'When you share a plan, ask for one concern on purpose: “What’s the one thing you’d want me to check?” A worry that was invited arrives as advice, not as supervision, and it reaches you while the plan can still use it. Asking also leaves the decision where it was, with you.',
                sk: 'Keď sa delíš o plán, zámerne popros o jednu obavu: „Čo je tá jedna vec, ktorú by bolo dobré preveriť?“ Obava, o ktorú si niekto požiadal, prichádza ako rada, nie ako dozor, a príde vtedy, keď sa plán ešte dá upraviť. Rozhodnutie pritom zostáva tam, kde bolo, u teba.',
            },
            audience: { kind: 'pole', pole: 'risk-oriented' },
            triggers: { dynamic: 'risk-and-caution', relations: ['opposed', 'one-sided'], mechanisms: ['risk-and-caution/opposed', 'risk-and-caution/oneSided:risk-oriented'] },
            sources: ['FAM-001', 'FAM-020'],
        },
        {
            id: 'fam.agree-the-fallback',
            title: { en: 'Agree the fallback first', sk: 'Najprv sa dohodnite, čo ak to nevyjde' },
            body: {
                en: 'If money or a joint plan ever becomes part of the tie, agree in a sentence what happens if the plan fails: who carries what, and that the tie itself is not part of the stake. Writing it down can feel formal between relatives. It can also keep a loss from turning into a quarrel about who owes whom.',
                sk: 'Ak sa súčasťou puta niekedy stanú peniaze alebo spoločný plán, dohodnite sa jednou vetou, čo sa stane, ak to nevyjde: kto ponesie čo a že samotné puto nie je v stávke. Spísať to môže medzi príbuznými pôsobiť formálne. Zároveň to môže zabrániť, aby sa zo straty stal spor o to, kto komu dlhuje.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'risk-and-caution', relations: ['shared'], mechanisms: ['risk-and-caution/shared:risk-oriented'] },
            sources: ['FAM-005'],
        },
        {
            id: 'fam.one-for-one',
            title: { en: 'One reason for, beside each reason against', sk: 'Ku každej obave aj jeden dôvod za' },
            body: {
                en: 'When the two of you are weighing a choice, set one reason in favour beside each worry, even a small one. A list with two sides shows a reasonable option at its real size. If the choice concerns a relative, that person’s own reasons belong on the list too.',
                sk: 'Keď spolu zvažujete nejakú voľbu, ku každej obave pridajte jeden dôvod za, hoci aj malý. Zoznam s dvoma stranami ukáže rozumnú možnosť bez zveličenia. Ak sa voľba týka príbuzného, na zoznam patria aj dôvody toho, koho sa týka.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'risk-and-caution', relations: ['shared'], mechanisms: ['risk-and-caution/shared:cautious'] },
            sources: ['FAM-004'],
        },
        /* practical-and-conceptual */
        {
            id: 'fam.hear-the-story',
            title: { en: 'Hear the larger side as the point', sk: 'Ber väčší obraz ako podstatu, nie ako zdržanie' },
            body: {
                en: 'When the other brings the larger side of a family matter, the story behind it, what it means, treat that as the point and not the delay: ask about it once, “What does it mean to you?”, and hear the whole answer. People who are listened to tend to feel more understood than people who are handed a solution.',
                sk: 'Keď druhá strana prinesie väčší obraz rodinnej veci, príbeh v pozadí, to, čo celé znamená, ber to ako podstatu, nie ako zdržanie: raz sa na to spýtaj, „Čo to pre teba znamená?“, a vypočuj celú odpoveď. Ľudia, ktorých niekto naozaj počúva, sa zvyčajne cítia pochopenejší než tí, ktorým niekto ponúkne hotové riešenie.',
            },
            audience: { kind: 'pole', pole: 'practical' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['opposed', 'one-sided'], mechanisms: ['practical-and-conceptual/opposed', 'practical-and-conceptual/oneSided:practical'] },
            sources: ['FAM-027'],
        },
        {
            id: 'fam.answer-the-practical-question',
            title: { en: 'Take the how-much question as interest', sk: 'Ber otázku „koľko to stojí“ ako záujem' },
            body: {
                en: 'When the other answers your idea with a how-much or a who-drives, take it as a way of taking the idea seriously, and give one plain answer before going back to the larger point. A plain answer shows that both kinds of interest were heard.',
                sk: 'Keď druhá strana odpovie na tvoj nápad otázkou, koľko to bude stáť alebo kto bude šoférovať, ber to ako prejav toho, že nápad berie vážne, a daj jednu jasnú odpoveď, skôr než sa vrátiš k väčšej myšlienke. Jasná odpoveď ukáže, že ste počuli oba druhy záujmu.',
            },
            audience: { kind: 'pole', pole: 'conceptual' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['opposed'], mechanisms: ['practical-and-conceptual/opposed'] },
            sources: ['FAM-027', 'FAM-004'],
        },
        {
            id: 'fam.let-one-task-be-slow',
            title: { en: 'Let one task be slow', sk: 'Nech je jedna úloha pomalá' },
            body: {
                en: 'If a visit is mostly tasks, let one of them be slow, the walk to the shop, the washing-up, the drive home, and let the talk wander while it lasts. Some people say more side by side than across a table. A conversation that needs no outcome has a place inside the work too.',
                sk: 'Ak je návšteva najmä o úlohách, nech je jedna z nich pomalá, cesta do obchodu, umývanie riadu, cesta domov, a nech sa rozhovor medzitým túla, kam chce. Niektorí ľudia povedia viac popri práci než pri stole oproti sebe. Rozhovor, z ktorého nemusí nič vzísť, má miesto aj uprostred práce.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['shared'], mechanisms: ['practical-and-conceptual/shared:practical'] },
            sources: ['FAM-004'],
        },
        {
            id: 'fam.put-a-date-in',
            title: { en: 'Put the date in before you hang up', sk: 'Dátum zapíšte ešte počas rozhovoru' },
            body: {
                en: 'If a visit or a form keeps being talked about, settle the date before the call ends: take out the calendar and put it in while you are both still there. A matter with a date on it no longer has to be talked about to stay alive, and the good talk is left free for what it does best.',
                sk: 'Ak sa o návšteve či tlačive stále len hovorí, určte dátum ešte pred koncom telefonátu: vytiahnite kalendár a zapíšte dátum hneď, kým ste spolu na linke. Vec, ktorá má dátum, už netreba udržiavať pri živote rozhovorom, a dobrý rozhovor tak zostane voľný pre to, v čom je najlepší.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['shared'], mechanisms: ['practical-and-conceptual/shared:conceptual'] },
            sources: ['FAM-004'],
        },
        {
            id: 'fam.ask-what-it-took',
            title: { en: 'Ask what it took to make it happen', sk: 'Spýtaj sa, čo to dalo za prácu' },
            body: {
                en: 'When an idea of yours has turned into something done, ask the other what it took: the calls, the dates, the small arranging. Then thank the part you did not see. Work that turns a plan into a fact is easy to miss, and naming it once keeps it from becoming one person’s quiet job.',
                sk: 'Keď sa tvoj nápad zmení na niečo hotové, spýtaj sa druhej strany, čo to dalo za prácu: telefonáty, termíny, drobné zariaďovanie. Potom poďakuj za tú časť, ktorú nebolo vidieť. Prácu, ktorá z plánu urobí skutočnosť, je ľahké prehliadnuť, a keď sa raz pomenuje, nestane sa tichou úlohou jedného človeka.',
            },
            audience: { kind: 'pole', pole: 'conceptual' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['one-sided'], mechanisms: ['practical-and-conceptual/oneSided:conceptual'] },
            sources: ['FAM-030', 'FAM-004'],
        },
        /* shared-pull */
        {
            id: 'fam.carers-need-care-too',
            title: { en: 'The carers need looking after too', sk: 'Aj tí, čo sa starajú, potrebujú oporu' },
            body: {
                en: 'When both of you are caring for the same person, agree on one way each will be looked after too: a free afternoon a week, a relative or a service that takes a shift, someone outside the family to talk to. Strain builds quietly in people who care for someone frail, and respite and a wider circle of support are sensible, not a failure.',
                sk: 'Keď sa každý z vás stará o toho istého človeka, dohodnite sa, čo pomôže aj vám dvom: voľné popoludnie týždenne, príbuzný alebo služba, ktorá prevezme zmenu, rozhovor s človekom zvonka. Záťaž sa v ľuďoch, ktorí sa starajú o krehkého človeka, hromadí potichu a oddych či širší okruh podpory sú rozumné, nie zlyhanie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], poles: ['care'], mechanisms: ['shared-pull/shared:care'] },
            sources: ['FAM-029', 'FAM-036'],
        },
        {
            id: 'fam.meet-on-shared-ground',
            title: { en: 'Meet on what you share', sk: 'Stretnite sa pri tom, čo zdieľate' },
            body: {
                en: 'Build contact around what you have in common rather than around the family’s difficult topics: the garden, the match, the old recipes, the walk. Keep it light and regular, and let it stay that way. A small, warm thread of shared interest tends to keep a family tie going without asking anyone to reopen anything.',
                sk: 'Postavte kontakt na tom, čo vás spája, nie na ťažkých rodinných témach: záhrada, zápas, staré recepty, prechádzka. Nech je to ľahké a pravidelné a nech to tak aj zostane. Malý spoločný záujem zvyčajne udrží rodinné puto bez toho, aby niekto musel čokoľvek znova otvárať.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], mechanisms: ['shared-pull/shared:mastery', 'shared-pull/shared:beauty'] },
            sources: ['FAM-008', 'FAM-016'],
        },
        {
            id: 'fam.one-real-question',
            title: { en: 'One real question about what the other holds to', sk: 'Jedna skutočná otázka o tom, čo je pre druhého dôležité' },
            body: {
                en: 'Next time you meet, ask one genuine question about what the other holds to, a faith, a cause, an idea of home, and listen to the answer without steering it back to your own view. Interest does not require agreement. Differences in what people hold to are a common source of tension between relatives, and room to explain a point of view can ease it.',
                sk: 'Keď sa nabudúce stretnete, položte jednu úprimnú otázku o tom, čo je pre druhého človeka dôležité, viera, poslanie, predstava domova, a počúvajte odpoveď bez stáčania k vlastnému pohľadu. Záujem nevyžaduje súhlas. Rozdielne presvedčenia patria k častým zdrojom napätia medzi príbuznými a priestor vysvetliť svoj pohľad môže napätie zmierniť.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], poles: ['meaning'], mechanisms: ['shared-pull/shared:meaning'] },
            sources: ['FAM-023', 'FAM-018'],
        },
        {
            id: 'fam.talk-as-if-present',
            title: { en: 'Speak of an absent relative as if present', sk: 'Hovorte o neprítomných tak, ako by boli pri tom' },
            body: {
                en: 'Agree a simple rule for talking about a relative who is not there: say nothing about them that you would not be willing to say to them kindly. A theory about why a relative acts a certain way can stay a guess, and the relative’s own account, if it ever comes, gets the last word.',
                sk: 'Dohodnite sa na pravidle pre reči o niekom z rodiny, kto pri tom nie je: nehovoriť nič, čo by ste nevedeli láskavo zopakovať aj do očí. Teória o tom, čo toho človeka vedie, môže ostať dohadom a posledné slovo patrí tomu, o koho ide, ak sa niekedy ozve.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], poles: ['understanding'], mechanisms: ['shared-pull/shared:understanding'] },
            sources: ['FAM-004'],
        },
        {
            id: 'fam.let-good-news-have-its-day',
            title: { en: 'Let good news have its own day', sk: 'Nech má dobrá správa svoj deň' },
            body: {
                en: 'When the other shares good news, mark it on its own terms: a message, a meal, a sentence that names what it took. Keep any news of your own for another day. Rivalry and support often live side by side between relatives, and a day that belongs to one person keeps the support in front.',
                sk: 'Keď sa jeden z vás pochváli niečím dobrým, oslávte to po svojom: pár slovami, jedlom, vetou, ktorá pomenuje, čo to stálo. S vlastnými novinkami počkajte na iný deň. Súperenie a podpora medzi príbuznými často existujú vedľa seba a deň, ktorý patrí jednému, drží v popredí podporu.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], poles: ['achievement'], mechanisms: ['shared-pull/shared:achievement'] },
            sources: ['FAM-005'],
        },
        {
            id: 'fam.come-as-you-are',
            title: { en: 'Invite without asking for the old part', sk: 'Pozvanie bez nároku na starú rolu' },
            body: {
                en: 'When you invite the other to something that is not quite the other’s thing, say what you are not asking for. An invitation that leaves room for who someone is now is easier to accept without feeling pulled back into an old part: “Come as you like, and stay as long as it suits you.”',
                sk: 'Keď pozývate na niečo, čo druhej strane nie je celkom blízke, povedzte, o čo nežiadate. Pozvanie, ktoré necháva priestor na to, kým je človek dnes, sa ľahšie prijme bez pocitu návratu do starej roly: „Príď, ako ti je pohodlné, a zostaň, koľko ti bude vyhovovať.“',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], poles: ['self-expression'], mechanisms: ['shared-pull/shared:self-expression'] },
            sources: ['FAM-019', 'FAM-001'],
        },
        {
            id: 'fam.disagree-and-stay',
            title: { en: 'Disagree in a sentence, and stay', sk: 'Nesúhlasiť jednou vetou a zostať' },
            body: {
                en: 'When you see a family matter differently, say it in one sentence and stay in the conversation. Holding a view of one’s own while staying connected is linked with better family relationships, and a brief sentence keeps the difference from sounding like a split: “I see it another way, and I’m still with you.”',
                sk: 'Keď vidíte rodinnú vec inak, povedzte to jednou vetou a zostaňte v rozhovore. Mať vlastný názor a pritom zostať v spojení súvisí s lepšími vzťahmi v rodine a krátka veta zabráni, aby rozdiel znel ako roztržka: „Vidím to inak, a predsa som na tvojej strane.“',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], poles: ['belonging'], mechanisms: ['shared-pull/shared:belonging'] },
            sources: ['FAM-001'],
        },
        {
            id: 'fam.an-ordinary-first-move',
            title: { en: 'Make the first move an ordinary one', sk: 'Nech je prvý krok obyčajný' },
            body: {
                en: 'When you get in touch after a while, keep it ordinary: no apology for the gap and nothing that needs an answer by a certain time. “Saw this and thought of you.” A light first move is easier to make and easier to answer, and it leaves the other as free as before.',
                sk: 'Keď sa ozvete po dlhšom čase, nech je to obyčajné: bez ospravedlňovania za prestávku a bez ničoho, na čo treba odpovedať do určitého času. „Toto mi pripomenulo teba.“ Ľahký prvý krok sa ľahšie robí aj ľahšie opätuje a druhej strane ponechá rovnakú voľnosť ako predtým.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], poles: ['freedom'], mechanisms: ['shared-pull/shared:freedom'] },
            sources: ['FAM-005', 'FAM-016'],
        },
        {
            id: 'fam.ask-the-hardest-part',
            title: { en: 'Ask which part was hardest', sk: 'Spýtajte sa, čo bolo najťažšie' },
            body: {
                en: 'When the other tells you about something achieved, ask which part was hardest, and listen to the answer. The question shows that the work was seen and not only the result, and it gives any word of praise that follows something specific to rest on.',
                sk: 'Keď jeden z vás rozpráva o niečom, čo sa podarilo, druhý sa môže spýtať, ktorá časť bola najťažšia, a vypočuť si odpoveď. Otázka ukáže, že niekto vidí prácu, nielen výsledok, a uznanie, ktoré príde potom, má o čo sa oprieť.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], poles: ['recognition'], mechanisms: ['shared-pull/shared:recognition'] },
            sources: ['FAM-027'],
        },
        /* different-pulls */
        {
            id: 'fam.different-not-wrong',
            title: { en: 'Different, not wrong', sk: 'Iné, nie zlé' },
            body: {
                en: 'When a relative’s life choice is held up against yours, in a comparison or over a decision, try stating your own view once, calmly, and letting the other view stand beside it. Rather than explaining the other’s choice away, ask about the circumstances behind it. Holding your position without attacking or going silent tends to keep a tie steadier.',
                sk: 'Keď niekto porovnáva životnú voľbu príbuzného s vašou, v rozhovore alebo pri nejakom rozhodnutí, skúste raz a pokojne povedať svoj pohľad a nechať, aby popri ňom stál aj pohľad druhého. Nevysvetľujte voľbu druhého človeka po svojom; spýtajte sa radšej, z akých okolností vychádza. Kto drží vlastný postoj bez útoku aj bez mlčania, zvyčajne udrží puto pokojnejšie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'different-pulls', relations: ['different-drives'] },
            sources: ['FAM-001', 'FAM-018'],
        },
    ],
    /* ====================================================================== the framing == */
    sections: {
        overview: { en: 'The family tie at a glance', sk: 'Rodinné puto v skratke' },
        story: { en: 'What stands out in this tie', sk: 'Čo v tomto pute vyniká' },
        alongside: { en: 'Around it', sk: 'Okolo toho' },
        guidance: { en: 'Ways to meet, at a pace that suits', sk: 'Ako sa stretávať vlastným tempom' },
        yourWords: { en: 'What you have noticed in this tie', sk: 'Čo v tomto pute vnímaš ty' },
        next: { en: 'A way to hold it', sk: 'Ako s tým zaobchádzať' },
        limits: { en: 'What this reading cannot know', sk: 'Čo toto čítanie nemôže vedieť' },
    },
    guidanceIntro: {
        en: 'These are small things relatives can try, chosen for this pair. Take what fits and leave what does not; keeping a tie small and protected is as valid a choice as working to bring it closer.',
        sk: 'Toto sú drobnosti, ktoré môžu príbuzní vyskúšať, vybrané pre túto dvojicu. Vezmi, čo sedí, a nechaj, čo nie; udržať puto malé a chránené je rovnako platná voľba ako snaha o väčšiu blízkosť.',
    },
    shapes: {
        all: { en: '{both} share common ground in {resonance}, draw on a useful difference in {complement}, and are most likely to snag on {friction}.', sk: '{both} majú spoločnú pôdu v oblasti „{resonance}“, môžu čerpať z užitočného rozdielu v oblasti „{complement}“ a najľahšie sa zadrhnú v oblasti „{friction}“.' },
        resonanceFriction: { en: '{both} stand on common ground in {resonance}, while {friction} is where the family history most easily flares up.', sk: '{both} stoja na spoločnej pôde v oblasti „{resonance}“, kým v oblasti „{friction}“ sa rodinná história najľahšie ozve.' },
        complementFriction: { en: '{both} differ usefully in {complement}, and less easily in {friction}, where most of the patient work lies.', sk: '{both} sa užitočne líšia v oblasti „{complement}“ a menej ľahko v oblasti „{friction}“, kde leží väčšina trpezlivej práce.' },
        resonanceComplement: { en: '{both} share ground in {resonance} and differ helpfully in {complement}, which gives the tie both ease and range.', sk: '{both} majú spoločnú pôdu v oblasti „{resonance}“ a užitočne sa dopĺňajú v oblasti „{complement}“, čo putu dáva pohodu aj šírku.' },
        resonanceOnly: { en: 'Most clearly, {both} share ground in {resonance}, where this family tie rests most easily.', sk: 'Najzreteľnejšie majú {both} spoločnú pôdu v oblasti „{resonance}“, kde toto rodinné puto spočíva najpokojnejšie.' },
        complementOnly: { en: 'Most clearly, {both} differ in {complement}, and the difference tends to help.', sk: 'Najvýraznejšie sa {both} líšia v oblasti „{complement}“ a tento rozdiel skôr pomáha.' },
        frictionOnly: { en: 'What stands out is {friction}, where {both} most easily catch on old patterns.', sk: 'Najvýraznejšia je oblasť „{friction}“, kde sa {both} najľahšie zachytia o staré vzorce.' },
    },
    drivePhrases: {
        shared: { en: 'what both are drawn to in life', sk: 'spoločná životná túžba' },
        pullsApart: { en: 'what each wants from family life', sk: 'to, čo každý chce od rodinného života' },
        different: { en: 'what each is drawn to', sk: 'to, po čom každého ťahá' },
    },
    care: {
        en: 'If contact with a relative feels unsafe, or there is abuse, threats, control over money or movement, neglect, or harm to an older person, protecting yourself or the person at risk comes before any repair. A doctor, a counsellor, a local support or protective service and, in danger, the emergency services can help, and choosing distance is a legitimate step.',
        sk: 'Ak kontakt s príbuzným pôsobí nebezpečne alebo ide o týranie, vyhrážky, kontrolu nad peniazmi či pohybom, zanedbávanie alebo ubližovanie staršiemu človeku, tvoja vlastná ochrana či ochrana ohrozeného človeka má prednosť pred akýmkoľvek zmierením. Pomôcť môže lekár, psychológ, miestna poradňa či sociálna služba a v ohrození záchranné zložky; rozhodnúť sa pre odstup je legitímny krok.',
    },
    /* How the reading ends in this domain, by the shape of its story: why a step of this size suits it, and one question. The step itself is the first research-backed practice the story calls for. */
    endings: {
        converge: {
            next: [
                { en: 'Where {both} already agree, in {phrase}, there is something to build on that asks nothing of the harder topics.', sk: 'Tam, kde sa {both} už zhodujú, v oblasti „{phrase}“, je na čom stavať a netreba sa kvôli tomu púšťať do ťažších tém.' },
                { en: 'A tie that shares ground in {phrase} does not need mending where it is not broken; the step that fits is one that keeps what works going.', sk: 'Puto, ktoré má spoločnú pôdu v oblasti „{phrase}“, netreba opravovať tam, kde sa nič nepokazilo; hodí sa krok, ktorý udrží to, čo funguje.' },
            ],
            ask: [
                { en: 'On {phrase}, what would each side like to keep exactly as it is?', sk: 'Čo by v oblasti „{phrase}“ chcela každá strana nechať presne tak, ako je?' },
                { en: 'On {phrase}, what small, regular thing could carry the shared ground without asking anyone to reopen anything?', sk: 'Aká malá, pravidelná vec by mohla niesť spoločnú pôdu v oblasti „{phrase}“, bez toho, aby niekto musel znovu otvárať čokoľvek?' },
            ],
            step: [
                { en: 'Pick one small, regular thing that needs almost no emotional work, such as a short call or a shared meal, and keep it going.', sk: 'Vyber si jednu malú, pravidelnú vec, ktorá si vyžaduje takmer žiadnu emocionálnu námahu, napríklad krátky telefonát alebo spoločné jedlo, a nechaj to bežať.' },
                { en: 'Say aloud, once, one thing about this tie that you value, and leave it there, with no request attached.', sk: 'Povedz nahlas, raz, jednu vec, ktorú na tomto pute oceňuješ, a nechaj to tak, bez akejkoľvek žiadosti.' },
            ],
        },
        complement: {
            next: [
                { en: 'The difference in {phrase} can be an advantage in a family, where different people take different parts, as long as each part is acknowledged.', sk: 'Rozdiel v oblasti „{phrase}“ môže byť v rodine výhodou, v ktorej každý preberá inú časť, ak sa každá časť uzná.' },
                { en: 'Family ties often hold best when each person is allowed to contribute differently, so the step that fits is one that says so out loud.', sk: 'Rodinné putá často držia najlepšie, keď sa každému dovolí prispievať inak, a preto sedí krok, ktorý to povie nahlas.' },
            ],
            ask: [
                { en: 'On {phrase}, what does each side contribute that the family would miss?', sk: 'Čo v oblasti „{phrase}“ prináša každý z dvojice a rodine by to chýbalo?' },
                { en: 'On {phrase}, where would a clearer split of who does what take pressure off?', sk: 'Kde by v oblasti „{phrase}“ uvoľnilo tlak jasnejšie rozdelenie, kto čo robí?' },
            ],
            step: [
                { en: 'Say aloud what each person already contributes, and ask whether anything carried by one person could be shared.', sk: 'Povedzte nahlas, čo každý už prináša, a spýtajte sa, či niečo nenesie jeden človek, čo by sa dalo rozdeliť.' },
                { en: 'Agree one task that goes to the person it suits best, and say why it suits.', sk: 'Dohodnite jednu úlohu, ktorá pripadne tomu, komu sa najviac hodí, a povedzte, prečo sa hodí.' },
            ],
        },
        tension: {
            next: [
                { en: 'Around {phrase} old habits are strongest, so the step that fits is a modest one, taken without the weight of the history.', sk: 'V oblasti „{phrase}“ sú staré zvyky najsilnejšie, preto sedí skromný krok, urobený bez záťaže minulosti.' },
                { en: 'Family friction is rarely only about the present, so a first step that stays small, and stays in the present, is the safer kind.', sk: 'Rodinné trenie len zriedka súvisí iba s prítomnosťou, takže bezpečnejší je prvý krok, ktorý ostane malý a ostane v prítomnosti.' },
            ],
            ask: [
                { en: 'On {phrase}, what would a good-enough version of this tie look like?', sk: 'Ako by vyzerala dosť dobrá podoba tohto puta v oblasti „{phrase}“?' },
                { en: 'On {phrase}, what is worth addressing, and what is better left alone?', sk: 'Čo z oblasti „{phrase}“ stojí za to riešiť a čo je lepšie nechať tak?' },
            ],
            step: [
                { en: 'Pick one topic that is not worth fighting about this month and leave it alone; keep the contact itself light.', sk: 'Vyber si tento mesiac jednu tému, o ktorú sa nestojí hádať, a nechajte túto tému tak; samotný kontakt nechajte ľahký.' },
                { en: 'Before the next visit, decide in advance how long it will last and what you will not discuss.', sk: 'Pred ďalšou návštevou si vopred určte, ako dlho potrvá a o čom sa hovoriť nebude.' },
            ],
        },
        asymmetry: {
            next: [
                { en: 'When one side carries more of the story in {phrase}, the other can be left guessing, so a step that asks is better than one that assumes.', sk: 'Keď jedna strana nesie v oblasti „{phrase}“ viac z príbehu, druhá môže len hádať, preto je lepší krok, pri ktorom sa niekto spýta, než taký, ktorý predpokladá.' },
                { en: 'Family roles can set early and stay put, and a lopsided dimension such as this one is a good place to check whether they still fit.', sk: 'Rodinné roly sa vedia zavčasu ustáliť a ostať; jednostranná oblasť, akou je táto, je dobré miesto na overenie, či ešte sedia.' },
            ],
            ask: [
                { en: 'On {phrase}, what does each side need that has not yet been said?', sk: 'Čo potrebuje každý z dvojice v oblasti „{phrase}“, čo ešte nezaznelo?' },
                { en: 'On {phrase}, what is worth asking the other about?', sk: 'Na čo sa v oblasti „{phrase}“ oplatí spýtať druhej strany?' },
            ],
            step: [
                { en: 'Ask the one who has said less what would make the contact easier, and take the answer as it comes.', sk: 'Spýtaj sa toho, kto hovoril menej, čo by kontakt uľahčilo, a prijmi odpoveď tak, ako príde.' },
                { en: 'Check whether an old role (the one who usually organises, the one who usually agrees) still suits, and say so lightly.', sk: 'Skontroluj, či stará rola (ten, kto zvyčajne organizuje, ten, kto zvyčajne súhlasí) ešte sedí, a povedz to ľahko.' },
            ],
        },
    },
    restraint: [
        { en: 'It is also a fair choice to leave this for now: a family tie can be close, distant, renewed or left as it is, and noticing what happens there is enough for the moment.', sk: 'Je tiež férová voľba nechať to zatiaľ tak: rodinné puto môže byť blízke, vzdialené, obnovené aj ponechané tak, ako je, a teraz stačí všímať si, čo sa tam deje.' },
        { en: 'There is no obligation to act on any of this; keeping the contact as it is, or at a distance that feels safe, is a choice too.', sk: 'Nikto nemusí podľa tohto konať; ponechať kontakt tak, ako je, alebo v takej vzdialenosti, ktorá je bezpečná, je tiež voľba.' },
    ],
    closing: {
        en: 'A reading like this describes tendencies, not the history {both} actually lived or the choices still ahead. A family tie can be close, distant, renewed or left as it is, and any of those can be the right answer for the people in it.',
        sk: 'Takéto čítanie opisuje sklony, nie históriu, ktorú {both} naozaj prežili, ani rozhodnutia, ktoré ich ešte čakajú. Rodinné puto môže byť blízke, vzdialené, obnovené aj ponechané tak, ako je, a ktorákoľvek z týchto podôb môže byť pre zúčastnených tou správnou.',
    },
};
export default CONTENT;
