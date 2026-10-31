import { placementUnit } from '../astrologyAuthoring.js?v=b5ef5ed';
/**
 * THE SUN AND THE MOON THROUGH THE TWELVE SIGNS.
 *
 * These two carry the most weight in a reading and are written at the most
 * length. The Sun is the organising purpose - what a decade gets spent on. The
 * Moon is the automatic layer - what someone reaches for before deciding to.
 *
 * THE RULE FOR EVERY ENTRY IN THIS LIBRARY
 *
 * A planet in a sign is ONE thing, not two. "The Sun is identity, Virgo is
 * analytical" is not a reading, it is two dictionary lookups sitting next to
 * each other, and a reader can feel the join. Each entry below describes how
 * that particular function behaves when it runs in that particular register,
 * and it should be impossible to reconstruct from the two definitions alone.
 *
 * Second paragraph is where the cost lives. A placement described only at its
 * best is flattery, and flattery is the fastest way to lose a reader who is
 * paying attention.
 */
const sun = [
    {
        planet: 'sun', sign: 'aries',
        headline: 'Purpose found in the moving, not in the planning.',
        core: [
            'Your sense of who you are comes from acting. Not from what you have built or what you believe, but from the moment of committing - the decision made before the room is ready, the thing begun while it is still being weighed. An Aries Sun does not really know what it thinks until it has moved, which looks like impulsiveness from outside and feels from inside like the only honest way to find out.',
            'The cost arrives in the third month rather than the first. Beginnings are where this Sun is most itself, and the long unglamorous middle of anything asks for a quality it has to build deliberately. There is also a directness here that lands harder than intended: you tend to say the thing, assume it was heard as information, and be genuinely surprised that someone took it personally.',
        ],
    },
    {
        planet: 'sun', sign: 'taurus',
        headline: 'A life measured by what has actually been built.',
        core: [
            'Identity here is bound up with the tangible. What you have made, what you own, what holds - these are not vanities for a Taurus Sun, they are how you know your life is real. You move at your own pace, and the pace is not laziness: it is the rate at which something can be done in a way that will not need doing again.',
            'The difficulty is that the same steadiness makes changing course feel like a small death. A Taurus Sun can hold on to an arrangement long past the point where it stopped working, not from indecision but because the alternative is unbuilt and unbuilt things do not feel real yet. There is a stubbornness here that is genuinely hard to distinguish, from the inside, from conviction.',
        ],
    },
    {
        planet: 'sun', sign: 'gemini',
        headline: 'A self assembled from everything it has found interesting.',
        core: [
            'A Gemini Sun is organised around contact. You become yourself by taking things in - conversations, ideas, other people\'s enthusiasms - and the range is real rather than superficial, because what you are actually collecting is the connections between things rather than the things themselves. You think out loud, which means your ideas are often heard mid-formation, and a hypothesis can be taken for a position.',
            'What this Sun struggles with is the question of what it is for. Purpose asks you to close down options, and closing options feels less like commitment than like amputation. The result can be a life of considerable brightness with no single thing in it deep enough to have cost anything, and a recurring sense that a great deal has been sampled and little has been finished.',
        ],
    },
    {
        planet: 'sun', sign: 'cancer',
        headline: 'Purpose built around what you are protecting.',
        core: [
            'This Sun knows itself through belonging. Not sociability - a Cancer Sun can be quite private - but the specific business of having people who are yours and a place that is yours, and organising a life around keeping both intact. Ambition here is real but it is rarely stated as ambition; it appears instead as the conviction that certain things must be looked after, and a willingness to work very hard to see that they are.',
            'The approach is indirect, which is worth knowing about yourself because it reads as evasive to people who move straight at things. And the protective instinct does not switch off when protection is no longer needed: a Cancer Sun can go on managing the emotional weather for adults who would rather manage their own, and be genuinely hurt when the care is experienced as control.',
        ],
    },
    {
        planet: 'sun', sign: 'leo',
        headline: 'A self that is not fully real until it is witnessed.',
        core: [
            'A Leo Sun is expressive at the level of identity rather than personality. Whatever you are, you need it to be out in the world where someone can see it, and this is less about applause than it may look - it is that an unexpressed life does not feel like a life. There is real generosity attached, the sort that gives without accounting, and real warmth that tends to draw people in.',
            'The exposure is the problem. Needing to be seen means being genuinely woundable by not being seen, and a Leo Sun that has been overlooked for long enough will either perform harder or withdraw entirely, and neither is the thing it actually wanted. The other cost is that the version of you that gets expressed can start editing itself for the room, until the performance is quite good and increasingly unrelated to what is underneath.',
        ],
    },
    {
        planet: 'sun', sign: 'virgo',
        headline: 'Identity through work that is actually useful.',
        core: [
            'A Virgo Sun locates itself in competence. Not status and not scale - usefulness, the specific satisfaction of a thing done properly by someone who noticed what needed doing. You are drawn to the discrepancy in a system, and you fix it, often without mentioning it, and the accumulation of those unmentioned fixes is what a Virgo Sun quietly believes its life consists of.',
            'What goes wrong is that the standard applies inward at full strength and with none of the tolerance. The eye that catches the flaw in a process catches it in yourself continuously, and a Virgo Sun can go on being effectively excellent while privately keeping score against a version of itself that has never once been reached. There is also a habit of taking responsibility for other people\'s work, which looks like service and costs more than it seems.',
        ],
    },
    {
        planet: 'sun', sign: 'libra',
        headline: 'A self that comes into focus opposite someone else.',
        core: [
            'A Libra Sun is calibrated relationally. You know what you think by testing it against another position, know who you are partly through who you are with, and have an instinct for proportion that helps you act fairly when a decision has two defensible sides. This is a real capability: holding two claims at once without quietly preferring one.',
            'The cost is a genuine difficulty in stating a preference. Not indecision exactly - a Libra Sun can decide - but a reluctance to decide in a way that makes someone lose, which produces long delays that read as weakness and are actually a form of conscientiousness. Left unexamined it becomes a life shaped almost entirely by accommodation, and a slow resentment at the people who were only ever asked what they wanted.',
        ],
    },
    {
        planet: 'sun', sign: 'scorpio',
        headline: 'A life that only counts the parts that went all the way in.',
        core: [
            'A Scorpio Sun has no register for the moderate. Whatever you commit to, you commit completely, and whatever you withhold from you withhold completely, and there is very little in between. This produces real staying power - you can stay with a difficult subject, person or project long after interest alone would have run out - and a sharp, uninvited sense of what may be going on underneath what people say.',
            'The privacy is not shyness, it is strategy, and it costs something. A Scorpio Sun tends to know a great deal about the people around it while being known by almost none of them, and the asymmetry eventually becomes lonely in a way that is hard to complain about, since you built it. The other difficulty is that intensity has no low setting: things that do not warrant the full weight get it anyway.',
        ],
    },
    {
        planet: 'sun', sign: 'sagittarius',
        headline: 'Purpose that needs the horizon in it somewhere.',
        core: [
            'A Sagittarius Sun runs on meaning. You need the thing you are doing to connect to something larger than the thing you are doing, and where it does not, the energy simply is not available - not as reluctance, as absence. This gives you a feel for the long shot and the unfamiliar, and a frankness, because a mind organised around the big frame does not naturally hold back the inconvenient observation.',
            'What suffers is the detail and the person in front of you. The same widening that makes the frankness possible makes it land badly, and a Sagittarius Sun is regularly surprised to learn it has been experienced as tactless when it was being honest. The restlessness is real too: this Sun will leave something good for something bigger, and does not always check afterwards whether bigger was better.',
        ],
    },
    {
        planet: 'sun', sign: 'capricorn',
        headline: 'A self built slowly, against resistance, on purpose.',
        core: [
            'A Capricorn Sun takes the long view from early, often earlier than is comfortable. There is a seriousness here that does not need to be taught, and the organising conviction is that anything worth having is built rather than given. You work well with delayed return, and you carry responsibility without much visible complaint.',
            'The difficulty is that this Sun measures itself by output and does not have a natural stopping point. Achievement is followed by the next target rather than by satisfaction, and rest reads as slippage rather than as recovery. There is also a reserve that can come across as coldness when it is usually just a reluctance to say anything before it has been thought through and can be stood behind.',
        ],
    },
    {
        planet: 'sun', sign: 'aquarius',
        headline: 'Identity held at a slight, deliberate distance.',
        core: [
            'An Aquarius Sun stands a little outside whatever it is part of. This is not aloofness so much as vantage: you see the system rather than the individual case, you can hold a position on grounds you could state to a stranger, and you can stay unmoved when everyone in the room disagrees. It makes for real independence of mind and a genuine, unsentimental concern for how things ought to work for people in general.',
            'The general is the problem. A Sun this comfortable with the collective can be strangely awkward with the particular person sitting in front of it, and principles held this firmly leave little room for the case that does not fit. There is also a contrarian reflex worth watching, where the position gets adopted partly because it is the one nobody else is holding.',
        ],
    },
    {
        planet: 'sun', sign: 'pisces',
        headline: 'A self with unusually soft edges, and better vision for it.',
        core: [
            'A Pisces Sun does not experience itself as a clearly bounded thing. Identity here is permeable - shaped by the room, by the music, by whoever you spent the afternoon with - and the permeability is the source of both the imagination and the compassion, which are not decorative in this placement but genuinely how you take the world in. You often sense things you were never told.',
            'What is difficult is holding a shape. Direction requires an edge to push from, and this Sun has to build one deliberately where others are issued with it, which is why a Pisces Sun can spend a long stretch of early adulthood being extremely capable in service of somebody else\'s plan. Escape is the failure mode, and it is rarely dramatic: it is simply that the harder thing keeps being deferred in favour of something softer.',
        ],
    },
];
const moon = [
    {
        planet: 'moon', sign: 'aries',
        headline: 'Feeling arrives fast, at full volume, and clears.',
        core: [
            'Your emotional processing runs at speed. Something happens, the reaction is immediate and complete, and it is out before any part of you has decided whether it should be - and then, importantly, it is over. An Aries Moon does not brood. What it does is discharge, which is genuinely healthier than it looks, though the people nearby may still be holding what you have already finished with.',
            'What this Moon needs in order to feel safe is the ability to act. Being stuck is the intolerable state, more than being hurt, and a situation you cannot do anything about produces a specific agitation that has nowhere to go. The cost is that the fast reaction fires on incomplete information routinely, and apologising afterwards becomes a recurring feature rather than an occasional one.',
        ],
    },
    {
        planet: 'moon', sign: 'taurus',
        headline: 'Comfort is not a luxury here; it is the regulating mechanism.',
        core: [
            'A Taurus Moon steadies itself through the tangible and the familiar. Food, warmth, a familiar chair, the same walk at the same time - these are not indulgences but the actual machinery by which this Moon returns to baseline, and going without them costs more than it looks. Emotionally you are slow to be moved and correspondingly slow to be shaken.',
            'The steadiness has a hard edge. Once this Moon has settled on an arrangement it does not want it disturbed, and it will absorb a surprising amount of unhappiness rather than accept the upheaval of changing it. There is also a link between feeling and comfort-seeking here that is worth being honest about: reaching for something to have or to hold can be the emotional response in another form.',
        ],
    },
    {
        planet: 'moon', sign: 'gemini',
        headline: 'Feelings become manageable once they have been put into words.',
        core: [
            'A Gemini Moon processes by talking. Not for advice, usually - the talking IS the processing, and being made to sit silently with something unresolved is the version of distress this Moon knows best. You are curious about your own reactions in a way that gives you real insight and a certain useful distance, since anything you can describe you are no longer entirely inside.',
            'The distance is also the difficulty. Naming a feeling accurately can be a way of not having it, and a Gemini Moon is capable of an articulate account of its own emotional life that has never once been felt all the way through. Restlessness under emotional pressure is the other signature: the impulse when something is heavy is to change the subject, change the room, or change the plan.',
        ],
    },
    {
        planet: 'moon', sign: 'cancer',
        headline: 'The Moon at home, for better and for worse.',
        core: [
            'This is the Moon in the sign it rules, and the effect is amplification rather than ease. Emotional life here is deep, tidal and long-memoried: you feel things thoroughly, you remember how things felt long after you have forgotten what was said, and you have an accurate instinct for the emotional state of a room that arrives before any evidence does. What makes you safe is belonging - a person, a place, a door that closes.',
            'The memory is the cost. A Cancer Moon holds on to injuries with the same fidelity it holds on to everything else, and an old hurt can be re-entered at full strength on very little provocation. The protective reflex extends to withdrawal: when this Moon is wounded it goes sideways and inward rather than saying so, and the people who caused it are frequently unaware anything happened at all.',
        ],
    },
    {
        planet: 'moon', sign: 'leo',
        headline: 'Needing warmth, and needing it to be visible.',
        core: [
            'A Leo Moon needs to matter to somebody, specifically and demonstrably. Affection given quietly does not fully register; it has to be shown, and this is not vanity but the actual mechanism by which this Moon knows it is secure. In return it gives generously and with real warmth, and there is a loyalty here that does not do things by halves.',
            'The vulnerability is exact and it is easy to trigger. Being overlooked - not rejected, just not noticed - lands harder on this Moon than it may look, and the response is usually either an escalation of effort or a wounded dignity that will not explain itself. There can also be a difficulty in letting someone else have the difficult feeling, because attention in the room is a resource this Moon is quietly tracking.',
        ],
    },
    {
        planet: 'moon', sign: 'virgo',
        headline: 'Emotional safety through order, usefulness and small repairs.',
        core: [
            'A Virgo Moon regulates itself by fixing something. When the internal state is unmanageable, the tidied drawer, the finished task and the solved small problem do real work here - they are how order gets restored inwardly by being restored outwardly. Care is expressed the same way: this Moon does not say much about how it feels about you, it notices what you need and quietly handles it.',
            'What this Moon does badly is receive. Being looked after puts it in a position it has no practice in and often no tolerance for, and it will deflect into usefulness rather than accept the attention. The other difficulty is the running commentary: the analytic eye turned on your own emotional reactions produces a lot of judgement about whether a feeling is warranted, which is a poor question and a reliable way to make the feeling last longer.',
        ],
    },
    {
        planet: 'moon', sign: 'libra',
        headline: 'Equilibrium restored by putting the relationship right.',
        core: [
            'A Libra Moon cannot settle while something between two people is unresolved. Discord is felt at once here, and the impulse to repair it is immediate and mostly involuntary, which makes this Moon a genuinely skilled peacemaker and a slightly unreliable reporter of its own position. You are pleasant company by construction rather than by effort.',
            'The cost is that harmony gets bought with your own preference, repeatedly and without anyone noticing including you. A Libra Moon can find itself in arrangements that suit everybody adequately and nobody entirely. There is also a dependence on the other person\'s mood for your own that is worth watching: when they are unsettled you cannot settle either, which hands them a control neither of you agreed to.',
        ],
    },
    {
        planet: 'moon', sign: 'scorpio',
        headline: 'Feeling that goes deep, stays private, and does not dilute.',
        core: [
            'A Scorpio Moon feels at a depth that other people mostly do not visit and has decided, usually early and usually for a reason, not to show it. What you get instead is containment - a great deal happening under a still surface - and an accurate, almost unfair perception of what other people are concealing, since you know from the inside what concealment looks like.',
            'Trust here is close to binary and it is slow. Once given it is near-total; once broken it is very hard to reissue, and this Moon can carry a withdrawal for a long time without ever stating what it was for. The other difficulty is that emotion this concentrated has to go somewhere: unexpressed, it tends to convert into suspicion, or into a controlling grip on situations that would actually be fine left alone.',
        ],
    },
    {
        planet: 'moon', sign: 'sagittarius',
        headline: 'Feeling handled by moving, and by finding the larger frame.',
        core: [
            'A Sagittarius Moon needs room. Emotional constraint - being fenced in, being asked to promise something, being in a small situation with no exit - produces distress here faster than any actual difficulty does, and the reliable regulator is motion: the trip, the plan, the change of scene. There is also a real buoyancy in this placement, an honest capacity to find the funny angle in a bad week and mean it.',
            'The buoyancy can be a dodge. This Moon is skilled at converting something painful into a lesson, a story or a philosophy slightly before it has been felt, and the conversion is fast enough to look like resilience. What follows is a pattern of leaving - jobs, cities, relationships - at the exact point where staying would have required sitting with something, and calling it appetite for life.',
        ],
    },
    {
        planet: 'moon', sign: 'capricorn',
        headline: 'Emotion managed rather than expressed, and managed well.',
        core: [
            'A Capricorn Moon tends to treat feelings as something best handled competently. What that produces is real steadiness under pressure - the ability to stay functional in a crisis - and a private conviction that needing things is a weakness to be worked around rather than a fact to be met. Safety here comes from control, capability and knowing the situation is being handled.',
            'The bill comes due somewhere else. Emotion that is managed rather than felt does not disappear, it goes underground, and a Capricorn Moon is prone to a low grey flatness that has no obvious cause because the causes were all dealt with efficiently long ago. Letting someone help is the difficult move, and it stays difficult; the useful thing is to notice that it is difficult rather than to conclude it is unnecessary.',
        ],
    },
    {
        planet: 'moon', sign: 'aquarius',
        headline: 'Feeling observed from a short distance, usually accurately.',
        core: [
            'An Aquarius Moon puts a step between itself and its own reactions. You can describe what you are feeling while you are feeling it, which gives you real composure under pressure, and a genuine ability to help someone in distress without being pulled into it. Emotional independence here is real: you do not need much, and you would rather not be needed too much either.',
            'The step can become a wall. This Moon is capable of keeping everyone at a distance where they cannot be inconvenient, and of experiencing that as a preference rather than as a pattern. Under real pressure the response is not to reach for someone but to become more detached, more theoretical and more reasonable, at exactly the moment when being reasonable is not what the situation requires.',
        ],
    },
    /* Moon in Pisces is deliberately NOT here. It is authored at greater depth in
       astrologyPlacements.ts, with house, aspect and angularity overlays, as the
       worked example the composition architecture was proved against. Two units
       for one placement would collide at registration, and the richer one wins. */
];
export const LUMINARY_PLACEMENTS = [...sun, ...moon].map(placementUnit);
