/*
 * WHERE THE SUN IS ON THE SCREEN, FOR WHAT IS DRAWN OVER THE CANVAS.
 *
 * The same problem, and the same answer, as the Moon's (ambientMoonMask.ts): the ambient backdrop (the glow and its bands of wave lines) is a DOM layer stacked
 * ABOVE the globe's canvas, so wherever the Sun - a point of blinding light in the canvas - passes through the upper glow or a band, the wave lines are painted
 * across its core and its corona. The Sun cannot be drawn above a DOM layer (that would take a second canvas), so the layer makes room: the globe says where the
 * Sun is and how big its clean region is, and the backdrop cuts that circle out of itself, feathered, together with the Moon's if both are up.
 *
 * Only the CORE and the immediate CORONA are made clean (SUN_MASK_REACH core radii, fully clear to a third of it): the glare veil, the streak, the ghosts and the
 * ring are a lens effect over the whole canvas and are not masked - the backdrop is meant to sit behind them. A Sun that is behind the planet, or off the canvas,
 * has no mask.
 *
 * Fractions of the globe's own box, which is the backdrop's box, so the numbers are the same whatever the pixel ratio. `detail: null` says there is nothing to make
 * room for. No imports: the interface layer reads this file and must not pull the renderer in with it.
 */
export const AMBIENT_SUN_EVENT = 'knowthyself:ambient-sun';
/** How far the clean region reaches, in core radii: the hot core and the corona that is bright enough for a wave line to show across. */
export const SUN_MASK_REACH = 9;
/** The Sun's clean region for a core of `coreRadius` pixels centred at (`x`, `y`) pixels, y down, on a canvas `width` x `height` pixels. */
export function sunMaskFor(x, y, coreRadius, width, height) {
    const radius = SUN_MASK_REACH * coreRadius;
    return { x: x / width, y: y / height, rx: radius / width, ry: radius / height };
}
/** Whether a Sun still has anything to make room for: some of its disc is not behind the planet, and its source is drawn. */
export function sunNeedsRoom(visible, source) {
    return visible > 0.02 && source > 0.02;
}
