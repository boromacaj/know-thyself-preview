import { AXIS_DYNAMICS, interpretPair } from './domains/dynamics.js?v=d9f39e7';
import { pairEvidenceOf } from './evidence/pairEvidence.js?v=d9f39e7';
import { ageBandOf, ageOn } from './model/ageBands.js?v=d9f39e7';
import { composePairReading } from './reading/compose.js?v=d9f39e7';
import { isLeanFinding } from './narrative/plan.js?v=d9f39e7';
import { householdReadingOf } from './reading/household.js?v=d9f39e7';
import { forAge } from './reading/ageWords.js?v=d9f39e7';
import { hashOf, say } from './reading/languages.js?v=d9f39e7';
import { forOneAdult } from './reading/voice.js?v=d9f39e7';
import { ageGuideViewOf, childPortraitOf } from './reading/parentingExtras.js?v=d9f39e7';
export class AnalysisError extends Error {
    code;
    constructor(code) {
        super(`Connections cannot analyse this: ${code}`);
        this.code = code;
        this.name = 'AnalysisError';
    }
}
const labelOf = (person) => person.label;
/** The people who are children in this graph: the second end of a caregiver edge, and both ends of a household sibling edge. */
function childIdsOf(graph) {
    const ids = new Set();
    for (const edge of graph.edges) {
        if (edge.kind === 'parent-child' || edge.kind === 'caregiver-child')
            ids.add(edge.to);
        if (edge.kind === 'siblings-in-household') {
            ids.add(edge.from);
            ids.add(edge.to);
        }
    }
    return [...ids].sort();
}
/** A child under three is not read for a style: temperament is still forming, and the age guide says what a birth date cannot. */
/** A parent younger than the adult child, or a grandparent younger than the grandchild or within a generation of them: the roles are probably the wrong way round. A check, never a refusal. */
function rolesLookReversed(kind, firstBirth, secondBirth) {
    const years = (new Date(secondBirth).getTime() - new Date(firstBirth).getTime()) / (365.25 * 24 * 3600 * 1000);
    if (kind === 'adult-parent-adult-child')
        return years < 12;
    if (kind === 'grandparent-grandchild')
        return years < 25;
    return false;
}
const isTooYoung = (band) => band === 'infant-0-1' || band === 'toddler-1-3';
export function analyse(req) {
    const { graph, lang, content } = req;
    const domainContent = content.domains[graph.domain];
    const youngReading = (band) => {
        const entry = content.ageGuide.find((candidate) => candidate.band === band);
        if (!entry)
            return null;
        return {
            headline: say(entry.label, lang), lede: say(entry.portrait, lang), quiet: true, dimensions: [], practices: [], signatures: [], narrative: { mechanisms: { central: null, asides: [] }, arc: null, central: null, supports: [], leftOut: [], resolutions: [] },
            sections: [{ id: 'overview', title: say(domainContent.sections.overview, lang), paragraphs: [say(content.shared.tooYoung, lang)] }],
        };
    };
    const personOf = (id) => {
        const found = req.people.get(id);
        if (!found)
            throw new AnalysisError('unknown-person');
        return found;
    };
    const ageOf = (id) => {
        const age = ageOn(personOf(id).birthDate, req.today);
        if (!age)
            throw new AnalysisError('no-birth-date');
        return age;
    };
    /* In a household each child is not handed the same advice: a reading prefers practices no earlier reading in the household has given. */
    const given = new Set();
    /* What each child's portrait speaks to, decided first: the guidance in a parent-and-child reading follows it. */
    const portraitAxes = new Map();
    if (graph.domain === 'parenting') {
        for (const id of childIdsOf(graph)) {
            const person = personOf(id);
            const childBand = ageBandOf(ageOf(id));
            if (childBand === 'adult' || isTooYoung(childBand))
                continue;
            const drawn = childPortraitOf({ lang, name: labelOf(person.person), stances: person.computed.evidence.axes, content: domainContent, narrative: content.shared.narrative });
            portraitAxes.set(id, new Set(drawn.axes));
        }
    }
    /* A child under three has one short page, not one per adult: the same age guide told twice is not a second reading. */
    const youngTold = new Set();
    const pairs = graph.edges.map((edge) => {
        const first = personOf(edge.from);
        const second = personOf(edge.to);
        const evidence = pairEvidenceOf(first.computed.evidence, second.computed.evidence, first.computed.facts, second.computed.facts);
        const interpretation = interpretPair({ domain: edge.domain, kind: edge.kind, evidence, context: req.context });
        const isChildEdge = edge.kind === 'parent-child' || edge.kind === 'caregiver-child';
        const childId = isChildEdge ? edge.to : null;
        const age = childId ? ageOf(childId) : null;
        const band = age ? ageBandOf(age) : null;
        if (band === 'adult')
            throw new AnalysisError('child-is-adult');
        const seed = `${edge.kind}|${first.computed.fingerprint}|${second.computed.fingerprint}`;
        /* The co-parents are read for the household and not as a pair of their own: their content is the household's. */
        const composeable = Boolean(domainContent.kinds[edge.kind]);
        /* Brothers and sisters are not compared with a child under three either: the sibling insight would be a trait claim about a toddler. */
        const youngSibling = edge.kind === 'siblings-in-household' && [edge.from, edge.to].some((id) => isTooYoung(ageBandOf(ageOf(id))));
        const youngRepeat = isTooYoung(band) && childId !== null && youngTold.has(childId);
        if (isTooYoung(band) && childId !== null)
            youngTold.add(childId);
        const reading = isTooYoung(band) && band !== null
            ? (youngRepeat ? null : youngReading(band))
            : youngSibling ? null
                : composeable
                    ? composePairReading({
                        lang, domain: edge.domain, kind: edge.kind,
                        first: { id: first.person.id, label: labelOf(first.person) }, second: { id: second.person.id, label: labelOf(second.person) },
                        evidence, interpretation, context: req.context, age: band, seed, content: { domain: domainContent, shared: content.shared }, excludePractices: new Set(given), childAxes: childId ? portraitAxes.get(childId) : undefined, rolesLookReversed: rolesLookReversed(edge.kind, first.birthDate, second.birthDate),
                    })
                    : null;
        for (const practice of reading?.practices ?? [])
            given.add(practice.id);
        return { edge, first, second, evidence, interpretation, reading, child: childId && age && band ? { person: childId, age, band } : null };
    });
    const children = graph.domain === 'parenting'
        ? childIdsOf(graph).map((id) => {
            const person = personOf(id);
            const age = ageOf(id);
            const band = ageBandOf(age);
            const stances = person.computed.evidence.axes;
            const hasSiblings = graph.edges.some((edge) => edge.kind === 'siblings-in-household');
            const hasCoParents = graph.edges.some((edge) => edge.kind === 'co-parents');
            const ageBand = band === 'adult' ? null : band;
            const drawn = isTooYoung(band)
                ? { name: labelOf(person.person), paragraphs: [], poles: [], axes: [] }
                : childPortraitOf({ lang, name: labelOf(person.person), stances, content: domainContent, narrative: content.shared.narrative });
            const portrait = { ...drawn, paragraphs: drawn.paragraphs.map((text) => forAge(text, ageBand, lang)) };
            return {
                person: id, age, band,
                portrait,
                guide: band === 'adult' ? null : ageGuideViewOf({
                    lang, band, guide: content.ageGuide, childStances: stances, context: req.context, portraitAxes: portrait.axes,
                    omit: [...(hasSiblings ? [] : ['siblings']), ...(hasCoParents ? [] : ['two-adults'])],
                }),
            };
        })
        : [];
    let household = null;
    if (graph.domain === 'parenting' && graph.edges.length > 1) {
        const phraseOf = (dynamic) => {
            const axisContent = Object.entries(domainContent.axes).find(([axis]) => AXIS_DYNAMICS[axis] === dynamic);
            return axisContent ? say(axisContent[1].phrase, lang) : dynamic;
        };
        const youngIds = new Set(children.filter((child) => isTooYoung(child.band)).map((child) => child.person));
        const householdPairs = pairs.filter((pair) => !youngIds.has(pair.edge.from) && !youngIds.has(pair.edge.to)).map((pair) => ({
            kind: pair.edge.kind, firstId: pair.edge.from, secondId: pair.edge.to, interpretation: pair.interpretation,
            leanDynamics: new Set(pair.interpretation.findings.filter((finding) => isLeanFinding(finding, pair.evidence)).map((finding) => finding.id)),
        }));
        household = householdReadingOf({
            lang, people: graph.people.map((person) => ({ id: person.id, label: labelOf(person) })), pairs: householdPairs, content: domainContent,
            phraseOf, seed: String(hashOf(graph.edges.map((edge) => edge.id).join('|'))),
            context: req.context, shared: content.shared, bands: new Map(children.flatMap((child) => (child.band === 'adult' ? [] : [[child.person, child.band]]))),
        });
    }
    /* In a household of one adult the Slovak pair pages speak to that adult in the singular, as the household page does. */
    const oneAdult = graph.domain === 'parenting' && lang === 'sk' && new Set(graph.edges.filter((edge) => edge.kind === 'parent-child' || edge.kind === 'caregiver-child').map((edge) => edge.from)).size === 1;
    if (oneAdult) {
        const voice = (text) => forOneAdult(text, 'sk');
        pairs.forEach((pair, index) => {
            if (!pair.reading)
                return;
            const reading = pair.reading;
            pairs[index] = { ...pair, reading: { ...reading, headline: voice(reading.headline), sections: reading.sections.map((section) => ({ ...section, title: voice(section.title), paragraphs: section.paragraphs.map(voice) })), practices: reading.practices.map((card) => ({ ...card, title: voice(card.title), body: voice(card.body) })) } };
        });
    }
    /* A card the household page already gives is not given again on a pair page of the same household. */
    const householdCards = new Set((household?.practices ?? []).map((practice) => practice.id));
    const dedupedPairs = householdCards.size === 0 ? pairs : pairs.map((pair) => (pair.reading && pair.reading.practices.some((practice) => householdCards.has(practice.id))
        ? { ...pair, reading: { ...pair.reading, practices: pair.reading.practices.filter((practice) => !householdCards.has(practice.id)) } }
        : pair));
    return { domain: graph.domain, lang, pairs: dedupedPairs, children, household };
}
