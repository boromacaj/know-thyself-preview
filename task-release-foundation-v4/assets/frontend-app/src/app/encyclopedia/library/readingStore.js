/*
 * BOOKMARKS AND READING PROGRESS - local persistence, shaped for a future account sync.
 *
 * Two separate systems with separate records:
 *   - Bookmarks are deliberate: the reader saved an article or one section of it.
 *   - Progress is automatic: where the reader stopped in an article they have opened.
 *
 * WHY THE POSITION IS A SECTION + AN OFFSET, NOT A SCROLL PERCENTAGE
 * A percentage of the page moves whenever the text, the font size or the viewport changes (a phone rotated, an article
 * revised). The stored position is (section id, fraction of the way through that section), so restoring finds the same
 * section by its stable id and the same relative point inside it. The overall percentage is kept only to draw a progress bar
 * and to decide "finished".
 *
 * SYNC-READY
 * Every record carries `updatedAt`; a removed bookmark becomes a tombstone (`deletedAt`) rather than vanishing, so two
 * copies of the state (this device, an account, another device) can be merged record by record with last-write-wins
 * (`mergeReadingStates`). The storage itself is behind a two-method adapter; an account backend replaces the adapter and
 * calls the merge, and nothing above this module changes. Records are not tied to a profile: the library is the same for
 * everybody on the device.
 */
