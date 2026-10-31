import { CONNECTIONS_DOMAINS, RELATIONSHIP_KINDS_BY_DOMAIN, ROLES_OF_KIND, domainOfKind, isDirectedKind, } from './connectionsTypes.js?v=b5ef5ed';
const edgeIdOf = (kind, from, to) => `${kind}:${from}>${to}`;
export function makeEdge(request) {
    const { kind, first, second } = request;
    if (first === second)
        throw new Error('A relationship needs two different people.');
    const [fromRole, toRole] = ROLES_OF_KIND[kind];
    const symmetric = !isDirectedKind(kind);
    /* A symmetric edge is stored in canonical order so that "A and B" and "B and A" are one relationship with one id. */
    const [from, to] = symmetric && first > second ? [second, first] : [first, second];
    return { id: edgeIdOf(kind, from, to), kind, domain: domainOfKind(kind), from, to, fromRole, toRole, symmetric };
}
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
/** Build the graph of one analysis. Duplicate edges collapse; an edge naming an unknown person, or one outside the domain, is refused. */
export function buildGraph(domain, people, requests) {
    const known = new Set(people.map((person) => person.id));
    if (known.size !== people.length)
        throw new Error('Two people share one id.');
    const edges = new Map();
    for (const request of requests) {
        if (!RELATIONSHIP_KINDS_BY_DOMAIN[domain].includes(request.kind)) {
            throw new Error(`The relationship "${request.kind}" does not belong to the ${domain} domain.`);
        }
        if (!known.has(request.first) || !known.has(request.second))
            throw new Error('A relationship names someone who is not in the analysis.');
        const edge = makeEdge(request);
        edges.set(edge.id, edge);
    }
    return { domain, people: [...people].sort((a, b) => (a.id < b.id ? -1 : 1)), edges: [...edges.values()].sort(byId) };
}
/** A pair analysis for a domain that reads exactly two people. */
export function pairGraph(domain, kind, first, second) {
    return buildGraph(domain, [first, second], [{ kind, first: first.id, second: second.id }]);
}
/**
 * The parenting household: every caregiver to every child, the caregivers to each other when they co-parent, the children to each other. Two parents and three children is
 * 6 + 1 + 3 = 10 edges; one parent and one child is 1. Nothing here caps the size, but the screen is built for a few people.
 */
export function buildHousehold(seats) {
    const { caregivers, children } = seats;
    const kind = seats.caregiverKind ?? 'parent-child';
    const requests = [];
    for (const caregiver of caregivers)
        for (const child of children)
            requests.push({ kind, first: caregiver.id, second: child.id });
    if (seats.coParenting !== false) {
        for (let i = 0; i < caregivers.length; i += 1)
            for (let j = i + 1; j < caregivers.length; j += 1) {
                requests.push({ kind: 'co-parents', first: caregivers[i].id, second: caregivers[j].id });
            }
    }
    for (let i = 0; i < children.length; i += 1)
        for (let j = i + 1; j < children.length; j += 1) {
            requests.push({ kind: 'siblings-in-household', first: children[i].id, second: children[j].id });
        }
    return buildGraph('parenting', [...caregivers, ...children], requests);
}
/** The edges that involve a person, in the graph's order. */
export const edgesOf = (graph, person) => graph.edges.filter((edge) => edge.from === person || edge.to === person);
/** The other end of an edge. */
export const otherEnd = (edge, person) => (edge.from === person ? edge.to : edge.from);
export const personById = (graph, id) => {
    const found = graph.people.find((person) => person.id === id);
    if (!found)
        throw new Error(`No such person in the analysis: ${id}`);
    return found;
};
/** Every domain the graph vocabulary knows, for the tests that walk them. */
export const allDomains = () => CONNECTIONS_DOMAINS;
