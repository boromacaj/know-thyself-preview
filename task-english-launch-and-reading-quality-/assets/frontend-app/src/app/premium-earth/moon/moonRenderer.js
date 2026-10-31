import { loadEarthMap } from '../ambient/earthMap.js';
import { moonPixel, sunDirection } from './moonShading.js';
/*
 * THE MOON'S PICTURE: ONE CANVAS, ONE SHADER, THE SAME ARITHMETIC AS moonShading.ts.
 *
 * WebGL 1 (every phone that can draw the Earth in this application can draw this) with one full-screen triangle strip and one fragment shader that is moonShading.moonPixel written in GLSL: the
 * disc, the sphere's map coordinates, the elevation map bending the normal, the Lommel-Seeliger brightness, the terminator softness and the earthshine. There is no 3D engine, no geometry beyond the
 * two triangles and no per-frame work when nothing moves: the canvas is drawn when the phase changes (a date was picked: a few dozen frames) and when it is resized, and not otherwise.
 *
 * TWO TEXTURES, ONE REQUEST EACH: the NASA colour map (458 kB) and elevation map (112 kB), public/assets/moon/, credit in CREDITS.txt, loaded the first time a Forecast day is on screen and kept. The
 * loader is the Earth map's (earthMap.ts), so a failed request is a null and not an exception.
 *
 * WHERE IT CANNOT RUN (no WebGL, a lost context, a canvas that refuses a context) the same function draws the same picture on a 2D canvas, pixel by pixel from moonShading.moonPixel, at a lower
 * resolution and only when the phase changes. Where even that cannot be, the caller keeps the vector disc the markup carries.
 */
