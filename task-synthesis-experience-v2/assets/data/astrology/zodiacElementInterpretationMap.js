import { zodiacArchetypeCalculationRequirements, zodiacArchetypeMeaningModel, zodiacArchetypePrecisionNote, } from './zodiacArchetypePrecision.js?v=53c0693';
export const zodiacElements = ['fire', 'earth', 'air', 'water'];
export const zodiacElementSafeDisclaimer = 'This is symbolic, reflective language about element archetypes only. It does not calculate dominant element, element balance, temperament score, personality type, identity, diagnosis, compatibility, destiny, fate, career success, relationship success, intelligence, popularity, medical condition, psychological condition, or future outcomes, and it does not replace personal judgment or professional advice.';
export const zodiacElementFoundationPrecisionNote = `${zodiacArchetypePrecisionNote} ${zodiacArchetypeMeaningModel} This foundation does not infer element dominance from Sun Sign, Moon Sign, Ascendant, Descendant, planets, houses, aspects, Chiron, Lunar Nodes, numerology, questionnaire answers, behavior, personality, gender, polarity, birth date alone, date ranges, or user preference.`;
function zodiacElementMeaning(input) {
    return {
        ...input,
        safeDisclaimer: zodiacElementSafeDisclaimer,
        precisionNote: zodiacElementFoundationPrecisionNote,
        calculationRequirements: zodiacArchetypeCalculationRequirements,
    };
}
export const zodiacElementInterpretationMap = {
    fire: zodiacElementMeaning({
        element: 'fire',
        label: 'Fire',
        localLabel: 'Ohen',
        archetypeLabel: 'The Creative Spark',
        plainLanguageMeaning: 'Fire describes the symbolic temperament of initiative, vitality, inspiration, courage, action, enthusiasm, and direct life force.',
        symbolicFunction: 'Fire represents the part of experience that moves toward life with immediacy, creative spark, confidence, and the urge to begin.',
        strengthPattern: 'At its best, Fire brings warmth, motivation, creative risk, honest desire, and the ability to act before every detail is perfect.',
        imbalancePattern: 'As a reference archetype, Fire can become strained when urgency, impatience, intensity, or constant stimulation override steadiness and listening.',
        growthDirection: 'Growth comes from letting inspiration become responsible action, and letting courage include timing, care, and follow-through.',
        stressPatterns: ['impatience', 'burnout from constant push', 'reactivity', 'difficulty staying with slow processes'],
        realLifeExpression: 'In everyday life, Fire can be reflected in creative beginnings, enthusiasm, leadership as symbolic initiative, movement, play, and bold expression.',
        reflectionQuestions: ['What genuinely energizes action?', 'Where can inspiration become steady enough to last?'],
    }),
    earth: zodiacElementMeaning({
        element: 'earth',
        label: 'Earth',
        localLabel: 'Zem',
        archetypeLabel: 'The Living Ground',
        plainLanguageMeaning: 'Earth describes the symbolic temperament of stability, embodiment, practicality, resources, patience, structure, material reality, and sustainable rhythm.',
        symbolicFunction: 'Earth represents the part of experience that turns ideas and needs into form, habit, support, skill, and tangible care.',
        strengthPattern: 'At its best, Earth brings reliability, patience, discernment, bodily awareness, resourcefulness, and respect for what can be sustained.',
        imbalancePattern: 'As a reference archetype, Earth can become strained when security, routine, caution, or material concern become too narrow or resistant to needed change.',
        growthDirection: 'Growth comes from building stability that remains alive, responsive, and generous rather than merely controlled.',
        stressPatterns: ['over-attachment to comfort', 'resistance to change', 'scarcity focus', 'over-identifying with productivity'],
        realLifeExpression: 'In everyday life, Earth can be reflected in routines, money habits, food, work rhythm, craft, rest, maintenance, and care for physical reality.',
        reflectionQuestions: ['What kind of stability actually supports life?', 'Where can practical care become more flexible?'],
    }),
    air: zodiacElementMeaning({
        element: 'air',
        label: 'Air',
        localLabel: 'Vzduch',
        archetypeLabel: 'The Clear Exchange',
        plainLanguageMeaning: 'Air describes the symbolic temperament of thought, language, communication, perspective, ideas, social exchange, objectivity, and mental movement.',
        symbolicFunction: 'Air represents the part of experience that observes, names, compares, connects, and creates space through perspective.',
        strengthPattern: 'At its best, Air brings clarity, conversation, curiosity, social intelligence in a broad reflective sense, and the ability to see from more than one angle.',
        imbalancePattern: 'As a reference archetype, Air can become strained when thinking, talking, analyzing, or detaching replaces embodiment, feeling, or committed action.',
        growthDirection: 'Growth comes from letting insight become connected, grounded, and humane instead of staying purely conceptual.',
        stressPatterns: ['overthinking', 'scattered attention', 'emotional distance', 'talking around action'],
        realLifeExpression: 'In everyday life, Air can be reflected in conversation, writing, study, teaching, collaboration, debate, planning, and social exchange.',
        reflectionQuestions: ['What perspective creates more room?', 'Where does thought need embodiment or follow-through?'],
    }),
    water: zodiacElementMeaning({
        element: 'water',
        label: 'Water',
        localLabel: 'Voda',
        archetypeLabel: 'The Feeling Current',
        plainLanguageMeaning: 'Water describes the symbolic temperament of emotion, sensitivity, bonding, intuition as reflective symbolism, memory, empathy, inner life, and feeling atmosphere.',
        symbolicFunction: 'Water represents the part of experience that senses connection, remembers, attunes, softens, and understands through feeling.',
        strengthPattern: 'At its best, Water brings compassion, emotional intelligence in a reflective sense, tenderness, imagination, memory, and care for what is subtle.',
        imbalancePattern: 'As a reference archetype, Water can become strained when feeling overwhelms boundaries, when memory floods the present, or when empathy loses discernment.',
        growthDirection: 'Growth comes from allowing sensitivity to become grounded, bounded, and clear enough to support real connection.',
        stressPatterns: ['over-absorption', 'blurred boundaries', 'mood-driven choices', 'difficulty separating memory from the present'],
        realLifeExpression: 'In everyday life, Water can be reflected in emotional care, family bonds, art, memory, rest, solitude, music, and the atmosphere of relationships.',
        reflectionQuestions: ['What feeling needs kind attention?', 'Where does empathy need a clearer boundary?'],
    }),
};
