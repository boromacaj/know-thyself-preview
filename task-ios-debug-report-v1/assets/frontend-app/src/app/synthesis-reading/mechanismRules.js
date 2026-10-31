import { activeLocale } from '../i18n/locale.js?v=b5ef5ed';
/** Order-independent key, so a rule is authored once for a pair. */
const key = (a, b) => [a, b].sort().join('+');
const r = (a, b, en, sk) => [key(a, b), { en, sk }];
/**
 * REINFORCEMENT: what the pair is, more precisely than the theme label.
 *
 * Each completes `What they share is narrower than <theme>: ...`.
 */
const REINFORCE = new Map([
    r('investigation', 'verification', 'a habit of going on digging until the explanation actually holds together, rather than until it satisfies', 'zvyk kopať ďalej dovtedy, kým vysvetlenie naozaj drží pokope, nie kým stačí'),
    r('investigation', 'refinement', 'a habit of taking the thing apart and putting it back slightly better than it was', 'zvyk vec rozobrať a zložiť ju o kúsok lepšie, než bola'),
    r('verification', 'refinement', 'going over the same work repeatedly, each pass smaller than the last', 'opakované prechádzanie tej istej práce, každý raz o kúsok drobnejšie'),
    r('verification', 'standards', 'checking first and then cutting whatever failed the check, without much sentiment about it', 'najprv kontrola a potom odrezanie toho, čo v nej neobstálo, bez veľkej sentimentality'),
    r('refinement', 'standards', 'improving the thing and then removing the part that still does not meet the bar', 'vylepšiť vec a potom odstrániť to, čo stále nedosahuje latku'),
    r('investigation', 'foundation', 'digging until there is something solid enough to build the next thing on', 'kopať dovtedy, kým nie je niečo dosť pevné na to, aby sa na tom dalo stavať'),
    r('foundation', 'method', 'building in an order, and refusing to call a stage finished early', 'stavanie v poradí a odmietanie vyhlásiť fázu za hotovú predčasne'),
    r('method', 'endurance', 'staying with a structure long after the interest that started it has gone', 'zotrvanie pri štruktúre dávno po tom, čo záujem, ktorý ju začal, vyprchal'),
    r('method', 'control', 'planning toward a specific result and holding the plan accountable to it', 'plánovanie k určitému výsledku a držanie plánu voči nemu'),
    r('speed', 'embodiment', 'moving the moment the response arrives, before the reasons have been assembled', 'pohyb v okamihu, keď príde odpoveď, ešte pred zložením dôvodov'),
    r('autonomy', 'control', 'taking both the decision and the consequence, and being uneasy when only one is on offer', 'prevzatie rozhodnutia aj následku – a nepokoj vtedy, keď sa ponúka len jedno z toho'),
    r('calibration', 'receptivity', 'reading the other person carefully enough that your own position arrives late', 'čítanie druhého človeka natoľko pozorné, že vlastné stanovisko prichádza neskoro'),
    r('feeling', 'receptivity', 'taking in the state of a room and carrying it afterwards, whether or not it was yours', 'vstrebanie stavu miestnosti a jeho nesenie potom, či už bol tvoj alebo nie'),
    r('visibility', 'expression', 'work that is not finished in your own accounting until somebody has met it', 'práca, ktorá pre teba nie je hotová, kým sa s ňou niekto nestretol'),
    r('exposure', 'improvisation', 'changing course readily and absorbing the cost of that as a normal expense', 'ochota zmeniť kurz a brať jej cenu ako bežný výdavok'),
    r('endurance', 'protection', 'holding on well, including past the point where holding on was the useful move', 'dobré držanie – aj za bodom, kde už bolo držanie tou správnou voľbou'),
    r('abstraction', 'investigation', 'reaching for the pattern under the case rather than settling the case', 'siahanie po vzorci pod prípadom namiesto vyriešenia prípadu'),
    r('practicality', 'control', 'measuring by whether the thing actually worked, not by whether it was done properly', 'meranie tým, či vec naozaj fungovala, nie tým, či bola urobená poriadne'),
    r('privacy', 'investigation', 'working it out alone and presenting the conclusion rather than the working', 'vyriešiť si to osamote a predložiť záver, nie postup'),
    r('deliberation', 'verification', 'waiting, then checking, and treating the wait as part of the checking', 'počkať, potom overiť – a brať to čakanie ako súčasť overovania'),
    r('foundation', 'endurance', 'building things meant to outlast the enthusiasm that started them', 'stavanie vecí, ktoré majú prežiť nadšenie, čo ich začalo'),
    r('speed', 'autonomy', 'moving first and explaining afterwards, which reads as decisiveness and costs consultation', 'pohnúť sa prvý a vysvetľovať potom – čo pôsobí ako rozhodnosť a stojí to konzultáciu'),
    r('receptivity', 'deliberation', 'letting the answer arrive rather than going to fetch it, which takes longer and is steadier', 'nechať odpoveď prísť namiesto toho ísť si po ňu – trvá to dlhšie a je to stálejšie'),
    r('embodiment', 'endurance', 'energy that renews on work it genuinely said yes to and drains on work it did not', 'energia, ktorá sa obnovuje na práci, ktorej naozaj povedala áno, a míňa sa na tej ostatnej'),
    r('standards', 'practicality', 'a bar set by whether it works rather than by whether it impresses', 'latka nastavená podľa toho, či to funguje, nie podľa toho, či to zapôsobí'),
    r('expression', 'calibration', 'saying it in the form the particular listener can actually take in', 'povedať to v podobe, ktorú konkrétny poslucháč naozaj prijme'),
]);
/**
 * COLLISION: the order of operations when two contributions pull apart.
 *
 * Each completes a paragraph that has already named both sides, so each starts
 * from the meeting rather than restating it.
 */
