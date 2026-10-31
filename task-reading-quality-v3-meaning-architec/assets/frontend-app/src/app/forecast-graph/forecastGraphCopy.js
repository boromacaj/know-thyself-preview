import { LIFE_LABEL, LIFE_LEVEL_WORD } from '../temporal-synthesis/lifeDynamicsEnglish.js';
import { extremesOf, pointOf, referenceLevel, sampleCount, } from './forecastChartData.js';
/*
 * THE GRAPH'S WORDS - ENGLISH ONLY, CLOSED, AND ABOUT EMPHASIS.
 *
 * Like the Life Dynamics wording this extends (temporal-synthesis/lifeDynamicsEnglish.ts), nothing here is about luck, success, diagnosis, income
 * or romance. A level is how much of a period's thematic emphasis falls on a theme, against an ordinary period for THAT theme. The five level
 * words and the five names are not redefined: they are imported. The Slovak Forecast is frozen and shows none of this.
 */
export const levelWord = (level) => LIFE_LEVEL_WORD[Math.min(5, Math.max(1, Math.round(level)))];
/** The graph's left axis names three of the five levels (the ends and the ordinary one), at a readable size; the guides draw all five. */
export const AXIS_WORD = { 1: 'Subtle', 3: 'Active', 5: 'Central' };
export const NOT_ASSESSED = 'Not assessed';
export const GRAPH_COPY = {
    compareAll: 'Compare all',
    oneTheme: 'One theme',
    trend: 'Trend',
    compareTitle: 'All five themes',
    aboutSummary: 'About this graph',
    tableSummary: 'Values as a table',
    tableSample: 'Sample',
    tableCaption: (area, period) => `${area} through ${period}: emphasis level of each sample`,
    slider: 'Tap or drag along the graph to pick a point. Arrow keys move it.',
    /** What the height and the dot mean, once. */
    readHeight: 'Height shows how much emphasis a theme carries against its own ordinary period. Active is ordinary; higher is more emphasis, never a better outcome.',
    readSamplesMonth: 'Each dot is one day, read on the same scale as the Month panel above; the line only joins the dots.',
    readSamplesYear: 'Each dot is one month, the average of that month’s days; the line only joins the dots.',
    readSamplesWindow: 'Each dot is one day on the Life Dynamics period scale; the line only joins the dots.',
    readAverageLine: 'The dotted line is the average of the whole period, the level the gauge above shows.',
    readAverageWindow: 'The dotted line is the average of the days drawn.',
    readCompare: 'The other four themes stay in view, dimmed, each against its own ordinary period. Heights compare levels, never amounts.',
    birthTimeEstimated: 'No birth time was given, so the transit details are approximate.',
    notAssessedLine: 'No value was calculated for this sample. That is not a low emphasis, and it is not drawn as one.',
    dayScale: 'The Day view reads only what is distinct about a single date, on its own scale, so its level for that date can differ from this graph. “Not assessed” there means no day-specific evidence, not a low level.',
    openMonth: (name) => `Open ${name}`,
    openDay: (name) => `Open the Day view for ${name}`,
};
const stateWord = (point) => (point && point.level !== null ? levelWord(point.level) : NOT_ASSESSED);
export const samplesNote = (set) => (set.scale === 'year' ? GRAPH_COPY.readSamplesYear : set.scale === 'month' ? GRAPH_COPY.readSamplesMonth : GRAPH_COPY.readSamplesWindow);
/** The slider's spoken value for the selected sample. */
export function valueText(set, id, index, combined) {
    const point = pointOf(set, id, index);
    if (!point)
        return '';
    const here = point.level !== null
        ? `${LIFE_LABEL[id]}: ${levelWord(point.level).toLowerCase()} emphasis, ${point.level} of 5`
        : `${LIFE_LABEL[id]}: not assessed`;
    if (!combined)
        return `${point.name}. ${here}`;
    const others = set.order.filter((other) => other !== id).map((other) => {
        const p = pointOf(set, other, index);
        return `${LIFE_LABEL[other]} ${p && p.level !== null ? `${p.level} of 5` : 'not assessed'}`;
    });
    return `${point.name}. ${here}. Others: ${others.join(', ')}`;
}
/**
 * A series that changes level often, said by how many samples sit at each level: "Prominent on 29 of 31 days; central theme on Mon 5 Oct and Wed 14 Oct."
 * The commonest level is said first with its count; each other level names its samples while there are three or fewer and counts them after that. The year of a date is
 * left off a name, because the period label already says it. Counting and wording only: the levels are the table's.
 */
