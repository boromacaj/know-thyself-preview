/**
 * TWO-CHART CONTACTS IN THE ROMANTIC STORY (English, romantic only; reading-intelligence rebuild).
 *
 * THE GAP THIS CLOSES. The romantic story was built only from each person's OWN stances, compared side by side (both settle a feeling inwardly; one
 * plans, the other improvises). The only evidence that is genuinely about the two charts together - a contact between one person's Moon and the other's
 * Sun, a clash between the two day branches, a channel that only the two charts complete, a number both carry - was listed in a separate panel and never
 * reached the story: 0 of 372 defining contacts in the 190-pair corpus. And under a story of common ground the friction contacts were hidden.
 *
 * WHAT THIS DOES. For each finding the story tells, it looks for the strongest contact whose TOPIC (assigned by pairSignatures.ts in each tradition's own
 * terms) bears on that area of the relationship, and says in one sentence who holds what and what the tradition reads it as, and how it relates to the
 * finding it is set beside:
 *
 *   echoes       the contact points the way the finding does (a shared tendency and an easy contact; a snag and a frictional contact)
 *   complicates  a likeness or a useful difference set beside a frictional contact: the likeness need not mean ease
 *   eases        a snag set beside an easy contact: something to work from when the snag shows
 *   adds         a contact that neither echoes nor complicates: it widens the picture
 *
 * Nothing here is calculated: the contacts are pairSignatures.ts's, the topics are its, and the relation is a closed table of (finding role x contact
 * flavour). A contact is never treated as a verdict; it is one tradition's reading of the two charts side by side, said as such.
 */
/** Which areas of a relationship a contact's topic bears on, the most direct first. */
export const TOPIC_BEARS_ON = {
    emotion: ['emotional-expression', 'processing-pace'],
    communication: ['reasoning-style', 'processing-pace', 'practical-and-conceptual'],
    attraction: ['closeness-and-room', 'social-energy'],
    conflict: ['emotional-expression', 'processing-pace', 'closeness-and-room'],
    drive: ['taking-the-lead', 'risk-and-caution'],
    structure: ['structure-and-flexibility', 'change-and-steadiness'],
    roles: ['taking-the-lead'],
    values: ['shared-pull', 'different-pulls', 'pulls-apart'],
    growth: ['shared-pull', 'different-pulls', 'pulls-apart', 'change-and-steadiness'],
    ease: ['structure-and-flexibility', 'change-and-steadiness', 'closeness-and-room'],
};
const EASY = new Set(['joining', 'nourishing', 'mirroring', 'same-number', 'shared-root']);
const ROUGH = new Set(['friction', 'stimulating']);
const DIFFERENCE = new Set(['complementing', 'steering']);
export function contactRelation(finding, flavour) {
    switch (finding.role) {
        case 'resonance': return EASY.has(flavour) ? 'echoes' : ROUGH.has(flavour) ? 'complicates' : 'adds';
        case 'complement': return DIFFERENCE.has(flavour) || flavour === 'nourishing' ? 'echoes' : ROUGH.has(flavour) ? 'complicates' : 'adds';
        case 'friction': return ROUGH.has(flavour) ? 'echoes' : EASY.has(flavour) ? 'eases' : 'adds';
        default: return 'adds';
    }
}
/** A contact is told only where it is among its tradition's strongest: a defining contact, or a notable one where the tradition has nothing stronger. */
const tellable = (signature) => (signature.weight === 'defining'
    || (signature.weight === 'notable' && (signature.kind === 'channel' || (signature.system === 'numerology' && signature.flavour !== 'different-number'))));
