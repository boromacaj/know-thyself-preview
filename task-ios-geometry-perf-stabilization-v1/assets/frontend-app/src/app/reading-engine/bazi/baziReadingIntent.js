import { buildProposition, relation, sealPillarIntent, section, slug, MODALITY_OF_EVIDENCE } from '../contract/adapterKit.js?v=d9f39e7';
/**
 * THE BAZI / TCM ADAPTER: THE PILLAR'S OWN NARRATIVE PLAN, AS A READING INTENT.
 *
 * BaZi's pipeline is calculation -> `BaziInterpretation` -> `BaziNarrativePlan` -> voice. The plan decides the Day Master's nature, how well supported it is (the Ziping
 * support-or-restrain rule), which family of the Ten Gods leads, which relations between the characters are worth telling and how far each can be leaned on (`firm` / `moderate` /
 * `tentative`, and whether it rests on the hour), what steadies the chart, what the pattern costs and what to practise. This adapter reads the plan; it reads no voice and no finished
 * sentence. The plan's own editorial cuts (what counts as "carried", "heavy" or "close") stay the plan's: they are never restated here as the tradition's.
 *
 * Human Design's terminology and rules appear nowhere in this file. What BaZi needs that Human Design did not: the unknown HOUR is a different case from an unknown time of day for
 * Human Design (the Day Master and the month are fixed by the date; only the weights of the families, and the relations that involve the hour pillar, move). So the condition is put
 * where the plan itself says the hour matters (`restsOnHour`, `partial`, the support line's `precision`) and not on the Day Master or the season, which the date settles.
 * The relation the schools dispute is already marked `tentative` by the plan and stays so.
 */
