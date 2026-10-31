import { SEMANTIC_AXES } from '../../semantics/semanticTaxonomy.js?v=d9f39e7';
import { HOUSEHOLD_CONCERN_CODES } from './contentTypes.js?v=d9f39e7';
import { both, fill, paragraph, pick, say } from './languages.js?v=d9f39e7';
import { isChildScoped } from './participantScope.js?v=d9f39e7';
import { forOneAdult } from './voice.js?v=d9f39e7';
import { addsAnAction, repeatsGenericStep, stepIntentsOf } from './practicalIntent.js?v=d9f39e7';
/* A household reading tells one central theme properly and at most two more: three things a person can hold, and the sentence about brothers and sisters. */
const MAX_INSIGHTS = 3;
const MAX_PER_KIND = 2;
/** At most this many cards for what the user reported: one excellent card is better than two of the same instruction. */
const MAX_HOUSEHOLD_CARDS = 2;
const AXIS_DYNAMIC = (finding) => finding.axis !== null;
const findingFor = (pair, dynamic) => pair.interpretation.findings.find((finding) => finding.id === dynamic && AXIS_DYNAMIC(finding));
const BAND_ORDER = ['infant-0-1', 'toddler-1-3', 'preschool-3-5', 'early-school-6-8', 'middle-school-9-12', 'early-adolescence-13-15', 'late-adolescence-16-18'];
const ageGap = (a, b) => (a && b ? Math.abs(BAND_ORDER.indexOf(a) - BAND_ORDER.indexOf(b)) : 0);
const PATTERN_RANK = { 'adult-same': 0, 'child-between': 1, 'adult-differs': 2, 'children-opposite': 3, 'adults-differ': 4, 'children-alike': 5 };
/** Patterns about what happens between the children themselves, and those about what happens between an adult and the children: two layers of one household. */
const SIBLING_LAYER = new Set(['children-opposite', 'children-alike']);
const listOf = (names, lang) => (names.length <= 1 ? (names[0] ?? '') : names.length === 2 ? both(names[0], names[1], lang) : `${names.slice(0, -1).join(', ')} ${lang === 'sk' ? 'a' : 'and'} ${names[names.length - 1]}`);
/** A placeholder for several names and, beside it, how many there are: `{easy}` and `{easy#}`. */
const namedVars = (key, names, lang) => ({ [key]: listOf(names, lang), [`${key}#`]: String(names.length) });
const axisPolesOf = (dynamic, finding) => {
    const axis = SEMANTIC_AXES.find((candidate) => candidate.id === finding.axis);
    return axis ? [axis.poles[0], axis.poles[1]] : null;
};
export function patternHits(args) {
    const { lang, label } = args;
    const adultPairs = args.pairs.filter((pair) => pair.kind === 'parent-child' || pair.kind === 'caregiver-child');
    const dynamics = [...new Set(args.pairs.flatMap((pair) => pair.interpretation.findings.filter(AXIS_DYNAMIC).map((finding) => finding.id)))].sort();
    const hits = [];
    const add = (hit) => {
        if (!args.has(hit.key))
            return;
        const behind = args.pairs.filter((pair) => hit.subjects.includes(pair.firstId) && hit.subjects.includes(pair.secondId));
        const lean = behind.some((pair) => pair.leanDynamics.has(hit.dynamic));
        hits.push({ ...hit, lean });
    };
    const byAdult = new Map();
    const byChild = new Map();
    for (const pair of adultPairs) {
        byAdult.set(pair.firstId, [...(byAdult.get(pair.firstId) ?? []), pair]);
        byChild.set(pair.secondId, [...(byChild.get(pair.secondId) ?? []), pair]);
    }
    for (const dynamic of dynamics) {
        /* one adult, the same difference with two children or more */
        for (const [adultId, pairs] of byAdult) {
            const opposed = pairs.filter((pair) => findingFor(pair, dynamic)?.relation === 'opposed');
            const shared = pairs.filter((pair) => findingFor(pair, dynamic)?.relation === 'shared');
            const adultPole = findingFor(opposed[0] ?? shared[0] ?? pairs[0], dynamic)?.a;
            if (!adultPole)
                continue;
            if (opposed.length >= 2 && opposed.every((pair) => findingFor(pair, dynamic)?.a === adultPole)) {
                add({
                    kind: 'adult-same', dynamic, key: `${dynamic}/adult-same:${adultPole}`, subjects: [adultId, ...opposed.map((pair) => pair.secondId)],
                    vars: { ...namedVars('adult', [label(adultId)], lang), ...namedVars('children', opposed.map((pair) => label(pair.secondId)), lang) },
                    salience: opposed.reduce((sum, pair) => sum + (findingFor(pair, dynamic)?.salience ?? 0), 0) / opposed.length,
                });
            }
            else if (opposed.length >= 1 && shared.length >= 1 && opposed.every((pair) => findingFor(pair, dynamic)?.a === adultPole) && shared.every((pair) => findingFor(pair, dynamic)?.a === adultPole)) {
                add({
                    kind: 'adult-differs', dynamic, key: `${dynamic}/adult-differs:${adultPole}`, subjects: [adultId, ...shared.map((pair) => pair.secondId), ...opposed.map((pair) => pair.secondId)],
                    vars: { ...namedVars('adult', [label(adultId)], lang), ...namedVars('easy', shared.map((pair) => label(pair.secondId)), lang), ...namedVars('hard', opposed.map((pair) => label(pair.secondId)), lang) },
                    salience: (findingFor(opposed[0], dynamic)?.salience ?? 0) + (findingFor(shared[0], dynamic)?.salience ?? 0),
                });
            }
        }
        /* one child leaning as one adult does and against the other */
        for (const [childId, pairs] of byChild) {
            const easy = pairs.find((pair) => findingFor(pair, dynamic)?.relation === 'shared');
            const hard = pairs.find((pair) => findingFor(pair, dynamic)?.relation === 'opposed' && pair.firstId !== easy?.firstId);
            const childPole = easy ? findingFor(easy, dynamic)?.b : null;
            if (!easy || !hard || !childPole)
                continue;
            add({
                kind: 'child-between', dynamic, key: `${dynamic}/child-between:${childPole}`, subjects: [childId, easy.firstId, hard.firstId],
                vars: { ...namedVars('child', [label(childId)], lang), ...namedVars('easy', [label(easy.firstId)], lang), ...namedVars('hard', [label(hard.firstId)], lang) },
                salience: (findingFor(easy, dynamic)?.salience ?? 0) + (findingFor(hard, dynamic)?.salience ?? 0),
            });
        }
    }
    /* two children, and two adults, read from the pair that already knows */
    for (const pair of args.pairs.filter((candidate) => candidate.kind === 'siblings-in-household')) {
        for (const finding of pair.interpretation.findings.filter(AXIS_DYNAMIC)) {
            const poles = axisPolesOf(finding.id, finding);
            if (!poles)
                continue;
            const holder0 = finding.a === poles[0] ? pair.firstId : pair.secondId;
            const holder1 = holder0 === pair.firstId ? pair.secondId : pair.firstId;
            if (finding.relation === 'opposed') {
                add({ kind: 'children-opposite', dynamic: finding.id, key: `${finding.id}/children-opposite`, subjects: [pair.firstId, pair.secondId], vars: { p0: label(holder0), p1: label(holder1) }, salience: finding.salience });
            }
            else if (finding.relation === 'shared' && finding.a && ageGap(args.bands.get(pair.firstId), args.bands.get(pair.secondId)) < 3) {
                add({ kind: 'children-alike', dynamic: finding.id, key: `${finding.id}/children-alike:${finding.a}`, subjects: [pair.firstId, pair.secondId], vars: { both: both(label(pair.firstId), label(pair.secondId), lang) }, salience: finding.salience });
            }
        }
    }
    for (const pair of args.pairs.filter((candidate) => candidate.kind === 'co-parents')) {
        for (const finding of pair.interpretation.findings.filter(AXIS_DYNAMIC)) {
            if (finding.relation !== 'opposed' || finding.weight < 2)
                continue;
            const poles = axisPolesOf(finding.id, finding);
            if (!poles)
                continue;
            const holder0 = finding.a === poles[0] ? pair.firstId : pair.secondId;
            const holder1 = holder0 === pair.firstId ? pair.secondId : pair.firstId;
            add({ kind: 'adults-differ', dynamic: finding.id, key: `${finding.id}/adults-differ`, subjects: [pair.firstId, pair.secondId], vars: { p0: label(holder0), p1: label(holder1) }, salience: finding.salience });
        }
    }
    return hits.sort((x, y) => PATTERN_RANK[x.kind] - PATTERN_RANK[y.kind] || y.salience - x.salience || (x.key < y.key ? -1 : 1));
}
/* ------------------------------------------------------------ what the user reported -- */
/** The codes the household answers itself: brothers and sisters, the two adults, and (told only where a pattern really touches it) going quiet. */
const isHouseholdConcern = (code) => HOUSEHOLD_CONCERN_CODES.includes(code);
/** Whether a pattern speaks DIRECTLY to a reported concern: it is about the same thing the user described, not merely about the same household. */
const SPEAKS = {
    'sibling-friction': (ref) => ref.kind === 'children-opposite' || ref.kind === 'children-alike',
    'unfair-comparison': (ref) => ref.kind === 'children-opposite',
    'parents-disagree-on-approach': (ref) => ref.kind === 'adults-differ' || ref.kind === 'child-between',
    'withdraws-when-upset': (ref) => ref.dynamic === 'processing-pace' || ref.dynamic === 'emotional-expression',
    'resists-rules': (ref) => ref.dynamic === 'taking-the-lead' || ref.dynamic === 'structure-and-flexibility',
};
/** Whether a pattern only TOUCHES the concern at its edge: an adult who meets one child more easily than another can be part of why treatment looks uneven, or why adults seem to disagree. */
const ADJACENT = {
    'unfair-comparison': (ref) => ref.kind === 'adult-differs' || ref.kind === 'child-between',
    'parents-disagree-on-approach': (ref) => ref.kind === 'adult-differs',
};
/* Going quiet is told in each parent-and-child reading too: the household answers it, but it never decides the household's step over a problem between the people in it. */
const ENDS_LAST = new Set(['withdraws-when-upset']);
const insightRef = (kind, dynamic) => ({ kind: kind === 'adult-adapts' ? 'adult-same' : kind === 'child-fit-differs' ? 'child-between' : kind, dynamic });
const emptyTrace = { hits: [], concerns: [], adultsNamed: [], childrenNamed: [], adultsUnnamed: [], scopeRejected: [] };
function composeHousehold(args) {
    const { lang, pairs, content, seed } = args;
    const household = content.household;
    if (!household)
        return { headline: null, paragraphs: [], insights: [], quiet: true, practices: [], trace: emptyTrace };
    const label = (id) => args.people.find((person) => person.id === id)?.label ?? id;
    const adultPairs = pairs.filter((pair) => pair.kind === 'parent-child' || pair.kind === 'caregiver-child');
    const adultIds = new Set([...adultPairs.map((pair) => pair.firstId), ...pairs.filter((pair) => pair.kind === 'co-parents').flatMap((pair) => [pair.firstId, pair.secondId])]);
    const readChildIds = new Set([...adultPairs.map((pair) => pair.secondId), ...pairs.filter((pair) => pair.kind === 'siblings-in-household').flatMap((pair) => [pair.firstId, pair.secondId])]);
    const dynamics = [...new Set(pairs.flatMap((pair) => pair.interpretation.findings.filter(AXIS_DYNAMIC).map((finding) => finding.id)))].sort();
    const insights = [];
    const concerns = [...new Set(args.context.filter(isHouseholdConcern))];
    const ownConcerns = household.concerns ?? {};
    const bank = args.shared.narrative.observed;
    const place = (text, vars) => fill(text, vars);
    const children = new Set(adultPairs.map((pair) => pair.secondId));
    /* ------------------------------------------------------------------ the reported concerns -- */
    const fitOf = (code, told) => {
        const spoken = told.find(SPEAKS[code]);
        if (spoken)
            return { fit: 'speaks', ref: spoken };
        const touched = ADJACENT[code] ? told.find(ADJACENT[code]) : undefined;
        return touched ? { fit: 'adjacent', ref: touched } : { fit: 'apart', ref: null };
    };
    /* The user's words, said back once, then the one sentence that keeps the evidence and the report apart. */
    const concernParagraphs = (told) => {
        const resolved = concerns.map((code) => ({ code, ...fitOf(code, told) }));
        const items = resolved.map((entry) => {
            const own = ownConcerns[entry.code];
            const echo = say(args.shared.observed[entry.code].echo, lang);
            let framing;
            let caution = null;
            if (entry.fit === 'speaks') {
                framing = fill(say(pick(bank.speaks, seed, `${entry.ref.kind}|${entry.ref.dynamic}|speaks`), lang), { phrase: args.phraseOf(entry.ref.dynamic) });
                caution = own ? say(own.caution, lang) : null;
            }
            else if (entry.fit === 'adjacent' && own) {
                framing = fill(say(own.adjacent, lang), { phrase: args.phraseOf(entry.ref.dynamic) });
                caution = say(own.caution, lang);
            }
            else
                framing = own ? say(own.apart, lang) : say(pick(bank.silent, seed, `${entry.code}|silent`), lang);
            return { echo, framing, caution };
        }).reduce((merged, item) => {
            /* two things the user noticed that the household answers in the same words are answered once */
            const last = merged[merged.length - 1];
            if (last && last.framing === item.framing)
                last.echoes.push(item.echo);
            else
                merged.push({ echoes: [item.echo], framing: item.framing, caution: item.caution });
            return merged;
        }, []);
        return { paragraphs: items.map((item) => paragraph(...item.echoes, item.framing, item.caution)), resolved };
    };
    /* The agreement and the question that follow from what the user reported, when the pattern told does not answer it; null when every concern was spoken to. */
    const concernEnding = (resolved) => {
        const unmet = [...resolved].filter((entry) => entry.fit !== 'speaks' && ownConcerns[entry.code]).sort((x, y) => Number(ENDS_LAST.has(x.code)) - Number(ENDS_LAST.has(y.code)))[0];
        const own = unmet ? ownConcerns[unmet.code] : undefined;
        return own ? { step: say(own.step, lang), question: say(own.question, lang), stepEnglish: own.step.en } : null;
    };
    /* The cards (each with its research) for what was reported, at most two, from different concerns, suited to the ages that were read. */
    const cardsFor = (resolved, stepEnglish, named = []) => {
        /* a card is written for an age: it is offered only if every child the page names is of an age it suits (a card for quarrels settled in words is not for a four-year-old); a page that names no child falls back on the children read */
        const namedBands = named.map((id) => args.bands.get(id)).filter((band) => band !== undefined);
        const eligible = new Set(namedBands.length > 0 ? namedBands : [...readChildIds].map((id) => args.bands.get(id)).filter((band) => band !== undefined));
        const out = [];
        /* a card that asks again for what the step, or a card already chosen, asks is the same instruction in other words: it is not offered */
        const asked = new Set(stepIntentsOf(stepEnglish));
        for (const entry of resolved) {
            if (out.length >= MAX_HOUSEHOLD_CARDS)
                break;
            for (const id of ownConcerns[entry.code]?.practices ?? []) {
                const practice = content.practices.find((candidate) => candidate.id === id);
                if (!practice || out.some((card) => card.id === id))
                    continue;
                if (practice.triggers.ages && (eligible.size === 0 || ![...eligible].every((band) => practice.triggers.ages?.includes(band))))
                    continue;
                if (repeatsGenericStep(practice.intents ?? [], stepIntentsOf(stepEnglish)) || !addsAnAction(practice.intents ?? [], asked))
                    continue;
                for (const intent of practice.intents ?? [])
                    asked.add(intent);
                out.push({ id, title: say(practice.title, lang), body: say(practice.body, lang), forLabel: null, sources: practice.sources, dynamic: practice.triggers.dynamic });
                break;
            }
        }
        return out;
    };
    /* ------------------------------------------------------------------------ the patterns -- */
    const patterns = household.patterns;
    const scopeRejected = [];
    const allHits = patterns ? patternHits({ lang, pairs, label, bands: args.bands, has: (key) => (patterns[key]?.passage[lang] ?? '').length > 0 }) : [];
    /* A step or question that speaks of "them" or "each of them" says first whom it means: the page puts other paragraphs (what the user reported) between the patterns and the step, and a
       pronoun that points back across them can reach children the pattern does not rest on. The names stand as a label, in the nominative. */
    const ANAPHOR = lang === 'en' ? /\b(each of them|all of them|any of them|whichever of them|them|their)\b/i : /(\bz nich\b|\bnich\b|\bich\b)/i;
    const labelled = (text, hit) => {
        if (!ANAPHOR.test(text) || !household.stepLabel)
            return text;
        const names = hit.subjects.filter((id) => !adultIds.has(id)).map(label);
        return names.length === 0 ? text : paragraph(fill(say(household.stepLabel, lang), namedVars('names', names, lang)), text);
    };
    const rendered = [];
    for (const hit of allHits) {
        const pattern = patterns?.[hit.key];
        if (!pattern)
            continue;
        const told = {
            hit, pattern, title: place(say(pattern.title, lang), hit.vars), passage: place(say(pattern.passage, lang), hit.vars),
            step: labelled(place(say(pattern.step, lang), hit.vars), hit), question: place(say(pattern.question, lang), hit.vars),
        };
        /* fail closed: a passage with a word that reaches beyond the children it rests on is not told */
        if (!isChildScoped([told.title, told.passage, told.step, told.question], lang)) {
            scopeRejected.push(hit.key);
            continue;
        }
        rendered.push(told);
    }
    if (rendered.length > 0) {
        const adultsOf = (told) => told.hit.subjects.filter((id) => adultIds.has(id));
        const refOf = (told) => ({ kind: told.hit.kind, dynamic: told.hit.dynamic });
        /* What the user said they live with decides which pattern is told first: brothers and sisters, or the two adults, before one adult's pattern with each child; but only a pattern
           that rests on more than a slight lean may take the lead. Otherwise the strongest the pairs show leads, and the concern is answered on its own terms below. */
        const lead = concerns.map((code) => rendered.find((candidate) => !candidate.hit.lean && SPEAKS[code](refOf(candidate)))).find((candidate) => Boolean(candidate));
        const first = lead ?? rendered[0];
        const firstAdults = new Set(adultsOf(first));
        /* The second pattern is told only if it adds something. In order of what it adds: it speaks to something else the user reported; it touches that at the edge; it is the strongest
           evidence the pairs show when the lead was another; it names an adult the first did not. It may share a dimension with the first only if it is the other layer of the household (the
           adult with the children, the children with one another) or if it speaks to what the user reported: a household has both layers. */
        const unmetCodes = concerns.filter((code) => !SPEAKS[code](refOf(first)));
        const serves = (candidate, test) => !candidate.hit.lean && unmetCodes.some(test);
        const speaksToMore = (candidate) => serves(candidate, (code) => SPEAKS[code](refOf(candidate)));
        const touchesMore = (candidate) => serves(candidate, (code) => Boolean(ADJACENT[code]?.(refOf(candidate))));
        const rest = rendered.filter((candidate) => candidate !== first && (candidate.hit.dynamic !== first.hit.dynamic || SIBLING_LAYER.has(candidate.hit.kind) !== SIBLING_LAYER.has(first.hit.kind) || speaksToMore(candidate) || touchesMore(candidate)));
        /* in a household with two adults, a pattern that names both of them is worth more than one that names one: the household is not told as one adult's */
        const namesEveryAdult = (candidate) => adultIds.size > 1 && [...adultIds].every((adult) => adultsOf(candidate).includes(adult)) && [...adultIds].some((adult) => !firstAdults.has(adult));
        const second = rest.find(speaksToMore)
            ?? rest.find(touchesMore)
            ?? (concerns.length === 0 ? rest.find((candidate) => !candidate.hit.lean && namesEveryAdult(candidate)) : undefined)
            ?? (lead && lead !== rendered[0] ? rest.find((candidate) => candidate === rendered[0]) : undefined)
            ?? (concerns.length === 0 ? rest.find((candidate) => adultsOf(candidate).some((adult) => !firstAdults.has(adult))) : undefined);
        const answered = concernParagraphs([first, second].filter((candidate) => Boolean(candidate)).map(refOf));
        const concernFirst = household.alsoShows !== undefined && answered.resolved.length > 0 && answered.resolved.every((entry) => entry.fit === 'apart') && concernEnding(answered.resolved) !== null;
        const toldHits = (concernFirst ? [first] : [first, second]).filter((candidate) => Boolean(candidate));
        const { paragraphs: noticed, resolved } = concernFirst ? concernParagraphs(toldHits.map(refOf)) : answered;
        const passageParagraphs = (candidate) => candidate.passage.split('\n\n').map((text, index) => (candidate.hit.lean && index === 0 && candidate === first ? paragraph(text, say(pick(args.shared.narrative.lean, seed, `${candidate.hit.key}|lean`), lang)) : text));
        /* How the two join at household level: the same adult, or the same children, stand inside both. */
        let bridge = null;
        if (!concernFirst && second && household.bridges) {
            const sharedAdults = adultsOf(first).filter((id) => adultsOf(second).includes(id));
            const sharedChildren = first.hit.subjects.filter((id) => !adultIds.has(id) && second.hit.subjects.includes(id));
            if (sharedAdults.length > 0)
                bridge = place(say(household.bridges.sameAdult, lang), { ...namedVars('adult', sharedAdults.map(label), lang) });
            else if (sharedChildren.length === 1)
                bridge = place(say(household.bridges.sameChild, lang), { ...namedVars('child', sharedChildren.map(label), lang) });
            else if (sharedChildren.length > 1)
                bridge = place(say(household.bridges.sameChildren, lang), { ...namedVars('children', sharedChildren.map(label), lang) });
        }
        const secondParagraphs = !concernFirst && second ? passageParagraphs(second) : [];
        if (bridge && secondParagraphs.length > 0)
            secondParagraphs[secondParagraphs.length - 1] = paragraph(secondParagraphs[secondParagraphs.length - 1], bridge);
        /* A household with two adults should not read as if one was forgotten: an adult with pairs of their own that no pattern told names is named, and the reading says where they are read. */
        const namedAdults = new Set(toldHits.flatMap(adultsOf));
        const unnamedAdults = [...adultIds].filter((id) => !namedAdults.has(id));
        const scopeNote = adultIds.size > 1 && unnamedAdults.length > 0 && household.bridges
            ? place(say(household.bridges.unnamedAdult, lang), { ...namedVars('adult', unnamedAdults.map(label), lang) })
            : null;
        const ending = concernEnding(resolved);
        /* the sentence about not ranking children belongs where comparison was reported, or where two children were told as opposite */
        const comparesChildren = concerns.includes('unfair-comparison') || (concerns.length === 0 && toldHits.some((candidate) => candidate.hit.kind === 'children-opposite'));
        const closing = children.size > 1 && comparesChildren ? [say(household.closing, lang)] : [];
        /* When the evidence addresses none of what the user reported, the page answers them first (their words, what is known to help, the step and the question about the problem itself) and
           only then tells what the profiles do show: a page that opens with an unrelated pattern and ends with an answer about something else does not read as one page. */
        const paragraphs = concernFirst
            ? [...noticed, ending.step, ending.question, ...closing, say(household.alsoShows, lang), ...passageParagraphs(first).slice(0, 1), ...(scopeNote ? [scopeNote] : [])]
            : [...passageParagraphs(first), ...secondParagraphs, ...noticed, ...(scopeNote ? [scopeNote] : []), ending?.step ?? first.step, ending?.question ?? first.question, ...closing];
        return {
            headline: concernFirst ? null : first.title, paragraphs, quiet: false,
            insights: toldHits.map((candidate) => ({ kind: insightKind(candidate.hit.kind), dynamic: candidate.hit.dynamic, subjects: candidate.hit.subjects, text: candidate.passage })),
            practices: cardsFor(resolved, ending?.stepEnglish ?? first.pattern.step.en, [...new Set(toldHits.flatMap((candidate) => candidate.hit.subjects.filter((id) => !adultIds.has(id))))]),
            trace: {
                hits: allHits.map((hit) => ({ key: hit.key, kind: hit.kind, dynamic: hit.dynamic, subjects: hit.subjects, lean: hit.lean, told: toldHits.some((candidate) => candidate.hit === hit) })),
                concerns: resolved.map((entry) => ({ code: entry.code, fit: entry.fit, key: entry.ref ? (toldHits.find((candidate) => candidate.hit.kind === entry.ref?.kind && candidate.hit.dynamic === entry.ref?.dynamic)?.hit.key ?? null) : null })),
                adultsNamed: [...namedAdults], childrenNamed: [...new Set(toldHits.flatMap((candidate) => candidate.hit.subjects.filter((id) => !adultIds.has(id))))],
                adultsUnnamed: unnamedAdults, scopeRejected,
            },
        };
    }
    /* --------------------------------------------------------- the shorter insights (V2) -- */
    /* A child who meets two adults differently on the same dimension. */
    for (const dynamic of dynamics) {
        const byChild = new Map();
        for (const pair of adultPairs)
            byChild.set(pair.secondId, [...(byChild.get(pair.secondId) ?? []), pair]);
        for (const [childId, childPairs] of byChild) {
            const easy = childPairs.find((pair) => eases(findingFor(pair, dynamic)));
            const hard = childPairs.find((pair) => rubs(findingFor(pair, dynamic)));
            if (!easy || !hard || easy.firstId === hard.firstId)
                continue;
            const salience = (findingFor(hard, dynamic)?.salience ?? 0) + (findingFor(easy, dynamic)?.salience ?? 0);
            const text = fill(say(pick(household.childFitDiffers, seed, `fit|${childId}|${dynamic}`), lang), {
                x: label(easy.firstId), y: label(childId), u: label(hard.firstId), v: label(childId), phrase: args.phraseOf(dynamic),
            });
            insights.push({
                kind: 'child-fit-differs', dynamic, subjects: [easy.firstId, hard.firstId, childId], text, salience,
                vars: { x: label(easy.firstId), y: label(childId), u: label(hard.firstId), v: label(childId), phrase: args.phraseOf(dynamic) },
            });
        }
    }
    /* An adult who runs into the same difference with every child (two children at least). */
    const byAdult = new Map();
    for (const pair of adultPairs)
        byAdult.set(pair.firstId, [...(byAdult.get(pair.firstId) ?? []), pair]);
    for (const [adultId, adultsPairs] of byAdult) {
        if (adultsPairs.length < 2)
            continue;
        for (const dynamic of dynamics) {
            if (!adultsPairs.every((pair) => rubs(findingFor(pair, dynamic))))
                continue;
            const salience = adultsPairs.reduce((sum, pair) => sum + (findingFor(pair, dynamic)?.salience ?? 0), 0) / adultsPairs.length;
            insights.push({
                kind: 'adult-adapts', dynamic, subjects: [adultId],
                text: fill(say(pick(household.adultAdapts, seed, `adapts|${adultId}|${dynamic}`), lang), { parent: label(adultId), phrase: args.phraseOf(dynamic) }),
                salience, vars: { parent: label(adultId), phrase: args.phraseOf(dynamic) },
            });
        }
    }
    /* Two children at opposite ends of a dimension, or at the same end. Read from the sibling pair, which already knows. */
    for (const pair of pairs.filter((candidate) => candidate.kind === 'siblings-in-household')) {
        for (const finding of pair.interpretation.findings.filter(AXIS_DYNAMIC)) {
            if (finding.relation !== 'opposed' && finding.relation !== 'shared')
                continue;
            const opposite = finding.relation === 'opposed';
            /* A shared routine for a nine-year-old and a seventeen-year-old on the strength of a shared lean is not advice anyone could use: only children of near ages are told as alike. */
            if (!opposite && ageGap(args.bands.get(pair.firstId), args.bands.get(pair.secondId)) >= 3)
                continue;
            const list = opposite ? household.childrenOpposite : household.childrenAlike;
            insights.push({
                kind: opposite ? 'children-opposite' : 'children-alike', dynamic: finding.id, subjects: [pair.firstId, pair.secondId],
                text: fill(say(pick(list, seed, `sib|${pair.firstId}|${pair.secondId}|${finding.id}`), lang), { c1: label(pair.firstId), c2: label(pair.secondId), phrase: args.phraseOf(finding.id) }),
                salience: finding.salience, vars: { c1: label(pair.firstId), c2: label(pair.secondId), phrase: args.phraseOf(finding.id) },
            });
        }
    }
    /* Two adults who would approach a dimension differently. */
    for (const pair of pairs.filter((candidate) => candidate.kind === 'co-parents')) {
        for (const finding of pair.interpretation.findings.filter(AXIS_DYNAMIC)) {
            if (finding.relation !== 'opposed' || finding.weight < 2)
                continue;
            insights.push({
                kind: 'adults-differ', dynamic: finding.id, subjects: [pair.firstId, pair.secondId],
                text: fill(say(pick(household.adultsDiffer, seed, `co|${pair.firstId}|${pair.secondId}|${finding.id}`), lang), { p1: label(pair.firstId), p2: label(pair.secondId), phrase: args.phraseOf(finding.id) }),
                salience: finding.salience, vars: { p1: label(pair.firstId), p2: label(pair.secondId), phrase: args.phraseOf(finding.id) },
            });
        }
    }
    /* One dimension, two things true at once: the adults differ there, and the child meets each of them differently. Told as two sentences they read as one point made twice, so
       they are told as one. */
    for (const fit of insights.filter((insight) => insight.kind === 'child-fit-differs')) {
        const adults = new Set([fit.subjects[0], fit.subjects[1]]);
        const differ = insights.find((insight) => insight.kind === 'adults-differ' && insight.dynamic === fit.dynamic && insight.subjects.length === 2 && insight.subjects.every((id) => adults.has(id)));
        if (!differ)
            continue;
        insights.splice(insights.indexOf(differ), 1);
        insights.splice(insights.indexOf(fit), 1, {
            ...fit, combined: true, salience: fit.salience + differ.salience,
            text: fill(say(pick(household.combined, seed, `combined|${fit.subjects.join(',')}|${fit.dynamic}`), lang), { x: fit.vars.x, y: fit.vars.y, u: fit.vars.u, phrase: fit.vars.phrase }),
        });
    }
    /* Choose. A household reading that says the same thing several times is not richer for it, so the strongest insight of each DIMENSION is taken, the strongest of all first; only
       if that leaves the reading thin does a second pass add more of a dimension already told. */
    const ordered = insights.sort((x, y) => y.salience - x.salience || (x.text < y.text ? -1 : 1));
    const chosen = [];
    const perKind = new Map();
    const taken = new Set();
    const takeFrom = (candidates, onePerDynamic) => {
        for (const insight of candidates) {
            if (chosen.length >= MAX_INSIGHTS)
                return;
            const key = `${insight.kind}|${insight.dynamic}|${insight.subjects.join(',')}`;
            if (taken.has(key) || (perKind.get(insight.kind) ?? 0) >= MAX_PER_KIND)
                continue;
            if (onePerDynamic && chosen.some((existing) => existing.dynamic === insight.dynamic))
                continue;
            taken.add(key);
            perKind.set(insight.kind, (perKind.get(insight.kind) ?? 0) + 1);
            chosen.push(insight);
        }
    };
    takeFrom(ordered, true);
    if (chosen.length < 2)
        takeFrom(ordered, false);
    const trace = (resolved) => ({
        hits: allHits.map((hit) => ({ key: hit.key, kind: hit.kind, dynamic: hit.dynamic, subjects: hit.subjects, lean: hit.lean, told: false })),
        concerns: resolved.map((entry) => ({ code: entry.code, fit: entry.fit, key: null })),
        adultsNamed: [...new Set(chosen.flatMap((insight) => insight.subjects.filter((id) => adultIds.has(id))))],
        childrenNamed: [...new Set(chosen.flatMap((insight) => insight.subjects.filter((id) => !adultIds.has(id))))],
        adultsUnnamed: [], scopeRejected,
    });
    if (chosen.length === 0) {
        /* No pattern to tell. What the user reported is still answered, on its own terms: the household is not left with a shrug. */
        const { paragraphs: noticed, resolved } = concernParagraphs([]);
        const ending = concernEnding(resolved);
        return {
            headline: null, quiet: true, insights: [], practices: cardsFor(resolved, ending?.stepEnglish ?? ''), trace: trace(resolved),
            paragraphs: [say(household.quiet, lang), ...noticed, ...(ending ? [ending.step, ending.question] : [])],
        };
    }
    /* The story: the household's central theme in a paragraph of its own, the other things worth knowing in the next, then a step that follows from the central theme and one question,
       and, where there is more than one child, the sentence about not ranking them. */
    const [central, ...rest] = chosen;
    const refs = chosen.map((insight) => insightRef(insight.kind, insight.dynamic));
    const { paragraphs: noticed, resolved } = concernParagraphs(refs);
    const ending = concernEnding(resolved);
    /* (a child under three is read for no style and is never among the pairs here: see analysis.ts) */
    const next = fill(say(pick(household.next[central.kind], seed, `next|${central.kind}`), lang), central.vars);
    const ask = fill(say(pick(household.ask[central.kind], seed, `ask|${central.kind}`), lang), central.vars);
    const paragraphs = [
        say(pick(household.intro, seed, 'intro'), lang),
        central.text,
        ...(rest.length ? [paragraph(...rest.map((insight) => insight.text))] : []),
        ...noticed,
        ending ? paragraph(ending.step, ending.question) : paragraph(next, ask),
        ...(children.size > 1 ? [say(household.closing, lang)] : []),
    ];
    return {
        headline: null,
        paragraphs,
        insights: chosen.map((insight) => ({ kind: insight.kind, combined: insight.combined, dynamic: insight.dynamic, subjects: insight.subjects, text: insight.text })),
        quiet: false,
        practices: cardsFor(resolved, ending?.stepEnglish ?? ''),
        trace: trace(resolved),
    };
}
/** The household reading. In a household of one adult the Slovak steps are in the singular ("Nechaj"), as the rest of the page already addresses one parent. */
export function householdReadingOf(args) {
    const reading = composeHousehold(args);
    const adults = new Set(args.pairs.flatMap((pair) => (pair.kind === 'co-parents' ? [pair.firstId, pair.secondId] : pair.kind === 'parent-child' || pair.kind === 'caregiver-child' ? [pair.firstId] : [])));
    if (adults.size !== 1 || args.lang !== 'sk')
        return reading;
    const voice = (text) => forOneAdult(text, 'sk');
    return {
        ...reading,
        headline: reading.headline === null ? null : voice(reading.headline),
        paragraphs: reading.paragraphs.map(voice),
        practices: reading.practices.map((card) => ({ ...card, title: voice(card.title), body: voice(card.body) })),
    };
}
const insightKind = (kind) => (kind === 'adult-same' || kind === 'adult-differs' ? 'adult-adapts' : kind === 'child-between' ? 'child-fit-differs' : kind);
const eases = (finding) => finding !== undefined && (finding.role === 'resonance' || finding.role === 'complement');
const rubs = (finding) => finding !== undefined && finding.role === 'friction';
