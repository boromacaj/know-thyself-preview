import { ATMOSPHERE_FRAGMENT, ATMOSPHERE_VERTEX, BAKE_FRAGMENT, BAKE_VERTEX, GLOBE_FRAGMENT, GLOBE_VERTEX, LIGHTING, MARKER_FRAGMENT, MARKER_VERTEX, MOON_FRAGMENT, MOON_VERTEX, NEBULA_BAKE_FRAGMENT, SKY_FRAGMENT, SKY_VERTEX, SUN_FRAGMENT, SUN_QUAD_REACH, SUN_VERTEX, } from './ambientShaders.js?v=d9f39e7';
import { FOV_DEGREES, fieldTangents, modelRotation, perspective, skyRotation, viewFor, } from './ambientMath.js?v=d9f39e7';
import { createSphereMesh } from './sphereGeometry.js?v=d9f39e7';
const GLOBE_UNIFORMS = [
    'u_model', 'u_view', 'u_projection', 'u_surface', 'u_light', 'u_terminator', 'u_night', 'u_sun', 'u_atmosphere', 'u_haze',
    'u_cloudOctaves', 'u_cloudAngle', 'u_glint',
];
const BAKE_UNIFORMS = ['u_mask', 'u_size', 'u_octaves', 'u_real'];
const NEBULA_UNIFORMS = ['u_size', 'u_octaves'];
const ATMOSPHERE_UNIFORMS = [
    'u_resolution', 'u_tan', 'u_lens', 'u_distance', 'u_shell', 'u_light', 'u_terminator', 'u_atmosphere', 'u_sunDirection', 'u_sunSpill',
];
const SUN_UNIFORMS = ['u_resolution', 'u_sun', 'u_centre', 'u_half', 'u_core', 'u_stage', 'u_intensity', 'u_limb', 'u_detail', 'u_earth'];
const SKY_UNIFORMS = ['u_nebula', 'u_resolution', 'u_tan', 'u_lens', 'u_sky', 'u_time', 'u_twinkle', 'u_layers'];
/** The galaxy texture's size: two to one, a power of two on each side, drawn once. */
const NEBULA_SIZE = [2048, 1024];
const MARKER_UNIFORMS = ['u_model', 'u_view', 'u_projection', 'u_point', 'u_size', 'u_phase', 'u_opacity'];
const MOON_UNIFORMS = ['u_projection', 'u_view', 'u_centre', 'u_size', 'u_light', 'u_toEarth', 'u_sun', 'u_brightness'];
/** The uniforms each program is asked for, so a test can hold them against what the shaders declare. */
export const UNIFORM_NAMES = {
    globe: GLOBE_UNIFORMS, bake: BAKE_UNIFORMS, nebula: NEBULA_UNIFORMS, atmosphere: ATMOSPHERE_UNIFORMS, sky: SKY_UNIFORMS,
    marker: MARKER_UNIFORMS, moon: MOON_UNIFORMS, sun: SUN_UNIFORMS,
};
function compile(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader)
        throw new Error('WebGL shader unavailable.');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`Ambient globe shader failed to compile: ${log ?? 'unknown'}`);
    }
    return shader;
}
function link(gl, vertex, fragment, names) {
    const program = gl.createProgram();
    if (!program)
        throw new Error('WebGL program unavailable.');
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(`Ambient globe program failed to link: ${log ?? 'unknown'}`);
    }
    const uniform = {};
    for (const name of names)
        uniform[name] = gl.getUniformLocation(program, name);
    return { program, uniform };
}
const normalised = (v) => {
    const length = Math.hypot(v[0], v[1], v[2]) || 1;
    return new Float32Array([v[0] / length, v[1] / length, v[2] / length]);
};
export class AmbientRenderer {
    gl;
    globe;
    atmosphere;
    sky;
    marker;
    moon;
    sun;
    buffers;
    corners;
    texture;
    nebula;
    light = normalised(LIGHTING.direction);
    /** The Moon's own light: the scene's fixed light, as the 3c1fd4a Moon had it. Deliberately not `light` (the Earth's fallback) and never `frame.light` (the Sun's, which lights the Earth). */
    moonLight = normalised(LIGHTING.direction);
    atmosphereColour;
    /**
     * Throws when WebGL cannot build the scene; the caller falls back to the still sky.
     * `bakeOctaves` is how much noise the ground is given: the one place a device pays for it, once.
     * `realMap` says the canvas holds NASA's day map (earthMap.ts) rather than the hand-drawn mask (earthSurface.ts).
     */
    constructor(gl, mask, bakeOctaves, realMap = false) {
        this.gl = gl;
        this.globe = link(gl, GLOBE_VERTEX, GLOBE_FRAGMENT, GLOBE_UNIFORMS);
        this.atmosphere = link(gl, ATMOSPHERE_VERTEX, ATMOSPHERE_FRAGMENT, ATMOSPHERE_UNIFORMS);
        this.sky = link(gl, SKY_VERTEX, SKY_FRAGMENT, SKY_UNIFORMS);
        this.marker = link(gl, MARKER_VERTEX, MARKER_FRAGMENT, MARKER_UNIFORMS);
        this.moon = link(gl, MOON_VERTEX, MOON_FRAGMENT, MOON_UNIFORMS);
        this.sun = link(gl, SUN_VERTEX, SUN_FRAGMENT, SUN_UNIFORMS);
        const mesh = createSphereMesh();
        const make = (data, target) => {
            const buffer = gl.createBuffer();
            if (!buffer)
                throw new Error('WebGL buffer unavailable.');
            gl.bindBuffer(target, buffer);
            gl.bufferData(target, data, gl.STATIC_DRAW);
            return buffer;
        };
        this.buffers = {
            position: make(mesh.positions, gl.ARRAY_BUFFER),
            normal: make(mesh.normals, gl.ARRAY_BUFFER),
            uv: make(mesh.uvs, gl.ARRAY_BUFFER),
            index: make(mesh.indices, gl.ELEMENT_ARRAY_BUFFER),
            count: mesh.indexCount,
        };
        /* One buffer of six corners serves the full-screen sky and the marker quad alike. */
        this.corners = make(new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.ARRAY_BUFFER);
        this.texture = this.bake(mask, bakeOctaves, realMap);
        this.nebula = this.bakeNebula(bakeOctaves);
        this.atmosphereColour = new Float32Array(LIGHTING.atmosphereColour);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clearColor(0, 0, 0, 1);
    }
    /**
     * The galaxy, drawn once: a full-screen pass into an equirectangular texture in the galaxy's own frame (see
     * NEBULA_BAKE_FRAGMENT). REPEAT across longitude so the wrap closes, clamped over latitude, no mipmaps - it is read by
     * direction, where a mipmap's choice of level would jump at the longitude seam.
     */
    bakeNebula(octaves) {
        const gl = this.gl;
        const [width, height] = NEBULA_SIZE;
        const { program, uniform } = link(gl, BAKE_VERTEX, NEBULA_BAKE_FRAGMENT, NEBULA_UNIFORMS);
        const made = gl.createTexture();
        if (!made)
            throw new Error('WebGL texture unavailable.');
        gl.bindTexture(gl.TEXTURE_2D, made);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        const target = gl.createFramebuffer();
        if (!target)
            throw new Error('WebGL framebuffer unavailable.');
        gl.bindFramebuffer(gl.FRAMEBUFFER, target);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, made, 0);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
            throw new Error('The sky cannot be rendered to a texture.');
        gl.viewport(0, 0, width, height);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.BLEND);
        gl.useProgram(program);
        this.noAttributes();
        this.attribute(program, 'a_corner', this.corners, 2);
        gl.uniform2f(uniform.u_size, width, height);
        gl.uniform1f(uniform.u_octaves, octaves);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.deleteFramebuffer(target);
        gl.deleteProgram(program);
        return made;
    }
    /**
     * The ground, worked out once: the mask goes in, the surface comes out. The mask is two-to-one and a power of two
     * on each side, which WebGL 1 needs for mipmaps and for REPEAT across longitude.
     */
    bake(mask, octaves, realMap) {
        const gl = this.gl;
        const { width, height } = mask;
        const { program, uniform } = link(gl, BAKE_VERTEX, BAKE_FRAGMENT, BAKE_UNIFORMS);
        const texture = (source, mipmapped) => {
            const made = gl.createTexture();
            if (!made)
                throw new Error('WebGL texture unavailable.');
            gl.bindTexture(gl.TEXTURE_2D, made);
            if (source)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
            else
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            /* REPEAT across longitude so the antimeridian closes; clamp across latitude so the poles do not wrap. */
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipmapped ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            return made;
        };
        const maskTexture = texture(mask, false);
        const surface = texture(null, true);
        const target = gl.createFramebuffer();
        if (!target)
            throw new Error('WebGL framebuffer unavailable.');
        gl.bindFramebuffer(gl.FRAMEBUFFER, target);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, surface, 0);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
            throw new Error('The surface cannot be rendered to a texture.');
        gl.viewport(0, 0, width, height);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.BLEND);
        gl.useProgram(program);
        this.noAttributes();
        this.attribute(program, 'a_corner', this.corners, 2);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, maskTexture);
        gl.uniform1i(uniform.u_mask, 0);
        gl.uniform2f(uniform.u_size, width, height);
        gl.uniform1f(uniform.u_octaves, octaves);
        gl.uniform1f(uniform.u_real, realMap ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, surface);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.deleteFramebuffer(target);
        gl.deleteTexture(maskTexture);
        gl.deleteProgram(program);
        return surface;
    }
    /** Sizes the drawing buffer. Returns true when it changed. */
    resize(width, height) {
        const canvas = this.gl.canvas;
        if (canvas.width === width && canvas.height === height)
            return false;
        canvas.width = width;
        canvas.height = height;
        this.gl.viewport(0, 0, width, height);
        return true;
    }
    /**
     * Every vertex attribute switched off. Enabled attribute arrays belong to the context, not to a program, so an array
     * the globe enabled is still enabled when the sky is drawn - with a buffer the sky never asked for. Each pass starts from none.
     */
    noAttributes() {
        const gl = this.gl;
        for (let index = 0; index < 8; index += 1)
            gl.disableVertexAttribArray(index);
    }
    attribute(program, name, buffer, size) {
        const gl = this.gl;
        const location = gl.getAttribLocation(program, name);
        if (location < 0)
            return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    }
    draw(frame) {
        const gl = this.gl;
        const { width, height } = gl.canvas;
        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const { pose } = frame;
        const projection = perspective(FOV_DEGREES, pose.aspect, pose.distance - 2, pose.distance + 2, pose.ndcX, pose.ndcY);
        const view = viewFor(frame.pose);
        const model = modelRotation(frame.yaw, frame.pitch, frame.tilt);
        this.drawSky(frame, width, height);
        /* The Sun's SOURCE (its disc and corona) is drawn here, before the planet, which is opaque and so hides it exactly: a Sun behind the Earth is
           gone, and one at the limb has the planet's edge. Its LENS effect is drawn last, over everything. */
        if (frame.sun)
            this.drawSun(frame.sun, 0);
        /* The moon goes between the sky and the planet while it is behind the Earth: the planet is drawn over it where it hides it.
           While it is in front (moonFor's `front`) it is drawn after the planet and its halo instead, so it crosses the disc in front of it. */
        if (frame.moon && !frame.moon.front)
            this.drawMoon(frame, frame.moon);
        this.drawGlobe(frame, projection, view, model);
        this.drawAtmosphere(frame, width, height);
        if (frame.moon?.front)
            this.drawMoon(frame, frame.moon);
        if (frame.sun)
            this.drawSun(frame.sun, 1);
        if (frame.marker)
            this.drawMarker(frame, frame.marker, projection, view, model);
    }
    /** The three uniforms that turn a pixel into a view ray: the screen's size, the half-angle tangents, and the lens shift. */
    lens(uniform, pose, width, height) {
        const gl = this.gl;
        const [tanX, tanY] = fieldTangents(pose.aspect);
        gl.uniform2f(uniform.u_resolution, width, height);
        gl.uniform2f(uniform.u_tan, tanX, tanY);
        gl.uniform2f(uniform.u_lens, pose.ndcX, pose.ndcY);
    }
    drawSky(frame, width, height) {
        const gl = this.gl;
        const { program, uniform } = this.sky;
        gl.useProgram(program);
        this.noAttributes();
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.BLEND);
        this.attribute(program, 'a_corner', this.corners, 2);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.nebula);
        gl.uniform1i(uniform.u_nebula, 1);
        gl.activeTexture(gl.TEXTURE0);
        this.lens(uniform, frame.pose, width, height);
        gl.uniformMatrix3fv(uniform.u_sky, false, skyRotation(frame.yaw, frame.pitch));
        gl.uniform1f(uniform.u_time, frame.time);
        gl.uniform1f(uniform.u_twinkle, frame.twinkle);
        gl.uniform1f(uniform.u_layers, frame.starLayers);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
    }
    /**
     * The moon: one billboard quad about its centre, shaded as a sphere (MOON_FRAGMENT), blended over the sky, no depth test. It has
     * its own projection - the same lens, a deeper range - because its orbit reaches farther behind the planet than the globe's own
     * near and far planes go; nothing else uses it, and the globe's projection is untouched.
     */
    drawMoon(frame, moon) {
        const gl = this.gl;
        const { program, uniform } = this.moon;
        const { pose } = frame;
        const projection = perspective(FOV_DEGREES, pose.aspect, Math.max(0.5, pose.distance - 8), pose.distance + 8, pose.ndcX, pose.ndcY);
        gl.useProgram(program);
        this.noAttributes();
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        this.attribute(program, 'a_corner', this.corners, 2);
        gl.uniformMatrix4fv(uniform.u_projection, false, projection);
        gl.uniformMatrix4fv(uniform.u_view, false, viewFor(pose));
        gl.uniform3f(uniform.u_centre, moon.position[0], moon.position[1], moon.position[2]);
        gl.uniform1f(uniform.u_size, moon.radius);
        /* THE MOON IS LIT BY THE SAME SUN AS THE EARTH, as seen from where the Moon is: frame.moonLight is the drawn Sun's side of the screen from the Moon, with the depth the
           Sun's distance gives (ambientSun.ts lightForBodyAt), so its lit side faces the visible Sun. The scene's fixed light (this.moonLight) is only for a frame that has no
           Sun's light to give. */
        const moonLight = frame.moonLight ?? this.moonLight;
        gl.uniform3f(uniform.u_light, moonLight[0], moonLight[1], moonLight[2]);
        /* The view's axes are the world's, so the way from the moon to the planet's centre is just the moon's position, reversed. */
        gl.uniform3fv(uniform.u_toEarth, normalised([-moon.position[0], -moon.position[1], -moon.position[2]]));
        gl.uniform3f(uniform.u_sun, LIGHTING.sunColour[0], LIGHTING.sunColour[1], LIGHTING.sunColour[2]);
        gl.uniform1f(uniform.u_brightness, moon.brightness);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
    }
    /**
     * The Sun, one program, additive, no depth: stage 0 the source on a quad about it (before the planet), stage 1 the lens effect on the whole canvas
     * (over everything). Two draw calls at most, no texture, no buffer of its own: the same six corners as the sky and the marker.
     */
    drawSun(sun, stage) {
        const intensity = stage === 0 ? sun.source : sun.lens;
        if (intensity <= 0.002)
            return;
        const gl = this.gl;
        const { program, uniform } = this.sun;
        const { width, height } = gl.canvas;
        gl.useProgram(program);
        this.noAttributes();
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);
        this.attribute(program, 'a_corner', this.corners, 2);
        const reach = Math.min(SUN_QUAD_REACH * sun.coreRadius, 0.62 * height);
        gl.uniform2f(uniform.u_resolution, width, height);
        gl.uniform2f(uniform.u_sun, sun.x, height - sun.y);
        if (stage === 0) {
            gl.uniform2f(uniform.u_centre, sun.x, height - sun.y);
            gl.uniform2f(uniform.u_half, reach, reach);
        }
        else {
            gl.uniform2f(uniform.u_centre, width / 2, height / 2);
            gl.uniform2f(uniform.u_half, width / 2, height / 2);
        }
        gl.uniform1f(uniform.u_core, sun.coreRadius);
        gl.uniform1f(uniform.u_stage, stage);
        gl.uniform1f(uniform.u_intensity, intensity);
        gl.uniform1f(uniform.u_limb, sun.limb);
        gl.uniform1f(uniform.u_detail, sun.detail === 'full' ? 1 : 0);
        gl.uniform3f(uniform.u_earth, sun.earthX, height - sun.earthY, sun.earthRadius);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
    }
    drawGlobe(frame, projection, view, model) {
        const gl = this.gl;
        const { program, uniform } = this.globe;
        gl.useProgram(program);
        this.noAttributes();
        gl.disable(gl.BLEND);
        gl.depthMask(true);
        gl.cullFace(gl.BACK);
        this.attribute(program, 'a_position', this.buffers.position, 3);
        this.attribute(program, 'a_normal', this.buffers.normal, 3);
        this.attribute(program, 'a_uv', this.buffers.uv, 2);
        gl.uniformMatrix4fv(uniform.u_projection, false, projection);
        gl.uniformMatrix4fv(uniform.u_view, false, view);
        gl.uniformMatrix4fv(uniform.u_model, false, model);
        const light = frame.light ?? this.light;
        gl.uniform3f(uniform.u_light, light[0], light[1], light[2]);
        gl.uniform2f(uniform.u_terminator, LIGHTING.terminatorFrom, LIGHTING.terminatorTo);
        gl.uniform3f(uniform.u_night, LIGHTING.nightColour[0], LIGHTING.nightColour[1], LIGHTING.nightColour[2]);
        gl.uniform3f(uniform.u_sun, LIGHTING.sunColour[0], LIGHTING.sunColour[1], LIGHTING.sunColour[2]);
        gl.uniform3fv(uniform.u_atmosphere, this.atmosphereColour);
        gl.uniform1f(uniform.u_haze, LIGHTING.hazeStrength);
        gl.uniform1f(uniform.u_cloudOctaves, frame.cloudOctaves);
        gl.uniform1f(uniform.u_cloudAngle, frame.cloudAngle);
        const glint = frame.glint;
        if (glint)
            gl.uniform4f(uniform.u_glint, glint[0], glint[1], glint[2], glint[3]);
        else
            gl.uniform4f(uniform.u_glint, 0, 0, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(uniform.u_surface, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);
        gl.drawElements(gl.TRIANGLES, this.buffers.count, gl.UNSIGNED_SHORT, 0);
    }
    /**
     * The halo is one full-screen pass of per-pixel arithmetic (ATMOSPHERE_FRAGMENT), added over the planet and the sky. Most
     * pixels discard at once: only those within the shell's radius of the planet's centre do any work.
     */
    drawAtmosphere(frame, width, height) {
        const gl = this.gl;
        const { program, uniform } = this.atmosphere;
        gl.useProgram(program);
        this.noAttributes();
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);
        this.attribute(program, 'a_corner', this.corners, 2);
        this.lens(uniform, frame.pose, width, height);
        gl.uniform1f(uniform.u_distance, frame.pose.distance);
        gl.uniform1f(uniform.u_shell, LIGHTING.atmosphereScale);
        const light = frame.light ?? this.light;
        gl.uniform3f(uniform.u_light, light[0], light[1], light[2]);
        gl.uniform2f(uniform.u_terminator, LIGHTING.terminatorFrom, LIGHTING.terminatorTo);
        gl.uniform3fv(uniform.u_atmosphere, this.atmosphereColour);
        /* The Sun's accent on the limb: local, and exactly nothing when there is no Sun. */
        gl.uniform2f(uniform.u_sunDirection, frame.sun?.directionX ?? 0, frame.sun?.directionY ?? 0);
        gl.uniform1f(uniform.u_sunSpill, frame.sun?.spill ?? 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
    }
    drawMarker(frame, marker, projection, view, model) {
        const gl = this.gl;
        const { program, uniform } = this.marker;
        gl.useProgram(program);
        this.noAttributes();
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ZERO, gl.ONE);
        this.attribute(program, 'a_corner', this.corners, 2);
        gl.uniformMatrix4fv(uniform.u_projection, false, projection);
        gl.uniformMatrix4fv(uniform.u_view, false, view);
        gl.uniformMatrix4fv(uniform.u_model, false, model);
        gl.uniform3f(uniform.u_point, marker.point[0], marker.point[1], marker.point[2]);
        /* A sixth of the globe's radius for the whole quad: the dot is a few pixels across at any size and the ring has room to spread. */
        gl.uniform1f(uniform.u_size, 0.16);
        gl.uniform1f(uniform.u_phase, marker.phase);
        gl.uniform1f(uniform.u_opacity, marker.opacity);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        void frame;
    }
    dispose() {
        const gl = this.gl;
        gl.deleteTexture(this.texture);
        gl.deleteTexture(this.nebula);
        for (const buffer of [this.buffers.position, this.buffers.normal, this.buffers.uv, this.buffers.index, this.corners])
            gl.deleteBuffer(buffer);
        for (const { program } of [this.globe, this.atmosphere, this.sky, this.marker, this.moon, this.sun])
            gl.deleteProgram(program);
    }
}
