/**
 * THE SPREADS - classic structures first, everything else only when they do not fit.
 *
 * A spread is a set of PLACES, each asking the card in it a different question,
 * arranged so that the answers build one argument rather than three notes. The
 * classic structures are used because they are established and because each is a
 * sound piece of reasoning:
 *
 *   past-present-future      influence -> condition -> direction
 *   situation-action-outcome condition -> response -> where the response leads
 *   problem-cause-solution   surface -> underlying dynamic -> constructive response
 *   self-other-relationship  your part -> the other side's part -> what is between
 *   option-a-b-guidance      one path -> another path -> what the choice turns on
 *   body-mind-spirit         practical -> mental and emotional -> meaning
 *
 * Every position is NEUTRAL (it names a place to look, not a conclusion), DISTINCT
 * (no two positions ask the same thing) and SPECIFIC (a description says what to
 * look for). Those properties are checked by `validateSpread`, which every
 * definition here passes, so a hand-written spread cannot fall below the standard
 * a generated one is held to.
 *
 * THE FUTURE IS A DIRECTION. A position that looks ahead is described as where
 * something tends if the present dynamic continues. No position says what will
 * happen.
 *
 * THE LAYOUT IS NOT THE ENGINE. A spread carries a card count, ordered positions
 * and a synthesis strategy; nothing downstream assumes three. A one-card spread,
 * a five-card spread and a layout of a dozen are all expressible, and the plan,
 * the voice and the validator read the definition rather than a constant.
 */
