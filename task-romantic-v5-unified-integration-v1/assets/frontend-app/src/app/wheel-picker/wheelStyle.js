/*
 * THE WHEELS' LOOK - the capsule the wheels turn under, the drum, the type.
 *
 * It is built from the application's own tokens so that it is the same material as the capsules, the sheets and the buttons around it: the accent is the onboarding's energy
 * colour (--profile-energy-soft-rgb) where the flow sets one, else the application's accent (--kt-accent-rgb), else the gold the application began with; the surface is the
 * one glass fill (no backdrop blur of its own: a blur over a live globe is the costliest thing on a mid-range phone, and the host panel already is the glass); the geometry is
 * round - the selection is a capsule - and the light is the capsule's own: a fine accent hairline, a soft inner glow and a faint outer one.
 *
 * What the stylesheet does not do: it does not animate. The drum's tilt, size and fade are set by wheel.ts one frame at a time while a wheel is turning, so a wheel at rest
 * is static and costs no frames. Rows near the centre carry opacity and transform only.
 */
import { WHEEL_ROWS, fisheyeFor } from './wheel.js?v=d9a1a90';
export const WHEEL_STYLE_ATTRIBUTE = 'data-kt-wheel-style';
/**
 * THE DRUM AS KEYFRAMES. A row's own view() timeline runs 0..1 while the row crosses the wheel's window, from just entering at the bottom to just leaving at the top, so a row's
 * distance from the centre is (0.5 - progress) x (rows + 1) rows, positive below the centre (a row enters at the bottom, progress 0). The cylinder (fisheyeFor, in rows: translation as a share of the row's own height) is sampled every quarter row;
 * the browser interpolates between the samples on the compositor.
 */
