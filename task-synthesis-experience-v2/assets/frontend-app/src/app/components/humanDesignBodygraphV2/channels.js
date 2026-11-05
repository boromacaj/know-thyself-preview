import { v2GateDock } from './gates.js?v=53c0693';
/**
 * All 36 channel routes: family, lane index, layer rank, mirror partner
 * (where the reference is structurally mirrored - left genuinely
 * unsymmetric where real Human Design topology itself is, e.g. G connects
 * to Spleen via gate 10 with no G<->SolarPlexus equivalent), and the two
 * cubic-Bezier control points for each route.
 *
 * Every control-point pair was generated against this module's own V2 gate
 * docks (gates.ts) and verified programmatically (24 samples per curve) to
 * keep real clearance from every center this channel does not itself
 * connect to (G checked against its true diamond shape, not its
 * conservative bounding box), plus zero self-intersection and no
 * control-point overshoot beyond 2.5x its own chord length. None of these
 * numbers are copied from V1's CHANNEL_CONTROLS - see this directory's
 * types.ts module comment for the full independence boundary.
 *
 * Calibration pass 1: every control-point x here carried the same 0.80
 * horizontal scale-toward-centerline correction described in geometry.ts's
 * module comment (dx-only; dy and the underlying route family/lane/layer
 * choices were untouched). Pass-1 snapshot preserved at
 * scratch-v2-verification/pass-01-channels.ts.
 *
 * Calibration pass 2: control points below are byte-for-byte unchanged from
 * pass 1 - channel curvature is explicitly out of scope this pass (per the
 * pass-2 brief: "update route endpoints only, do not calibrate channel
 * curvature yet"). Endpoints still move: v2BuildChannelPath() below looks
 * each gate's dock up from gates.ts at render time rather than storing it
 * here, so every route's start/end point already reflects gates.ts's newly
 * remeasured pass-2 dock positions. This is expected to produce visibly
 * stretched/awkward curves near whichever gates moved the most - that is
 * the known, deferred cost of this pass, not a bug.
 */
