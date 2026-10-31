/* ----------------------------------------------------------------- rules -- */
/**
 * EDITORIAL: how many channels the main reading may name.
 *
 * Three. A chart defines up to a couple of dozen, and the reading's job is to
 * say which ones carry the mechanics it has just described - past three, a
 * paragraph becomes the channel dictionary this rewrite exists to remove. The
 * rest keep their full entries under Go deeper.
 */
const MAX_NAMED_CHANNELS = 3;
/**
 * WHICH MECHANICS A NEARBY BIRTH TIME WOULD MOVE.
 *
 * From the mean motions in HUMAN_DESIGN_OUTPUT_BENCHMARK.md §4, not from a
 * guess: the Sun's line turns over about every 22.8 hours, so a Profile is a
 * roughly once-a-day event and an hour either way rarely touches it; the Moon
 * crosses a gate in about 10 hours, so a channel the Moon completes - and with
 * it a centre, and with it possibly the Type or the Authority - is the first
 * thing to move. A measured window always wins: when the scan says a mechanic
 * changed, it changed, whatever the averages predict.
 */
function stabilityOf(window) {
    const measured = new Set(window?.changes ?? []);
    const band = (key, fallback) => (measured.has(key) ? 'boundary' : window ? 'stable' : fallback);
    return {
        /* Type and definition follow the channel graph, which the Moon can change
           within a few hours; profile follows the Sun and is the slowest of the
           four. Authority follows the defined centres, so it moves with the graph. */
        type: band('type', 'sensitive'),
        authority: band('authority', 'sensitive'),
        profile: band('profile', 'stable'),
        definition: band('definition', 'sensitive'),
    };
}
const centerIds = (centers) => centers.map((center) => center.id);
const functionClaim = (reading) => ({
    fn: reading.fn,
    state: reading.state,
    defined: centerIds(reading.defined),
    open: centerIds(reading.open),
});
/**
 * The tensions this chart actually contains, strongest first.
 *
 * Each rule below is a mechanical contradiction with a named source in the
 * graph. A chart with none of them gets no tension section rather than a
 * manufactured one - which is the point of asking the model instead of writing
 * a paragraph that every chart could wear.
 */
function tensionsFor(model) {
    const tensions = [];
    const { operating, decision, energy, social } = model;
    /* An estimated birth time weakens every graph-derived claim by the same
       amount, so it is applied once here rather than argued per rule. */
    const firm = model.time.precision === 'approximate' ? 'moderate' : 'firm';
    /*
     * PACE. The clearest mechanical tension in the system, and the one that
     * distinguishes two charts of the same Type more sharply than anything else:
     * a Type whose strategy is to move once something is there, carrying an
     * authority that cannot answer at the moment it is asked.
     */
    if (decision.needsTime && (operating.initiation === 'after-response' || operating.initiation === 'direct')) {
        tensions.push({
            kind: 'pace',
            type: operating.type,
            authority: decision.authority,
            authorityKind: decision.kind,
            initiation: operating.initiation,
            evidence: firm,
        });
    }
    /* SPLIT. Two or more parts of the graph with no channel between them. */
    if (energy.groups.length > 1) {
        tensions.push({
            kind: 'split',
            definition: energy.definition,
            groups: energy.groups.map((group) => ({ centers: group.centers })),
            bridgeGates: energy.bridgeGates,
            evidence: firm,
        });
    }
    /* SIGNAL AND NOISE. An open centre manufacturing something shaped like the answer. */
    if (decision.confusableWith) {
        tensions.push({
            kind: 'signal-noise',
            authority: decision.authority,
            authorityKind: decision.kind,
            noise: decision.confusableWith,
            evidence: firm,
        });
    }
    /* PROFILE. Only when the two lines genuinely pull against each other. */
    if (social && social.shape === 'opposed') {
        tensions.push({
            kind: 'profile',
            conscious: social.conscious,
            unconscious: social.unconscious,
            /* Two Sun lines: the slowest-moving mechanic, but still a line. */
            evidence: model.time.precision === 'approximate' ? 'moderate' : 'firm',
        });
    }
    /*
     * REACH. Awareness defined while the drive that would act on it is open.
     * Both halves must be real: this is not "a Projector paragraph", it is a
     * count of THIS graph, and a Projector whose Root happens to be defined does
     * not get it.
     */
    const awareness = energy.functions.find((fn) => fn.fn === 'awareness');
    const drive = energy.functions.find((fn) => fn.fn === 'drive');
    if (awareness && drive && awareness.defined.length > 0 && drive.defined.length === 0) {
        tensions.push({
            kind: 'reach',
            awareness: centerIds(awareness.defined),
            openDrive: centerIds(drive.open),
            evidence: firm,
        });
    }
    return tensions;
}
/**
 * The open centre a reading should actually watch.
 *
 * Preference order, and each step has a reason: the centre that can be mistaken
 * for the authority (it corrupts decisions), then an open Root (it manufactures
 * time pressure, which is what makes people skip the strategy), then an open
 * Sacral in a chart with no sacral power (it is where overwork comes from).
 * Null when none of those apply - a chart with nothing worth watching gets no
 * sentence about it.
 */
