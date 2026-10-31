import { activeLocale } from '../../i18n/locale.js?v=53c0693';
const GODS = {
    'direct-resource': {
        family: 'resource',
        shows: 'support you did not have to arrange - teaching, backing, a person who vouches for you',
        polarity: 'conventional and dependable, and slow enough that it can be taken for granted',
    },
    'indirect-resource': {
        family: 'resource',
        shows: 'support from an odd angle - a mentor nobody would have predicted, a discipline learned sideways',
        polarity: 'irregular and sharp, nourishing in a way that also unsettles',
    },
    friend: {
        family: 'peer',
        shows: 'people who work the way you do - allies, colleagues, a share of the same load',
        polarity: 'comfortable and undemanding, which makes it easy to have too much of',
    },
    'rob-wealth': {
        family: 'peer',
        shows: 'a rival who is also an ally - competition close enough to sharpen you and close enough to take from you',
        polarity: 'contested rather than companionable, and more useful than it is pleasant',
    },
    'eating-god': {
        family: 'output',
        shows: 'production that flows - craft, appetite, the thing made because making it was satisfying',
        polarity: 'easy and unforced, and therefore not always pointed anywhere',
    },
    'hurting-officer': {
        family: 'output',
        shows: 'expression with an edge on it - talent that will not defer, brilliance that argues back',
        polarity: 'disobedient by construction, which is where both the originality and the trouble come from',
    },
    'direct-wealth': {
        family: 'wealth',
        shows: 'earned, steady return - the salary, the client who renews, value built by doing the work',
        polarity: 'regular and manageable, and dull enough to be underrated',
    },
    'indirect-wealth': {
        family: 'wealth',
        shows: 'opportunity rather than salary - the deal, the timing, resources that arrive through movement',
        polarity: 'irregular and generous, and it leaves as readily as it comes',
    },
    'direct-officer': {
        family: 'officer',
        shows: 'legitimate authority - rules, offices, responsibility conferred by somebody entitled to confer it',
        polarity: 'negotiable and orderly, the version of pressure that can be reasoned with',
    },
    'seven-killings': {
        family: 'officer',
        shows: 'pressure without negotiation - deadlines, rivals, circumstances that do not care what you intended',
        polarity: 'raw and unmediated, which is why it forges some people and flattens others',
    },
};
/* ------------------------------------------------------------------ English */
const EN = {
    resource: {
        strong: (label, god) => [
            `Your Day Master already has more support than it needs, and that changes what ${label} is `
                + `doing here. It arrives as ${god.shows}, ${god.polarity} - and on a chart this well `
                + `supplied it is not help. The classical reading is that a strong stem given more resource `
                + `becomes comfortable rather than capable: cushioned, slow to be tested, and inclined to `
                + `keep preparing.`,
            `What this chart actually needs is somewhere to spend, so the useful move is to treat the `
                + `support as already sufficient and go looking for the demand. Taking on something that `
                + `will genuinely stretch you does more here than another year of accumulating readiness.`,
        ],
        balanced: (label, god) => [
            `With the Day Master neither outmatched nor dominant, ${label} sits close to its most `
                + `workable form. It arrives as ${god.shows}, ${god.polarity}. Nothing in the chart is `
                + `desperate for it and nothing is drowning in it, which means it functions as ordinary `
                + `backing rather than as a hinge.`,
            `The thing to watch is drift in either direction. On a balanced chart the resource is `
                + `pleasant enough to accumulate without anybody noticing, and enough of it will turn a `
                + `settled position into a slow one.`,
        ],
        weak: (label, god) => [
            `This is the reading that matters most on your chart. Your Day Master is outweighed by its `
                + `season, and ${label} is exactly what a stem in that condition needs: it arrives as `
                + `${god.shows}, ${god.polarity}, and it is what makes the rest of the chart usable.`,
            `In practice that means the support is not a luxury and asking for it is not weakness - it `
                + `is the mechanism. Charts in this condition go wrong most often by trying to operate `
                + `unaided out of pride, and the correction is unglamorous: accept the teaching, keep the `
                + `person who vouches for you, and treat replenishment as part of the work rather than as `
                + `time off from it.`,
        ],
    },
    peer: {
        strong: (label, god) => [
            `On a chart this well supported, ${label} adds to a side that is already the heavier one. `
                + `It arrives as ${god.shows}, ${god.polarity}. More of your own phase on a strong stem is `
                + `not company - it is crowding, and the classical reading is competition for the same `
                + `resource rather than shared load.`,
            `Where that shows is in a persistent friction with people who work the way you do, and in `
                + `resources being divided more often than combined. The chart does better with somebody `
                + `unlike you in the room than with another version of yourself.`,
        ],
        balanced: (label, god) => [
            `${label} sits comfortably on a chart that is neither short nor oversupplied. It arrives as `
                + `${god.shows}, ${god.polarity}, and on a balanced stem that is straightforwardly useful: `
                + `you can work alongside people of your own kind without either leaning on them or `
                + `competing for the same ground.`,
            `The only caution is that this is the easiest kind of company to accumulate without deciding `
                + `to. A circle made entirely of people who operate as you do is very comfortable and tells `
                + `you almost nothing you did not already know.`,
        ],
        weak: (label, god) => [
            `Your Day Master is outweighed by its season, and ${label} is one of the two things that `
                + `answers that. It arrives as ${god.shows}, ${god.polarity} - and on a stem in this `
                + `condition allies are not a preference, they are load-bearing.`,
            `The practical consequence is that this chart does its best work in company and its worst `
                + `alone, and that is a statement about structure rather than about temperament. Choosing `
                + `collaborators deliberately is worth more here than almost any amount of individual `
                + `effort.`,
        ],
    },
    output: {
        strong: (label, god) => [
            `This is where a strong Day Master finds its outlet, and on your chart that matters. `
                + `${label} arrives as ${god.shows}, ${god.polarity}, and a stem with more than it needs is `
                + `precisely the stem that can afford to produce.`,
            `The classical reading is that output is the favourable direction for a chart in this `
                + `condition: it converts surplus into something that exists outside you, which is the one `
                + `thing a strong stem cannot do for itself. Charts like this go wrong by hoarding capacity `
                + `and calling it prudence.`,
        ],
        balanced: (label, god) => [
            `${label} runs at a workable rate on a chart that is neither short nor oversupplied. It `
                + `arrives as ${god.shows}, ${god.polarity}. There is enough behind it to sustain the `
                + `producing and not so much that it has to be produced.`,
            `What decides whether this becomes a body of work is direction rather than capacity. The `
                + `output is available and sustainable; what a balanced chart does not supply is any `
                + `particular urgency about where it ought to go.`,
        ],
        weak: (label, god) => [
            `Here is a real cost on your chart. Your Day Master is outweighed by its season, and output `
                + `is what draws a stem down further - ${label} arrives as ${god.shows}, ${god.polarity}, `
                + `and producing it takes from a reserve that is already short.`,
            `That is a statement about the price rather than about the ability, and the two are `
                + `confused constantly, generally by the person paying. Charts in this condition can `
                + `produce work of real quality and have to arrange the replenishment deliberately, because `
                + `nothing in the structure does it for them. Long unbroken stretches of output are the `
                + `specific thing to avoid.`,
        ],
    },
    wealth: {
        strong: (label, god) => [
            `A strong Day Master can carry wealth, and that is the whole of why this reads well on your `
                + `chart. ${label} arrives as ${god.shows}, ${god.polarity}, and the classical position is `
                + `that a stem with surplus is the one that can hold what it controls without being `
                + `emptied by it.`,
            `The useful consequence is that taking on more here is usually the right call rather than `
                + `the greedy one. The chart is built to manage the size of a thing; what it is not built `
                + `to do is sit still.`,
        ],
        balanced: (label, god) => [
            `${label} sits in proportion on a chart that is neither short nor oversupplied. It arrives `
                + `as ${god.shows}, ${god.polarity}, and a balanced stem can handle what it controls `
                + `without either being exhausted by it or needing it to feel substantial.`,
            `That is the least dramatic position for this god and also the most durable one. What it asks `
                + `for is a decision about scale rather than a defence against it, which is a much easier `
                + `question to answer well.`,
        ],
        weak: (label, god) => [
            `This one is worth understanding rather than pushing through. Your Day Master is outweighed `
                + `by its season, and wealth is something a stem has to be strong enough to hold - ${label} `
                + `arrives as ${god.shows}, ${god.polarity}, and on a chart in this condition it demands `
                + `more than it returns.`,
            `The tradition's phrase for this is a weak stem carrying heavy wealth, and it describes `
                + `effort rather than misfortune: the responsibility, the money, the thing being managed `
                + `all cost more here than they cost somebody with reserves. The workable answer is not `
                + `less ambition but more support around it, which is why resource and allies matter so `
                + `much on this chart.`,
        ],
    },
    officer: {
        strong: (label, god) => [
            `Pressure is what a strong Day Master is actually short of, which is why ${label} reads `
                + `favourably here. It arrives as ${god.shows}, ${god.polarity}, and a stem with surplus is `
                + `the one that benefits from being restrained rather than encouraged.`,
            `The classical reading is that this is what shapes a strong chart: without something that `
                + `will not yield, the surplus stays unformed. Environments with real accountability in `
                + `them do more for this chart than environments that are pleasant to be in.`,
        ],
        balanced: (label, god) => [
            `${label} is proportionate on a chart that is neither short nor oversupplied. It arrives as `
                + `${god.shows}, ${god.polarity}, and a balanced stem meets structure as something to work `
                + `within rather than as either a threat or a rescue.`,
            `What that produces is an unusually normal relationship with authority. You can accept it `
                + `where it is legitimate and decline it where it is not, and neither of those is the `
                + `reflex that fires first.`,
        ],
        weak: (label, god) => [
            `This is the hardest combination on a chart like yours and it is worth naming plainly. Your `
                + `Day Master is outweighed by its season, and ${label} arrives as ${god.shows}, `
                + `${god.polarity} - pressure applied to a stem that is already carrying more than it has.`,
            `The tradition does not read that as doom, and neither should this. It describes a chart `
                + `where demand arrives before capacity, so the sequence matters enormously: support first, `
                + `then the demand. Charts in this condition that go well almost always had somebody or `
                + `something replenishing them through the stretch, and the ones that go badly were `
                + `admired for managing alone.`,
        ],
    },
};
/* ------------------------------------------------------------------- Slovak */
const SK_GODS = {
    'direct-resource': {
        family: 'resource',
        /* Neutral by construction: `nemusel` is a masculine past participle and this
           phrase reaches every reader. A noun phrase says the same thing and needs
           no gender. */
        shows: 'podpora bez vlastného pričinenia — učenie, zázemie, človek, ktorý sa za teba postaví',
        polarity: 'bežná a spoľahlivá, a dosť pomalá na to, aby sa brala ako samozrejmosť',
    },
    'indirect-resource': {
        family: 'resource',
        shows: 'podpora z čudného uhla — mentor, ktorého by nikto nečakal, remeslo naučené bokom',
        polarity: 'nepravidelná a ostrá, živí a zároveň znepokojuje',
    },
    friend: {
        family: 'peer',
        shows: 'ľudia, ktorí pracujú ako ty — spojenci, kolegovia, podiel na tej istej záťaži',
        polarity: 'pohodlná a nenáročná, a preto sa jej ľahko nazbiera priveľa',
    },
    'rob-wealth': {
        family: 'peer',
        shows: 'súper, ktorý je zároveň spojenec — konkurencia dosť blízko na to, aby ťa brúsila aj uberala',
        polarity: 'skôr sporná než družná a užitočnejšia, než je príjemná',
    },
    'eating-god': {
        family: 'output',
        shows: 'tvorba, ktorá plynie — remeslo, chuť, vec urobená preto, že robiť ju bolo dobré',
        polarity: 'ľahká a nenútená, a preto nie vždy niekam namierená',
    },
    'hurting-officer': {
        family: 'output',
        shows: 'prejav s hranou — talent, ktorý sa nepodriadi, brilantnosť, ktorá odvráva',
        polarity: 'neposlušná zo svojej podstaty, a práve odtiaľ pochádza pôvodnosť aj problém',
    },
    'direct-wealth': {
        family: 'wealth',
        shows: 'zarobený, stály výnos — mzda, klient, ktorý predlžuje, hodnota postavená robotou',
        polarity: 'pravidelná a zvládnuteľná a dosť nudná na to, aby sa podceňovala',
    },
    'indirect-wealth': {
        family: 'wealth',
        shows: 'príležitosť namiesto mzdy — obchod, načasovanie, zdroje prichádzajúce pohybom',
        polarity: 'nepravidelná a štedrá, a odchádza rovnako ochotne, ako prišla',
    },
    'direct-officer': {
        family: 'officer',
        shows: 'legitímna autorita — pravidlá, úrady, zodpovednosť zverená niekým, kto na to má právo',
        polarity: 'vyjednateľná a usporiadaná, teda tá podoba tlaku, s ktorou sa dá rozumne hovoriť',
    },
    'seven-killings': {
        family: 'officer',
        shows: 'tlak bez vyjednávania — termíny, súperi, okolnosti, ktorým je jedno, aký bol zámer',
        polarity: 'surová a nesprostredkovaná, a preto jedných kuje a druhých zrovná',
    },
};
const SK = {
    resource: {
        strong: (label, god) => [
            `Tvoj Day Master už má viac podpory, než potrebuje, a to mení, čo tu ${label} robí. `
                + `Prichádza ako ${god.shows} — ${god.polarity} — a na takto zásobenej mape to nie je pomoc. `
                + `Klasické čítanie hovorí, že silný kmeň s ďalšou podporou sa stane pohodlným namiesto `
                + `schopného: vypodložený, dlho neskúšaný a náchylný stále sa pripravovať.`,
            `Táto mapa potrebuje kam míňať, takže užitočným krokom je brať podporu ako už postačujúcu a `
                + `ísť si nájsť nárok. Vziať si niečo, čo ťa naozaj natiahne, spraví tu viac než ďalší rok `
                + `zbierania pripravenosti.`,
        ],
        balanced: (label, god) => [
            `Keď Day Master nie je ani prevážený, ani prevládajúci, ${label} sedí blízko svojej `
                + `najpoužiteľnejšej podoby. Prichádza ako ${god.shows} — ${god.polarity}. Nič v mape po nej `
                + `zúfalo netúži a nič sa v nej neutápa, takže funguje ako bežné zázemie, nie ako os.`,
            `Sledovať treba posun na ktorúkoľvek stranu. Na vyváženej mape sa podpora hromadí dosť `
                + `príjemne na to, aby si to nikto nevšimol, a dosť jej spraví z usadenej polohy pomalú.`,
        ],
        weak: (label, god) => [
            `Toto je čítanie, na ktorom v tvojej mape záleží najviac. Tvoj Day Master preváži jeho `
                + `ročné obdobie a ${label} je presne to, čo kmeň v takom stave potrebuje: prichádza ako `
                + `${god.shows} — ${god.polarity} — a práve to robí zvyšok mapy použiteľným.`,
            `V praxi to znamená, že podpora nie je prepych a pýtať si ju nie je slabosť — je to `
                + `mechanizmus. Mapy v tomto stave sa najčastejšie kazia tým, že sa zo cti snažia fungovať `
                + `bez pomoci, a náprava je nevďačná: prijmi učenie, drž si človeka, ktorý sa za teba `
                + `postaví, a ber dopĺňanie ako súčasť práce, nie ako voľno od nej.`,
        ],
    },
    peer: {
        strong: (label, god) => [
            `Na takto zásobenej mape ${label} pridáva na stranu, ktorá je už aj tak ťažšia. Prichádza `
                + `ako ${god.shows} — ${god.polarity}. Viac vlastnej fázy na silnom kmeni nie je spoločnosť, `
                + `ale tlačenica, a klasické čítanie hovorí skôr o súperení o ten istý zdroj než o zdieľanej `
                + `záťaži.`,
            `Prejaví sa to ako vytrvalé trenie s ľuďmi, ktorí pracujú ako ty, a ako zdroje častejšie `
                + `delené než spájané. Tejto mape svedčí mať v miestnosti niekoho iného než ďalšiu verziu `
                + `seba.`,
        ],
        balanced: (label, god) => [
            `${label} sedí pohodlne na mape, ktorá nie je ani chudobná, ani presýtená. Prichádza ako `
                + `${god.shows} — ${god.polarity} — a na vyváženom kmeni je to jednoducho užitočné: vieš `
                + `pracovať vedľa ľudí svojho druhu bez opierania sa o nich a bez súperenia s nimi `
                + `o tú istú pôdu.`,
            /* Neutral by construction: `čo si nevedel` is a masculine past participle and this
               sentence reaches every reader. The present tense says the same thing and needs
               no gender. */
            `Jediná výstraha je, že takúto spoločnosť je najľahšie nazbierať, a okruh zložený výhradne `
                + `z ľudí, ktorí fungujú ako ty, je veľmi pohodlný a nepovie ti nič, čo už nevieš.`,
        ],
        weak: (label, god) => [
            `Tvoj Day Master preváži jeho ročné obdobie a ${label} je jedna z dvoch vecí, ktoré na to `
                + `odpovedajú. Prichádza ako ${god.shows} — ${god.polarity} — a na kmeni v tomto stave nie `
                + `sú spojenci sklonom, ale nosnou konštrukciou.`,
            `Praktický dôsledok je, že táto mapa odvedie najlepšiu prácu v spoločnosti a najhoršiu `
                + `osamote, a je to výpoveď o štruktúre, nie o povahe. Vyberať si spolupracovníkov zámerne `
                + `tu vynesie viac než takmer akékoľvek množstvo vlastného úsilia.`,
        ],
    },
    output: {
        strong: (label, god) => [
            `Tu si silný Day Master nachádza odvod a v tvojej mape na tom záleží. ${label} prichádza ako `
                + `${god.shows} — ${god.polarity} — a kmeň, ktorý má viac, než potrebuje, je práve ten, `
                + `ktorý si tvorbu môže dovoliť.`,
            `Klasické čítanie hovorí, že výstup je pre mapu v tomto stave priaznivým smerom: mení `
                + `prebytok na niečo, čo existuje mimo teba, a to je jediná vec, ktorú si silný kmeň sám pre `
                + `seba spraviť nevie. Takéto mapy sa kazia tým, že si kapacitu hromadia a hovoria tomu `
                + `opatrnosť.`,
        ],
        balanced: (label, god) => [
            `${label} beží na použiteľnom tempe na mape, ktorá nie je ani chudobná, ani presýtená. `
                + `Prichádza ako ${god.shows} — ${god.polarity}. Za tým je dosť na to, aby sa tvorba udržala, `
                + `a nie toľko, aby sa tvoriť muselo.`,
            `Či z toho vznikne dielo, rozhodne smer, nie kapacita. Výstup je k dispozícii; čo vyvážená `
                + `mapa nedodá, je akákoľvek naliehavosť ohľadom toho, kam pôjde.`,
        ],
        weak: (label, god) => [
            `Tu je v tvojej mape skutočná cena. Tvoj Day Master preváži jeho ročné obdobie a výstup je `
                + `to, čo kmeň ťahá ešte nižšie — ${label} prichádza ako ${god.shows} — ${god.polarity} — a `
                + `tvoriť ho znamená brať z rezervy, ktorej je už tak málo.`,
            `Je to výpoveď o cene, nie o schopnosti, a tie dve sa neustále zamieňajú, väčšinou tým, kto `
                + `platí. Mapy v tomto stave vedia vytvoriť prácu skutočnej kvality a musia si dopĺňanie `
                + `zariadiť zámerne, lebo štruktúra to za ne neurobí. Vyhnúť sa treba práve dlhým `
                + `neprerušeným úsekom tvorby.`,
        ],
    },
    wealth: {
        strong: (label, god) => [
            `Silný Day Master bohatstvo unesie, a práve preto sa toto v tvojej mape číta dobre. ${label} `
                + `prichádza ako ${god.shows} — ${god.polarity} — a klasická poloha hovorí, že kmeň s `
                + `prebytkom je ten, ktorý udrží, čo ovláda, bez toho, aby ho to vyprázdnilo.`,
            `Užitočný dôsledok je, že vziať si tu viac býva správne rozhodnutie, nie chamtivé. Táto mapa `
                + `je stavaná na to, aby uniesla veľkosť veci; na čo stavaná nie je, je sedieť ticho.`,
        ],
        balanced: (label, god) => [
            `${label} sedí v pomere na mape, ktorá nie je ani chudobná, ani presýtená. Prichádza ako `
                + `${god.shows} — ${god.polarity} — a vyvážený kmeň zvládne, čo ovláda, bez toho, aby ho to `
                + `vyčerpalo alebo aby to potreboval, aby si pripadal podstatný.`,
            `Pre tohto boha je to najmenej dramatická a najtrvácnejšia poloha. Žiada si rozhodnutie o `
                + `mierke, nie obranu pred ňou.`,
        ],
        weak: (label, god) => [
            `Tomuto sa oplatí rozumieť, nie sa cez to pretlačiť. Tvoj Day Master preváži jeho ročné `
                + `obdobie a bohatstvo je vec, na ktorej udržanie musí byť kmeň dosť silný — ${label} `
                + `prichádza ako ${god.shows} — ${god.polarity} — a na mape v tomto stave si vyžiada viac, `
                + `než vráti.`,
            `Tradícia to nazýva slabým kmeňom nesúcim ťažké bohatstvo a opisuje tým úsilie, nie nešťastie: `
                + `zodpovednosť, peniaze aj spravovaná vec tu stoja viac než niekoho s rezervami. Funkčnou `
                + `odpoveďou nie je menej ctižiadosti, ale viac opory okolo nej — preto na tejto mape toľko `
                + `záleží na zdroji a na spojencoch.`,
        ],
    },
    officer: {
        strong: (label, god) => [
            `Tlak je práve to, čoho má silný Day Master málo, a preto sa ${label} číta priaznivo. `
                + `Prichádza ako ${god.shows} — ${god.polarity} — a kmeň s prebytkom je ten, ktorému prospeje `
                + `byť skôr držaný na uzde než povzbudzovaný.`,
            `Klasické čítanie hovorí, že práve toto silnú mapu tvaruje: bez niečoho, čo neustúpi, ostane `
                + `prebytok beztvarý. Prostredia so skutočnou zodpovednosťou spravia pre túto mapu viac než `
                + `prostredia, v ktorých je príjemne.`,
        ],
        balanced: (label, god) => [
            `${label} je primeraný na mape, ktorá nie je ani chudobná, ani presýtená. Prichádza ako `
                + `${god.shows} — ${god.polarity} — a vyvážený kmeň stretáva štruktúru ako niečo, v čom sa `
                + `dá pracovať, nie ako hrozbu ani ako záchranu.`,
            `Vzniká z toho nezvyčajne normálny vzťah k autorite: vieš ju prijať tam, kde je oprávnená, a `
                + `odmietnuť tam, kde nie je, bez toho, aby jedno alebo druhé bolo reflexom.`,
        ],
        weak: (label, god) => [
            `Toto je na mape ako tvoja najnáročnejšia kombinácia a oplatí sa to povedať otvorene. Tvoj `
                + `Day Master preváži jeho ročné obdobie a ${label} prichádza ako ${god.shows} — `
                + `${god.polarity} — teda tlak pôsobiaci na kmeň, ktorý už nesie viac, než má.`,
            `Tradícia to nečíta ako skazu a ani tento výklad tak nie. Opisuje mapu, kde nárok prichádza `
                + `skôr než kapacita, takže na poradí nesmierne záleží: najprv opora, potom nárok. Mapy v `
                + `tomto stave, ktorým sa darí, mali takmer vždy niekoho alebo niečo, čo ich cez ten úsek `
                + `dopĺňalo — a tie, ktorým sa nedarilo, obdivovali za to, že to zvládali samy.`,
        ],
    },
};
/** The engine's five bands, collapsed to the three the doctrine distinguishes. */
const BAND_FOR = {
    strong: 'strong',
    'moderately-strong': 'strong',
    balanced: 'balanced',
    'moderately-weak': 'weak',
    weak: 'weak',
};
const LABEL_EN = {
    'direct-resource': 'Direct Resource', 'indirect-resource': 'Indirect Resource',
    friend: 'Friend', 'rob-wealth': 'Rob Wealth',
    'eating-god': 'Eating God', 'hurting-officer': 'Hurting Officer',
    'direct-wealth': 'Direct Wealth', 'indirect-wealth': 'Indirect Wealth',
    'direct-officer': 'Direct Officer', 'seven-killings': 'Seven Killings',
};
const TEN_GOD_STRENGTH_PROVENANCE = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'That a Ten God is favourable or burdensome according to whether the Day Master is strong or '
        + 'weak is the central rule of Ziping analysis, not a refinement of it: a strong stem is '
        + 'helped by output, wealth and officer and burdened by resource and peers, and a weak stem '
        + 'the reverse. It is why the method computes strength before interpreting anything. The '
        + 'prose is this project\'s; the rule is the tradition\'s.',
    traditions: ['Ziping / Zi Ping BaZi'],
    sources: ['RESEARCH_BAZI#ten-gods', 'RESEARCH_BAZI#strength'],
};
/**
 * The three strength readings for one Ten God.
 *
 * Attached to the god's own unit, because which of the three fires depends on
 * the chart rather than on the god - the engine has already classified the Day
 * Master and the overlay reads its answer.
 */
export function tenGodStrengthOverlays(godKey) {
    const god = GODS[godKey];
    if (!god)
        return [];
    return ['strong', 'balanced', 'weak'].map((band) => ({
        id: `bazi.ten-god.${godKey}.dm-${band}`,
        condition: `The Day Master is ${band} and this is a ${god.family} god.`,
        applies: (context) => (typeof context.strength === 'string' && BAND_FOR[context.strength] === band),
        priority: 10,
        effect: 'weave-after-core',
        prose: () => (activeLocale() === 'sk'
            ? SK[god.family][band](LABEL_EN[godKey], SK_GODS[godKey])
            : EN[god.family][band](LABEL_EN[godKey], god)),
        /* No semantics: the god's own unit already carries its weight, and this
           says how favourably it should be read rather than what it is about. */
        provenance: TEN_GOD_STRENGTH_PROVENANCE,
    }));
}
/** Exported so a test can check the families against the doctrine. */
export const TEN_GOD_FAMILY = Object.fromEntries(Object.entries(GODS).map(([key, god]) => [key, god.family]));
