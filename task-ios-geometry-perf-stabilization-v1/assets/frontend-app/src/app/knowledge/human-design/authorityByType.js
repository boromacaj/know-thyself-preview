import { activeLocale } from '../../i18n/locale.js?v=d9f39e7';
const TYPES = {
    manifestor: {
        label: 'Manifestor', tempo: 'initiating',
        does: 'start things without waiting for anybody to ask',
    },
    generator: {
        label: 'Generator', tempo: 'responding',
        does: 'meet what actually turns up rather than go looking for it',
    },
    'manifesting-generator': {
        label: 'Manifesting Generator', tempo: 'responding',
        does: 'respond and then move on it faster than anybody expected',
    },
    projector: {
        label: 'Projector', tempo: 'waiting',
        does: 'see how a system or a person works and be asked about it',
    },
    reflector: {
        label: 'Reflector', tempo: 'sampling',
        does: 'take the temperature of a place over time rather than hold a fixed one',
    },
};
const AUTHORITIES = {
    'emotional-solar-plexus': {
        label: 'Emotional', tempo: 'delayed',
        arrives: 'over a wave rather than in a moment, so the same question reads differently at different points on it',
        costs: 'decisions taken at the top or the bottom of a wave and regretted from the middle of the next one',
    },
    sacral: {
        label: 'Sacral', tempo: 'immediate',
        arrives: 'in the body, the moment the question is actually asked, as an opening or a closing',
        costs: 'energy that never turns up for the thing you agreed to, and an exhaustion that names the yes as false',
    },
    splenic: {
        label: 'Splenic', tempo: 'immediate',
        arrives: 'once, quietly, in the instant - and it does not repeat itself for anybody',
        costs: 'a first impression that turns out to have been right, overruled by an argument that came later',
    },
    'ego-manifested': {
        label: 'Ego', tempo: 'immediate',
        arrives: 'as what you actually want and are willing to promise, which is a narrower question than what is good',
        costs: 'commitments made because they were reasonable, kept out of pride, and resented throughout',
    },
    'ego-projected': {
        label: 'Ego', tempo: 'immediate',
        arrives: 'as what you actually want, heard in what you find yourself saying about it',
        costs: 'commitments made because they were reasonable, kept out of pride, and resented throughout',
    },
    'self-projected': {
        label: 'Self-projected', tempo: 'dialogic',
        arrives: 'in your own voice - you find out what is true by hearing yourself say it to somebody',
        costs: 'a direction decided silently, which is the one way this authority cannot be consulted',
    },
    'mental-environmental': {
        label: 'Mental', tempo: 'dialogic',
        arrives: 'through talking it out in the right place, where the environment matters as much as the argument',
        costs: 'a conclusion reached alone at a desk, which feels rigorous and is the one condition this cannot work in',
    },
    lunar: {
        label: 'Lunar', tempo: 'delayed',
        arrives: 'across roughly a month, as the same question is met in a run of different environments',
        costs: 'a decision taken on one day\'s reading of a place, which is a sample of one',
    },
};
const fitFor = (type, authority) => {
    if (authority.tempo === 'dialogic')
        return 'indirect';
    const typeIsFast = type.tempo === 'initiating' || type.tempo === 'responding';
    if (authority.tempo === 'delayed')
        return typeIsFast ? 'slows' : 'aligned';
    /* immediate */
    return typeIsFast ? 'aligned' : 'quickens';
};
const EN = {
    aligned: (type, authority) => [
        `Read against your Type, this authority is working with the grain rather than against it. `
            + `You are a design built to ${type.does}, and the signal arrives ${authority.arrives}. The `
            + `two agree about tempo, which means the decision and the doing are not fighting each other `
            + `for control of the same moment.`,
        `That is a genuine advantage and it has one consequence worth naming. Because nothing in the `
            + `pairing forces a pause, there is no built-in check on a decision that was made correctly `
            + `and answered the wrong question. Going against the authority still shows up as `
            + `${authority.costs}, and it is easier to miss here than in a design where the two argue.`,
    ],
    slows: (type, authority) => [
        `This is the pairing worth understanding rather than smoothing over, because your Type and `
            + `your authority disagree about time. You are a design built to ${type.does}. The signal, `
            + `though, arrives ${authority.arrives}.`,
        `So the instruction is not to deliberate - the mind will happily do that instead and it is `
            + `not the same thing - but simply to let time pass and meet the same question more than `
            + `once. Almost every serious misstep available to this combination is the same one: the `
            + `design moved at its own speed on a signal that had not finished arriving. It shows up as `
            + `${authority.costs}.`,
    ],
    quickens: (type, authority) => [
        `Your Type and your authority run at different speeds, and here it is the authority that is `
            + `the quicker of the two. You are a design built to ${type.does}, which is a waiting `
            + `posture - and the signal arrives ${authority.arrives}.`,
        `The practical difficulty is that a fast signal inside a slow design is easy to talk out of. `
            + `By the time the recognition or the invitation you were waiting for turns up, the answer `
            + `has usually already been given and forgotten. Going against it shows up as `
            + `${authority.costs}, and the correction is to note the signal when it happens rather than `
            + `to reconstruct it afterwards.`,
    ],
    indirect: (type, authority) => [
        `There is a specific requirement in how these two fit together. You are a design built to `
            + `${type.does}, and the signal arrives ${authority.arrives} - which means this authority `
            + `cannot be consulted privately. It needs another person in the room, and not as an adviser: `
            + `their opinion is not the point, their presence is.`,
        `That is an awkward thing to arrange deliberately and it is the whole mechanism. Going `
            + `against it shows up as ${authority.costs}. What works is a small number of people who will `
            + `let you talk without solving anything, and the discipline of not settling a real question `
            + `in your own head first.`,
    ],
};
/* ------------------------------------------------------------------- Slovak */
const SK_TYPES = {
    manifestor: 'začínať veci bez toho, aby o to niekto požiadal',
    generator: 'stretať to, čo naozaj príde, namiesto hľadať to',
    'manifesting-generator': 'odpovedať a potom sa na to pohnúť rýchlejšie, než ktokoľvek čakal',
    projector: 'vidieť, ako systém alebo človek funguje, a byť na to opýtaný',
    reflector: 'brať teplotu miesta v čase namiesto držať jednu vlastnú',
};
const SK_ARRIVES = {
    'emotional-solar-plexus': 'cez vlnu, nie v jednom okamihu, takže tá istá otázka znie v rôznych bodoch inak',
    sacral: 'v tele, vo chvíli, keď je otázka naozaj položená, ako otvorenie alebo zatvorenie',
    splenic: 'raz, potichu, v okamihu — a pre nikoho sa neopakuje',
    'ego-manifested': 'ako to, čo naozaj chceš a čo dokážeš sľúbiť, čo je užšia otázka než to, čo je dobré',
    'ego-projected': 'ako to, čo naozaj chceš, počuté v tom, čo o tom sám hovoríš',
    'self-projected': 'vo vlastnom hlase — čo je pravda, zistíš tak, že to niekomu povieš nahlas',
    'mental-environmental': 'cez vyrozprávanie na správnom mieste, kde na prostredí záleží rovnako ako na argumente',
    lunar: 'v priebehu asi mesiaca, ako sa tá istá otázka stretne v rade rôznych prostredí',
};
const SK_COSTS = {
    'emotional-solar-plexus': 'rozhodnutia prijaté na hrebeni alebo na dne vlny a ľutované zo stredu tej ďalšej',
    sacral: 'energia, ktorá sa na dohodnutú vec nikdy nedostaví, a vyčerpanie, ktoré to áno označí za nepravé',
    splenic: 'prvý dojem, ktorý sa ukázal ako správny, prehlasovaný argumentom, čo prišiel neskôr',
    'ego-manifested': 'záväzky prijaté preto, že boli rozumné, držané zo cti a celý čas nesené s nevôľou',
    'ego-projected': 'záväzky prijaté preto, že boli rozumné, držané zo cti a celý čas nesené s nevôľou',
    'self-projected': 'smer rozhodnutý potichu — čo je jediný spôsob, akým sa táto autorita nedá vôbec použiť',
    'mental-environmental': 'záver dosiahnutý osamote za stolom, čo pôsobí dôsledne a je to jediná podmienka, v ktorej toto fungovať nevie',
    lunar: 'rozhodnutie prijaté podľa toho, ako sa miesto javilo v jeden deň, čo je vzorka o veľkosti jeden',
};
const SK_FRAMES = {
    aligned: (t, a) => [
        `Čítané oproti tvojmu typu ide táto autorita po srsti, nie proti nej. Si dizajn stavaný `
            + `${SK_TYPES[t]} a signál prichádza ${SK_ARRIVES[a]}. Tie dve sa v tempe zhodujú, takže `
            + `rozhodnutie a konanie nebojujú o ten istý okamih.`,
        `Je to skutočná výhoda a má jeden dôsledok, ktorý stojí za pomenovanie. Keďže nič v tejto `
            + `dvojici nevynúti pauzu, niet vstavanej poistky proti rozhodnutiu, ktoré padlo správne a `
            + `odpovedalo na nesprávnu otázku. Ísť proti autorite sa aj tak prejaví ako ${SK_COSTS[a]} — `
            + `a tu sa to prehliadne ľahšie než v dizajne, kde si tie dve protirečia.`,
    ],
    slows: (t, a) => [
        `Toto je dvojica, ktorej sa oplatí rozumieť, nie ju obchádzať, lebo tvoj typ a tvoja autorita `
            + `sa nezhodujú v čase. Si dizajn stavaný ${SK_TYPES[t]}. Lenže signál prichádza ${SK_ARRIVES[a]}.`,
        `Pokynom teda nie je zvažovať — to myseľ ochotne urobí namiesto toho a nie je to to isté — ale `
            + `jednoducho nechať prejsť čas a stretnúť tú istú otázku viackrát. Takmer každý vážny prešľap `
            + `dostupný tejto kombinácii je ten istý: dizajn sa pohol vlastným tempom na signáli, ktorý `
            + `ešte nedorazil celý. Prejaví sa to ako ${SK_COSTS[a]}.`,
    ],
    quickens: (t, a) => [
        `Tvoj typ a tvoja autorita bežia rôznym tempom a rýchlejšou z tých dvoch je tu autorita. Si `
            + `dizajn stavaný ${SK_TYPES[t]}, čo je čakajúci postoj — a signál prichádza ${SK_ARRIVES[a]}.`,
        `Praktická ťažkosť je, že rýchly signál v pomalom dizajne sa dá ľahko rozhovoriť. Kým dorazí `
            + `pozvanie alebo uznanie, na ktoré sa čakalo, odpoveď býva už dávno daná a zabudnutá. Ísť `
            + `proti nej sa prejaví ako ${SK_COSTS[a]} a nápravou je zaznamenať signál vtedy, keď sa `
            + `stane, nie ho potom rekonštruovať.`,
    ],
    indirect: (t, a) => [
        `V tom, ako tieto dve do seba zapadajú, je celkom konkrétna požiadavka. Si dizajn stavaný `
            + `${SK_TYPES[t]} a signál prichádza ${SK_ARRIVES[a]} — čo znamená, že túto autoritu sa nedá `
            + `použiť v súkromí. Potrebuje v miestnosti druhého človeka, a nie ako poradcu: nejde o jeho `
            + `názor, ale o jeho prítomnosť.`,
        `Zariadiť to zámerne je nepohodlné a je to celý ten mechanizmus. Ísť proti nemu sa prejaví ako `
            + `${SK_COSTS[a]}. Funguje pár ľudí, ktorí ťa nechajú hovoriť bez toho, aby čokoľvek riešili, a `
            + `disciplína neuzavrieť si skutočnú otázku najprv vo vlastnej hlave.`,
    ],
};
const AUTHORITY_TYPE_PROVENANCE = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'What each Type does with a decision and how each Authority delivers one are the system\'s '
        + 'settled mechanics, stated the same way by every source that teaches it. That the two can '
        + 'disagree about TEMPO - a design built to move immediately carrying an authority with no '
        + 'clarity in the moment - follows from those mechanics rather than from any one teacher, and '
        + 'the reading of what that produces in a life is this project\'s.',
    traditions: ['Human Design mechanics'],
    sources: ['RESEARCH_HUMAN_DESIGN#type-authority', 'RESEARCH_HUMAN_DESIGN#types'],
};
/**
 * The type-conditioned readings for one authority.
 *
 * One overlay per type, on the authority's own unit, because the authority is
 * the thing being qualified: a reader arrives at "how you make decisions" and
 * the question they have is what that means for THEIR design. Only the pairing
 * a real BodyGraph produced ever fires.
 */
