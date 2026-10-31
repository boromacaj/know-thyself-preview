import { INTENSITY_MAX, INTERFACE_GAIN_PROPERTY } from '../colors/colorPreferences.js';
import { appHaptics } from '../haptics/hapticsService.js';
import { FAST_PING, SEQUENCE_GROW_EASING } from './heroSonarSequence.js';
import { KT_SONAR_DEFAULTS } from './sonarAffordance.js';
/*
 * THE MAIN MENU ANSWERS A TAP WITH THE KT SONAR, ONCE.
 *
 * The sonar of the Western Astrology Big Three capsules (sonarAffordance.ts, PR #261) is the look the owner approved: a thin luminous contour in the SHAPE of the control that leaves it, grows a few
 * pixels outward with an ease-out and fades into transparency. This is that very wave, sent once from the card the person tapped. Measured on the live Sun capsule (119 x 44 px): the ring is the
 * control's own outline moved 1 px out (inset: -1px), 1.5 px wide at 0.72 alpha with a 7 px glow at 0.5, it grows to about 6 px beyond the capsule (scale 1.1 x 1.28), rises to its peak
 * (0.42) in the first fifth of a 1.12 s wave and fades linearly to nothing. Every number below is that standard's, except the SPEED: the owner asked for the tap's wave twice as fast, so it runs
 * the same envelope in half the time (MENU_TAP_WAVE_SECONDS, 0.56 s). Nothing here is a sonar of its own.
 *
 * Nothing moves but the ring. The card does not tremble, scale or change; the phone gives one short vibration (the 'impulse' cue, in place of the ordinary 'select' tap pulse).
 *
 * The menu fades out (240 ms) as soon as a destination is chosen, so a ring that began at that moment would leave a card that is already gone. A real tap is therefore HELD BACK for
 * MENU_TAP_HOLD_MS: the ring leaves the card while it is on screen, and then the same click is delivered, so every listener that opens a destination answers it exactly as before. The ring is not a
 * pseudo-element of the card (the menu leaves the screen): it is one fixed-position element on the document, placed from the card's rectangle at the moment of the tap, which finishes its wave
 * over the page that opens. It never takes a click (pointer-events: none), exists for about 0.7 s and animates transform and opacity only.
 *
 * COLOUR AND INTENSITY ARE THE COLORS SETTINGS'. The ring wears the colour of the menu's own light and is as strong as the person set it: the Interface Color's edge tint (--kt-edge-tint, set on the
 * host by app/colors/interfaceColorStyle.ts) and the Interface Color intensity (--kt-interface-gain, 0 to 2, 1 = as designed) are read from the host at the moment of the tap, so a change in
 * Settings -> Colors is in the very next wave and nothing is kept in step. With Transparent (no tint set) the ring takes the card's own neutral border colour. The wave must be SEEN whatever the
 * intensity: at 0 % it is not switched off but drawn at the faintest outline the standard itself keeps (MENU_TAP_FLOOR_PEAK, 0.2, its reduced-motion outline), still in the chosen colour.
 *
 * Only a PERSON's tap does any of this (isTrusted): a script's click and the session restore's are neither held nor dressed. A person who asks for reduced motion gets no ring and no hold - the
 * menu is what it was; the vibration is not motion and the Settings On / Off choice governs it. Connections is not open yet (a disabled button, which gets no click): its pointerup gets the
 * wave and nothing opens.
 */
