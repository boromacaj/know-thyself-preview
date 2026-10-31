/*
 * QA DIAGNOSTICS - PRIVACY LAYER (pure, DOM-free, unit-tested).
 *
 * The report may contain structure, geometry, state identifiers and sanitized errors. It must never contain what a person typed or
 * picked: names, birth date or time, birthplace, coordinates, form values, cookies, tokens, storage contents.
 *
 * Three independent defences, so one miss is not a leak:
 *   1. NOTHING READS CONTENT. The collector never touches textContent / innerText / value. Elements are described by tag, id, a
 *      filtered class list and an allowlist of state attributes; a form field is described only by whether it holds a value.
 *   2. PATTERN REDACTION. Every free-text string that does get in (an error message, a console line, a URL) passes sanitizeText():
 *      query strings and fragments, e-mail addresses, dates, clock times, coordinate pairs, long decimals and long digit runs go.
 *   3. LIVE DENY-LIST. The words currently held by the page's own text fields are remembered IN MEMORY ONLY (never exported, never
 *      stored) and scrubbed out of every free-text string in the finished report, so a name that leaked into an exception message
 *      is removed even though no pattern would recognise it.
 */
export const REDACTED = '[redacted]';
export const INPUT_MASK = '[input]';
const URL_WITH_TAIL = /(https?:\/\/[^\s"'<>?#]*)([?#][^\s"'<>]*)?/gi;
const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const ISO_DATE = /\b\d{4}[-/.]\d{1,2}[-/.]\d{1,2}\b/g;
const DMY_DATE = /\b\d{1,2}[-/.]\s?\d{1,2}[-/.]\s?\d{2,4}\b/g;
const CLOCK_TIME = /\b\d{1,2}:\d{2}(?::\d{2})?(?:\s?[ap]\.?m\.?)?(?![\d])/gi;
const COORD_PAIR = /-?\d{1,3}\.\d{3,}\s*[,;/ ]\s*-?\d{1,3}\.\d{3,}/g;
const LONG_DECIMAL = /-?\d{1,3}\.\d{4,}/g;
const LONG_DIGITS = /\b\d{6,}\b/g;
/* key=value secrets and long mixed letter/digit strings (tokens, session ids). Build stamps are 7-12 hex characters and are not touched. */
const SECRET_PAIR = /\b(?:token|key|secret|password|passwd|auth|authorization|session|sid|signature|sig|code|bearer|cookie)\s*[=:]\s*\S+/gi;
/* A token is one unbroken run of letters and digits (a hyphenated slug such as a branch name is words, not a secret), or a UUID. */
const LONG_TOKEN = /\b(?=[A-Za-z0-9]*\d)(?=[A-Za-z0-9]*[A-Za-z])[A-Za-z0-9]{20,}\b|\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
/** Tokens that describe structure; a person typing one of them must not corrupt the readable report. */
const STRUCTURAL_WORDS = new Set([
    'div', 'span', 'button', 'input', 'form', 'body', 'html', 'null', 'true', 'false', 'none', 'auto', 'hidden', 'visible',
    'fixed', 'absolute', 'relative', 'static', 'sticky', 'block', 'flex', 'grid', 'inline', 'open', 'text', 'date', 'time',
    'number', 'error', 'script', 'style', 'link', 'image', 'canvas', 'video', 'undefined', 'object', 'function', 'string',
    'element', 'event', 'touch', 'click', 'focus', 'scroll', 'resize', 'state', 'step', 'name', 'type', 'value', 'select',
    'week', 'month', 'year', 'day', 'hour', 'minute', 'search', 'place', 'earth', 'vessel', 'profile', 'panel', 'layer',
    'safari', 'chrome', 'webkit', 'iphone', 'ios', 'mobile', 'version', 'like', 'gecko', 'apple', 'mozilla', 'android',
]);
const escapeForRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** The pattern rules only: keeps line breaks and indentation and does not shorten. Used on whole multi-line text. */
export function redactPatterns(text) {
    return text
        .replace(URL_WITH_TAIL, (_all, base, tail) => (tail ? `${base}?${REDACTED}` : base))
        .replace(EMAIL, REDACTED)
        .replace(SECRET_PAIR, REDACTED)
        .replace(LONG_TOKEN, REDACTED)
        .replace(COORD_PAIR, REDACTED)
        .replace(ISO_DATE, REDACTED)
        .replace(DMY_DATE, REDACTED)
        .replace(CLOCK_TIME, REDACTED)
        .replace(LONG_DECIMAL, REDACTED)
        .replace(LONG_DIGITS, REDACTED);
}
/** Strips what must never leave the device from one free-text string, then bounds its length. */
export function sanitizeText(input, maxLength = 240) {
    const raw = typeof input === 'string' ? input : input instanceof Error ? `${input.name}: ${input.message}` : safeString(input);
    const text = redactPatterns(raw).replace(/\s+/g, ' ').trim();
    return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}
function safeString(value) {
    try {
        if (value === null)
            return 'null';
        if (value === undefined)
            return 'undefined';
        if (typeof value === 'object')
            return Object.prototype.toString.call(value);
        return String(value);
    }
    catch {
        return '[unprintable]';
    }
}
/** A URL reduced to origin + path. Query and fragment are dropped; only the fact that they existed is kept. */
export function sanitizeUrl(raw) {
    const text = typeof raw === 'string' ? raw : safeString(raw);
    const hadQuery = text.includes('?');
    const hadHash = text.includes('#');
    const cut = text.split('#')[0].split('?')[0];
    return { url: sanitizeText(cut, 200), hadQuery, hadHash };
}
/** A route-like fragment (#/forecast, #menu) is structure and is kept; anything else is reported only as "present". */
export function sanitizeHash(hash) {
    if (!hash)
        return '';
    return /^#[A-Za-z0-9/_-]{1,40}$/.test(hash) ? hash : '#[present]';
}
/** The last path segment of a URL, without query: enough to tell WHICH asset failed, never a parameter. */
export function assetName(raw) {
    const { url } = sanitizeUrl(raw);
    const segment = url.split('/').filter(Boolean).pop() ?? '';
    return segment.slice(0, 80);
}
/** Where a module sits in the app (app/premium-earth/ambient/ambientEarthSession.js): the path under the module root, no host, no query.
 *  assetName() alone cannot tell two modules of the same file name apart, and says nothing of WHICH part of the app failed to load. */
export function modulePath(raw) {
    const { url } = sanitizeUrl(raw);
    const marker = 'assets/frontend-app/src/';
    const at = url.indexOf(marker);
    return (at >= 0 ? url.slice(at + marker.length) : assetName(url)).slice(0, 120);
}
const CLASS_TOKEN = /^[A-Za-z][A-Za-z0-9_-]{0,39}$/;
const ID_TOKEN = /^[A-Za-z][A-Za-z0-9_-]{0,39}$/;
/**
 * Structural description of one element, for example `input#place-query[type=text]` or `button.vessel-choice.is-focused`.
 * Never includes text, value, placeholder, title, aria-label, href or any attribute outside the small allowlist below.
 */
export function describeElement(element) {
    if (!element || typeof element.tagName !== 'string')
        return '(none)';
    const tag = element.tagName.toLowerCase();
    let out = tag;
    if (element.id && ID_TOKEN.test(element.id) && !/\d{5,}/.test(element.id))
        out += `#${element.id}`;
    const classes = [];
    const list = element.classList;
    if (list) {
        for (let index = 0; index < list.length && classes.length < 4; index += 1) {
            const token = list.item(index);
            // The carousel option classes name the body a person is choosing (vessel-choice-female): that is profile information, so the
            // description keeps the structure ("a vessel choice") and drops which one.
            if (token && CLASS_TOKEN.test(token) && !/\d{4,}/.test(token))
                classes.push(token.replace(/^(vessel-(?:choice|symbol))-(?:male|female|nonbinary|neutral|undefined)$/, '$1-x'));
        }
    }
    if (classes.length)
        out += `.${classes.join('.')}`;
    if (typeof element.getAttribute === 'function') {
        const type = element.getAttribute('type');
        if (type && /^[a-z-]{1,16}$/.test(type))
            out += `[type=${type}]`;
        const role = element.getAttribute('role');
        if (role && /^[a-z-]{1,24}$/.test(role))
            out += `[role=${role}]`;
    }
    return out.length > 110 ? `${out.slice(0, 109)}…` : out;
}
/** Attributes whose values are state identifiers of the app's own state machine; every other data-* value is ignored. */
export const STATE_ATTRIBUTE_ALLOWLIST = Object.freeze([
    'data-state', 'data-intro-state', 'data-warp-intro', 'data-step', 'data-picker-mode', 'data-pillar-stage', 'data-pillar-active',
    'data-profile-state', 'data-keyboard-open', 'data-keyboard-top', 'data-keyboard-viewport-owner',
    'data-vessel-swap-phase', 'data-kt-route', 'data-kt-search-reveal', 'data-kt-intro-reveal', 'data-overview-edit',
    'data-ios-webkit-recovery', 'data-earth-mode', 'data-intro-recovered', 'data-kt-theme-effective', 'data-native-earth-gesture-routing',
]);
/** A state value is kept only when it looks like an identifier; free-looking text becomes "[text]". */
export function sanitizeStateValue(value) {
    if (value === null || value === undefined)
        return '(unset)';
    return /^[A-Za-z0-9_.:/-]{0,48}$/.test(value) && !/\d{6,}/.test(value) ? value : '[text]';
}
/**
 * The live deny-list. Remembers (in memory only) the words the page's own text fields currently hold and masks them in any string.
 * It is NEVER serialised: `size` and `scrub` are its whole outside surface.
 */
export class PrivacyGuard {
    tokens = new Set();
    pattern = null;
    static maxTokens = 96;
    get size() {
        return this.tokens.size;
    }
    /** Remember the words of one field's current value. Short fragments and structural words are ignored. */
    remember(value) {
        if (typeof value !== 'string')
            return;
        const whole = value.trim();
        if (whole.length < 3)
            return;
        const candidates = new Set([whole.toLowerCase()]);
        for (const word of whole.split(/[^\p{L}\p{N}]+/u)) {
            const lowered = word.toLowerCase();
            if (/^\d+$/.test(lowered) ? lowered.length >= 4 : lowered.length >= 3)
                candidates.add(lowered);
        }
        let changed = false;
        for (const candidate of candidates) {
            if (STRUCTURAL_WORDS.has(candidate) || this.tokens.has(candidate))
                continue;
            if (this.tokens.size >= PrivacyGuard.maxTokens)
                break;
            this.tokens.add(candidate);
            changed = true;
        }
        if (changed)
            this.pattern = null;
    }
    /** Replaces every remembered word in `text` with the input mask. */
    scrub(text) {
        if (!this.tokens.size || !text)
            return text;
        if (!this.pattern) {
            const alternatives = [...this.tokens].sort((a, b) => b.length - a.length).map(escapeForRegExp).join('|');
            try {
                this.pattern = new RegExp(`(^|[^\\p{L}\\p{N}_])(?:${alternatives})(?![\\p{L}\\p{N}_])`, 'giu');
            }
            catch {
                this.pattern = new RegExp(`(^|\\W)(?:${alternatives})(?!\\w)`, 'gi');
            }
        }
        return text.replace(this.pattern, `$1${INPUT_MASK}`);
    }
}
/** Keys whose string values are exempt from the deny-list because they are identifiers, not free text (build stamps, UA, selectors). */
const STRUCTURAL_KEYS = new Set([
    'sha', 'build', 'ua', 'sel', 'k', 'kind', 'key', 'id', 'cat', 'sev', 'tag', 'desc', 'tgt', 'hit', 'chain', 'path', 'host', 'slug',
    'attr', 'type', 'reason', 'phase', 'browser', 'device', 'engine', 'os', 'iosVersion', 'platform', 'lang', 'version', 'mode', 'name',
]);
/** Machine-generated strings that are not user data and that the pattern rules would only damage (a timestamp, the user agent). */
const RAW_KEYS = new Set(['iso', 'ua']);
/** Final pass over the whole report: deny-list scrub on free-text leaves, pattern sanitising on every string. Returns a new tree. */
export function scrubDeep(value, guard, key = '') {
    if (typeof value === 'string') {
        if (RAW_KEYS.has(key))
            return value.slice(0, 400);
        const pattern = sanitizeText(value, 600);
        return (STRUCTURAL_KEYS.has(key) ? pattern : guard.scrub(pattern));
    }
    if (Array.isArray(value))
        return value.map((item) => scrubDeep(item, guard, key));
    if (value && typeof value === 'object') {
        const out = {};
        for (const [childKey, child] of Object.entries(value))
            out[childKey] = scrubDeep(child, guard, childKey);
        return out;
    }
    return value;
}
