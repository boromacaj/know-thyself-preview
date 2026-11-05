/**
 * THE CARD AS A READER WRITES IT - the human-readable layer above the semantic model.
 *
 * The semantic model (tarotMajorSemantics, tarotMinorSemantics) says what a card DOES in
 * language-free dimensions, so that cards can be compared. The fragments (tarotCardVoice*)
 * are noun and verb phrases for the daily reading. The detail paragraphs
 * (content/detail) are two short paragraphs for the card dialog. None of them can carry a
 * perceptive reading of one card in one place, and none of them is a description of the
 * card as an archetype a person would want to read.
 *
 * This layer adds exactly that, and nothing that duplicates the model:
 *
 *   essence       one sentence: what the card is, for a tight space
 *   description   80-160 words: the card as an archetype or dynamic, for a card page
 *   stake         a bare noun phrase: what the card puts forward. It is dropped into
 *                 elliptical frames ("On one side X, on the other Y"), so it must read
 *                 as a nominative noun phrase with no article, never as a sentence
 *   question      the one question the card poses, for a reading that earns a question
 *   lines         the card READ IN A PLACE: one entry for each kind of place a spread
 *                 can ask a card to fill. This is what makes the same card say
 *                 different things as an origin, a problem, a cause, a way forward
 *                 and a direction instead of the same sentence under a new heading
 *
 * Line placeholders (exactly one per line):
 *   {card}   the card's name as the SUBJECT OF A SENTENCE ("The Devil", "Eight of Pentacles",
 *            "Karta Diabol")
 *   {mid}    the card's name inside a sentence ("the Devil", "Eight of Pentacles", "karta Diabol")
 *
 * NOTHING HERE PREDICTS. A line says what a card shows in its place, never what will occur,
 * never what a person privately thinks, never a diagnosis, amount or event.
 */
export const READER_LINE_GROUPS = ['origin', 'state', 'driver', 'response', 'direction', 'other'];
