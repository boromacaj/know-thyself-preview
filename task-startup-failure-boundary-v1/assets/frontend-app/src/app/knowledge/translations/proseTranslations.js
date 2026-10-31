/**
 * Slovak.
 *
 * Deliberately small and honest. These are the units a reader meets FIRST on
 * each pillar - the opening of the reading, where a fallback to English would
 * be most jarring - plus the cross-pillar commentary that frames the whole
 * synthesis. Everything not listed renders in English and is reported as such
 * by the coverage helper below rather than being quietly hidden.
 *
 * Canonical terms are not translated: Day Master, BaZi, Human Design, the type
 * and authority names, gate and channel numbers, and the pinyin stem and branch
 * names. Those are how a reader checks this reading against any other source.
 *
 * ZODIAC AND PLANET NAMES ARE TRANSLATED, and an earlier version of this comment
 * said the opposite. The reason it gave - that a Slovak name would sit beside an
 * English value from the engine - stopped being true once the interface gained
 * its own Slovak forms: the pillar card above the prose already reads
 * "Slnko v Panne 4°35'", so English sign names in the paragraph underneath were
 * the thing that looked wrong. See SLOVAK_STYLE.md, which is the authority.
 *
 * ON "chart": the reading says `mapa` for every system, because the product's
 * own metaphor is a map of a person and because a BaZi chart or a BodyGraph is
 * not a horoscope. `horoskop` is used only in the encyclopedia's
 * astrology-specific entries, where it is the ordinary Slovak word.
 */
/*
 * THE BATCHES.
 *
 * The reading is ~107,000 words. It is translated in batches, each owned by one
 * file so two passes can never collide in the same place.
 *
 * Ordering within a batch file is irrelevant; ordering BETWEEN them is not, and
 * is fixed here rather than by import order elsewhere. To override a single
 * unit deliberately, spread a table of your own after these - last spread wins.
 *
 * There WAS such an override here, for the paragraph the synthesis opens on. It
 * is gone, and both reasons are worth keeping: its key named a unit kind that
 * does not exist, so it never rendered at all; and when the key was fixed it
 * turned out to have two paragraphs against the English three, because it had
 * been written against an older version of that unit. The batch translation was
 * correct on both counts. An override has to be maintained against the English
 * like everything else, and one that silently is not is worse than none.
 */
/*
 * THE TRANSLATED PROSE ARRIVES WHEN THE LANGUAGE DOES.
 *
 * The Slovak reading is about nine hundred kilobytes of authored text. It used
 * to be imported at the top of this file, so every session downloaded all of it
 * - an English reader paid for a reading they will never be shown. The tables
 * below therefore start EMPTY and are filled by one dynamic import of
 * ./sk/skProse.js, which is the only module that names the batches.
 *
 * Nothing about a lookup changed. An empty table is the case this file has
 * always handled: proseTranslation() returns null and the reader gets the
 * English prose, which locale.ts calls the only failure mode that leaves the
 * product usable. So a Slovak reader composing before the corpus lands sees
 * correct English for those few hundred milliseconds rather than a placeholder,
 * and the language switch re-announces itself when the text is in, which is
 * what puts the Slovak on screen.
 *
 * The shape is the one the given-names corpus already uses: a preload that can
 * be called repeatedly, a ready flag, and a when-ready for the caller that has
 * to wait. See app/given-name/givenNameReading.ts.
 */
const TABLES = {};
const OVERLAY_TABLES = {};
let pending = null;
/** True when a locale needs no corpus, or its corpus is already in memory. */
export function proseTranslationsReady(locale) {
    return locale !== 'sk' || TABLES.sk !== undefined;
}
/** Start (or join) the load. Safe to call repeatedly; resolves either way. */
export function preloadProseTranslations(locale) {
    if (proseTranslationsReady(locale))
        return Promise.resolve();
    if (!pending) {
        pending = import('./sk/skProse.js?v=2ea79e9').then((corpus) => {
            TABLES.sk = corpus.SK_PROSE;
            OVERLAY_TABLES.sk = corpus.SK_OVERLAY_PROSE;
        }).catch(() => {
            /* Left unloaded on purpose: every lookup already falls back to English,
               so a failed load costs the reader their language, not their reading.
               The next call tries again. */
            pending = null;
        });
    }
    return pending;
}
/** Run `onReady` once the corpus is available - now, if it already is. */
export function whenProseTranslationsReady(locale, onReady) {
    if (proseTranslationsReady(locale)) {
        onReady();
        return;
    }
    void preloadProseTranslations(locale).then(() => {
        if (proseTranslationsReady(locale))
            onReady();
    });
}
/** The translation for a unit in a locale, or null when there is none. */
export function proseTranslation(unitId, locale) {
    return TABLES[locale]?.[unitId] ?? null;
}
/**
 * Every unit id a locale has text for.
 *
 * Exported so a test can check the keys resolve. A key with a typo in it is
 * invisible from the inside: the table looks complete, coverage counts it, and
 * the reader silently gets English. That happened once already; see the comment
 * on the hand-written entry above.
 */
export function translatedUnitIds(locale) {
    return Object.keys(TABLES[locale] ?? {});
}
/*
 * OVERLAY PROSE, TRANSLATED BY OVERLAY ID.
 *
 * A unit's translation covers the BASE reading. What an overlay wove in is
 * conditional text that only some charts ever see, so it is keyed separately
 * and falls back on its own: an untranslated overlay shows its English
 * paragraph beneath a translated base rather than disappearing, which is what
 * happened before this table existed.
 *
 * COMPOSED OVERLAYS ARE NOT IN HERE, and cannot be. An overlay whose prose is a
 * function builds its paragraph at read time from parts, so there is no fixed
 * string to key; those compose in the reader's language directly - see
 * numerologyInteractions.ts, which selects its frames by active locale. This
 * table is for the ones whose prose is written out.
 */
/** The translation for one overlay in a locale, or null when there is none. */
export function overlayTranslation(overlayId, locale) {
    return OVERLAY_TABLES[locale]?.[overlayId] ?? null;
}
/** Every overlay id a locale has text for. Exported so a test can check them. */
export function translatedOverlayIds(locale) {
    return Object.keys(OVERLAY_TABLES[locale] ?? {});
}
/** How many units a locale has text for. Used to report coverage honestly. */
export function translatedUnitCount(locale) {
    return Object.keys(TABLES[locale] ?? {}).length;
}
/** Whether a locale has any prose translations at all. */
export function hasProseTranslations(locale) {
    return translatedUnitCount(locale) > 0;
}
