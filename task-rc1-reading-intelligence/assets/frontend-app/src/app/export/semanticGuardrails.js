/**
 * Explicit protection against false cross-pillar matches caused by shared English
 * words that name structurally unrelated concepts in each system (export spec
 * section 24). Extend this list through the same review bar as the cross-pillar
 * candidate rules below — never infer a guardrail automatically from field names.
 */
export const SEMANTIC_GUARDRAILS = [
    {
        term: 'Authority',
        pillar: 'human-design',
        definition: 'The body-based decision-making center (e.g. Sacral, Emotional/Solar Plexus, Splenic) used to evaluate choices.',
        commonlyConfusedWith: ['Social authority', 'positional power', 'permission granted by another person'],
        equivalenceWarning: 'Human Design Authority is not social, legal, or organizational authority. Do not equate a person\'s Authority type with leadership rank or power over others.',
    },
    {
        term: 'Fire',
        pillar: 'western-astrology',
        definition: 'One of four zodiac elements (Aries, Leo, Sagittarius) describing a temperament category assigned by planetary sign.',
        commonlyConfusedWith: ['BaZi Fire (Wu Xing / Five Phase)', 'literal heat or flame'],
        equivalenceWarning: 'Western Fire and BaZi Fire come from two independent, structurally different elemental systems (4-element vs 5-phase) that happen to share an English name. A shared label is not evidence of a shared mechanism.',
    },
    {
        term: 'Fire',
        pillar: 'bazi-tcm',
        definition: 'One of five Wu Xing phases (Wood, Fire, Earth, Metal, Water) assigned to Heavenly Stems, Earthly Branches, and TCM organ correspondences.',
        commonlyConfusedWith: ['Western Astrology Fire element', 'literal heat or flame'],
        equivalenceWarning: 'See the Western Astrology Fire guardrail: the two systems are not equivalent despite the shared English word.',
    },
    {
        term: 'Wealth (Direct Wealth / Indirect Wealth)',
        pillar: 'bazi-tcm',
        definition: 'A Ten Gods structural category naming the phase the Day Master controls in the Five-Phase generation/control cycle.',
        commonlyConfusedWith: ['Guaranteed financial wealth', 'income level', 'investment outcome'],
        equivalenceWarning: 'A Wealth-category Ten God is a structural relationship label, not a prediction of actual financial outcome. Never present it as guaranteed or even likely material wealth.',
    },
    {
        term: 'Yin organ correspondence (e.g. Fire -> Heart)',
        pillar: 'bazi-tcm',
        definition: 'Traditional Chinese Medicine assigns each Five Phase a traditional Yin/Yang organ-system correspondence as a symbolic framework, not modern anatomy or physiology.',
        commonlyConfusedWith: ['The biomedical cardiovascular heart', 'a medical diagnosis or health status'],
        equivalenceWarning: 'TCM organ correspondence is traditional and symbolic. It is never a biomedical diagnosis and must never be used to infer actual health status.',
    },
    {
        term: 'Expression Number',
        pillar: 'numerology',
        definition: 'A Pythagorean digit-sum reduction of every letter in the birth full name.',
        commonlyConfusedWith: ['Verbal communication skill', 'public speaking ability'],
        equivalenceWarning: 'Expression Number is a name-letter calculation, not a measurement of how someone actually communicates or speaks.',
    },
    {
        term: 'Definition',
        pillar: 'human-design',
        definition: 'How many separate connected circuits the defined centers form (e.g. Single, Split, Triple Split).',
        commonlyConfusedWith: ['The ordinary dictionary meaning of "definition"', 'clarity of self-concept'],
        equivalenceWarning: 'Human Design Definition is a graph-connectivity structure over centers and channels, unrelated to the everyday meaning of the word "definition".',
    },
    {
        term: 'Profile',
        pillar: 'human-design',
        definition: 'The Personality-Sun-line / Design-Sun-line pairing (e.g. "5/1"), a role/archetype descriptor.',
        commonlyConfusedWith: ['A demographic or social-media profile', 'a psychological personality-test result'],
        equivalenceWarning: 'Human Design Profile is derived purely from two calculated Sun line positions, not from any questionnaire, demographic data, or psychological assessment.',
    },
    {
        term: 'Houses',
        pillar: 'western-astrology',
        definition: 'Twelve sectors of the sky (Whole Sign Houses here) representing life domains, anchored to the Ascendant.',
        commonlyConfusedWith: ['BaZi Four Pillars (Year/Month/Day/Hour)', 'a literal building or home'],
        equivalenceWarning: 'Astrological houses and BaZi pillars are both multi-part structures from independent systems; a shared count or shared English word is not evidence of a shared mechanism.',
    },
    {
        term: 'Emotion / emotional wave',
        pillar: 'human-design',
        definition: 'Human Design and BaZi TCM correspondence both reference "emotion" as part of their traditional symbolic frameworks (e.g. Solar Plexus authority; the Wood phase\'s traditional link to anger).',
        commonlyConfusedWith: ['Clinical psychology diagnoses', 'a mental health assessment'],
        equivalenceWarning: 'References to emotion in these symbolic systems are not clinical-psychology categories and must never be used to infer a mental health diagnosis or treatment need.',
    },
    {
        term: 'Metal',
        pillar: 'bazi-tcm',
        definition: 'One of five Wu Xing phases, traditionally associated with structure, boundaries, and the Lung/Large Intestine organ correspondence.',
        commonlyConfusedWith: ['A literal physical material', 'Western astrology\'s Air element'],
        equivalenceWarning: 'Five Phase Metal is a symbolic category, not a literal material, and has no direct Western-astrology equivalent (Western astrology has no five-way elemental split).',
    },
];
