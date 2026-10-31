import { TAROT_CARD_VOICE_SK } from './tarotCardVoiceSk.js?v=b5ef5ed';
import { buildTarotCardTitles, TAROT_TITLE_LEXICON_SK } from './tarotCardTitles.js?v=b5ef5ed';
import { listPhrase, orientedAt, orientedCardVoice, reversedCount, upperFirst, } from './tarotVoice.js?v=b5ef5ed';
/**
 * THE TAROT READING IN SLOVAK.
 *
 * Not the English translated. The same plan, the same five sections, the same
 * argument - said the way Slovak says things. Where English leans on a phrasal
 * verb or an idiom Slovak has no equivalent for, the Slovak sentence is built
 * from scratch to carry the same claim.
 *
 * NO SENTENCE STATES THE READER'S GENDER, AND THAT SHAPES THE GRAMMAR.
 * Slovak has no gender-neutral past participle or conditional in the second
 * person, so "si videl" and "by si mal" are simply unavailable. Everything
 * addressed to the reader is present tense, imperative, or infinitive. The
 * content audit greps the rendered Slovak for the gendered forms, so a sentence
 * that reintroduced one would fail rather than ship.
 *
 * A CARD'S PHRASE IS NEVER MADE TO AGREE WITH ANYTHING. Card fragments are
 * nominative noun phrases of mixed gender and number, so a frame like
 * "otvara sa na ..." would demand an accusative the table cannot supply. Every
 * slot below either follows a colon, sits in quotation marks as apposition, or
 * follows the copula "je" - three positions Slovak leaves in the nominative. The
 * head noun that carries the case is always one this file supplies itself.
 */
const ARC_LINE = {
    continuation: 'jedna línia vedená rovnomerne cez všetky tri karty',
    escalation: 'niečo, čo cestou rastie',
    interruption: 'usadená vec, do ktorej sa v polovici vstúpi',
    'breakdown-to-recovery': 'niečo, čo povolí a potom sa usadí',
    'expansion-to-limit': 'rozpínanie, ktoré narazí na hranu',
    'stasis-to-movement': 'nehybný začiatok, ktorý sa končí pohybom',
    'conflict-to-integration': 'rozdelenie, ktoré sa vracia do jedného celku',
    'opening-to-choice': 'situácia, ktorá dospeje k voľbe',
    'holding-to-release': 'niečo držané a potom pustené',
    'uncertainty-to-clarity': 'neisté otvorenie, ktoré sa vyjasní',
    'stability-to-disruption': 'usadené otvorenie, ktoré sa naruší',
    redirection: 'smer, ktorý sa v polovici otočí',
};
/**
 * ČO Z TOHO TVARU ROBÍ UŽITOČNÚ OTÁZKU.
 *
 * Nasleduje hneď za vetou, ktorá pomenovala pohyb, a nesmie ho zopakovať.
 * Skorá verzia mala "... usadené otvorenie, ktoré sa naruší. Usadený začiatok,
 * ktorý sa naruší, kladie otázku ..." - tá istá vetná časť dvakrát za sebou, čo
 * je presne to, ako znie vata.
 */
