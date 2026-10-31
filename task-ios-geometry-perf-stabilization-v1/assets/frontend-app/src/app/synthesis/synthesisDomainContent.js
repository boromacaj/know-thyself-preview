import { pillarLabel } from '../format.js?v=d9f39e7';
function pillarPhrase(pillars) {
    const labels = pillars.map((id) => pillarLabel(id));
    if (labels.length === 1)
        return labels[0];
    if (labels.length === 2)
        return `${labels[0]} and ${labels[1]}`;
    return `${labels.slice(0, -1).join(', ')}, and ${labels.at(-1)}`;
}
function values(ctx) {
    return ctx.signals.map((signal) => String(signal.normalizedValue ?? signal.rawValue)).join(', ');
}
export const DOMAIN_CONTENT = {
    purpose: {
        label: 'Sense of purpose and direction',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} points to a stable, long-range sense of direction rather than a short-term goal.`,
        longDescription: (ctx) => `You tend to orient around a long-arc sense of "what this life is for" rather than a single job title or short-term target. This shows up as a preference for direction over destination — you can tolerate an unclear next step more easily than an unclear overall direction. ${pillarPhrase(ctx.pillars)} independently point toward this as a stable, core-identity-level pattern rather than a temporary mood.`,
        strengths: ['Ability to hold a long-range sense of direction even when short-term steps are unclear.'],
        risks: ['Long-range purpose-thinking can become a way to avoid a concrete next action.'],
        growthQuestions: ['What is the smallest next step that would still serve the long-range direction?'],
        lifeAreas: [
            { lifeAreaId: 'personal-life', text: () => 'A felt sense of "what this is all for" tends to matter more to your wellbeing than any single achievement.' },
            { lifeAreaId: 'growth-direction', text: () => 'Growth tends to register less as ticking off milestones and more as movement along a long personal arc.' },
        ],
    },
    'self-expression': {
        label: 'Outward self-expression',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} describe how you tend to present and communicate yourself outward.`,
        longDescription: (ctx) => `There is a recurring pattern around how the inner sense of self gets translated into an outward-facing presentation — the face you show before anyone gets to know you further. ${pillarPhrase(ctx.pillars)} each independently describe an aspect of that outward presentation layer, which is a distinct question from what you actually think or feel privately.`,
        strengths: ['Capacity to shape a clear, legible outward presentation of ideas or work.'],
        risks: ['The outward presentation can drift from what is actually felt privately if it is over-optimized for legibility.'],
        growthQuestions: ['Where does the outward presentation still match what is true internally, and where has it started to diverge?'],
        lifeAreas: [
            { lifeAreaId: 'communication', text: () => 'How you come across to others on first contact is a distinct layer from your private thinking, and both are worth tracking separately.' },
        ],
    },
    motivation: {
        label: 'Underlying motivation and drive',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} converge on an underlying driver beneath the surface-level goals you set.`,
        longDescription: (ctx) => `Beneath whatever specific goal is active at a given time, there appears to be a more stable underlying driver — the thing that actually has to be satisfied for an achievement to feel meaningful rather than hollow. ${pillarPhrase(ctx.pillars)} point at this deeper layer, which is often not the same as the stated goal itself.`,
        strengths: ['Access to a clear internal driver that can sustain effort once it is named honestly.'],
        risks: ['Chasing goals that look right on paper but do not actually satisfy the underlying driver.'],
        growthQuestions: ['Does the current goal actually serve the underlying driver, or only resemble something that should?'],
        lifeAreas: [
            { lifeAreaId: 'work-career', text: () => 'Work that visibly serves the underlying driver tends to sustain motivation far longer than work chosen for its surface appeal.' },
            { lifeAreaId: 'growth-direction', text: () => 'Naming the underlying driver honestly, rather than the socially acceptable version of it, tends to clarify the next stage of growth.' },
        ],
    },
    stress: {
        label: 'Response under pressure',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} mark a specific pattern in how pressure tends to land and get processed.`,
        longDescription: (ctx) => `There is a recognizable pattern in how pressure is absorbed and metabolized, distinct from how you behave when things are calm. ${pillarPhrase(ctx.pillars)} each mark an aspect of this pressure-response pattern; it describes a tendency, not a fixed limit.`,
        strengths: ['Once the pressure pattern is recognized, it becomes possible to intervene earlier rather than after overload.'],
        risks: ['Pressure signals can be dismissed until they are already at an unmanageable level.'],
        growthQuestions: ['What is the earliest, smallest signal that pressure is starting to build?'],
        lifeAreas: [
            { lifeAreaId: 'stress-recovery', text: () => 'Recognizing the early pressure signal specific to this pattern, rather than waiting for full overload, is the highest-leverage change available here.' },
        ],
    },
    growth: {
        label: 'Growth and development orientation',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} suggest growth tends to happen through integration over time rather than sudden reinvention.`,
        longDescription: (ctx) => `Development for you tends to look like a gradual synthesis of earlier stages rather than discarding them for a new identity. ${pillarPhrase(ctx.pillars)} each speak to this expansion-and-integration pattern in their own vocabulary.`,
        strengths: ['Ability to fold earlier life stages into a coherent developing whole rather than discarding them.'],
        risks: ['Slow, integrative growth can be mistaken for stagnation by outside observers, or by yourself in an impatient mood.'],
        growthQuestions: ['What from an earlier stage of life is still worth carrying forward rather than being replaced?'],
        lifeAreas: [
            { lifeAreaId: 'growth-direction', text: () => 'Growth is more legible here as accumulation and synthesis than as a single before/after transformation.' },
        ],
    },
    timing: {
        label: 'Current time-sensitive emphasis',
        summary: () => 'A currently active, time-limited cycle adds temporary emphasis on top of the stable pattern above.',
        longDescription: () => 'This is a time-sensitive layer, not a stable trait: it describes what the current cycle tends to emphasize right now, and it will shift as the cycle moves on. It is kept structurally separate from the stable identity-level themes above.',
        strengths: ['Awareness of the current cycle can help time an already-planned action rather than force one.'],
        risks: ['Temporary cyclical emphasis can be mistaken for a permanent change in identity or direction.'],
        growthQuestions: ['Which currently active plan would benefit most from the emphasis this cycle brings?'],
        lifeAreas: [],
    },
    identity: {
        label: 'Central identity marker',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} each independently name a central marker used to describe core identity (${values(ctx)}).`,
        longDescription: (ctx) => `${pillarPhrase(ctx.pillars)} each treat one particular marker as a headline descriptor of core identity. These markers come from unrelated calculation methods and are not claimed to mean the same thing — see the evidence panel for what is and is not equivalent — but each pillar independently uses this kind of marker as a central identity reference point.`,
        strengths: ['A recognizable, describable core identity marker that stays consistent across contexts.'],
        risks: ['A single "headline" identity marker can be overused to explain away behavior that has other causes.'],
        growthQuestions: ['Which parts of daily life actually match this central marker, and which are better explained by something else?'],
        lifeAreas: [
            { lifeAreaId: 'personal-life', text: () => 'A stable core-identity reference point can be a useful anchor for self-understanding, without treating it as a full description of who you are.' },
        ],
    },
    emotion: {
        label: 'Emotional processing pattern',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} point to a specific emotional-processing pattern.`,
        longDescription: (ctx) => `There is a recognizable pattern in how emotional material is registered and processed, separate from how it is expressed outwardly. ${pillarPhrase(ctx.pillars)} each describe an aspect of that inner processing pattern in symbolic terms; none of this is a clinical or diagnostic claim.`,
        strengths: ['Capacity to register emotional information as useful signal rather than noise, once the pattern is recognized.'],
        risks: ['Emotional signals can be acted on before they have had time to settle into a clear read.'],
        growthQuestions: ['How much time does this pattern typically need before an emotional read is reliable?'],
        lifeAreas: [
            { lifeAreaId: 'relationships-intimacy', text: () => 'Knowing how much time your own emotional processing typically needs can prevent decisions made mid-wave from being treated as final.' },
        ],
    },
    structure: {
        label: 'Relationship to structure and boundaries',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} mark a recurring relationship to structure, boundaries, and long-term commitment.`,
        longDescription: (ctx) => `There is a recurring emphasis on structure — building durable frameworks, honoring boundaries, and following through on long commitments. ${pillarPhrase(ctx.pillars)} each independently mark this structural emphasis as present and active.`,
        strengths: ['Ability to build and maintain structures that outlast the initial motivation that created them.'],
        risks: ['Structure built for its own sake can become rigid past the point where it still serves its original purpose.'],
        growthQuestions: ['Which current structure or commitment is still serving its original purpose, and which has outlived it?'],
        lifeAreas: [
            { lifeAreaId: 'work-career', text: () => 'You likely do well building frameworks meant to last, and should periodically check whether a given structure still earns its keep.' },
        ],
    },
    communication: {
        label: 'Communication style',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} describe a recurring communication style.`,
        longDescription: (ctx) => `There is a recognizable pattern in how information and ideas move outward through language — how directly, how quickly, and in what form. ${pillarPhrase(ctx.pillars)} each speak to an aspect of that communication style.`,
        strengths: ['A distinct, recognizable communication style that can be leveraged deliberately rather than left to default.'],
        risks: ['A default communication style can misfire in contexts that call for a different register.'],
        growthQuestions: ['In which recent conversation would a different communication register have served better?'],
        lifeAreas: [
            { lifeAreaId: 'communication', text: () => 'Naming your default communication style makes it easier to deliberately switch register when a situation calls for it.' },
        ],
    },
    relationships: {
        label: 'Relational orientation',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} describe a recurring orientation toward closeness and relating.`,
        longDescription: (ctx) => `There is a recurring pattern in how closeness, attraction, and relating to others tend to unfold. ${pillarPhrase(ctx.pillars)} each mark an aspect of this relational orientation.`,
        strengths: ['A recognizable relational style that, once named, is easier to communicate to a partner or close friend.'],
        risks: ['An unexamined default relational pattern can be repeated even when it is not serving a specific relationship.'],
        growthQuestions: ['Is the current relational pattern a deliberate choice in this relationship, or an unexamined default?'],
        lifeAreas: [
            { lifeAreaId: 'relationships-intimacy', text: () => 'This relational orientation is worth naming out loud to a partner rather than assuming it is already understood.' },
        ],
    },
    visibility: {
        label: 'Public visibility and presentation',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} mark how you tend to be met and perceived before you have said anything.`,
        longDescription: (ctx) => `Separate from how you actually feel inside, there is a recurring pattern in how you tend to be perceived on first contact and in public-facing contexts. ${pillarPhrase(ctx.pillars)} each mark an aspect of this outward, first-impression layer.`,
        strengths: ['A recognizable public presentation that can be used deliberately in visible or leadership contexts.'],
        risks: ['A gap between the public first-impression layer and the private experience can build up unaddressed.'],
        growthQuestions: ['Does the public first-impression layer still match how you actually want to be met right now?'],
        lifeAreas: [
            { lifeAreaId: 'work-career', text: () => 'Your default public presentation is a real asset in visible or leadership situations, worth using deliberately rather than leaving to chance.' },
        ],
    },
    energy: {
        label: 'Energy style and pacing',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} converge on a recognizable energy style (${values(ctx)}).`,
        longDescription: (ctx) => `There is a recurring pattern in how energy is generated, sustained, and best paced over a day or project. ${pillarPhrase(ctx.pillars)} each independently describe an aspect of this energy style, using unrelated methods, which makes the convergence worth noticing without treating it as one single mechanism.`,
        strengths: ['A recognizable, nameable energy style that can be paced deliberately rather than fought against.'],
        risks: ['Working against this energy style rather than with it is a common source of avoidable burnout.'],
        growthQuestions: ['Where in the current schedule is effort being spent against this energy style rather than with it?'],
        lifeAreas: [
            { lifeAreaId: 'stress-recovery', text: () => 'Pacing work with this energy style, rather than against it, is one of the more reliable levers against burnout available here.' },
            { lifeAreaId: 'work-career', text: () => 'Matching task type and timing to this energy style tends to produce more sustainable output than forcing a mismatched routine.' },
        ],
    },
    'decision-making': {
        label: 'Decision-making process',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} describe a specific process for reaching a reliable decision.`,
        longDescription: (ctx) => `There is a recognizable process that tends to produce more reliable decisions than defaulting to pure logical analysis in the moment. ${pillarPhrase(ctx.pillars)} each mark an aspect of that decision process.`,
        strengths: ['A specific, repeatable decision process that produces more reliable outcomes than snap analysis alone.'],
        risks: ['Overriding this process under time pressure tends to produce decisions that have to be revisited later.'],
        growthQuestions: ['Which recent decision skipped this process, and how did that decision hold up over time?'],
        lifeAreas: [
            { lifeAreaId: 'decision-making', text: () => 'Decisions tend to hold up better when this specific process is honored rather than overridden by time pressure.' },
        ],
    },
    cooperation: {
        label: 'Cooperation and connection structure',
        summary: (ctx) => `${pillarPhrase(ctx.pillars)} describe how your own structure tends to connect with other people\'s.`,
        longDescription: (ctx) => `There is a recognizable pattern in how your own internal structure connects with (or stays separate from) other people\'s, which shapes how naturally collaboration and independent work each come. ${pillarPhrase(ctx.pillars)} mark this connection structure.`,
        strengths: ['Clarity about which kinds of collaboration come naturally and which require deliberate bridging.'],
        risks: ['Assuming a connection style that does not match the current team or relationship can create avoidable friction.'],
        growthQuestions: ['Does the current working or living arrangement match this connection structure, or fight it?'],
        lifeAreas: [
            { lifeAreaId: 'work-career', text: () => 'Team or partnership structures that match this connection pattern tend to produce less friction than ones that fight it.' },
        ],
    },
    leadership: {
        label: 'Leadership and follow-through capacity',
        summary: () => 'A structural marker indicates a real, usable path from internal drive to visible, expressed output.',
        longDescription: () => 'There is a structural indicator that internal drive has a real, connected path to visible expression and follow-through, rather than staying only internal. This describes a capacity for follow-through and leadership by example, not a claim about formal rank or authority over others.',
        strengths: ['A workable structural path from internal motivation to visible, completed output.'],
        risks: ['This capacity can be overused to take on more visible follow-through than is sustainable.'],
        growthQuestions: ['Is this follow-through capacity being used for things that actually matter to you, or for whatever is loudest?'],
        lifeAreas: [
            { lifeAreaId: 'work-career', text: () => 'You likely have a workable path from motivation to finished, visible output — worth protecting for what matters most.' },
        ],
    },
};
export function domainLabel(domain) {
    return DOMAIN_CONTENT[domain]?.label ?? domain;
}
