import { CONTEXT_FOCUS } from '../domains/dynamics.js';
import { claimsOf, settle, tensionsIn } from './consistency.js';
const MAX_SUPPORTS = 2;
/** How much stronger than the best lead a one-sided lean must rank to become the story's centre. */
const ASYMMETRY_MARGIN = 1.35;
const arcOf = (finding) => {
    switch (finding.role) {
        case 'resonance': return 'converge';
        case 'complement': return 'complement';
        case 'friction': return 'tension';
        default: return 'asymmetry';
    }
};
/** The role that balances a central theme: what to watch beside common ground or a useful difference, what carries a pair through friction. */
const counterRoles = (arc) => (arc === 'tension' ? ['resonance', 'complement'] : arc === 'asymmetry' ? ['friction', 'resonance', 'complement'] : ['friction']);
const kindOf = (central, finding) => {
    if (finding.role === 'friction')
        return 'watch';
    if (finding.role === 'resonance' || finding.role === 'complement')
        return central.role === 'friction' ? 'carry' : 'other';
    return 'other';
};
/**
 * Whether the evidence behind a finding is only a lean: faint, from a single tradition, or a slight stance in a person it speaks of. A person pulled both ways on a CLEAR stance is not
 * a lean. A lean can be told, plainly marked as one, but it is not what a story is built on when something firmer is there.
 */
export function isLeanFinding(finding, evidence) {
    if (finding.strength === 'faint' || finding.corroboration === 'single-source')
        return true;
    if (!finding.axis)
        return false;
    const relation = evidence.axes[finding.axis];
    const held = [relation.poleA ? relation.stanceA : null, relation.poleB ? relation.stanceB : null].filter((stance) => stance !== null);
    return held.some((stance) => stance.strength === 'slight');
}
/** A thread that can be left out of the main story when it contradicts the rest: a faint relation from a single source. */
const isThin = (finding) => finding.strength === 'faint' || finding.corroboration === 'single-source';
/** Codes that name a wish or a need, not a trouble: what a user wants is not set against the profiles the way what troubles them is. */
const WISH_CODES = new Set(['need-more-closeness', 'need-more-space', 'wants-to-collaborate']);
export function planNarrative(interpretation, evidence, context = [], 
/** `romanticEvidence` (English romantic only): the centre is chosen with the extra care described at `mayCentre`. */
options = {}) {
    /* What the user said troubles them: the findings those codes point to. */
    const troubles = new Set(context.filter((code) => !WISH_CODES.has(code)).flatMap((code) => CONTEXT_FOCUS[code] ?? []));
    const findings = interpretation.findings;
    const leads = new Set([interpretation.lead.resonance, interpretation.lead.complement, interpretation.lead.friction]);
    /* The central theme is the highest-ranked of the three leads the overview speaks of, not a one-sided finding it does not mention. */
    /* What the user said they live with comes first: a named finding that is one of the leads is the story's centre, before a stronger one they did not name. */
    /* (A finding the user named is something they live with: a snag or a difference. A shared strength they named is not the centre of a story about what troubles them.) */
    /* ...but only a firm one: a lean the user happened to name is told in their words, not made the centre over something the profiles show clearly. */
    /* ROMANTIC, ENGLISH ONLY: "two different drives" says nothing a pair could not say of any pair, so it is the centre of a couple's story only when it is strong and more than one tradition stands behind it; otherwise the next firm finding is. */
    const mayCentre = (finding) => !(options.romanticEvidence === true && interpretation.domain === 'romantic' && finding.id === 'different-pulls' && !(finding.strength === 'strong' && finding.corroboration !== 'single-source'));
    const bestLead = findings.find((finding) => leads.has(finding) && troubles.has(finding.id) && !isLeanFinding(finding, evidence) && mayCentre(finding)) ?? findings.find((finding) => leads.has(finding) && !isLeanFinding(finding, evidence) && mayCentre(finding))
        /* when every lead is only a lean, the firmest finding that is a commonality, a complement or a snag is the story, before a lean: */
        ?? findings.find((finding) => (finding.role === 'resonance' || finding.role === 'complement' || finding.role === 'friction') && !isLeanFinding(finding, evidence) && mayCentre(finding))
        ?? findings.find((finding) => leads.has(finding) && mayCentre(finding)) ?? findings.find((finding) => leads.has(finding)) ?? null;
    /* ...unless a one-sided lean is clearly the strongest thing in the pairing (well above the best lead): then the story is about that lean. */
    const top = findings[0] ?? null;
    const central = top && bestLead && (top.role === 'asymmetry' || top.role === 'open') && top.salience >= ASYMMETRY_MARGIN * bestLead.salience ? top : (bestLead ?? top);
    if (!central)
        return { arc: null, central: null, supports: [], leftOut: [], resolutions: [], crossAxis: tensionsIn(claimsOf([], evidence)) };
    /* Something the profiles show the two share, which the user says is a trouble (both push for their own way; both show feeling, and one feels unseen), is told as a snag: the story does not open on a strength they did not describe. */
    const arc = central.role === 'resonance' && troubles.has(central.id) ? 'tension' : arcOf(central);
    const rest = findings.filter((finding) => finding !== central);
    /* Up to two supporting threads: first one that balances the central theme (by role), then the next-ranked thread of another role, so the story is not three of one thing. */
    const picked = [];
    /* A strength the user named as a trouble (the profiles say both show feeling; the user says they feel unseen) is not set beside the friction as what carries the pair. */
    const carries = (finding) => !(arc === 'tension' && troubles.has(finding.id) && (finding.role === 'resonance' || finding.role === 'complement'));
    const counter = rest.find((finding) => counterRoles(arc).includes(finding.role) && carries(finding));
    if (counter)
        picked.push(counter);
    for (const finding of rest) {
        if (picked.length >= MAX_SUPPORTS)
            break;
        if (picked.includes(finding) || !carries(finding))
            continue;
        if (finding.role === central.role && picked.some((other) => other.role === finding.role))
            continue;
        picked.push(finding);
    }
    /* Settle what the story would say of each person: bridge, hedge, or leave out a thin thread. */
    const told = [central, ...picked];
    const order = told.map((finding) => finding.id);
    const droppable = new Set(picked.filter(isThin).map((finding) => finding.id));
    const settled = settle(claimsOf(told, evidence), order, { keep: central.id, droppable });
    const kept = picked.filter((finding) => !settled.dropped.includes(finding.id));
    const leftOut = [
        ...settled.dropped.map((id) => ({ id, reason: 'contradicts-the-story' })),
        ...rest.filter((finding) => !picked.includes(finding)).map((finding) => ({ id: finding.id, reason: 'not-selected' })),
    ];
    return {
        arc,
        central,
        supports: kept.map((finding) => ({ finding, kind: kindOf(central, finding) })),
        leftOut,
        resolutions: settled.resolutions,
        crossAxis: tensionsIn(claimsOf(findings, evidence)),
    };
}
