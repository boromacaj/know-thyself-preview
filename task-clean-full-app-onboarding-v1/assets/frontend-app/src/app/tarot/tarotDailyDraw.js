import { drawTarotSpread } from './tarotDraw.js?v=f9ab0a6';
import { systemTarotClock } from './tarotClock.js?v=f9ab0a6';
import { clearStoredTarotSpread, readStoredTarotSpread, writeStoredTarotSpread, } from './tarotPersistence.js?v=f9ab0a6';
/**
 * IN-FLIGHT DRAWS, SO TWO CALLERS CANNOT BECOME TWO SPREADS.
 *
 * Two components mounting at once - or a screen that asks while it is already
 * asking - would otherwise each find no stored spread, each draw, and each
 * write, and the second write would silently replace a spread the first caller
 * had already been handed. Keyed by local date so that the memo cannot outlive
 * the day it belongs to.
 *
 * The draw itself is synchronous, so within one task this is already safe; the
 * memo is what keeps it safe once a caller wraps it in a promise, which a UI
 * inevitably will.
 */
const inFlight = new Map();
/**
 * Whether a stored spread still governs the current day.
 *
 * Dates are 'YYYY-MM-DD' and compare correctly as plain strings, so this is an
 * ordering question rather than a parsing one.
 *
 *   same day    the stored spread IS today's. Return it.
 *   stored is
 *   LATER than
 *   today       the device has moved backwards - a clock reset, a flight west,
 *               a zone change. Return the stored spread anyway. Drawing again
 *               would hand out a second spread for a day that already had one,
 *               which is how a redraw gets farmed by changing the clock.
 *   stored is
 *   EARLIER     a genuinely new day. A new draw is due.
 */
function storedStillGoverns(storedDate, today) {
    return storedDate >= today;
}
/** Has a spread already been drawn for the reader's current civil day? */
export function hasTodayTarotSpread(options = {}) {
    const clock = options.clock ?? systemTarotClock;
    const today = clock.localDate(clock.now());
    if (inFlight.has(today))
        return true;
    const read = readStoredTarotSpread(options.storage);
    return read.kind === 'ok' && storedStillGoverns(read.spread.localDate, today);
}
/**
 * Today's spread: the one already drawn, or the one drawn now.
 *
 * Returns the full state rather than a bare spread so a caller can tell a fresh
 * draw from a restored one, and can see a diagnostic when a broken record had
 * to be replaced. The spread is returned even when the write fails - the reader
 * gets their reading; it simply will not survive a reload.
 */
export function getTodayTarotState(options = {}) {
    const clock = options.clock ?? systemTarotClock;
    const at = clock.now();
    const today = clock.localDate(at);
    const memoised = inFlight.get(today);
    if (memoised)
        return { status: 'drawn-today', spread: memoised };
    const read = readStoredTarotSpread(options.storage);
    let diagnostic;
    if (read.kind === 'ok') {
        if (storedStillGoverns(read.spread.localDate, today)) {
            inFlight.set(today, read.spread);
            /* A stored date AHEAD of today is worth saying out loud: the reading is
               correct and the device is not. */
            const rolledBack = read.spread.localDate > today;
            return {
                status: 'drawn-today',
                spread: read.spread,
                ...(rolledBack ? { diagnostic: {
                        code: 'clock-rolled-back',
                        detail: `The stored spread is dated ${read.spread.localDate}, ahead of the device's ${today}.`,
                        recovered: true,
                    } } : {}),
            };
        }
        /* Older than today: an ordinary new day. Fall through and draw. */
    }
    else if (read.kind === 'invalid') {
        if (read.diagnostic.code === 'storage-unavailable') {
            /* Nothing can be kept. Still draw - a reading with no persistence is
               better than no reading - and say why it will not come back. */
            diagnostic = { ...read.diagnostic, recovered: true };
        }
        else {
            /*
             * Corrupt, unsupported or from another deck. Discard it whole and draw a
             * replacement: never mend individual cards, because a half-repaired
             * spread looks like something the reader was actually given.
             */
            clearStoredTarotSpread(options.storage);
            diagnostic = { ...read.diagnostic, recovered: true };
        }
    }
    let spread;
    try {
        spread = drawTarotSpread({
            ...(options.random ? { random: options.random } : {}),
            localDate: today,
            drawnAt: at,
            timeZone: clock.timeZone(),
        });
    }
    catch (error) {
        /* The only failure that reaches here is a missing cryptographic source,
           which the draw refuses to work around. There is no spread to give. */
        return {
            status: 'storage-error',
            diagnostic: {
                code: 'crypto-unavailable',
                detail: error instanceof Error ? error.message : String(error),
                recovered: false,
            },
        };
    }
    inFlight.set(today, spread);
    const written = writeStoredTarotSpread(spread, options.storage);
    if (!written && !diagnostic) {
        diagnostic = {
            code: 'storage-write-failed',
            detail: 'The spread was drawn but could not be saved; it will not survive a reload.',
            recovered: true,
        };
    }
    return { status: 'drawn-today', spread, ...(diagnostic ? { diagnostic } : {}) };
}
/** Today's spread, for callers that do not need the state around it. */
export function getTodayTarotSpread(options = {}) {
    return getTodayTarotState(options).spread ?? null;
}
/**
 * The stored spread exactly as saved, without drawing anything.
 *
 * For a caller that wants to show what is already there - a future journal,
 * say - without causing today's draw to happen as a side effect of looking.
 */
export function getStoredTarotSpread(options = {}) {
    const read = readStoredTarotSpread(options.storage);
    return read.kind === 'ok' ? read.spread : null;
}
/**
 * Forget the in-process memo.
 *
 * Tests only, and it deliberately does NOT touch storage: it exists so a test
 * can simulate a fresh page load, where the memo is empty and the stored record
 * is not. Calling it in production would change nothing a reader could see,
 * because the stored spread is what governs the day.
 */
export function resetTarotDailyMemo() {
    inFlight.clear();
}
