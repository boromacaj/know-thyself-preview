/*
 * ENVIRONMENT TRANSITION CONTROLLER
 * --------------------------------
 * One authoritative owner for every major visual environment handoff.
 *
 * THE RULE: environments are never crossfaded into each other. The outgoing one
 * disappears completely, the screen commits a genuinely black frame, the
 * incoming one is confirmed ready, and only then is it revealed. The same
 * guarantee applies in reverse, so no transition may rely on two environments
 * happening to look similar.
 *
 *   idle -> outgoing-ui -> outgoing-environment -> black -> preparing-incoming
 *        -> incoming-environment -> incoming-ui -> idle
 *
 * Visual exposure is what is being serialised, NOT background work: the incoming
 * environment is expected to preload underneath the opaque cover, so the black
 * boundary is usually a couple of frames rather than a wait.
 */
export const environmentFadeMillis = 320;
export const uiFadeMillis = 260;
const readinessPollMillis = 60;
const defaultReadinessTimeoutMillis = 12_000;
/* Paint ordering is guaranteed explicitly. Changing a class and continuing in
   the same task only queues work - the browser has not necessarily painted the
   intermediate state, which is how one-frame flashes appear. Two frames means
   the style change has been through a committed paint. */
export const nextPaint = () => new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
});
const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
let cover = null;
let phase = 'idle';
/* Only one transition may own the screen. Every awaited step re-checks its
   token, so a superseded sequence cannot keep mutating a newer state, and a
   stale timer or rAF callback resolving late is simply ignored. */
let sequenceToken = 0;
let running = false;
const host = () => document.getElementById('place-experience');
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ensureCover = () => {
    if (cover?.isConnected)
        return cover;
    const parent = host();
    if (!parent)
        return null;
    const element = document.createElement('div');
    element.className = 'kt-transition-cover';
    element.setAttribute('aria-hidden', 'true');
    parent.append(element);
    cover = element;
    return element;
};
const setPhase = (next) => {
    phase = next;
    const parent = host();
    if (parent)
        parent.dataset.ktTransition = next;
};
export const transitionPhase = () => phase;
export const transitionActive = () => running;
const showCover = async () => {
    const element = ensureCover();
    if (!element)
        return;
    element.classList.add('is-armed');
    await nextPaint();
    element.classList.add('is-opaque');
    await wait(reducedMotion() ? 0 : environmentFadeMillis);
    // A committed frame at full black, so the boundary genuinely exists.
    await nextPaint();
};
const hideCover = async () => {
    const element = ensureCover();
    if (!element)
        return;
    element.classList.remove('is-opaque');
    await wait(reducedMotion() ? 0 : environmentFadeMillis);
    element.classList.remove('is-armed');
    await nextPaint();
};
const awaitReadiness = async (isReady, timeoutMillis, token) => {
    if (!isReady)
        return true;
    const startedAt = performance.now();
    while (token === sequenceToken) {
        if (isReady())
            return true;
        // Never reveal a loading scene just to satisfy a fixed duration: stay black.
        if (performance.now() - startedAt >= timeoutMillis)
            return false;
        await wait(readinessPollMillis);
    }
    return false;
};
/**
 * Runs one environment handoff. Identical in both directions - reverse
 * navigation is the same call with the roles swapped, which is what stops the
 * back path from being an afterthought.
 */
