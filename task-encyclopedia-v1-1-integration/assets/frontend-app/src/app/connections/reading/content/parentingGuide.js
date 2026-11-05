/**
 * THE AGE-BY-AGE PARENTING GUIDE.
 *
 * A newborn, a four-year-old, a nine-year-old and a fifteen-year-old do not receive the same advice. Each band says what the age is about, what is not yet fair to ask of it, and,
 * for eight everyday situations, what is typical and what an adult can do. `fit` adjusts the advice for a child whose profile leans to one end of the axis the situation draws on
 * (a tendency, never a type). The infant and toddler bands carry no `fit` at all: a baby or a toddler is never read for a style. Sources are ids in docs/research/connections/corpus-parenting.json whose age bands include the band (or any age).
 */
const AGE_GUIDE = [
    /* ------------------------------------------------------------------------------------------------------------------------------ infant -- */
    {
        band: 'infant-0-1',
        label: { en: 'Infant, birth to one year', sk: 'Bábätko, od narodenia do jedného roka' },
        portrait: {
            en: 'The first year is spent finding out that the world answers: a cry brings comfort, a babble brings a voice back, a face returns a smile. The stance that fits is responsive rather than perfect, reading signals and answering most with warmth, with the adult’s own rest and steadiness counted as part of the care.',
            sk: 'Prvý rok je o objavovaní, že svet odpovedá: na plač príde útecha, na džavotanie hlas a na tvár úsmev. K tomuto veku patrí citlivá, nie dokonalá starostlivosť, ktorá číta signály bábätka a väčšinu z nich vľúdne zodpovie, pričom odpočinok a pokoj dospelého človeka sú tiež súčasťou starostlivosti.',
        },
        notYet: {
            en: 'A baby cannot wait patiently, calm down on request or cry less because an adult is tired; crying is a message, not a test of wills. Discipline has no place in the first year; safety and comfort do.',
            sk: 'Bábätko ešte nevie trpezlivo čakať, upokojiť sa na požiadanie ani menej plakať preto, že je dospelý človek unavený; plač je správa, nie skúška vôle. Výchovné tresty do prvého roka nepatria, patrí sem bezpečie a útecha.',
        },
        situations: {
            communicating: {
                know: {
                    en: 'Communication in the first year runs on turns: a look, a coo or a reaching hand is the baby’s serve, and the adult’s answer completes the exchange. These small back-and-forths appear to support language and social skills, and a missed moment does no harm; the everyday pattern is what counts.',
                    sk: 'Komunikácia v prvom roku stojí na striedaní: pohľad, hrkútanie alebo natiahnutá ručička je podanie bábätka a odpoveď dospelého človeka výmenu uzatvára. Takéto drobné výmeny podľa všetkého podporujú reč a vzťahové zručnosti, a jedna zmeškaná chvíľa nič nepokazí; rozhoduje každodenný vzorec.',
                },
                try: {
                    en: 'Answer the babble, gesture or gaze with a word, a smile or a touch, then pause long enough for the next turn. Name what is happening in plain words during feeding, bathing and dressing. If sounds, eye contact or response to voices seem to be missing as the months pass, raise it with the paediatrician rather than waiting.',
                    sk: 'Na džavotanie, gesto či pohľad odpovedz slovom, úsmevom alebo dotykom a potom počkaj, kým príde ďalšie kolo. Pri kŕmení, kúpaní a obliekaní pomenúvaj jednoduchými slovami, čo sa práve deje. Ak sa ti s pribúdajúcimi mesiacmi zdá, že chýbajú zvuky, očný kontakt alebo reakcia na hlas, povedz to pediatrovi a nečakaj.',
                },
                sources: ['PAR-008', 'PAR-006', 'PAR-016', 'PAR-018'],
            },
            'rules-and-limits': {
                know: {
                    en: 'Limits in the first year are about safety, not behaviour: a baby explores with mouth and hands and cannot understand a rule. Predictable rhythms of feeding, sleep and play do the work that rules will do later, and a safe sleep setup is one of the boundaries that matters most.',
                    sk: 'Hranice v prvom roku sú o bezpečí, nie o správaní: bábätko skúma svet ústami a rukami a pravidlu ešte nerozumie. Prácu, ktorú neskôr urobia pravidlá, teraz robí predvídateľný rytmus kŕmenia, spánku a hry, a jednou z najdôležitejších hraníc je bezpečný spánok.',
                },
                try: {
                    en: 'Keep small objects, cords and hot drinks out of reach. Paediatric advice for sleep: on the back, on a firm flat surface, in the adults’ room but in a cot of the baby’s own. Keep nothing in the cot but a fitted sheet, and the baby not too warm. Bed sharing is not the advice; do not sleep with a baby on a sofa or armchair, or in a bed after alcohol, drugs, sedating medicine or smoking. A baby born early or unwell needs the paediatrician’s own advice.',
                    sk: 'Drobné predmety, káble a horúce nápoje drž mimo dosahu. Pediatri odporúčajú, aby bábätko spalo na chrbte, na pevnej rovnej podložke, v izbe dospelých, no vo vlastnej postieľke, v ktorej nie je nič okrem napnutého prestieradla, a aby nebolo prehriate. Spoločná posteľ sa neodporúča: nespi s bábätkom na pohovke ani v kresle a ani v posteli po alkohole, drogách, tlmiacich liekoch či fajčení. Bábätko narodené predčasne alebo choré potrebuje vlastnú radu pediatra.',
                },
                sources: ['PAR-025', 'PAR-009'],
            },
            'strong-feelings': {
                know: {
                    en: 'Crying is how a baby says almost everything; it often peaks in the first weeks, and some babies cry more, louder or longer than others for reasons that are nobody’s fault. A baby cannot yet calm down alone and borrows calm from the adult, so the adult’s own calm matters as much as any soothing technique.',
                    sk: 'Plačom bábätko hovorí takmer všetko; plač často vrcholí v prvých týždňoch, a niektoré bábätká plačú viac, hlasnejšie alebo dlhšie než iné bez toho, aby za to niekto mohol. Samo sa ešte upokojiť nevie, pokoj si požičiava od dospelého človeka, a preto na pokoji dospelého človeka záleží rovnako ako na akejkoľvek technike utišovania.',
                },
                try: {
                    en: 'Work through the usual checks (hunger, wind, a wet nappy, tiredness, too much noise) and note what soothes this baby. If the crying pushes you past your limit, put the baby on the back in the cot, step away for a few minutes and call someone. No baby should be shaken, whatever the strain. Crying that changes suddenly or seems unusual is worth a call to the paediatrician.',
                    sk: 'Prejdi bežné príčiny (hlad, plynatosť, mokrá plienka, únava, priveľa hluku) a všímaj si, čo toto bábätko upokojuje. Ak ťa plač dostáva za hranicu síl, polož bábätko na chrbát do postieľky, na pár minút odíď a niekomu zavolaj; bábätkom sa nesmie triasť, nech je tlak akýkoľvek. Plač, ktorý sa náhle zmení alebo pôsobí nezvyčajne, stojí za telefonát pediatrovi.',
                },
                sources: ['PAR-005', 'PAR-048', 'PAR-002', 'PAR-013'],
            },
            withdrawing: {
                know: {
                    en: 'A baby who turns away, closes the eyes or goes still in the middle of play is usually taking a break from stimulation, not rejecting anyone. Babies differ in how much noise, handling and novelty each can take before needing quiet, and this tends to shift as the months go by.',
                    sk: 'Keď bábätko uprostred hry odvráti hlavu, zavrie oči alebo znehybnie, zvyčajne si dáva prestávku od podnetov a nikoho neodmieta. Bábätká sa líšia v tom, koľko hluku, dotýkania a nového znesú, kým potrebujú ticho, a s pribúdajúcimi mesiacmi sa to obvykle mení.',
                },
                try: {
                    en: 'Treat looking away as a pause: lower the voice, slow down and wait for the gaze to return before starting again. Introduce new people and places gradually for a baby who startles easily. A baby who seems persistently unresponsive to faces and voices is worth a conversation with the paediatrician.',
                    sk: 'Odvrátený pohľad ber ako pauzu: stíš hlas, spomaľ a počkaj, kým sa pohľad vráti, až potom pokračuj. Bábätku, ktoré sa ľahko preľakne, predstavuj nových ľudí a miesta postupne. Ak sa zdá, že bábätko dlhodobo nereaguje na tváre a hlasy, porozprávaj sa o tom s pediatrom.',
                },
                sources: ['PAR-001', 'PAR-008', 'PAR-018'],
            },
            'change-and-transitions': {
                know: {
                    en: 'The first year is full of change: new foods, new carers and, after the first months in the adults’ room, perhaps a room of the baby’s own. Some babies take each step in stride while others are unsettled for days. A predictable sequence around sleep and feeding tells a baby what comes next long before words can.',
                    sk: 'Prvý rok prináša veľa zmien: nové jedlá, nových opatrovateľov a po prvých mesiacoch v izbe dospelých možno aj vlastnú izbu. Niektoré bábätká prijmú každý krok s ľahkosťou, iné z toho bývajú niekoľko dní rozladené. Predvídateľné poradie pri spánku a jedle hovorí bábätku, čo príde, dávno predtým, než rozumie slovám.',
                },
                try: {
                    en: 'Change one thing at a time where possible, and keep the familiar pieces around it steady: the same song, the same words, the same order at bedtime. The cot itself stays bare: a fitted sheet and a baby sleeping bag, with no blanket, pillow, bumper or toy. When a new carer joins, overlap for a few sessions so the baby meets the newcomer with a known adult nearby.',
                    sk: 'Kde sa dá, meň naraz len jednu vec a to známe okolo nechaj bez zmeny: tú istú pieseň, tie isté slová, rovnaké poradie pred spaním. Postieľka pritom zostáva prázdna: napnuté prestieradlo a spací vak, bez deky, vankúša, mantinelu a hračiek. Keď pribudne nový opatrovateľ, zostaň prvých pár stretnutí pri tom, aby sa bábätko s novou osobou zoznámilo v prítomnosti známeho dospelého človeka.',
                },
                sources: ['PAR-001', 'PAR-024', 'PAR-025'],
            },
            independence: {
                know: {
                    en: 'Independence in the first year looks like a baby reaching for a toy, rolling, and later crawling a little way off, then glancing back to check that the adult is still there. Exploring and returning belong together: comfort that can be counted on seems to make venturing out easier.',
                    sk: 'Samostatnosť v prvom roku vyzerá tak, že bábätko siahne po hračke, pretočí sa, neskôr odlezie kúsok ďalej a obzrie sa, či je dospelý človek stále tam. Skúmanie a návrat patria k sebe: útecha, na ktorú sa dá spoľahnúť, podľa všetkého uľahčuje vydať sa do sveta.',
                },
                try: {
                    en: 'Offer floor time, including tummy time while the baby is awake and watched, with a few toys too big to fit in the mouth, and stay close enough to reach. Let the baby lead the play and follow whatever catches the baby’s interest. Answer the glance back with a smile or a word; it is a check-in, and the answer makes the next small expedition possible.',
                    sk: 'Dopraj bábätku čas na zemi vrátane ležania na brušku, keď bábätko bdie a je pod dohľadom, s pár hračkami priveľkými na to, aby sa zmestili do úst, a zostaň na dosah. Nechaj hru viesť bábätko a nasleduj to, čo upúta pozornosť bábätka. Na pohľad späť odpovedz úsmevom alebo slovom; je to kontrola, či je všetko v poriadku, a odpoveď umožní ďalšiu malú výpravu.',
                },
                sources: ['PAR-006', 'PAR-009', 'PAR-041', 'PAR-025'],
            },
            siblings: {
                know: {
                    en: 'When a baby arrives, an older child may react with a mix of fascination, jealousy and a wish to be little again, which is ordinary rather than a sign of trouble. The baby needs more hands-on care, and the older child needs to hear that the difference comes from age and need, not from love.',
                    sk: 'Keď príde bábätko, staršie dieťa môže reagovať zmesou zvedavosti, žiarlivosti a túžby byť zase malé, a to je bežné, nie znak problému. Bábätko potrebuje viac priamej starostlivosti, a staršie dieťa potrebuje počuť, že rozdiel vychádza z veku a potrieb, nie z lásky.',
                },
                try: {
                    en: 'Keep a short, regular time alone with the older child, and say plainly why the baby gets so much attention right now. Offer the older child small, real ways to help, without making it a duty. A young sibling holds the baby only sitting down, with an adult’s hands right there, and plays near the baby with an adult close by.',
                    sk: 'Udrž si krátky pravidelný čas len so starším dieťaťom a jednoducho vysvetli, prečo teraz bábätko dostáva toľko pozornosti. Ponúkni staršiemu dieťaťu drobné skutočné spôsoby, ako pomôcť, no nerob z toho povinnosť. Malý súrodenec nech drží bábätko len posediačky a s rukami dospelého človeka hneď pri tom a nech sa pri bábätku hrá len vtedy, keď je dospelý človek nablízku.',
                },
                sources: ['PAR-036', 'PAR-034', 'PAR-009'],
            },
            'two-adults': {
                know: {
                    en: 'The first year tests the adults who share the care: broken sleep shortens tempers, and two people can hold quite different ideas about feeding, soothing and sleep. Exhaustion makes responsiveness harder for anyone, which is a reason for support, not a personal failing.',
                    sk: 'Prvý rok skúša dospelých, ktorí sa o bábätko delia: prerušovaný spánok skracuje trpezlivosť, a dvaja ľudia môžu mať celkom odlišné predstavy o kŕmení, utišovaní a spánku. Vyčerpanie sťažuje citlivú starostlivosť komukoľvek, a to je dôvod hľadať podporu, nie osobné zlyhanie.',
                },
                try: {
                    en: 'Agree the non-negotiables, such as safe sleep and who covers which night, at a calm moment, not at three in the morning. Share the night work so that it lasts, and accept help from the wider circle. If exhaustion, numbness or a sense of failing lasts for weeks in any adult, treat it as a health matter and talk to a doctor.',
                    sk: 'Na tom, o čom sa nediskutuje, napríklad bezpečný spánok a kto má ktorú noc, sa dohodnite v pokojnej chvíli, nie o tretej ráno. Nočné vstávanie si rozdeľte tak, aby sa to dalo dlhodobo zvládať, a prijmite pomoc od širšieho okolia. Ak u ktoréhokoľvek dospelého človeka vyčerpanie, otupenosť alebo pocit zlyhania trvá týždne, berte to ako zdravotnú vec a porozprávajte sa s lekárom.',
                },
                sources: ['PAR-008', 'PAR-038', 'PAR-040'],
            },
        },
    },
    /* ----------------------------------------------------------------------------------------------------------------------------- toddler -- */
    {
        band: 'toddler-1-3',
        label: { en: 'Toddler, one to three years', sk: 'Batoľa, od jedného do troch rokov' },
        portrait: {
            en: 'Between one and three, the drive to do things alone arrives well before the skill or the self-control to manage it, and the word no becomes a favourite. The stance that fits is firm on safety and generous with small choices, an adult who stays calm and predictable while the child tests where the edges are.',
            sk: 'Medzi prvým a tretím rokom prichádza túžba robiť veci bez pomoci oveľa skôr než zručnosť a sebaovládanie, ktoré by na to stačili, a slovo „nie“ sa stáva obľúbeným. V tomto veku pomáha pevnosť v bezpečí a štedrosť v drobných voľbách: dospelý človek zostáva pokojný a predvídateľný, kým dieťa skúša, kde sú hranice.',
        },
        notYet: {
            en: 'A toddler cannot yet share on request, sit still for long or stop a tantrum by being told to; self-control is growing more slowly than language and feeling. A sincere apology, or a promise kept until tomorrow, asks for more than this age has.',
            sk: 'Batoľa ešte nevie na požiadanie požičať hračku, dlho obsedieť ani zastaviť záchvat hnevu na pokyn; sebaovládanie rastie pomalšie než reč a city. Úprimné ospravedlnenie alebo sľub, ktorý vydrží do zajtra, chce od tohto veku viac, než má.',
        },
        situations: {
            communicating: {
                know: {
                    en: 'Language grows fast in these years, but understanding runs well ahead of speech, so frustration often comes from having something to say and no words for it yet. Short sentences, a calm face and a clear gesture reach a toddler better than explanations.',
                    sk: 'Reč v týchto rokoch rýchlo rastie, no porozumenie ide ďaleko pred hovorením, takže frustrácia často pramení z toho, že dieťa má čo povedať a ešte na to nemá slová. Krátke vety, pokojná tvár a jasné gesto zasiahnu batoľa lepšie než vysvetľovanie.',
                },
                try: {
                    en: 'Keep instructions to a few words, one step at a time, and offer two small choices instead of a yes-or-no question: the red cup or the blue one? Name what the child seems to want or feel, then wait for a reply in words or gestures. If language seems slow or slips backwards, tell the paediatrician; milestone lists are a guide for that talk, not a test.',
                    sk: 'Pokyny skráť na pár slov a jeden krok naraz a namiesto otázky áno-nie ponúkni dve drobné možnosti: červený pohár, alebo modrý? Pomenuj, čo dieťa asi chce alebo cíti, a počkaj na odpoveď slovom či gestom. Ak sa reč zdá pomalá alebo sa vracia späť, povedz to pediatrovi; zoznamy vývinových míľnikov sú pomôckou do rozhovoru, nie skúškou.',
                },
                sources: ['PAR-015', 'PAR-008', 'PAR-016'],
            },
            'rules-and-limits': {
                know: {
                    en: 'Testing limits is how a toddler learns where the world’s edges are, and each test is usually repeated many times before the lesson holds. Hitting, biting and throwing are common at this age and call for a firm, consistent response, not a harsh one: harshness tends to feed the intensity it means to stop.',
                    sk: 'Skúšaním hraníc sa batoľa učí, kde má svet okraje, a každú skúšku zvyčajne mnohokrát zopakuje, kým sa ponaučenie ujme. Bitie, hryzenie a hádzanie sú v tomto veku bežné a vyžadujú pevnú a dôslednú odpoveď, nie tvrdú: tvrdosť zvykne živiť práve tú prudkosť, ktorú chce zastaviť.',
                },
                try: {
                    en: 'Keep rules few and concrete, and meet hitting, biting or throwing the same way each time: a calm, brief stop and a move away. Praise the behaviour you want the moment it appears. Spanking, yelling and shaming bring no lasting benefit and are linked to worse outcomes; if daily struggles last for months, a paediatrician can suggest a parenting programme, whose benefits are real but modest.',
                    sk: 'Pravidiel nech je málo a nech sú konkrétne, a na bitie, hryzenie či hádzanie reaguj zakaždým rovnako: pokojným krátkym zastavením a odchodom zo situácie. Správanie, ktoré chceš vidieť, pochváľ hneď, ako sa objaví. Bitie po zadku, krik a zahanbovanie neprinášajú trvalý úžitok a súvisia s horšími výsledkami; ak každodenné boje trvajú mesiace, pediater vie odporučiť rodičovský program, ktorého prínos je skutočný, hoci mierny.',
                },
                sources: ['PAR-015', 'PAR-019', 'PAR-003', 'PAR-020', 'PAR-023'],
            },
            'strong-feelings': {
                know: {
                    en: 'Tantrums are a normal part of these years, peak when a toddler is tired, hungry or blocked from something wanted, and usually ease after the third birthday. How loudly frustration shows depends partly on temperament, so a sibling who has fewer tantrums is not proof of better handling.',
                    sk: 'Záchvaty hnevu k týmto rokom patria, najčastejšie prichádzajú, keď je batoľa unavené, hladné alebo nemôže mať, čo chce, a po treťom roku zvyčajne slabnú. Ako hlasno sa frustrácia prejaví, závisí sčasti od povahy, takže súrodenec s menej záchvatmi nie je dôkazom lepšej výchovy.',
                },
                try: {
                    en: 'Head off the predictable ones: a snack in the bag, nap and bedtime protected. In the storm itself, stay close and calm, keep words few, and offer a choice or a change of scene once the peak has passed. Outbursts that are very frequent, very long, involve self-injury or appear suddenly are worth raising with the paediatrician.',
                    sk: 'Predvídateľným záchvatom predchádzaj: desiata v taške, chránený spánok cez deň aj večer. V samotnej búrke zostaň nablízku, zachovaj pokoj, hovor málo a keď vrchol pominie, ponúkni voľbu alebo zmenu prostredia. Výbuchy, ktoré sú veľmi časté, veľmi dlhé, spojené so sebapoškodzovaním alebo sa objavia náhle, stojí za to prebrať s pediatrom.',
                },
                sources: ['PAR-015', 'PAR-013', 'PAR-003'],
            },
            withdrawing: {
                know: {
                    en: 'Wariness of strangers and clinging in new places are common in toddlerhood, and some children need far longer than others to warm up. A toddler hiding behind a familiar leg is usually gathering courage, not refusing contact.',
                    sk: 'Ostražitosť voči cudzím a držanie sa dospelého človeka na nových miestach sú v batolivom veku bežné, a niektoré deti potrebujú na rozohriatie oveľa viac času než iné. Batoľa schované za známou nohou zvyčajne zbiera odvahu, nie odmieta kontakt.',
                },
                try: {
                    en: 'Give new people and places time: keep the child on a lap or close by, and let the newcomer approach slowly rather than handing the child over. Do not press for a hello or apologise for the reluctance in front of the child. If the child seems to show little interest in people, sounds or shared attention, mention it to the paediatrician.',
                    sk: 'Novým ľuďom a miestam dopraj čas: nechaj dieťa na kolenách alebo tesne vedľa a nech sa nový človek približuje pomaly, namiesto podávania dieťaťa do cudzej náruče. Pred dieťaťom nenaliehaj na pozdrav a neospravedlňuj sa za zdráhanie. Ak sa zdá, že dieťa prejavuje len málo záujmu o ľudí, zvuky či spoločné sústredenie na vec, spomeň to pediatrovi.',
                },
                sources: ['PAR-002', 'PAR-008', 'PAR-018'],
            },
            'change-and-transitions': {
                know: {
                    en: 'Stopping one thing to start another is hard for a toddler, who lives fully in the present and has little sense of later. Daily routines around meals, naps and goodbyes give the day a shape the child can predict, and that predictability is what makes the hard transitions bearable.',
                    sk: 'Prestať s jednou vecou a začať inú je pre batoľa ťažké, lebo žije naplno v prítomnosti a o tom, čo príde neskôr, má len matnú predstavu. Denné rituály pri jedle, spánku a lúčení dávajú dňu tvar, ktorý dieťa vie predvídať, a práve táto predvídateľnosť robí ťažké prechody znesiteľnými.',
                },
                try: {
                    en: 'Warn before a change with something concrete (two more slides, then shoes) and use the same small ritual for leaving, sleeping and saying goodbye. Switching off a screen is one of the hardest transitions. The international guidance is simple: no screens at one year old, and no more than about an hour a day at two, with less being better.',
                    sk: 'Pred zmenou upozorni niečím konkrétnym (ešte dvakrát šmykľavka a potom topánky) a pri odchode, uspávaní a lúčení používaj ten istý malý rituál. Vypnutie obrazovky patrí k najťažším prechodom a medzinárodné odporúčanie je jednoduché: v jednom roku žiadne obrazovky, v dvoch rokoch najviac zhruba hodina denne, a menej je lepšie.',
                },
                sources: ['PAR-024', 'PAR-002', 'PAR-041'],
            },
            independence: {
                know: {
                    en: '“Me do it” is the motto of toddlerhood: shoes, pouring water, climbing the stairs with an adult right behind, usually more slowly and messily than an adult would manage. The drive is healthy and needs room, within limits that keep the child safe.',
                    sk: '„Nechaj, ja!“ je heslom batolivého veku: obúvanie, nalievanie vody, výstup po schodoch s dospelým tesne za chrbtom, zvyčajne pomalšie a neporiadnejšie, než by to zvládol dospelý človek. Táto túžba je zdravá a potrebuje priestor, v hraniciach, ktoré dieťa chránia.',
                },
                try: {
                    en: 'Build in extra time so the child can try, and offer real, limited choices: which shoes, which plate, walk or ride. Some things are not a choice: the car seat is buckled on every trip, and a gate or an adult guards the stairs. Step in for safety and when frustration tips into despair, and otherwise let the struggle run a little. Say out loud what the child managed.',
                    sk: 'Počítaj s časom navyše, aby to dieťa mohlo skúsiť, a ponúkaj skutočné, obmedzené voľby: ktoré topánky, ktorý tanier, pešo alebo v kočíku. Niektoré veci sa nevyberajú: autosedačka je zapnutá na každej ceste a schody stráži zábrana alebo dospelý človek. Zasiahni kvôli bezpečiu a vtedy, keď sa frustrácia prelieva do zúfalstva, inak nechaj dieťa chvíľu zápasiť. Nahlas oceň, čo sa podarilo.',
                },
                sources: ['PAR-015', 'PAR-010', 'PAR-012', 'PAR-009'],
            },
            siblings: {
                know: {
                    en: 'Toddlers grab, push and refuse to share because ownership and turn-taking are still new ideas, not out of malice. An older sibling’s things may need protecting from a toddler’s demolitions as much as the reverse, and a toddler near a baby needs an adult close by.',
                    sk: 'Batoľatá chmatajú, strkajú a nechcú požičať nie zo zlomyseľnosti, ale preto, že vlastníctvo a striedanie sú v tomto veku ešte nové pojmy. Veci staršieho súrodenca môžu potrebovať ochranu pred búraním batoľaťa rovnako ako batoľa pred staršími deťmi, a keď je batoľa pri bábätku, potrebuje dospelého človeka nablízku.',
                },
                try: {
                    en: 'Protect the older child’s projects with a high shelf or a toddler-free corner, and watch rough play closely. Teach turn-taking with a timer or a simple my-turn, your-turn game rather than demanding sharing on the spot. Explain to an older sibling, in plain words, why the toddler gets different rules.',
                    sk: 'Výtvory staršieho dieťaťa chráň vysokou poličkou alebo kútikom, kam batoľa nesmie, a divokú hru pozorne sleduj. Striedanie uč s minútkou alebo jednoduchou hrou „teraz ja, teraz ty“, namiesto vynúteného požičiavania na mieste. Staršiemu súrodencovi jednoduchými slovami vysvetli, prečo pre batoľa platia iné pravidlá.',
                },
                sources: ['PAR-036', 'PAR-015', 'PAR-034'],
            },
            'two-adults': {
                know: {
                    en: 'Toddlerhood is often when the adults discover a real difference over limits: one reaches for firmness, the other for comfort, and the toddler notices quickly. Small differences in style are normal; open criticism of each other in front of the child is the part worth avoiding.',
                    sk: 'V batolivom veku dospelí často zistia, že sa v hraniciach naozaj líšia: jedna strana siaha po pevnosti, druhá po úteche, a batoľa si to rýchlo všimne. Drobné rozdiely v štýle sú normálne; vyhnúť sa oplatí otvorenej kritike pred dieťaťom.',
                },
                try: {
                    en: 'Settle the few big rules (safety, sleep, how hitting is handled) between the adults, away from the child, and then back each other up in the moment. If one adult disagrees with a call, raise it later in private. When a grandparent or a second home shares the care, agree the same handful of rules there too.',
                    sk: 'Pár veľkých pravidiel (bezpečie, spánok, ako sa rieši bitie) si dohodnite medzi sebou, mimo dieťaťa, a v danej chvíli sa navzájom podržte. Ak niekto z vás s rozhodnutím nesúhlasí, otvorte to neskôr v súkromí. Ak sa o dieťa stará aj starý rodič alebo druhý domov, dohodnite rovnakú hŕstku pravidiel aj tam.',
                },
                sources: ['PAR-038', 'PAR-039'],
            },
        },
    },
    /* --------------------------------------------------------------------------------------------------------------------------- preschool -- */
    {
        band: 'preschool-3-5',
        label: { en: 'Preschool, three to five years', sk: 'Predškolský vek, od troch do piatich rokov' },
        portrait: {
            en: 'From three to five, a child begins to name feelings, play with other children by simple rules and hold back an impulse for a moment, with a lot of help. Imagination is vast and the line between pretend and real is still soft. The stance that fits is warm coaching: accept the feeling, hold the limit, lend the words.',
            sk: 'Medzi tromi a piatimi rokmi dieťa začína pomenúvať city, hrať sa s inými deťmi podľa jednoduchých pravidiel a na chvíľu zadržať impulz, s veľkou pomocou. Fantázia je obrovská a hranica medzi hrou a skutočnosťou je ešte mäkká. V tomto veku pomáha vľúdne vedenie: prijať pocit, udržať hranicu a ponúknuť dieťaťu slová.',
        },
        notYet: {
            en: 'A preschooler cannot yet calm strong frustration alone, wait long without help, or sit quietly through a long adult event. Settling a quarrel with a friend unaided, or grasping why a rule matters the way an adult does, is still ahead.',
            sk: 'Dieťa v predškolskom veku ešte nevie samo utíšiť silnú frustráciu, dlho čakať bez pomoci ani potichu presedieť dlhé podujatie dospelých. Urovnať hádku s kamarátom bez pomoci alebo chápať, prečo na pravidle záleží, tak ako to chápe dospelý človek, ešte len príde.',
        },
        situations: {
            communicating: {
                know: {
                    en: 'Preschoolers ask endless questions, tell long stories and mix pretend with fact, and conversation becomes a real two-way thing. A child this age follows reasons better than before, though a long explanation still loses the thread; a short reason and a clear request work best.',
                    sk: 'Deti v predškolskom veku sa donekonečna pýtajú, rozprávajú dlhé príbehy a miešajú hru so skutočnosťou, a rozhovor sa stáva naozajstnou výmenou. Dieťa tohto veku rozumie dôvodom lepšie než predtým, no dlhé vysvetľovanie ešte stráca niť; najlepšie funguje krátky dôvod a jasná prosba.',
                },
                try: {
                    en: 'Get down to eye level, use the child’s name, and keep requests to one or two steps. Give a brief reason with a rule (we walk inside so nobody falls) and hear the whole story before correcting anything. Prefer reading and telling stories together to passive screen time.',
                    sk: 'Skloň sa do výšky očí dieťaťa, oslov dieťa menom a prosby obmedz na jeden či dva kroky. K pravidlu pridaj krátky dôvod (vnútri chodíme pomaly, aby nikto nespadol) a celý príbeh si vypočuj skôr, než niečo opravíš. Spoločné čítanie a rozprávanie príbehov uprednostni pred pasívnym pozeraním obrazovky.',
                },
                fit: {
                    analytical: {
                        en: 'A child who looks for reasons may keep asking why; answer the first two whys properly, then turn one back with a question of your own.',
                        sk: 'Dieťa, ktoré hľadá dôvody, sa môže pýtať „prečo“ stále dookola; prvé dve prečo zodpovedz poriadne a potom jedno vráť otázkou, čo si o tom myslí samo.',
                    },
                    intuitive: {
                        en: 'A child who goes more by feel than by reasons may take a message from a story, a puppet or a game of pretend more readily than from an explanation.',
                        sk: 'Dieťaťu, ktoré sa riadi skôr pocitom než dôvodmi, môže príbeh, bábka alebo hra na niečo doniesť správu ľahšie než vysvetlenie.',
                    },
                },
                sources: ['PAR-010', 'PAR-041', 'PAR-002'],
            },
            'rules-and-limits': {
                know: {
                    en: 'Between three and five a child can follow simple rules known in advance, though not reliably, and not when tired or overexcited. Rules that stay the same from day to day, paired with warmth and a short reason, go with fewer struggles than threats, yelling or guilt.',
                    sk: 'Medzi tromi a piatimi rokmi dieťa zvládne jednoduché pravidlá, ktoré pozná vopred, hoci nie spoľahlivo a nie vtedy, keď je unavené alebo rozrušené. Pravidlá, ktoré platia deň čo deň a idú spolu s vľúdnosťou a krátkym dôvodom, súvisia s menším počtom bojov než vyhrážky, krik či vyvolávanie viny.',
                },
                try: {
                    en: 'Agree a few house rules ahead of time, each phrased as what to do (feet on the floor) rather than what not to do. Name good behaviour often, and when a rule is broken use a calm, brief, related consequence: a thrown toy rests on the shelf for a while. Leave out hitting, shaming and threats to withdraw love, which tend to make behaviour worse.',
                    sk: 'Dohodni si vopred zopár domácich pravidiel a formuluj ich ako to, čo robiť (nohy na zemi), nie čo nerobiť. Dobré správanie často pomenúvaj, a keď sa pravidlo poruší, použi pokojný, krátky a súvisiaci následok: hodená hračka si chvíľu oddýchne na poličke. Vynechaj bitie, zahanbovanie a vyhrážky odňatím lásky, ktoré správanie skôr zhoršujú.',
                },
                fit: {
                    structured: {
                        en: 'A child who likes order may enjoy a picture chart of the house rules, and a part in keeping to it.',
                        sk: 'Dieťa, ktoré má rado poriadok, môže tešiť obrázková tabuľa domácich pravidiel aj úloha pomáhať ich strážiť.',
                    },
                    adaptable: {
                        en: 'A child who leans toward improvising tends to do better with a few rules held firmly than with many held loosely. A playful challenge (can the toys beat the timer?) often outdoes an order.',
                        sk: 'Dieťaťu, ktoré skôr improvizuje, zvyčajne viac pomôže pár pravidiel držaných pevne než veľa voľných, a hravá výzva (stihnú hračky skočiť do krabice skôr, než zazvoní minútka?) často zaberie viac než príkaz.',
                    },
                },
                sources: ['PAR-019', 'PAR-010', 'PAR-020'],
            },
            'strong-feelings': {
                know: {
                    en: 'Preschoolers feel things at full strength and are only beginning to manage such feelings, so frustration can still spill into screaming, hitting or collapse. A child this age learns calm partly by watching how nearby adults calm down, and partly by hearing feelings named and accepted.',
                    sk: 'Deti v predškolskom veku prežívajú city v plnej sile a len sa ich učia zvládať, takže frustrácia sa ešte môže preliať do kriku, bitia alebo zrútenia. Pokoj sa dieťa v tomto veku učí sčasti pozorovaním toho, ako sa upokojujú dospelí okolo, a sčasti tým, že počuje svoje city pomenované a prijaté.',
                },
                try: {
                    en: 'Name and accept the feeling first, then hold the limit on the behaviour: “So much anger about the tower, and still no kicking.” Once calm returns, talk briefly about what could help next time. Outbursts that last for weeks, cause real distress or get in the way of preschool and friendships are worth a word with the paediatrician.',
                    sk: 'Najprv pocit pomenuj a prijmi, potom podrž hranicu správania: „Toľko hnevu kvôli spadnutej veži, a predsa sa nekope.“ Keď sa pokoj vráti, krátko sa porozprávaj, čo by mohlo pomôcť nabudúce. Výbuchy, ktoré trvajú týždne, spôsobujú skutočné trápenie alebo prekážajú v škôlke a kamarátstvach, stoja za rozhovor s pediatrom.',
                },
                fit: {
                    'emotionally-expressive': {
                        en: 'A child whose feelings tend to come out loud may need physical outlets alongside the words: stamping, a cushion to thump, a run round the garden.',
                        sk: 'Dieťaťu, ktorého city zvyknú vychádzať nahlas, ponúkni k slovám aj telesný ventil: dupanie, vankúš na búchanie, beh po záhrade.',
                    },
                    'emotionally-contained': {
                        en: 'A child who tends to keep feelings in may show upset only in small ways, such as going quiet or refusing a favourite thing; offer the words gently, without pressing.',
                        sk: 'Dieťa, ktoré city drží skôr vnútri, môže trápenie ukázať len nenápadne, stíchnutím alebo odmietnutím obľúbenej veci; slová ponúkni jemne, bez vypytovania.',
                    },
                },
                sources: ['PAR-014', 'PAR-013', 'PAR-052'],
            },
            withdrawing: {
                know: {
                    en: 'Many preschoolers hang back with new children or adults, and for some the caution is strong and shows up everywhere. Shyness of this kind is a temperament to work with, not a fault, and it often softens with time and small steps.',
                    sk: 'Mnohé deti v predškolskom veku sa pri nových deťoch či dospelých držia vzadu, a u niektorých je táto opatrnosť silná a prejavuje sa všade. Takáto plachosť je povahou, s ktorou sa dá pracovať, nie chybou, a s časom a malými krokmi často zmäkne.',
                },
                try: {
                    en: 'Prepare the child for a new group by talking it through, arriving early and staying for the first minutes, then step back gradually. Avoid both forcing participation and rescuing the child from every hard moment. If the caution is intense, lasts for months and limits daily life, ask the paediatrician about parent-focused programmes for cautious young children.',
                    sk: 'Na novú skupinu dieťa priprav rozhovorom, príď skôr a prvé minúty zostaň, potom sa postupne vzďaľuj. Nenúť do zapojenia, no ani nezachraňuj z každej ťažkej chvíle. Ak je opatrnosť silná, trvá mesiace a obmedzuje bežný život, opýtaj sa pediatra na programy pre rodičov opatrnejších malých detí.',
                },
                fit: {
                    introspective: {
                        en: 'A child who recharges in quiet may need a quiet corner after preschool more than any playdate; let the child refill before asking about the day.',
                        sk: 'Dieťaťu, ktoré si oddýchne najmä v tichu, môže tichý kútik po škôlke znamenať viac než akákoľvek návšteva kamaráta; nechaj dieťa najprv nabrať sily, až potom sa spýtaj na deň.',
                    },
                    'outwardly-engaged': {
                        en: 'In a child who usually seeks company and talk, withdrawal is less usual and worth noticing; ask gently whether something in the group has changed.',
                        sk: 'Pri dieťati, ktoré zvyčajne vyhľadáva spoločnosť a rozhovor, je stiahnutie menej obvyklé a stojí za povšimnutie; jemne sa spýtaj, či sa v skupine niečo nezmenilo.',
                    },
                },
                sources: ['PAR-031', 'PAR-033', 'PAR-032'],
            },
            'change-and-transitions': {
                know: {
                    en: 'Starting preschool, a move, a new sibling or a change of carer can unsettle a child this age for weeks, often showing as clinginess, poorer sleep or more tears than usual. A child who is slow to adapt needs warning and gradual introduction more than reassurance after the fact.',
                    sk: 'Nástup do škôlky, sťahovanie, nový súrodenec alebo zmena opatrovateľa môžu dieťa tohto veku rozhodiť na celé týždne, často prilipnutím k dospelému človekovi, horším spánkom či viac slzami než zvyčajne. Dieťa, ktoré sa prispôsobuje pomaly, potrebuje skôr upozornenie vopred a postupné zoznamovanie než upokojovanie po fakte.',
                },
                try: {
                    en: 'Talk about a change several days ahead, visit the new place together, and keep morning and bedtime routines steady throughout. Ending screen time is a daily transition worth planning: a warning, a clear end point, something to move on to. International guidance for three- and four-year-olds is an hour a day at most, with less being better.',
                    sk: 'O zmene hovor niekoľko dní vopred, navštív nové miesto spolu a ranný aj večerný rituál nechaj počas toho všetkého rovnaký. Koniec času pri obrazovke je každodenný prechod, ktorý sa oplatí naplánovať: upozornenie, jasný koniec a niečo, k čomu sa prejde. Medzinárodné odporúčanie pre troj- a štvorročné deti je najviac hodina denne, a menej je lepšie.',
                },
                fit: {
                    'stability-seeking': {
                        en: 'A child who leans toward the familiar may need more warning than seems necessary, and a familiar object close during the first weeks of anything new.',
                        sk: 'Dieťa so sklonom k stálosti môže potrebovať upozornenie skôr, než sa zdá nutné, a počas prvých týždňov čohokoľvek nového známy predmet po ruke.',
                    },
                    'novelty-seeking': {
                        en: 'A child drawn to the new may find a new place exciting at first and harder a few weeks in, once the shine wears off. Expect the dip and keep routines steady through it.',
                        sk: 'Dieťa, ktoré láka nové, môže byť z nového miesta spočiatku nadšené, a o pár týždňov neskôr, keď lesk vyprchá, to býva ťažšie; s týmto poklesom rátaj a rituály vtedy udrž pevné.',
                    },
                },
                sources: ['PAR-002', 'PAR-024', 'PAR-041'],
            },
            independence: {
                know: {
                    en: 'Preschoolers want a say in what to wear, what to play and how things are done, and can manage small jobs that genuinely help the household. Choices about personal matters build confidence, while decisions about safety stay with the adult.',
                    sk: 'Deti v predškolskom veku chcú mať slovo pri tom, čo si oblečú, čo sa bude hrať a ako sa čo robí, a zvládnu drobné úlohy, ktoré domácnosti naozaj pomáhajú. Voľby v osobných veciach budujú istotu, kým rozhodnutia o bezpečí zostávajú na dospelom človeku.',
                },
                try: {
                    en: 'Give real jobs (setting out spoons, feeding the cat) and let the result be imperfect. Offer more say on personal things such as clothes or which game to play, and stay firm on car seats, roads and bedtime. When a cautious child holds back from trying, break the task into smaller steps rather than doing it on the child’s behalf.',
                    sk: 'Daj dieťaťu skutočné úlohy (rozložiť lyžičky, nakŕmiť mačku) a nechaj výsledok nedokonalý. Viac slova ponúkni pri osobných veciach, ako je oblečenie alebo výber hry, a pevnosť si nechaj pri autosedačke, ceste a čase spánku. Keď sa opatrnejšie dieťa zdráha niečo skúsiť, rozdeľ úlohu na menšie kroky, namiesto toho, aby to dospelý človek urobil namiesto dieťaťa.',
                },
                fit: {
                    independent: {
                        en: 'A child who leans toward managing alone: let more decisions belong to the child, and save the firm no for the few things that truly matter.',
                        sk: 'Dieťaťu, ktoré chce veci zvládať samo, nechaj viac rozhodnutí a pevné „nie“ si šetri na tých pár vecí, na ktorých naozaj záleží.',
                    },
                    collaborative: {
                        en: 'A child who likes doing things together may learn best by doing a task alongside an adult first, then with the adult nearby, then alone.',
                        sk: 'Dieťa, ktoré rado robí veci spolu s niekým, sa môže najlepšie učiť, keď úlohu najprv robí s dospelým, potom s dospelým nablízku a až potom samo.',
                    },
                },
                sources: ['PAR-012', 'PAR-010', 'PAR-031'],
            },
            siblings: {
                know: {
                    en: 'A preschooler’s squabbles with a brother or sister, older or younger, tend to be about toys, turns and attention. At this age a child can begin to use simple sharing rules with plenty of coaching. How loudly a child protests is partly temperament, so the quieter sibling is not automatically the wronged one, nor the louder one the culprit.',
                    sk: 'Šarvátky dieťaťa v predškolskom veku so starším či mladším súrodencom sa zvyčajne točia okolo hračiek, poradia a pozornosti, a dieťa tohto veku už s veľkou pomocou začína používať jednoduché pravidlá delenia sa. Ako hlasno dieťa protestuje, je sčasti vecou povahy, takže tichší súrodenec nemusí byť automaticky ten ukrivdený a hlasnejší ten vinný.',
                },
                try: {
                    en: 'Coach in the moment rather than only judging afterwards: name what each child wants, suggest a way to take turns, and praise the solution. Avoid casting either child as the good one or the difficult one, even in jest. Explain openly when one child gets different treatment because of age or need.',
                    sk: 'Usmerňuj priamo v situácii, nielen súď potom: pomenuj, čo ktoré dieťa chce, navrhni spôsob, ako sa vystriedať, a pochváľ riešenie. Žiadne dieťa nestavaj do roly toho dobrého alebo toho ťažkého, ani zo žartu. Otvorene vysvetli, keď niektoré dieťa dostáva iné zaobchádzanie pre vek alebo potreby.',
                },
                sources: ['PAR-015', 'PAR-036', 'PAR-034'],
            },
            'two-adults': {
                know: {
                    en: 'By this age differences between the adults show up in daily rules: bedtime, sweets, screens, how a meltdown is handled. A child copes with two styles; what is linked, modestly, to more difficulty is repeated arguing about the child in front of the child, or decisions quietly overturned behind each other’s backs.',
                    sk: 'V tomto veku sa rozdiely medzi dospelými prejavia v každodenných pravidlách: čas spánku, sladkosti, obrazovky, ako sa rieši výbuch. Dieťa dva štýly zvládne; s väčšími ťažkosťami súvisia, hoci len mierne, opakované hádky o dieťati pred dieťaťom alebo rušenie rozhodnutí za chrbtom.',
                },
                try: {
                    en: 'Hold a short weekly check-in between the adults about what is working, away from the child. Agree on a shared response to the two or three most frequent flashpoints, and let small differences in style stand. Where care is shared across homes or with grandparents, aim for the same few core rules rather than identical households.',
                    sk: 'Doprajte si raz týždenne krátku poradu dospelých o tom, čo funguje, mimo dieťaťa. Na dve-tri situácie, ktoré najčastejšie vybuchnú, sa dohodnite na spoločnej reakcii a drobné rozdiely v štýle nechajte tak. Ak sa starostlivosť delí medzi domácnosti alebo so starými rodičmi, mierte k rovnakým niekoľkým základným pravidlám, nie k identickým domovom.',
                },
                sources: ['PAR-038', 'PAR-039'],
            },
        },
    },
    /* ------------------------------------------------------------------------------------------------------------------------ early school -- */
    {
        band: 'early-school-6-8',
        label: { en: 'Early school years, six to eight', sk: 'Mladší školský vek, od šiestich do ôsmich rokov' },
        portrait: {
            en: 'Between six and eight, school brings a new world of rules, friends and comparison, and a child starts to measure up against peers. Thinking becomes more logical and fairness becomes a burning issue. The stance that fits explains reasons, keeps family rules clear and consistent, and hands over small responsibilities one at a time.',
            sk: 'Medzi šiestym a ôsmym rokom prináša škola nový svet pravidiel, kamarátov a porovnávania, a dieťa sa začína merať s rovesníkmi. Myslenie je logickejšie a spravodlivosť sa stáva pálčivou témou. V tomto veku pomáha vysvetľovať dôvody, držať rodinné pravidlá jasné a dôsledné a odovzdávať drobné zodpovednosti po jednej.',
        },
        notYet: {
            en: 'A child this age cannot yet organise homework, kit and time without scaffolding, or lose gracefully every time. Expecting a six-year-old to cope alone with a friendship falling apart, or to be the reliable minder of a younger sibling, asks too much.',
            sk: 'Dieťa v tomto veku ešte nezvládne zorganizovať úlohy, veci do školy a čas bez opory, ani zakaždým s ľahkosťou prehrať. Očakávať od šesťročného dieťaťa, že samo spracuje rozpadajúce sa priateľstvo alebo bude spoľahlivo strážiť mladšieho súrodenca, je priveľa.',
        },
        situations: {
            communicating: {
                know: {
                    en: 'A school-age child can follow a reason, argues about fairness and wants to be taken seriously. Conversation now carries real news about life away from home, though a direct question about the school day often earns a one-word answer.',
                    sk: 'Dieťa v školskom veku už sleduje dôvody, háda sa o spravodlivosť a chce byť brané vážne. Rozhovor už nesie skutočné správy o živote mimo domova, hoci priama otázka na školský deň často dostane jednoslovnú odpoveď.',
                },
                try: {
                    en: 'Explain the reason behind a rule and listen to the counter-argument, even when the rule stays. Ask specific questions, such as who sat where at lunch, instead of a general how was school, and keep some talk for relaxed moments like the walk home or bedtime. Show interest in what the child cares about, not only in marks.',
                    sk: 'Vysvetli dôvod pravidla a vypočuj si protiargument, aj keď pravidlo platí ďalej. Pýtaj sa konkrétne, napríklad kto s kým sedel pri obede, namiesto všeobecného „ako bolo v škole“, a časť rozhovorov si nechaj na uvoľnené chvíle, ako cesta domov alebo večer pred spaním. Zaujímaj sa o to, na čom dieťaťu záleží, nielen o známky.',
                },
                fit: {
                    analytical: {
                        en: 'A child who looks for reasons may want the logic of a rule to hold up; inviting the child to spot exceptions can turn an argument into a conversation.',
                        sk: 'Dieťa, ktoré hľadá dôvody, môže chcieť, aby logika pravidla obstála; pozvanie hľadať výnimky môže premeniť hádku na rozhovor.',
                    },
                    intuitive: {
                        en: 'A child who goes more by feel may care more about the mood of a conversation than its content. A warm tone and a story from the adult’s own school days can open more than questions do.',
                        sk: 'Dieťaťu, ktoré sa riadi skôr pocitom, môže na nálade rozhovoru záležať viac než na obsahu; vľúdny tón a príbeh zo školských čias dospelého človeka môžu otvoriť viac než otázky.',
                    },
                },
                sources: ['PAR-010', 'PAR-013'],
            },
            'rules-and-limits': {
                know: {
                    en: 'Children this age care intensely about whether rules are fair and apply to everyone, and will spot an exception at once. Clear, consistent family rules with explained reasons go with fewer struggles than harsh control or rules that shift with the adult’s mood.',
                    sk: 'Deťom v tomto veku veľmi záleží na tom, či sú pravidlá spravodlivé a platia pre všetkých, a výnimku odhalia okamžite. Jasné a dôsledné rodinné pravidlá s vysvetleným dôvodom súvisia s menším počtom bojov než tvrdá kontrola alebo pravidlá, ktoré sa menia podľa nálady dospelého človeka.',
                },
                try: {
                    en: 'Write down the few rules that matter most with the child’s input, and apply the list the same way on good days and bad. Keep consequences calm, brief and connected to the behaviour; give more say on personal choices and stay firm on safety. Yelling and shaming may stop a behaviour in the moment but bring no lasting gain.',
                    sk: 'Spíš s prispením dieťaťa tých pár pravidiel, na ktorých najviac záleží, a uplatňuj zoznam rovnako v dobrých aj zlých dňoch. Následky nech sú pokojné, krátke a súvisia so správaním; pri osobných voľbách dávaj viac slova, pri bezpečí zostaň pevne pri svojom. Krik a zahanbovanie môžu správanie na chvíľu zastaviť, no trvalý zisk neprinášajú.',
                },
                fit: {
                    structured: {
                        en: 'To a child who likes order, a visible list and a predictable consequence may feel reassuring rather than strict.',
                        sk: 'Dieťaťu, ktoré má rado poriadok, môžu viditeľný zoznam a predvídateľný následok prinášať skôr istotu než pocit prísnosti.',
                    },
                    adaptable: {
                        en: 'A child who leans toward improvising: negotiate the how and hold the what, so homework gets done, but the child may choose when and where.',
                        sk: 'S dieťaťom, ktoré skôr improvizuje, vyjednávaj o spôsobe, no cieľ drž pevne: úlohy sa urobia, ale kedy a kde, si dieťa môže vybrať.',
                    },
                },
                sources: ['PAR-010', 'PAR-019', 'PAR-012'],
            },
            'strong-feelings': {
                know: {
                    en: 'Big feelings at this age often come home from school: a child holds together all day and falls apart in the kitchen. Frustration over losing, being left out or getting something wrong runs high, and calm is still learned partly by watching how adults handle frustration.',
                    sk: 'Silné city si dieťa v tomto veku často prinesie zo školy: celý deň drží a doma v kuchyni sa rozsype. Frustrácia z prehry, z vylúčenia alebo z chyby je veľká, a pokoj sa dieťa stále sčasti učí tým, že sleduje, ako s frustráciou zaobchádzajú dospelí.',
                },
                try: {
                    en: 'Offer food and quiet before questions after school, and let an outburst pass before discussing it. Name the feeling, then work out one next step together. If worry, sadness or anger lasts for weeks, distresses the child or gets in the way of school and friends, start with the paediatrician or the school.',
                    sk: 'Po škole ponúkni jedlo a ticho skôr než otázky a výbuch nechaj prejsť, až potom sa k tomu vráť. Pomenuj pocit a potom spolu nájdi jeden ďalší krok. Ak strach, smútok alebo hnev trvá týždne, dieťa trápi alebo prekáža v škole a kamarátstvach, začni u pediatra alebo v škole.',
                },
                fit: {
                    'emotionally-expressive': {
                        en: 'A child whose feelings tend to come out loud may be helped by a regular way to let off steam (a run, music, drawing), which takes some pressure off the conversation.',
                        sk: 'Dieťaťu, ktorého city zvyknú vychádzať nahlas, môže pomôcť pravidelný ventil (beh, hudba, kreslenie), ktorý zloží z rozhovoru časť tlaku.',
                    },
                    'emotionally-contained': {
                        en: 'In a child who tends to keep feelings in, upset may surface late and sideways, as irritability at bedtime or reluctance to go back to school; ask once, then leave the door open.',
                        sk: 'U dieťaťa, ktoré city drží skôr vnútri, môže trápenie vyplávať neskoro a oklikou, ako podráždenosť pred spaním alebo nechuť vrátiť sa do školy; spýtaj sa raz a dvere nechaj otvorené.',
                    },
                },
                sources: ['PAR-013', 'PAR-052'],
            },
            withdrawing: {
                know: {
                    en: 'Some school-age children go quiet when upset or after a long day, and a quiet child can be hard to read. Withdrawal that simply restores energy is different from withdrawal that comes with worry, tearfulness or avoiding friends, and the second kind deserves attention.',
                    sk: 'Niektoré deti v školskom veku pri trápení alebo po dlhom dni stíchnu, a v tichom dieťati sa ťažko vyznať. Stiahnutie, ktoré len vracia energiu, je iné než stiahnutie so strachom, plačlivosťou alebo vyhýbaním sa kamarátom, a to druhé si zaslúži pozornosť.',
                },
                try: {
                    en: 'Allow quiet time without treating it as a problem, and stay available: sit nearby, offer a shared activity, mention once that talking is possible later. Watch whether the withdrawal comes with distress or spreads across home, school and friendships; if it does and lasts, tell the paediatrician.',
                    sk: 'Dopraj čas v tichu bez toho, aby sa z toho stal problém, a zostaň k dispozícii: sadni si nablízku, ponúkni spoločnú činnosť, raz spomeň, že sa dá porozprávať aj neskôr. Sleduj, či stiahnutie prichádza s trápením alebo sa rozširuje na domov, školu aj kamarátstva; ak áno a trvá, povedz to pediatrovi.',
                },
                fit: {
                    introspective: {
                        en: 'For a child who recharges in quiet, the quiet after school may be restoring rather than worrying; protect it, and expect the talk to come later, often at bedtime.',
                        sk: 'Pre dieťa, ktoré si oddýchne najmä v tichu, môže byť ticho po škole skôr oddychom než dôvodom na obavy; chráň tento čas a rátaj s tým, že rozhovor príde neskôr, často pred spaním.',
                    },
                    'outwardly-engaged': {
                        en: 'In a child who usually seeks company and talk, long silences are less typical, so a sudden stop in the chatter is worth a gentle, unhurried check-in.',
                        sk: 'Pri dieťati, ktoré zvyčajne vyhľadáva spoločnosť a rozhovor, sú dlhé ticha menej typické, takže keď zrazu stíchne, oplatí sa jemne a bez náhlenia zistiť, čo sa deje.',
                    },
                },
                sources: ['PAR-032', 'PAR-052'],
            },
            'change-and-transitions': {
                know: {
                    en: 'Mornings, the switch from play to homework and the end of a holiday are the daily pressure points of this age. Bigger changes, such as a new school, a move or a change in the family, can take weeks to settle.',
                    sk: 'Rána, prechod od hry k úlohám a koniec prázdnin sú každodenné tlakové body tohto veku. Väčšie zmeny, ako nová škola, sťahovanie alebo zmena v rodine, sa môžu usádzať celé týždne.',
                },
                try: {
                    en: 'Keep a predictable rhythm for mornings and evenings, with a picture checklist the child can follow unaided. Before a big change, explain what will stay the same as well as what will be new, and visit or rehearse where possible. A family media plan with device-free times, such as meals, makes leaving the screen part of the routine rather than a nightly fight.',
                    sk: 'Ráno a večer udrž predvídateľný rytmus s obrázkovým zoznamom, ktorý dieťa zvládne prejsť bez pomoci. Pred veľkou zmenou vysvetli, čo zostane rovnaké, nielen čo bude nové, a ak sa dá, miesto navštív alebo si situáciu nacvič. Rodinný plán médií s časmi bez zariadení, napríklad pri jedle, urobí z odchodu od obrazovky súčasť rytmu, nie každovečerný boj.',
                },
                fit: {
                    'stability-seeking': {
                        en: 'A child who leans toward the familiar may be helped more by a list of what stays the same than by any reassurance about what is new.',
                        sk: 'Zoznam toho, čo zostane rovnaké, môže dieťaťu so sklonom k stálosti pomôcť viac než akékoľvek uisťovanie o novom.',
                    },
                    'novelty-seeking': {
                        en: 'A child drawn to the new may find routines dull; let the child vary the order or design part of the checklist, keeping the end point fixed.',
                        sk: 'Dieťaťu, ktoré láka nové, môže rutina pripadať nudná; nechaj dieťa meniť poradie alebo vymyslieť časť zoznamu, no cieľ nechaj pevný.',
                    },
                },
                sources: ['PAR-024', 'PAR-042', 'PAR-002'],
            },
            independence: {
                know: {
                    en: 'Early responsibility suits this age: packing a bag, a small household job, a short familiar route walked with an adult a step behind, or with older children the adults trust. A child can make sensible choices about personal matters, while judgement about safety and time is still developing.',
                    sk: 'Prvé zodpovednosti sa k tomuto veku hodia: zbaliť si tašku, drobná domáca povinnosť, krátka známa cesta s dospelým o krok pozadu alebo so staršími deťmi, ktorým dospelí dôverujú. Dieťa už zvládne rozumné voľby v osobných veciach, kým úsudok o bezpečí a čase sa ešte len vyvíja.',
                },
                try: {
                    en: 'Hand over one responsibility at a time and let small natural consequences teach, such as a forgotten snack. Offer real decisions about clothes, hobbies and free time, and keep firm limits around roads, the internet and bedtime.',
                    sk: 'Odovzdávaj po jednej zodpovednosti a nechaj malé prirodzené následky učiť, napríklad zabudnutú desiatu. Ponúkni skutočné rozhodnutia o oblečení, záľubách a voľnom čase a pevné hranice drž pri ceste, internete a čase spánku.',
                },
                fit: {
                    independent: {
                        en: 'A child who leans toward managing alone may turn down help even when it is needed; agree in advance on when an adult will check in.',
                        sk: 'Dieťa, ktoré chce veci zvládať samo, môže odmietať pomoc, aj keď je potrebná; vopred sa dohodni, kedy sa dospelý človek príde pozrieť, ako to ide.',
                    },
                    collaborative: {
                        en: 'For a child who likes doing things together, a responsibility may stick better when shared at first, such as cooking a meal together before making a sandwich alone.',
                        sk: 'Pri dieťati, ktoré rado robí veci spolu s niekým, sa zodpovednosť môže lepšie ujať, keď sa najprv delí: najprv spoločné varenie, potom chlieb, ktorý si dieťa pripraví samo.',
                    },
                },
                sources: ['PAR-012', 'PAR-010'],
            },
            siblings: {
                know: {
                    en: 'At this age fairness becomes the battleground with a brother or sister, older or younger: who got more, who went first, who is allowed what. Warmer, less conflictual sibling relationships and less unequal treatment are linked to fewer difficulties.',
                    sk: 'Spravodlivosť sa v tomto veku stáva bojiskom medzi súrodencami bez ohľadu na to, či je súrodenec starší alebo mladší: kto dostal viac, kto išiel prvý, kto čo smie. Vrúcnejšie a menej konfliktné súrodenecké vzťahy a menej nerovnaké zaobchádzanie súvisia s menším počtom ťažkostí.',
                },
                try: {
                    en: 'Teach simple skills for disagreements (speak in turn, calm down first, ask for what is wanted) and coach in the moment rather than only punishing. Notice and praise moments when the siblings enjoy each other, and set up shared projects both like. Take frequent, intense fighting seriously and look for support if it does not ease.',
                    sk: 'Nauč deti jednoduché zručnosti na nezhody (hovoriť po jednom, najprv sa upokojiť, povedať, čo chcem) a usmerňuj priamo v situácii, nielen trestaj. Všímaj si a chváľ chvíle, keď sa súrodencom spolu darí, a priprav spoločné projekty, ktoré bavia každé z detí. Časté a prudké bitky ber vážne, a ak neustupujú, vyhľadaj podporu.',
                },
                sources: ['PAR-035', 'PAR-037', 'PAR-036'],
            },
            'two-adults': {
                know: {
                    en: 'School brings new decisions on which the adults may differ: homework, activities, screens, pocket money. A child this age notices those disagreements, and how the child experiences conflict between the adults is linked, modestly, to how the child fares.',
                    sk: 'Škola prináša nové rozhodnutia, v ktorých sa dospelí môžu rozchádzať: úlohy, krúžky, obrazovky, vreckové. Dieťa v tomto veku nezhody vníma, a to, ako konflikt medzi dospelými prežíva, mierne súvisí s pohodou dieťaťa.',
                },
                try: {
                    en: 'Settle disagreements about the child privately and calmly, and present the decision together. Avoid criticising the other adult’s parenting in front of the child, and do not ask the child to take sides or carry messages between homes. In households shaped differently, the same holds for anyone who shares the care.',
                    sk: 'Nezhody o dieťati riešte v súkromí a pokojne a rozhodnutie predstavte spoločne. Pred dieťaťom nekritizujte, ako vychováva druhý človek, a nežiadajte od dieťaťa voľbu strany ani nosenie odkazov medzi domácnosťami. V inak usporiadaných rodinách platí to isté pre každého, kto sa o dieťa stará.',
                },
                sources: ['PAR-039', 'PAR-038'],
            },
        },
    },
    /* ----------------------------------------------------------------------------------------------------------------------- middle school -- */
    {
        band: 'middle-school-9-12',
        label: { en: 'Middle childhood, nine to twelve', sk: 'Starší školský vek, od deviatich do dvanástich rokov' },
        portrait: {
            en: 'From nine to twelve, friends gain weight, independence grows and, for many, the first changes of puberty bring stronger and more changeable feelings. A child this age reasons well and wants a real say. The stance that fits stays close without hovering: explain the reasons, and negotiate wherever safety allows.',
            sk: 'Medzi deviatym a dvanástym rokom naberajú na váhe kamaráti, rastie samostatnosť a u mnohých detí prvé zmeny puberty prinášajú silnejšie a premenlivejšie city. Dieťa v tomto veku dobre uvažuje a chce mať skutočné slovo. V tomto veku pomáha byť nablízku bez neustáleho dozoru: vysvetľovať dôvody a vyjednávať všade, kde to bezpečie dovolí.',
        },
        notYet: {
            en: 'A child this age cannot yet weigh long-term risks the way an adult does, especially with friends watching, or manage a phone and social apps without guidance. A sudden demand to carry full responsibility for school, money or a younger sibling skips steps this age still needs.',
            sk: 'Dieťa v tomto veku ešte nevie vážiť dlhodobé riziká tak ako dospelý človek, najmä keď sa pozerajú kamaráti, ani zvládnuť telefón a sociálne aplikácie bez vedenia. Náhla požiadavka niesť plnú zodpovednosť za školu, peniaze či mladšieho súrodenca preskakuje kroky, ktoré tento vek ešte potrebuje.',
        },
        situations: {
            communicating: {
                know: {
                    en: 'Conversation can become surprisingly grown-up at this age, alongside eye-rolling and a new wish to keep friends private. Talking about why school and interests matter, and about the child’s own goals, seems to help more than checking up on details.',
                    sk: 'Rozhovor sa v tomto veku vie stať prekvapivo dospelým, popri prevracaní očí a novej túžbe nechať si kamarátov pre seba. Rozprávanie o tom, prečo na škole a záľubách záleží a aké ciele má samo dieťa, podľa všetkého pomáha viac než kontrola detailov.',
                },
                try: {
                    en: 'Ask about goals and interests, not just marks, and share honestly what mattered to you at that age. Stay calm and listen through heated moments, and come back to the point later. Keep at least one regular, low-key time to talk, such as a weekly walk or a shared series.',
                    sk: 'Pýtaj sa na ciele a záujmy, nielen na známky, a úprimne povedz, na čom ti v tom veku záležalo. V horúcich chvíľach zachovaj pokoj, počúvaj a k veci sa vráť neskôr. Udrž si aspoň jeden pravidelný, nenáročný čas na rozhovor, napríklad týždennú prechádzku alebo spoločný seriál.',
                },
                fit: {
                    analytical: {
                        en: 'A child who looks for reasons may welcome a real debate; conceding a good point openly shows that reasons count.',
                        sk: 'Dieťa, ktoré hľadá dôvody, môže skutočná debata baviť; dobrý argument otvorene uznaj, lebo to ukazuje, že dôvody platia.',
                    },
                    intuitive: {
                        en: 'A child who goes more by feel may sense tension before a word is spoken; when the adult names a bad mood honestly, the child need not fill the gap with guesses.',
                        sk: 'Dieťa, ktoré sa riadi skôr pocitom, môže vycítiť napätie skôr, než padne slovo; keď dospelý človek svoju zlú náladu úprimne pomenuje, dieťa nemusí medzeru vypĺňať dohadmi.',
                    },
                },
                sources: ['PAR-027', 'PAR-029'],
            },
            'rules-and-limits': {
                know: {
                    en: 'Rules are now argued, not just tested, and a child this age responds best to limits that are explained and partly negotiated. Firmness on safety still matters, while rigid control over personal matters tends to bring more resistance.',
                    sk: 'O pravidlách sa teraz už diskutuje, nielen sa skúšajú, a dieťa tohto veku najlepšie prijíma hranice, ktoré sú vysvetlené a sčasti vyjednané. Na pevnosti v otázkach bezpečia stále záleží, no strnulá kontrola osobných vecí zvykne vyvolať viac odporu.',
                },
                try: {
                    en: 'Sort rules into two groups with the child: the safety ones that are not up for debate, and the personal ones where the child’s say grows. Build a family media plan together, with device-free times such as meals and bedtime, and adults keeping to it too. Keep consequences proportionate, and leave out guilt-tripping and withdrawn affection, which tend to make struggles worse.',
                    sk: 'Roztrieď s dieťaťom pravidlá do dvoch skupín: bezpečnostné, o ktorých sa nediskutuje, a osobné, v ktorých slovo dieťaťa rastie. Spolu zostav rodinný plán médií s časmi bez zariadení, napríklad pri jedle a pred spaním, a nech platí aj pre dospelých. Následky nech sú primerané a vynechaj vyvolávanie viny či odopieranie náklonnosti, ktoré boje zvyčajne zhoršujú.',
                },
                fit: {
                    structured: {
                        en: 'To a child who likes order, a written agreement with clear terms may feel fairer than a spoken one that shifts.',
                        sk: 'Dieťaťu, ktoré má rado poriadok, môže písomná dohoda s jasnými podmienkami pripadať spravodlivejšia než ústna, ktorá sa posúva.',
                    },
                    adaptable: {
                        en: 'With a child who leans toward improvising, agree on outcomes rather than methods, and review the deal every few weeks instead of policing each step.',
                        sk: 'S dieťaťom, ktoré skôr improvizuje, sa oplatí dohodnúť na výsledkoch, nie na postupe, a dohodu raz za pár týždňov prehodnotiť namiesto stráženia každého kroku.',
                    },
                },
                sources: ['PAR-012', 'PAR-042', 'PAR-010'],
            },
            'strong-feelings': {
                know: {
                    en: 'Early puberty can bring sharper moods, more intense arguments and feelings that surprise the child as much as the adults. Arguments do not necessarily become more frequent, yet each one can feel more charged.',
                    sk: 'Začínajúca puberta môže priniesť ostrejšie nálady, prudšie hádky a city, ktoré prekvapia dieťa rovnako ako dospelých. Hádok nemusí byť viac, no každá môže byť nabitejšia.',
                },
                try: {
                    en: 'Stay calm in the storm, listen first, and postpone problem-solving until feelings have cooled on both sides. Talk about how feelings change with growing up, so the child has words for what is happening. Mood or behaviour that lasts for weeks, causes distress or affects school, home or friendships is a reason to seek an evaluation, starting with the paediatrician.',
                    sk: 'V búrke zachovaj pokoj, najprv počúvaj a riešenie odlož, kým emócie na oboch stranách nevychladnú. Porozprávaj sa o tom, ako sa city s dospievaním menia, aby malo dieťa slová pre to, čo sa deje. Nálada alebo správanie, ktoré trvá týždne, spôsobuje trápenie alebo zasahuje do školy, domova či kamarátstiev, je dôvodom vyhľadať odborné posúdenie, najprv u pediatra.',
                },
                fit: {
                    'emotionally-expressive': {
                        en: 'With a child whose feelings tend to come out loud, volume can rise sharply. Agree in a calm moment on a signal for taking a break, one that binds the adult as much as the child.',
                        sk: 'S dieťaťom, ktorého city zvyknú vychádzať nahlas, môže hlasitosť prudko stúpať; v pokojnej chvíli sa dohodni na znamení pre prestávku, ktoré zaväzuje dospelého človeka rovnako ako dieťa.',
                    },
                    'emotionally-contained': {
                        en: 'In a child who tends to keep feelings in, strong feelings may stay invisible for a long time; a regular one-to-one activity gives those feelings somewhere to surface.',
                        sk: 'U dieťaťa, ktoré city drží skôr vnútri, môžu silné city zostať dlho neviditeľné; pravidelná spoločná činnosť vo dvojici im dáva miesto, kde môžu vyplávať.',
                    },
                },
                sources: ['PAR-029', 'PAR-028', 'PAR-052'],
            },
            withdrawing: {
                know: {
                    en: 'More time alone in a room, more privacy about friends and less chat at dinner are common at this age and often healthy. Withdrawal becomes a concern when it comes with distress, falling-away friendships or a slide at school.',
                    sk: 'Viac času v izbe, viac súkromia o kamarátoch a menej vravy pri večeri sú v tomto veku bežné a často zdravé. Stiahnutie sa stáva dôvodom na obavy, keď prichádza spolu s trápením, rozpadom kamarátstiev alebo zhoršením v škole.',
                },
                try: {
                    en: 'Respect a closed door while keeping small daily contact: a snack delivered, a question about a game, a lift to practice. Notice whether the withdrawal is restful or worried, and ask directly but gently if something has happened. If distress lasts for weeks or spreads across settings, speak to the paediatrician or a school counsellor.',
                    sk: 'Rešpektuj zatvorené dvere a zároveň udrž drobný každodenný kontakt: prinesená desiata, otázka na hru, odvoz na tréning. Všímaj si, či je stiahnutie oddychové, alebo ustarostené, a ak sa niečo stalo, opýtaj sa priamo, no jemne. Ak trápenie trvá týždne alebo sa rozširuje do viacerých prostredí, porozprávaj sa s pediatrom alebo so školským psychológom.',
                },
                fit: {
                    introspective: {
                        en: 'For a child who recharges in quiet, solitude may be fuel; the useful question is whether the child seems settled afterwards, not how long the door stays shut.',
                        sk: 'Pre dieťa, ktoré si oddýchne najmä v tichu, môže byť samota palivom; užitočná otázka je, či dieťa pôsobí potom vyrovnane, nie ako dlho zostanú dvere zatvorené.',
                    },
                    'outwardly-engaged': {
                        en: 'In a child who usually seeks company, withdrawal from friends is more unusual and more telling; check gently for trouble in the group or online.',
                        sk: 'Pri dieťati, ktoré zvyčajne vyhľadáva spoločnosť, je stiahnutie od kamarátov nezvyčajnejšie a výpovednejšie; jemne zisti, či sa niečo nedeje v partii alebo na internete.',
                    },
                },
                sources: ['PAR-032', 'PAR-052'],
            },
            'change-and-transitions': {
                know: {
                    en: 'The move to a bigger school, changing friendships and a changing body all arrive in these years, often at once. Routines that hold steady at home, especially around sleep and meals, give a child this age something reliable while much else shifts.',
                    sk: 'Prechod na väčšiu školu, meniace sa kamarátstva a meniace sa telo prichádzajú práve v týchto rokoch, často naraz. Rutina, ktorá doma drží, najmä okolo spánku a jedla, dáva dieťaťu niečo spoľahlivé, kým sa veľa iného hýbe.',
                },
                try: {
                    en: 'Talk through an upcoming school change concretely: the route, the timetable, who to ask for help. Protect sleep by keeping devices out of the bedroom at night, as part of a family plan everyone follows. Expect a few rough weeks after a big change, and stay in touch with the school if the dip does not lift.',
                    sk: 'Blížiacu sa zmenu školy preber konkrétne: cestu, rozvrh, na koho sa obrátiť o pomoc. Spánok chráň tým, že zariadenia v noci zostanú mimo spálne, ako súčasť rodinného plánu, ktorý platí pre všetkých. Po veľkej zmene rátaj s pár ťažšími týždňami, a ak sa útlm nedvíha, zostaň v kontakte so školou.',
                },
                fit: {
                    'stability-seeking': {
                        en: 'For a child who leans toward the familiar, a preview visit and a familiar companion for the first days can make a new school much easier.',
                        sk: 'Dieťaťu so sklonom k stálosti môžu návšteva vopred a známy spoločník na prvé dni začiatok v novej škole výrazne uľahčiť.',
                    },
                    'novelty-seeking': {
                        en: 'A child drawn to the new may welcome change and find follow-through harder; help the child choose which new things to keep once the excitement fades.',
                        sk: 'Dieťa, ktoré láka nové, môže zmenu vítať, no s dotiahnutím vecí do konca to býva ťažšie; pomôž dieťaťu vybrať, ktoré nové veci si nechá, keď nadšenie opadne.',
                    },
                },
                sources: ['PAR-024', 'PAR-042', 'PAR-052'],
            },
            independence: {
                know: {
                    en: 'Independence widens quickly: going places alone, handling money, choosing friends and activities. Involvement still helps, but its form changes; talking about goals seems to help more than supervising homework, and taking over the work is not linked to better results.',
                    sk: 'Samostatnosť sa rýchlo rozširuje: cesty bez sprievodu, narábanie s peniazmi, výber kamarátov a činností. Záujem dospelého človeka stále pomáha, len mení podobu; rozhovor o cieľoch podľa všetkého pomáha viac než dozor nad úlohami, a preberanie práce za dieťa s lepšími výsledkami nesúvisí.',
                },
                try: {
                    en: 'Increase responsibility step by step, such as a first solo journey on a known route with an agreed check-in. Offer homework help when asked, but let the child do the thinking. Agree together on the first rules for a phone or social apps, and revisit the agreement as trust grows.',
                    sk: 'Zodpovednosť pridávaj postupne, napríklad prvá samostatná cesta po známej trase s dohodnutým ozvaním sa. Pomoc s úlohami ponúkni, keď dieťa požiada, no premýšľanie nechaj na dieťati. Prvé pravidlá pre telefón a sociálne aplikácie dohodni spoločne a dohodu upravuj, ako rastie dôvera.',
                },
                fit: {
                    independent: {
                        en: 'A child who leans toward managing alone: offer freedom in exchange for reliable check-ins, and widen it each time the deal holds.',
                        sk: 'Dieťaťu, ktoré chce veci zvládať samo, ponúkni slobodu výmenou za spoľahlivé ozvanie sa a tento priestor rozširuj zakaždým, keď dohoda vydrží.',
                    },
                    collaborative: {
                        en: 'A child who likes doing things together may prefer trying new things with a friend or an adult; a shared first attempt is a fine bridge to a solo second one.',
                        sk: 'Dieťa, ktoré rado robí veci spolu s niekým, môže radšej skúšať nové veci s kamarátom alebo dospelým; spoločný prvý pokus je dobrým mostom k druhému, samostatnému.',
                    },
                },
                sources: ['PAR-027', 'PAR-042', 'PAR-012'],
            },
            siblings: {
                know: {
                    en: 'Sibling conflict can sharpen in these years, and comparison with a brother or sister, older or younger, stings more as a child becomes aware of standing among peers. Being, or feeling, less favoured than a sibling is linked to more difficulty, though different treatment justified by age or need is not the problem.',
                    sk: 'Súrodenecký konflikt sa v týchto rokoch môže zostriť, a porovnávanie so starším či mladším súrodencom bolí viac, keď si dieťa uvedomuje svoje postavenie medzi rovesníkmi. Keď je dieťa menej uprednostňované než súrodenec, alebo sa tak cíti, súvisí to s väčšími ťažkosťami; rozdiel odôvodnený vekom či potrebami však problémom nie je.',
                },
                try: {
                    en: 'Explain openly why rules differ between siblings (a later bedtime for the older, more help for the younger) and invite questions about fairness. Give each child some private space and possessions that are protected. Coach disagreement skills and mediate rather than only punishing, and seek support if fighting is frequent and intense.',
                    sk: 'Otvorene vysvetli, prečo sa pravidlá medzi súrodencami líšia (neskoršie spanie pre staršie dieťa, viac pomoci pre mladšie), a pozvi otázky o spravodlivosti. Každému dieťaťu dopraj kúsok vlastného priestoru a vecí, ktoré sú chránené. Uč zručnosti na nezhody a sprostredkuj, nielen trestaj, a ak sú bitky časté a prudké, vyhľadaj podporu.',
                },
                sources: ['PAR-035', 'PAR-036', 'PAR-037'],
            },
            'two-adults': {
                know: {
                    en: 'Differences between the adults now concern bigger questions: phones, freedom to go out, money, pressure at school. A child this age quickly finds the softer answer when the rules differ, and feels the adults’ conflict keenly.',
                    sk: 'Rozdiely medzi dospelými sa teraz týkajú väčších otázok: telefónov, voľnosti chodiť von, peňazí, tlaku v škole. Dieťa v tomto veku rýchlo nájde miernejšiu odpoveď, keď sa pravidlá líšia, a konflikt dospelých citlivo vníma.',
                },
                try: {
                    en: 'Agree the main rules on devices and freedom between the adults before the child asks, so that asking each adult separately brings the same answer. Disagree in private, and when an argument has spilled over, let the repair happen in front of the child too. Where homes are separate, a short written summary of shared rules can spare the child from carrying the negotiation.',
                    sk: 'Hlavné pravidlá o zariadeniach a voľnosti si dohodnite skôr, než sa dieťa spýta, aby otázka položená každému z vás zvlášť priniesla rovnakú odpoveď. Nesúhlas riešte v súkromí, a keď sa hádka predsa preleje pred dieťa, nech sa pred dieťaťom odohrá aj zmierenie. Ak sú domovy oddelené, krátke písomné zhrnutie spoločných pravidiel môže dieťa ušetriť od toho, aby vyjednávanie nieslo na vlastných pleciach.',
                },
                sources: ['PAR-038', 'PAR-039'],
            },
        },
    },
    /* ------------------------------------------------------------------------------------------------------------------ early adolescence -- */
    {
        band: 'early-adolescence-13-15',
        label: { en: 'Early adolescence, thirteen to fifteen', sk: 'Mladší tínedžer, od trinástich do pätnástich rokov' },
        portrait: {
            en: 'Between thirteen and fifteen, identity, friendship and privacy take centre stage, and a young teenager can reason well and still act on impulse when feelings run high. Disagreements tend to become less frequent but more heated. The stance that fits keeps the safety limits clear, explains the reasons, and makes it easy for the teenager to tell the adult things voluntarily.',
            sk: 'Medzi trinástym a pätnástym rokom sa do popredia dostávajú identita, priateľstvá a súkromie, a tínedžer vie dobre uvažovať, a predsa konať impulzívne, keď sú city silné. Nezhody bývajú menej časté, no vyhrotenejšie. V tomto veku pomáha držať jasné bezpečnostné hranice, vysvetľovať ich dôvody a uľahčiť mladému človeku, aby sa zdôveril dobrovoľne.',
        },
        notYet: {
            en: 'A young teenager cannot yet be expected to judge risk well in the heat of the moment with friends present, or to defend sleep against a phone unaided. Demanding full openness on cue, or adult-level emotional control, misreads this age.',
            sk: 'Od tínedžera sa ešte nedá čakať, že v zápale chvíle a pred kamarátmi rozumne odhadne riziko alebo bez pomoci ubráni spánok pred telefónom. Žiadať úplnú otvorenosť na povel či ovládanie citov na úrovni dospelého človeka tomuto veku nezodpovedá.',
        },
        situations: {
            communicating: {
                know: {
                    en: 'What adults know about a young teenager’s life comes mostly from what the teenager chooses to share, and sharing grows where talk feels safe rather than like an interrogation. A lecture tends to close a conversation that listening would have kept open.',
                    sk: 'To, čo dospelí vedia o živote tínedžera, pochádza väčšinou z toho, čo sa tínedžer rozhodne povedať, a ochota rozprávať rastie tam, kde rozhovor pôsobí bezpečne, nie ako výsluch. Kázanie zvykne zavrieť rozhovor, ktorý by počúvanie nechalo otvorený.',
                },
                try: {
                    en: 'Listen more than you lecture, and react to small disclosures calmly so that bigger ones feel possible. Choose low-pressure moments such as car journeys or a late snack in the kitchen. Avoid catastrophising: hear the whole story before responding, and say thank you for being told.',
                    sk: 'Viac počúvaj, než kážeš, a na malé priznania reaguj pokojne, aby sa tie väčšie zdali možné. Vyberaj si nenáročné chvíle, napríklad cestu autom alebo neskoré jedlo v kuchyni. Vyhni sa katastrofickým scenárom: vypočuj si celý príbeh, až potom reaguj, a poďakuj za dôveru.',
                },
                fit: {
                    analytical: {
                        en: 'A teenager who looks for reasons may open up more while discussing ideas, news or a problem in general than when asked directly about feelings.',
                        sk: 'Tínedžer, ktorý hľadá dôvody, sa môže viac otvoriť pri rozhovore o myšlienkach, správach alebo probléme vo všeobecnosti než pri priamych otázkach na city.',
                    },
                    intuitive: {
                        en: 'A teenager who goes more by feel may read the adult’s face before the words, so a calm expression on hearing hard news matters as much as the reply.',
                        sk: 'Tínedžer, ktorý sa riadi skôr pocitom, môže vyčítať viac z tváre dospelého človeka než zo slov, takže pokojný výraz pri ťažkej správe znamená rovnako veľa ako odpoveď.',
                    },
                },
                sources: ['PAR-030', 'PAR-029'],
            },
            'rules-and-limits': {
                know: {
                    en: 'A young teenager who feels over-controlled tends to fare worse, yet clear safety limits still matter, because judgement under pressure is still developing. The useful balance is firm on safety, explained, and proportionate in its checks.',
                    sk: 'Tínedžerovi, ktorý sa cíti prehnane kontrolovaný, sa zvyčajne darí horšie, a predsa na jasných bezpečnostných hraniciach stále záleží, lebo úsudok pod tlakom sa ešte vyvíja. Pomáha pevnosť v otázkach bezpečia, vysvetlené dôvody a primerané kontroly.',
                },
                try: {
                    en: 'Keep a short list of non-negotiable safety rules and explain each one; negotiate the rest, such as details of getting home or the state of a bedroom. Protect a long night’s sleep by agreeing where phones spend the night. Keep checks proportionate and open rather than secret; where there is a genuine safety risk, act and seek professional help.',
                    sk: 'Maj krátky zoznam bezpečnostných pravidiel, o ktorých sa nediskutuje, a každé vysvetli; o ostatnom, napríklad o detailoch návratu domov či poriadku v izbe, sa dá vyjednávať. Dlhý nočný spánok chráň dohodou, kde telefóny trávia noc. Kontroly nech sú primerané a otvorené, nie tajné; ak ide o skutočné ohrozenie bezpečia, konaj a vyhľadaj odbornú pomoc.',
                },
                fit: {
                    structured: {
                        en: 'A teenager who likes order may welcome clear terms agreed in advance; the risk is rigidity on both sides, so set a date for a review.',
                        sk: 'Tínedžerovi, ktorý má rád poriadok, môžu vopred dohodnuté jasné podmienky vyhovovať; rizikom je strnulosť na oboch stranách, preto si urči termín prehodnotenia.',
                    },
                    adaptable: {
                        en: 'With a teenager who leans toward improvising, focus on the few rules that protect safety and accept more improvisation elsewhere, which keeps the important rules credible.',
                        sk: 'Pri tínedžerovi, ktorý skôr improvizuje, sa sústreď na tých pár pravidiel, ktoré chránia bezpečie, a vo zvyšku prijmi viac improvizácie; dôležité pravidlá si tak zachovajú váhu.',
                    },
                },
                sources: ['PAR-030', 'PAR-028', 'PAR-026'],
            },
            'strong-feelings': {
                know: {
                    en: 'Emotional intensity rises in these years even as arguments grow less frequent, and moods can swing within an evening. Most of this is ordinary growing up; persistent low mood, withdrawal from everything, or talk of self-harm is not, and needs a different response.',
                    sk: 'Citová intenzita v týchto rokoch rastie, aj keď hádok ubúda, a nálada sa môže preklopiť v priebehu jedného večera. Väčšina z toho je bežné dospievanie; dlhodobo skleslá nálada, stiahnutie zo všetkého alebo reči o sebapoškodení bežné nie sú a vyžadujú inú odpoveď.',
                },
                try: {
                    en: 'When things heat up, stay calm, listen, and save the lesson for later. Show how an adult handles strong feelings: naming the feeling, pausing, apologising when needed. If low mood, anxiety or anger lasts for weeks or affects school, home or friends, seek an evaluation. If there is talk of self-harm or of harming others, get urgent help at once through local emergency or crisis services.',
                    sk: 'Keď sa situácia vyhrotí, zachovaj pokoj, počúvaj a ponaučenie si nechaj na neskôr. Ukáž, ako dospelý človek zvláda silné city: pomenuje pocit, urobí pauzu, ospravedlní sa, keď treba. Ak skleslosť, úzkosť alebo hnev trvá týždne či zasahuje do školy, domova a kamarátstiev, vyhľadaj odborné posúdenie; pri rečiach o sebapoškodení alebo ublížení iným hľadaj okamžitú pomoc cez miestne pohotovostné či krízové služby.',
                },
                fit: {
                    'emotionally-expressive': {
                        en: 'In a teenager whose feelings tend to come out loud, outbursts may be loud and brief; responding to the substance once the volume drops helps the teenager not to feel dismissed.',
                        sk: 'U tínedžera, ktorého city zvyknú vychádzať nahlas, môžu byť výbuchy hlasné a krátke; keď na obsah zareaguješ až po tom, čo hlasitosť klesne, pomôže to, aby sa tínedžer necítil odbitý.',
                    },
                    'emotionally-contained': {
                        en: 'In a teenager who tends to keep feelings in, distress can stay well hidden, so watch for changes in sleep, friends and interests rather than waiting for words.',
                        sk: 'U tínedžera, ktorý city drží skôr vnútri, môže trápenie zostať dobre skryté, preto sleduj zmeny v spánku, kamarátstvach a záujmoch a nečakaj na slová.',
                    },
                },
                sources: ['PAR-029', 'PAR-052', 'PAR-028', 'PAR-013'],
            },
            withdrawing: {
                know: {
                    en: 'Wanting privacy, time alone and a closed door is a normal part of early adolescence, and secrecy about small things is common. A teenager who shares voluntarily tends to do better than one who is tracked, though a genuine safety risk is an exception that may call for closer oversight.',
                    sk: 'Túžba po súkromí, čase osamote a zatvorených dverách patrí k ranému dospievaniu a tajnosti o drobnostiach sú bežné. Tínedžerovi, ktorý sa zdôveruje dobrovoľne, sa zvyčajne darí lepšie než tomu, koho dospelí sledujú, no skutočné ohrozenie bezpečia je výnimkou, ktorá si môže vyžiadať bližší dohľad.',
                },
                try: {
                    en: 'Respect privacy about friends and feelings while keeping the everyday connection going: shared meals, lifts, a running joke. Keep invitations open without pressing. If withdrawal comes with lasting distress, dropping out of friendships or activities, or an intense, persistent fear of social situations, talk to the paediatrician or a psychologist.',
                    sk: 'Rešpektuj súkromie v kamarátstvach a citoch a zároveň udržiavaj každodenné spojenie: spoločné jedlo, odvozy, spoločný vtip. Pozvania nechaj otvorené, bez naliehania. Ak stiahnutie prichádza s dlhodobým trápením, odchodom od kamarátov či záľub alebo so silným a trvalým strachom zo spoločenských situácií, porozprávaj sa s pediatrom alebo psychológom.',
                },
                fit: {
                    introspective: {
                        en: 'For a teenager who recharges in quiet, long stretches alone may be how things get thought through; brief, regular contact matters more than long talks.',
                        sk: 'Pre tínedžera, ktorý si oddýchne najmä v tichu, môžu byť dlhé chvíle osamote spôsobom, ako si veci premyslieť; krátky pravidelný kontakt znamená viac než dlhé rozhovory.',
                    },
                    'outwardly-engaged': {
                        en: 'A teenager who usually seeks company may withdraw into friends rather than into a room; real interest in those friends can keep a line open.',
                        sk: 'Tínedžer, ktorý zvyčajne vyhľadáva spoločnosť, sa môže stiahnuť skôr ku kamarátom než do izby; skutočný záujem o týchto kamarátov môže udržať spojenie otvorené.',
                    },
                },
                sources: ['PAR-030', 'PAR-031', 'PAR-052'],
            },
            'change-and-transitions': {
                know: {
                    en: 'Puberty, a new school, shifting friendships and a later body clock pile up in these years. Early school starts and late screens together tend to cut into sleep, and short sleep can sharpen mood.',
                    sk: 'Puberta, nová škola, meniace sa kamarátstva a neskôr nastavené vnútorné hodiny sa v týchto rokoch kopia. Skorý začiatok vyučovania a obrazovky do noci spolu zvyknú ukrajovať zo spánku, a nedostatok spánku dokáže zostriť náladu.',
                },
                try: {
                    en: 'Protect the chance to sleep: agree a time when devices leave the bedroom, and keep late activities from eating into the night. Talk big changes through ahead of time and ask what would help, rather than deciding alone. Judge screen use by what it displaces, such as sleep, movement, friends and mood, more than by hours.',
                    sk: 'Chráň čas na spánok: dohodni sa, kedy zariadenia odchádzajú zo spálne, a nenechaj neskoré aktivity zasahovať do noci. Veľké zmeny preber vopred a opýtaj sa, čo by pomohlo, namiesto rozhodovania bez tínedžera. Obrazovky posudzuj skôr podľa toho, čo vytláčajú (spánok, pohyb, kamarátov, náladu), než podľa hodín.',
                },
                fit: {
                    'stability-seeking': {
                        en: 'A teenager who leans toward the familiar may find a big change harder than it looks from outside; keep familiar anchors such as a hobby or a weekly ritual going through it.',
                        sk: 'Tínedžerovi so sklonom k stálosti môže veľká zmena padnúť ťažšie, než to navonok vyzerá; počas zmeny udrž známe kotvy, napríklad záľubu alebo týždenný rituál.',
                    },
                    'novelty-seeking': {
                        en: 'A teenager drawn to the new may be pulled quickly by new experiences; talk the safety side through in advance rather than forbidding the new outright.',
                        sk: 'Tínedžera, ktorého láka nové, môžu nové zážitky rýchlo pritiahnuť; bezpečnostnú stránku preber vopred, namiesto toho, aby sa nové rovno zakázalo.',
                    },
                },
                sources: ['PAR-026', 'PAR-043', 'PAR-042'],
            },
            independence: {
                know: {
                    en: 'Independence becomes the central negotiation: where to go, with whom, until when. A young teenager can reason well about risk in calm moments and still act on impulse in hot ones, so judgement grows best through graded responsibility inside clear safety limits.',
                    sk: 'Samostatnosť sa stáva hlavným predmetom vyjednávania: kam, s kým, dokedy. Tínedžer vie v pokojnej chvíli o riziku dobre uvažovať, a v horúcej predsa konať impulzívne, preto úsudok najlepšie rastie cez postupne pridávanú zodpovednosť v jasných bezpečnostných hraniciach.',
                },
                try: {
                    en: 'Widen freedoms in steps, each tied to an agreement that has been kept, and explain the reasoning when a request is refused. Talk about goals and what school means to the teenager rather than checking every assignment. Plan ahead together for hard moments, such as how to leave a party that feels wrong, with a lift home and no interrogation.',
                    sk: 'Voľnosť rozširuj po krokoch, každý viazaný na dodržanú dohodu, a keď niečo odmietneš, vysvetli, prečo. Rozprávaj sa o cieľoch a o tom, čo škola pre tínedžera znamená, namiesto kontroly každej úlohy. Vopred spolu naplánuj ťažké chvíle, napríklad ako odísť z večierka, ktorý nepôsobí dobre, s odvozom domov a bez vypočúvania.',
                },
                fit: {
                    independent: {
                        en: 'In a teenager who leans toward managing alone, the push for freedom may come early and hard; trading freedom for reliability, step by step, gives that energy somewhere to go.',
                        sk: 'U tínedžera, ktorý chce veci zvládať po svojom, môže tlak na voľnosť prísť skoro a silno; výmena slobody za spoľahlivosť, krok za krokom, dá tejto energii smer.',
                    },
                    collaborative: {
                        en: 'A teenager who likes doing things together may want to decide with the adult rather than alone; that is not immaturity, and talking options through together builds the same judgement.',
                        sk: 'Tínedžer, ktorý rád robí veci spolu s niekým, môže chcieť rozhodovať spolu s dospelým, nie osamote; to nie je nezrelosť, a spoločné prechádzanie možností buduje rovnaký úsudok.',
                    },
                },
                sources: ['PAR-028', 'PAR-030', 'PAR-027'],
            },
            siblings: {
                know: {
                    en: 'A teenager and a brother or sister often drift into separate worlds, whatever the gap in age, and conflict turns on privacy, borrowing and fairness. Different rules for siblings of different ages are reasonable when explained; unexplained ones can feel like favouritism.',
                    sk: 'Tínedžer a súrodenci sa často rozídu do vlastných svetov, nech je vekový rozdiel akýkoľvek, a konflikt sa točí okolo súkromia, požičiavania a spravodlivosti. Rozdiely v pravidlách pre súrodencov rôzneho veku sú rozumné, keď sú vysvetlené; tie nevysvetlené môžu pôsobiť ako uprednostňovanie.',
                },
                try: {
                    en: 'Protect the teenager’s privacy from younger siblings, and do not make the teenager a default babysitter without agreement. Explain why freedoms differ by age, and listen if any of the children says the treatment feels unfair. Take frequent, intense conflict seriously and seek support if it persists.',
                    sk: 'Chráň súkromie tínedžera pred mladšími súrodencami a bez dohody nerob z tínedžera samozrejmého opatrovateľa. Vysvetli, prečo sa voľnosť líši podľa veku, a vypočuj, keď niektoré z detí povie, že zaobchádzanie pôsobí nespravodlivo. Časté a prudké konflikty ber vážne, a ak pretrvávajú, vyhľadaj podporu.',
                },
                sources: ['PAR-036', 'PAR-035', 'PAR-034'],
            },
            'two-adults': {
                know: {
                    en: 'Teenagers notice and test differences between adults with precision, and disagreements now concern freedom, safety and trust. Adults can differ in style; what is linked to more difficulty is a teenager caught in the middle, or adults undermining each other’s decisions.',
                    sk: 'Tínedžeri rozdiely medzi dospelými vnímajú a testujú veľmi presne, a nezhody sa teraz týkajú voľnosti, bezpečia a dôvery. Dospelí sa v štýle môžu líšiť; s väčšími ťažkosťami súvisí skôr to, keď tínedžer uviazne uprostred alebo keď sa rozhodnutia dospelých navzájom podkopávajú.',
                },
                try: {
                    en: 'Agree between the adults on the safety limits and on how new freedoms are earned, then let either adult answer within that frame. Keep criticism of each other out of the teenager’s hearing, and do not use the teenager as messenger or confidant in adult conflict. If the adults’ conflict itself feels unsafe, advice about cooperation does not apply; seek support for safety first.',
                    sk: 'Dohodnite sa medzi sebou na bezpečnostných hraniciach a na tom, ako sa získavajú nové voľnosti, a potom môže v tomto rámci odpovedať ktorýkoľvek dospelý človek. Vzájomnú kritiku nevyslovujte pred tínedžerom a nerobte z tínedžera posla ani dôverníka v sporoch dospelých. Ak je samotný konflikt dospelých nebezpečný, rady o spolupráci neplatia; najprv hľadajte pomoc pre bezpečie.',
                },
                sources: ['PAR-038', 'PAR-039'],
            },
        },
    },
    /* ------------------------------------------------------------------------------------------------------------------- late adolescence -- */
    {
        band: 'late-adolescence-16-18',
        label: { en: 'Late adolescence, sixteen and seventeen', sk: 'Neskoré dospievanie, šestnásť a sedemnásť rokov' },
        portrait: {
            en: 'At sixteen and seventeen, a young person is rehearsing adult life: decisions about study, work, relationships, money and an online identity. The research is thinner here than for younger ages, but the direction is clear enough: conflict tends to ease and privacy matters more. The adult moves from director to consultant, available and honest, and still firm where safety is at stake.',
            sk: 'V šestnástich a sedemnástich si mladý človek skúša dospelý život: rozhodnutia o štúdiu, práci, vzťahoch, peniazoch a identite na internete. Výskum je tu redší než pri mladších vekoch, no smer je dosť jasný: konfliktov zvyčajne ubúda, súkromie znamená viac, a dospelý človek sa mení z režiséra na poradcu, ktorý je k dispozícii, úprimný a pevný tam, kde ide o bezpečie.',
        },
        notYet: {
            en: 'A young person this age is not yet an adult in every respect: judgement under strong emotion or peer pressure is still maturing, and sleep and mood are easily strained. Expecting full independence overnight, and keeping control as if nothing had changed, both miss what this age needs.',
            sk: 'Mladý človek v tomto veku ešte nie je vo všetkom dospelý človek: úsudok pod silnými emóciami alebo tlakom rovesníkov ešte dozrieva, a spánok aj nálada sa ľahko narušia. Ani očakávanie úplnej samostatnosti zo dňa na deň, ani kontrola, akoby sa nič nezmenilo, nedáva tomuto veku to, čo potrebuje.',
        },
        situations: {
            communicating: {
                know: {
                    en: 'Conversations at this age can be among the best in years, or rare and guarded, often within the same week. Open, judgement-free talk matters more than ever, and arguments, though usually less frequent, can still run hot.',
                    sk: 'Rozhovory s mladým človekom v tomto veku môžu patriť k najlepším za posledné roky, alebo byť zriedkavé a opatrné, často v ten istý týždeň. Otvorený rozhovor bez odsudzovania znamená viac než kedykoľvek predtým, a hádky, hoci bývajú zriedkavejšie, môžu byť stále prudké.',
                },
                try: {
                    en: 'Ask for the young person’s view before giving your own, and say plainly when you are offering advice rather than a ruling. Respect what the young person chooses not to share, while making clear that the door stays open. When a disagreement heats up, pause and return to it later rather than escalating.',
                    sk: 'Najprv sa opýtaj na názor mladého človeka, až potom povedz svoj, a jasne odlíš, kedy dávaš radu a kedy rozhodnutie. Rešpektuj to, čo si mladý človek nechá pre seba, a zároveň daj najavo, že dvere zostávajú otvorené. Keď sa nezhoda vyhrotí, urob pauzu a k veci sa vráť neskôr, namiesto stupňovania.',
                },
                fit: {
                    analytical: {
                        en: 'A young person who looks for reasons may trust the adult’s reasoning, set out in full and open to challenge, more than any appeal to authority.',
                        sk: 'Mladý človek, ktorý hľadá dôvody, môže viac dôverovať úvahám dospelého človeka, vyloženým celým a otvoreným spochybneniu, než odvolávaniu sa na autoritu.',
                    },
                    intuitive: {
                        en: 'A young person who goes more by feel may decide first and explain afterwards; asking how a decision feels from the inside can open more than asking for reasons.',
                        sk: 'Mladý človek, ktorý sa riadi skôr pocitom, môže najprv rozhodnúť a vysvetľovať až potom; otázka, ako sa s rozhodnutím cíti, môže otvoriť viac než otázka na dôvody.',
                    },
                },
                sources: ['PAR-029', 'PAR-028'],
            },
            'rules-and-limits': {
                know: {
                    en: 'House rules now work best negotiated rather than imposed, wherever safety allows. A few limits still belong to the adult, around serious risk to health and safety, and those hold better when the reasons are explained.',
                    sk: 'Domáce pravidlá teraz fungujú najlepšie, keď sú vyjednané, nie nariadené, všade, kde to bezpečie dovolí. Niekoľko hraníc stále patrí dospelému človekovi, tie okolo vážneho rizika pre zdravie a bezpečie, a lepšie platia, keď sú vysvetlené ich dôvody.',
                },
                try: {
                    en: 'Review household rules together and agree on the few about shared living (noise, meals, letting the household know when plans change) and the few about safety. Treat the rest as the young person’s own decisions. Keep sleep and screens part of the conversation, judged by what late screens displace rather than by hours.',
                    sk: 'Domáce pravidlá spolu prejdi a dohodni sa na tých pár, ktoré sa týkajú spoločného bývania (hluk, jedlo, dať vedieť, keď sa plány menia), a na tých pár, ktoré sa týkajú bezpečia. Zvyšok ber ako vlastné rozhodnutia mladého človeka. Spánok a obrazovky nechaj súčasťou rozhovoru a posudzuj ich podľa toho, čo vytláčajú, nie podľa hodín.',
                },
                fit: {
                    structured: {
                        en: 'To a young person who likes order, a clear written household agreement may feel respectful rather than controlling.',
                        sk: 'Mladému človeku, ktorý má rád poriadok, môže jasná písomná dohoda o spolužití pripadať skôr ako prejav rešpektu než kontroly.',
                    },
                    adaptable: {
                        en: 'With a young person who leans toward improvising, agree on outcomes (the kitchen left usable, the household told when plans change) and leave the method open.',
                        sk: 'S mladým človekom, ktorý skôr improvizuje, sa dohodni na výsledkoch (kuchyňa zostane použiteľná, domácnosť sa dozvie, keď sa plány zmenia) a spôsob nechaj otvorený.',
                    },
                },
                sources: ['PAR-010', 'PAR-028', 'PAR-042', 'PAR-043'],
            },
            'strong-feelings': {
                know: {
                    en: 'Strain from exams, relationships and decisions about the future can run high at this age, and short sleep makes it harder to carry. Most ups and downs pass; low mood, anxiety or anger that persists for weeks, talk of self-harm, or heavy substance use does not, and calls for help rather than waiting.',
                    sk: 'Napätie zo skúšok, vzťahov a rozhodnutí o budúcnosti býva v tomto veku vysoké, a krátky spánok to ešte sťažuje. Väčšina výkyvov prejde; skleslosť, úzkosť alebo hnev, ktoré trvajú týždne, reči o sebapoškodení či ťažké užívanie návykových látok samy neprejdú a vyžadujú pomoc, nie čakanie.',
                },
                try: {
                    en: 'Offer steadiness rather than solutions: listen, ask what would help, and help only in the way asked for. Show how strain can be handled, including rest and asking for help. If difficulties last for weeks or affect daily life, encourage an evaluation and offer to come along. If there is talk of self-harm or of harming others, or behaviour is unsafe, seek urgent help at once.',
                    sk: 'Ponúkni skôr stálosť než riešenia: počúvaj, opýtaj sa, čo by pomohlo, a pomáhaj len tak, ako si to mladý človek želá. Ukáž, ako sa dá s tlakom zaobchádzať, vrátane oddychu a požiadania o pomoc. Ak ťažkosti trvajú týždne alebo zasahujú do bežného života, povzbuď k odbornému posúdeniu a ponúkni, že pôjdete spolu; pri rečiach o sebapoškodení či ublížení iným alebo pri nebezpečnom správaní hľadaj okamžitú pomoc.',
                },
                fit: {
                    'emotionally-expressive': {
                        en: 'A young person whose feelings tend to come out loud may need to vent fully before any advice can be heard; let the first conversation be listening only.',
                        sk: 'Mladý človek, ktorého city zvyknú vychádzať nahlas, môže potrebovať najprv sa celkom vyventilovať, skôr než má zmysel radiť; nech je prvý rozhovor len o počúvaní.',
                    },
                    'emotionally-contained': {
                        en: 'In a young person who tends to keep feelings in, strain may show only as changes in sleep, routine or interests; ask directly once in a while, and accept a short answer.',
                        sk: 'U mladého človeka, ktorý city drží skôr vnútri, sa napätie môže prejaviť len zmenami v spánku, režime alebo záujmoch; z času na čas sa opýtaj priamo a prijmi aj krátku odpoveď.',
                    },
                },
                sources: ['PAR-052', 'PAR-026', 'PAR-013'],
            },
            withdrawing: {
                know: {
                    en: 'A young person on the edge of adulthood needs more privacy and more of a life outside the family, and long stretches away or behind a closed door are to be expected. Withdrawal that comes with hopelessness, dropping every activity, or cutting off friends as well as family is different, and deserves attention.',
                    sk: 'Mladý človek na prahu dospelosti potrebuje viac súkromia a viac života mimo rodiny, a s dlhými chvíľami mimo domu alebo za zatvorenými dverami treba rátať. Stiahnutie spojené s beznádejou, opustením všetkých činností alebo odstrihnutím sa od kamarátov aj rodiny je niečo iné a zaslúži si pozornosť.',
                },
                try: {
                    en: 'Keep a few shared rituals the young person still values, such as a meal or a regular lift, without insisting on more. Respect privacy, and say that the door stays open. If withdrawal is total, lasts for weeks or comes with signs of distress, say what you have noticed, kindly and directly, and suggest seeing a doctor or psychologist.',
                    sk: 'Udrž zopár spoločných rituálov, na ktorých mladému človeku stále záleží, napríklad jedlo alebo pravidelný odvoz, bez naliehania na viac. Rešpektuj súkromie a povedz, že dvere zostávajú otvorené. Ak je stiahnutie úplné, trvá týždne alebo prichádza so známkami trápenia, láskavo a priamo povedz, čo vidíš, a navrhni návštevu lekára alebo psychológa.',
                },
                fit: {
                    introspective: {
                        en: 'For a young person who recharges in quiet, solitude may be part of making decisions; ask to hear the conclusion rather than the whole process.',
                        sk: 'Pre mladého človeka, ktorý si oddýchne najmä v tichu, môže byť samota súčasťou rozhodovania; požiadaj o záver, nie o celý postup.',
                    },
                    'outwardly-engaged': {
                        en: 'A young person who usually seeks company may vanish into friends and plans; a standing weekly meal can keep a thread without competing with that life.',
                        sk: 'Mladý človek, ktorý zvyčajne vyhľadáva spoločnosť, môže zmiznúť medzi kamarátmi a plánmi; pravidelné týždenné jedlo môže udržať spojenie bez toho, aby súperilo s týmto životom.',
                    },
                },
                sources: ['PAR-052', 'PAR-012'],
            },
            'change-and-transitions': {
                know: {
                    en: 'Leaving school, first jobs, first serious relationships and plans to move out cluster at this age, and each can unsettle a young person who seems outwardly confident. Sleep often suffers in these stretches, which tells on mood and safety as well as study.',
                    sk: 'Koniec školy, prvé brigády, prvé vážne vzťahy a plány na odsťahovanie sa v tomto veku kopia, a každá z týchto zmien môže rozhodiť aj mladého človeka, ktorý navonok pôsobí sebaisto. Spánok v takých obdobiach často trpí, a to sa odráža na nálade, bezpečí aj štúdiu.',
                },
                try: {
                    en: 'Talk through the next big step in practical detail, offering information and contacts rather than a ready-made plan. Protect sleep where you can, without taking the decision away from the young person. Expect some wobble after a big decision, and treat second thoughts as normal, not as failure.',
                    sk: 'Najbližší veľký krok preber v praktických detailoch a ponúkni informácie a kontakty, nie hotový plán. Spánok chráň, kde sa dá, no rozhodnutie nechaj na mladom človeku. Po veľkom rozhodnutí rátaj s určitým kolísaním a pochybnosti ber ako normálne, nie ako zlyhanie.',
                },
                fit: {
                    'stability-seeking': {
                        en: 'A young person who leans toward the familiar may find big steps easier in stages, such as a trial stay or a part-time start, with home as a known base.',
                        sk: 'Mladý človek so sklonom k stálosti môže veľký krok zvládnuť ľahšie po etapách, napríklad skúšobným pobytom alebo začiatkom na čiastočný úväzok, s domovom ako známou základňou.',
                    },
                    'novelty-seeking': {
                        en: 'A young person drawn to the new may find big leaps attractive; help the young person think through the first practical weeks, where plans can come apart.',
                        sk: 'Mladému človeku, ktorého láka nové, môžu veľké skoky pripadať príťažlivé; pomôž premyslieť prvé praktické týždne, keď sa plány môžu rozpadnúť.',
                    },
                },
                sources: ['PAR-026', 'PAR-028', 'PAR-024'],
            },
            independence: {
                know: {
                    en: 'The task now is to share decisions and hand more of each one over, letting real consequences teach within limits that protect safety. Research specific to sixteen and seventeen is thin; what there is points toward explained limits, open conversation and growing autonomy rather than tight control.',
                    sk: 'Úlohou tohto veku je deliť sa o rozhodnutia a z každého postupne odovzdávať viac, nech skutočné následky učia v hraniciach, ktoré chránia bezpečie. Výskumu, ktorý by sa týkal priamo šestnástich a sedemnástich rokov, je málo; to, čo existuje, ukazuje skôr na vysvetlené hranice, otvorený rozhovor a rastúcu samostatnosť než na pevnú kontrolu.',
                },
                try: {
                    en: 'Agree which decisions now belong to the young person (study choices, money earned, friendships), which are shared, and which stay with the adult for safety reasons. Check the age of consent for online data in your country, and leave online privacy more and more to the young person. Let mistakes that are not dangerous play out, and be there to talk afterwards.',
                    sk: 'Dohodni sa, ktoré rozhodnutia už patria mladému človeku (výber štúdia, zarobené peniaze, priateľstvá), ktoré sú spoločné a ktoré zostávajú kvôli bezpečiu na dospelom človeku. Zisti, od akého veku smie mladý človek v tvojej krajine súhlasiť so spracovaním údajov na internete bez rodiča, a súkromie na internete nechávaj čoraz viac na mladom človeku. Pri chybách, ktoré nie sú nebezpečné, nezasahuj a buď potom poruke na rozhovor.',
                },
                fit: {
                    independent: {
                        en: 'From a young person who leans toward managing alone, decisions may arrive as announcements rather than questions. Ask to be told early rather than asked for permission, which keeps the adult informed without a power struggle.',
                        sk: 'Od mladého človeka, ktorý chce veci zvládať po svojom, môžu rozhodnutia prichádzať ako oznámenia, nie ako otázky; požiadaj, aby ti o nich mladý človek dal vedieť včas, namiesto žiadania o povolenie, a dospelý človek tak zostane informovaný bez boja o moc.',
                    },
                    collaborative: {
                        en: 'A young person who likes doing things together may keep consulting the adult; welcome it, and increasingly ask what the young person proposes before offering a view.',
                        sk: 'Mladý človek, ktorý rád robí veci spolu s niekým, sa môže s dospelým naďalej radiť; privítaj to a čoraz častejšie sa pýtaj, čo navrhuje, skôr než povieš svoj názor.',
                    },
                },
                sources: ['PAR-010', 'PAR-028', 'PAR-049', 'PAR-012'],
            },
            siblings: {
                know: {
                    en: 'Near adulthood, contact with brothers and sisters becomes more a matter of choice, and rivalries from earlier years can soften or harden. A young person may resent being cast as a stand-in parent for a much younger sibling, or feel compared with a sibling close in age over exams and choices.',
                    sk: 'Blízko dospelosti sa kontakt so súrodencami stáva viac vecou voľby, a rivality z detstva sa môžu zmierniť alebo zatvrdiť. Mladému človeku môže prekážať rola náhradného rodiča pre oveľa mladšieho súrodenca alebo porovnávanie so súrodencom blízkeho veku v skúškach a rozhodnutiach.',
                },
                try: {
                    en: 'Ask before relying on the young person to look after younger siblings, and treat the help as a favour rather than a duty. Avoid comparing siblings’ results, choices or plans, even as encouragement. Encourage the kind of contact the siblings enjoy, on terms worked out between the siblings.',
                    sk: 'Skôr než sa pri opatrovaní mladších súrodencov spoľahneš na mladého človeka, opýtaj sa, a pomoc ber ako láskavosť, nie povinnosť. Neporovnávaj výsledky, voľby ani plány súrodencov, ani ako povzbudenie. Podporuj taký kontakt, ktorý súrodencov baví, na podmienkach, ktoré si dohodnú medzi sebou.',
                },
                sources: ['PAR-034', 'PAR-036', 'PAR-035'],
            },
            'two-adults': {
                know: {
                    en: 'The adults may now differ on how much freedom is right, on money and on the young person’s plans. A young person this age can understand a difference of view between adults, and is helped most when the adults can disagree respectfully and still be reliable.',
                    sk: 'Dospelí sa teraz môžu rozchádzať v tom, koľko voľnosti je správne, v peniazoch aj v plánoch mladého človeka. Mladý človek v tomto veku dokáže pochopiť rozdielny názor dospelých, a najviac pomáha, keď sa dospelí vedia nezhodnúť s rešpektom a zostať spoľahliví.',
                },
                try: {
                    en: 'Agree between the adults what each will offer (money, a place to stay, a lift, advice), so that promises are not contradicted later. Keep adult conflict out of the young person’s decisions, and do not ask the young person to choose between the adults. Where adult conflict is unsafe, safety comes before any advice about cooperation.',
                    sk: 'Dohodnite sa medzi sebou, čo kto ponúka (peniaze, bývanie, odvoz, radu), aby sa sľuby neskôr nepopierali. Spory dospelých držte mimo rozhodnutí mladého človeka a nestavajte mladého človeka pred voľbu medzi dospelými. Ak sú spory dospelých nebezpečné, bezpečie má prednosť pred akoukoľvek radou o spolupráci.',
                },
                sources: ['PAR-038', 'PAR-039'],
            },
        },
    },
];
export default AGE_GUIDE;
