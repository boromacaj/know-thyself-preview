/*
 * THE DEALER'S SPREAD
 * -------------------
 * A deck squared up in one pile is opened across the table into one long overlapping ribbon: the cards nearest the pile begin, the ones after them
 * follow outward with a short stagger, and every card ends exactly where the strip puts it. The same moves run backwards, outermost first, when the
 * deck goes at the end (the strip gathers back into a stack and fades).
 *
 * `planDealerSpread` is pure: the cards' resting places in, each card's start (its offset from the strip's place, its place in the stack, its delay) out.
 * `applyDealerMotion` reads the strip's layout ONCE, writes three custom properties on the cards that are on the screen and nothing else; the motion itself is
 * a CSS animation of `translate` (and, going, `opacity`) - compositor work, no script per frame (tarotHero.ts).
 */
export function planDealerSpread(input) {
    const { lefts, stackLeft, viewLeft, viewRight, cardWidth } = input;
    const visible = [];
    lefts.forEach((left, index) => { if (Number.isFinite(left) && left + cardWidth > viewLeft && left < viewRight)
        visible.push(index); });
    if (visible.length === 0)
        return [];
    let nearest = Infinity;
    let farthest = 0;
    for (const index of visible) {
        const reach = Math.abs(stackLeft - lefts[index]);
        nearest = Math.min(nearest, reach);
        farthest = Math.max(farthest, reach);
    }
    const layers = Math.max(1, Math.floor(input.layers));
    return visible.map((index, order) => {
        const layer = Math.min(order, layers - 1);
        const distance = Math.abs(stackLeft - lefts[index]);
        return {
            index,
            x: stackLeft - lefts[index] - layer * input.layerLeft,
            y: -layer * input.layerUp,
            /* The card nearest the pile begins at once; the farthest begins last, the others in proportion to how much further they have to go. */
            delay: farthest > nearest ? Math.round(input.staggerMs * ((distance - nearest) / (farthest - nearest))) : 0,
        };
    });
}
/** The same moves for the way out: the farthest card begins first, the nearest last, so the ribbon is drawn in toward the pile. */
export function planDealerGather(input) {
    const moves = planDealerSpread(input);
    return moves.map((move) => ({ ...move, delay: Math.max(0, input.staggerMs - move.delay) }));
}
const px = (value) => `${value.toFixed(2)}px`;
/**
 * Write the plan on the strip's cards. Returns how many cards are animated (0 where there is no layout: nothing is written, the cards simply are where
 * the strip puts them). One read of the layout, then the writes.
 */
export function applyDealerMotion(strip, kind, staggerMs) {
    if (typeof strip.getBoundingClientRect !== 'function' || typeof getComputedStyle !== 'function')
        return 0;
    const deck = strip.querySelector('.tx-deck');
    const hero = strip.closest('.tx-hero');
    if (!deck || !hero)
        return 0;
    const items = [...deck.querySelectorAll(':scope > li')];
    const style = getComputedStyle(hero);
    const number = (name) => Number.parseFloat(style.getPropertyValue(name));
    const cardWidth = number('--th-strip-w');
    const focusX = number('--th-focus-x');
    if (!(cardWidth > 0) || !Number.isFinite(focusX) || items.length === 0)
        return 0;
    /* READ */
    const box = strip.getBoundingClientRect();
    const lefts = items.map((item) => item.getBoundingClientRect().left);
    const taken = items.map((item) => item.querySelector('.is-chosen') !== null);
    /* A place whose card has been taken is empty and is not moved. */
    const resting = lefts.map((left, index) => (taken[index] ? Number.NaN : left));
    const input = {
        lefts: resting, stackLeft: box.left + focusX - cardWidth / 2, viewLeft: box.left - cardWidth, viewRight: box.right,
        cardWidth, staggerMs, layers: 16, layerUp: 0.9, layerLeft: 0.25,
    };
    const moves = kind === 'spread' ? planDealerSpread(input) : planDealerGather(input);
    /* WRITE */
    for (const move of moves) {
        const item = items[move.index];
        item.style.setProperty('--sx', px(move.x));
        item.style.setProperty('--sy', px(move.y));
        item.style.setProperty('--sd', `${move.delay}ms`);
        item.setAttribute(kind === 'spread' ? 'data-th-spread' : 'data-th-gather', '');
    }
    return moves.length;
}