const text = (en, sk) => ({ en, sk });
const place = (id, fn, label, description) => ({ id, fn, label, description });
const define = (seed) => ({
    ...seed,
    minCards: seed.positions.length,
    maxCards: seed.positions.length,
});
/* ---------------------------------------------------------------- classic -- */
export const ONE_CARD_REFLECTION = define({
    id: 'one-card-reflection',
    name: text('One card', 'Jedna karta'),
    description: text('A single card for a single question: what it asks you to look at.', 'Jedna karta k jednej otázke: na čo ťa vyzýva pozrieť sa.'),
    positions: [place('focus', 'focus', text('The card for your question', 'Karta k tvojej otázke'), text('The one thing this card asks you to look at in relation to the question.', 'Jediná vec, na ktorú ťa táto karta vyzýva pozrieť sa v súvislosti s otázkou.'))],
    supportedIntents: ['general-reflection', 'open', 'self-development', 'emotional', 'spiritual'],
    synthesisStrategy: 'single',
    origin: 'classic',
});
export const PAST_PRESENT_FUTURE = define({
    id: 'past-present-future',
    name: text('Past, present, future', 'Minulosť, prítomnosť, budúcnosť'),
    description: text('How something developed, where it stands, and where it tends if the present dynamic continues.', 'Ako sa niečo vyvíjalo, kde to stojí a kam to smeruje, ak súčasná dynamika pokračuje.'),
    positions: [
        place('past', 'origin', text('The past influence', 'Vplyv z minulosti'), text('What has shaped this and is still carried into it - an influence, not an event.', 'Čo to formovalo a čo sa z toho stále nesie - vplyv, nie udalosť.')),
        place('present', 'state', text('The present condition', 'Súčasný stav'), text('Where things actually stand now, whatever they were meant to be.', 'Kde veci teraz naozaj stoja, nech mali byť akékoľvek.')),
        place('future', 'direction', text('The likely direction', 'Pravdepodobný smer'), text('Where this tends if the present dynamic continues - a direction, not a decided outcome.', 'Kam to smeruje, ak súčasná dynamika pokračuje - smer, nie rozhodnutý výsledok.')),
    ],
    supportedIntents: ['temporal-outlook', 'career', 'relationship', 'self-development'],
    synthesisStrategy: 'sequence',
    origin: 'classic',
});
export const SITUATION_ACTION_OUTCOME = define({
    id: 'situation-action-outcome',
    name: text('Situation, action, outcome', 'Situácia, konanie, výsledok'),
    description: text('The situation as it stands, the response that fits it, and where that response tends to lead.', 'Situácia taká, aká je, odpoveď, ktorá jej sedí, a kam táto odpoveď smeruje.'),
    positions: [
        place('situation', 'state', text('The situation', 'Situácia'), text('The situation as it stands, stripped of how it is hoped or feared to be.', 'Situácia taká, aká je, bez toho, ako sa dúfa alebo obáva.')),
        place('action', 'response', text('The useful response', 'Užitočná odpoveď'), text('The response that fits this situation - a stance to take, not an order.', 'Odpoveď, ktorá tejto situácii sedí - postoj, nie príkaz.')),
        place('outcome', 'direction', text('Where it may lead', 'Kam to môže viesť'), text('Where this response tends to lead, as a direction rather than a promise.', 'Kam táto odpoveď smeruje, ako smer, nie ako sľub.')),
    ],
    supportedIntents: ['action-guidance', 'career', 'creativity', 'self-development', 'relationship'],
    synthesisStrategy: 'sequence',
    origin: 'classic',
});
export const PROBLEM_CAUSE_SOLUTION = define({
    id: 'problem-cause-solution',
    name: text('Problem, cause, solution', 'Problém, príčina, riešenie'),
    description: text('The difficulty as it shows, the dynamic underneath that keeps it going, and a constructive response to that dynamic.', 'Ťažkosť tak, ako sa ukazuje, dynamika pod ňou, ktorá ju udržiava, a konštruktívna odpoveď na tú dynamiku.'),
    positions: [
        place('problem', 'state', text('The visible problem', 'Viditeľný problém'), text('The difficulty as it shows on the surface.', 'Ťažkosť tak, ako sa ukazuje na povrchu.')),
        place('cause', 'driver', text('The underlying dynamic', 'Podstatná dynamika'), text('The dynamic underneath that keeps the pattern going.', 'Dynamika pod povrchom, ktorá ten vzorec udržiava.')),
        place('solution', 'response', text('A constructive response', 'Konštruktívna odpoveď'), text('A response to that underlying dynamic - a stance to take, with no promise attached.', 'Odpoveď na tú podstatnú dynamiku - postoj, bez pripojeného sľubu.')),
    ],
    supportedIntents: ['problem-blockage', 'creativity', 'emotional', 'career'],
    synthesisStrategy: 'sequence',
    origin: 'classic',
});
export const SELF_OTHER_RELATIONSHIP = define({
    id: 'self-other-relationship',
    name: text('Self, other, relationship', 'Ty, druhá strana, vzťah'),
    description: text('Your part, how the other side can look from here, and the dynamic that exists between you.', 'Tvoja časť, ako môže druhá strana vyzerať odtiaľto, a dynamika, ktorá medzi vami existuje.'),
    positions: [
        place('self', 'state', text('You', 'Ty'), text('Your own part in this: how you stand in it.', 'Tvoja vlastná časť v tom: ako v tom stojíš.')),
        place('other', 'other', text('The other side', 'Druhá strana'), text('How the other side can look from here - a stance or a role, not what they privately think or feel.', 'Ako môže druhá strana vyzerať odtiaľto - postoj alebo rola, nie to, čo si súkromne myslí alebo cíti.')),
        place('relationship', 'meeting', text('What is between you', 'Čo je medzi vami'), text('The dynamic that exists between you, which neither side owns alone.', 'Dynamika, ktorá medzi vami existuje a ktorú nevlastní ani jedna strana sama.')),
    ],
    supportedIntents: ['relationship'],
    synthesisStrategy: 'self-other-meeting',
    origin: 'classic',
});
export const OPTION_A_B_GUIDANCE = define({
    id: 'option-a-b-guidance',
    name: text('Option A, option B, guidance', 'Možnosť A, možnosť B, usmernenie'),
    description: text('What each of two options holds, and the factor the choice actually turns on. It does not pick a winner.', 'Čo drží každá z dvoch možností a faktor, na ktorom voľba naozaj stojí. Nevyberá víťaza.'),
    positions: [
        place('option-a', 'option', text('Option A', 'Možnosť A'), text('What the first option holds: what it opens and what it costs.', 'Čo drží prvá možnosť: čo otvára a čo stojí.')),
        place('option-b', 'option', text('Option B', 'Možnosť B'), text('What the second option holds: what it opens and what it costs.', 'Čo drží druhá možnosť: čo otvára a čo stojí.')),
        place('guidance', 'criterion', text('What the choice turns on', 'Na čom voľba stojí'), text('The factor the choice actually turns on - not a winner.', 'Faktor, na ktorom voľba naozaj stojí - nie víťaz.')),
    ],
    supportedIntents: ['binary-decision'],
    synthesisStrategy: 'options-criterion',
    origin: 'classic',
});
export const BODY_MIND_SPIRIT = define({
    id: 'body-mind-spirit',
    name: text('Body, mind, spirit', 'Telo, myseľ, duch'),
    description: text('The practical side, the mental and emotional side, and what it is about underneath - read for balance.', 'Praktická stránka, mentálna a emočná stránka a to, o čom to je pod povrchom - čítané ako rovnováha.'),
    positions: [
        place('body', 'embodied', text('Practical life', 'Praktický život'), text('The practical, lived side: energy, routine, resources and how things are actually carried.', 'Praktická, žitá stránka: energia, rutina, zdroje a to, ako sa veci skutočne nesú.')),
        place('mind', 'mental', text('Mind and feeling', 'Myseľ a cítenie'), text('The mental and emotional side: how it is thought about and felt.', 'Mentálna a emočná stránka: ako sa o tom premýšľa a ako sa to cíti.')),
        place('spirit', 'meaning', text('Meaning and values', 'Zmysel a hodnoty'), text('The deeper side: what it is about underneath, and what matters in it.', 'Hlbšia stránka: o čom to je pod povrchom a čo na tom záleží.')),
    ],
    supportedIntents: ['general-reflection', 'emotional', 'spiritual', 'open'],
    synthesisStrategy: 'layers',
    origin: 'classic',
});
/* ----------------------------------------------------------------- policy -- */
/**
 * The spread for a subject a card cannot settle. It reads how a person STANDS
 * toward the subject - never the subject - and has no place that looks ahead.
 */
