import { HD_BASE_SEGMENT, HD_COLOR_SEGMENT, HD_FULL_CIRCLE_DEGREES, HD_GATE_SEGMENT, HD_GATE_WHEEL_START_DEGREES, HD_LINE_SEGMENT, HD_NUM_BASES, HD_NUM_COLORS, HD_NUM_GATES, HD_NUM_LINES, HD_NUM_TONES, HD_TONE_SEGMENT, } from './data/hdConstants.js?v=d9f39e7';
import { hdChannels } from './data/hdChannels.js?v=d9f39e7';
import { hdGateSequence } from './data/hdGateWheel.js?v=d9f39e7';
export function normalizeDegrees(value) {
    return ((value % HD_FULL_CIRCLE_DEGREES) + HD_FULL_CIRCLE_DEGREES) % HD_FULL_CIRCLE_DEGREES;
}
export function resolveHumanDesignActivation(longitude) {
    const normalizedLongitude = normalizeDegrees(longitude);
    const angleFromWheelStart = normalizeDegrees(normalizedLongitude - HD_GATE_WHEEL_START_DEGREES);
    const gateIndex = boundedIndex(angleFromWheelStart, HD_GATE_SEGMENT, HD_NUM_GATES);
    const positionInGate = angleFromWheelStart - (gateIndex * HD_GATE_SEGMENT);
    const lineIndex = boundedIndex(positionInGate, HD_LINE_SEGMENT, HD_NUM_LINES);
    const positionInLine = positionInGate - (lineIndex * HD_LINE_SEGMENT);
    const colorIndex = boundedIndex(positionInLine, HD_COLOR_SEGMENT, HD_NUM_COLORS);
    const positionInColor = positionInLine - (colorIndex * HD_COLOR_SEGMENT);
    const toneIndex = boundedIndex(positionInColor, HD_TONE_SEGMENT, HD_NUM_TONES);
    const positionInTone = positionInColor - (toneIndex * HD_TONE_SEGMENT);
    const baseIndex = boundedIndex(positionInTone, HD_BASE_SEGMENT, HD_NUM_BASES);
    const gate = hdGateSequence[gateIndex];
    if (gate === undefined) {
        throw new Error(`Human Design gate wheel did not resolve index ${gateIndex}.`);
    }
    return {
        longitude,
        normalizedLongitude,
        angleFromWheelStart,
        gateIndex,
        gate,
        line: oneBased(lineIndex),
        color: oneBased(colorIndex),
        tone: oneBased(toneIndex),
        base: oneBased(baseIndex),
        positionInGate,
        positionInLine,
        positionInColor,
        positionInTone,
    };
}
export function resolveDefinedChannels(activatedGates) {
    const gateSet = new Set(activatedGates);
    return hdChannels
        .filter((channel) => channel.gates.every((gate) => gateSet.has(gate)))
        .map((channel) => ({
        ...channel,
        activatedGates: channel.gates,
    }));
}
export function resolveDefinedCenters(channels) {
    return [...new Set(channels.flatMap((channel) => channel.centers))];
}
function boundedIndex(position, segmentSize, segmentCount) {
    return Math.min(Math.floor(position / segmentSize), segmentCount - 1);
}
function oneBased(index) {
    return index + 1;
}
