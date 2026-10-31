import { buildProposition, relation, sealPillarIntent, section, slug, withheldNotice } from '../contract/adapterKit.js?v=2ea79e9';
export const FORECAST_KINDS = { year: 'forecast-year', month: 'forecast-month', day: 'forecast-day' };
export const FORECAST_CONTENT_VERSION = 1;
const ROOT = 'system:forecast/period';
const ROOT_TIME = 'system:forecast/birth-time';
const FORBIDDEN = ['assumption-as-fact', 'diagnosis', 'domain-transfer', 'event-prediction'];
const WITHHELD_ALWAYS = [
    { key: 'event-prediction', reason: 'a favourable or demanding period is a climate, never a predicted event, outcome, meeting or decision' },
    { key: 'population-share', reason: 'no share of people, rarity or norm' },
    { key: 'biography', reason: 'no event, job, body, age or relationship is stated about the reader' },
    { key: 'birth-data', reason: 'the age a cycle starts at, the exact times of a solar term and the degrees of a transit are birth-derived and are not carried' },
];
const kit = () => ({ pillar: 'forecast', root: ROOT, planSource: 'forecast.period-plan', modelSource: 'forecast.temporal-synthesis', forbidden: FORBIDDEN, group: 'forecast:period' });
/** The facts of an influence a brief may name, as tokens; nothing birth-derived. */
function factSlots(fact) {
    const p = fact.provenance;
    const out = {};
    const token = (key, value) => { if (typeof value === 'string' && value.length > 0)
        out[key] = slug(value); };
    token('stem', p.stem);
    token('branch', p.branch);
    token('tenGodCategory', p.tenGodCategory);
    token('transitingBody', p.transitingBody);
    token('aspect', p.aspect);
    token('natalBody', p.natalBody);
    token('harmonic', p.harmonic);
    token('sign', p.sign);
    token('element', p.element);
    token('phase', p.phase);
    if (typeof p.number === 'number' || typeof p.number === 'string')
        out.number = Number(p.number);
    return out;
}
const isTransit = (fact) => fact.sourceEntity.startsWith('transit-');
/** The one contact an approximate birth time can move (see forecastNarrative.ts `movesWithTheClock`). */
const isMoonTransit = (fact) => isTransit(fact) && fact.provenance.natalBody === 'Moon';
function influenceSpec(inf, index, estimated, approximate) {
    const f = inf.fact;
    const conditional = (estimated && isTransit(f)) || (approximate && isMoonTransit(f));
    const condition = estimated ? 'birth-time-estimated' : 'birth-time-approximate';
    return {
        id: `inf-${index}`, frame: `forecast.influence.${inf.scale}`, role: inf.side === 'pull' ? 'tension' : 'support', rank: index === 0 ? 1 : 2,
        status: 'tradition-convention', modality: 'assert', path: `plan.influences.${index}`, meaningKey: `forecast.influence:${f.id}`,
        conditions: conditional ? [condition] : [], ...(conditional ? { roots: [ROOT, ROOT_TIME] } : {}),
        slots: {
            factId: f.id, system: f.system, entity: slug(f.sourceEntity), scale: inf.scale, strength: f.strength, sharePercent: inf.sharePercent, stretches: inf.stretches, side: inf.side, ...factSlots(f),
        },
    };
}
function tensionSpec(t, index) {
    return {
        id: `tension-${index}`, frame: `forecast.tension.${t.kind}`, role: 'tension', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: `plan.tensions.${index}`, meaningKey: `forecast.tension:${t.axis}`,
        slots: {
            kind: t.kind, axis: t.axis, with: t.withDimension, against: t.againstDimension, withIds: [...t.withIds], againstIds: [...t.againstIds], natalFactIds: [...t.natalFactIds],
            balance: t.balance, touchesLead: t.touchesLead, inSummary: t.inSummary,
        },
    };
}
/** The intent of one forecast reading (a Year, a Month or a Day) from its period plan. */
export function buildForecastReadingIntent(plan, context) {
    const config = kit();
    const estimated = plan.estimatedTime;
    const approximate = plan.approximateTime && !estimated;
    const propositions = [];
    const make = (spec) => { propositions.push(buildProposition(spec, config)); };
    const leadTransit = plan.lead ? plan.lead.factIds.some((id) => id.startsWith('astrology:transit:')) : false;
    const leadMoonTransit = plan.lead ? plan.lead.factIds.some((id) => id.startsWith('astrology:transit:') && id.endsWith('-natal-moon')) : false;
    if (estimated) {
        make({
            id: 'time', frame: 'forecast.birth-time', role: 'caveat', rank: 1, status: 'structural-observation', modality: 'tendency', path: 'plan.estimatedTime', roots: [ROOT_TIME],
            conditions: ['birth-time-estimated'], meaningKey: 'forecast.birth-time:estimated', slots: { estimated: true },
        });
    }
    else if (approximate) {
        make({
            id: 'time', frame: 'forecast.birth-time', role: 'caveat', rank: 1, status: 'structural-observation', modality: 'tendency', path: 'plan.approximateTime', roots: [ROOT_TIME],
            conditions: ['birth-time-approximate'], meaningKey: 'forecast.birth-time:approximate', slots: { approximate: true, affects: 'contacts-to-the-natal-moon' },
        });
    }
    if (plan.lead) {
        make({
            id: 'lead', frame: `forecast.lead.${plan.level}`, role: 'thesis', rank: 1, status: 'tradition-convention', modality: 'assert', path: 'plan.lead', meaningKey: `forecast.lead:${plan.lead.dimension}`,
            conditions: estimated && leadTransit ? ['birth-time-estimated'] : approximate && leadMoonTransit ? ['birth-time-approximate'] : [], ...((estimated && leadTransit) || (approximate && leadMoonTransit) ? { roots: [ROOT, ROOT_TIME] } : {}),
            slots: { level: plan.level, dimension: plan.lead.dimension, dimensions: [...plan.lead.dimensions], shared: plan.lead.shared, factIds: [...plan.lead.factIds] },
        });
    }
    plan.influences.forEach((inf, index) => make(influenceSpec(inf, index, estimated, approximate)));
    plan.tensions.forEach((t, index) => make(tensionSpec(t, index)));
    if (plan.vsYear && plan.lead) {
        make({ id: 'vs-year', frame: 'forecast.vs-year', role: 'context', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.vsYear', meaningKey: `forecast.vs-year:${plan.vsYear}`, slots: { relation: plan.vsYear } });
    }
    if (plan.bridge) {
        make({
            id: 'bridge', frame: 'forecast.bridge', role: 'context', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.bridge', meaningKey: `forecast.bridge:${plan.bridge.relation}`,
            slots: { relation: plan.bridge.relation, dayNumber: Number(plan.bridge.dayNumber), factIds: [...plan.bridge.factIds] },
        });
    }
    if (plan.guidanceDimension) {
        make({
            id: 'guidance', frame: `forecast.guidance.${plan.level}`, role: 'practice', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.guidanceDimension',
            meaningKey: `forecast.guidance.${plan.level}:${plan.guidanceDimension}`, practical: { intent: 'attend-to-it', licensedBy: ['lead'] }, slots: { dimension: plan.guidanceDimension, level: plan.level },
        });
    }
    /* a period with nothing readable says so; it is a reading too */
    if (!plan.lead && plan.influences.length === 0)
        propositions.push(withheldNotice(config, 'nothing-readable', 'forecast.nothing-readable', 'no influence of the period has an authored reading', 'plan'));
    const ids = new Set(propositions.map((p) => p.id));
    const tensionIds = plan.tensions.map((_, i) => `tension-${i}`);
    const relations = ids.has('lead') ? tensionIds.map((id, i) => relation(`rel-${id}`, id, 'lead', 'friction', plan.tensions[i].kind, 'forecast', i === 0 ? 'defining' : 'notable')) : [];
    const rel = relations.map((r) => r.id);
    const support = plan.influences.map((inf, i) => (inf.side === 'pull' ? null : `inf-${i}`)).filter((x) => x !== null);
    const pulls = plan.influences.map((inf, i) => (inf.side === 'pull' ? `inf-${i}` : null)).filter((x) => x !== null);
    const sections = [
        section(ids, 'forecast-climate', 'ground', ['time', 'lead', 'vs-year', 'nothing-readable'], [], [1, 3]),
        section(ids, 'forecast-support', 'develop', support, ['lead'], [1, 6]),
        section(ids, 'forecast-friction', 'tension', [...pulls, ...tensionIds], ['lead'], [1, 5], rel),
        section(ids, 'forecast-practical', 'practice', ['guidance'], ['lead'], [1, 2]),
        section(ids, 'forecast-watch', 'limit', ['bridge'], ['lead'], [1, 2]),
    ].filter((s) => s !== null);
    const withheld = [
        ...WITHHELD_ALWAYS,
        ...(context.coverage?.withheld ?? []).map((w) => ({ key: w.code, reason: w.what })),
        ...(context.coverage?.missing ?? []).map((m) => ({ key: `missing:${m.system}`, reason: `${m.system} could not contribute to the period` })),
    ];
    return sealPillarIntent({
        pillar: 'forecast', kind: FORECAST_KINDS[plan.level], engine: 'forecast-period', contentVersion: FORECAST_CONTENT_VERSION, deck: 'knowledge:forecast',
        propositions, relations, sections,
        takeaway: ids.has('guidance')
            ? { act: 'attend-to-it', target: 'guidance', relationTargets: [], grounding: 'place', relationMode: null, relationTarget: null, groundedIn: rel, constraints: [...FORBIDDEN].sort(), legacy: null }
            : { act: 'none', target: null, relationTargets: [], grounding: 'none', relationMode: null, relationTarget: null, groundedIn: [], constraints: [], legacy: null },
        primary: ids.has('lead') ? ['lead'] : [], central: rel[0] ?? null,
        uncertainties: estimated ? ['birth-time-estimated'] : approximate ? ['birth-time-approximate'] : [], withheld, forbidden: FORBIDDEN,
        extension: { level: plan.level, period: { label: context.periodLabel }, narrativeSections: sections.map((s) => s.id), claims: propositions.map((p) => p.id), source: { plan: 'temporal-synthesis/forecastNarrative.PeriodPlan', meanings: 'temporal-synthesis/temporalSemantics + i18n fc.*' } },
    });
}
