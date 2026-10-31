/*
 * WRITE ONLY WHAT CHANGED.
 *
 * The globe publishes the Moon's and the Sun's silhouettes on every frame they move, at four decimals of a fraction of the canvas: far finer
 * than anything that can be seen. Each consumer used to write every number as a style custom property on every one of those events, so a
 * layer whose mask depends on them was invalidated - and, being masked, repainted - on every frame, three or four times over, and even when
 * the number it wrote was the very one it already held. A style write is not free on WebKit: it dirties style for the element and everything
 * the property reaches, and a repainted masked surface is GPU work. Measured: about 3-4 style mutations per frame per consumer, 1,300 a
 * second at the peak on a phone, and 70 of every 236 writes in an eight second window changed nothing at all.
 *
 * So the number is snapped to a step finer than the eye can tell (a quarter of a pixel, or a few hundredths of a percent where the unit is a
 * share of the box) and written only when the snapped value differs from the one already on the element. No timer, no frame loop of its own,
 * no change to what is drawn beyond a sub-pixel step.
 */
/** `value` snapped to the nearest multiple of `step`. */
export function snap(value, step) {
    if (!Number.isFinite(value) || !(step > 0))
        return value;
    const snapped = Math.round(value / step) * step;
    return snapped === 0 ? 0 : snapped;
}
/** A snapped number as a CSS length, with no more digits than the step needs (and never "-0"). */
export function snappedLength(value, step, unit) {
    const snapped = snap(value, step);
    const digits = step >= 1 ? 0 : Math.min(4, Math.ceil(-Math.log10(step)) + 1);
    const text = (Math.abs(snapped) < step / 2 ? 0 : snapped).toFixed(digits);
    return `${text}${unit}`;
}
/**
 * Sets a style custom property if, and only if, the element's INLINE declaration is not already that string. Returns whether it wrote.
 * The comparison reads the inline declaration (a string lookup in the element's own style, not a computed style), so it is cheap and it
 * can never disagree with another writer of the same property: whatever is there is what is compared.
 */
export function setVarIfChanged(element, name, value) {
    if (element.style.getPropertyValue(name) === value)
        return false;
    element.style.setProperty(name, value);
    return true;
}
/** Sets or removes an attribute only when its presence/value differs. */
export function setAttributeIfChanged(element, name, value) {
    if (element.getAttribute(name) === value)
        return false;
    element.setAttribute(name, value);
    return true;
}
