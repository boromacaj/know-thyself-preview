import { REFERENCE_CAUTION_TEXT } from './referenceTypes.js?v=2ea79e9';
const METRIC_LABELS = {
    'life-path': 'Life Path',
    expression: 'Expression',
    'soul-urge': 'Soul Urge',
    personality: 'Personality',
    'birthday-number': 'Birthday Number',
    'balance-number': 'Balance Number',
    'maturity-number': 'Maturity Number',
};
/** What this number means in this specific position, independent of which digit it is. */
const METRIC_CONTEXT = {
    'life-path': 'As a Life Path number, it points to the broad direction and recurring lessons of a lifetime.',
    expression: 'As an Expression number, it points to natural talent and how ability tends to show up outwardly.',
    'soul-urge': 'As a Soul Urge, it points to an inner motivation — what feels quietly satisfying rather than what is shown outwardly.',
    personality: 'As a Personality number, it points to the first impression others tend to notice.',
    'birthday-number': 'As a Birthday Number, it adds a smaller, situational talent alongside the Life Path.',
    'balance-number': 'As a Balance Number, it describes a steadying response style used under pressure.',
    'maturity-number': 'As a Maturity Number, it points to a synthesis of the Life Path and Expression that tends to become more evident from mid-life onward.',
};
/** Standard, widely-used numerology archetypes for digits 1-9 and master number 11. */
const NUMBER_CORE = {
    1: {
        overview: 'The number of initiation: independence, leadership, and starting something new from a blank page.',
        strengths: 'Decisive, self-reliant, and comfortable moving first.',
        shadow: 'Can tip into stubbornness or difficulty accepting help.',
        integration: 'Channel independence into leading collaboratively rather than alone.',
    },
    2: {
        overview: 'The number of partnership: sensitivity, diplomacy, and cooperation.',
        strengths: 'Attuned to others, patient, and a natural mediator.',
        shadow: 'Can over-accommodate or avoid necessary conflict.',
        integration: 'Practice voicing a clear preference before deferring to others.',
    },
    3: {
        overview: 'The number of expression: creativity, communication, and social ease.',
        strengths: 'Articulate, imaginative, and quick to lift a room’s energy.',
        shadow: 'Can scatter energy across too many ideas at once.',
        integration: 'Pair creative bursts with a simple system for finishing what is started.',
    },
    4: {
        overview: 'The number of foundation: discipline, structure, and steady effort.',
        strengths: 'Reliable, methodical, and good at building things that last.',
        shadow: 'Can become rigid or overly cautious about change.',
        integration: 'Build small, planned breaks from routine into the schedule on purpose.',
    },
    5: {
        overview: 'The number of change: freedom, variety, and adaptability.',
        strengths: 'Curious, versatile, and energized by new experience.',
        shadow: 'Can struggle with follow-through or commitment.',
        integration: 'Anchor variety with one or two steady commitments.',
    },
    6: {
        overview: 'The number of responsibility: care, harmony, and service to others.',
        strengths: 'Nurturing, dependable, and a natural caretaker of people and spaces.',
        shadow: 'Can overextend by taking on others’ burdens.',
        integration: 'Set a clear boundary before offering help.',
    },
    7: {
        overview: 'The number of introspection: analysis, depth, and an inner search for understanding.',
        strengths: 'Reflective, perceptive, and drawn to genuine understanding over surface appearance.',
        shadow: 'Can withdraw into isolation or overanalysis.',
        integration: 'Balance solitary reflection with regular, low-stakes connection.',
    },
    8: {
        overview: 'The number of power: ambition, material achievement, and organizational capability.',
        strengths: 'Strategic, capable, and comfortable with responsibility and scale.',
        shadow: 'Can equate self-worth too tightly with results or status.',
        integration: 'Measure success by more than one metric, on purpose.',
    },
    9: {
        overview: 'The number of completion: compassion, idealism, and release.',
        strengths: 'Generous, broad-minded, and able to let go when a cycle ends.',
        shadow: 'Can struggle with unresolved endings or self-sacrifice.',
        integration: 'Practice closing chapters deliberately rather than drifting from them.',
    },
    11: {
        overview: 'A master number layered over 2: heightened intuition, sensitivity, and inspirational insight.',
        strengths: 'Perceptive, idealistic, and able to sense what others miss.',
        shadow: 'Can carry higher nervous tension or self-doubt under the added intensity.',
        integration: 'Ground intuitive insight in one small, concrete action rather than only inspiration.',
    },
    22: {
        overview: 'A master number layered over 4: the drive to turn a large vision into practical, lasting structure.',
        strengths: 'Practical, far-sighted, and capable of building at a larger scale than most.',
        shadow: 'Can feel weighed down by the gap between the scale of the vision and present resources.',
        integration: 'Break the large vision into one buildable step at a time.',
    },
    33: {
        overview: 'A master number layered over 6: heightened responsibility expressed as compassionate teaching and care for a wider circle.',
        strengths: 'Selfless, encouraging, and able to uplift others through steady guidance.',
        shadow: 'Can neglect personal needs while carrying others’ wellbeing.',
        integration: 'Extend the same care given to others back to oneself, on purpose.',
    },
};
export function numerologyReferenceTopic(metric, value) {
    return `numerology:${metric}:${value}`;
}
const TOPIC_PATTERN = /^numerology:([a-z-]+):(\d+)$/;
export function findNumerologyReference(topic) {
    const match = TOPIC_PATTERN.exec(topic);
    if (!match)
        return null;
    const metric = match[1];
    const value = Number(match[2]);
    if (!(metric in METRIC_LABELS))
        return null;
    const core = NUMBER_CORE[value];
    if (!core)
        return null;
    return {
        topic,
        title: `${METRIC_LABELS[metric]} ${value}`,
        system: 'Numerology',
        overview: `${METRIC_CONTEXT[metric]} ${core.overview}`,
        strengths: core.strengths,
        shadow: core.shadow,
        integration: core.integration,
        caution: REFERENCE_CAUTION_TEXT,
    };
}
