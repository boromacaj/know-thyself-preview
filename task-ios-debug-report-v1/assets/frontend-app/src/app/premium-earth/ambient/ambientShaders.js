/*
 * THE SHADERS OF THE AMBIENT GLOBE.
 *
 * Four small programs, all WebGL 1 so the widest range of phones can run them:
 *
 *   SKY          a full-screen triangle pair: a celestial sphere read by direction - stars, the Milky Way, nebulae
 *   GLOBE        the textured sphere, lit, with ocean, land, ice and clouds
 *   ATMOSPHERE   the halo, analytic per pixel from the silhouette outward
 *   MARKER       a camera-facing quad on the surface: a point and a pulsing ring
 *
 * THE LIGHT IS FIXED IN VIEW SPACE. A real sun would swing the terminator
 * across the disc with the hour and lose the composition for most of the day;
 * a shadow painted into the texture would turn with the planet and read as
 * fake. So the light is one direction in view space, the shading is ordinary
 * per-pixel Lambert against the real normal, and terrain and cloud move
 * through the terminator while the terminator itself stays where the
 * composition wants it: a bright upper left, a shadow falling to the lower
 * right. The constants below were measured off the approved Google globe at
 * its opening pose (feature/webgl-earth-renderer, df7cbb7) and are kept.
 *
 * THE SURFACE IS BAKED ONCE, THE CLOUDS ARE LIVE. Everything about the ground
 * - ocean depth, forest, steppe, tundra, ice, mountains - depends on where a
 * point is and on nothing else, so it is worked out once, on the GPU, into an
 * equirectangular texture (BAKE below) and only read afterwards. The one thing
 * that changes from frame to frame is the cloud layer, and it is the only
 * noise a frame pays for. The noise is three-dimensional, on the object-space
 * position, so there is no seam at the antimeridian and no stretching at the
 * poles, and the clouds turn at their own pace without the mid-triangle wrap
 * that sank the first renderer.
 *
 * COST IS A UNIFORM. The number of noise octaves is the main fragment cost; a
 * constrained device bakes with three instead of five and clouds with three.
 */
/*
 * TUNED FOR DISTANCE (zoomed-out review): a little more frontal than the first measurement, a wider terminator and a
 * lifted night, so the planet behind the Main Menu reads as lit Earth with a soft shadow rather than as a crescent on a
 * dark disc. Direction stays upper left; z stays under 0.45 so the terminator is still on the visible disc.
 */
export const LIGHTING = Object.freeze({
    /** View-space direction TOWARD the light: upper left, tilted a little toward the viewer. */
    direction: Object.freeze([-0.52, 0.46, 0.42]),
    /** The terminator is a wide gradient, not an edge: N.L limits for the smoothstep. */
    terminatorFrom: -0.30,
    terminatorTo: 0.28,
    /** The night side is never black: it keeps a trace of cool blue. */
    nightColour: Object.freeze([0.050, 0.070, 0.120]),
    sunColour: Object.freeze([1.46, 1.42, 1.36]),
    atmosphereColour: Object.freeze([0.50, 0.68, 1.00]),
    /** The halo's outer radius, in globe radii: where its glow has faded to nothing. */
    atmosphereScale: 1.07,
    hazeStrength: 0.36,
});
/*
 * HOW THE REAL MAP'S SEA IS TOLD FROM ITS LAND. The NASA map paints open water as a flat, dark navy; land is never both blue-led
 * and dark. earthMap.ts's oceanWeight() is the same formula, built from these same numbers, so a test can hold the two together.
 */
export const OCEAN_KEY = Object.freeze({
    blueOverFrom: 0.045,
    blueOverTo: 0.14,
    lumaFrom: 0.16,
    lumaTo: 0.34,
});
const glsl = (value) => (Number.isInteger(value) ? value.toFixed(1) : String(value));
/** How fast the halo fades from the silhouette (b = 1) to the shell: the exponent on the linear fall. */
export const ATMOSPHERE_FALLOFF = 2.4;
/** How far inside the silhouette the halo's last trace reaches, in globe radii: only enough to hide the mesh's polygon edge. */
export const ATMOSPHERE_RIM_INSIDE = 0.012;
/** The halo's peak brightness, at the silhouette on the lit side. */
export const ATMOSPHERE_STRENGTH = 0.9;
/** How many mip levels softer the ground is read at the very rim than at the centre: the miniature's depth of field. */
export const DEFOCUS_MIP_BIAS = 2.5;
/** How bright the atmosphere's accent on the Sun's side is at its strongest (see ATMOSPHERE_FRAGMENT): a lift of the halo, not a new light. */
export const SUN_LIMB_ACCENT = 1.5;
/** How much of its colour the planet keeps after lighting: 1 is untouched. The sun and the exposure curve had pushed it past real. */
export const GLOBE_SATURATION = 0.90;
const PRECISION = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;
const NOISE = `
float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x), mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}
/* Fractal noise, scaled to 0..1 whatever the octave count, so a constrained device sees the same range with less detail. */
float fbm(vec3 p, float octaves) {
  float amplitude = 0.5;
  float total = 0.0;
  for (int i = 0; i < 5; i++) {
    if (float(i) >= octaves) break;
    total += amplitude * vnoise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    amplitude *= 0.5;
  }
  return total / (1.0 - exp2(-octaves));
}
`;
/* ------------------------------------------------------------------ *
 * BAKE: THE GROUND, WORKED OUT ONCE
 * ------------------------------------------------------------------ */
export const BAKE_VERTEX = `
attribute vec2 a_corner;
void main() {
  gl_Position = vec4(a_corner, 0.0, 1.0);
}`;
/*
 * Runs once per renderer, over a full-screen quad the size of the surface
 * texture: each pixel is a longitude and a latitude, turned into the point on
 * the unit sphere the mesh would put there, and coloured. The result is the
 * albedo (rgb) and, in alpha, how much of the point is open water - the part
 * of the sea the sun can glint on.
 */