const ARC_ASK = {
    continuation: 'Otázka potom nie je čo robiť, ale či v tom pokračovať.',
    escalation: 'Otázka potom je, kde sa to má zastaviť.',
    interruption: 'Potom je dôležitý ten zásah, nie úsek, ktorý dovtedy fungoval.',
    'breakdown-to-recovery': 'Dôležitejšie je tu to usadenie než to povolenie.',
    'expansion-to-limit': 'Otázka potom je, s ktorou z tých dvoch vecí sa vlastne hádaš.',
    'stasis-to-movement': 'Otázka potom je, načo tá nehybnosť bola.',
    'conflict-to-integration': 'Otázka potom je, čoho sa treba vzdať, aby sa to zatvorilo.',
    'opening-to-choice': 'Žiada to tú voľbu urobiť, nie ju znova vážiť.',
    'holding-to-release': 'Otázka potom je, čo to držanie chránilo.',
    'uncertainty-to-clarity': 'Žiada to na vyjasnenie počkať, nie ho tlačiť.',
    'stability-to-disruption': 'Otázka potom je, či to usadenie bolo skutočné.',
    redirection: 'Otázka potom je, či ten obrat robíš ty, alebo niekto iný.',
};
const RELATION_LINE = {
    interruption: 'vstup do toho, čo druhá karta usadila',
    stabilisation: 'usadenie toho, čo druhá karta rozhýbala',
    escalation: 'ten istý tlak, len silnejší',
    softening: 'ten istý smer, len tichšie',
    reinforcement: 'dve karty idúce tým istým smerom, pričom ani jedna to nezvyšuje',
    redirection: 'otočenie smeru bez toho, aby sa ukončil',
    release: 'pustenie toho, čo druhá karta držala',
    integration: 'zloženie toho, čo druhá karta rozdelila',
    exposure: 'vynesenie vnútornej veci na svetlo',
    answer: 'odpoveď na otázku, ktorú druhá karta nechala otvorenú',
    contrast: 'dve karty ťahajúce proti sebe',
    continuation: 'jedna etapa nesená do ďalšej',
};
/** Čo z etapy prvej karty robí tému zvyšku rozloženia. */
const ENERGY_ROLE_LINE = {
    'sets-something-beginning': 'Štrukturálne je to východiskový bod, a preto sa druhé dve karty čítajú ako to, čo sa s ním deje.',
    'sustains-an-effort': 'Štrukturálne je to niečo, čo už beží, takže rozloženie je o tom, ako sa to nesie, nie o tom, či začať.',
    'holds-still': 'Štrukturálne je to zastavenie, a tým sa z druhých dvoch kariet stáva otázka, čo tým pohne.',
    'stands-at-full-extent': 'Štrukturálne je to už na plnom rozsahu, takže tým smerom nie je kam ísť a rozloženie je o tom, čo nasleduje.',
    'is-mid-transition': 'Štrukturálne je to uprostred zmeny, takže témou nie je ani starý, ani nový tvar - témou je ten prechod.',
    'is-being-broken-into': 'Štrukturálne je to niečo, do čoho sa vstupuje, a tým sa rozloženie posúva k tomu, čo s tým zásahom, nie k jeho predchádzaniu.',
    'is-letting-go': 'Štrukturálne je to pustenie, takže rozloženie je o tom, čomu to uvoľní miesto.',
    'is-coming-together': 'Štrukturálne je to skladanie dokopy, takže rozloženie je o tom, čo to spojené teraz unesie.',
};
/** Tretia osoba singuláru, prítomný čas. Podmetom je Faktorová karta, takže nič sa nesklada. */
const FACTOR_VERB = {
    reinforces: 'tlačí tým istým smerom',
    amplifies: 'to zosilňuje',
    softens: 'to zjemňuje',
    interrupts: 'do toho vstupuje',
    redirects: 'to obracia',
    steadies: 'to usadzuje',
    exposes: 'to vynáša na svetlo',
    answers: 'na to odpovedá',
    'pulls-against': 'ťahá proti tomu',
    'carries-on': 'to nesie ďalej',
    loosens: 'to zovretie uvoľňuje',
};
/** Infinitívy - jediná forma oslovenia, ktorú slovenčina necháva bez rodu. */
const GUIDANCE_INVITE = {
    continue: 'pokračovať v tom',
    redirect: 'zmeniť líniu namiesto silnejšieho tlaku po nej',
    'let-go': 'pustiť tú časť, ktorú stále držíš',
    moderate: 'vziať to jemnejšie, než naznačujú prvé dve karty',
    'meet-it': 'ísť tomu naproti namiesto obchádzania',
    wait: 'počkať a nechať čakanie byť tým, čo robíš',
    choose: 'rozhodnúť sa namiesto toho, aby možnosti zostali otvorené',
    integrate: 'zložiť tie časti späť do jedného celku',
    'attend-to-it': 'venovať tomu pozornosť skôr, než čokoľvek urobíš',
};
const MODIFIER_LINE = {
    'all-major': 'Všetky tri karty sú z Veľkej arkány, a tú tradícia číta ako širší rámec než jeden deň - menej o tom, čo je dnes na programe, a viac o tom, ku čomu ten deň patrí.',
    'major-heavy': 'Dve z troch kariet sú z Veľkej arkány, takže rozloženie je položené trochu širšie než samotný deň.',
    'one-suit': 'Všetky tri sú z jednej farby, čo čítanie zvykne zúžiť do jednej polohy namiesto rozloženia do viacerých.',
    'all-court': 'Všetky tri sú dvorné karty, a tie čítaj menej ako udalosti a viac ako postoje - spôsob, akým vec nesieš, nie samotnú vec.',
    'court-heavy': 'Dve dvorné karty kladú dôraz na to, ako sa niečo nesie, nie na to, čo to je.',
};
/**
 * AKO NAHLAS PREDSTAVIŤ NOSNÝ PÁR.
 *
 * Rozloženie, v ktorom na seba nič silno nepôsobí, nemá dostať vetu o tom, že
 * stojí na vzťahu, ktorý takmer nemá. Kľúčom je vlastná výraznosť páru - a tým
 * sa zároveň nezačína každé čítanie tými istými slovami.
 */
