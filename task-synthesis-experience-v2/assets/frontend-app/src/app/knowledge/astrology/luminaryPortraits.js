/*
 * THE SUN AND THE MOON, UNDERNEATH THE PLACEMENT.
 *
 * Western astrology had 344 units and ONE portrait. Every planet-in-sign
 * carried two paragraphs and nothing below them, so the astrology reading was
 * the widest pillar in the app and the shallowest.
 *
 * These twenty-four are where the depth is worth most. The Sun and the Moon are
 * the two placements the reading already renders a portrait for -
 * distributePortrait() is called for exactly those two - so this surfaces
 * immediately rather than waiting on a rendering change, and they are also the
 * two a reader meets first and remembers.
 *
 * THE FIELDS ARE DIFFERENT FOR EACH, BECAUSE THE LUMINARIES ARE DIFFERENT
 *
 *   SUN    shadow, growth, workAndDirection
 *          Identity and direction. What the sign's virtue turns into when it is
 *          the only tool, what the correction is, and what the purpose is for.
 *
 *   MOON   emotionalPattern, relationships, shadow
 *          The automatic layer. What it does before you decide anything, what
 *          that does to closeness, and where the reflex costs.
 *
 * The Sun gets no emotionalPattern and the Moon gets no workAndDirection, and
 * that is deliberate: the Sun is not the feeling function and the Moon is not
 * the career one. Filling both fields on both would have been a longer file
 * saying less.
 *
 * OVER- AND UNDEREXPRESSION ARE BOTH IN THE SHADOW FIELD. Traditional and
 * modern writers alike treat a sign's difficulty as its virtue at the wrong
 * volume rather than as a separate vice, in both directions - the Aries Sun
 * that cannot start anything is as recognisably Aries as the one that cannot
 * stop. Splitting them into two fields produced two half-paragraphs.
 */
