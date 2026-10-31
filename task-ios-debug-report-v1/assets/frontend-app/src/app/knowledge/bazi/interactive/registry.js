import { BAZI_ELEMENTS, EARTHLY_BRANCHES, HEAVENLY_STEMS, SOLAR_MONTH_BOUNDARIES } from '../../../bazi/data/baziConstants.js?v=b5ef5ed';
import { calculateSeasonalContext } from '../../../bazi/fivePhaseBalance.js?v=b5ef5ed';
import { ANIMAL_ENTRIES } from './animals.js?v=b5ef5ed';
import { BRANCH_ENTRIES } from './branches.js?v=b5ef5ed';
import { DAY_MASTER_ENTRIES } from './dayMasters.js?v=b5ef5ed';
import { ELEMENT_ENTRIES } from './elements.js?v=b5ef5ed';
import { RELATION_ENTRIES } from './relations.js?v=b5ef5ed';
/*
 * THE BAZI KNOWLEDGE REGISTRY
 * ---------------------------
 * One place that knows every topic a symbol on the BaZi charts can open: 12 animals, 5 elements, 2 polarities, 10 Day Masters, 12 month branches,
 * the two cycles and their ten relationships, and the concepts that explain the charts' own numbers. It is the only module the sheet reads.
 *
 *   - ids are `kind:key` and are built by the functions below from the ENGINE'S OWN names (the stem and branch tables), never typed by a caller
 *   - facts (characters, elements, polarities, hours, solar terms, the five standings of a month) are GENERATED from the engine's constant tables
 *   - prose is the only thing written by hand, and validateRegistry() proves that every id resolves, that the families are complete and that no two
 *     topics share a paragraph
 */
