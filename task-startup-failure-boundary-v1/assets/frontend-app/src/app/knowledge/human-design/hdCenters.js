import { centerStateUnit } from './hdAuthoring.js?v=2ea79e9';
/**
 * THE NINE CENTRES, IN BOTH STATES.
 *
 * Eighteen units. A defined centre and an open one are separate readings rather
 * than one reading with a modifier, because they describe genuinely different
 * situations: definition is a fixed, reliable way that energy operates, and
 * openness is variability that becomes, over a long time, a kind of expertise
 * about the thing you never had fixed.
 *
 * THE ONE MISREADING WORTH HEADING OFF
 *
 * Open does not mean absent, deficient, or the opposite of defined. The system
 * is consistent that an open centre takes in and amplifies what is around it,
 * and that the accumulated experience of doing so is where the wisdom in a chart
 * tends to sit. Writing an open Throat as "you struggle to communicate" would be
 * both wrong and the single most common way this material gets flattened.
 *
 * ON "UNDEFINED" VERSUS "OPEN"
 *
 * The canon distinguishes an UNDEFINED centre - no channel, but at least one
 * gate activated, so there is something to filter through - from a fully OPEN
 * one with no gates at all, which takes in everything indiscriminately. The
 * engine currently reports definition state only, not gate presence per centre,
 * so this library writes one open-state reading per centre and records the
 * finer distinction as a gap rather than faking it. See
 * RESEARCH_HUMAN_DESIGN#centre-states.
 */