export function authorityByTypeOverlays(authorityKey) {
    const authority = AUTHORITIES[authorityKey];
    if (!authority)
        return [];
    return Object.entries(TYPES).map(([typeKey, type]) => ({
        id: `hd.authority.${authorityKey}.type-${typeKey}`,
        condition: `The chart is a ${type.label} with ${authority.label} authority.`,
        applies: (context) => context.type === typeKey,
        priority: 10,
        effect: 'weave-after-core',
        prose: () => (activeLocale() === 'sk'
            ? SK_FRAMES[fitFor(type, authority)](typeKey, authorityKey)
            : EN[fitFor(type, authority)](type, authority)),
        /* No semantics: both sides are already weighted by their own units, and
           this says how they meet rather than adding a trait to the chart. */
        provenance: AUTHORITY_TYPE_PROVENANCE,
    }));
}
/** Exported so a test can check the tempo model against the mechanics. */
export const AUTHORITY_TEMPO = Object.fromEntries(Object.entries(AUTHORITIES).map(([key, a]) => [key, a.tempo]));
export const TYPE_TEMPO = Object.fromEntries(Object.entries(TYPES).map(([key, t]) => [key, t.tempo]));
export const fitBetween = (typeKey, authorityKey) => {
    const type = TYPES[typeKey];
    const authority = AUTHORITIES[authorityKey];
    return type && authority ? fitFor(type, authority) : null;
};
