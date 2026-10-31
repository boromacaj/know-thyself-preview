/*
 * THE VESSEL TRACK: THE THREE MARKS FOLLOW THE FINGER.
 * ----------------------------------------------------
 * The body is chosen by dragging. The three marks (male, "do not define", female) sit on one horizontal track through the middle of the Earth - the one in
 * the centre large, the other two small on either side - and a finger moving across the screen carries them with it: the mark that was in the centre
 * slides to a side and shrinks, the one that was on the side slides towards the centre and grows. Let go and the nearest mark settles into the centre and
 * is the choice; let go before halfway and the track returns. A third mark is always waiting beyond the edge (there are only three), so the track is a ring.
 *
 * WHAT MOVES WITH IT. The atmosphere, the Confirm rim and the caption under the globe do not slide - they are the Earth's - but they follow the same drag:
 * their light goes down as the track passes halfway, the selection changes at that one instant (when they are at zero, so a colour never pops) and the
 * light comes back as the new mark settles. The colour in between is a blend of the two vessels' own colours. Nothing here has a clock of its own: every
 * value is a function of one number, the track's position, so a drag that stops stops everything, and a drag that is grabbed in mid-settle carries on from
 * where it was.
 *
 * WHAT STAYS THE CONDUCTOR'S. The arrows' own sequence (vesselArrowOnlyPolish.changeByArrow: fade out, swap at zero, fade in) is still the way to change the
 * vessel by keyboard and from the profile editor; the track follows whatever the selection is (data-vessel-selection) and fades with that sequence's phase
 * events. The arrow buttons themselves are no longer shown or tapped: the cues between the marks say which way to go, and the finger does it.
 *
 * Opacity and transform only. No layout property is touched, and the Earth is neither moved nor resized.
 */
