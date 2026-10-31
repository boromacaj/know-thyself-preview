import { SEMANTIC_AXES } from '../../semantics/semanticTaxonomy.js';
import { CONTEXT_FOCUS } from '../domains/dynamics.js';
import { FAMILY_OF } from '../evidence/pairEvidence.js';
import { isDirectedKind } from '../model/connectionsTypes.js';
import { isLeanFinding, planNarrative } from '../narrative/plan.js';
import { addsAnAction, repeatsGenericStep, stepIntentsOf } from './practicalIntent.js';
import { both, fill, hashOf, paragraph, pick, say, sentence } from './languages.js';
import { forAge } from './ageWords.js';
import { signatureViews } from './signatureText.js';
import { KIND_REPLACES, MECHANISM_ALTERNATES, OBSERVED_ALTERNATES } from './content/englishAlternates.js';
import { ASIDE_HEDGE, FAMILY_INPUT, LEAD_CLAUSE, LEAD_FIRMNESS, LEAD_FRAME, LEAD_SECOND, PILLAR_NAMES, PILLAR_ORDER, SECOND_NOUN, SOFT_SCENES, SUPPORTED_NOTE, leadFrameKindOf, relationClassOf, secondNatureOf, } from './content/romanticEn.js';
/** The guidance is the few suggestions that follow from the story, not a filled-up list. */
const MAX_PRACTICES = 2;
/** How many threads beside the central one a reading tells. */
const MAX_ASIDES = 1;
const MAX_PRACTICES_PER_DYNAMIC = 2;
const axisById = new Map(SEMANTIC_AXES.map((axis) => [axis.id, axis]));
const t = (ctx, text) => say(text, ctx.lang);
/**
 * ENGLISH ONLY. The wording of a mechanism field for THIS telling of it: the original or one of its alternates (content/englishAlternates.ts). Where a household tells the same mechanism on
 * several pages, each page takes the next wording; elsewhere the wording is picked from the pair alone. A text written for one kind of relationship replaces the original outright. An
 * alternate with a different number of paragraphs than the original is never used. The Slovak text is returned as it is, so Slovak is chosen and counted exactly as before.
 */
