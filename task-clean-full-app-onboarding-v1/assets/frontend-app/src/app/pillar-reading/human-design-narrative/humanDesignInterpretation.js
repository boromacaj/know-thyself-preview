import { hdCenters } from '../../human-design/data/hdCenters.js?v=f9ab0a6';
import { hdChannels } from '../../human-design/data/hdChannels.js?v=f9ab0a6';
/** The engine's own nine, so a centre key can never drift from the table that emits it. */
export const CENTER_IDS = hdCenters.map((center) => center.id);
const CENTER_BY_ID = new Map(hdCenters.map((center) => [center.id, center]));
const FUNCTION_BY_CENTER = {
    head: 'awareness',
    ajna: 'awareness',
    spleen: 'awareness',
    throat: 'expression',
    g: 'direction',
    ego: 'drive',
    solarPlexus: 'drive',
    sacral: 'drive',
    root: 'drive',
};
export const CENTER_FUNCTIONS = ['drive', 'awareness', 'expression', 'direction'];
/* ------------------------------------------------------------- mechanics -- */
const AUTHORITY_KIND = {
    'Emotional / Solar Plexus': 'emotional',
    Sacral: 'somatic',
    Splenic: 'somatic',
    'Ego Manifested': 'relational',
    'Ego Projected': 'relational',
    'Self-Projected': 'relational',
    'Mental / Environmental': 'environmental',
    Lunar: 'lunar',
};
const AUTHORITY_CENTER = {
    'Emotional / Solar Plexus': 'solarPlexus',
    Sacral: 'sacral',
    Splenic: 'spleen',
    'Ego Manifested': 'ego',
    'Ego Projected': 'ego',
    'Self-Projected': 'g',
    'Mental / Environmental': null,
    Lunar: null,
};
const INITIATION = {
    'Manifesting Generator': 'after-response',
    Generator: 'after-response',
    Manifestor: 'direct',
    Projector: 'on-recognition',
    Reflector: 'over-a-cycle',
};
/**
 * The open centre whose noise most resembles each authority's signal.
 *
 * Only two of these are worth naming and both are named for the same reason:
 * an open centre amplifies what it takes in, and the amplified version of
 * thinking or of feeling is the thing readers mistake for having decided. An
 * open Ajna manufactures certainty; an open Solar Plexus manufactures urgency.
 * The rest of the table is deliberately empty - a confusion nobody has is not
 * something to warn about.
 */
function confusableCenter(authority, open) {
    if (authority !== 'Mental / Environmental' && open.has('ajna'))
        return 'ajna';
    if (AUTHORITY_KIND[authority] === 'somatic' && open.has('solarPlexus'))
        return 'solarPlexus';
    return null;
}
/**
 * The shape of a profile, from its two lines.
 *
 * A 6th line anywhere makes the profile `staged`, because the tradition reads
 * the 6 in three life phases and that outranks any pairing. Otherwise the pair
 * is `opposed` when one line is drawn outward and the other inward - the 1 and
 * the 2 want ground and privacy, the 3 and the 5 want contact and trial - and
 * `reinforcing` when both pull the same way.
 */
function profileShape(conscious, unconscious) {
    if (conscious === 6 || unconscious === 6)
        return 'staged';
    const inward = (line) => line === 1 || line === 2;
    return inward(conscious) === inward(unconscious) ? 'reinforcing' : 'opposed';
}
function parseProfile(profile) {
    const match = /^([1-6])\/([1-6])$/.exec((profile ?? '').trim());
    if (!match)
        return null;
    return {
        conscious: Number(match[1]),
        unconscious: Number(match[2]),
    };
}
/**
 * EDITORIAL: what makes one channel worth naming before another.
 *
 * These weights are this project's convention for ordering a list, not a
 * ranking the tradition publishes. They are ordinal only - the plan reads the
 * ORDER and never the number - and they are set so that the three structural
 * reasons cannot be outvoted by the cosmetic one: a channel that completes the
 * authority centre outranks a channel that merely reaches the Throat.
 */
const SALIENCE = { authority: 4, motorPath: 3, throat: 1 };
function rankChannels(channels, authorityCenter, motorPath, groups) {
    const onPath = new Set(motorPath);
    return channels
        .map((channel) => {
        const carriesAuthority = authorityCenter !== null && channel.centers.includes(authorityCenter);
        /* On the path means BOTH ends are: a channel with one foot on the route
           is not carrying the route. */
        const carriesMotorPath = motorPath.length > 0 && channel.centers.every((center) => onPath.has(center));
        const reachesThroat = channel.centers.includes('throat');
        return {
            id: channel.id,
            gates: channel.gates,
            centers: channel.centers,
            carriesAuthority,
            carriesMotorPath,
            reachesThroat,
            group: Math.max(0, groups.findIndex((group) => group.centers.includes(channel.centers[0]))),
            salience: (carriesAuthority ? SALIENCE.authority : 0)
                + (carriesMotorPath ? SALIENCE.motorPath : 0)
                + (reachesThroat ? SALIENCE.throat : 0),
        };
    })
        /* Ties break on the channel id so two runs of the same chart cannot
           disagree about the order of two equally weighted channels. */
        .sort((a, b) => b.salience - a.salience || a.id.localeCompare(b.id));
}
/**
 * The gates that would close a split.
 *
 * A bridging gate is one half of a channel whose two centres sit in two
 * DIFFERENT definition groups, with this chart holding neither end - activate
 * either and the groups would join. It is computed from the channel table and
 * the chart's own groups, so it is as deterministic as the definition it
 * explains, and it is what lets a Split be described concretely instead of as
 * a label.
 */
