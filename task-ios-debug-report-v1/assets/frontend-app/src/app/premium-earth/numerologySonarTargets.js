import { fastPingRhythm, pingCycleSeconds, pingDelaySeconds, pingKeyframes, pingSeconds, sequencedAnimation } from './heroSonarSequence.js?v=b5ef5ed';
/*
 * THE NUMEROLOGY HERO'S SONAR (new: the hero never had one before this).
 *
 * The four circles are controls now (each opens the meaning of its number in its position, numerologyMeaningSheet.ts), so they wear the KT SONAR EFFECT the way the BaZi
 * hero's four circles do (baziSonarTargets.ts), through the SAME shared primitive (heroSonarSequence.ts: an ease-out grow, a linear fade, peak 0.42, the standard's 1.5 px line and 7 px glow) at the FAST PING RHYTHM (Hero Sonar Rhythm V2.1): a wave starts every 0.225 s (the Western Astrology capsules' cadence), lives for the Astrology wave's 1.12 s (so the waves overlap), and the scan rests 0.8 s after the last circle's wave has finished before it begins again:
 *
 *     Life Path (the gold circle at the centre), then Expression, then Soul Urge, then Personality: the order they are laid out in, clockwise.
 *
 * The ring is each circle's own `::after`, so it is a child of the circle: it rides the circle round the orbit and through the counter-spin, in the circle's own rim colour
 * (gold on Life Path, the Earth's blue-white on the three satellites, `--ko-rim`), and it never touches the circle's box, its geometry or its position. It rests while a
 * meaning sheet is open (the standard's `html:has(.kt-concept-backdrop)` rule), while the formation is covered by the reading or has ended, and it is a still, fainter
 * outline for a person who asks for reduced motion.
 */
const NUMEROLOGY = '.kt-pillar-view[data-pillar="numerology"]';
const HERO = `${NUMEROLOGY} .kt-orbit-hero[data-orbit-hero="numerology"]`;
export const NUMEROLOGY_SEQUENCE = Object.freeze(['Life Path', 'Expression', 'Soul Urge', 'Personality']);
export const NUMEROLOGY_RING_COUNT = NUMEROLOGY_SEQUENCE.length;
/** The hero's timing profile: four targets at the fast ping rhythm (the numbers live in heroSonarSequence.ts, once). */
export const NUMEROLOGY_RHYTHM = fastPingRhythm(NUMEROLOGY_RING_COUNT);
export const NUMEROLOGY_CYCLE_SECONDS = pingCycleSeconds(NUMEROLOGY_RHYTHM);
const BUBBLE = `${HERO} .kt-orbit-bubble[data-orbit-open]`;
const turnOf = (label) => `${HERO} [data-orbit="${label}"] .kt-orbit-bubble[data-orbit-open]`;
export const NUMEROLOGY_SONAR_TARGETS = [
    {
        selector: BUBBLE,
        /* the ring wears the circle's own rim, as the BaZi hero's does; the centre circle (larger) travels less far in scale for the same distance */
        declarations: `--kt-sonar-rgb: var(--ko-rim, 190, 214, 255); --nm-seq-period: ${pingSeconds(NUMEROLOGY_CYCLE_SECONDS)}; --nm-seq-peak: 0.42; --nm-seq-sx: 1.2; --nm-seq-sy: 1.2; --nm-seq-delay: 0s;`,
    },
    { selector: `${HERO} .kt-orbit-core .kt-orbit-bubble[data-orbit-open]`, declarations: '--nm-seq-sx: 1.11; --nm-seq-sy: 1.11; --nm-seq-delay: 0s;' },
    ...NUMEROLOGY_SEQUENCE.slice(1).map((label, index) => ({
        selector: turnOf(label),
        declarations: `--nm-seq-delay: ${pingSeconds(pingDelaySeconds(NUMEROLOGY_RHYTHM, index + 1))};`,
    })),
];
/** The CSS that turns the targets into one sequenced group, and the rest states of the hero. */
export function numerologySonarRingCss() {
    const P = '#place-experience';
    const ring = NUMEROLOGY_SONAR_TARGETS.map((target) => `${P} ${target.selector}::after`).join(',\n      ');
    const rest = (state) => NUMEROLOGY_SONAR_TARGETS.map((target) => `${P} ${target.selector.replace(HERO, `${HERO}${state}`)}::after`).join(',\n    ');
    return `
    /* THE NUMEROLOGY HERO'S SEQUENCED RINGS (numerologySonarTargets.ts) */
    ${pingKeyframes('nm-ping4', NUMEROLOGY_RHYTHM, 'nm-seq')}
    @media (prefers-reduced-motion: no-preference) {
      ${ring} { ${sequencedAnimation('nm-ping4', 'nm-seq')} }
    }
    /* The formation is covered by the reading, or has ended: nothing asks to be tapped. (A meaning sheet over the page rests it through the standard's own rule.) */
    ${rest('[data-orbit-covered]')},
    ${rest('[data-orbit-done]')} { animation: none; opacity: 0; }
  `;
}
