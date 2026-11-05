import { SEQUENCE_SLOT_SECONDS, fastPingRhythm, pingCycleSeconds } from '../premium-earth/heroSonarSequence.js?v=53c0693';
/*
 * THE HUMAN DESIGN HERO - ITS SONAR AND ITS CONTENT KEYS, IN ONE TABLE.
 *
 * THE BODYGRAPH IS STATIC. THE ENERGY MOVES THROUGH LIGHT. The nine centres, their gate numbers, their glass, the mask the veins run under, the frost and the hit regions never move: there is no
 * float, and nothing inside the graph's own <svg> is animated at all. (V1 to V1.5 floated the centres with one animation per centre on four separate elements, and on a physical Samsung the four
 * came apart; V1.6 removed the float and drew four stepped opacity rings per centre, which read as outlines switching on and off, not as a wave.)
 *
 * THE ONLY MOVEMENT IS A SONAR WAVE, and it is the BaZi hero's, not a new one (app/premium-earth/baziSonarTargets.ts, through the shared primitive in heroSonarSequence.ts):
 *   - ONE ring per centre: the centre's own silhouette (a triangle, a square, the diamond), in that centre's colour, as a thin bright line with a soft line of glow under it;
 *   - it GROWS with the standard's ease-out (cubic-bezier(0.2, 0.62, 0.3, 1), kt-sonar-grow) while it FADES linearly (kt-sonar-fade), peak 0.42, over the Western Astrology wave's own 1.12 s (a wave starts every 0.225 s, so they overlap - the fast rhythm below): ONE smooth,
 *     continuous luminous wave that leaves the centre and fades, the Astrology capsules' envelope and the BaZi circles' ring;
 *   - the nine centres start their waves down the body, 0.225 s apart, round and round: Head, Ajna, Throat, G, Heart, Sacral, Spleen, Solar Plexus, Root - the earlier waves go on fading while the next begin - and a rest after the last wave has finished (a cycle of 3.72 s).
 *   The ring is NOT a path inside the graph. It is a small decorative <svg> of its own, laid over the graph at the HTML level and sized to the centre, whose opacity and scale (a CSS transform on that
 *   element, as the BaZi petals' rings are) are animated: the technique that is proven on the owner's Samsung. The graph underneath is never given a transform, a scale, a mask or a clip change.
 * Nothing here depends on a measurement taken elsewhere in the app (no frame probe, no device class): those stilled the V1.2 to V1.4 hero on the owner's phone.
 */
export const HD_CENTER_IDS = ['head', 'ajna', 'throat', 'g', 'ego', 'solarPlexus', 'sacral', 'spleen', 'root'];
/** The sonar's order, the owner's: down the body - Head, Ajna, Throat, G, Heart, Sacral, Spleen, Solar Plexus, Root. */
export const HD_SONAR_ORDER = ['head', 'ajna', 'throat', 'g', 'ego', 'sacral', 'spleen', 'solarPlexus', 'root'];
/** A centre's turn in the order, 0 to 8. */
export const hdSonarSlot = (center) => HD_SONAR_ORDER.indexOf(center);
/*
 * THE SCAN'S TIMING: THE FAST PING RHYTHM (Hero Sonar Rhythm V2.1). The ring looks as it was approved; its RHYTHM is the Western Astrology capsules' cadence: a centre's wave starts every 0.225 s after the one before it
 * (Head 0, Ajna 0.225 ... Root 1.8 s), each wave is the Astrology wave (1.12 s: rises in 0.224 s, fades in 0.896 s) and the waves overlap on purpose - and the scan rests 0.8 s after the
 * Root's wave has finished before it begins again (a cycle of 3.72 s). The numbers are heroSonarSequence.ts's FAST_PING, once, for this hero and for Numerology; BaZi keeps its own 1.4 s slot.
 */
