import { contributionFor } from '../../contributions.js?v=53c0693';
import { factPhrase } from '../../factPhrasing.js?v=53c0693';
import { POLE_TAGS } from '../../mechanismRules.js?v=53c0693';
import { distinctivenessOf } from '../../portraitSelection.js?v=53c0693';
import { PILLAR_ORDER, counted, describeElement, relevant, sourceKeyOf, tagsFit, } from '../narrativeEvidence.js?v=53c0693';
import { DRIVE_POLES, DRIVE_TAGS, drivesOf } from './drives.js?v=53c0693';
import { sharpenFor, situationFor } from './relations.js?v=53c0693';
import { fitsDimension, voiceOf } from './voice.js?v=53c0693';
/** The tags of an atom that belong to the pole of the dimension it was counted on. */
export function onPole(atom) {
    const accepted = POLE_TAGS[atom.dimension];
    return accepted ? atom.tags.filter((tag) => accepted.includes(tag)) : [...atom.tags];
}
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const sentenceOf = (text) => (/[.!?]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`);
/**
 * The results among `items` that may be SHOWN for a claim, best row per source - the V2.1
 * gate (counted, clears the relevance floor, not generational) plus the planet's fit to
 * the dimension. A result that cannot speak as a person (an aspect, a centre state) can
 * still stand in a footnote as support for a claim another result speaks.
 */
export function supportsOf(items) {
    const best = new Map();
    for (const item of counted(items)) {
        if (!relevant(item) || !fitsDimension(item.evidence))
            continue;
        const contribution = contributionFor(item.evidence);
        if (contribution && !tagsFit(item, contribution.tags))
            continue;
        const key = sourceKeyOf(item.evidence);
        const existing = best.get(key);
        if (!existing || item.countedWeight > existing.countedWeight)
            best.set(key, item);
    }
    const out = [];
    for (const [key, item] of best) {
        const tradition = describeElement(item.evidence);
        if (!tradition)
            continue;
        out.push({
            key,
            pillar: item.evidence.pillar,
            evidence: item.evidence,
            tags: contributionFor(item.evidence)?.tags ?? [],
            dimension: item.evidence.dimension,
            weight: item.countedWeight,
            name: capitalise(factPhrase(item.evidence)),
            tradition,
        });
    }
    return out.sort((left, right) => right.weight - left.weight || left.key.localeCompare(right.key));
}
/** The supports that can speak: those the lexicon can say as a person. */
export function atomsOf(items) {
    const atoms = [];
    for (const support of supportsOf(items)) {
        const voice = voiceOf(support.evidence);
        if (voice)
            atoms.push({ ...support, voice });
    }
    return atoms;
}
/** How squarely an atom's contribution sits on the pole it was counted on: 1 when all its tags do. */
export const poleShare = (atom) => (atom.tags.length === 0 ? 0 : onPole(atom).length / atom.tags.length);
export const pillarsOf = (atoms) => PILLAR_ORDER.filter((pillar) => atoms.some((atom) => atom.pillar === pillar));
/** Every atom a finding rests on, in the order the reader meets them. */
export function atomsOfFinding(finding) {
    switch (finding.kind) {
        case 'emphasis': return [...finding.repeated, finding.partner];
        case 'convergence': return [finding.first, finding.second];
        case 'tension': return [...finding.heavier.atoms, ...finding.lighter.atoms];
    }
}
/* ----------------------------------------------------------------- scoring */
/** Evidence that is repeated within one tradition is one tradition's emphasis, not several confirmations. */
const REPEAT_MIN = { astrology: 3, numerology: 2, bazi: 99, 'human-design': 99 };
/** A pair of atoms, and the written relation between their contributions on the pole each was counted on. */
/** Content words (five letters or more), for a cheap test of whether one text restates another. */
const contentWords = (text) => new Set(text.toLowerCase().split(/[^a-z]+/).filter((word) => word.length >= 5));
/** The share of `text`'s content words that `other` also uses. */
function restates(text, other) {
    const mine = contentWords(text);
    const theirs = contentWords(other);
    if (mine.size === 0)
        return 0;
    let shared = 0;
    for (const word of mine)
        if (theirs.has(word))
            shared += 1;
    return shared / mine.size;
}
const RESTATES_AT = 0.4;
/**
 * A pair of atoms, and the written relation between their contributions on the pole each was counted on.
 *
 * Two guards keep this from being a coincidence of labels. The relation must rest on the
 * most characteristic tag of at least one of the two results (tags are declared
 * most-characteristic-first in the lexicon), and what it says must add something: a
 * relation whose words mostly repeat what one of the results was already quoted as saying
 * is the same sentence twice.
 */
function sharpenBetween(left, right, exclude) {
    let found = null;
    for (const a of onPole(left)) {
        for (const b of onPole(right)) {
            if (a === b)
                continue;
            if (a !== left.tags[0] && b !== right.tags[0])
                continue;
            const clause = sharpenFor(a, b);
            if (!clause || exclude.has(clause))
                continue;
            if (restates(clause, left.voice.predicate) >= RESTATES_AT || restates(clause, right.voice.predicate) >= RESTATES_AT)
                continue;
            if (!found)
                found = { clause, tags: `${a}+${b}` };
        }
    }
    return found;
}
/**
 * How much an atom is worth to a claim: its counted weight, scaled by how squarely its
 * contribution sits on the pole it was counted on. A Sun in Virgo carries `verification`
 * on the analytical pole beside two tags that are not about analysis; a Life Path 7 carries
 * `investigation` and `verification`, both of them. The second is the better witness.
 */
const worth = (atom) => atom.weight * (0.4 + 0.6 * poleShare(atom));
function emphasisFindings(theme, atoms, distinct, exclude) {
    const groups = new Map();
    for (const atom of atoms) {
        const group = groups.get(`${atom.pillar}|${atom.voice.predicate}`) ?? [];
        group.push(atom);
        groups.set(`${atom.pillar}|${atom.voice.predicate}`, group);
    }
    const out = [];
    for (const [, repeated] of groups) {
        const first = repeated[0];
        if (!first || repeated.length < REPEAT_MIN[first.pillar])
            continue;
        /* The repetition is across DIFFERENT functions (the Sun and Mars), never one result counted twice. */
        if (new Set(repeated.map((atom) => atom.voice.lens)).size < repeated.length)
            continue;
        const members = repeated.slice(0, 4);
        for (const partner of atoms) {
            if (partner.pillar === first.pillar)
                continue;
            const relation = members.map((member) => sharpenBetween(member, partner, exclude)).find((entry) => entry !== null);
            if (!relation)
                continue;
            /* A repeated reading counts ONCE, with a bounded bonus for the repetition: summing every placement made an emphasis score twice a convergence for no better reason than having more members. */
            const repeatedWorth = (members.reduce((sum, member) => sum + worth(member), 0) / members.length) * (1 + 0.25 * Math.min(2, members.length - 1));
            out.push({
                kind: 'emphasis',
                id: `emphasis:${theme.id}:${first.pillar}:${partner.key}`,
                theme, repeated: members, partner, insight: relation.clause, tags: relation.tags,
                score: (repeatedWorth + worth(partner)) * distinct,
            });
        }
    }
    return out;
}
function convergenceFindings(theme, atoms, distinct, exclude) {
    const out = [];
    for (let i = 0; i < atoms.length; i += 1) {
        for (let j = i + 1; j < atoms.length; j += 1) {
            const first = atoms[i];
            const second = atoms[j];
            if (!first || !second || first.pillar === second.pillar)
                continue;
            const [lead, other] = worth(first) >= worth(second) ? [first, second] : [second, first];
            const relation = sharpenBetween(lead, other, exclude) ?? sharpenBetween(other, lead, exclude);
            if (!relation)
                continue;
            out.push({
                kind: 'convergence',
                id: `convergence:${theme.id}:${lead.key}:${other.key}`,
                theme, first: lead, second: other, insight: relation.clause, tags: relation.tags,
                score: (worth(first) + worth(second)) * distinct,
            });
        }
    }
    return out;
}
/**
 * A tension is a finding only if each pole is spoken for and a situation is WRITTEN for
 * the meeting of the two contributions - and only if the support is what V2.1 required:
 * more than one tradition among the results shown, and one side carried by two. The
 * second tradition on a side need not speak as a person; it may stand in the footnote
 * (an aspect, a Ten God emphasis) because it is support, not a quotation.
 *
 * Several pairs of speakers can be licensed for one split; the best few are offered, so
 * the plan can choose a pair whose speakers are not already speaking elsewhere.
 */
function tensionFindings(tension) {
    const [heavySide, lightSide] = tension.poleA.weight >= tension.poleB.weight
        ? [tension.poleA, tension.poleB] : [tension.poleB, tension.poleA];
    const heavySupport = supportsOf(heavySide.evidence);
    const lightSupport = supportsOf(lightSide.evidence);
    const heavy = atomsOf(heavySide.evidence);
    const light = atomsOf(lightSide.evidence);
    const candidates = [];
    for (const a of heavy) {
        for (const b of light) {
            if (a.key === b.key)
                continue;
            let best = null;
            for (const ta of onPole(a)) {
                for (const tb of onPole(b)) {
                    if (ta === tb)
                        continue;
                    const situation = situationFor(tension.axis, ta, tb);
                    if (situation && !best)
                        best = { a, b, situation, tags: `${ta}+${tb}`, score: worth(a) * worth(b) };
                }
            }
            if (best)
                candidates.push(best);
        }
    }
    candidates.sort((left, right) => right.score - left.score
        || left.a.key.localeCompare(right.a.key) || left.b.key.localeCompare(right.b.key));
    const out = [];
    for (const candidate of candidates) {
        const sideA = [candidate.a];
        const sideB = [candidate.b];
        const pillarsA = () => pillarsOf(sideA).length;
        const pillarsB = () => pillarsOf(sideB).length;
        const total = () => pillarsOf([...sideA, ...sideB]).length;
        /* Add the heaviest result from a tradition the side does not yet show, to either side, until the rule holds. */
        if (Math.max(pillarsA(), pillarsB()) < 2 || total() < 2) {
            const shown = () => [...sideA, ...sideB];
            const extra = [
                ...heavySupport.filter((atom) => !sideA.some((s) => s.pillar === atom.pillar)).map((atom) => ({ atom, side: sideA })),
                ...lightSupport.filter((atom) => !sideB.some((s) => s.pillar === atom.pillar)).map((atom) => ({ atom, side: sideB })),
            ].filter((entry) => !shown().some((s) => s.key === entry.atom.key))
                .sort((left, right) => right.atom.weight - left.atom.weight || left.atom.key.localeCompare(right.atom.key))[0];
            if (extra)
                extra.side.push(extra.atom);
        }
        if (Math.max(pillarsA(), pillarsB()) < 2 || total() < 2)
            continue;
        const kindBoost = tension.kind === 'true-tension' ? 1.25 : 1;
        out.push({
            kind: 'tension',
            id: `tension:${tension.axis}:${candidate.a.key}:${candidate.b.key}`,
            tension,
            heavier: { dimension: heavySide.dimension, speaker: candidate.a, atoms: sideA },
            lighter: { dimension: lightSide.dimension, speaker: candidate.b, atoms: sideB },
            situation: candidate.situation,
            tags: candidate.tags,
            score: (worth(candidate.a) + worth(candidate.b)) * (0.6 + 0.8 * tension.balance) * kindBoost,
        });
        if (out.length >= 4)
            break;
    }
    return out;
}
const MAX_AGREEMENT = 4;
const MAX_SPLITS = 3;
/**
 * A finding is written only if it is worth at least this share of the strongest one. Scores
 * are comparable across kinds since V2.3 (a repeated reading counts once, with a bounded bonus
 * for repetition, instead of summing every placement), so the floor means what it says.
 */
const FLOOR_AGAINST_LEAD = 0.35;
/** A result may take part in at most this many findings; it is introduced once and pointed to afterwards. */
const MAX_PARTICIPATION = 3;
const MAX_DRIVES = 3;
/** The results whose voices a finding quotes. */
function speakersOf(finding) {
    switch (finding.kind) {
        case 'emphasis': return [...finding.repeated, finding.partner];
        case 'convergence': return [finding.first, finding.second];
        case 'tension': return [finding.heavier.speaker, finding.lighter.speaker];
    }
}
const labelOf = (finding) => (finding.kind === 'tension'
    ? `${finding.tension.axis}: ${finding.heavier.speaker.name} against ${finding.lighter.speaker.name}`
    : finding.kind === 'emphasis'
        ? `${finding.theme.label}: ${finding.repeated.map((atom) => atom.name).join(', ')} with ${finding.partner.name}`
        : `${finding.theme.label}: ${finding.first.name} with ${finding.second.name}`);
/** Further results shown behind an agreement: the heaviest supports of the same theme from traditions not yet shown, then the rest. */
function moreSupport(theme, shown, limit = 2) {
    const taken = new Set(shown.map((support) => support.key));
    const shownPillars = new Set(shown.map((support) => support.pillar));
    const candidates = supportsOf(theme.supportingEvidence).filter((support) => !taken.has(support.key));
    const fresh = candidates.filter((support) => !shownPillars.has(support.pillar));
    const picked = [];
    for (const support of [...fresh, ...candidates.filter((support) => !fresh.includes(support))]) {
        if (picked.length >= limit)
            break;
        if (!picked.some((entry) => entry.pillar === support.pillar))
            picked.push(support);
    }
    return picked;
}
/** Whether a quoted result's most characteristic contribution is one this drive is linked to. */
const carriesDrive = (atom, drive) => {
    const first = atom.tags[0];
    return first !== undefined && (DRIVE_TAGS[drive.dimension] ?? []).includes(first);
};
function attachDrive(block, drives, used) {
    const { finding } = block;
    for (const basis of drives) {
        if (used.has(basis.dimension))
            continue;
        if (finding.kind !== 'tension') {
            const quoted = speakersOf(finding);
            const sharedSource = quoted.some((atom) => basis.supports.some((support) => support.key === atom.key));
            /* The same result counted behind the drive, or - only for a drive the model rates strong across three traditions - a quoted result whose most characteristic contribution is linked to it. */
            const wellFounded = basis.theme.support === 'strong' && pillarsOf(basis.supports).length >= 3;
            if (sharedSource || (wellFounded && quoted.some((atom) => carriesDrive(atom, basis))))
                return { basis, how: 'agreement' };
        }
        else {
            const poles = DRIVE_POLES[basis.dimension] ?? [];
            if (poles.includes(finding.heavier.dimension) && carriesDrive(finding.heavier.speaker, basis))
                return { basis, how: 'first' };
            if (poles.includes(finding.lighter.dimension) && carriesDrive(finding.lighter.speaker, basis))
                return { basis, how: 'second' };
        }
    }
    return null;
}
export function planMeaning(source) {
    const notes = [];
    const totalSupport = [...source.themes, ...source.subThresholdThemes]
        .reduce((running, theme) => running + theme.supportWeight, 0);
    const pool = [];
    const themeAudit = [];
    /* A theme is spoken for only if its evidence stands on two traditions among the results that can speak. */
    for (const theme of source.themes) {
        const audit = (outcome, pillars, candidates = 0) => {
            themeAudit.push({
                id: theme.id, label: theme.label, facet: theme.facet, support: theme.support, pillars, outcome, candidates,
            });
        };
        if (theme.counterWeight > theme.supportWeight) {
            audit('counter-outweighs', theme.distinctPillars);
            continue;
        }
        if (theme.facet !== 'style') {
            audit('drive-theme', theme.distinctPillars);
            continue;
        }
        const atoms = atomsOf(theme.supportingEvidence);
        if (pillarsOf(atoms).length < 2) {
            notes.push(`theme ${theme.id}: ${atoms.length} speakable result(s) from ${pillarsOf(atoms).length} tradition(s)`);
            audit('one-tradition-speaks', pillarsOf(atoms).length);
            continue;
        }
        const distinct = distinctivenessOf(theme, totalSupport);
        const before = pool.length;
        pool.push(...emphasisFindings(theme, atoms, distinct, new Set()));
        pool.push(...convergenceFindings(theme, atoms, distinct, new Set()));
        audit(pool.length > before ? 'in-pool' : 'no-written-relation', pillarsOf(atoms).length, pool.length - before);
    }
    for (const tension of source.tensions) {
        if (tension.kind === 'weak-conflict')
            continue;
        const found = tensionFindings(tension);
        if (found.length === 0)
            notes.push(`split ${tension.axis}: no written situation for any pair of speakable results, or too little support`);
        pool.push(...found);
    }
    pool.sort((left, right) => right.score - left.score || left.id.localeCompare(right.id));
    /* ---- selection: what is worth saying, under rules about repetition of MEANING (not of sources) ---- */
    const chosen = [];
    const candidates = [];
    const participation = new Map();
    const introducedPhrases = new Set();
    const introducedKeys = new Set();
    const usedText = new Set();
    const usedThemes = new Set();
    const usedAxes = new Set();
    const usedPairs = new Set();
    const usedRoles = new Set();
    const usedRepeated = new Set();
    let agreement = 0;
    let splits = 0;
    for (const finding of pool) {
        const record = (outcome) => {
            candidates.push({ id: finding.id, kind: finding.kind, score: Number(finding.score.toFixed(3)), label: labelOf(finding), outcome });
        };
        const isSplit = finding.kind === 'tension';
        if (isSplit ? splits >= MAX_SPLITS : agreement >= MAX_AGREEMENT) {
            record(isSplit ? 'cap: splits' : 'cap: agreement');
            continue;
        }
        const strongest = chosen[0];
        if (strongest && finding.score < FLOOR_AGAINST_LEAD * strongest.score) {
            record('floor against the lead');
            continue;
        }
        const theme = finding.kind === 'tension' ? null : finding.theme.id;
        if (theme && usedThemes.has(theme)) {
            record('theme already used');
            continue;
        }
        if (finding.kind === 'tension' && usedAxes.has(finding.tension.axis)) {
            record('axis already used');
            continue;
        }
        const text = finding.kind === 'tension' ? finding.situation : finding.insight;
        if (usedText.has(text)) {
            record('relation text already used');
            continue;
        }
        const speakers = speakersOf(finding);
        const overused = speakers.find((atom) => (participation.get(atom.key) ?? 0) >= MAX_PARTICIPATION);
        if (overused) {
            record(`result already in ${MAX_PARTICIPATION} findings: ${overused.name}`);
            continue;
        }
        /* The same two results are related once: a second relation between them would say the first again in other words. */
        const pairs = finding.kind === 'emphasis' ? [] : [[...speakers.map((atom) => atom.key)].sort().join('|')];
        const pairAgain = pairs.find((pair) => usedPairs.has(pair));
        if (pairAgain) {
            record('the same two results are already related');
            continue;
        }
        /* One repeated reading is stated once, whatever second tradition it is set beside. */
        if (finding.kind === 'emphasis' && finding.repeated.some((atom) => usedRepeated.has(atom.key))) {
            record('the same repeated reading is already stated');
            continue;
        }
        /* The same quality as the counterweight in two dilemmas is one dilemma told twice. */
        const roles = finding.kind === 'tension' ? [`H:${finding.heavier.speaker.key}`, `L:${finding.lighter.speaker.key}`] : [];
        const roleAgain = roles.find((role) => usedRoles.has(role));
        if (roleAgain) {
            record('the same result is already on this side of another split');
            continue;
        }
        /* A NEW result may not bring a phrase that has already been said: the same habit quoted from a second placement is the same sentence twice. */
        const fresh = speakers.filter((atom) => !introducedKeys.has(atom.key));
        const phraseAgain = fresh.find((atom) => introducedPhrases.has(atom.voice.predicate));
        if (phraseAgain) {
            record(`phrase already said: ${phraseAgain.voice.predicate}`);
            continue;
        }
        chosen.push(finding);
        record('chosen');
        notes.push(`chosen ${finding.kind} ${finding.score.toFixed(2)} ${finding.id}`);
        for (const atom of speakers)
            participation.set(atom.key, (participation.get(atom.key) ?? 0) + 1);
        for (const atom of fresh) {
            introducedKeys.add(atom.key);
            introducedPhrases.add(atom.voice.predicate);
        }
        usedText.add(text);
        for (const pair of pairs)
            usedPairs.add(pair);
        for (const role of roles)
            usedRoles.add(role);
        if (finding.kind === 'emphasis')
            for (const atom of finding.repeated)
                usedRepeated.add(atom.key);
        if (theme)
            usedThemes.add(theme);
        if (finding.kind === 'tension')
            usedAxes.add(finding.tension.axis);
        if (isSplit)
            splits += 1;
        else
            agreement += 1;
    }
    /* ---- order: the strongest pattern first; then what is joined to it by a shared result; then the rest ---- */
    const placed = [];
    const seen = new Set();
    const remaining = [...chosen];
    const lead = remaining.shift();
    if (lead) {
        placed.push(lead);
        for (const atom of speakersOf(lead))
            seen.add(atom.key);
    }
    while (remaining.length > 0) {
        const joined = remaining.filter((finding) => speakersOf(finding).some((atom) => seen.has(atom.key)));
        const rank = (finding) => (finding.kind === 'tension' ? 1 : 0);
        const pickFrom = joined.length > 0 ? joined : remaining;
        pickFrom.sort((left, right) => rank(left) - rank(right) || right.score - left.score || left.id.localeCompare(right.id));
        const next = pickFrom[0];
        if (!next)
            break;
        placed.push(next);
        remaining.splice(remaining.indexOf(next), 1);
        for (const atom of speakersOf(next))
            seen.add(atom.key);
    }
    /* ---- blocks: introduce once, point back afterwards, and name the relation ---- */
    const drives = drivesOf(source);
    const driveAudit = new Map(drives.map((basis) => [basis.dimension, 'supported, not joined to any paragraph']));
    const blocks = [];
    const introduced = new Set();
    const kindOf = new Map();
    const usedDrives = new Set();
    for (const [index, finding] of placed.entries()) {
        const speakers = speakersOf(finding);
        const fresh = speakers.filter((atom) => !introduced.has(atom.key));
        const referred = speakers.filter((atom) => introduced.has(atom.key));
        const hinge = referred.sort((a, b) => worth(b) - worth(a) || a.key.localeCompare(b.key))[0] ?? null;
        let link = index === 0 ? 'lead' : 'separate';
        if (hinge && index > 0) {
            const earlier = kindOf.get(hinge.key);
            link = finding.kind === 'tension' ? (earlier === 'tension' ? 'recurs' : 'qualifies') : 'extends';
        }
        const draft = {
            finding, link, hinge, introduced: fresh, referred, drive: null,
            more: finding.kind === 'tension' ? [] : moreSupport(finding.theme, atomsOfFinding(finding)),
        };
        const drive = usedDrives.size < MAX_DRIVES ? attachDrive(draft, drives, usedDrives) : null;
        if (drive) {
            usedDrives.add(drive.basis.dimension);
            driveAudit.set(drive.basis.dimension, `joined to ${finding.id}`);
        }
        blocks.push({ ...draft, drive });
        for (const atom of fresh)
            introduced.add(atom.key);
        for (const atom of speakers)
            if (!kindOf.has(atom.key))
                kindOf.set(atom.key, finding.kind);
    }
    /* ---- paragraphs: two findings that belong together are one paragraph ---- */
    const paragraphs = [];
    for (const block of blocks) {
        const last = paragraphs[paragraphs.length - 1];
        const joins = last !== undefined && last.blocks.length === 1 && block.hinge !== null
            && (block.link === 'extends' || block.link === 'qualifies' || block.link === 'recurs');
        if (joins)
            paragraphs[paragraphs.length - 1] = { blocks: [...last.blocks, block] };
        else
            paragraphs.push({ blocks: [block] });
    }
    return {
        findings: placed,
        blocks,
        paragraphs,
        notes,
        audit: {
            themes: themeAudit,
            candidates,
            drives: drives.map((basis) => ({ dimension: basis.dimension, label: basis.theme.label, outcome: driveAudit.get(basis.dimension) ?? '' })),
        },
    };
}