function levelCounts(points, unit) {
    const total = points.length;
    const byLevel = new Map();
    for (const point of points)
        byLevel.set(point.level, [...(byLevel.get(point.level) ?? []), point]);
    const order = [...byLevel.entries()].sort((left, right) => right[1].length - left[1].length || right[0] - left[0]);
    const where = unit === 'month' ? 'in' : 'on';
    const short = (name) => name.replace(/\s\d{4}$/, '');
    const list = (names) => (names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);
    const said = order.map(([level, group], index) => {
        const word = index === 0 ? levelWord(level) : levelWord(level).toLowerCase();
        if (index === 0)
            return `${word} ${where} ${group.length} of ${total} ${unit}s`;
        return group.length <= 3 ? `${word} ${where} ${list(group.map((point) => short(point.name)))}` : `${word} ${where} ${group.length} ${unit}s`;
    });
    return `${said.join('; ')}.`;
}
/** The text equivalent of a series: where it is highest and lowest, and where the period's own average sits. Facts only. */
export function seriesSummary(set, id) {
    const label = LIFE_LABEL[id];
    const extremes = extremesOf(set, id);
    const n = sampleCount(set);
    if (extremes.assessed === 0 || !extremes.high || !extremes.low) {
        return `${label} through ${set.periodLabel}: no sample was assessed.`;
    }
    /*
     * SAID BY LEVEL, BECAUSE THE TABLE UNDER THE GRAPH IS. The first and last sample of a level are what a reader can check against the table; a count of "other
     * samples at the same value" compared the underlying weights, which differ in the third decimal while the level word is the same, and so contradicted the table
     * (one level for all thirty-one days, "and 4 other samples"). Runs of one level are named while they are few; with more than three runs it falls back to the
     * highest and lowest, with ties counted at the level.
     */
    const points = (set.series[id]?.points ?? []).filter((point) => point.level !== null);
    const runs = [];
    for (const point of points) {
        const level = point.level;
        const run = runs[runs.length - 1];
        if (run && run.level === level)
            run.last = point.name;
        else
            runs.push({ level, first: point.name, last: point.name });
    }
    const quoted = (level) => `“${levelWord(level)}”`;
    const unit = set.scale === 'year' ? 'month' : 'day';
    const shape = runs.length === 1
        ? `It stayed at the ${quoted(runs[0].level)} level on every ${unit}.`
        : runs.length <= 3
            ? `${runs.map((run, index) => `${index === 0 ? '' : 'then '}${quoted(run.level)} ${run.first === run.last ? `on ${run.first}` : `from ${run.first} to ${run.last}`}`).join(', ')}.`.replace(/^./, (first) => first.toUpperCase())
            : levelCounts(points, unit);
    const parts = [
        `${label} through ${set.periodLabel}, ${n} samples.`,
        shape,
    ];
    const ref = referenceLevel(set, id);
    if (ref !== null && set.reference)
        parts.push(`${set.reference.label}: ${levelWord(ref).toLowerCase()}, ${ref} of 5.`);
    if (extremes.missing > 0)
        parts.push(`${extremes.missing} ${extremes.missing === 1 ? 'sample is' : 'samples are'} not assessed.`);
    return parts.join(' ');
}
export const gaugeAria = (id, point) => {
    const label = LIFE_LABEL[id];
    if (!point || point.level === null)
        return `${label}: not assessed`;
    return `${label}: ${levelWord(point.level).toLowerCase()} emphasis, ${point.level} of 5`;
};
export { stateWord };
