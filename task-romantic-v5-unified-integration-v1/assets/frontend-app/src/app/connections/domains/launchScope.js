/*
 * THE CONNECTIONS LAUNCH SCOPE: ONE KIND OF RELATIONSHIP IS REACHABLE, THE REST IS POSTPONED, NOT DELETED (owner, 2026-11-02).
 *
 * "For now only love / relationship connections; take the other things away - but do not throw them away: the research continues, they are just not in this version."
 *
 * Connections reads four domains: romantic, family, work, parenting. The public product offers the first. The other three are not removed: their engine (domains/, evidence/), their
 * research, their reading content (reading/, content/), their types, their tests and their screens' code all stay in the repository, and `CONNECTIONS_DOMAINS` keeps naming everything the
 * ENGINE can read. This module decides which of them a PERSON can be put in, and it is the only place that decides it. Three doors go through `isLaunchDomain`:
 *
 *   - the domain chooser (the cards drawn);
 *   - choosing a domain (a tap, or anything that asks the flow to start one);
 *   - a flow read back from storage (a stale family or work flow from an earlier visit is dropped to the chooser, never opened).
 *
 * HOW A DOMAIN COMES BACK
 * Add its id to CONNECTIONS_LAUNCH_DOMAINS once its reading has passed the gate the romantic one passed. The chooser, the flow and the restore pick it up with no further change.
 *
 * DEVELOPER AND AUDIT OVERRIDE
 * The engine tests and the headless audits still exercise every domain. They set `globalThis.__KT_ALLOW_NON_LAUNCH_CONNECTIONS__ = true` before the app's script runs. It is not read from the URL,
 * storage or the network, so no link and no stored value can put a visitor in a domain that is not offered; only code that runs before the app can.
 */
/** The domains the public product offers. */
export const CONNECTIONS_LAUNCH_DOMAINS = ['romantic'];
export const NON_LAUNCH_CONNECTIONS_FLAG = '__KT_ALLOW_NON_LAUNCH_CONNECTIONS__';
export function nonLaunchConnectionsAllowed() {
    try {
        return globalThis[NON_LAUNCH_CONNECTIONS_FLAG] === true;
    }
    catch {
        return false;
    }
}
/** May a person be put in this domain? */
export function isLaunchDomain(domain) {
    return nonLaunchConnectionsAllowed() || CONNECTIONS_LAUNCH_DOMAINS.includes(domain);
}
/** The domains a person is offered, in the engine's own order. */
export function offeredDomains(all) {
    return all.filter((domain) => isLaunchDomain(domain));
}
