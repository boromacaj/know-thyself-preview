/*
 * THE MAIN MENU FITS THE SCREEN.
 *
 * The menu's cards are sized from their WIDTH (the pillars 1 : 3.9, the tiles 7 : 12: menuExperience.ts) so that a reduced browser viewport scrolls instead of squashing them. On a
 * phone whose screen is not tall enough for that composition - the Galaxy A55's WebView is 339 x 734 CSS px under a 28 px status bar and a 48 px navigation bar - the whole menu
 * is about 85 px taller than the screen: the foot of the tiles and their names are clipped and the surface scrolls.
 *
 * WHAT THIS DOES. Only when the menu overflows its screen, it fits it by ONE factor k (1 is the design; never below MIN_FIT):
 *
 *   - THE THREE LOWER CARDS KEEP THEIR PLAYING-CARD PROPORTION, 7 : 12, EXACTLY. They are shrunk as one group toward the centre of the row: each card is k times as wide AND k times as
 *     tall, the gaps between them and the drop of the middle one are k times as large, and the row stays centred under the Synthesis card. (Shortening them instead, by changing
 *     the proportion, looked wrong: they are tarot cards.) Their names stand under them in the same type, which steps down by its own container rule when a card is narrower.
 *   - THE FOUR PILLARS are k times as tall (their widths are the screen's: four columns), and the gaps between the rows are k times as large.
 *
 * The widths of the pillars, the type, the Synthesis card (the centre of the composition) and the pictures' own sizes are untouched. A screen that is tall enough is not touched at
 * all: k stays 1 and nothing is written. It measures instead of guessing (the safe areas, the type scale and the language all change the height), settles in a few passes inside one
 * task (nothing is painted between them), and runs again when the screen's size changes or the menu is drawn again.
 *
 * HOW. By inline styles on the menu's own elements (the pillars' aspect-ratio, the row gap, the tile row's width and column gap, the middle tile's margin): the stylesheet, which
 * is the design and is pinned by the menu's tests, is not touched, and a menu that is drawn again starts from the design.
 */
