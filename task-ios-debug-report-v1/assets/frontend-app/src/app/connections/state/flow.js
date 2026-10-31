import { ALL_DYNAMICS } from '../domains/dynamics.js?v=b5ef5ed';
import { CONNECTIONS_DOMAINS, OBSERVED_CONTEXT_BY_DOMAIN, RELATIONSHIP_KINDS_BY_DOMAIN, isDirectedKind, isObservedContextCode, } from '../model/connectionsTypes.js?v=b5ef5ed';
import { buildHousehold, pairGraph } from '../model/relationshipGraph.js?v=b5ef5ed';
export const OWNER_ID = 'owner';
export const INITIAL_FLOW = {
    level: 'domains', domain: null, kind: null, ownerIsFirst: true, other: null, caregivers: [], children: [], context: [], focus: null, pair: null,
};
export const MAX_CAREGIVERS = 3;
export const MAX_CHILDREN = 4;
export const MAX_CONTEXT = 4;
/** The default kind when a domain is chosen: the one that needs the fewest further choices. */
export const defaultKind = (domain) => {
    const kinds = RELATIONSHIP_KINDS_BY_DOMAIN[domain];
    return kinds.length === 1 ? kinds[0] : null;
};
export function chooseDomain(flow, domain) {
    if (flow.domain === domain && flow.level !== 'domains')
        return flow;
    return { ...INITIAL_FLOW, level: 'setup', domain, kind: domain === 'parenting' ? 'parent-child' : defaultKind(domain), context: [] };
}
export function chooseKind(flow, kind) {
    if (!flow.domain || !RELATIONSHIP_KINDS_BY_DOMAIN[flow.domain].includes(kind))
        return flow;
    return { ...flow, kind, ownerIsFirst: true };
}
export function toggleContext(flow, code) {
    if (!flow.domain || !OBSERVED_CONTEXT_BY_DOMAIN[flow.domain].includes(code))
        return flow;
    if (flow.context.includes(code))
        return { ...flow, context: flow.context.filter((entry) => entry !== code) };
    if (flow.context.length >= MAX_CONTEXT)
        return flow;
    return { ...flow, context: [...flow.context, code] };
}
/** What still has to be chosen before a reading can be made. */
export function missingFrom(flow) {
    if (!flow.domain)
        return ['kind'];
    const missing = [];
    if (flow.domain === 'parenting') {
        if (flow.children.length === 0)
            missing.push('child');
        return missing;
    }
    if (!flow.kind)
        missing.push('kind');
    if (!flow.other)
        missing.push('other');
    return missing;
}
export const isReady = (flow) => missingFrom(flow).length === 0;
/**
 * The relationship graph this flow describes, or null when it is not ready. The owner and the others come in as people already resolved by the caller; this does not look
 * anything up. A directed kind puts the owner in the first role when `ownerIsFirst`, in the second otherwise.
 */
export function graphFromFlow(flow, owner, known) {
    if (!flow.domain || !isReady(flow))
        return null;
    const person = (id) => (id === OWNER_ID ? owner : known.get(id) ?? null);
    if (flow.domain === 'parenting') {
        const caregivers = [owner, ...flow.caregivers.map(person)].filter((entry) => entry !== null);
        const children = flow.children.map(person).filter((entry) => entry !== null);
        if (children.length === 0)
            return null;
        return buildHousehold({ caregivers, children, coParenting: caregivers.length > 1, caregiverKind: flow.kind === 'caregiver-child' ? 'caregiver-child' : 'parent-child' });
    }
    const other = flow.other ? person(flow.other) : null;
    if (!other || !flow.kind)
        return null;
    const directed = isDirectedKind(flow.kind);
    const [first, second] = directed && !flow.ownerIsFirst ? [other, owner] : [owner, other];
    return pairGraph(flow.domain, flow.kind, first, second);
}
/** A flow read back from storage, cut down to what is still valid: unknown ids dropped, a level that needs something missing stepped back. */
export function sanitizeFlow(raw, knownIds) {
    if (!raw || typeof raw !== 'object')
        return INITIAL_FLOW;
    const v = raw;
    const domain = CONNECTIONS_DOMAINS.includes(v.domain) ? v.domain : null;
    if (!domain)
        return INITIAL_FLOW;
    const kinds = RELATIONSHIP_KINDS_BY_DOMAIN[domain];
    const kind = kinds.includes(v.kind) ? v.kind : domain === 'parenting' ? 'parent-child' : defaultKind(domain);
    const known = (id) => typeof id === 'string' && knownIds.has(id);
    const list = (value, limit) => (Array.isArray(value) ? [...new Set(value.filter(known))].slice(0, limit) : []);
    const context = (Array.isArray(v.context) ? v.context : []).filter(isObservedContextCode).filter((code) => OBSERVED_CONTEXT_BY_DOMAIN[domain].includes(code)).slice(0, MAX_CONTEXT);
    const focus = typeof v.focus === 'string' && ALL_DYNAMICS.includes(v.focus) ? v.focus : null;
    const base = {
        level: 'setup', domain, kind, ownerIsFirst: v.ownerIsFirst !== false, other: known(v.other) ? v.other : null,
        caregivers: list(v.caregivers, MAX_CAREGIVERS - 1), children: list(v.children, MAX_CHILDREN), context, focus, pair: typeof v.pair === 'string' ? v.pair : null,
    };
    const wantsResult = v.level === 'result';
    return { ...base, level: wantsResult && isReady(base) ? 'result' : 'setup' };
}
/** Add a person to a list in the flow, keeping the limits. */
export function withCaregiver(flow, id) {
    if (flow.caregivers.includes(id) || flow.children.includes(id) || flow.caregivers.length >= MAX_CAREGIVERS - 1)
        return flow;
    return { ...flow, caregivers: [...flow.caregivers, id] };
}
export function withChild(flow, id) {
    if (flow.children.includes(id) || flow.caregivers.includes(id) || flow.children.length >= MAX_CHILDREN)
        return flow;
    return { ...flow, children: [...flow.children, id] };
}
export function withoutPerson(flow, id) {
    return {
        ...flow, other: flow.other === id ? null : flow.other,
        caregivers: flow.caregivers.filter((entry) => entry !== id), children: flow.children.filter((entry) => entry !== id),
        level: flow.level === 'result' ? 'setup' : flow.level,
    };
}