const RELATION_RANK = { complicates: 0, eases: 1, echoes: 2, adds: 3 };
/** The contacts that may be set beside a finding, best first: the most direct topic first, a contact that qualifies the story before one that only agrees with it. */
export function contactsFor(finding, signatures, used) {
    const out = [];
    for (const signature of signatures) {
        /* a type pairing says nothing a pair could not say of any pair of those types */
        if (used.has(signature.id) || !tellable(signature) || signature.kind === 'type-pair')
            continue;
        /* a Day Master relation is about who supports or steers whom: told beside leading and closeness only */
        const directness = signature.kind === 'day-master'
            ? (finding.id === 'taking-the-lead' || finding.id === 'closeness-and-room' ? 1 : -1)
            : (TOPIC_BEARS_ON[signature.topic] ?? []).indexOf(finding.id);
        if (directness < 0)
            continue;
        const relation = contactRelation(finding, signature.flavour);
        /* (V4, after a blind review: contacts were "inserted rather than argued") a contact is told only where it materially bears on the finding:
           one that qualifies it (complicates / eases, each said with its consequence), or one that echoes it on the finding's most direct area.
           A contact that only "adds" in the same area is left to the contact list. */
        if (relation === 'adds' || (relation === 'echoes' && directness !== 0))
            continue;
        out.push({ signature, relation, score: (signature.weight === 'defining' ? 0 : 10) + directness + RELATION_RANK[relation] * 0.5 });
    }
    return out.sort((x, y) => x.score - y.score || (x.signature.id < y.signature.id ? -1 : 1));
}
/* ---------------------------------------------------------------- wording */
/* (the reading voice names a person only as a subject, never in the possessive: `Livia has the Moon and Mara the Sun ...`) */
const ASPECT_CLAUSE = {
    conjunction: 'in the same part of the zodiac',
    opposition: 'on opposite sides of the zodiac',
    square: 'at a square to each other',
    trine: 'in an easy trine',
    sextile: 'in a sextile',
};
/** The nine Human Design areas in plain, neutral words for a reading about two people (the Human Design reading's own names are second person: "how you think"). */
const AREA = {
    head: 'mental pressure', ajna: 'thinking', throat: 'expression', g: 'identity', ego: 'willpower',
    solarPlexus: 'emotions', sacral: 'work energy', spleen: 'instinct', root: 'drive',
};
/** The Sun and the Moon take the article; the planets do not. */
const body = (name) => (name === 'Sun' || name === 'Moon' ? `the ${name}` : name);
/** The same body in both charts, said once: "their Venuses" (a blind reviewer found "their Venuss"). */
const PLURAL = { Venus: 'Venuses', Mars: 'Mars placements', Mercury: 'Mercuries' };
const toneOf = (flavour) => (EASY.has(flavour) ? 'easy' : ROUGH.has(flavour) ? 'rough' : 'difference');
/** What astrology reads a contact on a topic as, by its tone. A noun phrase. */
const ASTRO_GLOSS = {
    emotion: { easy: 'feelings that find each other without much explaining', rough: 'moods on different clocks, where what soothes one can unsettle the other', difference: 'each feeling what the other holds back' },
    communication: { easy: 'meaning caught quickly, half a sentence often being enough', rough: 'talk that sparks and snags, with ideas tested hard', difference: 'two ways of making sense that can fill each other in' },
    attraction: { easy: 'a pull between them that comes easily', rough: 'a charged, restless pull', difference: 'attraction across a difference' },
    drive: { easy: 'effort that runs the same way', rough: 'two wills that push on each other', difference: 'one person’s drive meeting its counterpart in the other' },
    structure: { easy: 'commitment that steadies', rough: 'duty that can start to feel like restriction', difference: 'one supplying the structure the other lacks' },
    values: { easy: 'tastes and values that sit easily together', rough: 'values that rub', difference: 'values seen from opposite ends' },
    growth: { easy: 'encouragement in each other’s plans', rough: 'expansion that can overreach', difference: 'each widening the other’s horizon' },
    conflict: { easy: 'temper and hurt that can meet without lasting damage', rough: 'quick sparks when either is pushed', difference: 'temper on one side meeting feeling on the other' },
    ease: { easy: 'ease in daily life', rough: 'friction in daily life', difference: 'difference in daily life' },
    roles: { easy: 'roles that fit', rough: 'roles that rub', difference: 'roles that differ' },
};
const BAZI_BRANCH_GLOSS = {
    'branch-clash': 'movement and friction: things get shaken loose and little stays still for long',
    'branch-harmony': 'a quiet affinity, a bond that can hold without much effort',
    'branch-three-harmony-half': 'cooperation that builds over time',
    'branch-same': 'a similar background rhythm, easy to recognise and sometimes too familiar to question',
    'stem-combination': 'a pull of mutual interest that can draw each into the other’s course',
    'stem-clash': 'views that meet head-on',
};
const BAZI_BRANCH_CLAUSE = {
    'branch-clash': 'their day branches clash',
    'branch-harmony': 'their day branches form a Six Harmony',
    'branch-three-harmony-half': 'their day branches hold two parts of a Three Harmony',
    'branch-same': 'they share the same day branch',
    'stem-combination': 'their day stems combine',
    'stem-clash': 'their day stems clash',
};
const NUMBER_GLOSS = {
    'life-path': 'a similar direction over a lifetime',
    'soul-urge': 'a similar private motivation, what quietly satisfies each',
    expression: 'a similar way of putting things into the world',
    personality: 'a similar first impression',
    birthday: 'a similar everyday knack',
};
const POSITION_NAME = { 'life-path': 'Life Path', 'soul-urge': 'Soul Urge', expression: 'Expression', personality: 'Personality', birthday: 'birthday' };
/** The contact itself, naming who holds what, and the tradition's reading of it. Null where nothing is written for its kind. */
export function contactClause(signature, names) {
    const forward = signature.direction !== 'b-to-a';
    const [from, to] = forward ? [names.first, names.second] : [names.second, names.first];
    switch (signature.kind) {
        case 'inter-aspect': {
            const clause = ASPECT_CLAUSE[String(signature.form.aspect)];
            if (!clause)
                return null;
            return { contact: signature.a === signature.b ? `their ${PLURAL[signature.a] ?? `${signature.a}s`} are ${clause}` : `${names.first} has ${body(signature.a)} and ${names.second} ${body(signature.b)} ${clause}`, tradition: 'astrology', gloss: ASTRO_GLOSS[signature.topic][toneOf(signature.flavour)] };
        }
        case 'day-master': {
            const aEl = String(signature.form.aElement);
            const bEl = String(signature.form.bElement);
            const [fromEl, toEl] = forward ? [aEl, bEl] : [bEl, aEl];
            if (signature.flavour === 'mirroring')
                return { contact: `both are ${aEl} at heart`, tradition: 'BaZi', gloss: 'two of a kind: quick recognition, and at times the rivalry of equals who want the same room' };
            if (signature.flavour === 'nourishing')
                return { contact: `${from} is ${fromEl} at heart and ${to} ${toEl}`, tradition: 'BaZi', gloss: `${fromEl} feeding ${toEl}: support that flows from ${from} to ${to} and does best when some of it flows back` };
            return { contact: `${from} is ${fromEl} at heart and ${to} ${toEl}`, tradition: 'BaZi', gloss: `${fromEl} restraining ${toEl}: structure and challenge from ${from}, steadying when welcome and pressing when not` };
        }
        case 'channel':
            if (signature.form.class !== 'electromagnetic' && signature.form.class !== 'companionship')
                return null;
            {
                /* (V4) the link is named by the two areas it joins, in plain neutral words (AREA), so two different links never read as the same contact */
                const joins = `${AREA[String(signature.form.centreA)] ?? 'one area'} and ${AREA[String(signature.form.centreB)] ?? 'another'}`;
                return signature.form.class === 'electromagnetic'
                    ? { contact: `between them the two charts complete a link between ${joins} that neither has alone`, tradition: 'Human Design', gloss: 'a spark of attraction and friction that comes from two halves fitting together' }
                    : { contact: `both charts carry the same complete link between ${joins}`, tradition: 'Human Design', gloss: 'familiar ground, where little needs explaining' };
            }
        default:
            if (signature.system === 'bazi' && BAZI_BRANCH_CLAUSE[signature.kind] && String(signature.form.aPillar) === 'day' && String(signature.form.bPillar) === 'day') {
                return { contact: BAZI_BRANCH_CLAUSE[signature.kind], tradition: 'BaZi', gloss: `${BAZI_BRANCH_GLOSS[signature.kind]}, in the pillar BaZi reads for partnership` };
            }
            if (signature.system === 'numerology' && (signature.flavour === 'same-number' || signature.flavour === 'shared-root') && NUMBER_GLOSS[signature.kind]) {
                const same = signature.flavour === 'same-number';
                return { contact: same ? `both have the same ${POSITION_NAME[signature.kind]} number` : `their ${POSITION_NAME[signature.kind]} numbers share a root`, tradition: 'numerology', gloss: NUMBER_GLOSS[signature.kind] };
            }
            return null;
    }
}
/** The relation said in plain words, around the contact. One or two sentences. */
/** The relation said in plain words, around the contact. `withClose` is false when the reading has already said that relation's closing sentence. */
export function contactSentence(relation, role, clause, withClose = true, area = null) {
    const reads = `${clause.contact}, which ${clause.tradition} reads as ${clause.gloss}`;
    const close = (sentence) => (withClose ? ` ${sentence}` : '');
    switch (relation) {
        case 'echoes': return `The two charts also meet directly on this: ${reads}.`;
        /* (V5) the consequence names the area it bears on (52 and 34 readings had shared one stock tail each) */
        case 'eases': return `One direct contact between the two charts runs the other way: ${reads}.${close(area ? `It gives them something to draw on when ${area} is where they snag.` : 'That is something to work from when the snag shows.')}`;
        case 'complicates': return role === 'resonance'
            ? `One direct contact between the two charts adds a rougher note: ${reads}.${close(area ? `So being alike in ${area} need not mean ease; it can also be where they catch on each other.` : 'So the likeness need not mean ease; it can also be where they catch on each other.')}`
            : `One direct contact between the two charts adds a rougher note: ${reads}.${close(area ? `So the difference in ${area} may not settle into a fit on its own.` : 'So the difference may not settle into a fit on its own.')}`;
        default: return `The two charts also meet directly in this area: ${reads}.`;
    }
}
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
/** The sentence for a finding, or null; the contact used is recorded so a reading never tells the same contact twice. */
export function contactParagraphFor(finding, signatures, names, used, area = null) {
    for (const choice of contactsFor(finding, signatures, used)) {
        const clause = contactClause(choice.signature, names);
        if (!clause)
            continue;
        used.add(choice.signature.id);
        /* a relation's closing sentence is said once per reading (the set records it beside the contacts used) */
        const closeKey = `close:${choice.relation}:${finding.role}`;
        const withClose = !used.has(closeKey);
        used.add(closeKey);
        return capitalise(contactSentence(choice.relation, finding.role, clause, withClose, area));
    }
    return null;
}
