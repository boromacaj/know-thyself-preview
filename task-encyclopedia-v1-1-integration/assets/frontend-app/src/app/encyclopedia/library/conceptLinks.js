const article = (id) => ({ kind: 'article', id });
const category = (library, id) => ({ kind: 'category', library, category: id });
/** Concept keys from ../concepts.ts (the info controls). */
const CONCEPT_TARGETS = {
    'life-path': article('numerology.position.life-path'),
    expression: article('numerology.position.expression'),
    'soul-urge': article('numerology.position.soul-urge'),
    'personality-number': article('numerology.position.personality'),
    pinnacle: article('numerology.position.pinnacles'),
    challenge: article('numerology.position.challenges'),
    'personal-year': article('numerology.position.personal-year'),
    'big-three': article('astrology.foundations.big-three'),
    ascendant: article('astrology.foundations.angles'),
    'chart-ruler': article('astrology.foundations.chart-ruler'),
    stellium: article('astrology.foundations.stellium-and-emphasis'),
    element: article('astrology.foundations.elements'),
    modality: article('astrology.foundations.modalities'),
    house: article('astrology.foundations.house-systems'),
    aspect: category('astrology', 'aspect'),
    'chinese-zodiac': article('bazi.foundations.bazi-and-the-chinese-zodiac'),
    'four-pillars': category('bazi', 'pillar'),
    'day-master': article('bazi.foundations.day-master'),
    'five-elements': category('bazi', 'element'),
    'heavenly-stem': category('bazi', 'stem'),
    'earthly-branch': category('bazi', 'branch'),
    'hidden-stem': article('bazi.foundations.hidden-stems'),
    'ten-gods': category('bazi', 'ten-god'),
    'luck-pillars': article('bazi.foundations.luck-pillars'),
    'tcm-correspondence': article('bazi.foundations.symbolic-correspondences'),
    'hd-type': category('human-design', 'type'),
    'hd-strategy': category('human-design', 'strategy'),
    'hd-authority': category('human-design', 'authority'),
    'hd-profile': category('human-design', 'profile'),
    'hd-definition': category('human-design', 'definition'),
    'hd-defined-centre': article('human-design.foundations.defined-and-open'),
    'hd-open-centre': article('human-design.foundations.defined-and-open'),
    'hd-channel': category('human-design', 'channel'),
    'hd-gate': category('human-design', 'gate'),
    'hd-variables': article('human-design.foundations.variables'),
    convergence: article('synthesis.guide.convergence'),
    'counter-evidence': article('synthesis.guide.counter-evidence'),
    'true-tension': article('synthesis.guide.tension'),
    'contextual-duality': article('synthesis.guide.contextual-duality'),
};
const HD_CENTRE_SLUGS = {
    head: 'head', ajna: 'ajna', throat: 'throat', g: 'g', ego: 'ego', solarPlexus: 'solar-plexus', sacral: 'sacral', spleen: 'spleen', root: 'root',
};
/** The article for an info control's concept key, including the generated `hd-center-<id>-<state>` keys. */
export function targetForConceptKey(key) {
    const direct = CONCEPT_TARGETS[key];
    if (direct)
        return direct;
    const centre = /^hd-center-([a-zA-Z]+)-(?:defined|open|uncertain)$/.exec(key);
    if (centre && HD_CENTRE_SLUGS[centre[1]])
        return article(`human-design.center.${HD_CENTRE_SLUGS[centre[1]]}`);
    return null;
}
const SIGNS = new Set(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']);
/** 'Sun' | 'Moon' | 'Ascendant' | 'Descendant' in a sign (engine display strings, any case) -> placement article. */
export function astrologyPlacementTarget(body, sign) {
    const position = body.trim().toLowerCase();
    const slug = sign.trim().toLowerCase();
    if (!SIGNS.has(slug))
        return null;
    if (position === 'sun' || position === 'moon' || position === 'ascendant' || position === 'descendant')
        return article(`astrology.${position}.${slug}`);
    return article(`astrology.sign.${slug}`);
}
const CORE_NUMBERS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]);
const NUMEROLOGY_POSITIONS = new Set(['life-path', 'expression', 'soul-urge', 'personality', 'birthday']);
/** A number in a Numerology position -> the number-in-position article (no reduction, no nearest match). */
export function numerologyTarget(position, value) {
    if (!NUMEROLOGY_POSITIONS.has(position) || !CORE_NUMBERS.has(value))
        return null;
    if (position === 'birthday' && value === 33)
        return null;
    return article(`numerology.${position}.${value}`);
}
const STEMS = new Set(['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui']);
const BRANCHES = {
    zi: 'zi-rat', chou: 'chou-ox', yin: 'yin-tiger', mao: 'mao-rabbit', chen: 'chen-dragon', si: 'si-snake',
    wu: 'wu-horse', wei: 'wei-goat', shen: 'shen-monkey', you: 'you-rooster', xu: 'xu-dog', hai: 'hai-pig',
};
const ANIMALS = {
    rat: 'zi-rat', ox: 'chou-ox', tiger: 'yin-tiger', rabbit: 'mao-rabbit', dragon: 'chen-dragon', snake: 'si-snake',
    horse: 'wu-horse', goat: 'wei-goat', sheep: 'wei-goat', monkey: 'shen-monkey', rooster: 'you-rooster', dog: 'xu-dog', pig: 'hai-pig',
};
const ELEMENTS = new Set(['wood', 'fire', 'earth', 'metal', 'water']);
/**
 * BaZi topic ids as the interactive knowledge sheet writes them (knowledge/bazi/interactive/registry.ts):
 * element:wood, daymaster:wu, branch:mao, animal:horse, polarity:yang, cycle:generating|controlling, concept:*.
 */
