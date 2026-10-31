/*
 * THE ROMANTIC RESULT'S COMPOSITION: THE EARTH HIGH, THE READING SCROLLING UP OVER IT
 *
 * THE PICTURE. The Earth is the atmosphere of the result, as everywhere in the product, and it stays where it is: pinned behind the screen. The mandala and the gold gauge are drawn AROUND
 * this planet (they follow the disc the globe publishes, see ambientDisc.ts), the title hangs above it, and the reading - the seven dimensions, the open panel, the three things to notice -
 * scrolls upward over it on glass:
 *
 *      BACK
 *      kicker / the two names              the title band (pinned with the Earth)
 *      [ the gauge ring, the Earth, the mandala ]
 *      ------------------------------------ the reading begins here (contentTop) and scrolls over the Earth
 *
 * THE EARTH IS THE PRODUCT'S, NOT A SECOND ONE. This file only answers "if the Romantic result asks for its composition, where is the one ambient planet": ambientEarthSession.ts frames the
 * globe to it while the screen is up (dataset.earthComposition = 'connections-hero', exactly as the Tarot hero does). Nothing else about the Earth - its map, light, spin, Moon - is touched, and
 * no second planet is drawn anywhere.
 *
 * THE PLANET DOES NOT FOLLOW THE SCROLL (V4). V3 let it settle back a tenth smaller and 26 px higher over the first 300 px of scroll, re-framing the live globe from every scroll frame; on a real phone
 * that stuttered. The frame is now one frame: the plan below, for the scene's size, and the reading scrolls over a planet that stays where it is.
 *
 * A MODULE OF ITS OWN ON PURPOSE. The modules that decide where the Earth is and how it moves are locked by hash (tests/lightingOnly.test.mjs); this one is only the plan.
 */
export const CONNECTIONS_HERO_COMPOSITION = 'connections-hero';
/** The Earth's diameter: a share of the screen's width, a share of its height, never more than MAX (CSS px). */
export const CONNECTIONS_HERO_EARTH_OF_WIDTH = 0.66;
export const CONNECTIONS_HERO_EARTH_OF_HEIGHT = 0.34;
export const CONNECTIONS_HERO_EARTH_MAX = 440;
export const CONNECTIONS_HERO_EARTH_MIN = 120;
/** Where the pinned title begins, from the top of the scene (BACK and the profile control sit above it on a tall screen; a short one gives it less), and how tall it is (the kicker and one line of the two names). */
export const CONNECTIONS_HERO_TITLE_TOP_MAX = 92;
export const CONNECTIONS_HERO_TITLE_TOP_MIN = 28;
export const CONNECTIONS_HERO_TITLE_TOP_OF_HEIGHT = 0.105;
export const CONNECTIONS_HERO_TITLE_HEIGHT = 68;
export const CONNECTIONS_HERO_TITLE_CLEAR = 4;
/** The gauge ring's radius, in radii of the Earth: it stands just outside the planet. */
export const CONNECTIONS_HERO_RING = 1.12;
/** V5: the small lotus petals grow outward from the gauge ring; the outer edge of the wreath (their tips) stands this many ring radii out. The plan keeps its clear space round the wreath, not the bare ring. */
export const CONNECTIONS_HERO_PETAL_REACH = 1.15;
/** Clear space between the title band and the top of the ring, and between the foot of the ring and the reading. */
export const CONNECTIONS_HERO_RING_CLEAR = 10;
export const CONNECTIONS_HERO_READING_CLEAR = 14;
/** The reading never begins lower than this share of the screen (a short screen gives the planet less room instead). */
export const CONNECTIONS_HERO_CONTENT_TOP_MAX = 0.7;
/** The mandala's reach, in radii of the Earth, at its fullest (the outer ring's tips): V4 makes it 12.5% larger than V3's 0.8, still comfortably inside the disc. */
export const CONNECTIONS_HERO_MANDALA_REACH = 0.9;
/** The plan for a scene of this size. Pure. */
export function planConnectionsHero(width, height) {
    const w = Math.max(1, width);
    const h = Math.max(1, height);
    const titleTop = Math.min(CONNECTIONS_HERO_TITLE_TOP_MAX, Math.max(CONNECTIONS_HERO_TITLE_TOP_MIN, h * CONNECTIONS_HERO_TITLE_TOP_OF_HEIGHT));
    const titleBand = titleTop + CONNECTIONS_HERO_TITLE_HEIGHT + CONNECTIONS_HERO_TITLE_CLEAR;
    let diameter = Math.min(w * CONNECTIONS_HERO_EARTH_OF_WIDTH, h * CONNECTIONS_HERO_EARTH_OF_HEIGHT, CONNECTIONS_HERO_EARTH_MAX);
    const contentTopFor = (d) => titleBand + CONNECTIONS_HERO_RING_CLEAR + CONNECTIONS_HERO_RING * CONNECTIONS_HERO_PETAL_REACH * d + CONNECTIONS_HERO_READING_CLEAR;
    /* a short screen gives the planet less room, never the reading */
    for (let guard = 0; guard < 80 && contentTopFor(diameter) > h * CONNECTIONS_HERO_CONTENT_TOP_MAX && diameter > CONNECTIONS_HERO_EARTH_MIN; guard += 1)
        diameter *= 0.97;
    diameter = Math.max(CONNECTIONS_HERO_EARTH_MIN, diameter);
    const ringRadius = (CONNECTIONS_HERO_RING * diameter) / 2;
    const wreathRadius = ringRadius * CONNECTIONS_HERO_PETAL_REACH;
    const earthCentreY = titleBand + CONNECTIONS_HERO_RING_CLEAR + wreathRadius;
    return { earthDiameter: diameter, earthRadius: diameter / 2, earthCentreY, ringRadius, wreathRadius, titleTop, titleBand, contentTop: earthCentreY + wreathRadius + CONNECTIONS_HERO_READING_CLEAR };
}
/** The framing of the Romantic result's Earth for a scene of this size: the planet's size and place in the plan. It does not depend on the scroll. */
export function framingForConnectionsHero(width, height) {
    const shorter = Math.max(1, Math.min(width, height));
    const plan = planConnectionsHero(width, height);
    return { radius: plan.earthRadius / shorter, x: 0.5, y: plan.earthCentreY / Math.max(1, height) };
}
