/*
 * WHAT EACH NUMBER BRINGS, AND WHAT IT WANTS.
 *
 * This is the vocabulary the core-number interactions are composed from. It is
 * NOT a second set of number meanings: the readings live in
 * numerologyLifePaths.ts and numerologyNameRoles.ts and are the authority. This
 * is those readings compressed to the two or three facts a SECOND number needs
 * in order to say something specific about meeting the first.
 *
 * WHY A MODEL RATHER THAN A TABLE
 * Life Path against Expression alone is 144 pairs, and the four core positions
 * against each other are over eight hundred. Hand-writing those produces a
 * table nobody reads twice and which rots the moment a number's own reading is
 * revised. What actually varies between pairs is small and describable: what
 * each number pushes toward, at what tempo, whether it works outward or inward,
 * and what it cannot supply for itself. Given those, the interaction is
 * derivable and stays specific, because the sentence names both numbers'
 * actual material rather than a shared abstraction.
 *
 * WHERE IT COMES FROM
 * Balliett's 1908 number characters are the historical floor - the 1 that
 * begins, the 4 that labours, the 6 that keeps a household, the 7 that
 * withdraws to understand - and the four-position structure this app reads them
 * in (Life Path, Expression, Soul Urge, Personality) is the twentieth-century
 * convention rather than anything she wrote. The provenance on the units says
 * so; see bibliography.ts.
 */
const t = (drive, tempo, facing, brings, needs) => ({ drive, tempo, facing, brings, needs });
/**
 * The nine roots, plus the three master numbers the engine reports.
 *
 * A master number carries its root's temperament at a higher tempo and a wider
 * facing, which is why 11 is not simply a 2: the attunement is the same and the
 * scale it is asked to work at is not.
 */
export const TEMPERAMENT = {
    1: t('initiate', 'fast', 'outward', 'starts things and carries the decision alone', 'somebody to stay with the middle of it'),
    2: t('attune', 'slow', 'inward', 'reads the room and works through other people', 'a moment where it states its own position'),
    3: t('express', 'fast', 'outward', 'finds the version of a thing that other people can take in', 'a deadline set by somebody else'),
    4: t('consolidate', 'slow', 'outward', 'builds what holds and does the part nobody volunteers for', 'a reason to stop before the work is finished'),
    5: t('change', 'fast', 'outward', 'keeps the options open and learns by moving', 'one thing it will not walk away from'),
    6: t('tend', 'steady', 'both', 'takes responsibility for whether the people around it are all right', 'permission to be looked after in return'),
    7: t('understand', 'slow', 'inward', 'goes underneath the first answer and stays there', 'a reason to come back out and say what it found'),
    8: t('command', 'steady', 'outward', 'handles consequence and can be trusted with the size of a thing', 'something it is doing this for beyond the doing'),
    9: t('release', 'steady', 'both', 'sees the whole of a situation and lets go of its own claim on it', 'a smaller circle that has a right to ask things of it'),
    11: t('attune', 'fast', 'both', 'senses what is coming before there is evidence for it', 'a way to say it that does not sound like a claim'),
    22: t('consolidate', 'steady', 'outward', 'builds at a scale that outlasts the person building it', 'the ordinary day the scale is made of'),
    33: t('tend', 'steady', 'both', 'gives care as a practice rather than as a response', 'somewhere the giving is allowed to stop'),
};
/** Drives that push the same way, so two of them compound rather than balance. */
const FAMILY = {
    initiate: ['initiate', 'command', 'change'],
    attune: ['attune', 'tend'],
    express: ['express', 'change'],
    consolidate: ['consolidate', 'command'],
    change: ['change', 'express', 'initiate'],
    tend: ['tend', 'attune', 'release'],
    understand: ['understand'],
    command: ['command', 'initiate', 'consolidate'],
    release: ['release', 'tend', 'understand'],
};
/**
 * The relation between two numbers, from their temperaments alone.
 *
 * Deliberately decided in this order. Identity first, because the same number
 * twice is its own case and reads nothing like two similar numbers. Then
 * family, because a shared direction compounds whatever either would have done
 * alone. Then the two ways a pair can genuinely disagree - tempo and facing -
 * which is friction rather than difference. What is left over is the
 * complementary case, where each covers the other's gap.
 */
export function relationBetween(left, right) {
    const a = TEMPERAMENT[left];
    const b = TEMPERAMENT[right];
    if (!a || !b)
        return null;
    if (left === right)
        return 'same';
    if (FAMILY[a.drive].includes(b.drive) || FAMILY[b.drive].includes(a.drive))
        return 'reinforcing';
    const tempoGap = Math.abs(['slow', 'steady', 'fast'].indexOf(a.tempo)
        - ['slow', 'steady', 'fast'].indexOf(b.tempo));
    const facingClash = (a.facing === 'outward' && b.facing === 'inward')
        || (a.facing === 'inward' && b.facing === 'outward');
    if (tempoGap >= 2 || facingClash)
        return 'crosswise';
    return 'complementary';
}
/** The root a master number carries. Null for the roots themselves. */
export const MASTER_ROOT = { 11: '2', 22: '4', 33: '6' };