export async function runEnvironmentTransition(transition) {
    const token = ++sequenceToken;
    running = true;
    const parent = host();
    // Interaction is disabled for the whole transition, and the cover itself
    // swallows input so nothing underneath can be tapped through the black.
    parent?.classList.add('kt-transition-active');
    try {
        setPhase('outgoing-ui');
        await transition.fadeOutUi?.();
        if (token !== sequenceToken)
            return false;
        setPhase('outgoing-environment');
        await showCover();
        if (token !== sequenceToken)
            return false;
        setPhase('black');
        setPhase('preparing-incoming');
        await transition.prepare?.();
        if (token !== sequenceToken)
            return false;
        const ready = await awaitReadiness(transition.isReady, transition.readinessTimeoutMillis ?? defaultReadinessTimeoutMillis, token);
        if (token !== sequenceToken)
            return false;
        // On a readiness timeout the flow still continues rather than stranding the
        // app on black; the caller's prepare step is responsible for leaving a safe
        // functional state behind the cover.
        if (!ready && parent)
            parent.dataset.ktTransitionRecovered = 'readiness-timeout';
        setPhase('incoming-environment');
        await transition.revealEnvironment?.();
        if (token !== sequenceToken)
            return false;
        await hideCover();
        if (token !== sequenceToken)
            return false;
        setPhase('incoming-ui');
        await transition.revealUi?.();
        if (token !== sequenceToken)
            return false;
        return true;
    }
    finally {
        if (token === sequenceToken) {
            running = false;
            setPhase('idle');
            parent?.classList.remove('kt-transition-active');
        }
    }
}
/**
 * Runs one overlay handoff. Shares sequenceToken and `running` with
 * runEnvironmentTransition, so only one transition of either kind can own the
 * screen and a superseded sequence still cannot mutate a newer state.
 */
export async function runOverlayTransition(transition) {
    const token = ++sequenceToken;
    running = true;
    const parent = host();
    // Interaction is suspended for the handoff, but nothing is covered: the
    // cover is deliberately never armed on this path.
    parent?.classList.add('kt-transition-active', 'kt-overlay-transition');
    try {
        setPhase('overlay-out');
        await transition.fadeOutUi?.();
        if (token !== sequenceToken)
            return false;
        setPhase('overlay-swap');
        await transition.swap?.();
        if (token !== sequenceToken)
            return false;
        const ready = await awaitReadiness(transition.isReady, transition.readinessTimeoutMillis ?? defaultReadinessTimeoutMillis, token);
        if (token !== sequenceToken)
            return false;
        if (!ready && parent)
            parent.dataset.ktTransitionRecovered = 'readiness-timeout';
        setPhase('overlay-in');
        await transition.revealUi?.();
        if (token !== sequenceToken)
            return false;
        return true;
    }
    finally {
        if (token === sequenceToken) {
            running = false;
            setPhase('idle');
            parent?.classList.remove('kt-transition-active', 'kt-overlay-transition');
        }
    }
}
/* The cover is installed once, by the first import. */
const style = document.createElement('style');
style.dataset.onboardingTransitions = 'true';
style.textContent = `
  .kt-transition-cover {
    position: absolute;
    inset: 0;
    z-index: 9500;
    display: none;
    opacity: 0;
    /* Pure black, no gradient, no blur, no texture: it is a separator. */
    background: #000;
    transition: opacity ${environmentFadeMillis}ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .kt-transition-cover.is-armed {
    display: block;
    pointer-events: auto;
  }

  .kt-transition-cover.is-opaque { opacity: 1; }

  /* An overlay handoff never arms the cover. This makes that structural rather
     than merely a matter of not calling showCover(): during a card change the
     screen cannot darken even if some other path tried to arm it. */
  #place-experience.kt-overlay-transition .kt-transition-cover {
    display: none !important;
    opacity: 0 !important;
  }

  /* Nothing underneath may be interacted with while the screen is handing off. */
  #place-experience.kt-transition-active .interaction-dock,
  #place-experience.kt-transition-active .vessel-stage,
  #place-experience.kt-transition-active .earth-map {
    pointer-events: none !important;
  }

  /* Input is suspended during a handoff; visibility is not. The globe keeps
     painting throughout, including its idle rotation. */
  #place-experience.kt-transition-active .earth-map {
    opacity: 1 !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .kt-transition-cover { transition-duration: 1ms; }
  }
`;
document.head.append(style);
ensureCover();
