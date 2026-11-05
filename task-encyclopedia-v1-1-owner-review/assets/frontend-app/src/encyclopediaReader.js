/*
 * THE ENCYCLOPEDIA READER
 * -----------------------
 * A full-screen reading surface over whatever screen opened it. Loaded on demand by src/encyclopediaEntry.ts the first time
 * a reader taps an Encyclopedia control; never part of the start-up module graph. Each library's articles are a further
 * separate fetch (app/encyclopedia/library/libraries.ts).
 *
 * WHY AN OVERLAY AND NOT A DESTINATION
 * The pillar screens are destinations with their own transitions, history entries and scroll positions. The library sits on
 * top of them instead: the reading underneath is not re-rendered, not scrolled and not navigated, so closing the library
 * returns the reader to exactly the paragraph they left. While it is open, the screen underneath is made invisible and its
 * CSS animations are paused (no painting behind an opaque page), and both are restored on close.
 *
 * HISTORY
 * Every view (shelf, library, category, article, search, saved) is a history entry whose state carries the view, spread
 * over whatever state the screen underneath had written (Connections keeps its own flow in history.state, and a library
 * entry must not erase it). The address never changes. The phone's Back gesture therefore walks back through the library
 * one view at a time and then closes it; the close control rewinds all of the library's entries at once.
 *
 * RENDERING
 * Plain DOM, built with textContent (never interpolated text into innerHTML), one view at a time. No blur, no shadows on
 * scrolling content, one 140 ms fade per view change and none under reduced motion.
 */
