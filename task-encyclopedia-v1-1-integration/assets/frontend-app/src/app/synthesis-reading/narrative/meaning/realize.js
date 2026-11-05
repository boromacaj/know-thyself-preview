import { poleShort } from '../../themeVoice.js?v=2bfd44e';
import { PILLAR_NAME, PILLAR_ORDER } from '../narrativeEvidence.js?v=2bfd44e';
import { DRIVE_NOTE } from './drives.js?v=2bfd44e';
import { atomsOfFinding, pillarsOf, } from './plan.js?v=2bfd44e';
/*
 * FROM A MEANING PLAN TO ENGLISH (V2.3).
 *
 * The plan says what each paragraph is about, which calculated results stand behind it, which
 * of them it introduces and which it only points back to, and how it relates to what came
 * before. This file phrases that, and it describes the PERSON, not the calculation: the
 * placements, numbers and charts behind a sentence are named in the expandable reference, not
 * in the reading.
 *
 *   A result is introduced once, by its own voice (a function of the person + what it brings).
 *   After that it is pointed to by a HANDLE (`that habit of looking beneath the first answer`),
 *   never quoted again, so the reading can use the same result in several relations without
 *   saying the same sentence twice.
 *   A relation to what came before is said by the shared handle: it is the same quality
 *   on both sides of the page, and the sentence says that and no more.
 *
 * Certainty follows the evidence: a paragraph resting on three or more traditions is said
 * plainly; otherwise the first claim in it is qualified, once. There are no synonym banks,
 * no randomisation and no stock closing paragraph: the reading ends where its last relation
 * ends. Deterministic; no runtime model.
 */
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);
const bare = (clause) => clause.trim().replace(/[.!?]+$/, '');
const asSentence = (text) => {
    const trimmed = capitalise(text.trim());
    return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};
function joinNames(names) {
    if (names.length <= 1)
        return names[0] ?? '';
    return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}
/** `how you see yourself`, `how you think` and `how you act` read better as `how you see yourself, think and act`. */
function joinFunctions(nouns) {
    const stem = 'how you ';
    const items = nouns.map((noun, index) => (index > 0 && noun.startsWith(stem) && nouns.slice(0, index).every((n) => n.startsWith(stem))
        ? noun.slice(stem.length) : noun));
    return joinNames(items);
}
const pillarNames = (pillars) => joinNames(PILLAR_ORDER.filter((pillar) => pillars.includes(pillar)).map((pillar) => PILLAR_NAME[pillar]));
const midSentence = (name) => name.replace(/^(The|A|An) /, (article) => article.toLowerCase());
const wordCount = (text) => (text.match(/\S+/g) ?? []).length;
/* ----------------------------------------------------------------- phrasing */
/** A verb that already hedges does not take `tend to`. */
const SELF_HEDGED = /^(find|default|lean|tend)\b/;
/**
 * One qualifier per paragraph. A paragraph resting on three or more traditions is plain; any
 * other qualifies its FIRST claim with `tend to` and says the rest as the same claim's
 * elaboration. Qualifying every sentence reads as nervousness and says nothing the first did not.
 */