export const BAKE_FRAGMENT = `${PRECISION}
uniform sampler2D u_mask;
uniform vec2 u_size;
uniform float u_octaves;
uniform float u_real;
${NOISE}

/* How much of a pixel of the real map is open water: blue-led and dark (see OCEAN_KEY). */
float oceanOf(vec3 c) {
  float luma = dot(c, vec3(0.299, 0.587, 0.114));
  float blueOver = c.b - max(c.r, c.g);
  return smoothstep(${glsl(OCEAN_KEY.blueOverFrom)}, ${glsl(OCEAN_KEY.blueOverTo)}, blueOver)
    * (1.0 - smoothstep(${glsl(OCEAN_KEY.lumaFrom)}, ${glsl(OCEAN_KEY.lumaTo)}, luma));
}

void main() {
  /* Row 0 of the framebuffer is row 0 of the texture, and row 0 of a texture is where the sphere mesh puts the north pole
     (v = 0), as it is row 0 of the drawn mask. So no flip: a flip here turns the planet upside down. */
  vec2 uv = gl_FragCoord.xy / u_size;
  float longitude = (uv.x * 2.0 - 1.0) * 3.14159265;
  float latitude = (0.5 - uv.y) * 3.14159265;
  vec3 p = vec3(cos(latitude) * sin(longitude), sin(latitude), cos(latitude) * cos(longitude));

  vec3 mask = texture2D(u_mask, uv).rgb;
  float land = smoothstep(0.30, 0.70, mask.r);
  float shelf = clamp(mask.g, 0.0, 1.0);
  float desert = mask.b;
  float polar = abs(p.y);

  float detail = fbm(p * 7.0, u_octaves);
  float fine = fbm(p * 26.0 + 3.0, u_octaves);
  float relief = fbm(p * 11.0 + 7.0, u_octaves);

  /* THE REAL EARTH. When the mask slot holds NASA's day map, the land is the map's own colour (graded) and the sea is the
     globe's ocean, laid where the map is navy; the hand-drawn path below is the fallback for when the map cannot be had. */
  if (0.5 < u_real) {
    vec3 c = texture2D(u_mask, uv).rgb;
    float water = oceanOf(c);

    /* Coast proximity, from the map itself: how much land lies within a few pixels, on two rings of eight taps. */
    float px = 1.0 / u_size.x;
    float nearLand = 0.0;
    for (int i = 0; i < 8; i++) {
      float a = float(i) * 0.7853982;
      vec2 d = vec2(cos(a), sin(a));
      nearLand += 1.0 - oceanOf(texture2D(u_mask, uv + d * px * 5.0).rgb);
      nearLand += 1.0 - oceanOf(texture2D(u_mask, uv + d * px * 12.0).rgb);
    }
    float shelf = smoothstep(0.02, 0.60, nearLand / 16.0);

    /* THE SEA: a clean blue-green that deepens a little with open water and turns to pale turquoise shallows toward a coast - a hint
       of cyan in the blue, not a tint over it. */
    vec3 deep = mix(vec3(0.040, 0.132, 0.218), vec3(0.060, 0.192, 0.292), smoothstep(0.35, 0.75, detail));
    vec3 sea = mix(deep, vec3(0.112, 0.404, 0.452), shelf * 0.72);
    float cap = smoothstep(0.955, 0.985, polar + (fine - 0.5) * 0.04);
    sea = mix(sea, vec3(0.86, 0.91, 0.97), cap);

    /* THE LAND: the map's colour, a little less saturated and a little lighter, as the planet looks from a distance. */
    float luma = dot(c, vec3(0.299, 0.587, 0.114));
    vec3 land = mix(vec3(luma), c, 0.78);
    land = pow(land, vec3(0.90));
    /* A soft knee on the brightness, not on each channel, so the pale deserts and the ice stay tan and white instead of burning
       out under the sun - and keep their hue while they do. */
    land /= 1.0 + 1.30 * max(dot(land, vec3(0.299, 0.587, 0.114)) - 0.50, 0.0);
    land *= 0.96 + 0.08 * fine;

    gl_FragColor = vec4(mix(land, sea, water), water * (1.0 - cap));
    return;
  }

  /* THE OCEAN: deep, deeper still far from a coast, and the pale shallows along it. Tuned for distance: a dusky slate
     blue rather than a saturated one, lifted so the planet is not a dark disc, with turquoise shallows. */
  vec3 ocean = mix(vec3(0.058, 0.140, 0.250), vec3(0.100, 0.220, 0.362), smoothstep(0.35, 0.75, detail));
  ocean = mix(ocean, vec3(0.200, 0.470, 0.540), smoothstep(0.05, 0.85, shelf) * 0.80);
  float seaIce = smoothstep(0.935, 0.975, polar + (fine - 0.5) * 0.05);
  ocean = mix(ocean, vec3(0.86, 0.91, 0.97), seaIce);

  /* THE LAND: a belt of cover by latitude, broken up by noise, then deserts, mountains and snow. */
  float shifted = polar + (detail - 0.5) * 0.10;
  vec3 cover = mix(vec3(0.110, 0.250, 0.100), vec3(0.230, 0.350, 0.140), smoothstep(0.20, 0.42, shifted));
  cover = mix(cover, vec3(0.500, 0.470, 0.260), smoothstep(0.40, 0.52, shifted) * (1.0 - smoothstep(0.52, 0.62, shifted)) * 0.60);
  cover = mix(cover, vec3(0.130, 0.240, 0.160), smoothstep(0.70, 0.80, shifted));
  cover = mix(cover, vec3(0.420, 0.450, 0.390), smoothstep(0.88, 0.93, shifted));
  float ice = smoothstep(0.94, 0.97, shifted);
  cover = mix(cover, vec3(0.92, 0.95, 0.99), ice);
  cover *= 0.70 + 0.60 * fine;
  float dry = clamp(desert * (0.45 + 1.10 * detail), 0.0, 1.0);
  cover = mix(cover, vec3(0.760, 0.620, 0.400) * (0.84 + 0.32 * fine), smoothstep(0.10, 0.85, dry));
  cover = mix(cover, vec3(0.420, 0.380, 0.330), smoothstep(0.58, 0.72, relief) * 0.85 * (1.0 - ice));
  cover = mix(cover, vec3(0.92, 0.95, 0.99), smoothstep(0.70, 0.80, relief) * smoothstep(0.25, 0.50, polar) * 0.90);

  gl_FragColor = vec4(mix(ocean, cover, land), (1.0 - land) * (1.0 - seaIce));
}`;
/* ------------------------------------------------------------------ *
 * SKY: A CELESTIAL SPHERE
 * ------------------------------------------------------------------ */
/*
 * THE FRAME OF THE MILKY WAY. The galaxy is drawn once, into an equirectangular texture whose poles are the galaxy's own
 * (NEBULA_BAKE below); the sky shader turns a direction in the sky's coordinates into that frame with this matrix. The pole
 * is leaned about 25 degrees off the sky's vertical axis - the axis the globe's yaw turns about - so as the sky turns the band
 * rises and falls across the view instead of circling it at one height, and the galactic centre starts in the upper left.
 * Three orthonormal vectors, built here from two hints so a test can hold them to that.
 */
const unit = (v) => {
    const length = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / length, v[1] / length, v[2] / length];
};
const cross = (a, b) => [
    a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0],
];
const galacticFrame = () => {
    const z = unit([0.42, 0.90, 0.12]);
    const hint = unit([-0.10, 0.22, -0.90]);
    const along = hint[0] * z[0] + hint[1] * z[1] + hint[2] * z[2];
    const x = unit([hint[0] - z[0] * along, hint[1] - z[1] * along, hint[2] - z[2] * along]);
    return Object.freeze({ x: Object.freeze(x), y: Object.freeze(cross(z, x)), z: Object.freeze(z) });
};
/** The galaxy's x (toward its centre), y and z (its north pole), as directions in the sky sphere's coordinates. */
export const GALACTIC_FRAME = galacticFrame();
/** The gain the nebula texture is drawn at, so its faint end keeps 8-bit precision; the sky shader reads it back at the reciprocal. */
export const NEBULA_GAIN = 2.5;
/** Pixels of radius a star is drawn at, whatever the screen: a star is a point of light, not a disc that grows with the resolution. */
export const STAR_RADIUS_PIXELS = 1.6;
const glslVec3 = (v) => `vec3(${v.map((value) => value.toFixed(6)).join(', ')})`;
/* GLSL's mat3 constructor is column-major: the matrix that turns a sky direction into galactic coordinates has the galaxy's
   axes as ROWS, so each column is the three axes' components along one sky axis. */
