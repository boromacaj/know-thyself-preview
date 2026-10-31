import { hiddenPositionAt, } from './tarotShuffle.js?v=2ea79e9';
import { TAROT_DECK_ID, TAROT_DECK_SCHEMA_VERSION, TAROT_POSITIONS, TAROT_SPREAD_ID, } from './tarotTypes.js?v=2ea79e9';
export function tarotSessionPhase(session) {
    if (session.jumper.kind === 'offered')
        return 'jumper-decision';
    const filled = session.selections.length;
    if (filled >= TAROT_POSITIONS.length)
        return 'complete';
    return ['awaiting-energy', 'awaiting-factor', 'awaiting-guidance'][filled];
}
/** The role the next selection will fill, or null when there is nothing left to choose. */
export function nextTarotRole(session) {
    if (session.jumper.kind === 'offered')
        return null;
    return TAROT_POSITIONS[session.selections.length] ?? null;
}
const refuse = (refusal) => ({ ok: false, refusal });
/* -------------------------------------------------------------- the moves */
/**
 * Begin a session over a deck that has already been committed.
 *
 * The deck arrives finished. This function cannot change what is in it and has
 * no way to - it takes no random source.
 */
export function startTarotSession(input) {
    return {
        deck: input.deck,
        jumper: input.deck.jumper ? { kind: 'offered', offer: input.deck.jumper } : { kind: 'none' },
        selections: [],
        localDate: input.localDate,
        startedAt: input.startedAt,
        timeZone: input.timeZone,
        rejectedFate: input.rejectedFate,
        acceptedFate: input.acceptedFate,
    };
}
/**
 * Accept or decline the Jumper.
 *
 * REJECTING IS NOT A REROLL, AND CANNOT BE. This function has no random source
 * and returns a session over the SAME committed deck - the identical object, not
 * a copy. There is no path from a decision to a new shuffle, so the loop of
 * "reject until something better appears" does not exist to be closed: the only
 * thing a rejection changes is whether one already-decided card contributes to
 * the reading.
 */
export function resolveTarotJumper(session, decision) {
    if (session.jumper.kind === 'none')
        return refuse('no-jumper-offered');
    if (session.jumper.kind !== 'offered')
        return refuse('jumper-already-resolved');
    const { offer } = session.jumper;
    return {
        ok: true,
        session: {
            ...session,
            jumper: { kind: decision === 'accept' ? 'accepted' : 'rejected', offer },
        },
    };
}
/**
 * Whether a position can still be chosen, and why not when it cannot.
 *
 * Exported because the UI needs the same answer to decide what to disable, and
 * two implementations of "is this selectable" would eventually disagree - the
 * screen would offer a position the session then refuses.
 */
export function positionAvailability(session, position) {
    const entry = hiddenPositionAt(session.deck, position);
    if (!entry)
        return { available: false, refusal: 'position-out-of-range' };
    if (session.jumper.kind === 'offered')
        return { available: false, refusal: 'jumper-undecided' };
    if (session.selections.length >= TAROT_POSITIONS.length) {
        return { available: false, refusal: 'session-complete' };
    }
    if (session.selections.some((selection) => selection.position === position)) {
        return { available: false, refusal: 'position-already-taken' };
    }
    if (session.jumper.kind === 'accepted' && session.acceptedFate === 'reserved'
        && session.jumper.offer.position === position) {
        return { available: false, refusal: 'position-reserved-by-jumper' };
    }
    if (session.jumper.kind === 'rejected' && session.rejectedFate === 'withdrawn'
        && session.jumper.offer.position === position) {
        return { available: false, refusal: 'position-withdrawn' };
    }
    return { available: true };
}
/**
 * Choose a position for the next role.
 *
 * The role is not a parameter. Energy, then Factor, then Guidance, in that
 * order, because the order is the product's - a caller that could name the role
 * could fill Guidance first, and the reading's argument is built on which card
 * came first.
 */
export function selectTarotPosition(session, position) {
    const availability = positionAvailability(session, position);
    if (!availability.available)
        return refuse(availability.refusal);
    const role = TAROT_POSITIONS[session.selections.length];
    const entry = hiddenPositionAt(session.deck, position);
    return {
        ok: true,
        session: {
            ...session,
            selections: [...session.selections, {
                    role,
                    position: entry.position,
                    cardId: entry.cardId,
                    orientation: entry.orientation,
                }],
        },
    };
}
/** Every position that can still be chosen right now, in position order. */
export function selectablePositions(session) {
    return session.deck.positions
        .map((entry) => entry.position)
        .filter((position) => positionAvailability(session, position).available);
}
/* ---------------------------------------------------- the finished reading */
/**
 * The completed session as the spread the content layer already understands.
 *
 * This is the whole integration with the approved interpretation system: a
 * `TarotSpread` with orientations that are now real. `planTarotNarrative` takes
 * exactly this type, so nothing downstream had to be rebuilt to make the
 * interactive draw interpretable.
 *
 * Null until all three roles are filled. A partial spread is not a reading and
 * there is no shape for one.
 */
export function tarotSessionSpread(session) {
    if (session.selections.length !== TAROT_POSITIONS.length)
        return null;
    const byRole = new Map(session.selections.map((selection) => [selection.role, selection]));
    const cards = [];
    for (const role of TAROT_POSITIONS) {
        const selection = byRole.get(role);
        if (!selection)
            return null;
        cards.push({ position: role, cardId: selection.cardId, orientation: selection.orientation });
    }
    return {
        spreadId: TAROT_SPREAD_ID,
        deckId: TAROT_DECK_ID,
        deckSchemaVersion: TAROT_DECK_SCHEMA_VERSION,
        localDate: session.localDate,
        drawnAt: session.startedAt,
        timeZone: session.timeZone,
        cards,
    };
}
/**
 * The accepted Jumper as extra evidence, or null.
 *
 * Deliberately NOT a fourth entry in the spread's `cards`. A spread is three
 * positions and the composer's whole argument is built on three; a fourth card
 * smuggled in as a position would change what every downstream relation means.
 * The Jumper is separate evidence that the composer reasons about separately.
 *
 * A rejected Jumper returns null here. That is the entire mechanical meaning of
 * rejection: it contributes nothing to the reading.
 */
export function tarotSessionJumperEvidence(session) {
    return session.jumper.kind === 'accepted' ? session.jumper.offer : null;
}
