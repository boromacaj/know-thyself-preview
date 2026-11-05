/*
 * A MONOTONE CURVE, NOT A SPLINE THAT OVERSHOOTS.
 *
 * Catmull-Rom is the usual smooth line and it swings past its points: between
 * two quiet months it would dip below "Quiet", drawing a value nothing computed.
 * Fritsch-Carlson keeps every segment inside its two endpoints, so the curve is
 * smooth and says nothing the points do not.
 */
export function monotonePath(points) {
    if (points.length === 0)
        return '';
    if (points.length === 1)
        return `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    const n = points.length;
    const slopes = [];
    for (let i = 0; i < n - 1; i += 1)
        slopes.push((points[i + 1].y - points[i].y) / (points[i + 1].x - points[i].x));
    const tangents = [slopes[0]];
    for (let i = 1; i < n - 1; i += 1) {
        tangents.push(slopes[i - 1] * slopes[i] <= 0 ? 0 : (slopes[i - 1] + slopes[i]) / 2);
    }
    tangents.push(slopes[n - 2]);
    for (let i = 0; i < n - 1; i += 1) {
        if (slopes[i] === 0) {
            tangents[i] = 0;
            tangents[i + 1] = 0;
            continue;
        }
        const a = tangents[i] / slopes[i];
        const b = tangents[i + 1] / slopes[i];
        const h = a * a + b * b;
        if (h > 9) {
            const k = 3 / Math.sqrt(h);
            tangents[i] = k * a * slopes[i];
            tangents[i + 1] = k * b * slopes[i];
        }
    }
    let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 0; i < n - 1; i += 1) {
        const dx = (points[i + 1].x - points[i].x) / 3;
        d += ` C${(points[i].x + dx).toFixed(1)},${(points[i].y + tangents[i] * dx).toFixed(1)}`
            + ` ${(points[i + 1].x - dx).toFixed(1)},${(points[i + 1].y - tangents[i + 1] * dx).toFixed(1)}`
            + ` ${points[i + 1].x.toFixed(1)},${points[i + 1].y.toFixed(1)}`;
    }
    return d;
}