const COLLIDE = new Map([
    r('verification', 'embodiment', 'The answer tends to arrive before the explanation does. What follows is either a confirmation or a long argument that ends up back where it started, and telling those two apart early is most of the skill here.', 'Odpoveď zvykne prísť skôr než vysvetlenie. Nasleduje buď potvrdenie, alebo dlhé dohadovanie, ktoré skončí tam, kde začalo – a rozoznať tie dve veci zavčasu je tu väčšina zručnosti.'),
    r('investigation', 'speed', 'The depth is real and the timing is impatient with it. The recognisable version is months of quiet work and then a decision made in an afternoon, which looks careless from outside and is the opposite.', 'Hĺbka je skutočná a načasovanie s ňou nemá trpezlivosť. Poznať to tak, že po mesiacoch tichej práce príde rozhodnutie za jedno popoludnie – zvonku to vyzerá ľahkovážne a je to presne naopak.'),
    r('deliberation', 'speed', 'One half is ready long before the process meant to produce the answer has finished. The practical question is which one gets the final word, and it is usually settled by whoever is waiting in the room.', 'Jedna polovica je hotová dávno predtým, než dobehne postup, ktorý mal odpoveď priniesť. Praktická otázka je, ktorá z nich má posledné slovo – a zvyčajne to rozhodne ten, kto čaká v miestnosti.'),
    r('autonomy', 'calibration', 'The work gets done alone and then has to be brought to people who were not consulted while it was forming. That is workable; asking for input at the point where it can still change something is the part that tends to be skipped.', 'Práca sa urobí osamote a potom sa musí priniesť ľuďom, ktorých sa počas jej vzniku nikto nepýtal. To sa dá zvládnuť; preskočiť sa zvykne to pýtanie sa vo chvíli, keď ešte môže niečo zmeniť.'),
    r('method', 'improvisation', 'The plan gets built properly and then abandoned partway when conditions move. Both halves are load-bearing, so the version that works is planning that expects to be dropped rather than planning that expects to be followed.', 'Plán sa poriadne postaví a v polovici opustí, keď sa pohnú podmienky. Obe polovice sú nosné, takže funguje plánovanie, ktoré s opustením ráta – nie plánovanie, ktoré čaká dodržanie.'),
    r('protection', 'exposure', 'These divide by area rather than averaging into moderation: genuinely bold about one category of decision and immovable about another, with a boundary that looks arbitrary from outside and is consistent from inside.', 'Tieto sa rozdelia podľa oblastí, namiesto toho, aby sa spriemerovali do umiernenosti: v jednej kategórii rozhodnutí naozaj odvaha, v druhej ani krok – a hranica medzi nimi pôsobí zvonku náhodne, zvnútra je dôsledná.'),
    r('privacy', 'visibility', 'These coexist by compartment. Visible inside one defined role and close to unreachable outside it, which holds up until somebody who met the public half assumes it is the whole person.', 'Tieto spolunažívajú v priehradkách. Vidno ťa v jednej vymedzenej role a mimo nej sa k tebe takmer nedá dostať –čo drží dovtedy, kým si niekto, kto stretol tú verejnú polovicu, nemyslí, že je to celý človek.'),
    r('feeling', 'containment', 'The feeling and its display run on different clocks. Very little shows at the time and a great deal shows later, usually larger than the occasion warranted and usually to somebody who was not the cause.', 'Cit a jeho prejav idú podľa iných hodín. V danej chvíli sa ukáže veľmi málo a neskôr veľmi veľa – zvyčajne väčšmi, než k situácii patrilo, a zvyčajne niekomu, kto to nespôsobil.'),
    r('abstraction', 'practicality', 'The general rule and the case in hand both arrive quickly, and the failure is never in either of them - it is in the handover. One half proposes something the other half then has to actually build.', 'Všeobecné pravidlo aj konkrétny prípad prichádzajú rýchlo a zlyhanie nikdy nie je v jednom z nich – je v odovzdávaní medzi nimi. Jedna polovica navrhne niečo, čo tá druhá musí potom naozaj postaviť.'),
    r('endurance', 'improvisation', 'One half keeps an arrangement running and the other is ready to change it, and they rarely want it at the same moment. What the pair leaves open is timing: how long something is kept, and what it takes to reopen a decision that is still working.', 'Jedna polovica udržuje usporiadanie v chode, druhá je pripravená ho zmeniť, a málokedy to chcú v tej istej chvíli. Táto dvojica necháva otvorené načasovanie: ako dlho sa niečo udrží a čo treba na to, aby sa znovu otvorilo rozhodnutie, ktoré ešte funguje.'),
    r('control', 'receptivity', 'One half wants the outcome settled and the other needs input to settle it. The input tends to be asked for late - after the shape is already decided - which makes it feel like a formality to everybody involved.', 'Jedna polovica chce mať výsledok rozhodnutý, druhá naň potrebuje vstup od iných. O ten vstup sa zvykne pýtať neskoro – keď je tvar už rozhodnutý –, takže všetkým zúčastneným pripadá ako formalita.'),
    r('refinement', 'exposure', 'One half polishes and the other is willing to ship. Left alone the polishing wins, and the cost is a finished thing arriving after the moment that wanted it.', 'Jedna polovica dolaďuje, druhá je ochotná vypustiť. Keď sa to nechá tak, vyhrá dolaďovanie – a cenou je hotová vec, ktorá dorazí po chvíli, čo ju chcela.'),
    r('standards', 'calibration', 'The standard is internal and the audience is external, and they do not always want the same thing. The recurring situation is work that meets your own bar and lands wrong in the room, or the reverse.', 'Latka je vnútorná, publikum vonkajšie – a nechcú vždy to isté. Opakuje sa situácia, keď práca spĺňa tvoju vlastnú latku a v miestnosti dopadne zle, alebo naopak.'),
    r('expression', 'privacy', 'One half is good at putting it into words and the other decides how much gets out. The result is usually said well and says less than it knows, which reads as composure and is closer to editing.', 'Jedna polovica to vie dobre povedať, druhá rozhoduje, koľko z toho vyjde von. Výsledok býva povedaný dobre a hovorí menej, než vie – čo pôsobí ako vyrovnanosť a bližšie je to k redigovaniu.'),
    r('foundation', 'improvisation', 'One half wants solid ground and the other keeps moving it. The workable version is building foundations that are meant to be rebuilt, rather than treating each rebuild as a failure of the first one.', 'Jedna polovica chce pevnú pôdu, druhá ňou stále hýbe. Funguje verzia, kde sa základy stavajú s tým, že sa raz prestavajú – namiesto brania každej prestavby ako zlyhania tej prvej.'),
    r('embodiment', 'deliberation', 'The body has answered and the process has not caught up. Neither is wrong here: the signal is fast and the wave is real, and the workable order is registering the first response and then not acting on it immediately.', 'Telo odpovedalo a postup ešte nedobehol. Ani jedno tu nie je zle: signál je rýchly a vlna je skutočná, a funguje poradie, v ktorom si prvú odpoveď zaznamenáš a hneď podľa nej nekonáš.'),
    r('speed', 'protection', 'One half is already moving and the other is checking what it costs. This tends to resolve as movement followed by an expensive second look, rather than as caution arriving in time to matter.', 'Jedna polovica je už v pohybe, druhá počíta, čo to stojí. Zvykne sa to skončiť pohybom a potom drahým druhým pohľadom – nie opatrnosťou, ktorá príde včas na to, aby niečo zmenila.'),
    r('receptivity', 'autonomy', 'One half takes in what is around it and the other wants the decision to be its own. The friction is not about listening; it is about whether what came in is allowed to change the answer.', 'Jedna polovica berie dnu to, čo je okolo, druhá chce, aby rozhodnutie bolo vlastné. Trenie nie je o počúvaní – je o tom, či to, čo prišlo dnu, smie zmeniť odpoveď.'),
]);
const localised = (rule) => {
    if (!rule)
        return null;
    return activeLocale() === 'sk' ? rule.sk : rule.en;
};
/** What a pair pulling the same way is, more precisely than its theme label. */
export const reinforcementFor = (a, b) => localised(REINFORCE.get(key(a, b)));
/** What a pair pulling against each other produces, in order of operations. */
export const collisionFor = (a, b) => localised(COLLIDE.get(key(a, b)));
/**
 * WHICH CONTRIBUTIONS AN AXIS IS ACTUALLY ABOUT.
 *
 * Without this, a split on autonomy could be explained by a rule about pace,
 * because two of the results in play happened to carry `speed` and
 * `deliberation`. That rule is not false - those two results do meet that way -
 * but it answers a question the reader did not ask. So a rule whose tags belong
 * to the axis under discussion is preferred, and an off-axis rule is used only
 * when the axis has none.
 */
