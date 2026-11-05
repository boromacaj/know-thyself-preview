import { sig } from '../semanticDimensions.js';
import { authorityUnit, definitionUnit, signatureUnit, typeUnit, } from './hdAuthoring.js';
/**
 * TYPES, AUTHORITIES, DEFINITIONS, SIGNATURE AND NOT-SELF.
 *
 * The four things a reader needs before anything else in this system makes
 * sense, plus the two feedback markers the system uses to tell you whether it
 * is working.
 *
 * A NOTE ON HOW THESE ARE WRITTEN
 *
 * Type is not a personality. Human Design is explicit that it describes a
 * mechanic - how energy is available and how it renews - and the moment it gets
 * written as an identity ("Generators are hardworking people") it becomes an
 * astrology-column horoscope with different vocabulary. Every entry below
 * describes a mechanism and what living against it tends to feel like, and
 * none of them tells the reader who they are.
 */
/* ------------------------------------------------------------------ *
 * PHASE A - THE FIVE TYPES
 * ------------------------------------------------------------------ */
/**
 * The Manifesting Generator unit is exported on its own as well as in the list,
 * because humanDesignComposition.ts attaches contextual overlays to it. One
 * reading of the Type, with the composition layered on top rather than a second
 * copy sitting beside it.
 */
export const MANIFESTING_GENERATOR_BASE = typeUnit({
    key: 'manifesting-generator',
    label: 'Manifesting Generator',
    headline: 'The same engine, wired straight to the exit.',
    core: [
        'A Manifesting Generator has the Sacral engine of a Generator with a motor connected directly to the Throat, and that connection is why this design moves the way it does. It takes on several things at once, finds the route through by starting rather than by planning, and skips whatever step turns out not to have been necessary - which is more often than anyone likes to admit.',
        'The skipping is not carelessness. It is how this design finds the efficient path, and it usually turns out to have been right. What it produces is a distinctive friction with other people, and the friction is almost never about the decision itself. It is about the fact that you were already underway before anyone was told.',
    ],
    portrait: {
        workAndDirection: [
            'This design does badly in a single narrow track and well where several things can run at once. The correction that matters is not focus, which is rarely the real problem, but the source of the yes: work entered because it made sense on paper does not get the engine behind it, and no amount of discipline substitutes.',
        ],
        relationships: [
            'The strategy has a second half that the plain Generator does not need. Informing is not asking permission - it is removing the surprise, which is what most of the resistance is actually made of. One sentence before you move costs nothing and prevents most of it.',
        ],
        innerWorld: [
            'The internal experience of this design is of being several people\'s worth of momentum in one body, and of being slightly out of step with the pace around you. That is not impatience with other people so much as a genuinely different clock, and it is worth knowing about yourself before you conclude that everyone else is slow.',
        ],
        strengths: [
            'What this design does better than any other is find the working route through something nobody has mapped. It gets there by starting, discarding what does not hold, and arriving with a result that a more methodical approach would have taken three times as long to reach - and it is usually correct about which steps were skippable.',
        ],
        shadow: [
            'Frustration and anger both show up here: frustration from the Sacral spent wrongly, anger from the manifesting side meeting resistance it did not expect. The second is usually cheaper to fix than the first.',
            'The other recurring difficulty is the half-finished thing. This design abandons what stops being alive, which is correct behaviour for it and expensive for anyone who was depending on the abandoned item. The damage is almost never in the abandoning; it is in nobody having been told.',
        ],
        growth: [
            'Two habits carry most of the weight. Put yourself where real offers arrive rather than generating direction from nothing. And say early and plainly which of the several things you started you are not carrying any further, before anyone has built on them.',
        ],
    },
    signals: [sig('adaptable', 0.7), sig('persistent', 0.7), sig('novelty-seeking', 0.6), sig('assertive', 0.4)],
});
const types = [
    typeUnit({
        key: 'generator',
        label: 'Generator',
        headline: 'A renewable engine that answers rather than originates.',
        core: [
            'The defining mechanic is a defined Sacral, which the system treats as an engine rather than a battery. The energy is genuinely there and it comes back - but only when it has been spent on something the body actually said yes to. Spent on the wrong thing it does not renew, and the result is a specific exhaustion that is not about hours worked and does not respond to a holiday.',
            'The strategy is response. The Sacral answers what is in front of it rather than generating direction from nothing, so the reliable move is to put yourself where real things can arrive and then notice what your body opens toward. That is slower than deciding, and it is the difference between work that feeds you and work that quietly drains you for eleven years.',
        ],
        portrait: {
            workAndDirection: [
                'This is the design that can sustain a long piece of work better than any other, and the whole question is whether the work was entered by response or by reasoning. A Generator who talked themselves into a career has the same capacity as one who responded to it and none of the fuel.',
            ],
            relationships: [
                'In relationships the same rule holds: the yes has to come from the body rather than from the case in favour. Generators are unusually steady partners when the relationship was responded to, and unusually stuck when it was decided on.',
            ],
            shadow: [
                'Frustration is the signal, and it is worth reading as information rather than as a character flaw. It builds where energy is going into something the body never agreed to, and it does not respond to trying harder - it responds to stopping.',
            ],
            growth: [
                'The practical work is arranging a life where real things arrive to be responded to. That means fewer plans and more exposure: conversations, invitations, situations you have put yourself near. It also means treating a no with no reasons attached as a complete answer.',
            ],
        },
        signals: [sig('persistent', 0.8), sig('receptive', 0.6), sig('stability-seeking', 0.5)],
    }),
    typeUnit({
        key: 'manifestor',
        label: 'Manifestor',
        headline: 'Built to initiate, and to meet resistance for it.',
        core: [
            'A Manifestor has a motor connected to the Throat and no defined Sacral, which in this system means the capacity to start things without waiting for anything to arrive. This is the only design built to initiate. The energy comes in bursts rather than steadily - real force, available for a while, followed by a genuine need to stop that is not laziness and does not negotiate.',
            'The recurring experience is resistance from other people, and the system reads it as a reaction to being taken by surprise rather than to the initiative itself. Informing before acting is not asking permission, and the distinction is the whole point: you are removing the surprise, not requesting approval, and it costs one sentence delivered to whoever the move affects.',
        ],
        portrait: {
            workAndDirection: [
                'This design does badly in roles that require continuous availability and well in ones that permit a burst followed by a gap. A Manifestor forced onto a steady schedule will produce less than one left to work in its own rhythm, and will be considerably less pleasant while doing it.',
            ],
            relationships: [
                'The informing habit matters most here and is hardest here, because it feels like permission-seeking to someone who has spent a lifetime being told they are too much. It is not. It is the cheapest available way to stop being resisted for things that were never objectionable.',
            ],
            shadow: [
                'Anger is the signal. It builds where the initiating impulse keeps being blocked, and much of that blocking is the accumulated consequence of not informing. The rest of it is real, and is the price of being the one who moves first.',
            ],
            growth: [
                'Protect the rest. This design is genuinely not built to run continuously, and treating the gap as a failure is the fastest route to burning out the burst. Inform, act, then stop without justifying the stopping.',
            ],
        },
        signals: [sig('independent', 0.8), sig('assertive', 0.8), sig('risk-oriented', 0.5)],
    }),
    typeUnit({
        key: 'projector',
        label: 'Projector',
        headline: 'Built to see the system, not to run it.',
        core: [
            'A Projector has no motor connected to the Throat and no defined Sacral. The system treats that not as a deficit but as a different function: the capacity to see how another person, or a whole organisation, actually works. That perception is unusually accurate and it is the thing this design has to offer, which is a genuinely valuable thing to have.',
            'The difficulty is that it cannot be pushed at anyone. The same insight offered unasked lands as interference rather than as help, and years spent trying to match the output of people with Sacral engines produce the exhaustion and the bitterness the system names as this design\'s not-self theme. Waiting for recognition sounds passive and is not; it is the recognition that this perception only works where it has been invited.',
        ],
        portrait: {
            workAndDirection: [
                'Guidance, advisory and diagnostic work suit this design; continuous output does not. A Projector working a Generator\'s hours is not lazy when it collapses, it is running an engine it does not have. Fewer hours of the right work is the whole strategy.',
            ],
            relationships: [
                'Recognition is the mechanism here and it is worth being deliberate about. Being around people who see you accurately changes what this design is capable of, and being around people who do not is genuinely depleting rather than merely unpleasant.',
            ],
            shadow: [
                'Bitterness is the signal, and it usually means the same insight has been offered repeatedly to people who did not ask. The temptation is to conclude nobody values you. The more useful reading is that the invitation is the thing that makes it land.',
            ],
            growth: [
                'The practical work is becoming findable rather than becoming louder. Put the perception somewhere it can be encountered, and let the invitation come. And rest more than seems reasonable - this design recovers on a different schedule.',
            ],
        },
        signals: [sig('analytical', 0.7), sig('introspective', 0.6), sig('emotionally-sensitive', 0.6), sig('receptive', 0.5)],
    }),
    typeUnit({
        key: 'reflector',
        label: 'Reflector',
        headline: 'No fixed definition: an instrument for reading the room.',
        core: [
            'A Reflector has no defined centres at all, which makes this the rarest design by a wide margin and the one most completely shaped by environment. Rather than having a fixed way of being, this design samples what is present and reflects it back - which makes a Reflector an unusually accurate instrument for the health of a group, and an unusually variable experience from the inside.',
            'Place and company are not preferences here, they are the primary variable. The same person is genuinely different in a different room, and the useful question is never "what is wrong with me this week" but "where have I been and who with". Decisions need time for the same reason: a design with no fixed definition reads a question differently depending on the conditions, so one reading is one data point.',
        ],
        portrait: {
            workAndDirection: [
                'This design does best where variety is permitted and where the environment is genuinely good, and it suffers disproportionately in a bad one. Choosing where to be is a bigger lever here than choosing what to do.',
            ],
            relationships: [
                'Reflectors take on the state of the people around them, which makes company a choice with consequences rather than a preference. It also makes this design an accurate mirror for a group, which is a real gift and easily mistaken by others for having no opinions.',
            ],
            shadow: [
                'Disappointment is the signal. It builds where the environment has been wrong for long enough that the reflection has nothing good in it, and the honest response is usually to change the room rather than to work on the self.',
            ],
            growth: [
                'The system suggests a full lunar cycle - about twenty-eight days - before a significant decision, so the question can be seen under every configuration. That is not a delaying tactic; for this design it is the measurement.',
            ],
        },
        signals: [sig('adaptable', 0.9), sig('emotionally-sensitive', 0.8), sig('receptive', 0.6)],
    }),
];
/* ------------------------------------------------------------------ *
 * PHASE B - THE EIGHT AUTHORITIES
 * ------------------------------------------------------------------ */
