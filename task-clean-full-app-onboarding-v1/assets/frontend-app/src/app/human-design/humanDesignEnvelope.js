import { birthTimeWindow } from '../uncertainty/birthTimeWindow.js?v=f9ab0a6';
import { certifiedScan, constantSegments } from '../uncertainty/certifiedScan.js?v=f9ab0a6';
import { degreesPerMinute, DESIGN_TIME_RATIO_BOUND } from '../uncertainty/motionBounds.js?v=f9ab0a6';
import { HD_LINE_SEGMENT, HD_TONE_SEGMENT } from './data/hdConstants.js?v=f9ab0a6';
import { calculateHumanDesignLive } from './humanDesignEngine.js?v=f9ab0a6';
/*
 * THE HUMAN DESIGN UNCERTAINTY ENVELOPE - which mechanics hold across every
 * instant the birth could have been.
 *
 * Every Human Design mechanic is read from one instant, and a few hours can
 * change the Type. So a chart drawn at the 12:00 reference for someone who
 * does not know their birth time is not "approximately" their chart; it is
 * one of several charts their birth date allows. The product used to withhold
 * all of it. This file finds what that is too cautious about: the parts of the
 * design that are the SAME in every chart the day allows, and so can be read
 * without a birth time, independently of the parts that are not.
 *
 * HOW IT IS PROVEN (uncertainty/certifiedScan.ts). Every mechanic except the
 * Variables is a function of the 26 activations' gate and line alone - channels
 * of gates, centres of channels, Type, Strategy, Authority and Definition of
 * centres and channels, the Profile of the two Sun lines, the Incarnation Cross
 * of the Sun and Earth gates and the Profile. So each activation's gate.line is
 * a certified track: its margin to the nearest line boundary, and its body's
 * speed bound (times DESIGN_TIME_RATIO_BOUND on the Design side, whose instant
 * moves with the birth instant). The scan finds every instant any gate.line
 * changes; between two such instants the whole chart is constant, so the
 * chart at the start of each stretch - an instant the scan itself sampled -
 * stands for the whole stretch, and every mechanic's possible values are
 * exactly the values met across the stretches.
 *
 * THE VARIABLES (the Suns' and Nodes' colour and tone) are only ever reported
 * as holding or not - their values are never listed - so they are proven
 * without locating every change. Two of the stretch charts that disagree prove
 * they move (a Sun changes tone about every forty minutes, so on a whole day
 * that is the usual answer, at no extra cost). Only when every stretch agrees
 * is a certified scan of the tone-width tracks run, to prove they hold. The
 * values listed for moving Variables are the ones met at the stretch charts,
 * not all of them - which nothing reads.
 *
 * WHAT COMES BACK is not a chart. Each mechanic is classified on its own:
 * `stable` when it takes one value across the window, otherwise every value it
 * takes. The stability of one says nothing about another - a Type can hold
 * while the Profile moves, and a centre can be defined all day while the one
 * next to it is not. The engine is not changed and nothing here alters the
 * chart it produced; the reference chart is simply never read as the reader's
 * where the envelope says a value is not settled.
 */
/** The value a mechanic the window leaves open carries wherever the chart is listed. */
export const HD_NEEDS_TIME = 'Needs a birth time';
const SIDES = ['Personality', 'Design'];
const BODIES = [
    'Sun', 'Earth', 'Moon', 'North Node', 'South Node', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
];
const CENTRES = ['head', 'ajna', 'throat', 'g', 'ego', 'solarPlexus', 'sacral', 'spleen', 'root'];
const activationOf = (chart, side, body) => (side === 'Personality' ? chart.personalityActivations : chart.designActivations).find((entry) => entry.body === body);
const rateFor = (side, body) => degreesPerMinute(body, side === 'Design' ? DESIGN_TIME_RATIO_BOUND : 1);
const collect = (values) => {
    const distinct = [];
    for (const value of values)
        if (!distinct.includes(value))
            distinct.push(value);
    return { values: distinct, stable: distinct.length === 1 };
};
/**
 * The envelope, or null when there is nothing to scan: an exact time, a
 * blocked moment, or one without a zone to find its day in.
 */
export function scanHumanDesignEnvelope(moment, precision) {
    if (precision === 'exact' || moment.status !== 'ready' || !moment.utcDateTime)
        return null;
    const window = birthTimeWindow(moment, precision);
    if (!window)
        return null;
    return envelopeOver(moment, window);
}
/**
 * The envelope over an explicit window. For a moment the timezone layer could
 * not place on a local day (a bare UTC instant, as tests and the older API
 * pass), callers build the window themselves.
 */