const GALACTIC_MATRIX = `mat3(${[0, 1, 2]
    .map((axis) => glslVec3([GALACTIC_FRAME.x[axis], GALACTIC_FRAME.y[axis], GALACTIC_FRAME.z[axis]]))
    .join(', ')})`;
export const SKY_VERTEX = `
attribute vec2 a_corner;
void main() {
  gl_Position = vec4(a_corner, 1.0, 1.0);
}`;
/*
 * Every pixel is a direction. It is the pixel's view ray (the lens shift puts the planet where the framing says; the sky is
 * centred on the camera's axis, which is the planet's centre), carried into the sky's own coordinates by u_sky - the camera's
 * orbit around the planet, see skyRotation() in ambientMath.ts. Two things are read at that direction:
 *
 *   THE STARS     hashed in three dimensions: the direction is scaled, the cell it falls in may hold one star, and the star is
 *                 a small soft point of constant pixel size. No texture, no loop, three cheap layers at different densities.
 *   THE GALAXY    one read of the texture baked once (NEBULA_BAKE): the Milky Way's band with its dust lanes and warm core,
 *                 a few faint coloured nebulae, a violet breath over the dark.
 *
 * So the whole sky is one object. Turn the camera and the stars, the band and the nebulae turn together, and at a given pixel
 * they are always the same patch of sky however the view got there - that is what makes it read as a surround and not a
 * picture behind the planet.
 */
export const SKY_FRAGMENT = `${PRECISION}
uniform sampler2D u_nebula;
uniform vec2 u_resolution;
uniform vec2 u_tan;
uniform vec2 u_lens;
uniform mat3 u_sky;
uniform float u_time;
uniform float u_twinkle;
uniform float u_layers;

const mat3 GALACTIC = ${GALACTIC_MATRIX};

vec3 h33(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
}

/* One layer of stars: a cell of the scaled direction holds a star with probability \`density\`, at a jittered point that
   keeps its whole disc inside the cell. The sphere passes through the lattice, so a star it grazes is smaller and fainter
   than one it hits: natural variety from one number. */
vec3 stars(vec3 dir, float cells, float density, float brightness, float pixelAngle, float seed, float size) {
  vec3 p = dir * cells;
  vec3 cell = floor(p);
  vec3 h = h33(cell + seed);
  if (h.x > density) return vec3(0.0);
  vec3 j = h33(cell + vec3(19.1, 7.3, 3.7) + seed);
  vec3 star = cell + 0.5 + (j - 0.5) * 0.5;
  float radius = min(${glsl(STAR_RADIUS_PIXELS)} * size * pixelAngle * cells, 0.22);
  float spot = 1.0 - smoothstep(0.0, radius, length(p - star));
  float twinkle = 1.0 - u_twinkle * (0.5 + 0.5 * sin(u_time * (0.7 + 2.2 * h.z) + h.y * 61.0));
  vec3 tint = mix(vec3(1.0, 0.80, 0.62), vec3(0.66, 0.80, 1.0), h.z);
  return tint * spot * spot * brightness * (0.25 + 0.75 * h.y * h.y) * twinkle;
}

/* ONE MEMBER OF A CLUSTER: star number i of the group centred at centre. Its place, its brightness and its colour all come from one
   hash of the cell and the number; the place is pulled in toward the middle (the cube of a centred offset), so a group is thickest
   at its heart and thins out. */
vec3 member(vec3 p, vec3 cell, vec3 centre, float spread, float radius, float i) {
  vec3 k = h33(cell + i * 7.13 + 3.0);
  vec3 o = k - 0.5;
  o = o * abs(o) * 4.0;
  float spot = 1.0 - smoothstep(0.0, radius, length(p - (centre + o * spread)));
  float shade = fract(k.x * 11.7);
  vec3 tint = mix(vec3(1.0, 0.82, 0.66), vec3(0.68, 0.82, 1.0), fract(k.z * 7.3));
  return tint * spot * spot * (0.30 + 0.70 * shade * shade);
}

/* A CLUSTER: a cell of a coarse lattice may hold a compact group of stars, a few degrees across - the open clusters and loose knots a
   real sky has among its scattered field. Five members, written out: the sky has no loops, and only the cells that hold a cluster pay. */
vec3 clusters(vec3 dir, float pixelAngle) {
  const float cells = 7.0;
  vec3 p = dir * cells;
  vec3 cell = floor(p);
  vec3 h = h33(cell + 91.0);
  if (h.x > 0.20) return vec3(0.0);
  vec3 centre = cell + 0.5 + (h33(cell + 17.0) - 0.5) * 0.4;
  float spread = 0.15 + 0.11 * h.y;
  float radius = min(${glsl(STAR_RADIUS_PIXELS)} * pixelAngle * cells, 0.22);
  vec3 sum = member(p, cell, centre, spread, radius, 0.0) + member(p, cell, centre, spread, radius, 1.0)
    + member(p, cell, centre, spread, radius, 2.0) + member(p, cell, centre, spread, radius, 3.0)
    + member(p, cell, centre, spread, radius, 4.0);
  return sum * 1.55;
}

void main() {
  vec2 ndc = gl_FragCoord.xy / u_resolution * 2.0 - 1.0;
  vec3 dir = normalize(u_sky * vec3((ndc - u_lens) * u_tan, -1.0));
  float pixelAngle = 2.0 * u_tan.y / u_resolution.y;

  /* THE GALAXY, in its own frame: longitude round the band, latitude up from it. */
  vec3 g = GALACTIC * dir;
  vec2 gq = vec2(atan(g.y, g.x) * 0.15915494 + 0.5, asin(clamp(g.z, -1.0, 1.0)) * 0.31830989 + 0.5);
  vec4 galaxy = texture2D(u_nebula, gq);
  vec3 colour = galaxy.rgb * ${glsl(1 / NEBULA_GAIN)};
  /* More stars where the galaxy is bright: the band is made of them. */
  float crowd = 1.0 + 8.0 * dot(colour, vec3(0.33));
  /* CLUMPING. Stars are not scattered evenly: they gather in groups with empty sky between. A slow noise over the sky - baked once
     into the galaxy texture's alpha, so a frame pays for no noise at all - scales every layer's density together, so thick and
     sparse regions are real regions and the field has structure at the size of a hand held out, not only at the size of a grain. */
  float groups = 0.62 + 1.8 * galaxy.a;
  colour += stars(dir, 60.0, 0.030 * groups, 3.10, pixelAngle, 211.0, 2.3);
  colour += stars(dir, 120.0, 0.100 * crowd * groups, 2.00, pixelAngle, 0.0, 1.25);
  colour += stars(dir, 300.0, 0.130 * crowd * groups, 1.25, pixelAngle, 31.0, 1.0);
  if (u_layers >= 2.0) {
    colour += stars(dir, 700.0, 0.075 * crowd * groups, 0.70, pixelAngle, 67.0, 1.0);
    /* Star dust: very faint, very many, in the band and its clumps, so the Milky Way is made of stars and not of haze. */
    colour += stars(dir, 1500.0, 0.045 * crowd * (0.5 + 0.5 * groups), 0.42, pixelAngle, 113.0, 1.0);
    colour += clusters(dir, pixelAngle);
  }

  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  colour *= 1.0 - 0.30 * dot(p, p);
  /* One step of interleaved-gradient dither, a third of an 8-bit level either way: the soft glow of the galaxy and the nebula
     is far too gentle for 256 levels and would otherwise show as a lattice of steps. No loop, no hash, no texture read. */
  colour += (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 190.0;
  gl_FragColor = vec4(colour, 1.0);
}`;
/*
 * THE GALAXY, DRAWN ONCE. A full-screen pass over an equirectangular texture in the galaxy's own frame (x toward its centre,
 * the band along the equator): each pixel is a longitude and latitude, turned into a direction, and the band, its dust, its
 * core and the nebulae are three-dimensional noise on that direction - so there is no seam where longitude wraps and no pinch
 * at the poles. Drawn at NEBULA_GAIN so its dim end keeps precision; the sky reads it back at the reciprocal.
 */