/** One wave per tap, as the standard sends one per cycle. */
export const MENU_TAP_RING_COUNT = 1;
/** How far the ring ends beyond the control's outline, in px: the standard's growth on the Big Three capsules (scale 1.1 x 1.28 on 119 x 44 px is 6 px each way). */
export const MENU_TAP_REACH = 6;
/** The standard's ring sits 1 px outside the control (inset: -1px). */
export const MENU_TAP_INSET = 1;
/** How long a real tap is held back so the wave is seen on the card before the destination opens. */
export const MENU_TAP_HOLD_MS = 140;
/** The wave runs this many times faster than the standard's 1.12 s. */
export const MENU_TAP_SPEEDUP = 2;
/** The seconds of one wave. */
export const MENU_TAP_WAVE_SECONDS = Number((FAST_PING.visible / MENU_TAP_SPEEDUP).toFixed(3));
/** The faintest the wave is ever drawn, at any intensity: the standard's own still outline for reduced motion (sonarAffordance.ts, opacity 0.2). */
export const MENU_TAP_FLOOR_PEAK = 0.2;
/** The selector of a card of the main menu. */
export const MENU_TAP_CARD_SELECTOR = '#menu-view [data-menu-item]';
const FALLBACK_RGB = KT_SONAR_DEFAULTS.rgb;
/** The wave is the standard's active window (FAST_PING.visible, 1.12 s) at MENU_TAP_SPEEDUP times its speed; the keyframes are a share of it. */
export function menuTapSonarCss() {
    const peak = Number((FAST_PING.peakShare * 100).toFixed(2));
    return `
    .kt-menu-tap-ring {
      position: fixed;
      z-index: 60;
      box-sizing: border-box;
      border: 1.5px solid rgba(var(--kt-tap-ring-rgb, ${FALLBACK_RGB}), 0.72);
      box-shadow: 0 0 7px rgba(var(--kt-tap-ring-rgb, ${FALLBACK_RGB}), 0.5);
      opacity: 0;
      transform: scale(1);
      transform-origin: 50% 50%;
      pointer-events: none;
      will-change: transform, opacity;
      animation:
        kt-tap-ring-grow ${MENU_TAP_WAVE_SECONDS}s ${SEQUENCE_GROW_EASING} 1 both,
        kt-tap-ring-fade ${MENU_TAP_WAVE_SECONDS}s linear 1 both;
    }
    @keyframes kt-tap-ring-grow {
      0% { transform: scale(1); }
      100% { transform: scale(var(--kt-tap-ring-sx, 1.1), var(--kt-tap-ring-sy, 1.1)); }
    }
    @keyframes kt-tap-ring-fade {
      0% { opacity: 0; }
      ${peak}% { opacity: var(--kt-tap-ring-peak, ${KT_SONAR_DEFAULTS.peak}); }
      100% { opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .kt-menu-tap-ring { display: none; }
    }
  `;
}
/** The Interface Color's colour of light on the host, written as "R, G, B". */
export const EDGE_TINT_PROPERTY = '--kt-edge-tint';
/** A triplet token as the Colors engine writes it ("R, G, B", spacing free), or null for anything else - an unset token reads as an empty string. */
export function tripletToken(value) {
    const match = /^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/.exec(value.trim());
    if (!match)
        return null;
    const parts = [match[1], match[2], match[3]].map(Number);
    return parts.every((part) => part <= 255) ? parts.join(', ') : null;
}
/** The Interface Color intensity as the stylesheets receive it: a multiplier, 1 when unset or unreadable, never below 0 or above the slider's maximum (200 %). */
export function interfaceGain(value) {
    const gain = Number.parseFloat(value);
    if (!Number.isFinite(gain))
        return 1;
    return Math.min(INTENSITY_MAX / 100, Math.max(0, gain));
}
/** The ring's colour: the Interface Color's tint when one is chosen, otherwise the card's own border colour (Transparent), otherwise nothing (the stylesheet's neutral blue-white). */
export const ringColour = (edgeTint, cardBorder) => tripletToken(edgeTint) ?? rgbTriplet(cardBorder);
/** "rgb(r, g, b)" or "rgba(r, g, b, a)" as the triplet "r, g, b", or null for anything else (transparent included). */
export function rgbTriplet(color) {
    const match = /^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})(?:[\s,/]+([\d.]+%?))?\s*\)$/.exec(color.trim());
    if (!match)
        return null;
    const alpha = match[4] === undefined ? 1 : match[4].endsWith('%') ? Number.parseFloat(match[4]) / 100 : Number.parseFloat(match[4]);
    if (!(alpha > 0))
        return null;
    const parts = [match[1], match[2], match[3]].map(Number);
    if (parts.some((part) => part > 255))
        return null;
    return parts.join(', ');
}
/** How much a ring must scale to stand `reach` px beyond a box of this size on every side. */
export function ringGrowth(width, height, reach = MENU_TAP_REACH) {
    const grow = (side) => (side > 0 ? Number((1 + (2 * reach) / side).toFixed(4)) : 1);
    return { sx: grow(width), sy: grow(height) };
}
/** The peak opacity of the wave: the standard's peak times the Interface Color intensity, never fainter than the floor and never above full. */
export const ringPeak = (gain) => Number(Math.min(1, Math.max(MENU_TAP_FLOOR_PEAK, Number(KT_SONAR_DEFAULTS.peak) * gain)).toFixed(3));
/** The declarations (no braces) that place and dress the ring over a card. */
export function ringDeclarations(geometry) {
    /* Like the standard's ring, it is the control's outline moved MENU_TAP_INSET px out; it ends MENU_TAP_REACH px beyond that. The strength is the Interface Color intensity applied ONCE, to the
       peak of the ring's opacity (which carries its line and its glow together). */
    const width = geometry.width + 2 * MENU_TAP_INSET;
    const height = geometry.height + 2 * MENU_TAP_INSET;
    const { sx, sy } = ringGrowth(width, height);
    const declarations = [
        `left: ${Number((geometry.left - MENU_TAP_INSET).toFixed(2))}px`,
        `top: ${Number((geometry.top - MENU_TAP_INSET).toFixed(2))}px`,
        `width: ${Number(width.toFixed(2))}px`,
        `height: ${Number(height.toFixed(2))}px`,
        `--kt-tap-ring-sx: ${sx}`,
        `--kt-tap-ring-sy: ${sy}`,
        `--kt-tap-ring-peak: ${ringPeak(geometry.gain)}`,
    ];
    if (/^[-0-9a-z.%\s/]+$/i.test(geometry.radius) && geometry.radius.trim())
        declarations.push(`border-radius: ${geometry.radius.trim()}`);
    if (geometry.rgb)
        declarations.push(`--kt-tap-ring-rgb: ${geometry.rgb}`);
    return declarations.join('; ');
}
const prefersReducedMotion = () => {
    try {
        return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    catch {
        return false;
    }
};
/**
 * Listen on the window, once, in the CAPTURE phase and before every other click listener of the application (menuTapSonarInstall.ts comes early among the imports of vesselOrbit.ts), because it has to
 * hold a click back: the listeners that open a destination are on the window too. Returns the function that stops it.
 */
export function installMenuTapSonar(win = window, options = {}) {
    const doc = win.document;
    if (!doc.head.querySelector('style[data-menu-tap-sonar]')) {
        const style = doc.createElement('style');
        style.dataset.menuTapSonar = 'true';
        style.textContent = menuTapSonarCss();
        doc.head.append(style);
    }
    const reduced = options.reducedMotion ?? prefersReducedMotion;
    const holdMs = options.holdMs ?? MENU_TAP_HOLD_MS;
    let ring = null;
    let ringTimer;
    /** The card whose tap is being held back, and whether the click being delivered now is the one that was held. */
    let held = null;
    let replaying = false;
    const clearRing = () => {
        ring?.remove();
        ring = null;
        if (ringTimer !== undefined)
            win.clearTimeout(ringTimer);
        ringTimer = undefined;
    };
    /** The impulse: the vibration and the wave. */
    const pulse = (card) => {
        (options.haptics ?? appHaptics()).cue('impulse');
        const rect = card.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0)
            return;
        const computed = win.getComputedStyle(card);
        /* The Colors settings live on the host as static custom properties; they are read now, so the wave is always what Settings -> Colors says. */
        const host = doc.getElementById('place-experience');
        const hostStyle = host ? win.getComputedStyle(host) : null;
        const geometry = {
            left: rect.left, top: rect.top, width: rect.width, height: rect.height,
            radius: computed.borderTopLeftRadius,
            rgb: ringColour(hostStyle?.getPropertyValue(EDGE_TINT_PROPERTY) ?? '', computed.borderTopColor),
            gain: interfaceGain(hostStyle?.getPropertyValue(INTERFACE_GAIN_PROPERTY) ?? ''),
        };
        clearRing();
        ring = doc.createElement('span');
        ring.className = 'kt-menu-tap-ring';
        ring.setAttribute('aria-hidden', 'true');
        ring.style.cssText = ringDeclarations(geometry);
        doc.body.append(ring);
        ringTimer = win.setTimeout(clearRing, MENU_TAP_WAVE_SECONDS * 1000 + 120);
    };
    /*
     * A real tap on an open card. The menu fades out as soon as a destination is chosen (240 ms), so a wave that starts at the same moment would leave a card that is already gone. The click is
     * therefore held back for a beat (MENU_TAP_HOLD_MS): the ring leaves the card while it is still there, and then the very same click is delivered, so every listener that opens a destination
     * answers it exactly as it always did. A second tap during the beat is the same tap. A click that is not a person's (a script's, the session restore's) and a person who asks for reduced
     * motion are not held and get no impulse: for them the menu is what it was.
     */
    const onClick = (event) => {
        if (replaying || !event.isTrusted || !(event.target instanceof Element))
            return;
        const card = event.target.closest(MENU_TAP_CARD_SELECTOR);
        if (!card || card.matches(':disabled, [aria-disabled="true"]'))
            return;
        if (held) {
            event.stopImmediatePropagation();
            event.preventDefault();
            return;
        }
        if (reduced())
            return;
        pulse(card);
        if (holdMs <= 0)
            return;
        event.stopImmediatePropagation();
        event.preventDefault();
        held = {
            card,
            timer: win.setTimeout(() => {
                held = null;
                if (!card.isConnected)
                    return;
                replaying = true;
                try {
                    card.click();
                }
                finally {
                    replaying = false;
                }
            }, holdMs),
        };
    };
    /* A card that is not open yet (Connections: "soon") is a disabled button, and a disabled button gets no click. It is still a card of the menu and a person still touched it, so it is answered
       from its pointerup instead (a swipe that scrolls the menu ends in pointercancel, not pointerup). Nothing opens: only the wave leaves it. */
    const onPointerUp = (event) => {
        if (!event.isTrusted || event.button > 0 || !(event.target instanceof Element))
            return;
        const card = event.target.closest(MENU_TAP_CARD_SELECTOR);
        if (!card || !card.matches(':disabled, [aria-disabled="true"]') || reduced())
            return;
        pulse(card);
    };
    win.addEventListener('click', onClick, { capture: true });
    win.addEventListener('pointerup', onPointerUp, { capture: true, passive: true });
    return () => {
        win.removeEventListener('click', onClick, { capture: true });
        win.removeEventListener('pointerup', onPointerUp, { capture: true });
        if (held)
            win.clearTimeout(held.timer);
        held = null;
        clearRing();
    };
}