export function baziTopicTarget(topic) {
    const [kind, raw = ''] = topic.split(':');
    const value = raw.toLowerCase();
    switch (kind) {
        case 'element': return ELEMENTS.has(value) ? article(`bazi.element.${value}`) : null;
        case 'daymaster':
        case 'stem': return STEMS.has(value) ? article(`bazi.stem.${value}`) : null;
        case 'branch': return BRANCHES[value] ? article(`bazi.branch.${BRANCHES[value]}`) : null;
        case 'animal': return ANIMALS[value] ? article(`bazi.branch.${ANIMALS[value]}`) : null;
        case 'polarity': return article('bazi.foundations.yin-and-yang');
        case 'cycle': return value === 'generating' ? article('bazi.foundations.generating-cycle') : value === 'controlling' ? article('bazi.foundations.controlling-cycle') : null;
        case 'relation': return value.startsWith('generating') ? article('bazi.foundations.generating-cycle') : value.startsWith('controlling') ? article('bazi.foundations.controlling-cycle') : null;
        default: return null;
    }
}
/** Engine tarot card id ('major-fool', 'cups-ace') -> the card's article. */
export function tarotCardTarget(cardId) {
    const major = /^major-([a-z-]+)$/.exec(cardId);
    if (major)
        return article(`tarot.major.${major[1]}`);
    const minor = /^(wands|cups|swords|pentacles)-(ace|two|three|four|five|six|seven|eight|nine|ten|page|knight|queen|king)$/.exec(cardId);
    return minor ? article(`tarot.${minor[1]}.${minor[2]}`) : null;
}
const HD_TYPES = {
    'manifesting generator': 'manifesting-generator', generator: 'generator', manifestor: 'manifestor', projector: 'projector', reflector: 'reflector',
};
const HD_AUTHORITIES = {
    'emotional / solar plexus': 'emotional', sacral: 'sacral', splenic: 'splenic', 'ego manifested': 'ego-manifested', 'ego projected': 'ego-projected',
    'self-projected': 'self-projected', 'mental / environmental': 'mental-environmental', lunar: 'lunar',
};
/** Human Design engine display values -> articles. */
export function humanDesignTarget(kind, value) {
    const key = value.trim().toLowerCase();
    if (kind === 'type')
        return HD_TYPES[key] ? article(`human-design.type.${HD_TYPES[key]}`) : null;
    if (kind === 'authority')
        return HD_AUTHORITIES[key] ? article(`human-design.authority.${HD_AUTHORITIES[key]}`) : null;
    if (kind === 'profile')
        return /^[1-6]\/[1-6]$/.test(key) ? article(`human-design.profile.${key.replace('/', '-')}`) : null;
    if (kind === 'gate')
        return /^([1-9]|[1-5][0-9]|6[0-4])$/.test(key) ? article(`human-design.gate.${key}`) : null;
    const pair = /^(\d+)-(\d+)$/.exec(key);
    if (!pair)
        return null;
    const [a, b] = [Number(pair[1]), Number(pair[2])].sort((x, y) => x - y);
    return article(`human-design.channel.${a}-${b}`);
}
/** Attributes for a control that opens a target (consumed by the delegated listener in src/encyclopediaEntry.ts). */
export function targetAttributes(target) {
    return target.kind === 'article'
        ? `data-encyclopedia-article="${target.id}"${target.section ? ` data-encyclopedia-section="${target.section}"` : ''}`
        : `data-encyclopedia-open="${target.library}" data-encyclopedia-category="${target.category}"`;
}
/** The same, as a DOM element (for sheets built with createElement). */
export function encyclopediaLinkElement(target, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'kt-library-link';
    if (target.kind === 'article') {
        button.dataset.encyclopediaArticle = target.id;
        if (target.section)
            button.dataset.encyclopediaSection = target.section;
    }
    else {
        button.dataset.encyclopediaOpen = target.library;
        button.dataset.encyclopediaCategory = target.category;
    }
    const text = document.createElement('span');
    text.textContent = label;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    button.append(text, arrow);
    return button;
}
