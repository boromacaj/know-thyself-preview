import { sonarAffordanceCss } from './app/premium-earth/sonarAffordance.js?v=b5ef5ed';
/*
 * THE YEAR AND THE MONTH OF THE BIRTH DATE ARE TAPPABLE, AND NOW THEY SAY SO.
 *
 * In the date picker the year ("2026") and the month ("October") sit between a pair of arrows, so people took them for labels and only ever used the arrows. Both are buttons: a tap on the year
 * opens the grid of years, a tap on the month opens the grid of months. They get the project's KT SONAR EFFECT (app/premium-earth/sonarAffordance.ts, docs/design/KT_SONAR_EFFECT.md) - the very
 * ring the Western Astrology Big Three capsules wear (Sun / Moon / Ascendant): the same 2.8 s cycle, idle for its first 60%, a contour that follows the capsule's own rounded shape, grows with the
 * standard's ease-out and fades linearly (peak 0.42), with its faint glow. Nothing of its own is drawn here: this file only names the two controls.
 *
 * ONE, THEN THE OTHER. The year rings first; the month is given the cycle's other half (1.4 s later), so the two rings are never on screen together - the same way the Astrology capsules take
 * their turns a few tenths of a second apart, only slower, because here there are two and not three.
 *
 * THE GROWTH FITS THE CAPSULE. The standard's pill growth (x1.1, x1.28) is for a capsule of about 120 x 44 px; these are wider and shorter, so the same ~6 px beyond the edge is a smaller horizontal
 * and a larger vertical factor. The ring is the control's own ::after (border-radius: inherit), so it needs the control positioned; it rests while the grid it opens is open, and stops for a person
 * who asks for reduced motion (who keeps the still, faint outline).
 */
const PERIOD = '.arrival-date-picker .arrival-period-main';
export const ARRIVAL_PERIOD_SONAR_TARGETS = [
    {
        selector: PERIOD,
        needsPosition: true,
        /* the blue-white of the standard's own default, which is also the Moon capsule's rim */
        declarations: '--kt-sonar-rgb: 196, 222, 255; --kt-sonar-sx: 1.06; --kt-sonar-sy: 1.34; --kt-sonar-delay: 0s;',
        /* it rests while the grid it opens is open (the year grid and the month grid each mark the card) */
        restWhen: '[aria-expanded="true"], .is-year-open .arrival-period-main, .is-month-selecting .arrival-period-main',
    },
    /* the month takes the other half of the cycle: the year rings, then the month, never together */
    {
        selector: `.arrival-date-picker .arrival-period-row + .arrival-period-row .arrival-period-main`,
        declarations: '--kt-sonar-delay: 1.4s;',
        restWhen: '[aria-expanded="true"], .is-year-open .arrival-period-main, .is-month-selecting .arrival-period-main',
    },
];
const style = document.createElement('style');
style.dataset.arrivalPeriodSonar = 'true';
style.textContent = sonarAffordanceCss(ARRIVAL_PERIOD_SONAR_TARGETS);
document.head.append(style);
window.addEventListener('pagehide', () => { style.remove(); }, { once: true });
