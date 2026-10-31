import { seconds, sequenceKeyframes, sequencedAnimation, SEQUENCE_SLOT_SECONDS } from './heroSonarSequence.js?v=d9f39e7';
/*
 * WHICH CONTROLS OF THE OPENED BAZI VIEW RING (the KT SONAR EFFECT, sonarAffordance.ts, adopted here exactly as the Western Astrology view adopts it).
 *
 * Three kinds of adopter, because the controls come in three kinds:
 *
 *   1. A control whose `::after` is free takes the effect through the target list below (the same shape astrologySonarTargets.ts uses):
 *        - the four circles of the hero (the Year Animal and its three satellites), only while the hero is the thing on screen (not while a chart is across
 *          it), each ring in the circle's own element colour (`--ko-rim`);
 *        - the legend capsules under the two charts (pill), a few tenths of a second apart;
 *        - the small "i" controls that open an explanation (round), as on Western Astrology.
 *   2. A control whose `::after` is taken (the five element orbs and the Day Master medallion draw their light there) carries a ring ELEMENT of its own,
 *      `.bazi-sonar-ring`, which uses the shared keyframes and tokens (the `custom` route of the standard).
 *   3. The twelve petals of the seasonal wheel are not boxes. Each has a transparent overlay of its own outline, `.bazi-petal-ring`, scaled about the
 *      petal's centre by the same keyframes, in the petal's own month colour; they ring one after another round the wheel.
 *
 * SEQUENCED GROUPS (owner review of the Samsung preview). The four hero circles and the five pentagon orbs are two small groups that are read as a set,
 * so inside a group ONE ring has the stage at a time and the rings take their turns in a fixed order, round and round:
 *        hero      Year Animal, then Element, then Yin / Yang, then Day Master
 *        pentagon  Water (blue), Wood (green), Fire (red), Earth (gold), Metal (grey): the generating cycle, clockwise round the pentagon
 *   Each ring keeps the standard's look (an ease-out grow, a linear fade, the control's own colour) but is idle for the rest of the group's cycle instead
 *   of for 60% of its own, and it travels about 6 to 8 px beyond the control (the capsules' is 6, the standard's own). The cycle is SLOT seconds per ring (hero 4 x SLOT, pentagon 5 x SLOT).
 *
 * NOT given a ring, on purpose (docs/design/KT_SONAR_EFFECT.md on task/kt-sonar-global-standard, "Where it applies, and where it does not"): the ten
 * relationship lines (narrow, lie under the orbs, and the two cycle capsules are their explicit entry points), the two disclosure rows at the end of the
 * reading (full-width rows with their own plus sign), the MENU capsule (navigation), and the "Explore more" capsules and library tiles inside the open
 * sheet (a sheet full of rings would be noise; the page behind the sheet is at rest while it is open).
 *
 * A ring rests while the knowledge sheet is open (`body[data-bazi-sheet]`) and, by the standard, while a concept sheet is.
 */
