/**
 * FINANCES & STABILITY - how a person RELATES to money, security and resources.
 *
 * This area owns the attitude: what security means, which priorities pull, how uncertainty feels, which everyday habits shape
 * the sense of ground. It does not own job satisfaction or career direction (Work & Career). It is the most sensitive area, so
 * it is symbolic and reflective only: no advice, no amounts, no instruments, no outcomes. The reading helps a person SEE how
 * they stand toward money; it never says what to do with any of it.
 *
 * Every lens sentence describes what a stage, a stance or a pull tends to LOOK or FEEL like. None of them tells a person to do
 * anything, and none of them names a task: the images are images of feeling and noticing.
 */
const t = (en, sk) => ({ en, sk });
const lens = {
    stage: {
        'sets-something-beginning': [
            t('Around money, a beginning is often small and felt before it is named: a flicker of curiosity about where things stand, a little less avoidance than before.', 'Pri peniazoch býva začiatok malý a skôr pocítený než pomenovaný: záblesk zvedavosti, ako veci stoja, a o čosi menej vyhýbania sa než predtým.'),
            t('A new relationship with security can begin as a quiet change of attitude: a wish to see how things actually stand, without dread and without pretending.', 'Nový vzťah k istote môže začať tichou zmenou postoja: túžbou vidieť, ako veci naozaj stoja, bez strachu a bez predstierania.'),
        ],
        'sustains-an-effort': [
            t('Stability tends to be made of repetition: the same small things kept up quietly, long before anyone would think to notice them.', 'Stabilita sa zvykne skladať z opakovania: z tých istých drobností, držaných potichu dlho predtým, než si ich niekto všimne.'),
            t('Security is often held by rhythm more than by any single moment: the mail opened in its own time, the envelope in its usual place.', 'Istotu často drží skôr rytmus než nejaký jednotlivý okamih: pošta otvorená vo svojom čase, obálka na zvyčajnom mieste.'),
        ],
        'holds-still': [
            t('When money matters hold still, it can be the calm of enough, or a standstill in which something needed has quietly stopped moving.', 'Keď sa veci okolo peňazí zastavia, môže to byť pokoj z dostatku, alebo stagnácia, v ktorej sa niečo potrebné potichu prestalo hýbať.'),
            t('A pause around security can be a resting place or a held breath, and what tells the two apart is often whether the pause was chosen.', 'Pauza okolo istoty môže byť odpočívadlo alebo zadržaný dych a rozlišuje ich často to, či bola pauza zvolená.'),
        ],
        'stands-at-full-extent': [
            t('A financial situation seen in full is simply visible: what feels comfortable and what feels stretched, both in plain light.', 'Finančná situácia videná v celku je jednoducho viditeľná: čo je pohodlné a čo napäté, oboje na jasnom svetle.'),
            t('When the matter of security has reached its fullest, its real shape can show, sometimes more generous and sometimes more modest than the worry around it.', 'Keď sa téma istoty ukáže celá, môže byť vidieť jej skutočný tvar, niekedy štedrejší, inokedy skromnejší než starosť okolo nej.'),
        ],
        'is-mid-transition': [
            t('Between one footing and the next, money can feel unsettled: the old habits no longer fit and the new ones are not yet familiar.', 'Medzi jednou oporou a ďalšou môže byť okolo peňazí neusadene: staré zvyky už nesedia a nové ešte nie sú známe.'),
            t('A shift in how security is understood often feels like standing between two rooms, one door closing softly and the other not yet fully open.', 'Posun v chápaní istoty často pripomína státie medzi dvoma miestnosťami: jedny dvere sa potichu zatvárajú a druhé ešte nie sú celkom otvorené.'),
        ],
        'is-being-broken-into': [
            t('When something abrupt cuts into the picture (a surprise, a gap, a plan that stops holding), it can show what the sense of safety was resting on.', 'Keď do obrazu vstúpi niečo prudké (prekvapenie, medzera, plán, ktorý prestane držať), môže sa ukázať, na čom stál pocit bezpečia.'),
            t('A shock around security tends to bring unexamined assumptions into view: what was taken as a cushion, and what it was expected to cover.', 'Otras okolo istoty zvykne vyniesť na svetlo neskúmané predpoklady: čo sa považovalo za rezervu a čo sa od nej očakávalo.'),
        ],
        'is-letting-go': [
            t('Letting go around money can look like loosening an old fear, a rule absorbed long ago, or a picture of what enough must look like.', 'Pustenie okolo peňazí môže vyzerať ako uvoľnenie starého strachu, pravidla prevzatého kdesi dávno alebo predstavy, ako musí vyzerať dostatok.'),
            t('What is being put down is often a story about money (what it proves, what it protects against) more than any object or account.', 'Odkladá sa často príbeh o peniazoch (čo dokazujú, pred čím chránia) viac než nejaká vec či účet.'),
        ],
        'is-coming-together': [
            t('Where things come together, caution and generosity, need and wish, stop quarrelling and begin to share one table.', 'Tam, kde sa veci spájajú, opatrnosť a štedrosť, potreba a túžba prestávajú sa škriepiť a začínajú sedieť za jedným stolom.'),
            t('Stability tends to deepen when the practical and the felt agree: what is done with resources matches what is quietly valued.', 'Stabilita sa zvykne prehlbovať, keď sa praktické a citové zhodujú: to, čo sa s prostriedkami robí, zodpovedá tomu, čo sa potichu cení.'),
        ],
    },
    stance: {
        continue: [
            t('Continuing, around money, often feels like leaning on a rhythm that has been there a long time: little needs arguing, and the quiet itself can be a comfort.', 'Pokračovanie pri peniazoch často pripomína opieranie sa o rytmus, ktorý tu je už dlho: málo vecí treba obhajovať a samotné ticho môže byť útechou.'),
            t('A steady run of things can feel like trust in what has held before, and at times like a habit that has stopped being looked at.', 'Ustálený chod vecí môže pôsobiť ako dôvera v to, čo už raz obstálo, a občas aj ako zvyk, na ktorý sa prestalo pozerať.'),
        ],
        redirect: [
            t('A change of angle around money tends to begin in how things are seen: the same situation held up to another light, with a different question beside it.', 'Zmena uhla pohľadu pri peniazoch zvykne začať v tom, ako sa veci vidia: tá istá situácia v inom svetle a s inou otázkou vedľa seba.'),
            t('Turning toward a different course can be quiet and small, more a shift in what is held to matter than a visible change.', 'Obrat k inému smeru môže byť tichý a malý, skôr posun v tom, čo sa pokladá za dôležité, než viditeľná zmena.'),
        ],
        'let-go': [
            t('Letting go here tends to look like setting down a worry that has outlived its reason, a comparison with others, or the wish for perfect certainty.', 'Pustenie tu zvykne vyzerať ako odloženie starosti, ktorá prežila svoj dôvod, porovnávania sa s inými alebo túžby po dokonalej istote.'),
            t('Loosening the grip on an old rule or fear about money can feel like a window opening in a closed room.', 'Uvoľnenie zovretia starého pravidla alebo strachu okolo peňazí môže pripomínať otvorené okno v zatvorenej miestnosti.'),
        ],
        moderate: [
            t('Measure tends to feel like a steadier middle between holding too tightly and holding too loosely, with less alarm and less appetite on either side.', 'Miera sa zvykne cítiť ako pokojnejší stred medzi príliš pevným a príliš voľným držaním, s menším poplachom a menšou chuťou na oboch stranách.'),
            t('Moderation is often a matter of pace and proportion: a calm hand on the dial rather than a swing from one extreme to the other.', 'Miernosť býva vecou tempa a proporcie: pokojná ruka na regulátore namiesto výkyvu z jedného extrému do druhého.'),
        ],
        'meet-it': [
            t('Meeting it tends to feel like facing how things actually stand, after a stretch of managing around it with vagueness or distraction.', 'Stretnutie s tým zvykne pôsobiť ako pohľad na to, ako veci naozaj stoja, po období obchádzania cez nejasnosť či rozptyľovanie.'),
            t('It can feel like a drawer that usually stays shut coming open, and what is inside turning out as large or as small as it is.', 'Môže to pripomínať zásuvku, ktorá zvykne ostať zatvorená, a teraz sa otvorí, pričom sa ukáže, že obsah je taký veľký či malý, aký je.'),
        ],
        wait: [
            t('Waiting around money tends to feel like holding still while something settles, with the restlessness of waiting becoming noticeable.', 'Čakanie pri peniazoch zvykne pripomínať stíšenie, kým sa niečo usadzuje, pričom sa ozve aj nepokoj z čakania.'),
            t('Patience differs from neglect in one way: time is given room to show what is steady before whatever only feels urgent gets its say.', 'Trpezlivosť sa od zanedbávania líši v jednom: čas dostane priestor ukázať, čo je pevné, skôr než prehovorí to, čo sa len zdá naliehavé.'),
        ],
        choose: [
            t('Choosing, here, is less about which option is cleverer and more about which value leads, a question often answered by default before it is asked.', 'Voľba tu býva menej o tom, ktorá možnosť je múdrejšia, a viac o tom, ktorá hodnota vedie, pričom táto otázka sa často vybaví zo zvyku skôr, než sa položí.'),
            t('A choice about what matters enough to hold on to usually starts with naming what feels non-negotiable, which can be quieter and simpler than expected.', 'Voľba o tom, čo je dosť dôležité na udržanie, zvykne začínať pomenovaním toho, čo sa nedá vynechať, a to môže byť tichšie a jednoduchšie, než sa čakalo.'),
        ],
        integrate: [
            t('Bringing the pieces together tends to feel like what is valued, what is done daily and what is feared finally facing the same direction.', 'Spájanie častí zvykne pôsobiť tak, že to, čo sa cení, čo sa robí denne a čoho sa človek bojí, sa napokon obráti rovnakým smerom.'),
            t('Integration around money looks like habits and values describing the same person, with practice no longer arguing with belief.', 'Zjednotenie okolo peňazí vyzerá tak, že zvyky a hodnoty opisujú toho istého človeka a prax sa už nehádá s presvedčením.'),
        ],
        'attend-to-it': [
            t('Attending here tends to mean noticing what it feels like to think about money: where the body tightens, which thoughts repeat, what is steered around.', 'Pozornosť tu zvykne znamenať všímať si, aký je to pocit myslieť na peniaze: kde sa telo stiahne, ktoré myšlienky sa opakujú, čomu sa vyhýba.'),
            t('Attention of this kind is closer to listening than to fixing: a feeling is allowed to be heard before it is explained away.', 'Takáto pozornosť je bližšie k počúvaniu než k opravovaniu: pocit sa nechá vypočuť skôr, než sa vysvetlí.'),
        ],
    },
    trend: {
        expanding: t('A pull like this favours openness and a wider sense of what feels possible; what it may leave aside is the quieter question of what is already enough.', 'Takýto sklon sa prikláňa k otvorenosti a širšiemu pocitu toho, čo sa zdá možné; bokom môže nechať tichšiu otázku, čo je už dosť.'),
        contracting: t('Here the pull is toward caution and the guarding of what is held, which can feel protective, while it may leave out curiosity and the wish to look further.', 'Tu sklon smeruje k opatrnosti a stráženiu toho, čo sa drží, čo môže pôsobiť ochranne, no môže vynechať zvedavosť a túžbu pozrieť sa ďalej.'),
        stabilising: t('What this pull favours is a calmer, more settled feeling toward what is enough; it may be less hospitable to questions that would unsettle that calm.', 'Tento sklon dáva prednosť pokojnejšiemu, usadenejšiemu pocitu voči tomu, čo je dosť; menej priaznivý môže byť otázkam, ktoré by tento pokoj narušili.'),
        disrupting: t('This is a pull that unsettles: it favours loosening what was assumed about security, and it leaves little room for the comfort of familiar arrangements.', 'Je to sklon, ktorý rozkolíše: hľadá uvoľnenie toho, čo sa o istote predpokladalo, a necháva málo miesta pre útechu známych usporiadaní.'),
        redirecting: t('There is a pull to reorder rather than abandon: priorities may be weighed again, while the underlying wish for firm ground stays what it was.', 'Je tu sklon usporiadať nanovo, nie zahodiť: priority sa môžu zvažovať znova, no základná túžba po pevnej pôde ostáva taká, aká bola.'),
        resolving: t('A pull of this kind favours quiet closure, a worry settling or a question feeling answered, though it may pass over what is not yet ready to be closed.', 'Sklon tohto druhu robí miesto tichému uzavretiu, utíšeniu starosti alebo pocitu zodpovedanej otázky, hoci môže obísť to, čo ešte nie je pripravené na uzavretie.'),
        suspended: t('The pull here is toward staying undecided for a while, which keeps things open but also leaves the sense of ground provisional.', 'Sklon tu smeruje k chvíľkovej nerozhodnosti, ktorá ponecháva veci otvorené, ale aj pocit pôdy predbežný.'),
    },
    strained: {
        stage: {
            'sets-something-beginning': t('When a beginning goes hard, it can feel uneasy from the first moment: the first look at where things stand arrives with dread, or is put off again and again.', 'Keď sa začiatok skomplikuje, môže byť nepokojný od prvej chvíle: prvý pohľad na to, ako veci stoja, prichádza so strachom alebo sa znova a znova odkladá.'),
            'sustains-an-effort': t('Under pressure, keeping something up can turn into wearing down: the quiet upkeep of stability starts to feel heavy, thankless, or invisible to everyone else.', 'Keď to ide ťažko, udržiavanie sa môže zmeniť na vyčerpávanie: tiché držanie stability začne byť ťažké, nevďačné a pre okolie neviditeľné.'),
            'holds-still': t('When a standstill goes hard, it can feel like being stuck: nothing around money moves, and the stillness is less rest than a held breath that is hard to release.', 'Keď sa pokoj zvrhne, môže pôsobiť ako uviaznutie: okolo peňazí sa nič nehýbe a ticho je menej odpočinok než zadržaný dych, ktorý sa ťažko vydýchne.'),
            'stands-at-full-extent': t('At its fullest and under strain, the picture can feel overstretched: what is carried seems to weigh more than is comfortable, and it is hard to look away.', 'V plnosti a v napätí môže obraz pôsobiť preťaženo: to, čo sa nesie, váži viac, než je pohodlné, a je ťažké odvrátiť pohľad.'),
            'is-mid-transition': t('When a transition is under strain, it can feel like the old footing gone and the new one not yet there, with an unsteadiness that is hard to put a name to.', 'Prechod v napätí môže byť pocitom, že stará opora zmizla a nová ešte nie je, s neistotou, ktorú je ťažké pomenovať.'),
            'is-being-broken-into': t('When the break is sharp, it can feel like a loss of footing: assumptions about security that were never checked suddenly seem exposed.', 'Keď je zlom ostrý, môže pôsobiť ako strata opory: predpoklady o istote, ktoré nikto neskúmal, sa zrazu zdajú odkryté.'),
            'is-letting-go': t('Letting go under strain can feel less like releasing and more like being stripped of something, a loss arriving before any readiness to put it down.', 'Pustenie, ktoré ide ťažko, môže byť menej uvoľnením a viac pocitom, že sa niečo berie, strata, ktorá prichádza skôr, než je v človeku pripravenosť to odložiť.'),
            'is-coming-together': t('When coming together goes hard, the pieces can feel forced into a single picture, caution and wish pressed side by side before they have agreed.', 'Keď sa spájanie sťaží, súčasti môžu pôsobiť, akoby ich tlačili do jedného obrazu: opatrnosť a túžba sú pritisnuté vedľa seba skôr, než sa dohodli.'),
        },
        stance: {
            continue: t('When continuing is forced, a familiar rhythm can feel like a rut: kept up out of habit or fear of the alternative, and quietly costly.', 'Keď je pokračovanie vynútené, známy rytmus môže pôsobiť ako vyjazdená koľaj: drží sa zo zvyku alebo zo strachu z alternatívy a potichu stojí sily.'),
            redirect: t('When a change of direction is pressed by circumstances, it can feel abrupt: a new angle taken up before there has been time to feel at home in it.', 'Keď okolnosti vynucujú zmenu smeru, môže byť prudká: nový uhol pohľadu treba prijať skôr, než sa v ňom dá cítiť ako doma.'),
            'let-go': t('When letting go is resisted, the grip tends to tighten: the old worry or rule is held harder, as though putting it down would leave nothing in hand.', 'Keď sa pustenie odmieta, zovretie sa zvykne zosilniť: stará starosť či pravidlo sa drží pevnejšie, akoby po jeho odložení nezostalo v ruke nič.'),
            moderate: t('When measure is hard to find, it can swing between holding too tightly and holding too loosely, each extreme feeling safer than the middle.', 'Keď je miera ťažko dosiahnuteľná, môže sa prejaviť ako kolísanie medzi príliš pevným a príliš voľným držaním, pričom každý extrém sa zdá bezpečnejší než stred.'),
            'meet-it': t('When facing the matter is resisted, it can show as avoidance: the shut drawer stays shut, and the not-looking takes up more room than the thing itself might.', 'Keď sa pohľad na vec odmieta, môže sa prejaviť ako vyhýbanie: zatvorená zásuvka ostáva zatvorená a nepozeranie zaberá viac miesta, než by zaberala vec sama.'),
            wait: t('When waiting is forced, it can feel like helpless suspension: time passes, nothing settles, and the urge to react to anything at all grows louder.', 'Keď je čakanie vynútené, môže pôsobiť ako bezmocné zavesenie: čas plynie, nič sa neusadzuje a nutkanie zareagovať na čokoľvek sa zosilňuje.'),
            choose: t('When the choice is pressed, it can feel like a forced pick between values that both matter, with the cost of each felt more sharply than its worth.', 'Keď sa voľba tlačí, môže pôsobiť ako vynútený výber medzi hodnotami, na ktorých záleží obom, pričom cena každej sa cíti ostrejšie než jej hodnota.'),
            integrate: t('When bringing the pieces together is hard, they can seem to belong to different people: what is valued, what is done and what is feared pulling apart.', 'Keď je spájanie ťažké, súčasti môžu pôsobiť, akoby patrili rôznym ľuďom: to, čo sa cení, čo sa robí a čoho sa človek bojí, sa rozchádza.'),
            'attend-to-it': t('When attention is overwhelmed, it can tip from noticing into circling: thoughts about money go round and tighten without settling anywhere.', 'Keď je pozornosť preťažená, môže sa zvrhnúť z všímania do krúženia: myšlienky o peniazoch sa točia dookola, sťahujú sa a nikde neusadia.'),
        },
        trend: {
            expanding: t('A stretching pull under strain favours reaching past what feels solid, and may leave out the quieter question of what is already carried.', 'Sklon, ktorý sa v napätí naťahuje, láka siahať za to, čo sa cíti ako pevné, a môže vynechať tichšiu otázku, čo sa už nesie.'),
            contracting: t('A contracting pull under strain favours guarding what is held; the narrowing can feel like safety while it also shrinks what feels possible.', 'Sklon k uzatváraniu sa pri záťaži smeruje k stráženiu toho, čo sa drží; zúženie môže pôsobiť ako bezpečie, no zároveň zmenšuje to, čo sa zdá možné.'),
            stabilising: t('A pull toward steadiness under strain can harden into rigidity, favouring what is familiar even where it has stopped fitting.', 'Sklon k pevnosti môže v napätí stvrdnúť na strnulosť a lipnúť na známom aj tam, kde už nesedí.'),
            disrupting: t('This pull favours shaking loose what was assumed, which can feel more like unsteadiness than release, with little that feels certain to lean on.', 'Tento sklon uvoľňuje to, čo sa predpokladalo, a to môže byť skôr neistota než úľava, s málom, o čo sa dá s istotou oprieť.'),
            redirecting: t('A pull to turn aside under strain can feel pressed or hurried, favouring another direction while the reasons for it are still unclear.', 'Sklon odbočiť môže pri záťaži pôsobiť naliehavo či unáhlene a hľadá iný smer, kým dôvody preň ešte nie sú jasné.'),
            resolving: t('A pull toward closure under strain can favour ending the discomfort sooner than the matter is ready, leaving some of it unsaid.', 'Sklon k uzavretiu môže, keď to ide ťažko, siahnuť po ukončení nepríjemného pocitu skôr, než je vec pripravená, a časť z nej nechať nevypovedanú.'),
            suspended: t('Under strain, this pull toward suspension can feel like being kept in limbo, with the open question pressing on the sense of ground.', 'V napätí môže sklon k pozastaveniu pôsobiť ako držanie v neistote, pričom otvorená otázka tlačí na pocit pôdy.'),
        },
    },
    arc: {
        continuation: t('Read in order, the cards keep a similar quality from first to last, as if one feeling toward security were being looked at three times from slightly different places.', 'V poradí si karty držia podobnú kvalitu od prvej po poslednú, akoby sa na jeden pocit voči istote pozeralo trikrát z mierne odlišných miest.'),
        escalation: t('The order of the cards gathers weight, each one carrying a little more intensity than the last, the way a worry or an appetite can become harder to ignore.', 'Poradie kariet naberá váhu, každá nesie o niečo viac intenzity než predchádzajúca, tak ako sa obava či túžba dá čoraz ťažšie ignorovať.'),
        interruption: t('The sequence is cut across: a steady rhythm in the first cards is broken by a later one, which brings into focus what that rhythm had been resting on.', 'Poradie sa pretne: stály rytmus prvých kariet naruší neskoršia karta, ktorá zvýrazní, na čom ten rytmus stál.'),
        'breakdown-to-recovery': t('The order moves from strain toward something steadier, with what gave way named first and the feeling of building again coming after it.', 'Poradie sa posúva od napätia k niečomu pevnejšiemu: najprv sa pomenuje, čo povolilo, a až potom prichádza pocit znovu stavať.'),
        'expansion-to-limit': t('The order opens out, with confidence or appetite widening, and then meets an edge, and that edge says something about what feels like enough.', 'Poradie sa rozvíja, dôvera či chuť sa rozširuje a potom narazí na okraj; ten okraj sa dá čítať ako výpoveď o tom, čo sa cíti ako dosť.'),
        'stasis-to-movement': t('The order begins in a held, unchanging pattern and closes with something stirring in how security is felt.', 'Poradie začína ustrnutým, nemenným vzorcom a končí niečím, čo sa v prežívaní istoty začína hýbať.'),
        'conflict-to-integration': t('The order opens with competing needs (caution and desire, comfort now and security later) and closes nearer to a picture in which they sit together.', 'Poradie sa otvára protichodnými potrebami (opatrnosť a túžba, pohodlie dnes a istota neskôr) a končí bližšie k obrazu, v ktorom sedia pospolu.'),
        'opening-to-choice': t('The order starts with something opening in how things are seen and moves toward a point where the question of what matters most is harder to leave aside.', 'Poradie začína otvorením v tom, ako sa veci vidia, a smeruje k bodu, kde sa otázka, čo je najdôležitejšie, ťažšie odkladá.'),
        'holding-to-release': t('The order moves from a tight grip around security toward a looser hold, an image closer to a hand opening than to a lock breaking.', 'Poradie sa posúva od pevného zovretia okolo istoty k voľnejšiemu držaniu, k obrazu bližšiemu otváraniu dlane než lámaniu zámku.'),
        'uncertainty-to-clarity': t('The order moves from a haze about where things stand toward something that can be seen and named more plainly.', 'Poradie sa posúva od hmly okolo toho, ako veci stoja, k niečomu, čo sa dá jasnejšie vidieť a pomenovať.'),
        'stability-to-disruption': t('The order moves from a steady arrangement toward one that is shaken, which raises the question of what the steadiness was made of.', 'Poradie sa posúva od pevného usporiadania k otrasenému, čo vyvoláva otázku, z čoho tá pevnosť pozostávala.'),
        redirection: t('The order bends: the first cards and the last point in different directions, as if one concern about resources were turning toward another way of looking.', 'Poradie sa ohýba: prvé a posledné karty ukazujú rôznymi smermi, akoby sa jedna starosť o zdroje obracala k inému spôsobu pohľadu.'),
    },
    alignment: {
        aligned: t('What is done and what is felt lean the same way here, so the two sides read as one shared sense rather than a conflict to settle.', 'To, čo sa robí, a to, čo sa cíti, sa tu nakláňajú rovnakým smerom, takže sa obe strany čítajú ako jeden spoločný pocit, nie ako spor na urovnanie.'),
        complementary: t('The two sides differ but fit: one supplies caution where the other supplies drive, each covering what the other lacks.', 'Obe strany sa líšia, ale zapadajú: jedna dodáva opatrnosť tam, kde druhá dodáva rozbeh, a každá pokrýva to, čo druhej chýba.'),
        opposed: t('The two sides pull against each other, as need against desire or caution against appetite, and the card between shows what that pull passes through.', 'Obe strany idú proti sebe, ako potreba proti túžbe alebo opatrnosť proti chuti, a karta medzi nimi ukazuje, cez čo ten rozpor prechádza.'),
        apart: t('The two sides seem to look at different things, so what lies between them may first be about finding one thing both can look at.', 'Zdá sa, že obe strany sa pozerajú na rozdielne veci, takže to, čo je medzi nimi, sa môže najprv týkať nájdenia jednej veci, na ktorú sa dá pozerať spoločne.'),
    },
    suit: {
        wands: t('Wands bring drive to the subject of resources: initiative, appetite for more, and a restlessness that wants to move at once.', 'Palice prinášajú do témy zdrojov popud: iniciatívu, chuť na viac a nepokoj, ktorý sa chce hýbať hneď.'),
        cups: t('Cups carry the feeling beneath money: worry, comfort, generosity, and the values that give resources their meaning.', 'Poháre nesú cit pod peniazmi: starosť, pohodlie, štedrosť a hodnoty, ktoré dávajú zdrojom zmysel.'),
        swords: t('Swords speak of thought around security: clear reckoning, uneasy replaying, and the plain words that say how things stand.', 'Meče hovoria o myslení okolo istoty: o jasnom zvažovaní, znepokojenom premieľaní a o prostých slovách, ktoré povedia, ako veci stoja.'),
        pentacles: t('Pentacles ground the subject in the practical: habits, routines, the everyday handling of what is available, and time itself.', 'Mince zakotvujú tému v praktickom: zvyky, rutiny, každodenné zaobchádzanie s tým, čo je k dispozícii, a samotný čas.'),
    },
    majorWeight: t('Major cards in the lead suggest a theme that matters more than the daily handling of money.', 'Keď v čítaní prevládajú Veľké arkány, ide to hlbšie než k bežnému zaobchádzaniu s peniazmi a dotýka sa to niečoho trvalého v tom, ako sa chápe istota a dostatok.'),
    weighing: t('Two pulls around money seldom settle by one simply defeating the other; they tend to feel clearer once both are named plainly and neither is cast as the enemy.', 'Dve pohnútky okolo peňazí (istota a sloboda, opatrnosť a štedrosť) sa málokedy urovnajú tým, že jedna druhú jednoducho porazí; bývajú jasnejšie, keď sa obe pomenujú priamo a ani jedna sa nepovažuje za nepriateľku.'),
    layers: t('Money carries three layers at once: what is done in practice, what is thought and felt about it, and what it is for. The picture tends to feel steadiest when none of them is left out.', 'Pri peniazoch sa prelínajú tri vrstvy: to, čo sa robí v praxi, to, čo sa o nich myslí a cíti, a to, načo slúžia. Obraz býva najpevnejší, keď žiadna z nich nechýba.'),
};
const security = {
    id: 'finances-stability.security',
    areaId: 'finances-stability',
    label: t('Understand my relationship with security', 'Pochopiť môj vzťah k istote'),
    focus: t('Hold in mind what security means to you, and what it feels like when you think about it.', 'Maj na mysli, čo pre teba znamená istota a aký pocit prináša, keď na ňu myslíš.'),
    semantics: {
        explores: t('how you relate to security and what it rests on', 'to, ako sa vzťahuješ k istote a na čom stojí'),
        reflection: 'meaning',
        practical: 'name',
        forbids: ['financial-advice', 'predict-outcome', 'fate-claim', 'life-directive', 'health-claim'],
    },
    spreadId: 'body-mind-spirit',
    category: 'general-reflection',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('The practical side', 'Praktická stránka'),
            ask: t('How security is lived day to day: the routines, objects and arrangements that make up the ground you stand on.', 'Ako sa istota žije každý deň: rutiny, veci a usporiadania, z ktorých sa skladá pôda, na ktorej stojíš.'),
            frame: {
                steady: t('Working well, security lives quietly in ordinary things: the arrangements that make a day feel supported.', 'Pri dobrom chode ide na tomto mieste o istotu, ktorá sa potichu udržiava v obyčajných veciach, v usporiadaniach, vďaka ktorým sa deň cíti podopretý.'),
                strained: t('Under strain, the daily arrangements feel thin or worn, and security seems to take more upkeep than it gives back.', 'Pri záťaži sa každodenné usporiadania cítia tenké či opotrebované a istota akoby vyžadovala viac starostlivosti, než dáva späť.'),
            } },
        { label: t('The inner voice', 'Vnútorný hlas'),
            ask: t('What thinking about security stirs in thought and feeling: the worries, hopes and stories that come with it.', 'Čo myslenie na istotu vyvoláva v mysli a v citoch: starosti, nádeje a príbehy, ktoré ho sprevádzajú.'),
            frame: {
                steady: t('The inner conversation about security is workable: worry and trust are both heard, and neither drowns the other.', 'Toto miesto zvykne niesť zvládnuteľný vnútorný rozhovor s istotou, v ktorom sa počuje starosť aj dôvera a jedna neprekričí druhú.'),
                strained: t('Under strain, thoughts and feelings about security loop, sharpen or go silent, and the inner voice grows loud, harsh or evasive.', 'Myšlienky a pocity o istote, ktoré krúžia, zostrujú sa alebo stíchnu: to zvykne toto miesto niesť v napätí, vnútorný hlas hlasný, tvrdý či vyhýbavý.'),
            } },
        { label: t('What sits underneath', 'Čo je pod povrchom'),
            ask: t('The value or need beneath the whole matter: what security is ultimately for.', 'Hodnota alebo potreba pod celou témou: načo je istota v konečnom dôsledku dobrá.'),
            frame: {
                steady: t('Beneath it all, the value security quietly serves comes into view: rest, belonging, freedom, dignity or care for others.', 'Pod všetkým zvykne vystupovať hodnota či potreba, ktorej istota potichu slúži, či je to oddych, spolupatričnosť, sloboda, dôstojnosť alebo starostlivosť o iných.'),
                strained: t('Under pressure, the need beneath security has gone unmet or unnamed, so the wish for safety carries more than it can hold.', 'Nenaplnená alebo nepomenovaná potreba pod istotou je to, čoho sa toto miesto v napätí zvykne dotýkať, takže túžba po bezpečí nesie viac, než unesie.'),
            } },
    ],
    opening: t('This reading looks at your relationship with security. The first card is the practical side, how security is lived day to day, the second the inner side, what thinking about it stirs in thought and feeling, and the third what sits underneath, the value it serves. It describes an attitude, not a financial position, and gives no advice about money.', 'Toto čítanie sa pozerá na tvoj vzťah k istote. Prvá karta je praktická stránka, ako sa istota žije každý deň, druhá vnútorná stránka, čo myslenie na ňu vyvoláva v mysli a v citoch, a tretia to, čo je pod povrchom, hodnota, ktorej slúži. Opisuje postoj, nie finančnú situáciu, a nedáva žiadne rady o peniazoch.'),
    takeaway: {
        act: t('A plain sentence may be enough to see what security means to you, and whether your daily habits seem to say the same thing.', 'Môže stačiť jedna obyčajná veta, aby bolo vidieť, čo pre teba istota znamená a či to isté akoby hovoria aj tvoje každodenné zvyky.'),
        ease: t('Less vigilance can sometimes show more than more of it: when the alarm grows a little quieter, it becomes visible what remains.', 'Menej bdelosti môže niekedy ukázať viac než jej pribúdanie: keď poplach o niečo stíchne, je vidieť, čo ostáva.'),
        face: t('This reading points to the feeling that sits behind the word security, which can be seen plainly before any plan forms around it.', 'Čítanie ukazuje na pocit, ktorý stojí za slovom istota a ktorý je možné vidieť priamo skôr, než sa okolo neho sformuje akýkoľvek plán.'),
        weave: t('What stands out is bringing the practical, the felt and the valued into one picture, so that what is done daily and what is cared about stop contradicting each other.', 'Vyniká spojenie praktického, pociťovaného a cenného do jedného obrazu, aby sa to, čo sa robí denne, a to, na čom záleží, prestali popierať.'),
    },
    closings: [
        t('What would security feel like to you if it did not need to be proven every day?', 'Aký by to bol pocit istoty, keby ju nebolo treba každý deň dokazovať?'),
        t('Whose voice do you hear when you think about enough, and does it sound like your own?', 'Čí hlas počuješ, keď myslíš na to, čo je dosť, a znie ako tvoj vlastný?'),
        t('What does feeling secure make room for in you, and what does its absence close off?', 'Čomu v tebe pocit istoty robí miesto a čo sa bez neho zatvára?'),
    ],
};
const priorities = {
    id: 'finances-stability.priorities',
    areaId: 'finances-stability',
    label: t('Reflect on financial priorities', 'Zamyslieť sa nad finančnými prioritami'),
    focus: t('Hold in mind two things that both feel important and seem to compete for room.', 'Maj na mysli dve veci, ktoré sú obe dôležité a zdá sa, že súperia o miesto.'),
    semantics: {
        explores: t('two pulls around priorities and what the weighing between them turns on', 'dve pohnútky okolo priorít a to, na čom stojí ich vyvažovanie'),
        reflection: 'weigh',
        practical: 'ask',
        forbids: ['financial-advice', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'option-a-b-guidance',
    category: 'binary-decision',
    guidance: 'reflect',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('The first pull', 'Prvá pohnútka'),
            ask: t('One thing that asks for a place among your priorities, held as a pull and not as a plan.', 'Jedna vec, ktorá si pýta miesto medzi tvojimi prioritami, držaná ako pohnútka, nie ako plán.'),
            frame: {
                steady: t('This pull may be protecting something real, such as security, a promise or peace of mind, even where it is not the loudest claim.', 'Zvyčajne tu ide o to, čo táto pohnútka chce chrániť alebo komu dať priestor, a o to, v akom zmysle sa cíti ako skutočný nárok na pozornosť.'),
                strained: t('When strained, the pull grows loud or anxious and presses for room before its own reason has been heard.', 'Pohnútka, ktorá zosilnela alebo sa vystupňovala a tlačí na priestor skôr, než sa vypočul jej vlastný dôvod, je to, čo toto miesto pri záťaži zvykne ukazovať.'),
            } },
        { label: t('The second pull', 'Druhá pohnútka'),
            ask: t('A different pull that also asks for room, held beside the first and not ranked above it.', 'Odlišná pohnútka, ktorá si tiež pýta miesto, držaná vedľa prvej a nie nad ňou.'),
            frame: {
                steady: t('When things are working, this is another kind of care or want: unlike the first, and just as serious.', 'Iný druh starostlivosti či túžby, nepodobný prvému, no rovnako vážny, tu zvykne sedieť, keď veci fungujú.'),
                strained: t('Here the second pull may be the one that gets less room than it asks for.', 'Druhá pohnútka sa tu, keď to ide ťažko, zvykne cítiť zanedbaná, odsunutá alebo trápna na priznanie, akoby sa musela ospravedlňovať, že chce miesto.'),
            } },
        { label: t('What the weighing turns on', 'Na čom váženie stojí'),
            ask: t('The value or need beneath both pulls, not a verdict on which one is right.', 'Hodnota alebo potreba pod oboma pohnútkami, nie verdikt o tom, ktorá z nich je správna.'),
            frame: {
                steady: t('Beneath both pulls there is shared ground: a value, a need, a way of seeing why each feels worth keeping.', 'Keď tu veci fungujú, zvykne sa ukázať spoločná pôda pod oboma pohnútkami: hodnota, potreba či spôsob videnia, prečo sa každá cíti hodná zachovania.'),
                strained: t('What makes the weighing hard to bear tends to surface: a fear of losing one pull, a demand for a clean answer, a sense that everything costs something.', 'Vynára sa zvyčajne to, čo robí vyvažovanie ťažko znesiteľným: strach zo straty jednej pohnútky, nárok na čistú odpoveď, pocit, že všetko niečo stojí.'),
            } },
    ],
    opening: t('This reading holds two pulls around priorities side by side. The first card is one pull, the second a different one, and the third what the weighing between them turns on. It names no winner and gives no direction about money: it only shows what each pull holds.', 'Toto čítanie drží dve pohnútky okolo priorít vedľa seba. Prvá karta je jedna pohnútka, druhá odlišná a tretia to, na čom stojí vyvažovanie medzi nimi. Nevyhlasuje víťaza a nedáva žiadny pokyn o peniazoch: len ukazuje, čo každá z pohnútok nesie.'),
    takeaway: {
        act: t('Putting each pull into one plain sentence can make visible what each one is protecting, once the two sit side by side.', 'Keď sa každá pohnútka vyjadrí jednou obyčajnou vetou a obe stoja vedľa seba, môže byť vidieť, čo každá z nich chráni.'),
        ease: t('No quick verdict is needed for this to be seen. Both pulls can stay on the table a little longer, and they may soften when neither has to win.', 'Na to, aby sa to dalo vidieť, nie je potrebný rýchly verdikt. Obe pohnútky môžu ešte chvíľu ostať na stole a môžu zmäknúť, keď žiadna z nich nemusí vyhrať.'),
        face: t('The reading points to what each pull is protecting, and to what is lost when either one goes unheard.', 'Čítanie ukazuje na to, čo každá pohnútka chráni, a na to, čo sa stráca, keď sa niektorá prehliada.'),
        weave: t('What stands out is that both pulls can be held together, and that what they have in common may show before how they differ.', 'Vyniká, že obe pohnútky sa dajú držať spolu a že to, čo majú spoločné, sa môže ukázať skôr, než ich rozdiely.'),
    },
    closings: [
        t('What is each of these two pulls trying to keep safe for you?', 'Čo sa každá z týchto dvoch pohnútok snaží pre teba uchrániť?'),
        t('If neither pull had to win, what might they say to each other?', 'Keby ani jedna z pohnútok nemusela vyhrať, čo by jedna druhej povedala?'),
        t('Which of these pulls feels most like your own wish, and which more like something absorbed from somewhere else?', 'Ktorá z týchto pohnútok sa cíti najviac ako tvoja vlastná túžba a ktorá skôr ako niečo prevzaté odinakiaľ?'),
    ],
};
const risk = {
    id: 'finances-stability.risk',
    areaId: 'finances-stability',
    label: t('Explore my attitude toward risk', 'Preskúmať môj postoj k riziku'),
    focus: t('Hold in mind a moment when the ground felt uncertain, and notice how you tend to meet it.', 'Maj na mysli chvíľu, keď bola pôda neistá, a všimni si, ako sa s tým zvykneš stretávať.'),
    semantics: {
        explores: t('how you feel toward uncertainty and what steadies or unsettles you', 'to, ako sa cítiš voči neistote a čo ťa upokojuje alebo vyrušuje'),
        reflection: 'orient',
        practical: 'observe',
        forbids: ['financial-advice', 'predict-outcome', 'fate-claim', 'life-directive', 'health-claim'],
    },
    spreadId: 'support-resistance-key',
    category: 'emotional',
    guidance: 'understand',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('What steadies', 'Čo dáva oporu'),
            ask: t('What helps you feel steady when things are uncertain: a habit, a belief, a kind of support.', 'Čo ti pomáha cítiť pevnú pôdu, keď sú veci neisté: zvyk, presvedčenie, druh opory.'),
            frame: {
                steady: t('What steadies is inner footing that makes uncertainty bearable: a trusted habit, a conviction, a person, or the memory of having coped before.', 'Sem zvykne patriť vnútorná opora, vďaka ktorej je neistota znesiteľná: osvedčený zvyk, presvedčenie, človek či spomienka, že sa to už raz zvládlo.'),
                strained: t('Under strain, support feels shaky or stretched, or steadiness depends on keeping everything under control.', 'Vratká či natiahnutá opora, alebo pevnosť závislá od toho, že všetko ostáva pod kontrolou, je to, čo sa tu v napätí zvykne ukázať.'),
            } },
        { label: t('What makes you hesitate', 'Čo ťa núti váhať'),
            ask: t('What pulls you back when uncertainty rises: a fear, an old experience, a voice of caution.', 'Čo ťa drží späť, keď neistota rastie: strach, stará skúsenosť, hlas opatrnosti.'),
            frame: {
                steady: t('Here hesitation is a form of care: it carries experience and has something sensible to say.', 'Opatrnosť ako forma starostlivosti, váhanie, ktoré nesie skúsenosť a má čo rozumné povedať, je to, čo toto miesto zvykne niesť.'),
                strained: t('Under stress, hesitation hardens into fear or freezing, shaped by an old experience that still speaks in the present tense.', 'Na tomto mieste má váhanie pri záťaži sklon stvrdnúť na strach či zamrznutie, formované starou skúsenosťou, ktorá stále hovorí v prítomnom čase.'),
            } },
        { label: t('What the attitude turns on', 'Na čom postoj stojí'),
            ask: t('The deeper question the attitude turns on: a feeling toward uncertainty, not a judgement about any decision.', 'Hlbšia otázka, na ktorej postoj stojí: cit voči neistote, nie úsudok o nejakom rozhodnutí.'),
            frame: {
                steady: t('Beneath both support and hesitation sits a feeling toward the unknown: trust, curiosity, a need for footing or a wish for room.', 'Pocit voči neznámemu pod oporou aj váhaním (dôvera, zvedavosť, potreba opory, túžba po priestore) je to, čo toto miesto zvykne pomenúvať.'),
                strained: t('Wanting security and wanting freedom can seem to cancel each other out, leaving the feeling toward uncertainty unresolved.', 'Túžba po istote a túžba po slobode sa môžu zdať navzájom rušiť: nevyriešený pocit voči neistote, ktorého sa toto miesto, keď to ide ťažko, zvykne dotýkať.'),
            } },
    ],
    opening: t('This reading looks at your attitude toward risk as a feeling, not a decision. The first card is what steadies you, the second what makes you hesitate, and the third what the attitude turns on. Nothing here weighs any particular choice.', 'Toto čítanie sa pozerá na tvoj postoj k riziku ako na cit, nie ako na rozhodnutie. Prvá karta je to, čo ti dáva oporu, druhá to, čo ťa núti váhať, a tretia to, na čom postoj stojí. Nič tu neposudzuje žiadnu konkrétnu voľbu.'),
    takeaway: {
        act: t('Over a few ordinary days it can be noticed what steadies and what makes for hesitation, and the two can sit side by side without either being judged.', 'Počas niekoľkých obyčajných dní si možno všimnúť, čo dáva oporu a čo núti váhať, a obe môžu stáť vedľa seba bez posudzovania.'),
        ease: t('Caution and openness can both be heard without hurry, and the feeling may settle once neither is argued with.', 'Opatrnosť aj otvorenosť sa dajú vypočuť bez náhlenia a pocit sa môže usadiť, keď sa so žiadnou z nich nehádaš.'),
        face: t('This reading points to the feeling underneath: what uncertainty stirs can be seen directly, before it is judged as courage or fear.', 'Čítanie ukazuje na cit pod povrchom: to, čo neistota vyvoláva, sa dá vidieť priamo skôr, než sa posúdi ako odvaha či strach.'),
        weave: t('What stands out is caution and curiosity standing on the same side, each able to tell the other what it has noticed.', 'Vyniká opatrnosť a zvedavosť stojace na jednej strane, z ktorých každá môže tej druhej povedať, čo si všimla.'),
    },
    closings: [
        t('What does your caution protect, and what might your curiosity be asking for?', 'Čo tvoja opatrnosť chráni a o čo si môže pýtať tvoja zvedavosť?'),
        t('What does uncertainty feel like in your body and in your thoughts, before it is called risk or opportunity?', 'Aký je pocit neistoty v tele a v myšlienkach skôr, než sa nazve rizikom či príležitosťou?'),
        t('Where does your sense of how safe it is not to know first come from?', 'Odkiaľ pochádza tvoj pocit, aké bezpečné je nevedieť?'),
    ],
};
const habits = {
    id: 'finances-stability.habits',
    areaId: 'finances-stability',
    label: t('Recognize habits that affect stability', 'Rozpoznať zvyky, ktoré ovplyvňujú stabilitu'),
    focus: t('Hold in mind an ordinary day with money in it, and the small things done almost without noticing.', 'Maj na mysli obyčajný deň, v ktorom sa objavia peniaze, a drobnosti, ktoré sa robia takmer bez povšimnutia.'),
    semantics: {
        explores: t('which everyday habits shape your sense of stability, in view and out of view', 'ktoré každodenné zvyky formujú tvoj pocit stability, viditeľné aj nepovšimnuté'),
        reflection: 'notice',
        practical: 'observe',
        forbids: ['financial-advice', 'predict-outcome', 'fate-claim', 'life-directive'],
    },
    spreadId: 'blind-spot-view',
    category: 'self-development',
    guidance: 'blind-spot',
    temporal: 'present',
    relationshipType: null,
    places: [
        { label: t('The habit you can see', 'Zvyk, ktorý vidíš'),
            ask: t('An everyday habit around money or security that you already recognise in yourself.', 'Každodenný zvyk okolo peňazí alebo istoty, ktorý už u seba spoznávaš.'),
            frame: {
                steady: t('The habit is familiar and seen without much drama: it gives comfort, order or relief.', 'Obvyklou témou je tu, keď veci fungujú, známy zvyk videný bez veľkej drámy, ktorý dáva pohodlie, poriadok či úľavu.'),
                strained: t('Under pressure the habit is seen but hard to look at kindly, tied to worry, guilt or a sense that it should be different.', 'Keď je to náročné, toto miesto zvykne niesť zvyk, ktorý je vidieť, no ťažko sa naň pozerá láskavo, spojený so starosťou, vinou alebo pocitom, že by mal byť iný.'),
            } },
        { label: t('What may be out of view', 'Čo môže byť mimo zorného poľa'),
            ask: t('A question about a habit that is easy to miss. It is a possibility to hold, not a fact the cards establish.', 'Otázka o zvyku, ktorý sa dá ľahko prehliadnuť. Je to možnosť na držanie, nie fakt, ktorý by karty preukazovali.'),
            frame: {
                steady: t('Something so ordinary it has become background may be at work: a quiet pattern, held as a question rather than a finding.', 'Tému tvorí niečo také obyčajné, že sa to stalo pozadím, tichý a ľahko prehliadnuteľný vzorec: otázka na držanie, nie zistenie.'),
                strained: t('Under pressure, the pattern is kept out of sight for a reason: protected by embarrassment, tiredness or the habit of not asking.', 'Vzorec držaný mimo dohľadu z nejakého dôvodu, chránený rozpakmi, únavou alebo zvykom nepýtať sa, je to, na čo toto miesto v náročnej chvíli zvykne ukazovať.'),
            } },
        { label: t('What noticing would change', 'Čo by zmenilo všímanie'),
            ask: t('What would shift in your sense of ground if the unnoticed habit came into view and could simply be seen.', 'Čo by sa zmenilo v tvojom pocite opory, keby sa nepovšimnutý zvyk dostal do zorného poľa a dal sa jednoducho vidieť.'),
            frame: {
                steady: t('Simply seeing has a lightness to it: a familiar routine can feel different once it is no longer unseen.', 'Ľahkosť jednoduchého videnia býva témou tohto miesta: známa rutina sa môže cítiť inak, keď už nie je neviditeľná.'),
                strained: t('Noticing can turn uncomfortable under strain: when a habit is seen clearly, shame, grief or a wish to look away again may come with it.', 'Všímanie môže byť nepríjemné, keď zvyk vidno jasne: s tým môže prísť hanba, smútok alebo túžba znova odvrátiť pohľad.'),
            } },
    ],
    opening: t('This reading looks at the habits that quietly shape your sense of stability. The first card is a habit you can already see, the second what may be out of view (a question to hold, not a finding), and the third what would shift if it were noticed. Habits are observed here, never judged or corrected.', 'Toto čítanie sa pozerá na zvyky, ktoré potichu formujú tvoj pocit stability. Prvá karta je zvyk, ktorý už vidíš, druhá to, čo môže byť mimo zorného poľa (otázka na držanie, nie zistenie), a tretia to, čo by sa zmenilo, keby sa to dostalo do pozornosti. Zvyky sa tu pozorujú, nikdy neposudzujú ani neopravujú.'),
    takeaway: {
        act: t('Noticing can be a small act: watching one ordinary routine around money as it happens, with nothing in it changed, can already be enough to see it.', 'Všímanie si môže mať podobu malého činu: sledovať jednu obyčajnú rutinu okolo peňazí, ako prebieha, bez akejkoľvek zmeny, môže stačiť na to, aby bola vidieť.'),
        ease: t('Noticing does not need effort or a verdict. It can be as light as letting a familiar habit be seen once, with curiosity rather than criticism.', 'Všímanie si nepotrebuje námahu ani verdikt. Môže byť také ľahké ako nechať známy zvyk raz sa ukázať, so zvedavosťou namiesto kritiky.'),
        face: t('A direct look may belong to the habit that feels too ordinary to question. It can be seen kindly, and allowed to be as large or as small as it is.', 'Priamy pohľad si môže zaslúžiť zvyk, ktorý je príliš obyčajný na to, aby sa spochybňoval. Dá sa naň pozrieť láskavo a nechať ho byť taký veľký či malý, aký je.'),
        weave: t('Attention may hold two things together: what a habit gives (comfort, relief, belonging) and what it quietly costs.', 'Pozornosť môže udržať pri sebe dve veci: čo zvyk dáva (útechu, úľavu, pocit spolupatričnosti) a čo ticho stojí.'),
    },
    closings: [
        t('Which small, familiar habit might be telling you something about what you need in order to feel secure?', 'Ktorý malý, známy zvyk ti možno hovorí niečo o tom, čo potrebuješ na pocit istoty?'),
        t('What does a habit you rarely question give you that has little to do with money itself?', 'Čo ti dáva zvyk, ktorý len zriedka spochybňuješ, a čo má s peniazmi samými máločo spoločné?'),
        t('If one ordinary habit could speak plainly, what would it say it has been protecting?', 'Keby jeden obyčajný zvyk mohol prehovoriť priamo, čo by povedal, že chráni?'),
    ],
};
export const FINANCES_AREA = {
    id: 'finances-stability',
    label: t('Finances & Stability', 'Financie a stabilita'),
    blurb: t('How you relate to money, security and what you lean on.', 'Ako sa vzťahuješ k peniazom, istote a veciam, o ktoré sa opieraš.'),
    scope: t('how you relate to money, security and resources', 'to, ako sa vzťahuješ k peniazom, istote a zdrojom'),
    intentions: [security, priorities, risk, habits],
    lens,
};
