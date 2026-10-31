import { t } from '../i18n/uiStrings.js?v=f9ab0a6';
import { AVATAR_PIXELS } from './avatarStore.js?v=f9ab0a6';
/*
 * CHOOSING THE CROP, INSTEAD OF BEING GIVEN ONE.
 *
 * Picking a photo used to crop it on the spot: the shortest side, centred. That
 * is the right guess and the wrong interaction - a phone portrait is mostly
 * torso, the face is in the upper third, and a centre crop reliably delivers a
 * chin. There was no way to say so.
 *
 * So: pick the photo, then frame it. Drag to move, pinch or drag the slider to
 * zoom, and the circle you are looking at is the avatar you will get.
 *
 * ONE DRAW, NOT TWO. The preview is a canvas, not a CSS transform, and it is
 * painted by the same three numbers the export uses - offset, offset, scale.
 * Previewing with `transform: translate(...) scale(...)` and then re-deriving a
 * source rectangle for the canvas would be two descriptions of one framing,
 * which is exactly the pair that drifts and ships an avatar that is not what
 * the reader confirmed. Here the export is the preview, multiplied by a single
 * ratio.
 *
 * WHAT IT DOES NOT DO. It does not store anything. It takes a File and resolves
 * with a square data URL, or with null when the reader cancels; the shell then
 * hands that to the existing avatar store, with the existing key, the existing
 * size limit and the existing refusal to send it anywhere. The full-resolution
 * photo lives in this closure and an object URL, both released when the editor
 * closes - nothing keeps it after Save.
 */
/** Below 1 the square would not be covered; the crop is never allowed to gap. */
const MIN_ZOOM = 1;
/*
 * Four times "cover" is as far in as this goes.
 *
 * Past that the exported 256px square is reading fewer than 64 source pixels
 * across, which is a blur however good the phone's camera was, and an avatar is
 * 30px on screen. A bound the reader hits and understands beats one they can
 * cross into a bad result.
 */
const MAX_ZOOM = 4;
/*
 * JPEG carries no alpha, so a PNG with a transparent corner would export as
 * black. The square is painted first, in the product's own ground, so a cut-out
 * lands on the same colour the interface behind the avatar is.
 */
const EXPORT_BACKDROP = '#14181d';
/**
 * The file, decoded, upright.
 *
 * `createImageBitmap` with `imageOrientation: 'from-image'` is what applies the
 * EXIF rotation a phone writes instead of rotating the pixels - without it a
 * portrait taken in the ordinary way arrives on its side, and the reader is
 * asked to crop a photograph that is lying down. The <img> path is the fallback
 * for anything that cannot do that.
 */
async function decode(file) {
    if (typeof createImageBitmap === 'function') {
        try {
            const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
            return {
                source: bitmap,
                width: bitmap.width,
                height: bitmap.height,
                release: () => bitmap.close(),
            };
        }
        catch {
            /* Falls through to the element, which every browser can do. */
        }
    }
    const url = URL.createObjectURL(file);
    try {
        const image = await new Promise((resolve, reject) => {
            const element = new Image();
            element.onload = () => resolve(element);
            element.onerror = () => reject(new Error('decode failed'));
            element.src = url;
        });
        return {
            source: image,
            width: image.naturalWidth,
            height: image.naturalHeight,
            release: () => URL.revokeObjectURL(url),
        };
    }
    catch (error) {
        URL.revokeObjectURL(url);
        throw error;
    }
}
const clamp = (value, low, high) => (Math.min(Math.max(value, low), high));
/**
 * The scale at which the shorter side of the image just fills the square.
 *
 * Zoom is stated relative to this, so a zoom of 1 covers by definition and the
 * caller never has to reason about which side is long.
 */
export function coverScale(side, width, height) {
    const shortest = Math.min(width, height);
    if (!(shortest > 0) || !(side > 0))
        return 1;
    return side / shortest;
}
/**
 * The offset band that keeps the square covered.
 *
 * The drawn image starts at `offset` and ends at `offset + drawn`. To leave no
 * gap it must start at or before 0 and end at or after `side`, which is exactly
 * the interval below - one line, and the reason a gap cannot be dragged or
 * zoomed into existence.
 */
export function clampOffset(offset, side, drawn) {
    if (drawn <= side)
        return (side - drawn) / 2;
    return clamp(offset, side - drawn, 0);
}
/**
 * Opens the editor. Resolves with a square data URL, or null if cancelled.
 *
 * Rejects only when the file cannot be decoded, which is the one case the
 * caller has something to say about.
 */