export const NEBULA_BAKE_FRAGMENT = `${PRECISION}
uniform vec2 u_size;
uniform float u_octaves;
${NOISE}

/* A ridge of noise: bright thin lines where the field crosses its middle - the shape of gas filaments and of dust lanes. */
float ridge(vec3 x, float octaves) {
  return 1.0 - abs(2.0 * fbm(x, octaves) - 1.0);
}

/*
 * ONE EMISSION NEBULA, as a structure and not a fog. A soft envelope says where it lives; inside it the light is carried by
 * FILAMENTS (ridged noise, warped so they curl round each other) over a patchy body, and the colour runs from a hot core to a
 * cool rim, as a real region's does (ionised hydrogen red-pink at the heart, doubly ionised oxygen teal and blue at the edge).
 * Dark dust is cut across it afterwards. What it must not be is a uniform haze: the filaments are what make the eye read gas.
 */
vec3 nebula(vec3 g, vec3 centre, float size, vec3 hot, vec3 cool, float seed, float octaves) {
  vec3 d = g - centre;
  float envelope = exp(-dot(d, d) / (size * size));
  if (envelope < 0.012) return vec3(0.0);
  vec3 warp = vec3(fbm(g * 2.6 + seed, 3.0), fbm(g * 2.6 + seed + 4.7, 3.0), fbm(g * 2.6 + seed + 9.1, 3.0)) - 0.5;
  vec3 w = g * 5.0 + warp * 1.7 + seed;
  float filaments = pow(ridge(w * 1.1, octaves), 2.3);
  float body = smoothstep(0.30, 0.72, fbm(w * 0.75, octaves));
  float amount = envelope * smoothstep(0.10, 0.50, envelope) * (0.42 * body + 1.25 * filaments * (0.30 + 0.70 * envelope));
  vec3 tint = mix(cool, hot, smoothstep(0.15, 0.85, envelope * (0.35 + 0.65 * body)));
  return tint * amount;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_size;
  float lon = (uv.x - 0.5) * 6.2831853;
  float lat = (uv.y - 0.5) * 3.1415927;
  vec3 g = vec3(cos(lat) * cos(lon), cos(lat) * sin(lon), sin(lat));

  float n1 = fbm(g * 2.6 + vec3(3.1, 1.7, 8.3), u_octaves);
  float n2 = fbm(g * 10.0 + vec3(9.4, 2.2, 5.8), u_octaves);
  float n3 = fbm(g * 3.4 + vec3(1.3, 6.6, 2.9), u_octaves);
  float grain = fbm(g * 55.0 + vec3(5.2, 8.1, 0.7), u_octaves);

  /* The band wanders: its centre line is bent by the noise, so it is a river of stars and not a ruled stripe. */
  float l = lat + (n1 - 0.5) * 0.44;
  float core = exp(-lon * lon / 0.22);
  float thin = exp(-l * l / 0.030);
  float wide = exp(-l * l / 0.160);
  /* Star clouds: thick and thin patches along the band, each broken up by a finer grain - a wider swing than before, so the band
     is knotted and patchy like a real one and not a smooth glow. */
  float clouds = 0.20 + 1.30 * n2 * (0.40 + 1.15 * grain);
  float stuff = thin * clouds + wide * 0.26 * (0.40 + n1);
  /* Dust lanes: a ragged dark thread along the band, laid where the finer noise is high, and cut harder than before. */
  float laneOffset = (l - 0.030 - 0.05 * (n3 - 0.5)) / 0.075;
  float lane = exp(-laneOffset * laneOffset) * smoothstep(0.30, 0.72, fbm(g * 9.0 + vec3(2.9, 4.4, 9.1), u_octaves));
  stuff *= 1.0 - 0.62 * lane * (thin + 0.30 * wide);

  vec3 starlight = mix(vec3(0.62, 0.70, 0.94), vec3(0.96, 0.82, 0.68), clamp(core * 1.1, 0.0, 1.0));
  /* Less warm glow than before: the old amount, smoothed by the texture, is what read as brown smoke. The band is carried by the
     star layers in the sky shader and by this faint light between them. */
  vec3 colour = starlight * stuff * 0.078;
  colour += vec3(0.95, 0.80, 0.68) * core * exp(-l * l / 0.040) * 0.030 * (0.5 + 0.9 * grain);

  /* THE NEBULAE: four regions, spread so that one is nearly always somewhere in view as the sky turns, each a different gas. */
  float dustCut = smoothstep(0.52, 0.80, ridge(g * 9.0 + vec3(6.1, 1.9, 3.3), u_octaves));
  vec3 gas = vec3(0.0);
  gas += nebula(g, normalize(vec3(0.62, 0.52, 0.14)), 0.52, vec3(0.92, 0.30, 0.38), vec3(0.20, 0.42, 0.78), 1.7, u_octaves);
  gas += nebula(g, normalize(vec3(-0.30, 0.82, -0.22)), 0.56, vec3(0.30, 0.80, 0.76), vec3(0.12, 0.30, 0.66), 5.3, u_octaves);
  gas += nebula(g, normalize(vec3(0.18, -0.56, 0.38)), 0.50, vec3(0.50, 0.64, 1.00), vec3(0.20, 0.28, 0.72), 8.9, u_octaves);
  gas += nebula(g, normalize(vec3(-0.55, -0.20, 0.70)), 0.54, vec3(0.88, 0.40, 0.30), vec3(0.26, 0.36, 0.74), 12.4, u_octaves);
  colour += gas * (1.0 - 0.60 * dustCut) * 0.44;

  /* A very faint depth to the dark between the structures, so the sky is not flat black: a trace of blue-violet in the voids. */
  colour += vec3(0.030, 0.022, 0.066) * smoothstep(0.38, 0.78, n3) * 0.20;
  colour += vec3(0.012, 0.030, 0.070) * smoothstep(0.42, 0.82, n1) * 0.22;

  colour += vec3(0.006, 0.008, 0.019);
  /* GRAIN. Smooth light reads as smoke; real star clouds are knotted, darker and brighter patches a few degrees across. So the light
     is multiplied by a slow noise here, once, keeping its average and its colour. */
  colour *= 0.62 + 0.76 * fbm(g * 90.0 + vec3(3.7, 1.9, 8.2), u_octaves);
  /* CLUMPING, for the stars: where the sky is thick with them and where it is empty. Read by the sky shader from the alpha channel. */
  float clump = smoothstep(0.34, 0.74, fbm(g * 3.3 + vec3(2.3, 7.1, 4.4), u_octaves));
  gl_FragColor = vec4(min(colour * ${glsl(NEBULA_GAIN)}, vec3(1.0)), clump);
}`;
/* ------------------------------------------------------------------ *
 * GLOBE
 * ------------------------------------------------------------------ */