export const STEADYING_REFLECTION = define({
    id: 'steadying-reflection',
    name: text('Steadying reflection', 'Upokojujúca reflexia'),
    description: text('How you stand toward this, what makes it heavy to hold, and what can steady you.', 'Ako voči tomu stojíš, čo to robí ťažkým a čo ťa môže podržať.'),
    positions: [
        place('standing', 'state', text('Where you stand', 'Kde stojíš'), text('How you stand toward this right now, without a judgement attached.', 'Ako voči tomu teraz stojíš, bez pripojeného súdu.')),
        place('weight', 'driver', text('What weighs', 'Čo ťaží'), text('What makes this heavy to hold.', 'Čo robí toto ťažkým na nesenie.')),
        place('support', 'response', text('What can steady you', 'Čo ťa môže podržať'), text('What can steady you in holding it - a stance, not a solution.', 'Čo ťa môže podržať pri nesení - postoj, nie riešenie.')),
    ],
    supportedIntents: [],
    synthesisStrategy: 'sequence',
    origin: 'policy',
});
/* ----------------------------------------------------------------- custom -- */
/**
 * Spreads built for the SHAPE of a question that no classic structure answers
 * cleanly. They are not used to make a reading look personal: each exists
 * because the question asks something the classics do not, and each passes the
 * same validation as a classic.
 */