export const CHANNEL_LAYER_RANK = {
    'lower-exterior-arc': 0,
    'outer-lateral-arc': 1,
    'middle-lateral-arc': 2,
    'inner-lateral-arc': 3,
    'short-connector': 4,
    'central-spine': 5,
};
export const V2_CHANNEL_ROUTES = {
    '47-64': { id: '47-64', gates: [47, 64], centers: ['ajna', 'head'], family: 'central-spine', lane: -1, layerRank: 5, controls: [{ x: 318, y: 139.25 }, { x: 318, y: 125.75 }] },
    '24-61': { id: '24-61', gates: [24, 61], centers: ['ajna', 'head'], family: 'central-spine', lane: 0, layerRank: 5, controls: [{ x: 350, y: 139.25 }, { x: 350, y: 125.75 }] },
    '4-63': { id: '4-63', gates: [4, 63], centers: ['ajna', 'head'], family: 'central-spine', lane: 1, layerRank: 5, controls: [{ x: 382, y: 139.25 }, { x: 382, y: 125.75 }] },
    '17-62': { id: '17-62', gates: [17, 62], centers: ['ajna', 'throat'], family: 'central-spine', lane: -1, layerRank: 5, controls: [{ x: 318, y: 203.5 }, { x: 318, y: 230.5 }] },
    '23-43': { id: '23-43', gates: [23, 43], centers: ['throat', 'ajna'], family: 'central-spine', lane: 0, layerRank: 5, controls: [{ x: 350, y: 245.55 }, { x: 350, y: 231.45 }] },
    '11-56': { id: '11-56', gates: [11, 56], centers: ['ajna', 'throat'], family: 'central-spine', lane: 1, layerRank: 5, controls: [{ x: 382, y: 203.5 }, { x: 382, y: 230.5 }] },
    '7-31': { id: '7-31', gates: [7, 31], centers: ['g', 'throat'], family: 'central-spine', lane: -1, layerRank: 5, controls: [{ x: 323.2, y: 398.05 }, { x: 320.8, y: 374.95 }] },
    '1-8': { id: '1-8', gates: [1, 8], centers: ['g', 'throat'], family: 'central-spine', lane: 0, layerRank: 5, controls: [{ x: 350, y: 381.8 }, { x: 350, y: 366.2 }] },
    '13-33': { id: '13-33', gates: [13, 33], centers: ['g', 'throat'], family: 'central-spine', lane: 1, layerRank: 5, controls: [{ x: 376.8, y: 398.05 }, { x: 379.2, y: 374.95 }] },
    '5-15': { id: '5-15', gates: [5, 15], centers: ['sacral', 'g'], family: 'central-spine', lane: -1, layerRank: 5, controls: [{ x: 320.8, y: 561.05 }, { x: 323.2, y: 525.95 }] },
    '2-14': { id: '2-14', gates: [2, 14], centers: ['g', 'sacral'], family: 'central-spine', lane: 0, layerRank: 5, controls: [{ x: 350, y: 542.2 }, { x: 350, y: 569.8 }] },
    '29-46': { id: '29-46', gates: [29, 46], centers: ['sacral', 'g'], family: 'central-spine', lane: 1, layerRank: 5, controls: [{ x: 379.2, y: 561.05 }, { x: 376.8, y: 525.95 }] },
    '42-53': { id: '42-53', gates: [42, 53], centers: ['sacral', 'root'], family: 'central-spine', lane: -1, layerRank: 5, controls: [{ x: 318, y: 709 }, { x: 318, y: 727 }] },
    '3-60': { id: '3-60', gates: [3, 60], centers: ['sacral', 'root'], family: 'central-spine', lane: 0, layerRank: 5, controls: [{ x: 350, y: 709 }, { x: 350, y: 727 }] },
    '9-52': { id: '9-52', gates: [9, 52], centers: ['sacral', 'root'], family: 'central-spine', lane: 1, layerRank: 5, controls: [{ x: 382, y: 709 }, { x: 382, y: 727 }] },
    '25-51': { id: '25-51', gates: [25, 51], centers: ['g', 'ego'], family: 'short-connector', lane: 1, layerRank: 4, controls: [{ x: 414.48, y: 462.9 }, { x: 409.52, y: 490.1 }] },
    '21-45': { id: '21-45', gates: [21, 45], centers: ['ego', 'throat'], family: 'short-connector', lane: 1, layerRank: 4, controls: [{ x: 458.16, y: 472 }, { x: 429.84, y: 333 }] },
    '34-57': { id: '34-57', gates: [34, 57], centers: ['sacral', 'spleen'], family: 'inner-lateral-arc', lane: -1, layerRank: 3, controls: [{ x: 233.92, y: 609.9 }, { x: 199.68, y: 607.1 }] },
    '27-50': { id: '27-50', gates: [27, 50], centers: ['sacral', 'spleen'], family: 'inner-lateral-arc', lane: -2, layerRank: 3, controls: [{ x: 255.84, y: 649.9 }, { x: 230.56, y: 637.1 }] },
    '6-59': { id: '6-59', gates: [6, 59], centers: ['solarPlexus', 'sacral'], family: 'inner-lateral-arc', lane: 1, layerRank: 3, controls: [{ x: 491.84, y: 639.1 }, { x: 421.76, y: 647.9 }] },
    '37-40': { id: '37-40', gates: [37, 40], centers: ['solarPlexus', 'ego'], family: 'inner-lateral-arc', lane: 2, layerRank: 3, controls: [{ x: 517.52, y: 570.8 }, { x: 480.08, y: 569.2 }] },
    '20-34': { id: '20-34', gates: [20, 34], centers: ['throat', 'sacral'], family: 'middle-lateral-arc', lane: -1, layerRank: 2, controls: [{ x: 238.4, y: 425.9 }, { x: 240.8, y: 520.1 }] },
    '20-57': { id: '20-57', gates: [20, 57], centers: ['throat', 'spleen'], family: 'middle-lateral-arc', lane: -2, layerRank: 2, mirrorOf: '12-22', controls: [{ x: 156.44, y: 406.45 }, { x: 153.16, y: 492.55 }] },
    '12-22': { id: '12-22', gates: [12, 22], centers: ['throat', 'solarPlexus'], family: 'middle-lateral-arc', lane: 2, layerRank: 2, mirrorOf: '20-57', controls: [{ x: 543.56, y: 399.3 }, { x: 546.84, y: 488.7 }] },
    '26-44': { id: '26-44', gates: [26, 44], centers: ['ego', 'spleen'], family: 'middle-lateral-arc', lane: -3, layerRank: 2, controls: [{ x: 333.71, y: 597.6 }, { x: 192.69, y: 599.4 }] },
    '10-20': { id: '10-20', gates: [10, 20], centers: ['g', 'throat'], family: 'outer-lateral-arc', lane: -1, layerRank: 1, controls: [{ x: 282.36, y: 366.35 }, { x: 307.24, y: 356.65 }] },
    '10-34': { id: '10-34', gates: [10, 34], centers: ['g', 'sacral'], family: 'outer-lateral-arc', lane: -2, layerRank: 1, controls: [{ x: 253.16, y: 526.25 }, { x: 284.44, y: 560.75 }] },
    '10-57': { id: '10-57', gates: [10, 57], centers: ['g', 'spleen'], family: 'outer-lateral-arc', lane: -3, layerRank: 1, controls: [{ x: 163.2, y: 511.8 }, { x: 168.8, y: 551.2 }] },
    '16-48': { id: '16-48', gates: [16, 48], centers: ['throat', 'spleen'], family: 'outer-lateral-arc', lane: -4, layerRank: 1, mirrorOf: '35-36', controls: [{ x: 110.84, y: 382.6 }, { x: 158.76, y: 511.4 }] },
    '35-36': { id: '35-36', gates: [35, 36], centers: ['throat', 'solarPlexus'], family: 'outer-lateral-arc', lane: 4, layerRank: 1, mirrorOf: '16-48', controls: [{ x: 589.16, y: 380 }, { x: 541.24, y: 510 }] },
    '32-54': { id: '32-54', gates: [32, 54], centers: ['spleen', 'root'], family: 'lower-exterior-arc', lane: -1, layerRank: 0, mirrorOf: '39-55', controls: [{ x: 211.6, y: 684.3 }, { x: 256.4, y: 724.7 }] },
    '28-38': { id: '28-38', gates: [28, 38], centers: ['spleen', 'root'], family: 'lower-exterior-arc', lane: -2, layerRank: 0, mirrorOf: '19-49', controls: [{ x: 192.4, y: 732 }, { x: 247.6, y: 732 }] },
    '18-58': { id: '18-58', gates: [18, 58], centers: ['spleen', 'root'], family: 'lower-exterior-arc', lane: -3, layerRank: 0, mirrorOf: '30-41', controls: [{ x: 169.2, y: 762.7 }, { x: 234.8, y: 746.3 }] },
    '39-55': { id: '39-55', gates: [39, 55], centers: ['root', 'solarPlexus'], family: 'lower-exterior-arc', lane: 1, layerRank: 0, mirrorOf: '32-54', controls: [{ x: 432.4, y: 744.6 }, { x: 515.6, y: 677.4 }] },
    '19-49': { id: '19-49', gates: [19, 49], centers: ['root', 'solarPlexus'], family: 'lower-exterior-arc', lane: 2, layerRank: 0, mirrorOf: '28-38', controls: [{ x: 435.6, y: 788.1 }, { x: 508.4, y: 662.9 }] },
    '30-41': { id: '30-41', gates: [30, 41], centers: ['solarPlexus', 'root'], family: 'lower-exterior-arc', lane: 3, layerRank: 0, mirrorOf: '18-58', controls: [{ x: 530.8, y: 762.7 }, { x: 465.2, y: 746.3 }] },
};
export function v2ChannelRoute(channelId) {
    const route = V2_CHANNEL_ROUTES[channelId];
    if (!route)
        throw new Error(`Missing V2 BodyGraph route for channel ${channelId}.`);
    return route;
}
/**
 * The hidden dock for a gate IS its V2_CENTER_GATE_LAYOUT point (gates.ts) -
 * already fully concealed by paint order alone (the channel layer renders
 * before the center layer; see renderer.ts), the same mechanism V1 uses.
 * See gates.ts's own module comment for why label and dock are the same
 * point in V2 (no crowding legacy to correct yet).
 */
