/**
 * A UV SPHERE, BUILT ONCE.
 *
 * Real geometry rather than a ray-marched fullscreen quad. That choice is the
 * whole reason this renderer can take photorealistic imagery later: an
 * equirectangular Earth texture maps onto UV sphere coordinates directly, so
 * swapping a placeholder for a 16k Blue Marble is a texture upload and nothing
 * else - no shader maths changes, no geometry changes, no behaviour changes.
 *
 * WINDING is counter-clockwise when seen from outside, so the default
 * gl.CCW front face is the outward surface. The atmosphere shell reuses the
 * same buffers and flips the cull face instead of duplicating the mesh.
 *
 * SEGMENT COUNT. 96 x 48 is 4,608 quads. The silhouette is what matters at this
 * apparent size - the globe covers roughly a third of the viewport height - and
 * at 96 longitudinal segments the limb is smooth to well under a pixel. Going
 * higher costs upload time on a phone and buys nothing visible.
 */
export const DEFAULT_LONGITUDE_SEGMENTS = 96;
export const DEFAULT_LATITUDE_SEGMENTS = 48;
/**
 * Unit sphere with equirectangular UVs.
 *
 * u = 0 at longitude -180, u = 1 at longitude +180.
 * v = 0 at the north pole, v = 1 at the south pole - which is the row order of
 * every equirectangular Earth texture published, so no flip is needed anywhere.
 */
export function createSphereMesh(longitudeSegments = DEFAULT_LONGITUDE_SEGMENTS, latitudeSegments = DEFAULT_LATITUDE_SEGMENTS) {
    const vertexCount = (longitudeSegments + 1) * (latitudeSegments + 1);
    const positions = new Float32Array(vertexCount * 3);
    const normals = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);
    let p = 0;
    let t = 0;
    for (let latitude = 0; latitude <= latitudeSegments; latitude += 1) {
        /* theta runs 0 at the north pole to PI at the south. */
        const v = latitude / latitudeSegments;
        const theta = v * Math.PI;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        for (let longitude = 0; longitude <= longitudeSegments; longitude += 1) {
            const u = longitude / longitudeSegments;
            /* phi is offset by PI so that u = 0.5 sits at longitude 0 (Greenwich),
               which is where every equirectangular world map puts it. */
            const phi = u * Math.PI * 2 - Math.PI;
            const x = sinTheta * Math.sin(phi);
            const y = cosTheta;
            const z = sinTheta * Math.cos(phi);
            /* Unit sphere, so the position IS the normal. */
            positions[p] = x;
            positions[p + 1] = y;
            positions[p + 2] = z;
            normals[p] = x;
            normals[p + 1] = y;
            normals[p + 2] = z;
            p += 3;
            uvs[t] = u;
            uvs[t + 1] = v;
            t += 2;
        }
    }
    const quadCount = longitudeSegments * latitudeSegments;
    const indices = new Uint16Array(quadCount * 6);
    let i = 0;
    for (let latitude = 0; latitude < latitudeSegments; latitude += 1) {
        for (let longitude = 0; longitude < longitudeSegments; longitude += 1) {
            const a = latitude * (longitudeSegments + 1) + longitude;
            const b = a + longitudeSegments + 1;
            indices[i] = a;
            indices[i + 1] = b;
            indices[i + 2] = a + 1;
            indices[i + 3] = a + 1;
            indices[i + 4] = b;
            indices[i + 5] = b + 1;
            i += 6;
        }
    }
    return { positions, normals, uvs, indices, indexCount: indices.length };
}
