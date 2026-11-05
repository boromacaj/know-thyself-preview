const safetyDisclaimer = 'Name meanings are linguistic, cultural, etymological, and symbolic references only. They do not prove personality, destiny, fate, compatibility, health, clinical conclusions, life outcomes, or what a person must embody.';
function symbolicAssociation(theme, keywords, note) {
    return { theme, keywords, note };
}
function culturalNote(sourceType, note) {
    return { sourceType, note };
}
export const nameMeaningMap = {
    boris: {
        displayName: 'Boris',
        normalizedKey: 'boris',
        languageOrCulturalOrigin: ['Slavic', 'Bulgarian', 'Russian', 'Slovak', 'Czech'],
        meaningSummary: 'Boris is commonly associated with Slavic and Bulgarian-related roots. In many sources, it is often interpreted through meanings around battle, warrior-like strength, or glory, while the exact etymology varies by tradition.',
        possibleMeanings: ['battle', 'fight', 'warrior', 'glory', 'renown'],
        symbolicAssociations: [
            symbolicAssociation('resilience', ['steadiness', 'endurance', 'recovery'], 'May be connected to the capacity to remain steady around challenge when read through battle-related interpretations.'),
            symbolicAssociation('disciplined force', ['self-command', 'focus', 'contained strength'], 'Often associated with strength that is directed and contained rather than reckless.'),
            symbolicAssociation('protection', ['guardianship', 'courage', 'defense'], 'May symbolically suggest protective courage in some Slavic-name interpretation traditions.'),
        ],
        culturalNotes: [
            culturalNote('etymology', 'The origin is not treated as settled; battle, fight, warrior, and glory interpretations vary by source and linguistic tradition.'),
            culturalNote('cultural_usage', 'The name has long-standing usage across several Slavic-language contexts, including Bulgarian, Russian, Slovak, and Czech usage.'),
        ],
        pronunciationNotes: [
            'Pronunciation varies by language.',
            'In Slovak and Czech usage, both syllables are usually pronounced clearly.',
        ],
        safetyDisclaimer,
    },
    pavlina: {
        displayName: 'Pavlína',
        normalizedKey: 'pavlina',
        languageOrCulturalOrigin: ['Slovak', 'Czech', 'Slavic', 'Latin-derived'],
        meaningSummary: 'Pavlina is commonly associated with Slovak and Czech feminine usage related to Pavla, Paul, and Latin Paulus. It is often interpreted as small, humble, or modest, though wording varies by tradition.',
        possibleMeanings: ['small', 'humble', 'modest', 'related to Paul', 'related to Paulus'],
        symbolicAssociations: [
            symbolicAssociation('humility', ['modesty', 'simplicity', 'groundedness'], 'May be connected to the Paul/Paulus tradition of smallness or modesty as a reflective theme.'),
            symbolicAssociation('quiet steadiness', ['patience', 'care', 'gentle confidence'], 'Often associated with presence that does not need to rely on display or certainty.'),
        ],
        culturalNotes: [
            culturalNote('etymology', 'The Paul/Paulus connection is a common interpretation in many sources, but exact nuance varies by language and tradition.'),
            culturalNote('linguistic_tradition', 'Pavlina is used as a feminine given name in Czech and Slovak contexts.'),
        ],
        pronunciationNotes: [
            'Local pronunciation varies between Slovak and Czech usage.',
            'Diacritic and non-diacritic forms such as Pavlína/Pavlina may be normalized to pavlina for lookup.',
        ],
        safetyDisclaimer,
    },
    pavlinka: {
        displayName: 'Pavlínka',
        normalizedKey: 'pavlinka',
        languageOrCulturalOrigin: ['Slovak', 'Czech', 'Slavic'],
        meaningSummary: 'Pavlinka is commonly used as an affectionate diminutive of Pavlina or Pavla in Slovak and Czech contexts. It may carry tenderness, familiarity, and emotional closeness in usage, but it is not a separate destiny system.',
        possibleMeanings: ['little Pavlina', 'affectionate form of Pavlina', 'familiar form', 'related to small', 'related to humble'],
        symbolicAssociations: [
            symbolicAssociation('tenderness', ['softness', 'warmth', 'care'], 'May be connected to affectionate or familiar speech rather than a separate fixed meaning.'),
            symbolicAssociation('familiarity', ['closeness', 'recognition', 'belonging'], 'Often associated with relational closeness in Slovak/Czech diminutive usage.'),
            symbolicAssociation('emotional closeness', ['affection', 'trust', 'gentle presence'], 'May symbolically reflect the warmer tone that diminutive forms can carry in family or close social contexts.'),
        ],
        culturalNotes: [
            culturalNote('diminutive_usage', 'Pavlinka should be understood as an affectionate diminutive or familiar form of Pavlina/Pavla, not as a separate deterministic name system.'),
            culturalNote('cultural_usage', 'The familiar tone depends on Slovak/Czech language context and personal usage.'),
        ],
        pronunciationNotes: [
            'Pronunciation follows local Slovak/Czech patterns.',
            'Family or regional usage may affect the tone and pronunciation.',
        ],
        safetyDisclaimer,
    },
};
export const nameMeaningMapMeta = {
    mapId: 'nameMeaningMap',
    version: '0.1.0',
    source: 'personal_name_meaning_foundation_map',
    supportedKeys: Object.keys(nameMeaningMap),
    scope: 'raw lookup-ready name meaning metadata only; not numerology, AI prose, synthesis, personality typing, destiny, fate, or clinical assessment',
};
