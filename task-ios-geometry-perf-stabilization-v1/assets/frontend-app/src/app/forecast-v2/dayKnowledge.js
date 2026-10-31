import { TEMPORAL_CONTRIBUTION_TABLES } from '../temporal-synthesis/temporalSemantics.js?v=d9f39e7';
const primary = (pole) => ({ pole, weight: 'primary' });
const secondary = (pole) => ({ pole, weight: 'secondary' });
const p = primary;
const s = secondary;
export function mergeEffects(...groups) {
    const byPole = new Map();
    for (const effect of groups.flat()) {
        const known = byPole.get(effect.pole);
        if (!known || (known.weight === 'secondary' && effect.weight === 'primary'))
            byPole.set(effect.pole, effect);
    }
    return [...byPole.values()];
}
/* -------------------------------------------------------------- numerology -- */
/** One row per cycle number, shared by Year, Month and Day: the number means the same at every scale. */
export const CYCLE_ROWS = {
    1: { effects: [p('begin'), s('commit'), s('urgent')], rising: ['self-assurance'] },
    2: { effects: [p('unhurried'), p('listen'), s('open')], rising: ['sensitivity'] },
    3: { effects: [p('speak'), p('outward'), s('wide')], quieter: ['staying-power'] },
    4: { effects: [p('narrow'), s('unhurried'), s('commit'), s('contained')], quieter: ['spontaneity'] },
    5: { effects: [p('wide'), p('keep-open'), s('urgent'), s('begin')], rising: ['restlessness'], quieter: ['staying-power'] },
    6: { effects: [p('open'), s('listen'), s('commit'), s('outward')], rising: ['warmth'], quieter: ['emotional-distance'] },
    7: { effects: [p('inward'), p('narrow'), s('keep-open'), s('contained')], rising: ['reflectiveness'], quieter: ['appetite-for-company'] },
    8: { effects: [p('commit'), s('speak'), s('urgent'), s('contained')], rising: ['self-assurance'], quieter: ['access-to-feelings'] },
    9: { effects: [p('finish'), s('open'), s('inward')], rising: ['wistfulness'] },
};
/** The plain noun phrase for a cycle number, from the legacy table. */
export const cycleTheme = (number) => (TEMPORAL_CONTRIBUTION_TABLES.CYCLE[String(number)]?.themeEn ?? '');
/* -------------------------------------------------------------------- BaZi -- */
/**
 * The five Ten God families. The engine writes `authority` and the natal lexicon
 * `officer`; both keys exist so a category cannot be dropped silently.
 */
