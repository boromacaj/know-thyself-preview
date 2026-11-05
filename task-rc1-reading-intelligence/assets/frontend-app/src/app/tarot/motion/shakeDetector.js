/**
 * WHEN IS A MOVEMENT OF THE PHONE A SHAKE? - pure logic, no browser, no randomness, no state outside the detector.
 *
 * THIS IS AN INPUT TRIGGER AND NOTHING ELSE. It answers one yes/no question - "did somebody just shake the phone, on
 * purpose?" - and what it is given never leaves it: no sample is stored beyond the few impulses of the current window,
 * none is returned, and the only thing it ever produces is `true`. Nothing in here can seed, order or choose anything.
 *
 * WHAT COUNTS. A shake is several hard strokes in alternating directions, close together:
 *
 *   - a stroke is a burst of linear acceleration (gravity removed) of at least `threshold` m/s^2. Walking with a phone
 *     in the hand peaks well under it; a hard shake is two or three times over it;
 *   - samples within `minGapMs` of an impulse's start belong to that impulse, so one stroke is one impulse however
 *     many samples it spans;
 *   - the next impulse must point the OTHER way (back and forth, not the same push twice). One bump, or a bump and its
 *     rebound, is at most two impulses and is never enough;
 *   - `impulses` of them, each no more than `maxGapMs` after the one before and all inside `windowMs`, are a shake;
 *   - after a shake nothing is accepted for `cooldownMs`, so one shake is one trigger however long it goes on.
 *
 * GRAVITY. Browsers give linear acceleration (`acceleration`) where the device can separate gravity, and otherwise only
 * `accelerationIncludingGravity`. For the second kind a slow high-pass filter removes the part that changes slowly:
 * tilting or rotating the phone moves gravity from one axis to another over a few hundred milliseconds, which the
 * filter passes as a few m/s^2, far below a shake. Turning the screen is therefore not a shake.
 */
export const DEFAULT_SHAKE_CONFIG = Object.freeze({
    threshold: 14,
    minGapMs: 90,
    maxGapMs: 500,
    windowMs: 1500,
    impulses: 3,
    cooldownMs: 1500,
    gravityTauMs: 120,
});
export function createShakeDetector(overrides = {}) {
    const config = { ...DEFAULT_SHAKE_CONFIG, ...overrides };
    let gravity = null;
    let strokes = [];
    /** When the current impulse started, or null between impulses. */
    let impulseStart = null;
    let cooldownUntil = Number.NEGATIVE_INFINITY;
    const reset = () => {
        gravity = null;
        strokes = [];
        impulseStart = null;
        cooldownUntil = Number.NEGATIVE_INFINITY;
    };
    const linear = (sample) => {
        if (!sample.includesGravity)
            return [sample.x, sample.y, sample.z];
        if (gravity === null) {
            gravity = { t: sample.t, x: sample.x, y: sample.y, z: sample.z };
            return null;
        }
        const dt = Math.max(sample.t - gravity.t, 0);
        const keep = Math.exp(-dt / config.gravityTauMs);
        gravity = {
            t: sample.t,
            x: keep * gravity.x + (1 - keep) * sample.x,
            y: keep * gravity.y + (1 - keep) * sample.y,
            z: keep * gravity.z + (1 - keep) * sample.z,
        };
        return [sample.x - gravity.x, sample.y - gravity.y, sample.z - gravity.z];
    };
    const push = (sample) => {
        if (![sample.t, sample.x, sample.y, sample.z].every(Number.isFinite))
            return false;
        const vector = linear(sample);
        if (vector === null)
            return false;
        const [x, y, z] = vector;
        if (sample.t < cooldownUntil)
            return false;
        /* Strokes that are too old to belong to a shake, or too far from the last one, start the count again. */
        const last = strokes[strokes.length - 1];
        if (last && sample.t - last.t > config.maxGapMs)
            strokes = [];
        strokes = strokes.filter((stroke) => sample.t - stroke.t <= config.windowMs);
        const strength = Math.hypot(x, y, z);
        if (strength < config.threshold) {
            if (impulseStart !== null && sample.t - impulseStart >= config.minGapMs)
                impulseStart = null;
            return false;
        }
        if (impulseStart !== null && sample.t - impulseStart < config.minGapMs)
            return false;
        /* A new impulse. It counts only if it reverses the one before it. */
        impulseStart = sample.t;
        const before = strokes[strokes.length - 1];
        if (before) {
            const dot = (before.x * x + before.y * y + before.z * z) / (Math.hypot(before.x, before.y, before.z) * strength);
            if (dot >= -0.2)
                strokes = [];
        }
        strokes.push({ t: sample.t, x, y, z });
        if (strokes.length >= config.impulses) {
            strokes = [];
            impulseStart = null;
            cooldownUntil = sample.t + config.cooldownMs;
            return true;
        }
        return false;
    };
    return { push, reset };
}