const BAZI = '.kt-pillar-view[data-pillar="bazi-tcm"]';
/** The hero is the thing on screen: not while a chart view (pentagon, wheel) is across the middle of the page. */
const HERO = `${BAZI} .kt-bazi-hero:not([data-chart-view="pentagon"], [data-chart-view="wheel"])`;
/** Seconds one ring of a sequenced group has the stage. */
export const BAZI_SEQUENCE_SLOT = SEQUENCE_SLOT_SECONDS;
export const BAZI_HERO_RING_COUNT = 4;
export const BAZI_PENTAGON_RING_COUNT = 5;
/** The pentagon's turn order: the generating cycle starting from Water (blue, green, red, gold, grey). The orbs are drawn Wood, Fire, Earth, Metal, Water. */
export const BAZI_PENTAGON_SEQUENCE = Object.freeze(['Water', 'Wood', 'Fire', 'Earth', 'Metal']);
const HERO_PERIOD = BAZI_SEQUENCE_SLOT * BAZI_HERO_RING_COUNT;
const PENTAGON_PERIOD = BAZI_SEQUENCE_SLOT * BAZI_PENTAGON_RING_COUNT;
/** The hero circles: the generic target carries the colour, the cycle and the small circles' reach; the Year Animal (the large one) travels less far in scale for the same distance. */
const HERO_BUBBLE = `${HERO} .kt-orbit-bubble[data-bazi-topic]`;
export const BAZI_SONAR_TARGETS = [
    {
        selector: HERO_BUBBLE,
        /* the ring wears the circle's own rim: the year's element colour on the Year Animal and the element circle, pearl on Yin / Yang, the Day Master's element */
        declarations: `--kt-sonar-rgb: var(--ko-rim, 190, 214, 255); --bz-seq-period: ${seconds(HERO_PERIOD)}; --bz-seq-peak: 0.42; --bz-seq-sx: 1.2; --bz-seq-sy: 1.2; --bz-seq-delay: 0s;`,
    },
    { selector: `${HERO} .kt-orbit-core .kt-orbit-bubble[data-bazi-topic]`, declarations: `--bz-seq-sx: 1.11; --bz-seq-sy: 1.11; --bz-seq-delay: 0s;` },
    { selector: `${HERO} .kt-orbit-slot[data-orbit="element"] .kt-orbit-bubble[data-bazi-topic]`, declarations: `--bz-seq-delay: ${seconds(BAZI_SEQUENCE_SLOT)};` },
    { selector: `${HERO} .kt-orbit-slot[data-orbit="polarity"] .kt-orbit-bubble[data-bazi-topic]`, declarations: `--bz-seq-delay: ${seconds(BAZI_SEQUENCE_SLOT * 2)};` },
    { selector: `${HERO} .kt-orbit-slot[data-orbit="day-master"] .kt-orbit-bubble[data-bazi-topic]`, declarations: `--bz-seq-delay: ${seconds(BAZI_SEQUENCE_SLOT * 3)};` },
    {
        selector: `${BAZI} .bazi-legend .bazi-chip`,
        needsPosition: true,
        declarations: '--kt-sonar-sx: 1.1; --kt-sonar-sy: 1.28;',
    },
    { selector: `${BAZI} .bazi-legend .bazi-chip:nth-child(2)`, declarations: '--kt-sonar-delay: 0.22s;' },
    { selector: `${BAZI} .bazi-legend .bazi-chip:nth-child(3)`, declarations: '--kt-sonar-delay: 0.45s;' },
    {
        selector: `${BAZI} .kt-info-control`,
        needsPosition: true,
        /* the "i" ring wears the ring the control itself is drawn with (conceptSheet.ts .kt-info-control border: the icon colour, else the profile's soft energy colour) */
        declarations: '--kt-sonar-rgb: var(--kt-icon-rgb, var(--profile-energy-soft-rgb, 218, 171, 84)); --kt-sonar-sx: 1.3; --kt-sonar-sy: 1.3; --kt-sonar-delay: 1.4s;',
    },
];
/**
 * The CSS for the rings that are elements (kinds 2 and 3), the sequenced groups, and the rest states of the whole BaZi view. It uses the shared tokens
 * and keyframes that `sonarAffordanceCss` declares (`--kt-sonar-*`, `kt-sonar-grow`, `kt-sonar-fade`), so the timing curves, the colour and the fade are
 * the approved ones; the two sequenced groups use the same curves over their own, longer cycle (`bz-seq*`).
 */