function alternateText(ctx, told, field, original) {
    if (ctx.lang !== 'en')
        return original;
    const { domain, kind } = ctx.req;
    const sameShape = (text) => text.split('\n\n').length === original.split('\n\n').length;
    const kindKey = `${domain}|${kind}|${told.key}#${field}`;
    if (KIND_REPLACES.has(kindKey)) {
        const only = MECHANISM_ALTERNATES[kindKey]?.[0];
        return only !== undefined && sameShape(only) ? only : original;
    }
    const key = `${domain}|${told.key}#${field}`;
    const options = (MECHANISM_ALTERNATES[key] ?? []).filter(sameShape);
    if (options.length === 0)
        return original;
    const all = [original, ...options];
    const counts = ctx.req.variantCounts;
    const seen = counts?.get(key) ?? 0;
    counts?.set(key, seen + 1);
    return all[(hashOf(`${ctx.req.variantSeed ?? ctx.req.seed}|${key}`) + seen) % all.length];
}
/** ENGLISH ONLY. A stock sentence about what the user noticed, or another wording of it, picked from the pair alone. */
function observedText(ctx, chosen, key) {
    if (ctx.lang !== 'en')
        return chosen;
    const options = OBSERVED_ALTERNATES[chosen.en];
    if (!options)
        return chosen;
    const all = [chosen.en, ...options];
    return { en: all[hashOf(`${ctx.req.seed}|${key}|${chosen.en}`) % all.length], sk: chosen.sk };
}
/** One of the variants, chosen by the seed and the key, and a different one from any already used in this reading while there is one left to use. */
function chooseVariant(ctx, bank, key) {
    const start = hashOf(`${ctx.req.seed}|${key}`) % bank.length;
    for (let offset = 0; offset < bank.length; offset += 1) {
        const candidate = bank[(start + offset) % bank.length];
        if (!ctx.usedVariants.has(candidate.en)) {
            ctx.usedVariants.add(candidate.en);
            return candidate;
        }
    }
    return bank[start];
}
/** Which person holds which end of an axis, given the pole each leans to. */
function personsOnAxis(ctx, relation) {
    const axis = axisById.get(relation.axis);
    const [pole0] = axis.poles;
    if (relation.poleA && relation.poleB && relation.poleA !== relation.poleB) {
        return relation.poleA === pole0 ? { p0: ctx.names.first, p1: ctx.names.second } : { p0: ctx.names.second, p1: ctx.names.first };
    }
    return null;
}
const nameOf = (ctx, who) => (who === 'first' ? ctx.names.first : ctx.names.second);
/** In a relationship with roles (manager and collaborator, parent and child, mentor and mentee) the sentence that says who is like what names the role beside the name, so a reading with the roles swapped does not read the same: "Pavel (the manager) reads as someone who...". In Slovak a role noun can carry a gender, so the kind may give a neutral tag instead (`tags`). */
function withRole(ctx, name) {
    if (!isDirectedKind(ctx.req.kind))
        return name;
    const kind = ctx.req.content.domain.kinds[ctx.req.kind];
    const roles = kind?.tags ?? kind?.roles;
    if (!roles)
        return name;
    /* English puts the role in brackets; Slovak says it in a phrase ("Katarina ako starý rodič", "Pavel v manažérskej úlohe"), as a brackets-and-noun tag reads like a form */
    const tagged = (role) => (ctx.lang === 'sk' ? (role.startsWith('v ') ? `${name} ${role}` : `${name} ako ${role}`) : `${name} (${role})`);
    if (name === ctx.names.first)
        return tagged(t(ctx, roles[0]));
    if (name === ctx.names.second)
        return tagged(t(ctx, roles[1]));
    return name;
}
/** The dimension view's own bridges: a person who appears in two dimensions that can seem to pull apart gets the same bridge there, whether or not the story told both. */
function crossBridgesAt(ctx, plan, findingId) {
    const shared = ctx.req.content.shared.narrative.tensions;
    const out = [];
    for (const hit of plan.crossAxis) {
        if (hit.b.findingId !== findingId || hit.a.mixed || hit.b.mixed)
            continue;
        const bridge = shared[hit.tension];
        if (bridge)
            out.push(fill(t(ctx, bridge), { name: nameOf(ctx, hit.person) }));
    }
    return out;
}
/* ------------------------------------------------------- dimension views -- */
/** The dimension view's paragraphs for a finding: the whole of what the content says, with the evidence's own hedge. */
function detailParagraphs(ctx, plan, finding) {
    const written = mechanismFor(ctx, finding);
    return written ? [...tell(ctx, written, written.mechanism.passage).split('\n\n'), ...crossBridgesAt(ctx, plan, finding.id)] : [];
}
const markerOf = (stance) => (stance.strength === 'unknown' ? null : Math.max(-1, Math.min(1, stance.z / 2.5)));
function stanceTrace(stance, person) {
    return {
        person,
        pole: stance.pole,
        strength: stance.strength,
        mixed: stance.mixed,
        pillars: stance.pillars,
        independentRoots: stance.independentRoots,
        facts: stance.facts,
    };
}
function titleOf(ctx, finding) {
    const { req } = ctx;
    if (!finding.axis) {
        const titles = req.content.shared.drives.title;
        return t(ctx, finding.relation === 'shared-drive' ? titles.shared : finding.relation === 'drives-pull-apart' ? titles.pullsApart : titles.different);
    }
    const titles = req.content.domain.axes[finding.axis].title;
    return t(ctx, finding.relation === 'shared' ? titles.shared : finding.relation === 'opposed' ? titles.opposed : titles.oneSided);
}
function dimensionView(ctx, plan, finding, surfaced) {
    const { req } = ctx;
    const axis = finding.axis;
    const roleLabel = t(ctx, req.content.shared.roleLabels[finding.role]);
    const paragraphs = detailParagraphs(ctx, plan, finding);
    const label = axis ? t(ctx, req.content.domain.axes[axis].label) : t(ctx, req.content.shared.drives.label);
    const relation = axis ? req.evidence.axes[axis] : null;
    return {
        id: finding.id,
        axis,
        label,
        title: titleOf(ctx, finding),
        role: finding.role,
        roleLabel,
        relation: finding.relation,
        strength: finding.strength,
        corroboration: finding.corroboration,
        surfaced,
        named: finding.named,
        hedged: finding.hedged,
        summary: (() => { const written = mechanismFor(ctx, finding); return written ? tell(ctx, written, written.mechanism.aside) : (paragraphs[0] ?? ''); })(),
        detail: paragraphs,
        scale: axis ? [t(ctx, req.content.domain.axes[axis].scale[0]), t(ctx, req.content.domain.axes[axis].scale[1])] : null,
        markers: relation ? { first: markerOf(relation.stanceA), second: markerOf(relation.stanceB) } : null,
        trace: relation
            ? { first: stanceTrace(relation.stanceA, ctx.names.first), second: stanceTrace(relation.stanceB, ctx.names.second) }
            : { first: null, second: null },
    };
}
/* ---------------------------------------------------------------- practices -- */
function practiceMatches(practice, finding, req, mechanismKey) {
    const trig = practice.triggers;
    if (trig.dynamic !== finding.id)
        return false;
    /* a card written for one configuration of a dynamic is offered only beside the mechanism that tells that configuration */
    if (trig.mechanisms && !(mechanismKey !== null && trig.mechanisms.some((prefix) => (prefix.endsWith('$') ? mechanismKey === prefix.slice(0, -1) : mechanismKey.startsWith(prefix)))))
        return false;
    if (trig.relations && !trig.relations.includes(finding.relation))
        return false;
    if (trig.poles && !(finding.a && trig.poles.includes(finding.a)) && !(finding.b && trig.poles.includes(finding.b)))
        return false;
    if (trig.kinds && !trig.kinds.includes(req.kind))
        return false;
    if (trig.childPoles && !(finding.b && trig.childPoles.includes(finding.b)))
        return false;
    if (trig.childPoles && req.childAxes && finding.axis && !req.childAxes.has(finding.axis))
        return false;
    if (trig.adultPoles && !(finding.a && trig.adultPoles.includes(finding.a)))
        return false;
    if (trig.holder && isDirectedKind(req.kind) && practice.audience.kind === 'pole') {
        const holderIsFirst = finding.a === practice.audience.pole;
        const holderIsSecond = finding.b === practice.audience.pole;
        if (trig.holder === 'first' ? !holderIsFirst : !holderIsSecond)
            return false;
    }
    if (trig.ages && req.age && !trig.ages.includes(req.age))
        return false;
    if (trig.ages && !req.age)
        return false;
    if (trig.context && !trig.context.some((code) => req.context.includes(code)))
        return false;
    return true;
}
function forLabelOf(ctx, practice, finding) {
    const audience = practice.audience;
    const shared = ctx.req.content.shared;
    if (audience.kind === 'both')
        return t(ctx, shared.forBothLabel);
    if (audience.kind === 'adult')
        return t(ctx, shared.forAdultLabel);
    if (audience.kind === 'role')
        return fill(t(ctx, shared.forNameLabel), { name: audience.role === 'first' ? ctx.names.first : ctx.names.second });
    /* Addressed to the person on a pole: find who leans there. */
    if (finding.a === audience.pole)
        return fill(t(ctx, shared.forNameLabel), { name: ctx.names.first });
    if (finding.b === audience.pole)
        return fill(t(ctx, shared.forNameLabel), { name: ctx.names.second });
    return null;
}
/** The practices the story's findings call for, the central theme's first, so the first one is the closing step and every one follows from what was told. */
/** Six consecutive words, lower-cased and stripped of punctuation: the unit by which a card that merely repeats the story is recognised. */
function sixGrams(text) {
    const words = (text.toLowerCase().match(/[\p{L}]+/gu) ?? []);
    const out = new Set();
    for (let i = 0; i + 6 <= words.length; i += 1)
        out.add(words.slice(i, i + 6).join(' '));
    return out;
}
/** The stems of the longer words of a text (their first five letters): enough to tell that a card is about what a step already asked, without being fooled by inflection. */
function stemsOf(text) {
    const out = new Set();
    for (const word of text.toLowerCase().match(/[\p{L}]{6,}/gu) ?? [])
        out.add(word.slice(0, 5));
    return out;
}
/** How many stems a card shares with the agreement the reading already ends on: past this a card restates the step in other words. */
const STEP_OVERLAP_LIMIT = 3;
function selectPractices(ctx, plan, story, avoidText = [], stepText = '') {
    const told6 = new Set(avoidText.flatMap((text) => [...sixGrams(text)]));
    const stepStems = stemsOf(stepText);
    const { req } = ctx;
    /* The guidance follows the story: only what the story told (the central mechanism first, then the asides it really told), never a thread the reading left out. */
    const keyOf = new Map();
    if (story) {
        keyOf.set(story.central.key.split('/')[0], story.central.key);
        for (const entry of story.asides)
            keyOf.set(entry.finding.id, entry.told.key);
    }
    const told = [plan.central, ...(story ? story.asides.map((entry) => entry.finding) : [])].filter((finding) => Boolean(finding));
    const ordered = [...told];
    const avoid = req.excludePractices ?? new Set();
    /* WHAT IS ALREADY ASKED: the step's intents, then each card's as it is chosen. A card that asks again for something in that set gives the same instruction in other words. */
    const stepIntents = story ? (story.central.mechanism.intents?.length ? story.central.mechanism.intents : stepIntentsOf(story.central.mechanism.step.en)) : [];
    const run = (skipAvoided, strict) => {
        const chosen = [];
        const perDynamic = new Map();
        const taken = new Set();
        const asked = new Set(stepIntents);
        for (const finding of ordered) {
            /* what the user said they are living with comes first: a card written for that context (distance, repair) is not lost to one that merely fits the mechanism */
            const inContext = (practice) => (practice.triggers.context?.some((code) => req.context.includes(code)) ? 0 : 1);
            for (const practice of [...req.content.domain.practices].sort((x, y) => inContext(x) - inContext(y))) {
                if (chosen.length >= MAX_PRACTICES)
                    return chosen;
                if (taken.has(practice.id) || !practiceMatches(practice, finding, req, keyOf.get(finding.id) ?? null))
                    continue;
                /* a card that says again what the story already said adds nothing to a reader who has just read it */
                if (told6.size > 0 && [...sixGrams(t(ctx, practice.body))].some((gram) => told6.has(gram)))
                    continue;
                /* ...nor does one that asks again, in other words, for what the reading's own step asked */
                if (stepStems.size > 0 && [...stemsOf(t(ctx, practice.body))].filter((stem) => stepStems.has(stem)).length >= STEP_OVERLAP_LIMIT)
                    continue;
                /* the card for the central mechanism comes first; of the rest, one at most */
                if (finding !== plan.central && chosen.some((view) => view.dynamic !== plan.central?.id))
                    continue;
                /* what a sibling's reading already gave is avoided, except for the central theme: the step that follows from it must not be lost to variety */
                if (skipAvoided && avoid.has(practice.id) && finding !== plan.central)
                    continue;
                if ((perDynamic.get(finding.id) ?? 0) >= MAX_PRACTICES_PER_DYNAMIC)
                    continue;
                /* ...nor does one that gives the instruction the step, or a card already chosen, has given: one excellent card is better than two versions of the same */
                if (strict !== null && (repeatsGenericStep(practice.intents ?? [], stepIntents) || !addsAnAction(practice.intents ?? [], asked, strict)))
                    continue;
                const label = forLabelOf(ctx, practice, finding);
                if (practice.audience.kind === 'pole' && label === null)
                    continue;
                taken.add(practice.id);
                for (const intent of practice.intents ?? [])
                    asked.add(intent);
                perDynamic.set(finding.id, (perDynamic.get(finding.id) ?? 0) + 1);
                chosen.push({ id: practice.id, title: t(ctx, practice.title), body: t(ctx, practice.body), forLabel: label, sources: practice.sources, dynamic: finding.id });
            }
        }
        return chosen;
    };
    /* strictly first: no card shares ANY intent with the step or another card; only if that leaves no card at all, by main intent. If even that leaves none, the reading has the step and the
       question and no card: a card that asks again for the step is the same instruction twice, and one clear step is better than a step and its echo. */
    const choose = (skipAvoided) => {
        const strict = run(skipAvoided, true);
        if (strict.length > 0)
            return strict;
        return run(skipAvoided, false);
    };
    const preferred = choose(true);
    return preferred.length >= 3 || avoid.size === 0 ? preferred : choose(false);
}
/**
 * The mechanism that tells a finding, if the content has one written for exactly this configuration: this domain, this dimension, who holds which pole, shared or opposed or one-sided.
 * A kind with roles (parent and child, manager and collaborator) prefers a mechanism written for who holds which pole, and otherwise takes the neutral one.
 */
