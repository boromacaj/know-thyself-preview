import { PITFALL_OF_BODY } from './dayPlan.js?v=53c0693';
import { MOVE_LINE, RELIANCE_LINE, TENSION_LEAN } from './dayPlanEnglish.js?v=53c0693';
import { frictionAreaOf, needsOf } from './dayStory.js?v=53c0693';
import { becauseLines, convergentLine, AVOID_CARE, BODY_SUBJECT, CAUTION_SOURCE, HARD_FIRST, courseTail, LIMIT_POLE, LIMIT_THAN, OPPOSED_LEAD, OWN_PLACE_WITH, TOUCH_WITH, opposedLean, sameLean, CONNECTIVE, CONTACT_CLAUSE, CONTACT_MEANING, CONTACT_MODAL, CONTRAST_IN, EASIER_BASE, EASIER_IN, EASIER_RECONCILED, LIMIT_ADVICE, LIMIT_IN, MOVE_CLASS_OF, MOVE_DIFFER, MOVE_EDGE, MOVE_GENTLE, MOVE_SOURCE, NATAL_OBJECT, OWN_PLACE, MIRROR_CONNECTIVE, driveTail, mirroredSentence, PITFALL_OF_AREA, PRESSURE_LINE, PRESSURE_TITLE, COUNTERPART, QUIETER_CLAUSE, QUIET_LINE, QUIET_TITLE, RECONCILED_RELIANCE, RISING_PHRASE, RISING_PAIR, SETTLE_AND_STEP_BACK, ROOM_NOUN, SETTING_ELEMENT, SETTING_PHASE, SOFT_QUIETER, SOFT_RISING, STANCE_TITLE, TENSION_HEADLINE, TITLE_GERUND, TITLE_NOUN, TONE_ADJECTIVE, TOUCH, WATCH_CARE, compoundSentence, houseSentence, moveEase, pillarSentence, pullAgain, pullSentence, FRICTION_NOUN, } from './dayStoryVoice.js?v=53c0693';
/*
 * THE STORY, IN ENGLISH - ONE VOICE FOR EVERY SECTION OF THE READING.
 *
 * Each realiser here writes one section from the story and from nothing else, and registers what it said as CLAIMS
 * in a ledger. A claim is a closed key (a pole the day leans on, a feeling, a caution, a contact), and the ledger
 * is how one section knows what another has already put in words. That is the whole of the editorial control that
 * acts on generation: a feeling the sky has just described is not announced again as "emotional climate", a
 * caution the sky has just explained is not restated as a caution, and a setting that has nothing to do with the
 * day is not said at all. What the ledger held back is recorded, with the reason, never silently dropped.
 *
 * WHAT EACH SECTION IS FOR, so no two say the same thing in the same way:
 *   title      the central proposition, in a few words
 *   opening    how the day's evidence stands to itself: where the number and the sky meet, part, or one stands alone,
 *              and what the day's lead is better than. It adds to the title; it never repeats it.
 *   sky        what each of the day's contacts does and where it comes from, and how two of them stand to each other
 *   easier     approaches that sit with the day
 *   care       the risk, named - where the move names the action - with the source of a friction the sky has not explained
 *   climate    what the day may bring up in you, if the plan is sure of it and the sky has not already said it
 *   move       one modest action that follows from the rest, with the reason of the day's own where there is one
 *
 * DETERMINISTIC. A section is chosen by the story's structure and by nothing else: no date, no rotation, no luck.
 */
/**
 * P1.6.2: TWO CAUTIONS THAT WARN OF THE SAME RISK ARE ONE CAUTION. "Words can come out sharper than intended, and tempers can run short" and "there may
 * be plenty to say, and with touchy moods it can land harder than intended" are the same warning about speaking, written for two plan items. The first is
 * said; the second is recorded as held, with its reason, so nothing is dropped silently and the plan item is still accounted for.
 */
