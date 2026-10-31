/*
 * THE SPRITES
 * -----------
 * Every mote is one drawImage of a small pre-rendered sprite: a radial gradient with a body and a falloff. The falloff is the
 * mote's softness: a third of the radius for a crisp point, up to about the radius itself for the slightly diffuse dots of the
 * nearest plane (0.7 of it in V3.2) - never more, so there is no halo, no tail and no disc. It is painted into the gradient ONCE; it is not a CSS filter
 * or a canvas filter and nothing blurs the canvas as a whole, so the browser never runs a blur pass. A sprite exists for each (plane, palette colour, softness level) that is
 * used, is rebuilt only when the tint or the softness scale changes, and not every frame while the tint eases (the layer
 * throttles that).
 *
 * The core of a mote stays on its palette colour; only the outer edge leans toward the scene tint, and only by TINT_STRENGTH, so
 * a mote can never become a saturated coloured dot.
 */
import { DEPTH_CLASSES, NEUTRAL_BASES, TINT_STRENGTH, mixRgb } from './particleModel.js?v=d9f39e7';
/** Sprite canvas edge in px for each plane. A mote is drawn at about 1-2 CSS px (2-4 device px), so a sprite is a handful of pixels: scaled down by under 2x, it never aliases. The sizes differ only so a draw call identifies its plane. */
export const SPRITE_SIZE = Object.freeze({ far: 6, mid: 8, near: 10 });
export const spriteKey = (request) => `${request.depth}:${request.base}:${request.soft}`;
const rgba = (rgb, alpha) => (`rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${alpha.toFixed(3)})`);
/**
 * The gradient stops of a sprite of a given softness, as [offset, alpha] pairs along the radius, with the body ending at `body`
 * (the share of the radius that is the mote itself; the rest is the falloff). Every sprite is a DOT: a near-solid body, then a short
 * feathered edge that is finished well inside the sprite. There is no rim, no plateau and no long tail - those are what made V3's
 * defocused discs read as bubbles and haze. Softer simply means a slightly wider edge and a slightly lower peak.
 */
export function spriteStops(blur) {
    const body = 1 / (1 + blur);
    const core = Math.min(1, Math.max(0.85, 1 - 0.12 * Math.max(0, blur - 0.3)));
    return {
        body,
        core,
        stops: [
            [0, core],
            [body * 0.7, core],
            [body, core * 0.7],
            [body + (1 - body) * 0.5, core * 0.16],
            [1, 0],
        ],
    };
}
/** The softness extent a request paints, as a multiple of the radius. */
export const requestBlur = (request) => DEPTH_CLASSES[request.depth].softness[request.soft] * request.blurScale;
/** Paint one sprite. `canvas` is a fresh canvas of SPRITE_SIZE[depth]. Pure drawing: returns nothing, reads nothing. */
export function paintSprite(canvas, request) {
    const size = SPRITE_SIZE[request.depth];
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    const half = size / 2;
    const core = NEUTRAL_BASES[request.base] ?? NEUTRAL_BASES[0];
    const edge = mixRgb(core, request.tint, TINT_STRENGTH * 2.2);
    const { body, stops } = spriteStops(requestBlur(request));
    ctx.clearRect(0, 0, size, size);
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    for (const [offset, alpha] of stops) {
        /* The edge leans toward the tint: the colour moves from the core to the edge colour as the gradient leaves the body. */
        const lean = Math.min(1, Math.max(0, (offset - body * 0.7) / (1 - body * 0.7)));
        gradient.addColorStop(offset, rgba(mixRgb(core, edge, lean), alpha));
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
}
