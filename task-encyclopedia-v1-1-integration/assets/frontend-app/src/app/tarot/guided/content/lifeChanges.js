/**
 * LIFE CHANGES & DECISIONS - thresholds and transitions in general.
 *
 * This area owns the passage itself: a crossroads, a chapter closing, a new one starting, the in-between, resisting change and
 * adapting to it. It does not own a specific house move (Home), a trip (Travel), a job (Work) or a relationship (Relationships).
 * It never picks a path for the person: it shows what each holds and what the choice turns on.
 *
 * The lens lines serve all four intentions (a crossroads, something to release, available resources, how to move forward), so none of
 * them presupposes a fork, a loss, a strength or a plan; the places carry that specificity in their own frames.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    stage: {
        'sets-something-beginning': [
            t('A beginning at a threshold rarely announces itself: it shows as a small restlessness, a first step that seems too minor to matter, a page still mostly blank.', 'Začiatok na prahu sa málokedy ohlási: ukáže sa ako drobný nepokoj, prvý krok, ktorý sa zdá príliš malý na to, aby mal váhu, alebo stránka, ktorá je zatiaľ takmer prázdna.'),
            t('New chapters often start before they are named: a different question at the edge of the day, a small willingness to try what used to feel out of reach.', 'Nové kapitoly často začínajú skôr, než dostanú meno: iná otázka na konci dňa, malá chuť skúsiť to, čo sa kedysi zdalo mimo dosahu.'),
        ],
        'sustains-an-effort': [
            t('Passing through a change is mostly plain work: the same small tasks repeated day after day until the new arrangement stops feeling borrowed.', 'Prechod zmenou je väčšinou obyčajná robota: tie isté drobnosti deň po dni, kým nové usporiadanie prestane pôsobiť ako požičané.'),
            t('Part-way through a change there is often a long middle where little is visible, and the effort is measured in staying with it rather than in progress.', 'Uprostred zmeny býva dlhý úsek, v ktorom je vidieť máločo a úsilie sa meria vytrvaním, nie pokrokom.'),
        ],
        'holds-still': [
            t('A pause inside a transition can be a landing between two staircases, or a doorway where one hand still rests on the old handle.', 'Prestávka uprostred prechodu môže byť odpočívadlo medzi dvoma schodiskami alebo prah, na ktorom jedna ruka stále drží starú kľučku.'),
            t('Standing still while things change can be rest or avoidance, and the difference often shows in whether the stillness is chosen or merely continued.', 'Stáť na mieste, kým sa veci menia, môže byť oddych aj vyhýbanie sa; rozdiel sa často ukáže v tom, či je zastavenie zvolené, alebo len pokračuje zo zvyku.'),
        ],
        'stands-at-full-extent': [
            t('Once a change has fully arrived, it is in plain view: what it gave, what it cost and what it asks to be carried forward.', 'Keď zmena nastane naplno, je všetko na očiach: čo priniesla, čo stála a čo si žiada niesť ďalej.'),
            t('Nothing is left to wait for when a chapter is at its fullest: it is neither the easiest part nor the hardest, and there is something to take up.', 'Keď je kapitola v plnej miere, už nie je na čo čakať: nie je to ani najľahšia, ani najťažšia časť a je čo vziať do rúk.'),
        ],
        'is-mid-transition': [
            t('Being mid-transition is like standing on a bridge: the old bank is behind and the new one is not yet firm underfoot.', 'Byť uprostred prechodu je ako stáť na moste: starý breh je za chrbtom a nový ešte nie je pevný pod nohami.'),
            t('In-between times blur the labels: the old one no longer fits, the new one is not yet found, and a name for the middle is often the first thing missing.', 'Medzidobie rozmazáva pomenovania: staré už nesedí, nové sa ešte nenašlo a meno pre stredný úsek často chýba ako prvé.'),
        ],
        'is-being-broken-into': [
            t('An interruption to the routine tends to arrive uninvited, like a knock at the door, and shows how much of the day rested on the assumption that nothing would shift.', 'Prerušenie zabehnutého poriadku prichádza bez pozvania, ako zaklopanie na dvere, a ukáže, koľko z bežného dňa stálo na predpoklade, že sa nič nepohne.'),
            t('When change pushes its way in, the first question is often not what to decide but where the floor still holds.', 'Keď sa zmena vtlačí dnu, prvou otázkou nebýva, čo rozhodnúť, ale kde podlaha ešte drží.'),
        ],
        'is-letting-go': [
            t('Letting go in a transition is often less like dropping something and more like unclenching a hand: a role, a plan or a picture of how things should have gone.', 'Pustiť niečo pri zmene je často menej ako zahodiť a viac ako uvoľniť zovretú päsť: rolu, plán alebo predstavu o tom, ako to malo byť.'),
            t('What gets put down at a threshold is rarely the whole past; usually it is one weight, an old expectation or a habit of waiting, that no longer has to be carried.', 'Na prahu sa málokedy odkladá celá minulosť; zvyčajne ide o jednu záťaž, starý zvyk čakať alebo dávne očakávanie, ktoré už netreba niesť.'),
        ],
        'is-coming-together': [
            t('When a change settles, its pieces start to fit: the ending and the beginning stop arguing and become two sides of one doorway.', 'Keď sa zmena usadí, jej časti do seba začnú zapadať: koniec a začiatok sa prestanú hádať a stanú sa dvoma stranami tých istých dverí.'),
            t('Integration after a transition looks like ordinary days that quietly hold both what was kept and what is new.', 'Zjednotenie po zmene vyzerá ako obyčajné dni, v ktorých sa potichu zmestí aj to, čo sa zachovalo, aj to, čo je nové.'),
        ],
    },
    stance: {
        continue: [
            t('Steadiness is the point here: carrying on with what was begun through a change, even when it goes slower or plainer than hoped.', 'Stálosť je tu to hlavné: pokračovať v začatom aj cez zmenu, hoci to ide pomalšie a obyčajnejšie, než sa dúfalo.'),
            t('Not every transition needs a new road; sometimes the change lies in how the same road is walked, with more attention and less hurry.', 'Nie každá zmena potrebuje novú cestu; niekedy spočíva v tom, ako sa ide po tej istej: s väčšou pozornosťou a menším zhonom.'),
        ],
        redirect: [
            t('Redirecting is a turn rather than a stop: what mattered stays close, while the way toward it changes.', 'Zmeniť smer je odbočka, nie zastavenie: to, na čom záležalo, zostáva nablízku, mení sa len cesta k tomu.'),
            t('A change of course goes best with open eyes, noticing what the old direction gave and what the new one needs that the old did not.', 'Zmena smeru ide s otvorenými očami: všimnúť si, čo dávalo staré smerovanie a čo si nové žiada, hoci to staré nepotrebovalo.'),
        ],
        'let-go': [
            t('Something is asked to be set down: an old role, a plan that has outlived its use, a version of events that kept things familiar.', 'Žiada sa odložiť niečo, čo sa dlho nosilo: starú rolu, plán, ktorý prežil svoj účel, alebo verziu príbehu, ktorá držala veci povedomé.'),
            t('Setting a chapter down often takes a small act of release, like emptying a drawer, before the space can hold anything else.', 'Zatvoriť kapitolu si často žiada malé gesto pustenia, ako keď sa vyprázdni zásuvka, aby sa uvoľnené miesto dalo využiť na niečo iné.'),
        ],
        moderate: [
            t('A slower pace gives a change room: fewer things altered at once, and time to notice how each of them settles.', 'Pomalšie tempo dáva zmene priestor: menej vecí naraz a čas všimnúť si, ako sa každá z nich usádza.'),
            t('Between clinging to everything familiar and throwing everything over lies a middle: keeping what still serves and loosening what does not.', 'Medzi lipnutím na všetkom známom a zahodením všetkého je stred: ponechať, čo ešte slúži, a uvoľniť, čo už neslúži.'),
        ],
        'meet-it': [
            t('Facing a change directly means naming what is ending and what is starting, instead of managing around it.', 'Pozrieť sa na zmenu priamo znamená pomenovať, čo sa končí a čo začína, namiesto toho, aby sa obchádzala.'),
            t('Meeting a change means letting it be as large as it is, and bearing the unease of not yet seeing how it settles.', 'Stretnúť zmenu znamená nechať ju byť takú veľkú, aká je, a uniesť nepokoj z toho, že ešte nie je vidieť, ako sa usadí.'),
        ],
        wait: [
            t('Some thresholds cannot be hurried; this stance leaves the quiet unfilled by forced decisions.', 'Niektoré prahy sa nedajú urýchliť; toto je postoj čakania, v ktorom sa ticho nezapĺňa vynútenými rozhodnutiami.'),
            t('Patience in a change is not idleness: it is closer to a garden in winter, resting so that something can be sown when the season comes.', 'Trpezlivosť pri zmene nie je nečinnosť: pripomína skôr záhradu v zime, ktorá oddychuje, aby sa mohlo siať, keď príde čas.'),
        ],
        choose: [
            t('Choosing knowingly means seeing what each possibility holds and what taking one also leaves behind.', 'Voľba s vedomím znamená vidieť, čo každá možnosť obsahuje a čo sa jej výberom zároveň necháva za sebou.'),
            t('Choosing is less about finding a right door than about what gets carried through whichever one is taken.', 'Pri voľbe nejde ani tak o hľadanie správnych dverí, ako o to, čo sa prenáša cez tie, ktorými sa prejde.'),
        ],
        integrate: [
            t('This points toward bringing old and new into one picture: what is being kept, what is changing, and how they sit in the same life.', 'Toto smeruje k spojeniu starého a nového do jedného obrazu: čo sa zachováva, čo sa mení a ako to spolu žije v jednom živote.'),
            t('Integration in a change starts with a plain inventory of what stays, what goes and what is being rearranged, so that the parts become one life rather than two.', 'Zjednotenie pri zmene začína jednoduchým súpisom toho, čo ostáva, čo odchádza a čo sa prestavuje, aby z častí vznikol jeden život, nie dva.'),
        ],
        'attend-to-it': [
            t('A change can ask for attention rather than action: a closer look at what stirs, what resists, what keeps coming back.', 'Zmena si môže žiadať skôr pozornosť než konanie: pozrieť sa zblízka na to, čo sa hýbe, čo sa bráni, čo sa stále vracia.'),
            t('What matters first may be noticing how a change lands in daily life (small reactions, habits that tighten, things avoided) before any steering.', 'Najprv môže stačiť všímať si, ako zmena dopadá na bežný deň (drobné reakcie, zvyky, ktoré sa sťahujú, veci, ktorým sa človek vyhýba), skôr než sa ju niekto pokúsi riadiť.'),
        ],
    },
    trend: {
        expanding: t('A widening pull favours room over focus: more doors left ajar, more willingness to try, and a shape that stays loose for now.', 'Rozširovanie sa prikláňa k priestoru namiesto zamerania: viac pootvorených dverí, viac ochoty skúšať a tvar, ktorý zatiaľ ostáva voľný.'),
        contracting: t('Drawing inward favours what is essential: a smaller circle and fewer open questions, with less room for whatever was not central.', 'Sťahovanie dovnútra hľadá podstatné: menší okruh a menej otvorených otázok, s menším miestom pre všetko, čo nebolo ústredné.'),
        stabilising: t('A pull toward steadiness favours the repeatable: a rhythm that can be kept up and a footing that needs no daily defending, though it leaves little room for experiment.', 'Sklon k stálosti dáva prednosť opakovateľnému: rytmu, ktorý sa dá udržať, a základu, ktorý netreba denne brániť, hoci necháva málo miesta na pokusy.'),
        disrupting: t('A pull that unsettles favours loosening over order: old arrangements get questioned first, and nothing yet says what would replace them.', 'Otrasy stavajú uvoľnenie pred poriadok: staré usporiadania sa najprv spochybnia a nič zatiaľ nehovorí, čo by ich nahradilo.'),
        redirecting: t('Turning toward a new bearing favours direction over speed: the same life pointed elsewhere, with the old heading no longer taken for granted.', 'Odbočka sa viac stará o nový smer než o rýchlosť: ten istý život namierený inam, so starým smerom, ktorý sa už nepovažuje za samozrejmý.'),
        resolving: t('Resolving pulls favour completion over exploring: what was open gets named and closed, and little is kept in reserve.', 'Uzatváranie sa prikláňa k dokončeniu skôr než ku skúmaniu: čo bolo otvorené, sa pomenuje a zavrie a málo sa necháva v zálohe.'),
        suspended: t('Staying in between favours keeping questions open: nothing is pushed to a conclusion, though nothing moves on yet either.', 'Zotrvávanie v strede ponecháva otázky otvorené: nič sa nenúti do záveru, no zatiaľ sa nič ani nehýbe.'),
    },
    arc: {
        continuation: t('The three cards make one line carried on: the change is less a turning point than a steady direction already under way.', 'Tri karty sa dajú čítať ako jedna pokračujúca línia: zmena je menej zlomovým bodom a viac stálym smerom, ktorý už beží.'),
        escalation: t('Taken in order, a change gathers weight, each step drawing more attention than the one before as the threshold comes closer.', 'Poradie kariet sa dá čítať ako zmena, ktorá naberá váhu: každý krok si pýta viac pozornosti než ten predošlý a prah sa približuje.'),
        interruption: t('Something cuts across the expected course here, and the sequence is about what that interruption shows of the plans that were running.', 'Niečo tu prekríži očakávaný priebeh a poradie je o tom, čo toto prerušenie ukazuje o plánoch, ktoré dovtedy bežali.'),
        'breakdown-to-recovery': t('A structure gives way and something is built again on firmer footing, with what has to be acknowledged lying between the two.', 'Poradie sa dá čítať ako stavba, ktorá povoľuje, a niečo, čo sa znovu stavia na pevnejšom základe; medzi tým leží to, čo treba uznať.'),
        'expansion-to-limit': t('A change opens out and then meets its edge, so the sequence turns on what that edge says about the pace or scope that fits.', 'Zmena sa rozšíri a potom narazí na svoju hranicu, takže poradie sa točí okolo toho, čo táto hranica hovorí o tempe alebo rozsahu, ktorý sedí.'),
        'stasis-to-movement': t('After a long standstill, the sequence shows a first loosening and a first step: little at a time, but no longer fixed.', 'Po dlhom státí sa poradie dá čítať ako prvé uvoľnenie a prvý krok: po troche, ale už nie nehybne.'),
        'conflict-to-integration': t('Two pulls open the sequence, and it moves toward a workable whole: the tension is not erased but given room.', 'Poradie otvárajú dve pohnútky a dá sa čítať ako pohyb k použiteľnému celku: napätie sa nevymaže, dostane priestor.'),
        'opening-to-choice': t('An opening leads to a point where something has to be weighed, and the question is what that weighing rests on.', 'Poradie sa dá čítať ako otvorenie, ktoré vedie k bodu, kde treba niečo zvážiť, a je o tom, o čo sa také zvažovanie opiera.'),
        'holding-to-release': t('What was held tightly begins to loosen: more a hand opening than a door slamming.', 'Poradie sa dá čítať ako uvoľňovanie toho, čo sa držalo pevne: skôr sa otvára dlaň, než búchajú dvere.'),
        'uncertainty-to-clarity': t('Fog about which way to turn thins, and something that can be seen and named takes its place.', 'Poradie sa dá čítať ako hmla o tom, kam odbočiť, ktorá rednie, a niečo, čo sa dá vidieť a pomenovať, nastupuje na jej miesto.'),
        'stability-to-disruption': t('A settled arrangement is shaken, and the sequence asks what the steadiness was really resting on.', 'Usadené usporiadanie sa otrasie a poradie sa pýta, na čom tá stálosť v skutočnosti stála.'),
        redirection: t('The line of a life bends: it does not stop, but it no longer points where it did, and the sequence asks what the bend makes possible.', 'Línia života sa ohýba: nezastavuje sa, ale už nemieri tam, kam predtým, a poradie sa pýta, čo ten ohyb umožňuje.'),
    },
    alignment: {
        aligned: t('The two pulls lean the same way, so this is less about choosing between them and more about noticing what both point toward.', 'Obe pohnútky idú rovnakým smerom, takže nejde ani tak o výber medzi nimi, ako o všimnutie si, kam obe smerujú.'),
        complementary: t('The two pulls differ but fit, each holding something the other lacks, like two halves of one question.', 'Obe pohnútky sa líšia, no zapadajú do seba: každá drží to, čo tej druhej chýba, ako dve polovice jednej otázky.'),
        opposed: t('The two pulls work against each other, and what stands between them shows what the tension has to pass through.', 'Obe pohnútky pôsobia proti sebe a to, čo stojí medzi nimi, ukazuje, čím musí napätie prejsť.'),
        apart: t('The two pulls seem to look at different things altogether, so what joins them may first depend on finding a shared question.', 'Zdá sa, že obe pohnútky sa pozerajú na úplne iné veci, takže to, čo ich spája, môže najprv závisieť od nájdenia spoločnej otázky.'),
    },
    suit: {
        wands: t('Wands bring momentum to change: the urge to start, the restlessness that pushes past the familiar, and the heat of wanting something different.', 'Palice dávajú zmene rozbeh: nutkanie začať, nepokoj, ktorý tlačí za hranice známeho, a žiar túžby po niečom inom.'),
        cups: t('Cups carry the feeling in a transition: what is missed, what is hoped for, and what the heart asks to keep.', 'Poháre nesú cit pri zmene: čo chýba, v čo sa dúfa a čo si srdce žiada zachovať.'),
        swords: t('Swords speak of thought in change: weighing, naming what is true, and the clarity or the circling that can come with a decision.', 'Meče hovoria o myslení pri zmene: zvažovanie, pomenovanie toho, čo je pravda, a jasnosť či krúženie myšlienok, ktoré môžu sprevádzať rozhodovanie.'),
        pentacles: t('Pentacles ground change in the practical: time, routines, what is in hand and what the body and the calendar can actually carry.', 'Mince zakotvujú zmenu v praktickom: čas, zvyky, to, čo je po ruke, a čo dokáže uniesť telo a kalendár.'),
    },
    strained: {
        stage: {
            'sets-something-beginning': t('A start under strain tends to come tangled with doubt: the first step feels either too risky or too small to rely on, and the familiar pulls hard.', 'Začiatok v napätí je zapletený s pochybnosťou: prvý krok sa zdá buď príliš riskantný, alebo príliš malý na to, aby sa naň dalo spoľahnúť, a známe láka silnejšie.'),
            'sustains-an-effort': t('Effort under strain wears thin: the same small tasks get heavier each day, and the middle of a change can seem to have no visible end.', 'Keď to ide ťažko, úsilie sa pretiera: tie isté drobnosti sú každý deň ťažšie a stredná časť zmeny sa môže zdať bez viditeľného konca.'),
            'holds-still': t('Stillness under strain is less a landing than a freeze: staying put because every direction looks costly, with the pause feeling tight rather than restful.', 'Pri záťaži státie nie je odpočívadlo, ale skôr stuhnutie: zostáva sa na mieste, lebo každý smer vyzerá nákladne, a pauza je napätá, nie oddychová.'),
            'stands-at-full-extent': t('A change fully arrived and under strain shows its cost in plain view: what was lost is as visible as what was gained, and carrying it asks more than expected.', 'Zmena, ktorá dorazila a ide ťažko, ukazuje svoju cenu otvorene: čo sa stratilo, je vidieť rovnako ako to, čo sa získalo, a niesť to je náročnejšie, než sa čakalo.'),
            'is-mid-transition': t('Mid-transition under strain feels like a swaying bridge: the old bank is out of reach, the new one not yet firm, and footing has to be found step by step.', 'Byť uprostred prechodu v napätí pripomína hojdavý most: starý breh je mimo dosahu, nový ešte nie je pevný a oporu treba hľadať krok za krokom.'),
            'is-being-broken-into': t('A break under strain arrives fast and without warning: routines scatter, and keeping the day upright takes unusual effort for a while.', 'Zlom, ktorý zasiahne tvrdo, prichádza rýchlo a bez varovania: zabehnuté veci sa rozsypú a udržať deň na nohách si chvíľu vyžaduje zvláštne úsilie.'),
            'is-letting-go': t('Letting go under strain is closer to being wrenched than to setting down: a role, a plan or a picture torn away, with grief or resistance close by.', 'Pustenie, ktoré ide ťažko, je skôr vytrhnutie než odloženie: rola, plán alebo predstava sa odtrhávajú a blízko je smútok alebo odpor.'),
            'is-coming-together': t('Coming together under strain is uneven: the pieces of a change are meeting but do not yet fit, and the seams show where old and new rub.', 'Spájanie pri záťaži je nerovné: časti zmeny sa stretávajú, ale ešte do seba nezapadajú, a švy je vidieť tam, kde sa staré a nové trie.'),
        },
        stance: {
            continue: t('Continuing under strain can look like carrying on from habit or duty: the course is kept because stopping is hard to face, not because it still fits.', 'Pokračovanie v napätí môže vyzerať ako vlečenie sa zo zvyku alebo z povinnosti: začaté sa drží preto, že je ťažké zastaviť, nie preto, že by to ešte sedelo.'),
            redirect: t('A forced turn changes direction in haste or under pressure, before it is clear what the old direction gave or what the new one needs.', 'Vynútená odbočka mení smer narýchlo alebo pod nátlakom, skôr než je jasné, čo dávalo starý smer a čo potrebuje nový.'),
            'let-go': t('Forced release takes or surrenders something before there has been time to look at it, so the hand is wrenched open rather than opened.', 'Vynútené pustenie berie alebo vzdáva niečo skôr, než bol čas sa na to pozrieť, takže dlaň sa skôr vykrúca, než otvára.'),
            moderate: t('Moderation under strain can turn into holding back too far: slowing a change until it stalls, or trimming it until little of it is left.', 'Miernosť pri záťaži sa môže zmeniť na príliš silné brzdenie: zmena sa spomalí tak, že sa zastaví, alebo sa zredukuje, až z nej ostane máločo.'),
            'meet-it': t('Facing a change head-on is hard to bear under strain: the change at full size, the unease large, and no picture yet of how it could settle.', 'Keď to ide ťažko, čeliť zmene priamo je namáhavé: zmena v plnej veľkosti, nepokoj veľký a zatiaľ žiadna predstava, ako by sa to mohlo usadiť.'),
            wait: t('Waiting under strain is tense rather than restful: a pause kept because no step is possible yet, with the open question growing louder in the quiet.', 'Čakanie v napätí je skôr stiesnené než pokojné: pauza, ktorá trvá, lebo zatiaľ nie je možný žiadny krok, a otvorená otázka sa v tichu zosilňuje.'),
            choose: t('Choosing under strain feels forced: a decision squeezed by a deadline or by expectation, so that every possibility looks costly.', 'Voľba pri záťaži pôsobí vynútene: rozhodnutie stlačené termínom alebo očakávaniami, takže každá možnosť vyzerá nákladne.'),
            integrate: t('Integration under strain means holding together what does not yet fit: old and new pulling apart, and one picture kept only with effort.', 'Keď to ide ťažko, zjednotenie znamená držať pohromade to, čo ešte nesedí: staré a nové sa trhajú od seba a udržať jeden obraz stojí úsilie.'),
            'attend-to-it': t('Attention under strain is uncomfortable: looking closely at what stirs and resists means meeting the very reactions that had been easier to avoid.', 'Pozornosť v napätí je nepríjemná: pozrieť sa zblízka na to, čo sa hýbe a bráni, znamená stretnúť práve tie reakcie, ktorým sa dalo ľahšie vyhýbať.'),
        },
        trend: {
            expanding: t('Too much opening at once: so many possibilities that none gets a proper look, and the widening feels more like scatter than room.', 'Otvára sa príliš veľa naraz: toľko možností, že ani jedna nedostane poriadny pohľad, a rozširovanie pôsobí skôr ako rozptyl než ako priestor.'),
            contracting: t('It can also feel like a narrowing: options falling away faster than they can be weighed, a smaller circle that feels closed in rather than chosen.', 'Zúženie sa stiahlo príliš: možnosti odpadávajú rýchlejšie, než sa dajú zvážiť, a menší okruh pôsobí skôr uzavreto než zvolene.'),
            stabilising: t('Steadiness that hardens into standstill: routines hold only because nothing is allowed to move, and the new footing rests on avoiding the change.', 'Stálosť tuhne v zastavenie: zvyky držia len preto, že sa nesmie nič pohnúť, a nový základ stojí na vyhýbaní sa zmene.'),
            disrupting: t('Upheaval arriving faster than it can be absorbed: arrangements loosen before anything is ready to replace them, leaving little firm ground meanwhile.', 'Otrasy prichádzajú rýchlejšie, než sa dajú vstrebať: usporiadania sa uvoľňujú skôr, než je čím ich nahradiť, a medzitým je málo pevnej pôdy.'),
            redirecting: t('A turn made abruptly or under pressure: the old bearing dropped before the new one is clear, so the direction feels forced rather than found.', 'Odbočka sa robí náhle alebo v zhone: starý smer sa opustí skôr, než je jasný nový, takže smerovanie pôsobí vynútene, nie nájdené.'),
            resolving: t('Closure that is rushed or forced: a loose end cut rather than tied, a question shut before it has been fully heard.', 'Uzavretie sa unáhli alebo vynúti: voľný koniec sa skôr odreže, než zaviaže, a otázka sa zatvorí skôr, než bola celá vypočutá.'),
            suspended: t('A wait that has run past its use: the question held open by inertia rather than by choice, the in-between starting to feel like a place to get stuck.', 'Čakanie trvá dlhšie, než je užitočné: otázka zostáva otvorená skôr zo zotrvačnosti než z rozhodnutia a medzidobie začína pripomínať miesto, kde sa uviazne.'),
        },
    },
    majorWeight: t('Major cards in the lead suggest a theme that matters more than a passing adjustment.', 'Ak v trojici prevládajú Veľké arkány, ide o viac než o prechodnú úpravu: dotýka sa to niečoho trvalého v tom, ako sa život uberá.'),
    weighing: t('Two pulls are held side by side, one toward the known and one toward something new. Each protects something, and a tension like this tends to ease when what each one guards is seen, not when one simply wins.', 'Keď sú vedľa seba dve pohnútky, či už k známemu, alebo k novému, každá z nich niečo chráni. Takéto napätie sa zvykne uvoľniť nie víťazstvom jednej, ale tým, že je vidieť, čo ktorá stráži.'),
    layers: t('A transition has three layers at once: what is practically in motion, what is felt about it and what it means underneath, and any one of them tends to be thinner read alone.', 'Zmena má naraz tri vrstvy: čo sa prakticky hýbe, čo sa pri tom cíti a čo to znamená v hĺbke. Čítaná osamote býva každá z nich chudobnejšia.'),
};
const crossroads = {
    id: 'life-changes.crossroads',
    areaId: 'life-changes',
    label: t('Understand my current crossroads', 'Pochopiť moje aktuálne rázcestie'),
    focus: t('Hold in mind the two directions in front of you, and what each one seems to hold.', 'Maj na mysli dva smery pred sebou a to, čo sa v každom z nich zdá byť.'),
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
                steady: t('This path honestly offers something: the part of life it would feed, and what it would ask you to bring along.', 'Tu ide o to, čo táto cesta naozaj ponúka: o tú časť života, ktorú by živila, a o to, čo si žiada niesť so sebou.'),
                strained: t('Under strain, this path turns hard to look at squarely: a cost that is easy to overlook, or a pull stronger than it can explain.', 'V napätí sa na túto cestu ťažko pozerá priamo: cena, ktorú je ľahké prehliadnuť, alebo príťažlivosť silnejšia, než dokáže vysvetliť.'),
            } },
        { label: t('The second path', 'Druhá cesta'),
            ask: t('What this path holds, looked at as fairly as the first, with no ranking implied.', 'Čo obsahuje táto cesta, keď sa na ňu pozrieš rovnako spravodlivo ako na prvú, bez náznaku poradia.'),
            frame: {
                steady: t('The other path is seen on its own terms: what it keeps alive, neither the lesser nor the greater of the two.', 'Na tomto mieste sa druhá cesta vidí sama osebe, podľa toho, čo udržiava nažive, nie ako menšia či väčšia z dvoch.'),
                strained: t('Unease gathers around the other path as well: what feels unfinished or unproven in it, and what taking it seriously would ask.', 'Nepokoj sa zbiera aj okolo druhej cesty: čo sa na nej zdá nedokončené či neoverené a čo žiada brať ju vážne.'),
            } },
        { label: t('What the choice turns on', 'Na čom voľba stojí'),
            ask: t('The consideration that decides between the two, named as a criterion and not as a winner.', 'Hľadisko, podľa ktorého sa medzi nimi rozlišuje, pomenované ako kritérium, nie ako víťaz.'),
            frame: {
                steady: t('What sorts the two paths without ranking them is a value, a need or a limit that can be named.', 'Hodnota, potreba alebo hranica, ktorú sa dá pomenovať: práve tá roztrieďuje obe cesty bez toho, aby ich zoradila.'),
                strained: t('When the criterion is blurred or contested, values pull against each other, and what the choice turns on is itself unsettled.', 'Keď je kritérium rozmazané alebo sporné, hodnoty sa dostávajú do sporu a aj to, na čom voľba stojí, je neusadené.'),
            } },
    ],
    opening: t('This reading looks at a crossroads you are standing at. The first card is one path and what it holds, the second the other path, read as evenly, and the third what the choice turns on. It does not pick a path: it shows what each holds and what the decision rests on.', 'Toto čítanie sa pozerá na rázcestie, na ktorom stojíš. Prvá karta je jedna cesta a to, čo v nej je, druhá druhá cesta, čítaná rovnako spravodlivo, a tretia to, na čom voľba stojí. Žiadnu cestu nevyberá: ukazuje, čo každá obsahuje a o čo sa rozhodnutie opiera.'),
    takeaway: {
        act: t('Make the choice smaller before making it: write down what each path would ask of an ordinary week, and read both lists side by side.', 'Zmenši voľbu skôr, než ju urobíš: napíš, čo by každá cesta žiadala od obyčajného týždňa, a prečítaj oba zoznamy vedľa seba.'),
        ease: t('The choice may need less pressure rather than more: let some time pass, and let what each path holds grow clearer before anything is settled.', 'Voľba možno potrebuje menej tlaku, nie viac: nechaj plynúť čas a dovoľ, aby sa ukázalo jasnejšie, čo ktorá cesta obsahuje, skôr než sa čokoľvek uzavrie.'),
        face: t('What deserves a direct look is what each path costs as well as what it offers: name both plainly, for each.', 'Priamy pohľad si zaslúži to, čo každá cesta stojí, rovnako ako to, čo ponúka: pomenuj oboje jasne pri každej.'),
        weave: t('What helps is bringing head and heart into one view: let what you think and what you feel about each path be heard before the criterion is set.', 'Pomáha spojiť hlavu a srdce do jedného pohľadu: nechaj zaznieť, čo o každej ceste myslíš a čo k nej cítiš, skôr než sa určí kritérium.'),
    },
    closings: [
        t('What do you need to know about each path before the choice feels like your own?', 'Čo o každej z ciest potrebuješ vedieť, aby sa ti voľba zdala vlastná?'),
        t('What does each path protect, and what of that is hard for you to lose?', 'Čo každá z ciest chráni a čo z toho je pre teba ťažké stratiť?'),
        t('Which consideration keeps coming back when the two paths are set side by side?', 'Ktoré hľadisko sa stále vracia, keď si obe cesty položíš vedľa seba?'),
    ],
};
const release = {
    id: 'life-changes.release',
    areaId: 'life-changes',
    label: t('Explore what I may need to release', 'Preskúmať, čo možno potrebujem pustiť'),
    focus: t('Hold in mind something you sense you are still carrying from a chapter that has changed.', 'Maj na mysli niečo, o čom tušíš, že to ešte nosíš z kapitoly, ktorá sa zmenila.'),
    semantics: {
        explores: t('what may be worth setting down as a chapter changes, and what keeps it in hand', 'to, čo sa oplatí odložiť, keď sa kapitola mení, a čo to drží v rukách'),
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
            ask: t('How the holding on shows up on the surface: a habit, a plan or a picture that has stayed longer than it served.', 'Ako sa lipnutie ukazuje navonok: zvyk, plán alebo obraz, ktorý zostal dlhšie, než slúžil.'),
            frame: {
                steady: t('Held in plain view, the thing is easy to name: an object, a role or a routine kept for good reasons.', 'Keď je to držané na očiach, dá sa to ľahko pomenovať: vec, rola alebo zvyk zachované z dobrých dôvodov.'),
                strained: t('The hold has gone tight: a grip that guards the held thing more than it makes use of it.', 'Zovretie stuhlo: stisk, ktorý drženú vec skôr stráži, než ju využíva.'),
            } },
        { label: t('What keeps hold of it', 'Čo to drží'),
            ask: t('What underneath keeps it in place: what it protects, what it stands in for, what it would mean to put it down.', 'Čo pod povrchom to drží na mieste: čo to chráni, čo to zastupuje, čo by znamenalo to odložiť.'),
            frame: {
                steady: t('Underneath, the holding quietly protects something: a sense of belonging, a loyalty, a memory of who one was.', 'Pod povrchom držanie potichu niečo chráni: pocit príslušnosti, vernosť, spomienku na to, kým človek bol.'),
                strained: t('Fear sits underneath: the worry that letting go leaves a gap nothing fills, or that the past would then count for little.', 'Pod tým sedí strach: obava, že pustenie zanechá medzeru, ktorú nič nezaplní, alebo že minulosť by potom stratila váhu.'),
            } },
        { label: t('A way of setting it down', 'Spôsob, ako to odložiť'),
            ask: t('A stance that speaks to that holding. It asks for a manner of letting go, not for a result.', 'Postoj, ktorý zodpovedá tomu držaniu. Nejde o výsledok, ale o spôsob pustenia.'),
            frame: {
                steady: t('Putting down can be unhurried and respectful of what the thing gave: gentle, partial, at its own pace.', 'Odkladanie môže byť nespechané a ohľaduplné k tomu, čo vec dala: jemné, po častiach, vlastným tempom.'),
                strained: t('Letting go done the hard way, too fast, too bluntly or under outside pressure, makes release feel like loss rather than relief.', 'Ak sa pustenie deje tvrdo, príliš rýchlo, zhurta alebo pri nátlaku zvonka, pôsobí ako strata, nie ako úľava.'),
            } },
    ],
    opening: t('This reading looks at what you may need to release as something changes. The first card is where the holding on shows, the second what underneath keeps it in place, and the third a stance toward setting it down. It reads patterns rather than verdicts: nothing here says that something must be given up.', 'Toto čítanie sa pozerá na to, čo možno potrebuješ pustiť, keď sa niečo mení. Prvá karta je miesto, kde sa lipnutie ukazuje, druhá to, čo ho pod povrchom drží, a tretia postoj k jeho odloženiu. Číta vzorce, nie rozsudky: nič tu nehovorí, že sa niečoho treba vzdať.'),
    takeaway: {
        act: t('One small, concrete act of release is enough: put away one object, close one open loop, or stop rehearsing one old argument.', 'Stačí jeden malý, konkrétny akt pustenia: odložiť jednu vec, uzavrieť jednu otvorenú záležitosť alebo prestať omieľať jeden starý spor.'),
        ease: t('Releasing does not have to be forced: it can come as a loosening, one finger at a time, with room to keep what still matters.', 'Pustenie sa nemusí vynucovať: môže prísť ako uvoľňovanie, prst po prste, s priestorom ponechať si to, na čom ešte záleží.'),
        face: t('What is held deserves to be looked at before it is put down: say what it has given and what it costs to keep carrying it.', 'To, čo sa drží, si zaslúži pohľad skôr, než sa odloží: povedať, čo dalo a čo stojí jeho ďalšie nosenie.'),
        weave: t('It may help to honour what the old thing gave while accepting that its season has turned, so that thanks and release can arrive together.', 'Môže pomôcť uznať, čo staré dalo, a zároveň prijať, že jeho obdobie sa skončilo, aby vďaka a pustenie mohli prísť spolu.'),
    },
    closings: [
        t('What would be lighter to carry if it were set down, and what from it is worth keeping?', 'Čo by bolo ľahšie niesť, keby sa to odložilo, a čo z toho stojí za zachovanie?'),
        t('What has the thing you are holding been protecting, and does that still need protecting?', 'Čo to, čo držíš, doteraz chránilo, a potrebuje to ešte ochranu?'),
        t('What would a gentler way of setting it down look like?', 'Aký by bol jemnejší spôsob, ako to odložiť?'),
    ],
};
const resources = {
    id: 'life-changes.resources',
    areaId: 'life-changes',
    label: t('Recognize my available resources', 'Rozpoznať zdroje, ktoré mám k dispozícii'),
    focus: t('Hold in mind a change you are facing and what you have to meet it with.', 'Maj na mysli zmenu, ktorej čelíš, a to, čo máš na ňu k dispozícii.'),
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
                steady: t('What has already proved itself shows here: skills, steadiness or experience that have carried through earlier changes.', 'Ukazuje sa tu, čo sa už osvedčilo: schopnosti, vyrovnanosť alebo skúsenosť, ktoré už prenášali cez predošlé zmeny.'),
                strained: t('Something carried so long it is hard to see as strength: a resource that feels worn, overstretched or taken for granted.', 'Zdroj pôsobí opotrebovane, preťažene alebo samozrejme: je nesený tak dlho, že sa ťažko vníma ako sila.'),
            } },
        { label: t('What else is within reach', 'Čo je ešte na dosah'),
            ask: t('What is available beyond what you already carry: a support, a habit, a pause, a place to stand.', 'Čo je k dispozícii okrem toho, čo už nosíš: opora, zvyk, oddych, miesto, kde sa dá stáť.'),
            frame: {
                steady: t('Help sits just outside the usual here: a source of support, rest or perspective that is reachable but not yet used.', 'Tesne za hranicou zvyčajného je pomoc: opora, odpočinok alebo nadhľad, ktoré sú na dosah, no zatiaľ nevyužité.'),
                strained: t('Support exists but feels out of reach, uncertain or awkward to ask for, and getting to it costs effort or pride.', 'Opora existuje, ale pôsobí nedosiahnuteľne, neisto alebo sa o ňu nepríjemne pýta, a dostať sa k nej stojí námahu či hrdosť.'),
            } },
        { label: t('Where to put it to use', 'Kde to využiť'),
            ask: t('The part of the transition where these could be put to work, as a direction to try and not a plan.', 'Časť zmeny, kde by sa to dalo uplatniť: smer na vyskúšanie, nie plán.'),
            frame: {
                steady: t('At this point a strength finds its task, where what is available meets what is needed.', 'V tomto bode nachádza sila svoju úlohu: tam, kde sa to, čo je k dispozícii, stretáva s tým, čo treba.'),
                strained: t('Strength and task do not quite match: a resource used where it does not fit, or spread too thin across too many fronts.', 'Sila a úloha sa celkom nezhodujú: zdroj použitý tam, kde nesedí, alebo rozotretý na príliš veľa miest.'),
            } },
    ],
    opening: t('This reading looks at the resources you have for a change. The first card is what you already carry into it, the second what else lies within reach, and the third where those strengths could be put to use.', 'Toto čítanie sa pozerá na zdroje, ktoré máš pre jednu zo svojich zmien. Prvá karta je to, čo do nej už nesieš, druhá to, čo je okrem toho na dosah, a tretia miesto, kde by sa tieto silné stránky dali využiť.'),
    takeaway: {
        act: t('Put one of these resources to work in a small, ordinary way, and notice how the change responds to it.', 'Použi jeden z týchto zdrojov malým, obyčajným spôsobom a všímaj si, ako naň zmena reaguje.'),
        ease: t('Resources are also rest and margin: leave a little room around the change, so that what you carry is not used up all at once.', 'Zdrojom je aj oddych a rezerva: nechaj okolo zmeny trochu priestoru, aby sa to, čo nosíš, nevyčerpalo naraz.'),
        face: t('It helps to take stock plainly: list what is actually available, including what is smaller or thinner than hoped.', 'Pomáha spraviť si prehľad: vypísať, čo je naozaj po ruke, aj to, čo je menšie či slabšie, než sa dúfalo.'),
        weave: t('What helps is seeing how your strengths fit together, so that skill, support and steadiness meet the change as one whole.', 'Pomáha vidieť, ako do seba silné stránky zapadajú, aby schopnosť, opora a vyrovnanosť stretli zmenu ako jeden celok.'),
    },
    closings: [
        t('Which of your own resources do you treat as ordinary, though they carry a good deal of weight?', 'Ktoré z tvojich zdrojov berieš ako samozrejmosť, hoci nesú veľa váhy?'),
        t('What has already carried you through a change before, and is it still within reach?', 'Čo ťa už raz prenieslo cez zmenu a je to stále na dosah?'),
        t('Who or what, besides your own effort, belongs on the list of what you have?', 'Kto alebo čo okrem tvojho vlastného úsilia patrí na zoznam toho, čo máš?'),
    ],
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
                steady: t('The ground as it is comes into view: what has already shifted, what is settled and what is still open.', 'Do výhľadu prichádza pôda taká, aká je: čo sa už pohlo, čo je usadené a čo je ešte otvorené.'),
                strained: t('Urgency, tiredness or crowding press on the situation, leaving too much at once to see clearly where the floor holds.', 'Naliehavosť, únava alebo tlačenica doliehajú na situáciu, takže je príliš veľa naraz na to, aby bolo jasne vidieť, kde podlaha drží.'),
            } },
        { label: t('A fitting response', 'Vhodná odpoveď'),
            ask: t('A way of responding that suits the situation as it stands: small, ordinary and within your own reach.', 'Spôsob reakcie, ktorý sedí k situácii takej, aká je: malý, obyčajný a v tvojom dosahu.'),
            frame: {
                steady: t('A response in proportion to the situation: modest in size, close at hand and in keeping with what is true now.', 'Odpoveď je primeraná situácii: skromná veľkosťou, po ruke a v súlade s tým, čo platí teraz.'),
                strained: t('Out of proportion, the response is too large, too hasty or too guarded for what the situation calls for.', 'Neprimeraná odpoveď je príliš veľká, príliš unáhlená alebo príliš opatrná na to, čo situácia vyžaduje.'),
            } },
        { label: t('Where that response tends to lead', 'Kam taká odpoveď zvykne viesť'),
            ask: t('The direction such a response tends to open, offered as a tendency and never as a promise.', 'Smer, ktorý takáto odpoveď zvykne otvárať, ako tendencia, nie sľub.'),
            frame: {
                steady: t('Such a response opens a heading held loosely rather than a destination.', 'Skôr smer držaný voľne než cieľ: taký druh smerovania takáto odpoveď otvára.'),
                strained: t('Doubt follows the response: whether it leads anywhere, and the pull to drop it before it has had room to show anything.', 'Za odpoveďou prichádza pochybnosť: či vôbec niekam vedie, a pokušenie ju opustiť skôr, než dostane priestor niečo ukázať.'),
            } },
    ],
    opening: t('This reading looks at how to move forward through a change. The first card is the situation as it stands, the second a response that fits it, and the third the direction such a response tends to open. It names a tendency, not a promise.', 'Toto čítanie sa pozerá na to, ako ísť ďalej cez zmenu. Prvá karta je situácia taká, aká je, druhá odpoveď, ktorá jej sedí, a tretia smer, ktorý takáto odpoveď zvykne otvárať. Pomenúva tendenciu, nie sľub.'),
    takeaway: {
        act: t('The next step is small and ordinary: one conversation, one list, one hour set aside, whichever the situation actually calls for.', 'Ďalší krok je malý a obyčajný: jeden rozhovor, jeden zoznam, jedna vyhradená hodina, podľa toho, čo situácia skutočne vyžaduje.'),
        ease: t('Moving forward may mean moving less: lower the pace, put aside what is not needed for now, and let the next step show itself.', 'Ísť ďalej môže znamenať hýbať sa menej: spomaliť, odložiť to, čo teraz netreba, a nechať ďalší krok, aby sa ukázal sám.'),
        face: t('The way forward begins with looking squarely at where things stand, and saying it plainly before choosing any step.', 'Cesta ďalej začína priamym pohľadom na to, ako veci stoja, a jasným pomenovaním skôr, než sa vyberie akýkoľvek krok.'),
        weave: t('It may help to let the step fit the whole picture: what is practical, what is felt and what matters, in one small move.', 'Môže pomôcť nechať krok zapadnúť do celého obrazu: čo je praktické, čo sa cíti a na čom záleží, v jednom malom pohybe.'),
    },
    closings: [
        t('What is the smallest step that would still feel like your own?', 'Aký najmenší krok by ti ešte pripadal vlastný?'),
        t('What does the situation need in order to be seen plainly, before any step is chosen?', 'Čo situácia potrebuje, aby bola videná jasne, skôr než sa vyberie akýkoľvek krok?'),
        t('What would a step in proportion to the situation look like, neither larger nor smaller?', 'Ako by vyzeral krok primeraný situácii, ani väčší, ani menší?'),
    ],
};
export const LIFE_CHANGES_AREA = {
    id: 'life-changes',
    label: t('Life Changes & Decisions', 'Životné zmeny a rozhodnutia'),
    blurb: t('Crossroads, endings, beginnings and the stretch between them.', 'Rázcestia, konce, začiatky a obdobie medzi nimi.'),
    scope: t('thresholds and transitions in general', 'prahy a prechody vo všeobecnosti'),
    intentions: [crossroads, release, resources, forward],
    lens,
};