export const MOON_COLOUR_URL = '/know-thyself-preview/task-english-launch-and-reading-quality-/assets/moon/lroc_color_2k.jpg';
export const MOON_HEIGHT_URL = '/know-thyself-preview/task-english-launch-and-reading-quality-/assets/moon/ldem_3_8bit.jpg';
/** How long the first picture waits for the two maps. */
export const MOON_TEXTURE_WAIT_MS = 8000;
let texturesPromise = null;
/** The two maps, requested once and shared; null if either cannot be had. */
export function loadMoonTextures() {
    if (!texturesPromise) {
        texturesPromise = Promise.all([loadEarthMap(MOON_COLOUR_URL, MOON_TEXTURE_WAIT_MS), loadEarthMap(MOON_HEIGHT_URL, MOON_TEXTURE_WAIT_MS)])
            .then(([colour, height]) => (colour && height ? { colour, height } : null));
        texturesPromise.then((value) => { if (!value)
            texturesPromise = null; });
    }
    return texturesPromise;
}
const VERTEX = `
attribute vec2 aPos;
varying vec2 vPos;
void main() { vPos = aPos; gl_Position = vec4(aPos, 0.0, 1.0); }`;
/* moonShading.moonPixel, in GLSL ES 1.00. The constants are moonShading's (RELIEF_STRENGTH, EARTHSHINE, TERMINATOR_SOFTNESS, EXPOSURE, SATURATION, LIMB_FLOOR, LIMB_REACH). */
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vPos;
uniform sampler2D uColour;
uniform sampler2D uHeight;
uniform vec3 uSun;
uniform float uSouth;
uniform float uRadiusPx;
uniform vec2 uTexel;
const float PI = 3.14159265;
const float RELIEF = 3.2;
const float EARTHSHINE = 0.014;
const float LIMB_FLOOR = 0.72;
const float LIMB_REACH = 0.32;
const float SOFT = 0.05;
const float EXPOSURE = 1.0;
const float SATURATION = 0.62;
vec3 lin(vec3 c) { return pow(clamp(c, 0.0, 1.0), vec3(2.2)); }
float h(vec2 uv) { return texture2D(uHeight, uv).r; }
void main() {
  float r = length(vPos);
  float coverage = clamp((1.0 - r) * uRadiusPx + 0.5, 0.0, 1.0);
  if (coverage <= 0.0) { gl_FragColor = vec4(0.0); return; }
  float rc = min(r, 0.9999);
  float z = sqrt(1.0 - rc * rc);
  float sc = r > 0.9999 ? 0.9999 / r : 1.0;
  vec3 nView = vec3(vPos * sc, z);
  vec3 nMap = uSouth > 0.5 ? vec3(-nView.xy, nView.z) : nView;
  vec2 uv = vec2(0.5 + atan(nMap.x, nMap.z) / (2.0 * PI), 0.5 - asin(clamp(nMap.y, -1.0, 1.0)) / PI);
  vec3 albedoLin = lin(texture2D(uColour, uv).rgb);
  float grey = dot(albedoLin, vec3(0.2126, 0.7152, 0.0722));
  vec3 albedo = vec3(grey) + (albedoLin - vec3(grey)) * SATURATION;
  float gradU = (h(uv + vec2(uTexel.x, 0.0)) - h(uv - vec2(uTexel.x, 0.0))) * 0.5;
  float gradV = (h(uv - vec2(0.0, uTexel.y)) - h(uv + vec2(0.0, uTexel.y))) * 0.5;
  float cosLat = max(sqrt(1.0 - nMap.y * nMap.y), 0.18);
  vec3 east = normalize(vec3(nMap.z, 0.0, -nMap.x));
  vec3 north = normalize(vec3(-nMap.x * nMap.y, 1.0 - nMap.y * nMap.y, -nMap.z * nMap.y));
  float reliefFade = smoothstep(0.06, 0.34, z);
  vec3 bentMap = normalize(nMap - (gradU / cosLat) * RELIEF * 6.0 * reliefFade * east - gradV * RELIEF * 6.0 * reliefFade * north);
  vec3 bent = uSouth > 0.5 ? vec3(-bentMap.xy, bentMap.z) : bentMap;
  float geometric = dot(nView, uSun);
  float lit = smoothstep(0.0, SOFT, geometric);
  float m0 = max(dot(bent, uSun), 0.0);
  float m = max(z, 0.04);
  float limb = LIMB_FLOOR + (1.0 - LIMB_FLOOR) * smoothstep(0.0, LIMB_REACH, z);
  float direct = lit * (2.0 * m0) / (m0 + m + 0.0001) * limb;
  float fullness = (1.0 + uSun.z) * 0.5;
  float shine = EARTHSHINE * (1.0 - fullness) * (1.0 - lit);
  vec3 colour = pow(clamp(albedo * EXPOSURE * (direct + shine), 0.0, 1.0), vec3(1.0 / 2.2));
  gl_FragColor = vec4(colour * coverage, coverage);
}`;
function compile(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader)
        throw new Error('no shader');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(`shader: ${gl.getShaderInfoLog(shader) ?? ''}`);
    return shader;
}
function texture(gl, unit, image) {
    const handle = gl.createTexture();
    if (!handle)
        throw new Error('no texture');
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, handle);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    /* 2048 x 1024 and 1024 x 512: powers of two, so WebGL 1 can mipmap them */
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return handle;
}
export function createWebglMoon(textures, onLost) {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, preserveDrawingBuffer: true });
    if (!gl)
        return null;
    try {
        const program = gl.createProgram();
        if (!program)
            return null;
        gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
        gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
            return null;
        gl.useProgram(program);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'aPos');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        const colourTexture = texture(gl, 0, textures.colour);
        const heightTexture = texture(gl, 1, textures.height);
        gl.uniform1i(gl.getUniformLocation(program, 'uColour'), 0);
        gl.uniform1i(gl.getUniformLocation(program, 'uHeight'), 1);
        gl.uniform2f(gl.getUniformLocation(program, 'uTexel'), 1 / textures.height.naturalWidth, 1 / textures.height.naturalHeight);
        const sun = gl.getUniformLocation(program, 'uSun');
        const south = gl.getUniformLocation(program, 'uSouth');
        const radius = gl.getUniformLocation(program, 'uRadiusPx');
        gl.clearColor(0, 0, 0, 0);
        canvas.addEventListener('webglcontextlost', (event) => { event.preventDefault(); onLost(); });
        let lastAngle = 0;
        let lastObserver = 'north';
        const renderer = {
            canvas,
            mode: 'webgl',
            resize(cssPixels, pixelRatio) {
                const size = Math.max(64, Math.round(cssPixels * Math.min(pixelRatio, 2.5)));
                if (canvas.width === size && canvas.height === size)
                    return;
                canvas.width = size;
                canvas.height = size;
                renderer.draw(lastAngle, lastObserver);
            },
            draw(angle, observer) {
                lastAngle = angle;
                lastObserver = observer;
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.clear(gl.COLOR_BUFFER_BIT);
                const direction = sunDirection(angle, observer);
                gl.uniform3f(sun, direction[0], direction[1], direction[2]);
                gl.uniform1f(south, observer === 'south' ? 1 : 0);
                gl.uniform1f(radius, canvas.width / 2);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            },
            dispose() {
                gl.deleteTexture(colourTexture);
                gl.deleteTexture(heightTexture);
                gl.getExtension('WEBGL_lose_context')?.loseContext();
            },
        };
        return renderer;
    }
    catch {
        return null;
    }
}
/** The map and the elevation as bilinear samplers over the images' own pixels, for the 2D drawing. */
function samplersFrom(textures) {
    const read = (image) => {
        const scratch = document.createElement('canvas');
        scratch.width = image.naturalWidth;
        scratch.height = image.naturalHeight;
        const context = scratch.getContext('2d', { willReadFrequently: true });
        if (!context)
            return null;
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, scratch.width, scratch.height);
    };
    const colour = read(textures.colour);
    const height = read(textures.height);
    if (!colour || !height)
        return null;
    const bilinear = (data, u, v, channel) => {
        const x = Math.min(data.width - 1.001, Math.max(0, u * data.width - 0.5));
        const y = Math.min(data.height - 1.001, Math.max(0, v * data.height - 0.5));
        const x0 = Math.floor(x);
        const y0 = Math.floor(y);
        const fx = x - x0;
        const fy = y - y0;
        const at = (xx, yy) => data.data[(yy * data.width + xx) * 4 + channel];
        return ((at(x0, y0) * (1 - fx) + at(x0 + 1, y0) * fx) * (1 - fy) + (at(x0, y0 + 1) * (1 - fx) + at(x0 + 1, y0 + 1) * fx) * fy) / 255;
    };
    return {
        colour: (u, v) => [bilinear(colour, u, v, 0), bilinear(colour, u, v, 1), bilinear(colour, u, v, 2)],
        height: (u, v) => bilinear(height, u, v, 0),
        texel: [1 / height.width, 1 / height.height],
    };
}
export function createCanvasMoon(textures) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const samplers = samplersFrom(textures);
    if (!context || !samplers)
        return null;
    let lastAngle = 0;
    let lastObserver = 'north';
    const renderer = {
        canvas,
        mode: 'canvas2d',
        resize(cssPixels, pixelRatio) {
            /* a lower resolution than the screen's: this path exists for devices that cannot do better, and draws only when the phase changes */
            const size = Math.max(64, Math.min(360, Math.round(cssPixels * Math.min(pixelRatio, 1.5))));
            if (canvas.width === size && canvas.height === size)
                return;
            canvas.width = size;
            canvas.height = size;
            renderer.draw(lastAngle, lastObserver);
        },
        draw(angle, observer) {
            lastAngle = angle;
            lastObserver = observer;
            const size = canvas.width;
            const light = sunDirection(angle, observer);
            const image = context.createImageData(size, size);
            for (let py = 0; py < size; py += 1) {
                for (let px = 0; px < size; px += 1) {
                    const pixel = moonPixel(((px + 0.5) / size) * 2 - 1, 1 - ((py + 0.5) / size) * 2, light, observer, samplers, size / 2);
                    const offset = (py * size + px) * 4;
                    image.data[offset] = Math.round(pixel.r * pixel.a * 255);
                    image.data[offset + 1] = Math.round(pixel.g * pixel.a * 255);
                    image.data[offset + 2] = Math.round(pixel.b * pixel.a * 255);
                    image.data[offset + 3] = Math.round(pixel.a * 255);
                }
            }
            context.putImageData(image, 0, 0);
        },
        dispose() { },
    };
    return renderer;
}