const HINGE_LEAD = {
    defining: 'Celé to stojí na vzťahu',
    notable: 'Ako prvý sa číta vzťah',
    quiet: 'Nič tu na nič silno nepôsobí; najbližšie k nosnému je vzťah',
};
const SECOND_LEAD = {
    defining: 'Skutočnú prácu robí aj druhý vzťah,',
    notable: 'Za pomenovanie stojí aj druhý vzťah,',
    quiet: 'Pod tým sedí tichší tretí vzťah,',
};
/**
 * AKÚ VÁHU MÁ NEZHODA.
 *
 * Skorá verzia hovorila každému nezhodnému páru, že jeho nezhoda je "väčšinou
 * toho, o čom rozloženie je". To platí len vtedy, keď je to ten pár, na ktorom
 * celé čítanie stojí; inde to nález preháňalo.
 */
const DISAGREEMENT_WEIGHT = {
    hinge: 'a práve tá nezhoda je väčšinou toho, o čom rozloženie je',
    aside: 'no váha rozloženia neleží tam',
};
/** Naladené na to, aké silné to napätie naozaj je. */
const COST_LEAD = {
    strong: 'Riziko, na ktoré si dávaj pozor:',
    moderate: 'Kde to môže zlyhať:',
    low: 'Mierna podoba toho rizika:',
};
/**
 * KTORÉ POZVANIA POTREBUJÚ VÝHRADU.
 *
 * "Čítaj to ako postoj, nie ako pokyn" stojí za povedanie tam, kde pozvanie znie
 * ako rozkaz. Po "počkať" alebo "venovať tomu pozornosť" je to reflex, a reflex
 * zopakovaný v 456 456 čítaniach je vata.
 */
const NEEDS_STANCE_CAVEAT = new Set([
    'choose', 'let-go', 'meet-it', 'redirect', 'continue',
]);
/**
 * AKÁ STÁLA JE TÁ ÚVODNÁ ENERGIA.
 *
 * Rozmer, ktorý model zapisuje pre každú kartu a ktorý ani jeden hlas nečítal.
 * Pritom rozhoduje: energia, ktorá sa môže za deň otočiť, a energia, ktorá zostane
 * celý deň tá istá, dávajú druhým dvom kartám úplne inú úlohu.
 */
const STABILITY_LINE = {
    stable: 'Je to stála vec, nie posuvná, takže bude pravdepodobne celý deň tá istá.',
    volatile: 'Stále to nie je - za jediný deň sa to môže otočiť, a práve preto sú druhé dve karty dôležité.',
    suspended: 'Je to skôr držané než v pohybe, a to je stav, nie zdržanie.',
    transforming: 'Už cestou to mení tvar, takže to nie je dvakrát tá istá vec.',
};
/**
 * PREČO OSTATNÉ PÁRY MLČIA.
 *
 * Keď čítanie pomenuje jeden vzťah a skončí, dôvod stojí za vyslovenie - čitateľ
 * nemá zostať v otázke, či sa dve tretiny rozloženia jednoducho nepreskočili.
 */