class Voicing {
    qualified;
    /** The evidence-basis sentences this paragraph has already said, so the same traditions are not announced twice in a row. */
    basisSaid = new Set();
    constructor(firm) { this.qualified = firm; }
    predicate(predicate) {
        if (this.qualified || SELF_HEDGED.test(predicate))
            return predicate;
        this.qualified = true;
        return `tend to ${predicate}`;
    }
    /** One clause: the result's function in the person, and what it brings. */
    speak(atom) {
        if (atom.voice.third)
            return `${atom.voice.lens} ${atom.voice.predicate}`;
        return `${atom.voice.lens} you ${this.predicate(atom.voice.predicate)}`;
    }
}
const usedAs = (atom, referred) => {
    const said = atom.voice.noun ? `${atom.voice.noun}: ${atom.voice.predicate}` : atom.voice.predicate;
    return referred ? `${said} (introduced above, only referred to here)` : said;
};
function elementOf(support, mark) {
    const atom = 'voice' in support ? support : null;
    return {
        evidenceId: support.evidence.id,
        sourceKey: support.key,
        pillar: support.pillar,
        element: support.name,
        tradition: support.tradition,
        meaning: atom ? atom.voice.predicate : '',
        tags: support.tags,
        weight: support.evidence.semanticWeight,
        dimension: support.dimension,
        ...(atom && mark !== 'support' ? { usedAs: usedAs(atom, mark === 'referred') } : {}),
    };
}
/* ------------------------------------------------------------ sentence parts */
/** `make` takes a noun phrase (`a habit of ...`); a clause that starts with a gerund (`taking both ...`) is what it comes to in practice. */
function insightSentence(insight, further) {
    const gerund = insight.trim().split(' ')[0]?.toLowerCase().endsWith('ing') === true;
    /* A relation that follows another in the same paragraph is said as what the two together come to, not as a second "in practice". */
    const lead = further ? 'taken together, that' : 'in practice, that';
    return asSentence(gerund ? `${lead} means ${bare(insight)}` : `${further ? 'taken together, that' : 'that'} adds up to ${bare(insight)}`);
}
/** Two results said in one sentence, or two when one sentence would be too long to hold. */
function twoVoices(first, second, voicing, relation) {
    const sameLens = !first.voice.third && !second.voice.third && first.voice.lens === second.voice.lens;
    const lead = voicing.speak(first);
    if (sameLens) {
        return asSentence(relation === 'agree' ? `${lead}, and ${second.voice.predicate}` : `${lead}, but also ${second.voice.predicate}`);
    }
    const tail = voicing.speak(second);
    if (wordCount(lead) + wordCount(tail) > 30) {
        return `${asSentence(lead)} ${asSentence(`${relation === 'agree' ? 'and' : 'but'} ${lowerFirst(tail)}`)}`;
    }
    return asSentence(relation === 'agree' ? `${lead}; and ${lowerFirst(tail)}` : `${lead}, but ${lowerFirst(tail)}`);
}
const handleOf = (atom) => atom.voice.handle || atom.voice.predicate;
/*
 * THE EVIDENCE BASIS, IN THE PROSE (reading-intelligence rebuild).
 *
 * V2.3 kept every tradition out of the prose and in the footnote, so a reader could not tell from the reading itself whether a sentence rested on one
 * tradition or on four, or which traditions stood on which side of a pull. The owner's brief asks for the opposite: a sentence may say which traditions
 * agree or part, and the expandable evidence shows the exact results. So each finding says, once, in plain words:
 *
 *   agreement   which traditions arrive at it (all four / three named / two named), and for an emphasis that one of them returns to it more than once;
 *   tension     which traditions lean toward which pole, the poles named in ordinary words (`keeping what works`, `the next thing`); a side that only
 *               one tradition carries while the other side has two or more is said to be a qualification rather than an equal pull.
 *
 * Only traditions whose results are in the finding's own evidence group are ever named, so the sentence is checkable against the disclosure beneath
 * it (tests/readingIntelligenceSynthesis.test.mjs). Placements, numbers and chart terms stay out of the prose, as before.
 */
