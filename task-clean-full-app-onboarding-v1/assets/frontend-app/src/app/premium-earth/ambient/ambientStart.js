import { DEGREES, FOV_DEGREES, MOON, cameraFor, moonFor } from './ambientMath.js?v=f9ab0a6';
import { moonSilhouette } from './ambientMoonMask.js?v=f9ab0a6';
import { SUN_REFERENCE_DEFAULT, sunSceneFor } from './ambientSun.js?v=f9ab0a6';
/*
 * THE SCENE'S START COMPOSITION: THE SUN AND THE MOON, BOTH IN VIEW, CLEAR OF THE EARTH AND OF THE INTERFACE, WHEN THE SCENE FIRST SETTLES.
 *
 * Why it is needed. The Sun is fixed on the stars' sky and the Moon goes round on its path; both start wherever their defaults happen to put them, and the planet's idle
 * turn then carries the sky past the lens: measured on the Main Menu, the default Sun (upper left, 1.5 Earth radii out) slid off the left edge of a 412 px phone in about
 * two seconds (36 px a second at the menu's idle rate), and both objects started BEHIND the glass menu cards - a soft glow and a blurred blob - even on a wide screen with
 * both sides empty. "Sometimes missing" was the clock: nothing decided where they were at the moment the owner first looks.
 *
 * What it decides, once, at the moment the scene first settles (the Sun's anchor): WHERE THE SUN IS PUT (an angle and a distance from the view's centre - SunReference) and
 * WHERE ON ITS PATH THE MOON STARTS (an angle on the orbit - moonFor's `startPhase`). Nothing else: not the Sun's size, shader, flare or masks; not the Moon's radius, path,
 * pace or material; not the planet's turn, inertia or gestures; not the light (the Earth's light follows the Sun wherever it is put, by itself).
 *
 * How. A fixed set of candidates (the defaults first) is tried against the scene as the product actually draws it - the real camera (cameraFor), the real Sun
 * (sunSceneFor), the real Moon (moonFor and its silhouette) - at the start AND after LEAD seconds of the planet's idle turn, because an object that is in view at the first
 * frame and gone two seconds later has not started in view. Hard rules: inside the screen, clear of the Earth's disc (the Sun with room for its flare to read), not under the
 * profile or QA pills, the Sun and the Moon apart. Soft preferences: the Sun in free space - the header band, or either side of the menu column where the screen is wide
 * enough to have a side - rather than behind the glass; and the least departure from the approved defaults (a Moon that already starts well is not moved).
 * The result is a pure function of the scene's size and framing: the same screen gives the same start, every time, with no clock, no random and no DOM read in it.
 * With reduced motion the planet does not turn, so only the first frame is held to the rules. If no candidate passes (a screen no menu is made for) the defaults stand.
 *
 * THE INTERFACE IS A MODEL, AND SAYS SO. The ambient layer cannot see the menu, so its footprint is stated from the menu's own CSS (tests/ambientStart.test.mjs reads that CSS
 * and holds the numbers): a column min(width - 24, 560) wide, centred, from 72 px down; a profile pill 12 px from the right and 20 from the top, up to about 130 px wide; the QA pill at
 * the top left (profileShell.ts, qaProfilePresetMenu.ts). The cards are glass - an object behind them is seen, blurred - so "behind the cards" is a preference, not a ban; the pills are opaque, so under them is a ban.
 *
 * The Moon's path (the reference's) lies wholly inside the menu column on every screen measured, so the Moon cannot be put in free space without changing the path, which is not
 * this task: it is chosen to be seen through the glass, clear of the Earth and the pills. Pure, so a test can hold it.
 */
