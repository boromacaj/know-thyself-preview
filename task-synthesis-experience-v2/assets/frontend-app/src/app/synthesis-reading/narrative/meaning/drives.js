import { pillarsOf, supportsOf } from './plan.js?v=53c0693';
/*
 * WHAT A PERSON APPEARS TO BE AFTER - AND WHERE IT MAY BE SAID (V2.3).
 *
 * V2.2 dropped the motivations V2.1 had, because a drive theme (`Wanting to understand`,
 * `Making and expressing`) is not a way of working and so never entered the pool of findings.
 * The model still reports them, with evidence, and a reading that says only HOW someone goes
 * about things and never WHAT FOR is half a portrait.
 *
 * A drive is said only when
 *   - the model reports it (strong or moderate, not outweighed by counter-evidence),
 *   - at least two traditions each have a result that clears the evidence gate for it
 *     (these are shown under the paragraph; they need no voice, since they are support), and
 *   - the paragraph it joins is already about something that drive is about: a result the
 *     paragraph quotes carries, as its most characteristic contribution, a tag this table
 *     links to the drive. Two themes in one profile are never joined merely for coexisting.
 *
 * `DRIVE_NOTE` completes `there seems to be ...`. `DRIVE_POLES` says which
 * poles of a split a drive sits with, so a split can say what one side is for.
 */
export const DRIVE_NOTE = {
    mastery: 'a wish to do a thing properly, for its own sake',
    achievement: 'a wish for results that can be pointed to',
    recognition: 'a wish to have what you do noticed',
    meaning: 'a wish for work that means something beyond the task',
    belonging: 'a wish for real closeness with a few people',
    freedom: 'a wish for room to move and to choose the pace',
    care: 'a wish to look after what you are responsible for',
    understanding: 'a wish to understand how things work, and not only that they do',
    'self-expression': 'a wish to find your own words for things',
    beauty: 'a wish for things made with care',
};
/** Contribution tags that a paragraph's quoted result must carry first for the drive to join it. */
export const DRIVE_TAGS = {
    mastery: ['refinement', 'standards', 'method'],
    achievement: ['control', 'practicality', 'method'],
    recognition: ['visibility'],
    meaning: ['abstraction'],
    belonging: ['calibration'],
    freedom: ['autonomy', 'improvisation', 'exposure'],
    care: ['protection', 'calibration'],
    understanding: ['investigation', 'verification'],
    'self-expression': ['expression', 'visibility'],
    beauty: ['refinement', 'expression'],
};
/** The poles of a split a drive sits with. */
export const DRIVE_POLES = {
    mastery: ['structured'],
    achievement: ['assertive', 'structured'],
    recognition: ['social'],
    meaning: ['conceptual'],
    belonging: ['collaborative'],
    freedom: ['independent', 'novelty-seeking', 'adaptable'],
    care: ['collaborative', 'stability-seeking'],
    understanding: ['analytical'],
    'self-expression': ['emotionally-expressive', 'social'],
    beauty: ['creative'],
};
/** The drives the evidence supports across at least two traditions. */
export function drivesOf(source) {
    const out = [];
    for (const theme of source.themes) {
        if (theme.facet !== 'drive' || theme.counterWeight > theme.supportWeight)
            continue;
        if (theme.support !== 'strong' && theme.support !== 'moderate')
            continue;
        const weight = new Map();
        for (const item of theme.supportingEvidence) {
            if (item.evidence.dimension in DRIVE_NOTE)
                weight.set(item.evidence.dimension, (weight.get(item.evidence.dimension) ?? 0) + item.countedWeight);
        }
        const dimension = [...weight.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0];
        if (!dimension)
            continue;
        const supports = supportsOf(theme.supportingEvidence.filter((item) => item.evidence.dimension === dimension));
        if (supports.length < 2 || pillarsOf(supports).length < 2)
            continue;
        out.push({ dimension, theme, supports, weight: theme.salience });
    }
    return out.sort((a, b) => b.weight - a.weight || a.dimension.localeCompare(b.dimension));
}