const authorities = [
    authorityUnit({
        key: 'sacral',
        label: 'Sacral Authority',
        headline: 'The body answers before the mind has finished the question.',
        core: [
            'Sacral authority is the fastest in the system and the least verbal. When a real question is put to you, something in the body opens toward it or closes against it, and that movement is the answer. The system describes it as a sound rather than a sentence - a lift or a flatness that arrives in the gut before any reasoning has happened.',
            'It is accurate in the moment it is asked and considerably less accurate afterwards. Given time, the mind assembles a case, and the case is not the authority. What this asks of you in practice is slightly awkward: getting real questions put to you out loud, in a form the body can answer, by someone willing to ask plainly rather than to present an argument.',
        ],
        portrait: {
            shadow: [
                'The common interference is the good reason. An opportunity looks right on paper, the mind builds a case, and the decision gets made by the case rather than by the body. The energy then does not show up, and the exhaustion that follows is the clearest evidence you will get that the yes was never real.',
            ],
            relationships: [
                'This authority needs someone who will ask rather than persuade. A partner who presents conclusions is genuinely harder to decide alongside than one who asks a plain question and waits, and that is worth saying out loud early rather than discovering over years.',
            ],
            growth: [
                'Trust the no that arrives with no argument attached. That is the harder half, because a refusal you cannot justify feels irresponsible, and in this design it is the most reliable signal available.',
            ],
        },
        signals: [sig('intuitive', 0.7), sig('receptive', 0.5), sig('analytical', 0.2)],
    }),
    authorityUnit({
        key: 'emotional-solar-plexus',
        label: 'Emotional Authority',
        headline: 'There is no truth in the moment. Wait for the wave.',
        core: [
            'A defined Solar Plexus runs on a wave, and the system is unambiguous about the consequence: clarity does not exist at any single point on it. What feels obviously right at the top and obviously impossible at the bottom is the same decision seen from two positions, and neither position is the answer. This is the slowest authority in the system.',
            'The instruction is not to deliberate - the mind will happily fill the time with deliberation and produce nothing - but to let time pass and sample the same question more than once. What you are looking for is not a feeling that is pleasant but one that stays roughly constant across the wave.',
        ],
        portrait: {
            shadow: [
                'Social pressure is what usually overrides it. Being asked to answer now, in the room, is the standard condition of adult life and it is precisely what this authority cannot do well. Almost every serious misstep available here is a decision made at the top of a wave in front of somebody who wanted an answer.',
            ],
            relationships: [
                'Saying "I need to sleep on it" is the single most useful sentence available to this design, and it is worth establishing early so it reads as process rather than as reluctance. Emotional weather also gets read by others as being about them when it is frequently about nothing.',
            ],
            growth: [
                'Notice the shape of your own wave - whether it builds slowly and breaks, or moves in shorter cycles - because knowing where you are on it is most of the skill. And accept that a real deadline sometimes forces a decision before clarity; that is a cost, not a failure of the method.',
            ],
        },
        signals: [sig('emotionally-expressive', 0.7), sig('emotionally-sensitive', 0.7), sig('cautious', 0.6)],
    }),
    authorityUnit({
        key: 'splenic',
        label: 'Splenic Authority',
        headline: 'A quiet signal, once, in the present tense.',
        core: [
            'Splenic authority is instantaneous and does not repeat. It arrives as a soft, unemphatic sense of whether something is safe or right - not a conviction, not a feeling with any drama attached, more like a slight lean - and it is easy to talk over precisely because it does not insist.',
            'It also does not come back. A splenic no that was ignored will not be offered a second time, and the mind will then construct reasons in the space it left. This is the most understated authority in the system and the one most often overwritten by an argument that seemed sensible at the time.',
        ],
        portrait: {
            shadow: [
                'The interference is volume. Anything louder than the signal displaces it - other people\'s certainty, your own reasoning, the pressure of a room - and afterwards you will often be able to recall the moment you knew and the moment you talked yourself out of it.',
            ],
            relationships: [
                'This authority reads people quickly and quietly, and it is usually right. The difficulty is defending an impression you cannot evidence, which is why it is worth acting on the first read rather than waiting until you can justify it.',
            ],
            growth: [
                'The practical discipline is noticing something that quiet, which mostly means slowing down at the moment of decision rather than in general. And acting on it before the reasons arrive. The reasons will arrive, they will sound sensible, and they are not the authority speaking.',
            ],
        },
        signals: [sig('intuitive', 0.9), sig('emotionally-sensitive', 0.6), sig('cautious', 0.3)],
    }),
    authorityUnit({
        key: 'ego-manifested',
        label: 'Ego Manifested Authority',
        headline: 'What do I actually want out of this?',
        core: [
            'This authority runs through the Heart, and the question it answers is about will and self-interest rather than about correctness. The reliable signal is whether you genuinely want the thing and whether you have the will to see it through - which sounds selfish and is, in this design, the honest question.',
            'It tends to become clear as it is spoken. Saying out loud what you want from a situation usually resolves it faster than thinking about it, partly because the mouth commits to things the mind will hedge on.',
        ],
        portrait: {
            shadow: [
                'The interference is obligation. This authority is easily overridden by what ought to be wanted, and a commitment made from duty rather than from will does not get the willpower behind it and quietly fails later.',
            ],
            relationships: [
                'Being direct about what you want is not a character defect in this design; it is the decision mechanism rather than a personality trait to be managed. Softening it to sound more agreeable produces agreements you cannot actually keep, and the person on the other side is worse off for having been given a yes that was never real.',
            ],
            growth: [
                'Watch for the promise made to be generous. This authority can only deliver what it actually wanted to deliver, so an over-committed yes is a debt rather than a kindness. Saying what you actually want, plainly and early, is kinder in practice than a generous answer you will have to withdraw.',
            ],
        },
        signals: [sig('assertive', 0.7), sig('independent', 0.6), sig('persistent', 0.5)],
    }),
    authorityUnit({
        key: 'ego-projected',
        label: 'Ego Projected Authority',
        headline: 'Listen to what you say when you are not performing.',
        core: [
            'A rarer configuration in which the truth emerges through speaking rather than through deliberation. The instruction is to talk it through with someone trusted - not for their advice, and ideally not with someone who will offer any - because what you are listening for is your own voice.',
            'The position is usually already there and only becomes audible out loud. What sounds different when you say it is the information; what you thought before you spoke is generally the mind rather than the authority.',
        ],
        portrait: {
            shadow: [
                'Talking to someone who advises is the standard interference. Their answer displaces yours, and this authority is particularly susceptible because it is already in listening mode. Tell the person in advance that you are not after their opinion; most people manage it easily once asked.',
            ],
            relationships: [
                'This design needs at least one person who will let it think out loud without steering. That is a specific and slightly unusual thing to ask for, and worth asking for explicitly.',
            ],
            growth: [
                'Notice the difference between talking to decide and talking to be reassured. They sound identical and only one of them works. The tell is usually whether you keep returning to the same option or keep looking for someone who will approve of it.',
            ],
        },
        signals: [sig('communicative', 0.7), sig('independent', 0.5), sig('assertive', 0.4)],
    }),
    authorityUnit({
        key: 'self-projected',
        label: 'Self-Projected Authority',
        headline: 'The direction is in the voice, not in the reasoning.',
        core: [
            'This authority runs from the G Centre to the Throat, and it is about direction and identity rather than about energy or emotion. Talking a decision through with someone who will simply listen lets you hear which option your own voice moves toward, and that movement is the answer.',
            'What you are listening for is not the argument but the lift - the option that sounds like you when you say it. This design knows where it is going considerably better than it knows why.',
        ],
        portrait: {
            shadow: [
                'Deciding silently is the interference. This authority does not resolve internally, and a decision made alone in the head tends to be the mind\'s, not the design\'s. The mind is perfectly capable of producing a well-argued answer that this authority never actually gave.',
            ],
            relationships: [
                'Like the projected Ego, this needs a listener rather than an adviser, and the quality of that person matters more than their judgement does. Someone patient and largely silent is worth more to you here than someone clever with opinions.',
            ],
            growth: [
                'Pay attention to what you keep circling back to when you talk. Direction here repeats itself before it announces itself. The thing you have mentioned three times without noticing is usually the answer.',
            ],
        },
        signals: [sig('communicative', 0.7), sig('intuitive', 0.5), sig('independent', 0.4)],
    }),
    authorityUnit({
        key: 'mental-environmental',
        label: 'Mental Projected Authority',
        headline: 'The environment decides more than the argument does.',
        core: [
            'With no inner definition to decide from, this authority works through discussion and, decisively, through place. The system reads the right environment as the actual determinant: the same question answered in the wrong room reliably gets the wrong answer, and the reliable practice is to talk it through with several trusted people and notice where you were when it became clear.',
            'This is the authority most easily mistaken for having none. It does have one; it is simply distributed across conversation and setting rather than located in the body.',
        ],
        portrait: {
            shadow: [
                'The interference is deciding under pressure in a bad environment, which for this design produces a confident answer that turns out to have been the room talking. The confidence is the misleading part, because it feels indistinguishable from clarity at the time.',
            ],
            relationships: [
                'Several sounding boards work better than one, because no single person\'s framing gets to dominate. Choosing them for their willingness to listen rather than their expertise is the useful criterion. An expert who arrives with a conclusion is less useful here than a friend who asks what you think.',
            ],
            growth: [
                'Keep a note of where you are when things resolve. Over a year the pattern in that note is more useful than any amount of introspection. Most people with this authority are surprised by how narrow the list of good places turns out to be.',
            ],
        },
        signals: [sig('analytical', 0.6), sig('communicative', 0.6), sig('emotionally-sensitive', 0.5)],
    }),
    authorityUnit({
        key: 'lunar',
        label: 'Lunar Authority',
        headline: 'A month, and then the answer.',
        core: [
            'Only Reflectors carry this. With nothing fixed in the design to decide from, a question reads differently depending on the conditions passing through, and the twenty-eight days of a lunar cycle are not a delaying tactic - they are the measurement itself.',
            'What you are watching for over that month is which way the question keeps resolving as the conditions change. A consistent answer across varied conditions is the closest thing to certainty this design gets, and it is a genuinely reliable one.',
        ],
        portrait: {
            shadow: [
                'Pressure to decide now is the standard interference and it is constant, because almost nothing in ordinary life is designed around a month-long decision process. Where a real deadline makes the full cycle impossible, the honest move is to name the compromise rather than to pretend the answer is settled.',
            ],
            relationships: [
                'This needs to be explained early to anyone close, or it reads as avoidance. Framed as a process rather than as reluctance, most people accommodate it without difficulty. What causes trouble is silence: an unexplained delay is read as avoidance by almost everybody.',
            ],
            growth: [
                'Talk it through with different people at different points in the month rather than sitting with it alone. The variety is doing the work. A month spent circling the same question alone gives you one set of conditions repeated, which is the opposite of what this authority needs.',
            ],
        },
        signals: [sig('adaptable', 0.7), sig('emotionally-sensitive', 0.6), sig('cautious', 0.6)],
    }),
];
/* ------------------------------------------------------------------ *
 * PHASE D - DEFINITION
 * ------------------------------------------------------------------ */