export const BAZI_KIND = 'bazi-natal';
export const BAZI_CONTENT_VERSION = 1;
const ROOT = 'system:bazi/chart';
const ROOT_HOUR = 'system:bazi/birth-hour';
const FORBIDDEN = ['assumption-as-fact', 'diagnosis', 'domain-transfer', 'event-prediction'];
/** What the plan's header says never becomes a claim, as data. */
const WITHHELD = [
    { key: 'luck-cycle-direction', reason: 'the direction of the luck cycle is refused when the body is undefined and is not read in the main reading' },
    { key: 'event', reason: 'no event is stated or predicted' },
    { key: 'relationship-job-body', reason: 'no relationship, job or body claim; TCM material is symbolic and educational and makes no health claim' },
    { key: 'population-share', reason: 'no share of people, rarity or norm' },
    { key: 'disputed-relation-as-fact', reason: 'a relation the schools dispute is tentative and never asserted' },
];
const kitConfig = (hourCondition) => ({ pillar: 'bazi', root: ROOT, planSource: 'bazi.narrative-plan', modelSource: 'bazi.interpretation', forbidden: FORBIDDEN, extraCondition: hourCondition, group: 'bazi:chart' });
const side = (s) => `${s.position.toLowerCase()}:${s.family}:${s.god ? slug(s.god) : 'none'}:${s.phase}`;
const family = (f) => `${f.family}:${f.phase}:${f.mainGod ? slug(f.mainGod) : 'none'}:${f.otherGod ? slug(f.otherGod) : 'none'}:${f.mix ?? 'none'}`;
function natureSpecs(nature, precision) {
    const out = [];
    for (const claim of nature) {
        if (claim.kind === 'time') {
            out.push({
                id: 'time', frame: 'bazi.birth-hour', role: 'caveat', rank: 1, status: 'structural-observation', modality: 'tendency', path: 'plan.nature[time]', roots: [ROOT_HOUR],
                conditions: [claim.precision === 'unknown' ? 'birth-hour-unknown' : 'birth-hour-approximate'], meaningKey: `bazi.birth-hour:${claim.precision}`,
                slots: { precision: claim.precision, characters: claim.characters, boundaryYear: claim.dateBoundary?.year ?? null, boundaryMonths: claim.dateBoundary ? [...claim.dateBoundary.months] : [], boundaryAt: claim.dateBoundary?.at ?? null },
            });
        }
        else if (claim.kind === 'nature') {
            out.push({
                id: 'nature', frame: 'bazi.nature', role: 'thesis', rank: 1, status: 'tradition-convention', modality: 'assert', path: 'plan.nature[nature]', roots: [ROOT],
                meaningKey: `knowledge:bazi:day-master:${claim.stem}:day-master-role`,
                slots: { stem: claim.stem, phase: claim.phase, polarity: slug(claim.polarity), seasonRuling: claim.season?.ruling ?? null, seasonBranch: claim.season ? slug(claim.season.monthBranch) : null, seasonState: claim.season?.state ?? null },
            });
        }
        else {
            /* the support line is the engine's own grade with a stated confidence: high is the tradition's rule applied, lower is a reading at most tendency / tentative */
            out.push({
                id: 'support', frame: 'bazi.support', role: 'thesis', rank: 1, status: claim.confidence === 'high' ? 'tradition-convention' : 'symbolic-reading',
                modality: claim.confidence === 'high' ? 'assert' : claim.confidence === 'medium' ? 'tendency' : 'tentative', path: 'plan.nature[support]',
                meaningKey: `bazi.support:${claim.band}`,
                slots: { band: claim.band, tendency: claim.tendency, confidence: claim.confidence, nearLine: claim.nearLine, phase: claim.phase, own: claim.own, companions: Math.round(claim.companions * 10) / 10, heaviestDrain: claim.heaviestDrain, precision: claim.precision, characters: claim.characters },
            });
        }
    }
    void precision;
    return out;
}
function energySpec(claim, index) {
    const id = `energy-${index}`;
    const base = { id, role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: `plan.energy[${index}]` };
    if (claim.kind === 'lead') {
        return {
            ...base, frame: 'bazi.energy.lead', meaningKey: claim.lead.mainGod ? `knowledge:bazi:ten-god:${slug(claim.lead.mainGod)}:base-archetype` : `bazi.energy:lead:${claim.lead.family}`,
            slots: { kind: 'lead', band: claim.band, lead: family(claim.lead), second: claim.second ? family(claim.second) : null, closeness: claim.closeness, secondRestsOnHour: claim.secondRestsOnHour },
        };
    }
    if (claim.kind === 'scarce') {
        return { ...base, frame: 'bazi.energy.scarce', meaningKey: `bazi.energy:scarce`, slots: { kind: 'scarce', band: claim.band, lead: claim.lead, families: claim.families.map(family), present: [...claim.present], partial: claim.partial } };
    }
    return { ...base, frame: 'bazi.energy.polarity', meaningKey: `bazi.polarity:${claim.lean}`, status: 'symbolic-reading', modality: 'tendency', slots: { kind: 'polarity', lean: claim.lean, dayMaster: slug(claim.dayMaster), restsOnHour: claim.restsOnHour } };
}
function tensionSpec(claim, index) {
    const common = { id: `tension-${index}`, role: 'tension', rank: 2, status: 'symbolic-reading', modality: MODALITY_OF_EVIDENCE[claim.evidence], path: `plan.tension[${index}]`, conditions: claim.restsOnHour ? ['birth-hour-approximate'] : [], roots: claim.restsOnHour ? [ROOT, ROOT_HOUR] : undefined };
    const tail = { evidence: claim.evidence, restsOnHour: claim.restsOnHour, also: claim.also.length };
    switch (claim.kind) {
        case 'bound': return { ...common, frame: 'bazi.tension.bound', meaningKey: 'bazi.tension:bound', slots: { kind: 'bound', partner: side(claim.partner), ...tail } };
        case 'clash': return { ...common, frame: 'bazi.tension.clash', meaningKey: claim.relation === 'branch' ? 'knowledge:bazi:branch-relation:branch-six-clash:base-archetype' : 'bazi.tension:stem-clash', slots: { kind: 'clash', relation: claim.relation, sides: claim.sides.map(side), meaning: claim.meaning, ...tail } };
        case 'binding': return { ...common, frame: 'bazi.tension.binding', meaningKey: 'bazi.tension:binding', slots: { kind: 'binding', relation: claim.relation, sides: claim.sides.map(side), meaning: claim.meaning, ...tail } };
        case 'pull': return { ...common, frame: 'bazi.tension.pull', meaningKey: 'bazi.tension:pull', slots: { kind: 'pull', controller: family(claim.controller), controlled: family(claim.controlled), margin: claim.margin, band: claim.band, ...tail } };
        case 'doubled': return { ...common, frame: 'bazi.tension.doubled', meaningKey: 'bazi.tension:doubled', slots: { kind: 'doubled', sides: claim.sides.map(side), ...tail } };
        case 'latent': return { ...common, frame: 'bazi.tension.latent', meaningKey: 'bazi.tension:latent', slots: { kind: 'latent', phase: claim.phase, family: claim.family, sides: claim.sides.map(side), ...tail } };
        case 'friction': return { ...common, frame: 'bazi.tension.friction', meaningKey: `bazi.tension:${claim.category}`, slots: { kind: 'friction', category: claim.category, sides: claim.sides.map(side), ...tail } };
    }
}
const FRICTION = new Set(['clash', 'pull', 'friction', 'doubled']);
/** The intent of a composed BaZi narrative. */
export function buildBaziReadingIntent(narrative) {
    const plan = narrative.plan;
    const time = plan.nature.find((c) => c.kind === 'time');
    const precision = time && time.kind === 'time' ? time.precision : 'exact';
    /* what rests on the weights of the characters carries the hour condition; the Day Master and the season, which the date settles, do not */
    const weights = precision === 'exact' ? null : precision === 'unknown' ? 'birth-hour-unknown' : 'birth-hour-approximate';
    const config = kitConfig(null);
    const specs = [
        ...natureSpecs(plan.nature, precision),
        ...plan.energy.map(energySpec),
        ...plan.tension.map(tensionSpec),
        {
            id: 'helps', frame: 'bazi.helps', role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.helps', meaningKey: plan.helps.primary.mainGod ? `knowledge:bazi:ten-god:${slug(plan.helps.primary.mainGod)}:base-archetype` : `bazi.helps:${plan.helps.primary.family}`,
            slots: { band: plan.helps.band, primary: family(plan.helps.primary), secondary: plan.helps.secondary ? family(plan.helps.secondary) : null, bridge: plan.helps.bridge ? plan.helps.bridge.between.join('+') : null, dayMasterPhase: plan.helps.dayMasterPhase, partial: plan.helps.partial },
        },
        { id: 'cost', frame: 'bazi.cost', role: 'tension', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.cost', meaningKey: `bazi.cost:${plan.cost.band}`, slots: { stem: plan.cost.stem, band: plan.cost.band, lead: family(plan.cost.lead), partner: plan.cost.partner, state: plan.cost.state } },
        {
            id: 'practice', frame: 'bazi.practice', role: 'practice', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.practice', meaningKey: `bazi.practice:${plan.practice.focus}`,
            practical: { intent: 'attend-to-it', licensedBy: ['helps', 'support'] }, slots: { stem: plan.practice.stem, band: plan.practice.band, helper: family(plan.practice.helper), dayMasterPhase: plan.practice.dayMasterPhase, focus: plan.practice.focus },
        },
    ];
    const WEIGHTED = new Set(['support', 'helps', 'cost', 'practice']);
    const propositions = specs.map((spec) => {
        const conditional = weights !== null && (WEIGHTED.has(spec.id) || spec.id.startsWith('energy-')) && spec.roots === undefined;
        return buildProposition(conditional ? { ...spec, conditions: [...(spec.conditions ?? []), weights] } : spec, config);
    });
    const ids = new Set(propositions.map((p) => p.id));
    const relations = [];
    plan.tension.forEach((claim, i) => {
        const target = claim.kind === 'pull' && ids.has('energy-0') ? 'energy-0' : 'nature';
        relations.push(relation(`rel-tension-${i}`, `tension-${i}`, target, FRICTION.has(claim.kind) ? 'friction' : 'accord', claim.kind, 'bazi', i === 0 ? 'defining' : 'notable'));
    });
    const firstFriction = relations.find((r) => r.class === 'friction') ?? null;
    const relIds = relations.map((r) => r.id);
    const energyIds = [...ids].filter((id) => id.startsWith('energy-'));
    const tensionIds = [...ids].filter((id) => id.startsWith('tension-'));
    const sections = [
        section(ids, 'bazi-nature', 'ground', ['time', 'nature', 'support'], [], [3, 7]),
        section(ids, 'bazi-energy', 'develop', energyIds, ['nature'], [2, 6]),
        section(ids, 'bazi-tension', 'tension', tensionIds, ['nature'], [2, 3 * Math.max(1, tensionIds.length)], relIds),
        section(ids, 'bazi-steadies', 'develop', ['helps'], ['support'], [2, 4]),
        section(ids, 'bazi-costs', 'tension', ['cost'], ['support'], [2, 4]),
        section(ids, 'bazi-practice', 'practice', ['practice'], ['helps'], [2, 4]),
    ].filter((s) => s !== null);
    return sealPillarIntent({
        pillar: 'bazi', kind: BAZI_KIND, engine: 'bazi-narrative', contentVersion: BAZI_CONTENT_VERSION, deck: 'knowledge:bazi',
        propositions, relations, sections,
        takeaway: { act: 'attend-to-it', target: 'practice', relationTargets: [], grounding: 'place', relationMode: null, relationTarget: null, groundedIn: firstFriction ? [firstFriction.id] : [], constraints: [...FORBIDDEN].sort(), legacy: null },
        primary: ['nature', 'support'], central: firstFriction?.id ?? null,
        uncertainties: precision === 'exact' ? [] : [precision === 'unknown' ? 'birth-hour-unknown' : 'birth-hour-approximate'], withheld: WITHHELD, forbidden: FORBIDDEN,
        extension: { state: precision, narrativeSections: sections.map((s) => s.id), claims: propositions.map((p) => p.id), deferred: plan.deferred.map((d) => d.kind), source: { plan: 'pillar-reading/bazi-narrative/baziNarrativePlan', meanings: 'knowledge/bazi' } },
    });
}
