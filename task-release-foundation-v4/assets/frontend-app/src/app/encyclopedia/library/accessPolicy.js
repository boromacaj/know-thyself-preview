/*
 * ENCYCLOPEDIA ACCESS POLICY - the ONE place that decides what is free and what is premium.
 *
 * Product direction (not yet an approved entitlement model):
 *     FREE - understand the pieces.            PRO - discover how they connect within you.
 * For the Encyclopedia that means foundational definitions are free and the deeper, position-specific reference material is
 * premium. Every decision below is a table entry, so the owner can move a category between tiers without touching any
 * component, and no component checks a tier on its own: the reader asks `articleAccess()` and renders what it returns.
 *
 * WHAT V1 DOES AND DOES NOT DO
 *   - There are no purchases, subscriptions or checkout of any kind. `currentEntitlement()` is always 'free' until a real
 *     entitlement source exists; the locked view explains PRO and offers nothing to buy.
 *   - Bookmarks, reading progress and search are never gated (they work on locked articles too: a reader can save one).
 *   - A QA/owner PREVIEW switch unlocks everything for a reviewer, but ONLY in a build that explicitly opted in to the dev/QA tooling
 *     (VITE_ENABLE_DEV_PROFILE_PRESETS=true). It is a preview aid, not an entitlement: it never changes `currentEntitlement()`, and
 *     it is not derived from the QA profile SET - that names which people the QA menu carries and is 'owner' in every default local
 *     build, including the one `cap sync` packages into the Android app, so it says nothing about whether the build is a preview.
 *     A deployed production build (presets off) cannot offer, read or store the switch, whatever the address or browser storage says.
 *
 * SECURITY NOTE - a lock in a standalone client is presentation, not protection. The article text ships in the app's
 * JavaScript, so anyone who opens the bundle can read premium content. Closing the preview switch in production is an
 * ACCESS-CONTROL fix (the app's own UI no longer opens premium articles to a free reader), not CONFIDENTIALITY: someone who reads
 * the bundle, or edits the page in their own browser, still has the text. Real enforcement needs premium articles to be served
 * from an authenticated endpoint (or delivered encrypted per entitlement) and verified server-side; see
 * docs/encyclopedia/ENCYCLOPEDIA_V1.md, "Entitlement enforcement". This module's interface (articleAccess / canRead) is
 * the seam that enforcement will plug into.
 */
import { isDevProfilePresetsEnabled, readViteEnvironment } from '../../config/runtimeConfig.js?v=4cd804d';
export const ENCYCLOPEDIA_ACCESS_POLICY = {
    mode: 'enforced',
    categories: {
        'astrology.foundations': 'free',
        'astrology.sign': 'free',
        'astrology.planet': 'free',
        'astrology.house': 'free',
        'astrology.aspect': 'free',
        'astrology.sun': 'free',
        'astrology.moon-phase': 'free',
        'astrology.moon': 'premium',
        'astrology.ascendant': 'premium',
        'astrology.descendant': 'premium',
        'astrology.point': 'premium',
        'numerology.foundations': 'free',
        'numerology.number': 'free',
        'numerology.position': 'free',
        'numerology.life-path': 'free',
        'numerology.expression': 'premium',
        'numerology.soul-urge': 'premium',
        'numerology.personality': 'premium',
        'numerology.birthday': 'premium',
        'numerology.personal-year': 'premium',
        'numerology.karmic-debt': 'premium',
        'human-design.foundations': 'free',
        'human-design.type': 'free',
        'human-design.strategy': 'free',
        'human-design.authority': 'free',
        'human-design.center': 'free',
        'human-design.definition': 'free',
        'human-design.profile': 'free',
        'human-design.line': 'premium',
        'human-design.channel': 'premium',
        'human-design.gate': 'premium',
        'bazi.foundations': 'free',
        'bazi.element': 'free',
        'bazi.stem': 'free',
        'bazi.branch': 'free',
        'bazi.pillar': 'free',
        'bazi.ten-god': 'premium',
        'bazi.relationship': 'premium',
        'tarot.foundations': 'free',
        'tarot.suit': 'free',
        'tarot.major': 'free',
        'tarot.spread': 'free',
        'tarot.wands': 'premium',
        'tarot.cups': 'premium',
        'tarot.swords': 'premium',
        'tarot.pentacles': 'premium',
        'synthesis.pillar': 'free',
        'synthesis.guide': 'free',
    },
    /* One sample of each premium category is free, so a free reader can see what the deeper material is like. */
    articles: {
        'astrology.moon.cancer': 'free',
        'astrology.ascendant.libra': 'free',
        'numerology.expression.1': 'free',
        'human-design.gate.1': 'free',
        'human-design.channel.1-8': 'free',
        'bazi.ten-god.direct-resource': 'free',
        'tarot.cups.ace': 'free',
    },
};
/* ------------------------------------------------------------------ entitlement + review */
/** Where a real entitlement will come from. V1 has no purchases, so every reader is on the free tier. */
export function currentEntitlement() {
    return 'free';
}
const REVIEW_KEY = 'kt.encyclopedia.review-unlock';
/**
 * Whether a build may offer the preview unlock at all: only when it explicitly opted in to the dev/QA tooling. Pure, so the production
 * pipeline's output can be put through it in a test. Deliberately NOT `qaProfileSet === 'owner'`: that is true in a plain local build (and
 * so in the Android bundle `cap sync` copies from one), where no one opted in to anything.
 */
