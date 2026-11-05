export const TENSIONS = [
    { id: 'withdraw-and-express', a: ['inner-focus', 'introspective'], b: ['emotional-expression', 'emotionally-expressive'] },
    { id: 'withdraw-and-social', a: ['inner-focus', 'introspective'], b: ['visibility', 'social'] },
    { id: 'engaged-and-contained', a: ['inner-focus', 'outwardly-engaged'], b: ['emotional-expression', 'emotionally-contained'] },
    { id: 'private-and-express', a: ['visibility', 'private'], b: ['emotional-expression', 'emotionally-expressive'] },
    { id: 'plan-and-novelty', a: ['structure', 'structured'], b: ['change', 'novelty-seeking'] },
    { id: 'assertive-and-cautious', a: ['initiative', 'assertive'], b: ['risk', 'cautious'] },
    { id: 'steady-and-risk', a: ['change', 'stability-seeking'], b: ['risk', 'risk-oriented'] },
    { id: 'flexible-and-steady', a: ['structure', 'adaptable'], b: ['change', 'stability-seeking'] },
    { id: 'collaborate-and-private', a: ['autonomy', 'collaborative'], b: ['visibility', 'private'] },
    { id: 'plan-and-risk', a: ['structure', 'structured'], b: ['risk', 'risk-oriented'] },
    { id: 'careful-and-curious', a: ['risk', 'cautious'], b: ['change', 'novelty-seeking'] },
    { id: 'solo-and-social', a: ['autonomy', 'independent'], b: ['visibility', 'social'] },
    { id: 'together-and-quiet', a: ['autonomy', 'collaborative'], b: ['inner-focus', 'introspective'] },
    { id: 'social-and-contained', a: ['visibility', 'social'], b: ['emotional-expression', 'emotionally-contained'] },
];
/** The claims about each person that these axis findings make. A person in the middle of an axis, or who cannot be placed on it, is not claimed to be anything. */
export function claimsOf(findings, evidence) {
    const claims = [];
    for (const finding of findings) {
        if (!finding.axis)
            continue;
        const relation = evidence.axes[finding.axis];
        for (const [person, pole, stance] of [['first', relation.poleA, relation.stanceA], ['second', relation.poleB, relation.stanceB]]) {
            if (!pole || stance.strength === 'unknown' || stance.strength === 'middle')
                continue;
            claims.push({ person, findingId: finding.id, axis: finding.axis, pole, strength: stance.strength, mixed: stance.mixed });
        }
    }
    return claims;
}
/** Every pair of claims about the same person that can seem to pull apart, each reported once, the claim that comes first in `claims` as `a`. */
export function tensionsIn(claims) {
    const hits = [];
    for (const tension of TENSIONS) {
        for (const person of ['first', 'second']) {
            const mine = claims.filter((claim) => claim.person === person);
            const a = mine.find((claim) => claim.axis === tension.a[0] && claim.pole === tension.a[1]);
            const b = mine.find((claim) => claim.axis === tension.b[0] && claim.pole === tension.b[1]);
            if (!a || !b)
                continue;
            hits.push(mine.indexOf(a) <= mine.indexOf(b) ? { tension: tension.id, person, a, b } : { tension: tension.id, person, a: b, b: a });
        }
    }
    return hits;
}
const STRENGTH_RANK = { clear: 2, slight: 1, middle: 0, unknown: 0 };
/** The weaker of two claims: the one with the thinner lean; on a tie, the later one (the earlier is the story's own lead). */
export const weakerClaim = (hit) => (STRENGTH_RANK[hit.b.strength] <= STRENGTH_RANK[hit.a.strength] ? hit.b : hit.a);
/**
 * Settle every tension among the claims of the findings the story will tell, in the order of the story (`order` lists the finding ids as they will be told). Dropping a thread removes
 * its claims, which can settle other tensions, so the check runs again until nothing changes.
 */
export function settle(claims, order, options) {
    let live = claims.slice();
    const dropped = [];
    const resolutions = [];
    for (;;) {
        const hits = tensionsIn(live);
        const next = hits.find((hit) => {
            if (hit.a.mixed || hit.b.mixed)
                return false;
            const weaker = weakerClaim(hit);
            return options.droppable.has(weaker.findingId) && weaker.findingId !== options.keep && STRENGTH_RANK[weaker.strength] < 2;
        });
        if (!next) {
            for (const hit of hits) {
                const hedged = hit.a.mixed || hit.b.mixed;
                const later = order.indexOf(hit.a.findingId) >= order.indexOf(hit.b.findingId) ? hit.a : hit.b;
                resolutions.push({ hit, resolution: hedged ? 'hedged' : 'bridged', at: later.findingId });
            }
            return { resolutions: [...resolutions.filter((entry) => entry.resolution === 'dropped'), ...resolutions.filter((entry) => entry.resolution !== 'dropped')], dropped };
        }
        const weaker = weakerClaim(next);
        dropped.push(weaker.findingId);
        resolutions.push({ hit: next, resolution: 'dropped', at: weaker.findingId });
        live = live.filter((claim) => claim.findingId !== weaker.findingId);
    }
}
