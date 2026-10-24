import { hdChannels } from '../../human-design/data/hdChannels.js';
import { sig } from '../semanticDimensions.js';
import { channelSignals, channelUnit } from './hdAuthoring.js';
const entries = [
    {
        id: '1-8', name: 'Distinct contribution',
        headline: 'Identity made public as a way of doing something nobody else does.',
        core: [
            'This joins the identity centre to the throat, which makes self-expression structural rather than occasional: what you are gets expressed as a contribution, and the contribution is recognisably yours rather than interchangeable. There is a real creative individuality here that does not need an audience to exist but does need an outlet.',
            'Working badly it becomes difference for its own sake - the position taken because nobody else holds it - or a long silence while waiting for the contribution to be perfect enough to make.',
        ],
        extra: [sig('creative', 0.7), sig('independent', 0.5)],
    },
    {
        id: '2-14', name: 'Direction and fuel',
        headline: 'A sense of where to go, with the energy to get there.',
        core: [
            'This connects identity to the sacral engine, pairing a felt sense of direction with the life force to pursue it. People with this rarely have to be told what to aim at; the difficulty is more often explaining the aim to anyone else, since it arrives as a knowing rather than as a plan.',
            'Unbalanced it becomes drive with no destination, or a certainty about direction that has stopped checking whether the direction still holds.',
        ],
        extra: [sig('persistent', 0.7), sig('independent', 0.5)],
    },
    {
        id: '3-60', name: 'Starting against resistance',
        headline: 'New things begun in the face of real limitation.',
        core: [
            'Joining the sacral to the root, this is the pressure to bring something new into being combined with the constraint that makes it difficult. Innovation here is not smooth: it arrives through mutation, false starts and the specific frustration of a thing not being ready yet.',
            'The difficulty is treating the resistance as a verdict. This connection is built to work against limitation rather than in its absence, and the pattern of stalling before a breakthrough is the mechanism rather than a failure.',
        ],
        extra: [sig('novelty-seeking', 0.6), sig('persistent', 0.6)],
    },
    {
        id: '4-63', name: 'Doubt and the answer to it',
        headline: 'A mind that asks whether it holds up, and then works out whether it does.',
        core: [
            'This joins the head to the ajna: pressure to check something, and the conceptual apparatus to check it with. It produces genuinely rigorous thinking - a formula, a logical answer, a reason the thing does or does not work.',
            'Its shadow is doubt applied to everything indiscriminately, including to conclusions that were sound. Certainty here is earned slowly and can be dismantled quickly.',
        ],
        extra: [sig('analytical', 0.8), sig('cautious', 0.4)],
    },
    {
        id: '5-15', name: 'Rhythm and its interruption',
        headline: 'A natural pattern to your days, and a tolerance for other people\'s.',
        core: [
            'Connecting sacral to identity, this brings a strong personal rhythm - a way of doing things at particular times that is not preference but constitution - paired with an unusual range in accepting how differently other people live.',
            'Broken rhythm is genuinely disruptive here rather than merely inconvenient, and the shadow is either rigidity about the pattern or an extremeness that swings between them.',
        ],
        extra: [sig('stability-seeking', 0.6), sig('adaptable', 0.4)],
    },
    {
        id: '6-59', name: 'Intimacy and the barrier to it',
        headline: 'What gets past the boundary, and on what terms.',
        core: [
            'This joins the solar plexus to the sacral and governs how closeness actually happens: what is let in, when the friction is worth it, and what emotional cost intimacy carries. It is the connection most directly concerned with reproduction and with bonding.',
            'Its difficulty is conflict used as a substitute for closeness, or a barrier maintained so consistently that nothing gets through it at all.',
        ],
        extra: [sig('emotionally-expressive', 0.6), sig('collaborative', 0.5)],
    },
    {
        id: '7-31', name: 'Leading by being asked',
        headline: 'Influence that works when it has been granted.',
        core: [
            'Identity to throat, giving a natural capacity to speak for a group and set a direction others follow. The critical condition is that it works by consent: this influence lands when a group has effectively elected it and produces resistance when it is asserted.',
            'The shadow is leading without the mandate, which turns the same capability into something people push back against without quite knowing why.',
        ],
        extra: [sig('communicative', 0.7), sig('collaborative', 0.5)],
    },
    {
        id: '9-52', name: 'Focus held still',
        headline: 'The ability to concentrate on one thing for as long as it takes.',
        core: [
            'This joins the sacral engine to the root, and what it produces is sustained concentration: the capacity to sit with a single detail, a single problem or a single piece of work far past the point where most people\'s attention has moved. The root supplies the pressure and the sacral supplies the fuel, and the combination is stillness with an engine behind it rather than stillness from inertia.',
            'It is a genuinely uncommon capability and the source of most real expertise, which is accumulated by people who could stay with something. Where it becomes difficult is scope: this connection concentrates on whatever it is pointed at, and it does not itself supply any judgement about whether that thing was worth the years. Focus applied to the wrong detail is indistinguishable, from inside, from focus applied to the right one.',
            'The other cost is the stillness itself. Others may read it as inertia or as disengagement, and being pulled out of it before the concentration has finished is experienced as genuinely disruptive rather than merely annoying.',
        ],
        extra: [sig('persistent', 0.9), sig('analytical', 0.5), sig('structured', 0.4)],
    },
    {
        id: '10-20', name: 'Being yourself, out loud, now',
        headline: 'Self-expression that happens in the present tense.',
        core: [
            'Identity to throat, and one of the most direct connections in the graph: who you are comes out as behaviour in the moment, without much editing between the two. There is real authenticity here and very little capacity for performance.',
            'The difficulty is that the present tense has no filter. What is true right now gets said right now, and this connection is regularly surprised by the consequences of that.',
        ],
        extra: [sig('communicative', 0.7), sig('independent', 0.6)],
    },
    {
        id: '10-34', name: 'Conviction with power behind it',
        headline: 'Doing what you believe, with the energy to sustain it.',
        core: [
            'This joins identity to the sacral, pairing a strong sense of what is right for you with the life force to actually do it. It is self-directed in a way that does not require anyone\'s agreement, and it is unusually hard to divert.',
            'Its shadow is a conviction that has stopped consulting anything outside itself, and the energy to keep going long after the direction stopped being right.',
        ],
        extra: [sig('independent', 0.8), sig('persistent', 0.7)],
    },
    {
        id: '10-57', name: 'Instinct about your own survival',
        headline: 'A present-moment read on what is right for you.',
        core: [
            'Identity to spleen: an intuitive, in-the-moment sense of whether a situation is right for you specifically, distinct from whether it is a good idea in general. It speaks quietly and once.',
            'The difficulty is that this signal is easy to override with reasoning, and this connection tends to know afterwards exactly when it did so.',
        ],
        extra: [sig('intuitive', 0.8), sig('independent', 0.4)],
    },
    {
        id: '11-56', name: 'Ideas looking for a listener',
        headline: 'A mind full of images that want telling.',
        core: [
            'Ajna to throat, and this is the connection of the storyteller: ideas, images and possibilities that accumulate and then need to be told. The point of them is the telling rather than the doing - these are not necessarily ideas to be implemented.',
            'The shadow is trying to live out every idea, or telling them to people who did not ask and mistaking the silence that follows for a failure to understand.',
        ],
        extra: [sig('communicative', 0.8), sig('conceptual', 0.7)],
    },
    {
        id: '12-22', name: 'Mood into voice',
        headline: 'Expression that depends entirely on the moment being right.',
        core: [
            'Throat to solar plexus, and the most mood-dependent connection in the graph. When the moment is right this produces expression of real feeling and unusual social grace; when it is not, there is genuinely nothing there and forcing it produces something worse than silence.',
            'The difficulty is that the timing is not under conscious control, and other people read the variation as inconsistency rather than as a mechanism.',
        ],
        extra: [sig('emotionally-expressive', 0.8), sig('communicative', 0.6)],
    },
    {
        id: '13-33', name: 'Holding what others tell you',
        headline: 'A keeper of experience, and eventually of its lessons.',
        core: [
            'Identity to throat, and this is the connection people confide in. It collects experience - other people\'s and its own - and, given a period of retreat, turns it into something that can be told back as a lesson rather than as a story.',
            'The shadow is carrying everything without ever processing it, or telling the retrospective before the retreat has happened.',
        ],
        extra: [sig('communicative', 0.6), sig('introspective', 0.6)],
    },
    {
        id: '16-48', name: 'Depth becoming skill',
        headline: 'A talent that needs to go deep before it is worth expressing.',
        core: [
            'This joins the throat to the spleen, connecting the enthusiasm to perform with an instinctive sense of depth and of what is not yet good enough. It is the wiring of genuine talent, and it works by mastery rather than by confidence: the expression is worth hearing because the depth is actually there.',
            'The difficulty is the gap between the two ends. The splenic side registers insufficiency accurately, so this connection is prone to a real fear of being inadequate that persists long after the skill is demonstrably present - and it can either delay expression indefinitely, or overcompensate with an enthusiasm that has not yet earned itself.',
            'Working well, this is the person whose contribution is recognised as unusually solid. The route to it is unglamorous repetition, and the connection knows that even when it wishes it did not.',
        ],
        extra: [sig('intuitive', 0.6), sig('communicative', 0.6), sig('persistent', 0.5)],
    },
    {
        id: '17-62', name: 'Opinion with the detail to back it',
        headline: 'A view, and the facts arranged behind it.',
        core: [
            'Ajna to throat: an opinion-forming mind paired with the precision to organise the supporting detail. This is logical, sequential thinking that can be stated clearly and defended.',
            'Its shadow is an opinion presented as fact, and a precision about detail that wins the argument while missing the point of it.',
        ],
        extra: [sig('analytical', 0.8), sig('communicative', 0.6), sig('structured', 0.5)],
    },
    {
        id: '18-58', name: 'Improving what is not right',
        headline: 'A drive to correct, powered by a genuine appetite for it.',
        core: [
            'Spleen to root, combining the instinct that something is not working with the vitality to do something about it. At its best this is the person who makes things better because they cannot leave a flaw alone.',
            'Its shadow is criticism as a reflex - the pattern found and named whether or not anybody wanted it - and a joy in correction that reads as fault-finding.',
        ],
        extra: [sig('analytical', 0.7), sig('persistent', 0.5)],
    },
    {
        id: '19-49', name: 'Needing and the terms of it',
        headline: 'Sensitivity to what is needed, and to whether the arrangement holds.',
        core: [
            'Root to solar plexus: an acute sense of what people need from each other and a corresponding sensitivity to whether the agreement between them is still being honoured. This is the wiring of belonging and of the conditions attached to it.',
            'Its difficulty is the abrupt rejection. When the terms are felt to have been broken, this connection can end something entirely and without much discussion.',
        ],
        extra: [sig('emotionally-sensitive', 0.7), sig('collaborative', 0.5)],
    },
    {
        id: '20-34', name: 'Busy in the present',
        headline: 'Energy converted into activity, immediately.',
        core: [
            'Throat to sacral, and the only channel in the graph that connects a motor directly to the throat without passing through anything else. What it produces is activity in the present moment: energy becomes doing, now, without deliberation.',
            'Its shadow is busyness as an identity, and an impatience with anything that requires waiting.',
        ],
        extra: [sig('persistent', 0.7), sig('assertive', 0.5), sig('outwardly-engaged', 0.5)],
    },
    {
        id: '20-57', name: 'Knowing in the moment, and saying it',
        headline: 'Intuition that arrives already in words.',
        core: [
            'Throat to spleen: an instinctive read on the present moment with direct access to expression, so the knowing and the saying happen almost simultaneously. This is a fast and often uncannily accurate connection.',
            'Its difficulty is that the intuition is quiet and the throat is not, so what comes out can be a rationalisation delivered with the confidence the real signal would have had.',
        ],
        extra: [sig('intuitive', 0.8), sig('communicative', 0.6)],
    },
    {
        id: '21-45', name: 'Control of the material',
        headline: 'A need to be in charge of resources, and the will to manage them.',
        core: [
            'Ego to throat, joining willpower with the authority to direct: this is the wiring of the person who manages the money, the territory or the operation, and who does not do well being told how.',
            'Its shadow is control extended past resources to people, and a will that treats every constraint as a challenge to it.',
        ],
        extra: [sig('assertive', 0.8), sig('structured', 0.5), sig('independent', 0.5)],
    },
    {
        id: '23-43', name: 'Insight that has to be translated',
        headline: 'Knowing something the room does not have words for yet.',
        core: [
            'Throat to ajna: an individual, non-obvious insight paired with the need to articulate it. When the timing is right this produces a genuine breakthrough in how something is understood.',
            'When the timing is wrong the same insight comes out as incoherence, and this connection is well acquainted with being met by blank faces. The difference is almost entirely whether it was asked for.',
        ],
        extra: [sig('conceptual', 0.8), sig('communicative', 0.6), sig('independent', 0.5)],
    },
    {
        id: '24-61', name: 'The question that will not close',
        headline: 'Mental pressure toward something that cannot quite be resolved.',
        core: [
            'Head to ajna, and this is a thinking connection concerned with the unanswerable: the inner question that returns, gets worked on, and returns again. It can produce real insight, and it produces it on its own schedule.',
            'Its shadow is rumination - the same loop mistaken for progress - and a pressure to know that treats every unresolved question as a personal failure.',
        ],
        extra: [sig('conceptual', 0.8), sig('introspective', 0.6), sig('analytical', 0.5)],
    },
    {
        id: '25-51', name: 'Shock into something larger',
        headline: 'A capacity to be knocked sideways and to come out changed.',
        core: [
            'This joins the identity centre to the ego, and it is the connection most associated with initiation in the older sense: something happens that you did not choose, it goes right through the ordinary defences, and what emerges on the other side has a different relationship to itself.',
            'The two halves are genuinely different. The ego side is competitive and wants to be first at something; the identity side is impersonal and loves in a way that does not particularly discriminate. Together they make someone drawn to the edge of their own experience, and unusually able to hold what they find there without needing it to mean something comfortable.',
            'Its difficulty is provoking the shock rather than meeting it - courting risk for the transformation it might produce - and a self-directedness that can look, from outside, like indifference to whoever is standing nearby.',
        ],
        extra: [sig('independent', 0.7), sig('risk-oriented', 0.6), sig('introspective', 0.5)],
    },
    {
        id: '26-44', name: 'Memory turned into persuasion',
        headline: 'An instinct for what worked before, and the will to sell it.',
        core: [
            'This joins the ego to the spleen: willpower connected to instinctive memory. What it produces is an unusual ability to recognise a pattern from the past - in a person, a market, a situation - and to act on that recognition persuasively and at speed.',
            'It is the wiring of the natural salesperson and of the good negotiator, and it works because the instinct is genuinely accurate rather than because the persuasion is skilled. The two together are considerably more effective than either alone.',
            'The shadow is a well-known one and worth naming plainly: the same capability that presents a truth compellingly can present a convenient version just as compellingly, and the line between them is drawn by the person rather than by the design. There is also a tendency to over-commit the will, promising on the strength of a pattern that does not in fact repeat.',
        ],
        extra: [sig('assertive', 0.7), sig('intuitive', 0.6), sig('communicative', 0.5)],
    },
    {
        id: '27-50', name: 'Care and what it costs',
        headline: 'Responsibility for other people, held as a value.',
        core: [
            'Sacral to spleen, joining the energy to nourish and protect with an instinct for what a group needs to survive. This is the wiring of genuine caretaking, and it carries the values that hold a family or a team together.',
            'Its shadow is care that has become obligation, and a set of values defended past the point where they are serving anybody.',
        ],
        extra: [sig('collaborative', 0.7), sig('persistent', 0.5)],
    },
    {
        id: '28-38', name: 'Struggle that means something',
        headline: 'A willingness to fight for something worth it.',
        core: [
            'Spleen to root, combining the stubbornness to keep going against opposition with an instinct for which struggles are worth the cost. At its best this is real purposefulness - a life with something in it worth the difficulty.',
            'Its shadow is struggle for its own sake, and the specific despair of having fought hard for something that turned out not to matter.',
        ],
        extra: [sig('persistent', 0.8), sig('risk-oriented', 0.5)],
    },
    {
        id: '29-46', name: 'Committing without knowing where it goes',
        headline: 'A yes given to something whose outcome is not visible.',
        core: [
            'Sacral to identity, pairing the energy for wholehearted commitment with a certain good fortune in being in the right place. This connection succeeds by saying yes and finding out, which works remarkably often.',
            'Its difficulty is the yes given to the wrong thing with the same wholeheartedness, and the exhaustion of a commitment honoured long after it stopped being right.',
        ],
        extra: [sig('persistent', 0.7), sig('risk-oriented', 0.5), sig('receptive', 0.4)],
    },
    {
        id: '30-41', name: 'Wanting more than is available',
        headline: 'Desire that runs ahead of any actual opportunity.',
        core: [
            'Root to solar plexus, and this is the pressure of appetite: a felt sense of wanting an experience before there is anything concrete to want. It is the connection that starts things by imagining them first.',
            'Its shadow is a fantasy life richer than the actual one, and the frustration of desire that never quite finds an object equal to it.',
        ],
        extra: [sig('novelty-seeking', 0.7), sig('emotionally-expressive', 0.5)],
    },
    {
        id: '32-54', name: 'Ambition and the fear under it',
        headline: 'A drive to rise, with an instinct for what will last.',
        core: [
            'Spleen to root, joining ambition with the conservative instinct that assesses whether something will survive. This is a genuinely effective combination: the drive is real and the judgement about what is worth driving toward is unusually sound.',
            'Its shadow is the fear of failure that sits underneath the ambition, and a transformation pursued for status rather than for the thing itself.',
        ],
        extra: [sig('persistent', 0.7), sig('cautious', 0.5), sig('assertive', 0.5)],
    },
    {
        id: '34-57', name: 'Power guided by instinct',
        headline: 'Force with an accurate read on when to use it.',
        core: [
            'Sacral to spleen: the most powerful motor in the graph connected to the oldest awareness centre, so the energy is available and the instinct tells it when. At its best this is astonishingly effective and quite hard to argue with.',
            'Its shadow is power acting on an instinct it did not actually consult, which looks identical from outside and is not the same thing at all.',
        ],
        extra: [sig('persistent', 0.8), sig('intuitive', 0.7), sig('assertive', 0.5)],
    },
    {
        id: '35-36', name: 'Appetite for experience',
        headline: 'A need to have done things, and a restlessness before doing them.',
        core: [
            'Throat to solar plexus, and this is the connection of the person who needs to have tried it. Experience is accumulated for its own sake, and the emotional charge before something new is a large part of the point.',
            'Its shadow is the crisis manufactured out of boredom, and a life of considerable variety with very little depth anywhere in it.',
        ],
        extra: [sig('novelty-seeking', 0.8), sig('emotionally-expressive', 0.5)],
    },
    {
        id: '37-40', name: 'The bargain in a relationship',
        headline: 'Belonging, and the terms on which it is held.',
        core: [
            'Solar plexus to ego, joining the wish for community with the will to hold up your end of it. This is the wiring of the explicit or implicit bargain - what each side gives, what each side gets - that keeps a family or a team functioning.',
            'Its shadow is the bargain never actually stated, and the resentment of having kept terms nobody else agreed to.',
        ],
        extra: [sig('collaborative', 0.7), sig('emotionally-expressive', 0.5)],
    },
    {
        id: '39-55', name: 'Provocation and mood',
        headline: 'A capacity to stir feeling, in yourself and in others.',
        core: [
            'Root to solar plexus: pressure that provokes an emotional response, paired with a mood that has real range. This is the connection most associated with artistic feeling and with the ability to make other people feel something.',
            'Its shadow is provocation for its own sake, and a mood treated as a fact about the world rather than as weather passing through.',
        ],
        extra: [sig('emotionally-expressive', 0.8), sig('creative', 0.5)],
    },
    {
        id: '42-53', name: 'Finishing what was started',
        headline: 'Pressure to begin, and the energy to see a cycle through.',
        core: [
            'Root to sacral: the pressure to start something new combined with the life force to carry it to completion. This is the wiring of the full cycle, and it is genuinely uncomfortable when interrupted partway.',
            'Its shadow is starting cycles compulsively, and an inability to abandon one that should have been abandoned.',
        ],
        extra: [sig('persistent', 0.7), sig('structured', 0.5)],
    },
    {
        id: '47-64', name: 'Making sense of what happened',
        headline: 'Mental pressure to resolve the confusion into a picture.',
        core: [
            'Head to ajna, and this is the connection that turns fragments into meaning - images, memories and impressions that do not yet cohere, worked on until they do. When it resolves, it resolves into genuine realisation.',
            'Its shadow is the pressure to make sense of something before the material is there, and a confusion that gets treated as a personal failing rather than as the stage before understanding.',
        ],
        extra: [sig('conceptual', 0.8), sig('analytical', 0.5), sig('introspective', 0.5)],
    },
];
/* Every channel the engine defines must have an entry. The build fails loudly
   rather than shipping a chart with a channel that resolves to nothing. */
const written = new Set(entries.map((entry) => entry.id));
const engineIds = hdChannels.map((channel) => channel.id);
const missing = engineIds.filter((id) => !written.has(id));
if (missing.length > 0) {
    throw new Error(`Human Design channels with no interpretation: ${missing.join(', ')}`);
}
/* Widened to plain strings: hdChannels is a const-asserted tuple, so its ids
   are literal types the authored entries cannot satisfy without repeating the
   whole union here. */
const centersById = new Map(hdChannels.map((channel) => [channel.id, channel.centers]));
export const HD_CHANNELS = entries.map((entry) => channelUnit({
    key: entry.id,
    label: `Channel ${entry.id} — ${entry.name}`,
    headline: entry.headline,
    core: entry.core,
    signals: channelSignals((centersById.get(entry.id) ?? []).map((center) => (center === 'solarPlexus' ? 'solar-plexus' : center)), entry.extra ?? []),
}));