const AXIS_TAGS = {
    'inner-focus': ['investigation', 'privacy', 'receptivity', 'visibility', 'expression'],
    reasoning: ['verification', 'investigation', 'embodiment', 'deliberation', 'abstraction'],
    autonomy: ['autonomy', 'calibration', 'control', 'receptivity'],
    structure: ['method', 'foundation', 'improvisation', 'refinement', 'standards'],
    risk: ['exposure', 'protection', 'control', 'speed'],
    'emotional-expression': ['feeling', 'containment', 'expression', 'privacy'],
    visibility: ['visibility', 'privacy', 'expression'],
    change: ['endurance', 'improvisation', 'foundation', 'exposure'],
    initiative: ['speed', 'autonomy', 'receptivity', 'embodiment', 'deliberation'],
    abstraction: ['abstraction', 'practicality', 'method', 'investigation'],
};
/*
 * THE TAGS THAT BELONG TO ONE POLE, NOT TO THE AXIS IT SITS ON.
 *
 * AXIS_TAGS covers both ends of an opposition at once, which is right for a
 * collision - a collision IS the axis - and too coarse for a convergence, which
 * is one pole of it. `Independent direction` is the assertive pole of the
 * INITIATIVE axis, so an axis-level filter happily admitted a rule about moving
 * the moment a response arrives: on-axis, and about speed rather than
 * independence.
 *
 * So a convergence asks this first, and asks for BOTH tags of the pair to
 * belong to the pole: a sentence completing "what they share is narrower than
 * <theme>" has to be narrower than that theme, not adjacent to it. Below is the
 * axis pass, which still catches pairs the pole map has nothing to say about.
 *
 * The four unipolar dimensions are here too. They have no axis at all, so
 * before this they had no filter either, and `Steady endurance` was being
 * explained by a rule about working alone and presenting the conclusion.
 *
 * NOT A TAXONOMY CHANGE. The dimensions, the axes and their poles are exactly
 * as semanticTaxonomy.ts declares them. This says only which CONTRIBUTION tags
 * speak for which pole, which is a fact about the lexicon in this file.
 */
