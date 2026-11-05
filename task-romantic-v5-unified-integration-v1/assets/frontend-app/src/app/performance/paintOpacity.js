/*
 * A LINE THAT FADES DOES NOT NEED A LAYER OF ITS OWN.
 *
 * The menu's artwork fades hundreds of single lines in and out. An animation of `opacity` on an element is run by the browser's compositor, which for that it
 * puts the element on a LAYER OF ITS OWN: a texture of its own, drawn and blended on its own. Here that came to 445 composited layers, each one holding a whole
 * 320 x 256 tile of GPU memory however small the line (a 16 x 28 px card, a 40 x 31 px heart), and every change to a line - and its dash is drawn on while it
 * fades - re-rastered that tile into a NEW GPU buffer, about 4 ms of the GPU thread each. Measured on the Galaxy A55: 380 GPU memory-bound raster tasks a second,
 * the GPU thread at 97 %, the main menu at 15-25 frames a second.
 *
 * For a SHAPE (a path, a circle, a line ...) that has only a stroke, or only a fill, `opacity` and `stroke-opacity` (or `fill-opacity`) are the same picture: the
 * shape is painted once, with that alpha, and there is nothing under it in its own group for the alpha to be applied to as a whole (the two differ only for a shape
 * that has both a fill and a stroke, whose overlap would show through, and for a group of several shapes, whose overlaps would too: those are left exactly as they are).
 * So the animation is put on the property that says the same thing and does not need a layer: the line is painted into the layer of the artwork it belongs to.
 *
 * WHERE IT IS NOT DONE. A shape inside a group that is itself moved or faded by an animation is on that group's layer already, and there its opacity is the cheaper kind: a
 * compositor blend of a texture that is not repainted. Moving it onto a paint property would re-raster the group's tile on every frame it changes - measured, the heart and
 * the cards of the Connections tile went from a few repaints a second to twenty. So only shapes that would otherwise be a layer FOR their opacity alone are moved.
 *
 * Nothing is re-timed and no value changes: the same keyframes, the same easing, the same clock - the same numbers on another property name. The shape's own `opacity`
 * is set to 1 (it was only ever the animation's), so that a rule that parked it at 0 until the animation took over does not hide it.
 */
const SHAPE = /^(path|circle|line|rect|ellipse|polyline|polygon)$/i;
/** Which paint property says the same as `opacity` for a shape with this paint: the one it has, or none when it has both (or neither). */
export function paintPropertyFor(tag, fill, stroke) {
    if (!SHAPE.test(tag))
        return null;
    const filled = fill.trim() !== 'none';
    const stroked = stroke.trim() !== 'none';
    if (filled === stroked)
        return null;
    return stroked ? 'strokeOpacity' : 'fillOpacity';
}
/** The same keyframes with every `opacity` value on `property` instead. Pure. */
export function reexpressKeyframes(keyframes, property) {
    return keyframes.map((frame) => {
        const next = { ...frame };
        delete next.computedOffset;
        if ('opacity' in next) {
            next[property] = next.opacity;
            delete next.opacity;
        }
        return next;
    });
}
/**
 * Whether the animation's `opacity` can be moved without anything showing: it must own the shape's opacity for the whole of its timeline - no delay that would let the
 * shape's own (parked) value show first, unless the animation fills backwards - and nothing else may animate that shape's opacity or blend it.
 */
export function ownsOpacity(timing, others) {
    if (others > 0)
        return false;
    const delay = timing.delay ?? 0;
    return delay <= 0 || timing.fill === 'backwards' || timing.fill === 'both';
}
/** Does an element above this one (inside the artwork) run a transform or opacity animation - is it on a layer of its own already? */
export function insideAnimatedGroup(target) {
    for (let ancestor = target.parentElement; ancestor !== null && ancestor !== document.body; ancestor = ancestor.parentElement) {
        if (animatesLayer(ancestor))
            return true;
    }
    return false;
}
/**
 * Whether ONE element runs a transform or opacity animation, worked out once per generation. A shape deep in the artwork asked about every ancestor, and so did its hundreds of neighbours: the same
 * ancestors' getAnimations() were read hundreds of times in one scan (a fifth of the main menu's return, measured). The generation is one scan of the duty cycle (forgetAnimatedGroups): the groups do
 * not change while it registers, and the next scan asks again.
 */
let generation = 0;
const layerCache = new WeakMap();
export function forgetAnimatedGroups() { generation += 1; }
function animatesLayer(element) {
    const known = layerCache.get(element);
    if (known !== undefined && known.generation === generation)
        return known.value;
    let value = false;
    for (const animation of element.getAnimations()) {
        const effect = animation.effect;
        if (!effect || typeof effect.getKeyframes !== 'function')
            continue;
        for (const frame of effect.getKeyframes()) {
            if ('opacity' in frame || 'transform' in frame || 'translate' in frame || 'rotate' in frame || 'scale' in frame) {
                value = true;
                break;
            }
        }
        if (value)
            break;
    }
    layerCache.set(element, { generation, value });
    return value;
}
/** Moves one running CSS animation's opacity onto the paint property, if it can be. Returns whether it did. */
export function flattenOpacityAnimation(animation) {
    const effect = animation.effect;
    const target = effect?.target;
    if (!effect || typeof effect.getKeyframes !== 'function' || !target || !(target instanceof SVGElement))
        return false;
    const frames = effect.getKeyframes();
    if (!frames.some((frame) => 'opacity' in frame))
        return false;
    const style = getComputedStyle(target);
    const property = paintPropertyFor(target.tagName, style.fill, style.stroke);
    if (property === null || style.mixBlendMode !== 'normal')
        return false;
    if (insideAnimatedGroup(target))
        return false;
    const others = target.getAnimations().filter((other) => {
        if (other === animation)
            return false;
        const otherEffect = other.effect;
        return !!otherEffect && typeof otherEffect.getKeyframes === 'function' && otherEffect.getKeyframes().some((frame) => 'opacity' in frame);
    }).length;
    if (!ownsOpacity(effect.getTiming(), others))
        return false;
    effect.setKeyframes(reexpressKeyframes(frames, property));
    target.style.opacity = '1';
    return true;
}
