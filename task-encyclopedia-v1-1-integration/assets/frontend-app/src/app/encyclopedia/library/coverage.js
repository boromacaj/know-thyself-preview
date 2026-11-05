export const SIGN_SLUGS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
export const PLANET_SLUGS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
export const POINT_SLUGS = ['north-node', 'south-node', 'chiron', 'ceres', 'pallas', 'juno', 'vesta'];
export const ASPECT_SLUGS = ['conjunction', 'sextile', 'square', 'trine', 'opposition', 'semisextile', 'semisquare', 'sesquiquadrate', 'quincunx'];
export const MOON_PHASE_SLUGS = ['new-moon', 'waxing-crescent', 'first-quarter', 'waxing-gibbous', 'full-moon', 'waning-gibbous', 'third-quarter', 'waning-crescent'];
export const CORE_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33'];
export const BIRTHDAY_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22'];
export const NUMEROLOGY_POSITIONS = ['life-path', 'expression', 'soul-urge', 'personality', 'birthday', 'maturity', 'attitude', 'balance', 'hidden-passion', 'karmic-lessons', 'karmic-debt', 'personal-year', 'personal-month', 'personal-day', 'pinnacles', 'challenges'];
export const HD_TYPES = ['manifestor', 'generator', 'manifesting-generator', 'projector', 'reflector'];
export const HD_STRATEGIES = ['inform-before-acting', 'respond', 'respond-then-inform', 'wait-for-invitation', 'wait-lunar-cycle'];
export const HD_AUTHORITIES = ['emotional', 'sacral', 'splenic', 'ego-manifested', 'ego-projected', 'self-projected', 'mental-environmental', 'lunar'];
export const HD_PROFILES = ['1-3', '1-4', '2-4', '2-5', '3-5', '3-6', '4-6', '4-1', '5-1', '5-2', '6-2', '6-3'];
export const HD_CENTERS = ['head', 'ajna', 'throat', 'g', 'ego', 'solar-plexus', 'sacral', 'spleen', 'root'];
export const HD_DEFINITIONS = ['no-definition', 'single', 'split', 'triple-split', 'quadruple-split'];
/** The 36 channels, `lower-higher` gate numbers, as the engine names them (data/hdChannels.ts). */
export const HD_CHANNELS = ['1-8', '2-14', '3-60', '4-63', '5-15', '6-59', '7-31', '9-52', '10-20', '10-34', '10-57', '11-56', '12-22', '13-33', '16-48', '17-62', '18-58', '19-49', '20-34', '20-57', '21-45', '23-43', '24-61', '25-51', '26-44', '27-50', '28-38', '29-46', '30-41', '32-54', '34-57', '35-36', '37-40', '39-55', '42-53', '47-64'];
export const BAZI_ELEMENTS = ['wood', 'fire', 'earth', 'metal', 'water'];
export const BAZI_STEMS = ['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui'];
/** Branch slugs carry the animal so the stem Wu 戊 and the branch Wu 午 cannot collide. */
export const BAZI_BRANCHES = ['zi-rat', 'chou-ox', 'yin-tiger', 'mao-rabbit', 'chen-dragon', 'si-snake', 'wu-horse', 'wei-goat', 'shen-monkey', 'you-rooster', 'xu-dog', 'hai-pig'];
export const BAZI_PILLARS = ['year', 'month', 'day', 'hour'];
export const BAZI_TEN_GODS = ['friend', 'rob-wealth', 'eating-god', 'hurting-officer', 'indirect-wealth', 'direct-wealth', 'seven-killings', 'direct-officer', 'indirect-resource', 'direct-resource'];
export const BAZI_RELATIONSHIPS = ['stem-combination', 'stem-clash', 'six-clash', 'six-harmony', 'three-harmony', 'six-harm', 'three-punishment', 'mutual-punishment', 'self-punishment'];
export const TAROT_MAJOR = ['fool', 'magician', 'high-priestess', 'empress', 'emperor', 'hierophant', 'lovers', 'chariot', 'strength', 'hermit', 'wheel-of-fortune', 'justice', 'hanged-man', 'death', 'temperance', 'devil', 'tower', 'star', 'moon', 'sun', 'judgement', 'world'];
export const TAROT_SUITS = ['wands', 'cups', 'swords', 'pentacles'];
export const TAROT_RANKS = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'page', 'knight', 'queen', 'king'];
const each = (prefix, slugs) => slugs.map((slug) => `${prefix}.${slug}`);
/** Expected article ids, by library and category. A category absent here has no fixed inventory (editorial only). */
export const EXPECTED = {
    astrology: {
        foundations: each('astrology.foundations', ['natal-chart', 'tropical-zodiac', 'elements', 'modalities', 'angles', 'house-systems', 'rulership-and-dignity', 'retrograde-motion', 'big-three', 'chart-ruler', 'stellium-and-emphasis', 'hemispheres']),
        sign: each('astrology.sign', SIGN_SLUGS),
        planet: each('astrology.planet', PLANET_SLUGS),
        point: each('astrology.point', POINT_SLUGS),
        house: each('astrology.house', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
        aspect: each('astrology.aspect', ASPECT_SLUGS),
        sun: each('astrology.sun', SIGN_SLUGS),
        moon: each('astrology.moon', SIGN_SLUGS),
        ascendant: each('astrology.ascendant', SIGN_SLUGS),
        descendant: each('astrology.descendant', SIGN_SLUGS),
        'moon-phase': each('astrology.moon-phase', MOON_PHASE_SLUGS),
    },
    numerology: {
        foundations: each('numerology.foundations', ['what-numerology-is', 'letter-values', 'reduction-and-master-numbers', 'reading-a-chart']),
        number: each('numerology.number', CORE_NUMBERS),
        position: each('numerology.position', NUMEROLOGY_POSITIONS),
        'life-path': each('numerology.life-path', CORE_NUMBERS),
        expression: each('numerology.expression', CORE_NUMBERS),
        'soul-urge': each('numerology.soul-urge', CORE_NUMBERS),
        personality: each('numerology.personality', CORE_NUMBERS),
        birthday: each('numerology.birthday', BIRTHDAY_NUMBERS),
        'personal-year': each('numerology.personal-year', ['1', '2', '3', '4', '5', '6', '7', '8', '9']),
        'karmic-debt': each('numerology.karmic-debt', ['13', '14', '16', '19']),
    },
    'human-design': {
        foundations: each('human-design.foundations', ['what-human-design-is', 'the-bodygraph', 'personality-and-design', 'defined-and-open', 'not-self-and-signature', 'incarnation-cross', 'variables']),
        type: each('human-design.type', HD_TYPES),
        strategy: each('human-design.strategy', HD_STRATEGIES),
        authority: each('human-design.authority', HD_AUTHORITIES),
        profile: each('human-design.profile', HD_PROFILES),
        line: each('human-design.line', ['1', '2', '3', '4', '5', '6']),
        center: each('human-design.center', HD_CENTERS),
        definition: each('human-design.definition', HD_DEFINITIONS),
        channel: each('human-design.channel', HD_CHANNELS),
        gate: each('human-design.gate', Array.from({ length: 64 }, (_, index) => String(index + 1))),
    },
    bazi: {
        foundations: each('bazi.foundations', ['what-bazi-is', 'the-solar-calendar', 'yin-and-yang', 'generating-cycle', 'controlling-cycle', 'day-master', 'day-master-strength', 'seasonal-states', 'hidden-stems', 'luck-pillars', 'bazi-and-the-chinese-zodiac', 'symbolic-correspondences']),
        element: each('bazi.element', BAZI_ELEMENTS),
        stem: each('bazi.stem', BAZI_STEMS),
        branch: each('bazi.branch', BAZI_BRANCHES),
        pillar: each('bazi.pillar', BAZI_PILLARS),
        'ten-god': each('bazi.ten-god', BAZI_TEN_GODS),
        relationship: each('bazi.relationship', BAZI_RELATIONSHIPS),
    },
    tarot: {
        foundations: each('tarot.foundations', ['what-tarot-is', 'structure-of-the-deck', 'reversals', 'positions-and-spreads', 'reading-cards-together', 'numbers-in-the-minor-arcana', 'court-cards']),
        suit: each('tarot.suit', TAROT_SUITS),
        major: each('tarot.major', TAROT_MAJOR),
        wands: each('tarot.wands', TAROT_RANKS),
        cups: each('tarot.cups', TAROT_RANKS),
        swords: each('tarot.swords', TAROT_RANKS),
        pentacles: each('tarot.pentacles', TAROT_RANKS),
        spread: each('tarot.spread', ['daily-three-card', 'one-card-reflection', 'past-present-future', 'situation-action-outcome', 'problem-cause-solution', 'self-other-relationship', 'option-a-b-guidance', 'body-mind-spirit', 'steadying-reflection', 'support-resistance-key', 'blind-spot-view', 'resources-view']),
    },
    synthesis: {
        pillar: each('synthesis.pillar', ['astrology', 'numerology', 'human-design', 'bazi', 'tarot']),
        guide: each('synthesis.guide', ['reference-and-reading', 'symbolic-frameworks', 'how-the-systems-differ', 'convergence', 'tension', 'contextual-duality', 'counter-evidence', 'reading-multiple-factors', 'birth-time-precision']),
    },
};
/** Every expected id, flat. */
export const expectedIds = () => Object.values(EXPECTED).flatMap((byCategory) => Object.values(byCategory).flat());
