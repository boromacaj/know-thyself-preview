import { deckCardMapping, getTarotDeckDefinition } from './deckRegistry.js?v=4cd804d';
/**
 * THE PICTURES OF A DECK: WHERE THEY ARE, AND HOW THEY ARE LOADED WITHOUT HURTING THE PHONE.
 *
 * Three sizes of every card (tools/tarot-decks): `t` for a gallery thumbnail (about 150 px wide), `m` for a card in a
 * reading or on its page (about 400 px) and `l` for the enlarged view (about 760 px, only for a source big enough to earn it).
 * None of it is in the JavaScript: every picture is a plain <img> that the browser fetches when it is near the screen
 * (`loading="lazy"`), decodes off the main thread (`decoding="async"`) and keeps in its own cache. Nothing here decodes an image
 * ahead of time, and nothing keeps a decoded image: the one thing this module holds in memory is a short list of object URLs for
 * the offline fallback, capped and revoked as it turns over.
 *
 * A CARD WITHOUT A PICTURE HAS NO URL. `deckArtUrl` returns null for a card the deck does not have, and the callers draw the
 * text face instead. A different deck's picture is never put in its place.
 */
/** Where the decks bundled with the application are served from: next to the page, under whatever base path it is hosted at. */
function bundledDeckBase() {
    return new URL('../../../../../tarot-decks/', import.meta.url).href;
}
/**
 * Where a deck's folder is served from. A bundled deck is always read from the application itself, so the default deck needs no
 * network and no deck host. Every other deck comes from the deck host when one is set (`__KT_TAROT_DECK_BASE__`, for a native
 * build that carries only the default deck) and from next to the page otherwise (the web build carries them all).
 */
export function deckAssetBase(deck) {
    const override = globalThis.__KT_TAROT_DECK_BASE__;
    if (deck?.availabilityStatus !== 'bundled' && typeof override === 'string' && override !== '')
        return override.endsWith('/') ? override : `${override}/`;
    return bundledDeckBase();
}
export function deckImagePath(deck, tier, cardId) {
    if (deck.availabilityStatus === 'withheld')
        return null;
    if (deckCardMapping(deck, cardId) === null)
        return null;
    /* A tier the deck does not have steps down one size rather than failing. */
    const order = tier === 'l' ? ['l', 'm', 't'] : tier === 'm' ? ['m', 't'] : ['t'];
    const use = order.find((candidate) => deck.assetManifest.tiers[candidate]);
    return use === undefined ? null : `${deck.assetManifest.root}/${use}/${cardId}.webp`;
}
export function deckArtUrl(deckId, tier, cardId) {
    const deck = getTarotDeckDefinition(deckId);
    if (deck === null)
        return null;
    const path = deckImagePath(deck, tier, cardId);
    return path === null ? null : `${deckAssetBase(deck)}${path}`;
}
export function deckCoverUrl(deckId) {
    const deck = getTarotDeckDefinition(deckId);
    return deck === null || deck.availabilityStatus === 'withheld' ? null : `${deckAssetBase(deck)}${deck.assetManifest.root}/${deck.cover.file}`;
}
const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
/**
 * The <img> for a card, or '' when the deck has no picture of it. The picture is decorative here (the card's name is in the
 * text beside it), so alt is empty; the one place it is the content (the card's own page) sets its own label.
 */
export function deckArtMarkup(deckId, cardId, options) {
    const url = deckArtUrl(deckId, options.tier, cardId);
    if (url === null)
        return '';
    const deck = getTarotDeckDefinition(deckId);
    const aspect = deck?.cardAspect ?? 0.58;
    return `<img class="${escapeAttr(options.className ?? 'kt-deck-art')}" src="${escapeAttr(url)}" alt="" draggable="false" decoding="async" ${options.eager === true ? 'fetchpriority="high"' : 'loading="lazy"'} data-kt-art="${escapeAttr(deckId)}" data-kt-art-card="${escapeAttr(cardId)}"${options.reversed === true ? ' data-kt-art-reversed' : ''} style="aspect-ratio:${aspect}">`;
}
/* ------------------------------------------------------------- fallbacks -- */
const OFFLINE_CACHE = 'kt-tarot-decks-v1';
const BLOB_LIMIT = 48;
const blobUrls = [];
function rememberBlobUrl(url) {
    blobUrls.push(url);
    while (blobUrls.length > BLOB_LIMIT) {
        const old = blobUrls.shift();
        if (old !== undefined)
            URL.revokeObjectURL(old);
    }
}
/**
 * ONE listener for every deck picture that fails to load.
 *
 * An image's error event does not bubble, so the capture phase is used. A failed picture first tries the copy kept for offline
 * use (Cache Storage, deckOffline.ts); if there is none the <img> is removed and the card's text face, which was always
 * underneath, is what shows. A card never shows a broken-image icon.
 */
export function installDeckArtFallback(root = document) {
    const flag = '__ktDeckArtFallback';
    const holder = root;
    if (holder[flag] === true)
        return;
    holder[flag] = true;
    root.addEventListener('error', (event) => {
        const img = event.target;
        if (!(img instanceof HTMLImageElement) || !img.hasAttribute('data-kt-art'))
            return;
        /* The enlarged size is not in a lean build: step down to the reading size once before giving up. */
        const fallback = img.dataset.ktArtFallback;
        if (fallback && img.getAttribute('src') !== fallback) {
            img.src = fallback;
            return;
        }
        const drop = () => { img.dataset.ktArtFailed = 'true'; img.closest('.has-art')?.classList.remove('has-art'); img.remove(); };
        if (img.dataset.ktArtTried === 'blob' || typeof caches === 'undefined') {
            drop();
            return;
        }
        img.dataset.ktArtTried = 'blob';
        const original = img.getAttribute('src') ?? '';
        caches.open(OFFLINE_CACHE)
            .then((cache) => cache.match(original))
            .then((response) => (response ? response.blob() : null))
            .then((blob) => {
            if (blob === null || !img.isConnected) {
                drop();
                return;
            }
            const url = URL.createObjectURL(blob);
            rememberBlobUrl(url);
            img.src = url;
        })
            .catch(drop);
    }, true);
    /* A loaded picture fades in (opacity only); the class is what the stylesheet reads. */
    root.addEventListener('load', (event) => {
        const img = event.target;
        if (img instanceof HTMLImageElement && img.hasAttribute('data-kt-art'))
            img.classList.add('is-loaded');
    }, true);
}
/**
 * A short, polite warm-up of the pictures a screen is about to need (the next and previous card on a card's page): at most
 * `limit` at a time, never more than `max` in all, and nothing while the person is on a saver connection.
 */
export function preloadDeckArt(urls, { max = 4, limit = 2 } = {}) {
    if (typeof Image === 'undefined')
        return;
    const connection = navigator.connection;
    if (connection?.saveData === true)
        return;
    const queue = urls.slice(0, max);
    let active = 0;
    const next = () => {
        while (active < limit && queue.length > 0) {
            const url = queue.shift();
            active += 1;
            const image = new Image();
            image.decoding = 'async';
            const done = () => { active -= 1; next(); };
            image.onload = done;
            image.onerror = done;
            image.src = url;
        }
    };
    next();
}
export const DECK_OFFLINE_CACHE_NAME = OFFLINE_CACHE;
