/*
 * THE SETTINGS NAVIGATION: ONE STACK, ONE BACK.
 *
 * Settings is a short hierarchy: the sheet over the screen it was opened from, and any detail screen a later Settings feature puts over the sheet. Every level used to carry its own way out
 * (a Back bar on the sheet, a floating text button under a page, a Back icon and a second text button in an editor), each one knowing where to go, and they did not agree. Today the sheet is
 * the only level - Colors lives directly in it - and this stays the one place a future detail screen registers itself.
 *
 * This is the single source of truth they all ask instead. A LEVEL is a surface that can be shown and hidden; the stack is the path from the root to the level on top; `back()` takes
 * exactly one step: the top level goes away and the level under it is shown again (or, at the root, there is nothing under it and Settings is simply closed). No level stores where it
 * came from, none names a destination, and nothing here touches the browser's history or the address.
 *
 *   push(level)    a child opens: the level it covers is covered (`cover`, else `hide`), the child is shown
 *   adopt(level)   a level that has just appeared by itself (the sheet opened by its own control) is entered into the path, without being shown again
 *   back()         ONE step: the top level is hidden and the one under it is shown
 *   drop(id)       a level went away by itself (an outside tap, the reading underneath left): it and everything above it leave the path; nothing is shown unless asked to
 *   dropAbove(id)  everything above a level leaves the path (its child closed by itself)
 *
 * Pure and DOM-free, so every path is testable without a browser. Every operation is idempotent: entering a level already on top, or dropping one that is not there, does nothing, so
 * the surfaces can report what happened to them without caring who started it.
 */
export function createSettingsNavigation() {
    const stack = [];
    const listeners = new Set();
    const notify = () => { for (const listener of [...listeners])
        listener(); };
    const indexOf = (id) => stack.findIndex((level) => level.id === id);
    return {
        push(level) {
            if (stack.at(-1)?.id === level.id || indexOf(level.id) >= 0)
                return;
            const covered = stack.at(-1);
            if (covered)
                (covered.cover ?? covered.hide).call(covered);
            stack.push(level);
            notify();
            level.show();
            notify();
        },
        adopt(level) {
            if (stack.at(-1)?.id === level.id)
                return;
            const at = indexOf(level.id);
            if (at >= 0)
                stack.splice(at + 1);
            else
                stack.push(level);
            notify();
        },
        back() {
            const leaving = stack.pop();
            if (!leaving)
                return false;
            leaving.hide();
            notify();
            stack.at(-1)?.show();
            notify();
            return true;
        },
        drop(id, revealParent = false) {
            const at = indexOf(id);
            if (at < 0)
                return;
            stack.splice(at);
            notify();
            if (revealParent)
                stack.at(-1)?.show();
        },
        dropAbove(id) {
            const at = indexOf(id);
            if (at < 0 || at === stack.length - 1)
                return;
            stack.splice(at + 1);
            notify();
        },
        top: () => stack.at(-1) ?? null,
        depth: () => stack.length,
        ids: () => stack.map((level) => level.id),
        subscribe(listener) {
            listeners.add(listener);
            return () => { listeners.delete(listener); };
        },
    };
}
/** The one navigation of the running application. */
export const settingsNavigation = createSettingsNavigation();
