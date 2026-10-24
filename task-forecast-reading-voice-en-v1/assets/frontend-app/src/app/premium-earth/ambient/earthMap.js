import { OCEAN_KEY } from './ambientShaders.js';
/*
 * THE REAL EARTH, AS THE GLOBE'S SURFACE.
 *
 * The first ambient globe drew its land by hand (continents.ts): coarse coastlines "accurate to a few degrees", which is
 * not what a person looking at a planet needs to see - Africa has to be Africa. So the surface is now a real day map:
 * NASA's Blue Marble (land surface, shallow water and shaded topography), 2048 x 1024, equirectangular, shipped with the
 * application as one static file (public/assets/earth/, credit in CREDITS.txt) and drawn from the same origin. Nothing is
 * fetched from NASA at run time, no map provider is involved, and the file is read once.
 *
 * WHAT THE MAP IS USED FOR. Its colour is the land; its flat navy is the sea, which the bake shader replaces with the
 * globe's own ocean (depth, shelf, glint) so the water can be lit and can shine. Telling the two apart is `oceanWeight`
 * below - the same formula as the shader, which is built from the same constants (OCEAN_KEY), so the two cannot drift.
 *
 * IF IT CANNOT BE HAD (an offline cache miss, a blocked request) the globe still draws, from the hand-drawn mask it had
 * before: a coarser planet rather than none. `loadEarthMap` answers null after a short wait and the caller carries on.
 */
export const EARTH_MAP_URL = '/know-thyself-preview/task-forecast-reading-voice-en-v1/assets/earth/earth-day-2048.jpg';
/** The map's size in pixels: two to one, a power of two on each side, as WebGL 1 needs for mipmaps and for REPEAT. */
export const EARTH_MAP_WIDTH = 2048;
export const EARTH_MAP_HEIGHT = 1024;
/** How long a globe waits for the map before it starts from the hand-drawn one. */
export const EARTH_MAP_WAIT_MS = 3000;
const loaded = new Map();
const loading = new Map();
/** The map, once it has arrived: synchronous, for a rebuild that must not wait. Null until then. */
export function loadedEarthMap(url = EARTH_MAP_URL) {
    return loaded.get(url) ?? null;
}
/** Starts the one request (a second call shares it) and answers with the image, or null if it fails or takes longer than `waitMs`. */
export function loadEarthMap(url = EARTH_MAP_URL, waitMs = EARTH_MAP_WAIT_MS) {
    const ready = loaded.get(url);
    if (ready)
        return Promise.resolve(ready);
    let request = loading.get(url);
    if (!request) {
        request = new Promise((resolve) => {
            if (typeof Image !== 'function') {
                resolve(null);
                return;
            }
            const image = new Image();
            image.decoding = 'async';
            image.onload = () => {
                if (image.naturalWidth > 0) {
                    loaded.set(url, image);
                    resolve(image);
                }
                else {
                    loading.delete(url);
                    resolve(null);
                }
            };
            image.onerror = () => { loading.delete(url); resolve(null); };
            image.src = url;
        });
        loading.set(url, request);
    }
    return new Promise((resolve) => {
        const timer = setTimeout(() => resolve(null), waitMs);
        void request.then((image) => { clearTimeout(timer); resolve(image); });
    });
}
/** Draws the map into a canvas of the given width (and half that height): a smaller one for a constrained device. */
export function drawEarthMap(canvas, image, width) {
    const height = Math.round(width / 2);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error('A 2D canvas is needed to draw the Earth.');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, width, height);
    return canvas;
}
const smoothstep = (from, to, x) => {
    const t = Math.min(1, Math.max(0, (x - from) / (to - from)));
    return t * t * (3 - 2 * t);
};
/**
 * How much of a map pixel is open water, 0..1, from its colour (each channel 0..1). The sea of this map is a deep navy:
 * blue well above red and green, and dark. Land is never that - forest is green over blue, desert is red over blue, ice is
 * bright - and the pale turquoise of a coral shelf is bright, so it is kept as the shallows it is.
 */
export function oceanWeight(red, green, blue) {
    const luma = 0.299 * red + 0.587 * green + 0.114 * blue;
    const blueOver = blue - Math.max(red, green);
    return smoothstep(OCEAN_KEY.blueOverFrom, OCEAN_KEY.blueOverTo, blueOver) * (1 - smoothstep(OCEAN_KEY.lumaFrom, OCEAN_KEY.lumaTo, luma));
}
