import { poleShort, themeVoice } from './themeVoice.js';
/*
 * THE BASIS OF A PARAGRAPH: WHICH TRADITIONS SAY IT, AND WHICH DO NOT.
 *
 * ENGLISH ONLY. Every paragraph of the reading is voiced from themes and splits the model found, and the model knows, for each of them, what every tradition said:
 * supports it, opposes it, both, nothing. Until now the reader met none of that: the visible text never said which traditions agree, which differ and which are alone, and the one
 * disclosure that listed tradition names listed all four for nearly every section. This turns what the model already holds (`stances`, a split's two sides) into one plain line
 * under the paragraph it belongs to. It writes no claim of its own: every name in it is a tradition whose stance is in the model, and every theme named is a theme the paragraph voices.
 *
 * It is a pure function of the model and the paragraph's `voiceOf`, so the plan (which themes, in which order) does not move: only a sentence is added under what was already said.
 *
 * ONE RULE, STATED ONCE. Where a tradition stands on a theme is read from the model's own `ThemePillarStance` (what it adds for the theme, what it adds for the theme's opposite pole):
 *   - it is HEARD when the larger of the two is at least a tenth of the theme's whole support (a tradition that adds a sliver is not named either way);
 *   - it BACKS the theme when its support is at least 1.5 times its counter-weight, OPPOSES it when its counter-weight is at least 1.5 times its support, and is SPLIT when neither
 *     is (a tradition whose support and counter-weight are within a third of each other, Astrology 1.35 against 1.67 on "reaching for the principle", neither agrees nor pulls the other way).
 * The same 1.5 is the one `tensionBasis` uses for the two sides of a split, so the two kinds of line read the same numbers the same way. `tests/crossPillarBasisReproducible.test.mjs`
 * recomputes every line from the stances for twenty-four synthetic profiles.
 */
const PILLAR_ORDER = ['numerology', 'astrology', 'bazi', 'human-design'];
const NAME = { numerology: 'Numerology', astrology: 'Astrology', bazi: 'BaZi', 'human-design': 'Human Design' };
const ordered = (pillars) => {
    const set = new Set(pillars);
    return PILLAR_ORDER.filter((pillar) => set.has(pillar));
};
const plainName = (pillar) => NAME[pillar];
function listOf(pillars, name = plainName) {
    const names = pillars.map((pillar) => name(pillar));
    if (names.length <= 1)
        return names[0] ?? '';
    return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}
/** A tradition is heard on a theme when it carries at least a tenth of the theme's support, one way or the other. */
export const SHARE = 0.1;
/** One side must outweigh the other by half again for a tradition to be said to back or to oppose; the same factor `tensionBasis` uses for a split. */
export const LEAN_RATIO = 1.5;
/** Where one tradition stands on one theme, by the rule above. */
export function stanceClass(theme, stance) {
    const support = stance.supportWeight;
    const counter = stance.counterWeight;
    if (Math.max(support, counter) < SHARE * theme.supportWeight || Math.max(support, counter) <= 0)
        return 'unheard';
    if (support >= LEAN_RATIO * counter)
        return 'backs';
    if (counter >= LEAN_RATIO * support)
        return 'opposes';
    return 'split';
}
const classified = (theme, wanted) => ordered(theme.stances.filter((stance) => stanceClass(theme, stance) === wanted).map((stance) => stance.pillar));
export const backers = (theme) => classified(theme, 'backs');
export const opposers = (theme) => classified(theme, 'opposes');
export const splitters = (theme) => classified(theme, 'split');
const tagOf = (theme) => themeVoice(theme.id)?.tag.en ?? '';
const defaultRef = (theme) => tagOf(theme);
/**
 * One or two short sentences for a paragraph that voices these themes. The first says which traditions back the paragraph's leading pattern, in the words the paragraph used for it (named, so the
 * line belongs to this reading and not to every reading); the second says the one thing worth knowing about where the paragraph is contested (a tradition pulls the other way) or thin (a
 * pattern that rests on one or two traditions). Empty where the model has nothing a reader could use. With `agreement` false (the area notes and the close, which come back to patterns
 * already met) only the contested line is written: who agrees was said where the pattern was first met.
 */
