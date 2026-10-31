/*
 * THE ONE ONBOARDING CARD TRANSITION
 * ----------------------------------
 * Every major foreground card change in the onboarding uses this and only this:
 *
 *   outgoing card  opacity 1 -> 0   over cardFadeOutMillis
 *   committed paint at opacity 0
 *   state/content swap, entirely invisible
 *   incoming card  opacity 0 -> 1   over cardFadeInMillis
 *   interaction unlocks LAST
 *
 * There is deliberately no crossfade. The outgoing card reaches exactly 0
 * before the incoming one begins, so at the midpoint the user sees only the
 * persistent globe. That is the intended look, and it is possible precisely
 * because the Earth never takes part in these fades.
 *
 * WHY THIS MODULE EXISTS
 * Three different owners had grown, each with its own timing and quality:
 *   - onboardingCardFade      2000 out / 2000 in, glass-aware, claimed routes
 *   - onboardingOverlayRoutes  260 out /  260 in, glass-aware, claimed routes
 *   - profileOverviewFlow     2000 out / NO fade in, not glass-aware, owned the
 *                             OVERVIEW edit routes
 * So confirming a birthplace vanished in 260 ms while other steps took 2 s, and
 * an OVERVIEW edit faded out and then snapped its replacement in at full
 * opacity - the "it just replaced the content" complaint. The durations, the
 * easing, the glass handling and the ordering now live here, once.
 */
import { emitParticleImpulse } from './app/ambient-particles/impulseEvents.js?v=b5ef5ed';
export const cardFadeOutMillis = 2000;
export const cardFadeInMillis = 2000;
/*
 * THE SECOND PACE, AND WHY THERE IS ONE.
 *
 * Two seconds out and two seconds in is the onboarding pace, and it is right
 * there: PLACE, VESSEL, IDENTITY and ARRIVAL are each arrived at once, the globe
 * is the constant, and the slowness is the product.
 *
 * Moving between destinations inside a finished profile is a different act. The
 * reader is not being taken somewhere; they are looking something up, and the
 * six destinations are meant to feel like one surface with six views rather than
 * six places to travel to. At the card pace a glance at BaZi and back cost eight
 * seconds of watching the globe, which is what a tab must never cost.
 *
 * BOTH PACES LIVE HERE, and that is the point of the constant. The invariant was
 * never "one duration" for its own sake - it was that no consumer invents its
 * own. Three owners with three timings is what this module was written to end;
 * one owner with two named paces, chosen by the caller from a closed set, is not
 * that. Everything else is identical: same easing, same ordering, same
 * no-crossfade rule, same glass handling, same cancellation.
 */
export const destinationFadeOutMillis = 240;
export const destinationFadeInMillis = 240;
/* One easing for both directions, forward, back and edit. Smoothstep is the
   ease-in-out shape; it is applied per frame rather than by CSS so the same
   curve governs every card regardless of which stylesheet owns the element. */
export const cardFadeEasing = 'ease-in-out';
const ease = (progress) => progress * progress * (3 - (2 * progress));
export const prefersReducedMotion = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches);
export const cardFadeOutDuration = (pace = 'card') => {
    if (prefersReducedMotion())
        return 0;
    return pace === 'destination' ? destinationFadeOutMillis : cardFadeOutMillis;
};
export const cardFadeInDuration = (pace = 'card') => {
    if (prefersReducedMotion())
        return 0;
    return pace === 'destination' ? destinationFadeInMillis : cardFadeInMillis;
};
/* Two frames, so a style change has been through a committed paint. Changing a
   class and continuing in the same task only queues work - the browser has not
   necessarily painted the intermediate state, which is how one-frame flashes
   appear. */
export const nextPaint = () => new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
});
/*
 * WHOLE-CARD TARGETING
 * --------------------
 * A card fades as ONE visual object: shell, glass, borders, capsules, shadows
 * and content together.
 *
 * The previous strategy descended into each card and faded only the elements
 * that owned a backdrop-filter, deliberately leaving the outer surfaces at
 * opacity 1. It was chosen to avoid an Android glass warm-up flicker, and it
 * produced exactly the defect product review rejected: the text and inputs
 * faded while the table, capsules and buttons stayed on screen, so an incoming
 * card was drawn on top of the outgoing one's shell.
 *
 * Correct card disappearance outranks glass compositing, and still does: see
 * WHERE THE OPACITY IS WRITTEN below, which keeps the whole card fading as one
 * object while letting the glass keep its backdrop for the whole fade.
 */
