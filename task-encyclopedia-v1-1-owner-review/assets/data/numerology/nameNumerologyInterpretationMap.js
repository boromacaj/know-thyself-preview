const safeDisclaimer = 'This interpretation is symbolic and reflective. It does not diagnose personality, predict outcomes, prove destiny, or replace personal judgment, care, therapy, medical advice, legal advice, or financial advice.';
export const supportedNameNumerologyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const supportedNameNumerologySignalTypes = [
    'expression',
    'soulUrge',
    'personality',
];
const numberThemes = {
    1: {
        label: 'initiative',
        keywords: ['self-direction', 'originality', 'courage', 'direct action'],
        symbolicFocus: 'agency, first steps, and the willingness to act from a clear center',
        integration: 'let strength become useful presence rather than pressure or isolation',
    },
    2: {
        label: 'attunement',
        keywords: ['sensitivity', 'cooperation', 'tact', 'trust'],
        symbolicFocus: 'relational awareness, listening, and the ability to move with subtle timing',
        integration: 'let harmony include truth, boundaries, and visible self-respect',
    },
    3: {
        label: 'expression',
        keywords: ['creativity', 'communication', 'play', 'emotional color'],
        symbolicFocus: 'creative voice, language, imagination, and feelings finding shareable form',
        integration: 'let brightness carry substance, focus, and honest follow-through',
    },
    4: {
        label: 'structure',
        keywords: ['reliability', 'order', 'craft', 'practical skill'],
        symbolicFocus: 'stable foundations, grounded effort, and ideas becoming usable form',
        integration: 'let structure support life without becoming rigid or punitive',
    },
    5: {
        label: 'movement',
        keywords: ['freedom', 'change', 'curiosity', 'adaptability'],
        symbolicFocus: 'variety, direct experience, flexible learning, and responsive movement',
        integration: 'let freedom become conscious choice rather than scattered escape',
    },
    6: {
        label: 'care',
        keywords: ['support', 'repair', 'beauty', 'responsibility'],
        symbolicFocus: 'care, emotional repair, harmony, and tending what matters',
        integration: 'let care include reciprocity, boundaries, and self-respect',
    },
    7: {
        label: 'depth',
        keywords: ['inquiry', 'discernment', 'solitude', 'inner clarity'],
        symbolicFocus: 'reflection, study, pattern recognition, and honest understanding',
        integration: 'let insight return to body, relationship, and lived action',
    },
    8: {
        label: 'agency',
        keywords: ['competence', 'stewardship', 'strategy', 'responsible influence'],
        symbolicFocus: 'responsible power, material clarity, resource awareness, and capable action',
        integration: 'let influence become stewardship rather than control or self-measurement',
    },
    9: {
        label: 'integration',
        keywords: ['compassion', 'meaning', 'release', 'wider perspective'],
        symbolicFocus: 'compassion, completion, symbolic breadth, and experience becoming wisdom',
        integration: 'let compassion stay grounded, specific, and bounded',
    },
};
const signalModels = {
    expression: {
        label: 'Expression / Destiny Number',
        context: 'talents, outward capability, expressive style, and how name-based potential may seek form',
        perspective: 'describes a symbolic style of capability and expression that may be easier to develop, offer, or practice outwardly',
        practicalFrame: 'Look for one skill, contribution, or communication pattern where this theme can become more intentional.',
    },
    soulUrge: {
        label: 'Soul Urge Number',
        context: 'inner motivation, private desire, emotional preference, and what may feel quietly nourishing',
        perspective: 'describes a symbolic inner pull that may shape what feels meaningful, enlivening, or emotionally resonant',
        practicalFrame: 'Notice where this private motivation is asking for a simple, honest form of acknowledgment.',
    },
    personality: {
        label: 'Personality Number',
        context: 'outer presentation, first impression, visible tone, and how the name may meet the world',
        perspective: 'describes a symbolic presentation style others may notice first, without proving what is happening internally',
        practicalFrame: 'Use the visible style consciously, and pair it with enough clarity that it does not become a mask.',
    },
};
function buildEntry(signalType, number) {
    const signal = signalModels[signalType];
    const theme = numberThemes[number];
    return {
        signalType,
        number,
        shortMeaning: `${signal.label} ${number}: ${theme.label} through ${theme.keywords.slice(0, 3).join(', ')}`,
        expandedMeaning: `As a ${signal.label} signal, ${number} ${signal.perspective}. In this map, it points toward ${theme.symbolicFocus}. This is not a fixed identity claim, prediction, or outcome guarantee; it is a reflective name-numerology reference for considering how ${theme.label} may show up through this specific name layer.`,
        contextualFocus: signal.context,
        practicalReading: `${signal.practicalFrame} For ${number}, the useful integration is to ${theme.integration}.`,
        safeDisclaimer,
    };
}
function buildSignalMap(signalType) {
    return Object.fromEntries(supportedNameNumerologyNumbers.map((number) => [number, buildEntry(signalType, number)]));
}
export const nameNumerologyInterpretationMap = {
    system: 'numerology',
    mapId: 'nameNumerologyInterpretationMap',
    version: '0.1.0',
    sourceFramework: {
        primary: 'Pythagorean name numerology',
        mode: 'original structured KNOW THYSELF symbolic interpretation layer',
        scope: 'birth-name numerology signals only; not an etymology or name-origin database',
    },
    supportedNumbers: supportedNameNumerologyNumbers,
    supportedSignalTypes: supportedNameNumerologySignalTypes,
    numberThemes,
    signalOverlays: {
        expression: buildSignalMap('expression'),
        soulUrge: buildSignalMap('soulUrge'),
        personality: buildSignalMap('personality'),
    },
};