function watchCenter(model) {
    const open = new Set(model.energy.centers.filter((center) => !center.defined).map((center) => center.id));
    if (model.decision.confusableWith)
        return model.decision.confusableWith;
    if (open.has('root'))
        return 'root';
    if (open.has('sacral'))
        return 'sacral';
    return null;
}
export function planHumanDesignNarrative(model) {
    const { operating, decision, energy, social, connections, feedback } = model;
    const definedFunctions = energy.functions.filter((fn) => fn.defined.length > 0);
    const openFunctions = energy.functions.filter((fn) => fn.open.length > 0);
    const pathChannels = connections.filter((channel) => channel.carriesMotorPath).map((channel) => channel.id);
    return {
        time: model.time.precision === 'approximate'
            ? {
                kind: 'time',
                precision: 'approximate',
                window: model.time.window
                    ? { hours: model.time.window.hours, changes: model.time.window.changes }
                    : null,
                stability: stabilityOf(model.time.window),
            }
            : null,
        operating: {
            kind: 'operating',
            type: operating.type,
            strategy: operating.strategy,
            initiation: operating.initiation,
            sacralPowered: operating.sacralPowered,
            motorToThroat: operating.motorToThroat,
            motorPath: operating.motorPath,
            pathChannels,
        },
        decision: {
            kind: 'decision',
            authority: decision.authority,
            authorityKind: decision.kind,
            center: decision.center,
            needsTime: decision.needsTime,
            evidence: decision.center
                ? connections.filter((channel) => channel.carriesAuthority).map((channel) => channel.id)
                : [],
            confusableWith: decision.confusableWith,
            type: operating.type,
            initiation: operating.initiation,
        },
        social: social
            ? {
                kind: 'social',
                conscious: social.conscious,
                unconscious: social.unconscious,
                shape: social.shape,
                label: social.label,
                initiation: operating.initiation,
                evidence: model.time.precision === 'approximate' ? 'moderate' : 'firm',
            }
            : null,
        /* A Reflector defines nothing, and a consistency section about nothing is
           worse than no section: it would have to invent something to be consistent
           about. The context claim carries that chart instead. */
        consistency: energy.definedCount > 0
            ? {
                kind: 'consistency',
                definition: energy.definition,
                groupCount: energy.groups.length,
                definedCount: energy.definedCount,
                functions: definedFunctions.map(functionClaim),
                channels: connections.slice(0, MAX_NAMED_CHANNELS),
            }
            : null,
        context: energy.openCount > 0
            ? {
                kind: 'context',
                openCount: energy.openCount,
                functions: openFunctions.map(functionClaim),
                centers: energy.centers.filter((center) => !center.defined).map((center) => center.id),
                whollyOpen: energy.definedCount === 0,
            }
            : null,
        tension: tensionsFor(model),
        cost: {
            kind: 'cost',
            notSelf: feedback.notSelf,
            type: operating.type,
            initiation: operating.initiation,
            pressure: watchCenter(model),
            sacralPowered: operating.sacralPowered,
        },
        practice: {
            kind: 'practice',
            type: operating.type,
            strategy: operating.strategy,
            authority: decision.authority,
            authorityKind: decision.kind,
            needsTime: decision.needsTime,
            signature: feedback.signature,
            initiation: operating.initiation,
            watch: watchCenter(model),
        },
    };
}