const FOUR = ['numerology', 'astrology', 'bazi', 'human-design'];
function agreementBasis(pillars, finding, further) {
    if (pillars.length < 2)
        return '';
    if (finding.kind === 'emphasis') {
        const home = finding.repeated[0]?.pillar;
        const others = pillars.filter((pillar) => pillar !== home);
        if (!home || others.length === 0)
            return '';
        return `${PILLAR_NAME[home]} comes back to this more than once, with ${pillarNames(others)} pointing the same way`;
    }
    if (FOUR.every((pillar) => pillars.includes(pillar)))
        return further ? 'all four traditions meet here as well' : 'all four traditions arrive at this by their own routes';
    if (further)
        return `${pillarNames(pillars)} agree on this as well`;
    /* two traditions meeting is a coincidence worth naming as one; three is a pattern */
    return pillars.length === 2 ? `${pillarNames(pillars)} arrive at this separately` : `${pillarNames(pillars)} each point here`;
}
/** The basis and the insight, said as one sentence: the traditions that arrive at a pattern, and what it comes to. */
function basisAndInsight(basis, insight, raw) {
    if (!basis)
        return insight;
    /* (V4) the insight completes the basis directly ("each point here: building in an order, ..."), without a stock lead-in; an insight that carries a colon of its own keeps the joined form */
    if (raw && !raw.includes(':'))
        return asSentence(`${capitalise(basis)}: ${lowerFirst(bare(raw))}`);
    return `${capitalise(basis)}, and ${lowerFirst(insight).replace(/^(in practice|taken together), that /, '$1 that ')}`;
}
function tensionBasis(finding) {
    const heavy = pillarsOf(finding.heavier.atoms);
    const light = pillarsOf(finding.lighter.atoms);
    const poleOf = (dimension) => lowerFirst(poleShort(dimension) || dimension);
    const both = heavy.filter((pillar) => light.includes(pillar));
    const onlyHeavy = heavy.filter((pillar) => !light.includes(pillar));
    const onlyLight = light.filter((pillar) => !heavy.includes(pillar));
    const lean = (pillars) => (pillars.length > 1 ? 'lean' : 'leans');
    const parts = [];
    /* no tradition stands only on the heavier side: open with the one that shows both poles, so the heavier pole is still named */
    if (onlyHeavy.length === 0 && onlyLight.length > 0 && both.length > 0) {
        return asSentence(`${pillarNames(both)} ${both.length > 1 ? 'show' : 'shows'} both ${poleOf(finding.heavier.dimension)} and ${poleOf(finding.lighter.dimension)}, and ${pillarNames(onlyLight)} ${lean(onlyLight)} toward ${poleOf(finding.lighter.dimension)}`);
    }
    if (onlyHeavy.length > 0)
        parts.push(`${pillarNames(onlyHeavy)} ${lean(onlyHeavy)} toward ${poleOf(finding.heavier.dimension)}`);
    /* a side that one tradition carries alone, against two or more on the other, is a qualification rather than an equal pull, and `alone` says so */
    const alone = heavy.length >= 2 && onlyLight.length === 1 && both.length === 0 ? ' alone' : '';
    if (onlyLight.length > 0)
        parts.push(onlyHeavy.length > 0 ? `${pillarNames(onlyLight)}${alone} toward ${poleOf(finding.lighter.dimension)}` : `${pillarNames(onlyLight)} ${lean(onlyLight)} toward ${poleOf(finding.lighter.dimension)}`);
    if (both.length > 0) {
        parts.push(parts.length > 0
            ? `${pillarNames(both)} ${both.length > 1 ? 'show' : 'shows'} both`
            : `${pillarNames(both)} ${both.length > 1 ? 'show' : 'shows'} the pull between ${poleOf(finding.heavier.dimension)} and ${poleOf(finding.lighter.dimension)} from within`);
    }
    if (parts.length === 0)
        return '';
    const text = parts.length === 3 ? `${parts[0]}, ${parts[1]}, and ${parts[2]}` : parts.join(parts.length === 2 && both.length > 0 ? '; ' : ', ');
    return asSentence(text);
}
/*
 * (V4) Traditions a reading shows ONLY on the far side of one of its own splits, per pole: a supporter of an agreement on pole X is not named as
 * agreeing when the same reading's split puts that tradition only on the opposite pole (a blind reviewer found "Astrology, BaZi and Human Design agree
 * on this" over a structure pattern, then "Astrology and Human Design lean toward room to improvise"). The split says where it stands.
 */