const centers = [
    /* ------------------------------------------------------------ HEAD */
    centerStateUnit('head', true, {
        label: 'Head — defined',
        headline: 'A mental pressure that is reliably your own.',
        core: [
            'The Head is a pressure centre: it supplies the push to make sense of things. Defined, that pressure is consistent and it originates in you. There is always a question running, and it is your question rather than one picked up from the room, which makes for a steady source of inspiration and an equally steady mental hum that does not switch off.',
            'The useful thing to know is that this pressure does not indicate anything needs solving. It is simply how this centre operates, and treating every question it generates as a task produces a great deal of unnecessary work.',
        ],
        portrait: {
            shadow: [
                'The overuse is pressuring other people with your questions. A defined Head can hand a room a problem it did not have and then be puzzled by the reaction. Holding the question rather than distributing it is most of the courtesy this centre has to learn.',
            ],
            growth: [
                'Distinguish a question worth pursuing from the mechanism producing questions. Most of them are the second kind, and they do not require an answer. Letting a question sit unanswered without treating it as unfinished business is the practical skill here.',
            ],
        },
    }),
    centerStateUnit('head', false, {
        label: 'Head — open',
        headline: 'Takes in everyone else\'s questions and feels obliged to answer them.',
        core: [
            'An open Head amplifies the mental pressure in the environment. You pick up the questions other people are carrying, and because they arrive inside your own head they are indistinguishable from your own until you learn the difference. The recurring difficulty is busyness about problems that were never yours to solve.',
            'Over time this becomes a genuine discrimination: an open Head that has been paying attention gets very good at telling which questions are worth taking on, which is not a judgement a defined Head has to make.',
        ],
        portrait: {
            shadow: [
                'The trap is answering everything. An open Head can spend years mentally occupied by inherited questions and mistake the occupation for thinking. The occupation is genuinely tiring, which is why it is so easily mistaken for work.',
            ],
            growth: [
                'Ask whose question this is, routinely and out loud if necessary. Most of the noise resolves on that single question. What remains after it is usually one or two questions that are genuinely yours and worth the attention.',
            ],
        },
    }),
    /* ------------------------------------------------------------ AJNA */
    centerStateUnit('ajna', true, {
        label: 'Ajna — defined',
        headline: 'A fixed way of processing, dependable and hard to step outside.',
        core: [
            'The Ajna is the awareness centre that organises thinking into concepts. Defined, it holds a consistent conceptual style: you process information the same way each time, other people can rely on how you will approach a problem, and you have opinions that stay put.',
            'The fixity is the strength and the limit together. A defined Ajna is genuinely certain in a way that is useful to everyone around it, and genuinely unable to step outside its own frame when the frame is the thing that needs changing.',
        ],
        portrait: {
            shadow: [
                'Being sure is the overuse. A defined Ajna can hold a position long past the evidence and experience that as consistency rather than as rigidity. The two are genuinely hard to tell apart from inside, which is why this centre benefits from someone willing to say which one it is looking like.',
            ],
            growth: [
                'Seek out the frame you do not use rather than the argument you can win inside the one you do. Winning inside your own frame confirms the frame and teaches you nothing, which is comfortable and expensive over a career.',
            ],
        },
    }),
    centerStateUnit('ajna', false, {
        label: 'Ajna — open',
        headline: 'Genuinely flexible thinking, under pressure to appear certain.',
        core: [
            'An open Ajna takes in and amplifies the certainty of whoever is around it, which is why a firmly stated view can displace your own without you noticing the substitution. What it gains from that is genuine flexibility: this centre can hold a position it does not believe in order to understand it from the inside, and change its mind without any sense of loss. Most people are considerably more attached to their conclusions than they think.',
            'The pressure that comes with it is a felt need to seem certain. An open Ajna often over-prepares, over-qualifies, or adopts a firm-sounding position it does not hold, because not knowing feels exposing in a way that it simply does not for a defined one.',
        ],
        portrait: {
            shadow: [
                'Pretending to certainty is the trap, and it is exhausting. So is the reverse - refusing to commit to any view on the grounds that another might be better. Both are attempts to avoid the same discomfort, which is being visibly unsure in front of someone.',
            ],
            growth: [
                'Practise saying you have not decided. This is the centre where tolerating public uncertainty is the entire developmental task. It gets easier, and the flexibility underneath it turns out to be worth considerably more than the certainty you were imitating.',
            ],
        },
    }),
    /* ---------------------------------------------------------- THROAT */
    centerStateUnit('throat', true, {
        label: 'Throat — defined',
        headline: 'Consistent access to expression, in a recognisable register.',
        core: [
            'The Throat is where things get said and done. Defined, you have reliable access to it: speaking and acting are available when you want them, in a voice other people learn to expect, and you do not generally have to wait to be given the floor.',
            'The corresponding risk is talking because the channel is open rather than because there is something to say. A defined Throat fills silence easily, and not all of what fills it needed saying.',
        ],
        portrait: {
            shadow: [
                'Dominating the conversation is the overuse, usually without noticing. The channel being available is not the same as the moment being right. A defined Throat that has learned to wait is considerably more persuasive than one that has not.',
            ],
            growth: [
                'Notice how much of what you say was prompted by the pause rather than by the point. It is usually more than expected, and cutting it improves how the rest lands considerably. Silence from a defined Throat carries weight precisely because the channel was available and went unused.',
            ],
        },
    }),
    centerStateUnit('throat', false, {
        label: 'Throat — open',
        headline: 'Waits to be asked, and fills silence when anxious.',
        core: [
            'An open Throat takes in and amplifies the pressure to speak that is present around it, and does not have consistent access to expression of its own. It works best when invited - when someone asks, or when the moment genuinely calls for it - and considerably less well when it has to make its own opening. Under pressure it tends to speak to fill the silence and regret the shape of what came out.',
            'What develops here over time is timing. An open Throat that has paid attention becomes unusually good at knowing when a room is ready to hear something, which is a skill a defined Throat never has to acquire.',
        ],
        portrait: {
            shadow: [
                'The trap is talking to get attention and then feeling worse for having done it. That cycle is the most reliable signal that this centre is running the environment rather than itself.',
            ],
            growth: [
                'Wait to be asked, which sounds passive and is the specific discipline. What you say when invited lands very differently from what you say to be noticed. The same sentence, offered in the two situations, does not get the same hearing - which is worth knowing before concluding that nobody listens.',
            ],
        },
    }),
    /* --------------------------------------------------------------- G */
    centerStateUnit('g', true, {
        label: 'G / Identity — defined',
        headline: 'A stable sense of who you are and roughly where you are going.',
        core: [
            'The G Centre carries identity, direction and love. Defined, it supplies a consistent sense of self that survives changes of job, city and company: you are recognisably yourself in most contexts, and your sense of direction comes from inside rather than from the situation.',
            'That stability is genuinely valuable and it can also be a blind spot. A defined G tends to assume other people have the same fixed reference and is puzzled by those who do not.',
        ],
        portrait: {
            shadow: [
                'Insisting on your direction as the correct one is the overuse. Consistency of self is not the same as being right about where to go. A defined G can hold a direction with total conviction and still have picked it at twenty-two for reasons that no longer apply.',
            ],
            growth: [
                'Notice that other people\'s direction genuinely shifts with circumstance, and that this is a design feature rather than a lack of character. Reading someone else\'s variability as inconsistency is the standard misjudgement this centre makes.',
            ],
        },
    }),
    centerStateUnit('g', false, {
        label: 'G / Identity — open',
        headline: 'Identity and direction shift with where you are and who you are with.',
        core: [
            'An open G takes its sense of self and its sense of direction from the environment. You are genuinely a different person in a different room, and the question of who you really are is one you may have been carrying uncomfortably for a long time. The system\'s answer is that the variability is the design rather than a failure to have arrived.',
            'This makes place and company unusually consequential. Where you live and who you spend time with are not lifestyle preferences here; they are the mechanism by which identity forms, and choosing them deliberately is the closest thing to self-determination this centre offers.',
        ],
        portrait: {
            shadow: [
                'The trap is searching for a fixed identity and treating each shift as evidence of having failed to find one. Years can go into that search. The search is not answered by finding something; it is answered by noticing that the question was framed wrongly.',
            ],
            growth: [
                'Choose the environment rather than the identity. An open G in the right place develops an unusually broad understanding of what people can be. That breadth is a genuine and quite rare form of wisdom, and it is only available to someone who was never fixed.',
            ],
        },
    }),
    /* ---------------------------------------------------- EGO / HEART */
    centerStateUnit('ego', true, {
        label: 'Ego / Heart — defined',
        headline: 'Consistent willpower, and a settled sense of your own worth.',
        core: [
            'The Ego is the motor of will, worth and the promise kept. Defined, willpower is reliably available: commitments made can generally be delivered, and the ordinary human wobble about whether you are enough is largely absent - which other people find either steadying or slightly unnerving.',
            'The energy is real but it is not infinite, and a defined Ego is prone to committing on the assumption that it is.',
        ],
        portrait: {
            shadow: [
                'The overuse is over-promising on genuine confidence, and then spending the will to honour something that should have been declined. The commitment gets kept, at real cost, and the cost is invisible to everyone who only saw it delivered.',
            ],
            growth: [
                'Rest is the discipline. This motor does not idle, and it does not send a warning before it runs down. Building rest into the schedule rather than taking it when needed is the only version that works, because the need announces itself too late.',
            ],
        },
    }),
    centerStateUnit('ego', false, {
        label: 'Ego / Heart — open',
        headline: 'No fixed willpower, and a long habit of trying to prove otherwise.',
        core: [
            'An open Ego has no consistent willpower to draw on, and the characteristic adaptation is proving: overpromising, over-committing, and quietly measuring worth by what was last accomplished. The promises are made in good faith and the will to keep them is not reliably there, which produces a history of commitments that had to be walked back.',
            'The wisdom that develops here is about worth rather than about will. An open Ego that has stopped proving becomes unusually clear-eyed about the difference between what someone is worth and what they have recently delivered - a distinction a defined Ego rarely has to think about.',
        ],
        portrait: {
            shadow: [
                'The trap is the promise made to establish value. It is offered sincerely, it costs more than the will available, and each failure to deliver reinforces the sense that value has to be established.',
            ],
            growth: [
                'Stop making the bet. There is nothing to prove here, which takes most of a life to actually believe and is worth starting on early. In the meantime, the practical version is simply to stop volunteering the promise before anybody has asked for it.',
            ],
        },
    }),
    /* -------------------------------------------------- SOLAR PLEXUS */
    centerStateUnit('solar-plexus', true, {
        label: 'Solar Plexus — defined',
        headline: 'An emotional wave that is yours, and that time reveals.',
        core: [
            'A defined Solar Plexus runs its own emotional wave regardless of circumstances. The mood is not a response to events so much as a cycle passing through, and the same situation genuinely reads differently at different points on it.',
            'This is also an authority when it is present, and the consequence is that clarity requires waiting rather than deciding in the moment. What feels certain at the top of the wave and impossible at the bottom is one decision seen from two positions.',
        ],
        portrait: {
            shadow: [
                'The overuse is emotional weather imposed on a room that then treats it as being about them. It usually is not. Saying so out loud - that the mood is passing through and is not about anyone present - spares everybody a good deal of guessing.',
            ],
            growth: [
                'Learn the shape of your own wave. Knowing where you are on it is most of the skill this centre asks for. The shape is fairly consistent once you have watched it for a few months, which makes it genuinely usable.',
            ],
        },
    }),
    centerStateUnit('solar-plexus', false, {
        label: 'Solar Plexus — open',
        headline: 'Amplifies whatever emotion is in the room and reads it as your own.',
        core: [
            'An open Solar Plexus takes in the emotional state of the environment and magnifies it. What arrives feels entirely like your own feeling, and the practical difficulty is that a perfectly good day can turn on walking into a room where something happened an hour ago.',
            'The characteristic adaptation is conflict avoidance, because confrontation means an emotional charge you will absorb rather than merely witness. Over time this centre develops real emotional intelligence: an open Solar Plexus that has learned to distinguish the amplified feeling from the original one reads other people extremely accurately.',
        ],
        portrait: {
            shadow: [
                'The trap is avoiding the necessary conversation to avoid the charge, repeatedly, until the avoided material is larger than the conversation would have been. The charge from the conversation is finite; the charge from a year of avoiding it is not.',
            ],
            growth: [
                'Ask whether the feeling started in you, and give yourself a room of your own to check in. The answer is often no, and the checking is the whole practice. Over time this becomes fast enough to happen in the moment rather than afterwards, which is where it stops being effortful.',
            ],
        },
    }),
    /* --------------------------------------------------------- SACRAL */
    centerStateUnit('sacral', true, {
        label: 'Sacral — defined',
        headline: 'A renewable engine that answers what is in front of it.',
        core: [
            'A defined Sacral is life force available as work energy, and it renews - but only when it has been spent on something the body actually responded to. This is the engine that makes a Generator or a Manifesting Generator, and the quality of what you say yes to matters more here than how hard you are willing to work.',
            'The response is bodily rather than mental. Something opens toward a real question or it does not, and that movement is more reliable than any amount of reasoning about the same question.',
        ],
        portrait: {
            shadow: [
                'Working past the point where the response stopped is the overuse, and it produces the specific exhaustion that a holiday does not fix. Rest restores a tired Sacral; it does nothing at all for one that has been spent on the wrong thing.',
            ],
            growth: [
                'Get real questions asked of you out loud. The engine answers questions; it does not generate direction. Arranging for someone to actually ask you things is a more practical intervention here than any amount of planning.',
            ],
        },
    }),
    centerStateUnit('sacral', false, {
        label: 'Sacral — open',
        headline: 'No consistent energy of your own, and no natural sense of enough.',
        core: [
            'An open Sacral has no engine. It takes in and amplifies the life force of whoever is nearby, which feels like energy and is borrowed, and the standard difficulty is not knowing when to stop - because the signal that would say "enough" belongs to a centre you do not have defined.',
            'This is the configuration of Projectors, Manifestors and Reflectors, and it accounts for a great deal of the exhaustion those designs report. The wisdom that develops is a genuine understanding of other people\'s energy: an open Sacral learns to read who has capacity and who is running on empty, often before they know it themselves.',
        ],
        portrait: {
            shadow: [
                'The trap is matching the output of people with defined Sacrals and concluding, when you cannot sustain it, that something is wrong with you. Nothing is wrong; you are running an engine you do not have and paying for the difference.',
            ],
            growth: [
                'Stop before you are empty rather than when you are, and take the rest seriously. Borrowed energy leaves without warning. Building the stopping point into the day rather than waiting to feel it is the only reliable version.',
            ],
        },
    }),
    /* --------------------------------------------------------- SPLEEN */
    centerStateUnit('spleen', true, {
        label: 'Spleen — defined',
        headline: 'A continuous, quiet sense of what is safe.',
        core: [
            'The Spleen is the oldest awareness centre, concerned with survival, instinct and the present moment. Defined, it provides a steady low-level read on whether something is safe or right - and it speaks once, softly, in the present tense, without repeating itself.',
            'The reliability is real and the volume is genuinely low. A defined Spleen is right more often than it can explain, and it will not argue with you.',
        ],
        portrait: {
            shadow: [
                'The overuse is a caution that keeps someone from anything unfamiliar, dressed as instinct when it is really just habit. The tell is that genuine splenic caution is quiet and specific, while habit is loud and applies to everything.',
            ],
            growth: [
                'Act on the first signal. It does not come back, and the reasons that arrive afterwards are the mind, not the Spleen. This is the one centre where hesitating to gather evidence reliably makes the decision worse.',
            ],
        },
    }),
    centerStateUnit('spleen', false, {
        label: 'Spleen — open',
        headline: 'Holding on feels safer than letting go.',
        core: [
            'An open Spleen amplifies the environment\'s sense of safety and danger, and lacks its own continuous read. The most reliable consequence is a difficulty in letting go: jobs, relationships and arrangements that stopped working years ago get kept, because release registers as risk rather than as relief.',
            'What eventually develops here is an unusually well-informed sense of what is genuinely healthy - learned by observation rather than issued at birth, and correspondingly more conscious and more transferable than a defined Spleen\'s instinct.',
        ],
        portrait: {
            shadow: [
                'The trap is staying. An open Spleen can hold on to something bad for a very long time and describe it as loyalty or as prudence. Both descriptions are sincere, which is what makes the pattern so difficult to see from inside it.',
            ],
            growth: [
                'Notice that fear of letting go is not the same as evidence for staying. Deciding on the evidence rather than on the feeling is the whole practice here. Writing the evidence down helps disproportionately, because it puts the case somewhere the fear cannot keep editing it.',
            ],
        },
    }),
    /* ----------------------------------------------------------- ROOT */
    centerStateUnit('root', true, {
        label: 'Root — defined',
        headline: 'Your own pressure to move, in a rhythm you can learn.',
        core: [
            'The Root is a pressure centre supplying the drive to get things done. Defined, that pressure is yours and it comes in a rhythm - it builds, it discharges, it returns - and once you know the rhythm it is a reliable engine rather than an emergency.',
            'A defined Root also pressurises the people around it, generally without intending to. Others may experience you as urgent when you are simply operating.',
        ],
        portrait: {
            shadow: [
                'The overuse is applying your own tempo to everyone else and reading their slower pace as reluctance. It is rarely reluctance; it is that they are not carrying the pressure you are and have no reason to hurry.',
            ],
            growth: [
                'Learn the rhythm rather than fighting the pressure. It is not a signal that anything is wrong. Once the rhythm is known it can be planned around, and the pressure stops feeling like an emergency and starts being useful.',
            ],
        },
    }),
    centerStateUnit('root', false, {
        label: 'Root — open',
        headline: 'Amplifies pressure, and hurries to make it stop.',
        core: [
            'An open Root takes in the pressure in the environment and magnifies it. The characteristic experience is a rush to finish things - not because the deadline matters but because completing them is expected to end the pressure, which it does not, since something else arrives immediately.',
            'The wisdom this centre develops is about timing under pressure. An open Root that has learned the pattern becomes noticeably good at staying steady when everyone around it is accelerating, which is the opposite of how it starts out.',
        ],
        portrait: {
            shadow: [
                'The trap is the permanent hurry, and the conviction that finishing one more thing will produce relief. It never has. Noticing that the relief has never once arrived is the beginning of setting your own pace.',
            ],
            growth: [
                'Recognise that the pressure is not yours. Setting your own pace in a fast room is difficult and it is the entire developmental task of this centre. Done well, it eventually makes you the steadiest person in that room, which is not where this centre starts.',
            ],
        },
    }),
];
export const HD_CENTERS = centers;