export function themeBasis(themes, agreement = true, context = { name: plainName, ref: defaultRef }) {
    if (themes.length === 0)
        return '';
    const lead = themes[0];
    const leadRef = context.ref(lead);
    const leadBackers = backers(lead);
    const lines = [];
    if (agreement && leadRef.length > 0) {
        if (leadBackers.length === 4)
            lines.push(`On ${leadRef}: backed by all four traditions.`);
        else if (leadBackers.length >= 2)
            lines.push(`On ${leadRef}: ${listOf(leadBackers, context.name)} agree.`);
        else if (leadBackers.length === 1)
            lines.push(`On ${leadRef}: only ${context.name(leadBackers[0])} clearly speaks for it.`);
    }
    const contested = themes.map((theme) => ({ theme, who: opposers(theme), ratio: theme.supportWeight > 0 ? theme.counterWeight / theme.supportWeight : 0 }))
        .filter((entry) => entry.who.length > 0 && context.ref(entry.theme).length > 0).sort((x, y) => y.ratio - x.ratio)[0];
    if (contested) {
        lines.push(`${listOf(contested.who, context.name)} ${contested.who.length > 1 ? 'pull' : 'pulls'} the other way on ${context.ref(contested.theme)}.`);
    }
    else if (agreement && themes.length > 1) {
        const thin = themes.slice(1).map((theme) => ({ theme, set: backers(theme) })).filter((entry) => entry.set.length >= 1 && entry.set.length <= 2 && entry.set.length < leadBackers.length && context.ref(entry.theme).length > 0)
            .sort((x, y) => x.set.length - y.set.length)[0];
        if (thin)
            lines.push(`On ${context.ref(thin.theme)}: it rests on ${listOf(thin.set, context.name)}${thin.set.length === 1 ? ' alone' : ''}.`);
    }
    return lines.join(' ');
}
/** The two sides of a split, as the weight each tradition puts on each; a tradition leans to a side when that side is half as heavy again as the other. */
export function splitLeans(tension) {
    const weight = (side, pillar) => side.evidence.filter((entry) => entry.evidence.pillar === pillar).reduce((sum, entry) => sum + entry.countedWeight, 0);
    const toA = [];
    const toB = [];
    const both = [];
    for (const pillar of PILLAR_ORDER) {
        const wa = weight(tension.poleA, pillar);
        const wb = weight(tension.poleB, pillar);
        if (wa === 0 && wb === 0)
            continue;
        if (wa > LEAN_RATIO * wb)
            toA.push(pillar);
        else if (wb > LEAN_RATIO * wa)
            toB.push(pillar);
        else
            both.push(pillar);
    }
    return { toA, toB, both };
}
/** One line for a split: which traditions lean to which side (by the weight each puts on it), and which show both. It follows the sentence that says the split, so it begins "On that split". */
export function tensionBasis(tension, context = { name: plainName, ref: defaultRef }) {
    const a = poleShort(tension.poleA.dimension);
    const b = poleShort(tension.poleB.dimension);
    if (!a || !b)
        return '';
    const { toA, toB, both } = splitLeans(tension);
    if (toA.length === 0 && toB.length === 0)
        return both.length > 0 ? `On that split, every tradition that speaks to it shows both sides.` : '';
    const leans = [
        toA.length > 0 ? `${listOf(toA, context.name)} lean${toA.length > 1 ? '' : 's'} toward ${a}` : '',
        toB.length > 0 ? `${listOf(toB, context.name)} ${toA.length > 0 ? '' : `lean${toB.length > 1 ? '' : 's'} `}toward ${b}` : '',
    ].filter((part) => part.length > 0).join(', ');
    return `On that split, ${leans}${both.length > 0 ? `; ${listOf(both, context.name)} ${both.length > 1 ? 'show' : 'shows'} both` : ''}.`;
}
