/*
 * WHERE THE EARTH'S DISC IS, AS THE GLOBE KNOWS IT.
 *
 * The ambient globe is the only thing that knows where the planet's disc is on screen: its framing (radius as a share of the
 * short side, centre as a share of each side) laid on its own box. Everything drawn around the planet that is NOT inside the
 * canvas - the vessel glow ring and its ripples, the lighting editor that reads the ring's box - used to be sized from the
 * Google camera's range and field of view, or from a layout estimate of the scene, and so sat on whatever disc the Google
 * globe once had: the wrong size for this planet, stale after Google was unmounted, and not following it while it moved.
 *
 * So the globe says where its disc is. It dispatches AMBIENT_DISC_EVENT on the window whenever the disc changes (every frame of
 * a framing move, a resize, the first drawn frame) with the element it lives in and its framing; whoever draws around the
 * planet reads the LIVE box of that element through discOnScreen() and so lands on the same circle the shader draws.
 * `detail: null` says the ambient globe is gone and the Google camera is the authority again.
 *
 * No imports: this file is read by the interface layer and must not pull the renderer in with it.
 */
export const AMBIENT_DISC_EVENT = 'knowthyself:ambient-disc';
/**
 * The disc in the coordinates of `box`: the circle the camera in ambientMath.cameraFor puts on screen. Pure, so the globe, the
 * glow and the tests all read one formula.
 */
export function discOnScreen(box, framing) {
    return {
        x: box.left + framing.x * box.width,
        y: box.top + framing.y * box.height,
        diameter: 2 * framing.radius * Math.min(box.width, box.height),
    };
}
