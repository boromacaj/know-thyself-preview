/*
 * THE FIFTY SEASONAL READINGS, IN PRACTICE.
 *
 * baziSeasonal.ts already carries the interpretation: what the stem is, what
 * the season does to it, and where the combination fails. Read against the
 * project's own depth model - base nature, seasonal relationship, resulting
 * modification, failure mode - it stops there.
 *
 * This file is the step after: what the condition looks like in an ordinary
 * week. Three fields, none of which restates the core:
 *
 *   practicalGuidance  how the energy behaves, and the habit that answers it
 *   workAndDirection   the work the condition fits, and the work it fights
 *   relationships      what people meet, and what they consistently misread
 *
 * Each is a paragraph rather than a line, because everything else in this
 * knowledge base is prose and a one-line instruction is a bullet with a full
 * stop on it. The two-part shape is not padding: the first sentence is the
 * observation and the second is the part a reader can act on, and a field with
 * only the first half was the version of this file that got written first.
 *
 * WHY A SEPARATE FILE
 * The fifty entries next door are good prose that took work, and threading
 * three more fields through fifty call sites would have made the diff
 * unreadable and put the existing text at risk for no benefit. This merges in
 * by key, so the two can be reviewed and edited independently.
 *
 * WHERE THE READINGS COME FROM
 * The Ziping rule the seasonal file already rests on: the commanding month
 * decides whether a Day Master is supported or spent, and what a chart needs
 * follows from which side of that line it sits on. A supported stem needs
 * somewhere to discharge; a spent one needs replenishment and a reason to
 * stop; a controlling one is doing real work at a real cost; a controlled one
 * gets its results by selection and timing rather than by force. That is
 * doctrine. Which specific week it produces is this project's inference from
 * it, and the provenance on the units says so.
 *
 * WHAT IS DELIBERATELY ABSENT
 * No field claims anything the season cannot support. There is no `growth` and
 * no `shadow` here because the seasonal core already carries both, and saying
 * them twice would be length rather than depth.
 */
