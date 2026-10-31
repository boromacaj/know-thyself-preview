import { placementUnit } from '../astrologyAuthoring.js';
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
            'Your sense of who you are comes from acting. It lives in the moment of committing - the decision made before the room is ready, the thing begun while it is still being weighed - more than in what you have built or believe. An Aries Sun often does not know what it thinks until it has moved, and that feels like the only honest way to find out.',
            'The cost arrives later, not at the start. Beginnings are where this Sun is most itself, and the long, unglamorous middle of anything asks for a quality it has to build deliberately. Directness can also land harder than you intend: you say the thing, assume it was heard as information, and can be surprised when it is taken personally.',
        ],
    },
    {
        planet: 'sun', sign: 'taurus',
        headline: 'A life measured by what has actually been built.',
        core: [
            'Identity here is bound up with the tangible. What you have made, what you own and what holds are how a Taurus Sun knows its life is real. You move at your own pace, and that pace is the rate at which something can be done once, properly, so that it will not need doing again.',
            'The same steadiness makes changing course feel like a real loss. A Taurus Sun can hold on to an arrangement long after it stopped working, because the alternative is not built yet, and unbuilt things do not feel real. From the inside, this stubbornness is hard to tell apart from conviction.',
        ],
    },
    {
        planet: 'sun', sign: 'gemini',
        headline: 'A self assembled from everything it has found interesting.',
        core: [
            'A Gemini Sun is organised around contact. You become yourself by taking things in: conversations, ideas, other people\'s enthusiasms. The range is real, because what you are collecting is the connections between things. You also think out loud, so your ideas are often heard half-formed, and a hypothesis can be taken for a position.',
            'What this Sun struggles with is the question of what it is for. Purpose asks you to close down options, and closing them can feel less like commitment than like cutting something off. The risk is a bright, busy life with nothing in it deep enough to have cost anything, and a recurring sense that much has been sampled and little finished.',
        ],
    },
    {
        planet: 'sun', sign: 'cancer',
        headline: 'Purpose built around what you are protecting.',
        core: [
            'This Sun knows itself through belonging. That is different from sociability, and a Cancer Sun can be quite private. It means having people and a place that are yours, and organising a life around keeping both intact. Ambition here is real but rarely stated as ambition. It shows instead as a conviction that certain things must be looked after, and a willingness to work hard to see that they are.',
            'Your approach tends to be indirect, which is worth knowing, because people who move straight at things can read it as evasive. The protective instinct also outlasts the need for it. A Cancer Sun can go on managing the emotional weather for adults who would rather manage their own, and be hurt when the care is felt as control.',
        ],
    },
    {
        planet: 'sun', sign: 'leo',
        headline: 'A self that is not fully real until it is witnessed.',
        core: [
            'A Leo Sun is expressive at the level of identity, not only of personality. Whatever you are, you need it out in the world where someone can see it. This is less about applause than about the sense that an unexpressed life does not feel like a life. There is real generosity here, the kind that gives without keeping accounts, and a warmth that tends to draw people in.',
            'The exposure is the problem. Needing to be seen makes you easy to wound by not being seen. Overlooked for long enough, a Leo Sun tends to perform harder or to withdraw, and neither is what it wanted. The other cost is that the self you express can start editing itself for the room, until the performance is good and less and less related to what is underneath.',
        ],
    },
    {
        planet: 'sun', sign: 'virgo',
        headline: 'Identity through work that is actually useful.',
        core: [
            'A Virgo Sun locates itself in competence: usefulness more than status or scale, the satisfaction of a thing done properly by someone who noticed what needed doing. You are drawn to the discrepancy in a system, and you fix it, often without mentioning it. Those unmentioned fixes are, quietly, what a Virgo Sun believes its life consists of.',
            'What goes wrong is that the standard turns inward at full strength and with none of the tolerance. The eye that catches a flaw in a process catches it in yourself all the time. A Virgo Sun can keep doing excellent work while privately keeping score against a version of itself it has never reached. There is also a habit of taking responsibility for other people\'s work, which looks like service and costs more than it seems.',
        ],
    },
    {
        planet: 'sun', sign: 'libra',
        headline: 'A self that comes into focus opposite someone else.',
        core: [
            'A Libra Sun is calibrated by relationship. You know what you think by testing it against another position, and you know who you are partly through who you are with. An instinct for proportion helps you act fairly when a decision has two defensible sides. That is a real capability: holding two claims at once without quietly preferring one.',
            'The cost is a real difficulty in stating a preference. A Libra Sun can decide, but it is reluctant to decide in a way that makes someone lose, and the long delays that follow come from conscientiousness rather than weakness. Left unexamined, this becomes a life shaped mostly by accommodation, with a slow resentment toward the people who were simply asked what they wanted.',
        ],
    },
    {
        planet: 'sun', sign: 'scorpio',
        headline: 'A life that only counts the parts that went all the way in.',
        core: [
            'A Scorpio Sun has no setting for the moderate. Whatever you commit to, you commit to completely, and whatever you hold back, you hold back completely. That gives real staying power: you can stay with a difficult subject, person or project long after interest alone would have run out. It also gives a sharp, unasked-for sense of what may be going on beneath what people say.',
            'The privacy is strategy rather than shyness, and it costs something. A Scorpio Sun tends to know a lot about the people around it while being known by few of them. In time that imbalance can become lonely, and it is hard to complain about, since you built it. Intensity also has no low setting: things that do not warrant the full weight get it anyway.',
        ],
    },
    {
        planet: 'sun', sign: 'sagittarius',
        headline: 'Purpose that needs the horizon in it somewhere.',
        core: [
            'A Sagittarius Sun runs on meaning. You need what you are doing to connect to something larger than itself, and where it does not, the energy is simply absent. This gives you a feel for the long shot and the unfamiliar. It also gives a frankness, because a mind organised around the big picture does not naturally hold back the inconvenient observation.',
            'What suffers is the detail and the person in front of you. The same breadth that makes the frankness possible can make it land badly, and a Sagittarius Sun is often surprised to hear it came across as tactless when it meant to be honest. The restlessness is real too: this Sun will leave something good for something bigger, and does not always check afterwards whether bigger was better.',
        ],
    },
    {
        planet: 'sun', sign: 'capricorn',
        headline: 'A self built slowly, against resistance, on purpose.',
        core: [
            'A Capricorn Sun takes the long view, and takes it seriously. There is a seriousness here that does not need to be taught, and the organising conviction is that anything worth having is built rather than given. You work well with delayed reward, and you carry responsibility without much visible complaint.',
            'The difficulty is that this Sun measures itself by output and has no natural stopping point. Each achievement is followed by the next target rather than by satisfaction, and rest feels like slipping rather than recovering. There is also a reserve that can come across as coldness. Usually it is only a reluctance to say anything before it has been thought through and can be stood behind.',
        ],
    },
    {
        planet: 'sun', sign: 'aquarius',
        headline: 'Identity held at a slight, deliberate distance.',
        core: [
            'An Aquarius Sun stands a little outside whatever it is part of. That distance is a vantage point. You see the system rather than the single case, and you can hold a position on grounds you could explain to a stranger, even when everyone in the room disagrees. It makes for real independence of mind, and an unsentimental concern for how things ought to work for people in general.',
            'The general is the problem. A Sun this at ease with the collective can be awkward with the particular person in front of it, and principles held this firmly leave little room for the case that does not fit. There is also a contrarian reflex worth watching, where a position is adopted partly because nobody else holds it.',
        ],
    },
    {
        planet: 'sun', sign: 'pisces',
        headline: 'A self with unusually soft edges, and better vision for it.',
        core: [
            'A Pisces Sun does not experience itself as clearly bounded. Identity here is permeable, shaped by the room, the music and whoever you spent the afternoon with. That permeability is the source of both the imagination and the compassion, and both are how you actually take the world in. You often sense things you were never told.',
            'What is difficult is holding a shape. Direction needs an edge to push from, and this Sun has to build one deliberately. Without it, a Pisces Sun can spend a long time being very capable in service of someone else\'s plan. Escape is the failure mode, and it is rarely dramatic: the harder thing simply keeps being put off in favour of something softer.',
        ],
    },
];
const moon = [
    {
        planet: 'moon', sign: 'aries',
        headline: 'Feeling arrives fast, at full volume, and clears.',
        core: [
            'Your emotional processing runs at speed. Something happens, the reaction is immediate and complete, and it is out before any part of you has decided whether it should be. Then it is over. An Aries Moon does not brood; it discharges, which is healthier than it may look, though the people nearby may still be holding what you have already finished with.',
            'To feel safe, this Moon needs to be able to act. Being stuck is harder to bear than being hurt, and a situation you can do nothing about produces an agitation with nowhere to go. The cost is that the fast reaction often fires on incomplete information, and apologising afterwards can become a regular feature rather than an occasional one.',
        ],
    },
    {
        planet: 'moon', sign: 'taurus',
        headline: 'Comfort is not a luxury here; it is the regulating mechanism.',
        core: [
            'A Taurus Moon steadies itself through the tangible and the familiar. Food, warmth, a familiar chair, the same walk at the same time: these are how this Moon returns to baseline, and going without them costs more than it looks. Emotionally you are slow to be moved, and just as slow to be shaken.',
            'The steadiness has a hard edge. Once this Moon has settled on an arrangement, it does not want it disturbed, and it will put up with a surprising amount of unhappiness rather than face the upheaval of changing it. Feeling and comfort-seeking are also linked here: reaching for something to have or to hold can be the emotional response in another form.',
        ],
    },
    {
        planet: 'moon', sign: 'gemini',
        headline: 'Feelings become manageable once they have been put into words.',
        core: [
            'A Gemini Moon processes by talking. Usually it is not looking for advice: the talking is the processing, and having to sit silently with something unresolved is the distress this Moon knows best. You are curious about your own reactions, which gives you real insight and a useful distance, since anything you can describe you are no longer entirely inside.',
            'The distance is also the difficulty. Naming a feeling accurately can be a way of not having it, and a Gemini Moon can give an articulate account of an emotional life it has never fully felt. Restlessness under pressure is the other signature: when something is heavy, the impulse is to change the subject, the room or the plan.',
        ],
    },
    {
        planet: 'moon', sign: 'cancer',
        headline: 'The Moon at home, for better and for worse.',
        core: [
            'This is the Moon in the sign it rules, and the effect is amplification rather than ease. Emotional life here is deep, tidal and long-memoried. You feel things thoroughly, you remember how something felt long after you have forgotten what was said, and you tend to sense the mood of a room before there is any evidence for it. What makes you safe is belonging: a person, a place, a door that closes.',
            'The memory is the cost. A Cancer Moon holds on to injuries as faithfully as it holds on to everything else, and an old hurt can come back at full strength with very little provocation. The protective reflex includes withdrawal: when this Moon is hurt it goes inward rather than saying so, and the person involved may not know anything happened at all.',
        ],
    },
    {
        planet: 'moon', sign: 'leo',
        headline: 'Needing warmth, and needing it to be visible.',
        core: [
            'A Leo Moon needs to matter to somebody, specifically and visibly. Affection given quietly does not fully register; it has to be shown, because that is how this Moon knows it is secure. In return it gives generously and warmly, with a loyalty that does not do things by halves.',
            'The vulnerability is precise and easy to trigger. Being overlooked, not rejected but simply not noticed, lands harder on this Moon than it may look. The response tends to be either more effort or a wounded dignity that will not explain itself. It can also be hard to let someone else have the difficult feeling, because attention in the room is something this Moon is quietly tracking.',
        ],
    },
    {
        planet: 'moon', sign: 'virgo',
        headline: 'Emotional safety through order, usefulness and small repairs.',
        core: [
            'A Virgo Moon regulates itself by fixing something. When the inner state is unmanageable, a tidied drawer, a finished task or a small problem solved does real work: order restored outside restores it inside. Care is expressed the same way. This Moon says little about how it feels about you; it notices what you need and quietly handles it.',
            'What this Moon does badly is receive. Being looked after puts it in a position it has little practice in, and it tends to deflect into usefulness rather than accept the attention. The other difficulty is a running commentary on your own reactions. Judging whether a feeling is warranted is a poor question, and a reliable way to make the feeling last longer.',
        ],
    },
    {
        planet: 'moon', sign: 'libra',
        headline: 'Equilibrium restored by putting the relationship right.',
        core: [
            'A Libra Moon cannot settle while something between two people is unresolved. Discord is felt at once, and the impulse to repair it is immediate and mostly involuntary. That makes this Moon a skilled peacemaker and a slightly unreliable reporter of its own position. You are pleasant company more by nature than by effort.',
            'The cost is that harmony gets bought with your own preference, again and again, often without anyone noticing, you included. A Libra Moon can end up in arrangements that suit everybody adequately and nobody entirely. Your mood can also come to depend on the other person\'s: when they are unsettled, you cannot settle either, which hands them a control neither of you agreed to.',
        ],
    },
    {
        planet: 'moon', sign: 'scorpio',
        headline: 'Feeling that goes deep, stays private, and does not dilute.',
        core: [
            'A Scorpio Moon feels at a depth it rarely shows. What shows instead is containment, a great deal happening under a still surface. It also brings an accurate, almost unfair sense of what other people are concealing, since you know from the inside what concealment looks like.',
            'Trust here is close to all or nothing, and it is slow. Once given it is nearly total; once broken it is very hard to give again, and this Moon can keep its distance for a long time without saying why. Emotion this concentrated also has to go somewhere. Unexpressed, it tends to turn into suspicion, or into a tight grip on situations that would be fine left alone.',
        ],
    },
    {
        planet: 'moon', sign: 'sagittarius',
        headline: 'Feeling handled by moving, and by finding the larger frame.',
        core: [
            'A Sagittarius Moon needs room. Being fenced in, being asked for a promise or being stuck in a small situation with no exit produces distress here faster than an actual problem does. The reliable regulator is movement: a trip, a plan, a change of scene. There is real buoyancy in this placement too, an honest capacity to find the funny side of a bad week and mean it.',
            'The buoyancy can be a way out. This Moon is quick to turn something painful into a lesson, a story or a philosophy before it has been felt, and the turn is fast enough to look like resilience. The risk is a pattern of leaving at exactly the point where staying would mean sitting with something, and calling it an appetite for life.',
        ],
    },
    {
        planet: 'moon', sign: 'capricorn',
        headline: 'Emotion managed rather than expressed, and managed well.',
        core: [
            'A Capricorn Moon tends to treat feelings as something to be handled competently. That gives real steadiness under pressure and the ability to stay functional in a crisis. It also tends to bring a private conviction that needing things is a weakness to work around rather than a fact to meet. Safety comes from control, capability and knowing the situation is in hand.',
            'The bill comes due elsewhere. Emotion that is managed rather than felt does not disappear; it goes underground. A Capricorn Moon is prone to a low, grey flatness with no obvious cause, because the causes were all dealt with efficiently. Letting someone help is the hard move, and it stays hard. What helps is noticing that it is hard, rather than concluding it is unnecessary.',
        ],
    },
    {
        planet: 'moon', sign: 'aquarius',
        headline: 'Feeling observed from a short distance, usually accurately.',
        core: [
            'An Aquarius Moon puts a step between itself and its own reactions. You can describe what you feel while you are feeling it, which gives you composure under pressure and lets you help someone in distress without being pulled in. Emotional independence here is real: you do not need much, and you would rather not be needed too much either.',
            'The step can become a wall. This Moon can keep everyone at a distance where they cannot be inconvenient, and experience that as a preference rather than a pattern. Under real pressure it tends not to reach for someone but to become more detached, more theoretical and more reasonable, just when being reasonable is not what is needed.',
        ],
    },
    /* Moon in Pisces is deliberately NOT here. It is authored at greater depth in
       astrologyPlacements.ts, with house, aspect and angularity overlays, as the
       worked example the composition architecture was proved against. Two units
       for one placement would collide at registration, and the richer one wins. */
];
export const LUMINARY_PLACEMENTS = [...sun, ...moon].map(placementUnit);