let OPPOSED_ON = new Map();
function opposedOn(plan) {
    const out = new Map();
    for (const block of plan.paragraphs.flatMap((paragraph) => paragraph.blocks)) {
        const finding = block.finding;
        if (finding.kind !== 'tension')
            continue;
        const heavy = pillarsOf(finding.heavier.atoms);
        const light = pillarsOf(finding.lighter.atoms);
        const add = (dimension, pillars) => { const set = out.get(dimension) ?? new Set(); for (const pillar of pillars)
            set.add(pillar); out.set(dimension, set); };
        add(finding.heavier.dimension, light.filter((pillar) => !heavy.includes(pillar)));
        add(finding.lighter.dimension, heavy.filter((pillar) => !light.includes(pillar)));
    }
    return out;
}
/** The traditions an agreement may name: every speaker's, and a supporter's unless the reading puts it only on the other side of a split on this pole. */
function agreementPillars(finding, more) {
    const speakers = atomsOfFinding(finding);
    const spoken = pillarsOf(speakers);
    const dimensions = new Set(speakers.map((atom) => atom.dimension));
    const opposed = (pillar) => [...dimensions].some((dimension) => OPPOSED_ON.get(dimension)?.has(pillar));
    const supporters = more.filter((atom) => !spoken.includes(atom.pillar) && !opposed(atom.pillar));
    /* (V4, second blind round) a speaker's tradition that a split in this reading shows only on the other pole is not named here either: literally true for a
       different placement, it reads as a contradiction ("Astrology and BaZi agree on this" then "Astrology and Human Design lean toward room to improvise").
       With fewer than two traditions left the basis is not said; the disclosure still shows every result. */
    return pillarsOf([...speakers, ...supporters].filter((atom) => !opposed(atom.pillar)));
}
/** The basis sentence for a block, said once per paragraph. */
function basisFor(block, voicing, pillars, further) {
    const finding = block.finding;
    const sentence = finding.kind === 'tension' ? tensionBasis(finding) : agreementBasis(pillars, finding, further);
    /* (an agreement's basis is a clause the insight sentence completes; a tension's is a sentence of its own) */
    if (!sentence || voicing.basisSaid.has(sentence))
        return '';
    voicing.basisSaid.add(sentence);
    return sentence;
}
/**
 * How a strength meets its counterweight, chosen by the kind of split the model measured (`true-tension`: real weight on both ends; otherwise a
 * contextual duality, and how close the two ends are), so a hard pull and a light one are not announced with the same words.
 */
