import { DESERTS, LAKES, LAND } from './continents.js?v=f9ab0a6';
/*
 * THE ONE PLACE THE EARTH'S SURFACE IS MADE.
 *
 * The renderer samples one RGB texture, equirectangular, 2:1, longitude -180
 * to 180 left to right and latitude +90 to -90 top to bottom - the row order
 * of every published world map, which is the order the sphere mesh expects.
 *
 *   R   land            1 on land, 0 on water. Lakes are cut out.
 *   G   coastal shelf   a soft band along every coast, the pale shallows
 *   B   desert weight   soft ellipses over the great deserts
 *
 * Everything the eye reads as a surface - ocean depth, forest, steppe, tundra,
 * ice, mountains, cloud - the shader works out from these three channels, the
 * latitude and noise. So replacing the hand-drawn land with a real day map is
 * one function: hand the renderer a texture of its own and skip this file.
 *
 * The mask is drawn on a 2D canvas. Channels are added with `lighter`, each in
 * a pure colour of its own, so they never disturb one another; the lakes are
 * removed from red alone with `multiply`.
 */
export const MASK_ASPECT = 2;
const pixelOf = (longitude, latitude, width, height) => [
    ((longitude + 180) / 360) * width,
    ((90 - latitude) / 180) * height,
];
function trace(ctx, ring, width, height) {
    ring.forEach(([longitude, latitude], index) => {
        const [x, y] = pixelOf(longitude, latitude, width, height);
        if (index === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);
    });
    ctx.closePath();
}
/** Draws the three channels into a canvas of the given width (and half that height). */
export function drawSurfaceMask(canvas, width) {
    const height = Math.round(width / MASK_ASPECT);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error('A 2D canvas is needed to draw the Earth.');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    /* LAND, in red. */
    ctx.fillStyle = 'rgb(255,0,0)';
    for (const { ring } of LAND) {
        ctx.beginPath();
        trace(ctx, ring, width, height);
        ctx.fill();
    }
    /* LAKES: red is multiplied away, green and blue are left alone. */
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgb(0,255,255)';
    for (const { ring } of LAKES) {
        ctx.beginPath();
        trace(ctx, ring, width, height);
        ctx.fill();
    }
    /* SHELF, in green: three strokes of falling width along every coast. */
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    const unit = width / 360;
    for (const [reach, alpha] of [[3.4, 0.13], [2.2, 0.15], [1.2, 0.17], [0.55, 0.2]]) {
        ctx.strokeStyle = `rgba(0,255,0,${alpha})`;
        ctx.lineWidth = reach * 2 * unit;
        for (const { ring } of LAND) {
            ctx.beginPath();
            trace(ctx, ring, width, height);
            ctx.stroke();
        }
    }
    /* DESERT, in blue: a soft ellipse each. */
    for (const [longitude, latitude, halfWidth, halfHeight, weight] of DESERTS) {
        const [x, y] = pixelOf(longitude, latitude, width, height);
        ctx.save();
        ctx.translate(x, y);
        ctx.scale((halfWidth / 180) * width * 0.5, (halfHeight / 90) * height * 0.5);
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
        gradient.addColorStop(0, `rgba(0,0,255,${weight})`);
        gradient.addColorStop(0.55, `rgba(0,0,255,${weight * 0.6})`);
        gradient.addColorStop(1, 'rgba(0,0,255,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    ctx.globalCompositeOperation = 'source-over';
    return canvas;
}
/* ------------------------------------------------------------------ *
 * QUESTIONS ABOUT THE DATA, WITHOUT A CANVAS
 * ------------------------------------------------------------------ */
function inside(ring, longitude, latitude) {
    let within = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
        const [xi, yi] = ring[i];
        const [xj, yj] = ring[j];
        if ((yi > latitude) !== (yj > latitude) && longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi)
            within = !within;
    }
    return within;
}
/** Whether a point is on drawn land: in a landmass and in no lake. Used by tests and nowhere in the renderer. */
export function isDrawnLand(latitude, longitude) {
    if (!LAND.some(({ ring }) => inside(ring, longitude, latitude)))
        return false;
    return !LAKES.some(({ ring }) => inside(ring, longitude, latitude));
}