export const SUPPORT_RESISTANCE_KEY = define({
    id: 'support-resistance-key',
    name: text('Support, resistance, key', 'Opora, odpor, kľúč'),
    description: text('For a question that asks whether something will happen: what supports it, what works against it, and what it turns on. It never answers yes or no.', 'Pre otázku, či sa niečo stane: čo to podporuje, čo proti tomu pôsobí a na čom to stojí. Nikdy neodpovedá áno alebo nie.'),
    positions: [
        place('supports', 'supporting', text('What supports it', 'Čo to podporuje'), text('The conditions already helping this along.', 'Podmienky, ktoré tomu už teraz pomáhajú.')),
        place('resists', 'resisting', text('What works against it', 'Čo proti tomu pôsobí'), text('The friction or obstacles it has to get past.', 'Trenie alebo prekážky, ktoré musí prekonať.')),
        place('key', 'criterion', text('What it turns on', 'Na čom to stojí'), text('The factor that matters most to how this develops from here.', 'Faktor, od ktorého najviac závisí, ako sa to odtiaľto vyvíja.')),
    ],
    supportedIntents: ['temporal-outlook'],
    synthesisStrategy: 'options-criterion',
    origin: 'custom',
});
export const BLIND_SPOT_VIEW = define({
    id: 'blind-spot-view',
    name: text('Seen and unseen', 'Viditeľné a neviditeľné'),
    description: text('What is already in view, what may lie outside it, and what would shift once it is seen.', 'Čo je už vidieť, čo môže byť mimo zorného poľa a čo by sa zmenilo, keby sa to uvidelo.'),
    positions: [
        place('seen', 'state', text('What you can already see', 'Čo už vidíš'), text('What is already in view, as clearly as it can be stated.', 'Čo je už vidieť, tak jasne, ako sa to dá povedať.')),
        place('unseen', 'driver', text('What may be outside your view', 'Čo môže byť mimo tvojho zorného poľa'), text('A possibility the cards raise about what is not yet in view - not a fact they establish.', 'Možnosť, ktorú karty nastoľujú o tom, čo ešte nie je vidieť - nie fakt, ktorý by preukazovali.')),
        place('shift', 'response', text('What would shift once it is seen', 'Čo by sa zmenilo, keby sa to uvidelo'), text('What would change in how you act if the unseen part came into view.', 'Čo by sa zmenilo v tom, ako konáš, keby sa neviditeľná časť dostala do zorného poľa.')),
    ],
    supportedIntents: ['general-reflection', 'relationship', 'self-development', 'emotional', 'open'],
    synthesisStrategy: 'sequence',
    origin: 'custom',
});
export const RESOURCES_VIEW = define({
    id: 'resources-view',
    name: text('What you carry', 'Čo nesieš'),
    description: text('What you already bring, what else is available to you, and where it could be put to use.', 'Čo už prinášaš, čo ďalšie ti je k dispozícii a kde sa to dá použiť.'),
    positions: [
        place('carried', 'state', text('What you already carry', 'Čo už nesieš'), text('The strengths and habits you already bring to this.', 'Silné stránky a návyky, ktoré do tohto už prinášaš.')),
        place('available', 'supporting', text('What is available to you', 'Čo je ti k dispozícii'), text('What else is within reach beyond what you already carry.', 'Čo ďalšie je na dosah okrem toho, čo už nesieš.')),
        place('use', 'response', text('Where it could be used', 'Kde sa to dá použiť'), text('Where these resources could be put to use - a direction to try, not a plan.', 'Kde by sa tieto zdroje dali použiť - smer na vyskúšanie, nie plán.')),
    ],
    supportedIntents: ['self-development', 'career', 'creativity', 'general-reflection', 'open'],
    synthesisStrategy: 'sequence',
    origin: 'custom',
});
/* --------------------------------------------------------------- registry -- */
export const CLASSIC_SPREADS = [
    ONE_CARD_REFLECTION, PAST_PRESENT_FUTURE, SITUATION_ACTION_OUTCOME, PROBLEM_CAUSE_SOLUTION,
    SELF_OTHER_RELATIONSHIP, OPTION_A_B_GUIDANCE, BODY_MIND_SPIRIT,
];
export const CUSTOM_SPREADS = [SUPPORT_RESISTANCE_KEY, BLIND_SPOT_VIEW, RESOURCES_VIEW];
export const ALL_SPREADS = [...CLASSIC_SPREADS, ...CUSTOM_SPREADS, STEADYING_REFLECTION];
const BY_ID = new Map(ALL_SPREADS.map((spread) => [spread.id, spread]));
export const getSpread = (id) => BY_ID.get(id) ?? null;