/* ------------------------------------------------------------------ ids */
export const animalTopicId = (animal) => `animal:${animal.toLowerCase()}`;
export const elementTopicId = (element) => `element:${element.toLowerCase()}`;
export const polarityTopicId = (polarity) => `polarity:${polarity.toLowerCase()}`;
export const dayMasterTopicId = (stem) => `daymaster:${stem.toLowerCase()}`;
export const branchTopicId = (branch) => `branch:${branch.toLowerCase()}`;
export const cycleTopicId = (cycle) => `cycle:${cycle}`;
export const relationTopicId = (cycle, from, to) => `relation:${cycle}:${from.toLowerCase()}-${to.toLowerCase()}`;
/* ------------------------------------------------------------ libraries */
const ANIMAL_ORDER = EARTHLY_BRANCHES.map((branch) => branch.animal);
const GENERATING = [['Wood', 'Fire'], ['Fire', 'Earth'], ['Earth', 'Metal'], ['Metal', 'Water'], ['Water', 'Wood']];
const CONTROLLING = [['Wood', 'Earth'], ['Earth', 'Water'], ['Water', 'Fire'], ['Fire', 'Metal'], ['Metal', 'Wood']];
export const LIBRARIES = Object.freeze({
    'library:animals': {
        id: 'library:animals', title: 'The twelve animals', subtitle: 'The zodiac, in the order of the Earthly Branches',
        lead: 'Each animal is one of the twelve Earthly Branches. Exploring another animal does not change anything about your own chart: it is a way of learning the symbols.',
        members: ANIMAL_ORDER.map(animalTopicId),
    },
    'library:daymasters': {
        id: 'library:daymasters', title: 'The ten Day Masters', subtitle: 'The ten Heavenly Stems, two for each element',
        lead: 'A Day Master is one of ten Heavenly Stems: a Yang and a Yin form of each element. Browsing the others does not change your chart; your own is marked.',
        members: HEAVENLY_STEMS.map((stem) => dayMasterTopicId(stem.name)),
    },
    'library:elements': {
        id: 'library:elements', title: 'The five elements', subtitle: 'Wu Xing, in the order of the generating cycle',
        lead: 'The five phases, each with a Yang and a Yin form in the stems. Open one to see what it stands for and where it sits among the others.',
        members: BAZI_ELEMENTS.map(elementTopicId),
    },
    'library:branches': {
        id: 'library:branches', title: 'The twelve months', subtitle: 'The Earthly Branches as months of the solar year',
        lead: 'These are the twelve petals of the seasonal wheel. They are months of the solar-term calendar, not Gregorian months, and only one of them is your own month of birth.',
        members: EARTHLY_BRANCHES.map((branch) => branchTopicId(branch.name)),
    },
    'library:cycles': {
        id: 'library:cycles', title: 'The two cycles', subtitle: 'How the five phases feed and regulate one another',
        lead: 'The generating cycle describes nourishment and the controlling cycle describes regulation. Open a cycle for the whole picture or a single relationship for one step.',
        members: [
            cycleTopicId('generating'), ...GENERATING.map(([from, to]) => relationTopicId('generating', from, to)),
            cycleTopicId('controlling'), ...CONTROLLING.map(([from, to]) => relationTopicId('controlling', from, to)),
        ],
    },
});
/* -------------------------------------------------------------- entries */
const ALL_ENTRIES = [...ANIMAL_ENTRIES, ...ELEMENT_ENTRIES, ...DAY_MASTER_ENTRIES, ...BRANCH_ENTRIES, ...RELATION_ENTRIES];
export const KNOWLEDGE = new Map(ALL_ENTRIES.map((item) => [item.id, item]));
export function knowledgeEntry(id) { return KNOWLEDGE.get(id) ?? null; }
export function knowledgeLibrary(id) { return LIBRARIES[id] ?? null; }
export function isKnownTopic(id) { return KNOWLEDGE.has(id) || id in LIBRARIES; }
export function allTopicIds() { return [...KNOWLEDGE.keys(), ...Object.keys(LIBRARIES)]; }
/* ---------------------------------------------------------------- tones */
export function toneFor(id) {
    const [kind, key = ''] = id.split(':');
    if (kind === 'animal')
        return EARTHLY_BRANCHES.find((branch) => branch.animal.toLowerCase() === key)?.element ?? 'pearl';
    if (kind === 'branch')
        return EARTHLY_BRANCHES.find((branch) => branch.name.toLowerCase() === key)?.element ?? 'pearl';
    if (kind === 'daymaster')
        return HEAVENLY_STEMS.find((stem) => stem.name.toLowerCase() === key)?.element ?? 'pearl';
    if (kind === 'element')
        return BAZI_ELEMENTS.find((element) => element.toLowerCase() === key) ?? 'pearl';
    if (kind === 'polarity')
        return key === 'yang' ? 'gold' : 'pearl';
    if (kind === 'cycle')
        return key === 'generating' ? 'gold' : 'coral';
    if (kind === 'relation')
        return key === 'generating' ? 'gold' : 'coral';
    return 'pearl';
}
/* ---------------------------------------------------------------- facts */
const hours = (branchIndex) => {
    const start = (23 + 2 * branchIndex) % 24;
    const end = (start + 2) % 24;
    const pad = (hour) => `${String(hour).padStart(2, '0')}:00`;
    return `${pad(start)} to ${pad(end)}`;
};
const ordinal = (n) => `${n}${n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th'}`;
const GEN_NEXT = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const CTRL_NEXT = { Wood: 'Earth', Earth: 'Water', Water: 'Fire', Fire: 'Metal', Metal: 'Wood' };
const termOf = (branchIndex) => SOLAR_MONTH_BOUNDARIES.find((boundary) => boundary.branchIndex === branchIndex);
/** The facts of a topic, read from the engine's tables. They are the same for every reader. */
export function factsFor(id) {
    const [kind, key = ''] = id.split(':');
    if (kind === 'animal') {
        const branch = EARTHLY_BRANCHES.find((candidate) => candidate.animal.toLowerCase() === key);
        if (!branch)
            return [];
        return [
            { label: 'Earthly Branch', value: `${branch.name} ${branch.character}` },
            { label: 'Branch element', value: `${branch.polarity} ${branch.element}` },
            { label: 'Place in the zodiac', value: `${ordinal(branch.index + 1)} of 12` },
            { label: 'Traditional hours', value: hours(branch.index) },
            { label: 'Its month begins at', value: `${termOf(branch.index).name} ${termOf(branch.index).character} (the Sun at ${termOf(branch.index).longitude}°)` },
        ];
    }
    if (kind === 'branch') {
        const branch = EARTHLY_BRANCHES.find((candidate) => candidate.name.toLowerCase() === key);
        if (!branch)
            return [];
        const term = termOf(branch.index);
        const standing = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'].map((element) => `${element} ${calculateSeasonalContext(branch.index, branch.name, element).dayMasterState}`);
        return [
            { label: 'Earthly Branch', value: `${branch.name} ${branch.character}, the ${branch.animal}` },
            { label: 'Element and polarity', value: `${branch.polarity} ${branch.element}` },
            { label: 'The month begins at', value: `${term.name} ${term.character} (the Sun at ${term.longitude}°)` },
            { label: 'Traditional hours', value: hours(branch.index) },
            { label: 'Day Masters in this month', value: standing.join(' · ') },
        ];
    }
    if (kind === 'daymaster') {
        const stem = HEAVENLY_STEMS.find((candidate) => candidate.name.toLowerCase() === key);
        if (!stem)
            return [];
        return [
            { label: 'Heavenly Stem', value: `${stem.name} ${stem.character}` },
            { label: 'Element and polarity', value: `${stem.polarity} ${stem.element}` },
            { label: 'Place among the stems', value: `${ordinal(stem.index + 1)} of 10` },
        ];
    }
    if (kind === 'element') {
        const element = BAZI_ELEMENTS.find((candidate) => candidate.toLowerCase() === key);
        if (!element)
            return [];
        const stems = HEAVENLY_STEMS.filter((stem) => stem.element === element).map((stem) => `${stem.name} ${stem.character} (${stem.polarity})`).join(', ');
        const branches = EARTHLY_BRANCHES.filter((branch) => branch.element === element).map((branch) => `${branch.name} ${branch.character}`).join(', ');
        const generatedBy = BAZI_ELEMENTS.find((other) => GEN_NEXT[other] === element);
        const controlledBy = BAZI_ELEMENTS.find((other) => CTRL_NEXT[other] === element);
        return [
            { label: 'Heavenly Stems', value: stems },
            { label: 'Earthly Branches', value: branches },
            { label: 'Feeds', value: GEN_NEXT[element] },
            { label: 'Fed by', value: generatedBy },
            { label: 'Regulates', value: CTRL_NEXT[element] },
            { label: 'Regulated by', value: controlledBy },
        ];
    }
    if (kind === 'polarity') {
        const polarity = key === 'yang' ? 'Yang' : key === 'yin' ? 'Yin' : null;
        if (!polarity)
            return [];
        return [
            { label: 'Heavenly Stems', value: HEAVENLY_STEMS.filter((stem) => stem.polarity === polarity).map((stem) => `${stem.name} ${stem.character}`).join(', ') },
            { label: 'Earthly Branches', value: EARTHLY_BRANCHES.filter((branch) => branch.polarity === polarity).map((branch) => `${branch.name} ${branch.character}`).join(', ') },
        ];
    }
    return [];
}
/** The meaning of the five standings (the engine's own state names), for the seasonal explanations. */
export const STATE_MEANING = Object.freeze({
    prosperous: { hanzi: '旺', meaning: 'the Day Master\'s element is the one that rules the season, so it has the whole season behind it' },
    aided: { hanzi: '相', meaning: 'the Day Master\'s element is the one that the ruling element feeds, so it receives support from the season' },
    resting: { hanzi: '休', meaning: 'the Day Master\'s element is the one that fed the ruling element and has now stepped back: it is not drained, but it is not in command' },
    trapped: { hanzi: '囚', meaning: 'the Day Master\'s element is the one that controls the ruling element but cannot prevail in its season' },
    dead: { hanzi: '死', meaning: 'the Day Master\'s element is the one that the ruling element controls, so it has the least room in the season' },
});
/* --------------------------------------------------------- validation */
/** Everything that must hold for the registry to be complete and consistent. An empty list is a sound registry. */
export function validateRegistry() {
    const problems = [];
    const seen = new Set();
    for (const item of ALL_ENTRIES) {
        if (seen.has(item.id))
            problems.push(`duplicate id ${item.id}`);
        seen.add(item.id);
        if (!item.lead.trim() || item.sections.length === 0)
            problems.push(`${item.id}: empty`);
        for (const related of item.related)
            if (!isKnownTopic(related))
                problems.push(`${item.id}: unknown related topic ${related}`);
    }
    for (const library of Object.values(LIBRARIES))
        for (const member of library.members)
            if (!isKnownTopic(member))
                problems.push(`${library.id}: unknown member ${member}`);
    /* the families the charts can open must be complete */
    for (const branch of EARTHLY_BRANCHES) {
        if (!KNOWLEDGE.has(animalTopicId(branch.animal)))
            problems.push(`missing animal ${branch.animal}`);
        if (!KNOWLEDGE.has(branchTopicId(branch.name)))
            problems.push(`missing branch ${branch.name}`);
    }
    for (const stem of HEAVENLY_STEMS)
        if (!KNOWLEDGE.has(dayMasterTopicId(stem.name)))
            problems.push(`missing Day Master ${stem.name}`);
    for (const element of BAZI_ELEMENTS)
        if (!KNOWLEDGE.has(elementTopicId(element)))
            problems.push(`missing element ${element}`);
    for (const polarity of ['Yin', 'Yang'])
        if (!KNOWLEDGE.has(polarityTopicId(polarity)))
            problems.push(`missing polarity ${polarity}`);
    for (const cycle of ['generating', 'controlling'])
        if (!KNOWLEDGE.has(cycleTopicId(cycle)))
            problems.push(`missing cycle ${cycle}`);
    for (const [from, to] of GENERATING)
        if (!KNOWLEDGE.has(relationTopicId('generating', from, to)))
            problems.push(`missing relation generating ${from}-${to}`);
    for (const [from, to] of CONTROLLING)
        if (!KNOWLEDGE.has(relationTopicId('controlling', from, to)))
            problems.push(`missing relation controlling ${from}-${to}`);
    for (const concept of ['year-animal', 'day-master', 'five-phases', 'element-counts', 'seasonal-support', 'month-branch', 'birth-month'])
        if (!KNOWLEDGE.has(`concept:${concept}`))
            problems.push(`missing concept ${concept}`);
    /* nothing may be said twice: no paragraph appears under two different topics, except a deliberate boundary note shared inside one family */
    const owner = new Map();
    for (const item of ALL_ENTRIES) {
        for (const paragraph of [item.lead, ...item.sections.flatMap((section) => section.paragraphs)]) {
            const other = owner.get(paragraph);
            if (other && other !== item.id)
                problems.push(`${item.id} repeats a paragraph of ${other}: ${paragraph.slice(0, 60)}`);
            owner.set(paragraph, item.id);
        }
    }
    return problems;
}
/* ------------------------------------------------- glyphs and list rows */
/** The animal's own Chinese character (the sign, not the branch's). A copy of the hero's table, which a test holds equal. */
export const ANIMAL_CHARACTER = Object.freeze({
    Rat: '鼠', Ox: '牛', Tiger: '虎', Rabbit: '兔', Dragon: '龍', Snake: '蛇',
    Horse: '馬', Goat: '羊', Monkey: '猴', Rooster: '雞', Dog: '狗', Pig: '豬',
});
const ELEMENT_CHARACTER = Object.freeze({ Wood: '木', Fire: '火', Earth: '土', Metal: '金', Water: '水' });
/** The Chinese character that stands beside a topic's title, or null (a cycle, a concept, a library). */
export function glyphFor(id) {
    const [kind, key = ''] = id.split(':');
    if (kind === 'animal') {
        const branch = EARTHLY_BRANCHES.find((candidate) => candidate.animal.toLowerCase() === key);
        return branch ? ANIMAL_CHARACTER[branch.animal] : null;
    }
    if (kind === 'branch')
        return EARTHLY_BRANCHES.find((candidate) => candidate.name.toLowerCase() === key)?.character ?? null;
    if (kind === 'daymaster')
        return HEAVENLY_STEMS.find((candidate) => candidate.name.toLowerCase() === key)?.character ?? null;
    if (kind === 'element') {
        const element = BAZI_ELEMENTS.find((candidate) => candidate.toLowerCase() === key);
        return element ? ELEMENT_CHARACTER[element] : null;
    }
    if (kind === 'polarity')
        return key === 'yang' ? '陽' : key === 'yin' ? '陰' : null;
    return null;
}
const KIND_LABEL = Object.freeze({
    animal: 'Zodiac animal', element: 'Element', polarity: 'Polarity', daymaster: 'Day Master', branch: 'Month · Earthly Branch',
    cycle: 'Cycle', relation: 'Relationship', concept: 'Concept', library: 'Library',
});
export function kindLabel(id) { return KIND_LABEL[id.split(':')[0]] ?? 'Explanation'; }
/** A row of a library: the name, the character and one short detail line, from the engine's tables. */
export function libraryItem(id) {
    const [kind, key = ''] = id.split(':');
    const found = knowledgeEntry(id);
    const name = found?.title ?? id;
    if (kind === 'animal') {
        const branch = EARTHLY_BRANCHES.find((candidate) => candidate.animal.toLowerCase() === key);
        return { name, glyph: glyphFor(id), detail: branch ? `${branch.name} · ${branch.polarity} ${branch.element}` : '' };
    }
    if (kind === 'daymaster') {
        const stem = HEAVENLY_STEMS.find((candidate) => candidate.name.toLowerCase() === key);
        return { name, glyph: glyphFor(id), detail: stem ? `${stem.polarity} ${stem.element}` : '' };
    }
    if (kind === 'branch') {
        const branch = EARTHLY_BRANCHES.find((candidate) => candidate.name.toLowerCase() === key);
        return { name, glyph: glyphFor(id), detail: branch ? `${branch.animal} · ${branch.element}` : '' };
    }
    if (kind === 'element')
        return { name, glyph: glyphFor(id), detail: found?.subtitle.replace(/^Wu Xing phase \w+: /, '') ?? '' };
    return { name, glyph: null, detail: found?.subtitle ?? '' };
}
