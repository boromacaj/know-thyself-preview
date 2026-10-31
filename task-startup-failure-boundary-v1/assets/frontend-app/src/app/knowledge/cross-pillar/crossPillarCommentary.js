import { unitId, } from '../knowledgeTypes.js?v=2ea79e9';
/**
 * CROSS-PILLAR COMMENTARY.
 *
 * What it means that four unrelated symbol systems say the same thing - and
 * what it means when they do not. This is the only content in the project that
 * belongs to no single tradition, which is exactly why it needs writing: a
 * reader shown "three systems converge here" will draw a conclusion from it,
 * and the conclusion they draw by default is wrong.
 *
 * THE CLAIM THIS LAYER IS ALLOWED TO MAKE
 *
 * "Four symbolic systems, built in different traditions from different inputs,
 * express a similar idea about this birth data." That is a fact
 * about the systems. It is not evidence that the trait exists, that it has been
 * measured, or that it predicts anything, and every entry below is written so
 * that a reader who stops after one paragraph still has the distinction.
 *
 * WHAT IT IS NOT ALLOWED TO DO
 *
 * Restate what a pillar already said. The numerology library owns what a 7 Life
 * Path means; the Human Design library owns what an undefined Ajna means. This
 * file owns the meaning of AGREEMENT and DISAGREEMENT, and nothing else. A test
 * asserts that no paragraph here is reused from any pillar library.
 *
 * KEYS come from the synthesis foundation itself - theme ids from
 * THEME_DEFINITIONS, axis ids from the semantic taxonomy - so commentary cannot
 * exist for something the engine cannot produce, and a theme cannot be added to
 * the engine without a hole opening here.
 *
 * The completeness guard for that lives in the test rather than in this file,
 * deliberately. Importing THEME_DEFINITIONS here would make the knowledge layer
 * depend on the synthesis layer, and the dependency runs the other way round:
 * synthesis reads knowledge. A test can see both without either importing the
 * other, so that is where the two sets are checked against each other.
 */
/**
 * Composed by this project from the structure of the synthesis output.
 *
 * `contextual-derivation` rather than `established`, because no tradition wrote
 * about what happens when you run four of them side by side. The reasoning is
 * ours and is stated rather than borrowed.
 */
const CONVERGENCE = {
    kind: 'contextual-derivation',
    settledness: 'conventional',
    basis: 'Composed by this project. No source tradition discusses cross-system convergence, because the comparison is a property of running four systems side by side rather than of any one of them; the reasoning about what agreement licenses is set out in the synthesis architecture document.',
    sources: ['RESEARCH_SYNTHESIS#convergence'],
};
const DISAGREEMENT = {
    kind: 'contextual-derivation',
    settledness: 'conventional',
    basis: 'Composed by this project from the tension model in the synthesis foundation. Which axis two systems disagree on is calculated; what a disagreement is worth as a reading is our reasoning and is stated as such.',
    sources: ['RESEARCH_SYNTHESIS#tensions'],
};
const METHOD = {
    kind: 'contextual-derivation',
    settledness: 'conventional',
    basis: 'Describes how this project builds and weighs the cross-pillar model. Method rather than interpretation.',
    sources: ['RESEARCH_SYNTHESIS#method'],
};
function build(kind, role, provenance, entry) {
    return {
        id: unitId('cross-pillar', kind, entry.key, role),
        entity: { system: 'cross-pillar', kind, key: entry.key, label: entry.label },
        role,
        headline: entry.headline,
        core: entry.core,
        /* Deliberately empty. This layer READS the semantic model; contributing
           signals back into it would be circular, and the weighting has no way to
           discount a commentary unit that agrees with the evidence it describes. */
        semantics: [],
        provenance,
    };
}
const themeUnit = (entry) => build('synthesis-theme', 'cross-pillar-theme', CONVERGENCE, entry);
const axisUnit = (entry) => build('synthesis-axis', 'cross-pillar-tension', DISAGREEMENT, entry);
const conceptUnit = (entry) => build('synthesis-concept', 'base-archetype', METHOD, entry);
/* ------------------------------------------------------------------ *
 * THEMES - what convergence on each one is worth
 * ------------------------------------------------------------------ */
