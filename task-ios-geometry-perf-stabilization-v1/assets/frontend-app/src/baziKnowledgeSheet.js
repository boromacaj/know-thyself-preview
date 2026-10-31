import { activeLocale } from './app/i18n/locale.js?v=d9f39e7';
import { t, tf } from './app/i18n/uiStrings.js?v=d9f39e7';
import { glyphFor, kindLabel, knowledgeEntry, knowledgeLibrary, factsFor, isKnownTopic, libraryItem, toneFor, } from './app/knowledge/bazi/interactive/registry.js?v=d9f39e7';
import { decodePersonalContext, personalSections } from './app/knowledge/bazi/interactive/personal.js?v=d9f39e7';
import { monthRimRgb } from './app/components/baziChartVisuals.js?v=d9f39e7';
/*
 * THE BAZI KNOWLEDGE SHEET
 * ------------------------
 * One panel for every symbol on the BaZi hero and its two charts. A circle, an orb, a petal, the medallion, a cycle or a legend capsule carries
 * `data-bazi-topic` (a registry id); a tap opens this sheet on that topic. Inside the sheet every "explore more" capsule and every library tile carries
 * the same attribute, so following a link is the same gesture as opening one, and a back stack remembers the way.
 *
 *   UNIVERSAL AND PERSONAL, KEPT APART. The explanation comes from the registry (what the symbol means to anyone). Under its own heading, "In your chart",
 *   the engine's calculated values for THIS profile (read back from `data-bazi-personal` on the nearest chart or the hero) are composed beside it.
 *   Browsing another animal or Day Master changes only what the sheet shows: it never touches the profile, and says so.
 *
 *   NOTHING MOVES UNDER THE READER. The sheet is mounted on the document body (like the encyclopedia sheet), the page is made inert behind it while it
 *   is open, the pillar view is never given an overflow, a transform or a new scroll position, and its scroll offset is put back on close if anything
 *   moved it. Focus returns to the symbol that was tapped, without scrolling. The orbit keeps turning behind the backdrop (no animation is paused or
 *   restarted), and the hero's circles take no taps while the sheet is open.
 *
 *   ACCESSIBLE. A modal dialog labelled by its title; Escape and the backdrop close it; Tab stays inside; a Back button appears once there is somewhere to go
 *   back to; the buttons that open it are real buttons or role="button" with Enter and Space. The motion is a short rise and is removed under reduced motion.
 *
 *   ENGLISH FIRST. The explanations are written in English. In another language the sheet says so once at the top and shows them anyway.
 */
const SHEET_ID = 'kt-bz-sheet';
/* the font stack for the Chinese characters (a plain constant, interpolated into the sheet's CSS) */
const CJK_FONTS = "'Noto Serif CJK TC', 'Noto Serif TC', 'Songti TC', 'PMingLiU', 'Noto Serif CJK SC', 'Noto Sans CJK TC', 'Microsoft JhengHei', serif";
const BACKDROP_CLASS = 'kt-bz-backdrop';
const TONES = Object.freeze({
    Wood: '123, 255, 143', Fire: '255, 130, 112', Earth: '255, 215, 106', Metal: '234, 243, 251', Water: '111, 180, 255',
    gold: '238, 214, 150', coral: '255, 122, 112', pearl: '214, 226, 248',
});
/* The colour a topic's panel wears. A month (an Earthly Branch) wears the colour of its own petal on the wheel (monthRimRgb), so the sheet a petal opens
   matches the petal that was tapped; everything else wears its element's tone. */
