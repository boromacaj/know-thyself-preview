const SEPARATION_NOTE = 'These are time-sensitive cycle layers, kept structurally separate from the stable, identity-level themes above. They describe a temporary current emphasis, not a change in who you are.';
/** Deliberately separate from synthesisThemeAggregator.ts's stable-identity themes
 *  (spec section 25): current-period entries never get promoted into the ranked
 *  theme list or the main narrative. */
export function buildCurrentPeriod(numerology, bazi) {
    const entries = [];
    if (numerology.status === 'calculated') {
        entries.push({
            label: 'Personal Year',
            value: String(numerology.cycles.personalYear.finalValue),
            note: 'A yearly cycle derived from birth month + day and the current year; it shifts every year and is not part of stable identity.',
            evidenceRefs: ['numerology-personal-year'],
        });
    }
    if (bazi.status === 'calculated' && bazi.luckPillars?.status === 'calculated') {
        entries.push({
            label: 'Luck Pillars (Da Yun)',
            value: `Start age ~${bazi.luckPillars.forward?.startAgeYears ?? '?'} (forward) / ~${bazi.luckPillars.reverse?.startAgeYears ?? '?'} (reverse)`,
            note: bazi.luckPillars.directionNote,
            evidenceRefs: [],
        });
    }
    return {
        available: entries.length > 0,
        entries,
        separationNote: SEPARATION_NOTE,
    };
}
