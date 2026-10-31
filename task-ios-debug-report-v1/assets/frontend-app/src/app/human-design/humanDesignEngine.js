import { Body, Ecliptic, EclipticGeoMoon, GeoVector, SunPosition, } from 'astronomy-engine';
import { trueNorthNodeLongitude } from '../astrology/lunarNode.js?v=b5ef5ed';
import { resolveDefinedCenters, resolveDefinedChannels, resolveHumanDesignActivation, normalizeDegrees } from './humanDesignActivation.js?v=b5ef5ed';
import { resolveHumanDesignMechanics } from './humanDesignMechanics.js?v=b5ef5ed';
import { formatVariable, notSelfThemeForType, resolveCenterStates, resolveIncarnationCross, resolveVariables, signatureForType, } from './humanDesignStructure.js?v=b5ef5ed';
import { HD_DESIGN_IMPRINT_DEGREES } from './data/hdConstants.js?v=b5ef5ed';
export { trueNorthNodeLongitude } from '../astrology/lunarNode.js?v=b5ef5ed';
const ENGINE = 'KNOW THYSELF Human Design v2 / astronomy-engine 2.1.19';
const FRAME = 'Tropical geocentric ecliptic longitudes mapped to Human Design gate wheel starting at 302°';
const EARTH_OFFSET = 180;
const APPROXIMATE_SOLAR_DAYS_FOR_88_DEGREES = 88.35;
const MILLISECONDS_PER_DAY = 86_400_000;
const DESIGN_SOLVER_TOLERANCE_DEGREES = 0.000001;
const PLANET_BODIES = [
    { body: Body.Mercury, label: 'Mercury' },
    { body: Body.Venus, label: 'Venus' },
    { body: Body.Mars, label: 'Mars' },
    { body: Body.Jupiter, label: 'Jupiter' },
    { body: Body.Saturn, label: 'Saturn' },
    { body: Body.Uranus, label: 'Uranus' },
    { body: Body.Neptune, label: 'Neptune' },
    { body: Body.Pluto, label: 'Pluto' },
];
const BODY_ORDER = [
    'Sun',
    'Earth',
    'Moon',
    'North Node',
    'South Node',
    'Mercury',
    'Venus',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
    'Pluto',
];
export function calculateHumanDesignLive(moment) {
    if (moment.status !== 'ready' || !moment.utcDateTime) {
        return blocked(moment.limitations.length > 0 ? moment.limitations : ['A normalized UTC birth moment is required for Human Design.']);
    }
    const personalityDate = new Date(moment.utcDateTime);
    const personalitySun = normalizeDegrees(SunPosition(personalityDate).elon);
    const targetDesignSun = normalizeDegrees(personalitySun - HD_DESIGN_IMPRINT_DEGREES);
    const designSolution = findDesignDate(personalityDate, targetDesignSun);
    const designDate = designSolution.date;
    const personalityActivations = activationsForDate('Personality', personalityDate);
    const designActivations = activationsForDate('Design', designDate);
    const activatedGates = [...new Set([...personalityActivations, ...designActivations]
            .map((activation) => activation.activation.gate))]
        .sort((left, right) => left - right);
    const definedChannels = resolveDefinedChannels(activatedGates);
    const definedCenters = resolveDefinedCenters(definedChannels);
    const profile = profileFromActivations(personalityActivations, designActivations);
    const mechanics = resolveHumanDesignMechanics(definedChannels);
    const definitionGroups = mechanics.definitionGroups.map((group) => ({
        centers: [...group.centers],
        channelIds: [...group.channelIds],
    }));
    const designOffsetDays = round((personalityDate.getTime() - designDate.getTime()) / MILLISECONDS_PER_DAY, 6);
    const centerStates = resolveCenterStates(definedCenters);
    const incarnationCross = resolveIncarnationCross(personalityActivations, designActivations, profile);
    const variables = resolveVariables(personalityActivations, designActivations);
    return {
        status: 'calculated',
        engine: ENGINE,
        frame: FRAME,
        personalityDateTime: personalityDate.toISOString(),
        designDateTime: designDate.toISOString(),
        designOffsetDays,
        personalityActivations,
        designActivations,
        activatedGates,
        definedChannels,
        definedCenters,
        profile,
        type: mechanics.type,
        strategy: mechanics.strategy,
        authority: mechanics.authority,
        definition: mechanics.definition,
        definitionGroups,
        motorToThroat: mechanics.motorToThroat,
        motorToThroatPath: [...mechanics.motorToThroatPath],
        signature: signatureForType(mechanics.type),
        notSelfTheme: notSelfThemeForType(mechanics.type),
        centerStates,
        incarnationCross,
        variables,
        limitations: [
            'Type, strategy, authority, and definition are derived deterministically from the completed-channel center graph.',
            'The Design moment is solved for a solar longitude exactly 88° before the Personality Sun using an iterative solar-speed correction.',
            'North Node activations use a locally derived osculating true lunar node (matching Swiss Ephemeris SE_TRUE_NODE); South Node is exactly 180° opposite.',
            'Lunar node convention is unresolved across Human Design sources: the true (osculating) node used here can differ from the mean node by up to ~1.5°, which can shift the node line and, near a gate boundary, the node gate. This does not affect Type, Strategy, Authority, Definition, or Profile, which never depend on node lines.',
            'The Incarnation Cross is reported by angle and its four gates. The proper cross name (for example "Cross of the Sphinx") requires a curated table of named crosses that this engine does not hold, so no name is invented.',
            'The four Variables are reported as arrow orientation with their color and tone numbers. The named PHS diet, environment, motivation, and perspective variants for each color are a separate interpretive table that is not implemented, so the color number is shown rather than a variant name.',
            'Full interpretive BodyGraph text, circuitry grouping, and cognition are not implemented yet.',
            'Human Design is presented as symbolic reflection, not fate, diagnosis, or identity certainty.',
        ],
        trace: [
            { label: 'Engine', value: ENGINE },
            { label: 'Frame', value: FRAME },
            { label: 'Personality UTC', value: personalityDate.toISOString() },
            { label: 'Design UTC', value: designDate.toISOString() },
            { label: 'Design offset days', value: String(designOffsetDays) },
            { label: 'Design solver iterations', value: String(designSolution.iterations) },
            { label: 'Design Sun residual', value: `${designSolution.residualDegrees.toFixed(9)} degrees` },
            { label: 'Personality Sun longitude', value: `${personalitySun.toFixed(6)} degrees` },
            { label: 'Target Design Sun longitude', value: `${targetDesignSun.toFixed(6)} degrees` },
            { label: 'Lunar node model', value: 'Osculating true ascending node from the local lunar state vector (Swiss Ephemeris SE_TRUE_NODE convention) / South Node exactly 180 degrees opposite' },
            { label: 'Lunar node convention note', value: 'True node used; mean-node convention can shift node line/gate but never affects Type, Strategy, Authority, Definition, or Profile' },
            { label: 'Activated gates', value: activatedGates.join(', ') || 'None' },
            { label: 'Defined channels', value: definedChannels.map((channel) => channel.id).join(', ') || 'None' },
            { label: 'Defined centers', value: definedCenters.join(', ') || 'None' },
            { label: 'Profile', value: profile ?? 'Unavailable' },
            { label: 'Type', value: mechanics.type },
            { label: 'Strategy', value: mechanics.strategy },
            { label: 'Authority', value: mechanics.authority },
            { label: 'Definition', value: mechanics.definition },
            { label: 'Definition groups', value: definitionGroups.map(formatDefinitionGroup).join(' | ') || 'None' },
            { label: 'Motor connected to Throat', value: mechanics.motorToThroat ? 'Yes' : 'No' },
            { label: 'Motor-to-Throat path', value: mechanics.motorToThroatPath.join(' -> ') || 'None' },
            { label: 'Signature', value: signatureForType(mechanics.type) },
            { label: 'Not-Self theme', value: notSelfThemeForType(mechanics.type) },
            { label: 'Defined centers', value: centerStates.filter((center) => center.defined).map((center) => center.label).join(', ') || 'None' },
            { label: 'Undefined centers', value: centerStates.filter((center) => !center.defined).map((center) => center.label).join(', ') || 'None' },
            { label: 'Incarnation Cross', value: incarnationCross?.label ?? 'Unavailable' },
            { label: 'Incarnation Cross angle source', value: incarnationCross?.angle ? `Profile ${incarnationCross.profile}` : 'Profile unavailable' },
            ...variables.map((variable) => ({
                label: `Variable ${variable.arrow} ${variable.label}`,
                value: `${formatVariable(variable)} from ${variable.side} ${variable.sourceBody} gate ${variable.gate}.${variable.line}`,
            })),
            ...activationTrace('Personality', personalityActivations),
            ...activationTrace('Design', designActivations),
        ],
    };
}
function blocked(limitations) {
    return {
        status: 'blocked',
        engine: ENGINE,
        frame: FRAME,
        personalityDateTime: null,
        designDateTime: null,
        designOffsetDays: null,
        personalityActivations: [],
        designActivations: [],
        activatedGates: [],
        definedChannels: [],
        definedCenters: [],
        profile: null,
        type: 'Unavailable',
        strategy: 'Unavailable',
        authority: 'Unavailable',
        definition: 'Unavailable',
        definitionGroups: [],
        motorToThroat: false,
        motorToThroatPath: [],
        signature: null,
        notSelfTheme: null,
        centerStates: [],
        incarnationCross: null,
        variables: [],
        limitations,
        trace: limitations.map((limitation, index) => ({ label: `Limitation ${index + 1}`, value: limitation })),
    };
}
function activationsForDate(side, date) {
    const longitudes = longitudesForDate(date);
    return BODY_ORDER.map((body) => ({
        side,
        body,
        longitude: longitudes[body],
        activation: resolveHumanDesignActivation(longitudes[body]),
    }));
}
function longitudesForDate(date) {
    const sun = normalizeDegrees(SunPosition(date).elon);
    const northNode = trueNorthNodeLongitude(date);
    const result = {
        Sun: sun,
        Earth: normalizeDegrees(sun + EARTH_OFFSET),
        Moon: normalizeDegrees(EclipticGeoMoon(date).lon),
        'North Node': northNode,
        'South Node': normalizeDegrees(northNode + EARTH_OFFSET),
    };
    for (const { body, label } of PLANET_BODIES) {
        result[label] = normalizeDegrees(Ecliptic(GeoVector(body, date, true)).elon);
    }
    return result;
}
function findDesignDate(personalityDate, targetLongitude) {
    let estimate = new Date(personalityDate.getTime() - APPROXIMATE_SOLAR_DAYS_FOR_88_DEGREES * MILLISECONDS_PER_DAY);
    let residualDegrees = signedSolarDifference(normalizeDegrees(SunPosition(estimate).elon), targetLongitude);
    let iterations = 0;
    for (; iterations < 20; iterations += 1) {
        if (Math.abs(residualDegrees) < DESIGN_SOLVER_TOLERANCE_DEGREES)
            break;
        const speedDegreesPerDay = solarSpeedDegreesPerDay(estimate);
        if (!Number.isFinite(speedDegreesPerDay) || Math.abs(speedDegreesPerDay) < 0.5)
            break;
        estimate = new Date(estimate.getTime() - (residualDegrees / speedDegreesPerDay) * MILLISECONDS_PER_DAY);
        residualDegrees = signedSolarDifference(normalizeDegrees(SunPosition(estimate).elon), targetLongitude);
    }
    return {
        date: estimate,
        residualDegrees: round(residualDegrees, 9),
        iterations,
    };
}
function solarSpeedDegreesPerDay(date) {
    const halfDay = MILLISECONDS_PER_DAY / 2;
    const before = normalizeDegrees(SunPosition(new Date(date.getTime() - halfDay)).elon);
    const after = normalizeDegrees(SunPosition(new Date(date.getTime() + halfDay)).elon);
    return signedSolarDifference(after, before);
}
function signedSolarDifference(currentLongitude, targetLongitude) {
    return ((currentLongitude - targetLongitude + 540) % 360) - 180;
}
function profileFromActivations(personalityActivations, designActivations) {
    const personalitySun = personalityActivations.find((activation) => activation.body === 'Sun');
    const designSun = designActivations.find((activation) => activation.body === 'Sun');
    if (!personalitySun || !designSun)
        return null;
    return `${personalitySun.activation.line}/${designSun.activation.line}`;
}
function formatDefinitionGroup(group, index) {
    return `Group ${index + 1}: ${group.centers.join(', ')} [${group.channelIds.join(', ')}]`;
}
function activationTrace(side, activations) {
    return activations.map((activation) => ({
        label: `${side} ${activation.body}`,
        value: `${activation.longitude.toFixed(6)} degrees / Gate ${activation.activation.gate}.${activation.activation.line}.${activation.activation.color}.${activation.activation.tone}.${activation.activation.base}`,
    }));
}
function round(value, digits = 6) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