function mechanismFor(ctx, finding) {
    const { req } = ctx;
    const table = req.content.domain.mechanisms;
    if (!table)
        return null;
    /* two children in one home are read with the forms written for them (siblings:), a parent and a child with the forms written for who holds which end */
    const siblings = req.domain === 'parenting' && req.kind === 'siblings-in-household';
    const get = (config) => {
        const entry = table[`${finding.id}/${config}`];
        return entry && entry.passage[ctx.lang].length > 0 ? entry : null;
    };
    const keyOf = (config) => `${finding.id}/${finding.axis && siblings ? `siblings:${config}` : config}`;
    const find = (config) => get(finding.axis && siblings ? `siblings:${config}` : config);
    const told = (config, mechanism, people, plain) => ({ key: keyOf(config), mechanism, people, plain });
    const directed = isDirectedKind(req.kind);
    const names = { both: both(ctx.names.first, ctx.names.second, ctx.lang) };
    const roles = { first: ctx.names.first, second: ctx.names.second };
    if (!finding.axis) {
        /* the drives: what each is led by */
        const drives = req.content.domain.drives;
        const a = finding.a;
        const b = finding.b;
        if (!a)
            return null;
        if (finding.relation === 'shared-drive') {
            const mechanism = find(`shared:${a}`);
            return mechanism ? told(`shared:${a}`, mechanism, roles, names) : null;
        }
        if (!b)
            return null;
        if (finding.relation === 'drives-pull-apart') {
            const forward = Boolean(drives.pullsApart[`${a}|${b}`]);
            const config = forward ? `${a}|${b}` : `${b}|${a}`;
            const mechanism = find(config);
            return mechanism ? told(config, mechanism, forward ? { p0: ctx.names.first, p1: ctx.names.second } : { p0: ctx.names.second, p1: ctx.names.first }, names) : null;
        }
        const mechanism = find('different');
        if (!mechanism || !drives.drawnTo[a] || !drives.drawnTo[b])
            return null;
        return told('different', mechanism, { p0: ctx.names.first, p1: ctx.names.second }, { ...names, voice0: t(ctx, drives.drawnTo[a].one), voice1: t(ctx, drives.drawnTo[b].one) });
    }
    const relation = req.evidence.axes[finding.axis];
    if (finding.relation === 'shared' && finding.a) {
        const mechanism = find(`shared:${finding.a}`);
        return mechanism ? told(`shared:${finding.a}`, mechanism, roles, names) : null;
    }
    if (finding.relation === 'opposed') {
        const who = personsOnAxis(ctx, relation);
        if (!who || !relation.poleA)
            return null;
        const written = directed ? find(`opposed:${relation.poleA}`) : null;
        if (written)
            return told(`opposed:${relation.poleA}`, written, roles, names);
        const neutral = find('opposed');
        return neutral ? told('opposed', neutral, { p0: who.p0, p1: who.p1 }, names) : null;
    }
    if (finding.relation === 'one-sided') {
        const leanIsA = Boolean(relation.poleA);
        const pole = (leanIsA ? relation.poleA : relation.poleB);
        if (!pole)
            return null;
        const written = directed ? find(`oneSided:${pole}:${leanIsA ? 'first' : 'second'}`) : null;
        if (written)
            return told(`oneSided:${pole}:${leanIsA ? 'first' : 'second'}`, written, roles, names);
        const neutral = find(`oneSided:${pole}`);
        return neutral ? told(`oneSided:${pole}`, neutral, { lean: leanIsA ? ctx.names.first : ctx.names.second, mid: leanIsA ? ctx.names.second : ctx.names.first }, names) : null;
    }
    return null;
}
/** A mechanism's text with its people placed: in a kind with roles the first mention of a person carries the role, so a reading with the roles swapped does not read the same. */
function tell(ctx, told, text, field, scenes) {
    const written = field ? alternateText(ctx, told, field, t(ctx, text)) : t(ctx, text);
    const template = scenes ? softScenes(ctx, told, written, scenes) : written;
    return template.replace(/\{([a-zA-Z0-9]+)\}/g, (_match, key) => {
        if (key in told.plain)
            return told.plain[key];
        const name = told.people[key];
        if (name === undefined)
            throw new Error(`Connections mechanism uses {${key}} but no value was given for it`);
        /* the role stands beside a name once in a reading (the first mention anywhere in it), not again in every block */
        const marker = `role|${name}`;
        if (ctx.used.has(marker))
            return name;
        ctx.used.add(marker);
        return withRole(ctx, name);
    });
}
/** The bridges that join two things said of the same person, for a finding, when both of the things are told. */
function bridgesAmong(ctx, plan, findingId, told) {
    const shared = ctx.req.content.shared.narrative.tensions;
    const out = [];
    for (const entry of plan.resolutions) {
        if (entry.resolution === 'dropped' || !told.has(entry.hit.a.findingId) || !told.has(entry.hit.b.findingId))
            continue;
        const bridge = shared[entry.hit.tension];
        if (bridge)
            out.push(fill(t(ctx, bridge), { name: nameOf(ctx, entry.hit.person) }));
    }
    return out;
}
/* ------------------------------------------- romantic English: the evidence decides ---
 * Only an English romantic reading reaches any of this. Slovak, and every other domain, read exactly as before. */
