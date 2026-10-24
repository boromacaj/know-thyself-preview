/**
 * THE CROSS-PILLAR READING MODEL.
 *
 * The synthesis foundation stops at a structured model and says so explicitly:
 * "No prose is generated here and none should be added here: a narrative
 * composer belongs on top of this output, reading it, never bypassing it."
 * This is that composer's output shape.
 *
 * It deliberately mirrors the pillar reading model rather than inventing a
 * second presentation vocabulary - same idea of ordered sections, standfirsts
 * and entries, same discipline that a missing section renders as nothing rather
 * than as a heading with an apology under it.
 *
 * WHAT SEPARATES THE TWO KINDS OF SENTENCE IN HERE
 *
 * Every paragraph is one of exactly two things, and the model keeps them apart
 * because conflating them is how a synthesis layer starts inventing:
 *
 *   AUTHORED   commentary from the knowledge layer about what agreement or
 *              disagreement means. Written in advance, provenance attached,
 *              identical for every reader who lands on that theme.
 *   STRUCTURAL a statement of fact about THIS chart - which systems converged,
 *              how many, what the counter-evidence was. Generated, but only
 *              ever reporting numbers the foundation already calculated.
 *   VOICE      the reading said to the reader. Also written in advance, in
 *              `themeVoice`, and also never generated - but keyed by theme or
 *              axis rather than by knowledge unit, because it is a rendering of
 *              a conclusion the model reached rather than a piece of the
 *              tradition's own commentary.
 *
 * There is no fourth category, and in particular there is no category for
 * prose this layer composed itself. Every sentence a reader meets was written
 * by somebody in advance or is a count.
 *
 * WHY VOICE IS NOT JUST `AUTHORED`
 * Provenance. An authored paragraph resolves to a knowledge unit that can be
 * quoted back; a voice line resolves to the theme it speaks for, which is the
 * thing a reader disputing it would actually want to see the evidence for. The
 * two point at different places and conflating them would make one of them
 * untraceable.
 */
/*
 * The synthesis is the culmination of the four pillars, not a fifth pillar, and
 * the order says so. It opens on a portrait of the person rather than on a
 * description of its own method; the method moves below the reading, and the
 * arithmetic behind it moves out of the reading altogether into Technical
 * details.
 */
/*
 * THE ORDER A READER MEETS THIS IN.
 *
 * It used to open on `orientation` - four paragraphs explaining what four
 * symbolic traditions are, how evidence is weighted, and how source discounting
 * works - before the reader had been told one thing about themselves. That is a
 * model describing its own methodology, and it was the first thing on the
 * screen.
 *
 * The finding comes first now. Everything from `portrait` to `limits` is the
 * reading; the two sections after it are the workings, and they are marked
 * collapsed so a reader who wants them can open them and a reader who does not
 * is not made to scroll past them.
 *
 * Nothing was deleted to achieve that. `orientation` and `domains` carry
 * exactly the text they carried before, in a different place.
 */
export const SYNTHESIS_SECTION_ORDER = [
    /*
     * WHAT IS WRONG WITH THE INPUTS, BEFORE ANY READING OF THEM.
     *
     * A missing birth time or a system that could not be calculated has to reach
     * the reader ahead of the findings it weakens, so this is first and is never
     * collapsed. It used to open the portrait itself, which meant a profile with
     * no birth time met three paragraphs about local-noon estimates under the
     * heading `The short version` before one word about themselves. Same text,
     * same position in the scroll, its own heading.
     */
    'caveats',
    /* The combined portrait: what the complete picture says, in prose. */
    'portrait',
    /*
     * WHAT DRIVES YOU, BEFORE HOW YOU OPERATE.
     *
     * The reading used to have one ranked list of themes, and because the
     * taxonomy only held behavioural dimensions, that list was always a
     * description of method: structured, independent, analytical, adaptable. A
     * person is not only a method, and the order here says which half a reader
     * meets first.
     */
    'drives',
    'convergence',
    'tensions',
    'practical',
    /* Three things worth keeping, for the reader who reads nothing else. Moved
       after `practical`: a distillation belongs at the end of the reading it
       distils, not in the middle of it. */
    'takeaways',
    'limits',
    /* ---- below here the reader has to open something ---- */
    /*
     * WHERE THE READING'S OWN WORKING WENT.
     *
     * Every theme and split the model reported, with the results behind it, what
     * each result contributes, and the authored commentary on what agreement on
     * that theme is worth. This is what the reading used to BE. It is accurate
     * and it is a description of a chart, so it is one disclosure away from a
     * reading that describes a person.
     */
    'why',
    /* How the reading was built: traditions, weighting, discounting, thresholds
       and the tension taxonomy. */
    'orientation',
    /* Which area of life each theme files under. Useful, and an index rather
       than a reading. */
    'domains',
    /* Every theme the model produced, with its facet, kind, salience, pillar
       count and where each tradition stood - including the ones that said
       nothing. The ranking, in full, for anyone who wants to check it. */
    'support-table',
];
/** Sections a reader opens rather than scrolls past. */
export const COLLAPSED_SECTIONS = new Set(['why', 'orientation', 'domains', 'support-table']);
/*
 * HOW MANY OF EACH THE READING SHOWS BEFORE IT STOPS.
 *
 * The model found six convergences and six tensions for the profile this was
 * measured on, and printed all twelve: 584 words of agreement followed by 952
 * of disagreement, ranked but undifferentiated, in the middle of the hero
 * reading. A list of everything is not a finding.
 *
 * Three and four, because they are already sorted by weight - the sixth
 * convergence is the sixth because the model rated it sixth, and the reader who
 * wants it is one tap away. Tensions get the extra slot: they are the part of
 * the reading that is genuinely about this person rather than about the
 * systems, and the brief's own range for them is two to four.
 */
export const VISIBLE_CONVERGENCES = 3;
export const VISIBLE_TENSIONS = 4;
/**
 * How many drives the reading names.
 *
 * Four at the outside, and only the ones that cleared the visible floor. A
 * person has two or three things they are actually for; a list of ten reads as
 * a horoscope, and a taxonomy rich enough to describe motivation is exactly the
 * kind that will hand one out if nobody caps it.
 */
export const VISIBLE_DRIVES = 4;
/**
 * How much has to be behind a drive before the reading names it.
 *
 * Higher than the model's own floor, and for a different job. The model keeps
 * every theme it can justify, because Technical details should show the whole
 * ranking. The READING is a claim about a person, and a drive resting on one
 * light source in one tradition is not one worth making - it is the sentence
 * that would make every profile slightly creative and slightly ambitious.
 *
 * Measured across the QA matrix, this leaves each profile with two to four
 * drives out of ten, and different ones.
 */
export const VISIBLE_DRIVE_SALIENCE = 1.2;