/** Keyed `<stem>-<state>`, matching the seasonal unit keys exactly. */
export const SEASONAL_PRACTICE = {
    /* ---------------------------------------------------------- PROSPEROUS --
       The season is the stem's own phase. Supported to the maximum, which in
       Ziping terms means the chart needs an outlet rather than more support. */
    'jia-prosperous': {
        practicalGuidance: [
            'Decisions get made early here and reopened almost never, which is what makes this position '
                + 'so reliable and so expensive when it is wrong. The habit worth building is a second look '
                + 'scheduled in advance rather than a change of mind in the moment, because changing course '
                + 'in the moment is the thing this condition is least able to do.',
        ],
        workAndDirection: [
            'Suits work that needs one person to hold a line for years and would be spoiled by somebody '
                + 'who kept adjusting it. It fights anything requiring frequent renegotiation, where the '
                + 'same steadiness reads as an inability to take new information.',
        ],
        relationships: [
            'People stop arguing with this and start arranging themselves around it, which is easy to '
                + 'mistake for agreement. What has usually happened is that disagreeing stopped seeming '
                + 'worth the effort, and nobody mentions that it did.',
        ],
    },
    'yi-prosperous': {
        practicalGuidance: [
            'With this many routes open at once, choosing is the actual work rather than something that '
                + 'happens before the work starts. Committing to one direction for a fixed period rather '
                + 'than permanently is what makes a decision possible here, because a permanent choice is '
                + 'the one shape this condition will not agree to.',
        ],
        workAndDirection: [
            'Suits work with several viable paths and a real deadline, where the deadline supplies the '
                + 'constraint the season does not. Without one, the same adaptability keeps the options '
                + 'open past the point where any of them are still available.',
        ],
        relationships: [
            'Attaches quickly and detaches slowly, so the number of live connections grows faster than '
                + 'the attention there is to spend on them. Nobody gets dropped, which sounds generous and '
                + 'in practice means everybody gets a thinner share.',
        ],
    },
    'bing-prosperous': {
        practicalGuidance: [
            'Output runs well ahead of recovery here, and the signal to stop arrives after the fact '
                + 'rather than before it. That makes the stop something to put in the calendar rather than '
                + 'something to wait for the body to announce, because by the time the body announces it '
                + 'the week has already been spent.',
        ],
        workAndDirection: [
            'Suits front-of-room work where presence is itself the product and being noticed is the '
                + 'point. It struggles in roles that reward being unnoticeable, where the same quality '
                + 'reads as taking up more space than the job asked for.',
        ],
        relationships: [
            'Warmth arrives before it was invited, which most people enjoy and a small number '
                + 'experience as being run over. The difference is rarely about the warmth and almost '
                + 'always about whether the other person was ready to be met.',
        ],
    },
    'ding-prosperous': {
        practicalGuidance: [
            'The intensity is at full strength and has nowhere distinctive to land, which is a stranger '
                + 'problem to have than too little of it. Deliberately choosing the smaller room over the '
                + 'larger one is the practical move, because a smaller room gives a concentrated attention '
                + 'something to be concentrated on.',
        ],
        workAndDirection: [
            'Suits specialist work where one sustained attention matters more than reach, and where the '
                + 'depth of that attention is what is being paid for. It fits badly anywhere the job is '
                + 'breadth, because breadth is what this position converts worst.',
        ],
        relationships: [
            'Gives very close attention to a few people and can be almost invisible to everybody else, '
                + 'with little in between. Those outside the few rarely realise the attention exists at '
                + 'all, and read the distance as indifference.',
        ],
    },
    'wu-prosperous': {
        practicalGuidance: [
            'Arrangements made here outlive their usefulness by years, because nothing in the condition '
                + 'generates the impulse to revisit them. Putting an expiry date on something at the moment '
                + 'it is set up is the only reliable answer, since deciding later to review it needs '
                + 'exactly the restlessness this position does not have.',
        ],
        workAndDirection: [
            'Suits custodial work on a long horizon - the thing that must not fall over, and that '
                + 'nobody notices for as long as it does not. It fights work that has to be re-founded '
                + 'often, where each restart costs more here than it does elsewhere.',
        ],
        relationships: [
            'Becomes the fixed point other people arrange themselves around, including people who never '
                + 'asked whether it wanted to be one. The role is rarely offered and rarely refused, and '
                + 'the weight of it goes unmentioned by everybody involved.',
        ],
    },
    'ji-prosperous': {
        practicalGuidance: [
            'There is genuinely something in reserve here, which changes the question from whether to '
                + 'give into whether this particular giving is deliberate. The reflex and the decision look '
                + 'identical from outside and feel identical from inside, and telling them apart is most of '
                + 'what this condition asks for.',
        ],
        workAndDirection: [
            'Suits work where what accumulates compounds - a practice, a body of relationships, a place '
                + 'that gets better for being kept. It sits badly in environments measured per quarter, '
                + 'where the accumulation never runs long enough to become visible.',
        ],
        relationships: [
            'Gives from surplus rather than from obligation, and that difference changes the terms '
                + 'enough that people can accept without a debt forming. It is the version of this stem '
                + 'that is easiest to be close to, precisely because nothing is owed back.',
        ],
    },
    'geng-prosperous': {
        practicalGuidance: [
            'The cut is fast and the review that would have caught the mistake is slow, so the two are '
                + 'permanently out of order. A pause of fixed length before acting is the discipline that '
                + 'works here, rather than a general instruction to be careful, which this condition will '
                + 'agree to and then not follow.',
        ],
        workAndDirection: [
            'Suits work where something has to be ended, closed or removed and most people will not do '
                + 'it. It fits badly where the job is keeping something alive through a difficult stretch, '
                + 'because the same decisiveness ends things early.',
        ],
        relationships: [
            'Accuracy lands as judgement here whether or not it was meant that way, and the correction '
                + 'usually arrives after the other person has already filed it. The clarity is real; what '
                + 'is missing is any signal about how it was intended.',
        ],
    },
    'xin-prosperous': {
        practicalGuidance: [
            'The standard runs at full strength with nothing moderating it, and it is applied to '
                + 'everybody in range whether or not they were told about it. Saying the bar out loud is '
                + 'what stops other people experiencing it as a verdict they never had a chance to meet, '
                + 'and it costs this position almost nothing to say.',
        ],
        workAndDirection: [
            'Suits quality-critical work where the difference between good and nearly good actually '
                + 'matters to somebody. It struggles where speed beats finish, because the standard does '
                + 'not adjust downward on request and will simply make the deadline late.',
        ],
        relationships: [
            'The reserve reads as disapproval far more often than it is, and it rarely occurs to this '
                + 'chart to say otherwise. People conclude they have been assessed and found wanting, when '
                + 'usually they were not being assessed at all.',
        ],
    },
    'ren-prosperous': {
        practicalGuidance: [
            'Intake outruns completion by a wide margin, and the gap widens quietly because starting is '
                + 'satisfying and finishing is not. The useful constraint is therefore finishing rather '
                + 'than taking in less, since taking in less is a rule this condition breaks within a week '
                + 'without noticing that it has.',
        ],
        workAndDirection: [
            'Suits large-scope work with somebody else holding the edges of it, where the range is an '
                + 'asset and the boundary is provided. It struggles where the scope has to be self-imposed, '
                + 'which is the one thing this position does not supply.',
        ],
        relationships: [
            'Many live connections and few that go deep, which is a consequence of volume rather than '
                + 'of preference. Most people in the circle assume they are further out than they are, and '
                + 'a few assume they are considerably closer.',
        ],
    },
    'gui-prosperous': {
        practicalGuidance: [
            'Perception is acute here and arrives with no point of view attached, which is why so much '
                + 'of it evaporates within the hour. Writing down both what was noticed and what it implies '
                + 'is what turns it into something usable, and the second half is the half that gets '
                + 'skipped.',
        ],
        workAndDirection: [
            'Suits work that depends on registering what has not been said, where the observation '
                + 'itself is the deliverable. It is poorly suited to work needing a position defended, '
                + 'because holding a position is the opposite motion to this one.',
        ],
        relationships: [
            'Reads people considerably faster than it relates to them, which can feel to the other '
                + 'person like being known and not met. The accuracy is not in doubt; what is missing is '
                + 'any exposure in return.',
        ],
    },
    /* --------------------------------------------------------------- AIDED --
       The season generates the stem. Fed from outside: the most workable side of
       the supported half, and the one most likely to waste the support. */
    'jia-aided': {
        practicalGuidance: [
            'The development happening here is real and almost entirely invisible, which makes it easy '
                + 'to mistake for nothing happening at all. The risk is waiting for external conditions to '
                + 'confirm what has already taken place underground, and that wait can run years longer '
                + 'than the growth did.',
        ],
        workAndDirection: [
            'Suits a long preparation followed by a public commitment, and the preparation is almost '
                + 'never where the difficulty sits. It is the commitment that stalls, because conditions '
                + 'rarely feel finished enough to justify making it.',
        ],
        relationships: [
            'Presses its case more slowly than this stem usually does, which people read as being '
                + 'easy-going. It is closer to not yet, and the difference tends to surface only when the '
                + 'position finally arrives fully formed.',
        ],
    },
    'yi-aided': {
        practicalGuidance: [
            'The patience here is genuine rather than forced, and that is exactly what makes it '
                + 'dangerous, because nothing about it feels like avoidance. A deadline set by somebody '
                + 'else is worth more in this condition than any amount of internal readiness, since '
                + 'readiness is the one signal that will never arrive on its own.',
        ],
        workAndDirection: [
            'Suits work with a long accumulation phase, provided something outside eventually forces '
                + 'the transition out of it. Left entirely self-directed, the accumulation phase quietly '
                + 'becomes the whole of the work.',
        ],
        relationships: [
            'Undemanding company, and undemanding enough that its own needs can go years without being '
                + 'stated. Other people rarely ask, because nothing in the manner suggests there is '
                + 'anything to ask about.',
        ],
    },
    'bing-aided': {
        practicalGuidance: [
            'There is headroom here that the summer version of this stem does not have, and it is real '
                + 'rather than borrowed against later. This is the condition in which taking on more is '
                + 'usually the right call rather than the reckless one, which makes it worth using while it '
                + 'lasts rather than saving.',
        ],
        workAndDirection: [
            'Suits building something visible from a standing start, because the ambition and the fuel '
                + 'are both genuinely present at the same time. That combination is rarer than it sounds '
                + 'and does not hold across every season.',
        ],
        relationships: [
            'Warm without the overwhelm, which makes this the version of the stem people find easiest '
                + 'to be near. The warmth arrives at a rate the other person can answer, rather than at a '
                + 'rate they have to absorb.',
        ],
    },
    'ding-aided': {
        practicalGuidance: [
            'This condition will sustain a small effort more or less indefinitely, which is what makes '
                + 'long unglamorous work possible at all here. The same quality makes stopping '
                + 'unreasonably hard, so the end of a project needs deciding on some ground other than '
                + 'whether there is still energy left for it.',
        ],
        workAndDirection: [
            'Suits the long project nobody is watching - the one that needs somebody to keep the flame '
                + 'going for years without external reinforcement. It is wasted on short work, where the '
                + 'endurance never gets a chance to matter.',
        ],
        relationships: [
            'Attentive and durable, and the people it commits to tend to stay committed to for a long '
                + 'time. That reliability is rarely tested, which means it is also rarely noticed by the '
                + 'people receiving it.',
        ],
    },
    'wu-aided': {
        practicalGuidance: [
            'This is the accumulating condition, so the practical question is not whether there is '
                + 'capacity to build but what is being built with it. Capacity without a chosen object '
                + 'still accumulates, and what it accumulates is whatever happened to be closest.',
        ],
        workAndDirection: [
            'Suits work that ends in something owned and standing, which is the most constructive '
                + 'position this stem occupies. It converts effort into permanence better here than in any '
                + 'other season, and that is worth spending on something chosen.',
        ],
        relationships: [
            'Steady and quietly ambitious, which reads as dependable and occasionally as unreadable. '
                + 'People know what it will do and are much less clear about what it wants, because the '
                + 'wanting is not expressed as pressure.',
        ],
    },
    'ji-aided': {
        practicalGuidance: [
            'Something is putting energy back in here, which makes this the one condition where the '
                + 'nurturing does not have to be rationed. That is worth using deliberately, because habits '
                + 'formed in a season like this are the ones carried into seasons that cannot afford them.',
        ],
        workAndDirection: [
            'Suits work that grows people or places, where the generosity is replenished rather than '
                + 'spent down. The same work in a draining season is the same work at a considerably higher '
                + 'price.',
        ],
        relationships: [
            'Warm without depletion, which is genuinely rare for this stem and worth recognising while '
                + 'the condition holds. What is being given here is not being taken from somewhere else, '
                + 'and that changes how it lands on the other side.',
        ],
    },
    'geng-aided': {
        practicalGuidance: [
            'Hard calls made in this condition tend to hold up afterwards, because the judgement and '
                + 'the ground underneath it are intact at the same time. That makes this the season to make '
                + 'them in, rather than deferring difficult decisions into a stretch where the same call '
                + 'will cost considerably more.',
        ],
        workAndDirection: [
            'Suits work where decisions have consequences and somebody has to own them publicly. The '
                + 'appetite for that ownership is present here, which is not true of this stem in every '
                + 'season.',
        ],
        relationships: [
            'Decisive and grounded, which people trust and tend to defer to. The edge is present and '
                + 'currently well seated, so it cuts when it is aimed rather than whenever it is touched.',
        ],
    },
    'xin-aided': {
        practicalGuidance: [
            'The precision here is not anxious, and that distinction matters more than it sounds: it is '
                + 'the difference between doing exacting work and defending against criticism of it. The '
                + 'same output can come from either, and only one of the two is sustainable over years.',
        ],
        workAndDirection: [
            'Suits demanding technical or aesthetic work, because this is the condition in which the '
                + 'standard functions as a tool rather than as a wall. The wall version appears in other '
                + 'seasons and reliably produces less.',
        ],
        relationships: [
            'Shows well and is comfortable being looked at, which this stem is not always able to be. '
                + 'The reserve that reads as coolness elsewhere is largely absent here, so people meet '
                + 'something closer to what is actually there.',
        ],
    },
    'ren-aided': {
        practicalGuidance: [
            'There is structure arriving into the volume here, which is the combination this stem '
                + 'usually has only one half of. It makes this the condition in which a genuinely large '
                + 'problem can be held and navigated at the same time, rather than held and circled.',
        ],
        workAndDirection: [
            'Suits work of real scale with real complexity, where the clarity needed to order it is '
                + 'native rather than borrowed from somebody else. Scale without that clarity is where this '
                + 'stem usually gets into difficulty.',
        ],
        relationships: [
            'Wide reach with enough definition that people know where they stand inside it. That is '
                + 'unusual for a stem whose ordinary problem is that everybody is included and nobody is '
                + 'certain how much.',
        ],
    },
    'gui-aided': {
        practicalGuidance: [
            'Perception with structure behind it becomes something that can be acted on rather than '
                + 'something that was merely noticed and lost. This is therefore the condition in which '
                + 'writing observations down formally pays, because there is now a shape to put them into.',
        ],
        workAndDirection: [
            'Suits analytical work, or any role where accuracy about people and circumstances is the '
                + 'deliverable rather than a private advantage. The accuracy exists in other seasons too; '
                + 'the ability to present it does not.',
        ],
        relationships: [
            'Unusually accurate about other people and now able to say so in a form they can use. In '
                + 'most seasons this stem knows and does not tell, which is a very different experience for '
                + 'everybody involved.',
        ],
    },
    /* ------------------------------------------------------------- RESTING --
       The stem generates the season: continuously drawn on. Productive, and the
       cost is invisible to the person paying it. This half needs replenishment
       and a rule for stopping, because the giving does not register as effort. */
    'jia-resting': {
        practicalGuidance: [
            'There is no internal signal here that the giving has gone too far, which means the usual '
                + 'advice to check in with yourself returns nothing useful. The limit has to be a rule '
                + 'agreed in advance and honoured mechanically, because a limit that depends on noticing '
                + 'depends on the one faculty this condition removes.',
        ],
        workAndDirection: [
            'Produces a great deal and manages to bank almost none of it, so the shape of the work '
                + 'matters more than the amount of it. Defined deliverables protect what open-ended '
                + 'responsibility quietly consumes.',
        ],
        relationships: [
            'Others benefit steadily and see the cost rarely, largely because it is never mentioned to '
                + 'them. By the time it is mentioned it has usually been running for years, which makes it '
                + 'sound like an accusation rather than information.',
        ],
    },
    'yi-resting': {
        practicalGuidance: [
            'The output feels effortless while it is happening, which is why depletion in this '
                + 'condition arrives without warning and usually all at once. Recovery therefore has to be '
                + 'scheduled rather than taken when it seems needed, because it will not seem needed until '
                + 'it is already overdue.',
        ],
        workAndDirection: [
            'Suits creative and social work, where the ease of production is a genuine advantage. That '
                + 'same ease is what hides the cost, so the recovery has to be built into the schedule '
                + 'rather than left to judgement.',
        ],
        relationships: [
            'Generous company that people enjoy without registering what sustaining it takes. Nothing '
                + 'in the manner suggests effort, so nobody thinks to ask, and the asking would probably be '
                + 'deflected anyway.',
        ],
    },
    'bing-resting': {
        practicalGuidance: [
            'The output here lands on something solid rather than radiating outward, so the drain runs '
                + 'slower than the summer version and is correspondingly easier to sustain for years. A '
                + 'slow leak is harder to notice than a fast one, which is the whole difficulty of this '
                + 'position.',
        ],
        workAndDirection: [
            'Suits work that produces a settled result, where the warmth is doing something rather than '
                + 'simply being present. The visible outcome is what makes this the more sustainable half '
                + 'of an otherwise costly condition.',
        ],
        relationships: [
            'More grounded than the summer version, and still giving out more than is coming back. The '
                + 'imbalance is mild enough not to register as a problem, which is precisely why it '
                + 'persists as long as it does.',
        ],
    },
    'ding-resting': {
        practicalGuidance: [
            'What this produces now belongs to whoever received it, and there is no mechanism by which '
                + 'any of it returns. The fuel runs down quietly as a result, and the person burning it is '
                + 'reliably the last to notice, because nothing about the burning feels like exertion.',
        ],
        workAndDirection: [
            'Suits work handed on to others - teaching, care, finishing something somebody else will '
                + 'own and be credited for. The contribution is real and structurally difficult to point at '
                + 'once it has been handed over.',
        ],
        relationships: [
            'Gives sustained warmth into specific people and can go a very long time without any of it '
                + 'coming back. The tolerance for that is high, so the imbalance can run well past the '
                + 'point where anybody would have predicted it would stop.',
        ],
    },
    'wu-resting': {
        practicalGuidance: [
            'Others take what they need and this chart replaces it out of itself, without either side '
                + 'treating that as an event worth marking. The useful discipline is noticing the '
                + 'withdrawal at the time it happens rather than at the end of the year, when it appears as '
                + 'a total with no itemisation attached.',
        ],
        workAndDirection: [
            'Suits work that others build on, which is genuinely productive and genuinely erosive in '
                + 'the same motion. The two cannot be separated here, so the question is the rate rather '
                + 'than whether it happens at all.',
        ],
        relationships: [
            'Reliable to the point where the reliance stops being noticed by anybody, including the '
                + 'person providing it. Being counted on becomes the background condition rather than '
                + 'something either side holds an opinion about.',
        ],
    },
    'ji-resting': {
        practicalGuidance: [
            'The output here is legible to everybody except the person producing it, which is an '
                + 'unusual failure and needs an unusual answer. An external accounting - what actually went '
                + 'out this month, written down - is worth more than any amount of reflection, because the '
                + 'reflection is being done by the one party who cannot see it.',
        ],
        workAndDirection: [
            'Suits work where steady contribution compounds over time and somebody is keeping track of '
                + 'it. It is badly suited to environments that measure only visible initiative, which is '
                + 'most of what this condition does not produce.',
        ],
        relationships: [
            'Gives steadily and without complaint, and the absence of complaint is read by everybody '
                + 'else as the absence of cost. That reading is never corrected, because correcting it '
                + 'would take the same self-assertion the condition suppresses.',
        ],
    },
    'geng-resting': {
        practicalGuidance: [
            'The sharpness here turns into insight rather than into action, so decisions refine '
                + 'themselves indefinitely instead of arriving anywhere. Naming a point at which the '
                + 'decision gets made regardless of how finished the thinking is, is what protects against '
                + 'a judgement that never lands.',
        ],
        workAndDirection: [
            'Suits advisory work more than executive work in this condition, because the judgement is '
                + 'entirely intact and the appetite for enforcing it is not. Placed in an executive seat '
                + 'here, the same person mostly produces very good analysis of a decision nobody took.',
        ],
        relationships: [
            'Less confrontational than this stem usually is, which other people find noticeably easier '
                + 'to be around. What they are experiencing as mellowness is closer to a cost being paid '
                + 'somewhere they cannot see.',
        ],
    },
    'xin-resting': {
        practicalGuidance: [
            'The pattern here is producing something genuinely fine and feeling emptier once it is '
                + 'done, which makes the aftermath more important than the work itself. What happens in the '
                + 'days after finishing decides whether the next piece starts from a reserve or from '
                + 'nothing at all.',
        ],
        workAndDirection: [
            'Suits work requiring articulate refinement, and this is the most expressive condition the '
                + 'stem has. It is also the most expensive, because the expression is drawn directly from '
                + 'the stem rather than from anything replenishing it.',
        ],
        relationships: [
            'Says things well and precisely, and tends to end up as the one explaining rather than the '
                + 'one being understood. Fluency invites that role, and it is a role that gives out rather '
                + 'than takes in.',
        ],
    },
    'ren-resting': {
        practicalGuidance: [
            'The level drops slowly and evenly here, so there is never a moment dramatic enough to '
                + 'react to. What there is instead is a gradual reduction in what can be drawn on, noticed '
                + 'only when something ordinary turns out to be beyond reach.',
        ],
        workAndDirection: [
            'Suits work that grows other people or other ventures, because that is what this condition '
                + 'does whether or not it was the plan. The ideas and the resources tend to become somebody '
                + 'else\'s result, and usually that is entirely fine.',
        ],
        relationships: [
            'Genuinely generative for other people, and the generativity is rarely traced back to where '
                + 'it came from. Not out of ingratitude: the contribution simply arrives in a form that '
                + 'does not carry a name on it.',
        ],
    },
    'gui-resting': {
        practicalGuidance: [
            'The provision here is quiet and uncommented, which makes the depletion invisible from '
                + 'outside and easy to dismiss from inside. Both halves of that matter, because nobody else '
                + 'will raise it and the person best placed to raise it does not consider it worth raising.',
        ],
        workAndDirection: [
            'Suits work built on registering what somebody needs before they ask for it, where '
                + 'anticipation is the actual skill. The contribution is real and structurally difficult to '
                + 'attribute, which affects how it ends up being valued.',
        ],
        relationships: [
            'Provides without comment and is not seen doing it, which works well for a long time and '
                + 'then stops working. Over years the not being seen becomes its own kind of loneliness, '
                + 'separate from the effort itself.',
        ],
    },
    /* ------------------------------------------------------------- TRAPPED --
       The stem controls the season: real work against material that resists.
       Effective and costly at once, and the two are not separable. */
    'jia-trapped': {
        practicalGuidance: [
            'The persistence here is spent on friction rather than on progress, and the two feel '
                + 'identical from the inside while they are happening. Asking whether this particular '
                + 'ground is worth breaking is the question that pays, and it has to be asked more often '
                + 'than it is comfortable to ask it.',
        ],
        workAndDirection: [
            'Suits work that genuinely requires somebody to keep pushing against something that pushes '
                + 'back. It is wasteful wherever the resistance was incidental rather than necessary, which '
                + 'is a distinction this condition does not draw on its own.',
        ],
        relationships: [
            'Reads as determined, and the effort behind the determination is largely invisible to '
                + 'people who only see the persistence. They see somebody who does not give up; they do not '
                + 'see what not giving up is costing.',
        ],
    },
    'yi-trapped': {
        practicalGuidance: [
            'Progress arrives in increments small enough to be invisible, so the honest experience is '
                + 'of nothing moving even while it does. Keeping a deliberate record of what has shifted is '
                + 'the only reliable counterweight, because memory in this condition reports the friction '
                + 'and not the distance covered.',
        ],
        workAndDirection: [
            'Suits long work in resistant conditions where most people would have stopped, and the '
                + 'tenacity is real enough to surprise people who expected otherwise. It fits badly '
                + 'anywhere the reward depends on visible pace.',
        ],
        relationships: [
            'Works around obstruction rather than through it, including obstruction that happens to be '
                + 'a person. That is effective and it is also indirect, and the other party often does not '
                + 'realise a negotiation took place at all.',
        ],
    },
    'bing-trapped': {
        practicalGuidance: [
            'The warmth here is doing work rather than simply being present, and work of that kind '
                + 'produces a fatigue that does not look like effort from outside. It does not feel like '
                + 'effort from inside either until it has accumulated, which is what makes the rest days so '
                + 'easy to skip.',
        ],
        workAndDirection: [
            'Suits purposeful work where the energy is pointed at something specific and demanding '
                + 'rather than distributed across a room. The direction is what makes this condition '
                + 'productive instead of merely tiring.',
        ],
        relationships: [
            'Directed rather than diffuse, so people get the focused version of this stem instead of '
                + 'the general warmth. Some find that considerably more intense than they expected, having '
                + 'met the other version first.',
        ],
    },
    'ding-trapped': {
        practicalGuidance: [
            'The effort here is constant and low-grade rather than dramatic, which means it never '
                + 'announces itself as a reason to stop. Recovery has to be regular rather than occasional '
                + 'for exactly that reason: an occasional rest is triggered by a spike, and this condition '
                + 'does not produce spikes.',
        ],
        workAndDirection: [
            'Suits exacting detailed work that most people cannot sustain for long, which is the '
                + 'productive face of this difficulty. The same quality is wasted on work that does not '
                + 'reward that level of attention.',
        ],
        relationships: [
            'Patient and exacting with people as well as with problems, which lands well with anybody '
                + 'who wants the care. It lands badly with anybody who wanted ease, and the difference is '
                + 'usually not discussed until it has become a pattern.',
        ],
    },
    'wu-trapped': {
        practicalGuidance: [
            'The tension of holding something back never fully discharges here, so it accumulates '
                + 'rather than resolving on its own. It needs somewhere to go on a schedule, because '
                + 'waiting for it to subside is waiting for the one thing this condition does not do.',
        ],
        workAndDirection: [
            'Suits roles that exist to stop things going wrong, where success is measured in absences '
                + 'rather than in results. The responsibility is real and mostly unwitnessed, which is a '
                + 'difficult combination to sustain without saying so out loud.',
        ],
        relationships: [
            'Takes responsibility for other people\'s stability, frequently without either party having '
                + 'agreed to that arrangement. It becomes visible only when it is set down, at which point '
                + 'everybody discovers what was being carried.',
        ],
    },
    'ji-trapped': {
        practicalGuidance: [
            'The worry here does not resolve by being thought about, which is inconvenient because '
                + 'thinking about it is what this condition mostly does. An external limit on how much is '
                + 'being held works where reassurance does not, since reassurance addresses the feeling and '
                + 'the load is the actual problem.',
        ],
        workAndDirection: [
            'Suits work with defined responsibility and a visible edge to it. Open-ended responsibility '
                + 'for keeping something stable is exactly where this condition wears down, because there '
                + 'is no point at which that responsibility is ever discharged.',
        ],
        relationships: [
            'Carries the stability of a household or a group, and finds the weight genuinely heavy '
                + 'rather than merely tiring. That distinction rarely reaches the people being carried, who '
                + 'experience only that things are steady.',
        ],
    },
    'geng-trapped': {
        practicalGuidance: [
            'Things get done and things get damaged in the same motion here, and the two are not '
                + 'separable however carefully the motion is made. The discipline is therefore deciding in '
                + 'advance what is acceptable to lose, rather than proceeding on the hope that nothing will '
                + 'be.',
        ],
        workAndDirection: [
            'Suits work that requires cutting through living material - turnarounds, closures, '
                + 'decisions that will have casualties attached. It is the wrong instrument entirely for '
                + 'anything that needs to be coaxed rather than resolved.',
        ],
        relationships: [
            'With people this behaves exactly as it does with problems: effective and costly at the '
                + 'same time. The effectiveness is usually acknowledged and the cost usually is not, by '
                + 'either side of it.',
        ],
    },
    'xin-trapped': {
        practicalGuidance: [
            'The sharpness that appears in speech here arrives once the effort has gone on too long, '
                + 'which makes it a fairly reliable instrument. Treating the first sharp remark as the '
                + 'signal that a break is overdue is more accurate than any internal estimate of how tired '
                + 'this has become.',
        ],
        workAndDirection: [
            'Suits careful exacting intervention in situations that actively resist being improved. The '
                + 'precision holds under that resistance, which is not true of most approaches and is the '
                + 'reason this condition is worth anything at all.',
        ],
        relationships: [
            'Precise about people under pressure, and the precision acquires an edge that is heard as '
                + 'criticism. The observation is usually correct, which is what makes it land harder rather '
                + 'than softer.',
        ],
    },
    'ren-trapped': {
        practicalGuidance: [
            'This configuration is not a quiet one: the friction generates something that has to be '
                + 'discharged rather than contained. Containing it is the instinctive response and the '
                + 'wrong one, because what gets generated here does not dissipate on its own.',
        ],
        workAndDirection: [
            'Suits cooling an overheated situation, where the capacity to absorb heat is the whole '
                + 'point of being there. It is poorly suited to work requiring sustained calm, because '
                + 'sustained calm is what this condition is already spending.',
        ],
        relationships: [
            'More combative than this stem usually is, which surprises anybody who met it in another '
                + 'season. The change is situational rather than characterological, and it reverses when '
                + 'the pressure does.',
        ],
    },
    'gui-trapped': {
        practicalGuidance: [
            'Prolonged heat is genuinely draining here, and the drain is not something willingness can '
                + 'offset. This condition needs the exposure limited rather than the tolerance increased, '
                + 'which is the opposite of what most people try first.',
        ],
        workAndDirection: [
            'Suits cooling and de-escalating, where the perceptiveness stays entirely sharp under '
                + 'pressure. What does not hold is the capacity to remain in it, so the work needs to come '
                + 'in stretches rather than continuously.',
        ],
        relationships: [
            'Takes the temperature out of situations, reliably and usually without being asked to. The '
                + 'price of doing it does not show, so the same person gets asked again, and the asking is '
                + 'not unreasonable from where anybody else is standing.',
        ],
    },
    /* ---------------------------------------------------------------- DEAD --
       The season controls the stem: constrained. Results come from selection and
       timing rather than force, and the classical name means nothing worse. */
    'jia-dead': {
        practicalGuidance: [
            'Strength here is available in fewer directions rather than in smaller amounts, which is a '
                + 'different problem from being weakened. Choosing which few directions get it is the whole '
                + 'practical question, and leaving that choice unmade spreads it thin enough to look like '
                + 'weakness from outside.',
        ],
        workAndDirection: [
            'Suits work with a narrow and well-defended scope, where the constraint is stated rather '
                + 'than discovered late. What this condition removes is indiscriminate expansion, which in '
                + 'most circumstances is not much of a loss.',
        ],
        relationships: [
            'More selective than this stem usually is, and the selectiveness tends to become permanent '
                + 'once it has been learned. It outlasts the conditions that taught it, which is worth '
                + 'knowing when the season eventually changes.',
        ],
    },
    'yi-dead': {
        practicalGuidance: [
            'The growth here is lateral rather than upward, so progress is real and will not look like '
                + 'progress to anybody measuring height. That includes the person doing it, which is why '
                + 'the measure has to be chosen deliberately rather than inherited from whoever is nearby.',
        ],
        workAndDirection: [
            'Suits finding the route around rather than the route through, and produces genuine '
                + 'resourcefulness under constraint. Given an unconstrained problem, the same instinct '
                + 'looks like an unwillingness to take the direct path.',
        ],
        relationships: [
            'Slightly wary, having learned that visible expansion attracts attention it did not want. '
                + 'The wariness is proportionate to the experience behind it and is rarely explained to '
                + 'anybody who was not there.',
        ],
    },
    'bing-dead': {
        practicalGuidance: [
            'What looks effortless in other people costs something here, and the difference is not '
                + 'visible from either side of it. The useful comparison is therefore with last month '
                + 'rather than with anybody else, since a comparison across people is measuring two '
                + 'different prices.',
        ],
        workAndDirection: [
            'Needs a reason worth burning for, and without one this condition simply goes quiet rather '
                + 'than struggling visibly. The quiet is easy to read as disengagement and is much closer '
                + 'to conservation.',
        ],
        relationships: [
            'The generosity is entirely intact and it is being paid for, which almost nobody on the '
                + 'receiving end can see. Being generous at a cost and being generous easily look identical '
                + 'from outside.',
        ],
    },
    'ding-dead': {
        practicalGuidance: [
            'The flame is guarded here and offered selectively, which is a sound strategy for the '
                + 'conditions that produced it. It also becomes a habit that outlasts those conditions, so '
                + 'it is worth reviewing occasionally rather than treating as settled character.',
        ],
        workAndDirection: [
            'Suits work where a small reliable light matters more than a large one, which is the '
                + 'compensation this condition carries. Constancy is what survives here when reach does '
                + 'not, and some work needs exactly that.',
        ],
        relationships: [
            'Heightened perceptiveness paired with a reduced willingness to be seen, so it knows other '
                + 'people considerably better than they know it. That asymmetry is comfortable for a long '
                + 'time and then abruptly is not.',
        ],
    },
    'wu-dead': {
        practicalGuidance: [
            'This is the one condition that forces this stem to move, which is unwelcome and is also '
                + 'the point of it. The practical work is going with the change rather than waiting for it '
                + 'to pass, because waiting is the strategy that works everywhere else and not here.',
        ],
        workAndDirection: [
            'Produces a working life with more change in it than the temperament would choose, and the '
                + 'adaptation is learned rather than natural. Learned adaptation is real; it simply costs '
                + 'more per instance than it does for stems that arrived with it.',
        ],
        relationships: [
            'The fixed point keeps being moved, and other people may not realise how difficult that is '
                + 'for this particular chart. From outside it looks like flexibility rather than like '
                + 'effort.',
        ],
    },
    'ji-dead': {
        practicalGuidance: [
            'Arrangements here keep being disturbed by other people\'s growth, which is nobody\'s fault '
                + 'and happens regardless. Flexible arrangements are consequently worth more than good '
                + 'ones, because a good arrangement that has to be rebuilt is worse than an adequate one '
                + 'that bends.',
        ],
        workAndDirection: [
            'Suits environments that change shape often, where the constant reordering is expected '
                + 'rather than treated as a failure. It is badly suited to work whose value depends on the '
                + 'setup staying where it was put.',
        ],
        relationships: [
            'The family, the job or the situation keeps reorganising around this chart rather than with '
                + 'it. The reorganisation is rarely hostile and is rarely consultative either, which is the '
                + 'part that wears.',
        ],
    },
    'geng-dead': {
        practicalGuidance: [
            'The experience here is of being reshaped rather than of being blocked, and those two feel '
                + 'similar while they are happening. What presents as obstruction is usually the process '
                + 'working, which is worth knowing before deciding to force through it.',
        ],
        workAndDirection: [
            'Suits work that tests and refines, and produces the most discriminating version of this '
                + 'stem over time. The refinement takes years and is not visible while it is underway, '
                + 'which is why it gets abandoned.',
        ],
        relationships: [
            'Still decisive and considerably less blunt, which is simultaneously what this condition '
                + 'costs and what it gives back. People who knew the earlier version notice the difference '
                + 'well before the person does.',
        ],
    },
    'xin-dead': {
        practicalGuidance: [
            'The sensitivity to pressure here is real and the protections built around it are well '
                + 'developed, which is a reasonable response to a genuine difficulty. The harder skill is '
                + 'noticing when a protection is still running in a situation that no longer calls for it.',
        ],
        workAndDirection: [
            'The discrimination survives this condition entirely intact; the willingness to expose it '
                + 'to a room does not. That makes written or one-to-one work considerably more productive '
                + 'here than anything performed in front of people.',
        ],
        relationships: [
            'Guarded in a way that is easy to read as coolness and is much closer to self-protection. '
                + 'The reading is rarely corrected, because correcting it would mean lowering the guard '
                + 'that produced it.',
        ],
    },
    'ren-dead': {
        practicalGuidance: [
            'Expansiveness here keeps meeting practical limits, and it meets them after the plan has '
                + 'been made rather than before. Scoping to what will actually be supported saves the '
                + 'repeated experience of scaling back, which costs more in morale than it ever does in '
                + 'time.',
        ],
        workAndDirection: [
            'Suits work where the constraint is stated up front and can be designed around from the '
                + 'start. The scaled-down plan is the recurring form here, so it is better arrived at '
                + 'deliberately than by collision.',
        ],
        relationships: [
            'Reach that keeps meeting edges, which other people read as inconsistency rather than as '
                + 'constraint. What they see is enthusiasm followed by withdrawal, without the part in '
                + 'between that would explain it.',
        ],
    },
    'gui-dead': {
        practicalGuidance: [
            'Insight here gets absorbed without producing any visible effect, which is discouraging in '
                + 'a specific and repetitive way. Where the observation is said therefore matters more than '
                + 'how accurately it was seen, and the accuracy is the part that already works.',
        ],
        workAndDirection: [
            'Suits work where the observation reaches somebody in a position to act on it, and is '
                + 'largely wasted where it does not. The difference is structural rather than personal, and '
                + 'it is worth choosing for deliberately.',
        ],
        relationships: [
            'Notices accurately, says it, and watches it disappear without trace. Over time that either '
                + 'sharpens the timing considerably or stops the saying altogether, and which one happens '
                + 'depends on whether it ever landed.',
        ],
    },
};
