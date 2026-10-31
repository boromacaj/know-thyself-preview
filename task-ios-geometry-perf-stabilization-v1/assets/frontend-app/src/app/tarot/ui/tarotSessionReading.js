import { composeTarotReading } from '../content/composeTarotReading.js?v=d9f39e7';
import { tarotSessionJumperEvidence, tarotSessionSpread } from '../tarotDrawSession.js?v=d9f39e7';
/**
 * The reading for a finished session, including an accepted Jumper.
 *
 * It lives apart from any screen because two screens need it - the draw review harness and the Tarot destination of the
 * application - and the application must not load the harness's screen to get it.
 */
export function readingForSession(session) {
    const spread = tarotSessionSpread(session);
    if (!spread)
        return null;
    const jumper = tarotSessionJumperEvidence(session);
    return composeTarotReading(spread, jumper ? { cardId: jumper.cardId, orientation: jumper.orientation } : null);
}