export const STORAGE_KEY = 'kt.encyclopedia.reading.v1';
/** Progress older than the most recent N articles is dropped; bookmarks are never dropped (tombstones after 180 days). */
export const MAX_PROGRESS_RECORDS = 150;
const TOMBSTONE_TTL_MS = 180 * 24 * 60 * 60 * 1000;
export const COMPLETED_AT = 0.96;
export const emptyState = () => ({ version: 1, bookmarks: [], progress: [] });
export const bookmarkKey = (articleId, sectionId) => (sectionId ? `section:${articleId}#${sectionId}` : `article:${articleId}`);
const clamp01 = (value) => (Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0);
/* ------------------------------------------------------------------ parsing (defensive: storage is user-editable) */
export function parseState(serialized) {
    if (!serialized)
        return emptyState();
    try {
        const raw = JSON.parse(serialized);
        if (!raw || raw.version !== 1)
            return emptyState();
        const bookmarks = Array.isArray(raw.bookmarks) ? raw.bookmarks.filter((record) => (Boolean(record) && typeof record.key === 'string' && typeof record.articleId === 'string'
            && (record.sectionId === null || typeof record.sectionId === 'string')
            && Number.isFinite(record.createdAt) && Number.isFinite(record.updatedAt))) : [];
        const progress = Array.isArray(raw.progress) ? raw.progress.filter((record) => (Boolean(record) && typeof record.articleId === 'string' && typeof record.sectionId === 'string'
            && Number.isFinite(record.sectionOffset) && Number.isFinite(record.progress) && Number.isFinite(record.updatedAt))).map((record) => ({ ...record, sectionOffset: clamp01(record.sectionOffset), progress: clamp01(record.progress), completed: Boolean(record.completed) })) : [];
        return { version: 1, bookmarks, progress };
    }
    catch {
        return emptyState();
    }
}
/* ------------------------------------------------------------------ pure transitions */
export function toggleBookmark(state, articleId, sectionId, now) {
    const key = bookmarkKey(articleId, sectionId);
    const existing = state.bookmarks.find((record) => record.key === key);
    const others = state.bookmarks.filter((record) => record.key !== key);
    if (existing && !existing.deletedAt)
        return { ...state, bookmarks: [...others, { ...existing, updatedAt: now, deletedAt: now }] };
    return { ...state, bookmarks: [...others, { key, articleId, sectionId, createdAt: existing?.createdAt && !existing.deletedAt ? existing.createdAt : now, updatedAt: now }] };
}
export function isBookmarked(state, articleId, sectionId) {
    const record = state.bookmarks.find((entry) => entry.key === bookmarkKey(articleId, sectionId));
    return Boolean(record && !record.deletedAt);
}
/** Live bookmarks, newest first. */
export const liveBookmarks = (state) => state.bookmarks.filter((record) => !record.deletedAt).sort((a, b) => b.createdAt - a.createdAt);
export function recordProgress(state, input, now) {
    const previous = state.progress.find((record) => record.articleId === input.articleId);
    const progress = clamp01(input.progress);
    /* Once finished, an article stays finished: scrolling back up to re-read a paragraph does not turn it back into "unfinished". */
    const completed = Boolean(previous?.completed) || progress >= COMPLETED_AT;
    const record = { articleId: input.articleId, sectionId: input.sectionId, sectionOffset: clamp01(input.sectionOffset), progress, completed, updatedAt: now };
    const rest = state.progress.filter((entry) => entry.articleId !== input.articleId);
    const trimmed = [record, ...rest].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_PROGRESS_RECORDS);
    return { ...state, progress: trimmed };
}
export const progressFor = (state, articleId) => state.progress.find((record) => record.articleId === articleId) ?? null;
/** Started but not finished, most recent first: the "Continue reading" list. A record barely past the top is not "started". */
export const unfinished = (state) => state.progress.filter((record) => !record.completed && record.progress >= 0.04).sort((a, b) => b.updatedAt - a.updatedAt);
/* ------------------------------------------------------------------ merge (for a future account sync) */
/** Merge two states record by record, last write wins; tombstones win over older live records. Pure and commutative. */
export function mergeReadingStates(a, b, now = Date.now()) {
    const bookmarks = new Map();
    for (const record of [...a.bookmarks, ...b.bookmarks]) {
        const current = bookmarks.get(record.key);
        if (!current || record.updatedAt > current.updatedAt || (record.updatedAt === current.updatedAt && Boolean(record.deletedAt) && !current.deletedAt))
            bookmarks.set(record.key, record);
    }
    const progress = new Map();
    for (const record of [...a.progress, ...b.progress]) {
        const current = progress.get(record.articleId);
        if (!current || record.updatedAt > current.updatedAt)
            progress.set(record.articleId, { ...record, completed: record.completed || Boolean(current?.completed) });
        else if (record.completed && !current.completed)
            progress.set(record.articleId, { ...current, completed: true });
    }
    return {
        version: 1,
        bookmarks: [...bookmarks.values()].filter((record) => !record.deletedAt || now - record.deletedAt < TOMBSTONE_TTL_MS).sort((x, y) => x.key.localeCompare(y.key)),
        progress: [...progress.values()].sort((x, y) => y.updatedAt - x.updatedAt).slice(0, MAX_PROGRESS_RECORDS),
    };
}
/* ------------------------------------------------------------------ the store */
export const localStorageAdapter = (key = STORAGE_KEY) => ({
    read: () => { try {
        return globalThis.localStorage?.getItem(key) ?? null;
    }
    catch {
        return null;
    } },
    write: (serialized) => { try {
        globalThis.localStorage?.setItem(key, serialized);
    }
    catch { /* quota or privacy mode: reading still works, it is just not remembered */ } },
});
export class ReadingStore {
    adapter;
    clock;
    state;
    pendingWrite = null;
    listeners = new Set();
    constructor(adapter = localStorageAdapter(), clock = Date.now) {
        this.adapter = adapter;
        this.clock = clock;
        this.state = parseState(adapter.read());
    }
    snapshot() { return this.state; }
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
    toggleBookmark(articleId, sectionId) {
        this.state = toggleBookmark(this.state, articleId, sectionId, this.clock());
        this.flush();
        this.emit();
        return isBookmarked(this.state, articleId, sectionId);
    }
    isBookmarked(articleId, sectionId = null) { return isBookmarked(this.state, articleId, sectionId); }
    /** Progress is written often while scrolling; storage is touched at most every 600 ms, and on `flush()`. */
    recordProgress(input) {
        this.state = recordProgress(this.state, input, this.clock());
        if (this.pendingWrite === null)
            this.pendingWrite = setTimeout(() => this.flush(), 600);
    }
    progressFor(articleId) { return progressFor(this.state, articleId); }
    flush() {
        if (this.pendingWrite !== null) {
            clearTimeout(this.pendingWrite);
            this.pendingWrite = null;
        }
        this.adapter.write(JSON.stringify(this.state));
    }
    /** Replace the state with a merge of it and another copy (the hook a future account sync calls). */
    mergeFrom(other) {
        this.state = mergeReadingStates(this.state, other, this.clock());
        this.flush();
        this.emit();
    }
    emit() { for (const listener of this.listeners)
        listener(); }
}