import { articleAccess, categoryTier, liveAccessContext, reviewUnlockAvailable, reviewUnlocked, setReviewUnlocked } from './app/encyclopedia/library/accessPolicy.js?v=99fda38';
import { findArticle, LIBRARIES, libraryOfArticle, loadLibrary } from './app/encyclopedia/library/libraries.js?v=99fda38';
import { liveBookmarks, ReadingStore, unfinished } from './app/encyclopedia/library/readingStore.js?v=99fda38';
import { parseInline, readingMinutes, sectionAnchor, LIBRARY_IDS } from './app/encyclopedia/library/schema.js?v=99fda38';
import { buildSearchIndex, searchIndex } from './app/encyclopedia/library/search.js?v=99fda38';
import { encyclopediaStyles } from './encyclopediaStyles.js?v=99fda38';
import { escapeAttribute as escapeAttr } from './app/format.js?v=99fda38';
import { t } from './app/i18n/uiStrings.js?v=99fda38';
const ROOT_ID = 'kt-library';
const store = new ReadingStore();
let root = null;
let scroller = null;
let page = null;
let depth = 0;
let current = null;
let renderTicket = 0;
let lastFocused = null;
let savedOverflow = null;
let detachScroll = null;
const searchIndexes = new Map();
/* ================================================================== public API */
export function openEncyclopedia(view, trigger) {
    if (!root) {
        lastFocused = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
        mount();
        depth = 1;
        pushView(view, 'push');
    }
    else {
        depth += 1;
        pushView(view, 'push');
    }
    void render(view);
}
export function closeEncyclopedia() {
    if (!root)
        return;
    if (depth > 0 && window.history.state?.ktEncyclopedia) {
        const steps = depth;
        depth = 0;
        window.history.go(-steps);
        /* The popstate that follows unmounts. If the history could not move (an embedded webview without history), unmount anyway. */
        window.setTimeout(() => { if (root && !window.history.state?.ktEncyclopedia)
            unmount(); }, 450);
        return;
    }
    unmount();
}
export const encyclopediaIsOpen = () => root !== null;
/* ================================================================== mount / unmount */
function mount() {
    if (!document.getElementById('kt-library-style')) {
        const style = document.createElement('style');
        style.id = 'kt-library-style';
        style.textContent = encyclopediaStyles;
        document.head.append(style);
    }
    root = document.createElement('div');
    root.id = ROOT_ID;
    root.className = 'kt-lib';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Encyclopedia');
    /* The interface colour the reader chose for the app, read once: the library is mounted outside #place-experience. */
    const host = document.getElementById('place-experience') ?? document.documentElement;
    const accent = getComputedStyle(host).getPropertyValue('--kt-accent-rgb').trim();
    const soft = getComputedStyle(host).getPropertyValue('--kt-accent-soft-rgb').trim();
    if (accent)
        root.style.setProperty('--lib-accent', accent);
    if (soft)
        root.style.setProperty('--lib-accent-soft', soft);
    root.innerHTML = `
    <header class="kt-lib-bar">
      <button type="button" class="kt-lib-icon" data-lib-action="back" aria-label="${escapeAttr(t('encyclopedia.back'))}">${ICON.back}</button>
      <p class="kt-lib-crumb" aria-live="polite"></p>
      <button type="button" class="kt-lib-icon" data-lib-action="search" aria-label="${escapeAttr(t('encyclopedia.search'))}">${ICON.search}</button>
      <button type="button" class="kt-lib-icon" data-lib-action="saved" aria-label="${escapeAttr(t('encyclopedia.saved'))}">${ICON.saved}</button>
      <button type="button" class="kt-lib-icon" data-lib-action="close" aria-label="${escapeAttr(t('encyclopedia.close'))}">${ICON.close}</button>
    </header>
    <div class="kt-lib-progress" aria-hidden="true"><span></span></div>
    <div class="kt-lib-scroll"><div class="kt-lib-page"></div></div>`;
    scroller = root.querySelector('.kt-lib-scroll');
    page = root.querySelector('.kt-lib-page');
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKeyDown);
    document.body.append(root);
    savedOverflow = { html: document.documentElement.style.overflow, body: document.body.style.overflow };
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.ktLibraryOpen = 'on';
    window.addEventListener('popstate', onPopState);
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', flush);
}
function unmount() {
    flush();
    detachScroll?.();
    detachScroll = null;
    window.removeEventListener('popstate', onPopState);
    window.removeEventListener('pagehide', flush);
    document.removeEventListener('visibilitychange', flush);
    root?.remove();
    root = null;
    scroller = null;
    page = null;
    current = null;
    depth = 0;
    renderTicket += 1;
    delete document.documentElement.dataset.ktLibraryOpen;
    if (savedOverflow) {
        document.documentElement.style.overflow = savedOverflow.html;
        document.body.style.overflow = savedOverflow.body;
        savedOverflow = null;
    }
    /* Back to the control that opened the library, so a keyboard or screen-reader user keeps their place in the reading. */
    if (lastFocused?.isConnected)
        lastFocused.focus({ preventScroll: true });
    lastFocused = null;
}
function flush() { store.flush(); }
/* ================================================================== history */
function pushView(view, method) {
    const base = (window.history.state ?? {});
    const { ktEncyclopedia: _previous, ...underneath } = base;
    const state = { ...underneath, ktEncyclopedia: { view, depth } };
    if (method === 'push')
        window.history.pushState(state, '', window.location.href);
    else
        window.history.replaceState(state, '', window.location.href);
}
function onPopState(event) {
    const entry = event.state?.ktEncyclopedia;
    if (!entry) {
        unmount();
        return;
    }
    depth = entry.depth;
    void render(entry.view);
}
function navigate(view) {
    saveProgressNow();
    depth += 1;
    pushView(view, 'push');
    void render(view);
}
function goBack() {
    if (depth <= 1) {
        closeEncyclopedia();
        return;
    }
    window.history.back();
}
/* ================================================================== events */
function onClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target)
        return;
    const action = target.closest('[data-lib-action]');
    if (action) {
        event.preventDefault();
        const name = action.dataset.libAction;
        if (name === 'close')
            closeEncyclopedia();
        else if (name === 'back')
            goBack();
        else if (name === 'saved')
            navigate({ kind: 'saved' });
        else if (name === 'search')
            navigate({ kind: 'search', scope: scopeOf(current), query: '' });
        else if (name === 'bookmark')
            toggleBookmark(action);
        else if (name === 'resume')
            resumeFromBanner(action);
        else if (name === 'dismiss')
            action.closest('.kt-lib-resume')?.remove();
        else if (name === 'retry' && current)
            void render(current);
        else if (name === 'review') {
            setReviewUnlocked(!reviewUnlocked());
            if (current)
                void render(current, true);
        }
        else if (name === 'scope' && current?.kind === 'search') {
            const scope = action.dataset.scope;
            const view = { kind: 'search', scope, query: current.query };
            pushView(view, 'replace');
            void render(view);
        }
        else if (name === 'toc') {
            const section = action.dataset.section;
            const element = section ? page?.querySelector(`section[data-section-id="${CSS.escape(section)}"]`) : null;
            if (element && scroller)
                scroller.scrollTo({ top: element.offsetTop - 8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        }
        return;
    }
    const link = target.closest('[data-lib-view]');
    if (link) {
        event.preventDefault();
        const view = JSON.parse(link.dataset.libView ?? 'null');
        if (view)
            navigate(view);
    }
}
function onKeyDown(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeEncyclopedia();
    }
}
/* The library is above every sheet: its Escape must not also close the sheet under it. */
document.addEventListener('keydown', (event) => {
    if (root && event.key === 'Escape' && !root.contains(event.target)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeEncyclopedia();
    }
}, true);
/* ================================================================== rendering */
async function render(view, keepScroll = false) {
    if (!root || !page || !scroller)
        return;
    const ticket = ++renderTicket;
    /* Record where the article being left was, then stop tracking it. */
    saveProgressNow();
    detachScroll?.();
    detachScroll = null;
    current = view;
    setProgressBar(null);
    const scrollBefore = scroller.scrollTop;
    let built;
    try {
        if (!isReadyWithoutLoading(view))
            showLoading();
        built = await buildView(view);
    }
    catch (error) {
        if (ticket !== renderTicket)
            return;
        built = errorView();
        console.warn('[encyclopedia] view failed', error);
    }
    if (ticket !== renderTicket || !page || !scroller)
        return;
    page.replaceChildren(built);
    page.classList.remove('is-entering');
    if (!prefersReducedMotion()) {
        void page.offsetWidth;
        page.classList.add('is-entering');
    }
    updateBar(view);
    scroller.scrollTop = keepScroll ? scrollBefore : 0;
    if (view.kind === 'article')
        afterArticleRendered(view);
    if (view.kind === 'search')
        page.querySelector('input[type="search"]')?.focus({ preventScroll: true });
    else if (!keepScroll)
        page.querySelector('h1')?.focus({ preventScroll: true });
}
const loadedNow = new Set();
function isReadyWithoutLoading(view) {
    if (view.kind === 'home')
        return true;
    if (view.kind === 'library' || view.kind === 'category')
        return loadedNow.has(view.library);
    if (view.kind === 'article') {
        const library = libraryOfArticle(view.id);
        return library ? loadedNow.has(library) : true;
    }
    return false;
}
async function library(id) {
    const content = await loadLibrary(id);
    loadedNow.add(id);
    return content;
}
function showLoading() {
    if (!page)
        return;
    page.replaceChildren(el('p', 'kt-lib-loading', 'Opening the library…'));
}
function errorView() {
    const box = el('div', 'kt-lib-empty');
    box.append(el('h1', 'kt-lib-title', 'The library could not be opened'), el('p', '', 'Check the connection and try again. Nothing that was saved has been lost.'));
    const retry = el('button', 'kt-lib-button', 'Try again');
    retry.setAttribute('type', 'button');
    retry.dataset.libAction = 'retry';
    box.append(retry);
    box.querySelector('h1')?.setAttribute('tabindex', '-1');
    return box;
}
async function buildView(view) {
    switch (view.kind) {
        case 'home': return buildHome();
        case 'library': return buildLibrary(await library(view.library));
        case 'category': return buildCategory(await library(view.library), view.category);
        case 'article': return buildArticle(view);
        case 'saved': return buildSaved();
        case 'search': return buildSearch(view);
        default: return errorView();
    }
}
function updateBar(view) {
    if (!root)
        return;
    const crumb = root.querySelector('.kt-lib-crumb');
    const library = view.kind === 'library' || view.kind === 'category' ? view.library
        : view.kind === 'article' ? libraryOfArticle(view.id)
            : view.kind === 'search' && view.scope !== 'all' ? view.scope : null;
    if (crumb)
        crumb.textContent = view.kind === 'saved' ? 'Saved' : view.kind === 'search' ? 'Search' : library ? LIBRARIES[library].shortTitle : 'Encyclopedia';
    root.dataset.view = view.kind;
    if (library)
        root.dataset.library = library;
    else
        delete root.dataset.library;
}
/* ------------------------------------------------------------------ shelf (all six) */
function buildHome() {
    const wrap = el('div', 'kt-lib-view');
    const head = el('header', 'kt-lib-hero');
    head.append(el('p', 'kt-lib-eyebrow', 'Know Thyself · Reference'), heading('Encyclopedia'), el('p', 'kt-lib-standfirst', 'General articles on the symbols, numbers and structures each system works with. The same for every reader; the personal readings are where they are combined for one person.'));
    wrap.append(head);
    wrap.append(continueBlock(null));
    const list = el('ul', 'kt-lib-shelf');
    for (const id of LIBRARY_IDS) {
        const meta = LIBRARIES[id];
        const item = el('li');
        const button = viewButton({ kind: 'library', library: id }, 'kt-lib-shelf-item');
        button.append(el('span', 'kt-lib-shelf-mark', glyphText(meta.mark)), textBlock(meta.title, meta.tagline));
        item.append(button);
        list.append(item);
    }
    wrap.append(list);
    return wrap;
}
/* ------------------------------------------------------------------ a library's landing page */
function buildLibrary(content) {
    const meta = LIBRARIES[content.id];
    const wrap = el('div', 'kt-lib-view');
    const head = el('header', 'kt-lib-hero');
    head.append(el('span', 'kt-lib-hero-mark', glyphText(meta.mark)), el('p', 'kt-lib-eyebrow', `${content.articles.length} articles`), heading(meta.title), el('p', 'kt-lib-standfirst', meta.tagline));
    wrap.append(head);
    for (const paragraph of meta.intro)
        wrap.append(el('p', 'kt-lib-intro', paragraph));
    const search = viewButton({ kind: 'search', scope: content.id, query: '' }, 'kt-lib-searchbox');
    search.append(iconSpan(ICON.search), el('span', '', `Search ${meta.shortTitle}`));
    wrap.append(search);
    wrap.append(continueBlock(content.id));
    wrap.append(el('h2', 'kt-lib-h2', 'Contents'));
    const list = el('ul', 'kt-lib-categories');
    for (const category of content.categories) {
        const articles = content.articles.filter((article) => article.category === category.id);
        const item = el('li');
        const button = viewButton({ kind: 'category', library: content.id, category: category.id }, 'kt-lib-category');
        const text = textBlock(category.title, category.description);
        const meta2 = el('span', 'kt-lib-category-meta', `${articles.length}`);
        if (categoryTier(content.id, category.id) === 'premium')
            meta2.prepend(proBadge());
        button.append(text, meta2);
        item.append(button);
        list.append(item);
    }
    wrap.append(list);
    wrap.append(aboutBlock());
    return wrap;
}
function aboutBlock() {
    const box = el('details', 'kt-lib-about');
    box.append(el('summary', '', 'About this library'));
    box.append(el('p', '', 'Articles here are general reference: they explain what a factor means within its system, for anyone. They do not use birth data and do not describe a particular person.'), el('p', '', 'Astrology, numerology, Human Design, BaZi and Tarot are interpretive traditions, not scientific measurements. The articles describe how each tradition reads its symbols.'), el('p', '', 'Foundational articles are free. Articles marked PRO belong to the complete library. Bookmarks and reading progress work for every article.'));
    if (reviewUnlockAvailable()) {
        const review = el('button', 'kt-lib-button is-quiet', reviewUnlocked() ? 'Owner review: all content unlocked (tap to lock)' : 'Owner review: unlock all content for this session');
        review.setAttribute('type', 'button');
        review.dataset.libAction = 'review';
        box.append(review);
    }
    return box;
}
/* ------------------------------------------------------------------ a category's index */
function buildCategory(content, categoryId) {
    const category = content.categories.find((entry) => entry.id === categoryId);
    const wrap = el('div', 'kt-lib-view');
    if (!category) {
        wrap.append(heading('Not found'), el('p', '', 'This part of the library no longer exists.'));
        return wrap;
    }
    const head = el('header', 'kt-lib-hero is-compact');
    head.append(el('p', 'kt-lib-eyebrow', LIBRARIES[content.id].shortTitle), heading(category.title), el('p', 'kt-lib-standfirst', category.description));
    wrap.append(head);
    const context = liveAccessContext();
    const state = store.snapshot();
    const list = el('ul', 'kt-lib-index');
    for (const article of content.articles.filter((entry) => entry.category === categoryId)) {
        list.append(indexItem(article, articleAccess(article, context), state.progress.find((record) => record.articleId === article.id)?.completed ?? null));
    }
    wrap.append(list);
    return wrap;
}
function indexItem(article, access, completed) {
    const item = el('li');
    const button = viewButton({ kind: 'article', id: article.id }, 'kt-lib-entry');
    button.append(el('span', 'kt-lib-entry-glyph', glyphText(article.glyph)), textBlock(article.title, article.summary));
    const meta = el('span', 'kt-lib-entry-meta');
    if (!access.readable)
        meta.append(proBadge());
    if (completed === true)
        meta.append(el('span', 'kt-lib-dot is-read', '', 'Read'));
    else if (completed === false)
        meta.append(el('span', 'kt-lib-dot', '', 'Started'));
    if (store.isBookmarked(article.id))
        meta.append(iconSpan(ICON.savedFilled, 'Saved'));
    button.append(meta);
    item.append(button);
    return item;
}
/* ------------------------------------------------------------------ the article */
async function buildArticle(view) {
    const libraryId = libraryOfArticle(view.id);
    if (!libraryId)
        return notFound();
    const content = await library(libraryId);
    const article = content.articles.find((entry) => entry.id === view.id);
    if (!article)
        return notFound();
    /* Titles for cross-references into other libraries: fetch those libraries before drawing the text. */
    const titles = await titleResolver(article);
    const access = articleAccess(article);
    const category = content.categories.find((entry) => entry.id === article.category);
    const wrap = el('article', 'kt-lib-view kt-lib-article');
    wrap.dataset.articleId = article.id;
    const head = el('header', 'kt-lib-article-head');
    const eyebrow = el('p', 'kt-lib-eyebrow');
    const categoryLink = viewButton({ kind: 'category', library: libraryId, category: article.category }, 'kt-lib-eyebrow-link');
    categoryLink.textContent = category?.title ?? LIBRARIES[libraryId].shortTitle;
    eyebrow.append(categoryLink);
    if (access.tier === 'premium')
        eyebrow.append(proBadge(access.readable ? (access.via === 'review' ? 'PRO · review' : 'PRO') : 'PRO'));
    const titleRow = el('div', 'kt-lib-title-row');
    if (article.glyph)
        titleRow.append(el('span', 'kt-lib-article-glyph', glyphText(article.glyph)));
    titleRow.append(heading(article.title));
    head.append(eyebrow, titleRow, el('p', 'kt-lib-standfirst', article.summary));
    const tools = el('div', 'kt-lib-tools');
    tools.append(el('span', 'kt-lib-minutes', `${readingMinutes(article)} min read`), bookmarkButton(article.id, null, article.title));
    head.append(tools);
    wrap.append(head);
    if (!access.readable) {
        wrap.append(lockedPanel(article, category?.title ?? ''));
        return wrap;
    }
    /* Continue reading: offered, not imposed, unless the reader asked for it (from the Continue list or a section bookmark). */
    const saved = store.progressFor(article.id);
    if (!view.resume && !view.section && saved && !saved.completed && saved.progress >= 0.04) {
        const sectionTitle = article.sections.find((section) => section.id === saved.sectionId)?.heading;
        const banner = el('div', 'kt-lib-resume');
        banner.append(el('p', '', `Continue where reading stopped${sectionTitle ? ` · ${sectionTitle}` : ''} · ${Math.round(saved.progress * 100)}%`));
        const go = el('button', 'kt-lib-button', 'Continue reading');
        go.setAttribute('type', 'button');
        go.dataset.libAction = 'resume';
        const dismiss = el('button', 'kt-lib-button is-quiet', 'Start from the top');
        dismiss.setAttribute('type', 'button');
        dismiss.dataset.libAction = 'dismiss';
        banner.append(go, dismiss);
        wrap.append(banner);
    }
    if (article.sections.length > 2) {
        const toc = el('nav', 'kt-lib-toc');
        toc.setAttribute('aria-label', 'Contents of this article');
        const list = el('ol');
        for (const section of article.sections) {
            const item = el('li');
            const button = el('button', '', section.heading);
            button.setAttribute('type', 'button');
            button.dataset.libAction = 'toc';
            button.dataset.section = section.id;
            item.append(button);
            list.append(item);
        }
        toc.append(list);
        wrap.append(toc);
    }
    for (const section of article.sections) {
        const block = el('section', 'kt-lib-section');
        block.id = sectionAnchor(article.id, section.id);
        block.dataset.sectionId = section.id;
        const h2 = el('div', 'kt-lib-section-head');
        h2.append(el('h2', '', section.heading), bookmarkButton(article.id, section.id, section.heading));
        block.append(h2);
        for (const paragraph of section.paragraphs ?? [])
            block.append(richParagraph('p', paragraph, titles));
        if (section.list?.length) {
            const list = el('ul', 'kt-lib-list');
            for (const item of section.list)
                list.append(richParagraph('li', item, titles));
            block.append(list);
        }
        wrap.append(block);
    }
    if (article.related?.length) {
        const related = el('aside', 'kt-lib-related');
        related.append(el('h2', '', 'Related articles'));
        const list = el('ul');
        for (const id of article.related) {
            const item = el('li');
            const button = viewButton({ kind: 'article', id }, 'kt-lib-related-item');
            button.textContent = titles(id) ?? id;
            item.append(button);
            list.append(item);
        }
        related.append(list);
        wrap.append(related);
    }
    const consulted = await sourcesConsulted(article.id);
    if (consulted.length) {
        const block = el('aside', 'kt-lib-sources');
        block.append(el('h2', '', 'Sources consulted'));
        const list = el('ul');
        for (const [title, by, year] of consulted) {
            const item = el('li');
            item.append(el('cite', '', title), document.createTextNode(` — ${by}${year ? `, ${year}` : ''}`));
            list.append(item);
        }
        block.append(list, el('p', 'kt-lib-sources-note', 'The article is written in the library’s own words; these are the references its claims were checked against.'));
        wrap.append(block);
    }
    wrap.append(el('p', 'kt-lib-footnote', 'General reference. It describes how the tradition reads this factor; a personal reading combines it with the rest of one person’s chart.'));
    return wrap;
}
/* The research references (V1.1), fetched once with the first article that is opened. A failed fetch simply shows no list. */
let consultedModule = null;
async function sourcesConsulted(articleId) {
    consultedModule ??= import('./app/encyclopedia/library/research/consulted.js?v=99fda38').catch(() => null);
    const module = await consultedModule;
    return (module?.CONSULTED[articleId] ?? []).map((index) => module.SOURCES[index]).filter(Boolean);
}
function lockedPanel(article, categoryTitle) {
    const panel = el('div', 'kt-lib-locked');
    panel.append(iconSpan(ICON.lock), el('h2', '', 'Part of the complete library'));
    panel.append(el('p', '', `${categoryTitle ? `${categoryTitle} articles go` : 'This article goes'} beyond the foundations: they follow a single factor into a specific position or a finer layer of the system.`), el('p', '', 'Free: understand the pieces. PRO: discover how they connect within you. PRO access is not available in this version yet; every foundational article in each library stays free.'));
    if (article.sections.length) {
        const outline = el('ul', 'kt-lib-locked-outline');
        outline.setAttribute('aria-label', 'What this article covers');
        for (const section of article.sections)
            outline.append(el('li', '', section.heading));
        panel.append(outline);
    }
    panel.append(el('p', 'kt-lib-locked-note', 'It can still be saved, so it is ready when the full library opens.'));
    return panel;
}
function notFound() {
    const box = el('div', 'kt-lib-empty');
    box.append(heading('Article not found'), el('p', '', 'This article has moved or no longer exists. Saved items that pointed to it can be removed from Saved.'));
    return box;
}
async function titleResolver(article) {
    const targets = new Set(article.related ?? []);
    for (const section of article.sections)
        for (const text of [...(section.paragraphs ?? []), ...(section.list ?? [])])
            for (const part of parseInline(text))
                if (part.kind === 'link')
                    targets.add(part.target);
    const libraries = new Set([article.library]);
    for (const target of targets) {
        const id = libraryOfArticle(target);
        if (id)
            libraries.add(id);
    }
    const loaded = await Promise.all([...libraries].map((id) => library(id).catch(() => null)));
    const titles = new Map();
    for (const content of loaded)
        for (const entry of content?.articles ?? [])
            if (targets.has(entry.id))
                titles.set(entry.id, entry.title);
    return (id) => titles.get(id);
}
function richParagraph(tag, text, titleOf) {
    const node = el(tag);
    for (const part of parseInline(text)) {
        if (part.kind === 'text') {
            node.append(document.createTextNode(part.text));
            continue;
        }
        const label = part.label ?? titleOf(part.target) ?? part.target;
        if (!titleOf(part.target)) {
            node.append(document.createTextNode(label));
            continue;
        }
        const link = document.createElement('a');
        link.className = 'kt-lib-ref';
        link.href = '#';
        link.textContent = label;
        link.dataset.libView = JSON.stringify({ kind: 'article', id: part.target });
        node.append(link);
    }
    return node;
}
/* ------------------------------------------------------------------ reading position */
function afterArticleRendered(view) {
    if (!scroller || !page)
        return;
    const article = page.querySelector('.kt-lib-article');
    if (!article || article.querySelector('.kt-lib-locked'))
        return;
    const id = view.id;
    const target = view.section ? { sectionId: view.section, sectionOffset: 0 } : view.resume ? store.progressFor(id) : null;
    if (target)
        requestAnimationFrame(() => restorePosition(target.sectionId, target.sectionOffset));
    trackProgress(id, article);
}
function restorePosition(sectionId, offset) {
    if (!scroller || !page)
        return;
    const section = page.querySelector(`section[data-section-id="${CSS.escape(sectionId)}"]`);
    if (!section)
        return;
    scroller.scrollTop = Math.max(0, section.offsetTop + offset * section.offsetHeight - 12);
}
function resumeFromBanner(button) {
    const id = (current?.kind === 'article' && current.id) || '';
    const saved = id ? store.progressFor(id) : null;
    button.closest('.kt-lib-resume')?.remove();
    if (saved)
        restorePosition(saved.sectionId, saved.sectionOffset);
}
let measure = null;
function trackProgress(articleId, article) {
    if (!scroller)
        return;
    const host = scroller;
    const sections = [...article.querySelectorAll('section[data-section-id]')];
    if (sections.length === 0)
        return;
    let frame = 0;
    let moved = false;
    const startTop = host.scrollTop;
    measure = () => {
        const max = Math.max(1, host.scrollHeight - host.clientHeight);
        const progress = Math.min(1, host.scrollTop / max);
        setProgressBar(progress);
        if (!moved)
            return;
        const line = host.scrollTop + 24;
        let index = 0;
        for (let i = 0; i < sections.length; i += 1)
            if (sections[i].offsetTop <= line)
                index = i;
        const section = sections[index];
        const offset = Math.min(1, Math.max(0, (line - section.offsetTop) / Math.max(1, section.offsetHeight)));
        store.recordProgress({ articleId, sectionId: section.dataset.sectionId ?? '', sectionOffset: line < sections[0].offsetTop ? 0 : offset, progress: host.scrollHeight <= host.clientHeight + 4 ? 1 : progress });
    };
    const onScroll = () => {
        if (Math.abs(host.scrollTop - startTop) > 40)
            moved = true;
        if (frame)
            return;
        frame = requestAnimationFrame(() => { frame = 0; measure?.(); });
    };
    host.addEventListener('scroll', onScroll, { passive: true });
    setProgressBar(0);
    detachScroll = () => { host.removeEventListener('scroll', onScroll); if (frame)
        cancelAnimationFrame(frame); measure = null; };
}
function saveProgressNow() { measure?.(); store.flush(); }
function setProgressBar(value) {
    const bar = root?.querySelector('.kt-lib-progress');
    if (!bar)
        return;
    bar.hidden = value === null;
    if (value !== null)
        bar.firstElementChild.style.transform = `scaleX(${value.toFixed(3)})`;
}
/* ------------------------------------------------------------------ bookmarks */
function bookmarkButton(articleId, sectionId, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = sectionId ? 'kt-lib-mark is-section' : 'kt-lib-mark';
    button.dataset.libAction = 'bookmark';
    button.dataset.articleId = articleId;
    if (sectionId)
        button.dataset.sectionId = sectionId;
    paintBookmark(button, store.isBookmarked(articleId, sectionId), label, sectionId !== null);
    return button;
}
function paintBookmark(button, on, label, section) {
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
    button.setAttribute('aria-label', `${on ? 'Remove bookmark' : 'Bookmark'}${section ? ' section' : ''}: ${label}`);
    button.innerHTML = on ? ICON.savedFilled : ICON.saved;
    if (!section)
        button.append(el('span', 'kt-lib-mark-label', on ? 'Saved' : 'Save'));
    button.dataset.label = label;
}
function toggleBookmark(button) {
    const articleId = button.dataset.articleId;
    if (!articleId)
        return;
    const sectionId = button.dataset.sectionId ?? null;
    const on = store.toggleBookmark(articleId, sectionId);
    paintBookmark(button, on, button.dataset.label ?? '', sectionId !== null);
}
/* ------------------------------------------------------------------ continue reading + saved */
function continueBlock(onlyLibrary) {
    const box = el('section', 'kt-lib-continue');
    const records = unfinished(store.snapshot()).filter((record) => !onlyLibrary || libraryOfArticle(record.articleId) === onlyLibrary).slice(0, 3);
    if (records.length === 0) {
        box.hidden = true;
        return box;
    }
    box.append(el('h2', 'kt-lib-h2', 'Continue reading'));
    const list = el('ul', 'kt-lib-index');
    box.append(list);
    /* Titles need the libraries; draw the rows when they arrive (the libraries are small and usually already loaded). */
    void Promise.all(records.map((record) => findArticle(record.articleId).catch(() => null))).then((articles) => {
        articles.forEach((article, index) => {
            if (!article)
                return;
            const record = records[index];
            const item = el('li');
            const button = viewButton({ kind: 'article', id: article.id, resume: true }, 'kt-lib-entry');
            button.append(el('span', 'kt-lib-entry-glyph', glyphText(article.glyph)), textBlock(article.title, `${LIBRARIES[article.library].shortTitle} · ${Math.round(record.progress * 100)}% read`));
            item.append(button);
            list.append(item);
        });
    });
    return box;
}
async function buildSaved() {
    const wrap = el('div', 'kt-lib-view');
    const head = el('header', 'kt-lib-hero is-compact');
    head.append(el('p', 'kt-lib-eyebrow', 'Encyclopedia'), heading('Saved'), el('p', 'kt-lib-standfirst', 'Bookmarked articles and sections, and articles that were started but not finished. Kept on this device.'));
    wrap.append(head);
    const state = store.snapshot();
    const bookmarks = liveBookmarks(state);
    const started = unfinished(state);
    const ids = new Set([...bookmarks.map((record) => record.articleId), ...started.map((record) => record.articleId)]);
    const articles = new Map();
    await Promise.all([...ids].map(async (id) => { const article = await findArticle(id).catch(() => null); if (article)
        articles.set(id, article); }));
    if (started.length) {
        wrap.append(el('h2', 'kt-lib-h2', 'Continue reading'));
        const list = el('ul', 'kt-lib-index');
        for (const record of started.slice(0, 12)) {
            const article = articles.get(record.articleId);
            if (!article)
                continue;
            const item = el('li');
            const button = viewButton({ kind: 'article', id: article.id, resume: true }, 'kt-lib-entry');
            const section = article.sections.find((entry) => entry.id === record.sectionId)?.heading;
            button.append(el('span', 'kt-lib-entry-glyph', glyphText(article.glyph)), textBlock(article.title, `${LIBRARIES[article.library].shortTitle}${section ? ` · ${section}` : ''} · ${Math.round(record.progress * 100)}%`));
            item.append(button);
            list.append(item);
        }
        wrap.append(list);
    }
    wrap.append(el('h2', 'kt-lib-h2', 'Bookmarks'));
    if (bookmarks.length === 0) {
        wrap.append(el('p', 'kt-lib-intro', 'Nothing saved yet. The bookmark beside an article’s title saves the article; the small one beside a section heading saves that section.'));
        return wrap;
    }
    const list = el('ul', 'kt-lib-index');
    for (const record of bookmarks) {
        const article = articles.get(record.articleId);
        const item = el('li', 'kt-lib-saved-row');
        if (!article) {
            item.append(el('span', 'kt-lib-entry is-missing', 'An article that no longer exists'));
        }
        else {
            const section = record.sectionId ? article.sections.find((entry) => entry.id === record.sectionId) : null;
            const button = viewButton({ kind: 'article', id: article.id, ...(section ? { section: section.id } : {}) }, 'kt-lib-entry');
            button.append(el('span', 'kt-lib-entry-glyph', glyphText(article.glyph)), textBlock(section ? `${article.title} · ${section.heading}` : article.title, `${LIBRARIES[article.library].shortTitle}${section ? ' · section' : ''}`));
            item.append(button);
        }
        const remove = bookmarkButton(record.articleId, record.sectionId, article?.title ?? record.articleId);
        remove.classList.add('is-section');
        item.append(remove);
        list.append(item);
    }
    wrap.append(list);
    return wrap;
}
/* ------------------------------------------------------------------ search */
async function indexFor(scope) {
    const cached = searchIndexes.get(scope);
    if (cached)
        return cached;
    const ids = scope === 'all' ? [...LIBRARY_IDS] : [scope];
    const contents = await Promise.all(ids.map((id) => library(id)));
    const titles = new Map(contents.flatMap((content) => content.articles.map((article) => [article.id, article.title])));
    const index = buildSearchIndex(contents.flatMap((content) => content.articles), (id) => titles.get(id));
    searchIndexes.set(scope, index);
    return index;
}
async function buildSearch(view) {
    const index = await indexFor(view.scope);
    const wrap = el('div', 'kt-lib-view');
    const form = el('form', 'kt-lib-search');
    form.setAttribute('role', 'search');
    const input = document.createElement('input');
    input.type = 'search';
    input.value = view.query;
    input.placeholder = view.scope === 'all' ? 'Search all libraries' : `Search ${LIBRARIES[view.scope].shortTitle}`;
    input.setAttribute('aria-label', input.placeholder);
    input.autocomplete = 'off';
    input.enterKeyHint = 'search';
    form.append(iconSpan(ICON.search), input);
    wrap.append(heading('Search', 'kt-lib-visually-hidden'), form);
    const scopes = el('div', 'kt-lib-scopes');
    const preferred = view.scope === 'all' ? null : view.scope;
    for (const scope of [...(preferred ? [preferred] : []), 'all']) {
        const chip = el('button', `kt-lib-chip${scope === view.scope ? ' is-on' : ''}`, scope === 'all' ? 'All libraries' : LIBRARIES[scope].shortTitle);
        chip.setAttribute('type', 'button');
        chip.setAttribute('aria-pressed', scope === view.scope ? 'true' : 'false');
        chip.dataset.libAction = 'scope';
        chip.dataset.scope = scope;
        scopes.append(chip);
    }
    wrap.append(scopes);
    const results = el('ul', 'kt-lib-index');
    results.setAttribute('aria-live', 'polite');
    const status = el('p', 'kt-lib-search-status');
    wrap.append(status, results);
    const context = liveAccessContext();
    const progress = store.snapshot().progress;
    let timer = 0;
    const run = () => {
        const query = input.value;
        const hits = searchIndex(index, query, 60);
        results.replaceChildren(...hits.map((hit) => indexItem(hit.article, articleAccess(hit.article, context), progress.find((record) => record.articleId === hit.article.id)?.completed ?? null)));
        status.textContent = query.trim() ? (hits.length ? `${hits.length} result${hits.length === 1 ? '' : 's'}` : 'No articles match. Try a shorter word, a number, or another name for the same thing.') : '';
        if (current?.kind === 'search') {
            current = { ...current, query };
            pushView(current, 'replace');
        }
    };
    input.addEventListener('input', () => { window.clearTimeout(timer); timer = window.setTimeout(run, 110); });
    form.addEventListener('submit', (event) => { event.preventDefault(); run(); input.blur(); });
    if (view.query)
        run();
    return wrap;
}
/* ================================================================== small builders */
function el(tag, className = '', text, ariaLabel) {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    if (text)
        node.textContent = text;
    if (ariaLabel) {
        node.setAttribute('role', 'img');
        node.setAttribute('aria-label', ariaLabel);
    }
    return node;
}
function heading(text, className = 'kt-lib-title') {
    const h1 = el('h1', className, text);
    h1.tabIndex = -1;
    return h1;
}
function textBlock(title, sub) {
    const block = el('span', 'kt-lib-text');
    block.append(el('span', 'kt-lib-text-title', title), el('span', 'kt-lib-text-sub', sub));
    return block;
}
function viewButton(view, className) {
    const button = el('button', className);
    button.type = 'button';
    button.dataset.libView = JSON.stringify(view);
    return button;
}
function proBadge(text = 'PRO') {
    const badge = el('span', 'kt-lib-pro');
    badge.innerHTML = ICON.lockSmall;
    badge.append(document.createTextNode(text));
    badge.setAttribute('aria-label', text === 'PRO' ? 'PRO article' : text);
    return badge;
}
function iconSpan(svg, label) {
    const span = el('span', 'kt-lib-ico');
    span.innerHTML = svg;
    if (label) {
        span.setAttribute('role', 'img');
        span.setAttribute('aria-label', label);
    }
    else
        span.setAttribute('aria-hidden', 'true');
    return span;
}
const scopeOf = (view) => {
    if (!view)
        return 'all';
    if (view.kind === 'library' || view.kind === 'category')
        return view.library;
    if (view.kind === 'article')
        return libraryOfArticle(view.id) ?? 'all';
    if (view.kind === 'search')
        return view.scope;
    return 'all';
};
/* Zodiac, planet and similar symbols default to colour-emoji presentation on many phones; U+FE0E asks for the text glyph, so
   the mark takes the library's accent colour like every other mark. */
const glyphText = (glyph) => (!glyph ? '·' : /[\u2600-\u27BF\u2B00-\u2BFF]/.test(glyph) ? glyph.replace(/([\u2600-\u27BF\u2B00-\u2BFF])(?!\uFE0E)/g, '$1\uFE0E') : glyph);
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const svg = (body, size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const ICON = {
    back: svg('<path d="M15 5l-7 7 7 7"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    search: svg('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
    saved: svg('<path d="M7 4h10v16l-5-3.6L7 20z"/>', 18),
    savedFilled: svg('<path d="M7 4h10v16l-5-3.6L7 20z" fill="currentColor"/>', 18),
    lock: svg('<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>', 22),
    lockSmall: svg('<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>', 11),
};