const POLE_TAGS = {
    introspective: ['investigation', 'privacy', 'receptivity'],
    'outwardly-engaged': ['visibility', 'expression'],
    analytical: ['verification', 'investigation', 'abstraction', 'deliberation'],
    intuitive: ['embodiment', 'receptivity'],
    independent: ['autonomy', 'control', 'privacy'],
    collaborative: ['calibration', 'receptivity'],
    structured: ['method', 'foundation', 'refinement', 'standards', 'verification'],
    adaptable: ['improvisation', 'speed'],
    cautious: ['protection', 'verification', 'deliberation'],
    'risk-oriented': ['exposure', 'speed', 'autonomy'],
    'emotionally-expressive': ['feeling', 'expression'],
    'emotionally-contained': ['containment', 'privacy'],
    private: ['privacy', 'containment'],
    social: ['visibility', 'expression', 'calibration'],
    'stability-seeking': ['endurance', 'foundation', 'protection'],
    'novelty-seeking': ['improvisation', 'exposure', 'speed'],
    assertive: ['speed', 'autonomy', 'control', 'expression'],
    receptive: ['receptivity', 'deliberation', 'embodiment', 'calibration'],
    practical: ['practicality', 'method', 'refinement', 'embodiment'],
    conceptual: ['abstraction', 'investigation'],
    /* Unipolar: no opposite, and so no axis to fall back on. */
    creative: ['improvisation', 'expression', 'exposure'],
    persistent: ['endurance', 'foundation', 'protection', 'method'],
    'emotionally-sensitive': ['feeling', 'receptivity', 'calibration'],
    communicative: ['expression', 'visibility', 'calibration'],
};
/**
 * The best rule across two sets of tags.
 *
 * Deterministic: pairs are generated in the tag order the contributions
 * declared them, and the first authored match wins. Tags are declared
 * most-characteristic-first in contributions.ts, so this prefers the meeting of
 * the two most characteristic contributions. When an axis is supplied, on-axis
 * pairs are tried before off-axis ones; when a dimension is supplied, pairs
 * wholly inside that pole are tried before either.
 *
 * `strict` REMOVES THE LAST PASS, AND THAT IS WHAT A CONVERGENCE NEEDS.
 *
 * A collision has already named both sides before its sentence arrives, so an
 * off-axis rule still describes the meeting the reader just read about. A
 * convergence has not: its sentence completes "what they share is narrower than
 * <theme>", and a clause that is narrower than some OTHER theme does not
 * complete that sentence - it contradicts it.
 *
 * That is exactly what shipped. `Structured method` drew a Manifesting
 * Generator and a Soul Urge 8, whose tags are speed and embodiment, and the
 * fallback pass handed it "moving the moment the response arrives, before the
 * reasons have been assembled" - a true statement about initiative printed as
 * the narrowing of a theme about structure. `Independent direction` drew the
 * investigation/verification pair and was given a sentence about digging until
 * the explanation holds up, which is deep processing.
 *
 * Strict means the pair must touch the theme's own axis. Where it cannot, the
 * caller prints the contributions and stops, which the composer already treats
 * as the normal outcome and which says less rather than something else.
 */