const romanticEn = (ctx) => ctx.lang === 'en' && ctx.req.domain === 'romantic';
/** How sharply the evidence draws a finding: thin (a lean, or a person pulled both ways), strong, or in between. */
function tierOf(ctx, finding) {
    if (isLeanFinding(finding, ctx.req.evidence) || finding.hedged)
        return 'tentative';
    return finding.strength === 'strong' ? 'strong' : 'moderate';
}
/** Whether the evidence behind a finding is strong and more than one tradition stands behind it. */
const standsStrong = (ctx, finding) => tierOf(ctx, finding) === 'strong' && finding.corroboration !== 'single-source';
const sceneModeOf = (ctx, finding) => (romanticEn(ctx) ? (standsStrong(ctx, finding) ? 'pattern' : 'illustration') : undefined);
/** The mechanism's text with its invented moments handled by the mode (content/romanticEn.ts). An unmarked invention is replaced in either mode; a "Say ..." only when the pattern stands on its own evidence. */
function softScenes(_ctx, told, text, mode) {
    const pairs = SOFT_SCENES[told.key];
    if (!pairs)
        return text;
    let out = text;
    for (const [from, to] of pairs) {
        if (mode === 'illustration' && /\bSay\b/.test(from))
            continue;
        out = out.split(from).join(to);
    }
    return out;
}
/** Why a thread that the story tells rests on thin evidence: a person pulled both ways, one tradition, or a slight stance. */
function thinReason(finding) {
    if (finding.hedged)
        return 'mixed';
    return finding.corroboration === 'single-source' ? 'single-source' : 'slight';
}
/** The names of the people whose own stance on an axis is the loose one: pulled both ways (`mixed`) or leaning only slightly. */
function looseOnes(ctx, finding, why) {
    if (!finding.axis)
        return [];
    const relation = ctx.req.evidence.axes[finding.axis];
    const loose = (stance, held) => (why === 'mixed' ? stance.mixed : held && stance.strength === 'slight');
    return [loose(relation.stanceA, Boolean(relation.poleA)) ? ctx.names.first : null, loose(relation.stanceB, Boolean(relation.poleB)) ? ctx.names.second : null].filter((name) => name !== null);
}
/** The hedge for an aside on thin evidence, naming the person whose lean is loose where there is one. */
function asideHedge(ctx, finding, why) {
    const hedge = ASIDE_HEDGE[why];
    if (why === 'single-source')
        return hedge.nobody;
    const names = looseOnes(ctx, finding, why);
    if (names.length === 0)
        return hedge.nobody;
    return fill(names.length === 1 ? hedge.one : hedge.many, { name: names.length === 1 ? names[0] : both(names[0], names[1], ctx.lang) });
}
/** The traditions that back a finding in each chart that carries it, as the stances' own pillars: both charts for a likeness or a difference, the chart that leans for a one-sided finding. */
function pillarSidesOf(ctx, finding) {
    const evidence = ctx.req.evidence;
    if (finding.axis) {
        const relation = evidence.axes[finding.axis];
        if (relation.poleA && relation.poleB)
            return [relation.stanceA.pillars, relation.stanceB.pillars];
        return [relation.poleA ? relation.stanceA.pillars : relation.stanceB.pillars];
    }
    const drive = evidence.drives.find((candidate) => candidate.a === finding.a && candidate.b === finding.b);
    return drive ? [drive.pillarsA, drive.pillarsB] : [];
}
const namesOf = (pillars) => {
    const named = PILLAR_ORDER.filter((pillar) => pillars.has(pillar)).map((pillar) => PILLAR_NAMES[pillar]);
    return named.length <= 2 ? named.join(' and ') : `${named.slice(0, -1).join(', ')} and ${named[named.length - 1]}`;
};
/**
 * WHAT THE CORROBORATION COMES TO, said plainly, naming only the traditions that speak to THIS finding. A finding is "firm" when each chart's own evidence includes both a sky-based and
 * a calendar-based tradition, "supported" when several traditions speak but from one family. The traditions that back it in BOTH charts are named when there are two or more; where the
 * charts reach it through different ones, the sentence says so rather than implying the same ones. Nothing is said where fewer than two traditions speak.
 */
