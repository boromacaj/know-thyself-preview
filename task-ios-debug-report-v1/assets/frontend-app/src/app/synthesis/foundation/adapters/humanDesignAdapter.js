import { AUTHORITY_KEYS, DEFINITION_KEYS, TYPE_KEYS, } from '../../../knowledge/human-design/humanDesignKeys.js?v=b5ef5ed';
import { INDEPENDENCE_GROUPS } from '../evidenceIndependence.js?v=b5ef5ed';
import { bridgeSeed } from './knowledgeBridge.js?v=b5ef5ed';
/**
 * HUMAN DESIGN -> NORMALIZED EVIDENCE
 * ===================================
 *
 * WHERE THE MEANINGS COME FROM
 * ----------------------------
 * The knowledge layer, and the Type lookup carries the whole chart's context
 * with it. Type, Authority and Profile are not three independent facts about a
 * person; Authority is the mechanism operating INSIDE the Type, and Profile is
 * how the pair is met by other people. The knowledge layer composes them in that
 * order through overlays, so this adapter passes authority, profile and
 * definition as context on the Type lookup and gets one composed reading back.
 *
 * Authority and Profile are ALSO looked up in their own right, because they are
 * separately load-bearing and their own units carry semantics the composed Type
 * reading does not repeat. They sit in their own independence groups, so the
 * corroboration discount handles any overlap rather than this file guessing at
 * it.
 *
 * The `TYPE_DIMENSIONS`, `AUTHORITY_DIMENSIONS`, `PROFILE_LINE_DIMENSIONS`,
 * `DEFINITION_DIMENSIONS` and `CENTRE_DIMENSIONS` tables that used to live here
 * are gone. Between them they were the largest parallel interpretation database
 * in the codebase.
 *
 * KEYS ARE NEVER SPELLED BY HAND
 * ------------------------------
 * Every key comes from knowledge/human-design/humanDesignKeys.ts, whose
 * exhaustive Records break the build if the engine's union types gain a member.
 * A new Authority therefore cannot silently reach a reader with no
 * interpretation behind it, and cannot silently vanish from the evidence set
 * either.
 *
 * TYPE AND STRATEGY ARE ONE FACT
 * ------------------------------
 * Strategy is a pure function of Type - a Generator's Strategy is "Respond" by
 * definition. So are Signature and Not-Self theme. Emitting them separately
 * would turn one mechanic into four agreeing votes, so Type is the only one read
 * and the group key says so explicitly.
 *
 * NO BIRTH TIME: ONLY WHAT THE WHOLE DAY SETTLES
 * ----------------------------------------------
 * Human Design mechanics move fast. The Design side is taken about 88 days
 * before birth and the whole chart is sensitive to minutes, so with no birth
 * time the engine sets mechanicsSuppressed and the 12:00 reference chart is
 * never evidence. What IS evidence is the whole-day envelope
 * (human-design/humanDesignEnvelope.ts): a centre, channel, Type, Authority,
 * Profile or Definition that holds at every instant of the birth date is as
 * certain without a birth time as with one, so it is read here as calculated,
 * and one that changes during the day is not read at all - not even at zero
 * weight, because its only value would be the reference's.
 *
 * Without an envelope (a moment the day could not be scanned for) the old rule
 * stands: every item becomes `suppressed`, which multiplies its weight by zero.
 *
 * CHANNELS ARE THE SYSTEM'S SPECIFIC LAYER, AND THEY USED TO BE DROPPED
 * ---------------------------------------------------------------------
 * Type, Authority, Profile and the centres describe how a design operates. The
 * CHANNELS are where Human Design says what a particular person is for - they
 * are the fixed capacities, the knowledge layer holds an authored unit for all
 * thirty-six of them, and the pillar reading shows them. None of it reached the
 * synthesis: the adapter never emitted them, so a chart's most specific
 * statements were visible on one screen and absent from the cross-pillar model.
 *
 * Gates stay out. A chart activates around twenty-six of them, they are the
 * halves that the channels already combine, and emitting them would let the
 * finest granularity in the system outvote everything else by sheer count.
 *
 * CENTRES ARE NOT SYNTHESIS EVIDENCE
 * ----------------------------------
 * No centre is emitted, and none ever reached the synthesis through the loop that
 * used to stand here: it asked the knowledge layer for `head`, `ajna`, ... with a
 * `centerState` context, while the authored units are keyed `head-defined` /
 * `head-open`, so every lookup returned nothing and the loop emitted nothing. It is
 * removed rather than repaired, because repairing it would not be a bug fix but a
 * change of what the synthesis counts:
 *
 *   - a DEFINED centre is implied by the channels that define it, and those are
 *     already emitted, so it would be counted twice;
 *   - an OPEN centre has no settled licence: readings of open centres differ much
 *     more between teachers than readings of defined ones, and the carriers and
 *     independence rules for them have not been decided.
 *
 * Reactivating centres is a separate, deliberate decision (the research is in
 * docs/research/cross-pillar-constitution/HD_CENTRE_AUDIT.md). Until then
 * tests/humanDesignAdapterContract.test.mjs fails if a centre row appears or if
 * a requested lookup silently resolves to nothing.
 */
