/*
 * WHAT A SPLIT LOOKS LIKE IN AN ORDINARY SITUATION - THE SYNTHESIS NARRATIVE'S OWN TABLE.
 *
 * The collision rules in `mechanismRules.ts` are keyed by a pair of lexicon tags
 * and cover about twenty pairs. Over the review corpus three of them (`autonomy +
 * calibration`, `method + improvisation`, `autonomy + receptivity`) accounted for
 * more than half of every split written, so two profiles with different elements
 * under the same axis were told the same situation.
 *
 * This table adds the pairs the rules do not cover, KEYED BY AXIS AS WELL AS PAIR
 * (the same two tags mean different things on the structure axis and on the change
 * axis), so that the situation chosen follows the elements the footnote shows. It
 * is English-only editorial writing and is not read by the legacy reading, whose
 * output is unchanged.
 *
 * RULES FOR AN ENTRY
 *   - Two or three sentences: the meeting, a recognisable situation or consequence,
 *     and where the judgement sits. No biography, no career, no relationship, no
 *     diagnosis, no prediction.
 *   - Said as a tendency (`tends to`, `often`, `can`), never as a fact about the reader.
 *   - Written so it can follow the axis's own voice sentence without repeating it.
 *   - Every pair must be a pair of tags that belong to opposite poles of the axis
 *     (`POLE_TAGS`); a test holds the table to that.
 *
 * Key: the two tags, alphabetical, joined by `+`.
 */
export const SITUATIONS = {
    structure: {
        'improvisation+refinement': 'The first version gets made quickly and then picked at for a long time. The strain shows in what counts as finished: a draft that works is rarely quite the thing that was meant, and it helps to decide in advance which of the two is due.',
        'improvisation+standards': 'A high bar and a habit of changing course are hard to keep in one head. Work gets restarted because it fell short of the standard rather than because it failed, and the restarts can pass for flexibility when they are closer to perfectionism with a new plan.',
        'improvisation+verification': 'Checking and improvising run on different clocks: one wants to confirm before moving and the other to move and see. It tends to end with the checks done after the fact, which works until a decision cannot be undone.',
        'method+speed': 'There is a method, and there is a pace that outruns it. Steps get skipped when something seems obvious and are quietly rebuilt later, so the method looks unreliable when it is mostly being overtaken.',
        'foundation+speed': 'The wish for solid ground and the wish to get moving each want to go first. Things get started on foundations that are not quite laid, and the cost is usually a pause partway through to lay them properly.',
        'refinement+speed': 'One half wants to get it right and the other wants it done. The result is often work that is quick where it does not matter and slow in the one place that does, and choosing that place is where the judgement sits.',
        'speed+standards': 'A high standard and a quick hand rarely agree on when a piece of work is ready. What usually settles it is a deadline from outside, because neither half is likely to call time on the other.',
        'speed+verification': 'Moving first and checking afterwards is a real habit here, and the checking is genuine when it comes. What it needs is a point before commitment at which the check can still change the decision.',
    },
    autonomy: {
        'calibration+control': 'Wanting to be the one who decides and wanting everyone on side pull on the same moment. A decision is often made carefully alone and then softened in the telling, which can leave other people unsure where you actually stand.',
        'calibration+privacy': 'Keeping things to yourself and reading other people closely sit together uneasily: a lot gets noticed and little gets said. Others may feel read without being let in, and a direct question is usually what opens it.',
        'privacy+receptivity': 'A private way of working sits beside real openness to what others bring. The input lands, but it is taken away to be dealt with alone, so other people may not see that it changed anything.',
    },
    change: {
        'endurance+exposure': 'Staying power and an appetite for the new compete for the same energy. Projects get carried a long way and then dropped for something fresh, or kept going long after the interest has gone, and it is hard to say in the moment which of the two is happening.',
        'endurance+speed': 'Steady effort meets a wish to move quickly. The steadiness tends to win on long projects and the speed on short ones, so the trouble is the middle-sized job that belongs to neither.',
        'exposure+foundation': 'Something solid to stand on and a willingness to put it at risk both matter. Foundations get built properly and then tested harder than they were meant to be, which is either the point or a waste depending on the day.',
        'foundation+speed': 'The ground is meant to last and the pace keeps outrunning it. Things get built on foundations that are still being laid, which works when the plan is allowed to change underneath.',
    },
    reasoning: {
        'embodiment+investigation': 'The question is explored in depth while some other part has already answered. Digging carries on past the point where the answer was felt, and it is not always clear whether the digging is testing the answer or avoiding it.',
        'abstraction+embodiment': 'A principle and a gut sense reach different conclusions at different speeds. The principle is easier to defend and the gut sense is often the one that turns out right, which makes defending the decision harder than making it.',
        'investigation+receptivity': 'Going into a question and letting it come to you both feel like thinking. One is effortful and the other patient, and a useful sign is whether the answer is still there after a night’s sleep.',
        'receptivity+verification': 'Impressions arrive first and checking follows. Taking in the atmosphere of a situation and then testing it against the facts works well, provided the impression is allowed to be wrong.',
        'abstraction+receptivity': 'Seeing the general pattern and sensing the particular moment compete for attention. The pattern can explain a situation that the moment shows to be different, and holding both is most of the skill.',
    },
    initiative: {
        'receptivity+speed': 'The pull to act first and the pull to see what the situation asks for alternate. Moving too soon costs a correction and waiting too long costs the moment, and which one it was tends to show only afterwards.',
        'deliberation+expression': 'Saying it and waiting to be sure are at odds. Speech comes readily and then gets taken back, or is held until it is perfect and arrives late.',
        'control+deliberation': 'Wanting to steer and wanting to think first both look like caution from outside. The difference is whether the pause is to decide or to avoid being decided for.',
        'calibration+speed': 'The first move is quick and the adjusting follows. Reading the room mid-action is a real strength, and the cost is a start that other people experience as sudden.',
    },
    risk: {
        'exposure+verification': 'An appetite for the unproven sits beside a need to check it. Chances get taken and then examined closely, so the doubt arrives when the commitment is already made.',
        'autonomy+protection': 'Wanting to act on your own judgement and wanting to protect what you have point in different directions. Caution tends to hold in the areas that carry real weight and boldness in the ones that feel like your own.',
        'deliberation+exposure': 'Taking time and taking a chance both feel like good judgement. Which one wins usually depends on whether the cost of waiting has become as visible as the cost of acting.',
    },
    abstraction: {
        'investigation+practicality': 'Wanting to understand why and wanting it to work are different projects. Understanding can run on after the practical answer was good enough, and the practical answer can be adopted before it is understood.',
        'abstraction+method': 'An idea and a procedure each want to be the starting point. Ideas come with a plan attached and the plan then reshapes the idea, which helps up to the point where the plan is all that is left.',
        'abstraction+refinement': 'A general principle and a close eye for detail rarely agree on what matters. The principle says the detail does not, and the eye keeps finding the one that does.',
        'investigation+method': 'Digging and organising compete for the same effort. Findings pile up faster than they get put in order, and the order is where they become usable.',
    },
};
export const pairKey = (a, b) => [a, b].sort().join('+');
