import { MOON_ELEMENT_ROWS, MOON_HOUSE_ROWS, MOON_PHASE_ROWS } from './dayKnowledge.js?v=53c0693';
import { topicSupportOf } from './dayComposition.js?v=53c0693';
import { CONTACT_CLAUSE, pillarSentence, sameLean } from './dayStoryVoice.js?v=53c0693';
import { ACTIVITY_RULES, PITFALL_OF_BODY, } from './dayPlan.js?v=53c0693';
import { OPPOSITE_POLE } from './dayTypes.js?v=53c0693';
export const FAMILY_OF_ACTIVITY = {
    'social-connection': 'people', 'difficult-conversation': 'people', negotiation: 'people',
    rest: 'quiet',
    'deep-work': 'focus', 'editing-and-review': 'focus', administration: 'focus', research: 'focus', planning: 'focus',
    'finishing-work': 'closing', 'cleanup-organisation': 'closing',
    'starting-work': 'start',
    'physical-activity': 'move',
    brainstorming: 'ideas', 'creative-exploration': 'ideas',
};
export const AREA_OF_NATAL = {
    Sun: 'direction', Moon: 'feeling', Mercury: 'thinking', Venus: 'affection', Mars: 'drive',
};
/** What a transiting body is about: the area of life its own character presses on, whatever it touches. */
export const AREA_OF_BODY = {
    Sun: 'direction', Moon: 'feeling', Mercury: 'thinking', Venus: 'affection', Mars: 'drive',
};
/**
 * WHAT A FRICTION IS ABOUT. The Moon is read by what she touches, so her friction is about feeling - except where the point she
 * lands on names the matter (her tension with the Mind or the drive is about thinking or drive). Every other body brings its own
 * character: Mars is about temper, Mercury about wording, Venus about what is wanted, the Sun about being right.
 */
export const frictionAreaOf = (contact) => (contact.body !== 'Moon' ? AREA_OF_BODY[contact.body]
    : contact.natal === 'Mercury' || contact.natal === 'Mars' ? AREA_OF_NATAL[contact.natal] : 'feeling');
/** The areas a contact touches: the one it lands on and the one its own body is about. */
export const areasOf = (contact) => unique([AREA_OF_NATAL[contact.natal], AREA_OF_BODY[contact.body]]);
/** Pairs of kinds of day that do not make one noun phrase. Anything with rest is among them. */
const APART = [['closing', 'people'], ['closing', 'ideas'], ['closing', 'move'], ['start', 'move']];
const sitsWith = (a, b) => a !== 'quiet' && b !== 'quiet'
    && !APART.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