export const cardTargets = (roots) => [
    ...new Set(roots.filter((root) => root instanceof HTMLElement)),
];
/*
 * WHERE THE OPACITY IS WRITTEN - AND WHY IT IS NOT ALWAYS THE ROOT
 * ---------------------------------------------------------------
 * An element whose opacity is anything other than exactly 1 becomes a BACKDROP
 * ROOT. Every backdrop-filter inside it then samples only what is painted
 * within that element - which, for a card floating over the globe, is nothing.
 *
 * So while a card root carried the tween, its glass had no backdrop to blur and
 * rendered flat for the whole two seconds. On the final frame opacity reached
 * exactly 1, the backdrop root dissolved, and every frosted surface in the card
 * gained its blur in a single frame: the reported late milky pop, and the same
 * event that made the end of the fade look abrupt.
 *
 * A fractional prewarm cannot help, because a fractional opacity IS the
 * condition that suppresses the material.
 *
 * The fix is to keep the root at exactly 1 - not a backdrop root - and let each
 * of its children carry the identical tween. Glass then samples the live globe
 * for the entire fade and there is nothing left to snap.
 *
 * THIS IS NOT THE REJECTED "FADE ONLY THE CONTENT" STRATEGY. That one descended
 * into the card and faded only the elements owning a backdrop-filter, leaving
 * the shell, capsules and buttons at opacity 1 so an incoming card was drawn on
 * top of the outgoing one's chrome. Here EVERY child fades, on the same tween,
 * and the child path is taken only when it is provably indistinguishable from
 * fading the root. layersFor() below refuses it otherwise, and the root keeps
 * the tween exactly as before - correct disappearance still outranks glass.
 */
const transparent = new Set(['transparent', 'rgba(0, 0, 0, 0)']);
/** True if the root itself puts pixels on screen, so it may not be left at 1. */
const paintsOwnMaterial = (root) => {
    const style = window.getComputedStyle(root);
    const value = (property) => style.getPropertyValue(property);
    if (value('background-image') !== 'none')
        return true;
    if (!transparent.has(value('background-color')))
        return true;
    if (value('box-shadow') !== 'none')
        return true;
    if (value('filter') !== 'none')
        return true;
    const backdrop = value('backdrop-filter') || value('-webkit-backdrop-filter');
    if (backdrop && backdrop !== 'none')
        return true;
    if (value('outline-style') !== 'none' && Number.parseFloat(value('outline-width')) > 0)
        return true;
    for (const side of ['top', 'right', 'bottom', 'left']) {
        if (value(`border-${side}-style`) === 'none')
            continue;
        if (Number.parseFloat(value(`border-${side}-width`)) > 0)
            return true;
    }
    // A pseudo-element with content paints as part of the root, not of any child.
    for (const pseudo of ['::before', '::after']) {
        const content = window.getComputedStyle(root, pseudo).getPropertyValue('content');
        if (content && content !== 'none')
            return true;
    }
    // Text sitting directly in the root belongs to the root's own painting.
    for (const node of root.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && (node.textContent ?? '').trim().length > 0)
            return true;
    }
    return false;
};
/** True if this element runs its own backdrop-filter. Such an element is a
 *  BACKDROP LEAF for us: its own blur samples the backdrop root ABOVE it, so it
 *  may safely carry the tween itself. Descending past it would buy nothing. */
const ownsBackdropFilter = (element) => {
    const style = window.getComputedStyle(element);
    const backdrop = style.getPropertyValue('backdrop-filter') || style.getPropertyValue('-webkit-backdrop-filter');
    return backdrop !== '' && backdrop !== 'none';
};
/** True if any descendant runs a backdrop-filter. Dimming such an element makes
 *  it a backdrop root and blinds every one of those descendants for the whole
 *  fade, which is the late milky pop. */