export const GLOBE_VERTEX = `
attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_uv;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;
varying vec2 v_uv;
varying vec3 v_object;
varying vec3 v_viewNormal;
varying vec3 v_viewPosition;
void main() {
  vec4 world = u_model * vec4(a_position, 1.0);
  vec4 view = u_view * world;
  /* The model matrix is a pure rotation, so it doubles as the normal matrix. */
  v_viewNormal = normalize((u_view * u_model * vec4(a_normal, 0.0)).xyz);
  v_viewPosition = view.xyz;
  v_object = a_position;
  v_uv = a_uv;
  gl_Position = u_projection * view;
}`;
export const GLOBE_FRAGMENT = `${PRECISION}
varying vec2 v_uv;
varying vec3 v_object;
varying vec3 v_viewNormal;
varying vec3 v_viewPosition;

uniform sampler2D u_surface;
uniform vec3 u_light;
uniform vec2 u_terminator;
uniform vec3 u_night;
uniform vec3 u_sun;
uniform vec3 u_atmosphere;
uniform float u_haze;
uniform float u_cloudOctaves;
uniform float u_cloudAngle;
uniform vec4 u_glint;
${NOISE}
void main() {
  vec3 normal = normalize(v_viewNormal);
  vec3 toEye = normalize(-v_viewPosition);
  float limb = 1.0 - max(0.0, dot(normal, toEye));

  /* THE MINIATURE'S FOCUS. A scale model photographed close is sharp where it faces the lens and falls softly out of focus as
     the surface turns away: the front of the globe is the plane of focus and the rim is the first thing to leave it. That is
     done here as a soft-focus on the TEXTURE, not as a filter on the picture: the ground is read from a blurrier level of its
     mip chain as the surface turns toward the limb (and, a little more, toward the top and bottom of the disc, as a tilted lens
     would), so the centre keeps every coastline and the rim loses its fine detail progressively. No extra pass, no extra sample,
     no edge to see - the silhouette and the halo stay exactly as they were. */
  float defocus = clamp(smoothstep(0.20, 0.94, limb) + 0.20 * smoothstep(0.45, 0.95, abs(normal.y)) * smoothstep(0.10, 0.50, limb), 0.0, 1.0);

  /* THE GROUND, as baked: its colour, and in alpha how open the water is. */
  vec4 ground = texture2D(u_surface, v_uv, mix(-0.30, ${glsl(DEFOCUS_MIP_BIAS)}, defocus));
  vec3 p = normalize(v_object);

  /* CLOUDS: their own noise, turning at their own pace, taking the same light as the ground.
     They are weather, not blobs: stretched along the parallels the way the planet's winds draw them, swirled by a low-frequency
     warp so the edges curl, thicker in the storm belts of the middle latitudes and along the equator and thin over the dry
     subtropics, with a high thin veil of cirrus above, and - on a device that can afford it - a soft shadow on the ground beside
     each one. Where the surface turns away from the eye the finest structure is let go (see defocus). */
  float cosine = cos(u_cloudAngle);
  float sine = sin(u_cloudAngle);
  vec3 cloudPoint = vec3(cosine * p.x + sine * p.z, p.y, -sine * p.x + cosine * p.z);
  float southNorth = abs(p.y);
  /* Where weather is thick: the storm belts of the middle latitudes (sin of latitude near 0.76) and the equator, and thin over the dry
     subtropics (near 0.40). Smooth bumps, so a pixel pays a few multiplies and no exponentials. */
  float belts = 0.44
    + 0.20 * (1.0 - smoothstep(0.0, 0.30, abs(southNorth - 0.76)))
    + 0.10 * (1.0 - smoothstep(0.0, 0.26, abs(p.y)))
    - 0.13 * (1.0 - smoothstep(0.0, 0.28, abs(southNorth - 0.40)));
  /* Stretched a little along the parallels, then swirled by a slow warp: the masses are large, their edges curl, and they are
     organised the way weather is - broad decks and spirals - not scattered as single puffs. */
  vec3 flow = vec3(cloudPoint.x, cloudPoint.y * 1.45, cloudPoint.z);
  /* The swirl: two noise reads, not three - the warp leans the cloud along the parallels and across the meridians, and that is the
     whole of what the eye reads as curl. (Every read here is paid for by every pixel of the disc, so each is counted.) */
  vec3 warp = vec3(vnoise(flow * 1.7 + vec3(1.3, 4.1, 2.2)) - 0.5, 0.0, vnoise(flow * 1.7 + vec3(3.3, 8.8, 9.9)) - 0.5);
  vec3 q = flow * 3.7 + warp * 2.5 + vec3(5.3, 1.1, 2.7);
  float body = fbm(q, u_cloudOctaves);
  /* The texture INSIDE a cloud: thick cloud is lumpy, not flat white. It breaks the surface up and shows through as shading. */
  float lumps = vnoise(q * 4.6 + vec3(2.1, 7.7, 4.3));
  float threshold = 0.545 - 0.60 * (belts - 0.40);
  float widen = 0.30 + 0.08 * defocus;
  float density = smoothstep(threshold, threshold + widen, body);
  density *= 0.78 + 0.40 * mix(lumps, 0.5, defocus * 0.85);
  density = clamp(density, 0.0, 1.0);
  /* A high thin veil above the weather: a haze of cirrus, never a streak. It is read off the swirl already worked out (its slow,
     broad component), so it costs no noise of its own. */
  float cirrus = smoothstep(0.52, 0.92, 0.5 + 0.9 * (warp.x + warp.z) + 0.6 * (lumps - 0.5)) * 0.11;
  float cloud = clamp(density * 0.80 + cirrus * (1.0 - density * 0.80), 0.0, 0.88);
  /* Thin cloud is cool and grey, thick cloud is white: the thickness shows in the colour as it does from orbit. */
  vec3 cloudColour = mix(vec3(0.72, 0.77, 0.86), vec3(0.97, 0.97, 0.96), smoothstep(0.10, 0.85, density + 0.30 * cirrus));
  vec3 under = ground.rgb;
  if (u_cloudOctaves >= 4.0) {
    /* The same weather read again a step toward the light: where the cloud thickens away from the sun the lit side catches it and
       the far side is shaded, which gives a cloud its volume - and the ground beside it a soft shadow. */
    float lean = smoothstep(threshold, threshold + widen, fbm(q + vec3(0.15, -0.11, 0.08), 2.0));
    cloudColour *= 1.0 + 0.34 * clamp(density - lean, -0.6, 0.6);
    under *= 1.0 - 0.26 * lean * (1.0 - cloud);
  }
  vec3 surface = mix(under, cloudColour, cloud);

  /* THE LIGHT. A wide day term; a small asymmetric wrap so the terminator does not clip to flat shadow. */
  float lambert = dot(normal, u_light);
  float day = smoothstep(u_terminator.x, u_terminator.y, lambert);
  float wrapped = pow(max(0.0, (lambert + 0.12) / 1.12), 0.82);
  vec3 lit = surface * u_sun * wrapped * day;
  vec3 night = surface * u_night * (1.0 - day) * 0.9 + u_night * 0.30;
  vec3 colour = lit + night;
  /* A gentle lift of the mid-tones, as a camera's exposure curve does: the planet reads as lit, not as a dark disc, and the
     black of the night side and of space is untouched. */
  colour = pow(max(colour, vec3(0.0)), vec3(0.88));
  /* A little less colour, over the whole planet: the sun and the exposure curve had pushed it past what the planet looks like. */
  float luminance = dot(colour, vec3(0.299, 0.587, 0.114));
  colour = mix(vec3(luminance), colour, ${glsl(GLOBE_SATURATION)});

  /* A glint of the sun on open water only: not on land, ice or cloud - and only where a mirror would show it. The half vector is taken from the REAL
     direction of the Sun (u_glint.xyz, the same for every point: the Sun is far), not from the art-directed light above, which lights the face from an angle
     of its own. A Sun that is seen in the sky is behind the planet as the camera sees it, so its glint is at the limb and u_glint.w is nothing: the sea shows
     no hotspot while the Sun is in the picture. It shows only when the Sun is round at the camera's side, as the weight says. */
  if (u_glint.w > 0.0) {
    vec3 halfway = normalize(u_glint.xyz + toEye);
    float glint = pow(max(dot(normal, halfway), 0.0), 260.0);
    colour += vec3(1.0, 0.95, 0.85) * glint * 0.40 * u_glint.w * ground.a * (1.0 - cloud) * day;
  }

  /* Haze thickens toward the limb, and a bright inner rim sits on the lit edge only. */
  colour = mix(colour, u_atmosphere, pow(limb, 2.4) * u_haze * day);
  colour += u_atmosphere * pow(limb, 4.0) * day * day * 1.05;

  gl_FragColor = vec4(colour, 1.0);
}`;
/* ------------------------------------------------------------------ *
 * ATMOSPHERE
 * ------------------------------------------------------------------ */