const rimFor = (topic) => {
    const [kind, key = ''] = topic.split(':');
    return (kind === 'branch' ? monthRimRgb(key) : null) ?? TONES[toneFor(topic)] ?? TONES.pearl;
};
const style = document.createElement('style');
style.dataset.baziKnowledgeSheet = 'true';
style.textContent = `
  .${BACKDROP_CLASS} { position: fixed; inset: 0; z-index: 2000; background: rgba(3, 6, 14, 0.6); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); touch-action: none; animation: kt-bz-fade 180ms ease both; }
  #${SHEET_ID} {
    --bz-rim: 214, 226, 248;
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 2001; box-sizing: border-box;
    width: min(100%, 640px); margin-inline: auto; max-height: min(84dvh, 760px);
    display: flex; flex-direction: column; padding: 10px 20px calc(env(safe-area-inset-bottom, 0px) + 20px);
    border-radius: 28px 28px 0 0; border: 1px solid rgba(var(--bz-rim), 0.3); border-bottom: 0;
    background:
      radial-gradient(120% 70% at 20% 0%, rgba(var(--bz-rim), 0.1), rgba(var(--bz-rim), 0) 60%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.015) 40%, rgba(0, 0, 0, 0.1)),
      rgba(9, 13, 26, 0.9);
    box-shadow: 0 -24px 64px rgba(0, 0, 0, 0.55), 0 0 40px rgba(var(--bz-rim), 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px) saturate(1.15); -webkit-backdrop-filter: blur(24px) saturate(1.15);
    color: rgba(228, 232, 244, 0.92); font-family: inherit;
    animation: kt-bz-rise 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  #${SHEET_ID} .kt-bz-grip { width: 38px; height: 4px; margin: 0 auto 12px; border-radius: 999px; background: rgba(255, 255, 255, 0.2); flex: 0 0 auto; }
  #${SHEET_ID} .kt-bz-head { display: flex; align-items: flex-start; gap: 10px; flex: 0 0 auto; margin-bottom: 8px; }
  #${SHEET_ID} .kt-bz-titles { flex: 1 1 auto; min-width: 0; }
  #${SHEET_ID} .kt-bz-eyebrow { margin: 0 0 3px; font-size: 10px; letter-spacing: 0.17em; text-transform: uppercase; color: rgba(var(--bz-rim), 0.92); }
  #${SHEET_ID} .kt-bz-title { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 25px; line-height: 1.15; font-weight: 400; color: rgba(252, 251, 247, 0.99); outline: none; text-shadow: 0 0 18px rgba(var(--bz-rim), 0.35); }
  #${SHEET_ID} .kt-bz-glyph { margin-right: 10px; font-size: 26px; color: rgba(var(--bz-rim), 0.95); font-family: ${CJK_FONTS}; }
  #${SHEET_ID} .kt-bz-sub { margin: 5px 0 0; font-size: 12.5px; line-height: 1.4; color: rgba(210, 216, 232, 0.78); }
  #${SHEET_ID} .kt-bz-iconbutton {
    flex: 0 0 auto; width: 44px; height: 44px; margin: -6px -6px 0 0; display: grid; place-items: center; box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 999px; background: rgba(255, 255, 255, 0.05); color: rgba(240, 242, 250, 0.94);
    font-size: 20px; line-height: 1; cursor: pointer; -webkit-tap-highlight-color: transparent;
  }
  #${SHEET_ID} .kt-bz-back { margin: -6px 0 0 -6px; }
  #${SHEET_ID} .kt-bz-iconbutton:focus-visible, #${SHEET_ID} .kt-bz-chip:focus-visible, #${SHEET_ID} .kt-bz-tile:focus-visible { outline: 2px solid rgba(255, 225, 154, 0.9); outline-offset: 2px; }
  #${SHEET_ID} .kt-bz-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; padding-right: 2px; outline: none; animation: kt-bz-swap 180ms ease both; }
  #${SHEET_ID} .kt-bz-note { margin: 0 0 10px; font-size: 11.5px; line-height: 1.5; font-style: italic; color: rgba(200, 206, 224, 0.64); }
  #${SHEET_ID} .kt-bz-facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px 14px; margin: 4px 0 14px; padding: 11px 13px; border: 1px solid rgba(var(--bz-rim), 0.18); border-radius: 16px; background: rgba(255, 255, 255, 0.035); }
  #${SHEET_ID} .kt-bz-facts div { min-width: 0; }
  #${SHEET_ID} .kt-bz-facts dt { margin: 0 0 2px; font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(var(--bz-rim), 0.8); }
  #${SHEET_ID} .kt-bz-facts dd { margin: 0; font-size: 13px; line-height: 1.35; color: rgba(236, 240, 250, 0.95); overflow-wrap: anywhere; }
  #${SHEET_ID} .kt-bz-lead { margin: 0 0 14px; font-size: 15px; line-height: 1.62; color: rgba(244, 246, 252, 0.97); }
  #${SHEET_ID} h3 { margin: 18px 0 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(var(--bz-rim), 0.95); }
  #${SHEET_ID} .kt-bz-body p { margin: 0 0 11px; font-size: 14px; line-height: 1.62; color: rgba(226, 230, 242, 0.9); }
  #${SHEET_ID} .kt-bz-body p.kt-bz-lead { font-size: 15px; color: rgba(244, 246, 252, 0.97); }
  #${SHEET_ID} .kt-bz-personal { margin: 6px 0 4px; padding: 4px 14px 6px; border: 1px solid rgba(var(--bz-rim), 0.34); border-left: 3px solid rgba(var(--bz-rim), 0.85); border-radius: 0 16px 16px 0; background: linear-gradient(90deg, rgba(var(--bz-rim), 0.11), rgba(var(--bz-rim), 0.03)); }
  #${SHEET_ID} .kt-bz-personal h3 { margin-top: 12px; }
  #${SHEET_ID} .kt-bz-boundary { margin: 16px 0 0; padding: 11px 13px; border-left: 2px solid rgba(var(--bz-rim), 0.5); border-radius: 0 12px 12px 0; background: rgba(255, 255, 255, 0.035); font-size: 12.5px; line-height: 1.55; color: rgba(214, 220, 236, 0.82); }
  #${SHEET_ID} .kt-bz-chips, #${SHEET_ID} .kt-bz-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  #${SHEET_ID} .kt-bz-chip {
    display: inline-flex; align-items: center; gap: 7px; min-height: 44px; padding: 0 15px; box-sizing: border-box;
    border: 1px solid rgba(var(--bz-rim), 0.42); border-radius: 999px; background: rgba(214, 226, 248, 0.09);
    color: rgba(238, 243, 252, 0.95); font-size: 13px; font-family: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent;
  }
  #${SHEET_ID} .kt-bz-chip .kt-bz-glyph { margin: 0; font-size: 15px; }
  #${SHEET_ID} .kt-bz-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(138px, 1fr)); margin-top: 6px; }
  #${SHEET_ID} .kt-bz-tile {
    display: grid; gap: 3px; min-height: 64px; padding: 10px 12px; box-sizing: border-box; text-align: left;
    border: 1px solid rgba(var(--tile-rim, 214, 226, 248), 0.4); border-radius: 18px; cursor: pointer; font-family: inherit; -webkit-tap-highlight-color: transparent;
    background: linear-gradient(160deg, rgba(var(--tile-rim, 214, 226, 248), 0.14), rgba(var(--tile-rim, 214, 226, 248), 0.04)), rgba(255, 255, 255, 0.03);
    color: rgba(240, 244, 252, 0.96);
  }
  #${SHEET_ID} .kt-bz-tile.is-yours { border-color: rgba(255, 225, 154, 0.85); box-shadow: 0 0 16px rgba(244, 198, 91, 0.3); }
  #${SHEET_ID} .kt-bz-tile-name { font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.15; }
  #${SHEET_ID} .kt-bz-tile-name .kt-bz-glyph { margin-right: 7px; font-size: 16px; color: rgba(var(--tile-rim, 214, 226, 248), 0.95); }
  #${SHEET_ID} .kt-bz-tile-detail { font-size: 11px; color: rgba(208, 214, 230, 0.76); }
  #${SHEET_ID} .kt-bz-yours { font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #FFE19A; }
  @keyframes kt-bz-rise { from { transform: translate3d(0, 100%, 0); } to { transform: translate3d(0, 0, 0); } }
  @keyframes kt-bz-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes kt-bz-swap { from { opacity: 0.2; } to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { #${SHEET_ID}, .${BACKDROP_CLASS}, #${SHEET_ID} .kt-bz-body { animation-duration: 1ms; } }
  /* A performance-constrained phone keeps the sheet and loses its blur (the page behind is inert; a denser fill carries the legibility). */
  html:has(#place-experience[data-kt-perf="constrained"]) #${SHEET_ID} { backdrop-filter: none; -webkit-backdrop-filter: none; background: radial-gradient(120% 70% at 20% 0%, rgba(var(--bz-rim), 0.1), rgba(var(--bz-rim), 0) 60%), rgba(9, 13, 26, 0.97); }
  html:has(#place-experience[data-kt-perf="constrained"]) .${BACKDROP_CLASS} { backdrop-filter: none; -webkit-backdrop-filter: none; background: rgba(3, 6, 14, 0.72); }
`;
document.head.append(style);
/* ------------------------------------------------------------------ state */
let stack = [];
let personal = null;
let trigger = null;
let savedScroll = null;
const pillarView = () => document.getElementById('pillar-view');
const experience = () => document.getElementById('place-experience');
const sheet = () => document.getElementById(SHEET_ID);
/** The chart's calculated values for the symbol that was tapped: the nearest chart or the hero that carries them, else any on the page. */
function personalFor(source) {
    const holder = source.closest('[data-bazi-personal]') ?? document.querySelector('[data-bazi-personal]');
    return decodePersonalContext(holder?.getAttribute('data-bazi-personal'));
}
const h = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    if (text !== undefined)
        node.textContent = text;
    return node;
};
function topicButton(topic, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.dataset.baziTopic = topic;
    return button;
}
function chipFor(topic) {
    const entry = knowledgeEntry(topic);
    const library = knowledgeLibrary(topic);
    const chip = topicButton(topic, 'kt-bz-chip');
    const glyph = glyphFor(topic);
    if (glyph)
        chip.append(h('span', 'kt-bz-glyph', glyph));
    chip.append(document.createTextNode(entry?.title ?? library?.title ?? topic));
    return chip;
}
/* ----------------------------------------------------------------- render */
function renderBody(topic) {
    const body = h('div', 'kt-bz-body');
    body.tabIndex = -1;
    if (activeLocale() !== 'en')
        body.append(h('p', 'kt-bz-note', t('bazi.sheet.englishOnly')));
    const library = knowledgeLibrary(topic);
    if (library) {
        body.append(h('p', 'kt-bz-lead', library.lead));
        const grid = h('div', 'kt-bz-grid');
        for (const member of library.members) {
            const row = libraryItem(member);
            const tile = topicButton(member, 'kt-bz-tile');
            tile.style.setProperty('--tile-rim', rimFor(member));
            const name = h('span', 'kt-bz-tile-name');
            if (row.glyph)
                name.append(h('span', 'kt-bz-glyph', row.glyph));
            name.append(document.createTextNode(row.name));
            tile.append(name, h('span', 'kt-bz-tile-detail', row.detail));
            const [kind, key = ''] = member.split(':');
            const yours = personal !== null && ((kind === 'animal' && personal.yearBranch.animal.toLowerCase() === key)
                || (kind === 'daymaster' && personal.dayMaster.name.toLowerCase() === key)
                || (kind === 'branch' && personal.monthBranch.name.toLowerCase() === key));
            if (yours) {
                tile.classList.add('is-yours');
                tile.append(h('span', 'kt-bz-yours', t(kind === 'branch' ? 'bazi.sheet.yourMonth' : kind === 'animal' ? 'bazi.sheet.yourAnimal' : 'bazi.sheet.yourDayMaster')));
            }
            grid.append(tile);
        }
        body.append(grid);
        return body;
    }
    const entry = knowledgeEntry(topic);
    if (!entry)
        return body;
    const facts = factsFor(topic);
    if (facts.length > 0) {
        const list = h('dl', 'kt-bz-facts');
        for (const fact of facts) {
            const row = h('div');
            row.append(h('dt', undefined, fact.label), h('dd', undefined, fact.value));
            list.append(row);
        }
        body.append(list);
    }
    body.append(h('p', 'kt-bz-lead', entry.lead));
    const own = personalSections(topic, personal);
    if (own.length > 0) {
        const block = h('section', 'kt-bz-personal');
        block.setAttribute('aria-label', t('bazi.sheet.personal'));
        for (const section of own) {
            block.append(h('h3', undefined, t('bazi.sheet.personal')));
            for (const paragraph of section.paragraphs)
                block.append(h('p', undefined, paragraph));
        }
        body.append(block);
    }
    for (const section of entry.sections) {
        body.append(h('h3', undefined, section.heading));
        for (const paragraph of section.paragraphs)
            body.append(h('p', undefined, paragraph));
    }
    if (entry.boundary)
        body.append(h('p', 'kt-bz-boundary', entry.boundary));
    const more = h('nav', 'kt-bz-more');
    more.setAttribute('aria-label', t('bazi.sheet.explore'));
    more.append(h('h3', undefined, t('bazi.sheet.explore')));
    const chips = h('div', 'kt-bz-chips');
    for (const related of entry.related)
        if (isKnownTopic(related) && related !== topic)
            chips.append(chipFor(related));
    more.append(chips);
    body.append(more);
    return body;
}
function render() {
    const host = sheet();
    const topic = stack[stack.length - 1];
    if (!host || !topic)
        return;
    const entry = knowledgeEntry(topic);
    const library = knowledgeLibrary(topic);
    host.style.setProperty('--bz-rim', rimFor(topic));
    host.dataset.topic = topic;
    host.querySelector('.kt-bz-head')?.remove();
    host.querySelector('.kt-bz-body')?.remove();
    const head = h('header', 'kt-bz-head');
    if (stack.length > 1) {
        const back = h('button', 'kt-bz-iconbutton kt-bz-back', '‹');
        back.type = 'button';
        back.setAttribute('aria-label', tf('bazi.sheet.back', { title: knowledgeEntry(stack[stack.length - 2])?.title ?? knowledgeLibrary(stack[stack.length - 2])?.title ?? t('bazi.sheet.previousTopic') }));
        back.dataset.baziBack = 'true';
        head.append(back);
    }
    const titles = h('div', 'kt-bz-titles');
    titles.append(h('p', 'kt-bz-eyebrow', kindLabel(topic)));
    const title = h('h2', 'kt-bz-title');
    title.id = 'kt-bz-title';
    title.tabIndex = -1;
    const glyph = glyphFor(topic);
    if (glyph)
        title.append(h('span', 'kt-bz-glyph', glyph));
    title.append(document.createTextNode(entry?.title ?? library?.title ?? topic));
    titles.append(title, h('p', 'kt-bz-sub', entry?.subtitle ?? library?.subtitle ?? ''));
    head.append(titles);
    const close = h('button', 'kt-bz-iconbutton kt-bz-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', t('ui.close'));
    close.dataset.baziClose = 'true';
    head.append(close);
    host.append(head, renderBody(topic));
    host.setAttribute('aria-labelledby', 'kt-bz-title');
}
/* ------------------------------------------------------------- open/close */
function trapFocus(event) {
    const host = sheet();
    if (!host || event.key !== 'Tab')
        return;
    const focusable = [...host.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')].filter((node) => !node.hasAttribute('disabled'));
    if (focusable.length === 0)
        return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !host.contains(active))) {
        event.preventDefault();
        last.focus();
    }
    else if (!event.shiftKey && (active === last || !host.contains(active))) {
        event.preventDefault();
        first.focus();
    }
}
function open(topic, source) {
    if (!isKnownTopic(topic))
        return;
    close(false);
    trigger = source;
    personal = personalFor(source);
    stack = [topic];
    const view = pillarView();
    savedScroll = view ? { element: view, top: view.scrollTop } : null;
    const backdrop = h('div', BACKDROP_CLASS);
    backdrop.dataset.baziBackdrop = 'true';
    const host = h('aside');
    host.id = SHEET_ID;
    host.setAttribute('role', 'dialog');
    host.setAttribute('aria-modal', 'true');
    const grip = h('div', 'kt-bz-grip');
    grip.setAttribute('aria-hidden', 'true');
    host.append(grip);
    document.body.append(backdrop, host);
    document.body.dataset.baziSheet = 'on';
    experience()?.setAttribute('inert', '');
    render();
    host.querySelector('.kt-bz-title')?.focus({ preventScroll: true });
}
function navigate(topic) {
    if (!isKnownTopic(topic) || stack[stack.length - 1] === topic)
        return;
    stack.push(topic);
    render();
    sheet()?.querySelector('.kt-bz-title')?.focus({ preventScroll: true });
}
function back() {
    if (stack.length <= 1)
        return;
    stack.pop();
    render();
    sheet()?.querySelector('.kt-bz-title')?.focus({ preventScroll: true });
}
function close(restoreFocus = true) {
    const host = sheet();
    if (!host)
        return;
    host.remove();
    document.querySelector(`.${BACKDROP_CLASS}`)?.remove();
    delete document.body.dataset.baziSheet;
    experience()?.removeAttribute('inert');
    stack = [];
    /* Put the page back exactly where it was: nothing here scrolls it, but a focus change or a layout pass must not leave it moved. */
    if (savedScroll && savedScroll.element.isConnected && Math.abs(savedScroll.element.scrollTop - savedScroll.top) > 0.5)
        savedScroll.element.scrollTop = savedScroll.top;
    savedScroll = null;
    if (restoreFocus && trigger && trigger.isConnected)
        trigger.focus({ preventScroll: true });
    trigger = null;
    personal = null;
}
/* ----------------------------------------------------------------- events */
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element))
        return;
    const inside = sheet()?.contains(target) === true;
    if (target.closest('[data-bazi-backdrop]')) {
        event.preventDefault();
        close();
        return;
    }
    if (inside) {
        if (target.closest('[data-bazi-close]')) {
            event.preventDefault();
            close();
            return;
        }
        if (target.closest('[data-bazi-back]')) {
            event.preventDefault();
            back();
            return;
        }
        const link = target.closest('[data-bazi-topic]');
        if (link?.dataset.baziTopic) {
            event.preventDefault();
            navigate(link.dataset.baziTopic);
        }
        return;
    }
    const source = target.closest('[data-bazi-topic]');
    if (!source?.dataset.baziTopic)
        return;
    event.preventDefault();
    open(source.dataset.baziTopic, source);
});
document.addEventListener('keydown', (event) => {
    if (sheet()) {
        if (event.key === 'Escape') {
            event.preventDefault();
            close();
            return;
        }
        trapFocus(event);
        return;
    }
    /* A symbol that is not a native button (an orb, a petal, a circle) opens on Enter and Space. */
    if (event.key !== 'Enter' && event.key !== ' ')
        return;
    const target = event.target;
    if (!(target instanceof Element))
        return;
    const source = target.closest('[data-bazi-topic]');
    if (!source?.dataset.baziTopic || source instanceof HTMLButtonElement)
        return;
    event.preventDefault();
    open(source.dataset.baziTopic, source);
});
/* A page that is left (the reading is replaced) takes the sheet with it. */
window.addEventListener('pagehide', () => close(false), { once: true });
