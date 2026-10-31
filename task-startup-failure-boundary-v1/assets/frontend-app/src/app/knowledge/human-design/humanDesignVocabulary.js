import { unitId, } from '../knowledgeTypes.js?v=2ea79e9';
import { sig } from '../semanticDimensions.js?v=2ea79e9';
/**
 * HUMAN DESIGN VOCABULARY.
 *
 * Every key here comes from humanDesignKeys.ts, which normalises the engine's
 * own display strings. Nothing in this file invents an identifier.
 *
 * Provenance note that applies to the whole system. Human Design was authored by
 * one person (Ra Uru Hu, 1987) and is transmitted through a single body of
 * teaching rather than through competing scholarly traditions. That makes its
 * internal terminology unusually consistent and means it has no external
 * verification of the kind astrology's Hellenistic sources or BaZi's classical
 * texts at least provide. Everything below is therefore 'established' in the
 * narrow sense of being what the system itself uniformly says, and that is the
 * strongest claim available. See RESEARCH_HUMAN_DESIGN#provenance.
 */
const SYSTEM = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'Uniform across the Human Design canon and its teaching lineages; the system has a single origin, so agreement within it is not independent corroboration.',
    traditions: ['Human Design (Jovian Archive lineage)'],
    sources: ['RESEARCH_HUMAN_DESIGN#canon'],
};
function term(kind, key, label, role, headline, core, semantics, provenance = SYSTEM) {
    return {
        id: unitId('human-design', kind, key, role),
        entity: { system: 'human-design', kind, key, label },
        role,
        headline,
        core,
        semantics,
        provenance,
    };
}
/* --------------------------------------------------------------- types -- */
/* Types are registered as base archetypes. The CONTEXTUAL reading - this Type
   as it behaves under a particular Authority and Profile - is a separate unit at
   role 'type-role', built in humanDesignComposition.ts. */
