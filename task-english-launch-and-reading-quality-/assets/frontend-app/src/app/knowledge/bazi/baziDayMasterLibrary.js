import { sig } from '../semanticDimensions.js';
import { dayMasterUnit, stemSignals, STEM_PHASE } from './baziAuthoring.js';
import { balanceOverlays } from './baziBalanceOverlays.js';
/**
 * THE TEN DAY MASTERS.
 *
 * The Day Master is the Heavenly Stem of the day pillar, and it is the subject
 * of the chart: every other character is described by what it does to this one.
 * Nothing else in BaZi carries comparable weight.
 *
 * THE RULE FOR THIS FILE
 *
 * "Wood is growth" is not a reading, it is a table entry, and there are two
 * Wood stems that behave nothing alike. Jia is a standing tree and Yi is a
 * climbing vine; Wu is a mountain and Ji is worked soil; Geng is an unrefined
 * axe and Xin is a finished blade. The classical images are not decoration -
 * they encode exactly the behavioural difference between the yang and yin form
 * of one phase, and every entry below is built from its image rather than from
 * its element.
 *
 * A test asserts that no two Day Masters share a paragraph, and that the two
 * stems of each phase differ from each other.
 */
const dayMasters = [
    dayMasterUnit({
        key: 'jia',
        label: STEM_PHASE.jia.label,
        headline: 'The standing tree: upright, slow, and hard to redirect.',
        core: [
            'Jia is wood with a trunk. It grows in one direction, it does not bend easily, and it has a strong sense of its own proper shape - which reads from outside as integrity and, when the direction is wrong, as stubbornness that no amount of argument will move. This Day Master takes responsibility naturally and takes correction badly, and both come from the same place.',
            'There is a straightness to how this stem operates that other people rely on more than they say. You are the one who states the position everyone else is circling, and you tend to end up carrying weight simply because you were visibly willing to. Growth here is slow and vertical: this is not a design that pivots, it is one that gets taller.',
        ],
        portrait: {
            innerWorld: [
                'The inner life is more principled than emotional. Jia tends to work out what is right and then feel accordingly, which is efficient and occasionally means a genuine reaction arrives months after the event that caused it.',
            ],
            relationships: [
                'Loyal, direct, and slightly difficult to be close to. Jia gives support in the form of reliability rather than warmth, and it is genuinely puzzled when that is experienced as distance. The other recurring difficulty is that a tree does not adjust to the people around it; they adjust to it, and over years that becomes noticeable.',
            ],
            workAndDirection: [
                'This stem does well where responsibility is real and where the work is long. Building an institution, holding a standard, running something that will outlast you. It does badly in situations that require frequent tacking, because the energy cost of changing direction is high and it is paid every time.',
            ],
            shadow: [
                'Rigidity is the obvious failure and inflexibility about method is the more common one: Jia will defend a way of doing something long after the reason for it has gone. The other cost is a difficulty asking for help, which reads as self-sufficiency and functions as isolation.',
            ],
            growth: [
                'The useful discipline is deliberately testing the position rather than defending it - inviting the objection instead of waiting for it. And letting the trunk bend a little: this stem is stronger for having survived one genuine change of direction than for never having attempted any.',
            ],
        },
        signals: stemSignals('wood', 'yang', [sig('persistent', 0.7), sig('structured', 0.5)]),
    }),
    dayMasterUnit({
        key: 'yi',
        label: STEM_PHASE.yi.label,
        headline: 'The climbing vine: flexible, persistent, quietly opportunistic.',
        core: [
            'Yi is wood without a trunk. It grows around obstacles rather than through them, uses whatever support is available, and survives conditions that would break something more upright. The softness is real and so is the toughness underneath it, and people who mistake the first for the whole story are regularly surprised.',
            'This Day Master gets where it is going by adaptation rather than by force, which makes it unusually good at situations where the direct route is closed. Where Jia states the position, Yi finds the person who can carry it. That is a genuine strategy and it is frequently mistaken for having no strategy.',
        ],
        portrait: {
            innerWorld: [
                'The inner life is socially attuned and considerably more calculating than it appears. Yi tracks what the room needs and adjusts, and the adjusting happens fast enough that even the person doing it does not always register it as a decision.',
            ],
            relationships: [
                'Yi is easy company and forms attachments readily. What it struggles with is being alone in a position: this stem prefers to have someone alongside, and it will sometimes hold a view mainly because someone it trusts holds it. Dependence is the risk, and it arrives gradually rather than by choice.',
            ],
            workAndDirection: [
                'Best where flexibility and relationships matter more than authority - negotiation, coordination, anything requiring you to get results through people who do not report to you. Yi is often the reason a difficult project succeeded and rarely the name attached to it.',
            ],
            shadow: [
                'The flexibility becomes formlessness when there is nothing to grow against. Yi in a situation with no structure and no supportive person tends to drift, and it can spend years attached to something that was convenient rather than right.',
            ],
            growth: [
                'The work is developing a position of your own that survives disagreement. Not becoming rigid, which would waste the actual strength here, but being able to say what you think when the person you were leaning on thinks otherwise.',
            ],
        },
        signals: stemSignals('wood', 'yin', [sig('collaborative', 0.6), sig('persistent', 0.5)]),
    }),
    dayMasterUnit({
        key: 'bing',
        label: STEM_PHASE.bing.label,
        headline: 'The sun: impartial, unmissable, and impossible to switch off.',
        core: [
            'Bing is fire that shines on everything equally. It does not choose who gets warmth, it does not have a private setting, and what it feels is already public before it has decided whether to share it. This is the most openly generous of the ten stems and the least capable of concealment.',
            'The effect on a room is immediate and other people organise around it without noticing. Bing raises the temperature of whatever it enters, which is a real gift in a stalled situation and a genuine problem in a delicate one. Proportion is the whole difficulty here; intent almost never is.',
        ],
        portrait: {
            innerWorld: [
                'Bing does not have much interior in the private sense. What it feels, it expresses, and the experience of holding something back is unfamiliar and physically uncomfortable. This makes it honest and occasionally exhausting to be near.',
            ],
            relationships: [
                'Warm, direct and unstinting. Bing gives without accounting and is genuinely wounded when the same is not returned, though it rarely says so in those words. The recurring difficulty is intensity: this stem loves at full brightness and does not always notice that the other person needed shade.',
            ],
            workAndDirection: [
                'Anything public, anything that needs energy injected, anything where being visible is the job. Bing is a natural front and a poor operator in the shadows - work that requires discretion runs against the grain of the stem itself.',
            ],
            shadow: [
                'Burning through fuel is the standard failure: Bing gives at a rate it cannot sustain and then goes dark for a stretch that surprises everyone. The other cost is that light this indiscriminate exposes things people would rather have kept covered, and Bing is often the last to understand why that was not appreciated.',
            ],
            growth: [
                'Learning that not everything needs illuminating is the work, and it is genuinely difficult for this stem. So is scheduling recovery before the collapse rather than after it, since Bing has no natural signal that it is running low.',
            ],
        },
        signals: stemSignals('fire', 'yang', [sig('social', 0.6), sig('creative', 0.4)]),
    }),
    dayMasterUnit({
        key: 'ding',
        label: STEM_PHASE.ding.label,
        headline: 'The lamp: focused, intimate, and dependent on its fuel.',
        core: [
            'Ding is fire that illuminates one thing at a time. Where Bing floods a room, Ding lights the specific corner someone needed to see, and the difference in scale is a difference in kind rather than in degree. This is attentive rather than radiant: the warmth is real and it is directed.',
            'What this stem is unusually good at is the person in front of it. Ding notices what is actually going on with someone and responds to that rather than to the general situation, which is why it tends to become important to a small number of people rather than known to a large number.',
        ],
        portrait: {
            innerWorld: [
                'The interior is rich and quite private. Ding has a considerable imaginative and perceptive life that it shares selectively, and it is far more affected by atmosphere than its composure suggests.',
            ],
            relationships: [
                'Deeply loyal within a small circle and reserved outside it. Ding invests heavily in few people, which produces relationships of real depth and a corresponding difficulty when one of them ends. It is also unusually good at knowing what someone needs without being told.',
            ],
            workAndDirection: [
                'Teaching, mentoring, craft, diagnosis - anything where sustained attention on one thing is what produces the value. Ding does badly with breadth and volume, and it does not scale in the way it is often asked to.',
            ],
            shadow: [
                'Fuel is the whole vulnerability. Ding without good input - a subject worth attending to, people worth investing in, rest - gutters, and the guttering looks like moodiness or withdrawal rather than depletion. It is also prone to a slow-burning resentment that is difficult to detect and difficult to resolve once lit.',
            ],
            growth: [
                'Managing the fuel deliberately is the practical work: this stem needs to choose what it attends to rather than being consumed by whatever arrives. And saying what it has noticed, which Ding often assumes is obvious to everybody and rarely is.',
            ],
        },
        signals: stemSignals('fire', 'yin', [sig('emotionally-sensitive', 0.6), sig('private', 0.5)]),
    }),
    dayMasterUnit({
        key: 'wu',
        label: STEM_PHASE.wu.label,
        headline: 'The mountain: immovable, sheltering, slow to acknowledge change.',
        core: [
            'Wu is earth at scale. It provides ground for other people to stand on, absorbs a great deal without complaint, and changes on something close to a geological timescale. Dependable to the point of obstruction, and the obstruction is rarely deliberate - it is simply that a mountain does not notice it is in the way.',
            'This Day Master is the one others build plans around. What it takes on, it holds, and it holds far longer than anyone asked. The corresponding fact, which Wu tends not to state, is that nobody ever checks how much it is carrying.',
        ],
        portrait: {
            innerWorld: [
                'Steady, self-contained and considerably less settled inside than the surface indicates. Wu processes slowly, which means a difficulty from three years ago may still be being worked on quietly while everything else appears entirely normal.',
            ],
            relationships: [
                'Reliable, protective and hard to reach. Wu is the person others bring problems to and almost never the one who brings theirs, and the asymmetry eventually becomes lonely in a way that is difficult to raise without sounding like a complaint.',
            ],
            workAndDirection: [
                'Where continuity matters: institutions, land, long custodianship, anything that must not fall over. Wu is at its worst in fast-moving situations that reward reacting, because reacting quickly is genuinely not available to this stem.',
            ],
            shadow: [
                'Immobility is the standard failure - a position, a job or a relationship held past all evidence because moving is more costly than staying. The subtler one is accumulation: everything absorbed and nothing discharged, until the weight is simply the person\'s baseline.',
            ],
            growth: [
                'The useful practice is putting things down deliberately, on a schedule, rather than waiting for a reason. And speaking earlier than feels necessary, because by the time Wu mentions something it is usually well past the point where help would have been easy.',
            ],
        },
        signals: stemSignals('earth', 'yang', [sig('persistent', 0.7), sig('stability-seeking', 0.8)]),
    }),
    dayMasterUnit({
        key: 'ji',
        label: STEM_PHASE.ji.label,
        headline: 'The cultivated field: receptive, nourishing, quietly self-effacing.',
        core: [
            'Ji is earth that has been worked. Where Wu is the mountain, Ji is the soil things are grown in: accommodating, resourceful, attentive to what others need, and inclined to disappear into the arrangement it is holding together. This is the most adaptable of the earth stems and the least visible.',
            'The characteristic pattern is that things go better where this Day Master is, and nobody can quite say why. Ji makes conditions rather than results, and a life organised this way is legible from what it enabled rather than from what it asserted - which is a real form of strength and an easy one to undervalue from the inside.',
        ],
        portrait: {
            innerWorld: [
                'Attentive to others to a degree that can obscure its own state. Ji frequently does not know what it wants, not from indecision but because the question of what other people need has been answered so much more often.',
            ],
            relationships: [
                'Easy to be close to and difficult to know. The accommodation is genuine rather than strategic, which is why people trust it quickly, and it means the preference underneath rarely gets stated. Relationships with this stem tend to run for years on an unspoken arrangement that suits one side more.',
            ],
            workAndDirection: [
                'Best where the value is in making a system function rather than in being its visible output: operations, teaching, care, mediation. Worth being deliberate about, because a temperament that arranges itself around other people\'s needs will otherwise be arranged by them.',
            ],
            shadow: [
                'Absorption is the characteristic failure. Earth takes in what is put on it, including worry and other people\'s unfinished business, and it has no natural mechanism for putting any of it down. What accumulates does not announce itself; it settles, and becomes the weight the person is simply carrying.',
            ],
            growth: [
                'The discipline is unglamorous and specific: say the preference out loud before the arrangement forms. This stem is not short of strength and is frequently short of stated position, and almost every difficulty above gets smaller when a preference is on the table early rather than negotiated backwards.',
            ],
        },
        signals: stemSignals('earth', 'yin', [sig('collaborative', 0.7), sig('receptive', 0.5)]),
    }),
    dayMasterUnit({
        key: 'geng',
        label: STEM_PHASE.geng.label,
        headline: 'The unworked axe: decisive, blunt, effective.',
        core: [
            'Geng is metal before refinement. It is direct, resolute and comfortable with confrontation, and it cuts cleanly through situations that more careful temperaments circle for months. Precision is not the strength here; decision is, and the difference matters - Geng is most useful exactly where a clean answer is worth more than a careful one.',
            'There is a bluntness that other people find either bracing or intolerable, with very little in between. This Day Master says the thing, assumes it landed as information, and is genuinely surprised when it landed as an attack. The surprise is sincere; the impact is real.',
        ],
        portrait: {
            innerWorld: [
                'Not much given to introspection, and reasonably content that way. Geng processes by acting, so an unresolved feeling tends to become a decision rather than a reflection - which works better than it sounds and occasionally skips something important.',
            ],
            relationships: [
                'Protective, loyal and hard-edged. Geng defends its people without hesitation and is not skilled at the softer registers, so affection often arrives as practical intervention. What it handles worst is a situation requiring patience rather than resolution.',
            ],
            workAndDirection: [
                'Where difficult decisions have to be made and someone has to be willing to be disliked for them: enforcement, restructuring, crisis, competition. Geng does poorly where the work is delicate and the relationships are fragile.',
            ],
            shadow: [
                'Severity is the failure mode, and it cuts into things that were alive. The other cost is a low tolerance for ambiguity that leads Geng to force a resolution before the situation was ready to have one, and then to defend the premature answer because retreating is worse.',
            ],
            growth: [
                'The work is the pause - specifically, the discipline of asking one question before delivering the verdict. And noticing that most situations are not, in fact, waiting for a decision.',
            ],
        },
        signals: stemSignals('metal', 'yang', [sig('assertive', 0.7), sig('risk-oriented', 0.4)]),
    }),
    dayMasterUnit({
        key: 'xin',
        label: STEM_PHASE.xin.label,
        headline: 'The finished jewel: precise, particular, easily marked.',
        core: [
            'Xin is metal after refinement. It is exact, discriminating and quietly proud, with real aesthetic judgement and a low tolerance for the crude. Where Geng cuts, Xin distinguishes - and the distinguishing is fine enough that others often cannot see what it is reacting to.',
            'This Day Master notices quality, and the noticing is not affectation: it genuinely registers the difference between what was done properly and what was got away with. The corresponding sensitivity to slight is proportionate to the care taken, which is why a small carelessness from someone close can land considerably harder than it was meant.',
        ],
        portrait: {
            innerWorld: [
                'Refined, self-critical, and more easily wounded than the composure suggests. Xin keeps its injuries private and keeps them a long time, and the surface remains immaculate throughout. The gap between how settled this stem looks and how much it is actually carrying is wider than for any other.',
            ],
            relationships: [
                'Selective and deeply loyal once the selection is made. Xin does not warm to many people and warms completely to a few. The difficulty is that its standards apply inside the relationship too, and a partner can spend years feeling subtly assessed without either party naming it.',
            ],
            workAndDirection: [
                'Anywhere precision is the product: design, editing, law, craft, analysis. Xin is wasted on volume work and genuinely suffers in environments where good enough is the standard, because it cannot stop seeing the difference.',
            ],
            shadow: [
                'Fastidiousness turned outward is criticism; turned inward it is a standard nothing meets. Xin can also be quietly imperious - certain of its own taste in a way that leaves no room for anyone else\'s - and it rarely recognises that as what it is doing.',
            ],
            growth: [
                'Letting something be imperfect and finished is the work. So is saying when something has stung, because Xin\'s silence on the subject is invariably read as indifference by people who would have adjusted if asked.',
            ],
        },
        signals: stemSignals('metal', 'yin', [sig('analytical', 0.8), sig('emotionally-sensitive', 0.5)]),
    }),
    dayMasterUnit({
        key: 'ren',
        label: STEM_PHASE.ren.label,
        headline: 'The ocean: wide, mobile, and not fully knowable.',
        core: [
            'Ren is water at volume. It moves in large motions, holds far more than it shows, and carries an unusual tolerance for scale and for not yet knowing. Expansive, resourceful and genuinely hard to pin down - this is the stem most often underestimated by anyone who mistakes its ease for a lack of depth.',
            'What Ren does well is the big, unstructured situation: the problem with no defined edges, the plan that has to accommodate variables nobody has counted. It is comfortable in flux in a way most temperaments are not, and it becomes restless in conditions that are entirely settled.',
        ],
        portrait: {
            innerWorld: [
                'Deep and largely unexamined by choice. Ren has considerable interior volume and does not spend much time inspecting it, preferring motion to reflection - which is why insight here tends to arrive suddenly and from an unexpected angle.',
            ],
            relationships: [
                'Generous, sociable and slightly ungraspable. Ren is genuinely warm and genuinely difficult to hold on to, and partners often report a sense of never quite having the whole person. It is rarely deliberate; there is simply more of this stem than any one relationship contains.',
            ],
            workAndDirection: [
                'Strategy, exploration, anything requiring comfort with an unmapped situation and a long time horizon. Ren does badly with narrow repetitive work, where the volume it carries has nowhere to go and turns into restlessness.',
            ],
            shadow: [
                'Dispersal is the standard failure - too many directions at once, none of them completed, and a genuine belief that they are all still live. The other cost is evasion: Ren moves around a difficult conversation as easily as around anything else, and can do it for years without registering the avoidance.',
            ],
            growth: [
                'Choosing a channel is the work. Water with banks goes somewhere; water without them spreads out and becomes shallow, and this stem generally knows which it has been doing. The practical version is committing to one of the live directions in writing, with a date on it, because Ren will keep all of them technically open indefinitely otherwise.',
            ],
        },
        signals: stemSignals('water', 'yang', [sig('novelty-seeking', 0.6), sig('conceptual', 0.5)]),
    }),
    dayMasterUnit({
        key: 'gui',
        label: STEM_PHASE.gui.label,
        headline: 'The rain: fine, penetrating, arriving everywhere at once.',
        core: [
            'Gui is water dispersed. It gets into everything by small increments rather than by force, and it is the most naturally perceptive of the ten stems - quiet, thoughtful, and inclined to know things it was never told. Where Ren moves in volume, Gui moves everywhere at once and is barely noticed doing it.',
            'The perception is the defining feature and it is genuinely acute. This Day Master reads situations and people accurately, often before there is evidence, and it usually keeps the reading to itself. What looks like reticence is frequently just the gap between knowing and being able to justify.',
        ],
        portrait: {
            innerWorld: [
                'Continuously active and almost entirely private. Gui has an inner life considerably more elaborate than anything it presents, and it processes by turning things over at length rather than by discussing them.',
            ],
            relationships: [
                'Gentle, attentive and hard to reach. Gui understands people quickly, which creates real closeness, and reveals itself slowly, which limits how reciprocal that closeness becomes. Partners often know they are cared for without being able to say much about the person doing the caring.',
            ],
            workAndDirection: [
                'Research, writing, counselling, anything where noticing what others missed is the value. Gui does poorly where it must assert and compete, not for lack of capability but because the mode itself is draining.',
            ],
            shadow: [
                'Withdrawal is the characteristic failure, and it is gradual enough to be invisible until it is substantial. There is also a tendency to over-adapt - to take the shape of whatever container it is in - and then to feel obscurely absent from its own life.',
            ],
            growth: [
                'Saying the perception out loud is the work, imperfectly and before it can be defended. Gui is right far more often than it speaks, and the gap between those two facts is where most of this stem\'s frustration lives.',
            ],
        },
        signals: stemSignals('water', 'yin', [sig('intuitive', 0.8), sig('introspective', 0.7)]),
    }),
];
/**
 * Each Day Master carries the momentum overlays for its own phase.
 *
 * Attached here rather than written into the entries because the overlays are a
 * property of the phase rather than of the stem, and because attaching them in
 * one place makes it impossible for a Day Master to be added without them.
 */
export const BAZI_DAY_MASTER_LIBRARY = dayMasters.map((unit) => ({
    ...unit,
    overlays: balanceOverlays(STEM_PHASE[unit.entity.key].phase),
}));