const definitions = [
    definitionUnit({
        key: 'single-definition',
        label: 'Single Definition',
        headline: 'Everything defined is connected: one continuous circuit.',
        core: [
            'All of the defined centres in this chart join into one channel network, which means the design is internally self-contained. Information moves through the whole of it without needing anything from outside, and the result is unusual consistency - you tend to be recognisably the same person in most rooms, and you process things through to a conclusion on your own.',
            'The characteristic difficulty is the mirror image of that. A self-contained system does not naturally leave a gap for anyone else, so it can be genuinely hard to let people in and easy not to notice when you have stopped. Others may experience you as complete in a way that reads, unintentionally, as not needing them.',
        ],
        signals: [sig('independent', 0.7), sig('persistent', 0.5), sig('stability-seeking', 0.4)],
    }),
    definitionUnit({
        key: 'split-definition',
        label: 'Split Definition',
        headline: 'Two defined areas, and a gap that other people bridge.',
        core: [
            'The defined centres here fall into two groups with no channel joining them, and that gap is a real structural feature rather than a flaw. There is often a persistent sense of two parts that do not quite meet - a way of thinking and a way of acting that operate well separately and take an extra beat to line up.',
            'Certain people close that gap, and being around them can feel like something clicking into place. That is a genuine effect and it is worth knowing what it is: the relief of the split closing is not the same signal as your authority saying yes, and it is easy to mistake one for the other. Nothing here means you are incomplete or that you require another person - the system describes an orientation toward others, not a dependency.',
        ],
        signals: [sig('collaborative', 0.6), sig('adaptable', 0.4)],
    }),
    definitionUnit({
        key: 'triple-split-definition',
        label: 'Triple Split Definition',
        headline: 'Three defined areas, and a design that takes its time.',
        core: [
            'The defined centres fall into three separate groups. In practice this tends to read as needing more time and more input before things settle - not slower thinking, but more separate processes that each have to arrive before the whole picture does. Rushing this design produces a partial answer rather than a quick one.',
            'Busier environments often suit it better than quiet ones, because more contact means more of the gaps get bridged incidentally rather than having to be waited out. The corresponding cost is that a lot of input arrives with the bridging, and sorting your own conclusions from the room\'s takes deliberate attention.',
        ],
        signals: [sig('adaptable', 0.6), sig('collaborative', 0.5), sig('cautious', 0.4)],
    }),
    definitionUnit({
        key: 'quadruple-split-definition',
        label: 'Quadruple Split Definition',
        headline: 'Four defined areas: fixed in parts, and rare.',
        core: [
            'Four separate groups of defined centres, which is uncommon. The system reads this as a design with a great deal of fixed material in it - each group is consistent and reliable in its own terms - alongside considerable distance between those groups.',
            'What this tends to produce is someone quite settled in several specific ways and correspondingly slow to integrate them into a single position. The useful approach is generally patience rather than effort: with this many separate processes, insisting on a unified answer quickly is asking the design for something it is not shaped to give.',
        ],
        signals: [sig('persistent', 0.5), sig('adaptable', 0.5), sig('stability-seeking', 0.4)],
    }),
    definitionUnit({
        key: 'multiple-split-definition',
        label: 'Multiple Split Definition',
        headline: 'Several separate defined areas across the graph.',
        core: [
            'The defined centres form several distinct groups rather than one connected network. The reading is broadly the same in kind as the other splits and more so in degree: more separate internal processes, more time needed before they align, and more benefit from contact with other people and with varied environments.',
            'None of this describes a deficiency. A design with many separate groups has a lot of fixed, dependable material in it; what it does not have is a single internal circuit that resolves everything at once, and expecting one is the main way this configuration gets misread by the person carrying it.',
        ],
        signals: [sig('adaptable', 0.6), sig('collaborative', 0.5)],
    }),
    definitionUnit({
        key: 'no-definition',
        label: 'No Definition',
        headline: 'Nothing fixed: entirely shaped by what is present.',
        core: [
            'With no defined centres there is no consistent internal wiring, and the design works by sampling its surroundings. This is the Reflector configuration, and it is rare. Nothing here is constant from the inside, which is disorienting if you expect consistency and coherent once you stop.',
            'Place and company are the primary variables rather than incidental ones. The same person genuinely operates differently in a different room, and choosing the room is a bigger lever in this design than any amount of self-management.',
        ],
        signals: [sig('adaptable', 0.9), sig('emotionally-sensitive', 0.8), sig('receptive', 0.5)],
    }),
];
/* ------------------------------------------------------------------ *
 * PHASE H - SIGNATURE AND NOT-SELF
 * ------------------------------------------------------------------ */
