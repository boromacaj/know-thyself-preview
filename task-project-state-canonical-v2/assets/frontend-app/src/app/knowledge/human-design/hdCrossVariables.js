import { sig } from '../semanticDimensions.js';
import { crossUnit, variableUnit } from './hdAuthoring.js';
/**
 * THE INCARNATION CROSS AND THE FOUR VARIABLES.
 *
 * Both are written to the limit of what this project can support honestly, and
 * both stop there rather than filling the gap.
 *
 * THE CROSS: NO INVENTED NAMES
 *
 * An Incarnation Cross is built from four activations - the conscious Sun and
 * Earth and the unconscious Sun and Earth - and in the canon each of the 192
 * combinations carries a name ("The Right Angle Cross of ..."). Those names come
 * from a single body of teaching material, and this repository has no curated
 * table of them.
 *
 * So nothing here names a cross. What is written instead is the STRUCTURE: what
 * the four gates are, what the angle means, and how to read the pair-against-pair
 * relationship. That is genuinely useful and it is entirely defensible. Adding
 * names reconstructed from memory would be the worst of the available options -
 * it would look complete and be unreliable, and a reader would have no way to
 * tell. Building a properly sourced table is recorded as a future content task.
 *
 * THE VARIABLES: THE ORIENTATION ONLY
 *
 * The engine resolves four Variables with a Left or Right orientation, plus a
 * colour, tone and base for each. The Left/Right distinction is stable across
 * the teaching material and is written here. The COLOUR variants - the twenty-four
 * named sub-types that sit under Determination, Environment, Motivation and
 * Perspective - are not. They belong to the most specialised layer of the canon,
 * they are taught inconsistently, and this project does not have a source it
 * would stand behind for them.
 *
 * So the colours are calculated, shown in Technical Details, and not
 * interpreted. That gap is recorded rather than papered over.
 *
 * All of this material carries HD_LATE_LAYER provenance, so synthesis discounts
 * it automatically rather than relying on anyone to remember that it is softer
 * than Type and Authority.
 */
