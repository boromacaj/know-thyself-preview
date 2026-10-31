import { EARTHLY_BRANCHES } from '../../../bazi/data/baziConstants.js?v=f9ab0a6';
import { calculateSeasonalContext } from '../../../bazi/fivePhaseBalance.js?v=f9ab0a6';
import { STATE_MEANING } from './registry.js?v=f9ab0a6';
const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const GEN = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const CTRL = { Wood: 'Earth', Earth: 'Water', Water: 'Fire', Fire: 'Metal', Metal: 'Wood' };
const parentOf = (element) => ELEMENTS.find((candidate) => GEN[candidate] === element);
const controllerOf = (element) => ELEMENTS.find((candidate) => CTRL[candidate] === element);
const stemOf = (stem) => ({ name: stem.name, character: stem.character, element: stem.element, polarity: stem.polarity });
const branchOf = (branch) => ({ name: branch.name, character: branch.character, animal: branch.animal, element: branch.element, polarity: branch.polarity });
/** The context from a calculated chart; null when the chart is blocked or lacks a pillar the explanations need. */
export function buildPersonalContext(bazi, flags = {}) {
    if (bazi.status !== 'calculated' || !bazi.yearPillar || !bazi.monthPillar || !bazi.dayMaster)
        return null;
    const standing = {};
    for (const branch of EARTHLY_BRANCHES)
        standing[branch.name] = calculateSeasonalContext(branch.index, branch.name, bazi.dayMaster.element).dayMasterState;
    const pillars = [bazi.yearPillar, bazi.monthPillar, bazi.dayPillar, bazi.hourPillar].filter((pillar) => pillar !== null);
    return {
        yearStem: stemOf(bazi.yearPillar.stem),
        yearBranch: branchOf(bazi.yearPillar.branch),
        yearIsEstimate: flags.yearIsEstimate === true,
        dayMaster: stemOf(bazi.dayMaster),
        monthBranch: branchOf(bazi.monthPillar.branch),
        monthIsEstimate: flags.monthIsEstimate === true,
        solarTerm: bazi.activeSolarTerm ? { name: bazi.activeSolarTerm.name, character: bazi.activeSolarTerm.character } : null,
        counts: { ...(bazi.rawPhaseBalance?.counts ?? bazi.elementCounts) },
        visibleObjects: pillars.length * 2,
        hidden: bazi.hiddenStemBalance ? { ...bazi.hiddenStemBalance.counts } : null,
        polarityCounts: { ...bazi.polarityCounts },
        standing,
    };
}
/** The attribute value (JSON, escaped by the caller's attribute escaper). */
export function encodePersonalContext(context) { return JSON.stringify(context); }
/** Reads a context back from the page; null when it is absent or not the shape this module wrote. */
export function decodePersonalContext(text) {
    if (!text)
        return null;
    try {
        const value = JSON.parse(text);
        if (!value || typeof value !== 'object' || !value.dayMaster || !value.yearBranch || !value.yearStem || !value.monthBranch || !value.counts || !value.standing)
            return null;
        return value;
    }
    catch {
        return null;
    }
}
/* ---------------------------------------------------------------- sections */
const cap = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const joinWords = (words) => (words.length <= 1 ? words.join('') : `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`);
const standingOf = (context, branchName) => context.standing[branchName];
const monthsWhere = (context, state) => EARTHLY_BRANCHES.filter((branch) => context.standing[branch.name] === state).map((branch) => branch.name);
const countLine = (context) => ELEMENTS.map((element) => `${element} ${context.counts[element]}`).join(' · ');
/** The "In your chart" block for a topic, or null when the chart has nothing specific to say about it. */
export function personalSections(topicId, context) {
    if (!context)
        return [];
    const [kind, key = '', extra = ''] = topicId.split(':');
    const dm = context.dayMaster;
    const dmLabel = `${dm.polarity} ${dm.element}`;
    const section = (heading, ...paragraphs) => [{ heading, paragraphs }];
    if (kind === 'animal') {
        const own = context.yearBranch.animal.toLowerCase() === key;
        const animal = cap(key);
        if (!own) {
            return section('In your chart', `You are browsing the ${animal}, which is not your own Year Animal. Your Year Animal is the ${context.yearBranch.animal}, and nothing you open here changes your chart.`);
        }
        const stem = context.yearStem;
        const branch = context.yearBranch;
        const paragraphs = [
            `Your Year Animal is the ${animal}. It is the Earthly Branch of your Year Pillar, ${stem.name} ${branch.name} (${stem.character}${branch.character}), which reads as ${stem.polarity} ${stem.element} ${animal}.`,
            `The two characters of that pillar give two separate pieces of information. The stem, ${stem.name}, gives your year its element and polarity: ${stem.polarity} ${stem.element}. The branch, ${branch.name}, gives the animal, and the branch has an element of its own: ${branch.polarity} ${branch.element}${branch.element === stem.element ? ', which here happens to match the stem' : ', which here differs from the stem'}.`,
            `Your Day Master is a different character of the chart: ${dm.name} ${dm.character}, ${dmLabel}. Your Year Animal describes the year; your Day Master is the centre of the chart.`,
        ];
        if (context.yearIsEstimate)
            paragraphs.splice(1, 0, 'Your birth falls on the day the year turns (Li Chun) and no birth time was given, so the animal shown is the calculation\'s reference one and the neighbouring year\'s animal is also possible.');
        return section('In your chart', ...paragraphs);
    }
    if (kind === 'element') {
        const element = ELEMENTS.find((candidate) => candidate.toLowerCase() === key);
        if (!element)
            return [];
        const count = context.counts[element];
        const paragraphs = [
            `Among your ${context.visibleObjects} visible characters (the stems and branches of ${context.visibleObjects === 8 ? 'all four' : 'the three known'} pillars), ${element} appears ${count === 0 ? 'no times' : count === 1 ? 'once' : `${count} times`}. All five counts: ${countLine(context)}.`,
        ];
        if (context.hidden)
            paragraphs.push(`Separately, the hidden stems inside your branches add ${context.hidden[element]} ${element}. That layer is counted apart and is not part of the number on the orb.`);
        if (count === 0)
            paragraphs.push(`A zero means no visible stem or branch of your chart is ${element}. It does not mean ${element} has no influence on you: it can be present in the hidden stems, and it still acts through the generating and controlling relationships.`);
        const roles = [];
        if (context.yearStem.element === element)
            roles.push(`your Year Stem ${context.yearStem.name} is ${context.yearStem.polarity} ${element}`);
        if (dm.element === element)
            roles.push(`your Day Master ${dm.name} is ${dm.polarity} ${element}`);
        if (context.monthBranch.element === element)
            roles.push(`your month branch ${context.monthBranch.name} is the ${element} season`);
        if (roles.length > 0)
            paragraphs.push(`In your chart, ${joinWords(roles)}.`);
        else
            paragraphs.push(`${element} is not the element of your Year Stem, your Day Master or your month branch.`);
        return section('In your chart', ...paragraphs);
    }
    if (kind === 'polarity') {
        const polarity = key === 'yang' ? 'Yang' : 'Yin';
        const ys = context.yearStem;
        const same = ys.polarity === dm.polarity;
        return section('In your chart', `Your Year Stem is ${ys.name} ${ys.character}: ${ys.polarity} ${ys.element}. That is the polarity the Yin / Yang circle on the first screen shows.`, `Your Day Master is ${dm.name} ${dm.character}: ${dmLabel}. It comes from a different stem, so its polarity is calculated separately: ${same ? `here both happen to be ${ys.polarity}` : `here the year is ${ys.polarity} and the Day Master is ${dm.polarity}, and both are true at once`}.`, `Across your ${context.visibleObjects} visible characters, ${context.polarityCounts.Yang} are Yang and ${context.polarityCounts.Yin} are Yin. ${polarity === ys.polarity ? `You are viewing ${polarity}, the polarity of your Year Stem.` : `You are viewing ${polarity}; your Year Stem is ${ys.polarity}.`}`);
    }
    if (kind === 'daymaster') {
        const own = dm.name.toLowerCase() === key;
        if (!own) {
            return section('In your chart', `You are browsing ${cap(key)}, which is not your own Day Master. Your Day Master is ${dm.name} ${dm.character} (${dmLabel}), and nothing you open here changes your chart.`);
        }
        const state = standingOf(context, context.monthBranch.name);
        const meaning = STATE_MEANING[state];
        return section('In your chart', `Your Day Master is ${dm.name} ${dm.character}: ${dmLabel}. It is the stem of your Day Pillar, the centre of your chart.`, `You were born in a ${context.monthBranch.name} month (${context.monthBranch.character}), the ${context.monthBranch.element} season${context.monthIsEstimate ? ', which is approximate because the birth time leaves the month open' : ''}. In that season your ${dm.element} Day Master is ${state} (${meaning.hanzi}): ${meaning.meaning}.`, `In the cycles, ${dm.element} is fed by ${parentOf(dm.element)}, feeds ${GEN[dm.element]}, regulates ${CTRL[dm.element]} and is regulated by ${controllerOf(dm.element)}. Your visible counts are ${countLine(context)}.`);
    }
    if (kind === 'branch') {
        const branch = EARTHLY_BRANCHES.find((candidate) => candidate.name.toLowerCase() === key);
        if (!branch)
            return [];
        const state = standingOf(context, branch.name);
        const meaning = STATE_MEANING[state];
        const own = context.monthBranch.name === branch.name;
        const paragraphs = [
            `On the wheel, this petal shows how your ${dmLabel} Day Master (${dm.name}) would stand if the month were ${branch.name}: ${state} (${meaning.hanzi}), meaning ${meaning.meaning}.`,
            own
                ? `${branch.name} is also your actual month branch, calculated from your birth moment${context.monthIsEstimate ? ' (approximate, because the birth time leaves the month open)' : ''}. It is the petal with the gold outline.`
                : `This is not your month of birth. Your actual month branch is ${context.monthBranch.name} ${context.monthBranch.character}, the petal with the gold outline.`,
        ];
        return section('In your chart', ...paragraphs);
    }
    if (kind === 'relation' || kind === 'cycle') {
        const cycle = key === 'generating' ? 'generating' : 'controlling';
        const next = cycle === 'generating' ? GEN : CTRL;
        const paragraphs = [];
        if (kind === 'relation') {
            const [from, to] = extra.split('-').map((part) => ELEMENTS.find((element) => element.toLowerCase() === part));
            if (!from || !to)
                return [];
            paragraphs.push(`In your chart, ${from} appears ${context.counts[from]} ${context.counts[from] === 1 ? 'time' : 'times'} and ${to} ${context.counts[to]} ${context.counts[to] === 1 ? 'time' : 'times'} among the visible characters.`);
            if (dm.element === from)
                paragraphs.push(`Your Day Master is ${dmLabel}, so this relationship involves it directly: your Day Master is the ${cycle === 'generating' ? `giver, feeding ${to}` : `regulator of ${to}`}.`);
            else if (dm.element === to)
                paragraphs.push(`Your Day Master is ${dmLabel}, so this relationship involves it directly: your Day Master is the ${cycle === 'generating' ? `one fed by ${from}` : `one regulated by ${from}`}.`);
            else
                paragraphs.push(`Your Day Master is ${dmLabel}, neither ${from} nor ${to}, so this relationship acts between two other phases of your chart.`);
        }
        else {
            paragraphs.push(`Your Day Master is ${dmLabel}. In the ${cycle} cycle ${dm.element} ${cycle === 'generating' ? `is fed by ${parentOf(dm.element)} and feeds ${next[dm.element]}` : `regulates ${next[dm.element]} and is regulated by ${controllerOf(dm.element)}`}.`);
            paragraphs.push(`Your visible counts, for reference: ${countLine(context)}.`);
        }
        return section('In your chart', ...paragraphs);
    }
    if (kind === 'concept') {
        if (key === 'element-counts') {
            const paragraphs = [`Your visible counts: ${countLine(context)}, from ${context.visibleObjects} visible characters${context.visibleObjects === 6 ? ' (the Hour Pillar is not counted because the birth time is not known)' : ''}.`];
            if (context.hidden)
                paragraphs.push(`The hidden stems inside your branches are counted separately and add: ${ELEMENTS.map((element) => `${element} ${context.hidden[element]}`).join(' · ')}.`);
            const zeros = ELEMENTS.filter((element) => context.counts[element] === 0);
            if (zeros.length > 0)
                paragraphs.push(`${joinWords(zeros)} ${zeros.length === 1 ? 'shows' : 'show'} a visible count of zero in your chart; that is the visible tally only.`);
            return section('In your chart', ...paragraphs);
        }
        if (key === 'seasonal-support') {
            const state = standingOf(context, context.monthBranch.name);
            const meaning = STATE_MEANING[state];
            const lines = ['prosperous', 'aided', 'resting', 'trapped', 'dead'].map((s) => ({ state: s, months: monthsWhere(context, s) })).filter((line) => line.months.length > 0);
            return section('In your chart', `Your Day Master is ${dm.name}, ${dmLabel}, so the wheel shows how ${dm.element} stands in each month. In your own month, ${context.monthBranch.name}, it is ${state} (${meaning.hanzi}).`, `For ${dm.element}, the months are: ${lines.map((line) => `${line.state}: ${joinWords(line.months)}`).join('; ')}.`);
        }
        if (key === 'birth-month' || key === 'month-branch') {
            const paragraphs = [`Your month branch is ${context.monthBranch.name} ${context.monthBranch.character} (the ${context.monthBranch.animal}), a ${context.monthBranch.element} month${context.solarTerm ? `. The solar term in force at your birth moment is ${context.solarTerm.name} ${context.solarTerm.character}` : ''}.`];
            if (context.monthIsEstimate)
                paragraphs.push('The birth time leaves the month open, so this month branch is approximate.');
            return section('In your chart', ...paragraphs);
        }
        if (key === 'year-animal') {
            return personalSections(`animal:${context.yearBranch.animal.toLowerCase()}`, context);
        }
        if (key === 'day-master') {
            return personalSections(`daymaster:${dm.name.toLowerCase()}`, context);
        }
        if (key === 'five-phases') {
            return section('In your chart', `Your visible counts: ${countLine(context)}. Your Day Master is ${dmLabel}, your Year Stem is ${context.yearStem.polarity} ${context.yearStem.element} and your month is a ${context.monthBranch.element} month.`);
        }
    }
    return [];
}