function bridgeGates(groups, activated, channelTable) {
    if (groups.length < 2)
        return [];
    const groupOf = new Map();
    groups.forEach((group, index) => group.centers.forEach((center) => groupOf.set(center, index)));
    const gates = new Set();
    for (const channel of channelTable) {
        const [leftCenter, rightCenter] = channel.centers;
        const left = groupOf.get(leftCenter);
        const right = groupOf.get(rightCenter);
        if (left === undefined || right === undefined || left === right)
            continue;
        for (const gate of channel.gates)
            if (!activated.has(gate))
                gates.add(gate);
    }
    return [...gates].sort((a, b) => a - b);
}
/* ------------------------------------------------------------------ read -- */
const sunLine = (activations) => activations.find((activation) => activation.body === 'Sun')?.activation.line ?? null;
/**
 * The model, or null when there is nothing to interpret.
 *
 * NULL IS THE UNKNOWN-TIME ANSWER, and it is the whole of it. A chart built on
 * the engine's 12:00 fallback is a real calculation of the wrong moment, and
 * every mechanic below - Type, Authority, Profile, the graph itself - would be
 * derived from it without a trace of the fact in the values. So the refusal
 * lives HERE, above every voice and every section, where nothing downstream can
 * soften it into "approximate": with no birth time there is no interpretation
 * to narrate, and the reading says so in one paragraph instead.
 */
export function interpretHumanDesign(data) {
    if (!data)
        return null;
    const { humanDesign: hd, mechanicsSuppressed } = data;
    if (mechanicsSuppressed)
        return null;
    if (hd.status !== 'calculated')
        return null;
    if (hd.type === 'Unavailable' || hd.strategy === 'Unavailable' || hd.authority === 'Unavailable')
        return null;
    const precision = data.timePrecision ?? 'exact';
    /* Belt and braces with the check above: an unknown precision must never reach
       a narrative even if some future caller forgets to set mechanicsSuppressed. */
    if (precision === 'unknown')
        return null;
    const definition = hd.definition === 'Unavailable' ? 'No Definition' : hd.definition;
    const definedSet = new Set(hd.definedCenters);
    const openSet = new Set(CENTER_IDS.filter((id) => !definedSet.has(id)));
    const channelsByCenter = new Map();
    for (const channel of hd.definedChannels) {
        for (const center of channel.centers) {
            channelsByCenter.set(center, [...(channelsByCenter.get(center) ?? []), channel.id]);
        }
    }
    const centers = CENTER_IDS.map((id) => {
        const definitionRow = CENTER_BY_ID.get(id);
        return {
            id,
            label: definitionRow?.label ?? id,
            category: definitionRow?.category ?? 'awareness',
            fn: FUNCTION_BY_CENTER[id],
            defined: definedSet.has(id),
            channels: channelsByCenter.get(id) ?? [],
        };
    });
    const functions = CENTER_FUNCTIONS.map((fn) => {
        const members = centers.filter((center) => center.fn === fn);
        const defined = members.filter((center) => center.defined);
        const open = members.filter((center) => !center.defined);
        return {
            fn,
            defined,
            open,
            state: open.length === 0 ? 'all-defined' : defined.length === 0 ? 'all-open' : 'mixed',
        };
    });
    /* Largest group first: the reading speaks of "the larger part of the graph"
       and that phrase has to mean something stable. */
    const groups = [...hd.definitionGroups]
        .map((group) => ({ centers: group.centers, channels: group.channelIds }))
        .sort((a, b) => b.centers.length - a.centers.length || a.centers[0].localeCompare(b.centers[0]));
    const authority = hd.authority;
    const authorityCenter = AUTHORITY_CENTER[authority];
    const type = hd.type;
    const parsed = parseProfile(hd.profile);
    const consciousLine = parsed?.conscious ?? sunLine(hd.personalityActivations);
    const unconsciousLine = parsed?.unconscious ?? sunLine(hd.designActivations);
    return {
        operating: {
            type,
            strategy: hd.strategy,
            sacralPowered: definedSet.has('sacral'),
            motorToThroat: hd.motorToThroat,
            motorPath: hd.motorToThroatPath,
            initiation: INITIATION[type],
        },
        decision: {
            authority,
            kind: AUTHORITY_KIND[authority],
            center: authorityCenter,
            needsTime: AUTHORITY_KIND[authority] === 'emotional' || AUTHORITY_KIND[authority] === 'lunar',
            confusableWith: confusableCenter(authority, openSet),
        },
        social: consciousLine && unconsciousLine
            ? {
                label: `${consciousLine}/${unconsciousLine}`,
                conscious: consciousLine,
                unconscious: unconsciousLine,
                shape: profileShape(consciousLine, unconsciousLine),
            }
            : null,
        energy: {
            definition,
            groups,
            centers,
            functions,
            definedCount: definedSet.size,
            openCount: openSet.size,
            bridgeGates: bridgeGates(groups, new Set(hd.activatedGates), hdChannels),
        },
        connections: rankChannels(hd.definedChannels, authorityCenter, hd.motorToThroatPath, groups),
        feedback: { signature: hd.signature, notSelf: hd.notSelfTheme },
        cross: hd.incarnationCross?.angle
            ? { angle: hd.incarnationCross.angle, gateNotation: hd.incarnationCross.gateNotation }
            : null,
        time: { precision, window: data.timeWindow ?? null },
    };
}
