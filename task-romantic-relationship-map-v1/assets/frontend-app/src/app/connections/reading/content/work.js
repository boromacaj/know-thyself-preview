/**
 * CONNECTIONS / WORK: the words a reading of two people who work together is built from.
 *
 * Complementarity is the point of this domain: the reading looks for the way one person's working style covers what the other tends to leave open (vision and execution,
 * initiative and refinement, appetite for a bet and patient verification), and for the way each of those pairings fails when communication and responsibilities are not
 * coordinated. It never speaks to competence, performance or suitability for a role: that is what the pair knows from the work itself, and what an employment decision would
 * need validated evidence for (corpus-work.json, safety boundaries WRK-S1 to WRK-S10).
 */
const CONTENT = {
    domain: 'work',
    axes: {
        /* ------------------------------------------------------------------ inner-focus -> processing-pace (friction, 2) */
        'inner-focus': {
            label: { en: 'How each thinks a problem through', sk: 'Ako každý premýšľa nad problémom' },
            phrase: { en: 'how each thinks a problem through before deciding', sk: 'to, ako každý premýšľa nad problémom pred rozhodnutím' },
            title: {
                shared: { en: 'The same thinking tempo', sk: 'Rovnaké tempo premýšľania' },
                opposed: { en: 'One thinks before the meeting, one thinks in it', sk: 'Jeden premýšľa pred poradou, druhý priamo na porade' },
                oneSided: { en: 'One holds a tempo, one adjusts', sk: 'Jeden drží svoje tempo, druhý sa prispôsobuje' },
            },
            scale: [{ en: 'Thinks it through quietly first', sk: 'Najprv v tichu' }, { en: 'Thinks out loud', sk: 'Premýšľa nahlas' }],
            poles: {
                introspective: {
                    one: { en: 'works a problem out quietly and brings a considered view to the meeting, or sends it by email the next morning', sk: 'premýšľa nad problémom v tichu a premyslený názor prinesie na poradu, alebo pošle e-mail na druhý deň ráno' },
                    many: { en: 'work a problem out quietly and bring a considered view to the meeting, or send it by email the next morning', sk: 'premýšľajú nad problémom v tichu a premyslený názor prinesú na poradu, alebo pošlú e-mail na druhý deň ráno' },
                    gift: { en: 'A view formed in quiet has usually met its own objections already, so it holds up when the room pushes back.', sk: 'Názor, ktorý vznikol v tichu, už spravidla prešiel vlastnými námietkami, a preto obstojí aj pod tlakom otázok na porade.' },
                    cost: { en: 'In a fast meeting the silence can pass for agreement, and the real objection arrives by email after the decision is made.', sk: 'Na rýchlej porade môže ticho pôsobiť ako súhlas a skutočná námietka príde e-mailom až vtedy, keď je už rozhodnuté.' },
                    asks: { en: 'It asks for questions sent ahead, and for decisions that can wait a day when nothing is burning.', sk: 'Žiada si otázky poslané vopred a rozhodnutia, ktoré môžu počkať deň, keď nič nehorí.' },
                },
                'outwardly-engaged': {
                    one: { en: 'thinks best out loud, at a whiteboard or on a call, and finds out what is meant by hearing it answered', sk: 'najlepšie premýšľa nahlas, pri tabuli alebo na hovore, a čo si naozaj myslí, zistí až z reakcie druhých' },
                    many: { en: 'think best out loud, at a whiteboard or on a call, and find out what is meant by hearing it answered', sk: 'najlepšie premýšľajú nahlas, pri tabuli alebo na hovore, a čo si naozaj myslia, zistia až z reakcie druhých' },
                    gift: { en: 'Thinking aloud gets a half-formed idea into the open while it is still cheap to change.', sk: 'Premýšľanie nahlas dostane nedokončený nápad na svetlo vtedy, keď sa ešte dá lacno zmeniť.' },
                    cost: { en: 'A thought spoken aloud can be taken for a decision, and people start working from what was only a draft.', sk: 'Nahlas vyslovenú myšlienku môžu ostatní považovať za rozhodnutie a začnú pracovať podľa niečoho, čo je len koncept.' },
                    asks: { en: 'What it needs is someone willing to think along, and a clear line between “I am wondering” and “this is decided”.', sk: 'Potrebuje niekoho, kto chce premýšľať spolu, a jasnú hranicu medzi „len uvažujem“ a „toto platí“.' },
                },
            },
            shared: {
                introspective: {
                    gain: { en: 'Each gives the other person room to think, so decisions tend to arrive considered and rarely need walking back.', sk: 'Každý nechá druhému človeku čas na premýšľanie, takže rozhodnutia prichádzajú premyslené a máloktoré treba neskôr vracať.' },
                    risk: { en: 'What slips is the quick conversation that would have caught a misunderstanding on Monday, and that two quiet thinkers each leave to the other.', sk: 'Uniká však krátky rozhovor, ktorý by nedorozumenie zachytil už v pondelok a ktorý dvaja ľudia, čo radšej premýšľajú v tichu, nechávajú každý na druhej strane.' },
                },
                'outwardly-engaged': {
                    gain: { en: 'This pair thinks fastest together, and one call can turn a vague problem into three options before it ends.', sk: 'Táto dvojica premýšľa najrýchlejšie spolu a jeden hovor dokáže z hmlistého problému urobiť tri možnosti skôr, než skončí.' },
                    risk: { en: 'The risk is the meeting that ends with energy and no record, where each leaves sure of a different decision.', sk: 'Rizikom je porada, ktorá skončí v dobrej nálade, ale bez zápisu, a každý potom odchádza s istotou o inom rozhodnutí.' },
                },
            },
            opposed: {
                gain: { en: 'Handled well, {p1} opens the problem up while {p0} comes back with the version that has been slept on, and the work gets both the breadth and the second look.', sk: 'Keď sa to podarí, {p1} problém otvorí do šírky a {p0} sa vráti s verziou, ktorá sa vyležala, takže práca dostane rozhľad aj druhý pohľad.' },
                risk: { en: 'The familiar snag: {p1} wants to settle it in the meeting, {p0} wants a night to think, and the decision gets made before the objection that would have changed it.', sk: 'Známe zadrhnutie: {p1} to chce uzavrieť priamo na porade, {p0} potrebuje noc na premyslenie a rozhodnutie padne skôr, než zaznie námietka, ktorá by všetko zmenila.' },
                bridge: { en: 'Much of it is solved by meeting design: {p1} sends the question a day ahead, and {p0} commits to an answer by a stated time.', sk: 'Veľa vyrieši spôsob, akým sa porady chystajú: {p1} pošle otázku deň vopred a {p0} sa zaviaže odpovedať do dohodnutého času.' },
            },
            oneSided: {
                introspective: { note: { en: '{lean} needs time to think before committing, and {mid} can usually wait, as long as the time to reply is named rather than left open.', sk: '{lean} potrebuje pred rozhodnutím čas na premyslenie a {mid} vie zvyčajne počkať, pokiaľ sa termín odpovede povie nahlas a nenechá otvorený.' } },
                'outwardly-engaged': { note: { en: '{lean} thinks out loud and {mid} can follow either way, which works well until a thought aired in passing gets treated as agreed.', sk: '{lean} premýšľa nahlas a {mid} sa vie prispôsobiť obom spôsobom, čo funguje, kým sa myšlienka vyslovená mimochodom nezačne brať ako dohoda.' } },
            },
            swings: { en: 'The tempo can change with the stakes: quick on small calls, slow on the ones that matter.', sk: 'Tempo sa môže meniť podľa toho, o čo ide: pri drobnostiach rýchlo, pri dôležitých veciach pomaly.' },
        },
        /* ------------------------------------------------------------------ reasoning -> reasoning-style (complement, 2) */
        reasoning: {
            label: { en: 'How each makes the case', sk: 'Ako každý zdôvodňuje' },
            phrase: { en: 'how each builds a case for a decision', sk: 'to, ako každý zdôvodňuje rozhodnutie' },
            title: {
                shared: { en: 'The same kind of argument', sk: 'Rovnaký druh argumentov' },
                opposed: { en: 'The numbers and the read of the room', sk: 'Čísla a čítanie situácie' },
                oneSided: { en: 'One argues one way, one can do both', sk: 'Jeden argumentuje po svojom, druhý zvládne oboje' },
            },
            scale: [{ en: 'Evidence and steps', sk: 'Dôkazy a kroky' }, { en: 'Pattern and instinct', sk: 'Vzorec a inštinkt' }],
            poles: {
                analytical: {
                    one: { en: 'wants the evidence laid out step by step before trusting a conclusion, and asks for the numbers behind a claim', sk: 'chce vidieť dôkazy rozložené krok za krokom, kým záveru uverí, a pýta sa na čísla, ktoré stoja za tvrdením' },
                    many: { en: 'want the evidence laid out step by step before trusting a conclusion, and ask for the numbers behind a claim', sk: 'chcú vidieť dôkazy rozložené krok za krokom, kým záveru uveria, a pýtajú sa na čísla, ktoré stoja za tvrdením' },
                    gift: { en: 'A decision argued this way leaves a trail that someone else can check, repeat or correct later.', sk: 'Rozhodnutie zdôvodnené týmto spôsobom zanecháva stopu, ktorú môže niekto neskôr skontrolovať, zopakovať alebo opraviť.' },
                    cost: { en: 'When the data cannot exist yet, waiting for it can stall a call that only judgement can make.', sk: 'Keď dáta ešte nemôžu existovať, čakanie na ne dokáže zablokovať rozhodnutie, ktoré sa dá urobiť iba úsudkom.' },
                    asks: { en: 'It asks for claims that arrive with reasons attached, and for patience while the reasoning is checked.', sk: 'Žiada si tvrdenia aj s dôvodmi a trpezlivosť, kým sa úvaha preverí.' },
                },
                intuitive: {
                    one: { en: 'reads where a situation is heading from a few signals and sees the direction before it can be fully argued', sk: 'z niekoľkých signálov vycíti, kam situácia smeruje, a smer vidí skôr, než sa dá celý zdôvodniť' },
                    many: { en: 'read where a situation is heading from a few signals and see the direction before it can be fully argued', sk: 'z niekoľkých signálov vycítia, kam situácia smeruje, a smer vidia skôr, než sa dá celý zdôvodniť' },
                    gift: { en: 'Instinct of this kind often catches the client who is about to leave, or the plan that is quietly going wrong, weeks before a report would.', sk: 'Takýto inštinkt často zachytí klienta, ktorý sa chystá odísť, alebo plán, ktorý sa potichu kazí, o týždne skôr než akákoľvek správa.' },
                    cost: { en: 'A conclusion that cannot show its working is hard to delegate, hard to defend upstairs and hard to correct when it is wrong.', sk: 'Záver, ktorý nevie ukázať svoj postup, sa ťažko odovzdáva ďalej, ťažko obhajuje pred vedením a ťažko opravuje, keď je mylný.' },
                    asks: { en: 'It wants serious attention before the proof arrives, and testing rather than overruling.', sk: 'Chce vážnu pozornosť ešte skôr, než prídu dôkazy, a skúšku namiesto prehlasovania.' },
                },
            },
            shared: {
                analytical: {
                    gain: { en: 'The pair speaks one language of evidence, so a disagreement can usually be settled by agreeing what would count as proof.', sk: 'Dvojica hovorí jedným jazykom dôkazov, takže nezhodu zvyčajne vyrieši dohoda o tom, čo bude platiť ako dôkaz.' },
                    risk: { en: 'Together {both} can keep analysing past the point where the analysis changes anything, while the window for the decision quietly closes.', sk: 'Spolu dokážu {both} analyzovať aj dlho po tom, čo analýza už nič nemení, a okno na rozhodnutie sa medzitým potichu zatvára.' },
                },
                intuitive: {
                    gain: { en: 'A shared read of the situation lets the pair move on a hunch faster than most teams can schedule a meeting.', sk: 'Spoločný odhad situácie umožňuje dvojici pohnúť sa na základe tušenia rýchlejšie, než iné tímy stihnú zvolať poradu.' },
                    risk: { en: 'When two instincts agree, nobody asks for the evidence, and a shared blind spot can travel a long way unchecked.', sk: 'Keď sa dva inštinkty zhodnú, nikto sa nepýta na dôkazy a spoločné slepé miesto môže zájsť ďaleko bez akejkoľvek kontroly.' },
                },
            },
            opposed: {
                gain: { en: '{p1} tends to see where things are going and {p0} tends to find out whether they really are, which together turns a hunch into a decision that can be defended.', sk: '{p1} zvyčajne vidí, kam veci smerujú, a {p0} zisťuje, či tam naozaj smerujú, a spolu z tušenia urobia rozhodnutie, ktoré sa dá obhájiť.' },
                risk: { en: 'Badly coordinated, {p0} hears the hunch as hand-waving and {p1} hears the questions as distrust, and the argument stops being about the decision.', sk: 'Keď to nie je zladené, {p0} počuje v tušení len mávanie rukou, {p1} počuje v otázkach nedôveru a spor prestane byť o rozhodnutí.' },
                bridge: { en: 'Agreeing the rules of evidence first helps: {p1} says what the instinct is noticing, {p0} says what proof would be enough, and only then does anyone argue for an outcome.', sk: 'Pomôže najprv sa dohodnúť na pravidlách: {p1} povie, čo inštinkt zachytáva, {p0} povie, aký dôkaz by stačil, a až potom sa presadzuje výsledok.' },
            },
            oneSided: {
                analytical: { note: { en: '{lean} builds the case step by step and {mid} can follow it or skip ahead, which makes the conversation a useful test of the whole argument.', sk: '{lean} skladá argumenty krok za krokom a {mid} vie postup sledovať aj predbehnúť, čo z rozhovoru robí dobrú skúšku celého zdôvodnenia.' } },
                intuitive: { note: { en: '{lean} reads the direction quickly and {mid} can ask for reasons or go with the read, depending on what is at stake.', sk: '{lean} rýchlo vycíti smer a {mid} sa podľa toho, o čo ide, buď opýta na dôvody, alebo sa odhadu prispôsobí.' } },
            },
            swings: { en: 'For {who} the method shifts with the decision: careful with numbers on one, going on feel on the next.', sk: '{who} mení spôsob podľa rozhodnutia: pri jednom sa opiera o čísla, pri ďalšom ide podľa citu.' },
        },
        /* ------------------------------------------------------------------ autonomy -> closeness-and-room (complement, 3): autonomy and delegation */
        autonomy: {
            label: { en: 'How much each works alone', sk: 'Koľko každý pracuje samostatne' },
            phrase: { en: 'how much each works alone or alongside', sk: 'miera samostatnosti a spolupráce v práci' },
            title: {
                shared: { en: 'The same distance at the desk', sk: 'Rovnaký odstup pri práci' },
                opposed: { en: 'One wants ownership, one wants company', sk: 'Jeden chce vlastný kus, druhý spoločnosť' },
                oneSided: { en: 'One has a set distance, one meets it', sk: 'Jeden má svoj odstup, druhý vie oboje' },
            },
            scale: [{ en: 'Own piece, own way', sk: 'Vlastný kus, vlastná cesta' }, { en: 'Side by side', sk: 'Bok po boku' }],
            poles: {
                independent: {
                    one: { en: 'does best with a clear piece of the work to own, room to decide how, and check-ins kept short', sk: 'pracuje najlepšie, keď má jasný kus práce vo vlastnej réžii, voľnosť v postupe a krátke kontroly' },
                    many: { en: 'do best with a clear piece of the work to own, room to decide how, and check-ins kept short', sk: 'pracujú najlepšie, keď majú jasný kus práce vo vlastnej réžii, voľnosť v postupe a krátke kontroly' },
                    gift: { en: 'Work handed over on these terms tends to come back finished, with problems already solved rather than escalated.', sk: 'Práca odovzdaná do takejto réžie sa zvyčajne vracia hotová a s problémami už vyriešenými, nie posunutými ďalej.' },
                    cost: { en: 'Silence until the deadline can leave a partner unsure whether the work is on track or quietly drifting.', sk: 'Ticho až do termínu môže druhého človeka nechať v neistote, či je práca na dobrej ceste, alebo sa potichu rozchádza.' },
                    asks: { en: 'In return it needs trust given up front, with the context and the limits spelled out instead of supervision.', sk: 'Na oplátku potrebuje dôveru vopred a jasne pomenovaný kontext aj hranice namiesto dozoru.' },
                },
                collaborative: {
                    one: { en: 'thinks and works best alongside someone, sharing drafts early and checking in often', sk: 'najlepšie premýšľa a pracuje popri niekom, koncepty ukazuje skoro a ozýva sa často' },
                    many: { en: 'think and work best alongside someone, sharing drafts early and checking in often', sk: 'najlepšie premýšľajú a pracujú popri niekom, koncepty ukazujú skoro a ozývajú sa často' },
                    gift: { en: 'Sharing early means mistakes surface while still small, and nobody spends a week building the wrong thing.', sk: 'Keď sa ukazuje skoro, chyby vyplávajú, kým sú malé, a nikto nestavia celý týždeň nesprávnu vec.' },
                    cost: { en: 'To someone who wants a clear run at the work, frequent check-ins can feel like being watched.', sk: 'Pre toho, kto chce mať na prácu voľnú cestu, môžu časté otázky pôsobiť ako dozor.' },
                    asks: { en: 'What it needs is someone within reach, and drafts welcomed as drafts.', sk: 'Potrebuje niekoho na dosah a ochotu brať rozpracovanú verziu ako rozpracovanú.' },
                },
            },
            shared: {
                independent: {
                    gain: { en: 'Neither hovers over the other person, and work divided between them tends to come back done.', sk: 'Nikto nestojí nad nikým a práca rozdelená medzi nich sa zvyčajne vráti hotová.' },
                    risk: { en: 'What gets lost is the seam between the two pieces: each part works, and they do not fit, because nobody looked across.', sk: 'Stráca sa však šev medzi dvoma kusmi: každá časť funguje sama osebe, no k sebe nepasujú, lebo sa nikto nepozrel na druhú stranu.' },
                },
                collaborative: {
                    gain: { en: 'Working in the same space suits {both}, and ideas improve quickly because each one is built on as soon as it is said.', sk: 'Práca v jednom priestore dvojici vyhovuje a nápady sa rýchlo zlepšujú, lebo na každom sa hneď stavia ďalej.' },
                    risk: { en: 'The risk is that everything is owned by both and so by neither, and a task waits because each assumes the other person has it.', sk: 'Rizikom je, že všetko patrí obom, a teda nikomu, a úloha čaká, lebo každý predpokladá, že úlohu drží druhý človek.' },
                },
            },
            opposed: {
                gain: { en: '{p0} brings focus and finished pieces, {p1} brings the early conversation that keeps the pieces pointing the same way, and the work gets both depth and fit.', sk: '{p0} prináša sústredenie a dokončené časti, {p1} včasný rozhovor, vďaka ktorému tie časti smerujú rovnakým smerom, a práca tak získa hĺbku aj súdržnosť.' },
                risk: { en: 'Without an agreed rhythm, {p1} reaches for more contact, {p0} reads it as supervision and shares less, and both end up less sure where the work stands.', sk: 'Bez dohodnutého rytmu {p1} hľadá viac kontaktu, {p0} to číta ako dozor a zdieľa menej, a istota o stave práce klesá na oboch stranách.' },
                bridge: { en: 'The fix is usually a rhythm rather than a compromise: {p1} gets a fixed time to look at the work together, and {p0} gets clear ground in between.', sk: 'Pomôže skôr rytmus než kompromis: {p1} dostane pevný čas na spoločný pohľad na prácu a {p0} medzi tým pokojný priestor.' },
            },
            oneSided: {
                independent: { note: { en: '{lean} wants a clear piece to own and {mid} can work either way, so most of the work here is agreeing how often to look at things together.', sk: '{lean} chce jasný kus práce vo vlastnej réžii a {mid} vie pracovať oboma spôsobmi, takže stačí dohodnúť, ako často sa na prácu pozrú spolu.' } },
                collaborative: { note: { en: '{lean} wants to work alongside and {mid} can meet that or step back, which works as long as the shared parts and the solo parts are named.', sk: '{lean} chce pracovať bok po boku a {mid} vie vyjsť v ústrety aj ustúpiť, čo funguje, pokiaľ je jasné, ktoré časti sú spoločné a ktoré samostatné.' } },
            },
            swings: { en: 'Task by task, {who} wants room on some work and company on other work, so it is worth asking each time rather than settling it once.', sk: '{who} chce pri niektorej práci priestor a pri inej spoločnosť, preto sa oplatí pýtať sa pri každej úlohe zvlášť, a nie rozhodnúť raz navždy.' },
        },
        /* ------------------------------------------------------------------ structure -> structure-and-flexibility (complement, 3) */
        structure: {
            label: { en: 'Plan and improvisation', sk: 'Plán a improvizácia' },
            phrase: { en: 'the balance of plan and improvisation in the work', sk: 'pomer plánu a improvizácie v práci' },
            title: {
                shared: { en: 'The same relationship to the plan', sk: 'Rovnaký vzťah k plánu' },
                opposed: { en: 'One keeps the plan, one keeps up with change', sk: 'Jeden drží plán, druhý reaguje na zmeny' },
                oneSided: { en: 'One works a set way, one bends', sk: 'Jeden má ustálený prístup, druhý sa vie ohnúť' },
            },
            scale: [{ en: 'Plan, checklist, verify', sk: 'Plán, kontrola, overenie' }, { en: 'Adjust as it unfolds', sk: 'Prispôsobiť sa za pochodu' }],
            poles: {
                structured: {
                    one: { en: 'works from a plan, verifies each step, and wants the finish line defined before starting', sk: 'pracuje podľa plánu, každý krok overuje a cieľovú čiaru chce mať určenú ešte pred začiatkom' },
                    many: { en: 'work from a plan, verify each step, and want the finish line defined before starting', sk: 'pracujú podľa plánu, každý krok overujú a cieľovú čiaru chcú mať určenú ešte pred začiatkom' },
                    gift: { en: 'Patient verification is what turns a good idea into something that still works on the day it is delivered.', sk: 'Trpezlivé overovanie robí z dobrého nápadu niečo, čo funguje aj v deň odovzdania.' },
                    cost: { en: 'When the ground moves, a plan held too tightly can keep the work on schedule and aimed at something nobody needs any more.', sk: 'Keď sa pôda pohne, príliš pevne držaný plán dokáže udržať prácu v termíne, ale namierenú na niečo, čo už nikto nepotrebuje.' },
                    asks: { en: 'It asks for changes to be announced rather than discovered, and for the definition of done to stay put once agreed.', sk: 'Žiada si, aby sa zmeny oznamovali, nie objavovali, a aby definícia hotovej práce po dohode platila.' },
                },
                adaptable: {
                    one: { en: 'starts before every detail is fixed and adjusts the approach as the work shows what it needs', sk: 'začína skôr, než je všetko určené, a postup upravuje podľa toho, čo si práca vyžiada' },
                    many: { en: 'start before every detail is fixed and adjust the approach as the work shows what it needs', sk: 'začínajú skôr, než je všetko určené, a postup upravujú podľa toho, čo si práca vyžiada' },
                    gift: { en: 'Flexibility of this kind rescues projects when a client changes course or a supplier falls through.', sk: 'Takáto pružnosť zachraňuje projekty, keď klient zmení zadanie alebo dodávateľ vypadne.' },
                    cost: { en: 'Changes made on the move can leave a partner working, quite calmly, from last week’s version.', sk: 'Zmeny urobené za pochodu môžu druhého človeka nechať pokojne pracovať podľa verzie spred týždňa.' },
                    asks: { en: 'In return it needs room to adjust, and a plan that says which parts may bend.', sk: 'Na oplátku chce priestor na úpravy a plán, ktorý hovorí, ktoré časti sa smú ohnúť.' },
                },
            },
            shared: {
                structured: {
                    gain: { en: 'Plans are kept and work is checked, so what this pair promises tends to arrive on time and as described.', sk: 'Plány sa dodržiavajú a práca sa overuje, takže čo táto dvojica sľúbi, zvyčajne príde načas a tak, ako bolo opísané.' },
                    risk: { en: 'When the situation changes, two careful planners can spend a week re-planning instead of a day trying something.', sk: 'Keď sa situácia zmení, dvaja dôslední plánovači dokážu stráviť týždeň preplánovaním namiesto jedného dňa skúšania.' },
                },
                adaptable: {
                    gain: { en: 'A sudden change rarely throws this pair, which suits work where the brief moves every week.', sk: 'Náhla zmena túto dvojicu málokedy rozhodí, čo sa hodí do práce, kde sa zadanie mení každý týždeň.' },
                    risk: { en: 'What tends to go missing is the boring layer: the checklist, the final verification, the note of what was agreed.', sk: 'Najľahšie sa stratí nudná vrstva: kontrolný zoznam, posledné overenie, poznámka o tom, čo sa dohodlo.' },
                },
            },
            opposed: {
                gain: { en: '{p1} keeps the work responsive to what is actually happening and {p0} makes sure what ships has been checked, so the pair can change course without losing quality.', sk: '{p1} udržiava prácu citlivú na to, čo sa naozaj deje, a {p0} dbá, aby to, čo odchádza von, bolo overené, takže dvojica môže zmeniť smer bez straty kvality.' },
                risk: { en: 'When changes go unannounced, {p1} adjusts on the fly, {p0} discovers it at the review, and a difference in method becomes an argument about reliability.', sk: 'Keď sa zmeny nekomunikujú, {p1} upravuje za pochodu, {p0} na to príde až pri kontrole a rozdiel v metóde sa zmení na spor o spoľahlivosť.' },
                bridge: { en: 'What changes it is a plan with two kinds of line: {p0} marks what is fixed, and {p1} is free to move everything else as long as each change is said out loud.', sk: 'Pomôže plán s dvoma druhmi položiek: {p0} označí, čo je pevné, a {p1} môže hýbať všetkým ostatným, pokiaľ každú zmenu povie nahlas.' },
            },
            oneSided: {
                structured: { note: { en: '{lean} brings the plan and the checking, and {mid} can keep to it or work around it, which gives the pair a reliable spine without much rigidity.', sk: '{lean} prináša plán a kontrolu a {mid} vie plán dodržať aj obísť, takže dvojica má spoľahlivú kostru bez prílišnej strnulosti.' } },
                adaptable: { note: { en: '{lean} adjusts as the work unfolds and {mid} can follow or hold steady, which keeps the pair nimble as long as someone writes the changes down.', sk: '{lean} sa prispôsobuje za pochodu a {mid} vie ísť s tým aj držať smer, čo dvojicu udržiava pohyblivú, pokiaľ niekto zmeny zapisuje.' } },
            },
            swings: { en: 'Planning and improvising alternate by area for {who}, so it helps to ask which mode a given task is in.', sk: '{who} strieda plánovanie a improvizáciu podľa oblasti, preto pomáha ujasniť si, o ktorý režim pri danej úlohe ide.' },
        },
        /* ------------------------------------------------------------------ risk -> risk-and-caution (complement, 3) */
        risk: {
            label: { en: 'Caution and the appetite for a bet', sk: 'Opatrnosť a chuť riskovať' },
            phrase: { en: 'how much risk each will take on a decision', sk: 'to, koľko rizika každý unesie pri rozhodnutí' },
            title: {
                shared: { en: 'The same appetite for risk', sk: 'Rovnaký vzťah k riziku' },
                opposed: { en: 'One guards the downside, one reaches for the upside', sk: 'Jeden hľadá riziká, druhý príležitosti' },
                oneSided: { en: 'One has a clear stance on risk, one weighs it', sk: 'Jeden má k riziku jasný postoj, druhý zvažuje' },
            },
            scale: [{ en: 'Protect the downside', sk: 'Chrániť pred stratou' }, { en: 'Take the chance', sk: 'Využiť príležitosť' }],
            poles: {
                cautious: {
                    one: { en: 'checks what could go wrong before committing, and prefers the decision that can be undone', sk: 'pred záväzkom preveruje, čo sa môže pokaziť, a uprednostňuje rozhodnutie, ktoré sa dá vrátiť' },
                    many: { en: 'check what could go wrong before committing, and prefer the decision that can be undone', sk: 'pred záväzkom preverujú, čo sa môže pokaziť, a uprednostňujú rozhodnutia, ktoré sa dajú vrátiť' },
                    gift: { en: 'Caution of this kind is often why a business is still standing after the year that sinks its competitors.', sk: 'Takáto opatrnosť býva dôvodom, prečo firma prežije rok, ktorý potopí konkurenciu.' },
                    cost: { en: 'Waiting for certainty can mean the opportunity is gone by the time the checks are done.', sk: 'Čakanie na istotu môže znamenať, že kým sa všetko preverí, príležitosť je preč.' },
                    asks: { en: 'The request is for each risk to be sized before it is taken, and for “not yet” to be heard as a question, not a veto.', sk: 'Prosí o to, aby sa riziko odmeralo skôr, než sa podstúpi, a aby „ešte nie“ znelo ako otázka, nie ako veto.' },
                },
                'risk-oriented': {
                    one: { en: 'moves before the picture is complete, sees the upside first, and treats a failed attempt as information', sk: 'koná skôr, než je obraz úplný, najprv vidí možný zisk a nevydarený pokus berie ako informáciu' },
                    many: { en: 'move before the picture is complete, see the upside first, and treat a failed attempt as information', sk: 'konajú skôr, než je obraz úplný, najprv vidia možný zisk a nevydarený pokus berú ako informáciu' },
                    gift: { en: 'A willingness to bet early is how new products, clients and markets get found before the window closes.', sk: 'Ochota staviť skoro je spôsob, ako sa nové produkty, klienti a trhy nájdu skôr, než sa okno zatvorí.' },
                    cost: { en: 'A bet placed alone can put shared money, time or reputation on the table before anyone else has a say.', sk: 'Stávka uzavretá bez dohody môže dať na stôl spoločné peniaze, čas alebo dobré meno skôr, než o tom padne slovo.' },
                    asks: { en: 'It wants room to try things, and objections that offer a smaller bet instead of a flat no.', sk: 'Potrebuje voľnosť skúšať a námietky, ktoré namiesto rovného nie ponúknu spôsob, ako stávku zmenšiť.' },
                },
            },
            shared: {
                cautious: {
                    gain: { en: 'Checking before committing is second nature on both sides, and what the pair builds tends to be solid, funded and still standing a year later.', sk: 'Overiť si veci pred záväzkom je pre dvojicu samozrejmosť a to, čo postaví, býva pevné, finančne kryté a o rok stále stojí.' },
                    risk: { en: 'Two careful people can each wait for the other to say yes, and the cost of the decision not taken stays invisible because nobody counts it.', sk: 'Dvaja opatrní ľudia môžu navzájom čakať, kto prvý povie áno, a cena rozhodnutia, ktoré nepadlo, zostáva neviditeľná, lebo sa nikam nezapisuje.' },
                },
                'risk-oriented': {
                    gain: { en: 'With two people who like to move, the pair can test more ideas in a month than many teams try in a year.', sk: 'Dvojica, ktorá chce byť v pohybe, dokáže za mesiac otestovať viac nápadov, než iné tímy vyskúšajú za rok.' },
                    risk: { en: 'With nobody inclined to ask what happens if it fails, the pair can stack bets until one of them drags the rest down with it.', sk: 'Keďže sa nikomu nechce pýtať, čo ak to nevyjde, dvojica môže kopiť stávky, kým jedna z nich nestiahne ostatné so sebou.' },
                },
            },
            opposed: {
                gain: { en: '{p1} spots the opportunity and {p0} looks for where it breaks, and a bet that has survived both is usually better than one placed by either alone.', sk: '{p1} príde s príležitosťou a {p0} s otázkou, kde je slabé miesto, a stávka, ktorá prejde oboma pohľadmi, býva lepšia než stávka jedného z nich.' },
                risk: { en: 'Poorly coordinated, {p1} starts deciding alone to get past the brakes, {p0} starts blocking by default, and each becomes the caricature the other person fears.', sk: 'Bez zladenia začne {p1} rozhodovať bez porady, len aby sa brzdy obišli, {p0} začne pre istotu blokovať všetko a z každého sa stane karikatúra, ktorej sa druhý človek obáva.' },
                bridge: { en: 'It turns on an agreement made in calm weather: {p1} names the bets, {p0} names the limits, and both know in advance which decisions need the other person.', sk: 'Rozhoduje dohoda urobená v pokojnom čase: {p1} pomenuje stávky, {p0} pomenuje hranice a vopred je jasné, ktoré rozhodnutia potrebujú spoločný súhlas.' },
            },
            oneSided: {
                cautious: { note: { en: '{lean} watches the downside and {mid} can go either way, so caution here tends to work as an early warning rather than a brake.', sk: '{lean} sleduje, čo sa môže pokaziť, a {mid} vie ísť oboma smermi, takže opatrnosť tu slúži skôr ako včasné varovanie než ako brzda.' } },
                'risk-oriented': { note: { en: '{lean} reaches for the opportunity and {mid} can add speed or slow things down, so much depends on agreeing the size of each bet before it is placed.', sk: '{lean} siaha po príležitosti a {mid} vie pridať aj pribrzdiť, takže najviac záleží na tom, či sa veľkosť stávky dohodne skôr, než sa uzavrie.' } },
            },
            swings: { en: 'Boldness and caution split by area for {who}, often brave with ideas and careful with money, or the reverse.', sk: '{who} delí odvahu a opatrnosť podľa oblasti: často odvaha pri nápadoch a opatrnosť pri peniazoch, alebo naopak.' },
        },
        /* ------------------------------------------------------------------ emotional-expression (friction, 1) */
        'emotional-expression': {
            label: { en: 'How each shows pressure', sk: 'Ako každý dáva najavo tlak' },
            phrase: { en: 'how each shows enthusiasm, frustration and strain at work', sk: 'to, ako každý v práci prejavuje nadšenie, frustráciu a záťaž' },
            title: {
                shared: { en: 'The same weather at work', sk: 'Rovnaké počasie v práci' },
                opposed: { en: 'One says it, one keeps it level', sk: 'Jeden to povie, druhý to drží v sebe' },
                oneSided: { en: 'Clear signals on one side, flexibility on the other', sk: 'Jasné signály na jednej strane, pružnosť na druhej' },
            },
            scale: [{ en: 'Shows it', sk: 'Ukáže to' }, { en: 'Keeps it level', sk: 'Drží to v sebe' }],
            poles: {
                'emotionally-expressive': {
                    one: { en: 'lets enthusiasm and frustration show in the moment, so the mood of the work is easy to read', sk: 'nadšenie aj frustráciu ukazuje hneď, ako prídu, takže nálada v práci sa dá ľahko čítať' },
                    many: { en: 'let enthusiasm and frustration show as they come, so the mood of the work is easy to read', sk: 'nadšenie aj frustráciu ukazujú hneď, ako prídu, takže nálada v práci sa dá ľahko čítať' },
                    gift: { en: 'Visible feeling means trouble is announced early, and good news gets celebrated rather than filed.', sk: 'Viditeľné emócie znamenajú, že problém sa ohlási včas a dobrá správa sa oslávi, nie len založí.' },
                    cost: { en: 'A sharp reaction in a meeting can land as a verdict on a person when it was only about a slide.', sk: 'Ostrá reakcia na porade môže doľahnúť ako súd o človeku, hoci sa týkala len jedného slajdu.' },
                    asks: { en: 'What helps is a reaction taken as weather, not as a final judgement.', sk: 'Pomáha, keď sa reakcia berie ako počasie, nie ako konečný verdikt.' },
                },
                'emotionally-contained': {
                    one: { en: 'keeps an even surface under pressure and shows strain late, if at all', sk: 'pod tlakom navonok zachováva pokoj a záťaž ukáže neskoro, ak vôbec' },
                    many: { en: 'keep an even surface under pressure and show strain late, if at all', sk: 'pod tlakom navonok zachovávajú pokoj a záťaž ukážu neskoro, ak vôbec' },
                    gift: { en: 'A steady surface keeps a crisis from spreading, and clients and colleagues tend to calm down around it.', sk: 'Pokojný povrch bráni tomu, aby sa kríza šírila, a klienti aj kolegovia sa v takej prítomnosti upokoja.' },
                    cost: { en: 'When nothing shows, a partner may only learn of an overload once it has become a missed deadline or a resignation letter.', sk: 'Keď nič nevidno, druhý človek sa o preťažení dozvie až vo chvíli, keď z toho vznikne zmeškaný termín alebo výpoveď.' },
                    asks: { en: 'It needs direct questions about load and mood, asked in private and without pressure to perform calm.', sk: 'Potrebuje priame otázky na záťaž a náladu, položené v súkromí a bez tlaku hrať pokoj.' },
                },
            },
            shared: {
                'emotionally-expressive': {
                    gain: { en: 'Feelings about the work get said, so little festers and the good days are celebrated out loud.', sk: 'Pocity z práce sa vyslovia, takže máločo hnije potichu a dobré dni sa oslavujú nahlas.' },
                    risk: { en: 'On a bad week two open reactions can feed each other, and a dispute about a deadline turns into one about respect.', sk: 'V zlom týždni sa dve otvorené reakcie môžu navzájom živiť a spor o termín sa zmení na spor o rešpekt.' },
                },
                'emotionally-contained': {
                    gain: { en: 'Both stay level under pressure, so a crisis can be worked through without a second one starting between them.', sk: 'Pod tlakom si dvojica zachováva pokoj, takže krízou sa dá prejsť bez toho, aby medzi nimi vznikla druhá.' },
                    risk: { en: 'Overload can build quietly on both sides, each assuming the other person is fine, because nothing shows that would prompt a question.', sk: 'Preťaženie môže narastať potichu na oboch stranách, lebo navonok nevidno nič, na čo by sa dalo opýtať.' },
                },
            },
            opposed: {
                gain: { en: 'Once each knows the other person’s signals, {p0} names problems early and {p1} keeps the room steady while they are solved.', sk: 'Keď každý pozná signály druhej strany, {p0} pomenuje problémy včas a {p1} drží pokoj, kým sa riešia.' },
                risk: { en: 'The usual misread runs both ways: {p0} sees no reaction and assumes indifference, {p1} sees a strong reaction and assumes a crisis.', sk: 'Typické nedorozumenie ide oboma smermi: {p0} nevidí žiadnu reakciu a predpokladá ľahostajnosť, {p1} vidí silnú reakciu a predpokladá krízu.' },
                bridge: { en: 'A plain shared signal for “this is too much” helps most: {p1} can say it without drama, and {p0} can hear it without reading tone.', sk: 'Najviac pomôže jednoduchý dohodnutý signál pre „toho je priveľa“: {p1} môže tento signál' + ' použiť bez drámy a {p0} dostane informáciu, ktorá nezávisí od tónu hlasu.' },
            },
            oneSided: {
                'emotionally-expressive': { note: { en: '{lean} shows the mood of the work openly and {mid} can take it in stride, so a strong reaction usually stays a reaction rather than a rift.', sk: '{lean} dáva náladu v práci otvorene najavo a {mid} to vie zobrať s nadhľadom, takže silná reakcia zvyčajne zostane reakciou a nestane sa roztržkou.' } },
                'emotionally-contained': { note: { en: '{lean} keeps strain out of sight and {mid} can read either style, which helps as long as {mid} still asks directly when the load is high.', sk: '{lean} drží záťaž mimo dohľadu a {mid} vie čítať oba štýly, čo pomáha, pokiaľ sa pri vysokej záťaži {mid} priamo opýta.' } },
            },
            swings: { en: 'Some pressures show and others stay hidden in {who}, so a calm face is not a reliable sign of an easy week.', sk: '{who} niektoré tlaky ukazuje otvorene a iné skrýva, takže pokojná tvár nie je spoľahlivým znakom ľahkého týždňa.' },
        },
        /* ------------------------------------------------------------------ visibility -> social-energy (complement, 1) */
        visibility: {
            label: { en: 'Front of house and back room', sk: 'Pred publikom a v zázemí' },
            phrase: { en: 'who faces outward and who works behind the scenes', sk: 'to, kto stojí pred ľuďmi a kto pracuje v zázemí' },
            title: {
                shared: { en: 'The same place in the room', sk: 'Rovnaké miesto v miestnosti' },
                opposed: { en: 'One presents, one prepares', sk: 'Jeden prezentuje, druhý pripravuje' },
                oneSided: { en: 'One picks a side of the room, one fills the other', sk: 'Jeden má svoje miesto, druhý vypĺňa zvyšok' },
            },
            scale: [{ en: 'Behind the scenes', sk: 'V zázemí' }, { en: 'In front of people', sk: 'Pred ľuďmi' }],
            poles: {
                private: {
                    one: { en: 'does the best work away from the spotlight and prefers small rooms to big ones', sk: 'najlepšiu prácu odvádza mimo reflektorov a malé stretnutia uprednostňuje pred veľkými' },
                    many: { en: 'do the best work away from the spotlight and prefer small rooms to big ones', sk: 'najlepšiu prácu odvádzajú mimo reflektorov a malé stretnutia uprednostňujú pred veľkými' },
                    gift: { en: 'Back-room focus produces the analysis, the code or the contract that every public moment rests on.', sk: 'Sústredenie v zázemí prináša analýzu, kód alebo zmluvu, na ktorých stojí každé verejné vystúpenie.' },
                    cost: { en: 'Work done out of sight is easy to overlook when credit is handed out.', sk: 'Práca odvedená mimo dohľadu sa ľahko prehliadne, keď sa rozdáva uznanie.' },
                    asks: { en: 'The request is simple: credit named in the rooms the work itself does not enter.', sk: 'Prosí o jednoduchú vec: aby sa o zásluhách hovorilo aj v miestnostiach, kam táto práca nevstúpi.' },
                },
                social: {
                    one: { en: 'draws energy from clients, pitches and full rooms, and tends to become the face of the work', sk: 'čerpá energiu z klientov, prezentácií a plných miestností a zvyčajne sa stáva tvárou práce' },
                    many: { en: 'draw energy from clients, pitches and full rooms, and tend to become the face of the work', sk: 'čerpajú energiu z klientov, prezentácií a plných miestností a zvyčajne sa stávajú tvárou práce' },
                    gift: { en: 'Ease in front of people opens doors, wins the client and carries the work into rooms it would not otherwise reach.', sk: 'Ľahkosť pred ľuďmi otvára dvere, získava klientov a prenáša prácu tam, kam by sa inak nedostala.' },
                    cost: { en: 'Visibility can quietly turn shared work into work with one name on it.', sk: 'Viditeľnosť dokáže spoločnú prácu potichu premeniť na prácu jedného mena.' },
                    asks: { en: 'In return it needs preparation from people who will not be on stage, and a memory of where that preparation came from.', sk: 'Na oplátku potrebuje prípravu od ľudí, ktorí na pódiu nebudú, a pamäť na to, odkiaľ príprava prišla.' },
                },
            },
            shared: {
                private: {
                    gain: { en: 'The work is left to speak for itself, and the pair rarely competes for attention.', sk: 'Hovoriť sa nechá práca a dvojica málokedy súťaží o pozornosť.' },
                    risk: { en: 'Nobody wants the pitch, the client call or the difficult conversation, so excellent work can stay unknown.', sk: 'Nikto nechce prezentáciu, telefonát s klientom ani ťažký rozhovor, a výborná práca tak môže zostať nepoznaná.' },
                },
                social: {
                    gain: { en: 'Being in front of people comes easily to the pair, and the work reaches clients and partners with real energy.', sk: 'Vystupovanie pred ľuďmi ide dvojici ľahko a práca sa ku klientom a partnerom dostáva so skutočnou energiou.' },
                    risk: { en: 'Two people who both want the stage can end up competing for it, while the preparation falls between them.', sk: 'Dvaja, ktorí chcú stáť na pódiu, môžu oň začať súťažiť, kým príprava padá medzi nich.' },
                },
            },
            opposed: {
                gain: { en: '{p1} carries the work into the room and {p0} makes sure there is something solid to carry, a classic and durable division of labour.', sk: '{p1} prináša prácu pred ľudí a {p0} dbá, aby bolo čo priniesť, čo je osvedčené a trvácne rozdelenie práce.' },
                risk: { en: 'Left unspoken, the division slides into credit flowing one way and preparation the other, and the quieter work starts to feel used.', sk: 'Ak sa o tom nehovorí, rozdelenie sa zošmykne do stavu, keď uznanie ide jedným smerom a príprava druhým, a tichšia práca sa začne cítiť využitá.' },
                bridge: { en: 'The difference holds when {p1} names the preparation out loud wherever credit is given, and {p0} has a say in what gets promised there.', sk: 'Pomáha, keď {p1} nahlas pomenuje prípravu tam, kde sa rozdáva uznanie, a {p0} má slovo pri tom, čo sa tam sľúbi.' },
            },
            oneSided: {
                private: { note: { en: '{lean} prefers the back room and {mid} can go either way, so it is worth agreeing on each project who carries the work outward.', sk: '{lean} uprednostňuje zázemie a {mid} vie oboje, preto sa oplatí pri každom projekte dohodnúť, kto prácu ponesie navonok.' } },
                social: { note: { en: '{lean} gravitates to the front of the room and {mid} can join or hold back, which works well as long as the preparation is visibly shared.', sk: '{lean} prirodzene smeruje pred ľudí a {mid} sa vie pridať aj zostať v pozadí, čo funguje, pokiaľ je príprava viditeľne spoločná.' } },
            },
            swings: { en: 'The setting decides for {who}: at ease on stage in some rooms, happier in the back room in others.', sk: 'Rozhoduje prostredie: {who} sa v niektorých miestnostiach cíti dobre na pódiu, v iných radšej v zázemí.' },
        },
        /* ------------------------------------------------------------------ change -> change-and-steadiness (friction, 2) */
        change: {
            label: { en: 'Keeping what works, trying what is new', sk: 'Osvedčené a nové' },
            phrase: { en: 'the pull between keeping what works and trying something new', sk: 'napätie medzi osvedčeným a novým' },
            title: {
                shared: { en: 'The same tempo of change', sk: 'Rovnaké tempo zmien' },
                opposed: { en: 'One protects the system, one wants to rebuild it', sk: 'Jeden chráni systém, druhý chce prestavbu' },
                oneSided: { en: 'One sets the tempo of change, one goes along', sk: 'Jeden určuje tempo zmien, druhý sa pridáva' },
            },
            scale: [{ en: 'Keep what works', sk: 'Držať osvedčené' }, { en: 'Try the new', sk: 'Skúšať nové' }],
            poles: {
                'stability-seeking': {
                    one: { en: 'protects the processes that work and wants a good reason before changing a tool, a supplier or a routine', sk: 'chráni postupy, ktoré fungujú, a pred zmenou nástroja, dodávateľa či rutiny chce počuť dobrý dôvod' },
                    many: { en: 'protect the processes that work and want a good reason before changing a tool, a supplier or a routine', sk: 'chránia postupy, ktoré fungujú, a pred zmenou nástroja, dodávateľa či rutiny chcú počuť dobrý dôvod' },
                    gift: { en: 'Steadiness is why the invoices go out on time and nobody has to relearn the system every quarter.', sk: 'Vďaka stálosti odchádzajú faktúry načas a nikto sa nemusí každý štvrťrok učiť systém odznova.' },
                    cost: { en: 'Defending a process past its usefulness can make every proposal feel like a fight to win.', sk: 'Obhajovanie postupu aj po tom, čo prestal slúžiť, môže z každého návrhu urobiť boj.' },
                    asks: { en: 'What it needs is a reason and a date with each change, and the parts that work left alone.', sk: 'Žiada si, aby zmena prišla s dôvodom aj dátumom a aby to, čo funguje, zostalo nedotknuté.' },
                },
                'novelty-seeking': {
                    one: { en: 'grows restless with the same process and keeps looking for the better tool, the new market or the next version', sk: 'pri stále rovnakom postupe stráca trpezlivosť a hľadá lepší nástroj, nový trh alebo ďalšiu verziu' },
                    many: { en: 'grow restless with the same process and keep looking for the better tool, the new market or the next version', sk: 'pri stále rovnakom postupe strácajú trpezlivosť a hľadajú lepší nástroj, nový trh alebo ďalšiu verziu' },
                    gift: { en: 'Restlessness of this kind often keeps a team from being overtaken while it is busy being efficient.', sk: 'Práve takýto nepokoj často chráni tím pred predbehnutím, kým sa sústreďuje na efektivitu.' },
                    cost: { en: 'Constant improvement can feel, from the other side of the desk, like not being allowed to finish anything.', sk: 'Neustále zlepšovanie môže z druhej strany stola pôsobiť tak, akoby sa nič nesmelo dokončiť.' },
                    asks: { en: 'It wants room to experiment, and a fair hearing before “this is how it is done here”.', sk: 'Chce priestor na pokusy a férové vypočutie skôr, než zaznie „u nás sa to robí takto“.' },
                },
            },
            shared: {
                'stability-seeking': {
                    gain: { en: 'A system that runs is valued on both sides, and the pair builds routines others can rely on for years.', sk: 'Systém, ktorý beží, má pre dvojicu veľkú cenu a rutiny, ktoré vytvorí, môžu ostatným slúžiť roky.' },
                    risk: { en: 'When the market or the team shifts, two steady people can wait together for the change to pass instead of meeting it.', sk: 'Keď sa trh alebo tím pohne, dvaja stáli ľudia môžu spoločne čakať, kým zmena prejde, namiesto toho, aby sa so zmenou' + ' vyrovnali.' },
                },
                'novelty-seeking': {
                    gain: { en: 'Trying things comes naturally to this pair, and its tools and its offer get renewed faster than most.', sk: 'Skúšanie nového je pre túto dvojicu prirodzené a nástroje aj ponuka sa obnovujú rýchlejšie než u väčšiny.' },
                    risk: { en: 'With nobody guarding the routine, half-finished migrations and abandoned tools can pile up behind {both}.', sk: 'Keď nikto nestráži rutinu, za dvojicou sa môžu kopiť nedokončené prechody a opustené nástroje.' },
                },
            },
            opposed: {
                gain: { en: 'Once the tension is named, {p1} keeps the work from going stale and {p0} keeps it from coming apart, and change arrives at a pace the work can absorb.', sk: 'Keď sa napätie pomenuje, {p1} chráni prácu pred zastaraním a {p0} pred rozpadom, a zmeny prichádzajú tempom, ktoré práca unesie.' },
                risk: { en: 'The friction tends to repeat a pattern: {p1} proposes, {p0} asks why, {p1} hears resistance, {p0} hears recklessness, and the subject stops coming up.', sk: 'Trenie sa zvyčajne opakuje v rovnakom vzorci: {p1} navrhne, {p0} sa spýta, prečo, {p1} v tom počuje odpor, {p0} ľahkomyseľnosť a téma sa prestane otvárať.' },
                bridge: { en: 'What helps is a small, bounded trial: {p1} gets to test the change, and {p0} gets a review date and a way back.', sk: 'Pomôže malý, ohraničený pokus: {p1} si zmenu vyskúša a {p0} dostane dátum vyhodnotenia aj cestu späť.' },
            },
            oneSided: {
                'stability-seeking': { note: { en: '{lean} guards the routines that work and {mid} can live with change or without it, which keeps the pair steady without freezing it in place.', sk: '{lean} stráži rutiny, ktoré fungujú, a {mid} zvládne zmenu aj stálosť, takže dvojica stojí pevne, no nezamrzne.' } },
                'novelty-seeking': { note: { en: '{lean} keeps bringing the new and {mid} can take it up or let it pass, so a little order in how proposals arrive goes a long way.', sk: '{lean} neustále prináša nové a {mid} vie návrh prijať aj nechať tak, preto pomôže trochu poriadku v tom, ako návrhy prichádzajú.' } },
            },
            swings: { en: 'Change and stability pull at {who} in different parts of the work, which is worth mapping before assuming a side.', sk: '{who} chce v rôznych častiach práce raz zmenu, raz stálosť, čo sa oplatí zmapovať skôr, než sa predpokladá, ktorá strana prevláda.' },
        },
        /* ------------------------------------------------------------------ initiative -> taking-the-lead (complement, 3) */
        initiative: {
            label: { en: 'Who moves first', sk: 'Kto urobí prvý krok' },
            phrase: { en: 'who sets direction and who refines it', sk: 'to, kto udáva smer a kto dolaďuje' },
            title: {
                shared: { en: 'The same instinct about leading', sk: 'Rovnaký inštinkt pri vedení' },
                opposed: { en: 'One proposes, one shapes', sk: 'Jeden navrhuje, druhý formuje' },
                oneSided: { en: 'One role is fixed, the other flexes', sk: 'Jedna rola je pevná, druhá pružná' },
            },
            scale: [{ en: 'Moves first', sk: 'Urobí prvý krok' }, { en: 'Responds and refines', sk: 'Reaguje a dolaďuje' }],
            poles: {
                assertive: {
                    one: { en: 'tends to propose first, set the direction in a meeting and get things moving before the details are settled', sk: 'zvyčajne prichádza s návrhom skôr než ostatní, na porade udáva smer a veci rozbehne ešte pred doladením detailov' },
                    many: { en: 'tend to propose first, set the direction in a meeting and get things moving before the details are settled', sk: 'zvyčajne prichádzajú s návrhom skôr než ostatní, na poradách udávajú smer a veci rozbehnú ešte pred doladením detailov' },
                    gift: { en: 'Initiative ends the meeting where everyone waits, and gives a team something concrete to react to.', sk: 'Iniciatíva ukončí poradu, na ktorej všetci čakajú, a dá tímu niečo konkrétne, na čo môže reagovať.' },
                    cost: { en: 'Moving first can fill the space so quickly that quieter, better-informed views never get a turn.'.replace('never', 'do not'), sk: 'Prvý krok môže zaplniť priestor tak rýchlo, že tichšie, no lepšie podložené názory sa nedostanú k slovu.' },
                    asks: { en: 'It needs a counterpart willing to push back, and permission to start before everyone is sure.', sk: 'Potrebuje niekoho, kto sa nebojí oponovať, a dovolenie začať skôr, než majú všetci istotu.' },
                },
                receptive: {
                    one: { en: 'listens first, takes what others propose and improves it, leading by refining rather than announcing', sk: 'najprv počúva, prijme návrhy ostatných a vylepší ich a vedie skôr dolaďovaním než ohlasovaním' },
                    many: { en: 'listen first, take what others propose and improve it, leading by refining rather than announcing', sk: 'najprv počúvajú, prijmú návrhy ostatných a vylepšia ich a vedú skôr dolaďovaním než ohlasovaním' },
                    gift: { en: 'A receptive style catches what the first proposal missed, and often turns a rough idea into one people can work with.', sk: 'Vnímavý štýl zachytí, čo prvému návrhu ušlo, a z hrubého nápadu často urobí taký, s ktorým sa dá pracovať.' },
                    cost: { en: 'Waiting to respond can mean an important objection arrives only after the decision, because the moment passed while it was being weighed.', sk: 'Čakanie na vhodnú chvíľu môže znamenať, že dôležitá námietka zaznie až po rozhodnutí, lebo chvíľa prešla, kým sa zvažovala.' },
                    asks: { en: 'What helps is an explicit invitation to disagree, and a pause before a decision closes.', sk: 'Pomáha výslovné pozvanie nesúhlasiť a chvíľa ticha predtým, než sa rozhodnutie uzavrie.' },
                },
            },
            shared: {
                assertive: {
                    gain: { en: 'Initiative comes from both sides, so very little waits for permission or sits unclaimed.', sk: 'Iniciatíva prichádza z oboch strán, takže máločo čaká na povolenie alebo zostáva bez pána.' },
                    risk: { en: 'Two first movers can each set a direction in the same week, and the people around them get two plans and no decision.', sk: 'Dve iniciatívy môžu v jednom týždni nastaviť dva smery a ľudia okolo dostanú dva plány a žiadne rozhodnutie.' },
                },
                receptive: {
                    gain: { en: 'Both listen well and build on each other, and the people around the pair are rarely run over.', sk: 'Dvojica dobre počúva, stavia na nápadoch druhej strany a ľudí okolo seba málokedy prevalcuje.' },
                    risk: { en: 'Each can wait for the other person to make the call, and a decision either could make goes unmade for a month.', sk: 'Každý môže čakať, kým rozhodne druhý človek, a rozhodnutie, ktoré je na dosah každému, zostane mesiac neurobené.' },
                },
            },
            opposed: {
                gain: { en: '{p0} gets things moving and {p1} improves them on the way, so the pair tends to start quickly and land well, which is the shape of much good shared work.', sk: '{p0} veci rozbehne a {p1} ich cestou vylepší, takže dvojica zvyčajne začne rýchlo a pristane dobre, čo je tvar veľkej časti dobrej spoločnej práce.' },
                risk: { en: 'When the pause is missing, {p0} decides and moves on, {p1} disagrees quietly, and the disagreement surfaces months later as half-hearted execution.', sk: 'Keď chýba pauza, {p0} rozhodne a ide ďalej, {p1} nesúhlasí potichu a nesúhlas sa po mesiacoch ukáže ako polovičaté vykonanie.' },
                bridge: { en: 'The bridge is an explicit pause: {p0} brings a proposal as a draft and waits for the objection, and {p1} commits to voicing it before the decision rather than after.', sk: 'Mostom je výslovná pauza: {p0} prinesie návrh ako koncept a počká na námietku, a {p1} sa zaviaže námietku vysloviť ešte pred rozhodnutím, nie až potom.' },
            },
            oneSided: {
                assertive: { note: { en: '{lean} tends to move first and {mid} can follow or lead as needed, which keeps the pair moving as long as {mid} still gets asked.', sk: '{lean} zvyčajne urobí prvý krok a {mid} vie podľa potreby nasledovať aj viesť, čo dvojicu udržiava v pohybe, pokiaľ aj {mid} dostáva otázku na názor.' } },
                receptive: { note: { en: '{lean} leads by refining and {mid} can step forward when nobody else does, which suits the pair well when it is clear who starts.', sk: '{lean} vedie dolaďovaním a {mid} vie vykročiť, keď to nikto iný neurobí, čo dvojici dobre sedí, ak je jasné, kto začína.' } },
            },
            swings: { en: 'Leading and waiting split by area for {who}, so who moves first has different answers in different parts of the work.', sk: '{who} strieda vedenie a čakanie podľa oblasti, takže otázka, kto urobí prvý krok, má v rôznych častiach práce rôzne odpovede.' },
        },
        /* ------------------------------------------------------------------ abstraction -> practical-and-conceptual (complement, 3): vision and execution */
        abstraction: {
            label: { en: 'Vision and execution', sk: 'Vízia a realizácia' },
            phrase: { en: 'how vision and execution are shared', sk: 'to, ako sa delí vízia a realizácia' },
            title: {
                shared: { en: 'The same altitude', sk: 'Rovnaká výška pohľadu' },
                opposed: { en: 'One sees the map, one walks the road', sk: 'Jeden vidí mapu, druhý kráča po ceste' },
                oneSided: { en: 'One holds an altitude, one moves between', sk: 'Jeden drží svoju výšku, druhý sa pohybuje medzi' },
            },
            scale: [{ en: 'What ships on Friday', sk: 'Čo sa odovzdá v piatok' }, { en: 'Where it all leads', sk: 'Kam to celé vedie' }],
            poles: {
                practical: {
                    one: { en: 'thinks in next steps, owners and deadlines, and asks what can actually be delivered by Friday', sk: 'myslí v ďalších krokoch, zodpovednostiach a termínoch a pýta sa, čo sa dá do piatku naozaj odovzdať' },
                    many: { en: 'think in next steps, owners and deadlines, and ask what can actually be delivered by Friday', sk: 'myslia v ďalších krokoch, zodpovednostiach a termínoch a pýtajú sa, čo sa dá do piatku naozaj odovzdať' },
                    gift: { en: 'Practical thinking is what gets the idea out of the slide deck and into the hands of a customer.', sk: 'Práve praktické myslenie dostane nápad z prezentácie do rúk zákazníka.' },
                    cost: { en: 'Focusing on what can be done this week can quietly narrow the work until it no longer aims at anything larger.', sk: 'Zameranie na to, čo sa dá urobiť tento týždeň, dokáže prácu potichu zúžiť, až prestane mieriť na niečo väčšie.' },
                    asks: { en: 'The request is for ideas that arrive with a first step, and for the reason behind the vision said plainly.', sk: 'Prosí o nápady, ktoré prídu aj s prvým krokom, a o dôvod vízie povedaný jednoducho.' },
                },
                conceptual: {
                    one: { en: 'thinks in direction and connections, sees where the work could lead, and generates ideas faster than ideas can be built', sk: 'myslí v smeroch a súvislostiach, vidí, kam môže práca viesť, a nápady chrlí rýchlejšie, než sa dajú postaviť' },
                    many: { en: 'think in direction and connections, see where the work could lead, and generate ideas faster than they can be built', sk: 'myslia v smeroch a súvislostiach, vidia, kam môže práca viesť, a nápady chrlia rýchlejšie, než sa dajú postaviť' },
                    gift: { en: 'Vision gives daily work a reason, and spots the larger opportunity a task list would walk past.', sk: 'Vízia dáva každodennej práci dôvod a všimne si väčšiu príležitosť, okolo ktorej by zoznam úloh prešiel.' },
                    cost: { en: 'Ideas that keep coming can leave a partner rebuilding the plan every week and finishing nothing.', sk: 'Nápady, ktoré neprestávajú prichádzať, môžu druhého človeka nútiť každý týždeň prerábať plán a nič nedokončiť.' },
                    asks: { en: 'It needs a partner who will turn a vision into a plan, and patience with ideas that are still half-shaped.', sk: 'Potrebuje niekoho, kto víziu prevedie do plánu, a trpezlivosť s nápadmi, ktoré ešte nemajú tvar.' },
                },
            },
            shared: {
                practical: {
                    gain: { en: 'Getting things done is the shared instinct, and the pair delivers steadily, on time and with few surprises.', sk: 'Spoločným inštinktom je mať veci hotové a dvojica dodáva stabilne, načas a s minimom prekvapení.' },
                    risk: { en: 'With nobody asking where it all leads, {both} can execute very well on a direction that has gone unexamined for a year.', sk: 'Keď sa nikto nepýta, kam to celé vedie, dokážu {both} výborne realizovať smer, ktorý už rok nikto neprehodnocuje.' },
                },
                conceptual: {
                    gain: { en: 'Thinking big comes easily to the pair, and their conversations can open possibilities that stay hidden to each alone.', sk: 'Myslieť vo veľkom ide dvojici ľahko a rozhovory medzi nimi dokážu otvoriť možnosti, ktoré jednotlivo zostávajú skryté.' },
                    risk: { en: 'The plan can stay a beautiful document: two visionaries keep refining the idea while the first step waits for someone to own it.', sk: 'Plán môže zostať krásnym dokumentom: dvaja vizionári ďalej brúsia myšlienku, zatiaľ čo prvý krok čaká na svojho majiteľa.' },
                },
            },
            opposed: {
                gain: { en: 'This is the classic pairing of vision and execution: {p1} supplies direction and ideas, {p0} turns them into steps, owners and dates, and each makes the other’s work real.', sk: 'Ide o klasickú dvojicu vízie a realizácie: {p1} prináša smer a nápady, {p0} z nich robí kroky, zodpovednosti a termíny a každý tak dáva práci druhej strany skutočný tvar.' },
                risk: { en: 'When the translation is not agreed, {p1} sees the plan as small and keeps adding to it, {p0} hears the ideas as noise and stops listening, and vision and work drift apart.', sk: 'Keď nie je dohodnuté, ako sa vízia prekladá do plánu, {p1} vidí plán ako malý a stále pridáva, {p0} vníma nápady ako šum a prestane počúvať, a vízia s prácou sa rozídu.' },
                bridge: { en: 'A regular translation step changes most of it: {p1} states the goal in a paragraph, and {p0} answers with the first three steps and who owns each.', sk: 'Najviac zmení pravidelný krok prekladu: {p1} opíše cieľ v jednom odseku a {p0} odpovie prvými tromi krokmi a tým, kto za ktorý zodpovedá.' },
            },
            oneSided: {
                practical: { note: { en: '{lean} keeps the work on the ground and {mid} can step back to the bigger picture when asked, so both the plan and its purpose stay in view.', sk: '{lean} drží prácu pri zemi a {mid} vie na požiadanie ustúpiť k širšiemu obrazu, takže na očiach zostáva plán aj zmysel celej práce.' } },
                conceptual: { note: { en: '{lean} brings the vision and {mid} can work at either altitude, so the pair mainly needs to agree when an idea becomes a plan.', sk: '{lean} prináša víziu a {mid} vie pracovať na oboch úrovniach, takže dvojici stačí dohodnúť, kedy sa z nápadu stáva plán.' } },
            },
            swings: { en: 'Vision and practicality trade places in {who} depending on the area, which is worth knowing before dividing the work.', sk: '{who} strieda víziu a praktickosť podľa oblasti, čo sa oplatí vedieť skôr, než sa práca rozdelí.' },
        },
    },
    /* ---------------------------------------------------------------------------------------------------------------------------------------------------- drives */
    drives: {
        shared: {
            mastery: {
                gain: { en: 'Doing the work properly matters on both sides, and each respects the standard the other person holds.', sk: 'Na poriadne odvedenej práci záleží na oboch stranách a každý rešpektuje latku, ktorú drží druhý človek.' },
                risk: { en: 'Two perfectionists can polish the same piece long past the deadline, each waiting for it to be good enough for the other.', sk: 'Dvaja perfekcionisti môžu brúsiť ten istý kus dlho po termíne, lebo každý čaká, kým bude práca dosť dobrá pre druhú stranu.' },
            },
            achievement: {
                gain: { en: 'Results are the shared language, so the pair can set a target and get moving with very little debate.', sk: 'Spoločným jazykom sú výsledky, takže dvojica si určí cieľ a bez dlhých debát sa pustí do práce.' },
                risk: { en: 'The same drive can quietly raise the bar every quarter until the pace exceeds anything {both} agreed to at the start.', sk: 'Rovnaký ťah dokáže latku potichu dvíhať každý štvrťrok, až tempo prekročí všetko, čo bolo na začiatku dohodnuté.' },
            },
            recognition: {
                gain: { en: 'Both want the work to be seen, and the pair is good at making its results visible.', sk: 'Viditeľnosť práce je spoločnou prioritou a dvojica vie svoje výsledky dobre ukázať.' },
                risk: { en: 'When credit is scarce, a quiet tally of who earned what can begin, and a shared win becomes a private contest.', sk: 'Keď je uznania málo, môže sa začať potichu rátať, komu čo patrí, a spoločné víťazstvo sa zmení na tichú súťaž.' },
            },
            meaning: {
                gain: { en: 'A shared sense that the work matters can carry the pair through long, unglamorous stretches.', sk: 'Spoločný pocit, že práca má zmysel, dokáže dvojicu preniesť cez dlhé a nevďačné obdobia.' },
                risk: { en: 'When the purpose is shared, saying no to more work can feel like betraying it, and the pair can wear itself down for a good cause.', sk: 'Keď je zmysel spoločný, odmietnuť ďalšiu prácu môže pôsobiť ako zrada a dvojica sa môže vyčerpať pre dobrú vec.' },
            },
            belonging: {
                gain: { en: 'The team itself matters to the pair, and together {both} tend to build a climate people want to stay in.', sk: 'Samotný tím má pre dvojicu veľkú hodnotu a {both} zvyčajne vytvárajú prostredie, v ktorom ľudia chcú zostať.' },
                risk: { en: 'Protecting the harmony can mean the hard feedback goes unsaid, and a problem everyone can see stays politely unnamed for too long.', sk: 'Ochrana pohody môže znamenať, že tvrdá spätná väzba nezaznie a problém, ktorý vidia všetci, zostáva príliš dlho zdvorilo nepomenovaný.' },
            },
            freedom: {
                gain: { en: 'Each wants control over their own work, so neither is likely to crowd the other person.', sk: 'Každý chce mať vlastnú prácu pod kontrolou, takže nikto nedusí druhého človeka.' },
                risk: { en: 'Two people guarding their own ground can leave the shared ground unguarded: the joint decision, the common deadline, the client nobody owns.', sk: 'Keď každý stráži svoje územie, spoločné územie zostane bez stráže: spoločné rozhodnutie, spoločný termín, klient, ktorý nepatrí nikomu.' },
            },
            care: {
                gain: { en: 'Looking after people comes naturally to the pair, and colleagues with a problem often end up at this desk.', sk: 'Starostlivosť o ľudí je pre dvojicu prirodzená a kolegovia s problémom často prichádzajú práve sem.' },
                risk: { en: 'Each can carry other people’s problems so well that their own workload and limits rarely get a hearing.', sk: 'Každý dokáže niesť problémy iných tak dobre, že na vlastnú záťaž a hranice sa takmer nedostane reč.' },
            },
            understanding: {
                gain: { en: 'Wanting to know why is shared, so decisions between them tend to rest on real comprehension rather than habit.', sk: 'Spoločná je potreba vedieť prečo, takže rozhodnutia medzi nimi stoja na skutočnom porozumení, nie na zvyku.' },
                risk: { en: 'Two curious minds can keep investigating while the decision that was due on Tuesday waits.', sk: 'Dve zvedavé mysle môžu ďalej skúmať, zatiaľ čo rozhodnutie, ktoré malo padnúť v utorok, čaká.' },
            },
            'self-expression': {
                gain: { en: 'Each wants a personal signature in the work, and the result tends to be distinctive rather than generic.', sk: 'Každý chce v práci nechať vlastný rukopis a výsledok býva osobitý, nie všedný.' },
                risk: { en: 'Two strong signatures on one piece can turn every review into a negotiation about whose version wins.', sk: 'Dva silné rukopisy na jednom diele môžu z každej kontroly urobiť vyjednávanie o tom, ktorá verzia vyhrá.' },
            },
            beauty: {
                gain: { en: 'How the work looks and feels is a shared concern, and what the pair produces tends to be finished to a standard people notice.', sk: 'Vzhľad a dojem z práce sú pre dvojicu dôležité a to, čo vytvorí, býva dotiahnuté tak, že si to ľudia všimnú.' },
                risk: { en: 'The final polish can swallow the time meant for the parts nobody sees but everyone needs.', sk: 'Posledné doladenie môže zhltnúť čas určený pre časti, ktoré nikto nevidí, no všetci potrebujú.' },
            },
        },
        pullsApart: {
            'freedom|belonging': {
                gain: { en: 'Held together, {p0} protects room to work and {p1} protects the bond of the team, and the pair gets autonomy without isolation.', sk: 'Keď sa to podarí udržať, {p0} chráni priestor na prácu a {p1} súdržnosť tímu, a dvojica získa samostatnosť bez izolácie.' },
                risk: { en: 'The pull shows in small things: {p1} invites, {p0} declines the third meeting this week, and a need for room on one side reads as distance on the other.', sk: 'Napätie sa ukazuje v drobnostiach: {p1} pozýva, {p0} odmietne tretiu poradu v týždni, a čo je na jednej strane potreba priestoru, na druhej pôsobí ako odstup.' },
                bridge: { en: 'It helps to name which moments are shared and which are solo, so that {p0} can turn down one meeting without seeming to turn down the team.', sk: 'Pomôže pomenovať, ktoré chvíle sú spoločné a ktoré samostatné, aby sa dalo odmietnuť jedno stretnutie bez dojmu, že sa odmieta celý tím.' },
            },
            'achievement|care': {
                gain: { en: '{p0} keeps the work moving toward the target and {p1} keeps the people able to get there, a balance many teams lack.', sk: '{p0} posúva prácu k cieľu a {p1} dbá, aby ľudia vládali dôjsť až tam, čo je rovnováha, ktorá mnohým tímom chýba.' },
                risk: { en: 'Under pressure the drives collide: {p0} sees the deadline, {p1} sees the person who is struggling, and each starts to experience the other as the obstacle.', sk: 'Pod tlakom sa ťahy zrazia: {p0} vidí termín, {p1} vidí človeka, ktorý nevládze, a každý začne vnímať druhú stranu ako prekážku.' },
                bridge: { en: 'What helps is deciding together, before the crunch, which deadlines can move and which costs to people are not acceptable.', sk: 'Pomáha ešte pred náporom spolu rozhodnúť, ktoré termíny sa môžu posunúť a akú cenu za ne nesmú zaplatiť ľudia.' },
            },
            'recognition|understanding': {
                gain: { en: '{p0} carries the work into view and {p1} makes sure it is understood well enough to stand there, so what gets shown is also sound.', sk: '{p0} vynáša prácu na svetlo a {p1} dbá, aby bola pochopená natoľko, že tam obstojí, takže to, čo sa ukáže, je aj podložené.' },
                risk: { en: '{p0} wants to present before {p1} feels the thing is understood, and {p1} wants one more look when {p0} already feels the moment slipping.', sk: '{p0} chce prezentovať skôr, než to {p1} považuje za pochopené, a {p1} chce ešte jeden pohľad v čase, keď {p0} cíti, že chvíľa odchádza.' },
                bridge: { en: 'It helps to agree in advance what must be understood before anything is shown: {p1} then has a finish line, and {p0} has a date.', sk: 'Pomôže vopred dohodnúť, čo musí byť pochopené predtým, než sa niečo ukáže: {p1} tak má cieľovú čiaru a {p0} dátum.' },
            },
        },
        different: {
            gain: { en: 'Different motives tend to point attention at different parts of the work, so {p0} and {p1} can cover more of it together than either would alone.', sk: 'Rozdielne motívy zvyčajne smerujú pozornosť na rôzne časti práce, takže {p0} a {p1} spolu pokryjú viac než každý zvlášť.' },
            risk: { en: 'The risk is assuming the other person works for the same reasons, and reading a different priority as a lack of commitment.', sk: 'Rizikom je predpoklad, že druhý človek pracuje z rovnakých dôvodov, a čítanie inej priority ako nedostatku nasadenia.' },
            bridge: { en: 'Once {p0} and {p1} each say what makes the work worth doing, the difference becomes a way to divide it rather than a reason for doubt.', sk: 'Keď {p0} aj {p1} povedia, prečo sa im práca oplatí, rozdiel sa stane spôsobom, ako si prácu' + ' rozdeliť, a nie dôvodom na pochybnosti.' },
        },
        drawnTo: {
            mastery: { one: { en: 'wants to do the craft well, for its own sake', sk: 'chce robiť remeslo poriadne, pre remeslo samotné' }, many: { en: 'want to do the craft well, for its own sake', sk: 'chcú robiť remeslo poriadne, pre remeslo samotné' } },
            achievement: { one: { en: 'measures work by results: the target hit, the deal closed, the launch shipped', sk: 'meria prácu výsledkami: splneným cieľom, uzavretým obchodom, spusteným produktom' }, many: { en: 'measure work by results: the target hit, the deal closed, the launch shipped', sk: 'merajú prácu výsledkami: splneným cieľom, uzavretým obchodom, spusteným produktom' } },
            recognition: { one: { en: 'wants the work seen and credited, inside the team and beyond', sk: 'chce, aby sa práca videla a ocenila v tíme aj navonok' }, many: { en: 'want the work seen and credited, inside the team and beyond', sk: 'chcú, aby sa práca videla a ocenila v tíme aj navonok' } },
            meaning: { one: { en: 'needs the work to matter beyond the paycheque', sk: 'potrebuje, aby práca mala zmysel aj za hranicou výplaty' }, many: { en: 'need the work to matter beyond the paycheque', sk: 'potrebujú, aby práca mala zmysel aj za hranicou výplaty' } },
            belonging: { one: { en: 'works for the team as much as for the task', sk: 'pracuje pre tím rovnako ako pre úlohu a cení si pocit, že niekam patrí' }, many: { en: 'work for the team as much as for the task', sk: 'pracujú pre tím rovnako ako pre úlohu a cenia si pocit, že niekam patria' } },
            freedom: { one: { en: 'wants a say over how, when and where the work gets done', sk: 'chce mať pod kontrolou, ako, kedy a kde sa práca robí' }, many: { en: 'want a say over how, when and where the work gets done', sk: 'chcú mať pod kontrolou, ako, kedy a kde sa práca robí' } },
            care: { one: { en: 'looks after the people around the work, often before the work itself', sk: 'sa stará o ľudí okolo práce, často skôr než o prácu samotnú' }, many: { en: 'look after the people around the work, often before the work itself', sk: 'sa starajú o ľudí okolo práce, často skôr než o prácu samotnú' } },
            understanding: { one: { en: 'needs to know why and how something works before acting on it', sk: 'potrebuje vedieť, prečo a ako veci fungujú, skôr než podľa toho koná' }, many: { en: 'need to know why and how something works before acting on it', sk: 'potrebujú vedieť, prečo a ako veci fungujú, skôr než podľa toho konajú' } },
            'self-expression': { one: { en: 'wants a recognisable personal signature in the work', sk: 'chce v práci nechať vlastný rukopis, ktorý sa dá spoznať' }, many: { en: 'want a recognisable personal signature in the work', sk: 'chcú v práci nechať vlastný rukopis, ktorý sa dá spoznať' } },
            beauty: { one: { en: 'cares how the work looks and feels, not only whether it functions', sk: 'dbá na to, ako práca vyzerá a pôsobí, nielen či funguje' }, many: { en: 'care how the work looks and feels, not only whether it functions', sk: 'dbajú na to, ako práca vyzerá a pôsobí, nielen či funguje' } },
        },
    },
    /* ---------------------------------------------------------------------------------------------------------------------------------------------------- kinds */
    kinds: {
        coworkers: {
            frame: { en: '{both} work side by side as colleagues, with no reporting line between them. This reading follows how their working styles tend to meet in the work they share.', sk: '{both} pracujú vedľa seba na rovnakej úrovni a ani jedna strana nie je nadriadená druhej. Toto čítanie sleduje, ako sa ich spôsoby práce zvyčajne prejavia v tom, čo robia spolu.' },
            lens: { en: 'Peers rarely choose each other and cannot simply assign each other work, so what matters most is how the seams are handled: handovers, overlapping tasks, credit, and the pace of shared deadlines.', sk: 'Kolegovia sa väčšinou navzájom nevyberajú a nemôžu si prácu jednoducho prideliť, preto najviac záleží na miestach, kde sa ich práca dotýka: na odovzdávaní práce, prekrývajúcich sa úlohách, zásluhách a tempe spoločných termínov.' },
            consequence: {
                'closeness-and-room': { en: 'Between peers nobody can settle this by authority, so the check-in rhythm has to be agreed rather than set.', sk: 'Medzi kolegami to nikto nerozsúdi autoritou, a tak sa rytmus spoločných kontrol musí dohodnúť, nie nariadiť.' },
                'structure-and-flexibility': { en: 'For coworkers the difference shows most at handovers, where finished for one person is half-done for the other.', sk: 'U kolegov sa rozdiel ukáže najmä pri odovzdávaní práce, keď je hotové pre jedného ešte rozrobené pre druhého.' },
                'processing-pace': { en: 'In team meetings this difference plays out in front of everyone, and a silence on one side can be taken by the whole room for agreement.', sk: 'Na tímových poradách sa tento rozdiel odohráva pred všetkými a ticho na jednej strane môže celá miestnosť považovať za súhlas.' },
                'taking-the-lead': { en: 'Without a formal lead between peers, the first voice in a meeting can quietly become the deciding one, which is worth noticing before it hardens.', sk: 'Bez formálneho vedenia sa medzi kolegami ľahko stane, že o veciach rozhoduje prvý hlas na porade, a oplatí sa to všimnúť skôr, než sa to ustáli.' },
                'shared-pull': { en: 'A drive two colleagues share often becomes the informal culture of a team, so its costs spread beyond the pair.', sk: 'Spoločný ťah dvoch kolegov sa často stáva neformálnou kultúrou tímu, takže sa náklady rozlejú aj mimo dvojice.' },
            },
        },
        'business-partners': {
            frame: { en: '{both} own a business together, with money and risk held in common. This reading looks at how their ways of working tend to meet as they decide together and divide the work.', sk: '{both} spolu vlastnia firmu a majú spoločné peniaze aj riziko. Čítanie sleduje, ako ich spôsoby práce zvyčajne fungujú vedľa seba, keď spolu rozhodujú a delia si úlohy.' },
            lens: { en: 'Partners are bound by money and long horizons, so the decisions that matter most are about what to risk, what to build, and who has the final word on each.', sk: 'Partnerov spájajú peniaze a dlhý horizont, preto najviac záleží na rozhodnutiach o tom, čo riskovať, čo budovať a kto má pri čom posledné slovo.' },
            consequence: {
                'risk-and-caution': { en: 'With shared money on the line, this is the difference most worth putting in writing, as limits agreed while things are calm.', sk: 'Keď sú v hre spoločné peniaze, práve tento rozdiel sa najviac oplatí dať na papier, ako hranice dohodnuté v pokojnom čase.' },
                'practical-and-conceptual': { en: 'In a partnership this often becomes the split between strategy and operations, and each half deserves an equal voice.', sk: 'V partnerstve sa z toho často stáva delenie na stratégiu a prevádzku a každá z týchto polovíc si zaslúži rovnaký hlas.' },
                'taking-the-lead': { en: 'Equal ownership does not settle who decides on an ordinary Tuesday, so partners do well to divide decision rights by area rather than by habit.', sk: 'Rovnaký podiel nerieši, kto rozhoduje v bežný utorok, preto sa partnerom oplatí rozdeliť rozhodovacie právomoci podľa oblastí, nie podľa zvyku.' },
                'change-and-steadiness': { en: 'Over the years of a partnership this tends to decide when to grow, when to consolidate and when to change the model.', sk: 'Počas rokov partnerstva tento rozdiel zvyčajne rozhoduje o tom, kedy rásť, kedy upevňovať a kedy zmeniť model podnikania.' },
                'pulls-apart': { en: 'In a partnership, motives that pull apart tend to surface around money: what to reinvest, what to pay out, and what the business is for.', sk: 'V partnerstve sa motívy, ktoré ťahajú od seba, zvyčajne ukážu pri peniazoch: čo reinvestovať, čo vyplatiť a na čo firma vlastne je.' },
            },
        },
        founders: {
            frame: { en: '{both} are building something that does not exist yet, while their roles are still taking shape. This reading follows how their ways of working tend to meet when much of what they decide is new.', sk: '{both} budujú niečo, čo ešte neexistuje, a ich roly sa ešte len tvoria. Čítanie sleduje, ako sa ich spôsoby práce zvyčajne prejavujú, keď o mnohých veciach rozhodujú po prvý raz.' },
            lens: { en: 'Early on, roles are fluid, stakes are personal and almost every decision is new, so what matters most is how the two decide under uncertainty and who leads what.', sk: 'Na začiatku sú roly tekuté, v hre je veľa osobného a takmer každé rozhodnutie je nové, preto najviac záleží na tom, ako sa dvojica rozhoduje v neistote a kto čo vedie.' },
            consequence: {
                'risk-and-caution': { en: 'For founders this difference touches savings, careers and years of time, so the size of a bet is worth agreeing before it is placed, not after.', sk: 'U zakladateľov sa tento rozdiel dotýka úspor, kariér aj rokov života, preto sa veľkosť stávky oplatí dohodnúť vopred, nie dodatočne.' },
                'taking-the-lead': { en: 'In a young company leadership tends to settle on whoever moves first, and the question is far easier to open before investors and staff start taking the answer for granted.', sk: 'V mladej firme sa vedenie často ustáli podľa toho, kto sa pohne skôr, a otvoriť túto tému je oveľa ľahšie predtým, než odpoveď začnú brať za danú investori a zamestnanci.' },
                'structure-and-flexibility': { en: 'Founders need improvisation to survive the first year and structure to survive the second, so this difference changes value as the company grows.', sk: 'Zakladatelia potrebujú improvizáciu, aby prežili prvý rok, a štruktúru, aby prežili druhý, takže hodnota tohto rozdielu sa s rastom firmy mení.' },
                'change-and-steadiness': { en: 'Pivots are part of founding, and this difference tends to decide whether a change of direction feels like learning or like betrayal.', sk: 'Zmeny smeru patria k zakladaniu firmy a tento rozdiel zvyčajne rozhodne, či zmena pôsobí ako učenie, alebo ako zrada.' },
                'shared-pull': { en: 'A shared drive often holds founders together through the hard months, and also makes it hard for either to admit the pace is too much.', sk: 'Spoločný ťah často drží zakladateľov pokope v ťažkých mesiacoch a zároveň sťažuje priznanie, že tempo je priveľa.' },
            },
        },
        'manager-collaborator': {
            frame: { en: '{both} work across a reporting line. This reading attends to how their styles tend to meet where one of the two has more say over the work.', sk: '{both} spolu pracujú a jedna strana je druhej nadriadená. Čítanie si všíma, ako sa ich štýly zvyčajne prejavujú tam, kde má jedna strana pri práci väčšie slovo.' },
            lens: { en: 'Power is uneven here, so the manager carries more of the work of making it safe to disagree. The manager’s way of working is one among several, not the standard to match.', sk: 'Moc je tu rozložená nerovnako, a tak väčšiu časť práce na tom, aby sa dalo bezpečne nesúhlasiť, nesie vedúca strana. Spôsob práce vedúcej strany je jeden z viacerých, nie vzor, ktorému sa treba prispôsobiť.' },
            roles: [{ en: 'the manager', sk: 'manažér' }, { en: 'the collaborator', sk: 'spolupracovník' }],
            tags: [{ en: 'the manager', sk: 'v manažérskej úlohe' }, { en: 'the collaborator', sk: 'v spolupracovníckej úlohe' }],
            consequence: {
                'taking-the-lead': { en: 'Across a reporting line the collaborator may hold back the very objection the manager most needs to hear, so the invitation to push back has to come from the manager.', sk: 'Vo vzťahu nadriadenosti a podriadenosti môže spolupracovník zadržať práve tú námietku, ktorú manažér najviac potrebuje počuť, preto pozvanie oponovať musí prísť od manažéra.' },
                'closeness-and-room': { en: 'Here this difference is about delegation: how much to hand over, how often to look in, and how to tell support from supervision.', sk: 'Tu ide o delegovanie: koľko odovzdať, ako často sa pozrieť na priebeh a ako rozlíšiť podporu od dozoru.' },
                'structure-and-flexibility': { en: 'If the manager holds the plan it can feel imposed, and if the collaborator holds it, changes from above can feel arbitrary, so every change needs its reason either way.', sk: 'Ak plán drží manažér, môže pôsobiť nanútene, a ak plán' + ' drží spolupracovník, zmeny zhora môžu pôsobiť svojvoľne, preto každá zmena potrebuje dôvod.' },
                'processing-pace': { en: 'A manager who decides in the meeting can miss a collaborator’s best thinking, which arrives the next morning, and a manager who needs time can leave a collaborator waiting without knowing why.', sk: 'Manažér, ktorý rozhoduje priamo na porade, môže prísť o najlepšie myšlienky spolupracovníka, ktoré prídu až ráno, a manažér, ktorý potrebuje čas, môže spolupracovníka nechať čakať bez vysvetlenia.' },
                'emotional-expression': { en: 'Across a reporting line a visible reaction from the manager lands harder than intended, and contained strain in a collaborator is easy to miss until it is serious.', sk: 'Vo vzťahu nadriadenosti a podriadenosti dopadne viditeľná reakcia manažéra tvrdšie, než bola mienená, a skrytú záťaž spolupracovníka je ľahké prehliadnuť, kým nie je vážna.' },
            },
        },
        'mentor-mentee': {
            frame: { en: '{both} meet so that experience can pass between them. This reading follows how their ways of thinking tend to meet while one guides and the other learns.', sk: '{both} sa stretávajú, aby si mohli odovzdávať skúsenosti. Čítanie sleduje, ako sa ich spôsoby uvažovania zvyčajne dopĺňajú alebo rozchádzajú, keď jedna strana vedie a druhá sa učí.' },
            lens: { en: 'Mentoring works through reasoning that is shown, so it matters that the mentor shows the working as well as the answer, and that the mentee keeps the right to disagree.', sk: 'V mentorstve ide o to, aby bolo vidieť, ako človek uvažuje: mentor má ukazovať postup, nielen odpoveď, a právo nesúhlasiť má zostať aj tomu, kto sa učí.' },
            roles: [{ en: 'the mentor', sk: 'mentor' }, { en: 'the mentee', sk: 'mentee' }],
            tags: [{ en: 'the mentor', sk: 'v mentorskej úlohe' }, { en: 'the mentee', sk: 'v rozvojovej úlohe' }],
            consequence: {
                'reasoning-style': { en: 'A mentor who reasons differently from the mentee can be most useful precisely there, as long as the mentor’s way is offered as one route rather than the right one.', sk: 'Mentor, ktorý uvažuje inak než mentee, prináša najviac práve tým rozdielom, pokiaľ sa vlastný spôsob ponúka ako jedna z ciest, nie ako tá správna.' },
                'processing-pace': { en: 'Learning needs time to settle, so a quick question from the mentor may deserve an answer at the next session rather than on the spot.', sk: 'Učenie potrebuje čas, aby sa usadilo, a rýchla otázka mentora si niekedy zaslúži odpoveď až na ďalšom stretnutí, nie hneď.' },
                'taking-the-lead': { en: 'The mentee’s goals set the agenda here, so a mentor inclined to lead does well to ask first and advise second.', sk: 'Program stretnutí tu určujú ciele mentee, preto sa mentorovi s chuťou viesť oplatí najprv sa pýtať a až potom radiť.' },
                'risk-and-caution': { en: 'Advice about risk carries the mentor’s own era and circumstances, and what was too risky then may be a reasonable bet for the mentee now.', sk: 'Rady o riziku nesú dobu a okolnosti mentora a to, čo bolo kedysi príliš riskantné, môže byť pre mentee dnes rozumná stávka.' },
                'change-and-steadiness': { en: 'When one side values steadiness and the other wants change, each can learn from the other, as long as the difference is named as a difference.', sk: 'Ak si jedna strana cení stálosť a druhá chce zmenu, každá sa môže od druhej učiť, pokiaľ sa rozdiel pomenuje ako rozdiel.' },
            },
        },
        'project-partners': {
            frame: { en: '{both} are working toward one deliverable and one deadline. This reading looks at how their styles tend to meet in a piece of work with a fixed end.', sk: '{both} pracujú na jednom výstupe s jedným termínom. Čítanie sleduje, čo ich štýly zvyčajne prinesú do práce, ktorá má pevný koniec.' },
            lens: { en: 'A project has an end, so what matters most is a shared picture of done, clean handovers, and a pace that survives the last week.', sk: 'Projekt má koniec, preto najviac záleží na spoločnej predstave o hotovej práci, čistom odovzdávaní a tempe, ktoré vydrží aj posledný týždeň.' },
            consequence: {
                'structure-and-flexibility': { en: 'On a project with a fixed end, this difference decides whether scope changes are absorbed or argued about in the final week.', sk: 'Pri projekte s pevným koncom tento rozdiel rozhoduje o tom, či sa zmeny rozsahu vstrebú, alebo sa o ne bude viesť spor v poslednom týždni.' },
                'practical-and-conceptual': { en: 'With a deadline in view, the vision has to become a plan early, or the last weeks go on discovering what was actually meant.', sk: 'Keď je termín na dohľad, víziu treba preložiť do plánu včas, inak sa posledné týždne minú na zisťovanie, čo sa vlastne myslelo.' },
                'processing-pace': { en: 'Project timelines rarely leave a day for thinking, so the pause one style needs has to be built into the schedule on purpose.', sk: 'Harmonogram projektu málokedy nechá deň na premýšľanie, a tak treba pauzu, ktorú jeden štýl potrebuje, zámerne vložiť do plánu.' },
                'closeness-and-room': { en: 'Partners on a project can divide the work cleanly, but the seam between the two halves needs a named owner and a date when the parts meet.', sk: 'Projektoví partneri si môžu prácu čisto rozdeliť, no šev medzi dvoma polovicami potrebuje pomenovanú zodpovednú osobu aj dátum, kedy sa časti spoja.' },
                'change-and-steadiness': { en: 'Midway through a project a new idea is both a gift and a threat to the deadline, and this difference decides which it feels like.', sk: 'V polovici projektu je nový nápad darom aj hrozbou pre termín a tento rozdiel rozhoduje, čím sa javí.' },
            },
        },
    },
    /* ---------------------------------------------------------------------------------------------------------------------------------------------------- practices */
    practices: [
        /* taking-the-lead: role-specific first, then one card for each side of an opposition, then the shared map */
        {
            id: 'wrk.manager-goes-first',
            title: { en: 'Start with what is not known', sk: 'Začni tým, čo nevieš' },
            body: {
                en: 'In the next one-to-one, name one thing on your side that is uncertain or did not work, before asking about anything else. When the person with more say starts there, the other side can find it easier to raise a doubt early, and the first doubt raised deserves thanks rather than a defence.',
                sk: 'Pri najbližšom rozhovore medzi štyrmi očami najprv pomenuj jednu vec zo svojej strany, ktorú nevieš alebo ktorá nevyšla, a až potom sa pýtaj na ostatné. Keď začne ten, kto má väčšie slovo, druhá strana môže ľahšie a skôr vysloviť pochybnosť. Prvá vyslovená pochybnosť si zaslúži poďakovanie, nie obhajobu.',
            },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'taking-the-lead', kinds: ['manager-collaborator', 'mentor-mentee'] },
            sources: ['WRK-006', 'WRK-013'],
        },
        {
            id: 'wrk.draft-not-decree',
            title: { en: 'Bring it as a draft', sk: 'Prines to ako koncept' },
            body: {
                en: 'Bring the next proposal labelled as a draft and ask one question before going further: “What is the strongest objection to this?” Wait for the answer, even if it takes a day. Moving first tends to work better when the move leaves the door open for a better idea.',
                sk: 'Ďalší návrh prines s označením „koncept“ a skôr než pôjdeš ďalej, polož jednu otázku: „Čo by sa proti tomu dalo najviac namietať?“ Na odpoveď počkaj, aj keby trvala deň. Prvý krok sa oplatí najviac vtedy, keď po ňom zostanú otvorené dvere lepšiemu nápadu.',
            },
            audience: { kind: 'pole', pole: 'assertive' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed', 'one-sided'], poles: ['assertive'], holder: 'second' },
            sources: ['WRK-012', 'WRK-005'],
        },
        {
            id: 'wrk.objection-slot',
            title: { en: 'Say the objection before the decision', sk: 'Námietku povedz pred rozhodnutím' },
            body: {
                en: 'Before a decision closes, say the concern in one sentence, even half-formed. For example: “I have not thought it through, but this worries me.” A doubt voiced early is cheap; the same doubt once the work is under way can cost far more. If the moment passes, send it in writing the same day.',
                sk: 'Kým rozhodnutie ešte nepadlo, vyslov obavu jednou vetou, aj keď ešte nie je domyslená: „Ešte to nemám premyslené, ale toto ma znepokojuje.“ Pochybnosť vyslovená včas stojí málo; tá istá pochybnosť, keď už práca beží, môže stáť oveľa viac. Ak chvíľa prejde, pošli to písomne ešte v ten deň.',
            },
            audience: { kind: 'pole', pole: 'receptive' },
            triggers: { dynamic: 'taking-the-lead', relations: ['opposed', 'one-sided'], poles: ['receptive'] },
            sources: ['WRK-011', 'WRK-006'],
        },
        {
            id: 'wrk.decision-map',
            title: { en: 'Map who decides what', sk: 'Mapa rozhodnutí' },
            body: {
                en: 'List the five or six recurring decisions in the shared work and mark each one: who decides, who must be consulted, who only needs to hear. Where both currently think they own something, pick one owner now. Revisit the list when the work changes shape, and agree how a deadlock gets settled before the first one arrives.',
                sk: 'Spíšte päť či šesť opakujúcich sa rozhodnutí v spoločnej práci a pri každom označte, kto rozhoduje, s kým sa treba poradiť a kto sa to má len dozvedieť. Kde si dnes rozhodnutie nárokujú dvaja, určte hneď jednu zodpovednú osobu. Zoznam prehodnoťte pri každej väčšej zmene práce a dohodnite sa, ako sa rozsúdi patová situácia, ešte predtým, než príde prvá.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'taking-the-lead', relations: ['shared', 'one-sided'] },
            sources: ['WRK-011', 'WRK-023', 'WRK-012'],
        },
        /* closeness-and-room: autonomy and delegation */
        {
            id: 'wrk.delegate-whole',
            title: { en: 'Hand over the whole task', sk: 'Odovzdaj celú úlohu' },
            body: {
                en: 'When handing work over, include four things with it: the context, a written definition of done, the limits of what can be decided without asking, and where to go when stuck. After the first stretch of the work, ask how the responsibility is sitting, and adjust if it has turned into pressure.',
                sk: 'Keď odovzdávaš prácu, pridaj k úlohe štyri veci: kontext, písomnú definíciu hotovej práce, hranice toho, o čom sa dá rozhodnúť bez pýtania, a miesto, kam sa obrátiť, keď sa práca zasekne. Po prvej etape sa opýtaj, ako sa s novou zodpovednosťou žije, a uprav to, ak sa zmenila na tlak.',
            },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'closeness-and-room', kinds: ['manager-collaborator'], mechanisms: ['closeness-and-room/opposed'] },
            sources: ['WRK-021', 'WRK-008', 'WRK-022'],
        },
        {
            id: 'wrk.feedback-rhythm',
            title: { en: 'Keep the check-in about the work', sk: 'Pri spoločnom pohľade hovorte o práci' },
            body: {
                en: 'At each agreed check-in, keep the talk on the work itself: what to keep, what to change, and how. Ask early how each prefers to hear a comment, in writing or face to face, and look back after a few rounds at whether that form helps. A comment about the work tends to be easier to take than one that sounds like a comment about the person.',
                sk: 'Pri každom dohodnutom spoločnom pohľade na prácu držte rozhovor pri samotnej práci: čo ponechať, čo zmeniť a ako. Hneď na začiatku sa opýtajte, ako chce kto počuť pripomienky, či písomne alebo osobne, a po niekoľkých stretnutiach si overte, či táto forma pomáha. Pripomienka k práci sa zvyčajne prijíma ľahšie než taká, ktorá znie ako výhrada voči človeku.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', kinds: ['manager-collaborator', 'mentor-mentee'], mechanisms: ['closeness-and-room/opposed:independent'] },
            sources: ['WRK-025', 'WRK-020'],
        },
        {
            id: 'wrk.check-in-rhythm',
            title: { en: 'Collect the questions for a set time', sk: 'Otázky si odlož na dohodnutý čas' },
            body: {
                en: 'Instead of asking whenever a question comes up, keep a running list and bring it to a set time for looking at the work together. The contact stays, and the other person gets uninterrupted stretches in between.',
                sk: 'Otázky, ktoré počas práce napadnú, si zapisuj a prines ich na dohodnutý čas, keď sa na prácu pozriete spolu. Kontakt zostane a druhý človek medzitým dostane nerušené úseky.',
            },
            audience: { kind: 'pole', pole: 'collaborative' },
            triggers: { dynamic: 'closeness-and-room', relations: ['opposed', 'one-sided'], poles: ['collaborative'] },
            sources: ['WRK-020', 'WRK-008'],
        },
        {
            id: 'wrk.progress-unasked',
            title: { en: 'Show progress before anyone asks', sk: 'Ukáž postup skôr, než sa niekto spýta' },
            body: {
                en: 'At agreed points, send a three-line note without being asked: what is done, what is next, what is blocking. A short, predictable update buys the room to work alone, because nobody has to come and look. Trust tends to grow from small promises kept rather than from declarations.',
                sk: 'V určených bodoch pošli bez vyzvania správu na tri riadky: čo je hotové, čo nasleduje a čo brzdí. Stručná, predvídateľná správa ti zabezpečí priestor pracovať samostatne, lebo nikto nemusí chodiť pozerať. Dôvera zvyčajne rastie z malých dodržaných sľubov, nie z vyhlásení.',
            },
            audience: { kind: 'pole', pole: 'independent' },
            triggers: { dynamic: 'closeness-and-room', relations: ['opposed', 'one-sided'], poles: ['independent'], holder: 'second' },
            sources: ['WRK-010', 'WRK-026'],
        },
        {
            id: 'wrk.handover-note',
            title: { en: 'Write down what each piece assumes', sk: 'Spíšte, s čím každá časť počíta' },
            body: {
                en: 'Each keeps a short note on their own part: the formats, names and order it takes for granted from the other side. Before the two parts are joined, read the notes together and list every assumption that crosses from one to the other. A mismatch found on paper tends to be cheaper than one found in the finished work.',
                sk: 'Každý si vedie krátku poznámku o svojej časti: aké formáty, názvy a poradie táto časť predpokladá od druhej strany. Skôr než sa časti spoja, prečítajte si poznámky spolu a spíšte každý predpoklad, ktorý prechádza z jednej časti do druhej. Nesúlad nájdený na papieri zvyčajne vyjde lacnejšie než ten, ktorý sa ukáže v hotovej práci.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['shared'], poles: ['independent'], mechanisms: ['closeness-and-room/shared:independent'] },
            sources: ['WRK-010', 'WRK-008'],
        },
        {
            id: 'wrk.not-now',
            title: { en: 'Make “not now” easy to say', sk: 'Nech sa „teraz nie“ dá povedať ľahko' },
            body: {
                en: 'Agree a short phrase either can use to mean “not now, later today”, and treat it as an answer about timing, not about the other person. The question is written down and brought back at the agreed time. A yes tends to mean more when a not-now costs nothing to say.',
                sk: 'Dohodnite si krátku vetu, ktorou môže ktokoľvek z vás povedať „teraz nie, neskôr dnes“, a berte to ako odpoveď o čase, nie o druhom človeku. Otázka sa zapíše a príde na rad v dohodnutom čase. Súhlas má väčšiu váhu, keď sa „teraz nie“ dá povedať bez ťažkostí.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['one-sided'], poles: ['collaborative'], mechanisms: ['closeness-and-room/oneSided:collaborative'] },
            sources: ['WRK-020', 'WRK-028'],
        },
        {
            id: 'wrk.follow-up-owner',
            title: { en: 'Decide who writes it up', sk: 'Dohodnite, kto to spíše' },
            body: {
                en: 'Before the two of you finish talking, decide who writes the follow-up and who reads it over, and swap the roles from one meeting to the next. A short written record, with a name beside each item, keeps a joint decision from resting on two memories.',
                sk: 'Skôr než rozhovor skončí, dohodnite sa, kto spíše zhrnutie a kto si text potom prečíta, a na ďalšom stretnutí si tieto úlohy vymeňte. Krátky písomný záznam s menom pri každej položke pomáha, aby spoločné rozhodnutie nestálo len na tom, čo si dvaja zapamätali.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'closeness-and-room', relations: ['shared'], poles: ['collaborative'], mechanisms: ['closeness-and-room/shared:collaborative'] },
            sources: ['WRK-010', 'WRK-008'],
        },
        /* structure-and-flexibility */
        {
            id: 'wrk.mark-the-fixed',
            title: { en: 'Mark what is fixed and what can bend', sk: 'Označ, čo je pevné a čo sa môže ohnúť' },
            body: {
                en: 'On the shared plan, mark the few things that must not move without a conversation, such as the deadline, the budget and the definition of done, and leave everything else open. A short list of fixed points is easier to defend, and the other person can adjust the rest freely without disturbing what matters.',
                sk: 'V spoločnom pláne označ tých pár vecí, ktoré sa bez rozhovoru nesmú pohnúť, napríklad termín, rozpočet a definíciu hotovej práce, a všetko ostatné nechaj otvorené. Krátky zoznam pevných bodov sa ľahšie obhajuje a druhý človek môže voľne upravovať zvyšok bez rizika, že naruší to podstatné.',
            },
            audience: { kind: 'pole', pole: 'structured' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['opposed', 'one-sided'], poles: ['structured'], holder: 'first' },
            sources: ['WRK-008', 'WRK-002'],
        },
        {
            id: 'wrk.announce-the-change',
            title: { en: 'Say the change the day it happens', sk: 'Zmenu povedz v deň, keď nastane' },
            body: {
                en: 'When you adjust the approach, say so the same day in one line, and update the shared plan rather than only the work. The flexibility stays, and the other person no longer finds the changes for the first time at the review.',
                sk: 'Keď upravíš postup, povedz to ešte v ten deň jednou vetou a aktualizuj spoločný plán, nielen samotnú prácu. Pružnosť zostane a druhý človek sa o zmenách nedozvie až pri kontrole.',
            },
            audience: { kind: 'pole', pole: 'adaptable' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['opposed', 'one-sided'], poles: ['adaptable'] },
            sources: ['WRK-008', 'WRK-009'],
        },
        {
            id: 'wrk.definition-of-done',
            title: { en: 'Write down what done means', sk: 'Spíšte, čo znamená hotové' },
            body: {
                en: 'Before the next piece of work starts, each writes three lines on what finished looks like and how it will be checked, then compare the two. A difference found at the start takes one conversation; found on delivery day, it can take the deadline with it.',
                sk: 'Pred ďalšou úlohou napíše každý tri riadky o tom, ako vyzerá hotová práca a ako sa overí, a potom ich porovnajte. Rozdiel nájdený na začiatku vyrieši jeden rozhovor; ak sa nájde až v deň odovzdania, môže ohroziť termín.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['shared', 'one-sided'], poles: ['adaptable'] },
            sources: ['WRK-008', 'WRK-009'],
        },
        {
            id: 'wrk.rework-what-moved',
            title: { en: 'Redraw only what the move touches', sk: 'Prepracujte len to, čoho sa zmena týka' },
            body: {
                en: 'When the brief moves, first agree how much of the plan it actually touches: one line, one section or the whole. Rework only that part, and mark the rest as still standing, so the checks that still hold are not listed again.',
                sk: 'Keď sa zadanie posunie, najprv sa dohodnite, akej veľkej časti plánu sa to naozaj týka: jedného riadku, jednej časti alebo celku. Prepracujte len túto časť, zvyšok označte ako nezmenený a kontroly, ktoré stále platia, znova nespisujte.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'structure-and-flexibility', relations: ['shared'], poles: ['structured'], mechanisms: ['structure-and-flexibility/shared:structured'] },
            sources: ['WRK-008', 'WRK-009'],
        },
        /* practical-and-conceptual: vision and execution */
        {
            id: 'wrk.ask-for-why',
            title: { en: 'Ask for the why before the how', sk: 'Najprv prečo, potom ako' },
            body: {
                en: 'Before cutting a new idea into steps, ask what it is for and what it would look like if it worked. Then send the plan back with one question: “Does this still serve the original intent?” The plan can improve, and the person with the vision is less likely to feel that every idea is being shrunk.',
                sk: 'Skôr než nový nápad rozsekáš na kroky, opýtaj sa, na čo je a ako by to vyzeralo, keby vyšiel. Potom pošli plán späť s jednou otázkou: „Slúži to ešte pôvodnému zámeru?“ Plán sa môže zlepšiť a pocit, že sa každý nápad len zmenšuje, môže ustúpiť.',
            },
            audience: { kind: 'pole', pole: 'practical' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['opposed', 'one-sided'], poles: ['practical'] },
            sources: ['WRK-001', 'WRK-008'],
        },
        {
            id: 'wrk.idea-with-step',
            title: { en: 'Say which part of the idea matters most', sk: 'Povedz, čo je na nápade podstatné' },
            body: {
                en: 'When bringing an idea, say which part of it carries the point and which parts could change shape without losing it. The person turning it into steps then knows what can be trimmed and what cannot, and a cut is less likely to land on the part that mattered.',
                sk: 'Keď prinášaš nápad, povedz, v ktorej časti je jadro nápadu a ktoré časti môžu zmeniť podobu bez toho, aby sa nápad stratil. Pri premene na kroky je potom jasné, čo sa dá skrátiť a čo nie, a škrt menej pravdepodobne zasiahne práve to podstatné.',
            },
            audience: { kind: 'pole', pole: 'conceptual' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['opposed', 'one-sided'], poles: ['conceptual'] },
            sources: ['WRK-008', 'WRK-011'],
        },
        {
            id: 'wrk.vision-to-plan',
            title: { en: 'Translate the vision into a plan', sk: 'Preložte víziu do plánu' },
            body: {
                en: 'Before the work starts, write the goal in one paragraph, then the first steps, each with an owner and a date. Each says aloud how they expect the work to unfold, and any mismatch is settled then rather than halfway through.',
                sk: 'Skôr než sa práca začne, opíšte cieľ jedným odsekom a potom prvé kroky, každý s určenou zodpovednou osobou a dátumom. Nech každý nahlas povie, ako si predstavuje priebeh práce, a nezhodu vyriešte hneď, nie v polovici.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['one-sided'], poles: ['conceptual'], mechanisms: ['practical-and-conceptual/oneSided:conceptual'] },
            sources: ['WRK-008', 'WRK-009', 'WRK-016'],
        },
        {
            id: 'wrk.test-before-ideas',
            title: { en: 'Agree the test before the ideas', sk: 'Najprv meradlo, potom nápady' },
            body: {
                en: 'Ahead of the next open talk, agree in a sentence what an idea has to do to go forward: which problem it answers, and how much it may ask of the two of you. The ideas still come freely, and the end of the talk has a measure to hold them against.',
                sk: 'Pred ďalším otvoreným rozhovorom sa jednou vetou dohodnite, čo musí nápad spĺňať, aby šiel ďalej: aký problém rieši a koľko môže od vás dvoch žiadať. Nápady môžu prichádzať rovnako voľne, no na konci rozhovoru je s čím ich porovnať.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['shared'], poles: ['conceptual'], mechanisms: ['practical-and-conceptual/shared:conceptual'] },
            sources: ['WRK-008', 'WRK-009'],
        },
        {
            id: 'wrk.purpose-above-tasks',
            title: { en: 'Write the purpose above the task list', sk: 'Nad zoznam úloh napíšte, kam práca smeruje' },
            body: {
                en: 'Above the task list, write in two sentences who the work serves and where it is meant to lead, and check each new task against those lines as it is added. A task that cannot be traced to them is a question worth asking, not necessarily one to cut.',
                sk: 'Nad zoznam úloh napíšte dvoma vetami, komu práca slúži a kam má viesť, a každú novú úlohu pri pridaní porovnajte s týmito vetami. Úloha, ktorú k nim nemožno priradiť, je otázka, ktorú sa oplatí položiť, a nie nutne úloha na vyškrtnutie.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'practical-and-conceptual', relations: ['shared'], poles: ['practical'], mechanisms: ['practical-and-conceptual/shared:practical'] },
            sources: ['WRK-008', 'WRK-029'],
        },
        /* risk-and-caution */
        {
            id: 'wrk.name-the-evidence',
            title: { en: 'Say what would make it a yes', sk: 'Povedz, čo by ťa presvedčilo' },
            body: {
                en: 'Instead of “not yet”, name the specific thing that would turn it into a yes: a number, a test, a fallback plan. A named condition gives the other side something to work toward, and keeps the disagreement on the proposal rather than on who is holding things up.',
                sk: 'Namiesto „ešte nie“ pomenuj konkrétnu vec, ktorá by ťa presvedčila: číslo, skúšku, záložný plán. Pomenovaná podmienka dá druhej strane niečo, na čom môže pracovať, a spor zostane pri návrhu, nie pri tom, kto čo brzdí.',
            },
            audience: { kind: 'pole', pole: 'cautious' },
            triggers: { dynamic: 'risk-and-caution', relations: ['opposed', 'one-sided'], poles: ['cautious'], holder: 'second' },
            sources: ['WRK-005', 'WRK-008'],
        },
        {
            id: 'wrk.invite-the-weak-point',
            title: { en: 'Ask for the weak point on purpose', sk: 'Zámerne sa pýtaj na slabé miesto' },
            body: {
                en: 'Before the next bet, ask the other person to spend a few minutes finding where it breaks, and treat the answer as part of the plan rather than a vote against it. Then size the bet: what is the most it may cost, and what would show early that it is not working?',
                sk: 'Pred ďalšou stávkou požiadaj druhú stranu, aby pár minút hľadala, kde sa plán zlomí, a odpoveď ber ako súčasť plánu, nie ako hlas proti. Potom urči veľkosť stávky: koľko najviac môže stáť a podľa čoho včas spoznáš, že nevychádza?',
            },
            audience: { kind: 'pole', pole: 'risk-oriented' },
            triggers: { dynamic: 'risk-and-caution', relations: ['opposed', 'one-sided'], poles: ['risk-oriented'], holder: 'second' },
            sources: ['WRK-005', 'WRK-004'],
        },
        {
            id: 'wrk.reversible-or-not',
            title: { en: 'Two kinds of decision', sk: 'Dva druhy rozhodnutí' },
            body: {
                en: 'Sort the next decisions into two kinds: those that are easy to undo, and those that are not. The first kind can go ahead at speed. For the second, pause for one question that each of you answers aloud: if this goes wrong, what do we lose, and can we carry it?',
                sk: 'Rozdeľte ďalšie rozhodnutia na dva druhy: tie, ktoré sa dajú ľahko vrátiť, a tie, ktoré nie. Pri prvých môžete postupovať rýchlo. Pri druhých sa zastavte pri jednej otázke, na ktorú nahlas odpovie každý z vás: čo stratíme, ak to nevyjde, a unesieme to?',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'risk-and-caution', relations: ['shared', 'one-sided'], poles: ['risk-oriented'], mechanisms: ['risk-and-caution/shared:risk-oriented', 'risk-and-caution/oneSided:risk-oriented'] },
            sources: ['WRK-023', 'WRK-004'],
        },
        /* reasoning-style */
        {
            id: 'wrk.show-the-working',
            title: { en: 'Show the working, not only the answer', sk: 'Ukáž postup, nielen výsledok' },
            body: {
                en: 'When answering a question, walk through how the judgement was reached, including the doubts and the option that was set aside, then invite the mentee to argue for a different route. Disagreement here is the learning rather than a challenge to it, and a route the mentee has adapted can fit better than the original.',
                sk: 'Keď odpovedáš na otázku, prejdi postupom, ktorým úsudok vznikol, vrátane pochybností a možnosti, ktorá vypadla, a potom mentee vyzvi na obhajobu inej cesty. Nesúhlas je tu samotným učením, nie útokom naň, a cesta, ktorú si mentee prispôsobí, môže vyhovovať lepšie než pôvodná.',
            },
            audience: { kind: 'role', role: 'first' },
            triggers: { dynamic: 'reasoning-style', kinds: ['mentor-mentee'], mechanisms: ['reasoning-style/opposed', 'reasoning-style/oneSided'] },
            sources: ['WRK-024'],
        },
        {
            id: 'wrk.two-cases',
            title: { en: 'Argue the idea, not the person', sk: 'Spor o nápad, nie o človeka' },
            body: {
                en: 'For the next contested decision, each writes the case in their own terms, one with the facts and one with the read of the situation, and both agree beforehand what would change their mind. Keep the talk on the issue; if it starts to feel personal, pause, say so, and come back to the decision later.',
                sk: 'Pri ďalšom spornom rozhodnutí nech každý napíše svoj argument po svojom, jeden s faktami, druhý s odhadom situácie, a vopred sa dohodnite, čo by vaše názory zmenilo. Rozhovor držte pri veci; ak začne byť osobný, zastavte sa, povedzte to nahlas a k rozhodnutiu sa vráťte neskôr.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'reasoning-style', relations: ['opposed', 'one-sided'] },
            sources: ['WRK-004', 'WRK-005'],
        },
        {
            id: 'wrk.one-more-check',
            title: { en: 'Ask what one more check would tell', sk: 'Opýtajte sa, čo by ukázala ďalšia kontrola' },
            body: {
                en: 'When one of you asks for another look, ask together two things: what it could tell, and what the wait costs. If neither answer is clear, decide, and note the doubt that is left open, so it is kept rather than lost.',
                sk: 'Keď niekto z vás žiada ešte jeden pohľad, opýtajte sa spolu na dve veci: čo by mohol ukázať a koľko stojí čakanie. Ak to ani jedno nie je jasné, urobte voľbu a zapíšte pochybnosť, ktorá ostáva, aby sa uchovala a nestratila.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'reasoning-style', relations: ['shared'], poles: ['analytical'], mechanisms: ['reasoning-style/shared:analytical'] },
            sources: ['WRK-019', 'WRK-008'],
        },
        /* processing-pace */
        {
            id: 'wrk.question-in-advance',
            title: { en: 'Send the question a day ahead', sk: 'Otázku pošlite deň vopred' },
            body: {
                en: 'For any decision that matters, put the question in writing the day before the meeting, and decide either in the meeting or by a stated time the next morning. Name who keeps the clock. The quick thinker still gets a conversation, and the considered objection arrives before the decision instead of after it.',
                sk: 'Pri každom dôležitom rozhodnutí pošlite otázku písomne deň pred poradou a rozhodnite buď na porade, alebo do dohodnutej hodiny nasledujúce ráno. Určte, kto stráži čas. Kto premýšľa rýchlo, má stále svoj rozhovor, a premyslená námietka príde pred rozhodnutím, nie až potom.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['opposed', 'shared', 'one-sided'], poles: ['introspective'] },
            sources: ['WRK-019', 'WRK-008'],
        },
        {
            id: 'wrk.thinking-aloud-label',
            title: { en: 'Label thinking out loud', sk: 'Označ, kedy premýšľaš nahlas' },
            body: {
                en: 'When thinking aloud, say so: “This is me thinking, not deciding.” At the end of the conversation, state in one sentence what is actually decided, and put it in writing. The other person can then join the brainstorm without worrying that every idea is already a commitment.',
                sk: 'Keď premýšľaš nahlas, povedz to: „Teraz len uvažujem, nerozhodujem.“ Na konci rozhovoru jednou vetou pomenuj, čo sa naozaj rozhodlo, a daj to na papier. Druhý človek sa potom môže pridať k hľadaniu nápadov bez obavy, že každý nápad je už záväzok.',
            },
            audience: { kind: 'pole', pole: 'outwardly-engaged' },
            triggers: { dynamic: 'processing-pace', relations: ['opposed', 'one-sided'], poles: ['outwardly-engaged'], holder: 'second' },
            sources: ['WRK-008', 'WRK-009'],
        },
        {
            id: 'wrk.hold-your-place',
            title: { en: 'Say in the room that you are not there yet', sk: 'Povedz hneď, že ešte premýšľaš' },
            body: {
                en: 'When a decision is forming in the room before your thinking is done, say so in a few words. For example: “I am not there yet; I will have a view by tomorrow.” A placeholder said at the time keeps a later objection from sounding like a change of mind.',
                sk: 'Keď sa v miestnosti rodí rozhodnutie skôr, než máš vec premyslenú, daj to najavo pár slovami, trebárs takto: „Ešte to nemám premyslené, názor budem mať zajtra.“ Takáto veta v pravej chvíli pomôže, aby neskoršia námietka neznela ako zmena názoru.',
            },
            audience: { kind: 'pole', pole: 'introspective' },
            triggers: { dynamic: 'processing-pace', relations: ['opposed', 'one-sided'], poles: ['introspective'], holder: 'second', mechanisms: ['processing-pace/opposed', 'processing-pace/oneSided'] },
            sources: ['WRK-019', 'WRK-006'],
        },
        {
            id: 'wrk.ask-not-read-quiet',
            title: { en: 'Ask rather than read the quiet', sk: 'Pýtajte sa, ticho nevykladajte' },
            body: {
                en: 'Treat quiet as no news rather than good news. Before a piece moves on, each asks the other one direct question, such as “What would you check first?”, and a doubt that would otherwise wait until it felt ready can come out early.',
                sk: 'Ticho berte ako žiadnu správu, nie ako dobrú správu. Skôr než práca pôjde ďalej, každý položí druhej strane jednu priamu otázku, napríklad „Čo by sa podľa teba malo skontrolovať ako prvé?“, a pochybnosť, ktorá by inak čakala, kým dozreje, môže vyjsť najavo včas.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'processing-pace', relations: ['shared'], poles: ['introspective'], mechanisms: ['processing-pace/shared:introspective'] },
            sources: ['WRK-006', 'WRK-008'],
        },
        /* change-and-steadiness */
        {
            id: 'wrk.what-stays-steady',
            title: { en: 'Name what must stay steady', sk: 'Pomenuj, čo má zostať nemenné' },
            body: {
                en: 'Instead of answering each proposal on its own, write down the few routines that must stay steady and why, and say plainly that the rest is open to change. Judge each change by what it brings, not by who proposed it. Agreeing to experiments tends to be easier once the core is known to be safe.',
                sk: 'Namiesto reagovania na každý návrh zvlášť spíš tých pár postupov, ktoré majú zostať, aj s dôvodom, a jasne povedz, že zvyšok sa môže meniť. Každú zmenu posudzuj podľa toho, čo prináša, nie podľa toho, od koho pochádza. Súhlasiť s pokusmi býva ľahšie, keď je jasné, že jadro je v bezpečí.',
            },
            audience: { kind: 'pole', pole: 'stability-seeking' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['opposed', 'one-sided'], poles: ['stability-seeking'], holder: 'first' },
            sources: ['WRK-005', 'WRK-011'],
        },
        {
            id: 'wrk.bounded-trial',
            title: { en: 'Propose changes as small trials', sk: 'Zmenu navrhni ako malý pokus' },
            body: {
                en: 'Bring the next change as a trial with edges: what changes, for how long, how it will be judged, and how to go back if it does not work. Set the review date before starting. For someone who values steadiness, a trial with a way back tends to be easier to agree to than a change that looks permanent.',
                sk: 'Ďalšiu zmenu prines ako pokus s jasnými hranicami: čo sa mení, na ako dlho, podľa čoho sa posúdi a ako sa vrátiť späť, ak to nevyjde. Dátum vyhodnotenia urči ešte pred začiatkom. Kto si cení stálosť, zvyčajne ľahšie prijme pokus s cestou späť než zmenu, ktorá vyzerá natrvalo.',
            },
            audience: { kind: 'pole', pole: 'novelty-seeking' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['opposed', 'one-sided'], poles: ['novelty-seeking'] },
            sources: ['WRK-029', 'WRK-002'],
        },
        {
            id: 'wrk.take-turns-against',
            title: { en: 'Take turns arguing against it', sk: 'Striedajte sa v úlohe oponenta' },
            body: {
                en: 'When both of you like a new idea, let one take the other side on purpose for a few minutes: what could this break, and what does it make harder? Swap the role each time, so that doubting is a task, not a stance.',
                sk: 'Keď sa nový nápad páči vám dvom, nech niekto z vás na pár minút zámerne zaujme opačné stanovisko: čo by to mohlo pokaziť a čo to sťaží? Úlohu si zakaždým vymeňte, aby pochybovanie bolo rolou, nie postojom.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['shared'], poles: ['novelty-seeking'], mechanisms: ['change-and-steadiness/shared:novelty-seeking'] },
            sources: ['WRK-005', 'WRK-006'],
        },
        {
            id: 'wrk.routine-by-choice',
            title: { en: 'Ask of each routine whether you would pick it today', sk: 'Spýtajte sa, ktoré postupy by ste si vybrali aj dnes' },
            body: {
                en: 'On a date set in advance, list the tools and routines the work runs on, and ask of each: would we pick this today? A routine kept by choice is steadiness; one kept because nobody asked may only be habit.',
                sk: 'V dohodnutý deň si prejdite všetko, na čom práca beží, od programov po ustálené zvyky, a pri každej veci sa spýtajte: vybrali by sme si to aj dnes? Zvyk, ktorý sa drží z vlastnej voľby, je stálosť; ten, ktorý sa drží len preto, že sa nikto nespýtal, môže byť už len zotrvačnosť.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'change-and-steadiness', relations: ['shared'], poles: ['stability-seeking'], mechanisms: ['change-and-steadiness/shared:stability-seeking'] },
            sources: ['WRK-029', 'WRK-010'],
        },
        /* shared-pull */
        {
            id: 'wrk.sustainability-check',
            title: { en: 'Ask whether this pace can last', sk: 'Opýtajte sa, či toto tempo vydrží' },
            body: {
                en: 'Now and then, set aside a short conversation for one question: is the way we work something both of us can keep up, and would we choose it again? A drive two people share makes it easy to overrun together, so it is worth checking the cost on purpose, not only the results.',
                sk: 'Z času na čas si vyhraďte krátky rozhovor na jednu otázku: dokážeme takto pracovať aj ďalej a zvolili by sme si tento spôsob znova? Keď dvojicu ženie to isté, ľahko spoločne prekročí vlastné sily, a preto sa oplatí zámerne sledovať aj cenu, nielen výsledky.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], mechanisms: ['shared-pull/shared:achievement', 'shared-pull/shared:mastery', 'shared-pull/shared:meaning', 'shared-pull/shared:care'] },
            sources: ['WRK-029', 'WRK-028'],
        },
        {
            id: 'wrk.overload-signal',
            title: { en: 'Agree a signal for overload', sk: 'Dohodnite si signál preťaženia' },
            body: {
                en: 'Pick a plain, low-drama way to say “this is too much right now”, and agree what happens next: something gets dropped, moved or shared. Keep time off protected and after-hours requests the exception both agreed to. Serious strain is a matter for a doctor or HR rather than for the pair alone.',
                sk: 'Vyberte si jednoduchý spôsob bez drámy, ako povedať „teraz je toho priveľa“, a dohodnite sa, čo nasleduje: niečo sa vypustí, presunie alebo rozdelí. Chráňte voľno a požiadavky po pracovnom čase nech zostanú výnimkou, na ktorej ste sa dohodli. Vážna záťaž patrí lekárovi alebo personálnemu oddeleniu, nie len dvojici.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], mechanisms: ['shared-pull/shared:achievement', 'shared-pull/shared:meaning', 'shared-pull/shared:care'] },
            sources: ['WRK-028'],
        },
        {
            id: 'wrk.say-what-change-is-for',
            title: { en: 'Say what a suggested change is for', sk: 'Povedzte, na čo je navrhnutá zmena' },
            body: {
                en: 'With each suggested change in a review, say what it is for: the reader, the deadline, or taste. A change for the reader or the deadline is a request; one for taste is an offer the owner of that part may decline.',
                sk: 'Pri každej zmene, ktorú navrhujete pri revízii, povedzte, na čo je: pre čitateľa, pre termín alebo pre vkus. Zmena kvôli čitateľovi alebo termínu je požiadavka; zmena kvôli vkusu je ponuka, ktorú môže ten, komu časť patrí, odmietnuť.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], mechanisms: ['shared-pull/shared:self-expression'] },
            sources: ['WRK-025', 'WRK-005'],
        },
        {
            id: 'wrk.open-questions-list',
            title: { en: 'Give the open questions a list', sk: 'Otvoreným otázkam dajte zoznam' },
            body: {
                en: 'Keep a running list of what is still worth finding out once the choice is made. A good question parked there is kept rather than dropped, which can make it easier to stop asking for now.',
                sk: 'Veďte si priebežný zoznam toho, čo sa oplatí zistiť aj po tom, ako padne voľba. Dobrá otázka odložená na zoznam sa nestratí, a tak je ľahšie na chvíľu sa prestať pýtať.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], mechanisms: ['shared-pull/shared:understanding'] },
            sources: ['WRK-019', 'WRK-008'],
        },
        {
            id: 'wrk.credit-as-you-go',
            title: { en: 'Note who did what as the work goes', sk: 'Priebežne si zapisujte, kto čo urobil' },
            body: {
                en: 'As the work goes, keep a short shared note of who did which part, and draw on it when the result is presented. Credit taken from a record made along the way tends to be easier to agree on than credit remembered afterwards.',
                sk: 'Počas práce si veďte krátku spoločnú poznámku o tom, kto urobil ktorú časť, a pri predstavovaní výsledku vychádzajte z tejto poznámky. Na zásluhách podľa záznamu z priebehu práce sa zvyčajne dá dohodnúť ľahšie než na tých, ktoré sa dopĺňajú spätne z pamäti.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'shared-pull', relations: ['shared-drive'], mechanisms: ['shared-pull/shared:recognition'] },
            sources: ['WRK-027', 'WRK-010'],
        },
        /* pulls-apart: one card for each pair of drives, then the general ones */
        {
            id: 'wrk.rehearse-for-each-other',
            title: { en: 'Rehearse it for each other first', sk: 'Najprv si to predveďte navzájom' },
            body: {
                en: 'Before the work is shown, hold one short run-through between the two of you: one presents it as if to the audience, the other asks what the audience might ask. What cannot be answered yet goes on a list, and the list, not the mood of the moment, says whether the date holds.',
                sk: 'Skôr než prácu ukážete, urobte si krátku generálku vo dvojici: niekto z vás prácu predstaví tak, ako by to bolo pred publikom, a druhá strana sa pýta to, na čo by sa mohlo pýtať publikum. Čo sa ešte nedá zodpovedať, ide na zoznam, a o tom, či termín platí, rozhodne zoznam, nie nálada chvíle.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/recognition|understanding'] },
            sources: ['WRK-008', 'WRK-006'],
        },
        {
            id: 'wrk.say-the-absence',
            title: { en: 'Say the absence before it happens', sk: 'Neprítomnosť ohláste vopred' },
            body: {
                en: 'When either of you skips a shared moment, say so beforehand in a line, with when you will next be in touch. An absence announced ahead tends to read as room taken; one discovered afterwards can read as a step away from the group.',
                sk: 'Keď niekto z vás vynechá spoločnú chvíľu, povie to vopred jednou vetou aj s tým, kedy sa znova ozve. Ohlásená neprítomnosť zvyčajne vyzerá ako čas pre seba; neohlásená môže vyzerať ako odstup od skupiny.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/freedom|belonging'] },
            sources: ['WRK-027', 'WRK-020'],
        },
        {
            id: 'wrk.both-questions-at-once',
            title: { en: 'Put the two questions on the table at once', sk: 'Položte si tie dve otázky naraz' },
            body: {
                en: 'When a date is under threat, ask both questions in the same breath: what can be dropped, and whose load is heaviest. Answered side by side, they describe one problem instead of setting two people against each other.',
                sk: 'Keď je termín ohrozený, položte si tie dve otázky jedným dychom: čo sa dá vypustiť a kto nesie najviac. Keď sa zodpovedajú spolu, opisujú jeden problém a nestavajú dvoch ľudí proti sebe.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'], mechanisms: ['pulls-apart/achievement|care'] },
            sources: ['WRK-028', 'WRK-005'],
        },
        {
            id: 'wrk.worth-it-for-each',
            title: { en: 'Say what makes the work worth it', sk: 'Povedzte, prečo sa vám práca oplatí' },
            body: {
                en: 'Each names, in a sentence, the part of the work that feels most natural and the part that drains them; then reshape one of the coming tasks so both get a little more of the natural part. Motives that pull apart tend to cause less friction once they are said plainly and built into how the work is divided.',
                sk: 'Nech každý jednou vetou pomenuje časť práce, ktorá ide najprirodzenejšie, a časť, ktorá vyčerpáva, a potom upravte jednu z najbližších úloh tak, aby sa každému ušlo viac z toho prirodzeného. Motívy, ktoré ťahajú od seba, zvyčajne spôsobujú menej trenia, keď sa povedia nahlas a premietnu do rozdelenia práce.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'] },
            sources: ['WRK-015'],
        },
        {
            id: 'wrk.how-we-work-talk',
            title: { en: 'Talk about the partnership, not only the work', sk: 'Hovorte o spolupráci, nielen o práci' },
            body: {
                en: 'Now and then, set aside a conversation about how the two of you work together rather than about the work: what has built trust lately, what has worn it down, and what would help. Motives that point different ways tend to be easier to hold when there is a regular place to name them.',
                sk: 'Z času na čas si nájdite čas na rozhovor o tom, ako spolu pracujete, nie o samotnej práci: čo v poslednom čase dôveru posilnilo alebo oslabilo a čo by pomohlo. Motívy, ktoré vedú rôznymi smermi, sa zvyčajne ľahšie znášajú, keď majú pravidelné miesto, kde sa dajú pomenovať.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'pulls-apart', relations: ['drives-pull-apart'] },
            sources: ['WRK-023', 'WRK-027'],
        },
        /* different-pulls */
        {
            id: 'wrk.ask-what-priority-is-for',
            title: { en: 'Ask what the other’s priority is for', sk: 'Spýtajte sa, čomu priorita druhej strany slúži' },
            body: {
                en: 'When the other’s priority looks wrong, ask what it is for before arguing against it: “What does this protect for you?” A priority that serves a reason you do not hold can still be a sound one.',
                sk: 'Keď sa vám priorita druhej strany zdá nesprávna, skôr než začnete namietať, spýtajte sa, čomu slúži: „Čo tým chrániš?“ Priorita, ktorá vychádza z dôvodu, aký sami nemáte, môže byť aj tak rozumná.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'different-pulls', relations: ['different-drives'] },
            sources: ['WRK-016', 'WRK-015'],
        },
        {
            id: 'wrk.route-by-energy',
            title: { en: 'Divide the work by what energises each', sk: 'Rozdeľte prácu podľa toho, čo koho nabíja' },
            body: {
                en: 'List the tasks coming up next and have each mark the ones that give energy and the ones that cost it. With different drives the marks often differ, which makes an easy first draft of who takes what. Treat it as a draft to discuss, not an assignment.',
                sk: 'Spíšte najbližšie úlohy a nech každý označí tie, ktoré nabíjajú, a tie, ktoré vyčerpávajú. Pri rozdielnych motívoch sa označenia často líšia, a to je ľahký prvý návrh, kto si čo vezme. Je to návrh na rozhovor, nie pridelenie úloh.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'different-pulls', relations: ['different-drives'] },
            sources: ['WRK-015', 'WRK-016'],
        },
        {
            id: 'wrk.who-knows-what',
            title: { en: 'Name who to ask about what', sk: 'Pomenujte, koho sa na čo pýtať' },
            body: {
                en: 'Write down what each actually knows best from experience, and where each will defer to the other. Questions and decisions then go to the right person instead of whoever is nearest. Base it on what each has actually done, not on a description of style.',
                sk: 'Spíšte, čomu každý zo skúsenosti naozaj rozumie najlepšie a v čom sa riadi úsudkom druhej strany. Otázky a rozhodnutia potom smerujú k správnemu človeku, nie k tomu, kto je práve najbližšie. Vychádzajte z toho, čo už kto naozaj urobil, nie z opisu štýlu.',
            },
            audience: { kind: 'both' },
            triggers: { dynamic: 'different-pulls', relations: ['different-drives'] },
            sources: ['WRK-010'],
        },
    ],
    /* ---------------------------------------------------------------------------------------------------------------------------------------------------- frame */
    sections: {
        overview: { en: 'The working pair at a glance', sk: 'Pracovná dvojica v skratke' },
        story: { en: 'How the work tends to run', sk: 'Ako zvykne bežať práca' },
        alongside: { en: 'Also at play', sk: 'Čo ešte hrá úlohu' },
        guidance: { en: 'Working agreements worth trying', sk: 'Pracovné dohody, ktoré sa oplatí skúsiť' },
        yourWords: { en: 'What you see at work', sk: 'Čo v práci vidíš ty' },
        next: { en: 'A first agreement', sk: 'Prvá dohoda' },
        limits: { en: 'What this reading is not', sk: 'Čo toto čítanie nie je' },
    },
    guidanceIntro: {
        en: 'These are working agreements rather than personality advice: small, concrete arrangements about decisions, handovers and pace that a pair can try for a couple of weeks, then keep or drop. The two people know their actual skills far better than any reading does, so adapt each one to how the work really runs.',
        sk: 'Ide o pracovné dohody, nie o rady k povahe: malé, konkrétne pravidlá o rozhodovaní, odovzdávaní práce a tempe, ktoré môže dvojica pár týždňov skúšať a potom si ich nechať alebo zahodiť. Svoje skutočné schopnosti poznajú títo dvaja ľudia oveľa lepšie než akékoľvek čítanie, preto dohody prispôsob tomu, ako práca naozaj prebieha.',
    },
    shapes: {
        all: { en: '{both} meet on three levels at once: common ground in {resonance}, a working complement in {complement}, and the likeliest snag in {friction}.', sk: '{both} sa stretávajú na troch úrovniach naraz: spoločná pôda v oblasti „{resonance}“, užitočné doplnenie v oblasti „{complement}“ a najpravdepodobnejšie zadrhnutie v oblasti „{friction}“.' },
        resonanceFriction: { en: '{both} share solid ground in {resonance}, and the place to keep an eye on is {friction}.', sk: '{both} majú pevnú spoločnú pôdu v oblasti „{resonance}“ a pozornosť treba venovať oblasti „{friction}“.' },
        complementFriction: { en: '{both} cover for each other in {complement}, and the work is most likely to snag in {friction}.', sk: '{both} sa navzájom dopĺňajú v oblasti „{complement}“ a spolupráca sa najskôr zadrhne v oblasti „{friction}“.' },
        resonanceComplement: { en: '{both} start from common ground in {resonance} and gain the most from their difference in {complement}.', sk: '{both} vychádzajú zo spoločnej pôdy v oblasti „{resonance}“ a najviac získavajú z rozdielu v oblasti „{complement}“.' },
        resonanceOnly: { en: '{both} work from the same instinct in {resonance}, which makes daily work smooth and the blind spots shared.', sk: '{both} pracujú z rovnakého inštinktu v oblasti „{resonance}“, čo uľahčuje každodennú prácu a zároveň znamená spoločné slepé miesta.' },
        complementOnly: { en: '{both} are most useful to each other in {complement}, where one covers what the other person tends to leave open.', sk: '{both} si najviac pomáhajú v oblasti „{complement}“, kde jedna strana pokrýva to, čo druhá zvykne nechať otvorené.' },
        frictionOnly: { en: '{both} have the most to agree on in {friction}, where the working day is likeliest to snag.', sk: '{both} potrebujú najviac dohôd v oblasti „{friction}“, kde sa pracovný deň najľahšie zadrhne.' },
    },
    drivePhrases: {
        shared: { en: 'a shared reason for doing the work', sk: 'spoločný dôvod pracovať' },
        pullsApart: { en: 'what each is working for', sk: 'to, pre čo každý pracuje' },
        different: { en: 'what each does the work for', sk: 'to, pre čo každý prácu robí' },
    },
    care: {
        en: 'If work involves harassment, bullying, discrimination or a situation that feels unsafe, a reading is not the place to sort it out. HR, a union or staff representative, or independent legal advice can act where a reading cannot, and nothing here is a reason to stay in a role that is doing harm. Nor is this an HR tool: it should not decide who gets a job, a task or a raise.',
        sk: 'Ak práca zahŕňa obťažovanie, šikanu, diskrimináciu alebo situáciu, ktorá pôsobí nebezpečne, čítanie nie je miesto, kde to riešiť. Personálne oddelenie, odbory či zástupca zamestnancov alebo nezávislá právna rada môžu konať tam, kde čítanie nemôže, a nič tu nie je dôvodom zostávať v role, ktorá škodí. Nie je to ani personálny nástroj: nemá rozhodovať o tom, kto dostane prácu, úlohu alebo vyšší plat.',
    },
    /* How the reading ends in this domain, by the shape of its story: why a step of this size suits it, and one question. The step itself is the first research-backed practice the story calls for. */
    endings: {
        converge: {
            next: [
                { en: 'When {both} work from the same instinct in {phrase}, the strength is a shared pace and the risk is a shared blind spot, so the step that fits is a small check from outside that instinct.', sk: 'Keď {both} pracujú z rovnakého inštinktu v oblasti „{phrase}“, sila je v spoločnom tempe a riziko v spoločnom slepom mieste, preto sedí malá kontrola zvonka.' },
                { en: 'Common ground in {phrase} makes daily work smooth; one agreed moment to question it keeps it from becoming a habit nobody examines.', sk: 'Spoločná pôda v oblasti „{phrase}“ robí bežnú prácu hladkou; jedna dohodnutá chvíľa na spochybnenie toho, čo sa berie ako dané, bráni tomu, aby z toho vznikol zvyk, ktorý nikto neskúma.' },
            ],
            ask: [
                { en: 'On {phrase}, where would a view from outside the pair be most useful?', sk: 'Kde by v oblasti „{phrase}“ najviac pomohol pohľad zvonka?' },
                { en: 'On {phrase}, what does the pair take for granted that a newcomer would ask about?', sk: 'Čo v oblasti „{phrase}“ dvojica berie ako samozrejmosť a nováčik by sa na to opýtal?' },
            ],
            step: [
                { en: 'Add one question to the next review of the work: “What are we assuming here?”', sk: 'Pridaj na budúce zhodnotenie práce jednu otázku: „Čo tu predpokladáme?“' },
                { en: 'Invite one outside reader to look at the next decision and say what stands out.', sk: 'Pozvi jedného čitateľa zvonka, aby sa pozrel na najbližšie rozhodnutie a povedal, čo mu padne do oka.' },
            ],
        },
        complement: {
            next: [
                { en: 'The difference in {phrase} is a working complement, and it pays most when the division of the work is explicit, so the step that fits is writing that division down.', sk: 'Rozdiel v oblasti „{phrase}“ je pracovné doplnenie sa a najviac prináša, keď je rozdelenie práce jasne vyslovené, takže sa hodí toto rozdelenie napísať.' },
                { en: 'Differences that cover for each other work best when they are agreed in advance rather than discovered under pressure, so a small, explicit agreement is the proportionate step.', sk: 'Rozdiely, ktoré sa dopĺňajú, fungujú najlepšie, keď sa dohodnú vopred, a nie keď sa na ne príde až pod tlakom, preto je primeraným krokom malá, jasná dohoda.' },
            ],
            ask: [
                { en: 'On {phrase}, which decisions should {first} own, and which {second}?', sk: 'Ktoré rozhodnutia v oblasti „{phrase}“ má mať na starosti {first} a ktoré {second}?' },
                { en: 'On {phrase}, what matters most for each side to have done first when a deadline is close?', sk: 'Čo je v oblasti „{phrase}“ pre každú stranu najdôležitejšie mať hotové ako prvé, keď sa blíži termín?' },
            ],
            step: [
                { en: 'Write down, in three lines, which kinds of decision each of you takes and which you take together.', sk: 'Napíš v troch riadkoch, o ktorých rozhodnutiach rozhoduje každý zvlášť a o ktorých spolu.' },
                { en: 'Before the next piece of work, say what you each want to hand over and what to keep.', sk: 'Pred ďalšou prácou povedzte, čo chcete odovzdať a čo si ponechať.' },
            ],
        },
        tension: {
            next: [
                { en: 'The place most likely to snag is {phrase}, and work friction tends to ease with an agreement more than with a conversation, so the step that fits is a specific, written one.', sk: 'Najľahšie sa zadrhne v oblasti „{phrase}“ a pracovné trenie sa zvyčajne uvoľní skôr dohodou než rozhovorom, takže sedí konkrétny, písomný krok.' },
                { en: 'Friction around {phrase} costs most when it surfaces under a deadline, so the proportionate step is to settle the rule while the work is calm.', sk: 'Trenie v oblasti „{phrase}“ stojí najviac, keď sa ukáže pod termínom, preto je primeraným krokom dohodnúť pravidlo, kým je práca pokojná.' },
            ],
            ask: [
                { en: 'On {phrase}, what is worth settling in writing before the next piece of work?', sk: 'Ktorú časť oblasti „{phrase}“ stojí za to dohodnúť písomne pred ďalšou prácou?' },
                { en: 'On {phrase}, what do {first} and {second} each need to know to stop guessing?', sk: 'Čo potrebujú {first} a {second} v oblasti „{phrase}“ vedieť, aby už nemuseli odhadovať?' },
            ],
            step: [
                { en: 'Pick one recurring decision and write the rule down: who decides, who is consulted, by when.', sk: 'Vyber si jedno opakujúce sa rozhodnutie a pravidlo napíš: kto rozhoduje, koho sa pýtajú, dokedy.' },
                { en: 'Agree a fixed time each week to settle the open questions, so they do not surface under a deadline.', sk: 'Dohodnite si pevný čas v týždni na vyriešenie otvorených otázok, aby sa neobjavili až pod termínom.' },
            ],
        },
        asymmetry: {
            next: [
                { en: 'Where one side leans clearly in {phrase}, the other can read that as a decision already made, so a step that makes decision rights explicit is the useful one.', sk: 'Keď sa jedna strana v oblasti „{phrase}“ jasne nakláňa, druhá to môže brať ako už hotové rozhodnutie, preto je užitočný krok, ktorý jasne vymedzí, kto o čom rozhoduje.' },
                { en: 'A lopsided dimension is easy to read as hierarchy; saying out loud who decides what removes the guesswork.', sk: 'Jednostranná oblasť sa dá ľahko pokladať za hierarchiu; nahlas povedať, kto o čom rozhoduje, odstráni odhadovanie.' },
            ],
            ask: [
                { en: 'On {phrase}, who decides what, and does everyone involved agree?', sk: 'Kto o čom rozhoduje v oblasti „{phrase}“ a súhlasia s tým všetci zúčastnení?' },
                { en: 'On {phrase}, which decisions would be worth giving a named owner?', sk: 'Ktoré rozhodnutia v oblasti „{phrase}“ by stálo za to zveriť jednej konkrétnej osobe?' },
            ],
            step: [
                { en: 'Write, in one line each, who decides what for the next piece of work, and ask whether the other agrees.', sk: 'Napíš jednou vetou, kto o čom rozhoduje pri ďalšej práci, a spýtaj sa, či s tým druhá strana súhlasí.' },
                { en: 'Hand one decision over completely this month, with no review afterwards.', sk: 'Tento mesiac odovzdaj jedno rozhodnutie úplne, bez následnej kontroly.' },
            ],
        },
    },
    restraint: [
        { en: 'It is also reasonable to watch first: noticing what happens there over a few weeks of real work says more than a conversation held in advance.', sk: 'Je rozumné aj najprv sledovať: všímať si, čo sa tam deje počas niekoľkých týždňov skutočnej práce, povie viac než rozhovor vopred.' },
        { en: 'If the timing is wrong, keeping notes on what happens there for a while is a sound first step.', sk: 'Ak nie je ten správny čas, na chvíľu je dobrým prvým krokom zapisovať si, čo sa tam deje.' },
    ],
    closing: {
        en: 'This reading is a symbolic picture of how {both} may tend to divide, pace and steer shared work, a starting point for agreeing how to work together. It says nothing about competence, performance or qualifications, which show in the work itself and which the pair knows better than any reading. It is not an HR tool and must not inform hiring, promotion, dismissal, ranking or any judgement of who is better suited to a role.',
        sk: 'Toto čítanie je symbolický obraz toho, ako {both} môžu pri spoločnej práci deliť úlohy, určovať tempo a udávať smer, a východisko pre dohodu o tom, ako spolu pracovať. Nehovorí nič o schopnostiach, výkone ani kvalifikácii, ktoré sa ukazujú v samotnej práci a ktoré dvojica pozná lepšie než akékoľvek čítanie. Nie je to personálny nástroj a nesmie slúžiť na prijímanie do zamestnania, povýšenie, prepúšťanie, poradie ľudí ani na posúdenie, kto sa na akú rolu hodí viac.',
    },
};
export default CONTENT;