const hasBackdropDescendant = (element) => {
    for (const node of element.querySelectorAll('*')) {
        if (node instanceof HTMLElement && ownsBackdropFilter(node))
            return true;
    }
    return false;
};
/**
 * The children of one element, when fading them is pixel-for-pixel the same as
 * fading that element. Returns null when it is not, and the caller then keeps
 * the element itself as the layer.
 *
 * Each rejection is a case where per-child opacity would composite differently:
 * a non-element child cannot be given an opacity; two rendered children that
 * overlap composite once as a group but would show through each other
 * individually; a child already dimmed by its own CSS would be forced into view
 * by an !important write.
 */
/**
 * Every element this module has ever written an opacity to, marked as it is
 * written.
 *
 * THE BUG THIS EXISTS TO KILL. The tiler picks a depth per fade, and the depth
 * is not stable: it depends on child count, on overlap, and on whether every
 * child computes to opacity 1 at that moment. A fade that tiles the overview
 * card at ROW level writes `opacity: 0 !important` on five rows; if the next
 * fade tiles the same card one level shallower - at list level - it cleans the
 * four direct children it is about to use and never touches the rows. The rows
 * keep an important inline zero that nothing will ever clear again.
 *
 * Observed exactly that way on the deployed build: hub -> "Skontrolovať údaje"
 * showed the heading and an empty card, with the panel and all four of its
 * direct children at opacity 1 and all five rows at `0 !important` plus a
 * leftover will-change. The data was present the whole time; it was painted
 * transparent.
 *
 * So the cleanup can no longer be scoped to the level being tiled. It has to
 * cover everything this module has touched, which is what the marker records.
 */
const FADE_MARK = 'ktCardFade';
/** The attribute form of FADE_MARK, for querySelectorAll. */
const FADE_MARK_ATTR = '[data-kt-card-fade]';
const clearOwnFadeStyles = (element) => {
    if (element.dataset[FADE_MARK] === undefined)
        return;
    element.style.removeProperty('opacity');
    element.style.removeProperty('will-change');
    element.style.removeProperty('transition');
    delete element.dataset[FADE_MARK];
};
/** Every marked element in the subtree, the root included. */
const clearStaleFadeStyles = (root) => {
    clearOwnFadeStyles(root);
    for (const marked of root.querySelectorAll(FADE_MARK_ATTR)) {
        clearOwnFadeStyles(marked);
    }
};
const splitIntoChildren = (element) => {
    const children = [...element.children];
    if (children.length === 0)
        return null;
    if (!children.every((child) => child instanceof HTMLElement))
        return null;
    const layers = children;
    /* The opacity written by the PREVIOUS fade, and by deactivateCard, is still on
       these elements. Left in place it is read below as "the stylesheet dims this
       child" and every fade after the first would quietly fall back to the parent,
       bringing the glass pop back with it. Ours is removed first; the caller
       re-applies an opacity in this same task, so nothing is painted in between. */
    for (const layer of layers) {
        layer.style.removeProperty('opacity');
        layer.style.removeProperty('will-change');
        layer.style.removeProperty('transition');
    }
    const boxes = [];
    for (const layer of layers) {
        if (window.getComputedStyle(layer).opacity !== '1')
            return null;
        const box = layer.getBoundingClientRect();
        if (box.width <= 0 || box.height <= 0)
            continue;
        for (const other of boxes) {
            const overlapX = Math.min(box.right, other.right) - Math.max(box.left, other.left);
            const overlapY = Math.min(box.bottom, other.bottom) - Math.max(box.top, other.top);
            if (overlapX > 0.5 && overlapY > 0.5)
                return null;
        }
        boxes.push(box);
    }
    return layers;
};
/** A card is a handful of nested wrappers, not a deep tree. This only stops a
 *  pathological DOM from spinning the descent, and is never reached in practice. */