const CARE_CONCEPT = {
    'watch:sharp-edges': 'sharp-speech', 'pull:speak-vs-friction': 'sharp-speech',
};
/** The frictions that are about how things are said and taken: said by the opening and the sky, they are not said again as a caution. */
const TONE_PITFALLS = new Set(['crossed-wires', 'taking-things-personally', 'sharp-edges']);
const toneOf = (claims) => (claims.some((claim) => claim.startsWith('caution:') && TONE_PITFALLS.has(claim.slice('caution:'.length))) ? [...claims, 'topic:tone'] : claims);
/** The tensions whose sentence names where the friction comes from. */
const NAMES_EDGE = new Set(['decide-vs-friction', 'speak-vs-friction', 'axis:friction']);
export class Ledger {
    sentences = [];
    held = [];
    seen = new Set();
    said(key) { return this.seen.has(key); }
    /** In how many different sections a claim has been made: a topic said by two sections is not worth a third. */
    sections(key) { return new Set(this.sentences.filter((sentence) => sentence.claims.includes(key)).map((sentence) => sentence.section)).size; }
    add(sentence) {
        this.sentences.push(sentence);
        for (const claim of sentence.claims)
            this.seen.add(claim);
    }
    hold(section, kind, reason) { this.held.push({ section, kind, reason }); }
}
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const joinAnd = (parts) => (parts.length <= 2
    ? parts.join(' and ')
    : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`);
/* ------------------------------------------------------------ cautions' sources -- */
const isHard = (contact) => contact.quality === 'hard';
/**
 * THE TENSE CONTACT A CAUTION STANDS ON, WHEN THE SKY PARAGRAPH DID NOT EXPLAIN IT.
 * A caution the plan holds is traced to the contacts in its basis. If one of them is narrated, the reader has already been told
 * where it comes from; if none is, the caution would be a claim without a visible reason, so the first tense contact it stands
 * on is named at the end of the line. A caution that stands on no contact (a number, a longer-period theme) has no source to name.
 */
function unexplainedSource(basis, story, ledger) {
    const hard = basis.triggers.map((ref) => story.contactIndex.get(ref.id)).filter((contact) => contact !== undefined && isHard(contact));
    if (hard.length === 0)
        return null;
    const narrated = new Set(story.sky.contacts.map((contact) => contact.factId));
    /* A tense contact the reader has been told about is the explanation; only when none of them is narrated is the first one named. */
    if (hard.some((contact) => narrated.has(contact.factId)))
        return null;
    /* A contact is named once in a reading: a later line standing on it stands on what was said, and still says what the friction is about. */
    const named = hard.find((contact) => ledger.said(`source:${contact.body}>${contact.natal}`));
    return named ? { contact: named, printed: false } : { contact: hard[0], printed: true };
}
const withSource = (text, source) => (source ? text.replace(/\.$/, `, ${CAUTION_SOURCE(source.body, source.natal)}.`) : text);
/* ----------------------------------------------------------------------- title -- */
export function titleOf(theme, story) {
    if (theme.kind === 'tension' && theme.tension)
        return TENSION_HEADLINE[theme.tension];
    if (theme.kind === 'pressure')
        return PRESSURE_TITLE;
    if (theme.kind === 'quiet')
        return QUIET_TITLE;
    const plan = story.headline;
    /* P1.6.3: a lead that rests on secondary effects only, with nothing in the reading to state it, is a pull and not a recommendation. */
    if (plan.hedged && plan.main) {
        return !plan.companion ? `A day that leans toward ${TITLE_NOUN[plan.main]}`
            : plan.joint === 'and' ? `A day that leans toward ${TITLE_GERUND[plan.main]} and ${TITLE_GERUND[plan.companion]}`
                : `A day that leans toward ${TITLE_NOUN[plan.main]}, with room for ${ROOM_NOUN[plan.companion]}`;
    }
    let named;
    if (plan.main) {
        const first = TITLE_NOUN[plan.main];
        named = !plan.companion ? first : plan.joint === 'and' ? `${TITLE_GERUND[plan.main]} and ${TITLE_GERUND[plan.companion]}` : `${first}, with room for ${ROOM_NOUN[plan.companion]}`;
    }
    else {
        named = joinAnd(theme.stances.map((pole) => STANCE_TITLE[pole]).filter(Boolean));
    }
    if (!named)
        return 'A day to take as it comes';
    /* An adjective is said only where a pole the day leads on carries it, and only for a day named by what to do. */
    /* "An active day for physical activity" says the same thing twice: the adjective is left out where the activity carries it. */
    const redundant = theme.tone === 'active' && theme.topics.includes('physical-activity');
    const adjective = theme.topics.length > 0 && theme.tone && !redundant ? TONE_ADJECTIVE[theme.tone] : null;
    const article = adjective && /^[aeiou]/i.test(adjective) ? 'An' : 'A';
    /* P1.6.3: the day's move belongs to an activity nothing explains: it stays in the title, as a pull. */
    if (plan.pull)
        named = `${named}, with room for ${ROOM_NOUN[plan.pull]}`;
    if (theme.confidence === 'high' && !plan.pull)
        return adjective ? `${article} ${adjective} day for ${named}` : `A day for ${named}`;
    return adjective ? `${article} ${adjective} day suited to ${named}` : `A day suited to ${named}`;
}
/**
 * THE LINE UNDER THE HEADLINE: how the day's evidence stands to itself, and what the lead is better than.
 *   a lead         where the day's number and the sky meet, part, or one stands alone (dayStory.ts, pillarsOf), and what the
 *                  lead suits the day better than, when it has a cost worth naming
 *   a tension      what pulls, from where the friction comes when the evidence names it
 *   a quiet or pressured day  says so
 * The headline names the day; this says why it reads that way. It never repeats the headline's words, and a day on which there
 * is nothing to add has no opening at all.
 */
export function openingOf(story, basis, ledger, guard) {
    const theme = story.theme;
    const out = [];
    const push = (raw, claims, b, proposition) => {
        const text = guard('glance', 'line', raw);
        if (!text)
            return;
        const sentence = { section: 'opening', text, claims, basis: b, proposition };
        out.push(sentence);
        ledger.add(sentence);
    };
    if (theme.kind === 'tension' && theme.tension) {
        const found = unexplainedSource(basis, story, ledger);
        const source = found?.printed ? found.contact : null;
        const edge = found?.contact.body ?? story.edgeBody;
        const named = edge !== null && !ledger.said(`edge:${edge}`);
        const raw = edge !== null && !named ? pullAgain(theme.tension) : pullSentence(theme.tension, named ? edge : null);
        push(withSource(raw, source), [`pull:${theme.tension}`, ...(named && NAMES_EDGE.has(theme.tension) ? [`edge:${edge}`] : []), ...(source ? [`source:${source.body}>${source.natal}`] : [])], basis, 'opening');
    }
    else if (theme.kind === 'pressure') {
        push(PRESSURE_LINE, ['state:pressure'], basis, 'opening');
    }
    else if (theme.kind === 'quiet') {
        push(QUIET_LINE, ['state:even'], basis, 'opening');
    }
    else {
        const pillars = story.pillars;
        /* P1.6.3: WHY THIS IS THE HEADLINE comes first. The plan stood the lead on facts that press a pole; where nothing the reader will read states that pole
           (the number-and-sky sentence below does not, and no narrated contact's sentence says it), one sentence says it in the day's own words. */
        const needed = story.support.filter((entry) => entry.from !== null && entry.status !== 'stated' && entry.status !== 'thin');
        const lines = [
            ...becauseLines(needed.filter((entry) => entry.status !== 'convergent').map((entry) => ({ topic: entry.topic, from: entry.from }))),
            ...needed.filter((entry) => entry.status === 'convergent').flatMap((entry) => { const line = convergentLine(entry.topic, entry.from, new Set(entry.drivers.map((ref) => ref.pillar))); return line ? [line] : []; }),
        ];
        /* P1.6.2'S RULE, KEPT: THE SAME LEAN IS SAID ONCE. Where the plan's "better than" line advises the lean the sentence that says why has just said, the line is recorded as said by it. */
        const limitPoleOfWhy = theme.limit ? LIMIT_POLE[theme.limit] : undefined;
        let becauseFolded = false;
        const becausePoles = [];
        for (const line of lines) {
            const polesSaid = line.claims.filter((claim) => claim.startsWith('lead:')).map((claim) => claim.slice('lead:'.length));
            const sameAsLimit = theme.limit !== null && limitPoleOfWhy !== undefined && !becauseFolded && polesSaid.some((pole) => sameLean(limitPoleOfWhy, pole));
            const drivers = needed.filter((entry) => line.topics.includes(entry.topic)).flatMap((entry) => entry.drivers.slice(0, 3));
            const seen = new Set();
            const triggers = drivers.filter((ref) => !seen.has(ref.id) && seen.add(ref.id));
            const groups = [...new Set(triggers.map((ref) => ref.independenceGroup))].sort();
            const because = { triggers, background: [], tension: null, groups, convergence: new Set(triggers.map((ref) => ref.pillar)).size >= 2 ? 'cross-pillar' : groups.length >= 2 ? 'same-pillar' : 'single-source' };
            /* Two reasons that lean opposite ways are not left to contradict: the second says what holds even so. */
            const opposes = polesSaid.some((pole) => becausePoles.some((earlier) => opposedLean(earlier, pole)));
            becausePoles.push(...polesSaid);
            push(opposes ? `${OPPOSED_LEAD}${line.text.charAt(0).toLowerCase()}${line.text.slice(1)}` : line.text, [...line.claims, ...(sameAsLimit ? [`limit:${theme.limit}`] : [])], because, `because:${line.topics[0]}`);
            if (sameAsLimit) {
                becauseFolded = true;
                ledger.hold('opening', `limit:${theme.limit}`, 'the sentence that says why the headline is the headline has already said the same lean');
            }
        }
        /* P1.6.2: THE SAME LEAN IS SAID ONCE. The sentence about the number and the sky has just said which way the day leans; the plan's "better than" line says
           the same lean again in other words whenever it advises that pole. Where they agree it is folded into the first sentence (or, where the first sentence
           already says what the lean makes easier, the plan's limit is recorded as said by it), and the line is not written twice. */
        const limitPole = theme.limit ? LIMIT_POLE[theme.limit] : undefined;
        let folded = becauseFolded;
        if (pillars) {
            const said = pillarSentence(pillars, story.sky.contacts.some((contact) => contact.quality === 'hard'));
            if (said) {
                const same = !becauseFolded && theme.limit !== null && limitPole !== undefined && sameLean(limitPole, pillars.pole) && LIMIT_THAN[theme.limit] !== undefined;
                if (same && (pillars.relation === 'number-led' || pillars.relation === 'numbers-only')) {
                    push(`${said.text.replace(/\.$/, '')} rather than ${LIMIT_THAN[theme.limit]}.`, [...said.claims, `limit:${theme.limit}`], pillars.basis, `pillars:${pillars.relation}`);
                    folded = true;
                }
                else if (same && (pillars.relation === 'agree' || pillars.relation === 'overlap' || pillars.relation === 'differ' || pillars.relation === 'tempered')) {
                    push(said.text, toneOf([...said.claims, `limit:${theme.limit}`]), pillars.basis, `pillars:${pillars.relation}`);
                    ledger.hold('opening', `limit:${theme.limit}`, 'the sentence about the number and the sky has already said the same lean');
                    folded = true;
                }
                else {
                    /* A reason that has just said a lean the number's lean opposes: "Even so, the day's 8 favours making a decision." */
                    const opposesWhy = becausePoles.some((earlier) => opposedLean(earlier, pillars.pole));
                    push(opposesWhy ? `${OPPOSED_LEAD}${said.text.charAt(0).toLowerCase()}${said.text.slice(1)}` : said.text, toneOf(said.claims), pillars.basis, `pillars:${pillars.relation}`);
                }
            }
        }
        if (theme.limit && !folded) {
            const limitText = (story.family ? LIMIT_IN[theme.limit]?.[story.family] : undefined) ?? LIMIT_ADVICE[theme.limit];
            /* A lean that asks for the opposite of the one just said ("making a decision", then "keeping the ideas open") is said as what holds even so. */
            const opposes = (Boolean(pillars) && limitPole !== undefined && ['agree', 'overlap', 'number-led', 'numbers-only', 'tempered'].includes(pillars.relation) && opposedLean(limitPole, pillars.pole))
                /* P1.6.3: or the sentence that says why the headline is the headline leans the other way (an activity with two poles: "attention holds on detail", then "a conclusion is better left to arrive"). */
                || (limitPole !== undefined && becausePoles.some((earlier) => opposedLean(earlier, limitPole)));
            push(opposes ? `${OPPOSED_LEAD}${limitText.charAt(0).toLowerCase()}${limitText.slice(1)}` : limitText, [`limit:${theme.limit}`, ...(opposes ? ['qualifies:lean'] : [])], basis, 'opening');
        }
    }
    if (out.length === 0)
        return null;
    return { text: out.map((sentence) => sentence.text).join(' '), sentences: out };
}
/* ------------------------------------------------------------------------ sky -- */
/** The planets whose names a reader is less likely to know are said once with what they are about. */
const GLOSSED = new Set(['Mercury', 'Venus', 'Mars']);
/**
 * A CONTACT: ITS SOURCE, THEN WHAT IT TENDS TO DO. "The Moon is in easy contact with your Mercury (how you think and talk),
 * which tends to make it easier to put what you think and what you feel into words." The first half says where the claim comes
 * from; the second is the part a reader acts on, said as a tendency (`tends to` for a contact that eases, `can` for one that
 * comes with friction), and a contact still building or already fading says so at the end.
 */
function contactSentence(contact, glossed, connective, saysCourse, meaningFirst = false, sameBody = false, tailPole = null) {
    const meaning = CONTACT_MEANING[contact.body][contact.natal][contact.quality];
    /* P1.6.3: the contact the headline stands on says what it does for that lean, where its own sentence does not (an easy or merging contact only). */
    const tail = tailPole && contact.quality !== 'hard' && contact.timing !== 'fading' ? driveTail(tailPole, meaning) : null;
    /* P1.6.3: the second contact of the body just named is "it": "The Moon lines up with your Mars ... Meanwhile, it is in tense contact with your Sun". */
    const subject = connective ? (sameBody ? 'it' : BODY_SUBJECT[contact.body].replace(/^The /, 'the ')) : BODY_SUBJECT[contact.body];
    const tone = contact.quality === 'hard' && TONE_PITFALLS.has(PITFALL_OF_AREA[frictionAreaOf(contact)]);
    const claims = () => [`contact:${contact.body}>${contact.natal}:${contact.quality}`, `timing:${contact.timing}`, ...new Set([...CONTACT_CLAUSE[contact.body][contact.natal][contact.quality].says, ...(tail && tailPole ? [tailPole] : [])]).values()].map((claim) => (claim.startsWith('contact:') || claim.startsWith('timing:') ? claim : `say:${claim}`)).concat(tone ? ['topic:tone'] : []);
    /* P1.6.2: a contact with friction says what it does first, then where it comes from; a contact that eases keeps its source first. */
    if (meaningFirst && contact.quality === 'hard') {
        const lower = BODY_SUBJECT[contact.body].replace(/^The /, 'the ');
        let source;
        if (contact.body === contact.natal) {
            source = OWN_PLACE_WITH[contact.timing];
        }
        else {
            const natal = NATAL_OBJECT[contact.natal];
            const gloss = GLOSSED.has(contact.natal) && !glossed.has(contact.natal) ? ` (${natal.gloss})` : '';
            glossed.add(contact.natal);
            source = `${TOUCH_WITH[contact.timing]} ${natal.name}${gloss}`;
        }
        return { text: `${HARD_FIRST[contact.body][contact.natal]}, with ${lower} ${source}.`, claims: claims() };
    }
    let object;
    if (contact.body === contact.natal) {
        object = OWN_PLACE[contact.quality][contact.timing];
    }
    else {
        const natal = NATAL_OBJECT[contact.natal];
        const gloss = GLOSSED.has(contact.natal) && !glossed.has(contact.natal) ? ` (${natal.gloss})` : '';
        glossed.add(contact.natal);
        object = `${TOUCH[contact.quality][contact.timing]} ${natal.name}${gloss}`;
    }
    return {
        text: `${connective ?? ''}${subject} ${object}, which ${CONTACT_MODAL[contact.quality]} ${meaning}${tail ? `, and ${tail}` : ''}${saysCourse ? courseTail(contact.quality, contact.timing) : ''}.`,
        claims: claims(),
    };
}
function settingSentence(setting) {
    const key = setting.key;
    if (key.type === 'phase')
        return { text: SETTING_PHASE[key.kind], claim: `setting:phase:${key.kind}` };
    if (key.type === 'house')
        return { text: houseSentence(key.house), claim: `setting:house:${key.house}` };
    return { text: SETTING_ELEMENT[key.element], claim: `setting:element:${key.element}` };
}
export function skyOf(story, interpretation, ledger, guard) {
    void interpretation;
    const parts = [];
    const glossed = new Set();
    const push = (raw, claims, basis, proposition) => {
        const text = guard('glance', 'reading:sky', raw);
        if (!text)
            return;
        const sentence = { section: 'sky', text, claims, basis, proposition };
        parts.push(sentence);
        ledger.add(sentence);
    };
    const { contacts, relation, setting } = story.sky;
    /* The contact each headline theme stands on, and the lean it is the reason for: its sentence says what it does for that lean where its own words do not. */
    const tails = new Map();
    for (const entry of story.support)
        if (entry.lead && entry.from && entry.leadQuality !== 'hard' && (entry.status === 'sky' || entry.status === 'unsaid') && !tails.has(entry.lead.id))
            tails.set(entry.lead.id, entry.from);
    /* P1.6.3: two contacts that are each other's reverse (the Moon to your Mars, Mars to your Moon) with the same quality are ONE meaning said once. On one course they
       are one sentence naming both sources; on different courses the second is introduced as the same thing seen the other way round. */
    const mirrored = contacts.length === 2 && contacts[0].body === contacts[1].natal && contacts[0].natal === contacts[1].body && contacts[0].body !== contacts[0].natal
        && contacts[0].quality === contacts[1].quality;
    const fused = mirrored && contacts[0].timing === contacts[1].timing;
    if (fused) {
        const [a, b] = contacts;
        const natal = NATAL_OBJECT[a.natal];
        const gloss = GLOSSED.has(a.natal) && !glossed.has(a.natal) ? ` (${natal.gloss})` : '';
        glossed.add(a.natal);
        const both = { ...a.basis, triggers: [...a.basis.triggers, ...b.basis.triggers], groups: [...new Set([...a.basis.groups, ...b.basis.groups])].sort() };
        const claimsOf = (contact) => [`contact:${contact.body}>${contact.natal}:${contact.quality}`, `timing:${contact.timing}`, ...CONTACT_CLAUSE[contact.body][contact.natal][contact.quality].says.map((say) => `say:${say}`)];
        const tone = a.quality === 'hard' && TONE_PITFALLS.has(PITFALL_OF_AREA[frictionAreaOf(a)]);
        push(mirroredSentence(a, b, gloss), [...new Set([...claimsOf(a), ...claimsOf(b), ...(tone ? ['topic:tone'] : [])])], both, 'sky:contact:0');
        ledger.hold('sky', 'contact:1', 'said together with the first: the two contacts are mirror images of one pair of points, one meaning');
    }
    if (!fused)
        contacts.forEach((contact, index) => {
            /* A third contact (kept only where promoting the headline's driver would have displaced the strongest tense one) is joined by what it is: friction beside what came before. */
            const connective = index === 0 ? null : mirrored ? MIRROR_CONNECTIVE : relation === null && index >= 2 ? (contact.quality === 'hard' ? CONNECTIVE.contrast : CONNECTIVE.reinforce) : CONNECTIVE[relation?.type ?? 'independent'];
            /* The verb already says a contact is building or fading; the tail says how that changes the day, once, unless the second contact is on a different course. */
            const saysCourse = index === 0 || contact.timing !== contacts[0].timing;
            /* A friction leads with what it does only where nothing earlier has said it: where the opening has already described the friction, the new information is where it comes from. */
            const frictionSaid = ledger.sentences.some((sentence) => sentence.section === 'opening' && sentence.claims.some((claim) => /^(?:friction|caution|pull):/.test(claim)));
            const said = contactSentence(contact, glossed, connective, saysCourse, index === 0 && !frictionSaid, index > 0 && contact.body === contacts[0].body && contact.body !== contact.natal, tails.get(contact.factId) ?? null);
            push(said.text, said.claims, contact.basis, `sky:contact:${index}`);
        });
    if (relation && contacts.length === 2 && !fused) {
        const basis = { ...contacts[0].basis, triggers: [...contacts[0].basis.triggers, ...contacts[1].basis.triggers], groups: [...new Set([...contacts[0].basis.groups, ...contacts[1].basis.groups])].sort() };
        if (relation.type === 'contrast' && relation.area && relation.edge) {
            const friction = frictionAreaOf(relation.edge);
            push(CONTRAST_IN[friction], ['relation:contrast', `caution:${PITFALL_OF_AREA[friction]}`], basis, 'sky:relation:contrast');
        }
        else if (relation.type === 'compound' && relation.area) {
            push(compoundSentence(relation.area), ['relation:compound'], basis, 'sky:relation:compound');
        }
    }
    if (setting) {
        const said = settingSentence(setting);
        push(said.text, [said.claim], setting.basis, 'sky:setting');
    }
    if (parts.length === 0)
        return null;
    const seen = new Set();
    const triggers = parts.flatMap((part) => part.basis.triggers).filter((ref) => !seen.has(ref.id) && seen.add(ref.id));
    const groups = [...new Set(parts.flatMap((part) => part.basis.groups))].sort();
    const pillars = new Set(triggers.map((ref) => ref.pillar));
    return {
        text: parts.map((part) => part.text).join(' '),
        basis: { triggers, background: [], tension: null, groups, convergence: pillars.size >= 2 ? 'cross-pillar' : groups.length >= 2 ? 'same-pillar' : 'single-source' },
        sentences: parts,
    };
}
export function easierOf(items, story, ledger, guard) {
    const out = [];
    for (const [index, item] of items.entries()) {
        let raw;
        let kind;
        let claim;
        if (item.type === 'pole') {
            /* The opening has already said the way through (a number and a sky that lean opposite ways): the line is not said again. */
            if (ledger.said(`approach:${item.pole}`)) {
                ledger.hold('easier', `pole:${item.pole}`, 'the opening has already said it');
                continue;
            }
            if (story.theme.topics.length === 0 && story.theme.stances.includes(item.pole)) {
                ledger.hold('easier', `pole:${item.pole}`, 'the headline already says it');
                continue;
            }
            const contextual = story.family ? EASIER_IN[item.pole]?.[story.family] : undefined;
            raw = (item.reconciled ? EASIER_RECONCILED[item.reconciled] : undefined) ?? contextual ?? EASIER_BASE[item.pole];
            kind = `pole:${item.pole}${item.reconciled ? `+${item.reconciled}` : ''}`;
            claim = `approach:${item.pole}`;
        }
        else {
            if (ledger.said(`way:${item.tension}`)) {
                ledger.hold('easier', `way:${item.tension}`, 'the opening has already said it');
                continue;
            }
            raw = TENSION_LEAN[item.tension];
            kind = `way:${item.tension}`;
            claim = `way:${item.tension}`;
        }
        const text = guard('leanInto', kind, raw);
        if (!text)
            continue;
        ledger.add({ section: 'easier', text, claims: [claim], basis: item.basis, proposition: `easier:${index}` });
        out.push({ text, kind, basis: item.basis });
    }
    return out;
}
/* ----------------------------------------------------------------------- care -- */
export function careOf(items, story, ledger, guard) {
    const out = [];
    for (const [index, item] of items.entries()) {
        let raw;
        let kind;
        let claim;
        const extra = [];
        /* The source of a caution the sky has not explained: said at the end of the line, so the line always has a visible reason - and once: a second
           line standing on the same contact does not name it again. */
        /* A "don't force this" line stands on the day's lean (a pole), not on a friction: it is explained by the opening and the limit, so a contact is not named at its end,
           where "as Venus is in tense contact with ..." would read as a cause it is not. */
        const found = item.type === 'avoid' ? null : unexplainedSource(item.basis, story, ledger);
        const printed = found?.printed ? found.contact : null;
        switch (item.type) {
            case 'rely':
                raw = (item.reconciledWith ? RECONCILED_RELIANCE[item.reliance] : undefined) ?? RELIANCE_LINE[item.reliance];
                kind = `rely:${item.reliance}${item.reconciledWith ? `+${item.reconciledWith}` : ''}`;
                claim = `rely:${item.reliance}`;
                break;
            case 'tension': {
                /* "Easy exchanges sit beside harder ones" is the sky paragraph's own contrast, said there with what to do about it. */
                if (item.tension === 'axis:friction' && ledger.said('relation:contrast')) {
                    ledger.hold('care', `pull:${item.tension}`, 'the sky paragraph has already set the ease against the friction');
                    continue;
                }
                /* The friction is named once in the reading: the second sentence that would name it says the pull without the noun. */
                const edge = found?.contact.body ?? story.edgeBody;
                const named = edge !== null && !ledger.said(`edge:${edge}`);
                raw = edge !== null && !named ? pullAgain(item.tension) : pullSentence(item.tension, named ? edge : null);
                kind = `pull:${item.tension}`;
                claim = `pull:${item.tension}`;
                if (named && NAMES_EDGE.has(item.tension))
                    extra.push(`edge:${edge}`);
                break;
            }
            case 'watch':
                raw = WATCH_CARE[item.pitfall];
                kind = `watch:${item.pitfall}`;
                claim = `risk:${item.pitfall}`;
                /* The sky has just explained this friction and what to do about it: naming it again as a caution is one thing twice. */
                if (ledger.said(`caution:${item.pitfall}`)) {
                    ledger.hold('care', kind, 'the sky paragraph has already explained this friction and what to do about it');
                    continue;
                }
                break;
            case 'avoid':
                raw = AVOID_CARE[item.avoid];
                kind = `avoid:${item.avoid}`;
                claim = `avoid:${item.avoid}`;
                break;
        }
        /* P1.6.2: the tone friction said by the opening AND the sky is not said a third time as a caution (the move still answers it). */
        const isTone = (item.type === 'watch' && TONE_PITFALLS.has(item.pitfall)) || (item.type === 'tension' && item.tension === 'speak-vs-friction');
        /* ...but never the first caution of the card: a day whose opening names a friction and whose "needs more care" section is then empty reads as under-explained (the blind review). */
        if (isTone && ledger.sections('topic:tone') >= 2 && out.length > 0) {
            ledger.hold('care', kind, 'the opening and the sky have already said this friction, and the move answers it');
            continue;
        }
        const concept = CARE_CONCEPT[kind];
        if (concept && ledger.said(`concept:${concept}`)) {
            ledger.hold('care', kind, 'another caution has already warned of the same risk');
            continue;
        }
        if (concept)
            extra.push(`concept:${concept}`);
        const text = guard('avoidForcing', kind, withSource(raw, printed));
        if (!text)
            continue;
        ledger.add({ section: 'care', text, claims: [claim, ...extra, ...(printed ? [`source:${printed.body}>${printed.natal}`] : [])], basis: item.basis, proposition: `care:${index}` });
        out.push({ text, kind, basis: item.basis });
    }
    return out;
}
/* -------------------------------------------------------------------- climate -- */
const sayClaim = (feeling) => `say:${feeling}`;
/** Feelings that are strains and not gains: said beside a lost capacity with "and", never "though". */
const STRAIN_FEELINGS = new Set(['impatience', 'irritability', 'restlessness']);
/**
 * HOW THE DAY MAY FEEL: what the plan is sure of, as one thought, and nothing the sky has already described.
 * A feeling the plan is only moderately sure of is said only when it is the whole of what there is to say and
 * nothing in the reading has said it - never as an addition to a sure one, which is where "a little X may also
 * show" came from.
 */
export function climateOf(model, plan, narrated, ledger, guard, dayNumber = null) {
    const climate = model.emotionalClimate;
    if (!climate)
        return null;
    const rising = climate.rising.filter((feeling) => !ledger.said(sayClaim(feeling)));
    const quieter = climate.quieter.filter((feeling) => !ledger.said(sayClaim(feeling)));
    for (const feeling of climate.rising)
        if (!rising.includes(feeling))
            ledger.hold('climate', `rising:${feeling}`, 'the sky paragraph has already described this');
    for (const feeling of climate.quieter)
        if (!quieter.includes(feeling))
            ledger.hold('climate', `quieter:${feeling}`, 'the sky paragraph has already described this');
    const parts = [];
    const claims = [];
    const softOnes = [climate.softRising, climate.softQuieter].filter((feeling) => feeling !== null);
    if (rising.length > 0 || quieter.length > 0) {
        /* A capacity that is only the counterpart of a feeling already said is the same thought: it is not said again. */
        const trailing = quieter.filter((capacity) => {
            if (!rising.includes(COUNTERPART[capacity]))
                return true;
            ledger.hold('climate', `quieter:${capacity}`, 'it is the counterpart of a feeling already said');
            return false;
        });
        /* ONE THOUGHT, NOT A LIST: a feeling and the capacity it takes away, or two feelings. More than that is an inventory. */
        const said = trailing.length > 0 && rising.length > 0
            ? { rising: rising.slice(0, 1), quieter: trailing.slice(0, 1) }
            : { rising: rising.slice(0, 2), quieter: trailing.slice(0, 2) };
        for (const feeling of rising.filter((candidate) => !said.rising.includes(candidate)))
            ledger.hold('climate', `rising:${feeling}`, 'the climate is one thought, not a list');
        for (const capacity of trailing.filter((candidate) => !said.quieter.includes(candidate)))
            ledger.hold('climate', `quieter:${capacity}`, 'the climate is one thought, not a list');
        const pair = said.rising.length === 2 && said.quieter.length === 0 ? RISING_PAIR[`${said.rising[0]}+${said.rising[1]}`] : undefined;
        if (said.rising.length === 1 && said.rising[0] === 'restlessness' && said.quieter.length === 1 && said.quieter[0] === 'emotional-distance') {
            parts.push(SETTLE_AND_STEP_BACK);
        }
        else if (pair) {
            parts.push(pair);
        }
        else {
            const youPart = said.rising.filter((feeling) => RISING_PHRASE[feeling].form === 'you').map((feeling) => RISING_PHRASE[feeling].text);
            const eventParts = said.rising.filter((feeling) => RISING_PHRASE[feeling].form === 'event').map((feeling) => RISING_PHRASE[feeling].text);
            const lead = [...(youPart.length > 0 ? [`you may ${joinAnd(youPart)}`] : []), ...eventParts];
            const trail = said.quieter.map((capacity) => QUIETER_CLAUSE[capacity]);
            const first = lead.length > 0 ? lead.join(', and ') : trail.join(', and ');
            /* "though" sets a gain against a cost; a feeling that is itself a strain (restlessness, impatience) is not a gain, so the two are joined, not set against each other. */
            const joiner = said.rising.some((feeling) => STRAIN_FEELINGS.has(feeling)) ? ', and ' : ', though ';
            if (lead.length > 0 && trail.length > 0)
                parts.push(`${capitalise(first)}${joiner}${trail.join(', and ')}.`);
            else
                parts.push(`${capitalise(first)}.`);
        }
        claims.push(...said.rising.map((feeling) => `feeling:${feeling}`), ...said.quieter.map((feeling) => `feeling:${feeling}`));
        for (const feeling of softOnes)
            ledger.hold('climate', `soft:${feeling}`, 'a moderately sure feeling is not added to a sure one');
    }
    else {
        /* A feeling the plan is only moderately sure of is worth a line only if the reading has already explained the influence it comes from:
           otherwise it is a mood with no visible reason, and the section would be invented to exist. */
        const sourceOf = (feeling) => [...plan.emotionsRising, ...plan.emotionsQuieter].find((item) => item.kind === feeling)?.basis.groups ?? [];
        const free = softOnes.filter((feeling) => !ledger.said(sayClaim(feeling)) && sourceOf(feeling).some((group) => narrated.has(group)));
        for (const feeling of softOnes) {
            if (free.includes(feeling))
                continue;
            ledger.hold('climate', `soft:${feeling}`, ledger.said(sayClaim(feeling)) ? 'the sky paragraph has already described this' : 'its source is not explained anywhere in the reading');
        }
        const first = free[0];
        if (first) {
            parts.push(SOFT_RISING[first] ?? SOFT_QUIETER[first]);
            claims.push(`feeling:${first}`);
            for (const extra of free.slice(1))
                ledger.hold('climate', `soft:${extra}`, 'a moderately sure feeling is said once, alone');
        }
    }
    /* P1.6.3: a feeling the day's NUMBER alone brings forward says so ("With the day's 8, you may feel more sure of yourself"): said bare, it read as a mood with no reason (21 quotes in the holdout review). */
    const numberOnly = dayNumber !== null && climate.basis.groups.length > 0 && climate.basis.groups.every((group) => group === 'numerology:current-cycle');
    const text = parts.map((part) => guard('emotionsRising', 'climate', numberOnly ? `With the day's ${dayNumber}, ${part.charAt(0).toLowerCase()}${part.slice(1)}` : part)).filter((part) => part !== null).join(' ');
    if (!text)
        return null;
    ledger.add({ section: 'climate', text, claims, basis: climate.basis, proposition: 'climate' });
    return { text, basis: climate.basis };
}
/* ----------------------------------------------------------------------- move -- */
/**
 * THE REASON THE MOVE FITS TODAY, if the day's own evidence gives one (see MoveFacet in dayStoryVoice.ts). The action is the plan's,
 * word for word; what follows it is a consideration of the day: where a tense contact is the usual source of the pitfall the move
 * answers, where the sky leans away from what the move needs, where an easier contact leans toward it, or what a friction asks of
 * a move that touches other people. A move with no reason of the day's own is the action alone.
 */