import { setMenuCardRow } from './ambient/menuLane.js?v=d9a1a90';
export const MENU_FIT_MIN = 0.7;
/** The design's own numbers (menuExperience.ts): the pillar is 1 : 3.9, the rows are 26 px apart, the tiles are 8 px apart and the middle tile drops 22 px. The tile is 7 : 12 and is never changed. */
export const MENU_DESIGN = Object.freeze({ pillar: 3.9, gap: 26, tileGap: 8, drop: 22 });
const TOLERANCE = 0.5;
function clear(menu) {
    menu.style.removeProperty('row-gap');
    menu.style.removeProperty('--kt-fit-k');
    for (const pillar of menu.querySelectorAll('.kt-menu-pillar'))
        pillar.style.removeProperty('aspect-ratio');
    const row = menu.querySelector('.kt-menu-tiles');
    if (row !== null) {
        row.style.removeProperty('width');
        row.style.removeProperty('margin-inline');
        row.style.removeProperty('column-gap');
    }
    for (const tile of menu.querySelectorAll('.kt-menu-tile'))
        tile.style.removeProperty('margin-top');
}
function apply(menu, k) {
    const round = (value) => +value.toFixed(2);
    menu.style.rowGap = `${round(MENU_DESIGN.gap * k)}px`;
    menu.style.setProperty('--kt-fit-k', String(+k.toFixed(4)));
    for (const pillar of menu.querySelectorAll('.kt-menu-pillar'))
        pillar.style.aspectRatio = `1 / ${+(MENU_DESIGN.pillar * k).toFixed(4)}`;
    const row = menu.querySelector('.kt-menu-tiles');
    if (row !== null) {
        /* k times as wide, centred: every card is k times as wide, so (their ratio being fixed) k times as tall */
        row.style.width = `${+(k * 100).toFixed(3)}%`;
        row.style.marginInline = 'auto';
        row.style.columnGap = `${round(MENU_DESIGN.tileGap * k)}px`;
    }
    const tiles = [...menu.querySelectorAll('.kt-menu-tile')];
    if (tiles[1] !== undefined)
        tiles[1].style.marginTop = `${round(MENU_DESIGN.drop * k)}px`;
}
/** The vertical room the menu's compressible parts take now: the pillars, the tile row (cards and the middle one's drop) and the three gaps between the rows. */
function compressible(menu, gap) {
    const pillars = menu.querySelector('.kt-menu-pillars')?.getBoundingClientRect().height ?? 0;
    const tiles = menu.querySelector('.kt-menu-tiles')?.getBoundingClientRect().height ?? 0;
    return pillars + tiles + 3 * gap;
}
/** Fit the menu on `surface` (the scroller) to its height; returns k, the factor applied (1: the design, untouched). */
export function fitMenu(surface) {
    const menu = surface.querySelector('.kt-menu');
    if (menu === null || surface.hidden || surface.inert || surface.clientHeight === 0)
        return 1;
    /* While the cards are coming together (menuAssembly.ts) they are displaced, and a displaced card counts in the scroll height: the fit would squeeze the menu to make room for them. It waits, and runs again when the assembly is over (the attribute changes). */
    if (surface.dataset?.menuAssemble === 'running')
        return Number(menu.style.getPropertyValue('--kt-fit-k')) || 1;
    clear(menu);
    let overflow = surface.scrollHeight - surface.clientHeight;
    if (overflow <= TOLERANCE)
        return 1;
    let k = 1;
    for (let pass = 0; pass < 6 && overflow > TOLERANCE && k > MENU_FIT_MIN; pass += 1) {
        const room = compressible(menu, MENU_DESIGN.gap * k);
        if (!(room > overflow))
            break;
        k = Math.max(MENU_FIT_MIN, k * ((room - overflow - 0.25) / room));
        apply(menu, k);
        overflow = surface.scrollHeight - surface.clientHeight;
    }
    /* A screen too short to fit even at the floor (a small desktop window) gets the design and a scroll, as before: a compression that does not fit buys nothing and costs the look. */
    if (overflow > TOLERANCE) {
        clear(menu);
        return 1;
    }
    return k;
}
/**
 * WHERE THE FOUR TOP CARDS ARE, said to the Sun (ambient/menuLane.ts): the layout top of the row and the cards' height, measured the way the fit just left them. Layout offsets, not
 * bounding boxes, so a card that is moving (the assembly, a press) does not move the number. Null while the menu is not the screen.
 */
export function publishCardRow(surface) {
    if (surface.hidden || surface.inert) {
        setMenuCardRow(null);
        return;
    }
    const first = surface.querySelector('.kt-menu-pillar');
    if (first === null || first.offsetHeight === 0) {
        setMenuCardRow(null);
        return;
    }
    let y = 0;
    let node = first;
    let reached = false;
    while (node !== null) {
        y += node.offsetTop;
        const parent = node.offsetParent;
        if (parent === surface) {
            reached = true;
            break;
        }
        node = parent;
    }
    const top = reached ? surface.getBoundingClientRect().top + y - surface.scrollTop : y - surface.scrollTop;
    setMenuCardRow({ top, height: first.offsetHeight });
}
export function connectMenuFit(surface) {
    let frame = 0;
    const schedule = () => {
        if (frame !== 0)
            return;
        frame = requestAnimationFrame(() => { frame = 0; fitMenu(surface); publishCardRow(surface); });
    };
    const sizes = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    sizes?.observe(surface);
    const mutations = typeof MutationObserver !== 'undefined'
        ? new MutationObserver((records) => { if (records.some((record) => record.type === 'childList' || record.attributeName === 'hidden' || record.attributeName === 'inert' || record.attributeName === 'data-menu-assemble'))
            schedule(); })
        : null;
    mutations?.observe(surface, { childList: true, attributes: true, attributeFilter: ['hidden', 'inert', 'data-menu-assemble'] });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
        if (frame !== 0)
            cancelAnimationFrame(frame);
        sizes?.disconnect();
        mutations?.disconnect();
        window.removeEventListener('resize', schedule);
        setMenuCardRow(null);
    };
}
