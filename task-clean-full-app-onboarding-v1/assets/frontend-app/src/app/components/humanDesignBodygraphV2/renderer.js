import { hdCenters } from '../../human-design/data/hdCenters.js?v=f9ab0a6';
import { hdChannels } from '../../human-design/data/hdChannels.js?v=f9ab0a6';
import { V2_CENTER_GEOMETRY, V2_VIEWBOX } from './geometry.js?v=f9ab0a6';
import { V2_CENTER_GATE_LAYOUT } from './gates.js?v=f9ab0a6';
import { CHANNEL_LAYER_RANK, v2BuildChannelPath, v2ChannelCubicPointAt, v2ChannelRoute } from './channels.js?v=f9ab0a6';
import { V2_THEME } from './theme.js?v=f9ab0a6';
function gateSideMap(data) {
    const { humanDesign, mechanicsSuppressed } = data;
    const map = new Map();
    if (mechanicsSuppressed)
        return map;
    const designGates = new Set(humanDesign.designActivations.map((a) => a.activation.gate));
    const personalityGates = new Set(humanDesign.personalityActivations.map((a) => a.activation.gate));
    for (const gate of new Set([...designGates, ...personalityGates])) {
        const inDesign = designGates.has(gate);
        const inPersonality = personalityGates.has(gate);
        map.set(gate, inDesign && inPersonality ? 'mixed' : inDesign ? 'design' : 'personality');
    }
    return map;
}
function sideColor(side) {
    if (side === 'design')
        return V2_THEME.channelDesignOnly;
    if (side === 'personality')
        return V2_THEME.channelPersonalityOnly;
    if (side === 'mixed')
        return V2_THEME.channelMixed;
    return V2_THEME.channelInactive;
}
function channelRenderState(channelId, gates, sides) {
    const sideA = sides.get(gates[0]) ?? null;
    const sideB = sides.get(gates[1]) ?? null;
    if (!sideA && !sideB)
        return { status: 'inactive', color: V2_THEME.channelInactive };
    if (sideA && sideB) {
        const combined = sideA === sideB && sideA !== 'mixed' ? sideA : 'mixed';
        return { status: 'fully-active', color: sideColor(combined) };
    }
    const activeEnd = sideA ? 'start' : 'end';
    return { status: 'half-active', color: sideColor(sideA ?? sideB), activeEnd };
}
function renderV2Center(center, isDefined, isSuppressed) {
    const geometry = V2_CENTER_GEOMETRY[center];
    const fill = isSuppressed ? 'rgba(0,0,0,0.02)' : isDefined ? V2_THEME.centerDefinedFill : V2_THEME.centerUndefinedFill;
    return `<path class="hdv2-center" data-v2-center-id="${center}" data-v2-center-state="${isDefined && !isSuppressed ? 'defined' : 'undefined'}" data-v2-center-bounds="${geometry.bounds.x},${geometry.bounds.y},${geometry.bounds.width},${geometry.bounds.height}" d="${geometry.path}" fill="${fill}" stroke="${V2_THEME.centerStroke}" stroke-width="1.5" />`;
}
function renderV2GateLabels(center, activatedGates) {
    return V2_CENTER_GATE_LAYOUT[center].map((dock) => {
        const isActive = activatedGates.has(dock.gate);
        return `<text class="hdv2-gate${isActive ? ' hdv2-gate--active' : ''}" data-v2-gate="${dock.gate}" data-v2-gate-center-id="${center}" x="${dock.x}" y="${dock.y}" text-anchor="middle" dominant-baseline="middle" font-size="${V2_THEME.gateFontSize}" fill="${isActive ? V2_THEME.gateLabelActive : V2_THEME.gateLabel}">${dock.gate}</text>`;
    }).join('');
}
function renderV2Channel(channelId, state) {
    const d = v2BuildChannelPath(channelId);
    const width = state.status === 'inactive' ? V2_THEME.channelStrokeWidth : V2_THEME.channelActiveStrokeWidth;
    const dash = state.status === 'half-active'
        ? ` pathLength="100" stroke-dasharray="50 50" stroke-dashoffset="${state.activeEnd === 'start' ? '0' : '-50'}"`
        : '';
    return `<path class="hdv2-channel hdv2-channel--${state.status}" data-v2-channel-id="${channelId}" data-v2-channel-status="${state.status}" data-v2-channel-path="canonical" d="${d}" stroke="${state.color}" stroke-width="${width}" fill="none"${dash} />`;
}
function renderV2FlowArrows(channelId, state) {
    if (state.status === 'inactive')
        return '';
    const progresses = state.status === 'fully-active' ? [0.34, 0.66] : [state.activeEnd === 'start' ? 0.26 : 0.74];
    return progresses.map((progress) => {
        const { point, angle } = v2ChannelCubicPointAt(channelId, progress);
        return `<path class="hdv2-flow-arrow" data-v2-channel-id="${channelId}" d="M -4 -5 L 6 0 L -4 5 Z" transform="translate(${point.x} ${point.y}) rotate(${angle})" fill="${state.color}" />`;
    }).join('');
}
export function renderHumanDesignBodygraphV2(data) {
    const { humanDesign, mechanicsSuppressed } = data;
    const definedCenters = new Set(mechanicsSuppressed ? [] : humanDesign.definedCenters);
    const activatedGates = new Set(mechanicsSuppressed ? [] : humanDesign.activatedGates);
    const sides = gateSideMap(data);
    const states = new Map();
    for (const channel of hdChannels)
        states.set(channel.id, channelRenderState(channel.id, channel.gates, sides));
    const byLayerRank = (a, b) => v2ChannelRoute(a).layerRank - v2ChannelRoute(b).layerRank;
    const inactiveIds = hdChannels.filter((c) => states.get(c.id)?.status === 'inactive').map((c) => c.id).sort(byLayerRank);
    const activeIds = hdChannels.filter((c) => states.get(c.id)?.status !== 'inactive').map((c) => c.id).sort(byLayerRank);
    const centers = hdCenters.map((c) => renderV2Center(c.id, definedCenters.has(c.id), mechanicsSuppressed)).join('');
    const gates = hdCenters.map((c) => renderV2GateLabels(c.id, activatedGates)).join('');
    const inactiveChannels = inactiveIds.map((id) => renderV2Channel(id, states.get(id))).join('');
    const activeChannels = activeIds.map((id) => renderV2Channel(id, states.get(id))).join('');
    const arrows = hdChannels.map((c) => renderV2FlowArrows(c.id, states.get(c.id))).join('');
    return `<svg class="human-design-bodygraph-v2" viewBox="0 0 ${V2_VIEWBOX.width} ${V2_VIEWBOX.height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Human Design 2.0 Experimental BodyGraph${mechanicsSuppressed ? ', mechanics suppressed because birth time is estimated' : ''}">
    <rect width="${V2_VIEWBOX.width}" height="${V2_VIEWBOX.height}" fill="${V2_THEME.background}" />
    <g class="hdv2-channel-layer hdv2-channel-layer--inactive">${inactiveChannels}</g>
    <g class="hdv2-channel-layer hdv2-channel-layer--active">${activeChannels}</g>
    <g class="hdv2-center-layer">${centers}</g>
    <g class="hdv2-gate-layer">${gates}</g>
    <g class="hdv2-flow-layer">${arrows}</g>
  </svg>`;
}
export { CHANNEL_LAYER_RANK };
