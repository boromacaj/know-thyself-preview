import { REFERENCE_CAUTION_TEXT } from './referenceTypes.js?v=b5ef5ed';
function buildEntry(topic, title, core) {
    return {
        topic,
        title,
        system: 'Human Design',
        overview: core.overview,
        strengths: core.strengths,
        shadow: core.shadow,
        integration: core.integration,
        caution: REFERENCE_CAUTION_TEXT,
    };
}
const TYPE_CORE = {
    Generator: {
        overview: 'Generators are the sustainable life-force of the design system: energy built for sustained work through response rather than initiation.',
        strengths: 'Deep stamina, mastery through repetition, and satisfaction when engaged with work that resonates.',
        shadow: 'Can drift into frustration when acting from initiation rather than waiting to respond.',
        integration: 'Notice a body-level yes or no before committing energy to a new direction.',
    },
    'Manifesting Generator': {
        overview: 'A hybrid design combining Generator sustainability with Manifestor initiating force: energy that moves quickly, multi-tracks, and often skips steps.',
        strengths: 'Fast, efficient, and able to move between several threads of response at once.',
        shadow: 'Can frustrate self and others by skipping communication before acting.',
        integration: 'Respond first, then inform the people the action will affect.',
    },
    Manifestor: {
        overview: 'Manifestors initiate: designed to start new impulses and set things into motion independently of response.',
        strengths: 'Independent, catalytic, and able to move without waiting for outside permission.',
        shadow: 'Can meet resistance or anger from others when action lands unannounced.',
        integration: 'Inform those affected before acting, not to ask permission but to ease the impact.',
    },
    Projector: {
        overview: 'Projectors are designed to guide and direct energy they do not generate themselves, seeing systems and people with unusual clarity.',
        strengths: 'Perceptive, efficient with energy, and skilled at recognizing how others best work.',
        shadow: 'Can experience bitterness when guidance is offered without being invited.',
        integration: 'Wait for recognition and a genuine invitation before sharing direction.',
    },
    Reflector: {
        overview: 'Reflectors sample and mirror the energy of their environment and the people around them, carrying no consistent energy type of their own.',
        strengths: 'Highly attuned, objective, and able to reflect the health of a group or community.',
        shadow: 'Can feel disappointment when major decisions are made too quickly.',
        integration: 'Wait a full lunar cycle before committing to major decisions.',
    },
};
const STRATEGY_CORE = {
    Respond: {
        overview: 'The Generator strategy: act from what shows up in front of you rather than initiating from the mind.',
        strengths: 'Keeps energy aligned with what is a genuine body-level yes.',
        shadow: 'Initiating instead of responding can lead to depleting, unsatisfying effort.',
        integration: 'Wait for something external to respond to before committing energy.',
    },
    'Respond, then inform': {
        overview: 'The Manifesting Generator strategy: respond to what shows up, then let affected people know before or as the action unfolds.',
        strengths: 'Combines fast responsive movement with reduced friction from surprised bystanders.',
        shadow: 'Skipping the informing step can create avoidable conflict.',
        integration: 'Add a short, simple heads-up alongside a fast response.',
    },
    'Inform before acting': {
        overview: 'The Manifestor strategy: initiate independently, and inform the people an action will affect beforehand.',
        strengths: 'Preserves independent initiation while easing the impact on others.',
        shadow: 'Skipping informing tends to invite resistance or anger.',
        integration: 'Say what is about to happen before doing it, briefly and without asking permission.',
    },
    'Wait for recognition and invitation': {
        overview: 'The Projector strategy: share guidance and direction once genuinely recognized and invited, rather than volunteering it unprompted.',
        strengths: 'Ensures energy and insight land where they are actually wanted.',
        shadow: 'Uninvited guidance tends to be met with resistance regardless of its accuracy.',
        integration: 'Let recognition come first, then respond to the invitation that follows.',
    },
    'Wait through a lunar cycle': {
        overview: 'The Reflector strategy: give roughly one full lunar cycle (about 28 days) before finalizing a major decision.',
        strengths: 'Allows a decision to be sampled across a full range of environments and influences.',
        shadow: 'Rushing a major decision tends to produce a choice that does not hold up.',
        integration: 'Talk a big decision through with trusted others across several weeks before committing.',
    },
};
const AUTHORITY_CORE = {
    Sacral: {
        overview: 'Sacral authority: a gut-level, in-the-moment response system, felt as a yes or no in the body.',
        strengths: 'Fast, reliable access to what is a genuine yes, once a question is asked out loud.',
        shadow: 'Overriding the gut response in favor of mental reasoning tends to produce regret.',
        integration: 'Ask yes/no questions out loud and notice the immediate body response before it gets reasoned away.',
    },
    'Emotional / Solar Plexus': {
        overview: 'Emotional authority: clarity arrives only after riding a full emotional wave, not in the moment of being asked.',
        strengths: 'Produces decisions with lasting emotional accuracy once the wave has passed.',
        shadow: 'Deciding at an emotional peak or trough tends to produce a decision that does not hold.',
        integration: 'Sleep on it — let the emotional wave pass before committing to anything significant.',
    },
    Splenic: {
        overview: 'Splenic authority: a quiet, in-the-moment intuitive knowing, felt once and rarely repeated.',
        strengths: 'Immediate, present-tense awareness of what supports health and safety.',
        shadow: 'The signal is subtle and easy to override with louder mental noise.',
        integration: 'Practice noticing and trusting the first quiet instinct before it is second-guessed.',
    },
    'Ego Manifested': {
        overview: 'Ego-manifested authority: clarity comes from what the willpower genuinely has the capacity and desire to commit to.',
        strengths: 'Strong follow-through on commitments made from real desire and available capacity.',
        shadow: 'Making promises the will cannot actually sustain tends to backfire.',
        integration: 'Only commit out loud to what there is honest willpower and appetite to see through.',
    },
    'Ego Projected': {
        overview: 'Ego-projected authority: similar willpower-based clarity, most reliable once spoken aloud to a trusted other.',
        strengths: 'Talking a decision through out loud tends to reveal what the will actually wants.',
        shadow: 'Deciding silently, without speaking it, tends to stay foggy.',
        integration: 'Talk it through out loud with someone trusted before committing.',
    },
    'Self-Projected': {
        overview: 'Self-projected authority: clarity emerges through hearing oneself talk a decision through, rather than through gut or emotion.',
        strengths: 'Speaking freely tends to surface what is actually true for the identity.',
        shadow: 'Deciding in isolation, without talking it out, tends to leave things unclear.',
        integration: 'Talk it out loud, ideally to a good listener, and notice what feels true while speaking.',
    },
    'Mental / Environmental': {
        overview: 'Mental (environmental) authority: clarity is not internal — it develops through discussing a decision out loud in the right environment.',
        strengths: 'Benefits from genuinely weighing perspectives rather than deciding alone or on impulse.',
        shadow: 'Being pressured to decide alone or quickly tends to produce a poor outcome.',
        integration: 'Talk a decision through in a supportive environment with people who reflect rather than direct.',
    },
    Lunar: {
        overview: 'Lunar authority (Reflector): clarity develops gradually across a full lunar cycle rather than through an internal authority center.',
        strengths: 'A wide, unbiased sampling of a decision across changing conditions and company.',
        shadow: 'Deciding quickly, before the cycle completes, tends to produce a decision that does not hold.',
        integration: 'Track a major decision across roughly 28 days before finalizing it.',
    },
};
const DEFINITION_CORE = {
    'No Definition': {
        overview: 'No Definition describes a design with no centers consistently defined — closest to the Reflector pattern of sampling rather than fixed definition.',
        strengths: 'Wide sensitivity to and reflection of surrounding energy.',
        shadow: 'Can feel a lack of a fixed internal reference point to decide from.',
        integration: 'Lean on strategy and authority rather than trying to manufacture a fixed sense of self.',
    },
    'Single Definition': {
        overview: 'Single Definition: all defined centers connect into one continuous, self-contained energetic circuit.',
        strengths: 'A consistent, self-sufficient internal flow that does not depend on another person to complete it.',
        shadow: 'Can underestimate how much a second perspective would add.',
        integration: 'Stay open to outside input even when internal consistency feels sufficient.',
    },
    'Split Definition': {
        overview: 'Split Definition: defined centers form two separate circuits, most naturally completed by connecting with certain other people.',
        strengths: 'A built-in openness to bridging with others who complete the missing connection.',
        shadow: 'Can feel a persistent pull toward a specific kind of person or connection to feel whole.',
        integration: 'Recognize the pull toward a bridging connection without treating it as mandatory for wholeness.',
    },
    'Triple Split Definition': {
        overview: 'Triple Split Definition: defined centers form three separate circuits, needing more than one kind of connection to bridge fully.',
        strengths: 'Draws naturally from a wider, more varied circle of connections.',
        shadow: 'Can feel scattered trying to find any single relationship that bridges everything at once.',
        integration: 'Expect several different relationships to each complete a different part, not one relationship to complete all of it.',
    },
    'Quadruple Split Definition': {
        overview: 'Quadruple Split Definition: defined centers form four separate circuits — a rare, highly independent configuration.',
        strengths: 'Strong self-sufficiency across several distinct internal circuits.',
        shadow: 'Bridging every circuit through others is rarely realistic, which can be quietly isolating.',
        integration: 'Let some circuits stay open rather than seeking outside connection to complete every one.',
    },
    'Multiple Split Definition': {
        overview: 'Multiple Split Definition: defined centers form several separate circuits beyond a simple split, each running somewhat independently.',
        strengths: 'Operates through more than one self-contained internal circuit at once.',
        shadow: 'Can feel internally inconsistent moving between the separate circuits.',
        integration: 'Notice which circuit is active without expecting constant internal consistency.',
    },
};
/** The 12 standard Human Design profile line-pairings, keyed by the engine's exact
 *  "${personalityLine}/${designLine}" output string. */
