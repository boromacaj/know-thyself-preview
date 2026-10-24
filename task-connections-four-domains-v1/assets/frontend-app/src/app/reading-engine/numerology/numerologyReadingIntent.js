import { buildProposition, noTakeaway, relation, sealPillarIntent, section } from '../contract/adapterKit.js';
/**
 * THE NUMEROLOGY ADAPTER: THE PILLAR'S OWN NARRATIVE PLAN, AS A READING INTENT.
 *
 * Numerology's pipeline is calculation -> `NumerologyModel` -> `NumerologyNarrativePlan` -> voice. The plan already decides which number leads, which repeated root is told where ("one
 * number, one telling"), which pair of numbers is the tension and which relation belongs to it ("one relation, one home"), what the pattern costs, and which chapter of life the reader is
 * in. This adapter reads that plan and nothing downstream of it: no voice, no finished sentence, and NOT the unreduced trace of a position, which spells the name the numbers were taken from.
 *
 * What differs from Human Design, and why nothing is copied from it: Numerology has no birth-time uncertainty (the numbers come from the date and the name), so there is no
 * conditional claim here; it has no per-claim evidence level, so the wording follows the contract's own rule (a tradition's definition of a number is asserted as the tradition's, the
 * tension and the cost are symbolic readings, at most tentative); and its meaning is a temperament model per number (what it brings and needs, its tempo and facing) plus authored
 * units per position, which the brief resolves by key. The one time-dependent claim, the current chapter, rests on the age of the reference date and is marked as such.
 */