export function headlineOf(topics, thin = new Set(), move = null) {
    /* A title is not broader than its evidence: an activity whose pole one influence alone presses, and nothing states, is left out of the VISIBLE title when another activity of the lead is explained - unless the day's move belongs to it. */
    const explained = topics.filter((topic) => !thin.has(topic));
    const pull = explained.length > 0 ? topics.find((topic) => thin.has(topic) && topic === move) ?? null : null;
    const shown = explained.length > 0 ? explained : topics;
    const narrowed = topics.filter((topic) => !shown.includes(topic) && topic !== pull);
    const hedged = topics.length > 0 && explained.length === 0;
    const [main = null, companion = null] = shown;
    if (!main)
        return { main: null, companion: null, joint: 'single', narrowed, hedged: false, pull: null };
    if (!companion)
        return { main, companion: null, joint: 'single', narrowed, hedged, pull };
    return { main, companion, joint: sitsWith(FAMILY_OF_ACTIVITY[main], FAMILY_OF_ACTIVITY[companion]) ? 'and' : 'room', narrowed, hedged, pull: null };
}
/* ----------------------------------------------------------------- builder -- */
export const needsOf = (activity) => ACTIVITY_RULES.find((rule) => rule.activity === activity).needs;
const unique = (values) => [...new Set(values)];
function themeOf(advice, interpretation) {
    const glance = advice.glance;
    const topics = glance.lead;
    const families = unique(topics.map((activity) => FAMILY_OF_ACTIVITY[activity]));
    const anchors = interpretation.anchors;
    /* The tone is the pace of the pole the day leads on: a gentler day, a steadier one, a livelier one. Only a pole
       the day leads on is allowed to say it, so no adjective is ever added to dress a title. */
    const asked = anchors.includes('unhurried') ? 'gentle'
        : anchors.includes('urgent') ? 'active'
            : anchors.includes('narrow') && anchors.length === 1 ? 'steady' : null;
    /* A day that suits both rest and movement is neither "gentle" nor "active": the adjective would contradict half of the title. */
    const tone = (asked === 'active' && families.includes('quiet')) || (asked === 'gentle' && families.includes('move')) ? null : asked;
    return {
        kind: glance.headline === 'tension' ? 'tension' : glance.headline === 'quiet' ? (glance.pressure ? 'pressure' : 'quiet') : 'lead',
        topics, stances: glance.stances, families, tone, anchors, limit: glance.contrast, tension: glance.tension,
        confidence: glance.confidence,
    };
}
/** The poles two facts both press on, ignoring a pole one presses and the other opposes. */
const shared = (a, b) => a.filter((pole) => b.includes(pole));
function relate(a, b) {
    const hardA = a.quality === 'hard';
    const hardB = b.quality === 'hard';
    const common = areasOf(a).filter((area) => areasOf(b).includes(area));
    /* A shared area is what the relation is about; where two contacts share several, the area the first lands on leads. */
    const area = common.find((candidate) => candidate === AREA_OF_NATAL[a.natal]) ?? common[0] ?? null;
    const shares = shared(a.poles, b.poles);
    const edge = hardA && !hardB ? a : hardB && !hardA ? b : hardA && hardB ? a : null;
    const pitfall = edge ? (PITFALL_OF_BODY[edge.body] ?? null) : null;
    if (!hardA && !hardB)
        return { type: area || shares.length > 0 ? 'reinforce' : 'independent', area, edge: null, pitfall: null };
    if (hardA && hardB)
        return { type: area ? 'compound' : 'independent', area, edge, pitfall };
    /* One easy, one hard. They are one tension when they touch one area of life; pressing opposite poles without touching one
       area is two threads of the day, said as two. */
    /* A contrast needs a real ease on the other side: a contact that merges is intense, not easy, so "the ease is real" would be untrue of it. */
    const easy = hardA ? b : a;
    return { type: area && easy.quality === 'ease' ? 'contrast' : 'mixed', area, edge, pitfall };
}
/** The poles an item of the story is allowed to share with the Moon's setting: everything the day is about. */
function storyPoles(theme, advice) {
    const poles = new Set([...theme.anchors, ...theme.stances]);
    for (const activity of theme.topics)
        for (const pole of needsOf(activity))
            poles.add(pole);
    for (const item of advice.easier)
        if (item.type === 'pole')
            poles.add(item.pole);
    return poles;
}
const primaryPoles = (fact) => fact.effects.filter((effect) => effect.weight === 'primary').map((effect) => effect.pole);
const effectPoles = (fact) => [
    ...fact.effects.filter((effect) => effect.weight === 'primary').map((effect) => effect.pole),
    ...fact.effects.filter((effect) => effect.weight === 'secondary').map((effect) => effect.pole),
];
function skyOf(forecast, advice, interpretation, theme) {
    const byId = new Map(forecast.facts.facts.map((fact) => [fact.id, fact]));
    const contacts = [];
    const settingKeys = [];
    for (const passage of interpretation.sky) {
        if (passage.key.type !== 'contact') {
            settingKeys.push({ key: passage.key, basis: passage.basis });
            continue;
        }
        const fact = byId.get(passage.basis.triggers[0]?.id ?? '');
        if (!fact)
            continue;
        contacts.push({
            kind: 'contact', body: passage.key.body, natal: passage.key.natal, quality: passage.key.quality, level: passage.level,
            timing: fact.aspect?.phase === 'applying' ? 'building' : fact.aspect?.phase === 'separating' ? 'fading' : 'peak',
            factId: fact.id, group: fact.independenceGroup, area: AREA_OF_NATAL[passage.key.natal],
            poles: effectPoles(fact),
            said: CONTACT_CLAUSE[passage.key.body][passage.key.natal][passage.key.quality].says.filter((say) => primaryPoles(fact).includes(say)),
            touches: CONTACT_CLAUSE[passage.key.body][passage.key.natal][passage.key.quality].says.filter((say) => effectPoles(fact).includes(say)),
            feelings: [...fact.emotions.rising, ...fact.emotions.quieter], basis: passage.basis,
        });
    }
    const relation = contacts.length === 2 ? relate(contacts[0], contacts[1]) : null;
    /* THE MOON'S SETTING IS SAID ONLY WHERE IT BELONGS TO THE STORY.
       The phase, the sign's element and the house are true of every day. A line about them earns its place by sharing
       a pole with what the day is about (a clearing Moon on a day for finishing), and otherwise is said only when
       there is nothing else to say about the sky. */
    const wanted = storyPoles(theme, advice);
    const rows = (key) => (key.type === 'phase' ? MOON_PHASE_ROWS[key.kind].effects
        : key.type === 'house' ? MOON_HOUSE_ROWS[key.house].effects
            : MOON_ELEMENT_ROWS[key.element].effects).map((effect) => effect.pole);
    const ranked = settingKeys.map((entry) => ({ entry, share: rows(entry.key).find((pole) => wanted.has(pole)) ?? null }));
    const order = (key) => (key.type === 'house' ? 0 : key.type === 'element' ? 1 : 2);
    const relevant = ranked.filter((item) => item.share !== null).sort((l, r) => order(l.entry.key) - order(r.entry.key))[0];
    const fallback = contacts.length === 0
        ? [...ranked].sort((l, r) => order(l.entry.key) - order(r.entry.key))[0]
        : undefined;
    const pick = relevant ?? fallback;
    const setting = pick
        ? { kind: 'setting', key: pick.entry.key, shares: pick.share, basis: pick.entry.basis }
        : null;
    return { contacts, relation, setting };
}
const refIds = (basis) => [...basis.triggers, ...basis.background].map((ref) => ref.id);
/**
 * THE FRICTION IS NAMED ONLY WHERE THE SKY PARAGRAPH HAS EXPLAINED IT. A caution that blames "differing preferences" or "touchy
 * moods" must point at a hard contact the reader has just been told about; one that came from a contact the paragraph left out
 * would be a claim without a visible reason, so it is said without the noun.
 */
