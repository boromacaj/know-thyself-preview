/*
 * WHICH WAY THE LUCK PILLARS RUN, AND WHEN THAT CANNOT BE ANSWERED.
 *
 * THE BUG THIS FILE EXISTS TO FIX.
 * The first version of the forecast read `luckPillars.forward` for everybody. It
 * did so because the BaZi engine publishes both sequences and refuses to pick
 * one, and picking the first was mistaken for a neutral default. It is not
 * neutral: it is an answer, and for Boris - male, born under the Yin stem Ding -
 * it is the WRONG answer. The rule gives `reverse`, so his forecast was built on
 * Ren Zi when his actual ten-year chapter is Jia Chen. That is the single
 * heaviest long-band fact in the reading, silently wrong.
 *
 * THE RULE IS NOT INVENTED HERE.
 * bazi/luckPillars.ts states it in its own words: direction "traditionally
 * depends on Year Stem Yin/Yang polarity combined with the person's
 * gender/sex". This file implements exactly that sentence and nothing more:
 *
 *     Yang year stem + male    -> forward
 *     Yang year stem + female  -> reverse
 *     Yin  year stem + male    -> reverse
 *     Yin  year stem + female  -> forward
 *
 * which is the same statement as: forward when the stem's Yang-ness and the
 * body's maleness agree.
 *
 * THE ENGINE IS NOT CHANGED, ON PURPOSE.
 * It keeps publishing both sequences and asserting neither, because that is the
 * honest thing for a natal chart to do and because the reference BaZi result
 * this project pins depends on its output being exactly what it is. The forecast
 * is the only consumer that needs a single sequence, so the choice is made here,
 * where the reason can travel with it in provenance.
 *
 * AND WHERE THE TRADITION HAS NO ANSWER, NEITHER DO WE.
 * The onboarding's third option is a body deliberately left undefined. The rule
 * takes a binary and there is no doctrine for the third case, so nothing is
 * chosen: the luck pillar is WITHHELD from the forecast entirely, with the
 * reason recorded. Defaulting to forward there would be the same mistake this
 * file was written to undo, made a second time and on purpose.
 */
export const LUCK_DIRECTION_RULE = 'Year Stem Yin/Yang polarity combined with the body selected at onboarding '
    + '(Yang+male and Yin+female run forward; Yang+female and Yin+male run reverse).';
/**
 * The direction for this chart, or null when the tradition does not supply one.
 *
 * `yearStemPolarity` comes from the natal year pillar the BaZi engine already
 * calculated; nothing is recomputed here.
 */
export function resolveLuckDirection(yearStemPolarity, vessel) {
    if (!yearStemPolarity) {
        return {
            direction: null,
            code: 'polarity-missing',
            rule: LUCK_DIRECTION_RULE,
            reason: 'The natal year pillar could not be calculated, so its stem polarity is unknown.',
        };
    }
    if (vessel !== 'male' && vessel !== 'female') {
        return {
            direction: null,
            code: vessel === 'undefined' ? 'vessel-undefined' : 'vessel-missing',
            rule: LUCK_DIRECTION_RULE,
            reason: vessel === 'undefined'
                ? 'The body was deliberately left undefined at onboarding. The traditional rule takes a '
                    + 'binary and no school extends it, so the direction is left unresolved rather than '
                    + 'guessed, and the ten-year cycle is withheld from this reading.'
                : 'No body selection reached the forecast, so the direction cannot be resolved.',
        };
    }
    const forward = (yearStemPolarity === 'Yang') === (vessel === 'male');
    return {
        direction: forward ? 'forward' : 'reverse',
        code: 'resolved',
        rule: LUCK_DIRECTION_RULE,
        reason: `${yearStemPolarity} year stem with a ${vessel} body runs `
            + `${forward ? 'forward' : 'reverse'}.`,
    };
}
