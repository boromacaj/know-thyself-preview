import { SUPPORTED_LOCALES } from '../../i18n/locale.js?v=f9ab0a6';
import { foldText } from './questionText.js?v=f9ab0a6';
import { SYNTHESIS_STRATEGIES, } from './questionTypes.js?v=f9ab0a6';
/* Words that put a conclusion into a question. Folded; matched as whole words or word starts. */
const LOADED = [
    ' betray', ' cheat', ' lie ', ' lies ', ' lying ', ' lied ', ' liar', ' hiding ', ' hides ', ' secret', ' deceiv', ' manipulat',
    ' abandon', ' blame', ' fault ', ' guilty ', ' doomed ', ' punish', ' revenge', ' toxic ', ' narcissist', ' ghosted ',
    ' zrad', ' podvad', ' klam', ' luh', ' skryva', ' tajn', ' obvin', ' vina ', ' viny ', ' osud', ' prekliat', ' toxick', ' narcis',
];
const PREDICTIVE = [
    ' will ', ' won t ', ' going to ', ' shall ', ' definitely ', ' certainly ', ' inevitabl', ' destined ', ' fated ', ' guaranteed ',
    ' bude ', ' budu ', ' urcite ', ' nevyhnutn', ' osudom ', ' zaruc',
];
const PRESUPPOSING = [
    /^(?:why|when|who|how long)\s+(?:he|she|they|you|it|your|their|his|her)\b/i,
    /^what\s+(?:he|she|they|your\s+\w+)\s+(?:is|are|was|were)\s+(?:hiding|doing|thinking|planning|really)/i,
    /^(?:prečo|kedy|kto)\s+(?:ťa|ti|ťa|ho|ju|ich|tvoj|tvoja|jeho|jej|ich)\b/i,
];
const STOP = new Set([
    'the', 'a', 'an', 'of', 'to', 'in', 'on', 'it', 'is', 'and', 'or', 'for', 'this', 'that', 'what', 'how', 'as', 'at', 'by', 'with',
    'na', 'sa', 'si', 'je', 'to', 'v', 'z', 'zo', 'a', 'o', 'pre', 'ako', 'co', 'ktora', 'ktory', 'ktore', 'od', 'do', 'aj',
]);
const words = (value) => foldText(value).split(' ').filter((word) => word.length > 2 && !STOP.has(word));
function overlap(left, right) {
    const a = new Set(words(left));
    const b = new Set(words(right));
    if (a.size === 0 || b.size === 0)
        return 0;
    const shared = [...a].filter((word) => b.has(word)).length;
    return shared / Math.min(a.size, b.size);
}
/** Positions that may legitimately share a function: two options are two options. */
const MAY_REPEAT = new Set(['option']);
/** The text of a position in every language, so a defect hidden in one cannot pass. */
const textsOf = (position) => SUPPORTED_LOCALES.map((locale) => ({ locale, label: position.label[locale] ?? '', description: position.description[locale] ?? '' }));
export function validateSpread(spread) {
    const issues = [];
    const add = (code, detail, positionId) => {
        issues.push(positionId === undefined ? { code, detail } : { code, detail, positionId });
    };
    const { positions } = spread;
    /* count */
    if (positions.length < 1)
        add('card-count', 'a spread has at least one position');
    if (spread.minCards < 1 || spread.maxCards < spread.minCards)
        add('card-count', `minCards ${spread.minCards} and maxCards ${spread.maxCards} do not make a range`);
    if (positions.length < spread.minCards || positions.length > spread.maxCards) {
        add('card-count', `${positions.length} positions against a range of ${spread.minCards}-${spread.maxCards}`);
    }
    if (positions.length > 78)
        add('card-count', 'a spread cannot hold more cards than the deck');
    if (!SYNTHESIS_STRATEGIES.includes(spread.synthesisStrategy)) {
        add('unknown-strategy', `"${spread.synthesisStrategy}" is not a synthesis strategy`);
    }
    /* identity */
    const ids = new Set();
    const labels = new Map();
    for (const position of positions) {
        if (ids.has(position.id))
            add('duplicate-id', `the id "${position.id}" is used twice`, position.id);
        ids.add(position.id);
        for (const { locale, label, description } of textsOf(position)) {
            if (label.trim().length < 2 || description.trim().length === 0) {
                add('missing-text', `${position.id} has no ${locale} label or description`, position.id);
                continue;
            }
            const key = `${locale}:${foldText(label)}`;
            const seen = labels.get(key);
            if (seen !== undefined && seen !== position.id)
                add('duplicate-label', `"${label}" labels two positions in ${locale}`, position.id);
            labels.set(key, position.id);
        }
    }
    /* distinct */
    const seenFunctions = new Map();
    for (const position of positions) {
        const earlier = seenFunctions.get(position.fn);
        if (earlier !== undefined && !MAY_REPEAT.has(position.fn)) {
            add('duplicate-function', `${position.id} and ${earlier} ask the same kind of question (${position.fn})`, position.id);
        }
        seenFunctions.set(position.fn, position.id);
    }
    for (const locale of SUPPORTED_LOCALES) {
        for (let i = 0; i < positions.length; i += 1) {
            for (let j = i + 1; j < positions.length; j += 1) {
                const left = positions[i];
                const right = positions[j];
                if (left.fn === 'option' && right.fn === 'option')
                    continue;
                if (overlap(left.description[locale] ?? '', right.description[locale] ?? '') >= 0.6) {
                    add('overlapping-descriptions', `${left.id} and ${right.id} describe nearly the same thing in ${locale}`, right.id);
                }
            }
        }
    }
    /* neutral, not predictive, specific */
    for (const position of positions) {
        for (const { locale, label, description } of textsOf(position)) {
            const both = ` ${foldText(`${label}. ${description}`)} `;
            const loaded = LOADED.find((cue) => both.includes(cue));
            if (loaded)
                add('leading-assumption', `${position.id} (${locale}) presupposes with "${loaded.trim()}"`, position.id);
            const predictive = PREDICTIVE.find((cue) => both.includes(cue));
            if (predictive)
                add('predictive', `${position.id} (${locale}) states a future with "${predictive.trim()}"`, position.id);
            if (PRESUPPOSING.some((pattern) => pattern.test(label.trim()))) {
                add('presupposes-answer', `"${label}" (${locale}) assumes what it is asking`, position.id);
            }
            if (description.trim().split(/\s+/).length < 5 || label.length > 70) {
                add('too-vague', `${position.id} (${locale}) is too short to guide a reading, or too long to be a label`, position.id);
            }
        }
    }
    /* sequence and strategy */
    const fns = positions.map((position) => position.fn);
    if (positions.length >= 2 && new Set(fns).size < 2 && !fns.every((fn) => MAY_REPEAT.has(fn))) {
        add('bad-sequence', 'a spread of several positions needs more than one kind of place');
    }
    fns.forEach((fn, index) => {
        if (fn === 'direction' && index !== fns.length - 1)
            add('bad-sequence', 'a position that looks ahead comes last', positions[index].id);
        if (fn === 'origin' && index !== 0)
            add('bad-sequence', 'a position that looks back comes first', positions[index].id);
    });
    const shape = (expected) => expected.some((pattern) => pattern.length === fns.length && pattern.every((fn, index) => fns[index] === fn));
    if (spread.synthesisStrategy === 'single' && positions.length !== 1)
        add('strategy-shape', 'a single-card strategy has exactly one position');
    if (spread.synthesisStrategy === 'self-other-meeting' && !shape([['state', 'other', 'meeting']])) {
        add('strategy-shape', 'self, other and meeting, in that order');
    }
    if (spread.synthesisStrategy === 'options-criterion'
        && !shape([['option', 'option', 'criterion'], ['supporting', 'resisting', 'criterion']])) {
        add('strategy-shape', 'two paths (or a force for and a force against) and the factor the matter turns on, in that order');
    }
    if (spread.synthesisStrategy === 'layers' && !shape([['embodied', 'mental', 'meaning']])) {
        add('strategy-shape', 'three layers: practical, mental and meaning');
    }
    if (spread.synthesisStrategy === 'sequence' && positions.length < 2)
        add('strategy-shape', 'a sequence has at least two positions');
    return { ok: issues.length === 0, issues };
}
/** Throws when a spread fails; used where a definition is written in code and a failure is a defect. */
export function assertValidSpread(spread) {
    const result = validateSpread(spread);
    if (!result.ok) {
        throw new Error(`tarot spread "${spread.id}" is not valid: ${result.issues.map((issue) => `${issue.code} (${issue.detail})`).join('; ')}`);
    }
    return spread;
}