/** Seconds of the planet's idle turn the start has to survive: the owner's first look, the entrance fade (0.7 s) and a few seconds of reading the scene. */
export const START_LEAD_SECONDS = 4;
/** The menu's footprint, in CSS px, from its CSS (menuExperience.ts, profileShell.ts). */
export const MENU_FOOTPRINT = Object.freeze({
    columnMaxWidth: 560,
    gutter: 12,
    /** The header band: where the pills are, above the first card. */
    headerHeight: 72,
    /** profileShell.ts: top 20, right 12, 38 tall, at most 46vw wide - modelled at the smaller of that and 130 px (a first name of about twelve letters; "Boris" is 85, about 4.5 px a letter). */
    profilePill: Object.freeze({ right: 12, top: 20, height: 38, widthShare: 0.46, widthCap: 130 }),
    qaPill: Object.freeze({ left: 4, top: 16, right: 64, bottom: 62 }),
});
export function footprintFor(width) {
    const { columnMaxWidth, gutter, headerHeight, profilePill, qaPill } = MENU_FOOTPRINT;
    const columnWidth = Math.min(width - 2 * gutter, columnMaxWidth);
    const left = (width - columnWidth) / 2;
    const pillWidth = Math.min(width * profilePill.widthShare, profilePill.widthCap);
    return {
        column: [left, left + columnWidth],
        headerHeight,
        pills: [
            [width - profilePill.right - pillWidth, profilePill.top, width - profilePill.right, profilePill.top + profilePill.height],
            [qaPill.left, qaPill.top, qaPill.right, qaPill.bottom],
        ],
    };
}
const inside = (b, width, height, margin) => b.x - margin >= 0 && b.x + margin <= width && b.y - margin >= 0 && b.y + margin <= height;
const overlaps = (b, [left, top, right, bottom], pad) => b.x + b.r + pad > left && b.x - b.r - pad < right && b.y + b.r + pad > top && b.y - b.r - pad < bottom;
/** The Sun candidates: every 5 degrees round, seven distances out; the approved default is tried FIRST so that it wins every tie. */
const SUN_ANGLES = Array.from({ length: 72 }, (_, i) => i * 5);
const SUN_DISTANCES = [1.5, 1.8, 2.1, 2.4, 2.7, 3.0, 3.3];
const MOON_STEP_DEGREES = 2;
const SUN_CORE_MARGIN = 24;
const SUN_MIN_EARTH_DISTANCE = 1.3;
/** A Sun beside the menu column should sit this far (CSS px) clear of its edge, not on it. */
const SUN_SIDE_CLEARANCE = 80;
/** The header band is free of glass, but over the column it sits on the cards' top edge and beside the pills: on a screen wide enough to have a side, a side is better. */
const HEADER_OVER_COLUMN_COST = 0.5;
const MOON_EDGE_MARGIN = 8;
const MOON_EARTH_GAP = 8;
const PILL_PAD_SUN = 16;
const PILL_PAD_MOON = 6;
/** The least the Sun and the Moon may be apart (centre to centre, CSS px) over and above the Moon's radius: the flare has room, neither crowds the other. */
const MIN_SEPARATION = 72;
const angleGap = (a, b) => Math.abs((((a - b) % 360) + 540) % 360 - 180);
export function startCompositionFor(input) {
    const { width, height, framing, yaw, pitch } = input;
    const pose = cameraFor(framing, width, height);
    const earthX = width * (pose.ndcX + 1) / 2, earthY = height * (1 - pose.ndcY) / 2, earthRadius = pose.radiusPx;
    const footprint = footprintFor(width);
    const [columnLeft, columnRight] = footprint.column;
    const halfTan = Math.tan((FOV_DEGREES * DEGREES) / 2);
    const times = input.moving && input.idleRate > 0 ? [0, START_LEAD_SECONDS] : [0];
    const drift = (t) => input.idleRate * t;
    const sunCandidates = [];
    if (!input.sunPinned) {
        const tried = [SUN_REFERENCE_DEFAULT];
        for (const distance of SUN_DISTANCES)
            for (const angleDegrees of SUN_ANGLES)
                tried.push({ angleDegrees, distance });
        for (const reference of tried) {
            const at = [];
            let glass = 0, crowding = 0, ok = true;
            for (const t of times) {
                const scene = sunSceneFor({ yaw: yaw + drift(t), pitch, pose, width, height, anchorYaw: yaw, anchorPitch: pitch, reference });
                const sun = scene.sun;
                if (!sun || sun.visible < 0.999 || sun.distance < SUN_MIN_EARTH_DISTANCE) {
                    ok = false;
                    break;
                }
                const body = { x: sun.x, y: sun.y, r: sun.coreRadius };
                if (!inside(body, width, height, SUN_CORE_MARGIN) || footprint.pills.some((pill) => overlaps(body, pill, PILL_PAD_SUN))) {
                    ok = false;
                    break;
                }
                if (body.y > footprint.headerHeight && body.x > columnLeft && body.x < columnRight)
                    glass += 1;
                else if (body.y > footprint.headerHeight)
                    crowding += Math.max(0, SUN_SIDE_CLEARANCE - Math.min(Math.abs(body.x - columnLeft), Math.abs(body.x - columnRight))) / SUN_SIDE_CLEARANCE;
                else if (body.x > columnLeft && body.x < columnRight)
                    crowding += HEADER_OVER_COLUMN_COST;
                at.push(body);
            }
            if (!ok)
                continue;
            const deviation = (angleGap(reference.angleDegrees, SUN_REFERENCE_DEFAULT.angleDegrees) / 180 + Math.abs(reference.distance - SUN_REFERENCE_DEFAULT.distance) / 3) * 0.5;
            sunCandidates.push({ reference, cost: glass * 6 + crowding + deviation, at });
        }
        sunCandidates.sort((a, b) => a.cost - b.cost);
    }
    const moonCandidates = [];
    const phases = [MOON.restPhase];
    for (let degrees = 0; degrees < 360; degrees += MOON_STEP_DEGREES)
        phases.push(degrees * DEGREES);
    for (const phase of phases) {
        const at = [];
        let ok = true;
        for (const t of times) {
            const moon = moonFor(t, drift(t), input.moving, phase);
            const silhouette = moonSilhouette(moon.position, moon.radius, pose.distance, halfTan, framing, width, height);
            const body = { x: silhouette.x * width, y: silhouette.y * height, r: silhouette.rx * width };
            if (!inside(body, width, height, body.r + MOON_EDGE_MARGIN)
                || Math.hypot(body.x - earthX, body.y - earthY) < earthRadius + body.r + MOON_EARTH_GAP
                || footprint.pills.some((pill) => overlaps(body, pill, PILL_PAD_MOON))) {
                ok = false;
                break;
            }
            at.push(body);
        }
        if (ok)
            moonCandidates.push({ phase, cost: Math.abs((((phase - MOON.restPhase) % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI) / Math.PI, at });
    }
    moonCandidates.sort((a, b) => a.cost - b.cost);
    /* ---- the pair: cheapest first, the Sun and the Moon apart at every sampled moment */
    const apart = (sun, moon) => sun.every((s, i) => Math.hypot(s.x - moon[i].x, s.y - moon[i].y) >= MIN_SEPARATION + moon[i].r);
    if (input.sunPinned) {
        const moon = moonCandidates[0];
        return moon ? { sun: SUN_REFERENCE_DEFAULT, moonStart: moon.phase, fallback: false } : { sun: SUN_REFERENCE_DEFAULT, moonStart: MOON.restPhase, fallback: true };
    }
    let best = null;
    for (const sun of sunCandidates) {
        if (best && sun.cost >= best.cost)
            break;
        for (const moon of moonCandidates) {
            if (best && sun.cost + moon.cost >= best.cost)
                break;
            if (apart(sun.at, moon.at)) {
                best = { sun, moon, cost: sun.cost + moon.cost };
                break;
            }
        }
    }
    return best
        ? { sun: best.sun.reference, moonStart: best.moon.phase, fallback: false }
        : { sun: SUN_REFERENCE_DEFAULT, moonStart: MOON.restPhase, fallback: true };
}