export const TEN_GOD_ROWS = {
    companion: { effects: [p('outward'), s('charged')] },
    output: { effects: [p('speak'), s('begin'), s('outward')] },
    wealth: { effects: [p('commit'), s('narrow')] },
    authority: { effects: [p('unhurried'), s('commit')] },
    officer: { effects: [p('unhurried'), s('commit')] },
    resource: { effects: [p('inward'), s('listen'), s('open')] },
};
export const tenGodTheme = (category) => (TEMPORAL_CONTRIBUTION_TABLES.TEN_GOD[category]?.themeEn ?? '');
/** How a transit aspect touches, by the harmonic the aspect engine already assigns. */
export const QUALITY_OF_HARMONIC = {
    fusion: 'merge', flow: 'ease', tension: 'hard', polarity: 'hard',
};
export const FAST_BODIES = ['Moon', 'Sun', 'Mercury', 'Venus', 'Mars'];
export const SLOW_BODIES = ['Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
/**
 * THE MOON IS READ BY WHAT SHE TOUCHES.
 *
 * She makes a contact most days, and "feelings are open" is true of nearly all of
 * them - which is why a first version that gave every Moon contact that one
 * meaning made every day lean into feeling. What changes from day to day is which
 * part of the chart she is waking up: the Sun is direction and vitality, Mercury
 * thinking and talk, Venus relating and pleasure, Mars drive and temper, the Moon
 * itself the feelings. So the natal point she lands on leads and "feeling" follows
 * at secondary weight, except where the point IS feeling.
 */
export const MOON_TARGET_ROWS = {
    Sun: {
        ease: { effects: [p('commit'), s('outward'), s('smooth')], rising: ['self-assurance'] },
        hard: { effects: [p('open'), s('urgent'), s('charged')], rising: ['sensitivity', 'impatience'], quieter: ['emotional-distance'] },
        merge: { effects: [p('commit'), s('open'), s('outward')], rising: ['self-assurance'] },
    },
    Mercury: {
        ease: { effects: [p('speak'), s('narrow'), s('smooth')] },
        hard: { effects: [p('wide'), s('charged'), s('open')], rising: ['restlessness'], quieter: ['staying-power'] },
        merge: { effects: [p('narrow'), s('speak')] },
    },
    Venus: {
        /* Feeling and ease first; company is what it may lead to, not what it is. */
        ease: { effects: [p('open'), p('smooth'), s('outward')], rising: ['warmth'] },
        hard: { effects: [p('open'), s('charged'), s('outward')], rising: ['sensitivity'], quieter: ['emotional-distance'] },
        merge: { effects: [p('open'), s('outward')], rising: ['warmth'] },
    },
    Mars: {
        ease: { effects: [p('urgent'), s('begin'), s('smooth')], rising: ['self-assurance'] },
        hard: { effects: [p('urgent'), p('charged'), s('open')], rising: ['irritability', 'impatience'], quieter: ['patience'] },
        merge: { effects: [p('urgent'), s('begin'), s('open')], rising: ['impatience'], quieter: ['patience'] },
    },
    Moon: {
        ease: { effects: [p('open'), s('smooth')], rising: ['warmth'] },
        hard: { effects: [p('open'), s('charged')], rising: ['sensitivity'], quieter: ['emotional-distance'] },
        merge: { effects: [p('open'), s('inward')], rising: ['sensitivity'], quieter: ['emotional-distance'] },
    },
};
/** What a fast body other than the Moon is about, by how the contact comes. */
export const FAST_BODY_ROWS = {
    Sun: {
        ease: { effects: [p('commit'), s('outward'), s('smooth')], rising: ['self-assurance'] },
        hard: { effects: [p('urgent'), s('charged'), s('commit')], rising: ['impatience'], quieter: ['patience'] },
        merge: { effects: [p('commit'), s('outward')], rising: ['self-assurance'] },
    },
    Mercury: {
        ease: { effects: [p('narrow'), p('speak'), s('smooth'), s('commit')] },
        hard: { effects: [p('keep-open'), p('charged'), s('wide')], rising: ['restlessness'], quieter: ['staying-power'] },
        merge: { effects: [p('narrow'), s('speak')] },
    },
    Venus: {
        ease: { effects: [p('outward'), p('smooth'), s('open')], rising: ['warmth'] },
        hard: { effects: [p('charged'), s('outward'), s('keep-open')], rising: ['sensitivity'], quieter: ['emotional-distance'] },
        merge: { effects: [p('outward'), s('open')], rising: ['warmth'] },
    },
    Mars: {
        ease: { effects: [p('urgent'), p('begin'), s('smooth'), s('commit')], rising: ['self-assurance'] },
        hard: { effects: [p('urgent'), p('charged'), s('speak')], rising: ['impatience', 'irritability'], quieter: ['patience'] },
        merge: { effects: [p('urgent'), s('begin')], rising: ['impatience'], quieter: ['patience'] },
    },
};
/** The natal point a transit lands on adds a little of its own. */
export const TARGET_ROWS = {
    Sun: { ease: [s('commit')], hard: [s('urgent')], merge: [s('commit')] },
    Moon: { ease: [s('open')], hard: [s('open')], merge: [s('open'), s('inward')] },
    Mercury: { ease: [s('speak')], hard: [s('wide')], merge: [s('narrow')] },
    Venus: { ease: [s('outward')], hard: [s('charged')], merge: [s('outward')] },
    Mars: { ease: [s('urgent')], hard: [s('urgent'), s('charged')], merge: [s('urgent')] },
};
/**
 * A slow body is read as BACKGROUND: it shapes why a day matters and may oppose
 * what the day pulls toward. Its quality adds friction or ease at secondary weight.
 */
export const SLOW_BODY_ROWS = {
    Jupiter: { effects: [p('outward'), s('begin')] },
    Saturn: { effects: [p('unhurried'), s('commit')] },
    Uranus: { effects: [p('begin'), s('keep-open')] },
    Neptune: { effects: [p('wide'), s('keep-open'), s('open')] },
    Pluto: { effects: [p('finish'), s('open')] },
};
export const SLOW_QUALITY_EFFECTS = {
    ease: [s('smooth')], hard: [s('charged')], merge: [],
};
export const slowBodyTheme = (body) => (TEMPORAL_CONTRIBUTION_TABLES.TRANSIT_BODY[body]?.themeEn ?? '');
/* ---------------------------------------------------------- Moon and Sun -- */
/** The Moon's sign by element: the day's tone before any contact is made. */
export const MOON_ELEMENT_ROWS = {
    Fire: { effects: [s('urgent'), s('speak')], rising: ['self-assurance'], quieter: ['patience'] },
    Earth: { effects: [s('narrow'), s('unhurried'), s('contained')], quieter: ['spontaneity'] },
    Air: { effects: [s('wide'), s('speak'), s('outward')], rising: ['restlessness'], quieter: ['staying-power'] },
    Water: { effects: [p('open'), s('inward')], rising: ['sensitivity'], quieter: ['emotional-distance'] },
};
export const PHASE_KIND = {
    'New Moon': 'new',
    'Waxing Crescent': 'building', 'First Quarter': 'building', 'Waxing Gibbous': 'building',
    'Full Moon': 'full',
    'Waning Gibbous': 'clearing', 'Third Quarter': 'clearing', 'Waning Crescent': 'clearing',
};
export const MOON_PHASE_ROWS = {
    new: { effects: [s('begin'), s('inward')] },
    building: { effects: [s('begin')] },
    full: { effects: [s('open'), s('outward')], rising: ['sensitivity'] },
    clearing: { effects: [s('finish'), s('inward')] },
};
/** The transiting Sun's element: the month's own colour, as background. */
export const SUN_SEASON_ROWS = {
    Fire: { effects: [s('urgent')] },
    Earth: { effects: [s('narrow')] },
    Air: { effects: [s('wide'), s('speak')] },
    Water: { effects: [s('open')] },
};
export const sunSeasonTheme = (element) => (TEMPORAL_CONTRIBUTION_TABLES.SUN_ELEMENT[element]?.themeEn ?? '');
/**
 * The Moon's whole-sign house, by the life area the house stands for (houseInterpretationMap).
 * Used only with an exact birth time; it adds a little colour and never leads.
 */
export const MOON_HOUSE_ROWS = {
    1: { effects: [s('begin')] },
    2: { effects: [s('commit')] },
    3: { effects: [s('speak'), s('wide')] },
    4: { effects: [s('inward'), s('open')] },
    5: { effects: [s('outward'), s('begin')] },
    6: { effects: [s('narrow'), s('unhurried')] },
    7: { effects: [s('outward'), s('listen')] },
    8: { effects: [s('open'), s('inward')] },
    9: { effects: [s('wide'), s('begin')] },
    10: { effects: [s('commit')] },
    11: { effects: [s('outward')] },
    12: { effects: [s('inward'), s('open')] },
};