/** Keyed `<planet>-<sign>`, matching the placement unit keys exactly. */
export const LUMINARY_PORTRAITS = {
    /* ==================================================== THE SUN ========= */
    'sun-aries': {
        shadow: ['At full volume this becomes starting as an avoidance of finishing: a life of '
                + 'openings, each genuinely meant. Turned down too far it is worse and less obvious - the '
                + 'same person unable to begin anything, because a start that might not be carried through '
                + 'feels like a lie.'],
        growth: ['The correction is not patience, which this Sun cannot manufacture and should stop '
                + 'trying to. It is handing the middle to somebody who is good at it, deliberately and '
                + 'early, so the beginnings you are actually for stop being wasted.'],
        workAndDirection: ['This pattern tends to work better where there is an unmade first move - something to found, to rescue, or to enter where others have only analysed. It fits less well where the task is to keep something running, because the same instinct reopens what was quietly working.'],
    },
    'sun-taurus': {
        shadow: ['Overexpressed, steadiness becomes refusal: a position held long past the point where '
                + 'anyone remembers why, defended as principle. Underexpressed it shows as a person who '
                + 'cannot settle on anything at all and finds their own inconstancy genuinely distressing.'],
        growth: ['What moves this Sun is never argument - it is time, and a change small enough to be '
                + 'absorbed rather than resisted. Deciding in advance to revisit something on a date is '
                + 'worth more here than any amount of being persuaded.'],
        workAndDirection: ['This pattern tends to work better where value builds up over time and can be checked in what was actually made. It fits less well where constant pivoting is rewarded, because the same solidity can read as obstruction there.'],
    },
    'sun-gemini': {
        shadow: ['At volume this is range used as an escape from depth: enough of everything to never '
                + 'be caught out and not enough of anything to be relied on. Turned down, it becomes a '
                + 'person with genuine breadth who has decided their curiosity is unserious and stopped '
                + 'using it.'],
        growth: ['The move is not to narrow - narrowing kills what is good here - but to finish one '
                + 'thing per year in public. Range plus a single completed body of work is a formidable '
                + 'combination; range alone is a very good conversation.'],
        workAndDirection: ['This pattern tends to work better where the task is connecting fields, translating between them, or holding several conversations at once. It fits less well where one problem has to be held for a very long stretch, and there the restlessness is not a discipline failure but a real mismatch.'],
    },
    'sun-cancer': {
        shadow: ['Overexpressed, care becomes the mechanism by which nothing changes: everybody kept '
                + 'close, everybody looked after, nobody allowed to leave. Underexpressed it is a hardness '
                + 'this Sun does not wear well - the protectiveness turned inward, which can come across as coldness.'],
        growth: ['What this Sun needs is a place of its own that is not defined by who else is in it. '
                + 'Identity built entirely out of other people works until the people change, and they '
                + 'change on a schedule nobody controls.'],
        workAndDirection: ['This pattern tends to work better where there is something real to look after - something that would decay unattended. It fits less well where the task asks for indifference to who is affected.'],
    },
    'sun-leo': {
        shadow: ['At volume the warmth needs an audience to exist, and the generosity quietly acquires '
                + 'terms. Turned down it is more common and much sadder: a person who has decided that '
                + 'wanting to be seen is shameful, and who is therefore never quite present anywhere.'],
        growth: ['The correction is not modesty. It is doing the thing without the audience often '
                + 'enough to know it is yours - because a Leo Sun that has only ever been confirmed from '
                + 'outside has no way to tell the difference between being good and being watched.'],
        workAndDirection: ['This pattern tends to work better where someone has to be visibly responsible and can enjoy it. It fits less well where the contribution stays anonymous, because the same quality can curdle into a grievance nobody names.'],
    },
    'sun-virgo': {
        shadow: ['Overexpressed, discrimination becomes a machine for finding the flaw, applied first '
                + 'and hardest to yourself. Underexpressed it shows as a capable person who has given up on '
                + 'standards entirely because partial standards felt worse than none.'],
        growth: ['What changes this is deciding in advance what "good enough" means, in writing, '
                + 'before starting. Left to be judged at the end it will never be reached, because the '
                + 'faculty doing the judging improves faster than the work does.'],
        workAndDirection: ['This pattern tends to work better where the difference between nearly right and right actually matters. It fits less well where speed beats accuracy and the standard is treated as overhead, because the standard keeps running whether or not anyone asked for it.'],
    },
    'sun-libra': {
        shadow: ['At volume, fairness becomes a way of never being locatable: every side understood, '
                + 'no position occupied, and a growing private resentment at never getting your way. '
                + 'Underexpressed it flips into a brittle contrarianism that surprises everyone including '
                + 'you.'],
        growth: ['The work is stating a preference before knowing whether it is popular, in small '
                + 'things, repeatedly. This Sun does not lack opinions; it lacks the habit of putting one '
                + 'down where somebody might disagree with it.'],
        workAndDirection: ['This pattern tends to work better where the answer is a balance between competing goods rather than a fact. It fits less well where a decision simply has to be imposed, because the weighing that makes it good elsewhere becomes delay.'],
    },
    'sun-scorpio': {
        shadow: ['Overexpressed, the depth becomes control: intensity used to bind, honesty used as a '
                + 'weapon, and a refusal to be the one who is known. Underexpressed it is a flatness that costs this Sun a great deal - the intensity does not leave, it just stops having anywhere to go.'],
        growth: ['What this needs is one relationship in which you are the exposed party rather than '
                + 'the one doing the seeing. It is the least comfortable thing available to this placement '
                + 'and it is the whole of the growth.'],
        workAndDirection: ['This pattern tends to work better where the stakes are real and the surface account is not the whole story, and someone has to say so. It fits less well where everything is kept light and nothing is at stake.'],
    },
    'sun-sagittarius': {
        shadow: ['At volume the search for meaning becomes a reason to leave everything before it gets '
                + 'difficult, with a principle attached to make it respectable. Underexpressed it is a '
                + 'narrowing that reads as maturity and feels, from inside, like the lights going out.'],
        growth: ['The correction is committing to one thing long enough for it to get boring, and '
                + 'staying past that. Meaning in this placement is usually found on the far side of the '
                + 'stretch it habitually walks away from.'],
        workAndDirection: ['This pattern tends to work better where there is a horizon and a question in the task - where the frame is larger than the job at hand. It fits less well where the work is detailed maintenance, and the same expansiveness there is simply in the way.'],
    },
    'sun-capricorn': {
        shadow: ['Overexpressed, this becomes a life organised entirely around obligation, with the '
                + 'pleasure deferred to a date that keeps moving. Underexpressed it shows as a capable '
                + 'person avoiding responsibility altogether, because partial responsibility feels like '
                + 'certain failure.'],
        growth: ['What this Sun has to learn is that the reward is not scheduled and will not arrive '
                + 'on its own. Building something you enjoy while it is being built is not a lapse in '
                + 'seriousness; it is the only version of this that does not end in a bill.'],
        workAndDirection: ['This pattern tends to work better where building takes a long horizon and real accountability is attached. It fits less well where the work carries no consequence, which it tends not to respect.'],
    },
    'sun-aquarius': {
        shadow: ['At volume the independence becomes a position rather than a preference: difference '
                + 'maintained for its own sake, and a coolness toward the particular people in front of you '
                + 'while caring intensely about people in general. Underexpressed it is conformity worn '
                + 'badly and resented quietly.'],
        growth: ['The work here is particular rather than general: one person, specifically, allowed '
                + 'to matter more than the principle. This placement finds that harder than any amount of '
                + 'public dissent and gets more out of it.'],
        workAndDirection: ['This pattern tends to work better where the aim is to improve a system rather than a single case. It fits less well where it asks for loyalty to an arrangement you can already see is wrong.'],
    },
    'sun-pisces': {
        shadow: ['Overexpressed, the permeability becomes an absence of shape: everyone else\'s '
                + 'priorities absorbed, your own never stated, and a drift that is very hard to name from '
                + 'inside. Underexpressed it hardens into a defended, slightly disappointed practicality '
                + 'that suits this Sun badly.'],
        growth: ['What this needs is not boundaries in the abstract but structure in the diary: fixed '
                + 'commitments that do not depend on how you feel on the day. It is unglamorous and it is '
                + 'what lets the sensitivity be an asset rather than a weather system.'],
        workAndDirection: ['This pattern tends to work better where feeling your way into what is needed is the actual skill, where there is an unspoken layer to read. It fits less well in adversarial settings, where the same porousness is simply a cost.'],
    },
    /* =================================================== THE MOON ========= */
    'moon-aries': {
        emotionalPattern: ['Feeling arrives fast, complete and already expressed - there is almost no '
                + 'gap between the reaction and the room knowing about it. It also passes fast, which the '
                + 'people around you rarely believe until they have seen it several times.'],
        relationships: ['Easy to read and hard to keep up with. What this Moon needs is somebody who '
                + 'does not treat the flare as a verdict, and what it has to supply in return is the '
                + 'explicit reassurance that it was not one.'],
        shadow: ['The speed means the first reaction gets acted on before anything slower has arrived, '
                + 'and the slower thing is often the accurate one. The apology habit that develops is real '
                + 'and does not fix the pattern.'],
    },
    'moon-taurus': {
        emotionalPattern: ['Feeling is slow to arrive, concrete when it does, and settles rather than spikes. What comforts is concrete - food, warmth, a familiar room - and no amount of '
                + 'talking substitutes for it.'],
        relationships: ['Steady in affection, loyal, and hard to shift once hurt. The security this Moon offers is real and the price of it is that a repair takes considerably longer than '
                + 'the injury did.'],
        shadow: ['Comfort becomes the thing being protected rather than the person, so an arrangement '
                + 'that has stopped working gets defended simply because dismantling it would be '
                + 'uncomfortable. That can go on for a long time without anybody, including you, calling it a decision.'],
    },
    'moon-gemini': {
        emotionalPattern: ['Feeling is processed by being put into words, often before it has finished '
                + 'happening. Talking is not avoidance here, it is the actual mechanism - and it does mean '
                + 'the account arrives more finished than the feeling is.'],
        relationships: ['Needs somebody to think out loud at, and gets genuinely restless without it. '
                + 'The risk is that fluency about a feeling gets mistaken - by both parties, not just the '
                + 'listener - for having actually dealt with it.'],
        shadow: ['Anything that cannot be articulated tends to get treated as not quite real, so the parts of the emotional life with no language attached can go unattended for a long time. They do '
                + 'not go away while they are being ignored.'],
    },
    'moon-cancer': {
        emotionalPattern: ['Feeling is strong, tidal and long, and it belongs to a whole atmosphere '
                + 'rather than an event. This Moon remembers the emotional weather of long ago with striking precision, and a present mood can bring an old one back with it.'],
        relationships: ['Deeply attaching and slow to release, which makes it a superb keeper of '
                + 'people and a poor forgetter of injuries. Withdrawal rather than confrontation is the '
                + 'default, and it is easily misread as indifference.'],
        shadow: ['Looking after people becomes the mechanism for not being looked after, and the '
                + 'imbalance gets defended as temperament rather than examined. Being needed is a good deal '
                + 'safer here than being known.'],
    },
    'moon-leo': {
        emotionalPattern: ['Feeling is warm, generous, expressed openly and slightly performed - '
                + 'not falsely, but with an awareness of being seen that never entirely switches off. Being unwitnessed genuinely dampens it, which is not vanity so much as how this Moon works.'],
        relationships: ['Loyal, demonstrative and far more easily wounded by inattention than by actual '
                + 'unkindness. What this Moon needs is not praise so much as some evidence that its presence '
                + 'in the room registered at all.'],
        shadow: ['The need for a response quietly sets the terms of the exchange, so the other '
                + 'person\'s smaller and quieter feeling never quite gets the room it needed. It is not '
                + 'selfishness; it is volume.'],
    },
    'moon-virgo': {
        emotionalPattern: ['Feeling gets met by being usefully addressed: the reaction arrives already '
                + 'accompanied by an assessment of what ought to be done about it. Undirected emotion, with '
                + 'no task attached, is genuinely uncomfortable here.'],
        relationships: ['Shows care by fixing things, which is a real way of loving and one that can easily be read as criticism. Saying that it is care, out loud, does more work '
                + 'than any amount of doing it better.'],
        shadow: ['Distress gets converted into a task list, which works well enough to conceal that the '
                + 'feeling itself was never actually attended to. Over time that can produce a real efficiency with a hollow centre.'],
    },
    'moon-libra': {
        emotionalPattern: ['Feeling calibrates to the room before it has registered on its own account, '
                + 'so the honest answer to how you are can take a while to reach you when others are around. It tends to arrive afterwards, in quiet.'],
        relationships: ['Excellent company and genuinely hard to locate underneath it. What this Moon '
                + 'needs is somebody willing to ask twice, and to politely decline the first accommodating '
                + 'answer it offers them in return.'],
        shadow: ['Peace gets kept at the cost of anything actually being resolved. The unspoken then '
                + 'accumulates until it comes out at a volume that can seem to have arrived from nowhere, though it has been building for a while.'],
    },
    'moon-scorpio': {
        emotionalPattern: ['Feeling is deep, total and largely unreported. What reaches the surface is '
                + 'a fraction of what is happening, and the gap is not evasion - it is a settled judgement about who can hold the full version.'],
        relationships: ['Intensely loyal to a very few, and testing without meaning to be. Trust here '
                + 'is given in stages and withdrawn all at once, which the other party experiences as '
                + 'sudden and is not.'],
        shadow: ['Privacy turns into control: the person who knows and is not known holds a quiet '
                + 'advantage. That is very hard to give up voluntarily once it has become the shape that '
                + 'closeness takes.'],
    },
    'moon-sagittarius': {
        emotionalPattern: ['Feeling gets answered with movement and perspective - the reflex is to widen '
                + 'the frame until the thing inside it looks smaller. It works, and it works slightly too '
                + 'well to be entirely trustworthy.'],
        relationships: ['Warm, unpossessive and hard to pin down in a difficult moment. What this Moon '
                + 'has to learn is staying in a room where the feeling has not yet been made to look '
                + 'manageable.'],
        shadow: ['Perspective becomes escape with a philosophy attached to make it respectable. '
                + 'Anything that cannot be reframed gets left behind rather than actually felt, and it then '
                + 'quietly accumulates somewhere well out of sight.'],
    },
    'moon-capricorn': {
        emotionalPattern: ['Feeling is managed rather than had: assessed for whether it is useful, '
                + 'then set down and worked around. The competence is real, and it can run so smoothly that the feeling underneath goes unnoticed.'],
        relationships: ['Deeply reliable, and very slow to admit needing anything back. What reads as self-sufficiency is often a rule about not being a burden to anyone. Letting someone carry part of the load is the harder skill here, and the more useful one.'],
        shadow: ['Needing is treated as a fault to be corrected, so it goes unmentioned until it is '
                + 'large. The loneliness that produces is specific and rarely connected by the person to '
                + 'its cause.'],
    },
    'moon-aquarius': {
        emotionalPattern: ['Feeling is observed before it is experienced - there is a step back built '
                + 'into the reflex, and it happens fast enough to feel like not having reacted at all. It '
                + 'is real detachment and it is not absence of feeling.'],
        relationships: ['Fond, tolerant and difficult to reach in precisely the moment somebody needed '
                + 'reaching. This Moon gives space generously and by default, including on the occasions when '
                + 'what was actually being asked for was closeness.'],
        shadow: ['Distance from your own reaction quietly becomes distance from the person in front of '
                + 'you. The explanation - that you are being reasonable about it - is entirely accurate and '
                + 'completely beside the point.'],
    },
    'moon-pisces': {
        emotionalPattern: ['Feeling arrives without a clear border between yours and everybody '
                + 'else\'s, so a bad mood in the room becomes a bad mood in you before any of it has been '
                + 'identified. The absorption is automatic and largely unconscious.'],
        relationships: ['Extraordinarily attuned and correspondingly easy to flood. What this Moon '
                + 'needs is not less contact but reliable recovery after it, and the recovery has to be '
                + 'scheduled because it will not be noticed as necessary.'],
        shadow: ['Other people\'s states get treated as facts about you, so the question of what you '
                + 'actually feel can go unasked for years. Solitude is the instrument that answers it, and '
                + 'it is easily mistaken for withdrawal.'],
    },
};