function firmnessSentence(ctx, finding) {
    const sides = pillarSidesOf(ctx, finding);
    if (sides.length === 0)
        return null;
    const union = new Set(sides.flat());
    if (union.size < 2)
        return null;
    const common = new Set([...union].filter((pillar) => sides.every((side) => side.includes(pillar))));
    const familiesOf = (pillars) => new Set([...pillars].map((pillar) => FAMILY_OF[pillar]));
    if (finding.corroboration === 'firm') {
        return common.size >= 2 && familiesOf(common).size === 2
            ? fill(LEAD_FIRMNESS.twoKinds, { pillars: namesOf(common) })
            : fill(LEAD_FIRMNESS.twoKindsApart, { pillars: namesOf(union) });
    }
    const kind = (pillars) => FAMILY_INPUT[[...familiesOf(pillars)][0]];
    return common.size >= 2 && familiesOf(common).size === 1
        ? fill(LEAD_FIRMNESS.oneKind, { pillars: namesOf(common), kind: kind(common) })
        : familiesOf(union).size === 1 ? fill(LEAD_FIRMNESS.oneKindApart, { pillars: namesOf(union), kind: kind(union) }) : fill(LEAD_FIRMNESS.oneKindMixed, { pillars: namesOf(union) });
}
/**
 * THE LEAD OF A COUPLE'S READING, BUILT FROM THE PLAN.
 *
 * It said the same twelve words in every couple's reading ("... meet here as partners, two people sharing a life."). It now says what the plan decided: what the central finding IS (the
 * mechanism's own relation, a likeness, a difference or a one-sided lean, in a clause that says who does what), what kind of story it is (the arc), how sharply the evidence draws it
 * (the tier) and how firmly it stands (the traditions that speak to this finding and what they come to), and, when the story tells a second thread, what that thread is to the first
 * (a cost to watch, common ground that cuts both ways, a difference that may help). Nothing here is a choice among wordings by hash. A lead that cannot name its finding (a mechanism
 * the table does not know) gives way to the kind's frame, so it never states something the story does not.
 */