const cross = [
    crossUnit({
        key: 'incarnation-cross',
        label: 'Incarnation Cross',
        headline: 'Four gates: the widest frame the chart draws.',
        core: [
            'The Incarnation Cross is built from four activations - the Sun and Earth at your birth, and the Sun and Earth at the Design moment about eighty-eight degrees of solar arc earlier. The system treats it as the broadest statement a chart makes: the overall theme a life is set inside, rather than anything about how you operate day to day.',
            'It is worth reading as a frame rather than as an instruction. The four gates work as two pairs held in tension - the conscious pair describing what you are consciously oriented toward, the unconscious pair describing what the body is doing underneath - and the interesting material is usually in how the two pairs relate rather than in any one of them. Of everything in a chart, this is the part that tends to make sense in retrospect rather than as guidance.',
        ],
        signals: [sig('conceptual', 0.5), sig('introspective', 0.4)],
    }),
    crossUnit({
        key: 'cross-angle-right',
        label: 'Right Angle Cross',
        headline: 'A life shaped mostly by your own process.',
        core: [
            'A Right Angle cross is read as personal karma: a life whose shape comes primarily from your own experience rather than from what other people bring to it. The system associates it with a self-absorbed developmental arc, and it means that in the neutral sense - the material you are working with is largely your own.',
            'Right Angle is the angle of seven of the twelve profiles. Practically, it suggests that the useful question is generally about your own process rather than about who you are meant to encounter.',
        ],
        signals: [sig('independent', 0.6), sig('introspective', 0.5)],
    }),
    crossUnit({
        key: 'cross-angle-left',
        label: 'Left Angle Cross',
        headline: 'A life shaped substantially through other people.',
        core: [
            'A Left Angle cross is read as transpersonal: a life in which the significant material arrives through encounter rather than through solitary development. Other people are not incidental to the arc here; they are how it proceeds.',
            'The practical reading is that meetings matter disproportionately, and that a period of isolation tends to stall this configuration in a way it does not stall a Right Angle one.',
        ],
        signals: [sig('collaborative', 0.6), sig('outwardly-engaged', 0.4)],
    }),
    crossUnit({
        key: 'cross-angle-juxtaposition',
        label: 'Juxtaposition Cross',
        headline: 'A narrow, fixed theme held throughout.',
        core: [
            'The Juxtaposition cross sits between the two angles and belongs to one profile only, the 4/1. The system reads it as a fixed theme: a single, quite specific focus carried consistently rather than a developmental arc that moves through stages.',
            'What that tends to describe is a life that stays consistent, doing recognisably one thing. It is neither more nor less fortunate than the other angles; it is simply narrower.',
        ],
        signals: [sig('persistent', 0.6), sig('stability-seeking', 0.4)],
    }),
];
const variables = [
    variableUnit({
        key: 'determination',
        label: 'Determination',
        headline: 'The conditions under which taking things in works well.',
        core: [
            'Determination describes the manner in which this body assimilates - not what to eat, but the circumstances under which intake goes well: whether attention is single or divided while eating, whether the setting is calm or busy, and so on. Together with Environment it makes up what the system calls the Primary Health System.',
            'This is recorded here as part of the system\'s own vocabulary and as symbolic material only. Nothing in it is guidance about diet, nothing in it is a health claim, and nothing in it should be acted on as though it were either.',
        ],
        signals: [sig('receptive', 0.4), sig('practical', 0.3)],
    }),
    variableUnit({
        key: 'environment',
        label: 'Environment',
        headline: 'The kind of physical space this design settles in.',
        core: [
            'Environment describes the sort of place in which the nervous system stops working against itself - the quality of the space rather than its decoration, and whether you do better in a room with a view out, a corner, height, or activity nearby. It is the second half of the Primary Health System.',
            'Of the four Variables this is the one readers most often find immediately recognisable, because most people already know which rooms they think well in. Symbolic and educational only.',
        ],
        signals: [sig('emotionally-sensitive', 0.4), sig('adaptable', 0.3)],
    }),
    variableUnit({
        key: 'motivation',
        label: 'Motivation',
        headline: 'What is actually driving the mind underneath what it says.',
        core: [
            'Motivation describes the underlying orientation the mind operates from - the thing genuinely moving it, which is frequently not the reason it gives when asked. In the system it belongs to the outer half of the Variables, the part concerned with how you influence other people rather than how you decide for yourself.',
            'It is worth treating this as a question rather than as a label: noticing, over months, what your mind keeps returning to when nothing is at stake tends to be more informative than any single reading of it.',
        ],
        signals: [sig('introspective', 0.4), sig('conceptual', 0.3)],
    }),
    variableUnit({
        key: 'perspective',
        label: 'Perspective',
        headline: 'The angle the mind naturally sees from.',
        core: [
            'Perspective describes the vantage point the mind takes on whatever is in front of it - the aspect of a situation it notices first, before any deliberate looking has happened. The system pairs it with Motivation as the outer, other-facing half of the Variables.',
            'Like the rest of this layer it is a late and specialised part of the canon, taught with less consistency than Type or Authority, and it is offered here as the system\'s own framing rather than as a claim about how cognition works.',
        ],
        signals: [sig('conceptual', 0.4), sig('analytical', 0.3)],
    }),
    variableUnit({
        key: 'orientation-left',
        label: 'Left orientation',
        headline: 'Strategic, focused, actively directed.',
        core: [
            'A Left arrow on any of the four Variables is read as the active, focused orientation: this aspect of you operates deliberately, with a target, and does better when it is allowed to concentrate on one thing rather than to absorb generally.',
            'Applied to Determination it suggests focused intake; to Environment, a chosen and specific setting; to Motivation and Perspective, a mind that goes at things rather than waiting to receive them.',
        ],
        signals: [sig('assertive', 0.5), sig('structured', 0.4)],
    }),
    variableUnit({
        key: 'orientation-right',
        label: 'Right orientation',
        headline: 'Receptive, peripheral, taking in more than one thing.',
        core: [
            'A Right arrow is read as the receptive, unfocused orientation: this aspect of you works by taking in broadly rather than by targeting, and it does better with variety and with peripheral attention than with narrow concentration.',
            'Applied to Determination it suggests intake that goes better with something else going on; to Environment, a setting with more happening in it; to Motivation and Perspective, a mind that gathers rather than aims.',
        ],
        signals: [sig('receptive', 0.5), sig('adaptable', 0.4)],
    }),
];
export const HD_CROSS_AND_VARIABLES = [...cross, ...variables];
