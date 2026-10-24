/*
 * WHERE THE MOON IS ON THE SCREEN, FOR WHAT IS DRAWN OVER THE CANVAS.
 *
 * The ambient backdrop (the purple glow and its two bands of wave lines, onboardingAmbientBackdrop.ts) is a DOM layer stacked ABOVE the globe's
 * canvas: that is how a glow can lift the black of the sky without a second WebGL pass. It also means everything the canvas draws is under it -
 * the Moon too - so where the Moon crossed a band the wave lines and the glow were painted across a body that is solid in the canvas, and it
 * read as a ghost again. The Moon cannot be drawn above a DOM layer (that would take a second canvas), so the layer makes room for it: the
 * globe says where the Moon's silhouette is, and the backdrop cuts that circle out of itself.
 *
 * So, as the disc is published for the vessel glow (ambientDisc.ts), the globe dispatches AMBIENT_MOON_EVENT on the window whenever the Moon's
 * silhouette changed, as fractions of the globe's own box (which is the backdrop's box: both are pinned to the resting scene). `detail: null`
 * says there is no Moon to make room for (not drawn, context lost, globe gone).
 *
 * No imports: the interface layer reads this file and must not pull the renderer in with it.
 */
export const AMBIENT_MOON_EVENT = 'knowthyself:ambient-moon';
/**
 * The silhouette of a Moon drawn at view position `position` (Earth radii, the view's frame) with radius `radius`, for a camera `distance`
 * Earth radii from the Earth's centre, with `halfTan` = tan(field of view / 2), framed at `framing` (where the Earth's centre lands, as a share
 * of the canvas), on a canvas `width` x `height`. This is the renderer's own projection written out (ambientMath.ts perspective(): a pinhole
 * of focal length 1 / halfTan, lens-shifted so the Earth's centre is at `framing`): a point at depth z is (height / 2) / halfTan / (distance - z)
 * pixels per Earth radius from the shifted centre, and the Moon's disc is that times its radius. (Not the Earth's silhouette radius, which is the
 * tangent circle and a half per cent off for points far from the centre.)
 */
export function moonSilhouette(position, radius, distance, halfTan, framing, width, height) {
    const perUnit = (height / 2) / halfTan / (distance - position[2]);
    const discPx = radius * perUnit;
    return {
        x: framing.x + (position[0] * perUnit) / width,
        y: framing.y - (position[1] * perUnit) / height,
        rx: discPx / width,
        ry: discPx / height,
    };
}
/**
 * What a layer drawn around the planet and ABOVE the canvas (the vessel glow ring's ripple field, vesselArrowOnlyPolish.ts) cuts out of itself to leave room for
 * the Moon: the silhouette is a share of the globe's box (`width` x `height`, in the layer's own pixels), the Earth's centre is at `framing` (also a share of that
 * box, ambientDisc.ts), and the layer is centred on the Earth - so the Moon's centre is its share minus the Earth's, times the box. A circle, so one radius
 * (the horizontal one: `rx` is the radius as a share of the width). Pure arithmetic on numbers the globe already published: nothing is measured.
 */
export function moonCutAboutEarth(moon, framing, width, height) {
    return { cx: (moon.x - framing.x) * width, cy: (moon.y - framing.y) * height, r: moon.rx * width };
}
