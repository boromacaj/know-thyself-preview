import { buildProposition, noTakeaway, relation, sealPillarIntent, section, slug } from '../contract/adapterKit.js?v=2ea79e9';
/**
 * THE WESTERN ASTROLOGY ADAPTER: THE PILLAR'S OWN NARRATIVE PLAN, AS A READING INTENT.
 *
 * Astrology's pipeline is calculation -> `AstrologyInterpretation` -> `AstrologyNarrativePlan` -> voice. The plan decides the chart's strongest integrated signature (a concentration in
 * a sign, a knot of tight aspects around one body, a temperament, a polarity, or the Sun alone), what drives and what settles, what shows first (absent without a birth time), the
 * mind, the closeness, the strongest real tension, and what the pattern costs and what helps; and "each thing is said once": an aspect is claimed by the first section that reads it.
 * This adapter reads that plan. It reads no voice and no finished sentence.
 *
 * Astrology's uncertainty is the most granular of the natal pillars and is typed on the facts themselves: every placement carries a `TimeState` (known / approximate / boundary /
 * withheld) and the planets whose sign an uncertain time does not fix carry the signs and the minutes they hold for. The adapter carries the signs and the NUMBER of spans, never the
 * clock times of the window (they are derived from the birth time and are birth data, which a brief does not carry). A claim that rests on a state other than `known`, or on a body
 * that changes sign inside the window, is conditional on the time; the claim that needs the angles (what shows first) is absent without a time, as in the pillar's own reading.
 *
 * Nothing of Human Design, BaZi or Numerology appears here. Astrology has no per-claim evidence level, so the wording follows the contract: a placement's meaning in the tradition is
 * asserted as the tradition's, the tension and the cost are symbolic readings at most tentative.
 */
