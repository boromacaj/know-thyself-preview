/**
 * Reads the birth-time basis straight from the moment's own trace entry
 * (`timeNormalization.ts` always emits a 'Birth time precision' fact, both
 * on the ready and blocked paths). If that fact is ever missing or altered,
 * this falls back to 'estimated-local-noon' — the conservative choice that
 * causes downstream adapters (Human Design) to suppress precise mechanics
 * rather than assume a user-supplied time that was never confirmed.
 */
export function birthTimeBasisFromMoment(moment) {
    const entry = moment.trace.find((item) => item.label === 'Birth time precision');
    if (entry?.value === 'user-supplied')
        return 'user-supplied';
    if (entry?.value === 'estimated-local-noon')
        return 'estimated-local-noon';
    return 'estimated-local-noon';
}