export const NUMEROLOGY_KIND = 'numerology-natal';
export const NUMEROLOGY_CONTENT_VERSION = 1;
const ROOT = 'system:numerology/chart';
const ROOT_DATE = 'system:numerology/reference-date';
const FORBIDDEN = ['assumption-as-fact', 'diagnosis', 'domain-transfer', 'event-prediction'];
/** What the plan's header says never becomes a claim, as data. */
const WITHHELD = [
    { key: 'population-share', reason: 'no share of people, no rarity and no norm is a fact about this chart' },
    { key: 'biography', reason: 'no event, job, family, relationship or past is stated about the reader' },
    { key: 'karmic-event', reason: 'a karmic debt number is a theme of the tradition, never a past event or a punishment' },
    { key: 'forecast', reason: 'personal year, month and day are time and belong to the Forecast, not to this reading' },
    { key: 'name-material', reason: 'the letters of the name the numbers were taken from are not carried' },
];
const config = { pillar: 'numerology', root: ROOT, planSource: 'numerology.narrative-plan', modelSource: 'numerology.interpretation', forbidden: FORBIDDEN, group: 'numerology:chart' };
const make = (spec) => buildProposition(spec, config);
const refSlots = (r) => ({ position: r.position, value: r.value, root: r.root, master: r.master });
const group = (g) => `${g.value}:${g.positions.join('+')}`;
function specs(plan) {
    const out = [];
    const d = plan.direction;
    out.push({
        id: 'direction', frame: 'numerology.direction', role: 'thesis', rank: 1, status: 'tradition-convention', modality: 'assert', path: 'plan.direction',
        meaningKey: `knowledge:numerology:number:${d.lifePath.value}:life-path`,
        slots: {
            lifePath: d.lifePath.value, lifePathRoot: d.lifePath.root, lifePathMaster: d.lifePath.master,
            birthday: d.birthday?.ref.value ?? null, birthdayRelation: d.birthday?.relation ?? null,
            echoRoot: d.echo?.root ?? null, echoPositions: d.echo ? [...d.echo.positions] : [], echoValues: d.echo ? [...d.echo.values] : [], echoDominant: d.echo?.dominant ?? false,
            debts: d.debts.map((x) => `${x.position}:${x.value}`),
        },
    });
    if (plan.drive) {
        const x = plan.drive;
        out.push({
            id: 'drive', frame: 'numerology.drive', role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.drive',
            meaningKey: `knowledge:numerology:number:${x.soulUrge.value}:soul-urge`,
            slots: {
                soulUrge: x.soulUrge.value, soulUrgeRoot: x.soulUrge.root, soulUrgeMaster: x.soulUrge.master, lifePath: x.lifePath.value, withDirection: x.withDirection,
                echoRoot: x.echo?.root ?? null, echoPositions: x.echo ? [...x.echo.positions] : [], toldBy: x.toldBy, passionAgrees: x.passionAgrees, debts: x.debts.map((y) => `${y.position}:${y.value}`),
            },
        });
    }
    if (plan.presence) {
        const x = plan.presence;
        out.push({
            id: 'presence', frame: 'numerology.presence', role: 'support', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.presence',
            meaningKey: `knowledge:numerology:number:${x.expression.value}:expression`,
            slots: {
                expression: x.expression.value, expressionRoot: x.expression.root, expressionMaster: x.expression.master, personality: x.personality.value, personalityRoot: x.personality.root, personalityMaster: x.personality.master,
                withEachOther: x.withEachOther, innerOuter: x.innerOuter, soulUrge: x.soulUrge?.value ?? null, attitudeAgrees: x.attitudeAgrees,
                expressionEchoRoot: x.expressionEcho?.root ?? null, personalityEchoRoot: x.personalityEcho?.root ?? null, debts: x.debts.map((y) => `${y.position}:${y.value}`),
            },
        });
    }
    out.push(pullSpec(plan.pull));
    const c = plan.cost;
    out.push({
        id: 'cost', frame: 'numerology.cost', role: 'tension', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.cost', meaningKey: `numerology.cost:${c.pull}`,
        slots: { overuse: [...c.overuse], pull: c.pull, pairAnchor: c.pair?.anchor ?? null, pairOther: c.pair?.other ?? null, pairAxis: c.pair?.axis ?? null, absent: [...c.absent], balance: c.balance },
    });
    if (plan.growth) {
        const g = plan.growth;
        out.push({
            id: 'growth', frame: 'numerology.growth', role: 'practice', rank: 2, status: 'tradition-convention', modality: 'assert', path: 'plan.growth',
            meaningKey: `knowledge:numerology:number:${g.maturity.value}:maturity`,
            slots: { maturity: g.maturity.value, maturityRoot: g.maturity.root, maturityMaster: g.maturity.master, lifePath: g.lifePath.value, sharedWith: [...g.sharedWith], toldBy: g.toldBy, withDirection: g.withDirection, inPull: g.inPull },
        });
    }
    if (plan.chapter) {
        const x = plan.chapter;
        out.push({
            id: 'chapter', frame: 'numerology.chapter', role: 'context', rank: 3, status: 'tradition-convention', modality: 'assert', path: 'plan.chapter', roots: [ROOT, ROOT_DATE],
            meaningKey: `knowledge:numerology:number:${x.chapter.pinnacle}:pinnacle`,
            slots: {
                chapterIndex: x.chapter.index, startAge: x.chapter.startAge, endAge: x.chapter.endAge, pinnacle: x.chapter.pinnacle, pinnacleRoot: x.chapter.pinnacleRoot, challenge: x.chapter.challenge,
                pinnacleShares: [...x.pinnacleShares], challengeShares: [...x.challengeShares], pinnacleWithDirection: x.pinnacleWithDirection, challengeWithDirection: x.challengeWithDirection, lifePathDigit: x.lifePathDigit,
            },
        });
    }
    return out;
}
function pullSpec(pull) {
    const base = { id: 'pull', frame: `numerology.pull.${pull.kind}`, role: 'tension', rank: 2, status: 'symbolic-reading', modality: 'tentative', path: 'plan.pull', meaningKey: `numerology.pull:${pull.kind}` };
    if (pull.kind === 'split')
        return { ...base, slots: { kind: pull.kind, anchor: group(pull.anchor), axis: pull.axis, against: pull.against.map((a) => `${group(a.group)}:${a.axis}`), more: pull.more.map(group) } };
    if (pull.kind === 'gap')
        return { ...base, slots: { kind: pull.kind, left: group(pull.left), right: group(pull.right) } };
    return { ...base, status: 'tradition-convention', modality: 'assert', slots: { kind: pull.kind, roots: [...pull.roots] } };
}
/** The intent of a composed Numerology narrative. */
export function buildNumerologyReadingIntent(narrative) {
    const plan = narrative.plan;
    const propositions = specs(plan).map(make);
    const ids = new Set(propositions.map((p) => p.id));
    /* a split or a gap is a friction between the number groups; it bears on the direction, which holds the Life Path. An aligned chart claims no relation. */
    const relations = plan.pull.kind === 'aligned' ? [] : [relation('rel-pull', 'pull', 'direction', 'friction', plan.pull.kind, 'numerology', 'defining')];
    const rel = relations.map((r) => r.id);
    const sections = [
        section(ids, 'numerology-direction', 'ground', ['direction'], [], [2, 6]),
        section(ids, 'numerology-drive', 'develop', ['drive'], ['direction'], [2, 5]),
        section(ids, 'numerology-presence', 'develop', ['presence'], ['direction'], [2, 5]),
        section(ids, 'numerology-pull', 'tension', ['pull'], ['direction'], [2, 5], rel),
        section(ids, 'numerology-cost', 'tension', ['cost'], ['direction'], [2, 4]),
        section(ids, 'numerology-growth', 'develop', ['growth'], ['direction'], [2, 4]),
        section(ids, 'numerology-chapter', 'limit', ['chapter'], ['direction'], [2, 5]),
    ].filter((s) => s !== null);
    return sealPillarIntent({
        pillar: 'numerology', kind: NUMEROLOGY_KIND, engine: 'numerology-narrative', contentVersion: NUMEROLOGY_CONTENT_VERSION, deck: 'knowledge:numerology',
        propositions, relations, sections, takeaway: noTakeaway(), primary: ['direction'], central: rel[0] ?? null, uncertainties: [], withheld: WITHHELD, forbidden: FORBIDDEN,
        extension: { narrativeSections: sections.map((s) => s.id), claims: propositions.map((p) => p.id), source: { plan: 'pillar-reading/numerology-narrative/numerologyNarrativePlan', meanings: 'knowledge/numerology' } },
    });
}
