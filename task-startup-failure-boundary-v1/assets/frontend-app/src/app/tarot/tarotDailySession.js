import { systemTarotClock } from './tarotClock.js?v=2ea79e9';
import { startTarotSession, resolveTarotJumper, selectTarotPosition, } from './tarotDrawSession.js?v=2ea79e9';
import { DEFAULT_TAROT_JUMPER_POLICY } from './tarotJumperPolicy.js?v=2ea79e9';
import { DEFAULT_TAROT_ORIENTATION_POLICY, } from './tarotOrientationPolicy.js?v=2ea79e9';
import { readStoredTarotSession, writeStoredTarotSession, } from './tarotSessionPersistence.js?v=2ea79e9';
import { commitTarotDeck } from './tarotShuffle.js?v=2ea79e9';
/**
 * IN-PROCESS MEMO, keyed by local date.
 *
 * Two components mounting at once would otherwise each find no stored session,
 * each commit a deck, and each write - and the second write would replace a deck
 * the first caller had already shown somebody. Keyed by date so it cannot outlive
 * the day.
 */
const inFlight = new Map();
function storedStillGoverns(storedDate, today) {
    /* Dates are 'YYYY-MM-DD' and compare correctly as strings. A stored date AHEAD
       of today means the device moved backwards; the stored session still governs,
       because drawing again is how a redraw gets farmed by changing the clock. */
    return storedDate >= today;
}
/**
 * Today's session: the one in progress, the one already finished, or a new one.
 *
 * The only entry point that may commit a deck. Everything else in this module
 * takes a session and returns a session.
 */
export function getTodayTarotSession(options = {}) {
    const clock = options.clock ?? systemTarotClock;
    const at = clock.now();
    const today = clock.localDate(at);
    const memoised = inFlight.get(today);
    if (memoised) {
        return { status: statusOf(memoised), session: memoised, freshlyCommitted: false };
    }
    const read = readStoredTarotSession(options.storage);
    let diagnostic;
    if (read.kind === 'ok') {
        if (storedStillGoverns(read.session.localDate, today)) {
            inFlight.set(today, read.session);
            const rolledBack = read.session.localDate > today;
            return {
                status: statusOf(read.session),
                session: read.session,
                freshlyCommitted: false,
                ...(rolledBack ? { diagnostic: {
                        code: 'clock-rolled-back',
                        detail: `The stored session is dated ${read.session.localDate}, ahead of the device's ${today}.`,
                        recovered: true,
                    } } : {}),
            };
        }
        /* Older than today: an ordinary new day. Fall through and commit. */
    }
    else if (read.kind === 'invalid') {
        /* Storage unavailable is survivable - the session runs in memory and says so.
           Anything else means the record is unusable, so it is replaced whole. */
        diagnostic = { ...read.diagnostic, recovered: true };
    }
    const orientationPolicy = options.orientationPolicy ?? DEFAULT_TAROT_ORIENTATION_POLICY;
    const jumperPolicy = options.jumperPolicy ?? DEFAULT_TAROT_JUMPER_POLICY;
    let session;
    try {
        const deck = commitTarotDeck({
            ...(options.random ? { random: options.random } : {}),
            orientationPolicy,
            jumperPolicy,
        });
        session = startTarotSession({
            deck,
            localDate: today,
            startedAt: at,
            timeZone: clock.timeZone(),
            rejectedFate: jumperPolicy.rejectedFate,
            acceptedFate: jumperPolicy.acceptedFate,
        });
    }
    catch (error) {
        /* The only failure that reaches here is a missing cryptographic source,
           which the shuffle refuses to work around. There is no deck to give. */
        return {
            status: 'unavailable',
            freshlyCommitted: false,
            diagnostic: {
                code: 'crypto-unavailable',
                detail: error instanceof Error ? error.message : String(error),
                recovered: false,
            },
        };
    }
    inFlight.set(today, session);
    const written = writeStoredTarotSession(session, options.storage);
    if (!written && !diagnostic) {
        diagnostic = {
            code: 'storage-write-failed',
            detail: 'The deck was committed but could not be saved; it will not survive a reload.',
            recovered: true,
        };
    }
    return {
        status: statusOf(session),
        session,
        freshlyCommitted: true,
        ...(diagnostic ? { diagnostic } : {}),
    };
}
const statusOf = (session) => (session.selections.length >= 3 ? 'complete' : 'in-progress');
/**
 * Apply a move and persist the result.
 *
 * ADVANCING IS THE ONLY WAY THE STORED SESSION CHANGES, and it can only ever
 * replace a session with one derived from the same committed deck - both moves
 * are pure functions over it. So there is no write path that can introduce a
 * different deck for a day that already has one.
 *
 * Returns the refusal unchanged when the move is invalid, and writes nothing.
 */
