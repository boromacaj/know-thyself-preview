import { sig } from '../semanticDimensions.js?v=2ea79e9';
import { profileUnit } from './hdAuthoring.js?v=2ea79e9';
/**
 * THE TWELVE PROFILES.
 *
 * A Profile is two lines: the conscious Personality line, which is how you
 * experience yourself, and the unconscious Design line, which operates whether
 * or not you notice it. The engine produces exactly twelve valid combinations
 * and all twelve are written here.
 *
 * WHY THESE ARE NOT ASSEMBLED FROM LINE KEYNOTES
 *
 * The obvious way to build this file is a table of six line meanings and a
 * function that pastes two together. It would take an afternoon and it would be
 * wrong, because a Profile is not the sum of its lines - it is what happens when
 * one runs consciously on top of the other. A 5/1 and a 1/5 would come out
 * identical from a concatenation, and they are not remotely the same thing: one
 * is a person expected to solve things who has quietly done the reading, the
 * other is a researcher who keeps being mistaken for a fixer.
 *
 * So each entry is authored as a combination, and the interaction between the
 * two lines is the part that carries the reading.
 *
 * THE SIX LINES, FOR ORIENTATION ONLY
 *   1 Investigator  needs a foundation it has checked itself
 *   2 Hermit        natural talent, best left alone and then called out
 *   3 Martyr        learns by trying things that do not work
 *   4 Opportunist   moves through a known network
 *   5 Heretic       projected upon; expected to supply a practical solution
 *   6 Role Model    three life phases; becomes an example late
 */
