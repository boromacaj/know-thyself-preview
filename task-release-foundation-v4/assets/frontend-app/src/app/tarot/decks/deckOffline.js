import { DECK_OFFLINE_CACHE_NAME, deckArtUrl, deckCoverUrl } from './deckArt.js?v=4cd804d';
import { getTarotDeckDefinition } from './deckRegistry.js?v=4cd804d';
/**
 * KEEPING A DECK FOR OFFLINE USE, AND GIVING THE SPACE BACK.
 *
 * "Save for offline" copies a deck's pictures into Cache Storage; "Remove" deletes them. The bundled deck needs neither: it is
 * part of the application. A saved deck is read back only when its picture cannot be fetched (deckArt.ts, the error listener),
 * so being online costs nothing extra and a saved deck keeps working on a train.
 *
 * WHAT IS SAVED: the thumbnails and the reading size, always; the enlarged size only when asked, because it is the bulk of the
 * bytes (a deck's `l` size can be three times the rest together). Sizes are known before anything is fetched
 * (`deck.assetManifest.bytes`) so the button can say what it will cost, and the library shows how much saved decks use.
 *
 * WHAT IS RECORDED: one small localStorage record per deck (which sizes, how many bytes, when). The cache itself is the truth
 * about the pictures; the record is how the screen knows what to show without opening it.
 */
const RECORD_KEY = 'knowthyself.tarot.deck-offline';
const CONCURRENCY = 3;
const storage = () => { try {
    return typeof window !== 'undefined' ? window.localStorage : undefined;
}
catch {
    return undefined;
} };
export function readOfflineRecords() {
    try {
        const raw = storage()?.getItem(RECORD_KEY);
        const value = raw ? JSON.parse(raw) : {};
        if (typeof value !== 'object' || value === null)
            return {};
        const out = {};
        for (const [deckId, record] of Object.entries(value)) {
            const r = record;
            if (getTarotDeckDefinition(deckId) !== null && r && Array.isArray(r.tiers) && typeof r.bytes === 'number' && typeof r.savedAt === 'string') {
                out[deckId] = { tiers: r.tiers.filter((t) => t === 't' || t === 'm' || t === 'l'), bytes: r.bytes, savedAt: r.savedAt };
            }
        }
        return out;
    }
    catch {
        return {};
    }
}
function writeOfflineRecords(records) {
    try {
        storage()?.setItem(RECORD_KEY, JSON.stringify(records));
    }
    catch { /* the cache still holds the pictures; only the label is lost */ }
}
export const offlineSupported = () => typeof caches !== 'undefined';
/** Bytes a save would copy: t + m + cover, and l when asked. */
export function offlineCostBytes(deck, withLarge) {
    const b = deck.assetManifest.bytes;
    return b.t + b.m + b.cover + (withLarge && deck.assetManifest.tiers.l ? b.l : 0);
}
export function deckUrlsToSave(deck, withLarge) {
    const urls = [];
    const cover = deckCoverUrl(deck.deckId);
    if (cover !== null)
        urls.push(cover);
    for (const cardId of Object.keys(deck.cardMappings)) {
        for (const tier of ['t', 'm', ...(withLarge && deck.assetManifest.tiers.l ? ['l'] : [])]) {
            const url = deckArtUrl(deck.deckId, tier, cardId);
            if (url !== null)
                urls.push(url);
        }
    }
    return urls;
}
/** Saves a deck. Resolves true when every picture is in the cache; on any failure removes what it saved and resolves false. */
export async function saveDeckOffline(deckId, { withLarge = false, onProgress } = {}) {
    const deck = getTarotDeckDefinition(deckId);
    if (deck === null || deck.availabilityStatus === 'withheld' || !offlineSupported())
        return false;
    const urls = [...new Set(deckUrlsToSave(deck, withLarge))];
    const cache = await caches.open(DECK_OFFLINE_CACHE_NAME);
    let done = 0;
    let bytes = 0;
    let failed = false;
    const queue = [...urls];
    const worker = async () => {
        while (!failed) {
            const url = queue.shift();
            if (url === undefined)
                return;
            try {
                const response = await fetch(url);
                if (!response.ok)
                    throw new Error(String(response.status));
                const copy = response.clone();
                bytes += (await copy.arrayBuffer()).byteLength;
                await cache.put(url, response);
                done += 1;
                onProgress?.({ done, total: urls.length });
            }
            catch {
                failed = true;
            }
        }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    if (failed) {
        await Promise.all(urls.map((url) => cache.delete(url).catch(() => false)));
        return false;
    }
    writeOfflineRecords({ ...readOfflineRecords(), [deckId]: { tiers: withLarge && deck.assetManifest.tiers.l ? ['t', 'm', 'l'] : ['t', 'm'], bytes, savedAt: new Date().toISOString() } });
    return true;
}
export async function removeDeckOffline(deckId) {
    const deck = getTarotDeckDefinition(deckId);
    if (deck === null || !offlineSupported())
        return;
    const cache = await caches.open(DECK_OFFLINE_CACHE_NAME);
    await Promise.all(deckUrlsToSave(deck, true).map((url) => cache.delete(url).catch(() => false)));
    const { [deckId]: _removed, ...rest } = readOfflineRecords();
    writeOfflineRecords(rest);
}
/**
 * CAN THIS DECK'S PICTURES BE REACHED RIGHT NOW? A bundled deck always can. A downloadable one can when its cover is already in
 * the offline cache, or when the deck host answers. A lean native build with no deck host set, or a phone on a train with the deck
 * never saved, answers false, and the library then declines to apply the deck instead of quietly drawing readings without pictures.
 */
export async function deckReachable(deckId, timeoutMs = 8000) {
    const deck = getTarotDeckDefinition(deckId);
    if (deck === null || deck.availabilityStatus === 'withheld')
        return false;
    if (deck.availabilityStatus === 'bundled')
        return true;
    const cover = deckCoverUrl(deckId);
    if (cover === null)
        return false;
    try {
        if (offlineSupported()) {
            const cache = await caches.open(DECK_OFFLINE_CACHE_NAME);
            if (await cache.match(cover))
                return true;
        }
    }
    catch { /* fall through to the network */ }
    /* A picture needs no CORS permission to be shown, so reachability is asked the way the screens will ask: by loading the cover as an image. */
    if (typeof Image !== 'undefined') {
        return new Promise((resolve) => {
            const image = new Image();
            const timer = setTimeout(() => { image.onload = null; image.onerror = null; resolve(false); }, timeoutMs);
            image.onload = () => { clearTimeout(timer); resolve(true); };
            image.onerror = () => { clearTimeout(timer); resolve(false); };
            image.src = cover;
        });
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(cover, { signal: controller.signal });
        return response.ok;
    }
    catch {
        return false;
    }
    finally {
        clearTimeout(timer);
    }
}
/** Total bytes the saved decks use, from the records (cheap), and the browser's own estimate when it offers one. */
export async function offlineUsage() {
    const savedBytes = Object.values(readOfflineRecords()).reduce((sum, record) => sum + record.bytes, 0);
    try {
        const estimate = await navigator.storage?.estimate?.();
        return { savedBytes, quotaBytes: estimate?.quota ?? null, usedBytes: estimate?.usage ?? null };
    }
    catch {
        return { savedBytes, quotaBytes: null, usedBytes: null };
    }
}