export const ATMOSPHERE_VERTEX = `
attribute vec2 a_corner;
void main() {
  gl_Position = vec4(a_corner, 0.0, 1.0);
}`;
/*
 * THE HALO, MEASURED FROM THE REAL SILHOUETTE. It used to be the far faces of a larger sphere shaded by an orthographic
 * guess at the chord length, which put the glow's peak near the limb and its hard outer edge wherever the polygonal shell
 * happened to end. This is analytic, per pixel, for the camera that is actually looking.
 *
 * A pixel's view ray passes the planet's centre at an IMPACT PARAMETER b (in globe radii). The planet's silhouette is where
 * b = 1 - exactly, in perspective, at every size and framing. The glow is a function of b alone: strongest at b = 1, fading
 * smoothly to nothing at the shell's radius, so it can neither float off the rim nor end in a step; a hair of it carries on
 * just inside b = 1 so the mesh's polygon edge can never show a gap. b is computed from the unnormalised ray (v, -1), whose
 * length is rho = tan of the angle off the axis: b = D * rho / sqrt(1 + rho^2) - no difference of large numbers, so it holds
 * at mediump. The day side is taken from the normal at the ray's closest point to the centre.
 */
export const ATMOSPHERE_FRAGMENT = `${PRECISION}
uniform vec2 u_resolution;
uniform vec2 u_tan;
uniform vec2 u_lens;
uniform float u_distance;
uniform float u_shell;
uniform vec3 u_light;
uniform vec2 u_terminator;
uniform vec3 u_atmosphere;
uniform vec2 u_sunDirection;
uniform float u_sunSpill;
void main() {
  vec2 ndc = gl_FragCoord.xy / u_resolution * 2.0 - 1.0;
  vec2 v = (ndc - u_lens) * u_tan;
  float rho2 = dot(v, v);
  float b = u_distance * sqrt(rho2 / (1.0 + rho2));
  if (b > u_shell) discard;

  /* Out from the silhouette: 1 at b = 1, 0 at the shell, a smooth foot. In from it: a few thousandths of a radius. */
  float outward = pow(clamp((u_shell - b) / (u_shell - 1.0), 0.0, 1.0), ${glsl(ATMOSPHERE_FALLOFF)});
  float inward = smoothstep(0.0, 1.0, clamp((b - ${glsl(1 - ATMOSPHERE_RIM_INSIDE)}) / ${glsl(ATMOSPHERE_RIM_INSIDE)}, 0.0, 1.0));
  float halo = mix(inward, outward, step(1.0, b));

  vec3 normal = normalize(vec3(v, rho2));
  float day = smoothstep(u_terminator.x - 0.02, u_terminator.y + 0.16, dot(normal, u_light));
  float intensity = halo * day * ${glsl(ATMOSPHERE_STRENGTH)};
  /* THE SUN'S ACCENT, LOCAL: where the Sun is at or just behind the limb, the halo on ITS side is lifted a little and warmed - a sunrise rim, in
     one lobe pointing at the Sun (u_sunDirection, the way from the planet's centre to it on the screen). It is nothing elsewhere, and nothing at all
     when there is no Sun (u_sunSpill 0): the halo's colour and strength everywhere else are exactly what they were. */
  float lobe = pow(max(dot(v / max(length(v), 1e-5), u_sunDirection), 0.0), 5.0);
  vec3 accent = vec3(1.0, 0.86, 0.62) * halo * lobe * u_sunSpill * ${glsl(SUN_LIMB_ACCENT)};
  gl_FragColor = vec4(u_atmosphere * intensity + accent, 1.0);
}`;
/* ------------------------------------------------------------------ *
 * MOON
 * ------------------------------------------------------------------ */
/** How much bigger than the moon's own disc the quad is, so a faint glow can fall off outside it. */
export const MOON_QUAD_SCALE = 1.9;
/**
 * THE MOON IS A SOLID BODY. Inside its disc (r <= MOON_DISC_OPAQUE_RADIUS, in disc radii) it is wholly opaque, over anything: no star and no part of the
 * planet shows through it, and only the last few percent of the radius feathers to nothing (the 3c1fd4a Moon's soft edge: it starts at 0.93). Its
 * `brightness` DIMS ITS LIGHT, never its opacity: the 3c1fd4a Moon multiplied alpha by it as well, so its far side was a ghost over the stars, and that is
 * the one thing of that build that is not wanted back. The backdrop's and the ripple field's cut-outs close at this radius (clear to 89%, closed by 93%).
 */