const MAX_DESCENT_STEPS = 4000;
/**
 * The elements that carry the tween for one card.
 *
 * Splitting the root into its children is not enough on its own. A card is
 * wrappers inside wrappers, and the glass usually sits two or three levels
 * down: #profile-identity-form > .profile-fields > .profile-field, and
 * #pillar-view > article.kt-pillar-view > section > .kt-pillar-card. Handing
 * the tween to the first level of children just moves the backdrop root from
 * the root onto .profile-fields or onto the article - still an ancestor of
 * every frosted surface, so the blur stays blind for the whole fade and snaps
 * on at the final frame exactly as before.
 *
 * So the split CONTINUES DOWNWARD while a candidate layer still has a
 * backdrop-filter descendant, and stops as soon as it is safe to dim:
 *
 *   - the layer runs its own backdrop-filter: it is a backdrop LEAF. Its blur
 *     samples the root above it, which is pinned at 1, so it can be dimmed
 *     freely and still frost the live Earth all the way down.
 *   - the layer has no frosted descendant at all: dimming it blinds nothing,
 *     so the subtree is kept whole rather than exploded into more layers.
 *   - the layer cannot be split (see splitIntoChildren): it keeps the tween,
 *     and correct disappearance still outranks glass.
 *
 * THIS IS NOT THE REJECTED "FADE ONLY THE CONTENT" STRATEGY. That one descended
 * to the elements owning a backdrop-filter and faded ONLY those, leaving the
 * shell, capsules and buttons at opacity 1 so an incoming card was drawn over
 * the outgoing one's chrome. Here the layers still TILE the card: at every
 * level all children are taken, never a chosen few, so their union is exactly
 * what the root would have painted.
 */
const layersFor = (root) => {
    if (paintsOwnMaterial(root))
        return [root];
    root.style.removeProperty('opacity');
    root.style.removeProperty('will-change');
    root.style.removeProperty('transition');
    const firstLevel = splitIntoChildren(root);
    if (!firstLevel)
        return [root];
    const layers = [];
    const pending = [...firstLevel];
    let steps = 0;
    while (pending.length > 0 && steps < MAX_DESCENT_STEPS) {
        steps += 1;
        const candidate = pending.shift();
        if (ownsBackdropFilter(candidate) || !hasBackdropDescendant(candidate)) {
            layers.push(candidate);
            continue;
        }
        const deeper = splitIntoChildren(candidate);
        if (!deeper) {
            layers.push(candidate);
            continue;
        }
        pending.unshift(...deeper);
    }
    layers.push(...pending);
    return layers;
};
/* Resolved ONCE per fade, never per frame: the guard reads computed style and
   geometry, which must not run on every one of ~120 tween frames. */
export const cardFadeGroups = (targets) => (targets.map((root) => {
    /*
     * Clear anything a PREVIOUS fade left behind anywhere in this card, before
     * the depth for this one is chosen. layersFor reads computed opacity to
     * decide whether it can tile a level, so a stale zero left deeper down also
     * skews that decision - clearing first makes the choice honest as well as
     * making the leftover impossible.
     */
    clearStaleFadeStyles(root);
    const layers = layersFor(root);
    /* Resolved here, with the rest of the once-per-fade style reading, so the
       tween never has to ask a layer what is underneath it. */
    const keepUnpromoted = new Set(layers.filter((layer) => !ownsBackdropFilter(layer) && hasBackdropDescendant(layer)));
    return { root, layers, keepUnpromoted };
}));
export const applyCardOpacity = (groups, value) => {
    const opacity = value.toFixed(4);
    for (const { root, layers, keepUnpromoted } of groups) {
        for (const layer of layers) {
            // The tween is driven frame by frame, so any CSS transition on the same
            // property would fight it and lag behind by its own duration.
            layer.style.setProperty('transition', 'none', 'important');
            layer.style.setProperty('opacity', opacity, 'important');
            /* Marked so a later fade at a different depth can find and clear it. */
            layer.dataset[FADE_MARK] = '';
            if (keepUnpromoted.has(layer)) {
                layer.style.removeProperty('will-change');
            }
            else {
                layer.style.setProperty('will-change', 'opacity', 'important');
            }
        }
        if (layers.length === 1 && layers[0] === root)
            continue;
        /* Pinned at exactly 1: enough to suppress the root's own CSS opacity
           transition and any leftover deactivation, without making it a backdrop
           root. will-change is REMOVED rather than set, because will-change:opacity
           creates a backdrop root even while opacity is 1. */
        root.style.setProperty('transition', 'none', 'important');
        root.style.setProperty('opacity', '1', 'important');
        root.style.removeProperty('will-change');
    }
};
export const setCardOpacity = (targets, value) => {
    applyCardOpacity(cardFadeGroups(targets), value);
};
export const clearCardFade = (groups) => {
    for (const { root, layers } of groups) {
        for (const element of [root, ...layers]) {
            element.style.removeProperty('opacity');
            element.style.removeProperty('will-change');
            element.style.removeProperty('transition');
        }
    }
};
export const clearCardOpacity = (targets) => {
    clearCardFade(cardFadeGroups(targets));
};
/* Held a hair above zero for two frames so the compositor has promoted every
   fading layer before the visible tween starts. The glass no longer depends on
   this: with the root at 1 the material is already resolved. */