function counterweightPhrase(finding, further) {
    if (finding.tension.kind === 'true-tension')
        return further ? 'also runs into a real pull the other way' : 'runs into a real pull the other way';
    if (finding.tension.balance >= 0.45)
        return further ? 'also has a counterweight' : 'has a counterweight';
    return further ? 'is also tempered, more lightly, by something else' : 'is tempered, more lightly, by something else';
}
const NUMBER_WORD = { 2: 'two', 3: 'three', 4: 'four' };
function emphasisText(block, finding, voicing) {
    const nouns = finding.repeated.map((atom) => atom.voice.noun).filter((noun) => noun !== null);
    const lead = finding.repeated[0];
    const where = joinFunctions(nouns);
    const introducedLead = lead !== undefined && block.introduced.some((atom) => atom.key === lead.key);
    const parts = [];
    if (introducedLead) {
        parts.push(asSentence(`in ${where}, you ${voicing.predicate(lead.voice.predicate)}`));
    }
    else if (lead) {
        parts.push(asSentence(`${capitalise(handleOf(lead))} turns up again in ${where}`));
    }
    const partnerFresh = block.introduced.some((atom) => atom.key === finding.partner.key);
    parts.push(partnerFresh
        ? asSentence(`and ${lowerFirst(voicing.speak(finding.partner))}`)
        : asSentence(`it sits alongside ${handleOf(finding.partner)}`));
    parts.push(basisAndInsight(basisFor(block, voicing, agreementPillars(finding, block.more), block.link === 'extends'), insightSentence(finding.insight, block.link === 'extends'), finding.insight));
    return parts.filter((part) => part.length > 0).join(' ');
}
function convergenceText(block, finding, voicing, further) {
    const freshFirst = block.introduced.some((atom) => atom.key === finding.first.key);
    const freshSecond = block.introduced.some((atom) => atom.key === finding.second.key);
    let opening;
    if (freshFirst && freshSecond)
        opening = twoVoices(finding.first, finding.second, voicing, 'agree');
    /* (V4) where the quality turns up again is what the second result adds; its lens says where (`in how you see yourself`). "has company" only where no lens can say it. */
    else if (!freshFirst && freshSecond) {
        const where = finding.second.voice.noun;
        opening = where && !finding.second.voice.third
            ? asSentence(`${capitalise(handleOf(finding.first))} shows up ${further ? 'also ' : 'again '}in ${where}: you ${voicing.predicate(finding.second.voice.predicate)}`)
            : asSentence(`${capitalise(handleOf(finding.first))} ${further ? 'also ' : ''}has company: ${lowerFirst(voicing.speak(finding.second))}`);
    }
    else if (freshFirst && !freshSecond)
        opening = asSentence(`${voicing.speak(finding.first)}, which sits alongside ${handleOf(finding.second)}`);
    else
        opening = asSentence(`${capitalise(handleOf(finding.first))} and ${handleOf(finding.second)} reinforce each other`);
    const basis = basisFor(block, voicing, agreementPillars(finding, block.more), further);
    return [opening, basisAndInsight(basis, insightSentence(finding.insight, block.link === 'extends'), finding.insight)].filter((part) => part.length > 0).join(' ');
}
function tensionText(block, finding, voicing, further) {
    const a = finding.heavier.speaker;
    const b = finding.lighter.speaker;
    const freshA = block.introduced.some((atom) => atom.key === a.key);
    const freshB = block.introduced.some((atom) => atom.key === b.key);
    let opening;
    if (freshA && freshB)
        opening = twoVoices(a, b, voicing, 'contrast');
    else if (!freshA && freshB) {
        /* The same quality on one side of a second pull (`recurs`) is said differently from a strength that meets its counterweight (`qualifies`). */
        opening = asSentence(block.link === 'recurs'
            ? `${capitalise(handleOf(a))} pulls against something else as well: ${lowerFirst(voicing.speak(b))}`
            : `${capitalise(handleOf(a))} ${counterweightPhrase(finding, further)}: ${lowerFirst(voicing.speak(b))}`);
    }
    else if (freshA && !freshB)
        opening = asSentence(`${voicing.speak(a)}; and that meets ${handleOf(b)}`);
    else
        opening = asSentence(`${capitalise(handleOf(a))} meets ${handleOf(b)}`);
    return [opening, basisFor(block, voicing, [], further), finding.situation.trim()].filter((part) => part.length > 0).join(' ');
}
function driveSentence(block) {
    const drive = block.drive;
    if (!drive)
        return '';
    const note = DRIVE_NOTE[drive.basis.dimension] ?? '';
    const finding = block.finding;
    if (finding.kind === 'tension' && drive.how !== 'agreement') {
        const side = drive.how === 'first' ? finding.heavier.speaker : finding.lighter.speaker;
        return asSentence(`behind ${handleOf(side)}, there seems to be ${note}`);
    }
    return asSentence(block.link === 'lead' ? `underneath it all, there seems to be ${note}` : `behind that, there seems to be ${note}`);
}
/* ------------------------------------------------------------- the footnote */
const sideNames = (atoms) => joinNames(atoms.map((atom) => midSentence(atom.name)));
const COUNT_WORD = { 2: 'two', 3: 'three', 4: 'four' };
function tensionConnection(finding) {
    const headingOf = (dimension) => lowerFirst(poleShort(dimension) || dimension);
    const sideA = finding.heavier.atoms;
    const sideB = finding.lighter.atoms;
    const a = pillarsOf(sideA);
    const b = pillarsOf(sideB);
    const lead = `${capitalise(sideNames(sideA))} ${sideA.length > 1 ? 'lean' : 'leans'} toward ${headingOf(finding.heavier.dimension)}; ${sideNames(sideB)} ${sideB.length > 1 ? 'lean' : 'leans'} toward ${headingOf(finding.lighter.dimension)}.`;
    const support = a.length >= 2 && b.length >= 2
        ? 'Each side is shown by more than one tradition, so neither reads as a stray detail.'
        : a.length >= 2 || b.length >= 2
            ? `${capitalise(headingOf(a.length < 2 ? finding.heavier.dimension : finding.lighter.dimension))} is shown by ${pillarNames(a.length < 2 ? a : b)} alone, so it reads as a qualification of the other side rather than an equal pull.`
            : 'Each side is shown by a single tradition, so this is a possible pull rather than an established one.';
    return `${lead} ${support} What the meeting looks like is this project's reading; neither tradition states it.`;
}
function emphasisConnection(finding) {
    const first = finding.repeated[0];
    const kind = first?.pillar === 'numerology' ? 'the same number' : 'the same sign';
    return `${capitalise(sideNames(finding.repeated))} ${finding.repeated.length === 2 ? 'are both' : 'are all'} ${kind}, which is ${PILLAR_NAME[first?.pillar ?? 'astrology']} returning to one reading, so it counts once as an emphasis and not ${COUNT_WORD[finding.repeated.length] ?? finding.repeated.length} times. ${finding.partner.name} comes from ${PILLAR_NAME[finding.partner.pillar]}, a second tradition. What the pair makes together is this project's reading; neither tradition states it.`;
}
function convergenceConnection(finding) {
    return `${capitalise(finding.first.name)} (${PILLAR_NAME[finding.first.pillar]}) and ${midSentence(finding.second.name)} (${PILLAR_NAME[finding.second.pillar]}) are each read, in their own tradition, as pointing the same way. What they make together is this project's reading; neither tradition states it.`;
}
function linkConnection(block, sameParagraph) {
    const hinge = block.hinge;
    if (!hinge)
        return '';
    const where = sameParagraph ? 'earlier in this paragraph' : 'in an earlier paragraph';
    const how = block.link === 'qualifies' ? 'it is on one side of the pull described here'
        : block.link === 'recurs' ? 'it is on one side of this pull as well'
            : 'it is part of this finding too';
    return `${hinge.name} (${PILLAR_NAME[hinge.pillar]}) is the shared basis: it is introduced ${where} and only referred to here, and ${how}. Nothing says one causes the other.`;
}
function driveConnection(block) {
    const drive = block.drive;
    if (!drive)
        return '';
    const label = drive.basis.theme.label.toLowerCase();
    const quoted = atomsOfFinding(block.finding);
    const shared = quoted.find((atom) => drive.basis.supports.some((support) => support.key === atom.key));
    const names = pillarNames(pillarsOf(drive.basis.supports));
    const why = shared
        ? `${shared.name} is counted behind both this paragraph and the wish`
        : `the paragraph quotes a result whose most characteristic contribution is one this project links to that wish`;
    return `"${capitalise(label)}" is shown by ${names}; it joins this paragraph because ${why}. The link is this project's reading; no tradition states it.`;
}
function realiseBlock(block, voicing, sameParagraph) {
    const { finding } = block;
    const quoted = (support) => (block.introduced.some((atom) => atom.key === support.key) ? 'quoted'
        : block.referred.some((atom) => atom.key === support.key) ? 'referred' : 'support');
    let text;
    let connection;
    let relation;
    let groups;
    if (finding.kind === 'tension') {
        text = tensionText(block, finding, voicing, sameParagraph);
        connection = tensionConnection(finding);
        relation = 'adaptive-tension';
        const side = (members, dimension, label) => ({
            id: `pole:${finding.tension.axis}:${dimension}:${label}`,
            heading: capitalise(poleShort(dimension) || dimension),
            elements: members.map((member) => elementOf(member, quoted(member))),
        });
        groups = [side(finding.heavier.atoms, finding.heavier.dimension, 'a'), side(finding.lighter.atoms, finding.lighter.dimension, 'b')];
    }
    else {
        text = finding.kind === 'emphasis' ? emphasisText(block, finding, voicing) : convergenceText(block, finding, voicing, sameParagraph);
        connection = finding.kind === 'emphasis' ? emphasisConnection(finding) : convergenceConnection(finding);
        relation = 'convergence';
        groups = [{
                id: `theme:${finding.theme.id}`,
                heading: capitalise(finding.theme.label),
                elements: [
                    ...atomsOfFinding(finding).map((member) => elementOf(member, quoted(member))),
                    ...block.more.map((member) => elementOf(member, 'support')),
                ],
            }];
    }
    const roles = [finding.kind];
    const drive = driveSentence(block);
    if (drive) {
        text = `${text} ${drive}`;
        roles.push('drive');
    }
    if (block.link !== 'lead' && block.link !== 'separate')
        roles.push(`link:${block.link}`);
    const link = linkConnection(block, sameParagraph);
    const driveWhy = driveConnection(block);
    connection = [connection, link, driveWhy].filter((part) => part.length > 0).join(' ');
    if (block.drive) {
        groups.push({
            id: `drive:${block.drive.basis.dimension}`,
            heading: capitalise(block.drive.basis.theme.label),
            elements: pickPerPillar(block.drive.basis.supports, 3).map((member) => elementOf(member, 'support')),
        });
    }
    const claim = {
        id: finding.id,
        relation,
        themeIds: [
            ...(finding.kind === 'tension' ? [] : [finding.theme.id]),
            ...(block.drive ? [block.drive.basis.theme.id] : []),
        ],
        ...(finding.kind === 'tension' ? { axis: finding.tension.axis } : {}),
        groups,
        pillars: pillarsOf(groups.flatMap((group) => group.elements.map((element) => ({ pillar: element.pillar })))),
        rule: `${finding.kind === 'tension' ? 'collide' : 'sharpen'}:${finding.tags}`,
    };
    return { text, groups, connection, relation, claim, roles };
}
/** The heaviest support from each tradition first, up to `limit`. */
function pickPerPillar(supports, limit) {
    const out = [];
    for (const support of supports) {
        if (out.length >= limit)
            break;
        if (!out.some((entry) => entry.pillar === support.pillar))
            out.push(support);
    }
    return out;
}
function realiseParagraph(entry, index) {
    const pillars = pillarsOf(entry.blocks.flatMap((block) => atomsOfFinding(block.finding)));
    const voicing = new Voicing(pillars.length >= 3);
    const parts = entry.blocks.map((block, position) => realiseBlock(block, voicing, position > 0));
    /* An element shown once per paragraph: a result a later block points back to is already listed. */
    const shown = new Set();
    const groups = [];
    for (const part of parts) {
        for (const group of part.groups) {
            /* A drive is a separate claim with its own support, so a result counted behind it is listed under it even when it was listed above. */
            const isDrive = group.id.startsWith('drive:');
            const elements = isDrive ? group.elements : group.elements.filter((element) => !shown.has(element.sourceKey));
            for (const element of elements)
                shown.add(element.sourceKey);
            if (elements.length > 0 || parts.length === 1)
                groups.push({ ...group, elements: parts.length === 1 ? group.elements : elements });
        }
    }
    const single = parts.length === 1 && !entry.blocks[0]?.drive;
    const relation = single ? (parts[0]?.relation ?? 'complementarity') : 'complementarity';
    const reference = {
        relation,
        pillars: pillarsOf(groups.flatMap((group) => group.elements.map((element) => ({ pillar: element.pillar })))),
        groups,
        connection: single ? (parts[0]?.connection ?? '') : parts.map((part) => part.connection).join(' '),
    };
    const kinds = parts.flatMap((part) => part.roles);
    return {
        claims: parts.map((part) => part.claim),
        paragraph: {
            id: `p${index + 1}-${kinds[0] ?? 'finding'}`,
            text: parts.map((part) => part.text).join(' '),
            claimIds: parts.map((part) => part.claim.id),
            reference,
            unitRoles: kinds,
        },
    };
}
/** Paragraphs and claims for the plan, in reading order. */
/** A paragraph holds what a reader can keep in mind: two related findings are one paragraph only while it stays short enough. */
/* (raised from 125 with the basis clause, so a paragraph holds the same findings it held before the traditions were named) */
const PARAGRAPH_WORDS = 140;
/**
 * Two findings that belong together are one paragraph, unless that makes it too long; and a
 * paragraph says what its findings are FOR once, so only the first drive in it is kept.
 */
function shapeParagraphs(plan) {
    const size = (block) => wordCount(realiseBlock(block, new Voicing(true), false).text);
    const out = [];
    for (const entry of plan.paragraphs) {
        let current = [];
        let words = 0;
        let driven = false;
        for (const block of entry.blocks) {
            const own = size(block);
            if (current.length > 0 && words + own > PARAGRAPH_WORDS) {
                out.push({ blocks: current });
                current = [];
                words = 0;
                driven = false;
            }
            const kept = block.drive && driven ? { ...block, drive: null } : block;
            driven = driven || kept.drive !== null;
            current.push(kept);
            words += own;
        }
        if (current.length > 0)
            out.push({ blocks: current });
    }
    return out;
}
export function realise(plan) {
    OPPOSED_ON = opposedOn(plan);
    return shapeParagraphs(plan).map((entry, index) => realiseParagraph(entry, index));
}
