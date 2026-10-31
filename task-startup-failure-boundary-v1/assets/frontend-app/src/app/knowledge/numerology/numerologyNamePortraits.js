/*
 * THE THREE NAME POSITIONS, IN DEPTH.
 *
 * numerologyNameRoles.ts carries the core reading for Expression, Soul Urge and
 * Personality: two paragraphs each, thirty-six units, and nothing underneath
 * them. Life Path had a full portrait and the other three core positions had
 * none, so a reader met one number in depth and three in summary.
 *
 * WHICH FIELDS, AND WHY NOT ALL OF THEM
 * Each position gets the three that position can actually answer. They are not
 * the same three, and that is the point:
 *
 *   EXPRESSION   strengths, workAndDirection, shadow
 *                It is capability. What the toolkit does well, where it is
 *                worth pointing, and how it fails - which for equipment is
 *                overuse rather than absence.
 *
 *   SOUL URGE    innerWorld, relationships, shadow
 *                It is motive, and motive is private. What it is like to want
 *                this, what it does to closeness, and what goes wrong when the
 *                wanting is not admitted.
 *
 *   PERSONALITY  relationships, shadow, growth
 *                It is impression. What people do with it, the specific
 *                misreading it produces, and what changes when the gap between
 *                surface and substance is worked on.
 *
 * Filling all nine fields on all three would have been longer and worse. A
 * Personality number has nothing honest to say about inner life - it is by
 * definition the part that is not inner - and inventing a paragraph to fill the
 * slot is how a knowledge base gets big without getting deeper.
 *
 * SOURCE POSITION
 * The 1-9 characters are Balliett's, restated: the 1 that begins, the 4 that
 * labours, the 6 that keeps a household, the 7 that withdraws. That the name is
 * read in three positions - whole, vowels, consonants - is the twentieth-century
 * convention rather than anything in her book, and the units' provenance says
 * so. Nothing here is quoted; the reading is ours.
 */