export function moveReasonOf(kind, story, ledger) {
    const theme = story.theme;
    if (theme.kind === 'pressure')
        return null;
    const [type, rest] = [kind.slice(0, kind.indexOf(':')), kind.slice(kind.indexOf(':') + 1)];
    if (type === 'pitfall') {
        const pitfall = rest;
        /* The caution has already said this friction (under "needs more care", or in the sky or the opening): the move answers it and does not explain it again. */
        if (ledger.said(`risk:${pitfall}`) || ledger.said(`caution:${pitfall}`))
            return null;
        const matches = [...story.contactIndex.values()].some((contact) => isHard(contact) && PITFALL_OF_BODY[contact.body] === pitfall);
        return matches ? { facet: 'source', text: MOVE_SOURCE[pitfall] } : null;
    }
    if (type !== 'activity')
        return null;
    const activity = rest;
    const cls = MOVE_CLASS_OF[activity];
    if (!cls)
        return null;
    const needs = needsOf(activity);
    const pillars = story.pillars;
    if (pillars?.relation === 'differ' && needs.includes(pillars.pole))
        return { facet: 'differ', text: MOVE_DIFFER };
    const bridged = pillars?.relation === 'agree' && needs.includes(pillars.pole);
    const easy = story.sky.contacts.find((contact) => contact.quality !== 'hard' && contact.said.some((pole) => needs.includes(pole)));
    /* P1.6.3: the lean the reading has already said (the sentence that says why the headline is the headline, or the opening's bridge) is not said again as the move's reason. */
    const leanSaid = (pole) => ledger.said(`lead:${pole}`) || ledger.sentences.some((sentence) => sentence.claims.some((claim) => /^bridge:[a-z-]+:/.test(claim) && claim.endsWith(`:${pole}`)));
    if (!bridged && easy && !leanSaid(easy.said.find((pole) => needs.includes(pole)))) {
        const text = moveEase(easy.said.find((pole) => needs.includes(pole)));
        if (text)
            return { facet: 'ease', text };
    }
    const hard = story.sky.contacts.find((contact) => contact.quality === 'hard');
    if (hard) {
        const area = frictionAreaOf(hard);
        const facet = area === 'feeling' || area === 'affection' ? 'edge-tone' : area === 'thinking' ? 'edge-wording' : 'edge-push';
        const text = MOVE_EDGE[cls]?.[facet];
        if (text)
            return { facet, text };
    }
    if (theme.tone === 'gentle' && MOVE_GENTLE[kind])
        return { facet: 'gentle', text: MOVE_GENTLE[kind] };
    return null;
}
export function moveOf(model, story, ledger, guard) {
    const move = model.move;
    if (!move)
        return null;
    const base = MOVE_LINE[move.kind];
    const reason = moveReasonOf(move.kind, story, ledger);
    const text = guard('practicalMove', move.kind, reason ? `${base} ${reason.text}` : base);
    if (!text)
        return null;
    ledger.add({ section: 'move', text, claims: [`move:${move.kind}`, ...(reason ? [`reason:${reason.facet}`] : [])], basis: move.basis, proposition: 'move' });
    return { text, kind: move.kind, basis: move.basis };
}
/* ------------------------------------------------------------------ unused guard -- */
/** Kept so the friction nouns stay importable from here for the tests that read them. */
export { FRICTION_NOUN };