const PROFILE_CORE = {
    '1/3': {
        overview: '1/3 Profile: a foundation built through personal investigation, tested and refined through direct trial and error.',
        strengths: 'Thorough research paired with real-world, hands-on learning.',
        shadow: 'Can take early stumbles more personally than the learning process warrants.',
        integration: 'Treat trial-and-error missteps as data, not verdicts on competence.',
    },
    '1/4': {
        overview: '1/4 Profile: a foundation built through personal investigation, shared and stabilized through a close network of relationships.',
        strengths: 'Solid personal knowledge paired with a dependable circle to share it through.',
        shadow: 'Can over-rely on the existing network instead of expanding it.',
        integration: "Let the close network carry knowledge outward rather than gatekeeping it.",
    },
    '2/4': {
        overview: '2/4 Profile: natural talent that prefers privacy, drawn out and put to use through a close, trusted network.',
        strengths: 'Genuine natural ability activated through invitations from trusted people.',
        shadow: 'Can withdraw further than is actually needed when not yet called out.',
        integration: 'Let the existing network make the introductions rather than seeking exposure directly.',
    },
    '2/5': {
        overview: '2/5 Profile: natural, private talent that gets projected onto by a wider community looking for practical solutions.',
        strengths: 'Genuine natural gifts that others actively seek out for real-world results.',
        shadow: 'Can feel misread by projections that do not match the private reality.',
        integration: 'Let real results speak, and correct outside projections directly rather than absorbing them.',
    },
    '3/5': {
        overview: '3/5 Profile: learning through direct trial and error, then projected onto by others seeking practical solutions.',
        strengths: 'Hard-won, tested experience that translates into genuinely useful guidance for others.',
        shadow: 'Can feel exposed when others expect a fix before the experimentation is finished.',
        integration: 'Let trial and error run its course before stepping into the fixer role others project.',
    },
    '3/6': {
        overview: '3/6 Profile: an early life of trial-and-error experimentation that gives way, after roughly age 30, to role-model-level objectivity.',
        strengths: 'Hard-earned wisdom that becomes a trustworthy, tested example for others over time.',
        shadow: 'The earlier experimental phase can be judged unfairly against the later objective phase.',
        integration: 'Let the early experimental years be exactly that, without rushing toward premature authority.',
    },
    '4/6': {
        overview: '4/6 Profile: stability built through a close network in early life, maturing into a wider, objective role-model influence over time.',
        strengths: 'A dependable early network combined with growing, earned credibility over time.',
        shadow: "Can cling to the early network's comfort longer than the wider role calls for.",
        integration: "Let the close network stay a foundation, not a ceiling, as broader influence develops.",
    },
    '4/1': {
        overview: '4/1 Profile: stability and influence built through a close network, grounded in solid personal investigation and research.',
        strengths: 'A dependable circle paired with genuinely well-researched personal foundations.',
        shadow: "Can lean on the network's approval more than the research actually requires.",
        integration: "Trust the personal investigation even when it runs ahead of the network's opinion.",
    },
    '5/1': {
        overview: '5/1 Profile: a practical problem-solver others project expectations onto, grounded in solid personal investigation and research.',
        strengths: "Well-researched foundations that hold up under the pressure of others' expectations.",
        shadow: 'Can feel pressure to fix things before being genuinely ready.',
        integration: "Let solid personal research be the anchor when outside projections run ahead of readiness.",
    },
    '5/2': {
        overview: '5/2 Profile: a natural, private talent that others project practical expectations onto, expecting solutions.',
        strengths: 'Genuine natural gifts that surface exactly when a real need calls them out.',
        shadow: 'Can feel burdened by projections that arrive faster than the gift is ready to meet.',
        integration: 'Let privacy be protected until a projection genuinely calls the gift into use.',
    },
    '6/2': {
        overview: '6/2 Profile: natural, private talent maturing into a wider, objective role-model influence after a trial period.',
        strengths: 'Genuine natural gifts that, given time, become a trusted example for others.',
        shadow: 'Retreating into privacy for too long can delay the natural role-model maturation.',
        integration: "Let the private gift surface when called on, trusting the role-model phase will follow in its own time.",
    },
    '6/3': {
        overview: '6/3 Profile: an early life of direct trial-and-error experimentation maturing, after roughly age 30, into objective role-model influence.',
        strengths: 'Experience-tested wisdom that becomes a credible, lived-in example for others over time.',
        shadow: 'The experimental early phase can feel discouraging without knowing a more objective phase follows.',
        integration: 'Treat the early trial-and-error years as necessary preparation for the objectivity that follows.',
    },
};
const CENTER_CORE = {
    head: {
        overview: 'The Head center generates mental pressure and inspiration — the drive to think, question, and generate ideas.',
        strengths: 'When defined, a consistent source of inspiration and mental pressure to contemplate.',
        shadow: 'Can generate pressure to have answers before they are actually ready.',
        integration: 'Let questions sit rather than forcing premature certainty.',
    },
    ajna: {
        overview: 'The Ajna center processes and conceptualizes — the seat of mental certainty, opinions, and ways of thinking.',
        strengths: 'When defined, a consistent, fixed way of processing and forming opinions.',
        shadow: 'Can hold onto a fixed opinion or way of thinking past its usefulness.',
        integration: 'Hold conclusions as current best understanding rather than fixed permanent truth.',
    },
    throat: {
        overview: 'The Throat center governs manifestation, communication, and action — the gateway through which energy becomes expressed or done.',
        strengths: 'When defined, a consistent, accessible channel for turning energy into expression or action.',
        shadow: 'Can feel pressure to speak or act before there is something genuine to express.',
        integration: 'Let expression flow through strategy and authority rather than forcing it to perform.',
    },
    g: {
        overview: 'The G center (Identity) holds direction, self-love, and a sense of identity — orientation of who one is and where one is headed.',
        strengths: 'When defined, a stable, consistent sense of identity and direction.',
        shadow: 'Can resist necessary change to protect a fixed sense of self.',
        integration: 'Let identity be expressed through consistent action rather than defended through rigidity.',
    },
    ego: {
        overview: 'The Ego (Heart) center governs willpower, material ego, and the capacity to make and keep promises.',
        strengths: 'When defined, reliable willpower and follow-through on commitments genuinely made.',
        shadow: 'Can over-promise, tying self-worth too tightly to material proof.',
        integration: 'Only commit out loud to what there is honest capacity to deliver.',
    },
    solarPlexus: {
        overview: 'The Solar Plexus center governs emotions and emotional awareness, moving in waves rather than fixed states.',
        strengths: 'When defined, a rich emotional depth and access to emotional truth over time.',
        shadow: 'Can mistake a passing emotional peak or trough for a permanent truth.',
        integration: 'Let emotional waves complete before treating any single peak as a final answer.',
    },
    sacral: {
        overview: "The Sacral center is the body's life-force and work-force engine, generating sustainable energy and gut response.",
        strengths: 'When defined, sustainable energy for work and a reliable gut-level yes or no.',
        shadow: 'Can override its own natural response signal in favor of mental reasoning.',
        integration: 'Notice the immediate gut response to a yes/no question before overriding it.',
    },
    spleen: {
        overview: 'The Spleen center governs instinct, intuition, health, and well-being — awareness of what is safe and what is not, in the present moment.',
        strengths: 'When defined, consistent, in-the-moment intuitive awareness of safety and health.',
        shadow: 'The quiet, present-tense signal is easy to override with louder mental noise.',
        integration: 'Practice trusting the first quiet instinct before reasoning talks over it.',
    },
    root: {
        overview: 'The Root center generates the pressure to move, act, and get things done — the drive behind stress and adrenaline.',
        strengths: 'When defined, a steady, reliable source of drive and pressure-fueled momentum.',
        shadow: 'Can feel a persistent urgency to act before the moment actually calls for it.',
        integration: 'Let strategy and authority filter root pressure rather than reacting to it directly.',
    },
};
export function findHumanDesignTypeReference(value) {
    const core = TYPE_CORE[value];
    if (!core)
        return null;
    return buildEntry(`human-design:type:${value}`, value, core);
}
export function findHumanDesignStrategyReference(value) {
    const core = STRATEGY_CORE[value];
    if (!core)
        return null;
    return buildEntry(`human-design:strategy:${value}`, value, core);
}
export function findHumanDesignAuthorityReference(value) {
    const core = AUTHORITY_CORE[value];
    if (!core)
        return null;
    return buildEntry(`human-design:authority:${value}`, `${value} Authority`, core);
}
export function findHumanDesignDefinitionReference(value) {
    const core = DEFINITION_CORE[value];
    if (!core)
        return null;
    return buildEntry(`human-design:definition:${value}`, value, core);
}
/** `value` is the engine's raw "${personalityLine}/${designLine}" profile string, e.g. "5/1". */
export function findHumanDesignProfileReference(value) {
    const core = PROFILE_CORE[value];
    if (!core)
        return null;
    return buildEntry(`human-design:profile:${value}`, `${value} Profile`, core);
}
export function findHumanDesignCenterReference(centerId, label) {
    const core = CENTER_CORE[centerId];
    if (!core)
        return null;
    return buildEntry(`human-design:center:${centerId}`, `${label} Center`, core);
}