const edgeBodyOf = (sky) => sky.contacts.find((contact) => contact.quality === 'hard')?.body ?? null;
function propositionsOf(story, advice, forecast, interpretation) {
    const out = [];
    const add = (id, kind, section, basis, poles = []) => {
        out.push({ id, kind, section, facts: refIds(basis), groups: basis.groups, poles, basis });
    };
    const { theme, sky } = story;
    add('theme', theme.tension ? 'tension' : 'reinforcement', 'headline', advice.glance.basis, [...theme.anchors, ...theme.stances]);
    if (theme.kind === 'lead' && theme.topics.length > 0)
        add('opening', 'reinforcement', 'opening', advice.glance.basis, theme.anchors);
    sky.contacts.forEach((contact, index) => add(`sky:contact:${index}`, 'reinforcement', 'sky', contact.basis, contact.poles));
    if (sky.relation) {
        const bases = sky.contacts.map((contact) => contact.basis);
        add(`sky:relation:${sky.relation.type}`, sky.relation.type === 'reinforce' ? 'reinforcement' : sky.relation.type === 'contrast' || sky.relation.type === 'compound' ? 'tension' : 'qualification', 'sky', { triggers: bases.flatMap((basis) => basis.triggers), background: [], tension: null, groups: unique(bases.flatMap((basis) => basis.groups)).sort(), convergence: 'same-pillar' });
    }
    if (sky.setting)
        add('sky:setting', 'setting', 'sky', sky.setting.basis, sky.setting.shares ? [sky.setting.shares] : []);
    if (interpretation.agreement)
        add('sky:agreement', interpretation.agreement.state === 'agree' ? 'reinforcement' : 'tension', 'sky', interpretation.agreement.basis, [interpretation.agreement.pole]);
    advice.easier.forEach((item, index) => add(`easier:${index}`, item.type === 'way-through' ? 'tradeoff' : 'reinforcement', 'easier', item.basis, item.type === 'pole' ? [item.pole] : []));
    advice.care.forEach((item, index) => add(`care:${index}`, item.type === 'tension' || item.type === 'rely' ? 'tension' : 'qualification', 'care', item.basis));
    if (advice.emotionalClimate)
        add('climate', 'reinforcement', 'climate', advice.emotionalClimate.basis);
    advice.goodUse.forEach((item) => add(`goodUse:${item.activity}`, 'reinforcement', 'goodUse', item.basis));
    if (advice.move)
        add('move', 'reinforcement', 'move', advice.move.basis);
    if (advice.glance.background) {
        const fact = forecast.facts.facts.find((candidate) => candidate.id === advice.glance.background.factId);
        if (fact) {
            const ref = { id: fact.id, pillar: fact.pillar, mechanism: fact.mechanism, role: fact.role, independenceGroup: fact.independenceGroup, label: fact.label, confidence: fact.reliability };
            add('stretch', 'background', 'stretch', { triggers: [], background: [ref], tension: null, groups: [fact.independenceGroup], convergence: 'single-source' });
        }
    }
    return out;
}
const factRef = (fact) => ({
    id: fact.id, pillar: fact.pillar, mechanism: fact.mechanism, role: fact.role, independenceGroup: fact.independenceGroup, label: fact.label, confidence: fact.reliability,
});
/** The pole of the day's number that the reading is built around: the one the headline's activities are built on, else the first it presses. */
function numberPoleFor(primary, theme) {
    const wanted = new Set(theme.topics.flatMap((activity) => needsOf(activity)));
    return primary.find((pole) => wanted.has(pole)) ?? primary[0] ?? null;
}
function pillarsOf(forecast, interpretation, theme, sky) {
    if (!interpretation.numbers)
        return null;
    const day = forecast.facts.facts.find((fact) => fact.mechanism === 'personal-day');
    const dayNumber = day ? Number(day.provenance.number) : NaN;
    if (!day || !Number.isInteger(dayNumber))
        return null;
    const primary = day.effects.filter((effect) => effect.weight === 'primary').map((effect) => effect.pole);
    if (primary.length === 0)
        return null;
    const easy = sky.contacts.filter((contact) => contact.quality !== 'hard');
    /* What the reader can see the sky say: a pole the contact presses on in the engine's table but the sentence never mentions is not a reason. */
    const basisWith = (contact) => {
        const triggers = [factRef(day), ...(contact ? contact.basis.triggers : [])];
        const groups = [...new Set(triggers.map((ref) => ref.independenceGroup))].sort();
        return { triggers, background: [], tension: null, groups, convergence: contact ? 'cross-pillar' : 'single-source' };
    };
    const none = { numberTopic: null, skyTopic: null, skyQuality: null, settingShares: false };
    const settingPole = sky.setting?.shares ?? null;
    /* The leans the headline itself rests on: the poles of its activities, of what the day leads on, and of what it leans on when no activity leads. */
    const wanted = new Set([...theme.anchors, ...theme.stances, ...theme.topics.flatMap((activity) => needsOf(activity))]);
    const onTheme = primary.filter((pole) => wanted.has(pole));
    for (const pole of onTheme) {
        const support = easy.find((contact) => contact.said.includes(pole));
        if (support)
            return { relation: 'agree', pole, ...none, skyQuality: support.quality, dayNumber, contactId: support.factId, skyArea: support.area, basis: basisWith(support) };
    }
    for (const pole of onTheme) {
        const against = easy.find((contact) => contact.said.includes(OPPOSITE_POLE[pole]));
        if (against)
            return { relation: 'differ', pole, ...none, skyQuality: against.quality, dayNumber, contactId: against.factId, skyArea: against.area, basis: basisWith(against) };
    }
    /* A tense contact that pushes the other way is still a sky that leans against the number: it is said as a push, not as a favour. */
    for (const pole of onTheme) {
        const against = sky.contacts.find((contact) => contact.quality === 'hard' && contact.said.includes(OPPOSITE_POLE[pole]));
        if (against)
            return { relation: 'differ', pole, ...none, skyQuality: 'hard', dayNumber, contactId: against.factId, skyArea: against.area, basis: basisWith(against) };
    }
    /* A headline with two themes that the two pillars account for one each. */
    if (theme.topics.length >= 2) {
        for (const numberTopic of theme.topics) {
            const pole = primary.find((candidate) => needsOf(numberTopic).includes(candidate));
            if (!pole)
                continue;
            for (const skyTopic of theme.topics) {
                if (skyTopic === numberTopic)
                    continue;
                const contact = easy.find((candidate) => candidate.said.some((p) => needsOf(skyTopic).includes(p) && !needsOf(numberTopic).includes(p)));
                if (contact)
                    return { relation: 'complement', pole, numberTopic, skyTopic, skyQuality: contact.quality, settingShares: false, dayNumber, contactId: contact.factId, skyArea: contact.area, basis: basisWith(contact) };
            }
        }
    }
    /* P1.6.2: an easy contact whose sentence says the pole at a SECONDARY weight is a partial, real overlap - not "about other things". */
    for (const pole of onTheme) {
        const partial = easy.find((contact) => contact.touches.includes(pole));
        if (partial)
            return { relation: 'overlap', pole, ...none, skyQuality: partial.quality, dayNumber, contactId: partial.factId, skyArea: partial.area, basis: basisWith(partial) };
    }
    const pole = numberPoleFor(primary, theme);
    const shared = onTheme.length > 0;
    /* Every contact comes with friction: the number's lean is real, and the sky says what to mind beside it. */
    const hardOnly = sky.contacts.length > 0 && easy.length === 0 ? sky.contacts[0] : null;
    if (hardOnly)
        return { relation: shared ? 'tempered' : 'friction', pole: onTheme[0] ?? pole, ...none, skyQuality: 'hard', dayNumber, contactId: hardOnly.factId, skyArea: frictionAreaOf(hardOnly), basis: basisWith(hardOnly) };
    if (sky.contacts.length === 0)
        return { relation: shared ? 'numbers-only' : 'separate', pole: onTheme[0] ?? pole, ...none, settingShares: shared && settingPole === onTheme[0], dayNumber, contactId: null, skyArea: null, basis: basisWith(undefined) };
    const lead = sky.contacts[0];
    /* The headline's lean is the number's, and nothing the sky says touches it either way: the day rests on the number. */
    const touched = (candidate) => settingPole === candidate || settingPole === OPPOSITE_POLE[candidate]
        || sky.contacts.some((contact) => contact.touches.includes(candidate) || contact.touches.includes(OPPOSITE_POLE[candidate]));
    if (shared && !touched(onTheme[0]))
        return { relation: 'number-led', pole: onTheme[0], ...none, skyQuality: lead.quality, dayNumber, contactId: lead.factId, skyArea: lead.area, basis: basisWith(lead) };
    return { relation: 'separate', pole, ...none, skyQuality: lead.quality, dayNumber, contactId: lead.factId, skyArea: lead.area, basis: basisWith(lead) };
}
function contactIndexOf(forecast) {
    const index = new Map();
    for (const fact of forecast.facts.facts) {
        if (fact.role !== 'trigger' || (fact.mechanism !== 'moon-transit-aspect' && fact.mechanism !== 'fast-transit-aspect'))
            continue;
        index.set(fact.id, {
            factId: fact.id, body: String(fact.provenance.transitingBody), natal: String(fact.provenance.natalBody),
            quality: String(fact.provenance.quality),
        });
    }
    return index;
}
/** The activities the opening's number-and-sky sentence already explains: the sentence says a pole, and the pole is what makes the activity a lead. */
function statedTopics(pillars, topics, advice) {
    const out = new Set();
    /* The longer stretch, where the reading says it also favours a pole, states that pole for every activity built on it. */
    const background = advice.glance.background;
    if (background?.relation === 'reinforces' && background.pole)
        for (const topic of topics)
            if (needsOf(topic).includes(background.pole))
                out.add(topic);
    if (!pillars)
        return out;
    if (!pillarSentence(pillars, false))
        return out;
    if (pillars.relation === 'complement') {
        if (pillars.numberTopic)
            out.add(pillars.numberTopic);
        if (pillars.skyTopic)
            out.add(pillars.skyTopic);
        return out;
    }
    if (['agree', 'overlap', 'differ', 'tempered', 'number-led', 'numbers-only'].includes(pillars.relation)) {
        /* "An open, curious mind" and "keeping your options open" are one lean (dayStoryVoice.ts, sameLean). */
        for (const topic of topics)
            if (needsOf(topic).some((need) => sameLean(need, pillars.pole)))
                out.add(topic);
    }
    return out;
}
export function buildDayStory(forecast, advice, interpretation, promoted = []) {
    const theme = themeOf(advice, interpretation);
    const sky = skyOf(forecast, advice, interpretation, theme);
    const edgeBody = edgeBodyOf(sky);
    const pillars = pillarsOf(forecast, interpretation, theme, sky);
    const support = theme.kind === 'lead' ? topicSupportOf(forecast, interpretation, theme.topics, statedTopics(pillars, theme.topics, advice)) : [];
    const propositions = propositionsOf({ theme, sky }, advice, forecast, interpretation);
    for (const entry of support) {
        /* The headline's own reason: the facts the plan stood the lead on, kept as a proposition so "why is it the headline" is answered by identifiers. */
        const basis = { triggers: entry.drivers.slice(0, 3), background: [], tension: null, groups: [...new Set(entry.drivers.slice(0, 3).map((ref) => ref.independenceGroup))].sort(), convergence: 'single-source' };
        if (entry.from && entry.drivers.length > 0)
            propositions.push({ id: `because:${entry.topic}`, kind: 'reinforcement', section: 'opening', facts: entry.drivers.slice(0, 3).map((ref) => ref.id), groups: basis.groups, poles: [entry.from], basis });
    }
    if (pillars) {
        propositions.push({
            id: `pillars:${pillars.relation}`,
            kind: pillars.relation === 'agree' ? 'reinforcement' : pillars.relation === 'overlap' ? 'qualification' : pillars.relation === 'differ' ? 'tension' : pillars.relation === 'separate' || pillars.relation === 'complement' || pillars.relation === 'tempered' || pillars.relation === 'friction' || pillars.relation === 'number-led' ? 'qualification' : 'insufficient',
            section: 'opening', facts: refIds(pillars.basis), groups: pillars.basis.groups, poles: [pillars.pole], basis: pillars.basis,
        });
    }
    const headline = headlineOf(theme.topics, new Set(support.filter((entry) => entry.status === 'thin').map((entry) => entry.topic)), advice.move?.kind.startsWith('activity:') ? advice.move.kind.slice('activity:'.length) : null);
    /* P1.6.4: the practical sections are written in the context of the day the TITLE names. A theme the title left out (a thin one, narrowed) must not choose the family: "A day for connection" was followed by advice to keep ideas open. */
    const family = (headline.main ? FAMILY_OF_ACTIVITY[headline.main] : undefined) ?? theme.families[0] ?? (theme.stances.includes('inward') || theme.stances.includes('unhurried') ? 'quiet' : null);
    return { theme, support, promoted, headline, pillars, contactIndex: contactIndexOf(forecast), sky, family, edgeBody, propositions };
}
