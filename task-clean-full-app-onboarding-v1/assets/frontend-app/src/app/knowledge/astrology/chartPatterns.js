import { sig } from '../semanticDimensions.js?v=f9ab0a6';
import { patternUnit } from './astrologyAuthoring.js?v=f9ab0a6';
/**
 * CHART-LEVEL PATTERNS.
 *
 * Everything that is a fact about the WHOLE chart rather than about one
 * placement: where the weight of the elements falls, what is missing, which
 * houses are crowded, what sits on an angle, and which planet the whole thing
 * reports to.
 *
 * These feed the pillar's synthesis section, and they are the only place in the
 * astrology library that says something no single placement says.
 *
 * TWO RULES.
 *
 * A tally is not a placement. "Earth-heavy" is an observation about the
 * distribution of ten bodies, and it is weaker evidence than any one of them,
 * because the Sun has already been counted once inside it. These carry
 * contextual-derivation provenance for exactly that reason.
 *
 * An absence is not a deficiency. A chart with no water does not describe
 * someone incapable of feeling; it describes someone for whom that register has
 * to be built deliberately rather than arriving as standard. Every scarcity
 * entry below says so, because the alternative is telling a reader they are
 * missing something.
 */
const patterns = [];
const add = (key, label, headline, core, signals) => {
    patterns.push({ key, label, headline, core, signals });
};
/* -------------------------------------------------- element dominance */
add('element-dominant-fire', 'Fire emphasis', 'A chart that moves first and works out the details in transit.', [
    'The weight of your chart falls in fire. Most of the calculated placements sit in Aries, Leo or Sagittarius, which describes a temperament that runs on motive energy: you act to find out rather than deciding and then acting, enthusiasm functions as a legitimate reason, and momentum is easier for you to generate than for almost anyone.',
    'What a fire-heavy chart is short of is the pause. Consequences tend to be discovered rather than anticipated, and there is often a trail of things begun with real conviction and left when the conviction moved. The useful discipline is not caution, which will not take, but finishing one thing before the next arrives.',
], [sig('assertive', 0.8), sig('risk-oriented', 0.7), sig('novelty-seeking', 0.6), sig('outwardly-engaged', 0.6)]);
add('element-dominant-earth', 'Earth emphasis', 'A chart that trusts what can be handled.', [
    'The weight of your chart falls in earth. Most of the calculated placements sit in Taurus, Virgo or Capricorn, and the result is a temperament organised around the material and the demonstrable: you measure by result, you have real patience with slow processes, and you tend to be reliable in a steady, practical way.',
    'The cost is a certain gravity. An earth-heavy chart resists the unproven, can mistake caution for judgement, and finds it genuinely difficult to act on something that cannot yet be shown to work. There is also a tendency to keep carrying weight simply because you are the one who can.',
], [sig('practical', 0.8), sig('structured', 0.7), sig('stability-seeking', 0.7), sig('persistent', 0.6)]);
add('element-dominant-air', 'Air emphasis', 'A chart that needs to name a thing before it can hold it.', [
    'The weight of your chart falls in air. Most of the calculated placements sit in Gemini, Libra or Aquarius, which produces a temperament that works through language, comparison and a certain useful distance - you can step back from your own experience while it is still happening, and you can understand your life from the outside as well as from within.',
    'The distance is also the difficulty. An air-heavy chart can give an articulate account of a feeling it has not actually had, and it can substitute discussing a decision for making one. What it is short of is the willingness to be in something without commentary.',
], [sig('communicative', 0.8), sig('conceptual', 0.7), sig('analytical', 0.6), sig('social', 0.5)]);
add('element-dominant-water', 'Water emphasis', 'A chart that takes the room in before it takes anything else in.', [
    'The weight of your chart falls in water. Most of the calculated placements sit in Cancer, Scorpio or Pisces, and what that describes is a temperament for which feeling is the primary information: you register what is going on beneath what is being said, you form deep attachments, and your read on people is usually right well before you could justify it.',
    'Permeability is the cost. A water-heavy chart absorbs more than it can process, has difficulty telling its own state from the state of the room, and needs considerably more recovery than it tends to allow itself. Objectivity here is a discipline rather than a default.',
], [sig('emotionally-sensitive', 0.8), sig('intuitive', 0.8), sig('introspective', 0.6), sig('private', 0.5)]);
/* -------------------------------------------------- element scarcity */
add('element-absent-fire', 'Little or no fire', 'Motivation that has to be generated rather than found running.', [
    'There is little or no fire among your calculated placements. This is not an absence of drive, but it does mean the spontaneous forward push that fire supplies is not simply there in the background. Enthusiasm arrives in response to something rather than of its own accord.',
    'The practical version is that you will do better with structures that supply momentum than with waiting to feel like it, because the feeling is not the reliable part. What you gain is that you are rarely swept along by your own excitement into something you had not thought about.',
], [sig('cautious', 0.5), sig('receptive', 0.4)]);
add('element-absent-earth', 'Little or no earth', 'Ideas that need a deliberate route into the physical world.', [
    'There is little or no earth among your calculated placements. The characteristic experience is of good thinking, real feeling or genuine vision that keeps failing to land as an actual object in the world - not from incapacity, but because the translation step that earth supplies has to be done on purpose here.',
    'It is worth arranging your life so that something external supplies the structure: a deadline, a collaborator, a process you did not design. The compensating strength is a freedom from the material caution that keeps earth-heavy charts in situations they outgrew.',
], [sig('adaptable', 0.5), sig('conceptual', 0.4)]);
add('element-absent-air', 'Little or no air', 'Knowing things that are difficult to put into words.', [
    'There is little or no air among your calculated placements. This does not mean you think less clearly; it means the step outside your own experience does not happen by itself, so objectivity has to be reached deliberately. It tends to show up as a gap between the accuracy of what you perceive and the ease of putting it into words: you know, and the explaining is laborious.',
    'What it protects you from is the air-heavy failure of talking about a life instead of living it. What it asks for is a deliberate habit - writing it down, saying it to someone - to get the perspective that air would supply on its own.',
], [sig('practical', 0.4), sig('introspective', 0.4)]);
add('element-absent-water', 'Little or no water', 'Emotion as a second language rather than a first.', [
    'There is little or no water among your calculated placements. This does not mean you feel less; it means the feeling arrives without a ready channel and often reaches you late, after the situation it belonged to has passed. Other people\'s emotional states can be genuinely puzzling rather than obvious.',
    'The corresponding strength is real: you stay functional in situations that flood other people, and your judgement is not distorted by the mood of the room. The work is accepting that emotional information is information, and building the habit of asking for it explicitly rather than waiting to absorb it.',
], [sig('emotionally-contained', 0.6), sig('analytical', 0.4)]);
/* ------------------------------------------------- modality dominance */
add('modality-dominant-cardinal', 'Cardinal emphasis', 'A chart built to start things.', [
    'Your placements concentrate in the cardinal signs, which are the ones that open each season. What that produces is initiative: you are the person who moves first, who calls the thing, who cannot sit in a stalled situation. Direction comes naturally and does not need to be supplied by anyone else.',
    'The corresponding shortage is completion. A cardinal-heavy chart accumulates beginnings, and the point at which something stops being new and becomes maintenance is where the energy characteristically leaves. Someone or something has to be responsible for finishing, and it is worth deciding in advance who.',
], [sig('assertive', 0.7), sig('independent', 0.6), sig('novelty-seeking', 0.5)]);
add('modality-dominant-fixed', 'Fixed emphasis', 'A chart that holds its position.', [
    'Your placements concentrate in the fixed signs, the ones at the height of each season. This is deep staying power: once you have committed, you continue, and ordinary discouragements barely register. Loyalty and endurance are the visible form of it.',
    'Changing course requires something close to a crisis. A fixed-heavy chart can defend an arrangement well past its usefulness and experience the defending as integrity, and the cost is usually counted in seasons rather than in weeks. It is worth building in an external review that you have agreed in advance to take seriously.',
], [sig('persistent', 0.8), sig('stability-seeking', 0.7), sig('structured', 0.5)]);
add('modality-dominant-mutable', 'Mutable emphasis', 'A chart that adapts to what is actually happening.', [
    'Your placements concentrate in the mutable signs, the ones that close each season. This gives real flexibility: you adjust to conditions rather than fighting them, you are useful in situations nobody planned for, and you can hold several possibilities open without needing them resolved.',
    'What it lacks is a fixed point. A mutable-heavy chart can bend so readily that no position of its own survives the process, and it is prone to a scattering of effort that feels like responsiveness and functions as drift. Deciding one thing that will not be renegotiated is the useful counterweight.',
], [sig('adaptable', 0.8), sig('novelty-seeking', 0.5), sig('receptive', 0.4)]);
/* ------------------------------------------------------- concentration */
add('stellium-sign', 'Stellium in one sign', 'One register the whole chart keeps returning to.', [
    'Three or more of your placements sit in a single sign, which makes that sign\'s style the centre of gravity for the entire chart. Several distinct functions - the way you think, what you want, how you act - all run in the same register, and the effect is concentration rather than variety: strong in that mode and correspondingly narrow.',
    'The difficulty is that a stellium is invisible from inside. Because so much of you runs on the same setting, it does not feel like a setting; it feels like reality. The sign opposite is where the corrective lives, and it tends to feel slightly foreign, which is the point rather than the objection.',
], [sig('persistent', 0.5), sig('independent', 0.4)]);
add('stellium-house', 'Stellium in one house', 'One area of life carrying more of the chart than its share.', [
    'Three or more of your placements fall in a single house, which loads one area of life with a disproportionate amount of the chart. That arena stops being one of twelve and becomes the place where a great deal of your attention goes - and where you are most equipped, most invested and most likely to overinvest.',
    'The house opposite tends to be correspondingly thin, and the imbalance is worth knowing about. A great deal of energy concentrated on one part of a life is what produces mastery in it, and also what produces the specific blindness of staying too long in one room.',
], [sig('persistent', 0.5), sig('structured', 0.4)]);
add('angular-emphasis', 'Angular emphasis', 'Placements on the angles, which the chart cannot keep quiet.', [
    'One or more of your placements sits close to an angle - the Ascendant, Midheaven, Descendant or Imum Coeli - and angularity is the strongest amplifier in a chart. An angular function becomes prominent in a life whether or not its owner wanted it prominent, and it tends to be the most visible part of you.',
    'This is worth reading as volume rather than as content. The angular planet does not mean something different from what it would elsewhere; it simply cannot be conducted privately. Plan for being more legible than you feel.',
], [sig('assertive', 0.5), sig('social', 0.4)]);
add('retrograde-emphasis', 'Retrograde emphasis', 'A chart that does more of its processing inward.', [
    'Several bodies were retrograde at your birth. Retrograde motion is apparent rather than real - the planet is not going backwards, it looks that way from here - and the agreed modern reading is internalisation: those functions are worked out privately, on their own schedule, before they become available outwardly.',
    'The practical version is a delay between arriving at something and being able to present it, which reads as slowness and is usually thoroughness. It is worth recording that the older tradition treated retrogradation as straightforward debility and that modern practice largely abandoned that; this reading follows the modern one and the disagreement is real.',
], [sig('introspective', 0.6), sig('private', 0.5), sig('analytical', 0.4)]);
add('hemisphere-eastern', 'Eastern emphasis', 'A chart weighted toward self-direction.', [
    'Most of your placements fall in the eastern half of the chart, the side associated with the self rather than the other. The conventional reading is that circumstances are shaped more than they are responded to: you tend to set your own terms, and you are less dependent on other people to get a life underway.',
    'Note the dependency: hemisphere emphasis requires houses, which requires an accurate birth time. Without one this reading is not available, and it is calculated on the Whole Sign system, which places some bodies differently from Placidus.',
], [sig('independent', 0.6), sig('assertive', 0.4)]);
add('hemisphere-western', 'Western emphasis', 'A chart weighted toward what arrives through others.', [
    'Most of your placements fall in the western half of the chart, the side associated with the other rather than the self. The conventional reading is responsiveness: a life shaped substantially through relationships, partnerships and circumstances that came to you rather than being engineered.',
    'This is often misread as passivity and is better read as timing - the ability to work with what arrives, which is a real skill and not a lesser one. As above, it needs houses and therefore a reliable birth time.',
], [sig('collaborative', 0.6), sig('receptive', 0.5)]);
/* ------------------------------------------------------------ ruler */
add('chart-ruler-emphasis', 'The chart ruler', 'The planet the whole chart reports to.', [
    'The planet ruling your rising sign is the chart ruler, and its condition colours everything else. Wherever it sits by sign, house and aspect describes the channel through which the chart as a whole tends to work itself out - which is why two people with the same Sun and Moon can live quite differently if their rulers are in different shape.',
    'Worth knowing: rulership of the seven classical planets is undisputed, but whether Uranus, Neptune or Pluto may rule a chart is a live split between traditional and modern practice. This reading uses the modern rulerships, and a traditional astrologer would assign a different ruler to three of the twelve rising signs.',
], [sig('independent', 0.4)]);
/* ---------------------------------------------------------- dignity */
add('dignity-domicile', 'A planet in the sign it rules', 'A function operating on its own ground.', [
    'One or more of your placements sits in the sign it rules. The traditional reading is that the function has sympathetic conditions to work in: it does what it does without having to translate itself first, and the expression tends to be clean rather than effortful.',
    'The catch is that ease is not the same as development. A planet in domicile is rarely the source of a person\'s growth, because nothing about it required any. Essential dignity is central to traditional practice and used lightly or not at all in much of modern psychological astrology, and this reading treats it as one voice rather than as settled fact.',
], [sig('persistent', 0.4)]);
add('dignity-fall', 'A planet in detriment or fall', 'A function working in an unsympathetic register.', [
    'One or more of your placements sits in the sign opposite the one it rules or is exalted in. The traditional reading is difficulty: the function has to do its job in conditions that do not suit it, and the result is either a persistent friction or a distinctive workaround that a comfortable placement would never have developed.',
    'It is worth resisting the older language of debility here. What this reliably describes is a function that had to be learned rather than inherited, and learned capacities are frequently more conscious and more transferable than inherited ones. As with domicile, modern practice weights this far more lightly than traditional practice does.',
], [sig('persistent', 0.5), sig('adaptable', 0.4)]);
export const ASTROLOGY_CHART_PATTERNS = patterns.map(patternUnit);
