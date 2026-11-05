import { themeLabel } from '../knowledge/translations/themeLabels.js';
import { say, themeVoice } from './themeVoice.js';
import { t, tf } from '../i18n/uiStrings.js';
/**
 * THE UNIFIED PATTERN, DERIVED FROM THE REAL SYNTHESIS.
 *
 * `UnifiedPattern` is the older, flatter summary shape that ProfileExperience
 * has always exposed. Until now it was built from the numerology trait list plus
 * a repeated-theme count, which is why its headline read "Cross-pillar archetype
 * pending" on every profile ever generated - there was no cross-pillar engine
 * behind it to be pending on.
 *
 * There is now. This maps the composed cross-pillar reading onto the existing
 * shape rather than changing it, so nothing downstream has to move, and the
 * provisional state survives for exactly one situation: a chart the synthesis
 * genuinely could not say anything cross-pillar about.
 *
 * WHAT IS NOT DONE HERE
 *
 * No new interpretation. Every string below is either a label the foundation
 * produced, a count it produced, or connective wording about the method. The
 * long-form reading lives in SynthesisReading; this is the summary card.
 *
 * The connective wording is in the UI dictionary under `synthesis.compose.*`,
 * one whole sentence per key with named parameters, because Slovak inflects the
 * noun that follows a numeral and will not survive a sentence glued together
 * from an English fragment and a value.
 */
const ts = (suffix) => t(`synthesis.compose.${suffix}`);
const tfs = (suffix, params) => tf(`synthesis.compose.${suffix}`, params);
const PILLAR_TO_ID = {
    numerology: 'numerology',
    astrology: 'western-astrology',
    bazi: 'bazi-tcm',
    'human-design': 'human-design',
};
/** Product order, not alphabetical by internal id. */
const PILLAR_ORDER = ['numerology', 'astrology', 'bazi', 'human-design'];
const countWord = (value, gender = 'm') => (value >= 0 && value <= 8 ? ts(`count.${gender}.${value}`) : String(value));
const band = (value) => (value === 0 ? 'zero' : value === 1 ? 'one' : value <= 4 ? 'few' : 'many');
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
/** The pole's name as a noun, not a de-hyphenated dimension id. */
const poleNoun = (dimension) => ts(`pole.${dimension}`);
const domainOf = (reading, id) => reading.source.domains.find((domain) => domain.id === id);
function sentenceList(items) {
    if (items.length === 0)
        return '';
    if (items.length === 1)
        return items[0];
    return `${items.slice(0, -1).join(', ')}${t('reading.list.and')}${items[items.length - 1]}`;
}
/**
 * One domain as a sentence: which themes reach it, and whether anything is
 * contested there. Returns the honest empty case rather than inventing a line.
 */