export const MOON_DISC_OPAQUE_RADIUS = 0.93;
/**
 * THE SKY THE 3c1fd4a MOON WAS SEEN OVER, AS LIGHT. That Moon blended with alpha = coverage x brightness, so a share (1 - brightness) of the night sky behind it
 * showed through and lifted it; its far side, at brightness ~0.55, was visibly a ghost. The body is opaque now, and this - the dark sky's own colour, a fixed
 * typical value measured from that build (mean luma ~24/255 round the Moon) - is added back in proportion to (1 - brightness), so the Moon is as bright as it
 * was while nothing shows through it.
 */
export const MOON_SKY_UNDER = Object.freeze([0.088, 0.092, 0.112]);
/*
 * THE MOON IS A LIT SPHERE DRAWN AS ONE QUAD: no mesh, no texture, no depth buffer. The quad is a billboard about the moon's
 * centre (the marker's own trick); the fragment shader treats the point inside it as a point on a sphere, shades it with the
 * scene's one light, and paints its surface from noise on the sphere. It is drawn after the sky and BEFORE the planet, so the
 * planet simply covers it where it is behind - which is where it always is (see MOON in ambientMath.ts).
 *
 * This is the 3c1fd4a Moon's program, line for line, but for two things: the alpha (above) and the edge feather's start. Its light is the SCENE's fixed
 * light (u_light, LIGHTING.direction) - not the Sun of ambientSun.ts, which lights the Earth - and its face is the Earth-facing basis below.
 */
export const MOON_VERTEX = `
attribute vec2 a_corner;
uniform mat4 u_projection;
uniform mat4 u_view;
uniform vec3 u_centre;
uniform float u_size;
varying vec2 v_corner;
void main() {
  vec4 view = u_view * vec4(u_centre, 1.0);
  v_corner = a_corner * ${glsl(MOON_QUAD_SCALE)};
  view.xy += a_corner * u_size * ${glsl(MOON_QUAD_SCALE)};
  gl_Position = u_projection * view;
}`;
export const MOON_FRAGMENT = `${PRECISION}
varying vec2 v_corner;
uniform vec3 u_light;
uniform vec3 u_toEarth;
uniform vec3 u_sun;
uniform float u_brightness;
${NOISE}
void main() {
  float r = length(v_corner);
  /* Outside the disc: a faint cool glow, there only to take the hard edge off - it is not a halo. */
  float glow = exp(-(r - 1.0) * 5.5) * 0.045 * step(1.0, r);
  if (r > ${glsl(MOON_QUAD_SCALE)}) discard;

  vec3 n = vec3(v_corner, sqrt(max(0.0, 1.0 - r * r)));
  /* The near side faces the Earth, as the real one does: a basis looking along the way to the planet carries the view-space point
     into the moon's own frame, so the markings turn as it goes round. */
  vec3 axisZ = normalize(u_toEarth);
  vec3 axisX = normalize(cross(vec3(0.0, 1.0, 0.0), axisZ));
  vec3 axisY = cross(axisZ, axisX);
  vec3 p = vec3(dot(n, axisX), dot(n, axisY), dot(n, axisZ));

  /* The maria: broad dark seas, thresholded out of low-frequency noise and kept to the Earth-facing hemisphere, and a fine mottle. */
  float seas = smoothstep(0.50, 0.63, fbm(p * 2.3 + vec3(3.7, 1.2, 8.4), 3.0)) * smoothstep(-0.55, 0.35, p.z);
  float mottle = fbm(p * 13.0 + vec3(5.1, 2.6, 7.3), 2.0);
  vec3 highland = vec3(0.64, 0.62, 0.59);
  vec3 sea = vec3(0.30, 0.31, 0.33);
  vec3 albedo = mix(highland, sea, seas * 0.88) * (0.88 + 0.24 * mottle);
  /* Two bright, young craters with their rays' worth of brightness, so the face is not only grey and dark grey. */
  albedo += vec3(0.20) * exp(-dot(p - normalize(vec3(-0.35, -0.55, 0.62)), p - normalize(vec3(-0.35, -0.55, 0.62))) * 70.0);
  albedo += vec3(0.14) * exp(-dot(p - normalize(vec3(0.55, 0.30, 0.55)), p - normalize(vec3(0.55, 0.30, 0.55))) * 90.0);

  float lambert = dot(n, normalize(u_light));
  float day = smoothstep(-0.12, 0.34, lambert);
  /* Earthshine: the dark side is never gone, only deep blue-grey. */
  vec3 colour = albedo * u_sun * 0.78 * pow(max(0.0, (lambert + 0.10) / 1.10), 0.85) * day + vec3(0.030, 0.040, 0.062) * (1.0 - day);
  /* SOLID: the disc's coverage is the alpha, and nothing else - the brightness below dims the light, not the body. */
  float edge = 1.0 - smoothstep(${glsl(MOON_DISC_OPAQUE_RADIUS)}, 1.0, r);
  float alpha = edge;
  colour = colour * alpha + vec3(0.62, 0.72, 0.95) * glow;
  float total = max(alpha, glow * 3.0);
  gl_FragColor = vec4(colour * u_brightness + alpha * (1.0 - u_brightness) * vec3(${MOON_SKY_UNDER.map(glsl).join(', ')}), total);
}`;
/* ------------------------------------------------------------------ *
 * SUN
 * ------------------------------------------------------------------ */
/** How far, in core radii, the source quad reaches: far enough that its haze is gone at the edge (and it is windowed to nothing there). */
export const SUN_QUAD_REACH = 70;
/** The lens's ghosts and ring fade out over this span of the planet's radius (inner, outer): nothing inside the first, whole beyond the second - a feathered edge, not a cut. */
export const GHOST_FACE_FEATHER = Object.freeze([0.97, 1.06]);
/*
 * THE SUN, IN TWO STAGES OF ONE PROGRAM (see ambientSun.ts for what decides them; this only paints).
 *
 *   u_stage 0   THE SOURCE: the white-hot disc and its corona, a bloom, a haze and a short starburst, on a quad about the Sun, drawn BEFORE the
 *               planet - which is opaque, so it hides the Sun exactly, and a Sun half behind the limb has the planet's edge.
 *   u_stage 1   THE LENS: the glare veil, an anamorphic streak, a few ghosts along the optical axis and one faint ring, on the whole canvas, drawn
 *               over everything in proportion to how much of the Sun can be seen (u_intensity), the ghosts more the nearer the limb (u_limb).
 *
 * Both are additive (ONE, ONE), procedural, with no texture and no loop: a handful of exponentials a pixel. The look is a bright source in a
 * cinematic orbital shot - a white-hot core that goes to warm gold at its edge (the HDR sum is soft-clipped, so the centre is white and nothing is
 * orange), a bloom that is not a blob, short rays, and a flare that is restrained: low, tinted ghosts, one ring, no rainbow circles. At the reduced
 * detail (u_detail 0, a constrained device) the streak, the ring, two of the four ghosts and the fine rays are gone; the source is the same.
 */