export const ASTROLOGY_KIND = 'astrology-natal';
export const ASTROLOGY_CONTENT_VERSION = 1;
const ROOT = 'system:astrology/chart';
const ROOT_TIME = 'system:astrology/birth-time';
const FORBIDDEN = ['assumption-as-fact', 'diagnosis', 'domain-transfer', 'event-prediction'];
const WITHHELD = [
    { key: 'population-share', reason: 'no share of people, rarity or norm' },
    { key: 'biography', reason: 'no event, job, body, age or relationship is stated about the reader' },
    { key: 'other-person', reason: 'no outcome of a relationship and no other person\'s reaction' },
    { key: 'generational-aspects', reason: 'an aspect whose both ends are generational is shared by everyone born within years and is not read as personal' },
    { key: 'clock-times', reason: 'the clock times of the birth-time window are birth data and are not carried' },
];
const kit = (extra) => ({ pillar: 'astrology', root: ROOT, planSource: 'astrology.narrative-plan', modelSource: 'astrology.interpretation', forbidden: FORBIDDEN, extraCondition: extra, group: 'astrology:chart' });
const aspectIds = (list) => list.map((a) => a.id);
const aspect = (a) => (a ? `${a.id}:${a.tightness}` : null);
const note = (n) => (n ? `${slug(n.body)}:${slug(n.sign)}:${n.state}:${n.dignity ? slug(n.dignity) : 'none'}:${n.inPattern ? 'pattern' : 'own'}` : null);
/** True when a claim rests on a fact the birth time does not settle. */
const uncertainState = (state) => state !== 'known';
function patternSlots(p) {
    switch (p.kind) {
        case 'concentration':
            return { kind: p.kind, sign: slug(p.sign), planets: p.planets.map(slug), strength: p.strength, element: p.element, modality: p.modality, withSun: p.withSun.map(slug), withSunAspects: aspectIds(p.withSunAspects), outside: p.outside ? `${slug(p.outside.body)}:${p.outside.kind}:${p.outside.members.map(slug).join('+')}` : null, house: p.house };
        case 'knot':
            return { kind: p.kind, center: slug(p.center), links: aspectIds(p.links), internal: aspectIds(p.internal), sharedModality: p.sharedModality ? slug(p.sharedModality) : null };
        case 'temperament':
            return { kind: p.kind, element: p.element ? slug(p.element) : null, modality: p.modality ? slug(p.modality) : null };
        case 'polarity':
            return { kind: p.kind, mass: p.mass.map(slug), outlier: typeof p.outlier === 'string' ? slug(p.outlier) : JSON.stringify(p.outlier).replace(/[^A-Za-z0-9:_.-]+/g, '-').replace(/^-+|-+$/g, '') };
        case 'luminary':
            return { kind: p.kind, sign: slug(p.sign), signs: [...new Set(p.spans.map((s) => slug(s.value)))], spanCount: p.spans.length };
    }
}
function specs(plan) {
    const out = [];
    const add = (spec, uncertain = false) => { out.push({ spec, uncertain }); };
    const t = plan.time;
    if (t) {
        add({
            id: 'time', frame: 'astrology.birth-time', role: 'caveat', rank: 1, status: 'structural-observation', modality: 'tendency', path: 'plan.time', roots: [ROOT_TIME],
            conditions: [t.precision === 'unknown' ? 'birth-time-unknown' : 'birth-time-approximate'], meaningKey: `astrology.birth-time:${t.precision}`,
            slots: { precision: t.precision, windowMinutes: t.windowMinutes, rising: t.rising ? slug(t.rising.sign) : null, risingState: t.rising?.state ?? null, boundary: t.boundary.map((b) => `${slug(b.body)}:${new Set(b.spans.map((s) => s.value)).size}`), moonHolds: t.moonHolds },
        });
    }
    const p = plan.pattern;
    const patternKey = p.kind === 'concentration' ? `knowledge:western-astrology:sign:${slug(p.sign)}:base-archetype` : p.kind === 'luminary' ? `knowledge:western-astrology:planet:sun-${slug(p.sign)}:natal-placement` : p.kind === 'temperament' && p.element ? `knowledge:western-astrology:element:${slug(p.element)}:base-archetype` : `astrology.pattern:${p.kind}`;
    add({ id: 'pattern', frame: `astrology.pattern.${p.kind}`, role: 'thesis', rank: 1, status: 'tradition-convention', modality: 'assert', path: 'plan.pattern', meaningKey: patternKey, slots: patternSlots(p) }, p.kind === 'luminary' && p.spans.length > 1);
    const d = plan.drive;
    add({
        id: 'drive', frame: 'astrology.drive', role: 'thesis', rank: 1, status: 'tradition-convention', modality: 'assert', path: 'plan.drive', meaningKey: `knowledge:western-astrology:planet:sun-${slug(d.sun)}:natal-placement`,
        slots: {
            sun: slug(d.sun), sunSigns: d.sunSigns.map(slug), moon: slug(d.moon), moonSigns: d.moonSigns.map(slug), relation: d.relation, sameModality: d.sameModality, aspect: aspect(d.aspect), joined: d.joined.map(slug),
            moonDignity: d.moonDignity ? slug(d.moonDignity) : null, developedBelow: d.developedBelow, sunHouse: d.sunHouse, moonHouse: d.moonHouse, sunSplitTold: d.sunSplitTold,
        },
    }, d.sunSigns.length > 1 || d.moonSigns.length > 1);
    const m = plan.meet;
    if (m) {
        add({
            id: 'meet', frame: 'astrology.meet', role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.meet', meaningKey: `knowledge:western-astrology:sign:${slug(m.rising)}:base-archetype`,
            slots: {
                state: m.state, rising: slug(m.rising), affinity: m.affinity, sameSignAs: m.sameSignAs, spanCount: m.spans.length,
                ruler: m.ruler ? `${slug(m.ruler.body)}:${slug(m.ruler.sign)}:${m.ruler.house ?? 'none'}:${m.ruler.angle ?? 'none'}:${m.ruler.inRisingSign ? 'rising' : 'elsewhere'}:${m.ruler.inPatternSign ? 'pattern' : 'own'}` : null,
                luminaryOnAngle: m.luminaryOnAngle ? `${slug(m.luminaryOnAngle.body)}:${slug(m.luminaryOnAngle.angle)}` : null,
            },
        }, uncertainState(m.state));
    }
    const n = plan.mind;
    if (n) {
        add({
            id: 'mind', frame: 'astrology.mind', role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.mind', meaningKey: n.mercury ? `knowledge:western-astrology:planet:mercury-${slug(n.mercury.sign)}:natal-placement` : `knowledge:western-astrology:planet:mars-${slug(n.mars?.sign ?? 'aries')}:natal-placement`,
            slots: { mercury: note(n.mercury), mars: note(n.mars), mercuryAspect: aspect(n.mercury?.aspect ?? null), marsAspect: aspect(n.mars?.aspect ?? null) },
        }, [n.mercury, n.mars].some((x) => x && (uncertainState(x.state) || x.spans.length > 1)));
    }
    const r = plan.relate;
    add({
        id: 'relate', frame: 'astrology.relate', role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.relate', meaningKey: `knowledge:western-astrology:planet:venus-${slug(r.venus.sign)}:natal-placement`,
        slots: { venus: note(r.venus), venusAspect: aspect(r.venus.aspect), moon: slug(r.moon.sign), moonSigns: r.moon.signs.map(slug), moonState: r.moon.state, relation: r.relation },
    }, uncertainState(r.venus.state) || uncertainState(r.moon.state) || r.venus.spans.length > 1 || r.moon.signs.length > 1);
    if (plan.tension) {
        const items = plan.tension.tensions.map((x) => tensionToken(x));
        add({ id: 'tension', frame: 'astrology.tension', role: 'tension', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.tension', meaningKey: 'astrology.tension', slots: { items, count: items.length } });
    }
    const h = plan.helps;
    add({
        id: 'helps', frame: 'astrology.helps', role: 'practice', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.helps', meaningKey: `astrology.helps:${h.patternKind}`,
        practical: { intent: 'attend-to-it', licensedBy: ['pattern', 'drive'] },
        slots: { patternKind: h.patternKind, overuse: h.overuse.map(overuseToken), practice: h.practice.map(overuseToken), support: aspect(h.support) },
    }, h.overuse.some((o) => o.source === 'sun-both'));
    return out;
}
function tensionToken(t) {
    switch (t.type) {
        case 'luminaries': return `luminaries:${slug(t.sun)}:${slug(t.moon)}:${aspect(t.aspect) ?? 'none'}:${t.moonAlone ? 'moon-alone' : 'moon-company'}`;
        case 'surface': return `surface:${slug(t.rising)}:${slug(t.sun)}:${slug(t.moon)}`;
        case 'aspect': return `aspect:${t.aspect.id}:${t.aspect.tightness}`;
        case 'pace': return `pace:${slug(t.lead)}:${slug(t.luminaries)}`;
    }
}
function overuseToken(o) {
    switch (o.source) {
        case 'sign':
        case 'moon': return `${o.source}:${slug(o.sign)}`;
        case 'knot': return `knot:${slug(o.center)}:${o.others.map(slug).join('+')}`;
        case 'sun-both': return `sun-both:${new Set(o.spans.map((s) => s.value)).size}`;
        case 'element': return `element:${slug(o.element)}`;
        case 'modality': return `modality:${slug(o.modality)}`;
    }
}
/** The intent of a composed Western Astrology narrative. */
export function buildAstrologyReadingIntent(narrative) {
    const plan = narrative.plan;
    const precision = plan.time ? plan.time.precision : 'exact';
    const condition = precision === 'unknown' ? 'birth-time-unknown' : precision === 'approximate' ? 'birth-time-approximate' : null;
    const propositions = specs(plan).map(({ spec, uncertain }) => buildProposition(uncertain && condition && spec.roots === undefined ? { ...spec, conditions: [...(spec.conditions ?? []), condition] } : spec, kit(null)));
    const ids = new Set(propositions.map((p) => p.id));
    const relations = ids.has('tension') ? [relation('rel-tension', 'tension', 'drive', 'friction', 'tension', 'astrology', 'defining')] : [];
    const rel = relations.map((r) => r.id);
    const sections = [
        section(ids, 'astro-pattern', 'ground', ['time', 'pattern'], [], [3, 7]),
        section(ids, 'astro-drive', 'develop', ['drive'], ['pattern'], [3, 6]),
        section(ids, 'astro-meet', 'develop', ['meet'], ['pattern', 'drive'], [2, 5]),
        section(ids, 'astro-mind', 'develop', ['mind'], ['pattern', 'drive'], [2, 5]),
        section(ids, 'astro-relate', 'develop', ['relate'], ['pattern', 'drive'], [2, 5]),
        section(ids, 'astro-pull', 'tension', ['tension'], ['drive'], [2, 6], rel),
        section(ids, 'astro-helps', 'practice', ['helps'], ['pattern'], [2, 5]),
    ].filter((s) => s !== null);
    return sealPillarIntent({
        pillar: 'astrology', kind: ASTROLOGY_KIND, engine: 'astrology-narrative', contentVersion: ASTROLOGY_CONTENT_VERSION, deck: 'knowledge:western-astrology',
        propositions, relations, sections,
        takeaway: { act: 'attend-to-it', target: 'helps', relationTargets: [], grounding: 'place', relationMode: null, relationTarget: null, groundedIn: rel, constraints: [...FORBIDDEN].sort(), legacy: null },
        primary: ['pattern', 'drive'], central: rel[0] ?? null,
        uncertainties: condition ? [condition] : [], withheld: WITHHELD, forbidden: FORBIDDEN,
        extension: { state: precision, narrativeSections: sections.map((s) => s.id), claims: propositions.map((p) => p.id), source: { plan: 'pillar-reading/astrology-narrative/astrologyNarrativePlan', meanings: 'knowledge/astrology' } },
    });
}
void noTakeaway;