const feedback = [
    signatureUnit({
        key: 'signature-satisfaction',
        label: 'Signature: Satisfaction',
        headline: 'The marker that says the energy went somewhere real.',
        core: [
            'The system pairs each Type with a feeling it uses as feedback rather than as a goal. For the Sacral designs that marker is satisfaction: the particular tiredness at the end of a day that feels earned rather than wasted. It is not happiness and it is not achievement - it is the sense that the energy went into something the body actually wanted.',
            'Read it as a gauge rather than a destination. Its presence suggests the response mechanism is being used; its absence over months suggests energy is going somewhere it was never agreed to. Neither reading says anything about whether the life is a good one, which is a separate question the system does not attempt to answer.',
        ],
        signals: [sig('persistent', 0.5), sig('stability-seeking', 0.4)],
    }),
    signatureUnit({
        key: 'signature-peace',
        label: 'Signature: Peace',
        headline: 'The marker for a design built to move first.',
        core: [
            'For a Manifestor the system names peace as the signature - not excitement, which would be the obvious guess for a design built on initiation, but the quiet that follows a move that met no unnecessary resistance. It tends to arrive after informing rather than after succeeding.',
            'Its absence over a long period usually points at the same thing: a pattern of acting without telling anyone, and then absorbing the reaction. Peace here is closer to a diagnostic than to an aspiration.',
        ],
        signals: [sig('independent', 0.5), sig('stability-seeking', 0.4)],
    }),
    signatureUnit({
        key: 'signature-success',
        label: 'Signature: Success',
        headline: 'The marker for a design that works through recognition.',
        core: [
            'For a Projector the system names success, and it means something narrower than the ordinary word: the experience of the right thing being recognised and used, rather than of achievement in general. A Projector can be objectively accomplished and entirely without this marker.',
            'Its presence suggests the guidance is landing where it was invited. Its absence usually points at effort spent where nobody asked, which is the specific way this design exhausts itself.',
        ],
        signals: [sig('analytical', 0.4), sig('collaborative', 0.4)],
    }),
    signatureUnit({
        key: 'signature-surprise',
        label: 'Signature: Surprise',
        headline: 'The marker for a design with nothing fixed in it.',
        core: [
            'For a Reflector the system names surprise - the sense of being genuinely delighted by something unforeseen, which is available to a design that is not carrying a fixed expectation into the room. It is the least goal-shaped of the signatures and the hardest to manufacture.',
            'Its absence tends to indicate an environment that has been wrong for too long. For this design that is usually a statement about the place rather than about the person.',
        ],
        signals: [sig('adaptable', 0.5), sig('novelty-seeking', 0.4)],
    }),
    signatureUnit({
        key: 'not-self-frustration',
        label: 'Not-Self Theme: Frustration',
        headline: 'A feedback pattern, not a diagnosis.',
        core: [
            'The system pairs each Type with a recurring difficulty it treats as feedback. For the Sacral designs that is frustration, and the reading is specific: it builds where energy is going into something the body never agreed to, and it does not respond to trying harder because effort was never the missing part.',
            'It is worth saying plainly that this is a lens rather than a verdict. Frustration has ordinary causes too, and reading every instance of it as a design error would be its own kind of mistake. What the system offers is a question worth asking when it becomes chronic: what did I say yes to that I never actually wanted.',
        ],
        signals: [sig('persistent', 0.4)],
    }),
    signatureUnit({
        key: 'not-self-anger',
        label: 'Not-Self Theme: Anger',
        headline: 'A feedback pattern for a design built to initiate.',
        core: [
            'For a Manifestor the system names anger, and it reads as the residue of initiation meeting resistance - much of it the accumulated consequence of moving without informing, and some of it simply the cost of being the one who goes first in rooms that would rather nobody did.',
            'As with all of these, it is offered as a lens rather than as an explanation of a person. Chronic anger has many causes; what this suggests is one worth checking, which is how much of the resistance was avoidable.',
        ],
        signals: [sig('assertive', 0.4)],
    }),
    signatureUnit({
        key: 'not-self-bitterness',
        label: 'Not-Self Theme: Bitterness',
        headline: 'A feedback pattern for a design that works by invitation.',
        core: [
            'For a Projector the system names bitterness, and the reading is that it accumulates where accurate perception has been offered repeatedly to people who did not ask for it, or where effort has been matched to an energy the design does not have.',
            'The tempting conclusion is that others do not value you. The reading the system offers instead is narrower and more useful: that the invitation is what makes the perception land, and that its absence is information about timing rather than about worth.',
            'As with the other themes, this is a lens rather than a verdict. Bitterness has ordinary causes, and reading every instance of it through a chart would be its own mistake; what the system offers is one question worth asking when it becomes chronic.',
        ],
        signals: [sig('introspective', 0.4)],
    }),
    signatureUnit({
        key: 'not-self-disappointment',
        label: 'Not-Self Theme: Disappointment',
        headline: 'A feedback pattern for a design shaped by its environment.',
        core: [
            'For a Reflector the system names disappointment, and it is read as environmental rather than personal: it builds where the surroundings have been wrong long enough that there is nothing good left to reflect.',
            'The honest response the system points to is usually to change the room rather than to work on the self, which is unusual advice and, for this design, the more accurate of the two.',
            'This is a lens rather than a verdict, as with the other themes. Disappointment has ordinary causes; what the system offers is one question worth asking when it becomes persistent, which is whether the environment has been right.',
        ],
        signals: [sig('emotionally-sensitive', 0.4)],
    }),
];
export const HD_TYPES_AND_AUTHORITIES = [
    /* MG is registered by humanDesignComposition.ts, with its overlays attached. */
    ...types, ...authorities, ...definitions, ...feedback,
];