export const isReviewUnlockAvailable = (environment = readViteEnvironment()) => isDevProfilePresetsEnabled(environment);
export const reviewUnlockAvailable = () => isReviewUnlockAvailable();
/**
 * Owner/QA preview: unlock all content for this browser session. Turned on by `?library-review=on` in the address (or the
 * switch shown in the library's About panel in a dev/QA build), off by `?library-review=off`. sessionStorage, so it
 * never outlives the tab and never reaches a reader's device by accident. In a build that did not opt in, the address, the
 * stored flag and the switch are all inert: nothing is read, written or shown.
 */
export function reviewUnlocked() {
    if (!reviewUnlockAvailable())
        return false;
    try {
        const query = new URLSearchParams(globalThis.location?.search ?? '').get('library-review');
        if (query === 'on')
            globalThis.sessionStorage?.setItem(REVIEW_KEY, 'on');
        if (query === 'off')
            globalThis.sessionStorage?.removeItem(REVIEW_KEY);
        return globalThis.sessionStorage?.getItem(REVIEW_KEY) === 'on';
    }
    catch {
        return false;
    }
}
export function setReviewUnlocked(on) {
    if (!reviewUnlockAvailable())
        return;
    try {
        if (on)
            globalThis.sessionStorage?.setItem(REVIEW_KEY, 'on');
        else
            globalThis.sessionStorage?.removeItem(REVIEW_KEY);
    }
    catch { /* storage unavailable: the switch simply does nothing */ }
}
/* ------------------------------------------------------------------ the decision */
export function tierOf(article, policy = ENCYCLOPEDIA_ACCESS_POLICY) {
    return policy.articles[article.id] ?? policy.categories[`${article.library}.${article.category}`] ?? 'premium';
}
export function categoryTier(library, category, policy = ENCYCLOPEDIA_ACCESS_POLICY) {
    return policy.categories[`${library}.${category}`] ?? 'premium';
}
export const liveAccessContext = () => ({ entitlement: currentEntitlement(), review: reviewUnlocked(), policy: ENCYCLOPEDIA_ACCESS_POLICY });
/** Pure: the access decision for one article in one context. */
export function articleAccess(article, context = liveAccessContext()) {
    const tier = tierOf(article, context.policy);
    if (tier === 'free')
        return { tier, readable: true, via: 'free' };
    if (context.entitlement === 'pro')
        return { tier, readable: true, via: 'pro' };
    if (context.policy.mode === 'open')
        return { tier, readable: true, via: 'open-policy' };
    if (context.review)
        return { tier, readable: true, via: 'review' };
    return { tier, readable: false, via: 'locked' };
}