export function bestRule(left, right, relation, axis, exclude = new Set(), strict = false, dimension) {
    const lookup = relation === 'reinforce' ? reinforcementFor : collisionFor;
    const axisTags = axis ? AXIS_TAGS[axis] : undefined;
    const poleTags = dimension ? POLE_TAGS[dimension] : undefined;
    const passes = [];
    /* Both tags inside the pole: the sentence is about this theme and no other. */
    if (poleTags)
        passes.push((a, b) => poleTags.includes(a) && poleTags.includes(b));
    /*
     * At least one on the axis: wider, and right for a collision, which IS the
     * axis rather than one end of it.
     *
     * A convergence that has a pole never gets this pass, because an axis
     * contains the OPPOSITE pole as well. That is not theoretical: a profile
     * whose `Independent direction` rested on calibration and receptivity - the
     * collaborative end - was handed "reading the other person carefully enough
     * that your own position arrives late" and it read as on-axis, which it is,
     * and as a narrowing of independence, which it is the reverse of.
     */
    if (axisTags && !(strict && poleTags)) {
        passes.push((a, b) => axisTags.includes(a) || axisTags.includes(b));
    }
    /* Anything authored. A convergence never reaches here: its sentence claims to
       narrow a named theme, and a rule that matched nothing above is not about
       that theme. Saying less is the correct outcome, and the caller already
       treats a null as ordinary. */
    if (!strict || (!poleTags && !axisTags))
        passes.push(() => true);
    for (const accepts of passes) {
        for (const a of left) {
            for (const b of right) {
                if (a === b)
                    continue;
                if (!accepts(a, b))
                    continue;
                const text = lookup(a, b);
                /* Already used elsewhere in this reading: two different axes can share
                   a tag pair, and the same behavioural sentence under two headings
                   reads as a template rather than as two findings. */
                if (text && !exclude.has(text))
                    return { text, tags: [a, b] };
            }
        }
    }
    return null;
}
/** Poles with authored tags, for the coverage test. */
export const POLE_TAG_KEYS = Object.keys(POLE_TAGS);
/** Rule counts, for the coverage test. */
export const RULE_COUNTS = { reinforce: REINFORCE.size, collide: COLLIDE.size };
