import { digestOf } from './canonical.js?v=f9ab0a6';
/**
 * SEALING AN INTENT, AND COUNTING WHAT STANDS BEHIND IT.
 *
 * `sealIntent` is the only way an intent gets its digest and id, so a digest always describes exactly the fields beside it. The digest covers every field except `id` and
 * `digest` themselves, in canonical form (canonical.ts).
 */
export function sealIntent(body) {
    const digest = digestOf(body);
    return { ...body, id: `ri-${digest.slice(0, 16)}`, digest };
}
/** The body of an intent: everything a digest covers. */
export function bodyOf(intent) {
    const { id: _id, digest: _digest, ...body } = intent;
    return body;
}
/**
 * HOW MANY INDEPENDENT ROOTS STAND BEHIND A SET OF PROPOSITIONS.
 *
 * A root is the underlying source of a fact: the same Sun longitude read by two systems is ONE root however many propositions rest on it, and several claims drawn from one
 * pillar's single calculation are one root too. Two roots are two computations; they are not two confirmations of a trait. `symbolicAgreement` is whether the propositions
 * share an interpretive family, which says that two traditions use similar ideas, not that the idea is true of a person. `empiricallyConfirmed` is always `false`.
 */
export function summarizeConvergence(propositions, symbolicAgreement = false) {
    const perRoot = {};
    for (const proposition of propositions) {
        const roots = new Set();
        for (const evidence of proposition.evidence)
            roots.add(evidence.root);
        for (const root of roots)
            perRoot[root] = (perRoot[root] ?? 0) + 1;
    }
    return { independentRoots: Object.keys(perRoot).length, propositionsPerRoot: perRoot, symbolicAgreement, empiricallyConfirmed: false };
}
