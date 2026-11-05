import { assertComplete, CORE_NUMBERS, lifePathUnit } from './numerologyAuthoring.js?v=53c0693';
/**
 * THE LIFE PATH, FOR EVERY VALUE THE ENGINE CAN PRODUCE.
 *
 * The Life Path is the deepest position in the system and the one a reader
 * arrives for. It is not what you are good at - that is the Expression - and it
 * is not what you want, which is the Soul Urge. It is the terrain: the kind of
 * situation you keep finding yourself in, whatever you do about it.
 *
 * The number 7 is written in numerologyRoles.ts as the original worked example
 * and is deliberately not repeated here. Every other value the engine can
 * resolve - 1 to 9, plus the preserved masters 11, 22 and 33 - is written below
 * at the same depth, and a guard at the foot of the file throws if the union of
 * the two files ever stops being complete.
 *
 * FORM. Two paragraphs of core, then a portrait: character, inner life,
 * relationships, work, shadow, growth. The shadow section carries two paragraphs
 * everywhere because a single paragraph of difficulty next to five of capacity
 * reads as flattery rather than as a reading.
 */
const lifePaths = [
    lifePathUnit({
        key: '1',
        headline: 'A life that keeps arriving at the moment before anything exists.',
        core: [
            'The Life Path is the long shape of a life, and a 1 keeps putting you at the front of things. Not necessarily in charge - that is a separate question - but first: the one who has to decide the thing will happen while it is still being weighed. You may find that situations organise themselves around your willingness to move, and that the willingness is not always accompanied by certainty.',
            'A life built this way runs on a particular fuel. The interest is highest at the beginning and drops sharply once a thing is working, which can mean more launches than any one person could reasonably be expected to sustain. This is not a failure of commitment. It is what an initiating temperament does when nobody has told it that the second half is also the job.',
        ],
        portrait: {
            coreCharacter: [
                'What distinguishes a 1 is not confidence, which comes and goes, but a low tolerance for waiting on permission. You will start without the mandate, apologise for it afterwards if necessary, and generally be forgiven because the thing exists by then. The same instinct is the reason you find committees genuinely painful in a way that is hard to explain to people who find them merely tedious.',
            ],
            innerWorld: [
                'There is more doubt in here than anyone would guess from outside, and it is kept in because the momentum depends on it being kept in. A 1 who says out loud that they are unsure watches the room deflate, learns the lesson once, and then carries the uncertainty privately for the rest of their life. That habit is efficient and it is lonely.',
            ],
            relationships: [
                'You are more loyal than you are attentive. What a 1 brings to a close relationship is decisiveness, protection and a genuine willingness to act on someone else\'s behalf; what it struggles to bring is the slow, undramatic maintenance that relationships actually run on. The people who stay tend to be the ones who stopped waiting to be asked and simply told you what they needed.',
            ],
            workAndDirection: [
                'The work that fits has a beginning in it: founding, launching, turning around, rebuilding something that has stalled. What fits badly is a role defined mainly by upkeep, and the mismatch shows up as a specific restlessness rather than as ordinary boredom. Where you have to stay in a maintaining role, the survivable version is one where you own a piece of it outright.',
            ],
            shadow: [
                'The characteristic failure is the unfinished portfolio. A 1 accumulates started things, each abandoned at roughly the moment it stopped being interesting and started being work, and then reads the accumulation as evidence of a personal defect rather than as a predictable consequence of an initiating temperament with no system behind it.',
                'The second cost is harder to see, because it looks like strength. Self-reliance carried far enough becomes an inability to be helped, and a 1 in difficulty will typically shed the people who could have made it easier, then experience the resulting solitude as confirmation that they were right to rely on nobody.',
            ],
            growth: [
                'The move is not learning patience, which never takes, but building the handover in from the start. Decide at the beginning who carries the thing once it is running, and treat that decision as part of starting rather than as an admission that you got bored. A 1 who can hand over becomes prolific. A 1 who cannot leaves a trail of good ideas that never became anything.',
            ],
        },
    }),
    lifePathUnit({
        key: '2',
        headline: 'A life spent in the space between people, where the real work happens.',
        core: [
            'A 2 Life Path puts you between things: between two people who cannot hear each other, between a decision and the people it will land on, between what was said in the meeting and what everybody actually meant. The position tends to find you rather than being chosen, and you can be very good at it; both facts are worth saying plainly, because a life spent in the middle is easy to overlook from either end.',
            'The terrain has a particular texture. Very little of what you contribute is visible as a contribution: the argument that did not happen leaves no evidence, and the collaboration that worked looks, afterwards, as though it was always going to. You will spend some part of your life deciding whether you can live with that, and the answer is usually yes, with a periodic and entirely reasonable flare of resentment.',
        ],
        portrait: {
            coreCharacter: [
                'The defining faculty is reception. You read a room before anybody in it has spoken, register the shift in someone\'s tone three sentences before they know they have changed it, and adjust without deciding to. That is a genuine and rare instrument, and its cost is that it never switches off - you are receiving in situations where nothing needs receiving.',
            ],
            innerWorld: [
                'The inner life is busier and more conflicted than the outward smoothness suggests. A great deal of what looks like calm is arbitration: two or three positions being held simultaneously because you can see the merit in each. What you often cannot locate in that arbitration is your own preference, which has been out-voted so often that it has stopped putting itself forward.',
            ],
            relationships: [
                'This is where a 2 is at its best and most at risk. You give a quality of attention that most people rarely receive, and you tend to attract people who need a great deal of it. The relationships that work are the ones where the other person notices the imbalance without being told - and the ones that fail usually failed slowly, invisibly, and without you ever having said what you wanted.',
            ],
            workAndDirection: [
                'Anything requiring you to hold a difficult group together: mediation, partnership, care, editorial work, second-in-command roles where the actual competence lives. The mismatch is with work that rewards individual assertion in a room full of people asserting, where you will do good work and watch it get attributed to whoever spoke over you.',
            ],
            shadow: [
                'The characteristic failure is the disappearing preference. Accommodation practised for long enough stops being a choice and becomes an inability, and by the time somebody asks a 2 what they actually want, the honest answer is that they no longer know. The discovery usually arrives late and as an unpleasant surprise.',
                'The second is the resentment ledger. A temperament that will not state a need still keeps count, silently and accurately, and the account eventually presents itself - typically as a sudden, disproportionate withdrawal from someone who genuinely did not know they were overdrawn.',
            ],
            growth: [
                'The discipline is small and difficult: state the preference before the arrangement forms, not after it has become uncomfortable. It feels like a risk to the peace and it almost never is, because the people worth keeping have been waiting to be told. A 2 who can say what they want early keeps the whole gift and loses the cost.',
            ],
        },
    }),
    lifePathUnit({
        key: '3',
        headline: 'A life that has to be said out loud before it becomes real.',
        core: [
            'A 3 Life Path keeps putting you in front of the thing that needs expressing. Not necessarily on a stage - the impulse is the same whether it comes out as writing, performance, design, teaching or simply being the one who says the unsayable thing out loud. What is constant is that experience does not feel finished to you until it has been shaped into something transmissible.',
            'The terrain rewards you early and then tests you. Fluency comes so easily that you can get a long way on it before anybody, yourself included, asks what the fluency is being used for. The characteristic mid-life question of a 3 is not whether they can do it. It is whether they ever went deep enough to find out what they were saying.',
        ],
        portrait: {
            coreCharacter: [
                'You think by talking, which means you frequently discover your own position somewhere in the second half of a sentence. This makes you excellent in live conditions and slightly unreliable in writing you have not revised, and it explains why so many of your best ideas have arrived while explaining something to somebody else.',
            ],
            innerWorld: [
                'There is a considerable gap between the buoyancy people see and the weather inside, and the buoyancy is not fake - it is a genuine capacity that runs alongside everything else rather than replacing it. What is true is that a 3 in real difficulty will often be the funniest person in the room, and that nobody present will have any idea.',
            ],
            relationships: [
                'Warm, quick, and easier to like than to know. A 3 gives attention generously and in short bursts, which suits acquaintance and complicates intimacy, since the same charm that opens the door can be used to keep the room shallow. The relationships that hold are the ones where somebody stayed past the entertaining part and asked a slower question.',
            ],
            workAndDirection: [
                'Anything expressive with an audience and a deadline. The deadline is not incidental: a 3 without external structure produces beginnings, and a 3 with a commissioning editor produces work. What suits badly is long solitary labour with no feedback, which starves the faculty that makes this temperament good in the first place.',
            ],
            shadow: [
                'Scatter is the obvious failure. Enthusiasm is genuinely renewable here, which means a 3 can start a great many things sincerely and finish few, and can be halfway through the next thing before noticing the last one is still open.',
                'The less obvious cost is the use of charm as avoidance. It is possible to deflect an entire difficult decade with wit, and the deflection works so well that the underlying thing goes untouched for years. A 3 who has never been unfunny in front of anyone has never quite been met.',
            ],
            growth: [
                'The work is depth rather than discipline, though discipline helps. Pick one thing and stay with it past the point where it stops being fun, because the second half of any subject is where the material a 3 was built to communicate actually lives. Finishing one serious piece of work changes this Life Path more than any amount of general productivity.',
            ],
        },
    }),
    lifePathUnit({
        key: '4',
        headline: 'A life measured by what is still standing.',
        core: [
            'A 4 Life Path puts you where something has to be made to work and then made to keep working. The terrain is practical: systems, materials, sequences, the load-bearing parts of an organisation or a family that nobody notices until they fail. You may find, repeatedly, that you are the person other people quietly rely on, and that the reliance tends to go unspoken until it is withdrawn.',
            'This is the least glamorous of the paths and the one that most consistently produces things that outlast their maker. The exchange is real. What a 4 gives up is speed, and a certain lightness, and the pleasure of the improvised gesture; what a 4 gets is that the thing is actually finished, and stays finished.',
        ],
        portrait: {
            coreCharacter: [
                'You have a physical distaste for the approximate. A plan with a soft joint in it is not a small irritation but something close to discomfort, and you will spend hours closing a gap that nobody else can see, on the entirely correct grounds that the gap is where it will fail. This is not perfectionism, which is about appearance. It is structural.',
            ],
            innerWorld: [
                'The inner life is more anxious than the steadiness suggests. A mind organised around what could give way is a mind that is always half-listening for the crack, and the calm other people find so reassuring costs more to maintain than they imagine. Rest is genuinely hard here, because rest is when the listening gets loud.',
            ],
            relationships: [
                'Reliability is your love language and it is frequently mistranslated. A 4 shows up, repairs the thing, handles the tax return and turns up on the worst day, and can be genuinely bewildered to be told they are not emotionally available. Saying the affectionate thing out loud, badly, once, does more for this path than another decade of dependable behaviour.',
            ],
            workAndDirection: [
                'Building, operating, engineering, administering, anything where the standard is whether it holds. What fits badly is work that is mostly ambiguity and persuasion, where there is nothing to make solid and the measure of success keeps moving. That environment does not merely frustrate a 4; it removes the instrument.',
            ],
            shadow: [
                'The characteristic failure is defending the structure past its usefulness. A 4 will keep an arrangement running long after the reason for it has gone, because dismantling something that still works feels like vandalism, and will experience the necessary change as a threat rather than as information.',
                'The second is the grievance of the unthanked. Doing the work nobody sees produces, over years, a quiet and largely unexpressed account of what you have carried, and it tends to be presented all at once, to someone who genuinely had no idea, in a tone that surprises everybody including you.',
            ],
            growth: [
                'The move is to schedule the change rather than resist it. Review the arrangement on a date you set in advance, while it is still working, so that alteration becomes something you do rather than something done to you. And say the thing you are carrying, in the ordinary week, before the account grows large enough to need a scene.',
            ],
        },
    }),
    lifePathUnit({
        key: '5',
        headline: 'A life that will not agree to stay in one shape.',
        core: [
            'A 5 Life Path keeps opening doors. The terrain is change - places, roles, ideas, people - and the constant across all of it is a refusal to be fixed in position. You may hear, at various points, that you should settle down, and trying to do it tends to produce a version of you that others find easier to deal with and that you do not recognise.',
            'What makes this path genuinely valuable is the same thing that makes it hard to explain. A person who has been in many rooms understands something a specialist does not, and in a situation nobody has seen before, a 5 is at its most useful, because there is no procedure to defend. The bill arrives later, in the form of a great deal of experience and not much accumulated.',
        ],
        portrait: {
            coreCharacter: [
                'The appetite is the engine. You learn by exposure rather than by study, get bored at a rate that alarms more settled temperaments, and have an unusually high tolerance for uncertainty that reads as courage from outside and as normal from inside. What actually frightens a 5 is not risk. It is the closed door.',
            ],
            innerWorld: [
                'Underneath the mobility there is a persistent, low-level worry about missing the real thing - the sense that the important life is happening in the room you just left. It is what keeps the motion going, and it is also why arriving somewhere good is often followed within months by a restlessness that makes no sense to anybody watching.',
            ],
            relationships: [
                'You are more constant than your history suggests and worse at saying so. A 5 can be deeply attached and still need the door unlocked, and the two are not in conflict, though almost every partner will initially assume they are. The relationships that survive are the ones where freedom was granted rather than fought for, which paradoxically removes most of the reason to use it.',
            ],
            workAndDirection: [
                'Work with variety built into its structure: fieldwork, journalism, sales, travel, crisis response, consulting, anything where the situation changes faster than the procedure. A fixed desk with a fixed remit does not merely bore this path, it degrades it, and the degradation shows up as unreliability rather than as unhappiness.',
            ],
            shadow: [
                'The characteristic failure is leaving at the exact point where staying would have started to pay. Compound interest applies to careers, relationships and skills, and a life of well-timed exits arrives at forty with a remarkable range and nothing that has been held long enough to be worth much.',
                'The second is appetite as anaesthetic. A 5 in genuine difficulty tends to increase the volume of experience rather than examine the difficulty, and the stimulation works well enough to postpone the reckoning by years.',
            ],
            growth: [
                'The discipline is not settling down. It is choosing one thing to hold while everything else stays fluid - one relationship, one body of work, one place to come back to - and treating that single commitment as the thing that makes the rest of the freedom usable. A 5 with one anchor becomes formidable. A 5 with none becomes a story other people tell.',
            ],
        },
    }),
    lifePathUnit({
        key: '6',
        headline: 'A life where somebody has to hold it together, and it keeps being you.',
        core: [
            'A 6 Life Path puts you in charge of things you did not volunteer for. The terrain is responsibility of a specific kind - not authority, which is the 8, but care: a household, a team, a friend in trouble, the whole quiet infrastructure of other people\'s wellbeing that somebody has to maintain and that you tend to notice early.',
            'The value here is not in question. Very little that matters gets built without somebody willing to do this, and a great deal of what looks like other people\'s success is standing on a 6 who kept the conditions in place. The question this path asks over a lifetime is narrower and harder: whether the giving is chosen, or whether it has become the only way you know how to be present.',
        ],
        portrait: {
            coreCharacter: [
                'You notice need. It is close to involuntary - a room registers to you as a set of people and what each of them is short of - and the noticing is followed so quickly by supplying that there is usually no moment in between where a decision could have been made. That is the whole gift and the whole difficulty in one sentence.',
            ],
            innerWorld: [
                'There is an exacting standard in here that other people never see, applied first to yourself and then, quietly, to everyone else. A 6 knows precisely how the situation should have been handled, forgives almost everybody for handling it differently, and keeps the assessment. The private cost of that forgiveness is rarely acknowledged, including by the person paying it.',
            ],
            relationships: [
                'You are the one who holds, and you are correspondingly bad at being held. Being on the receiving end feels unfamiliar to the point of discomfort, so a 6 will deflect care with a joke or a task and then, later, feel unmet - by people who tried. The single most useful thing on this path is learning to accept help badly rather than refuse it gracefully.',
            ],
            workAndDirection: [
                'Teaching, medicine, counselling, design, hospitality, management of the kind that is actually about people: work where the measure is whether the thing under your care is thriving. What fits badly is a purely transactional environment, where the instinct to look after finds nothing to attach to and turns instead on colleagues who did not ask.',
            ],
            shadow: [
                'Care becomes control at a point that is almost impossible to see from inside. It happens when the helping stops being offered and starts being administered - when you know what somebody needs better than they do, and act on it. Everyone involved can tell something has changed and nobody can name it, least of all the person doing the caring.',
                'The second failure is martyrdom, which is not the same as generosity. A 6 can build an entire identity on being indispensable, resent it accurately and continuously, and still refuse every offer of relief, because being relieved would mean the identity was optional.',
            ],
            growth: [
                'The discipline is asking rather than assuming. Before supplying what somebody needs, find out whether they want it supplied - which takes four seconds and prevents most of the damage this path is capable of. And put one thing in your life that exists for no reason except that you like it, and defend it as fiercely as you defend everybody else.',
            ],
        },
    }),
    lifePathUnit({
        key: '8',
        headline: 'A life where the results are going to be counted.',
        core: [
            'An 8 Life Path puts you in the arena where intentions get tested. Money, authority, ownership, scale: the terrain is material consequence, and the recurring situation is one where somebody has to be responsible for whether the thing actually worked. You may find yourself in that position repeatedly, often before feeling ready, and you tend to handle it better than expected.',
            'The reason this path has a hard reputation is that it does not accept substitutes. Effort, good faith and a sincere account of the difficulties are worth nothing here against a result, and an 8 tends to meet that lesson early, in situations where genuine effort does not produce the result. That lesson makes for realism, and it makes for a certain hardness that takes decades to soften.',
        ],
        portrait: {
            coreCharacter: [
                'You see how power actually moves - who decides, who only appears to, where the leverage sits - and you see it without effort, which more idealistic temperaments mistake for cynicism. It is not cynicism. It is a working model of the world that happens to be accurate, and it is the reason you get things done that better-intentioned people cannot.',
            ],
            innerWorld: [
                'The private question is whether it is ever going to be enough, and the honest answer so far has been no. An 8 reaches the target, experiences perhaps two weeks of satisfaction, and finds the next one already in place. The machinery is superb and it has no completion state, which is a fact about the path rather than a flaw in the person on it.',
            ],
            relationships: [
                'You provide, and providing is genuinely how you say it. The difficulty is that provision can be delivered without presence, and the people closest to an 8 often have an excellent standard of living and a recurring sense that they are being managed rather than known. Being unimpressive in front of somebody is the skill this path most lacks and most needs.',
            ],
            workAndDirection: [
                'Business, finance, law, construction, executive work, anything with a scoreboard and real stakes. What fits badly is a role with responsibility and no authority, which is a specific torment for this path: the 8 will be held accountable for outcomes it was given no instrument to affect, and will keep taking those roles because refusing feels like weakness.',
            ],
            shadow: [
                'The characteristic failure is a life optimised for a target nobody chose. An 8 can spend thirty years executing extremely well against an objective inherited from a parent, an industry or a version of themselves at twenty-five, and the competence is precisely what prevents the question from surfacing.',
                'The second is treating people as inputs. It is rarely deliberate and it is visible to everybody except the 8, who is genuinely occupied with the outcome and does not notice the moment when a colleague became a resource. The relationships lost this way do not announce their departure; they simply become professional.',
            ],
            growth: [
                'The move is to audit the target rather than the performance. Once a year, ask who set the objective and whether you would set it again today - a question this path is exceptionally good at avoiding by working harder. And practise being with people in situations where you have nothing to contribute, because that is where the part of you that is not a function gets to exist.',
            ],
        },
    }),
    lifePathUnit({
        key: '9',
        headline: 'A life lived at a wider angle than the personal.',
        core: [
            'A 9 Life Path keeps pulling the view back. The terrain is the general rather than the particular: causes, groups, ideas, whole situations seen from several sides at once. You may find that you can hold a position you disagree with fairly and completely, that grudges do not survive long in you, and that other people meet both of those as either generosity or unnerving detachment, depending on the day.',
            'This is the last of the single digits and it carries the character of an ending rather than a beginning. Things complete around a 9: relationships, phases, roles, often not by decision but because they have reached the end of what they were. Learning to let go well, rather than clinging and then losing anyway, is the practical content of this path.',
        ],
        portrait: {
            coreCharacter: [
                'The defining faculty is perspective, and it is genuinely rare. You can see a situation from the point of view of everyone in it, which makes you an unusually fair judge and an unusually poor advocate for yourself. The same width that lets you forgive almost anybody makes it very hard to say, in a small room, that something hurt.',
            ],
            innerWorld: [
                'There is more feeling in here than the composure indicates, and it tends to arrive as atmosphere rather than as an identifiable emotion attached to an identifiable cause. A 9 will be flattened for a week by something absorbed from the general weather - a piece of news, somebody else\'s grief - and will look for a personal explanation that does not exist.',
            ],
            relationships: [
                'You give widely and receive narrowly. A 9 is often the person everybody talks to and nobody asks about, partly because the wide sympathy makes you easy to confide in, and partly because you have quietly arranged it that way. Stating a specific personal need to one specific person is the hardest single act available to this path.',
            ],
            workAndDirection: [
                'Teaching, the arts, medicine, law, advocacy, any work where the point is larger than the individual doing it. The mismatch is with narrowly self-interested work, which a 9 can perform competently and will slowly find corrosive, in a way that is easy to mistake for ordinary career dissatisfaction until it is fairly advanced.',
            ],
            shadow: [
                'The wide view makes an excellent hiding place. A 9 can be sincerely occupied with something large and important and use it, without any dishonesty, to avoid one specific close-range conversation that has been waiting for years. The scale of the concern is real, which is exactly what makes the avoidance so durable.',
                'The second failure is unstated disappointment. A temperament that gives without asking builds up a picture of what it is owed, never mentions it, and then experiences the world as slightly ungrateful. The 9 rarely recognises this as a claim, because it was never voiced, and unvoiced claims are the hardest kind to settle.',
            ],
            growth: [
                'The discipline is the small and specific. Say the personal thing to the particular person, in ordinary language, without generalising it into a principle - which for this path is genuinely difficult and disproportionately effective. And practise ending things on purpose, early and cleanly, rather than letting them dissolve while you look away.',
            ],
        },
    }),
    lifePathUnit({
        key: '11',
        headline: 'A life spent receiving more signal than there is evidence for.',
        core: [
            'An 11 Life Path is a 2 with the volume raised, and the raise changes what the number is for. Where a 2 uses its sensitivity to keep things running between people, an 11 receives with it: impressions, atmospheres, the thing somebody is about to say, the sense that a situation is wrong before anything has visibly gone wrong. The terrain is a life in which you frequently know something and cannot justify it.',
            'That produces a specific and recurring difficulty. Knowledge without a chain of reasoning cannot be defended in a meeting, an argument or a family, and an 11 spends years learning either to suppress the faculty or to translate it into language other people accept. The path works when the translation is learned. It goes badly when the choice is suppression, which does not stop the reception - it only removes your access to it.',
        ],
        portrait: {
            coreCharacter: [
                'You are a receiver rather than a thinker, and the distinction matters. Things arrive complete rather than being worked out, which is why you are often right and almost never able to show your working. Learning to say "I think, and I cannot yet tell you why" is worth more to this path than any amount of additional sensitivity.',
            ],
            innerWorld: [
                'The nervous cost is real and it belongs to the number rather than being a weakness in the person carrying it. A channel this open takes in a great deal it never asked for, and an 11 without a practice for closing it spends most of its energy on noise. Solitude here is not preference or avoidance; it is maintenance.',
            ],
            relationships: [
                'You know things about people that they have not told you, and the ethics of that are more complicated than they look. Used well it makes an 11 an extraordinary friend; used carelessly it becomes a habit of responding to what somebody meant instead of what they said, which is unnerving to be on the receiving end of even when it is accurate.',
            ],
            workAndDirection: [
                'Work that requires reading what is not stated: therapy, teaching, the arts, design, negotiation, diagnosis, ministry. What fits badly is a high-volume adversarial environment, which does not merely tire this path but degrades the instrument, and the degradation is slow enough to be mistaken for growing up.',
            ],
            shadow: [
                'The characteristic failure is the collapse into the reduced number. An 11 under sustained pressure stops receiving and starts accommodating, becoming a very capable 2 - useful, liked, and quietly absent from its own life. Nothing dramatic marks the moment it happens.',
                'The second is inflation, which is the opposite error and just as common. A faculty that cannot be checked is a faculty that can drift, and an 11 who has stopped testing its impressions against outcomes will eventually be confidently, unfalsifiably wrong about somebody who deserved better.',
            ],
            growth: [
                'The practical work is unglamorous: write the impression down, date it, and look back later at what actually happened. That single habit does two things this path badly needs - it builds the evidence that lets you trust the faculty, and it catches the drift before it becomes a story. Everything else follows from having a calibrated instrument rather than an opinion.',
            ],
        },
    }),
    lifePathUnit({
        key: '22',
        headline: 'A life aimed at something that will take longer than a life.',
        core: [
            'A 22 Life Path is a 4 pointed at architectural scale. It keeps every part of the 4 - the materials, the sequence, the refusal to call a thing finished when it is only nearly working - and applies it to an objective large enough that no single person could be expected to complete it. The characteristic combination is a target that sounds visionary pursued by entirely unromantic means.',
            'The strain sits exactly where those two halves meet. A scale this large asks for patience measured in decades, and a temperament that judges itself by what is standing has to spend a great many years in a phase where nothing is standing yet. Most of what goes wrong on this path goes wrong in that gap, and it goes wrong quietly.',
        ],
        portrait: {
            coreCharacter: [
                'You have an unusual combination: the size of ambition that normally comes with impracticality, and the practicality that normally comes with modest ambition. That is why a 22 is taken seriously - the plan is large and the person describing it is also talking about supply chains and timelines, and the two together are rare enough to be persuasive.',
            ],
            innerWorld: [
                'The private experience is of a permanent gap between the thing in your head and the thing on the ground. It never closes, because the model keeps growing as the build proceeds, and a 22 can carry a low-grade sense of failure through a career that any outside observer would call remarkable. The gap is structural, not diagnostic.',
            ],
            relationships: [
                'The work is the third party in every relationship you have, and pretending otherwise helps nobody. What a 22 can offer is total reliability and a life with genuine meaning in it; what it struggles to offer is unclaimed time. The partnerships that last are the ones where this was named honestly at the start rather than discovered as a grievance at year six.',
            ],
            workAndDirection: [
                'Institution-building, infrastructure, systems that outlive their founders, long-horizon research, anything where the payoff is measured in decades. The mismatch is with short-cycle work, where the scale of the apparatus a 22 brings to bear is absurdly out of proportion and everybody involved can feel it.',
            ],
            shadow: [
                'The characteristic failure is the plan that never breaks ground. A 22 can spend fifteen years refining the model on the entirely reasonable grounds that a foundation this size had better be right, and the refinement is real work, which is what makes it such an effective place to hide from the risk of starting.',
                'The second is the human cost accounted as necessary. Something this large requires sacrifice and the sacrifice is usually made by people who did not choose the project, and a 22 who has decided the objective justifies it will not notice until the people are gone.',
            ],
            growth: [
                'The move is to make the vast thing small enough to start this month. Not a smaller ambition - that would waste what the path is for - but a first load-bearing piece that can actually be built now, and a fixed date to build it by. And check, periodically and out loud, with the people carrying the cost of the timeline.',
            ],
        },
    }),
    lifePathUnit({
        key: '33',
        headline: 'A life where the care is extended past the people who are owed it.',
        core: [
            'A 33 Life Path takes the responsibility of the 6 outside the household. It asks for the quality of attention normally reserved for family to be given to people who are not family, and to be given without the return that family provides. This is the most demanding of the master numbers, and it can be carried by someone who would never describe themselves in these terms.',
            'It is worth saying clearly what this path is not. It is not a claim to be more evolved, and it is not a licence to be exhausted. The tradition frames 33 as a heightened form of the same instruction the 6 receives - that care only works when it is chosen - and the heightening is in the scope, not in the virtue of the person doing it.',
        ],
        portrait: {
            coreCharacter: [
                'The instinct is to close a gap you did not create. Something is going wrong for somebody outside your circle of obligation, you can see how to help, and the seeing is followed by the doing without a decision in between. It makes for a life of considerable meaning and no natural stopping point.',
            ],
            innerWorld: [
                'There is a quiet and rarely examined belief in here that rest has to be earned, and that it has not been earned yet. A 33 will describe an eighty-hour week of caring for other people as an ordinary week, because by the internal accounting it is, and the accounting is not something the person has ever thought to question.',
            ],
            relationships: [
                'The people closest to you often get the least of you, and they usually do not say so, because what you are doing is visibly worth doing. That silence is the trap. The intimate relationships on this path fail slowly and reasonably, with everyone behaving well, which is a harder failure to notice than an argument would be.',
            ],
            workAndDirection: [
                'Teaching, medicine, ministry, social work, community organising, the arts where the arts are being used to reach somebody. The mismatch is not with any particular field but with any role where the caring impulse has no legitimate outlet, in which case it will find an illegitimate one - usually a colleague who becomes a project.',
            ],
            shadow: [
                'The characteristic failure is giving past the point of usefulness and then calling the exhaustion a virtue. It is genuinely difficult to see, because everything about it looks like devotion, and the person is too depleted to run the check that would catch it.',
                'The second is help that has stopped being wanted. Care extended widely enough starts arriving at people who did not ask, and a 33 convinced of the value of what it is offering can override somebody\'s stated preference with complete sincerity. The tell is a defensiveness when the offer is declined.',
            ],
            growth: [
                'The discipline is refusal, practised deliberately, on something you could have done. Not because the thing did not matter, but because a capacity to decline is the only thing that turns compulsion back into a choice. And accept care, visibly, from somebody close, which for this path is harder than any amount of giving and is the whole of the work.',
            ],
        },
    }),
];
export const NUMEROLOGY_LIFE_PATHS = lifePaths;
/* 7 lives in numerologyRoles.ts as the original worked example. */
assertComplete('Life Path', CORE_NUMBERS.filter((key) => key !== '7'), lifePaths);