export const HD_SONAR_RHYTHM = fastPingRhythm(HD_CENTER_IDS.length);
/** Seconds from the start of one centre's ping to the start of the next. */
export const HD_SONAR_SLOT_SECONDS = HD_SONAR_RHYTHM.startInterval;
export const HD_SONAR_CYCLE_SECONDS = pingCycleSeconds(HD_SONAR_RHYTHM);
/** How bright a ring is at its brightest (the KT standard's own peak, kt-sonar-fade) and how bright the answer to a tap is (the standard's looked-at / pressed peak). */
export const HD_SONAR_PEAK = 0.42;
export const HD_TAP_PEAK = 0.52;
/** How far a ring travels beyond its centre's outline, in graph units, ON AVERAGE (the mean of its travel at the sides and at the corners: the ring is a scaled copy of the outline, so a corner moves further than a side). A phone draws a unit as about 0.59 CSS px, so 11 units are about 6.5 px - the BaZi circles' 6 to 8 px. */
export const HD_WAVE_TRAVEL_UNITS = 11;
/** The tap's wave is one turn, once. */
export const HD_TAP_SECONDS = SEQUENCE_SLOT_SECONDS;
/** The renderer's own state names ('defined', 'undefined', 'suppressed') as the reading's: an undefined centre is OPEN; a suppressed one is UNCERTAIN (the birth time cannot settle it). */
export function centerStateFromRenderer(state) {
    return state === 'defined' ? 'defined' : state === 'undefined' ? 'open' : 'uncertain';
}
export const hdCenterConceptKey = (center, state) => `hd-center-${center}-${state}`;
/** How far the hit region reaches beyond a centre's outline, in graph units (6 units, about 3.5 px): wide enough for a thumb, narrow enough that no two centres' regions meet. */
export const HD_HIT_PADDING = 6;
/*
 * THE WAVE'S OUTLINE. The centre's outline is a handful of straight sides and rounded corners (M, L, C and Z only); it is flattened to a polygon (the curves sampled finely) and the ring is that
 * polygon, drawn in a box of its own that is centred on the centre's INCENTRE - the point farthest from every side - so that scaling the ring about its own middle moves every side outward by
 * (scale - 1) x the distance from the incentre to that side: the ring leaves the centre evenly on all sides, whatever the shape.
 */
export function flattenOutline(d, step = 0.1) {
    const tokens = d.match(/[MLCZ]|-?\d+(?:\.\d+)?/g) ?? [];
    const points = [];
    let i = 0;
    let cx = 0;
    let cy = 0;
    while (i < tokens.length) {
        const command = tokens[i++];
        if (command === 'M' || command === 'L') {
            cx = Number(tokens[i++]);
            cy = Number(tokens[i++]);
            points.push([cx, cy]);
        }
        else if (command === 'C') {
            const [x1, y1, x2, y2, x3, y3] = [0, 1, 2, 3, 4, 5].map((k) => Number(tokens[i + k]));
            i += 6;
            for (let t = step; t <= 1.0001; t += step) {
                const u = 1 - t;
                points.push([u ** 3 * cx + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t ** 3 * x3, u ** 3 * cy + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t ** 3 * y3]);
            }
            cx = x3;
            cy = y3;
        }
    }
    return points;
}
/** The distance from a point to a segment. */
function distanceToSegment(p, a, b) {
    const vx = b[0] - a[0];
    const vy = b[1] - a[1];
    const lengthSquared = vx * vx + vy * vy;
    const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / lengthSquared));
    return Math.hypot(p[0] - (a[0] + t * vx), p[1] - (a[1] + t * vy));
}
/** Whether a point is inside a polygon (even-odd). */
function insidePolygon(p, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const a = polygon[i];
        const b = polygon[j];
        if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0])
            inside = !inside;
    }
    return inside;
}
/** The incentre of an outline (a grid search, then a refinement: exact to a twentieth of a unit, which is far finer than a pixel) and the numbers the wave is sized from. */
export function outlineWave(d) {
    const raw = flattenOutline(d, 0.1);
    const polygon = raw.filter((p, i) => { const q = raw[(i + raw.length - 1) % raw.length]; return Math.hypot(p[0] - q[0], p[1] - q[1]) > 0.01; });
    const xs = polygon.map((p) => p[0]);
    const ys = polygon.map((p) => p[1]);
    const clearance = (p) => {
        let best = Infinity;
        for (let i = 0; i < polygon.length; i += 1)
            best = Math.min(best, distanceToSegment(p, polygon[i], polygon[(i + 1) % polygon.length]));
        return best;
    };
    let best = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
    let bestClearance = insidePolygon(best, polygon) ? clearance(best) : -1;
    for (let step = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 8; step > 0.05; step /= 2) {
        const around = best;
        for (let dx = -4; dx <= 4; dx += 1) {
            for (let dy = -4; dy <= 4; dy += 1) {
                const candidate = [around[0] + dx * step, around[1] + dy * step];
                if (!insidePolygon(candidate, polygon))
                    continue;
                const value = clearance(candidate);
                if (value > bestClearance) {
                    bestClearance = value;
                    best = candidate;
                }
            }
        }
    }
    const reach = Math.max(...polygon.map((p) => Math.hypot(p[0] - best[0], p[1] - best[1])));
    return { incenter: best, inradius: bestClearance, reach, polygon };
}