function advance(session, result, options) {
    if (!result.ok)
        return { ok: false, refusal: result.refusal, session };
    inFlight.set(result.session.localDate, result.session);
    const written = writeStoredTarotSession(result.session, options.storage);
    return {
        ok: true,
        session: result.session,
        ...(written ? {} : { diagnostic: {
                code: 'storage-write-failed',
                detail: 'The move was applied but could not be saved.',
                recovered: true,
            } }),
    };
}
/** Choose a hidden position for the next role, and keep it. */
export function chooseTarotPosition(session, position, options = {}) {
    return advance(session, selectTarotPosition(session, position), options);
}
/** Accept or decline the Jumper, and keep the decision. */
export function decideTarotJumper(session, decision, options = {}) {
    return advance(session, resolveTarotJumper(session, decision), options);
}
/**
 * Forget the in-process memo, without touching storage.
 *
 * Tests only, and it is what lets a test simulate a fresh page load: the memo is
 * empty and the stored record is not, which is exactly the state a reload starts
 * in. Calling it in production would change nothing a reader could see.
 */
export function resetTarotSessionMemo() {
    inFlight.clear();
}
/**
 * CROSS-TAB COORDINATION, and what is honestly still open.
 *
 * The memo above protects one process. Two tabs are two processes over one
 * localStorage, and the race is real: both read an empty key, both commit a deck,
 * both write, and the second write wins - so the first tab is showing a deck that
 * is no longer the stored one.
 *
 * WHAT THIS DOES ABOUT IT. `reconcileTarotSession` re-reads storage and prefers
 * the STORED session whenever it is valid and governs the day, discarding the
 * caller's in-memory copy. A tab that lost the race converges on the winner the
 * next time it reconciles, and a UI can call it on `visibilitychange` and on the
 * `storage` event - which is what the harness does.
 *
 * WHY NOT `navigator.locks`. It would close the window properly, and it is the
 * right answer eventually. It is not used here because the Web Locks API is
 * asynchronous and every function in this engine is synchronous: adopting it
 * means making the commit path async, which changes the signature of the one
 * function the UI calls on first paint. That is a real change to the approved
 * engine's shape and it belongs in its own task with its own review, not smuggled
 * into this one.
 *
 * THE RESIDUAL LIMITATION, STATED PLAINLY. Between two tabs opening within the
 * same tick, one committed deck is discarded. Nobody gets two readings - both
 * tabs end on the same stored deck - but the losing tab's deck was briefly
 * visible, and if the human had already chosen a position in it, that choice is
 * lost rather than merged. This is not exploitable for a redraw: reconciling
 * always moves TOWARDS the stored record, never away from it, so the worst case
 * is losing progress rather than gaining a shuffle.
 */
export function reconcileTarotSession(session, options = {}) {
    const clock = options.clock ?? systemTarotClock;
    const today = clock.localDate(clock.now());
    const read = readStoredTarotSession(options.storage);
    if (read.kind === 'ok' && storedStillGoverns(read.session.localDate, today)) {
        inFlight.set(today, read.session);
        return {
            status: statusOf(read.session),
            session: read.session,
            freshlyCommitted: false,
            ...(sessionsDiffer(session, read.session) ? { diagnostic: {
                    code: 'storage-corrupt',
                    detail: 'Another tab had already committed a different session for today; '
                        + 'this one converged on the stored record.',
                    recovered: true,
                } } : {}),
        };
    }
    /* Nothing valid is stored for today. Keep what the caller has and try to make
       it the stored record, so the next tab converges on this one. */
    writeStoredTarotSession(session, options.storage);
    inFlight.set(session.localDate, session);
    return { status: statusOf(session), session, freshlyCommitted: false };
}
/**
 * Whether two sessions are the same interaction.
 *
 * Compared on the committed deck's first card and the selection count, not
 * deep-equality: two sessions over the same deck with the same progress ARE the
 * same interaction, and a deep comparison over 78 positions would be a lot of
 * work to learn the same thing.
 */
function sessionsDiffer(left, right) {
    return left.deck.positions[0].cardId !== right.deck.positions[0].cardId
        || left.selections.length !== right.selections.length
        || left.jumper.kind !== right.jumper.kind;
}