function describeDomain(reading, id, subjectKey) {
    const subject = ts(`unified.subject.${subjectKey}`);
    const domain = domainOf(reading, id);
    if (!domain || domain.noMeaningfulConclusion) {
        return tfs('unified.domain.empty', { subject });
    }
    /* A theme whose counter-evidence beat its support is not agreement, and the
       long-form reading deliberately withholds it. Listing it here as though the
       systems converged on it would put back what that section took out. */
    const agreeing = domain.themes.filter((theme) => theme.counterWeight <= theme.supportWeight);
    const contested = domain.themes.filter((theme) => theme.counterWeight > theme.supportWeight);
    const agreed = agreeing.length > 0
        ? tfs('unified.domain.agreed', {
            subject,
            list: sentenceList(agreeing.map((theme) => themeLabel(theme.label).toLowerCase())),
        })
        : tfs('unified.domain.noAgreed', { subject });
    const disputed = contested.length > 0
        ? tfs(`unified.domain.disputed.${contested.length === 1 ? 'one' : 'many'}`, {
            list: capitalise(sentenceList(contested.map((theme) => themeLabel(theme.label).toLowerCase()))),
        })
        : '';
    const axes = domain.tensions.length > 0
        ? tfs(`unified.domain.axes.${domain.tensions.length === 1 ? 'one' : 'many'}`, {
            list: sentenceList(domain.tensions.map((tension) => themeLabel(tension.label).toLowerCase())),
        })
        : ts('unified.domain.noAxes');
    return `${agreed}${disputed}${axes}`;
}
export function unifiedPatternFromSynthesis(reading, allPillarIds) {
    const { coverage, themes, tensions } = reading.source;
    const includedPillars = PILLAR_ORDER
        .filter((pillar) => coverage.pillarsPresent.includes(pillar))
        .map((pillar) => PILLAR_TO_ID[pillar]);
    const missingPillars = allPillarIds.filter((id) => !includedPillars.includes(id));
    const reportable = themes.filter((theme) => theme.counterWeight <= theme.supportWeight && theme.distinctPillars >= 2);
    const headline = reportable.filter((theme) => theme.support === 'strong' || theme.support === 'moderate');
    const realTensions = tensions.filter((tension) => tension.kind !== 'weak-conflict');
    const presentCount = coverage.pillarsPresent.length;
    const presentKey = presentCount >= 1 && presentCount <= 4 ? String(presentCount) : 'n';
    /* The provisional state is kept for exactly one case and is otherwise gone. */
    const status = reading.hasCrossPillarResult
        ? 'cross-pillar' : 'provisional';
    /*
     * THE CARD SAYS WHAT THE READING SAYS.
     *
     * `Four traditions converge most strongly on structured method` is a true
     * sentence about the model and it was the first thing anybody read. The
     * reading's own opening line goes here instead; the sentence it replaced is
     * still composed, in the orientation section with the rest of the method.
     */
    const oneSentenceMap = reading.hook ?? (reading.hasCrossPillarResult
        ? tfs('unified.map.converge', {
            count: capitalise(countWord(presentCount)),
            theme: themeLabel(headline[0].label).toLowerCase(),
            behind: headline.length > 1
                ? tfs('unified.map.behind', {
                    list: sentenceList(headline.slice(1, 3)
                        .map((theme) => themeLabel(theme.label).toLowerCase())),
                })
                : '',
            axes: tfs(`unified.map.axes.${band(realTensions.length)}`, {
                count: countWord(realTensions.length, 'm'),
            }),
        })
        : tfs(`unified.map.none.${presentKey}`, { count: countWord(presentCount) }));
    return {
        status,
        mainArchetype: reading.hasCrossPillarResult
            ? themeLabel(headline[0].label)
            : ts('headline.none'),
        oneSentenceMap,
        /* `Structured method (4 of 4 systems, strong support)` in a chip strip, at
           the top of the reading. The count and the support level are facts and
           they are in the ranked table; what belongs on a chip is the thing itself,
           in the words the reading used for it. */
        strengths: reportable.length > 0
            ? reportable.slice(0, 6).map((theme) => say(themeVoice(theme.id)?.tag) || themeLabel(theme.label))
            : [ts('unified.noStrength')],
        tensions: realTensions.length > 0
            ? realTensions.map((tension) => tfs('unified.tension', {
                axis: themeLabel(tension.label),
                poleA: poleNoun(tension.poleA.dimension),
                poleB: poleNoun(tension.poleB.dimension),
                kind: tension.kind === 'true-tension'
                    ? ts('unified.kind.true') : ts('unified.kind.contextual'),
            }))
            : [ts('unified.noTension')],
        relationships: describeDomain(reading, 'relationships', 'relationships'),
        workStyle: describeDomain(reading, 'work-career', 'work-career'),
        learningStyle: describeDomain(reading, 'growth', 'growth'),
        shadowPatterns: [describeDomain(reading, 'stress-shadow', 'stress-shadow')],
        recommendations: [
            ts('unified.rec.test'),
            realTensions.length > 0
                ? tfs('unified.rec.readAxes', {
                    axes: tfs(`unified.rec.axes.${band(realTensions.length)}`, {
                        count: countWord(realTensions.length, 'm'),
                    }),
                })
                : ts('unified.rec.nothingContested'),
            ts('unified.rec.narrow'),
        ],
        reflectionQuestions: [
            reading.hasCrossPillarResult
                ? tfs('unified.q.visible', { theme: themeLabel(headline[0].label).toLowerCase() })
                : ts('unified.q.recognised'),
            realTensions.length > 0
                ? tfs('unified.q.axis', { axis: themeLabel(realTensions[0].label).toLowerCase() })
                : ts('unified.q.expect'),
            ts('unified.q.evidence'),
        ],
        includedPillars,
        missingPillars,
    };
}