export function baziSonarRingCss() {
    const P = '#place-experience';
    /* the chart's own stylesheet doubles the id (`.bazi-orb > *` has two ids and would otherwise put the ring back in the flow of the orb, with no size) */
    const PP = '#place-experience#place-experience';
    /* every selector of a list needs the state in front of it: `state a, b` would only qualify `a` */
    const within = (state, selectors) => selectors.map((selector) => `${state} ${selector}`).join(',\n    ');
    const orbRing = `${PP} .bazi-orb > .bazi-sonar-ring`;
    const discRing = `${PP} .bazi-disc > .bazi-sonar-ring`;
    const rings = [`${P} .bazi-sonar-ring`, orbRing, discRing, `${P} .bazi-stage > svg.bazi-petal-ring`];
    const targetRings = BAZI_SONAR_TARGETS.map((target) => `${P} ${target.selector}::after`);
    /* every hero target (the generic one and the ones that carry a circle's own turn): the standard's rule lists them all, so an override must list them all, or the more specific one keeps the standard's animation */
    const heroRing = BAZI_SONAR_TARGETS.filter((target) => target.selector.startsWith(HERO)).map((target) => `${P} ${target.selector}::after`).join(',\n      ');
    /* one ring's turn: the group's cycle is `count` turns, a turn is 1/count of it; the ring grows through its turn with the ease-out and fades linearly from just after it starts */
    return `
    /* THE BAZI RINGS THAT ARE ELEMENTS (baziSonarTargets.ts) */
    ${P} .bazi-sonar-ring {
      --kt-sonar-sx: 1.18; --kt-sonar-sy: 1.18;
      --kt-sonar-rgb: var(--o-rim, 190, 214, 255);
      position: absolute; inset: -1px; box-sizing: border-box; z-index: 4; border-radius: 50%;
      border: 1.5px solid rgba(var(--kt-sonar-rgb), 0.72); box-shadow: 0 0 7px rgba(var(--kt-sonar-rgb), 0.5);
      opacity: 0; transform: scale(1); transform-origin: 50% 50%; pointer-events: none;
      animation:
        kt-sonar-grow var(--kt-sonar-period) cubic-bezier(0.2, 0.62, 0.3, 1) var(--kt-sonar-delay) infinite,
        kt-sonar-fade var(--kt-sonar-period) linear var(--kt-sonar-delay) infinite;
    }
    ${discRing} { --kt-sonar-sx: 1.07; --kt-sonar-sy: 1.07; --kt-sonar-rgb: 238, 214, 150; position: absolute; display: block; z-index: 4; }
    ${P} .bazi-disc:is(:hover, :focus-visible) > .bazi-sonar-ring { --kt-sonar-peak: 0.52; }
    /* the petals: a transparent copy of each petal's outline, full size over the wheel, scaled about the petal's own centre */
    ${P} .bazi-stage > svg.bazi-petal-ring {
      --kt-sonar-sx: 1.12; --kt-sonar-sy: 1.12;
      opacity: 0; transform: scale(1); pointer-events: none;
      animation:
        kt-sonar-grow var(--kt-sonar-period) cubic-bezier(0.2, 0.62, 0.3, 1) var(--kt-sonar-delay) infinite,
        kt-sonar-fade var(--kt-sonar-period) linear var(--kt-sonar-delay) infinite;
    }
    ${P} .bazi-stage > svg.bazi-petal-ring path { fill: none; stroke: rgba(var(--kt-sonar-rgb), 0.72); stroke-width: 1.5; vector-effect: non-scaling-stroke; stroke-linejoin: round; }

    /* THE SEQUENCED GROUPS: one ring at a time. */
    ${sequenceKeyframes('bz-seq4', BAZI_HERO_RING_COUNT)}
    ${sequenceKeyframes('bz-seq5', BAZI_PENTAGON_RING_COUNT)}
    /* the pentagon's five orbs: the ring is over the orb (absolute, the size of the orb), wears the orb's own colour, the standard's line and glow, about 5 to 8 px out */
    ${orbRing} {
      --bz-seq-period: ${seconds(PENTAGON_PERIOD)}; --bz-seq-peak: 0.42; --bz-seq-sx: 1.22; --bz-seq-sy: 1.22; --bz-seq-delay: 0s;
      --kt-sonar-rgb: var(--o-rim, 190, 214, 255);
      position: absolute; display: block; inset: -1px; z-index: 4; box-sizing: border-box; border-radius: 50%;
      pointer-events: none;
    }
    @media (prefers-reduced-motion: no-preference) {
      ${orbRing} { opacity: 0; transform: scale(1); transform-origin: 50% 50%; ${sequencedAnimation('bz-seq5')} }
      ${heroRing} { ${sequencedAnimation('bz-seq4')} }
    }

    /* At rest while the knowledge sheet is open (the page behind it is inert), and while a concept sheet is (the standard's own rule). */
    ${within('body[data-bazi-sheet]', rings)},
    ${within('html:has(.kt-concept-backdrop)', rings)},
    ${within('body[data-bazi-sheet]', targetRings)} { animation: none; opacity: 0; }

    /* Reduced motion: nothing moves; each keeps the still, fainter outline just outside its edge (the standard's own policy). */
    @media (prefers-reduced-motion: reduce) {
      ${rings.join(',\n      ')} { animation: none; opacity: 0.2; transform: scale(1.08, 1.12); }
      ${P} .bazi-stage > svg.bazi-petal-ring { transform: scale(1.05); }
      ${within('body[data-bazi-sheet]', rings)} { opacity: 0; }
    }
  `;
}
