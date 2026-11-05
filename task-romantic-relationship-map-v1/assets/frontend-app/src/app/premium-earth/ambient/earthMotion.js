/**
 * IDLE ROTATION, DRAG AND INERTIA, AS A PURE FUNCTION.
 *
 * Extracted from the renderer so the motion can be tested without a browser,
 * a GPU or a clock. The first implementation added the release velocity once
 * per FRAME, which made the glide length depend on the refresh rate - a flick
 * travelled twice as far on a 120Hz phone as on a 60Hz one. Everything here is
 * per SECOND and integrated against a real delta, so it does not.
 */
export const DEFAULT_MOTION = Object.freeze({
    /* 0.85 deg/s, the same ambient rate the Google globe uses, so the two are
       interchangeable without the pace of the scene changing. */
    idleRate: 0.85 * Math.PI / 180,
    /*
     * 2% of the release speed survives one second.
     *
     * Chosen against the feel of the reference rather than as a round number: a
     * flick coasts for roughly a second and a half before it is indistinguishable
     * from the idle drift, which is long enough to feel like momentum and short
     * enough that the globe never feels like it has been thrown.
     */
    decayPerSecond: 0.02,
    restThreshold: 0.0015,
    /* ~78 degrees. Past this the sphere degenerates on screen and a drag feels
       like it has snagged on something. */
    pitchLimit: 1.36,
});
/**
 * Advance one frame.
 *
 * While dragging, momentum is held at whatever the drag last set and nothing is
 * integrated - the pointer owns the orientation. On release the velocity decays
 * exponentially and the idle rate is added underneath, so a flick eases back
 * into the ambient drift instead of stopping dead and starting again.
 */
export function advanceRotation(state, deltaSeconds, dragging, options = DEFAULT_MOTION) {
    if (dragging)
        return state;
    /* Exponential decay, framed per second so the glide is identical at any
       refresh rate: v(t) = v0 * decay^t. */
    const factor = Math.pow(options.decayPerSecond, deltaSeconds);
    let yawVelocity = state.yawVelocity * factor;
    let pitchVelocity = state.pitchVelocity * factor;
    if (Math.abs(yawVelocity) < options.restThreshold)
        yawVelocity = 0;
    if (Math.abs(pitchVelocity) < options.restThreshold)
        pitchVelocity = 0;
    /* The glide is integrated with the average of the start and end velocity
       rather than either endpoint. Over a long frame - a dropped frame on a
       phone, say - using the start alone overshoots and using the end alone
       stalls, and the difference is visible as a hitch. */
    const yaw = state.yaw
        + (state.yawVelocity + yawVelocity) * 0.5 * deltaSeconds
        + options.idleRate * deltaSeconds;
    const pitch = clampPitch(state.pitch + (state.pitchVelocity + pitchVelocity) * 0.5 * deltaSeconds, options.pitchLimit);
    return { yaw, pitch, yawVelocity, pitchVelocity };
}
/**
 * Add an impulse of angular velocity to a spin that may already have some: how a finger or a wheel turns the planet
 * (earthGesture.ts). It ADDS, so repeated swipes build momentum, and it is clamped, so a flurry cannot wind up a runaway spin.
 * The glide that advanceRotation then applies is the one a released drag has always had.
 */
export function addSpinVelocity(currentRadiansPerSecond, impulseRadiansPerSecond, maxRadiansPerSecond) {
    if (!Number.isFinite(impulseRadiansPerSecond))
        return currentRadiansPerSecond;
    const next = currentRadiansPerSecond + impulseRadiansPerSecond;
    return Math.max(-maxRadiansPerSecond, Math.min(maxRadiansPerSecond, next));
}
/**
 * Spend some of the extra rotation that is waiting (see AmbientGlobeSession.nudge).
 *
 * An exponential ease: each step spends the share of what is left that the step's real length calls for,
 * `1 - exp(-delta / settle)`. Because the share follows the delta, ten steps of 1/120 s spend exactly what two of 1/24 s
 * would - the response to a scroll is the same on a 60 Hz phone, a 120 Hz one and a throttled frame. It never overshoots,
 * and what is left decays to nothing, so the idle spin simply carries on afterwards.
 */
export function spendNudge(pendingRadians, deltaSeconds, settleSeconds) {
    if (pendingRadians === 0 || deltaSeconds <= 0)
        return { spent: 0, remaining: pendingRadians };
    const spent = pendingRadians * (1 - Math.exp(-deltaSeconds / settleSeconds));
    const remaining = pendingRadians - spent;
    return Math.abs(remaining) < 1e-5 ? { spent: pendingRadians, remaining: 0 } : { spent, remaining };
}
/**
 * Fold one pointer move into the orientation.
 *
 * `radiusPx` is the globe's on-screen radius, so a swipe of a given length
 * turns the globe by the same angle whatever the viewport size - without it a
 * drag on a tablet feels sluggish and the same drag on a phone feels twitchy.
 *
 * The velocity it records is per second, derived from the actual time between
 * moves, which is what makes the release glide independent of how often the
 * browser chose to deliver pointer events.
 */
export function applyDrag(state, deltaXPx, deltaYPx, elapsedSeconds, radiusPx, allowPitch, options = DEFAULT_MOTION) {
    const scale = 0.85 / Math.max(1, radiusPx);
    const yawDelta = deltaXPx * scale;
    const pitchDelta = allowPitch ? deltaYPx * scale : 0;
    /* Guard the divide: coalesced pointer events can arrive with the same
       timestamp, and one of those would otherwise produce an infinite flick. */
    const safeElapsed = Math.max(1 / 240, elapsedSeconds);
    return {
        yaw: state.yaw + yawDelta,
        pitch: clampPitch(state.pitch + pitchDelta, options.pitchLimit),
        yawVelocity: yawDelta / safeElapsed,
        pitchVelocity: pitchDelta / safeElapsed,
    };
}
function clampPitch(pitch, limit) {
    return Math.min(limit, Math.max(-limit, pitch));
}
