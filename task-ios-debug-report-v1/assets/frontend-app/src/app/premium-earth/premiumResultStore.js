import { createProfileExperience } from '../model.js?v=b5ef5ed';
import { grammarForVessel, setReaderGrammar } from '../i18n/readerGrammar.js?v=b5ef5ed';
import { adaptPremiumProfile } from './premiumProfileAdapter.js?v=b5ef5ed';
const EMPTY = {
    status: 'empty',
    experience: null,
    missing: [],
    notes: [],
    error: null,
    revision: 0,
};
let state = EMPTY;
const listeners = new Set();
export const readPremiumResult = () => state;
export const subscribeToPremiumResult = (listener) => {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
};
const publish = (next) => {
    state = next;
    for (const listener of [...listeners])
        listener(state);
    return state;
};
/**
 * Runs the existing engine for a committed onboarding profile and stores the
 * result. Safe to call again after an OVERVIEW edit: the whole experience is
 * recomputed, so no pillar can be left holding a stale value.
 */
export function computePremiumResult(profile) {
    /* The body the reader chose is presentation, not input: no engine reads it,
       and ProfileInput deliberately has no field for it (see the adapter). What
       it DOES decide is the grammar the Slovak reading addresses them in, so it
       is published for the composers before anything is composed. */
    setReaderGrammar(grammarForVessel(profile.vessel));
    const adaptation = adaptPremiumProfile(profile);
    if (!adaptation.ready || !adaptation.input) {
        /* Missing required data is reported, never substituted. The previous
           experience is dropped rather than kept, so a blocked profile can never
           leave earlier results on screen pretending to describe it. */
        return publish({
            status: 'blocked',
            experience: null,
            missing: adaptation.missing,
            notes: adaptation.notes,
            error: null,
            revision: state.revision,
        });
    }
    try {
        const experience = createProfileExperience(adaptation.input);
        return publish({
            status: 'ready',
            experience,
            missing: [],
            notes: adaptation.notes,
            error: null,
            revision: state.revision + 1,
        });
    }
    catch (error) {
        /* A real engine failure must never be presented as a result. The message is
           kept for diagnostics; user-facing copy stays minimal by design. */
        return publish({
            status: 'failed',
            experience: null,
            missing: [],
            notes: adaptation.notes,
            error: error instanceof Error ? error.message : String(error),
            revision: state.revision,
        });
    }
}
export function resetPremiumResult() {
    return publish({ ...EMPTY, revision: state.revision });
}