export const prewarmOpacity = 0.008;
/* One transition owns the foreground at a time. Every awaited step re-checks
   its token, so a superseded sequence cannot keep mutating a newer state and a
   stale timer or rAF callback resolving late is simply ignored. */
let sequenceToken = 0;
let running = false;
export const cardTransitionActive = () => running;
const tween = (groups, from, to, durationMillis, token) => new Promise((resolve) => {
    if (groups.length === 0) {
        resolve();
        return;
    }
    if (durationMillis <= 0) {
        applyCardOpacity(groups, to);
        resolve();
        return;
    }
    const startedAt = performance.now();
    applyCardOpacity(groups, from);
    /* Bounded fallback. transitionend is deliberately not used - it does not fire
       for a rAF-driven tween, and relying on it elsewhere is how a lost event
       leaves the interface permanently inert. This resolves on its own frames,
       and the guard below still resolves if the page is backgrounded mid-tween
       and rAF stops being serviced. */
    const bail = window.setTimeout(() => {
        applyCardOpacity(groups, to);
        resolve();
    }, durationMillis + 400);
    const step = (now) => {
        if (token !== sequenceToken) {
            window.clearTimeout(bail);
            resolve();
            return;
        }
        const progress = Math.min(1, Math.max(0, (now - startedAt) / durationMillis));
        applyCardOpacity(groups, from + ((to - from) * ease(progress)));
        if (progress < 1) {
            window.requestAnimationFrame(step);
            return;
        }
        window.clearTimeout(bail);
        resolve();
    };
    window.requestAnimationFrame(step);
});
/*
 * SINGLE-VISIBLE-CARD INVARIANT
 * ----------------------------
 * Sequencing alone is not enough to guarantee that only one card is on screen.
 * A card is made visible by several modules - stage classes, the intro reveal,
 * the overview editors, back navigation - and any one of them resolving a root
 * back to opacity 1 puts two cards on screen at once. That is exactly the
 * reported defect: the retired PLACE dock, complete with its search capsule,
 * BIRTHPLACE label and birthplace card, sitting underneath the IDENTITY form.
 *
 * So the rule is enforced rather than assumed: after every transition, and on
 * every onboarding state change, every registered root that is NOT the active
 * card is forced invisible and non-interactive. It is cheap, it is idempotent,
 * and it holds even if some other module tries to show a card behind the
 * current one.
 */
let registeredRoots = () => [];
export const registerCardRoots = (provider) => {
    registeredRoots = provider;
};
export const deactivateCard = (root) => {
    root.style.setProperty('opacity', '0', 'important');
    root.style.setProperty('pointer-events', 'none', 'important');
    /*
     * AND OUT OF THE TAB ORDER AND THE ACCESSIBILITY TREE.
     *
     * opacity 0 plus pointer-events none retires a card from the paint and from
     * TOUCH, and from nothing else. Measured on the OVERVIEW at 375x812: eight
     * tab stops and nine named accessibility nodes belonging to the two panels
     * that step is not showing - both name fields, Next, the date and time rows,
     * Back, Review details - all reachable by keyboard and read out by name.
     *
     * `inert` rides with pointer-events rather than being managed separately, and
     * that is the whole safety argument: it is written on exactly the roots that
     * already carry pointer-events: none, in the same call, and cleared in the
     * same place as pointer-events is cleared (see the incoming release in
     * runCardTransition). A path that showed a card without going through that
     * release would already be broken for touch today, so inert cannot get out of
     * step with a flag the card system has owned since it was written.
     *
     * Deliberately NOT on the individual controls inside a card: inert covers a
     * subtree but clearing an ancestor's does not clear one written on a
     * descendant, and profileOverviewFlow reopens its editors by clearing the
     * flag on `.profile-flow` alone. Writing it per control is how a form ends up
     * permanently unreachable.
     */
    root.inert = true;
};
/**
 * The exact counterpart, for the card that is becoming live.
 *
 * A named function rather than two statements inside runCardTransition's
 * incoming loop, because a test asserts the two tweens stay within 2000
 * characters of each other in the built output - the guarantee that the fades
 * are sequential and not a crossfade - and prose in that window is what breaks
 * it. The explanation belongs beside deactivateCard anyway, which is where the
 * flags are set.
 */