export function v2BuildChannelPath(channelId) {
    const route = v2ChannelRoute(channelId);
    const start = v2GateDock(route.gates[0]);
    const end = v2GateDock(route.gates[1]);
    const [c1, c2] = route.controls;
    return `M ${start.x} ${start.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`;
}
export function v2ChannelCubicPointAt(channelId, t) {
    const route = v2ChannelRoute(channelId);
    const start = v2GateDock(route.gates[0]);
    const end = v2GateDock(route.gates[1]);
    const [c1, c2] = route.controls;
    const mt = 1 - t;
    const point = {
        x: mt ** 3 * start.x + 3 * mt ** 2 * t * c1.x + 3 * mt * t ** 2 * c2.x + t ** 3 * end.x,
        y: mt ** 3 * start.y + 3 * mt ** 2 * t * c1.y + 3 * mt * t ** 2 * c2.y + t ** 3 * end.y,
    };
    const tangent = {
        x: 3 * mt ** 2 * (c1.x - start.x) + 6 * mt * t * (c2.x - c1.x) + 3 * t ** 2 * (end.x - c2.x),
        y: 3 * mt ** 2 * (c1.y - start.y) + 6 * mt * t * (c2.y - c1.y) + 3 * t ** 2 * (end.y - c2.y),
    };
    return { point, angle: (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI };
}