const profiles = [
    profileUnit({
        key: '1/3',
        label: 'Profile 1/3 — Investigator / Martyr',
        headline: 'Reads everything, then finds out the hard way anyway.',
        core: [
            'The conscious 1 needs solid ground. You do not feel able to act until you understand the thing underneath - the mechanism, the history, the reason it works - and an explanation that stops one level short leaves you genuinely unsettled rather than merely curious. This is not caution; it is that a foundation you have not checked does not feel like a foundation.',
            'Underneath, the unconscious 3 is doing something the 1 would never authorise: bumping into things. The 3 learns by trial, and the trials fail more often than they succeed, which means your life has a great deal of correction in it whatever the reading suggested. The two lines are in real tension and the tension is the design.',
            'What it produces over time is authority of an unusually well-earned kind. You know the theory because the 1 read it and you know where the theory breaks because the 3 found out, and very few people have both. The intervening decades involve more false starts than the 1 finds dignified.',
        ],
        portrait: {
            relationships: [
                'The 3 shows up here as a pattern of relationships entered and ended, and it is worth reframing what that is. The system reads a 3 line as discovering by elimination rather than as failing repeatedly, and a 1/3 tends to be hard on itself about a process that is functioning correctly.',
            ],
            workAndDirection: [
                'This design belongs in work where depth is rewarded and where being wrong is survivable. Research, diagnosis, anything technical. It does badly where a first attempt has to be correct, because the 3 will make a first attempt and it will not be.',
            ],
            shadow: [
                'The 1 can use preparation as a way of never being exposed, and the 3 can turn a run of setbacks into a settled pessimism. Together they produce someone who knows an enormous amount and has stopped trying things.',
            ],
            growth: [
                'Treat the failed attempt as data rather than as a verdict, which is the 3\'s own logic and the thing the 1 resists. And accept that the foundation will never be complete enough for the 1; at some point the reading has to stop and the trying has to start.',
            ],
        },
        signals: [sig('analytical', 0.8), sig('persistent', 0.6), sig('introspective', 0.5), sig('novelty-seeking', 0.4)],
    }),
    profileUnit({
        key: '1/4',
        label: 'Profile 1/4 — Investigator / Opportunist',
        headline: 'Goes deep, and then it travels through people who already trust you.',
        core: [
            'The conscious 1 has to know. You go to the bottom of whatever you are working on, you distrust the summary, and you are noticeably uncomfortable operating on someone else\'s authority. That depth is real and it is the thing you have.',
            'The unconscious 4 is how it gets out. This line moves through a known network rather than through strangers: your opportunities arrive from people you already have some relationship with, and cold approaches work considerably less well for you than they appear to for other people. That is not a social skills problem; it is the mechanism.',
            'The combination is a specialist with a circle. What you know goes further than it should because the people around you already trust you, and the circle stays smaller than average because a 4 invests in fewer relationships more deeply. Both halves are load-bearing.',
            'What the two lines do to each other is worth naming. The 4 gives the 1 somewhere for the depth to go, which a 1 alone often lacks - plenty of 1s know a great deal and are never asked. And the 1 gives the 4 something worth passing on, which a 4 alone can lack: a well-connected person with nothing particular to offer is a familiar figure. Together they make someone whose reputation is specific rather than social.',
        ],
        portrait: {
            relationships: [
                'The 4 makes friendships more consequential here than they are for most designs - they are the channel through which a life moves, not a pleasant addition to it. Ending one badly costs more than the relationship.',
            ],
            workAndDirection: [
                'Transitions work best when the next thing is already known before the current one ends. A 1/4 who resigns and then looks tends to have a harder time than one who lets the network produce the opening first.',
            ],
            shadow: [
                'The 1 can hoard the depth without ever putting it out, and the 4 can become dependent on a network it has stopped adding to. Together that is someone very well informed inside a circle that is slowly shrinking.',
            ],
            growth: [
                'Keep the network warm before you need it, which is unnatural for a 1 absorbed in the subject. And let the depth be seen: the 4 can only pass on what the 1 has actually shown someone.',
            ],
        },
        signals: [sig('analytical', 0.8), sig('collaborative', 0.6), sig('introspective', 0.4), sig('persistent', 0.5)],
    }),
    profileUnit({
        key: '2/4',
        label: 'Profile 2/4 — Hermit / Opportunist',
        headline: 'Left alone until called, and then called by someone who knows you.',
        core: [
            'The conscious 2 has a natural aptitude it did not particularly work for and does not fully see. Left alone, this line develops something genuine - and being interrupted while doing it is experienced as an intrusion rather than as company. A 2 needs more solitude than it usually admits to needing.',
            'The unconscious 4 keeps opening the door. Opportunities arrive through the network, unbidden, and typically at the moment the 2 would rather not be disturbed. The characteristic rhythm of this profile is withdrawal followed by a call that pulls you out, and it repeats.',
            'What makes it work is that the calling is not optional and the withdrawing is not optional either. The 2 has to be left alone to have anything worth calling out, and the 4 has to be reachable or nobody calls. Managing that oscillation deliberately, rather than resenting each half in turn, is most of the skill in this profile.',
            'The interaction between the two lines is unusually cooperative for a profile built on opposites. The 4 protects the 2 from the thing a 2 most fears, which is being permanently overlooked; the 2 gives the 4 something real to bring to its network rather than mere availability. Where it goes wrong is when one line is indulged at the expense of the other for years at a time.',
        ],
        portrait: {
            relationships: [
                'The 4 makes close relationships the medium of the life; the 2 makes them exhausting in quantity. Fewer people, seen properly, is not antisocial here - it is the configuration working. Trying to maintain a wide circle exhausts the 2 without giving the 4 anything more to work with.',
            ],
            workAndDirection: [
                'Being recruited suits this design better than applying does. A 2/4 who has to sell itself performs badly at exactly the thing it is good at, because the 2 cannot see the aptitude clearly enough to describe it.',
            ],
            shadow: [
                'The 2 can hide until nobody remembers to call, and the 4 can spend so long being available that the aptitude never develops. Either way the design stops working. The oscillation is not a problem to be solved but a rhythm to be managed, and most of the difficulty comes from treating it as the former.',
            ],
            growth: [
                'Protect the alone time without disappearing from the network, which is a genuine balancing act rather than a slogan. And when the call comes at the wrong moment, notice that the wrong moment is the normal case rather than a reason to decline.',
            ],
        },
        signals: [sig('introspective', 0.7), sig('collaborative', 0.6), sig('private', 0.6), sig('receptive', 0.4)],
    }),
    profileUnit({
        key: '2/5',
        label: 'Profile 2/5 — Hermit / Heretic',
        headline: 'Wants to be left alone; keeps being expected to fix things.',
        core: [
            'The conscious 2 has natural ability and a strong preference for privacy. You do your best work uninterrupted, you are not entirely clear what you are good at, and you would generally rather not be asked.',
            'The unconscious 5 makes that impossible. This is the most projected-upon line in the system: people arrive with an expectation of you formed before they had evidence, and the expectation is nearly always that you can solve something. So a design that wants to be left alone is continuously being approached by people who have decided it is the answer.',
            'This is the most uncomfortable of the twelve combinations and one of the most useful. When the 2\'s genuine aptitude meets a projection that happens to be accurate, the result is remarkable. When the projection is wrong - and it often is, since it was formed without evidence - the fall is correspondingly hard, and the 2 retreats further.',
            'The two lines pull in genuinely opposite directions, and that is the defining fact of this profile rather than a difficulty to be resolved. A 2 wants to be left alone and a 5 will not be. Living it well means neither hiding until the calls stop nor accepting every one of them, which is a narrow path and takes most people a long time to find.',
        ],
        portrait: {
            relationships: [
                'People form strong impressions of you quickly and they are frequently not about you. Learning to notice when you are being projected onto, rather than accepting the role and then resenting it, is the central relational skill in this profile.',
            ],
            workAndDirection: [
                'This design is repeatedly handed problems it did not ask for. That is workable when the problem is one your actual aptitude fits and costly when it is not, so declining is a more important skill here than in almost any other profile.',
            ],
            shadow: [
                'The 5 can accept a reputation it cannot sustain, and the 2 can withdraw completely after the reputation collapses. The cycle of being called out, over-promising and disappearing is the characteristic failure.',
            ],
            growth: [
                'Say plainly what you can and cannot do, early, before the projection sets. It feels unnecessary and it is the single thing that prevents most of the damage this profile takes. People will form a picture regardless; the only question is whether you had any part in shaping it.',
            ],
        },
        signals: [sig('introspective', 0.7), sig('private', 0.6), sig('analytical', 0.5), sig('cautious', 0.4)],
    }),
    profileUnit({
        key: '3/5',
        label: 'Profile 3/5 — Martyr / Heretic',
        headline: 'Finds out by trying, and is trusted to have the answer.',
        core: [
            'The conscious 3 learns by doing and by getting it wrong. You try things, a good proportion do not work, and what accumulates is a very practical knowledge of what fails and why - which is more useful than it feels while it is happening.',
            'The unconscious 5 turns that into a reputation. People project competence onto you, usually more than the evidence supports, and they arrive expecting a workable solution. The 3 has actually got one more often than it realises, because it has been through the failures the theory-only people have not.',
            'The two lines make an unusually pragmatic combination. The 3 supplies the hard-won knowledge, the 5 supplies the platform, and the risk sits at the join: the 5 is being trusted for something the 3 is still in the middle of finding out.',
            'What each line does for the other is real. The 5 gives the 3 an audience for knowledge that would otherwise stay private and be mistaken by its owner for a record of failures. The 3 gives the 5 something to actually deliver, which is the thing that separates a durable reputation from one that collapses on first contact with a hard problem.',
        ],
        portrait: {
            relationships: [
                'Both lines make relationships turbulent. The 3 enters and exits by discovery and the 5 is idealised and then blamed, so a 3/5 tends to accumulate a history that looks worse from outside than it felt from inside.',
            ],
            workAndDirection: [
                'This design is excellent where the answer is unknown and someone has to find it by attempting things. It is poor where the first attempt must be right, and it should be honest about which kind of work it is taking on.',
            ],
            shadow: [
                'The 5 can promise on the strength of a reputation the 3 has not yet earned in this particular case, and the collapse that follows is public. The 3 then reads it as another failure rather than as an over-commitment.',
            ],
            growth: [
                'Manage the expectation before you manage the work. Saying "I will try this and it may not work" costs you nothing with the right people and saves the 5 from a fall it did not need to take.',
            ],
        },
        signals: [sig('adaptable', 0.7), sig('persistent', 0.6), sig('risk-oriented', 0.5), sig('practical', 0.5)],
    }),
    profileUnit({
        key: '3/6',
        label: 'Profile 3/6 — Martyr / Role Model',
        headline: 'A messy first act, a long observation, and authority afterwards.',
        core: [
            'The conscious 3 learns by trial and by things not working. The unconscious 6 lives in three distinct phases, and combined with a 3 the first of those phases is unusually eventful: roughly the first three decades are trial and error with the volume turned up, and it can feel considerably more chaotic than other people\'s twenties look.',
            'Then something changes. The 6 moves into a long middle period of stepping back and watching - less doing, more observing, often experienced as a strange flatness after so much activity - and this is where the material from the first phase gets processed rather than added to.',
            'The third phase is where the profile pays out. What emerges is someone whose authority is not theoretical: you know what does not work because you did it, and you have had years to understand why. Very few people arrive at that combination, and almost none of them arrive at it early.',
            'The two lines are in an unusual relationship: the 6 does not modify the 3 so much as give it a shape over time. Without the 6 a 3 accumulates setbacks and no perspective on them; without the 3 a 6 observes a life it never fully entered. Together they produce someone who earned the vantage point rather than adopting it.',
        ],
        portrait: {
            relationships: [
                'The first phase tends to produce a relationship history with a lot in it. The second can look like withdrawal to a partner and is closer to processing. Neither is a failure of character, though both are frequently read that way.',
            ],
            workAndDirection: [
                'Careers here rarely run in a straight line and are not supposed to. Work that rewards accumulated judgement suits the later phases; work that requires a spotless record early does not suit this design at all.',
            ],
            shadow: [
                'The 3 can conclude from the setbacks that it is unlucky, and the 6 can use the observation phase as a permanent retirement. Together that produces someone who stopped at thirty and called it wisdom.',
            ],
            growth: [
                'Take the middle phase seriously as a phase rather than as an ending. And resist the 3\'s reading of its own history: a design that learns by elimination has a record full of eliminations, which is the method working.',
            ],
        },
        signals: [sig('adaptable', 0.6), sig('introspective', 0.6), sig('persistent', 0.6), sig('conceptual', 0.4)],
    }),
    profileUnit({
        key: '4/6',
        label: 'Profile 4/6 — Opportunist / Role Model',
        headline: 'A life built through people, across three distinct phases.',
        core: [
            'The conscious 4 moves through a known network. Your opportunities, your work and most of what matters arrive through people you already have a relationship with, and the quality of those relationships is not a soft factor here - it is the infrastructure.',
            'The unconscious 6 runs the long arc underneath: an active and somewhat trial-heavy first phase, a long observational middle, and a later period of quiet authority. Combined with the 4, each phase changes what the network is for - first a source of experience, then something watched from a slight distance, then something you are trusted within.',
            'What this produces at its best is unusual loyalty in both directions. A 4/6 tends to have fewer relationships than average and to have kept them for a very long time, and the trust that accumulates over three phases is the thing that eventually makes the role-model half real.',
            'The two lines interact in a way worth naming. The 6 supplies the standing and the 4 supplies the people who can see it. A 6 without a network becomes an example nobody encounters; a 4 without the 6\'s arc has a circle and no particular reason for it. Held together over decades, the two produce influence of a quiet and quite durable kind.',
        ],
        portrait: {
            relationships: [
                'The 4 makes loyalty structural rather than sentimental. Bridges burned here cost far more than the individual relationship, because the network is how the life moves. Repairing a damaged relationship is worth more effort here than it would be for almost any other profile.',
            ],
            workAndDirection: [
                'Line up the next thing before ending the current one; the 4 does badly with a gap. And expect the middle phase to feel like stalling when it is actually the design doing what it does.',
                'Careers here tend to be long and to happen largely inside one field or one circle rather than across several. That is not a lack of ambition; it is the 4 building depth of relationship where a more mobile profile would build breadth, and over thirty years it produces a standing that cannot be acquired any faster.',
            ],
            shadow: [
                'The 4 can become dependent on a network that has stopped growing, and the 6 can detach so thoroughly in the middle phase that the network quietly disperses. The combination can leave someone well-connected in a circle that no longer exists.',
            ],
            growth: [
                'Keep adding people through all three phases, including the one where you do not feel like it. That is the specific discipline this profile needs. A network maintained only when it is wanted stops being a network, usually without announcing it.',
            ],
        },
        signals: [sig('collaborative', 0.8), sig('introspective', 0.5), sig('persistent', 0.5), sig('social', 0.4)],
    }),
    profileUnit({
        key: '4/1',
        label: 'Profile 4/1 — Opportunist / Investigator',
        headline: 'The most fixed of the twelve: a known network and a settled foundation.',
        core: [
            'The conscious 4 works through relationships and the unconscious 1 needs a foundation it has checked. Both lines are stabilising, and the combination is the most fixed profile in the system - the least able of the twelve to reinvent itself, and the most reliable once it is running.',
            'What that means practically is that this design does not change direction easily and should not be expected to. The 1 has built its ground carefully and the 4 has built its circle carefully, and asking either to start over is asking for something genuinely costly rather than merely inconvenient.',
            'The upside is depth in both dimensions. You know your subject and you know your people, and over twenty years that combination compounds in a way that more mobile profiles never quite achieve.',
            'The two lines reinforce rather than tension each other, which is what makes this the most fixed profile and also the most misread. Others frequently take the immovability for stubbornness; it is closer to the fact that both the foundation and the network took a very long time to build and cannot be rebuilt quickly. Change here is expensive rather than resisted.',
        ],
        portrait: {
            relationships: [
                'Fewer relationships, held for longer, and considerably more consequential than average. The 4/1 is often the person others have known the longest. That accumulated history is the profile\'s real asset, and it cannot be built any faster than it takes.',
            ],
            workAndDirection: [
                'Transitions are hard and should be planned rather than risked. This is not a design that lands well after jumping without something already arranged. Planning the move a year out is not excessive caution here; it is the thing that makes the move survivable.',
            ],
            shadow: [
                'Fixity is the shadow of fixity. Both lines resist change, so a situation that has stopped working can persist for years on the strength of the foundation and the network that were built around it.',
            ],
            growth: [
                'The useful move is deliberate, small, planned change rather than either stasis or upheaval. This design does not do sudden well, and it does incremental extremely well. A series of small deliberate changes will take a 4/1 somewhere a single dramatic one would not.',
                'It is also worth being explicit with the people around you about how long things take here, because the pace reads as reluctance to anyone expecting a quicker answer. A 4/1 that has said in advance how it works is given the time; one that has not is chased.',
            ],
        },
        signals: [sig('collaborative', 0.7), sig('analytical', 0.7), sig('stability-seeking', 0.7), sig('persistent', 0.5)],
    }),
    profileUnit({
        key: '5/1',
        label: 'Profile 5/1 — Heretic / Investigator',
        headline: 'Expected to have the answer, and quietly determined to actually have it.',
        core: [
            'The conscious 5 is the most projected-upon line in the system. People arrive with an expectation of you formed before they had much evidence, and the expectation is almost always that you can fix something. This is uncomfortable and it is also useful: it puts you in front of real problems repeatedly, and your reputation tends to run slightly ahead of your actual contact with people.',
            'Underneath, the unconscious 1 is doing something entirely different and largely unseen. It goes to the bottom of things. The 1 cannot rest on a foundation it has not checked, and it acquires depth privately, long before there is any occasion to use it.',
            'The combination is coherent rather than contradictory, and that is the whole point of it: the 5 is handed problems it did not ask for, and the 1 has already done the reading. When you deliver, the projection holds and it opens doors. When you do not, it reverses hard, and the reversal feels disproportionate because it is.',
        ],
        portrait: {
            relationships: [
                'People form a picture of you early and it is rarely accurate in either direction. The relational skill this profile most needs is noticing the projection as it forms and correcting it before it hardens, which feels unnecessary and prevents most of the trouble.',
            ],
            workAndDirection: [
                'This design does well where the problem is real and the depth is what solves it - consulting, crisis work, anything where someone needs the answer rather than the process. It does badly where it has to sustain a reputation it has not had time to earn.',
            ],
            shadow: [
                'The 5 can accept a role it has not verified it can fill, on the strength of the 1\'s general competence rather than of specific preparation. That is the mechanism behind the sudden fall this profile is known for.',
            ],
            growth: [
                'Wait for the thing to arrive rather than seeking it, because the 5 will be offered a great deal and most of it is not yours. Then let the 1 do what it does, and give it the time it needs: the reputation is built on the depth the 1 supplies, not on the speed the 5 gets credited with.',
            ],
        },
        signals: [sig('analytical', 0.7), sig('assertive', 0.5), sig('introspective', 0.5), sig('practical', 0.5)],
    }),
    profileUnit({
        key: '5/2',
        label: 'Profile 5/2 — Heretic / Hermit',
        headline: 'Called on constantly by people who have decided what you are.',
        core: [
            'The conscious 5 attracts projection: people expect you to solve things, and they expect it before they know you. The unconscious 2 has a natural aptitude it did not work for and would rather be left alone with.',
            'That is a genuinely awkward pairing, and it is the most common source of difficulty in this profile. The 5 keeps being summoned and the 2 keeps wanting to withdraw, and the aptitude the 5 is being called on for is one the 2 cannot clearly see or describe.',
            'When it works, it works because the projection happened to land on something real. A 2 with a genuine gift, called out by a 5 reputation, reaches far more people than a 2 alone ever would. The failure mode is the same mechanism with an inaccurate projection, and then both lines suffer at once.',
            'The two lines here work against each other more than they cooperate, and the difference between this and the 2/5 is which of them is conscious - which matters more than the shared numbers suggest. Here the projection is the part you experience directly and the aptitude is the part you cannot see, so you are acutely aware of what people expect and only vaguely aware of what you actually have. That asymmetry is the whole difficulty of the profile.',
        ],
        portrait: {
            relationships: [
                'You are misread confidently and often. The 2 makes it hard to correct, because you are not sure what you are either, and the useful practice is to notice the misreading even when you cannot yet replace it with something better.',
            ],
            workAndDirection: [
                'Being sought out suits this design; self-promotion does not, and it is worth arranging a working life where you can be found rather than having to sell. Visibility without self-promotion is the target, and it is a genuinely achievable one.',
            ],
            shadow: [
                'The cycle is being called out, overreaching, falling, and hiding. Each turn makes the 2 more reluctant and the 5 more brittle. Breaking the cycle usually starts with declining one projection that would previously have been accepted.',
            ],
            growth: [
                'Get honest about the actual aptitude, ideally with help, because the 2 cannot see it unaided. Knowing what you can genuinely do is what lets the 5 decline the projections that do not fit.',
            ],
        },
        signals: [sig('introspective', 0.6), sig('private', 0.6), sig('analytical', 0.5), sig('cautious', 0.4)],
    }),
    profileUnit({
        key: '6/2',
        label: 'Profile 6/2 — Role Model / Hermit',
        headline: 'Three phases, lived mostly out of view.',
        core: [
            'The conscious 6 runs the long arc: an experimental first phase, a long observational middle, and a later period of quiet authority. The unconscious 2 wants to be left alone throughout, and has an aptitude it did not particularly earn and cannot fully describe.',
            'The two lines agree more than most pairings do, and the agreement is toward privacy. This is a design that develops largely away from an audience, which means the first phase is less visible than a 3\'s and the middle phase can look, from outside, like someone who simply stopped.',
            'What emerges later is authority that nobody watched being built. A 6/2 tends to be recognised abruptly and by people who had not been paying attention, which is disorienting after decades of being left alone and is also precisely what the design was doing.',
            'The two lines agree, and the agreement is the risk. Both incline toward retreat, so nothing in the design pushes back against disappearing, and the third phase depends entirely on somebody still knowing where to find you. That is the one place this profile has to act against its own grain.',
        ],
        portrait: {
            relationships: [
                'Fewer relationships, chosen carefully, with long gaps tolerated better than by most. Being called out of the retreat is how this design meets people, and it will not initiate that. Staying findable is therefore not optional, even though nothing in the profile wants to do it.',
            ],
            workAndDirection: [
                'Work that permits long solitary development suits this. Work that requires continuous visible output does not, and the middle phase in particular is badly served by any role that measures presence. Work that judges output over a year rather than activity over a week suits this design considerably better.',
            ],
            shadow: [
                'Both lines can withdraw, and together they can withdraw permanently. The observational phase becoming a life is the specific risk here. One or two people who will keep making contact are usually the difference between a phase and an ending.',
            ],
            growth: [
                'Stay reachable during the middle phase even when nothing in you wants to be. That is the only part of this profile that requires effort against the grain, and it is the part that determines whether the third phase happens at all.',
            ],
        },
        signals: [sig('introspective', 0.8), sig('private', 0.7), sig('conceptual', 0.5), sig('receptive', 0.4)],
    }),
    profileUnit({
        key: '6/3',
        label: 'Profile 6/3 — Role Model / Martyr',
        headline: 'Three phases, and a trial-and-error engine running under all of them.',
        core: [
            'The conscious 6 lives in three phases and the unconscious 3 learns by things not working. The combination gives the whole arc an experimental quality: even the later authority phase keeps testing rather than settling, which distinguishes this profile from the more contemplative 6/2.',
            'The first phase is eventful and often difficult, because the 3 is running at full strength with the 6 not yet providing perspective. The middle phase is where perspective arrives, and it is a genuine relief - the first time the pattern of trial and error looks like a method rather than like bad luck.',
            'The third phase is unusual among the profiles in that it does not become static. A 6/3 arriving at authority keeps experimenting inside it, which makes for a considerably more useful role model than one who stopped learning at fifty.',
            'The two lines work on each other continuously rather than in sequence. The 3 keeps the 6 from settling into a fixed position it has stopped testing; the 6 keeps the 3 from reading its own history as a run of bad luck. Neither correction happens on its own, which is why this profile matures later and more thoroughly than most.',
        ],
        portrait: {
            relationships: [
                'A varied history, particularly early. The 3 discovers by elimination and the 6 eventually supplies the perspective to see it as discovery rather than as damage. That reframe tends to arrive around the middle phase, and it changes how the whole history reads.',
            ],
            workAndDirection: [
                'Work that tolerates iteration suits this design at every phase. Environments where a failed attempt is treated as a permanent mark do not, and this profile will accumulate those marks. Choosing the environment for its tolerance of failure matters more here than choosing it for the role.',
            ],
            shadow: [
                'The 3 can harden into cynicism during the first phase and the 6 can use the middle one to justify disengaging. Together they produce someone who tried everything, concluded nothing works, and calls it experience.',
            ],
            growth: [
                'Hold the 3\'s history and the 6\'s perspective together rather than letting one dismiss the other. The failures were the method; the perspective is what makes them worth something. Neither half is sufficient on its own, and this profile is one of the few that reliably ends up with both.',
            ],
        },
        signals: [sig('adaptable', 0.7), sig('introspective', 0.5), sig('persistent', 0.6), sig('novelty-seeking', 0.4)],
    }),
];
export const HD_PROFILES = profiles;
