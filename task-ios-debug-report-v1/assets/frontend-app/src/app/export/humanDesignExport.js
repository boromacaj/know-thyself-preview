import { hdCenters } from '../human-design/data/hdCenters.js?v=b5ef5ed';
import { hdChannels } from '../human-design/data/hdChannels.js?v=b5ef5ed';
import { birthTimeBasisFromMoment } from '../evidence/birthTimeBasis.js?v=b5ef5ed';
const UNSUPPORTED_FIELDS = [
    'Incarnation Cross',
    'Variables (Right/Left angle, Determination, Environment, Perspective)',
    'PHS (Primary Health System)',
    'Environment (Variable)',
    'Motivation (Variable)',
    'Cognition (Variable)',
];
const HD_TYPE_SIGNATURE = {
    'Manifesting Generator': 'Satisfaction',
    Generator: 'Satisfaction',
    Manifestor: 'Peace',
    Projector: 'Success',
    Reflector: 'Surprise',
};
const HD_TYPE_NOT_SELF = {
    'Manifesting Generator': 'Frustration',
    Generator: 'Frustration',
    Manifestor: 'Anger',
    Projector: 'Bitterness',
    Reflector: 'Disappointment',
};
const HD_TYPE_POPULATION = {
    Generator: '~37%',
    'Manifesting Generator': '~33%',
    Projector: '~20%',
    Manifestor: '~9%',
    Reflector: '~1%',
};
function activationExport(activation, index, evidenceType) {
    return {
        side: activation.side,
        body: activation.body,
        longitude: activation.longitude,
        gate: activation.activation.gate,
        line: activation.activation.line,
        color: activation.activation.color,
        tone: activation.activation.tone,
        base: activation.activation.base,
        evidenceType,
        sourcePath: `${activation.side === 'Personality' ? 'personalityActivations' : 'designActivations'}[${index}]`,
    };
}
function blockedSection(blockedReason) {
    return {
        status: 'blocked',
        mechanicsSuppressed: true,
        suppressionReason: 'Calculation blocked: no normalized birth moment available.',
        timeContext: { personalityDateTime: null, designDateTime: null, designOffsetDays: null, birthTimeBasis: 'estimated-local-noon' },
        methodology: {
            engine: 'Unavailable: calculation blocked',
            frame: 'Unavailable: calculation blocked',
            designTimeMethod: 'Unavailable: calculation blocked',
            nodeMethod: 'Unavailable: calculation blocked',
            typeMethod: 'Unavailable: calculation blocked',
            authorityHierarchy: 'Unavailable: calculation blocked',
            profileMethod: 'Unavailable: calculation blocked',
            definitionMethod: 'Unavailable: calculation blocked',
        },
        personalityActivations: [],
        designActivations: [],
        mechanics: null,
        bodygraphReconstruction: null,
        referenceLookups: { signature: null, notSelfTheme: null, typePopulationShare: null, centerReferences: hdCenters.map((center) => ({ id: center.id, label: center.label, category: center.category })) },
        unsupportedFields: UNSUPPORTED_FIELDS,
        warnings: [],
        blockedReason,
    };
}
export function buildHumanDesignExport(pillar, experience) {
    const bodygraphData = pillar.humanDesignBodygraph;
    if (!bodygraphData) {
        return blockedSection([`No Human Design chart data is available for this pillar (status: ${pillar.status}).`, ...pillar.limitations]);
    }
    const { humanDesign, mechanicsSuppressed } = bodygraphData;
    if (humanDesign.status === 'blocked') {
        return blockedSection([...humanDesign.limitations, ...pillar.limitations]);
    }
    const birthMoment = experience.pillars.find((entry) => entry.id === 'western-astrology')?.westernAstrologyChart?.astrology.moment;
    const birthTimeBasis = birthMoment ? birthTimeBasisFromMoment(birthMoment) : (mechanicsSuppressed ? 'estimated-local-noon' : 'user-supplied');
    const personalityActivations = humanDesign.personalityActivations.map((activation, index) => activationExport(activation, index, mechanicsSuppressed ? 'estimated' : 'calculated'));
    const designActivations = humanDesign.designActivations.map((activation, index) => activationExport(activation, index, mechanicsSuppressed ? 'estimated' : 'calculated'));
    const mechanics = buildMechanics(humanDesign, mechanicsSuppressed);
    const bodygraphReconstruction = buildBodygraphReconstruction(humanDesign, mechanicsSuppressed);
    const type = !mechanicsSuppressed && humanDesign.type !== 'Unavailable' ? humanDesign.type : null;
    return {
        status: 'calculated',
        mechanicsSuppressed,
        suppressionReason: mechanicsSuppressed
            ? 'Birth time was not confirmed as user-supplied (12:00 local-noon estimate used); Type, Strategy, Authority, Profile, Definition, defined centers/channels, and the activated-gate list are suppressed rather than shown as falsely precise. Raw gate/line activations remain visible but are marked estimated.'
            : null,
        timeContext: {
            personalityDateTime: humanDesign.personalityDateTime,
            designDateTime: humanDesign.designDateTime,
            designOffsetDays: humanDesign.designOffsetDays,
            birthTimeBasis,
        },
        methodology: {
            engine: humanDesign.engine,
            frame: humanDesign.frame,
            designTimeMethod: 'Design moment solved for a solar longitude exactly 88 degrees before the Personality Sun using an iterative solar-speed correction.',
            nodeMethod: 'Locally derived osculating true lunar node (matches Swiss Ephemeris SE_TRUE_NODE convention); South Node is exactly 180 degrees opposite. Node line/gate never affects Type, Strategy, Authority, Definition, or Profile.',
            typeMethod: 'Derived deterministically from the completed-channel center graph: Sacral definition plus a real connected motor-to-Throat path distinguishes Generator/Manifesting Generator/Manifestor mechanics; Projector/Reflector follow from center definition absence.',
            authorityHierarchy: 'Resolved in order: Emotional/Solar Plexus, Sacral, Splenic, Ego Manifested, Self-Projected/Ego Projected (G/throat-linked), Mental/Environmental, or Lunar.',
            profileMethod: 'Personality Sun line / Design Sun line, e.g. "5/1".',
            definitionMethod: 'Connected components of the defined-center graph: Single, Split, Triple Split, Quadruple Split, or Multiple Split Definition depending on component count.',
        },
        personalityActivations,
        designActivations,
        mechanics,
        bodygraphReconstruction,
        referenceLookups: {
            signature: type ? HD_TYPE_SIGNATURE[type] ?? null : null,
            notSelfTheme: type ? HD_TYPE_NOT_SELF[type] ?? null : null,
            typePopulationShare: type ? HD_TYPE_POPULATION[type] ?? null : null,
            centerReferences: hdCenters.map((center) => ({ id: center.id, label: center.label, category: center.category })),
        },
        unsupportedFields: UNSUPPORTED_FIELDS,
        warnings: pillar.limitations,
        blockedReason: null,
    };
}
function buildMechanics(humanDesign, mechanicsSuppressed) {
    if (mechanicsSuppressed)
        return null;
    const personalityGates = new Set(humanDesign.personalityActivations.map((activation) => activation.activation.gate));
    const designGates = new Set(humanDesign.designActivations.map((activation) => activation.activation.gate));
    const personalityOnlyGates = [...personalityGates].filter((gate) => !designGates.has(gate)).sort((left, right) => left - right);
    const designOnlyGates = [...designGates].filter((gate) => !personalityGates.has(gate)).sort((left, right) => left - right);
    const dualActivatedGates = [...personalityGates].filter((gate) => designGates.has(gate)).sort((left, right) => left - right);
    const definedCenterSet = new Set(humanDesign.definedCenters);
    return {
        activatedGates: humanDesign.activatedGates,
        personalityOnlyGates,
        designOnlyGates,
        dualActivatedGates,
        definedChannels: humanDesign.definedChannels.map((channel) => ({ id: channel.id, gates: [...channel.gates], centers: [...channel.centers] })),
        definedCenters: humanDesign.definedCenters,
        undefinedCenters: hdCenters.map((center) => center.id).filter((id) => !definedCenterSet.has(id)),
        type: humanDesign.type,
        strategy: humanDesign.strategy,
        authority: humanDesign.authority,
        profile: humanDesign.profile,
        definition: humanDesign.definition,
        definitionGroups: humanDesign.definitionGroups.map((group) => ({ centers: group.centers, channelIds: group.channelIds })),
        motorToThroat: humanDesign.motorToThroat,
        motorToThroatPath: humanDesign.motorToThroatPath,
    };
}
function buildBodygraphReconstruction(humanDesign, mechanicsSuppressed) {
    if (mechanicsSuppressed)
        return null;
    const definedCenterSet = new Set(humanDesign.definedCenters);
    const definedChannelIds = new Set(humanDesign.definedChannels.map((channel) => channel.id));
    const personalityGates = new Set(humanDesign.personalityActivations.map((activation) => activation.activation.gate));
    const designGates = new Set(humanDesign.designActivations.map((activation) => activation.activation.gate));
    return {
        centers: hdCenters.map((center) => ({ id: center.id, label: center.label, defined: definedCenterSet.has(center.id) })),
        channels: hdChannels.map((channel) => ({ id: channel.id, defined: definedChannelIds.has(channel.id), gates: [...channel.gates] })),
        gates: humanDesign.activatedGates.map((gate) => ({
            gate,
            activatedBy: [
                ...(personalityGates.has(gate) ? ['Personality'] : []),
                ...(designGates.has(gate) ? ['Design'] : []),
            ],
        })),
    };
}