const SILENCE_REASON = {
    identical: 'Všetky tri páry sa čítajú rovnako, takže tu je jeden vzťah, nie tri.',
    quiet: 'Nič ďalšie v rozložení nepôsobí dosť nahlas, aby si zaslúžilo druhú vetu.',
    duplicate: 'Ostatné páry sa čítajú rovnako ako ten prvý, takže pomenovať ich znova by nič nepridalo.',
};
/** Tri usporiadané páry v genitíve - po "na vzťahu ...". */
const PAIR_GENITIVE = {
    'energy>factor': 'prvej a prostrednej karty',
    'energy>guidance': 'prvej a tretej karty',
    'factor>guidance': 'prostrednej a tretej karty',
};
/** Tie isté páry v nominatíve - ako podmet vety. */
const PAIR_NOMINATIVE = {
    'energy>factor': 'prvá a prostredná karta',
    'energy>guidance': 'prvá a tretia karta',
    'factor>guidance': 'prostredná a tretia karta',
};
/** Čo je rozmer zhody, povedané bez slovníka modelu. */
const DIMENSION_LINE = {
    direction: 'kde v priebehu stoja',
    movement: 'ktorým smerom tlačia',
    focus: 'či hľadia dovnútra alebo von',
    stance: 'ako zaobchádzajú s ľuďmi okolo',
    stability: 'aké sú stabilné',
    agency: 'čo žiadajú',
};
const TURNING_RELATIONS = new Set([
    'redirection', 'interruption', 'contrast',
]);
const cardTitles = buildTarotCardTitles(TAROT_TITLE_LEXICON_SK);
/**
 * OBRÁTENÁ KARTA, V ŠIESTICH RÁMCOCH.
 *
 * Každý z nich musí čitateľovi nechať ZMENENÚ kartu, nie pokazenú. Nie je to
 * prehnaná opatrnosť: Waiteovo obrátené Koleso šťastia znamená "increase,
 * abundance, superfluity", jeho obrátená Cisárovná "light, truth, public
 * rejoicings", a pri Štvorke palíc píše, že význam zostáva nezmenený. Deväť jeho
 * obrátených záznamov je priaznivejších než základná poloha.
 *
 * ZHODA: rámce nikdy nepripájajú prídavné meno k fragmentu karty. Fragmenty sú
 * nominatívne menné frázy rôzneho rodu, takže "prehnaný/prehnaná/prehnané" by sa
 * muselo zhodovať s niečím, čo tabuľka nepozná. Pripája sa preto veta, ktorej
 * podmetom je "to" (stredný rod), alebo štítok v zátvorke - obe sú bez zhody.
 */
/**
 * JEDEN KRÁTKY ŠTÍTOK NA REŽIM, pre dynamiku aj pre tému.
 *
 * V zátvorke, nie prívesok za čiarkou: fráza karty sa vkladá do výpočtov a do
 * vetných členov, ktoré už čiarky obsahujú, a prívesok sa s nimi bije. Štítok
 * hovorí KTORÁ zmena; REVERSAL_LINE hovorí, čo to znamená - slovami, ktoré štítok
 * nepoužíva. Zátvorka zároveň rieši zhodu: štítok sa nemusí zhodovať s ničím.
 */