export const activateCard = (root) => {
    root.style.removeProperty('pointer-events');
    root.inert = false;
    /* The root at 0 hides the card whatever its children say, but a retired card
       must not go on holding a compositor layer per child. No style is measured
       here - removing a property the child never had is a no-op. */
    for (const child of root.children) {
        if (child instanceof HTMLElement)
            child.style.removeProperty('will-change');
    }
};
export const enforceSingleVisibleCard = (active) => {
    for (const root of registeredRoots()) {
        if (active.includes(root))
            continue;
        deactivateCard(root);
    }
};
/**
 * The single entry point for a major onboarding card change.
 * Returns false if the sequence was superseded by a newer one.
 */
export async function runCardTransition(transition) {
    const token = ++sequenceToken;
    running = true;
    try {
        // Interaction dies before anything moves, so a second tap cannot start a
        // competing sequence and a focused field cannot hold the keyboard open.
        transition.lock?.();
        if (transition.impulse !== 'none')
            emitParticleImpulse(transition.impulse ?? 'nav');
        const pace = transition.pace ?? 'card';
        const outgoing = transition.outgoing();
        await tween(cardFadeGroups(outgoing), 1, 0, cardFadeOutDuration(pace), token);
        if (token !== sequenceToken)
            return false;
        /* The outgoing card is at EXACTLY 0 and has been painted there before
           anything is hidden, removed, rebuilt or swapped. Doing any of that while
           opacity is still above 0 is what produces an abrupt disappearance. */
        await nextPaint();
        if (token !== sequenceToken)
            return false;
        await transition.swap?.();
        if (token !== sequenceToken)
            return false;
        if (transition.isReady) {
            const startedAt = performance.now();
            const timeout = transition.readinessTimeoutMillis ?? 4_000;
            while (!transition.isReady() && performance.now() - startedAt < timeout) {
                await new Promise((resolve) => { window.setTimeout(resolve, 40); });
                if (token !== sequenceToken)
                    return false;
            }
        }
        /* The incoming card is prewarmed AS A WHOLE: held a hair above zero for two
           committed frames so Android builds every backdrop-filter, border, shadow
           and gloss in the card before the fade starts. A card faded from exactly 0
           is never painted, so its material would resolve at the frame it reaches
           opacity 1. Any pointer-events left over from a previous fade-out is also
           released here, since this card is now the live one. */
        const incoming = transition.incoming();
        for (const target of incoming)
            activateCard(target);
        /* Resolved once, then reused for the prewarm and every tween frame, so the
           guard's style and geometry reads never run inside the animation. */
        const incomingGroups = cardFadeGroups(incoming);
        applyCardOpacity(incomingGroups, prewarmOpacity);
        await nextPaint();
        if (token !== sequenceToken)
            return false;
        await tween(incomingGroups, prewarmOpacity, 1, cardFadeInDuration(pace), token);
        if (token !== sequenceToken)
            return false;
        /* The outgoing card is deliberately LEFT at opacity 0 and non-interactive.
           Clearing it would hand it back to CSS, and a stage rule can easily resolve
           to opacity 1 again - which is precisely how the retired PLACE dock stayed
           on screen underneath the next card. The card transition is the single
           visibility owner, so a card it faded out stays out until it is faded
           back in, where the prewarm sets its opacity anyway. */
        for (const target of outgoing) {
            if (incoming.includes(target))
                continue;
            deactivateCard(target);
        }
        /* Not just the card we faded: EVERY other registered root. A card the
           transition never touched can still have been shown by another module. */
        enforceSingleVisibleCard(incoming);
        clearCardFade(incomingGroups);
        // Interaction unlock is always the last thing that happens.
        transition.unlock?.();
        return true;
    }
    finally {
        if (token === sequenceToken)
            running = false;
    }
}