function drumKeyframes(flat) {
    const span = WHEEL_ROWS + 1;
    const stops = [];
    for (let step = span * 2; step >= -span * 2; step -= 1) {
        const offset = step / 4;
        const row = fisheyeFor(offset, 1, flat);
        const at = ((0.5 - offset / span) * 100).toFixed(3);
        const transform = flat ? `scale(${row.scale.toFixed(3)})` : `translate3d(0, ${(row.translateY * 100).toFixed(2)}%, 0) rotateX(${row.rotateX.toFixed(2)}deg) scale(${row.scale.toFixed(3)})`;
        stops.push(`${at}% { opacity: ${row.opacity.toFixed(3)}; transform: ${transform}; }`);
    }
    return stops.join('\n      ');
}
export const WHEEL_STYLE = `
  .kt-wheel-picker {
    --kt-wheel-accent: var(--profile-energy-soft-rgb, var(--kt-accent-soft-rgb, 232, 214, 168));
    --kt-wheel-accent-strong: var(--profile-energy-rgb, var(--kt-accent-rgb, 216, 195, 142));
    --kt-wheel-row: 40px;
    --kt-wheel-rows: 5;
    position: relative;
    display: grid;
    gap: 6px;
    width: 100%;
    color: rgba(244, 241, 233, 0.9);
    font: inherit;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  /* the column names above the wheels */
  .kt-wheel-heads {
    display: grid;
    grid-template-columns: var(--kt-wheel-columns, 1fr 1.5fr 1.1fr);
    padding: 0 6px;
    color: rgba(244, 241, 233, 0.46);
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-align: center;
    text-transform: uppercase;
  }

  .kt-wheels {
    position: relative;
    display: grid;
    grid-template-columns: var(--kt-wheel-columns, 1fr 1.5fr 1.1fr);
    /* one row exactly as tall as the wheels: without this the row sizes to the (long) list and the wheel has nothing to scroll */
    grid-template-rows: minmax(0, 1fr);
    height: calc(var(--kt-wheel-row) * var(--kt-wheel-rows));
    isolation: isolate;
  }

  /* THE SELECTION CAPSULE: the window every wheel reads through. Drawn once, behind the numbers; it never moves. */
  .kt-wheels::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 2px;
    left: 2px;
    z-index: 0;
    height: calc(var(--kt-wheel-row) - 2px);
    border: 1px solid rgba(var(--kt-wheel-accent), 0.52);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(var(--kt-wheel-accent-strong), 0.16), rgba(var(--kt-wheel-accent-strong), 0.07));
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.035) inset,
      0 0 22px rgba(var(--kt-wheel-accent-strong), 0.14),
      0 0 2px rgba(var(--kt-wheel-accent), 0.3);
    transform: translateY(-50%);
    pointer-events: none;
  }

  .kt-wheel {
    position: relative;
    z-index: 1;
    min-width: 0;
    min-height: 0;
    height: 100%;
    overflow: hidden;
    border-radius: 14px;
    outline: none;
    cursor: grab;
    touch-action: pan-y;
  }
  .kt-wheel.is-dragging { cursor: grabbing; }
  .kt-wheel:focus-visible { box-shadow: 0 0 0 2px rgba(var(--kt-wheel-accent), 0.7); }

  .kt-wheel-scroll {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    scroll-snap-type: y mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    /* the drum is seen from the front, from a little way off: the tilt of a row is real perspective, not a flat skew */
    perspective: 560px;
    perspective-origin: 50% 50%;
  }
  .kt-wheel-scroll::-webkit-scrollbar { display: none; }
  .kt-wheel.is-dragging .kt-wheel-scroll { scroll-snap-type: none; }

  .kt-wheel-pad { flex: none; pointer-events: none; }

  .kt-wheel-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--kt-wheel-row);
    padding: 0 4px;
    color: rgba(244, 241, 233, 0.82);
    font-size: 18px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.01em;
    line-height: 1;
    white-space: nowrap;
    scroll-snap-align: center;
    /* rows that are not near the centre are not painted until the wheel puts them on the drum */
    opacity: 0;
    transform-origin: 50% 50%;
    backface-visibility: hidden;
  }

  /* THE VALUE: the largest, the brightest, in the capsule's light */
  .kt-wheel-item.is-selected {
    color: rgb(255, 247, 226);
    text-shadow: 0 0 14px rgba(var(--kt-wheel-accent-strong), 0.5);
  }

  /* NOT CHOSEN YET: the value the wheels rest on is only a starting place. It is shown, but quietly - no glow, a dimmer capsule - until a wheel is turned. */
  .kt-wheel-picker.is-unset .kt-wheel-item.is-selected { color: rgba(244, 241, 233, 0.58); text-shadow: none; }
  .kt-wheel-picker.is-unset .kt-wheel-item.is-selected .kt-wheel-day-weekday { color: rgba(244, 241, 233, 0.46); }
  .kt-wheel-picker.is-unset .kt-wheels::before { border-color: rgba(var(--kt-wheel-accent), 0.26); box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.025) inset; }

  /* a day row: the number and its weekday, in two aligned halves that move as one row */
  .kt-wheel-day { display: grid; grid-template-columns: 1fr 1fr; align-items: center; column-gap: 9px; width: 100%; }
  .kt-wheel-day-column .kt-wheel-item { padding-right: 14px; }
  .kt-wheel-day-number { text-align: right; }
  .kt-wheel-day-weekday {
    color: rgba(244, 241, 233, 0.62);
    font-size: 0.72em;
    letter-spacing: 0.06em;
    text-align: left;
    text-transform: uppercase;
  }
  .kt-wheel-item.is-selected .kt-wheel-day-weekday { color: rgba(var(--kt-wheel-accent), 0.96); }

  /* the direct year entry, in the value's place */
  .kt-wheel-year-input {
    width: 4.2ch;
    padding: 0;
    border: 0;
    border-bottom: 1px solid rgba(var(--kt-wheel-accent), 0.7);
    outline: none;
    background: transparent;
    color: rgb(255, 247, 226);
    font: inherit;
    font-weight: 600;
    text-align: center;
    -webkit-user-select: text;
    user-select: text;
  }

  .kt-wheel-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

  .kt-time-separator {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    color: rgba(var(--kt-wheel-accent), 0.85);
    font-size: 20px;
    line-height: 1;
    transform: translate(-50%, -54%);
    pointer-events: none;
  }

  /* THE DRUM, driven by the scroll itself (see drumKeyframes): the rows that may come into view carry it, the rest stay unpainted */
  .kt-wheel--drum .kt-wheel-item.is-near {
    animation: kt-wheel-drum linear both;
    animation-timeline: view(block);
    animation-range: cover 0% cover 100%;
    will-change: transform, opacity;
  }
  @keyframes kt-wheel-drum {
      ${drumKeyframes(false)}
  }
  @keyframes kt-wheel-drum-flat {
      ${drumKeyframes(true)}
  }

  @media (prefers-reduced-motion: reduce) {
    .kt-wheel-scroll { scroll-behavior: auto; }
    .kt-wheel--drum .kt-wheel-item.is-near { animation-name: kt-wheel-drum-flat; }
  }
`;
export function ensureWheelStyle() {
    if (document.head.querySelector(`style[${WHEEL_STYLE_ATTRIBUTE}]`) !== null)
        return;
    const style = document.createElement('style');
    style.setAttribute(WHEEL_STYLE_ATTRIBUTE, 'true');
    style.textContent = WHEEL_STYLE;
    document.head.append(style);
}