const type = (key, label, headline, core, s) => term('hd-type', key, label, 'base-archetype', headline, core, s);
export const HD_TYPES = [
    type('generator', 'Generator', 'Built to sustain: energy that renews when it is spent on the right thing.', [
        'A Generator has a defined Sacral, which the system treats as a renewable engine rather than a battery. The energy is genuinely there, and it comes back, but only when it has been spent on something the body actually said yes to. Spent on the wrong thing it does not renew, and the result is the specific exhaustion this Type knows well: tired, and not from working too hard.',
        'The mechanism the system gives for telling the difference is response. The Sacral answers what is in front of it rather than generating direction from nothing, so the reliable move is to put yourself where things can arrive and then notice what your body opens toward. That is a slower way to live than deciding, and it is the difference between work that feeds you and work that drains you.',
    ], [sig('stability-seeking', 0.6), sig('adaptable', 0.4)]),
    type('manifesting-generator', 'Manifesting Generator', 'The same engine, with a shortcut and an obligation.', [
        'A Manifesting Generator has the Sacral engine of a Generator with a motor connected to the Throat, and the combination produces a distinctive way of moving: multi-directional, fast, and inclined to skip whatever step turns out not to have been necessary. The skipping is not carelessness. It is how this design finds the efficient route, and it usually turns out to have been right.',
        'The complication is that the speed leaves people behind. Because the motor reaches the Throat directly, a Manifesting Generator can be underway before anyone has been told, and the resistance that comes back is not really about the decision - it is about the surprise. That is why the strategy carries a second half that the plain Generator does not need.',
    ], [sig('adaptable', 0.6), sig('novelty-seeking', 0.6), sig('stability-seeking', 0.4), sig('risk-oriented', 0.4)]),
    type('manifestor', 'Manifestor', 'Built to initiate, and to meet resistance for it.', [
        'A Manifestor has a motor connected to the Throat with no defined Sacral, which in the language of the system means the capacity to start things without waiting for anything to arrive. This is the only Type designed to initiate, and the energy comes in bursts rather than steadily - real force, available for a while, followed by a genuine need to stop.',
        'The recurring experience of this design is resistance from other people, and the system reads it as a reaction to being taken by surprise rather than to the initiative itself. Informing before acting is not asking permission and the distinction matters: the point is to remove the surprise, which removes most of the resistance, and it costs nothing except the habit of explaining yourself to people who are affected.',
    ], [sig('independent', 0.8), sig('assertive', 0.7), sig('risk-oriented', 0.5), sig('independent', 0.3)]),
    type('projector', 'Projector', 'Built to see the system, not to run it.', [
        'A Projector has no motor connected to the Throat and no defined Sacral, and the system treats this not as a deficit but as a different function: the capacity to see how another person, or a whole organisation, actually works. That perception is unusually accurate and it is the thing this design has to offer.',
        'The difficulty is that it cannot be pushed at anyone. Offered without being asked for, the same insight lands as interference, and the years spent trying to keep up with the energy of Generators produce the bitterness the system names as this Type not-self theme. Waiting for recognition and invitation sounds passive and is not; it is the recognition that this perception only works where it has been asked for.',
    ], [sig('analytical', 0.7), sig('introspective', 0.5), sig('emotionally-sensitive', 0.6), sig('collaborative', 0.4)]),
    type('reflector', 'Reflector', 'No defined centres: a mirror of whatever is around it.', [
        'A Reflector has no defined centres at all, which makes this the rarest design by a wide margin and the one most completely shaped by environment. Rather than having a fixed way of being, a Reflector samples what is present and reflects it back, which makes them an unusually accurate instrument for the health of a group.',
        'The practical consequence is that place and company matter more here than anywhere else in the system, and that decisions need time. The suggested measure is a full lunar cycle, roughly twenty-eight days, on the reasoning that a design without fixed definition needs to see a decision from every angle the moon supplies before it can know its own position on it.',
    ], [sig('adaptable', 0.9), sig('emotionally-sensitive', 0.9), sig('novelty-seeking', 0.5)]),
];
/* ---------------------------------------------------------- strategies -- */
const strategy = (key, label, headline, core) => term('hd-strategy', key, label, 'base-archetype', headline, [core], []);
export const HD_STRATEGIES = [
    strategy('respond', 'Respond', 'Let it arrive first.', 'Response means waiting until something is actually in front of you before deciding about it. It is not passivity - you are responsible for putting yourself where things can arrive - it is the recognition that the Sacral answers questions and does not originate them.'),
    strategy('respond-then-inform', 'Respond, then inform', 'Let it arrive, then say what you are doing.', 'Two steps, and both are load-bearing. Response keeps the energy honest; informing keeps the people affected from being ambushed by how quickly you moved. The second step is the one that gets skipped, and it is the one that determines how much resistance the design meets.'),
    strategy('inform-before-acting', 'Inform before acting', 'Say it first, then go.', 'Informing is not asking. The point is to remove the surprise for people your initiative will affect, which is what most of the resistance a Manifestor meets is actually about, and it costs one sentence delivered before the fact rather than a negotiation after it.'),
    strategy('wait-for-recognition-and-invitation', 'Wait for recognition and invitation', 'Be seen before you speak.', 'The insight this design carries only works where it has been asked for. Waiting means declining to push it at people who have not recognised it, and it is a strategy for effectiveness rather than for modesty - the same observation lands as wisdom when invited and as criticism when not.'),
    strategy('wait-through-a-lunar-cycle', 'Wait through a lunar cycle', 'Give the decision a month.', 'A design with no fixed definition reads differently depending on who and what is around it, so a decision made in one week is a decision made in one set of conditions. The lunar cycle is the interval the system gives for seeing it under all of them.'),
];
/* Authorities are authored in full in hdTypesAuthorities.ts. The one-paragraph
   versions that used to live here were breadth-first scaffolding and are gone. */
export const HD_AUTHORITIES = [];
/* All twelve Profiles are authored in hdProfiles.ts. */
export const HD_PROFILES = [];
/* The nine centres are authored in hdCenters.ts, in both states, as separate
   units keyed `<centre>-defined` and `<centre>-open`. */
export const HD_CENTERS = [];
/* ----------------------------------- definition, signature, structures -- */
export const HD_STRUCTURES = [
    /* Definitions, the Incarnation Cross and the four Variables are authored in
       hdTypesAuthorities.ts and hdCrossVariables.ts. What remains here is the
       generic explanation of what a gate and a channel ARE, which is still the
       right thing to show a reader who has never met the vocabulary. */
    term('hd-gate', 'gate', 'Gate', 'base-archetype', 'One of sixty-four positions, activated by a planet.', ['A gate is a specific theme, keyed to a hexagram of the I Ching, that becomes part of a design when a planet occupies its degree. Gates are activated twice: once at birth for the conscious personality and once about three months earlier, at the Design moment, for the unconscious body. The same gate carries a different weight depending on which activation it belongs to.'], []),
    term('hd-channel', 'channel', 'Channel', 'base-archetype', 'Two gates joined: a fixed, reliable capacity.', ['A channel forms when both of its gates are activated, and it defines the two centres it connects. Channels are the actual structure of a design - they are what makes a centre consistent rather than variable - and they are the level at which the system says something specific rather than general.'], []),
];
export const HUMAN_DESIGN_VOCABULARY = [
    ...HD_TYPES,
    ...HD_STRATEGIES,
    ...HD_AUTHORITIES,
    ...HD_PROFILES,
    ...HD_CENTERS,
    ...HD_STRUCTURES,
];
