function isPartial(pillar) {
    if (pillar.id === 'western-astrology')
        return Boolean(pillar.westernAstrologyChart?.anglesSuppressed);
    if (pillar.id === 'human-design')
        return Boolean(pillar.humanDesignBodygraph?.mechanicsSuppressed);
    if (pillar.id === 'bazi-tcm')
        return Boolean(pillar.baziChart) && !pillar.baziChart.bazi.hourPillar;
    return false;
}
function partialDetail(pillar) {
    if (pillar.id === 'western-astrology')
        return 'Ascendant, Midheaven, houses, and the chart ruler are suppressed because birth time is not available.';
    if (pillar.id === 'human-design')
        return 'Type, Strategy, Authority, Profile, and Definition are suppressed because birth time is not available.';
    if (pillar.id === 'bazi-tcm')
        return 'The Hour Pillar is unavailable because birth time is not supplied.';
    return 'Some fields are unavailable.';
}
/** Never silently synthesizes across a missing pillar: source status is computed
 *  directly from each pillar's own status/suppression flags, not inferred. */
export function buildSourceStatus(pillars) {
    return pillars.map((pillar) => {
        if (pillar.status === 'not-calculated') {
            return { pillar: pillar.id, status: 'unavailable', label: 'Unavailable', detail: pillar.source.detail };
        }
        if (pillar.status === 'benchmark') {
            return {
                pillar: pillar.id,
                status: 'partial',
                label: 'Benchmark source data',
                detail: 'This pillar uses documented benchmark source data rather than a live calculation for this profile.',
            };
        }
        const partial = isPartial(pillar);
        return {
            pillar: pillar.id,
            status: partial ? 'partial' : 'complete',
            label: partial ? 'Partial (birth time limited)' : 'Complete',
            detail: partial ? partialDetail(pillar) : 'Fully calculated from the available birth data.',
        };
    });
}