export async function openAvatarEditor(file) {
    const decoded = await decode(file);
    if (decoded.width < 1 || decoded.height < 1) {
        decoded.release();
        throw new Error('empty image');
    }
    return new Promise((resolve) => {
        const returnFocus = document.activeElement;
        /* ------------------------------------------------------------- markup */
        const overlay = document.createElement('div');
        overlay.className = 'kt-avatar-editor';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', t('profile.editor.title'));
        overlay.innerHTML = `
      <div class="kt-ae-panel">
        <h2 class="kt-ae-title"></h2>
        <div class="kt-ae-stage">
          <canvas class="kt-ae-canvas"></canvas>
          <div class="kt-ae-mask" aria-hidden="true"></div>
        </div>
        <p class="kt-ae-hint"></p>
        <div class="kt-ae-zoom">
          <input class="kt-ae-range" type="range" min="1" max="${MAX_ZOOM}" step="0.01" value="1">
        </div>
        <div class="kt-ae-actions">
          <button type="button" class="kt-ae-button kt-ae-reset"></button>
          <button type="button" class="kt-ae-button kt-ae-cancel"></button>
          <button type="button" class="kt-ae-button kt-ae-save"></button>
        </div>
      </div>`;
        const panel = overlay.querySelector('.kt-ae-panel');
        const stage = overlay.querySelector('.kt-ae-stage');
        const canvas = overlay.querySelector('.kt-ae-canvas');
        const range = overlay.querySelector('.kt-ae-range');
        const saveButton = overlay.querySelector('.kt-ae-save');
        overlay.querySelector('.kt-ae-title').textContent = t('profile.editor.title');
        overlay.querySelector('.kt-ae-hint').textContent = t('profile.editor.hint');
        range.setAttribute('aria-label', t('profile.editor.zoom'));
        overlay.querySelector('.kt-ae-reset').textContent = t('profile.editor.reset');
        overlay.querySelector('.kt-ae-cancel').textContent = t('profile.editor.cancel');
        saveButton.textContent = t('profile.editor.save');
        /* ------------------------------------------------------------ the crop */
        /*
         * THE WHOLE GEOMETRY, IN THREE NUMBERS.
         *
         * `side` is the square workspace in CSS pixels and the circle is inscribed
         * in it - which is exactly what the finished avatar shows, because the
         * stored image is that square and the avatar element is a round box with
         * `background-size: cover`. So the visible circle is not an approximation
         * of the result; it is the result.
         *
         * `cover` is the scale at which the shorter side just fills the square, so
         * zoom is stated relative to it and a zoom of 1 always covers - which is
         * what makes "the crop area is always filled" a property of the numbers
         * rather than a thing to remember to check.
         */
        let side = 0;
        let cover = 1;
        let zoom = MIN_ZOOM;
        /* Top-left of the drawn image, relative to the workspace's top-left. */
        let offsetX = 0;
        let offsetY = 0;
        const drawnWidth = () => decoded.width * cover * zoom;
        const drawnHeight = () => decoded.height * cover * zoom;
        /* The image may never uncover the square, so the offsets live in exactly
           the band that keeps it covered - which is also why no gap can appear at
           any zoom or after any drag. */
        const clampOffsets = () => {
            offsetX = clampOffset(offsetX, side, drawnWidth());
            offsetY = clampOffset(offsetY, side, drawnHeight());
        };
        const context = canvas.getContext('2d');
        const paint = () => {
            if (!context || side <= 0)
                return;
            const ratio = Math.min(window.devicePixelRatio || 1, 3);
            const pixels = Math.round(side * ratio);
            if (canvas.width !== pixels || canvas.height !== pixels) {
                canvas.width = pixels;
                canvas.height = pixels;
            }
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            context.clearRect(0, 0, side, side);
            context.imageSmoothingQuality = 'high';
            context.drawImage(decoded.source, offsetX, offsetY, drawnWidth(), drawnHeight());
        };
        /** Centres the image at "cover". The state the editor opens in, and Reset. */
        const reset = () => {
            zoom = MIN_ZOOM;
            offsetX = (side - drawnWidth()) / 2;
            offsetY = (side - drawnHeight()) / 2;
            clampOffsets();
            range.value = String(zoom);
            paint();
        };
        /*
         * Zoom about a point, so the thing under the fingers stays under them.
         *
         * Scaling about the workspace centre instead would slide the face out from
         * under a pinch, which reads as the image fighting the gesture.
         */
        const zoomTo = (next, anchorX, anchorY) => {
            const target = clamp(next, MIN_ZOOM, MAX_ZOOM);
            const factor = target / zoom;
            if (factor === 1)
                return;
            zoom = target;
            offsetX = anchorX - (anchorX - offsetX) * factor;
            offsetY = anchorY - (anchorY - offsetY) * factor;
            clampOffsets();
            range.value = String(zoom);
            paint();
        };
        /*
         * The workspace can change size under the crop - a phone turned sideways is
         * the ordinary way. Everything is proportional to `side`, so the offsets
         * are carried across by the same ratio and the framing survives the turn.
         */
        const measure = () => {
            const next = stage.getBoundingClientRect().width;
            if (next <= 0)
                return;
            const previous = side;
            side = next;
            cover = coverScale(side, decoded.width, decoded.height);
            if (previous <= 0) {
                reset();
                return;
            }
            const ratio = side / previous;
            offsetX *= ratio;
            offsetY *= ratio;
            clampOffsets();
            paint();
        };
        /* ---------------------------------------------------------- gestures */
        /*
         * Pointer events, so one code path serves a finger, a mouse and a stylus.
         * `touch-action: none` on the stage is what stops the page scrolling or the
         * browser zooming while a crop gesture is in progress - it is a declaration
         * the browser honours before the first move event, which preventDefault on
         * touchmove cannot be relied on to do.
         */
        const active = new Map();
        let pinchDistance = 0;
        let pinchZoom = 1;
        const localPoint = (event) => {
            const rect = canvas.getBoundingClientRect();
            return { x: event.clientX - rect.left, y: event.clientY - rect.top };
        };
        const twoPointers = () => [...active.values()].slice(0, 2);
        stage.addEventListener('pointerdown', (event) => {
            /* Capture keeps a finger that wanders off the square still driving the
               crop. It throws if the pointer has already been released - a real race
               on a flaky touchscreen - and losing capture is not a reason to lose the
               gesture, so the drag is set up either way. */
            try {
                stage.setPointerCapture(event.pointerId);
            }
            catch {
                /* Dragging still works; it simply stops at the edge of the square. */
            }
            active.set(event.pointerId, localPoint(event));
            if (active.size === 2) {
                const [first, second] = twoPointers();
                pinchDistance = Math.hypot(first.x - second.x, first.y - second.y);
                pinchZoom = zoom;
            }
        });
        stage.addEventListener('pointermove', (event) => {
            const previous = active.get(event.pointerId);
            if (!previous)
                return;
            const point = localPoint(event);
            active.set(event.pointerId, point);
            if (active.size >= 2) {
                const [first, second] = twoPointers();
                const distance = Math.hypot(first.x - second.x, first.y - second.y);
                if (pinchDistance > 0 && distance > 0) {
                    zoomTo(pinchZoom * (distance / pinchDistance), (first.x + second.x) / 2, (first.y + second.y) / 2);
                }
                return;
            }
            offsetX += point.x - previous.x;
            offsetY += point.y - previous.y;
            clampOffsets();
            paint();
        });
        /*
         * Lifting one finger of a pinch leaves the other one dragging, and it does
         * so without a jump: the map already holds that pointer's latest position,
         * so the next move measures from where the finger actually is.
         */
        const endPointer = (event) => {
            active.delete(event.pointerId);
            if (active.size < 2)
                pinchDistance = 0;
        };
        stage.addEventListener('pointerup', endPointer);
        stage.addEventListener('pointercancel', endPointer);
        range.addEventListener('input', () => {
            /* The slider has no finger to keep still, so it works about the middle of
               the circle - which is what a person watching the centre expects. */
            zoomTo(Number(range.value), side / 2, side / 2);
        });
        /* ------------------------------------------------------------ closing */
        let observer = null;
        const close = (value) => {
            observer?.disconnect();
            document.removeEventListener('keydown', onKey, true);
            overlay.remove();
            /* The original photograph goes no further than this function. */
            decoded.release();
            if (returnFocus instanceof HTMLElement)
                returnFocus.focus({ preventScroll: true });
            resolve(value);
        };
        /**
         * The confirmed crop, at storage size.
         *
         * The same three numbers the preview was painted with, multiplied by one
         * ratio. Nothing is re-derived, so there is no arithmetic here that could
         * disagree with what the reader just looked at.
         */
        const save = () => {
            const scale = AVATAR_PIXELS / side;
            const output = document.createElement('canvas');
            output.width = AVATAR_PIXELS;
            output.height = AVATAR_PIXELS;
            const target = output.getContext('2d');
            if (!target) {
                close(null);
                return;
            }
            target.fillStyle = EXPORT_BACKDROP;
            target.fillRect(0, 0, AVATAR_PIXELS, AVATAR_PIXELS);
            target.imageSmoothingQuality = 'high';
            target.drawImage(decoded.source, offsetX * scale, offsetY * scale, drawnWidth() * scale, drawnHeight() * scale);
            close(output.toDataURL('image/jpeg', 0.82));
        };
        function onKey(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                close(null);
            }
        }
        overlay.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof Element))
                return;
            if (target.closest('.kt-ae-save')) {
                save();
                return;
            }
            if (target.closest('.kt-ae-cancel')) {
                close(null);
                return;
            }
            if (target.closest('.kt-ae-reset')) {
                reset();
                return;
            }
            /* The scrim dismisses, the panel does not. */
            if (!panel.contains(target))
                close(null);
        });
        document.addEventListener('keydown', onKey, true);
        installStyles();
        document.body.append(overlay);
        measure();
        observer = new ResizeObserver(measure);
        observer.observe(stage);
        saveButton.focus({ preventScroll: true });
    });
}
let stylesInstalled = false;
function installStyles() {
    if (stylesInstalled)
        return;
    stylesInstalled = true;
    const style = document.createElement('style');
    style.dataset.avatarEditor = 'true';
    /* NO BACKTICKS ANYWHERE IN THIS CSS, including inside comments: it is a
       template literal and one would end the string. */
    style.textContent = `
    .kt-avatar-editor {
      position: fixed;
      inset: 0;
      z-index: 12000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      background: rgba(4, 6, 9, .78);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      overscroll-behavior: contain;
    }

    .kt-avatar-editor .kt-ae-panel {
      width: min(100%, 340px);
      max-height: calc(100vh - 36px);
      overflow-y: auto;
      padding: 16px 16px 18px;
      border: 1px solid rgba(248, 252, 255, .18);
      border-radius: 20px;
      background: rgba(10, 14, 19, .96);
      box-shadow: 0 18px 48px rgba(0, 0, 0, .5);
      color: rgba(250, 250, 247, .92);
      text-align: center;
    }

    .kt-avatar-editor .kt-ae-title {
      margin: 0 0 12px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 17px;
      font-weight: 400;
    }

    /* The square workspace. The circle below is inscribed in it, and that
       circle is what the finished avatar shows. */
    .kt-avatar-editor .kt-ae-stage {
      position: relative;
      width: min(78vw, 292px);
      margin: 0 auto;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      border-radius: 14px;
      background: #14181d;
      /* Declared, not prevented in a listener: the browser must know before the
         first move that this surface does not scroll or zoom the page. */
      touch-action: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: grab;
    }

    .kt-avatar-editor .kt-ae-stage:active { cursor: grabbing; }

    .kt-avatar-editor .kt-ae-canvas {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .kt-avatar-editor .kt-ae-mask {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      box-shadow:
        0 0 0 1px rgba(248, 252, 255, .55) inset,
        0 0 0 9999px rgba(6, 9, 12, .62);
      pointer-events: none;
    }

    .kt-avatar-editor .kt-ae-hint {
      margin: 12px 0 6px;
      color: rgba(235, 231, 221, .56);
      font-size: 11px;
      line-height: 1.45;
    }

    .kt-avatar-editor .kt-ae-zoom { padding: 0 2px 4px; }

    .kt-avatar-editor .kt-ae-range {
      width: 100%;
      margin: 0;
      accent-color: rgb(var(--kt-accent-rgb, 218, 171, 84));
      /* The slider is a control, not a crop surface: it keeps its own gesture. */
      touch-action: auto;
    }

    .kt-avatar-editor .kt-ae-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .kt-avatar-editor .kt-ae-button {
      flex: 1 1 84px;
      padding: 10px 10px;
      border: 1px solid rgba(248, 252, 255, .26);
      border-radius: 999px;
      background: rgba(248, 252, 255, .06);
      color: rgba(250, 250, 247, .90);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }

    .kt-avatar-editor .kt-ae-save {
      border-color: rgba(var(--kt-accent-rgb, 218, 171, 84), .55);
      background: rgba(var(--kt-accent-rgb, 218, 171, 84), .18);
    }

    @media (max-height: 620px) {
      .kt-avatar-editor .kt-ae-stage { width: min(58vw, 210px); }
      .kt-avatar-editor .kt-ae-hint { margin: 8px 0 4px; }
    }
  `;
    document.head.append(style);
}
