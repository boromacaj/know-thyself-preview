import { hdCenters } from './data/hdCenters.js?v=f9ab0a6';
/**
 * Structural outputs that follow deterministically from activations the engine
 * already resolves: Signature / Not-Self by Type, the nine center states, the
 * Incarnation Cross angle and its four gates, and the four Variable arrows.
 *
 * Nothing here re-derives astronomy. Every value below is a lookup or a direct
 * read of gate / color / tone that `resolveHumanDesignActivation` already
 * produced, which is why these can be reported with the same confidence as the
 * mechanics themselves.
 */
const SIGNATURE_BY_TYPE = {
    Manifestor: 'Peace',
    Generator: 'Satisfaction',
    'Manifesting Generator': 'Satisfaction',
    Projector: 'Success',
    Reflector: 'Surprise',
};
const NOT_SELF_BY_TYPE = {
    Manifestor: 'Anger',
    Generator: 'Frustration',
    'Manifesting Generator': 'Frustration',
    Projector: 'Bitterness',
    Reflector: 'Disappointment',
};
/**
 * The cross angle is fixed by the profile, not by the gates. Right Angle covers
 * the personal-destiny profiles, the single 4/1 profile is the Juxtaposition,
 * and the remaining profiles carry a Left Angle (transpersonal) cross.
 */
const CROSS_ANGLE_BY_PROFILE = {
    '1/3': 'Right Angle',
    '1/4': 'Right Angle',
    '2/4': 'Right Angle',
    '2/5': 'Right Angle',
    '3/5': 'Right Angle',
    '3/6': 'Right Angle',
    '4/6': 'Right Angle',
    '4/1': 'Juxtaposition',
    '5/1': 'Left Angle',
    '5/2': 'Left Angle',
    '6/2': 'Left Angle',
    '6/3': 'Left Angle',
};
/**
 * Each arrow reads one specific activation. The Design (unconscious) pair sits
 * on the left of the BodyGraph head/body, the Personality (conscious) pair on
 * the right.
 */
const VARIABLE_SOURCES = [
    { id: 'determination', label: 'Determination (Digestion)', arrow: 'top-left', side: 'Design', body: 'Sun' },
    { id: 'environment', label: 'Environment', arrow: 'bottom-left', side: 'Design', body: 'North Node' },
    { id: 'motivation', label: 'Motivation', arrow: 'top-right', side: 'Personality', body: 'Sun' },
    { id: 'perspective', label: 'Perspective (View)', arrow: 'bottom-right', side: 'Personality', body: 'North Node' },
];
export function signatureForType(type) {
    return SIGNATURE_BY_TYPE[type];
}
export function notSelfThemeForType(type) {
    return NOT_SELF_BY_TYPE[type];
}
/** All nine centers, defined and undefined alike. An undefined center is a real
 *  result, not a missing one, so the open half of the graph must be reported. */
export function resolveCenterStates(definedCenters) {
    const defined = new Set(definedCenters);
    return hdCenters.map((center) => ({
        id: center.id,
        label: center.label,
        category: center.category,
        defined: defined.has(center.id),
    }));
}
export function resolveIncarnationCross(personalityActivations, designActivations, profile) {
    const personalitySun = gateFor(personalityActivations, 'Sun');
    const personalityEarth = gateFor(personalityActivations, 'Earth');
    const designSun = gateFor(designActivations, 'Sun');
    const designEarth = gateFor(designActivations, 'Earth');
    if (personalitySun === null || personalityEarth === null || designSun === null || designEarth === null) {
        return null;
    }
    const angle = profile ? CROSS_ANGLE_BY_PROFILE[profile] ?? null : null;
    const gateNotation = `${personalitySun}/${personalityEarth} | ${designSun}/${designEarth}`;
    return {
        angle,
        profile,
        personalitySunGate: personalitySun,
        personalityEarthGate: personalityEarth,
        designSunGate: designSun,
        designEarthGate: designEarth,
        gateNotation,
        label: angle ? `${angle} Cross ${gateNotation}` : `Cross ${gateNotation}`,
    };
}
/**
 * Tone decides which way an arrow points: tones 1-3 are the active / focused
 * left orientation, tones 4-6 the receptive / peripheral right orientation.
 * Color selects which of the six variants within that arrow applies; the engine
 * reports the color number rather than naming variants it has no table for.
 */
export function resolveVariables(personalityActivations, designActivations) {
    const variables = [];
    for (const source of VARIABLE_SOURCES) {
        const activations = source.side === 'Design' ? designActivations : personalityActivations;
        const match = activations.find((activation) => activation.body === source.body);
        if (!match)
            continue;
        variables.push({
            id: source.id,
            label: source.label,
            arrow: source.arrow,
            side: source.side,
            sourceBody: source.body,
            gate: match.activation.gate,
            line: match.activation.line,
            color: match.activation.color,
            tone: match.activation.tone,
            orientation: orientationForTone(match.activation.tone),
        });
    }
    return variables;
}
export function orientationForTone(tone) {
    return tone <= 3 ? 'Left' : 'Right';
}
export function formatVariable(variable) {
    return `${variable.orientation} (color ${variable.color}, tone ${variable.tone})`;
}
function gateFor(activations, body) {
    return activations.find((activation) => activation.body === body)?.activation.gate ?? null;
}