const isKnownType = (value) => value in TYPE_KEYS;
const isKnownAuthority = (value) => value in AUTHORITY_KEYS;
const isKnownDefinition = (value) => value in DEFINITION_KEYS;
const chartFacts = (result) => ({
    type: result.type,
    authority: result.authority,
    profile: result.profile,
    definition: result.definition,
    channels: result.definedChannels.map((channel) => channel.id),
    centres: result.centerStates.map((centre) => ({ id: centre.id, label: centre.label, defined: centre.defined })),
});
/* Only a mechanic with one value across the whole day; the rest is not read. */
const envelopeFacts = (result, envelope) => {
    const settled = (entry) => (entry.stable ? entry.values[0] ?? null : null);
    return {
        type: settled(envelope.type),
        authority: settled(envelope.authority),
        profile: settled(envelope.profile),
        definition: settled(envelope.definition),
        channels: envelope.channels.always,
        centres: result.centerStates
            .filter((centre) => envelope.centres[centre.id]?.stable)
            .map((centre) => ({ id: centre.id, label: centre.label, defined: envelope.centres[centre.id].values[0] === 'defined' })),
    };
};
export function humanDesignEvidence(result, mechanicsSuppressed, envelope = null) {
    if (result.status !== 'calculated')
        return [];
    const evidence = [];
    /* One decision, applied to everything below: with no birth time, the whole-day
       envelope is read as calculated; without one, everything is suppressed. */
    const fromEnvelope = mechanicsSuppressed && envelope !== null;
    const base = mechanicsSuppressed && !fromEnvelope ? 'suppressed' : 'calculated';
    const facts = fromEnvelope ? envelopeFacts(result, envelope) : chartFacts(result);
    /*
     * AN ESTIMATE READS THE CHART AT THE READER'S TIME, and the same envelope over
     * the two hours either side says which of its facts that time decides. A fact
     * that holds across the window keeps its full weight; one that moves is
     * time-sensitive (0.7), as the other pillars treat a value that moves within
     * an estimate. Without a time the envelope's facts are all stable by
     * construction, and nothing moving reaches this far.
     */
    const estimate = !mechanicsSuppressed && envelope !== null ? envelope : null;
    const methodologyOf = (moves) => (estimate && moves ? 'time-sensitive' : base);
    const typeMoves = Boolean(estimate && [estimate.type, estimate.authority, estimate.profile, estimate.definition]
        .some((entry) => !entry.stable));
    const authorityKey = facts.authority && isKnownAuthority(facts.authority)
        ? AUTHORITY_KEYS[facts.authority] : undefined;
    const definitionKey = facts.definition && isKnownDefinition(facts.definition)
        ? DEFINITION_KEYS[facts.definition] : undefined;
    const profileKey = normaliseProfile(facts.profile);
    /* ------------------------------------------------------------- type -- */
    if (facts.type && isKnownType(facts.type)) {
        const typeKey = TYPE_KEYS[facts.type];
        /* Everything the composed Type reading needs to know about the rest of the
           chart. The knowledge overlays fire in a fixed order - authority, then
           profile, then definition - so the reading is layered rather than listed. */
        const context = {
            ...(authorityKey ? { authority: authorityKey } : {}),
            ...(profileKey ? { profile: profileKey } : {}),
            ...(definitionKey ? { definition: definitionKey } : {}),
        };
        evidence.push(...bridgeSeed('human-design', {
            sourceEntity: 'type',
            fact: `Type: ${facts.type}`
                + (profileKey ? `, Profile ${profileKey}` : '')
                + (authorityKey ? `, ${facts.authority} authority` : ''),
            strength: 'defining',
            /* Strategy, Signature and Not-Self all live in this group and are
               deliberately not emitted - see the header. */
            independenceGroup: INDEPENDENCE_GROUPS.humanDesign.typeMechanic,
            /* The composed Type reading carries Authority, Profile and Definition as context. */
            methodology: methodologyOf(typeMoves),
            lookups: [
                { kind: 'hd-type', key: typeKey, role: 'type-role', context },
                { kind: 'hd-type', key: typeKey, role: 'base-archetype' },
            ],
        }).evidence);
    }
    /* -------------------------------------------------------- authority -- */
    if (authorityKey) {
        evidence.push(...bridgeSeed('human-design', {
            sourceEntity: 'authority',
            fact: `Authority: ${facts.authority}`,
            /* How decisions are actually made - the most practically load-bearing
               thing the system says after Type. */
            strength: 'defining',
            independenceGroup: INDEPENDENCE_GROUPS.humanDesign.authority,
            methodology: methodologyOf(Boolean(estimate && !estimate.authority.stable)),
            lookups: [{ kind: 'hd-authority', key: authorityKey, role: 'authority-role' }],
        }).evidence);
    }
    /* ---------------------------------------------------------- profile -- */
    if (profileKey) {
        /* ONE seed for the whole profile, not one per line. A 5/1 is a single
           two-part construct and the knowledge unit is authored as one; emitting a
           line at a time was how the old adapter turned it into two votes that the
           independence group then had to claw back. */
        evidence.push(...bridgeSeed('human-design', {
            sourceEntity: 'profile',
            fact: `Profile ${profileKey}`,
            strength: 'strong',
            independenceGroup: INDEPENDENCE_GROUPS.humanDesign.profile,
            methodology: methodologyOf(Boolean(estimate && !estimate.profile.stable)),
            lookups: [{ kind: 'hd-profile', key: profileKey, role: 'profile-role' }],
        }).evidence);
    }
    /* ------------------------------------------------------- definition -- */
    if (definitionKey) {
        evidence.push(...bridgeSeed('human-design', {
            sourceEntity: 'definition',
            fact: `Definition: ${facts.definition}`,
            strength: 'moderate',
            independenceGroup: INDEPENDENCE_GROUPS.humanDesign.definition,
            methodology: methodologyOf(Boolean(estimate && !estimate.definition.stable)),
            lookups: [{ kind: 'hd-definition', key: definitionKey, role: 'base-archetype' }],
        }).evidence);
    }
    /* --------------------------------------------------------- channels -- */
    for (const channel of facts.channels) {
        evidence.push(...bridgeSeed('human-design', {
            sourceEntity: `channel-${channel}`,
            fact: `Channel ${channel} defined`,
            /* A channel is a fixed capacity - stronger than a centre's state, and
               below the three facts that describe the whole design. */
            strength: 'strong',
            independenceGroup: INDEPENDENCE_GROUPS.humanDesign.channel(channel),
            methodology: methodologyOf(Boolean(estimate && !estimate.channels.always.includes(channel))),
            lookups: [{ kind: 'hd-channel', key: channel, role: 'base-archetype' }],
        }).evidence);
    }
    return evidence;
}
/** "5 / 1" -> "5/1". Anything unparseable yields no profile evidence at all. */
function normaliseProfile(profile) {
    if (!profile)
        return undefined;
    const match = /^(\d)\s*\/\s*(\d)$/.exec(profile.trim());
    return match ? `${match[1]}/${match[2]}` : undefined;
}