const REVERSAL_LABEL = {
    diminished: 'tichšie',
    blocked: 'zadržané',
    excessive: 'prehnané',
    internalised: 'dovnútra',
    exposed: 'navonok',
    unchanged: '',
};
const framed = (upright, mode) => (REVERSAL_LABEL[mode] ? `${upright} (${REVERSAL_LABEL[mode]})` : upright);
const REVERSAL_LINE = {
    diminished: 'Obrátená karta tu znamená tú istú vec s menšou silou, nie jej opak.',
    blocked: 'Obrátená karta tu znamená, že vec je prítomná a neprechádza: stojí, nechýba.',
    excessive: 'Obrátená karta tu znamená tú istú kvalitu dotiahnutú za bod, kde ešte slúžila.',
    internalised: 'Obrátená karta tu znamená, že sa to odohráva v súkromí - tá istá energia bez odtoku.',
    exposed: 'Obrátená karta tu znamená, že to, čo táto karta zvyčajne drží pre seba, je vidno.',
    unchanged: 'Obrátená karta sa tu číta takmer ako v základnej polohe; obrátenie mení málo.',
};
const ORIENTATION_VOICE_SK = {
    /* "Blázon, obrátená" by bola chyba rodu a "obrátený" zase pri Hviezde. Rod nesie
       slovo "poloha", ktoré dodávame my, takže názov karty zostáva nedotknutý. */
    title: (cardTitle, orientation) => (orientation === 'reversed' ? `${cardTitle} (v obrátenej polohe)` : cardTitle),
    /*
     * Dynamika NEMÁ štítok, téma áno.
     *
     * Kde sa dynamika karty objaví, tam je v tej istej vete aj názov karty s
     * "(v obrátenej polohe)", alebo hneď za ňou nasleduje veta o režime - štítok by
     * bol druhá značka obrátenia v jednom dychu. Téma sa objavuje v záverečnom
     * súhrne a v sekcii Faktor bez názvu karty, a preto si štítok ponecháva.
     */
    dynamic: (upright) => upright,
    tag: (upright, mode) => framed(upright, mode),
    modeLine: REVERSAL_LINE,
    spreadNote: (count) => {
        if (count === 0)
            return null;
        if (count === 1) {
            return 'Jedna z troch kariet vyšla obrátená, čo mení, ako sa tá karta číta - '
                + 'nerobí z nej zlú kartu.';
        }
        if (count === 2) {
            return 'Dve z troch kariet vyšli obrátené. Obrátenie mení, ako sa karta prejavuje; '
                + 'nerobí z nej výstrahu.';
        }
        return 'Všetky tri vyšli obrátené, takže celé rozloženie sa číta v pozmenenej polohe, '
            + 'nie v základnej.';
    },
};
const JUMPER_RELATION_LINE = {
    reinforces: 'Tlačí tým istým smerom ako tie tri, takže to číta skôr ako potvrdenie než ako novú správu.',
    complicates: 'Ťahá proti línii, ktorú tie tri tvoria, a práve tá nezhoda je väčšinou toho, prečo sa to vyplatilo nechať.',
    exposes: 'Vynáša na svetlo to, čo tie tri držali vnútri.',
    redirects: 'Otáča líniu, po ktorej tie tri išli.',
    settles: 'Zatvára to, čo tie tri nechali otvorené.',
    accompanies: 'Netlačí rozloženie ani mu neodporuje; stojí vedľa a drží si svoje.',
};
const JUMPER_VOICE_SK = {
    sectionTitle: 'Karta, ktorá vyskočila',
    relationLine: JUMPER_RELATION_LINE,
    render: (plan) => {
        const jumper = plan.jumper;
        if (!jumper)
            return '';
        const base = TAROT_CARD_VOICE_SK[jumper.cardId];
        const framed = orientedCardVoice(base, jumper.card, ORIENTATION_VOICE_SK);
        const named = ORIENTATION_VOICE_SK.title(cardTitles[jumper.cardId], jumper.card.orientation);
        /* "a nechal si ju v hre" bolo mužské. Podmetom je karta, takže zhoda padá na
           "karta" - rod, ktorý tento súbor pozná - a nie na rod čitateľa. */
        return `Počas miešania vypadla z balíčka jedna karta, ešte pred výberom tých troch, `
            + `a zostala v hre: ${named}. Je to ${framed.dynamic}. `
            + `${JUMPER_RELATION_LINE[jumper.relation]} `
            + `Čítaj to ako kontext okolo tých troch, nie ako štvrtú pozíciu: žiada to ${framed.asks}.`;
    },
};
/** Fragmenty karty, už upravené pre polohu, v ktorej bola vytiahnutá. */
const voice = (plan, which) => orientedCardVoice(TAROT_CARD_VOICE_SK[plan.cardIds[which]], orientedAt(plan, which), ORIENTATION_VOICE_SK);
/** Názov karty, s poznámkou o obrátenej polohe, keď je obrátená. */
const title = (plan, which) => ORIENTATION_VOICE_SK.title(cardTitles[plan.cardIds[which]], orientedAt(plan, which).orientation);
const pairKey = (pair) => `${pair.from}>${pair.to}`;
const dimensions = (keys) => listPhrase(keys.map((key) => DIMENSION_LINE[key] ?? key), 'a');
export const TAROT_VOICE_SK = {
    cards: TAROT_CARD_VOICE_SK,
    cardTitles,
    orientation: ORIENTATION_VOICE_SK,
    jumper: JUMPER_VOICE_SK,
    jumperSection: (plan) => JUMPER_VOICE_SK.render(plan),
    sectionTitles: {
        opening: 'Tvar rozloženia',
        energy: 'Čo je najprítomnejšie',
        factor: 'Čo to formuje',
        guidance: 'Kam to ukazuje',
        jumper: 'Karta, ktorá vyskočila',
        'in-short': 'Stručne',
    },
    opening: (plan) => {
        const primary = plan.namedRelations.opening;
        return [
            `${title(plan, 0)}, ${title(plan, 1)} a ${title(plan, 2)} tvoria spolu jeden pohyb: `
                + `${ARC_LINE[plan.arc]}. ${ARC_ASK[plan.arc]}`,
            `Začína sa témou „${voice(plan, 0).tag}“. Tretia karta vedie k jednému: `
                + `${GUIDANCE_INVITE[plan.guidance.role]}.`,
            `${HINGE_LEAD[primary.salience]} ${PAIR_GENITIVE[pairKey(primary)]}: `
                + `${RELATION_LINE[primary.relation]}.`,
            ORIENTATION_VOICE_SK.spreadNote(reversedCount(plan)),
            ...plan.modifiers.map((entry) => MODIFIER_LINE[entry]).filter(Boolean),
        ].filter(Boolean).join(' ');
    },
    energy: (plan) => {
        const card = voice(plan, 0);
        const strained = plan.cost?.id === plan.cardIds[0];
        const mode = orientedAt(plan, 0).reversalMode;
        return `Energia, na ktorej sa rozloženie otvára, je ${card.dynamic}. `
            + (mode ? `${REVERSAL_LINE[mode]} ` : '')
            + `${ENERGY_ROLE_LINE[plan.energy.role]} `
            + `${STABILITY_LINE[plan.energy.card.stability] ?? ''} `
            + `V najlepšom prípade ${card.constructive}; keď zájde priďaleko, ${card.difficult}.`
            + (strained ? ' Je to zároveň tá časť rozloženia, ktorá nesie najväčšie napätie.' : '');
    },
    factor: (plan) => {
        const energyCard = voice(plan, 0);
        const factorCard = voice(plan, 1);
        const relation = plan.pairs.find((pair) => pair.from === 'energy' && pair.to === 'factor');
        const agreement = !relation
            ? ''
            : relation.opposing.length > 0
                ? ` Nezhodujú sa v tomto: ${dimensions(relation.opposing)} - `
                    + `${pairKey(relation) === pairKey(plan.primaryPair)
                        ? DISAGREEMENT_WEIGHT.hinge : DISAGREEMENT_WEIGHT.aside}.`
                : relation.shared.length >= 2
                    ? (TURNING_RELATIONS.has(relation.relation)
                        ? ` Aj tak sa zhodujú v tomto: ${dimensions(relation.shared)}, takže ten obrat je `
                            + `zmena smeru, nie zlom.`
                        : ` Zhodujú sa v tomto: ${dimensions(relation.shared)}, a preto to čítaj skôr ako `
                            + `pridanú váhu než ako obrat.`)
                    : relation.shared.length === 1
                        ? ` Spoločné majú jedno: ${dimensions(relation.shared)}.`
                        : ` Spoločného majú takmer nič, a preto prostredná karta dopadá ako zmena témy, `
                            + `nie ako poznámka k prvej.`;
        const named = plan.namedRelations.factor;
        const second = named
            ? ` ${SECOND_LEAD[named.salience]} ${PAIR_GENITIVE[pairKey(named)]}: `
                + `${RELATION_LINE[named.relation]}.`
            : '';
        const silent = plan.namedRelations.factor === null && plan.namedRelations.guidance === null
            ? ` ${new Set(plan.pairs.map((pair) => pair.relation)).size === 1
                ? SILENCE_REASON.identical
                : plan.secondaryPair === null ? SILENCE_REASON.quiet : SILENCE_REASON.duplicate}`
            : '';
        return `Proti tomu stavia ${title(plan, 1)} ďalšiu vec: ${factorCard.dynamic}. Druhá karta `
            + `${FACTOR_VERB[plan.factor.role]}. Doteraz nesla celé pole jedna téma: `
            + `„${energyCard.tag}“. Teraz je v ňom aj druhá: „${factorCard.tag}“.`
            + `${agreement}${second}${silent}`;
    },
    guidance: (plan) => {
        const guidanceCard = voice(plan, 2);
        const energyCard = voice(plan, 0);
        const factorCard = voice(plan, 1);
        const outer = plan.pairs.find((pair) => pair.from === 'energy' && pair.to === 'guidance');
        const inner = plan.namedRelations.guidance;
        const answersOpening = outer && (outer.relation === 'answer' || outer.relation === 'stabilisation'
            || outer.relation === 'release' || outer.relation === 'integration');
        return `Obe predchádzajúce témy - „${energyCard.tag}“ a „${factorCard.tag}“ - vedú k tretej `
            + `karte. ${title(plan, 2)} ukazuje na jedno: ${guidanceCard.asks}. Je to `
            + `${guidanceCard.dynamic}`
            + (answersOpening
                ? ` - a hovorí to priamo k prvej karte, nie k tej prostrednej.`
                : ` - a oproti dvom kartám pred ňou je to iný ťah.`)
            + (inner ? ` K prostrednej karte je to ${RELATION_LINE[inner.relation]}.` : '')
            + (NEEDS_STANCE_CAVEAT.has(plan.guidance.role)
                ? ` Čítaj to ako postoj, nie ako pokyn: keď sa to vezme dobre, `
                    + `${guidanceCard.constructive}.`
                : ` Keď sa to vezme dobre, ${guidanceCard.constructive}.`)
            + ` V prehnanej podobe ${guidanceCard.difficult} - a to je tá verzia, ktorú netreba.`;
    },
    inShort: (plan) => {
        const costCard = plan.cost ? TAROT_CARD_VOICE_SK[plan.cost.id] : null;
        const saidAlready = plan.cost
            && (plan.cost.id === plan.cardIds[0] || plan.cost.id === plan.cardIds[2]);
        const cost = !costCard || !plan.cost
            ? ` Nič v tomto rozložení nenesie zjavné napätie.`
            : saidAlready
                ? ` Napätie z toho sedí v ${plan.cost.id === plan.cardIds[0]
                    ? 'karte, ktorou sa rozloženie otvára' : 'samotnom pozvaní'}, a to v prehnanej podobe, `
                    + `nie v tej užitočnej.`
                : ` ${COST_LEAD[plan.cost.intensity] ?? COST_LEAD.moderate} ${costCard.difficult}.`;
        const pull = plan.tension
            ? ` Najsilnejšie proti sebe ťahajú ${PAIR_NOMINATIVE[pairKey(plan.tension)]}.`
            : '';
        const agree = plan.reinforcement
            ? ` Najviac sa zhodujú ${PAIR_NOMINATIVE[pairKey(plan.reinforcement)]}.`
            : '';
        const level = !plan.tension && !plan.reinforcement
            ? ` Nič sa tu výrazne nezhoduje a nič výrazne neťahá proti, čo sa číta ako vyrovnané, `
                + `nie ako prázdne.`
            : '';
        return `${upperFirst(ARC_LINE[plan.arc])}. Poradie je „${voice(plan, 0).tag}“, potom `
            + `„${voice(plan, 1).tag}“, potom „${voice(plan, 2).tag}“.${pull}${agree}${level}${cost}`;
    },
};