import { appHaptics } from './app/haptics/hapticsService.js?v=d9f39e7';
const SIDE_OPACITY = 0.38;
const CENTRE_OPACITY = 0.92;
const SLOP_PIXELS = 8;
const SETTLE_MILLIS = 460;
const SETTLE_FAST_MILLIS = 300;
const PROJECTION_SECONDS = 0.12;
const FLICK_PIXELS_PER_SECOND = 380;
const modulo = (value, size) => ((value % size) + size) % size;
const smoothstep = (x) => {
    const t = Math.min(1, Math.max(0, x));
    return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;
/** A little past the end and back: the mark settles into the centre rather than stopping dead. */
const easeOutBack = (x) => {
    const c1 = 1.1;
    const c3 = c1 + 1;
    return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
};
const parseRgb = (value) => {
    const parts = value.split(',').map((part) => Number(part.trim()));
    return [parts[0] ?? 255, parts[1] ?? 255, parts[2] ?? 255];
};
const blendRgb = (a, b, t) => {
    const from = parseRgb(a);
    const to = parseRgb(b);
    return from.map((channel, index) => Math.round(lerp(channel, to[index], t))).join(', ');
};
const CUE_STEP = '<span class="kt-vessel-cue-step"><svg viewBox="0 0 15 31" width="15" height="31" focusable="false"><path class="kt-vessel-cue-glow" d="M2.6 3.3 L8.1 11 Q11.3 15.5 8.1 20 L2.6 27.7"/><path class="kt-vessel-cue-line" d="M2.6 3.3 L8.1 11 Q11.3 15.5 8.1 20 L2.6 27.7"/></svg></span>';
export function mountVesselTrack(deps) {
    const { experience, vesselStage, nav, confirmVessel, choices, palette, glyphs, leftPreview, rightPreview, reducedMotion } = deps;
    const vesselOf = (index) => choices[modulo(index, choices.length)].dataset.vessel ?? 'undefined';
    const count = choices.length;
    /* ------------------------------------------------------------------ the marks -- */
    const layer = document.createElement('div');
    layer.className = 'kt-vessel-track';
    layer.setAttribute('aria-hidden', 'true');
    const marks = choices.map((choice) => {
        const vessel = choice.dataset.vessel ?? 'undefined';
        const mark = document.createElement('span');
        mark.className = 'kt-vessel-track-mark';
        mark.dataset.vessel = vessel;
        const colours = palette[vessel] ?? palette.undefined;
        mark.style.setProperty('--kt-track-rgb', colours.rgb);
        mark.style.setProperty('--kt-track-soft-rgb', colours.soft);
        mark.innerHTML = glyphs[vessel] ?? glyphs.undefined;
        layer.append(mark);
        return mark;
    });
    vesselStage.append(layer);
    /* ------------------------------------------------------ the cues between the marks -- */
    const cues = [];
    /* Half the hero's size, on the track's own line, at the exact middle of each gap between the centre mark and a side mark. */
    for (const side of ['left', 'right']) {
        const cue = document.createElement('div');
        cue.className = `kt-vessel-cue kt-vessel-cue-${side}`;
        cue.setAttribute('aria-hidden', 'true');
        cue.innerHTML = CUE_STEP + CUE_STEP + CUE_STEP;
        layer.append(cue);
        cues.push(cue);
    }
    if (nav) {
        /* The arrow buttons stay in the page as the conductor's own handles (the keyboard and the profile editor press them) but are neither seen nor tapped. */
        for (const arrow of nav.querySelectorAll('.vessel-carousel-arrow')) {
            arrow.tabIndex = -1;
            arrow.setAttribute('aria-hidden', 'true');
        }
    }
    const style = document.createElement('style');
    style.dataset.vesselTrackCarousel = 'true';
    style.textContent = `
    .kt-vessel-track {
      position: absolute;
      top: var(--vessel-earth-center-y, 50%);
      left: var(--vessel-earth-center-x, 50%);
      z-index: 466;
      width: 0;
      height: 0;
      pointer-events: none;
      /* the conductor's own sequence (the keyboard, the profile editor) fades the track with the light; a drag never goes through this */
      transition: opacity var(--kt-vessel-swap-ms, 1000ms) cubic-bezier(.5, 0, .5, 1);
    }
    .vessel-stage[data-vessel-swap-phase="out"] .kt-vessel-track { opacity: 0; }
    .vessel-stage.is-profile-flow .kt-vessel-track { display: none !important; }

    /* the large mark's own box: the Earth's diameter x 0.48, as the centre symbol always was; the small ones are the same drawing scaled down */
    .kt-vessel-track-mark {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: calc(var(--vessel-earth-diameter, 240px) * 0.48);
      height: calc(var(--vessel-earth-diameter, 240px) * 0.48);
      color: rgba(var(--kt-track-soft-rgb, 255, 255, 255), 1);
      transform: translate(-50%, -50%);
      will-change: transform, opacity;
      /* --kt-track-glow is 1 for the mark in the centre and 0 for one at a side: the chosen mark glows in its own colour, the others only faintly */
      filter:
        drop-shadow(0 0 3px rgba(255, 255, 255, calc(.18 + .2 * var(--kt-track-glow, 0))))
        drop-shadow(0 0 calc(8px + 6px * var(--kt-track-glow, 0)) rgba(var(--kt-track-rgb, 255, 255, 255), calc(.3 + .45 * var(--kt-track-glow, 0))))
        drop-shadow(0 0 calc(30px * var(--kt-track-glow, 0)) rgba(var(--kt-track-rgb, 255, 255, 255), calc(.5 * var(--kt-track-glow, 0))))
        drop-shadow(0 0 5px rgba(0, 0, 0, .4));
    }
    .kt-vessel-track-mark > svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.4;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* The marks this track replaces: the centre symbol and the two small previews (the carousel keeps their state; they are simply not drawn). */
    #vessel-stage .kt-vessel-core-symbol,
    #vessel-stage .kt-vessel-neighbor-preview-rail { visibility: hidden !important; }

    /* The whole screen is the swipe surface: nothing under a finger here scrolls. */
    .place-experience[data-state="vessel"] { touch-action: none; }

    /* ------------------------------------------------------------------- the cues ---
       The hero's scroll cue, turned to the side: three thin chevrons that overlap, a faint wide stroke for the light and a fine pale one for the line, each
       fading up and drifting a few px outwards in a slow cascade (the same 2.8 s, the same 0.32 s step). Opacity and transform only. Not a control. */
    .vessel-stage:not(.is-profile-flow) .vessel-carousel-nav { pointer-events: none !important; }
    .vessel-stage:not(.is-profile-flow) .vessel-carousel-arrow { visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }
    .kt-vessel-cue {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      pointer-events: none;
      color: rgba(var(--kt-cue-rgb, 238, 246, 255), .92);
      transform: translate(-50%, -50%) translateX(calc(var(--kt-track-spread, 160px) / 2)) scale(.5);
    }
    .kt-vessel-cue-left { transform: translate(-50%, -50%) translateX(calc(var(--kt-track-spread, 160px) / -2)) scale(-.5, .5); }
    .kt-vessel-cue-step {
      display: block;
      width: 15px;
      height: 31px;
      margin-right: -6px;
      opacity: .5;
      will-change: opacity, transform;
      animation: kt-vessel-cue 2.8s ease-in-out infinite;
      animation-delay: calc(var(--kt-cue-i, 0) * 0.32s);
    }
    .kt-vessel-cue-step:nth-child(1) { --kt-cue-i: 0; }
    .kt-vessel-cue-step:nth-child(2) { --kt-cue-i: 1; }
    .kt-vessel-cue-step:nth-child(3) { --kt-cue-i: 2; }
    .kt-vessel-cue svg { display: block; overflow: visible; }
    .kt-vessel-cue path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .kt-vessel-cue-glow { stroke: rgba(var(--kt-cue-glow-rgb, 118, 170, 255), .34); stroke-width: 5.4; }
    .kt-vessel-cue-line { stroke: rgba(var(--kt-cue-rgb, 238, 246, 255), .92); stroke-width: 1.38; }
    @keyframes kt-vessel-cue {
      0%, 100% { opacity: .14; transform: translateX(-2px); }
      34% { opacity: .95; transform: translateX(0); }
      68% { opacity: .14; transform: translateX(3px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .kt-vessel-cue-step { animation: none; will-change: auto; }
      .kt-vessel-cue-step:nth-child(1) { opacity: .3; }
      .kt-vessel-cue-step:nth-child(2) { opacity: .6; }
      .kt-vessel-cue-step:nth-child(3) { opacity: .95; }
    }
  `;
    document.head.append(style);
    /* ----------------------------------------------------------------- the geometry -- */
    /** Where the side marks rest, from the Earth's centre: measured off the (hidden, still laid out) previews, so it is the spacing the screen already has. */
    let spread = 0;
    let sideScale = 0.32;
    const measure = () => {
        const left = leftPreview.getBoundingClientRect();
        const right = rightPreview.getBoundingClientRect();
        const centre = marks[0].getBoundingClientRect();
        if (right.width > 0 && right.left > left.left)
            spread = ((right.left + right.width / 2) - (left.left + left.width / 2)) / 2;
        if (spread <= 0)
            spread = Math.max(80, (parseFloat(getComputedStyle(vesselStage).getPropertyValue('--vessel-earth-diameter')) || 240) * 0.62);
        const preview = right.width > 0 ? right.width : 42;
        if (centre.width > 0)
            sideScale = Math.min(0.6, Math.max(0.18, preview / centre.width));
        layer.style.setProperty('--kt-track-spread', `${spread.toFixed(2)}px`);
    };
    /* ------------------------------------------------------------------- the render -- */
    /** The track's position in marks: an integer is "that mark is in the centre". */
    let position = Math.max(0, choices.findIndex((choice) => choice.classList.contains('is-carousel-active')));
    if (!choices.some((choice) => choice.classList.contains('is-carousel-active')))
        position = 1;
    let shown = modulo(Math.round(position), count);
    const place = () => {
        for (let index = 0; index < count; index += 1) {
            const offset = modulo(index - position + count / 2, count) - count / 2;
            const away = Math.abs(offset);
            const toSide = smoothstep(Math.min(1, away));
            const scale = lerp(1, sideScale, toSide);
            const opacity = away <= 1
                ? lerp(CENTRE_OPACITY, SIDE_OPACITY, toSide)
                : SIDE_OPACITY * (1 - smoothstep((away - 1) / (count / 2 - 1 || 0.5)));
            const mark = marks[index];
            mark.style.transform = `translate(-50%, -50%) translateX(${(offset * spread).toFixed(2)}px) scale(${scale.toFixed(4)})`;
            mark.style.opacity = opacity.toFixed(4);
            mark.style.setProperty('--kt-track-glow', (1 - toSide).toFixed(3));
        }
    };
    const render = () => {
        place();
        const nearest = modulo(Math.round(position), count);
        const away = Math.abs(position - Math.round(position));
        /* the light goes to zero exactly where the nearest mark changes: the selection and the colours swap there, unseen */
        const light = smoothstep(1 - 2 * away);
        if (nearest !== shown) {
            shown = nearest;
            deps.select(choices[nearest]);
            /* a detent: the mark that will be the choice has changed under the finger */
            appHaptics().cue('tick');
        }
        deps.setEffect(light);
        const lower = Math.floor(position);
        const t = position - lower;
        const from = palette[vesselOf(lower)] ?? palette.undefined;
        const to = palette[vesselOf(lower + 1)] ?? palette.undefined;
        const rgb = blendRgb(from.rgb, to.rgb, t);
        const soft = blendRgb(from.soft, to.soft, t);
        deps.setBlend(rgb, soft);
        for (const cue of cues) {
            cue.style.setProperty('--kt-cue-rgb', soft);
            cue.style.setProperty('--kt-cue-glow-rgb', rgb);
        }
    };
    /** Follow the selection wherever else it is changed (the conductor's sequence, the profile editor): the track is a picture of it. */
    const followSelection = () => {
        if (dragging || settling)
            return;
        const selected = choices.findIndex((choice) => choice.classList.contains('is-carousel-active'));
        if (selected < 0)
            return;
        position = selected;
        shown = selected;
        place();
        const cueColours = palette[vesselOf(selected)] ?? palette.undefined;
        for (const cue of cues) {
            cue.style.setProperty('--kt-cue-rgb', cueColours.soft);
            cue.style.setProperty('--kt-cue-glow-rgb', cueColours.rgb);
        }
    };
    /* ----------------------------------------------------------------- the gesture -- */
    let dragging = false;
    let settling = false;
    let settleFrame = 0;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startPosition = 0;
    let base = 0;
    let recent = [];
    const vesselOpen = () => experience.dataset.state === 'vessel' && !vesselStage.classList.contains('is-profile-flow');
    const stopSettle = () => {
        if (settleFrame)
            window.cancelAnimationFrame(settleFrame);
        settleFrame = 0;
        settling = false;
    };
    const settleTo = (target, fast) => {
        stopSettle();
        const finishAt = () => {
            position = target;
            render();
            const chosen = choices[modulo(target, count)];
            position = modulo(target, count);
            shown = modulo(target, count);
            place();
            settling = false;
            settleFrame = 0;
            deps.setBusy(false);
            deps.finish(chosen);
            /* the mark has landed in the centre and it is a different choice from the one the gesture began on: a choice made */
            if (modulo(target, count) !== modulo(base, count))
                appHaptics().cue('select');
        };
        if (reducedMotion.matches || Math.abs(target - position) < 0.0005) {
            finishAt();
            return;
        }
        settling = true;
        const from = position;
        const duration = fast ? SETTLE_FAST_MILLIS : SETTLE_MILLIS;
        const startedAt = performance.now();
        const tick = (now) => {
            const progress = Math.min(1, (now - startedAt) / duration);
            position = lerp(from, target, easeOutBack(progress));
            if (progress < 1) {
                render();
                settleFrame = window.requestAnimationFrame(tick);
                return;
            }
            finishAt();
        };
        settleFrame = window.requestAnimationFrame(tick);
    };
    const beginDrag = (event) => {
        dragging = true;
        stopSettle();
        measure();
        startX = event.clientX;
        startPosition = position;
        base = Math.round(position);
        recent = [{ x: event.clientX, t: event.timeStamp }];
        deps.setBusy(true);
        confirmVessel.disabled = true;
        try {
            experience.setPointerCapture(event.pointerId);
        }
        catch { /* the pointer is already gone */ }
    };
    const onDown = (event) => {
        if (!vesselOpen() || (event.pointerType === 'mouse' && event.button !== 0))
            return;
        const target = event.target;
        if (target instanceof Element && target.closest('button, a, input, textarea, select, [role="button"], .kt-locale-options'))
            return;
        if (pointerId !== null)
            return;
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        /* a finger put down on a track that is still settling takes hold of it where it is */
        if (settling)
            beginDrag(event);
    };
    const onMove = (event) => {
        if (event.pointerId !== pointerId)
            return;
        if (!dragging) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            if (Math.abs(dx) > SLOP_PIXELS && Math.abs(dx) > Math.abs(dy) * 1.15)
                beginDrag(event);
            else if (Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx))
                pointerId = null;
            return;
        }
        event.preventDefault();
        position = Math.min(base + 1, Math.max(base - 1, startPosition - (event.clientX - startX) / (spread || 1)));
        recent.push({ x: event.clientX, t: event.timeStamp });
        while (recent.length > 2 && event.timeStamp - recent[0].t > 90)
            recent.shift();
        render();
    };
    const onUp = (event) => {
        if (event.pointerId !== pointerId)
            return;
        pointerId = null;
        if (!dragging)
            return;
        dragging = false;
        try {
            experience.releasePointerCapture(event.pointerId);
        }
        catch { /* released with the pointer */ }
        const first = recent[0];
        const last = recent[recent.length - 1];
        const velocity = last && first && last.t > first.t ? (last.x - first.x) / ((last.t - first.t) / 1000) : 0;
        /* where the mark would be if the finger carried on a moment longer: a flick counts, a slow drag is judged where it is */
        const projected = position - (velocity / (spread || 1)) * PROJECTION_SECONDS;
        let target = Math.min(base + 1, Math.max(base - 1, Math.round(projected)));
        /* a brisk short flick is a flick even if it has not yet crossed the halfway point */
        if (target === base && Math.abs(velocity) > FLICK_PIXELS_PER_SECOND && Math.abs(position - base) > 0.08)
            target = base + Math.sign(position - base);
        settleTo(target, Math.abs(velocity) > 900);
    };
    const onCancel = (event) => {
        if (event.pointerId !== pointerId)
            return;
        pointerId = null;
        if (!dragging)
            return;
        dragging = false;
        settleTo(base, false);
    };
    experience.addEventListener('pointerdown', onDown, true);
    experience.addEventListener('pointermove', onMove);
    experience.addEventListener('pointerup', onUp);
    experience.addEventListener('pointercancel', onCancel);
    /* lostpointercapture bubbles: only the loss of THIS surface's capture ends the drag (a touch is implicitly captured by the canvas first, and handing it over loses that one) */
    const onLostCapture = (event) => { if (event.target === experience)
        onCancel(event); };
    experience.addEventListener('lostpointercapture', onLostCapture);
    /* the keyboard: the conductor's own sequence through the arrow buttons that are no longer shown */
    const onKey = (event) => {
        if (!vesselOpen() || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight'))
            return;
        if (event.target instanceof Element && event.target.closest('input, textarea, select'))
            return;
        const arrow = nav?.querySelector(event.key === 'ArrowRight' ? '.vessel-carousel-arrow-right' : '.vessel-carousel-arrow-left');
        if (!arrow)
            return;
        event.preventDefault();
        arrow.click();
    };
    window.addEventListener('keydown', onKey);
    /* the track is a picture of the selection: wherever it is changed from, the marks go there */
    const observer = new MutationObserver(followSelection);
    observer.observe(experience, { attributes: true, attributeFilter: ['data-vessel-selection'] });
    window.addEventListener('knowthyself:vessel-swap-hidden', followSelection);
    window.addEventListener('resize', measure, { passive: true });
    if (typeof ResizeObserver !== 'undefined')
        new ResizeObserver(() => { measure(); place(); }).observe(vesselStage);
    const start = () => { measure(); followSelection(); };
    start();
    window.requestAnimationFrame(start);
    return () => {
        stopSettle();
        observer.disconnect();
        experience.removeEventListener('pointerdown', onDown, true);
        experience.removeEventListener('pointermove', onMove);
        experience.removeEventListener('pointerup', onUp);
        experience.removeEventListener('pointercancel', onCancel);
        experience.removeEventListener('lostpointercapture', onLostCapture);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('knowthyself:vessel-swap-hidden', followSelection);
        window.removeEventListener('resize', measure);
        style.remove();
        layer.remove();
        for (const cue of cues)
            cue.remove();
    };
}
