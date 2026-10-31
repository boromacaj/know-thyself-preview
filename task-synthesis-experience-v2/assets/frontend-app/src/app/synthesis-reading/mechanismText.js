import { activeLocale } from '../i18n/locale.js?v=53c0693';
/**
 * The mechanism for each axis, in both shapes.
 *
 * Written to sit AFTER the sentence that names the results on each side, so
 * each one starts from "the two do not…" rather than restating the split.
 */
const AXIS_MECHANISM = {
    'inner-focus': {
        balanced: {
            en: 'These two do not run at the same time. The usual shape is a day spent '
                + 'genuinely among people, followed by a stretch alone in which what happened '
                + 'is actually processed - and the second half is not optional. Skip it and '
                + 'the outward half stops working within a week or two.',
            sk: 'Tieto dve veci nebežia naraz. Zvyčajne to vyzerá tak, že deň strávený '
                + 'naozaj medzi ľuďmi vystrieda čas osamote, v ktorom sa to prežité utrasie – '
                + 'a tá druhá polovica nie je voliteľná. Keď vypadne, vonkajšia polovica '
                + 'prestane fungovať do týždňa či dvoch.',
        },
        lopsided: {
            en: 'The lighter side is not absent, it is periodic. It tends to arrive as a '
                + 'sudden need to withdraw that looks like a mood to everyone else and is '
                + 'closer to maintenance.',
            sk: 'Slabšia strana nechýba, len prichádza po dávkach. Zvykne sa ohlásiť ako '
                + 'náhla potreba stiahnuť sa, ktorá pre okolie vyzerá ako nálada a bližšie je '
                + 'k údržbe.',
        },
    },
    reasoning: {
        balanced: {
            en: 'The two arrive at different speeds, and that gap is the whole mechanism. '
                + 'The fast read is usually there within seconds; the checking takes hours or '
                + 'weeks. What that produces from outside is a long silence followed by a '
                + 'decision made in a moment - which reads as impulsive to people who did not '
                + 'see the months of examination behind it.',
            sk: 'Prichádzajú rôznou rýchlosťou a práve tá medzera je celý mechanizmus. '
                + 'Rýchle čítanie býva na svete do pár sekúnd; overovanie trvá hodiny alebo '
                + 'týždne. Zvonku to vyzerá ako dlhé ticho a potom rozhodnutie v jedinej '
                + 'chvíli – čo pôsobí unáhlene na každého, kto tie mesiace skúmania nevidel.',
        },
        lopsided: {
            en: 'The lighter side still fires first; it just does not get the last word. '
                + 'The characteristic cost is a good instinct that gets talked out of itself, '
                + 'and the useful habit is writing the first read down before the reasoning '
                + 'starts, so there is something to compare the conclusion against.',
            sk: 'Slabšia strana sa aj tak ozve prvá, len nemá posledné slovo. Typická cena '
                + 'je dobrý inštinkt, ktorý si sám sebe rozhovorí, a užitočný návyk je zapísať '
                + 'si prvé čítanie skôr, než sa rozbehne uvažovanie – aby bolo záver s čím '
                + 'porovnať.',
        },
    },
    autonomy: {
        balanced: {
            en: 'This one is awkward to hold, because both halves want the same hours. The '
                + 'common resolution is doing the work alone and bringing it to people only '
                + 'once it is defensible - which satisfies neither side properly, and shows up '
                + 'as asking for input at the point where it is too late to use.',
            sk: 'Toto sa drží ťažko, lebo obe polovice chcú tie isté hodiny. Bežné riešenie '
                + 'je urobiť prácu osamote a priniesť ju medzi ľudí, až keď sa dá obhájiť – čo '
                + 'poriadne neuspokojí ani jednu stranu a prejaví sa to tak, že si o názor '
                + 'povieš vo chvíli, keď sa už nedá použiť.',
        },
        lopsided: {
            en: 'The lighter side tends to be domain-shaped rather than absent: one area of '
                + 'life runs on the opposite setting from all the others, and it is usually '
                + 'the area nobody would predict from the rest.',
            sk: 'Slabšia strana nechýba, skôr má tvar jednej oblasti: jedna časť života beží '
                + 'na opačnom nastavení než všetky ostatné a býva to práve tá, ktorú by nikto '
                + 'zo zvyšku neuhádol.',
        },
    },
    structure: {
        balanced: {
            en: 'Both are real, so the pattern is not compromise but alternation: a method '
                + 'gets built carefully and then abandoned partway when conditions change. '
                + 'That is not carelessness - the improvising half is as well supported as the '
                + 'planning half - but it does mean the plans need to be built to be dropped, '
                + 'rather than built to be followed.',
            sk: 'Obe sú skutočné, takže tu nejde o kompromis, ale o striedanie: postup sa '
                + 'starostlivo postaví a v polovici opustí, keď sa zmenia podmienky. Nie je to '
                + 'nedbalosť – improvizujúca polovica stojí rovnako pevne ako plánujúca –, ale '
                + 'znamená to, že plány treba stavať tak, aby sa dali opustiť, nie tak, aby sa '
                + 'museli dodržať.',
        },
        lopsided: {
            en: 'The lighter side shows up as a reliable exception rather than a tendency: '
                + 'one kind of situation where the usual method is dropped completely, and '
                + 'dropped without much internal argument about it.',
            sk: 'Slabšia strana sa prejaví ako spoľahlivá výnimka, nie ako sklon: jeden druh '
                + 'situácie, v ktorom obvyklý postup ide úplne bokom – a ide bokom bez veľkého '
                + 'vnútorného dohadovania.',
        },
    },
    risk: {
        balanced: {
            en: 'Caution and appetite rarely blend into moderation; they divide by area. The '
                + 'recognisable version is being genuinely bold about one category of decision '
                + 'and immovable about another, with the boundary between them looking '
                + 'arbitrary to anyone watching and being perfectly consistent from inside.',
            sk: 'Opatrnosť a chuť riskovať sa málokedy zmiešajú do umiernenosti; rozdelia sa '
                + 'podľa oblastí. Poznať to tak, že v jednej kategórii rozhodnutí ide naozaj '
                + 'o odvahu a v druhej sa nepohneš ani o krok – a hranica medzi nimi pôsobí '
                + 'zvonku náhodne, kým zvnútra je úplne dôsledná.',
        },
        lopsided: {
            en: 'The lighter side is not a brake or a spur that runs constantly - it arrives '
                + 'at specific moments, usually late, and usually about something the leading '
                + 'side had already decided.',
            sk: 'Slabšia strana nie je brzda ani ostroha, ktorá beží stále – ozve sa v '
                + 'konkrétnych chvíľach, zvyčajne neskoro a zvyčajne k niečomu, o čom už '
                + 'silnejšia strana rozhodla.',
        },
    },
    'emotional-expression': {
        balanced: {
            en: 'The feeling and its display are on different clocks. What tends to happen '
                + 'is that very little shows in the moment and a great deal shows afterwards, '
                + 'larger than the occasion warranted, to somebody who was not the cause. The '
                + 'practical fix is unglamorous: say the smaller thing at the time.',
            sk: 'Cit a jeho prejav idú podľa iných hodín. Zvykne to vyzerať tak, že v tej '
                + 'chvíli sa navonok ukáže veľmi málo a potom veľmi veľa – väčšmi, než by k '
                + 'situácii patrilo, a niekomu, kto to nespôsobil. Praktická náprava je '
                + 'neefektná: povedať tú menšiu vec hneď.',
        },
        lopsided: {
            en: 'The lighter side surfaces under load rather than in ordinary conditions, '
                + 'which is why it tends to surprise both the person and the room.',
            sk: 'Slabšia strana vypláva pod tlakom, nie za bežných podmienok – a práve preto '
                + 'zvykne prekvapiť aj toho, koho sa týka, aj miestnosť.',
        },
    },
    visibility: {
        balanced: {
            en: 'These coexist by compartment rather than by blend. The usual arrangement is '
                + 'being genuinely visible inside one defined role and close to unreachable '
                + 'outside it, which works well until somebody who met the public half assumes '
                + 'it is the whole thing.',
            sk: 'Tieto dve spolunažívajú tak, že sa rozdelia na priehradky, nie tak, že sa '
                + 'zmiešajú. Bežné usporiadanie je byť naozaj viditeľný v jednej vymedzenej '
                + 'role a mimo nej takmer nedostupný – čo funguje dobre dovtedy, kým si niekto, '
                + 'kto stretol tú verejnú polovicu, nemyslí, že je to celé.',
        },
        lopsided: {
            en: 'The lighter side is periodic rather than absent, and it usually arrives '
                + 'right after a stretch of the leading one rather than instead of it.',
            sk: 'Slabšia strana nechýba, len prichádza po dávkach – a zvyčajne hneď po dlhšom '
                + 'úseku tej silnejšej, nie namiesto nej.',
        },
    },
    change: {
        balanced: {
            en: 'Both are load-bearing: an arrangement is built to last and genuinely '
                + 'valued, and the appetite for the next one is just as real. The model '
                + 'cannot say which wins in a given month - only that any arrangement here '
                + 'has to be worth keeping and still leave a way out.',
            sk: 'Obe sú nosné: usporiadanie sa stavia nadlho a naozaj si ho vážiš, a chuť na '
                + 'to ďalšie je rovnako skutočná. Model nevie povedať, ktorá v danom mesiaci '
                + 'vyhrá – len to, že usporiadanie tu musí stáť za udržanie a zároveň nechať '
                + 'otvorené dvere.',
        },
        lopsided: {
            en: 'The lighter side does not argue continuously; it arrives as a short, sharp '
                + 'episode, and the mistake is treating the episode as the whole answer.',
            sk: 'Slabšia strana sa neozýva stále; príde ako krátka a ostrá epizóda – a chyba '
                + 'je brať tú epizódu ako celú odpoveď.',
        },
    },
    initiative: {
        balanced: {
            en: 'The waiting and the moving are the same mechanism seen at two moments. What '
                + 'this looks like is a long period of apparently doing nothing followed by '
                + 'moving faster than anyone expected once the thing is actually in front of '
                + 'you - and the waiting is doing real work, not stalling.',
            sk: 'Čakanie a pohyb sú ten istý mechanizmus v dvoch okamihoch. Vyzerá to tak, že '
                + 'dlho sa navonok nedeje nič a potom sa pohneš rýchlejšie, než ktokoľvek '
                + 'čakal – hneď ako je tá vec naozaj pred tebou. To čakanie robí skutočnú '
                + 'prácu, nie je to otáľanie.',
        },
        lopsided: {
            en: 'The lighter side tends to show up in the company of specific people rather '
                + 'than in specific situations, which makes it look like inconsistency and is '
                + 'closer to calibration.',
            sk: 'Slabšia strana sa zvykne ukazovať v spoločnosti konkrétnych ľudí, nie v '
                + 'konkrétnych situáciách – vyzerá to ako nedôslednosť a bližšie je to k '
                + 'nastavovaniu podľa druhého.',
        },
    },
    abstraction: {
        balanced: {
            en: 'The general rule and the case in front of you are both arrived at quickly, '
                + 'and the failure is never in either half - it is in the handover. The '
                + 'conceptual side proposes something the practical side then has to build, '
                + 'and charts with this split tend to be demanding of themselves in a way that '
                + 'is hard to explain to anyone who only sees one of the two.',
            sk: 'Všeobecné pravidlo aj konkrétny prípad prichádzajú rýchlo a zlyhanie nikdy '
                + 'nie je v jednej z tých polovíc – je v odovzdávaní medzi nimi. Pojmová strana '
                + 'navrhne niečo, čo praktická musí potom postaviť, a mapy s týmto rozdelením '
                + 'bývajú na seba náročné spôsobom, ktorý sa ťažko vysvetľuje niekomu, kto vidí '
                + 'len jednu z tých strán.',
        },
        lopsided: {
            en: 'The lighter side is a tool rather than a default here: available when the '
                + 'situation calls for it, and not the register anything starts in.',
            sk: 'Slabšia strana je tu skôr nástroj než východisko: siahneš po nej, keď si to '
                + 'situácia pýta, ale nič sa v nej nezačína.',
        },
    },
};
/** The mechanism sentence for one axis in one shape. */
export function axisMechanism(axis, shape) {
    const entry = AXIS_MECHANISM[axis]?.[shape];
    if (!entry)
        return '';
    return activeLocale() === 'sk' ? entry.sk : entry.en;
}
/** Every axis the mechanism table covers. Used by the coverage test. */
export const MECHANISM_AXES = Object.keys(AXIS_MECHANISM);
