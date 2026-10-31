import { MANIFESTING_GENERATOR_BASE } from './hdTypesAuthorities.js?v=2ea79e9';
import { sig } from '../semanticDimensions.js?v=2ea79e9';
/**
 * HUMAN DESIGN - TYPE COMPOSED WITH AUTHORITY AND PROFILE.
 *
 * Type, Strategy, Authority and Profile are four separate outputs of the engine,
 * and every generic reading of Human Design presents them as four separate
 * paragraphs. They are not four separate things. Type says what kind of energy
 * you run on, Strategy follows from Type, Authority says how the decision is
 * actually made inside that Type, and Profile says what the whole arrangement
 * looks like from outside. A reading that does not connect them has not read the
 * chart, it has listed it.
 *
 * So the composition here is layered, and the layering is deliberate:
 *
 *   BASE       the Type as a way of moving through the world (role 'type-role')
 *   AUTHORITY  overlay: how a decision is reached INSIDE that Type
 *   PROFILE    overlay: how the pair is met by other people
 *
 * Each overlay opens by naming its relationship to what came before, because it
 * was written to sit there. The Manifesting Generator with Sacral authority on a
 * 5/1 profile is written out as the worked example.
 */
const MG_OVERLAYS = [
    {
        id: 'hd.mg.authority.sacral',
        condition: 'Sacral authority, which is the standard case for this Type.',
        applies: (context) => context.authority === 'sacral',
        /* Priority 10: authority is the mechanism inside the Type, so it is
           described before the profile, which is about how the whole thing is seen
           from outside. */
        priority: 10,
        effect: 'weave-after-core',
        prose: [
            'The way that speed gets governed is your authority, and here it is Sacral. That means the decision is made in the body, not in the analysis, and it is made in the moment the question is actually asked. The response arrives as an immediate opening or closing - something in you leans toward it or does not - and it is accurate right then and considerably less accurate an hour later, once the mind has assembled a case.',
            'This is worth pairing carefully with the speed described above, because the two are easy to confuse. The speed is what happens after the yes. The yes itself is not fast, exactly; it is immediate, which is a different thing. What goes wrong for this design is not moving too quickly - it is moving on a decision the body never actually made, usually one the mind constructed because the opportunity looked good on paper. The energy does not show up for those, and the exhaustion that follows is the clearest signal you have that the yes was never real.',
            'In practice this asks for something slightly awkward: getting real questions put to you in a form the body can answer. Out loud, yes or no, from someone willing to ask plainly. And it asks you to accept a no that comes with no reasons attached, which for most people is the harder half of the instruction.',
        ],
        semantics: [sig('intuitive', 0.6), sig('intuitive', 0.3)],
        provenance: {
            kind: 'contextual-derivation',
            settledness: 'conventional',
            basis: 'Type and Authority are each canonical; their interaction for this pair is composed here under the stated layering rule.',
            sources: ['RESEARCH_HUMAN_DESIGN#type-authority', 'RESEARCH_HUMAN_DESIGN#canon'],
        },
    },
    {
        id: 'hd.mg.authority.emotional',
        condition: 'Emotional authority, which changes the timing of everything above.',
        applies: (context) => context.authority === 'emotional-solar-plexus',
        priority: 10,
        effect: 'weave-after-core',
        prose: [
            'What governs that speed is your authority, and in this configuration it works against the grain of the Type. Emotional authority means a defined Solar Plexus, and the system is unambiguous about what that costs: there is no clarity available in the moment. What feels obviously right at one point in the emotional wave feels obviously wrong at another, and neither reading is the answer.',
            'For a Manifesting Generator this is a genuinely awkward pairing, and it is worth naming as such rather than smoothing over. The design is built to move immediately and the authority requires waiting - not deliberating, which the mind will happily do instead, but simply letting time pass and sampling the same question more than once. Almost every serious misstep available to this combination comes from acting on the top of a wave.',
        ],
        semantics: [sig('emotionally-expressive', 0.6), sig('cautious', 0.3)],
        provenance: {
            kind: 'contextual-derivation',
            settledness: 'conventional',
            basis: 'Composed under the same rule; included to prove that the composition changes with the authority rather than appending a fixed paragraph.',
            sources: ['RESEARCH_HUMAN_DESIGN#type-authority'],
        },
    },
    {
        id: 'hd.mg.profile.5-1',
        condition: 'Profile 5/1.',
        applies: (context) => context.profile === '5/1',
        /* Priority 20: profile last, because it describes how the composed Type and
           Authority are received - which requires them to have been described. */
        priority: 20,
        effect: 'weave-after-core',
        prose: [
            'Seen from outside, all of this arrives wrapped in a 5/1 profile. Where Type describes the engine and Authority describes the steering, Profile describes what other people see when the two of them go past, and this one explains a pattern you have almost certainly noticed without having a name for it.',
            'The conscious 5 is the most projected-upon line in the system. People form an expectation of you before they have much evidence, and the expectation is almost always that you can solve something. Combined with a Manifesting Generator’s visible speed, this compounds: you appear more capable, faster, and more available than any actual assessment would support, and the reputation runs ahead of you into rooms you have not entered yet. When you deliver, it holds and it opens doors. When you do not - or when you moved on something your body never agreed to - the projection reverses hard, and the reversal feels disproportionate because it is.',
            'The unconscious 1 underneath is the counterweight, and it is the part of this design that is doing the quiet work. The 1 needs a foundation it has personally checked. It reads to the bottom, it distrusts the summary, and it acquires depth in private long before there is any occasion to use it. This is why the combination holds together rather than collapsing: the 5 keeps being handed problems it did not ask for, and the 1 has usually already done the reading.',
            'Put the three layers together and a workable shape appears. Wait for the thing to arrive and let the body answer it, because the 5 will be offered a great deal and most of it is not yours. Say what you are doing, because you are quick and visible and people fill silence with assumptions. Then let the 1 do what it does, and give it the time it needs, because your reputation is built on the depth the 1 supplies rather than on the speed the 5 is credited with.',
        ],
        semantics: [sig('assertive', 0.4), sig('analytical', 0.4), sig('introspective', 0.3)],
        provenance: {
            kind: 'contextual-derivation',
            settledness: 'conventional',
            basis: 'Composed from the canonical Type, Authority and Profile definitions under the layering rule; no source discusses this specific triple.',
            sources: ['RESEARCH_HUMAN_DESIGN#profiles', 'RESEARCH_HUMAN_DESIGN#composition'],
        },
    },
    {
        id: 'hd.mg.definition.split',
        condition: 'Split Definition.',
        applies: (context) => context.definition === 'split-definition',
        priority: 30,
        effect: 'amend-growth',
        prose: [
            'One structural detail modifies all of this. Your definition is split, meaning the defined parts of your design fall into two groups with no channel joining them. The practical effect is that certain people close that gap for you and being around them feels like something clicking into place. It is a real effect and it is worth knowing the risk that comes with it: the relief of the gap closing is easy to mistake for compatibility, and it is not the same signal as your Sacral saying yes.',
        ],
        semantics: [sig('collaborative', 0.3)],
        provenance: {
            kind: 'established',
            settledness: 'established-within-system',
            basis: 'Split definition and the attraction toward bridging others are canonical.',
            sources: ['RESEARCH_HUMAN_DESIGN#definition'],
        },
    },
];
/**
 * The Manifesting Generator's type-role unit now comes from hdTypesAuthorities.ts,
 * which writes all five Types at full depth. This file no longer duplicates it -
 * it takes that unit and attaches the contextual overlays, so there is one
 * reading of the Type and the composition sits on top of it rather than beside
 * a second, thinner copy.
 */
const MANIFESTING_GENERATOR_IN_CONTEXT = {
    ...MANIFESTING_GENERATOR_BASE,
    overlays: MG_OVERLAYS,
};
export const HUMAN_DESIGN_COMPOSITION = [MANIFESTING_GENERATOR_IN_CONTEXT];