export function envelopeOver(moment, window) {
    const chartAt = (ms) => calculateHumanDesignLive({ ...moment, utcDateTime: new Date(ms).toISOString() });
    const reference = chartAt(window.referenceMs);
    if (reference.status !== 'calculated')
        return null;
    const lineTracks = SIDES.flatMap((side) => BODIES.map((body) => ({
        id: `line:${side}:${body}`,
        rate: rateFor(side, body),
        read: (chart) => {
            const { activation } = activationOf(chart, side, body);
            return {
                value: `${activation.gate}.${activation.line}`,
                margin: Math.min(activation.positionInLine, HD_LINE_SEGMENT - activation.positionInLine),
            };
        },
    })));
    const toneTracks = SIDES.flatMap((side) => ['Sun', 'North Node'].map((body) => ({
        id: `tone:${side}:${body}`,
        rate: rateFor(side, body),
        read: (chart) => {
            const { activation } = activationOf(chart, side, body);
            return {
                value: `${activation.gate}.${activation.line}.${activation.color}.${activation.tone}`,
                margin: Math.min(activation.positionInTone, HD_TONE_SEGMENT - activation.positionInTone),
            };
        },
    })));
    /* Changes are located to the minute: the classification needs every value a
       mechanic takes, not the second it starts, and a finer search would cost a
       phone a second of work for nothing a reader is told. */
    const scan = certifiedScan(chartAt, lineTracks, window.startMs, window.endMs, { resolutionMs: 60_000 });
    const lineResults = lineTracks.map((track) => scan.results.get(track.id));
    /* One chart per stretch on which every gate and line holds, taken at the
       instant the stretch begins: the scan sampled it there (the window's start,
       or the first instant a changed gate.line holds), so it costs nothing, and a
       stretch shorter than the scan's one-minute resolution is still met. */
    const charts = constantSegments(lineResults, window.startMs, window.endMs).map((segment) => scan.sampleAt(segment.fromMs));
    const variablesOf = (chart) => chart.variables
        .map((variable) => `${variable.id}:${variable.arrow}:${variable.color}.${variable.tone}`).join('|');
    const seen = collect(charts.map(variablesOf));
    let variables = seen;
    let toneSamples = 0;
    if (seen.stable) {
        const toneScan = certifiedScan(chartAt, toneTracks, window.startMs, window.endMs, { resolutionMs: 60_000 });
        const toneResults = toneTracks.map((track) => toneScan.results.get(track.id));
        variables = collect(constantSegments(toneResults, window.startMs, window.endMs)
            .map((segment) => variablesOf(toneScan.sampleAt(segment.fromMs))));
        toneSamples = toneScan.sampleCount;
    }
    const channelSets = charts.map((chart) => new Set(chart.definedChannels.map((channel) => channel.id)));
    const allChannels = [...new Set(channelSets.flatMap((set) => [...set]))].sort();
    const gateSets = charts.map((chart) => new Set(chart.activatedGates));
    const allGates = [...new Set(gateSets.flatMap((set) => [...set]))].sort((a, b) => a - b);
    const centres = Object.fromEntries(CENTRES.map((centre) => [centre, collect(charts.map((chart) => (chart.centerStates.find((state) => state.id === centre)?.defined ? 'defined' : 'open')))]));
    return {
        window,
        segments: charts.length,
        samples: scan.sampleCount + toneSamples,
        type: collect(charts.map((chart) => chart.type)),
        strategy: collect(charts.map((chart) => chart.strategy)),
        authority: collect(charts.map((chart) => chart.authority)),
        profile: collect(charts.map((chart) => chart.profile ?? '')),
        definition: collect(charts.map((chart) => chart.definition)),
        signature: collect(charts.map((chart) => chart.signature ?? '')),
        notSelf: collect(charts.map((chart) => chart.notSelfTheme ?? '')),
        motorToThroat: collect(charts.map((chart) => (chart.motorToThroat ? 'yes' : 'no'))),
        cross: collect(charts.map((chart) => chart.incarnationCross?.label ?? '')),
        variables,
        centres,
        channels: {
            always: allChannels.filter((id) => channelSets.every((set) => set.has(id))),
            sometimes: allChannels.filter((id) => !channelSets.every((set) => set.has(id))),
        },
        gates: {
            always: allGates.filter((gate) => gateSets.every((set) => set.has(gate))),
            sometimes: allGates.filter((gate) => !gateSets.every((set) => set.has(gate))),
        },
        activations: SIDES.flatMap((side) => BODIES.map((body) => {
            const result = scan.results.get(`line:${side}:${body}`);
            return {
                side,
                body,
                gates: [...new Set(result.values.map((value) => Number(value.split('.')[0])))],
                lines: result.values,
            };
        })),
    };
}