function leadParagraph(ctx, plan, story) {
    const central = plan.central;
    if (!central || !plan.arc)
        return null;
    const clause = LEAD_CLAUSE[story.central.key];
    if (clause === undefined)
        return null;
    const tier = tierOf(ctx, central);
    const pair = both(ctx.names.first, ctx.names.second, ctx.lang);
    const frame = sentence(fill(LEAD_FRAME[leadFrameKindOf(relationClassOf(story.central.key), plan.arc)][tier], { both: pair, clause }));
    const firmness = tier === 'tentative' ? null : firmnessSentence(ctx, central);
    const aside = story.asides[0];
    const second = aside && LEAD_CLAUSE[aside.told.key] !== undefined ? (() => {
        const kind = plan.supports.find((support) => support.finding.id === aside.finding.id)?.kind ?? 'other';
        const relation = relationClassOf(aside.told.key);
        const how = aside.thin ? 'thin' : standsStrong(ctx, aside.finding) ? 'strong' : 'moderate';
        return fill(LEAD_SECOND[secondNatureOf(kind, relation)][how], { clause: LEAD_CLAUSE[aside.told.key], noun: SECOND_NOUN[relation] });
    })() : null;
    return paragraph(frame, firmness, second);
}
function mechanismStory(ctx, plan) {
    if (!plan.central)
        return null;
    const central = mechanismFor(ctx, plan.central);
    if (!central)
        return null;
    const KIND_RANK = { watch: 0, other: 1, carry: 2 };
    const ordered = [...plan.supports].sort((x, y) => KIND_RANK[x.kind] - KIND_RANK[y.kind]);
    const asides = [];
    for (const support of ordered) {
        if (isLeanFinding(support.finding, ctx.req.evidence) || support.finding.hedged)
            continue;
        /* two different drives say nothing a pair could not say of any pair: it may be the centre when nothing firmer exists, but is not offered as an aside */
        if (support.finding.id === 'different-pulls')
            continue;
        const told = mechanismFor(ctx, support.finding);
        if (told)
            asides.push({ finding: support.finding, told });
        /* one more thread at most: a second one lengthens the reading more than it deepens it */
        if (asides.length >= MAX_ASIDES)
            break;
    }
    /* ROMANTIC ENGLISH: a thread that carries weight in a couple (how feeling is shown, how the pair is lopsided, how much of the relationship is shared) but rests on thin evidence is not
       lost when nothing firmer is there to be told: it speaks as an aside that says how thin it is. */
    if (asides.length === 0 && romanticEn(ctx)) {
        for (const support of ordered) {
            const finding = support.finding;
            if (!(isLeanFinding(finding, ctx.req.evidence) || finding.hedged) || finding.id === 'different-pulls')
                continue;
            if (!(finding.weight >= 3 || finding.relation === 'one-sided' || finding.id === 'social-energy'))
                continue;
            const told = mechanismFor(ctx, finding);
            if (!told)
                continue;
            asides.push({ finding, told, thin: thinReason(finding) });
            break;
        }
    }
    return { central, asides };
}
function storyParagraphs(ctx, plan, story) {
    /* One adult meets each of several children in the same way: the adult's side of it is told in the first child's reading, and the next reading says so and keeps the short form, which names this pair. */
    const told = ctx.req.centralToldBefore;
    const seenKey = `${ctx.req.first.id}|${story.central.key}`;
    const earlier = told && ctx.lang === 'en' ? told.get(seenKey) : undefined;
    if (told && ctx.lang === 'en' && earlier === undefined)
        told.set(seenKey, ctx.names.second);
    /* (the first paragraph is the one that says it again; the second, with the same number of paragraphs in both languages, stays) */
    const repeated = earlier !== undefined && story.central.mechanism.aside.en.length > 0
        ? paragraph(`${ctx.names.first} meets ${ctx.names.second} in much the way ${ctx.names.first} meets ${earlier}.`, tell(ctx, story.central, story.central.mechanism.aside, 'aside'))
        : null;
    const paragraphs = tell(ctx, story.central, story.central.mechanism.passage, 'passage', plan.central ? sceneModeOf(ctx, plan.central) : undefined).split('\n\n');
    if (repeated !== null)
        paragraphs[0] = repeated;
    if (plan.central) {
        const narrative = ctx.req.content.shared.narrative;
        /* the person who pulls both ways is named, as the subject of the note's clause, so it says whose lean is loose */
        const relation = plan.central.axis ? ctx.req.evidence.axes[plan.central.axis] : null;
        const mixed = relation ? [relation.stanceA.mixed ? ctx.names.first : null, relation.stanceB.mixed ? ctx.names.second : null].filter((name) => name !== null) : [];
        const who = mixed.length === 2 ? both(mixed[0], mixed[1], ctx.lang) : (mixed[0] ?? both(ctx.names.first, ctx.names.second, ctx.lang));
        /* one plain sentence, in other words for a thin stance and for a person pulled both ways */
        const note = isLeanFinding(plan.central, ctx.req.evidence)
            ? t(ctx, chooseVariant(ctx, narrative.lean, `${plan.central.id}|lean`))
            : plan.central.hedged ? fill(t(ctx, chooseVariant(ctx, mixed.length === 1 ? narrative.hedged.one : narrative.hedged.many, `${plan.central.id}|lean`)), { name: who })
                /* ROMANTIC ENGLISH: the lead says the traditions behind a supported centre read one kind of evidence, so the passage does not state more than the lead does */
                : romanticEn(ctx) && plan.central.corroboration === 'supported' ? SUPPORTED_NOTE : null;
        /* ...set at the end of the passage's FIRST paragraph, where the claim about who leans which way has been made and both people have been introduced: the qualification sits beside the
           claim it qualifies, not after the scene and the advice that follow */
        if (note)
            paragraphs[0] = paragraph(paragraphs[0], note);
    }
    return paragraphs;
}
function asideParagraphs(ctx, plan, story) {
    if (!plan.central)
        return [];
    const toldIds = new Set([plan.central.id, ...story.asides.map((entry) => entry.finding.id)]);
    return story.asides.map((entry) => paragraph(tell(ctx, entry.told, entry.told.mechanism.aside, 'aside', sceneModeOf(ctx, entry.finding)), entry.thin ? asideHedge(ctx, entry.finding, entry.thin) : null, ...bridgesAmong(ctx, plan, entry.finding.id, toldIds)));
}
/** The end of the V3 reading: the agreement that follows from the story and one question, with the permission to wait where it fits. */
function mechanismEnding(ctx, plan, story) {
    const { req } = ctx;
    const vars = { phrase: phraseOf(ctx, plan.central), both: both(ctx.names.first, ctx.names.second, ctx.lang), first: ctx.names.first, second: ctx.names.second };
    /* (a pause is offered where the user's own words ask for room; a story is not softened by a stock permission to do nothing) */
    /* ...and only to a story that is about room: after any other step it is a non sequitur */
    const asksForRoom = plan.central.id === 'closeness-and-room' && (req.context.includes('need-more-space') || (req.domain === 'family' && req.context.includes('conflict-goes-unrepaired')));
    const wait = asksForRoom ? fill(t(ctx, pick(req.content.domain.restraint, req.seed, `${plan.central.id}|restraint`)), vars) : null;
    return [paragraph(tell(ctx, story.central, story.central.mechanism.step, 'step'), wait), tell(ctx, story.central, story.central.mechanism.question, 'question')];
}
/* -------------------------------------------------------------- the story -- */
function phraseOf(ctx, finding) {
    const { req } = ctx;
    if (finding.axis)
        return t(ctx, req.content.domain.axes[finding.axis].phrase);
    const phrases = req.content.domain.drivePhrases;
    return t(ctx, finding.relation === 'shared-drive' ? phrases.shared : finding.relation === 'drives-pull-apart' ? phrases.pullsApart : phrases.different);
}
/* ---------------------------------------------------- the user's own words -- */
/** Whether this code names a wish or a need rather than something that is going wrong. */
const WISH_CODES = new Set(['need-more-closeness', 'need-more-space', 'wants-to-collaborate']);
/** Codes about the household as a whole: told in the household reading. */
const HOUSEHOLD_ONLY = new Set(['sibling-friction', 'unfair-comparison', 'parents-disagree-on-approach']);
/** Codes about brothers and sisters: a reading of two people who are not siblings does not answer them. */
const SIBLING_ONLY = new Set(['sibling-friction', 'unfair-comparison']);
function observedParagraphs(ctx, toldIds, centralId) {
    const { req } = ctx;
    const bank = req.content.shared.narrative.observed;
    const items = [];
    for (const code of req.context) {
        const entry = req.content.shared.observed[code];
        if (!entry)
            continue;
        /* What belongs to brothers and sisters or to the two parents is said in the household reading, not in a reading of a parent and a child. */
        if (HOUSEHOLD_ONLY.has(code) && (req.kind === 'parent-child' || req.kind === 'caregiver-child' || req.kind === 'co-parents'))
            continue;
        /* ...and what two parents disagree on is not a finding about two children */
        if (code === 'parents-disagree-on-approach' && req.kind === 'siblings-in-household')
            continue;
        if (SIBLING_ONLY.has(code) && !(req.kind === 'siblings' || req.kind === 'siblings-in-household' || req.kind === 'extended-family'))
            continue;
        /* The profiles touch what a user notices through the dimensions the code points to: the same three the plan weighs, in the same order. */
        const found = (CONTEXT_FOCUS[code] ?? []).map((id) => req.interpretation.findings.find((finding) => finding.id === id)).filter((finding) => Boolean(finding));
        const isGround = (finding) => finding.role === 'resonance' && finding.relation === 'shared';
        /* Where the reading tells a thread that is a difference or a snag, that is what the user's words meet; the central one first. */
        const told = found.filter((finding) => toldIds.has(finding.id) && (!isGround(finding) || finding.id === centralId)).sort((x, y) => Number(y.id === centralId) - Number(x.id === centralId))[0];
        const faint = found.find((finding) => !toldIds.has(finding.id) && !isGround(finding) && !isLeanFinding(finding, req.evidence)) ?? found.find((finding) => !toldIds.has(finding.id) && !isGround(finding));
        const wish = WISH_CODES.has(code);
        /* The profiles may touch what the user sees; they never confirm it and never overrule it. */
        let framing;
        /* (what makes two answers "the same" is the sentence chosen, not the pattern named in it: the Slovak sentence has no pattern in it, and both languages merge alike) */
        let chosen;
        if (wish) {
            chosen = told ? pick(bank.wishTold, req.seed, `${code}|wishTold`) : pick(bank.wish, req.seed, `${code}|wish`);
            chosen = observedText(ctx, chosen, `${code}|wish`);
            framing = told ? fill(t(ctx, chosen), { phrase: phraseOf(ctx, told) }) : t(ctx, chosen);
        }
        else if (told) {
            chosen = observedText(ctx, pick(bank.speaks, req.seed, `${told.id}|speaks`), `${told.id}|speaks`);
            framing = fill(t(ctx, chosen), { phrase: phraseOf(ctx, told) });
        }
        else if (faint) {
            chosen = pick(bank.elsewhere, req.seed, `${faint.id}|elsewhere`);
            framing = fill(t(ctx, chosen), { phrase: phraseOf(ctx, faint) });
        }
        else {
            chosen = pick(bank.silent, req.seed, 'silent');
            framing = t(ctx, chosen);
        }
        items.push({ echo: t(ctx, entry.echo), framing, sameAs: fill(chosen.sk, { phrase: '' }) });
    }
    /* two things the user noticed that the reading answers in the same words are answered once: what was said, together, then the one answer */
    const merged = [];
    for (const item of items) {
        const last = merged[merged.length - 1];
        if (last && last.sameAs === item.sameAs)
            last.echoes.push(item.echo);
        else
            merged.push({ echoes: [item.echo], framing: item.framing, sameAs: item.sameAs });
    }
    return merged.map((item) => paragraph(...item.echoes, item.framing));
}
function timeNote(ctx) {
    const { req } = ctx;
    const times = req.evidence.coverage.birthTime;
    const notes = req.content.shared.timeNotes;
    const unknown = [times.a, times.b].filter((precision) => precision === 'unknown').length;
    if (unknown === 2)
        return t(ctx, notes.unknownBoth);
    /* (the English names the owner of the chart as the subject of its clause; the Slovak note has no name in it) */
    if (unknown === 1)
        return fill(t(ctx, notes.unknown), { name: times.a === 'unknown' ? ctx.names.first : ctx.names.second });
    if ([times.a, times.b].includes('approximate'))
        return t(ctx, notes.approximate);
    return null;
}
/* ------------------------------------------------------------- the ending -- */
/* -------------------------------------------------------------------- public -- */
export function composePairReading(req) {
    const ctx = { req, lang: req.lang, names: { first: req.first.label, second: req.second.label }, used: new Set(), usedVariants: new Set() };
    const { interpretation, content } = req;
    const kindContent = content.domain.kinds[req.kind];
    const surfacedIds = new Set(interpretation.findings.map((finding) => `${finding.id}`));
    const quiet = interpretation.findings.length === 0;
    const plan = planNarrative(interpretation, req.evidence, req.context, { romanticEvidence: romanticEn(ctx) });
    const story = quiet ? null : mechanismStory(ctx, plan);
    const sections = [];
    /* ---- overview ---- */
    const names = { both: both(ctx.names.first, ctx.names.second, ctx.lang) };
    const frame = kindContent ? sentence(fill(t(ctx, kindContent.frame), names)) : null;
    /* The lens says what a kind of relationship asks of a reading. Where the people hold different roles, or one of them is a child, it carries a safeguard (who answers for making it safe to disagree, that a child's style is a tendency and not a verdict) and is always said; elsewhere the story that follows is the lens, and a paragraph that is the same in every reading of the kind is left out. */
    const lens = kindContent && (kindContent.roles || req.domain === 'parenting') ? fill(t(ctx, kindContent.lens), names) : null;
    const lead = !quiet && story && romanticEn(ctx) ? leadParagraph(ctx, plan, story) : null;
    const overview = quiet
        ? [paragraph(frame, fill(t(ctx, content.shared.quiet.lede), names)), fill(t(ctx, content.shared.quiet.body), names)]
        : [lead ?? paragraph(frame, lens)];
    sections.push({ id: 'overview', title: t(ctx, content.domain.sections.overview), paragraphs: overview });
    const told = story && plan.central ? { paragraphs: storyParagraphs(ctx, plan, story), asides: asideParagraphs(ctx, plan, story), ending: mechanismEnding(ctx, plan, story) } : null;
    const practices = selectPractices(ctx, plan, story, told ? [...told.paragraphs, ...told.asides, ...told.ending] : [], told ? told.ending.join(' ') : '');
    if (!quiet && plan.central && story && told) {
        /* ---- the story: one mechanism told whole, and up to two more where they add something ---- */
        sections.push({ id: 'story', title: t(ctx, content.domain.sections.story), paragraphs: told.paragraphs });
        if (told.asides.length)
            sections.push({ id: 'alongside', title: t(ctx, content.domain.sections.alongside), paragraphs: told.asides });
    }
    /* ---- the user's own observation, received as theirs ---- */
    const toldIds = new Set(story && plan.central ? [plan.central.id, ...story.asides.map((entry) => entry.finding.id)] : []);
    const observed = observedParagraphs(ctx, toldIds, plan.central?.id ?? null);
    if (observed.length)
        sections.push({ id: 'yourWords', title: t(ctx, content.domain.sections.yourWords), paragraphs: observed });
    /* ---- the ending: a step that follows from the story, and one question ---- */
    if (!quiet && told)
        sections.push({ id: 'next', title: t(ctx, content.domain.sections.next), paragraphs: told.ending });
    /* ---- limits ---- */
    const limits = paragraph(timeNote(ctx), req.rolesLookReversed ? t(ctx, content.shared.roleCheck) : null, fill(t(ctx, content.domain.closing), names));
    sections.push({ id: 'limits', title: t(ctx, content.domain.sections.limits), paragraphs: [limits] });
    /* ---- dimensions (every axis the evidence could read, surfaced or not): the whole of what is known, for the reader who wants it ---- */
    const dimensions = [...interpretation.findings, ...interpretation.background]
        .filter((finding) => finding.relation !== 'quiet' && finding.relation !== 'unreadable')
        .map((finding) => dimensionView(ctx, plan, finding, surfacedIds.has(`${finding.id}`)));
    const headline = story ? alternateText(ctx, story.central, 'title', t(ctx, story.central.mechanism.title)) : plan.central ? titleOf(ctx, plan.central) : t(ctx, content.shared.quiet.headline);
    const signatures = signatureViews(req, ctx.names, plan.arc);
    const age = (text) => forAge(text, req.age, req.lang);
    return {
        headline: age(headline), lede: age(overview.join(' ')), quiet, signatures,
        sections: sections.map((section) => ({ ...section, paragraphs: section.paragraphs.map(age) })),
        dimensions: dimensions.map((dimension) => ({ ...dimension, summary: age(dimension.summary), detail: dimension.detail.map(age) })),
        practices: practices.map((practice) => ({ ...practice, title: age(practice.title), body: age(practice.body) })),
        narrative: {
            mechanisms: { central: story ? story.central.key : null, asides: story ? story.asides.map((entry) => entry.told.key) : [] },
            arc: plan.arc,
            central: plan.central?.id ?? null,
            supports: plan.supports.map((support) => ({ id: support.finding.id, kind: support.kind })),
            leftOut: plan.leftOut.map((entry) => ({ id: entry.id, reason: entry.reason })),
            resolutions: plan.resolutions.map((entry) => ({ tension: entry.hit.tension, person: entry.hit.person, resolution: entry.resolution, at: entry.at })),
        },
    };
}
