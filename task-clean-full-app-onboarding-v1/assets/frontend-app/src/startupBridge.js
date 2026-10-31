/*
 * THE MODULES' DOOR TO THE STARTUP BOUNDARY.
 *
 * The boundary is an inline classic script in premium-earth-phase-a.html (window.__ktStartup). It exists precisely because a module
 * graph that fails to load cannot report on itself, so it must not depend on one. This file is the typed way for the modules that DO
 * load to talk to it. Every call is a no-op on a page that has no boundary (the legacy page, a test harness).
 *
 * No imports: this file is in the dependency graph of the very entries it reports on, so it must not add a way for them to fail.
 */
const boundary = () => {
    const found = window.__ktStartup;
    return found && typeof found.alive === 'function' && typeof found.fail === 'function' ? found : null;
};
/** An entry module calls this as its last statement: reaching it proves its whole graph loaded and evaluated. */
export function markEntryAlive(name) {
    try {
        boundary()?.alive(name);
    }
    catch { /* the boundary must never be able to break the app */ }
}
/** Returns true when the boundary is about to reload the page, so the caller must not carry on as if it were degraded. */
export function reportStartupFailure(failure) {
    try {
        return boundary()?.fail(failure) === true;
    }
    catch {
        return false;
    }
}
/** The module URL a browser names in a failed-import error (Chromium and Firefox do; WebKit does not). */
export function urlFromImportError(error) {
    const text = error instanceof Error ? error.message : String(error ?? '');
    return /https?:\/\/[^\s)"']+/.exec(text)?.[0] ?? null;
}
/**
 * Resolves when the opening tunnel has played out (the page's own inline script resolves its readiness promise at the handoff, or when its
 * readiness net fires), so a screen can be handed back without cutting the tunnel in half. Bounded: it never waits more than seven seconds.
 */
export function afterTunnel() {
    const ready = window.__knowThyselfWarpReadyPromise;
    const bound = new Promise((resolve) => window.setTimeout(resolve, 7_000));
    return ready ? Promise.race([ready, bound]) : Promise.resolve();
}
/** Lets the tunnel overlay fade out through its own release class, then removes it. A no-op when it is already gone. */
export function releaseTunnel() {
    const overlay = document.getElementById('spacetime-intro');
    if (!overlay)
        return;
    overlay.classList.add('is-releasing');
    window.setTimeout(() => overlay.remove(), 2_300);
}
export function describeError(error) {
    return error instanceof Error ? `${error.name}: ${error.message}` : String(error ?? 'unknown');
}