const themes = [
    themeUnit({
        key: 'deep-internal-processing',
        label: 'Deep internal processing',
        headline: 'Several systems describe a person who works things out inside.',
        core: [
            'The systems that agree here are describing the same thing from four unrelated starting points: a birth date reduced through arithmetic, a sky position, a sexagenary calendar, and a set of defined and undefined centres. None of them can see the others, and none was designed to be compared with the others.',
            'What convergence adds is not certainty but redundancy. If this reading is wrong it is wrong in several places at once, which is a different situation from one system asserting something the rest are silent about. The practical use is ordinary: it is the part of the reading most worth checking against how you actually spend an afternoon.',
        ],
    }),
    themeUnit({
        key: 'independent-direction',
        label: 'Independent direction',
        headline: 'Several systems describe someone who sets their own course.',
        core: [
            'Autonomy is the theme most likely to be read as a compliment, and the agreement between systems says nothing about whether it is one. Independence is a description of where decisions get made rather than of how well they get made, and the same configuration produces the founder and the person nobody can work with.',
            'The convergence is worth noticing precisely because this theme is easy to over-identify with. Where four systems describe self-direction, the useful question is not whether it is true but what it costs - and that cost usually shows up in the tension section rather than here.',
        ],
    }),
    themeUnit({
        key: 'relational-orientation',
        label: 'Relational orientation',
        headline: 'Several systems describe someone who works through other people.',
        core: [
            'Where the systems agree on this, they are describing a person whose defaults point outward - toward the other party, the group, the arrangement between people rather than the position within it. Four traditions arriving at that from unrelated inputs is a reasonably strong structural observation.',
            'It is also the theme most often confused with agreeableness, which is a separate matter entirely. Orientation toward people says nothing about whether you give way to them, and a chart can be strongly relational and extremely hard to move. If the reading feels wrong, check whether you are testing it against pliability rather than against attention.',
        ],
    }),
    themeUnit({
        key: 'structured-method',
        label: 'Structured method',
        headline: 'Several systems describe someone who works by building.',
        core: [
            'This is among the more legible themes to verify, because structure leaves evidence. Where several systems converge on method, sequence and follow-through, the claim is checkable against what you have actually finished rather than against how you feel about finishing things.',
            'The convergence carries a specific caution. Structure is the theme most likely to be reinforced by a person recognising it and then leaning into it, so a strong agreement here can become self-confirming in a way that a subtler theme would not. Worth reading alongside whatever the tension section says about flexibility.',
        ],
    }),
    themeUnit({
        key: 'flexible-improvisation',
        label: 'Flexible improvisation',
        headline: 'Several systems describe someone who works by adapting.',
        core: [
            'Where the systems agree on adaptability, they are describing how you get from a situation to an outcome rather than what outcomes you want. Improvisation is a method, and four traditions describing the same method is the kind of structural agreement worth taking seriously.',
            'This theme sits opposite structured method on a real axis, and both can be well supported in the same chart. That is not the systems contradicting each other; it is a person who does both, in different conditions. The tension section is where that gets read properly.',
        ],
    }),
    themeUnit({
        key: 'emotional-permeability',
        label: 'Emotional permeability',
        headline: 'Several systems describe someone who takes in more than they were sent.',
        core: [
            'Convergence here describes a person who registers the state of a room, absorbs atmosphere, and often knows something before there is any evidence for it. Several traditions have language for this and they arrived at it separately, which is a genuine observation about the systems rather than a measurement of anybody.',
            'It is worth reading carefully because permeability is easily mistaken for fragility, and they are not the same. The theme describes what gets in, not what breaks. Where it is well supported, the practical question is about the filter rather than the sensitivity - what you do with what arrives, not whether it should arrive.',
        ],
    }),
    themeUnit({
        key: 'emotional-containment',
        label: 'Emotional containment',
        headline: 'Several systems describe someone who keeps their weather private.',
        core: [
            'Containment is one of the harder themes to verify from inside, because a person who does it well has usually stopped noticing that they do it. Where several systems converge on it, the observation is worth putting to somebody who knows you rather than testing against your own sense of how expressive you are.',
            'The theme carries no judgement in either direction. Containment is a considerable asset in some settings and the specific reason a relationship failed in others, and nothing in the convergence tells you which of those has been happening.',
        ],
    }),
    themeUnit({
        key: 'outward-expression',
        label: 'Outward expression',
        headline: 'Several systems describe someone who works by saying it.',
        core: [
            'Where the systems agree on expression, they describe a person for whom something is not finished until it has been communicated. That is a claim about process rather than about volume - a quiet writer and a loud presenter can both sit squarely inside it.',
            'The agreement is easy to over-read as sociability. Expression is about the transmission and sociability is about the appetite for company, and a chart can be strong on one and thin on the other. Where both appear, they will show up as separate themes rather than as one.',
        ],
    }),
    themeUnit({
        key: 'creative-generation',
        label: 'Making and expressing',
        headline: 'The symbols point at producing something, not at a taste for the arts.',
        core: [
            'Creativity is the theme where the systems most often use the same word for different things, so support here is worth reading narrowly. What it describes is a pull toward making something that was not there and getting it out where it can be met - which is a need to produce rather than an aesthetic preference, and which is as likely to appear in a spreadsheet or a workshop as in anything anybody would call art.',
            'It is also the theme least well served by taking it as identity. Support here describes a capacity that shows up wherever it is used, frequently somewhere unglamorous, and says nothing about whether the person has ever thought of themselves as creative. Where it is thin, the honest reading is that these symbols do not speak to it - not that the person lacks it.',
        ],
    }),
    themeUnit({
        key: 'risk-appetite',
        label: 'Appetite for risk',
        headline: 'Several systems describe a tolerance for the unresolved.',
        core: [
            'Risk appetite is the theme most likely to be read as a prediction, and it is not one. What the convergence describes is a tolerance for outcomes that are not yet settled - which correlates with taking chances and is not the same thing, since plenty of people with a high tolerance are extremely careful about which chances they take.',
            'Where several systems agree, the useful check is historical rather than aspirational: not whether you feel bold, but what proportion of your decisions have been made with the information incomplete.',
        ],
    }),
    themeUnit({
        key: 'careful-consolidation',
        label: 'Careful consolidation',
        headline: 'Several systems describe someone who secures the ground before moving.',
        core: [
            'Convergence here describes caution as a working method rather than as a temperament - checking, securing, and preferring the outcome that can be relied on to the one that could be larger. Four traditions arriving at that separately is a structural observation about the chart.',
            'The theme is frequently read as timidity by people who do not carry it, and as prudence by people who do. Neither reading is in the data. What the agreement supports is only that the securing happens first, and not whether it happens too often.',
        ],
    }),
    themeUnit({
        key: 'conceptual-abstraction',
        label: 'Conceptual abstraction',
        headline: 'Several systems describe someone who reaches for the general case.',
        core: [
            'Where systems converge on abstraction, they describe a mind that moves from the instance to the pattern quickly, often before the instance has been fully examined. That is a real and unevenly distributed capacity, and it is the one most likely to be invisible to the person using it.',
            'It is worth holding alongside whatever the reading says about practicality, because the two are opposite ends of one axis and a chart can carry both. Somebody who thinks in general cases and works in concrete ones is a specific and quite common configuration rather than a contradiction.',
        ],
    }),
    themeUnit({
        key: 'steady-endurance',
        label: 'Steady endurance',
        headline: 'Several systems describe someone who is still there later.',
        core: [
            'Endurance is the least dramatic theme in the set and among the more consequential. Where the systems agree, they describe capacity sustained over time rather than intensity at any single point, which is the quality that most reliably separates a finished body of work from a promising one.',
            'It is also the theme with the weakest short-term evidence, by its nature. A reader cannot check this one against last week; the honest test is a decade, and until then it is a structural observation rather than something you can confirm.',
        ],
    }),
    themeUnit({
        key: 'social-visibility',
        label: 'Social visibility',
        headline: 'Several systems describe someone who tends to be seen.',
        core: [
            'Visibility describes position rather than desire. Where the systems agree, they are describing a person who ends up known about - in a family, a field, a room - which happens to plenty of people who did not seek it and would rather it had not.',
            'The convergence says nothing about whether the visibility is wanted or comfortable. Where it appears alongside a theme about privacy or internal processing, the two together are usually more informative than either alone, and that combination is common enough to be worth expecting.',
        ],
    }),
    /* ------------------------------------------------------------------ *
     * DRIVES - what support for one is worth, and what it is not
     *
     * Every one of these is easier to over-read than an operating theme, because
     * they describe wants rather than habits and a reader recognises a want in
     * almost any description of one. So each entry says what the support means
     * NARROWLY, and several say plainly what it is not.
     * ------------------------------------------------------------------ */
    themeUnit({
        key: 'mastery-and-depth',
        label: 'Mastery and depth',
        headline: 'The symbols point at wanting to be genuinely good at something.',
        core: [
            'What this describes is an appetite for depth rather than a level of skill. The symbols behind it - a Saturn, a seventh Life Path, a channel built on repetition, an earth-heavy chart - all say the same unremarkable thing: that doing something adequately is not experienced as having done it.',
            'The cost is the part worth knowing. An appetite for mastery makes the early, incompetent stretch of anything harder to tolerate than it is for other people, and it can turn into a reason not to start. Where this theme is strong, the question is rarely whether the standard is high enough.',
        ],
    }),
    themeUnit({
        key: 'results-and-ambition',
        label: 'Results and ambition',
        headline: 'The symbols point at wanting the thing built, finished or won.',
        core: [
            'This is the drive toward an outcome that exists outside the person: something delivered, earned, owned or completed. It is not a claim about how much money somebody wants, and the systems that carry it - an eighth number, a Wealth star, a Capricorn emphasis, a channel of material control - are describing where satisfaction lands rather than how much of it is needed.',
            'Read it against the operating themes rather than on its own. The same drive looks entirely different behind a careful method and behind an improvising one, and the combination is usually more informative than either half.',
        ],
    }),
    themeUnit({
        key: 'being-recognised',
        label: 'Being seen for it',
        headline: 'The symbols point at needing the contribution acknowledged.',
        core: [
            'Recognition reads badly in English - it sounds like vanity - and that is not what the symbols say. What they describe is a mechanism: work that is done, offered and then not registered by anybody produces a particular kind of flatness here, and the same work acknowledged produces momentum out of proportion to the acknowledgement.',
            'Where this appears with a Human Design Projector, or a fifth line, it is structural rather than emotional: those mechanics run on being invited and being seen, and treating the need as a character flaw is the most common misreading of them.',
        ],
    }),
    themeUnit({
        key: 'meaning-and-purpose',
        label: 'Meaning and purpose',
        headline: 'The symbols point at needing the larger point of the thing.',
        core: [
            'This is the appetite for the frame around the work rather than the work itself. Where it is supported, a well-paid, well-organised arrangement with no answer to "what is this for" tends to fail on that ground alone, and usually later than it should - the question is rarely asked out loud until something forces it.',
            'It is not the same as belief, and none of the four systems is claiming anything about religion. The nearest honest translation is that explanations have to reach a certain size before they satisfy this chart.',
        ],
    }),
    themeUnit({
        key: 'closeness-and-belonging',
        label: 'Closeness and belonging',
        headline: 'The symbols point at wanting to be part of something, with particular people.',
        core: [
            'What this describes is a need for attachment that has a shape: specific people, a specific group, a place to come back to. It is not sociability - a chart can want closeness and dislike company - and the model reports those as separate themes for exactly that reason.',
            'Where it is strong, the useful check is what the person protects when they are under pressure. A drive toward belonging shows up most clearly in what does not get sacrificed.',
        ],
    }),
    themeUnit({
        key: 'room-to-move',
        label: 'Room to move',
        headline: 'The symbols point at needing space rather than a fixed shape.',
        core: [
            'This is the need for an arrangement that can be changed from the inside: not necessarily solitude, and not necessarily travel, but the ability to move without asking. The symbols behind it - a five in the numbers, a Manifestor mechanic, an Uranus or Sagittarius emphasis - describe the constraint that is hardest to tolerate rather than the direction that is most wanted.',
            'Read with a theme of structure it becomes a real tension, and a productive one: the chart wants a frame it can still get out of. Read with a drive toward belonging it describes the arrangement most people carrying it eventually have to negotiate explicitly.',
        ],
    }),
    themeUnit({
        key: 'looking-after',
        label: 'Looking after things',
        headline: 'The symbols point at being drawn to what needs tending.',
        core: [
            'Care here means responsibility taken rather than kindness felt. The systems carrying it describe somebody who notices what is not being held and picks it up - people, work, a standard, an institution - often before deciding whether they wanted to.',
            'Its shadow is in the same sentence. A drive to look after things is the easiest of all of these to be used by other people, and the most common way it goes wrong is that it is never asked for and never refused.',
        ],
    }),
    themeUnit({
        key: 'wanting-to-understand',
        label: 'Wanting to understand',
        headline: 'The symbols point at needing to know why, for its own sake.',
        core: [
            'This is curiosity as an appetite rather than as a method: the difference between being able to analyse something and not being able to leave it alone. Where it is supported, explanation is a need rather than a tool, and a satisfying account of something useless can be worth more than a rough account of something urgent.',
            'It pairs with almost anything and changes what that thing looks like. Behind a practical style it produces someone who has to know how the machine works before using it; behind an expressive one, someone who explains as a way of finishing the thought.',
        ],
    }),
    themeUnit({
        key: 'form-and-craft',
        label: 'Form and craft',
        headline: 'The symbols point at sensitivity to how a thing is made.',
        core: [
            'What this describes is a response to form - proportion, finish, the way something sits - that operates as a standard rather than as a preference. Where it is supported, things that work but are ugly, or are right but badly made, produce a specific irritation that other people often read as fussiness.',
            'It is a narrow claim and worth keeping narrow. It says nothing about artistic training, or taste in any particular direction, and it is reported separately from the drive to make things because a chart can carry either without the other.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * AXES - what disagreement on each one is worth
 * ------------------------------------------------------------------ */
const axes = [
    axisUnit({
        key: 'inner-focus',
        label: 'Inner focus',
        headline: 'Systems split on whether attention runs inward or outward.',
        core: [
            'One or more systems describe a person who processes privately; one or more describe a person who processes in contact with the world. Both readings are drawn from the same birth data, which means the disagreement is in the systems rather than in the person.',
            'The usual resolution is context. Most people who carry this split are inward in one domain and outward in another, and the useful question is which is which - not which system is correct.',
        ],
    }),
    axisUnit({
        key: 'reasoning',
        label: 'Reasoning mode',
        headline: 'Systems split between working it out and simply knowing.',
        core: [
            'A disagreement on this axis describes a chart with both analytic machinery and something faster that arrives without showing its working. That combination is genuinely awkward to live with, because the two produce answers at different speeds and the fast one is harder to defend.',
            'Where the split is close to even, the reading worth having is not which faculty is real but which one you default to under pressure - and whether that default is the one the situation needed.',
        ],
    }),
    axisUnit({
        key: 'autonomy',
        label: 'Autonomy',
        headline: 'Systems split between going alone and going with.',
        core: [
            'This is the most commonly split axis in the whole model, and a near-even split here is worth more attention than a lopsided one. It describes a person genuinely pulled both ways rather than one who is independent and occasionally cooperative.',
            'Charts carrying this tension tend to alternate rather than blend - long independent stretches punctuated by deep collaboration, or the reverse - and the difficulty is usually in the transitions rather than in either state.',
        ],
    }),
    axisUnit({
        key: 'structure',
        label: 'Structure',
        headline: 'Systems split between building it and improvising it.',
        core: [
            'A split here describes someone who can work either way and will be told, by different people at different times, that they are rigid and that they are unreliable. Both observers are describing a real half of the same chart.',
            'The practical reading is about matching mode to situation rather than resolving the tension. Where this axis is contested, the recurring cost is applying the wrong one - improvising something that needed a system, or systematising something that needed a decision.',
        ],
    }),
    axisUnit({
        key: 'risk',
        label: 'Risk posture',
        headline: 'Systems split between securing and chancing.',
        core: [
            'A contested risk axis describes a chart that neither consistently protects nor consistently gambles. In practice that often reads as caution in the domains a person knows well and considerable boldness in the ones they do not, which looks inconsistent from outside and is quite coherent from inside.',
            'Where the split is even, the reading is a caution about self-description. People with this configuration are unusually unreliable narrators of their own risk appetite, because whichever mode they are currently in feels like the whole truth.',
        ],
    }),
    axisUnit({
        key: 'emotional-expression',
        label: 'Emotional expression',
        headline: 'Systems split between showing it and holding it.',
        core: [
            'A split on this axis describes someone whose expressiveness varies by audience rather than being a fixed setting - which is ordinary, and worth naming because the two halves can look like inconsistency to people who only ever see one.',
            'What it does not describe is suppression. Containment and expression are both active strategies here, and a chart that carries both usually has clear if unexamined rules about which situations get which.',
        ],
    }),
    axisUnit({
        key: 'visibility',
        label: 'Visibility',
        headline: 'Systems split between being known and being private.',
        core: [
            'This split is common and frequently uncomfortable. It describes a chart that draws attention and does not straightforwardly want it, or one that is private by preference and public by circumstance.',
            'The tension rarely resolves by choosing. What tends to work instead is a deliberate boundary - a public face that is genuine but partial - and charts with this axis contested tend to arrive at that arrangement eventually whether or not they planned it.',
        ],
    }),
    axisUnit({
        key: 'change',
        label: 'Appetite for change',
        headline: 'Systems split between holding steady and moving on.',
        core: [
            'A contested change axis describes someone who wants both the settled thing and the new one, sincerely, at the same time. That is not indecision; it is two real appetites with no natural priority between them.',
            'The characteristic pattern is long stability broken by sudden and complete change, rather than steady moderate movement. Knowing that in advance makes the sudden part considerably less alarming when it arrives.',
        ],
    }),
    axisUnit({
        key: 'initiative',
        label: 'Initiative',
        headline: 'Systems split between moving first and waiting to be moved.',
        core: [
            'A split here describes a chart with both an assertive and a receptive setting, and the interesting question is what switches between them. The model cannot answer it: it can see that both settings are supported and roughly how heavily, and nothing in it records which situations call up which. That is the part worth watching for yourself.',
            'It is worth reading against whatever the systems say about autonomy, because the two axes are related and not the same: a person can be highly independent and consistently receptive, which sounds contradictory and is a recognisable way to operate.',
        ],
    }),
    axisUnit({
        key: 'abstraction',
        label: 'Abstraction',
        headline: 'Systems split between the general case and the thing in front of you.',
        core: [
            'A contested abstraction axis is one of the more productive splits in the model. It describes someone who can move between the pattern and the instance, which is the combination behind most useful design, teaching and diagnosis.',
            'Where it goes wrong is at the handover: the conceptual half proposes something the practical half then has to build, and charts with this tension are frequently their own difficult client.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * METHOD - how to read the whole thing
 * ------------------------------------------------------------------ */
const concepts = [
    conceptUnit({
        key: 'what-agreement-means',
        label: 'What agreement between systems means',
        headline: 'Four systems saying the same thing is a fact about the systems.',
        core: [
            'This section reads four symbolic systems against each other. They were built in different traditions, in different centuries, from different inputs: a name and a date reduced through arithmetic, the positions of the planets, a sexagenary calendar keyed to solar terms, and a graph of defined and undefined centres. None of them can see the others as this reading is computed.',
            'When several of them converge on the same idea, the claim being made is precisely this and no more: four symbolic frameworks describe this birth data in similar terms. They are not independent of each other - they read the same birth data, they have borrowed from one another for centuries, and the interpretations here were written by one hand - so agreement between them is not corroboration in the sense a measurement would be. It is genuinely interesting, and it is not evidence that the described trait exists, has been measured, or predicts anything. A reading built from four systems is still a reading, and four agreeing traditions are not four experiments.',
            'What convergence is good for is prioritisation. It tells you which parts of a long reading to test against your own life first, and which parts rest on one system alone and should be held more loosely.',
        ],
    }),
    conceptUnit({
        key: 'what-tension-means',
        label: 'What disagreement between systems means',
        headline: 'A split is information, not an error to be resolved.',
        core: [
            'Where the systems disagree, the model does not pick a winner. Two traditions describing opposite poles of the same axis from the same birth data is a real finding about the reading, and averaging them would destroy the only interesting thing about it.',
            'The model separates three cases. A TRUE TENSION is a close, well-supported split on an axis where holding both sides at once is genuinely difficult. A CONTEXTUAL DUALITY is a split where carrying both is ordinary - most people are cautious about some things and bold about others - and the reading is about which context gets which. A WEAK CONFLICT is a disagreement with too little behind one side to be worth much, and is reported quietly or not at all.',
            'Of the three, the true tensions are where the useful material usually is. A chart with no tensions at all is not a well-integrated person; it is more often a chart the systems simply have less to say about.',
        ],
    }),
    conceptUnit({
        key: 'how-support-is-weighed',
        label: 'How support is weighed',
        headline: 'Not every agreement counts equally, and the discounts are stated.',
        core: [
            'Each piece of evidence is weighted by five things before it counts toward anything: how strongly the position speaks in its own system, how much of the relevant quality the authored reading actually carries, whether the interpretation is an established one or a contested one, how settled that reading is within its tradition, and whether it depended on a birth time that was estimated rather than known.',
            'Evidence from the same source is then discounted. Four astrology placements that all say the same thing because they are all aspects to the same planet are not four independent witnesses, and counting them as four is the commonest way a synthesis inflates its own confidence. The corroborating items still count; they count considerably less.',
            'A theme also carries its counter-evidence rather than hiding it. Where the material arguing against a theme outweighs the material arguing for it, the theme is reported as weak no matter how much support it accumulated, because the honest reading of that situation is a contested axis rather than a finding.',
        ],
    }),
    conceptUnit({
        key: 'single-system-caution',
        label: 'When only one system says it',
        headline: 'A theme carried by one tradition is a lead, not a conclusion.',
        core: [
            'Some themes below rest on a single system. They are shown because a reading that hides everything except its strongest claims is less useful than one that labels its confidence, and because a single-system observation is often the most specific thing in a chart.',
            'What they should not be given is the weight of a convergence. Where one tradition says something the other three are silent about, the most likely explanations are that the other three have no vocabulary for it - which is common and not a failure - or that the one system is over-reading a small signal. Nothing in the model can tell those apart.',
        ],
    }),
    conceptUnit({
        key: 'nothing-strong-found',
        label: 'When nothing converges strongly',
        headline: 'A quiet result is a real result and is reported as one.',
        core: [
            'For some charts no theme reaches strong or moderate support. That is a legitimate outcome rather than a failure of the calculation, and it is reported plainly instead of being filled in by promoting the best of the weak themes.',
            'What it usually describes is a chart whose systems point in genuinely different directions rather than a person with no character. The tensions section is generally the more informative part of a reading like this, and the individual pillar readings will each still have a great deal to say on their own terms.',
        ],
    }),
    conceptUnit({
        key: 'estimated-birth-time',
        label: 'Reading this without a birth time',
        headline: 'Without a birth time, only what the birth date settles is read.',
        core: [
            'No birth time was supplied, so Western Astrology and Human Design were each checked across the whole birth date, and only what is the same at every hour of it counts here: the planets that stay in one sign all day, the aspects that hold all day, and the Human Design centres and channels that are fixed whatever the hour.',
            'What changes with the hour - the Ascendant and the houses, a planet that changes sign that day, most of the Human Design mechanics - is left out rather than guessed. BaZi does not invent an Hour Pillar, so its contribution is drawn from three pillars rather than four and counts for a little less. Numerology does not use a birth time at all and is unaffected.',
            'The practical consequence is that this reading rests on fewer facts than it would with a known birth time, not on guessed ones. Supplying a birth time later will add to it, and can change the parts that depend on the hour.',
        ],
    }),
    conceptUnit({
        key: 'pillar-unavailable',
        label: 'Reading this with a system missing',
        headline: 'What the synthesis can and cannot do with fewer than four.',
        core: [
            'One or more of the four systems could not be calculated, so the convergence counts below are drawn from a smaller set. A theme described as carried by two systems out of two is a materially weaker observation than the same theme carried by two out of four, and the coverage figures are shown so that the difference is visible rather than implied.',
            'Nothing is substituted for the missing system and no theme is promoted to compensate. Where the absence removes the only tradition that had vocabulary for something, that material is simply not in this reading, and the individual pillar readings for the systems that did calculate remain complete and unaffected.',
        ],
    }),
];
export const CROSS_PILLAR_COMMENTARY = [...themes, ...axes, ...concepts];
/** Exported so the completeness guard can run against the engine's own sets. */
export const COMMENTED_THEME_IDS = themes.map((unit) => unit.entity.key);
export const COMMENTED_AXIS_IDS = axes.map((unit) => unit.entity.key);
