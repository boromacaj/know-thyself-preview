import { zodiacArchetypeCalculationRequirements, zodiacArchetypeMeaningModel, zodiacArchetypePrecisionNote, } from './zodiacArchetypePrecision.js?v=f9ab0a6';
export const zodiacModalities = ['cardinal', 'fixed', 'mutable'];
export const zodiacModalitySafeDisclaimer = 'This is symbolic, reflective language about modality archetypes only. It does not calculate dominant modality, modality balance, temperament score, personality type, identity, diagnosis, compatibility, destiny, fate, career success, relationship success, intelligence, popularity, medical condition, psychological condition, or future outcomes, and it does not replace personal judgment or professional advice.';
export const zodiacModalityFoundationPrecisionNote = `${zodiacArchetypePrecisionNote} ${zodiacArchetypeMeaningModel} This foundation does not infer modality dominance from Sun Sign, Moon Sign, Ascendant, Descendant, planets, houses, aspects, Chiron, Lunar Nodes, numerology, questionnaire answers, behavior, personality, gender, polarity, birth date alone, date ranges, or user preference.`;
function zodiacModalityMeaning(input) {
    return {
        ...input,
        safeDisclaimer: zodiacModalitySafeDisclaimer,
        precisionNote: zodiacModalityFoundationPrecisionNote,
        calculationRequirements: zodiacArchetypeCalculationRequirements,
    };
}
export const zodiacModalityInterpretationMap = {
    cardinal: zodiacModalityMeaning({
        modality: 'cardinal',
        label: 'Cardinal',
        localLabel: 'Kardinalna',
        archetypeLabel: 'The Initiating Motion',
        plainLanguageMeaning: 'Cardinal modality describes the symbolic movement style of initiation, beginning, direction, momentum, active response, and leadership as movement rather than status.',
        movementStyle: 'Cardinal movement starts things, responds to openings, sets direction, and turns pressure into first steps.',
        strengthPattern: 'At its best, Cardinal energy brings initiative, clarity of direction, courage to begin, and the ability to respond when life asks for movement.',
        imbalancePattern: 'As a reference archetype, Cardinal movement can become strained when beginning replaces completing, urgency overrides listening, or direction becomes pressure.',
        growthDirection: 'Growth comes from pairing initiative with patience, follow-through, and enough receptivity to choose the right beginning.',
        stressPatterns: ['rushing beginnings', 'impatience with process', 'starting more than can be held', 'mistaking motion for direction'],
        realLifeExpression: 'In everyday life, Cardinal modality can be reflected in launching projects, initiating conversations, setting plans, responding actively, and opening new chapters.',
        reflectionQuestions: ['What wants a clear beginning?', 'Where does momentum need steadiness or consent?'],
    }),
    fixed: zodiacModalityMeaning({
        modality: 'fixed',
        label: 'Fixed',
        localLabel: 'Fixna',
        archetypeLabel: 'The Sustaining Center',
        plainLanguageMeaning: 'Fixed modality describes the symbolic movement style of stability, endurance, sustaining, concentration, loyalty, preservation, and resistance to change as reflection only.',
        movementStyle: 'Fixed movement holds, deepens, concentrates, protects continuity, and gives energy enough persistence to become real.',
        strengthPattern: 'At its best, Fixed energy brings loyalty, focus, stamina, devotion, consistency, and the ability to preserve what has lasting value.',
        imbalancePattern: 'As a reference archetype, Fixed movement can become strained when preservation becomes rigidity, loyalty becomes over-attachment, or concentration resists needed change.',
        growthDirection: 'Growth comes from letting stability remain responsive, and from knowing when endurance is support and when it has become stuckness.',
        stressPatterns: ['resistance to change', 'over-attachment', 'stubborn focus', 'difficulty releasing what has expired'],
        realLifeExpression: 'In everyday life, Fixed modality can be reflected in commitment, long projects, routines, loyalty, craft, maintenance, and the protection of meaningful values.',
        reflectionQuestions: ['What is worth sustaining?', 'Where can loyalty stay alive by allowing change?'],
    }),
    mutable: zodiacModalityMeaning({
        modality: 'mutable',
        label: 'Mutable',
        localLabel: 'Premenliva',
        archetypeLabel: 'The Adaptive Bridge',
        plainLanguageMeaning: 'Mutable modality describes the symbolic movement style of adaptation, transition, flexibility, translation, integration, changeability, and responsiveness.',
        movementStyle: 'Mutable movement adjusts, translates between states, learns from change, and helps one phase of experience become another.',
        strengthPattern: 'At its best, Mutable energy brings flexibility, learning, integration, humility, responsiveness, and the ability to work with complexity.',
        imbalancePattern: 'As a reference archetype, Mutable movement can become strained when adaptation turns into scattering, over-adjusting, indecision, or loss of center.',
        growthDirection: 'Growth comes from letting flexibility serve coherence, and from choosing what remains true while conditions keep changing.',
        stressPatterns: ['scattered focus', 'over-adaptation', 'difficulty choosing', 'absorbing too many possibilities'],
        realLifeExpression: 'In everyday life, Mutable modality can be reflected in transitions, editing, learning, mediation, travel, translation, seasonal change, and responsive problem-solving.',
        reflectionQuestions: ['What is changing and what remains true?', 'Where can flexibility become clearer rather than more scattered?'],
    }),
};