export const SUN_VERTEX = `
attribute vec2 a_corner;
uniform vec2 u_resolution;
uniform vec2 u_centre;
uniform vec2 u_half;
void main() {
  vec2 p = u_centre + a_corner * u_half;
  gl_Position = vec4(p / u_resolution * 2.0 - 1.0, 0.0, 1.0);
}`;
export const SUN_FRAGMENT = `${PRECISION}
uniform vec2 u_resolution;
uniform vec2 u_sun;
uniform vec2 u_centre;
uniform vec2 u_half;
uniform float u_core;
uniform float u_stage;
uniform float u_intensity;
uniform float u_limb;
uniform float u_detail;
uniform vec3 u_earth;

vec3 source(vec2 p) {
  vec2 d = p - u_sun;
  float r = length(d) / u_core;
  float disc = 1.0 - smoothstep(0.80, 1.0, r);
  float corona = exp(-r * 0.90);
  float bloom = exp(-r * 0.17);
  float haze = exp(-r * 0.05);
  float glow = exp(-r * 0.42);
  vec3 hdr = disc * vec3(8.0, 7.8, 7.5)
    + corona * vec3(3.4, 2.9, 2.2)
    + glow * vec3(1.15, 0.96, 0.70) * (1.0 + 0.6 * u_limb)
    + bloom * vec3(0.95, 0.80, 0.60) * (1.0 + 0.9 * u_limb)
    + haze * vec3(0.100, 0.092, 0.090);
  /* Short, uneven rays - not a tidy star: a few broad spokes of different reach, and (at full detail) a finer scatter; all die away within a few
     core radii, so the light reads as glare with a hint of structure. */
  float a = atan(d.y, d.x);
  float reach = 0.55 + 0.45 * sin(a * 3.0 + 1.7);
  float spokes = pow(0.5 + 0.5 * cos(a * 8.0 + 0.45), 7.0) * 0.42 * reach;
  if (0.5 < u_detail) spokes += pow(0.5 + 0.5 * cos(a * 22.0 + 1.3), 12.0) * 0.30 * (1.2 - reach);
  hdr += spokes * exp(-r * 0.30) * smoothstep(0.9, 2.4, r) * vec3(1.15, 1.02, 0.86);
  /* Soft-clipped: white-hot at the centre, warm gold as it falls away - never an orange ball. */
  vec3 c = vec3(1.0) - exp(-hdr * 0.5);
  float window = 1.0 - smoothstep(0.7, 1.0, length(p - u_centre) / u_half.x);
  return c * window;
}

vec3 ghost(vec2 p, vec2 centre, float radius, vec3 tint, float strength) {
  float d = length(p - centre) / radius;
  float body = (1.0 - smoothstep(0.80, 1.0, d)) * (0.30 + 0.70 * smoothstep(0.30, 0.95, d));
  return tint * strength * body;
}

vec3 lens(vec2 p) {
  float h = u_resolution.y;
  vec2 axis = u_resolution * 0.5 - u_sun;
  vec2 q = (p - u_sun) / h;
  float dr = length(q);
  vec3 col = vec3(1.0, 0.95, 0.86) * (0.20 * exp(-dr * 3.0) + 0.060 * exp(-dr * 0.9));
  if (0.5 < u_detail) {
    float streak = exp(-abs(q.y) * 120.0) * exp(-abs(q.x) * 1.7);
    col += vec3(0.55, 0.72, 1.0) * 0.36 * streak;
  }
  /* THE GHOSTS DO NOT CROSS THE PLANET'S FACE. A ghost is a pale disc laid over the picture on the line through the Sun and the middle of the canvas; over the dark
     sea it reads as a bright, glossy spot sliding across the globe, which is what a reflection would look like and what a lens does not show on a body in front
     of it. They (and the ring) are taken off the planet's disc, with a feathered edge; the glare, the streak and everything outside the disc are as they were. */
  float offFace = smoothstep(${glsl(GHOST_FACE_FEATHER[0])}, ${glsl(GHOST_FACE_FEATHER[1])}, length(p - u_earth.xy) / max(u_earth.z, 1.0));
  float gain = (0.5 + 0.5 * u_limb) * offFace;
  col += ghost(p, u_sun + axis * 0.55, 0.040 * h, vec3(0.55, 0.72, 1.00), 0.105 * gain);
  col += ghost(p, u_sun + axis * 1.25, 0.075 * h, vec3(1.00, 0.76, 0.52), 0.080 * gain);
  if (0.5 < u_detail) {
    col += ghost(p, u_sun + axis * 1.75, 0.028 * h, vec3(0.74, 0.58, 1.00), 0.120 * gain);
    col += ghost(p, u_sun + axis * 2.15, 0.120 * h, vec3(0.55, 1.00, 0.82), 0.055 * gain);
    /* One large, very faint ring, a hair of chromatic split in it. */
    float dd = length(p - (u_sun + axis * 1.10));
    float ring = 0.36 * h;
    float w = 0.012 * h;
    float red = (dd - ring * 0.985) / w;
    float green = (dd - ring) / w;
    float blue = (dd - ring * 1.015) / w;
    col += vec3(exp(-red * red), exp(-green * green), exp(-blue * blue)) * vec3(1.0, 0.8, 1.0) * 0.036 * gain;
  }
  return col;
}

void main() {
  vec3 c = u_stage < 0.5 ? source(gl_FragCoord.xy) : lens(gl_FragCoord.xy);
  gl_FragColor = vec4(c * u_intensity, 0.0);
}`;
/* ------------------------------------------------------------------ *
 * MARKER
 * ------------------------------------------------------------------ */
export const MARKER_VERTEX = `
attribute vec2 a_corner;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;
uniform vec3 u_point;
uniform float u_size;
varying vec2 v_corner;
varying float v_facing;
void main() {
  vec4 view = u_view * u_model * vec4(u_point * 1.002, 1.0);
  vec3 normal = normalize((u_view * u_model * vec4(u_point, 0.0)).xyz);
  v_facing = dot(normal, normalize(-view.xyz));
  v_corner = a_corner;
  view.xy += a_corner * u_size;
  gl_Position = u_projection * view;
}`;
export const MARKER_FRAGMENT = `${PRECISION}
varying vec2 v_corner;
varying float v_facing;
uniform float u_phase;
uniform float u_opacity;
void main() {
  float r = length(v_corner);
  if (r > 1.0) discard;
  /* Fades out as the place turns toward the limb, so it never shows through the planet. */
  float facing = smoothstep(0.03, 0.30, v_facing);
  float core = smoothstep(0.17, 0.12, r);
  float glow = exp(-r * r * 7.0) * 0.55;
  float ringRadius = mix(0.22, 0.98, u_phase);
  float ring = smoothstep(0.075, 0.0, abs(r - ringRadius)) * (1.0 - u_phase) * 0.9;
  vec3 colour = core * vec3(1.0, 0.90, 0.68) + glow * vec3(0.85, 0.75, 1.0) * 0.8 + ring * vec3(0.80, 0.72, 1.0);
  float amount = facing * u_opacity;
  gl_FragColor = vec4(colour * amount, amount);
}`;