/** Keyed `<role>-<number>`, matching the unit keys exactly. */
export const NAME_PORTRAITS = {
    /* ================================================================ *
     * EXPRESSION - the whole name. What you were equipped with.
     * ================================================================ */
    'expression-1': {
        strengths: ['The genuinely rare part is not the willingness to decide but the willingness to '
                + 'be the one holding it afterwards. Most people can pick a direction; far fewer will stand '
                + 'behind the pick when it stops being popular, and that is what this toolkit is built for.'],
        workAndDirection: ['Points best at anything with an unmade decision at the front of it - new '
                + 'ventures, stalled projects, situations where the analysis is finished and nobody will '
                + 'move. It is poorly aimed at maintenance, where the same decisiveness reopens things that '
                + 'were working.'],
        shadow: ['The failure is overuse rather than absence: deciding when nothing needed deciding, '
                + 'because deciding is the fluent move. It reads to other people as not listening, and it is '
                + 'usually closer to not waiting.'],
    },
    'expression-2': {
        strengths: ['Can hold two incompatible positions accurately at once without collapsing either '
                + 'into a caricature. That sounds like patience and is actually a technical skill, and it is '
                + 'why deadlocks that defeat more forceful people come apart in this pair of hands.'],
        workAndDirection: ['Points at anything that runs through relationships - negotiation, '
                + 'partnership, the second seat where the work actually gets done. It is badly aimed at '
                + 'roles that need somebody to simply insist, which cost this toolkit more effort than they '
                + 'cost anyone else.'],
        shadow: ['Accommodation becomes the default long before anyone asks for it, so the position '
                + 'never gets stated and later gets stated badly. What looks like sudden unreasonableness is '
                + 'usually the first honest sentence after a long run of adjusting.'],
    },
    'expression-3': {
        strengths: ['Finds the form of an idea that another person will actually take in, and does it '
                + 'faster than the room. That is a translation instrument rather than a talent for talking, '
                + 'and it works just as well on somebody else\'s material as on your own.'],
        workAndDirection: ['Points at anything where the bottleneck is being understood - teaching, '
                + 'writing, selling a real thing, making a complicated field legible. It is wasted where the '
                + 'work is long, unwitnessed and structural, which is most of any project\'s middle.'],
        shadow: ['Fluency outruns substance and nobody in the room can tell, including you. The check '
                + 'is not to speak less but to notice when the sentence arrived before the thinking did, '
                + 'which it does more often than the reputation suggests.'],
    },
    'expression-4': {
        strengths: ['Does the part of the work nobody volunteers for, at the standard that makes the '
                + 'rest of it possible, without needing to be watched. Systems that hold up under load '
                + 'almost always turn out to have had somebody with this equipment in them early.'],
        workAndDirection: ['Points at building anything meant to outlast the enthusiasm that started '
                + 'it - process, infrastructure, institutions, craft. Badly aimed at work that is mostly '
                + 'improvisation, where the same thoroughness reads as an unwillingness to move.'],
        shadow: ['The equipment has no natural stopping point, so it keeps building after the thing '
                + 'is finished and calls it care. What that costs is visible to everyone except the person '
                + 'paying it, and it usually shows up as a rigidity nobody meant to acquire.'],
    },
    'expression-5': {
        strengths: ['Learns by moving, which means picking up a new domain at a speed that looks '
                + 'unserious to people who learn by sitting still. Six months in, the range is real and the '
                + 'connections between fields are ones a specialist would not have made.'],
        workAndDirection: ['Points at work with genuine variety and a real external constraint - '
                + 'anything where breadth is the asset and somebody else owns the deadline. Wasted where the '
                + 'value is in staying with one thing for a decade.'],
        shadow: ['Leaves at exactly the point where the work stops being new and starts being worth '
                + 'something. The pattern is legible from outside and almost invisible from inside, because '
                + 'each individual departure has a good reason.'],
    },
    'expression-6': {
        strengths: ['Notices what a person or a place needs and can actually supply it, which is a '
                + 'much rarer combination than either half alone. This is the equipment that holds families, '
                + 'teams and small institutions together, mostly without being credited.'],
        workAndDirection: ['Points at anything where the work is people or the standard of a place - '
                + 'teaching, care, hospitality, design, running the thing rather than founding it. Poorly '
                + 'aimed at work requiring indifference to the human cost.'],
        shadow: ['Responsibility gets taken rather than agreed, and the resentment that follows has '
                + 'nowhere legitimate to go because nobody asked. The correction is at the start - saying '
                + 'yes deliberately - not at the end.'],
    },
    'expression-7': {
        strengths: ['Will not round an argument off, and can stay with a hard question past the point '
                + 'where interest runs out. In any field where the standard answer is standard because '
                + 'nobody checked, this is an unfair advantage that compounds over a career.'],
        workAndDirection: ['Points at research, diagnosis, forensic and archival work, anything where '
                + 'being right eventually beats being quick now. Badly aimed at volume, persuasion and '
                + 'meetings, where the accuracy tends to arrive some time after the decision has already '
                + 'been taken.'],
        shadow: ['Preparation becomes the work: the standard for release is set so high that nothing '
                + 'is released, and years of real depth stay unpublished. The fix is a fixed date and a real '
                + 'reader, not a better argument.'],
    },
    'expression-8': {
        strengths: ['Can be trusted with the size of a thing - money, consequence, other people\'s '
                + 'livelihoods - without either flinching or enjoying it too much. That combination is what '
                + 'the equipment is actually for, and it is scarce.'],
        workAndDirection: ['Points at anything where the stakes are real and somebody has to carry '
                + 'them publicly: executive work, ownership, turnarounds. Poorly aimed at environments with '
                + 'no consequence attached, where it will manufacture some rather than sit idle.'],
        shadow: ['Scale becomes the measure of whether a thing was worth doing, which quietly rules '
                + 'out most of what a life is made of. The question this equipment cannot ask itself is what '
                + 'the size is in service of.'],
    },
    'expression-9': {
        strengths: ['Sees the whole of a situation, including the parts that are inconvenient to the '
                + 'side it is on. That makes for unusually good judgement and unusually poor advocacy, and '
                + 'the first is worth more than the second in most rooms.'],
        workAndDirection: ['Points at work with a wide frame and a long horizon - anything where the '
                + 'question is what this is all for. Badly aimed at work that needs a partisan, because the '
                + 'equipment keeps handing the other side its best argument.'],
        shadow: ['Perspective becomes a way of not being present: everything is understood, nothing is '
                + 'insisted on, and the people closest are quietly held at the same distance as everyone '
                + 'else. Breadth is easier than particular loyalty.'],
    },
    'expression-11': {
        strengths: ['Registers what is coming before there is evidence for it, and is right often '
                + 'enough that the misses do not settle the question. Used well this is early warning; the '
                + 'equipment supplies the signal, not the argument for it.'],
        workAndDirection: ['Points at work where sensing the shape of something first is the value - '
                + 'design, diagnosis, anything with a reading of people in it. Poorly aimed anywhere the '
                + 'case has to be made from evidence alone.'],
        shadow: ['The perception arrives without the case for it, so it gets stated as certainty and '
                + 'heard as arrogance. What breaks is not the accuracy but the willingness of other people '
                + 'to keep listening to it.'],
    },
    'expression-22': {
        strengths: ['Holds a large structure and its unglamorous detail in view at the same time, '
                + 'which is what separates something that gets built from something that gets described. The '
                + 'scale is not the rare part; the tolerance for the ordinary days is.'],
        workAndDirection: ['Points at long-horizon building where the result outlasts the builder - '
                + 'institutions, infrastructure, bodies of work that take a decade to become what they are. '
                + 'Badly aimed at anything that has to show a result this quarter, where the same '
                + 'thoroughness looks like an inability to ship.'],
        shadow: ['The scale becomes a reason to postpone everything smaller, including the parts of a life that '
                + 'do not compound and never will. Very large plans are also a very effective way of never '
                + 'having to start.'],
    },
    'expression-33': {
        strengths: ['Gives care as a standing practice rather than as a response to need, which means '
                + 'it is there before anyone has asked and does not run out when the emergency does. That '
                + 'steadiness is what people actually remember.'],
        workAndDirection: ['Points at teaching, care, and any long work whose result is other people '
                + 'being all right. Poorly aimed at competitive environments, where the equipment keeps '
                + 'giving away the advantage to whoever needed it more that day.'],
        shadow: ['There is no built-in limit, so the giving goes on past the point where it helps '
                + 'anyone and starts to hold people where they are. Care and control are hard to tell apart '
                + 'from the inside.'],
    },
    /* ================================================================ *
     * SOUL URGE - the vowels. What actually satisfies you.
     * ================================================================ */
    'soul-urge-1': {
        innerWorld: ['What satisfies you privately is being the one who decided - not the applause, '
                + 'which is often unwelcome, but the fact of having chosen. A good outcome somebody else '
                + 'chose for you registers as a smaller event than it should.'],
        relationships: ['Closeness works when there is room to move without asking. What reads as '
                + 'independence is closer to a requirement, and saying so early spares the other person '
                + 'years of interpreting your absences as verdicts on them.'],
        shadow: ['The wanting is rarely admitted, because admitting it sounds like ego, so it comes '
                + 'out sideways as impatience with people who are in the way. Named plainly it is much '
                + 'easier for everyone to work with.'],
    },
    'soul-urge-2': {
        innerWorld: ['Satisfaction comes from being genuinely in tune with somebody, and it is a '
                + 'quieter and more specific thing than being liked. An evening where the understanding was '
                + 'real outweighs a month of successful company.'],
        relationships: ['This is where the number is most itself and most at risk. The instinct to '
                + 'meet the other person can go so far that there is no one left to meet, and the '
                + 'relationship becomes accurate about them and blank about you.'],
        shadow: ['Wanting is treated as a demand, so it is never stated, and the unstated version '
                + 'leaks out as hurt at things nobody could have known to avoid. The cost falls on the '
                + 'people least at fault.'],
    },
    'soul-urge-3': {
        innerWorld: ['What satisfies you is the moment something lands - the idea, the joke, the '
                + 'sentence that finally works. Solitary competence does not do it, however good the work '
                + 'is: the reaching has to actually reach somebody.'],
        relationships: ['Excellent early company and harder to be close to than it appears. The same '
                + 'fluency that makes you easy to be around can be used to stay entertaining rather than be '
                + 'known, and it works well enough to become a habit.'],
        shadow: ['Approval is the thing actually being pursued, and calling it connection is how it gets past '
                + 'your own guard. The tell is simple and unwelcome: it is which reactions you replay '
                + 'afterwards, and whose.'],
    },
    'soul-urge-4': {
        innerWorld: ['Satisfaction is a thing that stands up: something built, kept, and still working '
                + 'years later. Recognition is pleasant and does not touch the actual reward, which is a '
                + 'soundness you can go and inspect for yourself.'],
        relationships: ['Loyalty here is a practice rather than a feeling, expressed by showing up, '
                + 'fixing things and being reliable for decades. That is a real love language and it goes '
                + 'unread by anyone waiting to be told.'],
        shadow: ['Security gets pursued long past the point where it buys anything further, and the pursuit is '
                + 'defended as prudence rather than examined. What it actually costs is the willingness to '
                + 'want anything that cannot be guaranteed in advance.'],
    },
    'soul-urge-5': {
        innerWorld: ['What satisfies you is the live possibility that something could change. A good '
                + 'situation with no exit reads as a worse one, which is difficult to explain to people who '
                + 'find that arrangement reassuring.'],
        relationships: ['Closeness holds when it does not require sameness. The commitment this number '
                + 'can genuinely make is to a person rather than to an arrangement, and confusing the two is '
                + 'how it ends up leaving something it did not want to leave.'],
        shadow: ['Freedom is treated as the thing itself rather than as the condition for it, so the '
                + 'options get kept open until there is nothing left to choose. The regret arrives late and '
                + 'all at once.'],
    },
    'soul-urge-6': {
        innerWorld: ['Satisfaction comes from the people and the place being all right, and it is '
                + 'genuine rather than dutiful. A day where something was quietly held together counts as a '
                + 'good day, whatever else did or did not happen in it.'],
        relationships: ['Gives more than is asked and finds receiving genuinely uncomfortable, which '
                + 'over time makes the relationship one-directional in a way nobody chose. Learning to be '
                + 'looked after is the harder half of this number.'],
        shadow: ['Being needed becomes the point, which quietly makes other people\'s independence feel like a '
                + 'loss rather than a success. Care shades into arrangement so gradually that no single '
                + 'moment ever looks like control.'],
    },
    'soul-urge-7': {
        innerWorld: ['The inner life is unusually well furnished and unusually private, and the two facts are '
                + 'connected rather than coincidental. The internal conversation is more interesting than '
                + 'most external ones, and saying it out loud tends to flatten it.'],
        relationships: ['What is offered is rare - sustained, undivided, genuinely curious attention. '
                + 'What is hard to offer is frequency, and the silences get read as withdrawal by people who '
                + 'were never told they were not.'],
        shadow: ['Privacy hardens into a policy nobody agreed to, and the inner world stops being '
                + 'private and starts being unknown. By then describing it feels like a bigger act than it '
                + 'would have been years earlier.'],
    },
    'soul-urge-8': {
        innerWorld: ['What satisfies you is weight - work that mattered, that would have gone worse '
                + 'without you, and that you can point at. Comfortable work with no consequence attached '
                + 'feels like being idle even when it is not.'],
        relationships: ['Provision is how affection gets expressed, reliably and at real cost, and it '
                + 'is frequently mistaken for a transaction by people who wanted the time instead. Both '
                + 'readings are honest, which is what makes it hard.'],
        shadow: ['The measure quietly becomes size, so enough never arrives and the question of what '
                + 'it is for goes unasked for decades. This is the number most likely to answer it in the '
                + 'wrong order.'],
    },
    'soul-urge-9': {
        innerWorld: ['Satisfaction is in the wider frame - having understood the whole of something, '
                + 'and having let go of your own claim on how it turns out. Narrow wins do not register '
                + 'the way they are supposed to.'],
        relationships: ['Unusually generous and unusually hard to be the most important person to. '
                + 'The same breadth that makes you fair to everyone makes particular loyalty feel like a '
                + 'diminishment, which the people closest to you will eventually notice.'],
        shadow: ['Detachment gets presented as maturity while quietly doing the work of avoidance. Letting go '
                + 'of something you never allowed yourself to want is not release, and the difference is '
                + 'almost invisible from the inside.'],
    },
    'soul-urge-11': {
        innerWorld: ['What satisfies you is the moment a pattern resolves before the evidence is in. '
                + 'The inner life runs faster than it can be justified, which is exhilarating and hard to '
                + 'live at for long.'],
        relationships: ['You read people very accurately and are read back rather poorly, so closeness depends on '
                + 'finding people willing to be known faster than they had intended to be. That narrows the '
                + 'available field considerably.'],
        shadow: ['Being right ahead of time becomes the thing being pursued, and the accuracy stops being '
                + 'useful to anybody but you. Sensitivity turns into a claim on other people rather than an '
                + 'offer to them.'],
    },
    'soul-urge-22': {
        innerWorld: ['Satisfaction is in scale that lasts: something still standing and still working when nobody '
                + 'remembers who built it. Ordinary success registers as a smaller event than it actually '
                + 'is, which makes it easy to undervalue.'],
        relationships: ['The work is genuinely for people, and the people in front of you can end up '
                + 'behind the plan. The ones close to you are usually asking for the day rather than the '
                + 'decade.'],
        shadow: ['The size of the intention becomes its own justification, and a life gets postponed '
                + 'in favour of what it is supposedly building toward. The postponement is very hard to see '
                + 'while it is being made.'],
    },
    'soul-urge-33': {
        innerWorld: ['What satisfies you is other people being all right, and it is not martyrdom - '
                + 'it is the actual reward, felt directly. That makes it very hard to notice when the '
                + 'account is running down.'],
        relationships: ['Steady, undemanding and easy to be near, and correspondingly easy to take for granted over '
                + 'years. Nothing in the manner signals a limit, so nobody thinks to look for one until it '
                + 'has been passed.'],
        shadow: ['The giving has no natural end, so it continues past the point where it helps and '
                + 'starts holding people in place. Being needed is a difficult thing to give up when it has '
                + 'been the whole shape of your usefulness.'],
    },
    /* ================================================================ *
     * PERSONALITY - the consonants. What reaches a room first.
     * ================================================================ */
    'personality-1': {
        relationships: ['People meet someone decisive and assume the confidence goes all the way '
                + 'down. They defer earlier than they should, which is useful and means you are consulted '
                + 'less often than you would like.'],
        shadow: ['The impression is more certain than you are, so doubt reads as an alarming reversal '
                + 'rather than as ordinary thinking. That gap does most of its damage in the moments when '
                + 'you most needed to say you were not sure.'],
        growth: ['What changes things is saying the uncertainty at the time rather than after. It '
                + 'costs less than it appears to, and it converts deference into the kind of help this '
                + 'surface otherwise never gets offered.'],
    },
    'personality-2': {
        relationships: ['People find you easy immediately and tell you things they had not planned to say out loud. '
                + 'That access is genuine and it arrives well before any decision on your side about whether '
                + 'you wanted it.'],
        shadow: ['The surface reads as agreement even when nothing has been agreed, so people leave '
                + 'conversations believing they have your support. The correction always lands later than it '
                + 'should and lands harder for the delay.'],
        growth: ['The work is on the small no, said in the moment, in the same tone as everything '
                + 'else. It is a much smaller act than the accumulated version, and it protects the ease '
                + 'that makes this surface valuable.'],
    },
    'personality-3': {
        relationships: ['You are the easiest person in the room to talk to and the hardest to get '
                + 'past. People leave having enjoyed themselves and knowing very little, and most of them '
                + 'do not notice.'],
        shadow: ['Charm is available as a way of ending a conversation without appearing to, and it '
                + 'works so well that it becomes automatic. What it costs is that being known requires '
                + 'switching something off deliberately.'],
        growth: ['One unperformed sentence, said early, to somebody who has earned it. The surface does not '
                + 'need dismantling and would be worse without it - it needs a door, and at present it does '
                + 'not have one.'],
    },
    'personality-4': {
        relationships: ['People read you as reliable before they have evidence, and they are right, '
                + 'which is why the work arrives before the recognition does. Being trusted early is the '
                + 'advantage and the trap.'],
        shadow: ['The surface is steady enough that nobody checks whether you are, and the ordinary '
                + 'signals of strain do not show on it. You are usually asked how you are once things have '
                + 'gone visibly wrong.'],
        growth: ['Saying that something is too much before it actually is, rather than afterwards, is the whole '
                + 'exercise. It is not in the repertoire this surface arrived with, and it can be added at '
                + 'any age.'],
    },
    'personality-5': {
        relationships: ['You arrive interesting and people commit to you faster than they meant to, often within a '
                + 'single conversation. What they are responding to is real, and it is not the part of you '
                + 'that stays.'],
        shadow: ['The surface promises availability that the rest of you has not agreed to supply, so '
                + 'people feel dropped by something you never offered. From your side nothing was withdrawn; '
                + 'from theirs something was.'],
        growth: ['Being explicit early about what you are actually offering is unromantic and slightly '
                + 'awkward. It is also the difference between a wide circle of friends and a trail of people '
                + 'who feel quietly misled.'],
    },
    'personality-6': {
        relationships: ['People bring you their situations within about ten minutes of meeting you, because the '
                + 'surface says plainly that you will take them on. The surface is accurate, which is exactly '
                + 'the problem with it.'],
        shadow: ['The impression recruits you into roles nobody discussed, and by the time the weight '
                + 'is obvious you are already carrying it. Refusing then looks like a withdrawal of care '
                + 'rather than a boundary.'],
        growth: ['The useful move is at the beginning rather than the end: one small limit stated before the '
                + 'role has finished forming. Late limits cost relationships that early ones would have kept '
                + 'intact.'],
    },
    'personality-7': {
        relationships: ['People read you as reserved and often as unimpressed, and they adjust their '
                + 'behaviour accordingly before you have had any opinion at all. Very little of that is '
                + 'about them and nearly all of them assume it is.'],
        shadow: ['The distance is protective and gets read as judgement, so people arrive at you already '
                + 'defended. You then meet the defended version of them and reasonably conclude that people '
                + 'are hard work.'],
        growth: ['One deliberate piece of warmth at the start of an encounter changes what you are '
                + 'given for the rest of it. It is a small, learnable and slightly artificial act, and it '
                + 'is worth doing anyway.'],
    },
    'personality-8': {
        relationships: ['People assume authority and assume you will use it, so they either defer or '
                + 'compete and rarely simply talk to you. Ordinary company is harder to come by than it '
                + 'should be.'],
        shadow: ['The surface makes you the person who decides, including in situations where you had '
                + 'no view. Enough repetitions and you start having views to fill the space, which is how '
                + 'the impression turns into a habit.'],
        growth: ['Explicitly not taking the decision, out loud, in a room that expected you to, is '
                + 'the most useful thing this surface can do. It costs nothing and it changes what people '
                + 'bring you afterwards.'],
    },
    'personality-9': {
        relationships: ['You come across as broad-minded and slightly above the fray, which people find restful and '
                + 'occasionally infuriating in equal measure. They bring you disputes to settle and very '
                + 'rarely bring you themselves.'],
        shadow: ['The impartial surface reads as having no stake, so people do not know where they '
                + 'stand with you - including the ones who have known you for years. Being fair to everyone '
                + 'is a poor substitute for being on somebody\'s side.'],
        growth: ['Taking one particular side, visibly, for somebody who matters to you, does more for closeness '
                + 'than a decade of even-handedness. It is also the specific thing this surface is built not '
                + 'to do.'],
    },
    'personality-11': {
        relationships: ['People find you slightly uncanny and are not always able to say why. The reading you give '
                + 'them is accurate and it arrives a good deal sooner than they were ready to be read.'],
        shadow: ['The surface suggests you already know, so people either over-disclose within minutes or stay '
                + 'well back and volunteer nothing at all. Neither of those two leaves any room for an '
                + 'ordinary getting-to-know-you.'],
        growth: ['Deliberately not saying the thing you have already seen, and waiting to be told it '
                + 'instead, is what makes this surface bearable to be near. The accuracy does not need the '
                + 'demonstration.'],
    },
    'personality-22': {
        relationships: ['People read seriousness and scale, and treat you as somebody whose time has '
                + 'to be justified. Casual approach mostly does not happen, and its absence is easy to '
                + 'mistake for other people being distant.'],
        shadow: ['The surface makes small things look beneath you when in fact they are just small. What gets '
                + 'lost in that is all the ordinary, unimportant contact that close relationships are '
                + 'actually made of.'],
        growth: ['Being visibly interested in something that does not matter at all is the correction here. It '
                + 'is trivial to do, costs nothing, and changes how approachable this surface reads by a '
                + 'surprising amount.'],
    },
    'personality-33': {
        relationships: ['People arrive already trusting you and already asking for something, and the surface says yes '
                + 'before you have decided anything at all. Warmth of this kind gets read as unlimited by '
                + 'default.'],
        shadow: ['Nothing in the impression suggests a cost, so nobody looks for one, and the '
                + 'depletion is invisible right up until it is total. The people benefiting are usually the '
                + 'last to know.'],
        growth: ['Letting the strain show, in small amounts, early, is what keeps this from ending in '
                + 'one large withdrawal. It also lets people give something back, which this surface '
                + 'otherwise makes almost impossible.'],
    },
};
